-- Payments: tracking, not processing (DECISIONS.md, D-087).
--
-- The tutor sells hour packs and subscriptions, priced in MAD, and records each payment by
-- hand: cash, transfer, cheque or money transfer. A payment is a receipt: numbered in order,
-- never changed, never deleted; a mistake is voided with a reason and recorded again.
--
-- The balance counts hours. A pack credits its hours; a subscription covers a period, for the
-- student's group sessions, individual sessions or both. Each session she took that no
-- subscription covers uses its length: an individual session done or missed without
-- cancelling, a group session she attended or missed (excused costs nothing). Below zero she
-- owes hours, and the account is late from the session that took it below zero.

create type public.plan_kind as enum ('hour_pack', 'subscription');
create type public.plan_scope as enum ('tous', 'individuel', 'groupe');
create type public.payment_method as enum ('especes', 'virement', 'cheque', 'transfert');

-- ─────────────────────────────────────────────────────────────── plans

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  kind public.plan_kind not null,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  -- A pack: the hours it credits.
  hours numeric(6, 2) check (hours > 0 and hours <= 500),
  -- A subscription: how many months it covers, and which sessions.
  period_months smallint check (period_months between 1 and 12),
  scope public.plan_scope not null default 'tous',
  price_mad numeric(10, 2) not null check (price_mad >= 0 and price_mad <= 99999999.99),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (kind = 'hour_pack' and hours is not null and period_months is null and scope = 'tous')
    or (kind = 'subscription' and hours is null and period_months is not null)
  )
);

create trigger plans_set_updated_at
  before update on public.plans
  for each row execute function private.set_updated_at();

alter table public.plans enable row level security;

-- Plans on offer are public: the site shows her prices. Withdrawn ones are hers only.
create policy "plans: select offered or tutor"
  on public.plans for select to anon, authenticated
  using (is_active or (select private.is_tutor()));

create policy "plans: insert tutor"
  on public.plans for insert to authenticated
  with check ((select private.is_tutor()));

create policy "plans: update tutor"
  on public.plans for update to authenticated
  using ((select private.is_tutor()))
  with check ((select private.is_tutor()));

-- No delete: payments name the plan they bought. She withdraws a plan instead.

-- ─────────────────────────────────────────────────────────────── payments

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  -- « 2026-0007 »: the year it was recorded, then its rank in that year.
  receipt_number text not null unique check (receipt_number ~ '^\d{4}-\d{4,}$'),
  -- A payment outlives nothing it proves: a student with payments cannot be deleted.
  student_id uuid not null references public.profiles (id) on delete restrict,
  plan_id uuid references public.plans (id) on delete set null,
  -- What was bought, as the receipt says it: the plan's name at the time, or her own words.
  label text not null check (char_length(btrim(label)) between 1 and 120),
  amount_mad numeric(10, 2) not null check (amount_mad > 0 and amount_mad <= 99999999.99),
  method public.payment_method not null,
  paid_on date not null check (paid_on >= date '2020-01-01'),
  hours_credited numeric(6, 2) not null default 0 check (hours_credited between 0 and 500),
  covers_from date,
  covers_to date,
  covers_scope public.plan_scope,
  note text check (char_length(note) <= 500),
  created_at timestamptz not null default now(),
  voided_at timestamptz,
  void_reason text check (char_length(btrim(void_reason)) between 1 and 300),
  check ((covers_from is null) = (covers_to is null) and (covers_from is null) = (covers_scope is null)),
  check (covers_to >= covers_from),
  check ((voided_at is null) = (void_reason is null))
);

create index payments_student_paid_idx on public.payments (student_id, paid_on desc);
create index payments_plan_id_idx on public.payments (plan_id);

alter table public.payments enable row level security;

-- Nobody writes a payment directly: record_payment numbers it, void_payment voids it.
create policy "payments: select own or tutor"
  on public.payments for select to authenticated
  using ((select private.is_tutor()) or student_id = (select auth.uid()));

create table public.receipt_counters (
  year smallint primary key,
  last integer not null check (last > 0)
);

alter table public.receipt_counters enable row level security;
-- No policy: only record_payment, as its owner, reads and writes it.

-- ─────────────────────────────────────────────────────────────── recording

