import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button-variants";

const LINK =
  "inline-flex min-h-11 items-center text-sm underline decoration-transparent underline-offset-4 hover:decoration-encre";

/**
 * The public site's header (D-089, D-097): the brand, the places a visitor looks for, and the
 * way in for students. On a phone the links take a second line rather than a menu to open.
 */
export async function SiteHeader() {
  const t = await getTranslations("site.nav");
  return (
    <header className="border-b border-quadrillage bg-papier print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 px-4 py-2 sm:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-sm">
          <BrandMark />
        </Link>
        <nav
          aria-label={t("label")}
          className="order-last w-full sm:order-none sm:me-auto sm:w-auto"
        >
          <ul role="list" className="flex flex-wrap gap-x-5">
            <li>
              <Link href="/cours" className={LINK}>
                {t("courses")}
              </Link>
            </li>
            <li>
              <Link href="/examens" className={LINK}>
                {t("exams")}
              </Link>
            </li>
            <li>
              <Link href="/conseils" className={LINK}>
                {t("advice")}
              </Link>
            </li>
            <li>
              <Link href="/#tarifs" className={LINK}>
                {t("prices")}
              </Link>
            </li>
          </ul>
        </nav>
        <Link href="/connexion" className={buttonVariants({ variant: "outline", size: "sm" })}>
          {t("signIn")}
        </Link>
      </div>
    </header>
  );
}
