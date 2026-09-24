import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { readStoredLesson, type StoredLesson } from "./document";

// Lessons read through the visitor's own session, so the lessons select policy decides what
// comes back (DECISIONS.md, D-050, D-060): her level's lessons and those shared with her
// while she is active or paused, the public ones always. Nothing here is cached across
// visitors — that is what src/lib/lesson/queries.ts is for, and only for public lessons.

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export type ReadableLesson = {
  title: string;
  summary: string | null;
  publishedAt: string | null;
  context: string;
  content: StoredLesson;
};

/** One published lesson this visitor may read, or null. Deduplicated per request. */
export const getReadableLesson = cache(async (slug: string): Promise<ReadableLesson | null> => {
  if (!SLUG.test(slug)) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select(
      "title, summary, content, published_at, chapter:chapters!inner(title, level:levels!inner(label))",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (!data) return null;

  return {
    title: data.title,
    summary: data.summary,
    publishedAt: data.published_at,
    context: `${data.chapter.level.label} · ${data.chapter.title}`,
    content: readStoredLesson(data.content),
  };
});

export type ReadableLessonEntry = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  shared: boolean;
  levelCode: string;
  levelLabel: string;
  chapterTitle: string;
};

/** Every published lesson this visitor may read, in teaching order. */
export async function listReadableLessons(): Promise<ReadableLessonEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select(
      "id, slug, title, summary, visibility, position, chapter:chapters!inner(title, position, level_code, level:levels!inner(label, position))",
    )
    .eq("status", "published");

  return [...(data ?? [])]
    .sort(
      (a, b) =>
        a.chapter.level.position - b.chapter.level.position ||
        a.chapter.position - b.chapter.position ||
        a.position - b.position,
    )
    .map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      summary: lesson.summary,
      shared: lesson.visibility === "specific",
      levelCode: lesson.chapter.level_code,
      levelLabel: lesson.chapter.level.label,
      chapterTitle: lesson.chapter.title,
    }));
}
