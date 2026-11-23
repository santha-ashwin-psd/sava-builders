import { describe, it, expect } from "vitest";
import {
	mondayISO, sundayISO, weekLabel, matchesFilter, countsFor, matchesSearch, mergeRows, totalOf, rowError, billBlockers,
	validateBill, actionState, canDelete, toDoc, contractsLabel, isFullyPaid, visibleRows, projectsLabel, isPastWeek, pastLocked,
} from "./labourWeeklyBill.js";

const preview = [
	{ contract: "LC-1", contractor: "LCON-1", contract_value: 500000, paid_till_now: 0, pending_amount: 0, balance: 500000 },
	{ contract: "LC-2", contractor: "LCON-2", contract_value: 750000, paid_till_now: 270000, pending_amount: 30000, balance: 450000 },
];
const ctrs = [
	{ name: "LCON-1", contractor_name: "Kamau", disabled: 0, tax_cert_expiry: "2027-03-31" },
	{ name: "LCON-2", contractor_name: "Otieno", disabled: 0, tax_cert_expiry: "2026-09-30" },
];

describe("weeks", () => {
	it("moves any day to Monday and Sunday", () => {
		for (const d of ["2026-11-16", "2026-11-18", "2026-11-22"]) { expect(mondayISO(d)).toBe("2026-11-16"); expect(sundayISO(d)).toBe("2026-11-22"); }
		expect(mondayISO("2026-11-23")).toBe("2026-11-23");
	});
	it("handles month and year ends", () => {
		expect(mondayISO("2027-01-01")).toBe("2026-12-28");
		expect(sundayISO("2027-01-01")).toBe("2027-01-03");
		expect(weekLabel("2027-01-01")).toBe("28 Dec to 3 Jan 2027");
	});
	it("labels a week", () => { expect(weekLabel("2026-11-18")).toBe("16 Nov to 22 Nov 2026"); expect(weekLabel("")).toBe(""); });
});

describe("contract paid once a week", () => {
	it("clears the amount of a contract already paid this week on another bill", () => {
		const m = mergeRows([{ contract: "A", balance: 100, paid_this_week: "LWB-1" }, { contract: "B", balance: 100, paid_this_week: "" }], [{ contract: "A", amount_to_pay: 50 }, { contract: "B", amount_to_pay: 60 }]);
		expect(m.rows.map((r) => r.amount_to_pay)).toEqual(["", 60]);
		expect(m.dropped).toEqual([]);
	});
});

describe("fully paid contracts", () => {
	it("hides a contract with no balance and no amount", () => {
		const rows = [{ contract: "A", balance: 0, amount_to_pay: "" }, { contract: "B", balance: 56256, amount_to_pay: "" }, { contract: "C", balance: 0, amount_to_pay: 0 }];
		expect(visibleRows(rows).map((r) => r.contract)).toEqual(["B"]);
	});
	it("keeps a contract paid in full on this very bill", () => {
		expect(isFullyPaid({ balance: 30000, amount_to_pay: 30000 })).toBe(false);
		expect(isFullyPaid({ balance: 0, amount_to_pay: 500 })).toBe(false);
		expect(isFullyPaid({ balance: 0.004, amount_to_pay: "" })).toBe(true);
	});
});

describe("list helpers", () => {
	const list = [{ name: "LWB-1", status: "Draft", project: "P1", week_start: "2026-11-16" }, { name: "LWB-2", status: "Sent back", project: "P1", week_start: "2026-11-09" },
		{ name: "LWB-3", status: "Pending approval", project: "P2", week_start: "2026-11-09" }, { name: "LWB-4", status: "Approved", project: "P2", week_start: "2026-11-02" }];
	it("counts, with Sent back under draft", () => { expect(countsFor(list)).toEqual({ all: 4, draft: 2, pending: 1, approved: 1 }); });
	it("filters", () => { expect(list.filter((b) => matchesFilter(b, "draft")).length).toBe(2); expect(list.filter((b) => matchesFilter(b, "all")).length).toBe(4); });
	it("searches number, project name and week", () => {
		expect(list.filter((b) => matchesSearch(b, "aj-005", { P1: "AJ-005 build" })).length).toBe(2);
		expect(list.filter((b) => matchesSearch(b, "lwb-3")).length).toBe(1);
		expect(list.filter((b) => matchesSearch(b, "16 nov")).length).toBe(1);
	});
	it("searches contract numbers from the list columns", () => {
		const columns = { "LWB-3": { contracts: ["LC-7", "LC-8"], balance_after: 10 } };
		expect(list.filter((b) => matchesSearch(b, "lc-8", {}, columns)).map((b) => b.name)).toEqual(["LWB-3"]);
		expect(list.filter((b) => matchesSearch(b, "lc-8")).length).toBe(0);
	});
	it("labels the contracts column", () => {
		expect(contractsLabel([])).toBe("—");
		expect(contractsLabel(undefined)).toBe("—");
		expect(contractsLabel(["LC-1"])).toBe("LC-1");
		expect(contractsLabel(["LC-1", "LC-2"])).toBe("LC-1, LC-2");
		expect(contractsLabel(["LC-1", "LC-2", "LC-3", "LC-4"])).toBe("LC-1, LC-2 +2");
	});
});

