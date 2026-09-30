import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listProgrammes } from "@/lib/lesson/queries";
import { listReadableLessons, type ReadableLessonEntry } from "@/lib/lesson/readable";
import { frenchSpaces } from "@/lib/typography";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("student.lessons");
  return { title: t("title") };
}

export default async function StudentLessonsPage() {
  const t = await getTranslations("student.lessons");

  return (
    <div className="mx-auto grid max-w-2xl gap-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
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
      <section aria-labelledby="my-lessons" className="grid gap-4">
        <h2 id="my-lessons" className="text-lg font-medium">
          {t("mine")}
        </h2>
        {lessons.length === 0 ? (
          <p className="text-encre-douce">{t("empty")}</p>
        ) : (
          <Chapters
            lessons={lessons}
            sharedLabel={t("shared")}
            kindLabel={(kind) => tKind(`one.${kind}`)}
          />
        )}
        {/* Her programme chapter by chapter, what is written and what is to come. */}
        {mine ? (
          <Link href={`/cours/${mine.slug}`} className={link}>
            {t("myProgramme")}
          </Link>
        ) : null}
      </section>

      {/* Every other programme is the public course's: one place to browse it all. */}
      <section aria-labelledby="open-lessons" className="grid gap-2">
        <h2 id="open-lessons" className="text-lg font-medium">
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
    <div className="grid gap-6">
      {chapters.map((chapter) => (
        <div key={chapter.key} className="grid gap-2">
          <h3 className="text-sm font-semibold text-encre-douce">
            {frenchSpaces(chapter.heading)}
          </h3>
          <ul className="divide-y divide-quadrillage border-y border-quadrillage" role="list">
            {chapter.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/eleve/cours/${lesson.slug}`}
                  className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
                >
                  <span className="font-medium">{frenchSpaces(lesson.title)}</span>
                  <span className="text-sm text-encre-douce">
                    {[kindLabel(lesson.kind), lesson.shared ? sharedLabel : null, lesson.summary]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
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
