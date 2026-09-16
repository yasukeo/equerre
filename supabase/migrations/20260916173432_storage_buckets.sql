-- ── Who may read a lesson ───────────────────────────────────────────────────
-- The rule was written inline in the `lessons` select policy. A file attached to
-- a lesson has to follow exactly the same rule, so it becomes a function and the
-- policy calls it: one place to change when visibility changes.
create function private.can_read_lesson(p_lesson_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.lessons l
    where l.id = p_lesson_id
      and (
        (l.status = 'published' and l.visibility = 'public')
        or (select private.is_tutor())
        or (
          l.status = 'published'
          and l.visibility = 'enrolled'
          and exists (
            select 1
            from public.chapters c
            where c.id = l.chapter_id
              and c.level_code = (select private.my_level())
          )
        )
        or (
          l.status = 'published'
          and l.visibility = 'specific'
          and exists (
            select 1
            from public.lesson_access la
            where la.lesson_id = l.id
              and la.student_id = (select auth.uid())
          )
        )
      )
  );
$$;

drop policy "lessons: select by visibility" on public.lessons;

create policy "lessons: select by visibility"
  on public.lessons for select to anon, authenticated
  using (private.can_read_lesson(id));

-- A lesson file is stored as `<lesson_id>/<file_id>.pdf`. The folder is only a
-- string, so the cast is guarded by a `case`: `and` does not promise Postgres
-- evaluates its operands left to right, and a bad cast would fail the query
-- rather than hide the row.
create function private.can_read_lesson_file(p_object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when (storage.foldername(p_object_name))[1]
      ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      then private.can_read_lesson(((storage.foldername(p_object_name))[1])::uuid)
    else false
  end;
$$;

-- ── Buckets ─────────────────────────────────────────────────────────────────
-- `submissions` holds photographed homework: private, one folder per student.
--   8 MiB covers an uncompressed phone photo for the fallback path where the
--   browser cannot re-encode; the normal path lands 15–30 times under it.
--   HEIC and PNG are allowed for that same fallback.
-- `lesson-assets` is public, because a published public lesson has to prerender
--   and be indexable. Images inside an `enrolled` or `specific` lesson are
--   therefore protected only by an unguessable path — see DECISIONS.md, D-050.
--   SVG is not allowed: it can carry script, and a figure does not need it.
-- `lesson-files` is private, for attachments that must follow lesson visibility.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('submissions', 'submissions', false, 8388608,
   array['image/jpeg', 'image/webp', 'image/png', 'image/heic', 'image/heif']),
  ('lesson-assets', 'lesson-assets', true, 5242880,
   array['image/jpeg', 'image/webp', 'image/png']),
  ('lesson-files', 'lesson-files', false, 20971520,
   array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ── Submissions ─────────────────────────────────────────────────────────────
-- Object names are `<student_id>/<submission_ref>/<page_id>.webp`. The submission
-- row does not exist yet when the photo is uploaded, so the middle segment is a
-- reference the browser generates, not `submissions.id`.
create policy "submissions: a student writes inside her own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "submissions: a student replaces her own pages"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "submissions: a student reads her own pages, the tutor reads all"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'submissions'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or (select private.is_tutor())
    )
  );

create policy "submissions: a student removes her own pages"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- ── Lesson assets ───────────────────────────────────────────────────────────
-- Reading goes through the public URL, which does not consult these policies.
create policy "lesson assets: only the tutor adds them"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'lesson-assets' and (select private.is_tutor()));

create policy "lesson assets: only the tutor replaces them"
  on storage.objects for update to authenticated
  using (bucket_id = 'lesson-assets' and (select private.is_tutor()))
  with check (bucket_id = 'lesson-assets' and (select private.is_tutor()));

create policy "lesson assets: only the tutor removes them"
  on storage.objects for delete to authenticated
  using (bucket_id = 'lesson-assets' and (select private.is_tutor()));

-- ── Lesson files ────────────────────────────────────────────────────────────
create policy "lesson files: readable by whoever may read the lesson"
  on storage.objects for select to authenticated
  using (bucket_id = 'lesson-files' and private.can_read_lesson_file(name));

create policy "lesson files: only the tutor adds them"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'lesson-files' and (select private.is_tutor()));

create policy "lesson files: only the tutor replaces them"
  on storage.objects for update to authenticated
  using (bucket_id = 'lesson-files' and (select private.is_tutor()))
  with check (bucket_id = 'lesson-files' and (select private.is_tutor()));

create policy "lesson files: only the tutor removes them"
  on storage.objects for delete to authenticated
  using (bucket_id = 'lesson-files' and (select private.is_tutor()));

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
