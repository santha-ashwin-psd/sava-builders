import { _ as Me, o as J, l as Ce, m as Te, c as n, a as e, d as r, t as l, b, u as d, n as h, F as v, r as k, w as K, v as X, h as M, g as _, j as $e, k as a, p as j, q as Le } from "./main-D4r-IT_f.js";
import { u as He, f as je, a as Pe } from "./useFrappe-Deo_4XMU.js";
import { o as Ae } from "./userNames-BXaVhcjy.js";
const qe = { class: "ov-wrap" }, Se = { class: "ov-hero" }, De = { class: "ov-hero-left" }, Re = { class: "ov-greeting" }, Oe = { key: 0 }, Ve = { class: "ov-hero-right" }, Ne = { class: "ov-date-pill" }, Be = ["innerHTML"], Ie = { class: "ov-hero-btns" }, ze = ["disabled"], Ge = ["innerHTML"], Ee = ["innerHTML"], Fe = { class: "ov-kpi-grid" }, Ue = ["onClick"], Qe = { class: "ov-kpi-icon" }, We = ["innerHTML"], Ze = { class: "ov-kpi-main" }, Je = { class: "ov-kpi-label" }, Ke = { class: "ov-kpi-value" }, Xe = {
  key: 0,
  class: "ov-shimmer",
  style: { width: "70px", height: "24px", "border-radius": "6px" }
}, Ye = ["innerHTML"], eo = {
  class: "ov-spark",
  viewBox: "0 0 100 32",
  preserveAspectRatio: "none"
}, oo = ["d", "fill"], to = ["d", "stroke"], so = { class: "ov-row" }, no = { class: "ov-card" }, ao = { class: "ov-card-head" }, lo = { class: "ov-head-l" }, io = ["innerHTML"], ro = {
  key: 0,
  class: "ov-shimmer",
  style: { height: "190px", "border-radius": "10px" }
}, co = {
  key: 1,
  class: "ov-empty"
}, vo = ["innerHTML"], uo = {
  key: 2,
  class: "ov-bars"
}, po = { class: "ov-bar-lbl" }, ho = { class: "ov-bar-track" }, _o = { class: "ov-card" }, yo = { class: "ov-card-head" }, mo = { class: "ov-head-l" }, bo = ["innerHTML"], ko = {
  key: 0,
  class: "ov-shimmer",
  style: { height: "190px", "border-radius": "10px" }
}, go = { class: "ov-appr-list" }, fo = ["onClick"], wo = ["innerHTML"], xo = { class: "ov-appr-info" }, Mo = { class: "ov-appr-name" }, Co = { class: "ov-appr-sub" }, To = { key: 0 }, $o = { class: "ov-appr-right" }, Lo = { class: "ov-appr-date" }, Ho = ["innerHTML"], jo = {
  key: 0,
  class: "ov-pill ov-pill-blue"
}, Po = {
  key: 1,
  class: "ov-appr-amt"
}, Ao = {
  key: 2,
  class: "ov-empty"
}, qo = { class: "ov-row ov-row-single" }, So = { class: "ov-card" }, Do = { class: "ov-card-head" }, Ro = { class: "ov-head-l" }, Oo = ["innerHTML"], Vo = {
  key: 0,
  class: "ov-shimmer",
  style: { height: "190px", "border-radius": "10px" }
}, No = { class: "ov-tbl-wrap" }, Bo = { class: "ov-tbl" }, Io = ["onClick"], zo = { class: "ov-tbl-link" }, Go = { class: "ov-clip" }, Eo = { class: "ta-r" }, Fo = { class: "ov-muted" }, Uo = {
  key: 2,
  class: "ov-empty"
}, Qo = { class: "ov-row ov-row-snap" }, Wo = { class: "ov-card" }, Zo = { class: "ov-card-head" }, Jo = { class: "ov-head-l" }, Ko = ["innerHTML"], Xo = ["value"], Yo = {
  key: 0,
  class: "ov-shimmer",
  style: { height: "200px", "border-radius": "10px" }
}, et = {
  key: 1,
  class: "ov-tbl-wrap ov-snap-wrap"
}, ot = { class: "ov-tbl ov-snap-tbl" }, tt = { class: "ov-snap-name" }, st = { class: "ov-prog" }, nt = { class: "ov-prog-track" }, at = { class: "ov-prog-n" }, lt = ["onClick"], it = {
  key: 0,
  class: "ov-menu"
}, rt = {
  key: 2,
  class: "ov-empty"
}, ct = { class: "ov-card" }, dt = { class: "ov-card-head" }, vt = { class: "ov-head-l" }, ut = ["innerHTML"], pt = {
  key: 0,
  class: "ov-shimmer",
  style: { height: "120px", "border-radius": "10px" }
}, ht = {
  key: 1,
  class: "ov-timeline"
}, _t = ["onClick"], yt = ["innerHTML"], mt = { class: "ov-tl-body" }, bt = { class: "ov-tl-desc" }, kt = { class: "ov-tl-doc" }, gt = { class: "ov-tl-by" }, ft = { key: 0 }, wt = { class: "ov-tl-date" }, xt = {
  key: 2,
  class: "ov-empty",
  style: { padding: "24px 0" }
}, Mt = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#dcfce7"/><polyline points="7 12.5 10.5 16 17 9" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>', Ct = {
  __name: "Dashboard",
  setup(Tt) {
    const Y = $e(), P = (s) => Pe(s), N = (s) => s ? je(s) : "—", c = (s) => Y.push(s), C = M(window.__booksCompany || ""), ee = _(() => {
      const s = (/* @__PURE__ */ new Date()).getHours();
      return s < 12 ? "Good morning" : s < 17 ? "Good afternoon" : "Good evening";
    }), oe = (() => {
      const s = /* @__PURE__ */ new Date(), t = s.toLocaleDateString("en-GB", { weekday: "long" }), o = s.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      return `${t}, ${o}`;
    })(), { data: B, loading: te, execute: se } = He("psd_books.api.dashboard.get_projects_dashboard"), I = M(!1), y = _(() => te.value || !I.value);
    async function z() {
      await se(), I.value = !0;
    }
    const u = _(() => {
      var s;
      return ((s = B.value) == null ? void 0 : s.message) || B.value || {};
    });
    J(() => {
      z(), C.value || Ce("psd_books.api.admin.get_company_settings").then((s) => {
        C.value = (s == null ? void 0 : s.default_company) || "";
      }).catch(() => {
      });
    });
    const f = _(() => u.value.pending_approvals || []);
    function T(s) {
      const t = s && s.length > 1 ? s : [0, 0], o = Math.max(...t), i = Math.min(...t), m = o - i, x = t.map((g, O) => {
        const V = O / (t.length - 1) * 100, H = m ? 28 - (g - i) / m * 22 : 22;
        return [V, H];
      });
      let R = `M${x[0][0]},${x[0][1]}`;
      for (let g = 1; g < x.length; g++) {
        const [O, V] = x[g - 1], [H, W] = x[g], Z = (O + H) / 2;
        R += ` C${Z},${V} ${Z},${W} ${H},${W}`;
      }
      return { line: R, area: `${R} L100,32 L0,32 Z` };
    }
    const ne = _(() => {
      const s = u.value, t = s.spark || {}, o = s.material_value_change_pct;
      return [
        {
          key: "projects",
          label: "Active Projects",
          accent: "ov-a-blue",
          icon: w("folder"),
          route: "/projects",
          color: "#2563eb",
          value: s.active_projects ?? 0,
          sub: `${s.new_projects_month ?? 0} this month`,
          trend: (s.new_projects_month || 0) > 0 ? "up" : "",
          spark: T(t.projects)
        },
        {
          key: "mr",
          label: "MRN Pending Approval",
          accent: "ov-a-amber",
          icon: w("clock"),
          route: "/manufacturing/material-request",
          color: "#f59e0b",
          value: s.mr_pending_count ?? 0,
          sub: "Waiting for project manager",
          trend: "",
          spark: T(t.mr)
        },
        {
          key: "po",
          label: "Open Purchase Orders",
          accent: "ov-a-green",
          icon: w("bill"),
          route: "/purchase-orders",
          color: "#16a34a",
          value: s.open_po_count ?? 0,
          sub: `${s.new_pos_week ?? 0} this week`,
          trend: (s.new_pos_week || 0) > 0 ? "up" : "",
          spark: T(t.po)
        },
        {
          key: "val",
          label: "Total Material Value",
          accent: "ov-a-purple",
          icon: w("box"),
          route: "/purchase-orders",
          color: "#7c3aed",
          value: P(s.material_value || 0),
          sub: o == null ? "This month's purchase orders" : `${Math.abs(o)}% vs last month`,
          trend: o == null ? "" : o >= 0 ? "up" : "down",
          spark: T(t.value)
        }
      ];
    }), A = [
      { key: "Draft", label: "Draft", color: "#94a3b8" },
      { key: "Pending Approval", label: "Pending Approval", color: "#f59e0b" },
      { key: "Sent Back", label: "Sent Back", color: "#fb7185" },
      { key: "Approved", label: "Approved", color: "#2563eb" },
      { key: "Partly Issued", label: "Partly Issued", color: "#fb923c" },
      { key: "Issued", label: "Issued", color: "#34d399" },
      { key: "Partially Ordered", label: "Partially Ordered", color: "#a78bfa" },
      { key: "Ordered", label: "Ordered", color: "#8b5cf6" }
    ], q = M("month"), ae = _(() => (u.value.mr_pipeline_periods || {})[q.value] || u.value.mr_pipeline || {}), le = _(() => A.reduce((s, t) => s + ((u.value.mr_pipeline || {})[t.key] || 0), 0)), ie = _(() => {
      const s = ae.value, t = Math.max(1, ...A.map((o) => s[o.key] || 0));
      return A.map((o) => {
        const i = s[o.key] || 0;
        return { ...o, count: i, pct: Math.round(i / t * 100) };
      });
    }), re = (s) => s === "Partially Received" ? "#2563eb" : "#f59e0b", S = _(() => u.value.project_snapshot || []), $ = M(""), L = M(""), G = () => {
      L.value = "";
    };
    J(() => window.addEventListener("click", G)), Te(() => window.removeEventListener("click", G));
    const E = _(() => $.value ? S.value.filter((s) => s.name === $.value) : S.value), F = (s) => `${s.project_code || s.name}${s.project_name ? " – " + s.project_name : ""}`, ce = {
      Approved: "approved",
      "Pending Approval": "sent for approval",
      "Sent Back": "sent back",
      Draft: "saved as draft",
      "Partly Issued": "partly issued",
      Issued: "issued",
      "Partially Ordered": "partially ordered",
      Ordered: "ordered",
      "To Receive": "confirmed",
      "Partially Received": "partially received",
      Received: "received",
      Completed: "completed",
      Submitted: "submitted"
    }, de = (s) => ce[s] || (s ? `is ${String(s).toLowerCase()}` : "updated"), U = ["Approved", "Issued", "Received", "Completed", "Partially Ordered", "Ordered"], ve = (s) => U.includes(s) ? "ov-d-green" : s === "Sent Back" ? "ov-d-red" : s === "Pending Approval" ? "ov-d-amber" : "ov-d-blue", ue = (s) => w(U.includes(s) ? "tick" : "bill");
    function pe(s) {
      if (!s) return "";
      const t = new Date(String(s).replace(" ", "T"));
      if (isNaN(t)) return String(s);
      const o = t.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), i = t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: !0 });
      return `${o}, ${i}`;
    }
    function D(s) {
      if (s.doctype === "Material Request") return c("/manufacturing/material-request/" + encodeURIComponent(s.name));
      if (s.doctype === "Purchase Order") return c({ path: "/purchase-orders", query: { open: s.name } });
      if (s.doctype === "Purchase Receipt") return c({ path: "/purchase-receipts", query: { open: s.name } });
    }
    function w(s, t = 20) {
      const o = `width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
      return {
        clock: `<svg ${o}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        bill: `<svg ${o}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`,
        folder: `<svg ${o}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
        box: `<svg ${o}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        tick: `<svg ${o}><polyline points="20 6 9 17 4 12"/></svg>`
      }[s] || "";
    }
    const p = (s, t = 18) => `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s}</svg>`, Q = p('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 14), he = p('<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>', 14), _e = p('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', 14), ye = p('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>', 13), me = p('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>'), be = p('<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'), ke = p('<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'), ge = p('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'), fe = p('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'), we = p('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>'), xe = p('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 12);
    return (s, t) => (a(), n("div", qe, [
      e("div", Se, [
        e("div", De, [
          e("div", Re, [
            r(l(ee.value), 1),
            C.value ? (a(), n("span", Oe, ", " + l(C.value), 1)) : b("", !0),
            t[14] || (t[14] = r(" 👋", -1))
          ]),
          t[15] || (t[15] = e("div", { class: "ov-subgreeting" }, "Here's what's happening across your projects today.", -1))
        ]),
        e("div", Ve, [
          e("div", Ne, [
            e("span", { innerHTML: d(_e) }, null, 8, Be),
            r(l(d(oe)), 1)
          ]),
          e("div", Ie, [
            e("button", {
              class: "ov-ghost-btn",
              onClick: z,
              disabled: y.value
            }, [
              e("span", {
                innerHTML: d(he),
                class: h({ "ov-spin": y.value })
              }, null, 10, Ge),
              t[16] || (t[16] = r(" Refresh ", -1))
            ], 8, ze),
            e("button", {
              class: "ov-primary-btn",
              onClick: t[0] || (t[0] = (o) => c("/manufacturing/material-request/new"))
            }, [
              e("span", { innerHTML: d(Q) }, null, 8, Ee),
              t[17] || (t[17] = r(" New Material Request ", -1))
            ])
          ])
        ])
      ]),
      e("div", Fe, [
        (a(!0), n(v, null, k(ne.value, (o) => (a(), n("div", {
          key: o.key,
          class: h(["ov-kpi", o.accent]),
          onClick: (i) => c(o.route)
        }, [
          e("div", Qe, [
            e("span", {
              innerHTML: o.icon
            }, null, 8, We)
          ]),
          e("div", Ze, [
            e("div", Je, l(o.label), 1),
            e("div", Ke, [
              y.value ? (a(), n("div", Xe)) : (a(), n(v, { key: 1 }, [
                r(l(o.value), 1)
              ], 64))
            ]),
            e("div", {
              class: h(["ov-kpi-foot", o.trend ? "ov-trend-" + o.trend : ""])
            }, [
              o.trend === "up" ? (a(), n(v, { key: 0 }, [
                r("↑ ")
              ], 64)) : o.trend === "down" ? (a(), n(v, { key: 1 }, [
                r("↓ ")
              ], 64)) : b("", !0),
              r(l(o.sub), 1)
            ], 2)
          ]),
          e("span", {
            class: "ov-kpi-go",
            innerHTML: d(ye)
          }, null, 8, Ye),
          (a(), n("svg", eo, [
            e("path", {
              d: o.spark.area,
              fill: o.color,
              "fill-opacity": ".10"
            }, null, 8, oo),
            e("path", {
              d: o.spark.line,
              fill: "none",
              stroke: o.color,
              "stroke-width": "1.8",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, to)
          ]))
        ], 10, Ue))), 128))
      ]),
      e("div", so, [
        e("div", no, [
          e("div", ao, [
            e("div", lo, [
              e("span", {
                class: "ov-head-ico ov-ico-blue",
                innerHTML: d(me)
              }, null, 8, io),
              t[18] || (t[18] = e("div", null, [
                e("div", { class: "ov-card-title" }, "Material Request Pipeline"),
                e("div", { class: "ov-card-sub" }, "Requests by status")
              ], -1))
            ]),
            K(e("select", {
              class: "ov-select",
              "onUpdate:modelValue": t[1] || (t[1] = (o) => q.value = o)
            }, [...t[19] || (t[19] = [
              e("option", { value: "month" }, "This Month", -1),
              e("option", { value: "quarter" }, "This Quarter", -1),
              e("option", { value: "all" }, "All Time", -1)
            ])], 512), [
              [X, q.value]
            ])
          ]),
          y.value ? (a(), n("div", ro)) : le.value ? (a(), n("div", uo, [
            (a(!0), n(v, null, k(ie.value, (o) => (a(), n("div", {
              key: o.key,
              class: "ov-bar-row",
              onClick: t[3] || (t[3] = (i) => c("/manufacturing/material-request"))
            }, [
              e("span", po, l(o.label), 1),
              e("div", ho, [
                e("div", {
                  class: "ov-bar-fill",
                  style: j({ width: o.pct + "%", background: o.color })
                }, null, 4)
              ]),
              e("span", {
                class: "ov-bar-n",
                style: j({ color: o.count ? o.color : "#94a3b8" })
              }, l(o.count), 5)
            ]))), 128))
          ])) : (a(), n("div", co, [
            t[21] || (t[21] = e("div", { class: "ov-empty-title" }, "No material requests yet", -1)),
            e("button", {
              class: "ov-primary-btn ov-sm",
              style: { background: "#2563eb", color: "#fff" },
              onClick: t[2] || (t[2] = (o) => c("/manufacturing/material-request/new"))
            }, [
              e("span", { innerHTML: d(Q) }, null, 8, vo),
              t[20] || (t[20] = r(" New Material Request ", -1))
            ])
          ]))
        ]),
        e("div", _o, [
          e("div", yo, [
            e("div", mo, [
              e("span", {
                class: "ov-head-ico ov-ico-blue",
                innerHTML: d(be)
              }, null, 8, bo),
              t[22] || (t[22] = e("div", { class: "ov-card-title" }, "Pending Approvals", -1))
            ]),
            e("span", {
              class: h(["ov-badge", f.value.length ? "ov-badge-amber" : "ov-badge-green"])
            }, [
              f.value.length ? (a(), n(v, { key: 0 }, [
                r("↥ ")
              ], 64)) : b("", !0),
              r(l(f.value.length) + " waiting ", 1)
            ], 2)
          ]),
          y.value ? (a(), n("div", ko)) : f.value.length ? (a(), n(v, { key: 1 }, [
            e("div", go, [
              (a(!0), n(v, null, k(f.value.slice(0, 4), (o) => (a(), n("div", {
                key: o.doctype + o.name,
                class: "ov-appr",
                onClick: (i) => D(o)
              }, [
                e("span", {
                  class: "ov-appr-ico",
                  innerHTML: d(we)
                }, null, 8, wo),
                e("div", xo, [
                  e("div", Mo, l(o.name), 1),
                  e("div", Co, [
                    r(l(o.doctype), 1),
                    o.project_label ? (a(), n("span", To, " · " + l(o.project_label), 1)) : b("", !0)
                  ])
                ]),
                e("div", $o, [
                  e("div", Lo, [
                    e("span", { innerHTML: d(xe) }, null, 8, Ho),
                    r(l(N(o.date)), 1)
                  ]),
                  o.for_me ? (a(), n("span", jo, "For you")) : o.amount ? (a(), n("span", Po, l(P(o.amount)), 1)) : b("", !0)
                ])
              ], 8, fo))), 128))
            ]),
            e("button", {
              class: "ov-wide-btn",
              onClick: t[4] || (t[4] = (o) => c("/manufacturing/material-request"))
            }, "View all approvals →")
          ], 64)) : (a(), n("div", Ao, [
            e("div", {
              class: "ov-empty-icon ov-ok",
              innerHTML: Mt
            }),
            t[23] || (t[23] = e("div", {
              class: "ov-empty-title",
              style: { color: "#16a34a" }
            }, "All caught up!", -1)),
            t[24] || (t[24] = e("div", { class: "ov-empty-sub" }, "Nothing is waiting for approval.", -1))
          ]))
        ])
      ]),
      e("div", qo, [
        e("div", So, [
          e("div", Do, [
            e("div", Ro, [
              e("span", {
                class: "ov-head-ico ov-ico-blue",
                innerHTML: d(ke)
              }, null, 8, Oo),
              t[25] || (t[25] = e("div", null, [
                e("div", { class: "ov-card-title" }, "Awaiting Delivery"),
                e("div", { class: "ov-card-sub" }, "Purchase orders not yet fully received")
              ], -1))
            ]),
            e("button", {
              class: "ov-link",
              onClick: t[5] || (t[5] = (o) => c("/purchase-orders"))
            }, "View all →")
          ]),
          y.value ? (a(), n("div", Vo)) : u.value.awaiting_delivery && u.value.awaiting_delivery.length ? (a(), n(v, { key: 1 }, [
            e("div", No, [
              e("table", Bo, [
                t[26] || (t[26] = e("thead", null, [
                  e("tr", null, [
                    e("th", null, "PO Number"),
                    e("th", null, "Supplier"),
                    e("th", null, "Project"),
                    e("th", { class: "ta-r" }, "Amount"),
                    e("th", null, "Expected")
                  ])
                ], -1)),
                e("tbody", null, [
                  (a(!0), n(v, null, k(u.value.awaiting_delivery, (o) => (a(), n("tr", {
                    key: o.name,
                    onClick: (i) => D({ doctype: "Purchase Order", name: o.name })
                  }, [
                    e("td", null, [
                      e("span", {
                        class: "ov-dot",
                        style: j({ background: re(o.status) })
                      }, null, 4),
                      e("span", zo, l(o.name), 1)
                    ]),
                    e("td", null, l(o.supplier_name || "—"), 1),
                    e("td", Go, l(o.project_label || "—"), 1),
                    e("td", Eo, l(P(o.grand_total)), 1),
                    e("td", Fo, l(N(o.expected_delivery_date || o.date)), 1)
                  ], 8, Io))), 128))
                ])
              ])
            ]),
            e("button", {
              class: "ov-link ov-foot-link",
              onClick: t[6] || (t[6] = (o) => c("/purchase-orders"))
            }, "View all pending deliveries →")
          ], 64)) : (a(), n("div", Uo, [...t[27] || (t[27] = [
            e("div", { class: "ov-empty-sub" }, "No purchase orders awaiting delivery.", -1)
          ])]))
        ])
      ]),
      e("div", Qo, [
        e("div", Wo, [
          e("div", Zo, [
            e("div", Jo, [
              e("span", {
                class: "ov-head-ico ov-ico-blue",
                innerHTML: d(ge)
              }, null, 8, Ko),
              t[28] || (t[28] = e("div", null, [
                e("div", { class: "ov-card-title" }, "Project Snapshot"),
                e("div", { class: "ov-card-sub" }, "Open material requests and purchase orders per project")
              ], -1))
            ]),
            K(e("select", {
              class: "ov-select",
              "onUpdate:modelValue": t[7] || (t[7] = (o) => $.value = o)
            }, [
              t[29] || (t[29] = e("option", { value: "" }, "All projects", -1)),
              (a(!0), n(v, null, k(S.value, (o) => (a(), n("option", {
                key: o.name,
                value: o.name
              }, l(F(o)), 9, Xo))), 128))
            ], 512), [
              [X, $.value]
            ])
          ]),
          y.value ? (a(), n("div", Yo)) : E.value.length ? (a(), n("div", et, [
            e("table", ot, [
              t[30] || (t[30] = e("thead", null, [
                e("tr", null, [
                  e("th", {
                    rowspan: "2",
                    class: "ov-th-n"
                  }, "#"),
                  e("th", { rowspan: "2" }, "Project"),
                  e("th", {
                    colspan: "2",
                    class: "ta-c"
                  }, "Material Requests"),
                  e("th", {
                    colspan: "2",
                    class: "ta-c"
                  }, "Purchase Orders"),
                  e("th", { rowspan: "2" }, "Progress"),
                  e("th", { rowspan: "2" }, "Status"),
                  e("th", {
                    rowspan: "2",
                    class: "ta-c"
                  }, "Action")
                ]),
                e("tr", { class: "ov-subhead" }, [
                  e("th", { class: "ta-c" }, "Open"),
                  e("th", { class: "ta-c" }, "Total"),
                  e("th", { class: "ta-c" }, "Open"),
                  e("th", { class: "ta-c" }, "Total")
                ])
              ], -1)),
              e("tbody", null, [
                (a(!0), n(v, null, k(E.value, (o, i) => (a(), n("tr", {
                  key: o.name,
                  onClick: t[12] || (t[12] = (m) => c("/projects"))
                }, [
                  e("td", null, [
                    e("span", {
                      class: h(["ov-rank-badge", i < 4 ? "ov-rank-" + (i + 1) : "ov-rank-n"])
                    }, l(i + 1), 3)
                  ]),
                  e("td", tt, l(F(o)), 1),
                  e("td", {
                    class: h(["ta-c", { "ov-zero": !o.open_mrs }])
                  }, l(o.open_mrs), 3),
                  e("td", {
                    class: h(["ta-c", { "ov-zero": !o.total_mrs }])
                  }, l(o.total_mrs), 3),
                  e("td", {
                    class: h(["ta-c", { "ov-zero": !o.open_pos }])
                  }, l(o.open_pos), 3),
                  e("td", {
                    class: h(["ta-c", { "ov-zero": !o.total_pos }])
                  }, l(o.total_pos), 3),
                  e("td", null, [
                    e("div", st, [
                      e("div", nt, [
                        e("div", {
                          class: "ov-prog-fill",
                          style: j({ width: o.progress + "%" })
                        }, null, 4)
                      ]),
                      e("span", at, l(o.progress) + "%", 1)
                    ])
                  ]),
                  e("td", null, [
                    e("span", {
                      class: h(["ov-pill", o.status === "Closed" ? "ov-pill-amber" : "ov-pill-green"])
                    }, l(o.status === "Closed" ? "Closed" : "Active"), 3)
                  ]),
                  e("td", {
                    class: "ta-c ov-act",
                    onClick: t[11] || (t[11] = Le(() => {
                    }, ["stop"]))
                  }, [
                    e("button", {
                      class: "ov-kebab",
                      onClick: (m) => L.value = L.value === o.name ? "" : o.name,
                      "aria-label": "Actions"
                    }, "⋮", 8, lt),
                    L.value === o.name ? (a(), n("div", it, [
                      e("button", {
                        onClick: t[8] || (t[8] = (m) => c("/projects"))
                      }, "View projects"),
                      e("button", {
                        onClick: t[9] || (t[9] = (m) => c("/manufacturing/material-request"))
                      }, "Material Requests"),
                      e("button", {
                        onClick: t[10] || (t[10] = (m) => c("/purchase-orders"))
                      }, "Purchase Orders")
                    ])) : b("", !0)
                  ])
                ]))), 128))
              ])
            ])
          ])) : (a(), n("div", rt, [...t[31] || (t[31] = [
            e("div", { class: "ov-empty-sub" }, "No open projects.", -1)
          ])]))
        ]),
        e("div", ct, [
          e("div", dt, [
            e("div", vt, [
              e("span", {
                class: "ov-head-ico ov-ico-blue",
                innerHTML: d(fe)
              }, null, 8, ut),
              t[32] || (t[32] = e("div", { class: "ov-card-title" }, "Recent Activity", -1))
            ]),
            e("button", {
              class: "ov-link",
              onClick: t[13] || (t[13] = (o) => c("/manufacturing/material-request"))
            }, "View all →")
          ]),
          y.value ? (a(), n("div", pt)) : u.value.recent_activity && u.value.recent_activity.length ? (a(), n("div", ht, [
            (a(!0), n(v, null, k(u.value.recent_activity, (o) => (a(), n("div", {
              key: o.doctype + o.name,
              class: "ov-tl-row",
              onClick: (i) => D(o)
            }, [
              e("div", {
                class: h(["ov-tl-dot", ve(o.status)])
              }, [
                e("span", {
                  innerHTML: ue(o.status)
                }, null, 8, yt)
              ], 2),
              e("div", mt, [
                e("div", bt, [
                  r(l(o.doctype) + " ", 1),
                  e("span", kt, l(o.name), 1),
                  r(" " + l(de(o.status)), 1)
                ]),
                e("div", gt, [
                  r("by " + l(d(Ae)(o.modified_by)), 1),
                  o.project_label ? (a(), n("span", ft, " · " + l(o.project_label), 1)) : b("", !0)
                ]),
                e("div", wt, l(pe(o.modified)), 1)
              ])
            ], 8, _t))), 128))
          ])) : (a(), n("div", xt, [...t[33] || (t[33] = [
            e("div", { class: "ov-empty-sub" }, "No recent activity", -1)
          ])]))
        ])
      ])
    ]));
  }
}, jt = /* @__PURE__ */ Me(Ct, [["__scopeId", "data-v-ecf0c20e"]]);
export {
  jt as default
};
