-- After review of the student's progress (D-104).
--
-- * The new tables are written only through their functions: the default grants on them are
--   taken back, as for the exam corrections (20261006220000).
-- * A stopped student keeps reading what is public, but does not sit new exams.
-- * One exam at a time per paper: starting again while one runs returns the running one, so
--   a double tap or a second tab does not open a second clock.
-- * She can give up an exam she started by mistake: it is removed, and no correction shown.
-- * « J’ai compris » says when it was not saved; a reading position over the limit is dropped
--   quietly, as before.

revoke all on public.lesson_progress, public.lesson_bookmarks, public.exam_attempts,
  public.exam_dates from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.lesson_progress, public.lesson_bookmarks, public.exam_attempts from authenticated;
revoke truncate, references, trigger on public.exam_dates from authenticated;

create unique index exam_attempts_one_running_idx
  on public.exam_attempts (student_id, exam_id)
  where finished_at is null;

create or replace function public.track_lesson(
  p_lesson_id uuid,
  p_position real default null,
  p_understood boolean default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_student uuid := (select auth.uid());
  v_position real := least(greatest(coalesce(p_position, 0), 0), 1);
begin
  if v_student is null or private.my_student_status() is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if not private.can_read_lesson(p_lesson_id) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if not private.take_rate_limit('progress:' || v_student, 60, 120) then
    if p_understood is not null then
      raise exception 'rate_limited' using errcode = 'P0001';
    end if;
    return;
  end if;

  insert into public.lesson_progress as lp (student_id, lesson_id, position, understood_at)
  values (
    v_student,
    p_lesson_id,
    v_position,
    case when p_understood then now() end
  )
  on conflict (student_id, lesson_id) do update set
    last_opened_at = now(),
    position = case when p_position is null then lp.position else v_position end,
    understood_at = case
      when p_understood is null then lp.understood_at
      when p_understood then coalesce(lp.understood_at, now())
      else null
    end;
end;
$function$;

create or replace function public.start_exam_attempt(p_exam_id uuid, p_minutes integer)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_student uuid := (select auth.uid());
  v_id uuid;
begin
  if v_student is null
    or coalesce(private.my_student_status() in ('actif', 'en_pause'), false) is false then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.national_exams where id = p_exam_id and status = 'published'
  ) then
    raise exception 'not_found' using errcode = 'P0002';
  end if;
  if p_minutes is null or p_minutes < 15 or p_minutes > 300 then
    raise exception 'duration_invalid' using errcode = 'P0001';
  end if;

  select id into v_id
  from public.exam_attempts
  where student_id = v_student and exam_id = p_exam_id and finished_at is null;
  if v_id is not null then
    return v_id;
  end if;

  if not private.take_rate_limit('exam:' || v_student, 3600, 20) then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  insert into public.exam_attempts (student_id, exam_id, duration_minutes)
  values (v_student, p_exam_id, p_minutes)
  on conflict (student_id, exam_id) where finished_at is null do nothing
  returning id into v_id;
  if v_id is null then
    select id into v_id
    from public.exam_attempts
    where student_id = v_student and exam_id = p_exam_id and finished_at is null;
  end if;
  return v_id;
end;
$function$;

-- Gives up an exam still running: it leaves no trace, and no correction was shown.
create function public.abandon_exam_attempt(p_attempt_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_student uuid := (select auth.uid());
begin
  if v_student is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  delete from public.exam_attempts
  where id = p_attempt_id and student_id = v_student and finished_at is null;
end;
$function$;

revoke all on function public.abandon_exam_attempt(uuid) from public, anon;
grant execute on function public.abandon_exam_attempt(uuid) to authenticated;
