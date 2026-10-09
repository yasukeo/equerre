import { House, MapPin, Users, Video } from "lucide-react";
import type { ReactNode } from "react";
import { SessionStatusChip, type SessionStatus } from "@/components/session-status";
import { formatLocal } from "@/lib/dates";
import type { SessionMode } from "@/lib/sessions/queries";
import { cn } from "@/lib/utils";

const MODE_ICONS: Record<SessionMode, typeof House> = {
  domicile: House,
  chez_prof: MapPin,
  en_ligne: Video,
};

/**
 * A session as a diary leaf (D-104): the day torn off a calendar on the left, the hours and
 * the place beside it. Shared by both areas so a session looks the same from either side.
 */
export function SessionTicket({
  startsAt,
  endsAt,
  status,
  statusLabel,
  title,
  mode,
  place,
  group,
  when,
  past,
  children,
}: {
  startsAt: string;
  endsAt: string;
  status: SessionStatus;
  statusLabel: string;
  /** Who it is with, or what it is, when the page's heading does not already say it. */
  title?: ReactNode;
  mode: SessionMode;
  place: string;
  group?: string | null;
  /** « dans 6 jours », « aujourd’hui ». */
  when?: string | null;
  past: boolean;
  children?: ReactNode;
}) {
  const ModeIcon = MODE_ICONS[mode];
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl border bg-surface",
        past || status === "annulee" || status === "refusee"
          ? "border-quadrillage"
          : "border-encre",
      )}
    >
      <div
        className={cn(
          "grid w-20 content-center justify-items-center gap-0.5 px-2 py-4 text-center sm:w-24",
          past || status === "annulee" || status === "refusee"
            ? "bg-sunken text-encre-douce"
            : "bg-encre-fixe text-white",
        )}
      >
        <span className="text-xs font-medium tracking-wide uppercase">
          {formatLocal(startsAt, "EEE")}
        </span>
        <span className="text-4xl leading-none font-semibold tabular [font-variation-settings:'HEXP'_45]">
          {formatLocal(startsAt, "d")}
        </span>
        <span className="text-xs">{formatLocal(startsAt, "MMM yyyy")}</span>
      </div>
      <div className="grid content-center gap-2 p-4 sm:p-5">
        <div className="grid gap-0.5">
          {title ? (
            <p className="text-lg leading-tight font-semibold break-words">{title}</p>
          ) : null}
          <p className="text-2xl font-semibold tabular [font-variation-settings:'HEXP'_45]">
            {formatLocal(startsAt, "HH:mm")} – {formatLocal(endsAt, "HH:mm")}
          </p>
          <p className="text-sm text-encre-douce first-letter:uppercase">
            {formatLocal(startsAt, "EEEE d MMMM yyyy")}
            {when ? <span className="font-medium text-encre"> · {when}</span> : null}
          </p>
        </div>
        <ul role="list" className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
          <li className="inline-flex items-center gap-1.5">
            <ModeIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="break-words">{place}</span>
          </li>
          {group ? (
            <li className="inline-flex items-center gap-1.5">
              <Users aria-hidden="true" className="size-4 shrink-0" />
              {group}
            </li>
          ) : null}
          <li>
            <SessionStatusChip status={status} label={statusLabel} />
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
}
