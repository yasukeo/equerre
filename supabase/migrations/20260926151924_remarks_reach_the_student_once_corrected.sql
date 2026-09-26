-- A student reads the tutor's remarks on her copy once it is corrected (DECISIONS.md, D-047).
--
-- The tutor annotates a copy remark by remark, each saved as she writes it, then gives the
-- grade and marks the copy corrected. Until then the remarks are a correction in progress:
-- the first policy showed them to the student as soon as they were written, half-finished
-- and without the grade they lead to.

drop policy "submission_comments: select own submission or tutor" on public.submission_comments;

create policy "submission_comments: select tutor, or own once corrected"
  on public.submission_comments for select to authenticated
  using (
    (select private.is_tutor())
    or exists (
      select 1
      from public.submissions s
      where s.id = submission_comments.submission_id
        and s.student_id = (select auth.uid())
        and s.status = 'corrige'
    )
  );
