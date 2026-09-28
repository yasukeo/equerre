import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env.server";
import { sendDigestEmail, sendNotificationEmail } from "@/lib/notifications/emails";
import { sendSessionEmail, studentRecipients } from "@/lib/sessions/notify";
import { createAdminClient } from "@/lib/supabase/admin";

// The scheduled emails (DECISIONS.md, D-078, D-085): reminders 24 hours and 2 hours before a
// session, new homework and corrections ready, and a digest of unread messages. Supabase Cron
// calls this every 15 minutes with the shared secret. Each reminder is claimed by stamping it before
// it is sent, so a retry or two overlapping runs never send it twice; if no email at all could
// leave, or anything failed on the way, the stamp is taken back and the next run tries again.
// A reminder already said by the email of a booking, a confirmation or a move was stamped by
// the database when that happened (private.stamp_session_reminders). Each stage runs on its own:
// one that fails is logged and the next still runs (D-086).

const HOUR = 3_600_000;
/** Emails failing in a row: the provider is likely down, the next run tries again. */
const MAX_FAILURES = 3;

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

  const report: Report = {};
  const stages = [
    ["reminders", () => sendReminders(admin, report)],
    ["notifications", () => sendNotifications(admin, report)],
    ["digests", () => sendDigests(admin, report)],
    ["staleFiles", () => sweepStaleFiles(admin, report)],
  ] as const;
  for (const [name, stage] of stages) {
    try {
      await stage();
    } catch (failure) {
      report[name] = "failed";
      console.error(`[rappels] ${name}:`, (failure as Error).message);
    }
  }
  return Response.json(report);
}

type Admin = NonNullable<ReturnType<typeof createAdminClient>>;
type Report = Record<string, number | string>;

async function sendReminders(admin: Admin, report: Report) {
  const now = Date.now();
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
        // The day before, the reminder is in the notification centre too, whatever the email
        // does; once a person and a session (D-084, D-086).
        if (reminder.kind === "reminder24h") {
          const { error: added } = await admin.rpc("add_session_reminder", {
            p_session_id: session.id,
          });
          if (added) console.error(`[rappels] session ${session.id}:`, added.message);
        }
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
}

/**
 * New homework and corrections ready, ten minutes on. Each is claimed by the database, which
 * reads the homework as it is now and says whether an email is still due (D-086).
 */
async function sendNotifications(admin: Admin, report: Report) {
  const { data: ids, error } = await admin.rpc("notifications_to_email", { p_limit: 200 });
  if (error) throw new Error("Could not read the notifications to email", { cause: error });
  let sent = 0;
  let failures = 0;
  for (const id of ids) {
    if (failures >= MAX_FAILURES) break;
    const { data: claims } = await admin.rpc("claim_notification_email", { p_id: id });
    const claim = claims?.[0];
    if (!claim?.send || !claim.email || !claim.assignment_id) continue;
    if (claim.type !== "assignment_new" && claim.type !== "correction_ready") continue;
    const delivered = await sendNotificationEmail({
      email: claim.email,
      fullName: claim.full_name,
      type: claim.type,
      title: claim.title ?? "",
      dueAt: claim.due_at,
      assignmentId: claim.assignment_id,
      count: claim.count,
    });
    if (delivered) {
      sent += 1;
      failures = 0;
    } else {
      failures += 1;
      await admin
        .from("notifications")
        .update({ emailed_at: null })
        .eq("id", id)
        .eq("emailed_at", claim.stamp);
    }
  }
  report.notifications = sent;
}

/** Messages unread for a quarter of an hour: one digest a person, never one email a message. */
async function sendDigests(admin: Admin, report: Report) {
  const { data: digests, error } = await admin.rpc("message_digests_due");
  if (error) throw new Error("Could not read the digests due", { cause: error });
  let sent = 0;
  let failures = 0;
  for (const digest of digests) {
    if (failures >= MAX_FAILURES) break;
    if (!digest.email) continue;
    // Claimed first, by compare-and-set: a run at the same time finds nothing more to tell.
    const { data: previous } = await admin.rpc("claim_message_digest", {
      p_profile_id: digest.profile_id,
      p_up_to: digest.newest,
    });
    if (!previous) continue;
    const delivered = await sendDigestEmail({
      email: digest.email,
      fullName: digest.full_name,
      isTutor: digest.is_tutor,
      conversations: digest.conversations,
    });
    if (delivered) {
      sent += 1;
      failures = 0;
    } else {
      failures += 1;
      await admin.rpc("release_message_digest", {
        p_profile_id: digest.profile_id,
        p_up_to: digest.newest,
        p_previous: previous,
      });
    }
  }
  report.digests = sent;
}

/** Files attached to no message a day after they were uploaded were given up (D-083). */
async function sweepStaleFiles(admin: Admin, report: Report) {
  const { data: stale } = await admin.rpc("stale_message_files", { p_limit: 200 });
  if (stale && stale.length > 0) {
    const { data: removed } = await admin.storage.from("message-files").remove(stale);
    report.staleFiles = removed?.length ?? 0;
  }
}
