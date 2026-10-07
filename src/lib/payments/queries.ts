import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/types/database";

/** PostgREST's max_rows: a longer answer is cut there without a word. */
const PAGE = 1000;

// Plans, payments and balances (DECISIONS.md, D-087, D-088), read through the viewer's own
// session: the tutor reads every account, a student her own. The balance is computed by the
// database (public.student_accounts), in exact minutes, never here, so every screen agrees;
// hours are only how it is shown.

export type PlanKind = Database["public"]["Enums"]["plan_kind"];
export type PlanScope = Database["public"]["Enums"]["plan_scope"];
export type PaymentMethod = Database["public"]["Enums"]["payment_method"];

export const PAYMENT_METHODS: PaymentMethod[] = ["especes", "virement", "cheque", "transfert"];

export type Plan = {
  id: string;
  kind: PlanKind;
  name: string;
  hours: number | null;
  periodMonths: number | null;
  scope: PlanScope;
  priceMad: number;
  isActive: boolean;
};

/** A subscription still running or to come: its days (`yyyy-MM-dd`) and what it covers. */
export type Coverage = { from: string; to: string; scope: PlanScope };

export type Account = {
  studentId: string;
  /** In hours, to show: the database counts minutes, exactly. */
  balance: number;
  /** She owes time: decided on the exact minutes, never on a rounded figure. */
  owes: boolean;
  coverage: Coverage[];
  /** The last day any subscription covered, `yyyy-MM-dd`, even one long over. */
  coveredUntil: string | null;
  lastPaidOn: string | null;
  /** The session that took her below zero, when she owes time. */
  overdueSince: string | null;
};

export type Payment = {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  /** Who usually pays: the parent named on her file, if any. */
  guardianName: string | null;
  label: string;
  amountMad: number;
  method: PaymentMethod;
  paidOn: string;
  hoursCredited: number;
  coversFrom: string | null;
  coversTo: string | null;
  coversScope: PlanScope | null;
  note: string | null;
  createdAt: string;
  voidedAt: string | null;
  voidReason: string | null;
};

export type StatementLine = {
  at: string;
  /** Hours this line adds or takes, and the balance after it, to show. */
  delta: number;
  balance: number;
  covered: boolean;
  session: { id: string; label: string; group: string | null } | null;
  payment: { id: string; label: string; receiptNumber: string } | null;
};

const PAYMENT_FIELDS =
  "id, receipt_number, student_id, label, amount_mad, method, paid_on, hours_credited, covers_from, covers_to, covers_scope, note, created_at, voided_at, void_reason, student:profiles!payments_student_id_fkey(full_name, guardian_name)" as const;

type PaymentRow = {
  id: string;
  receipt_number: string;
  student_id: string;
  label: string;
  amount_mad: number;
  method: PaymentMethod;
  paid_on: string;
  hours_credited: number;
  covers_from: string | null;
  covers_to: string | null;
  covers_scope: PlanScope | null;
  note: string | null;
  created_at: string;
  voided_at: string | null;
  void_reason: string | null;
  student: { full_name: string; guardian_name: string | null } | null;
};

function toPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    receiptNumber: row.receipt_number,
    studentId: row.student_id,
    studentName: row.student?.full_name ?? "",
    guardianName: row.student?.guardian_name ?? null,
    label: row.label,
    amountMad: Number(row.amount_mad),
    method: row.method,
    paidOn: row.paid_on,
    hoursCredited: Number(row.hours_credited),
    coversFrom: row.covers_from,
    coversTo: row.covers_to,
    coversScope: row.covers_scope,
    note: row.note,
    createdAt: row.created_at,
    voidedAt: row.voided_at,
    voidReason: row.void_reason,
  };
}

export async function listPlans({ offeredOnly = false } = {}): Promise<Plan[]> {
  const supabase = await createClient();
  let query = supabase
    .from("plans")
    .select("id, kind, name, hours, period_months, scope, price_mad, is_active")
    .order("kind")
    .order("price_mad")
    .order("name");
  if (offeredOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw new Error("Could not read the plans", { cause: error });
  return data.map((row) => ({
    id: row.id,
    kind: row.kind,
    name: row.name,
    hours: row.hours === null ? null : Number(row.hours),
    periodMonths: row.period_months,
    scope: row.scope,
    priceMad: Number(row.price_mad),
    isActive: row.is_active,
  }));
}

function toCoverage(value: Json): Coverage[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
    const { from, to, scope } = entry as Record<string, Json | undefined>;
    return typeof from === "string" &&
      typeof to === "string" &&
      (scope === "tous" || scope === "individuel" || scope === "groupe")
      ? [{ from, to, scope }]
      : [];
  });
}

