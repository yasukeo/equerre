import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SignInForms } from "./sign-in-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.signIn");
  return { title: t("title") };
}

// Fully prerendered: the forms read `?suite` and `?erreur` on the client.
export default async function SignInPage() {
  const t = await getTranslations("auth.signIn");

  return (
    <>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-encre-douce">{t("lead")}</p>

      <SignInForms />

      <p className="mt-8 border-t border-quadrillage pt-6 text-sm text-encre-douce">
        {t("noAccount")}{" "}
        <Link
          href="/inscription"
          className="text-encre underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {t("signUpLink")}
        </Link>
      </p>
    </>
  );
}
