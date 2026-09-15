-- Content: chapters, lessons, targeted access, exercises and their solutions.
--
-- Rich content (lessons, statements, solutions) is stored as Tiptap JSON. See DECISIONS.md
-- for the node vocabulary (inlineMath, blockMath, callout, fileAttachment, …).

create type public.publication_status as enum ('draft', 'published');
create type public.lesson_visibility as enum ('public', 'enrolled', 'specific');
create type public.answer_type as enum ('upload', 'numeric', 'mcq');

-- ─────────────────────────────────────────────────────────────── chapters

create table public.chapters (
  id uuid primary key default gen_random_uuid(),
  level_code text not null references public.levels (code) on update cascade,
  title text not null check (char_length(title) between 1 and 120),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position integer not null default 0,
  description text check (char_length(description) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (level_code, slug)
);

create index chapters_level_position_idx on public.chapters (level_code, position);

create trigger chapters_set_updated_at
  before update on public.chapters
  for each row execute function private.set_updated_at();

alter table public.chapters enable row level security;

-- Chapter titles are a table of contents, not private data.
create policy "chapters: select everyone"
  on public.chapters for select to anon, authenticated
  using (true);

create policy "chapters: insert tutor"
  on public.chapters for insert to authenticated
  with check ((select private.is_tutor()));

create policy "chapters: update tutor"
  on public.chapters for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "chapters: delete tutor"
  on public.chapters for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── lessons

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  summary text check (char_length(summary) <= 300),
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb
    check (jsonb_typeof(content) = 'object'),
  position integer not null default 0,
  status public.publication_status not null default 'draft',
  visibility public.lesson_visibility not null default 'enrolled',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status = 'draft' or published_at is not null)
);

create index lessons_chapter_position_idx on public.lessons (chapter_id, position);
create index lessons_published_at_idx on public.lessons (published_at desc) where status = 'published';

create trigger lessons_set_updated_at
  before update on public.lessons
  for each row execute function private.set_updated_at();

create table public.lesson_access (
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  granted_at timestamptz not null default now(),
  primary key (lesson_id, student_id)
);

create index lesson_access_student_id_idx on public.lesson_access (student_id);

alter table public.lessons enable row level security;

create policy "lessons: select by visibility"
  on public.lessons for select to anon, authenticated
  using (
    (status = 'published' and visibility = 'public')
    or (select private.is_tutor())
    or (
      status = 'published'
      and visibility = 'enrolled'
      and exists (
        select 1
        from public.chapters c
        where c.id = lessons.chapter_id
          and c.level_code = (select private.my_level())
      )
    )
    or (
      status = 'published'
      and visibility = 'specific'
      and exists (
        select 1
        from public.lesson_access la
        where la.lesson_id = lessons.id
          and la.student_id = (select auth.uid())
      )
    )
  );

create policy "lessons: insert tutor"
  on public.lessons for insert to authenticated
  with check ((select private.is_tutor()));

create policy "lessons: update tutor"
  on public.lessons for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "lessons: delete tutor"
  on public.lessons for delete to authenticated
  using ((select private.is_tutor()));

alter table public.lesson_access enable row level security;

create policy "lesson_access: select own or tutor"
  on public.lesson_access for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create policy "lesson_access: insert tutor"
  on public.lesson_access for insert to authenticated
  with check ((select private.is_tutor()));

create policy "lesson_access: update tutor"
  on public.lesson_access for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "lesson_access: delete tutor"
  on public.lesson_access for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── exercises
-- Students get read access to exercises through assignments (phase 1 migration).

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  statement jsonb not null check (jsonb_typeof(statement) = 'object'),
  figure_path text,
  difficulty smallint not null check (difficulty between 1 and 5),
  answer_type public.answer_type not null default 'upload',
  -- MCQ only: [{ "id": "a", "label": "…" }, …]
  choices jsonb check (choices is null or jsonb_typeof(choices) = 'array'),
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((answer_type = 'mcq') = (choices is not null))
);

create index exercises_chapter_id_idx on public.exercises (chapter_id);
create index exercises_tags_idx on public.exercises using gin (tags);

create trigger exercises_set_updated_at
  before update on public.exercises
  for each row execute function private.set_updated_at();

alter table public.exercises enable row level security;

create policy "exercises: select tutor"
  on public.exercises for select to authenticated
  using ((select private.is_tutor()));

create policy "exercises: insert tutor"
  on public.exercises for insert to authenticated
  with check ((select private.is_tutor()));

create policy "exercises: update tutor"
  on public.exercises for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "exercises: delete tutor"
  on public.exercises for delete to authenticated
  using ((select private.is_tutor()));

-- Solutions and expected answers are a separate table for the same reason as notes:
-- a student who can read an exercise row must not be able to read its answer.
create table public.exercise_solutions (
  exercise_id uuid primary key references public.exercises (id) on delete cascade,
  solution jsonb not null default '{"type":"doc","content":[]}'::jsonb
    check (jsonb_typeof(solution) = 'object'),
  correct_numeric numeric,
  tolerance numeric check (tolerance is null or tolerance >= 0),
  correct_choice_ids text[],
  updated_at timestamptz not null default now()
);

create trigger exercise_solutions_set_updated_at
  before update on public.exercise_solutions
  for each row execute function private.set_updated_at();

alter table public.exercise_solutions enable row level security;

create policy "exercise_solutions: select tutor"
  on public.exercise_solutions for select to authenticated
  using ((select private.is_tutor()));

create policy "exercise_solutions: insert tutor"
  on public.exercise_solutions for insert to authenticated
  with check ((select private.is_tutor()));

create policy "exercise_solutions: update tutor"
  on public.exercise_solutions for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "exercise_solutions: delete tutor"
  on public.exercise_solutions for delete to authenticated
  using ((select private.is_tutor()));
