import { describe, it, expect } from "vitest";
import {
	saturdayISO, fridayISO, weekLabel, weekTitleDates, ordinal, dayDates, daysOf, figures, totalsOf, mergeRows, rowError,
	sheetBlockers, validateSheet, matchesFilter, countsFor, kpiFor, matchesSearch, actionState, canDelete, amendedNames, toDoc, printHtml, DAYS, cleanNumber,
} from "./labourAttendance.js";

const row = (days = 7, o = {}) => ({
	employee: "E1", employee_name: "Ann", id_no: "40528637", grade: "C", area_of_work: "Casting", rate: 660, ot_hours: 0, sha: 125,
	...Object.fromEntries(DAYS.map((d, i) => [d.key, i < days ? 1 : 0])), ...o,
});

describe("weeks (Saturday to Friday)", () => {
	it("moves any day to the Saturday and Friday", () => {
		for (const d of ["2026-10-24", "2026-10-25", "2026-10-26", "2026-10-28", "2026-10-30"]) { expect(saturdayISO(d)).toBe("2026-10-24"); expect(fridayISO(d)).toBe("2026-10-30"); }
		expect(saturdayISO("2026-10-31")).toBe("2026-10-31");
	});
	it("handles month and year ends", () => {
		expect(saturdayISO("2027-01-01")).toBe("2026-12-26");
		expect(fridayISO("2027-01-01")).toBe("2027-01-01");
		expect(weekLabel("2026-10-27")).toBe("24 Oct to 30 Oct 2026");
		expect(weekLabel("2026-12-30")).toBe("26 Dec to 1 Jan 2027");
	});
	it("titles and day labels like the paper sheet", () => {
		expect(weekTitleDates("2026-10-27")).toBe("24/10/26 TO 30/10/26");
		expect(dayDates("2026-10-27")).toEqual(["24TH", "25TH", "26TH", "27TH", "28TH", "29TH", "30TH"]);
		expect(dayDates("2026-10-31")).toEqual(["31ST", "1ST", "2ND", "3RD", "4TH", "5TH", "6TH"]);
		expect(ordinal(11)).toBe("11TH"); expect(ordinal(22)).toBe("22ND"); expect(ordinal(13)).toBe("13TH");
	});
});

describe("figures", () => {
	it("matches the rows of the client's sheet", () => {
		const cases = [[7, 660, 0, 0, 4495], [7, 600, 0, 0, 4075], [5, 600, 0, 0, 2875], [6, 550, 0, 0, 3175], [5, 660, 1, 82.5, 3258],
			[5, 600, 6, 450, 3325], [4, 600, 0, 0, 2275], [5, 750, 0, 0, 3625], [7, 660, 3, 247.5, 4743], [5, 660, 0, 0, 3175]];
		for (const [d, rate, ot, ota, total] of cases) {
			const f = figures(row(d, { rate, ot_hours: ot }));
			expect([f.days, f.otAmount, f.total]).toEqual([d, ota, total]);
		}
	});
	it("rounds half up to the shilling and OT to 2 decimals", () => {
		expect(figures(row(1, { rate: 100, sha: 0.5 })).total).toBe(100);
		expect(figures(row(7, { rate: 650, ot_hours: 0.5 })).otAmount).toBe(40.63);
	});
	it("pays nothing and takes no SHA with no days and no OT", () => {
		expect(figures(row(0)).total).toBe(0);
		expect(figures(row(0, { rate: 800, ot_hours: 8 })).total).toBe(675);
	});
	it("counts ticks only", () => { expect(daysOf(row(3))).toBe(3); expect(daysOf({ d_sat: "1", d_sun: 0 })).toBe(1); });
	it("totals the week", () => {
		const t = totalsOf([row(7), row(5, { employee: "E2", ot_hours: 1 }), row(0, { employee: "E3" })]);
		expect(t.employees).toBe(2); expect(t.days).toBe(12); expect(t.sha).toBe(250); expect(t.total).toBe(4495 + 3258);
	});
});

describe("mergeRows", () => {
	const base = [row(0, { employee: "E1", employee_name: "Ann", rate: 0 }), row(0, { employee: "E2", employee_name: "Bob", rate: 0 })];
	it("keeps typed values and adds a new employee", () => {
		const { rows, added } = mergeRows(base, [row(5, { employee: "E1", rate: 700, area_of_work: "Mason" })]);
		expect(rows.map((r) => r.employee)).toEqual(["E1", "E2"]);
		expect([daysOf(rows[0]), rows[0].rate, rows[0].area_of_work]).toEqual([5, 700, "Mason"]);
		expect(added).toEqual(["Bob"]);
	});
	it("does not report 'added' for a brand new sheet", () => { expect(mergeRows(base, []).added).toEqual([]); });
	it("drops an inactive employee without days, keeps one with days", () => {
		const cur = [row(0, { employee: "E8", employee_name: "Gone" }), row(2, { employee: "E9", employee_name: "Left" })];
		expect(mergeRows(base, cur).rows.map((r) => r.employee).sort()).toEqual(["E1", "E2", "E9"]);
	});
});

