"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type Props = { href: string; children: ReactNode };

const PILL =
  "inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] text-encre hover:bg-sunken aria-[current=page]:bg-bleu-fond aria-[current=page]:font-semibold aria-[current=page]:text-bleu-texte aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]";

/**
 * A place in the public site's header, in a blue pill, underlined, when the page is in it. The pathname is
 * only known at request time on some routes: the plain link stands in until it is (NavLink).
 */
export function SiteNavLink(props: Props) {
  return (
    <Suspense
      fallback={
        <Link href={props.href} className={PILL}>
          {props.children}
        </Link>
      }
    >
      <CurrentSiteNavLink {...props} />
    </Suspense>
  );
}

function CurrentSiteNavLink({ href, children }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={PILL}>
      {children}
    </Link>
  );
}
