import { _ as de, x as ce, y as ue, o as ve, c as n, a as e, n as m, W as O, t as l, u as d, i as M, w as $, A as X, d as u, F as v, r as V, b as c, D as ee, q as ae, v as se, a7 as Q, h as i, g as E, z as pe, k as r, X as qe, f as fe } from "./main-aFENQFw9.js";
import { b as R } from "./format-BcJZDVG4.js";
import { o as te } from "./userNames-BH0u1Sh7.js";
import { P as le } from "./Pagination-CZn_kG8T.js";
const _e = { class: "qcar-page" }, ke = { class: "qcar-kpis" }, he = { class: "qcar-kpi-txt" }, me = { class: "qcar-kpi-val" }, ye = { class: "qcar-kpi-txt" }, be = { class: "qcar-kpi-val" }, ge = { class: "qcar-kpi-txt" }, we = { class: "qcar-kpi-val" }, Ce = { class: "qcar-kpi-txt" }, Me = { class: "qcar-kpi-val" }, Re = { class: "qcar-panel" }, xe = { class: "qcar-search" }, Le = ["innerHTML"], Te = ["disabled"], je = ["innerHTML"], He = { class: "qcar-tcard qcar-table-wrap" }, Ae = { class: "qcar-scroll" }, Se = { class: "qcar-table" }, $e = ["innerHTML"], Ve = ["innerHTML"], Qe = ["innerHTML"], Be = ["innerHTML"], Ie = ["innerHTML"], Ne = ["innerHTML"], Ue = ["innerHTML"], ze = ["onClick"], De = { class: "qcar-num" }, Pe = { class: "qcar-ref" }, Ee = { class: "qcar-two" }, Fe = { class: "qcar-strong" }, We = { class: "qcar-sub" }, Ge = { class: "qcar-two" }, Oe = { class: "qcar-sub" }, Xe = { class: "qcar-ref" }, Je = { class: "qcar-muted" }, Ke = { class: "qcar-muted" }, Ye = ["onClick"], Ze = ["innerHTML"], ea = { key: 0 }, aa = {
  colspan: "8",
  class: "qcar-empty"
}, sa = {
  key: 0,
  class: "qcar-foot"
}, ta = { class: "qcar-cards-wrap" }, la = ["onClick"], oa = { class: "qcar-mcard-top" }, na = { class: "qcar-num" }, ra = { class: "qcar-mcard-sub" }, ia = { class: "qcar-mcard-hint" }, da = { class: "qcar-mcard-meta" }, ca = { class: "qcar-ref" }, ua = {
  key: 0,
  class: "qcar-mcard qcar-mobile-empty"
}, va = { class: "qcar-empty-title" }, pa = { class: "qcar-empty-sub" }, qa = {
  key: 1,
  class: "qcar-foot qcar-foot-mobile"
}, fa = { class: "qcar-dheader" }, _a = ["innerHTML"], ka = { class: "qcar-dh-top" }, ha = { class: "qcar-dh-title" }, ma = { class: "qcar-dh-sub" }, ya = { class: "qcar-dbody" }, ba = { class: "qcar-info-grid" }, ga = {
  class: "qcar-info-val",
  style: { color: "#2563eb" }
}, wa = { class: "qcar-info-val" }, Ca = { class: "qcar-info-val" }, Ma = {
  class: "qcar-info-val",
  style: { color: "#2563eb" }
}, Ra = { class: "qcar-info-val" }, xa = { class: "qcar-info-val" }, La = {
  key: 0,
  class: "qcar-view-section"
}, Ta = { class: "qcar-remarks-box" }, ja = {
  key: 1,
  class: "qcar-view-section"
}, Ha = { class: "qcar-sec-lbl" }, Aa = { class: "qcar-info-grid" }, Sa = { class: "qcar-info-val" }, $a = { class: "qcar-info-val" }, Va = {
  key: 0,
  style: { "margin-top": "8px" }
}, Qa = {
  class: "qcar-remarks-box",
  style: { "border-color": "#fca5a5", background: "#fef2f2" }
}, Ba = {
  key: 2,
  class: "qcar-view-section"
}, Ia = {
  key: 0,
  class: "qcar-remarks-box"
}, Na = {
  class: "qcar-remarks-box",
  style: { "border-color": "#fdba74", background: "#fff7ed" }
}, Ua = { style: { display: "flex", "flex-direction": "column", gap: "8px", "margin-top": "8px" } }, za = ["value"], Da = ["disabled"], Pa = ["innerHTML"], Ea = {
  key: 2,
  class: "qcar-remarks-box",
  style: { "border-color": "#bbf7d0", background: "#f0fdf4", color: "#15803d" }
}, Fa = {
  key: 3,
  class: "qcar-view-section"
}, Wa = { style: { display: "flex", "flex-direction": "column", gap: "8px" } }, Ga = { style: { display: "flex", gap: "8px" } }, Oa = ["disabled"], Xa = ["innerHTML"], Ja = ["disabled"], Ka = ["innerHTML"], Ya = {
  key: 4,
  class: "inv-view-footer"
}, Za = { class: "qcar-dfooter" }, es = {
  __name: "QCApprovals",
  setup(as) {
    const { toast: f } = ce(), _ = i([]), x = i(!1), k = i(!1), o = i(null), T = i(""), p = i("all"), L = i(1), y = i(25), B = i(""), j = i("asc"), I = i(""), H = i(""), N = i(!1), h = i(!1), A = i(""), b = i(null), F = i(!1), U = i([]), z = i(!1), q = pe({ disposition: "Release to Stock", target_warehouse: "" });
    function W(t) {
      return t === "Approved" ? "qcar-status-approved" : t === "Rejected" ? "qcar-status-rejected" : "qcar-status-pending";
    }
    function J(t) {
      return t ? t.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (a) => a.toUpperCase()).slice(0, 18) : "—";
    }
    const D = E(() => ({
      total: _.value.length,
      pending: _.value.filter((t) => t.approval_status === "Pending").length,
      approved: _.value.filter((t) => t.approval_status === "Approved").length,
      rejected: _.value.filter((t) => t.approval_status === "Rejected").length
    })), K = E(() => {
      let t = _.value;
      if (p.value !== "all" && (t = t.filter((a) => a.approval_status === p.value)), T.value.trim()) {
        const a = T.value.toLowerCase();
        t = t.filter(
          (s) => (s.name || "").toLowerCase().includes(a) || (s.qc_inspection || "").toLowerCase().includes(a) || (s.item || "").toLowerCase().includes(a) || (s.reference_name || "").toLowerCase().includes(a)
        );
      }
      return t;
    }), g = E(() => {
      const t = B.value;
      return t ? [...K.value].sort((a, s) => {
        const S = String(a[t] ?? "").localeCompare(String(s[t] ?? ""), void 0, { numeric: !0 });
        return j.value === "asc" ? S : -S;
      }) : K.value;
    }), Y = E(() => {
      const t = (L.value - 1) * y.value;
      return g.value.slice(t, t + y.value);
    });
    function w(t) {
      B.value === t ? j.value = j.value === "asc" ? "desc" : "asc" : (B.value = t, j.value = "asc");
    }
    function C(t) {
      return B.value !== t ? "⇕" : j.value === "asc" ? "▲" : "▼";
    }
    ue([T, p, y], () => {
      L.value = 1;
    });
    async function P() {
      var t;
      x.value = !0;
      try {
        const a = await Q("psd_books.api.qc_approval.list_qc_approval_requests", {
          approval_status: "all",
          page_len: 200,
          page: 0
        });
        _.value = ((t = a == null ? void 0 : a.message) == null ? void 0 : t.requests) || (a == null ? void 0 : a.requests) || [];
      } catch (a) {
        f.error(a.message || "Failed to load QC Approval Requests");
      } finally {
        x.value = !1;
      }
    }
    async function G(t) {
      o.value = { ...t }, k.value = !0, I.value = "", H.value = "", N.value = !1, A.value = "", b.value = null, q.disposition = "Release to Stock", q.target_warehouse = "", t.approval_status === "Approved" && t.qc_inspection && (await Z(t.qc_inspection), U.value.length || await oe());
      try {
        const a = await qe("QC Approval Request", t.name);
        o.value && o.value.name === t.name && (o.value = { ...o.value, ...a });
      } catch {
      }
    }
    async function Z(t) {
      F.value = !0;
      try {
        const a = await Q("psd_books.api.qc.get_inspection_detail", {
          inspection_name: t
        }), s = (a == null ? void 0 : a.message) || a;
        b.value = {
          qc_hold: !!(s != null && s.qc_hold),
          quarantine_warehouse: (s == null ? void 0 : s.quarantine_warehouse) || ""
        };
      } catch {
        b.value = null;
      } finally {
        F.value = !1;
      }
    }
    async function oe() {
      try {
        const t = await fe("Warehouse", {
          fields: ["name", "warehouse_name"],
          filters: [["disabled", "=", 0]],
          limit: 200
        });
        U.value = (t == null ? void 0 : t.message) || t || [];
      } catch {
        U.value = [];
      }
    }
    async function ne() {
      var t;
      if ((t = o.value) != null && t.qc_inspection) {
        if (q.disposition !== "Scrap" && !q.target_warehouse)
          return f.error("Target warehouse is required for this disposition.");
        z.value = !0;
        try {
          await Q("psd_books.quality.qc_hold_manager.release_from_hold", {
            inspection_name: o.value.qc_inspection,
            disposition: q.disposition,
            target_warehouse: q.target_warehouse
          }), f.success("QC Hold released"), await Z(o.value.qc_inspection);
        } catch (a) {
          f.error(a.message || "Release failed");
        } finally {
          z.value = !1;
        }
      }
    }
    async function re() {
      if (o.value) {
        h.value = !0, A.value = "approve";
        try {
          await Q("psd_books.api.qc_approval.approve_qc_approval_request", {
            request_name: o.value.name,
            remarks: I.value
          }), f.success(`${o.value.name} approved`), k.value = !1, await P();
        } catch (t) {
          f.error(t.message || "Approval failed");
        } finally {
          h.value = !1;
        }
      }
    }
    async function ie() {
      if (o.value) {
        if (!N.value) {
          N.value = !0;
          return;
        }
        if (!H.value.trim())
          return f.error("Rejection reason is required.");
        h.value = !0, A.value = "reject";
        try {
          await Q("psd_books.api.qc_approval.reject_qc_approval_request", {
            request_name: o.value.name,
            rejection_reason: H.value
          }), f.success(`${o.value.name} rejected`), k.value = !1, await P();
        } catch (t) {
          f.error(t.message || "Rejection failed");
        } finally {
          h.value = !1;
        }
      }
    }
    return ve(P), (t, a) => (r(), n("div", _e, [
      e("div", ke, [
        e("button", {
          type: "button",
          class: m(["qcar-kpi k-total", { active: p.value === "all" }]),
          onClick: a[0] || (a[0] = (s) => p.value = "all")
        }, [
          a[25] || (a[25] = O('<span class="qcar-kpi-ico" data-v-2ca8deaf><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-2ca8deaf><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" data-v-2ca8deaf></path><rect x="9" y="3" width="6" height="4" rx="1" data-v-2ca8deaf></rect><path d="M9 12h6M9 16h4" data-v-2ca8deaf></path></svg></span>', 1)),
          e("span", he, [
            a[24] || (a[24] = e("span", { class: "qcar-kpi-lbl" }, "Total", -1)),
            e("span", me, l(D.value.total), 1)
          ])
        ], 2),
        e("button", {
          type: "button",
          class: m(["qcar-kpi k-pend", { active: p.value === "Pending" }]),
          onClick: a[1] || (a[1] = (s) => p.value = "Pending")
        }, [
          a[27] || (a[27] = e("span", { class: "qcar-kpi-ico" }, [
            e("svg", {
              width: "26",
              height: "26",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.8",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              e("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }),
              e("polyline", { points: "12 6 12 12 16 14" })
            ])
          ], -1)),
          e("span", ye, [
            a[26] || (a[26] = e("span", { class: "qcar-kpi-lbl" }, "Pending", -1)),
            e("span", be, l(D.value.pending), 1)
          ])
        ], 2),
        e("button", {
          type: "button",
          class: m(["qcar-kpi k-appr", { active: p.value === "Approved" }]),
          onClick: a[2] || (a[2] = (s) => p.value = "Approved")
        }, [
          a[29] || (a[29] = e("span", { class: "qcar-kpi-ico" }, [
            e("svg", {
              width: "26",
              height: "26",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.8",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              e("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
              e("polyline", { points: "22 4 12 14.01 9 11.01" })
            ])
          ], -1)),
          e("span", ge, [
            a[28] || (a[28] = e("span", { class: "qcar-kpi-lbl" }, "Approved", -1)),
            e("span", we, l(D.value.approved), 1)
          ])
        ], 2),
        e("button", {
          type: "button",
          class: m(["qcar-kpi k-rej", { active: p.value === "Rejected" }]),
          onClick: a[3] || (a[3] = (s) => p.value = "Rejected")
        }, [
          a[31] || (a[31] = O('<span class="qcar-kpi-ico" data-v-2ca8deaf><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-2ca8deaf><circle cx="12" cy="12" r="10" data-v-2ca8deaf></circle><line x1="15" y1="9" x2="9" y2="15" data-v-2ca8deaf></line><line x1="9" y1="9" x2="15" y2="15" data-v-2ca8deaf></line></svg></span>', 1)),
          e("span", Ce, [
            a[30] || (a[30] = e("span", { class: "qcar-kpi-lbl" }, "Rejected", -1)),
            e("span", Me, l(D.value.rejected), 1)
          ])
        ], 2)
      ]),
      e("div", Re, [
        e("label", xe, [
          e("span", {
            innerHTML: d(M)("search", 16),
            class: "qcar-search-ico"
          }, null, 8, Le),
          $(e("input", {
            "onUpdate:modelValue": a[4] || (a[4] = (s) => T.value = s),
            placeholder: "Search request #, item, inspection…",
            class: "qcar-search-input",
            "aria-label": "Search approval requests"
          }, null, 512), [
            [X, T.value]
          ])
        ]),
        e("button", {
          type: "button",
          class: "qcar-btn qcar-btn-icon",
          onClick: P,
          disabled: x.value,
          title: "Refresh",
          "aria-label": "Refresh"
        }, [
          e("span", {
            innerHTML: d(M)("refresh", 16)
          }, null, 8, je)
        ], 8, Te)
      ]),
      e("div", He, [
        e("div", Ae, [
          e("table", Se, [
            e("thead", null, [
              e("tr", null, [
                e("th", {
                  onClick: a[5] || (a[5] = (s) => w("name")),
                  class: "sortable"
                }, [
                  a[32] || (a[32] = u("Request # ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("name")
                  }, null, 8, $e)
                ]),
                e("th", {
                  onClick: a[6] || (a[6] = (s) => w("qc_inspection")),
                  class: "sortable"
                }, [
                  a[33] || (a[33] = u("QC Inspection ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("qc_inspection")
                  }, null, 8, Ve)
                ]),
                e("th", {
                  onClick: a[7] || (a[7] = (s) => w("item")),
                  class: "sortable"
                }, [
                  a[34] || (a[34] = u("Item ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("item")
                  }, null, 8, Qe)
                ]),
                e("th", {
                  onClick: a[8] || (a[8] = (s) => w("reference_name")),
                  class: "sortable"
                }, [
                  a[35] || (a[35] = u("Reference ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("reference_name")
                  }, null, 8, Be)
                ]),
                e("th", {
                  onClick: a[9] || (a[9] = (s) => w("requested_by")),
                  class: "sortable"
                }, [
                  a[36] || (a[36] = u("Requested By ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("requested_by")
                  }, null, 8, Ie)
                ]),
                e("th", {
                  onClick: a[10] || (a[10] = (s) => w("request_date")),
                  class: "sortable"
                }, [
                  a[37] || (a[37] = u("Date ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("request_date")
                  }, null, 8, Ne)
                ]),
                e("th", {
                  onClick: a[11] || (a[11] = (s) => w("approval_status")),
                  class: "sortable"
                }, [
                  a[38] || (a[38] = u("Status ", -1)),
                  e("span", {
                    class: "qcar-sort",
                    innerHTML: C("approval_status")
                  }, null, 8, Ue)
                ]),
                a[39] || (a[39] = e("th", { class: "qcar-th-actions" }, "Actions", -1))
              ])
            ]),
            e("tbody", null, [
              x.value ? (r(), n(v, { key: 0 }, V(6, (s) => e("tr", { key: s }, [...a[40] || (a[40] = [
                e("td", {
                  colspan: "8",
                  class: "qcar-skel-cell"
                }, [
                  e("div", { class: "qcar-shimmer" })
                ], -1)
              ])])), 64)) : (r(), n(v, { key: 1 }, [
                (r(!0), n(v, null, V(Y.value, (s) => (r(), n("tr", {
                  key: s.name,
                  class: "qcar-row",
                  onClick: (S) => G(s)
                }, [
                  e("td", null, [
                    e("span", De, l(s.name), 1)
                  ]),
                  e("td", null, [
                    e("span", Pe, l(s.qc_inspection), 1)
                  ]),
                  e("td", null, [
                    e("div", Ee, [
                      e("span", Fe, l(s.item), 1),
                      e("span", We, l(s.inspection_type), 1)
                    ])
                  ]),
                  e("td", null, [
                    e("div", Ge, [
                      e("span", Oe, l(s.reference_type), 1),
                      e("span", Xe, l(s.reference_name || "—"), 1)
                    ])
                  ]),
                  e("td", Je, l(J(s.requested_by)), 1),
                  e("td", Ke, l(d(R)(s.request_date)), 1),
                  e("td", null, [
                    e("span", {
                      class: m(["qcar-status-badge", W(s.approval_status)])
                    }, l(s.approval_status), 3)
                  ]),
                  e("td", {
                    class: "qcar-td-actions",
                    onClick: a[12] || (a[12] = ae(() => {
                    }, ["stop"]))
                  }, [
                    e("button", {
                      type: "button",
                      class: "qcar-act",
                      title: "View",
                      "aria-label": "View request",
                      onClick: (S) => G(s)
                    }, [
                      e("span", {
                        innerHTML: d(M)("eye", 16)
                      }, null, 8, Ze)
                    ], 8, Ye)
                  ])
                ], 8, ze))), 128)),
                g.value.length ? c("", !0) : (r(), n("tr", ea, [
                  e("td", aa, [
                    a[45] || (a[45] = O('<div class="qcar-empty-art" aria-hidden="true" data-v-2ca8deaf><svg width="150" height="120" viewBox="0 0 150 120" fill="none" data-v-2ca8deaf><circle cx="75" cy="60" r="50" fill="#e6f6ed" data-v-2ca8deaf></circle><path d="M24 70h9M20 62h6M124 38h10M129 30h5" stroke="#86d3a6" stroke-width="2" stroke-linecap="round" data-v-2ca8deaf></path><path d="M56 30h24l12 12v38a4 4 0 0 1-4 4H56a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" fill="#fff" stroke="#16a34a" stroke-width="3" stroke-linejoin="round" data-v-2ca8deaf></path><path d="M80 30v12h12" stroke="#16a34a" stroke-width="3" stroke-linejoin="round" data-v-2ca8deaf></path><path d="M60 52h12M60 60h8" stroke="#86d3a6" stroke-width="3" stroke-linecap="round" data-v-2ca8deaf></path><circle cx="86" cy="76" r="14" fill="#16a34a" data-v-2ca8deaf></circle><path d="M79.5 76.5l4.5 4.5 8-9" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" data-v-2ca8deaf></path></svg></div>', 1)),
                    _.value.length ? (r(), n(v, { key: 0 }, [
                      a[41] || (a[41] = e("div", { class: "qcar-empty-title" }, "No requests match your filters", -1)),
                      a[42] || (a[42] = e("div", { class: "qcar-empty-sub" }, "Try a different search or status.", -1))
                    ], 64)) : (r(), n(v, { key: 1 }, [
                      a[43] || (a[43] = e("div", { class: "qcar-empty-title" }, "No QC Approval Requests found", -1)),
                      a[44] || (a[44] = e("div", { class: "qcar-empty-sub" }, "Requests are auto-created when a QC Inspection fails", -1))
                    ], 64))
                  ])
                ]))
              ], 64))
            ])
          ])
        ]),
        !x.value && g.value.length ? (r(), n("div", sa, [
          ee(le, {
            page: L.value,
            "onUpdate:page": a[13] || (a[13] = (s) => L.value = s),
            "page-size": y.value,
            "onUpdate:pageSize": a[14] || (a[14] = (s) => y.value = s),
            "total-items": g.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : c("", !0)
      ]),
      e("div", ta, [
        x.value ? (r(), n(v, { key: 0 }, V(4, (s) => e("div", {
          key: s,
          class: "qcar-mcard"
        }, [...a[46] || (a[46] = [
          e("div", {
            class: "qcar-shimmer",
            style: { height: "70px" }
          }, null, -1)
        ])])), 64)) : (r(), n(v, { key: 1 }, [
          (r(!0), n(v, null, V(Y.value, (s) => (r(), n("div", {
            key: s.name,
            class: "qcar-mcard",
            onClick: (S) => G(s)
          }, [
            e("div", oa, [
              e("span", na, l(s.name), 1),
              e("span", {
                class: m(["qcar-status-badge", W(s.approval_status)])
              }, l(s.approval_status), 3)
            ]),
            e("div", ra, l(s.item), 1),
            e("div", ia, l(s.inspection_type) + " · " + l(s.reference_type) + " / " + l(s.reference_name || "—"), 1),
            e("div", da, [
              e("span", ca, l(s.qc_inspection), 1),
              e("span", null, l(J(s.requested_by)), 1),
              e("span", null, l(d(R)(s.request_date)), 1)
            ])
          ], 8, la))), 128)),
          g.value.length ? c("", !0) : (r(), n("div", ua, [
            e("div", va, l(_.value.length ? "No requests match your filters" : "No QC Approval Requests found"), 1),
            e("div", pa, l(_.value.length ? "Try a different search or status." : "Requests are auto-created when a QC Inspection fails"), 1)
          ])),
          g.value.length ? (r(), n("div", qa, [
            ee(le, {
              page: L.value,
              "onUpdate:page": a[15] || (a[15] = (s) => L.value = s),
              "page-size": y.value,
              "onUpdate:pageSize": a[16] || (a[16] = (s) => y.value = s),
              "total-items": g.value.length
            }, null, 8, ["page", "page-size", "total-items"])
          ])) : c("", !0)
        ], 64))
      ]),
      k.value ? (r(), n("div", {
        key: 0,
        class: "qcar-overlay",
        onClick: a[17] || (a[17] = ae((s) => k.value = !1, ["self"]))
      })) : c("", !0),
      e("div", {
        class: m(["qcar-drawer", { open: k.value }])
      }, [
        o.value ? (r(), n(v, { key: 0 }, [
          e("div", fa, [
            e("button", {
              class: "qcar-dclose",
              onClick: a[18] || (a[18] = (s) => k.value = !1)
            }, [
              e("span", {
                innerHTML: d(M)("x", 16)
              }, null, 8, _a)
            ]),
            e("div", ka, [
              a[47] || (a[47] = e("div", { class: "qcar-dh-ico" }, [
                e("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "#fff",
                  "stroke-width": "2"
                }, [
                  e("path", { d: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" }),
                  e("rect", {
                    x: "9",
                    y: "3",
                    width: "6",
                    height: "4",
                    rx: "1"
                  })
                ])
              ], -1)),
              e("div", null, [
                e("div", ha, l(o.value.name), 1),
                e("div", ma, "QC Approval Request · " + l(d(R)(o.value.request_date)), 1)
              ]),
              e("span", {
                class: m(["qcar-status-badge", W(o.value.approval_status)]),
                style: { "margin-left": "auto", "flex-shrink": "0" }
              }, l(o.value.approval_status), 3)
            ])
          ]),
          e("div", ya, [
            e("div", ba, [
              e("div", null, [
                a[48] || (a[48] = e("span", { class: "qcar-info-lbl" }, "QC Inspection", -1)),
                e("div", ga, l(o.value.qc_inspection), 1)
              ]),
              e("div", null, [
                a[49] || (a[49] = e("span", { class: "qcar-info-lbl" }, "Item", -1)),
                e("div", wa, l(o.value.item), 1)
              ]),
              e("div", null, [
                a[50] || (a[50] = e("span", { class: "qcar-info-lbl" }, "Inspection Type", -1)),
                e("div", Ca, l(o.value.inspection_type), 1)
              ]),
              e("div", null, [
                a[51] || (a[51] = e("span", { class: "qcar-info-lbl" }, "Reference", -1)),
                e("div", Ma, l(o.value.reference_type) + " / " + l(o.value.reference_name), 1)
              ]),
              e("div", null, [
                a[52] || (a[52] = e("span", { class: "qcar-info-lbl" }, "Requested By", -1)),
                e("div", Ra, l(o.value.requested_by), 1)
              ]),
              e("div", null, [
                a[53] || (a[53] = e("span", { class: "qcar-info-lbl" }, "Request Date", -1)),
                e("div", xa, l(d(R)(o.value.request_date)), 1)
              ])
            ]),
            o.value.approval_remarks ? (r(), n("div", La, [
              a[54] || (a[54] = e("div", { class: "qcar-sec-lbl" }, "Request Remarks", -1)),
              e("div", Ta, l(o.value.approval_remarks), 1)
            ])) : c("", !0),
            o.value.approval_status !== "Pending" ? (r(), n("div", ja, [
              e("div", Ha, l(o.value.approval_status === "Approved" ? "Approval" : "Rejection") + " Details", 1),
              e("div", Aa, [
                e("div", null, [
                  a[55] || (a[55] = e("span", { class: "qcar-info-lbl" }, "By", -1)),
                  e("div", Sa, l(o.value.approved_by || "—"), 1)
                ]),
                e("div", null, [
                  a[56] || (a[56] = e("span", { class: "qcar-info-lbl" }, "Date", -1)),
                  e("div", $a, l(d(R)(o.value.approval_date)), 1)
                ])
              ]),
              o.value.rejection_reason ? (r(), n("div", Va, [
                a[57] || (a[57] = e("div", {
                  class: "qcar-sec-lbl",
                  style: { color: "#dc2626" }
                }, "Rejection Reason", -1)),
                e("div", Qa, l(o.value.rejection_reason), 1)
              ])) : c("", !0)
            ])) : c("", !0),
            o.value.approval_status === "Approved" ? (r(), n("div", Ba, [
              a[61] || (a[61] = e("div", { class: "qcar-sec-lbl" }, "Quarantine Hold", -1)),
              F.value ? (r(), n("div", Ia, "Checking hold status…")) : b.value && b.value.qc_hold ? (r(), n(v, { key: 1 }, [
                e("div", Na, [
                  a[58] || (a[58] = u(" Item ", -1)),
                  e("strong", null, l(o.value.item), 1),
                  u(" is still in quarantine" + l(b.value.quarantine_warehouse ? " (" + b.value.quarantine_warehouse + ")" : "") + ". Choose a disposition to release it. ", 1)
                ]),
                e("div", Ua, [
                  $(e("select", {
                    "onUpdate:modelValue": a[19] || (a[19] = (s) => q.disposition = s),
                    class: "qcar-input"
                  }, [...a[59] || (a[59] = [
                    e("option", { value: "Release to Stock" }, "Release to Stock", -1),
                    e("option", { value: "Scrap" }, "Scrap", -1),
                    e("option", { value: "Return to Supplier" }, "Return to Supplier", -1)
                  ])], 512), [
                    [se, q.disposition]
                  ]),
                  q.disposition !== "Scrap" ? $((r(), n("select", {
                    key: 0,
                    "onUpdate:modelValue": a[20] || (a[20] = (s) => q.target_warehouse = s),
                    class: "qcar-input"
                  }, [
                    a[60] || (a[60] = e("option", { value: "" }, "— Select target warehouse —", -1)),
                    (r(!0), n(v, null, V(U.value, (s) => (r(), n("option", {
                      key: s.name,
                      value: s.name
                    }, l(s.warehouse_name || s.name), 9, za))), 128))
                  ], 512)), [
                    [se, q.target_warehouse]
                  ]) : c("", !0),
                  e("button", {
                    class: "qcar-btn-approve",
                    disabled: z.value || !t.$canEdit("inventory"),
                    onClick: ne
                  }, [
                    e("span", {
                      innerHTML: d(M)("check", 13)
                    }, null, 8, Pa),
                    u(l(z.value ? "Releasing…" : "Release from Hold"), 1)
                  ], 8, Da)
                ])
              ], 64)) : (r(), n("div", Ea, " Not currently on hold — stock has already been released (or no quarantine warehouse was configured). "))
            ])) : c("", !0),
            o.value.approval_status === "Pending" ? (r(), n("div", Fa, [
              a[62] || (a[62] = e("div", { class: "qcar-sec-lbl" }, "Action", -1)),
              e("div", Wa, [
                $(e("textarea", {
                  "onUpdate:modelValue": a[21] || (a[21] = (s) => I.value = s),
                  class: "qcar-input",
                  rows: "2",
                  placeholder: "Remarks (optional for approve, required for reject)…"
                }, null, 512), [
                  [X, I.value]
                ]),
                N.value ? $((r(), n("textarea", {
                  key: 0,
                  "onUpdate:modelValue": a[22] || (a[22] = (s) => H.value = s),
                  class: "qcar-input",
                  rows: "2",
                  placeholder: "Rejection reason (required)…",
                  style: { "border-color": "#fca5a5" }
                }, null, 512)), [
                  [X, H.value]
                ]) : c("", !0),
                e("div", Ga, [
                  e("button", {
                    class: "qcar-btn-approve",
                    disabled: h.value || !t.$canEdit("inventory"),
                    onClick: re
                  }, [
                    e("span", {
                      innerHTML: d(M)("check", 13)
                    }, null, 8, Xa),
                    u(l(h.value && A.value === "approve" ? "Approving…" : "Approve"), 1)
                  ], 8, Oa),
                  e("button", {
                    class: "qcar-btn-reject",
                    disabled: h.value || !t.$canEdit("inventory"),
                    onClick: ie
                  }, [
                    e("span", {
                      innerHTML: d(M)("x", 13)
                    }, null, 8, Ka),
                    u(l(h.value && A.value === "reject" ? "Rejecting…" : "Reject"), 1)
                  ], 8, Ja)
                ])
              ])
            ])) : c("", !0),
            o.value.owner ? (r(), n("div", Ya, [
              u(" Created by " + l(d(te)(o.value.owner)) + " on " + l(d(R)(o.value.creation)) + " ", 1),
              o.value.modified_by ? (r(), n(v, { key: 0 }, [
                u(" · Last modified by " + l(d(te)(o.value.modified_by)) + " on " + l(d(R)(o.value.modified)), 1)
              ], 64)) : c("", !0)
            ])) : c("", !0)
          ]),
          e("div", Za, [
            e("button", {
              class: "qcar-btn-ghost",
              onClick: a[23] || (a[23] = (s) => k.value = !1)
            }, "Close")
          ])
        ], 64)) : c("", !0)
      ], 2)
    ]));
  }
}, ns = /* @__PURE__ */ de(es, [["__scopeId", "data-v-2ca8deaf"]]);
export {
  ns as default
};
