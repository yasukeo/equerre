-- PDFs in exercises (DECISIONS.md, D-107).
--
-- A lesson's PDFs live in `lesson-files`, under the lesson's id, and follow the lesson: whoever
-- may read the lesson may open them. An exercise's editor could not attach any, because nothing
-- said who may open a file kept under an exercise's id. Now a file under an exercise's folder
-- opens for:
--   - the tutor, always (she may open what she just attached, before saving);
--   - a student, when the file is in the statement of an exercise given to her, as the
--     exercises policy lets her read the statement;
--   - a student, when the file is in the exercise's solution and the solution is hers to read:
--     her copy was corrected, or she opened the solution — as the exercise_solutions policy.
-- The file is matched by its name inside the document, so a PDF of the corrigé never opens
-- through the statement's rule.

create or replace function private.can_read_exercise_file(p_exercise_id uuid, p_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select private.is_tutor())
    or exists (
      select 1
      from public.exercises e
      where e.id = p_exercise_id
        and position(p_name in e.statement::text) > 0
        and exists (
          select 1
          from public.assignment_items ai
          where ai.exercise_id = e.id
            and private.is_assigned_to_me(ai.assignment_id)
        )
    )
    or exists (
      select 1
      from public.exercise_solutions s
      where s.exercise_id = p_exercise_id
        and position(p_name in s.solution::text) > 0
        and (
          exists (
            select 1
            from public.submissions sub
            where sub.exercise_id = s.exercise_id
              and sub.student_id = (select auth.uid())
              and sub.status = 'corrige'
          )
          or exists (
            select 1
            from public.exercise_reveals r
            where r.exercise_id = s.exercise_id
              and r.student_id = (select auth.uid())
          )
        )
    );
$$;

revoke all on function private.can_read_exercise_file(uuid, text) from public;
grant execute on function private.can_read_exercise_file(uuid, text) to anon, authenticated;

-- The lesson's rule, and the exercise's beside it: a folder is one or the other.
create or replace function private.can_read_lesson_file(p_object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when (storage.foldername(p_object_name))[1]
      ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      then private.can_read_lesson(((storage.foldername(p_object_name))[1])::uuid)
        or private.can_read_exercise_file(
          ((storage.foldername(p_object_name))[1])::uuid,
          p_object_name
        )
    else false
  end;
$$;
