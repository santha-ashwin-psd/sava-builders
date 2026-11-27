import { _ as pe, y as be, z as ke, o as _e, c as u, a as t, u as d, i as B, w as ut, B as Ht, F as D, r as $, v as Ut, d as g, t as r, X as me, b, D as fe, x as ye, n as vt, p as he, J as we, f as Z, l as pt, h as w, g as S, A as xt, a2 as ge, L as Ce, e as xe, K as Ft, a3 as je, $ as Se, Y as Kt, k as c, S as Ae } from "./main-Bwv_0HVp.js";
import { b as R } from "./format-BcJZDVG4.js";
import { o as N } from "./userNames-DjejYPA4.js";
import { t as z, i as Rt } from "./labourContractor-CwTlS8Kw.js";
import { f as C, s as Te } from "./labourContract-UoUa3DLZ.js";
const At = "Draft", _t = "Pending approval", V = "Approved", nt = "Sent back", G = "Paid", Y = "Cancelled", St = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], at = (a) => {
  const [o, v, p] = String(a).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(o, v - 1, p));
}, Wt = (a) => a.toISOString().slice(0, 10);
function Ee(a, o = z()) {
  return !!a && J(a) < J(o);
}
function Le(a, o, v, p = z()) {
  return !!v && Ee(o, p) && (Number(a.paid_till_now) || 0) > 5e-3;
}
function J(a) {
  const o = at(a);
  return o.setUTCDate(o.getUTCDate() - (o.getUTCDay() + 1) % 7), Wt(o);
}
function Pe(a) {
  const o = at(J(a));
  return o.setUTCDate(o.getUTCDate() + 6), Wt(o);
}
function mt(a) {
  if (!a) return "";
  const o = at(J(a)), v = at(Pe(a));
  return o.getUTCDate() + " " + St[o.getUTCMonth()] + " to " + v.getUTCDate() + " " + St[v.getUTCMonth()] + " " + v.getUTCFullYear();
}
function Tt(a, o) {
  return o === "draft" ? a.status === At || a.status === nt : o === "pending" ? a.status === _t : o === "approved" ? a.status === V : o === "paid" ? a.status === G : o === "cancelled" ? a.status === Y : !0;
}
function Be(a) {
  const o = { all: a.length, draft: 0, pending: 0, approved: 0, paid: 0, cancelled: 0 };
  for (const v of a) for (const p of ["draft", "pending", "approved", "paid", "cancelled"]) Tt(v, p) && o[p]++;
  return o;
}
function De(a, o, v = {}, p = {}) {
  const _ = String(o || "").trim().toLowerCase();
  if (!_) return !0;
  const k = p[a.name] || {}, m = (k.contracts || []).join(" "), f = (k.projects || []).map((y) => y + " " + (v[y] || "")).join(" ");
  return [a.name, a.status, a.project, v[a.project], mt(a.week_start), m, f].some((y) => String(y || "").toLowerCase().includes(_));
}
function Ne(a = []) {
  return a.length ? a.slice(0, 2).join(", ") + (a.length > 2 ? " +" + (a.length - 2) : "") : "—";
}
function Me(a, o = {}, v = {}) {
  const p = o && o.projects && o.projects.length ? o.projects : a && a.project ? [a.project] : [];
  if (!p.length) return "—";
  const _ = p.map((k) => v[k] || k);
  return _.slice(0, 2).join(", ") + (_.length > 2 ? " +" + (_.length - 2) : "");
}
function Oe(a) {
  return (Number(a.balance) || 0) <= 5e-3 && !(Number(a.amount_to_pay) > 0);
}
function He(a = []) {
  return a.filter((o) => !Oe(o));
}
function Ue(a = []) {
  return a.filter((o) => Number(o.amount_to_pay) > 0);
}
function Fe(a = [], o = []) {
  const v = new Map(o.map((_) => [_.contract, Number(_.amount_to_pay) || 0]));
  return { rows: a.map((_) => {
    const k = v.get(_.contract);
    return v.delete(_.contract), { ..._, amount_to_pay: k && !_.paid_this_week ? k : "" };
  }), dropped: [...v].filter(([, _]) => _ > 0).map(([_]) => _) };
}
function Ke(a) {
  return String(a ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
}
function $e(a) {
  return a.reduce((o, v) => o + (Number(v.amount_to_pay) || 0), 0);
}
function kt(a) {
  const o = Number(a.amount_to_pay) || 0;
  return o < 0 ? "Amount can't be negative" : o > (Number(a.balance) || 0) + 5e-3 ? "Above the balance of " + Math.round(Number(a.balance) || 0).toLocaleString("en-US") : "";
}
function Re(a, o = [], v = z()) {
  const p = [], _ = a.filter((k) => Number(k.amount_to_pay) > 0);
  _.length || p.push("Enter an amount to pay on at least one contract.");
  for (const k of _) {
    const m = o.find((y) => y.name === k.contractor), f = m && m.contractor_name || k.contractor;
    m && m.disabled && p.push("Contractor " + f + " is inactive."), m && Rt(m.tax_cert_expiry, v) && p.push("Certificate of " + f + " expired on " + String(m.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
  }
  for (const k of a) {
    const m = kt(k);
    m && p.push("Contract " + k.contract + ": " + m);
  }
  return p;
}
function We(a, o = []) {
  const v = {};
  return a.week_date ? o.length || (v.week_date = "There are no Approved contracts to bill") : v.week_date = "Pick a date in the week", v;
}
function jt(a, o, v = o) {
  const p = a === At || a === nt;
  return {
    canEdit: p,
    canSend: p,
    canApprove: a === _t && !!o,
    canSendBack: a === _t && !!o,
    canMarkPaid: a === V && !!v,
    canReopen: a === V && !!o,
    canCancel: a === V && !!o,
    canMarkUnpaid: a === G && !!o,
    canAmend: a === Y && !!o
  };
}
function Ie(a) {
  return a === V || a === G;
}
const T = (a) => String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), tt = (a) => Math.round(Number(a) || 0).toLocaleString("en-US");
function $t(a) {
  if (!a) return "";
  const o = at(a);
  return isNaN(o) ? "" : o.getUTCDate() + " " + St[o.getUTCMonth()] + " " + o.getUTCFullYear();
}
function Ve(a, o = []) {
  const v = o.reduce((f, y) => f + (Number(y.amount_to_pay) || 0), 0), p = o.map((f, y) => "<tr><td>" + (y + 1) + "</td><td>" + T(f.contract) + '</td><td class="l">' + T(f.contractor) + '</td><td class="l">' + T(f.activity) + '</td><td class="l">' + T(f.project) + '</td><td class="r">' + tt(f.contract_value) + '</td><td class="r">' + tt(f.paid_till_now) + '</td><td class="r">' + tt(f.balance) + '</td><td class="r"><b>' + tt(f.amount_to_pay) + "</b></td></tr>").join(""), _ = '<tr class="tt"><td colspan="8" class="r"><b>Total to pay now (KES)</b></td><td class="r"><b>' + tt(v) + "</b></td></tr>", k = a.approved_by || a.approved_on ? "Approved by " + T(a.approved_by) + (a.approved_on ? " on " + T($t(a.approved_on)) : "") + "." : "", m = a.status === G ? " Paid" + (a.paid_by ? " by " + T(a.paid_by) : "") + (a.paid_on ? " on " + T($t(a.paid_on)) : "") + "." : "";
  return '<!doctype html><html><head><meta charset="utf-8"><title>Weekly Bill ' + T(a.name) + "</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0}h1{font-size:15px;text-align:center;text-decoration:underline;margin:0 0 6px}p.sub{text-align:center;margin:0 0 10px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:4px 6px;text-align:center}td.l{text-align:left}td.r,th.r{text-align:right}tr.tt td{background:#f3f3f3}.note{margin:10px 0 0}.sig{display:flex;justify-content:space-between;margin-top:46px}.sig div{width:30%;border-top:1px solid #000;padding-top:4px;text-align:center}</style></head><body><h1>WEEKLY BILL " + T(a.name) + '</h1><p class="sub">Week (Saturday to Friday): ' + T(mt(a.week_date)) + " &nbsp;|&nbsp; Status: " + T(a.status) + '</p><table><tr><th>S.NO</th><th>Contract</th><th>Contractor</th><th>Activity</th><th>Project</th><th class="r">Contract Value</th><th class="r">Paid Till Now</th><th class="r">Balance Amount</th><th class="r">Amount To Pay Now</th></tr>' + p + _ + '</table><p class="note">' + k + m + '</p><div class="sig"><div>Prepared by</div><div>Approved by (Director)</div><div>Received by (Contractor)</div></div></body></html>';
}
function ze(a) {
  return a.status === Y || a.status === nt || a.status === At && !a.raised_by;
}
function Ye(a, o, v) {
  return {
    doctype: "Labour Weekly Bill",
    ...a.name ? { name: a.name } : {},
    company: v,
    week_start: a.week_date,
    lines: o.map((p) => ({ contract: p.contract, amount_to_pay: Number(p.amount_to_pay) || 0 }))
  };
}
function Je(a, o, v = {}) {
  return o ? a.project === o || ((v[a.name] || {}).projects || []).includes(o) : !0;
}
function Ge(a, o = z()) {
  const v = () => ({ n: 0, value: 0 }), p = { all: v(), draft: v(), pending: v(), approved: v(), paidBills: v(), weekN: 0, weekValue: 0, paid: 0 }, _ = J(o);
  for (const k of a || []) {
    if (k.status === Y) continue;
    const m = Number(k.total_amount) || 0;
    p.all.n++, p.all.value += m;
    for (const f of ["draft", "pending", "approved"]) Tt(k, f) && (p[f].n++, p[f].value += m);
    k.status === G && (p.paid += m, p.paidBills.n++, p.paidBills.value += m), k.week_start && J(k.week_start) === _ && k.status !== nt && (p.weekN++, p.weekValue += m);
  }
  return p;
}
const qe = { class: "list-page" }, Xe = { class: "sales-toolbar" }, Qe = { class: "sales-search" }, Ze = ["innerHTML"], ta = { class: "sales-pills" }, ea = ["onClick"], aa = ["value"], na = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, oa = ["innerHTML"], sa = ["disabled", "title"], la = ["innerHTML"], ia = { class: "bk-kpi-grid bk-kpi-grid-4 ct-kpi-5" }, ra = { class: "bk-kpi-inner" }, da = { class: "bk-kpi-body" }, ca = { class: "bk-kpi-value" }, ua = { class: "bk-kpi-trend ct-kpi-sub" }, va = { class: "bk-kpi-inner" }, pa = { class: "bk-kpi-body" }, ba = { class: "bk-kpi-value" }, ka = { class: "bk-kpi-trend ct-kpi-sub" }, _a = { class: "bk-kpi-inner" }, ma = { class: "bk-kpi-body" }, fa = { class: "bk-kpi-value bk-kpi-amber" }, ya = { class: "bk-kpi-trend ct-kpi-sub" }, ha = { class: "bk-kpi-inner" }, wa = { class: "bk-kpi-body" }, ga = { class: "bk-kpi-value bk-kpi-green" }, Ca = { class: "bk-kpi-trend ct-kpi-sub" }, xa = { class: "bk-kpi-inner" }, ja = { class: "bk-kpi-body" }, Sa = { class: "bk-kpi-value bk-kpi-green" }, Aa = { class: "bk-kpi-trend ct-kpi-sub" }, Ta = { class: "bk-stat-grid" }, Ea = { class: "bk-stat-card" }, La = { class: "bk-stat-content" }, Pa = { class: "bk-stat-value" }, Ba = { class: "bk-stat-card" }, Da = { class: "bk-stat-content" }, Na = {
  class: "bk-stat-value bk-kpi-blue",
  style: { "font-size": "16px" }
}, Ma = { class: "bk-stat-card" }, Oa = { class: "bk-stat-content" }, Ha = {
  class: "bk-stat-value bk-kpi-green",
  style: { "font-size": "16px" }
}, Ua = { class: "bk-stat-card" }, Fa = { class: "bk-stat-content" }, Ka = {
  class: "bk-stat-value bk-kpi-amber",
  style: { "font-size": "16px" }
}, $a = { class: "inv-table-wrap" }, Ra = { class: "inv-table" }, Wa = { key: 1 }, Ia = {
  colspan: "7",
  class: "vt-empty"
}, Va = { class: "vt-empty-title" }, za = { class: "vt-empty-sub" }, Ya = ["onClick"], Ja = { class: "vt-td vt-td-mono" }, Ga = { class: "vt-td" }, qa = ["title"], Xa = { class: "vt-td vt-td-secondary" }, Qa = { class: "vt-td vt-td-r" }, Za = { class: "vt-td vt-td-r" }, tn = { class: "vt-td" }, en = {
  key: 0,
  class: "vt-footer"
}, an = {
  class: "inv-drawer-panel open ct-drawer",
  style: { width: "1160px", "max-width": "98vw" }
}, nn = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#1e3a5f,#1a6ef7)", padding: "18px 24px" }
}, on = { class: "cust-drawer-header-left" }, sn = { class: "inv-dh-title" }, ln = { class: "cust-drawer-sub" }, rn = ["innerHTML"], dn = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, cn = {
  key: 0,
  class: "inv-field"
}, un = ["value"], vn = { class: "inv-field" }, pn = ["disabled"], bn = {
  key: 0,
  class: "ct-err"
}, kn = { class: "inv-field" }, _n = ["value"], mn = { style: { "overflow-x": "auto", "margin-top": "16px" } }, fn = { class: "inv-table" }, yn = { key: 0 }, hn = { key: 1 }, wn = {
  colspan: "8",
  class: "vt-empty"
}, gn = { class: "vt-empty-sub" }, Cn = { class: "vt-td vt-td-mono" }, xn = { class: "vt-td" }, jn = {
  key: 0,
  class: "ct-flag"
}, Sn = { class: "vt-td" }, An = { class: "vt-td" }, Tn = { class: "vt-td vt-td-r" }, En = { class: "vt-td vt-td-r" }, Ln = {
  key: 0,
  class: "ct-hint"
}, Pn = { class: "vt-td vt-td-r" }, Bn = { class: "vt-td vt-td-r" }, Dn = ["value", "onInput", "disabled", "aria-label"], Nn = {
  key: 0,
  class: "ct-hint"
}, Mn = {
  key: 1,
  class: "ct-hint"
}, On = {
  key: 2,
  class: "ct-err"
}, Hn = {
  key: 0,
  style: { "margin-top": "12px", "font-weight": "600", "text-align": "right" }
}, Un = {
  key: 1,
  class: "ct-info"
}, Fn = ["innerHTML"], Kn = {
  key: 2,
  class: "ct-note ct-note-bad"
}, $n = {
  key: 3,
  class: "ct-note"
}, Rn = {
  key: 4,
  class: "ct-note ct-note-ok"
}, Wn = {
  key: 5,
  class: "ct-note ct-note-bad"
}, In = { key: 0 }, Vn = {
  key: 6,
  class: "ct-note"
}, zn = {
  key: 7,
  class: "ct-note ct-note-ok"
}, Yn = {
  key: 8,
  class: "ct-errbox"
}, Jn = { class: "ct-errbox-title" }, Gn = ["innerHTML"], qn = {
  key: 9,
  class: "ct-note ct-note-bad"
}, Xn = {
  key: 10,
  class: "inv-view-footer at-audit"
}, Qn = { class: "inv-dfooter" }, Zn = { class: "add-footer-status" }, to = { class: "add-footer-actions" }, eo = ["disabled"], ao = ["disabled"], no = ["innerHTML"], oo = ["disabled"], so = ["innerHTML"], lo = ["disabled"], io = ["disabled"], ro = ["disabled"], co = ["disabled"], uo = ["innerHTML"], vo = ["disabled"], po = ["disabled"], bo = ["disabled"], ko = ["disabled"], bt = "Labour Weekly Bill", et = "psd_books.api.labour_weekly_bill.", _o = {
  __name: "WeeklyBill",
  setup(a) {
    const { toast: o } = be(), { confirm: v } = je(), { prompt: p } = Se(), { canEdit: _ } = Ae(), k = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "paid", l: "Paid" }, { k: "cancelled", l: "Cancelled" }], m = w([]), f = w([]), y = w({}), ot = w({}), F = w({}), st = w([]), Et = w(!1);
    function It(s, e) {
      const n = Ke(s.target.value);
      s.target.value = n, e.amount_to_pay = n;
    }
    const Lt = w(!1), lt = w(!0), q = w(""), E = w("all"), M = w(""), ft = w({}), Vt = { draft: "pill-draft", pending: "pill-unpaid", approved: "pill-paid", paid: "pill-paid", cancelled: "pill-draft" }, O = w(!1), yt = w(!1), j = w(!1), x = w([]), H = w(""), Pt = (s) => F.value[s.contract] || s.project || "", X = S(() => {
      const s = h.value.canEdit ? He(x.value) : Ue(x.value);
      return H.value && h.value.canEdit ? s.filter((e) => Pt(e) === H.value) : s;
    });
    function zt() {
      H.value && (x.value = x.value.map((s) => Pt(s) === H.value ? s : { ...s, amount_to_pay: "" }));
    }
    const ht = w(!1), W = w(""), P = xt({}), l = xt({}), U = xt({ owner: "", creation: "", modified_by: "", modified: "" });
    async function Bt(s) {
      if (Object.assign(U, { owner: "", creation: "", modified_by: "", modified: "" }), !!s)
        try {
          const e = await Kt(bt, s);
          Object.assign(U, { owner: e.owner, creation: e.creation, modified_by: e.modified_by, modified: e.modified });
        } catch {
        }
    }
    ke(() => [l.name, l.status], () => Bt(l.name));
    const wt = S(() => _("admin")), Yt = () => ({ name: "", status: "Draft", project: "", week_date: z(), raised_by: "", approved_by: "", approved_on: "", paid_by: "", paid_on: "", cancelled_by: "", cancelled_on: "", cancel_reason: "", amended_from: "", rejection_reason: "" });
    function Dt(s) {
      Object.keys(P).forEach((e) => delete P[e]), Object.keys(l).forEach((e) => delete l[e]), Object.assign(l, Yt(), s || {}), x.value = [], W.value = "", H.value = "";
    }
    const Jt = S(() => f.value.filter((s) => s.status !== "Closed")), it = S(() => Object.fromEntries(f.value.map((s) => [s.name, s.project_name || s.name]))), Nt = S(() => Object.fromEntries(st.value.map((s) => [s.name, s.contractor_name || s.name]))), rt = S(() => M.value ? m.value.filter((s) => Je(s, M.value, y.value)) : m.value), Gt = S(() => Be(rt.value)), A = S(() => Ge(rt.value, z())), qt = S(() => M.value ? Number(ft.value[M.value]) || 0 : Object.values(ft.value).reduce((s, e) => s + (Number(e) || 0), 0)), gt = S(() => rt.value.filter((s) => Tt(s, E.value) && De(s, q.value, it.value, y.value))), h = S(() => jt(l.status, Et.value, Lt.value)), Xt = S(() => !!l.name && ze(l)), Q = S(() => $e(x.value)), dt = S(() => Re(x.value, st.value)), Ct = (s) => Le(s, l.week_date, !l.name), Qt = (s) => {
      const e = st.value.find((n) => n.name === s);
      return !!e && Rt(e.tax_cert_expiry);
    };
    function Zt(s) {
      return P[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function I() {
      lt.value = !0;
      try {
        const [s, e, n, i, L] = await Promise.all([
          Z(bt, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "creation desc", limit: 1e3 }),
          Z("Project", { fields: ["name", "project_name", "status"], limit: 1e3 }),
          Z("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1e3 }),
          pt("psd_books.api.labour_contract.my_permissions", {}),
          pt(et + "balance_by_project", {}).catch(() => ({}))
          // card only: the page still opens if this fails
        ]);
        m.value = s || [], f.value = e || [], st.value = n || [], Et.value = !!(i && i.can_approve), Lt.value = !!(i && i.can_mark_paid), ft.value = L && typeof L == "object" && !Array.isArray(L) ? L.message || L : {}, te(), ee();
      } catch (s) {
        o("Failed to load weekly bills: " + (s.message || s), "error");
      } finally {
        lt.value = !1;
      }
    }
    async function te() {
      try {
        y.value = await pt(et + "list_columns", { names: m.value.map((s) => s.name) }) || {};
      } catch {
        y.value = {};
      }
    }
    async function ee() {
      try {
        const [s, e] = await Promise.all([
          Z("Labour Contract", { fields: ["name", "activity", "project"], limit: 1e3 }),
          Z("Labour Activity", { fields: ["name", "activity_name"], limit: 1e3 })
        ]), n = Object.fromEntries((e || []).map((i) => [i.name, i.activity_name || i.name]));
        ot.value = Object.fromEntries((s || []).map((i) => [i.name, n[i.activity] || i.activity || ""])), F.value = Object.fromEntries((s || []).map((i) => [i.name, i.project || ""]));
      } catch {
        ot.value = {}, F.value = {};
      }
    }
    async function ct(s) {
      if (W.value = "", !l.week_date) {
        x.value = [];
        return;
      }
      ht.value = !0;
      try {
        const e = await pt(et + "preview", { week_date: l.week_date, name: l.name || null }), n = Fe(e.rows || [], s || x.value);
        x.value = n.rows.map((i) => Ct(i) ? { ...i, amount_to_pay: "" } : i), n.dropped.length && (W.value = "Contract " + n.dropped.join(", ") + " is no longer Approved, or its project is Closed, so it can't be paid on this bill.");
      } catch (e) {
        x.value = [], o(e.message || "Could not load contracts", "error");
      } finally {
        ht.value = !1;
      }
    }
    function ae() {
      Dt(), O.value = !0, ct();
    }
    async function Mt(s) {
      Dt({ ...s, week_date: s.week_start }), O.value = !0;
      try {
        const e = await Kt(bt, s.name);
        Object.assign(l, { rejection_reason: e.rejection_reason, approved_by: e.approved_by, approved_on: e.approved_on, paid_by: e.paid_by, paid_on: e.paid_on, cancelled_by: e.cancelled_by, cancelled_on: e.cancelled_on, cancel_reason: e.cancel_reason, amended_from: e.amended_from, raised_by: e.raised_by }), jt(e.status, !1).canEdit ? await ct(e.lines || []) : x.value = (e.lines || []).map((n) => ({ ...n }));
      } catch (e) {
        o(e.message || "Could not open bill", "error");
      }
    }
    async function Ot(s) {
      const e = We(l, x.value);
      if (Object.keys(P).forEach((i) => delete P[i]), Object.assign(P, e), Object.keys(e).length)
        return o(Object.values(e)[0], "error"), "";
      const n = x.value.map((i) => kt(i)).find(Boolean);
      if (n)
        return o(n, "error"), "";
      yt.value = !0;
      try {
        const i = await Ce(Ye(l, x.value, await xe())), L = i && i.name || l.name;
        return s || o(l.name ? "Bill updated" : "Bill saved"), l.name = L, await I(), L;
      } catch (i) {
        return o(i.message || "Could not save bill", "error"), "";
      } finally {
        yt.value = !1;
      }
    }
    async function K(s, e, n) {
      j.value = !0;
      try {
        const i = await Ft(et + s, e);
        o(n), await I(), i && i.name && (Object.assign(l, { status: i.status, raised_by: i.raised_by, approved_by: i.approved_by, approved_on: i.approved_on, paid_by: i.paid_by, paid_on: i.paid_on, cancelled_by: i.cancelled_by, cancelled_on: i.cancelled_on, cancel_reason: i.cancel_reason, amended_from: i.amended_from, rejection_reason: i.rejection_reason }), Bt(i.name), jt(i.status, !1).canEdit ? await ct(i.lines || []) : x.value = (i.lines || []).map((L) => ({ ...L })));
      } catch (i) {
        o(i.message || "Action failed", "error");
      } finally {
        j.value = !1;
      }
    }
    async function ne() {
      if (!await v({ title: "Confirm to send for approval", body: "Send this bill to the Director for approval? Total to pay: KES " + C(Q.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const e = await Ot(!0);
      e && await K("send_for_approval", { name: e }, "Sent for Director approval");
    }
    async function oe() {
      await v({ title: "Confirm to approve", body: "Approve " + l.name + "? Total to pay: KES " + C(Q.value) + ".", okLabel: "Approve", okStyle: "primary" }) && await K("approve_bill", { name: l.name }, "Bill approved");
    }
    async function se() {
      await v({ title: "Confirm to mark as paid", body: "Mark bill " + l.name + " as paid? Total paid: KES " + C(Q.value) + ". The payment is recorded now and can't be undone.", okLabel: "Yes, mark as Paid", okStyle: "primary" }) && await K("mark_paid", { name: l.name }, "Payment recorded");
    }
    async function le() {
      await v({ title: "Confirm to edit", body: "Reopen " + l.name + " as a Draft so the amounts can be changed? Its approval is cleared and it must be sent to the Director for approval again.", okLabel: "Reopen for editing", okStyle: "primary" }) && await K("reopen_bill", { name: l.name }, "Bill reopened as Draft");
    }
    async function ie() {
      await v({ title: "Confirm to mark as unpaid", body: "Reverse the payment of " + l.name + " (KES " + C(Q.value) + ")? The bill goes back to Approved and the amount no longer counts as paid.", okLabel: "Yes, mark unpaid", okStyle: "primary" }) && await K("mark_unpaid", { name: l.name }, "Bill marked unpaid");
    }
    async function re() {
      const s = await p({ title: "Cancel bill", label: "Reason", okLabel: "Cancel bill" });
      !s || !s.trim() || await K("cancel_bill", { name: l.name, reason: s.trim() }, "Bill cancelled");
    }
    async function de() {
      if (await v({ title: "Confirm to amend", body: "Make a new Draft bill from " + l.name + " with the same week and amounts. You can change it and send it for approval.", okLabel: "Amend", okStyle: "primary" })) {
        j.value = !0;
        try {
          const e = await Ft(et + "amend_bill", { name: l.name });
          o("New draft " + e.name + " made"), await I();
          const n = m.value.find((i) => i.name === e.name);
          n ? await Mt(n) : O.value = !1;
        } catch (e) {
          o(e.message || "Could not amend bill", "error");
        } finally {
          j.value = !1;
        }
      }
    }
    async function ce() {
      const s = await p({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !s || !s.trim() || await K("send_back_bill", { name: l.name, reason: s.trim() }, "Sent back");
    }
    async function ue() {
      if (await v({ title: "Confirm to delete", body: "Delete " + l.name + "? Only a Draft never sent for approval, a Sent back bill, or a Cancelled bill, can be deleted." })) {
        j.value = !0;
        try {
          await ge(bt, l.name), o("Bill deleted"), O.value = !1, await I();
        } catch (e) {
          o(e.message || "Could not delete bill", "error");
        } finally {
          j.value = !1;
        }
      }
    }
    function ve() {
      const s = window.open("", "_blank");
      if (!s) {
        o("Allow pop-ups to print the bill", "error");
        return;
      }
      const e = X.value.map((i) => ({
        contract: i.contract,
        contractor: Nt.value[i.contractor] || i.contractor,
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
        approved_by: l.approved_by ? N(l.approved_by) : "",
        approved_on: l.approved_on,
        paid_by: l.paid_by ? N(l.paid_by) : "",
        paid_on: l.paid_on
      };
      s.document.write(Ve(n, e)), s.document.close(), s.focus(), s.print();
    }
    return _e(I), (s, e) => (c(), u("div", qe, [
      t("div", Xe, [
        t("div", Qe, [
          t("span", {
            innerHTML: d(B)("search", 13),
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
          (c(), u(D, null, $(k, (n) => t("button", {
            key: n.k,
            class: vt(["sales-pill", [{ active: E.value === n.k }, n.k !== "all" ? Vt[n.k] : ""]]),
            onClick: (i) => E.value = n.k
          }, [
            g(r(n.l) + " ", 1),
            t("span", {
              class: vt(["sales-pill-count", E.value === n.k ? "" : "zb-pc-muted"])
            }, r(Gt.value[n.k]), 3)
          ], 10, ea)), 64))
        ]),
        ut(t("select", {
          "onUpdate:modelValue": e[1] || (e[1] = (n) => M.value = n),
          class: "inv-fi ct-project-filter",
          title: "Filter by project"
        }, [
          e[14] || (e[14] = t("option", { value: "" }, "All projects", -1)),
          (c(!0), u(D, null, $(f.value, (n) => (c(), u("option", {
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
              innerHTML: d(B)("refresh", 13)
            }, null, 8, oa),
            e[15] || (e[15] = g(" Refresh", -1))
          ]),
          t("button", {
            class: "sales-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Not permitted",
            onClick: ae
          }, [
            t("span", {
              innerHTML: d(B)("plus", 13)
            }, null, 8, la),
            e[16] || (e[16] = g(" New Weekly Bill", -1))
          ], 8, sa)
        ])
      ]),
      t("div", ia, [
        t("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: e[2] || (e[2] = (n) => E.value = "all")
        }, [
          t("div", ra, [
            e[18] || (e[18] = t("div", {
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
              e[17] || (e[17] = t("div", { class: "bk-kpi-label" }, "Total Bills", -1)),
              t("div", ca, r(A.value.all.n), 1),
              t("div", ua, "KES " + r(d(C)(A.value.all.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[3] || (e[3] = (n) => E.value = "draft")
        }, [
          t("div", va, [
            e[20] || (e[20] = t("div", {
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
            t("div", pa, [
              e[19] || (e[19] = t("div", { class: "bk-kpi-label" }, "Draft", -1)),
              t("div", ba, r(A.value.draft.n), 1),
              t("div", ka, "KES " + r(d(C)(A.value.draft.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: e[4] || (e[4] = (n) => E.value = "pending")
        }, [
          t("div", _a, [
            e[22] || (e[22] = t("div", {
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
              e[21] || (e[21] = t("div", { class: "bk-kpi-label" }, "Pending Approval", -1)),
              t("div", fa, r(A.value.pending.n), 1),
              t("div", ya, "KES " + r(d(C)(A.value.pending.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[5] || (e[5] = (n) => E.value = "approved")
        }, [
          t("div", ha, [
            e[24] || (e[24] = t("div", {
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
              e[23] || (e[23] = t("div", { class: "bk-kpi-label" }, "Approved", -1)),
              t("div", ga, r(A.value.approved.n), 1),
              t("div", Ca, "KES " + r(d(C)(A.value.approved.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[6] || (e[6] = (n) => E.value = "paid")
        }, [
          t("div", xa, [
            e[26] || (e[26] = t("div", {
              class: "bk-kpi-icon",
              style: { background: "#dcfce7" }
            }, [
              t("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#16a34a",
                "stroke-width": "1.8"
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
            ], -1)),
            t("div", ja, [
              e[25] || (e[25] = t("div", { class: "bk-kpi-label" }, "Paid", -1)),
              t("div", Sa, r(A.value.paidBills.n), 1),
              t("div", Aa, "KES " + r(d(C)(A.value.paidBills.value)), 1)
            ])
          ])
        ])
      ]),
      t("div", Ta, [
        t("div", Ea, [
          t("div", La, [
            t("div", null, [
              e[27] || (e[27] = t("div", { class: "bk-stat-label" }, "Bills This Week", -1)),
              t("div", Pa, r(A.value.weekN), 1)
            ]),
            e[28] || (e[28] = me('<div class="bk-stat-icon" style="background:#dbeafe;color:#2563eb;" data-v-69f9c6a9><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-69f9c6a9><rect x="3" y="4" width="18" height="18" rx="2" data-v-69f9c6a9></rect><line x1="16" y1="2" x2="16" y2="6" data-v-69f9c6a9></line><line x1="8" y1="2" x2="8" y2="6" data-v-69f9c6a9></line><line x1="3" y1="10" x2="21" y2="10" data-v-69f9c6a9></line></svg></div>', 1))
          ])
        ]),
        t("div", Ba, [
          t("div", Da, [
            t("div", null, [
              e[29] || (e[29] = t("div", { class: "bk-stat-label" }, "Amount This Week", -1)),
              t("div", Na, "KES " + r(d(C)(A.value.weekValue)), 1)
            ]),
            e[30] || (e[30] = t("div", {
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
        t("div", Ma, [
          t("div", Oa, [
            t("div", null, [
              e[31] || (e[31] = t("div", { class: "bk-stat-label" }, "Total Paid", -1)),
              t("div", Ha, "KES " + r(d(C)(A.value.paid)), 1)
            ]),
            e[32] || (e[32] = t("div", {
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
        t("div", Ua, [
          t("div", Fa, [
            t("div", null, [
              e[33] || (e[33] = t("div", { class: "bk-stat-label" }, "Balance To Pay", -1)),
              t("div", Ka, "KES " + r(d(C)(qt.value)), 1)
            ]),
            e[34] || (e[34] = t("div", {
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
      t("div", $a, [
        t("table", Ra, [
          e[37] || (e[37] = t("thead", null, [
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
            lt.value ? (c(), u(D, { key: 0 }, $(6, (n) => t("tr", {
              key: n,
              class: "vt-row-shimmer"
            }, [...e[35] || (e[35] = [
              t("td", { colspan: "7" }, [
                t("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : gt.value.length ? (c(!0), u(D, { key: 2 }, $(gt.value, (n) => (c(), u("tr", {
              key: n.name,
              class: "inv-row",
              onClick: (i) => Mt(n)
            }, [
              t("td", Ja, r(n.name), 1),
              t("td", Ga, r(d(Me)(n, y.value[n.name], it.value)), 1),
              t("td", {
                class: "vt-td vt-td-mono",
                title: ((y.value[n.name] || {}).contracts || []).join(", ")
              }, r(d(Ne)((y.value[n.name] || {}).contracts)), 9, qa),
              t("td", Xa, r(d(mt)(n.week_start)), 1),
              t("td", Qa, r(d(C)(n.total_amount)), 1),
              t("td", Za, r(y.value[n.name] ? d(C)(y.value[n.name].balance_after) : "—"), 1),
              t("td", tn, [
                t("span", {
                  class: vt(["vt-badge", "vt-badge-" + d(Te)(n.status)])
                }, [
                  e[36] || (e[36] = t("span", { class: "vt-badge-dot" }, null, -1)),
                  g(r(n.status), 1)
                ], 2)
              ])
            ], 8, Ya))), 128)) : (c(), u("tr", Wa, [
              t("td", Ia, [
                t("div", Va, r(q.value || M.value || E.value !== "all" ? "No results found" : "No weekly bills yet"), 1),
                t("div", za, r(q.value || M.value || E.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly bill"), 1)
              ])
            ]))
          ])
        ]),
        !lt.value && m.value.length ? (c(), u("div", en, [
          e[38] || (e[38] = g("Showing ", -1)),
          t("strong", null, r(gt.value.length), 1),
          e[39] || (e[39] = g(" of ", -1)),
          t("strong", null, r(rt.value.length), 1),
          e[40] || (e[40] = g(" bills", -1))
        ])) : b("", !0)
      ]),
      e[51] || (e[51] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.", -1)),
      (c(), fe(we, { to: "body" }, [
        O.value ? (c(), u("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: e[13] || (e[13] = ye((n) => O.value = !1, ["self"]))
        }, [
          t("div", an, [
            t("div", nn, [
              t("div", on, [
                t("div", null, [
                  t("div", sn, r(l.name || "New Weekly Bill"), 1),
                  t("div", ln, r(l.name ? l.status : "Amounts to pay contractors for one week"), 1)
                ])
              ]),
              t("button", {
                class: "inv-dclose",
                style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                onClick: e[7] || (e[7] = (n) => O.value = !1),
                innerHTML: d(B)("x", 15)
              }, null, 8, rn)
            ]),
            t("div", dn, [
              t("div", {
                class: vt(["inv-fg", h.value.canEdit ? "inv-fg3" : "inv-fg2"])
              }, [
                h.value.canEdit ? (c(), u("div", cn, [
                  e[42] || (e[42] = t("label", { class: "inv-lbl" }, "Project", -1)),
                  ut(t("select", {
                    "onUpdate:modelValue": e[8] || (e[8] = (n) => H.value = n),
                    class: "inv-fi",
                    onChange: zt
                  }, [
                    e[41] || (e[41] = t("option", { value: "" }, "All projects", -1)),
                    (c(!0), u(D, null, $(Jt.value, (n) => (c(), u("option", {
                      key: n.name,
                      value: n.name
                    }, r(n.project_name || n.name), 9, un))), 128))
                  ], 544), [
                    [Ut, H.value]
                  ])
                ])) : b("", !0),
                t("div", vn, [
                  e[43] || (e[43] = t("label", { class: "inv-lbl" }, [
                    g("Pick any date in the week "),
                    t("span", { class: "nim-req" }, "*")
                  ], -1)),
                  ut(t("input", {
                    type: "date",
                    "onUpdate:modelValue": e[9] || (e[9] = (n) => l.week_date = n),
                    class: "inv-fi",
                    style: he(Zt("week_date")),
                    disabled: !h.value.canEdit || !!l.name,
                    onChange: e[10] || (e[10] = (n) => {
                      delete P.week_date, ct();
                    })
                  }, null, 44, pn), [
                    [Ht, l.week_date]
                  ]),
                  P.week_date ? (c(), u("div", bn, r(P.week_date), 1)) : b("", !0)
                ]),
                t("div", kn, [
                  e[44] || (e[44] = t("label", { class: "inv-lbl" }, "Week (Saturday to Friday)", -1)),
                  t("input", {
                    class: "inv-fi",
                    value: d(mt)(l.week_date),
                    disabled: ""
                  }, null, 8, _n)
                ])
              ], 2),
              t("div", mn, [
                t("table", fn, [
                  e[46] || (e[46] = t("thead", null, [
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
                    ht.value ? (c(), u("tr", yn, [...e[45] || (e[45] = [
                      t("td", {
                        colspan: "8",
                        class: "vt-empty"
                      }, [
                        t("div", { class: "vt-empty-sub" }, "Loading contracts…")
                      ], -1)
                    ])])) : X.value.length ? (c(!0), u(D, { key: 2 }, $(X.value, (n) => (c(), u("tr", {
                      key: n.contract
                    }, [
                      t("td", Cn, r(n.contract), 1),
                      t("td", xn, [
                        g(r(Nt.value[n.contractor] || n.contractor), 1),
                        Qt(n.contractor) ? (c(), u("span", jn, " certificate expired")) : b("", !0)
                      ]),
                      t("td", Sn, r(ot.value[n.contract] || "—"), 1),
                      t("td", An, r(it.value[F.value[n.contract] || n.project] || F.value[n.contract] || n.project || "—"), 1),
                      t("td", Tn, r(d(C)(n.contract_value)), 1),
                      t("td", En, [
                        g(r(d(C)(n.paid_till_now)), 1),
                        n.paid_till_now ? b("", !0) : (c(), u("span", Ln, " (New)"))
                      ]),
                      t("td", Pn, r(d(C)(n.balance)), 1),
                      t("td", Bn, [
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
                        }, null, 40, Dn),
                        n.paid_this_week ? (c(), u("div", Nn, "Already on " + r(n.paid_this_week) + " this week", 1)) : b("", !0),
                        Ct(n) ? (c(), u("div", Mn, "Past week: already has payments")) : b("", !0),
                        d(kt)(n) ? (c(), u("div", On, r(d(kt)(n)), 1)) : b("", !0)
                      ])
                    ]))), 128)) : (c(), u("tr", hn, [
                      t("td", wn, [
                        t("div", gn, r(h.value.canEdit ? H.value ? "No unpaid Approved contracts for this project" : x.value.length ? "All Approved contracts are fully paid" : "There are no Approved contracts to bill" : "No contracts on this bill"), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              X.value.length ? (c(), u("div", Hn, "Total to pay now: KES " + r(d(C)(Q.value)), 1)) : b("", !0),
              h.value.canEdit ? (c(), u("div", Un, [
                t("span", {
                  innerHTML: d(B)("info", 14)
                }, null, 8, Fn),
                e[47] || (e[47] = g("Fully paid contracts are not listed. Contracts of all projects are shown unless you pick a project. A contract can be paid once a week, and an amount can't be above its balance.", -1))
              ])) : b("", !0),
              l.status === d(nt) && l.rejection_reason ? (c(), u("div", Kn, "Sent back: " + r(l.rejection_reason), 1)) : b("", !0),
              l.status === d(_t) ? (c(), u("div", $n, "Waiting for Director approval. The bill is locked.")) : b("", !0),
              l.status === d(V) ? (c(), u("div", Rn, "Approved by " + r(d(N)(l.approved_by)) + " on " + r(d(R)(l.approved_on)) + ". Payment is not recorded until the bill is marked Paid.", 1)) : b("", !0),
              l.status === d(Y) ? (c(), u("div", Wn, [
                g("Cancelled by " + r(d(N)(l.cancelled_by)) + " on " + r(d(R)(l.cancelled_on)) + ": " + r(l.cancel_reason), 1),
                l.amended_from ? (c(), u("span", In, " (amended from " + r(l.amended_from) + ")", 1)) : b("", !0)
              ])) : b("", !0),
              l.amended_from && l.status !== d(Y) ? (c(), u("div", Vn, "Amended from " + r(l.amended_from) + ".", 1)) : b("", !0),
              l.status === d(G) ? (c(), u("div", zn, "Paid. Marked paid by " + r(d(N)(l.paid_by)) + " on " + r(d(R)(l.paid_on)) + ". Approved by " + r(d(N)(l.approved_by)) + " on " + r(d(R)(l.approved_on)) + ".", 1)) : b("", !0),
              dt.value.length && (h.value.canSend || h.value.canApprove) ? (c(), u("div", Yn, [
                t("div", Jn, [
                  t("span", {
                    innerHTML: d(B)("alert", 15)
                  }, null, 8, Gn),
                  e[48] || (e[48] = g("Please fix the following", -1))
                ]),
                t("ul", null, [
                  (c(!0), u(D, null, $(dt.value, (n) => (c(), u("li", { key: n }, r(n), 1))), 128))
                ])
              ])) : b("", !0),
              W.value ? (c(), u("div", qn, r(W.value), 1)) : b("", !0),
              l.name && U.owner ? (c(), u("div", Xn, [
                g(" Created by " + r(d(N)(U.owner)) + " on " + r(d(R)(U.creation)) + " ", 1),
                l.approved_by ? (c(), u(D, { key: 0 }, [
                  g(" · Approved by " + r(d(N)(l.approved_by)) + " on " + r(d(R)(l.approved_on)), 1)
                ], 64)) : b("", !0),
                U.modified_by ? (c(), u(D, { key: 1 }, [
                  g(" · Last modified by " + r(d(N)(U.modified_by)) + " on " + r(d(R)(U.modified)), 1)
                ], 64)) : b("", !0)
              ])) : b("", !0)
            ]),
            t("div", Qn, [
              t("div", Zn, r(l.name ? "Editing: " + l.name : "New weekly bill — unsaved"), 1),
              t("div", to, [
                Xt.value && s.$canDelete("admin") ? (c(), u("button", {
                  key: 0,
                  class: "add-btn-cancel wb-del",
                  disabled: j.value,
                  onClick: ue
                }, "Delete", 8, eo)) : b("", !0),
                t("button", {
                  class: "add-btn-cancel",
                  onClick: e[11] || (e[11] = (n) => O.value = !1)
                }, r(h.value.canEdit ? "Cancel" : "Close window"), 1),
                h.value.canEdit ? (c(), u("button", {
                  key: 1,
                  class: "add-btn-draft",
                  disabled: j.value || !wt.value,
                  onClick: e[12] || (e[12] = (n) => Ot(!1))
                }, [
                  t("span", {
                    innerHTML: d(B)("save", 13)
                  }, null, 8, no),
                  g(" " + r(yt.value ? "Saving…" : "Save Draft"), 1)
                ], 8, ao)) : b("", !0),
                h.value.canSend ? (c(), u("button", {
                  key: 2,
                  class: "add-btn-more",
                  disabled: j.value || !wt.value || dt.value.length > 0 || !!W.value,
                  onClick: ne
                }, [
                  t("span", {
                    innerHTML: d(B)("check", 13)
                  }, null, 8, so),
                  e[49] || (e[49] = g(" Send for approval", -1))
                ], 8, oo)) : b("", !0),
                h.value.canApprove ? (c(), u("button", {
                  key: 3,
                  class: "add-btn-more",
                  disabled: j.value || dt.value.length > 0,
                  onClick: oe
                }, "Approve as Director", 8, lo)) : b("", !0),
                h.value.canReopen ? (c(), u("button", {
                  key: 4,
                  class: "add-btn-draft",
                  disabled: j.value,
                  onClick: le
                }, "Edit", 8, io)) : b("", !0),
                h.value.canCancel ? (c(), u("button", {
                  key: 5,
                  class: "add-btn-cancel wb-cancel-bill",
                  disabled: j.value,
                  onClick: re
                }, "Cancel bill", 8, ro)) : b("", !0),
                l.name && d(Ie)(l.status) ? (c(), u("button", {
                  key: 6,
                  class: "add-btn-cancel",
                  disabled: !X.value.length,
                  onClick: ve
                }, [
                  t("span", {
                    innerHTML: d(B)("print", 13)
                  }, null, 8, uo),
                  e[50] || (e[50] = g(" Print", -1))
                ], 8, co)) : b("", !0),
                h.value.canMarkUnpaid ? (c(), u("button", {
                  key: 7,
                  class: "add-btn-cancel",
                  disabled: j.value,
                  onClick: ie
                }, "Mark unpaid", 8, vo)) : b("", !0),
                h.value.canAmend ? (c(), u("button", {
                  key: 8,
                  class: "add-btn-more",
                  disabled: j.value || !wt.value,
                  onClick: de
                }, "Amend", 8, po)) : b("", !0),
                h.value.canMarkPaid ? (c(), u("button", {
                  key: 9,
                  class: "add-btn-more",
                  disabled: j.value,
                  onClick: se
                }, "Paid", 8, bo)) : b("", !0),
                h.value.canSendBack ? (c(), u("button", {
                  key: 10,
                  class: "add-btn-cancel",
                  disabled: j.value,
                  onClick: ce
                }, "Send back", 8, ko)) : b("", !0)
              ])
            ])
          ])
        ])) : b("", !0)
      ]))
    ]));
  }
}, go = /* @__PURE__ */ pe(_o, [["__scopeId", "data-v-69f9c6a9"]]);
export {
  go as default
};
