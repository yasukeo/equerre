-- A group membership is a period (DECISIONS.md, D-070).
--
-- The first version kept a student's past in a group only through the work she did and the
-- attendance the tutor took, because leaving deleted the membership: a leaver lost the
-- group's past sessions — nothing writes attendance yet — and a student removed by mistake
-- and added back started again from that day. Leaving now stamps `left_at`, and what reached
-- her while she was in the group stays hers: its homework due in the period, its sessions
-- held in it. Adding her back clears the stamp.

alter table public.group_members
  add column left_at timestamptz,
  add constraint group_members_left_after_joining check (left_at is null or left_at >= joined_at);

-- Members today: the groups a student belongs to, for everything that reads the present.
create or replace function private.is_group_member(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select private.my_student_status() in ('actif', 'en_pause')
    and exists (
      select 1
      from public.group_members
      where group_id = p_group_id
        and student_id = (select auth.uid())
        and left_at is null
    );
$function$;

create or replace function private.assignment_reaches_me(p_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.assignments a
    where a.id = p_assignment_id
      and (
        a.student_id = (select auth.uid())
        or (
          a.group_id is not null
          and (
            -- In the group when it fell due: homework due before she joined, or after she
            -- left, is the group's, not hers.
            exists (
              select 1
              from public.group_members gm
              where gm.group_id = a.group_id
                and gm.student_id = (select auth.uid())
                and gm.joined_at <= a.due_at
                and (gm.left_at is null or a.due_at <= gm.left_at)
            )
            -- What she handed in or opened stays hers, whenever she left.
            or exists (
              select 1
              from public.submissions s
              where s.assignment_id = a.id
                and s.student_id = (select auth.uid())
            )
            or exists (
              select 1
              from public.exercise_reveals r
              where r.assignment_id = a.id
                and r.student_id = (select auth.uid())
            )
          )
        )
      )
  );
$function$;

-- A group's session reaches her if it starts while she is in the group.
drop policy "sessions: select own, own group, or tutor" on public.sessions;
drop function private.group_session_reaches_me(uuid, uuid, timestamptz);

create function private.group_session_reaches_me(p_group_id uuid, p_starts_at timestamptz)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.group_members gm
    where gm.group_id = p_group_id
      and gm.student_id = (select auth.uid())
      and gm.joined_at <= p_starts_at
      and (gm.left_at is null or p_starts_at < gm.left_at)
  );
$function$;

create policy "sessions: select own, own group, or tutor"
  on public.sessions for select to authenticated
  using (
    (select private.is_tutor())
    or (
      (
        student_id = (select auth.uid())
        or (group_id is not null and private.group_session_reaches_me(group_id, starts_at))
      )
      and case (select private.my_student_status())
        when 'actif' then true
        when 'en_pause' then starts_at <= now()
        else false
      end
    )
  );

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
