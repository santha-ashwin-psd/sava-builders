// Helpers for the Labour Contract > Attendance screen (pages/Attendance.vue): the weekly wages sheet.
// Kept free of Vue so they can be unit tested (labourAttendance.test.js).
// Rules mirror the server (invoicing/doctype/labour_attendance_sheet/labour_attendance_sheet.py); the server stays the authority.

export const DRAFT = "Draft", PENDING = "Pending approval", APPROVED = "Approved", SUBMITTED = "Submitted", SENT_BACK = "Sent back";
export const DEFAULT_SHA = 125;
// The client's paper sheet runs Saturday to Friday.
export const DAYS = [
	{ key: "d_sat", label: "Sat" }, { key: "d_sun", label: "Sun" }, { key: "d_mon", label: "Mon" }, { key: "d_tue", label: "Tue" },
	{ key: "d_wed", label: "Wed" }, { key: "d_thu", label: "Thu" }, { key: "d_fri", label: "Fri" },
];
export const GRADES = ["C", "SK"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const utc = (iso) => { const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const isoOf = (dt) => dt.toISOString().slice(0, 10);
const pad = (n) => String(n).padStart(2, "0");
const num = (v) => Number(v) || 0;

// Saturday of the Saturday-to-Friday week holding the date (YYYY-MM-DD), as YYYY-MM-DD.
export function saturdayISO(iso) {
	const d = utc(iso);
	d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7));
	return isoOf(d);
}
export function fridayISO(iso) {
	const d = utc(saturdayISO(iso));
	d.setUTCDate(d.getUTCDate() + 6);
	return isoOf(d);
}
// "24 Oct to 30 Oct 2026"
export function weekLabel(iso) {
	if (!iso) return "";
	const a = utc(saturdayISO(iso)), b = utc(fridayISO(iso));
	return a.getUTCDate() + " " + MONTHS[a.getUTCMonth()] + " to " + b.getUTCDate() + " " + MONTHS[b.getUTCMonth()] + " " + b.getUTCFullYear();
}
// "24/10/26 TO 30/10/26" as in the title of the paper sheet.
export function weekTitleDates(iso) {
	const f = (d) => pad(d.getUTCDate()) + "/" + pad(d.getUTCMonth() + 1) + "/" + String(d.getUTCFullYear()).slice(2);
	return f(utc(saturdayISO(iso))) + " TO " + f(utc(fridayISO(iso)));
}
export function ordinal(n) {
	const v = n % 100;
	return n + (v >= 11 && v <= 13 ? "TH" : { 1: "ST", 2: "ND", 3: "RD" }[n % 10] || "TH");
}
// The seven day-of-month labels of the week, Saturday first: ["24TH", "25TH", ...].
export function dayDates(iso) {
	const s = utc(saturdayISO(iso));
	return DAYS.map((_, i) => { const d = new Date(s); d.setUTCDate(s.getUTCDate() + i); return ordinal(d.getUTCDate()); });
}

const half = (x, places) => { const f = 10 ** places; return Math.sign(x) * Math.round(Math.abs(x) * f + 1e-9) / f; };

export function daysOf(r) { return DAYS.reduce((a, d) => a + (Number(r[d.key]) ? 1 : 0), 0); }

// Days, OT amount and Total of one row (same rules as the server: no days and no OT pays nothing, no SHA).
export function figures(r) {
	const days = daysOf(r), rate = num(r.rate), sha = num(r.sha);
	const otAmount = half(num(r.ot_hours) * rate / 8, 2);
	const total = days === 0 && otAmount === 0 ? 0 : half(days * rate + otAmount - sha, 0);
	return { days, otAmount, total };
}

export function totalsOf(rows) {
	const out = { employees: 0, days: 0, otAmount: 0, sha: 0, total: 0 };
	for (const r of rows) {
		const f = figures(r);
		if (f.days > 0 || num(r.ot_hours) > 0) { out.employees++; out.sha += num(r.sha); }
		out.days += f.days; out.otAmount += f.otAmount; out.total += f.total;
	}
	return out;
}

