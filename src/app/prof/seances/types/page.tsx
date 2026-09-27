import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { formatDecimal } from "@/lib/decimal";
import { createClient } from "@/lib/supabase/server";
import { TypeForm } from "./type-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.sessionTypes");
  return { title: t("title") };
}

export default async function SessionTypesPage() {
  const t = await getTranslations("tutor.sessionTypes");

  return (
    <div className="grid max-w-5xl gap-6">
      <Link
        href="/prof/seances"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="max-w-prose text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <SessionTypes />
      </Suspense>
    </div>
  );
}

async function SessionTypes() {
  await requireViewer("tutor");
  const [t, tMode] = await Promise.all([
    getTranslations("tutor.sessionTypes"),
    getTranslations("session.mode"),
  ]);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("session_types")
    .select("id, name, duration_min, mode, price_mad::text, is_group, is_active")
    .order("is_group")
    .order("name");
  if (error) throw new Error("Could not read the session types", { cause: error });

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <ul role="list" className="grid gap-4">
        {data.map((type) => (
          <li
            key={type.id}
            className="grid gap-3 rounded-md border border-quadrillage bg-surface p-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold">{type.name}</h2>
              <p className="text-sm text-encre-douce">
                {[
                  type.is_group ? t("group") : t("individual"),
                  tMode(type.mode),
                  type.is_active ? null : t("inactive"),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <p className="text-sm tabular">
              {t("summary", {
                duration: type.duration_min,
                price: formatDecimal(type.price_mad.replace(/\.00$/, "")),
              })}
            </p>
            <details>
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre">
                {t("edit")}
              </summary>
              <div className="pt-3">
                <TypeForm
                  id={type.id}
                  initial={{
                    name: type.name,
                    durationMin: String(type.duration_min),
                    mode: type.mode,
                    price: formatDecimal(type.price_mad.replace(/\.00$/, "")),
                    isActive: type.is_active,
                    isGroup: type.is_group,
                  }}
                />
              </div>
            </details>
          </li>
        ))}
      </ul>
      <section
        aria-labelledby="new-type"
        className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
      >
        <h2 id="new-type" className="text-base font-semibold">
          {t("newHeading")}
        </h2>
        <TypeForm />
      </section>
    </div>
  );
}
