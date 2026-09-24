-- The lessons select policy asked private.can_read_lesson(id), which looks the lesson up
-- again by id. A row being inserted is invisible to that lookup, so INSERT … RETURNING failed
-- its own select check — even for the tutor, whose branch sat inside the lookup. Creating a
-- lesson from the editor was impossible (introduced in 20260916173432). The rule now reads the
-- row it is given; the lookup by id remains only for storage, where all there is to go on is
-- a folder name (DECISIONS.md, D-050).

create function private.lesson_visible_to_me(
  p_lesson_id uuid,
  p_chapter_id uuid,
  p_status public.publication_status,
  p_visibility public.lesson_visibility
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (p_status = 'published' and p_visibility = 'public')
    or (select private.is_tutor())
    or (
      p_status = 'published'
      and p_visibility = 'enrolled'
      and exists (
        select 1
        from public.chapters c
        where c.id = p_chapter_id
          and c.level_code = (select private.my_level())
      )
    )
    or (
      p_status = 'published'
      and p_visibility = 'specific'
      and (select private.my_student_status()) in ('actif', 'en_pause')
      and exists (
        select 1
        from public.lesson_access la
        where la.lesson_id = p_lesson_id
          and la.student_id = (select auth.uid())
      )
    );
$$;

create or replace function private.can_read_lesson(p_lesson_id uuid)
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
      and private.lesson_visible_to_me(l.id, l.chapter_id, l.status, l.visibility)
  );
$$;

drop policy "lessons: select by visibility" on public.lessons;

create policy "lessons: select by visibility"
  on public.lessons for select to anon, authenticated
  using (private.lesson_visible_to_me(id, chapter_id, status, visibility));

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
