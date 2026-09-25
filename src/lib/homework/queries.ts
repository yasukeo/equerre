import "server-only";
import { createHash } from "node:crypto";
import {
  readChoices,
  type AnswerType,
  type Choice,
  type ChoiceMode,
} from "@/lib/exercise/exercise";
import { readStoredLesson, type StoredLesson } from "@/lib/lesson/document";
import { isSubmissionPageName } from "@/lib/storage-paths";
import { createClient } from "@/lib/supabase/server";
import { progressOf, workOn, type ExerciseWork, type HomeworkProgress } from "./work";

// A student's homework, read through her own session: the policies decide what reaches her
// (DECISIONS.md, D-046, D-060). Nothing here is cached across students.

type Client = Awaited<ReturnType<typeof createClient>>;

/** A row the policies may hide (null), or a failed read, which throws rather than pass for one. */
function read<Result extends { data: unknown; error: unknown }>(
  result: Result,
): NonNullable<Result["data"]> | null {
  if (result.error) {
    throw new Error("Could not read the student's homework", { cause: result.error });
  }
  return result.data ?? null;
}

/** PostgREST's max_rows: a longer answer is cut there without a word. */
const PAGE = 1000;

/**
 * Every row a query returns, page by page. A failed read throws: showing work as « À faire »
 * because a request failed would offer answers the grading refuses.
 */
async function readAll<Row>(
  page: (from: number, to: number) => PromiseLike<{ data: Row[] | null; error: unknown }>,
): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error("Could not read the student's work", { cause: error });
    rows.push(...(data ?? []));
    if ((data?.length ?? 0) < PAGE) return rows;
  }
}

/**
 * Her own submissions and reveals: the policies show a student nothing else. Read across every
 * homework, because work done in one closes the same exercise in another. Without exercises
 * named, everything she has done — no list of ids to outgrow a URL.
 */
async function myWork(supabase: Client, exerciseIds?: string[]) {
  if (exerciseIds?.length === 0) return { submissions: [], reveals: [] };
  const [submissions, reveals] = await Promise.all([
    readAll((from, to) => {
      const query = supabase
        .from("submissions")
        .select("assignment_id, exercise_id, status, grade")
        .order("assignment_id")
        .order("exercise_id")
        .range(from, to);
      return exerciseIds ? query.in("exercise_id", exerciseIds) : query;
    }),
    readAll((from, to) => {
      const query = supabase
        .from("exercise_reveals")
        .select("assignment_id, exercise_id")
        .order("assignment_id")
        .order("exercise_id")
        .range(from, to);
      return exerciseIds ? query.in("exercise_id", exerciseIds) : query;
    }),
  ]);
  return { submissions, reveals };
}

export type HomeworkEntry = {
  id: string;
  title: string;
  dueAt: string;
  progress: HomeworkProgress;
};

/** Every homework that reaches her, with how much is left. */
export async function listMyHomework(now: Date): Promise<HomeworkEntry[]> {
  const supabase = await createClient();
  const [assignments, { submissions, reveals }] = await Promise.all([
    readAll((from, to) =>
      supabase
        .from("assignments")
        .select("id, title, due_at, items:assignment_items(exercise_id)")
        .order("id")
        .range(from, to),
    ),
    myWork(supabase),
  ]);

  return assignments.map((assignment) => ({
    id: assignment.id,
    title: assignment.title,
    dueAt: assignment.due_at,
    progress: progressOf(
      assignment.id,
      assignment.items.map((item) => item.exercise_id),
      assignment.due_at,
      now,
      submissions,
      reveals,
    ),
  }));
}

export type HomeworkDetails = {
  id: string;
  title: string;
  instructions: string | null;
  dueAt: string;
  progress: HomeworkProgress;
  exercises: { id: string; title: string; answerType: AnswerType; work: ExerciseWork }[];
};

export async function getMyHomework(id: string, now: Date): Promise<HomeworkDetails | null> {
  const supabase = await createClient();
  const data = read(
    await supabase
      .from("assignments")
      .select(
        "id, title, instructions, due_at, items:assignment_items(position, exercise:exercises(id, title, answer_type))",
      )
      .eq("id", id)
      .maybeSingle(),
  );
  if (!data) return null;

  const items = [...data.items]
    .sort((a, b) => a.position - b.position)
    .flatMap((item) => (item.exercise ? [item.exercise] : []));
  const exerciseIds = items.map((exercise) => exercise.id);
  const { submissions, reveals } = await myWork(supabase, exerciseIds);

  return {
    id: data.id,
    title: data.title,
    instructions: data.instructions,
    dueAt: data.due_at,
    progress: progressOf(data.id, exerciseIds, data.due_at, now, submissions, reveals),
    exercises: items.map((exercise) => ({
      id: exercise.id,
      title: exercise.title,
      answerType: exercise.answer_type,
      work: workOn(data.id, exercise.id, submissions, reveals),
    })),
  };
}

/**
 * The folder her photographed pages wait in before she hands them in:
 * `<student_id>/<submission_ref>/…` (D-052). The reference is derived from the homework and
 * the exercise, so pages sent from one visit are still there on the next, and on another device.
 */
