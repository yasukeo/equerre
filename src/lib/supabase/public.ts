import "server-only";
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";
import type { Database } from "@/types/database";

let shared: SupabaseClient<Database> | undefined;

/**
 * A client that carries no session at all, for reads inside a `"use cache"` function.
 *
 * `createClient()` in ./server.ts awaits `cookies()`, and a cached function may never
 * touch one: it throws `next-request-in-use-cache`, and the restriction follows the call
 * stack into every helper. On a dynamically rendered route that failure passes
 * `next build` and only appears once the app is served.
 *
 * Holding no session, this one is safe to share between requests. It also acts as `anon`,
 * so "lessons: select by visibility" narrows it to published public lessons — a cache
 * filled through it cannot hold a lesson meant for enrolled students, whatever the
 * calling code asks for.
 */
export function publicClient(): SupabaseClient<Database> {
  shared ??= createSupabaseClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return shared;
}
