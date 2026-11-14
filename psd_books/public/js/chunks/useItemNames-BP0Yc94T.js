import { _ as u, k as r, c as i, a as p, t as m, C as f, p as d, b as h, H as _, F as y, g as v, z as x, h as g, J as w } from "./main-BY2V3DRt.js";
const I = {
  __name: "ItemNamesCell",
  props: { names: { type: Array, default: () => [] } },
  setup(c) {
    const o = c, n = v(() => (o.names || []).join(", ")), e = x({ show: !1, x: 0, y: 0 });
    function l(a) {
      if (!n.value) return;
      const s = a.currentTarget.getBoundingClientRect();
      e.x = Math.max(8, Math.min(s.left, window.innerWidth - 436)), e.y = s.bottom + 6, e.show = !0;
    }
    function t() {
      e.show = !1;
    }
    return (a, s) => (r(), i(y, null, [
      p("div", {
        class: "inc-text",
        onMouseenter: l,
        onMouseleave: t
      }, m(n.value || "—"), 33),
      (r(), f(_, { to: "body" }, [
        e.show ? (r(), i("div", {
          key: 0,
          class: "inc-tip",
          style: d({ left: e.x + "px", top: e.y + "px" })
        }, m(n.value), 5)) : h("", !0)
      ]))
    ], 64));
  }
}, b = /* @__PURE__ */ u(I, [["__scopeId", "data-v-0b57ba4f"]]);
function k(c) {
  const o = g({});
  async function n(t) {
    const a = (t || []).map((s) => s.name).filter(Boolean);
    if (!a.length) {
      o.value = {};
      return;
    }
    try {
      o.value = await w("psd_books.api.docs.get_item_names", { doctype: c, names: JSON.stringify(a) }) || {};
    } catch {
      o.value = {};
    }
  }
  const e = (t) => o.value[t] || [];
  return { loadItemNames: n, itemNames: e, hasItem: (t, a) => e(t).some((s) => (s || "").toLowerCase().includes(a)) };
}
export {
  b as I,
  k as u
};