// Rows for the screen: the server's baseline (one per Active employee) with the values already typed or saved.
// A row of an employee no longer in the baseline is dropped unless it has a day ticked. added = names of employees new to the sheet.
export function mergeRows(baseline = [], current = []) {
	const cur = new Map(current.map((r) => [r.employee, r]));
	const inputs = ["grade", "area_of_work", "rate", "ot_hours", "sha", ...DAYS.map((d) => d.key)];
	const added = [];
	const rows = baseline.map((b) => {
		const c = cur.get(b.employee);
		cur.delete(b.employee);
		if (!c) { if (current.length) added.push(b.employee_name || b.employee); return { ...b }; }
		const row = { ...b };
		for (const k of inputs) row[k] = c[k] === undefined ? b[k] : c[k];
		return row;
	});
	for (const c of cur.values()) if (daysOf(c) > 0) rows.push({ ...c });
	rows.sort((a, b) => String(a.employee_name || "").toLowerCase().localeCompare(String(b.employee_name || "").toLowerCase()));
	return { rows, added };
}

const labelOf = (r) => r.employee_name || r.employee;

// Message for one row, or "".
export function rowError(r) {
	if (num(r.rate) < 0) return "Rate can't be negative";
	if (num(r.ot_hours) < 0) return "OT hours can't be negative";
	if (num(r.sha) < 0) return "SHA can't be negative";
	const f = figures(r);
	if ((f.days > 0 || num(r.ot_hours) > 0) && num(r.rate) > 0 && f.total < 0) return "SHA is more than the wage";
	return "";
}

// What stops the sheet being sent or approved.
export function sheetBlockers(rows) {
	const out = [];
	const paid = rows.filter((r) => daysOf(r) > 0 || num(r.ot_hours) > 0);
	if (!paid.length) out.push("Tick attendance for at least one employee.");
	for (const r of paid) if (num(r.rate) <= 0) out.push("Rate per day is missing for " + labelOf(r) + ".");
	for (const r of rows) { const e = rowError(r); if (e) out.push(labelOf(r) + ": " + e); }
	return out;
}

export function validateSheet(form, rows = []) {
	const e = {};
	if (!form.week_date) e.week_date = "Pick a date in the week";
	else if (!rows.length) e.week_date = "There are no Active employees to list";
	return e;
}

// Filter keys: all | draft | pending | approved | submitted (Sent back counts under draft: it is editable again).
export function matchesFilter(s, key) {
	if (key === "draft") return s.status === DRAFT || s.status === SENT_BACK;
	if (key === "pending") return s.status === PENDING;
	if (key === "approved") return s.status === APPROVED;
	if (key === "submitted") return s.status === SUBMITTED;
	return true;
}
export function countsFor(list) {
	const out = { all: list.length, draft: 0, pending: 0, approved: 0, submitted: 0 };
	for (const s of list) for (const k of ["draft", "pending", "approved", "submitted"]) if (matchesFilter(s, k)) out[k]++;
	return out;
}
export function matchesSearch(s, q) {
	const t = String(q || "").trim().toLowerCase();
	if (!t) return true;
	return [s.name, s.status, weekLabel(s.week_start)].some((v) => String(v || "").toLowerCase().includes(t));
}

// Which buttons apply. canApprove = the user holds the Director role (api.labour_contract.my_permissions).
export function actionState(status, canApprove) {
	const editable = status === DRAFT || status === SENT_BACK;
	return { canEdit: editable, canSend: editable, canApprove: status === PENDING && !!canApprove, canSendBack: status === PENDING && !!canApprove, canSubmit: status === APPROVED };
}

// Delete only while the sheet was never sent for approval (server: on_trash).
export function canDelete(s) { return s.status === DRAFT && !s.raised_by; }

