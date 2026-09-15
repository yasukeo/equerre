import { describe, expect, it } from "vitest";
import { contactFieldsSchema, contactMetadata } from "./contact";

const blank = { phone: "", school: "", guardianName: "", guardianPhone: "" };

describe("contactFieldsSchema", () => {
  it("accepts a form left blank", () => {
    expect(contactFieldsSchema.parse(blank)).toEqual(blank);
  });

  it("accepts Moroccan numbers with or without spaces and trims them", () => {
    const parsed = contactFieldsSchema.parse({
      ...blank,
      phone: "  +212 612 345 678 ",
      guardianPhone: "0661234567",
    });
    expect(parsed.phone).toBe("+212 612 345 678");
    expect(parsed.guardianPhone).toBe("0661234567");
  });

  it("rejects numbers the database would refuse", () => {
    expect(contactFieldsSchema.safeParse({ ...blank, phone: "06-12-34-56" }).success).toBe(false);
    expect(contactFieldsSchema.safeParse({ ...blank, guardianPhone: "12345" }).success).toBe(false);
  });

  it("limits names and schools to 120 characters", () => {
    expect(contactFieldsSchema.safeParse({ ...blank, school: "x".repeat(121) }).success).toBe(
      false,
    );
  });
});

describe("contactMetadata", () => {
  it("uses the trigger's snake_case keys and leaves blanks out", () => {
    expect(
      contactMetadata({ ...blank, school: "Lycée Ibn Sina", guardianPhone: "0661234567" }),
    ).toEqual({
      school: "Lycée Ibn Sina",
      guardian_phone: "0661234567",
    });
  });
});
