// Helpers for the Labour Contract > Weekly Bill screen (pages/WeeklyBill.vue).
// Kept free of Vue so they can be unit tested (labourWeeklyBill.test.js).
// Rules mirror the server (invoicing/doctype/labour_weekly_bill/labour_weekly_bill.py); the server stays the authority.

import { todayISO, isCertExpired } from "./labourContractor.js";

export const DRAFT = "Draft", PENDING = "Pending approval", APPROVED = "Approved", SENT_BACK = "Sent back", PAID = "Paid", CANCELLED = "Cancelled";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const utc = (iso) => { const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const isoOf = (dt) => dt.toISOString().slice(0, 10);

// True when the week holding the date ended before the current week. A new bill can't be made for a past week.
export function isPastWeek(iso, today = todayISO()) { return !!iso && mondayISO(iso) < mondayISO(today); }
// In a past week a new bill can pay only contracts with nothing paid so far; a contract with payments is read-only there.
export function pastLocked(r, weekDate, isNew, today = todayISO()) {
	return !!isNew && isPastWeek(weekDate, today) && (Number(r.paid_till_now) || 0) > 0.005;
}

// First day of the week holding the date (YYYY-MM-DD), as YYYY-MM-DD. Weeks run Saturday to Friday, so this is the Saturday.
// The names mondayISO / sundayISO are kept from the Monday to Sunday weeks.
export function mondayISO(iso) {
	const d = utc(iso);
	d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7));
	return isoOf(d);
}
export function sundayISO(iso) {
	const d = utc(mondayISO(iso));
	d.setUTCDate(d.getUTCDate() + 6);
	return isoOf(d);
}
// "14 Nov to 20 Nov 2026"
export function weekLabel(iso) {
	if (!iso) return "";
	const a = utc(mondayISO(iso)), b = utc(sundayISO(iso));
	return a.getUTCDate() + " " + MONTHS[a.getUTCMonth()] + " to " + b.getUTCDate() + " " + MONTHS[b.getUTCMonth()] + " " + b.getUTCFullYear();
}

// Filter keys: all | draft | pending | approved | paid | cancelled (Sent back counts under draft: it is editable again).
export function matchesFilter(b, key) {
	if (key === "draft") return b.status === DRAFT || b.status === SENT_BACK;
	if (key === "pending") return b.status === PENDING;
	if (key === "approved") return b.status === APPROVED;
	if (key === "paid") return b.status === PAID;
	if (key === "cancelled") return b.status === CANCELLED;
	return true;
}
export function countsFor(list) {
	const out = { all: list.length, draft: 0, pending: 0, approved: 0, paid: 0, cancelled: 0 };
	for (const b of list) for (const k of ["draft", "pending", "approved", "paid", "cancelled"]) if (matchesFilter(b, k)) out[k]++;
	return out;
}
export function matchesSearch(b, q, projectNames = {}, columns = {}) {
	const s = String(q || "").trim().toLowerCase();
	if (!s) return true;
	const col = columns[b.name] || {};
	const contracts = (col.contracts || []).join(" ");
	const projects = (col.projects || []).map((p) => p + " " + (projectNames[p] || "")).join(" ");
	return [b.name, b.status, b.project, projectNames[b.project], weekLabel(b.week_start), contracts, projects].some((v) => String(v || "").toLowerCase().includes(s));
}

// Contract column on the list: the first two contract numbers, then "+N" for the rest; "—" when nothing is paid on the bill.
export function contractsLabel(contracts = []) {
	if (!contracts.length) return "—";
	return contracts.slice(0, 2).join(", ") + (contracts.length > 2 ? " +" + (contracts.length - 2) : "");
}

// Project column on the list: the projects of the contracts paid on the bill (by name), else the project saved on an older bill; "—" when none.
export function projectsLabel(b, col = {}, projectNames = {}) {
	const ids = (col && col.projects && col.projects.length) ? col.projects : (b && b.project ? [b.project] : []);
	if (!ids.length) return "—";
	const names = ids.map((p) => projectNames[p] || p);
	return names.slice(0, 2).join(", ") + (names.length > 2 ? " +" + (names.length - 2) : "");
}

// A contract with nothing left to pay (balance 0) and nothing entered on this bill is not shown on the bill.
export function isFullyPaid(r) {
	return (Number(r.balance) || 0) <= 0.005 && !(Number(r.amount_to_pay) > 0);
}
export function visibleRows(rows = []) {
	return rows.filter((r) => !isFullyPaid(r));
}

// A bill that is locked (Pending approval, Approved, Paid) shows only the contracts being paid on it (amount above zero).
export function lockedRows(rows = []) {
	return rows.filter((r) => Number(r.amount_to_pay) > 0);
}

