import { FileDown, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { BandStats, PageBand } from "@/components/course/page-band";
import { EXAM_HUE, hue } from "@/lib/design/colors";
import { getProgrammeExams, listExamProgrammes, type ExamPaper } from "@/lib/exams/queries";
import { formatFileSize } from "@/lib/lesson/file-size";
import { programmeName } from "@/lib/lesson/streams";
import { cn } from "@/lib/utils";

export async function generateStaticParams(): Promise<{ niveau: string }[]> {
  const programmes = await listExamProgrammes();
  // Cache Components fails the build on an empty list: one placeholder, which 404s.
  return programmes.length > 0
    ? programmes.map((programme) => ({ niveau: programme.slug }))
    : [{ niveau: "2bac-sciences-mathematiques" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/examens/[niveau]">): Promise<Metadata> {
  const { niveau } = await params;
  const [t, exams] = await Promise.all([getTranslations("exams"), getProgrammeExams(niveau)]);
  if (!exams) return {};
  return {
    title: t("programmeTitle", { programme: exams.label }),
    description: t("programmeDescription", { programme: exams.label }),
    alternates: { canonical: `/examens/${exams.slug}` },
  };
}

export default function ProgrammeExamsPage({ params }: PageProps<"/examens/[niveau]">) {
  return (
    <main id="contenu">
      <Suspense
        fallback={
          <div aria-hidden="true" className="grid gap-6">
            <div className="h-64 animate-pulse bg-sunken" />
            <div className="mx-auto h-96 w-full max-w-5xl animate-pulse rounded-2xl bg-sunken" />
          </div>
        }
      >
        <ProgrammeExams params={params} />
      </Suspense>
    </main>
  );
}

async function ProgrammeExams({ params }: { params: Promise<{ niveau: string }> }) {
  const [t, tProgramme, exams] = await Promise.all([
    getTranslations("exams"),
    getTranslations("programmePage"),
    params.then(({ niveau }) => getProgrammeExams(niveau)),
  ]);
  if (!exams) notFound();
  const colour = hue(EXAM_HUE);
  const papers = exams.years.flatMap((year) => year.papers);
  const answered = papers.filter((paper) => paper.solutionUrl !== null).length;

  return (
    <>
      <PageBand colour={colour.band}>
        <nav aria-label={tProgramme("breadcrumb")} className="text-sm">
          <ol role="list" className="flex flex-wrap items-center gap-x-2 text-white">
            <li>
              <Link
                href="/examens"
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                {t("title")}
              </Link>
            </li>
            {/* The separator goes with the item after it, so a wrapped line never ends on it. */}
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">›</span>
              {programmeName(exams.label)}
            </li>
          </ol>
        </nav>
        <h1 className="grid gap-1 leading-[1.05] font-semibold text-balance [font-variation-settings:'HEXP'_45]">
          <span className="text-base font-medium tracking-[0.08em] text-white uppercase">
            {t("title")}
          </span>
          <span className="text-[clamp(2rem,1.5rem+2.5vw,3.25rem)]">
            {programmeName(exams.label)}
          </span>
        </h1>
        <p className="max-w-2xl text-white">{t("programmeLead")}</p>
        {papers.length > 0 ? (
          <BandStats
            colour={colour.text}
            stats={[
              { value: papers.length, label: t("statPapers", { count: papers.length }) },
              {
                value: exams.years.length,
                label: t("statYearCount", { count: exams.years.length }),
              },
              { value: answered, label: t("statAnswered") },
            ]}
          />
        ) : null}
      </PageBand>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-8">
        <nav aria-label={tProgramme("sections")} className="flex flex-wrap gap-2">
          <Link
            href={`/cours/${exams.slug}`}
            className="inline-flex min-h-11 items-center rounded-full border border-trait bg-surface px-4 text-sm font-medium hover:border-encre"
          >
            {tProgramme("tabChapters")}
          </Link>
          <span
            aria-current="page"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-encre px-4 text-sm font-medium text-papier"
          >
            {tProgramme("tabExams")}
            <span className={cn("rounded-full px-2 py-0.5 text-xs", colour.chip)}>
              {papers.length}
            </span>
          </span>
        </nav>

        {exams.years.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-5 py-5">
            {t("empty")}
          </p>
        ) : (
          <>
            {/* The years, to jump to one: the list runs long. */}
            {exams.years.length > 3 ? (
              <nav aria-label={t("years")} className="flex flex-wrap gap-1.5">
                {exams.years.map(({ year }) => (
                  <a
                    key={year}
                    href={`#annee-${year}`}
                    className={cn(
                      "inline-flex min-h-11 min-w-14 items-center justify-center rounded-xl px-3 text-sm font-semibold tabular-nums",
                      colour.chip,
                    )}
                  >
                    {year}
                  </a>
                ))}
              </nav>
            ) : null}

            {exams.years.map(({ year, papers }) => (
              <section
                key={year}
                id={`annee-${year}`}
                aria-labelledby={`annee-${year}-titre`}
                className="grid gap-3 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6"
              >
                <h2
                  id={`annee-${year}-titre`}
                  className={cn(
                    "text-3xl font-semibold tabular-nums md:sticky md:top-24 md:self-start",
                    colour.text,
                  )}
                >
                  {year}
                </h2>
                <ul role="list" className="grid gap-3 sm:grid-cols-2">
                  {papers.map((paper) => (
                    <Paper key={paper.id} paper={paper} />
                  ))}
                </ul>
              </section>
            ))}

            {exams.official ? (
              <p className="border-t border-quadrillage pt-6 text-sm text-encre-douce">
                {t.rich("officialSource", {
                  link: (chunks) => (
                    <a
                      href="https://cnee.men.gov.ma/WebNational.aspx"
                      className="underline decoration-trait underline-offset-4 hover:decoration-encre"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

async function Paper({ paper }: { paper: ExamPaper }) {
  const t = await getTranslations("exams");
  const colour = hue(EXAM_HUE);
  const session = t(`session.${paper.session}`);
  const name = `${session}${paper.track ? ` · ${paper.track}` : ""}`;
  // The ministry's correction is « éléments de réponse »: the marking guide, not a worked answer.
  const files = [
    { href: paper.subjectUrl, label: t("subject"), size: paper.subjectSize, main: true },
    ...(paper.solutionUrl && paper.solutionSize !== null
      ? [
          {
            href: paper.solutionUrl,
            label: paper.official ? t("officialAnswers") : t("solution"),
            size: paper.solutionSize,
            main: false,
          },
        ]
      : []),
  ];

  return (
    <li
      className={cn(
        "grid content-between gap-3 rounded-2xl border border-s-4 border-quadrillage bg-surface p-4",
        paper.session === "normale" ? colour.edge : "border-s-trait",
      )}
    >
      <div className="grid gap-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
              paper.session === "normale" ? colour.chip : "bg-sunken text-encre-douce",
            )}
          >
            {session}
          </span>
          {paper.language === "ar" ? (
            <span className="rounded-full border border-trait px-2.5 py-0.5 text-xs text-encre-douce">
              {t("arabic")}
            </span>
          ) : null}
        </div>
        <h3 className="font-semibold">
          <span className="sr-only">{`${session}, `}</span>
          {paper.track ? paper.track : t("paperTitle", { year: paper.year })}
        </h3>
      </div>
      <ul role="list" className="flex flex-wrap gap-2">
        {files.map((file) => (
          <li key={file.href}>
            {/* A plain link: the file is the ministry's PDF, served as it is. */}
            <a
              href={file.href}
              hrefLang={paper.language}
              className={cn(
                "inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold",
                file.main
                  ? "bg-encre text-papier hover:bg-encre/90"
                  : "border border-trait bg-surface hover:border-encre",
              )}
            >
              <FileDown aria-hidden="true" className="size-4 shrink-0" />
              {file.label}
              <span
                className={cn("text-xs font-normal", file.main ? "opacity-80" : "text-encre-douce")}
              >
                {formatFileSize(file.size)}
              </span>
              <span className="sr-only">{`, ${paper.year}, ${name}${paper.language === "ar" ? `, ${t("arabic")}` : ""}`}</span>
            </a>
          </li>
        ))}
        {paper.correctionHref ? (
          <li>
            {/* Équerre's own correction (D-103): a page of the site, not one of the ministry's files. */}
            <Link
              href={paper.correctionHref}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-trait bg-surface px-3 text-sm font-semibold hover:border-encre"
            >
              <FileText aria-hidden="true" className={cn("size-4 shrink-0", colour.text)} />
              {t("ourCorrection")}
              <span className="sr-only">{`, ${paper.year}, ${name}`}</span>
            </Link>
          </li>
        ) : null}
      </ul>
      {paper.solutionUrl || paper.correctionHref ? null : (
        <p className="text-sm text-encre-douce">{t("noSolution")}</p>
      )}
    </li>
  );
}
