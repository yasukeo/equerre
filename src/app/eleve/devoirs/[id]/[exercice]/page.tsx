import { Check, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { z } from "zod";
import { AnnotatedPage, RemarkNumber } from "@/components/annotated-page";
import { GradeMark } from "@/components/grade-mark";
import { PageGrid } from "@/components/page-grid";
import { WorkChip } from "@/components/work-status";
import { requireViewer } from "@/lib/auth";
import { arrangeRemarks, type NumberedRemark } from "@/lib/correction/correction";
import { formatDecimal, parseDecimal } from "@/lib/decimal";
import { getMyExercise, type MyExercise } from "@/lib/homework/queries";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "@/lib/lesson/document";
import { renderMathText } from "@/lib/lesson/math-text";
import { renderLesson } from "@/lib/lesson/render";
import { ChoiceAnswer, NumericAnswer, RevealSolution } from "./answer-forms";
import { PhotoAnswer } from "./photo-answer";
// Statements and solutions are drawn as lessons are: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.homework");
  return { title: t("title") };
}

export default async function StudentExercisePage({
  params,
}: PageProps<"/eleve/devoirs/[id]/[exercice]">) {
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <Exercise params={params} />
      </Suspense>
    </div>
  );
}

const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

async function Exercise({ params }: { params: Promise<{ id: string; exercice: string }> }) {
  const viewer = await requireViewer("student");
  const { id, exercice } = await params;
  if (!z.uuid().safeParse(id).success || !z.uuid().safeParse(exercice).success) notFound();

  const t = await getTranslations("student.homework");
  const tLesson = await getTranslations("lesson");
  const data = await getMyExercise(viewer.id, id, exercice);
  if (!data) notFound();

  const labels = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, tLesson(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;
  const draw = (document: StoredLesson) =>
    renderLesson(document, {
      calloutLabel: (kind) => labels[kind],
      fileHref: (path) => `/cours/fichiers/${path}`,
    });

  const { homework, exercise, position, work } = data;
  const target = { assignmentId: homework.id, exerciseId: exercise.id };
  // Only an active student hands work in; a paused one keeps reading (D-060).
  const canHandIn = viewer.status === "actif";
  const workLabel =
    work.kind === "graded"
      ? t("work.graded", { grade: gradeFormat.format(work.grade) })
      : t(`work.${work.kind}`);

  const handedInPages = (
    <PageGrid
      pages={data.submission?.pages ?? []}
      label={(number) => t("photos.page", { number })}
    />
  );

  let answer: ReactNode = null;
  if (work.kind === "todo" && !canHandIn) {
    answer = (
      <p className="text-sm">
        {viewer.status === "arrete" ? t("exercise.stopped") : t("exercise.paused")}
      </p>
    );
  } else if (work.kind === "handedIn" && !work.changeable) {
    // Waiting for the tutor, but the grading would refuse a new list (D-046).
    answer = (
      <div className="grid gap-4">
        <p className="text-sm">{t("photos.frozen")}</p>
        {handedInPages}
      </div>
    );
  } else if (
    work.kind === "todo" ||
    (work.kind === "handedIn" && exercise.answerType === "upload")
  ) {
    answer =
      exercise.answerType === "numeric" ? (
        <NumericAnswer {...target} />
      ) : exercise.answerType === "mcq" ? (
        <ChoiceAnswer {...target} choices={exercise.choices} mode={exercise.choiceMode} />
      ) : canHandIn ? (
        <PhotoAnswer
          // Drawn afresh once pages are handed in: the list then opens read-only.
          key={(data.submission?.pages ?? []).map((page) => page.path).join(",")}
          {...target}
          studentId={viewer.id}
          reference={data.draftReference}
          handedIn={work.kind === "handedIn"}
          initialPages={[
            ...(data.submission?.pages ?? []).map((page) => ({ ...page, handedIn: true })),
            ...data.drafts.map((page) => ({ ...page, handedIn: false })),
          ]}
        />
      ) : (
        handedInPages
      );
  } else if (work.kind === "graded") {
    answer = <GradedAnswer data={data} grade={work.grade} />;
  } else if (work.kind === "revealed") {
    answer = <p className="text-sm">{t("exercise.revealedNote")}</p>;
  } else if (work.kind === "doneElsewhere") {
    answer = <p className="text-sm">{t("exercise.doneElsewhere")}</p>;
  }

  return (
    <article className="grid gap-6">
      <Link
        href={`/eleve/devoirs/${homework.id}`}
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("exercise.backToHomework")}
      </Link>

      <header className="grid gap-2">
        <p className="text-sm text-encre-douce">
          {homework.title} ·{" "}
          {t("exercise.position", { index: position.index + 1, count: position.count })}
        </p>
        <h1 className="text-2xl font-semibold">{exercise.title}</h1>
        <WorkChip work={work} label={workLabel} />
      </header>

      <section aria-labelledby="exercise-statement" className="grid gap-2">
        <h2 id="exercise-statement" className="sr-only">
          {t("exercise.statement")}
        </h2>
        <div className="lecon-corps">{draw(exercise.statement)}</div>
      </section>

      <section
        aria-labelledby="exercise-answer"
        className="grid gap-4 rounded-md border border-quadrillage p-4"
      >
        <h2 id="exercise-answer" className="text-base font-semibold">
          {t("exercise.answer")}
        </h2>
        {/* A number or a choice is graded on the spot: the form gives way to the verdict, and
            its errors appear, where a screen reader hears them. Pages are announced by their
            own status lines. */}
        <div aria-live={exercise.answerType === "upload" ? undefined : "polite"}>{answer}</div>
      </section>

      {work.kind === "todo" && canHandIn ? <RevealSolution {...target} /> : null}

      {data.submission?.feedback ? (
        <section aria-labelledby="exercise-feedback" className="grid gap-1">
          <h2 id="exercise-feedback" className="text-base font-semibold">
            {t("exercise.feedback")}
          </h2>
          <p className="whitespace-pre-line">{data.submission.feedback}</p>
        </section>
      ) : null}

      {data.solution ? (
        <section aria-labelledby="exercise-solution" className="grid gap-2">
          <h2 id="exercise-solution" className="text-base font-semibold">
            {t("exercise.solution")}
          </h2>
          <div className="lecon-corps">{draw(data.solution.document)}</div>
        </section>
      ) : null}

      <nav className="flex flex-wrap justify-between gap-2 border-t border-quadrillage pt-4">
        {position.previous ? (
          <Link
            href={`/eleve/devoirs/${homework.id}/${position.previous}`}
            className="inline-flex min-h-11 items-center text-sm underline underline-offset-4"
          >
            ← {t("exercise.previous")}
          </Link>
        ) : (
          <span />
        )}
        {position.next ? (
          <Link
            href={`/eleve/devoirs/${homework.id}/${position.next}`}
            className="inline-flex min-h-11 items-center text-sm underline underline-offset-4"
          >
            {t("exercise.next")} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}

async function GradedAnswer({ data, grade }: { data: MyExercise; grade: number }) {
  const t = await getTranslations("student.homework");
  const { exercise, submission, solution } = data;
  const right = grade === 20;
  // Right or wrong comes from the database's grading. Once the tutor sets the grade herself,
  // the grade says it, and a verdict could only contradict it (D-047).
  const verdict = submission?.autoGraded ?? false;

  if (exercise.answerType === "numeric") {
    const given = submission?.answer.raw ?? "";
    const expected = solution?.correctNumeric;
    return (
      <div className="grid gap-2">
        <p>{t("numeric.yours", { value: given })}</p>
        {verdict ? (
          <Verdict right={right} text={right ? t("numeric.right") : t("numeric.wrong")} />
        ) : (
          <GradeMark grade={gradeFormat.format(grade)} label={t("exercise.gradeLabel")} circled />
        )}
        {expected ? (
          <p className="text-sm text-encre-douce">
            {t("numeric.expected", {
              value: formatDecimal(parseDecimal(expected) ?? expected),
            })}
          </p>
        ) : null}
      </div>
    );
  }

  if (exercise.answerType === "mcq") {
    const picked = new Set(submission?.answer.choiceIds ?? []);
    const correct = new Set(solution?.correctChoiceIds ?? []);
    return (
      <div className="grid gap-3">
        {verdict ? (
          <Verdict right={right} text={right ? t("mcq.resultRight") : t("mcq.resultWrong")} />
        ) : (
          <GradeMark grade={gradeFormat.format(grade)} label={t("exercise.gradeLabel")} circled />
        )}
        <ul className="grid gap-2">
          {exercise.choices.map((choice) => (
            <li
              key={choice.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-quadrillage px-3 py-2"
            >
              <span className="lecon-corps min-w-0 grow basis-40 text-base">
                {renderMathText(choice.label)}
              </span>
              {picked.has(choice.id) ? (
                <span className="text-xs font-medium text-encre-douce">{t("mcq.yours")}</span>
              ) : null}
              {correct.has(choice.id) ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-stylo-bleu">
                  <Check aria-hidden="true" className="size-3.5" />
                  {t("mcq.right")}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Her pages as the tutor marked them, each remark numbered on the page and beside it (D-047).
  const pages = submission?.pages ?? [];
  const arranged = arrangeRemarks(
    pages.map((page) => page.path),
    submission?.remarks ?? [],
  );
  const remarkList = (remarks: NumberedRemark[], label: string) =>
    remarks.length === 0 ? null : (
      <ol className="grid gap-2" aria-label={label}>
        {remarks.map((remark) => (
          <li
            key={remark.id}
            className="flex items-start gap-3 rounded-md border border-quadrillage bg-surface p-3"
          >
            <RemarkNumber number={remark.number} />
            <p className="min-w-0 break-words whitespace-pre-line">{remark.body}</p>
          </li>
        ))}
      </ol>
    );

  return (
    <div className="grid gap-6">
      <GradeMark grade={gradeFormat.format(grade)} label={t("exercise.gradeLabel")} circled />
      {pages.map((page, index) => {
        const remarks = arranged.pages[index]?.remarks ?? [];
        const label = t("photos.page", { number: index + 1 });
        return (
          <section key={page.path} aria-label={label} className="grid gap-3">
            <h3 className="text-sm font-semibold">{label}</h3>
            <AnnotatedPage
              url={page.url}
              alt={label}
              openLabel={t("exercise.openPage")}
              marks={remarks.flatMap((remark) =>
                remark.anchor?.x != null && remark.anchor.y != null
                  ? [
                      {
                        key: remark.id,
                        label: String(remark.number),
                        x: remark.anchor.x,
                        y: remark.anchor.y,
                      },
                    ]
                  : [],
              )}
            />
            {remarkList(remarks, t("exercise.remarksOn", { number: index + 1 }))}
          </section>
        );
      })}
      {arranged.elsewhere.length > 0 ? (
        <section aria-labelledby="remarks-elsewhere" className="grid gap-2">
          <h3 id="remarks-elsewhere" className="text-sm font-semibold">
            {t("exercise.remarksElsewhere")}
          </h3>
          {remarkList(arranged.elsewhere, t("exercise.remarksElsewhere"))}
        </section>
      ) : null}
    </div>
  );
}

function Verdict({ right, text }: { right: boolean; text: string }) {
  const Icon = right ? Check : X;
  return (
    <p
      className={
        right
          ? "flex items-center gap-2 font-medium"
          : "flex items-center gap-2 font-medium text-stylo-rouge"
      }
    >
      <Icon aria-hidden="true" className="size-5" />
      {text}
    </p>
  );
}
