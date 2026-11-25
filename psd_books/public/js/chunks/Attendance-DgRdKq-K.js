import { _ as nt, y as ot, o as lt, c as v, a as e, u as c, i as A, w as se, B as he, F as U, r as j, d as g, t as l, b as _, D as it, n as B, p as dt, J as rt, f as ct, l as De, h as L, g as M, A as be, a2 as ut, L as vt, e as pt, K as Le, a3 as ht, $ as bt, Y as kt, k as u, v as mt, S as _t } from "./main-C6Zyq0K6.js";
import { b as ke } from "./format-BcJZDVG4.js";
import { o as me } from "./userNames-atjiIIY8.js";
import { t as ae } from "./labourContractor-CwTlS8Kw.js";
import { f as D, s as ft } from "./labourContract-UoUa3DLZ.js";
const ge = "Draft", oe = "Pending approval", le = "Approved", de = "Submitted", ie = "Sent back", P = "Cancelled", W = [
  { key: "d_sat", label: "Sat" },
  { key: "d_sun", label: "Sun" },
  { key: "d_mon", label: "Mon" },
  { key: "d_tue", label: "Tue" },
  { key: "d_wed", label: "Wed" },
  { key: "d_thu", label: "Thu" },
  { key: "d_fri", label: "Fri" }
], yt = ["C", "SK"], Ue = (s) => s === "C" ? "USK" : s || "", Ee = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], $ = (s) => {
  const [a, i, r] = String(s).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(a, i - 1, r));
}, je = (s) => s.toISOString().slice(0, 10), Me = (s) => String(s).padStart(2, "0"), y = (s) => Number(s) || 0;
function wt(s) {
  return String(s ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
}
function re(s) {
  const a = $(s);
  return a.setUTCDate(a.getUTCDate() - (a.getUTCDay() + 1) % 7), je(a);
}
function Be(s) {
  const a = $(re(s));
  return a.setUTCDate(a.getUTCDate() + 6), je(a);
}
function G(s) {
  if (!s) return "";
  const a = $(re(s)), i = $(Be(s));
  return a.getUTCDate() + " " + Ee[a.getUTCMonth()] + " to " + i.getUTCDate() + " " + Ee[i.getUTCMonth()] + " " + i.getUTCFullYear();
}
function Oe(s) {
  const a = (i) => Me(i.getUTCDate()) + "/" + Me(i.getUTCMonth() + 1) + "/" + String(i.getUTCFullYear()).slice(2);
  return a($(re(s))) + " TO " + a($(Be(s)));
}
function gt(s) {
  const a = s % 100;
  return s + (a >= 11 && a <= 13 ? "TH" : { 1: "ST", 2: "ND", 3: "RD" }[s % 10] || "TH");
}
function We(s) {
  const a = $(re(s));
  return W.map((i, r) => {
    const m = new Date(a);
    return m.setUTCDate(a.getUTCDate() + r), gt(m.getUTCDate());
  });
}
const He = (s, a) => {
  const i = 10 ** a;
  return Math.sign(s) * Math.round(Math.abs(s) * i + 1e-9) / i;
};
function Se(s) {
  return W.reduce((a, i) => a + (Number(s[i.key]) ? 1 : 0), 0);
}
function Y(s) {
  const a = Se(s), i = y(s.rate), r = y(s.sha), m = He(y(s.ot_hours) * i / 8, 2), S = a === 0 && m === 0 ? 0 : He(a * i + m - r, 0);
  return { days: a, otAmount: m, total: S };
}
function Fe(s) {
  const a = { employees: 0, days: 0, otAmount: 0, sha: 0, total: 0 };
  for (const i of s) {
    const r = Y(i);
    (r.days > 0 || y(i.ot_hours) > 0) && (a.employees++, a.sha += y(i.sha)), a.days += r.days, a.otAmount += r.otAmount, a.total += r.total;
  }
  return a;
}
function St(s = [], a = []) {
  const i = new Map(a.map((b) => [b.employee, b])), r = ["grade", "area_of_work", "rate", "ot_hours", "sha", ...W.map((b) => b.key)], m = [], S = s.map((b) => {
    const h = i.get(b.employee);
    if (i.delete(b.employee), !h)
      return a.length && m.push(b.employee_name || b.employee), { ...b };
    const E = { ...b };
    for (const x of r) E[x] = h[x] === void 0 ? b[x] : h[x];
    return E;
  });
  for (const b of i.values()) Se(b) > 0 && S.push({ ...b });
  return S.sort((b, h) => String(b.employee_name || "").toLowerCase().localeCompare(String(h.employee_name || "").toLowerCase())), { rows: S, added: m };
}
const Ne = (s) => s.employee_name || s.employee;
function ne(s) {
  if (y(s.rate) < 0) return "Rate can't be negative";
  if (y(s.ot_hours) < 0) return "OT hours can't be negative";
  if (y(s.sha) < 0) return "SHA can't be negative";
  const a = Y(s);
  return (a.days > 0 || y(s.ot_hours) > 0) && y(s.rate) > 0 && a.total < 0 ? "SHA is more than the wage" : "";
}
function Ct(s) {
  const a = [], i = s.filter((r) => Se(r) > 0 || y(r.ot_hours) > 0);
  i.length || a.push("Tick attendance for at least one worker.");
  for (const r of i) y(r.rate) <= 0 && a.push("Rate per day is missing for " + Ne(r) + ".");
  for (const r of s) {
    const m = ne(r);
    m && a.push(Ne(r) + ": " + m);
  }
  return a;
}
function Tt(s, a = []) {
  const i = {};
  return s.week_date ? a.length || (i.week_date = "There are no Active workers to list") : i.week_date = "Pick a date in the week", i;
}
function Ce(s, a) {
  return a === "draft" ? s.status === ge || s.status === ie : a === "pending" ? s.status === oe : a === "approved" ? s.status === le : a === "submitted" ? s.status === de : a === "cancelled" ? s.status === P : !0;
}
function xt(s) {
  const a = { all: 0, draft: 0, pending: 0, approved: 0, submitted: 0, cancelled: 0 };
  for (const i of s) for (const r of ["all", "draft", "pending", "approved", "submitted", "cancelled"]) Ce(i, r) && a[r]++;
  return a;
}
function At(s, a = ae()) {
  const i = () => ({ n: 0, value: 0 }), r = { all: i(), pending: i(), approved: i(), submitted: i(), monthValue: 0, latest: null }, m = String(a).slice(0, 7);
  for (const S of s || []) {
    if (S.status === P) continue;
    const b = y(S.total_amount);
    r.all.n++, r.all.value += b;
    for (const E of ["pending", "approved", "submitted"]) Ce(S, E) && (r[E].n++, r[E].value += b);
    if (S.status !== de) continue;
    const h = String(S.week_start || "").slice(0, 10);
    h && (h.slice(0, 7) === m && (r.monthValue += b), (!r.latest || h > r.latest.week_start) && (r.latest = { week_start: h, value: b }));
  }
  return r;
}
function Dt(s, a) {
  const i = String(a || "").trim().toLowerCase();
  return i ? [s.name, s.status, G(s.week_start)].some((r) => String(r || "").toLowerCase().includes(i)) : !0;
}
function _e(s, a) {
  const i = s === ge || s === ie;
  return {
    canEdit: i,
    canSend: i,
    canApprove: s === oe && !!a,
    canSendBack: s === oe && !!a,
    canSubmit: s === le,
    canCancel: (s === ie || s === le || s === de) && !!a,
    canAmend: s === P
  };
}
function Lt(s, a = /* @__PURE__ */ new Set()) {
  return s.status === P ? !a.has(s.name) : s.status === ge && !s.raised_by;
}
function Et(s) {
  return new Set((s || []).map((a) => a.amends_sheet).filter(Boolean));
}
function Mt(s, a, i) {
  return {
    doctype: "Labour Attendance Sheet",
    ...s.name ? { name: s.name } : {},
    company: i,
    week_start: s.week_date,
    lines: a.map((r) => ({
      employee: r.employee,
      grade: r.grade || "C",
      area_of_work: r.area_of_work || "",
      ...Object.fromEntries(W.map((m) => [m.key, Number(r[m.key]) ? 1 : 0])),
      rate: y(r.rate),
      ot_hours: y(r.ot_hours),
      sha: y(r.sha)
    }))
  };
}
const z = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), X = (s) => Math.round(y(s)).toLocaleString("en-US"), fe = (s) => (Math.round(y(s) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
function Ot(s, a) {
  const i = We(s), r = Fe(a), m = '<tr><th rowspan="2">S.NO</th><th rowspan="2">NAMES</th><th rowspan="2">ID NO.</th><th rowspan="2">Grade</th><th rowspan="2">AREA OF WORK</th>' + i.map((h) => "<th>" + h + "</th>").join("") + '<th rowspan="2">Days</th><th rowspan="2">Rate</th><th rowspan="2">OT</th><th rowspan="2">OT amount</th><th rowspan="2">SHA</th><th rowspan="2">Total</th><th rowspan="2" class="sg">SIGNATURE</th><th rowspan="2" class="sg">ID NO</th></tr><tr>' + W.map((h) => "<th>" + h.label + "</th>").join("") + "</tr>", S = a.map((h, E) => {
    const x = Y(h);
    return "<tr><td>" + (E + 1) + '</td><td class="l">' + z(h.employee_name) + "</td><td>" + z(h.id_no) + "</td><td>" + z(Ue(h.grade)) + "</td><td>" + z(h.area_of_work) + "</td>" + W.map((F) => "<td>" + (Number(h[F.key]) ? 1 : 0) + "</td>").join("") + "<td>" + x.days + "</td><td>" + X(h.rate) + "</td><td>" + (y(h.ot_hours) ? fe(h.ot_hours) : "") + "</td><td>" + fe(x.otAmount) + "</td><td>" + X(h.sha) + "</td><td><b>" + X(x.total) + "</b></td><td></td><td></td></tr>";
  }).join(""), b = '<tr class="tt"><td colspan="12" class="l"><b>Total (' + r.employees + " workers)</b></td><td><b>" + r.days + "</b></td><td></td><td></td><td><b>" + fe(r.otAmount) + "</b></td><td><b>" + X(r.sha) + "</b></td><td><b>" + X(r.total) + "</b></td><td></td><td></td></tr>";
  return '<!doctype html><html><head><meta charset="utf-8"><title>Weekly wages payment sheet ' + z(Oe(s)) + "</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Arial,Helvetica,sans-serif;font-size:11px;margin:0}h1{font-size:13px;text-align:center;text-decoration:underline;margin:0 0 8px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:3px 4px;text-align:center}td.l{text-align:left}th.sg{min-width:70px}tr.tt td{background:#f3f3f3}</style></head><body><h1>WEEKLY WAGES PAYMENT SHEET " + z(Oe(s)) + "</h1><table>" + m + S + b + "</table></body></html>";
}
const Ht = { class: "list-page" }, Nt = { class: "sales-toolbar" }, Ut = { class: "sales-search" }, jt = ["innerHTML"], Bt = { class: "sales-pills" }, Wt = ["onClick"], Ft = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, Rt = ["innerHTML"], It = ["disabled", "title"], Kt = ["innerHTML"], Pt = { class: "bk-kpi-grid bk-kpi-grid-4" }, $t = { class: "bk-kpi-inner" }, Vt = { class: "bk-kpi-body" }, zt = { class: "bk-kpi-value" }, Gt = { class: "bk-kpi-trend ct-kpi-sub" }, Yt = { class: "bk-kpi-inner" }, Jt = { class: "bk-kpi-body" }, qt = { class: "bk-kpi-value bk-kpi-amber" }, Qt = { class: "bk-kpi-trend ct-kpi-sub" }, Xt = { class: "bk-kpi-inner" }, Zt = { class: "bk-kpi-body" }, es = { class: "bk-kpi-value bk-kpi-green" }, ts = { class: "bk-kpi-trend ct-kpi-sub" }, ss = { class: "bk-kpi-inner" }, as = { class: "bk-kpi-body" }, ns = { class: "bk-kpi-value bk-kpi-blue" }, os = { class: "bk-kpi-trend ct-kpi-sub" }, ls = { class: "bk-stat-grid" }, is = { class: "bk-stat-card" }, ds = { class: "bk-stat-content" }, rs = {
  class: "bk-stat-value bk-kpi-blue",
  style: { "font-size": "16px" }
}, cs = { class: "bk-stat-card" }, us = { class: "bk-stat-content" }, vs = {
  class: "bk-stat-value bk-kpi-blue",
  style: { "font-size": "16px" }
}, ps = {
  class: "ct-kpi-sub",
  style: { "font-size": "11px" }
}, hs = { class: "bk-stat-card" }, bs = { class: "bk-stat-content" }, ks = {
  class: "bk-stat-value bk-kpi-amber",
  style: { "font-size": "16px" }
}, ms = { class: "bk-stat-card" }, _s = { class: "bk-stat-content" }, fs = {
  class: "bk-stat-value bk-kpi-green",
  style: { "font-size": "16px" }
}, ys = { class: "inv-table-wrap" }, ws = { class: "inv-table" }, gs = { key: 1 }, Ss = {
  colspan: "4",
  class: "vt-empty"
}, Cs = { class: "vt-empty-title" }, Ts = { class: "vt-empty-sub" }, xs = ["onClick"], As = { class: "vt-td vt-td-mono" }, Ds = { class: "vt-td vt-td-secondary" }, Ls = { class: "vt-td vt-td-r" }, Es = { class: "vt-td" }, Ms = {
  key: 0,
  class: "vt-footer"
}, Os = { class: "inv-dh" }, Hs = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, Ns = { class: "inv-dh-title" }, Us = { class: "at-badge" }, js = ["innerHTML"], Bs = { class: "inv-dbody" }, Ws = {
  key: 0,
  class: "ct-errbox"
}, Fs = { class: "ct-errbox-title" }, Rs = ["innerHTML"], Is = {
  key: 1,
  class: "ct-note"
}, Ks = {
  key: 2,
  class: "ct-note ct-note-bad"
}, Ps = {
  key: 3,
  class: "ct-note"
}, $s = {
  key: 4,
  class: "ct-note ct-note-ok"
}, Vs = {
  key: 5,
  class: "ct-note ct-note-bad"
}, zs = {
  key: 6,
  class: "ct-note"
}, Gs = {
  key: 7,
  class: "ct-note ct-note-ok"
}, Ys = { class: "add-card at-card-first" }, Js = { class: "add-card-title" }, qs = { class: "add-card-title-icon" }, Qs = ["innerHTML"], Xs = { class: "inv-fg inv-fg3" }, Zs = ["disabled"], ea = {
  key: 0,
  class: "ct-err"
}, ta = ["value"], sa = { class: "at-period" }, aa = ["innerHTML"], na = { class: "at-period-val" }, oa = { class: "add-card" }, la = { class: "add-card-title" }, ia = { class: "add-card-title-icon" }, da = ["innerHTML"], ra = { class: "at-count" }, ca = {
  class: "at-grid",
  style: { "overflow-x": "auto" }
}, ua = {
  class: "inv-table",
  style: { "font-size": "12px", "min-width": "1240px" }
}, va = { class: "ct-dd" }, pa = { key: 0 }, ha = { key: 1 }, ba = { class: "vt-td" }, ka = { class: "vt-td vt-td-mono" }, ma = { class: "vt-td" }, _a = { class: "vt-td" }, fa = ["onUpdate:modelValue", "disabled", "aria-label"], ya = ["value"], wa = { class: "vt-td" }, ga = ["onUpdate:modelValue", "disabled", "aria-label"], Sa = ["checked", "disabled", "aria-label", "onChange"], Ca = { class: "vt-td vt-td-r" }, Ta = { class: "vt-td vt-td-r" }, xa = ["value", "onInput", "disabled", "aria-label"], Aa = { class: "vt-td vt-td-r" }, Da = ["value", "onInput", "disabled", "aria-label"], La = { class: "vt-td vt-td-r" }, Ea = { class: "vt-td vt-td-r" }, Ma = ["value", "onInput", "disabled", "aria-label"], Oa = { class: "vt-td vt-td-r" }, Ha = {
  key: 0,
  class: "ct-err"
}, Na = { class: "at-foot" }, Ua = { class: "ct-info" }, ja = ["innerHTML"], Ba = {
  key: 0,
  class: "at-totals"
}, Wa = {
  key: 8,
  class: "ct-errbox"
}, Fa = { class: "ct-errbox-title" }, Ra = ["innerHTML"], Ia = { class: "inv-dfooter" }, Ka = { class: "add-footer-status" }, Pa = { class: "add-footer-actions" }, $a = ["disabled"], Va = ["disabled"], za = ["innerHTML"], Ga = ["disabled"], Ya = ["innerHTML"], Ja = ["disabled"], qa = ["innerHTML"], Qa = ["disabled"], Xa = ["disabled"], Za = ["disabled"], en = ["disabled", "title"], tn = ["disabled"], ye = "Labour Attendance Sheet", we = "psd_books.api.labour_attendance.", sn = {
  __name: "Attendance",
  setup(s) {
    const { toast: a } = ot(), { confirm: i } = ht(), { prompt: r } = bt(), { canEdit: m } = _t(), S = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "submitted", l: "Submitted" }, { k: "cancelled", l: "Cancelled" }], b = { draft: "pill-draft", pending: "pill-unpaid", approved: "pill-paid", submitted: "pill-submitted", cancelled: "pill-cancelled" }, h = L([]), E = L(!1), x = L(!0), F = L(""), O = L("all"), R = L(!1), ce = L(!1), T = L(!1), f = L([]), ue = L(!1), I = L(""), J = L(""), N = be({ week: !1, sheet: !1 }), H = be({}), o = be({}), Z = M(() => m("admin"));
    function ve(d, t, n) {
      const p = wt(d.target.value);
      d.target.value = p, t[n] = p;
    }
    const Re = () => ({ name: "", status: "Draft", week_date: ae(), raised_by: "", approved_by: "", approved_on: "", submitted_by: "", submitted_on: "", rejection_reason: "", cancelled_by: "", cancelled_on: "", cancel_reason: "", amends_sheet: "" });
    function Te(d) {
      Object.keys(H).forEach((t) => delete H[t]), Object.keys(o).forEach((t) => delete o[t]), Object.assign(o, Re(), d || {}), f.value = [], I.value = "", J.value = "";
    }
    const Ie = M(() => xt(h.value)), C = M(() => At(h.value, ae())), pe = M(() => h.value.filter((d) => Ce(d, O.value) && Dt(d, F.value))), w = M(() => _e(o.status, E.value)), Ke = M(() => Et(h.value)), q = M(() => o.name && (h.value.find((d) => d.amends_sheet === o.name) || {}).name || ""), Pe = M(() => !!o.name && Lt(o, Ke.value)), $e = (d) => d === P ? "red" : ft(d), K = M(() => Fe(f.value)), ee = M(() => Ct(f.value)), Ve = M(() => We(o.week_date || ae())), ze = (d) => (Math.round((Number(d) || 0) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
    function Ge(d) {
      return H[d] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function V() {
      x.value = !0;
      try {
        const [d, t] = await Promise.all([
          ct(ye, { fields: ["name", "status", "week_start", "week_end", "total_amount", "raised_by", "amends_sheet", "cancelled_by", "cancelled_on", "cancel_reason"], order: "week_start desc, modified desc", limit: 1e3 }),
          De("psd_books.api.labour_contract.my_permissions", {})
        ]);
        h.value = d || [], E.value = !!(t && t.can_approve);
      } catch (d) {
        a("Failed to load wages sheets: " + (d.message || d), "error");
      } finally {
        x.value = !1;
      }
    }
    async function te(d) {
      if (J.value = "", I.value = "", !o.week_date) {
        f.value = [];
        return;
      }
      ue.value = !0;
      try {
        const t = await De(we + "preview", { week_date: o.week_date, name: o.name || null });
        I.value = t.existing_sheet || "";
        const n = St(t.rows || [], d === void 0 ? f.value : d);
        f.value = n.rows, n.added.length && (J.value = "New workers added to this sheet: " + n.added.join(", ") + ".");
      } catch (t) {
        f.value = [], a(t.message || "Could not load workers", "error");
      } finally {
        ue.value = !1;
      }
    }
    function Ye() {
      Te(), R.value = !0, te([]);
    }
    async function xe(d) {
      Te({ ...d, week_date: d.week_start }), R.value = !0;
      try {
        const t = await kt(ye, d.name);
        Object.assign(o, { status: t.status, rejection_reason: t.rejection_reason, approved_by: t.approved_by, approved_on: t.approved_on, raised_by: t.raised_by, submitted_by: t.submitted_by, submitted_on: t.submitted_on, cancelled_by: t.cancelled_by, cancelled_on: t.cancelled_on, cancel_reason: t.cancel_reason, amends_sheet: t.amends_sheet }), _e(t.status, !1).canEdit ? await te(t.lines || []) : f.value = (t.lines || []).map((n) => ({ ...n }));
      } catch (t) {
        a(t.message || "Could not open sheet", "error");
      }
    }
    async function Ae(d) {
      const t = Tt(o, f.value);
      if (Object.keys(H).forEach((p) => delete H[p]), Object.assign(H, t), Object.keys(t).length)
        return a(Object.values(t)[0], "error"), "";
      const n = f.value.map((p) => ne(p)).find(Boolean);
      if (n)
        return a(n, "error"), "";
      ce.value = !0;
      try {
        const p = await vt(Mt(o, f.value, await pt())), k = p && p.name || o.name;
        return d || a(o.name ? "Sheet updated" : "Sheet saved"), o.name = k, await V(), k;
      } catch (p) {
        return a(p.message || "Could not save sheet", "error"), "";
      } finally {
        ce.value = !1;
      }
    }
    async function Q(d, t, n) {
      T.value = !0;
      try {
        const p = await Le(we + d, t);
        a(n), await V(), p && p.name && (Object.assign(o, { status: p.status, raised_by: p.raised_by, approved_by: p.approved_by, approved_on: p.approved_on, submitted_by: p.submitted_by, submitted_on: p.submitted_on, rejection_reason: p.rejection_reason, cancelled_by: p.cancelled_by, cancelled_on: p.cancelled_on, cancel_reason: p.cancel_reason, amends_sheet: p.amends_sheet }), _e(p.status, !1).canEdit ? await te(p.lines || []) : f.value = (p.lines || []).map((k) => ({ ...k })));
      } catch (p) {
        a(p.message || "Action failed", "error");
      } finally {
        T.value = !1;
      }
    }
    async function Je() {
      if (!await i({ title: "Confirm to send for approval", body: "Send this wages sheet to the Director for approval? Wages: KES " + D(K.value.total) + " for " + K.value.employees + " workers. The sheet is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const t = await Ae(!0);
      t && await Q("send_for_approval", { name: t }, "Sent for Director approval");
    }
    async function qe() {
      await i({ title: "Confirm to approve", body: "Approve " + o.name + "? Wages: KES " + D(K.value.total) + " for " + K.value.employees + " workers. Submit it afterwards to finalise.", okLabel: "Approve", okStyle: "primary" }) && await Q("approve_sheet", { name: o.name }, "Sheet approved");
    }
    async function Qe() {
      const d = await r({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !d || !d.trim() || await Q("send_back_sheet", { name: o.name, reason: d.trim() }, "Sent back");
    }
    async function Xe() {
      const d = await r({ title: "Cancel sheet " + o.name, label: "Reason", okLabel: "Cancel sheet" });
      !d || !d.trim() || await Q("cancel_sheet", { name: o.name, reason: d.trim() }, "Sheet cancelled");
    }
    async function Ze() {
      if (await i({ title: "Confirm to amend", body: "Create a new Draft for " + G(o.week_date) + " with all lines copied from " + o.name + "? Correct it, then send it for approval.", okLabel: "Amend", okStyle: "primary" })) {
        T.value = !0;
        try {
          const t = await Le(we + "amend_sheet", { name: o.name });
          a("Amendment created: " + t.name), await V();
          const n = h.value.find((p) => p.name === t.name);
          n ? await xe(n) : R.value = !1;
        } catch (t) {
          a(t.message || "Could not amend sheet", "error");
        } finally {
          T.value = !1;
        }
      }
    }
    async function et() {
      await i({ title: "Confirm to submit", body: "Submit " + o.name + "? A submitted sheet is final and can't be edited." }) && await Q("submit_sheet", { name: o.name }, "Sheet submitted");
    }
    async function tt() {
      if (await i({ title: "Confirm to delete", body: "Delete " + o.name + "? Only a sheet never sent for approval, or a cancelled sheet that was not amended, can be deleted." })) {
        T.value = !0;
        try {
          await ut(ye, o.name), a("Sheet deleted"), R.value = !1, await V();
        } catch (t) {
          a(t.message || "Could not delete sheet", "error");
        } finally {
          T.value = !1;
        }
      }
    }
    function st() {
      const d = window.open("", "_blank");
      if (!d) {
        a("Allow pop-ups to print the sheet", "error");
        return;
      }
      d.document.write(Ot(o.week_date, f.value)), d.document.close(), d.focus(), d.print();
    }
    return lt(V), (d, t) => (u(), v("div", Ht, [
      e("div", Nt, [
        e("div", Ut, [
          e("span", {
            innerHTML: c(A)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, jt),
          se(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (n) => F.value = n),
            placeholder: "Search wages sheets…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [he, F.value]
          ])
        ]),
        e("div", Bt, [
          (u(), v(U, null, j(S, (n) => e("button", {
            key: n.k,
            class: B(["sales-pill", [{ active: O.value === n.k }, n.k !== "all" ? b[n.k] : ""]]),
            onClick: (p) => O.value = n.k
          }, [
            g(l(n.l) + " ", 1),
            e("span", {
              class: B(["sales-pill-count", O.value === n.k ? "" : "zb-pc-muted"])
            }, l(Ie.value[n.k]), 3)
          ], 10, Wt)), 64))
        ]),
        e("div", Ft, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: V,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: c(A)("refresh", 13)
            }, null, 8, Rt),
            t[12] || (t[12] = g(" Refresh", -1))
          ]),
          e("button", {
            class: "sales-btn-primary",
            disabled: !d.$canCreate("admin"),
            title: d.$canCreate("admin") ? "" : "Not permitted",
            onClick: Ye
          }, [
            e("span", {
              innerHTML: c(A)("plus", 13)
            }, null, 8, Kt),
            t[13] || (t[13] = g(" New Wages Sheet", -1))
          ], 8, It)
        ])
      ]),
      e("div", Pt, [
        e("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: t[1] || (t[1] = (n) => O.value = "all")
        }, [
          e("div", $t, [
            t[15] || (t[15] = e("div", {
              class: "bk-kpi-icon",
              style: { background: "#dbeafe" }
            }, [
              e("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#2563eb",
                "stroke-width": "1.8"
              }, [
                e("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                e("polyline", { points: "14 2 14 8 20 8" })
              ])
            ], -1)),
            e("div", Vt, [
              t[14] || (t[14] = e("div", { class: "bk-kpi-label" }, "Total Sheets", -1)),
              e("div", zt, l(C.value.all.n), 1),
              e("div", Gt, "KES " + l(c(D)(C.value.all.value)), 1)
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: t[2] || (t[2] = (n) => O.value = "pending")
        }, [
          e("div", Yt, [
            t[17] || (t[17] = e("div", {
              class: "bk-kpi-icon",
              style: { background: "#fef3c7" }
            }, [
              e("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#d97706",
                "stroke-width": "1.8"
              }, [
                e("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10"
                }),
                e("polyline", { points: "12 6 12 12 16 14" })
              ])
            ], -1)),
            e("div", Jt, [
              t[16] || (t[16] = e("div", { class: "bk-kpi-label" }, "Pending Approval", -1)),
              e("div", qt, l(C.value.pending.n), 1),
              e("div", Qt, "KES " + l(c(D)(C.value.pending.value)), 1)
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: t[3] || (t[3] = (n) => O.value = "approved")
        }, [
          e("div", Xt, [
            t[19] || (t[19] = e("div", {
              class: "bk-kpi-icon",
              style: { background: "#dcfce7" }
            }, [
              e("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none"
              }, [
                e("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "#16a34a",
                  "stroke-width": "1.8"
                }),
                e("polyline", {
                  points: "7 12.5 10.5 16 17 9",
                  stroke: "#16a34a",
                  "stroke-width": "1.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ])
            ], -1)),
            e("div", Zt, [
              t[18] || (t[18] = e("div", { class: "bk-kpi-label" }, "Approved", -1)),
              e("div", es, l(C.value.approved.n), 1),
              e("div", ts, "KES " + l(c(D)(C.value.approved.value)), 1)
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: t[4] || (t[4] = (n) => O.value = "submitted")
        }, [
          e("div", ss, [
            t[21] || (t[21] = e("div", {
              class: "bk-kpi-icon",
              style: { background: "#dbeafe" }
            }, [
              e("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#2563eb",
                "stroke-width": "1.8"
              }, [
                e("rect", {
                  x: "3",
                  y: "11",
                  width: "18",
                  height: "11",
                  rx: "2"
                }),
                e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
              ])
            ], -1)),
            e("div", as, [
              t[20] || (t[20] = e("div", { class: "bk-kpi-label" }, "Submitted", -1)),
              e("div", ns, l(C.value.submitted.n), 1),
              e("div", os, "KES " + l(c(D)(C.value.submitted.value)), 1)
            ])
          ])
        ])
      ]),
      e("div", ls, [
        e("div", is, [
          e("div", ds, [
            e("div", null, [
              t[22] || (t[22] = e("div", { class: "bk-stat-label" }, "Wages This Month", -1)),
              e("div", rs, "KES " + l(c(D)(C.value.monthValue)), 1)
            ]),
            t[23] || (t[23] = e("div", {
              class: "bk-stat-icon",
              style: { background: "#cffafe", color: "#0891b2" }
            }, [
              e("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                e("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" })
              ])
            ], -1))
          ])
        ]),
        e("div", cs, [
          e("div", us, [
            e("div", null, [
              t[24] || (t[24] = e("div", { class: "bk-stat-label" }, "Latest Week Wages", -1)),
              e("div", vs, "KES " + l(c(D)(C.value.latest ? C.value.latest.value : 0)), 1),
              e("div", ps, l(C.value.latest ? c(G)(C.value.latest.week_start) : "No approved sheet yet"), 1)
            ]),
            t[25] || (t[25] = e("div", {
              class: "bk-stat-icon",
              style: { background: "#cffafe", color: "#0891b2" }
            }, [
              e("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                e("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" })
              ])
            ], -1))
          ])
        ]),
        e("div", hs, [
          e("div", bs, [
            e("div", null, [
              t[26] || (t[26] = e("div", { class: "bk-stat-label" }, "Pending Approval Amount", -1)),
              e("div", ks, "KES " + l(c(D)(C.value.pending.value)), 1)
            ]),
            t[27] || (t[27] = e("div", {
              class: "bk-stat-icon",
              style: { background: "#fef3c7", color: "#d97706" }
            }, [
              e("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                e("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10"
                }),
                e("polyline", { points: "12 6 12 12 16 14" })
              ])
            ], -1))
          ])
        ]),
        e("div", ms, [
          e("div", _s, [
            e("div", null, [
              t[28] || (t[28] = e("div", { class: "bk-stat-label" }, "Submitted Total", -1)),
              e("div", fs, "KES " + l(c(D)(C.value.submitted.value)), 1)
            ]),
            t[29] || (t[29] = e("div", {
              class: "bk-stat-icon",
              style: { background: "#dcfce7", color: "#16a34a" }
            }, [
              e("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                e("rect", {
                  x: "2",
                  y: "5",
                  width: "20",
                  height: "14",
                  rx: "2"
                }),
                e("line", {
                  x1: "2",
                  y1: "10",
                  x2: "22",
                  y2: "10"
                })
              ])
            ], -1))
          ])
        ])
      ]),
      e("div", ys, [
        e("table", ws, [
          t[32] || (t[32] = e("thead", null, [
            e("tr", null, [
              e("th", { class: "vt-th" }, "Sheet"),
              e("th", { class: "vt-th" }, "Week (Saturday to Friday)"),
              e("th", { class: "vt-th vt-th-r" }, "Total Wages (KES)"),
              e("th", { class: "vt-th" }, "Status")
            ])
          ], -1)),
          e("tbody", null, [
            x.value ? (u(), v(U, { key: 0 }, j(6, (n) => e("tr", {
              key: n,
              class: "vt-row-shimmer"
            }, [...t[30] || (t[30] = [
              e("td", { colspan: "4" }, [
                e("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : pe.value.length ? (u(!0), v(U, { key: 2 }, j(pe.value, (n) => (u(), v("tr", {
              key: n.name,
              class: "inv-row",
              onClick: (p) => xe(n)
            }, [
              e("td", As, l(n.name), 1),
              e("td", Ds, l(c(G)(n.week_start)), 1),
              e("td", Ls, l(c(D)(n.total_amount)), 1),
              e("td", Es, [
                e("span", {
                  class: B(["vt-badge", "vt-badge-" + $e(n.status)])
                }, [
                  t[31] || (t[31] = e("span", { class: "vt-badge-dot" }, null, -1)),
                  g(l(n.status), 1)
                ], 2)
              ])
            ], 8, xs))), 128)) : (u(), v("tr", gs, [
              e("td", Ss, [
                e("div", Cs, l(F.value || O.value !== "all" ? "No results found" : "No wages sheets yet"), 1),
                e("div", Ts, l(F.value || O.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly wages sheet"), 1)
              ])
            ]))
          ])
        ]),
        !x.value && h.value.length ? (u(), v("div", Ms, [
          t[33] || (t[33] = g("Showing ", -1)),
          e("strong", null, l(pe.value.length), 1),
          t[34] || (t[34] = g(" of ", -1)),
          e("strong", null, l(h.value.length), 1),
          t[35] || (t[35] = g(" sheets", -1))
        ])) : _("", !0)
      ]),
      t[60] || (t[60] = e("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "One sheet per week for all Active workers, Saturday to Friday. A Director approves each sheet; once sent for approval it is locked, and a submitted sheet is final. A Director can cancel a sent back, approved or submitted sheet; a cancelled sheet can be amended into a new draft, or deleted if it was not amended.", -1)),
      (u(), it(rt, { to: "body" }, [
        e("div", {
          class: B(["inv-drawer-panel at-drawer", { open: R.value }])
        }, [
          e("div", Os, [
            e("div", Hs, [
              e("div", Ns, l(o.name || "New Wages Sheet"), 1),
              e("span", Us, l(o.name ? o.status : "Draft"), 1)
            ]),
            e("button", {
              class: "inv-dclose",
              onClick: t[5] || (t[5] = (n) => R.value = !1)
            }, [
              e("span", {
                innerHTML: c(A)("x", 16)
              }, null, 8, js)
            ])
          ]),
          e("div", Bs, [
            I.value ? (u(), v("div", Ws, [
              e("div", Fs, [
                e("span", {
                  innerHTML: c(A)("alert", 15)
                }, null, 8, Rs),
                t[36] || (t[36] = g("There is already a sheet for this week", -1))
              ]),
              e("ul", null, [
                e("li", null, "Sheet " + l(I.value) + " covers this week. Open it from the list instead.", 1)
              ])
            ])) : _("", !0),
            J.value ? (u(), v("div", Is, l(J.value), 1)) : _("", !0),
            o.status === c(ie) && o.rejection_reason ? (u(), v("div", Ks, "Sent back: " + l(o.rejection_reason), 1)) : _("", !0),
            o.status === c(oe) ? (u(), v("div", Ps, "Waiting for Director approval. The sheet is locked.")) : _("", !0),
            o.status === c(le) ? (u(), v("div", $s, "Approved by " + l(c(me)(o.approved_by)) + " on " + l(c(ke)(o.approved_on)) + ". Submit to finalise.", 1)) : _("", !0),
            o.status === c(P) ? (u(), v("div", Vs, "Cancelled by " + l(c(me)(o.cancelled_by)) + " on " + l(c(ke)(o.cancelled_on)) + ". Reason: " + l(o.cancel_reason) + ". " + l(q.value ? "Amended as " + q.value + "." : "Amend it to make a new sheet for this week."), 1)) : _("", !0),
            o.amends_sheet && o.status !== c(P) ? (u(), v("div", zs, "This sheet amends the cancelled sheet " + l(o.amends_sheet) + ".", 1)) : _("", !0),
            o.status === c(de) ? (u(), v("div", Gs, "Submitted by " + l(c(me)(o.submitted_by)) + " on " + l(c(ke)(o.submitted_on)) + ". This week's wages sheet is final.", 1)) : _("", !0),
            e("div", Ys, [
              e("div", {
                class: "add-card-header",
                onClick: t[6] || (t[6] = (n) => N.week = !N.week)
              }, [
                e("div", Js, [
                  e("span", qs, [
                    e("span", {
                      innerHTML: c(A)("calendar", 16)
                    }, null, 8, Qs)
                  ]),
                  t[37] || (t[37] = g(" Week ", -1))
                ]),
                e("span", {
                  class: B(["add-card-chevron", { collapsed: N.week }])
                }, [...t[38] || (t[38] = [
                  e("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5"
                  }, [
                    e("polyline", { points: "6 9 12 15 18 9" })
                  ], -1)
                ])], 2)
              ]),
              e("div", {
                class: B(["add-card-body", { collapsed: N.week }])
              }, [
                e("div", Xs, [
                  e("div", null, [
                    t[39] || (t[39] = e("label", { class: "inv-lbl" }, [
                      g("Pick any date in the week "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    se(e("input", {
                      type: "date",
                      "onUpdate:modelValue": t[7] || (t[7] = (n) => o.week_date = n),
                      class: "inv-fi",
                      style: dt(Ge("week_date")),
                      disabled: !w.value.canEdit || !!o.name,
                      onChange: t[8] || (t[8] = (n) => {
                        delete H.week_date, te([]);
                      })
                    }, null, 44, Zs), [
                      [he, o.week_date]
                    ]),
                    H.week_date ? (u(), v("div", ea, l(H.week_date), 1)) : _("", !0)
                  ]),
                  e("div", null, [
                    t[40] || (t[40] = e("label", { class: "inv-lbl" }, "Week (Saturday to Friday)", -1)),
                    e("input", {
                      class: "inv-fi",
                      value: c(G)(o.week_date),
                      disabled: ""
                    }, null, 8, ta)
                  ]),
                  e("div", sa, [
                    e("span", {
                      class: "at-period-icon",
                      innerHTML: c(A)("calendar", 16)
                    }, null, 8, aa),
                    e("div", null, [
                      t[41] || (t[41] = e("div", { class: "at-period-lbl" }, "Week Period", -1)),
                      e("div", na, l(c(G)(o.week_date)), 1)
                    ])
                  ])
                ])
              ], 2)
            ]),
            e("div", oa, [
              e("div", {
                class: "add-card-header",
                onClick: t[9] || (t[9] = (n) => N.sheet = !N.sheet)
              }, [
                e("div", la, [
                  e("span", ia, [
                    e("span", {
                      innerHTML: c(A)("check", 16)
                    }, null, 8, da)
                  ]),
                  t[42] || (t[42] = g(" Weekly Wages ", -1)),
                  e("span", ra, l(f.value.length) + " worker" + l(f.value.length !== 1 ? "s" : ""), 1)
                ]),
                e("span", {
                  class: B(["add-card-chevron", { collapsed: N.sheet }])
                }, [...t[43] || (t[43] = [
                  e("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5"
                  }, [
                    e("polyline", { points: "6 9 12 15 18 9" })
                  ], -1)
                ])], 2)
              ]),
              e("div", {
                class: B(["add-card-body", { collapsed: N.sheet }])
              }, [
                e("div", ca, [
                  e("table", ua, [
                    e("thead", null, [
                      e("tr", null, [
                        t[44] || (t[44] = e("th", { class: "vt-th" }, "#", -1)),
                        t[45] || (t[45] = e("th", { class: "vt-th" }, "ID No.", -1)),
                        t[46] || (t[46] = e("th", { class: "vt-th" }, "Name", -1)),
                        t[47] || (t[47] = e("th", { class: "vt-th" }, "Grade", -1)),
                        t[48] || (t[48] = e("th", { class: "vt-th" }, "Area of Work", -1)),
                        (u(!0), v(U, null, j(c(W), (n, p) => (u(), v("th", {
                          key: n.key,
                          class: "vt-th",
                          style: { "text-align": "center" }
                        }, [
                          g(l(n.label), 1),
                          e("div", va, l(Ve.value[p]), 1)
                        ]))), 128)),
                        t[49] || (t[49] = e("th", { class: "vt-th vt-th-r" }, "Days", -1)),
                        t[50] || (t[50] = e("th", { class: "vt-th vt-th-r" }, "Rate/Day", -1)),
                        t[51] || (t[51] = e("th", { class: "vt-th vt-th-r" }, "OT Hrs", -1)),
                        t[52] || (t[52] = e("th", { class: "vt-th vt-th-r" }, "OT Amt", -1)),
                        t[53] || (t[53] = e("th", { class: "vt-th vt-th-r" }, "SHA", -1)),
                        t[54] || (t[54] = e("th", { class: "vt-th vt-th-r" }, "Total", -1))
                      ])
                    ]),
                    e("tbody", null, [
                      ue.value ? (u(), v("tr", pa, [...t[55] || (t[55] = [
                        e("td", {
                          colspan: "19",
                          class: "vt-empty"
                        }, [
                          e("div", { class: "vt-empty-sub" }, "Loading workers…")
                        ], -1)
                      ])])) : f.value.length ? (u(!0), v(U, { key: 2 }, j(f.value, (n, p) => (u(), v("tr", {
                        key: n.employee
                      }, [
                        e("td", ba, l(p + 1), 1),
                        e("td", ka, l(n.id_no || "—"), 1),
                        e("td", ma, l(n.employee_name), 1),
                        e("td", _a, [
                          se(e("select", {
                            "onUpdate:modelValue": (k) => n.grade = k,
                            class: "inv-fi",
                            style: { width: "64px" },
                            disabled: !w.value.canEdit,
                            "aria-label": "Grade, " + n.employee_name
                          }, [
                            (u(!0), v(U, null, j(c(yt), (k) => (u(), v("option", {
                              key: k,
                              value: k
                            }, l(c(Ue)(k)), 9, ya))), 128))
                          ], 8, fa), [
                            [mt, n.grade]
                          ])
                        ]),
                        e("td", wa, [
                          se(e("input", {
                            "onUpdate:modelValue": (k) => n.area_of_work = k,
                            class: "inv-fi",
                            style: { width: "120px" },
                            disabled: !w.value.canEdit,
                            "aria-label": "Area of work, " + n.employee_name
                          }, null, 8, ga), [
                            [he, n.area_of_work]
                          ])
                        ]),
                        (u(!0), v(U, null, j(c(W), (k) => (u(), v("td", {
                          key: k.key,
                          class: "vt-td",
                          style: { "text-align": "center" }
                        }, [
                          e("input", {
                            type: "checkbox",
                            checked: !!Number(n[k.key]),
                            disabled: !w.value.canEdit,
                            "aria-label": "Present " + k.label + ", " + n.employee_name,
                            onChange: (at) => n[k.key] = at.target.checked ? 1 : 0
                          }, null, 40, Sa)
                        ]))), 128)),
                        e("td", Ca, l(c(Y)(n).days), 1),
                        e("td", Ta, [
                          e("input", {
                            type: "text",
                            inputmode: "decimal",
                            autocomplete: "off",
                            value: n.rate,
                            onInput: (k) => ve(k, n, "rate"),
                            class: "inv-fi",
                            style: { width: "80px", "text-align": "right" },
                            disabled: !w.value.canEdit,
                            "aria-label": "Rate per day, " + n.employee_name
                          }, null, 40, xa)
                        ]),
                        e("td", Aa, [
                          e("input", {
                            type: "text",
                            inputmode: "decimal",
                            autocomplete: "off",
                            value: n.ot_hours,
                            onInput: (k) => ve(k, n, "ot_hours"),
                            class: "inv-fi",
                            style: { width: "64px", "text-align": "right" },
                            disabled: !w.value.canEdit,
                            "aria-label": "OT hours, " + n.employee_name
                          }, null, 40, Da)
                        ]),
                        e("td", La, l(ze(c(Y)(n).otAmount)), 1),
                        e("td", Ea, [
                          e("input", {
                            type: "text",
                            inputmode: "decimal",
                            autocomplete: "off",
                            value: n.sha,
                            onInput: (k) => ve(k, n, "sha"),
                            class: "inv-fi",
                            style: { width: "72px", "text-align": "right" },
                            disabled: !w.value.canEdit,
                            "aria-label": "SHA, " + n.employee_name
                          }, null, 40, Ma)
                        ]),
                        e("td", Oa, [
                          e("b", null, l(c(D)(c(Y)(n).total)), 1),
                          c(ne)(n) ? (u(), v("div", Ha, l(c(ne)(n)), 1)) : _("", !0)
                        ])
                      ]))), 128)) : (u(), v("tr", ha, [...t[56] || (t[56] = [
                        e("td", {
                          colspan: "19",
                          class: "vt-empty"
                        }, [
                          e("div", { class: "vt-empty-sub" }, "There are no Active workers to list")
                        ], -1)
                      ])]))
                    ])
                  ])
                ]),
                e("div", Na, [
                  e("div", Ua, [
                    e("span", {
                      innerHTML: c(A)("info", 14)
                    }, null, 8, ja),
                    t[57] || (t[57] = g("Total = days x rate + OT amount - SHA, rounded to the shilling. OT amount = OT hours x rate / 8. A worker with no days and no OT is paid nothing.", -1))
                  ]),
                  f.value.length ? (u(), v("div", Ba, "Week: " + l(K.value.employees) + " workers paid, " + l(K.value.days) + " worker-days, wages KES " + l(c(D)(K.value.total)), 1)) : _("", !0)
                ])
              ], 2)
            ]),
            ee.value.length && (w.value.canSend || w.value.canApprove) ? (u(), v("div", Wa, [
              e("div", Fa, [
                e("span", {
                  innerHTML: c(A)("alert", 15)
                }, null, 8, Ra),
                g(l(w.value.canApprove ? "Can't approve yet" : "Can't send for approval yet"), 1)
              ]),
              e("ul", null, [
                (u(!0), v(U, null, j(ee.value, (n) => (u(), v("li", { key: n }, l(n), 1))), 128))
              ])
            ])) : _("", !0)
          ]),
          e("div", Ia, [
            e("div", Ka, l(o.name ? "Editing: " + o.name : "New wages sheet — unsaved"), 1),
            e("div", Pa, [
              Pe.value && d.$canDelete("admin") ? (u(), v("button", {
                key: 0,
                class: "add-btn-cancel at-del",
                disabled: T.value,
                onClick: tt
              }, "Delete", 8, $a)) : _("", !0),
              e("button", {
                class: "add-btn-cancel",
                disabled: !f.value.length,
                onClick: st
              }, [
                e("span", {
                  innerHTML: c(A)("print", 13)
                }, null, 8, za),
                t[58] || (t[58] = g(" Print", -1))
              ], 8, Va),
              e("button", {
                class: "add-btn-cancel",
                onClick: t[10] || (t[10] = (n) => R.value = !1)
              }, l(w.value.canEdit ? "Cancel" : "Close window"), 1),
              w.value.canEdit ? (u(), v("button", {
                key: 1,
                class: "add-btn-draft",
                disabled: T.value || !Z.value || !!I.value,
                onClick: t[11] || (t[11] = (n) => Ae(!1))
              }, [
                e("span", {
                  innerHTML: c(A)("save", 13)
                }, null, 8, Ya),
                g(" " + l(ce.value ? "Saving…" : "Save Draft"), 1)
              ], 8, Ga)) : _("", !0),
              w.value.canSend ? (u(), v("button", {
                key: 2,
                class: "add-btn-more",
                disabled: T.value || !Z.value || !!I.value || ee.value.length > 0,
                onClick: Je
              }, [
                e("span", {
                  innerHTML: c(A)("check", 13)
                }, null, 8, qa),
                t[59] || (t[59] = g(" Send for approval", -1))
              ], 8, Ja)) : _("", !0),
              w.value.canApprove ? (u(), v("button", {
                key: 3,
                class: "add-btn-more",
                disabled: T.value || ee.value.length > 0,
                onClick: qe
              }, "Approve as Director", 8, Qa)) : _("", !0),
              w.value.canSendBack ? (u(), v("button", {
                key: 4,
                class: "add-btn-cancel",
                disabled: T.value,
                onClick: Qe
              }, "Send back", 8, Xa)) : _("", !0),
              w.value.canCancel ? (u(), v("button", {
                key: 5,
                class: "add-btn-cancel at-cancel-sheet",
                disabled: T.value,
                onClick: Xe
              }, "Cancel sheet", 8, Za)) : _("", !0),
              w.value.canAmend ? (u(), v("button", {
                key: 6,
                class: "add-btn-more",
                disabled: T.value || !Z.value || !!q.value,
                title: q.value ? "Already amended as " + q.value : "",
                onClick: Ze
              }, "Amend", 8, en)) : _("", !0),
              w.value.canSubmit ? (u(), v("button", {
                key: 7,
                class: "add-btn-more",
                disabled: T.value || !Z.value,
                onClick: et
              }, "Submit", 8, tn)) : _("", !0)
            ])
          ])
        ], 2)
      ]))
    ]));
  }
}, rn = /* @__PURE__ */ nt(sn, [["__scopeId", "data-v-04ed2e15"]]);
export {
  rn as default
};
