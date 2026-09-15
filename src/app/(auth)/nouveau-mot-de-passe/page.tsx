import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewPasswordForm } from "./new-password-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.newPassword");
  return { title: t("title") };
}

// proxy.ts sends signed-out visitors to /connexion; the action re-checks the session.
export default async function NewPasswordPage() {
  const t = await getTranslations("auth.newPassword");

  return (
    <>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-encre-douce">{t("lead")}</p>
      <NewPasswordForm />
    </>
  );
}
