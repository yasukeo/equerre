import Link from "next/link";
import { formatLocal } from "@/lib/dates";
import type { GradePoint } from "@/lib/student/progress";
import { cn } from "@/lib/utils";

const format = new Intl.NumberFormat("fr", { maximumFractionDigits: 2 });

/**
 * Her grades over time, one line in the grades' violet (D-100), out of 20. The marks are
 * drawn in a stretched SVG with strokes that do not stretch; the dots and labels are HTML, so
 * they keep their size on a phone. Each dot opens the corrected exercise and says its grade
 * on hover and focus; the list under the chart says the same in words.
 */
export function GradeChart({
  points,
  average,
  averageLabel,
  pointLabel,
}: {
  points: GradePoint[];
  /** The mean the label names, over every grade: the line is drawn at it. */
  average: number;
  averageLabel: string;
  /** « {title} : {grade}/20, {date} » for a dot's tooltip and its accessible name. */
  pointLabel: (point: GradePoint, grade: string, date: string) => string;
}) {
  const shown = points.slice(-24);
  const count = shown.length;
  const x = (index: number) => (count === 1 ? 50 : 4 + (index / (count - 1)) * 92);
  const y = (grade: number) => 100 - (grade / 20) * 100;

  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2 overflow-x-clip">
      {/* The scale: 0, 10 and 20, the marks a 20-point grade is read against. */}
      <div aria-hidden="true" className="relative h-48 text-xs text-encre-douce tabular">
        {[20, 10, 0].map((value) => (
          <span
            key={value}
            className="absolute end-0 -translate-y-1/2"
            style={{ top: `${y(value)}%` }}
          >
            {value}
          </span>
        ))}
      </div>
      <div className="relative h-48">
        {[20, 15, 10, 5, 0].map((value) => (
          <span
            key={value}
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 border-t",
              value % 10 === 0 ? "border-quadrillage" : "border-dashed border-quadrillage/60",
            )}
            style={{ top: `${y(value)}%` }}
          />
        ))}
        {/* The average, dashed, named at its end. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 border-t-2 border-dashed border-violet/60"
          style={{ top: `${y(average)}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute end-0 -translate-y-full pb-0.5 text-xs font-medium text-violet-texte tabular"
          style={{ top: `${y(average)}%` }}
        >
          {averageLabel}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
        >
          {count > 1 ? (
            <polyline
              points={shown.map((point, index) => `${x(index)},${y(point.grade)}`).join(" ")}
              fill="none"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="stroke-violet"
            />
          ) : null}
        </svg>
        <ul role="list" className="absolute inset-0">
          {shown.map((point, index) => {
            const grade = format.format(point.grade);
            const label = pointLabel(point, grade, formatLocal(point.correctedAt, "d MMMM"));
            const last = index === count - 1;
            // On a phone, the last ten dots only: more would overlap under a thumb.
            const phoneHidden = index < count - 10;
            return (
              <li
                key={`${point.assignmentId}/${point.exerciseId}`}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
                  phoneHidden && "hidden sm:block",
                )}
                style={{ insetInlineStart: `${x(index)}%`, top: `${y(point.grade)}%` }}
              >
                <Link
                  href={`/eleve/devoirs/${point.assignmentId}/${point.exerciseId}`}
                  aria-label={label}
                  className="group relative flex size-11 items-center justify-center"
                >
                  <span className="size-3 rounded-full border-2 border-surface bg-violet ring-1 ring-violet group-hover:size-4 group-focus-visible:size-4" />
                  {last ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-full mb-0 text-sm font-semibold text-encre tabular group-hover:invisible"
                    >
                      {grade}
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none invisible absolute bottom-full z-10 mb-1 w-max max-w-48 rounded-md bg-encre px-2.5 py-1.5 text-xs text-papier shadow-md group-hover:visible group-focus-visible:visible",
                      // Kept inside the chart: opening towards its middle.
                      x(index) < 50 ? "start-0" : "end-0",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
