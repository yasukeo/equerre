import { describe, expect, it } from "vitest";
import {
  appUtcOffsetMinutes,
  formatLocal,
  formatLocalDate,
  localDateKey,
  localDateTimeToUtc,
  localDayBounds,
  localMinutesOfDay,
  localWeekBounds,
} from "./dates";

// Morocco suspends its UTC+1 offset for Ramadan. In 2026 the clocks go back at
// 15 February 02:00 UTC (+1 → 0) and forward at 22 March 02:00 UTC (0 → +1),
// so 1 March is inside the period and 15 September is not.
const RAMADAN_2026 = "2026-03-01";
const SEPTEMBER_2026 = "2026-09-15";

describe("localDateTimeToUtc", () => {
  it("applies UTC+1 outside Ramadan", () => {
    expect(localDateTimeToUtc(SEPTEMBER_2026, "18:00").toISOString()).toBe(
      "2026-09-15T17:00:00.000Z",
    );
  });

  it("applies UTC+0 during Ramadan", () => {
    expect(localDateTimeToUtc(RAMADAN_2026, "18:00").toISOString()).toBe(
      "2026-03-01T18:00:00.000Z",
    );
  });

  it("keeps a weekly 18:00 slot at 18:00 local on both sides of the change", () => {
    const beforeRamadan = localDateTimeToUtc("2026-02-03", "18:00");
    const duringRamadan = localDateTimeToUtc("2026-03-03", "18:00");

    expect(formatLocal(beforeRamadan, "HH:mm")).toBe("18:00");
    expect(formatLocal(duringRamadan, "HH:mm")).toBe("18:00");
    // …which means the UTC instants are one hour apart.
    expect(beforeRamadan.getUTCHours()).toBe(17);
    expect(duringRamadan.getUTCHours()).toBe(18);
  });

  it("rejects malformed input instead of guessing", () => {
    expect(() => localDateTimeToUtc("15/09/2026", "18:00")).toThrow(RangeError);
    expect(() => localDateTimeToUtc(SEPTEMBER_2026, "24:00")).toThrow(RangeError);
    expect(() => localDateTimeToUtc("2026-02-30", "18:00")).toThrow(RangeError);
    expect(() => localDateTimeToUtc("2026-13-01", "18:00")).toThrow(RangeError);
  });
});

describe("appUtcOffsetMinutes", () => {
  it("reads the offset from the IANA zone, not a constant", () => {
    expect(appUtcOffsetMinutes(`${SEPTEMBER_2026}T12:00:00Z`)).toBe(60);
    expect(appUtcOffsetMinutes(`${RAMADAN_2026}T12:00:00Z`)).toBe(0);
  });
});

describe("localDateKey", () => {
  it("uses the Casablanca calendar day, not the UTC one", () => {
    // 23:30 UTC on 15 September is already 00:30 on the 16th in Casablanca.
    expect(localDateKey("2026-09-15T23:30:00Z")).toBe("2026-09-16");
  });
});

describe("localDayBounds", () => {
  it("spans exactly one local day", () => {
    const { start, end } = localDayBounds("2026-09-15T10:00:00Z");
    expect(start.toISOString()).toBe("2026-09-14T23:00:00.000Z");
    expect(end.toISOString()).toBe("2026-09-15T23:00:00.000Z");
  });
});

describe("localWeekBounds", () => {
  it("runs Monday to Monday in local time", () => {
    const { start, end } = localWeekBounds("2026-09-15T10:00:00Z");
    expect(start.toISOString()).toBe("2026-09-13T23:00:00.000Z");
    expect(end.toISOString()).toBe("2026-09-20T23:00:00.000Z");
  });
});

describe("localMinutesOfDay", () => {
  it("counts from local midnight", () => {
    expect(localMinutesOfDay("2026-09-15T17:30:00Z")).toBe(18 * 60 + 30);
    expect(localMinutesOfDay("2026-03-01T17:30:00Z")).toBe(17 * 60 + 30);
  });
});