export function draftReference(assignmentId: string, exerciseId: string): string {
  const hex = createHash("sha256").update(`${assignmentId}:${exerciseId}`).digest("hex");
  // Shaped as a version-5 UUID, which is what storage paths expect of every segment.
  const variant = ((parseInt(hex[16] ?? "0", 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

export type Page = { path: string; url: string | null };

/** What she answered, as submit_exercise_answer stored it, trusted only as far as it reads. */
export type SubmittedAnswer = { raw: string | null; choiceIds: string[] };

function readAnswer(value: unknown): SubmittedAnswer {
  const answer = (typeof value === "object" && value !== null ? value : {}) as Record<
    string,
    unknown
  >;
  return {
    raw:
      typeof answer.raw === "string"
        ? answer.raw
        : typeof answer.value === "string"
          ? answer.value
          : null,
    choiceIds: Array.isArray(answer.choiceIds)
      ? answer.choiceIds.filter((id): id is string => typeof id === "string")
      : [],
  };
}

export type ExerciseSolution = {
  document: StoredLesson;
  correctNumeric: string | null;
  tolerance: string | null;
  toleranceKind: "absolue" | "relative";
  correctChoiceIds: string[];
};

export type MyExercise = {
  homework: { id: string; title: string; dueAt: string };
  exercise: {
    id: string;
    title: string;
    statement: StoredLesson;
    answerType: AnswerType;
    choices: Choice[];
    choiceMode: ChoiceMode;
  };
  position: { index: number; count: number; previous: string | null; next: string | null };
  work: ExerciseWork;
  /** What she sent in this homework, if anything. */
  submission: {
    answer: SubmittedAnswer;
    pages: Page[];
    feedback: string | null;
  } | null;
  /** Pages uploaded but not handed in yet. */
  drafts: Page[];
  draftReference: string;
  /** Present once the policies open it: after a correction, or once she asked for it. */
  solution: ExerciseSolution | null;
};

async function signed(supabase: Client, paths: string[]): Promise<Page[]> {
  if (paths.length === 0) return [];
  const { data } = await supabase.storage.from("submissions").createSignedUrls(paths, 3600);
  return paths.map((path) => ({
    path,
    url: data?.find((entry) => entry.path === path)?.signedUrl ?? null,
  }));
}

export async function getMyExercise(
  studentId: string,
  assignmentId: string,
  exerciseId: string,
): Promise<MyExercise | null> {
  const supabase = await createClient();
  const homework = read(
    await supabase
      .from("assignments")
      .select("id, title, due_at, items:assignment_items(position, exercise_id)")
      .eq("id", assignmentId)
      .maybeSingle(),
  );
  if (!homework) return null;
  const order = [...homework.items]
    .sort((a, b) => a.position - b.position)
    .map((item) => item.exercise_id);
  const index = order.indexOf(exerciseId);
  if (index === -1) return null;

  const ref = draftReference(assignmentId, exerciseId);
  const [exerciseRead, work, submissionRead, solutionRead, { data: folder }] = await Promise.all([
    supabase
      .from("exercises")
      .select("id, title, statement, answer_type, choices, choice_mode")
      .eq("id", exerciseId)
      .maybeSingle(),
    myWork(supabase, [exerciseId]),
    supabase
      .from("submissions")
      .select("answer, file_paths, feedback")
      .eq("assignment_id", assignmentId)
      .eq("exercise_id", exerciseId)
      .maybeSingle(),
    supabase
      .from("exercise_solutions")
      .select(
        "solution, correct_numeric::text, tolerance::text, tolerance_kind, correct_choice_ids",
      )
      .eq("exercise_id", exerciseId)
      .maybeSingle(),
    supabase.storage.from("submissions").list(`${studentId}/${ref}`, {
      limit: 100,
      sortBy: { column: "created_at", order: "asc" },
    }),
  ]);
  const exercise = read(exerciseRead);
  const submission = read(submissionRead);
  const solution = read(solutionRead);
  if (!exercise) return null;

  const handedIn = submission?.file_paths ?? [];
  const draftPaths = (folder ?? [])
    .map((object) => `${studentId}/${ref}/${object.name}`)
    .filter((path) => isSubmissionPageName(path) && !handedIn.includes(path));
  const [pages, drafts] = await Promise.all([
    signed(supabase, handedIn),
    signed(supabase, draftPaths),
  ]);

  return {
    homework: { id: homework.id, title: homework.title, dueAt: homework.due_at },
    exercise: {
      id: exercise.id,
      title: exercise.title,
      statement: readStoredLesson(exercise.statement),
      answerType: exercise.answer_type,
      choices: readChoices(exercise.choices),
      choiceMode: exercise.choice_mode ?? "unique",
    },
    position: {
      index,
      count: order.length,
      previous: order[index - 1] ?? null,
      next: order[index + 1] ?? null,
    },
    work: workOn(assignmentId, exerciseId, work.submissions, work.reveals),
    submission: submission
      ? { answer: readAnswer(submission.answer), pages, feedback: submission.feedback }
      : null,
    drafts,
    draftReference: ref,
    solution: solution
      ? {
          document: readStoredLesson(solution.solution),
          correctNumeric: solution.correct_numeric,
          tolerance: solution.tolerance,
          toleranceKind: solution.tolerance_kind,
          correctChoiceIds: solution.correct_choice_ids ?? [],
        }
      : null,
  };
}
