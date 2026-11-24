import { describe, it, expect } from "vitest";
import {
  KRA_PIN_RE, isCertExpired, matchesFilter, countsFor, matchesSearch, validateContractor, contractorInitials, todayISO, cleanPhone,
} from "./labourContractor.js";

const TODAY = "2026-11-19";
const list = [
  { name: "LCON-00001", contractor_name: "Kamau Painters", id_no: "PVT-123456", kra_pin: "A012345678X", tax_cert_expiry: "2027-03-31", phone: "0712 345 678", disabled: 0 },
  { name: "LCON-00002", contractor_name: "Otieno Works", id_no: "PVT-234567", kra_pin: "A067890123Y", tax_cert_expiry: "2026-09-30", phone: "", disabled: 0 },
  { name: "LCON-00003", contractor_name: "Wanjiru Masons", id_no: "22334455", kra_pin: "P024680135Z", tax_cert_expiry: "2026-01-01", disabled: 1 },
];
const ok = { contractor_name: "New Co", id_no: "X1", kra_pin: "A111111111B", tax_cert_expiry: "2027-01-01" };

describe("KRA PIN", () => {
  it("accepts A/P + 9 digits + letter", () => {
    expect(KRA_PIN_RE.test("A123456789Z")).toBe(true);
    expect(KRA_PIN_RE.test("P123456789Z")).toBe(true);
  });
  it("rejects other shapes", () => {
    for (const bad of ["B123456789Z", "A12345678Z", "A1234567890Z", "a123456789z", "A123456789", ""]) expect(KRA_PIN_RE.test(bad)).toBe(false);
  });
});

describe("certificate expiry", () => {
  it("is expired only when before today", () => {
    expect(isCertExpired("2026-11-18", TODAY)).toBe(true);
    expect(isCertExpired("2026-11-19", TODAY)).toBe(false);
    expect(isCertExpired("2027-01-01", TODAY)).toBe(false);
    expect(isCertExpired("", TODAY)).toBe(false);
  });
  it("todayISO is zero padded", () => { expect(todayISO(new Date(2026, 0, 5))).toBe("2026-01-05"); });
});

describe("filters, counts, search", () => {
  it("counts active, inactive and expired (active only)", () => {
    expect(countsFor(list, TODAY)).toEqual({ all: 3, active: 2, inactive: 1, expired: 1 });
  });
  it("filters", () => {
    expect(list.filter((c) => matchesFilter(c, "expired", TODAY)).map((c) => c.name)).toEqual(["LCON-00002"]);
    expect(list.filter((c) => matchesFilter(c, "inactive", TODAY)).map((c) => c.name)).toEqual(["LCON-00003"]);
  });
  it("searches name, id, pin, phone", () => {
    expect(list.filter((c) => matchesSearch(c, "kamau")).length).toBe(1);
    expect(list.filter((c) => matchesSearch(c, "p0246")).length).toBe(1);
    expect(list.filter((c) => matchesSearch(c, "0712")).length).toBe(1);
    expect(list.filter((c) => matchesSearch(c, "")).length).toBe(3);
  });
  it("initials", () => { expect(contractorInitials("Kamau Painters")).toBe("KP"); expect(contractorInitials("")).toBe("?"); });
});

describe("validateContractor", () => {
  it("passes a complete new contractor", () => { expect(validateContractor(ok, list, "")).toEqual({}); });
  it("requires name, id, pin and expiry", () => {
    expect(Object.keys(validateContractor({}, list, "")).sort()).toEqual(["contractor_name", "id_no", "kra_pin", "tax_cert_expiry"]);
  });
  it("rejects a bad pin format", () => { expect(validateContractor({ ...ok, kra_pin: "123" }, list, "").kra_pin).toMatch(/Invalid KRA PIN/); });
  it("rejects a duplicate pin, case-insensitive", () => {
    expect(validateContractor({ ...ok, kra_pin: "a012345678x" }, list, "").kra_pin).toMatch(/already belongs to Kamau Painters/);
  });
  it("allows keeping its own pin when editing", () => {
    expect(validateContractor({ ...ok, kra_pin: "A012345678X" }, list, "LCON-00001")).toEqual({});
  });
  it("lets an expired certificate be saved (renewal is an edit)", () => {
    expect(validateContractor({ ...ok, tax_cert_expiry: "2020-01-01" }, list, "")).toEqual({});
  });
});
describe("phone input", () => {
  it("keeps digits, spaces and a leading + only", () => {
    expect(cleanPhone("sfsdvfea")).toBe("");
    expect(cleanPhone("0712 345 678")).toBe("0712 345 678");
    expect(cleanPhone("+254 712-345.678")).toBe("+254 712345678");
    expect(cleanPhone("07a12")).toBe("0712");
    expect(cleanPhone("12+34")).toBe("1234");
    expect(cleanPhone("++254")).toBe("+254");
    expect(cleanPhone(null)).toBe("");
  });
});