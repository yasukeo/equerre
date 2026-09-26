import "server-only";
import { progressOf, workOn, type ExerciseWork, type HomeworkProgress } from "@/lib/homework/work";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { attendanceOf, averageOf, nextSessionOf, type Presence } from "./stats";

// The tutor's view of her students (DECISIONS.md, D-071), read through her own session: the
// policies give her every row, and nothing here is cached.

type Client = Awaited<ReturnType<typeof createClient>>;
export type StudentStatus = Database["public"]["Enums"]["student_status"];
type SessionStatus = Database["public"]["Enums"]["session_status"];
type AttendanceStatus = Database["public"]["Enums"]["attendance_status"];
type SessionMode = Database["public"]["Enums"]["session_mode"];

/** PostgREST's max_rows: a longer answer is cut there without a word. */
const PAGE = 1000;

async function readAll<Row>(
  page: (from: number, to: number) => PromiseLike<{ data: Row[] | null; error: unknown }>,
): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error("Could not read the students", { cause: error });
    rows.push(...(data ?? []));
    if ((data?.length ?? 0) < PAGE) return rows;
  }
}

function must<Result extends { data: unknown; error: unknown }>(
  result: Result,
): NonNullable<Result["data"]> | null {
  if (result.error) throw new Error("Could not read the student", { cause: result.error });
  return result.data ?? null;
}

async function upcomingSessions(supabase: Client, now: Date) {
  return readAll((from, to) =>
    supabase
      .from("sessions")
      .select("starts_at, student_id, group_id")
      .eq("status", "planifiee")
      .gte("starts_at", now.toISOString())
      .order("starts_at")
      .order("id")
      .range(from, to),
  );
}

export type StudentRow = {
  id: string;
  name: string;
  levelCode: string | null;
  levelLabel: string | null;
  status: StudentStatus;
  groups: { id: string; name: string }[];
  nextSession: string | null;
  average: number | null;
};

export type LevelOption = { code: string; label: string };

/** Every student, with her groups, her next session and her average. */
export async function listStudents(now: Date): Promise<{
  students: StudentRow[];
  levels: LevelOption[];
}> {
  const supabase = await createClient();
  const [profiles, memberships, upcoming, grades, levels] = await Promise.all([
    readAll((from, to) =>
      supabase
        .from("profiles")
        .select("id, full_name, level_code, status, level:levels(label)")
        .eq("role", "student")
        .order("full_name")
        .order("id")
        .range(from, to),
    ),
    readAll((from, to) =>
      supabase
        .from("group_members")
        .select("group_id, student_id, joined_at, group:groups(id, name)")
        .order("group_id")
        .order("student_id")
        .range(from, to),
    ),
    upcomingSessions(supabase, now),
    readAll((from, to) =>
      supabase
        .from("submissions")
        .select("student_id, grade")
        .eq("status", "corrige")
        .not("grade", "is", null)
        .order("id")
        .range(from, to),
    ),
    supabase.from("levels").select("code, label").order("position"),
  ]);

  const gradesOf = new Map<string, number[]>();
  for (const row of grades) {
    if (row.grade === null) continue;
    gradesOf.set(row.student_id, [...(gradesOf.get(row.student_id) ?? []), row.grade]);
  }
  const membershipRows = memberships.map((row) => ({
    groupId: row.group_id,
    studentId: row.student_id,
    joinedAt: row.joined_at,
  }));
  const upcomingRows = upcoming.map((row) => ({
    startsAt: row.starts_at,
    studentId: row.student_id,
    groupId: row.group_id,
  }));

  return {
    students: profiles.map((profile) => ({
      id: profile.id,
      name: profile.full_name,
      levelCode: profile.level_code,
      levelLabel: profile.level?.label ?? null,
      status: profile.status,
      groups: memberships
        .filter((row) => row.student_id === profile.id)
        .map((row) => ({ id: row.group.id, name: row.group.name }))
        .sort((a, b) => a.name.localeCompare(b.name, "fr")),
      nextSession: nextSessionOf(profile.id, upcomingRows, membershipRows),
      average: averageOf(gradesOf.get(profile.id) ?? []),
    })),
    levels: must(levels) ?? [],
  };
}

