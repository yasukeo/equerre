import { Tags, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { RefreshOnReturn } from "@/components/chat/inbox-live";
import { AccountStatusChip, overdueDays, ReceiptLink } from "@/components/payments/account-panel";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { formatDay, formatHours, formatMad } from "@/lib/payments/format";
import { getAccounts, listPayments } from "@/lib/payments/queries";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("paymentsHub");
  return { title: t("title") };
}

export default async function PaymentsPage() {
  const t = await getTranslations("paymentsHub");

  return (
    <div className="grid max-w-5xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="max-w-prose text-encre-douce">{t("lead")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/prof/paiements/formules" className={buttonVariants({ variant: "outline" })}>
            <Tags aria-hidden="true" />
            {t("plans")}
          </Link>
          <Link href="/prof/paiements/nouveau" className={buttonVariants()}>
            <Wallet aria-hidden="true" />
            {t("record")}
          </Link>
        </div>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Payments />
      </Suspense>
    </div>
  );
}

/** Payments listed on this page; the rest are on each student's file. */
const RECENT = 20;

async function Payments() {
  await requireViewer("tutor");
  const [t, tPayments, tMethod] = await Promise.all([
    getTranslations("paymentsHub"),
    getTranslations("payments"),
    getTranslations("payments.method"),
  ]);
  const supabase = await createClient();
  const [accounts, payments, profiles] = await Promise.all([
    getAccounts(),
    listPayments({ limit: RECENT }),
    supabase.from("profiles").select("id, full_name, level_code").eq("role", "student"),
  ]);
  if (profiles.error) throw new Error("Could not read the students", { cause: profiles.error });
  const today = localDateKey(new Date());
  const names = new Map(profiles.data.map((profile) => [profile.id, profile]));

  // The longest overdue first: the one she should call today.
  const overdue = [...accounts.values()]
    .map((account) => ({ account, days: overdueDays(account, today) }))
    .filter(
      (entry): entry is { account: typeof entry.account; days: number } => entry.days !== null,
    )
    .sort((a, b) => b.days - a.days || a.account.balance - b.account.balance);

  return (
    <div className="grid gap-10">
      <RefreshOnReturn />
      <section aria-labelledby="overdue-heading" className="grid gap-3">
        <h2 id="overdue-heading" className="text-lg font-medium">
          {t("overdueHeading")}
        </h2>
        {overdue.length === 0 ? (
          <p className="text-encre-douce">{t("noOverdue")}</p>
        ) : (
          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
          >
            {overdue.map(({ account, days }) => {
              const profile = names.get(account.studentId);
              return (
                <li
                  key={account.studentId}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-surface px-4 py-3"
                >
                  <span className="grid gap-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <Link
                        href={`/prof/eleves/${account.studentId}#paiements`}
                        className="font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                      >
                        {profile?.full_name}
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
                  <Link
                    href={`/prof/paiements/nouveau?eleve=${account.studentId}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    {t("recordFor")}
                    <span className="sr-only">
                      {" "}
                      {t("recordForName", { name: profile?.full_name ?? "" })}
                    </span>
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

      <section aria-labelledby="recent-heading" className="grid gap-3">
        <h2 id="recent-heading" className="text-lg font-medium">
          {t("recentHeading")}
        </h2>
        {payments.length === 0 ? (
          <p className="rounded-md border border-dashed border-trait px-4 py-5">
            {t("noPayments")}
          </p>
        ) : (
          <ul
            role="list"
            className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
          >
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="grid gap-1 bg-surface px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6"
              >
                <p className="flex flex-wrap items-baseline gap-x-2">
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
                </p>
                <p
                  className={cn(
                    "font-semibold tabular sm:text-end",
                    payment.voidedAt && "font-normal text-encre-douce line-through",
                  )}
                >
                  {formatMad(payment.amountMad)}
                </p>
                <p className="text-sm text-encre-douce">
                  {formatDay(payment.paidOn)} · {tMethod(payment.method)}
                </p>
                <div className="sm:text-end">
                  <ReceiptLink
                    payment={payment}
                    label={tPayments("receiptLink", { number: payment.receiptNumber })}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
