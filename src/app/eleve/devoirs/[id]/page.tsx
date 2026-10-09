import { ArrowRight, Camera, Hash, ListChecks, MessageSquareText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { GradeMark } from "@/components/grade-mark";
import { LateBadge } from "@/components/late-badge";
import { PageHeader } from "@/components/shell/page-header";
import { Ruler } from "@/components/student/ruler";
import { WorkChip } from "@/components/work-status";
import { requireViewer } from "@/lib/auth";
import { calendarDaysBetween, formatLocal } from "@/lib/dates";
import type { AnswerType } from "@/lib/exercise/exercise";
import { getMyHomework } from "@/lib/homework/queries";
import type { ExerciseWork } from "@/lib/homework/work";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.homework");
  return { title: t("title") };
}

export default async function StudentAssignmentPage({ params }: PageProps<"/eleve/devoirs/[id]">) {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-64 rounded-2xl bg-sunken" />}>
        <Assignment params={params} />
      </Suspense>
    </div>
  );
}

const ANSWER_ICONS: Record<AnswerType, typeof Camera> = {
  upload: Camera,
  numeric: Hash,
  mcq: ListChecks,
};

// The number of an exercise, filled as it moves on: outlined to do, blue pen once handed in,
// ink once corrected. Its chip says the same in words.
const NUMBER_TONES: Record<ExerciseWork["kind"], string> = {
  todo: "border-2 border-trait text-encre",
  handedIn: "bg-bleu-bande text-white",
  graded: "bg-encre text-papier",
  revealed: "bg-sunken text-encre-douce",
  doneElsewhere: "bg-sunken text-encre-douce",
};

async function Assignment({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer("student");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const t = await getTranslations("student.homework");
  const now = new Date();
  const homework = await getMyHomework(id, now);
  if (!homework) notFound();
  // Given as a PDF: the homework is its subject and her copy, on the exercise's page (D-106).
  const only = homework.exercises.length === 1 ? homework.exercises[0] : undefined;
  if (only?.subjectPath) redirect(`/eleve/devoirs/${homework.id}/${only.id}`);

  // A stopped student reads her past work; nothing is late or left for her (D-060).
  const open = viewer.status !== "arrete";
  const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });
  const workLabel = (work: ExerciseWork) =>
    work.kind === "graded"
      ? t("work.graded", { grade: gradeFormat.format(work.grade) })
      : t(`work.${work.kind}`);

  const { total, left, late } = homework.progress;
  const done = total - left;
  const days = calendarDaysBetween(now, homework.dueAt);
  const nextIndex = homework.exercises.findIndex((exercise) => exercise.work.kind === "todo");
  const next = open && nextIndex >= 0 ? homework.exercises[nextIndex] : null;

  return (
    <article className="grid gap-6">
      <PageHeader
        back={{ href: "/eleve/devoirs", label: t("back") }}
        eyebrow={t("due", { date: formatLocal(homework.dueAt, "EEEE d MMMM 'à' HH:mm") })}
        title={homework.title}
      >
        {open && total > 0 ? (
          <div className="grid gap-2">
            <p className="flex flex-wrap items-center gap-2 text-sm">
              {late ? (
                <LateBadge label={t("late")} />
              ) : left > 0 ? (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium",
                    days <= 1 ? "bg-rouge-fond text-rouge-texte" : "bg-sunken",
                  )}
                >
                  {t("dueIn", { count: Math.max(days, 0) })}
                </span>
              ) : null}
              <span>{t("left", { left, total })}</span>
            </p>
            {/* One graduation per exercise: ink once corrected, blue pen once handed in. */}
            <Ruler
              marks={homework.exercises.map((exercise) =>
                exercise.work.kind === "todo"
                  ? "new"
                  : exercise.work.kind === "handedIn"
                    ? "opened"
                    : "understood",
              )}
            />
          </div>
        ) : null}
      </PageHeader>

      {next ? (
        <Link
          href={`/eleve/devoirs/${homework.id}/${next.id}`}
          className="group grid gap-1 rounded-2xl bg-encre-fixe p-5 text-white hover:brightness-110"
        >
          <span className="text-sm opacity-80">
            {done === 0 ? t("startWith") : t("continueWith")}
          </span>
          <span className="flex items-center justify-between gap-3">
            <span className="min-w-0 text-lg font-semibold break-words">
              {t("exerciseNumber", { number: nextIndex + 1 })} · {next.title}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            />
          </span>
        </Link>
      ) : null}

      {homework.instructions ? (
        <section
          aria-labelledby="homework-instructions"
          className="grid gap-2 rounded-2xl border border-s-4 border-quadrillage border-s-surligneur bg-surface p-4"
        >
          <h2
            id="homework-instructions"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <MessageSquareText aria-hidden="true" className="size-4" />
            {t("instructions")}
          </h2>
          <p className="break-words whitespace-pre-line">{homework.instructions}</p>
        </section>
      ) : null}

      <section aria-labelledby="homework-exercises" className="grid gap-3">
        <h2 id="homework-exercises" className="text-lg font-semibold">
          {t("exercises")}
        </h2>
        <ol role="list" className="grid gap-2.5">
          {homework.exercises.map((exercise, index) => {
            const Icon = ANSWER_ICONS[exercise.answerType];
            return (
              <li key={exercise.id}>
                <Link
                  href={`/eleve/devoirs/${homework.id}/${exercise.id}`}
                  className={cn(
                    "flex min-h-16 items-center gap-3 rounded-2xl border border-quadrillage bg-surface p-3 hover:border-trait sm:p-4",
                    next?.id === exercise.id && "border-encre hover:border-encre",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full font-semibold tabular",
                      NUMBER_TONES[exercise.work.kind],
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="grid min-w-0 grow gap-1">
                    <span className="font-medium break-words">
                      <span className="sr-only">
                        {t("exerciseNumber", { number: index + 1 })} :{" "}
                      </span>
                      {exercise.title}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center gap-1 text-xs text-encre-douce">
                        <Icon aria-hidden="true" className="size-3.5" />
                        {t(`answerKind.${exercise.answerType}`)}
                      </span>
                      {exercise.work.kind === "graded" ? null : (
                        <WorkChip work={exercise.work} label={workLabel(exercise.work)} />
                      )}
                    </span>
                  </span>
                  {exercise.work.kind === "graded" ? (
                    <GradeMark
                      grade={gradeFormat.format(exercise.work.grade)}
                      label={t("exercise.gradeLabel")}
                      className="shrink-0"
                    />
                  ) : (
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-encre-douce rtl:rotate-180"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </article>
  );
}
