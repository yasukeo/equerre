import { TriangleAlert } from "lucide-react";

/** « En retard »: in red, so with an icon and words, never the colour alone (DESIGN.md). */
export function LateBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-sm border border-stylo-rouge/40 px-1.5 py-0.5 text-xs font-medium text-stylo-rouge">
      <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0" />
      {label}
    </span>
  );
}
