import { _ as we, x as Te, z as Ce, o as Le, c as u, a as e, u as l, i as v, w as F, A as z, d as c, C as Se, b as g, F as h, r as D, t as o, D as P, a4 as re, q, v as Me, n as C, e as ie, l as He, S as De, h as m, g as L, J as Y, f as $e, a3 as xe, k as i, X as Re } from "./main-B4BdT7Fg.js";
import { b as S, f as $ } from "./format-BcJZDVG4.js";
import { o as ue } from "./userNames-Cwhv_QJ8.js";
import { _ as de } from "./SearchableSelect-DnO4uEgF.js";
import { S as Ae } from "./SummaryStrip-DDidfbDP.js";
import { P as Ue } from "./Pagination-DcD2kA6I.js";
import { J as Ne } from "./JournalTab-QDxn9j6d.js";
import { u as Fe } from "./usePagination-DiyBKgPZ.js";
const Ve = { class: "btr-page" }, Be = { class: "btr-actions" }, Oe = { class: "btr-search-wrap" }, ze = ["innerHTML"], Pe = { style: { display: "flex", gap: "8px", "margin-left": "auto" } }, qe = ["innerHTML"], Ee = ["disabled", "title"], Ie = ["innerHTML"], je = {
  key: 1,
  class: "btr-toolbar"
}, Je = { class: "btr-filter-pills" }, Ge = ["onClick"], Ke = { class: "btr-fpill-count" }, We = { class: "btr-toolbar-right" }, Xe = { class: "btr-result" }, Ye = ["disabled"], Qe = ["innerHTML"], Ze = {
  key: 2,
  class: "btr-selbar"
}, et = { class: "btr-sel-count" }, tt = ["innerHTML"], st = ["disabled", "title"], nt = ["innerHTML"], ot = { class: "btr-card" }, at = { class: "btr-table btr-desktop-table" }, lt = { style: { width: "32px" } }, rt = ["checked"], it = ["innerHTML"], ut = ["innerHTML"], dt = ["onClick"], ct = ["checked", "onChange"], vt = { class: "mono-sm text-muted" }, bt = { class: "btr-num" }, mt = { class: "text-muted" }, ft = { class: "text-muted" }, pt = { class: "ta-r mono-sm" }, _t = ["onClick"], gt = ["innerHTML"], kt = { key: 0 }, ht = {
  colspan: "8",
  class: "btr-empty"
}, yt = { class: "btr-mobile-cards" }, wt = {
  key: 1,
  class: "btr-mc-empty"
}, Tt = ["onClick"], Ct = { class: "btr-mc-top" }, Lt = { class: "btr-mc-docno" }, St = { class: "btr-mc-mid" }, Mt = { class: "btr-mc-meta" }, Ht = { class: "btr-mc-amount" }, Dt = {
  key: 3,
  style: { padding: "4px 0 0" }
}, $t = { class: "btr-dheader" }, xt = ["innerHTML"], Rt = { class: "btr-dh-top" }, At = { class: "btr-dh-ico" }, Ut = ["innerHTML"], Nt = { class: "btr-dbody" }, Ft = { class: "btr-section-hdr" }, Vt = ["innerHTML"], Bt = { class: "btr-fields-grid" }, Ot = { class: "btr-field" }, zt = { class: "btr-field" }, Pt = {
  class: "btr-field",
  style: { "grid-column": "1/-1" }
}, qt = {
  class: "btr-field",
  style: { "grid-column": "1/-1" }
}, Et = {
  class: "btr-field",
  style: { "grid-column": "1/-1" }
}, It = ["value"], jt = {
  class: "btr-field",
  style: { "grid-column": "1/-1" }
}, Jt = { class: "btr-dfooter" }, Gt = ["disabled"], Kt = ["innerHTML"], Wt = { class: "btr-dheader" }, Xt = ["innerHTML"], Yt = { class: "btr-dh-top" }, Qt = { class: "btr-dh-ico" }, Zt = ["innerHTML"], es = { class: "btr-dh-title" }, ts = { class: "btr-dh-sub" }, ss = { class: "btr-dh-amount" }, ns = { class: "btr-dh-amt-val" }, os = { class: "btr-dbody" }, as = { class: "btr-section-hdr" }, ls = ["innerHTML"], rs = { class: "btr-flow" }, is = { class: "btr-flow-acc" }, us = { class: "btr-flow-name" }, ds = ["innerHTML"], cs = { class: "btr-flow-acc" }, vs = { class: "btr-flow-name" }, bs = { class: "btr-meta-grid" }, ms = { class: "mono-sm" }, fs = { class: "mono-sm" }, ps = { class: "mono-sm" }, _s = {
  key: 0,
  style: { "grid-column": "1/-1" }
}, gs = {
  key: 1,
  style: { "grid-column": "1/-1" }
}, ks = { style: { "word-break": "break-word" } }, hs = { class: "btr-section-hdr" }, ys = ["innerHTML"], ws = {
  key: 0,
  class: "inv-view-footer"
}, Ts = { class: "btr-dfooter" }, Cs = ["disabled", "title"], Ls = ["innerHTML"], Ss = { style: { "margin-left": "auto" } }, Ms = {
  __name: "BankTransfers",
  setup(Hs) {
    const { toast: k } = Te(), { confirm: Q } = xe(), Z = De(), f = m([]), y = m(!1), V = m(""), B = m("all"), w = m(!1), x = m(!1), E = m(!1), I = m(!1), T = m(!1), a = m(null), R = m([]), b = m(/* @__PURE__ */ new Set()), O = m("date"), A = m("desc"), ce = ["Fund Transfer", "Salary Account Funding", "Branch Transfer", "Cash Withdrawal"], r = Ce({ posting_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), amount: 0, from_account: "", to_account: "", purpose: "", remark: "" }), ee = /* @__PURE__ */ new Date(), ve = new Date(ee.getFullYear(), ee.getMonth(), 1).toISOString().slice(0, 10);
    async function U() {
      y.value = !0;
      try {
        const n = await ie(), t = await He("psd_books.api.banking.get_bank_transfers", { company: n });
        f.value = Array.isArray(t) ? t : (t == null ? void 0 : t.message) || [], b.value = /* @__PURE__ */ new Set();
      } catch (n) {
        k.error(n.message || "Failed to load transfers");
      } finally {
        y.value = !1;
      }
    }
    const be = L(() => {
      let n = f.value;
      if (B.value !== "all" && (n = n.filter((t) => (t.status || "Unreconciled") === B.value)), V.value.trim()) {
        const t = V.value.toLowerCase();
        n = n.filter((s) => (s.reference || "").toLowerCase().includes(t) || (s.from_transaction || "").toLowerCase().includes(t) || (s.from_account || "").toLowerCase().includes(t) || (s.to_account || "").toLowerCase().includes(t));
      }
      return n;
    }), p = L(() => {
      const n = O.value;
      return [...be.value].sort((t, s) => {
        const d = t[n] ?? "", N = s[n] ?? "", H = typeof d == "number" ? d - N : String(d).localeCompare(String(N));
        return A.value === "asc" ? H : -H;
      });
    });
    function te(n) {
      O.value === n ? A.value = A.value === "asc" ? "desc" : "asc" : (O.value = n, A.value = "asc");
    }
    function se(n) {
      return O.value !== n ? '<span style="color:#d1d5db">⇅</span>' : A.value === "asc" ? "↑" : "↓";
    }
    const { page: j, pageSize: J, paged: ne } = Fe(p, { storageKey: "bank-transfers" }), me = L(() => [
      { key: "all", label: "All", count: f.value.length },
      { key: "Reconciled", label: "Reconciled", count: f.value.filter((n) => n.status === "Reconciled").length },
      { key: "Unreconciled", label: "Unreconciled", count: f.value.filter((n) => n.status !== "Reconciled").length }
    ]), fe = L(() => f.value.reduce((n, t) => n + $(t.amount), 0)), pe = L(() => f.value.filter((n) => String(n.date) >= ve).reduce((n, t) => n + $(t.amount), 0)), G = L(() => f.value.filter((n) => n.status !== "Reconciled").length);
    function M(n) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format($(n));
    }
    function _e(n) {
      const t = new Set(b.value);
      t.has(n) ? t.delete(n) : t.add(n), b.value = t;
    }
    const oe = L(() => p.value.length > 0 && p.value.every((n) => b.value.has(n.from_transaction)));
    function ge() {
      oe.value ? b.value = /* @__PURE__ */ new Set() : b.value = new Set(p.value.map((n) => n.from_transaction));
    }
    function ae() {
      const n = b.value.size ? p.value.filter((_) => b.value.has(_.from_transaction)) : p.value;
      if (!n.length) return;
      const t = (_) => {
        const X = _ == null ? "" : String(_);
        return /[",\n]/.test(X) ? '"' + X.replace(/"/g, '""') + '"' : X;
      }, s = [["Reference", "Date", "From Account", "To Account", "Amount", "Status"].join(",")];
      for (const _ of n)
        s.push([_.reference || _.from_transaction, S(_.date), _.from_account || "", _.to_account || "", $(_.amount) || 0, _.status || "Unreconciled"].map(t).join(","));
      const d = new Blob(["\uFEFF" + s.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), N = URL.createObjectURL(d), H = document.createElement("a");
      H.href = N, H.download = `bank_transfers_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, H.click(), URL.revokeObjectURL(N), k.success(`Exported ${n.length} row(s)`);
    }
    async function ke() {
      const n = p.value.filter((d) => b.value.has(d.from_transaction));
      if (!n.length || !await Q({ title: `Delete ${n.length} transfer(s)?`, body: "This reverses the ledger entries and removes both bank transaction legs. This cannot be undone.", okLabel: "Delete", okStyle: "danger" })) return;
      I.value = !0;
      let s = 0;
      try {
        for (const d of n)
          try {
            await Y("psd_books.api.banking.delete_bank_transfer", { reference: d.reference || "", from_transaction: d.from_transaction || "" }, { module: "banking", action: "delete" }), s++;
          } catch {
          }
        k.success(`Deleted ${s} transfer(s)`), await U();
      } finally {
        I.value = !1;
      }
    }
    function le() {
      Object.assign(r, { posting_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), amount: 0, from_account: "", to_account: "", purpose: "", remark: "" }), R.value = [], W(""), w.value = !0;
    }
    async function K(n) {
      a.value = n, T.value = !0;
      try {
        const t = await Re("Bank Transaction", n.from_transaction || n.to_transaction);
        t && (a.value = { ...n, owner: t.owner, creation: t.creation, modified: t.modified, modified_by: t.modified_by });
      } catch {
      }
    }
    async function W(n = "") {
      try {
        const t = await ie(), s = await $e("Bank Account", { fields: ["name", "account_name"], filters: [["company", "=", t], ...n ? [["account_name", "like", `%${n}%`]] : []], limit: 50 });
        R.value = s.map((d) => ({ label: d.account_name || d.name, value: d.name }));
      } catch {
        R.value = [];
      }
    }
    async function he() {
      var n;
      if (!r.from_account || !r.to_account) return k.error("Both accounts are required");
      if (r.from_account === r.to_account) return k.error("From and To accounts must be different");
      if (!$(r.amount)) return k.error("Amount is required");
      x.value = !0;
      try {
        const t = await Y("psd_books.api.banking.post_bank_transfer", { from_account: r.from_account, to_account: r.to_account, amount: $(r.amount), date: r.posting_date, purpose: r.purpose || "", description: r.remark || "" }, { module: "banking", action: "create" }), s = ((n = t == null ? void 0 : t.message) == null ? void 0 : n.amount) ?? (t == null ? void 0 : t.amount) ?? r.amount;
        k.success(`Transfer of ${M(s)} posted`), w.value = !1, await U();
      } catch (t) {
        k.error(t.message || "Failed to post transfer");
      } finally {
        x.value = !1;
      }
    }
    async function ye(n) {
      if (await Q({ title: "Delete this transfer?", body: `This reverses the ledger entries and removes both legs of ${n.reference || n.from_transaction}.`, okLabel: "Delete", okStyle: "danger" })) {
        E.value = !0;
        try {
          await Y("psd_books.api.banking.delete_bank_transfer", { reference: n.reference || "", from_transaction: n.from_transaction || "" }, { module: "banking", action: "delete" }), k.success("Transfer deleted"), T.value = !1, await U();
        } catch (s) {
          k.error(s.message || "Failed to delete");
        } finally {
          E.value = !1;
        }
      }
    }
    return Le(async () => {
      await U(), Z.query.from && (le(), r.from_account = String(Z.query.from));
    }), (n, t) => (i(), u("div", Ve, [
      e("div", Be, [
        e("div", Oe, [
          e("span", {
            innerHTML: l(v)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, ze),
          F(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (s) => V.value = s),
            placeholder: "Search transfers…",
            class: "btr-search-input"
          }, null, 512), [
            [z, V.value]
          ])
        ]),
        e("div", Pe, [
          e("button", {
            class: "btr-btn-ghost",
            onClick: U
          }, [
            e("span", {
              innerHTML: l(v)("refresh", 14)
            }, null, 8, qe)
          ]),
          e("button", {
            class: "btr-btn-primary",
            disabled: !n.$canCreate("banking"),
            title: n.$canCreate("banking") ? "" : "Read-only access",
            onClick: le
          }, [
            e("span", {
              innerHTML: l(v)("plus", 13)
            }, null, 8, Ie),
            t[21] || (t[21] = c(" New Transfer", -1))
          ], 8, Ee)
        ])
      ]),
      y.value ? g("", !0) : (i(), Se(Ae, {
        key: 0,
        cards: [
          { label: "Total Transfers", tone: "default", value: f.value.length },
          { label: "Total Amount", tone: "accent", value: M(fe.value), valueClass: "green" },
          { label: "This Month", tone: "info", value: M(pe.value), valueClass: "blue" },
          { label: "Unreconciled", tone: G.value > 0 ? "warn" : "default", value: G.value, valueClass: G.value > 0 ? "orange" : "" }
        ]
      }, null, 8, ["cards"])),
      !y.value && f.value.length ? (i(), u("div", je, [
        e("div", Je, [
          (i(!0), u(h, null, D(me.value, (s) => (i(), u("button", {
            key: s.key,
            class: C(["btr-fpill", { active: B.value === s.key }]),
            onClick: (d) => B.value = s.key
          }, [
            c(o(s.label) + " ", 1),
            e("span", Ke, o(s.count), 1)
          ], 10, Ge))), 128))
        ]),
        e("div", We, [
          e("span", Xe, o(p.value.length) + " of " + o(f.value.length), 1),
          e("button", {
            class: "btr-btn-ghost",
            onClick: ae,
            disabled: !p.value.length
          }, [
            e("span", {
              innerHTML: l(v)("download", 14)
            }, null, 8, Qe),
            t[22] || (t[22] = c(" Export ", -1))
          ], 8, Ye)
        ])
      ])) : g("", !0),
      b.value.size > 0 ? (i(), u("div", Ze, [
        e("span", et, o(b.value.size) + " selected", 1),
        e("button", {
          class: "btr-sel-export",
          onClick: ae
        }, [
          e("span", {
            innerHTML: l(v)("download", 13)
          }, null, 8, tt),
          t[23] || (t[23] = c(" Export selected", -1))
        ]),
        e("button", {
          class: "btr-sel-danger",
          onClick: ke,
          disabled: I.value || !n.$canDelete("banking"),
          title: n.$canDelete("banking") ? "" : "Not permitted"
        }, [
          e("span", {
            innerHTML: l(v)("trash", 13)
          }, null, 8, nt),
          c(" Delete " + o(b.value.size), 1)
        ], 8, st),
        t[24] || (t[24] = e("div", { style: { flex: "1" } }, null, -1)),
        e("button", {
          class: "btr-sel-clear",
          onClick: t[1] || (t[1] = (s) => b.value = /* @__PURE__ */ new Set())
        }, "Clear")
      ])) : g("", !0),
      e("div", ot, [
        e("table", at, [
          e("thead", null, [
            e("tr", null, [
              e("th", lt, [
                e("input", {
                  type: "checkbox",
                  checked: oe.value,
                  onChange: ge
                }, null, 40, rt)
              ]),
              e("th", {
                onClick: t[2] || (t[2] = (s) => te("date")),
                class: "sortable"
              }, [
                t[25] || (t[25] = c("Date ", -1)),
                e("span", {
                  innerHTML: se("date")
                }, null, 8, it)
              ]),
              t[27] || (t[27] = e("th", null, "Reference", -1)),
              t[28] || (t[28] = e("th", null, "From Account", -1)),
              t[29] || (t[29] = e("th", null, "To Account", -1)),
              t[30] || (t[30] = e("th", null, "Status", -1)),
              e("th", {
                onClick: t[3] || (t[3] = (s) => te("amount")),
                class: "sortable ta-r"
              }, [
                t[26] || (t[26] = c("Amount ", -1)),
                e("span", {
                  innerHTML: se("amount")
                }, null, 8, ut)
              ]),
              t[31] || (t[31] = e("th", { style: { width: "50px" } }, null, -1))
            ])
          ]),
          e("tbody", null, [
            y.value ? (i(), u(h, { key: 0 }, D(6, (s) => e("tr", { key: s }, [...t[32] || (t[32] = [
              e("td", { colspan: "8" }, [
                e("div", { class: "btr-shimmer" })
              ], -1)
            ])])), 64)) : (i(), u(h, { key: 1 }, [
              (i(!0), u(h, null, D(l(ne), (s) => (i(), u("tr", {
                key: s.from_transaction,
                class: "btr-row",
                onClick: (d) => K(s)
              }, [
                e("td", {
                  onClick: t[4] || (t[4] = q(() => {
                  }, ["stop"]))
                }, [
                  e("input", {
                    type: "checkbox",
                    checked: b.value.has(s.from_transaction),
                    onChange: (d) => _e(s.from_transaction)
                  }, null, 40, ct)
                ]),
                e("td", vt, o(l(S)(s.date)), 1),
                e("td", null, [
                  e("span", bt, o(s.reference || s.from_transaction), 1)
                ]),
                e("td", mt, o(s.from_account || "—"), 1),
                e("td", ft, o(s.to_account || "—"), 1),
                e("td", null, [
                  e("span", {
                    class: C(["btr-badge", s.status === "Reconciled" ? "badge-green" : "badge-orange"])
                  }, o(s.status || "Unreconciled"), 3)
                ]),
                e("td", pt, o(M(s.amount)), 1),
                e("td", {
                  onClick: t[5] || (t[5] = q(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "btr-act-btn",
                    onClick: (d) => K(s)
                  }, [
                    e("span", {
                      innerHTML: l(v)("eye", 13)
                    }, null, 8, gt)
                  ], 8, _t)
                ])
              ], 8, dt))), 128)),
              p.value.length ? g("", !0) : (i(), u("tr", kt, [
                e("td", ht, o(f.value.length ? "No transfers match this filter" : "No transfers found"), 1)
              ]))
            ], 64))
          ])
        ]),
        e("div", yt, [
          y.value ? (i(), u(h, { key: 0 }, D(5, (s) => e("div", {
            key: s,
            class: "btr-mobile-card btr-mc--skeleton"
          }, [...t[33] || (t[33] = [
            e("div", {
              class: "btr-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            e("div", {
              class: "btr-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            e("div", {
              class: "btr-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : p.value.length ? (i(!0), u(h, { key: 2 }, D(l(ne), (s) => (i(), u("div", {
            key: s.from_transaction,
            class: "btr-mobile-card",
            onClick: (d) => K(s)
          }, [
            e("div", Ct, [
              e("span", Lt, o(s.reference || s.from_transaction), 1),
              e("span", {
                class: C(["btr-badge", s.status === "Reconciled" ? "badge-green" : "badge-orange"])
              }, o(s.status || "Unreconciled"), 3)
            ]),
            e("div", St, o(s.from_account || "—") + " → " + o(s.to_account || "—"), 1),
            e("div", Mt, [
              e("span", null, o(l(S)(s.date)), 1),
              e("span", Ht, o(M(s.amount)), 1)
            ])
          ], 8, Tt))), 128)) : (i(), u("div", wt, [
            t[34] || (t[34] = e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "↔️", -1)),
            e("div", null, o(f.value.length ? "No transfers match" : "No transfers found"), 1)
          ]))
        ])
      ]),
      !y.value && p.value.length ? (i(), u("div", Dt, [
        P(Ue, {
          page: l(j),
          "onUpdate:page": t[6] || (t[6] = (s) => re(j) ? j.value = s : null),
          "page-size": l(J),
          "onUpdate:pageSize": t[7] || (t[7] = (s) => re(J) ? J.value = s : null),
          "total-items": p.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : g("", !0),
      w.value ? (i(), u("div", {
        key: 4,
        class: "btr-overlay",
        onClick: t[8] || (t[8] = q((s) => !x.value && (w.value = !1), ["self"]))
      })) : g("", !0),
      e("div", {
        class: C(["btr-drawer", { open: w.value }])
      }, [
        e("div", $t, [
          e("button", {
            class: "btr-dclose btr-dclose-abs",
            onClick: t[9] || (t[9] = (s) => w.value = !1)
          }, [
            e("span", {
              innerHTML: l(v)("x", 16)
            }, null, 8, xt)
          ]),
          e("div", Rt, [
            e("div", At, [
              e("span", {
                innerHTML: l(v)("repeat", 20)
              }, null, 8, Ut)
            ]),
            t[35] || (t[35] = e("div", null, [
              e("div", { class: "btr-dh-title" }, "New Bank Transfer"),
              e("div", { class: "btr-dh-sub" }, "Move funds between bank accounts")
            ], -1))
          ])
        ]),
        e("div", Nt, [
          e("div", Ft, [
            e("span", {
              innerHTML: l(v)("calendar", 13)
            }, null, 8, Vt),
            t[36] || (t[36] = c(" Transfer", -1))
          ]),
          e("div", Bt, [
            e("div", Ot, [
              t[37] || (t[37] = e("label", { class: "btr-label" }, [
                c("Transfer Date "),
                e("span", { class: "req" }, "*")
              ], -1)),
              F(e("input", {
                "onUpdate:modelValue": t[10] || (t[10] = (s) => r.posting_date = s),
                type: "date",
                class: "btr-input"
              }, null, 512), [
                [z, r.posting_date]
              ])
            ]),
            e("div", zt, [
              t[38] || (t[38] = e("label", { class: "btr-label" }, [
                c("Amount "),
                e("span", { class: "req" }, "*")
              ], -1)),
              F(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (s) => r.amount = s),
                type: "number",
                min: "0",
                step: "0.01",
                class: "btr-input",
                placeholder: "0.00"
              }, null, 512), [
                [
                  z,
                  r.amount,
                  void 0,
                  { number: !0 }
                ]
              ])
            ]),
            e("div", Pt, [
              t[39] || (t[39] = e("label", { class: "btr-label" }, [
                c("From Account "),
                e("span", { class: "req" }, "*")
              ], -1)),
              P(de, {
                modelValue: r.from_account,
                "onUpdate:modelValue": t[12] || (t[12] = (s) => r.from_account = s),
                options: R.value,
                placeholder: "Source bank account…",
                onSearch: W
              }, null, 8, ["modelValue", "options"])
            ]),
            e("div", qt, [
              t[40] || (t[40] = e("label", { class: "btr-label" }, [
                c("To Account "),
                e("span", { class: "req" }, "*")
              ], -1)),
              P(de, {
                modelValue: r.to_account,
                "onUpdate:modelValue": t[13] || (t[13] = (s) => r.to_account = s),
                options: R.value,
                placeholder: "Destination bank account…",
                onSearch: W
              }, null, 8, ["modelValue", "options"])
            ]),
            e("div", Et, [
              t[42] || (t[42] = e("label", { class: "btr-label" }, "Purpose / Transfer Type", -1)),
              F(e("select", {
                "onUpdate:modelValue": t[14] || (t[14] = (s) => r.purpose = s),
                class: "btr-input"
              }, [
                t[41] || (t[41] = e("option", { value: "" }, "— Select purpose —", -1)),
                (i(), u(h, null, D(ce, (s) => e("option", {
                  key: s,
                  value: s
                }, o(s), 9, It)), 64))
              ], 512), [
                [Me, r.purpose]
              ])
            ]),
            e("div", jt, [
              t[43] || (t[43] = e("label", { class: "btr-label" }, "Remarks", -1)),
              F(e("textarea", {
                "onUpdate:modelValue": t[15] || (t[15] = (s) => r.remark = s),
                rows: "2",
                class: "btr-input",
                placeholder: "Optional…"
              }, null, 512), [
                [z, r.remark]
              ])
            ])
          ]),
          t[44] || (t[44] = e("div", { class: "btr-hint" }, "Posts two reconciled bank transactions and a balanced ledger entry.", -1))
        ]),
        e("div", Jt, [
          e("button", {
            class: "btr-btn-ghost",
            onClick: t[16] || (t[16] = (s) => w.value = !1)
          }, "Cancel"),
          e("button", {
            class: "btr-btn-primary",
            disabled: x.value,
            onClick: he
          }, [
            e("span", {
              innerHTML: l(v)("check", 13)
            }, null, 8, Kt),
            c(" " + o(x.value ? "Posting…" : "Post Transfer"), 1)
          ], 8, Gt)
        ])
      ], 2),
      T.value ? (i(), u("div", {
        key: 5,
        class: "btr-overlay",
        onClick: t[17] || (t[17] = q((s) => T.value = !1, ["self"]))
      })) : g("", !0),
      e("div", {
        class: C(["btr-drawer btr-view-drawer", { open: T.value }])
      }, [
        a.value ? (i(), u(h, { key: 0 }, [
          e("div", Wt, [
            e("button", {
              class: "btr-dclose btr-dclose-abs",
              onClick: t[18] || (t[18] = (s) => T.value = !1)
            }, [
              e("span", {
                innerHTML: l(v)("x", 16)
              }, null, 8, Xt)
            ]),
            e("div", Yt, [
              e("div", Qt, [
                e("span", {
                  innerHTML: l(v)("repeat", 20)
                }, null, 8, Zt)
              ]),
              e("div", null, [
                e("div", es, o(a.value.reference || a.value.from_transaction), 1),
                e("div", ts, o(l(S)(a.value.date)), 1)
              ]),
              e("span", {
                class: C(["btr-badge", a.value.status === "Reconciled" ? "badge-green" : "badge-orange"])
              }, o(a.value.status || "Unreconciled"), 3)
            ]),
            e("div", ss, [
              t[45] || (t[45] = e("div", { class: "btr-dh-amt-lbl" }, "Amount", -1)),
              e("div", ns, o(M(a.value.amount)), 1)
            ])
          ]),
          e("div", os, [
            e("div", as, [
              e("span", {
                innerHTML: l(v)("info", 13)
              }, null, 8, ls),
              t[46] || (t[46] = c(" Details", -1))
            ]),
            e("div", rs, [
              e("div", is, [
                t[47] || (t[47] = e("div", { class: "btr-flow-lbl" }, "From", -1)),
                e("div", us, o(a.value.from_account || "—"), 1)
              ]),
              e("span", {
                class: "btr-flow-arrow",
                innerHTML: l(v)("arrow-right", 18)
              }, null, 8, ds),
              e("div", cs, [
                t[48] || (t[48] = e("div", { class: "btr-flow-lbl" }, "To", -1)),
                e("div", vs, o(a.value.to_account || "—"), 1)
              ])
            ]),
            e("div", bs, [
              e("div", null, [
                t[49] || (t[49] = e("div", { class: "btr-meta-lbl" }, "Date", -1)),
                e("div", ms, o(l(S)(a.value.date)), 1)
              ]),
              e("div", null, [
                t[50] || (t[50] = e("div", { class: "btr-meta-lbl" }, "Status", -1)),
                e("div", null, [
                  e("span", {
                    class: C(["btr-badge", a.value.status === "Reconciled" ? "badge-green" : "badge-orange"])
                  }, o(a.value.status || "Unreconciled"), 3)
                ])
              ]),
              e("div", null, [
                t[51] || (t[51] = e("div", { class: "btr-meta-lbl" }, "Out Txn", -1)),
                e("div", fs, o(a.value.from_transaction || "—"), 1)
              ]),
              e("div", null, [
                t[52] || (t[52] = e("div", { class: "btr-meta-lbl" }, "In Txn", -1)),
                e("div", ps, o(a.value.to_transaction || "—"), 1)
              ]),
              a.value.purpose ? (i(), u("div", _s, [
                t[53] || (t[53] = e("div", { class: "btr-meta-lbl" }, "Purpose / Transfer Type", -1)),
                e("div", null, o(a.value.purpose), 1)
              ])) : g("", !0),
              a.value.description ? (i(), u("div", gs, [
                t[54] || (t[54] = e("div", { class: "btr-meta-lbl" }, "Notes / Remarks", -1)),
                e("div", ks, o(a.value.description), 1)
              ])) : g("", !0)
            ]),
            e("div", hs, [
              e("span", {
                innerHTML: l(v)("journal", 13)
              }, null, 8, ys),
              t[55] || (t[55] = c(" Journal", -1))
            ]),
            P(Ne, {
              "voucher-type": "Bank Transaction",
              "voucher-no": a.value.from_transaction,
              label: "Bank Transfer",
              currency: a.value.currency || "INR"
            }, null, 8, ["voucher-no", "currency"]),
            a.value.owner ? (i(), u("div", ws, [
              c(" Created by " + o(l(ue)(a.value.owner)) + " on " + o(l(S)(a.value.creation)) + " ", 1),
              a.value.modified_by ? (i(), u(h, { key: 0 }, [
                c(" · Last modified by " + o(l(ue)(a.value.modified_by)) + " on " + o(l(S)(a.value.modified)), 1)
              ], 64)) : g("", !0)
            ])) : g("", !0)
          ]),
          e("div", Ts, [
            e("button", {
              class: "btr-btn-danger-ghost",
              onClick: t[19] || (t[19] = (s) => ye(a.value)),
              disabled: E.value || !n.$canDelete("banking"),
              title: n.$canDelete("banking") ? "" : "Not permitted"
            }, [
              e("span", {
                innerHTML: l(v)("trash", 13)
              }, null, 8, Ls),
              t[56] || (t[56] = c(" Delete", -1))
            ], 8, Cs),
            e("div", Ss, [
              e("button", {
                class: "btr-btn-ghost",
                onClick: t[20] || (t[20] = (s) => T.value = !1)
              }, "Close")
            ])
          ])
        ], 64)) : g("", !0)
      ], 2)
    ]));
  }
}, Vs = /* @__PURE__ */ we(Ms, [["__scopeId", "data-v-f0a96805"]]);
export {
  Vs as default
};
