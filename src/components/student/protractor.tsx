import type { ChapterState } from "@/lib/student/progress";
import { cn } from "@/lib/utils";

/**
 * The whole programme as a protractor (D-104): one sector of the half-circle per chapter, in
 * ink once understood, in blue pen once started, faint before. The graduations are a real
 * protractor's, every ten degrees. Her place in the year at a glance; the figure in the middle
 * and the label say it in words.
 */
export function Protractor({
  states,
  value,
  caption,
  label,
  className,
}: {
  states: ChapterState[];
  /** The figure in the middle: « 4/12 ». */
  value: string;
  caption: string;
  /** What a screen reader hears. */
  label: string;
  className?: string;
}) {
  const cx = 120;
  const cy = 116;
  const outer = 104;
  const inner = 78;
  const count = Math.max(states.length, 1);
  const gap = count > 1 ? Math.min(2.4, 60 / count) : 0;
  const point = (radius: number, degrees: number) => {
    const radians = (Math.PI * degrees) / 180;
    return [cx - radius * Math.cos(radians), cy - radius * Math.sin(radians)] as const;
  };
  const sector = (from: number, to: number) => {
    const [x1, y1] = point(outer, from);
    const [x2, y2] = point(outer, to);
    const [x3, y3] = point(inner, to);
    const [x4, y4] = point(inner, from);
    return `M${x1} ${y1} A${outer} ${outer} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${inner} ${inner} 0 0 0 ${x4} ${y4} Z`;
  };

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 240 132"
      className={cn("w-full max-w-72 overflow-visible", className)}
    >
      {/* The graduations, every ten degrees, longer every thirty. */}
      {Array.from({ length: 19 }, (_, index) => {
        const degrees = index * 10;
        const long = degrees % 30 === 0;
        const [x1, y1] = point(outer + 4, degrees);
        const [x2, y2] = point(outer + (long ? 12 : 8), degrees);
        return (
          <line
            key={degrees}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth="1"
            className="stroke-trait"
          />
        );
      })}
      {states.map((state, index) => {
        const from = (index * 180) / count + gap / 2;
        const to = ((index + 1) * 180) / count - gap / 2;
        return (
          <path
            key={index}
            d={sector(from, to)}
            className={
              state === "compris"
                ? "fill-encre"
                : state === "en_cours"
                  ? "fill-stylo-bleu"
                  : "fill-quadrillage"
            }
          />
        );
      })}
      {/* The base line and the centre mark of a real protractor. */}
      <line x1={cx - outer - 12} y1={cy} x2={cx + outer + 12} y2={cy} strokeWidth="1.5" className="stroke-encre" />
      <line x1={cx} y1={cy - 6} x2={cx} y2={cy} strokeWidth="1.5" className="stroke-encre" />
      <text
        x={cx}
        y={cy - 26}
        textAnchor="middle"
        className="fill-encre text-[30px] font-semibold tabular [font-variation-settings:'HEXP'_45]"
      >
        {value}
      </text>
      <text x={cx} y={cy - 9} textAnchor="middle" className="fill-encre-douce text-[11px]">
        {caption}
      </text>
    </svg>
  );
}
