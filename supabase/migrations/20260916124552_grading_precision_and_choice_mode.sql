-- ── How many answers are correct is itself a secret ─────────────────────────
-- Radio buttons for one correct choice and checkboxes for several would tell the
-- student how many to pick before she has read the question. The shape of the
-- control has to come from a column that is safe to show her, never from
-- `correct_choice_ids`, which lives in the tutor-only solutions table.
create type public.choice_mode as enum ('unique', 'multiple');

alter table public.exercises add column choice_mode public.choice_mode;

-- Existing questions are backfilled from the answer, which is the truth for them.
-- From here on the tutor chooses, so a question may offer several boxes and still
-- have a single right answer.
update public.exercises e
set choice_mode = (case
      when coalesce(array_length(s.correct_choice_ids, 1), 0) > 1 then 'multiple'
      else 'unique'
    end)::public.choice_mode
from public.exercise_solutions s
where s.exercise_id = e.id
  and e.answer_type = 'mcq';

update public.exercises
set choice_mode = 'unique'
where answer_type = 'mcq'
  and choice_mode is null;

alter table public.exercises
  add constraint exercises_choice_mode_matches_answer_type
  check ((answer_type = 'mcq') = (choice_mode is not null));

-- ── A tolerance needs a kind ────────────────────────────────────────────────
-- `3×10⁸ ± 1 %` means something; `3×10⁸ ± 0,1` does not. One absolute tolerance
-- cannot serve both an answer of 4,8 and an answer of 300000000.
create type public.tolerance_kind as enum ('absolue', 'relative');

alter table public.exercise_solutions
  add column tolerance_kind public.tolerance_kind not null default 'absolue';

-- ── Grading ─────────────────────────────────────────────────────────────────
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

  select answer_type into v_type from public.exercises where id = p_exercise_id;
  select * into v_solution from public.exercise_solutions where exercise_id = p_exercise_id;

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
