// Regenerates src/types/database.ts from the project named by NEXT_PUBLIC_SUPABASE_URL.
//
// It writes through a temporary file on purpose. A `supabase gen types … > file` redirect
// empties the file before the generator runs, so one failure — an unauthenticated CLI, a
// dropped connection — leaves an error message where the schema used to be.
//
// `--project-id` reads the schema through the management API. `--db-url` would need Docker,
// because the CLI introspects an arbitrary database by starting a container for it.

import { execFileSync } from "node:child_process";
import { renameSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
  /^https:\/\/([a-z0-9]+)\.supabase\.co\/?$/,
)?.[1];

if (!projectRef) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL must read https://<project-ref>.supabase.co — check .env.local.",
  );
  process.exit(1);
}

// The published bin is a plain Node script, so it runs without a shell everywhere.
const cli = createRequire(import.meta.url).resolve("supabase/dist/supabase.js");
const target = fileURLToPath(new URL("../src/types/database.ts", import.meta.url));

let generated: string;

try {
  generated = execFileSync(
    process.execPath,
    [cli, "gen", "types", "typescript", "--project-id", projectRef, "--schema", "public"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "inherit"] },
  );
} catch {
  console.error(
    `\nCould not read the schema of ${projectRef}.` +
      "\nThe CLI needs to be signed in: run `pnpm exec supabase login` once," +
      "\nor set SUPABASE_ACCESS_TOKEN from https://supabase.com/dashboard/account/tokens." +
      "\nsrc/types/database.ts was left untouched.",
  );
  process.exit(1);
}

if (!generated.includes("export type Database")) {
  console.error("The generator returned something that is not a schema:");
  console.error(generated.slice(0, 400));
  process.exit(1);
}

const temporary = `${target}.tmp`;
writeFileSync(temporary, generated);
renameSync(temporary, target);

console.log(`Wrote src/types/database.ts (${generated.length} characters).`);
