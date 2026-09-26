// What the tutor reads about a student at a glance (DECISIONS.md, D-071): how often she comes,
// how she does, and when she comes next. Pure, so the list, her page and the tests agree.

import type { Database } from "@/types/database";

type SessionStatus = Database["public"]["Enums"]["session_status"];
type AttendanceStatus = Database["public"]["Enums"]["attendance_status"];

/**
 * A session she was expected at: one of her own, read from its status, or a group's, read from
 * the attendance the tutor took for her.
 */
export type Presence =
  { kind: "own"; status: SessionStatus } | { kind: "group"; attendance: AttendanceStatus };

/**
 * Sessions she came to, over those she was expected at. A session cancelled, refused or still
 * to come expects nobody, and an excused absence is not held against her.
 */
export function attendanceOf(presences: readonly Presence[]): {
  present: number;
  counted: number;
  rate: number | null;
} {
  let present = 0;
  let counted = 0;
  for (const presence of presences) {
    const came =
      presence.kind === "own"
        ? presence.status === "terminee"
          ? true
          : presence.status === "absent"
            ? false
            : null
        : presence.attendance === "present"
          ? true
          : presence.attendance === "absent"
            ? false
            : null;
    if (came === null) continue;
    counted += 1;
    if (came) present += 1;
  }
  return { present, counted, rate: counted === 0 ? null : present / counted };
}

/** The mean of her corrected exercises, each out of 20; null before the first. */
export function averageOf(grades: readonly number[]): number | null {
  return grades.length === 0 ? null : grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

export type UpcomingSession = {
  startsAt: string;
  studentId: string | null;
  groupId: string | null;
};

export type Membership = { groupId: string; studentId: string; joinedAt: string };

/**
 * Her next session: one of her own, or one of a group she belonged to by then — the rule the
 * database applies to what she can see (D-070).
 */
export function nextSessionOf(
  studentId: string,
  upcoming: readonly UpcomingSession[],
  memberships: readonly Membership[],
): string | null {
  const joined = new Map(
    memberships
      .filter((membership) => membership.studentId === studentId)
      .map((membership) => [membership.groupId, Date.parse(membership.joinedAt)]),
  );
  let next: string | null = null;
  for (const session of upcoming) {
    const hers =
      session.studentId === studentId ||
      (session.groupId !== null &&
        joined.has(session.groupId) &&
        (joined.get(session.groupId) ?? Infinity) <= Date.parse(session.startsAt));
    if (hers && (next === null || Date.parse(session.startsAt) < Date.parse(next))) {
      next = session.startsAt;
    }
  }
  return next;
}
