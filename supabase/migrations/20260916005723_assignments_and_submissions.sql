-- Assignments, submissions and corrections (brief §4.3).
--
-- Reading rules follow phase 0's shape: solutions and grades live where a student can only
-- reach them once they have earned them, and every policy is written per operation.
-- Self-grading happens in the database, so the expected answer never travels to a browser.

create type public.submission_status as enum ('rendu', 'corrige');

-- ─────────────────────────────────────────────────────────────── assignments

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  instructions text check (char_length(instructions) <= 2000),
  due_at timestamptz not null,
  student_id uuid references public.profiles (id) on delete cascade,
  group_id uuid references public.groups (id) on delete cascade,
  created_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- One student or one group, never both (same rule as sessions).
  check ((student_id is null) <> (group_id is null))
);

create index assignments_student_due_idx on public.assignments (student_id, due_at desc);
create index assignments_group_due_idx on public.assignments (group_id, due_at desc);
create index assignments_created_by_idx on public.assignments (created_by);

create trigger assignments_set_updated_at
  before update on public.assignments
  for each row execute function private.set_updated_at();

create table public.assignment_items (
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id) on delete restrict,
  position integer not null default 0,
  primary key (assignment_id, exercise_id)
);

create index assignment_items_exercise_idx on public.assignment_items (exercise_id);

-- True when the assignment is addressed to the signed-in student, directly or through a group.
create function private.is_assigned_to_me(p_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.assignments a
    where a.id = p_assignment_id
      and (
        a.student_id = (select auth.uid())
        or (
          a.group_id is not null
          and exists (
            select 1
            from public.group_members gm
            where gm.group_id = a.group_id
              and gm.student_id = (select auth.uid())
          )
        )
      )
  );
$$;

alter table public.assignments enable row level security;

create policy "assignments: select mine or tutor"
  on public.assignments for select to authenticated
  using ((select private.is_tutor()) or private.is_assigned_to_me(id));

create policy "assignments: insert tutor"
  on public.assignments for insert to authenticated
  with check ((select private.is_tutor()));

create policy "assignments: update tutor"
  on public.assignments for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "assignments: delete tutor"
  on public.assignments for delete to authenticated
  using ((select private.is_tutor()));

alter table public.assignment_items enable row level security;

create policy "assignment_items: select mine or tutor"
  on public.assignment_items for select to authenticated
  using ((select private.is_tutor()) or private.is_assigned_to_me(assignment_id));

create policy "assignment_items: insert tutor"
  on public.assignment_items for insert to authenticated
  with check ((select private.is_tutor()));

create policy "assignment_items: update tutor"
  on public.assignment_items for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "assignment_items: delete tutor"
  on public.assignment_items for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── submissions

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id) on delete restrict,
  student_id uuid not null references public.profiles (id) on delete cascade,
  status public.submission_status not null default 'rendu',
  -- { "type": "upload" } | { "type": "numeric", "value": "4,8" } | { "type": "mcq", "choiceIds": ["a"] }
  answer jsonb not null default '{}'::jsonb check (jsonb_typeof(answer) = 'object'),
  -- Storage paths in the private `submissions` bucket, one per photographed page.
  file_paths text[] not null default '{}',
  auto_graded boolean not null default false,
  grade numeric(4, 2) check (grade is null or (grade >= 0 and grade <= 20)),
  feedback text check (char_length(feedback) <= 4000),
  submitted_at timestamptz not null default now(),
  corrected_at timestamptz,
  corrected_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now(),
  -- One submission per exercise per student; sending again replaces the pages.
  unique (assignment_id, exercise_id, student_id),
  foreign key (assignment_id, exercise_id)
    references public.assignment_items (assignment_id, exercise_id) on delete cascade,
  check (status = 'rendu' or corrected_at is not null)
);

create index submissions_student_status_idx on public.submissions (student_id, status);
create index submissions_assignment_idx on public.submissions (assignment_id, exercise_id);
create index submissions_to_correct_idx on public.submissions (submitted_at) where status = 'rendu';
create index submissions_corrected_by_idx on public.submissions (corrected_by);
create index submissions_exercise_idx on public.submissions (exercise_id);

create trigger submissions_set_updated_at
  before update on public.submissions
  for each row execute function private.set_updated_at();

