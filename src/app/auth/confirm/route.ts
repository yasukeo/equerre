import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { homePathFor } from "@/lib/auth";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { createClient } from "@/lib/supabase/server";

const emailOtpType = z.enum(["signup", "invite", "magiclink", "recovery", "email_change", "email"]);

/**
 * Landing point for every email link: sign-up confirmation, magic link, password reset,
 * and the set-password link the tutor sends. Accepts both the PKCE `code` flow and the
 * `token_hash` flow (which also works when the link is opened on another device).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = emailOtpType.safeParse(searchParams.get("type"));

  const supabase = await createClient();
  let verified = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    verified = !error;
  } else if (tokenHash && type.success) {
    const { error } = await supabase.auth.verifyOtp({ type: type.data, token_hash: tokenHash });
    verified = !error;
  }

  if (!verified) {
    return NextResponse.redirect(new URL("/connexion?erreur=lien", request.url));
  }

  if (type.success && (type.data === "recovery" || type.data === "invite")) {
    return NextResponse.redirect(new URL("/nouveau-mot-de-passe", request.url));
  }

  const next = safeRedirectPath(searchParams.get("suite"), "");
  if (next) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;
  const { data: profile } = userId
    ? await supabase.from("profiles").select("role").eq("id", userId).maybeSingle()
    : { data: null };

  return NextResponse.redirect(new URL(homePathFor(profile?.role ?? "student"), request.url));
}
