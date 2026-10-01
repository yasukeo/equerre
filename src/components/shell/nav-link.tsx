"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  /** Match only this exact path, not its children (for section homes). */
  exact?: boolean;
  /** Other places it stands for, as « Plus » does on a phone for pages the bar cannot hold. */
  also?: string[];
};

/**
 * A navigation link that marks itself when it leads to the current page.
 *
 * Under Cache Components, usePathname() suspends while prerendering a route whose dynamic
 * param is only known at request time (/prof/lecons/[id]), and a layout that calls it outside
 * a boundary fails the build. The fallback is the same link, unmarked, so the navigation is
 * in the static shell of every page and the mark follows as soon as the path is known.
 */
export function NavLink(props: NavLinkProps) {
  return (
    <Suspense fallback={<NavLinkView {...props} active={false} />}>
      <CurrentNavLink {...props} />
    </Suspense>
  );
}

function CurrentNavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const under = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const active = props.exact
    ? pathname === props.href
    : under(props.href) || (props.also ?? []).some(under);
  return <NavLinkView {...props} active={active} />;
}

function NavLinkView({
  href,
  icon,
  children,
  active,
}: Omit<NavLinkProps, "also"> & { active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        // Mobile: a column in the bottom bar. Desktop: a row in the rail.
        "group relative flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-0.5 text-xs text-encre-douce md:min-h-11 md:flex-none md:flex-row md:justify-start md:gap-3 md:rounded-xl md:px-3 md:text-sm",
        "hover:text-encre md:hover:bg-sunken",
        // Current page: in blue, the icon in a pill on a phone, the whole row on a desktop.
        "aria-[current=page]:font-semibold aria-[current=page]:text-bleu-texte",
        "md:aria-[current=page]:bg-bleu-fond md:aria-[current=page]:hover:bg-bleu-fond",
        // Not colour alone: a bar on top of the item on a phone, at its start on a desktop.
        "before:absolute before:inset-x-4 before:top-0 before:h-1 before:rounded-b-full aria-[current=page]:before:bg-bleu",
        "md:before:inset-x-auto md:before:inset-y-2 md:before:start-0 md:before:h-auto md:before:w-1 md:before:rounded-e-full md:before:rounded-b-none",
      )}
    >
      <span className="flex h-7 w-12 items-center justify-center rounded-full group-aria-[current=page]:bg-bleu-fond md:h-auto md:w-auto md:bg-transparent md:group-aria-[current=page]:bg-transparent [&_svg]:size-5 group-aria-[current=page]:[&_svg]:text-bleu">
        {icon}
      </span>
      <span className="max-w-full truncate">{children}</span>
    </Link>
  );
}
