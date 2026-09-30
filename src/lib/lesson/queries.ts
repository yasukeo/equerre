import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { documentVersion } from "@/lib/pdf/links";
import { publicClient } from "@/lib/supabase/public";
import { DOCUMENT_KINDS, type DocumentKind } from "./kinds";
import { readStoredLesson, type StoredLesson } from "./document";
import { publicStreams } from "./streams";

/** Every public lesson page carries this, so publishing one refreshes the listings. */
export const COURSE_INDEX_TAG = "cours:index";

export const lessonTag = (slug: string) => `lecon:${slug}`;

export type Cycle = "college" | "tronc_commun" | "1bac" | "2bac";
export { DOCUMENT_KINDS, type DocumentKind } from "./kinds";

/** `niveau` in a URL is a programme's slug: `2bac-sciences-experimentales` (D-094). */
export type LessonParams = { niveau: string; chapitre: string; lecon: string };

export type PublicLesson = {
  id: string;
  /** Its last change, which names its PDF (D-096). */
  version: string;
  title: string;
  summary: string | null;
  kind: DocumentKind;
  content: StoredLesson;
  publishedAt: string | null;
  chapterTitle: string;
  chapterSlug: string;
  programmeLabel: string;
  programmeSlug: string;
};

/** The most rows the API answers at once (supabase/config.toml, max_rows). */
const PAGE = 1000;

/**
 * Which lesson pages to prerender. Read anonymously, so it lists exactly the lessons a
 * visitor may see — the same rule that will let them through at request time.
 */
export async function listPublicLessons(): Promise<LessonParams[]> {
  "use cache";
  cacheTag(COURSE_INDEX_TAG);
  cacheLife("max");

  // Read page by page: a single answer stops at PAGE rows.
  const lessons: LessonParams[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await publicClient()
      .from("lessons")
      .select("id, slug, chapters!inner(slug, programmes!inner(slug))")
      .order("id")
      .range(from, from + PAGE - 1);
    // An error is not cached; an empty answer would be, and would drop every lesson page.
    if (error) throw new Error("Could not read the public lessons", { cause: error });
    for (const row of data) {
      lessons.push({
        niveau: row.chapters.programmes.slug,
        chapitre: row.chapters.slug,
        lecon: row.slug,
      });
    }
    if (data.length < PAGE) return lessons;
  }
}

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Whether a URL segment can be a slug at all. Checked before any cached read: a made-up address
 * then costs no cache entry and no query (D-094).
 */
export const isSlug = (value: string) => value.length <= 120 && SLUG.test(value);

export async function getPublicLesson(params: LessonParams): Promise<PublicLesson | null> {
  const { niveau, chapitre, lecon } = params;
  if (!isSlug(niveau) || !isSlug(chapitre) || !isSlug(lecon)) return null;
  return readPublicLesson({ niveau, chapitre, lecon });
}

async function readPublicLesson(params: LessonParams): Promise<PublicLesson | null> {
  "use cache";
  cacheTag(lessonTag(params.lecon), COURSE_INDEX_TAG);

  const { data, error } = await publicClient()
    .from("lessons")
    .select(
      "id, title, summary, kind, content, published_at, updated_at, chapters!inner(title, slug, updated_at, programmes!inner(slug, label))",
    )
    .eq("slug", params.lecon)
    .eq("chapters.slug", params.chapitre)
    .eq("chapters.programmes.slug", params.niveau)
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
    id: data.id,
    version: documentVersion(
      data.updated_at,
      data.chapters.updated_at,
      data.chapters.programmes.label,
    ),
    title: data.title,
    summary: data.summary,
    kind: data.kind,
    content: readStoredLesson(data.content),
    publishedAt: data.published_at,
    chapterTitle: data.chapters.title,
    chapterSlug: data.chapters.slug,
    programmeLabel: data.chapters.programmes.label,
    programmeSlug: data.chapters.programmes.slug,
  };
}

// ─────────────────────────────────────────────────────────────── programmes

export type ProgrammeSummary = {
  code: string;
  slug: string;
  label: string;
  cycle: Cycle;
  /** The streams that follow it, by the names students use: « Sciences physiques (PC) »… */
  streams: string[];
  chapterCount: number;
  /** Chapters with at least one document a visitor may read. */
  readyCount: number;
  /** Documents a visitor may read, in all its chapters. */
  documentCount: number;
};

/**
 * Every programme, in school order, with its streams: the index of the course (D-094).
 * Programmes and streams are written by migrations; the counts follow what is published.
 */
