-- What the review of availability and bookings found (DECISIONS.md, D-075, D-078).
--
--  * booking_calendar let anyone signed in without a student status through: `null or false`
--    is null, and a null condition raises nothing. It also gave any past range; a student
--    now gets the times still to come only.
--  * request_session accepted any instant inside the hours, so 17:15, or 17:00 and a
--    microsecond, took two or three of the page's half-hour slots. A start is now on the
--    half-hour grid of its window, to the second.
--  * A trusted student's bookings had no ceiling, and nothing slowed a request-and-withdraw
--    loop that emails the tutor each time: six self-booked sessions to come at most, and ten
--    requests a day.
--  * cancel_my_session now says what it cancelled. The page used a status read before the
--    call, so a request confirmed meanwhile was cancelled without telling the tutor.
--  * close_session no longer drops attendance recorded for someone whose membership of that
--    day is gone from the group's history.
--  * Reminders: a session created, confirmed or moved inside a reminder's window counts that
--    reminder as sent, since the email that goes with the change says as much. Moving used to
--    clear both stamps, so a move the same day brought a « demain » reminder with it.

create or replace function private.slot_is_open(
  p_session_type_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  with l as (
    select
      (p_starts_at at time zone 'Africa/Casablanca') as ls,
      (p_ends_at at time zone 'Africa/Casablanca') as le
  )
  select
    l.ls::date = l.le::date
    -- Whole minutes: the grid below is counted in them.
    and date_trunc('minute', p_starts_at) = p_starts_at
    and (
      exists (
        select 1
        from public.availability a
        where a.weekday = extract(isodow from l.ls)
          and (a.session_type_id is null or a.session_type_id = p_session_type_id)
          and a.start_time <= l.ls::time
          and l.le::time <= a.end_time
          -- On the half-hour grid of the window, as the booking page offers it.
          and (extract(epoch from l.ls::time - a.start_time)::integer / 60) % 30 = 0
      )
      or exists (
        select 1
        from public.availability_exceptions e
        where not e.is_blocked
          and l.ls::date between e.starts_on and e.ends_on
          and (e.session_type_id is null or e.session_type_id = p_session_type_id)
          and e.start_time <= l.ls::time
          and l.le::time <= e.end_time
          and (extract(epoch from l.ls::time - e.start_time)::integer / 60) % 30 = 0
      )
    )
    and not exists (
      select 1
      from public.availability_exceptions e
      where e.is_blocked
        and l.ls::date between e.starts_on and e.ends_on
        and (e.start_time is null or (e.start_time < l.le::time and l.ls::time < e.end_time))
    )
  from l;
$function$;

create or replace function public.booking_calendar(p_from timestamptz, p_to timestamptz)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $function$
declare
  v_tutor boolean := coalesce((select private.is_tutor()), false);
begin
  if not (v_tutor or (select private.my_student_status()) is not distinct from 'actif') then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_to <= p_from or p_to - p_from > interval '130 days' then
    raise exception 'range_invalid' using errcode = 'P0001';
  end if;

  return jsonb_build_object(
    'settings', (
      select jsonb_build_object(
        'cancellationWindowHours', b.cancellation_window_hours,
        'minNoticeHours', b.min_notice_hours,
        'horizonDays', b.horizon_days
      )
      from public.booking_settings b
    ),
    'windows', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'weekday', a.weekday,
          'start', to_char(a.start_time, 'HH24:MI'),
          'end', to_char(a.end_time, 'HH24:MI'),
          'sessionTypeId', a.session_type_id
        )
        order by a.weekday, a.start_time
      )
      from public.availability a
    ), '[]'::jsonb),
    'exceptions', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'startsOn', e.starts_on,
          'endsOn', e.ends_on,
          'isBlocked', e.is_blocked,
          'start', to_char(e.start_time, 'HH24:MI'),
          'end', to_char(e.end_time, 'HH24:MI'),
          'sessionTypeId', e.session_type_id
        )
        order by e.starts_on
      )
      from public.availability_exceptions e
      where e.ends_on >= (p_from at time zone 'Africa/Casablanca')::date
        and e.starts_on <= (p_to at time zone 'Africa/Casablanca')::date
    ), '[]'::jsonb),
    'busy', coalesce((
      select jsonb_agg(
        jsonb_build_object('startsAt', s.starts_at, 'endsAt', s.ends_at)
        order by s.starts_at
      )
      from public.sessions s
      where s.status in ('en_attente', 'planifiee', 'terminee', 'absent')
        and s.starts_at < p_to
        -- A student has no use for the tutor's past diary.
        and s.ends_at > case when v_tutor then p_from else greatest(p_from, now()) end
    ), '[]'::jsonb)
  );
