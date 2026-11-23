import { describe, it, expect } from "vitest";
import {
	statusClass, isLocked, fmtKES, matchesFilter, countsFor, matchesSearch, blockersFor, validateContract, actionState, canDelete,
} from "./labourContract.js";

const list = [
	{ name: "LC-2026-0001", project: "P1", activity: "ACT-001", contractor: "LCON-00001", status: "Approved", contract_value: 500000 },
	{ name: "LC-2026-0002", project: "P1", activity: "ACT-002", contractor: "LCON-00002", status: "Draft", contract_value: 750000 },
	{ name: "LC-2026-0003", project: "P1", activity: "ACT-003", contractor: "LCON-00003", status: "Closed", contract_value: 100000 },
	{ name: "LC-2026-0004", project: "P2", activity: "ACT-001", contractor: "LCON-00004", status: "Sent back", contract_value: 10 },
	{ name: "LC-2026-0005", project: "P2", activity: "ACT-002", contractor: "LCON-00005", status: "Pending approval", contract_value: 10 },
];
const good = { name: "", project: "P1", activity: "ACT-004", contractor: "LCON-00009", start_date: "2026-11-09", end_date: "2027-01-31", contract_value: 500000 };
const ctr = { name: "LCON-00009", contractor_name: "Kamau", disabled: 0, tax_cert_expiry: "2027-03-31" };

describe("status helpers", () => {
	it("locks Pending approval, Approved and Closed only", () => {
		for (const s of ["Pending approval", "Approved", "Closed"]) expect(isLocked(s)).toBe(true);
		for (const s of ["Draft", "Sent back"]) expect(isLocked(s)).toBe(false);
	});
	it("colours", () => { expect(statusClass("Approved")).toBe("green"); expect(statusClass("Sent back")).toBe("red"); });
	it("formats KES without decimals", () => { expect(fmtKES(500000)).toBe("500,000"); expect(fmtKES(null)).toBe("0"); });
});

describe("filters, counts, search", () => {
	it("counts, with Sent back under draft", () => {
		expect(countsFor(list)).toEqual({ all: 5, draft: 2, pending: 1, approved: 1, closed: 1 });
	});
	it("searches number, status and readable names", () => {
		const names = { contractor: { "LCON-00001": "Kamau Painters" }, activity: { "ACT-001": "Painting house" }, project: { P1: "AJ-005 build" } };
		expect(list.filter((c) => matchesSearch(c, "kamau", names)).length).toBe(1);
		expect(list.filter((c) => matchesSearch(c, "painting", names)).length).toBe(2);
		expect(list.filter((c) => matchesSearch(c, "0003")).length).toBe(1);
		expect(list.filter((c) => matchesSearch(c, "closed")).length).toBe(1);
		expect(list.filter((c) => matchesSearch(c, "")).length).toBe(5);
	});
});

describe("blockers (send / approve)", () => {
	it("none for a clean contract", () => { expect(blockersFor(good, ctr, list, "2026-11-14")).toEqual([]); });
	it("expired certificate", () => {
		expect(blockersFor(good, { ...ctr, tax_cert_expiry: "2026-09-30" }, list, "2026-11-14")[0]).toMatch(/Certificate expired on 2026-09-30/);
	});
	it("certificate expiring today is still valid", () => {
		expect(blockersFor(good, { ...ctr, tax_cert_expiry: "2026-11-14" }, list, "2026-11-14")).toEqual([]);
	});
	it("inactive contractor and no contractor", () => {
		expect(blockersFor(good, { ...ctr, disabled: 1 }, list, "2026-11-14").length).toBe(1);
		expect(blockersFor(good, undefined, list, "2026-11-14")[0]).toMatch(/Choose a contractor/);
	});
	it("a contractor with other open contracts is not blocked", () => {
		for (const c of ["LCON-00001", "LCON-00005", "LCON-00002"]) expect(blockersFor({ ...good, contractor: c }, ctr, list, "2026-11-14")).toEqual([]);
	});
	it("value must be above zero", () => {
		expect(blockersFor({ ...good, contract_value: 0 }, ctr, list, "2026-11-14")[0]).toMatch(/contract value/);
	});
});

