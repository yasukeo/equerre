"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { FORM_WITH_PREVIEW, FormPreview } from "@/components/shell/form-preview";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextareaField } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { formatDecimal, parseDecimal } from "@/lib/decimal";
import { fieldError } from "@/lib/form-state";
import { MAX_PAYMENT_LABEL_LENGTH, MAX_PAYMENT_NOTE_LENGTH } from "@/lib/payments/limits";
import { coverageEnd, formatDay, formatHours, nextDay } from "@/lib/payments/format";
import type { Coverage, PaymentMethod, Plan } from "@/lib/payments/queries";
import { sendFields, useFormAction } from "@/lib/use-form-action";
import { recordPayment } from "../actions";

export type StudentChoice = {
  id: string;
  label: string;
  /** In hours, to show. */
  balance: number;
  /** Her subscriptions still running or to come. */
  coverage: Coverage[];
};

/** The plan select's choice for a payment without a plan (the action knows it too). */
const OTHER = "autre";

/**
 * Where a new subscription starts by default: the day after the one covering the same
 * sessions ends; otherwise the first of this month, or of the next once the month is well
 * under way (from the 20th), when a parent is paying for the month to come.
 */
function defaultStart(student: StudentChoice | undefined, plan: Plan, today: string): string {
  const overlapping = (student?.coverage ?? []).filter(
    (cover) => plan.scope === "tous" || cover.scope === "tous" || cover.scope === plan.scope,
  );
  const end = overlapping.reduce<string | null>(
    (latest, cover) => (latest === null || cover.to > latest ? cover.to : latest),
    null,
  );
  if (end) return nextDay(end);
  const [year = 2026, month = 1, day = 1] = today.split("-").map(Number);
  if (day < 20) return `${today.slice(0, 8)}01`;
  const next = new Date(Date.UTC(year, month, 1));
  return next.toISOString().slice(0, 10);
}

/** The hours a pack or a payment of her own credits, as typed: null when it credits none. */
function creditedHours(plan: Plan | undefined, other: boolean, typed: string): number | null {
  if (plan?.kind === "hour_pack") return plan.hours;
  if (!other) return null;
  const hours = parseDecimal(typed);
  return hours === null ? null : Number(hours);
}

/**
 * A payment received: from which student, for which plan, how much and how; beside it, the
 * receipt it will print (D-108).
 */