// Rows for the screen: the server's preview rows (one per Approved contract of any project) with the amounts already saved on the bill.
// dropped = contracts that had an amount above zero but are no longer in the preview (no longer Approved).
export function mergeRows(previewRows = [], savedLines = []) {
	const saved = new Map(savedLines.map((l) => [l.contract, Number(l.amount_to_pay) || 0]));
	const rows = previewRows.map((r) => {
		const amt = saved.get(r.contract);
		saved.delete(r.contract);
		// A contract already held this week by another bill can't be paid again: its amount stays empty.
		return { ...r, amount_to_pay: amt && !r.paid_this_week ? amt : "" };
	});
	return { rows, dropped: [...saved].filter(([, a]) => a > 0).map(([c]) => c) };
}

// Amount to pay now takes digits and one decimal point only; anything else typed or pasted is dropped (same rule as the Contract value).
export function cleanAmount(v) { return String(v ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1"); }

export function totalOf(rows) { return rows.reduce((a, r) => a + (Number(r.amount_to_pay) || 0), 0); }

// Message for one row, or "" when fine.
export function rowError(r) {
	const amt = Number(r.amount_to_pay) || 0;
	if (amt < 0) return "Amount can't be negative";
	if (amt > (Number(r.balance) || 0) + 0.005) return "Above the balance of " + Math.round(Number(r.balance) || 0).toLocaleString("en-US");
	return "";
}

// What stops the bill being sent or approved. contractors = loaded Labour Contractor rows.
export function billBlockers(rows, contractors = [], today = todayISO()) {
	const out = [];
	const paid = rows.filter((r) => Number(r.amount_to_pay) > 0);
	if (!paid.length) out.push("Enter an amount to pay on at least one contract.");
	for (const r of paid) {
		const c = contractors.find((x) => x.name === r.contractor);
		const label = (c && c.contractor_name) || r.contractor;
		if (c && c.disabled) out.push("Contractor " + label + " is inactive.");
		if (c && isCertExpired(c.tax_cert_expiry, today))
			out.push("Certificate of " + label + " expired on " + String(c.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
	}
	for (const r of rows) { const e = rowError(r); if (e) out.push("Contract " + r.contract + ": " + e); }
	return out;
}

// Returns { field: message } for saving a draft.
export function validateBill(form, rows = []) {
	const e = {};
	if (!form.week_date) e.week_date = "Pick a date in the week";
	else if (!rows.length) e.week_date = "There are no Approved contracts to bill";
	return e;
}

// Which buttons apply. canApprove = the user holds the Director role (api.labour_contract.my_permissions).
// canMarkPaid: an Approved bill is marked Paid (the payment is recorded) by a Director, Purchase Manager or Admin (canPay; defaults to canApprove).
// canReopen (Edit) and canCancel: an Approved bill, Director. canMarkUnpaid: a Paid bill, Director. canAmend: a Cancelled bill, Director.
export function actionState(status, canApprove, canPay = canApprove) {
	const editable = status === DRAFT || status === SENT_BACK;
	return { canEdit: editable, canSend: editable, canApprove: status === PENDING && !!canApprove, canSendBack: status === PENDING && !!canApprove, canMarkPaid: status === APPROVED && !!canPay,
		canReopen: status === APPROVED && !!canApprove, canCancel: status === APPROVED && !!canApprove, canMarkUnpaid: status === PAID && !!canApprove, canAmend: status === CANCELLED && !!canApprove };
}

// Print is offered only once the Director has approved the bill: Approved or Paid (not Draft, Pending, Sent back or Cancelled).
export function canPrint(status) { return status === APPROVED || status === PAID; }

const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const kes = (v) => Math.round(Number(v) || 0).toLocaleString("en-US");
// "24 Nov 2026" from a date or datetime string; "" when blank.
export function longDate(iso) {
	if (!iso) return "";
	const d = utc(iso);
	return isNaN(d) ? "" : d.getUTCDate() + " " + MONTHS[d.getUTCMonth()] + " " + d.getUTCFullYear();
}
// Printable page for one approved bill.
// bill: { name, status, week_date, approved_by, approved_on, paid_by, paid_on } (people already as names)
// lines: [{ contract, contractor, activity, project, contract_value, paid_till_now, balance, amount_to_pay }] (names already resolved)
export function printHtml(bill, lines = []) {
	const total = lines.reduce((a, r) => a + (Number(r.amount_to_pay) || 0), 0);
	const body = lines.map((r, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(r.contract) + "</td><td class=\"l\">" + esc(r.contractor) + "</td><td class=\"l\">" + esc(r.activity) + "</td><td class=\"l\">" + esc(r.project) + "</td>"
		+ "<td class=\"r\">" + kes(r.contract_value) + "</td><td class=\"r\">" + kes(r.paid_till_now) + "</td><td class=\"r\">" + kes(r.balance) + "</td><td class=\"r\"><b>" + kes(r.amount_to_pay) + "</b></td></tr>").join("");
	const foot = "<tr class=\"tt\"><td colspan=\"8\" class=\"r\"><b>Total to pay now (KES)</b></td><td class=\"r\"><b>" + kes(total) + "</b></td></tr>";
	const approved = bill.approved_by || bill.approved_on ? "Approved by " + esc(bill.approved_by) + (bill.approved_on ? " on " + esc(longDate(bill.approved_on)) : "") + "." : "";
	const paid = bill.status === PAID ? " Paid" + (bill.paid_by ? " by " + esc(bill.paid_by) : "") + (bill.paid_on ? " on " + esc(longDate(bill.paid_on)) : "") + "." : "";
	return "<!doctype html><html><head><meta charset=\"utf-8\"><title>Weekly Bill " + esc(bill.name) + "</title><style>"
		+ "@page{size:A4 landscape;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0}h1{font-size:15px;text-align:center;text-decoration:underline;margin:0 0 6px}"
		+ "p.sub{text-align:center;margin:0 0 10px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:4px 6px;text-align:center}td.l{text-align:left}td.r,th.r{text-align:right}tr.tt td{background:#f3f3f3}"
		+ ".note{margin:10px 0 0}.sig{display:flex;justify-content:space-between;margin-top:46px}.sig div{width:30%;border-top:1px solid #000;padding-top:4px;text-align:center}</style></head><body>"
		+ "<h1>WEEKLY BILL " + esc(bill.name) + "</h1><p class=\"sub\">Week (Saturday to Friday): " + esc(weekLabel(bill.week_date)) + " &nbsp;|&nbsp; Status: " + esc(bill.status) + "</p>"
		+ "<table><tr><th>S.NO</th><th>Contract</th><th>Contractor</th><th>Activity</th><th>Project</th><th class=\"r\">Contract Value</th><th class=\"r\">Paid Till Now</th><th class=\"r\">Balance Amount</th><th class=\"r\">Amount To Pay Now</th></tr>"
		+ body + foot + "</table><p class=\"note\">" + approved + paid + "</p>"
		+ "<div class=\"sig\"><div>Prepared by</div><div>Approved by (Director)</div><div>Received by (Contractor)</div></div></body></html>";
}

// Delete only a Draft never sent for approval, a Sent back bill, or a Cancelled bill (server: on_trash).
export function canDelete(b) { return b.status === CANCELLED || b.status === SENT_BACK || (b.status === DRAFT && !b.raised_by); }

// The document sent to save_doc: only contract and amount per line; the server rebuilds the rest.
export function toDoc(form, rows, company) {
	return {
		doctype: "Labour Weekly Bill", ...(form.name ? { name: form.name } : {}), company,
		week_start: form.week_date,
		lines: rows.map((r) => ({ contract: r.contract, amount_to_pay: Number(r.amount_to_pay) || 0 })),
	};
}

// A bill is not tied to one project: it belongs to a project when its own project or any contract on it (columns[bill].projects) is that project.
export function inProject(b, project, columns = {}) {
	if (!project) return true;
	return b.project === project || ((columns[b.name] || {}).projects || []).includes(project);
}

// Figures for the cards on the Weekly Bill screen.
// all / draft / pending / approved: count and total of each group (Draft includes Sent back).
// weekN / weekValue: bills of the current Saturday to Friday week (any status except Sent back). paid: total of Paid bills. Cancelled bills are left out of every figure.
export function kpiFor(list, today = todayISO()) {
	const grp = () => ({ n: 0, value: 0 });
	const out = { all: grp(), draft: grp(), pending: grp(), approved: grp(), paidBills: grp(), weekN: 0, weekValue: 0, paid: 0 };
	const wk = mondayISO(today);
	for (const b of list || []) {
		if (b.status === CANCELLED) continue; // a cancelled bill counts nowhere
		const v = Number(b.total_amount) || 0;
		out.all.n++; out.all.value += v;
		for (const k of ["draft", "pending", "approved"]) if (matchesFilter(b, k)) { out[k].n++; out[k].value += v; }
		if (b.status === PAID) { out.paid += v; out.paidBills.n++; out.paidBills.value += v; }
		if (b.week_start && mondayISO(b.week_start) === wk && b.status !== SENT_BACK) { out.weekN++; out.weekValue += v; }
	}
	return out;
}