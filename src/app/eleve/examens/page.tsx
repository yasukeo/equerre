import { ArrowLeft, Check, Timer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { getProgrammeExams } from "@/lib/exams/queries";
import { listProgrammes } from "@/lib/lesson/queries";
import { programmeName } from "@/lib/lesson/streams";
import { listMyExamAttempts, PAPER_MINUTES } from "@/lib/student/progress";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.exam");
  return { title: t("title") };
}

export default async function StudentExamsPage() {
  const [t, tProgress] = await Promise.all([
    getTranslations("student.exam"),
    getTranslations("student.progress"),
  ]);
  return (
    <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-3xl gap-6">
      <Link
        href="/eleve/cours"
        className="inline-flex min-h-11 items-center gap-1.5 justify-self-start text-sm underline decoration-trait underline-offset-4 hover:decoration-encre"
      >
        <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        {tProgress("reviseTitle")}
      </Link>
      <header className="grid gap-2">
        <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
          {t("title")}
        </h1>
        <p className="max-w-prose text-encre-douce">{t("lead")}</p>
      </header>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Papers />
      </Suspense>
    </div>
  );
}

async function Papers() {
  const viewer = await requireViewer("student");
  const [t, tExams, programmes, attempts] = await Promise.all([
    getTranslations("student.exam"),
    getTranslations("exams"),
    listProgrammes(),
    listMyExamAttempts(viewer),
  ]);
  const programme = programmes.find((entry) => entry.code === viewer.programmeCode);
  const exams = programme ? await getProgrammeExams(programme.slug) : null;
  if (!programme || !exams || exams.years.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-6 text-encre-douce">
        {t("none")}
      </p>
    );
  }

  const byExam = new Map<string, typeof attempts>();
  for (const attempt of attempts) {
    byExam.set(attempt.examId, [...(byExam.get(attempt.examId) ?? []), attempt]);
  }
  const finished = attempts.filter((attempt) => attempt.finishedAt);
  const scored = finished.filter((attempt) => attempt.selfScore !== null);
  const done = new Set(finished.map((attempt) => attempt.examId)).size;
  const total = exams.years.reduce((sum, year) => sum + year.papers.length, 0);
  const average =
    scored.length > 0
      ? scored.reduce((sum, attempt) => sum + (attempt.selfScore ?? 0), 0) / scored.length
      : null;
  const minutes = PAPER_MINUTES[programme.code] ?? 180;
  const format = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

  return (
    <div className="grid gap-8">
      <dl className="grid grid-cols-3 divide-x divide-quadrillage rounded-2xl border border-quadrillage bg-surface rtl:divide-x-reverse">
        <div className="grid gap-0.5 p-4">
          <dt className="text-xs text-encre-douce">{t("statDone")}</dt>
          <dd className="text-2xl font-semibold tabular">
            {done}
            <span className="text-base font-normal text-encre-douce">/{total}</span>
          </dd>
        </div>
        <div className="grid gap-0.5 p-4">
          <dt className="text-xs text-encre-douce">{t("statAverage")}</dt>
          <dd className="text-2xl font-semibold text-violet-texte tabular">
            {average === null ? "—" : `${format.format(average)}/20`}
          </dd>
        </div>
        <div className="grid gap-0.5 p-4">
          <dt className="text-xs text-encre-douce">{t("statDuration")}</dt>
          <dd className="text-2xl font-semibold tabular">{t("hours", { hours: minutes / 60 })}</dd>
        </div>
      </dl>

      <p className="text-sm text-encre-douce">{programmeName(programme.label)}</p>

      {exams.years.map(({ year, papers }) => (
        <section key={year} aria-labelledby={`year-${year}`} className="grid gap-3">
          <h2 id={`year-${year}`} className="flex items-center gap-3 text-lg font-semibold tabular">
            {year}
            <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
          </h2>
          <ul role="list" className="grid gap-2.5">
            {papers.map((paper) => {
              const mine = byExam.get(paper.id) ?? [];
              const ongoing = mine.find((attempt) => !attempt.finishedAt);
              const last = mine.find((attempt) => attempt.finishedAt);
              return (
                <li key={paper.id}>
                  <Link
                    href={`/eleve/examens/${paper.id}`}
                    className={cn(
                      "flex min-h-16 items-center gap-4 rounded-2xl border border-s-4 border-quadrillage border-s-violet bg-surface p-4 hover:border-trait hover:border-s-violet",
                    )}
                  >
                    <span className="grid min-w-0 flex-1 gap-1">
                      <span className="font-semibold">
                        {tExams(`session.${paper.session}`)}
                        {paper.track ? (
                          <span className="font-normal text-encre-douce"> · {paper.track}</span>
                        ) : null}
                      </span>
                      <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-encre-douce">
                        {paper.solutionUrl && paper.official ? (
                          <span>{tExams("officialAnswers")}</span>
                        ) : paper.correctionHref || paper.solutionUrl ? (
                          <span>{tExams("ourCorrection")}</span>
                        ) : null}
                        {paper.language === "ar" ? <span>{tExams("arabic")}</span> : null}
                      </span>
                    </span>
                    {ongoing ? (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-lavis-rouge px-2.5 py-1 text-xs font-semibold text-stylo-rouge">
                        <Timer aria-hidden="true" className="size-3.5" />
                        {t("ongoing")}
                      </span>
                    ) : last ? (
                      <span className="grid shrink-0 justify-items-end gap-0.5 text-xs text-encre-douce">
                        <span className="inline-flex items-center gap-1 font-semibold text-encre">
                          <Check aria-hidden="true" className="size-3.5" />
                          {last.selfScore === null
                            ? t("doneOn", { date: formatLocal(last.finishedAt ?? last.startedAt, "d MMM") })
                            : `${format.format(last.selfScore)}/20`}
                        </span>
                        {mine.length > 1 ? t("attempts", { count: mine.length }) : null}
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs text-encre-douce">{t("notDone")}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
