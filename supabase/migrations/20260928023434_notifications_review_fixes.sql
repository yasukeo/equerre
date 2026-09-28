-- What the review of the notification centre found (DECISIONS.md, D-086).
--
--  * Marking read took the ids a page showed: past fifty unread, the rest were never shown and
--    the bell never came down. A page now marks everything up to the newest it showed.
--  * A homework email was built from the payload written when it was given: deleted or renamed
--    within ten minutes, it went out anyway, with a link to nothing. The job now claims each
--    email in one call that reads the homework as it is, and skips what is gone, read, older
--    than two days (the backlog waiting for the end-of-project settings), or meant for a
--    student whose follow-up has stopped.
--  * The claim ignored a correction folded in meanwhile: the email counted one exercise. The
--    claim returns the row as it is when claimed.
--  * Two first corrections at once each found no row to fold into: they now wait for each other.
--  * The digest: its claim was a plain upsert (two runs both sent); it counted only messages
--    newer than the last digest while saying how many wait; and with messages a quarter of an
--    hour apart it became one email per message. It now claims by compare-and-set, counts
--    everything unread, waits three hours between two digests to the same person, and
--    considers the last two days only.
--  * A change of place or link emailed the student but left nothing in the centre.
--  * Cancelling a session « and the following ones » took two statements, so two notifications
--    each: cancel_sessions does it in one.
--  * The day-before reminder reached the centre only when its email left, and a session moved
--    after it could be reminded twice: the job adds it before sending, once a person and a
--    session, and keeps it whatever the email does.
--  * A student whose follow-up has stopped was still told of corrections.
--  * The bell learns of new notifications live: the table joins the Realtime publication,
--    under its select-own policy.

-- ─────────────────────────────────────────────────────────────── reading

drop function public.mark_notifications_read(uuid[]);

create function public.mark_notifications_read(p_up_to timestamptz)
returns void
language sql
security definer
set search_path = ''
as $function$
  update public.notifications n
  set read_at = now()
  where n.profile_id = (select auth.uid())
    and n.read_at is null
    and n.created_at <= p_up_to;
$function$;

revoke execute on function public.mark_notifications_read(timestamptz) from public, anon;
grant execute on function public.mark_notifications_read(timestamptz) to authenticated;

alter publication supabase_realtime add table public.notifications;

-- ─────────────────────────────────────────────────────────────── corrections

create or replace function private.notify_correction()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_title text;
  v_id uuid;
begin
  if new.auto_graded then
    return null;
  end if;
  -- Stopped, she no longer sees her homework (D-060): nothing to tell.
  if not exists (
    select 1 from public.profiles p where p.id = new.student_id and p.status in ('actif', 'en_pause')
  ) then
    return null;
  end if;

  -- Two corrections of one homework at once: the second waits, then folds into the first.
  perform pg_advisory_xact_lock(
    hashtext('notify_correction:' || new.student_id::text || ':' || new.assignment_id::text)
  );

  select n.id into v_id
  from public.notifications n
  where n.profile_id = new.student_id
    and n.type = 'correction_ready'
    and n.read_at is null
    and n.emailed_at is null
    and n.payload ->> 'assignment_id' = new.assignment_id::text
  for update;

  if v_id is not null then
    update public.notifications
    set payload = payload || jsonb_build_object(
          'count', coalesce((payload ->> 'count')::integer, 1) + 1,
          'exercise_id', new.exercise_id,
          'grade', new.grade
        ),
        created_at = now()
    where id = v_id;
  else
    select a.title into v_title from public.assignments a where a.id = new.assignment_id;
    insert into public.notifications (profile_id, type, payload)
    values (
      new.student_id,
      'correction_ready',
      jsonb_build_object(
        'assignment_id', new.assignment_id,
        'exercise_id', new.exercise_id,
        'title', coalesce(v_title, ''),
        'grade', new.grade,
        'count', 1
      )
    );
  end if;
  return null;
end;
$function$;

-- ─────────────────────────────────────────────────────────────── place and link

