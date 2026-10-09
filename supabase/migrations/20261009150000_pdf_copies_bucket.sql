-- PDF copies in a bucket of their own (DECISIONS.md, D-106, after review).
--
-- 20261009120000 let the submissions bucket take PDFs, which meant raising its limit from 8 to
-- 20 MB for every file, photos included, while the only caps were counts of files: one student
-- calling Storage directly could store about 2.5 times more than before. Photographed pages go
-- back to their 8 MB bucket; a copy written as a PDF goes to `submission-pdfs` (20 MB, PDF
-- only), with at most three waiting to be handed in and three in one copy.

-- ─────────────────────────────────────────────────────────────── pages: images, 8 MB

update storage.buckets
set file_size_limit = 8388608,
    allowed_mime_types = array['image/jpeg', 'image/webp', 'image/png', 'image/heic', 'image/heif']
where id = 'submissions';

-- ─────────────────────────────────────────────────────────────── PDF copies: 20 MB

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('submission-pdfs', 'submission-pdfs', false, 20971520, array['application/pdf'])
on conflict (id) do update
  set public = false, file_size_limit = 20971520, allowed_mime_types = array['application/pdf'];

-- What waits to be handed in counts across both buckets: 40 files at most, as before.
create or replace function private.my_pending_page_count()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)
  from storage.objects o
  where o.bucket_id in ('submissions', 'submission-pdfs')
    and (storage.foldername(o.name))[1] = (select auth.uid())::text
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and o.name = any (s.file_paths)
    );
$$;

/** PDF copies waiting to be handed in: three at most, each up to 20 MB. */
create or replace function private.my_pending_pdf_count()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)
  from storage.objects o
  where o.bucket_id = 'submission-pdfs'
    and (storage.foldername(o.name))[1] = (select auth.uid())::text
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and o.name = any (s.file_paths)
    );
$$;

revoke all on function private.my_pending_pdf_count() from public;
grant execute on function private.my_pending_pdf_count() to authenticated;

-- A page is an image in the pages' bucket; a name ending in .pdf belongs to the other.
drop policy "submissions: a student writes inside her own folder" on storage.objects;

create policy "submissions: a student writes inside her own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select private.my_student_status()) = 'actif'
    and private.is_submission_page_name(name)
    and name !~ '\.pdf$'
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and objects.name = any (s.file_paths)
    )
    and (select private.my_pending_page_count()) < 40
  );

create policy "submission pdfs: a student writes inside her own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submission-pdfs'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select private.my_student_status()) = 'actif'
    and private.is_submission_page_name(name)
    and name ~ '\.pdf$'
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and objects.name = any (s.file_paths)
    )
    and (select private.my_pending_page_count()) < 40
    and (select private.my_pending_pdf_count()) < 3
  );

create policy "submission pdfs: a student reads her own, the tutor reads all"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'submission-pdfs'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or (select private.is_tutor())
    )
  );

create policy "submission pdfs: a student removes those she has not handed in"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'submission-pdfs'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and objects.name = any (s.file_paths)
    )
  );

-- ─────────────────────────────────────────────────────────────── handing in

create or replace function public.submit_exercise_answer(p_assignment_id uuid, p_exercise_id uuid, p_answer jsonb DEFAULT '{}'::jsonb, p_file_paths text[] DEFAULT '{}'::text[])
 RETURNS submissions
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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

  -- A copy written as a PDF is one document, not a page each: a few at most (D-106).
  if (select count(*) from unnest(p_file_paths) as f (path) where f.path ~ '\.pdf$') > 3 then
    raise exception 'too_many_pdfs' using errcode = 'P0001';
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
      -- A PDF copy lives in its own bucket, a photographed page in the pages' (D-106).
      where o.bucket_id = case when f.path ~ '\.pdf$' then 'submission-pdfs' else 'submissions' end
        and o.name = f.path
    )
  ) then
    raise exception 'page_not_uploaded' using errcode = 'P0001';
  end if;

  -- Read under a lock that the tutor's save_exercise (FOR UPDATE) waits for, and that waits
  -- for it: the kind of answer and its key cannot change between this read and the grade.
  -- A plain read did not block, so a save racing this submission could turn the exercise
  -- numeric while an MCQ answer was being graded against the old key (D-044).
  select answer_type into v_type
  from public.exercises
  where id = p_exercise_id
  for key share;
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
