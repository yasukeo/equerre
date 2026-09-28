-- What the review of payments found (DECISIONS.md, D-088).
--
--  * Each session was rounded to a hundredth of an hour before adding up: three 40-minute
--    sessions made 2,01 h, and a student who paid exactly two hours was late. Accounts now
--    count in minutes, exactly, and turn them into hours only to show them.
--  * The statement's newest-first order did not reverse lines of the same instant, so its
--    balances contradicted each other. Lines are numbered in the order they are added up.
--  * « Covered until » took the last day of any subscription, whether it had begun or what it
--    covered. Accounts now list the subscriptions still running or to come, with their scope.
--  * The 10 000th receipt of a year would have taken the 1 000th's number.
--  * The hours of a payment without a plan were rounded before being checked; the start of a
--    subscription had no bounds; a plan's kind could change through the API.
--  * private.account_lines trusted its callers to check access: it now checks too.
--  * The RLS tests reset the receipt counter in two steps, and could lower it under a payment
--    recorded meanwhile: remove_test_payments does it under the counter's lock.

-- ─────────────────────────────────────────────────────────────── recording

create or replace function public.record_payment(
  p_student_id uuid,
  p_amount_mad numeric,
  p_method public.payment_method,
  p_paid_on date,
  p_plan_id uuid default null,
  p_covers_from date default null,
  p_label text default null,
  p_hours numeric default null,
  p_note text default null
)
returns table (id uuid, receipt_number text)
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_plan public.plans;
  v_today date := (now() at time zone 'Africa/Casablanca')::date;
  v_label text;
  v_hours numeric(6, 2) := 0;
  v_from date;
  v_to date;
  v_scope public.plan_scope;
  v_year smallint := extract(year from v_today)::smallint;
  v_rank integer;
  v_id uuid;
  v_number text;
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;
  if not exists (select 1 from public.profiles p where p.id = p_student_id and p.role = 'student') then
    raise exception 'student_not_found' using errcode = 'P0002';
  end if;
  if p_amount_mad is null or p_amount_mad <= 0 or p_amount_mad > 99999999.99
     or p_amount_mad <> round(p_amount_mad, 2) then
    raise exception 'amount_invalid' using errcode = 'P0001';
  end if;
  if p_paid_on is null or p_paid_on > v_today or p_paid_on < date '2020-01-01' then
    raise exception 'date_invalid' using errcode = 'P0001';
  end if;

  if p_plan_id is not null then
    select * into v_plan from public.plans pl where pl.id = p_plan_id;
    if not found or not v_plan.is_active then
      raise exception 'plan_invalid' using errcode = 'P0001';
    end if;
    v_label := v_plan.name;
    if v_plan.kind = 'hour_pack' then
      v_hours := v_plan.hours;
    else
      -- A period that starts within a year either way of today.
      if p_covers_from is null
         or p_covers_from < v_today - 366 or p_covers_from > v_today + 366 then
        raise exception 'covers_from_required' using errcode = 'P0001';
      end if;
      v_from := p_covers_from;
      v_to := (p_covers_from + make_interval(months => v_plan.period_months) - interval '1 day')::date;
      v_scope := v_plan.scope;
    end if;
  else
    v_label := nullif(btrim(coalesce(p_label, '')), '');
    if v_label is null or char_length(v_label) > 120 then
      raise exception 'label_invalid' using errcode = 'P0001';
    end if;
    -- Checked as given, before numeric(6, 2) would round it.
    if p_hours is not null
       and (p_hours < 0 or p_hours > 500 or p_hours <> round(p_hours, 2)) then
      raise exception 'hours_invalid' using errcode = 'P0001';
    end if;
    v_hours := coalesce(p_hours, 0);
  end if;

  -- Numbered in the order they are recorded, one series a year, never a gap nor a repeat;
  -- four digits at least, more from the 10 000th.
  insert into public.receipt_counters as c (year, last)
  values (v_year, 1)
  on conflict (year) do update set last = c.last + 1
  returning c.last into v_rank;
  v_number := v_year::text || '-' || lpad(v_rank::text, greatest(4, length(v_rank::text)), '0');

  insert into public.payments (
    receipt_number, student_id, plan_id, label, amount_mad, method, paid_on,
    hours_credited, covers_from, covers_to, covers_scope, note
  )
  values (
    v_number, p_student_id, p_plan_id, v_label, p_amount_mad, p_method, p_paid_on,
    v_hours, v_from, v_to, v_scope, nullif(btrim(coalesce(p_note, '')), '')
  )
  returning payments.id into v_id;

  return query select v_id, v_number;
