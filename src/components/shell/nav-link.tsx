"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  /** Match only this exact path, not its children (for section homes). */
  exact?: boolean;
};

export function NavLink({ href, icon, children, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        // Mobile: a column in the bottom bar. Desktop: a row in the rail.
        "relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 px-2 text-xs text-encre-douce md:min-h-11 md:flex-none md:flex-row md:justify-start md:gap-3 md:rounded-md md:px-3 md:text-sm",
        "hover:text-encre md:hover:bg-sunken",
        // Current page: ink text and a highlighter bar (top edge on mobile, start edge on desktop).
        "aria-[current=page]:font-semibold aria-[current=page]:text-encre",
        "before:absolute before:inset-x-4 before:top-0 before:h-[3px] before:rounded-full before:bg-surligneur before:opacity-0 aria-[current=page]:before:opacity-100",
        "md:before:inset-x-auto md:before:inset-y-2 md:before:start-0 md:before:h-auto md:before:w-[3px]",
      )}
    >
      <span className="[&_svg]:size-5">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}
