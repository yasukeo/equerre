-- What a student keeps when the tutor pauses or stops her (DECISIONS.md, D-060).
--
--                         actif   en_pause                 arrete
--   public lessons        yes     yes                      yes
--   her level's lessons   yes     yes                      no
--   lessons shared to her yes     yes                      no
--   sessions, attendance  all     those already started    none
--   groups                yes     yes                      no
--   assignments, items,   all     all, read only           only those she handed work in for
--     exercises
--   her submissions,      yes     yes                      yes
--     grades, corrigés
--   hand in, reveal,      yes     no                       no
--     upload pages
--
-- Until now only private.my_level() looked at the status, so a stopped student kept her
-- group's meeting links, her shared lessons and her assignments, and could still hand in.

create function private.my_student_status()
returns public.student_status
language sql
stable
security definer
set search_path = ''
as $$
  select status
  from public.profiles
  where id = (select auth.uid())
    and role = 'student';
$$;

-- The level whose lessons a student may still read: active or paused.
create or replace function private.my_level()
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
    and status in ('actif', 'en_pause');
$$;

-- Group membership only opens anything while she is active or paused.
create or replace function private.is_group_member(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.my_student_status() in ('actif', 'en_pause')
    and exists (
      select 1
      from public.group_members
      where group_id = p_group_id
        and student_id = (select auth.uid())
    );
$$;

-- Whether an assignment is addressed to her, directly or through a group she belongs to.
create function private.assignment_reaches_me(p_assignment_id uuid)
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

-- Assigned work: all of it while active or paused; once stopped, only the assignments she
-- handed something in for, so her grades keep their context and nothing else stays open.
create or replace function private.is_assigned_to_me(p_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select case private.my_student_status()
    when 'arrete' then exists (
      select 1
      from public.submissions s
      where s.assignment_id = p_assignment_id
        and s.student_id = (select auth.uid())
    )
    when 'actif' then private.assignment_reaches_me(p_assignment_id)
    when 'en_pause' then private.assignment_reaches_me(p_assignment_id)
    else false
  end;
$$;

-- Lessons shared by name follow the same rule as her level's lessons.
create or replace function private.can_read_lesson(p_lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.lessons l
    where l.id = p_lesson_id
      and (
        (l.status = 'published' and l.visibility = 'public')
        or (select private.is_tutor())
        or (
          l.status = 'published'
          and l.visibility = 'enrolled'
          and exists (
            select 1
            from public.chapters c
            where c.id = l.chapter_id
              and c.level_code = (select private.my_level())
          )
        )
        or (
          l.status = 'published'
          and l.visibility = 'specific'
          and (select private.my_student_status()) in ('actif', 'en_pause')
          and exists (
            select 1
            from public.lesson_access la
            where la.lesson_id = l.id
              and la.student_id = (select auth.uid())
          )
        )
      )
  );
$$;

drop policy "sessions: select own, own group, or tutor" on public.sessions;

create policy "sessions: select own, own group, or tutor"
  on public.sessions for select to authenticated
  using (
    (select private.is_tutor())
    or (
      (
        student_id = (select auth.uid())
        or (group_id is not null and private.is_group_member(group_id))
      )
      and case (select private.my_student_status())
        when 'actif' then true
        -- Paused: what already happened stays, what is coming — and its link — does not.
        when 'en_pause' then starts_at <= now()
        else false
      end
    )
  );

drop policy "session_attendance: select own or tutor" on public.session_attendance;

create policy "session_attendance: select own or tutor"
  on public.session_attendance for select to authenticated
  using (
    (select private.is_tutor())
    or (
      student_id = (select auth.uid())
      and (select private.my_student_status()) in ('actif', 'en_pause')
    )
  );

drop policy "group_members: select own or tutor" on public.group_members;

create policy "group_members: select own or tutor"
  on public.group_members for select to authenticated
  using (
    (select private.is_tutor())
    or (
      student_id = (select auth.uid())
      and (select private.my_student_status()) in ('actif', 'en_pause')
    )
  );

drop policy "exercise_reveals: insert own assigned work" on public.exercise_reveals;

create policy "exercise_reveals: insert own assigned work"
  on public.exercise_reveals for insert to authenticated
  with check (
    student_id = (select auth.uid())
    and (select private.my_student_status()) = 'actif'
    and private.is_assigned_to_me(assignment_id)
  );

drop policy "submissions: a student writes inside her own folder" on storage.objects;

create policy "submissions: a student writes inside her own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select private.my_student_status()) = 'actif'
    and private.is_submission_page_name(name)
    -- A handed-in path is never written again, even when its object is gone.
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and objects.name = any (s.file_paths)
    )
    -- Pages waiting to be handed in are bounded; handed-in ones are bounded by the work.
    and (select private.my_pending_page_count()) < 40
  );

