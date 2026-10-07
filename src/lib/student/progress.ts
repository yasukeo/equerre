import "server-only";
import { cache } from "react";
import type { Viewer } from "@/lib/auth";
import { localDateKey } from "@/lib/dates";
import { EXAM_PROGRAMMES } from "@/lib/exams/exam-dates";
import { listProgrammes } from "@/lib/lesson/queries";
import { listReadableLessons, type ReadableLessonEntry } from "@/lib/lesson/readable";
import { createClient } from "@/lib/supabase/server";

// The student's own way through her course (DECISIONS.md, D-104): what she opened, how far she
// read, what she understood, what she keeps « à revoir ». Read through her session: RLS gives
// her her own rows and nothing else.

export type DocumentProgress = Omit<ReadableLessonEntry, "chapterId" | "chapterTitle"> & {
  opened: boolean;
  /** How far down she read, 0 to 1. */
  position: number;
  understood: boolean;
  bookmarked: boolean;
  lastOpenedAt: string | null;
};

export type ChapterState = "a_commencer" | "en_cours" | "compris";

export type ChapterProgress = {
  id: string;
  slug: string;
  title: string;
  semester: number | null;
  description: string | null;
  /** Its number in the programme, from 1. */
  number: number;
  documents: DocumentProgress[];
  opened: number;
  understood: number;
  state: ChapterState;
};

export type StudentCourse = {
  programme: { code: string; slug: string; label: string; cycle: string } | null;
  chapters: ChapterProgress[];
  /** Lessons shared with her from another programme (D-094). */
  shared: (DocumentProgress & { chapterTitle: string })[];
  totals: { documents: number; opened: number; understood: number; chaptersDone: number };
};

type ProgressRow = {
  lesson_id: string;
  position: number;
  understood_at: string | null;
  last_opened_at: string;
};

/** Whose course: the student herself, or one the tutor opens (D-104). */
export type CourseOwner = Pick<Viewer, "id" | "programmeCode">;

/**
 * Her programme, chapter by chapter, with where she stands in each document. The tutor reads it
 * for a student with `tutorView`: from her session every lesson shared by name would come back,
 * so only those shared with this student are kept.
 */
export const getStudentCourse = cache(
  async (viewer: CourseOwner, tutorView = false): Promise<StudentCourse> => {
    const supabase = await createClient();
    const [programmes, readable, chapters, progress, bookmarks, access] = await Promise.all([
      listProgrammes(),
      listReadableLessons(viewer.programmeCode),
      viewer.programmeCode
        ? supabase
            .from("chapters")
            .select("id, slug, title, semester, position, description")
            .eq("programme_code", viewer.programmeCode)
            .order("semester")
            .order("position")
        : Promise.resolve({ data: [] as never[] }),
      supabase
        .from("lesson_progress")
        .select("lesson_id, position, understood_at, last_opened_at")
        .eq("student_id", viewer.id),
      supabase.from("lesson_bookmarks").select("lesson_id").eq("student_id", viewer.id),
      tutorView
        ? supabase.from("lesson_access").select("lesson_id").eq("student_id", viewer.id)
        : Promise.resolve({ data: [] as { lesson_id: string }[] }),
    ]);

    const sharedWithHer = new Set((access.data ?? []).map((row) => row.lesson_id));
    const lessons = tutorView
      ? readable.filter(
          (lesson) =>
            (!lesson.shared && lesson.otherProgramme === null) || sharedWithHer.has(lesson.id),
        )
      : readable;
    const mine = programmes.find((programme) => programme.code === viewer.programmeCode);
    const byLesson = new Map(
      ((progress.data ?? []) as ProgressRow[]).map((row) => [row.lesson_id, row]),
    );
    const saved = new Set((bookmarks.data ?? []).map((row) => row.lesson_id));

    const withProgress = (lesson: ReadableLessonEntry): DocumentProgress => {
      const row = byLesson.get(lesson.id);
      return {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        summary: lesson.summary,
        kind: lesson.kind,
        shared: lesson.shared,
        otherProgramme: lesson.otherProgramme,
        opened: row !== undefined,
        position: row?.position ?? 0,
        understood: Boolean(row?.understood_at),
        bookmarked: saved.has(lesson.id),
        lastOpenedAt: row?.last_opened_at ?? null,
      };
    };

    const ownChapters = chapters.data ?? [];
    const ownChapterIds = new Set(ownChapters.map((chapter) => chapter.id));
    const documentsByChapter = new Map<string, DocumentProgress[]>();
    const shared: StudentCourse["shared"] = [];
    for (const lesson of lessons) {
      if (ownChapterIds.has(lesson.chapterId)) {
        const list = documentsByChapter.get(lesson.chapterId) ?? [];
        list.push(withProgress(lesson));
        documentsByChapter.set(lesson.chapterId, list);
      } else {
        shared.push({
          ...withProgress(lesson),
          chapterTitle: lesson.otherProgramme
            ? `${lesson.otherProgramme} · ${lesson.chapterTitle}`
            : lesson.chapterTitle,
        });
      }
    }

    const result: ChapterProgress[] = ownChapters.map((chapter, index) => {
      const documents = documentsByChapter.get(chapter.id) ?? [];
      const opened = documents.filter((document) => document.opened).length;
      const understood = documents.filter((document) => document.understood).length;
      return {
        id: chapter.id,
        slug: chapter.slug,
        title: chapter.title,
        semester: chapter.semester,
        description: chapter.description,
        number: index + 1,
        documents,
        opened,
        understood,
        state:
          documents.length > 0 && understood === documents.length
            ? "compris"
            : opened > 0
              ? "en_cours"
              : "a_commencer",
      };
    });

    const all = [...result.flatMap((chapter) => chapter.documents), ...shared];
    return {
      programme: mine
        ? { code: mine.code, slug: mine.slug, label: mine.label, cycle: mine.cycle }
        : null,
      chapters: result,
      shared,
      totals: {
        documents: all.length,
        opened: all.filter((document) => document.opened).length,
        understood: all.filter((document) => document.understood).length,
        chaptersDone: result.filter((chapter) => chapter.state === "compris").length,
      },
    };
  },
);

