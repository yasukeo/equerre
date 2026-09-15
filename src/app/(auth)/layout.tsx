import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center px-4 py-10 sm:py-16">
      <Link href="/" className="mb-8 rounded-md">
        <BrandMark />
      </Link>
      <main
        id="contenu"
        className="w-full max-w-md rounded-lg border border-quadrillage bg-surface px-5 py-6 sm:px-8 sm:py-8"
      >
        {children}
      </main>
    </div>
  );
}
