import { _ as M, x as L, o as N, c, a as o, u as b, i as h, d as T, C as P, b as k, F as I, r as R, e as D, l as F, X as H, f as C, h as g, g as B, j as W, k as i, t as r, n as E, p as $ } from "./main-BgVQJ7hW.js";
import { S as z } from "./SummaryStrip-CNCGk7A6.js";
const V = { class: "i-page" }, J = { class: "i-head" }, U = ["disabled"], Y = ["innerHTML"], j = {
  key: 1,
  class: "i-loading"
}, q = {
  key: 2,
  class: "i-grid"
}, Q = { class: "i-group-hdr" }, X = { class: "i-cards" }, K = { class: "i-card-top" }, Z = ["innerHTML"], x = { class: "i-card-meta" }, ee = { class: "i-card-name" }, ae = { class: "i-card-desc" }, oe = {
  key: 0,
  class: "i-note"
}, te = {
  key: 1,
  class: "i-actions"
}, ne = ["onClick"], se = ["innerHTML"], ie = {
  __name: "SettingsIntegrations",
  setup(ce) {
    const { toast: G } = L(), n = W(), u = g(!0), f = g(!1), d = g(""), m = g(0), v = g(0), A = { active: "Active", available: "Available", not_configured: "Not Configured", coming_soon: "Coming Soon" }, y = B(() => [
      {
        group: "Email & Notifications",
        key: "smtp",
        name: "Company SMTP",
        desc: "Send invoices, reminders, and customer emails from your domain.",
        ico: "mail",
        bg: "#eff6ff",
        fg: "#2563eb",
        status: f.value ? "active" : "not_configured",
        note: f.value ? null : "Configure server, login, and from-address to start sending email.",
        action: { label: "Open Email & SMTP", go: () => n.push({ name: "settings-email" }) }
      },
      {
        group: "Banking",
        key: "bank-match",
        name: "Bank Auto-Match",
        desc: "Daily scheduler matches Bank Transactions to Payment Entries by amount + date + reference.",
        ico: "bank",
        bg: "#ecfdf5",
        fg: "#16a34a",
        status: "active",
        note: "Runs via scheduled hook (banking.utils.auto_match_bank_transactions, daily)."
      },
      {
        group: "Banking",
        key: "bank-recon",
        name: "Bank Reconciliation",
        desc: "Match unreconciled bank transactions against your ledger with one click.",
        ico: "balance",
        bg: "#eff6ff",
        fg: "#2563eb",
        status: "active",
        action: { label: "Open Reconciliation", go: () => n.push({ name: "banking-reconciliation" }) }
      },
      {
        group: "GST & E-Invoicing",
        key: "gstr1",
        name: "GSTR-1 Filing",
        desc: "Auto-prepared GSTR-1 returns from your Sales Invoices.",
        ico: "gstfile",
        bg: "#fff7ed",
        fg: "#ea580c",
        status: "active",
        action: { label: "Open GSTR-1", go: () => n.push({ name: "gstr-1" }).catch(() => {
        }) }
      },
      {
        group: "GST & E-Invoicing",
        key: "gstr3b",
        name: "GSTR-3B Summary",
        desc: "Monthly GSTR-3B preview from your invoice + bill tax lines.",
        ico: "gstfile",
        bg: "#fff7ed",
        fg: "#ea580c",
        status: "active",
        action: { label: "Open GSTR-3B", go: () => n.push({ name: "gstr-3b" }).catch(() => {
        }) }
      },
      {
        group: "GST & E-Invoicing",
        key: "einvoice",
        name: "E-Invoice (IRP)",
        desc: "Generate IRN + QR codes for B2B invoices. Attach to PDF, cancel within 24 hrs.",
        ico: "qr",
        bg: "#fef2f2",
        fg: "#dc2626",
        status: d.value ? m.value > 0 ? "active" : "available" : "not_configured",
        note: d.value ? `GSTIN: ${d.value} · ${m.value} IRN generated${v.value > 0 ? ` · ${v.value} pending` : ""}` : "Set your company GSTIN (Settings → Company) to activate e-Invoice generation.",
        action: { label: "Open e-Invoice", go: () => n.push({ name: "einvoice" }).catch(() => {
        }) }
      },
      {
        group: "GST & E-Invoicing",
        key: "eway",
        name: "E-Way Bills",
        desc: "EWB generation for shipments.",
        ico: "truck",
        bg: "#eff6ff",
        fg: "#2563eb",
        status: "active",
        action: { label: "Open E-Way Bills", go: () => n.push({ name: "eway-bills" }).catch(() => {
        }) }
      },
      {
        group: "Inventory & Stock",
        key: "stock-link",
        name: "Stock ↔ Documents Link",
        desc: "Delivery Notes deduct stock at FIFO cost; Purchase Receipts add stock. Invoices opt-in via 'Update Inventory'.",
        ico: "stack",
        bg: "#ecfdf5",
        fg: "#16a34a",
        status: "active",
        note: "Wired via doc_events in hooks.py — goods documents own the physical stock movement."
      },
      {
        group: "Inventory & Stock",
        key: "reorder",
        name: "Reorder Alerts",
        desc: "Daily scan flags items at or below their reorder level.",
        ico: "alert",
        bg: "#fef2f2",
        fg: "#dc2626",
        status: "active",
        action: { label: "Open Reorder Alerts", go: () => n.push({ name: "reorder-alerts" }).catch(() => {
        }) }
      },
      {
        group: "Accounting",
        key: "period-lock",
        name: "Books Lock Date",
        desc: "Server-side guard blocks postings dated on or before the lock date.",
        ico: "lock",
        bg: "#fff7ed",
        fg: "#ea580c",
        status: "active",
        action: { label: "Set on Fiscal Years", go: () => n.push({ name: "fiscal-years" }).catch(() => {
        }) }
      },
      {
        group: "Accounting",
        key: "fiscal-close",
        name: "Fiscal Year Close",
        desc: "Posts closing JE to Retained Earnings and locks the year.",
        ico: "balance",
        bg: "#eff6ff",
        fg: "#2563eb",
        status: "active"
      },
      {
        group: "Accounting",
        key: "recurring",
        name: "Recurring Documents (Auto Repeat)",
        desc: "Schedule invoices, bills, JEs to auto-generate on a cadence.",
        ico: "recurring",
        bg: "#f5f3ff",
        fg: "#7c3aed",
        status: "active",
        action: { label: "Open Recurring Bills", go: () => n.push({ name: "recurring-bills" }).catch(() => {
        }) }
      },
      {
        group: "Single Sign-On",
        key: "sso-google",
        name: "Google Sign-In",
        desc: "Let users log in with their Google or Google Workspace account.",
        ico: "user",
        bg: "#fefce8",
        fg: "#a16207",
        status: "available",
        action: { label: "Configure", go: () => n.push({ name: "settings-sso" }) }
      },
      {
        group: "Single Sign-On",
        key: "sso-ms",
        name: "Microsoft / Azure AD",
        desc: "Enterprise SSO via Microsoft 365 or Azure Active Directory.",
        ico: "shield",
        bg: "#eff6ff",
        fg: "#2563eb",
        status: "available",
        action: { label: "Configure", go: () => n.push({ name: "settings-sso" }) }
      },
      {
        group: "On the Roadmap",
        key: "slack",
        name: "Slack Notifications",
        desc: "Push invoice/payment events to Slack channels.",
        ico: "send",
        bg: "#f5f3ff",
        fg: "#7c3aed",
        status: "coming_soon"
      },
      {
        group: "On the Roadmap",
        key: "webhooks",
        name: "Outbound Webhooks",
        desc: "POST real-time events to any HTTP endpoint.",
        ico: "webhook",
        bg: "#ecfeff",
        fg: "#0891b2",
        status: "coming_soon"
      },
      {
        group: "On the Roadmap",
        key: "portal",
        name: "Customer Portal",
        desc: "Customers log in to view invoices and pay online.",
        ico: "users",
        bg: "#fef2f2",
        fg: "#dc2626",
        status: "coming_soon"
      }
    ].filter((s) => s.key !== "portal" && s.group !== "GST & E-Invoicing")), w = B(() => {
      var t;
      const s = ["Email & Notifications", "Single Sign-On", "Banking", "GST & E-Invoicing", "Inventory & Stock", "Accounting", "On the Roadmap"], a = {};
      for (const e of y.value) (a[t = e.group] || (a[t] = [])).push(e);
      return s.filter((e) => a[e]).map((e) => ({ label: e, items: a[e] }));
    });
    function l(s) {
      return y.value.filter((a) => a.status === s).length;
    }
    async function _() {
      var s;
      u.value = !0;
      try {
        const a = await D(), [t, e] = await Promise.all([
          F("psd_books.api.admin.get_company_smtp").catch(() => null),
          H("Books Company", a).catch(() => null)
        ]), p = (t == null ? void 0 : t.smtp_enabled) ?? ((s = t == null ? void 0 : t.message) == null ? void 0 : s.smtp_enabled);
        if (f.value = !!(p && Number(p)), d.value = (e == null ? void 0 : e.gstin) || "", d.value) {
          const [S, O] = await Promise.all([
            C("Sales Invoice", { fields: ["name"], filters: [["company", "=", a], ["irn", "!=", ""], ["docstatus", "=", 1]], limit: 1e5 }).catch(() => []),
            C("Sales Invoice", { fields: ["name"], filters: [["company", "=", a], ["docstatus", "=", 1], ["customer_gstin", "!=", ""]], limit: 1e5 }).catch(() => [])
          ]);
          m.value = S.length, v.value = Math.max(0, O.length - S.length);
        }
      } catch (a) {
        G.error(a.message || "Failed to load integrations");
      } finally {
        u.value = !1;
      }
    }
    return N(_), (s, a) => (i(), c("div", V, [
      o("div", J, [
        a[1] || (a[1] = o("div", null, [
          o("div", { class: "i-title" }, "Integrations"),
          o("div", { class: "i-sub" }, "What's wired up today, what's available out of the box, and what's still on the roadmap.")
        ], -1)),
        o("button", {
          class: "i-cta",
          onClick: _,
          disabled: u.value
        }, [
          o("span", {
            innerHTML: b(h)("refresh", 13)
          }, null, 8, Y),
          a[0] || (a[0] = T(" Refresh", -1))
        ], 8, U)
      ]),
      u.value ? k("", !0) : (i(), P(z, {
        key: 0,
        cards: [
          { label: "Active", tone: "success", value: l("active"), valueClass: "green" },
          { label: "Available", tone: "accent", value: l("available"), valueClass: "blue" },
          { label: "Not Configured", tone: l("not_configured") > 0 ? "warn" : "default", value: l("not_configured"), valueClass: l("not_configured") > 0 ? "orange" : "" },
          { label: "Coming Soon", tone: "default", value: l("coming_soon") }
        ]
      }, null, 8, ["cards"])),
      u.value ? (i(), c("div", j, "Loading…")) : (i(), c("div", q, [
        (i(!0), c(I, null, R(w.value, (t) => (i(), c("div", {
          key: t.label,
          class: "i-group"
        }, [
          o("div", Q, r(t.label), 1),
          o("div", X, [
            (i(!0), c(I, null, R(t.items, (e) => (i(), c("div", {
              key: e.key,
              class: E(["i-card", e.status])
            }, [
              o("div", K, [
                o("div", {
                  class: "i-card-ico",
                  style: $({ background: e.bg, color: e.fg })
                }, [
                  o("span", {
                    innerHTML: b(h)(e.ico, 18)
                  }, null, 8, Z)
                ], 4),
                o("div", x, [
                  o("div", ee, r(e.name), 1),
                  o("div", ae, r(e.desc), 1)
                ]),
                o("span", {
                  class: E(["i-pill", e.status])
                }, r(A[e.status]), 3)
              ]),
              e.note ? (i(), c("div", oe, r(e.note), 1)) : k("", !0),
              e.action ? (i(), c("div", te, [
                o("button", {
                  class: "i-link",
                  onClick: (p) => e.action.go()
                }, [
                  o("span", {
                    innerHTML: b(h)("ext", 12)
                  }, null, 8, se),
                  T(" " + r(e.action.label), 1)
                ], 8, ne)
              ])) : k("", !0)
            ], 2))), 128))
          ])
        ]))), 128))
      ]))
    ]));
  }
}, ue = /* @__PURE__ */ M(ie, [["__scopeId", "data-v-06e137d8"]]);
export {
  ue as default
};
