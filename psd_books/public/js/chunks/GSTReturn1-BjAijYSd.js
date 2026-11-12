import { _ as X, x as tt, h as w, y as st, o as et, c as o, a as s, w as E, v as at, F as v, r as p, u as f, p as lt, i as M, d as i, b as _, t as l, n as x, A as ot, W as nt, e as dt, l as rt, g as S, k as n } from "./main-CULz3kda.js";
import { f as m, b as G } from "./format-BcJZDVG4.js";
const ut = { class: "g1-page" }, it = { class: "g1-toolbar" }, ct = { class: "g1-controls" }, vt = ["value"], mt = ["disabled"], gt = ["innerHTML"], pt = ["innerHTML"], _t = ["disabled"], bt = ["innerHTML"], ft = {
  key: 0,
  style: { "font-weight": "600" }
}, yt = { class: "g1-sum-strip" }, Tt = { class: "g1-sum-card" }, St = { class: "g1-sum-val" }, ht = { class: "g1-sum-card" }, Ct = { class: "g1-sum-val" }, kt = { class: "g1-sum-card" }, wt = { class: "g1-sum-val" }, xt = { class: "g1-sum-card" }, Nt = {
  class: "g1-sum-val",
  style: { color: "#16a34a" }
}, Ht = {
  key: 0,
  class: "g1-warn"
}, Lt = ["innerHTML"], Mt = {
  key: 1,
  class: "g1-card"
}, It = { class: "g1-card-top" }, Dt = { class: "g1-tabs" }, Gt = { class: "g1-tab-ct" }, $t = { class: "g1-tab-ct" }, Bt = { class: "g1-tab-ct" }, Vt = { class: "g1-tab-ct" }, Rt = { class: "g1-tab-ct" }, At = { class: "g1-search-wrap" }, Ut = ["innerHTML"], Pt = ["placeholder"], Ft = {
  key: 0,
  class: "g1-table-wrap"
}, Et = { class: "g1-table" }, zt = ["innerHTML"], jt = ["innerHTML"], qt = { "data-label": "Invoice #" }, Kt = { class: "g1-code" }, Yt = {
  "data-label": "Date",
  class: "mono muted"
}, Ot = {
  "data-label": "Customer",
  class: "fw5"
}, Wt = {
  "data-label": "GSTIN",
  class: "mono muted sm"
}, Zt = {
  "data-label": "Place of Supply",
  class: "muted"
}, Jt = {
  "data-label": "Taxable",
  class: "ta-r mono"
}, Qt = {
  "data-label": "IGST",
  class: "ta-r mono muted"
}, Xt = {
  "data-label": "CGST",
  class: "ta-r mono muted"
}, ts = {
  "data-label": "SGST",
  class: "ta-r mono muted"
}, ss = {
  "data-label": "Invoice Value",
  class: "ta-r mono fw6"
}, es = { key: 0 }, as = {
  key: 1,
  class: "g1-table-wrap"
}, ls = { class: "g1-table" }, os = ["innerHTML"], ns = ["innerHTML"], ds = { "data-label": "Invoice #" }, rs = { class: "g1-code" }, us = {
  "data-label": "Date",
  class: "mono muted"
}, is = {
  "data-label": "Customer",
  class: "fw5"
}, cs = {
  "data-label": "Place of Supply",
  class: "muted"
}, vs = {
  "data-label": "Taxable",
  class: "ta-r mono"
}, ms = {
  "data-label": "Tax",
  class: "ta-r mono fw6"
}, gs = {
  "data-label": "Invoice Value",
  class: "ta-r mono fw6"
}, ps = { key: 0 }, _s = {
  key: 2,
  class: "g1-table-wrap"
}, bs = { class: "g1-table" }, fs = ["innerHTML"], ys = ["innerHTML"], Ts = {
  "data-label": "Date",
  class: "mono muted"
}, Ss = {
  "data-label": "Customer",
  class: "fw5"
}, hs = {
  "data-label": "GSTIN",
  class: "mono muted sm"
}, Cs = {
  "data-label": "Against Invoice",
  class: "mono muted"
}, ks = {
  "data-label": "Taxable",
  class: "ta-r mono"
}, ws = {
  "data-label": "Tax",
  class: "ta-r mono fw6"
}, xs = {
  "data-label": "Note Value",
  class: "ta-r mono fw6 cdnr-code"
}, Ns = { key: 0 }, Hs = {
  key: 3,
  class: "g1-table-wrap"
}, Ls = { class: "g1-table" }, Ms = ["innerHTML"], Is = ["innerHTML"], Ds = { "data-label": "Note #" }, Gs = { class: "g1-code cdnr-code" }, $s = {
  "data-label": "Date",
  class: "mono muted"
}, Bs = {
  "data-label": "Customer",
  class: "fw5"
}, Vs = {
  "data-label": "Against Invoice",
  class: "mono muted"
}, Rs = {
  "data-label": "Taxable",
  class: "ta-r mono"
}, As = {
  "data-label": "Tax",
  class: "ta-r mono fw6"
}, Us = {
  "data-label": "Note Value",
  class: "ta-r mono fw6 cdnr-code"
}, Ps = { key: 0 }, Fs = {
  key: 4,
  class: "g1-table-wrap"
}, Es = { class: "g1-table" }, zs = { "data-label": "HSN / SAC Code" }, js = {
  key: 0,
  class: "g1-warn-tag"
}, qs = {
  "data-label": "No. of Invoices",
  class: "ta-r mono"
}, Ks = {
  "data-label": "Taxable Value",
  class: "ta-r mono fw6"
}, Ys = { key: 0 }, Os = {
  key: 5,
  class: "g1-load-more-wrap"
}, Ws = {
  key: 2,
  class: "g1-placeholder"
}, R = 10, Zs = {
  __name: "GSTReturn1",
  setup(Js) {
    const { toast: z } = tt(), g = w(!1), d = w(null), u = w("b2b"), y = w(""), N = w("posting_date"), I = w(-1), $ = /* @__PURE__ */ new Date();
    function j() {
      const r = [];
      for (let t = 0; t < 12; t++) {
        const e = new Date($.getFullYear(), $.getMonth() - t, 1), a = `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}`, b = e.toLocaleString("en-US", { month: "long", year: "numeric" });
        r.push({ v: a, l: b });
      }
      return r;
    }
    const B = j(), T = w(B[0].v), q = S(() => {
      var r;
      return ((r = B.find((t) => t.v === T.value)) == null ? void 0 : r.l) || T.value;
    }), K = S(() => {
      const [r, t] = T.value.split("-");
      return new Date(+r, +t, 11).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }), A = S(() => {
      const [r, t] = T.value.split("-"), e = (new Date(+r, +t, 11) - $) / 864e5;
      return e >= 0 && e <= 7;
    }), U = S(() => d.value ? (d.value.hsn_summary || []).filter((r) => r.hsn_code === "Not Set").reduce((r, t) => r + t.invoice_count, 0) : 0), Y = S(() => u.value === "hsn" ? "Search HSN code…" : u.value === "cdnr" ? "Search note # or GSTIN…" : u.value === "cdnur" ? "Search note #…" : "Search invoice # or customer…"), O = S(() => d.value ? u.value === "b2b" ? d.value.b2b : u.value === "b2c" ? d.value.b2c : u.value === "cdnr" ? d.value.cdnr : u.value === "cdnur" ? d.value.cdnur : u.value === "hsn" ? d.value.hsn_summary : [] : []), h = S(() => {
      let r = O.value;
      const t = y.value.toLowerCase().trim();
      if (t && (r = r.filter(
        (e) => (e.name || "").toLowerCase().includes(t) || (e.customer_name || "").toLowerCase().includes(t) || (e.customer_gstin || "").toLowerCase().includes(t) || (e.hsn_code || "").toLowerCase().includes(t)
      )), u.value !== "hsn" && N.value) {
        const e = N.value, a = I.value;
        r = [...r].sort((b, Q) => {
          const P = b[e] || "", F = Q[e] || "";
          return P < F ? -a : P > F ? a : 0;
        });
      }
      return r;
    }), H = w(R), L = S(() => h.value.slice(0, H.value)), W = S(() => H.value < h.value.length);
    function Z() {
      H.value += R;
    }
    st([u, y, T], () => {
      H.value = R;
    });
    function C(r) {
      N.value === r ? I.value *= -1 : (N.value = r, I.value = -1);
    }
    function k(r) {
      return N.value !== r ? '<span style="color:#d1d5db">⇅</span>' : I.value === 1 ? "↑" : "↓";
    }
    function V(r, t) {
      var a;
      if (!((a = r.taxes) != null && a.length)) return 0;
      const e = r.taxes.find((b) => (b.tax_type || "").toUpperCase() === t || (b.description || "").toUpperCase().includes(t));
      return m(e == null ? void 0 : e.tax_amount);
    }
    async function D() {
      g.value = !0, d.value = null;
      try {
        const r = await dt(), [t, e] = T.value.split("-"), a = `${t}-${e}-01`, b = `${t}-${e}-${String(new Date(+t, +e, 0).getDate()).padStart(2, "0")}`;
        d.value = await rt("psd_books.db.queries.get_gstr1_data", { company: r, from_date: a, to_date: b });
      } catch (r) {
        z.error(r.message || "Failed to load GSTR-1");
      } finally {
        g.value = !1;
      }
    }
    function J() {
      if (!d.value) return;
      const t = [
        ["Section", "Invoice #", "Date", "Customer", "GSTIN", "Place of Supply", "Taxable", "Tax", "Invoice Value"],
        ...d.value.b2b.map((a) => ["B2B", a.name, a.posting_date, a.customer_name || a.customer, a.customer_gstin || "", a.place_of_supply || "", m(a.net_total), m(a.total_tax), m(a.grand_total)]),
        ...d.value.b2c.map((a) => ["B2C", a.name, a.posting_date, a.customer_name || a.customer, "", a.place_of_supply || "", m(a.net_total), m(a.total_tax), m(a.grand_total)]),
        ...d.value.cdnr.map((a) => ["CDNR", a.name, a.posting_date, a.customer_name || a.customer, a.customer_gstin || "", a.place_of_supply || "", m(a.net_total), m(a.total_tax), m(a.grand_total)]),
        ...d.value.cdnur.map((a) => ["CDNUR", a.name, a.posting_date, a.customer_name || a.customer, "", a.place_of_supply || "", m(a.net_total), m(a.total_tax), m(a.grand_total)]),
        [],
        [" HSN Code", "Invoice Count", "Taxable Value"],
        ...d.value.hsn_summary.map((a) => [a.hsn_code, a.invoice_count, m(a.taxable_value)])
      ].map((a) => a.map((b) => `"${String(b).replace(/"/g, '""')}"`).join(",")).join(`
`), e = document.createElement("a");
      e.href = "data:text/csv;charset=utf-8," + encodeURIComponent(t), e.download = `GSTR-1_${T.value}.csv`, e.click();
    }
    function c(r) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(m(r));
    }
    return et(D), (r, t) => (n(), o("div", ut, [
      s("div", it, [
        t[16] || (t[16] = s("div", null, [
          s("div", { class: "g1-title" }, "GSTR-1"),
          s("div", { class: "g1-sub" }, "Outward Supply Return — B2B, B2C, CDNR & HSN")
        ], -1)),
        s("div", ct, [
          E(s("select", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => T.value = e),
            class: "g1-select",
            onChange: D
          }, [
            (n(!0), o(v, null, p(f(B), (e) => (n(), o("option", {
              key: e.v,
              value: e.v
            }, l(e.l), 9, vt))), 128))
          ], 544), [
            [at, T.value]
          ]),
          s("button", {
            class: "g1-btn-ghost",
            onClick: D,
            disabled: g.value
          }, [
            s("span", {
              innerHTML: f(M)("refresh", 13),
              style: lt(g.value ? "animation:spin 1s linear infinite;display:inline-flex" : "")
            }, null, 12, gt)
          ], 8, mt),
          d.value ? (n(), o("button", {
            key: 0,
            class: "g1-btn-ghost",
            onClick: J
          }, [
            s("span", {
              innerHTML: f(M)("download", 13)
            }, null, 8, pt),
            t[15] || (t[15] = i(" CSV", -1))
          ])) : _("", !0),
          s("button", {
            class: "g1-btn-primary",
            onClick: D,
            disabled: g.value
          }, l(g.value ? "Computing…" : "Compute"), 9, _t)
        ])
      ]),
      s("div", {
        class: x(["g1-deadline", A.value ? "due-warn" : "due-ok"])
      }, [
        s("span", {
          innerHTML: f(M)("calendar", 12)
        }, null, 8, bt),
        t[17] || (t[17] = i(" GSTR-1 for ", -1)),
        s("strong", null, l(q.value), 1),
        t[18] || (t[18] = i(" — due ", -1)),
        s("strong", null, l(K.value), 1),
        A.value ? (n(), o("span", ft, " · deadline approaching")) : _("", !0)
      ], 2),
      s("div", yt, [
        s("div", Tt, [
          t[19] || (t[19] = s("div", { class: "g1-sum-lbl" }, "B2B Invoices", -1)),
          s("div", St, l(d.value ? d.value.b2b.length : "—"), 1)
        ]),
        s("div", ht, [
          t[20] || (t[20] = s("div", { class: "g1-sum-lbl" }, "B2C Invoices", -1)),
          s("div", Ct, l(d.value ? d.value.b2c.length : "—"), 1)
        ]),
        s("div", kt, [
          t[21] || (t[21] = s("div", { class: "g1-sum-lbl" }, "Credit Notes (CDNR)", -1)),
          s("div", wt, l(d.value ? d.value.cdnr.length : "—"), 1)
        ]),
        s("div", xt, [
          t[22] || (t[22] = s("div", { class: "g1-sum-lbl" }, "Total Tax Collected", -1)),
          s("div", Nt, l(d.value ? c(d.value.totals.total_tax) : "—"), 1)
        ])
      ]),
      d.value && U.value > 0 ? (n(), o("div", Ht, [
        s("span", {
          innerHTML: f(M)("alert", 13),
          style: { "flex-shrink": "0" }
        }, null, 8, Lt),
        s("strong", null, l(U.value) + " invoice(s)", 1),
        t[23] || (t[23] = i(" have items without HSN/SAC codes — add codes before filing. ", -1))
      ])) : _("", !0),
      d.value || g.value ? (n(), o("div", Mt, [
        s("div", It, [
          s("div", Dt, [
            s("button", {
              class: x(["g1-tab", { active: u.value === "b2b" }]),
              onClick: t[1] || (t[1] = (e) => {
                u.value = "b2b", y.value = "";
              })
            }, [
              t[24] || (t[24] = i(" B2B ", -1)),
              s("span", Gt, l(d.value ? d.value.b2b.length : 0), 1)
            ], 2),
            s("button", {
              class: x(["g1-tab", { active: u.value === "b2c" }]),
              onClick: t[2] || (t[2] = (e) => {
                u.value = "b2c", y.value = "";
              })
            }, [
              t[25] || (t[25] = i(" B2C ", -1)),
              s("span", $t, l(d.value ? d.value.b2c.length : 0), 1)
            ], 2),
            s("button", {
              class: x(["g1-tab", { active: u.value === "cdnr" }]),
              onClick: t[3] || (t[3] = (e) => {
                u.value = "cdnr", y.value = "";
              })
            }, [
              t[26] || (t[26] = i(" CDNR ", -1)),
              s("span", Bt, l(d.value ? d.value.cdnr.length : 0), 1)
            ], 2),
            s("button", {
              class: x(["g1-tab", { active: u.value === "cdnur" }]),
              onClick: t[4] || (t[4] = (e) => {
                u.value = "cdnur", y.value = "";
              })
            }, [
              t[27] || (t[27] = i(" CDNUR ", -1)),
              s("span", Vt, l(d.value ? d.value.cdnur.length : 0), 1)
            ], 2),
            s("button", {
              class: x(["g1-tab", { active: u.value === "hsn" }]),
              onClick: t[5] || (t[5] = (e) => {
                u.value = "hsn", y.value = "";
              })
            }, [
              t[28] || (t[28] = i(" HSN Summary ", -1)),
              s("span", Rt, l(d.value ? d.value.hsn_summary.length : 0), 1)
            ], 2)
          ]),
          s("div", At, [
            s("span", {
              innerHTML: f(M)("search", 12),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, Ut),
            E(s("input", {
              "onUpdate:modelValue": t[6] || (t[6] = (e) => y.value = e),
              class: "g1-search",
              placeholder: Y.value
            }, null, 8, Pt), [
              [ot, y.value]
            ])
          ])
        ]),
        u.value === "b2b" ? (n(), o("div", Ft, [
          s("table", Et, [
            s("thead", null, [
              s("tr", null, [
                s("th", {
                  onClick: t[7] || (t[7] = (e) => C("name")),
                  class: "sortable"
                }, [
                  t[29] || (t[29] = i("Invoice # ", -1)),
                  s("span", {
                    innerHTML: k("name")
                  }, null, 8, zt)
                ]),
                s("th", {
                  onClick: t[8] || (t[8] = (e) => C("posting_date")),
                  class: "sortable"
                }, [
                  t[30] || (t[30] = i("Date ", -1)),
                  s("span", {
                    innerHTML: k("posting_date")
                  }, null, 8, jt)
                ]),
                t[31] || (t[31] = s("th", null, "Customer", -1)),
                t[32] || (t[32] = s("th", null, "GSTIN", -1)),
                t[33] || (t[33] = s("th", null, "Place of Supply", -1)),
                t[34] || (t[34] = s("th", { class: "ta-r" }, "Taxable", -1)),
                t[35] || (t[35] = s("th", { class: "ta-r" }, "IGST", -1)),
                t[36] || (t[36] = s("th", { class: "ta-r" }, "CGST", -1)),
                t[37] || (t[37] = s("th", { class: "ta-r" }, "SGST", -1)),
                t[38] || (t[38] = s("th", { class: "ta-r" }, "Invoice Value", -1))
              ])
            ]),
            s("tbody", null, [
              g.value ? (n(), o(v, { key: 0 }, p(6, (e) => s("tr", { key: e }, [...t[39] || (t[39] = [
                s("td", { colspan: "10" }, [
                  s("div", { class: "g1-shimmer" })
                ], -1)
              ])])), 64)) : (n(), o(v, { key: 1 }, [
                (n(!0), o(v, null, p(L.value, (e) => (n(), o("tr", {
                  key: e.name,
                  class: "g1-row"
                }, [
                  s("td", qt, [
                    s("span", Kt, l(e.name), 1)
                  ]),
                  s("td", Yt, l(f(G)(e.posting_date)), 1),
                  s("td", Ot, l(e.customer_name || e.customer), 1),
                  s("td", Wt, l(e.customer_gstin || "—"), 1),
                  s("td", Zt, l(e.place_of_supply || "—"), 1),
                  s("td", Jt, l(c(e.net_total)), 1),
                  s("td", Qt, l(c(V(e, "IGST"))), 1),
                  s("td", Xt, l(c(V(e, "CGST"))), 1),
                  s("td", ts, l(c(V(e, "SGST"))), 1),
                  s("td", ss, l(c(e.grand_total)), 1)
                ]))), 128)),
                h.value.length ? _("", !0) : (n(), o("tr", es, [...t[40] || (t[40] = [
                  s("td", {
                    colspan: "10",
                    class: "g1-empty"
                  }, "No B2B invoices — customers need a GSTIN on their record", -1)
                ])]))
              ], 64))
            ])
          ])
        ])) : u.value === "b2c" ? (n(), o("div", as, [
          s("table", ls, [
            s("thead", null, [
              s("tr", null, [
                s("th", {
                  onClick: t[9] || (t[9] = (e) => C("name")),
                  class: "sortable"
                }, [
                  t[41] || (t[41] = i("Invoice # ", -1)),
                  s("span", {
                    innerHTML: k("name")
                  }, null, 8, os)
                ]),
                s("th", {
                  onClick: t[10] || (t[10] = (e) => C("posting_date")),
                  class: "sortable"
                }, [
                  t[42] || (t[42] = i("Date ", -1)),
                  s("span", {
                    innerHTML: k("posting_date")
                  }, null, 8, ns)
                ]),
                t[43] || (t[43] = s("th", null, "Customer", -1)),
                t[44] || (t[44] = s("th", null, "Place of Supply", -1)),
                t[45] || (t[45] = s("th", { class: "ta-r" }, "Taxable", -1)),
                t[46] || (t[46] = s("th", { class: "ta-r" }, "Tax", -1)),
                t[47] || (t[47] = s("th", { class: "ta-r" }, "Invoice Value", -1))
              ])
            ]),
            s("tbody", null, [
              g.value ? (n(), o(v, { key: 0 }, p(6, (e) => s("tr", { key: e }, [...t[48] || (t[48] = [
                s("td", { colspan: "7" }, [
                  s("div", { class: "g1-shimmer" })
                ], -1)
              ])])), 64)) : (n(), o(v, { key: 1 }, [
                (n(!0), o(v, null, p(L.value, (e) => (n(), o("tr", {
                  key: e.name,
                  class: "g1-row"
                }, [
                  s("td", ds, [
                    s("span", rs, l(e.name), 1)
                  ]),
                  s("td", us, l(f(G)(e.posting_date)), 1),
                  s("td", is, l(e.customer_name || e.customer), 1),
                  s("td", cs, l(e.place_of_supply || "—"), 1),
                  s("td", vs, l(c(e.net_total)), 1),
                  s("td", ms, l(c(e.total_tax)), 1),
                  s("td", gs, l(c(e.grand_total)), 1)
                ]))), 128)),
                h.value.length ? _("", !0) : (n(), o("tr", ps, [...t[49] || (t[49] = [
                  s("td", {
                    colspan: "7",
                    class: "g1-empty"
                  }, "No B2C invoices for this period", -1)
                ])]))
              ], 64))
            ])
          ])
        ])) : u.value === "cdnr" ? (n(), o("div", _s, [
          s("table", bs, [
            s("thead", null, [
              s("tr", null, [
                s("th", {
                  onClick: t[11] || (t[11] = (e) => C("name")),
                  class: "sortable"
                }, [
                  t[50] || (t[50] = i("Note # ", -1)),
                  s("span", {
                    innerHTML: k("name")
                  }, null, 8, fs)
                ]),
                s("th", {
                  onClick: t[12] || (t[12] = (e) => C("posting_date")),
                  class: "sortable"
                }, [
                  t[51] || (t[51] = i("Date ", -1)),
                  s("span", {
                    innerHTML: k("posting_date")
                  }, null, 8, ys)
                ]),
                t[52] || (t[52] = s("th", null, "Customer", -1)),
                t[53] || (t[53] = s("th", null, "GSTIN", -1)),
                t[54] || (t[54] = s("th", null, "Against Invoice", -1)),
                t[55] || (t[55] = s("th", { class: "ta-r" }, "Taxable", -1)),
                t[56] || (t[56] = s("th", { class: "ta-r" }, "Tax", -1)),
                t[57] || (t[57] = s("th", { class: "ta-r" }, "Note Value", -1))
              ])
            ]),
            s("tbody", null, [
              g.value ? (n(), o(v, { key: 0 }, p(4, (e) => s("tr", { key: e }, [...t[58] || (t[58] = [
                s("td", { colspan: "8" }, [
                  s("div", { class: "g1-shimmer" })
                ], -1)
              ])])), 64)) : (n(), o(v, { key: 1 }, [
                (n(!0), o(v, null, p(L.value, (e) => (n(), o("tr", {
                  key: e.name,
                  class: "g1-row"
                }, [
                  s("td", Ts, l(f(G)(e.posting_date)), 1),
                  s("td", Ss, l(e.customer_name || e.customer), 1),
                  s("td", hs, l(e.customer_gstin || "—"), 1),
                  s("td", Cs, l(e.return_against || "—"), 1),
                  s("td", ks, l(c(e.net_total)), 1),
                  s("td", ws, l(c(e.total_tax)), 1),
                  s("td", xs, l(c(e.grand_total)), 1)
                ]))), 128)),
                h.value.length ? _("", !0) : (n(), o("tr", Ns, [...t[59] || (t[59] = [
                  s("td", {
                    colspan: "8",
                    class: "g1-empty"
                  }, "No credit notes for this period", -1)
                ])]))
              ], 64))
            ])
          ])
        ])) : u.value === "cdnur" ? (n(), o("div", Hs, [
          s("table", Ls, [
            s("thead", null, [
              s("tr", null, [
                s("th", {
                  onClick: t[13] || (t[13] = (e) => C("name")),
                  class: "sortable"
                }, [
                  t[60] || (t[60] = i("Note # ", -1)),
                  s("span", {
                    innerHTML: k("name")
                  }, null, 8, Ms)
                ]),
                s("th", {
                  onClick: t[14] || (t[14] = (e) => C("posting_date")),
                  class: "sortable"
                }, [
                  t[61] || (t[61] = i("Date ", -1)),
                  s("span", {
                    innerHTML: k("posting_date")
                  }, null, 8, Is)
                ]),
                t[62] || (t[62] = s("th", null, "Customer", -1)),
                t[63] || (t[63] = s("th", null, "Against Invoice", -1)),
                t[64] || (t[64] = s("th", { class: "ta-r" }, "Taxable", -1)),
                t[65] || (t[65] = s("th", { class: "ta-r" }, "Tax", -1)),
                t[66] || (t[66] = s("th", { class: "ta-r" }, "Note Value", -1))
              ])
            ]),
            s("tbody", null, [
              g.value ? (n(), o(v, { key: 0 }, p(4, (e) => s("tr", { key: e }, [...t[67] || (t[67] = [
                s("td", { colspan: "7" }, [
                  s("div", { class: "g1-shimmer" })
                ], -1)
              ])])), 64)) : (n(), o(v, { key: 1 }, [
                (n(!0), o(v, null, p(L.value, (e) => (n(), o("tr", {
                  key: e.name,
                  class: "g1-row"
                }, [
                  s("td", Ds, [
                    s("span", Gs, l(e.name), 1)
                  ]),
                  s("td", $s, l(f(G)(e.posting_date)), 1),
                  s("td", Bs, l(e.customer_name || e.customer), 1),
                  s("td", Vs, l(e.return_against || "—"), 1),
                  s("td", Rs, l(c(e.net_total)), 1),
                  s("td", As, l(c(e.total_tax)), 1),
                  s("td", Us, l(c(e.grand_total)), 1)
                ]))), 128)),
                h.value.length ? _("", !0) : (n(), o("tr", Ps, [...t[68] || (t[68] = [
                  s("td", {
                    colspan: "7",
                    class: "g1-empty"
                  }, "No credit notes against unregistered customers for this period", -1)
                ])]))
              ], 64))
            ])
          ])
        ])) : u.value === "hsn" ? (n(), o("div", Fs, [
          s("table", Es, [
            t[71] || (t[71] = s("thead", null, [
              s("tr", null, [
                s("th", null, "HSN / SAC Code"),
                s("th", { class: "ta-r" }, "No. of Invoices"),
                s("th", { class: "ta-r" }, "Taxable Value")
              ])
            ], -1)),
            s("tbody", null, [
              g.value ? (n(), o(v, { key: 0 }, p(4, (e) => s("tr", { key: e }, [...t[69] || (t[69] = [
                s("td", { colspan: "3" }, [
                  s("div", { class: "g1-shimmer" })
                ], -1)
              ])])), 64)) : (n(), o(v, { key: 1 }, [
                (n(!0), o(v, null, p(L.value, (e) => (n(), o("tr", {
                  key: e.hsn_code,
                  class: "g1-row"
                }, [
                  s("td", zs, [
                    s("span", {
                      class: x(["g1-code", e.hsn_code === "Not Set" ? "warn-code" : ""])
                    }, l(e.hsn_code), 3),
                    e.hsn_code === "Not Set" ? (n(), o("span", js, "Add HSN to items")) : _("", !0)
                  ]),
                  s("td", qs, l(e.invoice_count), 1),
                  s("td", Ks, l(c(e.taxable_value)), 1)
                ]))), 128)),
                h.value.length ? _("", !0) : (n(), o("tr", Ys, [...t[70] || (t[70] = [
                  s("td", {
                    colspan: "3",
                    class: "g1-empty"
                  }, "No HSN data — add HSN/SAC codes to your items", -1)
                ])]))
              ], 64))
            ])
          ])
        ])) : _("", !0),
        !g.value && W.value ? (n(), o("div", Os, [
          s("button", {
            class: "g1-btn-ghost g1-load-more-btn",
            onClick: Z
          }, " Load More (" + l(h.value.length - H.value) + " remaining) ", 1)
        ])) : _("", !0)
      ])) : (n(), o("div", Ws, [...t[72] || (t[72] = [
        nt('<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.3" data-v-167f3f45><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-167f3f45></path><polyline points="14 2 14 8 20 8" data-v-167f3f45></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-167f3f45></line><line x1="16" y1="17" x2="8" y2="17" data-v-167f3f45></line></svg><div class="g1-ph-title" data-v-167f3f45>Select a period and click Compute</div><div class="g1-ph-sub" data-v-167f3f45>GSTR-1 data will appear here</div>', 3)
      ])]))
    ]));
  }
}, te = /* @__PURE__ */ X(Zs, [["__scopeId", "data-v-167f3f45"]]);
export {
  te as default
};
