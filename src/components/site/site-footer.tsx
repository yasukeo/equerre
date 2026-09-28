import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

/** Whose site it is, and the same few ways around it. */
export async function SiteFooter() {
  const t = await getTranslations("site.footer");
  const link =
    "inline-flex min-h-11 items-center text-sm underline decoration-quadrillage underline-offset-4 hover:decoration-encre";
  return (
    <footer className="border-t border-quadrillage">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-6 sm:px-8">
        <p className="text-sm text-encre-douce">
          {t("about", { brand: siteConfig.brand, tutor: siteConfig.tutorName })}
        </p>
        <ul role="list" className="flex flex-wrap gap-x-6">
          <li>
            <Link href="/cours" className={link}>
              {t("courses")}
            </Link>
          </li>
          <li>
            <Link href="/conseils" className={link}>
              {t("advice")}
            </Link>
          </li>
          <li>
            <Link href="/connexion" className={link}>
              {t("student")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
