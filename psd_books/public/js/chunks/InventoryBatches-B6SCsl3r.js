import { _ as Te, x as He, y as be, o as Ve, c as r, a as t, u as p, i as C, w as S, A as R, D as Q, C as Ee, b as g, F as $, r as A, t as n, d as _, v as qe, q as ve, $ as Be, n as B, f as T, h as m, z as fe, g as k, K as le, e as De, L as Ue, k as i } from "./main-DMuK85je.js";
import { b as H, f as j, t as he } from "./format-BcJZDVG4.js";
import { o as _e } from "./userNames-CP8qxgTL.js";
import { _ as W } from "./SearchableSelect-BQDdnIlC.js";
import { S as Ne } from "./SummaryStrip-B-XCvFfz.js";
const Ie = { class: "bt-page" }, Oe = { class: "bt-toolbar" }, Fe = { class: "bt-fld bt-fld-search" }, Re = { class: "bt-search-wrap" }, Qe = ["innerHTML"], Ae = { class: "bt-fld bt-fld-item" }, je = { class: "bt-fld bt-fld-wh" }, We = ["disabled"], ze = ["innerHTML"], Pe = ["disabled"], Ke = ["innerHTML"], Ye = ["disabled", "title"], Ge = ["innerHTML"], Je = {
  key: 1,
  class: "bt-subbar"
}, Xe = { class: "bt-filter-pills" }, Ze = ["onClick"], et = { class: "bt-fpill-count" }, tt = { class: "bt-subbar-right" }, st = { class: "bt-result" }, at = { class: "bt-card" }, lt = { class: "bt-table bt-desktop-table" }, nt = ["innerHTML"], ot = ["innerHTML"], it = ["innerHTML"], rt = ["innerHTML"], ut = ["innerHTML"], dt = ["onClick"], ct = { class: "font-medium" }, mt = { class: "text-muted" }, pt = { class: "text-muted" }, bt = { class: "mono-sm text-muted" }, vt = { class: "ta-r mono-sm" }, ft = { class: "text-muted" }, ht = ["onClick"], _t = ["innerHTML"], yt = ["title", "onClick"], gt = ["innerHTML"], kt = { key: 0 }, wt = {
  colspan: "9",
  class: "bt-empty"
}, xt = { class: "bt-mobile-cards" }, Ct = {
  key: 1,
  class: "bt-mc-empty"
}, Lt = ["onClick"], Mt = { class: "bt-mc-top" }, St = { class: "bt-mc-batch" }, $t = { class: "bt-mc-mid" }, Tt = { class: "bt-mc-meta" }, Ht = { class: "bt-mc-meta" }, Vt = {
  key: 0,
  class: "bt-pagination"
}, Et = { class: "bt-pg-info" }, qt = { class: "bt-pg-controls" }, Bt = ["disabled"], Dt = ["disabled"], Ut = { class: "bt-pg-current" }, Nt = ["disabled"], It = ["disabled"], Ot = { class: "bt-dheader" }, Ft = ["innerHTML"], Rt = { class: "bt-dh-top" }, Qt = { class: "bt-dh-ico" }, At = ["innerHTML"], jt = { class: "bt-dh-title" }, Wt = { class: "bt-dh-sub" }, zt = { class: "bt-dbody" }, Pt = { class: "bt-form-fld" }, Kt = ["disabled"], Yt = { class: "bt-form-row" }, Gt = { class: "bt-form-fld" }, Jt = { class: "bt-form-fld" }, Xt = ["value"], Zt = { class: "bt-form-row" }, es = { class: "bt-form-fld" }, ts = { class: "bt-form-fld" }, ss = { class: "bt-form-fld" }, as = {
  key: 0,
  class: "bt-hint"
}, ls = { class: "bt-form-fld" }, ns = {
  key: 0,
  class: "bt-form-fld"
}, os = {
  key: 1,
  class: "bt-form-fld"
}, is = { class: "bt-readonly-qty" }, rs = {
  key: 2,
  class: "bt-form-fld bt-form-check"
}, us = { class: "bt-checkbox-lbl" }, ds = {
  key: 3,
  class: "inv-view-footer"
}, cs = { class: "bt-dfooter" }, ms = ["disabled"], ps = {
  __name: "InventoryBatches",
  setup(bs) {
    const { toast: w } = He(), c = m([]), L = m(!1), Y = m(!1), D = m(""), U = m("all"), N = m("expiry_date"), V = m("asc"), G = m([]), z = m([]), J = m([]), X = m([]), b = fe({ item: "", warehouse: "" }), x = m(!1), u = m(null), P = m(!1), ne = () => ({
      batch_no: "",
      item: "",
      stock_uom: "",
      warehouse: "",
      manufacturing_date: "",
      expiry_date: "",
      supplier: "",
      disabled: 0,
      add_qty: 0,
      owner: "",
      creation: "",
      modified_by: "",
      modified: ""
    }), l = fe(ne());
    async function Z() {
      L.value = !0, Y.value = !0;
      try {
        const a = await T("Batch", {
          fields: ["name", "batch_no", "item", "warehouse", "manufacturing_date", "expiry_date", "batch_qty", "supplier", "disabled", "owner", "creation", "modified_by", "modified"],
          filters: [],
          limit: 1e5,
          order: "expiry_date asc"
        });
        c.value = a;
        const e = [...new Set(a.filter((s) => s.supplier).map((s) => s.supplier))];
        if (e.length) {
          const s = await T("Supplier", { fields: ["name", "supplier_name"], filters: [["name", "in", e]], limit: e.length }).catch(() => []), o = Object.fromEntries(s.map((d) => [d.name, d.supplier_name || d.name]));
          c.value = a.map((d) => d.supplier ? { ...d, supplier_name: o[d.supplier] || d.supplier } : d);
        }
      } catch (a) {
        w.error(a.message || "Failed to load batches");
      } finally {
        L.value = !1;
      }
    }
    function ye(a) {
      if (!a) return null;
      const e = new Date(a);
      e.setHours(0, 0, 0, 0);
      const s = /* @__PURE__ */ new Date();
      return s.setHours(0, 0, 0, 0), Math.round((e - s) / 864e5);
    }
    function f(a) {
      if (a.disabled) return "disabled";
      const e = ye(a.expiry_date);
      return e === null ? "active" : e < 0 ? "expired" : e <= 30 ? "expiring" : "active";
    }
    function ee(a) {
      return { active: "Active", expiring: "Expiring Soon", expired: "Expired", disabled: "Disabled" }[a] || a;
    }
    function oe(a) {
      const e = f(a);
      return e === "expired" ? "red" : e === "expiring" ? "orange" : "";
    }
    const ge = k(() => {
      let a = c.value;
      if (b.item && (a = a.filter((e) => e.item === b.item)), b.warehouse && (a = a.filter((e) => e.warehouse === b.warehouse)), U.value !== "all" && (a = a.filter((e) => f(e) === U.value)), D.value.trim()) {
        const e = D.value.toLowerCase();
        a = a.filter(
          (s) => (s.batch_no || s.name || "").toLowerCase().includes(e) || (s.item || "").toLowerCase().includes(e) || (s.warehouse || "").toLowerCase().includes(e) || (s.supplier || "").toLowerCase().includes(e) || (s.supplier_name || "").toLowerCase().includes(e)
        );
      }
      return a;
    }), y = k(() => {
      const a = N.value;
      return [...ge.value].sort((e, s) => {
        const o = e[a] ?? "", d = s[a] ?? "", q = typeof o == "number" ? o - d : String(o).localeCompare(String(d));
        return V.value === "asc" ? q : -q;
      });
    });
    function I(a) {
      N.value === a ? V.value = V.value === "asc" ? "desc" : "asc" : (N.value = a, V.value = "asc");
    }
    function O(a) {
      return N.value !== a ? '<span style="color:#d1d5db">⇅</span>' : V.value === "asc" ? "↑" : "↓";
    }
    const v = m(1), M = m(20), E = k(() => Math.max(1, Math.ceil(y.value.length / M.value))), ie = k(() => {
      const a = (v.value - 1) * M.value;
      return y.value.slice(a, a + M.value);
    }), ke = k(() => {
      if (!y.value.length) return "0 of 0";
      const a = (v.value - 1) * M.value + 1, e = Math.min(y.value.length, v.value * M.value);
      return `${a}–${e} of ${y.value.length}`;
    });
    function K(a) {
      v.value = Math.min(Math.max(1, a), E.value);
    }
    be([D, U, () => b.item, () => b.warehouse, N, V], () => {
      v.value = 1;
    }), be(E, (a) => {
      v.value > a && (v.value = a);
    });
    const we = k(() => [
      { key: "all", label: "All", count: re.value.length },
      { key: "active", label: "Active", count: c.value.filter((a) => f(a) === "active").length },
      { key: "expiring", label: "Expiring Soon", count: c.value.filter((a) => f(a) === "expiring").length },
      { key: "expired", label: "Expired", count: c.value.filter((a) => f(a) === "expired").length },
      { key: "disabled", label: "Disabled", count: c.value.filter((a) => f(a) === "disabled").length }
    ]), re = k(() => {
      let a = c.value;
      return b.item && (a = a.filter((e) => e.item === b.item)), b.warehouse && (a = a.filter((e) => e.warehouse === b.warehouse)), a;
    }), xe = k(() => re.value.reduce((a, e) => a + j(e.batch_qty), 0)), ue = k(() => c.value.filter((a) => f(a) === "expiring").length), de = k(() => c.value.filter((a) => f(a) === "expired").length);
    function F(a) {
      return Number(j(a)).toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
    function Ce() {
      u.value = null, Object.assign(l, ne()), x.value = !0;
    }
    function te(a) {
      u.value = a.name, Object.assign(l, {
        batch_no: a.batch_no || a.name || "",
        item: a.item || "",
        warehouse: a.warehouse || "",
        manufacturing_date: a.manufacturing_date || "",
        expiry_date: a.expiry_date || "",
        supplier: a.supplier || "",
        disabled: !!a.disabled,
        batch_qty: j(a.batch_qty),
        owner: a.owner || "",
        creation: a.creation || "",
        modified_by: a.modified_by || "",
        modified: a.modified || ""
      }), x.value = !0;
    }
    async function Le() {
      if (!l.item) {
        w.error("Item is required");
        return;
      }
      if (!l.warehouse) {
        w.error("Warehouse is required — stock can't be tracked without one");
        return;
      }
      const a = u.value ? 0 : j(l.add_qty);
      P.value = !0;
      try {
        const e = {
          doctype: "Batch",
          batch_no: l.batch_no.trim() || null,
          item: l.item,
          warehouse: l.warehouse || null,
          manufacturing_date: l.manufacturing_date || null,
          expiry_date: l.expiry_date || null,
          supplier: l.supplier || null,
          disabled: l.disabled ? 1 : 0
        };
        u.value && (e.name = u.value);
        const s = await le(e);
        if (a > 0) {
          const o = await De(), d = await le({
            doctype: "Stock Entry",
            company: o,
            stock_entry_type: "Material Receipt",
            posting_date: he(),
            to_warehouse: l.warehouse,
            remarks: `Opening qty for batch ${(s == null ? void 0 : s.name) || l.batch_no.trim()}`,
            items: [{
              doctype: "Stock Entry Detail",
              item_code: l.item,
              qty: a,
              t_warehouse: l.warehouse,
              batch_no: (s == null ? void 0 : s.name) || l.batch_no.trim()
            }]
          });
          await Ue("Stock Entry", d.name);
        }
        w.success(u.value ? "Batch updated" : `Batch created${a > 0 ? ` with ${F(a)} opening qty` : ""}`), x.value = !1, await Z();
      } catch (e) {
        w.error(e.message || "Failed to save batch");
      } finally {
        P.value = !1;
      }
    }
    async function Me(a) {
      try {
        await le({ doctype: "Batch", name: a.name, disabled: a.disabled ? 0 : 1 }), a.disabled = a.disabled ? 0 : 1, w.success(a.disabled ? "Batch disabled" : "Batch enabled");
      } catch (e) {
        w.error(e.message || "Failed to update batch");
      }
    }
    function Se() {
      const a = y.value;
      if (!a.length) return;
      const e = (h) => {
        const ae = h == null ? "" : String(h);
        return /[",\n]/.test(ae) ? '"' + ae.replace(/"/g, '""') + '"' : ae;
      }, s = [["Batch No", "Item", "Warehouse", "Mfg Date", "Expiry Date", "Qty", "Supplier", "Status"].join(",")];
      for (const h of a)
        s.push([h.batch_no || h.name, h.item || "", h.warehouse || "", H(h.manufacturing_date), H(h.expiry_date), j(h.batch_qty), h.supplier_name || h.supplier || "", ee(f(h))].map(e).join(","));
      const o = new Blob(["\uFEFF" + s.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), d = URL.createObjectURL(o), q = document.createElement("a");
      q.href = d, q.download = `batches_${he()}.csv`, q.click(), URL.revokeObjectURL(d), w.success(`Exported ${a.length} row(s)`);
    }
    async function ce(a = "") {
      try {
        const e = await T("Item", { fields: ["name", "item_name"], filters: a ? [["name", "like", `%${a}%`]] : [], limit: 20 });
        G.value = e.map((s) => ({ label: s.item_name ? `${s.name} — ${s.item_name}` : s.name, value: s.name }));
      } catch {
        G.value = [];
      }
    }
    async function me(a = "") {
      try {
        const e = [["has_batch_no", "=", 1]];
        a && e.push(["name", "like", `%${a}%`]);
        const s = await T("Item", {
          fields: ["name", "item_name", "stock_uom"],
          filters: e,
          limit: 20
        });
        J.value = s.map((o) => ({
          label: o.item_name ? `${o.name} — ${o.item_name}` : o.name,
          value: o.name,
          stock_uom: o.stock_uom || ""
        }));
      } catch {
        J.value = [];
      }
    }
    async function $e(a) {
      var e;
      if (l.item = (a == null ? void 0 : a.value) ?? a ?? "", l.stock_uom = "", !l.item) {
        l.stock_uom = "";
        return;
      }
      try {
        const s = await T("Item", {
          fields: ["name", "stock_uom"],
          filters: [["name", "=", l.item]],
          limit: 1
        });
        l.stock_uom = ((e = s == null ? void 0 : s[0]) == null ? void 0 : e.stock_uom) || "";
      } catch {
        l.stock_uom = "";
      }
    }
    async function se(a = "") {
      try {
        const e = await T("Warehouse", { fields: ["name"], filters: [["is_group", "=", 0], ...a ? [["name", "like", `%${a}%`]] : []], limit: 20 });
        z.value = e.map((s) => ({ label: s.name, value: s.name }));
      } catch {
        z.value = [];
      }
    }
    async function pe(a = "") {
      try {
        const e = a ? [["supplier_name", "like", `%${a}%`]] : [], s = await T("Supplier", { fields: ["name", "supplier_name"], filters: e, limit: 20 });
        X.value = s.map((o) => ({ label: o.supplier_name || o.name, value: o.name }));
      } catch {
        X.value = [];
      }
    }
    return Ve(() => {
      Z(), ce(""), me(""), se(""), pe("");
    }), (a, e) => (i(), r("div", Ie, [
      t("div", Oe, [
        t("div", Fe, [
          e[25] || (e[25] = t("label", { class: "bt-fld-lbl" }, "Search", -1)),
          t("div", Re, [
            t("span", {
              innerHTML: p(C)("search", 13),
              style: { color: "#94a3b8", "flex-shrink": "0" }
            }, null, 8, Qe),
            S(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (s) => D.value = s),
              placeholder: "Search batch / item / warehouse / supplier…",
              class: "bt-search-input"
            }, null, 512), [
              [R, D.value]
            ])
          ])
        ]),
        t("div", Ae, [
          e[26] || (e[26] = t("label", { class: "bt-fld-lbl" }, "Item", -1)),
          Q(W, {
            modelValue: b.item,
            "onUpdate:modelValue": e[1] || (e[1] = (s) => b.item = s),
            options: G.value,
            placeholder: "All items",
            onSearch: ce
          }, null, 8, ["modelValue", "options"])
        ]),
        t("div", je, [
          e[27] || (e[27] = t("label", { class: "bt-fld-lbl" }, "Warehouse", -1)),
          Q(W, {
            modelValue: b.warehouse,
            "onUpdate:modelValue": e[2] || (e[2] = (s) => b.warehouse = s),
            options: z.value,
            placeholder: "All warehouses",
            onSearch: se
          }, null, 8, ["modelValue", "options"])
        ]),
        e[31] || (e[31] = t("div", { style: { flex: "1" } }, null, -1)),
        t("button", {
          class: "bt-btn-ghost",
          onClick: Z,
          disabled: L.value
        }, [
          t("span", {
            innerHTML: p(C)("refresh", 13)
          }, null, 8, ze),
          e[28] || (e[28] = t("span", { class: "bt-btn-label" }, " Refresh", -1))
        ], 8, We),
        t("button", {
          class: "bt-btn-ghost",
          onClick: Se,
          disabled: !y.value.length
        }, [
          t("span", {
            innerHTML: p(C)("download", 13)
          }, null, 8, Ke),
          e[29] || (e[29] = t("span", { class: "bt-btn-label" }, " Export", -1))
        ], 8, Pe),
        t("button", {
          class: "bt-btn-primary",
          disabled: !a.$canCreate("inventory"),
          title: a.$canCreate("inventory") ? "" : "Read-only access",
          onClick: Ce
        }, [
          t("span", {
            innerHTML: p(C)("plus", 13)
          }, null, 8, Ge),
          e[30] || (e[30] = t("span", { class: "bt-btn-label" }, " New Batch", -1))
        ], 8, Ye)
      ]),
      !L.value && c.value.length ? (i(), Ee(Ne, {
        key: 0,
        cards: [
          { label: "Total Batches", tone: "accent", value: c.value.length },
          { label: "Total Qty", tone: "info", value: F(xe.value) },
          { label: "Expiring Soon (30d)", tone: "warn", value: ue.value, valueClass: ue.value ? "orange" : "" },
          { label: "Expired", tone: "danger", value: de.value, valueClass: de.value ? "red" : "" }
        ]
      }, null, 8, ["cards"])) : g("", !0),
      Y.value && c.value.length ? (i(), r("div", Je, [
        t("div", Xe, [
          (i(!0), r($, null, A(we.value, (s) => (i(), r("button", {
            key: s.key,
            class: B(["bt-fpill", { active: U.value === s.key }]),
            onClick: (o) => U.value = s.key
          }, [
            _(n(s.label) + " ", 1),
            t("span", et, n(s.count), 1)
          ], 10, Ze))), 128))
        ]),
        t("div", tt, [
          t("span", st, n(y.value.length) + " of " + n(c.value.length), 1)
        ])
      ])) : g("", !0),
      t("div", at, [
        t("table", lt, [
          t("thead", null, [
            t("tr", null, [
              t("th", {
                onClick: e[3] || (e[3] = (s) => I("batch_no")),
                class: "sortable"
              }, [
                e[32] || (e[32] = _("Batch No ", -1)),
                t("span", {
                  innerHTML: O("batch_no")
                }, null, 8, nt)
              ]),
              t("th", {
                onClick: e[4] || (e[4] = (s) => I("item")),
                class: "sortable"
              }, [
                e[33] || (e[33] = _("Item ", -1)),
                t("span", {
                  innerHTML: O("item")
                }, null, 8, ot)
              ]),
              e[37] || (e[37] = t("th", null, "Warehouse", -1)),
              t("th", {
                onClick: e[5] || (e[5] = (s) => I("manufacturing_date")),
                class: "sortable"
              }, [
                e[34] || (e[34] = _("Mfg Date ", -1)),
                t("span", {
                  innerHTML: O("manufacturing_date")
                }, null, 8, it)
              ]),
              t("th", {
                onClick: e[6] || (e[6] = (s) => I("expiry_date")),
                class: "sortable"
              }, [
                e[35] || (e[35] = _("Expiry Date ", -1)),
                t("span", {
                  innerHTML: O("expiry_date")
                }, null, 8, rt)
              ]),
              t("th", {
                onClick: e[7] || (e[7] = (s) => I("batch_qty")),
                class: "sortable ta-r"
              }, [
                e[36] || (e[36] = _("Qty ", -1)),
                t("span", {
                  innerHTML: O("batch_qty")
                }, null, 8, ut)
              ]),
              e[38] || (e[38] = t("th", null, "Supplier", -1)),
              e[39] || (e[39] = t("th", null, "Status", -1)),
              e[40] || (e[40] = t("th", { class: "ta-r" }, "Actions", -1))
            ])
          ]),
          t("tbody", null, [
            L.value ? (i(), r($, { key: 0 }, A(8, (s) => t("tr", { key: s }, [...e[41] || (e[41] = [
              t("td", { colspan: "9" }, [
                t("div", {
                  class: "b-shimmer",
                  style: { height: "13px" }
                })
              ], -1)
            ])])), 64)) : (i(), r($, { key: 1 }, [
              (i(!0), r($, null, A(ie.value, (s) => (i(), r("tr", {
                key: s.name,
                class: "bt-row",
                onClick: (o) => te(s)
              }, [
                t("td", ct, n(s.batch_no || s.name), 1),
                t("td", mt, n(s.item), 1),
                t("td", pt, n(s.warehouse || "—"), 1),
                t("td", bt, n(p(H)(s.manufacturing_date)), 1),
                t("td", {
                  class: B(["mono-sm", oe(s)])
                }, n(p(H)(s.expiry_date)), 3),
                t("td", vt, n(F(s.batch_qty)), 1),
                t("td", ft, n(s.supplier_name || s.supplier || "—"), 1),
                t("td", null, [
                  t("span", {
                    class: B(["bt-badge", "bt-badge--" + f(s)])
                  }, n(ee(f(s))), 3)
                ]),
                t("td", {
                  class: "ta-r bt-actions",
                  onClick: e[8] || (e[8] = ve(() => {
                  }, ["stop"]))
                }, [
                  t("button", {
                    class: "bt-icon-btn",
                    title: "Edit",
                    onClick: (o) => te(s)
                  }, [
                    t("span", {
                      innerHTML: p(C)("edit", 13)
                    }, null, 8, _t)
                  ], 8, ht),
                  t("button", {
                    class: "bt-icon-btn",
                    title: s.disabled ? "Enable" : "Disable",
                    onClick: (o) => Me(s)
                  }, [
                    t("span", {
                      innerHTML: p(C)(s.disabled ? "play" : "pause", 13)
                    }, null, 8, gt)
                  ], 8, yt)
                ])
              ], 8, dt))), 128)),
              y.value.length ? g("", !0) : (i(), r("tr", kt, [
                t("td", wt, n(Y.value ? c.value.length ? "No batches match this filter" : "No batches yet — create your first batch to start tracking" : "Loading…"), 1)
              ]))
            ], 64))
          ])
        ]),
        t("div", xt, [
          L.value ? (i(), r($, { key: 0 }, A(5, (s) => t("div", {
            key: s,
            class: "bt-mobile-card bt-mc--skeleton"
          }, [...e[42] || (e[42] = [
            t("div", {
              class: "bt-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            t("div", {
              class: "bt-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            t("div", {
              class: "bt-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : y.value.length ? (i(!0), r($, { key: 2 }, A(ie.value, (s) => (i(), r("div", {
            key: s.name,
            class: "bt-mobile-card",
            onClick: (o) => te(s)
          }, [
            t("div", Mt, [
              t("span", St, n(s.batch_no || s.name), 1),
              t("span", {
                class: B(["bt-badge", "bt-badge--" + f(s)])
              }, n(ee(f(s))), 3)
            ]),
            t("div", $t, n(s.item), 1),
            t("div", Tt, [
              t("span", null, n(s.warehouse || "—"), 1),
              t("span", null, "Qty: " + n(F(s.batch_qty)), 1)
            ]),
            t("div", Ht, [
              t("span", {
                class: B(oe(s))
              }, "Exp: " + n(p(H)(s.expiry_date)), 3),
              t("span", null, n(s.supplier_name || s.supplier || "—"), 1)
            ])
          ], 8, Lt))), 128)) : (i(), r("div", Ct, [
            e[43] || (e[43] = t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📦", -1)),
            t("div", null, n(c.value.length ? "No batches match" : "No batches yet"), 1)
          ]))
        ]),
        !L.value && y.value.length ? (i(), r("div", Vt, [
          t("span", Et, n(ke.value), 1),
          t("div", qt, [
            S(t("select", {
              "onUpdate:modelValue": e[9] || (e[9] = (s) => M.value = s),
              class: "bt-pg-size"
            }, [...e[44] || (e[44] = [
              t("option", { value: 10 }, "10 / page", -1),
              t("option", { value: 20 }, "20 / page", -1),
              t("option", { value: 50 }, "50 / page", -1),
              t("option", { value: 100 }, "100 / page", -1)
            ])], 512), [
              [
                qe,
                M.value,
                void 0,
                { number: !0 }
              ]
            ]),
            t("button", {
              class: "bt-pg-btn",
              disabled: v.value === 1,
              onClick: e[10] || (e[10] = (s) => K(1)),
              title: "First page"
            }, "«", 8, Bt),
            t("button", {
              class: "bt-pg-btn",
              disabled: v.value === 1,
              onClick: e[11] || (e[11] = (s) => K(v.value - 1)),
              title: "Previous page"
            }, "‹", 8, Dt),
            t("span", Ut, "Page " + n(v.value) + " of " + n(E.value), 1),
            t("button", {
              class: "bt-pg-btn",
              disabled: v.value === E.value,
              onClick: e[12] || (e[12] = (s) => K(v.value + 1)),
              title: "Next page"
            }, "›", 8, Nt),
            t("button", {
              class: "bt-pg-btn",
              disabled: v.value === E.value,
              onClick: e[13] || (e[13] = (s) => K(E.value)),
              title: "Last page"
            }, "»", 8, It)
          ])
        ])) : g("", !0)
      ]),
      x.value ? (i(), r("div", {
        key: 2,
        class: "bt-overlay",
        onClick: e[14] || (e[14] = ve((s) => x.value = !1, ["self"]))
      })) : g("", !0),
      t("div", {
        class: B(["bt-drawer", { open: x.value }])
      }, [
        t("div", Ot, [
          t("button", {
            class: "bt-dclose",
            onClick: e[15] || (e[15] = (s) => x.value = !1)
          }, [
            t("span", {
              innerHTML: p(C)("x", 16)
            }, null, 8, Ft)
          ]),
          t("div", Rt, [
            t("div", Qt, [
              t("span", {
                innerHTML: p(C)("qr", 20)
              }, null, 8, At)
            ]),
            t("div", null, [
              t("div", jt, n(u.value ? "Edit Batch" : "New Batch"), 1),
              t("div", Wt, n(u.value ? u.value : "Track a new inventory batch"), 1)
            ])
          ])
        ]),
        t("div", zt, [
          t("div", Pt, [
            e[45] || (e[45] = t("label", { class: "bt-form-lbl" }, "Batch No", -1)),
            S(t("input", {
              "onUpdate:modelValue": e[16] || (e[16] = (s) => l.batch_no = s),
              class: "bt-input",
              disabled: !!u.value,
              placeholder: "Leave blank to auto-generate (Item Code-Year-Sequence)"
            }, null, 8, Kt), [
              [R, l.batch_no]
            ])
          ]),
          t("div", Yt, [
            t("div", Gt, [
              e[46] || (e[46] = t("label", { class: "bt-form-lbl" }, [
                _("Item "),
                t("span", { class: "req" }, "*")
              ], -1)),
              Q(W, {
                modelValue: l.item,
                "onUpdate:modelValue": e[17] || (e[17] = (s) => l.item = s),
                options: J.value,
                placeholder: "Select item",
                disabled: !!u.value,
                onSearch: me,
                onSelect: $e
              }, null, 8, ["modelValue", "options", "disabled"])
            ]),
            t("div", Jt, [
              e[47] || (e[47] = t("label", { class: "bt-form-lbl" }, "UOM", -1)),
              t("input", {
                value: l.stock_uom || "—",
                class: "bt-input",
                readonly: ""
              }, null, 8, Xt)
            ])
          ]),
          t("div", Zt, [
            t("div", es, [
              e[48] || (e[48] = t("label", { class: "bt-form-lbl" }, "Manufacturing Date", -1)),
              S(t("input", {
                "onUpdate:modelValue": e[18] || (e[18] = (s) => l.manufacturing_date = s),
                type: "date",
                class: "bt-input"
              }, null, 512), [
                [R, l.manufacturing_date]
              ])
            ]),
            t("div", ts, [
              e[49] || (e[49] = t("label", { class: "bt-form-lbl" }, "Expiry Date", -1)),
              S(t("input", {
                "onUpdate:modelValue": e[19] || (e[19] = (s) => l.expiry_date = s),
                type: "date",
                class: "bt-input"
              }, null, 512), [
                [R, l.expiry_date]
              ])
            ])
          ]),
          t("div", ss, [
            e[50] || (e[50] = t("label", { class: "bt-form-lbl" }, [
              _("Warehouse "),
              t("span", { class: "req" }, "*")
            ], -1)),
            Q(W, {
              modelValue: l.warehouse,
              "onUpdate:modelValue": e[20] || (e[20] = (s) => l.warehouse = s),
              options: z.value,
              placeholder: "Select warehouse",
              disabled: !!u.value,
              onSearch: se
            }, null, 8, ["modelValue", "options", "disabled"]),
            u.value ? (i(), r("span", as, "Locked after creation — like Qty, it's kept in sync by stock entries (receipts/transfers), not edited directly.")) : g("", !0)
          ]),
          t("div", ls, [
            e[51] || (e[51] = t("label", { class: "bt-form-lbl" }, "Supplier", -1)),
            Q(W, {
              modelValue: l.supplier,
              "onUpdate:modelValue": e[21] || (e[21] = (s) => l.supplier = s),
              options: X.value,
              placeholder: "Select supplier",
              onSearch: pe
            }, null, 8, ["modelValue", "options"])
          ]),
          u.value ? g("", !0) : (i(), r("div", ns, [
            e[52] || (e[52] = t("label", { class: "bt-form-lbl" }, "Add Qty", -1)),
            S(t("input", {
              "onUpdate:modelValue": e[22] || (e[22] = (s) => l.add_qty = s),
              type: "number",
              min: "0",
              step: "0.001",
              class: "bt-input",
              placeholder: "0"
            }, null, 512), [
              [
                R,
                l.add_qty,
                void 0,
                { number: !0 }
              ]
            ]),
            e[53] || (e[53] = t("span", { class: "bt-hint" }, "Optional — posts an opening Material Receipt to this warehouse so stock stays in sync", -1))
          ])),
          u.value ? (i(), r("div", os, [
            e[55] || (e[55] = t("label", { class: "bt-form-lbl" }, "Current Qty", -1)),
            t("div", is, [
              _(n(F(l.batch_qty)) + " ", 1),
              e[54] || (e[54] = t("span", { class: "bt-hint" }, "— managed automatically via stock entries", -1))
            ])
          ])) : g("", !0),
          u.value ? (i(), r("div", rs, [
            t("label", us, [
              S(t("input", {
                type: "checkbox",
                "onUpdate:modelValue": e[23] || (e[23] = (s) => l.disabled = s)
              }, null, 512), [
                [Be, l.disabled]
              ]),
              e[56] || (e[56] = _(" Disabled ", -1))
            ])
          ])) : g("", !0),
          u.value && l.owner ? (i(), r("div", ds, [
            _(" Created by " + n(p(_e)(l.owner)) + " on " + n(p(H)(l.creation)) + " ", 1),
            l.modified_by ? (i(), r($, { key: 0 }, [
              _(" · Last modified by " + n(p(_e)(l.modified_by)) + " on " + n(p(H)(l.modified)), 1)
            ], 64)) : g("", !0)
          ])) : g("", !0)
        ]),
        t("div", cs, [
          e[57] || (e[57] = t("div", { style: { flex: "1" } }, null, -1)),
          t("button", {
            class: "bt-btn-ghost",
            onClick: e[24] || (e[24] = (s) => x.value = !1)
          }, "Cancel"),
          t("button", {
            class: "bt-btn-primary",
            disabled: P.value || !(u.value ? a.$canEdit("inventory") : a.$canCreate("inventory")),
            onClick: Le
          }, n(P.value ? "Saving…" : u.value ? "Save Changes" : "Create Batch"), 9, ms)
        ])
      ], 2)
    ]));
  }
}, gs = /* @__PURE__ */ Te(ps, [["__scopeId", "data-v-1a004e76"]]);
export {
  gs as default
};
