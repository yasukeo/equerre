import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicClient } from "@/lib/supabase/public";
import { readStoredLesson, type StoredLesson } from "./document";

/** Every public lesson page carries this, so publishing one refreshes the listings. */
export const COURSE_INDEX_TAG = "cours:index";

export const lessonTag = (slug: string) => `lecon:${slug}`;

/** `2BAC-PC` in the database, `2bac-pc` in a URL. Codes are A–Z, 0–9 and dashes. */
export const levelSlug = (code: string) => code.toLowerCase();
export const levelCode = (slug: string) => slug.toUpperCase();

export type LessonParams = { niveau: string; chapitre: string; lecon: string };

export type PublicLesson = {
  title: string;
  summary: string | null;
  content: StoredLesson;
  publishedAt: string | null;
  chapterTitle: string;
  levelLabel: string;
};

/**
 * Which lesson pages to prerender. Read anonymously, so it lists exactly the lessons a
 * visitor may see — the same rule that will let them through at request time.
 */
export async function listPublicLessons(): Promise<LessonParams[]> {
  "use cache";
  cacheTag(COURSE_INDEX_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("lessons")
    .select("slug, position, chapters!inner(slug, levels!inner(code))")
    .order("position");
  // An error is not cached; an empty answer would be, and would drop every lesson page.
  if (error) throw new Error("Could not read the public lessons", { cause: error });

  return data.map((row) => ({
    niveau: levelSlug(row.chapters.levels.code),
    chapitre: row.chapters.slug,
    lecon: row.slug,
  }));
}

export async function getPublicLesson(params: LessonParams): Promise<PublicLesson | null> {
  "use cache";
  cacheTag(lessonTag(params.lecon), COURSE_INDEX_TAG);

  const { data, error } = await publicClient()
    .from("lessons")
    .select(
      "title, summary, content, published_at, chapters!inner(title, slug, levels!inner(code, label))",
    )
    .eq("slug", params.lecon)
    .eq("chapters.slug", params.chapitre)
    .eq("chapters.levels.code", levelCode(params.niveau))
    .maybeSingle();
  if (error) throw new Error("Could not read the lesson", { cause: error });

  if (!data) {
    // A lesson about to be published must not be remembered as missing for a month.
    // Only one cacheLife may run per call, which is why this returns before the other.
    cacheLife("minutes");
    return null;
  }

  cacheLife("max");

  return {
    title: data.title,
    summary: data.summary,
    content: readStoredLesson(data.content),
    publishedAt: data.published_at,
    chapterTitle: data.chapters.title,
    levelLabel: data.chapters.levels.label,
  };
}

export type PublicCourseLevel = {
  code: string;
  label: string;
  chapters: {
    slug: string;
    title: string;
    lessons: { slug: string; title: string; summary: string | null }[];
  }[];
};

/**
 * The public lessons as a course index (D-089): by level in school order, then chapter, then
 * lesson. Read anonymously, like the pages it links to, so it lists exactly those.
 */
export async function listPublicCourse(): Promise<PublicCourseLevel[]> {
  "use cache";
  cacheTag(COURSE_INDEX_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("lessons")
    .select(
      "slug, title, summary, position, chapters!inner(slug, title, position, levels!inner(code, label, position))",
    );
  if (error) throw new Error("Could not read the public lessons", { cause: error });

  const rows = [...data].sort(
    (a, b) =>
      a.chapters.levels.position - b.chapters.levels.position ||
      a.chapters.position - b.chapters.position ||
      a.position - b.position,
  );
  const levels: PublicCourseLevel[] = [];
  for (const row of rows) {
    const level = row.chapters.levels;
    let entry = levels.find((candidate) => candidate.code === level.code);
    if (!entry) {
      entry = { code: level.code, label: level.label, chapters: [] };
      levels.push(entry);
    }
    let chapter = entry.chapters.find((candidate) => candidate.slug === row.chapters.slug);
    if (!chapter) {
      chapter = { slug: row.chapters.slug, title: row.chapters.title, lessons: [] };
      entry.chapters.push(chapter);
    }
    chapter.lessons.push({ slug: row.slug, title: row.title, summary: row.summary });
  }
  return levels;
}
