import { ArrowRight, BookmarkCheck, GraduationCap, Play } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ChapterCard, DocumentRow } from "@/components/student/course-cards";
import { CourseSearch, type SearchItem } from "@/components/student/course-search";
import { Protractor } from "@/components/student/protractor";
import { ReadingRuler } from "@/components/student/ruler";
import { requireViewer } from "@/lib/auth";
import { getProgrammeExams } from "@/lib/exams/queries";
import { programmeName } from "@/lib/lesson/streams";
import { getStudentCourse, resumePoint } from "@/lib/student/progress";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.progress");
  return { title: t("reviseTitle") };
}

export default async function ReviseHubPage() {
  const t = await getTranslations("student.progress");
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-8">
      <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
        {t("reviseTitle")}
      </h1>
      <Suspense fallback={<HubSkeleton />}>
        <Hub />
      </Suspense>
    </div>
  );
}

async function Hub() {
  const viewer = await requireViewer("student");
  const [t, tKind, course] = await Promise.all([
    getTranslations("student.progress"),
    getTranslations("documentKind"),
    getStudentCourse(viewer),
  ]);
  const exams = course.programme ? await getProgrammeExams(course.programme.slug) : null;
  const paperCount = exams?.years.reduce((sum, year) => sum + year.papers.length, 0) ?? 0;
  const resume = resumePoint(course);
  const saved = [
    ...course.chapters.flatMap((chapter) => chapter.documents),
    ...course.shared,
  ].filter((document) => document.bookmarked);
  const items: SearchItem[] = [
    ...course.chapters.flatMap((chapter) =>
      chapter.documents.map((document) => ({
        slug: document.slug,
        title: document.title,
        summary: document.summary,
        kind: document.kind,
        chapterTitle: chapter.title,
        understood: document.understood,
      })),
    ),
    ...course.shared.map((document) => ({
      slug: document.slug,
      title: document.title,
      summary: document.summary,
      kind: document.kind,
      chapterTitle: document.chapterTitle,
      understood: document.understood,
    })),
  ];
  const withDocuments = course.chapters.filter((chapter) => chapter.documents.length > 0);
  const inProgress = withDocuments.filter((chapter) => chapter.state === "en_cours").length;
  const semesters = [1, 2, null].flatMap((semester) => {
    const chapters = course.chapters.filter((chapter) => chapter.semester === semester);
    return chapters.length > 0 ? [{ semester, chapters }] : [];
  });

  if (!course.programme && course.shared.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-6 text-encre-douce">
        {t("noProgramme")}
      </p>
    );
  }

  return (
    <CourseSearch items={items}>
      <div className="grid gap-10">
        {/* Where she stands, and the three ways in: resume, kept to revise, past papers. */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,20rem)_1fr]">
          {course.programme ? (
            /* On a phone, one line: the chapters come first there (D-104). */
            <Link
              href="/eleve/progression"
              className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-quadrillage bg-surface px-4 py-3 hover:border-trait lg:hidden"
            >
              <span className="grid">
                <span className="font-semibold tabular">
                  {t("chaptersDoneLine", {
                    done: course.totals.chaptersDone,
                    total: withDocuments.length,
                  })}
                </span>
                <span className="text-sm text-encre-douce">
                  {inProgress > 0
                    ? t("inProgressLine", { count: inProgress })
                    : programmeName(course.programme.label)}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm underline decoration-trait underline-offset-4">
                {t("myProgress")}
                <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
              </span>
            </Link>
          ) : null}
          {course.programme ? (
            <Link
              href="/eleve/progression"
              className="group hidden justify-items-center gap-2 rounded-2xl border border-quadrillage bg-surface px-5 pt-5 pb-4 hover:border-trait lg:grid"
            >
              <Protractor
                states={withDocuments.map((chapter) => chapter.state)}
                value={`${course.totals.chaptersDone}/${withDocuments.length}`}
                caption={t("chaptersUnderstood")}
                label={t("protractorLabel", {
                  done: course.totals.chaptersDone,
                  total: withDocuments.length,
                })}
              />
              {inProgress > 0 ? (
                <span className="text-sm text-stylo-bleu">
                  {t("inProgressLine", { count: inProgress })}
                </span>
              ) : null}
              <span className="text-center text-sm font-medium">
                {programmeName(course.programme.label)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm underline decoration-trait underline-offset-4 group-hover:decoration-encre">
                {t("myProgress")}
                <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
              </span>
            </Link>
          ) : null}

          <div className="grid content-start gap-3">
            {resume ? (
              <Link
                href={`/eleve/cours/${resume.document.slug}`}
                className="group grid gap-3 rounded-2xl bg-encre-fixe p-5 text-white"
              >
                <span className="flex items-center gap-2 text-sm font-medium tracking-[0.08em] uppercase opacity-80">
                  <Play aria-hidden="true" className="size-4" />
                  {resume.document.opened ? t("resume") : t("start")}
                </span>
                <span className="grid gap-1">
                  <span className={cn("text-xs font-semibold uppercase opacity-80")}>
                    {tKind(`one.${resume.document.kind}`)}
                    {resume.chapter
                      ? ` · ${t("chapterNumber", { number: resume.chapter.number })}`
                      : null}
                  </span>
                  <span className="text-xl leading-snug font-semibold">
                    {frenchSpaces(resume.document.title)}
                  </span>
                </span>
                {resume.document.opened && resume.document.position > 0.02 ? (
                  <span className="flex items-center gap-3 text-sm">
                    <ReadingRuler position={resume.document.position} onInk className="flex-1" />
                    <span className="tabular">
                      {t("readPercent", { percent: Math.round(resume.document.position * 100) })}
                    </span>
                  </span>
                ) : null}
              </Link>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="#a-revoir"
                className="flex min-h-16 items-center gap-3 rounded-2xl border border-quadrillage bg-surface p-4 hover:border-trait"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-surligneur text-encre-fixe">
                  <BookmarkCheck aria-hidden="true" className="size-5" />
                </span>
                <span className="grid">
                  <span className="font-semibold">{t("savedTitle")}</span>
                  <span className="text-sm text-encre-douce">
                    {t("savedCount", { count: saved.length })}
                  </span>
                </span>
              </a>
              {paperCount > 0 ? (
                <Link
                  href="/eleve/examens"
                  className="flex min-h-16 items-center gap-3 rounded-2xl border border-quadrillage bg-surface p-4 hover:border-trait"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-violet-bande text-white">
                    <GraduationCap aria-hidden="true" className="size-5" />
                  </span>
                  <span className="grid">
                    <span className="font-semibold">{t("pastPapers")}</span>
                    <span className="text-sm text-encre-douce">
                      {t("paperCount", { count: paperCount })}
                    </span>
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {semesters.map(({ semester, chapters }) => (
          <section
            key={semester ?? "year"}
            aria-labelledby={`semester-${semester ?? "year"}`}
            className="grid gap-4"
          >
            <h2
              id={`semester-${semester ?? "year"}`}
              className="flex items-center gap-3 text-lg font-semibold"
            >
              {semester ? t("semester", { semester }) : t("chapters")}
              <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
            </h2>
            <ul role="list" className="grid gap-3 md:grid-cols-2">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="grid">
                  <ChapterCard chapter={chapter} cycle={course.programme?.cycle ?? "2bac"} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section id="a-revoir" aria-labelledby="saved-heading" className="grid scroll-mt-6 gap-4">
          <h2 id="saved-heading" className="flex items-center gap-3 text-lg font-semibold">
            <span
              aria-hidden="true"
              className="size-3 rounded-sm bg-surligneur ring-1 ring-encre-fixe/30"
            />
            {t("savedTitle")}
            <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
          </h2>
          {saved.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
              {t("savedEmpty")}
            </p>
          ) : (
            <ul role="list" className="grid gap-2.5 md:grid-cols-2">
              {saved.map((document) => (
                <li key={document.id}>
                  <DocumentRow document={document} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {course.shared.length > 0 ? (
          <section aria-labelledby="shared-heading" className="grid gap-4">
            <h2 id="shared-heading" className="flex items-center gap-3 text-lg font-semibold">
              {t("sharedTitle")}
              <span aria-hidden="true" className="h-px flex-1 bg-quadrillage" />
            </h2>
            <ul role="list" className="grid gap-2.5 md:grid-cols-2">
              {course.shared.map((document) => (
                <li key={document.id}>
                  <DocumentRow document={document} context={document.chapterTitle} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section
          aria-labelledby="open-lessons"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-quadrillage bg-surface p-5"
        >
          <div className="grid gap-1">
            <h2 id="open-lessons" className="font-semibold">
              {t("othersTitle")}
            </h2>
            <p className="text-sm text-encre-douce">{t("othersHint")}</p>
          </div>
          <Link
            href="/cours"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("browse")}
            <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
          </Link>
        </section>
      </div>
    </CourseSearch>
  );
}

function HubSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-6">
      <div className="h-14 rounded-2xl bg-sunken" />
      <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
        <div className="h-56 rounded-2xl bg-sunken" />
        <div className="h-56 rounded-2xl bg-sunken" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-sunken" />
        ))}
      </div>
    </div>
  );
}
