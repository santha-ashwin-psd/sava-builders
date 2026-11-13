import { _ as ue, x as ce, o as pe, c as i, a as e, t as r, u as k, i as A, d, w as x, A as _, F as g, r as y, C as ve, D as I, E as P, T as R, q as U, b as v, H as me, l as q, h as p, g as O, J as Y, z as be, k as n, p as M, W as ge, n as E, aa as W } from "./main-LhCeK3GV.js";
import { o as G } from "./userNames-Bg9sT_Dp.js";
import { b as J } from "./format-BcJZDVG4.js";
const ye = { class: "cust-page" }, fe = { class: "cust-toolbar" }, he = { style: { display: "flex", "align-items": "center", gap: "12px" } }, ke = { style: { background: "#F3F0FF", color: "#2563eb", padding: "2px 10px", "border-radius": "20px", "font-size": "12px", "font-weight": "600" } }, we = ["disabled", "title"], Ce = ["innerHTML"], xe = { style: { "margin-bottom": "14px" } }, _e = { style: { position: "relative", "max-width": "360px" } }, Te = ["innerHTML"], Ee = {
  key: 0,
  style: { padding: "60px", "text-align": "center", color: "#868e96" }
}, Fe = {
  key: 1,
  style: { padding: "60px", "text-align": "center", color: "#868e96", background: "#fff", border: "1px dashed #e4e8f0", "border-radius": "12px" }
}, Se = ["disabled", "title"], De = {
  key: 2,
  class: "et-grid"
}, je = { class: "et-grid-top" }, Be = ["stroke"], Me = { class: "et-grid-name" }, $e = { class: "et-grid-subject" }, Le = { class: "et-grid-meta" }, ze = { class: "et-grid-meta-val" }, He = { class: "et-grid-actions" }, Ne = ["disabled", "title", "onClick"], Ve = ["disabled", "title", "onClick"], Ae = {
  key: 0,
  class: "et-drawer"
}, Ie = { class: "et-header" }, Pe = { class: "et-header-left" }, Re = { class: "et-header-title" }, Ue = {
  key: 0,
  class: "et-header-sub"
}, qe = { class: "et-tabbar" }, Oe = {
  key: 0,
  class: "et-body"
}, Ye = { class: "et-field" }, We = ["readonly"], Ge = { class: "et-chips-row" }, Je = ["disabled", "title", "onClick"], Ke = { class: "et-field" }, Qe = { class: "et-varbar" }, Xe = ["onClick", "title"], Ze = { class: "et-field" }, et = { class: "et-body-row-head" }, tt = { class: "et-body-tab-btns" }, st = { class: "et-varbar" }, ot = ["onClick", "title"], at = { class: "et-code-wrap" }, nt = {
  class: "et-line-nums",
  "aria-hidden": "true"
}, it = {
  key: 0,
  class: "inv-view-footer"
}, lt = {
  key: 1,
  class: "et-body"
}, dt = { class: "et-varbar" }, rt = ["onClick", "title"], ut = { class: "et-code-wrap et-code-wrap-body" }, ct = {
  class: "et-line-nums",
  "aria-hidden": "true"
}, pt = {
  key: 2,
  class: "et-body"
}, vt = { class: "et-preview-chrome" }, mt = { class: "et-preview-topbar" }, bt = { style: { "font-weight": "600", "font-size": "13px", color: "#1a1a2e" } }, gt = ["innerHTML"], yt = { class: "et-footer" }, ft = ["disabled", "title"], ht = {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.2",
  style: { "vertical-align": "-2px", "margin-right": "5px" }
}, kt = {
  class: "nim-dialog",
  style: { width: "400px" }
}, wt = { class: "nim-body" }, Ct = { style: { "font-size": "13.5px", color: "#4a5568" } }, xt = { class: "nim-footer" }, _t = ["disabled", "title"], Tt = "e.g. Invoice {{invoice_no}} is due on {{due_date}}", K = `<p>Dear {{customer_name}},</p>
<p>Your invoice <b>{{invoice_no}}</b> of KES {{amount}} is due on {{due_date}}.</p>
<p>Regards,<br>{{company}}</p>`, Et = {
  __name: "SettingsEmailTemplates",
  setup(Ft) {
    const { toast: m } = ce(), f = p([]), F = p(!1), T = p(!1), b = p(!1), u = p("add"), w = p(!1), S = p(null), D = p(""), $ = p(!1), c = p("settings"), L = p(null), Q = p(null), C = p([""]), a = be({ name: "", subject: "", response: "", owner: "", creation: "", modified_by: "", modified: "" }), X = [
      "Sales Invoice",
      "Purchase Invoice",
      "Quotation",
      "Sales Order",
      "Purchase Order",
      "Credit Note",
      "Debit Note"
    ], j = [
      { key: "{{customer_name}}", desc: "Customer / contact name" },
      { key: "{{invoice_no}}", desc: "Invoice / document number" },
      { key: "{{amount}}", desc: "Total amount" },
      { key: "{{due_date}}", desc: "Due / delivery date" },
      { key: "{{company}}", desc: "Your company name" }
    ], z = O(() => {
      const s = D.value.toLowerCase();
      return f.value.filter(
        (t) => !s || (t.name || "").toLowerCase().includes(s) || (t.subject || "").toLowerCase().includes(s)
      );
    }), Z = O(() => {
      let s = a.response || "<p style='color:#868e96;font-style:italic'>Nothing to preview yet.</p>";
      return s = s.replace(
        /\{\{(\w+)\}\}/g,
        '<span style="display:inline-block;background:#fff3bf;color:#8b6914;padding:1px 6px;border-radius:4px;font-size:12px;font-weight:600;">{{$1}}</span>'
      ), s;
    });
    async function B() {
      F.value = !0;
      try {
        f.value = await q("psd_books.api.admin.get_email_templates") || [];
      } catch (s) {
        m("Could not load templates: " + s.message, "error");
      }
      F.value = !1;
    }
    function H() {
      u.value = "add", Object.assign(a, { name: "", subject: "", response: "", owner: "", creation: "", modified_by: "", modified: "" }), $.value = !1, c.value = "settings", C.value = [""], b.value = !0;
    }
    async function ee(s) {
      u.value = "edit", $.value = !1, c.value = "settings";
      try {
        const t = await q("psd_books.api.admin.get_email_template", { name: s.name });
        Object.assign(a, { name: t.name, subject: t.subject || "", response: t.response || "", owner: t.owner || "", creation: t.creation || "", modified_by: t.modified_by || "", modified: t.modified || "" });
      } catch {
        Object.assign(a, { name: s.name, subject: s.subject || "", response: "", owner: s.owner || "", creation: s.creation || "", modified_by: s.modified_by || "", modified: s.modified || "" });
      }
      C.value = (a.response || "").split(`
`), b.value = !0;
    }
    async function te() {
      if (!a.name.trim()) return m("Template name is required", "error");
      if (!a.subject.trim()) return m("Subject is required", "error");
      if (u.value === "add" && f.value.some((t) => t.name === a.name.trim()))
        return m(`A template named "${a.name}" already exists. Edit it instead.`, "error");
      T.value = !0;
      try {
        await Y("psd_books.api.admin.save_email_template", {
          name: a.name,
          subject: a.subject,
          response: a.response,
          use_html: 1
        }), m(u.value === "add" ? "Template created" : "Template updated"), b.value = !1, B();
      } catch (s) {
        m(s.message, "error");
      }
      T.value = !1;
    }
    async function se() {
      try {
        await Y("psd_books.api.admin.delete_email_template", { name: S.value }), m("Template deleted"), w.value = !1, B();
      } catch (s) {
        m(s.message, "error");
      }
    }
    function oe(s) {
      const t = document.querySelector(".et-subject-input");
      if (!t) {
        a.subject += s;
        return;
      }
      const o = t.selectionStart ?? a.subject.length, l = t.selectionEnd ?? a.subject.length;
      a.subject = a.subject.slice(0, o) + s + a.subject.slice(l), W(() => {
        t.focus(), t.setSelectionRange(o + s.length, o + s.length);
      });
    }
    function N(s) {
      const t = L.value;
      if (!t) {
        a.response += s;
        return;
      }
      const o = t.selectionStart ?? a.response.length, l = t.selectionEnd ?? a.response.length;
      a.response = a.response.slice(0, o) + s + a.response.slice(l), W(() => {
        t.focus(), t.setSelectionRange(o + s.length, o + s.length);
      });
    }
    const h = [
      { bg: "#F0EEFF", stroke: "#7C3AED", badgeBg: "#EDE9FE", badgeColor: "#5B21B6" },
      { bg: "#ECFDF5", stroke: "#059669", badgeBg: "#D1FAE5", badgeColor: "#065F46" },
      { bg: "#EFF6FF", stroke: "#2563EB", badgeBg: "#DBEAFE", badgeColor: "#1D4ED8" },
      { bg: "#FFF7ED", stroke: "#D97706", badgeBg: "#FEF3C7", badgeColor: "#92400E" },
      { bg: "#FFF0F3", stroke: "#E11D48", badgeBg: "#FFE4E6", badgeColor: "#9F1239" },
      { bg: "#F0F9FF", stroke: "#0284C7", badgeBg: "#E0F2FE", badgeColor: "#075985" }
    ];
    function ae(s) {
      return { background: h[s % h.length].bg };
    }
    function ne(s) {
      return h[s % h.length].stroke;
    }
    function ie(s) {
      const t = h[s % h.length];
      return { background: t.badgeBg, color: t.badgeColor };
    }
    function le(s) {
      if (!s) return "—";
      const t = new Date(s.toString().replace(" ", "T"));
      return isNaN(t.getTime()) ? "—" : t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    function V() {
      C.value = (a.response || "").split(`
`);
    }
    function de(s) {
      const t = s.target.previousElementSibling;
      t && (t.scrollTop = s.target.scrollTop);
    }
    return pe(B), (s, t) => (n(), i("div", ye, [
      e("div", fe, [
        e("div", he, [
          t[15] || (t[15] = e("span", { style: { "font-size": "18px", "font-weight": "700", color: "#1a1a2e" } }, "Email Templates", -1)),
          e("span", ke, r(f.value.length), 1)
        ]),
        e("button", {
          class: "nim-btn nim-btn-primary",
          disabled: !s.$canCreate("admin"),
          title: s.$canCreate("admin") ? "" : "Read-only access",
          onClick: H
        }, [
          e("span", {
            innerHTML: k(A)("plus", 13),
            style: { "vertical-align": "-2px", "margin-right": "4px" }
          }, null, 8, Ce),
          t[16] || (t[16] = d("New Template", -1))
        ], 8, we)
      ]),
      t[49] || (t[49] = e("div", { style: { background: "linear-gradient(135deg,#E7F5FF,#D0EBFF)", border: "1px solid #a5d8ff", "border-radius": "10px", padding: "14px 18px", "margin-bottom": "16px", display: "flex", gap: "12px", "align-items": "center" } }, [
        e("span", { style: { "font-size": "20px" } }, "📧"),
        e("div", { style: { "font-size": "12.5px", color: "#1971C2" } }, [
          d("Templates are auto-applied when sending emails. Name them exactly after the document type (e.g. "),
          e("b", null, "Sales Invoice"),
          d(") and use "),
          e("b", null, "{{variable}}"),
          d(" placeholders for dynamic data.")
        ])
      ], -1)),
      e("div", xe, [
        e("div", _e, [
          e("span", {
            style: { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", opacity: ".5" },
            innerHTML: k(A)("search", 14)
          }, null, 8, Te),
          x(e("input", {
            class: "nim-input",
            "onUpdate:modelValue": t[0] || (t[0] = (o) => D.value = o),
            placeholder: "Search templates…",
            style: { "padding-left": "32px" }
          }, null, 512), [
            [_, D.value]
          ])
        ])
      ]),
      F.value ? (n(), i("div", Ee, "Loading templates…")) : z.value.length ? (n(), i("div", De, [
        (n(!0), i(g, null, y(z.value, (o, l) => (n(), i("div", {
          key: o.name,
          class: "et-grid-card"
        }, [
          e("div", je, [
            e("div", {
              class: "et-grid-icon",
              style: M(ae(l))
            }, [
              (n(), i("svg", {
                width: "26",
                height: "26",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: ne(l),
                "stroke-width": "1.6"
              }, [...t[20] || (t[20] = [
                e("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                e("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                e("polyline", { points: "9 15 12 18 15 15" }, null, -1),
                e("line", {
                  x1: "12",
                  y1: "12",
                  x2: "12",
                  y2: "18"
                }, null, -1)
              ])], 8, Be))
            ], 4),
            e("span", {
              class: "et-grid-badge",
              style: M(ie(l))
            }, "HTML", 4)
          ]),
          e("div", Me, r(o.name), 1),
          e("div", $e, r(o.subject || "No subject"), 1),
          t[24] || (t[24] = e("div", { class: "et-grid-divider" }, null, -1)),
          e("div", Le, [
            e("div", null, [
              t[21] || (t[21] = e("div", { class: "et-grid-meta-label" }, "Last Updated", -1)),
              e("div", ze, r(le(o.modified)), 1)
            ])
          ]),
          t[25] || (t[25] = e("div", { class: "et-grid-divider" }, null, -1)),
          e("div", He, [
            e("button", {
              class: "et-grid-btn",
              disabled: !s.$canEdit("admin"),
              title: s.$canEdit("admin") ? "" : "Read-only access",
              onClick: (re) => ee(o)
            }, [...t[22] || (t[22] = [
              e("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
              ], -1),
              d(" Edit ", -1)
            ])], 8, Ne),
            e("button", {
              class: "et-grid-btn et-grid-btn-del",
              disabled: !s.$canDelete("admin"),
              title: s.$canDelete("admin") ? "" : "Not permitted",
              onClick: (re) => {
                S.value = o.name, w.value = !0;
              }
            }, [...t[23] || (t[23] = [
              ge('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a1ab7874><polyline points="3 6 5 6 21 6" data-v-a1ab7874></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" data-v-a1ab7874></path><path d="M10 11v6M14 11v6" data-v-a1ab7874></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" data-v-a1ab7874></path></svg> Delete ', 2)
            ])], 8, Ve)
          ])
        ]))), 128))
      ])) : (n(), i("div", Fe, [
        t[17] || (t[17] = e("div", { style: { "font-size": "36px", "margin-bottom": "10px" } }, "📭", -1)),
        t[18] || (t[18] = e("div", { style: { "font-size": "14px", "font-weight": "600", "margin-bottom": "4px" } }, "No templates yet", -1)),
        t[19] || (t[19] = e("div", { style: { "font-size": "12.5px" } }, "Create your first email template to automate customer communications", -1)),
        e("button", {
          class: "nim-btn nim-btn-primary",
          disabled: !s.$canCreate("admin"),
          title: s.$canCreate("admin") ? "" : "Read-only access",
          onClick: H,
          style: { "margin-top": "16px" }
        }, "Create Template", 8, Se)
      ])),
      (n(), ve(me, { to: "body" }, [
        I(R, { name: "et-fade" }, {
          default: P(() => [
            b.value ? (n(), i("div", {
              key: 0,
              class: "et-overlay",
              onClick: t[1] || (t[1] = U((o) => b.value = !1, ["self"]))
            })) : v("", !0)
          ]),
          _: 1
        }),
        I(R, { name: "et-slide" }, {
          default: P(() => [
            b.value ? (n(), i("div", Ae, [
              e("div", Ie, [
                e("div", Pe, [
                  t[26] || (t[26] = e("div", { class: "et-header-icon" }, [
                    e("svg", {
                      width: "20",
                      height: "20",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.8"
                    }, [
                      e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                      e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
                    ])
                  ], -1)),
                  e("div", null, [
                    e("div", Re, r(u.value === "add" ? "New Email Template" : "Edit Template"), 1),
                    a.name ? (n(), i("div", Ue, r(a.name), 1)) : v("", !0)
                  ])
                ]),
                e("button", {
                  class: "et-close-btn",
                  onClick: t[2] || (t[2] = (o) => b.value = !1)
                }, [...t[27] || (t[27] = [
                  e("svg", {
                    width: "15",
                    height: "15",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5"
                  }, [
                    e("path", { d: "M18 6 6 18M6 6l12 12" })
                  ], -1)
                ])])
              ]),
              e("div", qe, [
                e("button", {
                  class: E(["et-tab", { active: c.value === "settings" }]),
                  onClick: t[3] || (t[3] = (o) => c.value = "settings")
                }, [...t[28] || (t[28] = [
                  e("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("circle", {
                      cx: "12",
                      cy: "12",
                      r: "3"
                    }),
                    e("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
                  ], -1),
                  d(" Template Settings ", -1)
                ])], 2),
                e("button", {
                  class: E(["et-tab", { active: c.value === "body" }]),
                  onClick: t[4] || (t[4] = (o) => c.value = "body")
                }, [...t[29] || (t[29] = [
                  e("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "16 18 22 12 16 6" }),
                    e("polyline", { points: "8 6 2 12 8 18" })
                  ], -1),
                  d(" Email Body ", -1)
                ])], 2),
                e("button", {
                  class: E(["et-tab", { active: c.value === "preview" }]),
                  onClick: t[5] || (t[5] = (o) => c.value = "preview")
                }, [...t[30] || (t[30] = [
                  e("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
                    e("circle", {
                      cx: "12",
                      cy: "12",
                      r: "3"
                    })
                  ], -1),
                  d(" Preview ", -1)
                ])], 2)
              ]),
              c.value === "settings" ? (n(), i("div", Oe, [
                t[40] || (t[40] = e("div", { class: "et-section-head" }, [
                  e("div", { class: "et-section-title" }, "Template Settings"),
                  e("div", { class: "et-section-desc" }, "Configure the basic details of your template.")
                ], -1)),
                e("div", Ye, [
                  t[32] || (t[32] = e("label", { class: "et-label" }, [
                    d("Template Name "),
                    e("span", { class: "et-req" }, "*")
                  ], -1)),
                  x(e("input", {
                    class: "nim-input",
                    "onUpdate:modelValue": t[6] || (t[6] = (o) => a.name = o),
                    readonly: u.value === "edit",
                    placeholder: "e.g. Sales Invoice",
                    style: M(u.value === "edit" ? "background:#f8f9fc;color:#868e96;cursor:not-allowed" : "")
                  }, null, 12, We), [
                    [_, a.name]
                  ]),
                  t[33] || (t[33] = e("div", { class: "et-hint" }, "Auto-applied when sending — click a doc type to use as name:", -1)),
                  e("div", Ge, [
                    (n(), i(g, null, y(X, (o) => e("button", {
                      key: o,
                      class: E(["et-docchip", { active: a.name === o, taken: u.value === "add" && f.value.some((l) => l.name === o) }]),
                      disabled: u.value === "edit",
                      title: u.value === "add" && f.value.some((l) => l.name === o) ? "Template already exists — click Edit to modify it" : "",
                      onClick: (l) => u.value === "add" && (a.name = o)
                    }, [
                      t[31] || (t[31] = e("svg", {
                        width: "11",
                        height: "11",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        e("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                        e("polyline", { points: "14 2 14 8 20 8" })
                      ], -1)),
                      d(" " + r(o), 1)
                    ], 10, Je)), 64))
                  ])
                ]),
                e("div", Ke, [
                  t[35] || (t[35] = e("label", { class: "et-label" }, [
                    d("Subject "),
                    e("span", { class: "et-req" }, "*")
                  ], -1)),
                  x(e("input", {
                    class: "nim-input et-subject-input",
                    "onUpdate:modelValue": t[7] || (t[7] = (o) => a.subject = o),
                    placeholder: Tt
                  }, null, 512), [
                    [_, a.subject]
                  ]),
                  e("div", Qe, [
                    t[34] || (t[34] = e("span", { class: "et-varlabel" }, "Insert variables in subject:", -1)),
                    (n(), i(g, null, y(j, (o) => e("button", {
                      key: o.key,
                      class: "et-varchip",
                      onClick: (l) => oe(o.key),
                      title: o.desc
                    }, r(o.key), 9, Xe)), 64))
                  ])
                ]),
                e("div", Ze, [
                  e("div", et, [
                    t[38] || (t[38] = e("div", null, [
                      e("label", { class: "et-label" }, [
                        d("Email Body "),
                        e("span", { class: "et-req" }, "*")
                      ]),
                      e("span", { class: "et-html-badge" }, "HTML")
                    ], -1)),
                    e("div", tt, [
                      e("button", {
                        class: "et-edit-html-btn",
                        onClick: t[8] || (t[8] = (o) => c.value = "body")
                      }, [...t[36] || (t[36] = [
                        e("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.2"
                        }, [
                          e("polyline", { points: "16 18 22 12 16 6" }),
                          e("polyline", { points: "8 6 2 12 8 18" })
                        ], -1),
                        d(" Edit HTML ", -1)
                      ])]),
                      e("button", {
                        class: "et-preview-btn",
                        onClick: t[9] || (t[9] = (o) => c.value = "preview")
                      }, [...t[37] || (t[37] = [
                        e("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          e("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
                          e("circle", {
                            cx: "12",
                            cy: "12",
                            r: "3"
                          })
                        ], -1),
                        d(" Preview ", -1)
                      ])])
                    ])
                  ]),
                  e("div", st, [
                    t[39] || (t[39] = e("span", { class: "et-varlabel" }, "Insert variables:", -1)),
                    (n(), i(g, null, y(j, (o) => e("button", {
                      key: o.key,
                      class: "et-varchip",
                      onClick: (l) => N(o.key),
                      title: o.desc
                    }, r(o.key), 9, ot)), 64))
                  ]),
                  e("div", at, [
                    e("div", nt, [
                      (n(!0), i(g, null, y(C.value, (o, l) => (n(), i("span", { key: l }, r(l + 1), 1))), 128))
                    ]),
                    x(e("textarea", {
                      ref_key: "bodyTextarea",
                      ref: L,
                      class: "et-code-textarea",
                      "onUpdate:modelValue": t[10] || (t[10] = (o) => a.response = o),
                      placeholder: K,
                      spellcheck: "false",
                      onInput: V,
                      onScroll: de
                    }, null, 544), [
                      [_, a.response]
                    ])
                  ])
                ]),
                u.value === "edit" && a.owner ? (n(), i("div", it, [
                  d(" Created by " + r(k(G)(a.owner)) + " on " + r(k(J)(a.creation)) + " ", 1),
                  a.modified_by ? (n(), i(g, { key: 0 }, [
                    d(" · Last modified by " + r(k(G)(a.modified_by)) + " on " + r(k(J)(a.modified)), 1)
                  ], 64)) : v("", !0)
                ])) : v("", !0)
              ])) : v("", !0),
              c.value === "body" ? (n(), i("div", lt, [
                t[42] || (t[42] = e("div", { class: "et-section-head" }, [
                  e("div", { style: { display: "flex", "align-items": "center", gap: "8px" } }, [
                    e("div", {
                      class: "et-section-title",
                      style: { margin: "0" }
                    }, "Email Body"),
                    e("span", { class: "et-html-badge" }, "HTML")
                  ]),
                  e("div", { class: "et-section-desc" }, "Write your email content using HTML. Use variables to personalize the email.")
                ], -1)),
                e("div", dt, [
                  t[41] || (t[41] = e("span", { class: "et-varlabel" }, "Insert variables:", -1)),
                  (n(), i(g, null, y(j, (o) => e("button", {
                    key: o.key,
                    class: "et-varchip",
                    onClick: (l) => N(o.key),
                    title: o.desc
                  }, r(o.key), 9, rt)), 64))
                ]),
                e("div", ut, [
                  e("div", ct, [
                    (n(!0), i(g, null, y(C.value, (o, l) => (n(), i("span", { key: l }, r(l + 1), 1))), 128))
                  ]),
                  x(e("textarea", {
                    ref_key: "bodyTextarea2",
                    ref: Q,
                    class: "et-code-textarea",
                    "onUpdate:modelValue": t[11] || (t[11] = (o) => a.response = o),
                    placeholder: K,
                    spellcheck: "false",
                    onInput: V
                  }, null, 544), [
                    [_, a.response]
                  ])
                ])
              ])) : v("", !0),
              c.value === "preview" ? (n(), i("div", pt, [
                e("div", vt, [
                  e("div", mt, [
                    t[44] || (t[44] = e("div", { class: "et-preview-icon" }, "📧", -1)),
                    e("div", null, [
                      e("div", bt, r(a.subject || "(no subject)"), 1),
                      t[43] || (t[43] = e("div", { style: { "font-size": "11px", color: "#868e96", "margin-top": "1px" } }, [
                        d("Live preview · "),
                        e("span", { style: { color: "#f59e0b" } }, "{{variable}}"),
                        d(" placeholders highlighted")
                      ], -1))
                    ])
                  ]),
                  e("div", {
                    class: "et-preview-body",
                    innerHTML: Z.value
                  }, null, 8, gt)
                ])
              ])) : v("", !0),
              e("div", yt, [
                e("button", {
                  class: "nim-btn nim-btn-ghost",
                  onClick: t[12] || (t[12] = (o) => b.value = !1)
                }, "Cancel"),
                e("button", {
                  class: "nim-btn nim-btn-primary",
                  onClick: te,
                  disabled: T.value || !(u.value === "add" ? s.$canCreate("admin") : s.$canEdit("admin")),
                  title: (u.value === "add" ? s.$canCreate("admin") : s.$canEdit("admin")) ? "" : "Read-only access",
                  style: { "min-width": "150px" }
                }, [
                  (n(), i("svg", ht, [...t[45] || (t[45] = [
                    e("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }, null, -1),
                    e("polyline", { points: "17 21 17 13 7 13 7 21" }, null, -1),
                    e("polyline", { points: "7 3 7 8 15 8" }, null, -1)
                  ])])),
                  d(" " + r(T.value ? "Saving…" : "Save Template"), 1)
                ], 8, ft)
              ])
            ])) : v("", !0)
          ]),
          _: 1
        }),
        w.value ? (n(), i("div", {
          key: 0,
          class: "nim-overlay",
          onClick: t[14] || (t[14] = U((o) => w.value = !1, ["self"]))
        }, [
          e("div", kt, [
            t[48] || (t[48] = e("div", { class: "nim-header" }, [
              e("span", { style: { "font-weight": "700", color: "#fff" } }, "Delete Template?")
            ], -1)),
            e("div", wt, [
              e("p", Ct, [
                t[46] || (t[46] = d('Delete "', -1)),
                e("b", null, r(S.value), 1),
                t[47] || (t[47] = d('"? This cannot be undone and any automation using this template will stop working.', -1))
              ])
            ]),
            e("div", xt, [
              e("button", {
                class: "nim-btn nim-btn-ghost",
                onClick: t[13] || (t[13] = (o) => w.value = !1)
              }, "Cancel"),
              e("button", {
                class: "nim-btn",
                style: { background: "#c92a2a", color: "#fff", "border-color": "#c92a2a" },
                disabled: !s.$canDelete("admin"),
                title: s.$canDelete("admin") ? "" : "Not permitted",
                onClick: se
              }, "Delete", 8, _t)
            ])
          ])
        ])) : v("", !0)
      ]))
    ]));
  }
}, Bt = /* @__PURE__ */ ue(Et, [["__scopeId", "data-v-a1ab7874"]]);
export {
  Bt as default
};
