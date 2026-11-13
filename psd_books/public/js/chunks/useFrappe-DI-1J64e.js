import { l as i, h as l } from "./main-NVMsEbWc.js";
function f(e, a = {}) {
  const n = l(null), t = l(!1), u = l(null);
  async function o(c = {}) {
    t.value = !0, u.value = null;
    try {
      const r = await i(e, { ...a, ...c });
      n.value = r;
    } catch (r) {
      u.value = r, console.error(`[useFrappeCall] ${e}`, r);
    } finally {
      t.value = !1;
    }
    return n.value;
  }
  return { data: n, loading: t, error: u, execute: o };
}
function m(e, a = "KES") {
  return e == null ? "—" : new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: a,
    maximumFractionDigits: 0
  }).format(e);
}
function y(e) {
  return e ? new Date(e).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : "—";
}
export {
  m as a,
  y as f,
  f as u
};
