"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { requireViewer } from "@/lib/auth";
import { isDateKey } from "@/lib/sessions/calendar-views";
import { formatLocal, localDateKeyInDays, localDateTimeToUtc } from "@/lib/dates";
import { fieldErrorsFor, textField, type FormState } from "@/lib/form-state";
import {
  MAX_LOCATION_LENGTH,
  MAX_REASON_LENGTH,
  MAX_RECAP_LENGTH,
  MAX_SERIES_LENGTH,
  MAX_SESSION_HOMEWORK_LENGTH,
} from "@/lib/sessions/limits";
import {
  sendSessionEmail,
  studentRecipients,
  type NoticeSession,
  type SessionNotice,
} from "@/lib/sessions/notify";
import { createClient } from "@/lib/supabase/server";

// The tutor answers requests, plans, moves, cancels and closes sessions (DECISIONS.md, D-074,
// D-075). Her policies let her write every session; the calls add what one table cannot say:
// a confirmed session never overlaps another (the exclusion constraint, D-027), a series is
// written whole, and closing records attendance with the session.

type Client = Awaited<ReturnType<typeof createClient>>;

const NOTICE_FIELDS =
  "id, starts_at, ends_at, status, mode, location, meeting_url, series_id, student_id, group_id, session_type:session_types(name, duration_min), student:profiles!sessions_student_id_fkey(full_name), group:groups(name)" as const;

type NoticeRow = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  mode: NoticeSession["mode"];
  location: string | null;
  meeting_url: string | null;
  series_id: string | null;
  student_id: string | null;
  group_id: string | null;
  session_type: { name: string; duration_min: number } | null;
  student: { full_name: string } | null;
  group: { name: string } | null;
};

function toNotice(row: NoticeRow): NoticeSession {
  return {
    id: row.id,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    typeName: row.session_type?.name ?? "",
    mode: row.mode,
    location: row.location,
    meetingUrl: row.meeting_url,
    who: row.student?.full_name ?? row.group?.name ?? "",
  };
}

/** Tells the students of a session; an email that cannot go never undoes what she did. */
async function tell(
  supabase: Client,
  kind: SessionNotice,
  row: NoticeRow,
  options: { reason?: string | null; extra?: string | null } = {},
) {
  try {
    const recipients = await studentRecipients(supabase, {
      studentId: row.student_id,
      groupId: row.group_id,
      startsAt: row.starts_at,
    });
    await Promise.all(
      recipients.map((to) => sendSessionEmail({ kind, to, session: toNotice(row), ...options })),
    );
  } catch (error) {
    console.error(`[email] "${kind}" for session ${row.id}:`, (error as Error).message);
  }
}

const id = z.uuid();

// ─────────────────────────────────────────────────────────────── requests

export async function confirmRequest(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.sessions");
  const sessionId = id.safeParse(textField(formData, "id"));
  if (!sessionId.success) return { status: "error", message: t("errors.gone") };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sessions")
    .update({ status: "planifiee" })
    .eq("id", sessionId.data)
    .eq("status", "en_attente")
    .gt("starts_at", new Date().toISOString())
    .select(NOTICE_FIELDS);
  if (error) {
    return {
      status: "error",
      message: error.code === "23P01" ? t("errors.overlapRequest") : t("errors.unknown"),
    };
  }
  const row = data[0];
  if (!row) {
    // Withdrawn, answered or started meanwhile: the page is drawn again, as the message says.
    refresh();
    return { status: "error", message: t("errors.gone") };
  }

  await tell(supabase, "confirmed", row);
  refresh();
  // From the session's own page, the answer takes that page's place: it says so at the top.
  if (textField(formData, "back") === "session")
    redirect(`/prof/seances/${row.id}?reponse=confirmee`);
  return { status: "success", message: t("confirmed") };
}