export type ResumePoint = {
  document: DocumentProgress;
  chapter: { slug: string; title: string; number: number } | null;
};

/**
 * Where « Reprendre » takes her: the document she opened last, if she has not finished it;
 * if she has, the next one after it she has not; with nothing opened yet, the very first. An
 * old document glanced at once does not hold her back from where she now is.
 */
export function resumePoint(course: StudentCourse): ResumePoint | null {
  const located = course.chapters.flatMap((chapter) =>
    chapter.documents.map((document) => ({
      document,
      chapter: { slug: chapter.slug, title: chapter.title, number: chapter.number },
    })),
  );
  const last = located
    .filter((entry) => entry.document.lastOpenedAt)
    .sort((a, b) =>
      (b.document.lastOpenedAt ?? "").localeCompare(a.document.lastOpenedAt ?? ""),
    )[0];
  if (last && !last.document.understood) return last;
  const from = last ? located.indexOf(last) + 1 : 0;
  return (
    located.slice(from).find((entry) => !entry.document.understood) ??
    located.find((entry) => !entry.document.understood) ??
    null
  );
}

// ─────────────────────────────────────────────────────────────── the exam ahead

const EXAM_KIND: Record<string, "national" | "regional"> = EXAM_PROGRAMMES;

export type ExamCountdown = {
  kind: "national" | "regional";
  /** `yyyy-MM-dd`, in Casablanca. */
  date: string;
  /** Set by the tutor; otherwise an estimate the page says is one. */
  confirmed: boolean;
  daysLeft: number;
};

const DAY = 24 * 60 * 60 * 1000;

function daysBetween(fromKey: string, toKey: string): number {
  return Math.round((Date.parse(`${toKey}T00:00:00Z`) - Date.parse(`${fromKey}T00:00:00Z`)) / DAY);
}

/**
 * The first Monday of June after `todayKey`: when the bac and the 3e année exam usually
 * start. Shown as an estimate until the tutor sets the real date.
 */
export function indicativeDate(todayKey: string): string {
  const year = Number(todayKey.slice(0, 4));
  const firstMondayOfJune = (candidate: number) => {
    const first = new Date(Date.UTC(candidate, 5, 1));
    return new Date(first.getTime() + ((8 - first.getUTCDay()) % 7) * DAY)
      .toISOString()
      .slice(0, 10);
  };
  const thisYear = firstMondayOfJune(year);
  return thisYear >= todayKey ? thisYear : firstMondayOfJune(year + 1);
}

/** Days left before the exam her programme prepares for, if it has one. */
export async function getExamCountdown(
  programmeCode: string | null,
  now: Date,
): Promise<ExamCountdown | null> {
  const kind = programmeCode ? EXAM_KIND[programmeCode] : undefined;
  if (!programmeCode || !kind) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("exam_dates")
    .select("starts_on")
    .eq("programme_code", programmeCode)
    .maybeSingle();
  const today = localDateKey(now);
  const set = data?.starts_on && data.starts_on >= today ? data.starts_on : null;
  const date = set ?? indicativeDate(today);
  return { kind, date, confirmed: set !== null, daysLeft: Math.max(daysBetween(today, date), 0) };
}

export type PlanStep = {
  /** Monday of its first week, `yyyy-MM-dd`. */
  start: string;
  /** Sunday of its last week. */
  end: string;
  weeks: number;
  chapters: { slug: string; title: string; number: number; state: ChapterState }[];
  /** The last weeks before the exam go to past papers. */
  pastPapers: boolean;
  /** It holds the current week. */
  current: boolean;
};