describe("blockers and errors", () => {
	it("needs someone ticked", () => { expect(sheetBlockers([row(0)])).toHaveLength(1); });
	it("needs a rate for a paid employee only", () => {
		const out = sheetBlockers([row(3, { rate: 0 }), row(0, { employee: "E2", rate: 0 })]);
		expect(out).toHaveLength(1); expect(out[0]).toContain("Ann");
	});
	it("blocks a total below zero and negative inputs", () => {
		expect(rowError(row(1, { rate: 100, sha: 125 }))).toBe("SHA is more than the wage");
		expect(rowError(row(1, { rate: -1 }))).toBe("Rate can't be negative");
		expect(rowError(row(1, { ot_hours: -1 }))).toBe("OT hours can't be negative");
		expect(rowError(row(1, { sha: -1 }))).toBe("SHA can't be negative");
		expect(rowError(row(6))).toBe("");
	});
	it("passes a good sheet", () => { expect(sheetBlockers([row(6), row(0, { employee: "E2", rate: 0 })])).toEqual([]); });
	it("validates the form", () => {
		expect(validateSheet({ week_date: "" }, [row()]).week_date).toBeTruthy();
		expect(validateSheet({ week_date: "2026-10-24" }, []).week_date).toBeTruthy();
		expect(validateSheet({ week_date: "2026-10-24" }, [row()])).toEqual({});
	});
});

describe("list and actions", () => {
	const list = [{ name: "A", status: "Draft" }, { name: "B", status: "Sent back" }, { name: "C", status: "Pending approval" }, { name: "D", status: "Approved" }, { name: "E", status: "Submitted" }];
	it("filters and counts", () => {
		expect(countsFor(list)).toEqual({ all: 5, draft: 2, pending: 1, approved: 1, submitted: 1, cancelled: 0 });
		expect(list.filter((s) => matchesFilter(s, "draft")).map((s) => s.name)).toEqual(["A", "B"]);
	});
	it("searches name, status and week", () => {
		expect(matchesSearch({ name: "LAS-2026-0001", status: "Draft", week_start: "2026-10-24" }, "oct")).toBe(true);
		expect(matchesSearch({ name: "LAS-2026-0001", status: "Draft", week_start: "2026-10-24" }, "nov")).toBe(false);
	});
	it("buttons by status", () => {
		expect(actionState("Draft", false)).toEqual({ canEdit: true, canSend: true, canApprove: false, canSendBack: false, canSubmit: false, canCancel: false, canAmend: false });
		expect(actionState("Pending approval", true).canApprove).toBe(true);
		expect(actionState("Pending approval", false).canApprove).toBe(false);
		expect(actionState("Approved", false)).toEqual({ canEdit: false, canSend: false, canApprove: false, canSendBack: false, canSubmit: true, canCancel: false, canAmend: false });
		expect(actionState("Submitted", true)).toEqual({ canEdit: false, canSend: false, canApprove: false, canSendBack: false, canSubmit: false, canCancel: true, canAmend: false });
	});
	it("delete only while never sent", () => {
		expect(canDelete({ status: "Draft", raised_by: "" })).toBe(true);
		expect(canDelete({ status: "Draft", raised_by: "a@x" })).toBe(false);
		expect(canDelete({ status: "Sent back" })).toBe(false);
	});
});

describe("toDoc and print", () => {
	it("sends only the typed values", () => {
		const d = toDoc({ name: "LAS-1", week_date: "2026-10-27" }, [row(2, { rate: "700", ot_hours: "", employee_name: "Ann" })], "CO");
		expect(d.week_start).toBe("2026-10-27"); expect(d.name).toBe("LAS-1"); expect(d.company).toBe("CO");
		expect(d.lines[0]).toEqual({ employee: "E1", grade: "C", area_of_work: "Casting", d_sat: 1, d_sun: 1, d_mon: 0, d_tue: 0, d_wed: 0, d_thu: 0, d_fri: 0, rate: 700, ot_hours: 0, sha: 125 });
		expect(toDoc({ week_date: "2026-10-27" }, [], "CO").name).toBeUndefined();
	});
	it("prints the paper layout", () => {
		const h = printHtml("2026-10-27", [row(5, { ot_hours: 1, employee_name: "A <b>" })]);
		expect(h).toContain("WEEKLY WAGES PAYMENT SHEET 24/10/26 TO 30/10/26");
		expect(h).toContain("24TH"); expect(h).toContain("SIGNATURE"); expect(h).toContain("A &lt;b&gt;");
		expect(h).toContain("<b>3,258</b>"); expect(h).toContain("82.5");
	});
});

