import { _ as Ut, y as Ht, o as Ft, c as u, a as t, u as v, i as D, w as nt, B as ot, F as B, r as O, d as w, t as c, b as f, D as Wt, x as $t, p as Rt, J as Vt, f as P, l as st, h as y, g, A as bt, a2 as It, L as Kt, e as zt, a3 as Jt, K as Gt, $ as Yt, k as d, n as lt, Y as qt, S as Qt } from "./main-DlHOPnai.js";
import { b as Xt } from "./format-BcJZDVG4.js";
import { o as Zt } from "./userNames-y3-EYbxD.js";
import { t as J, i as ht } from "./labourContractor-fn9JaBmq.js";
import { f as T, s as te } from "./labourContract-D3MXcMdd.js";
const ut = "Draft", I = "Pending approval", kt = "Approved", vt = "Sent back", yt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], K = (n) => {
  const [o, i, p] = String(n).slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(o, i - 1, p));
}, wt = (n) => n.toISOString().slice(0, 10);
function ee(n, o = J()) {
  return !!n && z(n) < z(o);
}
function ae(n, o, i, p = J()) {
  return !!i && ee(o, p) && (Number(n.paid_till_now) || 0) > 5e-3;
}
function z(n) {
  const o = K(n);
  return o.setUTCDate(o.getUTCDate() - (o.getUTCDay() + 6) % 7), wt(o);
}
function ne(n) {
  const o = K(z(n));
  return o.setUTCDate(o.getUTCDate() + 6), wt(o);
}
function dt(n) {
  if (!n) return "";
  const o = K(z(n)), i = K(ne(n));
  return o.getUTCDate() + " " + yt[o.getUTCMonth()] + " to " + i.getUTCDate() + " " + yt[i.getUTCMonth()] + " " + i.getUTCFullYear();
}
function gt(n, o) {
  return o === "draft" ? n.status === ut || n.status === vt : o === "pending" ? n.status === I : o === "approved" ? n.status === kt : !0;
}
function oe(n) {
  const o = { all: n.length, draft: 0, pending: 0, approved: 0 };
  for (const i of n) for (const p of ["draft", "pending", "approved"]) gt(i, p) && o[p]++;
  return o;
}
function se(n, o, i = {}, p = {}) {
  const _ = String(o || "").trim().toLowerCase();
  if (!_) return !0;
  const b = p[n.name] || {}, m = (b.contracts || []).join(" "), x = (b.projects || []).map((h) => h + " " + (i[h] || "")).join(" ");
  return [n.name, n.status, n.project, i[n.project], dt(n.week_start), m, x].some((h) => String(h || "").toLowerCase().includes(_));
}
function le(n = []) {
  return n.length ? n.slice(0, 2).join(", ") + (n.length > 2 ? " +" + (n.length - 2) : "") : "—";
}
function re(n, o = {}, i = {}) {
  const p = o && o.projects && o.projects.length ? o.projects : n && n.project ? [n.project] : [];
  if (!p.length) return "—";
  const _ = p.map((b) => i[b] || b);
  return _.slice(0, 2).join(", ") + (_.length > 2 ? " +" + (_.length - 2) : "");
}
function ie(n) {
  return (Number(n.balance) || 0) <= 5e-3 && !(Number(n.amount_to_pay) > 0);
}
function ce(n = []) {
  return n.filter((o) => !ie(o));
}
function de(n = [], o = []) {
  const i = new Map(o.map((_) => [_.contract, Number(_.amount_to_pay) || 0]));
  return { rows: n.map((_) => {
    const b = i.get(_.contract);
    return i.delete(_.contract), { ..._, amount_to_pay: b && !_.paid_this_week ? b : "" };
  }), dropped: [...i].filter(([, _]) => _ > 0).map(([_]) => _) };
}
function ue(n) {
  return n.reduce((o, i) => o + (Number(i.amount_to_pay) || 0), 0);
}
function V(n) {
  const o = Number(n.amount_to_pay) || 0;
  return o < 0 ? "Amount can't be negative" : o > (Number(n.balance) || 0) + 5e-3 ? "Above the balance of " + Math.round(Number(n.balance) || 0).toLocaleString("en-US") : "";
}
function ve(n, o = [], i = J()) {
  const p = [], _ = n.filter((b) => Number(b.amount_to_pay) > 0);
  _.length || p.push("Enter an amount to pay on at least one contract.");
  for (const b of _) {
    const m = o.find((h) => h.name === b.contractor), x = m && m.contractor_name || b.contractor;
    m && m.disabled && p.push("Contractor " + x + " is inactive."), m && ht(m.tax_cert_expiry, i) && p.push("Certificate of " + x + " expired on " + String(m.tax_cert_expiry).slice(0, 10) + ". New contracts and bills are blocked for this contractor.");
  }
  for (const b of n) {
    const m = V(b);
    m && p.push("Contract " + b.contract + ": " + m);
  }
  return p;
}
function pe(n, o = []) {
  const i = {};
  return n.week_date ? o.length || (i.week_date = "There are no Approved contracts to bill") : i.week_date = "Pick a date in the week", i;
}
function rt(n, o) {
  const i = n === ut || n === vt;
  return { canEdit: i, canSend: i, canApprove: n === I && !!o, canSendBack: n === I && !!o };
}
function _e(n) {
  return n.status === ut && !n.raised_by;
}
function me(n, o, i) {
  return {
    doctype: "Labour Weekly Bill",
    ...n.name ? { name: n.name } : {},
    company: i,
    week_start: n.week_date,
    lines: o.map((p) => ({ contract: p.contract, amount_to_pay: Number(p.amount_to_pay) || 0 }))
  };
}
const fe = { class: "list-page" }, be = { class: "sales-toolbar" }, ye = { class: "sales-search" }, he = ["innerHTML"], ke = { class: "sales-pills" }, we = ["onClick"], ge = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, Ce = ["innerHTML"], je = ["disabled", "title"], Se = ["innerHTML"], Te = { class: "inv-table-wrap" }, xe = { class: "inv-table" }, Ae = { key: 1 }, De = {
  colspan: "7",
  class: "vt-empty"
}, Le = { class: "vt-empty-title" }, Ee = { class: "vt-empty-sub" }, Ne = ["onClick"], Me = { class: "vt-td vt-td-mono" }, Be = { class: "vt-td" }, Oe = ["title"], Pe = { class: "vt-td vt-td-secondary" }, Ue = { class: "vt-td vt-td-r" }, He = { class: "vt-td vt-td-r" }, Fe = { class: "vt-td" }, We = {
  key: 0,
  class: "vt-footer"
}, $e = {
  class: "inv-drawer-panel open ct-drawer",
  style: { width: "1160px", "max-width": "98vw" }
}, Re = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#1e3a5f,#1a6ef7)", padding: "18px 24px" }
}, Ve = { class: "cust-drawer-header-left" }, Ie = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, Ke = ["innerHTML"], ze = { class: "inv-dh-title" }, Je = { class: "cust-drawer-sub" }, Ge = ["innerHTML"], Ye = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, qe = { class: "inv-fg inv-fg2" }, Qe = { class: "inv-field" }, Xe = ["disabled"], Ze = {
  key: 0,
  class: "ct-err"
}, ta = { class: "inv-field" }, ea = ["value"], aa = { style: { "overflow-x": "auto", "margin-top": "16px" } }, na = { class: "inv-table" }, oa = { key: 0 }, sa = { key: 1 }, la = {
  colspan: "8",
  class: "vt-empty"
}, ra = { class: "vt-empty-sub" }, ia = { class: "vt-td vt-td-mono" }, ca = { class: "vt-td" }, da = {
  key: 0,
  class: "ct-flag"
}, ua = { class: "vt-td" }, va = { class: "vt-td" }, pa = { class: "vt-td vt-td-r" }, _a = { class: "vt-td vt-td-r" }, ma = {
  key: 0,
  class: "ct-hint"
}, fa = { class: "vt-td vt-td-r" }, ba = { class: "vt-td vt-td-r" }, ya = ["onUpdate:modelValue", "disabled", "aria-label"], ha = {
  key: 0,
  class: "ct-hint"
}, ka = {
  key: 1,
  class: "ct-hint"
}, wa = {
  key: 2,
  class: "ct-err"
}, ga = {
  key: 0,
  style: { "margin-top": "12px", "font-weight": "600", "text-align": "right" }
}, Ca = { class: "ct-info" }, ja = ["innerHTML"], Sa = {
  key: 1,
  class: "ct-note ct-note-bad"
}, Ta = {
  key: 2,
  class: "ct-note"
}, xa = {
  key: 3,
  class: "ct-note ct-note-ok"
}, Aa = {
  key: 4,
  class: "ct-errbox"
}, Da = { class: "ct-errbox-title" }, La = ["innerHTML"], Ea = {
  key: 5,
  class: "ct-note ct-note-bad"
}, Na = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd", "flex-wrap": "wrap", gap: "8px" }
}, Ma = ["disabled"], Ba = ["disabled"], Oa = ["disabled"], Pa = ["disabled"], Ua = ["disabled"], it = "Labour Weekly Bill", ct = "psd_books.api.labour_weekly_bill.", Ha = {
  __name: "WeeklyBill",
  setup(n) {
    const { toast: o } = Ht(), { confirm: i } = Jt(), { prompt: p } = Yt(), { canEdit: _ } = Qt(), b = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }], m = y([]), x = y([]), h = y({}), G = y({}), U = y({}), H = y([]), pt = y(!1), F = y(!0), N = y(""), L = y("all"), A = y(!1), Y = y(!1), C = y(!1), k = y([]), q = g(() => ce(k.value)), Q = y(!1), E = y(""), j = bt({}), r = bt({}), _t = g(() => _("admin")), Ct = () => ({ name: "", status: "Draft", project: "", week_date: J(), raised_by: "", approved_by: "", approved_on: "", rejection_reason: "" });
    function mt(s) {
      Object.keys(j).forEach((e) => delete j[e]), Object.keys(r).forEach((e) => delete r[e]), Object.assign(r, Ct(), s || {}), k.value = [], E.value = "";
    }
    const X = g(() => Object.fromEntries(x.value.map((s) => [s.name, s.project_name || s.name]))), jt = g(() => Object.fromEntries(H.value.map((s) => [s.name, s.contractor_name || s.name]))), St = g(() => oe(m.value)), Z = g(() => m.value.filter((s) => gt(s, L.value) && se(s, N.value, X.value, h.value))), S = g(() => rt(r.status, pt.value)), Tt = g(() => !!r.name && _e(r)), tt = g(() => ue(k.value)), W = g(() => ve(k.value, H.value)), et = (s) => ae(s, r.week_date, !r.name), xt = (s) => {
      const e = H.value.find((a) => a.name === s);
      return !!e && ht(e.tax_cert_expiry);
    };
    function At(s) {
      return j[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function M() {
      F.value = !0;
      try {
        const [s, e, a, l] = await Promise.all([
          P(it, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "week_start desc, modified desc", limit: 1e3 }),
          P("Project", { fields: ["name", "project_name", "status"], limit: 1e3 }),
          P("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1e3 }),
          st("psd_books.api.labour_contract.my_permissions", {})
        ]);
        m.value = s || [], x.value = e || [], H.value = a || [], pt.value = !!(l && l.can_approve), Dt(), Lt();
      } catch (s) {
        o("Failed to load weekly bills: " + (s.message || s), "error");
      } finally {
        F.value = !1;
      }
    }
    async function Dt() {
      try {
        h.value = await st(ct + "list_columns", { names: m.value.map((s) => s.name) }) || {};
      } catch {
        h.value = {};
      }
    }
    async function Lt() {
      try {
        const [s, e] = await Promise.all([
          P("Labour Contract", { fields: ["name", "activity", "project"], limit: 1e3 }),
          P("Labour Activity", { fields: ["name", "activity_name"], limit: 1e3 })
        ]), a = Object.fromEntries((e || []).map((l) => [l.name, l.activity_name || l.name]));
        G.value = Object.fromEntries((s || []).map((l) => [l.name, a[l.activity] || l.activity || ""])), U.value = Object.fromEntries((s || []).map((l) => [l.name, l.project || ""]));
      } catch {
        G.value = {}, U.value = {};
      }
    }
    async function $(s) {
      if (E.value = "", !r.week_date) {
        k.value = [];
        return;
      }
      Q.value = !0;
      try {
        const e = await st(ct + "preview", { week_date: r.week_date, name: r.name || null }), a = de(e.rows || [], s || k.value);
        k.value = a.rows.map((l) => et(l) ? { ...l, amount_to_pay: "" } : l), a.dropped.length && (E.value = "Contract " + a.dropped.join(", ") + " is no longer Approved, or its project is Closed, so it can't be paid on this bill.");
      } catch (e) {
        k.value = [], o(e.message || "Could not load contracts", "error");
      } finally {
        Q.value = !1;
      }
    }
    function Et() {
      mt(), A.value = !0, $();
    }
    async function Nt(s) {
      mt({ ...s, week_date: s.week_start }), A.value = !0;
      try {
        const e = await qt(it, s.name);
        Object.assign(r, { rejection_reason: e.rejection_reason, approved_by: e.approved_by, approved_on: e.approved_on, raised_by: e.raised_by }), rt(e.status, !1).canEdit ? await $(e.lines || []) : k.value = (e.lines || []).map((a) => ({ ...a }));
      } catch (e) {
        o(e.message || "Could not open bill", "error");
      }
    }
    async function ft(s) {
      const e = pe(r, k.value);
      if (Object.keys(j).forEach((l) => delete j[l]), Object.assign(j, e), Object.keys(e).length)
        return o(Object.values(e)[0], "error"), "";
      const a = k.value.map((l) => V(l)).find(Boolean);
      if (a)
        return o(a, "error"), "";
      Y.value = !0;
      try {
        const l = await Kt(me(r, k.value, await zt())), R = l && l.name || r.name;
        return s || o(r.name ? "Bill updated" : "Bill saved"), r.name = R, await M(), R;
      } catch (l) {
        return o(l.message || "Could not save bill", "error"), "";
      } finally {
        Y.value = !1;
      }
    }
    async function at(s, e, a) {
      C.value = !0;
      try {
        const l = await Gt(ct + s, e);
        o(a), await M(), l && l.name && (Object.assign(r, { status: l.status, raised_by: l.raised_by, approved_by: l.approved_by, approved_on: l.approved_on, rejection_reason: l.rejection_reason }), rt(l.status, !1).canEdit ? await $(l.lines || []) : k.value = (l.lines || []).map((R) => ({ ...R })));
      } catch (l) {
        o(l.message || "Action failed", "error");
      } finally {
        C.value = !1;
      }
    }
    async function Mt() {
      if (!await i({ title: "Send for approval?", body: "Send this bill to the Director for approval? Total to pay: KES " + T(tt.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" })) return;
      const e = await ft(!0);
      e && await at("send_for_approval", { name: e }, "Sent for Director approval");
    }
    async function Bt() {
      await i({ title: "Approve bill?", body: "Approve " + r.name + "? Total to pay: KES " + T(tt.value) + ".", okLabel: "Approve", okStyle: "primary" }) && await at("approve_bill", { name: r.name }, "Bill approved");
    }
    async function Ot() {
      const s = await p({ title: "Send back", label: "Reason", okLabel: "Send back" });
      !s || !s.trim() || await at("send_back_bill", { name: r.name, reason: s.trim() }, "Sent back");
    }
    async function Pt() {
      if (await i({ title: "Delete bill?", body: "Delete " + r.name + "? Only a bill never sent for approval can be deleted." })) {
        C.value = !0;
        try {
          await It(it, r.name), o("Bill deleted"), A.value = !1, await M();
        } catch (e) {
          o(e.message || "Could not delete bill", "error");
        } finally {
          C.value = !1;
        }
      }
    }
    return Ft(M), (s, e) => (d(), u("div", fe, [
      t("div", be, [
        t("div", ye, [
          t("span", {
            innerHTML: v(D)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, he),
          nt(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (a) => N.value = a),
            placeholder: "Search weekly bills…",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [ot, N.value]
          ])
        ]),
        t("div", ke, [
          (d(), u(B, null, O(b, (a) => t("button", {
            key: a.k,
            class: lt(["sales-pill", { active: L.value === a.k }]),
            onClick: (l) => L.value = a.k
          }, [
            w(c(a.l) + " ", 1),
            t("span", {
              class: lt(["sales-pill-count", L.value === a.k ? "" : "zb-pc-muted"])
            }, c(St.value[a.k]), 3)
          ], 10, we)), 64))
        ]),
        t("div", ge, [
          t("button", {
            class: "sales-btn-ghost",
            onClick: M,
            title: "Refresh"
          }, [
            t("span", {
              innerHTML: v(D)("refresh", 13)
            }, null, 8, Ce),
            e[7] || (e[7] = w(" Refresh", -1))
          ]),
          t("button", {
            class: "sales-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Not permitted",
            onClick: Et
          }, [
            t("span", {
              innerHTML: v(D)("plus", 13)
            }, null, 8, Se),
            e[8] || (e[8] = w(" New Weekly Bill", -1))
          ], 8, je)
        ])
      ]),
      t("div", Te, [
        t("table", xe, [
          e[11] || (e[11] = t("thead", null, [
            t("tr", null, [
              t("th", { class: "vt-th" }, "Bill"),
              t("th", { class: "vt-th" }, "Project"),
              t("th", { class: "vt-th" }, "Contract"),
              t("th", { class: "vt-th" }, "Week (Monday to Sunday)"),
              t("th", { class: "vt-th vt-th-r" }, "Total to Pay (KES)"),
              t("th", { class: "vt-th vt-th-r" }, "Balance to Pay (KES)"),
              t("th", { class: "vt-th" }, "Status")
            ])
          ], -1)),
          t("tbody", null, [
            F.value ? (d(), u(B, { key: 0 }, O(6, (a) => t("tr", {
              key: a,
              class: "vt-row-shimmer"
            }, [...e[9] || (e[9] = [
              t("td", { colspan: "7" }, [
                t("div", {
                  class: "shimmer",
                  style: { height: "12px", "border-radius": "3px", width: "65%" }
                })
              ], -1)
            ])])), 64)) : Z.value.length ? (d(!0), u(B, { key: 2 }, O(Z.value, (a) => (d(), u("tr", {
              key: a.name,
              class: "inv-row",
              onClick: (l) => Nt(a)
            }, [
              t("td", Me, c(a.name), 1),
              t("td", Be, c(v(re)(a, h.value[a.name], X.value)), 1),
              t("td", {
                class: "vt-td vt-td-mono",
                title: ((h.value[a.name] || {}).contracts || []).join(", ")
              }, c(v(le)((h.value[a.name] || {}).contracts)), 9, Oe),
              t("td", Pe, c(v(dt)(a.week_start)), 1),
              t("td", Ue, c(v(T)(a.total_amount)), 1),
              t("td", He, c(h.value[a.name] ? v(T)(h.value[a.name].balance_after) : "—"), 1),
              t("td", Fe, [
                t("span", {
                  class: lt(["vt-badge", "vt-badge-" + v(te)(a.status)])
                }, [
                  e[10] || (e[10] = t("span", { class: "vt-badge-dot" }, null, -1)),
                  w(c(a.status), 1)
                ], 2)
              ])
            ], 8, Ne))), 128)) : (d(), u("tr", Ae, [
              t("td", De, [
                t("div", Le, c(N.value || L.value !== "all" ? "No results found" : "No weekly bills yet"), 1),
                t("div", Ee, c(N.value || L.value !== "all" ? "Try adjusting your search or filter" : "Create the first weekly bill"), 1)
              ])
            ]))
          ])
        ]),
        !F.value && m.value.length ? (d(), u("div", We, [
          e[12] || (e[12] = w("Showing ", -1)),
          t("strong", null, c(Z.value.length), 1),
          e[13] || (e[13] = w(" of ", -1)),
          t("strong", null, c(m.value.length), 1),
          e[14] || (e[14] = w(" bills", -1))
        ])) : f("", !0)
      ]),
      e[21] || (e[21] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.", -1)),
      (d(), Wt(Vt, { to: "body" }, [
        A.value ? (d(), u("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: e[6] || (e[6] = $t((a) => A.value = !1, ["self"]))
        }, [
          t("div", $e, [
            t("div", Re, [
              t("div", Ve, [
                t("div", Ie, [
                  t("span", {
                    innerHTML: v(D)("fileplus", 16)
                  }, null, 8, Ke)
                ]),
                t("div", null, [
                  t("div", ze, c(r.name || "New Weekly Bill"), 1),
                  t("div", Je, c(r.name ? r.status : "Amounts to pay contractors for one week"), 1)
                ])
              ]),
              t("button", {
                class: "inv-dclose",
                style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                onClick: e[1] || (e[1] = (a) => A.value = !1),
                innerHTML: v(D)("x", 15)
              }, null, 8, Ge)
            ]),
            t("div", Ye, [
              t("div", qe, [
                t("div", Qe, [
                  e[15] || (e[15] = t("label", { class: "inv-lbl" }, [
                    w("Pick any date in the week "),
                    t("span", { class: "nim-req" }, "*")
                  ], -1)),
                  nt(t("input", {
                    type: "date",
                    "onUpdate:modelValue": e[2] || (e[2] = (a) => r.week_date = a),
                    class: "inv-fi",
                    style: Rt(At("week_date")),
                    disabled: !S.value.canEdit || !!r.name,
                    onChange: e[3] || (e[3] = (a) => {
                      delete j.week_date, $();
                    })
                  }, null, 44, Xe), [
                    [ot, r.week_date]
                  ]),
                  j.week_date ? (d(), u("div", Ze, c(j.week_date), 1)) : f("", !0)
                ]),
                t("div", ta, [
                  e[16] || (e[16] = t("label", { class: "inv-lbl" }, "Week (Monday to Sunday)", -1)),
                  t("input", {
                    class: "inv-fi",
                    value: v(dt)(r.week_date),
                    disabled: ""
                  }, null, 8, ea)
                ])
              ]),
              t("div", aa, [
                t("table", na, [
                  e[18] || (e[18] = t("thead", null, [
                    t("tr", null, [
                      t("th", { class: "vt-th" }, "Contract"),
                      t("th", { class: "vt-th" }, "Contractor"),
                      t("th", { class: "vt-th" }, "Activity"),
                      t("th", { class: "vt-th" }, "Project"),
                      t("th", { class: "vt-th vt-th-r" }, "Contract Value"),
                      t("th", { class: "vt-th vt-th-r" }, "Paid Till Now"),
                      t("th", { class: "vt-th vt-th-r" }, "Balance Amount"),
                      t("th", { class: "vt-th vt-th-r" }, "Amount To Pay Now")
                    ])
                  ], -1)),
                  t("tbody", null, [
                    Q.value ? (d(), u("tr", oa, [...e[17] || (e[17] = [
                      t("td", {
                        colspan: "8",
                        class: "vt-empty"
                      }, [
                        t("div", { class: "vt-empty-sub" }, "Loading contracts…")
                      ], -1)
                    ])])) : q.value.length ? (d(!0), u(B, { key: 2 }, O(q.value, (a) => (d(), u("tr", {
                      key: a.contract
                    }, [
                      t("td", ia, c(a.contract), 1),
                      t("td", ca, [
                        w(c(jt.value[a.contractor] || a.contractor), 1),
                        xt(a.contractor) ? (d(), u("span", da, " certificate expired")) : f("", !0)
                      ]),
                      t("td", ua, c(G.value[a.contract] || "—"), 1),
                      t("td", va, c(X.value[U.value[a.contract] || a.project] || U.value[a.contract] || a.project || "—"), 1),
                      t("td", pa, c(v(T)(a.contract_value)), 1),
                      t("td", _a, [
                        w(c(v(T)(a.paid_till_now)), 1),
                        a.paid_till_now ? f("", !0) : (d(), u("span", ma, " (New)"))
                      ]),
                      t("td", fa, c(v(T)(a.balance)), 1),
                      t("td", ba, [
                        nt(t("input", {
                          type: "number",
                          min: "0",
                          "onUpdate:modelValue": (l) => a.amount_to_pay = l,
                          class: "inv-fi",
                          style: { width: "130px", "text-align": "right" },
                          disabled: !S.value.canEdit || !!a.paid_this_week || et(a),
                          "aria-label": "Amount to pay now, contract " + a.contract,
                          style2: ""
                        }, null, 8, ya), [
                          [
                            ot,
                            a.amount_to_pay,
                            void 0,
                            { number: !0 }
                          ]
                        ]),
                        a.paid_this_week ? (d(), u("div", ha, "Already on " + c(a.paid_this_week) + " this week", 1)) : f("", !0),
                        et(a) ? (d(), u("div", ka, "Past week: already has payments")) : f("", !0),
                        v(V)(a) ? (d(), u("div", wa, c(v(V)(a)), 1)) : f("", !0)
                      ])
                    ]))), 128)) : (d(), u("tr", sa, [
                      t("td", la, [
                        t("div", ra, c(k.value.length ? "All Approved contracts are fully paid" : "There are no Approved contracts to bill"), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              q.value.length ? (d(), u("div", ga, "Total to pay now: KES " + c(v(T)(tt.value)), 1)) : f("", !0),
              t("div", Ca, [
                t("span", {
                  innerHTML: v(D)("info", 14)
                }, null, 8, ja),
                e[19] || (e[19] = w("Fully paid contracts are not listed. Contracts of all projects are shown. A contract can be paid once a week, and an amount can't be above its balance.", -1))
              ]),
              r.status === v(vt) && r.rejection_reason ? (d(), u("div", Sa, "Sent back: " + c(r.rejection_reason), 1)) : f("", !0),
              r.status === v(I) ? (d(), u("div", Ta, "Waiting for Director approval. The bill is locked.")) : f("", !0),
              r.status === v(kt) ? (d(), u("div", xa, "Approved by " + c(v(Zt)(r.approved_by)) + " on " + c(v(Xt)(r.approved_on)) + ".", 1)) : f("", !0),
              W.value.length && (S.value.canSend || S.value.canApprove) ? (d(), u("div", Aa, [
                t("div", Da, [
                  t("span", {
                    innerHTML: v(D)("alert", 15)
                  }, null, 8, La),
                  e[20] || (e[20] = w("Please fix the following", -1))
                ]),
                t("ul", null, [
                  (d(!0), u(B, null, O(W.value, (a) => (d(), u("li", { key: a }, c(a), 1))), 128))
                ])
              ])) : f("", !0),
              E.value ? (d(), u("div", Ea, c(E.value), 1)) : f("", !0)
            ]),
            t("div", Na, [
              Tt.value && s.$canDelete("admin") ? (d(), u("button", {
                key: 0,
                class: "form-btn form-btn-outline",
                disabled: C.value,
                onClick: Pt,
                style: { "margin-right": "auto", color: "#dc2626" }
              }, "Delete", 8, Ma)) : f("", !0),
              t("button", {
                class: "form-btn form-btn-outline",
                onClick: e[4] || (e[4] = (a) => A.value = !1)
              }, c(S.value.canEdit ? "Cancel" : "Close window"), 1),
              S.value.canEdit ? (d(), u("button", {
                key: 1,
                class: "form-btn form-btn-outline ct-btn-blue",
                disabled: C.value || !_t.value,
                onClick: e[5] || (e[5] = (a) => ft(!1))
              }, c(Y.value ? "Saving…" : "Save Draft"), 9, Ba)) : f("", !0),
              S.value.canSend ? (d(), u("button", {
                key: 2,
                class: "form-btn form-btn-primary",
                disabled: C.value || !_t.value || W.value.length > 0 || !!E.value,
                onClick: Mt
              }, "Send for approval", 8, Oa)) : f("", !0),
              S.value.canApprove ? (d(), u("button", {
                key: 3,
                class: "form-btn form-btn-primary",
                disabled: C.value || W.value.length > 0,
                onClick: Bt
              }, "Approve as Director", 8, Pa)) : f("", !0),
              S.value.canSendBack ? (d(), u("button", {
                key: 4,
                class: "form-btn form-btn-outline",
                disabled: C.value,
                onClick: Ot
              }, "Send back", 8, Ua)) : f("", !0)
            ])
          ])
        ])) : f("", !0)
      ]))
    ]));
  }
}, Ia = /* @__PURE__ */ Ut(Ha, [["__scopeId", "data-v-dcd7996c"]]);
export {
  Ia as default
};
