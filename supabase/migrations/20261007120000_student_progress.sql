-- The student's own way through her course (D-104): the documents she opened and how far
-- she read, the ones she marked « compris », the ones she keeps « à revoir », the national
-- exams she sat in exam mode, and the date of the exam she is preparing.
--
-- She writes only through the functions below, which check that she may read what she
-- tracks; she and the tutor read the rows. Nothing here is graded: it is her map, and the
-- tutor's view of how she works between sessions.

-- ─────────────────────────────────────────────────────────────── reading

create table public.lesson_progress (
  student_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  first_opened_at timestamptz not null default now(),
  last_opened_at timestamptz not null default now(),
  -- How far down the document she got, from 0 to 1: where « Reprendre » takes her back.
  position real not null default 0 check (position >= 0 and position <= 1),
  -- She said she understood it. Cleared if she takes it back.
  understood_at timestamptz,
  primary key (student_id, lesson_id)
);

create index lesson_progress_recent_idx
  on public.lesson_progress (student_id, last_opened_at desc);
create index lesson_progress_lesson_idx on public.lesson_progress (lesson_id);

alter table public.lesson_progress enable row level security;

create policy "lesson_progress: select own or tutor"
  on public.lesson_progress for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create table public.lesson_bookmarks (
  student_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (student_id, lesson_id)
);

create index lesson_bookmarks_lesson_idx on public.lesson_bookmarks (lesson_id);

alter table public.lesson_bookmarks enable row level security;

create policy "lesson_bookmarks: select own or tutor"
  on public.lesson_bookmarks for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

-- Where she is in a document, and whether she understood it. A null leaves a field as it is.
-- Called as she reads (throttled by the page), so a burst over the limit is dropped quietly.
create function public.track_lesson(
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

-- Keeps a document « à revoir », or lets it go. Returns the state it leaves.
create function public.set_lesson_bookmark(p_lesson_id uuid, p_saved boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_student uuid := (select auth.uid());
begin
  if v_student is null or private.my_student_status() is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if not p_saved then
    delete from public.lesson_bookmarks
    where student_id = v_student and lesson_id = p_lesson_id;
    return false;
  end if;
  if not private.can_read_lesson(p_lesson_id) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if not private.take_rate_limit('bookmark:' || v_student, 60, 60) then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  insert into public.lesson_bookmarks (student_id, lesson_id)
  values (v_student, p_lesson_id)
  on conflict do nothing;
  return true;
end;
$function$;

-- ─────────────────────────────────────────────────────────────── exam mode

create table public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  exam_id uuid not null references public.national_exams (id) on delete cascade,
  started_at timestamptz not null default now(),
  -- The time she gave herself: the paper's own by default.
  duration_minutes integer not null check (duration_minutes between 15 and 300),
  finished_at timestamptz,
  -- Her own mark out of 20, given with the correction in front of her.
  self_score numeric(4, 2) check (self_score >= 0 and self_score <= 20),
  check (finished_at is null or finished_at >= started_at)
);

create index exam_attempts_student_idx on public.exam_attempts (student_id, started_at desc);
create index exam_attempts_exam_idx on public.exam_attempts (exam_id);

alter table public.exam_attempts enable row level security;

create policy "exam_attempts: select own or tutor"
  on public.exam_attempts for select to authenticated
  using (student_id = (select auth.uid()) or (select private.is_tutor()));

create function public.start_exam_attempt(p_exam_id uuid, p_minutes integer)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_student uuid := (select auth.uid());
  v_id uuid;
begin
  if v_student is null or private.my_student_status() is null then
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
  if not private.take_rate_limit('exam:' || v_student, 3600, 20) then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  insert into public.exam_attempts (student_id, exam_id, duration_minutes)
  values (v_student, p_exam_id, p_minutes)
  returning id into v_id;
  return v_id;
end;
$function$;

-- Ends an attempt (once), and records or changes her own mark. A null mark keeps the one
-- she gave, if any.
create function public.finish_exam_attempt(p_attempt_id uuid, p_self_score numeric default null)
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
  if p_self_score is not null and (p_self_score < 0 or p_self_score > 20) then
    raise exception 'score_invalid' using errcode = 'P0001';
  end if;
  update public.exam_attempts
  set finished_at = coalesce(finished_at, now()),
      self_score = coalesce(round(p_self_score * 4) / 4, self_score)
  where id = p_attempt_id and student_id = v_student;
  if not found then
    raise exception 'not_found' using errcode = 'P0002';
  end if;
end;
$function$;

-- ─────────────────────────────────────────────────────────────── exam dates

-- The day the exam a programme prepares for begins (the 2e bac national, the 3e année
-- régional), set by the tutor each year: the students' countdown and revision plan run to it.
create table public.exam_dates (
  programme_code text primary key references public.programmes (code) on delete cascade,
  starts_on date not null,
  updated_at timestamptz not null default now()
);

alter table public.exam_dates enable row level security;

create policy "exam_dates: select signed in"
  on public.exam_dates for select to authenticated
  using (true);

create policy "exam_dates: insert tutor"
  on public.exam_dates for insert to authenticated
  with check ((select private.is_tutor()));

create policy "exam_dates: update tutor"
  on public.exam_dates for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

create policy "exam_dates: delete tutor"
  on public.exam_dates for delete to authenticated
  using ((select private.is_tutor()));

create trigger exam_dates_updated_at
  before update on public.exam_dates
  for each row execute function private.set_updated_at();

-- ─────────────────────────────────────────────────────────────── grants

revoke all on function public.track_lesson(uuid, real, boolean) from public, anon;
revoke all on function public.set_lesson_bookmark(uuid, boolean) from public, anon;
revoke all on function public.start_exam_attempt(uuid, integer) from public, anon;
revoke all on function public.finish_exam_attempt(uuid, numeric) from public, anon;
grant execute on function public.track_lesson(uuid, real, boolean) to authenticated;
grant execute on function public.set_lesson_bookmark(uuid, boolean) to authenticated;
grant execute on function public.start_exam_attempt(uuid, integer) to authenticated;
grant execute on function public.finish_exam_attempt(uuid, numeric) to authenticated;
