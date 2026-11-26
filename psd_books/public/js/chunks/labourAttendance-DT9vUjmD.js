import { t as L } from "./labourContractor-CwTlS8Kw.js";
const _ = "Draft", b = "Pending approval", S = "Approved", T = "Submitted", w = "Sent back", m = "Cancelled", h = [
  { key: "d_sat", label: "Sat" },
  { key: "d_sun", label: "Sun" },
  { key: "d_mon", label: "Mon" },
  { key: "d_tue", label: "Tue" },
  { key: "d_wed", label: "Wed" },
  { key: "d_thu", label: "Thu" },
  { key: "d_fri", label: "Fri" }
], B = ["C", "SK"], R = (t) => t === "C" ? "USK" : t || "", C = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], u = (t) => {
  const [e, a, n] = String(t).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(e, a - 1, n));
}, N = (t) => t.toISOString().slice(0, 10), A = (t) => String(t).padStart(2, "0"), c = (t) => Number(t) || 0;
function K(t) {
  return String(t ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
}
function g(t) {
  const e = u(t);
  return e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 1) % 7), N(e);
}
function E(t) {
  const e = u(g(t));
  return e.setUTCDate(e.getUTCDate() + 6), N(e);
}
function F(t) {
  if (!t) return "";
  const e = u(g(t)), a = u(E(t));
  return e.getUTCDate() + " " + C[e.getUTCMonth()] + " to " + a.getUTCDate() + " " + C[a.getUTCMonth()] + " " + a.getUTCFullYear();
}
function O(t) {
  const e = (a) => A(a.getUTCDate()) + "/" + A(a.getUTCMonth() + 1) + "/" + String(a.getUTCFullYear()).slice(2);
  return e(u(g(t))) + " TO " + e(u(E(t)));
}
function H(t) {
  const e = t % 100;
  return t + (e >= 11 && e <= 13 ? "TH" : { 1: "ST", 2: "ND", 3: "RD" }[t % 10] || "TH");
}
function I(t) {
  const e = u(g(t));
  return h.map((a, n) => {
    const s = new Date(e);
    return s.setUTCDate(e.getUTCDate() + n), H(s.getUTCDate());
  });
}
const U = (t, e) => {
  const a = 10 ** e;
  return Math.sign(t) * Math.round(Math.abs(t) * a + 1e-9) / a;
};
function k(t) {
  return h.reduce((e, a) => e + (Number(t[a.key]) ? 1 : 0), 0);
}
function D(t) {
  const e = k(t), a = c(t.rate), n = c(t.sha), s = U(c(t.ot_hours) * a / 8, 2), d = e === 0 && s === 0 ? 0 : U(e * a + s - n, 0);
  return { days: e, otAmount: s, total: d };
}
function P(t) {
  const e = { employees: 0, days: 0, otAmount: 0, sha: 0, total: 0 };
  for (const a of t) {
    const n = D(a);
    (n.days > 0 || c(a.ot_hours) > 0) && (e.employees++, e.sha += c(a.sha)), e.days += n.days, e.otAmount += n.otAmount, e.total += n.total;
  }
  return e;
}
function W(t = [], e = []) {
  const a = new Map(e.map((r) => [r.employee, r])), n = ["grade", "area_of_work", "rate", "ot_hours", "sha", ...h.map((r) => r.key)], s = [], d = t.map((r) => {
    const o = a.get(r.employee);
    if (a.delete(r.employee), !o)
      return e.length && s.push(r.employee_name || r.employee), { ...r };
    const l = { ...r };
    for (const i of n) l[i] = o[i] === void 0 ? r[i] : o[i];
    return l;
  });
  for (const r of a.values()) k(r) > 0 && d.push({ ...r });
  return d.sort((r, o) => String(r.employee_name || "").toLowerCase().localeCompare(String(o.employee_name || "").toLowerCase())), { rows: d, added: s };
}
const v = (t) => t.employee_name || t.employee;
function j(t) {
  if (c(t.rate) < 0) return "Rate can't be negative";
  if (c(t.ot_hours) < 0) return "OT hours can't be negative";
  if (c(t.sha) < 0) return "SHA can't be negative";
  const e = D(t);
  return (e.days > 0 || c(t.ot_hours) > 0) && c(t.rate) > 0 && e.total < 0 ? "SHA is more than the wage" : "";
}
function Y(t) {
  const e = [], a = t.filter((n) => k(n) > 0 || c(n.ot_hours) > 0);
  a.length || e.push("Tick attendance for at least one worker.");
  for (const n of a) c(n.rate) <= 0 && e.push("Rate per day is missing for " + v(n) + ".");
  for (const n of t) {
    const s = j(n);
    s && e.push(v(n) + ": " + s);
  }
  return e;
}
function z(t, e = []) {
  const a = {};
  return t.week_date ? e.length || (a.week_date = "There are no Active workers to list") : a.week_date = "Pick a date in the week", a;
}
function M(t, e) {
  return e === "draft" ? t.status === _ || t.status === w : e === "pending" ? t.status === b : e === "approved" ? t.status === S : e === "submitted" ? t.status === T : e === "cancelled" ? t.status === m : !0;
}
function J(t) {
  const e = { all: 0, draft: 0, pending: 0, approved: 0, submitted: 0, cancelled: 0 };
  for (const a of t) for (const n of ["all", "draft", "pending", "approved", "submitted", "cancelled"]) M(a, n) && e[n]++;
  return e;
}
function V(t, e = L()) {
  const a = () => ({ n: 0, value: 0 }), n = { all: a(), pending: a(), approved: a(), submitted: a(), monthValue: 0, latest: null }, s = String(e).slice(0, 7);
  for (const d of t || []) {
    if (d.status === m) continue;
    const r = c(d.total_amount);
    n.all.n++, n.all.value += r;
    for (const l of ["pending", "approved", "submitted"]) M(d, l) && (n[l].n++, n[l].value += r);
    if (d.status !== T) continue;
    const o = String(d.week_start || "").slice(0, 10);
    o && (o.slice(0, 7) === s && (n.monthValue += r), (!n.latest || o > n.latest.week_start) && (n.latest = { week_start: o, value: r }));
  }
  return n;
}
function $(t, e) {
  const a = String(e || "").trim().toLowerCase();
  return a ? [t.name, t.status, F(t.week_start)].some((n) => String(n || "").toLowerCase().includes(a)) : !0;
}
function q(t, e) {
  const a = t === _ || t === w;
  return {
    canEdit: a,
    canSend: a,
    canApprove: t === b && !!e,
    canSendBack: t === b && !!e,
    canSubmit: t === S,
    canCancel: (t === w || t === S || t === T) && !!e,
    canAmend: t === m
  };
}
function Q(t, e = /* @__PURE__ */ new Set()) {
  return t.status === m ? !e.has(t.name) : t.status === _ && !t.raised_by;
}
function X(t) {
  return new Set((t || []).map((e) => e.amends_sheet).filter(Boolean));
}
function Z(t, e, a) {
  return {
    doctype: "Labour Attendance Sheet",
    ...t.name ? { name: t.name } : {},
    company: a,
    week_start: t.week_date,
    lines: e.map((n) => ({
      employee: n.employee,
      grade: n.grade || "C",
      area_of_work: n.area_of_work || "",
      ...Object.fromEntries(h.map((s) => [s.key, Number(n[s.key]) ? 1 : 0])),
      rate: c(n.rate),
      ot_hours: c(n.ot_hours),
      sha: c(n.sha)
    }))
  };
}
const f = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), p = (t) => Math.round(c(t)).toLocaleString("en-US"), y = (t) => (Math.round(c(t) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
function tt(t, e) {
  const a = I(t), n = P(e), s = '<tr><th rowspan="2">S.NO</th><th rowspan="2">NAMES</th><th rowspan="2">ID NO.</th><th rowspan="2">Grade</th><th rowspan="2">AREA OF WORK</th>' + a.map((o) => "<th>" + o + "</th>").join("") + '<th rowspan="2">Days</th><th rowspan="2">Rate</th><th rowspan="2">OT</th><th rowspan="2">OT amount</th><th rowspan="2">SHA</th><th rowspan="2">Total</th><th rowspan="2" class="sg">SIGNATURE</th><th rowspan="2" class="sg">ID NO</th></tr><tr>' + h.map((o) => "<th>" + o.label + "</th>").join("") + "</tr>", d = e.map((o, l) => {
    const i = D(o);
    return "<tr><td>" + (l + 1) + '</td><td class="l">' + f(o.employee_name) + "</td><td>" + f(o.id_no) + "</td><td>" + f(R(o.grade)) + "</td><td>" + f(o.area_of_work) + "</td>" + h.map((x) => "<td>" + (Number(o[x.key]) ? 1 : 0) + "</td>").join("") + "<td>" + i.days + "</td><td>" + p(o.rate) + "</td><td>" + (c(o.ot_hours) ? y(o.ot_hours) : "") + "</td><td>" + y(i.otAmount) + "</td><td>" + p(o.sha) + "</td><td><b>" + p(i.total) + "</b></td><td></td><td></td></tr>";
  }).join(""), r = '<tr class="tt"><td colspan="12" class="l"><b>Total (' + n.employees + " workers)</b></td><td><b>" + n.days + "</b></td><td></td><td></td><td><b>" + y(n.otAmount) + "</b></td><td><b>" + p(n.sha) + "</b></td><td><b>" + p(n.total) + "</b></td><td></td><td></td></tr>";
  return '<!doctype html><html><head><meta charset="utf-8"><title>Weekly wages payment sheet ' + f(O(t)) + "</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Arial,Helvetica,sans-serif;font-size:11px;margin:0}h1{font-size:13px;text-align:center;text-decoration:underline;margin:0 0 8px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:3px 4px;text-align:center}td.l{text-align:left}th.sg{min-width:70px}tr.tt td{background:#f3f3f3}</style></head><body><h1>WEEKLY WAGES PAYMENT SHEET " + f(O(t)) + "</h1><table>" + s + d + r + "</table></body></html>";
}
export {
  S as A,
  m as C,
  h as D,
  B as G,
  b as P,
  w as S,
  T as a,
  q as b,
  K as c,
  J as d,
  M as e,
  D as f,
  R as g,
  $ as h,
  Q as i,
  P as j,
  V as k,
  I as l,
  W as m,
  X as n,
  tt as p,
  j as r,
  Y as s,
  Z as t,
  z as v,
  F as w
};
