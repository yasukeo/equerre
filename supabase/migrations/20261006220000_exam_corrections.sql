-- Équerre's own corrections of the national exams the ministry published no « éléments de
-- réponse » for (D-103). Written as files (content/corriges/), imported by
-- scripts/import-corrections.mts, read on the site and printed as a PDF like a course.
--
-- A row of its own beside the paper, never one of the paper's files: what the ministry
-- published and what Équerre wrote stay apart, and the pages say which is which.

create table public.exam_corrections (
  exam_id uuid primary key references public.national_exams (id) on delete cascade,
  -- One line under the title: what the paper covers.
  summary text not null check (char_length(summary) between 1 and 300),
  -- A lesson document (src/lib/lesson/document.ts), checked by the import before it is written.
  content jsonb not null check (jsonb_typeof(content) = 'object' and content ->> 'type' = 'doc'),
  status public.publication_status not null default 'draft',
  -- Kept when it is taken off the site, like a lesson's: put back, it is the same correction.
  published_at timestamptz,
  -- The file it was imported from, and a hash of what was imported (D-098).
  source text not null check (source ~ '^corriges/[a-z0-9]+(-[a-z0-9]+)*/[a-z0-9]+(-[a-z0-9]+)*\.md$'),
  source_hash text not null check (source_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or published_at is not null)
);

create trigger exam_corrections_set_updated_at
  before update on public.exam_corrections
  for each row execute function private.set_updated_at();

alter table public.exam_corrections enable row level security;

-- A visitor only reads; the policies below say which rows, and who writes.
revoke all on public.exam_corrections from anon;
grant select on public.exam_corrections to anon;
revoke truncate, references, trigger on public.exam_corrections from authenticated;

-- Everyone reads a published correction of a published paper: a paper taken off the site takes
-- its correction with it. The tutor reads them all.
create policy "exam corrections: published ones to everyone, all to the tutor"
  on public.exam_corrections for select to anon, authenticated
  using (
    (
      status = 'published'
      and exists (
        select 1 from public.national_exams e
        where e.id = exam_id and e.status = 'published'
      )
    )
    or (select private.is_tutor())
  );

create policy "exam corrections: only the tutor adds them"
  on public.exam_corrections for insert to authenticated
  with check ((select private.is_tutor()));

create policy "exam corrections: only the tutor changes them"
  on public.exam_corrections for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "exam corrections: only the tutor removes them"
  on public.exam_corrections for delete to authenticated
  using ((select private.is_tutor()));

-- A correction's PDF is public like a public lesson's, and counted the same way
-- (20260930193147_public_print_quota.sql): the parameter keeps its name, and now names either.
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
  ) then
    return false;
  end if;
  return private.take_rate_limit('pdf:public:' || p_lesson_id, 3600, 40)
    and private.take_rate_limit('pdf:public', 60, 30);
end;
$function$;

revoke all on function public.take_public_print_quota(uuid) from public;
grant execute on function public.take_public_print_quota(uuid) to anon, authenticated;
