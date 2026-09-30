import { describe, expect, it } from "vitest";
import { documentVersion, pdfHref } from "./links";

describe("a PDF's address", () => {
  it("names the version, and the corrections when asked", () => {
    expect(pdfHref("id", "v1")).toBe("/pdf/id?v=v1");
    expect(pdfHref("id", "v1", true)).toBe("/pdf/id?v=v1&corriges=1");
  });

  it("changes with the document, its chapter or its programme's name", () => {
    const lesson = "2026-09-30T10:00:00+00:00";
    const chapter = "2026-09-01T10:00:00+00:00";
    const base = documentVersion(lesson, chapter, "2e bac Sciences mathématiques");
    expect(base).toBe(documentVersion(lesson, chapter, "2e bac Sciences mathématiques"));
    // Whichever changed last.
    expect(
      documentVersion("2026-10-01T10:00:00+00:00", chapter, "2e bac Sciences mathématiques"),
    ).not.toBe(base);
    expect(
      documentVersion(lesson, "2026-10-01T10:00:00+00:00", "2e bac Sciences mathématiques"),
    ).not.toBe(base);
    expect(documentVersion(lesson, chapter, "2e bac Sciences maths")).not.toBe(base);
    // Only what an address may hold.
    expect(base).toMatch(/^\d+-[0-9a-z]+$/);
  });
});
