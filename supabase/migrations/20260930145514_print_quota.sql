-- A PDF printed for one reader (D-096) costs a headless Chrome: a signed-in reader gets a
-- few a minute, and enough in an hour for any week's revision. Public documents are printed
-- once per version and cached, so they need no quota.
create function public.take_print_quota()
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_me uuid := auth.uid();
begin
  if v_me is null then
    return false;
  end if;
  return private.take_rate_limit('pdf:minute:' || v_me, 60, 6)
    and private.take_rate_limit('pdf:hour:' || v_me, 3600, 60);
end;
$function$;

revoke all on function public.take_print_quota() from public, anon;
grant execute on function public.take_print_quota() to authenticated;
