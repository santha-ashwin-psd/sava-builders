import { _ as he, x as ke, y as I, o as we, f as g, X as Ce, c as i, a as t, t as l, d as m, w as _, v as Se, A as L, F as f, r as M, b as v, n as S, $ as Re, u as N, h as b, S as $e, g as x, K as Be, a2 as Oe, j as Ve, a3 as Le, k as a, D as te } from "./main-DvPfzYHr.js";
import { _ as oe } from "./SearchableSelect-DL6hf2UM.js";
import { b as se } from "./format-BcJZDVG4.js";
import { o as ne } from "./userNames-BnYfVpPc.js";
const Me = { class: "bomx-page" }, Ne = { class: "bomx-sum-strip" }, De = { class: "bomx-sum-card" }, Te = { class: "bomx-sc-val" }, Ee = { class: "bomx-sc-sub" }, Ue = { class: "bomx-sum-card" }, qe = {
  class: "bomx-sc-val",
  style: { color: "var(--bx-blue)" }
}, Ae = { class: "bomx-sum-card" }, ze = {
  class: "bomx-sc-val",
  style: { color: "var(--bx-green)" }
}, Fe = { class: "bomx-sum-card" }, Ie = {
  class: "bomx-sc-val",
  style: { color: "var(--bx-amber)" }
}, je = { class: "bomx-two-col" }, He = { class: "bomx-list-panel" }, Ke = { class: "bomx-panel-hdr" }, We = { class: "bomx-panel-title" }, Ge = { class: "bomx-count" }, Pe = ["disabled", "title"], Xe = { class: "bomx-list" }, Je = {
  key: 1,
  class: "bomx-list-empty"
}, Qe = ["onClick"], Ye = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "8px" } }, Ze = { class: "bomx-item-name" }, et = { class: "bomx-item-meta" }, tt = { class: "bomx-detail-panel" }, ot = {
  key: 0,
  class: "bomx-empty-state"
}, st = ["disabled", "title"], nt = ["innerHTML"], it = {
  key: 0,
  class: "bomx-empty-state"
}, at = { class: "bomx-detail-hdr" }, lt = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "12px" } }, rt = { style: { "min-width": "0" } }, ut = { class: "bomx-detail-title" }, dt = { class: "bomx-detail-meta" }, mt = {
  key: 0,
  class: "mono"
}, vt = { key: 1 }, ct = { style: { display: "flex", gap: "6px", "flex-shrink": "0", "flex-wrap": "wrap", "justify-content": "flex-end" } }, bt = ["disabled"], pt = { class: "bomx-stats-bar" }, ft = { class: "bomx-sbar-cell" }, xt = {
  class: "bomx-sbar-val",
  style: { color: "var(--bx-mfg)" }
}, yt = { class: "bomx-sbar-cell" }, gt = {
  class: "bomx-sbar-val",
  style: { color: "var(--bx-blue)" }
}, _t = { class: "bomx-sbar-cell" }, ht = {
  class: "bomx-sbar-val",
  style: { color: "var(--bx-green)" }
}, kt = { class: "bomx-sbar-cell" }, wt = {
  class: "bomx-sbar-val",
  style: { color: "var(--bx-amber)" }
}, Ct = { class: "bomx-seq-tabs" }, St = { class: "bomx-body" }, Rt = { key: 0 }, $t = {
  key: 0,
  class: "bomx-tree-empty"
}, Bt = {
  key: 1,
  class: "bomx-flow-wrap"
}, Ot = { class: "bomx-flow-step" }, Vt = { class: "bomx-flow-seq" }, Lt = { class: "bomx-flow-box" }, Mt = { class: "bomx-flow-name" }, Nt = {
  key: 0,
  class: "bomx-flow-time"
}, Dt = {
  key: 0,
  class: "bomx-flow-wc"
}, Tt = {
  key: 0,
  class: "bomx-flow-arrow"
}, Et = { key: 1 }, Ut = {
  class: "bomx-section-lbl",
  style: { display: "flex", "align-items": "center", gap: "6px" }
}, qt = {
  key: 0,
  class: "bomx-count"
}, At = { class: "bomx-rm-cards" }, zt = {
  key: 0,
  class: "bomx-tree-empty"
}, Ft = { class: "bomx-rm-card-hdr" }, It = { class: "bomx-rm-card-num" }, jt = {
  class: "bomx-rm-card-title",
  style: { "font-weight": "700", color: "var(--bx-mfgB)", flex: "none" }
}, Ht = ["onClick", "disabled"], Kt = ["onClick", "disabled"], Wt = ["onClick"], Gt = {
  class: "bomx-rm-card-body",
  style: { "grid-template-columns": "1fr 1fr" }
}, Pt = { class: "bomx-rm-field" }, Xt = { class: "bomx-rm-field" }, Jt = { class: "bomx-rm-field" }, Qt = ["onUpdate:modelValue"], Yt = { class: "bomx-rm-field" }, Zt = ["onUpdate:modelValue"], eo = { key: 2 }, to = {
  key: 0,
  class: "bomx-tree-empty"
}, oo = {
  key: 0,
  class: "bomx-tree-empty"
}, so = { class: "bomx-linked-bom-list" }, no = { class: "bomx-linked-bom-info" }, io = { class: "bomx-linked-bom-title" }, ao = { key: 0 }, lo = ["onClick"], ro = { class: "bomx-hdr-fields-inline" }, uo = ["disabled"], mo = {
  key: 0,
  class: "bomx-field-hint"
}, vo = { class: "bomx-toggle" }, co = {
  key: 3,
  class: "inv-view-footer"
}, bo = { class: "bomx-footer" }, po = ["disabled", "title"], fo = ["disabled"], xo = {
  __name: "Routing",
  setup(yo) {
    const y = $e(), R = Ve(), { toast: c } = ke(), { confirm: ie } = Le(), $ = b(!1), B = b([]), E = b(""), D = b(""), j = x(() => y.params.name && y.params.name !== "new" ? y.params.name : y.params.name === "new" ? "new" : null);
    async function U() {
      $.value = !0;
      try {
        const o = await g("Routing", { fields: ["name", "is_active", "modified"], limit: 1e3, order: "modified desc" }), e = await g("Routing Operation", { fields: ["parent", "count(*) as op_count"], limit: 2e3 }).catch(() => []), s = {};
        (e || []).forEach((r) => {
          s[r.parent] = (s[r.parent] || 0) + 1;
        }), B.value = (o || []).map((r) => ({ ...r, op_count: s[r.name] || 0 }));
      } catch {
        c("Could not load Routings", "error");
      }
      $.value = !1;
    }
    const q = x(() => {
      let o = B.value;
      D.value === "active" && (o = o.filter((s) => s.is_active)), D.value === "inactive" && (o = o.filter((s) => !s.is_active));
      const e = E.value.toLowerCase().trim();
      return e && (o = o.filter((s) => (s.name || "").toLowerCase().includes(e))), o;
    });
    function H(o) {
      return o.is_active ? "Active" : "Inactive";
    }
    function K(o) {
      return o.is_active ? "badge-active" : "badge-obsolete";
    }
    const ae = x(() => B.value.filter((o) => o.is_active).length), le = x(() => B.value.reduce((o, e) => o + (e.op_count || 0), 0));
    function A(o) {
      return Number(o || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function re(o) {
      R.push(`/manufacturing/routing/${o}`);
    }
    function W() {
      R.push("/manufacturing/routing/new");
    }
    function z() {
      R.push("/manufacturing/routing");
    }
    async function ue(o) {
      try {
        const e = await g("BOM", { fields: ["name"], filters: [["routing", "=", o.name]], limit: 1 });
        if (e && e.length)
          return c(`${o.name} is linked to BOM ${e[0].name} and cannot be deleted.`, "error"), !1;
      } catch {
        return c(`Could not verify whether ${o.name} is in use — try again.`, "error"), !1;
      }
      return !0;
    }
    async function de() {
      const o = { name: n.value.name };
      if (await ue(o) && await ie({ title: "Delete Routing?", body: `Delete "${o.name}"?`, okLabel: "Delete", okStyle: "danger" }))
        try {
          await Oe("Routing", o.name), c("Routing deleted"), z(), U();
        } catch (e) {
          c("Could not delete: " + e.message, "error");
        }
    }
    const u = x(() => y.params.name === "new"), O = b(!1), h = b(!1);
    function F() {
      return {
        doctype: "Routing",
        routing_name: "",
        is_active: 1,
        description: "",
        operations: []
      };
    }
    const n = b(F()), p = b("flow");
    I(() => y.params.name, () => {
      p.value = "flow", V.value = [];
    });
    const V = b([]), T = b(!1);
    async function me() {
      if (u.value || !n.value.name) {
        V.value = [];
        return;
      }
      T.value = !0;
      try {
        const e = await g("BOM", {
          fields: ["name", "item", "bom_version", "is_default", "docstatus"],
          filters: [["routing", "=", n.value.name]],
          limit: 500,
          order: "modified desc"
        }) || [], s = [...new Set(e.map((r) => r.item).filter(Boolean))];
        if (s.length) {
          const r = await g("Item", { fields: ["name", "item_name"], filters: [["name", "in", s]], limit: s.length }), d = {};
          (r || []).forEach((C) => {
            d[C.name] = C.item_name;
          }), e.forEach((C) => {
            C.item_name = d[C.item] || C.item;
          });
        }
        V.value = e;
      } catch {
        c("Could not load linked BOMs", "error");
      }
      T.value = !1;
    }
    I(p, (o) => {
      o === "linked_boms" && !T.value && me();
    });
    const G = x(() => (n.value.operations || []).reduce((o, e) => o + (Number(e.time_in_mins) || 0), 0)), P = x(() => (n.value.operations || []).reduce((o, e) => o + (Number(e.hour_rate) || 0) * (Number(e.time_in_mins) || 0) / 60, 0)), ve = x(() => {
      const o = n.value.operations || [];
      return o.length ? o.reduce((e, s) => e + (Number(s.hour_rate) || 0), 0) / o.length : 0;
    }), k = b([]), w = b([]);
    let ce = 0;
    function X() {
      return ++ce;
    }
    function J(o) {
      return (o || []).forEach((e) => {
        e._uid || (e._uid = X());
      }), o;
    }
    we(async () => {
      $.value = !0;
      try {
        const [o, e] = await Promise.all([
          g("Operation", { fields: ["name"], filters: [["is_active", "=", 1]], limit: 1e3, order: "name asc" }),
          g("Workstation", { fields: ["name", "hour_rate"], filters: [["is_active", "=", 1]], limit: 1e3, order: "name asc" })
        ]);
        k.value = o || [], w.value = e || [];
      } catch {
        c("Could not load Operations / Workstations", "error");
      }
      await U(), y.params.name && await Q(), $.value = !1;
    }), I(() => y.params.name, async (o) => {
      if (!o) {
        n.value = F();
        return;
      }
      await Q();
    });
    async function Q() {
      if (u.value) {
        n.value = F();
        return;
      }
      O.value = !0;
      try {
        const o = await Ce("Routing", y.params.name);
        o.operations || (o.operations = []), J(o.operations), n.value = o, o.operations.forEach((e) => {
          e.workstation && !w.value.some((s) => s.name === e.workstation) && (w.value = [{ name: e.workstation, hour_rate: 0 }, ...w.value]), e.operation && !k.value.some((s) => s.name === e.operation) && (k.value = [{ name: e.operation }, ...k.value]);
        });
      } catch {
        c("Could not load Routing", "error"), z();
      }
      O.value = !1;
    }
    function be() {
      n.value.operations || (n.value.operations = []), n.value.operations.push({ _uid: X(), operation: "", workstation: "", time_in_mins: 0, hour_rate: 0 });
    }
    function pe(o) {
      n.value.operations.splice(o, 1);
    }
    function Y(o, e) {
      const s = n.value.operations, r = o + e;
      r < 0 || r >= s.length || ([s[o], s[r]] = [s[r], s[o]]);
    }
    function fe(o) {
      if (o.operation && !o.workstation) {
        const e = k.value.find((s) => s.name === o.operation);
        e && e.default_workstation && (o.workstation = e.default_workstation, Z(o));
      }
    }
    function Z(o) {
      if (!o.workstation) return;
      const e = w.value.find((s) => s.name === o.workstation);
      e && e.hour_rate && (o.hour_rate = e.hour_rate);
    }
    async function ee() {
      if (!n.value.routing_name || !n.value.routing_name.trim()) {
        c("Routing Name is mandatory", "error");
        return;
      }
      if (!n.value.operations || n.value.operations.length === 0) {
        c("Add at least one Operation row", "error");
        return;
      }
      for (const o of n.value.operations)
        if (!o.operation) {
          c("Each row must have an Operation selected", "error");
          return;
        }
      h.value = !0;
      try {
        const o = {
          ...n.value,
          operations: (n.value.operations || []).map(({ _uid: s, ...r }) => r)
        }, e = await Be(o);
        c(u.value ? "Routing created successfully" : "Saved successfully"), e.operations || (e.operations = []), J(e.operations), u.value ? R.replace(`/manufacturing/routing/${e.name}`) : n.value = e, U();
      } catch (o) {
        c(o.message || "Could not save", "error");
      }
      h.value = !1;
    }
    const xe = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
    };
    function ye(o, e) {
      return (xe[o] || "").replace("<svg ", `<svg width="${e}" height="${e}" `);
    }
    const ge = x(() => [{ value: "", label: "— Select —" }, ...(k.value || []).map((o) => ({ value: o.name, label: o.name }))]), _e = x(() => [{ value: "", label: "— Select —" }, ...(w.value || []).map((o) => ({ value: o.name, label: o.name }))]);
    return (o, e) => (a(), i("div", Me, [
      t("div", Ne, [
        t("div", De, [
          e[8] || (e[8] = t("div", {
            class: "bomx-sc-bar",
            style: { background: "var(--bx-mfg)" }
          }, null, -1)),
          e[9] || (e[9] = t("div", { class: "bomx-sc-lbl" }, "Total Routings", -1)),
          t("div", Te, l(B.value.length), 1),
          t("div", Ee, l(ae.value) + " active", 1)
        ]),
        t("div", Ue, [
          e[10] || (e[10] = t("div", {
            class: "bomx-sc-bar",
            style: { background: "var(--bx-blue)" }
          }, null, -1)),
          e[11] || (e[11] = t("div", {
            class: "bomx-sc-lbl",
            style: { color: "var(--bx-blue)" }
          }, "Total Steps", -1)),
          t("div", qe, l(le.value), 1),
          e[12] || (e[12] = t("div", { class: "bomx-sc-sub" }, "Across all routings", -1))
        ]),
        t("div", Ae, [
          e[14] || (e[14] = t("div", {
            class: "bomx-sc-bar",
            style: { background: "var(--bx-green)" }
          }, null, -1)),
          e[15] || (e[15] = t("div", {
            class: "bomx-sc-lbl",
            style: { color: "var(--bx-green)" }
          }, "Cycle Time", -1)),
          t("div", ze, [
            m(l(G.value) + " ", 1),
            e[13] || (e[13] = t("span", { style: { "font-size": "12px", "font-weight": "600" } }, "min", -1))
          ]),
          e[16] || (e[16] = t("div", { class: "bomx-sc-sub" }, "This routing", -1))
        ]),
        t("div", Fe, [
          e[17] || (e[17] = t("div", {
            class: "bomx-sc-bar",
            style: { background: "var(--bx-amber)" }
          }, null, -1)),
          e[18] || (e[18] = t("div", {
            class: "bomx-sc-lbl",
            style: { color: "var(--bx-amber)" }
          }, "Est. Labour Cost", -1)),
          t("div", Ie, "KES " + l(A(P.value)), 1),
          e[19] || (e[19] = t("div", { class: "bomx-sc-sub" }, "This routing", -1))
        ])
      ]),
      t("div", je, [
        t("div", He, [
          t("div", Ke, [
            t("span", We, [
              e[20] || (e[20] = m("🧭 Routings ", -1)),
              t("span", Ge, "(" + l(q.value.length) + ")", 1)
            ]),
            t("button", {
              class: "bomx-btn-icon-round",
              disabled: !o.$canCreate("inventory"),
              onClick: W,
              title: o.$canCreate("inventory") ? "New Routing" : "Read-only access"
            }, [...e[21] || (e[21] = [
              t("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                t("line", {
                  x1: "12",
                  y1: "5",
                  x2: "12",
                  y2: "19"
                }),
                t("line", {
                  x1: "5",
                  y1: "12",
                  x2: "19",
                  y2: "12"
                })
              ], -1)
            ])], 8, Pe)
          ]),
          _(t("select", {
            class: "bomx-fi bomx-status-filter",
            "onUpdate:modelValue": e[0] || (e[0] = (s) => D.value = s)
          }, [...e[22] || (e[22] = [
            t("option", { value: "" }, "All Status", -1),
            t("option", { value: "active" }, "Active", -1),
            t("option", { value: "inactive" }, "Inactive", -1)
          ])], 512), [
            [Se, D.value]
          ]),
          _(t("input", {
            class: "bomx-search",
            "onUpdate:modelValue": e[1] || (e[1] = (s) => E.value = s),
            type: "text",
            placeholder: "Search routings…"
          }, null, 512), [
            [L, E.value]
          ]),
          t("div", Xe, [
            $.value ? (a(), i(f, { key: 0 }, M(5, (s) => t("div", {
              key: s,
              class: "bomx-item"
            }, [...e[23] || (e[23] = [
              t("div", {
                class: "shimmer",
                style: { height: "38px", "border-radius": "6px" }
              }, null, -1)
            ])])), 64)) : q.value.length ? (a(!0), i(f, { key: 2 }, M(q.value, (s) => (a(), i("div", {
              key: s.name,
              class: S(["bomx-item", { active: j.value === s.name }]),
              onClick: (r) => re(s.name)
            }, [
              t("div", Ye, [
                t("div", Ze, l(s.name), 1),
                t("span", {
                  class: S(["bomx-badge", K(s)])
                }, l(H(s)), 3)
              ]),
              t("div", et, [
                t("span", null, "⚙️ " + l(s.op_count != null ? s.op_count : 0) + " operation" + l(s.op_count === 1 ? "" : "s"), 1)
              ])
            ], 10, Qe))), 128)) : (a(), i("div", Je, "No Routings found"))
          ])
        ]),
        t("div", tt, [
          j.value ? (a(), i(f, { key: 1 }, [
            O.value ? (a(), i("div", it, [...e[28] || (e[28] = [
              t("div", {
                class: "shimmer",
                style: { height: "200px", "border-radius": "10px" }
              }, null, -1)
            ])])) : (a(), i(f, { key: 1 }, [
              t("div", at, [
                t("div", lt, [
                  t("div", rt, [
                    t("div", ut, l(u.value ? "New Routing" : n.value.routing_name || n.value.name), 1),
                    t("div", dt, [
                      u.value ? v("", !0) : (a(), i("span", mt, l(n.value.name), 1)),
                      u.value ? v("", !0) : (a(), i("span", vt, "•")),
                      t("span", {
                        class: S(["bomx-badge", K(n.value)]),
                        style: { "font-size": "11px" }
                      }, l(H(n.value)), 3)
                    ])
                  ]),
                  t("div", ct, [
                    t("button", {
                      class: "bomx-btn bomx-btn-ghost-inv",
                      onClick: z
                    }, "Back"),
                    t("button", {
                      class: "bomx-btn bomx-btn-light",
                      onClick: ee,
                      disabled: h.value || O.value || !(u.value ? o.$canCreate("inventory") : o.$canEdit("inventory"))
                    }, [
                      e[29] || (e[29] = t("svg", {
                        width: "13",
                        height: "13",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        t("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
                        t("polyline", { points: "17 21 17 13 7 13" }),
                        t("polyline", { points: "7 3 7 8 15 8" })
                      ], -1)),
                      m(" " + l(h.value ? "Saving…" : u.value ? "Save Routing" : "Save Changes"), 1)
                    ], 8, bt)
                  ])
                ])
              ]),
              t("div", pt, [
                t("div", ft, [
                  e[30] || (e[30] = t("div", { class: "bomx-sbar-lbl" }, "Steps", -1)),
                  t("div", xt, l((n.value.operations || []).length), 1)
                ]),
                t("div", yt, [
                  e[32] || (e[32] = t("div", { class: "bomx-sbar-lbl" }, "Total Cycle Time", -1)),
                  t("div", gt, [
                    m(l(G.value), 1),
                    e[31] || (e[31] = t("span", { style: { "font-size": "11px", "font-weight": "600" } }, " min", -1))
                  ])
                ]),
                t("div", _t, [
                  e[33] || (e[33] = t("div", { class: "bomx-sbar-lbl" }, "Est. Labour Cost", -1)),
                  t("div", ht, "KES " + l(A(P.value)), 1)
                ]),
                t("div", kt, [
                  e[34] || (e[34] = t("div", { class: "bomx-sbar-lbl" }, "Avg Rate / Op", -1)),
                  t("div", wt, "KES " + l(A(ve.value)), 1)
                ])
              ]),
              t("div", Ct, [
                t("button", {
                  class: S(["bomx-seq-tab", { active: p.value === "flow" }]),
                  onClick: e[2] || (e[2] = (s) => p.value = "flow")
                }, "📊 Flow Diagram", 2),
                t("button", {
                  class: S(["bomx-seq-tab", { active: p.value === "sequence" }]),
                  onClick: e[3] || (e[3] = (s) => p.value = "sequence")
                }, "📋 Sequence Editor", 2),
                t("button", {
                  class: S(["bomx-seq-tab", { active: p.value === "linked_boms" }]),
                  onClick: e[4] || (e[4] = (s) => p.value = "linked_boms")
                }, "📄 Linked BOMs", 2)
              ]),
              t("div", St, [
                p.value === "flow" ? (a(), i("div", Rt, [
                  !n.value.operations || !n.value.operations.length ? (a(), i("div", $t, "No operations added yet. Switch to the Sequence Editor tab to add one.")) : (a(), i("div", Bt, [
                    (a(!0), i(f, null, M(n.value.operations, (s, r) => (a(), i(f, {
                      key: s._uid
                    }, [
                      t("div", Ot, [
                        t("div", Vt, l(r + 1), 1),
                        t("div", Lt, [
                          e[35] || (e[35] = t("div", { class: "bomx-flow-icon" }, "⚙️", -1)),
                          t("div", Mt, l(s.operation || "— Not set —"), 1),
                          s.time_in_mins ? (a(), i("div", Nt, l(s.time_in_mins) + " min", 1)) : v("", !0)
                        ]),
                        s.workstation ? (a(), i("div", Dt, l(s.workstation), 1)) : v("", !0)
                      ]),
                      r < n.value.operations.length - 1 ? (a(), i("div", Tt, "→")) : v("", !0)
                    ], 64))), 128))
                  ]))
                ])) : v("", !0),
                p.value === "sequence" ? (a(), i("div", Et, [
                  t("div", Ut, [
                    e[36] || (e[36] = m(" Operations Sequence ", -1)),
                    n.value.operations && n.value.operations.length ? (a(), i("span", qt, "(" + l(n.value.operations.length) + ")", 1)) : v("", !0)
                  ]),
                  t("div", At, [
                    !n.value.operations || !n.value.operations.length ? (a(), i("div", zt, "No operations added.")) : v("", !0),
                    (a(!0), i(f, null, M(n.value.operations, (s, r) => (a(), i("div", {
                      class: "bomx-rm-card",
                      key: s._uid
                    }, [
                      t("div", Ft, [
                        t("span", It, l(r + 1), 1),
                        t("span", jt, "Step " + l(r + 1), 1),
                        e[40] || (e[40] = t("div", { style: { flex: "1" } }, null, -1)),
                        t("button", {
                          class: "bomx-btn-icon",
                          onClick: (d) => Y(r, -1),
                          disabled: r === 0,
                          title: "Move up"
                        }, [...e[37] || (e[37] = [
                          t("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.5"
                          }, [
                            t("polyline", { points: "18 15 12 9 6 15" })
                          ], -1)
                        ])], 8, Ht),
                        t("button", {
                          class: "bomx-btn-icon",
                          onClick: (d) => Y(r, 1),
                          disabled: r === n.value.operations.length - 1,
                          title: "Move down"
                        }, [...e[38] || (e[38] = [
                          t("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.5"
                          }, [
                            t("polyline", { points: "6 9 12 15 18 9" })
                          ], -1)
                        ])], 8, Kt),
                        t("button", {
                          class: "bomx-btn-icon danger bomx-rm-card-rm",
                          onClick: (d) => pe(r),
                          title: "Remove"
                        }, [...e[39] || (e[39] = [
                          t("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            t("line", {
                              x1: "18",
                              y1: "6",
                              x2: "6",
                              y2: "18"
                            }),
                            t("line", {
                              x1: "6",
                              y1: "6",
                              x2: "18",
                              y2: "18"
                            })
                          ], -1)
                        ])], 8, Wt)
                      ]),
                      t("div", Gt, [
                        t("div", Pt, [
                          e[41] || (e[41] = t("label", null, [
                            m("Operation "),
                            t("span", { style: { color: "var(--bx-red)" } }, "*")
                          ], -1)),
                          te(oe, {
                            modelValue: s.operation,
                            "onUpdate:modelValue": (d) => s.operation = d,
                            options: ge.value,
                            placeholder: "— Select —",
                            onSelect: (d) => fe(s),
                            compact: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"])
                        ]),
                        t("div", Xt, [
                          e[42] || (e[42] = t("label", null, "Workstation", -1)),
                          te(oe, {
                            modelValue: s.workstation,
                            "onUpdate:modelValue": (d) => s.workstation = d,
                            options: _e.value,
                            placeholder: "— Select —",
                            onSelect: (d) => Z(s),
                            compact: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"])
                        ]),
                        t("div", Jt, [
                          e[43] || (e[43] = t("label", null, "Time (Min)", -1)),
                          _(t("input", {
                            class: "bomx-fi bomx-fi-mono",
                            type: "number",
                            "onUpdate:modelValue": (d) => s.time_in_mins = d,
                            min: "0",
                            step: "any",
                            placeholder: "0"
                          }, null, 8, Qt), [
                            [
                              L,
                              s.time_in_mins,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        t("div", Yt, [
                          e[44] || (e[44] = t("label", null, "Hour Rate", -1)),
                          _(t("input", {
                            class: "bomx-fi bomx-fi-mono",
                            type: "number",
                            "onUpdate:modelValue": (d) => s.hour_rate = d,
                            min: "0",
                            step: "any",
                            placeholder: "0"
                          }, null, 8, Zt), [
                            [
                              L,
                              s.hour_rate,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ])
                      ])
                    ]))), 128))
                  ]),
                  t("div", {
                    class: "bomx-add-row",
                    onClick: be
                  }, [...e[45] || (e[45] = [
                    t("svg", {
                      width: "13",
                      height: "13",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      t("line", {
                        x1: "12",
                        y1: "5",
                        x2: "12",
                        y2: "19"
                      }),
                      t("line", {
                        x1: "5",
                        y1: "12",
                        x2: "19",
                        y2: "12"
                      })
                    ], -1),
                    m(" Add Operation ", -1)
                  ])])
                ])) : v("", !0),
                p.value === "linked_boms" ? (a(), i("div", eo, [
                  T.value ? (a(), i("div", to, "Loading…")) : (a(), i(f, { key: 1 }, [
                    V.value.length ? (a(), i(f, { key: 1 }, [
                      e[47] || (e[47] = t("div", {
                        class: "bomx-section-lbl",
                        style: { "margin-bottom": "10px" }
                      }, "This routing is used in the following Bills of Materials:", -1)),
                      t("div", so, [
                        (a(!0), i(f, null, M(V.value, (s) => (a(), i("div", {
                          class: "bomx-linked-bom-row",
                          key: s.name
                        }, [
                          e[46] || (e[46] = t("span", { class: "bomx-tree-icon" }, "📄", -1)),
                          t("div", no, [
                            t("div", io, [
                              m(l(s.name), 1),
                              s.bom_version ? (a(), i("span", ao, " v" + l(s.bom_version), 1)) : v("", !0),
                              m(" — " + l(s.item_name || s.item), 1)
                            ])
                          ]),
                          t("button", {
                            class: "bomx-btn bomx-btn-ghost",
                            onClick: (r) => N(R).push(`/manufacturing/bom/${s.name}`)
                          }, "Open BOM", 8, lo)
                        ]))), 128))
                      ])
                    ], 64)) : (a(), i("div", oo, "This routing is not used in any Bill of Materials yet."))
                  ], 64))
                ])) : v("", !0),
                e[50] || (e[50] = t("div", {
                  class: "bomx-section-lbl",
                  style: { "margin-top": "22px" }
                }, "Routing Details", -1)),
                t("div", ro, [
                  t("div", null, [
                    e[48] || (e[48] = t("div", { class: "bomx-hf-label" }, [
                      m("Routing Name "),
                      t("span", { style: { color: "var(--bx-red)" } }, "*")
                    ], -1)),
                    _(t("input", {
                      class: "bomx-fi",
                      type: "text",
                      "onUpdate:modelValue": e[5] || (e[5] = (s) => n.value.routing_name = s),
                      disabled: !u.value,
                      placeholder: "e.g., Standard Assembly Line",
                      style: { width: "100%" }
                    }, null, 8, uo), [
                      [L, n.value.routing_name]
                    ]),
                    u.value ? v("", !0) : (a(), i("div", mo, "Routing name cannot be changed after creation."))
                  ]),
                  t("label", vo, [
                    _(t("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": e[6] || (e[6] = (s) => n.value.is_active = s),
                      "true-value": 1,
                      "false-value": 0
                    }, null, 512), [
                      [Re, n.value.is_active]
                    ]),
                    e[49] || (e[49] = m(" Is Active", -1))
                  ])
                ]),
                e[51] || (e[51] = t("div", {
                  class: "bomx-section-lbl",
                  style: { "margin-top": "22px" }
                }, "Description", -1)),
                _(t("textarea", {
                  class: "bomx-fi",
                  "onUpdate:modelValue": e[7] || (e[7] = (s) => n.value.description = s),
                  style: { width: "100%", "min-height": "110px", resize: "vertical" },
                  placeholder: "Describe this routing (optional)…"
                }, null, 512), [
                  [L, n.value.description]
                ]),
                !u.value && n.value.owner ? (a(), i("div", co, [
                  m(" Created by " + l(N(ne)(n.value.owner)) + " on " + l(N(se)(n.value.creation)) + " ", 1),
                  n.value.modified_by ? (a(), i(f, { key: 0 }, [
                    m(" · Last modified by " + l(N(ne)(n.value.modified_by)) + " on " + l(N(se)(n.value.modified)), 1)
                  ], 64)) : v("", !0)
                ])) : v("", !0)
              ]),
              t("div", bo, [
                u.value ? v("", !0) : (a(), i("button", {
                  key: 0,
                  class: "bomx-btn bomx-btn-ghost-inv",
                  style: { color: "var(--bx-red)", "border-color": "rgba(201,42,42,.3)" },
                  disabled: !o.$canDelete("inventory"),
                  title: o.$canDelete("inventory") ? "" : "Not permitted",
                  onClick: de
                }, "Delete Routing", 8, po)),
                e[53] || (e[53] = t("div", { style: { flex: "1" } }, null, -1)),
                t("button", {
                  class: "bomx-btn bomx-btn-mfg",
                  onClick: ee,
                  disabled: h.value || O.value || !(u.value ? o.$canCreate("inventory") : o.$canEdit("inventory"))
                }, [
                  e[52] || (e[52] = t("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
                    t("polyline", { points: "17 21 17 13 7 13" }),
                    t("polyline", { points: "7 3 7 8 15 8" })
                  ], -1)),
                  m(" " + l(h.value ? "Saving…" : u.value ? "Save Routing" : "Save Changes"), 1)
                ], 8, fo)
              ])
            ], 64))
          ], 64)) : (a(), i("div", ot, [
            e[25] || (e[25] = t("div", { class: "bomx-empty-icon" }, "🧭", -1)),
            e[26] || (e[26] = t("div", { class: "bomx-empty-title" }, "Select a Routing", -1)),
            e[27] || (e[27] = t("div", { class: "bomx-empty-sub" }, "Choose a Routing from the list to view or edit its operation sequence.", -1)),
            t("button", {
              class: "bomx-btn bomx-btn-mfg",
              disabled: !o.$canCreate("inventory"),
              title: o.$canCreate("inventory") ? "" : "Read-only access",
              onClick: W
            }, [
              t("span", {
                innerHTML: ye("plus", 13)
              }, null, 8, nt),
              e[24] || (e[24] = m(" Create Routing", -1))
            ], 8, st)
          ]))
        ])
      ])
    ]));
  }
}, wo = /* @__PURE__ */ he(xo, [["__scopeId", "data-v-6db42e95"]]);
export {
  wo as default
};
