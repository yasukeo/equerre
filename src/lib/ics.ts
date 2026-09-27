// Sessions as calendar events: an .ics file any calendar opens, and a Google Calendar link
// (DECISIONS.md, D-076). Times are written in UTC, so each calendar shows them in its own
// zone and no offset is ever assumed here.

export type CalendarEvent = {
  uid: string;
  startsAt: Date;
  endsAt: Date;
  title: string;
  description?: string;
  location?: string;
  url?: string;
  /** Grows with each change, so a calendar that imports the file again takes the new time. */
  sequence?: number;
  cancelled?: boolean;
};

/** `20261006T170000Z` */
function stamp(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

/** Control characters other than a line feed: none may reach a line of the file. */
const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

/** RFC 5545 text: backslashes, semicolons, commas and line breaks are escaped. */
function text(value: string): string {
  return (
    value
      // A name comes from its owner: a bare carriage return must not start a property.
      .replace(/\r\n?/g, "\n")
      .replace(CONTROL, "")
      .replaceAll("\\", "\\\\")
      .replaceAll(";", "\\;")
      .replaceAll(",", "\\,")
      .replaceAll("\n", "\\n")
  );
}

/** Lines longer than 75 octets continue on the next line after a space, never mid-character. */
function fold(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let size = 0;
  for (const character of line) {
    const bytes = encoder.encode(character).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (size + bytes > limit) {
      parts.push(current);
      current = "";
      size = 0;
    }
    current += character;
    size += bytes;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function buildIcs(events: CalendarEvent[], now: Date = new Date()): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Equerre//Seances//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.uid}`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART:${stamp(event.startsAt)}`,
      `DTEND:${stamp(event.endsAt)}`,
      `SUMMARY:${text(event.title)}`,
      `SEQUENCE:${event.sequence ?? 0}`,
      `STATUS:${event.cancelled ? "CANCELLED" : "CONFIRMED"}`,
    );
    if (event.location) lines.push(`LOCATION:${text(event.location)}`);
    if (event.description) lines.push(`DESCRIPTION:${text(event.description)}`);
    if (event.url) lines.push(`URL:${event.url}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${stamp(event.startsAt)}/${stamp(event.endsAt)}`,
  });
  const details = [event.description, event.url].filter(Boolean).join("\n\n");
  if (details) params.set("details", details);
  if (event.location) params.set("location", event.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
