"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * What an action just did, said on the page it came back to (D-088): a check mark and a
 * sentence in ink (DESIGN.md), focused on arrival so a screen reader reads it and the
 * keyboard starts from it, since the form that was used is gone.
 */
export function Flash({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="flex items-start gap-2 rounded-md border border-trait bg-surface px-4 py-3 focus-visible:outline-2"
    >
      <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <div className="grid gap-1">{children}</div>
    </div>
  );
}
