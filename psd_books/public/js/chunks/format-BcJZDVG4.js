function n(t) {
  return parseFloat(t) || 0;
}
function e(t, r) {
  if (t == null || t === "") return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: r || "KES",
      maximumFractionDigits: 2
    }).format(t);
  } catch {
    return "KES " + Number(t).toLocaleString("en-US");
  }
}
function a(t) {
  if (!t) return "—";
  try {
    return new Date(t).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch {
    return t;
  }
}
function u() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
export {
  e as a,
  a as b,
  n as f,
  u as t
};
