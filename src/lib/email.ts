import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env.server";

export type OutgoingEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

/**
 * Sends through Resend. Without RESEND_API_KEY nothing is sent, and callers learn that from
 * `delivered`. Emails can carry sign-in links, so their content is only ever printed in local
 * development — never in a deployed environment's logs.
 */
export async function sendEmail(email: OutgoingEmail): Promise<{ delivered: boolean }> {
  if (!serverEnv.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[email] RESEND_API_KEY is not set, so this email was not sent.\nTo: ${email.to}\nSubject: ${email.subject}\n\n${email.text}`,
      );
    } else {
      // Subjects carry names and times: a deployed log says only that something was not sent.
      console.info("[email] RESEND_API_KEY is not set; an email was not sent.");
    }
    return { delivered: false };
  }

  const resend = new Resend(serverEnv.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: serverEnv.EMAIL_FROM,
    to: email.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  if (error) {
    throw new Error(`Resend rejected an email: ${error.message}`);
  }
  return { delivered: true };
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
