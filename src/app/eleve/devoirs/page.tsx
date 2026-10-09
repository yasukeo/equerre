import { AlarmClock, CheckCheck, Circle, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { GradeMark } from "@/components/grade-mark";
import { LateBadge } from "@/components/late-badge";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { listMyHomework, type HomeworkEntry } from "@/lib/homework/queries";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.homework");
  return { title: t("title") };
}

const VIEWS = ["a-faire", "en-attente", "termines"] as const;
type View = (typeof VIEWS)[number];

export default async function StudentHomeworkPage({ searchParams }: PageProps<"/eleve/devoirs">) {
  const t = await getTranslations("student.homework");

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-6">
      <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
        {t("title")}
      </h1>
      <Suspense fallback={<ListSkeleton />}>
        <HomeworkList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const DAY = 24 * 60 * 60 * 1000;

async function HomeworkList({
  searchParams,
}: {
  searchParams: PageProps<"/eleve/devoirs">["searchParams"];
}) {
  const viewer = await requireViewer("student");
  const [t, params] = await Promise.all([getTranslations("student.homework"), searchParams]);
  const now = new Date();
  const homework = await listMyHomework(now);

  // A stopped student keeps her past work to read, and nothing is left for her to do (D-060).
  const open = viewer.status !== "arrete";
  const toDo = (entry: HomeworkEntry) => open && entry.progress.left > 0;
  // Each homework is in exactly one tab: still to do, waiting for the tutor, or done with.
  const groups: Record<View, HomeworkEntry[]> = {
    "a-faire": homework.filter(toDo).sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt)),
    "en-attente": homework
      .filter((entry) => !toDo(entry) && entry.waiting > 0)
      .sort((a, b) => Date.parse(b.dueAt) - Date.parse(a.dueAt)),
    termines: homework
      .filter((entry) => !toDo(entry) && entry.waiting === 0)
      .sort((a, b) => Date.parse(b.dueAt) - Date.parse(a.dueAt)),
  };
  const asked = VIEWS.find((view) => view === params.vue);
  // Without a choice, the first tab with something in it.
  const view: View = asked ?? VIEWS.find((entry) => groups[entry].length > 0) ?? "a-faire";
  const entries = groups[view];
  const format = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });
  const icons = { "a-faire": Circle, "en-attente": Clock, termines: CheckCheck } as const;
  const edges = {
    "a-faire": "border-s-rouge hover:border-s-rouge",
    "en-attente": "border-s-stylo-bleu hover:border-s-stylo-bleu",
    termines: "border-s-encre hover:border-s-encre",
  } as const;

  return (
    <>
      <nav aria-label={t("views")}>
        <ul role="list" className="grid grid-cols-3 gap-1.5 sm:flex sm:gap-2">
          {VIEWS.map((entry) => {
            const Icon = icons[entry];
            const current = entry === view;
            return (
              <li key={entry} className="grid">
                <Link
                  href={`/eleve/devoirs?vue=${entry}`}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-2 text-sm font-medium sm:px-4",
                    current
                      ? "border-encre bg-encre text-papier"
                      : "border-quadrillage bg-surface hover:border-trait",
                  )}
                >
                  <Icon aria-hidden="true" className="hidden size-4 sm:block" />
                  {t(`view.${entry}`)}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs tabular",
                      current ? "bg-papier/20" : "bg-sunken text-encre-douce",
                    )}
                  >
                    {groups[entry].length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-6 text-encre-douce">
          {t(`emptyView.${view}`)}
        </p>
      ) : (
        <ul role="list" className="grid gap-2.5">
          {entries.map((entry) => {
            const done = entry.progress.total - entry.progress.left;
            const soon =
              view === "a-faire" &&
              !entry.progress.late &&
              Date.parse(entry.dueAt) - now.getTime() < 2 * DAY;
            return (
              <li key={entry.id}>
                <Link
                  href={`/eleve/devoirs/${entry.id}`}
                  className={cn(
                    "grid gap-3 rounded-2xl border border-s-4 border-quadrillage bg-surface p-4 hover:border-trait",
                    edges[view],
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="grid min-w-0 gap-0.5">
                      <span className="flex flex-wrap items-center gap-2 font-semibold">
                        {entry.title}
                        {view === "a-faire" && entry.progress.late ? (
                          <LateBadge label={t("late")} />
                        ) : null}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-encre-douce first-letter:uppercase">
                        {soon ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-encre">
                            <AlarmClock aria-hidden="true" className="size-4" />
                            {t("soon")}
                          </span>
                        ) : null}
                        <span className="first-letter:uppercase">
                          {t("due", { date: formatLocal(entry.dueAt, "EEEE d MMMM 'à' HH:mm") })}
                        </span>
                      </span>
                    </span>
                    {view === "termines" && entry.grade !== null ? (
                      <GradeMark
                        grade={format.format(entry.grade)}
                        label={t("exercise.gradeLabel")}
                        className="shrink-0"
                      />
                    ) : null}
                  </span>
                  {view === "a-faire" ? (
                    <span className="grid gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-2 overflow-hidden rounded-full bg-sunken"
                      >
                        <span
                          className="block h-full rounded-full bg-rouge"
                          style={{
                            width: `${Math.round((done / Math.max(entry.progress.total, 1)) * 100)}%`,
                          }}
                        />
                      </span>
                      <span className="text-sm">
                        {entry.subject
                          ? t("subject.copyToHandIn")
                          : t("left", { left: entry.progress.left, total: entry.progress.total })}
                      </span>
                    </span>
                  ) : view === "en-attente" ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-stylo-bleu">
                      <Clock aria-hidden="true" className="size-4" />
                      {t("waiting", { count: entry.waiting })}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-encre-douce">
                      <CheckCheck aria-hidden="true" className="size-4" />
                      {entry.corrected > 0
                        ? t("correctedCount", { count: entry.corrected })
                        : t("finished")}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-3">
      <div className="h-11 rounded-full bg-sunken" />
      <div className="h-28 rounded-2xl bg-sunken" />
      <div className="h-28 rounded-2xl bg-sunken" />
    </div>
  );
}