describe("rows", () => {
	it("merges saved amounts into the preview rows", () => {
		const { rows, dropped } = mergeRows(preview, [{ contract: "LC-2", amount_to_pay: 100000 }]);
		expect(rows.map((r) => r.amount_to_pay)).toEqual(["", 100000]);
		expect(dropped).toEqual([]);
	});
	it("reports a saved amount whose contract is no longer listed, but not a zero one", () => {
		expect(mergeRows(preview, [{ contract: "LC-9", amount_to_pay: 5 }, { contract: "LC-8", amount_to_pay: 0 }]).dropped).toEqual(["LC-9"]);
	});
	it("totals", () => { expect(totalOf([{ amount_to_pay: 100 }, { amount_to_pay: "" }, { amount_to_pay: "50" }])).toBe(150); });
	it("row errors: within balance and equal are fine", () => {
		expect(rowError({ amount_to_pay: 500000, balance: 500000 })).toBe("");
		expect(rowError({ amount_to_pay: "", balance: 0 })).toBe("");
		expect(rowError({ amount_to_pay: 500001, balance: 500000 })).toMatch(/Above the balance of 500,000/);
		expect(rowError({ amount_to_pay: -1, balance: 5 })).toMatch(/negative/);
	});
});

describe("blockers", () => {
	const rows = (a1, a2) => preview.map((r, i) => ({ ...r, amount_to_pay: i ? a2 : a1 }));
	it("none for a clean bill", () => { expect(billBlockers(rows(1000, ""), ctrs, "2026-11-14")).toEqual([]); });
	it("needs an amount", () => { expect(billBlockers(rows("", ""), ctrs, "2026-11-14")[0]).toMatch(/at least one contract/); });
	it("expired certificate blocks only a paid line", () => {
		expect(billBlockers(rows(1000, 1000), ctrs, "2026-11-14")[0]).toMatch(/Certificate of Otieno expired on 2026-09-30/);
		expect(billBlockers(rows(1000, ""), ctrs, "2026-11-14")).toEqual([]);
	});
	it("inactive contractor and over-balance", () => {
		expect(billBlockers(rows(1000, ""), [{ ...ctrs[0], disabled: 1 }, ctrs[1]], "2026-11-14")[0]).toMatch(/inactive/);
		expect(billBlockers(rows(600000, ""), ctrs, "2026-11-14")[0]).toMatch(/Contract LC-1: Above the balance/);
	});
});

describe("validate, actions, payload", () => {
	it("needs a date and at least one contract row (no project is needed)", () => {
		expect(Object.keys(validateBill({}, []))).toEqual(["week_date"]);
		expect(validateBill({ week_date: "2026-11-16" }, []).week_date).toMatch(/no Approved contracts/);
		expect(validateBill({ week_date: "2026-11-16" }, preview)).toEqual({});
	});
	it("actions", () => {
		for (const s of ["Draft", "Sent back"]) expect(actionState(s, true)).toEqual({ canEdit: true, canSend: true, canApprove: false, canSendBack: false });
		expect(actionState("Pending approval", true)).toEqual({ canEdit: false, canSend: false, canApprove: true, canSendBack: true });
		expect(actionState("Pending approval", false).canApprove).toBe(false);
		expect(Object.values(actionState("Approved", true)).some(Boolean)).toBe(false);
	});
	it("delete only a Draft never sent", () => {
		expect(canDelete({ status: "Draft", raised_by: "" })).toBe(true);
		expect(canDelete({ status: "Draft", raised_by: "a@x" })).toBe(false);
		expect(canDelete({ status: "Sent back", raised_by: "a@x" })).toBe(false);
	});
	it("builds the saved document", () => {
		const d = toDoc({ name: "", week_date: "2026-11-18" }, [{ contract: "LC-1", amount_to_pay: "1500" }, { contract: "LC-2", amount_to_pay: "" }], "Sava");
		expect(d).toEqual({ doctype: "Labour Weekly Bill", company: "Sava", week_start: "2026-11-18",
			lines: [{ contract: "LC-1", amount_to_pay: 1500 }, { contract: "LC-2", amount_to_pay: 0 }] });
		expect(toDoc({ name: "LWB-1", week_date: "2026-11-18" }, [], "Sava").name).toBe("LWB-1");
	});
});
describe("project column", () => {
	const names = { P1: "Digitise", P2: "Tower" };
	it("shows project names of the paid contracts, else the saved project, else a dash", () => {
		expect(projectsLabel({ project: "" }, { projects: ["P1", "P2"] }, names)).toBe("Digitise, Tower");
		expect(projectsLabel({ project: "P1" }, {}, names)).toBe("Digitise");
		expect(projectsLabel({ project: "" }, undefined, names)).toBe("—");
		expect(projectsLabel({}, { projects: ["P1", "P2", "P3"] }, names)).toBe("Digitise, Tower +1");
	});
	it("search matches a project of the paid contracts", () => {
		expect(matchesSearch({ name: "LWB-1", project: "" }, "tower", names, { "LWB-1": { projects: ["P2"] } })).toBe(true);
		expect(matchesSearch({ name: "LWB-1", project: "" }, "tower", names, {})).toBe(false);
	});
});

describe("past weeks", () => {
	it("a week is past only when it ended before the current week", () => {
		expect(isPastWeek("2026-11-22", "2026-11-23")).toBe(true);
		expect(isPastWeek("2026-11-23", "2026-11-23")).toBe(false);
		expect(isPastWeek("2026-11-29", "2026-11-23")).toBe(false);
		expect(isPastWeek("", "2026-11-23")).toBe(false);
	});
});

describe("past week locks", () => {
	it("locks only contracts with payments, on a new bill of a past week", () => {
		const paid = { paid_till_now: 6000 }, fresh = { paid_till_now: 0 };
		expect(pastLocked(paid, "2026-11-16", true, "2026-11-23")).toBe(true);
		expect(pastLocked(fresh, "2026-11-16", true, "2026-11-23")).toBe(false);
		expect(pastLocked(paid, "2026-11-23", true, "2026-11-23")).toBe(false);  // current week
		expect(pastLocked(paid, "2026-11-16", false, "2026-11-23")).toBe(false);  // existing bill
	});
});