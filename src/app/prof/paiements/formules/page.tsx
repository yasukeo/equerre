import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { formatDecimal } from "@/lib/decimal";
import { formatHours, formatMad } from "@/lib/payments/format";
import { listPlans } from "@/lib/payments/queries";
import { PlanForm } from "./plan-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("plans");
  return { title: t("title") };
}

export default async function PlansPage() {
  const t = await getTranslations("plans");

  return (
    <div className="grid max-w-5xl gap-6">
      <Link
        href="/prof/paiements"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="max-w-prose text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Plans />
      </Suspense>
    </div>
  );
}

async function Plans() {
  await requireViewer("tutor");
  const [t, tKind, tScope] = await Promise.all([
    getTranslations("plans"),
    getTranslations("payments.kind"),
    getTranslations("payments.scope"),
  ]);
  const plans = await listPlans();

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      {plans.length === 0 ? (
        <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("empty")}</p>
      ) : (
        <ul role="list" className="grid gap-4">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="grid gap-3 rounded-md border border-quadrillage bg-surface p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-base font-semibold">{plan.name}</h2>
                <p className="text-sm text-encre-douce">
                  {[tKind(plan.kind), plan.isActive ? null : t("inactive")]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <p className="text-sm tabular">
                {plan.kind === "hour_pack"
                  ? t("summaryPack", {
                      hours: formatHours(plan.hours ?? 0),
                      price: formatMad(plan.priceMad),
                    })
                  : t("summarySubscription", {
                      months: plan.periodMonths ?? 1,
                      price: formatMad(plan.priceMad),
                      scope: tScope(plan.scope),
                    })}
              </p>
              <details>
                <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre">
                  {t("edit")}
                </summary>
                <div className="pt-3">
                  <PlanForm
                    id={plan.id}
                    initial={{
                      kind: plan.kind,
                      name: plan.name,
                      price: formatDecimal(String(plan.priceMad)),
                      hours: plan.hours === null ? "" : formatDecimal(String(plan.hours)),
                      months: String(plan.periodMonths ?? 1),
                      scope: plan.scope,
                      isActive: plan.isActive,
                    }}
                  />
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
      <section
        aria-labelledby="new-plan"
        className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
      >
        <h2 id="new-plan" className="text-base font-semibold">
          {t("newHeading")}
        </h2>
        <PlanForm />
      </section>
    </div>
  );
}