describe("validateContract (save)", () => {
	it("accepts a good draft, with a zero value", () => {
		expect(validateContract(good, list)).toEqual({});
		expect(validateContract({ ...good, contract_value: 0 }, list)).toEqual({});
	});
	it("requires the fields", () => {
		expect(Object.keys(validateContract({}, list)).sort()).toEqual(["activity", "contract_value", "contractor", "end_date", "project", "start_date"]);
	});
	it("end date can't be before start; same day is fine", () => {
		expect(validateContract({ ...good, end_date: "2026-11-01" }, list).end_date).toBeTruthy();
		expect(validateContract({ ...good, end_date: "2026-11-09" }, list)).toEqual({});
	});
	it("rejects a negative value", () => { expect(validateContract({ ...good, contract_value: -1 }, list).contract_value).toBeTruthy(); });
	it("an activity is used on one contract only: any project, Closed included", () => {
		expect(validateContract({ ...good, activity: "ACT-001" }, list).activity).toMatch(/LC-2026-0001/);
		expect(validateContract({ ...good, activity: "ACT-003" }, list).activity).toMatch(/LC-2026-0003/); // Closed still locks it
		expect(validateContract({ ...good, project: "P3", activity: "ACT-001" }, list).activity).toBeTruthy(); // other project too
		expect(validateContract({ ...good, activity: "ACT-009" }, list)).toEqual({});
		expect(validateContract({ ...good, name: "LC-2026-0001", activity: "ACT-001" }, list, "LC-2026-0001")).toEqual({}); // keeps its own
	});
	it("an existing contract that already shares an activity can still be edited, but not switched to a used one", () => {
		// LC-2026-0004 (P2) shares ACT-001 with LC-2026-0001 in the old data
		expect(validateContract({ ...good, name: "LC-2026-0004", activity: "ACT-001" }, list, "LC-2026-0004")).toEqual({});
		expect(validateContract({ ...good, name: "LC-2026-0004", activity: "ACT-002" }, list, "LC-2026-0004").activity).toBeTruthy();
	});
});

describe("actions and delete", () => {
	it("Draft and Sent back: edit and send only", () => {
		for (const s of ["Draft", "Sent back"]) expect(actionState(s, true)).toEqual({ canEdit: true, canSend: true, canApprove: false, canSendBack: false, canClose: false, canReopen: false });
	});
	it("Pending approval: only a Director approves or sends back", () => {
		expect(actionState("Pending approval", true)).toMatchObject({ canEdit: false, canApprove: true, canSendBack: true });
		expect(actionState("Pending approval", false)).toMatchObject({ canApprove: false, canSendBack: false });
	});
	it("Approved: close only; Closed: only a Director can reopen", () => {
		expect(actionState("Approved", true)).toMatchObject({ canEdit: false, canClose: true, canApprove: false, canReopen: false });
		expect(actionState("Closed", true)).toEqual({ canEdit: false, canSend: false, canApprove: false, canSendBack: false, canClose: false, canReopen: true });
		expect(Object.values(actionState("Closed", false)).some(Boolean)).toBe(false);
	});
	it("delete only a Draft that was never sent", () => {
		expect(canDelete({ status: "Draft", raised_by: "" })).toBe(true);
		expect(canDelete({ status: "Draft", raised_by: "a@x" })).toBe(false);
		expect(canDelete({ status: "Sent back", raised_by: "a@x" })).toBe(false);
		expect(canDelete({ status: "Approved", raised_by: "a@x" }, true)).toBe(false);
		expect(canDelete({ status: "Closed", raised_by: "a@x" }, true)).toBe(true);
		expect(canDelete({ status: "Closed", raised_by: "a@x" }, false)).toBe(false);
		expect(canDelete({ status: "Closed", raised_by: "a@x" })).toBe(false);
	});
});