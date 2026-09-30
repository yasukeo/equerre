import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getPublicLesson, listPublicLessons, type LessonParams } from "@/lib/lesson/queries";
import { shareImage, shareImageSize, shareImageType } from "@/lib/og/share-image";

// A public lesson, shared: its title, where it sits in the course, and whose it is. Drawn at
// build time with the lesson pages, from the same cached reads.

export const alt = `Leçon de mathématiques · ${siteConfig.brand}`;
export const size = shareImageSize;
export const contentType = shareImageType;

export async function generateStaticParams(): Promise<LessonParams[]> {
  const lessons = await listPublicLessons();
  // As on the page: the route needs one entry even before the first lesson is public.
  return lessons.length > 0
    ? lessons
    : [{ niveau: "tronc-commun-sciences", chapitre: "-", lecon: "-" }];
}

export default async function Image({ params }: { params: Promise<LessonParams> }) {
  const [lesson, t] = await Promise.all([getPublicLesson(await params), getTranslations("share")]);
  return shareImage(
    lesson
      ? { eyebrow: `${lesson.programmeLabel} · ${lesson.chapterTitle}`, title: lesson.title }
      : { eyebrow: t("eyebrow"), title: t("lesson") },
  );
}
