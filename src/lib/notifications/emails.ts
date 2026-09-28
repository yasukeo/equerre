import "server-only";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { formatLocal } from "@/lib/dates";
import { escapeHtml, sendEmail } from "@/lib/email";
import { publicEnv } from "@/lib/env";
import type { Json } from "@/types/database";

// Emails the scheduled job sends from the notification centre (DECISIONS.md, D-085): new
// homework, a correction ready, and a digest of unread messages, never one email per message.
// Times are Casablanca wall-clock time, in words. Sending never throws: the job learns from
// the answer whether the email left.

function field(payload: Json, key: string): string | null {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const value = (payload as Record<string, Json | undefined>)[key];
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
  }
  return null;
}

function firstName(fullName: string): string {
  return fullName.split(" ")[0] || fullName;
}

async function send(
  to: string,
  subject: string,
  paragraphs: string[],
  link: string,
  button: string,
) {
  try {
    const { delivered } = await sendEmail({
      to,
      subject,
      text: [...paragraphs, `${button} : ${link}`].join("\n\n"),
      html: [
        ...paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`),
        `<p><a href="${escapeHtml(link)}">${escapeHtml(button)}</a></p>`,
      ].join(""),
    });
    return delivered;
  } catch (error) {
    console.error(`[email] "${subject.slice(0, 12)}…" failed:`, (error as Error).message);
    return false;
  }
}

/** New homework or a correction ready, from the homework as it is when the email is claimed. */
export async function sendNotificationEmail(row: {
  email: string;
  fullName: string;
  type: "assignment_new" | "correction_ready";
  title: string;
  dueAt: string | null;
  assignmentId: string;
  count: number;
}): Promise<boolean> {
  try {
    const name = firstName(row.fullName);
    const link = `${publicEnv.NEXT_PUBLIC_SITE_URL}/eleve/devoirs/${row.assignmentId}`;
    if (row.type === "assignment_new") {
      const t = await getTranslations("email.assignment");
      const due = row.dueAt ? formatLocal(row.dueAt, "EEEE d MMMM 'à' HH:mm") : "";
      return await send(
        row.email,
        t("subject", { title: row.title }),
        [t("greeting", { name }), t("body", { title: row.title, due })],
        link,
        t("button"),
      );
    }
    const t = await getTranslations("email.correction");
    return await send(
      row.email,
      t("subject", { title: row.title }),
      [t("greeting", { name }), t("body", { title: row.title, count: row.count })],
      link,
      t("button"),
    );
  } catch (error) {
    console.error(`[email] ${row.type} failed:`, (error as Error).message);
    return false;
  }
}

/** Every message unread, conversation by conversation. */
export async function sendDigestEmail(row: {
  email: string;
  fullName: string;
  isTutor: boolean;
  conversations: Json;
}): Promise<boolean> {
  try {
    const t = await getTranslations("email.digest");
    const entries = Array.isArray(row.conversations) ? row.conversations : [];
    const total = entries.reduce<number>(
      (sum, entry) => sum + Number(field(entry, "count") ?? 0),
      0,
    );
    const lines = entries.map((entry) => {
      const name =
        field(entry, "group") ?? (row.isTutor ? field(entry, "student") : siteConfig.tutorName);
      return t("line", { name: name ?? "", count: Number(field(entry, "count") ?? 0) });
    });
    return await send(
      row.email,
      t("subject", { count: total }),
      [t("greeting", { name: firstName(row.fullName) }), t("body", { count: total }), ...lines],
      `${publicEnv.NEXT_PUBLIC_SITE_URL}${row.isTutor ? "/prof/messages" : "/eleve/messages"}`,
      t("button"),
    );
  } catch (error) {
    console.error("[email] digest failed:", (error as Error).message);
    return false;
  }
}
