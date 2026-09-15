import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The full public site arrives in phase 4. Until then this page is the front door.
export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="px-4 py-4 sm:px-8">
        <BrandMark />
      </header>

      <main id="contenu" className="relative flex flex-1 items-center overflow-hidden px-4 sm:px-8">
        {/* Squared paper, fading out: the page sits on the grid (DESIGN.md). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--quadrillage)_1px,transparent_1px),linear-gradient(90deg,var(--quadrillage)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black_30%,transparent_90%)] bg-size-[20px_20px]"
        />
        <div className="relative mx-auto w-full max-w-3xl py-16">
          <h1 className="text-[clamp(2.25rem,1.6rem+3vw,3.75rem)] leading-[1.05] font-semibold text-balance [font-variation-settings:'HEXP'_70] sm:[font-variation-settings:'HEXP'_100]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-encre-douce">{t("lead")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/connexion" className={buttonVariants({ size: "lg" })}>
              {t("signIn")}
            </Link>
            <Link
              href="/inscription"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t("signUp")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
