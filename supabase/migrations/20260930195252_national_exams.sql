-- Past national exams (DECISIONS.md, D-097): the official papers and their corrections, as
-- PDFs the tutor uploads. One row is one paper of one session of one year, for a programme or
-- for the part of its streams that sat it (« STE et STM »).

create type public.exam_session as enum ('normale', 'rattrapage');

create table public.national_exams (
  id uuid primary key default gen_random_uuid(),
  programme_code text not null references public.programmes (code) on update cascade,
  year smallint not null check (year between 2000 and 2100),
  session public.exam_session not null,
  -- Null when the whole programme sat the paper.
  track text check (track is null or char_length(track) between 1 and 80),
  -- `<exam_id>/<file_id>.pdf` in the national-exams bucket.
  subject_path text not null
    check (subject_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf$'),
  subject_size integer not null check (subject_size > 0),
  solution_path text
    check (solution_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf$'),
  solution_size integer check (solution_size > 0),
  status public.publication_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((solution_path is null) = (solution_size is null)),
  -- A file lives in its own paper's folder.
  check (split_part(subject_path, '/', 1) = id::text),
  check (solution_path is null or split_part(solution_path, '/', 1) = id::text)
);

-- One paper per programme, year, session and track.
create unique index national_exams_paper_key
  on public.national_exams (programme_code, year, session, coalesce(track, ''));

create trigger national_exams_set_updated_at
  before update on public.national_exams
  for each row execute function private.set_updated_at();

alter table public.national_exams enable row level security;

create policy "national exams: published ones to everyone, all to the tutor"
  on public.national_exams for select to anon, authenticated
  using (status = 'published' or (select private.is_tutor()));

create policy "national exams: only the tutor adds them"
  on public.national_exams for insert to authenticated
  with check ((select private.is_tutor()));

create policy "national exams: only the tutor changes them"
  on public.national_exams for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "national exams: only the tutor removes them"
  on public.national_exams for delete to authenticated
  using ((select private.is_tutor()));

-- The papers are public documents: a public bucket, served from the CDN. A paper not yet
-- published is reachable only by its unguessable address, like a lesson image (D-050).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('national-exams', 'national-exams', true, 20971520, array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "national exams files: only the tutor adds them"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'national-exams' and (select private.is_tutor()));

create policy "national exams files: only the tutor replaces them"
  on storage.objects for update to authenticated
  using (bucket_id = 'national-exams' and (select private.is_tutor()))
  with check (bucket_id = 'national-exams' and (select private.is_tutor()));

create policy "national exams files: only the tutor removes them"
  on storage.objects for delete to authenticated
  using (bucket_id = 'national-exams' and (select private.is_tutor()));

-- The tutor lists a paper's folder to check that the files a form names were uploaded.
create policy "national exams files: the tutor lists them"
  on storage.objects for select to authenticated
  using (bucket_id = 'national-exams' and (select private.is_tutor()));
