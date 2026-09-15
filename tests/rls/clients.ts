import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export type Client = SupabaseClient<Database>;

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for RLS tests (see vitest.rls.config.mts).`);
  }
  return value;
}

export const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
export const publishableKey = requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
export const seedPassword = requireEnv("SEED_PASSWORD");

/** The deterministic ids `supabase/seed.sql` gives its rows. */
export const seedId = (prefix: string, n: number) =>
  `${prefix}-0000-4000-8000-${String(n).padStart(12, "0")}`;

const noSession = { auth: { persistSession: false, autoRefreshToken: false } } as const;

/** A client holding only the publishable key, like a browser before sign-in. */
export function anonymousClient(): Client {
  return createClient<Database>(supabaseUrl, publishableKey, noSession);
}

export async function signedInAs(email: string): Promise<Client> {
  const client = anonymousClient();
  const { error } = await client.auth.signInWithPassword({ email, password: seedPassword });
  if (error) {
    throw new Error(`Could not sign in as ${email}: ${error.message}. Has the seed been loaded?`);
  }
  return client;
}

/** A secret-key client, or null when SUPABASE_SECRET_KEY isn't configured. */
export function adminClient(): Client | null {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  return secretKey ? createClient<Database>(supabaseUrl, secretKey, noSession) : null;
}
