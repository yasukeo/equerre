-- A corrected submission carries a grade (DECISIONS.md, D-046).
--
-- submit_exercise_answer stops a new hand-in once a submission is `corrige`, and the student's
-- pages and the tutor's grid read `corrige` as graded. A correction with no grade was allowed
-- by the table and by the tutor's update policy, and would have read as « still waiting » on
-- the student's page while the database refused every new list. The tutor's correction screen
-- always gives a grade, so the table now says so too.

alter table public.submissions
  add constraint submissions_corrected_has_grade
  check (status <> 'corrige' or grade is not null);