end;
$function$;

-- A pack stays a pack: its payments were bought as one.
create function private.keep_plan_kind()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  if new.kind is distinct from old.kind then
    raise exception 'plan_kind_fixed' using errcode = 'P0001';
  end if;
  return new;
end;
$function$;

create trigger plans_keep_kind
  before update of kind on public.plans
  for each row execute function private.keep_plan_kind();

-- ─────────────────────────────────────────────────────────────── balances, in minutes

drop function public.student_accounts(uuid);
drop function public.account_statement(uuid);
drop function private.account_lines(uuid[]);

-- Every line of the accounts the caller may read, in minutes: payments credit their hours,
-- sessions use their length unless a subscription covers them.
create function private.account_lines(p_student_ids uuid[])
returns table (
  student_id uuid,
  at timestamptz,
  minutes numeric,
  session_id uuid,
  payment_id uuid,
  covered boolean
)
language sql
stable
security definer
set search_path = ''
as $function$
  with allowed as (
    select s.id
    from unnest(p_student_ids) as s (id)
    where (select private.can_see_account(s.id))
  ),
  charged as (
    select s.student_id, s.id as session_id, s.starts_at, s.ends_at,
      'individuel'::public.plan_scope as scope
    from public.sessions s
    where s.student_id in (select id from allowed)
      and s.group_id is null
      and s.status in ('terminee', 'absent')
    union all
    select a.student_id, s.id, s.starts_at, s.ends_at, 'groupe'::public.plan_scope
    from public.session_attendance a
    join public.sessions s on s.id = a.session_id
    where a.student_id in (select id from allowed)
      and s.status = 'terminee'
      and a.status in ('present', 'absent')
  )
  select
    c.student_id,
    c.starts_at,
    case
      when cover.covered then 0::numeric
      else -(extract(epoch from (c.ends_at - c.starts_at)) / 60)
    end,
    c.session_id,
    null::uuid,
    cover.covered
  from charged c
  cross join lateral (
    select exists (
      select 1
      from public.payments p
      where p.student_id = c.student_id
        and p.voided_at is null
        and p.covers_from <= (c.starts_at at time zone 'Africa/Casablanca')::date
        and p.covers_to >= (c.starts_at at time zone 'Africa/Casablanca')::date
        and p.covers_scope in ('tous', c.scope)
    ) as covered
  ) cover
  union all
  select
    p.student_id,
    (p.paid_on::timestamp at time zone 'Africa/Casablanca'),
    p.hours_credited * 60,
    null::uuid,
    p.id,
    false
  from public.payments p
  where p.student_id in (select id from allowed)
    and p.voided_at is null;
$function$;

