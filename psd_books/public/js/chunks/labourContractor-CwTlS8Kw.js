const p = /^[AP][0-9]{9}[A-Z]$/, d = ["Individual", "Company"];
function c(t = /* @__PURE__ */ new Date()) {
  const e = (r) => String(r).padStart(2, "0");
  return t.getFullYear() + "-" + e(t.getMonth() + 1) + "-" + e(t.getDate());
}
function u(t, e = c()) {
  return !!t && String(t).slice(0, 10) < e;
}
function f(t) {
  var r, i;
  const e = String(t || "?").trim().split(/\s+/).filter(Boolean);
  return ((((r = e[0]) == null ? void 0 : r[0]) || "") + (((i = e[1]) == null ? void 0 : i[0]) || "")).toUpperCase() || "?";
}
function o(t, e, r = c()) {
  return e === "active" ? !t.disabled : e === "inactive" ? !!t.disabled : e === "expired" ? !t.disabled && u(t.tax_cert_expiry, r) : !0;
}
function l(t, e = c()) {
  const r = { all: t.length, active: 0, inactive: 0, expired: 0 };
  for (const i of t)
    o(i, "active", e) && r.active++, o(i, "inactive", e) && r.inactive++, o(i, "expired", e) && r.expired++;
  return r;
}
function _(t) {
  return String(t ?? "").replace(/[^0-9+ ]/g, "").replace(/(?!^)\+/g, "");
}
function g(t, e) {
  const r = String(e || "").trim().toLowerCase();
  return r ? [t.contractor_name, t.name, t.id_no, t.kra_pin, t.phone, t.contractor_type].some((i) => String(i || "").toLowerCase().includes(r)) : !0;
}
function m(t, e = [], r = "") {
  const i = {};
  String(t.contractor_name || "").trim() || (i.contractor_name = "Name is required"), String(t.id_no || "").trim() || (i.id_no = "ID or registration no. is required");
  const n = String(t.kra_pin || "").trim().toUpperCase();
  if (!n) i.kra_pin = "KRA PIN is required";
  else if (!p.test(n)) i.kra_pin = "Invalid KRA PIN. Expected format: A123456789Z";
  else {
    const a = e.find((s) => String(s.kra_pin || "").toUpperCase() === n && s.name !== r);
    a && (i.kra_pin = "KRA PIN " + n + " already belongs to " + (a.contractor_name || a.name));
  }
  return t.tax_cert_expiry || (i.tax_cert_expiry = "Tax certificate expiry is required"), i;
}
export {
  d as C,
  f as a,
  l as b,
  _ as c,
  g as d,
  u as i,
  o as m,
  c as t,
  m as v
};
