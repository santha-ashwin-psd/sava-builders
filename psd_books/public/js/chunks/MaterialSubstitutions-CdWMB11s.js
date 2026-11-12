import { _ as Q, x as G, o as X, c as i, a as e, n as c, t, W as J, u as r, i as k, w as B, A as D, F as u, r as A, b as v, q as W, D as V, d as q, a7 as N, h as p, g as P, k as n, X as K } from "./main-aFENQFw9.js";
import { D as z } from "./DocLink-Bg59HKhK.js";
import { b as m } from "./format-BcJZDVG4.js";
import { o as F } from "./userNames-BH0u1Sh7.js";
const Y = { class: "qcar-page" }, Z = { class: "qcar-kpi-strip" }, ee = { class: "qcar-kpi-val" }, ae = {
  class: "qcar-kpi-val",
  style: { color: "#d97706" }
}, se = {
  class: "qcar-kpi-val",
  style: { color: "#16a34a" }
}, te = {
  class: "qcar-kpi-val",
  style: { color: "#4338ca" }
}, le = {
  class: "qcar-kpi-val",
  style: { color: "#dc2626" }
}, oe = { class: "qcar-toolbar" }, ie = { class: "qcar-search-wrap" }, ne = ["innerHTML"], re = { style: { display: "flex", gap: "8px", "align-items": "center" } }, de = ["innerHTML"], ce = { class: "qcar-card qcar-table-wrap" }, ue = { class: "qcar-table" }, ve = ["onClick"], pe = { class: "qcar-num" }, _e = { style: { "font-size": "12.5px", "font-weight": "600" } }, fe = { style: { "font-size": "11px", color: "#9ca3af" } }, qe = { style: { "font-size": "12px", color: "#6b7280" } }, ye = { class: "mono-sm text-muted" }, me = ["onClick"], be = ["innerHTML"], ke = { key: 0 }, ge = { class: "qcar-cards-wrap" }, we = ["onClick"], he = { class: "qcar-mcard-top" }, xe = { class: "qcar-num" }, Ce = { style: { display: "flex", gap: "6px", "align-items": "center" } }, Re = { class: "qcar-mcard-sub" }, je = { class: "qcar-mcard-hint" }, Le = { class: "qcar-mcard-meta" }, Me = { class: "mono-sm text-muted" }, Se = {
  key: 0,
  class: "qcar-card qcar-empty"
}, Ae = { class: "qcar-dheader" }, Te = ["innerHTML"], $e = { class: "qcar-dh-top" }, He = { class: "qcar-dh-title" }, Be = { class: "qcar-dh-sub" }, De = { style: { "margin-left": "auto", "flex-shrink": "0", display: "flex", gap: "6px", "align-items": "center" } }, Ve = { class: "qcar-dbody" }, Ne = { class: "qcar-info-grid" }, ze = { class: "qcar-info-val" }, Ie = { class: "qcar-info-val" }, Oe = { class: "qcar-info-val" }, We = { class: "qcar-info-lbl" }, Pe = {
  class: "qcar-info-val",
  style: { color: "#2563eb" }
}, Fe = { class: "qcar-info-val" }, Ue = { class: "qcar-info-val" }, Ee = { class: "qcar-info-val" }, Qe = { class: "qcar-info-val" }, Ge = {
  key: 0,
  class: "qcar-view-section"
}, Xe = { class: "qcar-info-grid" }, Je = { class: "qcar-info-val" }, Ke = { class: "qcar-info-val" }, Ye = { class: "qcar-info-val" }, Ze = { class: "qcar-view-section" }, ea = { class: "qcar-remarks-box" }, aa = {
  key: 1,
  class: "qcar-view-section"
}, sa = { class: "qcar-sec-lbl" }, ta = { class: "qcar-info-grid" }, la = { class: "qcar-info-val" }, oa = { class: "qcar-info-val" }, ia = {
  key: 0,
  style: { "margin-top": "8px" }
}, na = {
  class: "qcar-remarks-box",
  style: { "border-color": "#fca5a5", background: "#fef2f2" }
}, ra = {
  key: 2,
  class: "qcar-view-section"
}, da = { style: { display: "flex", "flex-direction": "column", gap: "8px" } }, ca = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap" } }, ua = ["disabled"], va = ["innerHTML"], pa = ["disabled"], _a = ["innerHTML"], fa = {
  key: 3,
  class: "inv-view-footer"
}, qa = { class: "qcar-dfooter" }, ya = {
  __name: "MaterialSubstitutions",
  setup(ma) {
    const { toast: b } = G(), y = p([]), x = p(!1), _ = p(!1), l = p(null), C = p(""), d = p("all"), R = p(""), g = p(""), j = p(!1), f = p(!1), w = p("");
    function T(o) {
      return o === "Approved" ? "qcar-status-approved" : o === "Rejected" ? "qcar-status-rejected" : o === "Applied Immediately" ? "qcar-status-approved" : "qcar-status-pending";
    }
    function L(o) {
      return o === "Scrap Reuse" ? "♻️ Scrap Reuse" : "🔀 Full Swap";
    }
    function $(o) {
      return o === "Scrap Reuse" ? "qcar-type-scrap" : "qcar-type-swap";
    }
    function I(o) {
      return o ? o.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (a) => a.toUpperCase()).slice(0, 18) : "—";
    }
    const h = P(() => ({
      total: y.value.length,
      pending: y.value.filter((o) => o.approval_status === "Pending").length,
      approved: y.value.filter((o) => o.approval_status === "Approved").length,
      applied: y.value.filter((o) => o.approval_status === "Applied Immediately").length,
      rejected: y.value.filter((o) => o.approval_status === "Rejected").length
    })), M = P(() => {
      let o = y.value;
      if (d.value !== "all" && (o = o.filter((a) => a.approval_status === d.value)), C.value.trim()) {
        const a = C.value.toLowerCase();
        o = o.filter(
          (s) => (s.name || "").toLowerCase().includes(a) || (s.work_order || "").toLowerCase().includes(a) || (s.original_item_code || "").toLowerCase().includes(a) || (s.alternative_item_code || "").toLowerCase().includes(a)
        );
      }
      return o;
    });
    async function S() {
      var o;
      x.value = !0;
      try {
        const a = await N("psd_books.api.material_substitution.list_material_substitution_logs", {
          approval_status: "all",
          page_len: 200,
          page: 0
        });
        y.value = ((o = a == null ? void 0 : a.message) == null ? void 0 : o.logs) || (a == null ? void 0 : a.logs) || [];
      } catch (a) {
        b.error(a.message || "Failed to load Material Substitution Logs");
      } finally {
        x.value = !1;
      }
    }
    async function H(o) {
      l.value = { ...o }, _.value = !0;
      try {
        const a = await K("Material Substitution Log", o.name);
        l.value && l.value.name === o.name && (l.value = { ...l.value, ...a });
      } catch {
      }
      R.value = "", g.value = "", j.value = !1, w.value = "";
    }
    async function U() {
      if (l.value) {
        f.value = !0, w.value = "approve";
        try {
          await N("psd_books.api.material_substitution.approve_material_substitution", {
            log_name: l.value.name,
            remarks: R.value
          }), b.success(`${l.value.name} approved`), _.value = !1, await S();
        } catch (o) {
          b.error(o.message || "Approval failed");
        } finally {
          f.value = !1;
        }
      }
    }
    async function E() {
      if (l.value) {
        if (!j.value) {
          j.value = !0;
          return;
        }
        if (!g.value.trim())
          return b.error("Rejection reason is required.");
        f.value = !0, w.value = "reject";
        try {
          await N("psd_books.api.material_substitution.reject_material_substitution", {
            log_name: l.value.name,
            rejection_reason: g.value
          }), b.success(`${l.value.name} rejected`), _.value = !1, await S();
        } catch (o) {
          b.error(o.message || "Rejection failed");
        } finally {
          f.value = !1;
        }
      }
    }
    return X(S), (o, a) => (n(), i("div", Y, [
      e("div", Z, [
        e("div", {
          class: c(["qcar-kpi", { active: d.value === "all" }]),
          onClick: a[0] || (a[0] = (s) => d.value = "all")
        }, [
          a[13] || (a[13] = e("div", {
            class: "qcar-kpi-ico",
            style: { background: "#eff6ff", color: "#2563eb" }
          }, [
            e("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              e("path", { d: "M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" }),
              e("path", { d: "M9 12l2 2 4-4" })
            ])
          ], -1)),
          e("div", null, [
            a[12] || (a[12] = e("div", { class: "qcar-kpi-lbl" }, "Total", -1)),
            e("div", ee, t(h.value.total), 1)
          ])
        ], 2),
        e("div", {
          class: c(["qcar-kpi", { active: d.value === "Pending" }]),
          onClick: a[1] || (a[1] = (s) => d.value = "Pending")
        }, [
          a[15] || (a[15] = e("div", {
            class: "qcar-kpi-ico",
            style: { background: "#fffbeb", color: "#d97706" }
          }, [
            e("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              e("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }),
              e("polyline", { points: "12 6 12 12 16 14" })
            ])
          ], -1)),
          e("div", null, [
            a[14] || (a[14] = e("div", { class: "qcar-kpi-lbl" }, "Pending Approval", -1)),
            e("div", ae, t(h.value.pending), 1)
          ])
        ], 2),
        e("div", {
          class: c(["qcar-kpi", { active: d.value === "Approved" }]),
          onClick: a[2] || (a[2] = (s) => d.value = "Approved")
        }, [
          a[17] || (a[17] = e("div", {
            class: "qcar-kpi-ico",
            style: { background: "#f0fdf4", color: "#16a34a" }
          }, [
            e("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              e("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
              e("polyline", { points: "22 4 12 14.01 9 11.01" })
            ])
          ], -1)),
          e("div", null, [
            a[16] || (a[16] = e("div", { class: "qcar-kpi-lbl" }, "Approved", -1)),
            e("div", se, t(h.value.approved), 1)
          ])
        ], 2),
        e("div", {
          class: c(["qcar-kpi", { active: d.value === "Applied Immediately" }]),
          onClick: a[3] || (a[3] = (s) => d.value = "Applied Immediately")
        }, [
          a[19] || (a[19] = e("div", {
            class: "qcar-kpi-ico",
            style: { background: "#eef2ff", color: "#4338ca" }
          }, [
            e("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              e("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
            ])
          ], -1)),
          e("div", null, [
            a[18] || (a[18] = e("div", { class: "qcar-kpi-lbl" }, "Applied Immediately", -1)),
            e("div", te, t(h.value.applied), 1)
          ])
        ], 2),
        e("div", {
          class: c(["qcar-kpi", { active: d.value === "Rejected" }]),
          onClick: a[4] || (a[4] = (s) => d.value = "Rejected")
        }, [
          a[21] || (a[21] = J('<div class="qcar-kpi-ico" style="background:#fef2f2;color:#dc2626;" data-v-5ac5400d><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5ac5400d><circle cx="12" cy="12" r="10" data-v-5ac5400d></circle><line x1="15" y1="9" x2="9" y2="15" data-v-5ac5400d></line><line x1="9" y1="9" x2="15" y2="15" data-v-5ac5400d></line></svg></div>', 1)),
          e("div", null, [
            a[20] || (a[20] = e("div", { class: "qcar-kpi-lbl" }, "Rejected", -1)),
            e("div", le, t(h.value.rejected), 1)
          ])
        ], 2)
      ]),
      e("div", oe, [
        e("div", ie, [
          e("span", {
            innerHTML: r(k)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, ne),
          B(e("input", {
            "onUpdate:modelValue": a[5] || (a[5] = (s) => C.value = s),
            placeholder: "Search work order, item…",
            class: "qcar-search-input"
          }, null, 512), [
            [D, C.value]
          ])
        ]),
        e("div", re, [
          e("button", {
            class: "qcar-btn-ghost",
            onClick: S
          }, [
            e("span", {
              innerHTML: r(k)("refresh", 14)
            }, null, 8, de)
          ])
        ])
      ]),
      e("div", ce, [
        e("table", ue, [
          a[24] || (a[24] = e("thead", null, [
            e("tr", null, [
              e("th", null, "Log #"),
              e("th", null, "Type"),
              e("th", null, "Work Order"),
              e("th", null, "Substitution"),
              e("th", null, "Requested By"),
              e("th", null, "Date"),
              e("th", null, "Status"),
              e("th", { style: { width: "44px" } })
            ])
          ], -1)),
          e("tbody", null, [
            x.value ? (n(), i(u, { key: 0 }, A(6, (s) => e("tr", { key: s }, [...a[22] || (a[22] = [
              e("td", { colspan: "8" }, [
                e("div", { class: "qcar-shimmer" })
              ], -1)
            ])])), 64)) : (n(), i(u, { key: 1 }, [
              (n(!0), i(u, null, A(M.value, (s) => (n(), i("tr", {
                key: s.name,
                class: "qcar-row",
                onClick: (O) => H(s)
              }, [
                e("td", null, [
                  e("span", pe, t(s.name), 1)
                ]),
                e("td", null, [
                  e("span", {
                    class: c(["qcar-type-badge", $(s.substitution_type)])
                  }, t(L(s.substitution_type)), 3)
                ]),
                e("td", null, [
                  V(z, {
                    doctype: "Work Order",
                    name: s.work_order
                  }, null, 8, ["name"])
                ]),
                e("td", null, [
                  e("div", _e, t(s.original_item_code) + " → " + t(s.alternative_item_code), 1),
                  e("div", fe, [
                    s.substitution_type === "Scrap Reuse" ? (n(), i(u, { key: 0 }, [
                      q(t(s.scrap_qty) + " scrap reused", 1)
                    ], 64)) : (n(), i(u, { key: 1 }, [
                      q(t(s.requires_approval ? "Requires approval" : "No approval needed"), 1)
                    ], 64))
                  ])
                ]),
                e("td", qe, t(I(s.requested_by)), 1),
                e("td", ye, t(r(m)(s.request_date)), 1),
                e("td", null, [
                  e("span", {
                    class: c(["qcar-status-badge", T(s.approval_status)])
                  }, t(s.approval_status), 3)
                ]),
                e("td", {
                  onClick: a[6] || (a[6] = W(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "qcar-act-btn",
                    onClick: (O) => H(s)
                  }, [
                    e("span", {
                      innerHTML: r(k)("eye", 13)
                    }, null, 8, be)
                  ], 8, me)
                ])
              ], 8, ve))), 128)),
              M.value.length ? v("", !0) : (n(), i("tr", ke, [...a[23] || (a[23] = [
                e("td", {
                  colspan: "8",
                  class: "qcar-empty"
                }, [
                  e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🔀"),
                  e("div", { style: { "font-weight": "600", "margin-bottom": "4px" } }, "No Material Substitutions found"),
                  e("div", { style: { "font-size": "13px", color: "#9ca3af" } }, "Logs appear when a raw material is substituted on a Work Order")
                ], -1)
              ])]))
            ], 64))
          ])
        ])
      ]),
      e("div", ge, [
        x.value ? (n(), i(u, { key: 0 }, A(4, (s) => e("div", {
          key: s,
          class: "qcar-card qcar-mcard"
        }, [...a[25] || (a[25] = [
          e("div", {
            class: "qcar-shimmer",
            style: { height: "70px" }
          }, null, -1)
        ])])), 64)) : (n(), i(u, { key: 1 }, [
          (n(!0), i(u, null, A(M.value, (s) => (n(), i("div", {
            key: s.name,
            class: "qcar-card qcar-mcard",
            onClick: (O) => H(s)
          }, [
            e("div", he, [
              e("span", xe, t(s.name), 1),
              e("span", Ce, [
                e("span", {
                  class: c(["qcar-type-badge", $(s.substitution_type)])
                }, t(L(s.substitution_type)), 3),
                e("span", {
                  class: c(["qcar-status-badge", T(s.approval_status)])
                }, t(s.approval_status), 3)
              ])
            ]),
            e("div", Re, t(s.original_item_code) + " → " + t(s.alternative_item_code), 1),
            e("div", je, [
              s.substitution_type === "Scrap Reuse" ? (n(), i(u, { key: 0 }, [
                q(t(s.scrap_qty) + " scrap reused", 1)
              ], 64)) : (n(), i(u, { key: 1 }, [
                q(t(s.requires_approval ? "Requires approval" : "No approval needed"), 1)
              ], 64))
            ]),
            e("div", Le, [
              V(z, {
                doctype: "Work Order",
                name: s.work_order
              }, null, 8, ["name"]),
              e("span", null, t(I(s.requested_by)), 1),
              e("span", Me, t(r(m)(s.request_date)), 1)
            ])
          ], 8, we))), 128)),
          M.value.length ? v("", !0) : (n(), i("div", Se, [...a[26] || (a[26] = [
            e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🔀", -1),
            e("div", { style: { "font-weight": "600", "margin-bottom": "4px" } }, "No Material Substitutions found", -1),
            e("div", { style: { "font-size": "13px", color: "#9ca3af" } }, "Logs appear when a raw material is substituted on a Work Order", -1)
          ])]))
        ], 64))
      ]),
      _.value ? (n(), i("div", {
        key: 0,
        class: "qcar-overlay",
        onClick: a[7] || (a[7] = W((s) => _.value = !1, ["self"]))
      })) : v("", !0),
      e("div", {
        class: c(["qcar-drawer", { open: _.value }])
      }, [
        l.value ? (n(), i(u, { key: 0 }, [
          e("div", Ae, [
            e("button", {
              class: "qcar-dclose",
              onClick: a[8] || (a[8] = (s) => _.value = !1)
            }, [
              e("span", {
                innerHTML: r(k)("x", 16)
              }, null, 8, Te)
            ]),
            e("div", $e, [
              a[27] || (a[27] = e("div", { class: "qcar-dh-ico" }, [
                e("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "#fff",
                  "stroke-width": "2"
                }, [
                  e("path", { d: "M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" })
                ])
              ], -1)),
              e("div", null, [
                e("div", He, t(l.value.name), 1),
                e("div", Be, t(L(l.value.substitution_type)) + " · " + t(r(m)(l.value.request_date)), 1)
              ]),
              e("span", De, [
                e("span", {
                  class: c(["qcar-type-badge", $(l.value.substitution_type)]),
                  style: { background: "rgba(255,255,255,.2)", color: "#fff", border: "none" }
                }, t(L(l.value.substitution_type)), 3),
                e("span", {
                  class: c(["qcar-status-badge", T(l.value.approval_status)])
                }, t(l.value.approval_status), 3)
              ])
            ])
          ]),
          e("div", Ve, [
            e("div", Ne, [
              e("div", null, [
                a[28] || (a[28] = e("span", { class: "qcar-info-lbl" }, "Work Order", -1)),
                e("div", ze, [
                  V(z, {
                    doctype: "Work Order",
                    name: l.value.work_order,
                    "mono-style": !1,
                    style: { color: "#2563eb" }
                  }, null, 8, ["name"])
                ])
              ]),
              e("div", null, [
                a[29] || (a[29] = e("span", { class: "qcar-info-lbl" }, "Row", -1)),
                e("div", Ie, t(l.value.work_order_item_row), 1)
              ]),
              e("div", null, [
                a[30] || (a[30] = e("span", { class: "qcar-info-lbl" }, "Original Item", -1)),
                e("div", Oe, t(l.value.original_item_code), 1)
              ]),
              e("div", null, [
                e("span", We, t(l.value.substitution_type === "Scrap Reuse" ? "Scrap Item" : "Alternative Item"), 1),
                e("div", Pe, t(l.value.alternative_item_code), 1)
              ]),
              e("div", null, [
                a[31] || (a[31] = e("span", { class: "qcar-info-lbl" }, "Conversion Factor", -1)),
                e("div", Fe, t(l.value.conversion_factor), 1)
              ]),
              e("div", null, [
                a[32] || (a[32] = e("span", { class: "qcar-info-lbl" }, "Required Qty", -1)),
                e("div", Ue, t(l.value.original_required_qty) + " → " + t(l.value.new_required_qty), 1)
              ]),
              e("div", null, [
                a[33] || (a[33] = e("span", { class: "qcar-info-lbl" }, "Requested By", -1)),
                e("div", Ee, t(l.value.requested_by), 1)
              ]),
              e("div", null, [
                a[34] || (a[34] = e("span", { class: "qcar-info-lbl" }, "Request Date", -1)),
                e("div", Qe, t(r(m)(l.value.request_date)), 1)
              ])
            ]),
            l.value.substitution_type === "Scrap Reuse" ? (n(), i("div", Ge, [
              a[38] || (a[38] = e("div", { class: "qcar-sec-lbl" }, "Scrap Reuse Details", -1)),
              e("div", Xe, [
                e("div", null, [
                  a[35] || (a[35] = e("span", { class: "qcar-info-lbl" }, "Scrap Qty Consumed", -1)),
                  e("div", Je, t(l.value.scrap_qty), 1)
                ]),
                e("div", null, [
                  a[36] || (a[36] = e("span", { class: "qcar-info-lbl" }, "Scrap Warehouse", -1)),
                  e("div", Ke, t(l.value.scrap_warehouse || "—"), 1)
                ]),
                e("div", null, [
                  a[37] || (a[37] = e("span", { class: "qcar-info-lbl" }, "New (Scrap) Row", -1)),
                  e("div", Ye, t(l.value.new_work_order_item_row || "—"), 1)
                ])
              ])
            ])) : v("", !0),
            e("div", Ze, [
              a[39] || (a[39] = e("div", { class: "qcar-sec-lbl" }, "Reason", -1)),
              e("div", ea, t(l.value.reason), 1)
            ]),
            l.value.approval_status !== "Pending" ? (n(), i("div", aa, [
              e("div", sa, t(l.value.approval_status === "Rejected" ? "Rejection" : "Approval") + " Details", 1),
              e("div", ta, [
                e("div", null, [
                  a[40] || (a[40] = e("span", { class: "qcar-info-lbl" }, "By", -1)),
                  e("div", la, t(l.value.approved_by || "—"), 1)
                ]),
                e("div", null, [
                  a[41] || (a[41] = e("span", { class: "qcar-info-lbl" }, "Date", -1)),
                  e("div", oa, t(r(m)(l.value.approval_date)), 1)
                ])
              ]),
              l.value.rejection_reason ? (n(), i("div", ia, [
                a[42] || (a[42] = e("div", {
                  class: "qcar-sec-lbl",
                  style: { color: "#dc2626" }
                }, "Rejection Reason", -1)),
                e("div", na, t(l.value.rejection_reason), 1)
              ])) : v("", !0)
            ])) : v("", !0),
            l.value.approval_status === "Pending" ? (n(), i("div", ra, [
              a[43] || (a[43] = e("div", { class: "qcar-sec-lbl" }, "Action", -1)),
              e("div", da, [
                B(e("textarea", {
                  "onUpdate:modelValue": a[9] || (a[9] = (s) => R.value = s),
                  class: "qcar-input",
                  rows: "2",
                  placeholder: "Remarks (optional for approve, required for reject)…"
                }, null, 512), [
                  [D, R.value]
                ]),
                j.value ? B((n(), i("textarea", {
                  key: 0,
                  "onUpdate:modelValue": a[10] || (a[10] = (s) => g.value = s),
                  class: "qcar-input",
                  rows: "2",
                  placeholder: "Rejection reason (required)…",
                  style: { "border-color": "#fca5a5" }
                }, null, 512)), [
                  [D, g.value]
                ]) : v("", !0),
                e("div", ca, [
                  e("button", {
                    class: "qcar-btn-approve",
                    disabled: f.value || !o.$canEdit("inventory"),
                    onClick: U
                  }, [
                    e("span", {
                      innerHTML: r(k)("check", 13)
                    }, null, 8, va),
                    q(t(f.value && w.value === "approve" ? "Approving…" : "Approve"), 1)
                  ], 8, ua),
                  e("button", {
                    class: "qcar-btn-reject",
                    disabled: f.value || !o.$canEdit("inventory"),
                    onClick: E
                  }, [
                    e("span", {
                      innerHTML: r(k)("x", 13)
                    }, null, 8, _a),
                    q(t(f.value && w.value === "reject" ? "Rejecting…" : "Reject"), 1)
                  ], 8, pa)
                ])
              ])
            ])) : v("", !0),
            l.value.owner ? (n(), i("div", fa, [
              q(" Created by " + t(r(F)(l.value.owner)) + " on " + t(r(m)(l.value.creation)) + " ", 1),
              l.value.modified_by ? (n(), i(u, { key: 0 }, [
                q(" · Last modified by " + t(r(F)(l.value.modified_by)) + " on " + t(r(m)(l.value.modified)), 1)
              ], 64)) : v("", !0)
            ])) : v("", !0)
          ]),
          e("div", qa, [
            e("button", {
              class: "qcar-btn-ghost",
              onClick: a[11] || (a[11] = (s) => _.value = !1)
            }, "Close")
          ])
        ], 64)) : v("", !0)
      ], 2)
    ]));
  }
}, ha = /* @__PURE__ */ Q(ya, [["__scopeId", "data-v-5ac5400d"]]);
export {
  ha as default
};