describe("on the 2026 change-over days", () => {
  const hours = ({ start, end }: { start: Date; end: Date }) =>
    (end.getTime() - start.getTime()) / 3_600_000;

  it("makes the day the clocks go back 25 hours long", () => {
    const day = localDayBounds("2026-02-15T12:00:00Z");
    expect(day.start.toISOString()).toBe("2026-02-14T23:00:00.000Z");
    expect(day.end.toISOString()).toBe("2026-02-16T00:00:00.000Z");
    expect(hours(day)).toBe(25);
  });

  it("makes the day the clocks go forward 23 hours long", () => {
    const day = localDayBounds("2026-03-22T12:00:00Z");
    expect(day.start.toISOString()).toBe("2026-03-22T00:00:00.000Z");
    expect(day.end.toISOString()).toBe("2026-03-22T23:00:00.000Z");
    expect(hours(day)).toBe(23);
  });

  it("gives those weeks 169 and 167 hours", () => {
    const back = localWeekBounds("2026-02-15T12:00:00Z");
    expect(back.start.toISOString()).toBe("2026-02-08T23:00:00.000Z");
    expect(back.end.toISOString()).toBe("2026-02-16T00:00:00.000Z");
    expect(hours(back)).toBe(169);

    const forward = localWeekBounds("2026-03-22T12:00:00Z");
    expect(forward.start.toISOString()).toBe("2026-03-16T00:00:00.000Z");
    expect(forward.end.toISOString()).toBe("2026-03-22T23:00:00.000Z");
    expect(hours(forward)).toBe(167);
  });

  it("keeps an 18:00 session at 18:00 local on both days", () => {
    expect(localDateTimeToUtc("2026-02-15", "18:00").toISOString()).toBe(
      "2026-02-15T18:00:00.000Z",
    );
    expect(localDateTimeToUtc("2026-03-22", "18:00").toISOString()).toBe(
      "2026-03-22T17:00:00.000Z",
    );
  });

  it("moves a time in the skipped hour forward rather than failing", () => {
    // 02:30 doesn't exist on 22 March: it resolves to 03:30 local.
    const skipped = localDateTimeToUtc("2026-03-22", "02:30");
    expect(skipped.toISOString()).toBe("2026-03-22T02:30:00.000Z");
    expect(formatLocal(skipped, "HH:mm")).toBe("03:30");
  });
});

describe("formatLocal", () => {
  it("formats in French", () => {
    expect(formatLocal("2026-09-15T17:00:00Z", "EEEE d MMMM 'à' HH:mm")).toBe(
      "mardi 15 septembre à 18:00",
    );
  });
});

describe("formatLocalDate", () => {
  it("never reads the clock, so a static page may render it", () => {
    const RealDate = Date;
    let argless = 0;
    const spy = new Proxy(RealDate, {
      construct(target, args: unknown[], newTarget) {
        if (args.length === 0) argless += 1;
        return Reflect.construct(target, args, newTarget) as object;
      },
    });

    globalThis.Date = spy as DateConstructor;
    try {
      expect(formatLocalDate("2026-09-01T10:00:00Z")).toBe("1 septembre 2026");
    } finally {
      globalThis.Date = RealDate;
    }

    // formatLocal goes through TZDate, whose constructor calls new Date() internally;
    // Next refuses that while prerendering. This helper exists to avoid it.
    expect(argless).toBe(0);
  });

  it("puts an instant on the right Casablanca day on both sides of Ramadan", () => {
    // Morocco is UTC+0 during Ramadan and UTC+1 the rest of the year, so the same
    // wall-clock instant falls on a different day either side of it.
    expect(formatLocalDate("2026-03-01T23:30:00Z")).toBe("1 mars 2026");
    expect(formatLocalDate("2026-06-01T23:30:00Z")).toBe("2 juin 2026");
  });
});
