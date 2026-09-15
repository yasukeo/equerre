-- Sessions: types, weekly series, the sessions themselves and group attendance.
-- Availability, exceptions and student booking policies arrive with phase 2.
--
-- Every timestamp is timestamptz (UTC on disk). Rendering goes through Africa/Casablanca.

create type public.session_mode as enum ('en_ligne', 'domicile', 'chez_prof');
create type public.session_status as enum (
  'en_attente',  -- requested by a student, waiting for the tutor
  'planifiee',   -- confirmed
  'terminee',
  'annulee',
  'absent',
  'refusee'      -- request declined
);
create type public.attendance_status as enum ('present', 'absent', 'excuse');

-- ─────────────────────────────────────────────────────────────── session types

create table public.session_types (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  duration_min integer not null check (duration_min between 15 and 480),
  mode public.session_mode not null,
  price_mad numeric(8, 2) not null check (price_mad >= 0),
  is_group boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger session_types_set_updated_at
  before update on public.session_types
  for each row execute function private.set_updated_at();

alter table public.session_types enable row level security;

-- Active types and prices are shown on the public site.
create policy "session_types: select active or tutor"
  on public.session_types for select to anon, authenticated
  using (is_active or (select private.is_tutor()));

create policy "session_types: insert tutor"
  on public.session_types for insert to authenticated
  with check ((select private.is_tutor()));

create policy "session_types: update tutor"
  on public.session_types for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "session_types: delete tutor"
  on public.session_types for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── series

create table public.session_series (
  id uuid primary key default gen_random_uuid(),
  rule text not null default 'FREQ=WEEKLY' check (rule ~ '^FREQ=WEEKLY(;INTERVAL=[1-4])?$'),
  starts_on date not null,
  ends_on date,
  created_at timestamptz not null default now(),
  check (ends_on is null or ends_on >= starts_on)
);

alter table public.session_series enable row level security;

create policy "session_series: select tutor"
  on public.session_series for select to authenticated
  using ((select private.is_tutor()));

create policy "session_series: insert tutor"
  on public.session_series for insert to authenticated
  with check ((select private.is_tutor()));

create policy "session_series: update tutor"
  on public.session_series for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "session_series: delete tutor"
  on public.session_series for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── sessions

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles (id) on delete cascade,
  group_id uuid references public.groups (id) on delete cascade,
  session_type_id uuid not null references public.session_types (id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.session_status not null default 'planifiee',
  mode public.session_mode not null,
  location text check (char_length(location) <= 200),
  meeting_url text check (meeting_url is null or meeting_url ~ '^https://'),
  series_id uuid references public.session_series (id) on delete set null,
  covered_chapter_id uuid references public.chapters (id) on delete set null,
  homework text check (char_length(homework) <= 2000),
  -- Shared with the student. Anything private goes to student_notes with session_id.
  recap text check (char_length(recap) <= 2000),
  requested_by uuid references public.profiles (id) on delete set null,
  cancelled_at timestamptz,
  cancelled_by uuid references public.profiles (id) on delete set null,
  cancellation_reason text check (char_length(cancellation_reason) <= 500),
  reminder_24h_sent_at timestamptz,
  reminder_2h_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  -- A session is for one student or one group, never both.
  check ((student_id is null) <> (group_id is null)),
  -- She can't be in two places at once: confirmed sessions never overlap.
  constraint sessions_no_overlap exclude using gist (
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (status in ('planifiee', 'terminee', 'absent'))
);

create index sessions_starts_at_idx on public.sessions (starts_at);
create index sessions_student_starts_at_idx on public.sessions (student_id, starts_at);
create index sessions_group_starts_at_idx on public.sessions (group_id, starts_at);
create index sessions_session_type_id_idx on public.sessions (session_type_id);
create index sessions_series_id_idx on public.sessions (series_id);
create index sessions_covered_chapter_id_idx on public.sessions (covered_chapter_id);
create index sessions_requested_by_idx on public.sessions (requested_by);
create index sessions_cancelled_by_idx on public.sessions (cancelled_by);

create trigger sessions_set_updated_at
  before update on public.sessions
  for each row execute function private.set_updated_at();

alter table public.sessions enable row level security;

create policy "sessions: select own, own group, or tutor"
  on public.sessions for select to authenticated
  using (
    (select private.is_tutor())
    or student_id = (select auth.uid())
    or (group_id is not null and private.is_group_member(group_id))
  );

create policy "sessions: insert tutor"
  on public.sessions for insert to authenticated
  with check ((select private.is_tutor()));

create policy "sessions: update tutor"
  on public.sessions for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "sessions: delete tutor"
  on public.sessions for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── attendance

create table public.session_attendance (
  session_id uuid not null references public.sessions (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  status public.attendance_status not null,
  primary key (session_id, student_id)
);

create index session_attendance_student_id_idx on public.session_attendance (student_id);

alter table public.session_attendance enable row level security;

create policy "session_attendance: select own or tutor"
  on public.session_attendance for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "session_attendance: insert tutor"
  on public.session_attendance for insert to authenticated
  with check ((select private.is_tutor()));

create policy "session_attendance: update tutor"
  on public.session_attendance for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "session_attendance: delete tutor"
  on public.session_attendance for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── notes ↔ sessions

alter table public.student_notes
  add column session_id uuid references public.sessions (id) on delete set null;

create index student_notes_session_id_idx on public.student_notes (session_id);

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
