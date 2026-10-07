import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The top of a workspace page (D-104): where it sits, its name, a line on what it is for, and
 * the actions it offers. One shape everywhere, so a page is read the same way in both areas.
 */
export function PageHeader({
  back,
  eyebrow,
  title,
  lead,
  actions,
  children,
  className,
}: {
  /** The page above this one, written as a place: « Tous les devoirs ». */
  back?: { href: string; label: string };
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  /** Below the title: chips, a progress line. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("grid gap-3", className)}>
      {back ? (
        <Link
          href={back.href}
          className="-ms-1 inline-flex min-h-11 items-center gap-1.5 justify-self-start rounded-full ps-1 pe-3 text-sm text-encre-douce hover:text-encre"
        >
          <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="grid min-w-0 gap-1">
          {eyebrow ? (
            <p className="text-sm text-encre-douce first-letter:uppercase">{eyebrow}</p>
          ) : null}
          <h1 className="text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold break-words [font-variation-settings:'HEXP'_45]">
            {title}
          </h1>
          {lead ? <p className="max-w-prose text-encre-douce">{lead}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </header>
  );
}
