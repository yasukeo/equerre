import { describe, expect, it } from "vitest";
import { formatLocal } from "@/lib/dates";
import { isoWeekday, openSlots, type AvailabilityException, type WeeklyWindow } from "./slots";

// Morocco suspends UTC+1 for Ramadan. In 2027 the clocks go back on Sunday 7 February at
// 02:00 UTC (+1 → 0) and forward on Sunday 14 March at 02:00 UTC (0 → +1).
const TYPE = "type-chez-prof";
const OTHER = "type-en-ligne";
const RULES = { cancellationWindowHours: 24, minNoticeHours: 12, horizonDays: 14 };
const TUESDAY_EVENINGS: WeeklyWindow = {
  weekday: 2,
  start: "18:00",
  end: "21:00",
  sessionTypeId: null,
};

function slotsOn(days: ReturnType<typeof openSlots>, date: string) {
  return days.find((day) => day.date === date)?.slots ?? [];
}

function localTimes(days: ReturnType<typeof openSlots>, date: string) {
  return slotsOn(days, date).map((slot) => formatLocal(slot.startsAt, "HH:mm"));
}

describe("isoWeekday", () => {
  it("counts Monday as 1 and Sunday as 7", () => {
    expect(isoWeekday("2026-09-28")).toBe(1);
    expect(isoWeekday("2026-09-29")).toBe(2);
    expect(isoWeekday("2026-10-04")).toBe(7);
  });
});

