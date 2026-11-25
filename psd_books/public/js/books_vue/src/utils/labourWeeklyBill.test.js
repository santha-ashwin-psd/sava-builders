import { describe, it, expect } from "vitest";
import {
	mondayISO, sundayISO, weekLabel, matchesFilter, countsFor, lockedRows, matchesSearch, mergeRows, totalOf, rowError, billBlockers,
	validateBill, actionState, canDelete, toDoc, contractsLabel, isFullyPaid, visibleRows, projectsLabel, isPastWeek, pastLocked, inProject, kpiFor, cleanAmount, canPrint, printHtml, longDate,
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
	it("moves any day to Saturday and Friday", () => {
		for (const d of ["2026-11-14", "2026-11-18", "2026-11-20"]) { expect(mondayISO(d)).toBe("2026-11-14"); expect(sundayISO(d)).toBe("2026-11-20"); }
		expect(mondayISO("2026-11-21")).toBe("2026-11-21");
	});
	it("handles month and year ends", () => {
		expect(mondayISO("2027-01-01")).toBe("2026-12-26");
		expect(sundayISO("2027-01-01")).toBe("2027-01-01");
		expect(weekLabel("2027-01-01")).toBe("26 Dec to 1 Jan 2027");
	});
	it("labels a week", () => { expect(weekLabel("2026-11-18")).toBe("14 Nov to 20 Nov 2026"); expect(weekLabel("")).toBe(""); });
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

describe("lockedRows", () => {
	it("keeps only the contracts being paid on a locked bill", () => {
		const rows = [{ contract: "A", amount_to_pay: 0 }, { contract: "B", amount_to_pay: 50000 }, { contract: "C", amount_to_pay: "" }];
		expect(lockedRows(rows).map((r) => r.contract)).toEqual(["B"]);
	});
});

describe("list helpers", () => {
	const list = [{ name: "LWB-1", status: "Draft", project: "P1", week_start: "2026-11-16" }, { name: "LWB-2", status: "Sent back", project: "P1", week_start: "2026-11-09" },
		{ name: "LWB-3", status: "Pending approval", project: "P2", week_start: "2026-11-09" }, { name: "LWB-4", status: "Approved", project: "P2", week_start: "2026-11-02" }];
	it("counts, with Sent back under draft", () => { expect(countsFor(list)).toEqual({ all: 4, draft: 2, pending: 1, approved: 1, paid: 0, cancelled: 0 }); });
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
		for (const s of ["Draft", "Sent back"]) expect(actionState(s, true)).toEqual({ canEdit: true, canSend: true, canApprove: false, canSendBack: false, canMarkPaid: false, canReopen: false, canCancel: false, canMarkUnpaid: false, canAmend: false });
		expect(actionState("Pending approval", true)).toEqual({ canEdit: false, canSend: false, canApprove: true, canSendBack: true, canMarkPaid: false, canReopen: false, canCancel: false, canMarkUnpaid: false, canAmend: false });
		expect(actionState("Pending approval", false).canApprove).toBe(false);
		expect(actionState("Approved", true)).toEqual({ canEdit: false, canSend: false, canApprove: false, canSendBack: false, canMarkPaid: true, canReopen: true, canCancel: true, canMarkUnpaid: false, canAmend: false });
		expect(actionState("Approved", false).canReopen).toBe(false);
		expect(actionState("Paid", true).canMarkUnpaid).toBe(true);
		expect(actionState("Paid", false).canMarkUnpaid).toBe(false);
		expect(actionState("Paid", true).canCancel).toBe(false);
		expect(actionState("Cancelled", false).canAmend).toBe(true);
		expect(actionState("Approved", false).canMarkPaid).toBe(false);
		// Purchase Manager / Admin: Paid only, none of the Director buttons
		expect(actionState("Approved", false, true)).toEqual({ canEdit: false, canSend: false, canApprove: false, canSendBack: false, canMarkPaid: true, canReopen: false, canCancel: false, canMarkUnpaid: false, canAmend: false });
		expect(actionState("Paid", false, true).canMarkPaid).toBe(false);
		expect(actionState("Pending approval", false, true).canMarkPaid).toBe(false);
		expect(actionState("Paid", true).canMarkPaid).toBe(false);
	});
	it("cancelled bills can be deleted, sent ones not", () => {
		expect(canDelete({ status: "Cancelled", raised_by: "a@x" })).toBe(true);
		expect(canDelete({ status: "Paid", raised_by: "a@x" })).toBe(false);
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
		expect(isPastWeek("2026-11-20", "2026-11-23")).toBe(true);
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

describe("inProject and kpiFor", () => {
	const bills = [
		{ name: "B1", status: "Approved", project: "", week_start: "2026-11-23", total_amount: 20000 },
		{ name: "B2", status: "Draft", project: "", week_start: "2026-11-24", total_amount: 5000 },
		{ name: "B3", status: "Sent back", project: "", week_start: "2026-11-25", total_amount: 7000 },
		{ name: "B4", status: "Pending approval", project: "", week_start: "2026-11-16", total_amount: 3000 },
		{ name: "B5", status: "Paid", project: "", week_start: "2026-11-23", total_amount: 8000 },
		{ name: "B6", status: "Cancelled", project: "", week_start: "2026-11-23", total_amount: 9000 },
	];
	it("matches a project through the bill or its contracts", () => {
		const cols = { B1: { projects: ["P1"] }, B2: { projects: ["P2"] } };
		expect(inProject(bills[0], "", cols)).toBe(true);
		expect(inProject(bills[0], "P1", cols)).toBe(true);
		expect(inProject(bills[1], "P1", cols)).toBe(false);
		expect(inProject({ name: "X", project: "P1" }, "P1", {})).toBe(true);
		expect(inProject(bills[2], "P1", {})).toBe(false);
	});
	it("totals per group, this week and paid", () => {
		const k = kpiFor(bills, "2026-11-24");
		expect(k.all).toEqual({ n: 5, value: 43000 });
		expect(k.draft).toEqual({ n: 2, value: 12000 });
		expect(k.pending).toEqual({ n: 1, value: 3000 });
		expect(k.approved).toEqual({ n: 1, value: 20000 });
		expect(k.paid).toBe(8000);
		expect(k.paidBills).toEqual({ n: 1, value: 8000 });
		expect(k.weekN).toBe(3);
		expect(k.weekValue).toBe(33000);
	});
	it("handles an empty list", () => {
		const k = kpiFor([], "2026-11-24");
		expect(k.all.n).toBe(0);
		expect(k.weekValue).toBe(0);
	});
});
describe("amount to pay input", () => {
	it("keeps digits and one decimal point only", () => {
		expect(cleanAmount("kjjkuhjuhhiuuhuhu")).toBe("");
		expect(cleanAmount("12ab3")).toBe("123");
		expect(cleanAmount("1,500")).toBe("1500");
		expect(cleanAmount("-5")).toBe("5");
		expect(cleanAmount("12.5")).toBe("12.5");
		expect(cleanAmount("1.2.3")).toBe("1.2");
		expect(cleanAmount("5.")).toBe("5.");
		expect(cleanAmount(550)).toBe("550");
		expect(cleanAmount(null)).toBe("");
		expect(Number(cleanAmount("5."))).toBe(5);
	});
});
describe("print (after approval only)", () => {
	it("is offered for Approved and Paid bills only", () => {
		for (const s of ["Approved", "Paid"]) expect(canPrint(s)).toBe(true);
		for (const s of ["Draft", "Sent back", "Pending approval", "Cancelled", "", undefined]) expect(canPrint(s)).toBe(false);
	});
	it("formats a date or datetime", () => {
		expect(longDate("2026-11-24 15:30:00")).toBe("24 Nov 2026");
		expect(longDate("")).toBe("");
		expect(longDate(null)).toBe("");
	});
	const bill = { name: "01", status: "Paid", week_date: "2026-11-23", approved_by: "Director", approved_on: "2026-11-24 10:00:00", paid_by: "Director", paid_on: "2026-11-24" };
	const lines = [{ contract: "01", contractor: "Kamau <b>", activity: "Tiles", project: "PS Digitise", contract_value: 50000, paid_till_now: 0, balance: 50000, amount_to_pay: 4000 },
		{ contract: "02", contractor: "Otieno", activity: "Paint", project: "PSD", contract_value: 300000, paid_till_now: 1000, balance: 299000, amount_to_pay: "1500" }];
	it("shows the week, every line, the total and the approval", () => {
		const h = printHtml(bill, lines);
		expect(h).toContain("WEEKLY BILL 01");
		expect(h).toContain("21 Nov to 27 Nov 2026");
		expect(h).toContain("Tiles");
		expect(h).toContain("<b>5,500</b>");
		expect(h).toContain("300,000");
		expect(h).toContain("Approved by Director on 24 Nov 2026.");
		expect(h).toContain("Paid by Director on 24 Nov 2026.");
	});
	it("escapes names and omits the paid note on an Approved bill", () => {
		const h = printHtml({ ...bill, status: "Approved" }, lines);
		expect(h).toContain("Kamau &lt;b&gt;");
		expect(h).not.toContain("Kamau <b>");
		expect(h).not.toContain("Paid by");
	});
});