export type StudentSession = {
  id: string;
  /** Her own session, as against one of a group's. */
  own: boolean;
  startsAt: string;
  endsAt: string;
  status: SessionStatus;
  mode: SessionMode;
  groupName: string | null;
  typeName: string | null;
  chapter: string | null;
  recap: string | null;
  homework: string | null;
  /** For a group's session: the attendance the tutor took for her, if any. */
  attendance: AttendanceStatus | null;
};

export type StudentHomework = {
  id: string;
  title: string;
  dueAt: string;
  groupName: string | null;
  progress: HomeworkProgress;
  exercises: { id: string; title: string; work: ExerciseWork }[];
};

export type StudentFile = {
  profile: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    levelCode: string | null;
    levelLabel: string | null;
    school: string | null;
    guardianName: string | null;
    guardianPhone: string | null;
    status: StudentStatus;
    createdAt: string;
  };
  objectives: string;
  notes: { id: string; body: string; createdAt: string; updatedAt: string }[];
  groups: { id: string; name: string; scheduleLabel: string | null; joinedAt: string }[];
  upcoming: StudentSession[];
  past: StudentSession[];
  homework: StudentHomework[];
  average: number | null;
  graded: number;
  attendance: { present: number; counted: number; rate: number | null };
  levels: LevelOption[];
};

const SESSION_FIELDS =
  "id, starts_at, ends_at, status, mode, recap, homework, group_id, group:groups(name), session_type:session_types(name), chapter:chapters(title)" as const;

