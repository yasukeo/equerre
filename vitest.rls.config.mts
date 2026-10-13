import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Row-level security tests run against a real Supabase project, signed in as seed accounts.
// They need NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and SEED_PASSWORD.
// Variables already set win over the file, so a run can be pointed at a local stack.
try {
  process.loadEnvFile(".env.local");
} catch {
  // CI provides the variables directly.
}

// The tests create and remove rows and files under seed accounts: never on the project real
// students use. A local stack (`supabase start`) runs as it is; a development project in the
// cloud must be named in RLS_REMOTE_HOST, so .env.local pointing at production stops here.
const target = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (target) {
  const host = new URL(target).hostname;
  const local = host === "localhost" || host === "127.0.0.1" || host === "::1";
  if (!local && process.env.RLS_REMOTE_HOST !== host) {
    throw new Error(
      `RLS tests refuse to run against ${host}: start a local stack (supabase start) and point NEXT_PUBLIC_SUPABASE_URL at it. A development project in the cloud, never the one students use, is allowed by naming its host in RLS_REMOTE_HOST.`,
    );
  }
}

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(new URL("./tests/unit/server-only-stub.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/rls/**/*.test.ts"],
    globalSetup: ["tests/rls/global-setup.ts"],
    testTimeout: 20_000,
    // One project, shared seed data: run files one after another.
    fileParallelism: false,
  },
});
