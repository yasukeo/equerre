-- The tutor gives homework: a title, a due date, one student or one group, and exercises from
-- the bank, in order. An assignment and its items are two tables, so they are written by one
-- call, in one transaction (DECISIONS.md, D-045).
--
-- Both functions are `security invoker`: they run under the tutor's own policies and add only
-- atomicity and the rules below.
--   * The recipient is a student whose account is active, or an existing group. A paused or
--     stopped student can hand nothing in (D-060).
--   * Every exercise exists, appears once, and has its expected answer: submit_exercise_answer
--     would refuse the student's work otherwise (`exercise_not_ready`).
--   * The due date is still to come.
--   * Deleting an assignment cascades to its items, submissions and reveals, so an assignment
--     a student has answered, or opened a solution in, is never deleted. The rows are locked
--     first: an answer being handed in at that moment holds a lock on them through its foreign
--     keys, so the check waits for it rather than deleting it a moment later.

create function public.create_assignment(
  p_title text,
  p_due_at timestamptz,
  p_exercise_ids uuid[],
  p_instructions text default null,
  p_student_id uuid default null,
  p_group_id uuid default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
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

create function public.delete_assignment(p_id uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $function$
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;

  -- An answer or a reveal being written now holds KEY SHARE on these rows through its foreign
  -- keys; FOR UPDATE waits for it to commit, and the checks below then see it.
  perform 1 from public.assignments where id = p_id for update;
  if not found then
    raise exception 'assignment_not_found' using errcode = 'P0002';
  end if;
  perform 1 from public.assignment_items where assignment_id = p_id for update;

  if exists (select 1 from public.submissions s where s.assignment_id = p_id)
     or exists (select 1 from public.exercise_reveals r where r.assignment_id = p_id) then
    raise exception 'assignment_has_work' using errcode = 'P0001';
  end if;

  delete from public.assignments where id = p_id;
end;
$function$;

revoke execute on function public.create_assignment(text, timestamptz, uuid[], text, uuid, uuid)
  from public, anon;
grant execute on function public.create_assignment(text, timestamptz, uuid[], text, uuid, uuid)
  to authenticated;
revoke execute on function public.delete_assignment(uuid) from public, anon;
grant execute on function public.delete_assignment(uuid) to authenticated;
