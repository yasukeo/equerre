// The owner's scripts reach the database straight through SUPABASE_DB_URL, as the database
// owner: RLS does not apply. The connection is always encrypted, and verified against
// Supabase's certificate authority when SUPABASE_DB_CA names its file (Supabase > Settings >
// Database > SSL Configuration). Without it the link is still encrypted, but a machine in the
// middle could pose as the server: the script says so.

import { readFileSync } from "node:fs";
import postgres from "postgres";

export function connect(databaseUrl: string) {
  const host = new URL(databaseUrl).hostname;
  const local = host === "localhost" || host === "127.0.0.1" || host === "::1";
  const ca = process.env.SUPABASE_DB_CA;
  if (!local && !ca) {
    console.warn(
      "SUPABASE_DB_CA is not set: the connection is encrypted but the server's certificate is not checked.",
    );
  }
  return postgres(databaseUrl, {
    max: 1,
    prepare: false,
    onnotice: () => {},
    ssl: local
      ? false
      : ca
        ? { ca: readFileSync(ca, "utf8"), rejectUnauthorized: true }
        : "require",
  });
}
