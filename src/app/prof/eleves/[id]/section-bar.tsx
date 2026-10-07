"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The sections of a student's file, always one tap away (D-104). The one on screen is marked
 * with the highlighter and `aria-current`; on a phone the bar scrolls, and fades at its end.
 */
export function SectionBar({
  label,
  sections,
}: {
  label: string;
  sections: { anchor: string; label: string }[];
}) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.anchor))
      .filter((element): element is HTMLElement => element !== null);
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        // The highest section still in view below the bar.
        const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
        if (top) setCurrent(top[0]);
      },
      { rootMargin: "-80px 0px -45% 0px" },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label={label}
      className="sticky top-0 z-30 -mx-4 border-y border-quadrillage bg-papier/95 backdrop-blur md:-mx-8 print:hidden"
    >
      <div className="relative">
        <ul
          role="list"
          className="flex [scrollbar-width:none] gap-1 overflow-x-auto px-4 py-1.5 md:px-8"
        >
          {sections.map((section) => (
            <li key={section.anchor}>
              <a
                href={`#${section.anchor}`}
                aria-current={current === section.anchor ? "location" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium whitespace-nowrap hover:bg-sunken",
                  current === section.anchor &&
                    "bg-surligneur text-encre-fixe ring-1 ring-encre-fixe/30 hover:bg-surligneur",
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 end-0 w-8 bg-gradient-to-l from-papier to-transparent md:hidden rtl:bg-gradient-to-r"
        />
      </div>
    </nav>
  );
}
