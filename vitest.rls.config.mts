import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Row-level security tests run against a real Supabase project, signed in as seed accounts.
// They need NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and SEED_PASSWORD.
try {
  process.loadEnvFile(".env.local");
} catch {
  // CI provides the variables directly.
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
