import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
import { getViewer } from "@/lib/auth";
import { OfflineBanner } from "./offline-banner";
import { SignOutForm } from "./sign-out-form";

type AppShellProps = {
  homeHref: string;
  navLabel: string;
  nav: ReactNode;
  children: ReactNode;
};

/**
 * Shared frame for both workspaces: a rail on desktop, a bottom bar on phones.
 * Everything here prerenders except the viewer's name, which streams in.
 */
export async function AppShell({ homeHref, navLabel, nav, children }: AppShellProps) {
  const t = await getTranslations("common");

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[14rem_1fr]">
      <a
        href="#contenu"
        className="sr-only start-2 top-2 z-50 rounded-md bg-encre px-3 py-2 text-papier focus:not-sr-only focus:fixed"
      >
        {t("skipToContent")}
      </a>

      <nav
        aria-label={navLabel}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-quadrillage bg-papier pb-[env(safe-area-inset-bottom)] md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:gap-6 md:border-e md:border-t-0 md:px-3 md:py-5"
      >
        <Link
          href={homeHref}
          className="hidden min-h-11 items-center rounded-md px-3 md:inline-flex"
        >
          <BrandMark />
        </Link>
        <ul className="flex md:flex-col md:gap-1" role="list">
          {nav}
        </ul>
      </nav>

      <div className="flex min-w-0 flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <OfflineBanner />
        <header className="flex min-h-14 items-center justify-between gap-4 border-b border-quadrillage px-4 md:justify-end md:px-8">
          <Link href={homeHref} className="inline-flex min-h-11 items-center rounded-md md:hidden">
            <BrandMark />
          </Link>
          <Suspense fallback={<span className="h-5 w-28 rounded-sm bg-sunken" />}>
            <ViewerMenu signOutLabel={t("signOut")} />
          </Suspense>
        </header>
        <main id="contenu" className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

async function ViewerMenu({ signOutLabel }: { signOutLabel: string }) {
  const viewer = await getViewer();
  if (!viewer) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-encre-douce sm:inline">{viewer.fullName}</span>
      <SignOutForm label={signOutLabel} />
    </div>
  );
}
