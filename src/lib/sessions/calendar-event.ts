import { siteConfig } from "@/config/site";
import { publicEnv } from "@/lib/env";
import type { CalendarEvent } from "@/lib/ics";
import { whoFor, type Session } from "./queries";

const SEQUENCE_ORIGIN = Date.UTC(2026, 0, 1);

/**
 * A session as a calendar event, worded for who keeps it: the student reads the type and her
 * tutor, the tutor reads who is coming (D-076).
 */
export function eventFor(
  session: Session,
  audience: "student" | "tutor",
  modeLabel: (mode: Session["mode"]) => string,
): CalendarEvent {
  const typeName = session.type?.name ?? "";
  const place = session.mode === "en_ligne" ? session.meetingUrl : session.location;
  return {
    uid: `${session.id}@equerre`,
    startsAt: new Date(session.startsAt),
    endsAt: new Date(session.endsAt),
    title:
      audience === "student"
        ? `${typeName} · ${siteConfig.tutorName}`
        : `${whoFor(session)} · ${typeName}`,
    location: place ?? modeLabel(session.mode),
    description: [typeName, modeLabel(session.mode), session.group?.name]
      .filter(Boolean)
      .join(" · "),
    url: `${publicEnv.NEXT_PUBLIC_SITE_URL}/${audience === "student" ? "eleve" : "prof"}/seances/${session.id}`,
    // Seconds since 2026 at its last change: always larger after a move or a cancellation.
    sequence: Math.max(0, Math.floor((Date.parse(session.updatedAt) - SEQUENCE_ORIGIN) / 1000)),
    cancelled: session.status === "annulee" || session.status === "refusee",
  };
}