describe("kpiFor", () => {
	const s = (status, week_start, total_amount) => ({ status, week_start, total_amount });
	const list = [
		s("Draft", "2026-11-21", 999), s("Sent back", "2026-11-14", 500), s("Pending approval", "2026-11-14", 4000),
		s("Approved", "2026-11-07", 3000), s("Submitted", "2026-10-31", 2000), s("Submitted", "2026-10-24", 1000),
	];
	it("counts and totals each group", () => {
		const k = kpiFor(list, "2026-11-24");
		expect(k.all).toEqual({ n: 6, value: 11499 });
		expect(k.pending).toEqual({ n: 1, value: 4000 });
		expect(k.approved).toEqual({ n: 1, value: 3000 });
		expect(k.submitted).toEqual({ n: 2, value: 3000 });
	});
	it("sums only Submitted sheets of the current month", () => {
		expect(kpiFor(list, "2026-11-24").monthValue).toBe(0);
		expect(kpiFor(list, "2026-10-05").monthValue).toBe(3000);
		expect(kpiFor(list, "2026-09-01").monthValue).toBe(0);
	});
	it("takes the newest Submitted week", () => {
		expect(kpiFor(list, "2026-11-24").latest).toEqual({ week_start: "2026-10-31", value: 2000 });
		expect(kpiFor([s("Draft", "2026-11-21", 5)], "2026-11-24").latest).toBeNull();
	});
	it("handles an empty list", () => {
		const k = kpiFor([], "2026-11-24");
		expect(k.all.n).toBe(0); expect(k.monthValue).toBe(0); expect(k.latest).toBeNull();
	});
});


describe("cancel, amend, delete", () => {
	it("cancel is for a Director on Sent back, Approved or Submitted", () => {
		for (const st of ["Sent back", "Approved", "Submitted"]) { expect(actionState(st, true).canCancel).toBe(true); expect(actionState(st, false).canCancel).toBe(false); }
		for (const st of ["Draft", "Pending approval", "Cancelled"]) expect(actionState(st, true).canCancel).toBe(false);
	});
	it("a cancelled sheet is locked and can be amended", () => {
		const a = actionState("Cancelled", true);
		expect(a).toEqual({ canEdit: false, canSend: false, canApprove: false, canSendBack: false, canSubmit: false, canCancel: false, canAmend: true });
		expect(actionState("Approved", true).canAmend).toBe(false);
	});
	it("a cancelled sheet is deleted only while nothing amends it", () => {
		const list = [{ name: "A", status: "Cancelled" }, { name: "B", status: "Cancelled" }, { name: "C", status: "Draft", amends_sheet: "B" }];
		const am = amendedNames(list);
		expect(am.has("B")).toBe(true); expect(am.has("A")).toBe(false);
		expect(canDelete(list[0], am)).toBe(true); expect(canDelete(list[1], am)).toBe(false);
		expect(canDelete(list[2], am)).toBe(true);
		expect(canDelete({ status: "Approved", raised_by: "u" }, am)).toBe(false);
		expect(canDelete({ name: "A", status: "Cancelled" })).toBe(true);
	});
	it("All lists Cancelled too; Cancelled has its own filter and count", () => {
		const list = [{ status: "Draft" }, { status: "Approved" }, { status: "Cancelled" }, { status: "Cancelled" }];
		expect(countsFor(list)).toEqual({ all: 4, draft: 1, pending: 0, approved: 1, submitted: 0, cancelled: 2 });
		expect(list.filter((s) => matchesFilter(s, "all")).length).toBe(4);
		expect(list.filter((s) => matchesFilter(s, "cancelled")).length).toBe(2);
	});
	it("cards leave out Cancelled sheets", () => {
		const k = kpiFor([{ status: "Submitted", week_start: "2026-11-14", total_amount: 100 }, { status: "Cancelled", week_start: "2026-11-21", total_amount: 900 }], "2026-11-24");
		expect(k.all).toEqual({ n: 1, value: 100 }); expect(k.monthValue).toBe(100); expect(k.latest).toEqual({ week_start: "2026-11-14", value: 100 });
	});
});
describe("rate / OT hours / SHA input", () => {
	it("keeps digits and one decimal point only", () => {
		expect(cleanNumber("afd0")).toBe("0");
		expect(cleanNumber("abc")).toBe("");
		expect(cleanNumber("1,250")).toBe("1250");
		expect(cleanNumber("-3")).toBe("3");
		expect(cleanNumber("2.5")).toBe("2.5");
		expect(cleanNumber("1.2.3")).toBe("1.2");
		expect(cleanNumber(125)).toBe("125");
		expect(cleanNumber(null)).toBe("");
	});
});