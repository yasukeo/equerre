import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { readStoredLesson, type StoredLesson } from "./document";
import { DOCUMENT_KINDS } from "./kinds";
import { documentVersion } from "@/lib/pdf/links";
import { examFileName, type ExamSession } from "@/lib/exams/files";

// Lessons read through the visitor's own session, so the lessons select policy decides what
// comes back (DECISIONS.md, D-050, D-060): her programme’s lessons and those shared with her
// while she is active or paused, the public ones always. Nothing here is cached across
// visitors — that is what src/lib/lesson/queries.ts is for, and only for public lessons.

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export type ReadableLesson = {
  id: string;
  kind: Database["public"]["Enums"]["document_kind"];
  /** Its last change, which names its PDF (D-096). */
  version: string;
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
      "id, kind, updated_at, title, summary, content, published_at, chapter:chapters!inner(title, updated_at, programme:programmes!inner(label))",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (!data) return null;

  return {
    id: data.id,
    kind: data.kind,
    version: documentVersion(
      data.updated_at,
      data.chapter.updated_at,
      data.chapter.programme.label,
    ),
    title: data.title,
    summary: data.summary,
    publishedAt: data.published_at,
    context: `${data.chapter.programme.label} · ${data.chapter.title}`,
    content: readStoredLesson(data.content),
  };
});

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export type PrintableLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  kind: Database["public"]["Enums"]["document_kind"];
  /** Only a published, public document may be cached by anyone between here and the reader. */
  isPublic: boolean;
  /** The version a PDF is made from: its address changes when the document does. */
  version: string;
  chapterTitle: string;
  programmeLabel: string;
  content: StoredLesson;
};

/**
 * One document this visitor may print (D-096): what she may read, drafts included for the
 * tutor, who reviews them. Deduplicated per request.
 */
export const getPrintableLesson = cache(async (id: string): Promise<PrintableLesson | null> => {
  if (!UUID.test(id)) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select(
      "id, slug, title, summary, kind, status, visibility, updated_at, content, chapter:chapters!inner(title, updated_at, programme:programmes!inner(label))",
    )
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    kind: data.kind,
    isPublic: data.status === "published" && data.visibility === "public",
    version: documentVersion(
      data.updated_at,
      data.chapter.updated_at,
      data.chapter.programme.label,
    ),
    chapterTitle: data.chapter.title,
    programmeLabel: data.chapter.programme.label,
    content: readStoredLesson(data.content),
  };
});

export type PrintableCorrection = {
  id: string;
  /** What its PDF is saved as. */
  fileName: string;
  /** A published correction of a published paper, which anyone may cache. */
  isPublic: boolean;
  version: string;
  programmeLabel: string;
  year: number;
  session: ExamSession;
  track: string | null;
  summary: string;
  content: StoredLesson;
};

/**
 * Équerre's correction of a national exam (D-103), printed like a course: what this visitor may
 * read, which the select policies decide (published for everyone, drafts for the tutor). Its id
 * is its paper's. Deduplicated per request.
 */
export const getPrintableCorrection = cache(
  async (id: string): Promise<PrintableCorrection | null> => {
    if (!UUID.test(id)) return null;

    const supabase = await createClient();
    const { data } = await supabase
      .from("exam_corrections")
      .select(
        "exam_id, summary, status, content, updated_at, exam:national_exams!inner(year, session, track, language, status, updated_at, programme:programmes!inner(slug, label))",
      )
      .eq("exam_id", id)
      .maybeSingle();
    if (!data) return null;

    return {
      id: data.exam_id,
      fileName: examFileName(data.exam.programme.slug, data.exam, "corrige-equerre"),
      isPublic: data.status === "published" && data.exam.status === "published",
      version: documentVersion(data.updated_at, data.exam.updated_at, data.exam.programme.label),
      programmeLabel: data.exam.programme.label,
      year: data.exam.year,
      session: data.exam.session,
      track: data.exam.track,
      summary: data.summary,
      content: readStoredLesson(data.content),
    };
  },
);

export type ReadableLessonEntry = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  kind: Database["public"]["Enums"]["document_kind"];
  shared: boolean;
  chapterId: string;
  chapterTitle: string;
  /** The programme, when not hers: a lesson shared from another one (« Statistiques » is in 34). */
  otherProgramme: string | null;
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
    "id, slug, title, summary, kind, visibility, position, chapter:chapters!inner(id, title, semester, position, programme_code, programme:programmes!inner(position, label))" as const;
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
        DOCUMENT_KINDS.indexOf(a.kind) - DOCUMENT_KINDS.indexOf(b.kind) ||
        a.position - b.position,
    )
    .map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      summary: lesson.summary,
      kind: lesson.kind,
      shared: lesson.visibility === "specific",
      chapterId: lesson.chapter.id,
      chapterTitle: lesson.chapter.title,
      otherProgramme:
        lesson.chapter.programme_code === programmeCode ? null : lesson.chapter.programme.label,
    }));
}
