import { Tags, TriangleAlert, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { Initials } from "@/components/initials";
import { AccountStatusChip, overdueDays, ReceiptLink } from "@/components/payments/account-panel";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { formatLocal, localDateKey } from "@/lib/dates";
import { formatDay, formatHours, formatMad } from "@/lib/payments/format";
import { getAccounts, listPayments, monthlyIncome, type Payment } from "@/lib/payments/queries";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("paymentsHub");
  return { title: t("title") };
}

export default async function PaymentsPage() {
  const t = await getTranslations("paymentsHub");

  return (
    <div className="grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-6">
      <PageHeader
        title={t("title")}
        lead={t("lead")}
        actions={
          <>
            <Link
              href="/prof/paiements/formules"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Tags aria-hidden="true" />
              {t("plans")}
            </Link>
            <Link href="/prof/paiements/nouveau" className={buttonVariants()}>
              <Wallet aria-hidden="true" />
              {t("record")}
            </Link>
          </>
        }
      />
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Payments />
      </Suspense>
    </div>
  );
}

/** Payments listed on this page; the rest are on each student's file. */
const RECENT = 20;

/** A month key (`yyyy-MM`) read at mid-month, so no offset moves it. */
function month(key: string, pattern: string): string {
  return formatLocal(`${key}-15T12:00:00Z`, pattern);
}

