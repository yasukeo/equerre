// Loads supabase/seed.sql into the database named by SUPABASE_DB_URL.
// Development machines only: it creates accounts whose password is SEED_PASSWORD.

import { readFile } from "node:fs/promises";
import postgres from "postgres";

const databaseUrl = process.env.SUPABASE_DB_URL;
const seedPassword = process.env.SEED_PASSWORD;

if (!databaseUrl) {
  console.error(
    "SUPABASE_DB_URL is missing from .env.local. Copy the session pooler connection string from Supabase > Settings > Database.",
  );
  process.exit(1);
}

if (!seedPassword || !/^[A-Za-z0-9-]{12,}$/.test(seedPassword)) {
  console.error(
    "SEED_PASSWORD must be at least 12 characters, using only letters, digits and dashes.",
  );
  process.exit(1);
}

const template = await readFile(new URL("../supabase/seed.sql", import.meta.url), "utf8");
const sql = postgres(databaseUrl, { max: 1, prepare: false, onnotice: () => {} });

try {
  const results = await sql.unsafe(template.replaceAll("{{SEED_PASSWORD}}", seedPassword)).simple();
  const summary = Array.isArray(results) ? results.at(-1) : undefined;
  console.log("Seed loaded.", summary ?? "");
} finally {
  await sql.end();
}
