import { NextResponse, type NextRequest } from "next/server";
import { destinationAfterEmailLink, emailOtpType } from "@/lib/email-link";
import { createClient } from "@/lib/supabase/server";

/**
 * The value of a query parameter that must appear exactly once. Links come from Supabase or
 * from this app and never repeat a token, type or destination, so a repeat is refused.
 */
function single(searchParams: URLSearchParams, name: string): string | null {
  const values = searchParams.getAll(name);
  return values.length === 1 ? (values[0] ?? null) : null;
}

/**
 * Landing point for every email link: sign-up confirmation, magic link, password reset, and
 * the set-password link the tutor sends. Accepts the PKCE `code` flow and the `token_hash`
 * flow, which also works when the link is opened on another device (DECISIONS.md, D-030).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = single(searchParams, "code");
  const tokenHash = single(searchParams, "token_hash");
  const type = emailOtpType.safeParse(single(searchParams, "type"));
  const suite = single(searchParams, "suite");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const destination = await destinationAfterEmailLink(
        supabase,
        type.success ? type.data : null,
        suite,
      );
      return NextResponse.redirect(new URL(destination, request.url));
    }
  } else if (tokenHash && type.success) {
    // A token_hash is spent the moment it is verified, and mail scanners open links with a
    // GET to inspect them — so it is never verified on GET. The link lands on a page whose
    // button posts it back, which only a person does (DECISIONS.md, D-062).
    const confirm = new URL("/connexion/confirmer", request.url);
    confirm.searchParams.set("token_hash", tokenHash);
    confirm.searchParams.set("type", type.data);
    if (suite) {
      confirm.searchParams.set("suite", suite);
    }
    return NextResponse.redirect(confirm);
  }

  return NextResponse.redirect(new URL("/connexion?erreur=lien", request.url));
}
