-- Core identity: levels, profiles and roles, groups, invite codes, tutor-only notes.
--
-- Policy helpers live in the `private` schema so PostgREST never exposes them as RPCs.
-- Every table has RLS enabled and one explicit policy per operation. Anything without
-- a policy is denied.

create schema if not exists private;
grant usage on schema private to anon, authenticated, service_role;

-- ─────────────────────────────────────────────────────────────── types

create type public.user_role as enum ('tutor', 'student', 'parent');
create type public.student_status as enum ('actif', 'en_pause', 'arrete');

-- ─────────────────────────────────────────────────────────────── shared triggers

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────── levels
-- Moroccan school levels are reference data, not an enum, so the tutor can add a track.

create table public.levels (
  code text primary key check (code ~ '^[0-9A-Z-]{2,12}$'),
  label text not null check (char_length(label) between 1 and 80),
  cycle text not null check (cycle in ('college', 'tronc_commun', '1bac', '2bac')),
  position smallint not null unique
);

insert into public.levels (code, label, cycle, position) values
  ('1AC', '1re année collège', 'college', 10),
  ('2AC', '2e année collège', 'college', 20),
  ('3AC', '3e année collège', 'college', 30),
  ('TC', 'Tronc commun', 'tronc_commun', 40),
  ('1BAC-SM', '1re bac Sciences mathématiques', '1bac', 50),
  ('1BAC-SE', '1re bac Sciences expérimentales', '1bac', 60),
  ('1BAC-SVT', '1re bac SVT', '1bac', 70),
  ('1BAC-ECO', '1re bac Sciences économiques', '1bac', 80),
  ('2BAC-SMA', '2e bac Sciences mathématiques A', '2bac', 90),
  ('2BAC-SMB', '2e bac Sciences mathématiques B', '2bac', 100),
  ('2BAC-PC', '2e bac Sciences physiques', '2bac', 110),
  ('2BAC-SVT', '2e bac SVT', '2bac', 120),
  ('2BAC-ECO', '2e bac Sciences économiques', '2bac', 130);

-- ─────────────────────────────────────────────────────────────── profiles

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'student',
  full_name text not null default '' check (char_length(full_name) <= 120),
  email text,
  phone text check (phone is null or phone ~ '^\+?[0-9 ]{6,20}$'),
  level_code text references public.levels (code) on update cascade,
  school text check (char_length(school) <= 120),
  guardian_name text check (char_length(guardian_name) <= 120),
  guardian_phone text check (guardian_phone is null or guardian_phone ~ '^\+?[0-9 ]{6,20}$'),
  status public.student_status not null default 'actif',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Exactly one tutor.
create unique index profiles_single_tutor on public.profiles (role) where role = 'tutor';
create index profiles_level_code_idx on public.profiles (level_code);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

-- ─────────────────────────────────────────────────────────────── role helpers

create function private.is_tutor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'tutor'
  );
$$;

-- The caller's level, only while their account is active. Drives "enrolled" lesson visibility.
create function private.my_level()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select level_code
  from public.profiles
  where id = (select auth.uid())
    and role = 'student'
    and status = 'actif';
$$;

-- Students may edit their own contact details, never their role, status, level or email.
create function private.guard_profile_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- No end-user JWT: auth triggers, the secret key, or a migration.
  if (select auth.uid()) is null then
    return new;
  end if;

  if private.is_tutor() then
    if new.id = (select auth.uid()) and new.role <> 'tutor' then
      raise exception 'tutor_cannot_demote_self' using errcode = '42501';
    end if;
    return new;
  end if;

  if new.role is distinct from old.role
     or new.status is distinct from old.status
     or new.level_code is distinct from old.level_code
     or new.email is distinct from old.email then
    raise exception 'profile_field_not_editable' using errcode = '42501';
  end if;

  return new;
end;
$$;

create trigger profiles_guard_update
  before update on public.profiles
  for each row execute function private.guard_profile_update();

alter table public.profiles enable row level security;

create policy "profiles: select own or tutor"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select private.is_tutor()));

create policy "profiles: update own or tutor"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()) or (select private.is_tutor()))
  with check (id = (select auth.uid()) or (select private.is_tutor()));

-- No insert policy: rows are created by the auth trigger below.
-- No delete policy: rows go when the auth user is deleted (cascade).

-- ─────────────────────────────────────────────────────────────── groups

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  level_code text references public.levels (code) on update cascade,
  schedule_label text check (char_length(schedule_label) <= 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index groups_level_code_idx on public.groups (level_code);

create trigger groups_set_updated_at
  before update on public.groups
  for each row execute function private.set_updated_at();

create table public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, student_id)
);

create index group_members_student_id_idx on public.group_members (student_id);

create function private.is_group_member(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.group_members
    where group_id = p_group_id
      and student_id = (select auth.uid())
  );
$$;

alter table public.groups enable row level security;

create policy "groups: select member or tutor"
  on public.groups for select to authenticated
  using ((select private.is_tutor()) or private.is_group_member(id));

create policy "groups: insert tutor"
  on public.groups for insert to authenticated
  with check ((select private.is_tutor()));

create policy "groups: update tutor"
  on public.groups for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "groups: delete tutor"
  on public.groups for delete to authenticated
  using ((select private.is_tutor()));

alter table public.group_members enable row level security;

create policy "group_members: select own or tutor"
  on public.group_members for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "group_members: insert tutor"
  on public.group_members for insert to authenticated
  with check ((select private.is_tutor()));

