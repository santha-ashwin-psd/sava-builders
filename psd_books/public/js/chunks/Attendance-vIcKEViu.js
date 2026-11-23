import { _ as ze, y as Ye, o as Je, c, a as e, u as p, i as T, w as P, B, F as H, r as U, d as g, t as r, b as y, D as qe, x as Qe, n as N, p as Xe, J as Ze, f as et, l as _e, h as C, g as j, A as le, a2 as tt, L as at, e as st, a3 as nt, K as ot, $ as lt, k as u, v as dt, Y as it, S as rt } from "./main-DlHOPnai.js";
import { b as fe } from "./format-BcJZDVG4.js";
import { o as be } from "./userNames-y3-EYbxD.js";
import { t as ye } from "./labourContractor-fn9JaBmq.js";
import { f as z, s as ut } from "./labourContract-D3MXcMdd.js";
const ue = "Draft", ee = "Pending approval", ce = "Approved", Ae = "Submitted", pe = "Sent back", F = [
  { key: "d_sat", label: "Sat" },
  { key: "d_sun", label: "Sun" },
  { key: "d_mon", label: "Mon" },
  { key: "d_tue", label: "Tue" },
  { key: "d_wed", label: "Wed" },
  { key: "d_thu", label: "Thu" },
  { key: "d_fri", label: "Fri" }
], ct = ["C", "SK"], ke = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], V = (a) => {
  const [s, o, d] = String(a).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(s, o - 1, d));
}, De = (a) => a.toISOString().slice(0, 10), ge = (a) => String(a).padStart(2, "0"), k = (a) => Number(a) || 0;
function te(a) {
  const s = V(a);
  return s.setUTCDate(s.getUTCDate() - (s.getUTCDay() + 1) % 7), De(s);
}
function xe(a) {
  const s = V(te(a));
  return s.setUTCDate(s.getUTCDate() + 6), De(s);
}
function X(a) {
  if (!a) return "";
  const s = V(te(a)), o = V(xe(a));
  return s.getUTCDate() + " " + ke[s.getUTCMonth()] + " to " + o.getUTCDate() + " " + ke[o.getUTCMonth()] + " " + o.getUTCFullYear();
}
function we(a) {
  const s = (o) => ge(o.getUTCDate()) + "/" + ge(o.getUTCMonth() + 1) + "/" + String(o.getUTCFullYear()).slice(2);
  return s(V(te(a))) + " TO " + s(V(xe(a)));
}
function pt(a) {
  const s = a % 100;
  return a + (s >= 11 && s <= 13 ? "TH" : { 1: "ST", 2: "ND", 3: "RD" }[a % 10] || "TH");
}
function Me(a) {
  const s = V(te(a));
  return F.map((o, d) => {
    const f = new Date(s);
    return f.setUTCDate(s.getUTCDate() + d), pt(f.getUTCDate());
  });
}
const Se = (a, s) => {
  const o = 10 ** s;
  return Math.sign(a) * Math.round(Math.abs(a) * o + 1e-9) / o;
};
function ve(a) {
  return F.reduce((s, o) => s + (Number(a[o.key]) ? 1 : 0), 0);
}
function I(a) {
  const s = ve(a), o = k(a.rate), d = k(a.sha), f = Se(k(a.ot_hours) * o / 8, 2), D = s === 0 && f === 0 ? 0 : Se(s * o + f - d, 0);
  return { days: s, otAmount: f, total: D };
}
function Le(a) {
  const s = { employees: 0, days: 0, otAmount: 0, sha: 0, total: 0 };
  for (const o of a) {
    const d = I(o);
    (d.days > 0 || k(o.ot_hours) > 0) && (s.employees++, s.sha += k(o.sha)), s.days += d.days, s.otAmount += d.otAmount, s.total += d.total;
  }
  return s;
}
function vt(a = [], s = []) {
  const o = new Map(s.map((h) => [h.employee, h])), d = ["grade", "area_of_work", "rate", "ot_hours", "sha", ...F.map((h) => h.key)], f = [], D = a.map((h) => {
    const m = o.get(h.employee);
    if (o.delete(h.employee), !m)
      return s.length && f.push(h.employee_name || h.employee), { ...h };
    const x = { ...h };
    for (const S of d) x[S] = m[S] === void 0 ? h[S] : m[S];
    return x;
  });
  for (const h of o.values()) ve(h) > 0 && D.push({ ...h });
  return D.sort((h, m) => String(h.employee_name || "").toLowerCase().localeCompare(String(m.employee_name || "").toLowerCase())), { rows: D, added: f };
}
const Te = (a) => a.employee_name || a.employee;
function Z(a) {
  if (k(a.rate) < 0) return "Rate can't be negative";
  if (k(a.ot_hours) < 0) return "OT hours can't be negative";
  if (k(a.sha) < 0) return "SHA can't be negative";
  const s = I(a);
  return (s.days > 0 || k(a.ot_hours) > 0) && k(a.rate) > 0 && s.total < 0 ? "SHA is more than the wage" : "";
}
function ht(a) {
  const s = [], o = a.filter((d) => ve(d) > 0 || k(d.ot_hours) > 0);
  o.length || s.push("Tick attendance for at least one employee.");
  for (const d of o) k(d.rate) <= 0 && s.push("Rate per day is missing for " + Te(d) + ".");
  for (const d of a) {
    const f = Z(d);
    f && s.push(Te(d) + ": " + f);
  }
  return s;
}
function mt(a, s = []) {
  const o = {};
  return a.week_date ? s.length || (o.week_date = "There are no Active employees to list") : o.week_date = "Pick a date in the week", o;
}
function Ee(a, s) {
  return s === "draft" ? a.status === ue || a.status === pe : s === "pending" ? a.status === ee : s === "approved" ? a.status === ce : s === "submitted" ? a.status === Ae : !0;
}
function _t(a) {
  const s = { all: a.length, draft: 0, pending: 0, approved: 0, submitted: 0 };
  for (const o of a) for (const d of ["draft", "pending", "approved", "submitted"]) Ee(o, d) && s[d]++;
  return s;
}
function ft(a, s) {
  const o = String(s || "").trim().toLowerCase();
  return o ? [a.name, a.status, X(a.week_start)].some((d) => String(d || "").toLowerCase().includes(o)) : !0;
}
function de(a, s) {
  const o = a === ue || a === pe;
  return { canEdit: o, canSend: o, canApprove: a === ee && !!s, canSendBack: a === ee && !!s, canSubmit: a === ce };
}
function bt(a) {
  return a.status === ue && !a.raised_by;
}
function yt(a, s, o) {
  return {
    doctype: "Labour Attendance Sheet",
    ...a.name ? { name: a.name } : {},
    company: o,
    week_start: a.week_date,
    lines: s.map((d) => ({
      employee: d.employee,
      grade: d.grade || "C",
      area_of_work: d.area_of_work || "",
      ...Object.fromEntries(F.map((f) => [f.key, Number(d[f.key]) ? 1 : 0])),
      rate: k(d.rate),
      ot_hours: k(d.ot_hours),
      sha: k(d.sha)
    }))
  };
}
const $ = (a) => String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Y = (a) => Math.round(k(a)).toLocaleString("en-US"), ie = (a) => (Math.round(k(a) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
function kt(a, s) {
  const o = Me(a), d = Le(s), f = '<tr><th rowspan="2">S.NO</th><th rowspan="2">NAMES</th><th rowspan="2">ID NO.</th><th rowspan="2">Grade</th><th rowspan="2">AREA OF WORK</th>' + o.map((m) => "<th>" + m + "</th>").join("") + '<th rowspan="2">Days</th><th rowspan="2">Rate</th><th rowspan="2">OT</th><th rowspan="2">OT amount</th><th rowspan="2">SHA</th><th rowspan="2">Total</th><th rowspan="2" class="sg">SIGNATURE</th><th rowspan="2" class="sg">ID NO</th></tr><tr>' + F.map((m) => "<th>" + m.label + "</th>").join("") + "</tr>", D = s.map((m, x) => {
    const S = I(m);
    return "<tr><td>" + (x + 1) + '</td><td class="l">' + $(m.employee_name) + "</td><td>" + $(m.id_no) + "</td><td>" + $(m.grade) + "</td><td>" + $(m.area_of_work) + "</td>" + F.map((L) => "<td>" + (Number(m[L.key]) ? 1 : 0) + "</td>").join("") + "<td>" + S.days + "</td><td>" + Y(m.rate) + "</td><td>" + (k(m.ot_hours) ? ie(m.ot_hours) : "") + "</td><td>" + ie(S.otAmount) + "</td><td>" + Y(m.sha) + "</td><td><b>" + Y(S.total) + "</b></td><td></td><td></td></tr>";
  }).join(""), h = '<tr class="tt"><td colspan="12" class="l"><b>Total (' + d.employees + " employees)</b></td><td><b>" + d.days + "</b></td><td></td><td></td><td><b>" + ie(d.otAmount) + "</b></td><td><b>" + Y(d.sha) + "</b></td><td><b>" + Y(d.total) + "</b></td><td></td><td></td></tr>";
  return '<!doctype html><html><head><meta charset="utf-8"><title>Weekly wages payment sheet ' + $(we(a)) + "</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Arial,Helvetica,sans-serif;font-size:11px;margin:0}h1{font-size:13px;text-align:center;text-decoration:underline;margin:0 0 8px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:3px 4px;text-align:center}td.l{text-align:left}th.sg{min-width:70px}tr.tt td{background:#f3f3f3}</style></head><body><h1>WEEKLY WAGES PAYMENT SHEET " + $(we(a)) + "</h1><table>" + f + D + h + "</table></body></html>";
}
const gt = { class: "list-page" }, wt = { class: "sales-toolbar" }, St = { class: "sales-search" }, Tt = ["innerHTML"], Ct = { class: "sales-pills" }, At = ["onClick"], Dt = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, xt = ["innerHTML"], Mt = ["disabled", "title"], Lt = ["innerHTML"], Et = { class: "inv-table-wrap" }, Ot = { class: "inv-table" }, Ht = { key: 1 }, Ut = {
  colspan: "4",
  class: "vt-empty"
}, Nt = { class: "vt-empty-title" }, jt = { class: "vt-empty-sub" }, Ft = ["onClick"], Rt = { class: "vt-td vt-td-mono" }, Wt = { class: "vt-td vt-td-secondary" }, Pt = { class: "vt-td vt-td-r" }, Vt = { class: "vt-td" }, Bt = {
  key: 0,
  class: "vt-footer"
}, $t = { class: "inv-dh" }, It = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, Kt = { class: "inv-dh-title" }, Gt = { class: "at-badge" }, zt = ["innerHTML"], Yt = { class: "inv-dbody" }, Jt = {
  key: 0,
  class: "ct-errbox"
}, qt = { class: "ct-errbox-title" }, Qt = ["innerHTML"], Xt = {
  key: 1,
  class: "ct-note"
}, Zt = {
  key: 2,
  class: "ct-note ct-note-bad"
}, ea = {
  key: 3,
  class: "ct-note"
}, ta = {
  key: 4,
  class: "ct-note ct-note-ok"
}, aa = {
  key: 5,
  class: "ct-note ct-note-ok"
}, sa = { class: "add-card at-card-first" }, na = { class: "add-card-title" }, oa = { class: "add-card-title-icon" }, la = ["innerHTML"], da = { class: "inv-fg inv-fg3" }, ia = ["disabled"], ra = {
  key: 0,
  class: "ct-err"
}, ua = ["value"], ca = { class: "at-period" }, pa = ["innerHTML"], va = { class: "at-period-val" }, ha = { class: "add-card" }, ma = { class: "add-card-title" }, _a = { class: "add-card-title-icon" }, fa = ["innerHTML"], ba = { class: "at-count" }, ya = {
  class: "at-grid",
  style: { "overflow-x": "auto" }
}, ka = {
  class: "inv-table",
  style: { "font-size": "12px", "min-width": "1240px" }
}, ga = { class: "ct-dd" }, wa = { key: 0 }, Sa = { key: 1 }, Ta = { class: "vt-td" }, Ca = { class: "vt-td vt-td-mono" }, Aa = { class: "vt-td" }, Da = { class: "vt-td" }, xa = ["onUpdate:modelValue", "disabled", "aria-label"], Ma = ["value"], La = { class: "vt-td" }, Ea = ["onUpdate:modelValue", "disabled", "aria-label"], Oa = ["checked", "disabled", "aria-label", "onChange"], Ha = { class: "vt-td vt-td-r" }, Ua = { class: "vt-td vt-td-r" }, Na = ["onUpdate:modelValue", "disabled", "aria-label"], ja = { class: "vt-td vt-td-r" }, Fa = ["onUpdate:modelValue", "disabled", "aria-label"], Ra = { class: "vt-td vt-td-r" }, Wa = { class: "vt-td vt-td-r" }, Pa = ["onUpdate:modelValue", "disabled", "aria-label"], Va = { class: "vt-td vt-td-r" }, Ba = {
  key: 0,
  class: "ct-err"
}, $a = { class: "at-foot" }, Ia = { class: "ct-info" }, Ka = ["innerHTML"], Ga = {
  key: 0,
  class: "at-totals"
}, za = {
  key: 6,
  class: "ct-errbox"
}, Ya = { class: "ct-errbox-title" }, Ja = ["innerHTML"], qa = { class: "inv-dfooter" }, Qa = { class: "add-footer-status" }, Xa = { class: "add-footer-actions" }, Za = ["disabled"], es = ["disabled"], ts = ["innerHTML"], as = ["disabled"], ss = ["innerHTML"], ns = ["disabled"], os = ["innerHTML"], ls = ["disabled"], ds = ["disabled"], is = ["disabled"], re = "Labour Attendance Sheet", Ce = "psd_books.api.labour_attendance.", rs = {
  __name: "Attendance",
  setup(a) {
    const { toast: s } = Ye(), { confirm: o } = nt(), { prompt: d } = lt(), { canEdit: f } = rt(), D = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "submitted", l: "Submitted" }], h = C([]), m = C(!1), x = C(!0), S = C(""), L = C("all"), E = C(!1), ae = C(!1), A = C(!1), b = C([]), se = C(!1), R = C(""), K = C(""), O = le({ week: !1, sheet: !1 }), M = le({}), l = le({}), ne = j(() => f("admin")), Oe = () => ({ name: "", status: "Draft", week_date: ye(), raised_by: "", approved_by: "", approved_on: "", submitted_by: "", submitted_on: "", rejection_reason: "" });
    function he(i) {
      Object.keys(M).forEach((t) => delete M[t]), Object.keys(l).forEach((t) => delete l[t]), Object.assign(l, Oe(), i || {}), b.value = [], R.value = "", K.value = "";
    }
    const He = j(() => _t(h.value)), oe = j(() => h.value.filter((i) => Ee(i, L.value) && ft(i, S.value))), w = j(() => de(l.status, m.value)), Ue = j(() => !!l.name && bt(l)), W = j(() => Le(b.value)), J = j(() => ht(b.value)), Ne = j(() => Me(l.week_date || ye())), je = (i) => (Math.round((Number(i) || 0) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
    function Fe(i) {
      return M[i] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function G() {
      x.value = !0;
      try {
        const [i, t] = await Promise.all([
          et(re, { fields: ["name", "status", "week_start", "week_end", "total_amount", "raised_by"], order: "week_start desc, modified desc", limit: 1e3 }),
          _e("psd_books.api.labour_contract.my_permissions", {})
        ]);
        h.value = i || [], m.value = !!(t && t.can_approve);
      } catch (i) {
        s("Failed to load wages sheets: " + (i.message || i), "error");
      } finally {
        x.value = !1;
      }
    }
    async function q(i) {
      if (K.value = "", R.value = "", !l.week_date) {
        b.value = [];
        return;
      }
      se.value = !0;
      try {
        const t = await _e(Ce + "preview", { week_date: l.week_date, name: l.name || null });
        R.value = t.existing_sheet || "";
        const n = vt(t.rows || [], i === void 0 ? b.value : i);
        b.value = n.rows, n.added.length && (K.value = "New employees added to this sheet: " + n.added.join(", ") + ".");
      } catch (t) {
        b.value = [], s(t.message || "Could not load employees", "error");
      } finally {
        se.value = !1;
      }
    }
    function Re() {
      he(), E.value = !0, q([]);
    }
    async function We(i) {
      he({ ...i, week_date: i.week_start }), E.value = !0;
      try {
        const t = await it(re, i.name);
        Object.assign(l, { status: t.status, rejection_reason: t.rejection_reason, approved_by: t.approved_by, approved_on: t.approved_on, raised_by: t.raised_by, submitted_by: t.submitted_by, submitted_on: t.submitted_on }), de(t.status, !1).canEdit ? await q(t.lines || []) : b.value = (t.lines || []).map((n) => ({ ...n }));
      } catch (t) {
        s(t.message || "Could not open sheet", "error");
      }
    }
    async function me(i) {
      const t = mt(l, b.value);
      if (Object.keys(M).forEach((v) => delete M[v]), Object.assign(M, t), Object.keys(t).length)
        return s(Object.values(t)[0], "error"), "";
      const n = b.value.map((v) => Z(v)).find(Boolean);
      if (n)
        return s(n, "error"), "";
      ae.value = !0;
      try {
        const v = await at(yt(l, b.value, await st())), _ = v && v.name || l.name;
        return i || s(l.name ? "Sheet updated" : "Sheet saved"), l.name = _, await G(), _;
      } catch (v) {
        return s(v.message || "Could not save sheet", "error"), "";
      } finally {
        ae.value = !1;
      }
    }
    async function Q(i, t, n) {
      A.value = !0;
      try {
        const v = await ot(Ce + i, t);
        s(n), await G(), v && v.name && (Object.assign(l, { status: v.status, raised_by: v.raised_by, approved_by: v.approved_by, approved_on: v.approved_on, submitted_by: v.submitted_by, submitted_on: v.submitted_on, rejection_reason: v.rejection_reason }), de(v.status, !1).canEdit ? await q(v.lines || []) : b.value = (v.lines || []).map((_) => ({ ..._ })));
      } catch (v) {
        s(v.message || "Action failed", "error");
      } finally {
        A.value = !1;
      }
    }
    async function Pe() {
      if (!await o({ title: "Send for approval?", body: "Send this wages sheet to the Director for approval? Wages: KES " + z(W.value.total) + " for " + W.value.employees + " employees. The sheet is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const t = await me(!0);
      t && await Q("send_for_approval", { name: t }, "Sent for Director approval");
    }
    async function Ve() {
      await o({ title: "Approve wages sheet?", body: "Approve " + l.name + "? Wages: KES " + z(W.value.total) + " for " + W.value.employees + " employees. Submit it afterwards to finalise.", okLabel: "Approve", okStyle: "primary" }) && await Q("approve_sheet", { name: l.name }, "Sheet approved");
    }
    async function Be() {
      const i = await d({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !i || !i.trim() || await Q("send_back_sheet", { name: l.name, reason: i.trim() }, "Sent back");
    }
    async function $e() {
      await o({ title: "Submit wages sheet?", body: "Submit " + l.name + "? A submitted sheet is final and can't be edited." }) && await Q("submit_sheet", { name: l.name }, "Sheet submitted");
    }
    async function Ie() {
      if (await o({ title: "Delete sheet?", body: "Delete " + l.name + "? Only a sheet never sent for approval can be deleted." })) {
        A.value = !0;
        try {
          await tt(re, l.name), s("Sheet deleted"), E.value = !1, await G();
        } catch (t) {
          s(t.message || "Could not delete sheet", "error");
        } finally {
          A.value = !1;
        }
      }
    }
    function Ke() {
      const i = window.open("", "_blank");
      if (!i) {
        s("Allow pop-ups to print the sheet", "error");
        return;
      }
      i.document.write(kt(l.week_date, b.value)), i.document.close(), i.focus(), i.print();
    }
    return Je(G), (i, t) => (u(), c("div", gt, [
      e("div", wt, [
        e("div", St, [
          e("span", {
            innerHTML: p(T)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Tt),
          P(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (n) => S.value = n),
            placeholder: "Search wages sheets…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [B, S.value]
          ])
        ]),
        e("div", Ct, [
          (u(), c(H, null, U(D, (n) => e("button", {
            key: n.k,
            class: N(["sales-pill", { active: L.value === n.k }]),
            onClick: (v) => L.value = n.k
          }, [
            g(r(n.l) + " ", 1),
            e("span", {
              class: N(["sales-pill-count", L.value === n.k ? "" : "zb-pc-muted"])
            }, r(He.value[n.k]), 3)
          ], 10, At)), 64))
        ]),
        e("div", Dt, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: G,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: p(T)("refresh", 13)
            }, null, 8, xt),
            t[9] || (t[9] = g(" Refresh", -1))
          ]),
          e("button", {
            class: "sales-btn-primary",
            disabled: !i.$canCreate("admin"),
            title: i.$canCreate("admin") ? "" : "Not permitted",
            onClick: Re
          }, [
            e("span", {
              innerHTML: p(T)("plus", 13)
            }, null, 8, Lt),
            t[10] || (t[10] = g(" New Wages Sheet", -1))
          ], 8, Mt)
        ])
      ]),
      e("div", Et, [
        e("table", Ot, [
          t[13] || (t[13] = e("thead", null, [
            e("tr", null, [
              e("th", { class: "vt-th" }, "Sheet"),
              e("th", { class: "vt-th" }, "Week (Saturday to Friday)"),
              e("th", { class: "vt-th vt-th-r" }, "Total Wages (KES)"),
              e("th", { class: "vt-th" }, "Status")
            ])
          ], -1)),
          e("tbody", null, [
            x.value ? (u(), c(H, { key: 0 }, U(6, (n) => e("tr", {
              key: n,
              class: "vt-row-shimmer"
            }, [...t[11] || (t[11] = [
              e("td", { colspan: "4" }, [
                e("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : oe.value.length ? (u(!0), c(H, { key: 2 }, U(oe.value, (n) => (u(), c("tr", {
              key: n.name,
              class: "inv-row",
              onClick: (v) => We(n)
            }, [
              e("td", Rt, r(n.name), 1),
              e("td", Wt, r(p(X)(n.week_start)), 1),
              e("td", Pt, r(p(z)(n.total_amount)), 1),
              e("td", Vt, [
                e("span", {
                  class: N(["vt-badge", "vt-badge-" + p(ut)(n.status)])
                }, [
                  t[12] || (t[12] = e("span", { class: "vt-badge-dot" }, null, -1)),
                  g(r(n.status), 1)
                ], 2)
              ])
            ], 8, Ft))), 128)) : (u(), c("tr", Ht, [
              e("td", Ut, [
                e("div", Nt, r(S.value || L.value !== "all" ? "No results found" : "No wages sheets yet"), 1),
                e("div", jt, r(S.value || L.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly wages sheet"), 1)
              ])
            ]))
          ])
        ]),
        !x.value && h.value.length ? (u(), c("div", Bt, [
          t[14] || (t[14] = g("Showing ", -1)),
          e("strong", null, r(oe.value.length), 1),
          t[15] || (t[15] = g(" of ", -1)),
          e("strong", null, r(h.value.length), 1),
          t[16] || (t[16] = g(" sheets", -1))
        ])) : y("", !0)
      ]),
      t[41] || (t[41] = e("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "One sheet per week for all Active employees, Saturday to Friday. A Director approves each sheet; once sent for approval it is locked, and a submitted sheet is final.", -1)),
      (u(), qe(Ze, { to: "body" }, [
        E.value ? (u(), c("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: t[1] || (t[1] = Qe((n) => E.value = !1, ["self"]))
        })) : y("", !0),
        e("div", {
          class: N(["inv-drawer-panel at-drawer", { open: E.value }])
        }, [
          e("div", $t, [
            e("div", It, [
              e("div", Kt, r(l.name || "New Wages Sheet"), 1),
              e("span", Gt, r(l.name ? l.status : "Draft"), 1)
            ]),
            e("button", {
              class: "inv-dclose",
              onClick: t[2] || (t[2] = (n) => E.value = !1)
            }, [
              e("span", {
                innerHTML: p(T)("x", 16)
              }, null, 8, zt)
            ])
          ]),
          e("div", Yt, [
            R.value ? (u(), c("div", Jt, [
              e("div", qt, [
                e("span", {
                  innerHTML: p(T)("alert", 15)
                }, null, 8, Qt),
                t[17] || (t[17] = g("There is already a sheet for this week", -1))
              ]),
              e("ul", null, [
                e("li", null, "Sheet " + r(R.value) + " covers this week. Open it from the list instead.", 1)
              ])
            ])) : y("", !0),
            K.value ? (u(), c("div", Xt, r(K.value), 1)) : y("", !0),
            l.status === p(pe) && l.rejection_reason ? (u(), c("div", Zt, "Sent back: " + r(l.rejection_reason), 1)) : y("", !0),
            l.status === p(ee) ? (u(), c("div", ea, "Waiting for Director approval. The sheet is locked.")) : y("", !0),
            l.status === p(ce) ? (u(), c("div", ta, "Approved by " + r(p(be)(l.approved_by)) + " on " + r(p(fe)(l.approved_on)) + ". Submit to finalise.", 1)) : y("", !0),
            l.status === p(Ae) ? (u(), c("div", aa, "Submitted by " + r(p(be)(l.submitted_by)) + " on " + r(p(fe)(l.submitted_on)) + ". This week's wages sheet is final.", 1)) : y("", !0),
            e("div", sa, [
              e("div", {
                class: "add-card-header",
                onClick: t[3] || (t[3] = (n) => O.week = !O.week)
              }, [
                e("div", na, [
                  e("span", oa, [
                    e("span", {
                      innerHTML: p(T)("calendar", 16)
                    }, null, 8, la)
                  ]),
                  t[18] || (t[18] = g(" Week ", -1))
                ]),
                e("span", {
                  class: N(["add-card-chevron", { collapsed: O.week }])
                }, [...t[19] || (t[19] = [
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
                class: N(["add-card-body", { collapsed: O.week }])
              }, [
                e("div", da, [
                  e("div", null, [
                    t[20] || (t[20] = e("label", { class: "inv-lbl" }, [
                      g("Pick any date in the week "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    P(e("input", {
                      type: "date",
                      "onUpdate:modelValue": t[4] || (t[4] = (n) => l.week_date = n),
                      class: "inv-fi",
                      style: Xe(Fe("week_date")),
                      disabled: !w.value.canEdit || !!l.name,
                      onChange: t[5] || (t[5] = (n) => {
                        delete M.week_date, q([]);
                      })
                    }, null, 44, ia), [
                      [B, l.week_date]
                    ]),
                    M.week_date ? (u(), c("div", ra, r(M.week_date), 1)) : y("", !0)
                  ]),
                  e("div", null, [
                    t[21] || (t[21] = e("label", { class: "inv-lbl" }, "Week (Saturday to Friday)", -1)),
                    e("input", {
                      class: "inv-fi",
                      value: p(X)(l.week_date),
                      disabled: ""
                    }, null, 8, ua)
                  ]),
                  e("div", ca, [
                    e("span", {
                      class: "at-period-icon",
                      innerHTML: p(T)("calendar", 16)
                    }, null, 8, pa),
                    e("div", null, [
                      t[22] || (t[22] = e("div", { class: "at-period-lbl" }, "Week Period", -1)),
                      e("div", va, r(p(X)(l.week_date)), 1)
                    ])
                  ])
                ])
              ], 2)
            ]),
            e("div", ha, [
              e("div", {
                class: "add-card-header",
                onClick: t[6] || (t[6] = (n) => O.sheet = !O.sheet)
              }, [
                e("div", ma, [
                  e("span", _a, [
                    e("span", {
                      innerHTML: p(T)("check", 16)
                    }, null, 8, fa)
                  ]),
                  t[23] || (t[23] = g(" Attendance ", -1)),
                  e("span", ba, r(b.value.length) + " employee" + r(b.value.length !== 1 ? "s" : ""), 1)
                ]),
                e("span", {
                  class: N(["add-card-chevron", { collapsed: O.sheet }])
                }, [...t[24] || (t[24] = [
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
                class: N(["add-card-body", { collapsed: O.sheet }])
              }, [
                e("div", ya, [
                  e("table", ka, [
                    e("thead", null, [
                      e("tr", null, [
                        t[25] || (t[25] = e("th", { class: "vt-th" }, "#", -1)),
                        t[26] || (t[26] = e("th", { class: "vt-th" }, "ID No.", -1)),
                        t[27] || (t[27] = e("th", { class: "vt-th" }, "Name", -1)),
                        t[28] || (t[28] = e("th", { class: "vt-th" }, "Grade", -1)),
                        t[29] || (t[29] = e("th", { class: "vt-th" }, "Area of Work", -1)),
                        (u(!0), c(H, null, U(p(F), (n, v) => (u(), c("th", {
                          key: n.key,
                          class: "vt-th",
                          style: { "text-align": "center" }
                        }, [
                          g(r(n.label), 1),
                          e("div", ga, r(Ne.value[v]), 1)
                        ]))), 128)),
                        t[30] || (t[30] = e("th", { class: "vt-th vt-th-r" }, "Days", -1)),
                        t[31] || (t[31] = e("th", { class: "vt-th vt-th-r" }, "Rate/Day", -1)),
                        t[32] || (t[32] = e("th", { class: "vt-th vt-th-r" }, "OT Hrs", -1)),
                        t[33] || (t[33] = e("th", { class: "vt-th vt-th-r" }, "OT Amt", -1)),
                        t[34] || (t[34] = e("th", { class: "vt-th vt-th-r" }, "SHA", -1)),
                        t[35] || (t[35] = e("th", { class: "vt-th vt-th-r" }, "Total", -1))
                      ])
                    ]),
                    e("tbody", null, [
                      se.value ? (u(), c("tr", wa, [...t[36] || (t[36] = [
                        e("td", {
                          colspan: "19",
                          class: "vt-empty"
                        }, [
                          e("div", { class: "vt-empty-sub" }, "Loading employees…")
                        ], -1)
                      ])])) : b.value.length ? (u(!0), c(H, { key: 2 }, U(b.value, (n, v) => (u(), c("tr", {
                        key: n.employee
                      }, [
                        e("td", Ta, r(v + 1), 1),
                        e("td", Ca, r(n.id_no || "—"), 1),
                        e("td", Aa, r(n.employee_name), 1),
                        e("td", Da, [
                          P(e("select", {
                            "onUpdate:modelValue": (_) => n.grade = _,
                            class: "inv-fi",
                            style: { width: "64px" },
                            disabled: !w.value.canEdit,
                            "aria-label": "Grade, " + n.employee_name
                          }, [
                            (u(!0), c(H, null, U(p(ct), (_) => (u(), c("option", {
                              key: _,
                              value: _
                            }, r(_), 9, Ma))), 128))
                          ], 8, xa), [
                            [dt, n.grade]
                          ])
                        ]),
                        e("td", La, [
                          P(e("input", {
                            "onUpdate:modelValue": (_) => n.area_of_work = _,
                            class: "inv-fi",
                            style: { width: "120px" },
                            disabled: !w.value.canEdit,
                            "aria-label": "Area of work, " + n.employee_name
                          }, null, 8, Ea), [
                            [B, n.area_of_work]
                          ])
                        ]),
                        (u(!0), c(H, null, U(p(F), (_) => (u(), c("td", {
                          key: _.key,
                          class: "vt-td",
                          style: { "text-align": "center" }
                        }, [
                          e("input", {
                            type: "checkbox",
                            checked: !!Number(n[_.key]),
                            disabled: !w.value.canEdit,
                            "aria-label": "Present " + _.label + ", " + n.employee_name,
                            onChange: (Ge) => n[_.key] = Ge.target.checked ? 1 : 0
                          }, null, 40, Oa)
                        ]))), 128)),
                        e("td", Ha, r(p(I)(n).days), 1),
                        e("td", Ua, [
                          P(e("input", {
                            type: "number",
                            min: "0",
                            "onUpdate:modelValue": (_) => n.rate = _,
                            class: "inv-fi",
                            style: { width: "80px", "text-align": "right" },
                            disabled: !w.value.canEdit,
                            "aria-label": "Rate per day, " + n.employee_name
                          }, null, 8, Na), [
                            [
                              B,
                              n.rate,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        e("td", ja, [
                          P(e("input", {
                            type: "number",
                            min: "0",
                            step: "0.5",
                            "onUpdate:modelValue": (_) => n.ot_hours = _,
                            class: "inv-fi",
                            style: { width: "64px", "text-align": "right" },
                            disabled: !w.value.canEdit,
                            "aria-label": "OT hours, " + n.employee_name
                          }, null, 8, Fa), [
                            [
                              B,
                              n.ot_hours,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        e("td", Ra, r(je(p(I)(n).otAmount)), 1),
                        e("td", Wa, [
                          P(e("input", {
                            type: "number",
                            min: "0",
                            "onUpdate:modelValue": (_) => n.sha = _,
                            class: "inv-fi",
                            style: { width: "72px", "text-align": "right" },
                            disabled: !w.value.canEdit,
                            "aria-label": "SHA, " + n.employee_name
                          }, null, 8, Pa), [
                            [
                              B,
                              n.sha,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        e("td", Va, [
                          e("b", null, r(p(z)(p(I)(n).total)), 1),
                          p(Z)(n) ? (u(), c("div", Ba, r(p(Z)(n)), 1)) : y("", !0)
                        ])
                      ]))), 128)) : (u(), c("tr", Sa, [...t[37] || (t[37] = [
                        e("td", {
                          colspan: "19",
                          class: "vt-empty"
                        }, [
                          e("div", { class: "vt-empty-sub" }, "There are no Active employees to list")
                        ], -1)
                      ])]))
                    ])
                  ])
                ]),
                e("div", $a, [
                  e("div", Ia, [
                    e("span", {
                      innerHTML: p(T)("info", 14)
                    }, null, 8, Ka),
                    t[38] || (t[38] = g("Total = days x rate + OT amount - SHA, rounded to the shilling. OT amount = OT hours x rate / 8. An employee with no days and no OT is paid nothing.", -1))
                  ]),
                  b.value.length ? (u(), c("div", Ga, "Week: " + r(W.value.employees) + " employees paid, " + r(W.value.days) + " employee-days, wages KES " + r(p(z)(W.value.total)), 1)) : y("", !0)
                ])
              ], 2)
            ]),
            J.value.length && (w.value.canSend || w.value.canApprove) ? (u(), c("div", za, [
              e("div", Ya, [
                e("span", {
                  innerHTML: p(T)("alert", 15)
                }, null, 8, Ja),
                g(r(w.value.canApprove ? "Can't approve yet" : "Can't send for approval yet"), 1)
              ]),
              e("ul", null, [
                (u(!0), c(H, null, U(J.value, (n) => (u(), c("li", { key: n }, r(n), 1))), 128))
              ])
            ])) : y("", !0)
          ]),
          e("div", qa, [
            e("div", Qa, r(l.name ? "Editing: " + l.name : "New wages sheet — unsaved"), 1),
            e("div", Xa, [
              Ue.value && i.$canDelete("admin") ? (u(), c("button", {
                key: 0,
                class: "add-btn-cancel at-del",
                disabled: A.value,
                onClick: Ie
              }, "Delete", 8, Za)) : y("", !0),
              e("button", {
                class: "add-btn-cancel",
                disabled: !b.value.length,
                onClick: Ke
              }, [
                e("span", {
                  innerHTML: p(T)("print", 13)
                }, null, 8, ts),
                t[39] || (t[39] = g(" Print", -1))
              ], 8, es),
              e("button", {
                class: "add-btn-cancel",
                onClick: t[7] || (t[7] = (n) => E.value = !1)
              }, r(w.value.canEdit ? "Cancel" : "Close window"), 1),
              w.value.canEdit ? (u(), c("button", {
                key: 1,
                class: "add-btn-draft",
                disabled: A.value || !ne.value || !!R.value,
                onClick: t[8] || (t[8] = (n) => me(!1))
              }, [
                e("span", {
                  innerHTML: p(T)("save", 13)
                }, null, 8, ss),
                g(" " + r(ae.value ? "Saving…" : "Save Draft"), 1)
              ], 8, as)) : y("", !0),
              w.value.canSend ? (u(), c("button", {
                key: 2,
                class: "add-btn-more",
                disabled: A.value || !ne.value || !!R.value || J.value.length > 0,
                onClick: Pe
              }, [
                e("span", {
                  innerHTML: p(T)("check", 13)
                }, null, 8, os),
                t[40] || (t[40] = g(" Send for approval", -1))
              ], 8, ns)) : y("", !0),
              w.value.canApprove ? (u(), c("button", {
                key: 3,
                class: "add-btn-more",
                disabled: A.value || J.value.length > 0,
                onClick: Ve
              }, "Approve as Director", 8, ls)) : y("", !0),
              w.value.canSendBack ? (u(), c("button", {
                key: 4,
                class: "add-btn-cancel",
                disabled: A.value,
                onClick: Be
              }, "Send back", 8, ds)) : y("", !0),
              w.value.canSubmit ? (u(), c("button", {
                key: 5,
                class: "add-btn-more",
                disabled: A.value || !ne.value,
                onClick: $e
              }, "Submit", 8, is)) : y("", !0)
            ])
          ])
        ], 2)
      ]))
    ]));
  }
}, ms = /* @__PURE__ */ ze(rs, [["__scopeId", "data-v-b60e1962"]]);
export {
  ms as default
};
