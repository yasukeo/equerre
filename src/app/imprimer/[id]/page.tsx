import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { CALLOUT_KINDS, type CalloutKind } from "@/lib/lesson/document";
import { correctionTitle } from "@/lib/exams/titles";
import { getPrintableCorrection, getPrintableLesson } from "@/lib/lesson/readable";
import { renderLesson } from "@/lib/lesson/render";
import { frenchSpaces } from "@/lib/typography";
// The sheet is drawn as the page is: same maths, same encadrés.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";
import "./impression.css";

export async function generateMetadata({ params }: PageProps<"/imprimer/[id]">): Promise<Metadata> {
  const { id } = await params;
  const lesson = await getPrintableLesson(id);
  const correction = lesson ? null : await getPrintableCorrection(id);
  const title = lesson
    ? lesson.title
    : correction
      ? correctionTitle(await getTranslations("exams"), correction)
      : undefined;
  return { title, robots: { index: false, follow: false } };
}

/**
 * A document laid out on A4 for printing (D-096): what the PDF route prints, and a page a reader
 * may print herself. Read through her session, like every other lesson page.
 */
export default function PrintPage({ params, searchParams }: PageProps<"/imprimer/[id]">) {
  return (
    <Suspense fallback={null}>
      <Printable params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Printable({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const lesson = await getPrintableLesson(id);
  const correction = lesson ? null : await getPrintableCorrection(id);
  if (!lesson && !correction) notFound();

  const [t, tPrint, tKind, tExams] = await Promise.all([
    getTranslations("lesson"),
    getTranslations("pdf"),
    getTranslations("documentKind"),
    getTranslations("exams"),
  ]);
  const callout = Object.fromEntries(
    CALLOUT_KINDS.map((kind) => [kind, t(`callout.${kind}`)]),
  ) as Record<CalloutKind, string>;

  if (correction) {
    // Équerre's correction of a national exam (D-103): the sheet says it is not the ministry's.
    return (
      <main className="impression">
        <header className="impression-entete">
          <p className="impression-marque">
            {siteConfig.brand} · {siteConfig.tutorName}
          </p>
          <p>
            {correction.programmeLabel} · {tExams("nationalExam", { year: correction.year })}
          </p>
        </header>

        <p className="impression-type">{tExams("correctionKind")}</p>
        <h1 className="impression-titre">{frenchSpaces(correctionTitle(tExams, correction))}</h1>
        <p className="impression-resume">{frenchSpaces(correction.summary)}</p>
        <p className="impression-avis">
          {frenchSpaces(tExams("notOfficial"))}
          {correction.language === "ar" ? ` ${frenchSpaces(tExams("arabicSubject"))}` : null}
        </p>

        <div className="lecon-corps">
          {renderLesson(correction.content, {
            calloutLabel: (kind) => callout[kind],
            fileHref: (path) => `/cours/fichiers/${path}`,
            solutions: "show",
          })}
        </div>
      </main>
    );
  }
  if (!lesson) notFound();
  // Series and tests come as statements or with their corrections; a course is printed whole.
  const exercises = lesson.kind === "serie" || lesson.kind === "devoir";
  const withSolutions = !exercises || query.corriges === "1";

  return (
    <main className="impression">
      <header className="impression-entete">
        <p className="impression-marque">
          {siteConfig.brand} · {siteConfig.tutorName}
        </p>
        <p>
          {lesson.programmeLabel} · {lesson.chapterTitle}
        </p>
      </header>

      <p className="impression-type">
        {tKind(`one.${lesson.kind}`)}
        {exercises ? ` · ${withSolutions ? tPrint("withSolutions") : tPrint("statements")}` : null}
      </p>
      <h1 className="impression-titre">{frenchSpaces(lesson.title)}</h1>
      {lesson.summary ? <p className="impression-resume">{frenchSpaces(lesson.summary)}</p> : null}

      <div className="lecon-corps">
        {renderLesson(lesson.content, {
          calloutLabel: (kind) => callout[kind],
          fileHref: (path) => `/cours/fichiers/${path}`,
          exerciseLabels: {
            exercise: (number) => t("exercise", { number }),
            solution: t("solution"),
            show: t("showSolution"),
            hide: t("hideSolution"),
            of: (number) => t("solutionOf", { number }),
          },
          solutions: withSolutions ? "show" : "hide",
        })}
      </div>
    </main>
  );
}
