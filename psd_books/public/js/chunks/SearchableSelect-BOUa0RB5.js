import { y as R, o as I, m as O, k as o, c as i, a as v, n as D, t as p, D as Q, b as f, a9 as S, q as g, C as W, p as j, w as G, A as J, F as E, r as P, d as z, af as A, H as X, g as k, aa as Y, h as m, ag as Z } from "./main-BgVQJ7hW.js";
const ee = { class: "ss-wrap" }, te = ["onKeydown"], ae = {
  key: 0,
  class: "ss-caret"
}, le = { class: "ss-search-row" }, se = { class: "ss-opts" }, ne = {
  key: 0,
  class: "ss-no-match"
}, oe = ["onMousedown"], re = {
  key: 0,
  style: { "font-size": "11.5px", "font-weight": "400", color: "#6b7280", "margin-top": "1px", "white-space": "normal" }
}, ie = { style: { "margin-left": "4px" } }, ce = {
  __name: "SearchableSelect",
  props: {
    modelValue: { default: "" },
    options: { type: Array, default: () => [] },
    valueKey: { type: String, default: "" },
    labelKey: { type: String, default: "" },
    placeholder: { type: String, default: "— Select —" },
    compact: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    createable: { type: Boolean, default: !1 },
    staticCreate: { type: Boolean, default: !1 },
    createDoctype: { type: String, default: "" },
    createLabel: { type: String, default: "" }
  },
  emits: ["update:modelValue", "select", "create", "search"],
  setup(u, { emit: H }) {
    const s = u, y = H, n = m(""), r = m(!1), C = m(null), h = m(null), B = m({}), K = m([]), c = k(() => {
      const e = s.valueKey, a = s.labelKey, t = (s.options || []).map((l) => {
        if (typeof l == "string") return { value: l, label: l };
        const $ = e ? l[e] : l.value !== void 0 ? l.value : l.name !== void 0 ? l.name : String(l), F = a ? l[a] : l.label !== void 0 ? l.label : l.name !== void 0 ? l.name : String(l);
        return { ...l, value: $ ?? "", label: F ?? $ ?? "" };
      }), d = new Set(t.map((l) => String(l.value)));
      for (const l of K.value)
        d.has(String(l.value)) || t.unshift(l);
      return t;
    }), U = k(() => {
      if (!s.modelValue && s.modelValue !== 0) return "";
      const e = c.value.find((a) => String(a.value) === String(s.modelValue));
      return e ? e.label : s.modelValue;
    }), w = k(() => {
      const e = n.value.toLowerCase().trim();
      if (!e) return c.value.slice(0, 150);
      const a = [], t = [];
      return c.value.forEach((d) => {
        const l = String(d.label || "").toLowerCase();
        l.startsWith(e) ? a.push(d) : l.includes(e) && t.push(d);
      }), [...a, ...t].slice(0, 100);
    }), V = k(() => {
      if (!s.createable) return !1;
      const e = n.value.trim();
      return s.staticCreate && !e ? !0 : e ? !c.value.some((a) => String(a.label).toLowerCase() === e.toLowerCase()) : !1;
    });
    function _() {
      if (!h.value) return;
      const e = h.value.getBoundingClientRect(), t = window.innerHeight - e.bottom < 260 && e.top > 260;
      B.value = {
        position: "fixed",
        left: e.left + "px",
        width: e.width + "px",
        zIndex: 99999,
        ...t ? { bottom: window.innerHeight - e.top + 4 + "px" } : { top: e.bottom + 4 + "px" }
      };
    }
    let N = null;
    R(n, (e) => {
      clearTimeout(N), N = setTimeout(() => y("search", e), 200);
    });
    let T = 0;
    function x() {
      s.disabled || (_(), r.value = !0, n.value = "", T = window.innerWidth, y("search", ""), Y(() => C.value && C.value.focus()));
    }
    function L(e) {
      y("update:modelValue", e.value), y("select", e), r.value = !1, n.value = "";
    }
    async function q() {
      const e = n.value.trim();
      if (r.value = !1, s.createDoctype) {
        const { openCreate: a } = Z(), t = await a(s.createDoctype, e);
        t && (K.value.push({ value: t.name, label: t.label || t.name }), L({ value: t.name, label: t.label }));
      } else
        y("create", e);
    }
    function M(e) {
      if (!r.value) return;
      const a = h.value, t = document.querySelector(".ss-drop-teleport");
      a && !a.contains(e.target) && t && !t.contains(e.target) && (r.value = !1);
    }
    function b(e) {
      if (!r.value) return;
      const a = document.querySelector(".ss-drop-teleport");
      if (!(a && e.target && a.contains(e.target))) {
        if (e.type === "resize" && window.innerWidth === T) {
          _();
          return;
        }
        r.value = !1;
      }
    }
    return I(() => {
      document.addEventListener("pointerdown", M, !0), document.addEventListener("scroll", b, { capture: !0, passive: !0 }), window.addEventListener("resize", b, { passive: !0 });
    }), O(() => {
      document.removeEventListener("pointerdown", M, !0), document.removeEventListener("scroll", b, { capture: !0 }), window.removeEventListener("resize", b);
    }), (e, a) => (o(), i("div", ee, [
      v("div", {
        ref_key: "trigEl",
        ref: h,
        class: D(["ss-trigger", { open: r.value, "ss-disabled": u.disabled, "ss-compact": u.compact }]),
        tabindex: "0",
        onClick: x,
        onKeydown: [
          S(g(x, ["prevent"]), ["enter"]),
          S(g(x, ["prevent"]), ["space"])
        ]
      }, [
        v("span", {
          class: D(["ss-display", { "ss-ph": !u.modelValue && u.modelValue !== 0 }])
        }, p(u.modelValue || u.modelValue === 0 ? U.value : u.placeholder), 3),
        c.value.length > 1 ? (o(), i("span", ae, [
          Q(A, {
            name: "chevD",
            size: 11
          })
        ])) : f("", !0)
      ], 42, te),
      (o(), W(X, { to: "body" }, [
        r.value ? (o(), i("div", {
          key: 0,
          class: "ss-drop ss-drop-teleport",
          style: j(B.value)
        }, [
          v("div", le, [
            G(v("input", {
              ref_key: "inputEl",
              ref: C,
              "onUpdate:modelValue": a[0] || (a[0] = (t) => n.value = t),
              class: "ss-search-input",
              placeholder: "Type to search…",
              onKeydown: [
                a[1] || (a[1] = S((t) => r.value = !1, ["escape"])),
                a[2] || (a[2] = S(g((t) => n.value.trim() && w.value.length ? L(w.value[0]) : V.value && q(), ["prevent"]), ["enter"]))
              ]
            }, null, 544), [
              [J, n.value]
            ])
          ]),
          v("div", se, [
            !w.value.length && !V.value ? (o(), i("div", ne, p(c.value.length ? `No matches for "${n.value}"` : "No options available"), 1)) : f("", !0),
            (o(!0), i(E, null, P(w.value, (t) => (o(), i("div", {
              key: t.value,
              class: D(["ss-opt", { "ss-opt-sel": String(t.value) === String(u.modelValue) }]),
              onMousedown: g((d) => L(t), ["prevent"])
            }, [
              z(p(t.label), 1),
              t.sub ? (o(), i("div", re, p(t.sub), 1)) : f("", !0)
            ], 42, oe))), 128)),
            V.value ? (o(), i("div", {
              key: 1,
              class: "ss-opt ss-opt-create",
              onMousedown: g(q, ["prevent"])
            }, [
              s.staticCreate && !n.value.trim() ? f("", !0) : (o(), W(A, {
                key: 0,
                name: "plus",
                size: 13
              })),
              s.staticCreate && !n.value.trim() ? (o(), i(E, { key: 1 }, [
                z(p(s.createLabel || "+ Add New"), 1)
              ], 64)) : (o(), i(E, { key: 2 }, [
                a[3] || (a[3] = z("Create ", -1)),
                v("strong", ie, '"' + p(n.value.trim()) + '"', 1)
              ], 64))
            ], 32)) : f("", !0)
          ])
        ], 4)) : f("", !0)
      ]))
    ]));
  }
};
export {
  ce as _
};