create or replace function public.submit_exercise_answer(
  p_assignment_id uuid,
  p_exercise_id uuid,
  p_answer jsonb default '{}'::jsonb,
  p_file_paths text[] default '{}'
)
returns public.submissions
language plpgsql
security definer
set search_path = ''
as $function$
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
  -- A missing page list reached the INSERT as NULL and failed its NOT NULL constraint
  -- there — after the grade was computed. Postgres's error detail prints the failing
  -- row, grade included, and then everything rolls back: an unlimited, invisible
  -- oracle. Nothing may fail after grading, so the inputs are made whole up front.
  p_file_paths := coalesce(p_file_paths, '{}');
  p_answer := coalesce(p_answer, '{}'::jsonb);
  if jsonb_typeof(p_answer) is distinct from 'object' then
    raise exception 'answer_invalid' using errcode = 'P0001';
  end if;

  if v_student is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  -- Only a student whose account is active hands work in. A paused one keeps reading
  -- what she had; a stopped one keeps only her past work (DECISIONS.md, D-060).
  if private.my_student_status() is distinct from 'actif' then
    raise exception 'account_not_active' using errcode = '42501';
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

  -- Object names are `<student_id>/<submission_ref>/<page_id>.webp`.
  if exists (
    select 1
    from unnest(p_file_paths) as f (path)
    where split_part(f.path, '/', 1) is distinct from v_student::text
  ) then
    raise exception 'file_path_not_yours' using errcode = '42501';
  end if;

  -- Every page is named `<student_id>/<submission_ref>/<page_id>.<ext>`, all ids. The
  -- correction view signs these names with the tutor's token, and a name carrying `..`
  -- or `?` would take that request somewhere else entirely (D-052).
  if exists (
    select 1
    from unnest(p_file_paths) as f (path)
    where not private.is_submission_page_name(f.path)
  ) then
    raise exception 'file_path_invalid' using errcode = 'P0001';
  end if;

  if coalesce(array_length(p_file_paths, 1), 0) > 20 then
    raise exception 'too_many_pages' using errcode = 'P0001';
  end if;

  -- Asking to see the corrigé is a forfeit: once the answer has been shown, a
  -- submission could only copy it. Keyed by exercise, like the solution policy.
  if exists (
    select 1
    from public.exercise_reveals r
    where r.exercise_id = p_exercise_id
      and r.student_id = v_student
  ) then
    raise exception 'solution_already_revealed' using errcode = '42501';
  end if;

  -- A correction elsewhere opens the same solution: the policy is keyed by exercise.
  -- Without this, failing one assignment on purpose would hand over the answer for
  -- another that contains the same exercise.
  if exists (
    select 1
    from public.submissions s
    where s.exercise_id = p_exercise_id
      and s.student_id = v_student
      and s.status = 'corrige'
      and s.assignment_id <> p_assignment_id
  ) then
    raise exception 'exercise_done_elsewhere' using errcode = '42501';
  end if;

  -- Every page has to be in Storage already. A path recorded before its bytes exist
  -- could be filled in later — after a reveal, or after the tutor has graded it.
  if exists (
    select 1
    from unnest(p_file_paths) as f (path)
    where not exists (
      select 1
      from storage.objects o
      where o.bucket_id = 'submissions'
        and o.name = f.path
    )
  ) then
    raise exception 'page_not_uploaded' using errcode = 'P0001';
  end if;

  select answer_type into v_type from public.exercises where id = p_exercise_id;
  select * into v_solution from public.exercise_solutions where exercise_id = p_exercise_id;

  -- An exercise whose expected answer was never written must refuse the submission.
  -- Grading it would stamp a permanent, machine-made 0/20 that the student could
  -- never replace and that the tutor's queue would treat as already handled.
  if (v_type = 'numeric' and v_solution.correct_numeric is null)
     or (v_type = 'mcq' and coalesce(array_length(v_solution.correct_choice_ids, 1), 0) = 0) then
    raise exception 'exercise_not_ready' using errcode = 'P0001';
  end if;

  if v_type = 'numeric' then
    -- PostgREST reads a JSON number as a double, so the exact decimal the student
    -- typed only survives the journey if it crosses the wire as a string. The
    -- browser sends the normalised form here and keeps the raw input in `raw`.
    if jsonb_typeof(p_answer -> 'value') is distinct from 'string' then
      raise exception 'answer_must_be_text' using errcode = 'P0001';
    end if;

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
        and abs(v_given - v_solution.correct_numeric) <= case
              when v_solution.tolerance_kind = 'relative'
                then abs(v_solution.correct_numeric) * coalesce(v_solution.tolerance, 0)
              else coalesce(v_solution.tolerance, 0)
            end
      then 20
      else 0
    end;
  elsif v_type = 'mcq' then
    -- Order-insensitive and de-duplicated on both sides, so ticking the same box
    -- twice cannot turn a right answer into a wrong one.
    select coalesce(array_agg(distinct choice order by choice), '{}')
    into v_choices
    from jsonb_array_elements_text(coalesce(p_answer -> 'choiceIds', '[]'::jsonb)) as t (choice);

    if coalesce(array_length(v_choices, 1), 0) = 0 then
      raise exception 'answer_required' using errcode = 'P0001';
    end if;

    select coalesce(array_agg(distinct choice order by choice), '{}')
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

  begin
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
  exception
    when others then
      -- Defence in depth: an error detail would carry the row about to be written,
      -- grade included. The inputs are already whole, so this should never run.
      raise exception 'submission_failed' using errcode = 'P0001';
  end;

  if v_submission.id is null then
    raise exception 'submission_already_corrected' using errcode = '42501';
  end if;

  return v_submission;
end;
$function$;

revoke execute on function public.submit_exercise_answer(uuid, uuid, jsonb, text[]) from anon;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
