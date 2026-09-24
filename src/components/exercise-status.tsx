import { Camera, CircleAlert, Hash, ListChecks, type LucideIcon } from "lucide-react";
import type { AnswerType } from "@/lib/exercise/exercise";
import { cn } from "@/lib/utils";

// As with lessons: an icon and a word carry the meaning, never a colour on its own.
const ANSWER_ICONS: Record<AnswerType, LucideIcon> = {
  upload: Camera,
  numeric: Hash,
  mcq: ListChecks,
};

const chip =
  "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-medium whitespace-nowrap";

export function AnswerTypeChip({ type, label }: { type: AnswerType; label: string }) {
  const Icon = ANSWER_ICONS[type];
  return (
    <span className={cn(chip, "border-quadrillage text-encre-douce")}>
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}

/** An exercise that cannot be given yet: no statement, or no expected answer. */
export function IncompleteChip({ label, hint }: { label: string; hint: string }) {
  return (
    <span className={cn(chip, "border-stylo-rouge/40 text-stylo-rouge")} title={hint}>
      <CircleAlert aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
