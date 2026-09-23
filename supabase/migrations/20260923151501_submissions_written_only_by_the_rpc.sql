-- A student writes a submission through submit_exercise_answer, and nowhere else.
--
-- The phase 1 policies let her INSERT and UPDATE her own rows directly over the REST
-- API, which undid three promises at once. A plain INSERT of a 'rendu' row counted, for
-- the solutions policy, as having answered: the expected answer became readable, and the
-- RPC then replaced the still-'rendu' row with it — 20/20, auto_graded, and no reveal on
-- record (D-037, D-038). A plain UPDATE could set file_paths to another student's objects,
-- which the correction view would sign and show as hers (D-052). The RPC is security
-- definer, so removing the student branches of both policies leaves it the only door.

drop policy "submissions: insert own assigned work" on public.submissions;
drop policy "submissions: update own or tutor" on public.submissions;

create policy "submissions: insert tutor"
  on public.submissions for insert to authenticated
  with check ((select private.is_tutor()));

create policy "submissions: update tutor"
  on public.submissions for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

-- The guard keeps holding if a policy is ever loosened again: apart from the grading
-- function and the tutor, nobody writes a submission row at all.
create or replace function private.guard_submission_write()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  if (select auth.uid()) is null
     or coalesce(current_setting('equerre.grading', true), '') = 'on'
     or private.is_tutor() then
    return new;
  end if;

  raise exception 'submission_not_writable' using errcode = '42501';
end;
$function$;

-- Having a row is not the same as having answered. The solution opens once the work is
-- corrected, or once the student asked for it — which leaves a row in exercise_reveals
-- and, from then on, forfeits the exercise.
drop policy "exercise_solutions: select after submitting, revealing, or tuto"
  on public.exercise_solutions;

create policy "exercise_solutions: select once corrected or revealed"
  on public.exercise_solutions for select to authenticated
  using (
    (select private.is_tutor())
    or exists (
      select 1
      from public.submissions s
      where s.exercise_id = exercise_solutions.exercise_id
        and s.student_id = (select auth.uid())
        and s.status = 'corrige'
    )
    or exists (
      select 1
      from public.exercise_reveals r
      where r.exercise_id = exercise_solutions.exercise_id
        and r.student_id = (select auth.uid())
    )
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

  -- Object names are `<student_id>/<submission_ref>/<page_id>.webp`.
  if exists (
    select 1
    from unnest(p_file_paths) as f (path)
    where split_part(f.path, '/', 1) is distinct from v_student::text
  ) then
    raise exception 'file_path_not_yours' using errcode = '42501';
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
    raise exception 'submission_already_corrected' using errcode = '42501';
  end if;

  return v_submission;
end;
$function$;

revoke execute on function public.submit_exercise_answer(uuid, uuid, jsonb, text[]) from anon;
