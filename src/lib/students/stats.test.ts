import { describe, expect, it } from "vitest";
import { attendanceOf, averageOf, nextSessionOf } from "./stats";

describe("attendanceOf", () => {
  it("counts the sessions she was expected at, and those she came to", () => {
    expect(
      attendanceOf([
        { kind: "own", status: "terminee" },
        { kind: "own", status: "absent" },
        { kind: "group", attendance: "present" },
        { kind: "group", attendance: "present" },
      ]),
    ).toEqual({ present: 3, counted: 4, rate: 0.75 });
  });

  it("leaves out what expected nobody, and excused absences", () => {
    expect(
      attendanceOf([
        { kind: "own", status: "annulee" },
        { kind: "own", status: "refusee" },
        { kind: "own", status: "planifiee" },
        { kind: "own", status: "en_attente" },
        { kind: "group", attendance: "excuse" },
      ]),
    ).toEqual({ present: 0, counted: 0, rate: null });
  });
});

describe("averageOf", () => {
  it("is the mean, or nothing before the first grade", () => {
    expect(averageOf([12, 15.5, 20])).toBeCloseTo(15.8333, 4);
    expect(averageOf([])).toBeNull();
  });
});

describe("nextSessionOf", () => {
  const SALMA = "salma";
  const G = "group";
  const memberships = [{ groupId: G, studentId: SALMA, joinedAt: "2026-10-01T00:00:00Z" }];

  it("takes the soonest of her own and her groups' sessions", () => {
    expect(
      nextSessionOf(
        SALMA,
        [
          { startsAt: "2026-10-09T17:00:00Z", studentId: SALMA, groupId: null },
          { startsAt: "2026-10-06T17:00:00Z", studentId: null, groupId: G },
          { startsAt: "2026-10-05T17:00:00Z", studentId: "someone else", groupId: null },
        ],
        memberships,
      ),
    ).toBe("2026-10-06T17:00:00Z");
  });

  it("ignores a group's session from before she joined, and groups she is not in", () => {
    expect(
      nextSessionOf(
        SALMA,
        [
          { startsAt: "2026-09-30T17:00:00Z", studentId: null, groupId: G },
          { startsAt: "2026-10-02T17:00:00Z", studentId: null, groupId: "another group" },
        ],
        memberships,
      ),
    ).toBeNull();
  });
});
