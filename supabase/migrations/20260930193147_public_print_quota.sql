-- A public document's PDF is cached by the CDN under one address per version (D-096), but
-- Next drops some query parameters before the route sees the address, so a stream of made-up
-- addresses would each miss the cache and start a headless Chrome. Every print of a public
-- document is counted: a few an hour for each document, and a ceiling for the whole site,
-- far above what the CDN lets through when nobody is playing games.
create function public.take_public_print_quota(p_lesson_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if not exists (
    select 1 from public.lessons
    where id = p_lesson_id and status = 'published' and visibility = 'public'
  ) then
    return false;
  end if;
  return private.take_rate_limit('pdf:public:' || p_lesson_id, 3600, 40)
    and private.take_rate_limit('pdf:public', 60, 30);
end;
$function$;

revoke all on function public.take_public_print_quota(uuid) from public;
grant execute on function public.take_public_print_quota(uuid) to anon, authenticated;
