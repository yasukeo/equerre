"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { parseDecimal } from "@/lib/decimal";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import {
  MAX_AMOUNT_DIGITS,
  MAX_HOURS,
  MAX_PAYMENT_LABEL_LENGTH,
  MAX_PAYMENT_NOTE_LENGTH,
  MAX_PERIOD_MONTHS,
  MAX_PLAN_NAME_LENGTH,
  MAX_VOID_REASON_LENGTH,
} from "@/lib/payments/limits";
import { manualPayments } from "@/lib/payments/provider";
import { isDateKey } from "@/lib/sessions/calendar-views";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type PlanRow = Database["public"]["Tables"]["plans"]["Insert"];

// Plans and payments (DECISIONS.md, D-087). Plans are written through the tutor's policies;
// a payment only through public.record_payment, which numbers its receipt, and is voided,
// never changed or deleted, through public.void_payment.

/** The plan select's choice for a payment of her own, without a plan. */
const OTHER = "autre";

/** A decimal typed in French, positive, with at most two decimals and `digits` before them. */
const decimal = (digits: number) =>
  z
    .string()
    .transform((value) => parseDecimal(value))
    .refine(
      (value): value is string =>
        value !== null && new RegExp(`^\\d{1,${digits}}(\\.\\d{1,2})?$`).test(value),
    );

const hoursValue = decimal(3).refine(
  (value) => Number(value) >= 0.25 && Number(value) <= MAX_HOURS,
);

const planSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("hour_pack"),
    name: z.string().trim().min(1).max(MAX_PLAN_NAME_LENGTH),
    price: decimal(MAX_AMOUNT_DIGITS),
    hours: hoursValue,
    isActive: z.enum(["true", "false"]).transform((value) => value === "true"),
  }),
  z.object({
    kind: z.literal("subscription"),
    name: z.string().trim().min(1).max(MAX_PLAN_NAME_LENGTH),
    price: decimal(MAX_AMOUNT_DIGITS),
    months: z.coerce.number().int().min(1).max(MAX_PERIOD_MONTHS),
    scope: z.enum(["tous", "individuel", "groupe"]),
    isActive: z.enum(["true", "false"]).transform((value) => value === "true"),
  }),
]);

async function readPlan(formData: FormData) {
  const [t, tForms] = await Promise.all([getTranslations("plans"), getTranslations("forms")]);
  const values = {
    kind: textField(formData, "kind"),
    name: textField(formData, "name"),
    price: textField(formData, "price"),
    hours: textField(formData, "hours"),
    months: textField(formData, "months"),
    scope: textField(formData, "scope") || "tous",
    isActive: textField(formData, "isActive") || "true",
  };
  const parsed = planSchema.safeParse({ ...values, months: values.months.trim() || "x" });
  if (!parsed.success) {
    return {
      ok: false as const,
      state: {
        status: "error",
        message: tForms("checkFields"),
        fieldErrors: fieldErrorsFor(parsed.error, {
          kind: t("errors.kind"),
          name: t("errors.name"),
          price: t("errors.price"),
          hours: t("errors.hours"),
          months: t("errors.months"),
          scope: t("errors.scope"),
        }),
        values,
      } satisfies FormState,
    };
  }
  const plan = parsed.data;
  // numeric travels as text, so « 1500,10 » arrives exactly (D-044).
  const row: PlanRow & { kind: PlanRow["kind"] } =
    plan.kind === "hour_pack"
      ? {
          kind: plan.kind,
          name: plan.name,
          price_mad: plan.price as unknown as number,
          hours: plan.hours as unknown as number,
          period_months: null,
          scope: "tous" as const,
          is_active: plan.isActive,
        }
      : {
          kind: plan.kind,
          name: plan.name,
          price_mad: plan.price as unknown as number,
          hours: null,
          period_months: plan.months,
          scope: plan.scope,
          is_active: plan.isActive,
        };
  return { ok: true as const, row, values, t };
}

export async function createPlan(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const read = await readPlan(formData);
  if (!read.ok) return read.state;
  const supabase = await createClient();
  const { error } = await supabase.from("plans").insert(read.row);
  if (error) return { status: "error", message: read.t("errors.unknown"), values: read.values };
  refresh();
  return { status: "success", message: read.t("created") };
}

export async function updatePlan(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const id = z.uuid().safeParse(textField(formData, "id"));
  const read = await readPlan(formData);
  if (!read.ok) return read.state;
  if (!id.success) return { status: "error", message: read.t("errors.gone"), values: read.values };

  const supabase = await createClient();
  // The kind is fixed once created: a pack never turns into a subscription under its payments.
  const { data, error } = await supabase
    .from("plans")
    .update(read.row)
    .eq("id", id.data)
    .eq("kind", read.row.kind)
    .select("id");
  if (error) return { status: "error", message: read.t("errors.unknown"), values: read.values };
  if (data.length === 0) {
    return { status: "error", message: read.t("errors.gone"), values: read.values };
  }
  refresh();
  return { status: "success", message: read.t("saved"), values: read.values };
}

