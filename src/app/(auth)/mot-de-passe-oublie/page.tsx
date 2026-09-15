import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ForgotPasswordForm } from "./forgot-password-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.forgotPassword");
  return { title: t("title") };
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations("auth.forgotPassword");
  const tCommon = await getTranslations("auth.common");

  return (
    <>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-encre-douce">{t("lead")}</p>
      <ForgotPasswordForm />
      <p className="mt-8 border-t border-quadrillage pt-6 text-sm">
        <Link
          href="/connexion"
          className="inline-flex min-h-11 items-center underline decoration-trait underline-offset-4 hover:decoration-encre"
        >
          {tCommon("backToSignIn")}
        </Link>
      </p>
    </>
  );
}
