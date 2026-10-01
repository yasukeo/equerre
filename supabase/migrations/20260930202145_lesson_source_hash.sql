-- What an imported document looked like when it was imported (D-098): a hash of its title,
-- summary, kind, visibility and content. The import rewrites a draft only while it still has
-- that hash, so a draft the tutor has corrected keeps her corrections.
alter table public.lessons
  add column source_hash text check (source_hash is null or source_hash ~ '^[0-9a-f]{64}$');