export async function declineRequest(_previous: FormState, formData: FormData): Promise<FormState> {
  const viewer = await requireViewer("tutor");
  const t = await getTranslations("tutor.sessions");
  const sessionId = id.safeParse(textField(formData, "id"));
  const reason = textField(formData, "reason").trim();
  if (!sessionId.success) return { status: "error", message: t("errors.gone") };
  if (reason.length > MAX_REASON_LENGTH) {
    return { status: "error", message: t("errors.reasonTooLong"), values: { reason } };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sessions")
    .update({
      status: "refusee",
      cancelled_at: new Date().toISOString(),
      cancelled_by: viewer.id,
      cancellation_reason: reason || null,
    })
    .eq("id", sessionId.data)
    .eq("status", "en_attente")
    .select(NOTICE_FIELDS);
  if (error) return { status: "error", message: t("errors.unknown"), values: { reason } };
  const row = data[0];
  if (!row) {
    refresh();
    return { status: "error", message: t("errors.gone") };
  }

  await tell(supabase, "declined", row, { reason: reason || null });
  refresh();
  if (textField(formData, "back") === "session")
    redirect(`/prof/seances/${row.id}?reponse=refusee`);
  return { status: "success", message: t("declined") };
}

// ─────────────────────────────────────────────────────────────── one session

export async function cancelSession(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const t = await getTranslations("tutor.session");
  const sessionId = id.safeParse(textField(formData, "id"));
  const reason = textField(formData, "reason").trim();
  const following = textField(formData, "following") === "true";
  if (!sessionId.success) return { status: "error", message: t("errors.gone") };
  if (reason.length > MAX_REASON_LENGTH) {
    return { status: "error", message: t("errors.reasonTooLong"), values: { reason } };
  }

  // With « aussi les suivantes », the rest of a weekly series still planned or asked for goes
  // in the same statement: each student hears of it once (D-086).
  const supabase = await createClient();
  const { data: ids, error } = await supabase.rpc("cancel_sessions", {
    p_session_id: sessionId.data,
    p_reason: reason,
    p_following: following,
  });
  if (error) return { status: "error", message: t("errors.unknown"), values: { reason } };
  if (!ids.includes(sessionId.data)) {
    refresh();
    return { status: "error", message: t("errors.gone") };
  }
  const later = ids.length - 1;
  const { data: row } = await supabase
    .from("sessions")
    .select(NOTICE_FIELDS)
    .eq("id", sessionId.data)
    .single();
  if (!row) {
    refresh();
    redirect(`/prof/seances/${sessionId.data}?annulee=${later}`);
  }

  await tell(supabase, "cancelledByTutor", row, {
    reason: reason || null,
    extra: later > 0 ? t("followingCancelledEmail", { count: later }) : null,
  });
  // The form goes with the session it cancelled: the page says what happened at its top.
  refresh();
  redirect(`/prof/seances/${row.id}?annulee=${later}`);
}

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
const date = z.string().refine(isDateKey);
const mode = z.enum(["en_ligne", "domicile", "chez_prof"]);
const meetingUrl = z.union([z.literal(""), z.url({ protocol: /^https$/ }).max(500)]);
const location = z.string().trim().max(MAX_LOCATION_LENGTH);

const moveSchema = z.object({ date, time, mode, location, meetingUrl });

export async function moveSession(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.session"),
    getTranslations("forms"),
  ]);
  const sessionId = id.safeParse(textField(formData, "id"));
  const values = {
    date: textField(formData, "date"),
    time: textField(formData, "time"),
    mode: textField(formData, "mode"),
    location: textField(formData, "location"),
    meetingUrl: textField(formData, "meetingUrl").trim(),
  };
  const parsed = moveSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        date: t("errors.date"),
        time: t("errors.time"),
        mode: t("errors.mode"),
        location: t("errors.location"),
        meetingUrl: t("errors.meetingUrl"),
      }),
      values,
    };
  }
  if (!sessionId.success) return { status: "error", message: t("errors.gone"), values };

  const supabase = await createClient();
  const { data: current } = await supabase
    .from("sessions")
    .select("starts_at, ends_at, status, mode, location, meeting_url")
    .eq("id", sessionId.data)
    .maybeSingle();
  // A session under way or over is closed, not moved: a page left open is told so.
  if (!current || current.status !== "planifiee" || Date.parse(current.starts_at) <= Date.now()) {
    refresh();
    return { status: "error", message: t("errors.gone"), values };
  }

  let startsAt: Date;
  try {
    startsAt = localDateTimeToUtc(parsed.data.date, parsed.data.time);
  } catch {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: { date: t("errors.date") },
      values,
    };
  }
  if (startsAt.getTime() <= Date.now()) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: { time: t("errors.inPast") },
      values,
    };
  }
  const length = Date.parse(current.ends_at) - Date.parse(current.starts_at);
  const moved = startsAt.getTime() !== Date.parse(current.starts_at);
  // A new place or link matters to the student as much as a new time.
  const changed =
    moved ||
    parsed.data.mode !== current.mode ||
    (parsed.data.location || null) !== current.location ||
    (parsed.data.meetingUrl || null) !== current.meeting_url;

  const { data, error } = await supabase
    .from("sessions")
    .update({
      starts_at: startsAt.toISOString(),
      ends_at: new Date(startsAt.getTime() + length).toISOString(),
      mode: parsed.data.mode,
      location: parsed.data.location || null,
      meeting_url: parsed.data.meetingUrl || null,
    })
    .eq("id", sessionId.data)
    .eq("status", "planifiee")
    .eq("starts_at", current.starts_at)
    .select(NOTICE_FIELDS);
  if (error) {
    return {
      status: "error",
      message: error.code === "23P01" ? t("errors.overlap") : t("errors.unknown"),
      values,
    };
  }
  const row = data[0];
  if (!row) {
    refresh();
    return { status: "error", message: t("errors.gone"), values };
  }

  if (changed) await tell(supabase, "moved", row);
  refresh();
  return { status: "success", message: changed ? t("moved") : t("saved"), values };
}