create or replace function private.notify_sessions_updated()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  -- The tutor's answer to a request.
  insert into public.notifications (profile_id, type, payload)
  select
    n.student_id,
    case when n.status = 'planifiee' then 'booking_confirmed' else 'booking_declined' end::public.notification_type,
    jsonb_build_object('session_id', n.id, 'starts_at', n.starts_at, 'reason', n.cancellation_reason)
  from updated n
  join previous o on o.id = n.id
  where o.status = 'en_attente'
    and n.status in ('planifiee', 'refusee')
    and n.student_id is not null
    and exists (select 1 from public.profiles p where p.id = n.student_id and p.status = 'actif');

  -- A student cancelled: the tutor hears of it.
  insert into public.notifications (profile_id, type, payload)
  select
    private.tutor_id(),
    'booking_cancelled',
    jsonb_build_object(
      'session_id', n.id,
      'starts_at', n.starts_at,
      'who', coalesce((select p.full_name from public.profiles p where p.id = n.student_id), ''),
      'reason', n.cancellation_reason
    )
  from updated n
  join previous o on o.id = n.id
  where o.status = 'planifiee'
    and n.status = 'annulee'
    and n.cancelled_by is not null
    and n.cancelled_by = n.student_id
    and private.tutor_id() is not null;

  -- The tutor cancelled: the students hear of it, once per series cancelled together.
  insert into public.notifications (profile_id, type, payload)
  select
    r.profile_id,
    'session_cancelled',
    jsonb_build_object(
      'session_id', (array_agg(r.id order by r.starts_at))[1],
      'starts_at', min(r.starts_at),
      'count', count(*),
      'reason', min(r.reason)
    )
  from (
    select n.id, n.starts_at, n.series_id, n.cancellation_reason as reason, x.profile_id
    from updated n
    join previous o on o.id = n.id
    cross join lateral private.session_students(n.student_id, n.group_id, n.starts_at) as x (profile_id)
    where o.status in ('planifiee', 'en_attente')
      and n.status = 'annulee'
      and (n.cancelled_by is null or n.cancelled_by is distinct from n.student_id)
      and n.starts_at > now()
  ) r
  group by r.profile_id, coalesce(r.series_id, r.id);

  -- Moved to another time, or to another place or link: the student hears which.
  insert into public.notifications (profile_id, type, payload)
  select
    x.profile_id,
    'session_moved',
    jsonb_build_object(
      'session_id', n.id,
      'starts_at', n.starts_at,
      'was', o.starts_at,
      'what', case when n.starts_at is distinct from o.starts_at then 'time' else 'place' end
    )
  from updated n
  join previous o on o.id = n.id
  cross join lateral private.session_students(n.student_id, n.group_id, n.starts_at) as x (profile_id)
  where n.status = 'planifiee'
    and o.status = 'planifiee'
    and n.starts_at > now()
    and (
      n.starts_at is distinct from o.starts_at
      or n.mode is distinct from o.mode
      or n.location is distinct from o.location
      or n.meeting_url is distinct from o.meeting_url
    );

  return null;
end;
$function$;

-- ─────────────────────────────────────────────────────────────── cancelling a series

-- Cancels a planned session and, with p_following, the rest of its weekly series still planned
-- or asked for, in one statement: each student hears of it once. The tutor's own policies
-- apply (security invoker); the ids cancelled come back, the chosen one among them.
create function public.cancel_sessions(
  p_session_id uuid,
  p_reason text default null,
  p_following boolean default false
)
returns setof uuid
language sql
security invoker
set search_path = ''
as $function$
  with chosen as (
    select s.id, s.series_id, s.starts_at
    from public.sessions s
    where s.id = p_session_id
      and s.status = 'planifiee'
      and (select private.is_tutor())
    for update
  )
  update public.sessions s
  set status = 'annulee',
      cancelled_at = now(),
      cancelled_by = (select auth.uid()),
      cancellation_reason = nullif(btrim(coalesce(p_reason, '')), '')
  from chosen c
  where s.id = c.id
     or (
       p_following
       and c.series_id is not null
       and s.series_id = c.series_id
       and s.starts_at > c.starts_at
       and s.status in ('planifiee', 'en_attente')
     )
  returning s.id;
$function$;