/** A plan longer than two school years means a mistyped date: it stops there. */
const MAX_WEEKS = 104;

/** Weeks kept at the end for past papers, when there is room for them. */
const PAPER_WEEKS = 3;

/**
 * Her revision plan: the chapters she has not finished, spread evenly over the weeks left
 * before the exam, the last weeks kept for past papers. With more weeks than chapters, a
 * chapter takes several weeks in a row; with fewer, a week takes several chapters. Weeks in a
 * row with the same work make one step. Recomputed as she goes, so a chapter she finishes
 * early frees the weeks after it.
 */
export function revisionPlan(
  course: StudentCourse,
  countdown: ExamCountdown,
  now: Date,
): PlanStep[] {
  const today = localDateKey(now);
  const weekday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const monday = Date.parse(`${today}T00:00:00Z`) - weekday * DAY;
  // The weeks before the exam's: its own week is the exam, not revision.
  const weeks = Math.min(Math.max(Math.ceil((countdown.daysLeft + weekday) / 7), 1), MAX_WEEKS);
  const paperWeeks = weeks > PAPER_WEEKS + 2 ? PAPER_WEEKS : 0;
  const studyWeeks = weeks - paperWeeks;
  const left = course.chapters
    .filter((chapter) => chapter.documents.length > 0 && chapter.state !== "compris")
    .map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      number: chapter.number,
      state: chapter.state,
    }));

  const work = (week: number): PlanStep["chapters"] | "papers" => {
    if (week >= studyWeeks) return "papers";
    if (left.length === 0) return [];
    if (left.length <= studyWeeks) {
      return [left[Math.floor((week * left.length) / studyWeeks)]!];
    }
    return left.slice(
      Math.floor((week * left.length) / studyWeeks),
      Math.floor(((week + 1) * left.length) / studyWeeks),
    );
  };
  const key = (value: PlanStep["chapters"] | "papers") =>
    value === "papers" ? "papers" : value.map((chapter) => chapter.slug).join(",");

  const steps: PlanStep[] = [];
  for (let week = 0; week < weeks; week++) {
    const value = work(week);
    const start = new Date(monday + week * 7 * DAY).toISOString().slice(0, 10);
    const end = new Date(monday + (week * 7 + 6) * DAY).toISOString().slice(0, 10);
    const last = steps.at(-1);
    if (last && key(last.pastPapers ? "papers" : last.chapters) === key(value)) {
      last.end = end;
      last.weeks += 1;
      continue;
    }
    steps.push({
      start,
      end,
      weeks: 1,
      chapters: value === "papers" ? [] : value,
      pastPapers: value === "papers",
      current: week === 0,
    });
  }
  return steps;
}

// ─────────────────────────────────────────────────────────────── exam mode

export type ExamAttempt = {
  id: string;
  examId: string;
  /** The paper, to name it in her lists. */
  exam: { year: number; session: "normale" | "rattrapage"; track: string | null } | null;
  startedAt: string;
  finishedAt: string | null;
  durationMinutes: number;
  selfScore: number | null;
};

export async function listMyExamAttempts(viewer: Viewer): Promise<ExamAttempt[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exam_attempts")
    .select(
      "id, exam_id, started_at, finished_at, duration_minutes, self_score, exam:national_exams(year, session, track)",
    )
    .eq("student_id", viewer.id)
    .order("started_at", { ascending: false })
    .limit(200);
  return (data ?? []).map((row) => ({
    id: row.id,
    examId: row.exam_id,
    exam: row.exam,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    durationMinutes: row.duration_minutes,
    selfScore: row.self_score,
  }));
}

/** The time the ministry gives each programme's paper, in minutes. */
export const PAPER_MINUTES: Record<string, number> = {
  "2BAC-SM": 240,
  "2BAC-SEXP": 180,
  "2BAC-ECO": 120,
  "2BAC-LSH": 120,
};

// ─────────────────────────────────────────────────────────────── grades over time

export type GradePoint = {
  assignmentId: string;
  exerciseId: string;
  title: string;
  grade: number;
  correctedAt: string;
};

/** Her latest 500 grades, oldest first: the line of her progress. */
export async function listMyGradeHistory(): Promise<GradePoint[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("submissions")
    .select("assignment_id, exercise_id, grade, corrected_at, exercise:exercises(title)")
    .eq("status", "corrige")
    .not("grade", "is", null)
    .not("corrected_at", "is", null)
    .order("corrected_at", { ascending: false })
    .limit(500);
  return [...(data ?? [])].reverse().flatMap((row) =>
    row.grade === null || !row.corrected_at || !(row.exercise as { title: string } | null)
      ? []
      : [
          {
            assignmentId: row.assignment_id,
            exerciseId: row.exercise_id,
            title: row.exercise.title,
            grade: row.grade,
            correctedAt: row.corrected_at,
          },
        ],
  );
}
