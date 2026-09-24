-- The exercise editor saves an exercise and its expected answer together. They live in two
-- tables (students may read the first, never the second), and two separate writes could
-- leave a question whose statement says one thing and whose answer key another. One call,
-- one transaction.
--
-- `security invoker`: it runs as the tutor, under her own policies, so it grants nothing a
-- direct write would not. What it adds is atomicity and three rules the tables cannot
-- state across each other:
--   * once a student has answered, or asked for the solution, the kind of answer is fixed:
--     a numeric answer stored against a multiple-choice question would be unreadable, and
--     the correction view would have nothing to show;
--   * the right choices are choices of the question;
--   * a question showing radio buttons has at most one right choice.
-- Numbers arrive as text and are cast here, so « 0,1 » is exactly 0.1 (DECISIONS.md, D-044).

create function public.save_exercise(
  p_id uuid,
  p_chapter_id uuid,
  p_title text,
  p_statement jsonb,
  p_difficulty smallint,
  p_tags text[],
  p_answer_type public.answer_type,
  p_choices jsonb,
  p_choice_mode public.choice_mode,
  p_solution jsonb,
  p_correct_numeric text,
  p_tolerance text,
  p_tolerance_kind public.tolerance_kind,
  p_correct_choice_ids text[]
)
returns void
language plpgsql
security invoker
set search_path = ''
as $function$
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

-- Only the tutor has a use for it; a student calling it would be refused inside anyway.
revoke execute on function public.save_exercise(
  uuid, uuid, text, jsonb, smallint, text[], public.answer_type, jsonb, public.choice_mode,
  jsonb, text, text, public.tolerance_kind, text[]
) from public, anon;
grant execute on function public.save_exercise(
  uuid, uuid, text, jsonb, smallint, text[], public.answer_type, jsonb, public.choice_mode,
  jsonb, text, text, public.tolerance_kind, text[]
) to authenticated;
