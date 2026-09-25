import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { listMyHomework, type HomeworkEntry } from "@/lib/homework/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.homework");
  return { title: t("title") };
}

export default async function StudentHomeworkPage() {
  const t = await getTranslations("student.homework");

  return (
    <div className="mx-auto grid max-w-2xl gap-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Suspense fallback={<ListSkeleton />}>
        <HomeworkList />
      </Suspense>
    </div>
  );
}

async function HomeworkList() {
  const viewer = await requireViewer("student");
  const t = await getTranslations("student.homework");
  const now = new Date();
  const homework = await listMyHomework(now);

  if (homework.length === 0) {
    return <p className="text-encre-douce">{t("empty")}</p>;
  }

  // A stopped student keeps her past work to read, and nothing is left for her to do (D-060).
  const open = viewer.status !== "arrete";
  const stillToDo = (entry: HomeworkEntry) => open && entry.progress.left > 0;

  // What is left comes first, soonest due first; what is done follows, latest first.
  const toDo = homework.filter(stillToDo).sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt));
  const done = homework
    .filter((entry) => !stillToDo(entry))
    .sort((a, b) => Date.parse(b.dueAt) - Date.parse(a.dueAt));

  const section = (id: string, heading: string, entries: HomeworkEntry[]) =>
    entries.length === 0 ? null : (
      <section aria-labelledby={id} className="grid gap-3">
        <h2 id={id} className="text-lg font-medium">
          {heading}
        </h2>
        <ul className="divide-y divide-quadrillage border-y border-quadrillage" role="list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <Link
                href={`/eleve/devoirs/${entry.id}`}
                className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
              >
                <span className="flex flex-wrap items-center gap-2 font-medium">
                  {entry.title}
                  {open && entry.progress.late ? (
                    <span className="rounded-sm border border-stylo-rouge/40 px-1.5 py-0.5 text-xs font-medium text-stylo-rouge">
                      {t("late")}
                    </span>
                  ) : null}
                </span>
                <span className="text-sm text-encre-douce">
                  {t("due", { date: formatLocal(entry.dueAt, "EEEE d MMMM 'à' HH:mm") })}
                  {open
                    ? ` · ${t("left", { left: entry.progress.left, total: entry.progress.total })}`
                    : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );

  return (
    <>
      {section("homework-to-do", t("toDo"), toDo)}
      {section("homework-done", t("done"), done)}
    </>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-3">
      <div className="h-5 w-32 rounded bg-sunken" />
      <div className="h-16 rounded bg-sunken" />
      <div className="h-16 rounded bg-sunken" />
    </div>
  );
}
