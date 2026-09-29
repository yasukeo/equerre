-- The parent view (DECISIONS.md, D-091): read-only.
--
-- A parent account is created by the tutor, from a student's file, never by signing up: she
-- makes a one-use invitation for one student and one address, and the account created with
-- it becomes a parent linked to that student. The same parent can be linked to several
-- children. A parent reads, for her linked children only, what they read about themselves:
-- sessions, homework and grades, the account and its receipts. She writes nothing.
--
-- Rather than widen every student policy, the parent reads through functions that check the
-- link first (private.is_guardian_of) and return exactly what the view shows; the accounts
-- (D-087) and payments open to her through the same check.

-- ─────────────────────────────────────────────────────────────── links and invitations

create table public.guardian_links (
  parent_id uuid not null references public.profiles (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (parent_id, student_id)
);

create index guardian_links_student_idx on public.guardian_links (student_id);

alter table public.guardian_links enable row level security;

create policy "guardian_links: select own or tutor"
  on public.guardian_links for select to authenticated
  using ((select private.is_tutor()) or parent_id = (select auth.uid()));

-- Linking an existing parent to another child, or unlinking one: the tutor's.
create policy "guardian_links: insert tutor"
  on public.guardian_links for insert to authenticated
  with check (
    (select private.is_tutor())
    and exists (select 1 from public.profiles p where p.id = parent_id and p.role = 'parent')
    and exists (select 1 from public.profiles p where p.id = student_id and p.role = 'student')
  );

create policy "guardian_links: delete tutor"
  on public.guardian_links for delete to authenticated
  using ((select private.is_tutor()));

create table public.parent_invites (
  token text primary key check (token ~ '^[0-9a-f]{64}$'),
  student_id uuid not null references public.profiles (id) on delete cascade,
  email text not null check (char_length(email) between 3 and 320),
  full_name text not null check (char_length(btrim(full_name)) between 1 and 120),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '1 day',
  used_at timestamptz
);

create index parent_invites_student_idx on public.parent_invites (student_id);

alter table public.parent_invites enable row level security;

create policy "parent_invites: select tutor"
  on public.parent_invites for select to authenticated
  using ((select private.is_tutor()));

create policy "parent_invites: insert tutor"
  on public.parent_invites for insert to authenticated
  with check (
    (select private.is_tutor())
    and used_at is null
    and exists (select 1 from public.profiles p where p.id = student_id and p.role = 'student')
  );

create policy "parent_invites: delete tutor"
  on public.parent_invites for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── sign-up

-- Nobody chooses their own role (D-025). An account is a parent only when it is created with
-- an unused, unexpired invitation made for its very address; otherwise the rules of the
-- student sign-up apply, unchanged. The seed makes its parent with provisioned_by = seed.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_code text := upper(nullif(trim(v_meta ->> 'invite_code'), ''));
  v_parent_token text := nullif(trim(v_meta ->> 'parent_invite'), '');
  v_seeded boolean := coalesce(new.raw_app_meta_data ->> 'provisioned_by', '') = 'seed';
  v_invite public.invite_codes;
  v_parent_invite public.parent_invites;
  v_level text;
  v_phone text := nullif(trim(v_meta ->> 'phone'), '');
  v_guardian_phone text := nullif(trim(v_meta ->> 'guardian_phone'), '');
begin
  if v_parent_token is not null then
    select * into v_parent_invite
    from public.parent_invites
    where token = v_parent_token
    for update;
    if not found
       or v_parent_invite.used_at is not null
       or v_parent_invite.expires_at <= now()
       or lower(v_parent_invite.email) <> lower(coalesce(new.email, '')) then
      raise exception 'parent_invite_invalid' using errcode = 'P0001';
    end if;
    update public.parent_invites set used_at = now() where token = v_parent_token;
    insert into public.profiles (id, role, full_name, email)
    values (new.id, 'parent', left(v_parent_invite.full_name, 120), new.email);
    insert into public.guardian_links (parent_id, student_id)
    values (new.id, v_parent_invite.student_id);
    return new;
  end if;

  if v_seeded and coalesce(new.raw_app_meta_data ->> 'role', '') = 'parent' then
    insert into public.profiles (id, role, full_name, email)
    values (new.id, 'parent', left(coalesce(v_meta ->> 'full_name', ''), 120), new.email);
    return new;
  end if;

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
  elsif v_seeded then
    v_level := nullif(new.raw_app_meta_data ->> 'level_code', '');
  else
    raise exception 'invite_code_required' using errcode = 'P0001';
  end if;

  -- Contact details come from the person signing up, so a malformed value is dropped rather
  -- than failing the whole sign-up on a check constraint.
  if v_phone !~ '^\+?[0-9 ]{6,20}$' then
    v_phone := null;
  end if;
  if v_guardian_phone !~ '^\+?[0-9 ]{6,20}$' then
    v_guardian_phone := null;
  end if;

  insert into public.profiles (
    id, role, full_name, email, level_code, phone, school, guardian_name, guardian_phone
  )
  values (
    new.id,
    'student',
    left(coalesce(v_meta ->> 'full_name', ''), 120),
    new.email,
    v_level,
    v_phone,
    left(nullif(trim(v_meta ->> 'school'), ''), 120),
    left(nullif(trim(v_meta ->> 'guardian_name'), ''), 120),
    v_guardian_phone
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

-- ─────────────────────────────────────────────────────────────── what a parent reads

create function private.is_guardian_of(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.guardian_links gl
    where gl.parent_id = (select auth.uid())
      and gl.student_id = p_student_id
  );
$function$;

-- Accounts (D-087): the tutor's, her own, and her children's for a parent.
create or replace function private.can_see_account(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select (select private.is_tutor())
    or p_student_id = (select auth.uid())
    or (select private.is_guardian_of(p_student_id));
$function$;

drop policy "payments: select own or tutor" on public.payments;
create policy "payments: select own, child's or tutor"
  on public.payments for select to authenticated
  using (
    (select private.is_tutor())
    or student_id = (select auth.uid())
    or private.is_guardian_of(student_id)
  );

-- Her children's names, levels and standing; her own row already reads through « own ».
create policy "profiles: select children"
  on public.profiles for select to authenticated
  using (private.is_guardian_of(id));

-- The children linked to the parent calling, with what the view heads each one with.
create function public.my_children()
returns table (
  id uuid,
  full_name text,
  level_label text,
  status public.student_status
)
language sql
stable
security definer
set search_path = ''
as $function$
  select p.id, p.full_name, l.label, p.status
  from public.guardian_links gl
  join public.profiles p on p.id = gl.student_id
  left join public.levels l on l.code = p.level_code
  where gl.parent_id = (select auth.uid())
  order by p.full_name;
$function$;

-- A child's sessions over four months either side of today: her own, and her groups' on the
-- days she was in them, with her attendance. Nothing unless the caller is her parent.
create function public.child_sessions(p_student_id uuid)
returns table (
  id uuid,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.session_status,
  mode public.session_mode,
  location text,
  meeting_url text,
  type_name text,
  group_name text,
  attendance public.attendance_status,
  chapter_title text,
  homework text,
  recap text
)
language sql
stable
security definer
set search_path = ''
as $function$
  select
    s.id, s.starts_at, s.ends_at, s.status, s.mode, s.location, s.meeting_url,
    st.name, g.name, a.status, c.title, s.homework, s.recap
  from public.sessions s
  left join public.session_types st on st.id = s.session_type_id
  left join public.groups g on g.id = s.group_id
  left join public.chapters c on c.id = s.covered_chapter_id
  left join public.session_attendance a on a.session_id = s.id and a.student_id = p_student_id
  where (select private.is_guardian_of(p_student_id))
    and s.status <> 'refusee'
    and s.starts_at between now() - interval '120 days' and now() + interval '120 days'
    and (
      s.student_id = p_student_id
      or (
        s.group_id is not null
        and exists (
          select 1
          from public.group_members gm
          where gm.group_id = s.group_id
            and gm.student_id = p_student_id
            and gm.joined_at <= s.starts_at
            and (gm.left_at is null or s.starts_at < gm.left_at)
        )
      )
    )
  order by s.starts_at;
$function$;

-- A child's homework, as her own list shows it (D-046): the homework that reaches her, with
-- its exercises in order, and every answer and opened solution of hers, so the same rules
-- (src/lib/homework/work.ts) say where she stands on each exercise.
create function public.child_homework(p_student_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $function$
  with reaching as (
    select a.id, a.title, a.due_at, g.name as group_name
    from public.assignments a
    left join public.groups g on g.id = a.group_id
    where a.student_id = p_student_id
      or (
        a.group_id is not null
        and (
          exists (
            select 1
            from public.group_members gm
            where gm.group_id = a.group_id
              and gm.student_id = p_student_id
              and gm.joined_at <= a.due_at
              and (gm.left_at is null or a.due_at <= gm.left_at)
          )
          or exists (
            select 1 from public.submissions s
            where s.assignment_id = a.id and s.student_id = p_student_id
          )
          or exists (
            select 1 from public.exercise_reveals r
            where r.assignment_id = a.id and r.student_id = p_student_id
          )
        )
      )
  )
  select case when (select private.is_guardian_of(p_student_id)) then
    jsonb_build_object(
      'assignments', coalesce((
        select jsonb_agg(
          jsonb_build_object(
            'id', r.id,
            'title', r.title,
            'due_at', r.due_at,
            'group_name', r.group_name,
            'exercises', coalesce((
              select jsonb_agg(
                jsonb_build_object('id', e.id, 'title', e.title) order by ai.position
              )
              from public.assignment_items ai
              join public.exercises e on e.id = ai.exercise_id
              where ai.assignment_id = r.id
            ), '[]'::jsonb)
          )
          order by r.due_at desc
        )
        from reaching r
      ), '[]'::jsonb),
      'submissions', coalesce((
        select jsonb_agg(jsonb_build_object(
          'assignment_id', s.assignment_id,
          'exercise_id', s.exercise_id,
          'status', s.status,
          'grade', s.grade
        ))
        from public.submissions s
        where s.student_id = p_student_id
      ), '[]'::jsonb),
      'reveals', coalesce((
        select jsonb_agg(jsonb_build_object(
          'assignment_id', r.assignment_id,
          'exercise_id', r.exercise_id
        ))
        from public.exercise_reveals r
        where r.student_id = p_student_id
      ), '[]'::jsonb)
    )
  end;
$function$;

-- ─────────────────────────────────────────────────────────────── statement labels

-- The statement says what each line was itself: a parent cannot read the sessions table, and
-- a student no longer reads a group's sessions once she has left it.
drop function public.account_statement(uuid);

create function public.account_statement(p_student_id uuid)
returns table (
  seq bigint,
  at timestamptz,
  minutes numeric,
  balance_minutes numeric,
  session_id uuid,
  payment_id uuid,
  covered boolean,
  label text
)
language sql
stable
security definer
set search_path = ''
as $function$
  select
    lines.seq, lines.at, lines.minutes, lines.balance_minutes, lines.session_id,
    lines.payment_id, lines.covered,
    coalesce(g.name, st.name, pay.label, '')
  from (
    select
      row_number() over w as seq,
      l.at,
      l.minutes,
      sum(l.minutes) over (w rows between unbounded preceding and current row) as balance_minutes,
      l.session_id,
      l.payment_id,
      l.covered
    from private.account_lines(array[p_student_id]) l
    window w as (order by l.at, l.minutes desc, l.session_id, l.payment_id)
  ) lines
  left join public.sessions s on s.id = lines.session_id
  left join public.groups g on g.id = s.group_id
  left join public.session_types st on st.id = s.session_type_id
  left join public.payments pay on pay.id = lines.payment_id
  order by lines.seq desc;
$function$;

revoke execute on function public.account_statement(uuid) from public, anon;
grant execute on function public.account_statement(uuid) to authenticated;
revoke execute on function public.my_children() from public, anon;
grant execute on function public.my_children() to authenticated;
revoke execute on function public.child_sessions(uuid) from public, anon;
grant execute on function public.child_sessions(uuid) to authenticated;
revoke execute on function public.child_homework(uuid) from public, anon;
grant execute on function public.child_homework(uuid) to authenticated;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
grant execute on function private.handle_new_user() to supabase_auth_admin;
