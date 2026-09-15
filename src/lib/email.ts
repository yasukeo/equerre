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
 * Sends through Resend. Without RESEND_API_KEY it logs the email instead, so development
 * never needs a mail provider. Callers learn which happened from `delivered`.
 */
export async function sendEmail(email: OutgoingEmail): Promise<{ delivered: boolean }> {
  if (!serverEnv.RESEND_API_KEY) {
    console.info(
      `[email] RESEND_API_KEY is not set, so this email was not sent.\nTo: ${email.to}\nSubject: ${email.subject}\n\n${email.text}`,
    );
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
    throw new Error(`Resend rejected the email to ${email.to}: ${error.message}`);
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
