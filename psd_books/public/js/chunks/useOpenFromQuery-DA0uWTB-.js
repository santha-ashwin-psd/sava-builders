import { ad as e, y as u } from "./main-BmCP9zzu.js";
function s({ route: n, openByName: t, paramKey: f = "open" } = {}) {
  var o;
  if (!n || typeof t != "function") return;
  const i = (r) => {
    r && t(String(r));
  };
  i((o = n.query) == null ? void 0 : o[f]), e() && u(
    () => {
      var r;
      return (r = n.query) == null ? void 0 : r[f];
    },
    (r) => {
      r && i(r);
    }
  );
}
export {
  s as o
};