/** The accounts the viewer may read, by student. One student's when an id is given. */
export async function getAccounts(studentId?: string): Promise<Map<string, Account>> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "student_accounts",
    studentId ? { p_student_id: studentId } : {},
  );
  if (error) throw new Error("Could not read the accounts", { cause: error });
  return new Map(
    data.map((row) => [
      row.student_id,
      {
        studentId: row.student_id,
        balance: Number(row.balance_minutes) / 60,
        owes: Number(row.balance_minutes) < 0,
        coverage: toCoverage(row.coverage),
        coveredUntil: row.covered_until ?? null,
        lastPaidOn: row.last_paid_on ?? null,
        overdueSince: row.overdue_since ?? null,
      },
    ]),
  );
}

export async function listPayments({
  studentId,
  limit,
}: { studentId?: string; limit?: number } = {}): Promise<Payment[]> {
  const supabase = await createClient();
  let query = supabase
    .from("payments")
    .select(PAYMENT_FIELDS)
    .order("created_at", { ascending: false })
    .order("id");
  if (studentId) query = query.eq("student_id", studentId);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw new Error("Could not read the payments", { cause: error });
  return data.map(toPayment);
}

/** One payment, if the viewer may read it: the policy decides, someone else's is not found. */
export async function getPayment(id: string): Promise<Payment | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payments")
    .select(PAYMENT_FIELDS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Could not read the payment", { cause: error });
  return data ? toPayment(data) : null;
}

/** An account line by line, newest first, with what each line was. */
export async function getStatement(
  studentId: string,
  payments: Payment[],
): Promise<StatementLine[]> {
  const supabase = await createClient();
  // PostgREST answers 1000 rows at most: a long account comes in pages.
  const data: Database["public"]["Functions"]["account_statement"]["Returns"] = [];
  for (let from = 0; ; from += PAGE) {
    const { data: page, error } = await supabase
      .rpc("account_statement", { p_student_id: studentId })
      .range(from, from + PAGE - 1);
    if (error) throw new Error("Could not read the statement", { cause: error });
    data.push(...page);
    if (page.length < PAGE) break;
  }

  const byId = new Map(payments.map((payment) => [payment.id, payment]));

  return data.map((line) => {
    const payment = line.payment_id ? byId.get(line.payment_id) : undefined;
    return {
      at: line.at,
      delta: Number(line.minutes) / 60,
      balance: Number(line.balance_minutes) / 60,
      covered: line.covered,
      // The database names each line (D-091): a parent cannot read the sessions, nor a
      // student a group's once she has left it.
      session: line.session_id ? { id: line.session_id, label: line.label, group: null } : null,
      payment: payment
        ? { id: payment.id, label: payment.label, receiptNumber: payment.receiptNumber }
        : null,
    };
  });
}

export type MonthIncome = { month: string; total: number; count: number };

/**
 * Money received per month (`yyyy-MM`, by the day it was paid), over the last `months` months
 * up to the one `today` falls in. Voided payments are left out: they were never received.
 */
export async function monthlyIncome(today: string, months = 6): Promise<MonthIncome[]> {
  const [year = 2000, month = 1] = today.split("-").map(Number);
  const keys = Array.from({ length: months }, (_, index) =>
    new Date(Date.UTC(year, month - 1 - (months - 1 - index), 1)).toISOString().slice(0, 7),
  );
  const supabase = await createClient();
  const totals = new Map(keys.map((key) => [key, { month: key, total: 0, count: 0 }]));
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("payments")
      .select("paid_on, amount_mad")
      .is("voided_at", null)
      .gte("paid_on", `${keys[0]}-01`)
      .order("paid_on")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error("Could not read the income", { cause: error });
    for (const row of data) {
      const entry = totals.get(row.paid_on.slice(0, 7));
      if (!entry) continue;
      entry.total += Number(row.amount_mad);
      entry.count += 1;
    }
    if (data.length < PAGE) break;
  }
  return keys.map((key) => totals.get(key)!);
}
