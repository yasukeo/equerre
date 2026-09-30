-- The documents of a chapter (DECISIONS.md, D-094). A chapter has, as on the sites students
-- already know, its course, a summary of it, series of exercises with their corrections, and
-- practice tests (« devoirs »). They are all lessons: the same editor, the same rules of who
-- reads what, the same pages and PDFs; the kind says which part of the chapter they fill.
create type public.document_kind as enum ('cours', 'resume', 'serie', 'devoir');

alter table public.lessons add column kind public.document_kind not null default 'cours';

create index lessons_chapter_kind_idx on public.lessons (chapter_id, kind, position);
