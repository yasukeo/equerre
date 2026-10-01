-- The content file an imported document came from (D-098), as `programme/chapitre/slug.md`.
-- The import rewrites only the documents it made from that same file, never one the tutor
-- wrote under an address it happens to share.
alter table public.lessons
  add column source text
  check (source is null or source ~ '^[a-z0-9]+(-[a-z0-9]+)*/[a-z0-9]+(-[a-z0-9]+)*/[a-z0-9]+(-[a-z0-9]+)*\.md$');