create function public.record_payment(
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
      if p_covers_from is null then
        raise exception 'covers_from_required' using errcode = 'P0001';
      end if;
      v_from := p_covers_from;
      v_to := (p_covers_from + make_interval(months => v_plan.period_months) - interval '1 day')::date;
      v_scope := v_plan.scope;
    end if;
  else
    -- A payment of her own: what it is for in her words, and the hours it credits, if any.
    v_label := nullif(btrim(coalesce(p_label, '')), '');
    if v_label is null or char_length(v_label) > 120 then
      raise exception 'label_invalid' using errcode = 'P0001';
    end if;
    v_hours := coalesce(p_hours, 0);
    if v_hours < 0 or v_hours > 500 or v_hours <> round(v_hours, 2) then
      raise exception 'hours_invalid' using errcode = 'P0001';
    end if;
  end if;

  -- Numbered in the order they are recorded, one series a year, never a gap nor a repeat.
  insert into public.receipt_counters as c (year, last)
  values (v_year, 1)
  on conflict (year) do update set last = c.last + 1
  returning c.last into v_rank;
  v_number := v_year::text || '-' || lpad(v_rank::text, 4, '0');

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

-- A payment recorded by mistake stays, with its number, marked void and why.
create function public.void_payment(p_payment_id uuid, p_reason text)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if not (select private.is_tutor()) then
    raise exception 'not_tutor' using errcode = '42501';
  end if;
  if char_length(btrim(coalesce(p_reason, ''))) not between 1 and 300 then
    raise exception 'reason_invalid' using errcode = 'P0001';
  end if;
  update public.payments
  set voided_at = now(), void_reason = btrim(p_reason)
  where id = p_payment_id and voided_at is null;
  if not found then
    raise exception 'payment_not_found' using errcode = 'P0002';
  end if;
end;
$function$;

-- ─────────────────────────────────────────────────────────────── balances

-- Whose account the caller may read: the tutor's, or her own.
create function private.can_see_account(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select (select private.is_tutor()) or p_student_id = (select auth.uid());
$function$;

-- Every line of the students' accounts: payments credit their hours, sessions use theirs
-- unless a subscription covers them (then they use nothing, and say so).
create function private.account_lines(p_student_ids uuid[])
returns table (
  student_id uuid,
  at timestamptz,
  delta numeric,
  session_id uuid,
  payment_id uuid,
  covered boolean
)
language sql
stable
security definer
set search_path = ''
as $function$
  with charged as (
    -- Her own sessions, done, or missed without cancelling.
    select s.student_id, s.id as session_id, s.starts_at, s.ends_at,
      'individuel'::public.plan_scope as scope
    from public.sessions s
    where s.student_id = any (p_student_ids)
      and s.group_id is null
      and s.status in ('terminee', 'absent')
    union all
    -- Her group's sessions, attended or missed; excused costs nothing.
    select a.student_id, s.id, s.starts_at, s.ends_at, 'groupe'::public.plan_scope
    from public.session_attendance a
    join public.sessions s on s.id = a.session_id
    where a.student_id = any (p_student_ids)
      and s.status = 'terminee'
      and a.status in ('present', 'absent')
  )
  select
    c.student_id,
    c.starts_at,
    case
      when cover.covered then 0::numeric
      else -round(extract(epoch from (c.ends_at - c.starts_at)) / 3600, 2)
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
  -- A payment counts from the start of the day it was paid, before that day's sessions.
  select
    p.student_id,
    (p.paid_on::timestamp at time zone 'Africa/Casablanca'),
    p.hours_credited,
    null::uuid,
    p.id,
    false
  from public.payments p
  where p.student_id = any (p_student_ids)
    and p.voided_at is null;
$function$;

-- Each account the caller may read (all of them for the tutor, her own for a student): hours
-- credited and used, the balance, the last day a subscription covers, and since when she has
-- owed hours, if she does.
create function public.student_accounts(p_student_id uuid default null)
returns table (
  student_id uuid,
  credited numeric,
  used numeric,
  balance numeric,
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
      sum(l.delta) over (w rows between unbounded preceding and current row) as balance
    from lines l
    window w as (partition by l.student_id order by l.at, l.delta desc, l.session_id, l.payment_id)
  ),
  totals as (
    select
      l.student_id,
      sum(l.delta) filter (where l.delta > 0) as credited,
      -sum(l.delta) filter (where l.delta < 0) as used,
      sum(l.delta) as balance
    from lines l
    group by l.student_id
  ),
  -- The debt runs from the first line after the last one that left her at or above zero.
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

-- One account line by line, newest first, with the balance after each.
create function public.account_statement(p_student_id uuid)
returns table (
  at timestamptz,
  delta numeric,
  balance numeric,
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
      l.at,
      l.delta,
      sum(l.delta) over (
        order by l.at, l.delta desc, l.session_id, l.payment_id
        rows between unbounded preceding and current row
      ) as balance,
      l.session_id,
      l.payment_id,
      l.covered
    from private.account_lines(array[p_student_id]) l
    where (select private.can_see_account(p_student_id))
  ) lines
  order by lines.at desc, lines.delta, lines.session_id, lines.payment_id;
$function$;

revoke execute on function public.record_payment(uuid, numeric, public.payment_method, date, uuid, date, text, numeric, text) from public, anon;
grant execute on function public.record_payment(uuid, numeric, public.payment_method, date, uuid, date, text, numeric, text) to authenticated;
revoke execute on function public.void_payment(uuid, text) from public, anon;
grant execute on function public.void_payment(uuid, text) to authenticated;
revoke execute on function public.student_accounts(uuid) from public, anon;
grant execute on function public.student_accounts(uuid) to authenticated;
revoke execute on function public.account_statement(uuid) from public, anon;
grant execute on function public.account_statement(uuid) to authenticated;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
