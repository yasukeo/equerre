import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  PublicationChip,
  VisibilityChip,
  type LessonVisibility,
  type PublicationStatus,
} from "@/components/lesson-status";
import { requireViewer } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const FIELDS =
  "id, title, slug, status, visibility, position, chapter:chapters!inner(title, slug, semester, position, programme:programmes!inner(code, slug, label, position))" as const;

export async function LessonsList() {
  await requireViewer("tutor");

  const t = await getTranslations("tutor.lessons");
  const supabase = await createClient();

  // The tutor's policy lets her see drafts and every visibility; a student's would not.
  const { data } = await supabase.from("lessons").select(FIELDS);

  const lessons = [...(data ?? [])].sort(
    (a, b) =>
      a.chapter.programme.position - b.chapter.programme.position ||
      (a.chapter.semester ?? 3) - (b.chapter.semester ?? 3) ||
      a.chapter.position - b.chapter.position ||
      a.position - b.position,
  );

  if (lessons.length === 0) {
    return <p className="text-encre-douce">{t("empty")}</p>;
  }

  // Grouped by chapter, in the order the tutor teaches them.
  const chapters: { key: string; programme: string; title: string; lessons: typeof lessons }[] = [];
  for (const lesson of lessons) {
    const key = `${lesson.chapter.programme.code}/${lesson.chapter.slug}`;
    const last = chapters.at(-1);
    if (last?.key === key) {
      last.lessons.push(lesson);
    } else {
      chapters.push({
        key,
        programme: lesson.chapter.programme.label,
        title: lesson.chapter.title,
        lessons: [lesson],
      });
    }
  }

  return (
    <div className="grid gap-8">
      <p className="text-sm text-encre-douce">{t("count", { count: lessons.length })}</p>

      {chapters.map((chapter) => (
        <section key={chapter.key} className="grid gap-3">
          <h2 className="text-sm font-semibold text-encre-douce">
            {chapter.programme} · {chapter.title}
          </h2>

          <ul className="grid gap-px overflow-hidden rounded-md border border-quadrillage bg-quadrillage">
            {chapter.lessons.map((lesson) => {
              const status = lesson.status as PublicationStatus;
              const visibility = lesson.visibility as LessonVisibility;
              const isLive = status === "published" && visibility === "public";

              return (
                <li
                  key={lesson.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-surface px-4 py-3"
                >
                  <Link
                    href={`/prof/lecons/${lesson.id}`}
                    className="min-w-0 flex-1 font-medium underline decoration-quadrillage underline-offset-4 hover:decoration-encre"
                  >
                    {lesson.title}
                  </Link>

                  <PublicationChip status={status} label={t(`status.${status}`)} />
                  <VisibilityChip
                    visibility={visibility}
                    label={t(`visibility.${visibility}`)}
                    hint={t(`visibilityHint.${visibility}`)}
                  />

                  {isLive ? (
                    <Link
                      href={`/cours/${lesson.chapter.programme.slug}/${lesson.chapter.slug}/${lesson.slug}`}
                      className="text-sm text-stylo-bleu underline underline-offset-2"
                    >
                      {t("open")}
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
