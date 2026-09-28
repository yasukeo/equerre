import "server-only";
import { getTranslations } from "next-intl/server";
import { formatLocal } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/types/database";

// The notification centre (DECISIONS.md, D-084, D-086): each person reads her own, through her
// own session. What a notification says is written here from its type and payload, in French
// and in Casablanca time, when it is shown.

export type NotificationType = Database["public"]["Enums"]["notification_type"];

export type NotificationView = {
  id: string;
  type: NotificationType;
  text: string;
  detail: string | null;
  href: string | null;
  at: string;
  unread: boolean;
  /** Unread, or read in the last few minutes: still marked « Nouvelle » when the page is drawn
   * again during the visit that read it. */
  fresh: boolean;
  /** For one correction: the grade, drawn in red pen (DESIGN.md). */
  grade: string | null;
};

export type NotificationPage = {
  items: NotificationView[];
  /** The newest shown, exactly as stored: marking read goes up to it, the older ones too. */
  upTo: string | null;
  unread: number;
};

const LIMIT = 50;
const FRESH_MS = 10 * 60_000;

function field(payload: Json, key: string): string | null {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const value = (payload as Record<string, Json | undefined>)[key];
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
  }
  return null;
}

export async function countUnreadNotifications(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);
  return count ?? 0;
}

export async function listMyNotifications(role: "tutor" | "student"): Promise<NotificationPage> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("id, type, payload, read_at, created_at")
    .order("created_at", { ascending: false })
    .limit(LIMIT);
  if (error) throw new Error("Could not read the notifications", { cause: error });
  const t = await getTranslations("notifications");
  const gradeFormat = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });
  const sessions = role === "tutor" ? "/prof/seances/" : "/eleve/seances/";

  const now = Date.now();
  const items = data.map((row) => {
    const payload = row.payload;
    const startsAt = field(payload, "starts_at");
    const values = {
      date: startsAt ? formatLocal(startsAt, "EEEE d MMMM") : "",
      time: startsAt ? formatLocal(startsAt, "HH:mm") : "",
      who: field(payload, "who") ?? "",
      title: field(payload, "title") ?? "",
      count: Number(field(payload, "count") ?? 1),
      due: (() => {
        const due = field(payload, "due_at");
        return due ? formatLocal(due, "EEEE d MMMM 'à' HH:mm") : "";
      })(),
      was: (() => {
        const was = field(payload, "was");
        return was ? formatLocal(was, "EEEE d MMMM 'à' HH:mm") : "";
      })(),
    };
    // A session moved to another place or link keeps its time: another sentence says so.
    const key =
      row.type === "session_moved" && field(payload, "what") === "place"
        ? "session_moved_place"
        : row.type;
    const reason = field(payload, "reason");
    const sessionId = field(payload, "session_id");
    const assignmentId = field(payload, "assignment_id");
    const exerciseId = field(payload, "exercise_id");
    const grade = field(payload, "grade");

    const href =
      row.type === "assignment_new" && assignmentId
        ? `/eleve/devoirs/${assignmentId}`
        : row.type === "correction_ready" && assignmentId
          ? exerciseId && values.count === 1
            ? `/eleve/devoirs/${assignmentId}/${exerciseId}`
            : `/eleve/devoirs/${assignmentId}`
          : sessionId
            ? `${sessions}${sessionId}`
            : null;

    return {
      id: row.id,
      type: row.type,
      text: t(`types.${key}`, values),
      detail: reason ? t("reason", { reason }) : null,
      href,
      at: row.created_at,
      unread: row.read_at === null,
      fresh: row.read_at === null || now - Date.parse(row.read_at) < FRESH_MS,
      // Several exercises corrected together have no one grade to show.
      grade:
        row.type === "correction_ready" && grade !== null && values.count === 1
          ? gradeFormat.format(Number(grade))
          : null,
    };
  });
  return {
    items,
    upTo: data[0]?.created_at ?? null,
    unread: items.filter((item) => item.unread).length,
  };
}
