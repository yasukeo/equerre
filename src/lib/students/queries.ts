import "server-only";
import { progressOf, workOn, type ExerciseWork, type HomeworkProgress } from "@/lib/homework/work";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import {
  attendanceOf,
  averageOf,
  inGroupAt,
  nextSessionOf,
  type Membership,
  type Presence,
} from "./stats";

// The tutor's view of her students (DECISIONS.md, D-071), read through her own session: the
// policies give her every row, and nothing here is cached.

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

/** Sessions still to come, or under way: a request waiting for her answer counts too. */
const UPCOMING: SessionStatus[] = ["planifiee", "en_attente"];

function isUpcoming(session: { status: SessionStatus; endsAt: string }, now: Date): boolean {
  return UPCOMING.includes(session.status) && Date.parse(session.endsAt) >= now.getTime();
}

/** A paused or stopped student is expected at no group session to come (D-060). */
function expectedAtGroups(status: StudentStatus): boolean {
  return status === "actif";
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
    // The groups she is in today.
    readAll((from, to) =>
      supabase
        .from("group_members")
        .select("group_id, student_id, joined_at, left_at, group:groups(id, name)")
        .is("left_at", null)
        .order("group_id")
        .order("student_id")
        .range(from, to),
    ),
    readAll((from, to) =>
      supabase
        .from("sessions")
        .select("starts_at, student_id, group_id")
        .in("status", UPCOMING)
        .gte("ends_at", now.toISOString())
        .order("starts_at")
        .order("id")
        .range(from, to),
    ),
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
  const membershipRows: Membership[] = memberships.map((row) => ({
    groupId: row.group_id,
    studentId: row.student_id,
    joinedAt: row.joined_at,
    leftAt: row.left_at,
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
      nextSession: nextSessionOf(profile.id, upcomingRows, membershipRows, {
        groups: expectedAtGroups(profile.status),
      }),
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
  /** For a group's session that took place: the attendance the tutor took for her, if any. */
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
  /** Her requests are confirmed at once, without the tutor's answer (D-075). */
  autoConfirmBookings: boolean;
  /** Her conversation with the tutor (D-080). */
  conversationId: string | null;
  notes: { id: string; body: string; createdAt: string; updatedAt: string }[];
  /** The groups she is in today. */
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
  "id, starts_at, ends_at, status, mode, recap, homework, student_id, group_id, group:groups(name), session_type:session_types(name), chapter:chapters(title)" as const;

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

  const [
    settings,
    notes,
    membershipRows,
    attendanceRows,
    submissions,
    reveals,
    levels,
    conversation,
  ] = await Promise.all([
    supabase
      .from("student_settings")
      .select("objectives, auto_confirm_bookings")
      .eq("student_id", id)
      .maybeSingle(),
    readAll((from, to) =>
      supabase
        .from("student_notes")
        .select("id, body, created_at, updated_at")
        .eq("student_id", id)
        .order("created_at", { ascending: false })
        .order("id")
        .range(from, to),
    ),
    // Every period she spent in a group, those she has left included (D-070).
    supabase
      .from("group_members")
      .select("joined_at, left_at, group:groups(id, name, schedule_label)")
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
    supabase.from("conversations").select("id").eq("student_id", id).maybeSingle(),
  ]);

  const periods = (must(membershipRows) ?? []).map((row) => ({
    group: row.group,
    membership: {
      groupId: row.group.id,
      studentId: id,
      joinedAt: row.joined_at,
      leftAt: row.left_at,
    } satisfies Membership,
  }));
  const groups = periods
    .filter((period) => period.membership.leftAt === null)
    .map((period) => ({
      id: period.group.id,
      name: period.group.name,
      scheduleLabel: period.group.schedule_label,
      joinedAt: period.membership.joinedAt,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  // Every group she was ever in: a short list, whatever her history, so it fits any address.
  const everGroupIds = [...new Set(periods.map((period) => period.group.id))];
  const inGroupWhen = (groupId: string, at: string) =>
    periods.some((period) => period.group.id === groupId && inGroupAt(period.membership, at));

  const [sessionRows, assignments] = await Promise.all([
    readAll((from, to) => {
      const filters = [`student_id.eq.${id}`];
      if (everGroupIds.length > 0) filters.push(`group_id.in.(${everGroupIds.join(",")})`);
      return supabase
        .from("sessions")
        .select(SESSION_FIELDS)
        .or(filters.join(","))
        .order("starts_at")
        .order("id")
        .range(from, to);
    }),
    readAll((from, to) => {
      const filters = [`student_id.eq.${id}`];
      if (everGroupIds.length > 0) filters.push(`group_id.in.(${everGroupIds.join(",")})`);
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

  const attendanceOfSession = new Map(attendanceRows.map((row) => [row.session_id, row.status]));
  const groupsExpected = expectedAtGroups(profile.status);

  // Her sessions as the database lets her see them (D-070): her own, and her groups' that
  // started while she was in them.
  const sessions: StudentSession[] = sessionRows
    .filter(
      (row) =>
        row.student_id === id ||
        (row.group_id !== null && inGroupWhen(row.group_id, row.starts_at)),
    )
    .map((row) => ({
      id: row.id,
      own: row.student_id === id,
      startsAt: row.starts_at,
      endsAt: row.ends_at,
      status: row.status,
      mode: row.mode,
      groupName: row.group?.name ?? null,
      typeName: row.session_type?.name ?? null,
      chapter: row.chapter?.title ?? null,
      recap: row.recap,
      homework: row.homework,
      // Attendance means something only at a session that took place.
      attendance: row.status === "terminee" ? (attendanceOfSession.get(row.id) ?? null) : null,
    }));
  const upcoming = sessions.filter(
    (session) => isUpcoming(session, now) && (session.own || groupsExpected),
  );
  const past = sessions
    .filter((session) => !isUpcoming(session, now) && Date.parse(session.startsAt) < now.getTime())
    .reverse();

  const presences: Presence[] = past.flatMap((session): Presence[] =>
    session.own
      ? [{ kind: "own", status: session.status }]
      : session.attendance
        ? [{ kind: "group", attendance: session.attendance }]
        : [],
  );

  // Her homework, by the same rule: her own, her groups' that fell due while she was in them,
  // and any she worked on. A stopped student keeps only the last (D-060).
  const workedOn = new Set([...submissions, ...reveals].map((row) => row.assignment_id));
  const stopped = profile.status === "arrete";
  const homework = assignments
    .filter((assignment) =>
      stopped
        ? workedOn.has(assignment.id)
        : assignment.group_id === null ||
          workedOn.has(assignment.id) ||
          inGroupWhen(assignment.group_id, assignment.due_at),
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
    autoConfirmBookings: settingsRow?.auto_confirm_bookings ?? false,
    conversationId: conversation.data?.id ?? null,
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
