-- A subject's file is never removed while a homework holds it (DECISIONS.md, D-106, after
-- review). The new-homework form kept a file it had given, and « Changer de fichier » then
-- deleted it: the storage policy let the tutor remove any subject. Now only a file no exercise
-- names goes; delete_assignment drops the exercise first, so a homework taken back still takes
-- its file with it.

drop policy "assignment subjects: only the tutor removes them" on storage.objects;

create policy "assignment subjects: only the tutor removes them, once unused"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'assignment-subjects'
    and (select private.is_tutor())
    and not exists (select 1 from public.exercises e where e.subject_path = objects.name)
  );

-- A file already given says so with its own code.
create or replace function public.create_subject_assignment(
  p_title text,
  p_due_at timestamptz,
  p_subject_path text,
  p_instructions text default null,
  p_student_id uuid default null,
  p_group_id uuid default null
)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_exercise uuid;
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;

  if p_subject_path is null
     or p_subject_path !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf$' then
    raise exception 'subject_invalid' using errcode = 'P0001';
  end if;
  -- The file first: a homework must never point at a subject its students cannot open.
  if not exists (
    select 1 from storage.objects o
    where o.bucket_id = 'assignment-subjects' and o.name = p_subject_path
  ) then
    raise exception 'subject_not_uploaded' using errcode = 'P0001';
  end if;
  -- Already the subject of a homework: said as such, so the form can ask for the file again
  -- rather than offer to delete one a homework holds.
  if exists (select 1 from public.exercises e where e.subject_path = p_subject_path) then
    raise exception 'subject_used' using errcode = 'P0001';
  end if;
  if p_title is null or char_length(btrim(p_title)) not between 1 and 160 then
    raise exception 'title_invalid' using errcode = 'P0001';
  end if;

  insert into public.exercises (chapter_id, title, statement, difficulty, answer_type, subject_path)
  values (null, btrim(p_title), '{"type": "doc", "content": []}'::jsonb, 3, 'upload', p_subject_path)
  returning id into v_exercise;

  -- Recipient, due date and the rest are checked as for any homework; a refusal there takes
  -- the exercise just written back with it.
  return public.create_assignment(
    p_title, p_due_at, array[v_exercise], p_instructions, p_student_id, p_group_id
  );
end;
$$;
