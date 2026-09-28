import "server-only";
import type { createClient } from "@/lib/supabase/server";
import type { PaymentMethod } from "./queries";

// How a payment enters the books (DECISIONS.md, D-087). Today the tutor records by hand what
// she received. A gateway (CMI, YouCan Pay, PayZone) would be another provider: it would
// start a checkout, and its webhook, once the gateway confirms, would record the payment
// through the same database function, so numbering, receipts and balances stay one path.

type Client = Awaited<ReturnType<typeof createClient>>;

export type PaymentInput = {
  studentId: string;
  amountMad: string;
  method: PaymentMethod;
  paidOn: string;
  planId: string | null;
  coversFrom: string | null;
  label: string | null;
  hours: string | null;
  note: string | null;
};

/** Why the database refused a payment: each has its own sentence on the form. */
export type RecordError =
  | "not_tutor"
  | "student_not_found"
  | "amount_invalid"
  | "date_invalid"
  | "plan_invalid"
  | "covers_from_required"
  | "label_invalid"
  | "hours_invalid"
  | "unknown";

const KNOWN: RecordError[] = [
  "not_tutor",
  "student_not_found",
  "amount_invalid",
  "date_invalid",
  "plan_invalid",
  "covers_from_required",
  "label_invalid",
  "hours_invalid",
];

export type RecordResult =
  { ok: true; id: string; receiptNumber: string } | { ok: false; error: RecordError };

export interface PaymentProvider {
  readonly id: "manual";
  record(client: Client, input: PaymentInput): Promise<RecordResult>;
}

/** Money she received in person or by transfer, recorded under her own session. */
export const manualPayments: PaymentProvider = {
  id: "manual",
  async record(client, input) {
    const { data, error } = await client.rpc("record_payment", {
      p_student_id: input.studentId,
      // numeric travels as text, so « 1500.10 » arrives exactly (D-044).
      p_amount_mad: input.amountMad as unknown as number,
      p_method: input.method,
      p_paid_on: input.paidOn,
      ...(input.planId ? { p_plan_id: input.planId } : {}),
      ...(input.coversFrom ? { p_covers_from: input.coversFrom } : {}),
      ...(input.label ? { p_label: input.label } : {}),
      ...(input.hours ? { p_hours: input.hours as unknown as number } : {}),
      ...(input.note ? { p_note: input.note } : {}),
    });
    if (error) {
      const known = KNOWN.find((code) => error.message === code);
      return { ok: false, error: known ?? "unknown" };
    }
    const row = data[0];
    return row
      ? { ok: true, id: row.id, receiptNumber: row.receipt_number }
      : { ok: false, error: "unknown" };
  },
};
