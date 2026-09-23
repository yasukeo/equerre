-- A handed-in path is never written again, even if its object is gone.
--
-- submit_exercise_answer checks that each page exists with a plain read, and the delete
-- policy lets a student remove a page no submission holds yet. The two do not lock each
-- other, so a delete racing the submission can leave a handed-in path with no object —
-- which the insert policy then let her fill, after a reveal or a grade. With this, the
-- race can at worst lose a page of her own; it can no longer put new bytes behind one.
drop policy "submissions: a student writes inside her own folder" on storage.objects;

create policy "submissions: a student writes inside her own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and objects.name = any (s.file_paths)
    )
  );
