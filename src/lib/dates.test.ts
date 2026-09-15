import { describe, expect, it } from "vitest";
import {
  appUtcOffsetMinutes,
  formatLocal,
  localDateKey,
  localDateTimeToUtc,
  localDayBounds,
  localMinutesOfDay,
  localWeekBounds,
} from "./dates";

// Morocco suspends its UTC+1 offset for Ramadan. In 2026 that covers roughly
// mid-February to late March, so 1 March is inside it and 15 September is not.
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

describe("formatLocal", () => {
  it("formats in French", () => {
    expect(formatLocal("2026-09-15T17:00:00Z", "EEEE d MMMM 'à' HH:mm")).toBe(
      "mardi 15 septembre à 18:00",
    );
  });
});