describe("openSlots", () => {
  it("offers every half hour of a window a session fits in", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 90,
      windows: [TUESDAY_EVENINGS],
      exceptions: [],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(days, "2026-09-29")).toEqual(["18:00", "18:30", "19:00", "19:30"]);
    expect(localTimes(days, "2026-09-28")).toEqual([]);
    // Today and the next 14 days, each listed even when closed.
    expect(days).toHaveLength(15);
    expect(days[0]?.date).toBe("2026-09-27");
  });

  it("keeps a Tuesday 18:00 window at 18:00 local when Ramadan's offset starts", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 90,
      windows: [TUESDAY_EVENINGS],
      exceptions: [],
      busy: [],
      rules: RULES,
      now: new Date("2027-02-01T08:00:00Z"),
    });
    const before = slotsOn(days, "2027-02-02")[0];
    const during = slotsOn(days, "2027-02-09")[0];
    expect(formatLocal(before!.startsAt, "HH:mm")).toBe("18:00");
    expect(formatLocal(during!.startsAt, "HH:mm")).toBe("18:00");
    expect(before!.startsAt.toISOString()).toBe("2027-02-02T17:00:00.000Z");
    expect(during!.startsAt.toISOString()).toBe("2027-02-09T18:00:00.000Z");
  });

  it("keeps it at 18:00 local when the offset comes back after Ramadan", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 90,
      windows: [TUESDAY_EVENINGS],
      exceptions: [],
      busy: [],
      rules: RULES,
      now: new Date("2027-03-08T08:00:00Z"),
    });
    expect(slotsOn(days, "2027-03-09")[0]?.startsAt.toISOString()).toBe("2027-03-09T18:00:00.000Z");
    expect(slotsOn(days, "2027-03-16")[0]?.startsAt.toISOString()).toBe("2027-03-16T17:00:00.000Z");
    expect(localTimes(days, "2027-03-16")[0]).toBe("18:00");
  });

  it("reads the change-over Sunday in its own offset", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [{ weekday: 7, start: "10:00", end: "11:00", sessionTypeId: null }],
      exceptions: [],
      busy: [],
      rules: RULES,
      now: new Date("2027-02-01T08:00:00Z"),
    });
    // 7 February 2027: the clocks went back at 03:00 local, so 10:00 local is 10:00 UTC.
    expect(slotsOn(days, "2027-02-07").map((slot) => slot.startsAt.toISOString())).toEqual([
      "2027-02-07T10:00:00.000Z",
    ]);
    const slot = slotsOn(days, "2027-02-07")[0]!;
    expect(slot.endsAt.getTime() - slot.startsAt.getTime()).toBe(60 * 60_000);
  });

  it("closes the days of a blocked period, and only those", () => {
    const holidays: AvailabilityException = {
      startsOn: "2026-10-05",
      endsOn: "2026-10-11",
      isBlocked: true,
      start: null,
      end: null,
      sessionTypeId: null,
    };
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 90,
      windows: [TUESDAY_EVENINGS],
      exceptions: [holidays],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(days, "2026-09-29")).toHaveLength(4);
    expect(localTimes(days, "2026-10-06")).toEqual([]);
    // Closed, not full: the page says so differently.
    expect(days.find((day) => day.date === "2026-10-06")?.open).toBe(false);
    expect(days.find((day) => day.date === "2026-09-29")?.open).toBe(true);
    expect(days.find((day) => day.date === "2026-09-30")?.open).toBe(false);
  });

  it("blocks hours inside a window without closing the day", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [TUESDAY_EVENINGS],
      exceptions: [
        {
          startsOn: "2026-09-29",
          endsOn: "2026-09-29",
          isBlocked: true,
          start: "18:30",
          end: "19:30",
          sessionTypeId: null,
        },
      ],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(days, "2026-09-29")).toEqual(["19:30", "20:00"]);
    expect(days.find((day) => day.date === "2026-09-29")?.open).toBe(true);
    const covered = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [TUESDAY_EVENINGS],
      exceptions: [
        {
          startsOn: "2026-09-29",
          endsOn: "2026-09-29",
          isBlocked: true,
          start: "17:00",
          end: "21:00",
          sessionTypeId: null,
        },
      ],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    // Hours blocked from end to end close the day rather than fill it.
    expect(covered.find((day) => day.date === "2026-09-29")?.open).toBe(false);
  });

  it("adds an opening's hours, for its type only", () => {
    const opening: AvailabilityException = {
      startsOn: "2026-10-03",
      endsOn: "2026-10-03",
      isBlocked: false,
      start: "10:00",
      end: "12:00",
      sessionTypeId: OTHER,
    };
    const forOther = openSlots({
      sessionTypeId: OTHER,
      durationMin: 60,
      windows: [],
      exceptions: [opening],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    const forType = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [],
      exceptions: [opening],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(forOther, "2026-10-03")).toEqual(["10:00", "10:30", "11:00"]);
    expect(localTimes(forType, "2026-10-03")).toEqual([]);
  });

  it("offers a window limited to one type to that type only", () => {
    const windows = [{ ...TUESDAY_EVENINGS, sessionTypeId: OTHER }];
    const base = { durationMin: 60, windows, exceptions: [], busy: [], rules: RULES };
    const now = new Date("2026-09-27T08:00:00Z");
    expect(
      localTimes(openSlots({ ...base, sessionTypeId: OTHER, now }), "2026-09-29"),
    ).toHaveLength(5);
    expect(localTimes(openSlots({ ...base, sessionTypeId: TYPE, now }), "2026-09-29")).toEqual([]);
  });

  it("leaves out what overlaps a session already there", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 90,
      windows: [TUESDAY_EVENINGS],
      exceptions: [],
      // 19:00–20:00 local on Tuesday 29 September (UTC+1).
      busy: [
        {
          startsAt: new Date("2026-09-29T18:00:00Z"),
          endsAt: new Date("2026-09-29T19:00:00Z"),
        },
      ],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(days, "2026-09-29")).toEqual([]);
    expect(days.find((day) => day.date === "2026-09-29")?.open).toBe(true);
    const shorter = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [TUESDAY_EVENINGS],
      exceptions: [],
      busy: [
        {
          startsAt: new Date("2026-09-29T18:00:00Z"),
          endsAt: new Date("2026-09-29T19:00:00Z"),
        },
      ],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(shorter, "2026-09-29")).toEqual(["18:00", "20:00"]);
  });

  it("respects the notice and the horizon", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [TUESDAY_EVENINGS],
      exceptions: [],
      busy: [],
      rules: { cancellationWindowHours: 24, minNoticeHours: 12, horizonDays: 7 },
      // Tuesday 29 September, 08:00 local: 18:00 and after are 10 hours away or more.
      now: new Date("2026-09-29T07:00:00Z"),
    });
    // 12 hours' notice: 20:00 local (19:00 UTC) is the first one far enough.
    expect(localTimes(days, "2026-09-29")).toEqual(["20:00"]);
    expect(days.find((day) => day.date === "2026-10-06")?.open).toBe(false);
    // Seven days ahead, 08:00: the next Tuesday's evening is past the horizon.
    expect(localTimes(days, "2026-10-06")).toEqual([]);
  });

  it("does not offer the same start twice when windows overlap", () => {
    const days = openSlots({
      sessionTypeId: TYPE,
      durationMin: 60,
      windows: [
        TUESDAY_EVENINGS,
        { weekday: 2, start: "19:00", end: "22:00", sessionTypeId: null },
      ],
      exceptions: [],
      busy: [],
      rules: RULES,
      now: new Date("2026-09-27T08:00:00Z"),
    });
    expect(localTimes(days, "2026-09-29")).toEqual([
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
    ]);
  });
});
