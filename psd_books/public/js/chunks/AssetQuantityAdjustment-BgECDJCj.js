import { _ as fe, x as pe, h as f, o as _e, c as i, a as e, u as c, i as _, w as x, A as H, d as v, F as k, r as ee, b as h, C as ye, q as se, t as l, n as te, D as ae, H as be, f as V, g as y, X as E, K as he, L as we, a8 as ge, k as o } from "./main-BmX9V7v7.js";
import { b as ne } from "./format-BcJZDVG4.js";
import { o as le } from "./userNames-C5VShm5M.js";
import { _ as oe } from "./SearchableSelect-Cc8f6Ofm.js";
const ke = { class: "list-page" }, qe = { class: "sales-toolbar" }, Ce = { class: "sales-search" }, Ae = ["innerHTML"], Le = { class: "sales-actions" }, Te = ["disabled"], Se = ["innerHTML"], De = ["disabled", "title"], Ne = ["innerHTML"], Me = { class: "inv-table-wrap" }, xe = { class: "inv-table inv-desktop-table" }, He = ["onClick"], Ve = { class: "text-muted mono-sm" }, $e = { class: "inv-link" }, Qe = { class: "asset-code" }, je = { class: "ta-r mono-sm" }, Oe = { class: "text-muted" }, We = { class: "ta-r mono-sm" }, Ee = ["onClick"], Be = ["innerHTML"], Re = { key: 0 }, Ue = {
  colspan: "7",
  class: "bk-empty-state"
}, Fe = { class: "bk-empty-inner" }, Pe = ["disabled"], Ie = ["innerHTML"], Ge = { class: "inv-drawer-panel is-add" }, Ke = { class: "inv-dh" }, Ye = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, ze = { class: "inv-dh-title" }, Xe = {
  key: 0,
  class: "add-status-badge"
}, Je = ["innerHTML"], Ze = { class: "inv-dbody" }, es = {
  key: 0,
  class: "shimmer",
  style: { height: "200px", "border-radius": "10px" }
}, ss = {
  key: 0,
  class: "aqa-notice"
}, ts = ["innerHTML"], as = { class: "add-card" }, ns = { class: "add-card-body" }, ls = { class: "inv-fg inv-fg2" }, os = ["disabled"], is = ["disabled"], us = {
  key: 0,
  style: { "font-size": "11px", color: "#94a3b8", "margin-top": "4px" }
}, ds = { style: { "grid-column": "1 / -1" } }, rs = ["disabled"], cs = {
  key: 0,
  class: "aqa-preview-box"
}, vs = { class: "aqa-preview-row" }, ms = { class: "mono-sm" }, fs = { class: "aqa-preview-row" }, ps = { class: "mono-sm" }, _s = { class: "aqa-preview-row" }, ys = { class: "mono-sm" }, bs = { class: "aqa-preview-row fw-600" }, hs = { class: "mono-sm" }, ws = {
  key: 1,
  class: "add-card"
}, gs = { class: "add-card-body" }, ks = { class: "aqa-preview-box" }, qs = { class: "aqa-preview-row" }, Cs = { class: "mono-sm" }, As = { class: "aqa-preview-row" }, Ls = { class: "mono-sm" }, Ts = { class: "aqa-preview-row" }, Ss = { class: "mono-sm" }, Ds = { class: "aqa-preview-row" }, Ns = { class: "mono-sm" }, Ms = { class: "aqa-preview-row fw-600" }, xs = { class: "mono-sm" }, Hs = { class: "aqa-preview-row" }, Vs = { class: "mono-sm" }, $s = {
  key: 2,
  class: "inv-view-footer"
}, Qs = { class: "inv-dfooter" }, js = ["disabled"], Os = ["innerHTML"], Ws = ["disabled"], Es = ["innerHTML"], Bs = { class: "add-footer-status" }, Rs = ["disabled"], Us = ["innerHTML"], Fs = {
  __name: "AssetQuantityAdjustment",
  setup(Ps) {
    const r = pe();
    function p(t) {
      const s = Number(t);
      return isNaN(s) ? 0 : s;
    }
    function m(t) {
      return t == null || t === "" || isNaN(t) ? "KES 0.00" : "KES " + Number(t).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function ie() {
      const t = /* @__PURE__ */ new Date(), s = (n) => String(n).padStart(2, "0");
      return `${t.getFullYear()}-${s(t.getMonth() + 1)}-${s(t.getDate())}`;
    }
    const T = f(!1), q = f([]), $ = f("");
    async function A() {
      T.value = !0;
      try {
        const t = [
          "name",
          "asset",
          "company",
          "adjustment_date",
          "reason",
          "damaged_qty",
          "qty_before",
          "qty_after",
          "write_off_net_book_value",
          "gl_posted",
          "docstatus"
        ];
        q.value = await V("Asset Quantity Adjustment", { fields: t, limit: 1e3, order: "adjustment_date desc" }) || [];
        const s = [...new Set(q.value.map((n) => n.asset).filter(Boolean))];
        if (s.length) {
          const n = await V("Asset", { fields: ["name", "asset_name"], filters: [["name", "in", s]], limit: s.length }), d = Object.fromEntries((n || []).map((b) => [b.name, b.asset_name]));
          q.value.forEach((b) => {
            b.asset_name = d[b.asset] || b.asset;
          });
        }
      } catch (t) {
        r.error("Failed to load write-offs: " + t.message), q.value = [];
      }
      T.value = !1;
    }
    const B = y(() => {
      const t = $.value.toLowerCase().trim();
      return t ? q.value.filter(
        (s) => (s.name || "").toLowerCase().includes(t) || (s.asset || "").toLowerCase().includes(t) || (s.asset_name || "").toLowerCase().includes(t)
      ) : q.value;
    });
    function R(t) {
      return t.docstatus === 1 ? "Submitted" : t.docstatus === 2 ? "Cancelled" : "Draft";
    }
    function U(t) {
      return t.docstatus === 1 ? "status-submitted" : t.docstatus === 2 ? "status-cancelled" : "status-draft";
    }
    const S = f(!1), D = f(null), w = y(() => D.value === null), Q = f(!1), L = f(!1), N = f(!1), C = y(() => w.value || a.value.docstatus === 0);
    function F() {
      return {
        doctype: "Asset Quantity Adjustment",
        asset: "",
        company: window.__booksCompany || "",
        adjustment_date: ie(),
        damaged_qty: null,
        reason: "",
        loss_account: "",
        docstatus: 0
      };
    }
    const a = f(F()), j = f([]), g = f({}), u = y(() => g.value[a.value.asset] || null);
    let P = null;
    function I(t = "") {
      clearTimeout(P), P = setTimeout(async () => {
        try {
          const s = [["docstatus", "=", 1], ["status", "not in", ["Scrapped", "Sold"]]];
          t && s.push(["asset_name", "like", `%${t}%`]);
          const n = await V("Asset", {
            fields: ["name", "asset_name", "asset_category", "company", "status", "qty", "current_value", "purchase_cost"],
            filters: s,
            limit: 30,
            order: "asset_name asc"
          });
          j.value = (n || []).map((d) => ({ value: d.name, label: d.asset_name ? `${d.asset_name} (${d.name})` : d.name }));
          for (const d of n || []) g.value[d.name] = d;
        } catch {
          j.value = [];
        }
      }, 250);
    }
    async function ue(t) {
      if (t) {
        if (!g.value[t])
          try {
            g.value[t] = await E("Asset", t);
          } catch (s) {
            r.error("Could not load asset: " + s.message);
            return;
          }
        a.value.company = g.value[t].company || a.value.company;
      }
    }
    const G = y(() => !u.value || !a.value.damaged_qty || !p(u.value.qty) ? 0 : p(a.value.damaged_qty) / p(u.value.qty)), de = y(() => u.value ? p(u.value.qty) - p(a.value.damaged_qty) : "—"), K = y(
      () => u.value ? p(u.value.purchase_cost) * G.value : 0
    ), Y = y(() => u.value ? (p(u.value.purchase_cost) - p(u.value.current_value)) * G.value : 0), re = y(() => K.value - Y.value), O = f([]), ce = y(() => O.value.map((t) => ({ value: t.name, label: t.account_name || t.name })));
    async function z(t = "") {
      try {
        const s = [["is_group", "=", 0], ["disabled", "=", 0], ["account_type", "in", ["Expense", "Income", "Equity"]]];
        t && s.push(["name", "like", `%${t}%`]), O.value = await V("Account", { fields: ["name", "account_name"], filters: s, limit: 30, order: "name asc" });
      } catch {
        O.value = [];
      }
    }
    function X() {
      D.value = null, a.value = F(), S.value = !0;
    }
    function J(t) {
      D.value = t.name, S.value = !0, W(t.name);
    }
    function M() {
      S.value = !1;
    }
    async function W(t) {
      Q.value = !0;
      try {
        const s = await E("Asset Quantity Adjustment", t);
        if (a.value = s, s.asset && !g.value[s.asset])
          try {
            g.value[s.asset] = await E("Asset", s.asset);
          } catch {
          }
      } catch (s) {
        r.error("Could not load " + t + ": " + s.message);
      }
      Q.value = !1;
    }
    function ve() {
      return a.value.asset ? a.value.adjustment_date ? !a.value.damaged_qty || p(a.value.damaged_qty) <= 0 ? (r.error("Damaged Qty must be greater than 0."), !1) : u.value && p(a.value.damaged_qty) >= p(u.value.qty) ? (r.error(`Damaged Qty must be less than the asset's current Qty (${u.value.qty}). Use Asset Disposal if all units are gone.`), !1) : a.value.reason ? a.value.loss_account ? !0 : (r.error("Loss on Damaged Assets Account is required."), !1) : (r.error("Reason is required."), !1) : (r.error("Adjustment Date is required."), !1) : (r.error("Select an asset."), !1);
    }
    async function Z(t) {
      if (ve()) {
        L.value = !0;
        try {
          const s = { ...a.value };
          w.value && delete s.name, s.company || (s.company = window.__booksCompany || "");
          const n = await he(s), d = (n == null ? void 0 : n.name) || s.name;
          if (D.value = d, a.value = n, t === "Submitted" && (n == null ? void 0 : n.docstatus) !== 1)
            try {
              await we("Asset Quantity Adjustment", d), await W(d), r.success("Write-off submitted.");
            } catch (b) {
              r.error("Saved as draft — submit failed: " + (b.message || b)), A();
              return;
            }
          else
            r.success(w.value ? "Write-off saved" : "Write-off updated");
          A();
        } catch (s) {
          r.error("Failed to save: " + s.message);
        } finally {
          L.value = !1;
        }
      }
    }
    async function me() {
      N.value = !0;
      try {
        await ge("Asset Quantity Adjustment", a.value.name), r.success("Write-off cancelled."), await W(a.value.name), A();
      } catch (t) {
        r.error("Cancel failed: " + t.message);
      } finally {
        N.value = !1;
      }
    }
    return _e(() => {
      A(), I(), z();
    }), (t, s) => (o(), i("div", ke, [
      e("div", qe, [
        e("div", Ce, [
          e("span", {
            innerHTML: c(_)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Ae),
          x(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (n) => $.value = n),
            placeholder: "Search by voucher#, asset…",
            class: "sales-search-input"
          }, null, 512), [
            [H, $.value]
          ])
        ]),
        e("div", Le, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: A,
            title: "Refresh",
            disabled: T.value
          }, [
            e("span", {
              innerHTML: c(_)("refresh", 14)
            }, null, 8, Se)
          ], 8, Te),
          e("button", {
            class: "sales-btn-primary",
            disabled: !t.$canCreate("inventory"),
            title: t.$canCreate("inventory") ? "" : "Read-only access",
            onClick: X
          }, [
            e("span", {
              innerHTML: c(_)("plus", 13)
            }, null, 8, Ne),
            s[9] || (s[9] = v(" New Write-off", -1))
          ], 8, De)
        ])
      ]),
      e("div", Me, [
        e("table", xe, [
          s[14] || (s[14] = e("thead", null, [
            e("tr", null, [
              e("th", null, "DATE"),
              e("th", null, "VOUCHER#"),
              e("th", null, "ASSET"),
              e("th", { class: "ta-r" }, "QTY WRITTEN OFF"),
              e("th", { class: "ta-r" }, "LOSS (NBV)"),
              e("th", null, "STATUS"),
              e("th", { style: { width: "90px", "text-align": "center" } }, "ACTIONS")
            ])
          ], -1)),
          e("tbody", null, [
            T.value ? (o(), i(k, { key: 0 }, ee(6, (n) => e("tr", {
              key: n,
              class: "shimmer-row"
            }, [...s[10] || (s[10] = [
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "80px" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "110px" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "140px" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "70px", "margin-left": "auto" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "70px", "margin-left": "auto" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "70px" }
                })
              ], -1),
              e("td", null, null, -1)
            ])])), 64)) : (o(), i(k, { key: 1 }, [
              (o(!0), i(k, null, ee(B.value, (n) => (o(), i("tr", {
                key: n.name,
                class: "inv-row",
                onClick: (d) => J(n)
              }, [
                e("td", Ve, l(n.adjustment_date), 1),
                e("td", null, [
                  e("span", $e, l(n.name), 1)
                ]),
                e("td", null, [
                  v(l(n.asset_name || n.asset), 1),
                  e("div", Qe, l(n.asset), 1)
                ]),
                e("td", je, [
                  v(l(n.damaged_qty) + " ", 1),
                  e("span", Oe, "of " + l(n.qty_before ?? "—"), 1)
                ]),
                e("td", We, l(m(n.write_off_net_book_value)), 1),
                e("td", null, [
                  e("span", {
                    class: te(["inv-status-badge", U(n)])
                  }, l(R(n)), 3)
                ]),
                e("td", {
                  style: { "text-align": "center" },
                  onClick: s[1] || (s[1] = se(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "inv-act-btn",
                    onClick: (d) => J(n),
                    title: "View"
                  }, [
                    e("span", {
                      innerHTML: c(_)("eye", 13)
                    }, null, 8, Be)
                  ], 8, Ee)
                ])
              ], 8, He))), 128)),
              B.value.length ? h("", !0) : (o(), i("tr", Re, [
                e("td", Ue, [
                  e("div", Fe, [
                    s[12] || (s[12] = e("p", { class: "bk-empty-title" }, "No quantity write-offs yet", -1)),
                    s[13] || (s[13] = e("p", { class: "bk-empty-sub" }, "Record a partial damage/write-off when some — not all — units of a multi-unit asset are destroyed.", -1)),
                    e("button", {
                      class: "bk-empty-btn",
                      disabled: !t.$canCreate("inventory"),
                      onClick: X
                    }, [
                      e("span", {
                        innerHTML: c(_)("plus", 13)
                      }, null, 8, Ie),
                      s[11] || (s[11] = v(" New Write-off", -1))
                    ], 8, Pe)
                  ])
                ])
              ]))
            ], 64))
          ])
        ])
      ]),
      (o(), ye(be, { to: "body" }, [
        S.value ? (o(), i("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: se(M, ["self"])
        }, [
          e("div", Ge, [
            e("div", Ke, [
              e("div", Ye, [
                e("div", ze, l(w.value ? "New Quantity Write-off" : a.value.name), 1),
                w.value ? (o(), i("span", Xe, "Draft")) : (o(), i("span", {
                  key: 1,
                  class: te(["inv-status-badge", U(a.value)])
                }, l(R(a.value)), 3))
              ]),
              e("button", {
                class: "inv-dclose",
                onClick: M,
                title: "Close"
              }, [
                e("span", {
                  innerHTML: c(_)("x", 16)
                }, null, 8, Je)
              ])
            ]),
            e("div", Ze, [
              Q.value ? (o(), i("div", es)) : (o(), i(k, { key: 1 }, [
                a.value.docstatus === 1 ? (o(), i("div", ss, [
                  e("span", {
                    innerHTML: c(_)("check", 14)
                  }, null, 8, ts),
                  e("span", null, " Submitted — " + l(a.value.damaged_qty) + " of " + l(a.value.qty_before) + " units written off Asset " + l(a.value.asset) + ". Qty is now " + l(a.value.qty_after) + ", Purchase Cost " + l(m(a.value.purchase_cost_after)) + ", Current Value " + l(m(a.value.current_value_after)) + ". ", 1)
                ])) : h("", !0),
                e("div", as, [
                  e("div", ns, [
                    e("div", ls, [
                      e("div", null, [
                        s[15] || (s[15] = e("label", { class: "inv-lbl" }, [
                          v("Asset "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        ae(oe, {
                          modelValue: a.value.asset,
                          "onUpdate:modelValue": [
                            s[2] || (s[2] = (n) => a.value.asset = n),
                            ue
                          ],
                          options: j.value,
                          placeholder: "Select asset",
                          disabled: !C.value,
                          onSearch: I
                        }, null, 8, ["modelValue", "options", "disabled"])
                      ]),
                      e("div", null, [
                        s[16] || (s[16] = e("label", { class: "inv-lbl" }, [
                          v("Adjustment Date "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        x(e("input", {
                          "onUpdate:modelValue": s[3] || (s[3] = (n) => a.value.adjustment_date = n),
                          type: "date",
                          class: "inv-fi",
                          disabled: !C.value
                        }, null, 8, os), [
                          [H, a.value.adjustment_date]
                        ])
                      ]),
                      e("div", null, [
                        s[17] || (s[17] = e("label", { class: "inv-lbl" }, [
                          v("Damaged / Written-off Qty "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        x(e("input", {
                          "onUpdate:modelValue": s[4] || (s[4] = (n) => a.value.damaged_qty = n),
                          type: "number",
                          step: "1",
                          min: "0",
                          class: "inv-fi",
                          placeholder: "0",
                          disabled: !C.value
                        }, null, 8, is), [
                          [
                            H,
                            a.value.damaged_qty,
                            void 0,
                            { number: !0 }
                          ]
                        ]),
                        u.value ? (o(), i("div", us, " Current Qty on Asset: " + l(u.value.qty) + ". Must be less than this — use Asset Disposal if all units are gone. ", 1)) : h("", !0)
                      ]),
                      e("div", null, [
                        s[18] || (s[18] = e("label", { class: "inv-lbl" }, [
                          v("Loss on Damaged Assets Account "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        ae(oe, {
                          modelValue: a.value.loss_account,
                          "onUpdate:modelValue": s[5] || (s[5] = (n) => a.value.loss_account = n),
                          options: ce.value,
                          placeholder: "P&L expense account",
                          disabled: !C.value,
                          onSearch: z
                        }, null, 8, ["modelValue", "options", "disabled"])
                      ]),
                      e("div", ds, [
                        s[19] || (s[19] = e("label", { class: "inv-lbl" }, [
                          v("Reason "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        x(e("textarea", {
                          "onUpdate:modelValue": s[6] || (s[6] = (n) => a.value.reason = n),
                          class: "inv-fi",
                          rows: "2",
                          placeholder: "e.g. 10 of 20 units damaged in warehouse flooding",
                          disabled: !C.value
                        }, null, 8, rs), [
                          [H, a.value.reason]
                        ])
                      ])
                    ]),
                    u.value && a.value.damaged_qty ? (o(), i("div", cs, [
                      e("div", vs, [
                        s[20] || (s[20] = e("span", null, "Remaining Qty", -1)),
                        e("span", ms, l(de.value), 1)
                      ]),
                      e("div", fs, [
                        s[21] || (s[21] = e("span", null, "Purchase Cost Written Off", -1)),
                        e("span", ps, l(m(K.value)), 1)
                      ]),
                      e("div", _s, [
                        s[22] || (s[22] = e("span", null, "Accumulated Depreciation Written Off", -1)),
                        e("span", ys, l(m(Y.value)), 1)
                      ]),
                      e("div", bs, [
                        s[23] || (s[23] = e("span", null, "Net Book Value Written Off (Loss)", -1)),
                        e("span", hs, l(m(re.value)), 1)
                      ])
                    ])) : h("", !0),
                    s[24] || (s[24] = e("p", { class: "aqa-hint" }, " This is a client-side preview only — the server recalculates authoritatively on submit. Depreciation schedule and GL fields below only appear once the write-off is actually posted. ", -1))
                  ])
                ]),
                a.value.docstatus === 1 ? (o(), i("div", ws, [
                  e("div", gs, [
                    e("div", ks, [
                      e("div", qs, [
                        s[25] || (s[25] = e("span", null, "Qty Before → After", -1)),
                        e("span", Cs, l(a.value.qty_before) + " → " + l(a.value.qty_after), 1)
                      ]),
                      e("div", As, [
                        s[26] || (s[26] = e("span", null, "Purchase Cost Before → After", -1)),
                        e("span", Ls, l(m(a.value.purchase_cost_before)) + " → " + l(m(a.value.purchase_cost_after)), 1)
                      ]),
                      e("div", Ts, [
                        s[27] || (s[27] = e("span", null, "Current Value Before → After", -1)),
                        e("span", Ss, l(m(a.value.current_value_before)) + " → " + l(m(a.value.current_value_after)), 1)
                      ]),
                      e("div", Ds, [
                        s[28] || (s[28] = e("span", null, "Accumulated Depreciation Written Off", -1)),
                        e("span", Ns, l(m(a.value.write_off_accumulated_depreciation)), 1)
                      ]),
                      e("div", Ms, [
                        s[29] || (s[29] = e("span", null, "Loss Posted", -1)),
                        e("span", xs, l(m(a.value.write_off_net_book_value)), 1)
                      ]),
                      e("div", Hs, [
                        s[30] || (s[30] = e("span", null, "GL Posted", -1)),
                        e("span", Vs, l(a.value.gl_posted ? "Yes" : "No"), 1)
                      ])
                    ])
                  ])
                ])) : h("", !0)
              ], 64)),
              a.value.owner ? (o(), i("div", $s, [
                v(" Created by " + l(c(le)(a.value.owner)) + " on " + l(c(ne)(a.value.creation)) + " ", 1),
                a.value.modified_by ? (o(), i(k, { key: 0 }, [
                  v(" · Last modified by " + l(c(le)(a.value.modified_by)) + " on " + l(c(ne)(a.value.modified)), 1)
                ], 64)) : h("", !0)
              ])) : h("", !0)
            ]),
            e("div", Qs, [
              C.value ? (o(), i(k, { key: 0 }, [
                e("button", {
                  class: "add-btn-cancel",
                  onClick: M
                }, "Cancel"),
                e("button", {
                  class: "add-btn-draft",
                  disabled: L.value || !(w.value ? t.$canCreate("inventory") : t.$canEdit("inventory")),
                  onClick: s[7] || (s[7] = (n) => Z("Draft"))
                }, [
                  e("span", {
                    innerHTML: c(_)("save", 13)
                  }, null, 8, Os),
                  s[31] || (s[31] = v(" Save Draft ", -1))
                ], 8, js),
                e("button", {
                  class: "add-btn-more",
                  disabled: L.value || !(w.value ? t.$canCreate("inventory") : t.$canEdit("inventory")),
                  onClick: s[8] || (s[8] = (n) => Z("Submitted"))
                }, [
                  e("span", {
                    innerHTML: c(_)("check", 13)
                  }, null, 8, Es),
                  v(" " + l(L.value ? "Saving…" : "Save & Submit"), 1)
                ], 8, Ws)
              ], 64)) : a.value.docstatus === 1 ? (o(), i(k, { key: 1 }, [
                e("div", Bs, l(a.value.name) + " — submitted, GL " + l(a.value.gl_posted ? "posted" : "not posted"), 1),
                e("button", {
                  class: "add-btn-cancel",
                  style: { color: "#dc2626" },
                  disabled: N.value || !t.$canDelete("inventory"),
                  onClick: me
                }, [
                  e("span", {
                    innerHTML: c(_)("cancel", 13)
                  }, null, 8, Us),
                  v(" " + l(N.value ? "Cancelling…" : "Cancel"), 1)
                ], 8, Rs)
              ], 64)) : (o(), i("button", {
                key: 2,
                class: "add-btn-cancel",
                onClick: M
              }, "Close"))
            ])
          ])
        ])) : h("", !0)
      ]))
    ]));
  }
}, zs = /* @__PURE__ */ fe(Fs, [["__scopeId", "data-v-08163195"]]);
export {
  zs as default
};
