import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Bell } from "@/components/notifications/bell";
import { getViewer } from "@/lib/auth";
import { countUnreadNotifications } from "@/lib/notifications/queries";
import { OfflineBanner } from "./offline-banner";
import { SignOutForm } from "./sign-out-form";
import { initialsOf } from "@/components/initials";

type AppShellProps = {
  homeHref: string;
  navLabel: string;
  nav: ReactNode;
  /** Her own page, behind her initials in the header: the student's profile (D-104). */
  accountHref?: string;
  accountLabel?: string;
  /** A search box in the header, which streams in (the tutor's, D-104). */
  search?: ReactNode;
  children: ReactNode;
};

/**
 * Shared frame for both workspaces: a rail on desktop, a bottom bar on phones.
 * Everything here prerenders except the viewer's name, which streams in.
 */
export async function AppShell({
  homeHref,
  navLabel,
  nav,
  accountHref,
  accountLabel,
  search,
  children,
}: AppShellProps) {
  const t = await getTranslations("common");

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[15rem_1fr]">
      <a
        href="#contenu"
        className="sr-only start-2 top-2 z-50 rounded-md bg-encre px-3 py-2 text-papier focus:not-sr-only focus:fixed"
      >
        {t("skipToContent")}
      </a>

      <nav
        aria-label={navLabel}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-quadrillage bg-surface pb-[env(safe-area-inset-bottom)] md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:gap-6 md:border-e md:border-t-0 md:px-3 md:py-5 print:hidden"
      >
        <Link
          href={homeHref}
          className="hidden min-h-11 items-center rounded-xl px-3 md:inline-flex"
        >
          <BrandMark />
        </Link>
        <ul className="flex md:flex-col md:gap-1" role="list">
          {nav}
        </ul>
      </nav>

      <div className="flex min-w-0 flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <OfflineBanner />
        <header className="flex min-h-14 items-center justify-between gap-4 border-b border-quadrillage bg-surface px-4 md:justify-end md:px-8 print:hidden">
          <Link href={homeHref} className="inline-flex min-h-11 items-center rounded-md md:hidden">
            <BrandMark />
          </Link>
          {search ? (
            <div className="flex flex-1 justify-end md:justify-start">
              <Suspense fallback={<span className="h-11 w-11 rounded-xl bg-sunken md:w-64" />}>
                {search}
              </Suspense>
            </div>
          ) : null}
          <Suspense fallback={<span className="h-5 w-28 rounded-sm bg-sunken" />}>
            <ViewerMenu
              signOutLabel={t("signOut")}
              accountHref={accountHref}
              accountLabel={accountLabel}
            />
          </Suspense>
        </header>
        <main id="contenu" className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

async function ViewerMenu({
  signOutLabel,
  accountHref,
  accountLabel,
}: {
  signOutLabel: string;
  accountHref?: string;
  accountLabel?: string;
}) {
  const viewer = await getViewer();
  if (!viewer) {
    return null;
  }

  // Parents have no notification centre (D-091): no bell for them.
  const href =
    viewer.role === "tutor"
      ? "/prof/notifications"
      : viewer.role === "student"
        ? "/eleve/notifications"
        : null;
  const unread = href ? await countUnreadNotifications() : 0;

  return (
    <div className="flex min-w-0 items-center gap-1 sm:gap-2">
      {accountHref ? null : (
        <span className="hidden truncate text-sm text-encre-douce sm:inline">
          {viewer.fullName}
        </span>
      )}
      {href ? <Bell href={href} profileId={viewer.id} initial={unread} /> : null}
      {accountHref ? (
        <Link
          href={accountHref}
          className="flex min-h-11 items-center gap-2 rounded-full ps-1 pe-1 hover:bg-sunken sm:pe-3"
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-encre text-sm font-semibold text-papier"
          >
            {initialsOf(viewer.fullName)}
          </span>
          <span className="hidden max-w-40 truncate text-sm sm:inline">{viewer.fullName}</span>
          <span className="sr-only sm:hidden">{accountLabel}</span>
        </Link>
      ) : null}
      <SignOutForm label={signOutLabel} />
    </div>
  );
}
