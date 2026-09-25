import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { WorkChip } from "@/components/work-status";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { getMyHomework } from "@/lib/homework/queries";
import type { ExerciseWork } from "@/lib/homework/work";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.homework");
  return { title: t("title") };
}

export default async function StudentAssignmentPage({ params }: PageProps<"/eleve/devoirs/[id]">) {
  const t = await getTranslations("student.homework");

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Link
        href="/eleve/devoirs"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-md bg-sunken" />}>
        <Assignment params={params} />
      </Suspense>
    </div>
  );
}

async function Assignment({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer("student");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const t = await getTranslations("student.homework");
  const homework = await getMyHomework(id, new Date());
  if (!homework) notFound();

  // A stopped student reads her past work; nothing is late or left for her (D-060).
  const open = viewer.status !== "arrete";
  const workLabel = (work: ExerciseWork) =>
    work.kind === "graded"
      ? t("work.graded", { grade: formatGrade(work.grade) })
      : t(`work.${work.kind}`);

  return (
    <article className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-2xl font-semibold">{homework.title}</h1>
        <p className="flex flex-wrap items-center gap-2 text-encre-douce">
          {t("due", { date: formatLocal(homework.dueAt, "EEEE d MMMM 'à' HH:mm") })}
          {open && homework.progress.late ? (
            <span className="rounded-sm border border-stylo-rouge/40 px-1.5 py-0.5 text-xs font-medium text-stylo-rouge">
              {t("late")}
            </span>
          ) : null}
        </p>
        {open ? (
          <p className="text-sm text-encre-douce">
            {t("left", { left: homework.progress.left, total: homework.progress.total })}
          </p>
        ) : null}
      </header>

      {homework.instructions ? (
        <section aria-labelledby="homework-instructions" className="grid gap-1">
          <h2 id="homework-instructions" className="text-sm font-semibold text-encre-douce">
            {t("instructions")}
          </h2>
          <p className="whitespace-pre-line">{homework.instructions}</p>
        </section>
      ) : null}

      <section aria-labelledby="homework-exercises" className="grid gap-3">
        <h2 id="homework-exercises" className="text-lg font-medium">
          {t("exercises")}
        </h2>
        <ol className="divide-y divide-quadrillage border-y border-quadrillage" role="list">
          {homework.exercises.map((exercise, index) => (
            <li key={exercise.id}>
              <Link
                href={`/eleve/devoirs/${homework.id}/${exercise.id}`}
                className="flex min-h-16 flex-wrap items-center gap-x-3 gap-y-1 py-3 hover:bg-sunken"
              >
                <span className="w-6 text-sm text-encre-douce">{index + 1}.</span>
                <span className="min-w-0 grow basis-40 font-medium">{exercise.title}</span>
                <WorkChip work={exercise.work} label={workLabel(exercise.work)} />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

function formatGrade(grade: number): string {
  return new Intl.NumberFormat("fr", { maximumFractionDigits: 2 }).format(grade);
}
