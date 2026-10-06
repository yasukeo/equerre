-- A chapter belongs to a programme (20260930031104_programmes.sql); its old level_code has not
-- been read since, and every chapter has its programme. The owner agreed to drop it on
-- 2026-10-06 (D-102). Its foreign key, its unique (level_code, slug) and its index go with it.
do $check$
begin
  if exists (select 1 from public.chapters where programme_code is null) then
    raise exception 'a chapter has no programme: give it one before dropping level_code';
  end if;
end
$check$;

alter table public.chapters drop column level_code;
