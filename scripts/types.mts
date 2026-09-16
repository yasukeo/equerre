// Regenerates src/types/database.ts from the database named by SUPABASE_DB_URL.
//
// It writes through a temporary file on purpose. The earlier `supabase gen types … > file`
// script emptied the checked-in types before the generator even ran, so one failure — a CLI
// that was never linked, a dropped connection — left an error message where the schema was.

import { execFileSync } from "node:child_process";
import { renameSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const databaseUrl = process.env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.error(
    "SUPABASE_DB_URL is missing from .env.local. Copy the session pooler connection string from Supabase > Settings > Database.",
  );
  process.exit(1);
}

// Reading from the connection string rather than `--linked` means type generation
// needs no `supabase login` and no linked project ref on the machine that runs it.
// The published bin is a plain Node script, so it runs without a shell everywhere.
const cli = createRequire(import.meta.url).resolve("supabase/dist/supabase.js");
const target = fileURLToPath(new URL("../src/types/database.ts", import.meta.url));

const generated = execFileSync(
  process.execPath,
  [cli, "gen", "types", "typescript", "--db-url", databaseUrl, "--schema", "public"],
  { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (!generated.includes("export type Database")) {
  console.error("The generator returned something that is not a schema:");
  console.error(generated.slice(0, 400));
  process.exit(1);
}

const temporary = `${target}.tmp`;
writeFileSync(temporary, generated);
renameSync(temporary, target);

console.log(`Wrote src/types/database.ts (${generated.length} characters).`);
