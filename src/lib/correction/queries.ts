import "server-only";
import { readChoices, type AnswerType, type Choice } from "@/lib/exercise/exercise";
import { readAnswer, type SubmittedAnswer } from "@/lib/homework/answer";
import { readStoredLesson, type StoredLesson } from "@/lib/lesson/document";
import { signSubject } from "@/lib/homework/subject";
import { signPages, type Page } from "@/lib/submission-pages";
import { createClient } from "@/lib/supabase/server";
import type { Remark } from "./correction";

// The tutor's corrections, read through her own session (DECISIONS.md, D-047).

type Client = Awaited<ReturnType<typeof createClient>>;

function must<Result extends { data: unknown; error: unknown }>(
  result: Result,
): NonNullable<Result["data"]> | null {
  if (result.error) throw new Error("Could not read the corrections", { cause: result.error });
  return result.data ?? null;
}

export type QueueEntry = {
  id: string;
  submittedAt: string;
  late: boolean;
  pages: number;
  /** Copies handed in as PDFs, counted apart from photographed pages (D-106). */
  pdfs: number;
  student: string;
  exercise: string;
  homework: string;
  homeworkId: string;
  studentId: string;
};

/** Photographed copies waiting for her, the longest-waiting first. */
export async function listCorrectionQueue(): Promise<QueueEntry[]> {
  const supabase = await createClient();
  const rows =
    must(
      await supabase
        .from("submissions")
        .select(
          "id, submitted_at, file_paths, student:profiles!submissions_student_id_fkey(id, full_name), exercise:exercises(title), assignment:assignments(id, title, due_at)",
        )
        .eq("status", "rendu")
        .order("submitted_at"),
    ) ?? [];
  return rows.map((row) => ({
    id: row.id,
    submittedAt: row.submitted_at,
    late: Date.parse(row.submitted_at) > Date.parse(row.assignment.due_at),
    pages: row.file_paths.filter((path) => !path.endsWith(".pdf")).length,
    pdfs: row.file_paths.filter((path) => path.endsWith(".pdf")).length,
    student: row.student.full_name,
    exercise: row.exercise.title,
    homework: row.assignment.title,
    homeworkId: row.assignment.id,
    studentId: row.student.id,
  }));
}

export async function countCorrectionQueue(supabase?: Client): Promise<number> {
  const client = supabase ?? (await createClient());
  const { count, error } = await client
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("status", "rendu");
  if (error) throw new Error("Could not count the corrections", { cause: error });
  return count ?? 0;
}

export type Correction = {
  id: string;
  status: "rendu" | "corrige";
  submittedAt: string;
  correctedAt: string | null;
  late: boolean;
  /** Decimal text, as `grade::text` gives it. */
  grade: string | null;
  feedback: string | null;
  autoGraded: boolean;
  answer: SubmittedAnswer;
  pages: Page[];
  remarks: Remark[];
  student: { id: string; name: string };
  homework: { id: string; title: string; dueAt: string };
  exercise: {
    id: string;
    title: string;
    answerType: AnswerType;
    statement: StoredLesson;
    /** A homework given as a PDF: an address to open its subject (D-106). */
    subjectUrl: string | null;
    subject: boolean;
    choices: Choice[];
  };
  solution: {
    document: StoredLesson;
    correctNumeric: string | null;
    tolerance: string | null;
    toleranceKind: "absolue" | "relative";
    correctChoiceIds: string[];
  } | null;
  /**
   * When she opened the solution of this exercise, in any homework. The grading refuses a copy
   * after a reveal, so this is always after the copy was handed in: the copy did not profit.
   */
  revealedAt: string | null;
  /** The copy that has waited longest after this one, to go on to. */
  next: string | null;
  waiting: number;
};

export async function getCorrection(id: string): Promise<Correction | null> {
  const supabase = await createClient();
  const row = must(
    await supabase
      .from("submissions")
      .select(
        "id, status, answer, file_paths, grade::text, feedback, submitted_at, corrected_at, auto_graded, student:profiles!submissions_student_id_fkey(id, full_name), assignment:assignments(id, title, due_at), exercise:exercises(id, title, answer_type, statement, choices, subject_path, solution:exercise_solutions(solution, correct_numeric::text, tolerance::text, tolerance_kind, correct_choice_ids))",
      )
      .eq("id", id)
      .maybeSingle(),
  );
  if (!row) return null;

  // A page named twice would be drawn, and its remarks numbered, twice (D-047).
  const paths = [...new Set(row.file_paths)];
  const [remarks, reveal, queue, pages, subjectUrl] = await Promise.all([
    supabase
      .from("submission_comments")
      .select("id, body, anchor, created_at")
      .eq("submission_id", id)
      .order("created_at"),
    supabase
      .from("exercise_reveals")
      .select("revealed_at")
      .eq("student_id", row.student.id)
      .eq("exercise_id", row.exercise.id)
      .order("revealed_at")
      .limit(1)
      .maybeSingle(),
    // The queue in its order, to go on to the copy after this one rather than back to the
    // oldest — a copy she skips would otherwise send her back and forth between two.
    supabase
      .from("submissions")
      .select("id, assignment_id")
      .eq("status", "rendu")
      .order("submitted_at")
      .order("id"),
    signPages(supabase, paths),
    signSubject(supabase, row.exercise.subject_path),
  ]);
  // Homework by homework, as the queue's page lists them: each homework in the order of its
  // longest-waiting copy, its copies oldest first.
  const byHomework = new Map<string, string[]>();
  for (const entry of must(queue) ?? []) {
    byHomework.set(entry.assignment_id, [...(byHomework.get(entry.assignment_id) ?? []), entry.id]);
  }
  const waitingIds = [...byHomework.values()].flat();
  const here = waitingIds.indexOf(id);
  const next = (here === -1 ? waitingIds[0] : (waitingIds[here + 1] ?? waitingIds[0])) ?? null;

  const solution = row.exercise.solution;
  return {
    id: row.id,
    status: row.status,
    submittedAt: row.submitted_at,
    correctedAt: row.corrected_at,
    late: Date.parse(row.submitted_at) > Date.parse(row.assignment.due_at),
    grade: row.grade,
    feedback: row.feedback,
    autoGraded: row.auto_graded,
    answer: readAnswer(row.answer),
    pages,
    remarks: (must(remarks) ?? []).map((remark) => ({
      id: remark.id,
      body: remark.body,
      anchor: remark.anchor,
      createdAt: remark.created_at,
    })),
    student: { id: row.student.id, name: row.student.full_name },
    homework: { id: row.assignment.id, title: row.assignment.title, dueAt: row.assignment.due_at },
    exercise: {
      id: row.exercise.id,
      title: row.exercise.title,
      answerType: row.exercise.answer_type,
      statement: readStoredLesson(row.exercise.statement),
      subjectUrl,
      subject: row.exercise.subject_path !== null,
      choices: readChoices(row.exercise.choices),
    },
    solution: solution
      ? {
          document: readStoredLesson(solution.solution),
          correctNumeric: solution.correct_numeric,
          tolerance: solution.tolerance,
          toleranceKind: solution.tolerance_kind,
          correctChoiceIds: solution.correct_choice_ids ?? [],
        }
      : null,
    revealedAt: must(reveal)?.revealed_at ?? null,
    next: next === id ? null : next,
    waiting: waitingIds.length,
  };
}