const ATTENDANCE = ["present", "absent", "excuse"] as const;

const closeSchema = z.object({
  status: z.enum(["terminee", "absent"]),
  chapterId: z.union([z.literal(""), z.uuid()]),
  homework: z.string().trim().max(MAX_SESSION_HOMEWORK_LENGTH),
  recap: z.string().trim().max(MAX_RECAP_LENGTH),
});

export async function closeSession(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.session"),
    getTranslations("forms"),
  ]);
  const sessionId = id.safeParse(textField(formData, "id"));
  const values = {
    status: textField(formData, "status"),
    chapterId: textField(formData, "chapterId"),
    homework: textField(formData, "homework"),
    recap: textField(formData, "recap"),
  };
  const parsed = closeSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        status: t("errors.closeStatus"),
        chapterId: t("errors.chapter"),
        homework: t("errors.homework"),
        recap: t("errors.recap"),
      }),
      values,
    };
  }
  if (!sessionId.success) return { status: "error", message: t("errors.gone"), values };

  // One field per member: attendance.<student id> = present | absent | excuse.
  const attendance: Record<string, (typeof ATTENDANCE)[number]> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("attendance.") || typeof value !== "string" || value === "") continue;
    const studentId = id.safeParse(key.slice("attendance.".length));
    const status = z.enum(ATTENDANCE).safeParse(value);
    if (studentId.success && status.success) attendance[studentId.data] = status.data;
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("close_session", {
    p_session_id: sessionId.data,
    p_status: parsed.data.status,
    p_covered_chapter_id: parsed.data.chapterId || undefined,
    p_homework: parsed.data.homework,
    p_recap: parsed.data.recap,
    p_attendance: attendance,
  });
  if (error) {
    const known = ["session_not_found", "status_invalid", "not_closable", "not_started"] as const;
    const code = known.find((entry) => entry === error.message);
    return {
      status: "error",
      message: code
        ? t(`errors.${code}`)
        : error.code === "23503"
          ? t("errors.chapter")
          : t("errors.unknown"),
      values,
    };
  }
  refresh();
  return { status: "success", message: t("closed"), values };
}

// ─────────────────────────────────────────────────────────────── planning

const planSchema = z
  .object({
    recipient: z.enum(["student", "group"]),
    studentId: z.union([z.literal(""), z.uuid()]),
    groupId: z.union([z.literal(""), z.uuid()]),
    typeId: z.uuid(),
    date,
    time,
    repeat: z.enum(["true", "false"]),
    until: z.union([z.literal(""), date]),
    mode: z.union([z.literal(""), mode]),
    location,
    meetingUrl,
  })
  .refine((value) => value.recipient !== "student" || value.studentId !== "", {
    path: ["studentId"],
  })
  .refine((value) => value.recipient !== "group" || value.groupId !== "", { path: ["groupId"] })
  .refine((value) => value.repeat === "false" || (value.until !== "" && value.until > value.date), {
    path: ["until"],
  });

