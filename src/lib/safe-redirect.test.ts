import { describe, expect, it } from "vitest";
import { safeRedirectPath } from "./safe-redirect";

describe("safeRedirectPath", () => {
  it("keeps a local path with its query", () => {
    expect(safeRedirectPath("/eleve?onglet=devoirs", "/")).toBe("/eleve?onglet=devoirs");
  });

  it.each([
    ["protocol-relative URL", "//evil.test/eleve"],
    ["absolute URL", "https://evil.test"],
    ["backslash trick", "/\\evil.test"],
    ["relative path", "eleve"],
    ["empty string", ""],
    ["non-string", 42],
  ])("falls back for a %s", (_label, value) => {
    expect(safeRedirectPath(value, "/connexion")).toBe("/connexion");
  });
});
