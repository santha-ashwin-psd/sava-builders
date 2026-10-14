// Tests for KRA_PIN_REGEX (composables/useValidation.js) -- Sava A4.
// Run with: npm test  (or: npx vitest run)
import { describe, it, expect } from "vitest";
import { KRA_PIN_REGEX } from "./useValidation.js";

describe("KRA_PIN_REGEX", () => {
  it("accepts company (A) and individual (P) PINs", () => {
    expect(KRA_PIN_REGEX.test("A123456789Z")).toBe(true);
    expect(KRA_PIN_REGEX.test("P051234567K")).toBe(true);
  });
  it("rejects wrong shapes", () => {
    for (const bad of ["A12345678Z", "A1234567890Z", "A123456789", "123456789Z",
      "B123456789Z", "a123456789z", "A123456789Z1", "A-123456789Z", "", "27AAACR5055K1Z5"]) {
      expect(KRA_PIN_REGEX.test(bad), bad).toBe(false);
    }
  });
});