async function Payments() {
  await requireViewer("tutor");
  const [t, tPayments, tMethod] = await Promise.all([
    getTranslations("paymentsHub"),
    getTranslations("payments"),
    getTranslations("payments.method"),
  ]);
  const today = localDateKey(new Date());
  const supabase = await createClient();
  const [accounts, payments, profiles, income] = await Promise.all([
    getAccounts(),
    listPayments({ limit: RECENT }),
    supabase.from("profiles").select("id, full_name, level_code").eq("role", "student"),
    monthlyIncome(today),
  ]);
  if (profiles.error) throw new Error("Could not read the students", { cause: profiles.error });
  const names = new Map(profiles.data.map((profile) => [profile.id, profile]));

  // The longest overdue first: the one she should call today.
  const overdue = [...accounts.values()]
    .map((account) => ({ account, days: overdueDays(account, today) }))
    .filter(
      (entry): entry is { account: typeof entry.account; days: number } => entry.days !== null,
    )
    .sort((a, b) => b.days - a.days || a.account.balance - b.account.balance);
  const owed = overdue.reduce((sum, entry) => sum + Math.max(-entry.account.balance, 0), 0);

  const thisMonth = income.at(-1);
  const lastMonth = income.at(-2);
  const highest = Math.max(...income.map((entry) => entry.total), 1);

  // The latest payments, by the month they were paid in.
  const byMonth = new Map<string, Payment[]>();
  const byDay = [...payments].sort(
    (a, b) => b.paidOn.localeCompare(a.paidOn) || Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
  for (const payment of byDay) {
    const key = payment.paidOn.slice(0, 7);
    byMonth.set(key, [...(byMonth.get(key) ?? []), payment]);
  }

  const stats = [
    {
      key: "this",
      value: formatMad(thisMonth?.total ?? 0),
      label: t("stats.thisMonth", { month: month(thisMonth?.month ?? today.slice(0, 7), "MMMM") }),
      detail: t("stats.payments", { count: thisMonth?.count ?? 0 }),
      tone: "",
    },
    {
      key: "last",
      value: formatMad(lastMonth?.total ?? 0),
      label: t("stats.lastMonth", { month: month(lastMonth?.month ?? today.slice(0, 7), "MMMM") }),
      detail: t("stats.payments", { count: lastMonth?.count ?? 0 }),
      tone: "",
    },
    {
      key: "overdue",
      value: String(overdue.length),
      label: t("stats.overdue", { count: overdue.length }),
      detail: overdue.length > 0 ? t("stats.owed", { hours: formatHours(owed) }) : null,
      tone: overdue.length > 0 ? "border-stylo-rouge bg-lavis-rouge text-stylo-rouge" : "",
    },
  ];

  return (
    <div className="grid gap-8">
      <RefreshOnReturn />
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className={cn(
              "flex flex-col-reverse justify-end gap-1 rounded-2xl border border-quadrillage bg-surface p-4",
              stat.key === "overdue" && "col-span-2 sm:col-span-1",
              stat.tone,
            )}
          >
            <dt className="text-sm font-medium first-letter:uppercase">
              {stat.label}
              {stat.detail ? (
                <span className="block font-normal text-encre-douce">{stat.detail}</span>
              ) : null}
            </dt>
            <dd className="text-xl font-semibold tabular [font-variation-settings:'HEXP'_45] sm:text-3xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* What to act on first on a phone; beside the payments on a wide screen. */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_1fr]">
        <section
          aria-labelledby="overdue-heading"
          className="grid content-start gap-3 lg:col-start-2 lg:row-start-1"
        >
          <h2 id="overdue-heading" className="flex items-center gap-2 text-lg font-semibold">
            <TriangleAlert aria-hidden="true" className="size-5" />
            {t("overdueHeading")}
          </h2>
          {overdue.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-sm text-encre-douce">
              {t("noOverdue")}
            </p>
          ) : (
            <ul
              role="list"
              className="grid gap-px overflow-hidden rounded-2xl border border-stylo-rouge/40 bg-quadrillage"
            >
              {overdue.map(({ account, days }) => {
                const profile = names.get(account.studentId);
                const name = profile?.full_name ?? "";
                return (
                  <li key={account.studentId} className="grid gap-2 bg-surface px-4 py-3">
                    <span className="flex items-center gap-3">
                      <Initials name={name} />
                      <span className="grid min-w-0 gap-0.5">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <Link
                            href={`/prof/eleves/${account.studentId}#paiements`}
                            className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                          >
                            {name}
                          </Link>
                          {profile?.level_code ? (
                            <span className="text-sm text-encre-douce">{profile.level_code}</span>
                          ) : null}
                        </span>
                        <span className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-medium text-stylo-rouge tabular">
                            {t("owes", { hours: formatHours(-account.balance) })}
                          </span>
                          <AccountStatusChip days={days} />
                        </span>
                      </span>
                    </span>
                    <Link
                      href={`/prof/paiements/nouveau?eleve=${account.studentId}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "justify-self-start",
                      )}
                    >
                      {t("recordFor")}
                      <span className="sr-only"> {t("recordForName", { name })}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <Link
            href="/prof/eleves"
            className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("allStudents")}
          </Link>
        </section>

        <section
          aria-labelledby="recent-heading"
          className="grid min-w-0 content-start gap-4 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <h2 id="recent-heading" className="text-lg font-semibold">
            {t("recentHeading")}
          </h2>
          {payments.length === 0 ? (
            <div className="grid justify-items-start gap-3 rounded-2xl border border-dashed border-trait bg-surface px-5 py-6">
              <p>{t("noPayments")}</p>
              <Link href="/prof/paiements/nouveau" className={buttonVariants({ size: "sm" })}>
                {t("record")}
              </Link>
            </div>
          ) : (
            [...byMonth].map(([key, ofMonth]) => (
              <section key={key} aria-labelledby={`month-${key}`} className="grid gap-2">
                <h3
                  id={`month-${key}`}
                  className="text-sm font-semibold text-encre-douce first-letter:uppercase"
                >
                  {month(key, "MMMM yyyy")}
                </h3>
                <ul
                  role="list"
                  className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
                >
                  {ofMonth.map((payment) => (
                    <li
                      key={payment.id}
                      className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 bg-surface px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
                    >
                      <span
                        aria-hidden="true"
                        className="row-span-2 grid size-11 content-center justify-items-center rounded-xl bg-sunken leading-none sm:row-span-1"
                      >
                        <span className="text-base font-semibold tabular">
                          {formatDay(payment.paidOn, "d")}
                        </span>
                        <span className="text-[0.65rem] text-encre-douce">
                          {formatDay(payment.paidOn, "MMM")}
                        </span>
                      </span>
                      <span className="grid min-w-0 gap-0.5">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <Link
                            href={`/prof/eleves/${payment.studentId}#paiements`}
                            className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                          >
                            {payment.studentName}
                          </Link>
                          <span className={cn("text-sm", payment.voidedAt && "line-through")}>
                            {payment.label}
                          </span>
                          {payment.voidedAt ? (
                            <span className="text-sm font-medium text-stylo-rouge">
                              {tPayments("voided")}
                            </span>
                          ) : null}
                        </span>
                        <span className="text-sm text-encre-douce">
                          <span className="sr-only">{formatDay(payment.paidOn)} · </span>
                          {tMethod(payment.method)}
                        </span>
                      </span>
                      <span className="col-start-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:col-start-auto sm:grid sm:justify-items-end">
                        <span
                          className={cn(
                            "font-semibold tabular",
                            payment.voidedAt && "font-normal text-encre-douce line-through",
                          )}
                        >
                          {formatMad(payment.amountMad)}
                        </span>
                        <ReceiptLink
                          payment={payment}
                          label={tPayments("receiptLink", { number: payment.receiptNumber })}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </section>

        <section
          aria-labelledby="income-heading"
          className="grid content-start gap-3 lg:col-start-2 lg:row-start-2"
        >
          <h2 id="income-heading" className="text-lg font-semibold">
            {t("incomeHeading", { count: income.length })}
          </h2>
          <ol
            role="list"
            className="grid grid-cols-6 items-end gap-2 rounded-2xl border border-quadrillage bg-surface p-4"
          >
            {income.map((entry, index) => {
              const current = index === income.length - 1;
              return (
                <li key={entry.month} className="grid content-end justify-items-center gap-1">
                  <span className="text-xs font-medium tabular">
                    <span className="sr-only">
                      {month(entry.month, "MMMM yyyy")} : {formatMad(entry.total)}
                    </span>
                    <span aria-hidden="true">
                      {entry.total >= 1000
                        ? `${new Intl.NumberFormat("fr", { maximumFractionDigits: 1 }).format(entry.total / 1000)} k`
                        : new Intl.NumberFormat("fr").format(entry.total)}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-full max-w-8 rounded-t-md",
                      entry.total === 0
                        ? "bg-quadrillage"
                        : current
                          ? "bg-stylo-bleu"
                          : "bg-encre-douce",
                    )}
                    style={{ height: Math.max(Math.round((entry.total / highest) * 112), 3) }}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-xs capitalize",
                      current ? "font-semibold" : "text-encre-douce",
                    )}
                  >
                    {month(entry.month, "MMM")}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="text-xs text-encre-douce">{t("incomeNote")}</p>
        </section>
      </div>
    </div>
  );
}