end;
$function$;

create or replace function public.request_session(
  p_session_type_id uuid,
  p_starts_at timestamptz,
  p_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_me uuid := (select auth.uid());
  v_type public.session_types;
  v_settings public.booking_settings;
  v_ends_at timestamptz;
  v_id uuid;
begin
  -- Only an active student books: a paused one sees no session to come (D-060).
  if v_me is null or (select private.my_student_status()) is distinct from 'actif' then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  select * into v_type
  from public.session_types t
  where t.id = p_session_type_id and t.is_active and not t.is_group;
  if not found then
    raise exception 'type_invalid' using errcode = 'P0001';
  end if;

  select * into v_settings from public.booking_settings;
  if p_starts_at is null
     or p_starts_at < now() + make_interval(hours => v_settings.min_notice_hours) then
    raise exception 'too_soon' using errcode = 'P0001';
  end if;
  if p_starts_at > now() + make_interval(days => v_settings.horizon_days) then
    raise exception 'too_far' using errcode = 'P0001';
  end if;

  v_ends_at := p_starts_at + make_interval(mins => v_type.duration_min);

  -- One booking at a time: between this check and the insert, nobody else takes the slot.
  perform pg_advisory_xact_lock(hashtext('public.request_session'));

  -- Each request emails the tutor: ten a day is more than any student needs.
  if (
    select count(*)
    from public.sessions s
    where s.requested_by = v_me
      and s.created_at > now() - interval '1 day'
  ) >= 10 then
    raise exception 'too_many_today' using errcode = 'P0001';
  end if;

  if not private.slot_is_open(v_type.id, p_starts_at, v_ends_at) then
    raise exception 'slot_closed' using errcode = 'P0001';
  end if;

  if exists (
    select 1
    from public.sessions s
    where s.status in ('en_attente', 'planifiee', 'terminee', 'absent')
      and s.starts_at < v_ends_at
      and s.ends_at > p_starts_at
  ) then
    raise exception 'slot_taken' using errcode = 'P0001';
  end if;

  if (
    select count(*)
    from public.sessions s
    where s.student_id = v_me
      and s.status = 'en_attente'
      and s.starts_at > now()
  ) >= 3 then
    raise exception 'too_many_requests' using errcode = 'P0001';
  end if;

  -- Confirmed at once or not, she holds at most six sessions to come that she booked herself.
  if (
    select count(*)
    from public.sessions s
    where s.student_id = v_me
      and s.requested_by = v_me
      and s.status in ('en_attente', 'planifiee')
      and s.starts_at > now()
  ) >= 6 then
    raise exception 'too_many_bookings' using errcode = 'P0001';
  end if;

  insert into public.sessions (
    student_id, session_type_id, starts_at, ends_at, status, mode, requested_by, request_note
  )
  values (
    v_me,
    v_type.id,
    p_starts_at,
    v_ends_at,
    case
      when coalesce(
        (select ss.auto_confirm_bookings from public.student_settings ss where ss.student_id = v_me),
        false
      ) then 'planifiee'
      else 'en_attente'
    end::public.session_status,
    v_type.mode,
    v_me,
    nullif(btrim(coalesce(p_note, '')), '')
  )
  returning id into v_id;

  return v_id;
end;
$function$;

-- Now returns the status it replaced, so the page tells the tutor about a session she had
-- confirmed meanwhile.
drop function public.cancel_my_session(uuid, text);

create function public.cancel_my_session(p_session_id uuid, p_reason text default null)
returns public.session_status
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_me uuid := (select auth.uid());
  v_session public.sessions;
begin
  if v_me is null or (select private.my_student_status()) is distinct from 'actif' then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  -- A group session is the group's: she tells the tutor instead.
  select * into v_session
  from public.sessions s
  where s.id = p_session_id and s.student_id = v_me
  for update;
  if not found then
    raise exception 'session_not_found' using errcode = 'P0002';
  end if;

  if v_session.status not in ('en_attente', 'planifiee') or v_session.starts_at <= now() then
    raise exception 'not_cancellable' using errcode = 'P0001';
  end if;
  if v_session.status = 'planifiee' and v_session.starts_at < now() + make_interval(
    hours => (select b.cancellation_window_hours from public.booking_settings b)
  ) then
    raise exception 'too_late' using errcode = 'P0001';
  end if;

  update public.sessions
  set status = 'annulee',
      cancelled_at = now(),
      cancelled_by = v_me,
      cancellation_reason = nullif(btrim(coalesce(p_reason, '')), '')
  where id = p_session_id;

  return v_session.status;
end;
$function$;

revoke execute on function public.cancel_my_session(uuid, text) from public, anon;
grant execute on function public.cancel_my_session(uuid, text) to authenticated;

create or replace function public.close_session(
  p_session_id uuid,
  p_status public.session_status,
  p_covered_chapter_id uuid default null,
  p_homework text default null,
  p_recap text default null,
  p_attendance jsonb default null
)
returns void
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_session public.sessions;
  v_done boolean := p_status = 'terminee';
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;

  select * into v_session from public.sessions s where s.id = p_session_id for update;
  if not found then
    raise exception 'session_not_found' using errcode = 'P0002';
  end if;

  -- A group does not miss its session as one: each member is present, absent or excused.
  if p_status not in ('terminee', 'absent')
     or (p_status = 'absent' and v_session.group_id is not null) then
    raise exception 'status_invalid' using errcode = 'P0001';
  end if;
  if v_session.status not in ('planifiee', 'terminee', 'absent') then
    raise exception 'not_closable' using errcode = 'P0001';
  end if;
  if v_session.starts_at > now() then
    raise exception 'not_started' using errcode = 'P0001';
  end if;

  update public.sessions
  set status = p_status,
      covered_chapter_id = case when v_done then p_covered_chapter_id end,
      homework = case when v_done then nullif(btrim(coalesce(p_homework, '')), '') end,
      recap = case when v_done then nullif(btrim(coalesce(p_recap, '')), '') end
  where id = p_session_id;

  if v_session.group_id is not null then
    -- The members of that day (D-070) are recorded again; a line recorded for anyone else,
    -- whose membership has since gone from the group's history, is kept as it was.
    with members as (
      select gm.student_id
      from public.group_members gm
      where gm.group_id = v_session.group_id
        and gm.joined_at <= v_session.starts_at
        and (gm.left_at is null or v_session.starts_at < gm.left_at)
    )
    delete from public.session_attendance a
    using members m
    where a.session_id = p_session_id and a.student_id = m.student_id;

    insert into public.session_attendance (session_id, student_id, status)
    select p_session_id, gm.student_id, (p_attendance ->> gm.student_id::text)::public.attendance_status
    from public.group_members gm
    where gm.group_id = v_session.group_id
      and gm.joined_at <= v_session.starts_at
      and (gm.left_at is null or v_session.starts_at < gm.left_at)
      and coalesce(p_attendance ->> gm.student_id::text, '') <> '';
  end if;
end;
$function$;

-- Reminders follow what the student was last told.
drop trigger sessions_reset_reminders on public.sessions;
drop function private.reset_session_reminders();

create function private.stamp_session_reminders()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  if new.status = 'planifiee' and (
    tg_op = 'INSERT'
    or new.starts_at is distinct from old.starts_at
    or old.status is distinct from 'planifiee'
  ) then
    -- The email that goes with this change (booked, confirmed, planned, moved) says what a
    -- reminder already due would say: that one counts as sent, the later one stays to send.
    new.reminder_24h_sent_at := case when new.starts_at <= now() + interval '24 hours' then now() end;
    new.reminder_2h_sent_at := case when new.starts_at <= now() + interval '2 hours' then now() end;
  end if;
  return new;
end;
$function$;

create trigger sessions_stamp_reminders
  before insert or update of starts_at, status on public.sessions
  for each row execute function private.stamp_session_reminders();

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
