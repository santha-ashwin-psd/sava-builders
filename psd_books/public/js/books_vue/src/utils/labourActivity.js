// Helpers for the Labour Contract > Activities screen (pages/Activities.vue).
// Kept free of Vue so they can be unit tested (labourActivity.test.js).
// Rules mirror the server (invoicing/doctype/labour_activity/labour_activity.py).

export const ACTIVITY_CATEGORIES = ["Finishing", "Structure", "Services", "Site works"];

// Code is letters, digits and dashes, e.g. ACT-004.
export const ACTIVITY_CODE_RE = /^[A-Z0-9][A-Z0-9-]*$/;

// Collapse runs of spaces, same as the server.
export function cleanName(v) {
	return String(v || "").split(/\s+/).filter(Boolean).join(" ");
}

// Next free ACT-### (highest existing number + 1), same as the server.
export function nextActivityCode(list = []) {
	let top = 0;
	for (const a of list) {
		const m = /^ACT-(\d+)$/.exec(String(a.name || a.activity_code || ""));
		if (m) top = Math.max(top, parseInt(m[1], 10));
	}
	return "ACT-" + String(top + 1).padStart(3, "0");
}

// Filter keys: all | active | inactive.
export function matchesFilter(a, key) {
	if (key === "active") return !a.disabled;
	if (key === "inactive") return !!a.disabled;
	return true;
}

export function countsFor(list) {
	const out = { all: list.length, active: 0, inactive: 0 };
	for (const a of list) {
		if (matchesFilter(a, "active")) out.active++;
		if (matchesFilter(a, "inactive")) out.inactive++;
	}
	return out;
}

export function matchesSearch(a, q) {
	const s = String(q || "").trim().toLowerCase();
	if (!s) return true;
	return [a.activity_name, a.name, a.category]
		.some((v) => String(v || "").toLowerCase().includes(s));
}

// What the "Used on" column shows. `usage` maps activity code -> text (for example "Contract 02").
// It stays empty until the Contract step exists, so every activity reads "Not used".
export function usedOnText(a, usage = {}) {
	return (usage && usage[a.name]) || "Not used";
}

// Builds the usage map for usedOnText from contract rows ({ name, activity }): activity code -> contract name.
export function buildUsage(contracts = []) {
	const out = {};
	for (const c of contracts || []) if (c && c.activity && !out[c.activity]) out[c.activity] = c.name;
	return out;
}

// Activities that can still be put on a contract: active, and not on any other contract.
// `keep` is the activity already on the contract being edited; it stays listed.
export function freeActivities(activities = [], contracts = [], editingName = "", keep = "") {
	const taken = new Set((contracts || []).filter((c) => c.name !== editingName).map((c) => c.activity));
	return (activities || []).filter((a) => a.name === keep || (!a.disabled && !taken.has(a.name)));
}

// Returns { field: message }. `list` = loaded activities, `editingName` = code being edited ("" for new).
export function validateActivity(form, list = [], editingName = "") {
	const e = {};
	const code = String(form.activity_code || "").trim().toUpperCase();
	const name = cleanName(form.activity_name);
	if (!editingName) {
		if (!code) e.activity_code = "Code is required";
		else if (!ACTIVITY_CODE_RE.test(code)) e.activity_code = "Invalid code. Use letters, digits and dashes, e.g. ACT-004";
		else if (list.some((a) => String(a.name || "").toUpperCase() === code)) e.activity_code = "Code " + code + " already exists";
	}
	if (!name) e.activity_name = "Activity name is required";
	else {
		const dup = list.find((a) => cleanName(a.activity_name).toLowerCase() === name.toLowerCase() && a.name !== editingName);
		if (dup) e.activity_name = "An activity named " + name + " already exists (" + dup.name + ")";
	}
	if (!ACTIVITY_CATEGORIES.includes(form.category)) e.category = "Choose a category";
	return e;
}