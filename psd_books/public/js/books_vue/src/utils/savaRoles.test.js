import { describe, it, expect } from "vitest";
import { SAVA_ROLES, SAVA_PREFILL, savaPrefill, sameRoles } from "./savaRoles.js";

const KEYS = ["invoices", "bills", "payments", "banking", "inventory", "accounts", "reports", "customers", "taxes", "admin"];

describe("savaRoles", () => {
  it("has the 8 roles, each with a prefill", () => {
    expect(SAVA_ROLES).toHaveLength(8);
    for (const r of SAVA_ROLES) expect(SAVA_PREFILL[r]).toBeTruthy();
  });

  it("returns null for no or unknown roles", () => {
    expect(savaPrefill([], KEYS)).toBeNull();
    expect(savaPrefill(["Nope"], KEYS)).toBeNull();
  });

  it("Store Keeper: Books Manager, inventory only", () => {
    const p = savaPrefill(["Store Keeper"], KEYS);
    expect(p.role).toBe("Books Manager");
    expect(Object.keys(p.modules).filter((k) => p.modules[k])).toEqual(["inventory"]);
  });

  it("Project Manager: Books Manager, inventory only", () => {
    const p = savaPrefill(["Project Manager"], KEYS);
    expect(p.role).toBe("Books Manager");
    expect(Object.keys(p.modules).filter((k) => p.modules[k])).toEqual(["inventory"]);
  });

  it("Director: Books Admin, every module", () => {
    const p = savaPrefill(["Director"], KEYS);
    expect(p.role).toBe("Books Admin");
    expect(Object.keys(p.modules).filter((k) => p.modules[k])).toEqual(KEYS);
  });

  it("several roles: strongest Books role, union of modules", () => {
    const p = savaPrefill(["Finance", "Accounts Officer"], KEYS);
    expect(p.role).toBe("Accountant");
    expect(Object.keys(p.modules).filter((k) => p.modules[k]).sort())
      .toEqual(["bills", "customers", "payments", "reports"]);
    expect(savaPrefill(["Director", "Store Keeper"], KEYS).role).toBe("Books Admin");
    expect(savaPrefill(["Finance", "Store Keeper"], KEYS).role).toBe("Books Manager");
  });

  it("never grants taxes, admin, invoices, banking or accounts", () => {
    const p = savaPrefill(SAVA_ROLES.filter((r) => r !== "Director"), KEYS);
    for (const k of ["taxes", "admin", "invoices", "banking", "accounts"]) expect(p.modules[k]).toBe(false);
  });

  it("sameRoles ignores order", () => {
    expect(sameRoles(["a", "b"], ["b", "a"])).toBe(true);
    expect(sameRoles(["a"], ["a", "b"])).toBe(false);
    expect(sameRoles(undefined, [])).toBe(true);
  });
});