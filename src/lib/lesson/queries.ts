import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicClient } from "@/lib/supabase/public";
import { DOCUMENT_KINDS, type DocumentKind } from "./kinds";
import { readStoredLesson, type StoredLesson } from "./document";

/** Every public lesson page carries this, so publishing one refreshes the listings. */
export const COURSE_INDEX_TAG = "cours:index";

export const lessonTag = (slug: string) => `lecon:${slug}`;

export type Cycle = "college" | "tronc_commun" | "1bac" | "2bac";
export { DOCUMENT_KINDS, type DocumentKind } from "./kinds";

/** `niveau` in a URL is a programme's slug: `2bac-sciences-experimentales` (D-094). */
export type LessonParams = { niveau: string; chapitre: string; lecon: string };

export type PublicLesson = {
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
    .select("slug, position, chapters!inner(slug, programmes!inner(slug))")
    .order("position");
  // An error is not cached; an empty answer would be, and would drop every lesson page.
  if (error) throw new Error("Could not read the public lessons", { cause: error });

  return data.map((row) => ({
    niveau: row.chapters.programmes.slug,
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
      "title, summary, kind, content, published_at, chapters!inner(title, slug, programmes!inner(slug, label))",
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

/**
 * A stream named under its programme: « 2e bac Sciences physiques » is « Sciences physiques »
 * on the page of « 2e bac Sciences expérimentales et technologiques ».
 */
export function streamName(label: string): string {
  const name = label.replace(/^(1re bac|2e bac|Tronc commun)\s+/u, "");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export type ProgrammeSummary = {
  code: string;
  slug: string;
  label: string;
  cycle: Cycle;
  /** The streams that follow it, by their short name: « Sciences physiques », « SVT »… */
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

  const client = publicClient();
  const [programmes, lessons] = await Promise.all([
    client
      .from("programmes")
      .select("code, slug, label, cycle, position, levels(label, position), chapters(id)")
      .order("position"),
    client.from("lessons").select("chapter_id, chapters!inner(programme_code)"),
  ]);
  if (programmes.error)
    throw new Error("Could not read the programmes", { cause: programmes.error });
  if (lessons.error) throw new Error("Could not read the public lessons", { cause: lessons.error });

  const documentsByChapter = new Map<string, number>();
  for (const row of lessons.data) {
    documentsByChapter.set(row.chapter_id, (documentsByChapter.get(row.chapter_id) ?? 0) + 1);
  }
  return programmes.data.map((programme) => ({
    code: programme.code,
    slug: programme.slug,
    label: programme.label,
    cycle: programme.cycle as Cycle,
    streams: [...programme.levels]
      .sort((a, b) => a.position - b.position)
      .map((level) => streamName(level.label)),
    chapterCount: programme.chapters.length,
    readyCount: programme.chapters.filter((chapter) => documentsByChapter.has(chapter.id)).length,
    documentCount: programme.chapters.reduce(
      (sum, chapter) => sum + (documentsByChapter.get(chapter.id) ?? 0),
      0,
    ),
  }));
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
  "use cache";
  cacheTag(COURSE_INDEX_TAG);

  const client = publicClient();
  const { data: programme, error } = await client
    .from("programmes")
    .select("code, slug, label, cycle, levels(label, position)")
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
      .select("id, slug, title, semester, position, description")
      .eq("programme_code", programme.code)
      .order("semester")
      .order("position"),
    client
      .from("lessons")
      .select("slug, title, summary, kind, position, chapter_id, chapters!inner(programme_code)")
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
    streams: [...programme.levels]
      .sort((a, b) => a.position - b.position)
      .map((level) => streamName(level.label)),
    chapters: chapters.data.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      semester: chapter.semester === 1 || chapter.semester === 2 ? chapter.semester : null,
      description: chapter.description,
      documents: sortDocuments(
        lessons.data
          .filter((lesson) => lesson.chapter_id === chapter.id)
          .map((lesson) => ({
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
    .map(({ slug, title, summary, kind }) => ({ slug, title, summary, kind }));
}

/**
 * The programme a stream's old address pointed to: before programmes, a course URL named the
 * level (`/cours/2bac-pc/…`). Null when the slug is no stream either.
 */
export async function programmeSlugForLevel(slug: string): Promise<string | null> {
  "use cache";
  cacheLife("max");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  const { data, error } = await publicClient()
    .from("levels")
    .select("programmes!inner(slug)")
    .eq("code", slug.toUpperCase())
    .maybeSingle();
  if (error) throw new Error("Could not read the level", { cause: error });
  return data?.programmes.slug ?? null;
}
