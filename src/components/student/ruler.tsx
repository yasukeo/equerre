import { cn } from "@/lib/utils";

export type RulerMark = "understood" | "opened" | "new";

/**
 * A chapter's progress as a graduated ruler (D-104): one graduation per document, long and in
 * ink once understood, mid-length in blue pen once opened, short and faint before. It reads
 * like the ruler in her pencil case, and says the same thing in words beside it.
 */
export function Ruler({
  marks,
  label,
  className,
}: {
  marks: RulerMark[];
  label?: string;
  className?: string;
}) {
  const count = Math.max(marks.length, 1);
  return (
    <div className={cn("grid gap-1.5", className)}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${count * 10} 14`}
        preserveAspectRatio="none"
        className="h-3.5 w-full overflow-visible"
      >
        <line x1="0" y1="13.5" x2={count * 10} y2="13.5" className="stroke-trait" strokeWidth="1" />
        {marks.map((mark, index) => {
          const x = index * 10 + 5;
          const top = mark === "understood" ? 1 : mark === "opened" ? 5 : 9;
          return (
            <line
              key={index}
              x1={x}
              x2={x}
              y1={top}
              y2="13.5"
              strokeWidth={mark === "new" ? 2 : 3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className={
                mark === "understood"
                  ? "stroke-encre"
                  : mark === "opened"
                    ? "stroke-stylo-bleu"
                    : "stroke-trait/50"
              }
            />
          );
        })}
      </svg>
      {label ? <span className="text-xs text-encre-douce tabular">{label}</span> : null}
    </div>
  );
}

/** How far into one document she read, as a ruler filled to her place. */
export function ReadingRuler({
  position,
  onInk = false,
  className,
}: {
  position: number;
  /** On the dark « Reprendre » card: chalk on ink, in both themes. */
  onInk?: boolean;
  className?: string;
}) {
  const percent = Math.round(Math.min(Math.max(position, 0), 1) * 100);
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block h-2 overflow-hidden rounded-full",
        onInk
          ? "bg-white/25"
          : "bg-sunken [background-image:repeating-linear-gradient(90deg,var(--quadrillage)_0_1px,transparent_1px_10%)]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-y-0 start-0 rounded-full",
          onInk ? "bg-white" : "bg-stylo-bleu",
        )}
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}
