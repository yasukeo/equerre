import { Globe, Lock, PencilLine, Send, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database";

export type PublicationStatus = Database["public"]["Enums"]["publication_status"];
export type LessonVisibility = Database["public"]["Enums"]["lesson_visibility"];

// As with sessions: an icon and a word carry the meaning, never a colour on its own.
const STATUS_ICONS: Record<PublicationStatus, LucideIcon> = {
  draft: PencilLine,
  published: Send,
};

const STATUS_TONES: Record<PublicationStatus, string> = {
  draft: "border-trait text-encre",
  published: "border-quadrillage text-encre-douce",
};

const VISIBILITY_ICONS: Record<LessonVisibility, LucideIcon> = {
  public: Globe,
  enrolled: Users,
  specific: Lock,
};

const chip =
  "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-medium whitespace-nowrap";

export function PublicationChip({ status, label }: { status: PublicationStatus; label: string }) {
  const Icon = STATUS_ICONS[status];
  return (
    <span className={cn(chip, STATUS_TONES[status])}>
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}

export function VisibilityChip({
  visibility,
  label,
  hint,
}: {
  visibility: LessonVisibility;
  label: string;
  hint: string;
}) {
  const Icon = VISIBILITY_ICONS[visibility];
  return (
    <span className={cn(chip, "border-quadrillage text-encre-douce")} title={hint}>
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
