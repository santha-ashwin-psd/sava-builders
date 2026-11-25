import { _ as ce, y as ue, o as ve, c as u, a as t, u as v, i as D, w as rt, B as Bt, F as U, r as F, v as Mt, d as j, t as r, X as pe, b, D as be, x as _e, n as dt, p as ke, J as me, f as X, l as ct, h as w, g as S, A as Ot, a2 as fe, L as ye, e as he, K as Ht, a3 as we, $ as ge, Y as Ce, k as c, S as xe } from "./main-C6Zyq0K6.js";
import { b as ut } from "./format-BcJZDVG4.js";
import { o as $ } from "./userNames-atjiIIY8.js";
import { t as I, i as Ft } from "./labourContractor-CwTlS8Kw.js";
import { f as C, s as je } from "./labourContract-UoUa3DLZ.js";
const jt = "Draft", pt = "Pending approval", W = "Approved", _t = "Sent back", Y = "Paid", V = "Cancelled", xt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], tt = (a) => {
  const [o, d, p] = String(a).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(o, d - 1, p));
}, Kt = (a) => a.toISOString().slice(0, 10);
function Se(a, o = I()) {
  return !!a && z(a) < z(o);
}
function Te(a, o, d, p = I()) {
  return !!d && Se(o, p) && (Number(a.paid_till_now) || 0) > 5e-3;
}
function z(a) {
  const o = tt(a);
  return o.setUTCDate(o.getUTCDate() - (o.getUTCDay() + 1) % 7), Kt(o);
}
function Ae(a) {
  const o = tt(z(a));
  return o.setUTCDate(o.getUTCDate() + 6), Kt(o);
}
function bt(a) {
  if (!a) return "";
  const o = tt(z(a)), d = tt(Ae(a));
  return o.getUTCDate() + " " + xt[o.getUTCMonth()] + " to " + d.getUTCDate() + " " + xt[d.getUTCMonth()] + " " + d.getUTCFullYear();
}
function St(a, o) {
  return o === "draft" ? a.status === jt || a.status === _t : o === "pending" ? a.status === pt : o === "approved" ? a.status === W : o === "paid" ? a.status === Y : o === "cancelled" ? a.status === V : !0;
}
function Ee(a) {
  const o = { all: a.length, draft: 0, pending: 0, approved: 0, paid: 0, cancelled: 0 };
  for (const d of a) for (const p of ["draft", "pending", "approved", "paid", "cancelled"]) St(d, p) && o[p]++;
  return o;
}
function Le(a, o, d = {}, p = {}) {
  const k = String(o || "").trim().toLowerCase();
  if (!k) return !0;
  const _ = p[a.name] || {}, m = (_.contracts || []).join(" "), f = (_.projects || []).map((y) => y + " " + (d[y] || "")).join(" ");
  return [a.name, a.status, a.project, d[a.project], bt(a.week_start), m, f].some((y) => String(y || "").toLowerCase().includes(k));
}
function Pe(a = []) {
  return a.length ? a.slice(0, 2).join(", ") + (a.length > 2 ? " +" + (a.length - 2) : "") : "—";
}
function De(a, o = {}, d = {}) {
  const p = o && o.projects && o.projects.length ? o.projects : a && a.project ? [a.project] : [];
  if (!p.length) return "—";
  const k = p.map((_) => d[_] || _);
  return k.slice(0, 2).join(", ") + (k.length > 2 ? " +" + (k.length - 2) : "");
}
function Ne(a) {
  return (Number(a.balance) || 0) <= 5e-3 && !(Number(a.amount_to_pay) > 0);
}
function Be(a = []) {
  return a.filter((o) => !Ne(o));
}
function Me(a = []) {
  return a.filter((o) => Number(o.amount_to_pay) > 0);
}
function Oe(a = [], o = []) {
  const d = new Map(o.map((k) => [k.contract, Number(k.amount_to_pay) || 0]));
  return { rows: a.map((k) => {
    const _ = d.get(k.contract);
    return d.delete(k.contract), { ...k, amount_to_pay: _ && !k.paid_this_week ? _ : "" };
  }), dropped: [...d].filter(([, k]) => k > 0).map(([k]) => k) };
}
function He(a) {
  return String(a ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
}
function Ue(a) {
  return a.reduce((o, d) => o + (Number(d.amount_to_pay) || 0), 0);
}
function vt(a) {
  const o = Number(a.amount_to_pay) || 0;
  return o < 0 ? "Amount can't be negative" : o > (Number(a.balance) || 0) + 5e-3 ? "Above the balance of " + Math.round(Number(a.balance) || 0).toLocaleString("en-US") : "";
}
function Fe(a, o = [], d = I()) {
  const p = [], k = a.filter((_) => Number(_.amount_to_pay) > 0);
  k.length || p.push("Enter an amount to pay on at least one contract.");
  for (const _ of k) {
    const m = o.find((y) => y.name === _.contractor), f = m && m.contractor_name || _.contractor;
    m && m.disabled && p.push("Contractor " + f + " is inactive."), m && Ft(m.tax_cert_expiry, d) && p.push("Certificate of " + f + " expired on " + String(m.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
  }
  for (const _ of a) {
    const m = vt(_);
    m && p.push("Contract " + _.contract + ": " + m);
  }
  return p;
}
function Ke(a, o = []) {
  const d = {};
  return a.week_date ? o.length || (d.week_date = "There are no Approved contracts to bill") : d.week_date = "Pick a date in the week", d;
}
function gt(a, o, d = o) {
  const p = a === jt || a === _t;
  return {
    canEdit: p,
    canSend: p,
    canApprove: a === pt && !!o,
    canSendBack: a === pt && !!o,
    canMarkPaid: a === W && !!d,
    canReopen: a === W && !!o,
    canCancel: a === W && !!o,
    canMarkUnpaid: a === Y && !!o,
    canAmend: a === V
  };
}
function Re(a) {
  return a === W || a === Y;
}
const T = (a) => String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Q = (a) => Math.round(Number(a) || 0).toLocaleString("en-US");
function Ut(a) {
  if (!a) return "";
  const o = tt(a);
  return isNaN(o) ? "" : o.getUTCDate() + " " + xt[o.getUTCMonth()] + " " + o.getUTCFullYear();
}
function $e(a, o = []) {
  const d = o.reduce((f, y) => f + (Number(y.amount_to_pay) || 0), 0), p = o.map((f, y) => "<tr><td>" + (y + 1) + "</td><td>" + T(f.contract) + '</td><td class="l">' + T(f.contractor) + '</td><td class="l">' + T(f.activity) + '</td><td class="l">' + T(f.project) + '</td><td class="r">' + Q(f.contract_value) + '</td><td class="r">' + Q(f.paid_till_now) + '</td><td class="r">' + Q(f.balance) + '</td><td class="r"><b>' + Q(f.amount_to_pay) + "</b></td></tr>").join(""), k = '<tr class="tt"><td colspan="8" class="r"><b>Total to pay now (KES)</b></td><td class="r"><b>' + Q(d) + "</b></td></tr>", _ = a.approved_by || a.approved_on ? "Approved by " + T(a.approved_by) + (a.approved_on ? " on " + T(Ut(a.approved_on)) : "") + "." : "", m = a.status === Y ? " Paid" + (a.paid_by ? " by " + T(a.paid_by) : "") + (a.paid_on ? " on " + T(Ut(a.paid_on)) : "") + "." : "";
  return '<!doctype html><html><head><meta charset="utf-8"><title>Weekly Bill ' + T(a.name) + "</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0}h1{font-size:15px;text-align:center;text-decoration:underline;margin:0 0 6px}p.sub{text-align:center;margin:0 0 10px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:4px 6px;text-align:center}td.l{text-align:left}td.r,th.r{text-align:right}tr.tt td{background:#f3f3f3}.note{margin:10px 0 0}.sig{display:flex;justify-content:space-between;margin-top:46px}.sig div{width:30%;border-top:1px solid #000;padding-top:4px;text-align:center}</style></head><body><h1>WEEKLY BILL " + T(a.name) + '</h1><p class="sub">Week (Saturday to Friday): ' + T(bt(a.week_date)) + " &nbsp;|&nbsp; Status: " + T(a.status) + '</p><table><tr><th>S.NO</th><th>Contract</th><th>Contractor</th><th>Activity</th><th>Project</th><th class="r">Contract Value</th><th class="r">Paid Till Now</th><th class="r">Balance Amount</th><th class="r">Amount To Pay Now</th></tr>' + p + k + '</table><p class="note">' + _ + m + '</p><div class="sig"><div>Prepared by</div><div>Approved by (Director)</div><div>Received by (Contractor)</div></div></body></html>';
}
function We(a) {
  return a.status === V || a.status === jt && !a.raised_by;
}
function Ie(a, o, d) {
  return {
    doctype: "Labour Weekly Bill",
    ...a.name ? { name: a.name } : {},
    company: d,
    week_start: a.week_date,
    lines: o.map((p) => ({ contract: p.contract, amount_to_pay: Number(p.amount_to_pay) || 0 }))
  };
}
function Ve(a, o, d = {}) {
  return o ? a.project === o || ((d[a.name] || {}).projects || []).includes(o) : !0;
}
function ze(a, o = I()) {
  const d = () => ({ n: 0, value: 0 }), p = { all: d(), draft: d(), pending: d(), approved: d(), paidBills: d(), weekN: 0, weekValue: 0, paid: 0 }, k = z(o);
  for (const _ of a || []) {
    if (_.status === V) continue;
    const m = Number(_.total_amount) || 0;
    p.all.n++, p.all.value += m;
    for (const f of ["draft", "pending", "approved"]) St(_, f) && (p[f].n++, p[f].value += m);
    _.status === Y && (p.paid += m, p.paidBills.n++, p.paidBills.value += m), _.week_start && z(_.week_start) === k && _.status !== _t && (p.weekN++, p.weekValue += m);
  }
  return p;
}
const Ye = { class: "list-page" }, Je = { class: "sales-toolbar" }, Ge = { class: "sales-search" }, qe = ["innerHTML"], Xe = { class: "sales-pills" }, Qe = ["onClick"], Ze = ["value"], ta = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, ea = ["innerHTML"], aa = ["disabled", "title"], na = ["innerHTML"], oa = { class: "bk-kpi-grid bk-kpi-grid-4" }, sa = { class: "bk-kpi-inner" }, la = { class: "bk-kpi-body" }, ia = { class: "bk-kpi-value" }, ra = { class: "bk-kpi-trend ct-kpi-sub" }, da = { class: "bk-kpi-inner" }, ca = { class: "bk-kpi-body" }, ua = { class: "bk-kpi-value" }, va = { class: "bk-kpi-trend ct-kpi-sub" }, pa = { class: "bk-kpi-inner" }, ba = { class: "bk-kpi-body" }, _a = { class: "bk-kpi-value bk-kpi-amber" }, ka = { class: "bk-kpi-trend ct-kpi-sub" }, ma = { class: "bk-kpi-inner" }, fa = { class: "bk-kpi-body" }, ya = { class: "bk-kpi-value bk-kpi-green" }, ha = { class: "bk-kpi-trend ct-kpi-sub" }, wa = { class: "bk-stat-grid" }, ga = { class: "bk-stat-card" }, Ca = { class: "bk-stat-content" }, xa = { class: "bk-stat-value" }, ja = { class: "bk-stat-card" }, Sa = { class: "bk-stat-content" }, Ta = {
  class: "bk-stat-value bk-kpi-blue",
  style: { "font-size": "16px" }
}, Aa = { class: "bk-stat-card" }, Ea = { class: "bk-stat-content" }, La = {
  class: "bk-stat-value bk-kpi-green",
  style: { "font-size": "16px" }
}, Pa = { class: "bk-stat-card" }, Da = { class: "bk-stat-content" }, Na = {
  class: "bk-stat-value bk-kpi-amber",
  style: { "font-size": "16px" }
}, Ba = { class: "inv-table-wrap" }, Ma = { class: "inv-table" }, Oa = { key: 1 }, Ha = {
  colspan: "7",
  class: "vt-empty"
}, Ua = { class: "vt-empty-title" }, Fa = { class: "vt-empty-sub" }, Ka = ["onClick"], Ra = { class: "vt-td vt-td-mono" }, $a = { class: "vt-td" }, Wa = ["title"], Ia = { class: "vt-td vt-td-secondary" }, Va = { class: "vt-td vt-td-r" }, za = { class: "vt-td vt-td-r" }, Ya = { class: "vt-td" }, Ja = {
  key: 0,
  class: "vt-footer"
}, Ga = {
  class: "inv-drawer-panel open ct-drawer",
  style: { width: "1160px", "max-width": "98vw" }
}, qa = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#1e3a5f,#1a6ef7)", padding: "18px 24px" }
}, Xa = { class: "cust-drawer-header-left" }, Qa = { class: "inv-dh-title" }, Za = { class: "cust-drawer-sub" }, tn = ["innerHTML"], en = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, an = {
  key: 0,
  class: "inv-field"
}, nn = ["value"], on = { class: "inv-field" }, sn = ["disabled"], ln = {
  key: 0,
  class: "ct-err"
}, rn = { class: "inv-field" }, dn = ["value"], cn = { style: { "overflow-x": "auto", "margin-top": "16px" } }, un = { class: "inv-table" }, vn = { key: 0 }, pn = { key: 1 }, bn = {
  colspan: "8",
  class: "vt-empty"
}, _n = { class: "vt-empty-sub" }, kn = { class: "vt-td vt-td-mono" }, mn = { class: "vt-td" }, fn = {
  key: 0,
  class: "ct-flag"
}, yn = { class: "vt-td" }, hn = { class: "vt-td" }, wn = { class: "vt-td vt-td-r" }, gn = { class: "vt-td vt-td-r" }, Cn = {
  key: 0,
  class: "ct-hint"
}, xn = { class: "vt-td vt-td-r" }, jn = { class: "vt-td vt-td-r" }, Sn = ["value", "onInput", "disabled", "aria-label"], Tn = {
  key: 0,
  class: "ct-hint"
}, An = {
  key: 1,
  class: "ct-hint"
}, En = {
  key: 2,
  class: "ct-err"
}, Ln = {
  key: 0,
  style: { "margin-top": "12px", "font-weight": "600", "text-align": "right" }
}, Pn = {
  key: 1,
  class: "ct-info"
}, Dn = ["innerHTML"], Nn = {
  key: 2,
  class: "ct-note ct-note-bad"
}, Bn = {
  key: 3,
  class: "ct-note"
}, Mn = {
  key: 4,
  class: "ct-note ct-note-ok"
}, On = {
  key: 5,
  class: "ct-note ct-note-bad"
}, Hn = { key: 0 }, Un = {
  key: 6,
  class: "ct-note"
}, Fn = {
  key: 7,
  class: "ct-note ct-note-ok"
}, Kn = {
  key: 8,
  class: "ct-errbox"
}, Rn = { class: "ct-errbox-title" }, $n = ["innerHTML"], Wn = {
  key: 9,
  class: "ct-note ct-note-bad"
}, In = { class: "inv-dfooter" }, Vn = { class: "add-footer-status" }, zn = { class: "add-footer-actions" }, Yn = ["disabled"], Jn = ["disabled"], Gn = ["innerHTML"], qn = ["disabled"], Xn = ["innerHTML"], Qn = ["disabled"], Zn = ["disabled"], to = ["disabled"], eo = ["disabled"], ao = ["innerHTML"], no = ["disabled"], oo = ["disabled"], so = ["disabled"], lo = ["disabled"], Ct = "Labour Weekly Bill", Z = "psd_books.api.labour_weekly_bill.", io = {
  __name: "WeeklyBill",
  setup(a) {
    const { toast: o } = ue(), { confirm: d } = we(), { prompt: p } = ge(), { canEdit: k } = xe(), _ = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "paid", l: "Paid" }, { k: "cancelled", l: "Cancelled" }], m = w([]), f = w([]), y = w({}), et = w({}), O = w({}), at = w([]), Tt = w(!1);
    function Rt(s, e) {
      const n = He(s.target.value);
      s.target.value = n, e.amount_to_pay = n;
    }
    const At = w(!1), nt = w(!0), J = w(""), E = w("all"), N = w(""), kt = w({}), $t = { draft: "pill-draft", pending: "pill-unpaid", approved: "pill-paid", paid: "pill-paid", cancelled: "pill-draft" }, B = w(!1), mt = w(!1), x = w(!1), g = w([]), M = w(""), Et = (s) => O.value[s.contract] || s.project || "", G = S(() => {
      const s = h.value.canEdit ? Be(g.value) : Me(g.value);
      return M.value && h.value.canEdit ? s.filter((e) => Et(e) === M.value) : s;
    });
    function Wt() {
      M.value && (g.value = g.value.map((s) => Et(s) === M.value ? s : { ...s, amount_to_pay: "" }));
    }
    const ft = w(!1), K = w(""), P = Ot({}), l = Ot({}), yt = S(() => k("admin")), It = () => ({ name: "", status: "Draft", project: "", week_date: I(), raised_by: "", approved_by: "", approved_on: "", paid_by: "", paid_on: "", cancelled_by: "", cancelled_on: "", cancel_reason: "", amended_from: "", rejection_reason: "" });
    function Lt(s) {
      Object.keys(P).forEach((e) => delete P[e]), Object.keys(l).forEach((e) => delete l[e]), Object.assign(l, It(), s || {}), g.value = [], K.value = "", M.value = "";
    }
    const Vt = S(() => f.value.filter((s) => s.status !== "Closed")), ot = S(() => Object.fromEntries(f.value.map((s) => [s.name, s.project_name || s.name]))), Pt = S(() => Object.fromEntries(at.value.map((s) => [s.name, s.contractor_name || s.name]))), st = S(() => N.value ? m.value.filter((s) => Ve(s, N.value, y.value)) : m.value), zt = S(() => Ee(st.value)), A = S(() => ze(st.value, I())), Yt = S(() => N.value ? Number(kt.value[N.value]) || 0 : Object.values(kt.value).reduce((s, e) => s + (Number(e) || 0), 0)), ht = S(() => st.value.filter((s) => St(s, E.value) && Le(s, J.value, ot.value, y.value))), h = S(() => gt(l.status, Tt.value, At.value)), Jt = S(() => !!l.name && We(l)), q = S(() => Ue(g.value)), lt = S(() => Fe(g.value, at.value)), wt = (s) => Te(s, l.week_date, !l.name), Gt = (s) => {
      const e = at.value.find((n) => n.name === s);
      return !!e && Ft(e.tax_cert_expiry);
    };
    function qt(s) {
      return P[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function R() {
      nt.value = !0;
      try {
        const [s, e, n, i, L] = await Promise.all([
          X(Ct, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "creation desc", limit: 1e3 }),
          X("Project", { fields: ["name", "project_name", "status"], limit: 1e3 }),
          X("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1e3 }),
          ct("psd_books.api.labour_contract.my_permissions", {}),
          ct(Z + "balance_by_project", {}).catch(() => ({}))
          // card only: the page still opens if this fails
        ]);
        m.value = s || [], f.value = e || [], at.value = n || [], Tt.value = !!(i && i.can_approve), At.value = !!(i && i.can_mark_paid), kt.value = L && typeof L == "object" && !Array.isArray(L) ? L.message || L : {}, Xt(), Qt();
      } catch (s) {
        o("Failed to load weekly bills: " + (s.message || s), "error");
      } finally {
        nt.value = !1;
      }
    }
    async function Xt() {
      try {
        y.value = await ct(Z + "list_columns", { names: m.value.map((s) => s.name) }) || {};
      } catch {
        y.value = {};
      }
    }
    async function Qt() {
      try {
        const [s, e] = await Promise.all([
          X("Labour Contract", { fields: ["name", "activity", "project"], limit: 1e3 }),
          X("Labour Activity", { fields: ["name", "activity_name"], limit: 1e3 })
        ]), n = Object.fromEntries((e || []).map((i) => [i.name, i.activity_name || i.name]));
        et.value = Object.fromEntries((s || []).map((i) => [i.name, n[i.activity] || i.activity || ""])), O.value = Object.fromEntries((s || []).map((i) => [i.name, i.project || ""]));
      } catch {
        et.value = {}, O.value = {};
      }
    }
    async function it(s) {
      if (K.value = "", !l.week_date) {
        g.value = [];
        return;
      }
      ft.value = !0;
      try {
        const e = await ct(Z + "preview", { week_date: l.week_date, name: l.name || null }), n = Oe(e.rows || [], s || g.value);
        g.value = n.rows.map((i) => wt(i) ? { ...i, amount_to_pay: "" } : i), n.dropped.length && (K.value = "Contract " + n.dropped.join(", ") + " is no longer Approved, or its project is Closed, so it can't be paid on this bill.");
      } catch (e) {
        g.value = [], o(e.message || "Could not load contracts", "error");
      } finally {
        ft.value = !1;
      }
    }
    function Zt() {
      Lt(), B.value = !0, it();
    }
    async function Dt(s) {
      Lt({ ...s, week_date: s.week_start }), B.value = !0;
      try {
        const e = await Ce(Ct, s.name);
        Object.assign(l, { rejection_reason: e.rejection_reason, approved_by: e.approved_by, approved_on: e.approved_on, paid_by: e.paid_by, paid_on: e.paid_on, cancelled_by: e.cancelled_by, cancelled_on: e.cancelled_on, cancel_reason: e.cancel_reason, amended_from: e.amended_from, raised_by: e.raised_by }), gt(e.status, !1).canEdit ? await it(e.lines || []) : g.value = (e.lines || []).map((n) => ({ ...n }));
      } catch (e) {
        o(e.message || "Could not open bill", "error");
      }
    }
    async function Nt(s) {
      const e = Ke(l, g.value);
      if (Object.keys(P).forEach((i) => delete P[i]), Object.assign(P, e), Object.keys(e).length)
        return o(Object.values(e)[0], "error"), "";
      const n = g.value.map((i) => vt(i)).find(Boolean);
      if (n)
        return o(n, "error"), "";
      mt.value = !0;
      try {
        const i = await ye(Ie(l, g.value, await he())), L = i && i.name || l.name;
        return s || o(l.name ? "Bill updated" : "Bill saved"), l.name = L, await R(), L;
      } catch (i) {
        return o(i.message || "Could not save bill", "error"), "";
      } finally {
        mt.value = !1;
      }
    }
    async function H(s, e, n) {
      x.value = !0;
      try {
        const i = await Ht(Z + s, e);
        o(n), await R(), i && i.name && (Object.assign(l, { status: i.status, raised_by: i.raised_by, approved_by: i.approved_by, approved_on: i.approved_on, paid_by: i.paid_by, paid_on: i.paid_on, cancelled_by: i.cancelled_by, cancelled_on: i.cancelled_on, cancel_reason: i.cancel_reason, amended_from: i.amended_from, rejection_reason: i.rejection_reason }), gt(i.status, !1).canEdit ? await it(i.lines || []) : g.value = (i.lines || []).map((L) => ({ ...L })));
      } catch (i) {
        o(i.message || "Action failed", "error");
      } finally {
        x.value = !1;
      }
    }
    async function te() {
      if (!await d({ title: "Confirm to send for approval", body: "Send this bill to the Director for approval? Total to pay: KES " + C(q.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const e = await Nt(!0);
      e && await H("send_for_approval", { name: e }, "Sent for Director approval");
    }
    async function ee() {
      await d({ title: "Confirm to approve", body: "Approve " + l.name + "? Total to pay: KES " + C(q.value) + ".", okLabel: "Approve", okStyle: "primary" }) && await H("approve_bill", { name: l.name }, "Bill approved");
    }
    async function ae() {
      await d({ title: "Confirm to mark as paid", body: "Mark bill " + l.name + " as paid? Total paid: KES " + C(q.value) + ". The payment is recorded now and can't be undone.", okLabel: "Yes, mark as Paid", okStyle: "primary" }) && await H("mark_paid", { name: l.name }, "Payment recorded");
    }
    async function ne() {
      await d({ title: "Confirm to edit", body: "Reopen " + l.name + " as a Draft so the amounts can be changed? Its approval is cleared and it must be sent to the Director for approval again.", okLabel: "Reopen for editing", okStyle: "primary" }) && await H("reopen_bill", { name: l.name }, "Bill reopened as Draft");
    }
    async function oe() {
      await d({ title: "Confirm to mark as unpaid", body: "Reverse the payment of " + l.name + " (KES " + C(q.value) + ")? The bill goes back to Approved and the amount no longer counts as paid.", okLabel: "Yes, mark unpaid", okStyle: "primary" }) && await H("mark_unpaid", { name: l.name }, "Bill marked unpaid");
    }
    async function se() {
      const s = await p({ title: "Cancel bill", label: "Reason", okLabel: "Cancel bill" });
      !s || !s.trim() || await H("cancel_bill", { name: l.name, reason: s.trim() }, "Bill cancelled");
    }
    async function le() {
      if (await d({ title: "Confirm to amend", body: "Make a new Draft bill from " + l.name + " with the same week and amounts. You can change it and send it for approval.", okLabel: "Amend", okStyle: "primary" })) {
        x.value = !0;
        try {
          const e = await Ht(Z + "amend_bill", { name: l.name });
          o("New draft " + e.name + " made"), await R();
          const n = m.value.find((i) => i.name === e.name);
          n ? await Dt(n) : B.value = !1;
        } catch (e) {
          o(e.message || "Could not amend bill", "error");
        } finally {
          x.value = !1;
        }
      }
    }
    async function ie() {
      const s = await p({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !s || !s.trim() || await H("send_back_bill", { name: l.name, reason: s.trim() }, "Sent back");
    }
    async function re() {
      if (await d({ title: "Confirm to delete", body: "Delete " + l.name + "? Only a Draft never sent for approval, or a Cancelled bill, can be deleted." })) {
        x.value = !0;
        try {
          await fe(Ct, l.name), o("Bill deleted"), B.value = !1, await R();
        } catch (e) {
          o(e.message || "Could not delete bill", "error");
        } finally {
          x.value = !1;
        }
      }
    }
    function de() {
      const s = window.open("", "_blank");
      if (!s) {
        o("Allow pop-ups to print the bill", "error");
        return;
      }
      const e = G.value.map((i) => ({
        contract: i.contract,
        contractor: Pt.value[i.contractor] || i.contractor,
        activity: et.value[i.contract] || "",
        project: ot.value[O.value[i.contract] || i.project] || O.value[i.contract] || i.project || "",
        contract_value: i.contract_value,
        paid_till_now: i.paid_till_now,
        balance: i.balance,
        amount_to_pay: i.amount_to_pay
      })), n = {
        name: l.name,
        status: l.status,
        week_date: l.week_date,
        approved_by: l.approved_by ? $(l.approved_by) : "",
        approved_on: l.approved_on,
        paid_by: l.paid_by ? $(l.paid_by) : "",
        paid_on: l.paid_on
      };
      s.document.write($e(n, e)), s.document.close(), s.focus(), s.print();
    }
    return ve(R), (s, e) => (c(), u("div", Ye, [
      t("div", Je, [
        t("div", Ge, [
          t("span", {
            innerHTML: v(D)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, qe),
          rt(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (n) => J.value = n),
            placeholder: "Search weekly bills…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [Bt, J.value]
          ])
        ]),
        t("div", Xe, [
          (c(), u(U, null, F(_, (n) => t("button", {
            key: n.k,
            class: dt(["sales-pill", [{ active: E.value === n.k }, n.k !== "all" ? $t[n.k] : ""]]),
            onClick: (i) => E.value = n.k
          }, [
            j(r(n.l) + " ", 1),
            t("span", {
              class: dt(["sales-pill-count", E.value === n.k ? "" : "zb-pc-muted"])
            }, r(zt.value[n.k]), 3)
          ], 10, Qe)), 64))
        ]),
        rt(t("select", {
          "onUpdate:modelValue": e[1] || (e[1] = (n) => N.value = n),
          class: "inv-fi ct-project-filter",
          title: "Filter by project"
        }, [
          e[13] || (e[13] = t("option", { value: "" }, "All projects", -1)),
          (c(!0), u(U, null, F(f.value, (n) => (c(), u("option", {
            key: n.name,
            value: n.name
          }, r(n.project_name || n.name), 9, Ze))), 128))
        ], 512), [
          [Mt, N.value]
        ]),
        t("div", ta, [
          t("button", {
            class: "sales-btn-ghost",
            onClick: R,
            title: "Refresh"
          }, [
            t("span", {
              innerHTML: v(D)("refresh", 13)
            }, null, 8, ea),
            e[14] || (e[14] = j(" Refresh", -1))
          ]),
          t("button", {
            class: "sales-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Not permitted",
            onClick: Zt
          }, [
            t("span", {
              innerHTML: v(D)("plus", 13)
            }, null, 8, na),
            e[15] || (e[15] = j(" New Weekly Bill", -1))
          ], 8, aa)
        ])
      ]),
      t("div", oa, [
        t("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: e[2] || (e[2] = (n) => E.value = "all")
        }, [
          t("div", sa, [
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
            t("div", la, [
              e[16] || (e[16] = t("div", { class: "bk-kpi-label" }, "Total Bills", -1)),
              t("div", ia, r(A.value.all.n), 1),
              t("div", ra, "KES " + r(v(C)(A.value.all.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[3] || (e[3] = (n) => E.value = "draft")
        }, [
          t("div", da, [
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
            t("div", ca, [
              e[18] || (e[18] = t("div", { class: "bk-kpi-label" }, "Draft", -1)),
              t("div", ua, r(A.value.draft.n), 1),
              t("div", va, "KES " + r(v(C)(A.value.draft.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: e[4] || (e[4] = (n) => E.value = "pending")
        }, [
          t("div", pa, [
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
            t("div", ba, [
              e[20] || (e[20] = t("div", { class: "bk-kpi-label" }, "Pending Approval", -1)),
              t("div", _a, r(A.value.pending.n), 1),
              t("div", ka, "KES " + r(v(C)(A.value.pending.value)), 1)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[5] || (e[5] = (n) => E.value = "approved")
        }, [
          t("div", ma, [
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
            t("div", fa, [
              e[22] || (e[22] = t("div", { class: "bk-kpi-label" }, "Approved", -1)),
              t("div", ya, r(A.value.approved.n), 1),
              t("div", ha, "KES " + r(v(C)(A.value.approved.value)), 1)
            ])
          ])
        ])
      ]),
      t("div", wa, [
        t("div", ga, [
          t("div", Ca, [
            t("div", null, [
              e[24] || (e[24] = t("div", { class: "bk-stat-label" }, "Bills This Week", -1)),
              t("div", xa, r(A.value.weekN), 1)
            ]),
            e[25] || (e[25] = pe('<div class="bk-stat-icon" style="background:#dbeafe;color:#2563eb;" data-v-7dbb63c6><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-7dbb63c6><rect x="3" y="4" width="18" height="18" rx="2" data-v-7dbb63c6></rect><line x1="16" y1="2" x2="16" y2="6" data-v-7dbb63c6></line><line x1="8" y1="2" x2="8" y2="6" data-v-7dbb63c6></line><line x1="3" y1="10" x2="21" y2="10" data-v-7dbb63c6></line></svg></div>', 1))
          ])
        ]),
        t("div", ja, [
          t("div", Sa, [
            t("div", null, [
              e[26] || (e[26] = t("div", { class: "bk-stat-label" }, "Amount This Week", -1)),
              t("div", Ta, "KES " + r(v(C)(A.value.weekValue)), 1)
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
        t("div", Aa, [
          t("div", Ea, [
            t("div", null, [
              e[28] || (e[28] = t("div", { class: "bk-stat-label" }, "Total Paid", -1)),
              t("div", La, "KES " + r(v(C)(A.value.paid)), 1)
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
        t("div", Pa, [
          t("div", Da, [
            t("div", null, [
              e[30] || (e[30] = t("div", { class: "bk-stat-label" }, "Balance To Pay", -1)),
              t("div", Na, "KES " + r(v(C)(Yt.value)), 1)
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
      t("div", Ba, [
        t("table", Ma, [
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
            nt.value ? (c(), u(U, { key: 0 }, F(6, (n) => t("tr", {
              key: n,
              class: "vt-row-shimmer"
            }, [...e[32] || (e[32] = [
              t("td", { colspan: "7" }, [
                t("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : ht.value.length ? (c(!0), u(U, { key: 2 }, F(ht.value, (n) => (c(), u("tr", {
              key: n.name,
              class: "inv-row",
              onClick: (i) => Dt(n)
            }, [
              t("td", Ra, r(n.name), 1),
              t("td", $a, r(v(De)(n, y.value[n.name], ot.value)), 1),
              t("td", {
                class: "vt-td vt-td-mono",
                title: ((y.value[n.name] || {}).contracts || []).join(", ")
              }, r(v(Pe)((y.value[n.name] || {}).contracts)), 9, Wa),
              t("td", Ia, r(v(bt)(n.week_start)), 1),
              t("td", Va, r(v(C)(n.total_amount)), 1),
              t("td", za, r(y.value[n.name] ? v(C)(y.value[n.name].balance_after) : "—"), 1),
              t("td", Ya, [
                t("span", {
                  class: dt(["vt-badge", "vt-badge-" + v(je)(n.status)])
                }, [
                  e[33] || (e[33] = t("span", { class: "vt-badge-dot" }, null, -1)),
                  j(r(n.status), 1)
                ], 2)
              ])
            ], 8, Ka))), 128)) : (c(), u("tr", Oa, [
              t("td", Ha, [
                t("div", Ua, r(J.value || N.value || E.value !== "all" ? "No results found" : "No weekly bills yet"), 1),
                t("div", Fa, r(J.value || N.value || E.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly bill"), 1)
              ])
            ]))
          ])
        ]),
        !nt.value && m.value.length ? (c(), u("div", Ja, [
          e[35] || (e[35] = j("Showing ", -1)),
          t("strong", null, r(ht.value.length), 1),
          e[36] || (e[36] = j(" of ", -1)),
          t("strong", null, r(st.value.length), 1),
          e[37] || (e[37] = j(" bills", -1))
        ])) : b("", !0)
      ]),
      e[48] || (e[48] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.", -1)),
      (c(), be(me, { to: "body" }, [
        B.value ? (c(), u("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: e[12] || (e[12] = _e((n) => B.value = !1, ["self"]))
        }, [
          t("div", Ga, [
            t("div", qa, [
              t("div", Xa, [
                t("div", null, [
                  t("div", Qa, r(l.name || "New Weekly Bill"), 1),
                  t("div", Za, r(l.name ? l.status : "Amounts to pay contractors for one week"), 1)
                ])
              ]),
              t("button", {
                class: "inv-dclose",
                style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                onClick: e[6] || (e[6] = (n) => B.value = !1),
                innerHTML: v(D)("x", 15)
              }, null, 8, tn)
            ]),
            t("div", en, [
              t("div", {
                class: dt(["inv-fg", h.value.canEdit ? "inv-fg3" : "inv-fg2"])
              }, [
                h.value.canEdit ? (c(), u("div", an, [
                  e[39] || (e[39] = t("label", { class: "inv-lbl" }, "Project", -1)),
                  rt(t("select", {
                    "onUpdate:modelValue": e[7] || (e[7] = (n) => M.value = n),
                    class: "inv-fi",
                    onChange: Wt
                  }, [
                    e[38] || (e[38] = t("option", { value: "" }, "All projects", -1)),
                    (c(!0), u(U, null, F(Vt.value, (n) => (c(), u("option", {
                      key: n.name,
                      value: n.name
                    }, r(n.project_name || n.name), 9, nn))), 128))
                  ], 544), [
                    [Mt, M.value]
                  ])
                ])) : b("", !0),
                t("div", on, [
                  e[40] || (e[40] = t("label", { class: "inv-lbl" }, [
                    j("Pick any date in the week "),
                    t("span", { class: "nim-req" }, "*")
                  ], -1)),
                  rt(t("input", {
                    type: "date",
                    "onUpdate:modelValue": e[8] || (e[8] = (n) => l.week_date = n),
                    class: "inv-fi",
                    style: ke(qt("week_date")),
                    disabled: !h.value.canEdit || !!l.name,
                    onChange: e[9] || (e[9] = (n) => {
                      delete P.week_date, it();
                    })
                  }, null, 44, sn), [
                    [Bt, l.week_date]
                  ]),
                  P.week_date ? (c(), u("div", ln, r(P.week_date), 1)) : b("", !0)
                ]),
                t("div", rn, [
                  e[41] || (e[41] = t("label", { class: "inv-lbl" }, "Week (Saturday to Friday)", -1)),
                  t("input", {
                    class: "inv-fi",
                    value: v(bt)(l.week_date),
                    disabled: ""
                  }, null, 8, dn)
                ])
              ], 2),
              t("div", cn, [
                t("table", un, [
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
                    ft.value ? (c(), u("tr", vn, [...e[42] || (e[42] = [
                      t("td", {
                        colspan: "8",
                        class: "vt-empty"
                      }, [
                        t("div", { class: "vt-empty-sub" }, "Loading contracts…")
                      ], -1)
                    ])])) : G.value.length ? (c(!0), u(U, { key: 2 }, F(G.value, (n) => (c(), u("tr", {
                      key: n.contract
                    }, [
                      t("td", kn, r(n.contract), 1),
                      t("td", mn, [
                        j(r(Pt.value[n.contractor] || n.contractor), 1),
                        Gt(n.contractor) ? (c(), u("span", fn, " certificate expired")) : b("", !0)
                      ]),
                      t("td", yn, r(et.value[n.contract] || "—"), 1),
                      t("td", hn, r(ot.value[O.value[n.contract] || n.project] || O.value[n.contract] || n.project || "—"), 1),
                      t("td", wn, r(v(C)(n.contract_value)), 1),
                      t("td", gn, [
                        j(r(v(C)(n.paid_till_now)), 1),
                        n.paid_till_now ? b("", !0) : (c(), u("span", Cn, " (New)"))
                      ]),
                      t("td", xn, r(v(C)(n.balance)), 1),
                      t("td", jn, [
                        t("input", {
                          type: "text",
                          inputmode: "decimal",
                          autocomplete: "off",
                          value: n.amount_to_pay,
                          onInput: (i) => Rt(i, n),
                          class: "inv-fi",
                          style: { width: "130px", "text-align": "right" },
                          disabled: !h.value.canEdit || !!n.paid_this_week || wt(n),
                          "aria-label": "Amount to pay now, contract " + n.contract,
                          style2: ""
                        }, null, 40, Sn),
                        n.paid_this_week ? (c(), u("div", Tn, "Already on " + r(n.paid_this_week) + " this week", 1)) : b("", !0),
                        wt(n) ? (c(), u("div", An, "Past week: already has payments")) : b("", !0),
                        v(vt)(n) ? (c(), u("div", En, r(v(vt)(n)), 1)) : b("", !0)
                      ])
                    ]))), 128)) : (c(), u("tr", pn, [
                      t("td", bn, [
                        t("div", _n, r(h.value.canEdit ? M.value ? "No unpaid Approved contracts for this project" : g.value.length ? "All Approved contracts are fully paid" : "There are no Approved contracts to bill" : "No contracts on this bill"), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              G.value.length ? (c(), u("div", Ln, "Total to pay now: KES " + r(v(C)(q.value)), 1)) : b("", !0),
              h.value.canEdit ? (c(), u("div", Pn, [
                t("span", {
                  innerHTML: v(D)("info", 14)
                }, null, 8, Dn),
                e[44] || (e[44] = j("Fully paid contracts are not listed. Contracts of all projects are shown unless you pick a project. A contract can be paid once a week, and an amount can't be above its balance.", -1))
              ])) : b("", !0),
              l.status === v(_t) && l.rejection_reason ? (c(), u("div", Nn, "Sent back: " + r(l.rejection_reason), 1)) : b("", !0),
              l.status === v(pt) ? (c(), u("div", Bn, "Waiting for Director approval. The bill is locked.")) : b("", !0),
              l.status === v(W) ? (c(), u("div", Mn, "Approved by " + r(v($)(l.approved_by)) + " on " + r(v(ut)(l.approved_on)) + ". Payment is not recorded until the bill is marked Paid.", 1)) : b("", !0),
              l.status === v(V) ? (c(), u("div", On, [
                j("Cancelled by " + r(v($)(l.cancelled_by)) + " on " + r(v(ut)(l.cancelled_on)) + ": " + r(l.cancel_reason), 1),
                l.amended_from ? (c(), u("span", Hn, " (amended from " + r(l.amended_from) + ")", 1)) : b("", !0)
              ])) : b("", !0),
              l.amended_from && l.status !== v(V) ? (c(), u("div", Un, "Amended from " + r(l.amended_from) + ".", 1)) : b("", !0),
              l.status === v(Y) ? (c(), u("div", Fn, "Paid. Marked paid by " + r(v($)(l.paid_by)) + " on " + r(v(ut)(l.paid_on)) + ". Approved by " + r(v($)(l.approved_by)) + " on " + r(v(ut)(l.approved_on)) + ".", 1)) : b("", !0),
              lt.value.length && (h.value.canSend || h.value.canApprove) ? (c(), u("div", Kn, [
                t("div", Rn, [
                  t("span", {
                    innerHTML: v(D)("alert", 15)
                  }, null, 8, $n),
                  e[45] || (e[45] = j("Please fix the following", -1))
                ]),
                t("ul", null, [
                  (c(!0), u(U, null, F(lt.value, (n) => (c(), u("li", { key: n }, r(n), 1))), 128))
                ])
              ])) : b("", !0),
              K.value ? (c(), u("div", Wn, r(K.value), 1)) : b("", !0)
            ]),
            t("div", In, [
              t("div", Vn, r(l.name ? "Editing: " + l.name : "New weekly bill — unsaved"), 1),
              t("div", zn, [
                Jt.value && s.$canDelete("admin") ? (c(), u("button", {
                  key: 0,
                  class: "add-btn-cancel wb-del",
                  disabled: x.value,
                  onClick: re
                }, "Delete", 8, Yn)) : b("", !0),
                t("button", {
                  class: "add-btn-cancel",
                  onClick: e[10] || (e[10] = (n) => B.value = !1)
                }, r(h.value.canEdit ? "Cancel" : "Close window"), 1),
                h.value.canEdit ? (c(), u("button", {
                  key: 1,
                  class: "add-btn-draft",
                  disabled: x.value || !yt.value,
                  onClick: e[11] || (e[11] = (n) => Nt(!1))
                }, [
                  t("span", {
                    innerHTML: v(D)("save", 13)
                  }, null, 8, Gn),
                  j(" " + r(mt.value ? "Saving…" : "Save Draft"), 1)
                ], 8, Jn)) : b("", !0),
                h.value.canSend ? (c(), u("button", {
                  key: 2,
                  class: "add-btn-more",
                  disabled: x.value || !yt.value || lt.value.length > 0 || !!K.value,
                  onClick: te
                }, [
                  t("span", {
                    innerHTML: v(D)("check", 13)
                  }, null, 8, Xn),
                  e[46] || (e[46] = j(" Send for approval", -1))
                ], 8, qn)) : b("", !0),
                h.value.canApprove ? (c(), u("button", {
                  key: 3,
                  class: "add-btn-more",
                  disabled: x.value || lt.value.length > 0,
                  onClick: ee
                }, "Approve as Director", 8, Qn)) : b("", !0),
                h.value.canReopen ? (c(), u("button", {
                  key: 4,
                  class: "add-btn-draft",
                  disabled: x.value,
                  onClick: ne
                }, "Edit", 8, Zn)) : b("", !0),
                h.value.canCancel ? (c(), u("button", {
                  key: 5,
                  class: "add-btn-cancel wb-cancel-bill",
                  disabled: x.value,
                  onClick: se
                }, "Cancel bill", 8, to)) : b("", !0),
                l.name && v(Re)(l.status) ? (c(), u("button", {
                  key: 6,
                  class: "add-btn-cancel",
                  disabled: !G.value.length,
                  onClick: de
                }, [
                  t("span", {
                    innerHTML: v(D)("print", 13)
                  }, null, 8, ao),
                  e[47] || (e[47] = j(" Print", -1))
                ], 8, eo)) : b("", !0),
                h.value.canMarkUnpaid ? (c(), u("button", {
                  key: 7,
                  class: "add-btn-cancel",
                  disabled: x.value,
                  onClick: oe
                }, "Mark unpaid", 8, no)) : b("", !0),
                h.value.canAmend ? (c(), u("button", {
                  key: 8,
                  class: "add-btn-more",
                  disabled: x.value || !yt.value,
                  onClick: le
                }, "Amend", 8, oo)) : b("", !0),
                h.value.canMarkPaid ? (c(), u("button", {
                  key: 9,
                  class: "add-btn-more",
                  disabled: x.value,
                  onClick: ae
                }, "Paid", 8, so)) : b("", !0),
                h.value.canSendBack ? (c(), u("button", {
                  key: 10,
                  class: "add-btn-cancel",
                  disabled: x.value,
                  onClick: ie
                }, "Send back", 8, lo)) : b("", !0)
              ])
            ])
          ])
        ])) : b("", !0)
      ]))
    ]));
  }
}, bo = /* @__PURE__ */ ce(io, [["__scopeId", "data-v-7dbb63c6"]]);
export {
  bo as default
};
