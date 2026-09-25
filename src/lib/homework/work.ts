// Where a student stands on each exercise of her homework (DECISIONS.md, D-046). Pure, so the
// list, the homework page and the exercise page agree, and the tests can hold them to it.
//
// The rules come from the database, which enforces them: submit_exercise_answer refuses an
// exercise whose solution she opened, anywhere (solution_already_revealed), or that was
// corrected in another homework (exercise_done_elsewhere). Nothing is left to do on those.

export type SubmissionRow = {
  assignment_id: string;
  exercise_id: string;
  status: "rendu" | "corrige";
  grade: number | null;
};

export type RevealRow = { assignment_id: string; exercise_id: string };

export type ExerciseWork =
  | { kind: "todo" }
  /**
   * Photographed pages handed in, waiting for the tutor. She may hand in a new list until
   * then, unless the grading would now refuse it: the solution opened anywhere, or the same
   * exercise corrected in another homework.
   */
  | { kind: "handedIn"; changeable: boolean }
  | { kind: "graded"; grade: number }
  /** She opened the solution here without answering: the exercise is forfeited. */
  | { kind: "revealed" }
  /** Corrected, or its solution opened, in another homework: closed here too. */
  | { kind: "doneElsewhere" };

export function workOn(
  assignmentId: string,
  exerciseId: string,
  submissions: readonly SubmissionRow[],
  reveals: readonly RevealRow[],
): ExerciseWork {
  const here = submissions.find(
    (row) => row.assignment_id === assignmentId && row.exercise_id === exerciseId,
  );
  if (here?.status === "corrige" && here.grade !== null) {
    return { kind: "graded", grade: here.grade };
  }
  const revealed = reveals.some((row) => row.exercise_id === exerciseId);
  const correctedElsewhere = submissions.some(
    (row) =>
      row.exercise_id === exerciseId &&
      row.assignment_id !== assignmentId &&
      row.status === "corrige",
  );
  if (here) return { kind: "handedIn", changeable: !revealed && !correctedElsewhere };
  if (reveals.some((row) => row.assignment_id === assignmentId && row.exercise_id === exerciseId)) {
    return { kind: "revealed" };
  }
  return revealed || correctedElsewhere ? { kind: "doneElsewhere" } : { kind: "todo" };
}

export type HomeworkProgress = { total: number; left: number; late: boolean };

/** How many exercises are still to do, and whether the due date passed with some left. */
export function progressOf(
  assignmentId: string,
  exerciseIds: readonly string[],
  dueAt: string,
  now: Date,
  submissions: readonly SubmissionRow[],
  reveals: readonly RevealRow[],
): HomeworkProgress {
  const left = exerciseIds.filter(
    (exerciseId) => workOn(assignmentId, exerciseId, submissions, reveals).kind === "todo",
  ).length;
  return { total: exerciseIds.length, left, late: left > 0 && Date.parse(dueAt) < now.getTime() };
}
