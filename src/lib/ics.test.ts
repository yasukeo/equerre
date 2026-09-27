import { describe, expect, it } from "vitest";
import { buildIcs, googleCalendarUrl, type CalendarEvent } from "./ics";

const EVENT: CalendarEvent = {
  uid: "0b1c@equerre",
  startsAt: new Date("2026-10-06T17:00:00Z"),
  endsAt: new Date("2026-10-06T18:30:00Z"),
  title: "Séance de maths, chez la professeure",
  description: "Cours particulier; 90 min\nApporter la série 3",
  location: "Chez la professeure",
  url: "https://equerre.vercel.app/eleve/seances/0b1c",
};

describe("buildIcs", () => {
  const ics = buildIcs([EVENT], new Date("2026-09-27T09:00:00Z"));

  it("writes times in UTC", () => {
    expect(ics).toContain("DTSTART:20261006T170000Z\r\n");
    expect(ics).toContain("DTEND:20261006T183000Z\r\n");
    expect(ics).toContain("DTSTAMP:20260927T090000Z\r\n");
  });

  it("escapes commas, semicolons and line breaks", () => {
    expect(ics).toContain("SUMMARY:Séance de maths\\, chez la professeure\r\n");
    expect(ics).toContain("DESCRIPTION:Cours particulier\\; 90 min\\nApporter la série 3\r\n");
  });

  it("ends every line with CRLF and folds long ones by octets", () => {
    const long = buildIcs([{ ...EVENT, description: "é".repeat(100) }]);
    for (const line of long.split("\r\n")) {
      expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    }
    const unfolded = long.replace(/\r\n /g, "");
    expect(unfolded).toContain(`DESCRIPTION:${"é".repeat(100)}\r\n`);
    expect(long.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(long.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });
});

describe("buildIcs, from what people typed", () => {
  it("keeps a bare carriage return or a control character from starting a property", () => {
    const ics = buildIcs([{ ...EVENT, title: "Salma\rATTENDEE:mailto:x@y.z\u0007" }]);
    expect(ics).toContain("SUMMARY:Salma\\nATTENDEE:mailto:x@y.z\r\n");
    expect(ics.split("\r\n").some((line) => line.startsWith("ATTENDEE"))).toBe(false);
  });

  it("says when it changed and whether it still stands", () => {
    const ics = buildIcs([{ ...EVENT, sequence: 42, cancelled: true }]);
    expect(ics).toContain("SEQUENCE:42\r\n");
    expect(ics).toContain("STATUS:CANCELLED\r\n");
  });
});

describe("googleCalendarUrl", () => {
  it("carries the title, the UTC range and the place", () => {
    const url = new URL(googleCalendarUrl(EVENT));
    expect(url.origin).toBe("https://calendar.google.com");
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
    expect(url.searchParams.get("dates")).toBe("20261006T170000Z/20261006T183000Z");
    expect(url.searchParams.get("text")).toBe(EVENT.title);
    expect(url.searchParams.get("location")).toBe("Chez la professeure");
    expect(url.searchParams.get("details")).toContain(EVENT.url);
  });
});
