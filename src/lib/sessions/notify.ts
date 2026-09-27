import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { formatLocal, localDateKey, localDateKeyInDays } from "@/lib/dates";
import { escapeHtml, sendEmail } from "@/lib/email";
import { publicEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";
import type { SessionMode } from "./queries";

// Emails about a session (DECISIONS.md, D-077). Every time in them is Casablanca wall-clock
// time, written out in words, so the student and the tutor read the same hour whatever their
// phone's zone. Sending never decides an action: a booking stands whether or not its email
// left, and a failure is logged without the email's content.

export type SessionNotice =
  | "requested"
  | "booked"
  | "confirmed"
  | "declined"
  | "cancelledByStudent"
  | "cancelledByTutor"
  | "moved"
  | "planned"
  | "reminder24h"
  | "reminder2h";

/** Who reads the email, and so which side of the site its link opens. */
const FOR_TUTOR: SessionNotice[] = ["requested", "booked", "cancelledByStudent"];

export type NoticeSession = {
  id: string;
  startsAt: string;
  endsAt: string;
  typeName: string;
  mode: SessionMode;
  location: string | null;
  meetingUrl: string | null;
  /** The student or the group, for the tutor's emails. */
  who: string;
};

export type Recipient = { email: string; name: string };

export async function sendSessionEmail({
  kind,
  to,
  session,
  reason,
  note,
  extra,
}: {
  kind: SessionNotice;
  to: Recipient;
  session: NoticeSession;
  reason?: string | null;
  /** What the student wrote with her request. */
  note?: string | null;
  /** One more sentence, already worded (the rest of a series). */
  extra?: string | null;
}): Promise<boolean> {
  try {
    const [t, tMode] = await Promise.all([
      getTranslations("email.session"),
      getTranslations("session.mode"),
    ]);
    const forTutor = FOR_TUTOR.includes(kind);
    const now = new Date();
    const sessionDay = localDateKey(session.startsAt);
    const values = {
      who: session.who,
      date: formatLocal(session.startsAt, "EEEE d MMMM"),
      start: formatLocal(session.startsAt, "HH:mm"),
      end: formatLocal(session.endsAt, "HH:mm"),
      // « aujourd’hui » or « demain », from the calendar in Casablanca, for the reminders.
      day:
        sessionDay === localDateKey(now)
          ? "today"
          : sessionDay === localDateKeyInDays(now, 1)
            ? "tomorrow"
            : "other",
    };
    const url = `${publicEnv.NEXT_PUBLIC_SITE_URL}${forTutor ? "/prof/seances/" : "/eleve/seances/"}${session.id}`;
    const firstName = to.name.split(" ")[0] || to.name;

    const place = [session.typeName, session.location ?? tMode(session.mode)].join(" · ");
    const paragraphs = [
      t(`${kind}.body`, values),
      place,
      ...(note ? [t("note", { note })] : []),
      ...(reason ? [t("reason", { reason })] : []),
      ...(extra ? [extra] : []),
      ...(session.mode === "en_ligne" && session.meetingUrl && !forTutor
        ? [t("meeting", { url: session.meetingUrl })]
        : []),
    ];
    const greeting = forTutor ? null : t("greeting", { name: firstName });
    const button = forTutor ? t("openTutor") : t("openStudent");

    const { delivered } = await sendEmail({
      to: to.email,
      subject: t(`${kind}.subject`, values),
      text: [greeting, ...paragraphs, `${button} : ${url}`].filter(Boolean).join("\n\n"),
      html: [
        greeting ? `<p>${escapeHtml(greeting)}</p>` : "",
        ...paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`),
        `<p><a href="${escapeHtml(url)}">${escapeHtml(button)}</a></p>`,
      ].join(""),
    });
    return delivered;
  } catch (error) {
    console.error(`[email] "${kind}" for session ${session.id} failed:`, (error as Error).message);
    return false;
  }
}

/**
 * The tutor's address, for what a student does. A student cannot read the tutor's profile, so
 * this goes through the secret key (DECISIONS.md, « Secret key usage »). Without it, null.
 */
export async function tutorRecipient(): Promise<Recipient | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin
    .from("profiles")
    .select("email, full_name")
    .eq("role", "tutor")
    .maybeSingle();
  return data?.email ? { email: data.email, name: data.full_name } : null;
}

/**
 * The students a session is for, who still follow lessons: the student herself, or the members
 * of the group on the day it takes place (D-070). Read with the tutor's own session, or with
 * the secret key from a scheduled job.
 */
export async function studentRecipients(
  client: SupabaseClient<Database>,
  session: { studentId: string | null; groupId: string | null; startsAt: string },
): Promise<Recipient[]> {
  let ids: string[] = [];
  if (session.studentId) {
    ids = [session.studentId];
  } else if (session.groupId) {
    const { data, error } = await client
      .from("group_members")
      .select("student_id")
      .eq("group_id", session.groupId)
      .lte("joined_at", session.startsAt)
      .or(`left_at.is.null,left_at.gt."${session.startsAt}"`);
    if (error) throw new Error("Could not read the group's members", { cause: error });
    ids = (data ?? []).map((member) => member.student_id);
  }
  if (ids.length === 0) return [];

  const { data, error } = await client
    .from("profiles")
    .select("email, full_name")
    .in("id", ids)
    .eq("status", "actif");
  if (error) throw new Error("Could not read the students", { cause: error });
  return (data ?? []).flatMap((profile) =>
    profile.email ? [{ email: profile.email, name: profile.full_name }] : [],
  );
}