// The document sent to save_doc: the typed values per line; the server rebuilds names, days, OT amount and totals.
export function toDoc(form, rows, company) {
	return {
		doctype: "Labour Attendance Sheet", ...(form.name ? { name: form.name } : {}), company, week_start: form.week_date,
		lines: rows.map((r) => ({
			employee: r.employee, grade: r.grade || "C", area_of_work: r.area_of_work || "",
			...Object.fromEntries(DAYS.map((d) => [d.key, Number(r[d.key]) ? 1 : 0])),
			rate: num(r.rate), ot_hours: num(r.ot_hours), sha: num(r.sha),
		})),
	};
}

const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = (v) => Math.round(num(v)).toLocaleString("en-US");
const fmtOt = (v) => (Math.round(num(v) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Printable page laid out like the client's paper "Weekly Wages Payment Sheet" (landscape A4).
export function printHtml(weekIso, rows) {
	const dd = dayDates(weekIso), t = totalsOf(rows);
	const head = "<tr><th rowspan=\"2\">S.NO</th><th rowspan=\"2\">NAMES</th><th rowspan=\"2\">ID NO.</th><th rowspan=\"2\">Grade</th><th rowspan=\"2\">AREA OF WORK</th>"
		+ dd.map((x) => "<th>" + x + "</th>").join("") + "<th rowspan=\"2\">Days</th><th rowspan=\"2\">Rate</th><th rowspan=\"2\">OT</th><th rowspan=\"2\">OT amount</th><th rowspan=\"2\">SHA</th><th rowspan=\"2\">Total</th><th rowspan=\"2\" class=\"sg\">SIGNATURE</th><th rowspan=\"2\" class=\"sg\">ID NO</th></tr>"
		+ "<tr>" + DAYS.map((d) => "<th>" + d.label + "</th>").join("") + "</tr>";
	const body = rows.map((r, i) => {
		const f = figures(r);
		return "<tr><td>" + (i + 1) + "</td><td class=\"l\">" + esc(r.employee_name) + "</td><td>" + esc(r.id_no) + "</td><td>" + esc(r.grade) + "</td><td>" + esc(r.area_of_work) + "</td>"
			+ DAYS.map((d) => "<td>" + (Number(r[d.key]) ? 1 : 0) + "</td>").join("")
			+ "<td>" + f.days + "</td><td>" + fmt(r.rate) + "</td><td>" + (num(r.ot_hours) ? fmtOt(r.ot_hours) : "") + "</td><td>" + fmtOt(f.otAmount) + "</td><td>" + fmt(r.sha) + "</td><td><b>" + fmt(f.total) + "</b></td><td></td><td></td></tr>";
	}).join("");
	const foot = "<tr class=\"tt\"><td colspan=\"12\" class=\"l\"><b>Total (" + t.employees + " employees)</b></td><td><b>" + t.days + "</b></td><td></td><td></td><td><b>" + fmtOt(t.otAmount) + "</b></td><td><b>" + fmt(t.sha) + "</b></td><td><b>" + fmt(t.total) + "</b></td><td></td><td></td></tr>";
	return "<!doctype html><html><head><meta charset=\"utf-8\"><title>Weekly wages payment sheet " + esc(weekTitleDates(weekIso)) + "</title><style>"
		+ "@page{size:A4 landscape;margin:10mm}body{font-family:Arial,Helvetica,sans-serif;font-size:11px;margin:0}h1{font-size:13px;text-align:center;text-decoration:underline;margin:0 0 8px}"
		+ "table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:3px 4px;text-align:center}td.l{text-align:left}th.sg{min-width:70px}tr.tt td{background:#f3f3f3}</style></head><body>"
		+ "<h1>WEEKLY WAGES PAYMENT SHEET " + esc(weekTitleDates(weekIso)) + "</h1><table>" + head + body + foot + "</table></body></html>";
}