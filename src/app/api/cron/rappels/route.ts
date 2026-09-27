import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env.server";
import { sendSessionEmail, studentRecipients } from "@/lib/sessions/notify";
import { createAdminClient } from "@/lib/supabase/admin";

// Reminders 24 hours and 2 hours before a session (DECISIONS.md, D-078). Supabase Cron calls
// this every 15 minutes with the shared secret. Each reminder is claimed by stamping it before
// it is sent, so a retry or two overlapping runs never send it twice; if no email at all could
// leave, or anything failed on the way, the stamp is taken back and the next run tries again.
// A reminder already said by the email of a booking, a confirmation or a move was stamped by
// the database when that happened (private.stamp_session_reminders).

const HOUR = 3_600_000;

const REMINDERS = [
  { kind: "reminder24h", column: "reminder_24h_sent_at", from: 2 * HOUR, to: 24 * HOUR },
  { kind: "reminder2h", column: "reminder_2h_sent_at", from: 0, to: 2 * HOUR },
] as const;

type Column = (typeof REMINDERS)[number]["column"];

function stamped(column: Column, value: string | null) {
  return column === "reminder_24h_sent_at"
    ? { reminder_24h_sent_at: value }
    : { reminder_2h_sent_at: value };
}

function authorized(request: Request, secret: string): boolean {
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: Request) {
  const secret = serverEnv.CRON_SECRET;
  if (!secret) return Response.json({ error: "CRON_SECRET is not set" }, { status: 503 });
  if (!authorized(request, secret))
    return Response.json({ error: "unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return Response.json({ error: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });
  // Nothing can leave: leave every reminder unclaimed for the day email works.
  if (!serverEnv.RESEND_API_KEY) return Response.json({ skipped: "RESEND_API_KEY is not set" });

  const now = Date.now();
  const report: Record<string, number> = {};

  for (const reminder of REMINDERS) {
    const { data: due, error } = await admin
      .from("sessions")
      .select(
        "id, starts_at, ends_at, mode, location, meeting_url, student_id, group_id, session_type:session_types(name), group:groups(name)",
      )
      .eq("status", "planifiee")
      .is(reminder.column, null)
      .gt("starts_at", new Date(now + reminder.from).toISOString())
      .lte("starts_at", new Date(now + reminder.to).toISOString())
      .order("starts_at")
      .limit(200);
    if (error) throw new Error("Could not read the sessions to remind", { cause: error });

    let sent = 0;
    for (const session of due) {
      const stamp = new Date().toISOString();
      const { data: claimed } = await admin
        .from("sessions")
        .update(stamped(reminder.column, stamp))
        .eq("id", session.id)
        .eq("status", "planifiee")
        .is(reminder.column, null)
        .select("id");
      if (!claimed?.length) continue;
      const release = () =>
        admin
          .from("sessions")
          .update(stamped(reminder.column, null))
          .eq("id", session.id)
          .eq(reminder.column, stamp);

      try {
        const recipients = await studentRecipients(admin, {
          studentId: session.student_id,
          groupId: session.group_id,
          startsAt: session.starts_at,
        });
        const results = await Promise.all(
          recipients.map((to) =>
            sendSessionEmail({
              kind: reminder.kind,
              to,
              session: {
                id: session.id,
                startsAt: session.starts_at,
                endsAt: session.ends_at,
                typeName: session.session_type?.name ?? "",
                mode: session.mode,
                location: session.location,
                meetingUrl: session.meeting_url,
                who: session.group?.name ?? "",
              },
            }),
          ),
        );
        const delivered = results.filter(Boolean).length;
        if (recipients.length > 0 && delivered === 0) {
          await release();
          continue;
        }
        sent += delivered;
      } catch (failure) {
        // Claimed but not sent: the next run gets another go, and this run goes on.
        await release();
        console.error(`[rappels] session ${session.id}:`, (failure as Error).message);
      }
    }
    report[reminder.kind] = sent;
  }

  // Files attached to no message a day after they were uploaded were given up (D-083).
  const { data: stale } = await admin.rpc("stale_message_files", { p_limit: 200 });
  if (stale && stale.length > 0) {
    const { data: removed } = await admin.storage.from("message-files").remove(stale);
    report.staleFiles = removed?.length ?? 0;
  }

  return Response.json(report);
}
