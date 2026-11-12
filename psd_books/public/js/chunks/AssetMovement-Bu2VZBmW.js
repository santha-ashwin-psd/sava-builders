import { _ as Me, x as Ce, y as re, h as v, o as Le, c as i, a as e, u as d, i as r, w as y, A as T, F as _, r as V, d as p, t as l, b as C, D as z, C as He, q as ue, n as b, v as Se, H as xe, f as P, g, z as we, X as J, K as De, L as $e, a8 as Ae, a3 as Ve, k as o } from "./main-BOYBNf1s.js";
import { b as ce } from "./format-BcJZDVG4.js";
import { o as ve } from "./userNames-BrQufZNP.js";
import { _ as Q } from "./SearchableSelect-BS2QSN1g.js";
import { P as Re } from "./Pagination-CPYbAXVg.js";
const Ne = { class: "list-page" }, Ue = { class: "sales-toolbar" }, Ie = { class: "sales-search" }, Ee = ["innerHTML"], Oe = { class: "sales-pills" }, ze = ["onClick"], Pe = {
  key: 0,
  class: "sales-pill-count"
}, qe = { class: "sales-actions" }, Be = ["disabled"], Fe = ["innerHTML"], je = ["disabled", "title"], Ge = ["innerHTML"], Ke = { class: "bk-kpi-grid" }, We = { class: "bk-kpi-inner" }, Xe = {
  class: "bk-kpi-icon",
  style: { background: "#dbeafe" }
}, Ye = ["innerHTML"], Je = { class: "bk-kpi-body" }, Qe = { class: "bk-kpi-value" }, Ze = { class: "bk-kpi-inner" }, es = {
  class: "bk-kpi-icon",
  style: { background: "#dcfce7" }
}, ss = ["innerHTML"], ts = { class: "bk-kpi-body" }, as = { class: "bk-kpi-value bk-kpi-green" }, ns = { class: "bk-kpi-inner" }, ls = {
  class: "bk-kpi-icon",
  style: { background: "#fef3c7" }
}, os = ["innerHTML"], is = { class: "bk-kpi-body" }, ds = { class: "bk-kpi-value bk-kpi-amber" }, rs = { class: "bk-kpi-inner" }, us = {
  class: "bk-kpi-icon",
  style: { background: "#eef2ff" }
}, cs = ["innerHTML"], vs = { class: "bk-kpi-body" }, ps = { class: "bk-kpi-value" }, ms = { class: "inv-table-wrap" }, fs = { class: "inv-table inv-desktop-table" }, bs = ["onClick"], _s = { class: "text-muted mono-sm" }, ks = { class: "inv-link" }, ys = { class: "asset-code" }, gs = {
  class: "text-muted",
  style: { "font-size": "12.5px" }
}, hs = {
  class: "text-muted",
  style: { "font-size": "12.5px" }
}, Ts = ["onClick"], Ms = ["innerHTML"], Cs = { key: 0 }, Ls = {
  colspan: "8",
  class: "bk-empty-state"
}, Hs = { class: "bk-empty-inner" }, Ss = ["disabled", "title"], xs = ["innerHTML"], ws = { class: "assets-mobile-cards" }, Ds = {
  key: 1,
  style: { "text-align": "center", padding: "40px", color: "#868E96" }
}, $s = ["onClick"], As = { class: "ii-mob-card-main" }, Vs = { class: "ii-mob-card-top" }, Rs = { class: "inv-link" }, Ns = { style: { "font-size": "12px", color: "#6b7280", "margin-top": "4px" } }, Us = { style: { display: "flex", "justify-content": "space-between", "margin-top": "6px", "font-size": "12px", color: "#475569" } }, Is = {
  key: 0,
  style: { padding: "12px 0px 4px" }
}, Es = { class: "inv-drawer-panel is-add" }, Os = { class: "inv-dh" }, zs = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, Ps = { class: "inv-dh-title" }, qs = {
  key: 0,
  class: "add-status-badge"
}, Bs = ["innerHTML"], Fs = { class: "inv-dbody" }, js = {
  key: 0,
  class: "shimmer",
  style: { height: "200px", "border-radius": "10px" }
}, Gs = {
  key: 0,
  class: "am-notice"
}, Ks = ["innerHTML"], Ws = { class: "add-card" }, Xs = { class: "add-card-title" }, Ys = { class: "add-card-title-icon" }, Js = ["innerHTML"], Qs = ["innerHTML"], Zs = { class: "inv-fg inv-fg2" }, et = ["disabled"], st = ["disabled"], tt = ["value"], at = {
  key: 0,
  class: "am-preview-box"
}, nt = { class: "am-preview-row" }, lt = { class: "mono-sm" }, ot = { class: "am-preview-row" }, it = { class: "mono-sm" }, dt = { class: "am-purpose-hint" }, rt = { class: "add-card" }, ut = { class: "add-card-title" }, ct = { class: "add-card-title-icon" }, vt = ["innerHTML"], pt = ["innerHTML"], mt = { class: "inv-fg inv-fg2" }, ft = ["disabled"], bt = ["disabled"], _t = { class: "add-card" }, kt = { class: "add-card-title" }, yt = { class: "add-card-title-icon" }, gt = ["innerHTML"], ht = ["innerHTML"], Tt = { class: "inv-fg inv-fg2" }, Mt = ["disabled"], Ct = ["disabled"], Lt = { class: "add-card" }, Ht = { class: "add-card-title" }, St = { class: "add-card-title-icon" }, xt = ["innerHTML"], wt = ["innerHTML"], Dt = { class: "inv-fg inv-fg2" }, $t = ["disabled"], At = ["disabled"], Vt = { style: { "margin-top": "14px" } }, Rt = ["disabled"], Nt = {
  key: 2,
  class: "inv-view-footer"
}, Ut = { class: "inv-dfooter" }, It = ["disabled"], Et = ["innerHTML"], Ot = ["disabled"], zt = ["innerHTML"], Pt = { class: "add-footer-status" }, qt = ["disabled", "title"], Bt = ["innerHTML"], Ft = {
  __name: "AssetMovement",
  setup(jt) {
    const m = Ce(), { confirm: pe } = Ve();
    function me() {
      const a = /* @__PURE__ */ new Date(), s = (t) => String(t).padStart(2, "0");
      return `${a.getFullYear()}-${s(a.getMonth() + 1)}-${s(a.getDate())}`;
    }
    const S = v(!1), k = v([]), w = v(""), M = v(""), L = v(""), R = v(1), N = v(20), fe = [
      { key: "", label: "All" },
      { key: "Transfer", label: "Transfer" },
      { key: "Issue", label: "Issue" },
      { key: "Receipt", label: "Receipt" }
    ], Z = g(() => ({
      draft: k.value.filter((a) => a.docstatus === 0).length,
      submitted: k.value.filter((a) => a.docstatus === 1).length,
      cancelled: k.value.filter((a) => a.docstatus === 2).length
    })), be = g(() => {
      const a = {};
      for (const s of ["Transfer", "Issue", "Receipt"])
        a[s] = k.value.filter((t) => t.purpose === s).length;
      return a;
    }), _e = g(() => new Set(k.value.map((a) => a.asset).filter(Boolean)).size);
    async function D() {
      S.value = !0;
      try {
        const a = [
          "name",
          "asset",
          "company",
          "purpose",
          "movement_date",
          "source_location",
          "source_department",
          "source_custodian",
          "target_location",
          "target_department",
          "target_custodian",
          "docstatus",
          "modified"
        ];
        k.value = await P("Asset Movement", { fields: a, limit: 1e3, order: "movement_date desc" }) || [];
        const s = [...new Set(k.value.map((t) => t.asset).filter(Boolean))];
        if (s.length) {
          const t = await P("Asset", {
            fields: ["name", "asset_name"],
            filters: [["name", "in", s]],
            limit: s.length
          }), u = Object.fromEntries((t || []).map((h) => [h.name, h.asset_name]));
          k.value.forEach((h) => {
            h.asset_name = u[h.asset] || h.asset;
          });
        }
      } catch (a) {
        m.error("Failed to load movements: " + a.message), k.value = [];
      }
      S.value = !1;
    }
    const $ = g(() => {
      let a = k.value;
      M.value === "draft" ? a = a.filter((t) => t.docstatus === 0) : M.value === "submitted" ? a = a.filter((t) => t.docstatus === 1) : M.value === "cancelled" && (a = a.filter((t) => t.docstatus === 2)), L.value && (a = a.filter((t) => t.purpose === L.value));
      const s = w.value.toLowerCase().trim();
      return s && (a = a.filter(
        (t) => (t.name || "").toLowerCase().includes(s) || (t.asset || "").toLowerCase().includes(s) || (t.asset_name || "").toLowerCase().includes(s)
      )), a;
    }), ee = g(() => {
      const a = (R.value - 1) * N.value;
      return $.value.slice(a, a + N.value);
    });
    re([w, M, L], () => {
      R.value = 1;
    });
    function q(a) {
      return a.docstatus === 1 ? "Submitted" : a.docstatus === 2 ? "Cancelled" : "Draft";
    }
    function B(a) {
      return a.docstatus === 1 ? "status-submitted" : a.docstatus === 2 ? "status-cancelled" : "status-draft";
    }
    function ke(a) {
      return a === "Issue" ? "am-purpose-issue" : a === "Receipt" ? "am-purpose-receipt" : "am-purpose-transfer";
    }
    function se(a) {
      return [a.source_location, a.source_department, a.source_custodian].filter(Boolean).join(" / ") || "—";
    }
    function te(a) {
      return [a.target_location, a.target_department, a.target_custodian].filter(Boolean).join(" / ") || "—";
    }
    const U = v(!1), I = v(null), H = g(() => I.value === null), F = v(!1), A = v(!1), E = v(!1), f = g(() => H.value || n.value.docstatus === 0), c = we({ details: !1, from: !1, to: !1, ref: !0 });
    function ae() {
      return {
        doctype: "Asset Movement",
        asset: "",
        company: window.__booksCompany || "",
        purpose: "Transfer",
        movement_date: me(),
        source_location: "",
        source_department: "",
        source_custodian: "",
        target_location: "",
        target_department: "",
        target_custodian: "",
        reference_doctype: "",
        reference_name: "",
        remarks: "",
        docstatus: 0
      };
    }
    const n = v(ae()), ye = g(() => {
      const a = n.value.purpose;
      return a === "Transfer" ? "Moves the asset between company locations, departments, or custodians. Fill in at least one Target field." : a === "Issue" ? "Moves the asset out to a custodian (e.g. field staff) — leave Target Location/Department blank, use Target Custodian only." : a === "Receipt" ? "Returns the asset to a company location — Target Location and/or Target Department is required." : "";
    });
    re(() => n.value.purpose, (a) => {
      a === "Issue" && (n.value.target_location = "", n.value.target_department = "");
    });
    const j = v([]), x = v({}), G = g(() => x.value[n.value.asset] || null);
    let ne = null;
    function le(a = "") {
      clearTimeout(ne), ne = setTimeout(async () => {
        try {
          const s = [["docstatus", "=", 1]];
          a && s.push(["asset_name", "like", `%${a}%`]);
          const t = await P("Asset", {
            fields: ["name", "asset_name", "company", "location", "department"],
            filters: s,
            limit: 30,
            order: "asset_name asc"
          });
          j.value = (t || []).map((u) => ({ value: u.name, label: u.asset_name ? `${u.asset_name} (${u.name})` : u.name }));
          for (const u of t || []) x.value[u.name] = u;
        } catch {
          j.value = [];
        }
      }, 250);
    }
    async function ge(a) {
      if (!a) return;
      let s = x.value[a];
      if (!s)
        try {
          s = await J("Asset", a), x.value[a] = s;
        } catch (t) {
          m.error("Could not load asset: " + t.message);
          return;
        }
      n.value.company = s.company || n.value.company, n.value.source_location || (n.value.source_location = s.location || ""), n.value.source_department || (n.value.source_department = s.department || "");
    }
    const K = v([]), oe = g(() => K.value.map((a) => ({ value: a.name, label: a.department_name || a.name })));
    async function W(a = "") {
      try {
        const s = [];
        a && s.push(["name", "like", `%${a}%`]), K.value = await P("Department", { fields: ["name", "department_name"], filters: s, limit: 30, order: "name asc" });
      } catch {
        K.value = [];
      }
    }
    function ie() {
      I.value = null, n.value = ae(), U.value = !0;
    }
    function X(a) {
      I.value = a.name, U.value = !0, Y(a.name);
    }
    function O() {
      U.value = !1;
    }
    async function Y(a) {
      F.value = !0;
      try {
        const s = await J("Asset Movement", a);
        if (n.value = s, s.asset && !x.value[s.asset])
          try {
            x.value[s.asset] = await J("Asset", s.asset);
          } catch {
          }
      } catch (s) {
        m.error("Could not load " + a + ": " + s.message);
      }
      F.value = !1;
    }
    function he() {
      if (!n.value.asset)
        return m.error("Select an asset to move."), !1;
      if (!n.value.movement_date)
        return m.error("Movement Date is required."), !1;
      const a = n.value;
      return a.purpose === "Transfer" && !(a.target_location || a.target_department || a.target_custodian) ? (m.error("Transfer requires at least one of Target Location, Target Department or Target Custodian."), !1) : a.purpose === "Issue" && !(a.source_location || a.source_department || a.source_custodian) ? (m.error("Issue requires at least one of Source Location, Source Department or Source Custodian."), !1) : a.purpose === "Receipt" && !(a.target_location || a.target_department) ? (m.error("Receipt requires Target Location and/or Target Department."), !1) : !0;
    }
    async function de(a) {
      if (he()) {
        A.value = !0;
        try {
          const s = { ...n.value };
          H.value && delete s.name, s.company || (s.company = window.__booksCompany || "");
          const t = await De(s), u = (t == null ? void 0 : t.name) || s.name;
          if (I.value = u, n.value = t, a === "Submitted" && (t == null ? void 0 : t.docstatus) !== 1)
            try {
              await $e("Asset Movement", u), await Y(u), m.success("Movement submitted.");
            } catch (h) {
              m.error("Saved as draft — submit failed: " + (h.message || h)), D();
              return;
            }
          else
            m.success(H.value ? "Movement saved" : "Movement updated");
          D();
        } catch (s) {
          m.error("Failed to save movement: " + s.message);
        } finally {
          A.value = !1;
        }
      }
    }
    async function Te() {
      if (await pe({
        title: "Cancel Movement",
        body: `Cancel ${n.value.name}? This reverts the asset's location/department back to this movement's source values.`,
        okLabel: "Cancel Movement",
        okStyle: "danger"
      })) {
        E.value = !0;
        try {
          await Ae("Asset Movement", n.value.name), m.success("Movement cancelled."), await Y(n.value.name), D();
        } catch (s) {
          m.error("Cancel failed: " + s.message);
        } finally {
          E.value = !1;
        }
      }
    }
    return Le(() => {
      D(), le(), W();
    }), (a, s) => (o(), i("div", Ne, [
      e("div", Ue, [
        e("div", Ie, [
          e("span", {
            innerHTML: d(r)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Ee),
          y(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (t) => w.value = t),
            placeholder: "Search by movement#, asset…",
            class: "sales-search-input"
          }, null, 512), [
            [T, w.value]
          ])
        ]),
        e("div", Oe, [
          (o(), i(_, null, V(fe, (t) => e("button", {
            key: t.key,
            class: b(["sales-pill", { active: L.value === t.key }]),
            onClick: (u) => L.value = t.key
          }, [
            p(l(t.label), 1),
            t.key ? (o(), i("span", Pe, l(be.value[t.key] || 0), 1)) : C("", !0)
          ], 10, ze)), 64))
        ]),
        e("div", qe, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: D,
            title: "Refresh",
            disabled: S.value
          }, [
            e("span", {
              innerHTML: d(r)("refresh", 14)
            }, null, 8, Fe)
          ], 8, Be),
          e("button", {
            class: "sales-btn-primary",
            disabled: !a.$canCreate("inventory"),
            title: a.$canCreate("inventory") ? "" : "Read-only access",
            onClick: ie
          }, [
            e("span", {
              innerHTML: d(r)("plus", 13)
            }, null, 8, Ge),
            s[26] || (s[26] = p(" New Movement", -1))
          ], 8, je)
        ])
      ]),
      e("div", Ke, [
        e("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: s[1] || (s[1] = (t) => M.value = "")
        }, [
          e("div", We, [
            e("div", Xe, [
              e("span", {
                innerHTML: d(r)("truck", 22)
              }, null, 8, Ye)
            ]),
            e("div", Je, [
              s[27] || (s[27] = e("div", { class: "bk-kpi-label" }, "Total Movements", -1)),
              e("div", Qe, l(k.value.length), 1),
              s[28] || (s[28] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "transfer + issue + receipt", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-success clickable",
          onClick: s[2] || (s[2] = (t) => M.value = "submitted")
        }, [
          e("div", Ze, [
            e("div", es, [
              e("span", {
                innerHTML: d(r)("check", 22)
              }, null, 8, ss)
            ]),
            e("div", ts, [
              s[29] || (s[29] = e("div", { class: "bk-kpi-label" }, "Submitted", -1)),
              e("div", as, l(Z.value.submitted || 0), 1),
              s[30] || (s[30] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "applied to assets", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: s[3] || (s[3] = (t) => M.value = "draft")
        }, [
          e("div", ns, [
            e("div", ls, [
              e("span", {
                innerHTML: d(r)("edit", 22)
              }, null, 8, os)
            ]),
            e("div", is, [
              s[31] || (s[31] = e("div", { class: "bk-kpi-label" }, "Draft", -1)),
              e("div", ds, l(Z.value.draft || 0), 1),
              s[32] || (s[32] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "not yet applied", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: s[4] || (s[4] = (t) => L.value = "")
        }, [
          e("div", rs, [
            e("div", us, [
              e("span", {
                innerHTML: d(r)("box", 22)
              }, null, 8, cs)
            ]),
            e("div", vs, [
              s[33] || (s[33] = e("div", { class: "bk-kpi-label" }, "Assets Moved", -1)),
              e("div", ps, l(_e.value), 1),
              s[34] || (s[34] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "unique assets touched", -1))
            ])
          ])
        ])
      ]),
      e("div", ms, [
        e("table", fs, [
          s[41] || (s[41] = e("thead", null, [
            e("tr", null, [
              e("th", null, "DATE"),
              e("th", null, "MOVEMENT#"),
              e("th", null, "ASSET"),
              e("th", null, "PURPOSE"),
              e("th", null, "FROM"),
              e("th", null, "TO"),
              e("th", null, "STATUS"),
              e("th", { style: { width: "90px", "text-align": "center" } }, "ACTIONS")
            ])
          ], -1)),
          e("tbody", null, [
            S.value ? (o(), i(_, { key: 0 }, V(6, (t) => e("tr", {
              key: t,
              class: "shimmer-row"
            }, [...s[35] || (s[35] = [
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
                  style: { width: "70px" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "100px" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "100px" }
                })
              ], -1),
              e("td", null, [
                e("div", {
                  class: "shimmer",
                  style: { width: "70px" }
                })
              ], -1),
              e("td", null, null, -1)
            ])])), 64)) : (o(), i(_, { key: 1 }, [
              (o(!0), i(_, null, V(ee.value, (t) => (o(), i("tr", {
                key: t.name,
                class: "inv-row",
                onClick: (u) => X(t)
              }, [
                e("td", _s, l(t.movement_date), 1),
                e("td", null, [
                  e("span", ks, l(t.name), 1)
                ]),
                e("td", null, [
                  p(l(t.asset_name || t.asset), 1),
                  e("div", ys, l(t.asset), 1)
                ]),
                e("td", null, [
                  e("span", {
                    class: b(["am-purpose-badge", ke(t.purpose)])
                  }, l(t.purpose), 3)
                ]),
                e("td", gs, l(se(t)), 1),
                e("td", hs, l(te(t)), 1),
                e("td", null, [
                  e("span", {
                    class: b(["inv-status-badge", B(t)])
                  }, l(q(t)), 3)
                ]),
                e("td", {
                  style: { "text-align": "center" },
                  onClick: s[5] || (s[5] = ue(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "inv-act-btn",
                    onClick: (u) => X(t),
                    title: "View"
                  }, [
                    e("span", {
                      innerHTML: d(r)("eye", 13)
                    }, null, 8, Ms)
                  ], 8, Ts)
                ])
              ], 8, bs))), 128)),
              $.value.length ? C("", !0) : (o(), i("tr", Cs, [
                e("td", Ls, [
                  e("div", Hs, [
                    w.value || M.value || L.value ? (o(), i(_, { key: 0 }, [
                      s[36] || (s[36] = e("svg", {
                        width: "44",
                        height: "44",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#cbd5e1",
                        "stroke-width": "1.3"
                      }, [
                        e("circle", {
                          cx: "11",
                          cy: "11",
                          r: "8"
                        }),
                        e("line", {
                          x1: "21",
                          y1: "21",
                          x2: "16.65",
                          y2: "16.65"
                        })
                      ], -1)),
                      s[37] || (s[37] = e("p", { class: "bk-empty-title" }, "No movements match your filters", -1))
                    ], 64)) : (o(), i(_, { key: 1 }, [
                      s[39] || (s[39] = e("p", { class: "bk-empty-title" }, "No asset movements yet", -1)),
                      s[40] || (s[40] = e("p", { class: "bk-empty-sub" }, "Record a transfer, issue or receipt to track where an asset is.", -1)),
                      e("button", {
                        class: "bk-empty-btn",
                        disabled: !a.$canCreate("inventory"),
                        title: a.$canCreate("inventory") ? "" : "Read-only access",
                        onClick: ie
                      }, [
                        e("span", {
                          innerHTML: d(r)("plus", 13)
                        }, null, 8, xs),
                        s[38] || (s[38] = p(" New Movement", -1))
                      ], 8, Ss)
                    ], 64))
                  ])
                ])
              ]))
            ], 64))
          ])
        ]),
        e("div", ws, [
          S.value ? (o(), i(_, { key: 0 }, V(4, (t) => e("div", {
            key: t,
            class: "b-shimmer",
            style: { height: "86px", "border-radius": "10px" }
          })), 64)) : $.value.length ? (o(!0), i(_, { key: 2 }, V(ee.value, (t) => (o(), i("div", {
            key: t.name,
            class: "ii-mob-card",
            onClick: (u) => X(t)
          }, [
            e("div", As, [
              e("div", Vs, [
                e("span", Rs, l(t.name), 1),
                e("span", {
                  class: b(["inv-status-badge", B(t)])
                }, l(q(t)), 3)
              ]),
              e("div", Ns, l(t.asset_name || t.asset) + " • " + l(t.purpose), 1),
              e("div", Us, [
                e("span", null, l(se(t)), 1),
                e("span", null, "→ " + l(te(t)), 1)
              ])
            ])
          ], 8, $s))), 128)) : (o(), i("div", Ds, "No movements found"))
        ])
      ]),
      !S.value && $.value.length ? (o(), i("div", Is, [
        z(Re, {
          page: R.value,
          "onUpdate:page": s[6] || (s[6] = (t) => R.value = t),
          "page-size": N.value,
          "onUpdate:pageSize": s[7] || (s[7] = (t) => N.value = t),
          "total-items": $.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : C("", !0),
      (o(), He(xe, { to: "body" }, [
        U.value ? (o(), i("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: ue(O, ["self"])
        }, [
          e("div", Es, [
            e("div", Os, [
              e("div", zs, [
                e("div", Ps, l(H.value ? "New Asset Movement" : n.value.name), 1),
                H.value ? (o(), i("span", qs, "Draft")) : (o(), i("span", {
                  key: 1,
                  class: b(["inv-status-badge", B(n.value)])
                }, l(q(n.value)), 3))
              ]),
              e("button", {
                class: "inv-dclose",
                onClick: O,
                title: "Close"
              }, [
                e("span", {
                  innerHTML: d(r)("x", 16)
                }, null, 8, Bs)
              ])
            ]),
            e("div", Fs, [
              F.value ? (o(), i("div", js)) : (o(), i(_, { key: 1 }, [
                n.value.docstatus === 1 ? (o(), i("div", Gs, [
                  e("span", {
                    innerHTML: d(r)("check", 14)
                  }, null, 8, Ks),
                  e("span", null, " Submitted — Asset " + l(n.value.asset) + " location/department updated to the target values below. ", 1)
                ])) : C("", !0),
                e("div", Ws, [
                  e("div", {
                    class: "add-card-header",
                    onClick: s[8] || (s[8] = (t) => c.details = !c.details)
                  }, [
                    e("div", Xs, [
                      e("span", Ys, [
                        e("span", {
                          innerHTML: d(r)("truck", 16)
                        }, null, 8, Js)
                      ]),
                      s[42] || (s[42] = p(" Movement Details ", -1))
                    ]),
                    e("span", {
                      class: b(["add-card-chevron", { collapsed: c.details }])
                    }, [
                      e("span", {
                        innerHTML: d(r)("chevD", 14)
                      }, null, 8, Qs)
                    ], 2)
                  ]),
                  e("div", {
                    class: b(["add-card-body", { collapsed: c.details }])
                  }, [
                    e("div", Zs, [
                      e("div", null, [
                        s[43] || (s[43] = e("label", { class: "inv-lbl" }, [
                          p("Asset "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        z(Q, {
                          modelValue: n.value.asset,
                          "onUpdate:modelValue": [
                            s[9] || (s[9] = (t) => n.value.asset = t),
                            ge
                          ],
                          options: j.value,
                          placeholder: "Select asset to move",
                          disabled: !f.value,
                          onSearch: le
                        }, null, 8, ["modelValue", "options", "disabled"])
                      ]),
                      e("div", null, [
                        s[45] || (s[45] = e("label", { class: "inv-lbl" }, [
                          p("Purpose "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        y(e("select", {
                          "onUpdate:modelValue": s[10] || (s[10] = (t) => n.value.purpose = t),
                          class: "inv-fi",
                          disabled: !f.value
                        }, [...s[44] || (s[44] = [
                          e("option", { value: "Transfer" }, "Transfer", -1),
                          e("option", { value: "Issue" }, "Issue", -1),
                          e("option", { value: "Receipt" }, "Receipt", -1)
                        ])], 8, et), [
                          [Se, n.value.purpose]
                        ])
                      ]),
                      e("div", null, [
                        s[46] || (s[46] = e("label", { class: "inv-lbl" }, [
                          p("Movement Date "),
                          e("span", { class: "inv-req" }, "*")
                        ], -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[11] || (s[11] = (t) => n.value.movement_date = t),
                          type: "date",
                          class: "inv-fi",
                          disabled: !f.value
                        }, null, 8, st), [
                          [T, n.value.movement_date]
                        ])
                      ]),
                      e("div", null, [
                        s[47] || (s[47] = e("label", { class: "inv-lbl" }, "Company", -1)),
                        e("input", {
                          value: n.value.company,
                          class: "inv-fi",
                          disabled: ""
                        }, null, 8, tt)
                      ])
                    ]),
                    G.value ? (o(), i("div", at, [
                      e("div", nt, [
                        s[48] || (s[48] = e("span", null, "Current Location", -1)),
                        e("span", lt, l(G.value.location || "—"), 1)
                      ]),
                      e("div", ot, [
                        s[49] || (s[49] = e("span", null, "Current Department", -1)),
                        e("span", it, l(G.value.department || "—"), 1)
                      ])
                    ])) : C("", !0),
                    e("p", dt, l(ye.value), 1)
                  ], 2)
                ]),
                e("div", rt, [
                  e("div", {
                    class: "add-card-header",
                    onClick: s[12] || (s[12] = (t) => c.from = !c.from)
                  }, [
                    e("div", ut, [
                      e("span", ct, [
                        e("span", {
                          innerHTML: d(r)("warehouse", 16)
                        }, null, 8, vt)
                      ]),
                      s[50] || (s[50] = p(" From ", -1))
                    ]),
                    e("span", {
                      class: b(["add-card-chevron", { collapsed: c.from }])
                    }, [
                      e("span", {
                        innerHTML: d(r)("chevD", 14)
                      }, null, 8, pt)
                    ], 2)
                  ]),
                  e("div", {
                    class: b(["add-card-body", { collapsed: c.from }])
                  }, [
                    e("div", mt, [
                      e("div", null, [
                        s[51] || (s[51] = e("label", { class: "inv-lbl" }, "Source Location", -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[13] || (s[13] = (t) => n.value.source_location = t),
                          type: "text",
                          class: "inv-fi",
                          placeholder: "Defaults to asset's current location",
                          disabled: !f.value
                        }, null, 8, ft), [
                          [T, n.value.source_location]
                        ])
                      ]),
                      e("div", null, [
                        s[52] || (s[52] = e("label", { class: "inv-lbl" }, "Source Department", -1)),
                        z(Q, {
                          modelValue: n.value.source_department,
                          "onUpdate:modelValue": s[14] || (s[14] = (t) => n.value.source_department = t),
                          options: oe.value,
                          placeholder: "Defaults to asset's current department",
                          disabled: !f.value,
                          onSearch: W
                        }, null, 8, ["modelValue", "options", "disabled"])
                      ]),
                      e("div", null, [
                        s[53] || (s[53] = e("label", { class: "inv-lbl" }, "Source Custodian", -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[15] || (s[15] = (t) => n.value.source_custodian = t),
                          type: "text",
                          class: "inv-fi",
                          placeholder: "Person currently holding the asset",
                          disabled: !f.value
                        }, null, 8, bt), [
                          [T, n.value.source_custodian]
                        ])
                      ])
                    ])
                  ], 2)
                ]),
                e("div", _t, [
                  e("div", {
                    class: "add-card-header",
                    onClick: s[16] || (s[16] = (t) => c.to = !c.to)
                  }, [
                    e("div", kt, [
                      e("span", yt, [
                        e("span", {
                          innerHTML: d(r)("order", 16)
                        }, null, 8, gt)
                      ]),
                      s[54] || (s[54] = p(" To ", -1))
                    ]),
                    e("span", {
                      class: b(["add-card-chevron", { collapsed: c.to }])
                    }, [
                      e("span", {
                        innerHTML: d(r)("chevD", 14)
                      }, null, 8, ht)
                    ], 2)
                  ]),
                  e("div", {
                    class: b(["add-card-body", { collapsed: c.to }])
                  }, [
                    e("div", Tt, [
                      e("div", null, [
                        s[55] || (s[55] = e("label", { class: "inv-lbl" }, "Target Location", -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[17] || (s[17] = (t) => n.value.target_location = t),
                          type: "text",
                          class: "inv-fi",
                          placeholder: "Where the asset is going",
                          disabled: !f.value || n.value.purpose === "Issue"
                        }, null, 8, Mt), [
                          [T, n.value.target_location]
                        ])
                      ]),
                      e("div", null, [
                        s[56] || (s[56] = e("label", { class: "inv-lbl" }, "Target Department", -1)),
                        z(Q, {
                          modelValue: n.value.target_department,
                          "onUpdate:modelValue": s[18] || (s[18] = (t) => n.value.target_department = t),
                          options: oe.value,
                          placeholder: "Department it's moving to",
                          disabled: !f.value || n.value.purpose === "Issue",
                          onSearch: W
                        }, null, 8, ["modelValue", "options", "disabled"])
                      ]),
                      e("div", null, [
                        s[57] || (s[57] = e("label", { class: "inv-lbl" }, "Target Custodian", -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[19] || (s[19] = (t) => n.value.target_custodian = t),
                          type: "text",
                          class: "inv-fi",
                          placeholder: "Person receiving the asset",
                          disabled: !f.value
                        }, null, 8, Ct), [
                          [T, n.value.target_custodian]
                        ])
                      ])
                    ])
                  ], 2)
                ]),
                e("div", Lt, [
                  e("div", {
                    class: "add-card-header",
                    onClick: s[20] || (s[20] = (t) => c.ref = !c.ref)
                  }, [
                    e("div", Ht, [
                      e("span", St, [
                        e("span", {
                          innerHTML: d(r)("file", 16)
                        }, null, 8, xt)
                      ]),
                      s[58] || (s[58] = p(" Reference & Remarks ", -1))
                    ]),
                    e("span", {
                      class: b(["add-card-chevron", { collapsed: c.ref }])
                    }, [
                      e("span", {
                        innerHTML: d(r)("chevD", 14)
                      }, null, 8, wt)
                    ], 2)
                  ]),
                  e("div", {
                    class: b(["add-card-body", { collapsed: c.ref }])
                  }, [
                    e("div", Dt, [
                      e("div", null, [
                        s[59] || (s[59] = e("label", { class: "inv-lbl" }, "Reference Document Type", -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[21] || (s[21] = (t) => n.value.reference_doctype = t),
                          type: "text",
                          class: "inv-fi",
                          placeholder: "e.g. Material Request",
                          disabled: !f.value
                        }, null, 8, $t), [
                          [T, n.value.reference_doctype]
                        ])
                      ]),
                      e("div", null, [
                        s[60] || (s[60] = e("label", { class: "inv-lbl" }, "Reference Document Name", -1)),
                        y(e("input", {
                          "onUpdate:modelValue": s[22] || (s[22] = (t) => n.value.reference_name = t),
                          type: "text",
                          class: "inv-fi",
                          disabled: !f.value || !n.value.reference_doctype
                        }, null, 8, At), [
                          [T, n.value.reference_name]
                        ])
                      ])
                    ]),
                    e("div", Vt, [
                      s[61] || (s[61] = e("label", { class: "inv-lbl" }, "Remarks", -1)),
                      y(e("textarea", {
                        "onUpdate:modelValue": s[23] || (s[23] = (t) => n.value.remarks = t),
                        class: "inv-fi",
                        rows: "2",
                        placeholder: "Optional notes",
                        disabled: !f.value
                      }, null, 8, Rt), [
                        [T, n.value.remarks]
                      ])
                    ])
                  ], 2)
                ])
              ], 64)),
              n.value.owner ? (o(), i("div", Nt, [
                p(" Created by " + l(d(ve)(n.value.owner)) + " on " + l(d(ce)(n.value.creation)) + " ", 1),
                n.value.modified_by ? (o(), i(_, { key: 0 }, [
                  p(" · Last modified by " + l(d(ve)(n.value.modified_by)) + " on " + l(d(ce)(n.value.modified)), 1)
                ], 64)) : C("", !0)
              ])) : C("", !0)
            ]),
            e("div", Ut, [
              f.value ? (o(), i(_, { key: 0 }, [
                e("button", {
                  class: "add-btn-cancel",
                  onClick: O
                }, "Cancel"),
                e("button", {
                  class: "add-btn-draft",
                  disabled: A.value || !(H.value ? a.$canCreate("inventory") : a.$canEdit("inventory")),
                  onClick: s[24] || (s[24] = (t) => de("Draft"))
                }, [
                  e("span", {
                    innerHTML: d(r)("save", 13)
                  }, null, 8, Et),
                  s[62] || (s[62] = p(" Save Draft ", -1))
                ], 8, It),
                e("button", {
                  class: "add-btn-more",
                  disabled: A.value || !(H.value ? a.$canCreate("inventory") : a.$canEdit("inventory")),
                  onClick: s[25] || (s[25] = (t) => de("Submitted"))
                }, [
                  e("span", {
                    innerHTML: d(r)("check", 13)
                  }, null, 8, zt),
                  p(" " + l(A.value ? "Saving…" : "Save & Submit"), 1)
                ], 8, Ot)
              ], 64)) : n.value.docstatus === 1 ? (o(), i(_, { key: 1 }, [
                e("div", Pt, l(n.value.name) + " — submitted, applied to asset", 1),
                e("button", {
                  class: "add-btn-cancel",
                  style: { color: "#dc2626" },
                  disabled: E.value || !a.$canDelete("inventory"),
                  title: a.$canDelete("inventory") ? "" : "Not permitted",
                  onClick: Te
                }, [
                  e("span", {
                    innerHTML: d(r)("cancel", 13)
                  }, null, 8, Bt),
                  p(" " + l(E.value ? "Cancelling…" : "Cancel Movement"), 1)
                ], 8, qt)
              ], 64)) : (o(), i("button", {
                key: 2,
                class: "add-btn-cancel",
                onClick: O
              }, "Close"))
            ])
          ])
        ])) : C("", !0)
      ]))
    ]));
  }
}, Jt = /* @__PURE__ */ Me(Ft, [["__scopeId", "data-v-75bbfafa"]]);
export {
  Jt as default
};
