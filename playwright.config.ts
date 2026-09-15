import { defineConfig, devices } from "@playwright/test";

try {
  process.loadEnvFile(".env.local");
} catch {
  // CI provides the variables directly.
}

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
// Locally you can reuse an installed browser instead of downloading Playwright's build:
// PLAYWRIGHT_CHANNEL=msedge (or chrome). CI uses the bundled Chromium.
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined;

export default defineConfig({
  testDir: "tests/e2e",
  // Tests share the seed accounts on one Supabase project.
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    locale: "fr-FR",
    timezoneId: "Africa/Casablanca",
    trace: "on-first-retry",
  },
  projects: [
    // Students: a mid-range Android phone. The tutor: a laptop.
    { name: "android", use: { ...devices["Pixel 7"], channel } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "pnpm build && pnpm start",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 240_000,
      },
});
