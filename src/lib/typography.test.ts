import { describe, expect, it } from "vitest";
import { frenchSpaces } from "./typography";

describe("frenchSpaces", () => {
  it("binds high punctuation and guillemets to their words", () => {
    expect(frenchSpaces("Une limite : pourquoi ? « Parce que »")).toBe(
      "Une limite : pourquoi ? « Parce que »",
    );
    expect(frenchSpaces("Sans ponctuation")).toBe("Sans ponctuation");
  });
});
