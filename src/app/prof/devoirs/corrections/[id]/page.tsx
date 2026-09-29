import { Check, Eye } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { z } from "zod";
import { LateBadge } from "@/components/late-badge";
import { requireViewer } from "@/lib/auth";
import { arrangeRemarks } from "@/lib/correction/correction";
import { getCorrection, type Correction } from "@/lib/correction/queries";
import { formatLocal } from "@/lib/dates";
import { formatDecimal, parseDecimal } from "@/lib/decimal";
import { CALLOUT_KINDS, type CalloutKind, type StoredLesson } from "@/lib/lesson/document";
import { renderMathText } from "@/lib/lesson/math-text";
import { renderLesson } from "@/lib/lesson/render";
import { CorrectionForm } from "./correction-form";
import { CorrectionPages } from "./correction-pages";
// Statements and solutions are drawn as lessons are: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tutor.correction");
  return { title: t("title") };
}

export default async function CorrectionPage({
  params,
}: PageProps<"/prof/devoirs/corrections/[id]">) {
  const t = await getTranslations("tutor.correction");

  return (
    <div className="grid max-w-6xl gap-6">
      <Link
        href="/prof/devoirs/corrections"
        className="inline-flex min-h-11 items-center justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        {t("back")}
      </Link>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-md bg-sunken" />}>
        <CorrectionView params={params} />
      </Suspense>
    </div>
  );
}

/** A decimal read back as `grade::text` (« 15.50 »), as the tutor types it (« 15,5 »). */
function typedGrade(grade: string | null): string {
  if (grade === null) return "";
  return formatDecimal(parseDecimal(grade) ?? grade);
}

async function CorrectionView({ params }: { params: Promise<{ id: string }> }) {
  await requireViewer("tutor");
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const t = await getTranslations("tutor.correction");
  const tLesson = await getTranslations("lesson");
  const data = await getCorrection(id);
  if (!data) notFound();

  const labels = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, tLesson(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;
  const draw = (document: StoredLesson) =>
    renderLesson(document, {
      calloutLabel: (kind) => labels[kind],
      fileHref: (path) => `/cours/fichiers/${path}`,
    });

  const corrected = data.status === "corrige";
  const arranged = arrangeRemarks(
    data.pages.map((page) => page.path),
    data.remarks,
  );
  const date = (value: string) => formatLocal(value, "EEEE d MMMM 'à' HH:mm");

  return (
    <article className="grid gap-6">
      <header className="grid gap-2">
        <p className="text-sm text-encre-douce">
          <Link
            href={`/prof/devoirs/${data.homework.id}`}
            className="underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
          >
            {data.homework.title}
          </Link>
        </p>
        <h1 className="text-xl font-semibold">
          {data.student.name}
          <span className="font-normal text-encre-douce"> · {data.exercise.title}</span>
        </h1>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm" role="list">
          <li>
            {corrected ? (
              <span className="inline-flex items-center gap-1 font-medium">
                <Check aria-hidden="true" className="size-4" />
                {t("correctedOn", {
                  grade: typedGrade(data.grade),
                  date: date(data.correctedAt ?? data.submittedAt),
                })}
              </span>
            ) : (
              <span className="font-medium text-stylo-bleu">
                {t("waitingSince", { date: date(data.submittedAt) })}
              </span>
            )}
          </li>
          {data.late ? (
            <li>
              <LateBadge label={t("late", { due: date(data.homework.dueAt) })} />
            </li>
          ) : null}
          {data.revealedAt ? (
            <li className="inline-flex items-center gap-1 text-encre-douce">
              <Eye aria-hidden="true" className="size-4" />
              {t("revealed", { date: date(data.revealedAt) })}
            </li>
          ) : null}
        </ul>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section aria-labelledby="copy-heading" className="grid min-w-0 gap-4">
          <h2 id="copy-heading" tabIndex={-1} className="text-base font-semibold">
            {t("copy")}
          </h2>
          {data.exercise.answerType === "upload" ? (
            data.pages.length === 0 ? (
              <p className="text-sm text-encre-douce">{t("noPages")}</p>
            ) : (
              <CorrectionPages
                submissionId={data.id}
                pages={data.pages}
                remarks={Object.fromEntries(
                  arranged.pages.map((page) => [page.path, page.remarks]),
                )}
                elsewhere={arranged.elsewhere}
              />
            )
          ) : (
            <AnswerSummary data={data} />
          )}
        </section>

        {/* Scrolls on its own when the statement and the solution are both open. */}
        <div className="grid gap-6 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto">
          <section
            aria-labelledby="correction-heading"
            className="grid gap-4 rounded-md border border-quadrillage bg-surface p-4"
          >
            <h2 id="correction-heading" className="text-base font-semibold">
              {t("correction")}
            </h2>
            {corrected ? null : <p className="text-sm text-encre-douce">{t("hiddenUntil")}</p>}
            <CorrectionForm
              id={data.id}
              submittedAt={data.submittedAt}
              submittedAtLabel={date(data.submittedAt)}
              corrected={corrected}
              grade={typedGrade(data.grade)}
              feedback={data.feedback ?? ""}
              nextHref={data.next ? `/prof/devoirs/corrections/${data.next}` : null}
            />
          </section>

          <details className="group rounded-md border border-quadrillage p-4">
            <summary className="cursor-pointer font-medium">{t("statement")}</summary>
            <div className="lecon-corps mt-3">{draw(data.exercise.statement)}</div>
          </details>
          {data.solution ? (
            <details className="rounded-md border border-quadrillage p-4">
              <summary className="cursor-pointer font-medium">{t("solution")}</summary>
              <div className="lecon-corps mt-3">{draw(data.solution.document)}</div>
            </details>
          ) : null}
        </div>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-2 border-t border-quadrillage pt-4 text-sm">
        <span className="text-encre-douce">{t("waiting", { count: data.waiting })}</span>
        {data.next ? (
          <Link
            href={`/prof/devoirs/corrections/${data.next}`}
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            {t("next")} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}

async function AnswerSummary({ data }: { data: Correction }) {
  const t = await getTranslations("tutor.correction");

  if (data.exercise.answerType === "numeric") {
    const expected = data.solution?.correctNumeric;
    return (
      <div className="grid gap-1 rounded-md border border-quadrillage p-4">
        <p>{t("numericGiven", { value: data.answer.raw ?? "" })}</p>
        {expected ? (
          <p className="text-sm text-encre-douce">
            {t("numericExpected", { value: formatDecimal(parseDecimal(expected) ?? expected) })}
          </p>
        ) : null}
        {data.autoGraded ? <p className="text-sm text-encre-douce">{t("autoGraded")}</p> : null}
      </div>
    );
  }

  const picked = new Set(data.answer.choiceIds);
  const right = new Set(data.solution?.correctChoiceIds ?? []);
  return (
    <div className="grid gap-2">
      <ul className="grid gap-2">
        {data.exercise.choices.map((choice) => (
          <li
            key={choice.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-quadrillage px-3 py-2"
          >
            <span className="lecon-corps min-w-0 grow basis-40 text-base">
              {renderMathText(choice.label)}
            </span>
            {picked.has(choice.id) ? (
              <span className="text-xs font-medium text-encre-douce">{t("choicePicked")}</span>
            ) : null}
            {right.has(choice.id) ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-stylo-bleu">
                <Check aria-hidden="true" className="size-3.5" />
                {t("choiceRight")}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      {data.autoGraded ? <p className="text-sm text-encre-douce">{t("autoGraded")}</p> : null}
    </div>
  );
}
