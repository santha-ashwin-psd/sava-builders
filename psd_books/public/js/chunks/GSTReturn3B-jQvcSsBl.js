import { _ as Z, x as U, h as N, o as z, c as i, a as s, w as j, v as Y, F as T, r as S, u as x, p as M, i as f, d as c, b as C, t as l, n as w, W as L, e as q, l as W, g as G, k as v } from "./main-BY2V3DRt.js";
import { f as _ } from "./format-BcJZDVG4.js";
const J = { class: "g3-page" }, Q = { class: "g3-toolbar" }, X = { class: "g3-controls" }, ss = ["value"], ts = ["disabled"], as = ["innerHTML"], ls = ["innerHTML"], os = ["disabled"], es = ["innerHTML"], ns = {
  key: 0,
  style: { "font-weight": "600" }
}, ds = { class: "g3-sum-strip" }, is = { class: "g3-sum-card" }, vs = {
  class: "g3-sum-val",
  style: { color: "#dc2626" }
}, us = { class: "g3-sum-card" }, cs = {
  class: "g3-sum-val",
  style: { color: "#16a34a" }
}, rs = { class: "g3-sum-card" }, ps = {
  key: 0,
  class: "g3-body-layout"
}, gs = { class: "g3-card" }, ms = { style: { padding: "16px" } }, _s = { class: "g3-card" }, bs = { style: { padding: "16px" } }, ys = {
  key: 1,
  class: "g3-body-layout"
}, ks = { class: "g3-left" }, Ts = { class: "g3-card" }, Ss = { class: "g3-card-hdr" }, xs = { class: "g3-meta-ct" }, hs = { class: "g3-table desktop-table" }, fs = { class: "g3-row" }, Cs = { class: "ta-r mono" }, ws = { class: "ta-r mono" }, Gs = { class: "ta-r mono" }, Is = { class: "ta-r mono" }, Bs = { class: "g3-total-row" }, Es = { class: "ta-r mono" }, Ns = { class: "ta-r mono red" }, Ls = { class: "ta-r mono red" }, Ds = { class: "ta-r mono red" }, Rs = { class: "mobile-cards" }, Ms = { class: "mob-supply-card" }, Ks = { class: "mob-kv-grid" }, Os = { class: "mob-kv-val mono" }, As = { class: "mob-kv-val mono" }, Fs = { class: "mob-kv-val mono" }, Hs = { class: "mob-kv-val mono" }, $s = { class: "mob-total-card" }, Vs = { class: "mob-kv-grid" }, Ps = { class: "mob-kv-val mono fw6" }, Zs = { class: "mob-kv-val mono fw6 red" }, Us = { class: "mob-kv-val mono fw6 red" }, zs = { class: "mob-kv-val mono fw6 red" }, js = {
  class: "g3-card",
  style: { "margin-top": "14px" }
}, Ys = { class: "g3-card-hdr" }, qs = { class: "g3-meta-ct" }, Ws = { class: "g3-table desktop-table" }, Js = { class: "g3-row" }, Qs = { class: "ta-r mono" }, Xs = { class: "ta-r mono" }, st = { class: "ta-r mono" }, tt = { class: "g3-total-row" }, at = { class: "ta-r mono green" }, lt = { class: "ta-r mono green" }, ot = { class: "ta-r mono green" }, et = { class: "mobile-cards" }, nt = { class: "mob-supply-card" }, dt = { class: "mob-kv-grid" }, it = { class: "mob-kv-val mono" }, vt = { class: "mob-kv-val mono" }, ut = { class: "mob-kv-val mono" }, ct = { class: "mob-total-card" }, rt = { class: "mob-kv-grid" }, pt = { class: "mob-kv-val mono fw6 green" }, gt = { class: "mob-kv-val mono fw6 green" }, mt = { class: "mob-kv-val mono fw6 green" }, _t = { class: "g3-right" }, bt = { class: "g3-card" }, yt = { class: "g3-summary" }, kt = { class: "g3-sum-row" }, Tt = { class: "g3-sum-amount red" }, St = { class: "g3-sum-row" }, xt = { class: "g3-sum-amount green" }, ht = { class: "g3-sum-row g3-sum-final" }, ft = {
  key: 0,
  class: "g3-refund-note"
}, Ct = ["innerHTML"], wt = {
  key: 0,
  class: "g3-card",
  style: { "margin-top": "14px" }
}, Gt = { class: "g3-table desktop-table g3-type-table" }, It = { class: "g3-type-badge" }, Bt = { class: "ta-r mono red" }, Et = { class: "ta-r mono green" }, Nt = { class: "mobile-cards" }, Lt = { class: "mob-supply-label" }, Dt = { class: "g3-type-badge" }, Rt = { class: "mob-kv-grid" }, Mt = { class: "mob-kv-val mono red" }, Kt = { class: "mob-kv-val mono green" }, Ot = {
  key: 2,
  class: "g3-placeholder"
}, At = {
  __name: "GSTReturn3B",
  setup(Ft) {
    const { toast: K } = U(), g = N(!1), a = N(null), I = /* @__PURE__ */ new Date();
    function O() {
      const d = [];
      for (let t = 0; t < 12; t++) {
        const e = new Date(I.getFullYear(), I.getMonth() - t, 1), p = `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}`, m = e.toLocaleString("en-US", { month: "long", year: "numeric" });
        d.push({ v: p, l: m });
      }
      return d;
    }
    const B = O(), r = N(B[0].v), A = G(() => {
      var d;
      return ((d = B.find((t) => t.v === r.value)) == null ? void 0 : d.l) || r.value;
    }), F = G(() => {
      const [d, t] = r.value.split("-");
      return new Date(+d, +t, 20).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }), D = G(() => {
      const [d, t] = r.value.split("-"), e = (new Date(+d, +t, 20) - I) / 864e5;
      return e >= 0 && e <= 7;
    }), u = G(() => a.value ? _(a.value.total_output) - _(a.value.total_itc) : 0);
    async function h() {
      var d, t;
      g.value = !0, a.value = null;
      try {
        const e = await q(), [p, m] = r.value.split("-"), E = `${p}-${m}-01`, $ = new Date(+p, +m, 0).getDate(), V = `${p}-${m}-${String($).padStart(2, "0")}`, n = await W("psd_books.db.queries.get_gstr_summary", { company: e, from_date: E, to_date: V }), b = (y, k) => {
          var R;
          return _((R = (y || []).find((P) => P.tax_type === k)) == null ? void 0 : R.amount);
        };
        a.value = {
          taxable_value: _(n == null ? void 0 : n.taxable_value),
          out_igst: b(n == null ? void 0 : n.output, "IGST"),
          out_cgst: b(n == null ? void 0 : n.output, "CGST"),
          out_sgst: b(n == null ? void 0 : n.output, "SGST"),
          itc_igst: b(n == null ? void 0 : n.itc, "IGST"),
          itc_cgst: b(n == null ? void 0 : n.itc, "CGST"),
          itc_sgst: b(n == null ? void 0 : n.itc, "SGST"),
          total_output: _((d = n == null ? void 0 : n.totals) == null ? void 0 : d.total_output),
          total_itc: _((t = n == null ? void 0 : n.totals) == null ? void 0 : t.total_itc),
          net_by_type: (n == null ? void 0 : n.net_by_type) || [],
          invoice_count: ((n == null ? void 0 : n.output) || []).reduce((y, k) => y + (k.invoice_count || 0), 0),
          itc_invoice_count: ((n == null ? void 0 : n.itc) || []).reduce((y, k) => y + (k.invoice_count || 0), 0)
        };
      } catch (e) {
        K.error(e.message || "Failed to compute GSTR-3B");
      } finally {
        g.value = !1;
      }
    }
    function H() {
      if (!a.value) return;
      const d = a.value, e = [
        ["GSTR-3B Summary", r.value],
        [],
        ["Section", "Description", "IGST", "CGST", "SGST"],
        ["3.1(a)", "Outward Taxable Supplies", d.out_igst, d.out_cgst, d.out_sgst],
        ["3.1(b)", "Zero Rated", 0, 0, 0],
        ["3.1(c)", "Nil/Exempted", 0, 0, 0],
        ["3.1(d)", "Reverse Charge", 0, 0, 0],
        [],
        ["4(A)", "ITC Available", d.itc_igst, d.itc_cgst, d.itc_sgst],
        ["4(B)", "ITC Reversed", 0, 0, 0],
        [],
        ["5.1", "Output Tax", d.total_output, "", ""],
        ["5.1", "Less ITC", d.total_itc, "", ""],
        ["5.1", "Net Tax Payable", u.value, "", ""]
      ].map((m) => m.map((E) => `"${String(E ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), p = document.createElement("a");
      p.href = "data:text/csv;charset=utf-8," + encodeURIComponent(e), p.download = `GSTR-3B_${r.value}.csv`, p.click();
    }
    function o(d) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(_(d));
    }
    return z(h), (d, t) => (v(), i("div", J, [
      s("div", Q, [
        t[2] || (t[2] = s("div", null, [
          s("div", { class: "g3-title" }, "GSTR-3B"),
          s("div", { class: "g3-sub" }, "Monthly Self-Declaration — Outward Supplies, ITC & Net Tax")
        ], -1)),
        s("div", X, [
          j(s("select", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => r.value = e),
            class: "g3-select",
            onChange: h
          }, [
            (v(!0), i(T, null, S(x(B), (e) => (v(), i("option", {
              key: e.v,
              value: e.v
            }, l(e.l), 9, ss))), 128))
          ], 544), [
            [Y, r.value]
          ]),
          s("button", {
            class: "g3-btn-ghost",
            onClick: h,
            disabled: g.value
          }, [
            s("span", {
              innerHTML: x(f)("refresh", 13),
              style: M(g.value ? "animation:spin 1s linear infinite;display:inline-flex" : "")
            }, null, 12, as)
          ], 8, ts),
          a.value ? (v(), i("button", {
            key: 0,
            class: "g3-btn-ghost",
            onClick: H
          }, [
            s("span", {
              innerHTML: x(f)("download", 13)
            }, null, 8, ls),
            t[1] || (t[1] = c(" CSV", -1))
          ])) : C("", !0),
          s("button", {
            class: "g3-btn-primary",
            onClick: h,
            disabled: g.value
          }, l(g.value ? "Computing…" : "Compute"), 9, os)
        ])
      ]),
      s("div", {
        class: w(["g3-deadline", D.value ? "due-warn" : "due-ok"])
      }, [
        s("span", {
          innerHTML: x(f)("calendar", 12)
        }, null, 8, es),
        t[3] || (t[3] = c(" GSTR-3B for ", -1)),
        s("strong", null, l(A.value), 1),
        t[4] || (t[4] = c(" — due ", -1)),
        s("strong", null, l(F.value), 1),
        D.value ? (v(), i("span", ns, " · deadline approaching")) : C("", !0)
      ], 2),
      s("div", ds, [
        s("div", is, [
          t[5] || (t[5] = s("div", { class: "g3-sum-lbl" }, "Output Tax Liability", -1)),
          s("div", vs, l(a.value ? o(a.value.total_output) : "—"), 1)
        ]),
        s("div", us, [
          t[6] || (t[6] = s("div", { class: "g3-sum-lbl" }, "Input Tax Credit (ITC)", -1)),
          s("div", cs, l(a.value ? o(a.value.total_itc) : "—"), 1)
        ]),
        s("div", rs, [
          t[7] || (t[7] = s("div", { class: "g3-sum-lbl" }, "Net Tax Payable", -1)),
          s("div", {
            class: "g3-sum-val",
            style: M(a.value ? u.value < 0 ? "color:#16a34a" : u.value === 0 ? "" : "color:#d97706" : "")
          }, l(a.value ? u.value < 0 ? "− " + o(-u.value) : o(u.value) : "—"), 5)
        ])
      ]),
      g.value ? (v(), i("div", ps, [
        s("div", gs, [
          s("div", ms, [
            (v(), i(T, null, S(6, (e) => s("div", {
              key: e,
              class: "g3-shimmer",
              style: { "margin-bottom": "10px" }
            })), 64))
          ])
        ]),
        s("div", _s, [
          s("div", bs, [
            (v(), i(T, null, S(4, (e) => s("div", {
              key: e,
              class: "g3-shimmer",
              style: { "margin-bottom": "10px" }
            })), 64))
          ])
        ])
      ])) : a.value ? (v(), i("div", ys, [
        s("div", ks, [
          s("div", Ts, [
            s("div", Ss, [
              t[8] || (t[8] = s("span", { class: "g3-card-title" }, "3.1 — Outward Supplies", -1)),
              s("span", xs, l(a.value.invoice_count) + " invoices", 1)
            ]),
            s("table", hs, [
              t[14] || (t[14] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Nature of Supply"),
                  s("th", { class: "ta-r" }, "Taxable"),
                  s("th", { class: "ta-r" }, "IGST"),
                  s("th", { class: "ta-r" }, "CGST"),
                  s("th", { class: "ta-r" }, "SGST")
                ])
              ], -1)),
              s("tbody", null, [
                s("tr", fs, [
                  t[9] || (t[9] = s("td", null, [
                    s("span", { class: "g3-sec" }, "(a)"),
                    c(" Taxable supplies")
                  ], -1)),
                  s("td", Cs, l(o(a.value.taxable_value)), 1),
                  s("td", ws, l(o(a.value.out_igst)), 1),
                  s("td", Gs, l(o(a.value.out_cgst)), 1),
                  s("td", Is, l(o(a.value.out_sgst)), 1)
                ]),
                t[11] || (t[11] = s("tr", { class: "g3-row muted-row" }, [
                  s("td", null, [
                    s("span", { class: "g3-sec" }, "(b)"),
                    c(" Zero rated — exports / SEZ")
                  ]),
                  s("td", { class: "ta-r mono" }, "KES 0.00"),
                  s("td", {
                    class: "ta-r mono",
                    colspan: "3",
                    style: { "text-align": "center" }
                  }, "—")
                ], -1)),
                t[12] || (t[12] = s("tr", { class: "g3-row muted-row" }, [
                  s("td", null, [
                    s("span", { class: "g3-sec" }, "(c)"),
                    c(" Nil rated / exempted")
                  ]),
                  s("td", { class: "ta-r mono" }, "KES 0.00"),
                  s("td", {
                    class: "ta-r mono",
                    colspan: "3",
                    style: { "text-align": "center" }
                  }, "—")
                ], -1)),
                t[13] || (t[13] = s("tr", { class: "g3-row muted-row" }, [
                  s("td", null, [
                    s("span", { class: "g3-sec" }, "(d)"),
                    c(" Inward — reverse charge")
                  ]),
                  s("td", { class: "ta-r mono" }, "KES 0.00"),
                  s("td", {
                    class: "ta-r mono",
                    colspan: "3",
                    style: { "text-align": "center" }
                  }, "—")
                ], -1)),
                s("tr", Bs, [
                  t[10] || (t[10] = s("td", null, [
                    s("strong", null, "Total Output Liability")
                  ], -1)),
                  s("td", Es, [
                    s("strong", null, l(o(a.value.taxable_value)), 1)
                  ]),
                  s("td", Ns, [
                    s("strong", null, l(o(a.value.out_igst)), 1)
                  ]),
                  s("td", Ls, [
                    s("strong", null, l(o(a.value.out_cgst)), 1)
                  ]),
                  s("td", Ds, [
                    s("strong", null, l(o(a.value.out_sgst)), 1)
                  ])
                ])
              ])
            ]),
            s("div", Rs, [
              s("div", Ms, [
                t[19] || (t[19] = s("div", { class: "mob-supply-label" }, [
                  s("span", { class: "g3-sec" }, "(a)"),
                  c(" Taxable supplies")
                ], -1)),
                s("div", Ks, [
                  t[15] || (t[15] = s("span", { class: "mob-kv-key" }, "Taxable", -1)),
                  s("span", Os, l(o(a.value.taxable_value)), 1),
                  t[16] || (t[16] = s("span", { class: "mob-kv-key" }, "IGST", -1)),
                  s("span", As, l(o(a.value.out_igst)), 1),
                  t[17] || (t[17] = s("span", { class: "mob-kv-key" }, "CGST", -1)),
                  s("span", Fs, l(o(a.value.out_cgst)), 1),
                  t[18] || (t[18] = s("span", { class: "mob-kv-key" }, "SGST", -1)),
                  s("span", Hs, l(o(a.value.out_sgst)), 1)
                ])
              ]),
              t[25] || (t[25] = L('<div class="mob-supply-card muted" data-v-e17a2052><div class="mob-supply-label" data-v-e17a2052><span class="g3-sec" data-v-e17a2052>(b)</span> Zero rated — exports / SEZ</div><div class="mob-kv-grid" data-v-e17a2052><span class="mob-kv-key" data-v-e17a2052>Taxable</span><span class="mob-kv-val mono" data-v-e17a2052>KES 0.00</span></div></div><div class="mob-supply-card muted" data-v-e17a2052><div class="mob-supply-label" data-v-e17a2052><span class="g3-sec" data-v-e17a2052>(c)</span> Nil rated / exempted</div><div class="mob-kv-grid" data-v-e17a2052><span class="mob-kv-key" data-v-e17a2052>Taxable</span><span class="mob-kv-val mono" data-v-e17a2052>KES 0.00</span></div></div><div class="mob-supply-card muted" data-v-e17a2052><div class="mob-supply-label" data-v-e17a2052><span class="g3-sec" data-v-e17a2052>(d)</span> Inward — reverse charge</div><div class="mob-kv-grid" data-v-e17a2052><span class="mob-kv-key" data-v-e17a2052>Taxable</span><span class="mob-kv-val mono" data-v-e17a2052>KES 0.00</span></div></div>', 3)),
              s("div", $s, [
                t[24] || (t[24] = s("div", { class: "mob-supply-label" }, [
                  s("strong", null, "Total Output Liability")
                ], -1)),
                s("div", Vs, [
                  t[20] || (t[20] = s("span", { class: "mob-kv-key" }, "Taxable", -1)),
                  s("span", Ps, l(o(a.value.taxable_value)), 1),
                  t[21] || (t[21] = s("span", { class: "mob-kv-key" }, "IGST", -1)),
                  s("span", Zs, l(o(a.value.out_igst)), 1),
                  t[22] || (t[22] = s("span", { class: "mob-kv-key" }, "CGST", -1)),
                  s("span", Us, l(o(a.value.out_cgst)), 1),
                  t[23] || (t[23] = s("span", { class: "mob-kv-key" }, "SGST", -1)),
                  s("span", zs, l(o(a.value.out_sgst)), 1)
                ])
              ])
            ])
          ]),
          s("div", js, [
            s("div", Ys, [
              t[26] || (t[26] = s("span", { class: "g3-card-title" }, "4 — Eligible ITC", -1)),
              s("span", qs, l(a.value.itc_invoice_count) + " purchases", 1)
            ]),
            s("table", Ws, [
              t[30] || (t[30] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Details"),
                  s("th", { class: "ta-r" }, "IGST"),
                  s("th", { class: "ta-r" }, "CGST"),
                  s("th", { class: "ta-r" }, "SGST")
                ])
              ], -1)),
              s("tbody", null, [
                s("tr", Js, [
                  t[27] || (t[27] = s("td", null, [
                    s("span", { class: "g3-sec" }, "(A)"),
                    c(" All other ITC — B2B purchases")
                  ], -1)),
                  s("td", Qs, l(o(a.value.itc_igst)), 1),
                  s("td", Xs, l(o(a.value.itc_cgst)), 1),
                  s("td", st, l(o(a.value.itc_sgst)), 1)
                ]),
                t[29] || (t[29] = s("tr", { class: "g3-row muted-row" }, [
                  s("td", null, [
                    s("span", { class: "g3-sec" }, "(B)"),
                    c(" ITC Reversed — rule 42/43")
                  ]),
                  s("td", { class: "ta-r mono" }, "KES 0.00"),
                  s("td", { class: "ta-r mono" }, "KES 0.00"),
                  s("td", { class: "ta-r mono" }, "KES 0.00")
                ], -1)),
                s("tr", tt, [
                  t[28] || (t[28] = s("td", null, [
                    s("strong", null, "Net ITC Available")
                  ], -1)),
                  s("td", at, [
                    s("strong", null, l(o(a.value.itc_igst)), 1)
                  ]),
                  s("td", lt, [
                    s("strong", null, l(o(a.value.itc_cgst)), 1)
                  ]),
                  s("td", ot, [
                    s("strong", null, l(o(a.value.itc_sgst)), 1)
                  ])
                ])
              ])
            ]),
            s("div", et, [
              s("div", nt, [
                t[34] || (t[34] = s("div", { class: "mob-supply-label" }, [
                  s("span", { class: "g3-sec" }, "(A)"),
                  c(" All other ITC — B2B purchases")
                ], -1)),
                s("div", dt, [
                  t[31] || (t[31] = s("span", { class: "mob-kv-key" }, "IGST", -1)),
                  s("span", it, l(o(a.value.itc_igst)), 1),
                  t[32] || (t[32] = s("span", { class: "mob-kv-key" }, "CGST", -1)),
                  s("span", vt, l(o(a.value.itc_cgst)), 1),
                  t[33] || (t[33] = s("span", { class: "mob-kv-key" }, "SGST", -1)),
                  s("span", ut, l(o(a.value.itc_sgst)), 1)
                ])
              ]),
              t[39] || (t[39] = L('<div class="mob-supply-card muted" data-v-e17a2052><div class="mob-supply-label" data-v-e17a2052><span class="g3-sec" data-v-e17a2052>(B)</span> ITC Reversed — rule 42/43</div><div class="mob-kv-grid" data-v-e17a2052><span class="mob-kv-key" data-v-e17a2052>IGST</span><span class="mob-kv-val mono" data-v-e17a2052>KES 0.00</span><span class="mob-kv-key" data-v-e17a2052>CGST</span><span class="mob-kv-val mono" data-v-e17a2052>KES 0.00</span><span class="mob-kv-key" data-v-e17a2052>SGST</span><span class="mob-kv-val mono" data-v-e17a2052>KES 0.00</span></div></div>', 1)),
              s("div", ct, [
                t[38] || (t[38] = s("div", { class: "mob-supply-label" }, [
                  s("strong", null, "Net ITC Available")
                ], -1)),
                s("div", rt, [
                  t[35] || (t[35] = s("span", { class: "mob-kv-key" }, "IGST", -1)),
                  s("span", pt, l(o(a.value.itc_igst)), 1),
                  t[36] || (t[36] = s("span", { class: "mob-kv-key" }, "CGST", -1)),
                  s("span", gt, l(o(a.value.itc_cgst)), 1),
                  t[37] || (t[37] = s("span", { class: "mob-kv-key" }, "SGST", -1)),
                  s("span", mt, l(o(a.value.itc_sgst)), 1)
                ])
              ])
            ])
          ])
        ]),
        s("div", _t, [
          s("div", bt, [
            t[45] || (t[45] = s("div", { class: "g3-card-hdr" }, [
              s("span", { class: "g3-card-title" }, "5.1 — Net Tax Payable")
            ], -1)),
            s("div", yt, [
              s("div", kt, [
                t[40] || (t[40] = s("span", { class: "g3-sum-label" }, "Total Output Tax", -1)),
                s("span", Tt, l(o(a.value.total_output)), 1)
              ]),
              s("div", St, [
                t[41] || (t[41] = s("span", { class: "g3-sum-label" }, "Less: ITC Available", -1)),
                s("span", xt, "− " + l(o(a.value.total_itc)), 1)
              ]),
              t[44] || (t[44] = s("div", { class: "g3-sum-divider" }, null, -1)),
              s("div", ht, [
                t[42] || (t[42] = s("span", { class: "g3-sum-label-lg" }, "Net Tax Payable", -1)),
                s("span", {
                  class: w(["g3-sum-amount-lg", u.value < 0 ? "green" : u.value === 0 ? "" : "amber"])
                }, l(u.value < 0 ? "− " + o(-u.value) : o(u.value)), 3)
              ]),
              u.value < 0 ? (v(), i("div", ft, [
                s("span", {
                  innerHTML: x(f)("info", 12)
                }, null, 8, Ct),
                t[43] || (t[43] = c(" ITC exceeds output — refund eligible (Form RFD-01) ", -1))
              ])) : C("", !0)
            ])
          ]),
          a.value.net_by_type && a.value.net_by_type.length ? (v(), i("div", wt, [
            t[51] || (t[51] = s("div", { class: "g3-card-hdr" }, [
              s("span", { class: "g3-card-title" }, "Tax Type Breakdown")
            ], -1)),
            s("table", Gt, [
              t[46] || (t[46] = s("colgroup", null, [
                s("col", { style: { width: "22%" } }),
                s("col", { style: { width: "26%" } }),
                s("col", { style: { width: "26%" } }),
                s("col", { style: { width: "26%" } })
              ], -1)),
              t[47] || (t[47] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Type"),
                  s("th", { class: "ta-r" }, "Output"),
                  s("th", { class: "ta-r" }, "ITC"),
                  s("th", { class: "ta-r" }, "Net")
                ])
              ], -1)),
              s("tbody", null, [
                (v(!0), i(T, null, S(a.value.net_by_type, (e) => (v(), i("tr", {
                  key: e.tax_type,
                  class: "g3-row"
                }, [
                  s("td", null, [
                    s("span", It, l(e.tax_type || "—"), 1)
                  ]),
                  s("td", Bt, l(o(e.output)), 1),
                  s("td", Et, l(o(e.itc)), 1),
                  s("td", {
                    class: w(["ta-r mono fw6", e.net < 0 ? "green" : e.net === 0 ? "" : "amber"])
                  }, l(e.net < 0 ? "− " + o(-e.net) : o(e.net)), 3)
                ]))), 128))
              ])
            ]),
            s("div", Nt, [
              (v(!0), i(T, null, S(a.value.net_by_type, (e) => (v(), i("div", {
                key: e.tax_type,
                class: "mob-supply-card"
              }, [
                s("div", Lt, [
                  s("span", Dt, l(e.tax_type || "—"), 1)
                ]),
                s("div", Rt, [
                  t[48] || (t[48] = s("span", { class: "mob-kv-key" }, "Output", -1)),
                  s("span", Mt, l(o(e.output)), 1),
                  t[49] || (t[49] = s("span", { class: "mob-kv-key" }, "ITC", -1)),
                  s("span", Kt, l(o(e.itc)), 1),
                  t[50] || (t[50] = s("span", { class: "mob-kv-key" }, "Net", -1)),
                  s("span", {
                    class: w(["mob-kv-val mono fw6", e.net < 0 ? "green" : e.net === 0 ? "" : "amber"])
                  }, l(e.net < 0 ? "− " + o(-e.net) : o(e.net)), 3)
                ])
              ]))), 128))
            ])
          ])) : C("", !0)
        ])
      ])) : (v(), i("div", Ot, [...t[52] || (t[52] = [
        L('<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.3" data-v-e17a2052><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-e17a2052></path><polyline points="14 2 14 8 20 8" data-v-e17a2052></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-e17a2052></line><line x1="16" y1="17" x2="8" y2="17" data-v-e17a2052></line></svg><div class="g3-ph-title" data-v-e17a2052>Select a period and click Compute</div><div class="g3-ph-sub" data-v-e17a2052>GSTR-3B data will appear here</div>', 3)
      ])]))
    ]));
  }
}, Vt = /* @__PURE__ */ Z(At, [["__scopeId", "data-v-e17a2052"]]);
export {
  Vt as default
};
