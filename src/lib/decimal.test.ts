import { describe, expect, it } from "vitest";
import {
  addDecimal,
  formatDecimal,
  movePoint,
  multiplyDecimal,
  parseDecimal,
  subtractDecimal,
} from "./decimal";

describe("parseDecimal", () => {
  it.each([
    ["4,8", "4.8"],
    ["4.8", "4.8"],
    ["-4,80", "-4.8"],
    ["+2", "2"],
    ["−3,5", "-3.5"],
    [" 1 500,25 ", "1500.25"],
    ["1 500", "1500"],
    [",5", "0.5"],
    ["5,", "5"],
    ["007", "7"],
    ["-0", "0"],
    ["0,000", "0"],
    ["3e8", "300000000"],
    ["3E-2", "0.03"],
    ["1,5e-3", "0.0015"],
    ["3×10^8", "300000000"],
    ["3x10^-2", "0.03"],
    ["6,02*10^23", "602000000000000000000000"],
    ["2,5·10^2", "250"],
  ])("reads %j as %j", (input, expected) => {
    expect(parseDecimal(input)).toBe(expected);
  });

  it.each([
    "",
    " ",
    "-",
    ",",
    "abc",
    "4,8,1",
    "1,234.5",
    "1/2",
    "2π",
    "0x10",
    "Infinity",
    "NaN",
    "1e",
    "1e400",
    "3×10^99",
    // A product, not a power of ten: refused rather than read as 7 or 30.
    "7*100",
    "5×100",
    "3×101",
    "2x1000",
    "1".repeat(41),
    "--1",
  ])("refuses %j", (input) => {
    expect(parseDecimal(input)).toBeNull();
  });

  it("keeps digits a double would lose", () => {
    expect(parseDecimal("0,1000000000000000055511151231257827")).toBe(
      "0.1000000000000000055511151231257827",
    );
  });
});

describe("movePoint", () => {
  it.each([
    ["1", -2, "0.01"],
    ["1.5", -2, "0.015"],
    ["0.015", 2, "1.5"],
    ["0.01", 2, "1"],
    ["-12.5", 1, "-125"],
    ["250", -2, "2.5"],
    ["0", 2, "0"],
  ])("moves the point of %j by %i to %j", (decimal, places, expected) => {
    expect(movePoint(decimal, places)).toBe(expected);
  });
});

describe("formatDecimal", () => {
  it("writes the point as a comma, and reads back the same", () => {
    expect(formatDecimal("-4.8")).toBe("-4,8");
    expect(parseDecimal(formatDecimal("-4.8"))).toBe("-4.8");
    expect(formatDecimal("300000000")).toBe("300000000");
  });
});

describe("exact arithmetic", () => {
  it("adds, subtracts and multiplies without a double in sight", () => {
    expect(addDecimal("0.1", "0.2")).toBe("0.3");
    expect(subtractDecimal("4.8", "0.048")).toBe("4.752");
    expect(subtractDecimal("1", "1.5")).toBe("-0.5");
    expect(multiplyDecimal("299792458", "0.0001")).toBe("29979.2458");
    expect(multiplyDecimal("-2.5", "0.4")).toBe("-1");
    expect(addDecimal("123456789", "0.0001")).toBe("123456789.0001");
  });
});
