import { FileDown, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LessonArticle } from "@/components/lesson-article";
import { PdfLinks } from "@/components/pdf-links";
import { EXAM_HUE, hue } from "@/lib/design/colors";
import { getExamCorrection, listExamCorrections } from "@/lib/exams/queries";
import { correctionTitle } from "@/lib/exams/titles";
import { formatFileSize } from "@/lib/lesson/file-size";
import { programmeName } from "@/lib/lesson/streams";
import { frenchSpaces } from "@/lib/typography";
// Only the correction pages set maths under /examens.
import "katex/dist/katex.min.css";
import "@/app/cours/lecon.css";

// Équerre's own correction of a national exam the ministry published no answers for (D-103):
// read like a course, printed like one, and never passed off as the ministry's.

export async function generateStaticParams(): Promise<{ niveau: string; sujet: string }[]> {
  const corrections = await listExamCorrections();
  // Cache Components fails the build on an empty list: one placeholder, which 404s.
  return corrections.length > 0 ? corrections : [{ niveau: "2bac-sciences-maths", sujet: "-" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/examens/[niveau]/[sujet]">): Promise<Metadata> {
  const { niveau, sujet } = await params;
  const [t, correction] = await Promise.all([
    getTranslations("exams"),
    getExamCorrection(niveau, sujet),
  ]);
  if (!correction) return {};
  // Short enough for a tab or a search result: the year, the session and the stream come first.
  const facts = {
    year: correction.year,
    session: t(`sessionInTitle.${correction.session}`),
    programme: programmeName(correction.programmeLabel),
  };
  return {
    title: t("correctionMetaTitle", facts),
    description: `${t("correctionMetaDescription", facts)} ${correction.summary}`,
    alternates: { canonical: `/examens/${correction.programmeSlug}/${sujet}` },
  };
}

export default function ExamCorrectionPage({ params }: PageProps<"/examens/[niveau]/[sujet]">) {
  // `params` is awaited inside the boundary, as on a lesson's page.
  return (
    <main id="contenu" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <Suspense fallback={<CorrectionSkeleton />}>
        <Correction params={params} />
      </Suspense>
    </main>
  );
}

async function Correction({ params }: { params: Promise<{ niveau: string; sujet: string }> }) {
  const [t, tCourse, correction] = await Promise.all([
    getTranslations("exams"),
    getTranslations("lesson"),
    params.then(({ niveau, sujet }) => getExamCorrection(niveau, sujet)),
  ]);
  if (!correction) notFound();
  const colour = hue(EXAM_HUE);
  const programme = programmeName(correction.programmeLabel);
  const crumb =
    "inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre";

  return (
    <LessonArticle
      title={correctionTitle(t, correction)}
      summary={correction.summary}
      publishedAt={correction.publishedAt}
      context={
        <nav aria-label={tCourse("breadcrumb")} className="print:hidden">
          <ol role="list" className="flex flex-wrap items-center gap-x-2">
            <li className="flex items-center gap-x-2">
              <Link href="/examens" className={crumb}>
                {t("title")}
              </Link>
            </li>
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">›</span>
              <Link
                href={`/examens/${correction.programmeSlug}#annee-${correction.year}`}
                className={crumb}
              >
                {programme}
              </Link>
            </li>
          </ol>
        </nav>
      }
      badge={{ label: t("correctionKind"), colour }}
      downloads={
        <div className="grid gap-4">
          <p className={`flex gap-2 rounded-xl px-4 py-3 text-sm ${colour.chip}`}>
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {frenchSpaces(t("notOfficial"))}
              {correction.language === "ar" ? ` ${frenchSpaces(t("arabicSubject"))}` : null}
            </span>
          </p>
          <div className="flex flex-wrap items-start gap-2">
            {/* The paper as it was given: a plain link to its PDF. */}
            <a
              href={correction.subjectUrl}
              hrefLang={correction.language}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-trait bg-surface px-3 text-sm font-semibold hover:border-encre"
            >
              <FileDown aria-hidden="true" className="size-4 shrink-0" />
              {correction.official ? t("subjectPdf") : t("subject")}
              <span className="text-xs font-normal text-encre-douce">
                {formatFileSize(correction.subjectSize)}
              </span>
            </a>
            <PdfLinks
              id={correction.id}
              version={correction.version}
              kind="cours"
              title={correctionTitle(t, correction)}
            />
          </div>
        </div>
      }
      content={correction.content}
    />
  );
}

function CorrectionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse" aria-hidden="true">
      <div className="h-4 w-40 rounded bg-quadrillage" />
      <div className="mt-4 h-10 w-3/4 rounded bg-quadrillage" />
      <div className="mt-10 space-y-3">
        <div className="h-4 w-full rounded bg-quadrillage" />
        <div className="h-4 w-11/12 rounded bg-quadrillage" />
        <div className="h-4 w-4/5 rounded bg-quadrillage" />
      </div>
    </div>
  );
}
