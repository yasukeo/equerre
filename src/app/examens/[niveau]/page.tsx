import { FileDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { getProgrammeExams, listExamProgrammes, type ExamPaper } from "@/lib/exams/queries";
import { formatFileSize } from "@/lib/lesson/file-size";

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
    <main id="contenu" className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8">
      <Suspense
        fallback={<div aria-hidden="true" className="h-72 animate-pulse rounded-md bg-sunken" />}
      >
        <ProgrammeExams params={params} />
      </Suspense>
    </main>
  );
}

async function ProgrammeExams({ params }: { params: Promise<{ niveau: string }> }) {
  const [t, exams] = await Promise.all([
    getTranslations("exams"),
    params.then(({ niveau }) => getProgrammeExams(niveau)),
  ]);
  if (!exams) notFound();
  const link =
    "inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre";

  return (
    <article className="grid gap-8">
      <header className="grid gap-3">
        <Link href="/examens" className={`${link} justify-self-start text-sm`}>
          {t("back")}
        </Link>
        <h1 className="text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_90]">
          {t("programmeTitle", { programme: exams.label })}
        </h1>
        <p className="text-encre-douce">{t("programmeLead")}</p>
        <Link href={`/cours/${exams.slug}`} className={`${link} justify-self-start`}>
          {t("toProgramme")}
        </Link>
      </header>

      {exams.years.length === 0 ? (
        <p className="rounded-md border border-dashed border-trait px-4 py-5">{t("empty")}</p>
      ) : (
        exams.years.map(({ year, papers }) => (
          <section key={year} aria-labelledby={`annee-${year}`} className="grid gap-3">
            <h2 id={`annee-${year}`} className="text-lg font-semibold">
              {year}
            </h2>
            <ul
              role="list"
              className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage"
            >
              {papers.map((paper) => (
                <Paper key={paper.id} paper={paper} />
              ))}
            </ul>
          </section>
        ))
      )}
    </article>
  );
}

async function Paper({ paper }: { paper: ExamPaper }) {
  const t = await getTranslations("exams");
  const name = `${t(`session.${paper.session}`)}${paper.track ? `\u00a0· ${paper.track}` : ""}`;
  const files = [
    { href: paper.subjectUrl, label: t("subject"), size: paper.subjectSize },
    ...(paper.solutionUrl && paper.solutionSize !== null
      ? [{ href: paper.solutionUrl, label: t("solution"), size: paper.solutionSize }]
      : []),
  ];

  return (
    <li className="grid gap-1 bg-surface px-4 py-3">
      <h3 className="font-semibold">{name}</h3>
      <ul role="list" className="flex flex-wrap gap-x-5">
        {files.map((file) => (
          <li key={file.href}>
            {/* A plain link: the file is the ministry's PDF, served as it is. */}
            <a
              href={file.href}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
            >
              <FileDown aria-hidden="true" className="size-4 shrink-0" />
              {file.label}
              <span className="font-normal text-encre-douce">
                {t("fileSize", { size: formatFileSize(file.size) })}
              </span>
              <span className="sr-only">{`, ${paper.year}, ${name}`}</span>
            </a>
          </li>
        ))}
      </ul>
      {paper.solutionUrl ? null : <p className="text-sm text-encre-douce">{t("noSolution")}</p>}
    </li>
  );
}
