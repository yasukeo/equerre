import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { requireViewer } from "@/lib/auth";
import { listReadableLessons, type ReadableLessonEntry } from "@/lib/lesson/readable";

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
  const t = await getTranslations("student.lessons");
  const lessons = await listReadableLessons();

  // Her level and what was shared with her first; other levels' public lessons after.
  const mine = lessons.filter((lesson) => lesson.shared || lesson.levelCode === viewer.levelCode);
  const others = lessons.filter((lesson) => !mine.includes(lesson));

  if (lessons.length === 0) {
    return <p className="text-encre-douce">{t("empty")}</p>;
  }

  return (
    <>
      {mine.length > 0 ? (
        <section aria-labelledby="my-lessons" className="grid gap-4">
          <h2 id="my-lessons" className="text-lg font-medium">
            {t("mine")}
          </h2>
          <Chapters lessons={mine} withLevel={false} sharedLabel={t("shared")} />
        </section>
      ) : null}

      {others.length > 0 ? (
        <section aria-labelledby="open-lessons" className="grid gap-4">
          <div>
            <h2 id="open-lessons" className="text-lg font-medium">
              {t("others")}
            </h2>
            <p className="mt-1 text-sm text-encre-douce">{t("othersHint")}</p>
          </div>
          <Chapters lessons={others} withLevel sharedLabel={t("shared")} />
        </section>
      ) : null}
    </>
  );
}

function Chapters({
  lessons,
  withLevel,
  sharedLabel,
}: {
  lessons: ReadableLessonEntry[];
  withLevel: boolean;
  sharedLabel: string;
}) {
  // Consecutive lessons of one chapter share a heading; the list is already in teaching order.
  const chapters: { key: string; heading: string; lessons: ReadableLessonEntry[] }[] = [];
  for (const lesson of lessons) {
    const key = `${lesson.levelCode}/${lesson.chapterTitle}`;
    const last = chapters.at(-1);
    if (last?.key === key) {
      last.lessons.push(lesson);
    } else {
      chapters.push({
        key,
        heading: withLevel ? `${lesson.levelLabel} · ${lesson.chapterTitle}` : lesson.chapterTitle,
        lessons: [lesson],
      });
    }
  }

  return (
    <div className="grid gap-6">
      {chapters.map((chapter) => (
        <div key={chapter.key} className="grid gap-2">
          <h3 className="text-sm font-semibold text-encre-douce">{chapter.heading}</h3>
          <ul className="divide-y divide-quadrillage border-y border-quadrillage" role="list">
            {chapter.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/eleve/cours/${lesson.slug}`}
                  className="grid min-h-16 content-center gap-0.5 py-3 hover:bg-sunken"
                >
                  <span className="font-medium">{lesson.title}</span>
                  {lesson.summary || lesson.shared ? (
                    <span className="text-sm text-encre-douce">
                      {lesson.shared ? sharedLabel : null}
                      {lesson.shared && lesson.summary ? " · " : null}
                      {lesson.summary}
                    </span>
                  ) : null}
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