export function PaymentForm({
  students,
  plans,
  methods,
  initialStudentId,
  today,
}: {
  students: StudentChoice[];
  plans: Plan[];
  methods: PaymentMethod[];
  initialStudentId: string;
  today: string;
}) {
  const t = useTranslations("recordPayment");
  const tMethod = useTranslations("payments.method");
  const tKind = useTranslations("payments.kind");
  const initialStudent = students.find((student) => student.id === initialStudentId);
  const [values, setValues] = useState({
    studentId: initialStudent?.id ?? "",
    planId: "",
    amount: "",
    method: "especes" as string,
    paidOn: today,
    coversFrom: "",
    label: "",
    hours: "",
    note: "",
  });
  // A start date she typed herself stays when she changes student or plan.
  const [startTyped, setStartTyped] = useState(false);
  const [state, action, pending] = useFormAction(recordPayment, t("errors.unknown"));
  const plan = plans.find((candidate) => candidate.id === values.planId);
  const student = students.find((candidate) => candidate.id === values.studentId);
  const set =
    (key: "amount" | "method" | "paidOn" | "label" | "hours" | "note") =>
    (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));
  const startFor = (nextStudent: StudentChoice | undefined, nextPlan: Plan | undefined) =>
    nextPlan?.kind === "subscription" ? defaultStart(nextStudent, nextPlan, today) : "";
  const other = values.planId === OTHER;
  const credited = creditedHours(plan, other, values.hours);

  return (
    <form
      className={FORM_WITH_PREVIEW}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendFields(action, values);
      }}
    >
      <div className="grid min-w-0 gap-5">
        <SelectField
          id="payment-student"
          label={t("student")}
          value={values.studentId}
          hint={student ? t("currentBalance", { hours: formatHours(student.balance) }) : undefined}
          onChange={(event) => {
            const chosen = students.find((candidate) => candidate.id === event.target.value);
            setValues((current) => ({
              ...current,
              studentId: event.target.value,
              coversFrom: startTyped ? current.coversFrom : startFor(chosen, plan),
            }));
          }}
          error={fieldError(state, "studentId")}
        >
          <option value="" disabled>
            {t("pickStudent")}
          </option>
          {students.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="payment-plan"
          label={t("plan")}
          value={values.planId}
          hint={plans.length === 0 ? t("noPlans") : undefined}
          onChange={(event) => {
            const chosen = plans.find((candidate) => candidate.id === event.target.value);
            setValues((current) => ({
              ...current,
              planId: event.target.value,
              // The plan's price, which she may lower; nothing for a payment of her own.
              amount: chosen ? formatDecimal(String(chosen.priceMad)) : "",
              coversFrom: startTyped ? current.coversFrom : startFor(student, chosen),
            }));
          }}
          error={fieldError(state, "planId")}
        >
          <option value="" disabled>
            {t("pickPlan")}
          </option>
          {plans.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {`${choice.name} · ${tKind(choice.kind)}`}
            </option>
          ))}
          <option value={OTHER}>{t("otherPlan")}</option>
        </SelectField>
        {plans.length === 0 ? (
          <Link
            href="/prof/paiements/formules"
            className="-mt-3 inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("createPlans")}
          </Link>
        ) : null}

        {values.planId === OTHER ? (
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_10rem] [&>*]:min-w-0">
            <Field
              id="payment-label"
              label={t("label")}
              hint={t("labelHint")}
              autoComplete="off"
              maxLength={MAX_PAYMENT_LABEL_LENGTH}
              value={values.label}
              onChange={set("label")}
              error={fieldError(state, "label")}
            />
            <Field
              id="payment-hours"
              label={t("hours")}
              hint={t("hoursHint")}
              inputMode="decimal"
              autoComplete="off"
              value={values.hours}
              onChange={set("hours")}
              error={fieldError(state, "hours")}
            />
          </div>
        ) : null}

        {plan?.kind === "subscription" ? (
          <Field
            id="payment-covers-from"
            type="date"
            label={t("coversFrom")}
            hint={
              values.coversFrom
                ? t("coversUntil", {
                    from: formatDay(values.coversFrom),
                    to: formatDay(coverageEnd(values.coversFrom, plan.periodMonths ?? 1)),
                  })
                : undefined
            }
            value={values.coversFrom}
            onChange={(event) => {
              setStartTyped(true);
              setValues((current) => ({ ...current, coversFrom: event.target.value }));
            }}
            error={fieldError(state, "coversFrom")}
          />
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
          <Field
            id="payment-amount"
            label={t("amount")}
            hint={plan ? t("amountHint") : undefined}
            inputMode="decimal"
            autoComplete="off"
            value={values.amount}
            onChange={set("amount")}
            error={fieldError(state, "amount")}
            className="sm:col-span-2"
          />
          <SelectField
            id="payment-method"
            label={t("method")}
            value={values.method}
            onChange={set("method")}
            error={fieldError(state, "method")}
          >
            {methods.map((method) => (
              <option key={method} value={method}>
                {tMethod(method)}
              </option>
            ))}
          </SelectField>
          <Field
            id="payment-paid-on"
            type="date"
            max={today}
            label={t("paidOn")}
            value={values.paidOn}
            onChange={set("paidOn")}
            error={fieldError(state, "paidOn")}
          />
        </div>

        <TextareaField
          id="payment-note"
          label={t("note")}
          hint={t("noteHint")}
          rows={2}
          maxLength={MAX_PAYMENT_NOTE_LENGTH}
          value={values.note}
          onChange={set("note")}
          error={fieldError(state, "note")}
        />
      </div>

      <FormPreview
        id="payment-preview"
        title={t("preview.title")}
        caption={t("preview.caption")}
        footer={
          <>
            <FormMessage state={state} />
            <Button type="submit" size="lg" disabled={pending} className="w-full">
              {pending ? t("submitting") : t("submit")}
            </Button>
          </>
        }
      >
        <ReceiptStub
          number={t("preview.number")}
          title={t("preview.receipt")}
          student={student?.label ?? t("preview.noStudent")}
          amount={values.amount.trim() ? `${values.amount.trim()} MAD` : "— MAD"}
          plan={
            plan
              ? `${plan.name} · ${tKind(plan.kind)}`
              : other
                ? values.label.trim() || t("otherPlan")
                : t("preview.noPlan")
          }
          rows={[
            ...(plan?.kind === "subscription" && values.coversFrom
              ? [
                  {
                    label: t("preview.covers"),
                    value: t("preview.coversValue", {
                      from: formatDay(values.coversFrom),
                      to: formatDay(coverageEnd(values.coversFrom, plan.periodMonths ?? 1)),
                    }),
                  },
                ]
              : []),
            ...(credited !== null && credited > 0
              ? [
                  {
                    label: t("preview.credits"),
                    value: student
                      ? t("preview.creditsValue", {
                          hours: formatHours(credited),
                          before: formatHours(student.balance),
                          after: formatHours(student.balance + credited),
                        })
                      : formatHours(credited),
                  },
                ]
              : []),
            { label: t("method"), value: tMethod(values.method as PaymentMethod) },
            {
              label: t("paidOn"),
              value: values.paidOn ? formatDay(values.paidOn) : "—",
            },
            ...(values.note.trim()
              ? [{ label: t("preview.note"), value: values.note.trim() }]
              : []),
          ]}
        />
      </FormPreview>
    </form>
  );
}

/**
 * The receipt as a stub from a receipt book: who paid, how much, for what, then its lines. The
 * perforation says it is the part that will be torn off and handed over; its number is given
 * only when it is recorded (D-087).
 */
function ReceiptStub({
  number,
  title,
  student,
  amount,
  plan,
  rows,
}: {
  number: string;
  title: string;
  student: string;
  amount: string;
  plan: string;
  rows: { label: string; value: ReactNode }[];
}) {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-encre bg-surface">
      <div className="grid gap-1 p-5">
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-xs font-semibold tracking-wide text-encre-douce uppercase">
          <span>{title}</span>
          <span className="font-normal tracking-normal normal-case">{number}</span>
        </p>
        <p className="text-lg leading-tight font-semibold break-words">{student}</p>
      </div>
      {/* The perforation: a dashed fold with a notch at each end. */}
      <div aria-hidden="true" className="relative h-0 border-t-2 border-dashed border-quadrillage">
        <span className="absolute -start-2.5 -top-2.5 size-5 rounded-full border border-encre bg-papier" />
        <span className="absolute -end-2.5 -top-2.5 size-5 rounded-full border border-encre bg-papier" />
      </div>
      <div className="grid gap-4 p-5">
        <div className="grid gap-0.5">
          <p className="text-3xl leading-none font-semibold tabular [font-variation-settings:'HEXP'_45]">
            {amount}
          </p>
          <p className="text-sm break-words text-encre-douce">{plan}</p>
        </div>
        <dl className="grid gap-2 text-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 border-t border-quadrillage pt-2"
            >
              <dt className="text-encre-douce">{row.label}</dt>
              <dd className="break-words">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