-- Each account the caller may read: minutes credited and used, the balance, the
-- subscriptions still running or to come (with what they cover), the last day any
-- subscription covered, and since when she has owed time, if she does.
create function public.student_accounts(p_student_id uuid default null)
returns table (
  student_id uuid,
  credited_minutes numeric,
  used_minutes numeric,
  balance_minutes numeric,
  coverage jsonb,
  covered_until date,
  last_paid_on date,
  overdue_since timestamptz
)
language sql
stable
security definer
set search_path = ''
as $function$
  with students as (
    select coalesce(array_agg(p.id), '{}') as ids
    from public.profiles p
    where p.role = 'student'
      and (p_student_id is null or p.id = p_student_id)
      and (select private.can_see_account(p.id))
  ),
  lines as (
    select l.*
    from students, private.account_lines(students.ids) l
  ),
  running as (
    select
      l.student_id,
      l.at,
      row_number() over w as seq,
      sum(l.minutes) over (w rows between unbounded preceding and current row) as balance
    from lines l
    window w as (partition by l.student_id order by l.at, l.minutes desc, l.session_id, l.payment_id)
  ),
  totals as (
    select
      l.student_id,
      sum(l.minutes) filter (where l.minutes > 0) as credited,
      -sum(l.minutes) filter (where l.minutes < 0) as used,
      sum(l.minutes) as balance
    from lines l
    group by l.student_id
  ),
  debt as (
    select r.student_id, coalesce(max(r.seq) filter (where r.balance >= 0), 0) + 1 as seq
    from running r
    group by r.student_id
  )
  select
    p.id,
    coalesce(t.credited, 0),
    coalesce(t.used, 0),
    coalesce(t.balance, 0),
    coalesce((
      select jsonb_agg(
        jsonb_build_object('from', pay.covers_from, 'to', pay.covers_to, 'scope', pay.covers_scope)
        order by pay.covers_from, pay.covers_to
      )
      from public.payments pay
      where pay.student_id = p.id
        and pay.voided_at is null
        and pay.covers_to >= (now() at time zone 'Africa/Casablanca')::date
    ), '[]'::jsonb),
    (select max(pay.covers_to) from public.payments pay
     where pay.student_id = p.id and pay.voided_at is null),
    (select max(pay.paid_on) from public.payments pay
     where pay.student_id = p.id and pay.voided_at is null),
    case when coalesce(t.balance, 0) < 0 then
      (select r.at from running r join debt d on d.student_id = r.student_id and d.seq = r.seq
       where r.student_id = p.id)
    end
  from students
  join public.profiles p on p.id = any (students.ids)
  left join totals t on t.student_id = p.id;
$function$;

-- One account line by line, newest first, with the balance after each: numbered in the
-- order they are added up, and shown in exactly the reverse.
create function public.account_statement(p_student_id uuid)
returns table (
  seq bigint,
  at timestamptz,
  minutes numeric,
  balance_minutes numeric,
  session_id uuid,
  payment_id uuid,
  covered boolean
)
language sql
stable
security definer
set search_path = ''
as $function$
  select *
  from (
    select
      row_number() over w as seq,
      l.at,
      l.minutes,
      sum(l.minutes) over (w rows between unbounded preceding and current row) as balance_minutes,
      l.session_id,
      l.payment_id,
      l.covered
    from private.account_lines(array[p_student_id]) l
    window w as (order by l.at, l.minutes desc, l.session_id, l.payment_id)
  ) lines
  order by lines.seq desc;
$function$;

revoke execute on function public.student_accounts(uuid) from public, anon;
grant execute on function public.student_accounts(uuid) to authenticated;
revoke execute on function public.account_statement(uuid) from public, anon;
grant execute on function public.account_statement(uuid) to authenticated;

-- ─────────────────────────────────────────────────────────────── tests

-- For the RLS tests only, with the secret key: removes the payments they made (labelled
-- « Test RLS ») and gives their numbers back, under the counter's lock, so a payment
-- recorded meanwhile keeps its number and the next one follows it.
create function public.remove_test_payments(p_ids uuid[])
returns integer
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_removed integer;
begin
  perform 1 from public.receipt_counters for update;
  delete from public.payments
  where id = any (p_ids) and label like 'Test RLS%';
  get diagnostics v_removed = row_count;

  update public.receipt_counters c
  set last = m.last
  from (
    select c2.year,
      (select max(split_part(p.receipt_number, '-', 2)::integer)
       from public.payments p
       where p.receipt_number like c2.year::text || '-%') as last
    from public.receipt_counters c2
  ) m
  where m.year = c.year and m.last is not null;
  delete from public.receipt_counters c
  where not exists (
    select 1 from public.payments p where p.receipt_number like c.year::text || '-%'
  );
  return v_removed;
end;
$function$;

revoke execute on function public.remove_test_payments(uuid[]) from public, anon, authenticated;
grant execute on function public.remove_test_payments(uuid[]) to service_role;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
