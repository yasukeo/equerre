import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { SignInForms } from "./sign-in-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.signIn");
  return { title: t("title") };
}

export default async function SignInPage({ searchParams }: PageProps<"/connexion">) {
  const t = await getTranslations("auth.signIn");

  return (
    <>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-encre-douce">{t("lead")}</p>

      {/* The forms prerender; the redirect target from the URL arrives with the request. */}
      <Suspense fallback={<SignInForms next="" linkExpired={false} />}>
        <SignInFormsForRequest searchParams={searchParams} />
      </Suspense>

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

async function SignInFormsForRequest({
  searchParams,
}: Pick<PageProps<"/connexion">, "searchParams">) {
  const params = await searchParams;
  const next = typeof params.suite === "string" ? safeRedirectPath(params.suite, "") : "";
  return <SignInForms next={next} linkExpired={params.erreur === "lien"} />;
}