-- A student sends work; only the tutor — or the grading function below — decides a grade.
-- Without this, a student could write their own grade through the API, because RLS grants
-- rows, not columns.
create function private.guard_submission_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select auth.uid()) is null
     or coalesce(current_setting('equerre.grading', true), '') = 'on'
     or private.is_tutor() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.student_id is distinct from (select auth.uid())
       or new.status <> 'rendu'
       or new.grade is not null
       or new.feedback is not null
       or new.auto_graded
       or new.corrected_at is not null
       or new.corrected_by is not null then
      raise exception 'submission_not_writable' using errcode = '42501';
    end if;
    return new;
  end if;

  if old.status = 'corrige' then
    raise exception 'submission_already_corrected' using errcode = '42501';
  end if;
  if new.student_id is distinct from old.student_id
     or new.assignment_id is distinct from old.assignment_id
     or new.exercise_id is distinct from old.exercise_id
     or new.status is distinct from old.status
     or new.grade is distinct from old.grade
     or new.feedback is distinct from old.feedback
     or new.auto_graded is distinct from old.auto_graded
     or new.corrected_at is distinct from old.corrected_at
     or new.corrected_by is distinct from old.corrected_by then
    raise exception 'submission_not_writable' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger submissions_guard_write
  before insert or update on public.submissions
  for each row execute function private.guard_submission_write();

alter table public.submissions enable row level security;

create policy "submissions: select own or tutor"
  on public.submissions for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "submissions: insert own assigned work"
  on public.submissions for insert to authenticated
  with check (
    (select private.is_tutor())
    or (student_id = (select auth.uid()) and private.is_assigned_to_me(assignment_id))
  );

