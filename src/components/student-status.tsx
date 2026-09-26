import { CircleCheck, CircleSlash, Pause, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database";

export type StudentStatus = Database["public"]["Enums"]["student_status"];

// A student's standing (D-060): an icon and a word, never a colour alone (brief §8).
const ICONS: Record<StudentStatus, LucideIcon> = {
  actif: CircleCheck,
  en_pause: Pause,
  arrete: CircleSlash,
};

const TONES: Record<StudentStatus, string> = {
  actif: "border-quadrillage text-encre",
  en_pause: "border-trait text-encre",
  arrete: "border-quadrillage text-encre-douce",
};

export function StudentStatusChip({ status, label }: { status: StudentStatus; label: string }) {
  const Icon = ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONES[status],
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
