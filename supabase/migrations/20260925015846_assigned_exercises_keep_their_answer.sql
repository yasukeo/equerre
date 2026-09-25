-- An exercise given as homework stays answerable (DECISIONS.md, D-045). create_assignment
-- checked readiness once, when the homework was made: the tutor could then clear an assigned
-- exercise's expected answer, or turn an assigned upload exercise into a question with no key,
-- and every student's hand-in failed with exercise_not_ready. save_exercise now refuses that
-- (exercise_assigned_needs_answer), and create_assignment locks the exercises before checking
-- them, so a save racing the homework is either waited for or refused. Both functions are the
-- live definitions with one statement added.
--
-- The homework list also counted hand-ins by reading every submission row, which PostgREST caps
-- at max_rows: a view counts them per homework instead, under the caller's own policies.

CREATE OR REPLACE FUNCTION public.save_exercise(p_id uuid, p_chapter_id uuid, p_title text, p_statement jsonb, p_difficulty smallint, p_tags text[], p_answer_type public.answer_type, p_choices jsonb, p_choice_mode public.choice_mode, p_solution jsonb, p_correct_numeric text, p_tolerance text, p_tolerance_kind public.tolerance_kind, p_correct_choice_ids text[])
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_current public.answer_type;
  v_numeric numeric;
  v_tolerance numeric;
  v_choice_ids text[];
  v_correct text[];
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;

  select answer_type into v_current
  from public.exercises
  where id = p_id
  for update;
  if not found then
    raise exception 'exercise_not_found' using errcode = 'P0002';
  end if;

  if v_current is distinct from p_answer_type and (
    exists (select 1 from public.submissions s where s.exercise_id = p_id)
    or exists (select 1 from public.exercise_reveals r where r.exercise_id = p_id)
  ) then
    raise exception 'answer_type_locked' using errcode = 'P0001';
  end if;

  if p_answer_type = 'numeric' then
    begin
      v_numeric := nullif(btrim(coalesce(p_correct_numeric, '')), '')::numeric;
      v_tolerance := nullif(btrim(coalesce(p_tolerance, '')), '')::numeric;
    exception
      when others then
        raise exception 'number_invalid' using errcode = 'P0001';
    end;
    if v_tolerance < 0 then
      raise exception 'number_invalid' using errcode = 'P0001';
    end if;
  end if;

  if p_answer_type = 'mcq' then
    if p_choices is null or jsonb_typeof(p_choices) <> 'array' or p_choice_mode is null then
      raise exception 'choices_invalid' using errcode = 'P0001';
    end if;
    select coalesce(array_agg(c ->> 'id'), '{}') into v_choice_ids
    from jsonb_array_elements(p_choices) as t (c);
    select coalesce(array_agg(distinct x), '{}') into v_correct
    from unnest(coalesce(p_correct_choice_ids, '{}')) as u (x);
    if not v_correct <@ v_choice_ids
       or (p_choice_mode = 'unique' and cardinality(v_correct) > 1) then
      raise exception 'choices_invalid' using errcode = 'P0001';
    end if;
  end if;

  -- An exercise given as homework keeps an expected answer: without one, submit_exercise_answer
  -- refuses every student's work on it (exercise_not_ready). This runs after the FOR UPDATE
  -- above, so it sees an assignment that create_assignment committed while this call waited.
  if exists (select 1 from public.assignment_items ai where ai.exercise_id = p_id)
     and ((p_answer_type = 'numeric' and v_numeric is null)
          or (p_answer_type = 'mcq' and coalesce(cardinality(v_correct), 0) = 0)) then
    raise exception 'exercise_assigned_needs_answer' using errcode = 'P0001';
  end if;

  update public.exercises
  set chapter_id = p_chapter_id,
      title = p_title,
      statement = p_statement,
      difficulty = p_difficulty,
      tags = coalesce(p_tags, '{}'),
      answer_type = p_answer_type,
      choices = case when p_answer_type = 'mcq' then p_choices end,
      choice_mode = case when p_answer_type = 'mcq' then p_choice_mode end
  where id = p_id;

  insert into public.exercise_solutions (
    exercise_id, solution, correct_numeric, tolerance, tolerance_kind, correct_choice_ids
  )
  values (
    p_id,
    p_solution,
    v_numeric,
    v_tolerance,
    coalesce(p_tolerance_kind, 'absolue'),
    case when p_answer_type = 'mcq' then nullif(v_correct, '{}') end
  )
  on conflict (exercise_id) do update set
    solution = excluded.solution,
    correct_numeric = excluded.correct_numeric,
    tolerance = excluded.tolerance,
    tolerance_kind = excluded.tolerance_kind,
    correct_choice_ids = excluded.correct_choice_ids;
end;
$function$;

CREATE OR REPLACE FUNCTION public.create_assignment(p_title text, p_due_at timestamp with time zone, p_exercise_ids uuid[], p_instructions text DEFAULT NULL::text, p_student_id uuid DEFAULT NULL::uuid, p_group_id uuid DEFAULT NULL::uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_id uuid;
  v_count integer := coalesce(cardinality(p_exercise_ids), 0);
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

  if p_due_at is null or p_due_at <= now() then
    raise exception 'due_in_past' using errcode = 'P0001';
  end if;

  if v_count < 1 or v_count > 30
     or v_count <> (select count(distinct x) from unnest(p_exercise_ids) as u (x)) then
    raise exception 'exercises_invalid' using errcode = 'P0001';
  end if;
  -- Locked before they are checked, in a statement of their own: a save_exercise under way
  -- (FOR UPDATE) is waited for, and the check below then reads what it committed. A lock taken
  -- in the check itself would refresh only the exercise row, not its answer key.
  perform 1 from public.exercises where id = any (p_exercise_ids) order by id for key share;

  if exists (
    select 1
    from unnest(p_exercise_ids) as u (exercise_id)
    left join public.exercises e on e.id = u.exercise_id
    left join public.exercise_solutions s on s.exercise_id = e.id
    where e.id is null
       or (e.answer_type = 'numeric' and s.correct_numeric is null)
       or (e.answer_type = 'mcq' and coalesce(cardinality(s.correct_choice_ids), 0) = 0)
  ) then
    raise exception 'exercise_not_ready' using errcode = 'P0001';
  end if;

  insert into public.assignments (title, instructions, due_at, student_id, group_id, created_by)
  values (
    btrim(p_title),
    nullif(btrim(coalesce(p_instructions, '')), ''),
    p_due_at,
    p_student_id,
    p_group_id,
    (select auth.uid())
  )
  returning id into v_id;

  insert into public.assignment_items (assignment_id, exercise_id, position)
  select v_id, u.exercise_id, (u.ordinality - 1)::integer
  from unnest(p_exercise_ids) with ordinality as u (exercise_id, ordinality);

  return v_id;
end;
$function$;

create view public.assignment_hand_in_counts
  with (security_invoker = true) as
select s.assignment_id, count(distinct s.student_id)::integer as students
from public.submissions s
group by s.assignment_id;

revoke all on public.assignment_hand_in_counts from public, anon;
grant select on public.assignment_hand_in_counts to authenticated;
