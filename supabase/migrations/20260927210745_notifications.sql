-- The notification centre (DECISIONS.md, D-084, D-085).
--
-- Notifications are written by the database when what they tell happens, so no page can
-- forget one: a booking asked for, made, confirmed, declined, cancelled or moved; sessions
-- planned; homework given; a correction ready. Session triggers run once per statement, so a
-- weekly series planned or cancelled in one go makes one notification per person, not twenty.
-- Each person reads and marks her own; nobody writes them. Emails for new homework and ready
-- corrections, and a digest of unread messages, are sent by the scheduled job from here.

create type public.notification_type as enum (
  'booking_requested',
  'booking_made',
  'booking_cancelled',
  'booking_confirmed',
  'booking_declined',
  'session_planned',
  'session_cancelled',
  'session_moved',
  'session_reminder',
  'assignment_new',
  'correction_ready'
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  type public.notification_type not null,
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  read_at timestamptz,
  -- Set by the job once the email went, or once it was read in time: no email then.
  emailed_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_profile_created_idx on public.notifications (profile_id, created_at desc);
create index notifications_unread_idx on public.notifications (profile_id) where read_at is null;
create index notifications_to_email_idx on public.notifications (created_at)
  where emailed_at is null and type in ('assignment_new', 'correction_ready');

alter table public.notifications enable row level security;

create policy "notifications: select own"
  on public.notifications for select to authenticated
  using (profile_id = (select auth.uid()));

-- Read marks go through mark_notifications_read: nothing else of a row is hers to change.

create function public.mark_notifications_read(p_ids uuid[] default null)
returns void
language sql
security definer
set search_path = ''
as $function$
  update public.notifications n
  set read_at = now()
  where n.profile_id = (select auth.uid())
    and n.read_at is null
    and (p_ids is null or n.id = any (p_ids));
$function$;

revoke execute on function public.mark_notifications_read(uuid[]) from public, anon;
grant execute on function public.mark_notifications_read(uuid[]) to authenticated;

-- ─────────────────────────────────────────────────────────────── recipients

create function private.tutor_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $function$
  select p.id from public.profiles p where p.role = 'tutor' limit 1;
$function$;

-- The students a session is for who still follow lessons: the student, or the group's
-- members on the day it takes place (D-070).
create function private.session_students(p_student_id uuid, p_group_id uuid, p_starts_at timestamptz)
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $function$
  select p.id
  from public.profiles p
  where p.status = 'actif'
    and (
      p.id = p_student_id
      or exists (
        select 1
        from public.group_members gm
        where gm.group_id = p_group_id
          and gm.student_id = p.id
          and gm.joined_at <= p_starts_at
          and (gm.left_at is null or p_starts_at < gm.left_at)
      )
    );
$function$;

-- ─────────────────────────────────────────────────────────────── sessions

create function private.notify_sessions_inserted()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  -- A student's request, or her booking confirmed at once: the tutor hears of it.
  insert into public.notifications (profile_id, type, payload)
  select
    private.tutor_id(),
    case when s.status = 'en_attente' then 'booking_requested' else 'booking_made' end::public.notification_type,
    jsonb_build_object(
      'session_id', s.id,
      'starts_at', s.starts_at,
      'who', coalesce((select p.full_name from public.profiles p where p.id = s.student_id), '')
    )
  from inserted s
  where s.requested_by is not null
    and s.requested_by = s.student_id
    and s.status in ('en_attente', 'planifiee')
    and private.tutor_id() is not null;

  -- Sessions the tutor planned, still to come: one notification per student and per series.
  insert into public.notifications (profile_id, type, payload)
  select
    r.profile_id,
    'session_planned',
    jsonb_build_object(
      'session_id', (array_agg(r.id order by r.starts_at))[1],
      'starts_at', min(r.starts_at),
      'count', count(*)
    )
  from (
    select s.id, s.starts_at, s.series_id, x.profile_id
    from inserted s
    cross join lateral private.session_students(s.student_id, s.group_id, s.starts_at) as x (profile_id)
    where s.status = 'planifiee'
      and (s.requested_by is null or s.requested_by <> coalesce(s.student_id, '00000000-0000-0000-0000-000000000000'))
      and s.starts_at > now()
  ) r
  group by r.profile_id, coalesce(r.series_id, r.id);

  return null;
end;
$function$;

create trigger sessions_notify_inserted
  after insert on public.sessions
  referencing new table as inserted
  for each statement execute function private.notify_sessions_inserted();

create function private.notify_sessions_updated()
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

  -- Moved to another time.
  insert into public.notifications (profile_id, type, payload)
  select
    x.profile_id,
    'session_moved',
    jsonb_build_object('session_id', n.id, 'starts_at', n.starts_at, 'was', o.starts_at)
  from updated n
  join previous o on o.id = n.id
  cross join lateral private.session_students(n.student_id, n.group_id, n.starts_at) as x (profile_id)
  where n.status = 'planifiee'
    and o.status = 'planifiee'
    and n.starts_at is distinct from o.starts_at
    and n.starts_at > now();

  return null;
end;
$function$;

create trigger sessions_notify_updated
  after update on public.sessions
  referencing old table as previous new table as updated
  for each statement execute function private.notify_sessions_updated();

-- ─────────────────────────────────────────────────────────────── homework

create function private.notify_assignment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  insert into public.notifications (profile_id, type, payload)
  select
    p.id,
    'assignment_new',
    jsonb_build_object('assignment_id', new.id, 'title', new.title, 'due_at', new.due_at)
  from public.profiles p
  where p.status = 'actif'
    and (
      p.id = new.student_id
      or exists (
        select 1
        from public.group_members gm
        where gm.group_id = new.group_id
          and gm.student_id = p.id
          and gm.left_at is null
      )
    );
  return null;
end;
$function$;

create trigger assignments_notify
  after insert on public.assignments
  for each row execute function private.notify_assignment();

-- A copy the tutor corrected: one notification per homework while it is unread and not yet
-- emailed, counting the exercises as she goes. Answers graded by the database at once are
-- seen at once: nothing to tell.
create function private.notify_correction()
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

create trigger submissions_notify_correction
  after update of status on public.submissions
  for each row
  when (old.status = 'rendu' and new.status = 'corrige')
  execute function private.notify_correction();

-- ─────────────────────────────────────────────────────────────── emails, for the job
-- Called with the secret key only.

-- Homework and corrections to email: ten minutes old, so corrections made in a row go in one
-- email. One already read in the app needs no email; the job stamps it without sending.
create function public.notifications_to_email(p_limit integer default 200)
returns table (
  id uuid,
  profile_id uuid,
  email text,
  full_name text,
  type public.notification_type,
  payload jsonb,
  read boolean
)
language sql
stable
security definer
set search_path = ''
as $function$
  select n.id, n.profile_id, p.email, p.full_name, n.type, n.payload, n.read_at is not null
  from public.notifications n
  join public.profiles p on p.id = n.profile_id
  where n.emailed_at is null
    and n.type in ('assignment_new', 'correction_ready')
    and n.created_at < now() - interval '10 minutes'
  order by n.created_at
  limit least(greatest(p_limit, 1), 1000);
$function$;

-- Who has messages unread for a quarter of an hour that no digest has told her of yet, with
-- how many in each conversation. The same reading rules as the chat (D-080, D-083).
create table public.message_digests (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  sent_up_to timestamptz not null
);

alter table public.message_digests enable row level security;
-- No policy: only the job, with the secret key, reads or writes it.

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
    left join public.message_digests d on d.profile_id = r.profile_id
    where m.sender_id <> r.profile_id
      and m.created_at >= r.reads_from
      and m.created_at > coalesce(cr.last_read_at, '-infinity'::timestamptz)
      and m.created_at > coalesce(d.sent_up_to, '-infinity'::timestamptz)
      and m.created_at < now() - interval '15 minutes'
    group by r.profile_id, r.conversation_id
  )
  select
    u.profile_id,
    p.email,
    p.full_name,
    p.role = 'tutor',
    max(u.newest),
    jsonb_agg(
      jsonb_build_object(
        'conversation_id', u.conversation_id,
        'count', u.n,
        'student', (select s.full_name from public.conversations c join public.profiles s on s.id = c.student_id where c.id = u.conversation_id),
        'group', (select g.name from public.conversations c join public.groups g on g.id = c.group_id where c.id = u.conversation_id)
      )
      order by u.newest desc
    )
  from unread u
  join public.profiles p on p.id = u.profile_id
  where p.email is not null
  group by u.profile_id, p.email, p.full_name, p.role;
$function$;

revoke execute on function public.notifications_to_email(integer) from public, anon, authenticated;
grant execute on function public.notifications_to_email(integer) to service_role;
revoke execute on function public.message_digests_due() from public, anon, authenticated;
grant execute on function public.message_digests_due() to service_role;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
