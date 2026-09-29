-- The parent view, after review (DECISIONS.md, D-091).
--
-- A parent reads what the child reads about themselves, so the child's standing (D-060)
-- applies to the parent too: a paused child's sessions to come, and a stopped child's
-- sessions and the homework they never handed anything in for, are hidden from both. The
-- view never shows a meeting link, so the function no longer returns one.
--
-- Invitations: the database makes the token and the dates; the tutor's session only says who
-- and for which student.

-- ─────────────────────────────────────────────────────────────── invitations

alter table public.parent_invites
  alter column token set default encode(extensions.gen_random_bytes(32), 'hex'),
  add constraint parent_invites_one_day check (expires_at <= created_at + interval '1 day');

revoke all on public.parent_invites from anon, authenticated;
grant select, delete on public.parent_invites to authenticated;
grant insert (student_id, email, full_name) on public.parent_invites to authenticated;

revoke all on public.guardian_links from anon;
revoke update, truncate, references, trigger on public.guardian_links from authenticated;

-- ─────────────────────────────────────────────────────────────── sessions

drop function public.child_sessions(uuid);

create function public.child_sessions(p_student_id uuid)
returns table (
  id uuid,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.session_status,
  mode public.session_mode,
  location text,
  type_name text,
  group_name text,
  attendance public.attendance_status,
  chapter_title text,
  homework text,
  recap text
)
language sql
stable
security definer
set search_path = ''
as $function$
  select
    s.id, s.starts_at, s.ends_at, s.status, s.mode, s.location,
    st.name, g.name, a.status, c.title, s.homework, s.recap
  from public.sessions s
  join public.profiles child on child.id = p_student_id
  left join public.session_types st on st.id = s.session_type_id
  left join public.groups g on g.id = s.group_id
  left join public.chapters c on c.id = s.covered_chapter_id
  left join public.session_attendance a on a.session_id = s.id and a.student_id = p_student_id
  where (select private.is_guardian_of(p_student_id))
    and s.status <> 'refusee'
    and s.starts_at between now() - interval '120 days' and now() + interval '120 days'
    -- What the child reads (sessions policy, D-060): all when active, what has started when
    -- paused, nothing once stopped.
    and case child.status
      when 'actif' then true
      when 'en_pause' then s.starts_at <= now()
      else false
    end
    and (
      s.student_id = p_student_id
      or (
        s.group_id is not null
        and exists (
          select 1
          from public.group_members gm
          where gm.group_id = s.group_id
            and gm.student_id = p_student_id
            and gm.joined_at <= s.starts_at
            and (gm.left_at is null or s.starts_at < gm.left_at)
        )
      )
    )
  order by s.starts_at;
$function$;

-- ─────────────────────────────────────────────────────────────── homework

-- As private.is_assigned_to_me: a stopped child keeps only the homework they handed something
-- in for.
create or replace function public.child_homework(p_student_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $function$
  with child as (
    select p.status from public.profiles p where p.id = p_student_id
  ),
  reaching as (
    select a.id, a.title, a.due_at, g.name as group_name
    from public.assignments a
    left join public.groups g on g.id = a.group_id
    cross join child
    where case
      when child.status = 'arrete' then exists (
        select 1 from public.submissions s
        where s.assignment_id = a.id and s.student_id = p_student_id
      )
      when child.status in ('actif', 'en_pause') then
        a.student_id = p_student_id
        or (
          a.group_id is not null
          and (
            exists (
              select 1
              from public.group_members gm
              where gm.group_id = a.group_id
                and gm.student_id = p_student_id
                and gm.joined_at <= a.due_at
                and (gm.left_at is null or a.due_at <= gm.left_at)
            )
            or exists (
              select 1 from public.submissions s
              where s.assignment_id = a.id and s.student_id = p_student_id
            )
            or exists (
              select 1 from public.exercise_reveals r
              where r.assignment_id = a.id and r.student_id = p_student_id
            )
          )
        )
      else false
    end
  )
  select case when (select private.is_guardian_of(p_student_id)) then
    jsonb_build_object(
      'assignments', coalesce((
        select jsonb_agg(
          jsonb_build_object(
            'id', r.id,
            'title', r.title,
            'due_at', r.due_at,
            'group_name', r.group_name,
            'exercises', coalesce((
              select jsonb_agg(
                jsonb_build_object('id', e.id, 'title', e.title) order by ai.position
              )
              from public.assignment_items ai
              join public.exercises e on e.id = ai.exercise_id
              where ai.assignment_id = r.id
            ), '[]'::jsonb)
          )
          order by r.due_at desc
        )
        from reaching r
      ), '[]'::jsonb),
      'submissions', coalesce((
        select jsonb_agg(jsonb_build_object(
          'assignment_id', s.assignment_id,
          'exercise_id', s.exercise_id,
          'status', s.status,
          'grade', s.grade
        ))
        from public.submissions s
        where s.student_id = p_student_id
      ), '[]'::jsonb),
      'reveals', coalesce((
        select jsonb_agg(jsonb_build_object(
          'assignment_id', r.assignment_id,
          'exercise_id', r.exercise_id
        ))
        from public.exercise_reveals r
        where r.student_id = p_student_id
      ), '[]'::jsonb)
    )
  end;
$function$;

revoke execute on function public.child_sessions(uuid) from public, anon;
grant execute on function public.child_sessions(uuid) to authenticated;
revoke execute on function public.child_homework(uuid) from public, anon;
grant execute on function public.child_homework(uuid) to authenticated;
