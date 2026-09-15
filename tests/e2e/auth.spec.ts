import { expect, test, type Page } from "@playwright/test";

const password = process.env.SEED_PASSWORD ?? "";

async function signIn(page: Page, email: string) {
  await page.goto("/connexion");
  await page.locator("#signin-email").fill(email);
  await page.locator("#signin-password").fill(password);
  await page.getByRole("button", { name: "Se connecter", exact: true }).click();
}

test("a signed-out visitor hitting a private route is sent to sign in", async ({ page }) => {
  await page.goto("/eleve");
  await expect(page).toHaveURL(/\/connexion\?suite=%2Feleve$/);
  await expect(page.getByRole("heading", { level: 1, name: "Se connecter" })).toBeVisible();
});

test.describe("with seed accounts", () => {
  test.skip(!password, "SEED_PASSWORD is required (see .env.example).");

  test("a student signs in and lands on their dashboard", async ({ page }) => {
    await signIn(page, "salma.alaoui@equerre.test");
    await expect(page).toHaveURL(/\/eleve$/);
    await expect(page.getByRole("heading", { level: 1, name: "Bonjour Salma" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Prochaine séance" })).toBeVisible();
  });

  test("a student who opens the tutor workspace is sent back to their own", async ({ page }) => {
    await signIn(page, "salma.alaoui@equerre.test");
    await expect(page).toHaveURL(/\/eleve$/);
    await page.goto("/prof");
    await expect(page).toHaveURL(/\/eleve$/);
  });

  test("after sign-in, people return to the page they asked for", async ({ page }) => {
    await page.goto("/prof/eleves/inviter");
    await expect(page).toHaveURL(/suite=%2Fprof%2Feleves%2Finviter/);
    await page.locator("#signin-email").fill("prof@equerre.test");
    await page.locator("#signin-password").fill(password);
    await page.getByRole("button", { name: "Se connecter", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Inviter un élève" })).toBeVisible();
  });

  test("a wrong password says what went wrong and keeps the email", async ({ page }) => {
    await page.goto("/connexion");
    await page.locator("#signin-email").fill("salma.alaoui@equerre.test");
    await page.locator("#signin-password").fill("pas-le-bon-mot-de-passe");
    await page.getByRole("button", { name: "Se connecter", exact: true }).click();
    await expect(page.getByText("Adresse e-mail ou mot de passe incorrect.")).toBeVisible();
    await expect(page.locator("#signin-email")).toHaveValue("salma.alaoui@equerre.test");
  });
});
