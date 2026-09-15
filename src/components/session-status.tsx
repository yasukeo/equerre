import { CalendarClock, Check, Hourglass, Minus, UserX, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database";

export type SessionStatus = Database["public"]["Enums"]["session_status"];

// Status is carried by an icon and a word, never by colour alone (brief §8).
const ICONS: Record<SessionStatus, LucideIcon> = {
  en_attente: Hourglass,
  planifiee: CalendarClock,
  terminee: Check,
  annulee: X,
  absent: UserX,
  refusee: Minus,
};

const TONES: Record<SessionStatus, string> = {
  en_attente: "border-trait text-encre",
  planifiee: "border-quadrillage text-encre",
  terminee: "border-quadrillage text-encre-douce",
  annulee: "border-quadrillage text-encre-douce",
  absent: "border-stylo-rouge/50 text-stylo-rouge",
  refusee: "border-quadrillage text-encre-douce",
};

export function SessionStatusChip({ status, label }: { status: SessionStatus; label: string }) {
  const Icon = ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONES[status],
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
