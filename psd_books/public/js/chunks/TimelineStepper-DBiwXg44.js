import { _ as v, k as s, c as a, F as p, r as b, a as c, t as i, n as y, b as _, C as g, p as k, H as m, z as f } from "./main-BgVQJ7hW.js";
const x = { class: "tls-wrap" }, T = ["onMouseenter", "onTouchstartPassive"], B = { key: 0 }, C = { key: 1 }, S = { key: 2 }, w = { key: 3 }, z = { class: "tls-lbl" }, M = {
  __name: "TimelineStepper",
  props: {
    steps: { type: Array, required: !0 }
  },
  setup(n) {
    const t = f({ visible: !1, label: "", x: 0, y: 0 });
    function d(h, l) {
      const e = (l.touches ? l.touches[0].target : l.target).getBoundingClientRect();
      t.label = h.label, t.x = e.left + e.width / 2, t.y = e.top - 8, t.visible = !0;
    }
    function u() {
      t.visible = !1;
    }
    return (h, l) => (s(), a("div", x, [
      (s(!0), a(p, null, b(n.steps, (e, o) => (s(), a(p, {
        key: e.key
      }, [
        c("div", {
          class: y(["tls-step", { done: e.done, danger: e.danger, current: e.current }])
        }, [
          c("div", {
            class: "tls-dot",
            onMouseenter: (r) => d(e, r),
            onMouseleave: u,
            onTouchstartPassive: (r) => d(e, r),
            onTouchendPassive: u
          }, [
            e.cross ? (s(), a("span", B, "✕")) : e.danger ? (s(), a("span", C, "!")) : e.done ? (s(), a("span", S, "✓")) : (s(), a("span", w, i(o + 1), 1))
          ], 40, T),
          c("div", z, i(e.label), 1)
        ], 2),
        o < n.steps.length - 1 ? (s(), a("div", {
          key: 0,
          class: y(["tls-line", {
            done: n.steps[o + 1].done || n.steps[o + 1].current,
            danger: n.steps[o + 1].danger
          }])
        }, null, 2)) : _("", !0)
      ], 64))), 128)),
      (s(), g(m, { to: "body" }, [
        t.visible ? (s(), a("div", {
          key: 0,
          class: "tls-tooltip",
          style: k({ top: t.y + "px", left: t.x + "px" })
        }, i(t.label), 5)) : _("", !0)
      ]))
    ]));
  }
}, F = /* @__PURE__ */ v(M, [["__scopeId", "data-v-7ecbad8c"]]);
export {
  F as T
};
