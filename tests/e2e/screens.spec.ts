import { expect, test, type Page } from "@playwright/test";

// Captures the signed-in screens for design review: `E2E_SCREENSHOTS=1 pnpm test:e2e screens`.
// Images land in test-results/screens/<project>/.

const password = process.env.SEED_PASSWORD ?? "";

test.skip(!process.env.E2E_SCREENSHOTS, "Set E2E_SCREENSHOTS=1 to capture review screenshots.");
test.skip(!password, "SEED_PASSWORD is required.");

async function signIn(page: Page, email: string) {
  await page.goto("/connexion");
  await page.locator("#signin-email").fill(email);
  await page.locator("#signin-password").fill(password);
  await page.getByRole("button", { name: "Se connecter", exact: true }).click();
  await page.waitForURL(/\/(prof|eleve)$/);
}

async function capture(page: Page, name: string, projectName: string) {
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: `test-results/screens/${projectName}/${name}.png`, fullPage: true });
}

for (const scheme of ["light", "dark"] as const) {
  test.describe(`${scheme} theme`, () => {
    test.use({ colorScheme: scheme });

    test(`tutor screens (${scheme})`, async ({ page }, testInfo) => {
      await signIn(page, "prof@equerre.test");
      await expect(page.getByRole("heading", { level: 1, name: "Aujourd’hui" })).toBeVisible();
      await capture(page, `tutor-today-${scheme}`, testInfo.project.name);

      await page.goto("/prof/eleves/inviter");
      await expect(page.getByRole("heading", { level: 1, name: "Inviter un élève" })).toBeVisible();
      await capture(page, `tutor-invite-${scheme}`, testInfo.project.name);

      // Submitting empty shows the field errors.
      await page
        .getByRole("button", { name: "Créer le compte et envoyer le lien", exact: true })
        .click();
      await expect(page.getByText("Indiquez le prénom et le nom de l’élève.")).toBeVisible();
      await capture(page, `tutor-invite-errors-${scheme}`, testInfo.project.name);
    });

    test(`student screens (${scheme})`, async ({ page }, testInfo) => {
      await signIn(page, "salma.alaoui@equerre.test");
      await expect(page.getByRole("heading", { level: 1, name: "Bonjour Salma" })).toBeVisible();
      await capture(page, `student-home-${scheme}`, testInfo.project.name);

      await page.goto("/eleve/profil");
      await expect(page.getByRole("heading", { level: 1, name: "Mon profil" })).toBeVisible();
      await capture(page, `student-profile-${scheme}`, testInfo.project.name);
    });
  });
}
