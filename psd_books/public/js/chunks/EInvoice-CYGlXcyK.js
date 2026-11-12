import { _ as be, x as he, h as u, y as ke, o as Ce, c as i, a as e, u as c, i as y, w as T, A as S, F as _, r as V, b as d, d as p, t as o, C as we, q as Ie, p as xe, n as B, D as Ne, H as Te, e as Se, l as Me, f as Re, g as b, J as U, k as l, X as Ge } from "./main-DU_9tUQf.js";
import { b as M, f as le } from "./format-BcJZDVG4.js";
import { o as ie } from "./userNames-Bn7mVEZa.js";
import { _ as Le } from "./IrnQrCode-CDLgIEEA.js";
const $e = { class: "ei-page" }, De = { class: "ei-topbar" }, He = { class: "ei-controls" }, Ve = { class: "ei-search-wrap" }, Be = ["innerHTML"], ze = { class: "ei-tab-pills" }, Ae = ["onClick"], Fe = ["disabled"], Ee = ["innerHTML"], Pe = ["disabled", "title"], qe = ["innerHTML"], Ue = ["innerHTML"], Oe = { class: "ei-sum-strip" }, We = { class: "ei-sum-card" }, je = { class: "ei-sum-val" }, Ye = { class: "ei-sum-card" }, Je = {
  class: "ei-sum-val",
  style: { color: "#16a34a" }
}, Ke = { class: "ei-sum-card" }, Qe = {
  class: "ei-sum-val",
  style: { color: "#d97706" }
}, Xe = { class: "ei-sum-card" }, Ze = {
  class: "ei-sum-val",
  style: { color: "#dc2626" }
}, et = {
  key: 0,
  class: "ei-notice"
}, tt = ["innerHTML"], st = { class: "ei-card" }, nt = { class: "ei-table ei-desktop-table" }, at = ["innerHTML"], lt = ["innerHTML"], it = ["onClick"], ot = { class: "ei-code" }, rt = { class: "mono text-muted" }, dt = { class: "fw500" }, ut = {
  class: "mono text-muted",
  style: { "font-size": "11.5px" }
}, ct = { class: "ta-r mono fw600" }, vt = ["title"], mt = {
  key: 1,
  class: "text-muted",
  style: { "font-size": "11.5px" }
}, pt = {
  key: 2,
  class: "text-muted",
  style: { "font-size": "11.5px" }
}, gt = { key: 0 }, _t = { class: "ei-mobile-cards" }, ft = {
  key: 1,
  class: "ei-mc-empty"
}, yt = ["onClick"], bt = { class: "ei-mc-top" }, ht = { class: "ei-mc-docno" }, kt = { class: "ei-mc-mid" }, Ct = { class: "ei-mc-meta" }, wt = { class: "ei-mc-amount" }, It = {
  key: 0,
  class: "ei-load-more-wrap"
}, xt = { style: { flex: "1", "min-width": "0" } }, Nt = { class: "ei-panel-num" }, Tt = { class: "ei-panel-cust" }, St = { style: { "margin-top": "8px" } }, Mt = ["innerHTML"], Rt = { class: "ei-meta-row" }, Gt = { class: "ei-meta-card" }, Lt = { class: "ei-meta-val" }, $t = { class: "ei-meta-card" }, Dt = {
  class: "ei-meta-val",
  style: { color: "#2563eb" }
}, Ht = { class: "ei-meta-card" }, Vt = { class: "ei-meta-val" }, Bt = { class: "ei-gstin-blk" }, zt = {
  key: 0,
  class: "ei-company-gstin-warn"
}, At = { class: "ei-gstin-row" }, Ft = {
  key: 0,
  class: "ei-gstin-val"
}, Et = {
  key: 1,
  style: { color: "#ef4444", "font-size": "12px", "font-weight": "600" }
}, Pt = {
  key: 1,
  class: "ei-gstin-row",
  style: { "border-bottom": "none" }
}, qt = { class: "ei-gstin-val" }, Ut = { class: "ei-panel-body" }, Ot = {
  key: 0,
  class: "ei-warn-blk"
}, Wt = ["innerHTML"], jt = { class: "ei-irn-blk" }, Yt = { style: { display: "flex", "align-items": "flex-start", gap: "8px", "margin-bottom": "10px" } }, Jt = { class: "ei-irn-text" }, Kt = ["title"], Qt = ["innerHTML"], Xt = { class: "ei-ack-row" }, Zt = { class: "ei-ack-val" }, es = { class: "ei-ack-val" }, ts = {
  key: 0,
  class: "ei-qr-wrap"
}, ss = { class: "ei-qr-box" }, ns = {
  key: 2,
  class: "ei-pending-ph"
}, as = {
  key: 3,
  class: "ei-manual-card"
}, ls = { style: { display: "flex", gap: "8px", "margin-top": "14px" } }, is = ["disabled", "title"], os = {
  key: 0,
  class: "inv-view-footer"
}, rs = { class: "ei-panel-footer" }, ds = ["disabled", "title"], us = ["disabled", "title"], cs = ["innerHTML"], vs = ["disabled", "title"], X = 10, ms = {
  __name: "EInvoice",
  setup(ps) {
    const { toast: g } = he(), v = u([]), h = u(!1), R = u(""), C = u("all"), z = u("posting_date"), G = u("desc"), a = u(null), O = u(!1), f = u(""), A = u(!1), F = /* @__PURE__ */ new Date(), w = u(`${F.getFullYear()}-${String(F.getMonth() + 1).padStart(2, "0")}-01`), I = u(new Date(F.getFullYear(), F.getMonth() + 1, 0).toISOString().slice(0, 10)), L = u(!1), E = u(!1), $ = u(!1), W = u(0), x = u(!1), P = u(!1), m = u({ irn: "", ack_no: "", ack_date: "" }), oe = b(() => window.innerWidth <= 480 ? Math.min(window.innerWidth - 80, 220) : 200), D = u(X), Z = b(() => k.value.slice(0, D.value)), re = b(() => D.value < k.value.length);
    function de() {
      D.value += X;
    }
    ke([R, C, w, I], () => {
      D.value = X;
    });
    const ue = [
      { v: "all", l: "All" },
      { v: "generated", l: "IRN Generated" },
      { v: "pending", l: "Pending" },
      { v: "cancelled", l: "Cancelled" }
    ];
    async function q() {
      h.value = !0, O.value = !1;
      try {
        const s = await Se();
        try {
          const r = await Me("psd_books.api.docs.get_doc", { doctype: "Books Company", name: s });
          f.value = (r == null ? void 0 : r.gstin) || "";
        } catch {
          f.value = "";
        }
        const t = [
          ["company", "=", s],
          ["docstatus", "=", 1],
          ["is_return", "=", 0],
          ["customer_gstin", "!=", ""]
        ];
        w.value && t.push(["posting_date", ">=", w.value]), I.value && t.push(["posting_date", "<=", I.value]);
        const n = await Re("Sales Invoice", {
          fields: [
            "name",
            "posting_date",
            "customer",
            "customer_name",
            "customer_gstin",
            "grand_total",
            "irn",
            "einvoice_status",
            "ack_no",
            "ack_date"
          ],
          filters: t,
          limit: 500,
          order: "posting_date desc, creation desc"
        });
        v.value = (n || []).filter((r) => r.customer_gstin), v.value.length || (O.value = !0);
      } catch (s) {
        g.error(s.message || "Failed to load");
      } finally {
        h.value = !1;
      }
    }
    function H(s) {
      return s.einvoice_status === "Cancelled" ? "Cancelled" : s.irn ? "IRN Generated" : "Pending IRN";
    }
    function j(s) {
      return s.einvoice_status === "Cancelled" ? "badge-grey" : s.irn ? "badge-green" : "badge-orange";
    }
    function ce(s) {
      return s.einvoice_status === "Cancelled" ? "background:linear-gradient(135deg,#6b7280,#4b5563)" : s.irn ? "background:linear-gradient(135deg,#16a34a,#15803d)" : "background:linear-gradient(135deg,#d97706,#b45309)";
    }
    const ee = b(() => v.value.filter((s) => s.irn && s.einvoice_status !== "Cancelled")), N = b(() => v.value.filter((s) => !s.irn)), te = b(() => v.value.filter((s) => s.einvoice_status === "Cancelled")), ve = b(() => {
      let s = v.value;
      if (C.value === "generated" ? s = ee.value : C.value === "pending" ? s = N.value : C.value === "cancelled" && (s = te.value), R.value.trim()) {
        const t = R.value.toLowerCase();
        s = s.filter((n) => (n.name || "").toLowerCase().includes(t) || (n.customer_name || "").toLowerCase().includes(t));
      }
      return s;
    }), k = b(() => {
      const s = z.value;
      return [...ve.value].sort((t, n) => {
        const r = String(t[s] ?? "").localeCompare(String(n[s] ?? ""));
        return G.value === "asc" ? r : -r;
      });
    });
    function se(s) {
      z.value === s ? G.value = G.value === "asc" ? "desc" : "asc" : (z.value = s, G.value = "asc");
    }
    function ne(s) {
      return z.value !== s ? '<span style="color:#d1d5db">⇅</span>' : G.value === "asc" ? "↑" : "↓";
    }
    async function ae(s) {
      a.value = { ...s }, x.value = !1, m.value = { irn: "", ack_no: "", ack_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) };
      try {
        const t = await Ge("Sales Invoice", s.name);
        a.value && a.value.name === s.name && (a.value = { ...a.value, ...t });
      } catch {
      }
    }
    function Y() {
      a.value = null;
    }
    function J(s) {
      a.value && (a.value = { ...a.value, ...s });
      const t = v.value.findIndex((n) => {
        var r;
        return n.name === ((r = a.value) == null ? void 0 : r.name);
      });
      t >= 0 && (v.value[t] = { ...v.value[t], ...s });
    }
    async function me(s) {
      L.value = !0;
      try {
        const t = await U("psd_books.api.gst.generate_irn", { invoice_name: s.name });
        J(t), g.success("IRN generated successfully");
      } catch (t) {
        g.error(t.message || "Failed to generate IRN");
      } finally {
        L.value = !1;
      }
    }
    async function pe(s) {
      E.value = !0;
      try {
        await U("psd_books.api.gst.cancel_irn", { invoice_name: s.name }), J({ einvoice_status: "Cancelled" }), g.success("IRN cancelled");
      } catch (t) {
        g.error(t.message || "Failed to cancel IRN");
      } finally {
        E.value = !1;
      }
    }
    async function ge() {
      if (!m.value.irn || m.value.irn.length !== 64) return g.error("IRN must be exactly 64 characters");
      if (!m.value.ack_no) return g.error("Ack No. is required");
      P.value = !0;
      try {
        const s = await U("psd_books.api.gst.save_irn_manual", {
          invoice_name: a.value.name,
          irn: m.value.irn,
          ack_no: m.value.ack_no,
          ack_date: m.value.ack_date
        });
        J(s), x.value = !1, g.success("IRN saved");
      } catch (s) {
        g.error(s.message || "Failed to save IRN");
      } finally {
        P.value = !1;
      }
    }
    async function _e() {
      $.value = !0, W.value = 0;
      const s = N.value.filter((t) => t.customer_gstin);
      for (const t of s) {
        try {
          const n = await U("psd_books.api.gst.generate_irn", { invoice_name: t.name }), r = v.value.findIndex((Q) => Q.name === t.name);
          r >= 0 && (v.value[r] = { ...v.value[r], ...n });
        } catch {
        }
        W.value++;
      }
      $.value = !1, g.success(`Generated IRN for ${s.length} invoice(s)`);
    }
    async function fe() {
      var s;
      if ((s = a.value) != null && s.irn)
        try {
          await navigator.clipboard.writeText(a.value.irn), A.value = !0, setTimeout(() => {
            A.value = !1;
          }, 1800);
        } catch {
          g.error("Copy failed");
        }
    }
    function ye() {
      const t = [
        ["Invoice #", "Date", "Customer", "GSTIN", "Invoice Value", "IRN", "Status", "Ack No.", "Ack Date"],
        ...k.value.map((r) => [r.name, r.posting_date, r.customer_name || r.customer, r.customer_gstin || "", le(r.grand_total), r.irn || "", H(r), r.ack_no || "", r.ack_date || ""])
      ].map((r) => r.map((Q) => `"${String(Q ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), n = document.createElement("a");
      n.href = "data:text/csv;charset=utf-8," + encodeURIComponent(t), n.download = `eInvoice_${w.value}_to_${I.value}.csv`, n.click();
    }
    function K(s) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(le(s));
    }
    return Ce(q), (s, t) => (l(), i("div", $e, [
      e("div", De, [
        t[14] || (t[14] = e("div", null, [
          e("div", { class: "ei-title" }, "e-Invoice"),
          e("div", { class: "ei-sub" }, "IRN generation & management for B2B invoices")
        ], -1)),
        e("div", He, [
          e("div", Ve, [
            e("span", {
              innerHTML: c(y)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, Be),
            T(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (n) => R.value = n),
              placeholder: "Search invoice or customer…",
              class: "ei-search-input"
            }, null, 512), [
              [S, R.value]
            ])
          ]),
          e("div", ze, [
            (l(), i(_, null, V(ue, (n) => e("button", {
              key: n.v,
              class: B(["ei-pill", { active: C.value === n.v }]),
              onClick: (r) => C.value = n.v
            }, o(n.l), 11, Ae)), 64))
          ]),
          T(e("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (n) => w.value = n),
            type: "date",
            class: "ei-date-in",
            onChange: q
          }, null, 544), [
            [S, w.value]
          ]),
          t[13] || (t[13] = e("span", { style: { "font-size": "11px", color: "#9ca3af" } }, "to", -1)),
          T(e("input", {
            "onUpdate:modelValue": t[2] || (t[2] = (n) => I.value = n),
            type: "date",
            class: "ei-date-in",
            onChange: q
          }, null, 544), [
            [S, I.value]
          ]),
          e("button", {
            class: "ei-btn-ghost",
            onClick: q,
            disabled: h.value
          }, [
            e("span", {
              innerHTML: c(y)("refresh", 14)
            }, null, 8, Ee)
          ], 8, Fe),
          N.value.length ? (l(), i("button", {
            key: 0,
            class: "ei-btn-outline",
            onClick: _e,
            disabled: $.value || !s.$canCreate("accounts"),
            title: s.$canCreate("accounts") ? "" : "Read-only access"
          }, [
            $.value ? (l(), i("span", {
              key: 0,
              innerHTML: c(y)("refresh", 13),
              style: { animation: "spin 1s linear infinite", display: "inline-flex" }
            }, null, 8, qe)) : d("", !0),
            p(" " + o($.value ? `Generating ${W.value}/${N.value.length}…` : `Generate All Pending (${N.value.length})`), 1)
          ], 8, Pe)) : d("", !0),
          k.value.length ? (l(), i("button", {
            key: 1,
            class: "ei-btn-ghost",
            onClick: ye
          }, [
            e("span", {
              innerHTML: c(y)("download", 13)
            }, null, 8, Ue),
            t[12] || (t[12] = p(" CSV", -1))
          ])) : d("", !0)
        ])
      ]),
      e("div", Oe, [
        e("div", We, [
          t[15] || (t[15] = e("div", { class: "ei-sum-lbl" }, "Total B2B Invoices", -1)),
          e("div", je, o(v.value.length), 1)
        ]),
        e("div", Ye, [
          t[16] || (t[16] = e("div", { class: "ei-sum-lbl" }, "IRN Generated", -1)),
          e("div", Je, o(ee.value.length), 1)
        ]),
        e("div", Ke, [
          t[17] || (t[17] = e("div", { class: "ei-sum-lbl" }, "Pending IRN", -1)),
          e("div", Qe, o(N.value.length), 1)
        ]),
        e("div", Xe, [
          t[18] || (t[18] = e("div", { class: "ei-sum-lbl" }, "Cancelled", -1)),
          e("div", Ze, o(te.value.length), 1)
        ])
      ]),
      !h.value && O.value ? (l(), i("div", et, [
        e("span", {
          innerHTML: c(y)("info", 14)
        }, null, 8, tt),
        t[19] || (t[19] = p(" No B2B invoices found for this period. e-Invoice applies only when the customer has a GSTIN — set Tax ID on the Customer record. ", -1))
      ])) : d("", !0),
      e("div", st, [
        e("table", nt, [
          e("thead", null, [
            e("tr", null, [
              e("th", {
                onClick: t[3] || (t[3] = (n) => se("name")),
                class: "sortable"
              }, [
                t[20] || (t[20] = p("Invoice # ", -1)),
                e("span", {
                  innerHTML: ne("name")
                }, null, 8, at)
              ]),
              e("th", {
                onClick: t[4] || (t[4] = (n) => se("posting_date")),
                class: "sortable"
              }, [
                t[21] || (t[21] = p("Date ", -1)),
                e("span", {
                  innerHTML: ne("posting_date")
                }, null, 8, lt)
              ]),
              t[22] || (t[22] = e("th", null, "Customer", -1)),
              t[23] || (t[23] = e("th", null, "GSTIN", -1)),
              t[24] || (t[24] = e("th", { class: "ta-r" }, "Invoice Value", -1)),
              t[25] || (t[25] = e("th", null, "IRN", -1)),
              t[26] || (t[26] = e("th", null, "Status", -1))
            ])
          ]),
          e("tbody", null, [
            h.value ? (l(), i(_, { key: 0 }, V(8, (n) => e("tr", { key: n }, [...t[27] || (t[27] = [
              e("td", { colspan: "7" }, [
                e("div", { class: "ei-shimmer" })
              ], -1)
            ])])), 64)) : (l(), i(_, { key: 1 }, [
              (l(!0), i(_, null, V(Z.value, (n) => (l(), i("tr", {
                key: n.name,
                class: "ei-row",
                onClick: (r) => ae(n)
              }, [
                e("td", null, [
                  e("span", ot, o(n.name), 1)
                ]),
                e("td", rt, o(c(M)(n.posting_date)), 1),
                e("td", dt, o(n.customer_name || n.customer), 1),
                e("td", ut, o(n.customer_gstin || "—"), 1),
                e("td", ct, o(K(n.grand_total)), 1),
                e("td", null, [
                  n.irn && n.einvoice_status !== "Cancelled" ? (l(), i("span", {
                    key: 0,
                    class: "ei-irn-chip",
                    title: n.irn
                  }, o(n.irn.slice(0, 14)) + "…", 9, vt)) : n.einvoice_status === "Cancelled" ? (l(), i("span", mt, "Cancelled")) : (l(), i("span", pt, "—"))
                ]),
                e("td", null, [
                  e("span", {
                    class: B(["ei-badge", j(n)])
                  }, o(H(n)), 3)
                ])
              ], 8, it))), 128)),
              k.value.length ? d("", !0) : (l(), i("tr", gt, [...t[28] || (t[28] = [
                e("td", {
                  colspan: "7",
                  class: "ei-empty"
                }, [
                  e("div", { class: "ei-empty-wrap" }, [
                    e("svg", {
                      width: "40",
                      height: "40",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "#d1d5db",
                      "stroke-width": "1.3"
                    }, [
                      e("rect", {
                        x: "3",
                        y: "3",
                        width: "18",
                        height: "18",
                        rx: "2"
                      }),
                      e("path", { d: "M3 9h18M9 21V9" })
                    ]),
                    e("div", null, "No e-invoices match this filter")
                  ])
                ], -1)
              ])]))
            ], 64))
          ])
        ]),
        e("div", _t, [
          h.value ? (l(), i(_, { key: 0 }, V(6, (n) => e("div", {
            key: n,
            class: "ei-mobile-card ei-mc--skeleton"
          }, [...t[29] || (t[29] = [
            e("div", {
              class: "ei-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            e("div", {
              class: "ei-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            e("div", {
              class: "ei-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : k.value.length ? (l(!0), i(_, { key: 2 }, V(Z.value, (n) => (l(), i("div", {
            key: n.name,
            class: "ei-mobile-card",
            onClick: (r) => ae(n)
          }, [
            e("div", bt, [
              e("span", ht, o(n.name), 1),
              e("span", {
                class: B(["ei-badge", j(n)])
              }, o(H(n)), 3)
            ]),
            e("div", kt, o(n.customer_name || n.customer), 1),
            e("div", Ct, [
              e("span", null, o(c(M)(n.posting_date)), 1),
              e("span", wt, o(K(n.grand_total)), 1)
            ])
          ], 8, yt))), 128)) : (l(), i("div", ft, [...t[30] || (t[30] = [
            e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🧾", -1),
            e("div", null, "No e-invoices match this filter", -1)
          ])]))
        ]),
        !h.value && re.value ? (l(), i("div", It, [
          e("button", {
            class: "ei-btn-ghost ei-load-more-btn",
            onClick: de
          }, " Load More (" + o(k.value.length - D.value) + " remaining) ", 1)
        ])) : d("", !0)
      ]),
      (l(), we(Te, { to: "body" }, [
        a.value ? (l(), i("div", {
          key: 0,
          class: "ei-overlay",
          onClick: Ie(Y, ["self"])
        })) : d("", !0),
        e("div", {
          class: B(["ei-panel", { open: !!a.value }])
        }, [
          a.value ? (l(), i(_, { key: 0 }, [
            e("div", {
              class: "ei-panel-hdr",
              style: xe(ce(a.value))
            }, [
              e("div", xt, [
                e("div", Nt, o(a.value.name), 1),
                e("div", Tt, o(a.value.customer_name || a.value.customer), 1),
                e("div", St, [
                  e("span", {
                    class: B(["ei-badge", j(a.value)]),
                    style: { "font-size": "12px", padding: "3px 10px" }
                  }, o(H(a.value)), 3)
                ])
              ]),
              e("button", {
                class: "ei-close-btn",
                onClick: Y
              }, [
                e("span", {
                  innerHTML: c(y)("x", 16)
                }, null, 8, Mt)
              ])
            ], 4),
            e("div", Rt, [
              e("div", Gt, [
                t[31] || (t[31] = e("div", { class: "ei-meta-lbl" }, "Date", -1)),
                e("div", Lt, o(c(M)(a.value.posting_date)), 1)
              ]),
              e("div", $t, [
                t[32] || (t[32] = e("div", { class: "ei-meta-lbl" }, "Invoice Value", -1)),
                e("div", Dt, o(K(a.value.grand_total)), 1)
              ]),
              e("div", Ht, [
                t[33] || (t[33] = e("div", { class: "ei-meta-lbl" }, "Status", -1)),
                e("div", Vt, o(H(a.value)), 1)
              ])
            ]),
            e("div", Bt, [
              f.value ? d("", !0) : (l(), i("div", zt, [...t[34] || (t[34] = [
                e("span", { style: { "flex-shrink": "0", "font-size": "15px" } }, "⚠️", -1),
                e("div", null, [
                  e("div", { style: { "font-weight": "700", "margin-bottom": "1px" } }, "Company GSTIN not configured"),
                  e("div", null, [
                    p("Set your company's GSTIN under "),
                    e("strong", null, "Books Company → GSTIN"),
                    p(" to enable IRN generation.")
                  ])
                ], -1)
              ])])),
              e("div", At, [
                t[35] || (t[35] = e("span", { class: "ei-gstin-lbl" }, "Customer GSTIN", -1)),
                a.value.customer_gstin ? (l(), i("span", Ft, o(a.value.customer_gstin), 1)) : (l(), i("span", Et, "Not set — add Tax ID on Customer"))
              ]),
              f.value ? (l(), i("div", Pt, [
                t[36] || (t[36] = e("span", { class: "ei-gstin-lbl" }, "Company GSTIN", -1)),
                e("span", qt, o(f.value), 1)
              ])) : d("", !0)
            ]),
            e("div", Ut, [
              a.value.customer_gstin ? d("", !0) : (l(), i("div", Ot, [
                e("span", {
                  innerHTML: c(y)("info", 14),
                  style: { "flex-shrink": "0", "margin-top": "1px" }
                }, null, 8, Wt),
                t[37] || (t[37] = p(" Add Tax ID (GSTIN) on the Customer record to enable IRN generation for this invoice. ", -1))
              ])),
              a.value.irn ? (l(), i(_, { key: 1 }, [
                t[41] || (t[41] = e("div", { class: "ei-sec-hdr" }, "IRN Details", -1)),
                e("div", jt, [
                  e("div", Yt, [
                    e("div", Jt, o(a.value.irn), 1),
                    e("button", {
                      class: "ei-copy-btn",
                      onClick: fe,
                      title: A.value ? "Copied!" : "Copy IRN"
                    }, [
                      e("span", {
                        innerHTML: c(y)(A.value ? "check" : "copy", 13)
                      }, null, 8, Qt)
                    ], 8, Kt)
                  ]),
                  e("div", Xt, [
                    e("div", null, [
                      t[38] || (t[38] = e("div", { class: "ei-meta-lbl" }, "Ack No.", -1)),
                      e("div", Zt, o(a.value.ack_no || "—"), 1)
                    ]),
                    e("div", null, [
                      t[39] || (t[39] = e("div", { class: "ei-meta-lbl" }, "Ack Date", -1)),
                      e("div", es, o(c(M)(a.value.ack_date) || "—"), 1)
                    ])
                  ])
                ]),
                a.value.einvoice_status !== "Cancelled" ? (l(), i("div", ts, [
                  t[40] || (t[40] = e("div", { class: "ei-qr-label" }, "QR Code", -1)),
                  e("div", ss, [
                    Ne(Le, {
                      irn: a.value.irn,
                      size: oe.value,
                      class: "ei-qr-img"
                    }, null, 8, ["irn", "size"])
                  ])
                ])) : d("", !0)
              ], 64)) : !a.value.irn && a.value.customer_gstin ? (l(), i("div", ns, [...t[42] || (t[42] = [
                e("svg", {
                  width: "42",
                  height: "42",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "#d1d5db",
                  "stroke-width": "1.3"
                }, [
                  e("rect", {
                    x: "3",
                    y: "3",
                    width: "18",
                    height: "18",
                    rx: "2"
                  }),
                  e("path", { d: "M3 9h18M9 21V9" })
                ], -1),
                e("div", { style: { "font-size": "13px", "font-weight": "600", color: "#374151" } }, "No IRN generated yet", -1),
                e("div", { style: { "font-size": "12px", color: "#9ca3af", "margin-top": "2px" } }, 'Click "Generate IRN" below to create one', -1)
              ])])) : d("", !0),
              x.value ? (l(), i("div", as, [
                t[43] || (t[43] = e("div", {
                  class: "ei-sec-hdr",
                  style: { "margin-top": "0", "margin-bottom": "10px" }
                }, "Enter IRN Manually", -1)),
                t[44] || (t[44] = e("label", { class: "ei-lbl" }, [
                  p("IRN (64-char hex) "),
                  e("span", { style: { color: "#ef4444" } }, "*")
                ], -1)),
                T(e("input", {
                  "onUpdate:modelValue": t[5] || (t[5] = (n) => m.value.irn = n),
                  class: "ei-fi",
                  placeholder: "64-character hex string from NIC portal",
                  maxlength: "64"
                }, null, 512), [
                  [S, m.value.irn]
                ]),
                t[45] || (t[45] = e("label", {
                  class: "ei-lbl",
                  style: { "margin-top": "10px" }
                }, [
                  p("Ack No. "),
                  e("span", { style: { color: "#ef4444" } }, "*")
                ], -1)),
                T(e("input", {
                  "onUpdate:modelValue": t[6] || (t[6] = (n) => m.value.ack_no = n),
                  class: "ei-fi",
                  placeholder: "Acknowledgement number"
                }, null, 512), [
                  [S, m.value.ack_no]
                ]),
                t[46] || (t[46] = e("label", {
                  class: "ei-lbl",
                  style: { "margin-top": "10px" }
                }, "Ack Date", -1)),
                T(e("input", {
                  "onUpdate:modelValue": t[7] || (t[7] = (n) => m.value.ack_date = n),
                  type: "date",
                  class: "ei-fi"
                }, null, 512), [
                  [S, m.value.ack_date]
                ]),
                e("div", ls, [
                  e("button", {
                    class: "ei-btn-ghost",
                    style: { flex: "1" },
                    onClick: t[8] || (t[8] = (n) => x.value = !1)
                  }, "Cancel"),
                  e("button", {
                    class: "ei-btn-primary",
                    style: { flex: "1" },
                    disabled: P.value || !s.$canCreate("accounts"),
                    title: s.$canCreate("accounts") ? "" : "Read-only access",
                    onClick: ge
                  }, o(P.value ? "Saving…" : "Save IRN"), 9, is)
                ])
              ])) : d("", !0)
            ]),
            a.value.owner ? (l(), i("div", os, [
              p(" Created by " + o(c(ie)(a.value.owner)) + " on " + o(c(M)(a.value.creation)) + " ", 1),
              a.value.modified_by ? (l(), i(_, { key: 0 }, [
                p(" · Last modified by " + o(c(ie)(a.value.modified_by)) + " on " + o(c(M)(a.value.modified)), 1)
              ], 64)) : d("", !0)
            ])) : d("", !0),
            e("div", rs, [
              e("button", {
                class: "ei-btn-ghost",
                onClick: Y
              }, "Close"),
              a.value.einvoice_status !== "Cancelled" ? (l(), i(_, { key: 0 }, [
                !a.value.irn && a.value.customer_gstin && !x.value ? (l(), i("button", {
                  key: 0,
                  class: "ei-btn-outline",
                  disabled: !f.value || !s.$canCreate("accounts"),
                  title: f.value ? s.$canCreate("accounts") ? "" : "Read-only access" : "Company GSTIN not configured. Set it under Books Company → GSTIN.",
                  onClick: t[9] || (t[9] = (n) => x.value = !0)
                }, "Enter Manually", 8, ds)) : d("", !0),
                !a.value.irn && a.value.customer_gstin ? (l(), i("button", {
                  key: 1,
                  class: "ei-btn-primary",
                  disabled: L.value || !f.value || !s.$canCreate("accounts"),
                  title: f.value ? s.$canCreate("accounts") ? "" : "Read-only access" : "Company GSTIN not configured. Set it under Books Company → GSTIN.",
                  onClick: t[10] || (t[10] = (n) => me(a.value))
                }, [
                  L.value ? (l(), i("span", {
                    key: 0,
                    innerHTML: c(y)("refresh", 13),
                    style: { animation: "spin 1s linear infinite", display: "inline-flex" }
                  }, null, 8, cs)) : d("", !0),
                  p(" " + o(L.value ? "Generating…" : "Generate IRN"), 1)
                ], 8, us)) : d("", !0),
                a.value.irn ? (l(), i("button", {
                  key: 2,
                  class: "ei-btn-danger",
                  disabled: E.value || !s.$canDelete("accounts"),
                  title: s.$canDelete("accounts") ? "" : "Not permitted",
                  onClick: t[11] || (t[11] = (n) => pe(a.value))
                }, o(E.value ? "Cancelling…" : "Cancel IRN"), 9, vs)) : d("", !0)
              ], 64)) : d("", !0)
            ])
          ], 64)) : d("", !0)
        ], 2)
      ]))
    ]));
  }
}, bs = /* @__PURE__ */ be(ms, [["__scopeId", "data-v-91cc862e"]]);
export {
  bs as default
};
