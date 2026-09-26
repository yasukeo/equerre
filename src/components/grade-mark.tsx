import { Kalam } from "next/font/google";
import { cn } from "@/lib/utils";

// La note au stylo rouge (DESIGN.md, signature): the grade the tutor wrote, in a felt-tip
// hand, in red. On the corrected copy a circle is traced around it once. Kalam is declared
// here, so only the pages that show a grade load it.
const kalam = Kalam({ weight: "700", subsets: ["latin"], display: "swap" });

export function GradeMark({
  grade,
  label,
  circled = false,
  className,
}: {
  /** Already written for French: « 15,5 ». */
  grade: string;
  /** Read before it by a screen reader: « Note ». */
  label: string;
  circled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-grid w-fit place-items-center leading-none text-stylo-rouge",
        circled ? "px-8 py-3 text-4xl" : "text-xl",
        kalam.className,
        className,
      )}
    >
      <span className="sr-only">{label} </span>
      <span className="tabular">{grade}/20</span>
      {circled ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 120 60"
          preserveAspectRatio="none"
          className="grade-circle pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          {/* Drawn by hand: it starts low on the left and overshoots where it began. */}
          <path
            d="M14 38C7 22 29 7 62 6c31-1 53 10 52 26-1 15-27 25-57 24C27 55 7 46 8 31 9 21 22 13 38 10"
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
    </span>
  );
}
