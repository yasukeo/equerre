import "server-only";
import { z } from "zod";
import type {
  AvailabilityException,
  BookingRules,
  TimeRange,
  WeeklyWindow,
} from "@/lib/booking/slots";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

// Sessions as each side reads them, through the reader's own session: the policies decide who
// sees what (D-060, D-070), and nothing here is cached.

export type SessionStatus = Database["public"]["Enums"]["session_status"];
export type SessionMode = Database["public"]["Enums"]["session_mode"];
export type AttendanceStatus = Database["public"]["Enums"]["attendance_status"];
type Client = Awaited<ReturnType<typeof createClient>>;

/** PostgREST's max_rows: a longer answer is cut there without a word. */
const PAGE = 1000;

async function readAll<Row>(
  page: (from: number, to: number) => PromiseLike<{ data: Row[] | null; error: unknown }>,
): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error("Could not read the sessions", { cause: error });
    rows.push(...(data ?? []));
    if ((data?.length ?? 0) < PAGE) return rows;
  }
}

function must<Result extends { data: unknown; error: unknown }>(
  result: Result,
): NonNullable<Result["data"]> | null {
  if (result.error) throw new Error("Could not read the session", { cause: result.error });
  return result.data ?? null;
}

const FIELDS =
  "id, starts_at, ends_at, updated_at, status, mode, location, meeting_url, series_id, request_note, requested_by, cancelled_by, cancellation_reason, covered_chapter_id, homework, recap, student:profiles!sessions_student_id_fkey(id, full_name, level_code), group:groups(id, name), session_type:session_types(id, name, duration_min, is_group), chapter:chapters(title)" as const;

type Raw = {
  id: string;
  starts_at: string;
  ends_at: string;
  updated_at: string;
  status: SessionStatus;
  mode: SessionMode;
  location: string | null;
  meeting_url: string | null;
  series_id: string | null;
  request_note: string | null;
  requested_by: string | null;
  cancelled_by: string | null;
  cancellation_reason: string | null;
  covered_chapter_id: string | null;
  homework: string | null;
  recap: string | null;
  student: { id: string; full_name: string; level_code: string | null } | null;
  group: { id: string; name: string } | null;
  session_type: { id: string; name: string; duration_min: number; is_group: boolean } | null;
  chapter: { title: string } | null;
};

export type Session = {
  id: string;
  startsAt: string;
  endsAt: string;
  updatedAt: string;
  status: SessionStatus;
  mode: SessionMode;
  location: string | null;
  meetingUrl: string | null;
  seriesId: string | null;
  requestNote: string | null;
  /** Asked for by the student herself, rather than planned by the tutor. */
  requested: boolean;
  cancelledByStudent: boolean;
  cancellationReason: string | null;
  chapterId: string | null;
  chapterTitle: string | null;
  homework: string | null;
  recap: string | null;
  student: { id: string; name: string; levelCode: string | null } | null;
  group: { id: string; name: string } | null;
  type: { id: string; name: string; durationMin: number; isGroup: boolean } | null;
};

function toSession(row: Raw): Session {
  return {
    id: row.id,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    updatedAt: row.updated_at,
    status: row.status,
    mode: row.mode,
    location: row.location,
    meetingUrl: row.meeting_url,
    seriesId: row.series_id,
    requestNote: row.request_note,
    requested: row.requested_by !== null && row.requested_by === row.student?.id,
    cancelledByStudent: row.cancelled_by !== null && row.cancelled_by === row.student?.id,
    cancellationReason: row.cancellation_reason,
    chapterId: row.covered_chapter_id,
    chapterTitle: row.chapter?.title ?? null,
    homework: row.homework,
    recap: row.recap,
    student: row.student
      ? { id: row.student.id, name: row.student.full_name, levelCode: row.student.level_code }
      : null,
    group: row.group,
    type: row.session_type
      ? {
          id: row.session_type.id,
          name: row.session_type.name,
          durationMin: row.session_type.duration_min,
          isGroup: row.session_type.is_group,
        }
      : null,
  };
}

/** Who a session is with, as a line of text. */
export function whoFor(session: Pick<Session, "student" | "group">): string {
  return session.student?.name ?? session.group?.name ?? "";
}