create policy "group_members: update tutor"
  on public.group_members for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "group_members: delete tutor"
  on public.group_members for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── student settings

create table public.student_settings (
  student_id uuid primary key references public.profiles (id) on delete cascade,
  auto_confirm_bookings boolean not null default false,
  objectives text check (char_length(objectives) <= 2000),
  updated_at timestamptz not null default now()
);

create trigger student_settings_set_updated_at
  before update on public.student_settings
  for each row execute function private.set_updated_at();

alter table public.student_settings enable row level security;

create policy "student_settings: select own or tutor"
  on public.student_settings for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "student_settings: insert tutor"
  on public.student_settings for insert to authenticated
  with check ((select private.is_tutor()));

create policy "student_settings: update tutor"
  on public.student_settings for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "student_settings: delete tutor"
  on public.student_settings for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── private notes
-- RLS is per row, not per column: a note stored on `profiles` would be readable by the
-- student who owns that row. Notes therefore live here, and only the tutor has policies.
-- `session_id` (added with the sessions table) links a note to a session log.

create table public.student_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index student_notes_student_id_idx on public.student_notes (student_id, created_at desc);

create trigger student_notes_set_updated_at
  before update on public.student_notes
  for each row execute function private.set_updated_at();

alter table public.student_notes enable row level security;

create policy "student_notes: select tutor"
  on public.student_notes for select to authenticated
  using ((select private.is_tutor()));

create policy "student_notes: insert tutor"
  on public.student_notes for insert to authenticated
  with check ((select private.is_tutor()));

create policy "student_notes: update tutor"
  on public.student_notes for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "student_notes: delete tutor"
  on public.student_notes for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── invite codes

create table public.invite_codes (
  code text primary key check (code ~ '^[A-HJ-NP-Z2-9]{8}$'),
  level_code text references public.levels (code) on update cascade,
  group_id uuid references public.groups (id) on delete set null,
  max_uses integer not null default 1 check (max_uses between 1 and 200),
  used_count integer not null default 0 check (used_count >= 0),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index invite_codes_level_code_idx on public.invite_codes (level_code);
create index invite_codes_group_id_idx on public.invite_codes (group_id);

alter table public.invite_codes enable row level security;

create policy "invite_codes: select tutor"
  on public.invite_codes for select to authenticated
  using ((select private.is_tutor()));

create policy "invite_codes: insert tutor"
  on public.invite_codes for insert to authenticated
  with check ((select private.is_tutor()));

create policy "invite_codes: update tutor"
  on public.invite_codes for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "invite_codes: delete tutor"
  on public.invite_codes for delete to authenticated
  using ((select private.is_tutor()));

-- Lets the sign-up form say "this code doesn't work" before creating an account.
-- Codes are 8 characters from a 32-letter alphabet, so guessing one is impractical.
create function public.invite_code_is_valid(p_code text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.invite_codes
    where code = upper(trim(p_code))
      and used_count < max_uses
      and (expires_at is null or expires_at > now())
  );
$$;

revoke execute on function public.invite_code_is_valid(text) from public;
grant execute on function public.invite_code_is_valid(text) to anon, authenticated;

-- ─────────────────────────────────────────────────────────────── auth → profile
-- Nobody chooses their own role. A new account is always a student, and it must come
-- either with a valid invite code (self sign-up) or from the tutor's provisioning action,
-- which marks `app_metadata.provisioned_by` — a field only the secret key can set.

create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_code text := upper(nullif(trim(new.raw_user_meta_data ->> 'invite_code'), ''));
  v_provisioned boolean := coalesce(new.raw_app_meta_data ->> 'provisioned_by', '') in ('tutor', 'seed');
  v_invite public.invite_codes;
  v_level text;
begin
  if v_code is not null then
    select * into v_invite
    from public.invite_codes
    where code = v_code
    for update;

    if not found
       or v_invite.used_count >= v_invite.max_uses
       or (v_invite.expires_at is not null and v_invite.expires_at <= now()) then
      raise exception 'invite_code_invalid' using errcode = 'P0001';
    end if;

    update public.invite_codes
    set used_count = used_count + 1
    where code = v_code;

    v_level := v_invite.level_code;
  elsif v_provisioned then
    v_level := nullif(new.raw_app_meta_data ->> 'level_code', '');
  else
    raise exception 'invite_code_required' using errcode = 'P0001';
  end if;

  insert into public.profiles (id, role, full_name, email, level_code)
  values (
    new.id,
    'student',
    left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 120),
    new.email,
    v_level
  );

  insert into public.student_settings (student_id) values (new.id);

  if v_invite.group_id is not null then
    insert into public.group_members (group_id, student_id)
    values (v_invite.group_id, new.id)
    on conflict do nothing;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create function private.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles set email = new.email where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function private.handle_user_email_change();

-- Supabase Auth writes auth.users as supabase_auth_admin; let it reach the trigger functions.
grant usage on schema private to supabase_auth_admin;
grant execute on function private.handle_new_user() to supabase_auth_admin;
grant execute on function private.handle_user_email_change() to supabase_auth_admin;

-- Levels are public reference data.
alter table public.levels enable row level security;

create policy "levels: select everyone"
  on public.levels for select to anon, authenticated
  using (true);

create policy "levels: insert tutor"
  on public.levels for insert to authenticated
  with check ((select private.is_tutor()));

create policy "levels: update tutor"
  on public.levels for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "levels: delete tutor"
  on public.levels for delete to authenticated
  using ((select private.is_tutor()));

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
