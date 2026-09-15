import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SignUpForm } from "./sign-up-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.signUp");
  return { title: t("title") };
}

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");
  const tSignIn = await getTranslations("auth.signIn");

  return (
    <>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-encre-douce">{t("lead")}</p>
      <SignUpForm />
      <p className="mt-8 border-t border-quadrillage pt-6 text-sm text-encre-douce">
        {t("hasAccount")}{" "}
        <Link
          href="/connexion"
          className="text-encre underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {tSignIn("title")}
        </Link>
      </p>
    </>
  );
}
