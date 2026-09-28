import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { levelSlug, listPublicCourse } from "@/lib/lesson/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("coursesIndex");
  return { title: t("title"), description: t("lead"), alternates: { canonical: "/cours" } };
}

/** The public lessons by level and chapter (D-089): the course a visitor can read freely. */
export default async function CoursesPage() {
  const [t, course] = await Promise.all([getTranslations("coursesIndex"), listPublicCourse()]);

  return (
    <main id="contenu" className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8">
      <h1 className="text-[clamp(2rem,1.5rem+2.5vw,3rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_100]">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-encre-douce">{t("lead")}</p>

      {course.length === 0 ? (
        <div className="mt-10 grid gap-2 rounded-md border border-dashed border-trait px-4 py-5">
          <p>{t("empty")}</p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-self-start underline decoration-trait underline-offset-4 hover:decoration-encre"
          >
            {t("home")}
          </Link>
        </div>
      ) : (
        course.map((level) => (
          <section
            key={level.code}
            aria-labelledby={`niveau-${level.code}`}
            className="mt-12 grid gap-6"
          >
            <h2 id={`niveau-${level.code}`} className="text-xl font-semibold">
              {level.label}
            </h2>
            {level.chapters.map((chapter) => (
              <div key={chapter.slug} className="grid gap-2 border-t border-quadrillage pt-3">
                <h3 className="font-semibold">
                  {chapter.title}
                  <span className="ms-2 text-sm font-normal text-encre-douce">
                    {t("lessons", { count: chapter.lessons.length })}
                  </span>
                </h3>
                <ul role="list" className="grid gap-2">
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.slug} className="grid gap-0.5">
                      <Link
                        href={`/cours/${levelSlug(level.code)}/${chapter.slug}/${lesson.slug}`}
                        className="inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre"
                      >
                        {lesson.title}
                      </Link>
                      {lesson.summary ? (
                        <p className="text-sm text-encre-douce">{lesson.summary}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))
      )}
    </main>
  );
}
