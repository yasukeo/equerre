import "server-only";
import {
  progressOf,
  workOn,
  type ExerciseWork,
  type HomeworkProgress,
  type RevealRow,
  type SubmissionRow,
} from "@/lib/homework/work";
import { createClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/types/database";

// What a parent reads about their children (DECISIONS.md, D-091), through database functions
// that check the link first: someone else's child answers nothing.

export type Child = {
  id: string;
  name: string;
  levelLabel: string | null;
  status: Database["public"]["Enums"]["student_status"];
};

export async function listMyChildren(): Promise<Child[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("my_children");
  if (error) throw new Error("Could not read the children", { cause: error });
  return data.map((row) => ({
    id: row.id,
    name: row.full_name,
    levelLabel: row.level_label ?? null,
    status: row.status,
  }));
}

export type ChildSession = {
  id: string;
  startsAt: string;
  endsAt: string;
  status: Database["public"]["Enums"]["session_status"];
  mode: Database["public"]["Enums"]["session_mode"];
  location: string | null;
  typeName: string | null;
  groupName: string | null;
  attendance: Database["public"]["Enums"]["attendance_status"] | null;
  chapterTitle: string | null;
  homework: string | null;
  recap: string | null;
};

/** Her sessions over four months either side of today, oldest first. */
export async function getChildSessions(studentId: string): Promise<ChildSession[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("child_sessions", { p_student_id: studentId });
  if (error) throw new Error("Could not read the sessions", { cause: error });
  return data.map((row) => ({
    id: row.id,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    status: row.status,
    mode: row.mode,
    location: row.location ?? null,
    typeName: row.type_name ?? null,
    groupName: row.group_name ?? null,
    attendance: row.attendance ?? null,
    chapterTitle: row.chapter_title ?? null,
    homework: row.homework ?? null,
    recap: row.recap ?? null,
  }));
}

export type ChildHomework = {
  id: string;
  title: string;
  dueAt: string;
  groupName: string | null;
  exercises: { id: string; title: string; work: ExerciseWork }[];
  progress: HomeworkProgress;
  /** Her grades on this homework, on 20, when any exercise was corrected. */
  average: number | null;
};

type HomeworkPayload = {
  assignments: {
    id: string;
    title: string;
    due_at: string;
    group_name: string | null;
    exercises: { id: string; title: string }[];
  }[];
  submissions: SubmissionRow[];
  reveals: RevealRow[];
};

function isPayload(value: Json): value is Json & HomeworkPayload {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Array.isArray(value.assignments) &&
    Array.isArray(value.submissions) &&
    Array.isArray(value.reveals)
  );
}

/**
 * Her homework, newest due first, with where she stands on each exercise by the same rules as
 * her own list (D-046).
 */
export async function getChildHomework(studentId: string, now: Date): Promise<ChildHomework[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("child_homework", { p_student_id: studentId });
  if (error) throw new Error("Could not read the homework", { cause: error });
  if (!isPayload(data)) return [];
  const { assignments, submissions, reveals } = data;

  return assignments.map((assignment) => {
    const exercises = assignment.exercises.map((exercise) => ({
      id: exercise.id,
      title: exercise.title,
      work: workOn(assignment.id, exercise.id, submissions, reveals),
    }));
    const grades = exercises.flatMap((exercise) =>
      exercise.work.kind === "graded" ? [exercise.work.grade] : [],
    );
    return {
      id: assignment.id,
      title: assignment.title,
      dueAt: assignment.due_at,
      groupName: assignment.group_name,
      exercises,
      progress: progressOf(
        assignment.id,
        exercises.map((exercise) => exercise.id),
        assignment.due_at,
        now,
        submissions,
        reveals,
      ),
      average:
        grades.length > 0 ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length : null,
    };
  });
}
