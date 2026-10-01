import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { cycleHue, kindHue } from "@/lib/design/colors";
import { listProgrammes } from "@/lib/lesson/queries";
import { listReadableLessons, type ReadableLessonEntry } from "@/lib/lesson/readable";
import { programmeName } from "@/lib/lesson/streams";
import { frenchSpaces } from "@/lib/typography";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.lessons");
  return { title: t("title") };
}

export default async function StudentLessonsPage() {
  const t = await getTranslations("student.lessons");

  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45]">
        {t("title")}
      </h1>
      <Suspense fallback={<LessonsSkeleton />}>
        <Lessons />
      </Suspense>
    </div>
  );
}

async function Lessons() {
  const viewer = await requireViewer("student");
  const [t, tKind] = await Promise.all([
    getTranslations("student.lessons"),
    getTranslations("documentKind"),
  ]);
  const [lessons, programmes] = await Promise.all([
    listReadableLessons(viewer.programmeCode),
    listProgrammes(),
  ]);
  const mine = programmes.find((programme) => programme.code === viewer.programmeCode);
  const link =
    "inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre";

  return (
    <>
      {/* Her programme, in its level's colour, as on the public course pages (D-100). */}
      {mine ? (
        <Link
          href={`/cours/${mine.slug}`}
          className={cn(
            "group relative grid gap-3 overflow-hidden rounded-2xl p-5 sm:p-6",
            cycleHue(mine.cycle).band,
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.09)_1px,transparent_1px)] bg-[size:22px_22px]"
          />
          <span className="relative text-sm font-medium tracking-[0.08em] text-white uppercase">
            {t("programmeEyebrow")}
          </span>
          <span className="relative text-2xl font-semibold">{programmeName(mine.label)}</span>
          <span className="relative grid gap-1.5">
            {mine.readyCount > 0 ? (
              <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-white/25">
                <span
                  className="block h-full rounded-full bg-white"
                  style={{
                    width: `${Math.round((mine.readyCount / Math.max(mine.chapterCount, 1)) * 100)}%`,
                  }}
                />
              </span>
            ) : null}
            <span className="text-sm text-white">
              {t("programmeProgress", { ready: mine.readyCount, total: mine.chapterCount })}
            </span>
          </span>
          <span className="relative inline-flex items-center gap-2 font-medium underline decoration-white/60 underline-offset-4 group-hover:decoration-white">
            {t("myProgramme")}
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </Link>
      ) : null}

      <section aria-labelledby="my-lessons" className="grid gap-4">
        <h2 id="my-lessons" className="text-lg font-semibold">
          {t("mine")}
        </h2>
        {lessons.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-trait bg-surface px-4 py-4 text-encre-douce">
            {t("empty")}
          </p>
        ) : (
          <Chapters
            lessons={lessons}
            sharedLabel={t("shared")}
            kindLabel={(kind) => tKind(`one.${kind}`)}
          />
        )}
      </section>

      {/* Every other programme is the public course's: one place to browse it all. */}
      <section
        aria-labelledby="open-lessons"
        className="grid gap-2 rounded-2xl border border-quadrillage bg-surface p-5"
      >
        <h2 id="open-lessons" className="text-lg font-semibold">
          {t("others")}
        </h2>
        <p className="text-sm text-encre-douce">{t("othersHint")}</p>
        <Link href="/cours" className={link}>
          {t("browse")}
        </Link>
      </section>
    </>
  );
}

function Chapters({
  lessons,
  sharedLabel,
  kindLabel,
}: {
  lessons: ReadableLessonEntry[];
  sharedLabel: string;
  kindLabel: (kind: ReadableLessonEntry["kind"]) => string;
}) {
  // Consecutive lessons of one chapter share a heading; the list is already in teaching order.
  const chapters: { key: string; heading: string; lessons: ReadableLessonEntry[] }[] = [];
  for (const lesson of lessons) {
    const last = chapters.at(-1);
    if (last?.key === lesson.chapterId) {
      last.lessons.push(lesson);
    } else {
      chapters.push({
        key: lesson.chapterId,
        heading: lesson.otherProgramme
          ? `${lesson.otherProgramme} · ${lesson.chapterTitle}`
          : lesson.chapterTitle,
        lessons: [lesson],
      });
    }
  }

  return (
    <div className="grid gap-4">
      {chapters.map((chapter) => (
        <div
          key={chapter.key}
          className="overflow-hidden rounded-2xl border border-quadrillage bg-surface"
        >
          <h3 className="border-b border-quadrillage bg-sunken px-4 py-2.5 font-semibold">
            {frenchSpaces(chapter.heading)}
          </h3>
          <ul className="divide-y divide-quadrillage" role="list">
            {chapter.lessons.map((lesson) => {
              const colour = kindHue(lesson.kind);
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/eleve/cours/${lesson.slug}`}
                    className="flex min-h-16 items-center gap-3 px-4 py-3 hover:bg-sunken"
                  >
                    <span
                      aria-hidden="true"
                      className={cn("h-10 w-1.5 shrink-0 rounded-full", colour.dot)}
                    />
                    <span className="grid min-w-0 flex-1 gap-0.5">
                      <span className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            colour.chip,
                          )}
                        >
                          {kindLabel(lesson.kind)}
                        </span>
                        {lesson.shared ? (
                          <span className="text-xs text-encre-douce">{sharedLabel}</span>
                        ) : null}
                      </span>
                      <span className="font-medium">{frenchSpaces(lesson.title)}</span>
                      {lesson.summary ? (
                        <span className="line-clamp-2 text-sm text-encre-douce">
                          {frenchSpaces(lesson.summary)}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function LessonsSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-3">
      <div className="h-5 w-32 rounded bg-sunken" />
      <div className="h-16 rounded bg-sunken" />
      <div className="h-16 rounded bg-sunken" />
    </div>
  );
}
