import { i as v, t as b } from "./labourContractor-CwTlS8Kw.js";
const s = "Draft", d = "Pending approval", u = "Approved", l = "Sent back", p = "Closed";
function S(t) {
  return { [s]: "amber", [d]: "amber", [u]: "green", Paid: "green", Cancelled: "red", [l]: "red", [p]: "blue" }[t] || "blue";
}
function h(t) {
  return Math.round(Number(t) || 0).toLocaleString("en-US");
}
function f(t, e) {
  return e === "draft" ? t.status === s || t.status === l : e === "pending" ? t.status === d : e === "approved" ? t.status === u : e === "closed" ? t.status === p : !0;
}
function y(t) {
  const e = { all: t.length, draft: 0, pending: 0, approved: 0, closed: 0 };
  for (const r of t) for (const a of ["draft", "pending", "approved", "closed"]) f(r, a) && e[a]++;
  return e;
}
function C(t, e, r = {}) {
  var n, i, c;
  const a = String(e || "").trim().toLowerCase();
  return a ? [
    t.name,
    t.status,
    (n = r.project) == null ? void 0 : n[t.project],
    t.project,
    (i = r.activity) == null ? void 0 : i[t.activity],
    t.activity,
    (c = r.contractor) == null ? void 0 : c[t.contractor],
    t.contractor
  ].some((o) => String(o || "").toLowerCase().includes(a)) : !0;
}
function g(t, e, r = [], a = b()) {
  const n = [];
  return e ? (e.disabled && n.push("Contractor " + (e.contractor_name || e.name) + " is inactive."), v(e.tax_cert_expiry, a) && n.push("Certificate expired on " + String(e.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.")) : n.push("Choose a contractor."), Number(t.contract_value) > 0 || n.push("Enter the contract value."), n;
}
function E(t, e = [], r = "") {
  const a = {};
  if (t.project || (a.project = "Project is required"), t.activity || (a.activity = "Task / activity is required"), t.contractor || (a.contractor = "Contractor is required"), t.start_date || (a.start_date = "Start date is required"), t.end_date ? t.start_date && String(t.end_date) < String(t.start_date) && (a.end_date = "End date can't be before the start date") : a.end_date = "End date is required", (t.contract_value === "" || t.contract_value == null || !(Number(t.contract_value) >= 0)) && (a.contract_value = "Enter the contract value"), t.activity) {
    const n = r ? e.find((i) => i.name === r) : null;
    if (!n || n.activity !== t.activity) {
      const i = e.find((c) => c.activity === t.activity && c.name !== r);
      i && (a.activity = "Activity " + t.activity + " is already used on contract " + i.name + ". Create a new activity for each contract");
    }
  }
  return a;
}
function N(t, e) {
  return {
    canEdit: t === s || t === l,
    canSend: t === s || t === l,
    canApprove: t === d && !!e,
    canSendBack: t === d && !!e,
    canClose: t === u,
    canReopen: t === p && !!e,
    // Director only
    canEditNarration: t === u
    // the narration of an Approved contract can still be saved
  };
}
function m(t, e = !1) {
  return t.status === s && !t.raised_by || t.status === p && !!e;
}
function x(t, e = {}) {
  return Math.max(0, (Number(t.contract_value) || 0) - (Number(e[t.name]) || 0));
}
function D(t, e = {}) {
  const r = () => ({ n: 0, value: 0 }), a = { all: r(), pending: r(), approved: r(), closed: r(), totalValue: 0, approvedValue: 0, paid: 0, balance: 0 };
  for (const n of t || []) {
    const i = Number(n.contract_value) || 0, c = Number(e[n.name]) || 0;
    a.all.n++, a.all.value += i, a.totalValue += i, a.paid += c;
    for (const o of ["pending", "approved", "closed"]) f(n, o) && (a[o].n++, a[o].value += i);
    n.status === u && (a.approvedValue += i, a.balance += Math.max(0, i - c));
  }
  return a;
}
export {
  u as A,
  p as C,
  s as D,
  d as P,
  l as S,
  C as a,
  x as b,
  y as c,
  N as d,
  m as e,
  h as f,
  g,
  D as k,
  f as m,
  S as s,
  E as v
};
