-- The public site and its blog (DECISIONS.md, D-089).
--
-- Posts are short public articles, the top of the tutor's funnel: method tips, exam
-- preparation, common mistakes. They are written with the lesson editor (text, callouts,
-- maths; no image or file in v1), in one of four categories, drafted then published.
-- Published posts are public and prerendered; drafts are the tutor's only. Reading time is
-- counted from the text when the page is drawn, not stored.
--
-- The site profile is what the public pages say about the tutor that is not already data
-- elsewhere: a line under her name, a short presentation, where she teaches, and the
-- WhatsApp number parents write to. One row, public, written by the tutor only.

create type public.post_category as enum ('methode', 'examens', 'erreurs', 'orientation');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 140),
  -- The post's address, set once: a shared link keeps working when the title changes.
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),
  excerpt text check (char_length(excerpt) <= 300),
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb
    check (jsonb_typeof(content) = 'object' and pg_column_size(content) <= 262144),
  category public.post_category not null,
  status public.publication_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status = 'draft' or published_at is not null)
);

create index posts_published_idx on public.posts (published_at desc) where status = 'published';

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function private.set_updated_at();

alter table public.posts enable row level security;

create policy "posts: select published or tutor"
  on public.posts for select to anon, authenticated
  using (status = 'published' or (select private.is_tutor()));

create policy "posts: insert tutor"
  on public.posts for insert to authenticated
  with check ((select private.is_tutor()));

create policy "posts: update tutor"
  on public.posts for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "posts: delete tutor"
  on public.posts for delete to authenticated
  using ((select private.is_tutor()));

-- ─────────────────────────────────────────────────────────────── site profile

create table public.site_profile (
  id boolean primary key default true check (id),
  tagline text check (char_length(tagline) <= 160),
  bio text check (char_length(bio) <= 1500),
  city text check (char_length(city) <= 80),
  -- Where she goes to students' homes: « Temara, Harhoura, Rabat-Souissi ».
  areas text check (char_length(areas) <= 200),
  -- Same rule as profiles.phone.
  whatsapp text check (whatsapp ~ '^\+?[0-9 ]{6,20}$'),
  updated_at timestamptz not null default now()
);

insert into public.site_profile (id) values (true);

create trigger site_profile_set_updated_at
  before update on public.site_profile
  for each row execute function private.set_updated_at();

alter table public.site_profile enable row level security;

create policy "site_profile: select all"
  on public.site_profile for select to anon, authenticated
  using (true);

create policy "site_profile: update tutor"
  on public.site_profile for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

-- No insert or delete: the one row is made here and stays.
