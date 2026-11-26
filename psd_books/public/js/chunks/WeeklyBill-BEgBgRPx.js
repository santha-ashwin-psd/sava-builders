import { _ as ve, y as be, z as _e, o as ke, c, a as t, u, i as D, w as ut, B as Ht, F as N, r as R, v as Ut, d as g, t as r, X as me, b, D as fe, x as ye, n as pt, p as he, J as we, f as Z, l as vt, h as w, g as S, A as xt, a2 as ge, L as Ce, e as xe, K as Ft, a3 as je, $ as Se, Y as Kt, k as d, S as Ae } from "./main-BBWbU-FH.js";
import { b as $ } from "./format-BcJZDVG4.js";
import { o as B } from "./userNames-hIhnNfjN.js";
import { t as z, i as $t } from "./labourContractor-CwTlS8Kw.js";
import { f as x, s as Te } from "./labourContract-UoUa3DLZ.js";
const At = "Draft", kt = "Pending approval", V = "Approved", nt = "Sent back", G = "Paid", Y = "Cancelled", St = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], at = (a) => {
  const [s, p, v] = String(a).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(s, p - 1, v));
}, Wt = (a) => a.toISOString().slice(0, 10);
function Ee(a, s = z()) {
  return !!a && J(a) < J(s);
}
function Le(a, s, p, v = z()) {
  return !!p && Ee(s, v) && (Number(a.paid_till_now) || 0) > 5e-3;
}
function J(a) {
  const s = at(a);
  return s.setUTCDate(s.getUTCDate() - (s.getUTCDay() + 1) % 7), Wt(s);
}
function Pe(a) {
  const s = at(J(a));
  return s.setUTCDate(s.getUTCDate() + 6), Wt(s);
}
function mt(a) {
  if (!a) return "";
  const s = at(J(a)), p = at(Pe(a));
  return s.getUTCDate() + " " + St[s.getUTCMonth()] + " to " + p.getUTCDate() + " " + St[p.getUTCMonth()] + " " + p.getUTCFullYear();
}
function Tt(a, s) {
  return s === "draft" ? a.status === At || a.status === nt : s === "pending" ? a.status === kt : s === "approved" ? a.status === V : s === "paid" ? a.status === G : s === "cancelled" ? a.status === Y : !0;
}
function De(a) {
  const s = { all: a.length, draft: 0, pending: 0, approved: 0, paid: 0, cancelled: 0 };
  for (const p of a) for (const v of ["draft", "pending", "approved", "paid", "cancelled"]) Tt(p, v) && s[v]++;
  return s;
}
function Ne(a, s, p = {}, v = {}) {
  const k = String(s || "").trim().toLowerCase();
  if (!k) return !0;
  const _ = v[a.name] || {}, m = (_.contracts || []).join(" "), f = (_.projects || []).map((y) => y + " " + (p[y] || "")).join(" ");
  return [a.name, a.status, a.project, p[a.project], mt(a.week_start), m, f].some((y) => String(y || "").toLowerCase().includes(k));
}
function Be(a = []) {
  return a.length ? a.slice(0, 2).join(", ") + (a.length > 2 ? " +" + (a.length - 2) : "") : "—";
}
function Me(a, s = {}, p = {}) {
  const v = s && s.projects && s.projects.length ? s.projects : a && a.project ? [a.project] : [];
  if (!v.length) return "—";
  const k = v.map((_) => p[_] || _);
  return k.slice(0, 2).join(", ") + (k.length > 2 ? " +" + (k.length - 2) : "");
}
function Oe(a) {
  return (Number(a.balance) || 0) <= 5e-3 && !(Number(a.amount_to_pay) > 0);
}
function He(a = []) {
  return a.filter((s) => !Oe(s));
}
function Ue(a = []) {
  return a.filter((s) => Number(s.amount_to_pay) > 0);
}
function Fe(a = [], s = []) {
  const p = new Map(s.map((k) => [k.contract, Number(k.amount_to_pay) || 0]));
  return { rows: a.map((k) => {
    const _ = p.get(k.contract);
    return p.delete(k.contract), { ...k, amount_to_pay: _ && !k.paid_this_week ? _ : "" };
  }), dropped: [...p].filter(([, k]) => k > 0).map(([k]) => k) };
}
function Ke(a) {
  return String(a ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
}
function Re(a) {
  return a.reduce((s, p) => s + (Number(p.amount_to_pay) || 0), 0);
}
function _t(a) {
  const s = Number(a.amount_to_pay) || 0;
  return s < 0 ? "Amount can't be negative" : s > (Number(a.balance) || 0) + 5e-3 ? "Above the balance of " + Math.round(Number(a.balance) || 0).toLocaleString("en-US") : "";
}
function $e(a, s = [], p = z()) {
  const v = [], k = a.filter((_) => Number(_.amount_to_pay) > 0);
  k.length || v.push("Enter an amount to pay on at least one contract.");
  for (const _ of k) {
    const m = s.find((y) => y.name === _.contractor), f = m && m.contractor_name || _.contractor;
    m && m.disabled && v.push("Contractor " + f + " is inactive."), m && $t(m.tax_cert_expiry, p) && v.push("Certificate of " + f + " expired on " + String(m.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
  }
  for (const _ of a) {
    const m = _t(_);
    m && v.push("Contract " + _.contract + ": " + m);
  }
  return v;
}
function We(a, s = []) {
  const p = {};
  return a.week_date ? s.length || (p.week_date = "There are no Approved contracts to bill") : p.week_date = "Pick a date in the week", p;
}
function jt(a, s, p = s) {
  const v = a === At || a === nt;
  return {
    canEdit: v,
    canSend: v,
    canApprove: a === kt && !!s,
    canSendBack: a === kt && !!s,
    canMarkPaid: a === V && !!p,
    canReopen: a === V && !!s,
    canCancel: a === V && !!s,
    canMarkUnpaid: a === G && !!s,
    canAmend: a === Y
  };
}
function Ie(a) {
  return a === V || a === G;
}
const A = (a) => String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), tt = (a) => Math.round(Number(a) || 0).toLocaleString("en-US");
function Rt(a) {
  if (!a) return "";
  const s = at(a);
  return isNaN(s) ? "" : s.getUTCDate() + " " + St[s.getUTCMonth()] + " " + s.getUTCFullYear();
}
function Ve(a, s = []) {
  const p = s.reduce((f, y) => f + (Number(y.amount_to_pay) || 0), 0), v = s.map((f, y) => "<tr><td>" + (y + 1) + "</td><td>" + A(f.contract) + '</td><td class="l">' + A(f.contractor) + '</td><td class="l">' + A(f.activity) + '</td><td class="l">' + A(f.project) + '</td><td class="r">' + tt(f.contract_value) + '</td><td class="r">' + tt(f.paid_till_now) + '</td><td class="r">' + tt(f.balance) + '</td><td class="r"><b>' + tt(f.amount_to_pay) + "</b></td></tr>").join(""), k = '<tr class="tt"><td colspan="8" class="r"><b>Total to pay now (KES)</b></td><td class="r"><b>' + tt(p) + "</b></td></tr>", _ = a.approved_by || a.approved_on ? "Approved by " + A(a.approved_by) + (a.approved_on ? " on " + A(Rt(a.approved_on)) : "") + "." : "", m = a.status === G ? " Paid" + (a.paid_by ? " by " + A(a.paid_by) : "") + (a.paid_on ? " on " + A(Rt(a.paid_on)) : "") + "." : "";
  return '<!doctype html><html><head><meta charset="utf-8"><title>Weekly Bill ' + A(a.name) + "</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0}h1{font-size:15px;text-align:center;text-decoration:underline;margin:0 0 6px}p.sub{text-align:center;margin:0 0 10px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:4px 6px;text-align:center}td.l{text-align:left}td.r,th.r{text-align:right}tr.tt td{background:#f3f3f3}.note{margin:10px 0 0}.sig{display:flex;justify-content:space-between;margin-top:46px}.sig div{width:30%;border-top:1px solid #000;padding-top:4px;text-align:center}</style></head><body><h1>WEEKLY BILL " + A(a.name) + '</h1><p class="sub">Week (Saturday to Friday): ' + A(mt(a.week_date)) + " &nbsp;|&nbsp; Status: " + A(a.status) + '</p><table><tr><th>S.NO</th><th>Contract</th><th>Contractor</th><th>Activity</th><th>Project</th><th class="r">Contract Value</th><th class="r">Paid Till Now</th><th class="r">Balance Amount</th><th class="r">Amount To Pay Now</th></tr>' + v + k + '</table><p class="note">' + _ + m + '</p><div class="sig"><div>Prepared by</div><div>Approved by (Director)</div><div>Received by (Contractor)</div></div></body></html>';
}
function ze(a) {
  return a.status === Y || a.status === nt || a.status === At && !a.raised_by;
}
function Ye(a, s, p) {
  return {
    doctype: "Labour Weekly Bill",
    ...a.name ? { name: a.name } : {},
    company: p,
    week_start: a.week_date,
    lines: s.map((v) => ({ contract: v.contract, amount_to_pay: Number(v.amount_to_pay) || 0 }))
  };
}
function Je(a, s, p = {}) {
  return s ? a.project === s || ((p[a.name] || {}).projects || []).includes(s) : !0;
}
function Ge(a, s = z()) {
  const p = () => ({ n: 0, value: 0 }), v = { all: p(), draft: p(), pending: p(), approved: p(), paidBills: p(), weekN: 0, weekValue: 0, paid: 0 }, k = J(s);
  for (const _ of a || []) {
    if (_.status === Y) continue;
    const m = Number(_.total_amount) || 0;
    v.all.n++, v.all.value += m;
    for (const f of ["draft", "pending", "approved"]) Tt(_, f) && (v[f].n++, v[f].value += m);
    _.status === G && (v.paid += m, v.paidBills.n++, v.paidBills.value += m), _.week_start && J(_.week_start) === k && _.status !== nt && (v.weekN++, v.weekValue += m);
  }
  return v;
}
const qe = { class: "list-page" }, Xe = { class: "sales-toolbar" }, Qe = { class: "sales-search" }, Ze = ["innerHTML"], ta = { class: "sales-pills" }, ea = ["onClick"], aa = ["value"], na = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, oa = ["innerHTML"], sa = ["disabled", "title"], la = ["innerHTML"], ia = { class: "bk-kpi-grid bk-kpi-grid-4" }, ra = { class: "bk-kpi-inner" }, da = { class: "bk-kpi-body" }, ca = { class: "bk-kpi-value" }, ua = { class: "bk-kpi-trend ct-kpi-sub" }, pa = { class: "bk-kpi-inner" }, va = { class: "bk-kpi-body" }, ba = { class: "bk-kpi-value" }, _a = { class: "bk-kpi-trend ct-kpi-sub" }, ka = { class: "bk-kpi-inner" }, ma = { class: "bk-kpi-body" }, fa = { class: "bk-kpi-value bk-kpi-amber" }, ya = { class: "bk-kpi-trend ct-kpi-sub" }, ha = { class: "bk-kpi-inner" }, wa = { class: "bk-kpi-body" }, ga = { class: "bk-kpi-value bk-kpi-green" }, Ca = { class: "bk-kpi-trend ct-kpi-sub" }, xa = { class: "bk-stat-grid" }, ja = { class: "bk-stat-card" }, Sa = { class: "bk-stat-content" }, Aa = { class: "bk-stat-value" }, Ta = { class: "bk-stat-card" }, Ea = { class: "bk-stat-content" }, La = {
  class: "bk-stat-value bk-kpi-blue",
  style: { "font-size": "16px" }
}, Pa = { class: "bk-stat-card" }, Da = { class: "bk-stat-content" }, Na = {
  class: "bk-stat-value bk-kpi-green",
  style: { "font-size": "16px" }
}, Ba = { class: "bk-stat-card" }, Ma = { class: "bk-stat-content" }, Oa = {
  class: "bk-stat-value bk-kpi-amber",
  style: { "font-size": "16px" }
}, Ha = { class: "inv-table-wrap" }, Ua = { class: "inv-table" }, Fa = { key: 1 }, Ka = {
  colspan: "7",
  class: "vt-empty"
}, Ra = { class: "vt-empty-title" }, $a = { class: "vt-empty-sub" }, Wa = ["onClick"], Ia = { class: "vt-td vt-td-mono" }, Va = { class: "vt-td" }, za = ["title"], Ya = { class: "vt-td vt-td-secondary" }, Ja = { class: "vt-td vt-td-r" }, Ga = { class: "vt-td vt-td-r" }, qa = { class: "vt-td" }, Xa = {
  key: 0,
  class: "vt-footer"
}, Qa = {
  class: "inv-drawer-panel open ct-drawer",
  style: { width: "1160px", "max-width": "98vw" }
}, Za = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#1e3a5f,#1a6ef7)", padding: "18px 24px" }
}, tn = { class: "cust-drawer-header-left" }, en = { class: "inv-dh-title" }, an = { class: "cust-drawer-sub" }, nn = ["innerHTML"], on = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, sn = {
  key: 0,
  class: "inv-field"
}, ln = ["value"], rn = { class: "inv-field" }, dn = ["disabled"], cn = {
  key: 0,
  class: "ct-err"
}, un = { class: "inv-field" }, pn = ["value"], vn = { style: { "overflow-x": "auto", "margin-top": "16px" } }, bn = { class: "inv-table" }, _n = { key: 0 }, kn = { key: 1 }, mn = {
  colspan: "8",
  class: "vt-empty"
}, fn = { class: "vt-empty-sub" }, yn = { class: "vt-td vt-td-mono" }, hn = { class: "vt-td" }, wn = {
  key: 0,
  class: "ct-flag"
}, gn = { class: "vt-td" }, Cn = { class: "vt-td" }, xn = { class: "vt-td vt-td-r" }, jn = { class: "vt-td vt-td-r" }, Sn = {
  key: 0,
  class: "ct-hint"
}, An = { class: "vt-td vt-td-r" }, Tn = { class: "vt-td vt-td-r" }, En = ["value", "onInput", "disabled", "aria-label"], Ln = {
  key: 0,
  class: "ct-hint"
}, Pn = {
  key: 1,
  class: "ct-hint"
}, Dn = {
  key: 2,
  class: "ct-err"
}, Nn = {
  key: 0,
  style: { "margin-top": "12px", "font-weight": "600", "text-align": "right" }
}, Bn = {
  key: 1,
  class: "ct-info"
}, Mn = ["innerHTML"], On = {
  key: 2,
  class: "ct-note ct-note-bad"
}, Hn = {
  key: 3,
  class: "ct-note"
}, Un = {
  key: 4,
  class: "ct-note ct-note-ok"
}, Fn = {
  key: 5,
  class: "ct-note ct-note-bad"
}, Kn = { key: 0 }, Rn = {
  key: 6,
  class: "ct-note"
}, $n = {
  key: 7,
  class: "ct-note ct-note-ok"
}, Wn = {
  key: 8,
  class: "ct-errbox"
}, In = { class: "ct-errbox-title" }, Vn = ["innerHTML"], zn = {
  key: 9,
  class: "ct-note ct-note-bad"
}, Yn = {
  key: 10,
  class: "inv-view-footer at-audit"
}, Jn = { class: "inv-dfooter" }, Gn = { class: "add-footer-status" }, qn = { class: "add-footer-actions" }, Xn = ["disabled"], Qn = ["disabled"], Zn = ["innerHTML"], to = ["disabled"], eo = ["innerHTML"], ao = ["disabled"], no = ["disabled"], oo = ["disabled"], so = ["disabled"], lo = ["innerHTML"], io = ["disabled"], ro = ["disabled"], co = ["disabled"], uo = ["disabled"], bt = "Labour Weekly Bill", et = "psd_books.api.labour_weekly_bill.", po = {
  __name: "WeeklyBill",
  setup(a) {
    const { toast: s } = be(), { confirm: p } = je(), { prompt: v } = Se(), { canEdit: k } = Ae(), _ = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "paid", l: "Paid" }, { k: "cancelled", l: "Cancelled" }], m = w([]), f = w([]), y = w({}), ot = w({}), F = w({}), st = w([]), Et = w(!1);
    function It(o, e) {
      const n = Ke(o.target.value);
      o.target.value = n, e.amount_to_pay = n;
    }
    const Lt = w(!1), lt = w(!0), q = w(""), E = w("all"), M = w(""), ft = w({}), Vt = { draft: "pill-draft", pending: "pill-unpaid", approved: "pill-paid", paid: "pill-paid", cancelled: "pill-draft" }, O = w(!1), yt = w(!1), j = w(!1), C = w([]), H = w(""), Pt = (o) => F.value[o.contract] || o.project || "", X = S(() => {
      const o = h.value.canEdit ? He(C.value) : Ue(C.value);
      return H.value && h.value.canEdit ? o.filter((e) => Pt(e) === H.value) : o;
    });
    function zt() {
      H.value && (C.value = C.value.map((o) => Pt(o) === H.value ? o : { ...o, amount_to_pay: "" }));
    }
    const ht = w(!1), W = w(""), P = xt({}), l = xt({}), U = xt({ owner: "", creation: "", modified_by: "", modified: "" });
    async function Dt(o) {
      if (Object.assign(U, { owner: "", creation: "", modified_by: "", modified: "" }), !!o)
        try {
          const e = await Kt(bt, o);
          Object.assign(U, { owner: e.owner, creation: e.creation, modified_by: e.modified_by, modified: e.modified });
        } catch {
        }
    }
    _e(() => [l.name, l.status], () => Dt(l.name));
    const wt = S(() => k("admin")), Yt = () => ({ name: "", status: "Draft", project: "", week_date: z(), raised_by: "", approved_by: "", approved_on: "", paid_by: "", paid_on: "", cancelled_by: "", cancelled_on: "", cancel_reason: "", amended_from: "", rejection_reason: "" });
    function Nt(o) {
      Object.keys(P).forEach((e) => delete P[e]), Object.keys(l).forEach((e) => delete l[e]), Object.assign(l, Yt(), o || {}), C.value = [], W.value = "", H.value = "";
    }
    const Jt = S(() => f.value.filter((o) => o.status !== "Closed")), it = S(() => Object.fromEntries(f.value.map((o) => [o.name, o.project_name || o.name]))), Bt = S(() => Object.fromEntries(st.value.map((o) => [o.name, o.contractor_name || o.name]))), rt = S(() => M.value ? m.value.filter((o) => Je(o, M.value, y.value)) : m.value), Gt = S(() => De(rt.value)), T = S(() => Ge(rt.value, z())), qt = S(() => M.value ? Number(ft.value[M.value]) || 0 : Object.values(ft.value).reduce((o, e) => o + (Number(e) || 0), 0)), gt = S(() => rt.value.filter((o) => Tt(o, E.value) && Ne(o, q.value, it.value, y.value))), h = S(() => jt(l.status, Et.value, Lt.value)), Xt = S(() => !!l.name && ze(l)), Q = S(() => Re(C.value)), dt = S(() => $e(C.value, st.value)), Ct = (o) => Le(o, l.week_date, !l.name), Qt = (o) => {
      const e = st.value.find((n) => n.name === o);
      return !!e && $t(e.tax_cert_expiry);
    };
    function Zt(o) {
      return P[o] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function I() {
      lt.value = !0;
      try {
        const [o, e, n, i, L] = await Promise.all([
          Z(bt, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "creation desc", limit: 1e3 }),
          Z("Project", { fields: ["name", "project_name", "status"], limit: 1e3 }),
          Z("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1e3 }),
          vt("psd_books.api.labour_contract.my_permissions", {}),
          vt(et + "balance_by_project", {}).catch(() => ({}))
          // card only: the page still opens if this fails
        ]);
        m.value = o || [], f.value = e || [], st.value = n || [], Et.value = !!(i && i.can_approve), Lt.value = !!(i && i.can_mark_paid), ft.value = L && typeof L == "object" && !Array.isArray(L) ? L.message || L : {}, te(), ee();
      } catch (o) {
        s("Failed to load weekly bills: " + (o.message || o), "error");
      } finally {
        lt.value = !1;
      }
    }
    async function te() {
      try {
        y.value = await vt(et + "list_columns", { names: m.value.map((o) => o.name) }) || {};
      } catch {
        y.value = {};
      }
    }
    async function ee() {
      try {
        const [o, e] = await Promise.all([
          Z("Labour Contract", { fields: ["name", "activity", "project"], limit: 1e3 }),
          Z("Labour Activity", { fields: ["name", "activity_name"], limit: 1e3 })
        ]), n = Object.fromEntries((e || []).map((i) => [i.name, i.activity_name || i.name]));
        ot.value = Object.fromEntries((o || []).map((i) => [i.name, n[i.activity] || i.activity || ""])), F.value = Object.fromEntries((o || []).map((i) => [i.name, i.project || ""]));
      } catch {
        ot.value = {}, F.value = {};
      }
    }
    async function ct(o) {
      if (W.value = "", !l.week_date) {
        C.value = [];
        return;
      }
      ht.value = !0;
      try {
        const e = await vt(et + "preview", { week_date: l.week_date, name: l.name || null }), n = Fe(e.rows || [], o || C.value);
        C.value = n.rows.map((i) => Ct(i) ? { ...i, amount_to_pay: "" } : i), n.dropped.length && (W.value = "Contract " + n.dropped.join(", ") + " is no longer Approved, or its project is Closed, so it can't be paid on this bill.");
      } catch (e) {
        C.value = [], s(e.message || "Could not load contracts", "error");
      } finally {
        ht.value = !1;
      }
    }
    function ae() {
      Nt(), O.value = !0, ct();
    }
    async function Mt(o) {
      Nt({ ...o, week_date: o.week_start }), O.value = !0;
      try {
        const e = await Kt(bt, o.name);
        Object.assign(l, { rejection_reason: e.rejection_reason, approved_by: e.approved_by, approved_on: e.approved_on, paid_by: e.paid_by, paid_on: e.paid_on, cancelled_by: e.cancelled_by, cancelled_on: e.cancelled_on, cancel_reason: e.cancel_reason, amended_from: e.amended_from, raised_by: e.raised_by }), jt(e.status, !1).canEdit ? await ct(e.lines || []) : C.value = (e.lines || []).map((n) => ({ ...n }));
      } catch (e) {
        s(e.message || "Could not open bill", "error");
      }
    }
    async function Ot(o) {
      const e = We(l, C.value);
      if (Object.keys(P).forEach((i) => delete P[i]), Object.assign(P, e), Object.keys(e).length)
        return s(Object.values(e)[0], "error"), "";
      const n = C.value.map((i) => _t(i)).find(Boolean);
      if (n)
        return s(n, "error"), "";
      yt.value = !0;
      try {
        const i = await Ce(Ye(l, C.value, await xe())), L = i && i.name || l.name;
        return o || s(l.name ? "Bill updated" : "Bill saved"), l.name = L, await I(), L;
      } catch (i) {
        return s(i.message || "Could not save bill", "error"), "";
      } finally {
        yt.value = !1;
      }
    }
    async function K(o, e, n) {
      j.value = !0;
      try {
        const i = await Ft(et + o, e);
        s(n), await I(), i && i.name && (Object.assign(l, { status: i.status, raised_by: i.raised_by, approved_by: i.approved_by, approved_on: i.approved_on, paid_by: i.paid_by, paid_on: i.paid_on, cancelled_by: i.cancelled_by, cancelled_on: i.cancelled_on, cancel_reason: i.cancel_reason, amended_from: i.amended_from, rejection_reason: i.rejection_reason }), Dt(i.name), jt(i.status, !1).canEdit ? await ct(i.lines || []) : C.value = (i.lines || []).map((L) => ({ ...L })));
      } catch (i) {
        s(i.message || "Action failed", "error");
      } finally {
        j.value = !1;
      }
    }
    async function ne() {
      if (!await p({ title: "Confirm to send for approval", body: "Send this bill to the Director for approval? Total to pay: KES " + x(Q.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const e = await Ot(!0);
      e && await K("send_for_approval", { name: e }, "Sent for Director approval");
    }
    async function oe() {
      await p({ title: "Confirm to approve", body: "Approve " + l.name + "? Total to pay: KES " + x(Q.value) + ".", okLabel: "Approve", okStyle: "primary" }) && await K("approve_bill", { name: l.name }, "Bill approved");
    }
    async function se() {
      await p({ title: "Confirm to mark as paid", body: "Mark bill " + l.name + " as paid? Total paid: KES " + x(Q.value) + ". The payment is recorded now and can't be undone.", okLabel: "Yes, mark as Paid", okStyle: "primary" }) && await K("mark_paid", { name: l.name }, "Payment recorded");
    }
    async function le() {
      await p({ title: "Confirm to edit", body: "Reopen " + l.name + " as a Draft so the amounts can be changed? Its approval is cleared and it must be sent to the Director for approval again.", okLabel: "Reopen for editing", okStyle: "primary" }) && await K("reopen_bill", { name: l.name }, "Bill reopened as Draft");
    }
    async function ie() {
      await p({ title: "Confirm to mark as unpaid", body: "Reverse the payment of " + l.name + " (KES " + x(Q.value) + ")? The bill goes back to Approved and the amount no longer counts as paid.", okLabel: "Yes, mark unpaid", okStyle: "primary" }) && await K("mark_unpaid", { name: l.name }, "Bill marked unpaid");
    }
    async function re() {
      const o = await v({ title: "Cancel bill", label: "Reason", okLabel: "Cancel bill" });
      !o || !o.trim() || await K("cancel_bill", { name: l.name, reason: o.trim() }, "Bill cancelled");
    }
    async function de() {
      if (await p({ title: "Confirm to amend", body: "Make a new Draft bill from " + l.name + " with the same week and amounts. You can change it and send it for approval.", okLabel: "Amend", okStyle: "primary" })) {
        j.value = !0;
        try {
          const e = await Ft(et + "amend_bill", { name: l.name });
          s("New draft " + e.name + " made"), await I();
          const n = m.value.find((i) => i.name === e.name);
          n ? await Mt(n) : O.value = !1;
        } catch (e) {
          s(e.message || "Could not amend bill", "error");
        } finally {
          j.value = !1;
        }
      }
    }
    async function ce() {
      const o = await v({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !o || !o.trim() || await K("send_back_bill", { name: l.name, reason: o.trim() }, "Sent back");
    }
    async function ue() {
      if (await p({ title: "Confirm to delete", body: "Delete " + l.name + "? Only a Draft never sent for approval, a Sent back bill, or a Cancelled bill, can be deleted." })) {
        j.value = !0;
        try {
          await ge(bt, l.name), s("Bill deleted"), O.value = !1, await I();
        } catch (e) {
          s(e.message || "Could not delete bill", "error");
        } finally {
          j.value = !1;
        }
      }
    }
    function pe() {
      const o = window.open("", "_blank");
      if (!o) {
        s("Allow pop-ups to print the bill", "error");
        return;
      }
      const e = X.value.map((i) => ({
        contract: i.contract,
        contractor: Bt.value[i.contractor] || i.contractor,
        activity: ot.value[i.contract] || "",
        project: it.value[F.value[i.contract] || i.project] || F.value[i.contract] || i.project || "",
        contract_value: i.contract_value,
        paid_till_now: i.paid_till_now,
        balance: i.balance,
        amount_to_pay: i.amount_to_pay
      })), n = {
        name: l.name,
        status: l.status,
        week_date: l.week_date,
        approved_by: l.approved_by ? B(l.approved_by) : "",
        approved_on: l.approved_on,
        paid_by: l.paid_by ? B(l.paid_by) : "",
        paid_on: l.paid_on
      };
      o.document.write(Ve(n, e)), o.document.close(), o.focus(), o.print();
    }
    return ke(I), (o, e) => (d(), c("div", qe, [
      t("div", Xe, [
        t("div", Qe, [
          t("span", {
            innerHTML: u(D)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Ze),
          ut(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (n) => q.value = n),
            placeholder: "Search weekly bills…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [Ht, q.value]
          ])
        ]),
        t("div", ta, [
          (d(), c(N, null, R(_, (n) => t("button", {
            key: n.k,
            class: pt(["sales-pill", [{ active: E.value === n.k }, n.k !== "all" ? Vt[n.k] : ""]]),
            onClick: (i) => E.value = n.k
          }, [
            g(r(n.l) + " ", 1),
            t("span", {
              class: pt(["sales-pill-count", E.value === n.k ? "" : "zb-pc-muted"])
            }, r(Gt.value[n.k]), 3)
          ], 10, ea)), 64))
        ]),
        ut(t("select", {
          "onUpdate:modelValue": e[1] || (e[1] = (n) => M.value = n),
          class: "inv-fi ct-project-filter",
          title: "Filter by project"
        }, [
          e[13] || (e[13] = t("option", { value: "" }, "All projects", -1)),
          (d(!0), c(N, null, R(f.value, (n) => (d(), c("option", {
            key: n.name,
            value: n.name
          }, r(n.project_name || n.name), 9, aa))), 128))
        ], 512), [
          [Ut, M.value]
        ]),
        t("div", na, [
          t("button", {
            class: "sales-btn-ghost",
            onClick: I,
            title: "Refresh"
          }, [
            t("span", {
              innerHTML: u(D)("refresh", 13)
            }, null, 8, oa),
            e[14] || (e[14] = g(" Refresh", -1))
          ]),
          t("button", {
            class: "sales-btn-primary",
            disabled: !o.$canCreate("admin"),
            title: o.$canCreate("admin") ? "" : "Not permitted",
            onClick: ae
          }, [
            t("span", {
              innerHTML: u(D)("plus", 13)
            }, null, 8, la),
            e[15] || (e[15] = g(" New Weekly Bill", -1))
          ], 8, sa)
        ])
      ]),
      t("div", ia, [
        t("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: e[2] || (e[2] = (n) => E.value = "all")
        }, [
          t("div", ra, [
            e[17] || (e[17] = t("div", {
              class: "bk-kpi-icon",
              style: { background: "#dbeafe" }
            }, [
              t("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#2563eb",
                "stroke-width": "1.8"
              }, [
                t("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                t("polyline", { points: "14 2 14 8 20 8" })
              ])
            ], -1)),
            t("div", da, [
              e[16] || (e[16] = t("div", { class: "bk-kpi-label" }, "Total Bills", -1)),
              t("div", ca, r(T.value.all.n), 1),
              t("div", ua, "KES " + r(u(x)(T.value.all.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[3] || (e[3] = (n) => E.value = "draft")
        }, [
          t("div", pa, [
            e[19] || (e[19] = t("div", {
              class: "bk-kpi-icon",
              style: { background: "#e2e8f0" }
            }, [
              t("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#475569",
                "stroke-width": "1.8"
              }, [
                t("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                t("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
              ])
            ], -1)),
            t("div", va, [
              e[18] || (e[18] = t("div", { class: "bk-kpi-label" }, "Draft", -1)),
              t("div", ba, r(T.value.draft.n), 1),
              t("div", _a, "KES " + r(u(x)(T.value.draft.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: e[4] || (e[4] = (n) => E.value = "pending")
        }, [
          t("div", ka, [
            e[21] || (e[21] = t("div", {
              class: "bk-kpi-icon",
              style: { background: "#fef3c7" }
            }, [
              t("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#d97706",
                "stroke-width": "1.8"
              }, [
                t("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10"
                }),
                t("polyline", { points: "12 6 12 12 16 14" })
              ])
            ], -1)),
            t("div", ma, [
              e[20] || (e[20] = t("div", { class: "bk-kpi-label" }, "Pending Approval", -1)),
              t("div", fa, r(T.value.pending.n), 1),
              t("div", ya, "KES " + r(u(x)(T.value.pending.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[5] || (e[5] = (n) => E.value = "approved")
        }, [
          t("div", ha, [
            e[23] || (e[23] = t("div", {
              class: "bk-kpi-icon",
              style: { background: "#dcfce7" }
            }, [
              t("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none"
              }, [
                t("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "#16a34a",
                  "stroke-width": "1.8"
                }),
                t("polyline", {
                  points: "7 12.5 10.5 16 17 9",
                  stroke: "#16a34a",
                  "stroke-width": "1.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ])
            ], -1)),
            t("div", wa, [
              e[22] || (e[22] = t("div", { class: "bk-kpi-label" }, "Approved", -1)),
              t("div", ga, r(T.value.approved.n), 1),
              t("div", Ca, "KES " + r(u(x)(T.value.approved.value)), 1)
            ])
          ])
        ])
      ]),
      t("div", xa, [
        t("div", ja, [
          t("div", Sa, [
            t("div", null, [
              e[24] || (e[24] = t("div", { class: "bk-stat-label" }, "Bills This Week", -1)),
              t("div", Aa, r(T.value.weekN), 1)
            ]),
            e[25] || (e[25] = me('<div class="bk-stat-icon" style="background:#dbeafe;color:#2563eb;" data-v-4f4d99a0><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-4f4d99a0><rect x="3" y="4" width="18" height="18" rx="2" data-v-4f4d99a0></rect><line x1="16" y1="2" x2="16" y2="6" data-v-4f4d99a0></line><line x1="8" y1="2" x2="8" y2="6" data-v-4f4d99a0></line><line x1="3" y1="10" x2="21" y2="10" data-v-4f4d99a0></line></svg></div>', 1))
          ])
        ]),
        t("div", Ta, [
          t("div", Ea, [
            t("div", null, [
              e[26] || (e[26] = t("div", { class: "bk-stat-label" }, "Amount This Week", -1)),
              t("div", La, "KES " + r(u(x)(T.value.weekValue)), 1)
            ]),
            e[27] || (e[27] = t("div", {
              class: "bk-stat-icon",
              style: { background: "#cffafe", color: "#0891b2" }
            }, [
              t("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                t("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" })
              ])
            ], -1))
          ])
        ]),
        t("div", Pa, [
          t("div", Da, [
            t("div", null, [
              e[28] || (e[28] = t("div", { class: "bk-stat-label" }, "Total Paid", -1)),
              t("div", Na, "KES " + r(u(x)(T.value.paid)), 1)
            ]),
            e[29] || (e[29] = t("div", {
              class: "bk-stat-icon",
              style: { background: "#dcfce7", color: "#16a34a" }
            }, [
              t("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                t("rect", {
                  x: "2",
                  y: "5",
                  width: "20",
                  height: "14",
                  rx: "2"
                }),
                t("line", {
                  x1: "2",
                  y1: "10",
                  x2: "22",
                  y2: "10"
                })
              ])
            ], -1))
          ])
        ]),
        t("div", Ba, [
          t("div", Ma, [
            t("div", null, [
              e[30] || (e[30] = t("div", { class: "bk-stat-label" }, "Balance To Pay", -1)),
              t("div", Oa, "KES " + r(u(x)(qt.value)), 1)
            ]),
            e[31] || (e[31] = t("div", {
              class: "bk-stat-icon",
              style: { background: "#fef3c7", color: "#d97706" }
            }, [
              t("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                t("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10"
                }),
                t("polyline", { points: "12 6 12 12 16 14" })
              ])
            ], -1))
          ])
        ])
      ]),
      t("div", Ha, [
        t("table", Ua, [
          e[34] || (e[34] = t("thead", null, [
            t("tr", null, [
              t("th", { class: "vt-th" }, "Bill"),
              t("th", { class: "vt-th" }, "Project"),
              t("th", { class: "vt-th" }, "Contract"),
              t("th", { class: "vt-th" }, "Week (Saturday to Friday)"),
              t("th", { class: "vt-th vt-th-r" }, "Total to Pay (KES)"),
              t("th", { class: "vt-th vt-th-r" }, "Balance to Pay (KES)"),
              t("th", { class: "vt-th" }, "Status")
            ])
          ], -1)),
          t("tbody", null, [
            lt.value ? (d(), c(N, { key: 0 }, R(6, (n) => t("tr", {
              key: n,
              class: "vt-row-shimmer"
            }, [...e[32] || (e[32] = [
              t("td", { colspan: "7" }, [
                t("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : gt.value.length ? (d(!0), c(N, { key: 2 }, R(gt.value, (n) => (d(), c("tr", {
              key: n.name,
              class: "inv-row",
              onClick: (i) => Mt(n)
            }, [
              t("td", Ia, r(n.name), 1),
              t("td", Va, r(u(Me)(n, y.value[n.name], it.value)), 1),
              t("td", {
                class: "vt-td vt-td-mono",
                title: ((y.value[n.name] || {}).contracts || []).join(", ")
              }, r(u(Be)((y.value[n.name] || {}).contracts)), 9, za),
              t("td", Ya, r(u(mt)(n.week_start)), 1),
              t("td", Ja, r(u(x)(n.total_amount)), 1),
              t("td", Ga, r(y.value[n.name] ? u(x)(y.value[n.name].balance_after) : "—"), 1),
              t("td", qa, [
                t("span", {
                  class: pt(["vt-badge", "vt-badge-" + u(Te)(n.status)])
                }, [
                  e[33] || (e[33] = t("span", { class: "vt-badge-dot" }, null, -1)),
                  g(r(n.status), 1)
                ], 2)
              ])
            ], 8, Wa))), 128)) : (d(), c("tr", Fa, [
              t("td", Ka, [
                t("div", Ra, r(q.value || M.value || E.value !== "all" ? "No results found" : "No weekly bills yet"), 1),
                t("div", $a, r(q.value || M.value || E.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly bill"), 1)
              ])
            ]))
          ])
        ]),
        !lt.value && m.value.length ? (d(), c("div", Xa, [
          e[35] || (e[35] = g("Showing ", -1)),
          t("strong", null, r(gt.value.length), 1),
          e[36] || (e[36] = g(" of ", -1)),
          t("strong", null, r(rt.value.length), 1),
          e[37] || (e[37] = g(" bills", -1))
        ])) : b("", !0)
      ]),
      e[48] || (e[48] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.", -1)),
      (d(), fe(we, { to: "body" }, [
        O.value ? (d(), c("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: e[12] || (e[12] = ye((n) => O.value = !1, ["self"]))
        }, [
          t("div", Qa, [
            t("div", Za, [
              t("div", tn, [
                t("div", null, [
                  t("div", en, r(l.name || "New Weekly Bill"), 1),
                  t("div", an, r(l.name ? l.status : "Amounts to pay contractors for one week"), 1)
                ])
              ]),
              t("button", {
                class: "inv-dclose",
                style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                onClick: e[6] || (e[6] = (n) => O.value = !1),
                innerHTML: u(D)("x", 15)
              }, null, 8, nn)
            ]),
            t("div", on, [
              t("div", {
                class: pt(["inv-fg", h.value.canEdit ? "inv-fg3" : "inv-fg2"])
              }, [
                h.value.canEdit ? (d(), c("div", sn, [
                  e[39] || (e[39] = t("label", { class: "inv-lbl" }, "Project", -1)),
                  ut(t("select", {
                    "onUpdate:modelValue": e[7] || (e[7] = (n) => H.value = n),
                    class: "inv-fi",
                    onChange: zt
                  }, [
                    e[38] || (e[38] = t("option", { value: "" }, "All projects", -1)),
                    (d(!0), c(N, null, R(Jt.value, (n) => (d(), c("option", {
                      key: n.name,
                      value: n.name
                    }, r(n.project_name || n.name), 9, ln))), 128))
                  ], 544), [
                    [Ut, H.value]
                  ])
                ])) : b("", !0),
                t("div", rn, [
                  e[40] || (e[40] = t("label", { class: "inv-lbl" }, [
                    g("Pick any date in the week "),
                    t("span", { class: "nim-req" }, "*")
                  ], -1)),
                  ut(t("input", {
                    type: "date",
                    "onUpdate:modelValue": e[8] || (e[8] = (n) => l.week_date = n),
                    class: "inv-fi",
                    style: he(Zt("week_date")),
                    disabled: !h.value.canEdit || !!l.name,
                    onChange: e[9] || (e[9] = (n) => {
                      delete P.week_date, ct();
                    })
                  }, null, 44, dn), [
                    [Ht, l.week_date]
                  ]),
                  P.week_date ? (d(), c("div", cn, r(P.week_date), 1)) : b("", !0)
                ]),
                t("div", un, [
                  e[41] || (e[41] = t("label", { class: "inv-lbl" }, "Week (Saturday to Friday)", -1)),
                  t("input", {
                    class: "inv-fi",
                    value: u(mt)(l.week_date),
                    disabled: ""
                  }, null, 8, pn)
                ])
              ], 2),
              t("div", vn, [
                t("table", bn, [
                  e[43] || (e[43] = t("thead", null, [
                    t("tr", null, [
                      t("th", { class: "vt-th" }, "Contract"),
                      t("th", { class: "vt-th" }, "Contractor"),
                      t("th", { class: "vt-th" }, "Activity"),
                      t("th", { class: "vt-th" }, "Project"),
                      t("th", { class: "vt-th vt-th-r" }, "Contract Value"),
                      t("th", { class: "vt-th vt-th-r" }, "Paid Till Now"),
                      t("th", { class: "vt-th vt-th-r" }, "Balance Amount"),
                      t("th", { class: "vt-th vt-th-r" }, "Amount To Pay Now")
                    ])
                  ], -1)),
                  t("tbody", null, [
                    ht.value ? (d(), c("tr", _n, [...e[42] || (e[42] = [
                      t("td", {
                        colspan: "8",
                        class: "vt-empty"
                      }, [
                        t("div", { class: "vt-empty-sub" }, "Loading contracts…")
                      ], -1)
                    ])])) : X.value.length ? (d(!0), c(N, { key: 2 }, R(X.value, (n) => (d(), c("tr", {
                      key: n.contract
                    }, [
                      t("td", yn, r(n.contract), 1),
                      t("td", hn, [
                        g(r(Bt.value[n.contractor] || n.contractor), 1),
                        Qt(n.contractor) ? (d(), c("span", wn, " certificate expired")) : b("", !0)
                      ]),
                      t("td", gn, r(ot.value[n.contract] || "—"), 1),
                      t("td", Cn, r(it.value[F.value[n.contract] || n.project] || F.value[n.contract] || n.project || "—"), 1),
                      t("td", xn, r(u(x)(n.contract_value)), 1),
                      t("td", jn, [
                        g(r(u(x)(n.paid_till_now)), 1),
                        n.paid_till_now ? b("", !0) : (d(), c("span", Sn, " (New)"))
                      ]),
                      t("td", An, r(u(x)(n.balance)), 1),
                      t("td", Tn, [
                        t("input", {
                          type: "text",
                          inputmode: "decimal",
                          autocomplete: "off",
                          value: n.amount_to_pay,
                          onInput: (i) => It(i, n),
                          class: "inv-fi",
                          style: { width: "130px", "text-align": "right" },
                          disabled: !h.value.canEdit || !!n.paid_this_week || Ct(n),
                          "aria-label": "Amount to pay now, contract " + n.contract,
                          style2: ""
                        }, null, 40, En),
                        n.paid_this_week ? (d(), c("div", Ln, "Already on " + r(n.paid_this_week) + " this week", 1)) : b("", !0),
                        Ct(n) ? (d(), c("div", Pn, "Past week: already has payments")) : b("", !0),
                        u(_t)(n) ? (d(), c("div", Dn, r(u(_t)(n)), 1)) : b("", !0)
                      ])
                    ]))), 128)) : (d(), c("tr", kn, [
                      t("td", mn, [
                        t("div", fn, r(h.value.canEdit ? H.value ? "No unpaid Approved contracts for this project" : C.value.length ? "All Approved contracts are fully paid" : "There are no Approved contracts to bill" : "No contracts on this bill"), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              X.value.length ? (d(), c("div", Nn, "Total to pay now: KES " + r(u(x)(Q.value)), 1)) : b("", !0),
              h.value.canEdit ? (d(), c("div", Bn, [
                t("span", {
                  innerHTML: u(D)("info", 14)
                }, null, 8, Mn),
                e[44] || (e[44] = g("Fully paid contracts are not listed. Contracts of all projects are shown unless you pick a project. A contract can be paid once a week, and an amount can't be above its balance.", -1))
              ])) : b("", !0),
              l.status === u(nt) && l.rejection_reason ? (d(), c("div", On, "Sent back: " + r(l.rejection_reason), 1)) : b("", !0),
              l.status === u(kt) ? (d(), c("div", Hn, "Waiting for Director approval. The bill is locked.")) : b("", !0),
              l.status === u(V) ? (d(), c("div", Un, "Approved by " + r(u(B)(l.approved_by)) + " on " + r(u($)(l.approved_on)) + ". Payment is not recorded until the bill is marked Paid.", 1)) : b("", !0),
              l.status === u(Y) ? (d(), c("div", Fn, [
                g("Cancelled by " + r(u(B)(l.cancelled_by)) + " on " + r(u($)(l.cancelled_on)) + ": " + r(l.cancel_reason), 1),
                l.amended_from ? (d(), c("span", Kn, " (amended from " + r(l.amended_from) + ")", 1)) : b("", !0)
              ])) : b("", !0),
              l.amended_from && l.status !== u(Y) ? (d(), c("div", Rn, "Amended from " + r(l.amended_from) + ".", 1)) : b("", !0),
              l.status === u(G) ? (d(), c("div", $n, "Paid. Marked paid by " + r(u(B)(l.paid_by)) + " on " + r(u($)(l.paid_on)) + ". Approved by " + r(u(B)(l.approved_by)) + " on " + r(u($)(l.approved_on)) + ".", 1)) : b("", !0),
              dt.value.length && (h.value.canSend || h.value.canApprove) ? (d(), c("div", Wn, [
                t("div", In, [
                  t("span", {
                    innerHTML: u(D)("alert", 15)
                  }, null, 8, Vn),
                  e[45] || (e[45] = g("Please fix the following", -1))
                ]),
                t("ul", null, [
                  (d(!0), c(N, null, R(dt.value, (n) => (d(), c("li", { key: n }, r(n), 1))), 128))
                ])
              ])) : b("", !0),
              W.value ? (d(), c("div", zn, r(W.value), 1)) : b("", !0),
              l.name && U.owner ? (d(), c("div", Yn, [
                g(" Created by " + r(u(B)(U.owner)) + " on " + r(u($)(U.creation)) + " ", 1),
                l.approved_by ? (d(), c(N, { key: 0 }, [
                  g(" · Approved by " + r(u(B)(l.approved_by)) + " on " + r(u($)(l.approved_on)), 1)
                ], 64)) : b("", !0),
                U.modified_by ? (d(), c(N, { key: 1 }, [
                  g(" · Last modified by " + r(u(B)(U.modified_by)) + " on " + r(u($)(U.modified)), 1)
                ], 64)) : b("", !0)
              ])) : b("", !0)
            ]),
            t("div", Jn, [
              t("div", Gn, r(l.name ? "Editing: " + l.name : "New weekly bill — unsaved"), 1),
              t("div", qn, [
                Xt.value && o.$canDelete("admin") ? (d(), c("button", {
                  key: 0,
                  class: "add-btn-cancel wb-del",
                  disabled: j.value,
                  onClick: ue
                }, "Delete", 8, Xn)) : b("", !0),
                t("button", {
                  class: "add-btn-cancel",
                  onClick: e[10] || (e[10] = (n) => O.value = !1)
                }, r(h.value.canEdit ? "Cancel" : "Close window"), 1),
                h.value.canEdit ? (d(), c("button", {
                  key: 1,
                  class: "add-btn-draft",
                  disabled: j.value || !wt.value,
                  onClick: e[11] || (e[11] = (n) => Ot(!1))
                }, [
                  t("span", {
                    innerHTML: u(D)("save", 13)
                  }, null, 8, Zn),
                  g(" " + r(yt.value ? "Saving…" : "Save Draft"), 1)
                ], 8, Qn)) : b("", !0),
                h.value.canSend ? (d(), c("button", {
                  key: 2,
                  class: "add-btn-more",
                  disabled: j.value || !wt.value || dt.value.length > 0 || !!W.value,
                  onClick: ne
                }, [
                  t("span", {
                    innerHTML: u(D)("check", 13)
                  }, null, 8, eo),
                  e[46] || (e[46] = g(" Send for approval", -1))
                ], 8, to)) : b("", !0),
                h.value.canApprove ? (d(), c("button", {
                  key: 3,
                  class: "add-btn-more",
                  disabled: j.value || dt.value.length > 0,
                  onClick: oe
                }, "Approve as Director", 8, ao)) : b("", !0),
                h.value.canReopen ? (d(), c("button", {
                  key: 4,
                  class: "add-btn-draft",
                  disabled: j.value,
                  onClick: le
                }, "Edit", 8, no)) : b("", !0),
                h.value.canCancel ? (d(), c("button", {
                  key: 5,
                  class: "add-btn-cancel wb-cancel-bill",
                  disabled: j.value,
                  onClick: re
                }, "Cancel bill", 8, oo)) : b("", !0),
                l.name && u(Ie)(l.status) ? (d(), c("button", {
                  key: 6,
                  class: "add-btn-cancel",
                  disabled: !X.value.length,
                  onClick: pe
                }, [
                  t("span", {
                    innerHTML: u(D)("print", 13)
                  }, null, 8, lo),
                  e[47] || (e[47] = g(" Print", -1))
                ], 8, so)) : b("", !0),
                h.value.canMarkUnpaid ? (d(), c("button", {
                  key: 7,
                  class: "add-btn-cancel",
                  disabled: j.value,
                  onClick: ie
                }, "Mark unpaid", 8, io)) : b("", !0),
                h.value.canAmend ? (d(), c("button", {
                  key: 8,
                  class: "add-btn-more",
                  disabled: j.value || !wt.value,
                  onClick: de
                }, "Amend", 8, ro)) : b("", !0),
                h.value.canMarkPaid ? (d(), c("button", {
                  key: 9,
                  class: "add-btn-more",
                  disabled: j.value,
                  onClick: se
                }, "Paid", 8, co)) : b("", !0),
                h.value.canSendBack ? (d(), c("button", {
                  key: 10,
                  class: "add-btn-cancel",
                  disabled: j.value,
                  onClick: ce
                }, "Send back", 8, uo)) : b("", !0)
              ])
            ])
          ])
        ])) : b("", !0)
      ]))
    ]));
  }
}, fo = /* @__PURE__ */ ve(po, [["__scopeId", "data-v-4f4d99a0"]]);
export {
  fo as default
};
