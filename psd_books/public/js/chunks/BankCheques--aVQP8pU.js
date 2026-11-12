import { _ as ge, x as ke, o as Ce, c as i, a as e, u, i as f, w as Q, A as W, C as we, b as c, F as g, r as x, t as n, d as m, D as Y, a4 as ne, q as le, n as _, l as oe, h as d, g as D, J as ie, k as o, X as Le } from "./main-PwobzNtN.js";
import { b as k, f as Z } from "./format-BcJZDVG4.js";
import { o as ue } from "./userNames-D6htnEDx.js";
import { S as Te } from "./SummaryStrip-DTjl0XuA.js";
import { P as Me } from "./Pagination-CVfh_mFr.js";
import { u as Se } from "./usePagination-B8D3_CEk.js";
import { D as de } from "./DocLink-BbnZJ9mS.js";
const $e = { class: "chq-page" }, He = { class: "chq-actions" }, Re = { class: "chq-search-wrap" }, Ie = ["innerHTML"], Ee = { style: { display: "flex", gap: "8px", "margin-left": "auto" } }, Be = ["innerHTML"], xe = {
  key: 1,
  class: "chq-toolbar"
}, De = { class: "chq-filter-pills" }, Pe = ["onClick"], Ne = { class: "chq-fpill-count" }, Oe = { class: "chq-toolbar-right" }, Ue = { class: "chq-result" }, ze = ["disabled"], Ve = ["innerHTML"], Ae = {
  key: 2,
  class: "chq-selbar"
}, Fe = { class: "chq-sel-count" }, je = ["innerHTML"], Ge = ["disabled", "title"], Ke = ["innerHTML"], Je = { class: "chq-card" }, Xe = { class: "chq-table chq-desktop-table" }, Qe = { style: { width: "32px" } }, We = ["checked"], Ye = ["innerHTML"], Ze = ["innerHTML"], et = ["innerHTML"], tt = ["innerHTML"], st = ["innerHTML"], at = ["onClick"], nt = ["checked", "onChange"], lt = { class: "mono-sm text-muted" }, ot = { class: "mono-sm text-muted" }, it = { class: "ta-r mono-sm" }, ut = { key: 0 }, dt = {
  colspan: "8",
  class: "chq-empty"
}, ct = { class: "chq-mobile-cards" }, rt = {
  key: 1,
  class: "chq-mc-empty"
}, vt = ["onClick"], ht = { class: "chq-mc-top" }, mt = { class: "chq-mc-docno" }, _t = { class: "chq-mc-mid" }, pt = { class: "chq-mc-meta" }, bt = { class: "chq-mc-amount" }, yt = { class: "chq-mc-type" }, ft = {
  key: 3,
  style: { padding: "4px 0 0" }
}, qt = { class: "chq-dheader" }, gt = ["innerHTML"], kt = { class: "chq-dh-top" }, Ct = { class: "chq-dh-ico" }, wt = ["innerHTML"], Lt = { class: "chq-dh-title" }, Tt = { class: "chq-dh-sub" }, Mt = { class: "chq-dh-amount" }, St = { class: "chq-dh-amt-lbl" }, $t = { class: "chq-dbody" }, Ht = { class: "chq-section-hdr" }, Rt = ["innerHTML"], It = { class: "chq-meta-grid" }, Et = { class: "mono-sm" }, Bt = { class: "mono-sm" }, xt = { key: 0 }, Dt = { class: "mono-sm" }, Pt = {
  key: 1,
  style: { "grid-column": "1/-1" }
}, Nt = { style: { color: "#dc2626" } }, Ot = { class: "chq-section-hdr" }, Ut = ["innerHTML"], zt = { class: "chq-life-row" }, Vt = ["disabled", "title"], At = ["disabled", "title"], Ft = ["disabled", "title"], jt = ["disabled", "title"], Gt = {
  key: 0,
  class: "chq-life-input"
}, Kt = ["disabled"], Jt = {
  key: 1,
  class: "chq-life-input"
}, Xt = ["disabled"], Qt = {
  key: 2,
  class: "inv-view-footer"
}, Wt = { class: "chq-dfooter" }, Yt = {
  __name: "BankCheques",
  setup(Zt) {
    const { toast: $ } = ke(), P = d("all"), ce = [
      { key: "all", label: "All" },
      { key: "Issued", label: "Issued" },
      { key: "Cleared", label: "Cleared" },
      { key: "Bounced", label: "Bounced" },
      { key: "Cancelled", label: "Cancelled" }
    ], b = d([]), C = d(!1), N = d(""), y = d({ issued: { count: 0, total: 0 }, cleared: { count: 0, total: 0 }, bounced: { count: 0, total: 0 }, cancelled: { count: 0, total: 0 } }), L = d(!1), l = d(null), O = d("payment_date"), H = d("desc"), q = d(!1), F = d(!1), r = d(/* @__PURE__ */ new Set()), T = d(!1), M = d(!1), U = d(""), R = d("");
    async function z() {
      C.value = !0;
      try {
        const [a, t] = await Promise.all([
          oe("psd_books.api.docs.get_cheque_list"),
          oe("psd_books.api.docs.get_cheque_summary")
        ]);
        b.value = a || [], t && (y.value = t), r.value = /* @__PURE__ */ new Set();
      } catch (a) {
        $.error(a.message || "Failed to load cheques");
      } finally {
        C.value = !1;
      }
    }
    const re = D(() => {
      let a = b.value;
      if (P.value !== "all" && (a = a.filter((t) => (t.cheque_status || "Issued") === P.value)), N.value.trim()) {
        const t = N.value.toLowerCase();
        a = a.filter((s) => (s.party || "").toLowerCase().includes(t) || (s.reference_no || "").toLowerCase().includes(t) || (s.party_name || "").toLowerCase().includes(t));
      }
      return a;
    }), v = D(() => {
      const a = O.value;
      return [...re.value].sort((t, s) => {
        const p = t[a] ?? "", B = s[a] ?? "", S = typeof p == "number" ? p - B : String(p).localeCompare(String(B));
        return H.value === "asc" ? S : -S;
      });
    });
    function I(a) {
      O.value === a ? H.value = H.value === "asc" ? "desc" : "asc" : (O.value = a, H.value = "asc");
    }
    function E(a) {
      return O.value !== a ? '<span style="color:#d1d5db">⇅</span>' : H.value === "asc" ? "↑" : "↓";
    }
    const { page: j, pageSize: G, paged: ee } = Se(v, { storageKey: "bank-cheques" }), ve = D(() => b.value.reduce((a, t) => a + Z(t.paid_amount), 0));
    function he(a) {
      return a === "all" ? b.value.length : b.value.filter((t) => (t.cheque_status || "Issued") === a).length;
    }
    function w(a) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(Z(a));
    }
    function me(a) {
      const t = new Set(r.value);
      t.has(a) ? t.delete(a) : t.add(a), r.value = t;
    }
    const te = D(() => v.value.length > 0 && v.value.every((a) => r.value.has(a.name)));
    function _e() {
      te.value ? r.value = /* @__PURE__ */ new Set() : r.value = new Set(v.value.map((a) => a.name));
    }
    const K = D(() => v.value.filter((a) => (a.cheque_status || "Issued") === "Issued" && r.value.has(a.name)));
    function se() {
      const a = r.value.size ? v.value.filter((h) => r.value.has(h.name)) : v.value;
      if (!a.length) return;
      const t = (h) => {
        const X = h == null ? "" : String(h);
        return /[",\n]/.test(X) ? '"' + X.replace(/"/g, '""') + '"' : X;
      }, s = [["Payment #", "Party", "Cheque No", "Date", "Type", "Status", "Amount"].join(",")];
      for (const h of a)
        s.push([h.name, h.party_name || h.party || "", h.reference_no || "", k(h.payment_date), h.payment_type === "Receive" ? "Received" : "Paid Out", h.cheque_status || "Issued", Z(h.paid_amount) || 0].map(t).join(","));
      const p = new Blob(["\uFEFF" + s.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), B = URL.createObjectURL(p), S = document.createElement("a");
      S.href = B, S.download = `cheques_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, S.click(), URL.revokeObjectURL(B), $.success(`Exported ${a.length} row(s)`);
    }
    async function pe() {
      const a = K.value;
      if (!a.length) return;
      F.value = !0;
      let t = 0;
      const s = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      try {
        for (const p of a)
          try {
            await ie("psd_books.api.docs.update_cheque_status", { payment_entry_name: p.name, new_status: "Cleared", cleared_date: s }, { module: "banking", action: "edit" }), t++;
          } catch {
          }
        $.success(`${t} cheque(s) marked Cleared`), await z();
      } finally {
        F.value = !1;
      }
    }
    async function ae(a) {
      l.value = a, L.value = !0, T.value = !1, M.value = !1, U.value = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), R.value = "";
      try {
        const t = await Le("Payment Entry", a.name);
        t && (l.value = { ...a, owner: t.owner, creation: t.creation, modified: t.modified, modified_by: t.modified_by });
      } catch {
      }
    }
    function V(a) {
      var t;
      return (((t = l.value) == null ? void 0 : t.cheque_status) || "Issued") === a;
    }
    function J(a) {
      return { Issued: "badge-blue", Cleared: "badge-green", Bounced: "badge-red", Cancelled: "badge-grey" }[a || "Issued"];
    }
    async function A(a, t = {}) {
      if (l.value) {
        q.value = !0;
        try {
          const s = await ie("psd_books.api.docs.update_cheque_status", {
            payment_entry_name: l.value.name,
            new_status: a,
            ...t
          }, { module: "banking", action: "edit" });
          l.value.cheque_status = s.cheque_status, l.value.cheque_cleared_date = s.cheque_cleared_date || null, l.value.cheque_bounce_reason = s.cheque_bounce_reason || null, T.value = !1, M.value = !1, $.success(`Cheque marked ${a}`), await z();
        } catch (s) {
          $.error(s.message || "Status update failed");
        }
        q.value = !1;
      }
    }
    function be() {
      T.value = !T.value, M.value = !1;
    }
    function ye() {
      M.value = !M.value, T.value = !1;
    }
    function fe() {
      A("Cleared", { cleared_date: U.value });
    }
    function qe() {
      A("Bounced", { bounce_reason: R.value.trim() });
    }
    return Ce(z), (a, t) => (o(), i("div", $e, [
      e("div", He, [
        e("div", Re, [
          e("span", {
            innerHTML: u(f)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Ie),
          Q(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (s) => N.value = s),
            placeholder: "Search cheques…",
            class: "chq-search-input"
          }, null, 512), [
            [W, N.value]
          ])
        ]),
        e("div", Ee, [
          e("button", {
            class: "chq-btn-ghost",
            onClick: z
          }, [
            e("span", {
              innerHTML: u(f)("refresh", 14)
            }, null, 8, Be)
          ])
        ])
      ]),
      C.value ? c("", !0) : (o(), we(Te, {
        key: 0,
        cards: [
          { label: "Total", tone: "default", value: b.value.length, sub: w(ve.value) },
          { label: "Issued", tone: "accent", value: y.value.issued.count, valueClass: "blue", sub: w(y.value.issued.total) },
          { label: "Cleared", tone: "success", value: y.value.cleared.count, valueClass: "green", sub: w(y.value.cleared.total) },
          { label: "Bounced", tone: y.value.bounced.count > 0 ? "danger" : "default", value: y.value.bounced.count, valueClass: y.value.bounced.count > 0 ? "red" : "", sub: w(y.value.bounced.total) }
        ]
      }, null, 8, ["cards"])),
      !C.value && b.value.length ? (o(), i("div", xe, [
        e("div", De, [
          (o(), i(g, null, x(ce, (s) => e("button", {
            key: s.key,
            class: _(["chq-fpill", { active: P.value === s.key }]),
            onClick: (p) => P.value = s.key
          }, [
            m(n(s.label) + " ", 1),
            e("span", Ne, n(he(s.key)), 1)
          ], 10, Pe)), 64))
        ]),
        e("div", Oe, [
          e("span", Ue, n(v.value.length) + " of " + n(b.value.length), 1),
          e("button", {
            class: "chq-btn-ghost",
            onClick: se,
            disabled: !v.value.length
          }, [
            e("span", {
              innerHTML: u(f)("download", 14)
            }, null, 8, Ve),
            t[17] || (t[17] = m(" Export", -1))
          ], 8, ze)
        ])
      ])) : c("", !0),
      r.value.size > 0 ? (o(), i("div", Ae, [
        e("span", Fe, n(r.value.size) + " selected", 1),
        e("button", {
          class: "chq-sel-export",
          onClick: se
        }, [
          e("span", {
            innerHTML: u(f)("download", 13)
          }, null, 8, je),
          t[18] || (t[18] = m(" Export selected", -1))
        ]),
        K.value.length ? (o(), i("button", {
          key: 0,
          class: "chq-sel-ok",
          onClick: pe,
          disabled: F.value || !a.$canEdit("banking"),
          title: a.$canEdit("banking") ? "" : "Read-only access"
        }, [
          e("span", {
            innerHTML: u(f)("check", 13)
          }, null, 8, Ke),
          m(" Mark " + n(K.value.length) + " Cleared ", 1)
        ], 8, Ge)) : c("", !0),
        t[19] || (t[19] = e("div", { style: { flex: "1" } }, null, -1)),
        e("button", {
          class: "chq-sel-clear",
          onClick: t[1] || (t[1] = (s) => r.value = /* @__PURE__ */ new Set())
        }, "Clear")
      ])) : c("", !0),
      e("div", Je, [
        e("table", Xe, [
          e("thead", null, [
            e("tr", null, [
              e("th", Qe, [
                e("input", {
                  type: "checkbox",
                  checked: te.value,
                  onChange: _e
                }, null, 40, We)
              ]),
              e("th", {
                onClick: t[2] || (t[2] = (s) => I("name")),
                class: "sortable"
              }, [
                t[20] || (t[20] = m("Payment # ", -1)),
                e("span", {
                  innerHTML: E("name")
                }, null, 8, Ye)
              ]),
              e("th", {
                onClick: t[3] || (t[3] = (s) => I("party")),
                class: "sortable"
              }, [
                t[21] || (t[21] = m("Party ", -1)),
                e("span", {
                  innerHTML: E("party")
                }, null, 8, Ze)
              ]),
              e("th", {
                onClick: t[4] || (t[4] = (s) => I("reference_no")),
                class: "sortable"
              }, [
                t[22] || (t[22] = m("Cheque No ", -1)),
                e("span", {
                  innerHTML: E("reference_no")
                }, null, 8, et)
              ]),
              e("th", {
                onClick: t[5] || (t[5] = (s) => I("payment_date")),
                class: "sortable"
              }, [
                t[23] || (t[23] = m("Date ", -1)),
                e("span", {
                  innerHTML: E("payment_date")
                }, null, 8, tt)
              ]),
              t[25] || (t[25] = e("th", null, "Type", -1)),
              t[26] || (t[26] = e("th", null, "Status", -1)),
              e("th", {
                onClick: t[6] || (t[6] = (s) => I("paid_amount")),
                class: "sortable ta-r"
              }, [
                t[24] || (t[24] = m("Amount ", -1)),
                e("span", {
                  innerHTML: E("paid_amount")
                }, null, 8, st)
              ])
            ])
          ]),
          e("tbody", null, [
            C.value ? (o(), i(g, { key: 0 }, x(6, (s) => e("tr", { key: s }, [...t[27] || (t[27] = [
              e("td", { colspan: "8" }, [
                e("div", { class: "chq-shimmer" })
              ], -1)
            ])])), 64)) : (o(), i(g, { key: 1 }, [
              (o(!0), i(g, null, x(u(ee), (s) => (o(), i("tr", {
                key: s.name,
                class: "chq-row",
                onClick: (p) => ae(s)
              }, [
                e("td", {
                  onClick: t[7] || (t[7] = le(() => {
                  }, ["stop"]))
                }, [
                  e("input", {
                    type: "checkbox",
                    checked: r.value.has(s.name),
                    onChange: (p) => me(s.name)
                  }, null, 40, nt)
                ]),
                e("td", null, [
                  Y(de, {
                    doctype: "Payment Entry",
                    name: s.name
                  }, null, 8, ["name"])
                ]),
                e("td", null, n(s.party_name || s.party || "—"), 1),
                e("td", lt, n(s.reference_no || "—"), 1),
                e("td", ot, n(u(k)(s.payment_date)), 1),
                e("td", null, [
                  e("span", {
                    class: _(["chq-badge", s.payment_type === "Receive" ? "badge-green" : "badge-red"])
                  }, n(s.payment_type === "Receive" ? "Received" : "Paid Out"), 3)
                ]),
                e("td", null, [
                  e("span", {
                    class: _(["chq-badge", J(s.cheque_status)])
                  }, n(s.cheque_status || "Issued"), 3)
                ]),
                e("td", it, n(w(s.paid_amount)), 1)
              ], 8, at))), 128)),
              v.value.length ? c("", !0) : (o(), i("tr", ut, [
                e("td", dt, n(b.value.length ? "No cheques match this filter" : "No cheque payments found"), 1)
              ]))
            ], 64))
          ])
        ]),
        e("div", ct, [
          C.value ? (o(), i(g, { key: 0 }, x(5, (s) => e("div", {
            key: s,
            class: "chq-mobile-card chq-mc--skeleton"
          }, [...t[28] || (t[28] = [
            e("div", {
              class: "chq-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            e("div", {
              class: "chq-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            e("div", {
              class: "chq-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : v.value.length ? (o(!0), i(g, { key: 2 }, x(u(ee), (s) => (o(), i("div", {
            key: s.name,
            class: "chq-mobile-card",
            onClick: (p) => ae(s)
          }, [
            e("div", ht, [
              e("span", mt, [
                Y(de, {
                  doctype: "Payment Entry",
                  name: s.name
                }, null, 8, ["name"])
              ]),
              e("span", {
                class: _(["chq-badge", J(s.cheque_status)])
              }, n(s.cheque_status || "Issued"), 3)
            ]),
            e("div", _t, n(s.party_name || s.party || "—"), 1),
            e("div", pt, [
              e("span", null, n(u(k)(s.payment_date)) + n(s.reference_no ? " · " + s.reference_no : ""), 1),
              e("span", bt, n(w(s.paid_amount)), 1)
            ]),
            e("div", yt, [
              e("span", {
                class: _(["chq-badge", s.payment_type === "Receive" ? "badge-green" : "badge-red"])
              }, n(s.payment_type === "Receive" ? "Received" : "Paid Out"), 3)
            ])
          ], 8, vt))), 128)) : (o(), i("div", rt, [
            t[29] || (t[29] = e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🧾", -1)),
            e("div", null, n(b.value.length ? "No cheques match" : "No cheque payments found"), 1)
          ]))
        ])
      ]),
      !C.value && v.value.length ? (o(), i("div", ft, [
        Y(Me, {
          page: u(j),
          "onUpdate:page": t[8] || (t[8] = (s) => ne(j) ? j.value = s : null),
          "page-size": u(G),
          "onUpdate:pageSize": t[9] || (t[9] = (s) => ne(G) ? G.value = s : null),
          "total-items": v.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : c("", !0),
      L.value ? (o(), i("div", {
        key: 4,
        class: "chq-overlay",
        onClick: t[10] || (t[10] = le((s) => L.value = !1, ["self"]))
      })) : c("", !0),
      e("div", {
        class: _(["chq-drawer", { open: L.value }])
      }, [
        l.value ? (o(), i(g, { key: 0 }, [
          e("div", qt, [
            e("button", {
              class: "chq-dclose chq-dclose-abs",
              onClick: t[11] || (t[11] = (s) => L.value = !1)
            }, [
              e("span", {
                innerHTML: u(f)("x", 16)
              }, null, 8, gt)
            ]),
            e("div", kt, [
              e("div", Ct, [
                e("span", {
                  innerHTML: u(f)("payment", 20)
                }, null, 8, wt)
              ]),
              e("div", null, [
                e("div", Lt, n(l.value.name), 1),
                e("div", Tt, n(l.value.party_name || l.value.party || "—") + " · " + n(u(k)(l.value.payment_date)), 1)
              ]),
              e("span", {
                class: _(["chq-badge", J(l.value.cheque_status)])
              }, n(l.value.cheque_status || "Issued"), 3)
            ]),
            e("div", Mt, [
              e("div", St, n(l.value.payment_type === "Receive" ? "Received" : "Paid Out"), 1),
              e("div", {
                class: _(["chq-dh-amt-val", l.value.payment_type === "Receive" ? "pos" : "neg"])
              }, n(w(l.value.paid_amount)), 3)
            ])
          ]),
          e("div", $t, [
            e("div", Ht, [
              e("span", {
                innerHTML: u(f)("info", 13)
              }, null, 8, Rt),
              t[30] || (t[30] = m(" Details", -1))
            ]),
            e("div", It, [
              e("div", null, [
                t[31] || (t[31] = e("div", { class: "chq-meta-lbl" }, "Cheque No", -1)),
                e("div", Et, n(l.value.reference_no || "—"), 1)
              ]),
              e("div", null, [
                t[32] || (t[32] = e("div", { class: "chq-meta-lbl" }, "Cheque Date", -1)),
                e("div", Bt, n(u(k)(l.value.reference_date) || "—"), 1)
              ]),
              e("div", null, [
                t[33] || (t[33] = e("div", { class: "chq-meta-lbl" }, "Type", -1)),
                e("div", null, n(l.value.payment_type === "Receive" ? "Received" : "Paid Out"), 1)
              ]),
              e("div", null, [
                t[34] || (t[34] = e("div", { class: "chq-meta-lbl" }, "Mode", -1)),
                e("div", null, n(l.value.mode_of_payment || "Cheque"), 1)
              ]),
              l.value.cheque_cleared_date ? (o(), i("div", xt, [
                t[35] || (t[35] = e("div", { class: "chq-meta-lbl" }, "Cleared On", -1)),
                e("div", Dt, n(u(k)(l.value.cheque_cleared_date)), 1)
              ])) : c("", !0),
              l.value.cheque_bounce_reason ? (o(), i("div", Pt, [
                t[36] || (t[36] = e("div", { class: "chq-meta-lbl" }, "Bounce Reason", -1)),
                e("div", Nt, n(l.value.cheque_bounce_reason), 1)
              ])) : c("", !0)
            ]),
            e("div", Ot, [
              e("span", {
                innerHTML: u(f)("repeat", 13)
              }, null, 8, Ut),
              t[37] || (t[37] = m(" Lifecycle", -1))
            ]),
            e("div", zt, [
              e("button", {
                class: _(["chq-life-btn", { active: V("Issued") }]),
                onClick: t[12] || (t[12] = (s) => A("Issued")),
                disabled: q.value || !a.$canEdit("banking"),
                title: a.$canEdit("banking") ? "" : "Read-only access"
              }, "Issued", 10, Vt),
              e("button", {
                class: _(["chq-life-btn life-cleared", { active: V("Cleared") }]),
                onClick: be,
                disabled: q.value || !a.$canEdit("banking"),
                title: a.$canEdit("banking") ? "" : "Read-only access"
              }, "Cleared", 10, At),
              e("button", {
                class: _(["chq-life-btn life-bounced", { active: V("Bounced") }]),
                onClick: ye,
                disabled: q.value || !a.$canEdit("banking"),
                title: a.$canEdit("banking") ? "" : "Read-only access"
              }, "Bounced", 10, Ft),
              e("button", {
                class: _(["chq-life-btn life-cancelled", { active: V("Cancelled") }]),
                onClick: t[13] || (t[13] = (s) => A("Cancelled")),
                disabled: q.value || !a.$canEdit("banking"),
                title: a.$canEdit("banking") ? "" : "Read-only access"
              }, "Cancel", 10, jt)
            ]),
            T.value ? (o(), i("div", Gt, [
              t[38] || (t[38] = e("label", { class: "chq-meta-lbl" }, "Cleared Date", -1)),
              Q(e("input", {
                "onUpdate:modelValue": t[14] || (t[14] = (s) => U.value = s),
                type: "date"
              }, null, 512), [
                [W, U.value]
              ]),
              e("button", {
                class: "chq-life-confirm",
                onClick: fe,
                disabled: q.value || !a.$canEdit("banking")
              }, "Confirm", 8, Kt)
            ])) : c("", !0),
            M.value ? (o(), i("div", Jt, [
              t[39] || (t[39] = e("label", { class: "chq-meta-lbl" }, "Bounce Reason", -1)),
              Q(e("input", {
                "onUpdate:modelValue": t[15] || (t[15] = (s) => R.value = s),
                type: "text",
                placeholder: "Insufficient funds / Account closed / …"
              }, null, 512), [
                [W, R.value]
              ]),
              e("button", {
                class: "chq-life-confirm",
                onClick: qe,
                disabled: q.value || !R.value.trim() || !a.$canEdit("banking")
              }, "Confirm", 8, Xt)
            ])) : c("", !0),
            l.value.owner ? (o(), i("div", Qt, [
              m(" Created by " + n(u(ue)(l.value.owner)) + " on " + n(u(k)(l.value.creation)) + " ", 1),
              l.value.modified_by ? (o(), i(g, { key: 0 }, [
                m(" · Last modified by " + n(u(ue)(l.value.modified_by)) + " on " + n(u(k)(l.value.modified)), 1)
              ], 64)) : c("", !0)
            ])) : c("", !0)
          ]),
          e("div", Wt, [
            e("button", {
              class: "chq-btn-ghost",
              onClick: t[16] || (t[16] = (s) => L.value = !1)
            }, "Close")
          ])
        ], 64)) : c("", !0)
      ], 2)
    ]));
  }
}, is = /* @__PURE__ */ ge(Yt, [["__scopeId", "data-v-461ab990"]]);
export {
  is as default
};
