import { describe, expect, it } from "vitest";
import { whatsappHref, whatsappNumber } from "./whatsapp";

// The numbers a tutor types, as the site's WhatsApp button needs them (D-090).

describe("whatsappNumber", () => {
  it("reads every usual way of writing a Moroccan number", () => {
    for (const typed of [
      "06 61 23 45 67",
      "0661234567",
      "+212 6 61 23 45 67",
      "+212 06 61 23 45 67",
      "00212 661 234 567",
      "212661234567",
      "6 61 23 45 67",
    ]) {
      expect(whatsappNumber(typed)).toBe("212661234567");
    }
    expect(whatsappNumber("07 00 11 22 33")).toBe("212700112233");
    expect(whatsappNumber("05 37 12 34 56")).toBe("212537123456");
  });

  it("refuses what is not a Moroccan number", () => {
    expect(whatsappNumber("123456")).toBeNull();
    expect(whatsappNumber("06 61 23 45")).toBeNull();
    expect(whatsappNumber("+33 6 12 34 56 78")).toBeNull();
    expect(whatsappHref("")).toBeNull();
  });

  it("builds the wa.me link", () => {
    expect(whatsappHref("06 61 23 45 67")).toBe("https://wa.me/212661234567");
  });
});
