-- Homework given as a PDF (DECISIONS.md, D-106).
--
-- The tutor publishes an exam or a series as a PDF with a due date; students hand in their copy
-- as photos or as a PDF. The PDF becomes a hidden exercise to hand in on paper: its own row in
-- `exercises`, with no chapter and the file's name in `subject_path`, the homework's only item.
-- Everything a copy goes through — handing in, the queue, the grade and remarks, the student's
-- and the parent's views, the notifications — then works as it does for a bank exercise.

-- ─────────────────────────────────────────────────────────────── the subject as an exercise

alter table public.exercises alter column chapter_id drop not null;
alter table public.exercises add column subject_path text;

alter table public.exercises
  add constraint exercises_subject_path_shape check (
    subject_path is null
    or subject_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf$'
  ),
  -- A bank exercise belongs to a chapter; only a subject may stand outside the programme.
  add constraint exercises_chapter_or_subject check (chapter_id is not null or subject_path is not null),
  -- A subject is answered on paper, never by a number or a choice.
  add constraint exercises_subject_is_upload check (subject_path is null or answer_type = 'upload');

-- One file, one homework: deleting the homework then deletes its subject whole.
create unique index exercises_subject_path_key on public.exercises (subject_path)
  where subject_path is not null;

-- ─────────────────────────────────────────────────────────────── where subjects are kept

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('assignment-subjects', 'assignment-subjects', false, 20971520, array['application/pdf'])
on conflict (id) do nothing;

/** A subject's file may be read by the students it is given to, as they read the homework. */
create or replace function private.can_read_subject(p_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.exercises e
    join public.assignment_items ai on ai.exercise_id = e.id
    where e.subject_path = p_name
      and private.is_assigned_to_me(ai.assignment_id)
  );
$$;

revoke all on function private.can_read_subject(text) from public;
grant execute on function private.can_read_subject(text) to anon, authenticated;

create policy "assignment subjects: only the tutor adds them"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'assignment-subjects'
    and (select private.is_tutor())
    and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf$'
  );

create policy "assignment subjects: only the tutor removes them"
  on storage.objects for delete to authenticated
  using (bucket_id = 'assignment-subjects' and (select private.is_tutor()));

create policy "assignment subjects: the tutor and their students read them"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'assignment-subjects'
    and ((select private.is_tutor()) or private.can_read_subject(name))
  );

-- ─────────────────────────────────────────────────────────────── a copy may be a PDF

update storage.buckets
set file_size_limit = 20971520,
    allowed_mime_types = array[
      'image/jpeg', 'image/webp', 'image/png', 'image/heic', 'image/heif', 'application/pdf'
    ]
where id = 'submissions';

create or replace function private.is_submission_page_name(p_name text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(webp|jpe?g|png|heic|heif|pdf)$';
$$;

-- ─────────────────────────────────────────────────────────────── giving one

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
  if exists (select 1 from public.exercises e where e.subject_path = p_subject_path) then
    raise exception 'subject_invalid' using errcode = 'P0001';
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

revoke all on function public.create_subject_assignment(text, timestamptz, text, text, uuid, uuid)
  from public, anon;
grant execute on function public.create_subject_assignment(text, timestamptz, text, text, uuid, uuid)
  to authenticated;

-- A homework renamed renames its subject: the queue and the correction show the exercise's title.
create or replace function private.sync_subject_title()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  update public.exercises e
  set title = new.title
  from public.assignment_items ai
  where ai.assignment_id = new.id
    and ai.exercise_id = e.id
    and e.subject_path is not null
    and e.title is distinct from new.title;
  return null;
end;
$$;

create trigger assignments_sync_subject_title
  after update of title on public.assignments
  for each row
  when (old.title is distinct from new.title)
  execute function private.sync_subject_title();

-- ─────────────────────────────────────────────────────────────── taking one back

create or replace function public.delete_assignment(p_id uuid)
returns void
language plpgsql
set search_path = ''
as $$
declare
  v_subjects uuid[];
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

  select coalesce(array_agg(e.id), '{}') into v_subjects
  from public.assignment_items ai
  join public.exercises e on e.id = ai.exercise_id
  where ai.assignment_id = p_id and e.subject_path is not null;

  delete from public.assignments where id = p_id;

  -- A subject belongs to its homework alone: it goes with it. Its file is removed by the caller.
  delete from public.exercises e
  where e.id = any (v_subjects)
    and not exists (select 1 from public.assignment_items ai where ai.exercise_id = e.id);
end;
$$;

-- ─────────────────────────────────────────────────────────────── no solution to open

-- A subject has no corrigé to reveal, and a reveal would forbid handing it in for good.
drop policy "exercise_reveals: insert own assigned work" on public.exercise_reveals;

create policy "exercise_reveals: insert own assigned work"
  on public.exercise_reveals for insert to authenticated
  with check (
    student_id = (select auth.uid())
    and (select private.my_student_status()) = 'actif'
    and private.is_assigned_to_me(assignment_id)
    and not exists (
      select 1 from public.exercises e
      where e.id = exercise_id and e.subject_path is not null
    )
  );
