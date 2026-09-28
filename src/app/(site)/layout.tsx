import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/** The public site (D-089): wide, calm, on the squared paper of DESIGN.md. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("common");
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenu"
        className="sr-only start-2 top-2 z-50 rounded-md bg-encre px-3 py-2 text-papier focus:not-sr-only focus:fixed"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
