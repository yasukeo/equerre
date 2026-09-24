import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { confirmEmailLink } from "../../actions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.confirmLink");
  return { title: t("title") };
}

// Where /auth/confirm sends a token_hash link. Nothing here verifies anything: only the
// button does, by posting the token back, so a mail scanner that opens the link cannot
// spend it before the person does (DECISIONS.md, D-062).
export default async function ConfirmLinkPage({ searchParams }: PageProps<"/connexion/confirmer">) {
  const t = await getTranslations("auth.confirmLink");

  return (
    <>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-1 text-encre-douce">{t("lead")}</p>
      <Suspense fallback={<div className="mt-6 h-11 rounded-md bg-sunken" aria-hidden="true" />}>
        <ConfirmForm searchParams={searchParams} label={t("submit")} />
      </Suspense>
    </>
  );
}

async function ConfirmForm({
  searchParams,
  label,
}: {
  searchParams: PageProps<"/connexion/confirmer">["searchParams"];
  label: string;
}) {
  const params = await searchParams;
  const field = (name: string) => {
    const value = params[name];
    return typeof value === "string" ? value : "";
  };

  return (
    <form action={confirmEmailLink} className="mt-6">
      <input type="hidden" name="token_hash" value={field("token_hash")} />
      <input type="hidden" name="type" value={field("type")} />
      <input type="hidden" name="suite" value={field("suite")} />
      <Button type="submit" size="lg" className="w-full">
        {label}
      </Button>
    </form>
  );
}