revoke execute on function public.cancel_sessions(uuid, text, boolean) from public, anon;
grant execute on function public.cancel_sessions(uuid, text, boolean) to authenticated;

-- ─────────────────────────────────────────────────────────────── reminders in the centre

-- One day-before reminder a person and a session, however many runs claim it.
create unique index notifications_reminder_once on public.notifications
  (profile_id, (payload ->> 'session_id'))
  where type = 'session_reminder';

-- The job adds it when it claims the day-before reminder, before sending the email.
create function public.add_session_reminder(p_session_id uuid)
returns void
language sql
security definer
set search_path = ''
as $function$
  insert into public.notifications (profile_id, type, payload, emailed_at)
  select
    x.profile_id,
    'session_reminder',
    jsonb_build_object('session_id', s.id, 'starts_at', s.starts_at),
    now()
  from public.sessions s
  cross join lateral private.session_students(s.student_id, s.group_id, s.starts_at) as x (profile_id)
  where s.id = p_session_id
    and s.status = 'planifiee'
    and s.starts_at > now()
  on conflict (profile_id, (payload ->> 'session_id')) where type = 'session_reminder'
  do nothing;
$function$;

-- ─────────────────────────────────────────────────────────────── emails, for the job

drop function public.notifications_to_email(integer);

-- What may be emailed: ten minutes old, not yet claimed. The claim decides the rest.
create function public.notifications_to_email(p_limit integer default 200)
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $function$
  select n.id
  from public.notifications n
  where n.emailed_at is null
    and n.type in ('assignment_new', 'correction_ready')
    and n.created_at < now() - interval '10 minutes'
  order by n.created_at
  limit least(greatest(p_limit, 1), 1000);
$function$;

-- Claims one email: stamps it, and says whether to send and what, from the rows as they are
-- now. Nothing to send when it was read in time, when its homework is gone, when it is older
-- than two days, or when the student's follow-up has stopped (paused: corrections only).
create function public.claim_notification_email(p_id uuid)
returns table (
  send boolean,
  stamp timestamptz,
  email text,
  full_name text,
  type public.notification_type,
  title text,
  due_at timestamptz,
  assignment_id uuid,
  count integer
)
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_row public.notifications;
  v_stamp timestamptz := clock_timestamp();
begin
  update public.notifications n
  set emailed_at = v_stamp
  where n.id = p_id
    and n.emailed_at is null
    and n.created_at < now() - interval '10 minutes'
  returning n.* into v_row;
  if not found then
    return;
  end if;

  return query
  select
    v_row.read_at is null
      and a.id is not null
      and v_row.created_at > now() - interval '2 days'
      and p.email is not null
      and (p.status = 'actif' or (p.status = 'en_pause' and v_row.type = 'correction_ready')),
    v_stamp,
    p.email,
    p.full_name,
    v_row.type,
    a.title,
    a.due_at,
    a.id,
    coalesce((v_row.payload ->> 'count')::integer, 1)
  from public.profiles p
  left join public.assignments a on a.id = (v_row.payload ->> 'assignment_id')::uuid
  where p.id = v_row.profile_id;
end;
$function$;

alter table public.message_digests add column sent_at timestamptz;

drop function public.message_digests_due();

