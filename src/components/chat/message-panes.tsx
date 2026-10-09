"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The inbox beside the open conversation on a wide screen, one after the other on a phone:
 * there, the list is the page until a conversation is opened, and the conversation then has
 * the whole screen. An open conversation marks itself with `data-thread`; the panes read it
 * in CSS, so nothing waits for the address to be known on the client.
 *
 * The list comes first, for the eye and the keyboard alike, under the page's one heading;
 * a conversation is a section of it (its name is an h2).
 */
export function MessagesPanes({
  title,
  listLabel,
  list,
  children,
  className,
}: {
  title: string;
  /** The list's landmark: « Conversations ». */
  listLabel: string;
  list: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/panes grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start xl:grid-cols-[22rem_minmax(0,1fr)]",
        className,
      )}
    >
      <div className="grid content-start gap-4 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:pe-1">
        {/* On a phone with a conversation open, the heading stays for assistive technology. */}
        <h1 className="text-[clamp(1.6rem,1.3rem+1.4vw,2.1rem)] leading-tight font-semibold [font-variation-settings:'HEXP'_45] max-lg:group-has-[[data-thread]]/panes:sr-only lg:text-xl lg:[font-variation-settings:normal]">
          {title}
        </h1>
        <nav
          aria-label={listLabel}
          className="grid gap-4 max-lg:group-has-[[data-thread]]/panes:hidden"
        >
          {list}
        </nav>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** A conversation in the list, marked as the one on screen when it is. */
export function InboxLink({
  href,
  conversationId,
  className,
  children,
}: {
  href: string;
  conversationId: string;
  className?: string;
  children: ReactNode;
}) {
  // The list streams in its own Suspense boundary, so the segment can be read here.
  const current = useSelectedLayoutSegment() === conversationId;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        className,
        "border-s-4",
        current ? "border-s-stylo-bleu bg-lavis-bleu hover:bg-lavis-bleu" : "border-s-transparent",
      )}
    >
      {children}
    </Link>
  );
}
