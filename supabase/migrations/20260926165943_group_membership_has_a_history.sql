-- Group membership has a history (DECISIONS.md, D-070).
--
-- What reached a student through a group used to follow only her membership today. Once the
-- tutor can move students between groups, that took a student's corrected homework and past
-- sessions away when she left a group, and gave a newcomer the group's old homework, overdue.
-- Now a group's homework reaches a member if it was still to hand in when she joined, and a
-- group's session if it came after she joined; work she did and sessions she attended stay
-- hers after she leaves.

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
            -- A member while it was still to hand in: what fell due before she joined is the
            -- group's past, not hers.
            exists (
              select 1
              from public.group_members gm
              where gm.group_id = a.group_id
                and gm.student_id = (select auth.uid())
                and gm.joined_at <= a.due_at
            )
            -- What she handed in or opened stays hers once she has left the group.
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

create function private.group_session_reaches_me(
  p_session_id uuid,
  p_group_id uuid,
  p_starts_at timestamptz
)
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
    )
    or exists (
      select 1
      from public.session_attendance sa
      where sa.session_id = p_session_id
        and sa.student_id = (select auth.uid())
    );
$function$;

drop policy "sessions: select own, own group, or tutor" on public.sessions;

create policy "sessions: select own, own group, or tutor"
  on public.sessions for select to authenticated
  using (
    (select private.is_tutor())
    or (
      (
        student_id = (select auth.uid())
        or (group_id is not null and private.group_session_reaches_me(id, group_id, starts_at))
      )
      and case (select private.my_student_status())
        when 'actif' then true
        when 'en_pause' then starts_at <= now()
        else false
      end
    )
  );

-- Deleting a group took its sessions and its homework with it, the copies students had handed
-- in included. A group with a history can now only be renamed or emptied.
alter table public.assignments
  drop constraint assignments_group_id_fkey,
  add constraint assignments_group_id_fkey
    foreign key (group_id) references public.groups (id) on delete restrict;

alter table public.sessions
  drop constraint sessions_group_id_fkey,
  add constraint sessions_group_id_fkey
    foreign key (group_id) references public.groups (id) on delete restrict;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