-- Who has messages unread for a quarter of an hour, newer than the last digest she got, from
-- the last two days, and no digest in the last three hours: with every unread message counted
-- per conversation, the same reading rules as the chat (D-080, D-083).
create function public.message_digests_due()
returns table (
  profile_id uuid,
  email text,
  full_name text,
  is_tutor boolean,
  newest timestamptz,
  conversations jsonb
)
language sql
stable
security definer
set search_path = ''
as $function$
  with readers as (
    -- Each person with the moment from which she reads each conversation.
    select c.id as conversation_id, p.id as profile_id, '-infinity'::timestamptz as reads_from
    from public.conversations c
    cross join public.profiles p
    where p.role = 'tutor'
    union all
    select c.id, c.student_id, '-infinity'::timestamptz
    from public.conversations c
    join public.profiles p on p.id = c.student_id and p.status in ('actif', 'en_pause')
    union all
    select c.id, gm.student_id, greatest(gm.joined_at, gm.chat_from)
    from public.conversations c
    join public.group_members gm on gm.group_id = c.group_id and gm.left_at is null
    join public.profiles p on p.id = gm.student_id and p.status in ('actif', 'en_pause')
  ),
  unread as (
    select r.profile_id, r.conversation_id, count(*) as n, max(m.created_at) as newest
    from readers r
    join public.messages m on m.conversation_id = r.conversation_id
    left join public.conversation_reads cr
      on cr.conversation_id = r.conversation_id and cr.profile_id = r.profile_id
    where m.sender_id <> r.profile_id
      and m.created_at >= r.reads_from
      and m.created_at > coalesce(cr.last_read_at, '-infinity'::timestamptz)
      and m.created_at < now() - interval '15 minutes'
    group by r.profile_id, r.conversation_id
  ),
  due as (
    select u.profile_id, max(u.newest) as newest
    from unread u
    left join public.message_digests d on d.profile_id = u.profile_id
    group by u.profile_id, d.sent_up_to, d.sent_at
    having max(u.newest) > coalesce(d.sent_up_to, '-infinity'::timestamptz)
      and max(u.newest) > now() - interval '2 days'
      and coalesce(d.sent_at, '-infinity'::timestamptz) < now() - interval '3 hours'
  )
  select
    due.profile_id,
    p.email,
    p.full_name,
    p.role = 'tutor',
    due.newest,
    (
      select jsonb_agg(
        jsonb_build_object(
          'conversation_id', u.conversation_id,
          'count', u.n,
          'student', (select s.full_name from public.conversations c join public.profiles s on s.id = c.student_id where c.id = u.conversation_id),
          'group', (select g.name from public.conversations c join public.groups g on g.id = c.group_id where c.id = u.conversation_id)
        )
        order by u.newest desc
      )
      from unread u
      where u.profile_id = due.profile_id
    )
  from due
  join public.profiles p on p.id = due.profile_id
  where p.email is not null;
$function$;

-- Claims a digest by compare-and-set: two runs never both send it. Returns the mark to put
-- back if the email cannot leave ('-infinity' when there was none), or null when not claimed.
create function public.claim_message_digest(p_profile_id uuid, p_up_to timestamptz)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_previous timestamptz;
begin
  select d.sent_up_to into v_previous from public.message_digests d where d.profile_id = p_profile_id;
  insert into public.message_digests as d (profile_id, sent_up_to, sent_at)
  values (p_profile_id, p_up_to, now())
  on conflict (profile_id) do update
    set sent_up_to = excluded.sent_up_to, sent_at = excluded.sent_at
    where d.sent_up_to < excluded.sent_up_to
      and coalesce(d.sent_at, '-infinity'::timestamptz) < now() - interval '3 hours';
  if not found then
    return null;
  end if;
  return coalesce(v_previous, '-infinity'::timestamptz);
end;
$function$;

-- Puts the previous mark back after a failed send, unless another run has moved it since.
create function public.release_message_digest(
  p_profile_id uuid,
  p_up_to timestamptz,
  p_previous timestamptz
)
returns void
language sql
security definer
set search_path = ''
as $function$
  update public.message_digests d
  set sent_up_to = p_previous, sent_at = null
  where d.profile_id = p_profile_id and d.sent_up_to = p_up_to;
$function$;

revoke execute on function public.add_session_reminder(uuid) from public, anon, authenticated;
grant execute on function public.add_session_reminder(uuid) to service_role;
revoke execute on function public.notifications_to_email(integer) from public, anon, authenticated;
grant execute on function public.notifications_to_email(integer) to service_role;
revoke execute on function public.claim_notification_email(uuid) from public, anon, authenticated;
grant execute on function public.claim_notification_email(uuid) to service_role;
revoke execute on function public.message_digests_due() from public, anon, authenticated;
grant execute on function public.message_digests_due() to service_role;
revoke execute on function public.claim_message_digest(uuid, timestamptz) from public, anon, authenticated;
grant execute on function public.claim_message_digest(uuid, timestamptz) to service_role;
revoke execute on function public.release_message_digest(uuid, timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.release_message_digest(uuid, timestamptz, timestamptz) to service_role;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
