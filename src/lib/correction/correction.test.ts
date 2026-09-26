import { describe, expect, it } from "vitest";
import { arrangeRemarks, readAnchor, readGrade, type Remark } from "./correction";

describe("readGrade", () => {
  it.each([
    ["15,5", "15.5"],
    ["15.5", "15.5"],
    [" 20 ", "20"],
    ["0", "0"],
    ["12,25", "12.25"],
    ["15,5/20", "15.5"],
    ["15,5 / 20", "15.5"],
  ])("reads %j", (input, value) => {
    expect(readGrade(input)).toEqual({ value });
  });

  it("says what is wrong", () => {
    expect(readGrade("")).toEqual({ error: "gradeRequired" });
    expect(readGrade("/20")).toEqual({ error: "gradeRequired" });
    expect(readGrade("quinze")).toEqual({ error: "grade" });
    expect(readGrade("20,5")).toEqual({ error: "gradeRange" });
    expect(readGrade("-1")).toEqual({ error: "gradeRange" });
    // numeric(4,2) would round it without a word.
    expect(readGrade("15,555")).toEqual({ error: "gradePrecision" });
  });
});

describe("readAnchor", () => {
  it("keeps a page, with or without a point", () => {
    expect(readAnchor({ path: "s/r/p.webp", x: 0.5, y: 0.25 })).toEqual({
      path: "s/r/p.webp",
      x: 0.5,
      y: 0.25,
    });
    expect(readAnchor({ path: "s/r/p.webp" })).toEqual({ path: "s/r/p.webp", x: null, y: null });
  });

  it("refuses a point off the page, or no page at all", () => {
    expect(readAnchor({ path: "s/r/p.webp", x: 1.2, y: 0.5 })).toBeNull();
    expect(readAnchor({ page: 0, x: 0.5, y: 0.5 })).toBeNull();
    expect(readAnchor(null)).toBeNull();
  });
});

describe("arrangeRemarks", () => {
  const remark = (id: string, anchor: unknown, createdAt: string): Remark => ({
    id,
    body: id,
    anchor,
    createdAt,
  });

  it("numbers the remarks down each page, in the order of the pages", () => {
    const { pages, elsewhere } = arrangeRemarks(
      ["p1", "p2"],
      [
        remark("p2-top", { path: "p2", x: 0.5, y: 0.1 }, "2026-09-26T10:00:00Z"),
        remark("p1-low", { path: "p1", x: 0.5, y: 0.9 }, "2026-09-26T10:01:00Z"),
        remark("p1-page", { path: "p1" }, "2026-09-26T10:02:00Z"),
        remark("p1-high", { path: "p1", x: 0.5, y: 0.2 }, "2026-09-26T10:03:00Z"),
      ],
    );
    expect(pages.map((page) => page.remarks.map((r) => [r.id, r.number]))).toEqual([
      [
        ["p1-high", 1],
        ["p1-low", 2],
        ["p1-page", 3],
      ],
      [["p2-top", 4]],
    ]);
    expect(elsewhere).toEqual([]);
  });

  it("keeps a remark whose page left the copy, after the others", () => {
    const { pages, elsewhere } = arrangeRemarks(
      ["p1"],
      [
        remark("gone", { path: "p0" }, "2026-09-26T10:00:00Z"),
        remark("here", { path: "p1" }, "2026-09-26T10:01:00Z"),
        remark("unreadable", { page: 3 }, "2026-09-26T10:02:00Z"),
      ],
    );
    expect(pages[0]?.remarks.map((r) => [r.id, r.number])).toEqual([["here", 1]]);
    expect(elsewhere.map((r) => [r.id, r.number])).toEqual([
      ["gone", 2],
      ["unreadable", 3],
    ]);
  });
});
