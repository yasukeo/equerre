import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
import { OfflineBanner } from "@/components/shell/offline-banner";
import { ClientMessages } from "@/i18n/client-messages";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ClientMessages area="auth">
      {/* Signing in on weak 4G is where a dropped connection is most confusing. */}
      <OfflineBanner />
      <div className="flex min-h-dvh flex-col items-center px-4 py-10 sm:py-16">
        <header className="mb-8">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-md">
            <BrandMark />
          </Link>
        </header>
        <main
          id="contenu"
          className="w-full max-w-md rounded-lg border border-quadrillage bg-surface px-5 py-6 sm:px-8 sm:py-8"
        >
          {children}
        </main>
      </div>
    </ClientMessages>
  );
}
