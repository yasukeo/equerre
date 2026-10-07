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
 */
export function MessagesPanes({
  title,
  list,
  children,
  className,
}: {
  title: string;
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
      {/* The page first: its heading, or the conversation, is what is read first. */}
      <div className="min-w-0">{children}</div>
      <div className="grid gap-4 group-has-[[data-thread]]/panes:hidden lg:sticky lg:top-20 lg:order-first lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:pe-1 lg:group-has-[[data-thread]]/panes:grid">
        <h2 className="sr-only text-xl font-semibold lg:not-sr-only">{title}</h2>
        {list}
      </div>
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
      className={cn(className, current && "bg-lavis-bleu hover:bg-lavis-bleu")}
    >
      {children}
    </Link>
  );
}
