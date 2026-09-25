import { CheckCheck, Circle, Clock, Eye, Repeat } from "lucide-react";
import type { ExerciseWork } from "@/lib/homework/work";
import { cn } from "@/lib/utils";

// Where a student stands on an exercise: an icon and a word, never a colour on its own.
const ICONS = {
  todo: Circle,
  handedIn: Clock,
  graded: CheckCheck,
  revealed: Eye,
  doneElsewhere: Repeat,
} as const;

const TONES = {
  todo: "border-trait text-encre",
  handedIn: "border-stylo-bleu/40 text-stylo-bleu",
  graded: "border-quadrillage text-encre",
  revealed: "border-quadrillage text-encre-douce",
  doneElsewhere: "border-quadrillage text-encre-douce",
} as const;

export function WorkChip({ work, label }: { work: ExerciseWork; label: string }) {
  const Icon = ICONS[work.kind];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONES[work.kind],
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