// ─────────────────────────────────────────────────────────────── the tutor

/** Requests still to answer, soonest first. A request whose time has passed is dropped. */
export async function listPendingRequests(now: Date): Promise<Session[]> {
  const supabase = await createClient();
  const rows = await readAll<Raw>((from, to) =>
    supabase
      .from("sessions")
      .select(FIELDS)
      .eq("status", "en_attente")
      .gte("starts_at", now.toISOString())
      .order("starts_at")
      .order("id")
      .range(from, to),
  );
  return rows.map(toSession);
}

/** Sessions that have started and are still « planifiée »: she has yet to say how they went. */
export async function listToClose(now: Date): Promise<Session[]> {
  const supabase = await createClient();
  const rows = await readAll<Raw>((from, to) =>
    supabase
      .from("sessions")
      .select(FIELDS)
      .eq("status", "planifiee")
      .lt("starts_at", now.toISOString())
      .order("starts_at", { ascending: false })
      .order("id")
      .range(from, to),
  );
  return rows.map(toSession);
}

/** What the calendar shows between two instants: everything but refusals. */
export async function listSessionsBetween(start: Date, end: Date): Promise<Session[]> {
  const supabase = await createClient();
  const rows = await readAll<Raw>((from, to) =>
    supabase
      .from("sessions")
      .select(FIELDS)
      .gte("starts_at", start.toISOString())
      .lt("starts_at", end.toISOString())
      .neq("status", "refusee")
      .order("starts_at")
      .order("id")
      .range(from, to),
  );
  return rows.map(toSession);
}

export type SessionDetail = Session & {
  /** For a group: the members of the day it took place (D-070), with what was recorded. */
  attendance: { id: string; name: string; status: AttendanceStatus | null }[];
  /** How many later sessions of the same series are still to come. */
  laterInSeries: number;
};

export async function getSessionForTutor(id: string, now: Date): Promise<SessionDetail | null> {
  const supabase = await createClient();
  const row = must(await supabase.from("sessions").select(FIELDS).eq("id", id).maybeSingle());
  if (!row) return null;
  const session = toSession(row);

  const [members, recorded, later] = await Promise.all([
    session.group
      ? readAll((from, to) =>
          supabase
            .from("group_members")
            .select("student_id, joined_at, left_at, student:profiles(full_name)")
            .eq("group_id", session.group!.id)
            .lte("joined_at", session.startsAt)
            .or(`left_at.is.null,left_at.gt."${session.startsAt}"`)
            .order("student_id")
            .range(from, to),
        )
      : Promise.resolve([]),
    session.group
      ? readAll((from, to) =>
          supabase
            .from("session_attendance")
            .select("student_id, status, student:profiles(full_name)")
            .eq("session_id", id)
            .order("student_id")
            .range(from, to),
        )
      : Promise.resolve([]),
    session.seriesId
      ? supabase
          .from("sessions")
          .select("id", { count: "exact", head: true })
          .eq("series_id", session.seriesId)
          .gt("starts_at", session.startsAt)
          .gte("starts_at", now.toISOString())
          .in("status", ["planifiee", "en_attente"])
      : null,
  ]);
  if (later?.error) throw new Error("Could not read the series", { cause: later.error });

  const statusOf = new Map(recorded.map((entry) => [entry.student_id, entry.status]));
  const attendance = new Map<string, SessionDetail["attendance"][number]>();
  for (const member of members) {
    attendance.set(member.student_id, {
      id: member.student_id,
      name: member.student?.full_name ?? "",
      status: statusOf.get(member.student_id) ?? null,
    });
  }
  // Someone marked then taken out of the group's history keeps her line.
  for (const entry of recorded) {
    if (!attendance.has(entry.student_id)) {
      attendance.set(entry.student_id, {
        id: entry.student_id,
        name: entry.student?.full_name ?? "",
        status: entry.status,
      });
    }
  }

  return {
    ...session,
    attendance: [...attendance.values()].sort((a, b) => a.name.localeCompare(b.name, "fr")),
    laterInSeries: later?.count ?? 0,
  };
}

// ─────────────────────────────────────────────────────────────── the student

