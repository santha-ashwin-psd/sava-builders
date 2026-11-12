import { _ as xn, h as v, y as Xo, c as o, W as x, a as s, F as u, r as m, u as w, w as Es, A as Ks, b as h, t as a, v as sl, d as os, n as c, p as qs, D as Cn, E as Sn, a6 as jn, e as Mn, l as K, g as V, k as l, q as Dn } from "./main-UuZwJvYM.js";
import { a as Tn, u as ie } from "./useFrappe-CopREfJT.js";
const qt = new TextEncoder(), On = (() => {
  const F = new Uint32Array(256);
  for (let S = 0; S < 256; S++) {
    let d = S;
    for (let _ = 0; _ < 8; _++) d = d & 1 ? 3988292384 ^ d >>> 1 : d >>> 1;
    F[S] = d >>> 0;
  }
  return F;
})();
function Rn(F) {
  let S = 4294967295;
  for (let d = 0; d < F.length; d++) S = On[(S ^ F[d]) & 255] ^ S >>> 8;
  return (S ^ 4294967295) >>> 0;
}
const ts = (F) => [F & 255, F >>> 8 & 255], ks = (F) => [F & 255, F >>> 8 & 255, F >>> 16 & 255, F >>> 24 & 255];
function Pn(F) {
  const S = [], d = [];
  let _ = 0;
  for (const C of F) {
    const y = qt.encode(C.name), k = Rn(C.data), Bs = C.data.length, ws = new Uint8Array([
      ...ks(67324752),
      ...ts(20),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(33),
      ...ks(k),
      ...ks(Bs),
      ...ks(Bs),
      ...ts(y.length),
      ...ts(0)
    ]);
    S.push(ws, y, C.data), d.push({ name: y, crc: k, size: Bs, offset: _ }), _ += ws.length + y.length + Bs;
  }
  const H = _;
  let G = 0;
  for (const C of d) {
    const y = new Uint8Array([
      ...ks(33639248),
      ...ts(20),
      ...ts(20),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(33),
      ...ks(C.crc),
      ...ks(C.size),
      ...ks(C.size),
      ...ts(C.name.length),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ks(0),
      ...ks(C.offset)
    ]);
    S.push(y, C.name), G += y.length + C.name.length;
  }
  const ls = new Uint8Array([
    ...ks(101010256),
    ...ts(0),
    ...ts(0),
    ...ts(d.length),
    ...ts(d.length),
    ...ks(G),
    ...ks(H),
    ...ts(0)
  ]);
  return S.push(ls), new Blob(S, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
function tl(F) {
  return String(F).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function In(F) {
  let S = "";
  for (F += 1; F > 0; ) {
    const d = (F - 1) % 26;
    S = String.fromCharCode(65 + d) + S, F = Math.floor((F - 1) / 26);
  }
  return S;
}
function Vn(F, S) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${[F, ...S].map((H, G) => {
    const ls = H.map((C, y) => {
      const k = In(y) + (G + 1);
      return G === 0 ? `<c r="${k}" s="1" t="inlineStr"><is><t xml:space="preserve">${tl(C ?? "")}</t></is></c>` : typeof C == "number" && isFinite(C) ? `<c r="${k}" s="2"><v>${C}</v></c>` : `<c r="${k}" t="inlineStr"><is><t xml:space="preserve">${tl(C ?? "")}</t></is></c>`;
    }).join("");
    return `<row r="${G + 1}">${ls}</row>`;
  }).join("")}</sheetData></worksheet>`;
}
const Nn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs></styleSheet>', En = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>', qn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>', Bn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Report" sheetId="1" r:id="rId1"/></sheets></workbook>', An = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
function el(F, S, d) {
  const _ = [
    { name: "[Content_Types].xml", data: qt.encode(En) },
    { name: "_rels/.rels", data: qt.encode(qn) },
    { name: "xl/workbook.xml", data: qt.encode(Bn) },
    { name: "xl/_rels/workbook.xml.rels", data: qt.encode(An) },
    { name: "xl/styles.xml", data: qt.encode(Nn) },
    { name: "xl/worksheets/sheet1.xml", data: qt.encode(Vn(S, d)) }
  ], H = Pn(_), G = URL.createObjectURL(H), ls = document.createElement("a");
  ls.href = G, ls.download = F, ls.click(), URL.revokeObjectURL(G);
}
function $n(F) {
  const S = [];
  let d = [], _ = "", H = !1;
  for (let G = 0; G < F.length; G++) {
    const ls = F[G];
    H ? ls === '"' ? F[G + 1] === '"' ? (_ += '"', G++) : H = !1 : _ += ls : ls === '"' ? H = !0 : ls === "," ? (d.push(_), _ = "") : ls === `
` || ls === "\r" ? (ls === "\r" && F[G + 1] === `
` && G++, d.push(_), S.push(d), d = [], _ = "") : _ += ls;
  }
  return (_ !== "" || d.length) && (d.push(_), S.push(d)), S.filter((G) => !(G.length === 1 && G[0] === "")).map((G) => G.map(Ln));
}
function Ln(F) {
  const S = F.trim();
  return /^-?(0|[1-9]\d{0,2}(,\d{3})+|[1-9]\d*)(\.\d+)?$/.test(S) ? Number(S.replace(/,/g, "")) : F;
}
const Qn = { class: "page-reports" }, Fn = { class: "report-grid" }, Hn = ["onClick"], zn = ["innerHTML"], Wn = { class: "report-card-label" }, Un = { class: "books-card date-range-bar" }, Kn = {
  key: 0,
  class: "books-card report-card bs-card"
}, Gn = { class: "bs-page-head" }, Yn = { class: "bs-page-head-text" }, Jn = { class: "bs-page-head-title" }, Zn = { class: "bs-page-head-sub" }, Xn = { class: "bs-page-head-actions" }, si = {
  key: 0,
  class: "proc-search"
}, ti = ["placeholder"], ei = ["value"], ai = { class: "iws-export-wrap" }, oi = ["disabled"], li = { class: "iws-menu" }, ni = {
  key: 0,
  class: "empty-msg"
}, ii = {
  key: 1,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, di = {
  key: 2,
  class: "empty-msg"
}, ri = {
  key: 3,
  class: "empty-msg"
}, ui = {
  key: 4,
  class: "iws-body"
}, ci = { class: "iws-table-wrap iws-cards-wrap" }, mi = { class: "iws-table iws-cards" }, vi = ["data-label"], _i = {
  key: 5,
  class: "empty-msg"
}, pi = {
  key: 1,
  class: "pl-dash"
}, yi = { class: "pl-dash-header" }, hi = { class: "pl-dash-range" }, bi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, gi = { class: "pl-kpi-grid" }, ki = { class: "pl-kpi c-emerald" }, wi = { class: "pl-kpi-val green" }, fi = {
  key: 0,
  class: "pl-kpi c-pink"
}, xi = { class: "pl-kpi-val red" }, Ci = {
  key: 1,
  class: "pl-kpi c-amber"
}, Si = { class: "pl-kpi c-violet" }, ji = { class: "pl-kpi-val red" }, Mi = {
  key: 2,
  class: "pl-kpi c-blue"
}, Di = {
  key: 0,
  class: "pl-trend-card"
}, Ti = { class: "pl-trend-header" }, Oi = { class: "pl-trend-toggle" }, Ri = { class: "pl-trend-body" }, Pi = { class: "pl-trend-chart-wrap" }, Ii = { class: "pl-trend-yaxis" }, Vi = { class: "pl-trend-chart" }, Ni = { class: "pl-trend-bars" }, Ei = ["title"], qi = ["title"], Bi = { class: "pl-trend-month" }, Ai = { class: "pl-insights" }, $i = { class: "pl-insight-title" }, Li = { class: "pl-insight-desc" }, Qi = {
  key: 2,
  class: "empty-msg"
}, Fi = {
  key: 2,
  class: "books-card report-card bs-card"
}, Hi = { class: "bs-page-head" }, zi = { class: "bs-page-head-actions" }, Wi = { class: "bs-asof" }, Ui = { class: "iws-export-wrap" }, Ki = ["disabled"], Gi = { class: "iws-menu" }, Yi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Ji = { class: "bs-kpi-row" }, Zi = { class: "bs-kpi bs-kpi-assets" }, Xi = { class: "bs-kpi-body" }, sd = { class: "bs-kpi-amount" }, td = { class: "bs-kpi bs-kpi-liabilities" }, ed = { class: "bs-kpi-body" }, ad = { class: "bs-kpi-amount" }, od = { class: "bs-kpi bs-kpi-equity" }, ld = { class: "bs-kpi-body" }, nd = { class: "bs-kpi-amount" }, id = { class: "bs-sum-status-icon" }, dd = { class: "bs-sum-status-body" }, rd = { class: "bs-sum-status-title" }, ud = { class: "bs-sum-status-eq" }, cd = { class: "bs-acc" }, md = ["onClick"], vd = ["innerHTML"], _d = { class: "bs-acc-head-text" }, pd = { class: "bs-acc-label" }, yd = { class: "bs-acc-desc" }, hd = { class: "bs-acc-amount" }, bd = {
  key: 0,
  class: "bs-acc-items"
}, gd = ["innerHTML"], kd = { class: "bs-acc-item-text" }, wd = { class: "bs-acc-item-label" }, fd = {
  key: 0,
  class: "bs-acc-item-desc"
}, xd = { class: "bs-acc-item-amount" }, Cd = {
  key: 2,
  class: "empty-msg"
}, Sd = {
  key: 3,
  class: "books-card report-card bs-card"
}, jd = { class: "bs-page-head" }, Md = { class: "bs-page-head-actions" }, Dd = { class: "bs-asof" }, Td = { class: "iws-export-wrap" }, Od = ["disabled"], Rd = { class: "iws-menu" }, Pd = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Id = {
  key: 1,
  class: "cf-grid"
}, Vd = { class: "cf-acc" }, Nd = { class: "cf-acc-row cf-row-operating" }, Ed = { class: "cf-acc-row cf-row-investing" }, qd = { class: "cf-acc-row cf-row-financing" }, Bd = { class: "cf-acc-row cf-row-net" }, Ad = { class: "cf-acc-text" }, $d = { class: "cf-acc-desc" }, Ld = { class: "cf-flow-row" }, Qd = { class: "cf-flow-row" }, Fd = { class: "cf-side" }, Hd = { class: "cf-trend-box" }, zd = {
  key: 0,
  class: "cf-trend-chart"
}, Wd = ["title"], Ud = ["title"], Kd = ["title"], Gd = { class: "cf-trend-month" }, Yd = {
  key: 1,
  class: "empty-msg",
  style: { padding: "20px 0" }
}, Jd = { class: "cf-summary-box" }, Zd = { class: "cf-summary-text" }, Xd = {
  key: 2,
  class: "empty-msg"
}, sr = {
  key: 4,
  class: "books-card report-card bs-card"
}, tr = { class: "bs-page-head" }, er = { class: "bs-page-head-actions" }, ar = { class: "bs-asof" }, or = { class: "iws-export-wrap" }, lr = ["disabled"], nr = { class: "iws-menu" }, ir = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "80px", "border-radius": "8px" }
}, dr = {
  key: 1,
  class: "gst-cards"
}, rr = { class: "gst-card-head" }, ur = { class: "gst-card-title" }, cr = { class: "gst-card-desc" }, mr = { class: "gst-card-stats" }, vr = { class: "gst-stat-value" }, _r = { class: "gst-stat-value" }, pr = { class: "gst-card gst-c-total" }, yr = { class: "gst-card-stats" }, hr = { class: "gst-stat-value" }, br = { class: "gst-stat-value" }, gr = {
  key: 2,
  class: "empty-msg"
}, kr = {
  key: 5,
  class: "books-card report-card bs-card"
}, wr = { class: "bs-page-head" }, fr = { class: "bs-page-head-actions" }, xr = { class: "bs-asof" }, Cr = { class: "iws-export-wrap" }, Sr = ["disabled"], jr = { class: "iws-menu" }, Mr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Dr = {
  key: 1,
  class: "iws-body"
}, Tr = { class: "iws-total-panel iws-total-panel-neg" }, Or = { class: "iws-total-meta" }, Rr = {
  key: 0,
  class: "iws-total-sub"
}, Pr = { class: "iws-total-sub-value" }, Ir = { class: "iws-table-wrap" }, Vr = { class: "iws-table" }, Nr = { class: "iws-idx" }, Er = { class: "iws-item-name" }, qr = { class: "ta-r mono-sm" }, Br = { class: "ta-r mono-sm fw-700 text-danger" }, Ar = { class: "iws-kebab-col" }, $r = { class: "iws-kebab-wrap" }, Lr = ["onClick"], Qr = { class: "iws-menu iws-menu-row" }, Fr = ["onClick"], Hr = ["onClick"], zr = { class: "iws-total-row" }, Wr = { class: "ta-r fw-700" }, Ur = { class: "ta-r fw-700" }, Kr = { class: "ta-r fw-700" }, Gr = { class: "ta-r fw-700" }, Yr = { class: "ta-r fw-700 text-danger" }, Jr = { class: "ta-r fw-700 text-danger" }, Zr = {
  key: 2,
  class: "empty-msg"
}, Xr = {
  key: 6,
  class: "books-card report-card bs-card"
}, su = { class: "bs-page-head" }, tu = { class: "bs-page-head-actions" }, eu = { class: "bs-asof" }, au = { class: "iws-export-wrap" }, ou = ["disabled"], lu = { class: "iws-menu" }, nu = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, iu = {
  key: 1,
  class: "iws-body"
}, du = { class: "iws-total-panel iws-total-panel-neg" }, ru = { class: "iws-total-meta" }, uu = {
  key: 0,
  class: "iws-total-sub"
}, cu = { class: "iws-total-sub-value" }, mu = { class: "iws-table-wrap" }, vu = { class: "iws-table" }, _u = { class: "iws-idx" }, pu = { class: "iws-item-name" }, yu = { class: "ta-r mono-sm" }, hu = { class: "ta-r mono-sm fw-700 text-danger" }, bu = { class: "iws-kebab-col" }, gu = { class: "iws-kebab-wrap" }, ku = ["onClick"], wu = { class: "iws-menu iws-menu-row" }, fu = ["onClick"], xu = ["onClick"], Cu = { class: "iws-total-row" }, Su = { class: "ta-r fw-700" }, ju = { class: "ta-r fw-700" }, Mu = { class: "ta-r fw-700" }, Du = { class: "ta-r fw-700" }, Tu = { class: "ta-r fw-700 text-danger" }, Ou = { class: "ta-r fw-700 text-danger" }, Ru = {
  key: 2,
  class: "empty-msg"
}, Pu = {
  key: 7,
  class: "books-card report-card bs-card"
}, Iu = { class: "bs-page-head" }, Vu = { class: "bs-page-head-actions" }, Nu = { class: "bs-asof" }, Eu = { class: "iws-export-wrap" }, qu = ["disabled"], Bu = { class: "iws-menu" }, Au = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, $u = {
  key: 1,
  class: "iws-body"
}, Lu = { class: "iws-total-panel" }, Qu = { class: "iws-total-meta" }, Fu = { class: "iws-table-wrap" }, Hu = { class: "iws-table" }, zu = { class: "iws-idx" }, Wu = { class: "iws-item-name" }, Uu = { class: "iws-uom" }, Ku = { class: "ta-r mono-sm" }, Gu = { class: "ta-r mono-sm" }, Yu = { class: "ta-r mono-sm" }, Ju = { class: "ta-r mono-sm red" }, Zu = { class: "ta-r mono-sm fw-700 green" }, Xu = { class: "iws-kebab-col" }, sc = { class: "iws-kebab-wrap" }, tc = ["onClick"], ec = { class: "iws-menu iws-menu-row" }, ac = ["onClick"], oc = ["onClick"], lc = { class: "iws-total-row" }, nc = { class: "ta-r fw-700" }, ic = { class: "ta-r fw-700" }, dc = { class: "ta-r fw-700 red" }, rc = { class: "ta-r fw-700 green" }, uc = {
  key: 2,
  class: "empty-msg"
}, cc = {
  key: 8,
  class: "books-card report-card bs-card"
}, mc = { class: "bs-page-head" }, vc = { class: "bs-page-head-actions" }, _c = { class: "bs-asof" }, pc = { class: "iws-export-wrap" }, yc = ["disabled"], hc = { class: "iws-menu" }, bc = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, gc = {
  key: 1,
  class: "iws-body"
}, kc = { class: "iws-total-panel" }, wc = { class: "iws-total-meta" }, fc = {
  key: 0,
  class: "iws-total-sub"
}, xc = { class: "iws-total-sub-value" }, Cc = { class: "iws-table-wrap" }, Sc = { class: "iws-table" }, jc = { class: "iws-idx" }, Mc = { class: "iws-item-name" }, Dc = { class: "ta-r mono-sm" }, Tc = { class: "ta-r mono-sm" }, Oc = { class: "ta-r mono-sm red" }, Rc = { class: "ta-r mono-sm" }, Pc = { class: "ta-r mono-sm" }, Ic = { class: "ta-r mono-sm fw-700 green" }, Vc = { class: "iws-kebab-col" }, Nc = { class: "iws-kebab-wrap" }, Ec = ["onClick"], qc = { class: "iws-menu iws-menu-row" }, Bc = ["onClick"], Ac = ["onClick"], $c = { class: "iws-total-row" }, Lc = { class: "ta-r fw-700" }, Qc = { class: "ta-r fw-700" }, Fc = { class: "ta-r fw-700 red" }, Hc = { class: "ta-r fw-700" }, zc = { class: "ta-r fw-700 red" }, Wc = { class: "ta-r fw-700 green" }, Uc = {
  key: 2,
  class: "empty-msg"
}, Kc = {
  key: 9,
  class: "books-card report-card bs-card"
}, Gc = { class: "bs-page-head" }, Yc = { class: "bs-page-head-actions" }, Jc = { class: "bs-asof" }, Zc = { class: "iws-export-wrap" }, Xc = ["disabled"], sm = { class: "iws-menu" }, tm = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, em = { class: "iws-body" }, am = { class: "iws-total-meta" }, om = {
  key: 0,
  class: "iws-total-sub"
}, lm = { class: "iws-total-sub-value" }, nm = { class: "iws-table-wrap" }, im = { class: "iws-table" }, dm = { class: "iws-idx" }, rm = { class: "iws-item-name" }, um = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "No valuation or standard buying rate found for this item — margin below is not meaningful"
}, cm = { class: "ta-r mono-sm" }, mm = { class: "ta-r mono-sm" }, vm = { class: "ta-r mono-sm" }, _m = { class: "ta-r mono-sm red" }, pm = { class: "iws-kebab-col" }, ym = { class: "iws-kebab-wrap" }, hm = ["onClick"], bm = { class: "iws-menu iws-menu-row" }, gm = ["onClick"], km = ["onClick"], wm = { class: "iws-total-row" }, fm = { class: "ta-r fw-700" }, xm = { class: "ta-r fw-700" }, Cm = { class: "ta-r fw-700 red" }, Sm = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-top": "10px" }
}, jm = {
  key: 2,
  class: "empty-msg"
}, Mm = {
  key: 10,
  class: "books-card report-card bs-card"
}, Dm = { class: "bs-page-head" }, Tm = { class: "bs-page-head-actions" }, Om = { class: "bs-asof" }, Rm = { class: "iws-export-wrap" }, Pm = ["disabled"], Im = { class: "iws-menu" }, Vm = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Nm = {
  key: 1,
  class: "iws-body"
}, Em = { class: "iws-total-meta" }, qm = {
  key: 0,
  class: "iws-total-sub"
}, Bm = { class: "iws-total-sub-label" }, Am = { style: { "font-size": "11px", color: "var(--text-3)", "margin-top": "4px" } }, $m = { class: "iws-table-wrap" }, Lm = { class: "iws-table" }, Qm = { class: "iws-idx" }, Fm = ["checked"], Hm = { class: "iws-idx" }, zm = ["checked", "onChange"], Wm = { class: "mono-sm" }, Um = ["onClick"], Km = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "One or more items on this invoice have no valuation or standard buying rate — cost/margin is understated"
}, Gm = { class: "mono-sm" }, Ym = { class: "iws-item-name" }, Jm = { class: "ta-r mono-sm" }, Zm = { class: "ta-r mono-sm red" }, Xm = { class: "iws-kebab-col" }, sv = { class: "iws-kebab-wrap" }, tv = ["onClick"], ev = { class: "iws-menu iws-menu-row" }, av = ["onClick"], ov = ["onClick"], lv = ["onClick"], nv = { class: "iws-total-row" }, iv = { class: "ta-r fw-700" }, dv = { class: "ta-r fw-700 red" }, rv = {
  key: 2,
  class: "empty-msg"
}, uv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "180px", "border-radius": "8px" }
}, cv = { style: { display: "flex", "flex-wrap": "wrap", gap: "16px", "font-size": "12.5px", color: "#868E96", "margin-bottom": "14px" } }, mv = { style: { color: "#212529" } }, vv = { style: { color: "#212529" } }, _v = { style: { color: "#212529" } }, pv = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" }
}, yv = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, hv = { class: "ta-r mono-sm" }, bv = { class: "ta-r mono-sm" }, gv = { class: "ta-r mono-sm" }, kv = { class: "ta-r mono-sm" }, wv = { class: "ta-r mono-sm red" }, fv = { class: "aging-totals-row" }, xv = { class: "ta-r fw-700" }, Cv = { class: "ta-r fw-700 red" }, Sv = {
  key: 2,
  class: "empty-msg"
}, jv = {
  key: 11,
  class: "books-card report-card bs-card"
}, Mv = { class: "bs-page-head" }, Dv = { class: "bs-page-head-actions" }, Tv = { class: "bs-asof" }, Ov = { class: "iws-export-wrap" }, Rv = ["disabled"], Pv = { class: "iws-menu" }, Iv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Vv = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(2, 1fr)", "margin-bottom": "14px" }
}, Nv = { class: "bs-kpi bs-kpi-assets" }, Ev = { class: "bs-kpi-body" }, qv = { class: "bs-kpi-amount" }, Bv = { class: "bs-kpi bs-kpi-liabilities" }, Av = { class: "bs-kpi-body" }, $v = { class: "bs-kpi-amount" }, Lv = { class: "bs-sum-status-icon" }, Qv = { class: "bs-sum-status-body" }, Fv = { class: "bs-sum-status-title" }, Hv = { class: "bs-sum-status-eq" }, zv = {
  class: "iws-table-wrap",
  style: { "margin-top": "14px" }
}, Wv = { class: "iws-table" }, Uv = { class: "iws-idx" }, Kv = { class: "iws-item-name" }, Gv = {
  class: "iws-uom",
  style: { background: "#f1f5f9", color: "#475569" }
}, Yv = { class: "ta-r mono-sm green" }, Jv = { class: "ta-r mono-sm red" }, Zv = { class: "iws-kebab-col" }, Xv = { class: "iws-kebab-wrap" }, s1 = ["onClick"], t1 = { class: "iws-menu iws-menu-row" }, e1 = ["onClick"], a1 = ["onClick"], o1 = { class: "iws-total-row" }, l1 = { class: "ta-r fw-700" }, n1 = { class: "ta-r fw-700 green" }, i1 = { class: "ta-r fw-700 red" }, d1 = { class: "ta-r fw-700" }, r1 = {
  key: 2,
  class: "empty-msg"
}, u1 = {
  key: 12,
  class: "books-card report-card bs-card"
}, c1 = { class: "bs-page-head" }, m1 = { class: "bs-page-head-actions" }, v1 = { class: "bs-asof" }, _1 = { class: "iws-export-wrap" }, p1 = ["disabled"], y1 = { class: "iws-menu" }, h1 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, b1 = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(3, 1fr)", "margin-bottom": "14px" }
}, g1 = { class: "bs-kpi bs-kpi-assets" }, k1 = { class: "bs-kpi-body" }, w1 = { class: "bs-kpi-amount" }, f1 = { class: "bs-kpi bs-kpi-equity" }, x1 = { class: "bs-kpi-body" }, C1 = { class: "bs-kpi-amount" }, S1 = { class: "bs-kpi-body" }, j1 = { class: "bs-sum-status-icon" }, M1 = { class: "bs-sum-status-body" }, D1 = { class: "bs-sum-status-title" }, T1 = { class: "bs-sum-status-eq" }, O1 = {
  key: 0,
  class: "sgl-grir-note"
}, R1 = { class: "mono-sm fw-600" }, P1 = {
  class: "iws-table-wrap",
  style: { "margin-bottom": "20px" }
}, I1 = { class: "iws-table" }, V1 = { class: "iws-idx" }, N1 = { class: "iws-item-name" }, E1 = { class: "ta-r mono-sm" }, q1 = { class: "ta-r mono-sm" }, B1 = { class: "iws-kebab-col" }, A1 = { class: "iws-kebab-wrap" }, $1 = ["onClick"], L1 = { class: "iws-menu iws-menu-row" }, Q1 = ["onClick"], F1 = { class: "iws-table-wrap" }, H1 = { class: "iws-table" }, z1 = { class: "iws-idx" }, W1 = { class: "iws-item-name" }, U1 = { class: "iws-uom" }, K1 = { class: "ta-r mono-sm" }, G1 = { class: "ta-r mono-sm" }, Y1 = { class: "ta-r mono-sm fw-700 green" }, J1 = { class: "iws-kebab-col" }, Z1 = { class: "iws-kebab-wrap" }, X1 = ["onClick"], s_ = { class: "iws-menu iws-menu-row" }, t_ = ["onClick"], e_ = ["onClick"], a_ = { class: "iws-total-row" }, o_ = { class: "ta-r fw-700 green" }, l_ = {
  key: 2,
  class: "empty-msg"
}, n_ = {
  key: 13,
  class: "books-card report-card bs-card"
}, i_ = { class: "bs-page-head" }, d_ = { class: "bs-page-head-actions" }, r_ = { class: "bs-asof" }, u_ = { class: "iws-export-wrap" }, c_ = ["disabled"], m_ = { class: "iws-menu" }, v_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, __ = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "1fr", "margin-bottom": "14px" }
}, p_ = { class: "bs-kpi bs-kpi-assets" }, y_ = { class: "bs-kpi-body" }, h_ = { class: "bs-kpi-amount" }, b_ = { class: "iws-table-wrap" }, g_ = { class: "iws-table" }, k_ = { class: "iws-idx" }, w_ = { class: "iws-item-name" }, f_ = { class: "ta-r mono-sm fw-700 green" }, x_ = { class: "ta-r mono-sm" }, C_ = { class: "iws-total-row" }, S_ = { class: "ta-r fw-700 green" }, j_ = {
  key: 1,
  class: "empty-msg"
}, M_ = {
  key: 2,
  class: "empty-msg"
}, D_ = {
  key: 14,
  class: "books-card report-card bs-card"
}, T_ = { class: "bs-page-head" }, O_ = { class: "bs-page-head-actions" }, R_ = { class: "iws-export-wrap" }, P_ = ["disabled"], I_ = { class: "iws-menu" }, V_ = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap", "margin-bottom": "12px" } }, N_ = ["value"], E_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, q_ = {
  key: 1,
  class: "iws-table-wrap"
}, B_ = { class: "iws-table" }, A_ = { class: "iws-idx" }, $_ = { class: "iws-item-name" }, L_ = {
  class: "mono-sm",
  style: { opacity: ".65" }
}, Q_ = { class: "ta-r mono-sm" }, F_ = { class: "ta-r mono-sm fw-700 green" }, H_ = { class: "ta-r mono-sm fw-700" }, z_ = {
  key: 2,
  class: "empty-msg"
}, W_ = {
  key: 15,
  class: "books-card report-card bs-card"
}, U_ = { class: "bs-page-head" }, K_ = { class: "bs-page-head-actions" }, G_ = { class: "bs-asof" }, Y_ = { class: "iws-export-wrap" }, J_ = ["disabled"], Z_ = { class: "iws-menu" }, X_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, sp = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "18px" }
}, tp = { class: "mis-summary-card" }, ep = { class: "mis-summary-val" }, ap = { class: "mis-summary-card" }, op = { class: "mis-summary-val green" }, lp = { class: "mis-summary-card" }, np = { class: "mis-summary-val" }, ip = { class: "mis-summary-card" }, dp = { class: "mis-summary-val red" }, rp = { class: "mis-summary-card" }, up = { class: "mis-summary-val" }, cp = { class: "mis-summary-card" }, mp = { class: "mis-summary-val" }, vp = { class: "mis-summary-card" }, _p = { class: "mis-summary-val" }, pp = { class: "mis-summary-card" }, yp = { class: "iws-table-wrap" }, hp = { class: "iws-table" }, bp = { class: "iws-item-name" }, gp = { class: "ta-r mono-sm" }, kp = { class: "ta-r mono-sm green" }, wp = { class: "ta-r mono-sm" }, fp = { class: "ta-r mono-sm red" }, xp = { class: "ta-r mono-sm" }, Cp = { class: "ta-r mono-sm" }, Sp = { class: "ta-r mono-sm" }, jp = { class: "ta-r mono-sm" }, Mp = { class: "ta-r mono-sm fw-600" }, Dp = { class: "iws-total-row" }, Tp = { class: "ta-r fw-700" }, Op = { class: "ta-r fw-700 green" }, Rp = { class: "ta-r fw-700" }, Pp = { class: "ta-r fw-700 red" }, Ip = { class: "ta-r fw-700" }, Vp = { class: "ta-r fw-700" }, Np = { class: "ta-r fw-700" }, Ep = { class: "ta-r fw-700" }, qp = { class: "ta-r fw-700" }, Bp = {
  key: 1,
  class: "empty-msg"
}, Ap = {
  key: 2,
  class: "empty-msg"
}, $p = {
  key: 16,
  class: "books-card report-card bs-card"
}, Lp = { class: "bs-page-head" }, Qp = { class: "bs-page-head-actions" }, Fp = { class: "bs-asof" }, Hp = { class: "iws-export-wrap" }, zp = ["disabled"], Wp = { class: "iws-menu" }, Up = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Kp = ["onClick"], Gp = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Yp = {
  key: 0,
  class: "mis-summary-grid"
}, Jp = { class: "mis-summary-card" }, Zp = { class: "mis-summary-val" }, Xp = { class: "mis-summary-card" }, s2 = { class: "mis-summary-val" }, t2 = { class: "mis-summary-card" }, e2 = { class: "mis-summary-val" }, a2 = { class: "mis-summary-card" }, o2 = { class: "mis-summary-val red" }, l2 = { class: "mis-summary-card" }, n2 = { class: "mis-summary-val green" }, i2 = { class: "mis-summary-card" }, d2 = { class: "mis-summary-val" }, r2 = { class: "mis-summary-card" }, u2 = { class: "mis-summary-val" }, c2 = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, m2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, v2 = { class: "mis-summary-card" }, _2 = { class: "mis-summary-val" }, p2 = { class: "mis-summary-card" }, y2 = { class: "mis-summary-val green" }, h2 = { class: "mis-summary-card" }, b2 = { class: "mono" }, g2 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, k2 = { class: "ta-r mono-sm" }, w2 = { class: "ta-r mono-sm" }, f2 = { class: "ta-r mono-sm red" }, x2 = { class: "ta-r mono-sm fw-600" }, C2 = {
  key: 3,
  class: "books-table aging-table",
  style: { width: "100%" }
}, S2 = { class: "ta-r mono-sm" }, j2 = { class: "ta-r mono-sm fw-600" }, M2 = { class: "ta-r mono-sm" }, D2 = {
  key: 4,
  class: "books-table aging-table",
  style: { width: "100%" }
}, T2 = { class: "ta-r mono-sm" }, O2 = { class: "ta-r mono-sm fw-600" }, R2 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, P2 = { class: "ta-r mono-sm" }, I2 = { class: "ta-r mono-sm fw-600" }, V2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, N2 = { class: "mis-summary-card" }, E2 = { class: "mis-summary-val" }, q2 = { class: "mis-summary-card" }, B2 = { class: "mis-summary-val red" }, A2 = { class: "mis-summary-card" }, $2 = { class: "mis-summary-val" }, L2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Q2 = { class: "ta-r mono-sm red" }, F2 = {
  key: 1,
  class: "empty-msg"
}, H2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, z2 = { class: "mis-summary-card" }, W2 = { class: "mis-summary-val red" }, U2 = { class: "mis-summary-card" }, K2 = { class: "mis-summary-val red" }, G2 = { class: "mis-summary-card" }, Y2 = { class: "mis-summary-val" }, J2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, Z2 = { class: "ta-r mono-sm red" }, X2 = { class: "ta-r mono-sm red" }, sy = { class: "ta-r mono-sm" }, ty = {
  key: 1,
  class: "empty-msg"
}, ey = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ay = { class: "ta-r mono-sm red" }, oy = { class: "ta-r mono-sm" }, ly = {
  key: 3,
  class: "empty-msg"
}, ny = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, iy = { class: "mis-summary-card" }, dy = { class: "mis-summary-val" }, ry = { class: "mis-summary-card" }, uy = { class: "mis-summary-val red" }, cy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, my = { class: "badge badge-blue" }, vy = { class: "ta-r mono-sm" }, _y = { class: "ta-r mono-sm green" }, py = { class: "ta-r mono-sm red fw-600" }, yy = {
  key: 1,
  class: "empty-msg"
}, hy = { class: "mis-summary-grid" }, by = { class: "mis-summary-card" }, gy = { class: "mis-summary-val" }, ky = { class: "mis-summary-card" }, wy = { class: "mis-summary-val green" }, fy = { class: "mis-summary-card" }, xy = { class: "mis-summary-card" }, Cy = { class: "mis-summary-val" }, Sy = { class: "mis-summary-card" }, jy = { class: "mis-summary-val green" }, My = { class: "mis-summary-card" }, Dy = { class: "mis-summary-val" }, Ty = {
  key: 2,
  class: "empty-msg"
}, Oy = {
  key: 17,
  class: "books-card report-card bs-card"
}, Ry = { class: "bs-page-head" }, Py = { class: "bs-page-head-actions" }, Iy = { class: "bs-asof" }, Vy = { class: "iws-export-wrap" }, Ny = ["disabled"], Ey = { class: "iws-menu" }, qy = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, By = ["onClick"], Ay = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, $y = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Ly = { class: "mono" }, Qy = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(4,1fr)" }
}, Fy = { class: "mis-summary-card" }, Hy = { class: "mis-summary-val" }, zy = { class: "mis-summary-card" }, Wy = { class: "mis-summary-val" }, Uy = { class: "mis-summary-card" }, Ky = { class: "mis-summary-val red" }, Gy = { class: "mis-summary-card" }, Yy = { class: "mis-summary-val green" }, Jy = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Zy = { class: "mono" }, Xy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, s0 = { class: "ta-r mono-sm" }, t0 = { class: "ta-r mono-sm fw-600" }, e0 = {
  key: 1,
  class: "empty-msg"
}, a0 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, o0 = { class: "aging-bucket" }, l0 = { class: "bucket-val mono-sm" }, n0 = { class: "aging-bucket" }, i0 = { class: "bucket-val mono-sm" }, d0 = { class: "aging-bucket" }, r0 = { class: "bucket-val mono-sm" }, u0 = { class: "aging-bucket" }, c0 = { class: "bucket-val mono-sm red" }, m0 = { class: "aging-bucket" }, v0 = { class: "bucket-val mono-sm fw-700" }, _0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, p0 = { class: "ta-r mono-sm" }, y0 = { class: "ta-r mono-sm" }, h0 = { class: "ta-r mono-sm" }, b0 = { class: "ta-r mono-sm red" }, g0 = { class: "ta-r mono-sm fw-600" }, k0 = {
  key: 1,
  class: "empty-msg"
}, w0 = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, f0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, x0 = { class: "mis-summary-card" }, C0 = { class: "mis-summary-val" }, S0 = { class: "mis-summary-card" }, j0 = { class: "mis-summary-val green" }, M0 = { class: "mis-summary-card" }, D0 = { class: "mono" }, T0 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, O0 = { class: "mono" }, R0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, P0 = { class: "ta-r mono-sm" }, I0 = { class: "ta-r mono-sm green" }, V0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, N0 = { class: "mis-summary-card" }, E0 = { class: "mis-summary-val" }, q0 = { class: "mis-summary-card" }, B0 = { class: "mis-summary-val red" }, A0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $0 = { class: "ta-r mono-sm red fw-600" }, L0 = { class: "ta-r mono-sm" }, Q0 = {
  key: 1,
  class: "empty-msg"
}, F0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, H0 = { class: "ta-r mono-sm" }, z0 = { class: "ta-r mono-sm" }, W0 = {
  key: 1,
  class: "empty-msg"
}, U0 = { class: "mis-summary-grid" }, K0 = { class: "mis-summary-card" }, G0 = { class: "mis-summary-val" }, Y0 = { class: "mis-summary-card" }, J0 = { class: "mis-summary-val" }, Z0 = { class: "mis-summary-card" }, X0 = { class: "mis-summary-val" }, sh = { class: "mis-summary-card" }, th = { class: "mis-summary-val green" }, eh = { class: "mis-summary-card" }, ah = { class: "mis-summary-val red" }, oh = { class: "mis-summary-card" }, lh = {
  key: 2,
  class: "empty-msg"
}, nh = {
  key: 18,
  class: "books-card report-card bs-card"
}, ih = { class: "bs-page-head" }, dh = { class: "bs-page-head-actions" }, rh = { class: "bs-asof" }, uh = { class: "iws-export-wrap" }, ch = ["disabled"], mh = { class: "iws-menu" }, vh = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, _h = ["onClick"], ph = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, yh = {
  key: 0,
  class: "mis-summary-grid"
}, hh = { class: "mis-summary-card" }, bh = { class: "mis-summary-val" }, gh = { class: "mis-summary-card" }, kh = { class: "mis-summary-val" }, wh = { class: "mis-summary-card" }, fh = { class: "mis-summary-val" }, xh = { class: "mis-summary-card" }, Ch = { class: "mis-summary-val green" }, Sh = { class: "mis-summary-card" }, jh = { class: "mis-summary-val red" }, Mh = { class: "mis-summary-card" }, Dh = { class: "mis-summary-val" }, Th = { class: "mis-summary-card" }, Oh = { class: "mis-summary-val" }, Rh = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ph = { class: "ta-r mono-sm" }, Ih = { class: "ta-r mono-sm fw-600" }, Vh = { class: "ta-r mono-sm" }, Nh = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Eh = { class: "ta-r mono-sm" }, qh = { class: "ta-r mono-sm" }, Bh = { class: "ta-r mono-sm" }, Ah = { class: "ta-r mono-sm fw-600" }, $h = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, Lh = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, Qh = { class: "mis-summary-card" }, Fh = { class: "mis-summary-val" }, Hh = { class: "mis-summary-card" }, zh = { class: "mis-summary-val red" }, Wh = { class: "mis-summary-card" }, Uh = { class: "mono" }, Kh = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Gh = { key: 0 }, Yh = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Jh = { class: "ta-r mono-sm" }, Zh = { class: "ta-r mono-sm" }, Xh = { class: "ta-r mono-sm" }, sb = {
  key: 1,
  class: "empty-msg"
}, tb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, eb = { class: "mis-summary-card" }, ab = { class: "mis-summary-val" }, ob = { class: "mis-summary-card" }, lb = { class: "mis-summary-val red" }, nb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ib = { class: "badge badge-blue" }, db = { class: "ta-r mono-sm" }, rb = { class: "ta-r mono-sm" }, ub = { class: "ta-r mono-sm red fw-600" }, cb = {
  key: 1,
  class: "empty-msg"
}, mb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, vb = { class: "mis-summary-card" }, _b = { class: "mis-summary-val" }, pb = { class: "mis-summary-card" }, yb = { class: "mis-summary-val red" }, hb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bb = { class: "badge badge-blue" }, gb = { class: "ta-r mono-sm" }, kb = { class: "ta-r mono-sm" }, wb = { class: "ta-r mono-sm red fw-600" }, fb = {
  key: 1,
  class: "empty-msg"
}, xb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Cb = { class: "mis-summary-card" }, Sb = { class: "mis-summary-val" }, jb = { class: "mis-summary-card" }, Mb = { class: "mis-summary-val green" }, Db = { class: "mis-summary-card" }, Tb = { class: "mis-summary-val" }, Ob = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Rb = { class: "ta-r mono-sm fw-600" }, Pb = {
  key: 1,
  class: "empty-msg"
}, Ib = {
  key: 2,
  class: "empty-msg"
}, Vb = {
  key: 19,
  class: "books-card report-card bs-card"
}, Nb = { class: "bs-page-head" }, Eb = { class: "bs-page-head-actions" }, qb = { class: "bs-asof" }, Bb = { class: "iws-export-wrap" }, Ab = ["disabled"], $b = { class: "iws-menu" }, Lb = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Qb = ["onClick"], Fb = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Hb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, zb = { class: "mis-summary-card" }, Wb = { class: "mis-summary-val" }, Ub = { class: "mis-summary-card" }, Kb = { class: "mis-summary-val green" }, Gb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Yb = { class: "ta-r mono-sm" }, Jb = { class: "ta-r mono-sm" }, Zb = { class: "ta-r mono-sm fw-600" }, Xb = {
  key: 1,
  class: "empty-msg"
}, sg = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, tg = { class: "mono" }, eg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ag = { class: "ta-r mono-sm" }, og = { class: "ta-r mono-sm" }, lg = { class: "ta-r mono-sm fw-600" }, ng = {
  key: 1,
  class: "empty-msg"
}, ig = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, dg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, rg = { class: "ta-r mono-sm fw-600 green" }, ug = { class: "ta-r mono-sm" }, cg = { class: "ta-r mono-sm" }, mg = {
  key: 1,
  class: "empty-msg"
}, vg = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, _g = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, pg = { class: "ta-r mono-sm" }, yg = { class: "ta-r mono-sm" }, hg = { class: "ta-r mono-sm red" }, bg = {
  key: 1,
  class: "empty-msg"
}, gg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, kg = { class: "mis-summary-card" }, wg = { class: "mis-summary-val" }, fg = { class: "mis-summary-card" }, xg = { class: "mis-summary-val red" }, Cg = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Sg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jg = { class: "ta-r mono-sm" }, Mg = { class: "ta-r mono-sm fw-600" }, Dg = { class: "ta-r mono-sm red" }, Tg = {
  key: 1,
  class: "empty-msg"
}, Og = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Rg = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, Pg = { class: "aging-bucket" }, Ig = { class: "bucket-val mono-sm" }, Vg = { class: "aging-bucket" }, Ng = { class: "bucket-val mono-sm" }, Eg = { class: "aging-bucket" }, qg = { class: "bucket-val mono-sm" }, Bg = { class: "aging-bucket" }, Ag = { class: "bucket-val mono-sm red" }, $g = { class: "aging-bucket" }, Lg = { class: "bucket-val mono-sm fw-700" }, Qg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Fg = { class: "ta-r mono-sm" }, Hg = { class: "ta-r mono-sm" }, zg = {
  key: 1,
  class: "empty-msg"
}, Wg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, Ug = { class: "mis-summary-card" }, Kg = { class: "mis-summary-val red" }, Gg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Yg = { class: "ta-r mono-sm red fw-600" }, Jg = { class: "ta-r mono-sm" }, Zg = { class: "ta-r mono-sm" }, Xg = { class: "ta-r mono-sm" }, sk = {
  key: 1,
  class: "empty-msg"
}, tk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, ek = { class: "mis-summary-card" }, ak = { class: "mis-summary-val red" }, ok = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, lk = { class: "ta-r mono-sm" }, nk = { class: "ta-r mono-sm" }, ik = { class: "ta-r mono-sm red" }, dk = { class: "ta-r mono-sm" }, rk = { class: "ta-r mono-sm fw-600" }, uk = {
  key: 1,
  class: "empty-msg"
}, ck = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, mk = { class: "mis-summary-card" }, vk = { class: "mis-summary-val" }, _k = { class: "mis-summary-card" }, pk = { class: "mis-summary-val green" }, yk = { class: "mis-summary-card" }, hk = { class: "mis-summary-val red" }, bk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, gk = {
  key: 1,
  class: "empty-msg"
}, kk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, wk = { class: "mis-summary-card" }, fk = { class: "mis-summary-val" }, xk = { class: "mis-summary-card" }, Ck = { class: "mis-summary-val red" }, Sk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jk = { class: "ta-r mono-sm red fw-600" }, Mk = { class: "ta-r mono-sm red" }, Dk = {
  key: 1,
  class: "empty-msg"
}, Tk = {
  key: 2,
  class: "empty-msg"
}, Ok = {
  key: 20,
  class: "books-card report-card bs-card"
}, Rk = { class: "bs-page-head" }, Pk = { class: "bs-page-head-actions" }, Ik = { class: "bs-asof" }, Vk = { class: "iws-export-wrap" }, Nk = ["disabled"], Ek = { class: "iws-menu" }, qk = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Bk = ["onClick"], Ak = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, $k = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Lk = { class: "mis-summary-card" }, Qk = { class: "mis-summary-val" }, Fk = { class: "mis-summary-card" }, Hk = { class: "mis-summary-val green" }, zk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Wk = { class: "ta-r mono-sm" }, Uk = { class: "ta-r mono-sm" }, Kk = { class: "ta-r mono-sm" }, Gk = {
  key: 1,
  class: "empty-msg"
}, Yk = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Jk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Zk = { class: "mis-summary-card" }, Xk = { class: "mis-summary-val red" }, s4 = { class: "mis-summary-card" }, t4 = { class: "mis-summary-val red" }, e4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a4 = { class: "ta-r mono-sm" }, o4 = { class: "ta-r mono-sm" }, l4 = { class: "ta-r mono-sm fw-600 red" }, n4 = {
  key: 1,
  class: "empty-msg"
}, i4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, d4 = { class: "mis-summary-card" }, r4 = { class: "mis-summary-val" }, u4 = { class: "mis-summary-card" }, c4 = { class: "mis-summary-val" }, m4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, v4 = { class: "ta-r mono-sm" }, _4 = { class: "ta-r mono-sm" }, p4 = { class: "ta-r mono-sm" }, y4 = { class: "ta-r mono-sm" }, h4 = {
  key: 1,
  class: "empty-msg"
}, b4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, g4 = { class: "mis-summary-card" }, k4 = { class: "mis-summary-val red" }, w4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, f4 = { class: "ta-r mono-sm" }, x4 = { class: "ta-r mono-sm" }, C4 = { class: "ta-r mono-sm fw-600 red" }, S4 = {
  key: 1,
  class: "empty-msg"
}, j4 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, M4 = { class: "mono" }, D4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, T4 = { class: "ta-r mono-sm" }, O4 = { class: "ta-r mono-sm" }, R4 = { class: "ta-r mono-sm fw-600" }, P4 = {
  key: 1,
  class: "empty-msg"
}, I4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, V4 = { class: "mis-summary-card" }, N4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, E4 = { class: "ta-r mono-sm" }, q4 = { class: "ta-r mono-sm" }, B4 = {
  key: 1,
  class: "empty-msg"
}, A4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, $4 = { class: "mis-summary-card" }, L4 = { class: "mis-summary-val" }, Q4 = { class: "mis-summary-card" }, F4 = { class: "mis-summary-val" }, H4 = { class: "mis-summary-card" }, z4 = { class: "mis-summary-val fw-700" }, W4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, U4 = { class: "ta-r mono-sm" }, K4 = { class: "ta-r mono-sm" }, G4 = { class: "ta-r mono-sm" }, Y4 = { class: "ta-r mono-sm fw-600" }, J4 = { class: "ta-r mono-sm" }, Z4 = {
  key: 1,
  class: "empty-msg"
}, X4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, s7 = { class: "mis-summary-card" }, t7 = { class: "mis-summary-val" }, e7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a7 = { class: "ta-r mono-sm" }, o7 = { class: "ta-r mono-sm" }, l7 = {
  key: 1,
  class: "empty-msg"
}, n7 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, i7 = { class: "mis-summary-card" }, d7 = { class: "mis-summary-val red" }, r7 = { class: "mis-summary-card" }, u7 = { class: "mis-summary-val red" }, c7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, m7 = { class: "ta-r mono-sm red fw-600" }, v7 = { class: "ta-r mono-sm" }, _7 = {
  key: 1,
  class: "empty-msg"
}, p7 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, y7 = { class: "mis-summary-card" }, h7 = { class: "mis-summary-val red" }, b7 = { class: "mis-summary-card" }, g7 = { class: "mis-summary-val red" }, k7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, w7 = { class: "ta-r mono-sm red fw-600" }, f7 = { class: "ta-r mono-sm" }, x7 = {
  key: 1,
  class: "empty-msg"
}, C7 = {
  key: 2,
  class: "empty-msg"
}, S7 = {
  key: 21,
  class: "books-card report-card bs-card"
}, j7 = { class: "bs-page-head" }, M7 = { class: "bs-page-head-actions" }, D7 = { class: "bs-asof" }, T7 = { class: "iws-export-wrap" }, O7 = ["disabled"], R7 = { class: "iws-menu" }, P7 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, I7 = ["onClick"], V7 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, N7 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, E7 = { class: "mis-summary-card" }, q7 = { class: "mis-summary-val" }, B7 = { class: "mis-summary-card" }, A7 = { class: "mis-summary-val green" }, $7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, L7 = { class: "ta-r mono-sm" }, Q7 = { class: "ta-r mono-sm" }, F7 = { class: "ta-r mono-sm" }, H7 = { class: "ta-r mono-sm fw-600 green" }, z7 = {
  key: 1,
  class: "empty-msg"
}, W7 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, U7 = { class: "mis-summary-card" }, K7 = { class: "mis-summary-val" }, G7 = { class: "mis-summary-card" }, Y7 = { class: "mis-summary-val" }, J7 = { class: "mis-summary-card" }, Z7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, X7 = { class: "ta-r mono-sm" }, sw = { class: "ta-r mono-sm" }, tw = { class: "ta-r mono-sm" }, ew = {
  key: 1,
  class: "empty-msg"
}, aw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ow = { class: "ta-r mono-sm" }, lw = { class: "ta-r mono-sm" }, nw = { class: "ta-r mono-sm fw-600" }, iw = {
  key: 1,
  class: "empty-msg"
}, dw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, rw = { class: "ta-r mono-sm" }, uw = { class: "ta-r mono-sm" }, cw = {
  key: 1,
  class: "empty-msg"
}, mw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, vw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _w = { class: "ta-r mono-sm fw-600 green" }, pw = { class: "ta-r mono-sm" }, yw = { class: "ta-r mono-sm" }, hw = {
  key: 1,
  class: "empty-msg"
}, bw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, gw = { class: "ta-r mono-sm" }, kw = { class: "ta-r mono-sm" }, ww = { class: "ta-r mono-sm fw-600" }, fw = {
  key: 1,
  class: "empty-msg"
}, xw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Cw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Sw = { class: "mis-summary-card" }, jw = { class: "mis-summary-val red" }, Mw = { class: "mis-summary-card" }, Dw = { class: "mis-summary-val red" }, Tw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ow = { class: "ta-r mono-sm red fw-600" }, Rw = { class: "ta-r mono-sm red" }, Pw = { class: "ta-r mono-sm" }, Iw = {
  key: 1,
  class: "empty-msg"
}, Vw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Nw = { class: "ta-r mono-sm fw-600 green" }, Ew = { class: "ta-r mono-sm" }, qw = {
  key: 1,
  class: "empty-msg"
}, Bw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Aw = { class: "ta-r mono-sm red fw-600" }, $w = { class: "ta-r mono-sm" }, Lw = {
  key: 1,
  class: "empty-msg"
}, Qw = {
  key: 2,
  class: "empty-msg"
}, Fw = {
  key: 22,
  class: "books-card report-card bs-card"
}, Hw = { class: "bs-page-head" }, zw = { class: "bs-page-head-actions" }, Ww = { class: "bs-asof" }, Uw = { class: "iws-export-wrap" }, Kw = ["disabled"], Gw = { class: "iws-menu" }, Yw = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Jw = ["onClick"], Zw = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Xw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, sf = { class: "mis-summary-grid" }, tf = { class: "mis-summary-card" }, ef = { class: "mis-summary-val" }, af = { class: "mis-summary-card" }, of = { class: "mis-summary-val green" }, lf = { class: "mis-summary-card" }, nf = { class: "mis-summary-val" }, df = { class: "mis-summary-card" }, rf = { class: "mis-summary-val" }, uf = { class: "mis-summary-card" }, cf = { class: "mis-summary-val" }, mf = { class: "mis-summary-card" }, vf = { class: "mis-summary-val" }, _f = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, pf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, yf = { class: "mis-summary-card" }, hf = { class: "mis-summary-val" }, bf = { class: "mis-summary-card" }, gf = { class: "mis-summary-val red" }, kf = { class: "mis-summary-card" }, wf = { class: "mis-summary-val red" }, ff = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xf = { class: "ta-r mono-sm" }, Cf = { class: "ta-r mono-sm red fw-600" }, Sf = { class: "ta-r mono-sm" }, jf = {
  key: 1,
  class: "empty-msg"
}, Mf = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Df = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Tf = { class: "mis-summary-card" }, Of = { class: "mis-summary-val" }, Rf = { class: "mis-summary-card" }, Pf = { class: "mis-summary-val red" }, If = { class: "mis-summary-card" }, Vf = { class: "mis-summary-val red" }, Nf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ef = { class: "ta-r mono-sm" }, qf = { class: "ta-r mono-sm" }, Bf = { class: "ta-r mono-sm red fw-600" }, Af = {
  key: 1,
  class: "empty-msg"
}, $f = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Lf = { class: "mis-summary-card" }, Qf = { class: "mis-summary-val red" }, Ff = { class: "mis-summary-card" }, Hf = { class: "mis-summary-val red" }, zf = { class: "mis-summary-card" }, Wf = { class: "mis-summary-val red" }, Uf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Kf = { class: "red fw-600" }, Gf = { class: "ta-r mono-sm red fw-600" }, Yf = { class: "ta-r mono-sm" }, Jf = {
  key: 1,
  class: "empty-msg"
}, Zf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Xf = { class: "ta-r mono-sm" }, s6 = { class: "ta-r mono-sm" }, t6 = { class: "ta-r mono-sm red fw-600" }, e6 = {
  key: 1,
  class: "empty-msg"
}, a6 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, o6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, l6 = { class: "ta-r mono-sm" }, n6 = { class: "ta-r mono-sm" }, i6 = { class: "ta-r mono-sm" }, d6 = { class: "ta-r mono-sm fw-600" }, r6 = {
  key: 1,
  class: "empty-msg"
}, u6 = {
  key: 2,
  class: "empty-msg"
}, c6 = {
  key: 23,
  class: "books-card report-card bs-card"
}, m6 = { class: "bs-page-head" }, v6 = { class: "bs-page-head-actions" }, _6 = { class: "bs-asof" }, p6 = { class: "iws-export-wrap" }, y6 = ["disabled"], h6 = { class: "iws-menu" }, b6 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, g6 = ["onClick"], k6 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, w6 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, f6 = { class: "mis-summary-grid" }, x6 = { class: "mis-summary-card" }, C6 = { class: "mis-summary-val" }, S6 = { class: "mis-summary-card" }, j6 = { class: "mis-summary-val" }, M6 = { class: "mis-summary-card" }, D6 = { class: "mis-summary-val" }, T6 = { class: "mis-summary-card" }, O6 = { class: "mis-summary-val" }, R6 = { class: "mis-summary-card" }, P6 = { class: "mis-summary-val green" }, I6 = { class: "mis-summary-card" }, V6 = { class: "mis-summary-val red" }, N6 = { class: "mis-summary-card" }, E6 = { class: "mis-summary-val green" }, q6 = { class: "mis-summary-card" }, B6 = { class: "mis-summary-val red" }, A6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $6 = { class: "badge badge-blue" }, L6 = { class: "ta-r mono-sm fw-600" }, Q6 = {
  key: 1,
  class: "empty-msg"
}, F6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, H6 = { class: "ta-r mono-sm fw-600" }, z6 = {
  key: 1,
  class: "empty-msg"
}, W6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, U6 = { class: "badge badge-blue" }, K6 = { class: "ta-r mono-sm fw-600" }, G6 = {
  key: 1,
  class: "empty-msg"
}, Y6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, J6 = { class: "ta-r mono-sm fw-600" }, Z6 = {
  key: 1,
  class: "empty-msg"
}, X6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, s3 = { class: "ta-r mono-sm fw-600 green" }, t3 = {
  key: 1,
  class: "empty-msg"
}, e3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a3 = { class: "red fw-600" }, o3 = { class: "badge badge-blue" }, l3 = { class: "ta-r mono-sm" }, n3 = {
  key: 1,
  class: "empty-msg"
}, i3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, d3 = { class: "badge badge-blue" }, r3 = { class: "ta-r mono-sm fw-600 green" }, u3 = {
  key: 1,
  class: "empty-msg"
}, c3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, m3 = { class: "ta-r mono-sm red fw-600" }, v3 = {
  key: 1,
  class: "empty-msg"
}, _3 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, p3 = { class: "mis-summary-card" }, y3 = { class: "mis-summary-val" }, h3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, b3 = { class: "badge badge-blue" }, g3 = { class: "ta-r mono-sm" }, k3 = { class: "ta-r mono-sm fw-600" }, w3 = {
  key: 1,
  class: "empty-msg"
}, f3 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, x3 = { class: "mis-summary-card" }, C3 = { class: "mis-summary-val" }, S3 = { class: "mis-summary-card" }, j3 = { class: "mis-summary-val" }, M3 = { class: "mis-summary-card" }, D3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, T3 = { class: "ta-r mono-sm" }, O3 = { class: "ta-r mono-sm" }, R3 = { class: "ta-r mono-sm" }, P3 = {
  key: 1,
  class: "empty-msg"
}, I3 = {
  key: 2,
  class: "empty-msg"
}, V3 = {
  key: 24,
  class: "books-card report-card bs-card"
}, N3 = { class: "bs-page-head" }, E3 = { class: "bs-page-head-actions" }, q3 = { class: "bs-asof" }, B3 = { class: "iws-export-wrap" }, A3 = ["disabled"], $3 = { class: "iws-menu" }, L3 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Q3 = ["onClick"], F3 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, H3 = { class: "mis-summary-grid" }, z3 = { class: "mis-summary-card" }, W3 = { class: "mis-summary-val" }, U3 = { class: "mis-summary-card" }, K3 = { class: "mis-summary-val" }, G3 = { class: "mis-summary-card" }, Y3 = { class: "mis-summary-val" }, J3 = { class: "mis-summary-card" }, Z3 = { class: "mis-summary-card" }, X3 = { class: "mis-summary-card" }, s5 = { class: "mis-summary-val" }, t5 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, e5 = { class: "ta-r mono-sm" }, a5 = { class: "ta-r mono-sm" }, o5 = { class: "ta-r mono-sm" }, l5 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n5 = { class: "ta-r mono-sm" }, i5 = { class: "ta-r mono-sm" }, d5 = { class: "ta-r mono-sm" }, r5 = { class: "ta-r mono-sm" }, u5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, c5 = { class: "ta-r mono-sm" }, m5 = { class: "ta-r mono-sm" }, v5 = { class: "ta-r mono-sm" }, _5 = { key: 0 }, p5 = { class: "ta-r mono-sm" }, y5 = { class: "ta-r mono-sm" }, h5 = {
  key: 1,
  class: "empty-msg"
}, b5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, g5 = { class: "ta-r mono-sm" }, k5 = { class: "ta-r mono-sm" }, w5 = { class: "ta-r mono-sm" }, f5 = {
  key: 1,
  class: "empty-msg"
}, x5 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, C5 = { class: "ta-r mono-sm" }, S5 = { class: "ta-r mono-sm" }, j5 = { class: "ta-r mono-sm" }, M5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, D5 = { class: "ta-r mono-sm" }, T5 = { class: "ta-r mono-sm" }, O5 = { class: "ta-r mono-sm" }, R5 = {
  key: 1,
  class: "empty-msg"
}, P5 = {
  key: 2,
  class: "empty-msg"
}, I5 = {
  key: 25,
  class: "books-card report-card bs-card"
}, V5 = { class: "bs-page-head" }, N5 = { class: "bs-page-head-actions" }, E5 = { class: "bs-asof" }, q5 = { class: "iws-export-wrap" }, B5 = ["disabled"], A5 = { class: "iws-menu" }, $5 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, L5 = ["onClick"], Q5 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, F5 = { class: "mis-summary-grid" }, H5 = { class: "mis-summary-card" }, z5 = { class: "mis-summary-val" }, W5 = { class: "mis-summary-card" }, U5 = { class: "mis-summary-val" }, K5 = { class: "mis-summary-card" }, G5 = { class: "mis-summary-val" }, Y5 = { class: "mis-summary-card" }, J5 = { class: "mis-summary-val" }, Z5 = { class: "mis-summary-card" }, X5 = { class: "mis-summary-val" }, sx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, tx = { class: "ta-r mono-sm" }, ex = { class: "ta-r mono-sm fw-600" }, ax = {
  key: 1,
  class: "empty-msg"
}, ox = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, lx = { class: "ta-r mono-sm" }, nx = { class: "ta-r mono-sm fw-600" }, ix = { class: "ta-r mono-sm" }, dx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, rx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ux = { class: "ta-r mono-sm" }, cx = { class: "ta-r mono-sm" }, mx = {
  key: 1,
  class: "empty-msg"
}, vx = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, _x = { class: "mis-summary-card" }, px = { class: "mis-summary-val" }, yx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, hx = { class: "ta-r mono-sm" }, bx = { class: "ta-r mono-sm fw-600" }, gx = {
  key: 1,
  class: "empty-msg"
}, kx = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, wx = { class: "mis-summary-card" }, fx = { class: "mis-summary-val" }, xx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Cx = { class: "ta-r mono-sm" }, Sx = { class: "ta-r mono-sm fw-600" }, jx = {
  key: 1,
  class: "empty-msg"
}, Mx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Dx = { class: "ta-r mono-sm" }, Tx = { class: "ta-r mono-sm fw-600" }, Ox = {
  key: 1,
  class: "empty-msg"
}, Rx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Px = { class: "ta-r mono-sm fw-600 red" }, Ix = { class: "ta-r mono-sm" }, Vx = { style: { "font-size": "11px", color: "#94a3b8" } }, Nx = {
  key: 1,
  class: "empty-msg"
}, Ex = {
  key: 2,
  class: "empty-msg"
}, qx = {
  key: 26,
  class: "books-card report-card bs-card"
}, Bx = { class: "bs-page-head" }, Ax = { class: "bs-page-head-actions" }, $x = { class: "bs-asof" }, Lx = { class: "iws-export-wrap" }, Qx = ["disabled"], Fx = { class: "iws-menu" }, Hx = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, zx = ["onClick"], Wx = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Ux = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Kx = { class: "mis-summary-grid" }, Gx = { class: "mis-summary-card" }, Yx = { class: "mis-summary-val" }, Jx = { class: "mis-summary-card" }, Zx = { class: "mis-summary-val red" }, Xx = { class: "mis-summary-card" }, s8 = { class: "mis-summary-val green" }, t8 = { class: "mis-summary-card" }, e8 = { class: "mis-summary-val" }, a8 = { class: "mis-summary-card" }, o8 = { class: "mis-summary-val" }, l8 = { class: "mis-summary-card" }, n8 = { class: "mis-summary-val" }, i8 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, d8 = { class: "ta-r mono-sm" }, r8 = { class: "ta-r mono-sm" }, u8 = { class: "ta-r mono-sm" }, c8 = { class: "ta-r mono-sm" }, m8 = { class: "ta-r mono-sm red" }, v8 = { class: "ta-r mono-sm fw-600" }, _8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, p8 = { class: "ta-r mono-sm red" }, y8 = { class: "ta-r mono-sm fw-600" }, h8 = {
  key: 1,
  class: "empty-msg"
}, b8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, g8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, k8 = { class: "ta-r mono-sm fw-600" }, w8 = {
  key: 1,
  class: "empty-msg"
}, f8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, x8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, C8 = { class: "ta-r mono-sm fw-600" }, S8 = {
  key: 1,
  class: "empty-msg"
}, j8 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M8 = { class: "ta-r mono-sm" }, D8 = { class: "ta-r mono-sm fw-600" }, T8 = { class: "ta-r mono-sm" }, O8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, R8 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, P8 = { class: "ta-r mono-sm" }, I8 = {
  key: 2,
  class: "empty-msg"
}, V8 = {
  key: 27,
  class: "books-card report-card bs-card"
}, N8 = { class: "bs-page-head" }, E8 = { class: "bs-page-head-actions" }, q8 = { class: "bs-asof" }, B8 = { class: "iws-export-wrap" }, A8 = ["disabled"], $8 = { class: "iws-menu" }, L8 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Q8 = ["onClick"], F8 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, H8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, z8 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, W8 = { class: "mis-summary-card" }, U8 = { class: "mis-summary-val" }, K8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, G8 = { class: "ta-r mono-sm" }, Y8 = { class: "ta-r mono-sm fw-600" }, J8 = {
  key: 1,
  class: "empty-msg"
}, Z8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, X8 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, s9 = { class: "mis-summary-card" }, t9 = { class: "mis-summary-val" }, e9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a9 = { class: "ta-r mono-sm" }, o9 = { class: "ta-r mono-sm fw-600" }, l9 = {
  key: 1,
  class: "empty-msg"
}, n9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, i9 = { class: "mis-summary-card" }, d9 = { class: "mis-summary-val" }, r9 = { class: "mis-summary-card" }, u9 = { class: "mis-summary-val green" }, c9 = { class: "mis-summary-card" }, m9 = { class: "mis-summary-val red" }, v9 = { class: "mis-summary-card" }, _9 = { class: "mis-summary-val" }, p9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, y9 = { class: "ta-r mono-sm green" }, h9 = { class: "ta-r mono-sm red" }, b9 = { class: "ta-r mono-sm fw-600" }, g9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, k9 = { class: "mis-summary-card" }, w9 = { class: "mis-summary-val" }, f9 = { class: "mis-summary-card" }, x9 = { class: "mis-summary-val green" }, C9 = { class: "mis-summary-card" }, S9 = { class: "mis-summary-val red" }, j9 = { class: "mis-summary-card" }, M9 = { class: "mis-summary-val" }, D9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, T9 = { class: "ta-r mono-sm green" }, O9 = { class: "ta-r mono-sm red" }, R9 = { class: "ta-r mono-sm fw-600" }, P9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, I9 = { class: "mis-summary-card" }, V9 = { class: "mis-summary-val green" }, N9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, E9 = { class: "ta-r mono-sm fw-600 green" }, q9 = {
  key: 1,
  class: "empty-msg"
}, B9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, A9 = { class: "mis-summary-card" }, $9 = { class: "mis-summary-val red" }, L9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Q9 = { class: "ta-r mono-sm fw-600 red" }, F9 = {
  key: 1,
  class: "empty-msg"
}, H9 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, z9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, W9 = { class: "ta-r mono-sm green" }, U9 = { class: "ta-r mono-sm red" }, K9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, G9 = { class: "mis-summary-card" }, Y9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, J9 = { class: "red" }, Z9 = { class: "ta-r mono-sm fw-600 red" }, X9 = {
  key: 1,
  class: "empty-msg"
}, sC = {
  key: 2,
  class: "empty-msg"
}, tC = {
  key: 28,
  class: "books-card report-card bs-card"
}, eC = { class: "bs-page-head" }, aC = { class: "bs-page-head-actions" }, oC = { class: "bs-asof" }, lC = { class: "iws-export-wrap" }, nC = ["disabled"], iC = { class: "iws-menu" }, dC = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, rC = ["onClick"], uC = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, cC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, mC = { class: "mis-summary-card" }, vC = { class: "mis-summary-val" }, _C = { class: "mis-summary-card" }, pC = { class: "mis-summary-val" }, yC = { class: "mis-summary-card" }, hC = { class: "mis-summary-val green" }, bC = { class: "mis-summary-card" }, gC = { class: "mis-summary-val" }, kC = { class: "mis-summary-card" }, wC = { class: "mis-summary-val" }, fC = { class: "mis-summary-card" }, xC = { class: "mis-summary-val green" }, CC = { class: "mis-summary-card" }, SC = { class: "mis-summary-val red" }, jC = { class: "mis-summary-card" }, MC = { class: "mis-summary-val" }, DC = { class: "mis-summary-card" }, TC = { class: "mis-summary-val red" }, OC = { class: "mis-summary-card" }, RC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, PC = { class: "mis-summary-card" }, IC = { class: "mis-summary-val" }, VC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, NC = { class: "ta-r mono-sm" }, EC = { class: "ta-r mono-sm fw-600" }, qC = {
  key: 1,
  class: "empty-msg"
}, BC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, AC = { class: "mis-summary-card" }, $C = { class: "mis-summary-val" }, LC = { class: "mis-summary-card" }, QC = { class: "mis-summary-val green" }, FC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, HC = { class: "ta-r mono-sm" }, zC = { class: "ta-r mono-sm fw-600" }, WC = {
  key: 1,
  class: "empty-msg"
}, UC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, KC = { class: "mis-summary-card" }, GC = { class: "mis-summary-val" }, YC = { class: "mis-summary-card" }, JC = { class: "mis-summary-val green" }, ZC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, XC = { class: "ta-r mono-sm" }, sS = { class: "ta-r mono-sm fw-600" }, tS = {
  key: 1,
  class: "empty-msg"
}, eS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, aS = { class: "ta-r mono-sm" }, oS = { class: "ta-r mono-sm" }, lS = { class: "ta-r mono-sm" }, nS = { class: "ta-r mono-sm" }, iS = { class: "ta-r mono-sm fw-600" }, dS = { class: "ta-r mono-sm red" }, rS = { class: "ta-r mono-sm" }, uS = {
  key: 1,
  class: "empty-msg"
}, cS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, mS = { class: "mis-summary-card" }, vS = { class: "mis-summary-val red" }, _S = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, pS = { class: "ta-r mono-sm" }, yS = { class: "ta-r mono-sm fw-600 red" }, hS = {
  key: 1,
  class: "empty-msg"
}, bS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, gS = { class: "mis-summary-card" }, kS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wS = { class: "ta-r mono-sm" }, fS = { class: "ta-r mono-sm" }, xS = { class: "ta-r mono-sm" }, CS = { class: "ta-r mono-sm" }, SS = {
  key: 1,
  class: "empty-msg"
}, jS = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, MS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, DS = { class: "mis-summary-card" }, TS = { class: "mis-summary-val" }, OS = { class: "mis-summary-card" }, RS = { class: "mis-summary-val green" }, PS = { class: "mis-summary-card" }, IS = { class: "mis-summary-val red" }, VS = { class: "mis-summary-card" }, NS = { class: "mis-summary-val" }, ES = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qS = {
  key: 1,
  class: "empty-msg"
}, BS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, AS = { class: "ta-r mono-sm" }, $S = { class: "ta-r mono-sm fw-600" }, LS = {
  key: 1,
  class: "empty-msg"
}, QS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, FS = { class: "mis-summary-card" }, HS = { class: "mis-summary-val" }, zS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, WS = { class: "ta-r mono-sm red" }, US = { class: "ta-r mono-sm" }, KS = { class: "ta-r mono-sm" }, GS = {
  key: 1,
  class: "empty-msg"
}, YS = {
  key: 2,
  class: "empty-msg"
}, JS = {
  key: 29,
  class: "books-card report-card bs-card"
}, ZS = { class: "bs-page-head" }, XS = { class: "bs-page-head-actions" }, sj = { class: "bs-asof" }, tj = { class: "iws-export-wrap" }, ej = ["disabled"], aj = { class: "iws-menu" }, oj = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, lj = ["onClick"], nj = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, ij = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, dj = { class: "mis-summary-card" }, rj = { class: "mis-summary-val" }, uj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, cj = { class: "ta-r mono-sm" }, mj = { class: "ta-r mono-sm" }, vj = { class: "ta-r mono-sm" }, _j = { class: "ta-r mono-sm" }, pj = { class: "ta-r mono-sm fw-600" }, yj = { class: "ta-r mono-sm red" }, hj = { class: "ta-r mono-sm" }, bj = {
  key: 1,
  class: "empty-msg"
}, gj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, kj = { class: "mis-summary-card" }, wj = { class: "mis-summary-val red" }, fj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xj = { class: "ta-r mono-sm" }, Cj = { class: "ta-r mono-sm fw-600 red" }, Sj = { class: "ta-r mono-sm red" }, jj = {
  key: 1,
  class: "empty-msg"
}, Mj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Dj = { class: "ta-r mono-sm" }, Tj = { class: "ta-r mono-sm" }, Oj = { class: "ta-r mono-sm" }, Rj = { class: "ta-r mono-sm" }, Pj = { class: "ta-r mono-sm red" }, Ij = { class: "ta-r mono-sm fw-600" }, Vj = {
  key: 1,
  class: "empty-msg"
}, Nj = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Ej = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qj = { class: "ta-r mono-sm" }, Bj = { class: "ta-r mono-sm fw-600" }, Aj = {
  key: 0,
  class: "pill pill-green"
}, $j = {
  key: 1,
  class: "empty-msg"
}, Lj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Qj = { class: "ta-r mono-sm fw-600" }, Fj = { class: "ta-r mono-sm red" }, Hj = { class: "ta-r mono-sm" }, zj = { class: "ta-r mono-sm" }, Wj = { class: "ta-r mono-sm" }, Uj = {
  key: 1,
  class: "empty-msg"
}, Kj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Gj = { class: "mis-summary-card" }, Yj = { class: "mis-summary-val green" }, Jj = { class: "mis-summary-card" }, Zj = { class: "mis-summary-val" }, Xj = { class: "mis-summary-card" }, sM = { class: "mis-summary-val red" }, tM = { class: "mis-summary-card" }, eM = { class: "mis-summary-val" }, aM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, oM = { class: "ta-r mono-sm" }, lM = { class: "ta-r mono-sm green" }, nM = { class: "ta-r mono-sm red" }, iM = { class: "ta-r mono-sm fw-600" }, dM = { class: "ta-r mono-sm" }, rM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, uM = {
  key: 2,
  class: "empty-msg"
}, cM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, mM = { class: "mis-summary-card" }, vM = { class: "mis-summary-val" }, _M = { class: "mis-summary-card" }, pM = { class: "mis-summary-val red" }, yM = { class: "mis-summary-card" }, hM = { class: "mis-summary-val red" }, bM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, gM = { class: "ta-r mono-sm" }, kM = { class: "ta-r mono-sm green" }, wM = { class: "ta-r mono-sm red" }, fM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xM = { class: "ta-r mono-sm" }, CM = { class: "ta-r mono-sm green" }, SM = { class: "ta-r mono-sm red" }, jM = {
  key: 2,
  class: "empty-msg"
}, MM = {
  key: 2,
  class: "empty-msg"
}, DM = {
  key: 30,
  class: "books-card report-card bs-card"
}, TM = { class: "bs-page-head" }, OM = { class: "bs-page-head-actions" }, RM = { class: "bs-asof" }, PM = { class: "iws-export-wrap" }, IM = ["disabled"], VM = { class: "iws-menu" }, NM = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, EM = ["onClick"], qM = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, BM = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, AM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $M = { class: "ta-r mono-sm" }, LM = { class: "ta-r mono-sm" }, QM = { class: "ta-r mono-sm" }, FM = {
  key: 1,
  class: "empty-msg"
}, HM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, zM = { class: "mis-summary-card" }, WM = { class: "mis-summary-val" }, UM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, KM = { class: "ta-r mono-sm fw-600" }, GM = { style: { "font-size": "11.5px", color: "#64748b" } }, YM = {
  key: 1,
  class: "empty-msg"
}, JM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, ZM = { class: "mis-summary-card" }, XM = { class: "mis-summary-val green" }, sD = { class: "mis-summary-card" }, tD = { class: "mis-summary-val" }, eD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, aD = { class: "ta-r mono-sm" }, oD = { class: "ta-r mono-sm fw-600 green" }, lD = { class: "ta-r" }, nD = ["onUpdate:modelValue"], iD = {
  key: 1,
  class: "empty-msg"
}, dD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, rD = { class: "mis-summary-card" }, uD = { class: "mis-summary-val green" }, cD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, mD = { class: "ta-r mono-sm" }, vD = { class: "ta-r mono-sm fw-600 green" }, _D = {
  key: 1,
  class: "empty-msg"
}, pD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, yD = { class: "mis-summary-card" }, hD = { class: "mis-summary-val" }, bD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, gD = { class: "ta-r mono-sm" }, kD = { class: "ta-r mono-sm" }, wD = { class: "ta-r mono-sm fw-600" }, fD = { class: "ta-r mono-sm" }, xD = { class: "ta-r mono-sm" }, CD = {
  key: 1,
  class: "empty-msg"
}, SD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jD = { class: "ta-r mono-sm" }, MD = { class: "ta-r mono-sm fw-600 red" }, DD = {
  key: 1,
  class: "empty-msg"
}, TD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, OD = { class: "mis-summary-card" }, RD = { class: "mis-summary-val red" }, PD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, ID = { class: "ta-r mono-sm" }, VD = { class: "ta-r mono-sm fw-600" }, ND = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ED = { class: "ta-r mono-sm" }, qD = { class: "ta-r mono-sm" }, BD = { class: "ta-r mono-sm fw-600" }, AD = {
  key: 2,
  class: "empty-msg"
}, $D = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, LD = { class: "ta-r mono-sm" }, QD = { class: "ta-r mono-sm" }, FD = { class: "ta-r mono-sm" }, HD = { class: "ta-r mono-sm" }, zD = { class: "ta-r mono-sm" }, WD = {
  key: 1,
  class: "empty-msg"
}, UD = {
  key: 2,
  class: "empty-msg"
}, KD = {
  __name: "Reports",
  setup(F) {
    const S = Tn, d = (i) => i != null ? "KES " + Number(i).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—", _ = (i) => Number(i || 0).toLocaleString("en-US", { maximumFractionDigits: 0 }), H = (i) => Number(i || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function G(i) {
      const t = String(i || "").length;
      let n = 24;
      return t > 18 ? n = 15 : t > 15 ? n = 17 : t > 12 ? n = 19 : t > 10 && (n = 21), { fontSize: n + "px" };
    }
    const ls = /* @__PURE__ */ new Date(), C = v(new Date(ls.getFullYear(), ls.getMonth(), 1).toISOString().slice(0, 10)), y = v(ls.toISOString().slice(0, 10)), k = v("mrn_lpo"), Bs = {
      mrn_lpo: "mrn_vs_lpo",
      lpo_grn: "lpo_vs_grn",
      proj_summary: "project_summary",
      supp_analysis: "supplier_analysis",
      asset_reg: "asset_register"
    }, ws = v(""), Ie = v([]), As = v([]), lt = v({}), al = V(() => !!lt.value[k.value]), de = v(!1), Xt = v("");
    async function ja() {
      const i = Bs[k.value];
      if (i) {
        de.value = !0, Xt.value = "";
        try {
          const t = k.value === "asset_reg" ? { from_date: C.value, to_date: y.value } : ws.value ? { project: ws.value } : {}, n = await K("psd_books.api.procurement_reports." + i, t);
          if (As.value = Array.isArray(n) ? n : (n == null ? void 0 : n.message) || [], lt.value = { ...lt.value, [k.value]: { rows: As.value, project: ws.value } }, !Ie.value.length) {
            const r = await K("psd_books.api.procurement_reports.project_summary", {});
            Ie.value = (Array.isArray(r) ? r : (r == null ? void 0 : r.message) || []).map((p) => p.project);
          }
        } catch (t) {
          Xt.value = t.message || "Failed to load report", As.value = [], lt.value = { ...lt.value, [k.value]: { rows: [], project: ws.value } };
        } finally {
          de.value = !1;
        }
      }
    }
    const ol = {
      asset_reg: ["item_code", "adjustment_qty", "closing_qty", "issued_qty"],
      supp_analysis: ["supplier", "billed_value"],
      proj_summary: ["project", "billed_value"],
      lpo_grn: ["supplier", "project", "billed_qty"],
      mrn_lpo: ["project"]
    }, Ma = { project_name: "Project" }, ll = ["mrn", "lpo", "project", "project_name", "item_code", "item_name"], Da = {
      mrn_lpo: "Search MRN, project, item code, item name",
      lpo_grn: "Search LPO, project, item code, item name",
      proj_summary: "Search project",
      asset_reg: "Search item code, item name"
    }, nt = v(""), Ta = V(() => !!Da[k.value]), nl = V(() => Da[k.value] || "Search"), it = V(() => {
      const i = nt.value.trim().toLowerCase();
      if (!i || !Ta.value) return As.value;
      const t = i.split(/\s+/);
      return As.value.filter((n) => {
        const r = ll.map((p) => n[p] == null ? "" : String(n[p])).join(" ").toLowerCase();
        return t.every((p) => r.includes(p));
      });
    }), re = V(() => {
      const i = As.value[0];
      if (!i) return [];
      const t = ol[k.value] || [];
      return Object.keys(i).filter((n) => !t.includes(n));
    }), Oa = {
      mrn_lpo: ["MRN vs LPO", "How much of each material requisition has been ordered on LPOs"],
      lpo_grn: ["LPO vs GRN", "How much of each LPO has been received on goods receipts"],
      proj_summary: ["Project Summary", "Requisitions, LPOs, value received and billed for each project"],
      supp_analysis: ["Supplier Analysis", "LPOs, value and receipts for each supplier"],
      asset_reg: ["Asset Register", "Opening stock, purchases and total quantity of asset items"]
    }, il = V(() => (Oa[k.value] || [""])[0]), dl = V(() => (Oa[k.value] || ["", ""])[1]), rl = { mrn: "MRN", lpo: "LPO", grn: "GRN", uom: "UOM" };
    function ue(i) {
      return Ma[i] ? Ma[i] : i.split("_").map((t) => rl[t] || t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
    }
    function Ra(i) {
      const t = As.value[0];
      return !!t && typeof t[i] == "number";
    }
    function ul(i, t) {
      if (typeof i != "number") return i ?? "";
      const n = /_value$/.test(t);
      return i.toLocaleString("en-US", n ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 });
    }
    const f = v("");
    function es(i) {
      f.value = f.value === i ? "" : i;
    }
    let Ve = !1;
    function Y(i) {
      Ve = !0;
      try {
        i();
      } finally {
        Ve = !1;
      }
    }
    function Ws(i, t) {
      if (Ve) {
        const j = $n(i);
        el(t.replace(/\.csv$/i, "") + ".xlsx", j[0] || [], j.slice(1));
        return;
      }
      const n = new Blob([i], { type: "text/csv;charset=utf-8" }), r = URL.createObjectURL(n), p = document.createElement("a");
      p.href = r, p.download = t, p.click(), URL.revokeObjectURL(r);
    }
    const Bt = v(!1);
    function cl() {
      if (!it.value.length) return;
      const i = re.value, t = i.map((r) => ue(r)), n = it.value.map((r) => i.map((p) => r[p]));
      el(Bs[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".xlsx", t, n);
    }
    function ml() {
      if (!it.value.length) return;
      const i = re.value, t = (D) => {
        const N = D == null ? "" : String(D);
        return /[",\n]/.test(N) ? '"' + N.replace(/"/g, '""') + '"' : N;
      }, n = [i.map((D) => t(ue(D))).join(",")];
      for (const D of it.value) n.push(i.map((N) => t(D[N])).join(","));
      const r = new Blob([n.join(`
`)], { type: "text/csv;charset=utf-8" }), p = URL.createObjectURL(r), j = document.createElement("a");
      j.href = p, j.download = Bs[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", j.click(), URL.revokeObjectURL(p);
    }
    Xo(k, (i) => {
      const t = lt.value[i];
      Xt.value = "", nt.value = "", As.value = t ? t.rows : [], t && (ws.value = t.project);
    }), Xo(ws, () => {
      const i = lt.value[k.value];
      Bs[k.value] && i && i.project !== ws.value && ja();
    });
    const { data: as, loading: vl, execute: _l } = ie("psd_books.db.queries.get_profit_and_loss"), { data: ps, loading: pl, execute: yl } = ie("psd_books.db.queries.get_balance_sheet_totals"), { data: J, loading: hl, execute: bl } = ie("psd_books.db.queries.get_cash_flow"), { data: dt, loading: gl, execute: kl } = ie("psd_books.db.queries.get_gst_summary"), { data: Gs, loading: wl, execute: fl } = ie("psd_books.db.queries.get_trial_balance"), rt = v(!1), At = v(null), Ys = v({ key: "", dir: "asc" });
    function ce(i, t) {
      return (i || []).reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const ms = V(() => ({
      opening: ce(Gs.value, "opening"),
      debit: ce(Gs.value, "debit"),
      credit: ce(Gs.value, "credit"),
      closing: ce(Gs.value, "closing")
    })), me = V(() => Math.abs(ms.value.debit - ms.value.credit) < 0.01), Ne = V(() => {
      const i = [...Gs.value || []], t = Ys.value.key;
      if (!t) return i;
      const n = Ys.value.dir === "desc" ? -1 : 1, r = (p) => t === "account" || t === "account_type" ? String(p[t] || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function $t(i) {
      Ys.value.key === i ? Ys.value = { key: i, dir: Ys.value.dir === "asc" ? "desc" : "asc" } : Ys.value = { key: i, dir: "asc" };
    }
    function Lt(i) {
      return Ys.value.key !== i ? "" : Ys.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const ve = ["Account", "Type", "Opening", "Debit", "Credit", "Closing"];
    function _e(i) {
      return [i.account, i.account_type, i.opening || 0, i.debit || 0, i.credit || 0, i.closing || 0];
    }
    function xl() {
      var r;
      const i = Ne.value.map((p) => _e(p).join("	")), t = ms.value;
      i.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join("	"));
      const n = [ve.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function Cl(i) {
      var n;
      const t = [ve.join("	"), _e(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Sl(i) {
      const t = [ve.join(","), _e(i).join(",")].join(`
`), n = String(i.account || "account").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "trial_balance_" + n + "_" + y.value + ".csv");
    }
    function Pa() {
      var r;
      if (!((r = Gs.value) != null && r.length)) return;
      const i = Ne.value.map((p) => _e(p).join(",")), t = ms.value;
      i.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join(","));
      const n = [ve.join(","), ...i].join(`
`);
      gs(n, "trial_balance_" + y.value + ".csv");
    }
    const rs = v([]), us = v([]), ut = v(!1), Qt = v(null), Js = v({ key: "", dir: "asc" });
    function fs(i, t) {
      return i.reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const js = V(() => ({
      current: fs(rs.value, "current"),
      days_1_30: fs(rs.value, "days_1_30"),
      days_31_60: fs(rs.value, "days_31_60"),
      days_61_90: fs(rs.value, "days_61_90"),
      days_90_plus: fs(rs.value, "days_90_plus"),
      total: fs(rs.value, "total")
    })), Ia = V(() => {
      const i = [...rs.value || []], t = Js.value.key;
      if (!t) return i;
      const n = Js.value.dir === "desc" ? -1 : 1, r = (p) => t === "customer" ? String(p.customer_name || p.customer || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function ct(i) {
      Js.value.key === i ? Js.value = { key: i, dir: Js.value.dir === "asc" ? "desc" : "asc" } : Js.value = { key: i, dir: "asc" };
    }
    function mt(i) {
      return Js.value.key !== i ? "" : Js.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function pe(i, t) {
      return [t ? i.customer_name || i.customer : i.supplier_name || i.supplier, i.current, i.days_1_30, i.days_31_60, i.days_61_90, i.days_90_plus, i.total];
    }
    function ye(i) {
      return [i ? "Customer" : "Vendor", "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"];
    }
    function jl() {
      var p;
      const i = ye(!0), t = Ia.value.map((j) => pe(j, !0).join("	")), n = js.value;
      t.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...t].join(`
`);
      (p = navigator.clipboard) != null && p.writeText && navigator.clipboard.writeText(r);
    }
    function Va(i, t) {
      var p;
      const r = [ye(t).join("	"), pe(i, t).join("	")].join(`
`);
      (p = navigator.clipboard) != null && p.writeText && navigator.clipboard.writeText(r);
    }
    function Na(i, t) {
      const r = [ye(t).join(","), pe(i, t).join(",")].join(`
`), p = String((t ? i.customer : i.supplier) || "party").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(r, (t ? "ar_aging_" : "ap_aging_") + p + "_" + y.value + ".csv");
    }
    const vt = v(!1), Ft = v(null), Zs = v({ key: "", dir: "asc" }), Ms = V(() => ({
      current: fs(us.value, "current"),
      days_1_30: fs(us.value, "days_1_30"),
      days_31_60: fs(us.value, "days_31_60"),
      days_61_90: fs(us.value, "days_61_90"),
      days_90_plus: fs(us.value, "days_90_plus"),
      total: fs(us.value, "total")
    })), Ea = V(() => {
      const i = [...us.value || []], t = Zs.value.key;
      if (!t) return i;
      const n = Zs.value.dir === "desc" ? -1 : 1, r = (p) => t === "supplier" ? String(p.supplier_name || p.supplier || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function _t(i) {
      Zs.value.key === i ? Zs.value = { key: i, dir: Zs.value.dir === "asc" ? "desc" : "asc" } : Zs.value = { key: i, dir: "asc" };
    }
    function pt(i) {
      return Zs.value.key !== i ? "" : Zs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function Ml() {
      var p;
      const i = ye(!1), t = Ea.value.map((j) => pe(j, !1).join("	")), n = Ms.value;
      t.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...t].join(`
`);
      (p = navigator.clipboard) != null && p.writeText && navigator.clipboard.writeText(r);
    }
    const Ds = v([]), se = v([]), Dl = V(() => Math.max(
      ...se.value.flatMap((i) => [Math.abs(i.operating || 0), Math.abs(i.investing || 0), Math.abs(i.financing || 0)]),
      1
    ));
    function Ee(i) {
      const n = Math.round(Math.abs(Number(i) || 0) / Dl.value * 60);
      return (Number(i) || 0) >= 0 ? { height: n + "px", bottom: "50%", top: "auto" } : { height: n + "px", top: "50%", bottom: "auto" };
    }
    function Tl(i, t) {
      if (!i || !t) return [];
      const n = new Date(i), r = new Date(t);
      if (isNaN(n) || isNaN(r) || n > r) return [];
      const p = [];
      let j = new Date(n.getFullYear(), n.getMonth(), 1);
      for (; j <= r; ) {
        const D = new Date(j.getFullYear(), j.getMonth(), 1), N = new Date(j.getFullYear(), j.getMonth() + 1, 0), Ns = D < n ? n : D, Et = N > r ? r : N;
        p.push({
          from: Ns.toISOString().slice(0, 10),
          to: Et.toISOString().slice(0, 10),
          month: j.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }), j = new Date(j.getFullYear(), j.getMonth() + 1, 1);
      }
      return p;
    }
    function qa() {
      if (!J.value) return;
      const i = ["Line", "Amount"].join(","), t = [
        ["Operating Activities", J.value.operating].join(","),
        ["Investing Activities", J.value.investing].join(","),
        ["Financing Activities", J.value.financing].join(","),
        ["Net Change in Cash", J.value.net_change].join(","),
        ["Opening Cash & Bank", J.value.opening_cash].join(","),
        ["Closing Cash & Bank", J.value.closing_cash].join(",")
      ], n = [i, ...t].join(`
`);
      Ws(n, "cash_flow_" + y.value + ".csv");
    }
    const Ol = { CGST: "Central Goods and Services Tax", SGST: "State Goods and Services Tax", IGST: "Integrated Goods and Services Tax", UTGST: "Union Territory Goods and Services Tax" }, Ba = ["gst-c-blue", "gst-c-emerald", "gst-c-cyan", "gst-c-amber", "gst-c-violet"], Rl = V(() => (dt.value || []).map((i, t) => ({
      ...i,
      desc: Ol[i.tax_type] || "Goods and Services Tax",
      cls: Ba[t % Ba.length]
    }))), Aa = V(() => (dt.value || []).reduce((i, t) => i + (Number(t.invoice_count) || 0), 0)), $a = V(() => (dt.value || []).reduce((i, t) => i + (Number(t.total_tax) || 0), 0));
    function La() {
      var r;
      if (!((r = dt.value) != null && r.length)) return;
      const i = ["Tax Type", "Invoice Count", "Total Tax"].join(","), t = dt.value.map((p) => [p.tax_type, p.invoice_count, p.total_tax].join(","));
      t.push(["Total", Aa.value, $a.value].join(","));
      const n = [i, ...t].join(`
`);
      Ws(n, "gst_summary_" + y.value + ".csv");
    }
    const qe = v(!1), Be = v(!1), Qa = v(!1), Fa = v(!1), $s = v([]), Ae = v(!1), Ha = v(!1), Ls = v([]), $e = v(!1), za = v(!1), cs = v([]), Le = v(!1), Wa = v(!1), ds = v([]), Qe = v(!1), Ua = v(!1), Ts = v(/* @__PURE__ */ new Set()), Fe = v(!1), He = v(!1), ns = v(null);
    async function Ka(i) {
      Fe.value = !0, He.value = !0, ns.value = null;
      try {
        ns.value = await K("psd_books.db.queries.get_invoice_profit_detail", { invoice: i });
      } catch {
        ns.value = null;
      }
      He.value = !1;
    }
    const ss = v(null), ze = v(!1), Ga = v(!1), yt = v(!1), te = v(null), Ht = v(null), zt = v({ key: "", dir: "asc" }), ht = v({ key: "", dir: "asc" });
    function Pl(i, t, n) {
      const r = t.key;
      if (!r) return i;
      const p = t.dir === "desc" ? -1 : 1, j = (D) => n.includes(r) ? String(D[r] || "").toLowerCase() : Number(D[r] || 0);
      return [...i].sort((D, N) => {
        const Ns = j(D), Et = j(N);
        return typeof Ns == "string" ? p * Ns.localeCompare(Et) : p * (Ns - Et);
      });
    }
    const Ya = V(() => {
      var i;
      return Pl(((i = ss.value) == null ? void 0 : i.accounts) || [], zt.value, ["account"]);
    });
    function he(i) {
      zt.value = zt.value.key === i ? { key: i, dir: zt.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function be(i) {
      return zt.value.key !== i ? "" : zt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const We = V(() => {
      var p;
      const i = [...((p = ss.value) == null ? void 0 : p.items) || []], t = ht.value.key;
      if (!t) return i;
      const n = ht.value.dir === "desc" ? -1 : 1, r = (j) => t === "item" ? String(j.item_name || j.item_code || "").toLowerCase() : t === "warehouse" ? String(j.warehouse || "").toLowerCase() : Number(j[t] || 0);
      return i.sort((j, D) => {
        const N = r(j), Ns = r(D);
        return typeof N == "string" ? n * N.localeCompare(Ns) : n * (N - Ns);
      }), i;
    });
    function ee(i) {
      ht.value = ht.value.key === i ? { key: i, dir: ht.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function ae(i) {
      return ht.value.key !== i ? "" : ht.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ue = V(() => {
      var i;
      return (((i = ss.value) == null ? void 0 : i.items) || []).reduce((t, n) => t + Number(n.stock_value || 0), 0);
    }), Ja = ["Inventory Account", "Bin Stock Value", "GL Balance", "Difference", "Status"];
    function Za(i) {
      return [i.account, i.bin_stock_value, i.gl_balance, i.difference, i.is_reconciled ? "OK" : "DRIFT"];
    }
    function Il(i) {
      var n;
      const t = [Ja.join("	"), Za(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Vl() {
      var n, r;
      if (!((r = (n = ss.value) == null ? void 0 : n.accounts) != null && r.length)) return;
      const i = Ya.value.map((p) => Za(p).join(",")), t = [Ja.join(","), ...i].join(`
`);
      gs(t, "stock_vs_gl_accounts_" + y.value + ".csv");
    }
    const ge = ["Item", "Warehouse", "Qty", "Valuation Rate", "Stock Value"];
    function ke(i) {
      return [i.item_name || i.item_code, i.warehouse, i.actual_qty, i.valuation_rate, i.stock_value];
    }
    function Nl(i) {
      var n;
      const t = [ge.join("	"), ke(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function El() {
      var n;
      const i = We.value.map((r) => ke(r).join("	"));
      i.push(["Total", "", "", "", Ue.value].join("	"));
      const t = [ge.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function ql(i) {
      const t = [ge.join(","), ke(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_") + "_" + String(i.warehouse || "").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "stock_vs_gl_item_" + n + ".csv");
    }
    function Bl() {
      var n, r;
      if (!((r = (n = ss.value) == null ? void 0 : n.items) != null && r.length)) return;
      const i = We.value.map((p) => ke(p).join(","));
      i.push(["Total", "", "", "", Ue.value].join(","));
      const t = [ge.join(","), ...i].join(`
`);
      gs(t, "stock_vs_gl_items_" + y.value + ".csv");
    }
    const xs = v(null), Ke = v(!1), Xa = v(!1), oe = v(null), Ge = v(!1), so = v(!1), Ye = v(""), we = v(""), fe = V(() => {
      var t;
      const i = Ye.value.trim().toLowerCase();
      return (((t = oe.value) == null ? void 0 : t.rows) || []).filter(
        (n) => (!we.value || n.warehouse === we.value) && (!i || (n.item_code || "").toLowerCase().includes(i) || (n.item_name || "").toLowerCase().includes(i))
      );
    }), Z = v(null), Je = v(!1), to = v(!1), R = v(null), Ze = v(!1), eo = v(!1), ys = v("summary"), bt = v(0), Al = [
      { key: "summary", label: "Sales Summary" },
      { key: "target", label: "Target vs Achievement" },
      { key: "product", label: "Product-wise" },
      { key: "customer", label: "Customer-wise" },
      { key: "salesperson", label: "Salesperson-wise" },
      { key: "branch", label: "Branch / Location-wise" },
      { key: "returns", label: "Sales Return" },
      { key: "discount", label: "Discount Analysis" },
      { key: "pending", label: "Sales Order Pending" },
      { key: "conversion", label: "Sales Conversion" }
    ], ao = V(
      () => {
        var i, t;
        return bt.value ? (((t = (i = R.value) == null ? void 0 : i.summary) == null ? void 0 : t.grand_total) || 0) / bt.value * 100 : 0;
      }
    ), I = v(null), Xe = v(!1), oo = v(!1), Os = v("total"), gt = v(0), $l = [
      { key: "total", label: "Total Receivables" },
      { key: "outstanding", label: "Customer Outstanding" },
      { key: "ageing", label: "Ageing" },
      { key: "coll_target", label: "Collection Target vs Achievement" },
      { key: "daily_coll", label: "Daily Collection" },
      { key: "overdue", label: "Overdue Collection" },
      { key: "credit", label: "Credit Limit & Utilisation" },
      { key: "efficiency", label: "Collection Efficiency" }
    ], lo = V(
      () => {
        var i, t;
        return gt.value ? (((t = (i = I.value) == null ? void 0 : i.daily_collection) == null ? void 0 : t.total) || 0) / gt.value * 100 : 0;
      }
    ), q = v(null), sa = v(!1), no = v(!1), Rs = v("summary"), kt = v(0), Ll = [
      { key: "summary", label: "Purchase Summary" },
      { key: "supplier", label: "Supplier-wise" },
      { key: "product", label: "Product-wise" },
      { key: "target", label: "Target / Budget vs Actual" },
      { key: "price_variance", label: "Price Variance" },
      { key: "pending_po", label: "Pending Purchase Orders" },
      { key: "pending_receipts", label: "Pending Material Receipts" },
      { key: "returns", label: "Purchase Return" }
    ], io = V(
      () => {
        var i, t;
        return kt.value ? (((t = (i = q.value) == null ? void 0 : i.summary) == null ? void 0 : t.grand_total) || 0) / kt.value * 100 : 0;
      }
    ), O = v(null), ta = v(!1), ro = v(!1), hs = v("current_stock"), Ql = [
      { key: "current_stock", label: "Current Stock" },
      { key: "stock_value", label: "Stock Value" },
      { key: "fast_moving", label: "Fast Moving Items" },
      { key: "slow_moving", label: "Slow Moving Items" },
      { key: "dead_stock", label: "Non-moving / Dead Stock" },
      { key: "ageing", label: "Stock Ageing" },
      { key: "reorder", label: "Reorder / Low Stock" },
      { key: "excess", label: "Excess Stock" },
      { key: "adjustment", label: "Stock Adjustment" },
      { key: "loss", label: "Stock Loss / Shortage" }
    ], T = v(null), ea = v(!1), uo = v(!1), bs = v("plan_vs_actual"), Fl = [
      { key: "plan_vs_actual", label: "Production Plan vs Actual" },
      { key: "pending", label: "Production Pending" },
      { key: "wip", label: "WIP Status" },
      { key: "material_availability", label: "Raw Material Availability" },
      { key: "material_consumption", label: "Material Consumption" },
      { key: "material_variance", label: "Material Variance" },
      { key: "production_cost", label: "Production Cost" },
      { key: "efficiency", label: "Production Efficiency" },
      { key: "rejection", label: "Rejection / Rework" },
      { key: "scrap", label: "Scrap / Wastage" }
    ], A = v(null), aa = v(!1), co = v(!1), Cs = v("sales"), Hl = [
      { key: "sales", label: "Product-wise Sales" },
      { key: "profit", label: "Product-wise Profit" },
      { key: "cost", label: "Product-wise Cost" },
      { key: "margin", label: "Product-wise Margin %" },
      { key: "production", label: "Product-wise Production" },
      { key: "stock", label: "Product-wise Stock" },
      { key: "wastage", label: "Product-wise Wastage" },
      { key: "top_selling", label: "Top Selling Products" },
      { key: "low_selling", label: "Low Selling Products" }
    ], z = v(null), oa = v(!1), mo = v(!1), Us = v("summary"), zl = [
      { key: "summary", label: "Dispatch Summary" },
      { key: "pending_dispatch", label: "Pending Dispatch" },
      { key: "delivery_pending", label: "Delivery Pending" },
      { key: "delayed_delivery", label: "Delayed Delivery" },
      { key: "customer_pending", label: "Customer-wise Pending Delivery" },
      { key: "transport_wise", label: "Transport-wise Dispatch" }
    ], B = v(null), la = v(!1), vo = v(!1), vs = v("summary"), Wl = [
      { key: "summary", label: "Summary" },
      { key: "total", label: "Total Orders" },
      { key: "new", label: "New Orders" },
      { key: "pending", label: "Pending Orders" },
      { key: "under_production", label: "Orders Under Production" },
      { key: "ready_for_dispatch", label: "Orders Ready for Dispatch" },
      { key: "delayed", label: "Delayed Orders" },
      { key: "delivered", label: "Delivered Orders" },
      { key: "cancelled", label: "Cancelled Orders" },
      { key: "order_value", label: "Order Value" },
      { key: "profitability", label: "Order-wise Profitability" }
    ], W = v(null), na = v(!1), _o = v(!1), Qs = v("summary"), Ul = [
      { key: "summary", label: "Summary" },
      { key: "product", label: "Product-wise Profit" },
      { key: "customer", label: "Customer-wise Profit" },
      { key: "order", label: "Order-wise Profit" },
      { key: "branch", label: "Branch-wise Profit" },
      { key: "salesperson", label: "Salesperson-wise Profit" },
      { key: "monthly_trend", label: "Monthly Profit Trend" }
    ], U = v(null), ia = v(!1), po = v(!1), Ps = v("summary"), Kl = [
      { key: "summary", label: "Total Expenses" },
      { key: "department", label: "Department-wise" },
      { key: "category", label: "Expense Category-wise" },
      { key: "budget", label: "Budget vs Actual" },
      { key: "fixed", label: "Fixed Expenses" },
      { key: "variable", label: "Variable Expenses" },
      { key: "trend", label: "Expense Trend" },
      { key: "unusual", label: "Unusual / Excess" }
    ], X = v(null), da = v(!1), yo = v(!1), Fs = v("summary"), Gl = [
      { key: "summary", label: "Supplier Outstanding" },
      { key: "ageing", label: "Payable Ageing" },
      { key: "overdue", label: "Overdue Payables" },
      { key: "due_week", label: "Due This Week" },
      { key: "due_month", label: "Due This Month" },
      { key: "supplier", label: "Supplier-wise Outstanding" },
      { key: "forecast", label: "Payment Due Forecast" }
    ], E = v(null), ra = v(!1), ho = v(!1), Is = v("cash_position"), Yl = [
      { key: "cash_position", label: "Cash Position" },
      { key: "bank_balance", label: "Bank Balance" },
      { key: "daily_cash", label: "Daily Cash Flow" },
      { key: "daily_bank", label: "Daily Bank Movement" },
      { key: "receipts", label: "Receipts" },
      { key: "payments", label: "Payments" },
      { key: "forecast", label: "Cash Forecast" },
      { key: "fund_requirement", label: "Fund Requirement" }
    ], M = v(null), ua = v(!1), bo = v(!1), Ss = v("new_customers"), Jl = [
      { key: "new_customers", label: "New Customers" },
      { key: "active_customers", label: "Active Customers" },
      { key: "repeat_customers", label: "Repeat Customers" },
      { key: "customer_wise_sales", label: "Customer-wise Sales" },
      { key: "customer_wise_outstanding", label: "Customer-wise Outstanding" },
      { key: "customer_wise_profit", label: "Customer-wise Profit" },
      { key: "customer_retention", label: "Customer Retention" },
      { key: "top_customers", label: "Top Customers" },
      { key: "inactive_customers", label: "Inactive Customers" }
    ], $ = v(null), ca = v(!1), go = v(!1), Hs = v("supplier_wise_purchase"), Zl = [
      { key: "supplier_wise_purchase", label: "Supplier-wise Purchase" },
      { key: "supplier_outstanding", label: "Supplier Outstanding" },
      { key: "supplier_payment_ageing", label: "Supplier Payment Ageing" },
      { key: "purchase_price_comparison", label: "Purchase Price Comparison" },
      { key: "supplier_performance", label: "Supplier Performance" },
      { key: "delivery_performance", label: "Delivery Performance" },
      { key: "quality_rejection", label: "Quality / Rejection" }
    ], L = v(null), ma = v(!1), ko = v(!1), Vs = v("employee_attendance"), Xl = [
      { key: "employee_attendance", label: "Employee Attendance" },
      { key: "department_manpower", label: "Department-wise Manpower" },
      { key: "salesperson_target", label: "Salesperson Target vs Achievement" },
      { key: "salesperson_collection", label: "Salesperson Collection" },
      { key: "production_productivity", label: "Production Employee Productivity" },
      { key: "overtime", label: "Overtime" },
      { key: "labour_cost", label: "Labour Cost" },
      { key: "employee_performance", label: "Employee Performance" }
    ], Wt = v({});
    function va(i) {
      const t = Wt.value[i.sales_person];
      return t ? Number(i.total_amount) / t * 100 : 0;
    }
    function wo() {
      const i = ["Section", "Line", "Amount"].join(","), t = [];
      fo.value.forEach((r) => {
        t.push([r.label, "", r.total].join(",")), r.items.forEach((p) => t.push([r.label, p.label, p.value].join(",")));
      });
      const n = [i, ...t].join(`
`);
      Ws(n, "balance_sheet_" + y.value + ".csv");
    }
    const _a = V(() => {
      if (!ps.value) return !1;
      const i = Number(ps.value.total_assets) || 0, t = Number(ps.value.total_liabilities) || 0, n = Number(ps.value.total_equity) || 0;
      return Math.abs(i - (t + n)) < 1;
    }), xe = v({ assets: !0, liabilities: !0, equity: !0 });
    function sn(i) {
      xe.value[i] = !xe.value[i];
    }
    const fo = V(() => {
      const i = ps.value || {}, t = (n) => Number(n) || 0;
      return [
        {
          key: "assets",
          label: "Assets",
          desc: "What the business owns",
          total: t(i.total_assets),
          cls: "bs-acc-assets",
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
          items: [
            {
              label: "Current Assets",
              desc: "Cash, Bank, Debtors, Stock, etc.",
              value: t(i.cash_and_bank) + t(i.receivables) + t(i.inventory_value),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/><circle cx="7" cy="14.5" r="1"/></svg>'
            },
            {
              label: "Non-Current Assets",
              desc: "Fixed Assets, Investments, etc.",
              value: t(i.other_assets) + t(i.itc_receivable),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-6h6v6"/></svg>'
            }
          ]
        },
        {
          key: "liabilities",
          label: "Liabilities",
          desc: "What the business owes",
          total: t(i.total_liabilities),
          cls: "bs-acc-liabilities",
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
          items: [
            {
              label: "Current Liabilities",
              desc: "Creditors, Short-term Loans, etc.",
              value: t(i.payables) + t(i.gst_liability) + t(i.stock_received_not_billed),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 20c.2-2.3 1.9-4 4-4"/></svg>'
            },
            {
              label: "Non-Current Liabilities",
              desc: "Long-term Loans, Provisions, etc.",
              value: t(i.other_liabilities),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l3 3v17H6z"/><path d="M15 2v3h3"/><path d="M9 12h6M9 16h6"/></svg>'
            }
          ]
        },
        {
          key: "equity",
          label: "Equity",
          desc: "Owner's interest in the business",
          total: t(i.total_equity),
          cls: "bs-acc-equity",
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg>',
          items: [
            {
              label: "Capital",
              desc: "",
              value: t(i.equity_capital),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>'
            },
            {
              label: "Retained Earnings",
              desc: "",
              value: t(i.retained_earnings),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 3"/></svg>'
            }
          ]
        }
      ];
    }), xo = V(() => Math.max(...Ds.value.flatMap((i) => [i.income || 0, i.expense || 0]), 1));
    function Co(i) {
      return Math.round(Math.max(0, i) / xo.value * 130);
    }
    const tn = V(() => {
      const i = xo.value;
      return [i, i * 0.66, i * 0.33, 0].map((t) => Math.round(t));
    });
    function P(i) {
      return i ? (/* @__PURE__ */ new Date(i + "T00:00:00")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    }
    const Ut = v("monthly");
    function pa(i, t) {
      return t == null || i == null ? null : t === 0 ? i === 0 ? 0 : null : (i - t) / Math.abs(t) * 100;
    }
    const wt = V(() => Ds.value.length > 1 ? Ds.value[Ds.value.length - 2] : null), ft = V(() => Ds.value.length ? Ds.value[Ds.value.length - 1] : null), So = V(() => ft.value && wt.value ? pa(ft.value.income, wt.value.income) : null), jo = V(() => ft.value && wt.value ? pa(ft.value.expense, wt.value.expense) : null), Mo = V(() => !ft.value || !wt.value ? null : pa((ft.value.income || 0) - (ft.value.expense || 0), (wt.value.income || 0) - (wt.value.expense || 0)));
    function ya(i, t) {
      if (i === null) return "muted";
      if (i === 0) return "neutral";
      const n = i > 0;
      return (t ? !n : n) ? "up" : "down";
    }
    function ha(i) {
      return i === null || i === 0 ? "— No change" : `${i > 0 ? "↑" : "↓"} ${Math.abs(Math.round(i))}% vs previous period`;
    }
    const en = V(() => {
      if (!as.value) return [];
      const i = [];
      return Number(as.value.total_expense) > Number(as.value.total_income) && i.push({ icon: "↗", tone: "warn", title: "Expenses are higher", desc: "Your expenses are higher than income in this period." }), Number(as.value.net_profit) < 0 ? i.push({ icon: "↘", tone: "loss", title: "Net loss", desc: `You had a net loss of ${S(Math.abs(as.value.net_profit))} in the selected period.` }) : Number(as.value.net_profit) > 0 && i.push({ icon: "↗", tone: "good", title: "Net profit", desc: `You made a net profit of ${S(as.value.net_profit)} in the selected period.` }), i;
    }), xt = V(() => cs.value.filter((i) => i.cost_rate).reduce((i, t) => i + Number(t.profit || 0), 0)), Ce = V(() => {
      const i = cs.value.filter((r) => r.cost_rate), t = i.reduce((r, p) => r + Number(p.revenue || 0), 0), n = i.reduce((r, p) => r + Number(p.profit || 0), 0);
      return t !== 0 ? n / t * 100 : 0;
    }), Kt = V(() => cs.value.filter((i) => !i.cost_rate).length), Ct = v(!1), Gt = v(null), Xs = v({ key: "", dir: "asc" }), ba = V(() => {
      const i = [...cs.value || []], t = Xs.value.key;
      if (!t) return i;
      const n = Xs.value.dir === "desc" ? -1 : 1, r = (p) => t === "item" ? String(p.item_name || p.item_code || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function St(i) {
      Xs.value.key === i ? Xs.value = { key: i, dir: Xs.value.dir === "asc" ? "desc" : "asc" } : Xs.value = { key: i, dir: "asc" };
    }
    function jt(i) {
      return Xs.value.key !== i ? "" : Xs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Se = ["Item", "Qty Sold", "Revenue", "Cost Rate", "Total Cost", "Profit", "Margin %"];
    function je(i) {
      return [i.item_name || i.item_code, i.qty_sold, i.revenue, i.cost_rate, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function an() {
      var n;
      const i = ba.value.map((r) => je(r).join("	")), t = [Se.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function on(i) {
      var n;
      const t = [Se.join("	"), je(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function ln(i) {
      const t = [Se.join(","), je(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "profit_wise_report_" + n + "_" + C.value + "_to_" + y.value + ".csv");
    }
    const Mt = V(
      () => ds.value.filter((i) => Ts.value.has(i.invoice))
    ), Do = V(
      () => ds.value.length > 0 && Ts.value.size === ds.value.length
    );
    function nn(i) {
      const t = new Set(Ts.value);
      t.has(i) ? t.delete(i) : t.add(i), Ts.value = t;
    }
    function dn() {
      Ts.value = Do.value ? /* @__PURE__ */ new Set() : new Set(ds.value.map((i) => i.invoice));
    }
    function Yt(i, t) {
      return i.reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const is = V(() => ({
      revenue: Yt(ds.value, "revenue"),
      total_cost: Yt(ds.value, "total_cost"),
      profit: Yt(ds.value, "profit")
    })), le = V(() => ({
      count: Mt.value.length,
      revenue: Yt(Mt.value, "revenue"),
      total_cost: Yt(Mt.value, "total_cost"),
      profit: Yt(Mt.value, "profit")
    })), Dt = v(!1), Tt = v(null), st = v({ key: "", dir: "asc" }), ga = V(() => {
      const i = [...ds.value || []], t = st.value.key;
      if (!t) return i;
      const n = st.value.dir === "desc" ? -1 : 1, r = (p) => t === "invoice" || t === "posting_date" ? String(p[t] || "") : t === "customer" ? String(p.customer_name || p.customer || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function Ot(i) {
      st.value.key === i ? st.value = { key: i, dir: st.value.dir === "asc" ? "desc" : "asc" } : st.value = { key: i, dir: "asc" };
    }
    function Rt(i) {
      return st.value.key !== i ? "" : st.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Me = ["Invoice", "Date", "Customer", "Revenue", "Est. Cost", "Profit", "Margin %"];
    function De(i) {
      return [i.invoice, i.posting_date, i.customer_name || i.customer, i.revenue, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function rn() {
      var n;
      const i = (Ts.value.size ? Mt.value : ga.value).map((r) => De(r).join("	")), t = [Me.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function un(i) {
      var n;
      const t = [Me.join("	"), De(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function cn(i) {
      const t = [Me.join(","), De(i).join(",")].join(`
`);
      gs(t, "invoice_profitability_" + i.invoice + ".csv");
    }
    async function mn() {
      if (Bs[k.value]) {
        await ja();
        return;
      }
      if (!["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) && C.value && y.value && C.value > y.value) {
        alert("From date cannot be after To date.");
        return;
      }
      const t = await Mn(), n = { company: t, from_date: C.value || "", to_date: y.value || "" };
      if (k.value === "pl") {
        await _l(n);
        try {
          Ds.value = await K("psd_books.db.queries.get_pl_monthly_breakdown", n) || [];
        } catch {
          Ds.value = [];
        }
      }
      if (k.value === "bs" && await yl({ company: t, as_of_date: y.value }), k.value === "cf") {
        await bl(n);
        try {
          const r = Tl(C.value, y.value), p = await Promise.all(r.map(
            (j) => K("psd_books.db.queries.get_cash_flow", { company: t, from_date: j.from, to_date: j.to })
          ));
          se.value = r.map((j, D) => ({ month: j.month, ...p[D] || {} }));
        } catch {
          se.value = [];
        }
      }
      if (k.value === "gst" && await kl(n), k.value === "tb" && await fl(n), k.value === "ar") {
        qe.value = !0, Qa.value = !0;
        try {
          rs.value = await K("psd_books.db.queries.get_ar_aging", { company: t, as_of_date: y.value }) || [];
        } catch {
          rs.value = [];
        }
        qe.value = !1;
      }
      if (k.value === "ap") {
        Be.value = !0, Fa.value = !0;
        try {
          us.value = await K("psd_books.db.queries.get_ap_aging", { company: t, as_of_date: y.value }) || [];
        } catch {
          us.value = [];
        }
        Be.value = !1;
      }
      if (k.value === "items") {
        Ae.value = !0, Ha.value = !0;
        try {
          $s.value = await K("psd_books.db.queries.get_item_wise_sales", n) || [];
        } catch {
          $s.value = [];
        }
        Ae.value = !1;
      }
      if (k.value === "customers") {
        $e.value = !0, za.value = !0;
        try {
          Ls.value = await K("psd_books.db.queries.get_customer_wise_sales", n) || [];
        } catch {
          Ls.value = [];
        }
        $e.value = !1;
      }
      if (k.value === "profit") {
        Le.value = !0, Wa.value = !0;
        try {
          cs.value = await K("psd_books.db.queries.get_profit_wise_report", n) || [];
        } catch {
          cs.value = [];
        }
        Le.value = !1;
      }
      if (k.value === "invoice_profit") {
        Qe.value = !0, Ua.value = !0, Ts.value = /* @__PURE__ */ new Set();
        try {
          ds.value = await K("psd_books.db.queries.get_invoice_wise_profit", n) || [];
        } catch {
          ds.value = [];
        }
        Qe.value = !1;
      }
      if (k.value === "stockgl") {
        ze.value = !0, Ga.value = !0;
        try {
          ss.value = await K("psd_books.db.queries.get_inventory_reconciliation", { company: t }) || null;
        } catch {
          ss.value = null;
        }
        ze.value = !1;
      }
      if (k.value === "stockval") {
        Ke.value = !0, Xa.value = !0;
        try {
          xs.value = await K("psd_books.api.inventory.get_stock_valuation_report", { as_of_date: y.value }) || null;
        } catch {
          xs.value = null;
        }
        Ke.value = !1;
      }
      if (k.value === "price_mrp") {
        Ge.value = !0, so.value = !0;
        try {
          oe.value = await K("psd_books.api.inventory.get_selling_mrp_report", {}) || null;
        } catch {
          oe.value = null;
        }
        Ge.value = !1;
      }
      if (k.value === "mis") {
        Je.value = !0, to.value = !0;
        try {
          Z.value = await K("psd_books.db.queries.get_daily_business_mis", n) || null;
        } catch {
          Z.value = null;
        }
        Je.value = !1;
      }
      if (k.value === "sales_mis") {
        Ze.value = !0, eo.value = !0;
        try {
          R.value = await K("psd_books.db.queries.get_sales_mis", n) || null;
        } catch {
          R.value = null;
        }
        Ze.value = !1;
      }
      if (k.value === "receivables") {
        Xe.value = !0, oo.value = !0;
        try {
          I.value = await K("psd_books.db.queries.get_receivables_mis", n) || null;
        } catch {
          I.value = null;
        }
        Xe.value = !1;
      }
      if (k.value === "purchase_mis") {
        sa.value = !0, no.value = !0;
        try {
          q.value = await K("psd_books.db.queries.get_purchase_mis", n) || null;
        } catch {
          q.value = null;
        }
        sa.value = !1;
      }
      if (k.value === "inventory_mis") {
        ta.value = !0, ro.value = !0;
        try {
          O.value = await K("psd_books.db.queries.get_inventory_mis", n) || null;
        } catch {
          O.value = null;
        }
        ta.value = !1;
      }
      if (k.value === "production_mis") {
        ea.value = !0, uo.value = !0;
        try {
          T.value = await K("psd_books.db.queries.get_production_mis", n) || null;
        } catch {
          T.value = null;
        }
        ea.value = !1;
      }
      if (k.value === "product_mis") {
        aa.value = !0, co.value = !0;
        try {
          A.value = await K("psd_books.db.queries.get_product_mis", n) || null;
        } catch {
          A.value = null;
        }
        aa.value = !1;
      }
      if (k.value === "dispatch_mis") {
        oa.value = !0, mo.value = !0;
        try {
          z.value = await K("psd_books.db.queries.get_dispatch_delivery_mis", n) || null;
        } catch {
          z.value = null;
        }
        oa.value = !1;
      }
      if (k.value === "order_mis") {
        la.value = !0, vo.value = !0;
        try {
          B.value = await K("psd_books.db.queries.get_order_mis", n) || null;
        } catch {
          B.value = null;
        }
        la.value = !1;
      }
      if (k.value === "profitability_mis") {
        na.value = !0, _o.value = !0;
        try {
          W.value = await K("psd_books.db.queries.get_profitability_mis", n) || null;
        } catch {
          W.value = null;
        }
        na.value = !1;
      }
      if (k.value === "expense_mis") {
        ia.value = !0, po.value = !0;
        try {
          U.value = await K("psd_books.db.queries.get_expense_mis", n) || null;
        } catch {
          U.value = null;
        }
        ia.value = !1;
      }
      if (k.value === "payables_mis") {
        da.value = !0, yo.value = !0;
        try {
          X.value = await K("psd_books.db.queries.get_payables_mis", { company: t, as_of_date: y.value }) || null;
        } catch {
          X.value = null;
        }
        da.value = !1;
      }
      if (k.value === "cash_bank_mis") {
        ra.value = !0, ho.value = !0;
        try {
          E.value = await K("psd_books.db.queries.get_cash_bank_mis", n) || null;
        } catch {
          E.value = null;
        }
        ra.value = !1;
      }
      if (k.value === "customer_mis") {
        ua.value = !0, bo.value = !0;
        try {
          M.value = await K("psd_books.db.queries.get_customer_mis", n) || null;
        } catch {
          M.value = null;
        }
        ua.value = !1;
      }
      if (k.value === "supplier_mis") {
        ca.value = !0, go.value = !0;
        try {
          $.value = await K("psd_books.db.queries.get_supplier_mis", n) || null;
        } catch {
          $.value = null;
        }
        ca.value = !1;
      }
      if (k.value === "employee_mis") {
        ma.value = !0, ko.value = !0;
        try {
          L.value = await K("psd_books.db.queries.get_employee_mis", n) || null;
        } catch {
          L.value = null;
        }
        ma.value = !1;
      }
    }
    const Pt = v(!1), Jt = v(null), tt = v({ key: "", dir: "asc" }), zs = V(() => ($s.value || []).reduce((i, t) => ({
      invoices: i.invoices + (Number(t.invoice_count) || 0),
      qty: i.qty + (Number(t.qty_sold) || 0),
      discount: i.discount + (Number(t.total_discount) || 0),
      amount: i.amount + (Number(t.total_amount) || 0)
    }), { invoices: 0, qty: 0, discount: 0, amount: 0 })), ka = V(() => {
      const i = [...$s.value || []], t = tt.value.key;
      if (!t) return i;
      const n = tt.value.dir === "desc" ? -1 : 1, r = (p) => t === "item" ? String(p.item_name || p.item_code || "").toLowerCase() : t === "uom" ? String(p.uom || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function It(i) {
      tt.value.key === i ? tt.value = { key: i, dir: tt.value.dir === "asc" ? "desc" : "asc" } : tt.value = { key: i, dir: "asc" };
    }
    function Vt(i) {
      return tt.value.key !== i ? "" : tt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Te = ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Discount", "Total Amount"];
    function Oe(i) {
      return [i.item_name || i.item_code, i.uom || "", i.invoice_count, i.qty_sold, i.avg_rate, i.total_discount || 0, i.total_amount];
    }
    function gs(i, t) {
      Ws(i, t);
    }
    function vn() {
      var r;
      const i = ka.value.map((p) => Oe(p).join("	")), t = zs.value;
      i.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join("	"));
      const n = [Te.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function _n(i) {
      var n;
      const t = [Te.join("	"), Oe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function pn(i) {
      const t = [Te.join(","), Oe(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "item_wise_sales_" + n + "_" + C.value + "_to_" + y.value + ".csv");
    }
    function wa() {
      var r;
      if (!((r = $s.value) != null && r.length)) return;
      const i = ka.value.map((p) => Oe(p).join(",")), t = zs.value;
      i.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join(","));
      const n = [Te.join(","), ...i].join(`
`);
      gs(n, "item_wise_sales_" + C.value + "_to_" + y.value + ".csv");
    }
    const Nt = v(!1), Zt = v(null), et = v({ key: "", dir: "asc" }), _s = V(() => (Ls.value || []).reduce((i, t) => ({
      invoices: i.invoices + (Number(t.invoice_count) || 0),
      net: i.net + (Number(t.net_total) || 0),
      discount: i.discount + (Number(t.total_discount) || 0),
      tax: i.tax + (Number(t.total_tax) || 0),
      outstanding: i.outstanding + (Number(t.outstanding_amount) || 0),
      amount: i.amount + (Number(t.total_amount) || 0)
    }), { invoices: 0, net: 0, discount: 0, tax: 0, outstanding: 0, amount: 0 })), fa = V(() => {
      const i = [...Ls.value || []], t = et.value.key;
      if (!t) return i;
      const n = et.value.dir === "desc" ? -1 : 1, r = (p) => t === "customer" ? String(p.customer_name || p.customer || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), N = r(j);
        return typeof D == "string" ? n * D.localeCompare(N) : n * (D - N);
      }), i;
    });
    function at(i) {
      et.value.key === i ? et.value = { key: i, dir: et.value.dir === "asc" ? "desc" : "asc" } : et.value = { key: i, dir: "asc" };
    }
    function ot(i) {
      return et.value.key !== i ? "" : et.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Re = ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Avg Invoice", "Outstanding", "Total Amount"];
    function Pe(i) {
      return [i.customer_name || i.customer, i.invoice_count, i.net_total, i.total_discount || 0, i.total_tax, i.avg_invoice_value, i.outstanding_amount || 0, i.total_amount];
    }
    function yn() {
      var r;
      const i = fa.value.map((p) => Pe(p).join("	")), t = _s.value;
      i.push(["Total", t.invoices, t.net, t.discount, t.tax, "", t.outstanding, t.amount].join("	"));
      const n = [Re.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function hn(i) {
      var n;
      const t = [Re.join("	"), Pe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function bn(i) {
      const t = [Re.join(","), Pe(i).join(",")].join(`
`), n = String(i.customer || i.customer_name || "customer").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "customer_wise_sales_" + n + "_" + C.value + "_to_" + y.value + ".csv");
    }
    function xa() {
      var p;
      if (!((p = Ls.value) != null && p.length)) return;
      const i = Re.join(","), t = fa.value.map((j) => Pe(j).join(",")), n = _s.value;
      t.push(["Total", n.invoices, n.net, n.discount, n.tax, "", n.outstanding, n.amount].join(","));
      const r = [i, ...t].join(`
`);
      Ws(r, "customer_wise_sales_" + C.value + "_to_" + y.value + ".csv");
    }
    function Ca() {
      var n;
      if (!((n = cs.value) != null && n.length)) return;
      const i = ba.value.map((r) => je(r).join(",")), t = [Se.join(","), ...i].join(`
`);
      gs(t, "profit_wise_report_" + C.value + "_to_" + y.value + ".csv");
    }
    function Sa() {
      var r;
      if (!((r = ds.value) != null && r.length)) return;
      const t = (Mt.value.length ? Mt.value : ga.value).map((p) => De(p).join(",")), n = [Me.join(","), ...t].join(`
`);
      gs(n, "invoice_profitability_" + C.value + "_to_" + y.value + ".csv");
    }
    function To() {
      var p, j;
      const i = ["Warehouse", "Stock Value", "% of Total"].join(","), t = ((p = xs.value) == null ? void 0 : p.grand_total) || 0, n = (((j = xs.value) == null ? void 0 : j.by_warehouse) || []).map(
        (D) => [D.warehouse, D.stock_value, t ? (D.stock_value / t * 100).toFixed(1) : "0"].join(",")
      ), r = [i, ...n].join(`
`);
      Ws(r, "stock_valuation_summary_" + y.value + ".csv");
    }
    function Oo() {
      const i = (t) => '"' + String(t ?? "").replace(/"/g, '""') + '"';
      b(
        ["Item Code", "Item Name", "Warehouse", "Stock Qty", "UOM", "Selling Price", "MRP"],
        fe.value.map((t) => [i(t.item_code), i(t.item_name), i(t.warehouse), t.qty, i(t.uom), t.selling_price, t.mrp].join(",")),
        "selling_price_mrp_" + y.value + ".csv"
      );
    }
    function Ro() {
      var r;
      const i = ["Date", "Sales", "Collection", "Purchase", "Expenses", "Dispatch Qty", "Production Qty", "Stock In", "Stock Out", "Outstanding"].join(","), t = (((r = Z.value) == null ? void 0 : r.days) || []).map(
        (p) => [p.date, p.sales_amount, p.collection_amount, p.purchase_amount, p.expense_amount, p.dispatch_qty, p.production_qty, p.stock_inward_qty, p.stock_outward_qty, p.outstanding].join(",")
      ), n = [i, ...t].join(`
`);
      Ws(n, "daily_business_mis_" + C.value + "_to_" + y.value + ".csv");
    }
    function b(i, t, n) {
      const r = [i.join(","), ...t].join(`
`);
      Ws(r, n);
    }
    function Po() {
      if (!R.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = ys.value;
      if (t === "product")
        b(
          ["Item", "UOM", "Invoices", "Qty Sold", "Discount", "Amount"],
          R.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.total_discount || 0, n.total_amount].join(",")),
          "sales_mis_product_wise_" + i
        );
      else if (t === "customer")
        b(
          ["Customer", "Invoices", "Amount", "Outstanding"],
          R.value.customer_wise.map((n) => [n.customer_name || n.customer, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "sales_mis_customer_wise_" + i
        );
      else if (t === "salesperson")
        b(
          ["Salesperson", "Invoices", "Amount"],
          R.value.salesperson_wise.map((n) => [n.sales_person, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_salesperson_wise_" + i
        );
      else if (t === "branch")
        b(
          ["Branch / Cost Center", "Invoices", "Amount"],
          R.value.branch_wise.map((n) => [n.branch, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_branch_wise_" + i
        );
      else if (t === "returns")
        b(
          ["Credit Note", "Date", "Customer", "Against Invoice", "Amount", "Reason"],
          R.value.sales_return.rows.map((n) => [n.credit_note, n.posting_date, n.customer_name || n.customer, n.return_against || "", n.grand_total, (n.reason || "").replace(/,/g, " ")].join(",")),
          "sales_mis_returns_" + i
        );
      else if (t === "discount")
        b(
          ["Customer", "Line Discount", "Header Discount", "Net Amount"],
          R.value.discount_analysis.by_customer.map((n) => [n.customer_name || n.customer, n.line_discount || 0, n.header_discount || 0, n.net_amount].join(",")),
          "sales_mis_discount_by_customer_" + i
        );
      else if (t === "pending")
        b(
          ["Sales Order", "Date", "Customer", "Status", "Order Value", "Billed", "Pending"],
          R.value.sales_order_pending.rows.map((n) => [n.sales_order, n.transaction_date, n.customer_name || n.customer, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "sales_mis_order_pending_" + i
        );
      else {
        const n = R.value.summary;
        b(["Metric", "Value"], [
          ["Invoices", n.invoice_count].join(","),
          ["Net Sales", n.net_sales].join(","),
          ["Total Tax", n.total_tax].join(","),
          ["Discount", n.header_discount].join(","),
          ["Grand Total", n.grand_total].join(","),
          ["Qty Sold", n.total_qty].join(","),
          ["Avg Invoice Value", n.avg_invoice_value].join(",")
        ], "sales_mis_summary_" + i);
      }
    }
    function Io() {
      if (!I.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Os.value;
      t === "ageing" ? b(
        ["Customer", "0-30", "31-60", "61-90", "90+", "Total"],
        I.value.ageing.map((n) => [n.customer_name || n.customer, n.days_0_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "receivables_ageing_" + y.value + ".csv"
      ) : t === "daily_coll" ? b(
        ["Date", "Payments", "Amount"],
        I.value.daily_collection.days.map((n) => [n.date, n.count, n.amount].join(",")),
        "receivables_daily_collection_" + i
      ) : t === "overdue" ? b(
        ["Invoice", "Customer", "Due Date", "Overdue Days", "Outstanding"],
        I.value.overdue.rows.map((n) => [n.invoice, n.customer_name || n.customer, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "receivables_overdue_" + y.value + ".csv"
      ) : t === "credit" ? b(
        ["Customer", "Credit Limit", "Outstanding", "Utilisation %"],
        I.value.credit_utilisation.map((n) => [n.customer_name || n.customer, n.credit_limit || 0, n.outstanding_amount, n.utilisation_pct != null ? n.utilisation_pct.toFixed(1) : ""].join(",")),
        "receivables_credit_utilisation_" + y.value + ".csv"
      ) : b(
        ["Customer", "Open Invoices", "Oldest Due Date", "Outstanding"],
        I.value.customer_outstanding.map((n) => [n.customer_name || n.customer, n.invoice_count, n.oldest_due_date || "", n.outstanding_amount].join(",")),
        "receivables_customer_outstanding_" + y.value + ".csv"
      );
    }
    function Vo() {
      if (!q.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Rs.value;
      if (t === "supplier")
        b(
          ["Supplier", "Bills", "Amount", "Outstanding"],
          q.value.supplier_wise.map((n) => [n.supplier_name || n.supplier, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "purchase_mis_supplier_wise_" + i
        );
      else if (t === "product")
        b(
          ["Item", "UOM", "Bills", "Qty Purchased", "Discount", "Amount"],
          q.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_purchased, n.total_discount || 0, n.total_amount].join(",")),
          "purchase_mis_product_wise_" + i
        );
      else if (t === "price_variance")
        b(
          ["Item", "Qty Purchased", "Actual Rate", "Standard Rate", "Variance", "Variance %"],
          q.value.price_variance.map((n) => [
            n.item_name || n.item_code,
            n.qty_purchased,
            n.actual_rate,
            n.has_standard_rate ? n.standard_rate : "Not set",
            n.has_standard_rate ? n.variance : "",
            n.has_standard_rate ? n.variance_pct.toFixed(1) : ""
          ].join(",")),
          "purchase_mis_price_variance_" + i
        );
      else if (t === "pending_po")
        b(
          ["Purchase Order", "Date", "Supplier", "Status", "Order Value", "Billed", "Pending"],
          q.value.pending_purchase_orders.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "purchase_mis_pending_po_" + y.value + ".csv"
        );
      else if (t === "pending_receipts")
        b(
          ["Purchase Order", "Date", "Supplier", "Status", "Ordered Qty", "Received Qty", "Pending Qty"],
          q.value.pending_material_receipts.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.ordered_qty, n.received_qty || 0, n.pending_qty].join(",")),
          "purchase_mis_pending_receipts_" + y.value + ".csv"
        );
      else if (t === "returns")
        b(
          ["Debit Note", "Date", "Supplier", "Against Bill", "Amount"],
          q.value.purchase_return.rows.map((n) => [n.debit_note, n.posting_date, n.supplier_name || n.supplier, n.return_against || "", n.grand_total].join(",")),
          "purchase_mis_returns_" + i
        );
      else {
        const n = q.value.summary;
        b(["Metric", "Value"], [
          ["Bills", n.invoice_count].join(","),
          ["Net Purchases", n.net_purchases].join(","),
          ["Total Tax", n.total_tax].join(","),
          ["Discount Received", n.header_discount].join(","),
          ["Grand Total", n.grand_total].join(","),
          ["Qty Purchased", n.total_qty].join(","),
          ["Avg Bill Value", n.avg_invoice_value].join(",")
        ], "purchase_mis_summary_" + i);
      }
    }
    function No() {
      if (!O.value) return;
      const i = y.value + ".csv", t = hs.value;
      t === "current_stock" ? b(
        ["Item", "Warehouse", "UOM", "Qty", "Rate", "Value"],
        O.value.current_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.uom || "", n.actual_qty, n.valuation_rate, n.stock_value].join(",")),
        "inventory_mis_current_stock_" + i
      ) : t === "stock_value" ? b(
        ["Warehouse", "Items", "Qty", "Stock Value"],
        O.value.stock_value.by_warehouse.map((n) => [n.warehouse, n.item_count, n.total_qty, n.stock_value].join(",")),
        "inventory_mis_stock_value_" + i
      ) : t === "fast_moving" ? b(
        ["Item", "Qty Consumed", "Transactions", "Current Qty"],
        O.value.fast_moving.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.current_qty].join(",")),
        "inventory_mis_fast_moving_" + C.value + "_to_" + y.value + ".csv"
      ) : t === "slow_moving" ? b(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        O.value.slow_moving.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "", n.days_since_movement].join(",")),
        "inventory_mis_slow_moving_" + i
      ) : t === "dead_stock" ? b(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        O.value.dead_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "Never", n.days_since_movement ?? ""].join(",")),
        "inventory_mis_dead_stock_" + i
      ) : t === "ageing" ? b(
        ["Item", "Warehouse", "Qty", "Stock Value", "Last Receipt", "Age (Days)"],
        O.value.stock_ageing.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.stock_value, n.last_receipt_date || "Never", n.age_days ?? ""].join(",")),
        "inventory_mis_ageing_" + i
      ) : t === "reorder" ? b(
        ["Item", "Warehouse", "Qty on Hand", "Reorder Level", "Reorder Qty", "Shortage"],
        O.value.reorder_low_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.reorder_level, n.reorder_qty, n.shortage_qty].join(",")),
        "inventory_mis_reorder_" + i
      ) : t === "excess" ? b(
        ["Item", "Qty on Hand", "Avg Daily Consumption", "Days of Cover", "Excess Qty", "Excess Value"],
        O.value.excess_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.avg_daily_consumption, n.days_of_cover, n.excess_qty, n.excess_value].join(",")),
        "inventory_mis_excess_stock_" + i
      ) : t === "adjustment" ? b(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty", "Rate", "Value", "Reason"],
        O.value.stock_adjustment.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.rate, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_adjustment_" + C.value + "_to_" + y.value + ".csv"
      ) : t === "loss" && b(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty Lost", "Value Lost", "Reason"],
        O.value.stock_loss.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_loss_" + C.value + "_to_" + y.value + ".csv"
      );
    }
    function Eo() {
      if (!T.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = bs.value;
      t === "plan_vs_actual" ? b(
        ["Production Plan", "Date", "Item", "Planned Qty", "Produced Qty", "Variance", "Variance %"],
        T.value.plan_vs_actual.rows.map((n) => [n.production_plan, n.posting_date, n.item_name || n.item_code, n.planned_qty, n.produced_qty, n.variance_qty, n.variance_pct ?? ""].join(",")),
        "production_mis_plan_vs_actual_" + i
      ) : t === "pending" ? b(
        ["Work Order", "Item", "Status", "Qty", "Produced", "Pending", "Planned End"],
        T.value.production_pending.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.qty, n.produced_qty, n.pending_qty, n.planned_end_date || ""].join(",")),
        "production_mis_pending_" + y.value + ".csv"
      ) : t === "wip" ? b(
        ["Work Order", "Item", "Qty", "Produced", "% Complete", "WIP Warehouse", "WIP Value"],
        T.value.wip_status.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.qty, n.produced_qty, n.pct_complete, n.wip_warehouse || "", n.wip_stock_value].join(",")),
        "production_mis_wip_" + y.value + ".csv"
      ) : t === "material_availability" ? b(
        ["Work Order", "Item", "Warehouse", "Still to Issue", "Available", "Shortage"],
        T.value.raw_material_availability.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.warehouse, n.still_to_issue, n.available_qty, n.shortage_qty].join(",")),
        "production_mis_material_availability_" + y.value + ".csv"
      ) : t === "material_consumption" ? b(
        ["Item", "Qty Consumed", "Transactions", "Value Consumed"],
        T.value.material_consumption.rows.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.value_consumed].join(",")),
        "production_mis_material_consumption_" + i
      ) : t === "material_variance" ? b(
        ["Work Order", "Item", "Required Qty", "Consumed Qty", "Variance Qty", "Variance Value"],
        T.value.material_variance.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.required_qty, n.consumed_qty, n.variance_qty, n.variance_value].join(",")),
        "production_mis_material_variance_" + i
      ) : t === "production_cost" ? b(
        ["Work Order", "Item", "Produced", "Material Value", "Operating Cost", "Total Cost", "Cost/Unit", "Standard/Unit"],
        T.value.production_cost.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.produced_qty, n.material_value, n.operating_cost, n.actual_total_cost, n.actual_cost_per_unit ?? "", n.standard_cost_per_unit ?? ""].join(",")),
        "production_mis_cost_" + i
      ) : t === "efficiency" ? b(
        ["Work Order", "Item", "Status", "Planned (min)", "Actual (min)", "Efficiency %"],
        T.value.production_efficiency.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.planned_mins, n.actual_mins, n.efficiency_pct].join(",")),
        "production_mis_efficiency_" + i
      ) : t === "rejection" ? b(
        ["Job Card", "Work Order", "Operation", "Item", "Qty", "Value"],
        T.value.rejection_rework.rows.map((n) => [n.job_card, n.work_order, n.operation || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_rejection_" + i
      ) : t === "scrap" && b(
        ["Stock Entry", "Work Order", "Item", "Qty", "Value"],
        T.value.scrap_wastage.rows.map((n) => [n.stock_entry, n.work_order || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_scrap_" + i
      );
    }
    function qo() {
      if (!A.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Cs.value;
      t === "sales" ? b(
        ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Revenue"],
        A.value.product_wise_sales.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.avg_rate, n.total_amount].join(",")),
        "product_mis_sales_" + i
      ) : t === "profit" ? b(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        A.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.profit, n.margin_pct].join(",")),
        "product_mis_profit_" + i
      ) : t === "cost" ? b(
        ["Item", "Qty Sold", "Cost Rate", "Total Cost"],
        A.value.product_wise_cost.rows.map((n) => [n.item_name || n.item_code, n.qty_sold, n.cost_rate, n.total_cost].join(",")),
        "product_mis_cost_" + i
      ) : t === "margin" ? b(
        ["Item", "Revenue", "Cost", "Margin %"],
        A.value.product_wise_margin.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.margin_pct].join(",")),
        "product_mis_margin_" + i
      ) : t === "production" ? b(
        ["Item", "Qty Produced", "Value Produced", "Transactions"],
        A.value.product_wise_production.rows.map((n) => [n.item_name || n.item_code, n.qty_produced, n.value_produced, n.transactions].join(",")),
        "product_mis_production_" + i
      ) : t === "stock" ? b(
        ["Item", "UOM", "Qty on Hand", "Rate", "Stock Value"],
        A.value.product_wise_stock.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.total_qty, n.valuation_rate, n.total_value].join(",")),
        "product_mis_stock_" + y.value + ".csv"
      ) : t === "wastage" ? b(
        ["Item", "Qty Scrapped", "Value Scrapped", "Transactions"],
        A.value.product_wise_wastage.rows.map((n) => [n.item_name || n.item_code, n.qty_scrapped, n.value_scrapped, n.transactions].join(",")),
        "product_mis_wastage_" + i
      ) : t === "top_selling" ? b(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.top_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_top_selling_" + i
      ) : t === "low_selling" && b(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.low_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_low_selling_" + i
      );
    }
    function Bo() {
      if (!z.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Us.value;
      t === "pending_dispatch" ? b(
        ["Sales Order", "Order Date", "Customer", "Item", "Ordered Qty", "Pending Qty", "Pending Value"],
        z.value.pending_dispatch.rows.map((n) => [n.sales_order, n.order_date, n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_pending_dispatch_" + y.value + ".csv"
      ) : t === "delivery_pending" ? b(
        ["Sales Order", "Delivery Date", "Customer", "Item", "Ordered Qty", "Dispatched Qty", "Pending Qty"],
        z.value.delivery_pending.rows.map((n) => [n.sales_order, n.delivery_date || "", n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.delivered_qty, n.pending_qty].join(",")),
        "dispatch_mis_delivery_pending_" + y.value + ".csv"
      ) : t === "delayed_delivery" ? b(
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Item", "Pending Qty", "Pending Value"],
        z.value.delayed_delivery.rows.map((n) => [n.sales_order, n.delivery_date, n.days_overdue, n.customer_name || n.customer, n.item_name || n.item_code, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_delayed_delivery_" + y.value + ".csv"
      ) : t === "customer_pending" ? b(
        ["Customer", "Orders", "Pending Qty", "Pending Value"],
        z.value.customer_wise_pending_delivery.rows.map((n) => [n.customer_name || n.customer, n.order_count, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_customer_pending_" + y.value + ".csv"
      ) : t === "transport_wise" && b(
        ["Transporter", "Dispatches", "Customers", "Total Qty", "Total Value"],
        z.value.transport_wise_dispatch.rows.map((n) => [n.transporter_name, n.dispatch_count, n.customer_count, n.total_qty, n.total_value].join(",")),
        "dispatch_mis_transport_wise_" + i
      );
    }
    function Ao() {
      if (!B.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = vs.value, n = (r, p, j, D) => {
        b(p, B.value.summary[r].rows.map(j), "order_mis_" + D + "_" + i);
      };
      t === "total" ? n(
        "total_orders",
        ["Sales Order", "Order Date", "Delivery Date", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.delivery_date || "", r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "total_orders"
      ) : t === "new" ? n(
        "new_orders",
        ["Sales Order", "Order Date", "Customer", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.grand_total].join(","),
        "new_orders"
      ) : t === "pending" ? n(
        "pending_orders",
        ["Sales Order", "Order Date", "Delivery Date", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.delivery_date || "", r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "pending_orders"
      ) : t === "under_production" ? n(
        "under_production",
        ["Sales Order", "Order Date", "Customer", "Work Order Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.wo_statuses.join(" / "), r.grand_total].join(","),
        "under_production"
      ) : t === "ready_for_dispatch" ? n(
        "ready_for_dispatch",
        ["Sales Order", "Order Date", "Customer", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.grand_total].join(","),
        "ready_for_dispatch"
      ) : t === "delayed" ? n(
        "delayed_orders",
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.delivery_date, r.days_overdue, r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "delayed_orders"
      ) : t === "delivered" ? n(
        "delivered_orders",
        ["Sales Order", "Order Date", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "delivered_orders"
      ) : t === "cancelled" ? n(
        "cancelled_orders",
        ["Sales Order", "Order Date", "Customer", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.grand_total].join(","),
        "cancelled_orders"
      ) : t === "order_value" ? b(
        ["Status", "Orders", "Value"],
        B.value.order_value.by_status.map((r) => [r.status, r.order_count, r.total_value].join(",")),
        "order_mis_order_value_" + i
      ) : t === "profitability" && b(
        ["Sales Order", "Date", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        B.value.order_profitability.rows.map((r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.revenue, r.total_cost, r.profit, r.margin_pct].join(",")),
        "order_mis_profitability_" + i
      );
    }
    function $o() {
      if (!W.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Qs.value;
      t === "product" ? b(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_product_" + i
      ) : t === "customer" ? b(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.customer_wise_profit.rows.map((n) => [n.customer_name || n.customer, n.invoice_count, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_customer_" + i
      ) : t === "order" ? b(
        ["Sales Order", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.order_wise_profit.rows.map((n) => [n.sales_order, n.customer_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_order_" + i
      ) : t === "branch" ? b(
        ["Branch (Cost Center)", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.branch_wise_profit.rows.map((n) => [n.cost_center_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_branch_" + i
      ) : t === "salesperson" ? b(
        ["Salesperson", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.salesperson_wise_profit.rows.map((n) => [n.sales_person_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_salesperson_" + i
      ) : t === "monthly_trend" && b(
        ["Month", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.monthly_profit_trend.rows.map((n) => [n.month, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_monthly_trend_" + i
      );
    }
    function Lo() {
      if (!U.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Ps.value;
      t === "department" ? b(
        ["Department (Cost Center)", "Expenses", "Amount"],
        U.value.department_wise.rows.map((n) => [n.cost_center_name, n.count, n.amount].join(",")),
        "expense_mis_department_" + i
      ) : t === "category" ? b(
        ["Category", "Expenses", "Amount", "% of Total"],
        U.value.category_wise.rows.map((n) => [n.category_name, n.count, n.amount, n.pct_of_total.toFixed(1)].join(",")),
        "expense_mis_category_" + i
      ) : t === "budget" ? b(
        ["Cost Center", "Budget Period", "Period Budget (est.)", "Actual", "Variance", "Variance %"],
        U.value.budget_vs_actual.rows.map((n) => [n.cost_center_name, n.budget_period, n.period_budget, n.actual, n.variance, n.variance_pct.toFixed(1)].join(",")),
        "expense_mis_budget_vs_actual_" + i
      ) : t === "fixed" ? b(
        ["Category", "Expenses", "Amount"],
        U.value.fixed_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_fixed_" + i
      ) : t === "variable" ? b(
        ["Category", "Expenses", "Amount"],
        U.value.variable_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_variable_" + i
      ) : t === "trend" ? b(
        ["Month", "Expenses", "Amount"],
        U.value.expense_trend.rows.map((n) => [n.month, n.count, n.amount].join(",")),
        "expense_mis_trend_" + i
      ) : t === "unusual" && b(
        ["Expense", "Date", "Category", "Department", "Amount", "Category Avg", "Basis"],
        U.value.unusual_expenses.rows.map((n) => [n.expense, n.posting_date, n.category_name, n.cost_center_name || "", n.amount, n.category_avg, n.basis].join(",")),
        "expense_mis_unusual_" + i
      );
    }
    function Qo() {
      if (!X.value) return;
      const i = y.value + ".csv", t = Fs.value;
      t === "ageing" ? b(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        X.value.payable_ageing.rows.map((n) => [n.supplier_name, n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "payables_mis_ageing_" + i
      ) : t === "overdue" ? b(
        ["Invoice", "Supplier", "Due Date", "Overdue Days", "Outstanding"],
        X.value.overdue_payables.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "payables_mis_overdue_" + i
      ) : t === "due_week" ? b(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        X.value.due_this_week.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_week_" + i
      ) : t === "due_month" ? b(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        X.value.due_this_month.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_month_" + i
      ) : t === "supplier" ? b(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Oldest Overdue (days)"],
        X.value.supplier_wise_outstanding.rows.map((n) => [n.supplier_name, n.invoice_count, n.outstanding, n.overdue_amount, n.max_overdue_days].join(",")),
        "payables_mis_supplier_" + i
      ) : t === "forecast" && b(
        ["Bucket", "Invoices", "Amount"],
        X.value.payment_due_forecast.rows.map((n) => [n.label, n.count, n.amount].join(",")),
        "payables_mis_forecast_" + i
      );
    }
    function Fo() {
      if (!E.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Is.value;
      t === "cash_position" ? b(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.cash_position.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_cash_position_" + i
      ) : t === "bank_balance" ? b(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.bank_balance.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_bank_balance_" + i
      ) : t === "daily_cash" ? b(
        ["Date", "Receipts", "Payments", "Net", "Balance"],
        E.value.daily_cash_flow.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_cash_flow_" + i
      ) : t === "daily_bank" ? b(
        ["Date", "Deposits", "Withdrawals", "Net", "Balance"],
        E.value.daily_bank_movement.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_bank_movement_" + i
      ) : t === "receipts" ? b(
        ["Reference", "Date", "Party", "Account", "Mode", "Amount"],
        E.value.receipts.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.mode_of_payment || "", n.amount].join(",")),
        "cash_bank_mis_receipts_" + i
      ) : t === "payments" ? b(
        ["Reference", "Date", "Party", "Account", "Source", "Amount"],
        E.value.payments.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.source, n.amount].join(",")),
        "cash_bank_mis_payments_" + i
      ) : t === "forecast" ? b(
        ["Bucket", "Expected Inflow", "Expected Outflow", "Net", "Projected Balance"],
        E.value.cash_forecast.rows.map((n) => [n.label, n.inflow, n.outflow, n.net, n.projected_balance].join(",")),
        "cash_bank_mis_forecast_" + i
      ) : t === "fund_requirement" && b(
        ["Bucket", "Shortfall"],
        E.value.fund_requirement.rows.map((n) => [n.label, n.shortfall].join(",")),
        "cash_bank_mis_fund_requirement_" + i
      );
    }
    function Ho() {
      if (!M.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Ss.value, n = (r) => r.customer_name || r.customer;
      t === "new_customers" ? b(
        ["Customer", "First Invoice Date", "Invoices in Period", "Revenue in Period"],
        M.value.new_customers.rows.map((r) => [n(r), r.first_invoice_date, r.invoice_count, r.total_amount].join(",")),
        "customer_mis_new_customers_" + i
      ) : t === "active_customers" ? b(
        ["Customer", "Invoices", "Revenue", "First Invoice", "Last Invoice"],
        M.value.active_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount, r.first_invoice_in_period, r.last_invoice_in_period].join(",")),
        "customer_mis_active_customers_" + i
      ) : t === "repeat_customers" ? b(
        ["Customer", "Invoices", "Revenue"],
        M.value.repeat_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_repeat_customers_" + i
      ) : t === "customer_wise_sales" ? b(
        ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        M.value.customer_wise_sales.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "customer_mis_customer_wise_sales_" + i
      ) : t === "customer_wise_outstanding" ? b(
        ["Customer", "Invoices", "Outstanding", "Oldest Due Date", "Max Overdue Days"],
        M.value.customer_wise_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.oldest_due_date, r.max_overdue_days].join(",")),
        "customer_mis_customer_wise_outstanding_" + i
      ) : t === "customer_wise_profit" ? b(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        M.value.customer_wise_profit.rows.map((r) => [n(r), r.invoice_count, r.revenue, r.total_cost, r.profit, Number(r.margin_pct).toFixed(1)].join(",")),
        "customer_mis_customer_wise_profit_" + i
      ) : t === "customer_retention" ? b(
        ["Customer", "Status"],
        M.value.customer_retention.rows.map((r) => [n(r), r.status].join(",")),
        "customer_mis_customer_retention_" + i
      ) : t === "top_customers" ? b(
        ["Rank", "Customer", "Invoices", "Revenue"],
        M.value.top_customers.rows.map((r, p) => [p + 1, n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_top_customers_" + i
      ) : t === "inactive_customers" && b(
        ["Customer", "Last Invoice Date", "Days Inactive", "Lifetime Invoices", "Lifetime Revenue"],
        M.value.inactive_customers.rows.map((r) => [n(r), r.last_invoice_date, r.days_inactive, r.invoice_count, r.lifetime_revenue].join(",")),
        "customer_mis_inactive_customers_" + i
      );
    }
    function zo() {
      if (!$.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Hs.value, n = (r) => r.supplier_name || r.supplier;
      t === "supplier_wise_purchase" ? b(
        ["Supplier", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        $.value.supplier_wise_purchase.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "supplier_mis_supplier_wise_purchase_" + i
      ) : t === "supplier_outstanding" ? b(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Max Overdue Days"],
        $.value.supplier_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.overdue_amount, r.max_overdue_days].join(",")),
        "supplier_mis_supplier_outstanding_" + i
      ) : t === "supplier_payment_ageing" ? b(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        $.value.supplier_payment_ageing.rows.map((r) => [n(r), r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
        "supplier_mis_supplier_payment_ageing_" + i
      ) : t === "purchase_price_comparison" ? b(
        ["Item", "Supplier", "Qty", "Avg Rate", "Is Lowest", "Vs Lowest %"],
        $.value.purchase_price_comparison.rows.map((r) => [r.item_name || r.item_code, n(r), r.qty, r.avg_rate, r.is_lowest ? "Yes" : "No", Number(r.variance_vs_lowest_pct).toFixed(1)].join(",")),
        "supplier_mis_purchase_price_comparison_" + i
      ) : t === "supplier_performance" ? b(
        ["Supplier", "Purchase Amount", "Outstanding", "On-time Delivery %", "Rejection %", "Avg Price Variance %", "Score"],
        $.value.supplier_performance.rows.map((r) => [n(r), r.total_purchase_amount, r.outstanding_amount, r.on_time_delivery_pct ?? "", r.rejection_pct ?? "", r.avg_price_variance_pct ?? "", r.performance_score ?? ""].join(",")),
        "supplier_mis_supplier_performance_" + i
      ) : t === "delivery_performance" ? b(
        ["Receipt", "Supplier", "Received Date", "Expected Date", "Delay (days)", "Status"],
        $.value.delivery_performance.rows.map((r) => [r.receipt, n(r), r.received_date, r.expected_date || "", r.has_reference ? r.delay_days : "", r.has_reference ? r.on_time ? "On-time" : "Late" : "No PO Ref"].join(",")),
        "supplier_mis_delivery_performance_" + i
      ) : t === "quality_rejection" && b(
        ["Supplier", "Item", "Received Qty", "Accepted Qty", "Rejected Qty", "Rejection %"],
        $.value.quality_rejection.rows.map((r) => [n(r), r.item_name || r.item_code, r.received_qty, r.accepted_qty, r.rejected_qty, Number(r.rejection_pct).toFixed(2)].join(",")),
        "supplier_mis_quality_rejection_" + i
      );
    }
    function Wo() {
      if (!L.value) return;
      const i = C.value + "_to_" + y.value + ".csv", t = Vs.value, n = (r) => r.sales_person_name || r.sales_person;
      t === "employee_attendance" ? b(
        ["Employee", "Present Days", "Period Days", "Attendance %", "Total Hours", "Avg Hrs/Day"],
        L.value.employee_attendance.rows.map((r) => [r.employee, r.present_days, r.period_days, r.attendance_pct, r.total_hours, r.avg_hours_per_day].join(",")),
        "employee_mis_attendance_" + i
      ) : t === "department_manpower" ? b(
        ["Department", "Headcount", "Employees"],
        L.value.department_manpower.rows.map((r) => [r.department, r.headcount, '"' + r.employees.map((p) => p.sales_person_name).join("; ") + '"'].join(",")),
        "employee_mis_department_manpower_" + i
      ) : t === "salesperson_target" ? b(
        ["Salesperson", "Invoices", "Achieved", "Target", "Achievement %"],
        L.value.salesperson_achievement.rows.map((r) => [n(r), r.invoice_count, r.total_amount, Wt.value[r.sales_person] || "", Wt.value[r.sales_person] ? va(r).toFixed(1) : ""].join(",")),
        "employee_mis_salesperson_target_" + i
      ) : t === "salesperson_collection" ? b(
        ["Salesperson", "Payments", "Collected Amount"],
        L.value.salesperson_collection.rows.map((r) => [n(r), r.payment_count, r.collected_amount].join(",")),
        "employee_mis_salesperson_collection_" + i
      ) : t === "production_productivity" ? b(
        ["Employee", "Job Cards", "Hours", "Qty Produced", "Avg Time/Unit (min)", "Qty/Hour"],
        L.value.production_productivity.rows.map((r) => [r.employee, r.job_card_count, r.total_hours, r.qty_produced, r.avg_time_per_unit_mins ?? "", r.qty_per_hour ?? ""].join(",")),
        "employee_mis_production_productivity_" + i
      ) : t === "overtime" ? b(
        ["Employee", "Overtime Days", "Overtime Hours"],
        L.value.overtime.summary.map((r) => [r.employee, r.overtime_days, r.overtime_hours].join(",")),
        "employee_mis_overtime_" + i
      ) : t === "labour_cost" ? b(
        ["Employee", "Hours", "Cost"],
        L.value.labour_cost.by_employee.map((r) => [r.employee, r.total_hours, r.total_cost].join(",")),
        "employee_mis_labour_cost_" + i
      ) : t === "employee_performance" && b(
        ["Employee", "Hours", "Qty Produced", "Qty/Hour", "Rejection %", "Attendance %", "Overtime Hrs", "Score"],
        L.value.employee_performance.rows.map((r) => [r.employee, r.total_hours, r.qty_produced, r.qty_per_hour ?? "", r.rejection_pct ?? "", r.attendance_pct ?? "", r.overtime_hours, r.performance_score ?? ""].join(",")),
        "employee_mis_performance_" + i
      );
    }
    function ne() {
      const i = k.value === "ar", t = i ? rs.value : us.value, n = i ? "Customer" : "Vendor", r = i ? "customer_name" : "supplier_name", p = [n, "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"].join(","), j = t.map(
        (N) => [N[r] || N[i ? "customer" : "supplier"], N.current, N.days_1_30, N.days_31_60, N.days_61_90, N.days_90_plus, N.total].join(",")
      ), D = [p, ...j].join(`
`);
      Ws(D, (i ? "ar_aging" : "ap_aging") + "_" + y.value + ".csv");
    }
    const gn = [
      { key: "bs", label: "Balance Sheet", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/></svg>' },
      { key: "cf", label: "Cash Flow", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' },
      { key: "gst", label: "GST Summary", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
      { key: "ar", label: "AR Aging", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
      { key: "ap", label: "AP Aging", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 8 14"/></svg>' },
      { key: "tb", label: "Trial Balance", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { key: "stockgl", label: "Stock vs GL", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
      { key: "stockval", label: "Stock Valuation", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>' },
      { key: "purchase_mis", label: "Purchase MIS", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10"/></svg>' },
      { key: "inventory_mis", label: "Inventory MIS", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
      { key: "payables_mis", label: "Payables MIS", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
      { key: "supplier_mis", label: "Supplier MIS", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
      { key: "mrn_lpo", label: "MRN vs LPO", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "lpo_grn", label: "LPO vs GRN", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "proj_summary", label: "Project Summary", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "supp_analysis", label: "Supplier Analysis", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "asset_reg", label: "Asset Register", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' }
    ], kn = ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg"], wn = gn.filter((i) => kn.includes(i.key)), Uo = ["c-blue", "c-slate", "c-cyan", "c-amber", "c-pink", "c-slate", "c-emerald", "c-violet", "c-blue", "c-blue"];
    function fn(i) {
      return Uo[i % Uo.length];
    }
    return (i, t) => {
      var n, r, p, j, D, N, Ns, Et, Ko, Go, Yo, Jo, Zo;
      return l(), o("div", Qn, [
        t[839] || (t[839] = x('<div class="reports-header" data-v-42720c7a><div data-v-42720c7a><p class="reports-subtitle" data-v-42720c7a>Get detailed insights into your business performance</p></div><div class="reports-header-right" data-v-42720c7a><div class="reports-header-icons" data-v-42720c7a><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="10" width="4" height="10" rx="1" data-v-42720c7a></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-42720c7a></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-42720c7a></rect></svg><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><circle cx="12" cy="12" r="9" data-v-42720c7a></circle><path d="M12 3v9l7 3" data-v-42720c7a></path></svg></div></div></div>', 1)),
        s("div", Fn, [
          (l(!0), o(u, null, m(w(wn), (e, g) => (l(), o("button", {
            key: e.key,
            class: c(["report-card", [fn(g), { active: k.value === e.key }]]),
            onClick: (Q) => k.value = e.key
          }, [
            s("span", {
              class: "report-card-icon",
              innerHTML: e.icon
            }, null, 8, zn),
            s("span", Wn, a(e.label), 1)
          ], 10, Hn))), 128))
        ]),
        s("div", Un, [
          ["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) ? (l(), o(u, { key: 0 }, [
            t[210] || (t[210] = s("span", { class: "dr-icon" }, "📅", -1)),
            t[211] || (t[211] = s("label", { class: "dr-label" }, "As of Date", -1)),
            Es(s("input", {
              type: "date",
              "onUpdate:modelValue": t[0] || (t[0] = (e) => y.value = e),
              class: "dr-input"
            }, null, 512), [
              [Ks, y.value]
            ])
          ], 64)) : (l(), o(u, { key: 1 }, [
            t[212] || (t[212] = s("span", { class: "dr-icon" }, "📅", -1)),
            t[213] || (t[213] = s("label", { class: "dr-label" }, "Date Range", -1)),
            Es(s("input", {
              type: "date",
              "onUpdate:modelValue": t[1] || (t[1] = (e) => C.value = e),
              class: "dr-input"
            }, null, 512), [
              [Ks, C.value]
            ]),
            t[214] || (t[214] = s("span", { class: "dr-to" }, "To", -1)),
            Es(s("input", {
              type: "date",
              "onUpdate:modelValue": t[2] || (t[2] = (e) => y.value = e),
              class: "dr-input"
            }, null, 512), [
              [Ks, y.value]
            ])
          ], 64)),
          s("button", {
            class: "books-btn books-btn-primary",
            onClick: mn
          }, "▷ Run Report"),
          t[215] || (t[215] = s("span", { class: "dr-spacer" }, null, -1)),
          ["ar", "ap"].includes(k.value) && (rs.value.length || us.value.length) ? (l(), o("button", {
            key: 2,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ne
          }, " Export CSV ")) : h("", !0),
          k.value === "items" && $s.value.length ? (l(), o("button", {
            key: 3,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: wa
          }, " Export CSV ")) : h("", !0),
          k.value === "customers" && Ls.value.length ? (l(), o("button", {
            key: 4,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: xa
          }, " Export CSV ")) : h("", !0),
          k.value === "profit" && cs.value.length ? (l(), o("button", {
            key: 5,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Ca
          }, " Export CSV ")) : h("", !0),
          k.value === "invoice_profit" && ds.value.length ? (l(), o("button", {
            key: 6,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Sa
          }, " Export CSV ")) : h("", !0)
        ]),
        ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg"].includes(k.value) ? (l(), o("div", Kn, [
          s("div", Gn, [
            t[219] || (t[219] = x('<div class="bs-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="3" y="3" width="18" height="18" rx="2" data-v-42720c7a></rect><line x1="3" y1="9" x2="21" y2="9" data-v-42720c7a></line><line x1="9" y1="21" x2="9" y2="9" data-v-42720c7a></line></svg></div>', 1)),
            s("div", Yn, [
              s("div", Jn, a(il.value), 1),
              s("div", Zn, a(dl.value), 1)
            ]),
            s("div", Xn, [
              Ta.value ? (l(), o("div", si, [
                t[216] || (t[216] = s("svg", {
                  class: "proc-search-icon",
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  s("circle", {
                    cx: "11",
                    cy: "11",
                    r: "8"
                  }),
                  s("line", {
                    x1: "21",
                    y1: "21",
                    x2: "16.65",
                    y2: "16.65"
                  })
                ], -1)),
                Es(s("input", {
                  "onUpdate:modelValue": t[3] || (t[3] = (e) => nt.value = e),
                  type: "text",
                  class: "dr-input proc-search-input",
                  placeholder: nl.value
                }, null, 8, ti), [
                  [Ks, nt.value]
                ]),
                nt.value ? (l(), o("button", {
                  key: 0,
                  type: "button",
                  class: "proc-search-clear",
                  title: "Clear",
                  onClick: t[4] || (t[4] = (e) => nt.value = "")
                }, "×")) : h("", !0)
              ])) : h("", !0),
              k.value !== "asset_reg" ? Es((l(), o("select", {
                key: 1,
                "onUpdate:modelValue": t[5] || (t[5] = (e) => ws.value = e),
                class: "dr-input"
              }, [
                t[217] || (t[217] = s("option", { value: "" }, "All projects", -1)),
                (l(!0), o(u, null, m(Ie.value, (e) => (l(), o("option", {
                  key: e,
                  value: e
                }, a(e), 9, ei))), 128))
              ], 512)), [
                [sl, ws.value]
              ]) : h("", !0),
              s("div", ai, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[6] || (t[6] = (e) => Bt.value = !Bt.value),
                  disabled: !it.value.length
                }, [...t[218] || (t[218] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, oi),
                Bt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[7] || (t[7] = (e) => Bt.value = !1)
                  }),
                  s("div", li, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[8] || (t[8] = (e) => {
                        Bt.value = !1, ml();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[9] || (t[9] = (e) => {
                        Bt.value = !1, cl();
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          !al.value && !de.value ? (l(), o("div", ni, "Run the report to see results.")) : de.value ? (l(), o("div", ii)) : Xt.value ? (l(), o("div", di, a(Xt.value), 1)) : As.value.length && !it.value.length ? (l(), o("div", ri, 'No rows match "' + a(nt.value) + '".', 1)) : As.value.length ? (l(), o("div", ui, [
            s("div", ci, [
              s("table", mi, [
                s("thead", null, [
                  s("tr", null, [
                    (l(!0), o(u, null, m(re.value, (e) => (l(), o("th", {
                      key: e,
                      class: c({ "ta-r": Ra(e) })
                    }, a(ue(e)), 3))), 128))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(it.value, (e, g) => (l(), o("tr", { key: g }, [
                    (l(!0), o(u, null, m(re.value, (Q) => (l(), o("td", {
                      key: Q,
                      "data-label": ue(Q),
                      class: c({ "ta-r": Ra(Q) })
                    }, a(ul(e[Q], Q)), 11, vi))), 128))
                  ]))), 128))
                ])
              ])
            ])
          ])) : (l(), o("div", _i, "No rows for this report."))
        ])) : h("", !0),
        k.value === "pl" ? (l(), o("div", pi, [
          s("div", yi, [
            t[222] || (t[222] = x('<div class="pl-dash-title" data-v-42720c7a><span class="pl-dash-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="10" width="4" height="10" rx="1" data-v-42720c7a></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-42720c7a></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-42720c7a></rect></svg></span><div data-v-42720c7a><div class="pl-dash-h" data-v-42720c7a>Profit &amp; Loss</div><div class="pl-dash-sub" data-v-42720c7a>Overview of your income, expenses and profitability</div></div></div>', 1)),
            s("div", hi, [
              t[220] || (t[220] = x('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="4" width="18" height="18" rx="2" data-v-42720c7a></rect><line x1="3" y1="10" x2="21" y2="10" data-v-42720c7a></line><line x1="8" y1="2" x2="8" y2="6" data-v-42720c7a></line><line x1="16" y1="2" x2="16" y2="6" data-v-42720c7a></line></svg>', 1)),
              os(" " + a(P(C.value)) + " - " + a(P(y.value)) + " ", 1),
              t[221] || (t[221] = s("span", { class: "pl-dash-range-caret" }, "▾", -1))
            ])
          ]),
          w(vl) ? (l(), o("div", bi)) : w(as) ? (l(), o(u, { key: 1 }, [
            s("div", gi, [
              s("div", ki, [
                t[223] || (t[223] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "🪙"),
                  s("span", { class: "pl-kpi-label" }, "Total Income")
                ], -1)),
                s("div", wi, a(w(S)(w(as).total_income)), 1),
                s("div", {
                  class: c(["pl-kpi-trend", ya(So.value)])
                }, a(ha(So.value)), 3)
              ]),
              w(as).cogs ? (l(), o("div", fi, [
                t[224] || (t[224] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "🛒"),
                  s("span", { class: "pl-kpi-label" }, "Cost of Goods Sold")
                ], -1)),
                s("div", xi, a(w(S)(w(as).cogs)), 1),
                t[225] || (t[225] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : h("", !0),
              w(as).cogs ? (l(), o("div", Ci, [
                t[226] || (t[226] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📊"),
                  s("span", { class: "pl-kpi-label" }, "Gross Profit")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", w(as).gross_profit >= 0 ? "green" : "red"])
                }, a(w(S)(w(as).gross_profit)), 3),
                t[227] || (t[227] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : h("", !0),
              s("div", Si, [
                t[228] || (t[228] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📄"),
                  s("span", { class: "pl-kpi-label" }, "Total Expense")
                ], -1)),
                s("div", ji, a(w(S)(w(as).total_expense)), 1),
                s("div", {
                  class: c(["pl-kpi-trend", ya(jo.value, !0)])
                }, a(ha(jo.value)), 3)
              ]),
              w(as).stock_adjustment ? (l(), o("div", Mi, [
                t[229] || (t[229] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📦"),
                  s("span", { class: "pl-kpi-label" }, "Stock Adjustment")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", w(as).stock_adjustment > 0 ? "red" : "green"])
                }, a(w(S)(w(as).stock_adjustment)), 3),
                t[230] || (t[230] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : h("", !0),
              s("div", {
                class: c(["pl-kpi", w(as).net_profit >= 0 ? "c-emerald" : "c-pink"])
              }, [
                t[231] || (t[231] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📈"),
                  s("span", { class: "pl-kpi-label" }, "Net Profit")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", w(as).net_profit >= 0 ? "green" : "red"])
                }, a(w(S)(w(as).net_profit)), 3),
                s("div", {
                  class: c(["pl-kpi-trend", ya(Mo.value)])
                }, a(ha(Mo.value)), 3)
              ], 2)
            ]),
            Ds.value.length ? (l(), o("div", Di, [
              s("div", Ti, [
                t[232] || (t[232] = x('<div class="pl-dash-title" data-v-42720c7a><span class="pl-dash-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="10" width="4" height="10" rx="1" data-v-42720c7a></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-42720c7a></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-42720c7a></rect></svg></span><div data-v-42720c7a><div class="pl-dash-h" style="font-size:14px;" data-v-42720c7a>Monthly Trend</div><div class="pl-dash-sub" data-v-42720c7a>Income vs Expense over the selected period</div></div></div>', 1)),
                s("div", Oi, [
                  s("button", {
                    class: c({ active: Ut.value === "monthly" }),
                    onClick: t[10] || (t[10] = (e) => Ut.value = "monthly")
                  }, "Monthly", 2),
                  s("button", {
                    class: c({ active: Ut.value === "quarterly" }),
                    onClick: t[11] || (t[11] = (e) => Ut.value = "quarterly")
                  }, "Quarterly", 2),
                  s("button", {
                    class: c({ active: Ut.value === "yearly" }),
                    onClick: t[12] || (t[12] = (e) => Ut.value = "yearly")
                  }, "Yearly", 2)
                ])
              ]),
              s("div", Ri, [
                s("div", Pi, [
                  s("div", Ii, [
                    (l(!0), o(u, null, m(tn.value, (e) => (l(), o("span", { key: e }, "KES " + a(_(e)), 1))), 128))
                  ]),
                  s("div", Vi, [
                    (l(!0), o(u, null, m(Ds.value, (e) => (l(), o("div", {
                      key: e.month,
                      class: "pl-trend-col"
                    }, [
                      s("div", Ni, [
                        s("div", {
                          class: "pl-trend-bar income",
                          style: qs({ height: Co(e.income) + "px" }),
                          title: "Income: KES " + _(e.income)
                        }, null, 12, Ei),
                        s("div", {
                          class: "pl-trend-bar expense",
                          style: qs({ height: Co(e.expense) + "px" }),
                          title: "Expense: KES " + _(e.expense)
                        }, null, 12, qi)
                      ]),
                      s("div", Bi, a(e.month.slice(5)), 1)
                    ]))), 128))
                  ])
                ]),
                s("div", Ai, [
                  t[233] || (t[233] = s("div", { class: "pl-insights-title" }, "💡 Insights", -1)),
                  (l(!0), o(u, null, m(en.value, (e, g) => (l(), o("div", {
                    key: g,
                    class: "pl-insight-item"
                  }, [
                    s("span", {
                      class: c(["pl-insight-icon", e.tone])
                    }, a(e.icon), 3),
                    s("div", null, [
                      s("div", $i, a(e.title), 1),
                      s("div", Li, a(e.desc), 1)
                    ])
                  ]))), 128))
                ])
              ]),
              t[234] || (t[234] = s("div", { class: "pl-trend-legend" }, [
                s("span", null, [
                  s("span", { class: "dot income" }),
                  os("Income")
                ]),
                s("span", null, [
                  s("span", { class: "dot expense" }),
                  os("Expense")
                ])
              ], -1))
            ])) : h("", !0)
          ], 64)) : (l(), o("div", Qi, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "bs" ? (l(), o("div", Fi, [
          s("div", Hi, [
            t[236] || (t[236] = x('<div class="bs-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><path d="M12 2 3 6v2h18V6z" data-v-42720c7a></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-42720c7a></path><path d="M3 20h18" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Balance Sheet</div><div class="bs-page-head-sub" data-v-42720c7a>What the business owns and owes</div></div>', 2)),
            s("div", zi, [
              s("div", Wi, "As of " + a(P(y.value)), 1),
              s("div", Ui, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[13] || (t[13] = (e) => es("exportBsCSV")),
                  disabled: !w(ps)
                }, [...t[235] || (t[235] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Ki),
                f.value === "exportBsCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[14] || (t[14] = (e) => f.value = "")
                  }),
                  s("div", Gi, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[15] || (t[15] = (e) => {
                        f.value = "", wo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[16] || (t[16] = (e) => {
                        f.value = "", Y(wo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          w(pl) ? (l(), o("div", Yi)) : w(ps) ? (l(), o(u, { key: 1 }, [
            s("div", Ji, [
              s("div", Zi, [
                t[238] || (t[238] = x('<div class="bs-kpi-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><ellipse cx="12" cy="5" rx="8" ry="3" data-v-42720c7a></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-42720c7a></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-42720c7a></path></svg></div>', 1)),
                s("div", Xi, [
                  t[237] || (t[237] = s("div", { class: "bs-kpi-label" }, "Total Assets", -1)),
                  s("div", sd, a(w(S)(w(ps).total_assets)), 1)
                ])
              ]),
              s("div", td, [
                t[240] || (t[240] = s("div", { class: "bs-kpi-icon" }, [
                  s("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("rect", {
                      x: "2",
                      y: "7",
                      width: "20",
                      height: "13",
                      rx: "2"
                    }),
                    s("path", { d: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                  ])
                ], -1)),
                s("div", ed, [
                  t[239] || (t[239] = s("div", { class: "bs-kpi-label" }, "Total Liabilities", -1)),
                  s("div", ad, a(w(S)(w(ps).total_liabilities)), 1)
                ])
              ]),
              s("div", od, [
                t[242] || (t[242] = x('<div class="bs-kpi-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="12" width="4" height="9" data-v-42720c7a></rect><rect x="10" y="7" width="4" height="14" data-v-42720c7a></rect><rect x="17" y="3" width="4" height="18" data-v-42720c7a></rect></svg></div>', 1)),
                s("div", ld, [
                  t[241] || (t[241] = s("div", { class: "bs-kpi-label" }, "Total Equity", -1)),
                  s("div", nd, a(w(S)(w(ps).total_equity)), 1)
                ])
              ])
            ]),
            s("div", {
              class: c(["bs-sum-status", _a.value ? "bs-ok" : "bs-bad"])
            }, [
              s("span", id, a(_a.value ? "✓" : "✕"), 1),
              s("div", dd, [
                s("div", rd, a(_a.value ? "Assets = Liabilities + Equity" : "Balance sheet out of balance"), 1),
                s("div", ud, a(w(S)(w(ps).total_assets)) + " = " + a(w(S)(w(ps).total_liabilities)) + " + " + a(w(S)(w(ps).total_equity)), 1)
              ])
            ], 2),
            s("div", cd, [
              (l(!0), o(u, null, m(fo.value, (e) => (l(), o("div", {
                key: e.key,
                class: c(["bs-acc-group", e.cls])
              }, [
                s("div", {
                  class: "bs-acc-head",
                  onClick: (g) => sn(e.key)
                }, [
                  s("div", {
                    class: "bs-acc-icon",
                    innerHTML: e.icon
                  }, null, 8, vd),
                  s("div", _d, [
                    s("div", pd, a(e.label), 1),
                    s("div", yd, a(e.desc), 1)
                  ]),
                  s("div", hd, a(w(S)(e.total)), 1),
                  s("div", {
                    class: c(["bs-acc-chevron", { open: xe.value[e.key] }])
                  }, [...t[243] || (t[243] = [
                    s("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      s("polyline", { points: "18 15 12 9 6 15" })
                    ], -1)
                  ])], 2)
                ], 8, md),
                xe.value[e.key] ? (l(), o("div", bd, [
                  (l(!0), o(u, null, m(e.items, (g) => (l(), o("div", {
                    key: g.label,
                    class: "bs-acc-item"
                  }, [
                    s("div", {
                      class: "bs-acc-item-icon",
                      innerHTML: g.icon
                    }, null, 8, gd),
                    s("div", kd, [
                      s("div", wd, a(g.label), 1),
                      g.desc ? (l(), o("div", fd, a(g.desc), 1)) : h("", !0)
                    ]),
                    s("div", xd, a(w(S)(g.value)), 1),
                    t[244] || (t[244] = s("div", { class: "bs-acc-item-caret" }, [
                      s("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        s("polyline", { points: "9 18 15 12 9 6" })
                      ])
                    ], -1))
                  ]))), 128))
                ])) : h("", !0)
              ], 2))), 128))
            ])
          ], 64)) : (l(), o("div", Cd, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "cf" ? (l(), o("div", Sd, [
          s("div", jd, [
            t[246] || (t[246] = x('<div class="bs-page-head-icon cf-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><path d="M3 3v18h18" data-v-42720c7a></path><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Cash Flow Statement</div><div class="bs-page-head-sub" data-v-42720c7a>Track the movement of cash in and out of your business</div></div>', 2)),
            s("div", Md, [
              s("div", Dd, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Td, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[17] || (t[17] = (e) => es("exportCfCSV")),
                  disabled: !w(J)
                }, [...t[245] || (t[245] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Od),
                f.value === "exportCfCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[18] || (t[18] = (e) => f.value = "")
                  }),
                  s("div", Rd, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[19] || (t[19] = (e) => {
                        f.value = "", qa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[20] || (t[20] = (e) => {
                        f.value = "", Y(qa);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          w(hl) ? (l(), o("div", Pd)) : w(J) ? (l(), o("div", Id, [
            s("div", Vd, [
              s("div", Nd, [
                t[247] || (t[247] = x('<div class="cf-acc-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><circle cx="12" cy="12" r="3" data-v-42720c7a></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" data-v-42720c7a></path></svg></div><div class="cf-acc-text" data-v-42720c7a><div class="cf-acc-label" data-v-42720c7a>Operating Activities</div><div class="cf-acc-desc" data-v-42720c7a>P&amp;L + working capital changes</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", w(J).operating >= 0 ? "green" : "red"])
                }, a(w(S)(w(J).operating)), 3)
              ]),
              s("div", Ed, [
                t[248] || (t[248] = x('<div class="cf-acc-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><ellipse cx="12" cy="5" rx="8" ry="3" data-v-42720c7a></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-42720c7a></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-42720c7a></path></svg></div><div class="cf-acc-text" data-v-42720c7a><div class="cf-acc-label" data-v-42720c7a>Investing Activities</div><div class="cf-acc-desc" data-v-42720c7a>Asset purchases and sales</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", w(J).investing >= 0 ? "green" : "red"])
                }, a(w(S)(w(J).investing)), 3)
              ]),
              s("div", qd, [
                t[249] || (t[249] = x('<div class="cf-acc-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><path d="M12 2 3 6v2h18V6z" data-v-42720c7a></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-42720c7a></path><path d="M3 20h18" data-v-42720c7a></path></svg></div><div class="cf-acc-text" data-v-42720c7a><div class="cf-acc-label" data-v-42720c7a>Financing Activities</div><div class="cf-acc-desc" data-v-42720c7a>Equity, loans and debt</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", w(J).financing >= 0 ? "green" : "red"])
                }, a(w(S)(w(J).financing)), 3)
              ]),
              s("div", Bd, [
                t[251] || (t[251] = x('<div class="cf-acc-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="12" width="4" height="9" data-v-42720c7a></rect><rect x="10" y="7" width="4" height="14" data-v-42720c7a></rect><rect x="17" y="3" width="4" height="18" data-v-42720c7a></rect></svg></div>', 1)),
                s("div", Ad, [
                  t[250] || (t[250] = s("div", { class: "cf-acc-label" }, "Net Change in Cash", -1)),
                  s("div", $d, a(w(J).net_change >= 0 ? "Increase" : "Decrease") + " in cash during this period", 1)
                ]),
                s("div", {
                  class: c(["cf-acc-amount", w(J).net_change >= 0 ? "green" : "red"])
                }, a(w(S)(w(J).net_change)), 3)
              ]),
              w(J).opening_cash != null ? (l(), o(u, { key: 0 }, [
                s("div", Ld, [
                  t[252] || (t[252] = x('<div class="cf-flow-icon cf-flow-icon-open" data-v-42720c7a><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><line x1="5" y1="12" x2="19" y2="12" data-v-42720c7a></line><polyline points="12 5 19 12 12 19" data-v-42720c7a></polyline></svg></div><div class="cf-acc-text" data-v-42720c7a><div class="cf-acc-label" style="font-size:13px;" data-v-42720c7a>Opening Cash &amp; Bank</div><div class="cf-acc-desc" data-v-42720c7a>Balance at the beginning of the period</div></div>', 2)),
                  s("div", {
                    class: c(["cf-acc-amount", w(J).opening_cash >= 0 ? "green" : "red"])
                  }, a(w(S)(w(J).opening_cash)), 3)
                ]),
                s("div", Qd, [
                  t[253] || (t[253] = x('<div class="cf-flow-icon cf-flow-icon-close" data-v-42720c7a><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><line x1="19" y1="12" x2="5" y2="12" data-v-42720c7a></line><polyline points="12 5 5 12 12 19" data-v-42720c7a></polyline></svg></div><div class="cf-acc-text" data-v-42720c7a><div class="cf-acc-label" style="font-size:13px;" data-v-42720c7a>Closing Cash &amp; Bank</div><div class="cf-acc-desc" data-v-42720c7a>Balance at the end of the period</div></div>', 2)),
                  s("div", {
                    class: c(["cf-acc-amount", w(J).closing_cash >= 0 ? "green" : "red"])
                  }, a(w(S)(w(J).closing_cash)), 3)
                ])
              ], 64)) : h("", !0)
            ]),
            s("div", Fd, [
              s("div", Hd, [
                t[255] || (t[255] = s("div", { class: "cf-trend-box-head" }, [
                  s("div", null, [
                    s("div", { class: "cf-trend-box-title" }, "Cash Flow Trend"),
                    s("div", { class: "cf-trend-box-sub" }, "Monthly cash flow movement")
                  ]),
                  s("div", { class: "cf-trend-period" }, "Monthly")
                ], -1)),
                se.value.length ? (l(), o("div", zd, [
                  t[254] || (t[254] = s("div", { class: "cf-trend-baseline" }, null, -1)),
                  (l(!0), o(u, null, m(se.value, (e) => (l(), o("div", {
                    key: e.month,
                    class: "cf-trend-col"
                  }, [
                    s("div", {
                      class: "cf-trend-bar operating",
                      style: qs(Ee(e.operating)),
                      title: "Operating: " + w(S)(e.operating)
                    }, null, 12, Wd),
                    s("div", {
                      class: "cf-trend-bar investing",
                      style: qs(Ee(e.investing)),
                      title: "Investing: " + w(S)(e.investing)
                    }, null, 12, Ud),
                    s("div", {
                      class: "cf-trend-bar financing",
                      style: qs(Ee(e.financing)),
                      title: "Financing: " + w(S)(e.financing)
                    }, null, 12, Kd),
                    s("div", Gd, a(e.month), 1)
                  ]))), 128))
                ])) : (l(), o("div", Yd, "No monthly data for this range.")),
                t[256] || (t[256] = s("div", { class: "cf-trend-legend" }, [
                  s("span", null, [
                    s("span", {
                      class: "dot",
                      style: { background: "#10b981" }
                    }),
                    os("Operating")
                  ]),
                  s("span", null, [
                    s("span", {
                      class: "dot",
                      style: { background: "#2563eb" }
                    }),
                    os("Investing")
                  ]),
                  s("span", null, [
                    s("span", {
                      class: "dot",
                      style: { background: "#7c3aed" }
                    }),
                    os("Financing")
                  ])
                ], -1))
              ]),
              s("div", Jd, [
                t[258] || (t[258] = s("div", { class: "cf-summary-icon" }, "i", -1)),
                s("div", null, [
                  t[257] || (t[257] = s("div", { class: "cf-summary-title" }, "Summary", -1)),
                  s("div", Zd, [
                    os(" Cash " + a(w(J).net_change >= 0 ? "increased" : "decreased") + " by ", 1),
                    s("span", {
                      class: c(w(J).net_change >= 0 ? "green" : "red"),
                      style: { "font-weight": "700" }
                    }, a(w(S)(Math.abs(w(J).net_change))), 3),
                    os(" during this period, from " + a(w(S)(w(J).opening_cash)) + " to " + a(w(S)(w(J).closing_cash)) + ". ", 1)
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Xd, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "gst" ? (l(), o("div", sr, [
          s("div", tr, [
            t[260] || (t[260] = x('<div class="bs-page-head-icon gst-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-42720c7a></path><polyline points="14 2 14 8 20 8" data-v-42720c7a></polyline></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>GST Summary</div><div class="bs-page-head-sub" data-v-42720c7a>Overview of GST collected during the selected period</div></div>', 2)),
            s("div", er, [
              s("div", ar, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", or, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[21] || (t[21] = (e) => es("exportGstCSV")),
                  disabled: !((n = w(dt)) != null && n.length)
                }, [...t[259] || (t[259] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, lr),
                f.value === "exportGstCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[22] || (t[22] = (e) => f.value = "")
                  }),
                  s("div", nr, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[23] || (t[23] = (e) => {
                        f.value = "", La();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[24] || (t[24] = (e) => {
                        f.value = "", Y(La);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          w(gl) ? (l(), o("div", ir)) : (r = w(dt)) != null && r.length ? (l(), o("div", dr, [
            (l(!0), o(u, null, m(Rl.value, (e) => (l(), o("div", {
              key: e.tax_type,
              class: c(["gst-card", e.cls])
            }, [
              s("div", rr, [
                t[261] || (t[261] = x('<div class="gst-card-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><ellipse cx="12" cy="5" rx="8" ry="3" data-v-42720c7a></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-42720c7a></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" data-v-42720c7a></path></svg></div>', 1)),
                s("div", null, [
                  s("div", ur, a(e.tax_type), 1),
                  s("div", cr, a(e.desc), 1)
                ])
              ]),
              s("div", mr, [
                s("div", null, [
                  t[262] || (t[262] = s("div", { class: "gst-stat-label" }, "Invoice Count", -1)),
                  s("div", vr, a(e.invoice_count), 1)
                ]),
                s("div", null, [
                  t[263] || (t[263] = s("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  s("div", _r, a(w(S)(e.total_tax)), 1)
                ])
              ])
            ], 2))), 128)),
            s("div", pr, [
              t[266] || (t[266] = x('<div class="gst-card-head" data-v-42720c7a><div class="gst-card-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-42720c7a></path><polyline points="14 2 14 8 20 8" data-v-42720c7a></polyline><line x1="9" y1="17" x2="15" y2="17" data-v-42720c7a></line><line x1="9" y1="13" x2="12" y2="13" data-v-42720c7a></line></svg></div><div data-v-42720c7a><div class="gst-card-title" data-v-42720c7a>Total Summary</div><div class="gst-card-desc" data-v-42720c7a>Combined GST for the selected period</div></div></div>', 1)),
              s("div", yr, [
                s("div", null, [
                  t[264] || (t[264] = s("div", { class: "gst-stat-label" }, "Total Invoices", -1)),
                  s("div", hr, a(Aa.value), 1)
                ]),
                s("div", null, [
                  t[265] || (t[265] = s("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  s("div", br, a(w(S)($a.value)), 1)
                ])
              ])
            ])
          ])) : (l(), o("div", gr, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "ar" ? (l(), o("div", kr, [
          s("div", wr, [
            t[268] || (t[268] = x('<div class="bs-page-head-icon ar-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="12" cy="12" r="10" data-v-42720c7a></circle><polyline points="12 6 12 12 16 14" data-v-42720c7a></polyline></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Accounts Receivable Aging</div><div class="bs-page-head-sub" data-v-42720c7a>Outstanding customer balances, grouped by how overdue they are</div></div>', 2)),
            s("div", fr, [
              s("div", xr, "As of " + a(P(y.value)), 1),
              s("div", Cr, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[25] || (t[25] = (e) => ut.value = !ut.value),
                  disabled: !rs.value.length
                }, [...t[267] || (t[267] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Sr),
                ut.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[26] || (t[26] = (e) => ut.value = !1)
                  }),
                  s("div", jr, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[27] || (t[27] = (e) => {
                        ut.value = !1, ne();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[28] || (t[28] = (e) => {
                        ut.value = !1, Y(ne);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[29] || (t[29] = (e) => {
                        ut.value = !1, jl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          qe.value ? (l(), o("div", Mr)) : rs.value.length ? (l(), o("div", Dr, [
            s("div", Tr, [
              t[270] || (t[270] = x('<div class="iws-total-icon iws-total-icon-neg" data-v-42720c7a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="12" cy="12" r="10" data-v-42720c7a></circle><polyline points="12 6 12 12 16 14" data-v-42720c7a></polyline></svg></div><div class="iws-total-label" data-v-42720c7a>Total Outstanding</div>', 2)),
              s("div", {
                class: "iws-total-value iws-total-value-neg",
                style: qs(G(d(js.value.total)))
              }, a(d(js.value.total)), 5),
              s("div", Or, a(rs.value.length) + " " + a(rs.value.length === 1 ? "Customer" : "Customers"), 1),
              js.value.days_90_plus ? (l(), o("div", Rr, [
                t[269] || (t[269] = s("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                s("span", Pr, a(d(js.value.days_90_plus)), 1)
              ])) : h("", !0)
            ]),
            s("div", Ir, [
              s("table", Vr, [
                s("thead", null, [
                  s("tr", null, [
                    t[278] || (t[278] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[30] || (t[30] = (e) => ct("customer")),
                      class: "iws-sortable"
                    }, [
                      t[271] || (t[271] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[31] || (t[31] = (e) => ct("current")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[272] || (t[272] = s("span", null, "Current (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("current")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[32] || (t[32] = (e) => ct("days_1_30")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[273] || (t[273] = s("span", null, "1–30 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("days_1_30")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[33] || (t[33] = (e) => ct("days_31_60")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[274] || (t[274] = s("span", null, "31–60 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("days_31_60")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[34] || (t[34] = (e) => ct("days_61_90")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[275] || (t[275] = s("span", null, "61–90 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("days_61_90")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[35] || (t[35] = (e) => ct("days_90_plus")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[276] || (t[276] = s("span", null, "90+ Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("days_90_plus")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[36] || (t[36] = (e) => ct("total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[277] || (t[277] = s("span", null, "Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", mt("total")])
                      }, "⇅", 2)
                    ]),
                    t[279] || (t[279] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(Ia.value, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", Nr, a(g + 1), 1),
                    s("td", Er, a(e.customer_name || e.customer), 1),
                    s("td", qr, a(e.current > 0 ? H(e.current) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_1_30 > 0 ? "text-warn" : ""])
                    }, a(e.days_1_30 > 0 ? H(e.days_1_30) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_31_60 > 0 ? "text-danger" : ""])
                    }, a(e.days_31_60 > 0 ? H(e.days_31_60) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_61_90 > 0 ? "text-danger" : ""])
                    }, a(e.days_61_90 > 0 ? H(e.days_61_90) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_90_plus > 0 ? "text-danger fw-700" : ""])
                    }, a(e.days_90_plus > 0 ? H(e.days_90_plus) : "—"), 3),
                    s("td", Br, a(d(e.total)), 1),
                    s("td", Ar, [
                      s("div", $r, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Qt.value = Qt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Lr),
                        Qt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[37] || (t[37] = (Q) => Qt.value = null)
                          }),
                          s("div", Qr, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qt.value = null, Va(e, !0);
                              }
                            }, "Copy row", 8, Fr),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qt.value = null, Na(e, !0);
                              }
                            }, "Download row as CSV", 8, Hr)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", zr, [
                    t[280] || (t[280] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[281] || (t[281] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", Wr, a(d(js.value.current)), 1),
                    s("td", Ur, a(d(js.value.days_1_30)), 1),
                    s("td", Kr, a(d(js.value.days_31_60)), 1),
                    s("td", Gr, a(d(js.value.days_61_90)), 1),
                    s("td", Yr, a(d(js.value.days_90_plus)), 1),
                    s("td", Jr, a(d(js.value.total)), 1),
                    t[282] || (t[282] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Zr, a(Qa.value ? "No outstanding receivables as of this date." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "ap" ? (l(), o("div", Xr, [
          s("div", su, [
            t[284] || (t[284] = x('<div class="bs-page-head-icon ap-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="12" cy="12" r="10" data-v-42720c7a></circle><polyline points="12 6 12 12 16 14" data-v-42720c7a></polyline></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Accounts Payable Aging</div><div class="bs-page-head-sub" data-v-42720c7a>Outstanding vendor balances, grouped by how overdue they are</div></div>', 2)),
            s("div", tu, [
              s("div", eu, "As of " + a(P(y.value)), 1),
              s("div", au, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[38] || (t[38] = (e) => vt.value = !vt.value),
                  disabled: !us.value.length
                }, [...t[283] || (t[283] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, ou),
                vt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[39] || (t[39] = (e) => vt.value = !1)
                  }),
                  s("div", lu, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[40] || (t[40] = (e) => {
                        vt.value = !1, ne();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[41] || (t[41] = (e) => {
                        vt.value = !1, Y(ne);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[42] || (t[42] = (e) => {
                        vt.value = !1, Ml();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Be.value ? (l(), o("div", nu)) : us.value.length ? (l(), o("div", iu, [
            s("div", du, [
              t[286] || (t[286] = x('<div class="iws-total-icon iws-total-icon-neg" data-v-42720c7a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="12" cy="12" r="10" data-v-42720c7a></circle><polyline points="12 6 12 12 16 14" data-v-42720c7a></polyline></svg></div><div class="iws-total-label" data-v-42720c7a>Total Outstanding</div>', 2)),
              s("div", {
                class: "iws-total-value iws-total-value-neg",
                style: qs(G(d(Ms.value.total)))
              }, a(d(Ms.value.total)), 5),
              s("div", ru, a(us.value.length) + " " + a(us.value.length === 1 ? "Vendor" : "Vendors"), 1),
              Ms.value.days_90_plus ? (l(), o("div", uu, [
                t[285] || (t[285] = s("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                s("span", cu, a(d(Ms.value.days_90_plus)), 1)
              ])) : h("", !0)
            ]),
            s("div", mu, [
              s("table", vu, [
                s("thead", null, [
                  s("tr", null, [
                    t[294] || (t[294] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[43] || (t[43] = (e) => _t("supplier")),
                      class: "iws-sortable"
                    }, [
                      t[287] || (t[287] = s("span", null, "Vendor", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("supplier")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[44] || (t[44] = (e) => _t("current")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[288] || (t[288] = s("span", null, "Current (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("current")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[45] || (t[45] = (e) => _t("days_1_30")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[289] || (t[289] = s("span", null, "1–30 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("days_1_30")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[46] || (t[46] = (e) => _t("days_31_60")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[290] || (t[290] = s("span", null, "31–60 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("days_31_60")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[47] || (t[47] = (e) => _t("days_61_90")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[291] || (t[291] = s("span", null, "61–90 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("days_61_90")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[48] || (t[48] = (e) => _t("days_90_plus")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[292] || (t[292] = s("span", null, "90+ Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("days_90_plus")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[49] || (t[49] = (e) => _t("total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[293] || (t[293] = s("span", null, "Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", pt("total")])
                      }, "⇅", 2)
                    ]),
                    t[295] || (t[295] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(Ea.value, (e, g) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", _u, a(g + 1), 1),
                    s("td", pu, a(e.supplier_name || e.supplier), 1),
                    s("td", yu, a(e.current > 0 ? H(e.current) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_1_30 > 0 ? "text-warn" : ""])
                    }, a(e.days_1_30 > 0 ? H(e.days_1_30) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_31_60 > 0 ? "text-danger" : ""])
                    }, a(e.days_31_60 > 0 ? H(e.days_31_60) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_61_90 > 0 ? "text-danger" : ""])
                    }, a(e.days_61_90 > 0 ? H(e.days_61_90) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_90_plus > 0 ? "text-danger fw-700" : ""])
                    }, a(e.days_90_plus > 0 ? H(e.days_90_plus) : "—"), 3),
                    s("td", hu, a(d(e.total)), 1),
                    s("td", bu, [
                      s("div", gu, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Ft.value = Ft.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, ku),
                        Ft.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[50] || (t[50] = (Q) => Ft.value = null)
                          }),
                          s("div", wu, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Ft.value = null, Va(e, !1);
                              }
                            }, "Copy row", 8, fu),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Ft.value = null, Na(e, !1);
                              }
                            }, "Download row as CSV", 8, xu)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Cu, [
                    t[296] || (t[296] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[297] || (t[297] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", Su, a(d(Ms.value.current)), 1),
                    s("td", ju, a(d(Ms.value.days_1_30)), 1),
                    s("td", Mu, a(d(Ms.value.days_31_60)), 1),
                    s("td", Du, a(d(Ms.value.days_61_90)), 1),
                    s("td", Tu, a(d(Ms.value.days_90_plus)), 1),
                    s("td", Ou, a(d(Ms.value.total)), 1),
                    t[298] || (t[298] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Ru, a(Fa.value ? "No outstanding payables as of this date." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "items" ? (l(), o("div", Pu, [
          s("div", Iu, [
            t[300] || (t[300] = x('<div class="bs-page-head-icon iws-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="9" cy="21" r="1" data-v-42720c7a></circle><circle cx="20" cy="21" r="1" data-v-42720c7a></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Item-wise Sales</div><div class="bs-page-head-sub" data-v-42720c7a>Sales summary by item for the selected period</div></div>', 2)),
            s("div", Vu, [
              s("div", Nu, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Eu, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[51] || (t[51] = (e) => Pt.value = !Pt.value),
                  disabled: !$s.value.length
                }, [...t[299] || (t[299] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, qu),
                Pt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[52] || (t[52] = (e) => Pt.value = !1)
                  }),
                  s("div", Bu, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[53] || (t[53] = (e) => {
                        Pt.value = !1, wa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[54] || (t[54] = (e) => {
                        Pt.value = !1, Y(wa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[55] || (t[55] = (e) => {
                        Pt.value = !1, vn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Ae.value ? (l(), o("div", Au)) : $s.value.length ? (l(), o("div", $u, [
            s("div", Lu, [
              t[301] || (t[301] = x('<div class="iws-total-icon" data-v-42720c7a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><line x1="6" y1="20" x2="6" y2="13" data-v-42720c7a></line><line x1="12" y1="20" x2="12" y2="4" data-v-42720c7a></line><line x1="18" y1="20" x2="18" y2="9" data-v-42720c7a></line></svg></div><div class="iws-total-label" data-v-42720c7a>Total Sales</div>', 2)),
              s("div", {
                class: "iws-total-value",
                style: qs(G(d(zs.value.amount)))
              }, a(d(zs.value.amount)), 5),
              s("div", Qu, a($s.value.length) + " " + a($s.value.length === 1 ? "Item" : "Items") + " • " + a(zs.value.invoices) + " " + a(zs.value.invoices === 1 ? "Invoice" : "Invoices"), 1)
            ]),
            s("div", Fu, [
              s("table", Hu, [
                s("thead", null, [
                  s("tr", null, [
                    t[309] || (t[309] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[56] || (t[56] = (e) => It("item")),
                      class: "iws-sortable"
                    }, [
                      t[302] || (t[302] = s("span", null, "Item", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("item")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[57] || (t[57] = (e) => It("uom")),
                      class: "iws-sortable"
                    }, [
                      t[303] || (t[303] = s("span", null, "UOM", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("uom")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[58] || (t[58] = (e) => It("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[304] || (t[304] = s("span", null, "Invoices", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[59] || (t[59] = (e) => It("qty_sold")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[305] || (t[305] = s("span", null, "Qty Sold", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("qty_sold")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[60] || (t[60] = (e) => It("avg_rate")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[306] || (t[306] = s("span", null, "Avg Rate (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("avg_rate")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[61] || (t[61] = (e) => It("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[307] || (t[307] = s("span", null, "Discount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("total_discount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[62] || (t[62] = (e) => It("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[308] || (t[308] = s("span", null, "Total Amount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Vt("total_amount")])
                      }, "⇅", 2)
                    ]),
                    t[310] || (t[310] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ka.value, (e, g) => (l(), o("tr", {
                    key: (e.item_code || e.item_name) + "|" + (e.uom || "") + "|" + g
                  }, [
                    s("td", zu, a(g + 1), 1),
                    s("td", Wu, a(e.item_name || e.item_code), 1),
                    s("td", null, [
                      s("span", Uu, a(e.uom || "—"), 1)
                    ]),
                    s("td", Ku, a(e.invoice_count), 1),
                    s("td", Gu, a(_(e.qty_sold)), 1),
                    s("td", Yu, a(H(e.avg_rate)), 1),
                    s("td", Ju, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    s("td", Zu, a(d(e.total_amount)), 1),
                    s("td", Xu, [
                      s("div", sc, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Jt.value = Jt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, tc),
                        Jt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[63] || (t[63] = (Q) => Jt.value = null)
                          }),
                          s("div", ec, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Jt.value = null, _n(e);
                              }
                            }, "Copy row", 8, ac),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Jt.value = null, pn(e);
                              }
                            }, "Download row as CSV", 8, oc)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", lc, [
                    t[311] || (t[311] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[312] || (t[312] = s("td", { class: "fw-700" }, "Total", -1)),
                    t[313] || (t[313] = s("td", null, null, -1)),
                    s("td", nc, a(zs.value.invoices), 1),
                    s("td", ic, a(_(zs.value.qty)), 1),
                    t[314] || (t[314] = s("td", null, null, -1)),
                    s("td", dc, a(d(zs.value.discount)), 1),
                    s("td", rc, a(d(zs.value.amount)), 1),
                    t[315] || (t[315] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", uc, a(Ha.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "customers" ? (l(), o("div", cc, [
          s("div", mc, [
            t[317] || (t[317] = x('<div class="bs-page-head-icon cws-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-42720c7a></path><circle cx="9" cy="7" r="4" data-v-42720c7a></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-42720c7a></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Customer-wise Sales</div><div class="bs-page-head-sub" data-v-42720c7a>Sales summary by customer for the selected period</div></div>', 2)),
            s("div", vc, [
              s("div", _c, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", pc, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[64] || (t[64] = (e) => Nt.value = !Nt.value),
                  disabled: !Ls.value.length
                }, [...t[316] || (t[316] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, yc),
                Nt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[65] || (t[65] = (e) => Nt.value = !1)
                  }),
                  s("div", hc, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[66] || (t[66] = (e) => {
                        Nt.value = !1, xa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[67] || (t[67] = (e) => {
                        Nt.value = !1, Y(xa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[68] || (t[68] = (e) => {
                        Nt.value = !1, yn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          $e.value ? (l(), o("div", bc)) : Ls.value.length ? (l(), o("div", gc, [
            s("div", kc, [
              t[319] || (t[319] = x('<div class="iws-total-icon" data-v-42720c7a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><line x1="6" y1="20" x2="6" y2="13" data-v-42720c7a></line><line x1="12" y1="20" x2="12" y2="4" data-v-42720c7a></line><line x1="18" y1="20" x2="18" y2="9" data-v-42720c7a></line></svg></div><div class="iws-total-label" data-v-42720c7a>Total Sales</div>', 2)),
              s("div", {
                class: "iws-total-value",
                style: qs(G(d(_s.value.amount)))
              }, a(d(_s.value.amount)), 5),
              s("div", wc, a(Ls.value.length) + " " + a(Ls.value.length === 1 ? "Customer" : "Customers") + " • " + a(_s.value.invoices) + " " + a(_s.value.invoices === 1 ? "Invoice" : "Invoices"), 1),
              _s.value.outstanding ? (l(), o("div", fc, [
                t[318] || (t[318] = s("span", { class: "iws-total-sub-label" }, "Outstanding", -1)),
                s("span", xc, a(d(_s.value.outstanding)), 1)
              ])) : h("", !0)
            ]),
            s("div", Cc, [
              s("table", Sc, [
                s("thead", null, [
                  s("tr", null, [
                    t[328] || (t[328] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[69] || (t[69] = (e) => at("customer")),
                      class: "iws-sortable"
                    }, [
                      t[320] || (t[320] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[70] || (t[70] = (e) => at("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[321] || (t[321] = s("span", null, "Invoices", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[71] || (t[71] = (e) => at("net_total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[322] || (t[322] = s("span", null, "Net Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("net_total")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[72] || (t[72] = (e) => at("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[323] || (t[323] = s("span", null, "Discount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("total_discount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[73] || (t[73] = (e) => at("total_tax")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[324] || (t[324] = s("span", null, "Tax (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("total_tax")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[74] || (t[74] = (e) => at("avg_invoice_value")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[325] || (t[325] = s("span", null, "Avg Invoice (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("avg_invoice_value")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[75] || (t[75] = (e) => at("outstanding_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[326] || (t[326] = s("span", null, "Outstanding (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("outstanding_amount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[76] || (t[76] = (e) => at("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[327] || (t[327] = s("span", null, "Total Amount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ot("total_amount")])
                      }, "⇅", 2)
                    ]),
                    t[329] || (t[329] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(fa.value, (e, g) => (l(), o("tr", {
                    key: (e.customer || e.customer_name) + "|" + g
                  }, [
                    s("td", jc, a(g + 1), 1),
                    s("td", Mc, a(e.customer_name || e.customer), 1),
                    s("td", Dc, a(e.invoice_count), 1),
                    s("td", Tc, a(H(e.net_total)), 1),
                    s("td", Oc, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    s("td", Rc, a(H(e.total_tax)), 1),
                    s("td", Pc, a(H(e.avg_invoice_value)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.outstanding_amount > 0 ? "red" : ""])
                    }, a(e.outstanding_amount ? d(e.outstanding_amount) : "—"), 3),
                    s("td", Ic, a(d(e.total_amount)), 1),
                    s("td", Vc, [
                      s("div", Nc, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Zt.value = Zt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Ec),
                        Zt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[77] || (t[77] = (Q) => Zt.value = null)
                          }),
                          s("div", qc, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Zt.value = null, hn(e);
                              }
                            }, "Copy row", 8, Bc),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Zt.value = null, bn(e);
                              }
                            }, "Download row as CSV", 8, Ac)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", $c, [
                    t[330] || (t[330] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[331] || (t[331] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", Lc, a(_s.value.invoices), 1),
                    s("td", Qc, a(d(_s.value.net)), 1),
                    s("td", Fc, a(d(_s.value.discount)), 1),
                    s("td", Hc, a(d(_s.value.tax)), 1),
                    t[332] || (t[332] = s("td", null, null, -1)),
                    s("td", zc, a(d(_s.value.outstanding)), 1),
                    s("td", Wc, a(d(_s.value.amount)), 1),
                    t[333] || (t[333] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Uc, a(za.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "profit" ? (l(), o("div", Kc, [
          s("div", Gc, [
            t[335] || (t[335] = x('<div class="bs-page-head-icon pw-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><line x1="12" y1="1" x2="12" y2="23" data-v-42720c7a></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Profit-wise Report (by Item)</div><div class="bs-page-head-sub" data-v-42720c7a>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost.</div></div>', 2)),
            s("div", Yc, [
              s("div", Jc, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Zc, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[78] || (t[78] = (e) => Ct.value = !Ct.value),
                  disabled: !cs.value.length
                }, [...t[334] || (t[334] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Xc),
                Ct.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[79] || (t[79] = (e) => Ct.value = !1)
                  }),
                  s("div", sm, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[80] || (t[80] = (e) => {
                        Ct.value = !1, Ca();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[81] || (t[81] = (e) => {
                        Ct.value = !1, Y(Ca);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[82] || (t[82] = (e) => {
                        Ct.value = !1, an();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Le.value ? (l(), o("div", tm)) : cs.value.length ? (l(), o(u, { key: 1 }, [
            s("div", em, [
              s("div", {
                class: c(["iws-total-panel", xt.value >= 0 ? "" : "iws-total-panel-neg"])
              }, [
                s("div", {
                  class: c(["iws-total-icon", xt.value >= 0 ? "" : "iws-total-icon-neg"])
                }, [...t[336] || (t[336] = [
                  s("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    s("line", {
                      x1: "12",
                      y1: "1",
                      x2: "12",
                      y2: "23"
                    }),
                    s("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })
                  ], -1)
                ])], 2),
                t[338] || (t[338] = s("div", { class: "iws-total-label" }, "Total Profit", -1)),
                s("div", {
                  class: c(["iws-total-value", xt.value >= 0 ? "" : "iws-total-value-neg"]),
                  style: qs(G(d(xt.value)))
                }, a(d(xt.value)), 7),
                s("div", am, [
                  os(a(cs.value.length) + " " + a(cs.value.length === 1 ? "Item" : "Items") + " • ", 1),
                  s("span", {
                    class: c(Ce.value >= 0 ? "green" : "red")
                  }, a(Ce.value.toFixed(1)) + "% margin", 3)
                ]),
                Kt.value ? (l(), o("div", om, [
                  t[337] || (t[337] = s("span", { class: "iws-total-sub-label" }, "No cost data", -1)),
                  s("span", lm, a(Kt.value) + " item" + a(Kt.value > 1 ? "s" : ""), 1)
                ])) : h("", !0)
              ], 2),
              s("div", nm, [
                s("table", im, [
                  s("thead", null, [
                    s("tr", null, [
                      t[346] || (t[346] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[83] || (t[83] = (e) => St("item")),
                        class: "iws-sortable"
                      }, [
                        t[339] || (t[339] = s("span", null, "Item", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("item")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[84] || (t[84] = (e) => St("qty_sold")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[340] || (t[340] = s("span", null, "Qty Sold", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("qty_sold")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[85] || (t[85] = (e) => St("revenue")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[341] || (t[341] = s("span", null, "Revenue (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("revenue")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[86] || (t[86] = (e) => St("cost_rate")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[342] || (t[342] = s("span", null, "Cost Rate (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("cost_rate")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[87] || (t[87] = (e) => St("total_cost")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[343] || (t[343] = s("span", null, "Total Cost (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("total_cost")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[88] || (t[88] = (e) => St("profit")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[344] || (t[344] = s("span", null, "Profit (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("profit")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[89] || (t[89] = (e) => St("margin_pct")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[345] || (t[345] = s("span", null, "Margin %", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", jt("margin_pct")])
                        }, "⇅", 2)
                      ]),
                      t[347] || (t[347] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(ba.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + "|" + g
                    }, [
                      s("td", dm, a(g + 1), 1),
                      s("td", rm, [
                        os(a(e.item_name || e.item_code) + " ", 1),
                        e.cost_rate ? h("", !0) : (l(), o("span", um, "no cost data"))
                      ]),
                      s("td", cm, a(_(e.qty_sold)), 1),
                      s("td", mm, a(H(e.revenue)), 1),
                      s("td", vm, a(e.cost_rate ? H(e.cost_rate) : "—"), 1),
                      s("td", _m, a(e.total_cost ? H(e.total_cost) : "—"), 1),
                      s("td", {
                        class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                      s("td", {
                        class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3),
                      s("td", pm, [
                        s("div", ym, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Gt.value = Gt.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, hm),
                          Gt.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[90] || (t[90] = (Q) => Gt.value = null)
                            }),
                            s("div", bm, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gt.value = null, on(e);
                                }
                              }, "Copy row", 8, gm),
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gt.value = null, ln(e);
                                }
                              }, "Download row as CSV", 8, km)
                            ])
                          ], 64)) : h("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", wm, [
                      t[348] || (t[348] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[349] || (t[349] = s("td", { class: "fw-700" }, "Total", -1)),
                      s("td", fm, a(_(cs.value.reduce((e, g) => e + Number(g.qty_sold || 0), 0))), 1),
                      s("td", xm, a(d(cs.value.reduce((e, g) => e + Number(g.revenue || 0), 0))), 1),
                      t[350] || (t[350] = s("td", null, null, -1)),
                      s("td", Cm, a(d(cs.value.filter((e) => e.cost_rate).reduce((e, g) => e + Number(g.total_cost || 0), 0))), 1),
                      s("td", {
                        class: c(["ta-r fw-700", xt.value >= 0 ? "green" : "red"])
                      }, a(d(xt.value)), 3),
                      s("td", {
                        class: c(["ta-r fw-700", Ce.value >= 0 ? "green" : "red"])
                      }, a(Ce.value.toFixed(1)) + "%", 3),
                      t[351] || (t[351] = s("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ]),
            Kt.value ? (l(), o("div", Sm, a(Kt.value) + " item" + a(Kt.value > 1 ? "s" : "") + ' excluded from the profit/margin totals above — no valuation or standard buying rate found (see "no cost data" tag). ', 1)) : h("", !0)
          ], 64)) : (l(), o("div", jm, a(Wa.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "invoice_profit" ? (l(), o("div", Mm, [
          s("div", Dm, [
            t[353] || (t[353] = x('<div class="bs-page-head-icon ip-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-42720c7a></path><polyline points="14 2 14 8 20 8" data-v-42720c7a></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-42720c7a></line><line x1="9" y1="11" x2="13" y2="11" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Invoice Profitability</div><div class="bs-page-head-sub" data-v-42720c7a>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost. Tick rows to see profit for a single invoice or any combination of selected invoices.</div></div>', 2)),
            s("div", Tm, [
              s("div", Om, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Rm, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[91] || (t[91] = (e) => Dt.value = !Dt.value),
                  disabled: !ds.value.length
                }, [...t[352] || (t[352] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Pm),
                Dt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[92] || (t[92] = (e) => Dt.value = !1)
                  }),
                  s("div", Im, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[93] || (t[93] = (e) => {
                        Dt.value = !1, Sa();
                      })
                    }, "Download CSV" + a(Ts.value.size ? " (selected)" : ""), 1),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[94] || (t[94] = (e) => {
                        Dt.value = !1, Y(Sa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[95] || (t[95] = (e) => {
                        Dt.value = !1, rn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Qe.value ? (l(), o("div", Vm)) : ds.value.length ? (l(), o("div", Nm, [
            s("div", {
              class: c(["iws-total-panel", is.value.profit >= 0 ? "" : "iws-total-panel-neg"])
            }, [
              s("div", {
                class: c(["iws-total-icon", is.value.profit >= 0 ? "" : "iws-total-icon-neg"])
              }, [...t[354] || (t[354] = [
                x('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-42720c7a></path><polyline points="14 2 14 8 20 8" data-v-42720c7a></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-42720c7a></line><line x1="9" y1="11" x2="13" y2="11" data-v-42720c7a></line></svg>', 1)
              ])], 2),
              t[355] || (t[355] = s("div", { class: "iws-total-label" }, "Total Profit", -1)),
              s("div", {
                class: c(["iws-total-value", is.value.profit >= 0 ? "" : "iws-total-value-neg"]),
                style: qs(G(d(is.value.profit)))
              }, a(d(is.value.profit)), 7),
              s("div", Em, [
                os(a(ds.value.length) + " " + a(ds.value.length === 1 ? "Invoice" : "Invoices") + " • ", 1),
                s("span", {
                  class: c(is.value.revenue ? is.value.profit >= 0 ? "green" : "red" : "")
                }, a(is.value.revenue ? (is.value.profit / is.value.revenue * 100).toFixed(1) : "0.0") + "% margin ", 3)
              ]),
              Ts.value.size ? (l(), o("div", qm, [
                s("span", Bm, a(le.value.count) + " selected", 1),
                s("span", {
                  class: c(["iws-total-sub-value", le.value.profit >= 0 ? "green" : "red"]),
                  style: { color: "inherit" }
                }, a(d(le.value.profit)), 3),
                s("div", Am, " Revenue " + a(d(le.value.revenue)) + " • Cost " + a(d(le.value.total_cost)), 1)
              ])) : h("", !0)
            ], 2),
            s("div", $m, [
              s("table", Lm, [
                s("thead", null, [
                  s("tr", null, [
                    s("th", Qm, [
                      s("input", {
                        type: "checkbox",
                        checked: Do.value,
                        onChange: dn
                      }, null, 40, Fm)
                    ]),
                    s("th", {
                      onClick: t[96] || (t[96] = (e) => Ot("invoice")),
                      class: "iws-sortable"
                    }, [
                      t[356] || (t[356] = s("span", null, "Invoice", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("invoice")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[97] || (t[97] = (e) => Ot("posting_date")),
                      class: "iws-sortable"
                    }, [
                      t[357] || (t[357] = s("span", null, "Date", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("posting_date")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[98] || (t[98] = (e) => Ot("customer")),
                      class: "iws-sortable"
                    }, [
                      t[358] || (t[358] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[99] || (t[99] = (e) => Ot("revenue")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[359] || (t[359] = s("span", null, "Revenue (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("revenue")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[100] || (t[100] = (e) => Ot("total_cost")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[360] || (t[360] = s("span", null, "Est. Cost (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("total_cost")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[101] || (t[101] = (e) => Ot("profit")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[361] || (t[361] = s("span", null, "Profit (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("profit")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[102] || (t[102] = (e) => Ot("margin_pct")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[362] || (t[362] = s("span", null, "Margin %", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Rt("margin_pct")])
                      }, "⇅", 2)
                    ]),
                    t[363] || (t[363] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ga.value, (e) => (l(), o("tr", {
                    key: e.invoice,
                    class: c({ "row-selected": Ts.value.has(e.invoice) })
                  }, [
                    s("td", Hm, [
                      s("input", {
                        type: "checkbox",
                        checked: Ts.value.has(e.invoice),
                        onChange: (g) => nn(e.invoice)
                      }, null, 40, zm)
                    ]),
                    s("td", Wm, [
                      s("a", {
                        href: "#",
                        class: "inv-detail-link",
                        onClick: Dn((g) => Ka(e.invoice), ["prevent"])
                      }, a(e.invoice), 9, Um),
                      e.no_cost_lines ? (l(), o("span", Km, "partial cost data")) : h("", !0)
                    ]),
                    s("td", Gm, a(e.posting_date), 1),
                    s("td", Ym, a(e.customer_name || e.customer), 1),
                    s("td", Jm, a(d(e.revenue)), 1),
                    s("td", Zm, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(Number(e.margin_pct || 0).toFixed(1)) + "%", 3),
                    s("td", Xm, [
                      s("div", sv, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (g) => Tt.value = Tt.value === e.invoice ? null : e.invoice,
                          title: "Row actions"
                        }, "⋮", 8, tv),
                        Tt.value === e.invoice ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[103] || (t[103] = (g) => Tt.value = null)
                          }),
                          s("div", ev, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Tt.value = null, Ka(e.invoice);
                              }
                            }, "View P&L", 8, av),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Tt.value = null, un(e);
                              }
                            }, "Copy row", 8, ov),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Tt.value = null, cn(e);
                              }
                            }, "Download row as CSV", 8, lv)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ], 2))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", nv, [
                    t[364] || (t[364] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[365] || (t[365] = s("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "Total", -1)),
                    s("td", iv, a(d(is.value.revenue)), 1),
                    s("td", dv, a(d(is.value.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r fw-700", is.value.profit >= 0 ? "green" : "red"])
                    }, a(d(is.value.profit)), 3),
                    s("td", {
                      class: c(["ta-r fw-700", is.value.profit >= 0 ? "green" : "red"])
                    }, a(is.value.revenue ? (is.value.profit / is.value.revenue * 100).toFixed(1) : "0.0") + "%", 3),
                    t[366] || (t[366] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", rv, a(Ua.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        Cn(jn, {
          show: Fe.value,
          width: "720px",
          title: ns.value ? `Profit & Loss — ${ns.value.invoice.name}` : "Profit & Loss",
          onClose: t[104] || (t[104] = (e) => Fe.value = !1)
        }, {
          default: Sn(() => [
            He.value ? (l(), o("div", uv)) : ns.value ? (l(), o(u, { key: 1 }, [
              s("div", cv, [
                s("span", null, [
                  t[367] || (t[367] = os("Date: ", -1)),
                  s("strong", mv, a(ns.value.invoice.posting_date), 1)
                ]),
                s("span", null, [
                  t[368] || (t[368] = os("Customer: ", -1)),
                  s("strong", vv, a(ns.value.invoice.customer_name || ns.value.invoice.customer), 1)
                ]),
                s("span", null, [
                  t[369] || (t[369] = os("Status: ", -1)),
                  s("strong", _v, a(ns.value.invoice.status), 1)
                ])
              ]),
              ns.value.totals.no_cost_lines ? (l(), o("div", pv, a(ns.value.totals.no_cost_lines) + " item" + a(ns.value.totals.no_cost_lines > 1 ? "s" : "") + ' below have no valuation or standard buying rate — their cost is shown as "—" and excluded from the totals. ', 1)) : h("", !0),
              s("table", yv, [
                t[372] || (t[372] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Rate"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost Rate"),
                    s("th", { class: "ta-r" }, "Total Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ns.value.items, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", hv, a(_(e.qty)), 1),
                    s("td", bv, a(d(e.rate)), 1),
                    s("td", gv, a(d(e.revenue)), 1),
                    s("td", kv, a(e.cost_rate ? d(e.cost_rate) : "—"), 1),
                    s("td", wv, a(e.cost_rate ? d(e.total_cost) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", fv, [
                    t[370] || (t[370] = s("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "TOTAL", -1)),
                    s("td", xv, a(d(ns.value.totals.revenue)), 1),
                    t[371] || (t[371] = s("td", null, null, -1)),
                    s("td", Cv, a(d(ns.value.totals.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r fw-700", ns.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(d(ns.value.totals.profit)), 3),
                    s("td", {
                      class: c(["ta-r fw-700", ns.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(Number(ns.value.totals.margin_pct || 0).toFixed(1)) + "%", 3)
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Sv, "Couldn't load this invoice."))
          ]),
          _: 1
        }, 8, ["show", "title"]),
        k.value === "tb" ? (l(), o("div", jv, [
          s("div", Mv, [
            t[374] || (t[374] = x('<div class="bs-page-head-icon tb-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><line x1="18" y1="20" x2="18" y2="10" data-v-42720c7a></line><line x1="12" y1="20" x2="12" y2="4" data-v-42720c7a></line><line x1="6" y1="20" x2="6" y2="14" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Trial Balance</div><div class="bs-page-head-sub" data-v-42720c7a>Account-wise opening, movement and closing balances for the selected period</div></div>', 2)),
            s("div", Dv, [
              s("div", Tv, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Ov, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[105] || (t[105] = (e) => rt.value = !rt.value),
                  disabled: !((p = w(Gs)) != null && p.length)
                }, [...t[373] || (t[373] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Rv),
                rt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[106] || (t[106] = (e) => rt.value = !1)
                  }),
                  s("div", Pv, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[107] || (t[107] = (e) => {
                        rt.value = !1, Pa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[108] || (t[108] = (e) => {
                        rt.value = !1, Y(Pa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[109] || (t[109] = (e) => {
                        rt.value = !1, xl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          w(wl) ? (l(), o("div", Iv)) : (j = w(Gs)) != null && j.length ? (l(), o(u, { key: 1 }, [
            s("div", Vv, [
              s("div", Nv, [
                t[376] || (t[376] = s("div", { class: "bs-kpi-icon" }, [
                  s("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("line", {
                      x1: "12",
                      y1: "19",
                      x2: "12",
                      y2: "5"
                    }),
                    s("polyline", { points: "5 12 12 5 19 12" })
                  ])
                ], -1)),
                s("div", Ev, [
                  t[375] || (t[375] = s("div", { class: "bs-kpi-label" }, "Total Debit", -1)),
                  s("div", qv, a(d(ms.value.debit)), 1)
                ])
              ]),
              s("div", Bv, [
                t[378] || (t[378] = s("div", { class: "bs-kpi-icon" }, [
                  s("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("line", {
                      x1: "12",
                      y1: "5",
                      x2: "12",
                      y2: "19"
                    }),
                    s("polyline", { points: "19 12 12 19 5 12" })
                  ])
                ], -1)),
                s("div", Av, [
                  t[377] || (t[377] = s("div", { class: "bs-kpi-label" }, "Total Credit", -1)),
                  s("div", $v, a(d(ms.value.credit)), 1)
                ])
              ])
            ]),
            s("div", {
              class: c(["bs-sum-status", me.value ? "bs-ok" : "bs-bad"])
            }, [
              s("span", Lv, a(me.value ? "✓" : "✕"), 1),
              s("div", Qv, [
                s("div", Fv, a(me.value ? "Total Debit = Total Credit" : "Trial balance out of balance"), 1),
                s("div", Hv, [
                  os(a(d(ms.value.debit)) + " vs " + a(d(ms.value.credit)), 1),
                  me.value ? h("", !0) : (l(), o(u, { key: 0 }, [
                    os(" (diff " + a(d(ms.value.debit - ms.value.credit)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            s("div", zv, [
              s("table", Wv, [
                s("thead", null, [
                  s("tr", null, [
                    t[385] || (t[385] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[110] || (t[110] = (e) => $t("account")),
                      class: "iws-sortable"
                    }, [
                      t[379] || (t[379] = s("span", null, "Account", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Lt("account")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[111] || (t[111] = (e) => $t("account_type")),
                      class: "iws-sortable"
                    }, [
                      t[380] || (t[380] = s("span", null, "Type", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Lt("account_type")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[112] || (t[112] = (e) => $t("opening")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[381] || (t[381] = s("span", null, "Opening (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Lt("opening")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[113] || (t[113] = (e) => $t("debit")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[382] || (t[382] = s("span", null, "Debit (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Lt("debit")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[114] || (t[114] = (e) => $t("credit")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[383] || (t[383] = s("span", null, "Credit (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Lt("credit")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[115] || (t[115] = (e) => $t("closing")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[384] || (t[384] = s("span", null, "Closing (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Lt("closing")])
                      }, "⇅", 2)
                    ]),
                    t[386] || (t[386] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(Ne.value, (e, g) => (l(), o("tr", {
                    key: e.account
                  }, [
                    s("td", Uv, a(g + 1), 1),
                    s("td", Kv, a(e.account), 1),
                    s("td", null, [
                      s("span", Gv, a(e.account_type), 1)
                    ]),
                    s("td", {
                      class: c(["ta-r mono-sm", e.opening < 0 ? "red" : ""])
                    }, a(H(e.opening || 0)), 3),
                    s("td", Yv, a(e.debit ? H(e.debit) : "—"), 1),
                    s("td", Jv, a(e.credit ? H(e.credit) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.closing < 0 ? "red" : "green"])
                    }, a(d(e.closing || 0)), 3),
                    s("td", Zv, [
                      s("div", Xv, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => At.value = At.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, s1),
                        At.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[116] || (t[116] = (Q) => At.value = null)
                          }),
                          s("div", t1, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                At.value = null, Cl(e);
                              }
                            }, "Copy row", 8, e1),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                At.value = null, Sl(e);
                              }
                            }, "Download row as CSV", 8, a1)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", o1, [
                    t[387] || (t[387] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[388] || (t[388] = s("td", { class: "fw-700" }, "Total", -1)),
                    t[389] || (t[389] = s("td", null, null, -1)),
                    s("td", l1, a(d(ms.value.opening)), 1),
                    s("td", n1, a(d(ms.value.debit)), 1),
                    s("td", i1, a(d(ms.value.credit)), 1),
                    s("td", d1, a(d(ms.value.closing)), 1),
                    t[390] || (t[390] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ], 64)) : (l(), o("div", r1, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "stockgl" ? (l(), o("div", u1, [
          s("div", c1, [
            t[392] || (t[392] = x('<div class="bs-page-head-icon sgl-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-42720c7a></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-42720c7a></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Stock Ledger vs Inventory GL</div><div class="bs-page-head-sub" data-v-42720c7a>Compares the operational Stock Ledger (Bin valuation) against the financial General Ledger (Inventory Asset account balance) — this check is the tripwire that catches drift immediately instead of at year-end audit.</div></div>', 2)),
            s("div", m1, [
              s("div", v1, "As of " + a(P(y.value)), 1),
              s("div", _1, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[117] || (t[117] = (e) => yt.value = !yt.value),
                  disabled: !ss.value
                }, [...t[391] || (t[391] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, p1),
                yt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[118] || (t[118] = (e) => yt.value = !1)
                  }),
                  s("div", y1, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[119] || (t[119] = (e) => {
                        yt.value = !1, Vl();
                      })
                    }, "Download account summary (CSV)"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[120] || (t[120] = (e) => {
                        yt.value = !1, Bl();
                      })
                    }, "Download item-level detail (CSV)"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[121] || (t[121] = (e) => {
                        yt.value = !1, El();
                      })
                    }, "Copy item-level detail")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          ze.value ? (l(), o("div", h1)) : ss.value ? (l(), o(u, { key: 1 }, [
            s("div", b1, [
              s("div", g1, [
                t[394] || (t[394] = s("div", { class: "bs-kpi-icon" }, [
                  s("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
                  ])
                ], -1)),
                s("div", k1, [
                  t[393] || (t[393] = s("div", { class: "bs-kpi-label" }, "Bin Stock Value", -1)),
                  s("div", w1, a(d(ss.value.total_bin_value)), 1)
                ])
              ]),
              s("div", f1, [
                t[396] || (t[396] = s("div", { class: "bs-kpi-icon" }, [
                  s("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("rect", {
                      x: "2",
                      y: "3",
                      width: "20",
                      height: "18",
                      rx: "2"
                    }),
                    s("line", {
                      x1: "8",
                      y1: "3",
                      x2: "8",
                      y2: "21"
                    })
                  ])
                ], -1)),
                s("div", x1, [
                  t[395] || (t[395] = s("div", { class: "bs-kpi-label" }, "Inventory GL Balance", -1)),
                  s("div", C1, a(d(ss.value.total_gl_balance)), 1)
                ])
              ]),
              s("div", {
                class: c(["bs-kpi", ss.value.is_reconciled ? "bs-kpi-assets" : "bs-kpi-liabilities"])
              }, [
                t[398] || (t[398] = s("div", { class: "bs-kpi-icon" }, [
                  s("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("line", {
                      x1: "12",
                      y1: "1",
                      x2: "12",
                      y2: "23"
                    }),
                    s("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })
                  ])
                ], -1)),
                s("div", S1, [
                  t[397] || (t[397] = s("div", { class: "bs-kpi-label" }, "Difference", -1)),
                  s("div", {
                    class: c(["bs-kpi-amount", ss.value.is_reconciled ? "" : "text-danger"])
                  }, a(d(ss.value.total_difference)), 3)
                ])
              ], 2)
            ]),
            s("div", {
              class: c(["bs-sum-status", ss.value.is_reconciled ? "bs-ok" : "bs-bad"])
            }, [
              s("span", j1, a(ss.value.is_reconciled ? "✓" : "✕"), 1),
              s("div", M1, [
                s("div", D1, a(ss.value.is_reconciled ? "Bin Stock Value = Inventory GL Balance" : "Stock and GL are out of sync"), 1),
                s("div", T1, [
                  os(a(d(ss.value.total_bin_value)) + " vs " + a(d(ss.value.total_gl_balance)), 1),
                  ss.value.is_reconciled ? h("", !0) : (l(), o(u, { key: 0 }, [
                    os(" (diff " + a(d(ss.value.total_difference)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            ss.value.grir_account ? (l(), o("div", O1, [
              t[399] || (t[399] = s("strong", null, "Stock Received (GR/IR):", -1)),
              t[400] || (t[400] = os()),
              s("span", R1, a(d(ss.value.grir_balance)), 1),
              t[401] || (t[401] = s("span", null, " — goods received, awaiting bill. Nonzero is normal.", -1))
            ])) : h("", !0),
            (D = ss.value.accounts) != null && D.length ? (l(), o(u, { key: 1 }, [
              t[409] || (t[409] = s("div", { class: "iws-section-label" }, "By Inventory Account", -1)),
              s("div", P1, [
                s("table", I1, [
                  s("thead", null, [
                    s("tr", null, [
                      t[406] || (t[406] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[122] || (t[122] = (e) => he("account")),
                        class: "iws-sortable"
                      }, [
                        t[402] || (t[402] = s("span", null, "Inventory Account", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("account")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[123] || (t[123] = (e) => he("bin_stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[403] || (t[403] = s("span", null, "Bin Stock Value (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("bin_stock_value")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[124] || (t[124] = (e) => he("gl_balance")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[404] || (t[404] = s("span", null, "GL Balance (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("gl_balance")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[125] || (t[125] = (e) => he("difference")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[405] || (t[405] = s("span", null, "Difference (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("difference")])
                        }, "⇅", 2)
                      ]),
                      t[407] || (t[407] = s("th", null, "Status", -1)),
                      t[408] || (t[408] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(Ya.value, (e, g) => (l(), o("tr", {
                      key: e.account
                    }, [
                      s("td", V1, a(g + 1), 1),
                      s("td", N1, a(e.account), 1),
                      s("td", E1, a(H(e.bin_stock_value)), 1),
                      s("td", q1, a(H(e.gl_balance)), 1),
                      s("td", {
                        class: c(["ta-r mono-sm", e.is_reconciled ? "" : "text-danger fw-700"])
                      }, a(H(e.difference)), 3),
                      s("td", null, [
                        s("span", {
                          class: c(["badge", e.is_reconciled ? "badge-blue" : "badge-danger"])
                        }, a(e.is_reconciled ? "OK" : "DRIFT"), 3)
                      ]),
                      s("td", B1, [
                        s("div", A1, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => te.value = te.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, $1),
                          te.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[126] || (t[126] = (Q) => te.value = null)
                            }),
                            s("div", L1, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  te.value = null, Il(e);
                                }
                              }, "Copy row", 8, Q1)
                            ])
                          ], 64)) : h("", !0)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ])
            ], 64)) : h("", !0),
            (N = ss.value.items) != null && N.length ? (l(), o(u, { key: 2 }, [
              t[421] || (t[421] = s("div", { class: "iws-section-label" }, "Item-level Bin Detail", -1)),
              s("div", F1, [
                s("table", H1, [
                  s("thead", null, [
                    s("tr", null, [
                      t[415] || (t[415] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[127] || (t[127] = (e) => ee("item")),
                        class: "iws-sortable"
                      }, [
                        t[410] || (t[410] = s("span", null, "Item", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ae("item")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[128] || (t[128] = (e) => ee("warehouse")),
                        class: "iws-sortable"
                      }, [
                        t[411] || (t[411] = s("span", null, "Warehouse", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ae("warehouse")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[129] || (t[129] = (e) => ee("actual_qty")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[412] || (t[412] = s("span", null, "Qty", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ae("actual_qty")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[130] || (t[130] = (e) => ee("valuation_rate")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[413] || (t[413] = s("span", null, "Valuation Rate (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ae("valuation_rate")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[131] || (t[131] = (e) => ee("stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[414] || (t[414] = s("span", null, "Stock Value (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ae("stock_value")])
                        }, "⇅", 2)
                      ]),
                      t[416] || (t[416] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(We.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + e.warehouse
                    }, [
                      s("td", z1, a(g + 1), 1),
                      s("td", W1, a(e.item_name || e.item_code), 1),
                      s("td", null, [
                        s("span", U1, a(e.warehouse), 1)
                      ]),
                      s("td", K1, a(_(e.actual_qty)), 1),
                      s("td", G1, a(H(e.valuation_rate)), 1),
                      s("td", Y1, a(d(e.stock_value)), 1),
                      s("td", J1, [
                        s("div", Z1, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Ht.value = Ht.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, X1),
                          Ht.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[132] || (t[132] = (Q) => Ht.value = null)
                            }),
                            s("div", s_, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Ht.value = null, Nl(e);
                                }
                              }, "Copy row", 8, t_),
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Ht.value = null, ql(e);
                                }
                              }, "Download row as CSV", 8, e_)
                            ])
                          ], 64)) : h("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", a_, [
                      t[417] || (t[417] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[418] || (t[418] = s("td", {
                        colspan: "3",
                        class: "fw-700"
                      }, "Total", -1)),
                      t[419] || (t[419] = s("td", null, null, -1)),
                      s("td", o_, a(d(Ue.value)), 1),
                      t[420] || (t[420] = s("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", l_, a(Ga.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "stockval" ? (l(), o("div", n_, [
          s("div", i_, [
            t[423] || (t[423] = x('<div class="bs-page-head-icon sv-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="3" y="3" width="18" height="18" rx="2" data-v-42720c7a></rect><path d="M3 9h18" data-v-42720c7a></path><path d="M9 21V9" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Stock Valuation Summary</div><div class="bs-page-head-sub" data-v-42720c7a>Total stock value per warehouse, from current Bin valuation. Reflects live stock on hand — not a historical point-in-time snapshot, since stock quantities aren&#39;t tracked by date.</div></div>', 2)),
            s("div", d_, [
              s("div", r_, "As of " + a(P(y.value)), 1),
              s("div", u_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[133] || (t[133] = (e) => es("exportStockValCSV")),
                  disabled: !((Et = (Ns = xs.value) == null ? void 0 : Ns.by_warehouse) != null && Et.length)
                }, [...t[422] || (t[422] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, c_),
                f.value === "exportStockValCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[134] || (t[134] = (e) => f.value = "")
                  }),
                  s("div", m_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[135] || (t[135] = (e) => {
                        f.value = "", To();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[136] || (t[136] = (e) => {
                        f.value = "", Y(To);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Ke.value ? (l(), o("div", v_)) : xs.value ? (l(), o(u, { key: 1 }, [
            s("div", __, [
              s("div", p_, [
                t[425] || (t[425] = x('<div class="bs-kpi-icon" data-v-42720c7a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-42720c7a><rect x="3" y="3" width="18" height="18" rx="2" data-v-42720c7a></rect><path d="M3 9h18" data-v-42720c7a></path><path d="M9 21V9" data-v-42720c7a></path></svg></div>', 1)),
                s("div", y_, [
                  t[424] || (t[424] = s("div", { class: "bs-kpi-label" }, "Grand Total Stock Value", -1)),
                  s("div", h_, a(d(xs.value.grand_total)), 1)
                ])
              ])
            ]),
            (Ko = xs.value.by_warehouse) != null && Ko.length ? (l(), o(u, { key: 0 }, [
              t[430] || (t[430] = s("div", { class: "iws-section-label" }, "By Warehouse", -1)),
              s("div", b_, [
                s("table", g_, [
                  t[429] || (t[429] = s("thead", null, [
                    s("tr", null, [
                      s("th", { class: "iws-idx" }, "#"),
                      s("th", null, "Warehouse"),
                      s("th", { class: "ta-r" }, "Stock Value (KES)"),
                      s("th", { class: "ta-r" }, "% of Total")
                    ])
                  ], -1)),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(xs.value.by_warehouse, (e, g) => (l(), o("tr", {
                      key: e.warehouse
                    }, [
                      s("td", k_, a(g + 1), 1),
                      s("td", w_, a(e.warehouse), 1),
                      s("td", f_, a(d(e.stock_value)), 1),
                      s("td", x_, a(xs.value.grand_total ? (e.stock_value / xs.value.grand_total * 100).toFixed(1) + "%" : "—"), 1)
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", C_, [
                      t[426] || (t[426] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[427] || (t[427] = s("td", { class: "fw-700" }, "Total", -1)),
                      s("td", S_, a(d(xs.value.grand_total)), 1),
                      t[428] || (t[428] = s("td", { class: "ta-r fw-700" }, "100.0%", -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", j_, "No stock on hand in any warehouse."))
          ], 64)) : (l(), o("div", M_, a(Xa.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "price_mrp" ? (l(), o("div", D_, [
          s("div", T_, [
            t[432] || (t[432] = x('<div class="bs-page-head-icon sv-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-42720c7a></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Selling Price &amp; MRP</div><div class="bs-page-head-sub" data-v-42720c7a>Item-wise selling price and MRP per warehouse, from the Item master. Where MRP is not set on an item, the selling price is shown as MRP.</div></div>', 2)),
            s("div", O_, [
              s("div", R_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[137] || (t[137] = (e) => es("exportPriceMrpCSV")),
                  disabled: !fe.value.length
                }, [...t[431] || (t[431] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, P_),
                f.value === "exportPriceMrpCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[138] || (t[138] = (e) => f.value = "")
                  }),
                  s("div", I_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[139] || (t[139] = (e) => {
                        f.value = "", Oo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[140] || (t[140] = (e) => {
                        f.value = "", Y(Oo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", V_, [
            Es(s("input", {
              type: "text",
              "onUpdate:modelValue": t[141] || (t[141] = (e) => Ye.value = e),
              class: "dr-input",
              placeholder: "Search item code or name",
              style: { "min-width": "220px" }
            }, null, 512), [
              [Ks, Ye.value]
            ]),
            Es(s("select", {
              "onUpdate:modelValue": t[142] || (t[142] = (e) => we.value = e),
              class: "dr-input"
            }, [
              t[433] || (t[433] = s("option", { value: "" }, "All warehouses", -1)),
              (l(!0), o(u, null, m(((Go = oe.value) == null ? void 0 : Go.warehouses) || [], (e) => (l(), o("option", {
                key: e,
                value: e
              }, a(e), 9, N_))), 128))
            ], 512), [
              [sl, we.value]
            ])
          ]),
          Ge.value ? (l(), o("div", E_)) : oe.value && fe.value.length ? (l(), o("div", q_, [
            s("table", B_, [
              t[434] || (t[434] = s("thead", null, [
                s("tr", null, [
                  s("th", { class: "iws-idx" }, "#"),
                  s("th", null, "Item"),
                  s("th", null, "Warehouse"),
                  s("th", { class: "ta-r" }, "Stock Qty"),
                  s("th", { class: "ta-r" }, "Selling Price (KES)"),
                  s("th", { class: "ta-r" }, "MRP (KES)")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(fe.value, (e, g) => (l(), o("tr", {
                  key: e.item_code + "|" + e.warehouse
                }, [
                  s("td", A_, a(g + 1), 1),
                  s("td", $_, [
                    os(a(e.item_name || e.item_code), 1),
                    s("div", L_, a(e.item_code), 1)
                  ]),
                  s("td", null, a(e.warehouse || "—"), 1),
                  s("td", Q_, a(e.qty) + " " + a(e.uom), 1),
                  s("td", F_, a(d(e.selling_price)), 1),
                  s("td", H_, a(d(e.mrp)), 1)
                ]))), 128))
              ])
            ])
          ])) : (l(), o("div", z_, a(so.value ? "No items found." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "mis" ? (l(), o("div", W_, [
          s("div", U_, [
            t[436] || (t[436] = x('<div class="bs-page-head-icon mis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="3" y="4" width="18" height="18" rx="2" data-v-42720c7a></rect><line x1="3" y1="10" x2="21" y2="10" data-v-42720c7a></line><line x1="8" y1="2" x2="8" y2="6" data-v-42720c7a></line><line x1="16" y1="2" x2="16" y2="6" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Daily Business MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Day-by-day snapshot of Sales, Collection, Purchase, Expenses, Dispatch, Production, Stock Inward/Outward and running Outstanding for the selected period.</div></div>', 2)),
            s("div", K_, [
              s("div", G_, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Y_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[143] || (t[143] = (e) => es("exportDailyMisCSV")),
                  disabled: !((Jo = (Yo = Z.value) == null ? void 0 : Yo.days) != null && Jo.length)
                }, [...t[435] || (t[435] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, J_),
                f.value === "exportDailyMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[144] || (t[144] = (e) => f.value = "")
                  }),
                  s("div", Z_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[145] || (t[145] = (e) => {
                        f.value = "", Ro();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[146] || (t[146] = (e) => {
                        f.value = "", Y(Ro);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Je.value ? (l(), o("div", X_)) : Z.value ? (l(), o(u, { key: 1 }, [
            s("div", sp, [
              s("div", tp, [
                t[437] || (t[437] = s("span", { class: "bucket-label" }, "Daily Sales", -1)),
                s("span", ep, a(d(Z.value.totals.sales_amount)), 1)
              ]),
              s("div", ap, [
                t[438] || (t[438] = s("span", { class: "bucket-label" }, "Daily Collection", -1)),
                s("span", op, a(d(Z.value.totals.collection_amount)), 1)
              ]),
              s("div", lp, [
                t[439] || (t[439] = s("span", { class: "bucket-label" }, "Daily Purchase", -1)),
                s("span", np, a(d(Z.value.totals.purchase_amount)), 1)
              ]),
              s("div", ip, [
                t[440] || (t[440] = s("span", { class: "bucket-label" }, "Daily Expenses", -1)),
                s("span", dp, a(d(Z.value.totals.expense_amount)), 1)
              ]),
              s("div", rp, [
                t[441] || (t[441] = s("span", { class: "bucket-label" }, "Daily Dispatch", -1)),
                s("span", up, a(_(Z.value.totals.dispatch_qty)) + " qty", 1)
              ]),
              s("div", cp, [
                t[442] || (t[442] = s("span", { class: "bucket-label" }, "Daily Production", -1)),
                s("span", mp, a(_(Z.value.totals.production_qty)) + " qty", 1)
              ]),
              s("div", vp, [
                t[443] || (t[443] = s("span", { class: "bucket-label" }, "Stock Inward / Outward", -1)),
                s("span", _p, a(_(Z.value.totals.stock_inward_qty)) + " / " + a(_(Z.value.totals.stock_outward_qty)), 1)
              ]),
              s("div", pp, [
                t[444] || (t[444] = s("span", { class: "bucket-label" }, "Closing Outstanding", -1)),
                s("span", {
                  class: c(["mis-summary-val", Z.value.totals.closing_outstanding >= 0 ? "" : "green"])
                }, a(d(Z.value.totals.closing_outstanding)), 3)
              ])
            ]),
            (Zo = Z.value.days) != null && Zo.length ? (l(), o(u, { key: 0 }, [
              t[447] || (t[447] = s("div", { class: "iws-section-label" }, "Day by Day", -1)),
              s("div", yp, [
                s("table", hp, [
                  t[446] || (t[446] = s("thead", null, [
                    s("tr", null, [
                      s("th", null, "Date"),
                      s("th", { class: "ta-r" }, "Sales"),
                      s("th", { class: "ta-r" }, "Collection"),
                      s("th", { class: "ta-r" }, "Purchase"),
                      s("th", { class: "ta-r" }, "Expenses"),
                      s("th", { class: "ta-r" }, "Dispatch Qty"),
                      s("th", { class: "ta-r" }, "Production Qty"),
                      s("th", { class: "ta-r" }, "Stock In"),
                      s("th", { class: "ta-r" }, "Stock Out"),
                      s("th", { class: "ta-r" }, "Outstanding")
                    ])
                  ], -1)),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(Z.value.days, (e) => (l(), o("tr", {
                      key: e.date
                    }, [
                      s("td", bp, a(e.date), 1),
                      s("td", gp, a(d(e.sales_amount)), 1),
                      s("td", kp, a(d(e.collection_amount)), 1),
                      s("td", wp, a(d(e.purchase_amount)), 1),
                      s("td", fp, a(d(e.expense_amount)), 1),
                      s("td", xp, a(_(e.dispatch_qty)), 1),
                      s("td", Cp, a(_(e.production_qty)), 1),
                      s("td", Sp, a(_(e.stock_inward_qty)), 1),
                      s("td", jp, a(_(e.stock_outward_qty)), 1),
                      s("td", Mp, a(d(e.outstanding)), 1)
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", Dp, [
                      t[445] || (t[445] = s("td", { class: "fw-700" }, "TOTAL", -1)),
                      s("td", Tp, a(d(Z.value.totals.sales_amount)), 1),
                      s("td", Op, a(d(Z.value.totals.collection_amount)), 1),
                      s("td", Rp, a(d(Z.value.totals.purchase_amount)), 1),
                      s("td", Pp, a(d(Z.value.totals.expense_amount)), 1),
                      s("td", Ip, a(_(Z.value.totals.dispatch_qty)), 1),
                      s("td", Vp, a(_(Z.value.totals.production_qty)), 1),
                      s("td", Np, a(_(Z.value.totals.stock_inward_qty)), 1),
                      s("td", Ep, a(_(Z.value.totals.stock_outward_qty)), 1),
                      s("td", qp, a(d(Z.value.totals.closing_outstanding)), 1)
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Bp, "No activity in this period."))
          ], 64)) : (l(), o("div", Ap, a(to.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "sales_mis" ? (l(), o("div", $p, [
          s("div", Lp, [
            t[449] || (t[449] = x('<div class="bs-page-head-icon smis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M3 3v18h18" data-v-42720c7a></path><path d="M18 17V9" data-v-42720c7a></path><path d="M13 17V5" data-v-42720c7a></path><path d="M8 17v-3" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Sales MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Sales performance broken down by summary, target, product, customer, salesperson, branch, returns, discounts, pending orders and conversion.</div></div>', 2)),
            s("div", Qp, [
              s("div", Fp, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Hp, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[147] || (t[147] = (e) => es("exportSalesMisCSV")),
                  disabled: !R.value
                }, [...t[448] || (t[448] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, zp),
                f.value === "exportSalesMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[148] || (t[148] = (e) => f.value = "")
                  }),
                  s("div", Wp, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[149] || (t[149] = (e) => {
                        f.value = "", Po();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[150] || (t[150] = (e) => {
                        f.value = "", Y(Po);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", Up, [
            (l(), o(u, null, m(Al, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: ys.value === e.key }]),
              onClick: (g) => ys.value = e.key
            }, a(e.label), 11, Kp)), 64))
          ]),
          Ze.value ? (l(), o("div", Gp)) : R.value ? (l(), o(u, { key: 1 }, [
            ys.value === "summary" ? (l(), o("div", Yp, [
              s("div", Jp, [
                t[450] || (t[450] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                s("span", Zp, a(_(R.value.summary.invoice_count)), 1)
              ]),
              s("div", Xp, [
                t[451] || (t[451] = s("span", { class: "bucket-label" }, "Net Sales", -1)),
                s("span", s2, a(d(R.value.summary.net_sales)), 1)
              ]),
              s("div", t2, [
                t[452] || (t[452] = s("span", { class: "bucket-label" }, "Total Tax", -1)),
                s("span", e2, a(d(R.value.summary.total_tax)), 1)
              ]),
              s("div", a2, [
                t[453] || (t[453] = s("span", { class: "bucket-label" }, "Discount Given", -1)),
                s("span", o2, a(d(R.value.summary.header_discount)), 1)
              ]),
              s("div", l2, [
                t[454] || (t[454] = s("span", { class: "bucket-label" }, "Grand Total", -1)),
                s("span", n2, a(d(R.value.summary.grand_total)), 1)
              ]),
              s("div", i2, [
                t[455] || (t[455] = s("span", { class: "bucket-label" }, "Qty Sold", -1)),
                s("span", d2, a(_(R.value.summary.total_qty)), 1)
              ]),
              s("div", r2, [
                t[456] || (t[456] = s("span", { class: "bucket-label" }, "Avg Invoice Value", -1)),
                s("span", u2, a(d(R.value.summary.avg_invoice_value)), 1)
              ])
            ])) : ys.value === "target" ? (l(), o(u, { key: 1 }, [
              s("div", c2, [
                t[457] || (t[457] = s("label", { class: "dr-label" }, "Sales Target (KES)", -1)),
                Es(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[151] || (t[151] = (e) => bt.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Ks,
                    bt.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[458] || (t[458] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actuals for this period.", -1))
              ]),
              s("div", m2, [
                s("div", v2, [
                  t[459] || (t[459] = s("span", { class: "bucket-label" }, "Target", -1)),
                  s("span", _2, a(d(bt.value)), 1)
                ]),
                s("div", p2, [
                  t[460] || (t[460] = s("span", { class: "bucket-label" }, "Achieved", -1)),
                  s("span", y2, a(d(R.value.summary.grand_total)), 1)
                ]),
                s("div", h2, [
                  t[461] || (t[461] = s("span", { class: "bucket-label" }, "Achievement %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", ao.value >= 100 ? "green" : "red"])
                  }, a(ao.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", R.value.summary.grand_total >= bt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[462] || (t[462] = s("span", null, "Variance (Achieved − Target)", -1)),
                s("span", b2, a(w(S)(R.value.summary.grand_total - bt.value)), 1)
              ], 2)
            ], 64)) : ys.value === "product" ? (l(), o("table", g2, [
              t[463] || (t[463] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Item"),
                  s("th", null, "UOM"),
                  s("th", { class: "ta-r" }, "Invoices"),
                  s("th", { class: "ta-r" }, "Qty Sold"),
                  s("th", { class: "ta-r" }, "Discount"),
                  s("th", { class: "ta-r" }, "Amount")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(R.value.product_wise, (e) => (l(), o("tr", {
                  key: e.item_code
                }, [
                  s("td", null, a(e.item_name || e.item_code), 1),
                  s("td", null, a(e.uom || "—"), 1),
                  s("td", k2, a(e.invoice_count), 1),
                  s("td", w2, a(_(e.qty_sold)), 1),
                  s("td", f2, a(d(e.total_discount)), 1),
                  s("td", x2, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "customer" ? (l(), o("table", C2, [
              t[464] || (t[464] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Customer"),
                  s("th", { class: "ta-r" }, "Invoices"),
                  s("th", { class: "ta-r" }, "Amount"),
                  s("th", { class: "ta-r" }, "Outstanding")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(R.value.customer_wise, (e) => (l(), o("tr", {
                  key: e.customer
                }, [
                  s("td", null, a(e.customer_name || e.customer), 1),
                  s("td", S2, a(e.invoice_count), 1),
                  s("td", j2, a(d(e.total_amount)), 1),
                  s("td", M2, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "salesperson" ? (l(), o("table", D2, [
              t[465] || (t[465] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Salesperson"),
                  s("th", { class: "ta-r" }, "Invoices"),
                  s("th", { class: "ta-r" }, "Amount")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(R.value.salesperson_wise, (e) => (l(), o("tr", {
                  key: e.sales_person
                }, [
                  s("td", null, a(e.sales_person), 1),
                  s("td", T2, a(e.invoice_count), 1),
                  s("td", O2, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "branch" ? (l(), o(u, { key: 5 }, [
              t[467] || (t[467] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "10px" } }, "No dedicated Branch/Location doctype exists — grouped by Cost Center as a proxy.", -1)),
              s("table", R2, [
                t[466] || (t[466] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Branch / Cost Center"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(R.value.branch_wise, (e) => (l(), o("tr", {
                    key: e.branch
                  }, [
                    s("td", null, a(e.branch), 1),
                    s("td", P2, a(e.invoice_count), 1),
                    s("td", I2, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : ys.value === "returns" ? (l(), o(u, { key: 6 }, [
              s("div", V2, [
                s("div", N2, [
                  t[468] || (t[468] = s("span", { class: "bucket-label" }, "Return Count", -1)),
                  s("span", E2, a(R.value.sales_return.return_count), 1)
                ]),
                s("div", q2, [
                  t[469] || (t[469] = s("span", { class: "bucket-label" }, "Return Value", -1)),
                  s("span", B2, a(d(R.value.sales_return.return_total)), 1)
                ]),
                s("div", A2, [
                  t[470] || (t[470] = s("span", { class: "bucket-label" }, "% of Sales", -1)),
                  s("span", $2, a(R.value.sales_return.return_pct_of_sales.toFixed(1)) + "%", 1)
                ])
              ]),
              R.value.sales_return.rows.length ? (l(), o("table", L2, [
                t[471] || (t[471] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Credit Note"),
                    s("th", null, "Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Against Invoice"),
                    s("th", { class: "ta-r" }, "Amount"),
                    s("th", null, "Reason")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(R.value.sales_return.rows, (e) => (l(), o("tr", {
                    key: e.credit_note
                  }, [
                    s("td", null, a(e.credit_note), 1),
                    s("td", null, a(e.posting_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.return_against || "—"), 1),
                    s("td", Q2, a(d(e.grand_total)), 1),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", F2, "No sales returns in this period."))
            ], 64)) : ys.value === "discount" ? (l(), o(u, { key: 7 }, [
              s("div", H2, [
                s("div", z2, [
                  t[472] || (t[472] = s("span", { class: "bucket-label" }, "Line Discount", -1)),
                  s("span", W2, a(d(R.value.discount_analysis.total_line_discount)), 1)
                ]),
                s("div", U2, [
                  t[473] || (t[473] = s("span", { class: "bucket-label" }, "Header Discount", -1)),
                  s("span", K2, a(d(R.value.discount_analysis.total_header_discount)), 1)
                ]),
                s("div", G2, [
                  t[474] || (t[474] = s("span", { class: "bucket-label" }, "Avg Discount %", -1)),
                  s("span", Y2, a(R.value.discount_analysis.avg_discount_pct.toFixed(1)) + "%", 1)
                ])
              ]),
              t[477] || (t[477] = s("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Customer", -1)),
              R.value.discount_analysis.by_customer.length ? (l(), o("table", J2, [
                t[475] || (t[475] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Line Discount"),
                    s("th", { class: "ta-r" }, "Header Discount"),
                    s("th", { class: "ta-r" }, "Net Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(R.value.discount_analysis.by_customer, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", Z2, a(d(e.line_discount)), 1),
                    s("td", X2, a(d(e.header_discount)), 1),
                    s("td", sy, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ty, "No discounted invoices for any customer.")),
              t[478] || (t[478] = s("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Item", -1)),
              R.value.discount_analysis.by_item.length ? (l(), o("table", ey, [
                t[476] || (t[476] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Discount"),
                    s("th", { class: "ta-r" }, "Net Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(R.value.discount_analysis.by_item, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", ay, a(d(e.total_discount)), 1),
                    s("td", oy, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ly, "No discounted items."))
            ], 64)) : ys.value === "pending" ? (l(), o(u, { key: 8 }, [
              s("div", ny, [
                s("div", iy, [
                  t[479] || (t[479] = s("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  s("span", dy, a(R.value.sales_order_pending.order_count), 1)
                ]),
                s("div", ry, [
                  t[480] || (t[480] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", uy, a(d(R.value.sales_order_pending.pending_total)), 1)
                ])
              ]),
              R.value.sales_order_pending.rows.length ? (l(), o("table", cy, [
                t[481] || (t[481] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Order Value"),
                    s("th", { class: "ta-r" }, "Billed"),
                    s("th", { class: "ta-r" }, "Pending")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(R.value.sales_order_pending.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.transaction_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", my, a(e.status), 1)
                    ]),
                    s("td", vy, a(d(e.grand_total)), 1),
                    s("td", _y, a(d(e.billed_amount)), 1),
                    s("td", py, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yy, "No pending sales orders."))
            ], 64)) : ys.value === "conversion" ? (l(), o(u, { key: 9 }, [
              t[488] || (t[488] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Based on Sales Orders placed within the selected date range.", -1)),
              s("div", hy, [
                s("div", by, [
                  t[482] || (t[482] = s("span", { class: "bucket-label" }, "Orders Placed", -1)),
                  s("span", gy, a(R.value.sales_conversion.order_count), 1)
                ]),
                s("div", ky, [
                  t[483] || (t[483] = s("span", { class: "bucket-label" }, "Converted to Invoice", -1)),
                  s("span", wy, a(R.value.sales_conversion.converted_count), 1)
                ]),
                s("div", fy, [
                  t[484] || (t[484] = s("span", { class: "bucket-label" }, "Conversion Rate", -1)),
                  s("span", {
                    class: c(["mis-summary-val", R.value.sales_conversion.conversion_rate_pct >= 50 ? "green" : "red"])
                  }, a(R.value.sales_conversion.conversion_rate_pct.toFixed(1)) + "%", 3)
                ]),
                s("div", xy, [
                  t[485] || (t[485] = s("span", { class: "bucket-label" }, "Order Value", -1)),
                  s("span", Cy, a(d(R.value.sales_conversion.order_value)), 1)
                ]),
                s("div", Sy, [
                  t[486] || (t[486] = s("span", { class: "bucket-label" }, "Billed Value", -1)),
                  s("span", jy, a(d(R.value.sales_conversion.billed_value)), 1)
                ]),
                s("div", My, [
                  t[487] || (t[487] = s("span", { class: "bucket-label" }, "Value Conversion %", -1)),
                  s("span", Dy, a(R.value.sales_conversion.value_conversion_pct.toFixed(1)) + "%", 1)
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Ty, a(eo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "receivables" ? (l(), o("div", Oy, [
          s("div", Ry, [
            t[490] || (t[490] = x('<div class="bs-page-head-icon rmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="12" cy="12" r="10" data-v-42720c7a></circle><path d="M12 6v6l4 2" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Collection &amp; Receivables MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Total receivables, customer outstanding, ageing, collection targets and efficiency for the selected period.</div></div>', 2)),
            s("div", Py, [
              s("div", Iy, "As of " + a(P(y.value)), 1),
              s("div", Vy, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[152] || (t[152] = (e) => es("exportReceivablesCSV")),
                  disabled: !I.value
                }, [...t[489] || (t[489] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Ny),
                f.value === "exportReceivablesCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[153] || (t[153] = (e) => f.value = "")
                  }),
                  s("div", Ey, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[154] || (t[154] = (e) => {
                        f.value = "", Io();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[155] || (t[155] = (e) => {
                        f.value = "", Y(Io);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", qy, [
            (l(), o(u, null, m($l, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Os.value === e.key }]),
              onClick: (g) => Os.value = e.key
            }, a(e.label), 11, By)), 64))
          ]),
          Xe.value ? (l(), o("div", Ay)) : I.value ? (l(), o(u, { key: 1 }, [
            Os.value === "total" ? (l(), o(u, { key: 0 }, [
              s("div", $y, [
                s("span", null, "Total Receivables (as of " + a(I.value.as_of_date) + ")", 1),
                s("span", Ly, a(w(S)(I.value.total_outstanding)), 1)
              ]),
              s("div", Qy, [
                s("div", Fy, [
                  t[491] || (t[491] = s("span", { class: "bucket-label" }, "Customers Owing", -1)),
                  s("span", Hy, a(I.value.customer_outstanding.length), 1)
                ]),
                s("div", zy, [
                  t[492] || (t[492] = s("span", { class: "bucket-label" }, "Open Invoices", -1)),
                  s("span", Wy, a(I.value.customer_outstanding.reduce((e, g) => e + g.invoice_count, 0)), 1)
                ]),
                s("div", Uy, [
                  t[493] || (t[493] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", Ky, a(d(I.value.overdue.total)), 1)
                ]),
                s("div", Gy, [
                  t[494] || (t[494] = s("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  s("span", Yy, a(d(I.value.total_outstanding - I.value.overdue.total)), 1)
                ])
              ])
            ], 64)) : Os.value === "outstanding" ? (l(), o(u, { key: 1 }, [
              s("div", Jy, [
                s("span", null, "Total Outstanding (as of " + a(I.value.as_of_date) + ")", 1),
                s("span", Zy, a(w(S)(I.value.total_outstanding)), 1)
              ]),
              I.value.customer_outstanding.length ? (l(), o("table", Xy, [
                t[495] || (t[495] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Open Invoices"),
                    s("th", null, "Oldest Due Date"),
                    s("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(I.value.customer_outstanding, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", s0, a(e.invoice_count), 1),
                    s("td", null, a(e.oldest_due_date || "—"), 1),
                    s("td", t0, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", e0, "No outstanding receivables."))
            ], 64)) : Os.value === "ageing" ? (l(), o(u, { key: 2 }, [
              s("div", a0, [
                s("div", o0, [
                  t[496] || (t[496] = s("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  s("span", l0, a(d(I.value.ageing_totals.days_0_30)), 1)
                ]),
                s("div", n0, [
                  t[497] || (t[497] = s("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  s("span", i0, a(d(I.value.ageing_totals.days_31_60)), 1)
                ]),
                s("div", d0, [
                  t[498] || (t[498] = s("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  s("span", r0, a(d(I.value.ageing_totals.days_61_90)), 1)
                ]),
                s("div", u0, [
                  t[499] || (t[499] = s("span", { class: "bucket-label" }, "90+ Days", -1)),
                  s("span", c0, a(d(I.value.ageing_totals.days_90_plus)), 1)
                ]),
                s("div", m0, [
                  t[500] || (t[500] = s("span", { class: "bucket-label" }, "Total", -1)),
                  s("span", v0, a(d(I.value.ageing_totals.total)), 1)
                ])
              ]),
              I.value.ageing.length ? (l(), o("table", _0, [
                t[501] || (t[501] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "0-30"),
                    s("th", { class: "ta-r" }, "31-60"),
                    s("th", { class: "ta-r" }, "61-90"),
                    s("th", { class: "ta-r" }, "90+"),
                    s("th", { class: "ta-r" }, "Total")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(I.value.ageing, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", p0, a(d(e.days_0_30)), 1),
                    s("td", y0, a(d(e.days_31_60)), 1),
                    s("td", h0, a(d(e.days_61_90)), 1),
                    s("td", b0, a(d(e.days_90_plus)), 1),
                    s("td", g0, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", k0, "No outstanding receivables."))
            ], 64)) : Os.value === "coll_target" ? (l(), o(u, { key: 3 }, [
              s("div", w0, [
                t[502] || (t[502] = s("label", { class: "dr-label" }, "Collection Target (KES)", -1)),
                Es(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[156] || (t[156] = (e) => gt.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Ks,
                    gt.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[503] || (t[503] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actual collections for this period.", -1))
              ]),
              s("div", f0, [
                s("div", x0, [
                  t[504] || (t[504] = s("span", { class: "bucket-label" }, "Target", -1)),
                  s("span", C0, a(d(gt.value)), 1)
                ]),
                s("div", S0, [
                  t[505] || (t[505] = s("span", { class: "bucket-label" }, "Achieved", -1)),
                  s("span", j0, a(d(I.value.daily_collection.total)), 1)
                ]),
                s("div", M0, [
                  t[506] || (t[506] = s("span", { class: "bucket-label" }, "Achievement %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", lo.value >= 100 ? "green" : "red"])
                  }, a(lo.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", I.value.daily_collection.total >= gt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[507] || (t[507] = s("span", null, "Variance (Achieved − Target)", -1)),
                s("span", D0, a(w(S)(I.value.daily_collection.total - gt.value)), 1)
              ], 2)
            ], 64)) : Os.value === "daily_coll" ? (l(), o(u, { key: 4 }, [
              s("div", T0, [
                s("span", null, "Total Collection (" + a(C.value) + " to " + a(y.value) + ")", 1),
                s("span", O0, a(w(S)(I.value.daily_collection.total)), 1)
              ]),
              I.value.daily_collection.days.length ? (l(), o("table", R0, [
                t[508] || (t[508] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Date"),
                    s("th", { class: "ta-r" }, "Payments"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(I.value.daily_collection.days, (e) => (l(), o("tr", {
                    key: e.date
                  }, [
                    s("td", null, a(e.date), 1),
                    s("td", P0, a(e.count), 1),
                    s("td", I0, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : h("", !0)
            ], 64)) : Os.value === "overdue" ? (l(), o(u, { key: 5 }, [
              s("div", V0, [
                s("div", N0, [
                  t[509] || (t[509] = s("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  s("span", E0, a(I.value.overdue.count), 1)
                ]),
                s("div", q0, [
                  t[510] || (t[510] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", B0, a(d(I.value.overdue.total)), 1)
                ])
              ]),
              I.value.overdue.rows.length ? (l(), o("table", A0, [
                t[511] || (t[511] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Invoice"),
                    s("th", null, "Customer"),
                    s("th", null, "Due Date"),
                    s("th", { class: "ta-r" }, "Overdue Days"),
                    s("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(I.value.overdue.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    s("td", null, a(e.invoice), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.due_date), 1),
                    s("td", $0, a(e.overdue_days), 1),
                    s("td", L0, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Q0, "No overdue invoices."))
            ], 64)) : Os.value === "credit" ? (l(), o(u, { key: 6 }, [
              I.value.credit_utilisation.length ? (l(), o("table", F0, [
                t[512] || (t[512] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Credit Limit"),
                    s("th", { class: "ta-r" }, "Outstanding"),
                    s("th", { class: "ta-r" }, "Utilisation"),
                    s("th", null, "Status")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(I.value.credit_utilisation, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", H0, a(e.credit_limit ? d(e.credit_limit) : "No limit set"), 1),
                    s("td", z0, a(d(e.outstanding_amount)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.over_limit ? "red fw-700" : ""])
                    }, a(e.utilisation_pct != null ? e.utilisation_pct.toFixed(1) + "%" : "—"), 3),
                    s("td", null, [
                      s("span", {
                        class: c(["badge", e.over_limit ? "badge-danger" : "badge-blue"])
                      }, a(e.over_limit ? "Over Limit" : "OK"), 3)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", W0, "No customers with a credit limit or outstanding balance."))
            ], 64)) : Os.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              t[519] || (t[519] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Efficiency % = Collections in period ÷ (Opening Receivables + Sales in period). ", -1)),
              s("div", U0, [
                s("div", K0, [
                  t[513] || (t[513] = s("span", { class: "bucket-label" }, "Opening Receivables", -1)),
                  s("span", G0, a(d(I.value.collection_efficiency.opening_receivables)), 1)
                ]),
                s("div", Y0, [
                  t[514] || (t[514] = s("span", { class: "bucket-label" }, "Sales in Period", -1)),
                  s("span", J0, a(d(I.value.collection_efficiency.period_sales)), 1)
                ]),
                s("div", Z0, [
                  t[515] || (t[515] = s("span", { class: "bucket-label" }, "Receivable Pool", -1)),
                  s("span", X0, a(d(I.value.collection_efficiency.receivable_pool)), 1)
                ]),
                s("div", sh, [
                  t[516] || (t[516] = s("span", { class: "bucket-label" }, "Collected in Period", -1)),
                  s("span", th, a(d(I.value.collection_efficiency.period_collection)), 1)
                ]),
                s("div", eh, [
                  t[517] || (t[517] = s("span", { class: "bucket-label" }, "Closing Receivables", -1)),
                  s("span", ah, a(d(I.value.collection_efficiency.closing_receivables)), 1)
                ]),
                s("div", oh, [
                  t[518] || (t[518] = s("span", { class: "bucket-label" }, "Collection Efficiency", -1)),
                  s("span", {
                    class: c(["mis-summary-val", I.value.collection_efficiency.efficiency_pct >= 80 ? "green" : "red"])
                  }, a(I.value.collection_efficiency.efficiency_pct.toFixed(1)) + "%", 3)
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", lh, a(oo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "purchase_mis" ? (l(), o("div", nh, [
          s("div", ih, [
            t[521] || (t[521] = x('<div class="bs-page-head-icon pmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M3 3v18h18" data-v-42720c7a></path><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Purchase MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Purchase performance broken down by summary, supplier, product, target vs actual, price variance and pending orders/receipts.</div></div>', 2)),
            s("div", dh, [
              s("div", rh, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", uh, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[157] || (t[157] = (e) => es("exportPurchaseMisCSV")),
                  disabled: !q.value
                }, [...t[520] || (t[520] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, ch),
                f.value === "exportPurchaseMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[158] || (t[158] = (e) => f.value = "")
                  }),
                  s("div", mh, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[159] || (t[159] = (e) => {
                        f.value = "", Vo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[160] || (t[160] = (e) => {
                        f.value = "", Y(Vo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", vh, [
            (l(), o(u, null, m(Ll, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Rs.value === e.key }]),
              onClick: (g) => Rs.value = e.key
            }, a(e.label), 11, _h)), 64))
          ]),
          sa.value ? (l(), o("div", ph)) : q.value ? (l(), o(u, { key: 1 }, [
            Rs.value === "summary" ? (l(), o("div", yh, [
              s("div", hh, [
                t[522] || (t[522] = s("span", { class: "bucket-label" }, "Bills", -1)),
                s("span", bh, a(_(q.value.summary.invoice_count)), 1)
              ]),
              s("div", gh, [
                t[523] || (t[523] = s("span", { class: "bucket-label" }, "Net Purchases", -1)),
                s("span", kh, a(d(q.value.summary.net_purchases)), 1)
              ]),
              s("div", wh, [
                t[524] || (t[524] = s("span", { class: "bucket-label" }, "Total Tax", -1)),
                s("span", fh, a(d(q.value.summary.total_tax)), 1)
              ]),
              s("div", xh, [
                t[525] || (t[525] = s("span", { class: "bucket-label" }, "Discount Received", -1)),
                s("span", Ch, a(d(q.value.summary.header_discount)), 1)
              ]),
              s("div", Sh, [
                t[526] || (t[526] = s("span", { class: "bucket-label" }, "Grand Total", -1)),
                s("span", jh, a(d(q.value.summary.grand_total)), 1)
              ]),
              s("div", Mh, [
                t[527] || (t[527] = s("span", { class: "bucket-label" }, "Qty Purchased", -1)),
                s("span", Dh, a(_(q.value.summary.total_qty)), 1)
              ]),
              s("div", Th, [
                t[528] || (t[528] = s("span", { class: "bucket-label" }, "Avg Bill Value", -1)),
                s("span", Oh, a(d(q.value.summary.avg_invoice_value)), 1)
              ])
            ])) : Rs.value === "supplier" ? (l(), o("table", Rh, [
              t[529] || (t[529] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Supplier"),
                  s("th", { class: "ta-r" }, "Bills"),
                  s("th", { class: "ta-r" }, "Amount"),
                  s("th", { class: "ta-r" }, "Outstanding")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(q.value.supplier_wise, (e) => (l(), o("tr", {
                  key: e.supplier
                }, [
                  s("td", null, a(e.supplier_name || e.supplier), 1),
                  s("td", Ph, a(e.invoice_count), 1),
                  s("td", Ih, a(d(e.total_amount)), 1),
                  s("td", Vh, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : Rs.value === "product" ? (l(), o("table", Nh, [
              t[530] || (t[530] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Item"),
                  s("th", null, "UOM"),
                  s("th", { class: "ta-r" }, "Bills"),
                  s("th", { class: "ta-r" }, "Qty Purchased"),
                  s("th", { class: "ta-r" }, "Discount"),
                  s("th", { class: "ta-r" }, "Amount")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(q.value.product_wise, (e) => (l(), o("tr", {
                  key: e.item_code
                }, [
                  s("td", null, a(e.item_name || e.item_code), 1),
                  s("td", null, a(e.uom || "—"), 1),
                  s("td", Eh, a(e.invoice_count), 1),
                  s("td", qh, a(_(e.qty_purchased)), 1),
                  s("td", Bh, a(d(e.total_discount || 0)), 1),
                  s("td", Ah, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : Rs.value === "target" ? (l(), o(u, { key: 3 }, [
              s("div", $h, [
                t[531] || (t[531] = s("label", { class: "dr-label" }, "Purchase Target / Budget (KES)", -1)),
                Es(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[161] || (t[161] = (e) => kt.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Ks,
                    kt.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[532] || (t[532] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target/budget is stored — enter one to compare against actual purchases for this period.", -1))
              ]),
              s("div", Lh, [
                s("div", Qh, [
                  t[533] || (t[533] = s("span", { class: "bucket-label" }, "Target / Budget", -1)),
                  s("span", Fh, a(d(kt.value)), 1)
                ]),
                s("div", Hh, [
                  t[534] || (t[534] = s("span", { class: "bucket-label" }, "Actual", -1)),
                  s("span", zh, a(d(q.value.summary.grand_total)), 1)
                ]),
                s("div", Wh, [
                  t[535] || (t[535] = s("span", { class: "bucket-label" }, "Utilisation %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", io.value <= 100 ? "green" : "red"])
                  }, a(io.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", q.value.summary.grand_total <= kt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[536] || (t[536] = s("span", null, "Variance (Budget − Actual)", -1)),
                s("span", Uh, a(w(S)(kt.value - q.value.summary.grand_total)), 1)
              ], 2)
            ], 64)) : Rs.value === "price_variance" ? (l(), o(u, { key: 4 }, [
              s("div", Kh, [
                t[537] || (t[537] = os(" Actual weighted-average purchase rate this period vs. the Item's Standard Buying Rate. ", -1)),
                q.value.no_standard_rate_count ? (l(), o("span", Gh, a(q.value.no_standard_rate_count) + " item(s) below have no Standard Buying Rate set and are excluded from the % comparison.", 1)) : h("", !0)
              ]),
              q.value.price_variance.length ? (l(), o("table", Yh, [
                t[538] || (t[538] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Purchased"),
                    s("th", { class: "ta-r" }, "Actual Rate"),
                    s("th", { class: "ta-r" }, "Standard Rate"),
                    s("th", { class: "ta-r" }, "Variance"),
                    s("th", { class: "ta-r" }, "Variance %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(q.value.price_variance, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Jh, a(_(e.qty_purchased)), 1),
                    s("td", Zh, a(d(e.actual_rate)), 1),
                    s("td", Xh, a(e.has_standard_rate ? d(e.standard_rate) : "Not set"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.has_standard_rate ? e.variance > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? d(e.variance) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.has_standard_rate ? e.variance_pct > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? e.variance_pct.toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", sb, "No purchases in this period."))
            ], 64)) : Rs.value === "pending_po" ? (l(), o(u, { key: 5 }, [
              s("div", tb, [
                s("div", eb, [
                  t[539] || (t[539] = s("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  s("span", ab, a(q.value.pending_purchase_orders.order_count), 1)
                ]),
                s("div", ob, [
                  t[540] || (t[540] = s("span", { class: "bucket-label" }, "Pending (Not Yet Billed)", -1)),
                  s("span", lb, a(d(q.value.pending_purchase_orders.pending_total)), 1)
                ])
              ]),
              q.value.pending_purchase_orders.rows.length ? (l(), o("table", nb, [
                t[541] || (t[541] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Purchase Order"),
                    s("th", null, "Date"),
                    s("th", null, "Supplier"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Order Value"),
                    s("th", { class: "ta-r" }, "Billed"),
                    s("th", { class: "ta-r" }, "Pending")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(q.value.pending_purchase_orders.rows, (e) => (l(), o("tr", {
                    key: e.purchase_order
                  }, [
                    s("td", null, a(e.purchase_order), 1),
                    s("td", null, a(e.transaction_date), 1),
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", null, [
                      s("span", ib, a(e.status), 1)
                    ]),
                    s("td", db, a(d(e.grand_total)), 1),
                    s("td", rb, a(d(e.billed_amount || 0)), 1),
                    s("td", ub, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", cb, "No pending Purchase Orders as of this date."))
            ], 64)) : Rs.value === "pending_receipts" ? (l(), o(u, { key: 6 }, [
              s("div", mb, [
                s("div", vb, [
                  t[542] || (t[542] = s("span", { class: "bucket-label" }, "Orders Awaiting Receipt", -1)),
                  s("span", _b, a(q.value.pending_material_receipts.order_count), 1)
                ]),
                s("div", pb, [
                  t[543] || (t[543] = s("span", { class: "bucket-label" }, "Pending Receipt Value", -1)),
                  s("span", yb, a(d(q.value.pending_material_receipts.pending_value)), 1)
                ])
              ]),
              q.value.pending_material_receipts.rows.length ? (l(), o("table", hb, [
                t[544] || (t[544] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Purchase Order"),
                    s("th", null, "Date"),
                    s("th", null, "Supplier"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Ordered Qty"),
                    s("th", { class: "ta-r" }, "Received Qty"),
                    s("th", { class: "ta-r" }, "Pending Qty")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(q.value.pending_material_receipts.rows, (e) => (l(), o("tr", {
                    key: e.purchase_order
                  }, [
                    s("td", null, a(e.purchase_order), 1),
                    s("td", null, a(e.transaction_date), 1),
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", null, [
                      s("span", bb, a(e.status), 1)
                    ]),
                    s("td", gb, a(_(e.ordered_qty)), 1),
                    s("td", kb, a(_(e.received_qty || 0)), 1),
                    s("td", wb, a(_(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fb, "No pending material receipts as of this date."))
            ], 64)) : Rs.value === "returns" ? (l(), o(u, { key: 7 }, [
              s("div", xb, [
                s("div", Cb, [
                  t[545] || (t[545] = s("span", { class: "bucket-label" }, "Return Count", -1)),
                  s("span", Sb, a(q.value.purchase_return.return_count), 1)
                ]),
                s("div", jb, [
                  t[546] || (t[546] = s("span", { class: "bucket-label" }, "Return Value", -1)),
                  s("span", Mb, a(d(q.value.purchase_return.return_total)), 1)
                ]),
                s("div", Db, [
                  t[547] || (t[547] = s("span", { class: "bucket-label" }, "% of Purchases", -1)),
                  s("span", Tb, a(q.value.purchase_return.return_pct_of_purchases.toFixed(1)) + "%", 1)
                ])
              ]),
              q.value.purchase_return.rows.length ? (l(), o("table", Ob, [
                t[548] || (t[548] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Debit Note"),
                    s("th", null, "Date"),
                    s("th", null, "Supplier"),
                    s("th", null, "Against Bill"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(q.value.purchase_return.rows, (e) => (l(), o("tr", {
                    key: e.debit_note
                  }, [
                    s("td", null, a(e.debit_note), 1),
                    s("td", null, a(e.posting_date), 1),
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", null, a(e.return_against || "—"), 1),
                    s("td", Rb, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Pb, "No purchase returns in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Ib, a(no.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "inventory_mis" ? (l(), o("div", Vb, [
          s("div", Nb, [
            t[550] || (t[550] = x('<div class="bs-page-head-icon invmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-42720c7a></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-42720c7a></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Inventory MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Current stock, valuation, movement speed, ageing, reorder points and adjustments across all warehouses.</div></div>', 2)),
            s("div", Eb, [
              s("div", qb, "As of " + a(P(y.value)), 1),
              s("div", Bb, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[162] || (t[162] = (e) => es("exportInventoryMisCSV")),
                  disabled: !O.value
                }, [...t[549] || (t[549] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Ab),
                f.value === "exportInventoryMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[163] || (t[163] = (e) => f.value = "")
                  }),
                  s("div", $b, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[164] || (t[164] = (e) => {
                        f.value = "", No();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[165] || (t[165] = (e) => {
                        f.value = "", Y(No);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", Lb, [
            (l(), o(u, null, m(Ql, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: hs.value === e.key }]),
              onClick: (g) => hs.value = e.key
            }, a(e.label), 11, Qb)), 64))
          ]),
          ta.value ? (l(), o("div", Fb)) : O.value ? (l(), o(u, { key: 1 }, [
            hs.value === "current_stock" ? (l(), o(u, { key: 0 }, [
              s("div", Hb, [
                s("div", zb, [
                  t[551] || (t[551] = s("span", { class: "bucket-label" }, "Total Qty on Hand", -1)),
                  s("span", Wb, a(_(O.value.current_stock.total_qty)), 1)
                ]),
                s("div", Ub, [
                  t[552] || (t[552] = s("span", { class: "bucket-label" }, "Total Stock Value", -1)),
                  s("span", Kb, a(d(O.value.current_stock.total_value)), 1)
                ])
              ]),
              O.value.current_stock.rows.length ? (l(), o("table", Gb, [
                t[553] || (t[553] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", null, "Warehouse"),
                    s("th", null, "UOM"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Rate"),
                    s("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.current_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code + e.warehouse
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.warehouse), 1),
                    s("td", null, a(e.uom || "—"), 1),
                    s("td", Yb, a(_(e.actual_qty)), 1),
                    s("td", Jb, a(d(e.valuation_rate)), 1),
                    s("td", Zb, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Xb, "No stock on hand."))
            ], 64)) : hs.value === "stock_value" ? (l(), o(u, { key: 1 }, [
              s("div", sg, [
                t[554] || (t[554] = s("span", null, "Total Stock Value (all warehouses)", -1)),
                s("span", tg, a(w(S)(O.value.stock_value.grand_total)), 1)
              ]),
              O.value.stock_value.by_warehouse.length ? (l(), o("table", eg, [
                t[555] || (t[555] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Warehouse"),
                    s("th", { class: "ta-r" }, "Items"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Stock Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.stock_value.by_warehouse, (e) => (l(), o("tr", {
                    key: e.warehouse
                  }, [
                    s("td", null, a(e.warehouse), 1),
                    s("td", ag, a(e.item_count), 1),
                    s("td", og, a(_(e.total_qty)), 1),
                    s("td", lg, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ng, "No stock on hand."))
            ], 64)) : hs.value === "fast_moving" ? (l(), o(u, { key: 2 }, [
              s("div", ig, " Ranked by quantity consumed (stock-out) between " + a(C.value) + " and " + a(y.value) + ". ", 1),
              O.value.fast_moving.length ? (l(), o("table", dg, [
                t[556] || (t[556] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Consumed"),
                    s("th", { class: "ta-r" }, "Transactions"),
                    s("th", { class: "ta-r" }, "Current Qty")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.fast_moving, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", rg, a(_(e.qty_consumed)), 1),
                    s("td", ug, a(e.transactions), 1),
                    s("td", cg, a(_(e.current_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", mg, "No stock-out movement in this period."))
            ], 64)) : hs.value === "slow_moving" ? (l(), o(u, { key: 3 }, [
              s("div", vg, " In stock, last moved 30-180 days before " + a(y.value) + ". ", 1),
              O.value.slow_moving.length ? (l(), o("table", _g, [
                t[557] || (t[557] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty on Hand"),
                    s("th", { class: "ta-r" }, "Stock Value"),
                    s("th", null, "Last Movement"),
                    s("th", { class: "ta-r" }, "Days Since")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.slow_moving, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", pg, a(_(e.actual_qty)), 1),
                    s("td", yg, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_movement_date), 1),
                    s("td", hg, a(e.days_since_movement), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", bg, "No slow moving items."))
            ], 64)) : hs.value === "dead_stock" ? (l(), o(u, { key: 4 }, [
              s("div", gg, [
                s("div", kg, [
                  t[558] || (t[558] = s("span", { class: "bucket-label" }, "Dead Stock Items", -1)),
                  s("span", wg, a(O.value.dead_stock.rows.length), 1)
                ]),
                s("div", fg, [
                  t[559] || (t[559] = s("span", { class: "bucket-label" }, "Value Tied Up", -1)),
                  s("span", xg, a(d(O.value.dead_stock.total_value)), 1)
                ])
              ]),
              s("div", Cg, " In stock, no stock-out movement in over 180 days before " + a(y.value) + " (or ever). ", 1),
              O.value.dead_stock.rows.length ? (l(), o("table", Sg, [
                t[560] || (t[560] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty on Hand"),
                    s("th", { class: "ta-r" }, "Stock Value"),
                    s("th", null, "Last Movement"),
                    s("th", { class: "ta-r" }, "Days Since")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.dead_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", jg, a(_(e.actual_qty)), 1),
                    s("td", Mg, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_movement_date || "Never"), 1),
                    s("td", Dg, a(e.days_since_movement ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Tg, "No dead stock."))
            ], 64)) : hs.value === "ageing" ? (l(), o(u, { key: 5 }, [
              s("div", Og, " Proxy ageing: days since each item+warehouse's most recent stock-in, as of " + a(y.value) + ". ", 1),
              s("div", Rg, [
                s("div", Pg, [
                  t[561] || (t[561] = s("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  s("span", Ig, a(d(O.value.stock_ageing.totals.days_0_30)), 1)
                ]),
                s("div", Vg, [
                  t[562] || (t[562] = s("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  s("span", Ng, a(d(O.value.stock_ageing.totals.days_31_60)), 1)
                ]),
                s("div", Eg, [
                  t[563] || (t[563] = s("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  s("span", qg, a(d(O.value.stock_ageing.totals.days_61_90)), 1)
                ]),
                s("div", Bg, [
                  t[564] || (t[564] = s("span", { class: "bucket-label" }, "90+ Days", -1)),
                  s("span", Ag, a(d(O.value.stock_ageing.totals.days_90_plus)), 1)
                ]),
                s("div", $g, [
                  t[565] || (t[565] = s("span", { class: "bucket-label" }, "Total", -1)),
                  s("span", Lg, a(d(O.value.stock_ageing.totals.total)), 1)
                ])
              ]),
              O.value.stock_ageing.rows.length ? (l(), o("table", Qg, [
                t[566] || (t[566] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", null, "Warehouse"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Value"),
                    s("th", null, "Last Receipt"),
                    s("th", { class: "ta-r" }, "Age (Days)")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.stock_ageing.rows, (e) => (l(), o("tr", {
                    key: e.item_code + e.warehouse
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.warehouse), 1),
                    s("td", Fg, a(_(e.actual_qty)), 1),
                    s("td", Hg, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_receipt_date || "Never"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", (e.age_days || 0) > 90 ? "red fw-600" : ""])
                    }, a(e.age_days ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zg, "No stock on hand."))
            ], 64)) : hs.value === "reorder" ? (l(), o(u, { key: 6 }, [
              s("div", Wg, [
                s("div", Ug, [
                  t[567] || (t[567] = s("span", { class: "bucket-label" }, "Items Below Reorder Level", -1)),
                  s("span", Kg, a(O.value.reorder_low_stock.item_count), 1)
                ])
              ]),
              O.value.reorder_low_stock.rows.length ? (l(), o("table", Gg, [
                t[568] || (t[568] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", null, "Warehouse"),
                    s("th", { class: "ta-r" }, "Qty on Hand"),
                    s("th", { class: "ta-r" }, "Reorder Level"),
                    s("th", { class: "ta-r" }, "Reorder Qty"),
                    s("th", { class: "ta-r" }, "Shortage")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.reorder_low_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code + e.warehouse
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.warehouse), 1),
                    s("td", Yg, a(_(e.actual_qty)), 1),
                    s("td", Jg, a(_(e.reorder_level)), 1),
                    s("td", Zg, a(_(e.reorder_qty)), 1),
                    s("td", Xg, a(_(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", sk, "No items below reorder level."))
            ], 64)) : hs.value === "excess" ? (l(), o(u, { key: 7 }, [
              t[571] || (t[571] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Max Stock Level is stored — approximated from days-of-cover (qty ÷ trailing 90-day avg daily consumption); flagged when cover exceeds 180 days. ", -1)),
              s("div", tk, [
                s("div", ek, [
                  t[569] || (t[569] = s("span", { class: "bucket-label" }, "Excess Stock Value", -1)),
                  s("span", ak, a(d(O.value.excess_stock.total_value)), 1)
                ])
              ]),
              O.value.excess_stock.rows.length ? (l(), o("table", ok, [
                t[570] || (t[570] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty on Hand"),
                    s("th", { class: "ta-r" }, "Avg Daily Use"),
                    s("th", { class: "ta-r" }, "Days of Cover"),
                    s("th", { class: "ta-r" }, "Excess Qty"),
                    s("th", { class: "ta-r" }, "Excess Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.excess_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", lk, a(_(e.actual_qty)), 1),
                    s("td", nk, a(e.avg_daily_consumption), 1),
                    s("td", ik, a(e.days_of_cover), 1),
                    s("td", dk, a(_(e.excess_qty)), 1),
                    s("td", rk, a(d(e.excess_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", uk, "No excess stock identified."))
            ], 64)) : hs.value === "adjustment" ? (l(), o(u, { key: 8 }, [
              s("div", ck, [
                s("div", mk, [
                  t[572] || (t[572] = s("span", { class: "bucket-label" }, "Adjustments", -1)),
                  s("span", vk, a(O.value.stock_adjustment.entry_count), 1)
                ]),
                s("div", _k, [
                  t[573] || (t[573] = s("span", { class: "bucket-label" }, "Increase Value", -1)),
                  s("span", pk, a(d(O.value.stock_adjustment.increase_value)), 1)
                ]),
                s("div", yk, [
                  t[574] || (t[574] = s("span", { class: "bucket-label" }, "Decrease Value", -1)),
                  s("span", hk, a(d(O.value.stock_adjustment.decrease_value)), 1)
                ])
              ]),
              O.value.stock_adjustment.rows.length ? (l(), o("table", bk, [
                t[575] || (t[575] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Stock Entry"),
                    s("th", null, "Date"),
                    s("th", null, "Item"),
                    s("th", null, "Warehouse"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Value"),
                    s("th", null, "Reason")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.stock_adjustment.rows, (e) => (l(), o("tr", {
                    key: e.stock_entry + e.item_code
                  }, [
                    s("td", null, a(e.stock_entry), 1),
                    s("td", null, a(e.posting_date), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.warehouse), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.qty >= 0 ? "green" : "red"])
                    }, a(_(e.qty)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.value >= 0 ? "" : "red"])
                    }, a(d(e.value)), 3),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gk, "No stock adjustments in this period."))
            ], 64)) : hs.value === "loss" ? (l(), o(u, { key: 9 }, [
              s("div", kk, [
                s("div", wk, [
                  t[576] || (t[576] = s("span", { class: "bucket-label" }, "Loss Entries", -1)),
                  s("span", fk, a(O.value.stock_loss.loss_count), 1)
                ]),
                s("div", xk, [
                  t[577] || (t[577] = s("span", { class: "bucket-label" }, "Value Lost", -1)),
                  s("span", Ck, a(d(O.value.stock_loss.loss_value)), 1)
                ])
              ]),
              t[579] || (t[579] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scoped to negative-qty Stock Adjustment entries (physical-count shortfalls). Manufacturing Variance Loss is tracked separately on Work Orders. ", -1)),
              O.value.stock_loss.rows.length ? (l(), o("table", Sk, [
                t[578] || (t[578] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Stock Entry"),
                    s("th", null, "Date"),
                    s("th", null, "Item"),
                    s("th", null, "Warehouse"),
                    s("th", { class: "ta-r" }, "Qty Lost"),
                    s("th", { class: "ta-r" }, "Value Lost"),
                    s("th", null, "Reason")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(O.value.stock_loss.rows, (e) => (l(), o("tr", {
                    key: e.stock_entry + e.item_code
                  }, [
                    s("td", null, a(e.stock_entry), 1),
                    s("td", null, a(e.posting_date), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.warehouse), 1),
                    s("td", jk, a(_(e.qty)), 1),
                    s("td", Mk, a(d(e.value)), 1),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Dk, "No stock loss/shortage in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Tk, a(ro.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "production_mis" ? (l(), o("div", Ok, [
          s("div", Rk, [
            t[581] || (t[581] = x('<div class="bs-page-head-icon prodmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="2" y="7" width="20" height="14" rx="2" data-v-42720c7a></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Production MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Production plan vs actual, WIP status, material availability and consumption, cost, efficiency and rejection/scrap for work orders.</div></div>', 2)),
            s("div", Pk, [
              s("div", Ik, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Vk, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[166] || (t[166] = (e) => es("exportProductionMisCSV")),
                  disabled: !T.value
                }, [...t[580] || (t[580] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Nk),
                f.value === "exportProductionMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[167] || (t[167] = (e) => f.value = "")
                  }),
                  s("div", Ek, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[168] || (t[168] = (e) => {
                        f.value = "", Eo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[169] || (t[169] = (e) => {
                        f.value = "", Y(Eo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", qk, [
            (l(), o(u, null, m(Fl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: bs.value === e.key }]),
              onClick: (g) => bs.value = e.key
            }, a(e.label), 11, Bk)), 64))
          ]),
          ea.value ? (l(), o("div", Ak)) : T.value ? (l(), o(u, { key: 1 }, [
            bs.value === "plan_vs_actual" ? (l(), o(u, { key: 0 }, [
              s("div", $k, [
                s("div", Lk, [
                  t[582] || (t[582] = s("span", { class: "bucket-label" }, "Planned Qty", -1)),
                  s("span", Qk, a(_(T.value.plan_vs_actual.totals.planned_qty)), 1)
                ]),
                s("div", Fk, [
                  t[583] || (t[583] = s("span", { class: "bucket-label" }, "Produced Qty", -1)),
                  s("span", Hk, a(_(T.value.plan_vs_actual.totals.produced_qty)), 1)
                ])
              ]),
              T.value.plan_vs_actual.rows.length ? (l(), o("table", zk, [
                t[584] || (t[584] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Production Plan"),
                    s("th", null, "Date"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Planned Qty"),
                    s("th", { class: "ta-r" }, "Produced Qty"),
                    s("th", { class: "ta-r" }, "Variance"),
                    s("th", { class: "ta-r" }, "Variance %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.plan_vs_actual.rows, (e) => (l(), o("tr", {
                    key: e.production_plan + e.item_code
                  }, [
                    s("td", null, a(e.production_plan), 1),
                    s("td", null, a(e.posting_date), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Wk, a(_(e.planned_qty)), 1),
                    s("td", Uk, a(_(e.produced_qty)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty >= 0 ? "green" : "red"])
                    }, a(_(e.variance_qty)), 3),
                    s("td", Kk, a(e.variance_pct != null ? e.variance_pct + "%" : "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Gk, "No production plans posted in this period."))
            ], 64)) : bs.value === "pending" ? (l(), o(u, { key: 1 }, [
              s("div", Yk, " Live snapshot of open Work Orders (not reconstructed as of " + a(y.value) + "). ", 1),
              s("div", Jk, [
                s("div", Zk, [
                  t[585] || (t[585] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", Xk, a(_(T.value.production_pending.pending_qty_total)), 1)
                ]),
                s("div", s4, [
                  t[586] || (t[586] = s("span", { class: "bucket-label" }, "Overdue Work Orders", -1)),
                  s("span", t4, a(T.value.production_pending.overdue_count), 1)
                ])
              ]),
              T.value.production_pending.rows.length ? (l(), o("table", e4, [
                t[587] || (t[587] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Produced"),
                    s("th", { class: "ta-r" }, "Pending"),
                    s("th", null, "Planned End")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.production_pending.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.status), 1),
                    s("td", a4, a(_(e.qty)), 1),
                    s("td", o4, a(_(e.produced_qty)), 1),
                    s("td", l4, a(_(e.pending_qty)), 1),
                    s("td", {
                      class: c(e.overdue ? "red fw-600" : "")
                    }, a(e.planned_end_date || "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", n4, "No pending production."))
            ], 64)) : bs.value === "wip" ? (l(), o(u, { key: 2 }, [
              s("div", i4, [
                s("div", d4, [
                  t[588] || (t[588] = s("span", { class: "bucket-label" }, "Work Orders In Process", -1)),
                  s("span", r4, a(T.value.wip_status.wo_count), 1)
                ]),
                s("div", u4, [
                  t[589] || (t[589] = s("span", { class: "bucket-label" }, "WIP Stock Value", -1)),
                  s("span", c4, a(d(T.value.wip_status.wip_value_total)), 1)
                ])
              ]),
              T.value.wip_status.rows.length ? (l(), o("table", m4, [
                t[590] || (t[590] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Produced"),
                    s("th", { class: "ta-r" }, "% Complete"),
                    s("th", null, "WIP Warehouse"),
                    s("th", { class: "ta-r" }, "WIP Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.wip_status.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", v4, a(_(e.qty)), 1),
                    s("td", _4, a(_(e.produced_qty)), 1),
                    s("td", p4, a(e.pct_complete) + "%", 1),
                    s("td", null, a(e.wip_warehouse || "—"), 1),
                    s("td", y4, a(d(e.wip_stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", h4, "No Work Orders in process."))
            ], 64)) : bs.value === "material_availability" ? (l(), o(u, { key: 3 }, [
              t[593] || (t[593] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Live shortage check: still-to-issue qty on open Work Orders vs current stock at the source warehouse. ", -1)),
              s("div", b4, [
                s("div", g4, [
                  t[591] || (t[591] = s("span", { class: "bucket-label" }, "Items Short", -1)),
                  s("span", k4, a(T.value.raw_material_availability.shortage_count), 1)
                ])
              ]),
              T.value.raw_material_availability.rows.length ? (l(), o("table", w4, [
                t[592] || (t[592] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", null, "Warehouse"),
                    s("th", { class: "ta-r" }, "Still to Issue"),
                    s("th", { class: "ta-r" }, "Available"),
                    s("th", { class: "ta-r" }, "Shortage")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.raw_material_availability.rows, (e) => (l(), o("tr", {
                    key: e.work_order + e.item_code
                  }, [
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.warehouse), 1),
                    s("td", f4, a(_(e.still_to_issue)), 1),
                    s("td", x4, a(_(e.available_qty)), 1),
                    s("td", C4, a(_(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", S4, "No material shortages against open Work Orders."))
            ], 64)) : bs.value === "material_consumption" ? (l(), o(u, { key: 4 }, [
              s("div", j4, [
                t[594] || (t[594] = s("span", null, "Total Material Consumed", -1)),
                s("span", M4, a(w(S)(T.value.material_consumption.total_value)), 1)
              ]),
              T.value.material_consumption.rows.length ? (l(), o("table", D4, [
                t[595] || (t[595] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Consumed"),
                    s("th", { class: "ta-r" }, "Transactions"),
                    s("th", { class: "ta-r" }, "Value Consumed")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.material_consumption.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", T4, a(_(e.qty_consumed)), 1),
                    s("td", O4, a(e.transactions), 1),
                    s("td", R4, a(d(e.value_consumed)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", P4, "No material consumed against Work Orders in this period."))
            ], 64)) : bs.value === "material_variance" ? (l(), o(u, { key: 5 }, [
              s("div", I4, [
                s("div", V4, [
                  t[596] || (t[596] = s("span", { class: "bucket-label" }, "Net Variance Value", -1)),
                  s("span", {
                    class: c(["mis-summary-val", T.value.material_variance.net_variance_value >= 0 ? "red" : "green"])
                  }, a(d(T.value.material_variance.net_variance_value)), 3)
                ])
              ]),
              T.value.material_variance.rows.length ? (l(), o("table", N4, [
                t[597] || (t[597] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Required Qty"),
                    s("th", { class: "ta-r" }, "Consumed Qty"),
                    s("th", { class: "ta-r" }, "Variance Qty"),
                    s("th", { class: "ta-r" }, "Variance Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.material_variance.rows, (e) => (l(), o("tr", {
                    key: e.work_order + e.item_code
                  }, [
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", E4, a(_(e.required_qty)), 1),
                    s("td", q4, a(_(e.consumed_qty)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty > 0 ? "red" : "green"])
                    }, a(_(e.variance_qty)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.variance_value > 0 ? "red" : "green"])
                    }, a(d(e.variance_value)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", B4, "No material variance in this period."))
            ], 64)) : bs.value === "production_cost" ? (l(), o(u, { key: 6 }, [
              s("div", A4, [
                s("div", $4, [
                  t[598] || (t[598] = s("span", { class: "bucket-label" }, "Material Value", -1)),
                  s("span", L4, a(d(T.value.production_cost.total_material_value)), 1)
                ]),
                s("div", Q4, [
                  t[599] || (t[599] = s("span", { class: "bucket-label" }, "Operating Cost", -1)),
                  s("span", F4, a(d(T.value.production_cost.total_operating_cost)), 1)
                ]),
                s("div", H4, [
                  t[600] || (t[600] = s("span", { class: "bucket-label" }, "Total Production Cost", -1)),
                  s("span", z4, a(d(T.value.production_cost.total_cost)), 1)
                ])
              ]),
              T.value.production_cost.rows.length ? (l(), o("table", W4, [
                t[601] || (t[601] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Produced"),
                    s("th", { class: "ta-r" }, "Material"),
                    s("th", { class: "ta-r" }, "Op. Cost"),
                    s("th", { class: "ta-r" }, "Total"),
                    s("th", { class: "ta-r" }, "Cost/Unit"),
                    s("th", { class: "ta-r" }, "Standard/Unit")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.production_cost.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", U4, a(_(e.produced_qty)), 1),
                    s("td", K4, a(d(e.material_value)), 1),
                    s("td", G4, a(d(e.operating_cost)), 1),
                    s("td", Y4, a(d(e.actual_total_cost)), 1),
                    s("td", J4, a(e.actual_cost_per_unit != null ? d(e.actual_cost_per_unit) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.cost_variance_per_unit > 0 ? "red" : e.cost_variance_per_unit < 0 ? "green" : ""])
                    }, a(e.standard_cost_per_unit != null ? d(e.standard_cost_per_unit) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Z4, "No production cost recorded in this period."))
            ], 64)) : bs.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              s("div", X4, [
                s("div", s7, [
                  t[602] || (t[602] = s("span", { class: "bucket-label" }, "Avg Efficiency", -1)),
                  s("span", t7, a(T.value.production_efficiency.avg_efficiency_pct != null ? T.value.production_efficiency.avg_efficiency_pct + "%" : "—"), 1)
                ])
              ]),
              T.value.production_efficiency.rows.length ? (l(), o("table", e7, [
                t[603] || (t[603] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Planned (min)"),
                    s("th", { class: "ta-r" }, "Actual (min)"),
                    s("th", { class: "ta-r" }, "Efficiency %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.production_efficiency.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.status), 1),
                    s("td", a7, a(_(e.planned_mins)), 1),
                    s("td", o7, a(_(e.actual_mins)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.efficiency_pct >= 100 ? "green" : "red"])
                    }, a(e.efficiency_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", l7, "No operation time logged for Work Orders scheduled in this period."))
            ], 64)) : bs.value === "rejection" ? (l(), o(u, { key: 8 }, [
              t[607] || (t[607] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Job Card scrap items not flagged as process loss — defective pieces that may be reworked. ", -1)),
              s("div", n7, [
                s("div", i7, [
                  t[604] || (t[604] = s("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  s("span", d7, a(_(T.value.rejection_rework.qty_total)), 1)
                ]),
                s("div", r7, [
                  t[605] || (t[605] = s("span", { class: "bucket-label" }, "Value", -1)),
                  s("span", u7, a(d(T.value.rejection_rework.value_total)), 1)
                ])
              ]),
              T.value.rejection_rework.rows.length ? (l(), o("table", c7, [
                t[606] || (t[606] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Job Card"),
                    s("th", null, "Work Order"),
                    s("th", null, "Operation"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.rejection_rework.rows, (e) => (l(), o("tr", {
                    key: e.job_card + e.item_code
                  }, [
                    s("td", null, a(e.job_card), 1),
                    s("td", null, a(e.work_order), 1),
                    s("td", null, a(e.operation), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", m7, a(_(e.qty)), 1),
                    s("td", v7, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _7, "No rejection/rework recorded in this period."))
            ], 64)) : bs.value === "scrap" ? (l(), o(u, { key: 9 }, [
              t[611] || (t[611] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scrap output rows on Manufacture stock entries, plus process/yield loss recorded on those entries. ", -1)),
              s("div", p7, [
                s("div", y7, [
                  t[608] || (t[608] = s("span", { class: "bucket-label" }, "Scrap Value", -1)),
                  s("span", h7, a(d(T.value.scrap_wastage.scrap_value_total)), 1)
                ]),
                s("div", b7, [
                  t[609] || (t[609] = s("span", { class: "bucket-label" }, "Process Loss Qty", -1)),
                  s("span", g7, a(_(T.value.scrap_wastage.process_loss_qty_total)), 1)
                ])
              ]),
              T.value.scrap_wastage.rows.length ? (l(), o("table", k7, [
                t[610] || (t[610] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Stock Entry"),
                    s("th", null, "Work Order"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(T.value.scrap_wastage.rows, (e) => (l(), o("tr", {
                    key: e.stock_entry + e.item_code
                  }, [
                    s("td", null, a(e.stock_entry), 1),
                    s("td", null, a(e.work_order || "—"), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", w7, a(_(e.qty)), 1),
                    s("td", f7, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", x7, "No scrap output recorded in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", C7, a(uo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "product_mis" ? (l(), o("div", S7, [
          s("div", j7, [
            t[613] || (t[613] = x('<div class="bs-page-head-icon prdmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-42720c7a></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Product MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Product-wise sales, profit, cost, margin, production, stock and wastage, plus top and low selling products for the period.</div></div>', 2)),
            s("div", M7, [
              s("div", D7, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", T7, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[170] || (t[170] = (e) => es("exportProductMisCSV")),
                  disabled: !A.value
                }, [...t[612] || (t[612] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, O7),
                f.value === "exportProductMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[171] || (t[171] = (e) => f.value = "")
                  }),
                  s("div", R7, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[172] || (t[172] = (e) => {
                        f.value = "", qo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[173] || (t[173] = (e) => {
                        f.value = "", Y(qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", P7, [
            (l(), o(u, null, m(Hl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Cs.value === e.key }]),
              onClick: (g) => Cs.value = e.key
            }, a(e.label), 11, I7)), 64))
          ]),
          aa.value ? (l(), o("div", V7)) : A.value ? (l(), o(u, { key: 1 }, [
            Cs.value === "sales" ? (l(), o(u, { key: 0 }, [
              s("div", N7, [
                s("div", E7, [
                  t[614] || (t[614] = s("span", { class: "bucket-label" }, "Qty Sold", -1)),
                  s("span", q7, a(_(A.value.product_wise_sales.totals.qty_sold)), 1)
                ]),
                s("div", B7, [
                  t[615] || (t[615] = s("span", { class: "bucket-label" }, "Total Revenue", -1)),
                  s("span", A7, a(d(A.value.product_wise_sales.totals.total_amount)), 1)
                ])
              ]),
              A.value.product_wise_sales.rows.length ? (l(), o("table", $7, [
                t[616] || (t[616] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", null, "UOM"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Qty Sold"),
                    s("th", { class: "ta-r" }, "Avg Rate"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_sales.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.uom || "—"), 1),
                    s("td", L7, a(e.invoice_count), 1),
                    s("td", Q7, a(_(e.qty_sold)), 1),
                    s("td", F7, a(d(e.avg_rate)), 1),
                    s("td", H7, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", z7, "No sales in this period."))
            ], 64)) : Cs.value === "profit" ? (l(), o(u, { key: 1 }, [
              s("div", W7, [
                s("div", U7, [
                  t[617] || (t[617] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", K7, a(d(A.value.product_wise_profit.totals.revenue)), 1)
                ]),
                s("div", G7, [
                  t[618] || (t[618] = s("span", { class: "bucket-label" }, "Cost", -1)),
                  s("span", Y7, a(d(A.value.product_wise_profit.totals.total_cost)), 1)
                ]),
                s("div", J7, [
                  t[619] || (t[619] = s("span", { class: "bucket-label" }, "Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", A.value.product_wise_profit.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(A.value.product_wise_profit.totals.profit)), 3)
                ])
              ]),
              A.value.product_wise_profit.rows.length ? (l(), o("table", Z7, [
                t[620] || (t[620] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", X7, a(d(e.revenue)), 1),
                    s("td", sw, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", tw, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ew, "No sales in this period."))
            ], 64)) : Cs.value === "cost" ? (l(), o(u, { key: 2 }, [
              t[622] || (t[622] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              A.value.product_wise_cost.rows.length ? (l(), o("table", aw, [
                t[621] || (t[621] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Sold"),
                    s("th", { class: "ta-r" }, "Cost Rate"),
                    s("th", { class: "ta-r" }, "Total Cost")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_cost.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", ow, a(_(e.qty_sold)), 1),
                    s("td", lw, a(d(e.cost_rate)), 1),
                    s("td", nw, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", iw, "No sales in this period."))
            ], 64)) : Cs.value === "margin" ? (l(), o(u, { key: 3 }, [
              A.value.product_wise_margin.rows.length ? (l(), o("table", dw, [
                t[623] || (t[623] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_margin.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", rw, a(d(e.revenue)), 1),
                    s("td", uw, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.margin_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", cw, "No sales in this period."))
            ], 64)) : Cs.value === "production" ? (l(), o(u, { key: 4 }, [
              s("div", mw, " Finished-goods receipts on Manufacture stock entries posted between " + a(C.value) + " and " + a(y.value) + ". ", 1),
              A.value.product_wise_production.rows.length ? (l(), o("table", vw, [
                t[624] || (t[624] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Produced"),
                    s("th", { class: "ta-r" }, "Value Produced"),
                    s("th", { class: "ta-r" }, "Transactions")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_production.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", _w, a(_(e.qty_produced)), 1),
                    s("td", pw, a(d(e.value_produced)), 1),
                    s("td", yw, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", hw, "No production recorded in this period."))
            ], 64)) : Cs.value === "stock" ? (l(), o(u, { key: 5 }, [
              A.value.product_wise_stock.rows.length ? (l(), o("table", bw, [
                t[625] || (t[625] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", null, "UOM"),
                    s("th", { class: "ta-r" }, "Qty on Hand"),
                    s("th", { class: "ta-r" }, "Rate"),
                    s("th", { class: "ta-r" }, "Stock Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.uom || "—"), 1),
                    s("td", gw, a(_(e.total_qty)), 1),
                    s("td", kw, a(d(e.valuation_rate)), 1),
                    s("td", ww, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fw, "No stock on hand."))
            ], 64)) : Cs.value === "wastage" ? (l(), o(u, { key: 6 }, [
              s("div", xw, " Scrap-flagged rows on Manufacture stock entries posted between " + a(C.value) + " and " + a(y.value) + ". ", 1),
              s("div", Cw, [
                s("div", Sw, [
                  t[626] || (t[626] = s("span", { class: "bucket-label" }, "Qty Scrapped", -1)),
                  s("span", jw, a(_(A.value.product_wise_wastage.totals.qty_scrapped)), 1)
                ]),
                s("div", Mw, [
                  t[627] || (t[627] = s("span", { class: "bucket-label" }, "Value Scrapped", -1)),
                  s("span", Dw, a(d(A.value.product_wise_wastage.totals.value_scrapped)), 1)
                ])
              ]),
              A.value.product_wise_wastage.rows.length ? (l(), o("table", Tw, [
                t[628] || (t[628] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Scrapped"),
                    s("th", { class: "ta-r" }, "Value Scrapped"),
                    s("th", { class: "ta-r" }, "Transactions")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_wastage.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Ow, a(_(e.qty_scrapped)), 1),
                    s("td", Rw, a(d(e.value_scrapped)), 1),
                    s("td", Pw, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Iw, "No wastage recorded in this period."))
            ], 64)) : Cs.value === "top_selling" ? (l(), o(u, { key: 7 }, [
              t[630] || (t[630] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Top 10 items by quantity sold in this period.", -1)),
              A.value.top_selling.rows.length ? (l(), o("table", Vw, [
                t[629] || (t[629] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "#"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Sold"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.top_selling.rows, (e, g) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(g + 1), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Nw, a(_(e.qty_sold)), 1),
                    s("td", Ew, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", qw, "No sales in this period."))
            ], 64)) : Cs.value === "low_selling" ? (l(), o(u, { key: 8 }, [
              t[632] || (t[632] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Bottom 10 items by quantity sold in this period (items with at least one sale).", -1)),
              A.value.low_selling.rows.length ? (l(), o("table", Bw, [
                t[631] || (t[631] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "#"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Qty Sold"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(A.value.low_selling.rows, (e, g) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(g + 1), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Aw, a(_(e.qty_sold)), 1),
                    s("td", $w, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Lw, "No sales in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Qw, a(co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "dispatch_mis" ? (l(), o("div", Fw, [
          s("div", Hw, [
            t[634] || (t[634] = x('<div class="bs-page-head-icon dmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="1" y="3" width="15" height="13" data-v-42720c7a></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-42720c7a></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-42720c7a></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-42720c7a></circle></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Dispatch &amp; Delivery MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Dispatch summary, pending and delayed deliveries, customer-wise pending delivery and transport-wise dispatch for the period.</div></div>', 2)),
            s("div", zw, [
              s("div", Ww, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", Uw, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[174] || (t[174] = (e) => es("exportDispatchMisCSV")),
                  disabled: !z.value
                }, [...t[633] || (t[633] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Kw),
                f.value === "exportDispatchMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[175] || (t[175] = (e) => f.value = "")
                  }),
                  s("div", Gw, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[176] || (t[176] = (e) => {
                        f.value = "", Bo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[177] || (t[177] = (e) => {
                        f.value = "", Y(Bo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", Yw, [
            (l(), o(u, null, m(zl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Us.value === e.key }]),
              onClick: (g) => Us.value = e.key
            }, a(e.label), 11, Jw)), 64))
          ]),
          oa.value ? (l(), o("div", Zw)) : z.value ? (l(), o(u, { key: 1 }, [
            Us.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", Xw, " Delivery Notes posted between " + a(C.value) + " and " + a(y.value) + ". ", 1),
              s("div", sf, [
                s("div", tf, [
                  t[635] || (t[635] = s("span", { class: "bucket-label" }, "Dispatches", -1)),
                  s("span", ef, a(_(z.value.dispatch_summary.dispatch_count)), 1)
                ]),
                s("div", af, [
                  t[636] || (t[636] = s("span", { class: "bucket-label" }, "Total Qty Dispatched", -1)),
                  s("span", of, a(_(z.value.dispatch_summary.total_qty)), 1)
                ]),
                s("div", lf, [
                  t[637] || (t[637] = s("span", { class: "bucket-label" }, "Total Value", -1)),
                  s("span", nf, a(d(z.value.dispatch_summary.total_value)), 1)
                ]),
                s("div", df, [
                  t[638] || (t[638] = s("span", { class: "bucket-label" }, "Customers Served", -1)),
                  s("span", rf, a(_(z.value.dispatch_summary.customer_count)), 1)
                ]),
                s("div", uf, [
                  t[639] || (t[639] = s("span", { class: "bucket-label" }, "Transporters Used", -1)),
                  s("span", cf, a(_(z.value.dispatch_summary.transporter_count)), 1)
                ]),
                s("div", mf, [
                  t[640] || (t[640] = s("span", { class: "bucket-label" }, "Avg Qty / Dispatch", -1)),
                  s("span", vf, a(_(z.value.dispatch_summary.avg_qty_per_dispatch)), 1)
                ])
              ])
            ], 64)) : Us.value === "pending_dispatch" ? (l(), o(u, { key: 1 }, [
              s("div", _f, " Sales Order lines with nothing dispatched yet, as of " + a(y.value) + ". ", 1),
              s("div", pf, [
                s("div", yf, [
                  t[641] || (t[641] = s("span", { class: "bucket-label" }, "Orders", -1)),
                  s("span", hf, a(z.value.pending_dispatch.order_count), 1)
                ]),
                s("div", bf, [
                  t[642] || (t[642] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", gf, a(_(z.value.pending_dispatch.pending_qty)), 1)
                ]),
                s("div", kf, [
                  t[643] || (t[643] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", wf, a(d(z.value.pending_dispatch.pending_value)), 1)
                ])
              ]),
              z.value.pending_dispatch.rows.length ? (l(), o("table", ff, [
                t[644] || (t[644] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Ordered Qty"),
                    s("th", { class: "ta-r" }, "Pending Qty"),
                    s("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(z.value.pending_dispatch.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", xf, a(_(e.ordered_qty)), 1),
                    s("td", Cf, a(_(e.pending_qty)), 1),
                    s("td", Sf, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jf, "No pending dispatch as of this date."))
            ], 64)) : Us.value === "delivery_pending" ? (l(), o(u, { key: 2 }, [
              s("div", Mf, " All undelivered Sales Order quantity as of " + a(y.value) + ", including partially dispatched lines. ", 1),
              s("div", Df, [
                s("div", Tf, [
                  t[645] || (t[645] = s("span", { class: "bucket-label" }, "Orders", -1)),
                  s("span", Of, a(z.value.delivery_pending.order_count), 1)
                ]),
                s("div", Rf, [
                  t[646] || (t[646] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", Pf, a(_(z.value.delivery_pending.pending_qty)), 1)
                ]),
                s("div", If, [
                  t[647] || (t[647] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", Vf, a(d(z.value.delivery_pending.pending_value)), 1)
                ])
              ]),
              z.value.delivery_pending.rows.length ? (l(), o("table", Nf, [
                t[648] || (t[648] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Delivery Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Ordered Qty"),
                    s("th", { class: "ta-r" }, "Dispatched Qty"),
                    s("th", { class: "ta-r" }, "Pending Qty")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(z.value.delivery_pending.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.delivery_date || "—"), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Ef, a(_(e.ordered_qty)), 1),
                    s("td", qf, a(_(e.delivered_qty)), 1),
                    s("td", Bf, a(_(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Af, "No pending deliveries as of this date."))
            ], 64)) : Us.value === "delayed_delivery" ? (l(), o(u, { key: 3 }, [
              t[653] || (t[653] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Delivery Pending lines whose Delivery Date has already passed. ", -1)),
              s("div", $f, [
                s("div", Lf, [
                  t[649] || (t[649] = s("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  s("span", Qf, a(z.value.delayed_delivery.order_count), 1)
                ]),
                s("div", Ff, [
                  t[650] || (t[650] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", Hf, a(_(z.value.delayed_delivery.pending_qty)), 1)
                ]),
                s("div", zf, [
                  t[651] || (t[651] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", Wf, a(d(z.value.delayed_delivery.pending_value)), 1)
                ])
              ]),
              z.value.delayed_delivery.rows.length ? (l(), o("table", Uf, [
                t[652] || (t[652] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Delivery Date"),
                    s("th", null, "Days Overdue"),
                    s("th", null, "Customer"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Pending Qty"),
                    s("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(z.value.delayed_delivery.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.delivery_date), 1),
                    s("td", Kf, a(e.days_overdue), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Gf, a(_(e.pending_qty)), 1),
                    s("td", Yf, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Jf, "No delayed deliveries as of today."))
            ], 64)) : Us.value === "customer_pending" ? (l(), o(u, { key: 4 }, [
              z.value.customer_wise_pending_delivery.rows.length ? (l(), o("table", Zf, [
                t[654] || (t[654] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Orders"),
                    s("th", { class: "ta-r" }, "Pending Qty"),
                    s("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(z.value.customer_wise_pending_delivery.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", Xf, a(e.order_count), 1),
                    s("td", s6, a(_(e.pending_qty)), 1),
                    s("td", t6, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", e6, "No pending deliveries as of this date."))
            ], 64)) : Us.value === "transport_wise" ? (l(), o(u, { key: 5 }, [
              s("div", a6, " Delivery Notes posted between " + a(C.value) + " and " + a(y.value) + ", grouped by Transporter. ", 1),
              z.value.transport_wise_dispatch.rows.length ? (l(), o("table", o6, [
                t[655] || (t[655] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Transporter"),
                    s("th", { class: "ta-r" }, "Dispatches"),
                    s("th", { class: "ta-r" }, "Customers"),
                    s("th", { class: "ta-r" }, "Total Qty"),
                    s("th", { class: "ta-r" }, "Total Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(z.value.transport_wise_dispatch.rows, (e) => (l(), o("tr", {
                    key: e.transporter_name
                  }, [
                    s("td", null, a(e.transporter_name), 1),
                    s("td", l6, a(e.dispatch_count), 1),
                    s("td", n6, a(e.customer_count), 1),
                    s("td", i6, a(_(e.total_qty)), 1),
                    s("td", d6, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", r6, "No dispatches in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", u6, a(mo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "order_mis" ? (l(), o("div", c6, [
          s("div", m6, [
            t[657] || (t[657] = x('<div class="bs-page-head-icon omis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M9 11l3 3L22 4" data-v-42720c7a></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Order MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Sales order pipeline — new, pending, under production, ready for dispatch, delayed, delivered, cancelled and order-wise profitability.</div></div>', 2)),
            s("div", v6, [
              s("div", _6, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", p6, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[178] || (t[178] = (e) => es("exportOrderMisCSV")),
                  disabled: !B.value
                }, [...t[656] || (t[656] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, y6),
                f.value === "exportOrderMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[179] || (t[179] = (e) => f.value = "")
                  }),
                  s("div", h6, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[180] || (t[180] = (e) => {
                        f.value = "", Ao();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[181] || (t[181] = (e) => {
                        f.value = "", Y(Ao);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", b6, [
            (l(), o(u, null, m(Wl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: vs.value === e.key }]),
              onClick: (g) => vs.value = e.key
            }, a(e.label), 11, g6)), 64))
          ]),
          la.value ? (l(), o("div", k6)) : B.value ? (l(), o(u, { key: 1 }, [
            vs.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", w6, " Sales Orders placed between " + a(C.value) + " and " + a(y.value) + ". Under Production / Ready for Dispatch are derived from linked Work Orders; Delayed is based on today's date. ", 1),
              s("div", f6, [
                s("div", x6, [
                  t[658] || (t[658] = s("span", { class: "bucket-label" }, "Total Orders", -1)),
                  s("span", C6, a(_(B.value.summary.total_orders.count)), 1)
                ]),
                s("div", S6, [
                  t[659] || (t[659] = s("span", { class: "bucket-label" }, "New Orders", -1)),
                  s("span", j6, a(_(B.value.summary.new_orders.count)), 1)
                ]),
                s("div", M6, [
                  t[660] || (t[660] = s("span", { class: "bucket-label" }, "Pending Orders", -1)),
                  s("span", D6, a(_(B.value.summary.pending_orders.count)), 1)
                ]),
                s("div", T6, [
                  t[661] || (t[661] = s("span", { class: "bucket-label" }, "Under Production", -1)),
                  s("span", O6, a(_(B.value.summary.under_production.count)), 1)
                ]),
                s("div", R6, [
                  t[662] || (t[662] = s("span", { class: "bucket-label" }, "Ready for Dispatch", -1)),
                  s("span", P6, a(_(B.value.summary.ready_for_dispatch.count)), 1)
                ]),
                s("div", I6, [
                  t[663] || (t[663] = s("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  s("span", V6, a(_(B.value.summary.delayed_orders.count)), 1)
                ]),
                s("div", N6, [
                  t[664] || (t[664] = s("span", { class: "bucket-label" }, "Delivered Orders", -1)),
                  s("span", E6, a(_(B.value.summary.delivered_orders.count)), 1)
                ]),
                s("div", q6, [
                  t[665] || (t[665] = s("span", { class: "bucket-label" }, "Cancelled Orders", -1)),
                  s("span", B6, a(_(B.value.summary.cancelled_orders.count)), 1)
                ])
              ])
            ], 64)) : vs.value === "total" ? (l(), o(u, { key: 1 }, [
              B.value.summary.total_orders.rows.length ? (l(), o("table", A6, [
                t[666] || (t[666] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Delivery Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.total_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.delivery_date || "—"), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", $6, a(e.status), 1)
                    ]),
                    s("td", L6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Q6, "No orders in this period."))
            ], 64)) : vs.value === "new" ? (l(), o(u, { key: 2 }, [
              B.value.summary.new_orders.rows.length ? (l(), o("table", F6, [
                t[667] || (t[667] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.new_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", H6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", z6, "No new (unconfirmed) orders in this period."))
            ], 64)) : vs.value === "pending" ? (l(), o(u, { key: 3 }, [
              B.value.summary.pending_orders.rows.length ? (l(), o("table", W6, [
                t[668] || (t[668] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Delivery Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.pending_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.delivery_date || "—"), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", U6, a(e.status), 1)
                    ]),
                    s("td", K6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", G6, "No pending orders in this period."))
            ], 64)) : vs.value === "under_production" ? (l(), o(u, { key: 4 }, [
              B.value.summary.under_production.rows.length ? (l(), o("table", Y6, [
                t[669] || (t[669] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Work Order Status"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.under_production.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.wo_statuses.join(", ")), 1),
                    s("td", J6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Z6, "No orders currently under production."))
            ], 64)) : vs.value === "ready_for_dispatch" ? (l(), o(u, { key: 5 }, [
              B.value.summary.ready_for_dispatch.rows.length ? (l(), o("table", X6, [
                t[670] || (t[670] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.ready_for_dispatch.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", s3, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", t3, "No orders ready for dispatch."))
            ], 64)) : vs.value === "delayed" ? (l(), o(u, { key: 6 }, [
              B.value.summary.delayed_orders.rows.length ? (l(), o("table", e3, [
                t[671] || (t[671] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Delivery Date"),
                    s("th", null, "Days Overdue"),
                    s("th", null, "Customer"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.delayed_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.delivery_date), 1),
                    s("td", a3, a(e.days_overdue), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", o3, a(e.status), 1)
                    ]),
                    s("td", l3, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", n3, "No delayed orders as of today."))
            ], 64)) : vs.value === "delivered" ? (l(), o(u, { key: 7 }, [
              B.value.summary.delivered_orders.rows.length ? (l(), o("table", i3, [
                t[672] || (t[672] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Customer"),
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.delivered_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", d3, a(e.status), 1)
                    ]),
                    s("td", r3, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", u3, "No delivered orders in this period."))
            ], 64)) : vs.value === "cancelled" ? (l(), o(u, { key: 8 }, [
              B.value.summary.cancelled_orders.rows.length ? (l(), o("table", c3, [
                t[673] || (t[673] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Order Date"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.summary.cancelled_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", m3, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", v3, "No cancelled orders in this period."))
            ], 64)) : vs.value === "order_value" ? (l(), o(u, { key: 9 }, [
              s("div", _3, [
                s("div", p3, [
                  t[674] || (t[674] = s("span", { class: "bucket-label" }, "Total Order Value", -1)),
                  s("span", y3, a(d(B.value.order_value.total_value)), 1)
                ])
              ]),
              B.value.order_value.by_status.length ? (l(), o("table", h3, [
                t[675] || (t[675] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Status"),
                    s("th", { class: "ta-r" }, "Orders"),
                    s("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.order_value.by_status, (e) => (l(), o("tr", {
                    key: e.status
                  }, [
                    s("td", null, [
                      s("span", b3, a(e.status), 1)
                    ]),
                    s("td", g3, a(e.order_count), 1),
                    s("td", k3, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w3, "No orders in this period."))
            ], 64)) : vs.value === "profitability" ? (l(), o(u, { key: 10 }, [
              t[680] || (t[680] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate — applied to Sales Order lines whether or not the order has been invoiced yet. ", -1)),
              s("div", f3, [
                s("div", x3, [
                  t[676] || (t[676] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", C3, a(d(B.value.order_profitability.totals.revenue)), 1)
                ]),
                s("div", S3, [
                  t[677] || (t[677] = s("span", { class: "bucket-label" }, "Cost", -1)),
                  s("span", j3, a(d(B.value.order_profitability.totals.total_cost)), 1)
                ]),
                s("div", M3, [
                  t[678] || (t[678] = s("span", { class: "bucket-label" }, "Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", B.value.order_profitability.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(B.value.order_profitability.totals.profit)), 3)
                ])
              ]),
              B.value.order_profitability.rows.length ? (l(), o("table", D3, [
                t[679] || (t[679] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Date"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(B.value.order_profitability.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", T3, a(d(e.revenue)), 1),
                    s("td", O3, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", R3, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", P3, "No orders in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", I3, a(vo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "profitability_mis" ? (l(), o("div", V3, [
          s("div", N3, [
            t[682] || (t[682] = x('<div class="bs-page-head-icon pfmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><line x1="12" y1="1" x2="12" y2="23" data-v-42720c7a></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Profitability MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Gross profit and margin by product, customer, order, branch and salesperson, plus the monthly profit trend. Excludes sales returns; cost is current average valuation, falling back to Standard Buying Rate.</div></div>', 2)),
            s("div", E3, [
              s("div", q3, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", B3, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[182] || (t[182] = (e) => es("exportProfitabilityMisCSV")),
                  disabled: !W.value
                }, [...t[681] || (t[681] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, A3),
                f.value === "exportProfitabilityMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[183] || (t[183] = (e) => f.value = "")
                  }),
                  s("div", $3, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[184] || (t[184] = (e) => {
                        f.value = "", $o();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[185] || (t[185] = (e) => {
                        f.value = "", Y($o);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", L3, [
            (l(), o(u, null, m(Ul, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Qs.value === e.key }]),
              onClick: (g) => Qs.value = e.key
            }, a(e.label), 11, Q3)), 64))
          ]),
          na.value ? (l(), o("div", F3)) : W.value ? (l(), o(u, { key: 1 }, [
            Qs.value === "summary" ? (l(), o(u, { key: 0 }, [
              t[689] || (t[689] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Excludes Sales Returns. Cost is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              s("div", H3, [
                s("div", z3, [
                  t[683] || (t[683] = s("span", { class: "bucket-label" }, "Gross Sales", -1)),
                  s("span", W3, a(d(W.value.summary.gross_sales)), 1)
                ]),
                s("div", U3, [
                  t[684] || (t[684] = s("span", { class: "bucket-label" }, "Net Sales", -1)),
                  s("span", K3, a(d(W.value.summary.net_sales)), 1)
                ]),
                s("div", G3, [
                  t[685] || (t[685] = s("span", { class: "bucket-label" }, "Total Cost", -1)),
                  s("span", Y3, a(d(W.value.summary.total_cost)), 1)
                ]),
                s("div", J3, [
                  t[686] || (t[686] = s("span", { class: "bucket-label" }, "Gross Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_profit >= 0 ? "green" : "red"])
                  }, a(d(W.value.summary.gross_profit)), 3)
                ]),
                s("div", Z3, [
                  t[687] || (t[687] = s("span", { class: "bucket-label" }, "Gross Margin %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_margin_pct >= 0 ? "green" : "red"])
                  }, a(W.value.summary.gross_margin_pct.toFixed(1)) + "%", 3)
                ]),
                s("div", X3, [
                  t[688] || (t[688] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                  s("span", s5, a(_(W.value.summary.invoice_count)), 1)
                ])
              ])
            ], 64)) : Qs.value === "product" ? (l(), o("table", t5, [
              t[690] || (t[690] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Item"),
                  s("th", { class: "ta-r" }, "Revenue"),
                  s("th", { class: "ta-r" }, "Cost"),
                  s("th", { class: "ta-r" }, "Profit"),
                  s("th", { class: "ta-r" }, "Margin %")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(W.value.product_wise_profit.rows, (e) => (l(), o("tr", {
                  key: e.item_code
                }, [
                  s("td", null, a(e.item_name || e.item_code), 1),
                  s("td", e5, a(d(e.revenue)), 1),
                  s("td", a5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", o5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Qs.value === "customer" ? (l(), o("table", l5, [
              t[691] || (t[691] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Customer"),
                  s("th", { class: "ta-r" }, "Invoices"),
                  s("th", { class: "ta-r" }, "Revenue"),
                  s("th", { class: "ta-r" }, "Cost"),
                  s("th", { class: "ta-r" }, "Profit"),
                  s("th", { class: "ta-r" }, "Margin %")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(W.value.customer_wise_profit.rows, (e) => (l(), o("tr", {
                  key: e.customer
                }, [
                  s("td", null, a(e.customer_name || e.customer), 1),
                  s("td", n5, a(e.invoice_count), 1),
                  s("td", i5, a(d(e.revenue)), 1),
                  s("td", d5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", r5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Qs.value === "order" ? (l(), o(u, { key: 3 }, [
              t[695] || (t[695] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Invoiced revenue and estimated cost, rolled up by the Sales Order each invoice line references. ", -1)),
              W.value.order_wise_profit.rows.length ? (l(), o("table", u5, [
                t[694] || (t[694] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Sales Order"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(W.value.order_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.customer_name), 1),
                    s("td", c5, a(d(e.revenue)), 1),
                    s("td", m5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", v5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128)),
                  W.value.order_wise_profit.no_order.revenue ? (l(), o("tr", _5, [
                    t[692] || (t[692] = s("td", {
                      colspan: "2",
                      style: { color: "#94a3b8" }
                    }, "Invoices not linked to a Sales Order", -1)),
                    s("td", p5, a(d(W.value.order_wise_profit.no_order.revenue)), 1),
                    s("td", y5, a(d(W.value.order_wise_profit.no_order.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", W.value.order_wise_profit.no_order.profit >= 0 ? "green" : "red"])
                    }, a(d(W.value.order_wise_profit.no_order.profit)), 3),
                    t[693] || (t[693] = s("td", { class: "ta-r mono-sm" }, "—", -1))
                  ])) : h("", !0)
                ])
              ])) : (l(), o("div", h5, "No order-linked sales in this period."))
            ], 64)) : Qs.value === "branch" ? (l(), o(u, { key: 4 }, [
              t[697] || (t[697] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Branch doctype exists in this app — Cost Center is used as the branch grouping. ", -1)),
              W.value.branch_wise_profit.rows.length ? (l(), o("table", b5, [
                t[696] || (t[696] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Branch (Cost Center)"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(W.value.branch_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.cost_center
                  }, [
                    s("td", null, a(e.cost_center_name), 1),
                    s("td", g5, a(d(e.revenue)), 1),
                    s("td", k5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", w5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", f5, "No sales in this period."))
            ], 64)) : Qs.value === "salesperson" ? (l(), o("table", x5, [
              t[698] || (t[698] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Salesperson"),
                  s("th", { class: "ta-r" }, "Revenue"),
                  s("th", { class: "ta-r" }, "Cost"),
                  s("th", { class: "ta-r" }, "Profit"),
                  s("th", { class: "ta-r" }, "Margin %")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(W.value.salesperson_wise_profit.rows, (e) => (l(), o("tr", {
                  key: e.sales_person
                }, [
                  s("td", null, a(e.sales_person_name), 1),
                  s("td", C5, a(d(e.revenue)), 1),
                  s("td", S5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", j5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Qs.value === "monthly_trend" ? (l(), o(u, { key: 6 }, [
              W.value.monthly_profit_trend.rows.length ? (l(), o("table", M5, [
                t[699] || (t[699] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Month"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(W.value.monthly_profit_trend.rows, (e) => (l(), o("tr", {
                    key: e.month
                  }, [
                    s("td", null, a(e.month), 1),
                    s("td", D5, a(d(e.revenue)), 1),
                    s("td", T5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", O5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", R5, "No sales in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", P5, a(_o.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "expense_mis" ? (l(), o("div", I5, [
          s("div", V5, [
            t[701] || (t[701] = x('<div class="bs-page-head-icon emis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="2" y="7" width="20" height="14" rx="2" data-v-42720c7a></rect><path d="M2 10h20" data-v-42720c7a></path><path d="M6 15h4" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Expense MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Total expenses by department and category, budget vs actual, fixed vs variable, trend and unusual/excess spend. Submitted Expense records only — Purchase Invoices and GL journal entries are not included here.</div></div>', 2)),
            s("div", N5, [
              s("div", E5, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", q5, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[186] || (t[186] = (e) => es("exportExpenseMisCSV")),
                  disabled: !U.value
                }, [...t[700] || (t[700] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, B5),
                f.value === "exportExpenseMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[187] || (t[187] = (e) => f.value = "")
                  }),
                  s("div", A5, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[188] || (t[188] = (e) => {
                        f.value = "", Lo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[189] || (t[189] = (e) => {
                        f.value = "", Y(Lo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", $5, [
            (l(), o(u, null, m(Kl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ps.value === e.key }]),
              onClick: (g) => Ps.value = e.key
            }, a(e.label), 11, L5)), 64))
          ]),
          ia.value ? (l(), o("div", Q5)) : U.value ? (l(), o(u, { key: 1 }, [
            Ps.value === "summary" ? (l(), o(u, { key: 0 }, [
              t[707] || (t[707] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Submitted Expense records only (see Expenses). Purchase Invoices and GL journal entries are not included here. ", -1)),
              s("div", F5, [
                s("div", H5, [
                  t[702] || (t[702] = s("span", { class: "bucket-label" }, "Total Expenses", -1)),
                  s("span", z5, a(d(U.value.summary.total_amount)), 1)
                ]),
                s("div", W5, [
                  t[703] || (t[703] = s("span", { class: "bucket-label" }, "Net (excl. Tax)", -1)),
                  s("span", U5, a(d(U.value.summary.net_amount)), 1)
                ]),
                s("div", K5, [
                  t[704] || (t[704] = s("span", { class: "bucket-label" }, "Tax Amount", -1)),
                  s("span", G5, a(d(U.value.summary.total_tax)), 1)
                ]),
                s("div", Y5, [
                  t[705] || (t[705] = s("span", { class: "bucket-label" }, "Expense Count", -1)),
                  s("span", J5, a(_(U.value.summary.expense_count)), 1)
                ]),
                s("div", Z5, [
                  t[706] || (t[706] = s("span", { class: "bucket-label" }, "Avg Expense", -1)),
                  s("span", X5, a(d(U.value.summary.avg_expense)), 1)
                ])
              ])
            ], 64)) : Ps.value === "department" ? (l(), o(u, { key: 1 }, [
              t[709] || (t[709] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Department doctype exists in this app — Cost Center is used as the department grouping. ", -1)),
              U.value.department_wise.rows.length ? (l(), o("table", sx, [
                t[708] || (t[708] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Department (Cost Center)"),
                    s("th", { class: "ta-r" }, "Expenses"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(U.value.department_wise.rows, (e) => (l(), o("tr", {
                    key: e.cost_center
                  }, [
                    s("td", null, a(e.cost_center_name), 1),
                    s("td", tx, a(e.count), 1),
                    s("td", ex, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ax, "No expenses in this period."))
            ], 64)) : Ps.value === "category" ? (l(), o("table", ox, [
              t[710] || (t[710] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Category"),
                  s("th", { class: "ta-r" }, "Expenses"),
                  s("th", { class: "ta-r" }, "Amount"),
                  s("th", { class: "ta-r" }, "% of Total")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(U.value.category_wise.rows, (e) => (l(), o("tr", {
                  key: e.expense_type
                }, [
                  s("td", null, a(e.category_name), 1),
                  s("td", lx, a(e.count), 1),
                  s("td", nx, a(d(e.amount)), 1),
                  s("td", ix, a(e.pct_of_total.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ps.value === "budget" ? (l(), o(u, { key: 3 }, [
              s("div", dx, " Estimated: each Cost Center's stored budget is prorated to the " + a(U.value.budget_vs_actual.period_days) + "-day selected period from its Annual/Quarterly/Monthly budget period. Cost centers with no budget set are omitted. ", 1),
              U.value.budget_vs_actual.rows.length ? (l(), o("table", rx, [
                t[711] || (t[711] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Cost Center"),
                    s("th", null, "Budget Period"),
                    s("th", { class: "ta-r" }, "Period Budget (est.)"),
                    s("th", { class: "ta-r" }, "Actual"),
                    s("th", { class: "ta-r" }, "Variance"),
                    s("th", { class: "ta-r" }, "Variance %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(U.value.budget_vs_actual.rows, (e) => (l(), o("tr", {
                    key: e.cost_center
                  }, [
                    s("td", null, a(e.cost_center_name), 1),
                    s("td", null, a(e.budget_period), 1),
                    s("td", ux, a(d(e.period_budget)), 1),
                    s("td", cx, a(d(e.actual)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance > 0 ? "red" : "green"])
                    }, a(d(e.variance)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.variance > 0 ? "red" : "green"])
                    }, a(e.variance_pct.toFixed(1)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", mx, "No cost centers with a budget set."))
            ], 64)) : Ps.value === "fixed" ? (l(), o(u, { key: 4 }, [
              t[714] || (t[714] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Categorised by keyword match on the Expense Category name (rent, salary, insurance, depreciation, EMI, etc.) — no stored Fixed/Variable flag exists. ", -1)),
              s("div", vx, [
                s("div", _x, [
                  t[712] || (t[712] = s("span", { class: "bucket-label" }, "Fixed Total", -1)),
                  s("span", px, a(d(U.value.fixed_expenses.total)), 1)
                ])
              ]),
              U.value.fixed_expenses.rows.length ? (l(), o("table", yx, [
                t[713] || (t[713] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Category"),
                    s("th", { class: "ta-r" }, "Expenses"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(U.value.fixed_expenses.rows, (e) => (l(), o("tr", {
                    key: e.expense_type
                  }, [
                    s("td", null, a(e.category_name), 1),
                    s("td", hx, a(e.count), 1),
                    s("td", bx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gx, "No categories matched the Fixed-expense keywords in this period."))
            ], 64)) : Ps.value === "variable" ? (l(), o(u, { key: 5 }, [
              s("div", kx, [
                s("div", wx, [
                  t[715] || (t[715] = s("span", { class: "bucket-label" }, "Variable Total", -1)),
                  s("span", fx, a(d(U.value.variable_expenses.total)), 1)
                ])
              ]),
              U.value.variable_expenses.rows.length ? (l(), o("table", xx, [
                t[716] || (t[716] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Category"),
                    s("th", { class: "ta-r" }, "Expenses"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(U.value.variable_expenses.rows, (e) => (l(), o("tr", {
                    key: e.expense_type
                  }, [
                    s("td", null, a(e.category_name), 1),
                    s("td", Cx, a(e.count), 1),
                    s("td", Sx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jx, "No variable-expense categories in this period."))
            ], 64)) : Ps.value === "trend" ? (l(), o(u, { key: 6 }, [
              U.value.expense_trend.rows.length ? (l(), o("table", Mx, [
                t[717] || (t[717] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Month"),
                    s("th", { class: "ta-r" }, "Expenses"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(U.value.expense_trend.rows, (e) => (l(), o("tr", {
                    key: e.month
                  }, [
                    s("td", null, a(e.month), 1),
                    s("td", Dx, a(e.count), 1),
                    s("td", Tx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Ox, "No expenses in this period."))
            ], 64)) : Ps.value === "unusual" ? (l(), o(u, { key: 7 }, [
              t[719] || (t[719] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Individual expenses flagged as statistical outliers within their own category for this period (mean + 2x std-dev, or 2x average for thin categories). ", -1)),
              U.value.unusual_expenses.rows.length ? (l(), o("table", Rx, [
                t[718] || (t[718] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Expense"),
                    s("th", null, "Date"),
                    s("th", null, "Category"),
                    s("th", null, "Department"),
                    s("th", { class: "ta-r" }, "Amount"),
                    s("th", { class: "ta-r" }, "Category Avg"),
                    s("th", null, "Basis")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(U.value.unusual_expenses.rows, (e) => (l(), o("tr", {
                    key: e.expense
                  }, [
                    s("td", null, a(e.expense), 1),
                    s("td", null, a(e.posting_date), 1),
                    s("td", null, a(e.category_name), 1),
                    s("td", null, a(e.cost_center_name || "—"), 1),
                    s("td", Px, a(d(e.amount)), 1),
                    s("td", Ix, a(d(e.category_avg)), 1),
                    s("td", Vx, a(e.basis), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Nx, "No unusual expenses detected in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Ex, a(po.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "payables_mis" ? (l(), o("div", qx, [
          s("div", Bx, [
            t[721] || (t[721] = x('<div class="bs-page-head-icon payblmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><circle cx="12" cy="12" r="10" data-v-42720c7a></circle><polyline points="12 6 12 12 16 14" data-v-42720c7a></polyline></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Payables MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Supplier outstanding, payable ageing, overdue payables, amounts due this week/month, supplier-wise outstanding and payment due forecast.</div></div>', 2)),
            s("div", Ax, [
              s("div", $x, "As of " + a(P(y.value)), 1),
              s("div", Lx, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[190] || (t[190] = (e) => es("exportPayablesMisCSV")),
                  disabled: !X.value
                }, [...t[720] || (t[720] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, Qx),
                f.value === "exportPayablesMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[191] || (t[191] = (e) => f.value = "")
                  }),
                  s("div", Fx, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[192] || (t[192] = (e) => {
                        f.value = "", Qo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[193] || (t[193] = (e) => {
                        f.value = "", Y(Qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", Hx, [
            (l(), o(u, null, m(Gl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Fs.value === e.key }]),
              onClick: (g) => Fs.value = e.key
            }, a(e.label), 11, zx)), 64))
          ]),
          da.value ? (l(), o("div", Wx)) : X.value ? (l(), o(u, { key: 1 }, [
            Fs.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", Ux, " As of " + a(y.value) + ". Submitted Purchase Invoices with a non-zero outstanding balance; Purchase Returns are netted in. ", 1),
              s("div", Kx, [
                s("div", Gx, [
                  t[722] || (t[722] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", Yx, a(d(X.value.summary.total_outstanding)), 1)
                ]),
                s("div", Jx, [
                  t[723] || (t[723] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", Zx, a(d(X.value.summary.overdue_amount)), 1)
                ]),
                s("div", Xx, [
                  t[724] || (t[724] = s("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  s("span", s8, a(d(X.value.summary.not_yet_due_amount)), 1)
                ]),
                s("div", t8, [
                  t[725] || (t[725] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                  s("span", e8, a(_(X.value.summary.invoice_count)), 1)
                ]),
                s("div", a8, [
                  t[726] || (t[726] = s("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  s("span", o8, a(_(X.value.summary.overdue_count)), 1)
                ]),
                s("div", l8, [
                  t[727] || (t[727] = s("span", { class: "bucket-label" }, "Suppliers", -1)),
                  s("span", n8, a(_(X.value.summary.supplier_count)), 1)
                ])
              ])
            ], 64)) : Fs.value === "ageing" ? (l(), o("table", i8, [
              t[728] || (t[728] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Supplier"),
                  s("th", { class: "ta-r" }, "Current"),
                  s("th", { class: "ta-r" }, "1-30"),
                  s("th", { class: "ta-r" }, "31-60"),
                  s("th", { class: "ta-r" }, "61-90"),
                  s("th", { class: "ta-r" }, "90+"),
                  s("th", { class: "ta-r" }, "Total")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(X.value.payable_ageing.rows, (e) => (l(), o("tr", {
                  key: e.supplier
                }, [
                  s("td", null, a(e.supplier_name), 1),
                  s("td", d8, a(d(e.current)), 1),
                  s("td", r8, a(d(e.days_1_30)), 1),
                  s("td", u8, a(d(e.days_31_60)), 1),
                  s("td", c8, a(d(e.days_61_90)), 1),
                  s("td", m8, a(d(e.days_90_plus)), 1),
                  s("td", v8, a(d(e.total)), 1)
                ]))), 128))
              ])
            ])) : Fs.value === "overdue" ? (l(), o(u, { key: 2 }, [
              X.value.overdue_payables.rows.length ? (l(), o("table", _8, [
                t[729] || (t[729] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Invoice"),
                    s("th", null, "Supplier"),
                    s("th", null, "Due Date"),
                    s("th", { class: "ta-r" }, "Overdue Days"),
                    s("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(X.value.overdue_payables.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    s("td", null, a(e.invoice), 1),
                    s("td", null, a(e.supplier_name), 1),
                    s("td", null, a(e.due_date), 1),
                    s("td", p8, a(e.overdue_days), 1),
                    s("td", y8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", h8, "No overdue payables as of " + a(y.value) + ".", 1))
            ], 64)) : Fs.value === "due_week" ? (l(), o(u, { key: 3 }, [
              s("div", b8, "Rolling 7 days from " + a(y.value) + ", not yet overdue.", 1),
              X.value.due_this_week.rows.length ? (l(), o("table", g8, [
                t[730] || (t[730] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Invoice"),
                    s("th", null, "Supplier"),
                    s("th", null, "Due Date"),
                    s("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(X.value.due_this_week.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    s("td", null, a(e.invoice), 1),
                    s("td", null, a(e.supplier_name), 1),
                    s("td", null, a(e.due_date), 1),
                    s("td", k8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w8, "Nothing due in the next 7 days."))
            ], 64)) : Fs.value === "due_month" ? (l(), o(u, { key: 4 }, [
              s("div", f8, "Calendar month containing " + a(y.value) + " — can include invoices already overdue earlier this month.", 1),
              X.value.due_this_month.rows.length ? (l(), o("table", x8, [
                t[731] || (t[731] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Invoice"),
                    s("th", null, "Supplier"),
                    s("th", null, "Due Date"),
                    s("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(X.value.due_this_month.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    s("td", null, a(e.invoice), 1),
                    s("td", null, a(e.supplier_name), 1),
                    s("td", null, a(e.due_date), 1),
                    s("td", C8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", S8, "Nothing due this month."))
            ], 64)) : Fs.value === "supplier" ? (l(), o("table", j8, [
              t[732] || (t[732] = s("thead", null, [
                s("tr", null, [
                  s("th", null, "Supplier"),
                  s("th", { class: "ta-r" }, "Invoices"),
                  s("th", { class: "ta-r" }, "Outstanding"),
                  s("th", { class: "ta-r" }, "Overdue Amount"),
                  s("th", { class: "ta-r" }, "Oldest Overdue (days)")
                ])
              ], -1)),
              s("tbody", null, [
                (l(!0), o(u, null, m(X.value.supplier_wise_outstanding.rows, (e) => (l(), o("tr", {
                  key: e.supplier
                }, [
                  s("td", null, a(e.supplier_name), 1),
                  s("td", M8, a(e.invoice_count), 1),
                  s("td", D8, a(d(e.outstanding)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm", e.overdue_amount ? "red" : ""])
                  }, a(d(e.overdue_amount)), 3),
                  s("td", T8, a(e.max_overdue_days || "—"), 1)
                ]))), 128))
              ])
            ])) : Fs.value === "forecast" ? (l(), o(u, { key: 6 }, [
              s("div", O8, "Forward-looking cash-outflow view, bucketed by days until due from " + a(y.value) + ".", 1),
              s("table", R8, [
                t[733] || (t[733] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Bucket"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(X.value.payment_due_forecast.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    s("td", {
                      class: c(e.key === "overdue" ? "red" : "")
                    }, a(e.label), 3),
                    s("td", P8, a(e.count), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.key === "overdue" ? "red" : ""])
                    }, a(d(e.amount)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", I8, a(yo.value ? "No data as of this date." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "cash_bank_mis" ? (l(), o("div", V8, [
          s("div", N8, [
            t[735] || (t[735] = x('<div class="bs-page-head-icon cbmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="2" y="5" width="20" height="14" rx="2" data-v-42720c7a></rect><line x1="2" y1="10" x2="22" y2="10" data-v-42720c7a></line><line x1="6" y1="15" x2="10" y2="15" data-v-42720c7a></line></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Cash &amp; Bank MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Cash position, bank balance, daily cash flow and bank movement, receipts, payments, cash forecast and fund requirement for the period.</div></div>', 2)),
            s("div", E8, [
              s("div", q8, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", B8, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[194] || (t[194] = (e) => es("exportCashBankMisCSV")),
                  disabled: !E.value
                }, [...t[734] || (t[734] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, A8),
                f.value === "exportCashBankMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[195] || (t[195] = (e) => f.value = "")
                  }),
                  s("div", $8, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[196] || (t[196] = (e) => {
                        f.value = "", Fo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[197] || (t[197] = (e) => {
                        f.value = "", Y(Fo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", L8, [
            (l(), o(u, null, m(Yl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Is.value === e.key }]),
              onClick: (g) => Is.value = e.key
            }, a(e.label), 11, Q8)), 64))
          ]),
          ra.value ? (l(), o("div", F8)) : E.value ? (l(), o(u, { key: 1 }, [
            Is.value === "cash_position" ? (l(), o(u, { key: 0 }, [
              s("div", H8, "As of " + a(E.value.as_of_date) + ".", 1),
              s("div", z8, [
                s("div", W8, [
                  t[736] || (t[736] = s("span", { class: "bucket-label" }, "Total Cash", -1)),
                  s("span", U8, a(d(E.value.cash_position.total)), 1)
                ])
              ]),
              E.value.cash_position.rows.length ? (l(), o("table", K8, [
                t[737] || (t[737] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Account"),
                    s("th", { class: "ta-r" }, "Opening"),
                    s("th", { class: "ta-r" }, "Closing"),
                    s("th", { class: "ta-r" }, "Net Movement")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.cash_position.rows, (e) => (l(), o("tr", {
                    key: e.account
                  }, [
                    s("td", null, a(e.account_name), 1),
                    s("td", G8, a(d(e.opening_balance)), 1),
                    s("td", Y8, a(d(e.closing_balance)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", J8, "No Cash accounts found."))
            ], 64)) : Is.value === "bank_balance" ? (l(), o(u, { key: 1 }, [
              s("div", Z8, "As of " + a(E.value.as_of_date) + ".", 1),
              s("div", X8, [
                s("div", s9, [
                  t[738] || (t[738] = s("span", { class: "bucket-label" }, "Total Bank", -1)),
                  s("span", t9, a(d(E.value.bank_balance.total)), 1)
                ])
              ]),
              E.value.bank_balance.rows.length ? (l(), o("table", e9, [
                t[739] || (t[739] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Account"),
                    s("th", { class: "ta-r" }, "Opening"),
                    s("th", { class: "ta-r" }, "Closing"),
                    s("th", { class: "ta-r" }, "Net Movement")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.bank_balance.rows, (e) => (l(), o("tr", {
                    key: e.account
                  }, [
                    s("td", null, a(e.account_name), 1),
                    s("td", a9, a(d(e.opening_balance)), 1),
                    s("td", o9, a(d(e.closing_balance)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", l9, "No Bank accounts found."))
            ], 64)) : Is.value === "daily_cash" ? (l(), o(u, { key: 2 }, [
              s("div", n9, [
                s("div", i9, [
                  t[740] || (t[740] = s("span", { class: "bucket-label" }, "Opening", -1)),
                  s("span", d9, a(d(E.value.daily_cash_flow.opening_balance)), 1)
                ]),
                s("div", r9, [
                  t[741] || (t[741] = s("span", { class: "bucket-label" }, "Receipts", -1)),
                  s("span", u9, a(d(E.value.daily_cash_flow.total_receipts)), 1)
                ]),
                s("div", c9, [
                  t[742] || (t[742] = s("span", { class: "bucket-label" }, "Payments", -1)),
                  s("span", m9, a(d(E.value.daily_cash_flow.total_payments)), 1)
                ]),
                s("div", v9, [
                  t[743] || (t[743] = s("span", { class: "bucket-label" }, "Closing", -1)),
                  s("span", _9, a(d(E.value.daily_cash_flow.closing_balance)), 1)
                ])
              ]),
              s("table", p9, [
                t[744] || (t[744] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Date"),
                    s("th", { class: "ta-r" }, "Receipts"),
                    s("th", { class: "ta-r" }, "Payments"),
                    s("th", { class: "ta-r" }, "Net"),
                    s("th", { class: "ta-r" }, "Balance")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.daily_cash_flow.days, (e) => (l(), o("tr", {
                    key: e.date
                  }, [
                    s("td", null, a(e.date), 1),
                    s("td", y9, a(d(e.receipts)), 1),
                    s("td", h9, a(d(e.payments)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", b9, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : Is.value === "daily_bank" ? (l(), o(u, { key: 3 }, [
              s("div", g9, [
                s("div", k9, [
                  t[745] || (t[745] = s("span", { class: "bucket-label" }, "Opening", -1)),
                  s("span", w9, a(d(E.value.daily_bank_movement.opening_balance)), 1)
                ]),
                s("div", f9, [
                  t[746] || (t[746] = s("span", { class: "bucket-label" }, "Deposits", -1)),
                  s("span", x9, a(d(E.value.daily_bank_movement.total_receipts)), 1)
                ]),
                s("div", C9, [
                  t[747] || (t[747] = s("span", { class: "bucket-label" }, "Withdrawals", -1)),
                  s("span", S9, a(d(E.value.daily_bank_movement.total_payments)), 1)
                ]),
                s("div", j9, [
                  t[748] || (t[748] = s("span", { class: "bucket-label" }, "Closing", -1)),
                  s("span", M9, a(d(E.value.daily_bank_movement.closing_balance)), 1)
                ])
              ]),
              s("table", D9, [
                t[749] || (t[749] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Date"),
                    s("th", { class: "ta-r" }, "Deposits"),
                    s("th", { class: "ta-r" }, "Withdrawals"),
                    s("th", { class: "ta-r" }, "Net"),
                    s("th", { class: "ta-r" }, "Balance")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.daily_bank_movement.days, (e) => (l(), o("tr", {
                    key: e.date
                  }, [
                    s("td", null, a(e.date), 1),
                    s("td", T9, a(d(e.receipts)), 1),
                    s("td", O9, a(d(e.payments)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", R9, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : Is.value === "receipts" ? (l(), o(u, { key: 4 }, [
              s("div", P9, [
                s("div", I9, [
                  t[750] || (t[750] = s("span", { class: "bucket-label" }, "Total Receipts", -1)),
                  s("span", V9, a(d(E.value.receipts.total)), 1)
                ])
              ]),
              E.value.receipts.rows.length ? (l(), o("table", N9, [
                t[751] || (t[751] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Reference"),
                    s("th", null, "Date"),
                    s("th", null, "Party"),
                    s("th", null, "Account"),
                    s("th", null, "Mode"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.receipts.rows, (e) => (l(), o("tr", {
                    key: e.reference
                  }, [
                    s("td", null, a(e.reference), 1),
                    s("td", null, a(e.date), 1),
                    s("td", null, a(e.party_name || e.party || "—"), 1),
                    s("td", null, a(e.account), 1),
                    s("td", null, a(e.mode_of_payment || "—"), 1),
                    s("td", E9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", q9, "No receipts in this period."))
            ], 64)) : Is.value === "payments" ? (l(), o(u, { key: 5 }, [
              t[754] || (t[754] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Includes both Payment Entry (Pay) and Expense records paid directly from a Cash/Bank account. ", -1)),
              s("div", B9, [
                s("div", A9, [
                  t[752] || (t[752] = s("span", { class: "bucket-label" }, "Total Payments", -1)),
                  s("span", $9, a(d(E.value.payments.total)), 1)
                ])
              ]),
              E.value.payments.rows.length ? (l(), o("table", L9, [
                t[753] || (t[753] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Reference"),
                    s("th", null, "Date"),
                    s("th", null, "Party"),
                    s("th", null, "Account"),
                    s("th", null, "Source"),
                    s("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.payments.rows, (e) => (l(), o("tr", {
                    key: e.source + e.reference
                  }, [
                    s("td", null, a(e.reference), 1),
                    s("td", null, a(e.date), 1),
                    s("td", null, a(e.party_name || e.party || "—"), 1),
                    s("td", null, a(e.account), 1),
                    s("td", null, a(e.source), 1),
                    s("td", Q9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", F9, "No payments in this period."))
            ], 64)) : Is.value === "forecast" ? (l(), o(u, { key: 6 }, [
              s("div", H9, " Projected from the current Cash + Bank position (" + a(d(E.value.cash_forecast.current_position)) + "), assuming every outstanding invoice settles on its due date. ", 1),
              s("table", z9, [
                t[755] || (t[755] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Bucket"),
                    s("th", { class: "ta-r" }, "Expected Inflow"),
                    s("th", { class: "ta-r" }, "Expected Outflow"),
                    s("th", { class: "ta-r" }, "Net"),
                    s("th", { class: "ta-r" }, "Projected Balance")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.cash_forecast.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    s("td", {
                      class: c(e.key === "overdue" ? "red" : "")
                    }, a(e.label), 3),
                    s("td", W9, a(d(e.inflow)), 1),
                    s("td", U9, a(d(e.outflow)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.projected_balance >= 0 ? "" : "red"])
                    }, a(d(e.projected_balance)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : Is.value === "fund_requirement" ? (l(), o(u, { key: 7 }, [
              s("div", K9, [
                s("div", G9, [
                  t[756] || (t[756] = s("span", { class: "bucket-label" }, "Peak Fund Requirement", -1)),
                  s("span", {
                    class: c(["mis-summary-val", E.value.fund_requirement.peak_requirement > 0 ? "red" : "green"])
                  }, a(d(E.value.fund_requirement.peak_requirement)), 3)
                ])
              ]),
              E.value.fund_requirement.rows.length ? (l(), o("table", Y9, [
                t[757] || (t[757] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Bucket"),
                    s("th", { class: "ta-r" }, "Shortfall")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.fund_requirement.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    s("td", J9, a(e.label), 1),
                    s("td", Z9, a(d(e.shortfall)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", X9, "No projected shortfall — the current Cash + Bank position covers the forecast."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", sC, a(ho.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "customer_mis" ? (l(), o("div", tC, [
          s("div", eC, [
            t[759] || (t[759] = x('<div class="bs-page-head-icon custmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-42720c7a></path><circle cx="9" cy="7" r="4" data-v-42720c7a></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-42720c7a></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Customer MIS</div><div class="bs-page-head-sub" data-v-42720c7a>New, active, repeat and inactive customers, customer-wise sales/outstanding/profit, retention rate, and top customers for the period.</div></div>', 2)),
            s("div", aC, [
              s("div", oC, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", lC, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[198] || (t[198] = (e) => es("exportCustomerMisCSV")),
                  disabled: !M.value
                }, [...t[758] || (t[758] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, nC),
                f.value === "exportCustomerMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[199] || (t[199] = (e) => f.value = "")
                  }),
                  s("div", iC, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[200] || (t[200] = (e) => {
                        f.value = "", Ho();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[201] || (t[201] = (e) => {
                        f.value = "", Y(Ho);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", dC, [
            (l(), o(u, null, m(Jl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ss.value === e.key }]),
              onClick: (g) => Ss.value = e.key
            }, a(e.label), 11, rC)), 64))
          ]),
          ua.value ? (l(), o("div", uC)) : M.value ? (l(), o(u, { key: 1 }, [
            s("div", cC, [
              s("div", mC, [
                t[760] || (t[760] = s("span", { class: "bucket-label" }, "Total Customers", -1)),
                s("span", vC, a(_(M.value.summary.total_customers)), 1)
              ]),
              s("div", _C, [
                t[761] || (t[761] = s("span", { class: "bucket-label" }, "Active Customers", -1)),
                s("span", pC, a(_(M.value.summary.active_count)), 1)
              ]),
              s("div", yC, [
                t[762] || (t[762] = s("span", { class: "bucket-label" }, "Active Revenue", -1)),
                s("span", hC, a(d(M.value.summary.active_revenue)), 1)
              ]),
              s("div", bC, [
                t[763] || (t[763] = s("span", { class: "bucket-label" }, "New Customers", -1)),
                s("span", gC, a(_(M.value.summary.new_count)), 1)
              ]),
              s("div", kC, [
                t[764] || (t[764] = s("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                s("span", wC, a(_(M.value.summary.repeat_count)), 1)
              ]),
              s("div", fC, [
                t[765] || (t[765] = s("span", { class: "bucket-label" }, "Repeat Revenue", -1)),
                s("span", xC, a(d(M.value.summary.repeat_revenue)), 1)
              ]),
              s("div", CC, [
                t[766] || (t[766] = s("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                s("span", SC, a(_(M.value.summary.inactive_count)), 1)
              ]),
              s("div", jC, [
                t[767] || (t[767] = s("span", { class: "bucket-label" }, "Retention Rate", -1)),
                s("span", MC, a(Number(M.value.summary.retention_pct).toFixed(1)) + "%", 1)
              ]),
              s("div", DC, [
                t[768] || (t[768] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                s("span", TC, a(d(M.value.summary.total_outstanding)), 1)
              ]),
              s("div", OC, [
                t[769] || (t[769] = s("span", { class: "bucket-label" }, "Total Profit", -1)),
                s("span", {
                  class: c(["mis-summary-val", M.value.summary.total_profit >= 0 ? "green" : "red"])
                }, a(d(M.value.summary.total_profit)), 3)
              ])
            ]),
            Ss.value === "new_customers" ? (l(), o(u, { key: 0 }, [
              s("div", RC, [
                s("div", PC, [
                  t[770] || (t[770] = s("span", { class: "bucket-label" }, "New Customers", -1)),
                  s("span", IC, a(M.value.new_customers.count), 1)
                ])
              ]),
              M.value.new_customers.rows.length ? (l(), o("table", VC, [
                t[771] || (t[771] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", null, "First Invoice Date"),
                    s("th", { class: "ta-r" }, "Invoices in Period"),
                    s("th", { class: "ta-r" }, "Revenue in Period")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.new_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.first_invoice_date), 1),
                    s("td", NC, a(e.invoice_count), 1),
                    s("td", EC, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", qC, "No new customers in this period."))
            ], 64)) : Ss.value === "active_customers" ? (l(), o(u, { key: 1 }, [
              s("div", BC, [
                s("div", AC, [
                  t[772] || (t[772] = s("span", { class: "bucket-label" }, "Active Customers", -1)),
                  s("span", $C, a(M.value.active_customers.count), 1)
                ]),
                s("div", LC, [
                  t[773] || (t[773] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", QC, a(d(M.value.active_customers.total)), 1)
                ])
              ]),
              M.value.active_customers.rows.length ? (l(), o("table", FC, [
                t[774] || (t[774] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", null, "First Invoice"),
                    s("th", null, "Last Invoice")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.active_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", HC, a(e.invoice_count), 1),
                    s("td", zC, a(d(e.total_amount)), 1),
                    s("td", null, a(e.first_invoice_in_period), 1),
                    s("td", null, a(e.last_invoice_in_period), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", WC, "No active customers in this period."))
            ], 64)) : Ss.value === "repeat_customers" ? (l(), o(u, { key: 2 }, [
              s("div", UC, [
                s("div", KC, [
                  t[775] || (t[775] = s("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                  s("span", GC, a(M.value.repeat_customers.count), 1)
                ]),
                s("div", YC, [
                  t[776] || (t[776] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", JC, a(d(M.value.repeat_customers.total)), 1)
                ])
              ]),
              M.value.repeat_customers.rows.length ? (l(), o("table", ZC, [
                t[777] || (t[777] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.repeat_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", XC, a(e.invoice_count), 1),
                    s("td", sS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", tS, "No repeat customers in this period."))
            ], 64)) : Ss.value === "customer_wise_sales" ? (l(), o(u, { key: 3 }, [
              M.value.customer_wise_sales.rows.length ? (l(), o("table", eS, [
                t[778] || (t[778] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Net Total"),
                    s("th", { class: "ta-r" }, "Discount"),
                    s("th", { class: "ta-r" }, "Tax"),
                    s("th", { class: "ta-r" }, "Total"),
                    s("th", { class: "ta-r" }, "Outstanding"),
                    s("th", { class: "ta-r" }, "Avg Invoice Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.customer_wise_sales.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", aS, a(e.invoice_count), 1),
                    s("td", oS, a(d(e.net_total)), 1),
                    s("td", lS, a(d(e.total_discount)), 1),
                    s("td", nS, a(d(e.total_tax)), 1),
                    s("td", iS, a(d(e.total_amount)), 1),
                    s("td", dS, a(d(e.outstanding_amount)), 1),
                    s("td", rS, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", uS, "No sales in this period."))
            ], 64)) : Ss.value === "customer_wise_outstanding" ? (l(), o(u, { key: 4 }, [
              s("div", cS, [
                s("div", mS, [
                  t[779] || (t[779] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", vS, a(d(M.value.customer_wise_outstanding.total)), 1)
                ])
              ]),
              M.value.customer_wise_outstanding.rows.length ? (l(), o("table", _S, [
                t[780] || (t[780] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Outstanding"),
                    s("th", null, "Oldest Due Date"),
                    s("th", { class: "ta-r" }, "Max Overdue Days")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.customer_wise_outstanding.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", pS, a(e.invoice_count), 1),
                    s("td", yS, a(d(e.outstanding_amount)), 1),
                    s("td", null, a(e.oldest_due_date), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", hS, "No outstanding balances."))
            ], 64)) : Ss.value === "customer_wise_profit" ? (l(), o(u, { key: 5 }, [
              s("div", bS, [
                s("div", gS, [
                  t[781] || (t[781] = s("span", { class: "bucket-label" }, "Total Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", M.value.customer_wise_profit.total >= 0 ? "green" : "red"])
                  }, a(d(M.value.customer_wise_profit.total)), 3)
                ])
              ]),
              M.value.customer_wise_profit.rows.length ? (l(), o("table", kS, [
                t[782] || (t[782] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Revenue"),
                    s("th", { class: "ta-r" }, "Cost"),
                    s("th", { class: "ta-r" }, "Profit"),
                    s("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.customer_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", wS, a(e.invoice_count), 1),
                    s("td", fS, a(d(e.revenue)), 1),
                    s("td", xS, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", CS, a(Number(e.margin_pct).toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", SS, "No profit data for this period."))
            ], 64)) : Ss.value === "customer_retention" ? (l(), o(u, { key: 6 }, [
              s("div", jS, " Comparing " + a(M.value.customer_retention.prev_from) + " – " + a(M.value.customer_retention.prev_to) + " (prior period) to the selected period. ", 1),
              s("div", MS, [
                s("div", DS, [
                  t[783] || (t[783] = s("span", { class: "bucket-label" }, "Retention Rate", -1)),
                  s("span", TS, a(Number(M.value.customer_retention.retention_pct).toFixed(1)) + "%", 1)
                ]),
                s("div", OS, [
                  t[784] || (t[784] = s("span", { class: "bucket-label" }, "Retained", -1)),
                  s("span", RS, a(M.value.customer_retention.retained_count), 1)
                ]),
                s("div", PS, [
                  t[785] || (t[785] = s("span", { class: "bucket-label" }, "Churned", -1)),
                  s("span", IS, a(M.value.customer_retention.churned_count), 1)
                ]),
                s("div", VS, [
                  t[786] || (t[786] = s("span", { class: "bucket-label" }, "New", -1)),
                  s("span", NS, a(M.value.customer_retention.new_count), 1)
                ])
              ]),
              M.value.customer_retention.rows.length ? (l(), o("table", ES, [
                t[787] || (t[787] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", null, "Status")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.customer_retention.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", {
                      class: c(e.status === "Retained" ? "green" : e.status === "Churned" ? "red" : "")
                    }, a(e.status), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", qS, "No customer activity to compare."))
            ], 64)) : Ss.value === "top_customers" ? (l(), o(u, { key: 7 }, [
              M.value.top_customers.rows.length ? (l(), o("table", BS, [
                t[788] || (t[788] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "#"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.top_customers.rows, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(g + 1), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", AS, a(e.invoice_count), 1),
                    s("td", $S, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", LS, "No sales in this period."))
            ], 64)) : Ss.value === "inactive_customers" ? (l(), o(u, { key: 8 }, [
              s("div", QS, [
                s("div", FS, [
                  t[789] || (t[789] = s("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                  s("span", HS, a(M.value.inactive_customers.count), 1)
                ])
              ]),
              M.value.inactive_customers.rows.length ? (l(), o("table", zS, [
                t[790] || (t[790] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", null, "Last Invoice Date"),
                    s("th", { class: "ta-r" }, "Days Inactive"),
                    s("th", { class: "ta-r" }, "Lifetime Invoices"),
                    s("th", { class: "ta-r" }, "Lifetime Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(M.value.inactive_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.last_invoice_date), 1),
                    s("td", WS, a(e.days_inactive), 1),
                    s("td", US, a(e.invoice_count), 1),
                    s("td", KS, a(d(e.lifetime_revenue)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", GS, "No inactive customers found."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", YS, a(bo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "supplier_mis" ? (l(), o("div", JS, [
          s("div", ZS, [
            t[792] || (t[792] = x('<div class="bs-page-head-icon suppmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><rect x="1" y="3" width="15" height="13" data-v-42720c7a></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-42720c7a></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-42720c7a></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-42720c7a></circle></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Supplier MIS</div><div class="bs-page-head-sub" data-v-42720c7a>Supplier-wise purchase and outstanding, payment ageing, price comparison, delivery/supplier performance and quality/rejection for the period.</div></div>', 2)),
            s("div", XS, [
              s("div", sj, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", tj, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[202] || (t[202] = (e) => es("exportSupplierMisCSV")),
                  disabled: !$.value
                }, [...t[791] || (t[791] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, ej),
                f.value === "exportSupplierMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[203] || (t[203] = (e) => f.value = "")
                  }),
                  s("div", aj, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[204] || (t[204] = (e) => {
                        f.value = "", zo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[205] || (t[205] = (e) => {
                        f.value = "", Y(zo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", oj, [
            (l(), o(u, null, m(Zl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Hs.value === e.key }]),
              onClick: (g) => Hs.value = e.key
            }, a(e.label), 11, lj)), 64))
          ]),
          ca.value ? (l(), o("div", nj)) : $.value ? (l(), o(u, { key: 1 }, [
            Hs.value === "supplier_wise_purchase" ? (l(), o(u, { key: 0 }, [
              s("div", ij, [
                s("div", dj, [
                  t[793] || (t[793] = s("span", { class: "bucket-label" }, "Total Purchase", -1)),
                  s("span", rj, a(d($.value.supplier_wise_purchase.total)), 1)
                ])
              ]),
              $.value.supplier_wise_purchase.rows.length ? (l(), o("table", uj, [
                t[794] || (t[794] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Net Total"),
                    s("th", { class: "ta-r" }, "Discount"),
                    s("th", { class: "ta-r" }, "Tax"),
                    s("th", { class: "ta-r" }, "Total"),
                    s("th", { class: "ta-r" }, "Outstanding"),
                    s("th", { class: "ta-r" }, "Avg Invoice Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_wise_purchase.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", cj, a(e.invoice_count), 1),
                    s("td", mj, a(d(e.net_total)), 1),
                    s("td", vj, a(d(e.total_discount)), 1),
                    s("td", _j, a(d(e.total_tax)), 1),
                    s("td", pj, a(d(e.total_amount)), 1),
                    s("td", yj, a(d(e.outstanding_amount)), 1),
                    s("td", hj, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", bj, "No purchases in this period."))
            ], 64)) : Hs.value === "supplier_outstanding" ? (l(), o(u, { key: 1 }, [
              s("div", gj, [
                s("div", kj, [
                  t[795] || (t[795] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", wj, a(d($.value.supplier_outstanding.total)), 1)
                ])
              ]),
              $.value.supplier_outstanding.rows.length ? (l(), o("table", fj, [
                t[796] || (t[796] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Outstanding"),
                    s("th", { class: "ta-r" }, "Overdue Amount"),
                    s("th", { class: "ta-r" }, "Max Overdue Days")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_outstanding.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", xj, a(e.invoice_count), 1),
                    s("td", Cj, a(d(e.outstanding_amount)), 1),
                    s("td", Sj, a(d(e.overdue_amount)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jj, "No outstanding balances."))
            ], 64)) : Hs.value === "supplier_payment_ageing" ? (l(), o(u, { key: 2 }, [
              $.value.supplier_payment_ageing.rows.length ? (l(), o("table", Mj, [
                t[797] || (t[797] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Current"),
                    s("th", { class: "ta-r" }, "1-30"),
                    s("th", { class: "ta-r" }, "31-60"),
                    s("th", { class: "ta-r" }, "61-90"),
                    s("th", { class: "ta-r" }, "90+"),
                    s("th", { class: "ta-r" }, "Total")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_payment_ageing.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", Dj, a(d(e.current)), 1),
                    s("td", Tj, a(d(e.days_1_30)), 1),
                    s("td", Oj, a(d(e.days_31_60)), 1),
                    s("td", Rj, a(d(e.days_61_90)), 1),
                    s("td", Pj, a(d(e.days_90_plus)), 1),
                    s("td", Ij, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Vj, "No outstanding balances."))
            ], 64)) : Hs.value === "purchase_price_comparison" ? (l(), o(u, { key: 3 }, [
              s("div", Nj, a($.value.purchase_price_comparison.multi_supplier_item_count) + " item(s) were purchased from more than one supplier in this period. ", 1),
              $.value.purchase_price_comparison.rows.length ? (l(), o("table", Ej, [
                t[798] || (t[798] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Item"),
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Qty"),
                    s("th", { class: "ta-r" }, "Avg Rate"),
                    s("th", { class: "ta-r" }, "Vs Lowest"),
                    s("th", null, "Best Price")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.purchase_price_comparison.rows, (e, g) => (l(), o("tr", {
                    key: e.item_code + e.supplier
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", qj, a(e.qty), 1),
                    s("td", Bj, a(d(e.avg_rate)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.is_lowest ? "green" : "red"])
                    }, a(e.is_lowest ? "—" : "+" + Number(e.variance_vs_lowest_pct).toFixed(1) + "%"), 3),
                    s("td", null, [
                      e.is_lowest && e.supplier_count > 1 ? (l(), o("span", Aj, "Lowest")) : h("", !0)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", $j, "No purchases in this period."))
            ], 64)) : Hs.value === "supplier_performance" ? (l(), o(u, { key: 4 }, [
              $.value.supplier_performance.rows.length ? (l(), o("table", Lj, [
                t[799] || (t[799] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Purchase Amount"),
                    s("th", { class: "ta-r" }, "Outstanding"),
                    s("th", { class: "ta-r" }, "On-time Delivery %"),
                    s("th", { class: "ta-r" }, "Rejection %"),
                    s("th", { class: "ta-r" }, "Avg Price Variance %"),
                    s("th", { class: "ta-r" }, "Score")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_performance.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", Qj, a(d(e.total_purchase_amount)), 1),
                    s("td", Fj, a(d(e.outstanding_amount)), 1),
                    s("td", Hj, a(e.on_time_delivery_pct != null ? Number(e.on_time_delivery_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", zj, a(e.rejection_pct != null ? Number(e.rejection_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", Wj, a(e.avg_price_variance_pct != null ? Number(e.avg_price_variance_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score != null ? Number(e.performance_score).toFixed(0) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Uj, "No supplier activity in this period."))
            ], 64)) : Hs.value === "delivery_performance" ? (l(), o(u, { key: 5 }, [
              s("div", Kj, [
                s("div", Gj, [
                  t[800] || (t[800] = s("span", { class: "bucket-label" }, "On-time %", -1)),
                  s("span", Yj, a(Number($.value.delivery_performance.summary.on_time_pct).toFixed(1)) + "%", 1)
                ]),
                s("div", Jj, [
                  t[801] || (t[801] = s("span", { class: "bucket-label" }, "On-time", -1)),
                  s("span", Zj, a($.value.delivery_performance.summary.on_time_count), 1)
                ]),
                s("div", Xj, [
                  t[802] || (t[802] = s("span", { class: "bucket-label" }, "Late", -1)),
                  s("span", sM, a($.value.delivery_performance.summary.late_count), 1)
                ]),
                s("div", tM, [
                  t[803] || (t[803] = s("span", { class: "bucket-label" }, "No PO Reference", -1)),
                  s("span", eM, a($.value.delivery_performance.summary.undated_count), 1)
                ])
              ]),
              t[806] || (t[806] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.delivery_performance.by_supplier.length ? (l(), o("table", aM, [
                t[804] || (t[804] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Receipts"),
                    s("th", { class: "ta-r" }, "On-time"),
                    s("th", { class: "ta-r" }, "Late"),
                    s("th", { class: "ta-r" }, "On-time %"),
                    s("th", { class: "ta-r" }, "Avg Delay (days)")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.delivery_performance.by_supplier, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", oM, a(e.receipt_count), 1),
                    s("td", lM, a(e.on_time_count), 1),
                    s("td", nM, a(e.late_count), 1),
                    s("td", iM, a(Number(e.on_time_pct).toFixed(1)) + "%", 1),
                    s("td", dM, a(Number(e.avg_delay_days).toFixed(1)), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              t[807] || (t[807] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "Receipts", -1)),
              $.value.delivery_performance.rows.length ? (l(), o("table", rM, [
                t[805] || (t[805] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Receipt"),
                    s("th", null, "Supplier"),
                    s("th", null, "Received Date"),
                    s("th", null, "Expected Date"),
                    s("th", { class: "ta-r" }, "Delay (days)"),
                    s("th", null, "Status")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.delivery_performance.rows, (e) => (l(), o("tr", {
                    key: e.receipt
                  }, [
                    s("td", null, a(e.receipt), 1),
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", null, a(e.received_date), 1),
                    s("td", null, a(e.expected_date || "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.has_reference && !e.on_time ? "red" : ""])
                    }, a(e.has_reference ? e.delay_days : "—"), 3),
                    s("td", {
                      class: c(e.has_reference ? e.on_time ? "green" : "red" : "")
                    }, a(e.has_reference ? e.on_time ? "On-time" : "Late" : "No PO Ref"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", uM, "No receipts in this period."))
            ], 64)) : Hs.value === "quality_rejection" ? (l(), o(u, { key: 6 }, [
              s("div", cM, [
                s("div", mM, [
                  t[808] || (t[808] = s("span", { class: "bucket-label" }, "Received Qty", -1)),
                  s("span", vM, a($.value.quality_rejection.summary.total_received_qty), 1)
                ]),
                s("div", _M, [
                  t[809] || (t[809] = s("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  s("span", pM, a($.value.quality_rejection.summary.total_rejected_qty), 1)
                ]),
                s("div", yM, [
                  t[810] || (t[810] = s("span", { class: "bucket-label" }, "Rejection %", -1)),
                  s("span", hM, a(Number($.value.quality_rejection.summary.overall_rejection_pct).toFixed(2)) + "%", 1)
                ])
              ]),
              t[813] || (t[813] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.quality_rejection.by_supplier.length ? (l(), o("table", bM, [
                t[811] || (t[811] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", { class: "ta-r" }, "Received Qty"),
                    s("th", { class: "ta-r" }, "Accepted Qty"),
                    s("th", { class: "ta-r" }, "Rejected Qty"),
                    s("th", { class: "ta-r" }, "Rejection %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.quality_rejection.by_supplier, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", gM, a(e.received_qty), 1),
                    s("td", kM, a(e.accepted_qty), 1),
                    s("td", wM, a(e.rejected_qty), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : h("", !0),
              t[814] || (t[814] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Item", -1)),
              $.value.quality_rejection.rows.length ? (l(), o("table", fM, [
                t[812] || (t[812] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Supplier"),
                    s("th", null, "Item"),
                    s("th", { class: "ta-r" }, "Received Qty"),
                    s("th", { class: "ta-r" }, "Accepted Qty"),
                    s("th", { class: "ta-r" }, "Rejected Qty"),
                    s("th", { class: "ta-r" }, "Rejection %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m($.value.quality_rejection.rows, (e, g) => (l(), o("tr", {
                    key: e.supplier + e.item_code + g
                  }, [
                    s("td", null, a(e.supplier_name || e.supplier), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", xM, a(e.received_qty), 1),
                    s("td", CM, a(e.accepted_qty), 1),
                    s("td", SM, a(e.rejected_qty), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jM, "No receipts in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", MM, a(go.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "employee_mis" ? (l(), o("div", DM, [
          s("div", TM, [
            t[816] || (t[816] = x('<div class="bs-page-head-icon empmis-page-head-icon" data-v-42720c7a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-42720c7a></path><circle cx="9" cy="7" r="4" data-v-42720c7a></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-42720c7a></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-42720c7a></path></svg></div><div class="bs-page-head-text" data-v-42720c7a><div class="bs-page-head-title" data-v-42720c7a>Employee / Performance MIS</div><div class="bs-page-head-sub" data-v-42720c7a>This app has no HR/Payroll module — figures below are built from Job Card time logs and Sales Person records, so they only cover employees who had time logged or are set up as a Sales Person.</div></div>', 2)),
            s("div", OM, [
              s("div", RM, a(P(C.value)) + " - " + a(P(y.value)), 1),
              s("div", PM, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[206] || (t[206] = (e) => es("exportEmployeeMisCSV")),
                  disabled: !L.value
                }, [...t[815] || (t[815] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-42720c7a></path><polyline points="7 10 12 15 17 10" data-v-42720c7a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-42720c7a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-42720c7a><polyline points="6 9 12 15 18 9" data-v-42720c7a></polyline></svg>', 3)
                ])], 8, IM),
                f.value === "exportEmployeeMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[207] || (t[207] = (e) => f.value = "")
                  }),
                  s("div", VM, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[208] || (t[208] = (e) => {
                        f.value = "", Wo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[209] || (t[209] = (e) => {
                        f.value = "", Y(Wo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          s("div", NM, [
            (l(), o(u, null, m(Xl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Vs.value === e.key }]),
              onClick: (g) => Vs.value = e.key
            }, a(e.label), 11, EM)), 64))
          ]),
          ma.value ? (l(), o("div", qM)) : L.value ? (l(), o(u, { key: 1 }, [
            Vs.value === "employee_attendance" ? (l(), o(u, { key: 0 }, [
              s("div", BM, ' Proxy: a day counts as "present" if the employee has any Job Card time log on that date. ' + a(L.value.period_days) + "-day period. ", 1),
              L.value.employee_attendance.rows.length ? (l(), o("table", AM, [
                t[817] || (t[817] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Employee"),
                    s("th", { class: "ta-r" }, "Present Days"),
                    s("th", { class: "ta-r" }, "Attendance %"),
                    s("th", { class: "ta-r" }, "Total Hours"),
                    s("th", { class: "ta-r" }, "Avg Hrs/Day")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.employee_attendance.rows, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    s("td", null, a(e.employee), 1),
                    s("td", $M, a(e.present_days) + " / " + a(e.period_days), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.attendance_pct >= 80 ? "green" : "red"])
                    }, a(e.attendance_pct) + "%", 3),
                    s("td", LM, a(e.total_hours), 1),
                    s("td", QM, a(e.avg_hours_per_day), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", FM, "No Job Card time logs in this period."))
            ], 64)) : Vs.value === "department_manpower" ? (l(), o(u, { key: 1 }, [
              t[820] || (t[820] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Sales Person is the only doctype in this app with a department field, so this reflects active Sales Persons only. ", -1)),
              s("div", HM, [
                s("div", zM, [
                  t[818] || (t[818] = s("span", { class: "bucket-label" }, "Total Headcount", -1)),
                  s("span", WM, a(L.value.department_manpower.total_headcount), 1)
                ])
              ]),
              L.value.department_manpower.rows.length ? (l(), o("table", UM, [
                t[819] || (t[819] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Department"),
                    s("th", { class: "ta-r" }, "Headcount"),
                    s("th", null, "Employees")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.department_manpower.rows, (e) => (l(), o("tr", {
                    key: e.department
                  }, [
                    s("td", null, a(e.department), 1),
                    s("td", KM, a(e.headcount), 1),
                    s("td", GM, a(e.employees.map((g) => g.sales_person_name).join(", ")), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", YM, "No active Sales Persons set up."))
            ], 64)) : Vs.value === "salesperson_target" ? (l(), o(u, { key: 2 }, [
              t[824] || (t[824] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No target is stored — enter a target per salesperson to compare against actual sales for this period. ", -1)),
              s("div", JM, [
                s("div", ZM, [
                  t[821] || (t[821] = s("span", { class: "bucket-label" }, "Total Achieved", -1)),
                  s("span", XM, a(d(L.value.salesperson_achievement.total_achieved)), 1)
                ]),
                s("div", sD, [
                  t[822] || (t[822] = s("span", { class: "bucket-label" }, "Sales with No Salesperson", -1)),
                  s("span", tD, a(d(L.value.salesperson_achievement.unassigned_sales)), 1)
                ])
              ]),
              L.value.salesperson_achievement.rows.length ? (l(), o("table", eD, [
                t[823] || (t[823] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Salesperson"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Achieved"),
                    s("th", { class: "ta-r" }, "Target (KES)"),
                    s("th", { class: "ta-r" }, "Achievement %")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.salesperson_achievement.rows, (e) => (l(), o("tr", {
                    key: e.sales_person
                  }, [
                    s("td", null, a(e.sales_person_name || e.sales_person), 1),
                    s("td", aD, a(e.invoice_count), 1),
                    s("td", oD, a(d(e.total_amount)), 1),
                    s("td", lD, [
                      Es(s("input", {
                        type: "number",
                        "onUpdate:modelValue": (g) => Wt.value[e.sales_person] = g,
                        class: "dr-input",
                        style: { width: "110px", "text-align": "right" },
                        min: "0"
                      }, null, 8, nD), [
                        [
                          Ks,
                          Wt.value[e.sales_person],
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", va(e) >= 100 ? "green" : "red"])
                    }, a(Wt.value[e.sales_person] ? va(e).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", iD, "No sales attributed to a salesperson in this period."))
            ], 64)) : Vs.value === "salesperson_collection" ? (l(), o(u, { key: 3 }, [
              s("div", dD, [
                s("div", rD, [
                  t[825] || (t[825] = s("span", { class: "bucket-label" }, "Total Collected", -1)),
                  s("span", uD, a(d(L.value.salesperson_collection.total_collected)), 1)
                ])
              ]),
              L.value.salesperson_collection.rows.length ? (l(), o("table", cD, [
                t[826] || (t[826] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Salesperson"),
                    s("th", { class: "ta-r" }, "Payments"),
                    s("th", { class: "ta-r" }, "Collected Amount")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.salesperson_collection.rows, (e) => (l(), o("tr", {
                    key: e.sales_person
                  }, [
                    s("td", null, a(e.sales_person_name || e.sales_person), 1),
                    s("td", mD, a(e.payment_count), 1),
                    s("td", vD, a(d(e.collected_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _D, "No collections attributed to a salesperson in this period."))
            ], 64)) : Vs.value === "production_productivity" ? (l(), o(u, { key: 4 }, [
              s("div", pD, [
                s("div", yD, [
                  t[827] || (t[827] = s("span", { class: "bucket-label" }, "Team Avg Qty/Hour", -1)),
                  s("span", hD, a(L.value.production_productivity.team_avg_qty_per_hour), 1)
                ])
              ]),
              L.value.production_productivity.rows.length ? (l(), o("table", bD, [
                t[828] || (t[828] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Employee"),
                    s("th", { class: "ta-r" }, "Job Cards"),
                    s("th", { class: "ta-r" }, "Hours"),
                    s("th", { class: "ta-r" }, "Qty Produced"),
                    s("th", { class: "ta-r" }, "Avg Time/Unit (min)"),
                    s("th", { class: "ta-r" }, "Qty/Hour")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.production_productivity.rows, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    s("td", null, a(e.employee), 1),
                    s("td", gD, a(e.job_card_count), 1),
                    s("td", kD, a(e.total_hours), 1),
                    s("td", wD, a(e.qty_produced), 1),
                    s("td", fD, a(e.avg_time_per_unit_mins ?? "—"), 1),
                    s("td", xD, a(e.qty_per_hour ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", CD, "No Job Card time logs in this period."))
            ], 64)) : Vs.value === "overtime" ? (l(), o(u, { key: 5 }, [
              t[830] || (t[830] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged time beyond 8 hours (480 min) in a day, from Job Card time logs. No shift doctype exists to read an actual shift length from. ", -1)),
              L.value.overtime.summary.length ? (l(), o("table", SD, [
                t[829] || (t[829] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Employee"),
                    s("th", { class: "ta-r" }, "Overtime Days"),
                    s("th", { class: "ta-r" }, "Overtime Hours")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.overtime.summary, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    s("td", null, a(e.employee), 1),
                    s("td", jD, a(e.overtime_days), 1),
                    s("td", MD, a(e.overtime_hours), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", DD, "No overtime in this period."))
            ], 64)) : Vs.value === "labour_cost" ? (l(), o(u, { key: 6 }, [
              t[834] || (t[834] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged hours × the Workstation's hour rate on each Job Card — there's no per-employee wage field in this app, so this is a cost-of-time figure, not real payroll cost. ", -1)),
              s("div", TD, [
                s("div", OD, [
                  t[831] || (t[831] = s("span", { class: "bucket-label" }, "Total Labour Cost", -1)),
                  s("span", RD, a(d(L.value.labour_cost.total)), 1)
                ])
              ]),
              t[835] || (t[835] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Employee", -1)),
              L.value.labour_cost.by_employee.length ? (l(), o("table", PD, [
                t[832] || (t[832] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Employee"),
                    s("th", { class: "ta-r" }, "Hours"),
                    s("th", { class: "ta-r" }, "Cost")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.labour_cost.by_employee, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    s("td", null, a(e.employee), 1),
                    s("td", ID, a(e.total_hours), 1),
                    s("td", VD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              t[836] || (t[836] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Operation", -1)),
              L.value.labour_cost.by_operation.length ? (l(), o("table", ND, [
                t[833] || (t[833] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Operation"),
                    s("th", { class: "ta-r" }, "Employees"),
                    s("th", { class: "ta-r" }, "Hours"),
                    s("th", { class: "ta-r" }, "Cost")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.labour_cost.by_operation, (e) => (l(), o("tr", {
                    key: e.operation
                  }, [
                    s("td", null, a(e.operation), 1),
                    s("td", ED, a(e.employee_count), 1),
                    s("td", qD, a(e.total_hours), 1),
                    s("td", BD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", AD, "No Job Card time logs in this period."))
            ], 64)) : Vs.value === "employee_performance" ? (l(), o(u, { key: 7 }, [
              t[838] || (t[838] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Composite score = average of attendance %, output rate vs the team average (capped at 150%), and (100 − rejection %) — whichever of these apply to the employee. ", -1)),
              L.value.employee_performance.rows.length ? (l(), o("table", $D, [
                t[837] || (t[837] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Employee"),
                    s("th", { class: "ta-r" }, "Hours"),
                    s("th", { class: "ta-r" }, "Qty Produced"),
                    s("th", { class: "ta-r" }, "Qty/Hour"),
                    s("th", { class: "ta-r" }, "Rejection %"),
                    s("th", { class: "ta-r" }, "Attendance %"),
                    s("th", { class: "ta-r" }, "Overtime Hrs"),
                    s("th", { class: "ta-r" }, "Score")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(L.value.employee_performance.rows, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    s("td", null, a(e.employee), 1),
                    s("td", LD, a(e.total_hours), 1),
                    s("td", QD, a(e.qty_produced), 1),
                    s("td", FD, a(e.qty_per_hour ?? "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.rejection_pct > 0 ? "red" : ""])
                    }, a(e.rejection_pct != null ? e.rejection_pct + "%" : "—"), 3),
                    s("td", HD, a(e.attendance_pct != null ? e.attendance_pct + "%" : "—"), 1),
                    s("td", zD, a(e.overtime_hours), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", WD, "No Job Card time logs in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", UD, a(ko.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0)
      ]);
    };
  }
}, JD = /* @__PURE__ */ xn(KD, [["__scopeId", "data-v-42720c7a"]]);
export {
  JD as default
};
