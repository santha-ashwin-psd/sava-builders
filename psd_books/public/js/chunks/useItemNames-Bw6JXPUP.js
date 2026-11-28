import { _ as p, k as l, c as m, a as f, t as u, D as d, p as h, b as _, J as y, F as v, g as x, A as g, h as w, K as I } from "./main-kzbbU6NO.js";
const N = {
  __name: "ItemNamesCell",
  props: { names: { type: Array, default: () => [] } },
  setup(n) {
    const c = n, t = x(() => (c.names || []).join(", ")), e = g({ show: !1, x: 0, y: 0 });
    function o(a) {
      if (!t.value) return;
      const s = a.currentTarget.getBoundingClientRect();
      e.x = Math.max(8, Math.min(s.left, window.innerWidth - 436)), e.y = s.bottom + 6, e.show = !0;
    }
    function i() {
      e.show = !1;
    }
    return (a, s) => (l(), m(v, null, [
      f("div", {
        class: "inc-text",
        onMouseenter: o,
        onMouseleave: i
      }, u(t.value || "—"), 33),
      (l(), d(y, { to: "body" }, [
        e.show ? (l(), m("div", {
          key: 0,
          class: "inc-tip",
          style: h({ left: e.x + "px", top: e.y + "px" })
        }, u(t.value), 5)) : _("", !0)
      ]))
    ], 64));
  }
}, k = /* @__PURE__ */ p(N, [["__scopeId", "data-v-0b57ba4f"]]);
function B(n, c = "psd_books.api.docs.get_item_names") {
  const t = w({});
  async function e(a) {
    const s = (a || []).map((r) => r.name).filter(Boolean);
    if (!s.length) {
      t.value = {};
      return;
    }
    try {
      t.value = await I(c, { doctype: n, names: JSON.stringify(s) }) || {};
    } catch {
      t.value = {};
    }
  }
  const o = (a) => t.value[a] || [];
  return { loadItemNames: e, itemNames: o, hasItem: (a, s) => o(a).some((r) => (r || "").toLowerCase().includes(s)) };
}
export {
  k as I,
  B as u
};