/**
 * Her sessions to come, soonest first, and her past ones, latest first. A session to come that
 * was cancelled or declined stays with those to come, marked so, until its date has passed:
 * the email that told her so sends her here.
 */
export async function listMySessions(now: Date): Promise<{ upcoming: Session[]; past: Session[] }> {
  const supabase = await createClient();
  const rows = await readAll<Raw>((from, to) =>
    supabase
      .from("sessions")
      .select(FIELDS)
      .order("starts_at", { ascending: false })
      .order("id")
      .range(from, to),
  );
  const sessions = rows.map(toSession);
  const upcoming = sessions
    .filter((session) =>
      session.status === "planifiee" || session.status === "en_attente"
        ? Date.parse(session.endsAt) >= now.getTime()
        : (session.status === "annulee" || session.status === "refusee") &&
          Date.parse(session.startsAt) > now.getTime(),
    )
    .reverse();
  const past = sessions.filter((session) => !upcoming.includes(session));
  return { upcoming, past };
}

export async function getSession(id: string): Promise<Session | null> {
  const supabase = await createClient();
  const row = must(await supabase.from("sessions").select(FIELDS).eq("id", id).maybeSingle());
  return row ? toSession(row) : null;
}

// ─────────────────────────────────────────────────────────────── booking

const DEFAULT_RULES: BookingRules = {
  cancellationWindowHours: 24,
  minNoticeHours: 12,
  horizonDays: 28,
};

export async function getBookingRules(supabase?: Client): Promise<BookingRules> {
  const client = supabase ?? (await createClient());
  const data = must(
    await client
      .from("booking_settings")
      .select("cancellation_window_hours, min_notice_hours, horizon_days")
      .maybeSingle(),
  );
  return data
    ? {
        cancellationWindowHours: data.cancellation_window_hours,
        minNoticeHours: data.min_notice_hours,
        horizonDays: data.horizon_days,
      }
    : DEFAULT_RULES;
}

const time = z.string().regex(/^\d{2}:\d{2}$/);
const calendarSchema = z.object({
  settings: z.object({
    cancellationWindowHours: z.number(),
    minNoticeHours: z.number(),
    horizonDays: z.number(),
  }),
  windows: z.array(
    z.object({
      weekday: z.number().int().min(1).max(7),
      start: time,
      end: time,
      sessionTypeId: z.string().nullable(),
    }),
  ),
  exceptions: z.array(
    z.object({
      startsOn: z.string(),
      endsOn: z.string(),
      isBlocked: z.boolean(),
      start: time.nullable(),
      end: time.nullable(),
      sessionTypeId: z.string().nullable(),
    }),
  ),
  busy: z.array(z.object({ startsAt: z.string(), endsAt: z.string() })),
});

export type BookingCalendar = {
  rules: BookingRules;
  windows: WeeklyWindow[];
  exceptions: AvailabilityException[];
  busy: TimeRange[];
};

/**
 * What a booking page needs, through public.booking_calendar: the rules, the hours and the
 * times already taken, and nothing about whose they are (D-073).
 */
export async function getBookingCalendar(now: Date): Promise<BookingCalendar> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("booking_calendar", {
    p_from: now.toISOString(),
    // The furthest horizon the settings allow, and a day to spare.
    p_to: new Date(now.getTime() + 121 * 24 * 3_600_000).toISOString(),
  });
  if (error) throw new Error("Could not read the booking calendar", { cause: error });
  const calendar = calendarSchema.parse(data);
  return {
    rules: calendar.settings,
    windows: calendar.windows,
    exceptions: calendar.exceptions,
    busy: calendar.busy.map((range) => ({
      startsAt: new Date(range.startsAt),
      endsAt: new Date(range.endsAt),
    })),
  };
}

/** The individual session types a student may ask for. */
export async function listBookableTypes() {
  const supabase = await createClient();
  const data = must(
    await supabase
      .from("session_types")
      .select("id, name, duration_min, mode, price_mad")
      .eq("is_active", true)
      .eq("is_group", false)
      .order("name"),
  );
  return (data ?? []).map((type) => ({
    id: type.id,
    name: type.name,
    durationMin: type.duration_min,
    mode: type.mode,
    price: type.price_mad,
  }));
}
