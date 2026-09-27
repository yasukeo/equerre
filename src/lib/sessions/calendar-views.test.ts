import { describe, expect, it } from "vitest";
import { addDays, addMonths, isDateKey, monthGridOf, weekOf } from "./calendar-views";

describe("calendar views", () => {
  it("reads only real dates", () => {
    expect(isDateKey("2026-09-29")).toBe(true);
    expect(isDateKey("2026-02-30")).toBe(false);
    expect(isDateKey("29/09/2026")).toBe(false);
    expect(isDateKey("9999-12-31")).toBe(false);
  });

  it("counts days across months and years", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addMonths("2026-12-15", 1)).toBe("2027-01-01");
    expect(addMonths("2026-01-31", -1)).toBe("2025-12-01");
  });

  it("runs a week from Monday to Sunday", () => {
    expect(weekOf("2026-10-04")).toEqual([
      "2026-09-28",
      "2026-09-29",
      "2026-09-30",
      "2026-10-01",
      "2026-10-02",
      "2026-10-03",
      "2026-10-04",
    ]);
  });

  it("covers a month in whole weeks", () => {
    const grid = monthGridOf("2026-10-17");
    expect(grid[0]).toBe("2026-09-28");
    expect(grid.at(-1)).toBe("2026-11-01");
    expect(grid).toHaveLength(35);
    // February 2027 starts on a Monday and ends on a Sunday: four weeks exactly.
    expect(monthGridOf("2027-02-10")).toHaveLength(28);
  });

  it("does not drift on Ramadan's change-over weekend", () => {
    // The clocks go back on Sunday 7 February 2027; calendar dates do not care.
    expect(weekOf("2027-02-07")[0]).toBe("2027-02-01");
    expect(addDays("2027-02-06", 1)).toBe("2027-02-07");
  });
});