const paymentSchema = z.object({
  studentId: z.uuid(),
  planId: z.union([z.literal(OTHER), z.uuid()]),
  amount: decimal(MAX_AMOUNT_DIGITS).refine((value) => Number(value) > 0),
  method: z.enum(["especes", "virement", "cheque", "transfert"]),
  paidOn: z.string().refine(isDateKey),
  coversFrom: z.union([z.literal(""), z.string().refine(isDateKey)]),
  note: z.string().trim().max(MAX_PAYMENT_NOTE_LENGTH),
});

/** What a payment without a plan says it is for, and the hours it settles. */
const otherSchema = z.object({
  label: z.string().trim().min(1).max(MAX_PAYMENT_LABEL_LENGTH),
  hours: z.union([
    z.literal(""),
    decimal(3).refine((value) => Number(value) >= 0 && Number(value) <= MAX_HOURS),
  ]),
});

export async function recordPayment(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("recordPayment"),
    getTranslations("forms"),
  ]);
  const values = {
    studentId: textField(formData, "studentId"),
    planId: textField(formData, "planId"),
    amount: textField(formData, "amount"),
    method: textField(formData, "method"),
    paidOn: textField(formData, "paidOn"),
    coversFrom: textField(formData, "coversFrom"),
    label: textField(formData, "label"),
    hours: textField(formData, "hours").trim(),
    note: textField(formData, "note"),
  };
  const messages = {
    studentId: t("errors.student"),
    planId: t("errors.plan"),
    amount: t("errors.amount"),
    method: t("errors.method"),
    paidOn: t("errors.paidOn"),
    coversFrom: t("errors.coversFrom"),
    label: t("errors.label"),
    hours: t("errors.hours"),
    note: t("errors.note"),
  };
  const parsed = paymentSchema.safeParse(values);
  const fail = (fieldErrors: Partial<Record<string, string>>): FormState => ({
    status: "error",
    message: tForms("checkFields"),
    fieldErrors,
    values,
  });
  // The label and hours are read only for a payment without a plan: with a plan, what she
  // may have typed in them before choosing it is not on screen, and does not count.
  const other = values.planId === OTHER ? otherSchema.safeParse(values) : null;
  if (!parsed.success || (other && !other.success)) {
    return fail({
      ...(parsed.success ? {} : fieldErrorsFor(parsed.error, messages)),
      ...(other && !other.success ? fieldErrorsFor(other.error, messages) : {}),
    });
  }
  const input = parsed.data;
  if (input.paidOn > localDateKey(new Date())) return fail({ paidOn: messages.paidOn });

  const supabase = await createClient();
  const withPlan = input.planId !== OTHER;
  const result = await manualPayments.record(supabase, {
    studentId: input.studentId,
    amountMad: input.amount,
    method: input.method,
    paidOn: input.paidOn,
    planId: withPlan ? input.planId : null,
    coversFrom: withPlan ? input.coversFrom || null : null,
    label: other?.success ? other.data.label : null,
    hours: other?.success ? other.data.hours || null : null,
    note: input.note || null,
  });
  if (!result.ok) {
    const field: Partial<Record<typeof result.error, keyof typeof messages>> = {
      student_not_found: "studentId",
      amount_invalid: "amount",
      date_invalid: "paidOn",
      plan_invalid: "planId",
      covers_from_required: "coversFrom",
      label_invalid: "label",
      hours_invalid: "hours",
    };
    const key = field[result.error];
    return key
      ? fail({ [key]: messages[key] })
      : { status: "error", message: t("errors.unknown"), values };
  }
  refresh();
  redirect(`/prof/eleves/${input.studentId}?paiement=${result.id}#paiements`);
}

export async function voidPayment(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("account");
  const id = z.uuid().safeParse(textField(formData, "id"));
  const reason = textField(formData, "reason").trim();
  if (!id.success) return { status: "error", message: t("errors.gone") };
  if (reason.length === 0 || reason.length > MAX_VOID_REASON_LENGTH) {
    return {
      status: "error",
      message: t("errors.reason"),
      fieldErrors: { reason: t("errors.reason") },
      values: { reason },
    };
  }
  const supabase = await createClient();
  const { data: payment } = await supabase
    .from("payments")
    .select("student_id")
    .eq("id", id.data)
    .maybeSingle();
  const { error } = await supabase.rpc("void_payment", { p_payment_id: id.data, p_reason: reason });
  if (error || !payment) {
    refresh();
    return {
      status: "error",
      message:
        error?.message === "payment_not_found" || !payment ? t("errors.gone") : t("errors.unknown"),
      values: { reason },
    };
  }
  // Back to the file, where a banner says it is done and takes the focus: the form that
  // was used is gone with the payment it voided.
  refresh();
  redirect(`/prof/eleves/${payment.student_id}?annule=${id.data}#paiements`);
}
