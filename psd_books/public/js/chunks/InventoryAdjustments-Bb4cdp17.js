import { _ as He, x as $e, y as xe, o as Ve, c, a as t, u, i as y, w as P, A as oe, d as m, C as Ae, b as _, F as w, r as R, t as o, q as he, D as G, n as b, v as Ne, e as J, l as O, S as De, h as v, g as T, z as Ee, J as Be, a8 as ye, f as le, a3 as Ie, k as d, X as Ue } from "./main-BYfdjbM7.js";
import { b as A, f as r } from "./format-BcJZDVG4.js";
import { o as be } from "./userNames-C-jSbOMF.js";
import { _ as K } from "./SearchableSelect-D6VlErXu.js";
import { S as Re } from "./SummaryStrip-B-mwor7Y.js";
const Oe = { class: "ia-page" }, Fe = { class: "ia-actions" }, Qe = { class: "ia-search-wrap" }, ze = ["innerHTML"], We = { style: { display: "flex", gap: "8px" } }, Pe = ["innerHTML"], Ge = ["disabled"], Je = ["innerHTML"], Ke = ["disabled", "title"], Xe = ["innerHTML"], Ye = { class: "ia-card" }, Ze = { class: "ia-table ia-desktop-table" }, et = ["innerHTML"], tt = ["innerHTML"], st = ["innerHTML"], at = ["onClick"], nt = { class: "mono-sm text-muted" }, ot = { class: "font-medium" }, lt = {
  class: "text-muted",
  style: { "font-size": "11px", "margin-left": "6px" }
}, it = {
  key: 0,
  class: "ia-batch-pill"
}, ut = { class: "text-muted" }, dt = {
  key: 0,
  class: "ia-reason"
}, ct = {
  key: 1,
  class: "text-muted"
}, rt = { key: 0 }, mt = {
  colspan: "7",
  class: "ia-empty"
}, vt = { class: "ia-mobile-cards" }, _t = {
  key: 1,
  class: "ia-mc-empty"
}, ht = ["onClick"], yt = { class: "ia-mc-top" }, bt = { class: "ia-mc-docno" }, pt = { class: "ia-mc-mid" }, ft = {
  class: "text-muted",
  style: { "font-size": "11px", "margin-left": "6px" }
}, gt = {
  key: 0,
  class: "ia-batch-pill"
}, wt = { class: "ia-mc-meta" }, kt = { class: "ia-dheader" }, Ct = ["innerHTML"], Lt = { class: "ia-dh-top" }, jt = { class: "ia-dh-ico" }, St = ["innerHTML"], qt = { class: "ia-dbody" }, Tt = { class: "ia-section-hdr" }, Mt = ["innerHTML"], Ht = { class: "ia-fields-grid" }, $t = {
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, xt = {
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, Vt = {
  key: 0,
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, At = ["value"], Nt = {
  key: 1,
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, Dt = {
  key: 0,
  class: "ia-hint"
}, Et = { class: "ia-section-hdr" }, Bt = ["innerHTML"], It = { class: "ia-qty-grid" }, Ut = { class: "ia-stat" }, Rt = { class: "ia-stat-lbl" }, Ot = { class: "ia-stat-val" }, Ft = { class: "ia-field" }, Qt = ["disabled"], zt = { class: "ia-stat-val" }, Wt = { class: "ia-hint" }, Pt = { class: "ia-section-hdr" }, Gt = ["innerHTML"], Jt = { class: "ia-fields-grid" }, Kt = {
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, Xt = ["value"], Yt = {
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, Zt = {
  class: "ia-field",
  style: { "grid-column": "1/-1" }
}, es = { class: "ia-dfooter" }, ts = ["disabled"], ss = ["innerHTML"], as = { class: "ia-dheader" }, ns = ["innerHTML"], os = { class: "ia-dh-top" }, ls = { class: "ia-dh-ico" }, is = ["innerHTML"], us = { class: "ia-dh-title" }, ds = {
  class: "text-muted",
  style: { "font-size": "11px", "margin-left": "6px" }
}, cs = { class: "ia-dh-sub" }, rs = { key: 0 }, ms = { class: "ia-dh-amount" }, vs = { class: "ia-dbody" }, _s = { class: "ia-section-hdr" }, hs = ["innerHTML"], ys = { class: "ia-meta-grid" }, bs = {
  class: "mono-sm",
  style: { color: "#2563eb" }
}, ps = { key: 0 }, fs = {
  class: "mono-sm",
  style: { color: "#6b21a8" }
}, gs = { class: "mono-sm" }, ws = { class: "ia-section-hdr" }, ks = ["innerHTML"], Cs = { class: "ia-remark" }, Ls = {
  key: 1,
  class: "inv-view-footer"
}, js = { class: "ia-dfooter" }, Ss = ["disabled"], qs = ["innerHTML"], Ts = ["disabled"], Ms = ["innerHTML"], Hs = { style: { "margin-left": "auto" } }, $s = {
  __name: "InventoryAdjustments",
  setup(xs) {
    const { toast: k } = $e(), { confirm: ie } = Ie(), M = De(), p = v([]), N = v(!1), F = v(""), S = v(!1), D = v(!1), H = v(!1), C = v(!1), i = v(null), X = v([]), Q = v([]), E = v([]), f = v(0), L = v(0), Y = v(!1), j = v([]), z = v(!1), W = v("posting_date"), B = v("desc"), pe = ["Stock count discrepancy", "Damaged", "Expired", "Theft / Loss", "Found / Surplus", "Other"], n = Ee({ warehouse: "", item_code: "", new_qty: null, reason: "", notes: "", adjustment_account: "", batch_no: "", item_has_batch_no: 0, stock_uom: "" });
    async function I() {
      N.value = !0;
      try {
        const a = await J(), e = await O("psd_books.api.inventory.get_inventory_adjustments", { company: a });
        p.value = Array.isArray(e) ? e : (e == null ? void 0 : e.message) || [];
      } catch (a) {
        k.error(a.message || "Failed to load adjustments");
      } finally {
        N.value = !1;
      }
    }
    const fe = T(() => {
      if (!F.value.trim()) return p.value;
      const a = F.value.toLowerCase();
      return p.value.filter((e) => (e.item_code || "").toLowerCase().includes(a) || (e.item_name || "").toLowerCase().includes(a) || (e.warehouse || "").toLowerCase().includes(a) || (e.adjustment_reason || "").toLowerCase().includes(a));
    }), $ = T(() => {
      const a = W.value;
      return [...fe.value].sort((e, s) => {
        const l = e[a] ?? "", g = s[a] ?? "", U = typeof l == "number" ? l - g : String(l).localeCompare(String(g));
        return B.value === "asc" ? U : -U;
      });
    });
    function Z(a) {
      W.value === a ? B.value = B.value === "asc" ? "desc" : "asc" : (W.value = a, B.value = "asc");
    }
    function ee(a) {
      return W.value !== a ? '<span style="color:#d1d5db">⇅</span>' : B.value === "asc" ? "↑" : "↓";
    }
    const ge = T(() => p.value.filter((a) => r(a.qty) > 0).length), we = T(() => p.value.filter((a) => r(a.qty) < 0).length), ue = T(() => p.value.filter((a) => a.docstatus === 1).reduce((a, e) => a + r(e.value), 0)), x = T(() => n.new_qty === null || n.new_qty === "" ? 0 : r(n.new_qty) - r(f.value)), de = T(() => n.warehouse && n.item_code && n.reason && n.new_qty !== null && n.new_qty !== "" && r(n.new_qty) >= 0 && Math.abs(x.value) > 1e-7 && (!n.item_has_batch_no || !!n.batch_no));
    function V(a) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(r(a));
    }
    function q(a) {
      return Number(r(a)).toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
    async function ce(a = "") {
      try {
        const e = await J(), s = await le("Warehouse", { fields: ["name"], filters: [["company", "=", e], ["is_group", "=", 0], ...a ? [["name", "like", `%${a}%`]] : []], limit: 30 });
        X.value = s.map((l) => ({ label: l.name, value: l.name }));
      } catch {
        X.value = [];
      }
    }
    async function re(a = "") {
      try {
        const e = await le("Item", { fields: ["name", "item_name", "has_batch_no", "stock_uom"], filters: [["disabled", "=", 0], ...a ? [["name", "like", `%${a}%`]] : []], limit: 30 });
        Q.value = e.map((s) => ({
          label: `${s.name} (${s.stock_uom || "Nos"})`,
          value: s.name,
          has_batch_no: s.has_batch_no ? 1 : 0,
          stock_uom: s.stock_uom || ""
        }));
      } catch {
        Q.value = [];
      }
    }
    async function me(a = "") {
      try {
        const e = await J(), s = await le("Account", { fields: ["name", "account_name"], filters: [["company", "=", e], ["is_group", "=", 0], ["account_type", "in", ["Stock Adjustment", "Expense", "Temporary"]], ...a ? [["name", "like", `%${a}%`]] : []], limit: 30 });
        E.value = s.map((l) => ({ label: l.account_name || l.name, value: l.name }));
      } catch {
        E.value = [];
      }
    }
    async function ke() {
      var a;
      if (!n.item_code || !n.warehouse) {
        f.value = 0, L.value = 0;
        return;
      }
      Y.value = !0;
      try {
        const e = await O("psd_books.api.inventory.get_item_stock_detail", { item_code: n.item_code, warehouse: n.warehouse }), s = ((e == null ? void 0 : e.warehouses) || ((a = e == null ? void 0 : e.message) == null ? void 0 : a.warehouses) || []).find((l) => l.warehouse === n.warehouse);
        f.value = r(s == null ? void 0 : s.actual_qty), L.value = r(s == null ? void 0 : s.valuation_rate);
      } catch {
        f.value = 0, L.value = 0;
      } finally {
        Y.value = !1;
      }
    }
    async function Ce() {
      if (!n.item_code || !n.warehouse) {
        j.value = [];
        return;
      }
      z.value = !0;
      try {
        const a = await O("psd_books.api.inventory.get_warehouse_batches", { warehouse: n.warehouse }), s = ((a == null ? void 0 : a.message) || a || {})[n.item_code] || [];
        j.value = s.map((l) => ({
          label: `${l.batch_no} — ${q(l.qty)} on hand${l.is_expired ? " · Expired" : l.expires_soon ? " · Expires soon" : ""}`,
          value: l.batch_no,
          qty: r(l.qty)
        }));
      } catch {
        j.value = [];
      } finally {
        z.value = !1;
      }
    }
    async function te() {
      var a;
      if (n.batch_no = "", j.value = [], f.value = 0, L.value = 0, !(!n.item_code || !n.warehouse))
        if (n.item_has_batch_no) {
          await Ce();
          try {
            const e = await O("psd_books.api.inventory.get_item_stock_detail", { item_code: n.item_code, warehouse: n.warehouse }), s = ((e == null ? void 0 : e.warehouses) || ((a = e == null ? void 0 : e.message) == null ? void 0 : a.warehouses) || []).find((l) => l.warehouse === n.warehouse);
            L.value = r(s == null ? void 0 : s.valuation_rate);
          } catch {
          }
        } else
          await ke();
    }
    function ve(a) {
      n.batch_no = (a == null ? void 0 : a.value) ?? a;
      const e = j.value.find((s) => s.value === n.batch_no);
      f.value = e ? e.qty : 0;
    }
    function Le(a) {
      n.item_code = (a == null ? void 0 : a.value) ?? a, n.item_has_batch_no = a != null && a.has_batch_no ? 1 : 0, n.stock_uom = (a == null ? void 0 : a.stock_uom) || "", te();
    }
    xe(() => n.warehouse, () => {
      n.item_code && te();
    });
    async function se(a) {
      if (Object.assign(n, { warehouse: "", item_code: "", new_qty: null, reason: "", notes: "", adjustment_account: "", batch_no: "", item_has_batch_no: 0, stock_uom: "" }), f.value = 0, L.value = 0, j.value = [], await Promise.all([ce(""), re(""), me(""), je()]), a) {
        if (n.warehouse = a.warehouse || "", n.item_code = a.item || "", n.item_code) {
          const e = Q.value.find((s) => s.value === n.item_code);
          n.item_has_batch_no = e != null && e.has_batch_no ? 1 : 0, n.stock_uom = (e == null ? void 0 : e.stock_uom) || "";
        }
        n.item_code && n.warehouse && await te();
      }
      S.value = !0;
    }
    async function _e(a) {
      i.value = a, C.value = !0;
      try {
        const e = await Ue("Stock Entry", a.name);
        i.value && i.value.name === a.name && (i.value = { ...a, ...e });
      } catch {
      }
    }
    async function je() {
      var a;
      try {
        const e = await J(), s = await O("psd_books.api.inventory.get_default_adjustment_account", { company: e }), l = (s == null ? void 0 : s.account) || ((a = s == null ? void 0 : s.message) == null ? void 0 : a.account) || "";
        l && (n.adjustment_account = l, E.value.find((g) => g.value === l) || E.value.unshift({ label: l, value: l }));
      } catch {
      }
    }
    async function Se() {
      var a;
      if (de.value) {
        D.value = !0;
        try {
          const e = n.item_has_batch_no ? "psd_books.api.inventory.create_batch_adjustment" : "psd_books.api.inventory.create_inventory_adjustment", s = {
            item_code: n.item_code,
            warehouse: n.warehouse,
            new_qty: r(n.new_qty),
            reason: n.reason,
            notes: n.notes || "",
            adjustment_account: n.adjustment_account || ""
          };
          n.item_has_batch_no && (s.batch_no = n.batch_no);
          const l = await Be(e, s), g = ((a = l == null ? void 0 : l.message) == null ? void 0 : a.delta) ?? (l == null ? void 0 : l.delta);
          k.success(`Adjustment posted (${g > 0 ? "+" : ""}${q(g)})${n.batch_no ? ` — Batch ${n.batch_no}` : ""}`), S.value = !1, await I();
        } catch (e) {
          k.error(e.message || "Failed to post adjustment");
        } finally {
          D.value = !1;
        }
      }
    }
    async function qe(a) {
      if (await ie({ title: "Cancel this adjustment?", body: `Cancelling ${a.name} reverses the stock change and its ledger entries.`, okLabel: "Cancel Adjustment", okStyle: "danger" })) {
        H.value = !0;
        try {
          await ye("Stock Entry", a.name), k.success(`${a.name} cancelled`), C.value = !1, await I();
        } catch (s) {
          k.error(s.message || "Failed to cancel");
        } finally {
          H.value = !1;
        }
      }
    }
    async function Te(a) {
      if (await ie({
        title: "Edit this adjustment?",
        body: `This cancels ${a.name} — reversing its stock and ledger entries — then opens a corrected adjustment for the same item. Both entries stay in the list for audit purposes.`,
        okLabel: "Cancel & Correct",
        okStyle: "danger"
      })) {
        H.value = !0;
        try {
          await ye("Stock Entry", a.name), C.value = !1, await se({ warehouse: a.warehouse, item: a.item_code }), n.reason = a.adjustment_reason || "", n.notes = a.remarks || "", a.adjustment_account && (n.adjustment_account = a.adjustment_account), a.batch_no && ve(a.batch_no), n.new_qty = r(f.value) + r(a.qty), k.success(`${a.name} cancelled — enter the corrected quantity and post`), await I();
        } catch (s) {
          k.error(s.message || "Failed to start edit");
        } finally {
          H.value = !1;
        }
      }
    }
    function Me() {
      const a = $.value;
      if (!a.length) return;
      const e = (h) => {
        const ne = h == null ? "" : String(h);
        return /[",\n]/.test(ne) ? '"' + ne.replace(/"/g, '""') + '"' : ne;
      }, s = (h) => h === 1 ? "Submitted" : h === 2 ? "Cancelled" : "Draft", l = [["Entry #", "Date", "Item", "Batch", "Warehouse", "Reason", "Qty Change", "Value", "Status"].join(",")];
      for (const h of a) l.push([h.name, A(h.posting_date), h.item_name || h.item_code, h.batch_no || "", h.warehouse || "", h.adjustment_reason || "", r(h.qty), r(h.value), s(h.docstatus)].map(e).join(","));
      const g = new Blob(["\uFEFF" + l.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), U = URL.createObjectURL(g), ae = document.createElement("a");
      ae.href = U, ae.download = `stock_adjustments_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, ae.click(), URL.revokeObjectURL(U), k.success(`Exported ${a.length} row(s)`);
    }
    return Ve(async () => {
      await I(), (M.query.item || M.query.warehouse) && se({ item: M.query.item ? String(M.query.item) : "", warehouse: M.query.warehouse ? String(M.query.warehouse) : "" });
    }), (a, e) => (d(), c("div", Oe, [
      t("div", Fe, [
        t("div", Qe, [
          t("span", {
            innerHTML: u(y)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, ze),
          P(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => F.value = s),
            placeholder: "Search adjustments…",
            class: "ia-search-input"
          }, null, 512), [
            [oe, F.value]
          ])
        ]),
        t("div", We, [
          t("button", {
            class: "ia-btn-ghost",
            onClick: I
          }, [
            t("span", {
              innerHTML: u(y)("refresh", 14)
            }, null, 8, Pe)
          ]),
          t("button", {
            class: "ia-btn-ghost",
            onClick: Me,
            disabled: !$.value.length
          }, [
            t("span", {
              innerHTML: u(y)("download", 14)
            }, null, 8, Je),
            e[20] || (e[20] = m(" Export", -1))
          ], 8, Ge),
          t("button", {
            class: "ia-btn-primary",
            disabled: !a.$canCreate("inventory"),
            title: a.$canCreate("inventory") ? "" : "Read-only access",
            onClick: e[1] || (e[1] = (s) => se())
          }, [
            t("span", {
              innerHTML: u(y)("plus", 13)
            }, null, 8, Xe),
            e[21] || (e[21] = m(" New Adjustment", -1))
          ], 8, Ke)
        ])
      ]),
      N.value ? _("", !0) : (d(), Ae(Re, {
        key: 0,
        cards: [
          { label: "Total Adjustments", tone: "default", value: p.value.length },
          { label: "Increases", tone: "success", value: ge.value, valueClass: "green" },
          { label: "Decreases", tone: "danger", value: we.value, valueClass: "red" },
          { label: "Net Value Impact", tone: "accent", value: V(ue.value), valueClass: ue.value >= 0 ? "green" : "red" }
        ]
      }, null, 8, ["cards"])),
      t("div", Ye, [
        t("table", Ze, [
          t("thead", null, [
            t("tr", null, [
              t("th", {
                onClick: e[2] || (e[2] = (s) => Z("posting_date")),
                class: "sortable"
              }, [
                e[22] || (e[22] = m("Date ", -1)),
                t("span", {
                  innerHTML: ee("posting_date")
                }, null, 8, et)
              ]),
              t("th", {
                onClick: e[3] || (e[3] = (s) => Z("item_code")),
                class: "sortable"
              }, [
                e[23] || (e[23] = m("Item ", -1)),
                t("span", {
                  innerHTML: ee("item_code")
                }, null, 8, tt)
              ]),
              e[25] || (e[25] = t("th", null, "Warehouse", -1)),
              e[26] || (e[26] = t("th", null, "Reason", -1)),
              t("th", {
                onClick: e[4] || (e[4] = (s) => Z("qty")),
                class: "sortable ta-r"
              }, [
                e[24] || (e[24] = m("Qty Change ", -1)),
                t("span", {
                  innerHTML: ee("qty")
                }, null, 8, st)
              ]),
              e[27] || (e[27] = t("th", { class: "ta-r" }, "Value", -1)),
              e[28] || (e[28] = t("th", null, "Status", -1))
            ])
          ]),
          t("tbody", null, [
            N.value ? (d(), c(w, { key: 0 }, R(6, (s) => t("tr", { key: s }, [...e[29] || (e[29] = [
              t("td", { colspan: "7" }, [
                t("div", { class: "ia-shimmer" })
              ], -1)
            ])])), 64)) : (d(), c(w, { key: 1 }, [
              (d(!0), c(w, null, R($.value, (s) => (d(), c("tr", {
                key: s.name,
                class: "ia-row",
                onClick: (l) => _e(s)
              }, [
                t("td", nt, o(u(A)(s.posting_date)), 1),
                t("td", ot, [
                  m(o(s.item_name || s.item_code) + " ", 1),
                  t("span", lt, " (" + o(s.stock_uom || "Nos") + ") ", 1),
                  s.batch_no ? (d(), c("span", it, o(s.batch_no), 1)) : _("", !0)
                ]),
                t("td", ut, o(s.warehouse || "—"), 1),
                t("td", null, [
                  s.adjustment_reason ? (d(), c("span", dt, o(s.adjustment_reason), 1)) : (d(), c("span", ct, "—"))
                ]),
                t("td", {
                  class: b(["ta-r mono-sm", u(r)(s.qty) >= 0 ? "green" : "red"])
                }, o(u(r)(s.qty) > 0 ? "+" : "") + o(q(s.qty)), 3),
                t("td", {
                  class: b(["ta-r mono-sm", u(r)(s.value) >= 0 ? "" : "red"])
                }, o(V(s.value)), 3),
                t("td", null, [
                  t("span", {
                    class: b(["ia-badge", s.docstatus === 1 ? "badge-green" : s.docstatus === 2 ? "badge-grey" : "badge-orange"])
                  }, o(s.docstatus === 1 ? "Submitted" : s.docstatus === 2 ? "Cancelled" : "Draft"), 3)
                ])
              ], 8, at))), 128)),
              $.value.length ? _("", !0) : (d(), c("tr", rt, [
                t("td", mt, o(p.value.length ? "No adjustments match your search" : "No stock adjustments yet"), 1)
              ]))
            ], 64))
          ])
        ]),
        t("div", vt, [
          N.value ? (d(), c(w, { key: 0 }, R(5, (s) => t("div", {
            key: s,
            class: "ia-mobile-card ia-mc--skeleton"
          }, [...e[30] || (e[30] = [
            t("div", {
              class: "ia-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            t("div", {
              class: "ia-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            t("div", {
              class: "ia-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : $.value.length ? (d(!0), c(w, { key: 2 }, R($.value, (s) => (d(), c("div", {
            key: s.name,
            class: "ia-mobile-card",
            onClick: (l) => _e(s)
          }, [
            t("div", yt, [
              t("span", bt, o(s.name), 1),
              t("span", {
                class: b(["ia-badge", s.docstatus === 1 ? "badge-green" : s.docstatus === 2 ? "badge-grey" : "badge-orange"])
              }, o(s.docstatus === 1 ? "Submitted" : s.docstatus === 2 ? "Cancelled" : "Draft"), 3)
            ]),
            t("div", pt, [
              m(o(s.item_name || s.item_code) + " ", 1),
              t("span", ft, " (" + o(s.stock_uom || "Nos") + ") ", 1),
              s.batch_no ? (d(), c("span", gt, o(s.batch_no), 1)) : _("", !0)
            ]),
            t("div", wt, [
              t("span", null, o(u(A)(s.posting_date)) + " · " + o(s.warehouse || "—"), 1),
              t("span", {
                class: b(u(r)(s.qty) >= 0 ? "ia-mc-pos" : "ia-mc-neg")
              }, o(u(r)(s.qty) > 0 ? "+" : "") + o(q(s.qty)), 3)
            ])
          ], 8, ht))), 128)) : (d(), c("div", _t, [
            e[31] || (e[31] = t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🔄", -1)),
            t("div", null, o(p.value.length ? "No adjustments match" : "No stock adjustments yet"), 1)
          ]))
        ])
      ]),
      S.value ? (d(), c("div", {
        key: 1,
        class: "ia-overlay",
        onClick: e[5] || (e[5] = he((s) => !D.value && (S.value = !1), ["self"]))
      })) : _("", !0),
      t("div", {
        class: b(["ia-drawer", { open: S.value }])
      }, [
        t("div", kt, [
          t("button", {
            class: "ia-dclose ia-dclose-abs",
            onClick: e[6] || (e[6] = (s) => S.value = !1)
          }, [
            t("span", {
              innerHTML: u(y)("x", 16)
            }, null, 8, Ct)
          ]),
          t("div", Lt, [
            t("div", jt, [
              t("span", {
                innerHTML: u(y)("repeat", 20)
              }, null, 8, St)
            ]),
            e[32] || (e[32] = t("div", null, [
              t("div", { class: "ia-dh-title" }, "New Stock Adjustment"),
              t("div", { class: "ia-dh-sub" }, "Correct on-hand quantity after a recount")
            ], -1))
          ])
        ]),
        t("div", qt, [
          t("div", Tt, [
            t("span", {
              innerHTML: u(y)("box", 13)
            }, null, 8, Mt),
            e[33] || (e[33] = m(" Item & Warehouse", -1))
          ]),
          t("div", Ht, [
            t("div", $t, [
              e[34] || (e[34] = t("label", { class: "ia-label" }, [
                m("Warehouse "),
                t("span", { class: "req" }, "*")
              ], -1)),
              G(K, {
                modelValue: n.warehouse,
                "onUpdate:modelValue": e[7] || (e[7] = (s) => n.warehouse = s),
                options: X.value,
                placeholder: "Select warehouse…",
                onSearch: ce
              }, null, 8, ["modelValue", "options"])
            ]),
            t("div", xt, [
              e[35] || (e[35] = t("label", { class: "ia-label" }, [
                m("Item "),
                t("span", { class: "req" }, "*")
              ], -1)),
              G(K, {
                modelValue: n.item_code,
                "onUpdate:modelValue": e[8] || (e[8] = (s) => n.item_code = s),
                options: Q.value,
                placeholder: "Select item…",
                onSearch: re,
                onSelect: Le
              }, null, 8, ["modelValue", "options"])
            ]),
            n.item_code ? (d(), c("div", Vt, [
              e[36] || (e[36] = t("label", { class: "ia-label" }, "Stock UOM", -1)),
              t("input", {
                value: n.stock_uom || "—",
                type: "text",
                class: "ia-input",
                disabled: ""
              }, null, 8, At)
            ])) : _("", !0),
            n.item_has_batch_no ? (d(), c("div", Nt, [
              e[37] || (e[37] = t("label", { class: "ia-label" }, [
                m("Batch No "),
                t("span", { class: "req" }, "*")
              ], -1)),
              G(K, {
                modelValue: n.batch_no,
                "onUpdate:modelValue": e[9] || (e[9] = (s) => n.batch_no = s),
                options: j.value,
                placeholder: "Select batch…",
                onSelect: ve
              }, null, 8, ["modelValue", "options"]),
              n.item_code && n.warehouse && !z.value && !j.value.length ? (d(), c("div", Dt, "No batch-wise stock found for this item in this warehouse.")) : _("", !0)
            ])) : _("", !0)
          ]),
          t("div", Et, [
            t("span", {
              innerHTML: u(y)("balance", 13)
            }, null, 8, Bt),
            e[38] || (e[38] = m(" Quantity", -1))
          ]),
          t("div", It, [
            t("div", Ut, [
              t("div", Rt, o(n.item_has_batch_no ? "Current Batch Qty" : "Current on hand"), 1),
              t("div", Ot, o(Y.value || z.value ? "…" : q(f.value)), 1)
            ]),
            t("div", Ft, [
              e[39] || (e[39] = t("label", { class: "ia-label" }, [
                m("New counted qty "),
                t("span", { class: "req" }, "*")
              ], -1)),
              P(t("input", {
                "onUpdate:modelValue": e[10] || (e[10] = (s) => n.new_qty = s),
                type: "number",
                min: "0",
                step: "0.001",
                class: "ia-input ta-r",
                disabled: !n.item_code || !n.warehouse || n.item_has_batch_no && !n.batch_no
              }, null, 8, Qt), [
                [
                  oe,
                  n.new_qty,
                  void 0,
                  { number: !0 }
                ]
              ])
            ]),
            t("div", {
              class: b(["ia-stat", x.value > 0 ? "pos" : x.value < 0 ? "neg" : ""])
            }, [
              e[40] || (e[40] = t("div", { class: "ia-stat-lbl" }, "Difference", -1)),
              t("div", zt, o(x.value > 0 ? "+" : "") + o(q(x.value)), 1)
            ], 2)
          ]),
          t("div", Wt, o(n.item_has_batch_no && !n.batch_no ? "Select a batch above to see its current quantity." : `Value impact ≈ ${V(x.value * L.value)} at the current rate of ${V(L.value)}/unit.`), 1),
          t("div", Pt, [
            t("span", {
              innerHTML: u(y)("file", 13)
            }, null, 8, Gt),
            e[41] || (e[41] = m(" Reason", -1))
          ]),
          t("div", Jt, [
            t("div", Kt, [
              e[43] || (e[43] = t("label", { class: "ia-label" }, [
                m("Reason "),
                t("span", { class: "req" }, "*")
              ], -1)),
              P(t("select", {
                "onUpdate:modelValue": e[11] || (e[11] = (s) => n.reason = s),
                class: "ia-input"
              }, [
                e[42] || (e[42] = t("option", { value: "" }, "Select a reason…", -1)),
                (d(), c(w, null, R(pe, (s) => t("option", {
                  key: s,
                  value: s
                }, o(s), 9, Xt)), 64))
              ], 512), [
                [Ne, n.reason]
              ])
            ]),
            t("div", Yt, [
              e[44] || (e[44] = t("label", { class: "ia-label" }, "Notes", -1)),
              P(t("textarea", {
                "onUpdate:modelValue": e[12] || (e[12] = (s) => n.notes = s),
                rows: "2",
                class: "ia-input",
                placeholder: "Optional details…"
              }, null, 512), [
                [oe, n.notes]
              ])
            ]),
            t("div", Zt, [
              e[45] || (e[45] = t("label", { class: "ia-label" }, "Adjustment Account", -1)),
              G(K, {
                modelValue: n.adjustment_account,
                "onUpdate:modelValue": e[13] || (e[13] = (s) => n.adjustment_account = s),
                options: E.value,
                placeholder: "Default (Stock Adjustment)",
                onSearch: me
              }, null, 8, ["modelValue", "options"]),
              e[46] || (e[46] = t("div", { class: "ia-hint" }, "Leave as default unless you want to post the difference elsewhere.", -1))
            ])
          ])
        ]),
        t("div", es, [
          t("button", {
            class: "ia-btn-ghost",
            onClick: e[14] || (e[14] = (s) => S.value = !1)
          }, "Cancel"),
          t("button", {
            class: "ia-btn-primary",
            disabled: D.value || !de.value,
            onClick: Se
          }, [
            t("span", {
              innerHTML: u(y)("check", 13)
            }, null, 8, ss),
            m(" " + o(D.value ? "Posting…" : "Post Adjustment"), 1)
          ], 8, ts)
        ])
      ], 2),
      C.value ? (d(), c("div", {
        key: 2,
        class: "ia-overlay",
        onClick: e[15] || (e[15] = he((s) => C.value = !1, ["self"]))
      })) : _("", !0),
      t("div", {
        class: b(["ia-drawer ia-view-drawer", { open: C.value }])
      }, [
        i.value ? (d(), c(w, { key: 0 }, [
          t("div", as, [
            t("button", {
              class: "ia-dclose ia-dclose-abs",
              onClick: e[16] || (e[16] = (s) => C.value = !1)
            }, [
              t("span", {
                innerHTML: u(y)("x", 16)
              }, null, 8, ns)
            ]),
            t("div", os, [
              t("div", ls, [
                t("span", {
                  innerHTML: u(y)("repeat", 20)
                }, null, 8, is)
              ]),
              t("div", null, [
                t("div", us, [
                  m(o(i.value.item_name || i.value.item_code) + " ", 1),
                  t("span", ds, " (" + o(i.value.stock_uom || "Nos") + ") ", 1)
                ]),
                t("div", cs, [
                  m(o(i.value.warehouse) + " · " + o(u(A)(i.value.posting_date)), 1),
                  i.value.batch_no ? (d(), c("span", rs, " · Batch " + o(i.value.batch_no), 1)) : _("", !0)
                ])
              ]),
              t("span", {
                class: b(["ia-badge", i.value.docstatus === 1 ? "badge-green" : i.value.docstatus === 2 ? "badge-grey" : "badge-orange"])
              }, o(i.value.docstatus === 1 ? "Submitted" : i.value.docstatus === 2 ? "Cancelled" : "Draft"), 3)
            ]),
            t("div", ms, [
              e[47] || (e[47] = t("div", { class: "ia-dh-amt-lbl" }, "Quantity Change", -1)),
              t("div", {
                class: b(["ia-dh-amt-val", u(r)(i.value.qty) >= 0 ? "green" : "red"])
              }, o(u(r)(i.value.qty) > 0 ? "+" : "") + o(q(i.value.qty)), 3)
            ])
          ]),
          t("div", vs, [
            t("div", _s, [
              t("span", {
                innerHTML: u(y)("info", 13)
              }, null, 8, hs),
              e[48] || (e[48] = m(" Details", -1))
            ]),
            t("div", ys, [
              t("div", null, [
                e[49] || (e[49] = t("div", { class: "ia-meta-lbl" }, "Entry #", -1)),
                t("div", bs, o(i.value.name), 1)
              ]),
              i.value.batch_no ? (d(), c("div", ps, [
                e[50] || (e[50] = t("div", { class: "ia-meta-lbl" }, "Batch", -1)),
                t("div", fs, o(i.value.batch_no), 1)
              ])) : _("", !0),
              t("div", null, [
                e[51] || (e[51] = t("div", { class: "ia-meta-lbl" }, "Reason", -1)),
                t("div", null, o(i.value.adjustment_reason || "—"), 1)
              ]),
              t("div", null, [
                e[52] || (e[52] = t("div", { class: "ia-meta-lbl" }, "Value Impact", -1)),
                t("div", {
                  class: b(["mono-sm", u(r)(i.value.value) >= 0 ? "green" : "red"])
                }, o(V(i.value.value)), 3)
              ]),
              t("div", null, [
                e[53] || (e[53] = t("div", { class: "ia-meta-lbl" }, "Rate / unit", -1)),
                t("div", gs, o(V(i.value.basic_rate)), 1)
              ])
            ]),
            i.value.remarks ? (d(), c(w, { key: 0 }, [
              t("div", ws, [
                t("span", {
                  innerHTML: u(y)("file", 13)
                }, null, 8, ks),
                e[54] || (e[54] = m(" Notes", -1))
              ]),
              t("div", Cs, o(i.value.remarks), 1)
            ], 64)) : _("", !0),
            i.value.owner ? (d(), c("div", Ls, [
              m(" Created by " + o(u(be)(i.value.owner)) + " on " + o(u(A)(i.value.creation)) + " ", 1),
              i.value.modified_by ? (d(), c(w, { key: 0 }, [
                m(" · Last modified by " + o(u(be)(i.value.modified_by)) + " on " + o(u(A)(i.value.modified)), 1)
              ], 64)) : _("", !0)
            ])) : _("", !0)
          ]),
          t("div", js, [
            i.value.docstatus === 1 ? (d(), c("button", {
              key: 0,
              class: "ia-btn-ghost",
              onClick: e[17] || (e[17] = (s) => Te(i.value)),
              disabled: H.value,
              title: "Cancels this entry (reversing its GL/stock impact) and opens a corrected replacement, so the audit trail shows both"
            }, [
              t("span", {
                innerHTML: u(y)("edit", 13)
              }, null, 8, qs),
              e[55] || (e[55] = m(" Edit", -1))
            ], 8, Ss)) : _("", !0),
            i.value.docstatus === 1 ? (d(), c("button", {
              key: 1,
              class: "ia-btn-danger-ghost",
              onClick: e[18] || (e[18] = (s) => qe(i.value)),
              disabled: H.value
            }, [
              t("span", {
                innerHTML: u(y)("cancel", 13)
              }, null, 8, Ms),
              e[56] || (e[56] = m(" Cancel Adjustment", -1))
            ], 8, Ts)) : _("", !0),
            t("div", Hs, [
              t("button", {
                class: "ia-btn-ghost",
                onClick: e[19] || (e[19] = (s) => C.value = !1)
              }, "Close")
            ])
          ])
        ], 64)) : _("", !0)
      ], 2)
    ]));
  }
}, Bs = /* @__PURE__ */ He($s, [["__scopeId", "data-v-6769b732"]]);
export {
  Bs as default
};
