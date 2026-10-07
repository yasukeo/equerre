import { describe, expect, it } from "vitest";
import { frenchSpaces, frenchSpacesDeep } from "./typography";

describe("frenchSpaces", () => {
  it("binds high punctuation and guillemets to their words", () => {
    expect(frenchSpaces("Une limite : pourquoi ? « Parce que »")).toBe(
      "Une limite : pourquoi ? « Parce que »",
    );
    expect(frenchSpaces("Sans ponctuation")).toBe("Sans ponctuation");
    expect(frenchSpaces("lu à 40 %")).toBe("lu à 40 %");
  });
});

describe("frenchSpacesDeep", () => {
  it("reaches every message of a dictionary, and leaves ICU syntax alone", () => {
    expect(
      frenchSpacesDeep({ a: "Note : {grade}", b: { c: "{n, plural, one {# fois} other {# fois}} ?" } }),
    ).toEqual({ a: "Note : {grade}", b: { c: "{n, plural, one {# fois} other {# fois}} ?" } });
  });
});
