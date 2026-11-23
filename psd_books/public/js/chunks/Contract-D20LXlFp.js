import { _ as _t, y as yt, o as kt, c as l, a as e, u as c, i as C, w as h, B as O, F as w, r as S, d as p, t as r, b as d, D as ht, x as gt, v as z, p as E, J as Ct, f as H, l as wt, h as b, g as f, A as X, a2 as St, e as jt, L as xt, a3 as Et, K as Tt, $ as Dt, k as n, n as G, S as At } from "./main-DlHOPnai.js";
import { b as N } from "./format-BcJZDVG4.js";
import { o as Lt } from "./userNames-y3-EYbxD.js";
import { i as Mt } from "./labourContractor-fn9JaBmq.js";
import { S as Ot, P as Pt, A as Vt, C as $t, v as Ht, D as Nt, f as Ft, s as Rt, c as Bt, m as It, a as Ut, b as qt, d as Kt, e as zt } from "./labourContract-D3MXcMdd.js";
import { f as Gt } from "./labourActivity-DtOgMAQT.js";
const Wt = { class: "list-page" }, Jt = { class: "sales-toolbar" }, Qt = { class: "sales-search" }, Xt = ["innerHTML"], Yt = { class: "sales-pills" }, Zt = ["onClick"], te = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, ee = ["innerHTML"], ae = ["disabled", "title"], oe = ["innerHTML"], se = { class: "inv-table-wrap" }, ne = { class: "inv-table" }, le = { key: 1 }, re = {
  colspan: "7",
  class: "vt-empty"
}, ie = { class: "vt-empty-title" }, ce = { class: "vt-empty-sub" }, de = ["onClick"], ue = { class: "vt-td vt-td-mono" }, ve = { class: "vt-td" }, pe = { class: "vt-td" }, me = { class: "vt-td" }, be = { class: "vt-td vt-td-r" }, fe = { class: "vt-td vt-td-secondary" }, _e = { class: "vt-td" }, ye = {
  key: 0,
  class: "vt-footer"
}, ke = {
  class: "inv-drawer-panel open ct-drawer",
  style: { width: "560px", "max-width": "98vw" }
}, he = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#1e3a5f,#1a6ef7)", padding: "18px 24px" }
}, ge = { class: "cust-drawer-header-left" }, Ce = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, we = ["innerHTML"], Se = { class: "inv-dh-title" }, je = { class: "cust-drawer-sub" }, xe = ["innerHTML"], Ee = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, Te = { class: "inv-fg inv-fg2" }, De = { class: "inv-field" }, Ae = ["disabled"], Le = ["value"], Me = {
  key: 0,
  class: "ct-err"
}, Oe = { class: "inv-field" }, Pe = ["disabled"], Ve = ["value"], $e = {
  key: 0,
  class: "ct-err"
}, He = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, Ne = ["disabled"], Fe = ["value"], Re = {
  key: 0,
  class: "ct-err"
}, Be = { class: "inv-field" }, Ie = ["disabled"], Ue = {
  key: 0,
  class: "ct-err"
}, qe = { class: "inv-field" }, Ke = ["disabled"], ze = {
  key: 0,
  class: "ct-err"
}, Ge = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, We = ["disabled"], Je = {
  key: 0,
  class: "ct-err"
}, Qe = {
  key: 1,
  class: "ct-info"
}, Xe = ["innerHTML"], Ye = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, Ze = ["disabled"], ta = {
  key: 0,
  class: "ct-note ct-note-bad"
}, ea = {
  key: 1,
  class: "ct-note"
}, aa = {
  key: 2,
  class: "ct-note ct-note-ok"
}, oa = {
  key: 3,
  class: "ct-note"
}, sa = {
  key: 4,
  class: "ct-errbox"
}, na = { class: "ct-errbox-title" }, la = ["innerHTML"], ra = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd", "flex-wrap": "wrap", gap: "8px" }
}, ia = ["disabled"], ca = ["disabled"], da = ["disabled"], ua = ["disabled"], va = ["disabled"], pa = ["disabled"], ma = ["disabled"], W = "Labour Contract", Y = "psd_books.api.labour_contract.", ba = {
  __name: "Contract",
  setup(fa) {
    const { toast: y } = yt(), { confirm: T } = Et(), { prompt: Z } = Dt(), { canEdit: tt } = At(), et = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "closed", l: "Closed" }], _ = b([]), F = b([]), R = b([]), P = b([]), B = b(!1), V = b(!0), D = b(""), j = b("all"), g = b(!1), I = b(!1), m = b(!1), i = X({}), o = X({}), U = f(() => tt("admin")), at = () => ({
      name: "",
      status: Nt,
      project: "",
      activity: "",
      contractor: "",
      start_date: "",
      end_date: "",
      contract_value: "",
      narration: "",
      raised_by: "",
      approved_by: "",
      approved_on: "",
      rejection_reason: "",
      closed_on: ""
    });
    function q(s) {
      Object.keys(i).forEach((t) => delete i[t]), Object.keys(o).forEach((t) => delete o[t]), Object.assign(o, at(), s || {});
    }
    const $ = f(() => ({
      project: Object.fromEntries(F.value.map((s) => [s.name, s.project_name || s.name])),
      activity: Object.fromEntries(R.value.map((s) => [s.name, s.activity_name || s.name])),
      contractor: Object.fromEntries(P.value.map((s) => [s.name, s.contractor_name || s.name]))
    })), ot = f(() => Bt(_.value)), K = f(() => _.value.filter((s) => It(s, j.value) && Ut(s, D.value, $.value))), st = f(() => F.value.filter((s) => s.status !== "Closed" || s.name === o.project)), nt = f(() => Gt(R.value, _.value, o.name, o.activity)), lt = f(() => P.value.filter((s) => !s.disabled || s.name === o.contractor)), u = f(() => qt(o.status, B.value)), rt = f(() => !!o.name && Kt(o, B.value)), it = f(() => A.value.every((s) => /^(Choose|Enter|Select)/.test(s)) ? "Please complete the required fields" : "Please fix the following"), A = f(() => zt(o, P.value.find((s) => s.name === o.contractor), _.value));
    function x(s) {
      return i[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function L() {
      V.value = !0;
      try {
        const [s, t, a, v, k] = await Promise.all([
          H(W, { fields: [
            "name",
            "status",
            "project",
            "activity",
            "contractor",
            "start_date",
            "end_date",
            "contract_value",
            "narration",
            "raised_by",
            "approved_by",
            "approved_on",
            "rejection_reason",
            "closed_on"
          ], order: "modified desc", limit: 1e3 }),
          H("Project", { fields: ["name", "project_name", "status"], limit: 1e3 }),
          H("Labour Activity", { fields: ["name", "activity_name", "disabled"], order: "activity_code asc", limit: 500 }),
          H("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1e3 }),
          wt(Y + "my_permissions", {})
        ]);
        _.value = s || [], F.value = t || [], R.value = a || [], P.value = v || [], B.value = !!(k && k.can_approve);
      } catch (s) {
        y("Failed to load contracts: " + (s.message || s), "error");
      } finally {
        V.value = !1;
      }
    }
    function ct() {
      q(), g.value = !0;
    }
    function dt(s) {
      q({ ...s }), g.value = !0;
    }
    async function J(s) {
      var a;
      const t = Ht(o, _.value, o.name);
      if (Object.keys(i).forEach((v) => delete i[v]), Object.assign(i, t), Object.keys(t).length)
        return y(Object.values(t)[0], "error"), "";
      I.value = !0;
      try {
        const v = await jt(), k = await xt({
          doctype: W,
          ...o.name ? { name: o.name } : {},
          company: v,
          project: o.project,
          activity: o.activity,
          contractor: o.contractor,
          start_date: o.start_date,
          end_date: o.end_date,
          contract_value: Number(o.contract_value) || 0,
          narration: (o.narration || "").trim()
        }), Q = k && (k.name || ((a = k.doc) == null ? void 0 : a.name)) || o.name;
        return s || y(o.name ? "Contract updated" : "Contract saved"), o.name = Q, await L(), Q;
      } catch (v) {
        return y(v.message || "Could not save contract", "error"), "";
      } finally {
        I.value = !1;
      }
    }
    async function M(s, t, a) {
      m.value = !0;
      try {
        const v = await Tt(Y + s, t);
        y(a), await L(), v && v.name && q(_.value.find((k) => k.name === v.name) || v);
      } catch (v) {
        y(v.message || "Action failed", "error");
      } finally {
        m.value = !1;
      }
    }
    async function ut() {
      if (!await T({ title: "Send for approval?", body: "Send this contract to the Director for approval? The contract value is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const t = await J(!0);
      t && await M("send_for_approval", { name: t }, "Sent for Director approval");
    }
    async function vt() {
      await T({ title: "Approve contract?", body: "Approve " + o.name + "? The contract value is locked once it is approved.", okLabel: "Approve", okStyle: "primary" }) && await M("approve_contract", { name: o.name }, "Contract approved");
    }
    async function pt() {
      const s = await Z({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !s || !s.trim() || await M("send_back_contract", { name: o.name, reason: s.trim() }, "Sent back");
    }
    async function mt() {
      await T({ title: "Close contract?", body: "A closed contract is locked. Only a Director can reopen it.", okLabel: "Close contract", okStyle: "primary" }) && await M("close_contract", { name: o.name }, "Contract closed");
    }
    async function bt() {
      await T({ title: "Reopen contract?", body: "Reopen " + o.name + "? It goes back to Approved and can be used on weekly bills again.", okLabel: "Reopen contract", okStyle: "primary" }) && await M("reopen_contract", { name: o.name }, "Contract reopened");
    }
    async function ft() {
      if (await T({ title: "Delete contract?", body: "Delete " + o.name + "? This can't be undone. A contract on a weekly bill can't be deleted." })) {
        m.value = !0;
        try {
          await St(W, o.name), y("Contract deleted"), g.value = !1, await L();
        } catch (t) {
          y(t.message || "Could not delete contract", "error");
        } finally {
          m.value = !1;
        }
      }
    }
    return kt(L), (s, t) => (n(), l("div", Wt, [
      e("div", Jt, [
        e("div", Qt, [
          e("span", {
            innerHTML: c(C)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Xt),
          h(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (a) => D.value = a),
            placeholder: "Search contracts…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [O, D.value]
          ])
        ]),
        e("div", Yt, [
          (n(), l(w, null, S(et, (a) => e("button", {
            key: a.k,
            class: G(["sales-pill", { active: j.value === a.k }]),
            onClick: (v) => j.value = a.k
          }, [
            p(r(a.l) + " ", 1),
            e("span", {
              class: G(["sales-pill-count", j.value === a.k ? "" : "zb-pc-muted"])
            }, r(ot.value[a.k]), 3)
          ], 10, Zt)), 64))
        ]),
        e("div", te, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: L,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: c(C)("refresh", 13)
            }, null, 8, ee),
            t[18] || (t[18] = p(" Refresh", -1))
          ]),
          e("button", {
            class: "sales-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Not permitted",
            onClick: ct
          }, [
            e("span", {
              innerHTML: c(C)("plus", 13)
            }, null, 8, oe),
            t[19] || (t[19] = p(" New Contract", -1))
          ], 8, ae)
        ])
      ]),
      e("div", se, [
        e("table", ne, [
          t[22] || (t[22] = e("thead", null, [
            e("tr", null, [
              e("th", { class: "vt-th" }, "Contract"),
              e("th", { class: "vt-th" }, "Project"),
              e("th", { class: "vt-th" }, "Task / Activity"),
              e("th", { class: "vt-th" }, "Contractor"),
              e("th", { class: "vt-th vt-th-r" }, "Contract Value (KES)"),
              e("th", { class: "vt-th" }, "Period"),
              e("th", { class: "vt-th" }, "Status")
            ])
          ], -1)),
          e("tbody", null, [
            V.value ? (n(), l(w, { key: 0 }, S(6, (a) => e("tr", {
              key: a,
              class: "vt-row-shimmer"
            }, [...t[20] || (t[20] = [
              e("td", { colspan: "7" }, [
                e("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : K.value.length ? (n(!0), l(w, { key: 2 }, S(K.value, (a) => (n(), l("tr", {
              key: a.name,
              class: "inv-row",
              onClick: (v) => dt(a)
            }, [
              e("td", ue, r(a.name), 1),
              e("td", ve, r($.value.project[a.project] || a.project), 1),
              e("td", pe, r($.value.activity[a.activity] || a.activity), 1),
              e("td", me, r($.value.contractor[a.contractor] || a.contractor), 1),
              e("td", be, r(c(Ft)(a.contract_value)), 1),
              e("td", fe, r(c(N)(a.start_date)) + " – " + r(c(N)(a.end_date)), 1),
              e("td", _e, [
                e("span", {
                  class: G(["vt-badge", "vt-badge-" + c(Rt)(a.status)])
                }, [
                  t[21] || (t[21] = e("span", { class: "vt-badge-dot" }, null, -1)),
                  p(r(a.status), 1)
                ], 2)
              ])
            ], 8, de))), 128)) : (n(), l("tr", le, [
              e("td", re, [
                e("div", ie, r(D.value || j.value !== "all" ? "No results found" : "No contracts yet"), 1),
                e("div", ce, r(D.value || j.value !== "all" ? "Try adjusting your search or filter" : "Add your first labour contract to get started"), 1)
              ])
            ]))
          ])
        ]),
        !V.value && _.value.length ? (n(), l("div", ye, [
          t[23] || (t[23] = p("Showing ", -1)),
          e("strong", null, r(K.value.length), 1),
          t[24] || (t[24] = p(" of ", -1)),
          e("strong", null, r(_.value.length), 1),
          t[25] || (t[25] = p(" contracts", -1))
        ])) : d("", !0)
      ]),
      t[36] || (t[36] = e("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "A Director approves each contract. The value is locked once the contract is sent for approval. A contractor can hold any number of contracts. Each activity can be used on one contract only.", -1)),
      (n(), ht(Ct, { to: "body" }, [
        g.value ? (n(), l("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: t[17] || (t[17] = gt((a) => g.value = !1, ["self"]))
        }, [
          e("div", ke, [
            e("div", he, [
              e("div", ge, [
                e("div", Ce, [
                  e("span", {
                    innerHTML: c(C)("file", 16)
                  }, null, 8, we)
                ]),
                e("div", null, [
                  e("div", Se, r(o.name || "New Contract"), 1),
                  e("div", je, r(o.name ? o.status : "Labour contract for one task on one project"), 1)
                ])
              ]),
              e("button", {
                class: "inv-dclose",
                style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                onClick: t[1] || (t[1] = (a) => g.value = !1),
                innerHTML: c(C)("x", 15)
              }, null, 8, xe)
            ]),
            e("div", Ee, [
              e("div", Te, [
                e("div", De, [
                  t[27] || (t[27] = e("label", { class: "inv-lbl" }, [
                    p("Project "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  h(e("select", {
                    "onUpdate:modelValue": t[2] || (t[2] = (a) => o.project = a),
                    class: "inv-fi",
                    style: E(x("project")),
                    disabled: !u.value.canEdit,
                    onChange: t[3] || (t[3] = (a) => {
                      delete i.project, delete i.activity;
                    })
                  }, [
                    t[26] || (t[26] = e("option", { value: "" }, "Select project", -1)),
                    (n(!0), l(w, null, S(st.value, (a) => (n(), l("option", {
                      key: a.name,
                      value: a.name
                    }, r(a.project_name || a.name), 9, Le))), 128))
                  ], 44, Ae), [
                    [z, o.project]
                  ]),
                  i.project ? (n(), l("div", Me, r(i.project), 1)) : d("", !0)
                ]),
                e("div", Oe, [
                  t[29] || (t[29] = e("label", { class: "inv-lbl" }, [
                    p("Task / Activity "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  h(e("select", {
                    "onUpdate:modelValue": t[4] || (t[4] = (a) => o.activity = a),
                    class: "inv-fi",
                    style: E(x("activity")),
                    disabled: !u.value.canEdit,
                    onChange: t[5] || (t[5] = (a) => delete i.activity)
                  }, [
                    t[28] || (t[28] = e("option", { value: "" }, "Select activity", -1)),
                    (n(!0), l(w, null, S(nt.value, (a) => (n(), l("option", {
                      key: a.name,
                      value: a.name
                    }, r(a.activity_name || a.name), 9, Ve))), 128))
                  ], 44, Pe), [
                    [z, o.activity]
                  ]),
                  i.activity ? (n(), l("div", $e, r(i.activity), 1)) : d("", !0)
                ]),
                e("div", He, [
                  t[31] || (t[31] = e("label", { class: "inv-lbl" }, [
                    p("Contractor "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  h(e("select", {
                    "onUpdate:modelValue": t[6] || (t[6] = (a) => o.contractor = a),
                    class: "inv-fi",
                    style: E(x("contractor")),
                    disabled: !u.value.canEdit,
                    onChange: t[7] || (t[7] = (a) => delete i.contractor)
                  }, [
                    t[30] || (t[30] = e("option", { value: "" }, "Select contractor", -1)),
                    (n(!0), l(w, null, S(lt.value, (a) => (n(), l("option", {
                      key: a.name,
                      value: a.name
                    }, r(a.contractor_name || a.name) + r(c(Mt)(a.tax_cert_expiry) ? " (certificate expired)" : ""), 9, Fe))), 128))
                  ], 44, Ne), [
                    [z, o.contractor]
                  ]),
                  i.contractor ? (n(), l("div", Re, r(i.contractor), 1)) : d("", !0)
                ]),
                e("div", Be, [
                  t[32] || (t[32] = e("label", { class: "inv-lbl" }, [
                    p("Start Date "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  h(e("input", {
                    type: "date",
                    "onUpdate:modelValue": t[8] || (t[8] = (a) => o.start_date = a),
                    class: "inv-fi",
                    style: E(x("start_date")),
                    disabled: !u.value.canEdit,
                    onInput: t[9] || (t[9] = (a) => delete i.start_date)
                  }, null, 44, Ie), [
                    [O, o.start_date]
                  ]),
                  i.start_date ? (n(), l("div", Ue, r(i.start_date), 1)) : d("", !0)
                ]),
                e("div", qe, [
                  t[33] || (t[33] = e("label", { class: "inv-lbl" }, [
                    p("End Date "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  h(e("input", {
                    type: "date",
                    "onUpdate:modelValue": t[10] || (t[10] = (a) => o.end_date = a),
                    class: "inv-fi",
                    style: E(x("end_date")),
                    disabled: !u.value.canEdit,
                    onInput: t[11] || (t[11] = (a) => delete i.end_date)
                  }, null, 44, Ke), [
                    [O, o.end_date]
                  ]),
                  i.end_date ? (n(), l("div", ze, r(i.end_date), 1)) : d("", !0)
                ]),
                e("div", Ge, [
                  t[34] || (t[34] = e("label", { class: "inv-lbl" }, [
                    p("Contract Value (KES) "),
                    e("span", { class: "nim-req" }, "*")
                  ], -1)),
                  h(e("input", {
                    type: "number",
                    min: "0",
                    "onUpdate:modelValue": t[12] || (t[12] = (a) => o.contract_value = a),
                    class: "inv-fi",
                    style: E(x("contract_value")),
                    disabled: !u.value.canEdit,
                    onInput: t[13] || (t[13] = (a) => delete i.contract_value)
                  }, null, 44, We), [
                    [
                      O,
                      o.contract_value,
                      void 0,
                      { number: !0 }
                    ]
                  ]),
                  i.contract_value ? (n(), l("div", Je, r(i.contract_value), 1)) : (n(), l("div", Qe, [
                    e("span", {
                      innerHTML: c(C)("info", 14)
                    }, null, 8, Xe),
                    p(r(u.value.canEdit ? "Value locks once sent for approval." : "Value is locked."), 1)
                  ]))
                ]),
                e("div", Ye, [
                  t[35] || (t[35] = e("label", { class: "inv-lbl" }, "Narration", -1)),
                  h(e("textarea", {
                    "onUpdate:modelValue": t[14] || (t[14] = (a) => o.narration = a),
                    class: "inv-fi",
                    rows: "3",
                    placeholder: "Enter narration",
                    disabled: !u.value.canEdit,
                    style: { height: "auto", padding: "8px 10px" }
                  }, null, 8, Ze), [
                    [O, o.narration]
                  ])
                ])
              ]),
              o.status === c(Ot) && o.rejection_reason ? (n(), l("div", ta, "Sent back: " + r(o.rejection_reason), 1)) : d("", !0),
              o.status === c(Pt) ? (n(), l("div", ea, "Waiting for Director approval. The contract is locked.")) : d("", !0),
              o.status === c(Vt) ? (n(), l("div", aa, "Approved by " + r(c(Lt)(o.approved_by)) + " on " + r(c(N)(o.approved_on)) + ". Contract value is locked.", 1)) : d("", !0),
              o.status === c($t) ? (n(), l("div", oa, "Closed on " + r(c(N)(o.closed_on)) + ". Only a Director can reopen it.", 1)) : d("", !0),
              A.value.length && (u.value.canSend || u.value.canApprove) ? (n(), l("div", sa, [
                e("div", na, [
                  e("span", {
                    innerHTML: c(C)("alert", 15)
                  }, null, 8, la),
                  p(r(it.value), 1)
                ]),
                e("ul", null, [
                  (n(!0), l(w, null, S(A.value, (a) => (n(), l("li", { key: a }, r(a), 1))), 128))
                ])
              ])) : d("", !0)
            ]),
            e("div", ra, [
              rt.value && s.$canDelete("admin") ? (n(), l("button", {
                key: 0,
                class: "form-btn form-btn-outline",
                disabled: m.value,
                onClick: ft,
                style: { "margin-right": "auto", color: "#dc2626" }
              }, "Delete", 8, ia)) : d("", !0),
              e("button", {
                class: "form-btn form-btn-outline",
                onClick: t[15] || (t[15] = (a) => g.value = !1)
              }, r(u.value.canEdit ? "Cancel" : "Close window"), 1),
              u.value.canEdit ? (n(), l("button", {
                key: 1,
                class: "form-btn form-btn-outline ct-btn-blue",
                disabled: m.value || !U.value,
                onClick: t[16] || (t[16] = (a) => J(!1))
              }, r(I.value ? "Saving…" : "Save Draft"), 9, ca)) : d("", !0),
              u.value.canSend ? (n(), l("button", {
                key: 2,
                class: "form-btn form-btn-primary",
                disabled: m.value || !U.value || A.value.length > 0,
                onClick: ut
              }, "Submit for approval", 8, da)) : d("", !0),
              u.value.canApprove ? (n(), l("button", {
                key: 3,
                class: "form-btn form-btn-primary",
                disabled: m.value || A.value.length > 0,
                onClick: vt
              }, "Approve as Director", 8, ua)) : d("", !0),
              u.value.canSendBack ? (n(), l("button", {
                key: 4,
                class: "form-btn form-btn-outline",
                disabled: m.value,
                onClick: pt
              }, "Send back", 8, va)) : d("", !0),
              u.value.canClose ? (n(), l("button", {
                key: 5,
                class: "form-btn form-btn-outline",
                disabled: m.value || !U.value,
                onClick: mt
              }, "Close contract", 8, pa)) : d("", !0),
              u.value.canReopen ? (n(), l("button", {
                key: 6,
                class: "form-btn form-btn-primary",
                disabled: m.value,
                onClick: bt
              }, "Reopen contract", 8, ma)) : d("", !0)
            ])
          ])
        ])) : d("", !0)
      ]))
    ]));
  }
}, wa = /* @__PURE__ */ _t(ba, [["__scopeId", "data-v-fe6e120b"]]);
export {
  wa as default
};
