import { describe, expect, it } from "vitest";
import { generateInviteCode, INVITE_CODE_ALPHABET, INVITE_CODE_PATTERN } from "./invite-code";

describe("invite codes", () => {
  it("uses a 32-symbol alphabet that the database pattern accepts", () => {
    expect(INVITE_CODE_ALPHABET).toHaveLength(32);
    expect(new Set(INVITE_CODE_ALPHABET).size).toBe(32);
    for (const symbol of INVITE_CODE_ALPHABET) {
      expect(INVITE_CODE_PATTERN.test(symbol.repeat(8))).toBe(true);
    }
  });

  it("generates codes that match the pattern", () => {
    for (let i = 0; i < 200; i += 1) {
      expect(generateInviteCode()).toMatch(INVITE_CODE_PATTERN);
    }
  });

  it("maps bytes to symbols without skipping any", () => {
    const bytes = Uint8Array.from([0, 31, 32, 63, 64, 255, 7, 8]);
    expect(generateInviteCode(() => bytes)).toBe("A9A9A9HJ");
  });

  it("rejects look-alike characters", () => {
    expect(INVITE_CODE_PATTERN.test("BACPC2K0")).toBe(false);
    expect(INVITE_CODE_PATTERN.test("BACPCIK7")).toBe(false);
    expect(INVITE_CODE_PATTERN.test("bacpc2k7")).toBe(false);
  });
});
