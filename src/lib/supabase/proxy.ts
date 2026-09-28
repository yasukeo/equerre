import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { publicEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/** Routes that need a session. Role checks happen on the server, next to the data. */
const PRIVATE_PREFIXES = ["/prof", "/eleve", "/agenda", "/recus", "/nouveau-mot-de-passe"];

export function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Refreshes the Supabase session on every request and sends signed-out visitors away
 * from private routes. This is an optimistic check: pages still verify the viewer.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          // Cache-control headers that stop a CDN from serving one person's session to another.
          for (const [key, value] of Object.entries(headers)) {
            response.headers.set(key, value);
          }
        },
      },
    },
  );

  // Validates the access token and refreshes it if it has expired. Nothing may run
  // between creating the client and this call.
  const { data } = await supabase.auth.getClaims();
  const { pathname, search } = request.nextUrl;

  if (!data?.claims && isPrivatePath(pathname)) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/connexion";
    signInUrl.search = "";
    signInUrl.searchParams.set("suite", `${pathname}${search}`);

    const redirect = NextResponse.redirect(signInUrl);
    for (const cookie of response.cookies.getAll()) {
      redirect.cookies.set(cookie);
    }
    return redirect;
  }

  return response;
}
