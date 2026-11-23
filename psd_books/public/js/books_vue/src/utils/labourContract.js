// Helpers for the Labour Contract > Contract screen (pages/Contract.vue).
// Kept free of Vue so they can be unit tested (labourContract.test.js).
// Rules mirror the server (invoicing/doctype/labour_contract/labour_contract.py); the server stays the authority.

import { todayISO, isCertExpired } from "./labourContractor.js";

export const DRAFT = "Draft", PENDING = "Pending approval", APPROVED = "Approved", SENT_BACK = "Sent back", CLOSED = "Closed";
export const STATUSES = [DRAFT, PENDING, APPROVED, SENT_BACK, CLOSED];
const LOCKED = [PENDING, APPROVED, CLOSED];

export function statusClass(s) {
	return { [DRAFT]: "amber", [PENDING]: "amber", [APPROVED]: "green", [SENT_BACK]: "red", [CLOSED]: "blue" }[s] || "blue";
}

export function isLocked(status) { return LOCKED.includes(status); }

export function fmtKES(v) { return Math.round(Number(v) || 0).toLocaleString("en-US"); }

// Filter keys: all | draft | pending | approved | closed (Sent back counts under draft: it is editable again).
export function matchesFilter(c, key) {
	if (key === "draft") return c.status === DRAFT || c.status === SENT_BACK;
	if (key === "pending") return c.status === PENDING;
	if (key === "approved") return c.status === APPROVED;
	if (key === "closed") return c.status === CLOSED;
	return true;
}

export function countsFor(list) {
	const out = { all: list.length, draft: 0, pending: 0, approved: 0, closed: 0 };
	for (const c of list) for (const k of ["draft", "pending", "approved", "closed"]) if (matchesFilter(c, k)) out[k]++;
	return out;
}

// names: { contractor: {id: name}, activity: {id: name}, project: {id: name} } for the readable columns.
export function matchesSearch(c, q, names = {}) {
	const s = String(q || "").trim().toLowerCase();
	if (!s) return true;
	return [c.name, c.status, names.project?.[c.project], c.project, names.activity?.[c.activity], c.activity,
		names.contractor?.[c.contractor], c.contractor].some((v) => String(v || "").toLowerCase().includes(s));
}

// What stops this contract being sent or approved. contractor = the Labour Contractor row (or undefined),
// list is not used (a contractor may hold any number of open contracts); kept so callers need no change. Same messages as the server's blockers().
export function blockersFor(form, contractor, list = [], today = todayISO()) {
	const out = [];
	if (!contractor) out.push("Choose a contractor.");
	else {
		if (contractor.disabled) out.push("Contractor " + (contractor.contractor_name || contractor.name) + " is inactive.");
		if (isCertExpired(contractor.tax_cert_expiry, today))
			out.push("Certificate expired on " + String(contractor.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
	}
	if (!(Number(form.contract_value) > 0)) out.push("Enter the contract value.");
	return out;
}

// Returns { field: message } for saving a draft. editingName = contract name ("" for new).
export function validateContract(form, list = [], editingName = "") {
	const e = {};
	if (!form.project) e.project = "Project is required";
	if (!form.activity) e.activity = "Task / activity is required";
	if (!form.contractor) e.contractor = "Contractor is required";
	if (!form.start_date) e.start_date = "Start date is required";
	if (!form.end_date) e.end_date = "End date is required";
	else if (form.start_date && String(form.end_date) < String(form.start_date)) e.end_date = "End date can't be before the start date";
	if (form.contract_value === "" || form.contract_value == null || !(Number(form.contract_value) >= 0)) e.contract_value = "Enter the contract value";
	// An activity is used on one contract only, ever (any project, any status). An existing contract keeps its own activity.
	if (form.activity) {
		const own = editingName ? list.find((c) => c.name === editingName) : null;
		if (!own || own.activity !== form.activity) {
			const dup = list.find((c) => c.activity === form.activity && c.name !== editingName);
			if (dup) e.activity = "Activity " + form.activity + " is already used on contract " + dup.name + ". Create a new activity for each contract";
		}
	}
	return e;
}

// Which buttons apply. canApprove = the user holds the Director role (server: my_permissions).
export function actionState(status, canApprove) {
	return {
		canEdit: status === DRAFT || status === SENT_BACK,
		canSend: status === DRAFT || status === SENT_BACK,
		canApprove: status === PENDING && !!canApprove,
		canSendBack: status === PENDING && !!canApprove,
		canClose: status === APPROVED,
		canReopen: status === CLOSED && !!canApprove, // Director only
	};
}

// Delete: a Draft never sent for approval, or a Closed contract for a Director (server: on_trash also blocks it when a weekly bill uses it).
export function canDelete(c, isDirector = false) { return (c.status === DRAFT && !c.raised_by) || (c.status === CLOSED && !!isDirector); }