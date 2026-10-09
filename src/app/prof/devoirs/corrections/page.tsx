import { ArrowRight, Check, Clock, Images } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Initials } from "@/components/initials";
import { LateBadge } from "@/components/late-badge";
import { PageHeader } from "@/components/shell/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { requireViewer } from "@/lib/auth";
import { listCorrectionQueue, type QueueEntry } from "@/lib/correction/queries";
import { calendarDaysBetween } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.corrections");
  return { title: t("title") };
}

export default async function CorrectionQueuePage() {
  return (
    <div className="grid max-w-4xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-2xl bg-sunken" />}>
        <Queue />
      </Suspense>
    </div>
  );
}

async function Queue() {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.corrections");
  const queue = await listCorrectionQueue();
  const now = new Date();

  // One block per homework, in the order of the copy that has waited longest in it.
  const byHomework = new Map<string, { title: string; entries: QueueEntry[] }>();
  for (const entry of queue) {
    const block = byHomework.get(entry.homeworkId) ?? { title: entry.homework, entries: [] };
    block.entries.push(entry);
    byHomework.set(entry.homeworkId, block);
  }
  const first = queue[0];

  return (
    <>
      <PageHeader
        back={{ href: "/prof/devoirs", label: t("back") }}
        title={t("title")}
        lead={t("lead")}
        actions={
          first ? (
            <Link href={`/prof/devoirs/corrections/${first.id}`} className={buttonVariants()}>
              {t("start")}
              <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
            </Link>
          ) : null
        }
      />

      {queue.length === 0 ? (
        <div className="grid justify-items-start gap-3 rounded-2xl border border-quadrillage bg-surface px-5 py-6">
          <span className="flex size-11 items-center justify-center rounded-full bg-sunken">
            <Check aria-hidden="true" className="size-5" />
          </span>
          <p className="font-medium">{t("empty")}</p>
          <Link
            href="/prof/devoirs"
            className="inline-flex min-h-11 items-center text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("back")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          <p className="text-sm font-medium" role="status">
            {t("waiting", { count: queue.length })}
          </p>
          {[...byHomework].map(([homeworkId, block]) => (
            <section
              key={homeworkId}
              aria-labelledby={`queue-${homeworkId}`}
              className="grid gap-2"
            >
              <h2
                id={`queue-${homeworkId}`}
                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
              >
                <Link
                  href={`/prof/devoirs/${homeworkId}`}
                  className="font-semibold underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                >
                  {block.title}
                </Link>
                <span className="text-sm font-normal text-encre-douce">
                  {t("copies", { count: block.entries.length })}
                </span>
              </h2>
              <ol
                role="list"
                className="grid gap-px overflow-hidden rounded-2xl border border-quadrillage bg-quadrillage"
              >
                {block.entries.map((entry) => {
                  const days = Math.max(calendarDaysBetween(entry.submittedAt, now), 0);
                  return (
                    <li key={entry.id} className="bg-surface">
                      <Link
                        href={`/prof/devoirs/corrections/${entry.id}`}
                        className="flex min-h-16 items-center gap-3 px-4 py-3 hover:bg-sunken"
                      >
                        <Initials name={entry.student} />
                        <span className="grid min-w-0 grow gap-0.5">
                          <span className="flex flex-wrap items-baseline gap-x-2 font-medium">
                            {entry.student}
                            <span className="font-normal break-words text-encre-douce">
                              · {entry.exercise}
                            </span>
                          </span>
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-encre-douce">
                            <span className="inline-flex items-center gap-1">
                              <Images aria-hidden="true" className="size-4" />
                              {t("pages", { count: entry.pages })}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock aria-hidden="true" className="size-4" />
                              {t("waitingFor", { days })}
                            </span>
                            {entry.late ? <LateBadge label={t("late")} /> : null}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-encre-douce rtl:rotate-180"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
