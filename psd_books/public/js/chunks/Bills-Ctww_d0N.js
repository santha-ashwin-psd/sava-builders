import { _ as Ha, x as Va, ah as Na, z as pt, y as vt, o as Aa, f as I, m as Ea, c as d, a as t, u as p, i as f, w as T, A as $, F as x, r as M, d as g, t as i, n as C, W as Q, D as J, E as Pa, b as m, a4 as Nt, q as Z, v as ne, $ as Ua, p as Ia, a0 as Ra, a1 as At, X as ee, e as Oe, l as te, h as k, g as L, K as ze, L as Et, J as mt, a2 as Pt, a3 as Oa, aj as za, ak as ja, al as qa, am as Fa, R as Ka, ai as Ga, S as Wa, k as o, C as Qa, an as Ja } from "./main-DqjgZVjz.js";
import { o as Xa } from "./useOpenFromQuery-YaE2G5e3.js";
import { c as _t, a as Ya, b as Za } from "./useTaxCalc-Ul330Fdt.js";
import { f as v, b as K } from "./format-BcJZDVG4.js";
import { o as Ut } from "./userNames-C7vdeVeg.js";
import { _ as ge } from "./SearchableSelect-8GV9wgBb.js";
import { u as es } from "./useProjectOptions-DiAaVKer.js";
/* empty css                                                                      */
import { P as ts } from "./Pagination-CcgHpIYP.js";
import { u as as } from "./usePagination-IEsZ_c8_.js";
import { B as ss } from "./BulkActionBar-ByYmZm-K.js";
import { T as ns } from "./TimelineStepper-CuZx0ncy.js";
import { J as ls } from "./JournalTab-DTz2fZcd.js";
import { D as It } from "./DocLink-DHBqCeME.js";
function is(bt = {}) {
  const V = {
    dueDateField: "due_date",
    outstandingField: "outstanding_amount",
    fallbackDraftLabel: "Draft",
    fallbackSubmittedLabel: "Submitted",
    paidStatuses: ["paid"],
    pendingStatuses: ["submitted", "unpaid", "partly paid", "to deliver", "to receive", "to bill"],
    completedStatuses: ["completed", "closed", "invoiced", "fully delivered", "fully billed"],
    overdueCheck: null,
    // override for custom logic
    ...bt
  };
  function le(S) {
    if (V.overdueCheck) return V.overdueCheck(S);
    const R = Number((S == null ? void 0 : S[V.outstandingField]) || 0), ie = S == null ? void 0 : S[V.dueDateField];
    return R > 0 && ie && new Date(ie) < /* @__PURE__ */ new Date();
  }
  function $e(S) {
    return S ? S.docstatus === 2 ? "CANCELLED" : le(S) ? `OVERDUE ${Math.floor((Date.now() - new Date(S[V.dueDateField])) / 864e5)}d` : S.docstatus === 0 ? V.fallbackDraftLabel.toUpperCase() : String(S.status || V.fallbackSubmittedLabel).toUpperCase() : "";
  }
  function h(S) {
    if (!S) return "";
    if (S.docstatus === 2) return "status-cancelled";
    if (le(S)) return "status-overdue";
    const R = String(S.status || "").toLowerCase();
    return V.paidStatuses.includes(R) || V.completedStatuses.includes(R) ? "status-paid" : V.pendingStatuses.includes(R) ? "status-unpaid" : R === "cancelled" ? "status-cancelled" : S.docstatus === 0 ? "status-draft" : "status-unpaid";
  }
  function je(S) {
    if (!S) return "linear-gradient(135deg,#1e3a5f,#2563eb)";
    if (S.docstatus === 2 || le(S)) return "linear-gradient(135deg,#7f1d1d,#dc2626)";
    const R = String(S.status || "").toLowerCase();
    return V.paidStatuses.includes(R) || V.completedStatuses.includes(R) ? "linear-gradient(135deg,#064e3b,#059669)" : V.pendingStatuses.includes(R) ? "linear-gradient(135deg,#78350f,#d97706)" : R === "cancelled" ? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#1e3a5f,#2563eb)";
  }
  return { statusLabel: $e, statusCls: h, statusBg: je, isOverdue: le };
}
const os = { class: "list-page" }, ds = { class: "sales-toolbar" }, rs = { class: "sales-search" }, us = ["innerHTML"], cs = { class: "sales-pills" }, ps = ["onClick"], vs = {
  key: 0,
  class: "sales-pill-count"
}, ms = { style: { display: "flex", gap: "8px", "margin-left": "auto" } }, _s = ["title"], bs = ["innerHTML"], ys = ["innerHTML"], hs = ["innerHTML"], fs = { class: "bk-kpi-grid" }, gs = { class: "bk-kpi-inner" }, ks = { class: "bk-kpi-body" }, ws = { class: "bk-kpi-value" }, xs = { class: "bk-kpi-inner" }, Cs = { class: "bk-kpi-body" }, Ss = { class: "bk-kpi-value bk-kpi-amber" }, Ts = { class: "bk-kpi-inner" }, Ls = { class: "bk-kpi-body" }, $s = { class: "bk-kpi-value bk-kpi-amber" }, Ms = { class: "bk-kpi-inner" }, Ds = { class: "bk-kpi-body" }, Bs = { class: "bk-kpi-value bk-kpi-red" }, Hs = { class: "bk-kpi-inner" }, Vs = { class: "bk-kpi-body" }, Ns = { class: "bk-kpi-value bk-kpi-green" }, As = { class: "bk-stat-grid" }, Es = { class: "bk-stat-card" }, Ps = { class: "bk-stat-content" }, Us = { class: "bk-stat-value" }, Is = { class: "bk-stat-card" }, Rs = { class: "bk-stat-content" }, Os = {
  class: "bk-stat-value",
  style: { "font-size": "16px" }
}, zs = { class: "bk-stat-card" }, js = { class: "bk-stat-content" }, qs = {
  class: "bk-stat-value bk-kpi-amber",
  style: { "font-size": "16px" }
}, Fs = { class: "bk-stat-card" }, Ks = { class: "bk-stat-content" }, Gs = {
  class: "bk-stat-value",
  style: { "font-size": "16px" }
}, Ws = ["disabled", "title"], Qs = ["disabled", "title"], Js = ["innerHTML"], Xs = ["disabled", "title"], Ys = ["disabled", "title"], Zs = ["innerHTML"], en = { class: "inv-table-wrap" }, tn = { class: "inv-table bil-desktop-table" }, an = { style: { width: "32px" } }, sn = ["checked"], nn = ["innerHTML"], ln = ["innerHTML"], on = ["innerHTML"], dn = ["innerHTML"], rn = ["innerHTML"], un = ["innerHTML"], cn = { class: "td-check" }, pn = ["checked", "onChange"], vn = ["onClick"], mn = ["onClick"], _n = ["onClick"], bn = ["onClick"], yn = ["onClick"], hn = ["onClick"], fn = ["onClick"], gn = { class: "td-actions bill-act-cell" }, kn = ["onClick"], wn = ["innerHTML"], xn = ["disabled", "onClick", "title"], Cn = ["innerHTML"], Sn = ["disabled", "onClick", "title"], Tn = ["innerHTML"], Ln = { key: 0 }, $n = {
  colspan: "10",
  class: "bk-empty-state"
}, Mn = { class: "bk-empty-inner" }, Dn = { class: "bil-mobile-cards" }, Bn = {
  key: 1,
  class: "bil-mc-empty"
}, Hn = ["onClick"], Vn = { class: "bil-mc-top" }, Nn = { class: "bil-mc-docno" }, An = { class: "bil-mc-mid" }, En = { class: "bil-mc-meta" }, Pn = { class: "bil-mc-amount" }, Un = {
  key: 0,
  class: "bil-mc-balance"
}, In = { class: "bil-mc-footer" }, Rn = ["onClick"], On = ["disabled", "onClick"], zn = ["disabled", "onClick"], jn = {
  key: 1,
  style: { display: "grid", "grid-template-columns": "repeat(auto-fill,minmax(240px,1fr))", gap: "14px", padding: "24px 24px 24px" }
}, qn = {
  key: 1,
  style: { "grid-column": "1/-1", "text-align": "center", padding: "40px 16px", color: "#9ca3af", "font-size": "13px" }
}, Fn = ["onClick"], Kn = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px" } }, Gn = { style: { "font-size": "12px", "font-weight": "700", color: "#2563eb" } }, Wn = { style: { "font-size": "13.5px", "font-weight": "600", color: "#1a1d23", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis" } }, Qn = { style: { display: "flex", "justify-content": "space-between", "font-size": "12px", color: "#6b7280" } }, Jn = { style: { "font-weight": "700", color: "#1a1d23" } }, Xn = { style: { display: "flex", gap: "6px", "border-top": "1px solid #f3f4f6", "padding-top": "10px" } }, Yn = ["onClick"], Zn = ["innerHTML"], el = ["disabled", "onClick", "title"], tl = ["innerHTML"], al = ["disabled", "onClick", "title"], sl = ["innerHTML"], nl = {
  key: 0,
  style: { padding: "12px 4px 4px" }
}, ll = { class: "inv-dh" }, il = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, ol = { class: "inv-dh-title" }, dl = {
  key: 0,
  class: "add-status-badge"
}, rl = ["innerHTML"], ul = { class: "inv-dbody" }, cl = { class: "add-card" }, pl = { class: "bill-details-lower" }, vl = {
  class: "bill-details-lower-main add-details-grid",
  style: { "margin-top": "14px" }
}, ml = ["disabled"], _l = ["disabled"], bl = ["disabled"], yl = ["disabled"], hl = ["disabled"], fl = ["value"], gl = { class: "bill-details-toggle-col" }, kl = { class: "inv-inv-toggle-row" }, wl = ["innerHTML"], xl = { class: "inv-inv-switch" }, Cl = ["disabled"], Sl = {
  key: 0,
  class: "inv-inv-wh-row"
}, Tl = { class: "add-card" }, Ll = { class: "po-addr-select-wrap" }, $l = {
  key: 0,
  class: "po-addr-card"
}, Ml = { class: "po-addr-card-type" }, Dl = { class: "po-addr-card-text" }, Bl = { class: "add-card" }, Hl = { class: "add-card-title" }, Vl = { class: "po-item-count" }, Nl = { class: "po-items-table-wrap" }, Al = { class: "po-items-table" }, El = { class: "po-items-row" }, Pl = { class: "td-num" }, Ul = { class: "po-row-num" }, Il = { class: "td-item" }, Rl = { class: "td-hsn" }, Ol = ["onUpdate:modelValue"], zl = { class: "td-uom" }, jl = ["onUpdate:modelValue", "onChange"], ql = ["value"], Fl = {
  key: 0,
  class: "uom-conv-hint"
}, Kl = { class: "td-mrp" }, Gl = ["value"], Wl = { class: "td-qty" }, Ql = ["onUpdate:modelValue", "onInput"], Jl = { class: "td-rate" }, Xl = ["onUpdate:modelValue", "onInput"], Yl = { class: "td-disc" }, Zl = ["onUpdate:modelValue", "onInput"], ei = { class: "td-tax" }, ti = ["onUpdate:modelValue"], ai = ["value"], si = { class: "td-batch" }, ni = {
  key: 1,
  style: { color: "#cbd5e1", "font-size": "12px" }
}, li = { class: "td-expiry" }, ii = ["onUpdate:modelValue"], oi = {
  key: 1,
  style: { color: "#cbd5e1", "font-size": "12px" }
}, di = { class: "td-subtotal" }, ri = { class: "po-row-subtotal-amt" }, ui = { class: "td-rm" }, ci = ["onClick"], pi = ["innerHTML"], vi = {
  key: 0,
  class: "po-items-error-row"
}, mi = { colspan: "13" }, _i = { class: "po-items-banner-inner" }, bi = ["innerHTML"], yi = {
  key: 1,
  class: "po-items-warn-row"
}, hi = { colspan: "13" }, fi = { class: "po-items-banner-inner" }, gi = ["innerHTML"], ki = ["innerHTML"], wi = {
  class: "po-totals",
  style: { "margin-top": "16px" }
}, xi = { class: "po-totals-right" }, Ci = { class: "po-total-row" }, Si = {
  class: "po-total-row",
  style: { "align-items": "center" }
}, Ti = { style: { display: "flex", gap: "6px", "align-items": "center", "justify-content": "flex-end" } }, Li = ["max"], $i = {
  key: 0,
  class: "po-total-row"
}, Mi = { class: "po-total-row" }, Di = {
  key: 1,
  class: "po-total-row"
}, Bi = {
  key: 2,
  class: "po-total-row",
  style: { color: "#d97706", "font-size": "12px" }
}, Hi = { style: { color: "#d97706" } }, Vi = {
  key: 3,
  class: "po-total-row",
  style: { "font-size": "12px", color: "#6b7280" }
}, Ni = { class: "po-total-row grand" }, Ai = { class: "add-card" }, Ei = {
  class: "inv-lbl",
  style: { display: "flex", "justify-content": "space-between", "align-items": "center" }
}, Pi = {
  key: 0,
  style: { "font-size": "11px", color: "#ef4444", "margin-top": "3px" }
}, Ui = { class: "inv-dfooter" }, Ii = { class: "add-footer-status" }, Ri = { class: "add-footer-actions" }, Oi = ["disabled", "title"], zi = ["innerHTML"], ji = ["disabled", "title"], qi = ["innerHTML"], Fi = { class: "inv-view-header bill-view-page-header" }, Ki = { style: { display: "flex", "justify-content": "space-between", width: "stretch" } }, Gi = { class: "inv-view-header-left" }, Wi = { class: "inv-view-title-row" }, Qi = { class: "inv-view-number" }, Ji = { class: "inv-view-subtitle" }, Xi = { class: "bill-view-cta-wrap" }, Yi = ["innerHTML"], Zi = { class: "inv-view-body" }, eo = { class: "inv-tl-wrap" }, to = { class: "inv-action-bar" }, ao = ["disabled", "title"], so = ["innerHTML"], no = { style: { position: "relative", display: "inline-flex" } }, lo = ["innerHTML"], io = {
  key: 0,
  class: "inv-dl-menu"
}, oo = ["innerHTML"], ro = ["innerHTML"], uo = ["disabled", "title"], co = ["innerHTML"], po = ["disabled", "title"], vo = ["innerHTML"], mo = ["disabled", "title"], _o = ["innerHTML"], bo = ["disabled", "title"], yo = ["disabled", "title"], ho = ["innerHTML"], fo = { class: "inv-view-tabs" }, go = {
  key: 0,
  class: "inv-tab-body"
}, ko = {
  class: "inv-details-meta",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, wo = { class: "inv-details-meta-col" }, xo = { class: "inv-dmeta-icon-row" }, Co = ["innerHTML"], So = { class: "inv-dmeta-primary" }, To = {
  key: 0,
  class: "inv-dmeta-secondary"
}, Lo = { class: "inv-details-meta-col" }, $o = { class: "inv-dmeta-icon-row" }, Mo = ["innerHTML"], Do = { class: "inv-dmeta-date-val" }, Bo = {
  key: 0,
  class: "inv-dmeta-date-sub"
}, Ho = { class: "inv-details-meta-col col-balance" }, Vo = { class: "inv-dmeta-icon-row" }, No = ["innerHTML"], Ao = ["disabled", "title"], Eo = {
  key: 0,
  style: { padding: "24px", "text-align": "center", color: "#9ca3af" }
}, Po = { class: "inv-sec-lbl" }, Uo = { class: "po-item-count" }, Io = { class: "inv-items-wrap" }, Ro = { class: "inv-items-table" }, Oo = { class: "inv-item-num" }, zo = { class: "inv-item-name" }, jo = {
  key: 0,
  class: "inv-item-desc"
}, qo = { class: "inv-dash" }, Fo = { class: "inv-dash" }, Ko = { class: "td-r inv-dash" }, Go = { class: "td-r" }, Wo = { class: "td-r" }, Qo = { class: "td-r inv-dash" }, Jo = { class: "inv-dash" }, Xo = { class: "inv-dash" }, Yo = { class: "inv-dash" }, Zo = {
  class: "td-r",
  style: { "font-weight": "600" }
}, ed = { class: "po-view-totals" }, td = { class: "po-view-totals-inner" }, ad = { class: "po-view-total-row" }, sd = {
  key: 0,
  class: "po-view-total-row"
}, nd = { class: "po-view-tax-label" }, ld = { class: "po-view-tax-rate" }, id = {
  key: 2,
  class: "po-view-total-row po-view-tax-row"
}, od = {
  key: 3,
  class: "po-view-total-row",
  style: { color: "#d97706" }
}, dd = { style: { opacity: ".7" } }, rd = { class: "po-view-total-row po-view-grand" }, ud = {
  key: 1,
  style: { color: "#9ca3af", "font-size": "13px", padding: "8px 0" }
}, cd = {
  key: 2,
  style: { "margin-top": "10px", display: "flex", "align-items": "center", gap: "8px", "font-size": "12.5px" }
}, pd = { style: { background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", "border-radius": "5px", padding: "2px 10px", "font-weight": "600" } }, vd = {
  key: 3,
  style: { "margin-top": "10px", display: "flex", "align-items": "center", gap: "8px", "font-size": "12.5px" }
}, md = { style: { background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", "border-radius": "5px", padding: "2px 10px", "font-weight": "600" } }, _d = {
  key: 5,
  style: { "margin-top": "10px", display: "flex", "align-items": "center", gap: "8px", "font-size": "12.5px" }
}, bd = { style: { background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", "border-radius": "5px", padding: "2px 10px", "font-weight": "600", display: "inline-flex", "align-items": "center", gap: "5px" } }, yd = ["innerHTML"], hd = {
  key: 6,
  style: { "margin-top": "12px" }
}, fd = {
  class: "inv-dmeta-icon-row",
  style: { "margin-bottom": "6px" }
}, gd = ["innerHTML"], kd = { style: { background: "#f8fafc", border: "1px solid #e2e8f0", "border-radius": "8px", padding: "10px 14px", "font-size": "12.5px", color: "#374151", "white-space": "pre-wrap", "word-break": "break-word", "line-height": "1.6" } }, wd = {
  key: 7,
  style: { "margin-top": "14px" }
}, xd = { style: { display: "flex", "align-items": "center", gap: "6px", "margin-bottom": "8px" } }, Cd = ["innerHTML"], Sd = { style: { background: "#f8fafc", border: "1px solid #e2e8f0", "border-radius": "8px", padding: "12px 14px" } }, Td = { style: { "font-size": "13px", color: "#374151", "line-height": "1.65", "white-space": "pre-line" } }, Ld = {
  key: 2,
  class: "inv-view-footer"
}, $d = {
  key: 1,
  class: "inv-tab-body"
}, Md = {
  key: 0,
  style: { "text-align": "center", padding: "24px", color: "#9ca3af", "font-size": "13px" }
}, Dd = {
  key: 0,
  class: "inv-items-wrap"
}, Bd = { class: "inv-items-table inv-payments-tbl" }, Hd = { class: "mono-sm" }, Vd = { class: "mono-sm text-muted" }, Nd = { class: "td-r" }, Ad = { style: { "font-weight": "600", color: "#059669" } }, Ed = {
  key: 0,
  style: { "font-size": "10.5px", color: "#dc2626", "font-weight": "500" }
}, Pd = { class: "bil-pay-mobile-cards" }, Ud = { class: "bil-pay-mc-top" }, Id = { class: "bil-pay-mc-date" }, Rd = { class: "bil-pay-mc-amount" }, Od = { class: "bil-pay-mc-bottom" }, zd = { class: "bil-pay-mc-mode" }, jd = { class: "bil-pay-mc-ref" }, qd = {
  key: 0,
  style: { "font-size": "10.5px", color: "#dc2626", "font-weight": "500", "margin-top": "2px" }
}, Fd = {
  key: 1,
  class: "inv-items-wrap",
  style: { "margin-top": "12px" }
}, Kd = { class: "inv-items-table inv-payments-tbl" }, Gd = { style: { color: "#7c3aed", "font-weight": "600" } }, Wd = { class: "mono-sm" }, Qd = {
  key: 0,
  class: "bil-dn-badge bil-dn-badge-direct"
}, Jd = {
  key: 1,
  class: "bil-dn-badge bil-dn-badge-applied"
}, Xd = {
  class: "td-r",
  style: { "font-weight": "600", color: "#7c3aed" }
}, Yd = {
  key: 2,
  style: { "text-align": "center", padding: "40px 24px", color: "#9ca3af", "font-size": "13px" }
}, Zd = {
  width: "40",
  height: "40",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#d1d5db",
  "stroke-width": "1.3",
  style: { "margin-bottom": "10px" }
}, er = {
  key: 0,
  style: { "margin-top": "12px" }
}, tr = ["disabled", "title"], ar = {
  key: 2,
  class: "inv-tab-body"
}, sr = {
  key: 4,
  class: "po-apply-dialog"
}, nr = {
  class: "inv-dh",
  style: { height: "auto", padding: "14px 18px" }
}, lr = ["innerHTML"], ir = {
  class: "inv-dbody",
  style: { padding: "16px 18px", display: "flex", "flex-direction": "column", gap: "12px" }
}, or = { class: "add-details-grid" }, dr = { class: "add-details-grid" }, rr = ["value"], ur = { class: "add-details-grid" }, cr = ["value"], pr = { class: "inv-dfooter" }, vr = ["disabled"], mr = ["disabled", "title"], _r = {
  __name: "Bills",
  setup(bt) {
    const V = { "194C": 1, "194J": 10, "194A": 10, "194H": 5, "194I": 10, 192: 0, 195: 20, Other: 10 }, le = [
      "01-Jammu and Kashmir",
      "02-Himachal Pradesh",
      "03-Punjab",
      "04-Chandigarh",
      "05-Uttarakhand",
      "06-Haryana",
      "07-Delhi",
      "08-Rajasthan",
      "09-Uttar Pradesh",
      "10-Bihar",
      "11-Sikkim",
      "12-Arunachal Pradesh",
      "13-Nagaland",
      "14-Manipur",
      "15-Mizoram",
      "16-Tripura",
      "17-Meghalaya",
      "18-Assam",
      "19-West Bengal",
      "20-Jharkhand",
      "21-Odisha",
      "22-Chhattisgarh",
      "23-Madhya Pradesh",
      "24-Gujarat",
      "26-Dadra and Nagar Haveli",
      "27-Maharashtra",
      "29-Karnataka",
      "30-Goa",
      "31-Lakshadweep",
      "32-Kerala",
      "33-Tamil Nadu",
      "34-Puducherry",
      "35-Andaman and Nicobar Islands",
      "36-Telangana",
      "37-Andhra Pradesh",
      "38-Ladakh",
      "97-Other Territory"
    ];
    function $e(a) {
      const e = String(a || "").replace(/^\s*\d+\s*-\s*/, "").trim().toLowerCase();
      return e && le.find((s) => s.split("-").slice(1).join("-").toLowerCase() === e) || "";
    }
    const { toast: h } = Va(), je = Wa(), { canCreate: S, canEdit: R, canDelete: ie } = Ka(), { confirm: Me } = Oa(), { renderDocument: Rt, setCompany: Ot } = Na(), ke = k(!1);
    function yt(a = "pdf") {
      var n;
      ke.value = !1;
      const e = { ...c.value, items: sa(X.value, (n = c.value) == null ? void 0 : n.place_of_supply), taxes: ve.value };
      if (!(e != null && e.name)) return;
      const s = Rt(e, {
        title: "BILL",
        partyLabel: "Vendor",
        partyField: "supplier_name",
        companyName: e.company || window.__booksCompany || "",
        includeHsn: !0,
        includeDiscount: !0,
        includeMrp: !0
      });
      if (a === "print") {
        const r = window.open("", "_blank");
        if (!r) {
          h("Pop-up blocked — allow pop-ups to print", "error");
          return;
        }
        r.document.write(s), r.document.close(), setTimeout(() => {
          try {
            r.focus(), r.print();
          } catch {
          }
        }, 600);
      } else {
        const r = new Blob([s], { type: "text/html;charset=utf-8" }), _ = URL.createObjectURL(r), u = window.open(_, "_blank");
        if (!u) {
          URL.revokeObjectURL(_), h("Pop-up blocked — allow pop-ups to download", "error");
          return;
        }
        u.addEventListener("load", () => {
          try {
            u.document.title = `${e.name}.pdf`, u.focus(), u.print();
          } catch {
          }
          setTimeout(() => URL.revokeObjectURL(_), 5e3);
        });
      }
    }
    function ht(a) {
      !a.target.closest(".inv-ab-dropdown") && !a.target.closest(".inv-dl-menu") && (ke.value = !1);
    }
    const { openEmail: ft } = za(), { openPayment: gt } = Ga(), { confirmCascade: zt } = Fa(), { openReturnNote: jt } = ja(), { statusLabel: qt, statusCls: Ft, isOverdue: G } = is({
      dueDateField: "due_date",
      outstandingField: "outstanding_amount",
      fallbackDraftLabel: "Draft",
      fallbackSubmittedLabel: "Unpaid"
    }), we = (a) => (a == null ? void 0 : a.docstatus) === 1 ? "SUBMITTED" : qt(a), De = (a) => (a == null ? void 0 : a.docstatus) === 1 ? "status-unpaid" : Ft(a), W = k("all"), Kt = [
      { key: "all", label: "All" },
      { key: "draft", label: "Draft" },
      { key: "unpaid", label: "Unpaid" },
      { key: "overdue", label: "Overdue" },
      { key: "paid", label: "Paid" }
    ], N = k([]), oe = k(!1), de = k(""), H = k(/* @__PURE__ */ new Set()), xe = k("table"), ae = k(!1), re = k(!1), P = k(""), Gt = k(!1), z = k("normal"), ue = k(!1), c = k(null), ce = k("details"), A = pt({ details: !1, billing: !0, lines: !1, remarks: !0 }), Be = k(!1), X = k([]), pe = k([]), ve = k([]), Ce = k([]), qe = k([]), Fe = k([]), D = k([]), me = k(""), se = k([]);
    function Wt(a) {
      if (!a) return "—";
      const e = se.value.find((s) => s.name === a);
      return e ? e.template_name || e.name : a;
    }
    const Qt = k(["Nos", "Kg", "Ltr", "Hrs", "Pcs", "Box"]), Ke = k(""), He = k({ input_cgst: "", input_sgst: "", input_igst: "" }), Ve = k("posting_date"), Se = k("desc");
    let kt = 1;
    const wt = () => ({ id: kt++, item_code: "", item_name: "", description: "", hsn_code: "", qty: 1, rate: 0, uom: "Nos", _standardRate: 0, discount_percentage: 0, discount_amount: 0, amount: 0, tax_code: "", expense_account: "", collapsed: !1, has_batch_no: 0, batch_no: "", batch_expiry_date: "", batchOptions: [], _batchQty: null }), l = pt({ supplier: "", posting_date: Ze(), due_date: "", bill_no: "", bill_date: "", remarks: "", currency: "KES", exchange_rate: 1, update_stock: 1, set_warehouse: "", project: "", billing_address: "", billing_address_name: "", cost_center: "", place_of_supply: "", tds_applicable: !1, tds_section: "", tds_rate: 0, discount_type: "Percentage", additional_discount_percentage: 0, additional_discount_amount: 0 }), O = k([]), { projects: Jt, fetchProjects: Ge } = es(), y = pt({
      open: !1,
      saving: !1,
      address_title: "",
      address_type: "Billing",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "Kenya"
    });
    function _e(a) {
      return a ? [a.address_line1, a.address_line2, a.city, a.state, a.pincode, a.country].filter(Boolean).join(`
`) : "";
    }
    function Xt(a) {
      return a ? a.includes(`
`) ? a : a.split(", ").join(`
`) : "";
    }
    const We = L(
      () => O.value.find((a) => a.name === l.billing_address_name) || null
    );
    async function Qe(a) {
      if (!a) {
        O.value = [];
        return;
      }
      try {
        const e = await I("Dynamic Link", {
          fields: ["parent"],
          filters: [["link_doctype", "=", "Supplier"], ["link_name", "=", a], ["parenttype", "=", "Address"]],
          limit: 50
        });
        if (!(e != null && e.length)) {
          O.value = [];
          return;
        }
        const s = await Promise.all(e.map((n) => ee("Address", n.parent).catch(() => null)));
        O.value = s.filter(Boolean).map((n) => {
          const r = n.address_title || n.name || "", _ = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), b = r.replace(new RegExp("^" + _ + "[-\\s]*", "i"), "").trim() || r || n.address_type || "Address";
          return { ...n, label: `${b}${n.city ? " — " + n.city : ""}${n.address_type ? " (" + n.address_type + ")" : ""}` };
        });
      } catch {
        O.value = [];
      }
    }
    function Yt(a) {
      l.billing_address = a ? _e(a) : "";
    }
    function Zt() {
      Object.assign(y, { open: !0, saving: !1, address_title: "", address_type: "Billing", address_line1: "", address_line2: "", city: "", state: "", pincode: "", country: "Kenya" });
    }
    async function ea() {
      if (!y.address_title.trim()) return h.error("Address Title is required");
      if (!y.address_line1.trim()) return h.error("Address Line 1 is required");
      y.saving = !0;
      try {
        const a = {
          doctype: "Address",
          address_title: y.address_title,
          address_type: y.address_type,
          address_line1: y.address_line1,
          address_line2: y.address_line2 || "",
          city: y.city || "",
          state: y.state || "",
          pincode: y.pincode || "",
          country: y.country || "Kenya",
          links: l.supplier ? [{ doctype: "Address", link_doctype: "Supplier", link_name: l.supplier }] : []
        }, e = await ze(a);
        h.success("Address saved"), await Qe(l.supplier);
        const s = O.value.find((n) => n.name === (e == null ? void 0 : e.name)) || O.value[O.value.length - 1];
        s && (l.billing_address_name = s.name, l.billing_address = _e(s)), y.open = !1;
      } catch (a) {
        h.error(a.message || "Failed to save address");
      }
      y.saving = !1;
    }
    const Je = k([]);
    async function Xe(a = "") {
      try {
        const e = await Oe(), s = await I("Warehouse", { fields: ["name", "parent_warehouse"], filters: [["company", "=", e], ["is_group", "=", 0], ...a ? [["name", "like", `%${a}%`]] : []], limit: 30 });
        Je.value = s.map((n) => ({ label: n.parent_warehouse ? `${n.parent_warehouse} / ${n.name}` : n.name, value: n.name }));
      } catch {
        Je.value = [];
      }
    }
    const Ye = k([]);
    async function ta() {
      try {
        const a = await Oe(), e = await te("frappe.client.get_list", { doctype: "Cost Center", fields: JSON.stringify(["name"]), filters: JSON.stringify([["disabled", "=", 0], ["company", "=", a], ["is_group", "=", 0]]), order_by: "name asc", limit_page_length: 100 }) || [];
        Ye.value = e.map((s) => s.name);
      } catch {
        Ye.value = [];
      }
    }
    function Ze() {
      return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    }
    function w(a) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(Math.abs(v(a)));
    }
    async function j() {
      oe.value = !0;
      try {
        N.value = await I("Purchase Invoice", {
          fields: ["name", "supplier", "supplier_name", "posting_date", "due_date", "bill_no", "grand_total", "outstanding_amount", "docstatus", "status"],
          filters: [["is_return", "=", 0]],
          limit: 1e5,
          order: "posting_date desc, creation desc"
        });
      } catch (a) {
        h.error(a.message || "Failed to load bills");
      } finally {
        oe.value = !1;
      }
    }
    async function aa() {
      try {
        const a = await I("Account", { fields: ["name"], filters: [["account_type", "=", "Tax"], ["is_group", "=", 0]], limit: 1 });
        a != null && a.length && (me.value = a[0].name);
      } catch {
      }
      try {
        const a = await I("Tax Template", { fields: ["name", "template_name", "tax_type"], filters: [["disabled", "=", 0], ["applies_to", "in", ["Purchase", "Both"]]], limit: 100, order: "template_name asc" }), e = await Promise.all((a || []).map(async (s) => {
          var n;
          try {
            const r = await ee("Tax Template", s.name), _ = (r == null ? void 0 : r.taxes) || [], u = _.reduce((F, E) => F + (Number(E.rate) || 0), 0), b = ((n = _ == null ? void 0 : _[0]) == null ? void 0 : n.account_head) || me.value;
            return { name: s.name, template_name: s.template_name, tax_type: s.tax_type || (r == null ? void 0 : r.tax_type) || "GST", rate: Number(u), account: b, taxes: _ };
          } catch {
            return { name: s.name, template_name: s.template_name, tax_type: s.tax_type || "GST", rate: 0, account: me.value, taxes: [] };
          }
        }));
        se.value = e;
      } catch {
        se.value = [];
      }
      try {
        const a = await Oe(), e = await te("psd_books.api.gst.get_company_gst_state", { company: a }) || {};
        Ke.value = e.gst_state || e.state || "", He.value = await te("psd_books.api.gst.get_gst_accounts", { company: a }) || {};
      } catch (a) {
        console.warn("[Bills.vue] loadTaxAccount(): GST state/account lookup failed — CGST/SGST/IGST split may be wrong.", a);
      }
    }
    function xt() {
      return {
        companyState: Ke.value,
        placeOfSupply: l.place_of_supply,
        gst: { cgst: He.value.input_cgst, sgst: He.value.input_sgst, igst: He.value.input_igst },
        defaultAccount: me.value
      };
    }
    function sa(a, e) {
      return (a || []).map((s) => {
        const n = s.tax_code && v(s.amount) ? _t(
          [{ amount: v(s.amount), tax_code: s.tax_code }],
          se.value,
          { companyState: Ke.value, placeOfSupply: e ?? l.place_of_supply, defaultAccount: me.value }
        ) : [], r = (_) => {
          var u;
          return ((u = n.find((b) => b.tax_type === _)) == null ? void 0 : u.rate) || 0;
        };
        return { ...s, taxable_amount: v(s.amount), cgst_rate: r("CGST"), sgst_rate: r("SGST"), igst_rate: r("IGST") };
      });
    }
    const Y = L(() => ({
      draft: N.value.filter((a) => a.docstatus === 0).length,
      unpaid: N.value.filter((a) => a.docstatus === 1 && v(a.outstanding_amount) > 0 && !G(a)).length,
      overdue: N.value.filter((a) => G(a)).length,
      paid: N.value.filter((a) => a.docstatus === 1 && v(a.outstanding_amount) <= 0).length
    })), na = L(() => ({
      totalUnpaid: N.value.filter((a) => a.docstatus === 1 && v(a.outstanding_amount) > 0 && !G(a)).reduce((a, e) => a + v(e.outstanding_amount), 0),
      overdueCount: Y.value.overdue,
      totalDue: N.value.filter((a) => a.docstatus === 1).reduce((a, e) => a + v(e.outstanding_amount), 0)
    })), la = () => {
      const a = /* @__PURE__ */ new Date();
      return `${a.getFullYear()}-${String(a.getMonth() + 1).padStart(2, "0")}`;
    }, Ne = () => {
      const a = /* @__PURE__ */ new Date();
      return a.setMonth(a.getMonth() - 1), `${a.getFullYear()}-${String(a.getMonth() + 1).padStart(2, "0")}`;
    }, Ae = (a, e) => {
      if (!e && !a) return { pct: 0, up: !0 };
      if (!e) return { pct: 100, up: !0 };
      const s = Math.round((a - e) / e * 100);
      return { pct: Math.abs(s), up: s >= 0 };
    }, et = L(() => {
      const a = la(), e = N.value.filter((s) => (s.posting_date || "").startsWith(a));
      return { count: e.length, spend: e.reduce((s, n) => s + v(n.grand_total), 0) };
    }), ia = L(() => {
      const a = N.value.filter((e) => e.grand_total > 0);
      return a.length ? a.reduce((e, s) => e + v(s.grand_total), 0) / a.length : 0;
    }), q = L(() => ({
      total: Ae(et.value.count, N.value.filter((a) => (a.posting_date || "").startsWith(Ne())).length),
      unpaid: Ae(Y.value.unpaid, N.value.filter((a) => (a.posting_date || "").startsWith(Ne()) && a.docstatus === 1 && v(a.outstanding_amount) > 0 && !G(a)).length),
      overdue: Ae(Y.value.overdue, N.value.filter((a) => (a.posting_date || "").startsWith(Ne()) && G(a)).length),
      paid: Ae(Y.value.paid, N.value.filter((a) => (a.posting_date || "").startsWith(Ne()) && a.docstatus === 1 && v(a.outstanding_amount) <= 0).length)
    })), oa = L(() => {
      let a = N.value;
      if (W.value === "draft" && (a = a.filter((e) => e.docstatus === 0)), W.value === "unpaid" && (a = a.filter((e) => e.docstatus === 1 && v(e.outstanding_amount) > 0 && !G(e))), W.value === "overdue" && (a = a.filter((e) => G(e))), W.value === "paid" && (a = a.filter((e) => e.docstatus === 1 && v(e.outstanding_amount) <= 0)), de.value.trim()) {
        const e = de.value.toLowerCase();
        a = a.filter((s) => (s.name || "").toLowerCase().includes(e) || (s.supplier_name || s.supplier || "").toLowerCase().includes(e) || (s.bill_no || "").toLowerCase().includes(e));
      }
      return a;
    }), U = L(() => {
      const a = Ve.value;
      return [...oa.value].sort((e, s) => {
        const n = e[a] ?? "", r = s[a] ?? "", _ = typeof n == "number" ? n - r : String(n).localeCompare(String(r));
        return Se.value === "asc" ? _ : -_;
      });
    }), { page: tt, pageSize: at, paged: st } = as(U, { storageKey: "bills" });
    function be(a) {
      Ve.value === a ? Se.value = Se.value === "asc" ? "desc" : "asc" : (Ve.value = a, Se.value = "asc");
    }
    function ye(a) {
      return Ve.value !== a ? '<span style="color:#d1d5db">⇅</span>' : Se.value === "asc" ? "↑" : "↓";
    }
    const da = L(() => U.value.length > 0 && U.value.every((a) => H.value.has(a.name)));
    function ra(a) {
      const e = new Set(H.value);
      e.has(a) ? e.delete(a) : e.add(a), H.value = e;
    }
    function ua(a) {
      H.value = a.target.checked ? new Set(U.value.map((e) => e.name)) : /* @__PURE__ */ new Set();
    }
    const ca = L(() => {
      const a = c.value;
      return a ? a.docstatus === 2 ? [
        { key: "draft", label: "Draft", done: !0 },
        { key: "submitted", label: "Submitted", done: !0 },
        { key: "cancelled", label: "Cancelled", danger: !0, current: !0 }
      ] : (a.docstatus === 1 && v(a.outstanding_amount) <= 0, G(a), [
        { key: "draft", label: "Draft", done: !0 },
        { key: "submitted", label: "Submitted", done: a.docstatus >= 1, current: a.docstatus === 1 }
      ]) : [];
    });
    async function nt(a, e = !1) {
      var s;
      Gt.value = e, z.value = a.docstatus === 1 ? "submitted" : "normal", P.value = a.name, Object.assign(l, { supplier: a.supplier || "", posting_date: a.posting_date || Ze(), due_date: a.due_date || "", bill_no: a.bill_no || "", bill_date: a.bill_date || "", remarks: a.remark || "", currency: "KES", exchange_rate: 1, update_stock: 1, set_warehouse: "", project: "", billing_address: "", billing_address_name: "", cost_center: "", place_of_supply: "", tds_applicable: !1, tds_section: "", tds_rate: 0, discount_type: "Percentage", additional_discount_percentage: 0, additional_discount_amount: 0 }), O.value = [], D.value = [wt()], St(""), Tt(""), Xe(""), Ge("", a.project || ""), ae.value = !0;
      try {
        const n = await ee("Purchase Invoice", a.name);
        if (n != null && n.project && (l.project = n.project, Ge("", n.project)), (s = n == null ? void 0 : n.items) != null && s.length) {
          D.value = n.items.map((b) => ({
            id: kt++,
            item_code: b.item_code || "",
            item_name: b.item_name || "",
            description: b.description || "",
            hsn_code: b.hsn_code || "",
            qty: b.qty || 1,
            rate: b.rate || 0,
            uom: b.uom || "Nos",
            _standardRate: b.mrp || 0,
            discount_percentage: b.discount_percentage || 0,
            discount_amount: b.discount_amount || 0,
            amount: b.amount || 0,
            tax_code: b.tax_code || "",
            expense_account: b.expense_account || "",
            collapsed: !1,
            has_batch_no: 0,
            batch_no: b.batch_no || "",
            batch_expiry_date: b.batch_expiry_date || "",
            batchOptions: [],
            _batchQty: null,
            // Preserve the child row's own identity + any QC link already
            // stamped on it. Without forwarding `name`, saveBill()'s payload
            // below has no way to tell Frappe "update this row" instead of
            // "insert a new one" — every save/submit would otherwise replace
            // the whole item child table with fresh rows, silently discarding
            // quality_inspection links (and any other row-scoped state) that
            // the QC engine's before_submit hook stamped on the previous rows.
            // That was the root cause of QC Inspections being duplicated on
            // every retry: the gate could never find the inspection that was
            // already completed/passed because the row it was linked to no
            // longer existed by the time of the next submit attempt.
            name: b.name || null,
            quality_inspection: b.quality_inspection || ""
          })), D.value.forEach(he);
          const u = [...new Set(D.value.map((b) => b.item_code).filter(Boolean))];
          if (u.length) {
            try {
              const b = await I("Item", { fields: ["name", "has_batch_no"], filters: [["name", "in", u]], limit: u.length }), F = Object.fromEntries(b.map((E) => [E.name, E.has_batch_no ? 1 : 0]));
              D.value.forEach((E) => {
                E.has_batch_no = F[E.item_code] || 0, E.has_batch_no && it(E, "");
              });
            } catch {
            }
            try {
              await Promise.all(u.map(async (b) => {
                const F = await ee("Item", b);
                D.value.forEach((E) => {
                  E.item_code === b && (E._stock_uom = (F == null ? void 0 : F.stock_uom) || "Nos", E._uom_conversions = (F == null ? void 0 : F.uom_conversions) || []);
                });
              }));
            } catch {
            }
          }
        }
        n != null && n.currency && (l.currency = n.currency), n != null && n.conversion_rate && (l.exchange_rate = n.conversion_rate);
        const r = /tds|194[a-z]?|with.?hold|195/i, _ = (n.taxes || []).find(
          (u) => r.test(u.description || "") || r.test(u.tax_type || "") || Number(u.rate) < 0
        );
        if (_) {
          l.tds_applicable = !0;
          const u = (_.description || _.tax_type || "").match(/194[A-Z]?|192|195/i);
          l.tds_section = u ? u[0].toUpperCase() : l.tds_section || "", l.tds_rate = Math.abs(Number(_.rate) || 0) || (V[l.tds_section] ?? 10);
        }
        if (n != null && n.remark && (l.remarks = n.remark), n != null && n.discount_type && (l.discount_type = n.discount_type), n != null && n.additional_discount_percentage && (l.additional_discount_percentage = v(n.additional_discount_percentage)), n != null && n.additional_discount_amount && (l.additional_discount_amount = v(n.additional_discount_amount)), (n == null ? void 0 : n.update_stock) !== void 0 && (l.update_stock = n.update_stock ? 1 : 0), n != null && n.set_warehouse && (l.set_warehouse = n.set_warehouse), n != null && n.billing_address && (l.billing_address = n.billing_address), n != null && n.cost_center && (l.cost_center = n.cost_center), n != null && n.place_of_supply && (l.place_of_supply = n.place_of_supply), a.supplier && (await Qe(a.supplier), n != null && n.billing_address_name)) {
          l.billing_address_name = n.billing_address_name;
          const u = O.value.find((b) => b.name === n.billing_address_name);
          u && (l.billing_address = _e(u));
        }
      } catch {
      }
    }
    const Ee = k({}), Ct = L(
      () => {
        var a;
        return (a = c.value) != null && a.billing_address_name && Ee.value[c.value.billing_address_name] || null;
      }
    );
    async function B(a) {
      c.value = a, ue.value = !0, ce.value = "details", Be.value = !0, X.value = [], pe.value = [], ve.value = [], Ce.value = [];
      try {
        const [e, s, n] = await Promise.all([
          ee("Purchase Invoice", a.name),
          a.docstatus === 1 ? te("psd_books.api.docs.get_bill_payments", { bill_name: a.name }) : Promise.resolve([]),
          a.docstatus === 1 ? te("psd_books.api.docs.get_bill_debit_applications", { bill_name: a.name }).catch(() => []) : Promise.resolve([])
        ]);
        X.value = (e == null ? void 0 : e.items) || [], ve.value = (e == null ? void 0 : e.taxes) || [], pe.value = (s || []).filter((r) => r.docstatus === 1), Ce.value = n || [], e && (c.value = {
          ...c.value,
          outstanding_amount: e.outstanding_amount ?? c.value.outstanding_amount,
          grand_total: e.grand_total ?? c.value.grand_total,
          docstatus: e.docstatus ?? c.value.docstatus,
          status: e.status ?? c.value.status,
          due_date: e.due_date || c.value.due_date,
          posting_time: e.posting_time || "",
          cost_center: e.cost_center,
          project: e.project || "",
          place_of_supply: e.place_of_supply,
          set_warehouse: e.set_warehouse,
          billing_address: e.billing_address,
          billing_address_name: e.billing_address_name,
          remark: e.remark || "",
          discount_type: e.discount_type || "Percentage",
          additional_discount_percentage: e.additional_discount_percentage,
          additional_discount_amount: e.additional_discount_amount,
          owner: e.owner,
          creation: e.creation,
          modified: e.modified,
          modified_by: e.modified_by
        }), e != null && e.billing_address_name && !Ee.value[e.billing_address_name] && ee("Address", e.billing_address_name).then((r) => {
          r && (Ee.value = { ...Ee.value, [e.billing_address_name]: r });
        }).catch(() => {
        });
      } catch {
      }
      Be.value = !1;
    }
    async function St(a = "") {
      try {
        const e = [["disabled", "=", 0]];
        a && e.push(["supplier_name", "like", "%" + a + "%"]);
        const s = await I("Supplier", { fields: ["name", "supplier_name"], filters: e, limit: 30, order: "supplier_name asc" });
        qe.value = s.map((n) => ({ ...n, label: n.supplier_name || n.name, value: n.name }));
      } catch {
        qe.value = [];
      }
    }
    const Pe = k({});
    function lt(a, e, s) {
      a && (Pe.value = { ...Pe.value, [a]: [...new Set([e, s].filter(Boolean))] });
    }
    function pa(a) {
      const e = [...Pe.value[a.item_code] || []];
      return a.uom && !e.includes(a.uom) && e.push(a.uom), e;
    }
    async function va(a) {
      const e = [...new Set((a || []).filter((s) => s && !Pe.value[s]))];
      if (e.length)
        try {
          (await I("Item", { fields: ["name", "stock_uom", "purchase_uom"], filters: [["name", "in", e]], limit: e.length })).forEach((n) => lt(n.name, n.stock_uom, n.purchase_uom));
        } catch {
        }
    }
    vt(() => D.value.map((a) => a.item_code), (a) => va(a), { immediate: !0 });
    async function Tt(a = "") {
      try {
        const e = [["disabled", "=", 0]];
        a && e.push(["item_name", "like", "%" + a + "%"]);
        const s = await I("Item", { fields: ["name", "item_name", "description", "standard_rate", "standard_buying_rate", "mrp", "stock_uom", "purchase_uom", "hsn_code", "default_purchase_tax_template", "expense_account"], filters: [...e, ["has_variants", "=", 0], ["is_purchase_item", "=", 1]], limit: 30, order: "item_name asc" });
        Fe.value = s.map((n) => ({ ...n, label: n.item_name || n.name, value: n.name, rate: n.standard_buying_rate || n.standard_rate || 0, mrp: n.mrp || n.standard_buying_rate || n.standard_rate || 0, stock_uom: n.stock_uom || "Nos", purchase_uom: n.purchase_uom || "", hsn_code: n.hsn_code || "", description: n.description || "", tax_code: n.default_purchase_tax_template || "", expense_account: n.expense_account || "" }));
      } catch {
        Fe.value = [];
      }
    }
    vt(() => l.supplier, async (a) => {
      if (!a) {
        l.tds_applicable = !1, l.tds_section = "", l.tds_rate = 0, l.place_of_supply = "";
        return;
      }
      try {
        const e = await te("psd_books.api.docs.get_doc", { doctype: "Supplier", name: a });
        l.place_of_supply = $e(e == null ? void 0 : e.state) || $e(Ja(e == null ? void 0 : e.tax_id)) || "", e != null && e.tds_applicable ? (l.tds_applicable = !0, l.tds_section = e.tds_section || "", l.tds_rate = V[e.tds_section] ?? 10) : (l.tds_applicable = !1, l.tds_section = "", l.tds_rate = 0);
      } catch {
      }
    });
    async function ma(a) {
      if (l.billing_address = "", l.billing_address_name = "", O.value = [], !l.supplier) return;
      await Qe(l.supplier);
      const e = O.value.find((s) => (s.address_type || "").toLowerCase() === "billing") || O.value[0];
      e && (l.billing_address_name = e.name, l.billing_address = _e(e));
    }
    async function _a(a, e) {
      var s;
      if (a.item_code = (e == null ? void 0 : e.value) ?? e, (e == null ? void 0 : e.rate) !== void 0 && (a.rate = Number(e.rate) || 0), e != null && e.item_name && (a.item_name = e.item_name), (e == null ? void 0 : e.tax_code) !== void 0 && (a.tax_code = e.tax_code || ""), e != null && e.description && (a.description = e.description), (e == null ? void 0 : e.hsn_code) !== void 0 && (a.hsn_code = e.hsn_code || ""), a.uom = (e == null ? void 0 : e.purchase_uom) || (e == null ? void 0 : e.stock_uom) || "Nos", lt(e == null ? void 0 : e.value, e == null ? void 0 : e.stock_uom, e == null ? void 0 : e.purchase_uom), a._stock_uom = (e == null ? void 0 : e.stock_uom) || "Nos", a._uom_conversions = [], a._standardRate = v(e == null ? void 0 : e.mrp) || v(e == null ? void 0 : e.rate) || 0, a.expense_account = (e == null ? void 0 : e.expense_account) || "", e != null && e.value)
        try {
          const n = await ee("Item", e.value);
          n != null && n.description && (a.description = n.description), n != null && n.item_name && (a.item_name = n.item_name), n != null && n.default_purchase_tax_template && (a.tax_code = n.default_purchase_tax_template), n != null && n.expense_account && (a.expense_account = n.expense_account), n != null && n.hsn_code && (a.hsn_code = n.hsn_code), n != null && n.stock_uom && (a._stock_uom = n.stock_uom), lt(e.value, n == null ? void 0 : n.stock_uom, n == null ? void 0 : n.purchase_uom), a.uom || (a.uom = (n == null ? void 0 : n.purchase_uom) || (n == null ? void 0 : n.stock_uom) || "Nos"), a._uom_conversions = (n == null ? void 0 : n.uom_conversions) || [], a._standardRate = v(n == null ? void 0 : n.mrp) || v(n == null ? void 0 : n.standard_buying_rate) || v(n == null ? void 0 : n.standard_rate) || a._standardRate || 0;
        } catch {
        }
      if (a.batch_no = "", a.batch_expiry_date = "", a._batchQty = null, a.batchOptions = [], a.item_code) {
        try {
          a.has_batch_no = (s = (await I("Item", { fields: ["has_batch_no"], filters: [["name", "=", a.item_code]], limit: 1 }))[0]) != null && s.has_batch_no ? 1 : 0;
        } catch {
          a.has_batch_no = 0;
        }
        a.has_batch_no && it(a, "");
      } else
        a.has_batch_no = 0;
      he(a);
    }
    async function it(a, e = "") {
      var n;
      if (!a.item_code) {
        a.batchOptions = [];
        return;
      }
      const s = a.item_code;
      try {
        let r = await te("psd_books.api.inventory.get_batches_for_item", { item_code: s, search: e || "" }) || [];
        if (!r.length && !e)
          try {
            const u = (n = (await I("Item", { fields: ["name", "item_name"], filters: [["name", "=", s]], limit: 1 }))[0]) == null ? void 0 : n.item_name;
            if (u) {
              const b = await I("Item", { fields: ["name"], filters: [["item_name", "=", u], ["name", "!=", s]], limit: 5 });
              for (const F of b) {
                const E = await te("psd_books.api.inventory.get_batches_for_item", { item_code: F.name, search: "" }) || [];
                if (E.length) {
                  r = E;
                  break;
                }
              }
            }
          } catch {
          }
        if (a.item_code !== s) return;
        if (a.batchOptions = r.map((_) => ({
          value: _.batch_no,
          label: _.qty !== void 0 && _.qty !== null ? `${_.batch_no} (Qty: ${_.qty})` : _.batch_no,
          qty: v(_.qty),
          expiry_date: _.expiry_date || ""
        })), a.batch_no) {
          const _ = a.batchOptions.find((u) => u.value === a.batch_no);
          _ && (a._batchQty = _.qty, a.batch_expiry_date = _.expiry_date);
        }
      } catch {
        a.item_code === s && (a.batchOptions = []);
      }
    }
    function ba(a, e) {
      a.batch_no = (e == null ? void 0 : e.value) ?? e;
      const s = a.batchOptions.find((n) => n.value === a.batch_no);
      a._batchQty = s ? s.qty : null, a.batch_expiry_date = s ? s.expiry_date : "";
    }
    function ya(a, e) {
      a.batch_no = e, a._batchQty = null, a.batch_expiry_date = "";
    }
    function ha() {
      D.value.push(wt());
    }
    function fa(a) {
      D.value.length > 1 && (D.value = D.value.filter((e) => e.id !== a));
    }
    function Te(a) {
      return a == null ? "—" : Number(a).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function Lt(a) {
      const e = a._stock_uom;
      if (!e || !a.uom || a.uom === e) return "";
      const n = (a._uom_conversions || []).find((u) => u.uom === a.uom), r = n ? v(n.conversion_factor) : 0;
      if (!r) return "";
      const _ = v(a.qty) * r;
      return `= ${Te(_)} ${e}`;
    }
    function he(a) {
      a.discount_percentage > 100 && (a.discount_percentage = 100), a.discount_percentage < 0 && (a.discount_percentage = 0);
      const e = Math.round(v(a.qty) * v(a.rate) * 100) / 100, s = Math.round(e * v(a.discount_percentage) / 100 * 100) / 100;
      a.discount_amount = s, a.amount = e - s;
    }
    function Ue(a) {
      return !a.has_batch_no || !a.item_code || a.batch_no ? "" : `${a.item_name || a.item_code} is batch-tracked — select a Batch No`;
    }
    const Ie = L(() => D.value.reduce((a, e) => a + v(e.amount), 0)), fe = L(() => Ya(
      Ie.value,
      l.discount_type,
      l.discount_type === "Amount" ? l.additional_discount_amount : l.additional_discount_percentage
    ));
    vt(fe, (a) => {
      l.discount_type === "Percentage" && (l.additional_discount_amount = a);
    });
    const ot = L(() => Math.round((Ie.value - fe.value) * 100) / 100), $t = L(() => Za(D.value, fe.value)), dt = L(
      () => _t($t.value, se.value, xt()).map((a) => ({ template: a.description, description: a.description, tax_type: a.tax_type, rate: a.rate, account_head: a.account_head, amount: a.amount }))
    ), ga = L(() => dt.value.reduce((a, e) => a + e.amount, 0)), rt = L(() => l.tds_applicable && l.tds_rate > 0 ? Math.round(ot.value * l.tds_rate / 100 * 100) / 100 : 0), ut = L(() => ot.value + ga.value - rt.value), ct = L(() => Math.round((Math.round(ut.value) - ut.value) * 100) / 100), ka = L(() => Math.round(ut.value)), wa = L(() => X.value.reduce((a, e) => a + v(e.amount), 0)), Mt = L(() => {
      var a;
      return v((a = c.value) == null ? void 0 : a.additional_discount_amount);
    }), Dt = L(
      () => (ve.value || []).filter((a) => v(a.rate) >= 0 && v(a.tax_amount) >= 0).map((a) => ({ template: a.description || a.tax_type || a.account_head || "Tax", rate: v(a.rate), amount: v(a.tax_amount) }))
    ), Le = L(() => {
      const a = (ve.value || []).find((e) => v(e.rate) < 0 || v(e.tax_amount) < 0);
      return a ? { label: a.description || "TDS", rate: Math.abs(v(a.rate)), amount: Math.abs(v(a.tax_amount)) } : null;
    });
    async function Bt(a) {
      if (!l.supplier) return h.error("Vendor is required");
      if (!D.value.some((s) => s.item_code && v(s.qty) > 0)) return h.error("At least one item required");
      if (l.update_stock && !l.set_warehouse) return h.error("Receiving Warehouse is required when Update Inventory is on");
      const e = D.value.filter((s) => s.item_code && v(s.qty) > 0);
      if (l.update_stock) {
        const s = e.map(Ue).find(Boolean);
        if (s) {
          h.error(s);
          return;
        }
        for (const n of e) {
          if (!n.has_batch_no || !n.batch_no) continue;
          const r = await I("Batch", { fields: ["name", "disabled", "item"], filters: [["name", "=", n.batch_no]], limit: 1 }).catch(() => []);
          if (r.length && r[0].disabled) {
            h.error(`Batch "${n.batch_no}" is disabled and can't be used.`);
            return;
          }
          if (r.length && r[0].item && r[0].item !== n.item_code) {
            h.error(`Batch "${n.batch_no}" already exists for item "${r[0].item}", not "${n.item_code}".`);
            return;
          }
          r.length || await ze({
            doctype: "Batch",
            batch_no: n.batch_no,
            item: n.item_code,
            warehouse: l.set_warehouse || null,
            expiry_date: n.batch_expiry_date || null,
            batch_qty: 0
          });
        }
      }
      re.value = !0;
      try {
        const s = await Oe(), n = _t($t.value.filter((u) => u.item_code), se.value, xt()).map((u) => ({ doctype: "Tax Line", charge_type: "On Net Total", account_head: u.account_head, description: u.description, rate: u.rate, tax_type: u.tax_type, tax_amount: u.amount }));
        l.tds_applicable && l.tds_rate > 0 && l.tds_section && n.push({
          doctype: "Tax Line",
          charge_type: "On Net Total",
          account_head: me.value || "TDS Payable",
          description: `TDS u/s ${l.tds_section}`,
          rate: -l.tds_rate
        });
        const r = {
          doctype: "Purchase Invoice",
          company: s,
          supplier: l.supplier,
          posting_date: l.posting_date,
          due_date: l.due_date || null,
          bill_no: l.bill_no || "",
          bill_date: l.bill_date || null,
          remark: l.remarks || "",
          update_stock: l.update_stock ? 1 : 0,
          set_warehouse: l.set_warehouse || "",
          billing_address: l.billing_address || "",
          billing_address_name: l.billing_address_name || "",
          project: l.project || null,
          cost_center: l.cost_center || "",
          place_of_supply: l.place_of_supply || "",
          currency: l.currency || "KES",
          conversion_rate: l.currency === "KES" ? 1 : l.exchange_rate || 1,
          discount_type: l.discount_type || "Percentage",
          additional_discount_percentage: l.discount_type === "Percentage" ? v(l.additional_discount_percentage) : 0,
          additional_discount_amount: v(fe.value),
          items: e.map((u) => ({
            // Forward the existing child row's own name (when this line came
            // from an already-saved bill via openEdit) so Frappe updates that
            // row in place instead of deleting it and inserting a new one.
            // Row identity is what the QC engine's `quality_inspection` link
            // (and any other row-scoped stamping) depends on — recreating the
            // row every save silently orphaned that link. Also forward
            // quality_inspection itself so a link stamped by a prior
            // before_submit hook survives the mandatory save-before-submit.
            ...u.name ? { name: u.name } : {},
            doctype: "Purchase Invoice Item",
            item_code: u.item_code,
            item_name: u.item_name || u.item_code,
            description: u.description || u.item_code,
            hsn_code: u.hsn_code || "",
            uom: u.uom || "Nos",
            qty: v(u.qty) || 1,
            rate: v(u.rate),
            mrp: v(u._standardRate) || 0,
            amount: v(u.amount),
            discount_percentage: v(u.discount_percentage) || 0,
            discount_amount: v(u.discount_amount) || 0,
            tax_code: u.tax_code || "",
            expense_account: u.expense_account || "",
            batch_no: l.update_stock && u.has_batch_no ? u.batch_no : "",
            batch_expiry_date: l.update_stock && u.has_batch_no && u.batch_expiry_date || "",
            quality_inspection: u.quality_inspection || ""
          })),
          taxes: n
        };
        if (P.value && (r.name = P.value), l.update_stock)
          for (const u of e) {
            if (!u.has_batch_no || !u.batch_no) continue;
            (await I("Batch", { fields: ["name"], filters: [["name", "=", u.batch_no]], limit: 1 })).length || await ze({
              doctype: "Batch",
              batch_no: u.batch_no,
              item: u.item_code,
              warehouse: l.set_warehouse || null,
              batch_qty: 0,
              expiry_date: u.batch_expiry_date || null
            });
          }
        const _ = await ze(r);
        if (a && (_ != null && _.name) && await Et("Purchase Invoice", _.name), h.success(
          `Bill ${(_ == null ? void 0 : _.name) || ""} ${a ? "submitted" : "saved"}`
        ), ae.value = !1, await j(), _ != null && _.name)
          try {
            const u = await ee("Purchase Invoice", _.name);
            u && (c.value = {
              ...c.value,
              ...u
            }, X.value = u.items || [], ve.value = u.taxes || []);
          } catch (u) {
            console.error("Failed to refresh bill drawer:", u);
          }
      } catch (s) {
        h.error(s.message || "Failed to save bill");
      } finally {
        re.value = !1;
      }
    }
    async function xa(a) {
      await ft({
        doctype: "Purchase Invoice",
        name: a.name,
        docLabel: `Bill ${a.name}`,
        getDefaultsEndpoint: "psd_books.api.docs.get_bill_email_defaults",
        sendEndpoint: "psd_books.api.docs.send_bill_email",
        paramKey: "bill_name",
        printConfig: { title: "BILL", partyLabel: "Vendor", partyField: "supplier_name" }
      });
    }
    async function Ht(a) {
      var s;
      if (!S("payments")) {
        h("Read-only access", "error");
        return;
      }
      await gt({
        direction: "pay",
        doctype: "Purchase Invoice",
        name: a.name,
        party: a.supplier,
        partyLabel: a.supplier_name || a.supplier,
        balance: v(a.outstanding_amount),
        getDefaultsEndpoint: "psd_books.api.docs.get_bill_payment_defaults",
        sendEndpoint: "psd_books.api.docs.record_vendor_payment",
        paramKey: "bill_name"
      }) && (await j(), ((s = c.value) == null ? void 0 : s.name) === a.name && await B(a));
    }
    async function Ca(a) {
      var n;
      let e = X.value;
      if (!e.length)
        try {
          const r = await ee("Purchase Invoice", a.name);
          e = (r == null ? void 0 : r.items) || [];
        } catch {
          e = [];
        }
      await jt({
        kind: "debit",
        parentName: a.name,
        party: a.supplier,
        invoiceTotal: v(a.grand_total),
        items: e.map((r) => ({
          item_code: r.item_code,
          item_name: r.item_name,
          description: r.description,
          qty: r.qty,
          rate: r.rate,
          uom: r.uom,
          batch_no: r.batch_no,
          batch_expiry_date: r.batch_expiry_date
        })),
        existingEndpoint: "psd_books.api.docs.get_debit_notes",
        createEndpoint: "psd_books.api.docs.create_debit_note",
        paramKey: "bill_name",
        partyKey: "vendor",
        parentKey: "against_bill"
      }) && (await j(), ((n = c.value) == null ? void 0 : n.name) === a.name && await B(a));
    }
    async function Sa(a) {
      const { openMakeRecurring: e } = qa(), s = await e({
        doctype: "Purchase Invoice",
        name: a.name,
        partyLabel: a.supplier_name || a.supplier || "",
        amount: a.grand_total || 0
      });
      s && h(`Recurring subscription ${s} created`);
    }
    async function Ta(a) {
      if (await Me({ title: "Submit Bill", body: `Submit ${a.name}? This will post it to the ledger and it can no longer be edited.`, okLabel: "Submit Bill" }))
        try {
          const e = await Et("Purchase Invoice", a.name);
          h.success("Bill submitted"), await j(), await B({ name: a.name });
        } catch (e) {
          e.message !== "Submission cancelled by user" && h.error(e.message || "Submit failed");
        }
    }
    async function La(a) {
      var n, r;
      let e = [];
      try {
        e = await te("psd_books.api.docs.get_bill_payments", { bill_name: a.name }) || [];
      } catch {
      }
      const s = e.filter((_) => _.docstatus === 1);
      if (s.length) {
        if (!await zt({
          title: "Cancel Bill & Payments",
          message: `${a.name} has ${s.length} linked payment(s). Both must be cancelled together.`,
          actionLabel: "Cancel Both",
          links: s.map((u) => ({ name: u.name, mode: u.mode_of_payment, date: u.payment_date, amount: u.paid_amount }))
        })) return;
        try {
          await mt("psd_books.api.docs.cancel_bill_with_payments", { bill_name: a.name }), h.success("Bill and payment(s) cancelled"), await j(), ((n = c.value) == null ? void 0 : n.name) === a.name && await B(a);
        } catch (u) {
          h.error(u.message || "Cancel failed");
        }
      } else {
        if (!await Me({ title: "Cancel Bill", body: `Cancel ${a.name}? This cannot be undone.`, okLabel: "Cancel Bill" })) return;
        try {
          await mt("psd_books.api.docs.cancel_doc", { doctype: "Purchase Invoice", name: a.name }), h.success("Bill cancelled"), await j(), ((r = c.value) == null ? void 0 : r.name) === a.name && await B(a);
        } catch (_) {
          h.error(_.message || "Cancel failed");
        }
      }
    }
    async function Re(a) {
      if (!ie("bills")) {
        h("Not permitted", "error");
        return;
      }
      if (await Me({ title: "Delete Bill", body: `Permanently delete ${a.name}? This cannot be undone.`, okLabel: "Delete" }))
        try {
          await Pt("Purchase Invoice", a.name), h.success("Bill deleted"), ue.value = !1, await j();
        } catch (e) {
          h.error(e.message || "Delete failed");
        }
    }
    async function $a() {
      if (!ie("bills")) {
        h("Not permitted", "error");
        return;
      }
      const a = U.value.filter((e) => H.value.has(e.name) && e.docstatus === 0);
      if (!a.length) {
        h.info("No draft bills selected");
        return;
      }
      if (await Me({ title: "Delete Drafts", body: `Delete ${a.length} draft bill(s)?`, okLabel: "Delete" })) {
        for (const e of a)
          try {
            await Pt("Purchase Invoice", e.name);
          } catch {
          }
        H.value = /* @__PURE__ */ new Set(), h.success(`Deleted ${a.length} draft bill(s)`), await j();
      }
    }
    async function Ma() {
      if (!ie("bills")) {
        h("Not permitted", "error");
        return;
      }
      const a = U.value.filter((n) => H.value.has(n.name) && n.docstatus === 1);
      if (!a.length) {
        h.info("No submitted bills selected");
        return;
      }
      let e = 0, s = 0;
      for (const n of a)
        try {
          await mt("psd_books.api.docs.cancel_bill_with_payments", { bill_name: n.name }), e++;
        } catch {
          s++;
        }
      H.value = /* @__PURE__ */ new Set(), h.success(`Cancelled ${e} bill(s)${s ? `; ${s} failed` : ""}`), await j();
    }
    async function Da() {
      if (!S("payments")) {
        h.error("Read-only access");
        return;
      }
      const a = U.value.filter(
        (n) => H.value.has(n.name) && n.docstatus === 1 && v(n.outstanding_amount) > 0
      );
      if (!a.length) {
        h.info("No payable bills selected — must be submitted with a balance due");
        return;
      }
      if (new Set(a.map((n) => n.supplier)).size > 1) {
        h.error("Select bills from a single vendor to record one payment together");
        return;
      }
      await gt({
        multi: !0,
        direction: "pay",
        party: a[0].supplier,
        partyLabel: a[0].supplier_name || a[0].supplier,
        invoices: a.map((n) => ({
          name: n.name,
          due_date: n.due_date,
          outstanding_amount: v(n.outstanding_amount)
        })),
        getDefaultsEndpoint: "psd_books.api.docs.get_bill_payment_defaults",
        sendEndpoint: "psd_books.api.docs.record_vendor_payment_multi",
        paramKey: "bill_name"
      }) && (H.value = /* @__PURE__ */ new Set(), h.success(`Payment recorded across ${a.length} bill(s)`), await j());
    }
    async function Ba() {
      if (!R("bills")) {
        h("Read-only access", "error");
        return;
      }
      const a = U.value.filter((s) => H.value.has(s.name) && s.docstatus === 1);
      if (!a.length) {
        h.info("No submitted bills selected");
        return;
      }
      let e = 0;
      for (const s of a)
        await ft({
          doctype: "Purchase Invoice",
          name: s.name,
          docLabel: `Bill ${s.name}`,
          getDefaultsEndpoint: "psd_books.api.docs.get_bill_email_defaults",
          sendEndpoint: "psd_books.api.docs.send_bill_email",
          paramKey: "bill_name",
          printConfig: { title: "BILL", partyLabel: "Vendor", partyField: "supplier_name" }
        }) && e++;
      e && h.success(`Emailed ${e} bill(s)`);
    }
    function Vt() {
      const a = H.value.size ? U.value.filter((b) => H.value.has(b.name)) : U.value;
      if (!a.length) return;
      const e = ["Bill #", "Vendor", "Vendor Bill #", "Date", "Due Date", "Status", "Amount", "Balance"], s = (b) => `"${String(b ?? "").replace(/"/g, '""')}"`, n = [e.map(s).join(",")];
      for (const b of a)
        n.push([
          b.name,
          b.supplier_name || b.supplier,
          b.bill_no || "",
          b.posting_date || "",
          b.due_date || "",
          we(b),
          Number(b.grand_total || 0).toFixed(2),
          Number(b.outstanding_amount || 0).toFixed(2)
        ].map(s).join(","));
      const r = new Blob(["\uFEFF" + n.join(`
`)], { type: "text/csv;charset=utf-8" }), _ = URL.createObjectURL(r), u = document.createElement("a");
      u.href = _, u.download = `bills_${Ze()}.csv`, u.click(), URL.revokeObjectURL(_), h.success(`CSV exported — ${a.length} bill(s)`);
    }
    return Aa(async () => {
      Ot(window.__booksCompany || ""), document.addEventListener("click", ht), await j(), aa(), ta(), I("UOM", { fields: ["name"], order: "name asc", limit: 200 }).then((a) => {
        a && a.length && (Qt.value = a.map((e) => e.name));
      }).catch(() => {
      }), Xa({ route: je, openByName: (a) => B(N.value.find((e) => e.name === a) || { name: a }) });
    }), Ea(() => document.removeEventListener("click", ht)), (a, e) => (o(), d("div", os, [
      t("div", ds, [
        t("div", rs, [
          t("span", {
            innerHTML: p(f)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, us),
          T(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => de.value = s),
            placeholder: "Search bills, vendors, bill #…",
            class: "sales-search-input"
          }, null, 512), [
            [$, de.value]
          ])
        ]),
        t("div", cs, [
          (o(), d(x, null, M(Kt, (s) => t("button", {
            key: s.key,
            class: C(["sales-pill", { active: W.value === s.key, ["pill-" + s.key]: s.key !== "all" }]),
            onClick: (n) => W.value = s.key
          }, [
            g(i(s.label) + " ", 1),
            s.key !== "all" ? (o(), d("span", vs, i(Y.value[s.key]), 1)) : m("", !0)
          ], 10, ps)), 64))
        ]),
        t("div", ms, [
          t("button", {
            class: "sales-btn-ghost view-toggle-btn",
            onClick: e[1] || (e[1] = (s) => xe.value = xe.value === "table" ? "grid" : "table"),
            title: xe.value === "table" ? "Grid View" : "List View"
          }, [
            t("span", {
              innerHTML: p(f)(xe.value === "table" ? "grid" : "file", 14)
            }, null, 8, bs)
          ], 8, _s),
          t("button", {
            class: "sales-btn-ghost",
            onClick: j,
            title: "Refresh"
          }, [
            t("span", {
              innerHTML: p(f)("refresh", 14)
            }, null, 8, ys)
          ]),
          t("button", {
            class: "sales-btn-ghost",
            onClick: Vt,
            title: "Export CSV"
          }, [
            t("span", {
              innerHTML: p(f)("download", 14)
            }, null, 8, hs),
            e[69] || (e[69] = g(" CSV", -1))
          ])
        ])
      ]),
      t("div", fs, [
        t("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: e[2] || (e[2] = (s) => W.value = "all")
        }, [
          t("div", gs, [
            e[71] || (e[71] = t("div", {
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
            t("div", ks, [
              e[70] || (e[70] = t("div", { class: "bk-kpi-label" }, "Total Bills", -1)),
              t("div", ws, i(N.value.length), 1),
              t("div", {
                class: C(["bk-kpi-trend", q.value.total.up ? "bk-trend-up" : "bk-trend-down"])
              }, i(q.value.total.up ? "↑" : "↓") + " " + i(q.value.total.pct) + "% vs last month", 3)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card clickable",
          onClick: e[3] || (e[3] = (s) => W.value = "draft")
        }, [
          t("div", xs, [
            e[74] || (e[74] = t("div", {
              class: "bk-kpi-icon",
              style: { background: "#f1f5f9" }
            }, [
              t("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#6b7280",
                "stroke-width": "1.8"
              }, [
                t("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                t("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
              ])
            ], -1)),
            t("div", Cs, [
              e[72] || (e[72] = t("div", { class: "bk-kpi-label" }, "Draft", -1)),
              t("div", Ss, i(Y.value.draft), 1),
              e[73] || (e[73] = t("div", { class: "bk-kpi-trend bk-trend-neutral" }, "— drafts", -1))
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: e[4] || (e[4] = (s) => W.value = "unpaid")
        }, [
          t("div", Ts, [
            e[76] || (e[76] = Q('<div class="bk-kpi-icon" style="background:#fef3c7;" data-v-00c5eab7><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="1.8" data-v-00c5eab7><circle cx="12" cy="12" r="10" data-v-00c5eab7></circle><line x1="12" y1="8" x2="12" y2="12" data-v-00c5eab7></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-00c5eab7></line></svg></div>', 1)),
            t("div", Ls, [
              e[75] || (e[75] = t("div", { class: "bk-kpi-label" }, "Unpaid", -1)),
              t("div", $s, i(Y.value.unpaid), 1),
              t("div", {
                class: C(["bk-kpi-trend", q.value.unpaid.up ? "bk-trend-up" : "bk-trend-down"])
              }, i(q.value.unpaid.up ? "↑" : "↓") + " " + i(q.value.unpaid.pct) + "% vs last month", 3)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card bk-kpi-danger clickable",
          onClick: e[5] || (e[5] = (s) => W.value = "overdue")
        }, [
          t("div", Ms, [
            e[78] || (e[78] = Q('<div class="bk-kpi-icon" style="background:#fee2e2;" data-v-00c5eab7><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.8" data-v-00c5eab7><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" data-v-00c5eab7></path><line x1="12" y1="9" x2="12" y2="13" data-v-00c5eab7></line><line x1="12" y1="17" x2="12.01" y2="17" data-v-00c5eab7></line></svg></div>', 1)),
            t("div", Ds, [
              e[77] || (e[77] = t("div", { class: "bk-kpi-label" }, "Overdue", -1)),
              t("div", Bs, i(Y.value.overdue), 1),
              t("div", {
                class: C(["bk-kpi-trend", q.value.overdue.up ? "bk-trend-down" : "bk-trend-up"])
              }, i(q.value.overdue.up ? "↑" : "↓") + " " + i(q.value.overdue.pct) + "% vs last month", 3)
            ])
          ])
        ]),
        t("div", {
          class: "bk-kpi-card bk-kpi-success clickable",
          onClick: e[6] || (e[6] = (s) => W.value = "paid")
        }, [
          t("div", Hs, [
            e[80] || (e[80] = t("div", {
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
            t("div", Vs, [
              e[79] || (e[79] = t("div", { class: "bk-kpi-label" }, "Paid", -1)),
              t("div", Ns, i(Y.value.paid), 1),
              t("div", {
                class: C(["bk-kpi-trend", q.value.paid.up ? "bk-trend-up" : "bk-trend-down"])
              }, i(q.value.paid.up ? "↑" : "↓") + " " + i(q.value.paid.pct) + "% vs last month", 3)
            ])
          ])
        ])
      ]),
      t("div", As, [
        t("div", Es, [
          t("div", Ps, [
            t("div", null, [
              e[81] || (e[81] = t("div", { class: "bk-stat-label" }, "This Month Bills", -1)),
              t("div", Us, i(et.value.count), 1)
            ]),
            e[82] || (e[82] = Q('<div class="bk-stat-icon" style="background:#dbeafe;color:#2563eb;" data-v-00c5eab7><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00c5eab7><rect x="3" y="4" width="18" height="18" rx="2" data-v-00c5eab7></rect><line x1="16" y1="2" x2="16" y2="6" data-v-00c5eab7></line><line x1="8" y1="2" x2="8" y2="6" data-v-00c5eab7></line><line x1="3" y1="10" x2="21" y2="10" data-v-00c5eab7></line></svg></div>', 1))
          ])
        ]),
        t("div", Is, [
          t("div", Rs, [
            t("div", null, [
              e[83] || (e[83] = t("div", { class: "bk-stat-label" }, "This Month Spend", -1)),
              t("div", Os, i(w(et.value.spend)), 1)
            ]),
            e[84] || (e[84] = Q('<div class="bk-stat-icon" style="background:#fee2e2;color:#dc2626;" data-v-00c5eab7><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-00c5eab7><path d="M6 3h12" data-v-00c5eab7></path><path d="M6 8h12" data-v-00c5eab7></path><path d="m6 13 8.5 8" data-v-00c5eab7></path><path d="M6 13h3" data-v-00c5eab7></path><path d="M9 13c6.667 0 6.667-10 0-10" data-v-00c5eab7></path></svg></div>', 1))
          ])
        ]),
        t("div", zs, [
          t("div", js, [
            t("div", null, [
              e[85] || (e[85] = t("div", { class: "bk-stat-label" }, "Total Payable", -1)),
              t("div", qs, i(w(na.value.totalDue)), 1)
            ]),
            e[86] || (e[86] = t("div", {
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
                t("rect", {
                  x: "1",
                  y: "4",
                  width: "22",
                  height: "16",
                  rx: "2"
                }),
                t("line", {
                  x1: "1",
                  y1: "10",
                  x2: "23",
                  y2: "10"
                })
              ])
            ], -1))
          ])
        ]),
        t("div", Fs, [
          t("div", Ks, [
            t("div", null, [
              e[87] || (e[87] = t("div", { class: "bk-stat-label" }, "Avg Bill Value", -1)),
              t("div", Gs, i(w(ia.value)), 1)
            ]),
            e[88] || (e[88] = Q('<div class="bk-stat-icon" style="background:#e5e7eb;color:#6b7280;" data-v-00c5eab7><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00c5eab7><line x1="18" y1="20" x2="18" y2="10" data-v-00c5eab7></line><line x1="12" y1="20" x2="12" y2="4" data-v-00c5eab7></line><line x1="6" y1="20" x2="6" y2="14" data-v-00c5eab7></line></svg></div>', 1))
          ])
        ])
      ]),
      J(ss, {
        count: H.value.size,
        onClear: e[7] || (e[7] = (s) => H.value = /* @__PURE__ */ new Set())
      }, {
        default: Pa(() => [
          t("button", {
            onClick: Da,
            disabled: !a.$canCreate("payments"),
            title: a.$canCreate("payments") ? "" : "Read-only access"
          }, "Pay Vendor", 8, Ws),
          t("button", {
            onClick: Ba,
            disabled: !a.$canEdit("bills"),
            title: a.$canEdit("bills") ? "" : "Read-only access"
          }, [
            t("span", {
              innerHTML: p(f)("mail", 13)
            }, null, 8, Js),
            e[89] || (e[89] = g(" Send Email", -1))
          ], 8, Qs),
          t("button", {
            onClick: Ma,
            disabled: !a.$canDelete("bills"),
            title: a.$canDelete("bills") ? "" : "Not permitted"
          }, "Cancel Submitted", 8, Xs),
          t("button", {
            class: "bab-danger",
            onClick: $a,
            disabled: !a.$canDelete("bills"),
            title: a.$canDelete("bills") ? "" : "Not permitted"
          }, "Delete Drafts", 8, Ys),
          t("button", { onClick: Vt }, [
            t("span", {
              innerHTML: p(f)("download", 13)
            }, null, 8, Zs),
            e[90] || (e[90] = g(" Export CSV", -1))
          ])
        ]),
        _: 1
      }, 8, ["count"]),
      t("div", en, [
        xe.value === "table" ? (o(), d(x, { key: 0 }, [
          t("table", tn, [
            t("thead", null, [
              t("tr", null, [
                t("th", an, [
                  t("input", {
                    type: "checkbox",
                    onChange: ua,
                    checked: da.value
                  }, null, 40, sn)
                ]),
                t("th", {
                  onClick: e[8] || (e[8] = (s) => be("name")),
                  class: "sortable"
                }, [
                  e[91] || (e[91] = g("Bill # ", -1)),
                  t("span", {
                    innerHTML: ye("name")
                  }, null, 8, nn)
                ]),
                t("th", {
                  onClick: e[9] || (e[9] = (s) => be("supplier_name")),
                  class: "sortable"
                }, [
                  e[92] || (e[92] = g("Vendor ", -1)),
                  t("span", {
                    innerHTML: ye("supplier_name")
                  }, null, 8, ln)
                ]),
                t("th", {
                  onClick: e[10] || (e[10] = (s) => be("posting_date")),
                  class: "sortable"
                }, [
                  e[93] || (e[93] = g("Date ", -1)),
                  t("span", {
                    innerHTML: ye("posting_date")
                  }, null, 8, on)
                ]),
                t("th", {
                  onClick: e[11] || (e[11] = (s) => be("due_date")),
                  class: "sortable"
                }, [
                  e[94] || (e[94] = g("Due Date ", -1)),
                  t("span", {
                    innerHTML: ye("due_date")
                  }, null, 8, dn)
                ]),
                e[97] || (e[97] = t("th", null, "Status", -1)),
                t("th", {
                  onClick: e[12] || (e[12] = (s) => be("grand_total")),
                  class: "sortable ta-r"
                }, [
                  e[95] || (e[95] = g("Amount ", -1)),
                  t("span", {
                    innerHTML: ye("grand_total")
                  }, null, 8, rn)
                ]),
                t("th", {
                  onClick: e[13] || (e[13] = (s) => be("outstanding_amount")),
                  class: "sortable ta-r"
                }, [
                  e[96] || (e[96] = g("Balance ", -1)),
                  t("span", {
                    innerHTML: ye("outstanding_amount")
                  }, null, 8, un)
                ]),
                e[98] || (e[98] = t("th", { style: { width: "120px", "text-align": "center" } }, "Actions", -1))
              ])
            ]),
            t("tbody", null, [
              oe.value ? (o(), d(x, { key: 0 }, M(7, (s) => t("tr", { key: s }, [...e[99] || (e[99] = [
                t("td", { colspan: "10" }, [
                  t("div", { class: "shimmer" })
                ], -1)
              ])])), 64)) : (o(), d(x, { key: 1 }, [
                (o(!0), d(x, null, M(p(st), (s) => (o(), d("tr", {
                  key: s.name,
                  class: C(["inv-row", { selected: H.value.has(s.name) }])
                }, [
                  t("td", cn, [
                    t("input", {
                      type: "checkbox",
                      checked: H.value.has(s.name),
                      onChange: (n) => ra(s.name)
                    }, null, 40, pn)
                  ]),
                  t("td", {
                    class: "td-id",
                    onClick: (n) => B(s)
                  }, [
                    J(It, {
                      doctype: "Purchase Invoice",
                      name: s.name
                    }, null, 8, ["name"])
                  ], 8, vn),
                  t("td", {
                    class: "td-customer",
                    onClick: (n) => B(s)
                  }, i(s.supplier_name || s.supplier || "—"), 9, mn),
                  t("td", {
                    class: "td-date text-muted mono-sm",
                    onClick: (n) => B(s)
                  }, i(p(K)(s.posting_date)), 9, _n),
                  t("td", {
                    class: C(["td-due mono-sm", p(G)(s) ? "text-danger" : "text-muted"]),
                    onClick: (n) => B(s)
                  }, i(p(K)(s.due_date) || "—"), 11, bn),
                  t("td", {
                    class: "td-status",
                    onClick: (n) => B(s)
                  }, [
                    t("span", {
                      class: C(["inv-status-badge", De(s)])
                    }, i(we(s)), 3)
                  ], 8, yn),
                  t("td", {
                    class: "td-amount ta-r mono-sm",
                    onClick: (n) => B(s)
                  }, i(w(s.grand_total)), 9, hn),
                  t("td", {
                    class: C(["td-balance ta-r mono-sm", { "text-danger": p(v)(s.outstanding_amount) > 0, "text-success": p(v)(s.outstanding_amount) <= 0 && s.docstatus === 1 }]),
                    onClick: (n) => B(s)
                  }, i(w(s.outstanding_amount)), 11, fn),
                  t("td", gn, [
                    t("button", {
                      class: "inv-act-btn",
                      onClick: (n) => B(s),
                      title: "View"
                    }, [
                      t("span", {
                        innerHTML: p(f)("eye", 13)
                      }, null, 8, wn)
                    ], 8, kn),
                    s.docstatus === 0 ? (o(), d("button", {
                      key: 0,
                      class: "inv-act-btn",
                      disabled: !a.$canEdit("bills"),
                      onClick: (n) => nt(s),
                      title: a.$canEdit("bills") ? "Edit" : "Read-only access"
                    }, [
                      t("span", {
                        innerHTML: p(f)("edit", 13)
                      }, null, 8, Cn)
                    ], 8, xn)) : m("", !0),
                    s.docstatus === 0 || s.docstatus === 2 ? (o(), d("button", {
                      key: 1,
                      class: "inv-act-btn bill-act-del",
                      disabled: !a.$canDelete("bills"),
                      onClick: (n) => Re(s),
                      title: a.$canDelete("bills") ? "Delete" : "Not permitted"
                    }, [
                      t("span", {
                        innerHTML: p(f)("trash", 13)
                      }, null, 8, Tn)
                    ], 8, Sn)) : m("", !0)
                  ])
                ], 2))), 128)),
                U.value.length ? m("", !0) : (o(), d("tr", Ln, [
                  t("td", $n, [
                    t("div", Mn, [
                      de.value || a.filterVendor ? (o(), d(x, { key: 0 }, [
                        e[100] || (e[100] = t("svg", {
                          width: "44",
                          height: "44",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "#cbd5e1",
                          "stroke-width": "1.3"
                        }, [
                          t("circle", {
                            cx: "11",
                            cy: "11",
                            r: "8"
                          }),
                          t("line", {
                            x1: "21",
                            y1: "21",
                            x2: "16.65",
                            y2: "16.65"
                          })
                        ], -1)),
                        e[101] || (e[101] = t("p", { class: "bk-empty-title" }, "No bills match your filters", -1))
                      ], 64)) : (o(), d(x, { key: 1 }, [
                        e[102] || (e[102] = Q('<div class="bk-empty-illus" data-v-00c5eab7><svg width="80" height="96" viewBox="0 0 80 96" fill="none" data-v-00c5eab7><rect x="10" y="8" width="60" height="80" rx="6" fill="#e2e8f0" data-v-00c5eab7></rect><rect x="14" y="12" width="52" height="72" rx="4" fill="#fff" data-v-00c5eab7></rect><rect x="22" y="26" width="36" height="3" rx="2" fill="#e2e8f0" data-v-00c5eab7></rect><rect x="22" y="34" width="28" height="3" rx="2" fill="#e2e8f0" data-v-00c5eab7></rect><rect x="22" y="42" width="32" height="3" rx="2" fill="#e2e8f0" data-v-00c5eab7></rect><rect x="50" y="64" width="18" height="20" rx="3" fill="#f59e0b" opacity=".7" data-v-00c5eab7></rect><rect x="36" y="70" width="12" height="14" rx="3" fill="#2563eb" opacity=".6" data-v-00c5eab7></rect></svg></div><p class="bk-empty-title" data-v-00c5eab7>No bills created yet</p><p class="bk-empty-sub" data-v-00c5eab7>Add your first vendor bill to start tracking payables.</p>', 3))
                      ], 64))
                    ])
                  ])
                ]))
              ], 64))
            ])
          ]),
          t("div", Dn, [
            oe.value ? (o(), d(x, { key: 0 }, M(5, (s) => t("div", {
              key: s,
              class: "bil-mobile-card bil-mc--skeleton"
            }, [...e[103] || (e[103] = [
              t("div", {
                class: "bil-mc-shimmer",
                style: { height: "13px", width: "55%", "margin-bottom": "8px" }
              }, null, -1),
              t("div", {
                class: "bil-mc-shimmer",
                style: { height: "11px", width: "40%", "margin-bottom": "6px" }
              }, null, -1),
              t("div", {
                class: "bil-mc-shimmer",
                style: { height: "11px", width: "65%" }
              }, null, -1)
            ])])), 64)) : U.value.length ? (o(!0), d(x, { key: 2 }, M(p(st), (s) => (o(), d("div", {
              key: s.name,
              class: "bil-mobile-card",
              onClick: (n) => B(s)
            }, [
              t("div", Vn, [
                t("span", Nn, i(s.name), 1),
                t("span", {
                  class: C(["inv-status-badge", De(s)])
                }, i(we(s)), 3)
              ]),
              t("div", An, i(s.supplier_name || s.supplier || "—"), 1),
              t("div", En, [
                t("span", null, i(p(K)(s.posting_date)), 1),
                t("span", Pn, i(w(s.grand_total)), 1)
              ]),
              p(v)(s.outstanding_amount) > 0 ? (o(), d("div", Un, [
                g(" Due: " + i(p(K)(s.due_date) || "—") + " · Balance: ", 1),
                t("span", {
                  class: C(p(G)(s) ? "text-danger" : "")
                }, i(w(s.outstanding_amount)), 3)
              ])) : m("", !0),
              t("div", In, [
                t("button", {
                  class: "bil-mc-btn",
                  onClick: Z((n) => B(s), ["stop"])
                }, "View", 8, Rn),
                s.docstatus === 0 ? (o(), d("button", {
                  key: 0,
                  class: "bil-mc-btn",
                  disabled: !a.$canEdit("bills"),
                  onClick: Z((n) => nt(s), ["stop"])
                }, " Edit ", 8, On)) : m("", !0),
                s.docstatus === 0 || s.docstatus === 2 ? (o(), d("button", {
                  key: 1,
                  class: "bil-mc-btn bil-mc-danger",
                  disabled: !a.$canDelete("bills"),
                  onClick: Z((n) => Re(s), ["stop"])
                }, "Delete", 8, zn)) : m("", !0)
              ])
            ], 8, Hn))), 128)) : (o(), d("div", Bn, [...e[104] || (e[104] = [
              t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🧾", -1),
              t("div", null, "No bills found", -1)
            ])]))
          ])
        ], 64)) : (o(), d("div", jn, [
          oe.value ? (o(), d(x, { key: 0 }, M(8, (s) => t("div", {
            key: s,
            class: "b-card",
            style: { padding: "16px" }
          }, [...e[105] || (e[105] = [
            t("div", {
              class: "b-shimmer",
              style: { height: "12px", width: "60%", "border-radius": "4px", "margin-bottom": "10px" }
            }, null, -1),
            t("div", {
              class: "b-shimmer",
              style: { height: "14px", width: "80%", "border-radius": "4px", "margin-bottom": "8px" }
            }, null, -1),
            t("div", {
              class: "b-shimmer",
              style: { height: "11px", width: "45%", "border-radius": "4px" }
            }, null, -1)
          ])])), 64)) : U.value.length ? (o(!0), d(x, { key: 2 }, M(p(st), (s) => (o(), d("div", {
            key: s.name,
            class: "b-card b-card-body",
            style: { cursor: "pointer", padding: "16px", display: "flex", "flex-direction": "column", gap: "8px" },
            onClick: (n) => B(s)
          }, [
            t("div", Kn, [
              t("span", Gn, i(s.name), 1),
              t("span", {
                class: C(["inv-status-badge", De(s)])
              }, i(we(s)), 3)
            ]),
            t("div", Wn, i(s.supplier_name || s.supplier || "—"), 1),
            t("div", Qn, [
              t("span", null, i(p(K)(s.posting_date)), 1),
              t("span", Jn, i(w(s.grand_total)), 1)
            ]),
            p(v)(s.outstanding_amount) > 0 ? (o(), d("div", {
              key: 0,
              style: { "font-size": "11.5px" },
              class: C(p(G)(s) ? "text-danger" : "text-muted")
            }, " Balance: " + i(w(s.outstanding_amount)), 3)) : m("", !0),
            t("div", Xn, [
              t("button", {
                class: "inv-act-btn",
                onClick: Z((n) => B(s), ["stop"]),
                title: "View"
              }, [
                t("span", {
                  innerHTML: p(f)("eye", 13)
                }, null, 8, Zn)
              ], 8, Yn),
              s.docstatus === 0 ? (o(), d("button", {
                key: 0,
                class: "inv-act-btn",
                disabled: !a.$canEdit("bills"),
                onClick: Z((n) => nt(s), ["stop"]),
                title: a.$canEdit("bills") ? "Edit" : "Read-only access"
              }, [
                t("span", {
                  innerHTML: p(f)("edit", 13)
                }, null, 8, tl)
              ], 8, el)) : m("", !0),
              s.docstatus === 0 || s.docstatus === 2 ? (o(), d("button", {
                key: 1,
                class: "inv-act-btn",
                style: { color: "#dc2626" },
                disabled: !a.$canDelete("bills"),
                onClick: Z((n) => Re(s), ["stop"]),
                title: a.$canDelete("bills") ? "Delete" : "Not permitted"
              }, [
                t("span", {
                  innerHTML: p(f)("trash", 13)
                }, null, 8, sl)
              ], 8, al)) : m("", !0)
            ])
          ], 8, Fn))), 128)) : (o(), d("div", qn, [
            e[106] || (e[106] = t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🧾", -1)),
            t("div", null, i(de.value || a.filterVendor ? "No bills match your filters" : "No bills yet"), 1)
          ]))
        ]))
      ]),
      !oe.value && U.value.length ? (o(), d("div", nl, [
        J(ts, {
          page: p(tt),
          "onUpdate:page": e[14] || (e[14] = (s) => Nt(tt) ? tt.value = s : null),
          "page-size": p(at),
          "onUpdate:pageSize": e[15] || (e[15] = (s) => Nt(at) ? at.value = s : null),
          "total-items": U.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : m("", !0),
      ae.value ? (o(), d("div", {
        key: 1,
        class: "inv-drawer-bg bill-addedit-bg",
        onClick: e[16] || (e[16] = Z((s) => ae.value = !1, ["self"]))
      })) : m("", !0),
      t("div", {
        class: C(["inv-drawer-panel bill-edit-drawer", { open: ae.value }])
      }, [
        t("div", ll, [
          t("div", il, [
            t("div", ol, i(P.value ? "Edit Bill" : "New Bill"), 1),
            P.value ? m("", !0) : (o(), d("span", dl, "Draft"))
          ]),
          t("button", {
            class: "inv-dclose",
            onClick: e[17] || (e[17] = (s) => ae.value = !1)
          }, [
            t("span", {
              innerHTML: p(f)("x", 16)
            }, null, 8, rl)
          ])
        ]),
        t("div", ul, [
          t("div", cl, [
            t("div", {
              class: "add-card-header",
              onClick: e[18] || (e[18] = (s) => A.details = !A.details)
            }, [
              e[108] || (e[108] = Q('<div class="add-card-title" data-v-00c5eab7><span class="add-card-title-icon" data-v-00c5eab7><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00c5eab7><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-00c5eab7></path><polyline points="14 2 14 8 20 8" data-v-00c5eab7></polyline></svg></span> Bill Details </div>', 1)),
              t("span", {
                class: C(["add-card-chevron", { collapsed: A.details }])
              }, [...e[107] || (e[107] = [
                t("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5"
                }, [
                  t("polyline", { points: "6 9 12 15 18 9" })
                ], -1)
              ])], 2)
            ]),
            t("div", {
              class: C(["add-card-body", { collapsed: A.details }])
            }, [
              t("div", null, [
                e[109] || (e[109] = t("label", { class: "inv-lbl" }, [
                  g("Vendor "),
                  t("span", { class: "inv-req" }, "*")
                ], -1)),
                J(ge, {
                  modelValue: l.supplier,
                  "onUpdate:modelValue": e[19] || (e[19] = (s) => l.supplier = s),
                  options: qe.value,
                  placeholder: "Select vendor...",
                  createable: !0,
                  createDoctype: "Supplier",
                  disabled: z.value === "submitted",
                  onSearch: St,
                  onSelect: ma
                }, null, 8, ["modelValue", "options", "disabled"])
              ]),
              t("div", pl, [
                t("div", vl, [
                  t("div", null, [
                    e[110] || (e[110] = t("label", { class: "inv-lbl" }, [
                      g("Bill Date "),
                      t("span", { class: "inv-req" }, "*")
                    ], -1)),
                    T(t("input", {
                      "onUpdate:modelValue": e[20] || (e[20] = (s) => l.posting_date = s),
                      type: "date",
                      class: "inv-fi",
                      disabled: z.value === "submitted"
                    }, null, 8, ml), [
                      [$, l.posting_date]
                    ])
                  ]),
                  t("div", null, [
                    e[111] || (e[111] = t("label", { class: "inv-lbl" }, "Due Date", -1)),
                    T(t("input", {
                      "onUpdate:modelValue": e[21] || (e[21] = (s) => l.due_date = s),
                      type: "date",
                      class: "inv-fi",
                      disabled: z.value === "submitted"
                    }, null, 8, _l), [
                      [$, l.due_date]
                    ])
                  ]),
                  t("div", null, [
                    e[112] || (e[112] = t("label", { class: "inv-lbl" }, "Vendor Bill #", -1)),
                    T(t("input", {
                      "onUpdate:modelValue": e[22] || (e[22] = (s) => l.bill_no = s),
                      type: "text",
                      class: "inv-fi",
                      placeholder: "Vendor's invoice number",
                      maxlength: "50",
                      disabled: z.value === "submitted"
                    }, null, 8, bl), [
                      [$, l.bill_no]
                    ])
                  ]),
                  t("div", null, [
                    e[113] || (e[113] = t("label", { class: "inv-lbl" }, "Vendor Bill Date", -1)),
                    T(t("input", {
                      "onUpdate:modelValue": e[23] || (e[23] = (s) => l.bill_date = s),
                      type: "date",
                      class: "inv-fi",
                      disabled: z.value === "submitted"
                    }, null, 8, yl), [
                      [$, l.bill_date]
                    ])
                  ]),
                  t("div", null, [
                    e[114] || (e[114] = t("label", { class: "inv-lbl" }, "Project", -1)),
                    J(ge, {
                      modelValue: l.project,
                      "onUpdate:modelValue": e[24] || (e[24] = (s) => l.project = s),
                      options: p(Jt),
                      disabled: z.value === "submitted",
                      placeholder: "Select project (optional)",
                      onSearch: e[25] || (e[25] = (s) => p(Ge)(s, l.project))
                    }, null, 8, ["modelValue", "options", "disabled"])
                  ]),
                  t("div", null, [
                    e[116] || (e[116] = t("label", { class: "inv-lbl" }, "Cost Center", -1)),
                    T(t("select", {
                      "onUpdate:modelValue": e[26] || (e[26] = (s) => l.cost_center = s),
                      class: "inv-fi",
                      disabled: z.value === "submitted"
                    }, [
                      e[115] || (e[115] = t("option", { value: "" }, "— Select —", -1)),
                      (o(!0), d(x, null, M(Ye.value, (s) => (o(), d("option", {
                        key: s,
                        value: s
                      }, i(s), 9, fl))), 128))
                    ], 8, hl), [
                      [ne, l.cost_center]
                    ])
                  ]),
                  m("", !0)
                ]),
                t("div", gl, [
                  t("div", {
                    class: C(["inv-inv-block", l.update_stock ? "inv-on" : "inv-off"])
                  }, [
                    t("div", kl, [
                      t("div", {
                        class: "inv-inv-icon",
                        innerHTML: p(f)("box", 16)
                      }, null, 8, wl),
                      e[120] || (e[120] = t("div", { class: "inv-inv-text" }, [
                        t("div", { class: "inv-inv-title" }, "Update Inventory on Submit"),
                        t("div", { class: "inv-inv-sub" }, "Stock increases in the selected warehouse when this bill is submitted")
                      ], -1)),
                      t("label", xl, [
                        T(t("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": e[28] || (e[28] = (s) => l.update_stock = s),
                          "true-value": 1,
                          "false-value": 0,
                          disabled: z.value === "submitted"
                        }, null, 8, Cl), [
                          [Ua, l.update_stock]
                        ]),
                        e[119] || (e[119] = t("span", { class: "inv-inv-slider" }, null, -1))
                      ])
                    ]),
                    l.update_stock ? (o(), d("div", Sl, [
                      e[121] || (e[121] = t("label", {
                        class: "inv-lbl",
                        style: { "margin-bottom": "6px" }
                      }, [
                        g("Receiving Warehouse "),
                        t("span", { style: { color: "#dc2626" } }, "*")
                      ], -1)),
                      J(ge, {
                        modelValue: l.set_warehouse,
                        "onUpdate:modelValue": e[29] || (e[29] = (s) => l.set_warehouse = s),
                        options: Je.value,
                        disabled: z.value === "submitted",
                        placeholder: "Select warehouse where stock will be received…",
                        createable: !0,
                        createDoctype: "Warehouse",
                        onSearch: Xe,
                        onCreate: e[30] || (e[30] = (s) => Xe(""))
                      }, null, 8, ["modelValue", "options", "disabled"])
                    ])) : m("", !0)
                  ], 2)
                ])
              ])
            ], 2)
          ]),
          t("div", Tl, [
            t("div", {
              class: "add-card-header",
              onClick: e[31] || (e[31] = (s) => A.billing = !A.billing)
            }, [
              e[123] || (e[123] = Q('<div class="add-card-title" data-v-00c5eab7><span class="add-card-title-icon" data-v-00c5eab7><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00c5eab7><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-v-00c5eab7></path><circle cx="12" cy="10" r="3" data-v-00c5eab7></circle></svg></span> Billing Address </div>', 1)),
              t("span", {
                class: C(["add-card-chevron", { collapsed: A.billing }])
              }, [...e[122] || (e[122] = [
                t("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5"
                }, [
                  t("polyline", { points: "6 9 12 15 18 9" })
                ], -1)
              ])], 2)
            ]),
            t("div", {
              class: C(["add-card-body", { collapsed: A.billing }])
            }, [
              e[124] || (e[124] = t("label", { class: "inv-lbl" }, "Billing Address", -1)),
              t("div", Ll, [
                J(ge, {
                  modelValue: l.billing_address_name,
                  "onUpdate:modelValue": e[32] || (e[32] = (s) => l.billing_address_name = s),
                  options: O.value,
                  valueKey: "name",
                  labelKey: "label",
                  placeholder: "— Select —",
                  disabled: z.value === "submitted",
                  createable: !0,
                  staticCreate: !0,
                  createLabel: "+ Add New Address",
                  onSelect: Yt,
                  onCreate: Zt
                }, null, 8, ["modelValue", "options", "disabled"])
              ]),
              We.value ? (o(), d("div", $l, [
                t("div", Ml, i(We.value.address_type || "Billing"), 1),
                t("div", Dl, i(_e(We.value)), 1)
              ])) : m("", !0)
            ], 2)
          ]),
          t("div", Bl, [
            t("div", {
              class: "add-card-header",
              onClick: e[33] || (e[33] = (s) => A.lines = !A.lines)
            }, [
              t("div", Hl, [
                e[125] || (e[125] = Q('<span class="add-card-title-icon" data-v-00c5eab7><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00c5eab7><line x1="8" y1="6" x2="21" y2="6" data-v-00c5eab7></line><line x1="8" y1="12" x2="21" y2="12" data-v-00c5eab7></line><line x1="8" y1="18" x2="21" y2="18" data-v-00c5eab7></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-00c5eab7></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-00c5eab7></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-00c5eab7></line></svg></span> Line Items ', 2)),
                t("span", Vl, i(D.value.length) + " item" + i(D.value.length !== 1 ? "s" : ""), 1)
              ]),
              t("span", {
                class: C(["add-card-chevron", { collapsed: A.lines }])
              }, [...e[126] || (e[126] = [
                t("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5"
                }, [
                  t("polyline", { points: "6 9 12 15 18 9" })
                ], -1)
              ])], 2)
            ]),
            t("div", {
              class: C(["add-card-body", { collapsed: A.lines }])
            }, [
              t("div", Nl, [
                t("table", Al, [
                  e[130] || (e[130] = t("thead", null, [
                    t("tr", null, [
                      t("th", { class: "th-num" }, "#"),
                      t("th", { class: "th-item" }, "ITEM NAME & DESCRIPTION"),
                      t("th", { class: "th-hsn" }, "HSN/SAC"),
                      t("th", { class: "th-uom" }, "UOM"),
                      t("th", { class: "th-mrp" }, "MRP (KES)"),
                      t("th", { class: "th-qty" }, "QTY"),
                      t("th", { class: "th-rate" }, "RATE (KES)"),
                      t("th", { class: "th-disc" }, "DISC %"),
                      t("th", { class: "th-tax" }, "TAX TEMPLATE"),
                      t("th", { class: "th-batch" }, "BATCH NO"),
                      t("th", { class: "th-expiry" }, "EXP DATE"),
                      t("th", { class: "th-subtotal" }, "SUBTOTAL"),
                      t("th", { class: "th-rm" })
                    ])
                  ], -1)),
                  t("tbody", null, [
                    (o(!0), d(x, null, M(D.value, (s, n) => (o(), d(x, {
                      key: s.id
                    }, [
                      t("tr", El, [
                        t("td", Pl, [
                          t("span", Ul, "#" + i(n + 1), 1)
                        ]),
                        t("td", Il, [
                          J(ge, {
                            modelValue: s.item_code,
                            "onUpdate:modelValue": (r) => s.item_code = r,
                            options: Fe.value,
                            placeholder: "Select item…",
                            createable: !0,
                            createDoctype: "Item",
                            onSearch: Tt,
                            onSelect: (r) => _a(s, r)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"])
                        ]),
                        t("td", Rl, [
                          T(t("input", {
                            "onUpdate:modelValue": (r) => s.hsn_code = r,
                            class: "inv-fi",
                            placeholder: "HSN code"
                          }, null, 8, Ol), [
                            [$, s.hsn_code]
                          ])
                        ]),
                        t("td", zl, [
                          T(t("select", {
                            "onUpdate:modelValue": (r) => s.uom = r,
                            class: "inv-fi",
                            onChange: (r) => he(s)
                          }, [
                            (o(!0), d(x, null, M(pa(s), (r) => (o(), d("option", {
                              key: r,
                              value: r
                            }, i(r), 9, ql))), 128))
                          ], 40, jl), [
                            [ne, s.uom]
                          ]),
                          Lt(s) ? (o(), d("div", Fl, i(Lt(s)), 1)) : m("", !0)
                        ]),
                        t("td", Kl, [
                          t("input", {
                            value: Te(s._standardRate),
                            type: "text",
                            readonly: "",
                            disabled: "",
                            class: "inv-fi",
                            style: { background: "#f3f4f6", color: "#6b7280", cursor: "not-allowed" }
                          }, null, 8, Gl)
                        ]),
                        t("td", Wl, [
                          T(t("input", {
                            "onUpdate:modelValue": (r) => s.qty = r,
                            type: "number",
                            min: "0.001",
                            step: "0.001",
                            class: C(["inv-fi", { "field-error": s.qty > 999999999 }]),
                            onInput: (r) => {
                              Number(r.target.value) > 999999999 && (s.qty = 999999999, r.target.value = 999999999), he(s);
                            }
                          }, null, 42, Ql), [
                            [
                              $,
                              s.qty,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        t("td", Jl, [
                          T(t("input", {
                            "onUpdate:modelValue": (r) => s.rate = r,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            class: C(["inv-fi", { "field-error": s.rate > 999999999 }]),
                            disabled: !1,
                            onInput: (r) => {
                              Number(r.target.value) > 999999999 && (s.rate = 999999999, r.target.value = 999999999), he(s);
                            }
                          }, null, 42, Xl), [
                            [
                              $,
                              s.rate,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        t("td", Yl, [
                          T(t("input", {
                            "onUpdate:modelValue": (r) => s.discount_percentage = r,
                            type: "number",
                            min: "0",
                            max: "100",
                            step: "0.1",
                            class: "inv-fi",
                            onInput: (r) => he(s),
                            placeholder: "0"
                          }, null, 40, Zl), [
                            [
                              $,
                              s.discount_percentage,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        t("td", ei, [
                          T(t("select", {
                            "onUpdate:modelValue": (r) => s.tax_code = r,
                            class: "inv-fi"
                          }, [
                            e[127] || (e[127] = t("option", { value: "" }, "— No Tax —", -1)),
                            (o(!0), d(x, null, M(se.value, (r) => (o(), d("option", {
                              key: r.name,
                              value: r.name
                            }, i(r.template_name || r.name), 9, ai))), 128))
                          ], 8, ti), [
                            [ne, s.tax_code]
                          ])
                        ]),
                        t("td", si, [
                          l.update_stock && s.has_batch_no ? (o(), Qa(ge, {
                            key: 0,
                            modelValue: s.batch_no,
                            "onUpdate:modelValue": (r) => s.batch_no = r,
                            options: s.batchOptions,
                            placeholder: "Select batch",
                            createable: "",
                            onSearch: (r) => it(s, r),
                            onSelect: (r) => ba(s, r),
                            onCreate: (r) => ya(s, r),
                            style: { "font-size": "12px" },
                            title: Ue(s) || (s.batchOptions.length ? "" : "No existing batches — type a new code to create one")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSearch", "onSelect", "onCreate", "title"])) : (o(), d("span", ni, "—"))
                        ]),
                        t("td", li, [
                          l.update_stock && s.has_batch_no ? T((o(), d("input", {
                            key: 0,
                            "onUpdate:modelValue": (r) => s.batch_expiry_date = r,
                            type: "date",
                            class: "inv-fi"
                          }, null, 8, ii)), [
                            [$, s.batch_expiry_date]
                          ]) : (o(), d("span", oi, "—"))
                        ]),
                        t("td", di, [
                          e[128] || (e[128] = t("span", { class: "po-row-subtotal-label" }, "SUBTOTAL", -1)),
                          t("span", ri, i(w(s.amount)), 1)
                        ]),
                        t("td", ui, [
                          t("button", {
                            onClick: (r) => fa(s.id),
                            class: "po-item-card-rm"
                          }, [
                            t("span", {
                              innerHTML: p(f)("x", 16)
                            }, null, 8, pi)
                          ], 8, ci)
                        ])
                      ]),
                      l.update_stock && s.has_batch_no && Ue(s) ? (o(), d("tr", vi, [
                        t("td", mi, [
                          t("div", _i, [
                            t("span", {
                              innerHTML: p(f)("alert-circle", 12)
                            }, null, 8, bi),
                            g(" " + i(Ue(s)), 1)
                          ])
                        ])
                      ])) : l.update_stock && s.has_batch_no && !s.batchOptions.length ? (o(), d("tr", yi, [
                        t("td", hi, [
                          t("div", fi, [
                            t("span", {
                              innerHTML: p(f)("alert-circle", 12)
                            }, null, 8, gi),
                            e[129] || (e[129] = g(" No existing batches for this item — type a new code to create one", -1))
                          ])
                        ])
                      ])) : m("", !0)
                    ], 64))), 128))
                  ])
                ])
              ]),
              t("button", {
                class: "inv-add-line-btn",
                style: { "margin-top": "10px" },
                onClick: ha
              }, [
                t("span", {
                  innerHTML: p(f)("plus", 12)
                }, null, 8, ki),
                e[131] || (e[131] = g(" Add Item", -1))
              ]),
              t("div", wi, [
                e[140] || (e[140] = t("div", { style: { "font-size": "12px", color: "#6b7280" } }, "Tax is applied per item via Item Tax Template.", -1)),
                t("div", xi, [
                  t("div", Ci, [
                    e[132] || (e[132] = t("span", null, "Subtotal", -1)),
                    t("span", null, i(w(Ie.value)), 1)
                  ]),
                  t("div", Si, [
                    e[134] || (e[134] = t("span", null, "Discount", -1)),
                    t("span", Ti, [
                      T(t("select", {
                        "onUpdate:modelValue": e[34] || (e[34] = (s) => l.discount_type = s),
                        class: "inv-fi",
                        style: { width: "74px", padding: "2px 4px" }
                      }, [...e[133] || (e[133] = [
                        t("option", { value: "Percentage" }, "%", -1),
                        t("option", { value: "Amount" }, "KES", -1)
                      ])], 512), [
                        [ne, l.discount_type]
                      ]),
                      l.discount_type === "Percentage" ? T((o(), d("input", {
                        key: 0,
                        "onUpdate:modelValue": e[35] || (e[35] = (s) => l.additional_discount_percentage = s),
                        type: "number",
                        min: "0",
                        max: "100",
                        step: "0.1",
                        class: "inv-fi",
                        style: { width: "72px", "text-align": "right" },
                        placeholder: "0"
                      }, null, 512)), [
                        [
                          $,
                          l.additional_discount_percentage,
                          void 0,
                          { number: !0 }
                        ]
                      ]) : T((o(), d("input", {
                        key: 1,
                        "onUpdate:modelValue": e[36] || (e[36] = (s) => l.additional_discount_amount = s),
                        type: "number",
                        min: "0",
                        max: Ie.value,
                        step: "0.01",
                        class: "inv-fi",
                        style: { width: "90px", "text-align": "right" },
                        placeholder: "0"
                      }, null, 8, Li)), [
                        [
                          $,
                          l.additional_discount_amount,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ])
                  ]),
                  fe.value ? (o(), d("div", $i, [
                    e[135] || (e[135] = t("span", null, "Discount Amount", -1)),
                    t("span", null, "-" + i(w(fe.value)), 1)
                  ])) : m("", !0),
                  t("div", Mi, [
                    e[136] || (e[136] = t("span", null, "Net Total", -1)),
                    t("span", null, i(w(ot.value)), 1)
                  ]),
                  (o(!0), d(x, null, M(dt.value, (s) => (o(), d("div", {
                    key: s.template,
                    class: "po-total-row"
                  }, [
                    t("span", null, i(s.template) + " (" + i(s.rate) + "%)", 1),
                    t("span", null, i(w(s.amount)), 1)
                  ]))), 128)),
                  dt.value.length ? m("", !0) : (o(), d("div", Di, [
                    e[137] || (e[137] = t("span", null, "Tax", -1)),
                    t("span", null, i(w(0)), 1)
                  ])),
                  l.tds_applicable && rt.value > 0 ? (o(), d("div", Bi, [
                    t("span", null, "TDS u/s " + i(l.tds_section) + " (" + i(l.tds_rate) + "%)", 1),
                    t("span", Hi, "− " + i(w(rt.value)), 1)
                  ])) : m("", !0),
                  ct.value ? (o(), d("div", Vi, [
                    e[138] || (e[138] = t("span", null, "Round Off", -1)),
                    t("span", null, i(ct.value > 0 ? "+" : "") + i(w(ct.value)), 1)
                  ])) : m("", !0),
                  t("div", Ni, [
                    e[139] || (e[139] = t("span", null, "Grand Total", -1)),
                    t("span", null, i(w(ka.value)), 1)
                  ])
                ])
              ])
            ], 2)
          ]),
          t("div", Ai, [
            t("div", {
              class: "add-card-header",
              onClick: e[37] || (e[37] = (s) => A.remarks = !A.remarks)
            }, [
              e[142] || (e[142] = Q('<div class="add-card-title" data-v-00c5eab7><span class="add-card-title-icon" data-v-00c5eab7><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00c5eab7><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" data-v-00c5eab7></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" data-v-00c5eab7></path></svg></span> Remarks </div>', 1)),
              t("span", {
                class: C(["add-card-chevron", { collapsed: A.remarks }])
              }, [...e[141] || (e[141] = [
                t("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5"
                }, [
                  t("polyline", { points: "6 9 12 15 18 9" })
                ], -1)
              ])], 2)
            ]),
            t("div", {
              class: C(["add-card-body", { collapsed: A.remarks }])
            }, [
              t("label", Ei, [
                e[143] || (e[143] = t("span", null, [
                  g("Internal Remarks "),
                  t("span", { style: { color: "#9ca3af", "font-weight": "400" } }, "(not printed)")
                ], -1)),
                t("span", {
                  style: Ia({ color: l.remarks.length > 500 ? "#ef4444" : l.remarks.length > 450 ? "#f59e0b" : "#9ca3af", fontSize: "11px", fontWeight: "600" })
                }, i(l.remarks.length) + "/500", 5)
              ]),
              T(t("textarea", {
                "onUpdate:modelValue": e[38] || (e[38] = (s) => l.remarks = s),
                rows: "3",
                class: "inv-fi",
                placeholder: "Internal notes for your team…",
                maxlength: "500"
              }, null, 512), [
                [$, l.remarks]
              ]),
              l.remarks.length >= 500 ? (o(), d("div", Pi, "Character limit reached")) : m("", !0)
            ], 2)
          ])
        ]),
        t("div", Ui, [
          t("div", Ii, i(P.value ? "Editing: " + P.value : "New bill — unsaved changes"), 1),
          t("div", Ri, [
            t("button", {
              class: "add-btn-cancel",
              onClick: e[39] || (e[39] = (s) => ae.value = !1)
            }, "Cancel"),
            z.value !== "submitted" || P.value ? (o(), d("button", {
              key: 0,
              class: "add-btn-draft",
              disabled: re.value || !(P.value ? a.$canEdit("bills") : a.$canCreate("bills")),
              title: (P.value ? a.$canEdit("bills") : a.$canCreate("bills")) ? "" : "Read-only access",
              onClick: e[40] || (e[40] = (s) => Bt(0))
            }, [
              t("span", {
                innerHTML: p(f)("save", 13)
              }, null, 8, zi),
              g(" " + i(re.value ? "Saving..." : P.value ? "Save Changes" : "Save Draft"), 1)
            ], 8, Oi)) : m("", !0),
            !P.value || z.value !== "submitted" ? (o(), d("button", {
              key: 1,
              class: "add-btn-more",
              disabled: re.value || !(P.value ? a.$canEdit("bills") : a.$canCreate("bills")),
              title: (P.value ? a.$canEdit("bills") : a.$canCreate("bills")) ? "" : "Read-only access",
              onClick: e[41] || (e[41] = (s) => Bt(1))
            }, [
              t("span", {
                innerHTML: p(f)("check", 13)
              }, null, 8, qi),
              g(" " + i(re.value ? "Saving…" : P.value ? "Save & Submit" : "Submit"), 1)
            ], 8, ji)) : m("", !0)
          ])
        ])
      ], 2),
      ue.value ? (o(), d("div", {
        key: 2,
        class: "inv-drawer-bg",
        onClick: e[42] || (e[42] = Z((s) => ue.value = !1, ["self"]))
      })) : m("", !0),
      t("div", {
        class: C(["inv-drawer-panel bill-view-drawer", { open: ue.value }])
      }, [
        c.value ? (o(), d(x, { key: 0 }, [
          t("div", Fi, [
            t("div", Ki, [
              t("div", Gi, [
                t("div", Wi, [
                  t("span", Qi, i(c.value.name), 1),
                  t("span", {
                    class: C(["inv-hdr-badge", De(c.value)])
                  }, i(we(c.value)), 3)
                ]),
                t("div", Ji, i(c.value.supplier_name || c.value.supplier), 1)
              ]),
              t("div", Xi, [
                t("button", {
                  class: "inv-ab-btn",
                  style: { padding: "7px 12px", "font-size": "13px" },
                  onClick: e[43] || (e[43] = (s) => ue.value = !1)
                }, [
                  t("span", {
                    innerHTML: p(f)("x", 14)
                  }, null, 8, Yi),
                  e[144] || (e[144] = g()),
                  e[145] || (e[145] = t("span", { class: "ab-label" }, "Close", -1))
                ])
              ])
            ])
          ]),
          t("div", Zi, [
            t("div", eo, [
              J(ns, { steps: ca.value }, null, 8, ["steps"])
            ]),
            t("div", to, [
              c.value.docstatus === 0 ? (o(), d("button", {
                key: 0,
                class: "inv-ab-btn",
                style: { color: "#16a34a", "border-color": "rgba(22,163,106,.3)" },
                disabled: !a.$canEdit("bills"),
                title: a.$canEdit("bills") ? "" : "Read-only access",
                onClick: e[44] || (e[44] = (s) => Ta(c.value))
              }, [
                t("span", {
                  innerHTML: p(f)("check", 13)
                }, null, 8, so),
                e[146] || (e[146] = g()),
                e[147] || (e[147] = t("span", { class: "ab-label" }, "Submit", -1))
              ], 8, ao)) : m("", !0),
              t("div", no, [
                t("button", {
                  class: "inv-ab-btn inv-ab-dropdown",
                  onClick: e[45] || (e[45] = (s) => ke.value = !ke.value)
                }, [
                  t("span", {
                    innerHTML: p(f)("download", 13)
                  }, null, 8, lo),
                  e[148] || (e[148] = g()),
                  e[149] || (e[149] = t("span", { class: "ab-label" }, "Download", -1)),
                  e[150] || (e[150] = t("span", { class: "inv-ab-caret" }, "▾", -1))
                ]),
                ke.value ? (o(), d("div", io, [
                  e[153] || (e[153] = t("div", { class: "inv-dl-menu-header" }, "Export Bill", -1)),
                  t("button", {
                    onClick: e[46] || (e[46] = (s) => yt("pdf")),
                    class: "inv-dl-menu-item"
                  }, [
                    t("span", {
                      class: "inv-dl-menu-icon",
                      innerHTML: p(f)("download", 14)
                    }, null, 8, oo),
                    e[151] || (e[151] = t("span", { class: "inv-dl-menu-text" }, [
                      t("span", { class: "inv-dl-menu-label" }, "Download PDF"),
                      t("span", { class: "inv-dl-menu-sub" }, "Save to your device")
                    ], -1))
                  ]),
                  t("button", {
                    onClick: e[47] || (e[47] = (s) => yt("print")),
                    class: "inv-dl-menu-item"
                  }, [
                    t("span", {
                      class: "inv-dl-menu-icon",
                      innerHTML: p(f)("printer", 14)
                    }, null, 8, ro),
                    e[152] || (e[152] = t("span", { class: "inv-dl-menu-text" }, [
                      t("span", { class: "inv-dl-menu-label" }, "Open & Print"),
                      t("span", { class: "inv-dl-menu-sub" }, "Preview in new tab")
                    ], -1))
                  ])
                ])) : m("", !0)
              ]),
              c.value.docstatus === 1 ? (o(), d("button", {
                key: 1,
                class: "inv-ab-btn",
                disabled: !a.$canEdit("bills"),
                title: a.$canEdit("bills") ? "" : "Read-only access",
                onClick: e[48] || (e[48] = (s) => xa(c.value))
              }, [
                t("span", {
                  innerHTML: p(f)("mail", 13)
                }, null, 8, co),
                e[154] || (e[154] = g()),
                e[155] || (e[155] = t("span", { class: "ab-label" }, "Email", -1))
              ], 8, uo)) : m("", !0),
              c.value.docstatus === 1 && p(v)(c.value.outstanding_amount) > 0 ? (o(), d("button", {
                key: 2,
                style: { display: "none" },
                class: "inv-ab-btn",
                disabled: !a.$canCreate("bills"),
                title: a.$canCreate("bills") ? "" : "Read-only access",
                onClick: e[49] || (e[49] = (s) => Ca(c.value))
              }, [
                t("span", {
                  innerHTML: p(f)("arrow-left", 13)
                }, null, 8, vo),
                e[156] || (e[156] = g()),
                e[157] || (e[157] = t("span", { class: "ab-label" }, "Debit Note", -1))
              ], 8, po)) : m("", !0),
              c.value.docstatus === 1 ? (o(), d("button", {
                key: 3,
                style: { display: "none" },
                class: "inv-ab-btn",
                disabled: !a.$canCreate("bills"),
                title: a.$canCreate("bills") ? "" : "Read-only access",
                onClick: e[50] || (e[50] = (s) => Sa(c.value))
              }, [
                t("span", {
                  innerHTML: p(f)("repeat", 13)
                }, null, 8, _o),
                e[158] || (e[158] = g()),
                e[159] || (e[159] = t("span", { class: "ab-label" }, "Make Recurring", -1))
              ], 8, mo)) : m("", !0),
              c.value.docstatus === 1 ? (o(), d("button", {
                key: 4,
                class: "inv-ab-btn inv-ab-danger",
                disabled: !a.$canDelete("bills"),
                title: a.$canDelete("bills") ? "" : "Not permitted",
                onClick: e[51] || (e[51] = (s) => La(c.value))
              }, " Cancel ", 8, bo)) : m("", !0),
              c.value.docstatus === 0 || c.value.docstatus === 2 ? (o(), d("button", {
                key: 5,
                class: "inv-ab-btn inv-ab-danger",
                disabled: !a.$canDelete("bills"),
                title: a.$canDelete("bills") ? "" : "Not permitted",
                onClick: e[52] || (e[52] = (s) => Re(c.value))
              }, [
                t("span", {
                  innerHTML: p(f)("trash", 13)
                }, null, 8, ho),
                e[160] || (e[160] = g()),
                e[161] || (e[161] = t("span", { class: "ab-label" }, "Delete", -1))
              ], 8, yo)) : m("", !0)
            ]),
            t("div", fo, [
              t("button", {
                class: C(["inv-vtab", { active: ce.value === "details" }]),
                onClick: e[53] || (e[53] = (s) => ce.value = "details")
              }, "Details", 2)
            ]),
            ce.value === "details" ? (o(), d("div", go, [
              t("div", ko, [
                t("div", wo, [
                  t("div", xo, [
                    t("span", {
                      class: "inv-dmeta-icon",
                      innerHTML: p(f)("user", 13)
                    }, null, 8, Co),
                    e[162] || (e[162] = t("span", { class: "inv-dmeta-lbl" }, "Vendor", -1))
                  ]),
                  t("div", So, i(c.value.supplier_name || c.value.supplier), 1),
                  c.value.bill_no ? (o(), d("div", To, "Vendor Bill # " + i(c.value.bill_no), 1)) : m("", !0)
                ]),
                t("div", Lo, [
                  t("div", $o, [
                    t("span", {
                      class: "inv-dmeta-icon",
                      innerHTML: p(f)("calendar", 13)
                    }, null, 8, Mo),
                    e[163] || (e[163] = t("span", { class: "inv-dmeta-lbl" }, "Bill Date", -1))
                  ]),
                  t("div", Do, i(p(K)(c.value.posting_date)), 1),
                  c.value.posting_time ? (o(), d("div", Bo, i(String(c.value.posting_time).slice(0, 8)), 1)) : m("", !0)
                ]),
                t("div", Ho, [
                  t("div", Vo, [
                    t("span", {
                      class: "inv-dmeta-icon",
                      innerHTML: p(f)("indianrupee", 13)
                    }, null, 8, No),
                    e[164] || (e[164] = t("span", { class: "inv-dmeta-lbl" }, "Balance Due", -1))
                  ]),
                  t("div", {
                    class: C(["inv-balance-val", { "is-paid": p(v)(c.value.outstanding_amount) === 0, "is-zero": p(v)(c.value.outstanding_amount) === 0 }])
                  }, i(w(c.value.outstanding_amount)), 3),
                  p(v)(c.value.outstanding_amount) > 0 && c.value.docstatus === 1 ? (o(), d("button", {
                    key: 0,
                    style: { display: "none" },
                    class: "inv-rec-pay-btn",
                    disabled: !a.$canCreate("payments"),
                    title: a.$canCreate("payments") ? "" : "Read-only access",
                    onClick: e[54] || (e[54] = (s) => Ht(c.value))
                  }, " Record Payment ", 8, Ao)) : m("", !0)
                ])
              ]),
              Be.value ? (o(), d("div", Eo, "Loading details…")) : (o(), d(x, { key: 1 }, [
                X.value.length ? (o(), d(x, { key: 0 }, [
                  t("div", Po, [
                    e[165] || (e[165] = g("Line Items ", -1)),
                    t("span", Uo, i(X.value.length) + " item" + i(X.value.length !== 1 ? "s" : ""), 1)
                  ]),
                  t("div", Io, [
                    t("table", Ro, [
                      e[166] || (e[166] = t("thead", null, [
                        t("tr", null, [
                          t("th", { style: { width: "36px" } }, "#"),
                          t("th", null, "Item & Description"),
                          t("th", null, "HSN/SAC"),
                          t("th", null, "UOM"),
                          t("th", { class: "th-r" }, "MRP (KES)"),
                          t("th", { class: "th-r" }, "Qty"),
                          t("th", { class: "th-r" }, "Rate (KES)"),
                          t("th", { class: "th-r" }, "Disc %"),
                          t("th", null, "Batch No"),
                          t("th", null, "Exp Date"),
                          t("th", null, "Tax Template"),
                          t("th", { class: "th-r" }, "Amount (KES)")
                        ])
                      ], -1)),
                      t("tbody", null, [
                        (o(!0), d(x, null, M(X.value, (s, n) => (o(), d("tr", { key: n }, [
                          t("td", Oo, i(n + 1), 1),
                          t("td", null, [
                            t("div", zo, i(s.item_name || s.item_code), 1),
                            s.description ? (o(), d("div", jo, i(s.description), 1)) : m("", !0)
                          ]),
                          t("td", qo, i(s.hsn_code || "—"), 1),
                          t("td", Fo, i(s.uom || "—"), 1),
                          t("td", Ko, i(p(v)(s.mrp) ? Te(s.mrp) : "—"), 1),
                          t("td", Go, i(p(v)(s.qty)), 1),
                          t("td", Wo, i(Te(s.rate)), 1),
                          t("td", Qo, i(p(v)(s.discount_percentage) ? p(v)(s.discount_percentage) + "%" : "—"), 1),
                          t("td", Jo, i(s.batch_no || "—"), 1),
                          t("td", Xo, i(s.batch_expiry_date ? p(K)(s.batch_expiry_date) : "—"), 1),
                          t("td", Yo, i(Wt(s.tax_code)), 1),
                          t("td", Zo, i(Te(s.amount)), 1)
                        ]))), 128))
                      ])
                    ])
                  ]),
                  t("div", ed, [
                    t("div", td, [
                      t("div", ad, [
                        e[167] || (e[167] = t("span", null, "Subtotal", -1)),
                        t("span", null, i(w(wa.value)), 1)
                      ]),
                      Mt.value ? (o(), d("div", sd, [
                        t("span", null, "Discount" + i(c.value.discount_type === "Percentage" && c.value.additional_discount_percentage ? " (" + c.value.additional_discount_percentage + "%)" : ""), 1),
                        t("span", null, "-" + i(w(Mt.value)), 1)
                      ])) : m("", !0),
                      Dt.value.length ? (o(!0), d(x, { key: 1 }, M(Dt.value, (s) => (o(), d("div", {
                        key: s.template,
                        class: "po-view-total-row po-view-tax-row"
                      }, [
                        t("span", nd, [
                          e[168] || (e[168] = t("span", { class: "po-view-tax-badge" }, "TAX", -1)),
                          g(" " + i(s.template) + " ", 1),
                          t("span", ld, i(s.rate) + "%", 1)
                        ]),
                        t("span", null, i(w(s.amount)), 1)
                      ]))), 128)) : Le.value ? m("", !0) : (o(), d("div", id, [
                        e[169] || (e[169] = t("span", { class: "po-view-tax-label" }, [
                          t("span", { class: "po-view-tax-badge po-view-tax-badge--none" }, "NO TAX"),
                          g(" No taxes applied ")
                        ], -1)),
                        t("span", null, i(w(0)), 1)
                      ])),
                      Le.value ? (o(), d("div", od, [
                        t("span", null, [
                          g(i(Le.value.label) + " ", 1),
                          t("span", dd, "(" + i(Le.value.rate) + "%)", 1)
                        ]),
                        t("span", null, "− " + i(w(Le.value.amount)), 1)
                      ])) : m("", !0),
                      t("div", rd, [
                        e[170] || (e[170] = t("span", null, "Grand Total", -1)),
                        t("span", null, i(w(c.value.grand_total)), 1)
                      ])
                    ])
                  ])
                ], 64)) : (o(), d("div", ud, "No item details available.")),
                c.value.project ? (o(), d("div", cd, [
                  e[171] || (e[171] = t("span", { style: { color: "#6b7280", "font-weight": "600" } }, "Project:", -1)),
                  t("span", pd, i(c.value.project), 1)
                ])) : m("", !0),
                c.value.cost_center ? (o(), d("div", vd, [
                  e[172] || (e[172] = t("span", { style: { color: "#6b7280", "font-weight": "600" } }, "Cost Center:", -1)),
                  t("span", md, i(c.value.cost_center), 1)
                ])) : m("", !0),
                m("", !0),
                c.value.set_warehouse ? (o(), d("div", _d, [
                  e[174] || (e[174] = t("span", { style: { color: "#6b7280", "font-weight": "600" } }, "Receiving Warehouse:", -1)),
                  t("span", bd, [
                    t("span", {
                      innerHTML: p(f)("warehouse", 12)
                    }, null, 8, yd),
                    g(i(c.value.set_warehouse), 1)
                  ])
                ])) : m("", !0),
                c.value.remark ? (o(), d("div", hd, [
                  t("div", fd, [
                    t("span", {
                      class: "inv-dmeta-icon",
                      innerHTML: p(f)("edit", 13)
                    }, null, 8, gd),
                    e[175] || (e[175] = t("span", { class: "inv-dmeta-lbl" }, "Internal Remark", -1))
                  ]),
                  t("div", kd, i(c.value.remark), 1)
                ])) : m("", !0),
                c.value.billing_address_name || c.value.billing_address ? (o(), d("div", wd, [
                  t("div", xd, [
                    t("span", {
                      innerHTML: p(f)("map-pin", 12),
                      style: { color: "#6b7280" }
                    }, null, 8, Cd),
                    e[176] || (e[176] = t("span", { style: { "font-size": "10.5px", "font-weight": "700", "text-transform": "uppercase", color: "#6b7280", "letter-spacing": "0.5px" } }, "Billing Address", -1))
                  ]),
                  t("div", Sd, [
                    e[177] || (e[177] = t("span", { style: { display: "inline-block", background: "#dbeafe", color: "#2563eb", "font-size": "10px", "font-weight": "700", "text-transform": "uppercase", padding: "2px 8px", "border-radius": "20px", "letter-spacing": "0.4px", "margin-bottom": "8px" } }, "Billing", -1)),
                    t("div", Td, i(Xt(Ct.value ? _e(Ct.value) : c.value.billing_address)), 1)
                  ])
                ])) : m("", !0)
              ], 64)),
              c.value.owner ? (o(), d("div", Ld, [
                g(" Created by " + i(p(Ut)(c.value.owner)) + " on " + i(p(K)(c.value.creation)) + " ", 1),
                c.value.modified_by ? (o(), d(x, { key: 0 }, [
                  g(" · Last modified by " + i(p(Ut)(c.value.modified_by)) + " on " + i(p(K)(c.value.modified)), 1)
                ], 64)) : m("", !0)
              ])) : m("", !0)
            ])) : m("", !0),
            ce.value === "payments" ? (o(), d("div", $d, [
              Be.value ? (o(), d("div", Md, "Loading payments…")) : (o(), d(x, { key: 1 }, [
                pe.value.length ? (o(), d("div", Dd, [
                  e[179] || (e[179] = t("div", { class: "inv-pay-section-lbl" }, "Payments Made", -1)),
                  t("table", Bd, [
                    e[178] || (e[178] = t("thead", null, [
                      t("tr", null, [
                        t("th", null, "Date"),
                        t("th", null, "Mode"),
                        t("th", null, "Reference"),
                        t("th", { class: "th-r" }, "Amount")
                      ])
                    ], -1)),
                    t("tbody", null, [
                      (o(!0), d(x, null, M(pe.value, (s) => (o(), d("tr", {
                        key: s.name
                      }, [
                        t("td", Hd, i(p(K)(s.payment_date)), 1),
                        t("td", null, i(s.mode_of_payment || "—"), 1),
                        t("td", Vd, i(s.reference_no || "—"), 1),
                        t("td", Nd, [
                          t("div", Ad, i(w(s.paid_amount)), 1),
                          p(v)(s.bank_charges) > 0 ? (o(), d("div", Ed, " + " + i(w(s.bank_charges)) + " bank charges ", 1)) : m("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  t("div", Pd, [
                    (o(!0), d(x, null, M(pe.value, (s) => (o(), d("div", {
                      key: s.name,
                      class: "bil-pay-mc"
                    }, [
                      t("div", Ud, [
                        t("span", Id, i(p(K)(s.payment_date)), 1),
                        t("span", Rd, i(w(s.paid_amount)), 1)
                      ]),
                      t("div", Od, [
                        t("span", zd, i(s.mode_of_payment || "—"), 1),
                        t("span", jd, i(s.reference_no || "—"), 1)
                      ]),
                      p(v)(s.bank_charges) > 0 ? (o(), d("div", qd, " + " + i(w(s.bank_charges)) + " bank charges ", 1)) : m("", !0)
                    ]))), 128))
                  ])
                ])) : m("", !0),
                Ce.value.length ? (o(), d("div", Fd, [
                  e[181] || (e[181] = t("div", { class: "inv-pay-section-lbl inv-pay-section-lbl-dn" }, "Debit Notes", -1)),
                  t("table", Kd, [
                    e[180] || (e[180] = t("thead", null, [
                      t("tr", null, [
                        t("th", null, "Debit Note"),
                        t("th", null, "Date"),
                        t("th", null, "Type"),
                        t("th", { class: "th-r" }, "Amount")
                      ])
                    ], -1)),
                    t("tbody", null, [
                      (o(!0), d(x, null, M(Ce.value, (s, n) => (o(), d("tr", { key: n }, [
                        t("td", Gd, [
                          J(It, {
                            doctype: "Debit Note",
                            name: s.debit_note
                          }, null, 8, ["name"])
                        ]),
                        t("td", Wd, i(p(K)(s.date)), 1),
                        t("td", null, [
                          s.type === "direct" ? (o(), d("span", Qd, "Issued")) : (o(), d("span", Jd, "Applied"))
                        ]),
                        t("td", Xd, i(w(s.amount)), 1)
                      ]))), 128))
                    ])
                  ])
                ])) : m("", !0),
                !pe.value.length && !Ce.value.length ? (o(), d("div", Yd, [
                  (o(), d("svg", Zd, [...e[182] || (e[182] = [
                    t("rect", {
                      x: "1",
                      y: "4",
                      width: "22",
                      height: "16",
                      rx: "2"
                    }, null, -1),
                    t("line", {
                      x1: "1",
                      y1: "10",
                      x2: "23",
                      y2: "10"
                    }, null, -1)
                  ])])),
                  e[183] || (e[183] = t("div", null, "No payments recorded yet.", -1)),
                  p(v)(c.value.outstanding_amount) > 0 && c.value.docstatus === 1 ? (o(), d("div", er, [
                    t("button", {
                      class: "inv-view-cta",
                      disabled: !a.$canCreate("payments"),
                      title: a.$canCreate("payments") ? "" : "Read-only access",
                      onClick: e[55] || (e[55] = (s) => Ht(c.value)),
                      style: { "font-size": "12px", padding: "7px 14px" }
                    }, "Record Payment", 8, tr)
                  ])) : m("", !0)
                ])) : m("", !0)
              ], 64))
            ])) : m("", !0),
            ce.value === "journal" ? (o(), d("div", ar, [
              J(ls, {
                "voucher-type": "Purchase Invoice",
                "voucher-no": c.value.name,
                label: "Bill",
                currency: c.value.currency || "KES"
              }, null, 8, ["voucher-no", "currency"])
            ])) : m("", !0)
          ])
        ], 64)) : m("", !0)
      ], 2),
      y.open ? (o(), d("div", {
        key: 3,
        class: "inv-drawer-bg",
        onClick: e[56] || (e[56] = Z((s) => y.open = !1, ["self"])),
        style: { "z-index": "60" }
      })) : m("", !0),
      y.open ? (o(), d("div", sr, [
        t("div", nr, [
          e[184] || (e[184] = t("div", { class: "inv-dh-title" }, "Add New Address", -1)),
          t("button", {
            class: "inv-dclose",
            onClick: e[57] || (e[57] = (s) => y.open = !1)
          }, [
            t("span", {
              innerHTML: p(f)("x", 16)
            }, null, 8, lr)
          ])
        ]),
        t("div", ir, [
          t("div", or, [
            t("div", null, [
              e[185] || (e[185] = t("label", { class: "inv-lbl" }, [
                g("Address Title "),
                t("span", { class: "inv-req" }, "*")
              ], -1)),
              T(t("input", {
                "onUpdate:modelValue": e[58] || (e[58] = (s) => y.address_title = s),
                type: "text",
                class: "inv-fi",
                placeholder: "e.g. Head Office"
              }, null, 512), [
                [$, y.address_title]
              ])
            ]),
            t("div", null, [
              e[187] || (e[187] = t("label", { class: "inv-lbl" }, "Address Type", -1)),
              T(t("select", {
                "onUpdate:modelValue": e[59] || (e[59] = (s) => y.address_type = s),
                class: "inv-fi"
              }, [...e[186] || (e[186] = [
                Q("<option data-v-00c5eab7>Billing</option><option data-v-00c5eab7>Shipping</option><option data-v-00c5eab7>Office</option><option data-v-00c5eab7>Personal</option><option data-v-00c5eab7>Plant</option><option data-v-00c5eab7>Postal</option><option data-v-00c5eab7>Shop</option><option data-v-00c5eab7>Subsidiary</option><option data-v-00c5eab7>Warehouse</option><option data-v-00c5eab7>Other</option>", 10)
              ])], 512), [
                [ne, y.address_type]
              ])
            ])
          ]),
          t("div", null, [
            e[188] || (e[188] = t("label", { class: "inv-lbl" }, [
              g("Address Line 1 "),
              t("span", { class: "inv-req" }, "*")
            ], -1)),
            T(t("input", {
              "onUpdate:modelValue": e[60] || (e[60] = (s) => y.address_line1 = s),
              type: "text",
              class: "inv-fi",
              placeholder: "Street / Building"
            }, null, 512), [
              [$, y.address_line1]
            ])
          ]),
          t("div", null, [
            e[189] || (e[189] = t("label", { class: "inv-lbl" }, "Address Line 2", -1)),
            T(t("input", {
              "onUpdate:modelValue": e[61] || (e[61] = (s) => y.address_line2 = s),
              type: "text",
              class: "inv-fi",
              placeholder: "Area / Locality"
            }, null, 512), [
              [$, y.address_line2]
            ])
          ]),
          t("div", dr, [
            t("div", null, [
              e[190] || (e[190] = t("label", { class: "inv-lbl" }, "City", -1)),
              T(t("input", {
                "onUpdate:modelValue": e[62] || (e[62] = (s) => y.city = s),
                type: "text",
                class: "inv-fi",
                placeholder: "City"
              }, null, 512), [
                [$, y.city]
              ])
            ]),
            t("div", null, [
              e[192] || (e[192] = t("label", { class: "inv-lbl" }, "Country", -1)),
              T(t("select", {
                "onUpdate:modelValue": e[63] || (e[63] = (s) => y.country = s),
                class: "inv-fi",
                onChange: e[64] || (e[64] = (s) => y.state = "")
              }, [
                e[191] || (e[191] = t("option", { value: "" }, "— Select Country —", -1)),
                (o(!0), d(x, null, M(p(Ra), (s) => (o(), d("option", {
                  key: s,
                  value: s
                }, i(s), 9, rr))), 128))
              ], 544), [
                [ne, y.country]
              ])
            ])
          ]),
          t("div", ur, [
            t("div", null, [
              e[194] || (e[194] = t("label", { class: "inv-lbl" }, "State", -1)),
              p(At)(y.country).length ? T((o(), d("select", {
                key: 0,
                "onUpdate:modelValue": e[65] || (e[65] = (s) => y.state = s),
                class: "inv-fi"
              }, [
                e[193] || (e[193] = t("option", { value: "" }, "— Select State —", -1)),
                (o(!0), d(x, null, M(p(At)(y.country), (s) => (o(), d("option", {
                  key: s,
                  value: s
                }, i(s), 9, cr))), 128))
              ], 512)), [
                [ne, y.state]
              ]) : T((o(), d("input", {
                key: 1,
                "onUpdate:modelValue": e[66] || (e[66] = (s) => y.state = s),
                type: "text",
                class: "inv-fi",
                placeholder: "State"
              }, null, 512)), [
                [$, y.state]
              ])
            ]),
            t("div", null, [
              e[195] || (e[195] = t("label", { class: "inv-lbl" }, "Pin Code", -1)),
              T(t("input", {
                "onUpdate:modelValue": e[67] || (e[67] = (s) => y.pincode = s),
                type: "text",
                class: "inv-fi",
                placeholder: "PIN"
              }, null, 512), [
                [$, y.pincode]
              ])
            ])
          ])
        ]),
        t("div", pr, [
          t("button", {
            class: "form-btn form-btn-outline",
            onClick: e[68] || (e[68] = (s) => y.open = !1),
            disabled: y.saving
          }, "Cancel", 8, vr),
          t("button", {
            class: "form-btn form-btn-primary",
            disabled: y.saving || !a.$canCreate("customers"),
            title: a.$canCreate("customers") ? "" : "Read-only access",
            onClick: ea
          }, i(y.saving ? "Saving…" : "Save Address"), 9, mr)
        ])
      ])) : m("", !0)
    ]));
  }
}, Dr = /* @__PURE__ */ Ha(_r, [["__scopeId", "data-v-00c5eab7"]]);
export {
  Dr as default
};
