-- The draft cap in the previous migration queried storage.objects from inside a policy on
-- storage.objects. Postgres refuses that outright ("infinite recursion detected in policy"),
-- so every student upload failed. The count now runs in a security definer function owned
-- by postgres, which bypasses row level security and so never re-enters the policy.

create function private.my_pending_page_count()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)
  from storage.objects o
  where o.bucket_id = 'submissions'
    and (storage.foldername(o.name))[1] = (select auth.uid())::text
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and o.name = any (s.file_paths)
    );
$$;

drop policy "submissions: a student writes inside her own folder" on storage.objects;

create policy "submissions: a student writes inside her own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and private.is_submission_page_name(name)
    -- A handed-in path is never written again, even when its object is gone.
    and not exists (
      select 1
      from public.submissions s
      where s.student_id = (select auth.uid())
        and objects.name = any (s.file_paths)
    )
    -- Pages waiting to be handed in are bounded; handed-in ones are bounded by the work.
    and (select private.my_pending_page_count()) < 40
  );

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