export async function listProgrammes(): Promise<ProgrammeSummary[]> {
  "use cache";
  cacheTag(COURSE_INDEX_TAG);
  cacheLife("max");

  // Lessons are counted by the database, as the visitor may see them: a list of them would
  // stop at the API's 1000 rows.
  const { data, error } = await publicClient()
    .from("programmes")
    .select(
      "code, slug, label, cycle, position, levels(code, label, position), chapters(id, lessons(count))",
    )
    .order("position");
  if (error) throw new Error("Could not read the programmes", { cause: error });

  return data.map((programme) => {
    const documents = programme.chapters.map((chapter) => chapter.lessons[0]?.count ?? 0);
    return {
      code: programme.code,
      slug: programme.slug,
      label: programme.label,
      cycle: programme.cycle as Cycle,
      streams: publicStreams(programme.levels),
      chapterCount: programme.chapters.length,
      readyCount: documents.filter((count) => count > 0).length,
      documentCount: documents.reduce((sum, count) => sum + count, 0),
    };
  });
}

/** Every chapter page, to prerender: the whole programme, written or not. */
export async function listChapterParams(): Promise<{ niveau: string; chapitre: string }[]> {
  "use cache";
  cacheTag(COURSE_INDEX_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("chapters")
    .select("slug, programmes!inner(slug)");
  if (error) throw new Error("Could not read the chapters", { cause: error });
  return data.map((row) => ({ niveau: row.programmes.slug, chapitre: row.slug }));
}

export type PublicDocument = {
  id: string;
  version: string;
  slug: string;
  title: string;
  summary: string | null;
  kind: DocumentKind;
};

export type ProgrammeChapter = {
  slug: string;
  title: string;
  semester: 1 | 2 | null;
  description: string | null;
  documents: PublicDocument[];
};

export type ProgrammeCourse = Omit<
  ProgrammeSummary,
  "chapterCount" | "readyCount" | "documentCount"
> & {
  chapters: ProgrammeChapter[];
};

/**
 * One programme's table of contents: every chapter of the official programme, by semester,
 * with the documents a visitor may read in each. A chapter still being written is listed,
 * so the whole year shows.
 */
export async function getProgrammeCourse(slug: string): Promise<ProgrammeCourse | null> {
  return isSlug(slug) ? readProgrammeCourse(slug) : null;
}

async function readProgrammeCourse(slug: string): Promise<ProgrammeCourse | null> {
  "use cache";
  cacheTag(COURSE_INDEX_TAG);

  const client = publicClient();
  const { data: programme, error } = await client
    .from("programmes")
    .select("code, slug, label, cycle, levels(code, label, position)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error("Could not read the programme", { cause: error });
  if (!programme) {
    cacheLife("minutes");
    return null;
  }

  const [chapters, lessons] = await Promise.all([
    client
      .from("chapters")
      .select("id, slug, title, semester, position, description, updated_at")
      .eq("programme_code", programme.code)
      .order("semester")
      .order("position"),
    client
      .from("lessons")
      .select(
        "id, slug, title, summary, kind, position, updated_at, chapter_id, chapters!inner(programme_code)",
      )
      .eq("chapters.programme_code", programme.code)
      .order("position"),
  ]);
  if (chapters.error) throw new Error("Could not read the chapters", { cause: chapters.error });
  if (lessons.error) throw new Error("Could not read the lessons", { cause: lessons.error });
  cacheLife("max");

  return {
    code: programme.code,
    slug: programme.slug,
    label: programme.label,
    cycle: programme.cycle as Cycle,
    streams: publicStreams(programme.levels),
    chapters: chapters.data.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      semester: chapter.semester === 1 || chapter.semester === 2 ? chapter.semester : null,
      description: chapter.description,
      documents: sortDocuments(
        lessons.data
          .filter((lesson) => lesson.chapter_id === chapter.id)
          .map((lesson) => ({
            id: lesson.id,
            version: documentVersion(lesson.updated_at, chapter.updated_at, programme.label),
            slug: lesson.slug,
            title: lesson.title,
            summary: lesson.summary,
            kind: lesson.kind,
            position: lesson.position,
          })),
      ),
    })),
  };
}

/** Course, summary, series, tests; within a kind, in the tutor's order. */
function sortDocuments(documents: (PublicDocument & { position: number })[]): PublicDocument[] {
  return [...documents]
    .sort(
      (a, b) =>
        DOCUMENT_KINDS.indexOf(a.kind) - DOCUMENT_KINDS.indexOf(b.kind) || a.position - b.position,
    )
    .map(({ id, version, slug, title, summary, kind }) => ({
      id,
      version,
      slug,
      title,
      summary,
      kind,
    }));
}
