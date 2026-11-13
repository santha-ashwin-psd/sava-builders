import { z as a, l as o } from "./main-BAIA2aBR.js";
const n = a({});
let r = null, t = !1;
function u() {
  return t ? Promise.resolve(n) : r || (r = o("psd_books.api.admin.get_company_user_names").then((e) => (Object.assign(n, e || {}), t = !0, n)).catch(() => (t = !0, n)).finally(() => {
    r = null;
  }), r);
}
u();
function i(e) {
  return e ? n[e] || e : "";
}
export {
  i as o
};