create policy "submissions: update own or tutor"
  on public.submissions for update to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()))
  with check (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "submissions: delete tutor"
  on public.submissions for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── corrections

create table public.submission_comments (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  -- Where the remark sits on the page: { "page": 0, "x": 0.42, "y": 0.13 } in 0–1 coordinates.
  anchor jsonb check (anchor is null or jsonb_typeof(anchor) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index submission_comments_submission_idx
  on public.submission_comments (submission_id, created_at);
create index submission_comments_author_idx on public.submission_comments (author_id);

create trigger submission_comments_set_updated_at
  before update on public.submission_comments
  for each row execute function private.set_updated_at();

alter table public.submission_comments enable row level security;

create policy "submission_comments: select own submission or tutor"
  on public.submission_comments for select to authenticated
  using (
    (select private.is_tutor())
    or exists (
      select 1
      from public.submissions s
      where s.id = submission_comments.submission_id
        and s.student_id = (select auth.uid())
    )
  );

create policy "submission_comments: insert tutor"
  on public.submission_comments for insert to authenticated
  with check ((select private.is_tutor()) and author_id = (select auth.uid()));

create policy "submission_comments: update tutor"
  on public.submission_comments for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "submission_comments: delete tutor"
  on public.submission_comments for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── revealing a solution

-- The brief lets a student give up and read the solution. That choice is recorded, because a
-- grade after a reveal doesn't mean the same thing.
create table public.exercise_reveals (
  assignment_id uuid not null,
  exercise_id uuid not null,
  student_id uuid not null references public.profiles (id) on delete cascade,
  revealed_at timestamptz not null default now(),
  primary key (assignment_id, exercise_id, student_id),
  foreign key (assignment_id, exercise_id)
    references public.assignment_items (assignment_id, exercise_id) on delete cascade
);

create index exercise_reveals_student_idx on public.exercise_reveals (student_id);

alter table public.exercise_reveals enable row level security;

create policy "exercise_reveals: select own or tutor"
  on public.exercise_reveals for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "exercise_reveals: insert own assigned work"
  on public.exercise_reveals for insert to authenticated
  with check (student_id = (select auth.uid()) and private.is_assigned_to_me(assignment_id));

-- No update or delete: a reveal is a fact, not a setting.

-- ─────────────────────────────────────────────────────────────── exercises for students

-- Phase 0 kept exercises tutor-only. A student may now read an exercise that is assigned to
-- them — never the whole bank. One policy per operation and per table, so Postgres doesn't
-- evaluate two permissive policies for the same read.
drop policy "exercises: select tutor" on public.exercises;

create policy "exercises: select assigned or tutor"
  on public.exercises for select to authenticated
  using (
    (select private.is_tutor())
    or exists (
      select 1
      from public.assignment_items ai
      where ai.exercise_id = exercises.id
        and private.is_assigned_to_me(ai.assignment_id)
    )
  );

-- The solution opens once the student has sent their own work, or has chosen to reveal it.
drop policy "exercise_solutions: select tutor" on public.exercise_solutions;

create policy "exercise_solutions: select after submitting, revealing, or tutor"
  on public.exercise_solutions for select to authenticated
  using (
    (select private.is_tutor())
    or exists (
      select 1
      from public.submissions s
      where s.exercise_id = exercise_solutions.exercise_id
        and s.student_id = (select auth.uid())
    )
    or exists (
      select 1
      from public.exercise_reveals r
      where r.exercise_id = exercise_solutions.exercise_id
        and r.student_id = (select auth.uid())
    )
  );

-- ─────────────────────────────────────────────────────────────── sending an answer

-- Numeric and MCQ answers grade themselves here, where the expected answer stays. The client
-- sends what the student typed; it never receives the solution to compare against.
create function public.submit_exercise_answer(
  p_assignment_id uuid,
  p_exercise_id uuid,
  p_answer jsonb default '{}'::jsonb,
  p_file_paths text[] default '{}'
)
returns public.submissions
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_student uuid := (select auth.uid());
  v_type public.answer_type;
  v_solution public.exercise_solutions;
  v_status public.submission_status := 'rendu';
  v_auto boolean := false;
  v_grade numeric(4, 2);
  v_given numeric;
  v_choices text[];
  v_expected text[];
  v_submission public.submissions;
begin
  if v_student is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if not private.is_assigned_to_me(p_assignment_id) then
    raise exception 'not_assigned' using errcode = '42501';
  end if;
  if not exists (
    select 1
    from public.assignment_items ai
    where ai.assignment_id = p_assignment_id
      and ai.exercise_id = p_exercise_id
  ) then
    raise exception 'unknown_exercise' using errcode = '42501';
  end if;

  select answer_type into v_type from public.exercises where id = p_exercise_id;
  select * into v_solution from public.exercise_solutions where exercise_id = p_exercise_id;

  if v_type = 'numeric' then
    begin
      v_given := (p_answer ->> 'value')::numeric;
    exception
      when others then
        raise exception 'answer_invalid' using errcode = 'P0001';
    end;
    if v_given is null then
      raise exception 'answer_required' using errcode = 'P0001';
    end if;
    v_auto := true;
    v_status := 'corrige';
    v_grade := case
      when v_solution.correct_numeric is not null
        and abs(v_given - v_solution.correct_numeric) <= coalesce(v_solution.tolerance, 0)
      then 20
      else 0
    end;
  elsif v_type = 'mcq' then
    select coalesce(array_agg(choice order by choice), '{}')
    into v_choices
    from jsonb_array_elements_text(coalesce(p_answer -> 'choiceIds', '[]'::jsonb)) as t (choice);

    if coalesce(array_length(v_choices, 1), 0) = 0 then
      raise exception 'answer_required' using errcode = 'P0001';
    end if;

    select coalesce(array_agg(choice order by choice), '{}')
    into v_expected
    from unnest(coalesce(v_solution.correct_choice_ids, '{}')) as u (choice);

    v_auto := true;
    v_status := 'corrige';
    v_grade := case when v_choices = v_expected then 20 else 0 end;
  else
    if coalesce(array_length(p_file_paths, 1), 0) = 0 then
      raise exception 'pages_required' using errcode = 'P0001';
    end if;
  end if;

  -- Lets the guard trigger accept the grade this function computed.
  perform set_config('equerre.grading', 'on', true);

  insert into public.submissions as s (
    assignment_id, exercise_id, student_id, status, answer, file_paths,
    auto_graded, grade, corrected_at
  )
  values (
    p_assignment_id, p_exercise_id, v_student, v_status, p_answer, p_file_paths,
    v_auto, v_grade, case when v_status = 'corrige' then now() end
  )
  on conflict (assignment_id, exercise_id, student_id) do update set
    status = excluded.status,
    answer = excluded.answer,
    file_paths = excluded.file_paths,
    auto_graded = excluded.auto_graded,
    grade = excluded.grade,
    corrected_at = excluded.corrected_at,
    submitted_at = now()
  where s.status = 'rendu'
  returning * into v_submission;

  perform set_config('equerre.grading', 'off', true);

  if v_submission.id is null then
    -- The conflicting row was already corrected, so it stays as the tutor left it.
    raise exception 'submission_already_corrected' using errcode = '42501';
  end if;

  return v_submission;
end;
$$;

revoke execute on function public.submit_exercise_answer(uuid, uuid, jsonb, text[]) from public;
grant execute on function public.submit_exercise_answer(uuid, uuid, jsonb, text[]) to authenticated;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
