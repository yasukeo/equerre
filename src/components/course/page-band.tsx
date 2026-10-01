import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A page's header band (D-100): the colour of what the page is about, ruled like a squared
 * exercise book. The colour comes from `src/lib/design/colors.ts`, as its `band` classes.
 */
export function PageBand({
  colour,
  width = "max-w-5xl",
  children,
}: {
  colour: string;
  /** The content's width, the same as the page's below it. */
  width?: "max-w-4xl" | "max-w-5xl";
  children: ReactNode;
}) {
  return (
    <header className={cn("relative overflow-hidden", colour)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.09)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.09)_1px,transparent_1px)] bg-[size:22px_22px]"
      />
      <div className={cn("relative mx-auto grid gap-4 px-4 py-8 sm:px-8 sm:py-10", width)}>
        {children}
      </div>
    </header>
  );
}

/** The figures under a band's title, each on a white card, the number in the band's hue. */
export function BandStats({
  stats,
  colour,
}: {
  stats: { value: number | string; label: string }[];
  /** The hue as text. */
  colour: string;
}) {
  return (
    <dl className="flex flex-wrap gap-3 pt-1">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-28 rounded-xl bg-surface px-4 py-2.5 text-encre">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="grid">
            <span className={cn("text-2xl font-semibold tabular-nums", colour)}>{stat.value}</span>
            <span aria-hidden="true" className="text-xs text-encre-douce">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
