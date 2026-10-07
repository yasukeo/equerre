import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

// What her students do between sessions (DECISIONS.md, D-104), for the tutor's home page and
// their files: what they read and understood, what they handed in, the past papers they sat.
// Read through the tutor's session: the policies give her every student's rows.

export type ActivityItem =
  | {
      kind: "understood" | "opened";
      at: string;
      student: { id: string; name: string };
      lesson: { title: string; kind: Database["public"]["Enums"]["document_kind"] };
    }
  | {
      kind: "handedIn";
      at: string;
      student: { id: string; name: string };
      exercise: string;
      assignmentId: string;
    }
  | {
      kind: "exam";
      at: string;
      student: { id: string; name: string };
      year: number;
      session: Database["public"]["Enums"]["exam_session"];
      score: number | null;
    };

/** The latest things her students did, newest first, optionally for one student. */
export async function listRecentActivity(
  options: { studentId?: string; limit?: number } = {},
): Promise<ActivityItem[]> {
  const limit = options.limit ?? 12;
  const supabase = await createClient();
  const progress = supabase
    .from("lesson_progress")
    .select(
      "student_id, last_opened_at, understood_at, lesson:lessons(title, kind), student:profiles(full_name)",
    )
    .order("last_opened_at", { ascending: false })
    .limit(limit);
  const submissions = supabase
    .from("submissions")
    .select(
      "student_id, assignment_id, submitted_at, exercise:exercises(title), student:profiles!submissions_student_id_fkey(full_name)",
    )
    .order("submitted_at", { ascending: false })
    .limit(limit);
  const attempts = supabase
    .from("exam_attempts")
    .select(
      "student_id, finished_at, self_score, exam:national_exams(year, session), student:profiles(full_name)",
    )
    .not("finished_at", "is", null)
    .order("finished_at", { ascending: false })
    .limit(limit);
  const [read, handed, sat] = await Promise.all(
    options.studentId
      ? [
          progress.eq("student_id", options.studentId),
          submissions.eq("student_id", options.studentId),
          attempts.eq("student_id", options.studentId),
        ]
      : [progress, submissions, attempts],
  );

  const items: ActivityItem[] = [
    ...(read.data ?? []).flatMap((row): ActivityItem[] =>
      row.lesson && row.student
        ? [
            {
              // Understood within the same visit reads as understood; a later visit, as a read.
              kind:
                row.understood_at && row.understood_at >= row.last_opened_at.slice(0, 16)
                  ? "understood"
                  : "opened",
              at: row.last_opened_at,
              student: { id: row.student_id, name: row.student.full_name },
              lesson: { title: row.lesson.title, kind: row.lesson.kind },
            },
          ]
        : [],
    ),
    ...(handed.data ?? []).flatMap((row): ActivityItem[] =>
      row.exercise && row.student
        ? [
            {
              kind: "handedIn",
              at: row.submitted_at,
              student: { id: row.student_id, name: row.student.full_name },
              exercise: row.exercise.title,
              assignmentId: row.assignment_id,
            },
          ]
        : [],
    ),
    ...(sat.data ?? []).flatMap((row): ActivityItem[] =>
      row.exam && row.student && row.finished_at
        ? [
            {
              kind: "exam",
              at: row.finished_at,
              student: { id: row.student_id, name: row.student.full_name },
              year: row.exam.year,
              session: row.exam.session,
              score: row.self_score,
            },
          ]
        : [],
    ),
  ];
  return items.sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
}

export type QuietStudent = { id: string; name: string; levelCode: string | null };

const QUIET_DAYS = 10;

/**
 * Active students who have neither opened a document nor handed anything in for ten days:
 * the ones to send a word to before they drift.
 */
export async function listQuietStudents(now: Date): Promise<QuietStudent[]> {
  const supabase = await createClient();
  const since = new Date(now.getTime() - QUIET_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const [students, read, handed] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, level_code")
      .eq("role", "student")
      .eq("status", "actif")
      .order("full_name"),
    supabase.from("lesson_progress").select("student_id").gte("last_opened_at", since).limit(1000),
    supabase.from("submissions").select("student_id").gte("submitted_at", since).limit(1000),
  ]);
  const busy = new Set([
    ...(read.data ?? []).map((row) => row.student_id),
    ...(handed.data ?? []).map((row) => row.student_id),
  ]);
  return (students.data ?? [])
    .filter((student) => !busy.has(student.id))
    .map((student) => ({ id: student.id, name: student.full_name, levelCode: student.level_code }));
}

/** When each student last opened a document, for the list of students. */
export async function lastReadByStudent(): Promise<Map<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("student_id, last_opened_at")
    .order("last_opened_at", { ascending: false })
    .limit(1000);
  const last = new Map<string, string>();
  for (const row of data ?? []) {
    if (!last.has(row.student_id)) last.set(row.student_id, row.last_opened_at);
  }
  return last;
}
