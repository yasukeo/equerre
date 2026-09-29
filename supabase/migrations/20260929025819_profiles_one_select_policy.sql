-- One select policy on profiles rather than two (performance advisor: multiple permissive
-- policies are each run for every row). Same rule as before: one's own profile, the tutor
-- every profile, a parent their linked children's (D-091).
drop policy "profiles: select children" on public.profiles;
drop policy "profiles: select own or tutor" on public.profiles;

create policy "profiles: select own, children or tutor"
  on public.profiles for select to authenticated
  using (
    id = (select auth.uid())
    or (select private.is_tutor())
    or private.is_guardian_of(id)
  );
