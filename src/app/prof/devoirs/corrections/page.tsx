import { Clock, Images } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LateBadge } from "@/components/late-badge";
import { requireViewer } from "@/lib/auth";
import { listCorrectionQueue } from "@/lib/correction/queries";
import { formatLocal } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.corrections");
  return { title: t("title") };
}

export default async function CorrectionQueuePage() {
  const t = await getTranslations("tutor.corrections");

  return (
    <div className="grid max-w-4xl gap-6">
      <Link
        href="/prof/devoirs"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <div className="grid gap-1">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="text-encre-douce">{t("lead")}</p>
      </div>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-md bg-sunken" />}>
        <Queue />
      </Suspense>
    </div>
  );
}

async function Queue() {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.corrections");
  const queue = await listCorrectionQueue();

  if (queue.length === 0) {
    return <p className="rounded-md border border-dashed border-trait px-4 py-6">{t("empty")}</p>;
  }

  return (
    <section aria-labelledby="queue-heading" className="grid gap-3">
      <h2 id="queue-heading" className="text-base font-semibold">
        {t("waiting", { count: queue.length })}
      </h2>
      <ol className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
        {queue.map((entry) => (
          <li key={entry.id} className="bg-surface">
            <Link
              href={`/prof/devoirs/corrections/${entry.id}`}
              className="grid min-h-16 gap-1 px-4 py-3 hover:bg-sunken"
            >
              <span className="flex flex-wrap items-baseline gap-x-2 font-medium">
                {entry.student}
                <span className="font-normal text-encre-douce">· {entry.exercise}</span>
              </span>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-encre-douce">
                <span>{entry.homework}</span>
                <span className="inline-flex items-center gap-1">
                  <Images aria-hidden="true" className="size-4" />
                  {t("pages", { count: entry.pages })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden="true" className="size-4" />
                  {t("handedIn", { date: formatLocal(entry.submittedAt, "EEEE d MMMM 'à' HH:mm") })}
                </span>
                {entry.late ? <LateBadge label={t("late")} /> : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
