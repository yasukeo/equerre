-- Availability, booking rules, and the calls that request, plan and close sessions
-- (DECISIONS.md, D-073 to D-075).
--
-- Weekly hours and exceptions are local Casablanca wall-clock times, converted date by date
-- with the zone's rules: a Tuesday 18:00 window stays at 18:00 on both sides of Ramadan's
-- change of offset. Nothing here stores or assumes an offset.
--
-- Students never read these tables, nor anyone else's sessions. They see the bookable hours
-- through public.booking_calendar(), which gives times and nothing about who; they book and
-- cancel through public.request_session() and public.cancel_my_session(), which check every
-- rule here rather than trusting the page.

-- ─────────────────────────────────────────────────────────────── weekly hours

create table public.availability (
  id uuid primary key default gen_random_uuid(),
  -- ISO weekday: 1 = lundi … 7 = dimanche.
  weekday smallint not null check (weekday between 1 and 7),
  start_time time(0) not null,
  end_time time(0) not null,
  -- Null: every individual session type. Otherwise only that one (Saturday mornings at home).
  session_type_id uuid references public.session_types (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (start_time < end_time),
  -- A session ends on the day it starts.
  check (end_time <= time '23:59')
);

create index availability_session_type_id_idx on public.availability (session_type_id);

alter table public.availability enable row level security;

create policy "availability: select tutor"
  on public.availability for select to authenticated
  using ((select private.is_tutor()));

create policy "availability: insert tutor"
  on public.availability for insert to authenticated
  with check ((select private.is_tutor()));

create policy "availability: update tutor"
  on public.availability for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "availability: delete tutor"
  on public.availability for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── exceptions
-- A blocked period (holidays: whole days; or the same hours on each day of the range), or an
-- opening that adds hours on one date. The note is hers: students never read it.

create table public.availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  starts_on date not null,
  ends_on date not null,
  is_blocked boolean not null default true,
  start_time time(0),
  end_time time(0),
  session_type_id uuid references public.session_types (id) on delete cascade,
  note text check (char_length(note) <= 120),
  created_at timestamptz not null default now(),
  check (ends_on >= starts_on),
  check (ends_on - starts_on <= 366),
  check ((start_time is null) = (end_time is null)),
  check (start_time is null or start_time < end_time),
  check (end_time is null or end_time <= time '23:59'),
  -- An opening is hours on one date; a type narrows an opening, never a block.
  check (is_blocked or (start_time is not null and starts_on = ends_on)),
  check (not is_blocked or session_type_id is null)
);

create index availability_exceptions_dates_idx on public.availability_exceptions (ends_on, starts_on);
create index availability_exceptions_session_type_id_idx
  on public.availability_exceptions (session_type_id);

alter table public.availability_exceptions enable row level security;

create policy "availability_exceptions: select tutor"
  on public.availability_exceptions for select to authenticated
  using ((select private.is_tutor()));

create policy "availability_exceptions: insert tutor"
  on public.availability_exceptions for insert to authenticated
  with check ((select private.is_tutor()));

create policy "availability_exceptions: update tutor"
  on public.availability_exceptions for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "availability_exceptions: delete tutor"
  on public.availability_exceptions for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── booking rules

create table public.booking_settings (
  id boolean primary key default true check (id),
  -- A confirmed session can be cancelled by the student until this many hours before it.
  cancellation_window_hours integer not null default 24
    check (cancellation_window_hours between 0 and 168),
  -- A request must start at least this many hours after it is made.
  min_notice_hours integer not null default 12 check (min_notice_hours between 0 and 168),
  -- And at most this many days ahead.
  horizon_days integer not null default 28 check (horizon_days between 1 and 120),
  updated_at timestamptz not null default now()
);

insert into public.booking_settings default values;

create trigger booking_settings_set_updated_at
  before update on public.booking_settings
  for each row execute function private.set_updated_at();

alter table public.booking_settings enable row level security;

-- The rules are no secret: a student's page says until when she may cancel.
create policy "booking_settings: select signed in"
  on public.booking_settings for select to authenticated
  using (true);

create policy "booking_settings: update tutor"
  on public.booking_settings for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── sessions

-- What the student writes with her request (« revoir les suites »).
alter table public.sessions
  add column request_note text check (char_length(request_note) <= 300);

-- A session moved to another time is reminded of again, at its new time.
create function private.reset_session_reminders()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  if new.starts_at is distinct from old.starts_at then
    new.reminder_24h_sent_at := null;
    new.reminder_2h_sent_at := null;
  end if;
  return new;
end;
$function$;

create trigger sessions_reset_reminders
  before update of starts_at on public.sessions
  for each row execute function private.reset_session_reminders();

-- Statuses that hold a slot. Pending requests hold it against other requests (first come,
-- first served), not against the tutor's own planning (D-027).
create function private.slot_is_open(
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
    and (
      exists (
        select 1
        from public.availability a
        where a.weekday = extract(isodow from l.ls)
          and (a.session_type_id is null or a.session_type_id = p_session_type_id)
          and a.start_time <= l.ls::time
          and l.le::time <= a.end_time
      )
      or exists (
        select 1
        from public.availability_exceptions e
        where not e.is_blocked
          and l.ls::date between e.starts_on and e.ends_on
          and (e.session_type_id is null or e.session_type_id = p_session_type_id)
          and e.start_time <= l.ls::time
          and l.le::time <= e.end_time
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

-- What a booking page needs, and nothing about who: the rules, the weekly hours, the
-- exceptions without their notes, and the times already taken.
create function public.booking_calendar(p_from timestamptz, p_to timestamptz)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $function$
begin
  if not ((select private.is_tutor()) or (select private.my_student_status()) = 'actif') then
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
        and s.ends_at > p_from
    ), '[]'::jsonb)
  );
