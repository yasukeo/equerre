import "server-only";
import { z } from "zod";
import { homePathFor } from "@/lib/auth";
import { safeRedirectPath } from "@/lib/safe-redirect";
import type { createClient } from "@/lib/supabase/server";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

export const emailOtpType = z.enum([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);
export type EmailOtpType = z.infer<typeof emailOtpType>;

/** Where a verified email link lands: the set-password page, `?suite=`, or the person's home. */
export async function destinationAfterEmailLink(
  supabase: ServerClient,
  type: EmailOtpType | null,
  suite: string | null,
): Promise<string> {
  if (type === "recovery" || type === "invite") {
    return "/nouveau-mot-de-passe";
  }

  const next = safeRedirectPath(suite, "");
  if (next) {
    return next;
  }

  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;
  const { data: profile } = userId
    ? await supabase.from("profiles").select("role").eq("id", userId).maybeSingle()
    : { data: null };
  return homePathFor(profile?.role ?? "student");
}
