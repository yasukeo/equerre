-- Équerre's correction of a national exam is for a paper that has none (D-103). If the
-- ministry's « éléments de réponse » or the tutor's own correction are uploaded later, Équerre's
-- steps aside: visitors no longer read it or print it, without anyone having to remember to
-- unpublish it. The tutor still sees it, and it comes back if the file is removed.

drop policy "exam corrections: published ones to everyone, all to the tutor"
  on public.exam_corrections;

create policy "exam corrections: published ones of papers without a correction, all to the tutor"
  on public.exam_corrections for select to anon, authenticated
  using (
    (
      status = 'published'
      and exists (
        select 1 from public.national_exams e
        where e.id = exam_id and e.status = 'published' and e.solution_path is null
      )
    )
    or (select private.is_tutor())
  );

create or replace function public.take_public_print_quota(p_lesson_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if not exists (
    select 1 from public.lessons
    where id = p_lesson_id and status = 'published' and visibility = 'public'
  ) and not exists (
    select 1 from public.exam_corrections c
    join public.national_exams e on e.id = c.exam_id
    where c.exam_id = p_lesson_id and c.status = 'published' and e.status = 'published'
      and e.solution_path is null
  ) then
    return false;
  end if;
  return private.take_rate_limit('pdf:public:' || p_lesson_id, 3600, 40)
    and private.take_rate_limit('pdf:public', 60, 30);
end;
$function$;
