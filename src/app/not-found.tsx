import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("errors.notFound");

  return (
    <div className="flex min-h-dvh flex-col items-center px-4 py-10 sm:py-16">
      <header className="mb-8">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-md">
          <BrandMark />
        </Link>
      </header>
      <main id="contenu" className="grid w-full max-w-md gap-4">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p className="text-encre-douce">{t("lead")}</p>
        <Link href="/" className={cn(buttonVariants(), "justify-self-start")}>
          {t("home")}
        </Link>
      </main>
    </div>
  );
}
