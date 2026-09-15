import { describe, expect, it } from "vitest";
import { safeRedirectPath } from "./safe-redirect";

// Control characters are built with fromCharCode so the file stays plain text for git.
const TAB = String.fromCharCode(9);
const LF = String.fromCharCode(10);
const CR = String.fromCharCode(13);
const NUL = String.fromCharCode(0);
const BACKSLASH = String.fromCharCode(92);

describe("safeRedirectPath", () => {
  it("keeps a local path with its query and fragment", () => {
    expect(safeRedirectPath("/eleve?onglet=devoirs", "/")).toBe("/eleve?onglet=devoirs");
    expect(safeRedirectPath("/eleve#seance", "/")).toBe("/eleve#seance");
  });

  it("normalises harmless dot segments", () => {
    expect(safeRedirectPath("/eleve/../prof", "/")).toBe("/prof");
  });

  it("keeps an encoded tab as a harmless local path", () => {
    expect(safeRedirectPath("/%09/evil.test", "/")).toBe("/%09/evil.test");
  });

  it.each([
    ["protocol-relative URL", "//evil.test/eleve"],
    ["absolute URL", "https://evil.test"],
    ["backslash trick", `/${BACKSLASH}evil.test`],
    ["tab after the slash", `/${TAB}/evil.test`],
    ["newline after the slash", `/${LF}/evil.test`],
    ["carriage return after the slash", `/${CR}/evil.test`],
    ["leading tab", `${TAB}//evil.test`],
    ["null byte", `/${NUL}/evil.test`],
    ["dot segment collapsing to //", "/.//evil.test"],
    ["encoded dot segment collapsing to //", "/%2e//evil.test"],
    ["parent segment collapsing to //", "/eleve/..//evil.test"],
    ["leading parent segment collapsing to //", "/..//evil.test"],
    ["encoded parent segment collapsing to //", "/%2E%2E//evil.test"],
    ["relative path", "eleve"],
    ["empty string", ""],
    ["non-string", 42],
  ])("falls back for a %s", (_label, value) => {
    expect(safeRedirectPath(value, "/connexion")).toBe("/connexion");
  });
});
