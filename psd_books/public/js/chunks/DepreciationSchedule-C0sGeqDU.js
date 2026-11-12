import { _ as ue, k as o, c as i, W as ge, F as $, r as A, t as n, a as e, u as r, g as M, x as fe, o as we, i as B, d as L, w as oe, A as xe, n as I, v as Ce, b as J, D as ie, f as re, h as D, j as Le, q as Me, aa as Te } from "./main-CULz3kda.js";
import { f as W, a as b, b as Ve } from "./format-BcJZDVG4.js";
import { P as De } from "./Pagination-Cxk1YoNH.js";
function de(v, p) {
  if (!v) return "";
  const d = new Date(v);
  return isNaN(d.getTime()) ? "" : (d.setFullYear(d.getFullYear() + p), d.toISOString().slice(0, 10));
}
function Se(v) {
  if (!v) return 0;
  const p = new Date(v);
  if (isNaN(p.getTime())) return 0;
  const d = /* @__PURE__ */ new Date();
  let f = d.getFullYear() - p.getFullYear();
  const k = d.getMonth() - p.getMonth();
  return (k < 0 || k === 0 && d.getDate() < p.getDate()) && (f -= 1), f;
}
function He(v) {
  const p = W(v.purchase_cost), d = W(v.salvage_value), f = parseInt(v.useful_life) || 0, k = v.depreciation_method || "Straight Line";
  if (!p || !f) return [];
  const y = [];
  let _ = p, h = 0;
  if (k === "Written Down Value" && d > 0 && d < p) {
    const T = 1 - Math.pow(d / p, 1 / f);
    for (let w = 1; w <= f; w++) {
      let C = _ * T, c = _ - C;
      c < d && (c = d, C = _ - d), h += C, y.push({
        year: w,
        depreciation_date: de(v.purchase_date, w),
        opening_value: U(_),
        depreciation_amount: U(C),
        accumulated_value: U(h),
        closing_value: U(c),
        status: "Pending"
      }), _ = c;
    }
  } else {
    const T = (p - d) / f;
    for (let w = 1; w <= f; w++) {
      let C = _ - T;
      C < d && (C = d), h += T, y.push({
        year: w,
        depreciation_date: de(v.purchase_date, w),
        opening_value: U(_),
        depreciation_amount: U(T),
        accumulated_value: U(h),
        closing_value: U(C),
        status: "Pending"
      }), _ = C;
    }
  }
  return y;
}
function U(v) {
  return Math.round((v + Number.EPSILON) * 100) / 100;
}
function $e(v, p) {
  var w;
  const d = W(v.purchase_cost), f = W(v.salvage_value), k = parseInt(v.useful_life) || 0;
  if (!d || !k)
    return { cost: 0, salvage: 0, annual: 0, totalDep: 0, toDate: 0, bookValue: d, life: 0 };
  const y = p.reduce((C, c) => C + W(c.depreciation_amount), 0), _ = v.depreciation_method === "Written Down Value" ? ((w = p[0]) == null ? void 0 : w.depreciation_amount) || 0 : (d - f) / k, h = Math.min(Math.max(Se(v.purchase_date), 0), k), T = v.depreciation_method === "Written Down Value" ? p.slice(0, h).reduce((C, c) => C + W(c.depreciation_amount), 0) : _ * h;
  return {
    cost: d,
    salvage: f,
    annual: _,
    totalDep: y,
    toDate: U(T),
    bookValue: U(d - T),
    life: k
  };
}
const Ae = { class: "dep-chart" }, Ne = ["viewBox"], Be = ["x2", "y1", "y2"], Re = ["x", "y"], ze = ["x", "y"], Ue = ["x", "y", "width", "height"], je = ["points"], Fe = ["cx", "cy"], Q = 640, ee = 260, E = 56, se = 16, Ye = 16, ce = 34, Oe = {
  __name: "DepreciationChart",
  props: {
    rows: { type: Array, default: () => [] }
  },
  setup(v) {
    const p = v, d = ee - ce, f = Ye, k = M(() => {
      let c = 0;
      for (const x of p.rows)
        c = Math.max(c, Number(x.depreciation_amount) || 0, Number(x.closing_value) || 0);
      return c || 1;
    }), y = (c) => {
      const x = (Number(c) || 0) / k.value;
      return d - x * (d - f);
    }, _ = M(() => {
      const x = [];
      for (let u = 0; u <= 4; u++) {
        const g = k.value / 4 * u;
        x.push({ y: y(g), label: b(g) });
      }
      return x;
    }), h = M(() => {
      const c = p.rows.length || 1, u = (Q - E - se) / c;
      return p.rows.map((g, R) => E + u * (R + 0.5));
    }), T = M(() => {
      const c = p.rows.length || 1, x = (Q - E - se) / c;
      return Math.max(6, Math.min(36, x * 0.5));
    }), w = M(() => p.rows.map((c) => "Y" + c.year)), C = M(
      () => p.rows.map((c, x) => `${h.value[x]},${y(c.closing_value)}`).join(" ")
    );
    return (c, x) => (o(), i("div", Ae, [
      x[0] || (x[0] = ge('<div class="dep-chart-legend" data-v-84c8babf><span class="dep-legend-item" data-v-84c8babf><span class="dep-legend-swatch swatch-bar" data-v-84c8babf></span>Depreciation</span><span class="dep-legend-item" data-v-84c8babf><span class="dep-legend-swatch swatch-line" data-v-84c8babf></span>Book Value (WDV)</span></div>', 1)),
      (o(), i("svg", {
        viewBox: `0 0 ${Q} ${ee}`,
        class: "dep-svg",
        preserveAspectRatio: "xMidYMid meet"
      }, [
        (o(!0), i($, null, A(_.value, (u) => (o(), i("line", {
          key: "g" + u.y,
          x1: E,
          x2: Q - se,
          y1: u.y,
          y2: u.y,
          class: "dep-grid"
        }, null, 8, Be))), 128)),
        (o(!0), i($, null, A(_.value, (u) => (o(), i("text", {
          key: "gl" + u.y,
          x: E - 8,
          y: u.y + 4,
          class: "dep-axis-label dep-axis-y"
        }, n(u.label), 9, Re))), 128)),
        (o(!0), i($, null, A(w.value, (u, g) => (o(), i("text", {
          key: "x" + g,
          x: h.value[g],
          y: ee - ce + 18,
          class: "dep-axis-label dep-axis-x"
        }, n(u), 9, ze))), 128)),
        (o(!0), i($, null, A(v.rows, (u, g) => (o(), i("rect", {
          key: "b" + g,
          x: h.value[g] - T.value / 2,
          y: y(u.depreciation_amount),
          width: T.value,
          height: Math.max(0, d - y(u.depreciation_amount)),
          rx: "3",
          class: "dep-bar"
        }, [
          e("title", null, n("Year " + u.year + " — Depreciation " + r(b)(u.depreciation_amount)), 1)
        ], 8, Ue))), 128)),
        e("polyline", {
          points: C.value,
          class: "dep-line",
          fill: "none"
        }, null, 8, je),
        (o(!0), i($, null, A(v.rows, (u, g) => (o(), i("circle", {
          key: "c" + g,
          cx: h.value[g],
          cy: y(u.closing_value),
          r: "3.5",
          class: "dep-dot"
        }, [
          e("title", null, n("Year " + u.year + " — Book Value " + r(b)(u.closing_value)), 1)
        ], 8, Fe))), 128))
      ], 8, Ne))
    ]));
  }
}, Pe = /* @__PURE__ */ ue(Oe, [["__scopeId", "data-v-84c8babf"]]), Ie = { class: "list-page" }, We = { class: "ds-header" }, Ee = { class: "ds-header-right" }, qe = ["disabled"], Ke = ["innerHTML"], Ge = ["disabled"], Je = ["innerHTML"], Qe = { class: "bk-kpi-grid bk-kpi-grid-4" }, Xe = { class: "bk-kpi-card bk-kpi-accent" }, Ze = { class: "bk-kpi-inner" }, es = {
  class: "bk-kpi-icon",
  style: { background: "#dbeafe" }
}, ss = ["innerHTML"], ts = { class: "bk-kpi-body" }, as = { class: "bk-kpi-value" }, ns = { class: "bk-kpi-trend bk-trend-neutral" }, ls = { class: "bk-kpi-card" }, os = { class: "bk-kpi-inner" }, is = {
  class: "bk-kpi-icon",
  style: { background: "#dcfce7" }
}, rs = ["innerHTML"], ds = { class: "bk-kpi-body" }, cs = {
  class: "bk-kpi-value bk-kpi-green",
  style: { "font-size": "20px" }
}, us = { class: "bk-kpi-card bk-kpi-warn" }, vs = { class: "bk-kpi-inner" }, ps = {
  class: "bk-kpi-icon",
  style: { background: "#fef3c7" }
}, _s = ["innerHTML"], ms = { class: "bk-kpi-body" }, bs = {
  class: "bk-kpi-value bk-kpi-amber",
  style: { "font-size": "20px" }
}, hs = { class: "bk-kpi-card" }, ks = { class: "bk-kpi-inner" }, ys = {
  class: "bk-kpi-icon",
  style: { background: "#dbeafe" }
}, gs = ["innerHTML"], fs = { class: "bk-kpi-body" }, ws = {
  class: "bk-kpi-value bk-kpi-blue",
  style: { "font-size": "20px" }
}, xs = { class: "sales-toolbar" }, Cs = { class: "sales-search" }, Ls = ["innerHTML"], Ms = { class: "sales-pills" }, Ts = { class: "sales-pill-count" }, Vs = ["onClick"], Ds = { class: "sales-pill-count" }, Ss = { class: "sales-actions" }, Hs = ["value"], $s = { class: "inv-table-wrap" }, As = { class: "inv-table ds-desktop-tbl" }, Ns = ["innerHTML"], Bs = ["innerHTML"], Rs = ["innerHTML"], zs = ["innerHTML"], Us = ["innerHTML"], js = ["innerHTML"], Fs = ["innerHTML"], Ys = { key: 1 }, Os = {
  colspan: "8",
  class: "bk-empty-state"
}, Ps = { class: "bk-empty-inner" }, Is = { class: "bk-empty-title" }, Ws = {
  key: 0,
  class: "bk-empty-sub"
}, Es = {
  key: 1,
  class: "bk-empty-sub"
}, qs = ["onClick"], Ks = { class: "inv-link" }, Gs = { class: "asset-code" }, Js = ["onClick"], Qs = {
  key: 0,
  class: "it-group-badge"
}, Xs = {
  key: 1,
  class: "text-muted"
}, Zs = ["onClick"], et = ["onClick"], st = ["onClick"], tt = ["onClick"], at = ["onClick"], nt = ["onClick", "title"], lt = ["innerHTML"], ot = { class: "ds-mobile-cards" }, it = {
  key: 1,
  class: "ds-mobile-empty"
}, rt = ["onClick"], dt = { class: "ii-mob-card-main" }, ct = { class: "ii-mob-card-top" }, ut = {
  class: "fw-700",
  style: { "font-size": "14px", color: "#111827", "line-height": "1.3" }
}, vt = { class: "ii-mob-card-meta" }, pt = {
  class: "inv-link",
  style: { "font-size": "11.5px" }
}, _t = {
  key: 0,
  class: "it-group-badge",
  style: { "font-size": "10.5px" }
}, mt = { class: "ii-mob-card-right" }, bt = {
  class: "fw-700",
  style: { "font-size": "14px", color: "#2563eb" }
}, ht = {
  class: "text-muted",
  style: { "font-size": "11px" }
}, kt = {
  key: 0,
  class: "list-pagination",
  style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "12px", "flex-wrap": "wrap" }
}, yt = { class: "dp-footer-info" }, gt = { class: "ds-panel-head" }, ft = { class: "ds-panel-title" }, wt = { class: "ds-panel-sub" }, xt = { class: "ds-panel-actions" }, Ct = ["innerHTML"], Lt = ["innerHTML"], Mt = ["innerHTML"], Tt = { class: "ds-summary-grid" }, Vt = { class: "ds-summary-card" }, Dt = { class: "ds-sc-value" }, St = { class: "ds-summary-card" }, Ht = { class: "ds-sc-value" }, $t = { class: "ds-summary-card" }, At = {
  class: "ds-sc-value",
  style: { color: "#92400e" }
}, Nt = { class: "ds-summary-card" }, Bt = {
  class: "ds-sc-value",
  style: { color: "#92400e" }
}, Rt = { class: "ds-summary-card ds-sc-accent" }, zt = {
  class: "ds-sc-value",
  style: { color: "#2563eb" }
}, Ut = { class: "ds-summary-card" }, jt = {
  class: "ds-sc-value",
  style: { color: "#16a34a" }
}, Ft = { class: "ds-panel-section" }, Yt = { class: "ds-panel-section" }, Ot = { class: "ds-section-title" }, Pt = { class: "inv-table-wrap" }, It = { class: "inv-table ds-schedule-tbl" }, Wt = { class: "fw-600" }, Et = { class: "mono-sm text-muted" }, qt = { class: "ta-r mono-sm" }, Kt = { class: "ta-r mono-sm fw-600" }, Gt = { class: "ta-r mono-sm text-muted" }, Jt = {
  class: "ta-r mono-sm fw-600",
  style: { color: "#2563eb" }
}, Qt = { class: "inv-status-badge status-draft" }, Xt = {
  __name: "DepreciationSchedule",
  setup(v) {
    const p = Le(), d = fe(), f = D([]), k = D(!1), y = D(""), _ = D("all"), h = D(""), T = D([]), w = D([]), C = M(() => {
      const a = {};
      for (const s of w.value) a[s.name] = s.category_name || s.name;
      return a;
    });
    function c(a) {
      return a ? C.value[a] || a : "";
    }
    const x = ["Straight Line", "Written Down Value"], u = D(1), g = D(20), R = D(null), te = D(null), N = M(
      () => f.value.filter((a) => parseFloat(a.purchase_cost) > 0 && parseInt(a.useful_life) > 0).map((a) => {
        const s = He(a), t = $e(a, s);
        return { ...a, _rows: s, _summary: t };
      })
    ), ve = M(() => {
      const a = {};
      for (const s of x) a[s] = 0;
      for (const s of N.value)
        a[s.depreciation_method] !== void 0 && a[s.depreciation_method]++;
      return a;
    }), X = M(() => {
      N.value.reduce((t, l) => t + l._summary.cost - l._summary.salvage, 0);
      const a = N.value.reduce((t, l) => t + l._summary.toDate, 0), s = N.value.reduce((t, l) => t + l._summary.bookValue, 0);
      return { cost: N.value.reduce((t, l) => t + l._summary.cost, 0), toDate: a, bookValue: s };
    }), q = D("asset_name"), K = D(1);
    function O(a) {
      q.value === a ? K.value *= -1 : (q.value = a, K.value = 1);
    }
    function P(a) {
      return q.value !== a ? "" : K.value === 1 ? "&#9650;" : "&#9660;";
    }
    const Y = M(() => {
      let a = N.value;
      if (_.value !== "all" && (a = a.filter((l) => l.depreciation_method === _.value)), h.value && (a = a.filter((l) => l.asset_category === h.value)), y.value) {
        const l = y.value.toLowerCase();
        a = a.filter(
          (H) => (H.asset_name || "").toLowerCase().includes(l) || (H.name || "").toLowerCase().includes(l) || (H.asset_category || "").toLowerCase().includes(l)
        );
      }
      const s = q.value, t = K.value;
      return [...a].sort((l, H) => {
        let V = l[s], m = H[s];
        return s === "annual" && (V = l._summary.annual, m = H._summary.annual), s === "bookValue" && (V = l._summary.bookValue, m = H._summary.bookValue), V = V ?? "", m = m ?? "", typeof V == "number" || typeof m == "number" ? ((parseFloat(V) || 0) - (parseFloat(m) || 0)) * t : String(V).localeCompare(String(m), void 0, { numeric: !0 }) * t;
      });
    }), ae = M(() => {
      const a = (u.value - 1) * g.value;
      return Y.value.slice(a, a + g.value);
    }), pe = M(() => Y.value.length === 0 ? 0 : (u.value - 1) * g.value + 1), _e = M(() => Math.min(Y.value.length, u.value * g.value)), S = M(() => N.value.find((a) => a.name === R.value) || null), z = M(() => S.value ? { ...S.value, rows: S.value._rows, _summary: S.value._summary } : null);
    function ne(a) {
      return a === "Written Down Value" ? "ds-method-wdv" : "ds-method-sl";
    }
    function j(a) {
      if (R.value === a.name) {
        R.value = null;
        return;
      }
      R.value = a.name, Te(() => {
        var s;
        return (s = te.value) == null ? void 0 : s.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    function me(a) {
      p.push({ name: "asset-details", params: { id: a.name } });
    }
    function be(a, s, t) {
      const l = ["Year", "Date", "Opening Value", "Depreciation", "Accumulated", "Closing Value", "Status"], H = a.map((F) => [F.year, F.depreciation_date || "", F.opening_value || 0, F.depreciation_amount || 0, F.accumulated_value || 0, F.closing_value || 0, F.status || "Pending"]), V = [l, ...H].map((F) => F.map((ye) => `"${String(ye ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), m = new Blob([V], { type: "text/csv;charset=utf-8;" }), G = URL.createObjectURL(m), Z = document.createElement("a");
      Z.href = G, Z.download = t, Z.click(), URL.revokeObjectURL(G);
    }
    function he(a) {
      be(a._rows, a.name, `depreciation-${a.name}.csv`);
    }
    function ke() {
      const a = ["Asset", "Category", "Method", "Cost", "Salvage", "Useful Life", "Annual Depreciation", "Accumulated to Date", "Book Value"], s = N.value.map((m) => [
        m.asset_name || m.name,
        c(m.asset_category),
        m.depreciation_method || "",
        m._summary.cost,
        m._summary.salvage,
        m._summary.life,
        m._summary.annual,
        m._summary.toDate,
        m._summary.bookValue
      ]), t = [a, ...s].map((m) => m.map((G) => `"${String(G ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), l = new Blob([t], { type: "text/csv;charset=utf-8;" }), H = URL.createObjectURL(l), V = document.createElement("a");
      V.href = H, V.download = "depreciation-schedules.csv", V.click(), URL.revokeObjectURL(H);
    }
    async function le() {
      k.value = !0;
      try {
        const [a, s] = await Promise.all([
          re("Asset", {
            fields: [
              "name",
              "asset_name",
              "asset_category",
              "status",
              "purchase_cost",
              "salvage_value",
              "useful_life",
              "depreciation_method",
              "purchase_date",
              "current_value"
            ],
            order: "asset_name asc",
            limit: 500
          }),
          re("Asset Category", { fields: ["name", "category_name"], order: "category_name asc", limit: 500 })
        ]);
        f.value = a || [], w.value = s || [], T.value = Array.from(new Set((a || []).map((t) => t.asset_category).filter(Boolean))).sort();
      } catch (a) {
        d.error("Failed to load assets: " + a.message), f.value = [], T.value = [], w.value = [];
      } finally {
        k.value = !1;
      }
    }
    return we(le), (a, s) => (o(), i("div", Ie, [
      e("div", We, [
        s[18] || (s[18] = e("div", { class: "ds-header-left" }, [
          e("h1", { class: "ds-title" }, "Depreciation Schedules"),
          e("p", { class: "ds-subtitle" }, "Projected depreciation for every depreciable asset, by method and useful life")
        ], -1)),
        e("div", Ee, [
          e("button", {
            class: "sales-btn-ghost",
            title: "Refresh",
            onClick: le,
            disabled: k.value
          }, [
            e("span", {
              innerHTML: r(B)("refresh", 14)
            }, null, 8, Ke)
          ], 8, qe),
          e("button", {
            class: "sales-btn-ghost",
            onClick: ke,
            disabled: !N.value.length
          }, [
            e("span", {
              innerHTML: r(B)("download", 14)
            }, null, 8, Je),
            s[16] || (s[16] = L()),
            s[17] || (s[17] = e("span", { class: "btn-label" }, "CSV", -1))
          ], 8, Ge)
        ])
      ]),
      e("div", Qe, [
        e("div", Xe, [
          e("div", Ze, [
            e("div", es, [
              e("span", {
                innerHTML: r(B)("box", 22)
              }, null, 8, ss)
            ]),
            e("div", ts, [
              s[19] || (s[19] = e("div", { class: "bk-kpi-label" }, "Depreciable Assets", -1)),
              e("div", as, n(N.value.length), 1),
              e("div", ns, "of " + n(f.value.length) + " total", 1)
            ])
          ])
        ]),
        e("div", ls, [
          e("div", os, [
            e("div", is, [
              e("span", {
                innerHTML: r(B)("rupee", 22)
              }, null, 8, rs)
            ]),
            e("div", ds, [
              s[20] || (s[20] = e("div", { class: "bk-kpi-label" }, "Depreciable Value", -1)),
              e("div", cs, n(r(b)(X.value.cost)), 1),
              s[21] || (s[21] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "cost − salvage", -1))
            ])
          ])
        ]),
        e("div", us, [
          e("div", vs, [
            e("div", ps, [
              e("span", {
                innerHTML: r(B)("trend", 22)
              }, null, 8, _s)
            ]),
            e("div", ms, [
              s[22] || (s[22] = e("div", { class: "bk-kpi-label" }, "Accumulated to Date", -1)),
              e("div", bs, n(r(b)(X.value.toDate)), 1),
              s[23] || (s[23] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "booked so far", -1))
            ])
          ])
        ]),
        e("div", hs, [
          e("div", ks, [
            e("div", ys, [
              e("span", {
                innerHTML: r(B)("percent", 22)
              }, null, 8, gs)
            ]),
            e("div", fs, [
              s[24] || (s[24] = e("div", { class: "bk-kpi-label" }, "Current Book Value", -1)),
              e("div", ws, n(r(b)(X.value.bookValue)), 1),
              s[25] || (s[25] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "net of depreciation", -1))
            ])
          ])
        ])
      ]),
      e("div", xs, [
        e("div", Cs, [
          e("span", {
            innerHTML: r(B)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Ls),
          oe(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (t) => y.value = t),
            placeholder: "Search assets...",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [xe, y.value]
          ])
        ]),
        e("div", Ms, [
          e("button", {
            class: I(["sales-pill", { active: _.value === "all" }]),
            onClick: s[1] || (s[1] = (t) => _.value = "all")
          }, [
            s[26] || (s[26] = L(" All ", -1)),
            e("span", Ts, n(N.value.length), 1)
          ], 2),
          (o(), i($, null, A(x, (t) => e("button", {
            key: t,
            class: I(["sales-pill", { active: _.value === t }]),
            onClick: (l) => _.value = t
          }, [
            L(n(t) + " ", 1),
            e("span", Ds, n(ve.value[t] || 0), 1)
          ], 10, Vs)), 64))
        ]),
        e("div", Ss, [
          oe(e("select", {
            class: "sales-select",
            "onUpdate:modelValue": s[2] || (s[2] = (t) => h.value = t),
            title: "Filter by category"
          }, [
            s[27] || (s[27] = e("option", { value: "" }, "All Categories", -1)),
            (o(!0), i($, null, A(T.value, (t) => (o(), i("option", {
              key: t,
              value: t
            }, n(c(t)), 9, Hs))), 128))
          ], 512), [
            [Ce, h.value]
          ])
        ])
      ]),
      e("div", $s, [
        e("table", As, [
          e("thead", null, [
            e("tr", null, [
              e("th", {
                class: "sortable",
                onClick: s[3] || (s[3] = (t) => O("asset_name"))
              }, [
                s[28] || (s[28] = e("span", { class: "dp-th-content" }, "Asset", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("asset_name")
                }, null, 8, Ns)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[4] || (s[4] = (t) => O("asset_category"))
              }, [
                s[29] || (s[29] = L("Category ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("asset_category")
                }, null, 8, Bs)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[5] || (s[5] = (t) => O("depreciation_method"))
              }, [
                s[30] || (s[30] = L("Method ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("depreciation_method")
                }, null, 8, Rs)
              ]),
              e("th", {
                class: "ta-r sortable",
                onClick: s[6] || (s[6] = (t) => O("purchase_cost"))
              }, [
                s[31] || (s[31] = L("Cost ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("purchase_cost")
                }, null, 8, zs)
              ]),
              e("th", {
                class: "ta-r sortable",
                onClick: s[7] || (s[7] = (t) => O("useful_life"))
              }, [
                s[32] || (s[32] = L("Life (Yrs) ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("useful_life")
                }, null, 8, Us)
              ]),
              e("th", {
                class: "ta-r sortable",
                onClick: s[8] || (s[8] = (t) => O("annual"))
              }, [
                s[33] || (s[33] = L("Annual Dep. ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("annual")
                }, null, 8, js)
              ]),
              e("th", {
                class: "ta-r sortable",
                onClick: s[9] || (s[9] = (t) => O("bookValue"))
              }, [
                s[34] || (s[34] = L("Book Value ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: P("bookValue")
                }, null, 8, Fs)
              ]),
              s[35] || (s[35] = e("th", { style: { width: "120px", "text-align": "center" } }, "Schedule", -1))
            ])
          ]),
          e("tbody", null, [
            k.value ? (o(), i($, { key: 0 }, A(5, (t) => e("tr", {
              key: t,
              class: "shimmer-row"
            }, [...s[36] || (s[36] = [
              e("td", { colspan: "8" }, [
                e("div", {
                  class: "shimmer",
                  style: { width: "70%" }
                })
              ], -1)
            ])])), 64)) : Y.value.length ? J("", !0) : (o(), i("tr", Ys, [
              e("td", Os, [
                e("div", Ps, [
                  s[37] || (s[37] = e("svg", {
                    width: "44",
                    height: "44",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#cbd5e1",
                    "stroke-width": "1.3"
                  }, [
                    e("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    e("line", {
                      x1: "12",
                      y1: "8",
                      x2: "12",
                      y2: "12"
                    }),
                    e("line", {
                      x1: "12",
                      y1: "16",
                      x2: "12.01",
                      y2: "16"
                    })
                  ], -1)),
                  e("p", Is, n(y.value || _.value !== "all" || h.value ? "No matching assets" : "No depreciable assets yet"), 1),
                  y.value || _.value !== "all" || h.value ? (o(), i("p", Ws, "Try adjusting your search or filter")) : (o(), i("p", Es, "Add an asset with a purchase cost and useful life to build a schedule."))
                ])
              ])
            ])),
            (o(!0), i($, null, A(ae.value, (t) => (o(), i("tr", {
              key: t.name,
              class: I(["inv-row", { selected: R.value === t.name }])
            }, [
              e("td", {
                onClick: (l) => j(t),
                "data-label": "Asset"
              }, [
                e("span", Ks, n(t.asset_name || t.name), 1),
                e("div", Gs, n(t.name), 1)
              ], 8, qs),
              e("td", {
                onClick: (l) => j(t),
                "data-label": "Category"
              }, [
                t.asset_category ? (o(), i("span", Qs, n(c(t.asset_category)), 1)) : (o(), i("span", Xs, "—"))
              ], 8, Js),
              e("td", {
                onClick: (l) => j(t),
                "data-label": "Method"
              }, [
                e("span", {
                  class: I(["ds-method-badge", ne(t.depreciation_method)])
                }, n(t.depreciation_method || "—"), 3)
              ], 8, Zs),
              e("td", {
                onClick: (l) => j(t),
                class: "ta-r mono-sm fw-600",
                "data-label": "Cost"
              }, n(r(b)(t.purchase_cost || 0)), 9, et),
              e("td", {
                onClick: (l) => j(t),
                class: "ta-r mono-sm text-muted",
                "data-label": "Life"
              }, n(t.useful_life || "—"), 9, st),
              e("td", {
                onClick: (l) => j(t),
                class: "ta-r mono-sm",
                "data-label": "Annual Dep."
              }, n(r(b)(t._summary.annual)), 9, tt),
              e("td", {
                onClick: (l) => j(t),
                class: "ta-r mono-sm fw-600",
                "data-label": "Book Value",
                style: { color: "#2563eb" }
              }, n(r(b)(t._summary.bookValue)), 9, at),
              e("td", {
                style: { "text-align": "center" },
                onClick: s[10] || (s[10] = Me(() => {
                }, ["stop"]))
              }, [
                e("button", {
                  class: I(["inv-act-btn", { "inv-act-active": R.value === t.name }]),
                  onClick: (l) => j(t),
                  title: R.value === t.name ? "Hide schedule" : "View schedule"
                }, [
                  e("span", {
                    innerHTML: r(B)("chart", 13)
                  }, null, 8, lt),
                  s[38] || (s[38] = L(" View ", -1))
                ], 10, nt)
              ])
            ], 2))), 128))
          ])
        ]),
        e("div", ot, [
          k.value ? (o(), i($, { key: 0 }, A(4, (t) => e("div", {
            key: t,
            class: "b-shimmer",
            style: { height: "88px", "border-radius": "10px" }
          })), 64)) : Y.value.length ? (o(!0), i($, { key: 2 }, A(ae.value, (t) => (o(), i("div", {
            key: t.name,
            class: "ii-mob-card",
            onClick: (l) => j(t)
          }, [
            e("div", dt, [
              e("div", ct, [
                e("span", ut, n(t.asset_name || t.name), 1),
                e("span", {
                  class: I(["ds-method-badge", ne(t.depreciation_method)])
                }, n(t.depreciation_method || "—"), 3)
              ]),
              e("div", vt, [
                e("span", pt, n(t.name), 1),
                t.asset_category ? (o(), i("span", _t, n(c(t.asset_category)), 1)) : J("", !0)
              ])
            ]),
            e("div", mt, [
              e("div", bt, n(r(b)(t._summary.bookValue)), 1),
              e("div", ht, "cost " + n(r(b)(t.purchase_cost || 0)), 1)
            ])
          ], 8, rt))), 128)) : (o(), i("div", it, [
            e("div", null, n(y.value || _.value !== "all" || h.value ? "No matching assets" : "No depreciable assets yet"), 1)
          ]))
        ])
      ]),
      !k.value && Y.value.length ? (o(), i("div", kt, [
        ie(De, {
          page: u.value,
          "onUpdate:page": s[11] || (s[11] = (t) => u.value = t),
          "page-size": g.value,
          "onUpdate:pageSize": s[12] || (s[12] = (t) => g.value = t),
          "total-items": Y.value.length
        }, null, 8, ["page", "page-size", "total-items"]),
        e("div", yt, [
          s[39] || (s[39] = L(" Showing ", -1)),
          e("strong", null, n(pe.value), 1),
          s[40] || (s[40] = L(" to ", -1)),
          e("strong", null, n(_e.value), 1),
          s[41] || (s[41] = L(" of ", -1)),
          e("strong", null, n(Y.value.length), 1),
          s[42] || (s[42] = L(" assets ", -1))
        ])
      ])) : J("", !0),
      S.value ? (o(), i("div", {
        key: 1,
        ref_key: "panelRef",
        ref: te,
        class: "ds-panel"
      }, [
        e("div", gt, [
          e("div", null, [
            e("div", ft, n(S.value.asset_name || S.value.name), 1),
            e("div", wt, n(S.value.name) + " · " + n(c(S.value.asset_category) || "Uncategorized") + " · " + n(S.value.depreciation_method || "Straight Line"), 1)
          ]),
          e("div", xt, [
            e("button", {
              class: "sales-btn-ghost",
              onClick: s[13] || (s[13] = (t) => he(S.value))
            }, [
              e("span", {
                innerHTML: r(B)("download", 13)
              }, null, 8, Ct),
              s[43] || (s[43] = L(" Schedule CSV", -1))
            ]),
            e("button", {
              class: "sales-btn-ghost",
              onClick: s[14] || (s[14] = (t) => me(S.value))
            }, [
              e("span", {
                innerHTML: r(B)("edit", 13)
              }, null, 8, Lt),
              s[44] || (s[44] = L(" Edit Asset", -1))
            ]),
            e("button", {
              class: "sales-btn-ghost",
              onClick: s[15] || (s[15] = (t) => R.value = null)
            }, [
              e("span", {
                innerHTML: r(B)("x", 14)
              }, null, 8, Mt)
            ])
          ])
        ]),
        e("div", Tt, [
          e("div", Vt, [
            s[45] || (s[45] = e("div", { class: "ds-sc-label" }, "Original Cost", -1)),
            e("div", Dt, n(r(b)(z.value._summary.cost)), 1)
          ]),
          e("div", St, [
            s[46] || (s[46] = e("div", { class: "ds-sc-label" }, "Salvage Value", -1)),
            e("div", Ht, n(r(b)(z.value._summary.salvage)), 1)
          ]),
          e("div", $t, [
            s[47] || (s[47] = e("div", { class: "ds-sc-label" }, "Annual Depreciation", -1)),
            e("div", At, n(r(b)(z.value._summary.annual)), 1)
          ]),
          e("div", Nt, [
            s[48] || (s[48] = e("div", { class: "ds-sc-label" }, "Accumulated (to date)", -1)),
            e("div", Bt, n(r(b)(z.value._summary.toDate)), 1)
          ]),
          e("div", Rt, [
            s[49] || (s[49] = e("div", { class: "ds-sc-label" }, "Current Book Value", -1)),
            e("div", zt, n(r(b)(z.value._summary.bookValue)), 1)
          ]),
          e("div", Ut, [
            s[50] || (s[50] = e("div", { class: "ds-sc-label" }, "Total Depreciation", -1)),
            e("div", jt, n(r(b)(z.value._summary.totalDep)), 1)
          ])
        ]),
        e("div", Ft, [
          s[51] || (s[51] = e("div", { class: "ds-section-title" }, "Depreciation Trend", -1)),
          ie(Pe, {
            rows: z.value.rows
          }, null, 8, ["rows"])
        ]),
        e("div", Yt, [
          e("div", Ot, "Schedule (" + n(z.value.rows.length) + " " + n(z.value.rows.length === 1 ? "year" : "years") + ")", 1),
          e("div", Pt, [
            e("table", It, [
              s[52] || (s[52] = e("thead", null, [
                e("tr", null, [
                  e("th", null, "Year"),
                  e("th", null, "Date"),
                  e("th", { class: "ta-r" }, "Opening Value"),
                  e("th", { class: "ta-r" }, "Depreciation"),
                  e("th", { class: "ta-r" }, "Accumulated"),
                  e("th", { class: "ta-r" }, "Closing Value"),
                  e("th", null, "Status")
                ])
              ], -1)),
              e("tbody", null, [
                (o(!0), i($, null, A(z.value.rows, (t) => (o(), i("tr", {
                  key: t.year,
                  class: "inv-row"
                }, [
                  e("td", Wt, n(t.year), 1),
                  e("td", Et, n(r(Ve)(t.depreciation_date)), 1),
                  e("td", qt, n(r(b)(t.opening_value)), 1),
                  e("td", Kt, n(r(b)(t.depreciation_amount)), 1),
                  e("td", Gt, n(r(b)(t.accumulated_value)), 1),
                  e("td", Jt, n(r(b)(t.closing_value)), 1),
                  e("td", null, [
                    e("span", Qt, n(t.status), 1)
                  ])
                ]))), 128))
              ])
            ])
          ])
        ])
      ], 512)) : J("", !0)
    ]));
  }
}, ta = /* @__PURE__ */ ue(Xt, [["__scopeId", "data-v-933b068f"]]);
export {
  ta as default
};
