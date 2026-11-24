import { _ as tt, y as at, o as nt, c as u, a as e, u as v, i as B, w as _e, B as Ae, F as H, r as U, v as st, d as S, t as i, X as ot, b as k, D as lt, x as it, p as rt, J as dt, f as V, l as Z, h as f, g as x, A as Ee, a2 as ct, L as ut, e as vt, K as Le, a3 as pt, $ as kt, Y as bt, k as c, n as me, S as _t } from "./main-DyN58TIP.js";
import { b as ee } from "./format-BcJZDVG4.js";
import { o as te } from "./userNames-C3pKi_6v.js";
import { t as F, i as Pe } from "./labourContractor-CwTlS8Kw.js";
import { f as h, s as mt } from "./labourContract-UoUa3DLZ.js";
const we = "Draft", ne = "Pending approval", z = "Approved", oe = "Sent back", le = "Paid", K = "Cancelled", De = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], se = (n) => {
  const [s, d, p] = String(n).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(s, d - 1, p));
}, Be = (n) => n.toISOString().slice(0, 10);
function ft(n, s = F()) {
  return !!n && $(n) < $(s);
}
function yt(n, s, d, p = F()) {
  return !!d && ft(s, p) && (Number(n.paid_till_now) || 0) > 5e-3;
}
function $(n) {
  const s = se(n);
  return s.setUTCDate(s.getUTCDate() - (s.getUTCDay() + 6) % 7), Be(s);
}
function ht(n) {
  const s = se($(n));
  return s.setUTCDate(s.getUTCDate() + 6), Be(s);
}
function he(n) {
  if (!n) return "";
  const s = se($(n)), d = se(ht(n));
  return s.getUTCDate() + " " + De[s.getUTCMonth()] + " to " + d.getUTCDate() + " " + De[d.getUTCMonth()] + " " + d.getUTCFullYear();
}
function ge(n, s) {
  return s === "draft" ? n.status === we || n.status === oe : s === "pending" ? n.status === ne : s === "approved" ? n.status === z : s === "paid" ? n.status === le : s === "cancelled" ? n.status === K : !0;
}
function wt(n) {
  const s = { all: n.length, draft: 0, pending: 0, approved: 0, paid: 0, cancelled: 0 };
  for (const d of n) for (const p of ["draft", "pending", "approved", "paid", "cancelled"]) ge(d, p) && s[p]++;
  return s;
}
function gt(n, s, d = {}, p = {}) {
  const _ = String(s || "").trim().toLowerCase();
  if (!_) return !0;
  const b = p[n.name] || {}, m = (b.contracts || []).join(" "), j = (b.projects || []).map((w) => w + " " + (d[w] || "")).join(" ");
  return [n.name, n.status, n.project, d[n.project], he(n.week_start), m, j].some((w) => String(w || "").toLowerCase().includes(_));
}
function Ct(n = []) {
  return n.length ? n.slice(0, 2).join(", ") + (n.length > 2 ? " +" + (n.length - 2) : "") : "—";
}
function St(n, s = {}, d = {}) {
  const p = s && s.projects && s.projects.length ? s.projects : n && n.project ? [n.project] : [];
  if (!p.length) return "—";
  const _ = p.map((b) => d[b] || b);
  return _.slice(0, 2).join(", ") + (_.length > 2 ? " +" + (_.length - 2) : "");
}
function xt(n) {
  return (Number(n.balance) || 0) <= 5e-3 && !(Number(n.amount_to_pay) > 0);
}
function jt(n = []) {
  return n.filter((s) => !xt(s));
}
function Tt(n = []) {
  return n.filter((s) => Number(s.amount_to_pay) > 0);
}
function At(n = [], s = []) {
  const d = new Map(s.map((_) => [_.contract, Number(_.amount_to_pay) || 0]));
  return { rows: n.map((_) => {
    const b = d.get(_.contract);
    return d.delete(_.contract), { ..._, amount_to_pay: b && !_.paid_this_week ? b : "" };
  }), dropped: [...d].filter(([, _]) => _ > 0).map(([_]) => _) };
}
function Et(n) {
  return String(n ?? "").replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
}
function Lt(n) {
  return n.reduce((s, d) => s + (Number(d.amount_to_pay) || 0), 0);
}
function ae(n) {
  const s = Number(n.amount_to_pay) || 0;
  return s < 0 ? "Amount can't be negative" : s > (Number(n.balance) || 0) + 5e-3 ? "Above the balance of " + Math.round(Number(n.balance) || 0).toLocaleString("en-US") : "";
}
function Dt(n, s = [], d = F()) {
  const p = [], _ = n.filter((b) => Number(b.amount_to_pay) > 0);
  _.length || p.push("Enter an amount to pay on at least one contract.");
  for (const b of _) {
    const m = s.find((w) => w.name === b.contractor), j = m && m.contractor_name || b.contractor;
    m && m.disabled && p.push("Contractor " + j + " is inactive."), m && Pe(m.tax_cert_expiry, d) && p.push("Certificate of " + j + " expired on " + String(m.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
  }
  for (const b of n) {
    const m = ae(b);
    m && p.push("Contract " + b.contract + ": " + m);
  }
  return p;
}
function Pt(n, s = []) {
  const d = {};
  return n.week_date ? s.length || (d.week_date = "There are no Approved contracts to bill") : d.week_date = "Pick a date in the week", d;
}
function fe(n, s, d = s) {
  const p = n === we || n === oe;
  return {
    canEdit: p,
    canSend: p,
    canApprove: n === ne && !!s,
    canSendBack: n === ne && !!s,
    canMarkPaid: n === z && !!d,
    canReopen: n === z && !!s,
    canCancel: n === z && !!s,
    canMarkUnpaid: n === le && !!s,
    canAmend: n === K
  };
}
function Bt(n) {
  return n.status === K || n.status === we && !n.raised_by;
}
function Mt(n, s, d) {
  return {
    doctype: "Labour Weekly Bill",
    ...n.name ? { name: n.name } : {},
    company: d,
    week_start: n.week_date,
    lines: s.map((p) => ({ contract: p.contract, amount_to_pay: Number(p.amount_to_pay) || 0 }))
  };
}
function Nt(n, s, d = {}) {
  return s ? n.project === s || ((d[n.name] || {}).projects || []).includes(s) : !0;
}
function Ot(n, s = F()) {
  const d = () => ({ n: 0, value: 0 }), p = { all: d(), draft: d(), pending: d(), approved: d(), paidBills: d(), weekN: 0, weekValue: 0, paid: 0 }, _ = $(s);
  for (const b of n || []) {
    if (b.status === K) continue;
    const m = Number(b.total_amount) || 0;
    p.all.n++, p.all.value += m;
    for (const j of ["draft", "pending", "approved"]) ge(b, j) && (p[j].n++, p[j].value += m);
    b.status === le && (p.paid += m, p.paidBills.n++, p.paidBills.value += m), b.week_start && $(b.week_start) === _ && b.status !== oe && (p.weekN++, p.weekValue += m);
  }
  return p;
}
const Ht = { class: "list-page" }, Ut = { class: "sales-toolbar" }, Ft = { class: "sales-search" }, Kt = ["innerHTML"], $t = { class: "sales-pills" }, Rt = ["onClick"], It = ["value"], Vt = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, Wt = ["innerHTML"], zt = ["disabled", "title"], Yt = ["innerHTML"], Jt = { class: "bk-kpi-grid bk-kpi-grid-4" }, Gt = { class: "bk-kpi-inner" }, qt = { class: "bk-kpi-body" }, Xt = { class: "bk-kpi-value" }, Qt = { class: "bk-kpi-trend ct-kpi-sub" }, Zt = { class: "bk-kpi-inner" }, ea = { class: "bk-kpi-body" }, ta = { class: "bk-kpi-value" }, aa = { class: "bk-kpi-trend ct-kpi-sub" }, na = { class: "bk-kpi-inner" }, sa = { class: "bk-kpi-body" }, oa = { class: "bk-kpi-value bk-kpi-amber" }, la = { class: "bk-kpi-trend ct-kpi-sub" }, ia = { class: "bk-kpi-inner" }, ra = { class: "bk-kpi-body" }, da = { class: "bk-kpi-value bk-kpi-green" }, ca = { class: "bk-kpi-trend ct-kpi-sub" }, ua = { class: "bk-stat-grid" }, va = { class: "bk-stat-card" }, pa = { class: "bk-stat-content" }, ka = { class: "bk-stat-value" }, ba = { class: "bk-stat-card" }, _a = { class: "bk-stat-content" }, ma = {
  class: "bk-stat-value bk-kpi-blue",
  style: { "font-size": "16px" }
}, fa = { class: "bk-stat-card" }, ya = { class: "bk-stat-content" }, ha = {
  class: "bk-stat-value bk-kpi-green",
  style: { "font-size": "16px" }
}, wa = { class: "bk-stat-card" }, ga = { class: "bk-stat-content" }, Ca = {
  class: "bk-stat-value bk-kpi-amber",
  style: { "font-size": "16px" }
}, Sa = { class: "inv-table-wrap" }, xa = { class: "inv-table" }, ja = { key: 1 }, Ta = {
  colspan: "7",
  class: "vt-empty"
}, Aa = { class: "vt-empty-title" }, Ea = { class: "vt-empty-sub" }, La = ["onClick"], Da = { class: "vt-td vt-td-mono" }, Pa = { class: "vt-td" }, Ba = ["title"], Ma = { class: "vt-td vt-td-secondary" }, Na = { class: "vt-td vt-td-r" }, Oa = { class: "vt-td vt-td-r" }, Ha = { class: "vt-td" }, Ua = {
  key: 0,
  class: "vt-footer"
}, Fa = {
  class: "inv-drawer-panel open ct-drawer",
  style: { width: "1160px", "max-width": "98vw" }
}, Ka = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#1e3a5f,#1a6ef7)", padding: "18px 24px" }
}, $a = { class: "cust-drawer-header-left" }, Ra = { class: "inv-dh-title" }, Ia = { class: "cust-drawer-sub" }, Va = ["innerHTML"], Wa = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, za = { class: "inv-fg inv-fg2" }, Ya = { class: "inv-field" }, Ja = ["disabled"], Ga = {
  key: 0,
  class: "ct-err"
}, qa = { class: "inv-field" }, Xa = ["value"], Qa = { style: { "overflow-x": "auto", "margin-top": "16px" } }, Za = { class: "inv-table" }, en = { key: 0 }, tn = { key: 1 }, an = {
  colspan: "8",
  class: "vt-empty"
}, nn = { class: "vt-empty-sub" }, sn = { class: "vt-td vt-td-mono" }, on = { class: "vt-td" }, ln = {
  key: 0,
  class: "ct-flag"
}, rn = { class: "vt-td" }, dn = { class: "vt-td" }, cn = { class: "vt-td vt-td-r" }, un = { class: "vt-td vt-td-r" }, vn = {
  key: 0,
  class: "ct-hint"
}, pn = { class: "vt-td vt-td-r" }, kn = { class: "vt-td vt-td-r" }, bn = ["value", "onInput", "disabled", "aria-label"], _n = {
  key: 0,
  class: "ct-hint"
}, mn = {
  key: 1,
  class: "ct-hint"
}, fn = {
  key: 2,
  class: "ct-err"
}, yn = {
  key: 0,
  style: { "margin-top": "12px", "font-weight": "600", "text-align": "right" }
}, hn = {
  key: 1,
  class: "ct-info"
}, wn = ["innerHTML"], gn = {
  key: 2,
  class: "ct-note ct-note-bad"
}, Cn = {
  key: 3,
  class: "ct-note"
}, Sn = {
  key: 4,
  class: "ct-note ct-note-ok"
}, xn = {
  key: 5,
  class: "ct-note ct-note-bad"
}, jn = { key: 0 }, Tn = {
  key: 6,
  class: "ct-note"
}, An = {
  key: 7,
  class: "ct-note ct-note-ok"
}, En = {
  key: 8,
  class: "ct-errbox"
}, Ln = { class: "ct-errbox-title" }, Dn = ["innerHTML"], Pn = {
  key: 9,
  class: "ct-note ct-note-bad"
}, Bn = { class: "inv-dfooter" }, Mn = { class: "add-footer-status" }, Nn = { class: "add-footer-actions" }, On = ["disabled"], Hn = ["disabled"], Un = ["innerHTML"], Fn = ["disabled"], Kn = ["innerHTML"], $n = ["disabled"], Rn = ["disabled"], In = ["disabled"], Vn = ["disabled"], Wn = ["disabled"], zn = ["disabled"], Yn = ["disabled"], ye = "Labour Weekly Bill", W = "psd_books.api.labour_weekly_bill.", Jn = {
  __name: "WeeklyBill",
  setup(n) {
    const { toast: s } = at(), { confirm: d } = pt(), { prompt: p } = kt(), { canEdit: _ } = _t(), b = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "paid", l: "Paid" }, { k: "cancelled", l: "Cancelled" }], m = f([]), j = f([]), w = f({}), ie = f({}), Y = f({}), J = f([]), Ce = f(!1);
    function Me(o, t) {
      const a = Et(o.target.value);
      o.target.value = a, t.amount_to_pay = a;
    }
    const Se = f(!1), G = f(!0), R = f(""), A = f("all"), D = f(""), re = f({}), Ne = { draft: "pill-draft", pending: "pill-unpaid", approved: "pill-paid", paid: "pill-paid", cancelled: "pill-draft" }, P = f(!1), de = f(!1), g = f(!1), C = f([]), ce = x(() => y.value.canEdit ? jt(C.value) : Tt(C.value)), ue = f(!1), N = f(""), L = Ee({}), l = Ee({}), ve = x(() => _("admin")), Oe = () => ({ name: "", status: "Draft", project: "", week_date: F(), raised_by: "", approved_by: "", approved_on: "", paid_by: "", paid_on: "", cancelled_by: "", cancelled_on: "", cancel_reason: "", amended_from: "", rejection_reason: "" });
    function xe(o) {
      Object.keys(L).forEach((t) => delete L[t]), Object.keys(l).forEach((t) => delete l[t]), Object.assign(l, Oe(), o || {}), C.value = [], N.value = "";
    }
    const pe = x(() => Object.fromEntries(j.value.map((o) => [o.name, o.project_name || o.name]))), He = x(() => Object.fromEntries(J.value.map((o) => [o.name, o.contractor_name || o.name]))), q = x(() => D.value ? m.value.filter((o) => Nt(o, D.value, w.value)) : m.value), Ue = x(() => wt(q.value)), T = x(() => Ot(q.value, F())), Fe = x(() => D.value ? Number(re.value[D.value]) || 0 : Object.values(re.value).reduce((o, t) => o + (Number(t) || 0), 0)), ke = x(() => q.value.filter((o) => ge(o, A.value) && gt(o, R.value, pe.value, w.value))), y = x(() => fe(l.status, Ce.value, Se.value)), Ke = x(() => !!l.name && Bt(l)), I = x(() => Lt(C.value)), X = x(() => Dt(C.value, J.value)), be = (o) => yt(o, l.week_date, !l.name), $e = (o) => {
      const t = J.value.find((a) => a.name === o);
      return !!t && Pe(t.tax_cert_expiry);
    };
    function Re(o) {
      return L[o] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function O() {
      G.value = !0;
      try {
        const [o, t, a, r, E] = await Promise.all([
          V(ye, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "creation desc", limit: 1e3 }),
          V("Project", { fields: ["name", "project_name", "status"], limit: 1e3 }),
          V("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1e3 }),
          Z("psd_books.api.labour_contract.my_permissions", {}),
          Z(W + "balance_by_project", {}).catch(() => ({}))
          // card only: the page still opens if this fails
        ]);
        m.value = o || [], j.value = t || [], J.value = a || [], Ce.value = !!(r && r.can_approve), Se.value = !!(r && r.can_mark_paid), re.value = E && typeof E == "object" && !Array.isArray(E) ? E.message || E : {}, Ie(), Ve();
      } catch (o) {
        s("Failed to load weekly bills: " + (o.message || o), "error");
      } finally {
        G.value = !1;
      }
    }
    async function Ie() {
      try {
        w.value = await Z(W + "list_columns", { names: m.value.map((o) => o.name) }) || {};
      } catch {
        w.value = {};
      }
    }
    async function Ve() {
      try {
        const [o, t] = await Promise.all([
          V("Labour Contract", { fields: ["name", "activity", "project"], limit: 1e3 }),
          V("Labour Activity", { fields: ["name", "activity_name"], limit: 1e3 })
        ]), a = Object.fromEntries((t || []).map((r) => [r.name, r.activity_name || r.name]));
        ie.value = Object.fromEntries((o || []).map((r) => [r.name, a[r.activity] || r.activity || ""])), Y.value = Object.fromEntries((o || []).map((r) => [r.name, r.project || ""]));
      } catch {
        ie.value = {}, Y.value = {};
      }
    }
    async function Q(o) {
      if (N.value = "", !l.week_date) {
        C.value = [];
        return;
      }
      ue.value = !0;
      try {
        const t = await Z(W + "preview", { week_date: l.week_date, name: l.name || null }), a = At(t.rows || [], o || C.value);
        C.value = a.rows.map((r) => be(r) ? { ...r, amount_to_pay: "" } : r), a.dropped.length && (N.value = "Contract " + a.dropped.join(", ") + " is no longer Approved, or its project is Closed, so it can't be paid on this bill.");
      } catch (t) {
        C.value = [], s(t.message || "Could not load contracts", "error");
      } finally {
        ue.value = !1;
      }
    }
    function We() {
      xe(), P.value = !0, Q();
    }
    async function je(o) {
      xe({ ...o, week_date: o.week_start }), P.value = !0;
      try {
        const t = await bt(ye, o.name);
        Object.assign(l, { rejection_reason: t.rejection_reason, approved_by: t.approved_by, approved_on: t.approved_on, paid_by: t.paid_by, paid_on: t.paid_on, cancelled_by: t.cancelled_by, cancelled_on: t.cancelled_on, cancel_reason: t.cancel_reason, amended_from: t.amended_from, raised_by: t.raised_by }), fe(t.status, !1).canEdit ? await Q(t.lines || []) : C.value = (t.lines || []).map((a) => ({ ...a }));
      } catch (t) {
        s(t.message || "Could not open bill", "error");
      }
    }
    async function Te(o) {
      const t = Pt(l, C.value);
      if (Object.keys(L).forEach((r) => delete L[r]), Object.assign(L, t), Object.keys(t).length)
        return s(Object.values(t)[0], "error"), "";
      const a = C.value.map((r) => ae(r)).find(Boolean);
      if (a)
        return s(a, "error"), "";
      de.value = !0;
      try {
        const r = await ut(Mt(l, C.value, await vt())), E = r && r.name || l.name;
        return o || s(l.name ? "Bill updated" : "Bill saved"), l.name = E, await O(), E;
      } catch (r) {
        return s(r.message || "Could not save bill", "error"), "";
      } finally {
        de.value = !1;
      }
    }
    async function M(o, t, a) {
      g.value = !0;
      try {
        const r = await Le(W + o, t);
        s(a), await O(), r && r.name && (Object.assign(l, { status: r.status, raised_by: r.raised_by, approved_by: r.approved_by, approved_on: r.approved_on, paid_by: r.paid_by, paid_on: r.paid_on, cancelled_by: r.cancelled_by, cancelled_on: r.cancelled_on, cancel_reason: r.cancel_reason, amended_from: r.amended_from, rejection_reason: r.rejection_reason }), fe(r.status, !1).canEdit ? await Q(r.lines || []) : C.value = (r.lines || []).map((E) => ({ ...E })));
      } catch (r) {
        s(r.message || "Action failed", "error");
      } finally {
        g.value = !1;
      }
    }
    async function ze() {
      if (!await d({ title: "Confirm to send for approval", body: "Send this bill to the Director for approval? Total to pay: KES " + h(I.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const t = await Te(!0);
      t && await M("send_for_approval", { name: t }, "Sent for Director approval");
    }
    async function Ye() {
      await d({ title: "Confirm to approve", body: "Approve " + l.name + "? Total to pay: KES " + h(I.value) + ".", okLabel: "Approve", okStyle: "primary" }) && await M("approve_bill", { name: l.name }, "Bill approved");
    }
    async function Je() {
      await d({ title: "Confirm to mark as paid", body: "Mark bill " + l.name + " as paid? Total paid: KES " + h(I.value) + ". The payment is recorded now and can't be undone.", okLabel: "Yes, mark as Paid", okStyle: "primary" }) && await M("mark_paid", { name: l.name }, "Payment recorded");
    }
    async function Ge() {
      await d({ title: "Confirm to edit", body: "Reopen " + l.name + " as a Draft so the amounts can be changed? Its approval is cleared and it must be sent to the Director for approval again.", okLabel: "Reopen for editing", okStyle: "primary" }) && await M("reopen_bill", { name: l.name }, "Bill reopened as Draft");
    }
    async function qe() {
      await d({ title: "Confirm to mark as unpaid", body: "Reverse the payment of " + l.name + " (KES " + h(I.value) + ")? The bill goes back to Approved and the amount no longer counts as paid.", okLabel: "Yes, mark unpaid", okStyle: "primary" }) && await M("mark_unpaid", { name: l.name }, "Bill marked unpaid");
    }
    async function Xe() {
      const o = await p({ title: "Cancel bill", label: "Reason", okLabel: "Cancel bill" });
      !o || !o.trim() || await M("cancel_bill", { name: l.name, reason: o.trim() }, "Bill cancelled");
    }
    async function Qe() {
      if (await d({ title: "Confirm to amend", body: "Make a new Draft bill from " + l.name + " with the same week and amounts. You can change it and send it for approval.", okLabel: "Amend", okStyle: "primary" })) {
        g.value = !0;
        try {
          const t = await Le(W + "amend_bill", { name: l.name });
          s("New draft " + t.name + " made"), await O();
          const a = m.value.find((r) => r.name === t.name);
          a ? await je(a) : P.value = !1;
        } catch (t) {
          s(t.message || "Could not amend bill", "error");
        } finally {
          g.value = !1;
        }
      }
    }
    async function Ze() {
      const o = await p({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !o || !o.trim() || await M("send_back_bill", { name: l.name, reason: o.trim() }, "Sent back");
    }
    async function et() {
      if (await d({ title: "Confirm to delete", body: "Delete " + l.name + "? Only a Draft never sent for approval, or a Cancelled bill, can be deleted." })) {
        g.value = !0;
        try {
          await ct(ye, l.name), s("Bill deleted"), P.value = !1, await O();
        } catch (t) {
          s(t.message || "Could not delete bill", "error");
        } finally {
          g.value = !1;
        }
      }
    }
    return nt(O), (o, t) => (c(), u("div", Ht, [
      e("div", Ut, [
        e("div", Ft, [
          e("span", {
            innerHTML: v(B)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Kt),
          _e(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (a) => R.value = a),
            placeholder: "Search weekly bills…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [Ae, R.value]
          ])
        ]),
        e("div", $t, [
          (c(), u(H, null, U(b, (a) => e("button", {
            key: a.k,
            class: me(["sales-pill", [{ active: A.value === a.k }, a.k !== "all" ? Ne[a.k] : ""]]),
            onClick: (r) => A.value = a.k
          }, [
            S(i(a.l) + " ", 1),
            e("span", {
              class: me(["sales-pill-count", A.value === a.k ? "" : "zb-pc-muted"])
            }, i(Ue.value[a.k]), 3)
          ], 10, Rt)), 64))
        ]),
        _e(e("select", {
          "onUpdate:modelValue": t[1] || (t[1] = (a) => D.value = a),
          class: "inv-fi ct-project-filter",
          title: "Filter by project"
        }, [
          t[12] || (t[12] = e("option", { value: "" }, "All projects", -1)),
          (c(!0), u(H, null, U(j.value, (a) => (c(), u("option", {
            key: a.name,
            value: a.name
          }, i(a.project_name || a.name), 9, It))), 128))
        ], 512), [
          [st, D.value]
        ]),
        e("div", Vt, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: O,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: v(B)("refresh", 13)
            }, null, 8, Wt),
            t[13] || (t[13] = S(" Refresh", -1))
          ]),
          e("button", {
            class: "sales-btn-primary",
            disabled: !o.$canCreate("admin"),
            title: o.$canCreate("admin") ? "" : "Not permitted",
            onClick: We
          }, [
            e("span", {
              innerHTML: v(B)("plus", 13)
            }, null, 8, Yt),
            t[14] || (t[14] = S(" New Weekly Bill", -1))
          ], 8, zt)
        ])
      ]),
      e("div", Jt, [
        e("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: t[2] || (t[2] = (a) => A.value = "all")
        }, [
          e("div", Gt, [
            t[16] || (t[16] = e("div", {
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
            e("div", qt, [
              t[15] || (t[15] = e("div", { class: "bk-kpi-label" }, "Total Bills", -1)),
              e("div", Xt, i(T.value.all.n), 1),
              e("div", Qt, "KES " + i(v(h)(T.value.all.value)), 1)
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: t[3] || (t[3] = (a) => A.value = "draft")
        }, [
          e("div", Zt, [
            t[18] || (t[18] = e("div", {
              class: "bk-kpi-icon",
              style: { background: "#e2e8f0" }
            }, [
              e("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#475569",
                "stroke-width": "1.8"
              }, [
                e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
              ])
            ], -1)),
            e("div", ea, [
              t[17] || (t[17] = e("div", { class: "bk-kpi-label" }, "Draft", -1)),
              e("div", ta, i(T.value.draft.n), 1),
              e("div", aa, "KES " + i(v(h)(T.value.draft.value)), 1)
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: t[4] || (t[4] = (a) => A.value = "pending")
        }, [
          e("div", na, [
            t[20] || (t[20] = e("div", {
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
            e("div", sa, [
              t[19] || (t[19] = e("div", { class: "bk-kpi-label" }, "Pending Approval", -1)),
              e("div", oa, i(T.value.pending.n), 1),
              e("div", la, "KES " + i(v(h)(T.value.pending.value)), 1)
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: t[5] || (t[5] = (a) => A.value = "approved")
        }, [
          e("div", ia, [
            t[22] || (t[22] = e("div", {
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
            e("div", ra, [
              t[21] || (t[21] = e("div", { class: "bk-kpi-label" }, "Approved", -1)),
              e("div", da, i(T.value.approved.n), 1),
              e("div", ca, "KES " + i(v(h)(T.value.approved.value)), 1)
            ])
          ])
        ])
      ]),
      e("div", ua, [
        e("div", va, [
          e("div", pa, [
            e("div", null, [
              t[23] || (t[23] = e("div", { class: "bk-stat-label" }, "Bills This Week", -1)),
              e("div", ka, i(T.value.weekN), 1)
            ]),
            t[24] || (t[24] = ot('<div class="bk-stat-icon" style="background:#dbeafe;color:#2563eb;" data-v-0a79677e><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-0a79677e><rect x="3" y="4" width="18" height="18" rx="2" data-v-0a79677e></rect><line x1="16" y1="2" x2="16" y2="6" data-v-0a79677e></line><line x1="8" y1="2" x2="8" y2="6" data-v-0a79677e></line><line x1="3" y1="10" x2="21" y2="10" data-v-0a79677e></line></svg></div>', 1))
          ])
        ]),
        e("div", ba, [
          e("div", _a, [
            e("div", null, [
              t[25] || (t[25] = e("div", { class: "bk-stat-label" }, "Amount This Week", -1)),
              e("div", ma, "KES " + i(v(h)(T.value.weekValue)), 1)
            ]),
            t[26] || (t[26] = e("div", {
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
        e("div", fa, [
          e("div", ya, [
            e("div", null, [
              t[27] || (t[27] = e("div", { class: "bk-stat-label" }, "Total Paid", -1)),
              e("div", ha, "KES " + i(v(h)(T.value.paid)), 1)
            ]),
            t[28] || (t[28] = e("div", {
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
        ]),
        e("div", wa, [
          e("div", ga, [
            e("div", null, [
              t[29] || (t[29] = e("div", { class: "bk-stat-label" }, "Balance To Pay", -1)),
              e("div", Ca, "KES " + i(v(h)(Fe.value)), 1)
            ]),
            t[30] || (t[30] = e("div", {
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
        ])
      ]),
      e("div", Sa, [
        e("table", xa, [
          t[33] || (t[33] = e("thead", null, [
            e("tr", null, [
              e("th", { class: "vt-th" }, "Bill"),
              e("th", { class: "vt-th" }, "Project"),
              e("th", { class: "vt-th" }, "Contract"),
              e("th", { class: "vt-th" }, "Week (Monday to Sunday)"),
              e("th", { class: "vt-th vt-th-r" }, "Total to Pay (KES)"),
              e("th", { class: "vt-th vt-th-r" }, "Balance to Pay (KES)"),
              e("th", { class: "vt-th" }, "Status")
            ])
          ], -1)),
          e("tbody", null, [
            G.value ? (c(), u(H, { key: 0 }, U(6, (a) => e("tr", {
              key: a,
              class: "vt-row-shimmer"
            }, [...t[31] || (t[31] = [
              e("td", { colspan: "7" }, [
                e("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : ke.value.length ? (c(!0), u(H, { key: 2 }, U(ke.value, (a) => (c(), u("tr", {
              key: a.name,
              class: "inv-row",
              onClick: (r) => je(a)
            }, [
              e("td", Da, i(a.name), 1),
              e("td", Pa, i(v(St)(a, w.value[a.name], pe.value)), 1),
              e("td", {
                class: "vt-td vt-td-mono",
                title: ((w.value[a.name] || {}).contracts || []).join(", ")
              }, i(v(Ct)((w.value[a.name] || {}).contracts)), 9, Ba),
              e("td", Ma, i(v(he)(a.week_start)), 1),
              e("td", Na, i(v(h)(a.total_amount)), 1),
              e("td", Oa, i(w.value[a.name] ? v(h)(w.value[a.name].balance_after) : "—"), 1),
              e("td", Ha, [
                e("span", {
                  class: me(["vt-badge", "vt-badge-" + v(mt)(a.status)])
                }, [
                  t[32] || (t[32] = e("span", { class: "vt-badge-dot" }, null, -1)),
                  S(i(a.status), 1)
                ], 2)
              ])
            ], 8, La))), 128)) : (c(), u("tr", ja, [
              e("td", Ta, [
                e("div", Aa, i(R.value || D.value || A.value !== "all" ? "No results found" : "No weekly bills yet"), 1),
                e("div", Ea, i(R.value || D.value || A.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly bill"), 1)
              ])
            ]))
          ])
        ]),
        !G.value && m.value.length ? (c(), u("div", Ua, [
          t[34] || (t[34] = S("Showing ", -1)),
          e("strong", null, i(ke.value.length), 1),
          t[35] || (t[35] = S(" of ", -1)),
          e("strong", null, i(q.value.length), 1),
          t[36] || (t[36] = S(" bills", -1))
        ])) : k("", !0)
      ]),
      t[44] || (t[44] = e("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.", -1)),
      (c(), lt(dt, { to: "body" }, [
        P.value ? (c(), u("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: t[11] || (t[11] = it((a) => P.value = !1, ["self"]))
        }, [
          e("div", Fa, [
            e("div", Ka, [
              e("div", $a, [
                e("div", null, [
                  e("div", Ra, i(l.name || "New Weekly Bill"), 1),
                  e("div", Ia, i(l.name ? l.status : "Amounts to pay contractors for one week"), 1)
                ])
              ]),
              e("button", {
                class: "inv-dclose",
                style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                onClick: t[6] || (t[6] = (a) => P.value = !1),
                innerHTML: v(B)("x", 15)
              }, null, 8, Va)
            ]),
            e("div", Wa, [
              e("div", za, [
                e("div", Ya, [
                  t[37] || (t[37] = e("label", { class: "inv-lbl" }, [
                    S("Pick any date in the week "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  _e(e("input", {
                    type: "date",
                    "onUpdate:modelValue": t[7] || (t[7] = (a) => l.week_date = a),
                    class: "inv-fi",
                    style: rt(Re("week_date")),
                    disabled: !y.value.canEdit || !!l.name,
                    onChange: t[8] || (t[8] = (a) => {
                      delete L.week_date, Q();
                    })
                  }, null, 44, Ja), [
                    [Ae, l.week_date]
                  ]),
                  L.week_date ? (c(), u("div", Ga, i(L.week_date), 1)) : k("", !0)
                ]),
                e("div", qa, [
                  t[38] || (t[38] = e("label", { class: "inv-lbl" }, "Week (Monday to Sunday)", -1)),
                  e("input", {
                    class: "inv-fi",
                    value: v(he)(l.week_date),
                    disabled: ""
                  }, null, 8, Xa)
                ])
              ]),
              e("div", Qa, [
                e("table", Za, [
                  t[40] || (t[40] = e("thead", null, [
                    e("tr", null, [
                      e("th", { class: "vt-th" }, "Contract"),
                      e("th", { class: "vt-th" }, "Contractor"),
                      e("th", { class: "vt-th" }, "Activity"),
                      e("th", { class: "vt-th" }, "Project"),
                      e("th", { class: "vt-th vt-th-r" }, "Contract Value"),
                      e("th", { class: "vt-th vt-th-r" }, "Paid Till Now"),
                      e("th", { class: "vt-th vt-th-r" }, "Balance Amount"),
                      e("th", { class: "vt-th vt-th-r" }, "Amount To Pay Now")
                    ])
                  ], -1)),
                  e("tbody", null, [
                    ue.value ? (c(), u("tr", en, [...t[39] || (t[39] = [
                      e("td", {
                        colspan: "8",
                        class: "vt-empty"
                      }, [
                        e("div", { class: "vt-empty-sub" }, "Loading contracts…")
                      ], -1)
                    ])])) : ce.value.length ? (c(!0), u(H, { key: 2 }, U(ce.value, (a) => (c(), u("tr", {
                      key: a.contract
                    }, [
                      e("td", sn, i(a.contract), 1),
                      e("td", on, [
                        S(i(He.value[a.contractor] || a.contractor), 1),
                        $e(a.contractor) ? (c(), u("span", ln, " certificate expired")) : k("", !0)
                      ]),
                      e("td", rn, i(ie.value[a.contract] || "—"), 1),
                      e("td", dn, i(pe.value[Y.value[a.contract] || a.project] || Y.value[a.contract] || a.project || "—"), 1),
                      e("td", cn, i(v(h)(a.contract_value)), 1),
                      e("td", un, [
                        S(i(v(h)(a.paid_till_now)), 1),
                        a.paid_till_now ? k("", !0) : (c(), u("span", vn, " (New)"))
                      ]),
                      e("td", pn, i(v(h)(a.balance)), 1),
                      e("td", kn, [
                        e("input", {
                          type: "text",
                          inputmode: "decimal",
                          autocomplete: "off",
                          value: a.amount_to_pay,
                          onInput: (r) => Me(r, a),
                          class: "inv-fi",
                          style: { width: "130px", "text-align": "right" },
                          disabled: !y.value.canEdit || !!a.paid_this_week || be(a),
                          "aria-label": "Amount to pay now, contract " + a.contract,
                          style2: ""
                        }, null, 40, bn),
                        a.paid_this_week ? (c(), u("div", _n, "Already on " + i(a.paid_this_week) + " this week", 1)) : k("", !0),
                        be(a) ? (c(), u("div", mn, "Past week: already has payments")) : k("", !0),
                        v(ae)(a) ? (c(), u("div", fn, i(v(ae)(a)), 1)) : k("", !0)
                      ])
                    ]))), 128)) : (c(), u("tr", tn, [
                      e("td", an, [
                        e("div", nn, i(y.value.canEdit ? C.value.length ? "All Approved contracts are fully paid" : "There are no Approved contracts to bill" : "No contracts on this bill"), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              ce.value.length ? (c(), u("div", yn, "Total to pay now: KES " + i(v(h)(I.value)), 1)) : k("", !0),
              y.value.canEdit ? (c(), u("div", hn, [
                e("span", {
                  innerHTML: v(B)("info", 14)
                }, null, 8, wn),
                t[41] || (t[41] = S("Fully paid contracts are not listed. Contracts of all projects are shown. A contract can be paid once a week, and an amount can't be above its balance.", -1))
              ])) : k("", !0),
              l.status === v(oe) && l.rejection_reason ? (c(), u("div", gn, "Sent back: " + i(l.rejection_reason), 1)) : k("", !0),
              l.status === v(ne) ? (c(), u("div", Cn, "Waiting for Director approval. The bill is locked.")) : k("", !0),
              l.status === v(z) ? (c(), u("div", Sn, "Approved by " + i(v(te)(l.approved_by)) + " on " + i(v(ee)(l.approved_on)) + ". Payment is not recorded until the bill is marked Paid.", 1)) : k("", !0),
              l.status === v(K) ? (c(), u("div", xn, [
                S("Cancelled by " + i(v(te)(l.cancelled_by)) + " on " + i(v(ee)(l.cancelled_on)) + ": " + i(l.cancel_reason), 1),
                l.amended_from ? (c(), u("span", jn, " (amended from " + i(l.amended_from) + ")", 1)) : k("", !0)
              ])) : k("", !0),
              l.amended_from && l.status !== v(K) ? (c(), u("div", Tn, "Amended from " + i(l.amended_from) + ".", 1)) : k("", !0),
              l.status === v(le) ? (c(), u("div", An, "Paid. Marked paid by " + i(v(te)(l.paid_by)) + " on " + i(v(ee)(l.paid_on)) + ". Approved by " + i(v(te)(l.approved_by)) + " on " + i(v(ee)(l.approved_on)) + ".", 1)) : k("", !0),
              X.value.length && (y.value.canSend || y.value.canApprove) ? (c(), u("div", En, [
                e("div", Ln, [
                  e("span", {
                    innerHTML: v(B)("alert", 15)
                  }, null, 8, Dn),
                  t[42] || (t[42] = S("Please fix the following", -1))
                ]),
                e("ul", null, [
                  (c(!0), u(H, null, U(X.value, (a) => (c(), u("li", { key: a }, i(a), 1))), 128))
                ])
              ])) : k("", !0),
              N.value ? (c(), u("div", Pn, i(N.value), 1)) : k("", !0)
            ]),
            e("div", Bn, [
              e("div", Mn, i(l.name ? "Editing: " + l.name : "New weekly bill — unsaved"), 1),
              e("div", Nn, [
                Ke.value && o.$canDelete("admin") ? (c(), u("button", {
                  key: 0,
                  class: "add-btn-cancel wb-del",
                  disabled: g.value,
                  onClick: et
                }, "Delete", 8, On)) : k("", !0),
                e("button", {
                  class: "add-btn-cancel",
                  onClick: t[9] || (t[9] = (a) => P.value = !1)
                }, i(y.value.canEdit ? "Cancel" : "Close window"), 1),
                y.value.canEdit ? (c(), u("button", {
                  key: 1,
                  class: "add-btn-draft",
                  disabled: g.value || !ve.value,
                  onClick: t[10] || (t[10] = (a) => Te(!1))
                }, [
                  e("span", {
                    innerHTML: v(B)("save", 13)
                  }, null, 8, Un),
                  S(" " + i(de.value ? "Saving…" : "Save Draft"), 1)
                ], 8, Hn)) : k("", !0),
                y.value.canSend ? (c(), u("button", {
                  key: 2,
                  class: "add-btn-more",
                  disabled: g.value || !ve.value || X.value.length > 0 || !!N.value,
                  onClick: ze
                }, [
                  e("span", {
                    innerHTML: v(B)("check", 13)
                  }, null, 8, Kn),
                  t[43] || (t[43] = S(" Send for approval", -1))
                ], 8, Fn)) : k("", !0),
                y.value.canApprove ? (c(), u("button", {
                  key: 3,
                  class: "add-btn-more",
                  disabled: g.value || X.value.length > 0,
                  onClick: Ye
                }, "Approve as Director", 8, $n)) : k("", !0),
                y.value.canReopen ? (c(), u("button", {
                  key: 4,
                  class: "add-btn-draft",
                  disabled: g.value,
                  onClick: Ge
                }, "Edit", 8, Rn)) : k("", !0),
                y.value.canCancel ? (c(), u("button", {
                  key: 5,
                  class: "add-btn-cancel wb-cancel-bill",
                  disabled: g.value,
                  onClick: Xe
                }, "Cancel bill", 8, In)) : k("", !0),
                y.value.canMarkUnpaid ? (c(), u("button", {
                  key: 6,
                  class: "add-btn-cancel",
                  disabled: g.value,
                  onClick: qe
                }, "Mark unpaid", 8, Vn)) : k("", !0),
                y.value.canAmend ? (c(), u("button", {
                  key: 7,
                  class: "add-btn-more",
                  disabled: g.value || !ve.value,
                  onClick: Qe
                }, "Amend", 8, Wn)) : k("", !0),
                y.value.canMarkPaid ? (c(), u("button", {
                  key: 8,
                  class: "add-btn-more",
                  disabled: g.value,
                  onClick: Je
                }, "Paid", 8, zn)) : k("", !0),
                y.value.canSendBack ? (c(), u("button", {
                  key: 9,
                  class: "add-btn-cancel",
                  disabled: g.value,
                  onClick: Ze
                }, "Send back", 8, Yn)) : k("", !0)
              ])
            ])
          ])
        ])) : k("", !0)
      ]))
    ]));
  }
}, es = /* @__PURE__ */ tt(Jn, [["__scopeId", "data-v-0a79677e"]]);
export {
  es as default
};
