import { Check, FileDown, TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { localDateKey } from "@/lib/dates";
import { daysBetween, formatDate, formatDay, formatHours, formatMad } from "@/lib/payments/format";
import type { Account, Payment, StatementLine } from "@/lib/payments/queries";
import { cn } from "@/lib/utils";

/** Statement lines shown before « voir plus »: the latest ones matter most. */
const RECENT = 10;

/** How late an account is, in days, or null when it owes nothing. */
export function overdueDays(account: Account | undefined, today: string): number | null {
  if (!account?.owes || !account.overdueSince) return null;
  return Math.max(0, daysBetween(localDateKey(account.overdueSince), today));
}

/** ✓ À jour, or △ En retard de n jours: a shape and words, never colour alone (DESIGN.md). */
export async function AccountStatusChip({ days }: { days: number | null }) {
  const t = await getTranslations("payments");
  return days === null ? (
    <span className="inline-flex items-center gap-1 rounded-sm border border-quadrillage px-1.5 py-0.5 text-xs font-medium">
      <Check aria-hidden="true" className="size-3.5" />
      {t("upToDate")}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-sm border border-stylo-rouge/40 bg-lavis-rouge px-1.5 py-0.5 text-xs font-medium text-stylo-rouge">
      <TriangleAlert aria-hidden="true" className="size-3.5" />
      {t("overdue", { days })}
    </span>
  );
}

export function ReceiptLink({ payment, label }: { payment: Payment; label: string }) {
  return (
    // A file, not a page: a plain link, which opens it in the browser's viewer.
    <a
      href={`/recus/${payment.id}`}
      className="inline-flex min-h-11 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
    >
      <FileDown aria-hidden="true" className="size-4" />
      {label}
    </a>
  );
}

/**
 * An account as the tutor and its student read it: the balance, the subscriptions, the
 * statement line by line, and each payment with its receipt. The tutor sees arrears in red
 * pen, with how many days late, and gets the actions. A student reads the same figures in
 * ink, without the count of days: money is her parents' business with the tutor (D-088).
 */
export async function AccountPanel({
  account,
  payments,
  statement,
  today,
  audience,
  actions,
  voidForm,
}: {
  account: Account | undefined;
  payments: Payment[];
  statement: StatementLine[];
  today: string;
  /** A parent reads it as the tutor does, without the actions (D-091). */
  audience: "tutor" | "student" | "parent";
  /** Shown beside the summary: « Enregistrer un paiement », for the tutor. */
  actions?: ReactNode;
  /** For the tutor: how to void each payment still standing. */
  voidForm?: (payment: Payment) => ReactNode;
}) {
  const [t, tPayments, tMethod] = await Promise.all([
    getTranslations("account"),
    getTranslations("payments"),
    getTranslations("payments.method"),
  ]);
  const balance = account?.balance ?? 0;
  const owes = account?.owes ?? false;
  const tutor = audience !== "student";
  const coverage = account?.coverage ?? [];

  const coverLines = coverage.map((cover) => {
    const scope = t(`coverScope.${cover.scope}`);
    return cover.from <= today
      ? t("coveringUntil", { scope, to: formatDay(cover.to) })
      : t("coveringFrom", { scope, from: formatDay(cover.from), to: formatDay(cover.to) });
  });
  const summary = [
    ...coverLines,
    coverage.length === 0 && account?.coveredUntil
      ? t("coverEnded", { date: formatDay(account.coveredUntil) })
      : null,
    account?.lastPaidOn ? t("lastPaid", { date: formatDay(account.lastPaidOn) }) : t("neverPaid"),
  ].filter(Boolean);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-quadrillage bg-surface p-4 sm:p-5">
        <dl className="grid gap-1">
          <dt className="text-sm text-encre-douce">{t("balance")}</dt>
          <dd
            className={cn(
              "text-3xl font-semibold tabular [font-variation-settings:'HEXP'_45]",
              tutor && owes && "text-stylo-rouge",
            )}
          >
            {formatHours(balance)}
          </dd>
          <dd>
            {tutor ? (
              <AccountStatusChip days={overdueDays(account, today)} />
            ) : owes ? (
              <span className="inline-flex items-center gap-1 rounded-sm border border-trait px-1.5 py-0.5 text-xs font-medium">
                <TriangleAlert aria-hidden="true" className="size-3.5" />
                {t("toSettle", { hours: formatHours(-balance) })}
              </span>
            ) : (
              <AccountStatusChip days={null} />
            )}
          </dd>
          {summary.map((line) => (
            <dd key={line} className="text-sm text-encre-douce">
              {line}
            </dd>
          ))}
        </dl>
        {actions}
      </div>

      <section aria-labelledby="account-statement" className="grid gap-2">
        <h3 id="account-statement" className="text-sm font-semibold text-encre-douce">
          {t("statementHeading")}
        </h3>
        {statement.length === 0 ? (
          <p className="text-sm text-encre-douce">{t("statementEmpty")}</p>
        ) : (
          <Folded
            more={(count) => t("olderLines", { count })}
            items={statement.map((line, index) => (
              <li
                key={`${line.session?.id ?? line.payment?.id ?? ""}-${index}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-0.5 bg-surface px-4 py-2.5 text-sm"
              >
                <span className="min-w-0 break-words">
                  <span className="text-encre-douce tabular">
                    {formatDate(line.at, "d MMM yyyy")}
                  </span>{" "}
                  {line.payment
                    ? t("paymentLine", { label: line.payment.label })
                    : t("sessionLine", {
                        label: line.session?.group ?? line.session?.label ?? "",
                      })}
                  {line.covered ? (
                    <span className="text-encre-douce"> · {t("covered")}</span>
                  ) : null}
                </span>
                <span className="text-end font-medium tabular">
                  {line.covered ? (
                    <>
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">{t("coveredZero")}</span>
                    </>
                  ) : (
                    formatHours(line.delta, { signed: true })
                  )}
                </span>
                <span className="col-start-2 text-end text-xs text-encre-douce tabular">
                  {t("balanceAfter", { balance: formatHours(line.balance) })}
                </span>
              </li>
            ))}
          />
        )}
      </section>

      <section aria-labelledby="account-payments" className="grid gap-2">
        <h3 id="account-payments" className="text-sm font-semibold text-encre-douce">
          {t("paymentsHeading")}
        </h3>
        {payments.length === 0 ? (
          <p className="text-sm text-encre-douce">{t("noPayments")}</p>
        ) : (
          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
          >
            {payments.map((payment) => (
              <li key={payment.id} className="grid gap-1 bg-surface px-4 py-3">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span
                    className={cn(
                      "min-w-0 font-medium break-words",
                      payment.voidedAt && "line-through",
                    )}
                  >
                    {payment.label}
                  </span>
                  <span
                    className={cn(
                      "font-semibold tabular",
                      payment.voidedAt && "font-normal text-encre-douce line-through",
                    )}
                  >
                    {formatMad(payment.amountMad)}
                  </span>
                </p>
                <p className="text-sm text-encre-douce">
                  {[
                    formatDay(payment.paidOn),
                    tMethod(payment.method),
                    payment.hoursCredited > 0
                      ? formatHours(payment.hoursCredited, { signed: true })
                      : null,
                    payment.coversFrom && payment.coversTo
                      ? `${formatDay(payment.coversFrom)} – ${formatDay(payment.coversTo)}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {payment.voidedAt ? (
                  <p className="flex items-start gap-1.5 text-sm text-stylo-rouge">
                    <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      <span className="font-medium">{tPayments("voided")}</span>{" "}
                      {t("voidedOn", {
                        date: formatDate(payment.voidedAt),
                        reason: payment.voidReason ?? "",
                      })}
                    </span>
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-x-5">
                  <ReceiptLink
                    payment={payment}
                    label={tPayments("receiptLink", { number: payment.receiptNumber })}
                  />
                </div>
                {!payment.voidedAt && voidForm ? voidForm(payment) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Folded({ items, more }: { items: ReactNode[]; more: (hidden: number) => string }) {
  const list = "grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage";
  return (
    <div className="grid gap-2">
      <ul className={list} role="list">
        {items.slice(0, RECENT)}
      </ul>
      {items.length > RECENT ? (
        <details className="grid gap-2">
          <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4">
            {more(items.length - RECENT)}
          </summary>
          <ul className={`${list} mt-2`} role="list">
            {items.slice(RECENT)}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