end;
$function$;

-- A student asks for a slot. It lands as pending, or confirmed at once when the tutor trusts
-- her (student_settings.auto_confirm_bookings). Every rule is checked here.
create function public.request_session(
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

-- A student withdraws a request, or cancels a confirmed session outside the window.
create function public.cancel_my_session(p_session_id uuid, p_reason text default null)
returns void
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
end;
$function$;

-- The tutor plans one session, or a weekly series, for a student or a group, in one
-- transaction. The dates arrive already converted from wall-clock time, one per week.
-- A date that would overlap a confirmed session is named, and nothing is written.
create function public.plan_sessions(
  p_starts_at timestamptz[],
  p_session_type_id uuid,
  p_student_id uuid default null,
  p_group_id uuid default null,
  p_mode public.session_mode default null,
  p_location text default null,
  p_meeting_url text default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_type public.session_types;
  v_count integer := coalesce(cardinality(p_starts_at), 0);
  v_conflicts text;
  v_series uuid;
  v_first uuid;
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;

  if (p_student_id is null) = (p_group_id is null) then
    raise exception 'recipient_invalid' using errcode = 'P0001';
  end if;
  if p_student_id is not null and not exists (
    select 1 from public.profiles p
    where p.id = p_student_id and p.role = 'student' and p.status = 'actif'
  ) then
    raise exception 'recipient_invalid' using errcode = 'P0001';
  end if;
  if p_group_id is not null and not exists (
    select 1 from public.groups g where g.id = p_group_id
  ) then
    raise exception 'recipient_invalid' using errcode = 'P0001';
  end if;

  select * into v_type from public.session_types t where t.id = p_session_type_id and t.is_active;
  if not found or v_type.is_group <> (p_group_id is not null) then
    raise exception 'type_invalid' using errcode = 'P0001';
  end if;

  if v_count < 1 or v_count > 52
     or v_count <> (select count(distinct x) from unnest(p_starts_at) as u (x) where x is not null) then
    raise exception 'dates_invalid' using errcode = 'P0001';
  end if;

  select string_agg(to_char(u.x at time zone 'Africa/Casablanca', 'YYYY-MM-DD"T"HH24:MI'), ',' order by u.x)
  into v_conflicts
  from unnest(p_starts_at) as u (x)
  where exists (
    select 1
    from public.sessions s
    where s.status in ('planifiee', 'terminee', 'absent')
      and s.starts_at < u.x + make_interval(mins => v_type.duration_min)
      and s.ends_at > u.x
  );
  if v_conflicts is not null then
    raise exception 'overlap' using errcode = 'P0001', detail = v_conflicts;
  end if;

  if v_count > 1 then
    insert into public.session_series (rule, starts_on, ends_on)
    select
      'FREQ=WEEKLY',
      (min(u.x) at time zone 'Africa/Casablanca')::date,
      (max(u.x) at time zone 'Africa/Casablanca')::date
    from unnest(p_starts_at) as u (x)
    returning id into v_series;
  end if;

  with inserted as (
    insert into public.sessions (
      student_id, group_id, session_type_id, starts_at, ends_at, status, mode, location,
      meeting_url, series_id
    )
    select
      p_student_id,
      p_group_id,
      v_type.id,
      u.x,
      u.x + make_interval(mins => v_type.duration_min),
      'planifiee',
      coalesce(p_mode, v_type.mode),
      nullif(btrim(coalesce(p_location, '')), ''),
      nullif(btrim(coalesce(p_meeting_url, '')), ''),
      v_series
    from unnest(p_starts_at) as u (x)
    returning id, starts_at
  )
  select id into v_first from inserted order by starts_at limit 1;

  return v_first;
end;
$function$;

-- The tutor closes a session that has started: what happened, what was covered, the homework
-- and the recap the student reads, and for a group, who came. Closing again corrects it.
create function public.close_session(
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
    delete from public.session_attendance where session_id = p_session_id;
    -- The members of that day (D-070); anyone else named is ignored.
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

revoke execute on function public.booking_calendar(timestamptz, timestamptz) from public, anon;
grant execute on function public.booking_calendar(timestamptz, timestamptz) to authenticated;
revoke execute on function public.request_session(uuid, timestamptz, text) from public, anon;
grant execute on function public.request_session(uuid, timestamptz, text) to authenticated;
revoke execute on function public.cancel_my_session(uuid, text) from public, anon;
grant execute on function public.cancel_my_session(uuid, text) to authenticated;
revoke execute on function public.plan_sessions(
  timestamptz[], uuid, uuid, uuid, public.session_mode, text, text
) from public, anon;
grant execute on function public.plan_sessions(
  timestamptz[], uuid, uuid, uuid, public.session_mode, text, text
) to authenticated;
revoke execute on function public.close_session(
  uuid, public.session_status, uuid, text, text, jsonb
) from public, anon;
grant execute on function public.close_session(
  uuid, public.session_status, uuid, text, text, jsonb
) to authenticated;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
