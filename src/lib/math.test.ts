import { describe, expect, it } from "vitest";
import { calculateDiscount, calculatePercentage, compoundInterest, formatDuration, parseDuration, roundForDisplay } from "@/lib/math";
import { convert } from "@/lib/units";

describe("percentage calculations", () => {
  it("calculates a percentage from a part and a total", () => expect(calculatePercentage(20, 80)).toBe(25));
  it("does not divide by zero or accept non-finite values", () => { expect(calculatePercentage(1, 0)).toBeNull(); expect(calculatePercentage(Infinity, 1)).toBeNull(); });
  it("calculates discounts and preserves safe edge cases", () => { expect(calculateDiscount(100, 15)).toBe(85); expect(calculateDiscount(-10, 15)).toBeNull(); });
  it("rounds display values predictably", () => expect(roundForDisplay(1.005)).toBe(1.01));
});

describe("time and savings formulas", () => {
  it("parses and formats valid durations", () => { expect(parseDuration(1, 30, 15)).toBe(5415); expect(formatDuration(5415)).toBe("01:30:15"); });
  it("rejects invalid duration portions", () => expect(parseDuration(1, 60)).toBeNull());
  it("calculates monthly compound interest", () => expect(roundForDisplay(compoundInterest(1000, 12, 1) ?? 0)).toBe(1126.83));
  it("handles a zero interest rate", () => expect(compoundInterest(100, 0, 1, 20)).toBe(340));
});

describe("unit conversions", () => {
  it("converts known lengths exactly enough for display", () => expect(convert(1, "longitud", "kilómetros", "metros")).toBe(1000));
  it("converts temperatures through a common base", () => expect(convert(32, "temperatura", "fahrenheit", "celsius")).toBe(0));
  it("returns null for invalid conversion values", () => expect(convert(NaN, "masa", "gramos", "libras")).toBeNull());
});
