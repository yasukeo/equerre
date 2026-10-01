import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { SiteNavLink } from "./site-nav-link";

/**
 * The public site's header (D-089, D-097): the brand, the places a visitor looks for, and the
 * way in for students. On a phone the links take a second line rather than a menu to open.
 */
export async function SiteHeader() {
  const t = await getTranslations("site.nav");
  return (
    <header className="sticky top-0 z-30 border-b border-quadrillage bg-surface/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-4 py-2 sm:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-lg">
          <BrandMark />
        </Link>
        <nav
          aria-label={t("label")}
          className="order-last -mx-2 w-full sm:order-none sm:mx-0 sm:me-auto sm:w-auto"
        >
          <ul role="list" className="flex gap-1">
            <li>
              <SiteNavLink href="/cours">{t("courses")}</SiteNavLink>
            </li>
            <li>
              <SiteNavLink href="/examens">{t("exams")}</SiteNavLink>
            </li>
            <li>
              <SiteNavLink href="/conseils">{t("advice")}</SiteNavLink>
            </li>
          </ul>
        </nav>
        <Link href="/connexion" className={buttonVariants({ size: "sm" })}>
          {t("signIn")}
        </Link>
      </div>
    </header>
  );
}