/** The local dates of a weekly series, from the first to `until` included, one per week. */
function weeklyDates(first: string, until: string): string[] {
  const noon = localDateTimeToUtc(first, "12:00");
  const dates: string[] = [];
  for (let week = 0; week < MAX_SERIES_LENGTH + 1; week++) {
    const next = week === 0 ? first : localDateKeyInDays(noon, week * 7);
    if (next > until) break;
    dates.push(next);
  }
  return dates;
}

export async function planSessions(_previous: FormState, formData: FormData): Promise<FormState> {
  await requireViewer("tutor");
  const [t, tForms] = await Promise.all([
    getTranslations("tutor.planSession"),
    getTranslations("forms"),
  ]);
  const values = {
    recipient: textField(formData, "recipient"),
    studentId: textField(formData, "studentId"),
    groupId: textField(formData, "groupId"),
    typeId: textField(formData, "typeId"),
    date: textField(formData, "date"),
    time: textField(formData, "time"),
    repeat: textField(formData, "repeat") || "false",
    until: textField(formData, "until"),
    mode: textField(formData, "mode"),
    location: textField(formData, "location"),
    meetingUrl: textField(formData, "meetingUrl").trim(),
  };
  const parsed = planSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: fieldErrorsFor(parsed.error, {
        recipient: t("errors.recipient"),
        studentId: t("errors.student"),
        groupId: t("errors.group"),
        typeId: t("errors.type"),
        date: t("errors.date"),
        time: t("errors.time"),
        until: t("errors.until"),
        mode: t("errors.mode"),
        location: t("errors.location"),
        meetingUrl: t("errors.meetingUrl"),
      }),
      values,
    };
  }
  const plan = parsed.data;
  const dates = plan.repeat === "true" ? weeklyDates(plan.date, plan.until) : [plan.date];
  if (dates.length > MAX_SERIES_LENGTH) {
    return {
      status: "error",
      message: tForms("checkFields"),
      fieldErrors: { until: t("errors.tooMany", { max: MAX_SERIES_LENGTH }) },
      values,
    };
  }
  let starts: Date[];
  try {
    starts = dates.map((day) => localDateTimeToUtc(day, plan.time));
  } catch {
    return { status: "error", message: tForms("checkFields"), values };
  }

  const supabase = await createClient();
  const { data: firstId, error } = await supabase.rpc("plan_sessions", {
    p_starts_at: starts.map((start) => start.toISOString()),
    p_session_type_id: plan.typeId,
    p_student_id: plan.recipient === "student" ? plan.studentId : undefined,
    p_group_id: plan.recipient === "group" ? plan.groupId : undefined,
    p_mode: plan.mode || undefined,
    p_location: plan.location,
    p_meeting_url: plan.meetingUrl,
  });
  if (error || !firstId) {
    if (error?.message === "overlap") {
      // The function names the local wall-clock times that overlap: 2026-09-29T17:30,…
      const clashes = (error.details ?? "")
        .split(",")
        .filter(Boolean)
        .map((local) => {
          const [day = "", hour = ""] = local.split("T");
          return formatLocal(localDateTimeToUtc(day, hour), "EEEE d MMMM 'à' HH:mm");
        });
      return {
        status: "error",
        message: t("errors.overlap", { count: clashes.length, dates: clashes.join(", ") }),
        values,
      };
    }
    // Two plans at once can pass the check together; the constraint then refuses the second.
    if (error?.code === "23P01") {
      return { status: "error", message: t("errors.overlapRace"), values };
    }
    const known = ["recipient_invalid", "type_invalid", "dates_invalid"] as const;
    const code = known.find((entry) => entry === error?.message);
    return {
      status: "error",
      message: code ? t(`errors.${code}`) : t("errors.unknown"),
      values,
    };
  }

  const { data: first } = await supabase
    .from("sessions")
    .select(NOTICE_FIELDS)
    .eq("id", firstId)
    .maybeSingle();
  if (first && starts[0]!.getTime() > Date.now()) {
    await tell(supabase, "planned", first, {
      extra:
        dates.length > 1
          ? t("seriesEmail", {
              count: dates.length - 1,
              until: formatLocal(`${dates.at(-1)}T12:00:00Z`, "EEEE d MMMM"),
            })
          : null,
    });
  }

  refresh();
  redirect(`/prof/seances/${firstId}?planifiee=${dates.length}`);
}
