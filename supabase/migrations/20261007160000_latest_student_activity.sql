-- When each student last did something online (D-104): the last document opened and the last
-- exercise handed in, one row per student. A list of rows would stop at the API's 1000; this
-- answers per student whatever the class's size. Security invoker: the caller's policies apply,
-- so the tutor sees every student and anyone else only their own row.

create function public.latest_student_activity()
returns table (student_id uuid, last_read timestamptz, last_handed_in timestamptz)
language sql
stable
security invoker
set search_path = ''
as $$
  with reads as (
    select distinct on (lp.student_id) lp.student_id, lp.last_opened_at
    from public.lesson_progress lp
    order by lp.student_id, lp.last_opened_at desc
  ),
  handed as (
    select s.student_id, max(s.submitted_at) as submitted_at
    from public.submissions s
    group by s.student_id
  )
  select
    coalesce(reads.student_id, handed.student_id),
    reads.last_opened_at,
    handed.submitted_at
  from reads
  full join handed on handed.student_id = reads.student_id;
$$;

revoke all on function public.latest_student_activity() from public, anon;
grant execute on function public.latest_student_activity() to authenticated;
