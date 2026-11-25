import { z as R, o as I, m as J, k as o, c as i, a as v, n as z, t as p, E as O, b as f, a9 as k, x as g, D as W, p as Q, w as j, B as G, F as B, r as P, d as D, af as U, J as X, g as C, aa as Y, h as m, ag as Z } from "./main-C6Zyq0K6.js";
const ee = { class: "ss-wrap" }, te = ["onKeydown"], ae = {
  key: 0,
  class: "ss-caret"
}, se = { class: "ss-search-row" }, le = { class: "ss-opts" }, ne = {
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
  setup(u, { emit: A }) {
    const l = u, y = A, n = m(""), r = m(!1), x = m(null), h = m(null), K = m({}), _ = m([]), d = C(() => {
      const e = l.valueKey, a = l.labelKey, t = (l.options || []).map((s) => {
        if (typeof s == "string") return { value: s, label: s };
        const S = e ? s[e] : s.value !== void 0 ? s.value : s.name !== void 0 ? s.name : String(s), H = a ? s[a] : s.label !== void 0 ? s.label : s.name !== void 0 ? s.name : String(s);
        return { ...s, value: S ?? "", label: H ?? S ?? "" };
      }), c = new Set(t.map((s) => String(s.value)));
      for (const s of _.value)
        c.has(String(s.value)) || t.unshift(s);
      return t;
    }), F = C(() => {
      if (!l.modelValue && l.modelValue !== 0) return "";
      const e = d.value.find((a) => String(a.value) === String(l.modelValue));
      return e ? e.label : l.modelValue;
    }), w = C(() => {
      const e = n.value.toLowerCase().trim();
      if (!e) return d.value.slice(0, 150);
      const a = [], t = [];
      return d.value.forEach((c) => {
        const s = String(c.label || "").toLowerCase(), S = String(c.sub || "").toLowerCase();
        s.startsWith(e) ? a.push(c) : (s.includes(e) || S.includes(e)) && t.push(c);
      }), [...a, ...t].slice(0, 100);
    }), V = C(() => {
      if (!l.createable) return !1;
      const e = n.value.trim();
      return l.staticCreate && !e ? !0 : e ? !d.value.some((a) => String(a.label).toLowerCase() === e.toLowerCase()) : !1;
    });
    function N() {
      if (!h.value) return;
      const e = h.value.getBoundingClientRect(), t = window.innerHeight - e.bottom < 260 && e.top > 260;
      K.value = {
        position: "fixed",
        left: e.left + "px",
        width: e.width + "px",
        zIndex: 99999,
        ...t ? { bottom: window.innerHeight - e.top + 4 + "px" } : { top: e.bottom + 4 + "px" }
      };
    }
    let T = null;
    R(n, (e) => {
      clearTimeout(T), T = setTimeout(() => y("search", e), 200);
    });
    let M = 0;
    function L() {
      l.disabled || (N(), r.value = !0, n.value = "", M = window.innerWidth, y("search", ""), Y(() => x.value && x.value.focus()));
    }
    function E(e) {
      y("update:modelValue", e.value), y("select", e), r.value = !1, n.value = "";
    }
    async function q() {
      const e = n.value.trim();
      if (r.value = !1, l.createDoctype) {
        const { openCreate: a } = Z(), t = await a(l.createDoctype, e);
        t && (_.value.push({ value: t.name, label: t.label || t.name }), E({ value: t.name, label: t.label }));
      } else
        y("create", e);
    }
    function $(e) {
      if (!r.value) return;
      const a = h.value, t = document.querySelector(".ss-drop-teleport");
      a && !a.contains(e.target) && t && !t.contains(e.target) && (r.value = !1);
    }
    function b(e) {
      if (!r.value) return;
      const a = document.querySelector(".ss-drop-teleport");
      if (!(a && e.target && a.contains(e.target))) {
        if (e.type === "resize" && window.innerWidth === M) {
          N();
          return;
        }
        r.value = !1;
      }
    }
    return I(() => {
      document.addEventListener("pointerdown", $, !0), document.addEventListener("scroll", b, { capture: !0, passive: !0 }), window.addEventListener("resize", b, { passive: !0 });
    }), J(() => {
      document.removeEventListener("pointerdown", $, !0), document.removeEventListener("scroll", b, { capture: !0 }), window.removeEventListener("resize", b);
    }), (e, a) => (o(), i("div", ee, [
      v("div", {
        ref_key: "trigEl",
        ref: h,
        class: z(["ss-trigger", { open: r.value, "ss-disabled": u.disabled, "ss-compact": u.compact }]),
        tabindex: "0",
        onClick: L,
        onKeydown: [
          k(g(L, ["prevent"]), ["enter"]),
          k(g(L, ["prevent"]), ["space"])
        ]
      }, [
        v("span", {
          class: z(["ss-display", { "ss-ph": !u.modelValue && u.modelValue !== 0 }])
        }, p(u.modelValue || u.modelValue === 0 ? F.value : u.placeholder), 3),
        d.value.length > 1 ? (o(), i("span", ae, [
          O(U, {
            name: "chevD",
            size: 11
          })
        ])) : f("", !0)
      ], 42, te),
      (o(), W(X, { to: "body" }, [
        r.value ? (o(), i("div", {
          key: 0,
          class: "ss-drop ss-drop-teleport",
          style: Q(K.value)
        }, [
          v("div", se, [
            j(v("input", {
              ref_key: "inputEl",
              ref: x,
              "onUpdate:modelValue": a[0] || (a[0] = (t) => n.value = t),
              class: "ss-search-input",
              placeholder: "Type to search…",
              onKeydown: [
                a[1] || (a[1] = k((t) => r.value = !1, ["escape"])),
                a[2] || (a[2] = k(g((t) => n.value.trim() && w.value.length ? E(w.value[0]) : V.value && q(), ["prevent"]), ["enter"]))
              ]
            }, null, 544), [
              [G, n.value]
            ])
          ]),
          v("div", le, [
            !w.value.length && !V.value ? (o(), i("div", ne, p(d.value.length ? `No matches for "${n.value}"` : "No options available"), 1)) : f("", !0),
            (o(!0), i(B, null, P(w.value, (t) => (o(), i("div", {
              key: t.value,
              class: z(["ss-opt", { "ss-opt-sel": String(t.value) === String(u.modelValue) }]),
              onMousedown: g((c) => E(t), ["prevent"])
            }, [
              D(p(t.label), 1),
              t.sub ? (o(), i("div", re, p(t.sub), 1)) : f("", !0)
            ], 42, oe))), 128)),
            V.value ? (o(), i("div", {
              key: 1,
              class: "ss-opt ss-opt-create",
              onMousedown: g(q, ["prevent"])
            }, [
              l.staticCreate && !n.value.trim() ? f("", !0) : (o(), W(U, {
                key: 0,
                name: "plus",
                size: 13
              })),
              l.staticCreate && !n.value.trim() ? (o(), i(B, { key: 1 }, [
                D(p(l.createLabel || "+ Add New"), 1)
              ], 64)) : (o(), i(B, { key: 2 }, [
                a[3] || (a[3] = D("Create ", -1)),
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
