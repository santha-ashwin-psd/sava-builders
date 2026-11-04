import { describe, it, expect } from "vitest";
import { SAVA_ROLES, SAVA_PREFILL, savaPrefill, sameRoles } from "./savaRoles.js";

const KEYS = ["invoices", "bills", "payments", "banking", "inventory", "accounts", "reports", "customers", "taxes", "admin"];
const on = (p) => Object.keys(p.modules).filter((k) => p.modules[k]);

describe("savaRoles", () => {
  it("has the 4 roles, each with a prefill", () => {
    expect(SAVA_ROLES).toEqual(["Site Engineer", "Purchase Manager", "Admin", "Director"]);
    for (const r of SAVA_ROLES) expect(SAVA_PREFILL[r]).toBeTruthy();
  });

  it("returns null for no or unknown roles", () => {
    expect(savaPrefill([], KEYS)).toBeNull();
    expect(savaPrefill(["Nope"], KEYS)).toBeNull();
    expect(savaPrefill(["Store Keeper"], KEYS)).toBeNull();
  });

  it("Site Engineer: Books Manager, no modules (MRN comes from the server rule)", () => {
    const p = savaPrefill(["Site Engineer"], KEYS);
    expect(p.role).toBe("Books Manager");
    expect(on(p)).toEqual([]);
  });

  it("Purchase Manager and Admin: Books Manager, every module", () => {
    for (const r of ["Purchase Manager", "Admin"]) {
      const p = savaPrefill([r], KEYS);
      expect(p.role).toBe("Books Manager");
      expect(on(p)).toEqual(KEYS);
    }
  });

  it("Director: Books Admin, every module", () => {
    const p = savaPrefill(["Director"], KEYS);
    expect(p.role).toBe("Books Admin");
    expect(on(p)).toEqual(KEYS);
  });

  it("several roles: strongest Books role wins", () => {
    expect(savaPrefill(["Director", "Site Engineer"], KEYS).role).toBe("Books Admin");
    expect(savaPrefill(["Admin", "Site Engineer"], KEYS).role).toBe("Books Manager");
  });

  it("sameRoles ignores order", () => {
    expect(sameRoles(["a", "b"], ["b", "a"])).toBe(true);
    expect(sameRoles(["a"], ["a", "b"])).toBe(false);
    expect(sameRoles(undefined, [])).toBe(true);
  });
});