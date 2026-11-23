import { i as v, t as p } from "./labourContractor-fn9JaBmq.js";
const o = "Draft", s = "Pending approval", l = "Approved", d = "Sent back", u = "Closed";
function y(t) {
  return { [o]: "amber", [s]: "amber", [l]: "green", [d]: "red", [u]: "blue" }[t] || "blue";
}
function b(t) {
  return Math.round(Number(t) || 0).toLocaleString("en-US");
}
function _(t, e) {
  return e === "draft" ? t.status === o || t.status === d : e === "pending" ? t.status === s : e === "approved" ? t.status === l : e === "closed" ? t.status === u : !0;
}
function h(t) {
  const e = { all: t.length, draft: 0, pending: 0, approved: 0, closed: 0 };
  for (const n of t) for (const a of ["draft", "pending", "approved", "closed"]) _(n, a) && e[a]++;
  return e;
}
function C(t, e, n = {}) {
  var r, i, c;
  const a = String(e || "").trim().toLowerCase();
  return a ? [
    t.name,
    t.status,
    (r = n.project) == null ? void 0 : r[t.project],
    t.project,
    (i = n.activity) == null ? void 0 : i[t.activity],
    t.activity,
    (c = n.contractor) == null ? void 0 : c[t.contractor],
    t.contractor
  ].some((f) => String(f || "").toLowerCase().includes(a)) : !0;
}
function E(t, e, n = [], a = p()) {
  const r = [];
  return e ? (e.disabled && r.push("Contractor " + (e.contractor_name || e.name) + " is inactive."), v(e.tax_cert_expiry, a) && r.push("Certificate expired on " + String(e.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.")) : r.push("Choose a contractor."), Number(t.contract_value) > 0 || r.push("Enter the contract value."), r;
}
function g(t, e = [], n = "") {
  const a = {};
  if (t.project || (a.project = "Project is required"), t.activity || (a.activity = "Task / activity is required"), t.contractor || (a.contractor = "Contractor is required"), t.start_date || (a.start_date = "Start date is required"), t.end_date ? t.start_date && String(t.end_date) < String(t.start_date) && (a.end_date = "End date can't be before the start date") : a.end_date = "End date is required", (t.contract_value === "" || t.contract_value == null || !(Number(t.contract_value) >= 0)) && (a.contract_value = "Enter the contract value"), t.activity) {
    const r = n ? e.find((i) => i.name === n) : null;
    if (!r || r.activity !== t.activity) {
      const i = e.find((c) => c.activity === t.activity && c.name !== n);
      i && (a.activity = "Activity " + t.activity + " is already used on contract " + i.name + ". Create a new activity for each contract");
    }
  }
  return a;
}
function x(t, e) {
  return {
    canEdit: t === o || t === d,
    canSend: t === o || t === d,
    canApprove: t === s && !!e,
    canSendBack: t === s && !!e,
    canClose: t === l,
    canReopen: t === u && !!e
    // Director only
  };
}
function D(t, e = !1) {
  return t.status === o && !t.raised_by || t.status === u && !!e;
}
export {
  l as A,
  u as C,
  o as D,
  s as P,
  d as S,
  C as a,
  x as b,
  h as c,
  D as d,
  E as e,
  b as f,
  _ as m,
  y as s,
  g as v
};
