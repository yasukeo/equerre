import { ArrowRight, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ChapterStateChip, marksOf } from "@/components/student/course-cards";
import { Countdown } from "@/components/student/countdown";
import { GradeChart } from "@/components/student/grade-chart";
import { Protractor } from "@/components/student/protractor";
import { Ruler } from "@/components/student/ruler";
import { requireViewer } from "@/lib/auth";
import { formatLocal } from "@/lib/dates";
import { programmeName } from "@/lib/lesson/streams";
import {
  getExamCountdown,
  getStudentCourse,
  listMyExamAttempts,
  listMyGradeHistory,
  revisionPlan,
} from "@/lib/student/progress";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.progress");
  return { title: t("myProgress") };
}

export default async function ProgressPage() {
  const t = await getTranslations("student.progress");
  return (
    <div className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-5xl gap-8">
      <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
        {t("myProgress")}
      </h1>
      <Suspense fallback={<div aria-hidden="true" className="h-96 rounded-2xl bg-sunken" />}>
        <Progress />
      </Suspense>
    </div>
  );
}

const format = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

async function Progress() {
  const viewer = await requireViewer("student");
  const now = new Date();
  const [t, course, countdown, grades, attempts] = await Promise.all([
    getTranslations("student.progress"),
    getStudentCourse(viewer),
    getExamCountdown(viewer.programmeCode, now),
    listMyGradeHistory(),
    listMyExamAttempts(viewer),
  ]);
  const withDocuments = course.chapters.filter((chapter) => chapter.documents.length > 0);
  const plan = countdown ? revisionPlan(course, countdown, now) : [];
  const average =
    grades.length > 0 ? grades.reduce((sum, point) => sum + point.grade, 0) / grades.length : null;
  const scored = attempts.filter((attempt) => attempt.finishedAt && attempt.selfScore !== null);
  const saved = [...course.chapters.flatMap((chapter) => chapter.documents), ...course.shared].filter(
    (document) => document.bookmarked,
  ).length;

  return (
    <div className="grid gap-10">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <section
          aria-labelledby="programme-progress"
          className="grid justify-items-center gap-3 rounded-2xl border border-quadrillage bg-surface p-5"
        >
          <h2 id="programme-progress" className="sr-only">
            {t("programmeProgress")}
          </h2>
          <Protractor
            states={withDocuments.map((chapter) => chapter.state)}
            value={`${course.totals.chaptersDone}/${withDocuments.length}`}
            caption={t("chaptersUnderstood")}
            label={t("protractorLabel", {
              done: course.totals.chaptersDone,
              total: withDocuments.length,
            })}
          />
          {course.programme ? (
            <p className="text-center text-sm font-medium">{programmeName(course.programme.label)}</p>
          ) : null}
          <dl className="grid w-full grid-cols-3 gap-2 border-t border-quadrillage pt-3 text-center">
            <div>
              <dt className="text-xs text-encre-douce">{t("statOpened")}</dt>
              <dd className="text-xl font-semibold tabular">{course.totals.opened}</dd>
            </div>
            <div>
              <dt className="text-xs text-encre-douce">{t("statUnderstood")}</dt>
              <dd className="text-xl font-semibold tabular">{course.totals.understood}</dd>
            </div>
            <div>
              <dt className="text-xs text-encre-douce">{t("statSaved")}</dt>
              <dd className="text-xl font-semibold tabular">{saved}</dd>
            </div>
          </dl>
        </section>

        {countdown ? (
          <section
            aria-labelledby="plan-heading"
            className="grid content-start gap-5 rounded-2xl border border-quadrillage bg-surface p-5"
          >
            <Countdown countdown={countdown} size="lg" />
            <div className="grid gap-3">
              <h2 id="plan-heading" className="font-semibold">
                {t("planTitle")}
              </h2>
              <p className="text-sm text-encre-douce">{t("planHint")}</p>
              <ol role="list" className="grid gap-2">
                {plan.slice(0, 6).map((week) => (
                  <li
                    key={week.start}
                    className={cn(
                      "grid gap-1.5 rounded-xl border px-3 py-2.5 sm:grid-cols-[11rem_1fr] sm:items-baseline",
                      week.current ? "border-encre bg-surligneur/30" : "border-quadrillage",
                    )}
                  >
                    <span className="text-sm font-medium first-letter:uppercase">
                      {week.current
                        ? week.weeks === 1
                          ? t("thisWeek")
                          : t("nowUntil", { date: formatLocal(`${week.end}T12:00:00Z`, "d MMM") })
                        : t("fromTo", {
                            start: formatLocal(`${week.start}T12:00:00Z`, "d MMM"),
                            end: formatLocal(`${week.end}T12:00:00Z`, "d MMM"),
                          })}
                    </span>
                    <span className="flex flex-wrap gap-1.5">
                      {week.pastPapers ? (
                        <Link
                          href="/eleve/examens"
                          className="inline-flex items-center gap-1.5 rounded-full bg-violet-fond px-2.5 py-1 text-sm font-medium text-violet-texte hover:brightness-95"
                        >
                          <GraduationCap aria-hidden="true" className="size-4" />
                          {t("planPapers")}
                        </Link>
                      ) : week.chapters.length === 0 ? (
                        <span className="text-sm text-encre-douce">{t("planCatchUp")}</span>
                      ) : (
                        week.chapters.map((chapter) => (
                          <Link
                            key={chapter.slug}
                            href={`/eleve/chapitres/${chapter.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-quadrillage bg-surface px-2.5 py-1 text-sm hover:border-trait"
                          >
                            <span className="font-semibold tabular">{chapter.number}</span>
                            {frenchSpaces(chapter.title)}
                          </Link>
                        ))
                      )}
                    </span>
                  </li>
                ))}
              </ol>
              {plan.length > 6 ? (
                <p className="text-sm text-encre-douce">
                  {t("planMore", { count: plan.length - 6 })}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>

      <section aria-labelledby="grades-heading" className="grid gap-4">
        <h2 id="grades-heading" className="flex items-center gap-3 text-lg font-semibold">
          <span aria-hidden="true" className="size-3 rounded-sm bg-violet" />
          {t("gradesTitle")}
          <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
        </h2>
        {grades.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
            {t("gradesEmpty")}
          </p>
        ) : (
          <div className="grid gap-4 rounded-2xl border border-quadrillage bg-surface p-5">
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-3xl font-semibold text-violet-texte tabular">
                {format.format(average ?? 0)}/20
              </span>
              <span className="text-sm text-encre-douce">
                {t("gradesAverage", { count: grades.length })}
              </span>
            </p>
            <GradeChart
              points={grades}
              averageLabel={t("averageShort", { average: format.format(average ?? 0) })}
              pointLabel={(point, grade, date) => t("gradePoint", { title: point.title, grade, date })}
            />
            <details>
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-trait underline-offset-4">
                {t("gradesList")}
              </summary>
              <ul role="list" className="mt-2 divide-y divide-quadrillage border-y border-quadrillage">
                {[...grades].reverse().map((point) => (
                  <li key={`${point.assignmentId}/${point.exerciseId}`}>
                    <Link
                      href={`/eleve/devoirs/${point.assignmentId}/${point.exerciseId}`}
                      className="flex min-h-12 items-center justify-between gap-3 py-2 text-sm hover:bg-sunken"
                    >
                      <span className="min-w-0">
                        {point.title}
                        <span className="ms-2 text-encre-douce">
                          {formatLocal(point.correctedAt, "d MMM")}
                        </span>
                      </span>
                      <span className="font-semibold tabular">{format.format(point.grade)}/20</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </section>

      {scored.length > 0 ? (
        <section aria-labelledby="papers-heading" className="grid gap-3">
          <h2 id="papers-heading" className="flex items-center gap-3 text-lg font-semibold">
            <GraduationCap aria-hidden="true" className="size-5 text-violet" />
            {t("papersTitle")}
            <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
          </h2>
          <ul role="list" className="grid gap-2 sm:grid-cols-2">
            {scored.slice(0, 6).map((attempt) => (
              <li key={attempt.id}>
                <Link
                  href={`/eleve/examens/${attempt.examId}`}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-quadrillage bg-surface px-4 hover:border-trait"
                >
                  <span className="text-sm">
                    {formatLocal(attempt.finishedAt ?? attempt.startedAt, "d MMMM")}
                  </span>
                  <span className="font-semibold tabular">
                    {format.format(attempt.selfScore ?? 0)}/20
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="chapters-heading" className="grid gap-3">
        <h2 id="chapters-heading" className="flex items-center gap-3 text-lg font-semibold">
          {t("chaptersTitle")}
          <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
        </h2>
        <ul role="list" className="divide-y divide-quadrillage rounded-2xl border border-quadrillage bg-surface">
          {withDocuments.map((chapter) => (
            <li key={chapter.id}>
              <Link
                href={`/eleve/chapitres/${chapter.slug}`}
                className="grid min-h-16 gap-2 px-4 py-3 hover:bg-sunken sm:grid-cols-[2rem_1fr_10rem_auto] sm:items-center sm:gap-4"
              >
                <span className="font-semibold text-encre-douce tabular">{chapter.number}</span>
                <span className="font-medium">{frenchSpaces(chapter.title)}</span>
                <Ruler marks={marksOf(chapter.documents)} />
                <span className="flex items-center gap-2">
                  <ChapterStateChip state={chapter.state} />
                  <ArrowRight aria-hidden="true" className="hidden size-4 text-encre-douce sm:block rtl:rotate-180" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
