import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { readStoredLesson, type StoredLesson } from "./document";

// Lessons read through the visitor's own session, so the lessons select policy decides what
// comes back (DECISIONS.md, D-050, D-060): her programme’s lessons and those shared with her
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
      "title, summary, content, published_at, chapter:chapters!inner(title, programme:programmes!inner(label))",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (!data) return null;

  return {
    title: data.title,
    summary: data.summary,
    publishedAt: data.published_at,
    context: `${data.chapter.programme.label} · ${data.chapter.title}`,
    content: readStoredLesson(data.content),
  };
});

export type ReadableLessonEntry = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  kind: Database["public"]["Enums"]["document_kind"];
  shared: boolean;
  chapterTitle: string;
};

/**
 * The published lessons of one programme this visitor may read, and those shared with her by
 * name from any other, in teaching order (D-094). The other programmes' public lessons are the
 * public course's business, not her list's.
 */
export async function listReadableLessons(
  programmeCode: string | null,
): Promise<ReadableLessonEntry[]> {
  const supabase = await createClient();
  const fields =
    "id, slug, title, summary, kind, visibility, position, chapter:chapters!inner(title, semester, position, programme_code, programme:programmes!inner(position))" as const;
  const [own, shared] = await Promise.all([
    programmeCode
      ? supabase
          .from("lessons")
          .select(fields)
          .eq("status", "published")
          .eq("chapter.programme_code", programmeCode)
      : Promise.resolve({ data: [] as never[] }),
    supabase.from("lessons").select(fields).eq("status", "published").eq("visibility", "specific"),
  ]);

  const byId = new Map([...(own.data ?? []), ...(shared.data ?? [])].map((row) => [row.id, row]));
  return [...byId.values()]
    .sort(
      (a, b) =>
        a.chapter.programme.position - b.chapter.programme.position ||
        (a.chapter.semester ?? 3) - (b.chapter.semester ?? 3) ||
        a.chapter.position - b.chapter.position ||
        a.position - b.position,
    )
    .map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      summary: lesson.summary,
      kind: lesson.kind,
      shared: lesson.visibility === "specific",
      chapterTitle: lesson.chapter.title,
    }));
}
