import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
// Loaded here rather than globally: only the lesson routes set any maths.
import "katex/dist/katex.min.css";
import "./lecon.css";

export default function CoursLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-quadrillage px-4 py-4 sm:px-8">
        <Link href="/" className="inline-flex rounded-sm focus-visible:outline-2">
          <BrandMark />
        </Link>
      </header>
      {children}
    </div>
  );
}