export async function getStudentFile(id: string, now: Date): Promise<StudentFile | null> {
  const supabase = await createClient();
  const profile = must(
    await supabase
      .from("profiles")
      .select(
        "id, full_name, email, phone, level_code, school, guardian_name, guardian_phone, status, created_at, level:levels(label)",
      )
      .eq("id", id)
      .eq("role", "student")
      .maybeSingle(),
  );
  if (!profile) return null;

  const [settings, notes, memberships, attendanceRows, submissions, reveals, levels] =
    await Promise.all([
      supabase.from("student_settings").select("objectives").eq("student_id", id).maybeSingle(),
      readAll((from, to) =>
        supabase
          .from("student_notes")
          .select("id, body, created_at, updated_at")
          .eq("student_id", id)
          .order("created_at", { ascending: false })
          .order("id")
          .range(from, to),
      ),
      supabase
        .from("group_members")
        .select("joined_at, group:groups(id, name, schedule_label)")
        .eq("student_id", id),
      readAll((from, to) =>
        supabase
          .from("session_attendance")
          .select("session_id, status")
          .eq("student_id", id)
          .order("session_id")
          .range(from, to),
      ),
      readAll((from, to) =>
        supabase
          .from("submissions")
          .select("assignment_id, exercise_id, status, grade")
          .eq("student_id", id)
          .order("assignment_id")
          .order("exercise_id")
          .range(from, to),
      ),
      readAll((from, to) =>
        supabase
          .from("exercise_reveals")
          .select("assignment_id, exercise_id")
          .eq("student_id", id)
          .order("assignment_id")
          .order("exercise_id")
          .range(from, to),
      ),
      supabase.from("levels").select("code, label").order("position"),
    ]);

  const groups = (must(memberships) ?? [])
    .map((row) => ({
      id: row.group.id,
      name: row.group.name,
      scheduleLabel: row.group.schedule_label,
      joinedAt: row.joined_at,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  const groupIds = groups.map((group) => group.id);
  const attendedIds = attendanceRows.map((row) => row.session_id);
  const workedOn = [...new Set([...submissions, ...reveals].map((row) => row.assignment_id))];

  // Her sessions as the database lets her see them (D-070): her own; her groups' since she
  // joined; and any other group's session the tutor took her attendance at.
  const [own, ofGroups, attended, assignments] = await Promise.all([
    readAll((from, to) =>
      supabase
        .from("sessions")
        .select(SESSION_FIELDS)
        .eq("student_id", id)
        .order("starts_at")
        .order("id")
        .range(from, to),
    ),
    groupIds.length === 0
      ? []
      : readAll((from, to) =>
          supabase
            .from("sessions")
            .select(SESSION_FIELDS)
            .in("group_id", groupIds)
            .order("starts_at")
            .order("id")
            .range(from, to),
        ),
    attendedIds.length === 0
      ? []
      : readAll((from, to) =>
          supabase
            .from("sessions")
            .select(SESSION_FIELDS)
            .in("id", attendedIds)
            .order("starts_at")
            .order("id")
            .range(from, to),
        ),
    // Her homework, by the same rule: her own, her groups' still due when she joined, and
    // any she worked on.
    readAll((from, to) => {
      const filters = [`student_id.eq.${id}`];
      if (groupIds.length > 0) filters.push(`group_id.in.(${groupIds.join(",")})`);
      if (workedOn.length > 0) filters.push(`id.in.(${workedOn.join(",")})`);
      return supabase
        .from("assignments")
        .select(
          "id, title, due_at, group_id, group:groups(name), items:assignment_items(position, exercise:exercises(id, title))",
        )
        .or(filters.join(","))
        .order("due_at", { ascending: false })
        .order("id")
        .range(from, to);
    }),
  ]);

  const joinedAt = new Map(groups.map((group) => [group.id, Date.parse(group.joinedAt)]));
  const attendanceOfSession = new Map(attendanceRows.map((row) => [row.session_id, row.status]));
  const sessions = new Map<string, StudentSession>();
  for (const row of [...own, ...ofGroups, ...attended]) {
    const joined = row.group_id ? joinedAt.get(row.group_id) : undefined;
    const hers =
      row.group_id === null ||
      attendanceOfSession.has(row.id) ||
      (joined !== undefined && joined <= Date.parse(row.starts_at));
    if (!hers) continue;
    sessions.set(row.id, {
      id: row.id,
      own: row.group_id === null,
      startsAt: row.starts_at,
      endsAt: row.ends_at,
      status: row.status,
      mode: row.mode,
      groupName: row.group?.name ?? null,
      typeName: row.session_type?.name ?? null,
      chapter: row.chapter?.title ?? null,
      recap: row.recap,
      homework: row.homework,
      attendance: attendanceOfSession.get(row.id) ?? null,
    });
  }
  const ordered = [...sessions.values()].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const upcoming = ordered.filter(
    (session) =>
      Date.parse(session.endsAt) >= now.getTime() &&
      (session.status === "planifiee" || session.status === "en_attente"),
  );
  const past = ordered
    .filter(
      (session) => !upcoming.includes(session) && Date.parse(session.startsAt) < now.getTime(),
    )
    .reverse();

  const presences: Presence[] = past.flatMap((session): Presence[] =>
    session.own
      ? [{ kind: "own", status: session.status }]
      : session.attendance
        ? [{ kind: "group", attendance: session.attendance }]
        : [],
  );

  const workedSet = new Set(workedOn);
  const homework = assignments
    .filter(
      (assignment) =>
        assignment.group_id === null ||
        workedSet.has(assignment.id) ||
        (joinedAt.get(assignment.group_id) ?? Infinity) <= Date.parse(assignment.due_at),
    )
    .map((assignment) => {
      const exercises = [...assignment.items]
        .sort((a, b) => a.position - b.position)
        .flatMap((item) => (item.exercise ? [item.exercise] : []));
      return {
        id: assignment.id,
        title: assignment.title,
        dueAt: assignment.due_at,
        groupName: assignment.group?.name ?? null,
        progress: progressOf(
          assignment.id,
          exercises.map((exercise) => exercise.id),
          assignment.due_at,
          now,
          submissions,
          reveals,
        ),
        exercises: exercises.map((exercise) => ({
          id: exercise.id,
          title: exercise.title,
          work: workOn(assignment.id, exercise.id, submissions, reveals),
        })),
      };
    });

  const grades = submissions.flatMap((row) =>
    row.status === "corrige" && row.grade !== null ? [row.grade] : [],
  );
  const settingsRow = must(settings);

  return {
    profile: {
      id: profile.id,
      name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      levelCode: profile.level_code,
      levelLabel: profile.level?.label ?? null,
      school: profile.school,
      guardianName: profile.guardian_name,
      guardianPhone: profile.guardian_phone,
      status: profile.status,
      createdAt: profile.created_at,
    },
    objectives: settingsRow?.objectives ?? "",
    notes: notes.map((note) => ({
      id: note.id,
      body: note.body,
      createdAt: note.created_at,
      updatedAt: note.updated_at,
    })),
    groups,
    upcoming,
    past,
    homework,
    average: averageOf(grades),
    graded: grades.length,
    attendance: attendanceOf(presences),
    levels: must(levels) ?? [],
  };
}
