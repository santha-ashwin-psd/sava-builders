import { _ as T, x as V, o as J, c as o, a as t, d as q, t as i, F as d, r as u, u as h, f as c, h as m, j as Q, k as a, n as S, p as x, b as z } from "./main-BgVQJ7hW.js";
const U = { class: "mdx-page" }, G = { class: "mdx-hdr" }, H = ["disabled"], K = {
  key: 0,
  class: "mdx-spinner"
}, X = {
  key: 1,
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Y = { class: "mdx-kpi-grid" }, Z = ["onClick"], tt = { class: "mdx-kpi-top" }, st = { class: "mdx-kpi-label" }, et = { class: "mdx-kpi-value" }, nt = {
  key: 0,
  class: "shimmer",
  style: { width: "48px", height: "24px", "border-radius": "5px" }
}, ot = { class: "mdx-kpi-foot" }, at = { class: "mdx-mid-grid" }, it = { class: "mdx-card" }, rt = {
  key: 0,
  class: "mdx-attn-list"
}, lt = {
  key: 1,
  class: "mdx-empty"
}, dt = {
  key: 2,
  class: "mdx-attn-list"
}, ct = ["onClick"], ut = { class: "mdx-attn-body" }, mt = { class: "mdx-attn-title" }, pt = { class: "mdx-attn-sub" }, gt = {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  style: { color: "var(--bx-muted)", "flex-shrink": "0" }
}, ht = {
  class: "mdx-card",
  style: { "grid-column": "span 2" }
}, _t = { class: "mdx-card-hdr" }, ft = {
  key: 0,
  class: "mdx-attn-list"
}, kt = {
  key: 1,
  class: "mdx-empty"
}, xt = {
  key: 2,
  class: "mdx-table"
}, bt = ["onClick"], vt = {
  class: "mono",
  style: { "font-weight": "600" }
}, yt = { class: "mdx-prog-wrap" }, Ct = { class: "mdx-prog-bar" }, wt = { class: "mdx-prog-txt" }, Ft = {
  key: 0,
  class: "mdx-badge",
  style: { background: "var(--bx-amberS,#fef3c7)", color: "var(--bx-amber,#b45309)", "margin-left": "4px" },
  title: "Completed with the shortfall reconciled as process loss"
}, qt = {
  class: "mdx-card",
  style: { "margin-top": "14px" }
}, St = { class: "mdx-links-grid" }, Ot = ["onClick"], Wt = { class: "mdx-link-icon" }, Bt = { class: "mdx-link-label" }, Pt = {
  __name: "ManufacturingDashboard",
  setup(Mt) {
    const r = Q(), { toast: O } = V(), l = m(!1), _ = m({}), f = m([]), b = m([]), v = m([]), W = [
      {
        key: "in_process",
        label: "In Process",
        icon: "⚙️",
        iconBg: "var(--bx-mfgS)",
        iconColor: "var(--bx-mfg)",
        foot: "Work Orders running",
        go: () => r.push({ path: "/manufacturing/work-order", query: { status: "In Process" } })
      },
      {
        key: "due_soon",
        label: "Due This Week",
        icon: "📅",
        iconBg: "#FFF3BF",
        iconColor: "#E67700",
        foot: "Planned end within 7 days",
        go: () => r.push("/manufacturing/work-order")
      },
      {
        key: "jc_running",
        label: "Job Cards Live",
        icon: "🗂️",
        iconBg: "#E7F5FF",
        iconColor: "#1971C2",
        foot: "Currently in progress",
        go: () => r.push({ path: "/manufacturing/job-card", query: { status: "Work In Progress" } })
      },
      {
        key: "qc_pending",
        label: "QC Pending",
        icon: "🔬",
        iconBg: "#F3F0FF",
        iconColor: "#7048E8",
        foot: "Awaiting inspection",
        go: () => r.push("/quality/inspections")
      },
      {
        key: "mr_pending",
        label: "Material Reqs",
        icon: "📦",
        iconBg: "#EBFBEE",
        iconColor: "#2F9E44",
        foot: "Draft / Submitted",
        go: () => r.push("/manufacturing/material-request")
      },
      {
        key: "wo_stopped",
        label: "Stopped",
        icon: "🛑",
        iconBg: "#FFF5F5",
        iconColor: "#C92A2A",
        foot: "Work Orders halted",
        warn: !0,
        go: () => r.push({ path: "/manufacturing/work-order", query: { status: "Stopped" } })
      }
    ], B = [
      { path: "/manufacturing/bom", icon: "📋", label: "Bill of Materials" },
      { path: "/manufacturing/work-order", icon: "🏭", label: "Work Orders" },
      { path: "/manufacturing/job-card", icon: "🗂️", label: "Job Cards" },
      { path: "/manufacturing/production-plan", icon: "📊", label: "Production Plan" },
      { path: "/manufacturing/material-request", icon: "📦", label: "Material Requests" },
      { path: "/manufacturing/routing", icon: "🔁", label: "Routing" },
      { path: "/manufacturing/workstation", icon: "⚙️", label: "Workstations" },
      { path: "/manufacturing/packing-slip", icon: "🏷️", label: "Packing Slips" },
      { path: "/manufacturing/reports", icon: "📈", label: "Reports" },
      { path: "/manufacturing/settings", icon: "🔧", label: "Settings" }
    ], k = m([]);
    function P() {
      const n = [];
      for (const s of b.value)
        n.push({
          key: "wo-" + s.name,
          color: "var(--bx-red)",
          title: `${s.name} is stopped`,
          sub: `${s.item_name || s.production_item} — resume it to continue production.`,
          go: () => r.push("/manufacturing/work-order/" + s.name)
        });
      for (const s of v.value)
        n.push({
          key: "qc-" + s.name,
          color: "var(--bx-amber)",
          title: `${s.name} failed inspection`,
          sub: `${s.item_name || s.item} — review before dispatch.`,
          go: () => r.push("/quality/inspections?open=" + s.name)
        });
      k.value = n;
    }
    function M(n) {
      const s = parseFloat(n.qty) || 0;
      return s ? Math.min(100, Math.round((parseFloat(n.produced_qty) || 0) / s * 100)) : 0;
    }
    function y(n) {
      return (parseFloat(n) || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
    }
    function R(n) {
      return n.status !== "Completed" ? !1 : (parseFloat(n.qty) || 0) - (parseFloat(n.produced_qty) || 0) > 1e-4 && (parseFloat(n.process_loss_qty) || 0) > 1e-4;
    }
    function I(n) {
      return {
        Completed: "mdx-badge-green",
        "In Process": "mdx-badge-blue",
        Submitted: "mdx-badge-amber",
        Stopped: "mdx-badge-red",
        Cancelled: "mdx-badge-grey",
        Draft: "mdx-badge-grey"
      }[n] || "mdx-badge-grey";
    }
    async function C() {
      l.value = !0;
      try {
        const n = /* @__PURE__ */ new Date(), s = new Date(n.getTime() + 7 * 24 * 3600 * 1e3), e = n.toISOString().slice(0, 10), p = s.toISOString().slice(0, 10), [D, $, L, w, E, F, N] = await Promise.all([
          c("Work Order", { fields: ["name"], filters: [["status", "=", "In Process"]], limit: 1e3 }).catch(() => []),
          c("Work Order", { fields: ["name"], filters: [
            ["status", "not in", ["Completed", "Cancelled"]],
            ["planned_end_date", ">=", e],
            ["planned_end_date", "<=", p]
          ], limit: 1e3 }).catch(() => []),
          c("Job Card", { fields: ["name"], filters: [["status", "=", "Work In Progress"]], limit: 1e3 }).catch(() => []),
          c("QC Inspection", { fields: ["name", "status", "docstatus", "item", "item_name"], filters: [["docstatus", "!=", 2]], limit: 1e3 }).catch(() => []),
          c("Material Request", { fields: ["name"], filters: [["status", "in", ["Draft", "Submitted"]]], limit: 1e3 }).catch(() => []),
          c("Work Order", { fields: ["name", "item_name", "production_item"], filters: [["status", "=", "Stopped"]], limit: 100 }).catch(() => []),
          c("Work Order", { fields: ["name", "item_name", "production_item", "status", "qty", "produced_qty", "process_loss_qty", "modified"], limit: 8, order: "modified desc" }).catch(() => [])
        ]), A = (w || []).filter((g) => g.status === "Pending" || g.docstatus === 0), j = (w || []).filter((g) => g.status === "Fail");
        _.value = {
          in_process: (D || []).length,
          due_soon: ($ || []).length,
          jc_running: (L || []).length,
          qc_pending: A.length,
          mr_pending: (E || []).length,
          wo_stopped: (F || []).length
        }, b.value = F || [], v.value = j, f.value = N || [], P();
      } catch (n) {
        O("Could not load dashboard data: " + n.message, "error");
      }
      l.value = !1;
    }
    return J(C), (n, s) => (a(), o("div", U, [
      t("div", G, [
        s[3] || (s[3] = t("div", null, [
          t("div", { class: "mdx-hdr-title" }, "🏭 Manufacturing"),
          t("div", { class: "mdx-hdr-sub" }, "Where things stand across BOMs, Work Orders, and the shop floor right now.")
        ], -1)),
        t("button", {
          class: "mdx-btn mdx-btn-light",
          onClick: C,
          disabled: l.value
        }, [
          l.value ? (a(), o("span", K)) : (a(), o("svg", X, [...s[2] || (s[2] = [
            t("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            t("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])),
          q(" " + i(l.value ? "Refreshing…" : "Refresh"), 1)
        ], 8, H)
      ]),
      t("div", Y, [
        (a(), o(d, null, u(W, (e) => t("div", {
          key: e.key,
          class: S(["mdx-kpi-card", { "mdx-kpi-card--warn": e.warn && _.value[e.key] > 0 }]),
          onClick: (p) => e.go && e.go()
        }, [
          t("div", tt, [
            t("span", {
              class: "mdx-kpi-icon",
              style: x({ background: e.iconBg, color: e.iconColor })
            }, i(e.icon), 5),
            t("span", st, i(e.label), 1)
          ]),
          t("div", et, [
            l.value ? (a(), o("div", nt)) : (a(), o(d, { key: 1 }, [
              q(i(_.value[e.key] ?? 0), 1)
            ], 64))
          ]),
          t("div", ot, i(e.foot), 1)
        ], 10, Z)), 64))
      ]),
      t("div", at, [
        t("div", it, [
          s[6] || (s[6] = t("div", { class: "mdx-card-hdr" }, [
            t("span", { class: "mdx-card-title" }, "⚠️ Needs Attention")
          ], -1)),
          l.value ? (a(), o("div", rt, [
            (a(), o(d, null, u(3, (e) => t("div", {
              key: e,
              class: "shimmer",
              style: { height: "44px", "border-radius": "8px" }
            })), 64))
          ])) : k.value.length ? (a(), o("div", dt, [
            (a(!0), o(d, null, u(k.value, (e) => (a(), o("div", {
              key: e.key,
              class: "mdx-attn-row",
              onClick: (p) => e.go()
            }, [
              t("span", {
                class: "mdx-attn-dot",
                style: x({ background: e.color })
              }, null, 4),
              t("div", ut, [
                t("div", mt, i(e.title), 1),
                t("div", pt, i(e.sub), 1)
              ]),
              (a(), o("svg", gt, [...s[5] || (s[5] = [
                t("polyline", { points: "9 18 15 12 9 6" }, null, -1)
              ])]))
            ], 8, ct))), 128))
          ])) : (a(), o("div", lt, [...s[4] || (s[4] = [
            t("div", { class: "mdx-empty-icon" }, "✅", -1),
            t("div", { class: "mdx-empty-title" }, "All clear", -1),
            t("div", { class: "mdx-empty-sub" }, "No stopped Work Orders or failed inspections right now.", -1)
          ])]))
        ]),
        t("div", ht, [
          t("div", _t, [
            s[7] || (s[7] = t("span", { class: "mdx-card-title" }, "Recent Work Orders", -1)),
            t("button", {
              class: "mdx-link-btn",
              onClick: s[0] || (s[0] = (e) => h(r).push("/manufacturing/work-order"))
            }, "View all")
          ]),
          l.value ? (a(), o("div", ft, [
            (a(), o(d, null, u(5, (e) => t("div", {
              key: e,
              class: "shimmer",
              style: { height: "38px", "border-radius": "8px" }
            })), 64))
          ])) : f.value.length ? (a(), o("table", xt, [
            s[11] || (s[11] = t("thead", null, [
              t("tr", null, [
                t("th", null, "Work Order"),
                t("th", null, "Item"),
                t("th", null, "Progress"),
                t("th", null, "Status")
              ])
            ], -1)),
            t("tbody", null, [
              (a(!0), o(d, null, u(f.value, (e) => (a(), o("tr", {
                key: e.name,
                onClick: (p) => h(r).push("/manufacturing/work-order/" + e.name)
              }, [
                t("td", vt, i(e.name), 1),
                t("td", null, i(e.item_name || e.production_item), 1),
                t("td", null, [
                  t("div", yt, [
                    t("div", Ct, [
                      t("div", {
                        class: "mdx-prog-fill",
                        style: x({ width: M(e) + "%" })
                      }, null, 4)
                    ]),
                    t("span", wt, i(y(e.produced_qty)) + "/" + i(y(e.qty)), 1)
                  ])
                ]),
                t("td", null, [
                  t("span", {
                    class: S(["mdx-badge", I(e.status)])
                  }, i(e.status), 3),
                  R(e) ? (a(), o("span", Ft, "Loss-Reconciled")) : z("", !0)
                ])
              ], 8, bt))), 128))
            ])
          ])) : (a(), o("div", kt, [
            s[8] || (s[8] = t("div", { class: "mdx-empty-icon" }, "🏭", -1)),
            s[9] || (s[9] = t("div", { class: "mdx-empty-title" }, "No Work Orders yet", -1)),
            s[10] || (s[10] = t("div", { class: "mdx-empty-sub" }, "Create one from a submitted BOM to start production.", -1)),
            t("button", {
              class: "mdx-empty-btn",
              onClick: s[1] || (s[1] = (e) => h(r).push("/manufacturing/work-order/new"))
            }, "+ New Work Order")
          ]))
        ])
      ]),
      t("div", qt, [
        s[12] || (s[12] = t("div", { class: "mdx-card-hdr" }, [
          t("span", { class: "mdx-card-title" }, "Quick Links")
        ], -1)),
        t("div", St, [
          (a(), o(d, null, u(B, (e) => t("button", {
            key: e.path,
            class: "mdx-link-tile",
            onClick: (p) => h(r).push(e.path)
          }, [
            t("span", Wt, i(e.icon), 1),
            t("span", Bt, i(e.label), 1)
          ], 8, Ot)), 64))
        ])
      ])
    ]));
  }
}, It = /* @__PURE__ */ T(Pt, [["__scopeId", "data-v-985357d1"]]);
export {
  It as default
};
