import { describe, it, expect } from "vitest";
import {
	ACTIVITY_CATEGORIES, ACTIVITY_CODE_RE, cleanName, nextActivityCode, matchesFilter, countsFor, matchesSearch,
	usedOnText, validateActivity, buildUsage, freeActivities,
} from "./labourActivity.js";

const list = [
	{ name: "ACT-001", activity_name: "Painting house", category: "Finishing", disabled: 0 },
	{ name: "ACT-002", activity_name: "Blockwork", category: "Structure", disabled: 0 },
	{ name: "ACT-003", activity_name: "Plastering", category: "Finishing", disabled: 1 },
];
const ok = { activity_code: "ACT-004", activity_name: "Tiling", category: "Finishing" };

describe("code and name helpers", () => {
	it("accepts letters, digits and dashes only", () => {
		for (const good of ["ACT-004", "A1", "PLUMB-2"]) expect(ACTIVITY_CODE_RE.test(good)).toBe(true);
		for (const bad of ["-ACT", "act-1", "ACT 4", "ACT_4", ""]) expect(ACTIVITY_CODE_RE.test(bad)).toBe(false);
	});
	it("suggests highest number + 1, zero padded", () => {
		expect(nextActivityCode(list)).toBe("ACT-004");
		expect(nextActivityCode([])).toBe("ACT-001");
		expect(nextActivityCode([{ name: "ACT-009" }, { name: "CUSTOM" }])).toBe("ACT-010");
		expect(nextActivityCode([{ name: "ACT-999" }])).toBe("ACT-1000");
	});
	it("collapses spaces in names", () => { expect(cleanName("  Paint   house ")).toBe("Paint house"); });
});

describe("filters, counts, search", () => {
	it("counts active and inactive", () => { expect(countsFor(list)).toEqual({ all: 3, active: 2, inactive: 1 }); });
	it("filters", () => {
		expect(list.filter((a) => matchesFilter(a, "active")).map((a) => a.name)).toEqual(["ACT-001", "ACT-002"]);
		expect(list.filter((a) => matchesFilter(a, "inactive")).map((a) => a.name)).toEqual(["ACT-003"]);
		expect(list.filter((a) => matchesFilter(a, "all")).length).toBe(3);
	});
	it("searches code, name and category", () => {
		expect(list.filter((a) => matchesSearch(a, "block")).length).toBe(1);
		expect(list.filter((a) => matchesSearch(a, "act-003")).length).toBe(1);
		expect(list.filter((a) => matchesSearch(a, "finishing")).length).toBe(2);
		expect(list.filter((a) => matchesSearch(a, "")).length).toBe(3);
	});
});

describe("used on", () => {
	it("reads Not used until contracts exist", () => { expect(usedOnText(list[0])).toBe("Not used"); expect(usedOnText(list[0], {})).toBe("Not used"); });
	it("shows the contract once one is supplied", () => { expect(usedOnText(list[1], { "ACT-002": "Contract 02" })).toBe("Contract 02"); });
});

describe("validateActivity", () => {
	it("passes a complete new activity", () => { expect(validateActivity(ok, list, "")).toEqual({}); });
	it("requires code, name and category", () => {
		expect(Object.keys(validateActivity({}, list, "")).sort()).toEqual(["activity_code", "activity_name", "category"]);
	});
	it("rejects a bad code", () => { expect(validateActivity({ ...ok, activity_code: "ACT 4" }, list, "").activity_code).toMatch(/Invalid code/); });
	it("rejects a duplicate code, case-insensitive", () => {
		expect(validateActivity({ ...ok, activity_code: "act-002" }, list, "").activity_code).toMatch(/already exists/);
	});
	it("rejects a duplicate name, case-insensitive and ignoring extra spaces", () => {
		expect(validateActivity({ ...ok, activity_name: "  BLOCKWORK " }, list, "").activity_name).toMatch(/already exists \(ACT-002\)/);
		expect(validateActivity({ ...ok, activity_name: "painting   house" }, list, "").activity_name).toMatch(/ACT-001/);
	});
	it("allows keeping its own name when editing, and skips the code check", () => {
		expect(validateActivity({ activity_name: "Blockwork", category: "Structure" }, list, "ACT-002")).toEqual({});
	});
	it("still blocks another activity's name when editing", () => {
		expect(validateActivity({ activity_name: "Plastering", category: "Structure" }, list, "ACT-002").activity_name).toMatch(/ACT-003/);
	});
	it("rejects an unknown category", () => {
		expect(validateActivity({ ...ok, category: "Roofing" }, list, "").category).toBe("Choose a category");
		for (const c of ACTIVITY_CATEGORIES) expect(validateActivity({ ...ok, category: c }, list, "")).toEqual({});
	});
});

describe("buildUsage and freeActivities", () => {
	const contracts = [{ name: "LC-2026-0001", activity: "ACT-001" }, { name: "LC-2026-0002", activity: "ACT-002" }];
	it("maps activity to its contract, which usedOnText then shows", () => {
		const u = buildUsage(contracts);
		expect(u).toEqual({ "ACT-001": "LC-2026-0001", "ACT-002": "LC-2026-0002" });
		expect(usedOnText(list[0], u)).toBe("LC-2026-0001");
		expect(usedOnText({ name: "ACT-009" }, u)).toBe("Not used");
		expect(buildUsage()).toEqual({});
	});
	it("lists only active activities that are on no contract", () => {
		const acts = [...list, { name: "ACT-004", activity_name: "Tiling", disabled: 0 }];
		expect(freeActivities(acts, contracts).map((a) => a.name)).toEqual(["ACT-004"]);
	});
	it("keeps the activity of the contract being edited", () => {
		const acts = [...list, { name: "ACT-004", activity_name: "Tiling", disabled: 0 }];
		expect(freeActivities(acts, contracts, "LC-2026-0001", "ACT-001").map((a) => a.name)).toEqual(["ACT-001", "ACT-004"]);
		expect(freeActivities(acts, contracts, "LC-2026-0001").map((a) => a.name)).toEqual(["ACT-001", "ACT-004"]);
	});
});