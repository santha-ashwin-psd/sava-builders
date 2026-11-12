import { _ as yn, h as v, y as Go, c as o, W as x, a as s, F as u, r as m, u as f, w as Hs, A as ot, b as y, t as a, v as Yo, d as os, n as c, p as qs, D as hn, E as gn, a6 as kn, e as fn, l as K, g as N, k as l, q as wn } from "./main-DU_9tUQf.js";
import { a as xn, u as le } from "./useFrappe-B9R_l4ST.js";
const Nt = new TextEncoder(), Cn = (() => {
  const F = new Uint32Array(256);
  for (let S = 0; S < 256; S++) {
    let d = S;
    for (let _ = 0; _ < 8; _++) d = d & 1 ? 3988292384 ^ d >>> 1 : d >>> 1;
    F[S] = d >>> 0;
  }
  return F;
})();
function Sn(F) {
  let S = 4294967295;
  for (let d = 0; d < F.length; d++) S = Cn[(S ^ F[d]) & 255] ^ S >>> 8;
  return (S ^ 4294967295) >>> 0;
}
const ts = (F) => [F & 255, F >>> 8 & 255], fs = (F) => [F & 255, F >>> 8 & 255, F >>> 16 & 255, F >>> 24 & 255];
function jn(F) {
  const S = [], d = [];
  let _ = 0;
  for (const C of F) {
    const b = Nt.encode(C.name), k = Sn(C.data), Bs = C.data.length, ws = new Uint8Array([
      ...fs(67324752),
      ...ts(20),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(33),
      ...fs(k),
      ...fs(Bs),
      ...fs(Bs),
      ...ts(b.length),
      ...ts(0)
    ]);
    S.push(ws, b, C.data), d.push({ name: b, crc: k, size: Bs, offset: _ }), _ += ws.length + b.length + Bs;
  }
  const z = _;
  let G = 0;
  for (const C of d) {
    const b = new Uint8Array([
      ...fs(33639248),
      ...ts(20),
      ...ts(20),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(33),
      ...fs(C.crc),
      ...fs(C.size),
      ...fs(C.size),
      ...ts(C.name.length),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...fs(0),
      ...fs(C.offset)
    ]);
    S.push(b, C.name), G += b.length + C.name.length;
  }
  const ls = new Uint8Array([
    ...fs(101010256),
    ...ts(0),
    ...ts(0),
    ...ts(d.length),
    ...ts(d.length),
    ...fs(G),
    ...fs(z),
    ...ts(0)
  ]);
  return S.push(ls), new Blob(S, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
function Jo(F) {
  return String(F).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function Mn(F) {
  let S = "";
  for (F += 1; F > 0; ) {
    const d = (F - 1) % 26;
    S = String.fromCharCode(65 + d) + S, F = Math.floor((F - 1) / 26);
  }
  return S;
}
function Dn(F, S) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${[F, ...S].map((z, G) => {
    const ls = z.map((C, b) => {
      const k = Mn(b) + (G + 1);
      return G === 0 ? `<c r="${k}" s="1" t="inlineStr"><is><t xml:space="preserve">${Jo(C ?? "")}</t></is></c>` : typeof C == "number" && isFinite(C) ? `<c r="${k}" s="2"><v>${C}</v></c>` : `<c r="${k}" t="inlineStr"><is><t xml:space="preserve">${Jo(C ?? "")}</t></is></c>`;
    }).join("");
    return `<row r="${G + 1}">${ls}</row>`;
  }).join("")}</sheetData></worksheet>`;
}
const Tn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs></styleSheet>', On = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>', Rn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>', Pn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Report" sheetId="1" r:id="rId1"/></sheets></workbook>', In = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
function Zo(F, S, d) {
  const _ = [
    { name: "[Content_Types].xml", data: Nt.encode(On) },
    { name: "_rels/.rels", data: Nt.encode(Rn) },
    { name: "xl/workbook.xml", data: Nt.encode(Pn) },
    { name: "xl/_rels/workbook.xml.rels", data: Nt.encode(In) },
    { name: "xl/styles.xml", data: Nt.encode(Tn) },
    { name: "xl/worksheets/sheet1.xml", data: Nt.encode(Dn(S, d)) }
  ], z = jn(_), G = URL.createObjectURL(z), ls = document.createElement("a");
  ls.href = G, ls.download = F, ls.click(), URL.revokeObjectURL(G);
}
function Vn(F) {
  const S = [];
  let d = [], _ = "", z = !1;
  for (let G = 0; G < F.length; G++) {
    const ls = F[G];
    z ? ls === '"' ? F[G + 1] === '"' ? (_ += '"', G++) : z = !1 : _ += ls : ls === '"' ? z = !0 : ls === "," ? (d.push(_), _ = "") : ls === `
` || ls === "\r" ? (ls === "\r" && F[G + 1] === `
` && G++, d.push(_), S.push(d), d = [], _ = "") : _ += ls;
  }
  return (_ !== "" || d.length) && (d.push(_), S.push(d)), S.filter((G) => !(G.length === 1 && G[0] === "")).map((G) => G.map(Nn));
}
function Nn(F) {
  const S = F.trim();
  return /^-?(0|[1-9]\d{0,2}(,\d{3})+|[1-9]\d*)(\.\d+)?$/.test(S) ? Number(S.replace(/,/g, "")) : F;
}
const En = { class: "page-reports" }, qn = { class: "report-grid" }, Bn = ["onClick"], An = ["innerHTML"], $n = { class: "report-card-label" }, Ln = { class: "books-card date-range-bar" }, Qn = {
  key: 0,
  class: "books-card report-card bs-card"
}, Fn = { class: "bs-page-head" }, zn = { class: "bs-page-head-text" }, Hn = { class: "bs-page-head-title" }, Wn = { class: "bs-page-head-sub" }, Un = { class: "bs-page-head-actions" }, Kn = ["value"], Gn = { class: "iws-export-wrap" }, Yn = ["disabled"], Jn = { class: "iws-menu" }, Zn = {
  key: 0,
  class: "empty-msg"
}, Xn = {
  key: 1,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, si = {
  key: 2,
  class: "empty-msg"
}, ti = {
  key: 3,
  class: "iws-body"
}, ei = { class: "iws-table-wrap iws-cards-wrap" }, ai = { class: "iws-table iws-cards" }, oi = ["data-label"], li = {
  key: 4,
  class: "empty-msg"
}, ni = {
  key: 1,
  class: "pl-dash"
}, ii = { class: "pl-dash-header" }, di = { class: "pl-dash-range" }, ri = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, ui = { class: "pl-kpi-grid" }, ci = { class: "pl-kpi c-emerald" }, mi = { class: "pl-kpi-val green" }, vi = {
  key: 0,
  class: "pl-kpi c-pink"
}, _i = { class: "pl-kpi-val red" }, pi = {
  key: 1,
  class: "pl-kpi c-amber"
}, bi = { class: "pl-kpi c-violet" }, yi = { class: "pl-kpi-val red" }, hi = {
  key: 2,
  class: "pl-kpi c-blue"
}, gi = {
  key: 0,
  class: "pl-trend-card"
}, ki = { class: "pl-trend-header" }, fi = { class: "pl-trend-toggle" }, wi = { class: "pl-trend-body" }, xi = { class: "pl-trend-chart-wrap" }, Ci = { class: "pl-trend-yaxis" }, Si = { class: "pl-trend-chart" }, ji = { class: "pl-trend-bars" }, Mi = ["title"], Di = ["title"], Ti = { class: "pl-trend-month" }, Oi = { class: "pl-insights" }, Ri = { class: "pl-insight-title" }, Pi = { class: "pl-insight-desc" }, Ii = {
  key: 2,
  class: "empty-msg"
}, Vi = {
  key: 2,
  class: "books-card report-card bs-card"
}, Ni = { class: "bs-page-head" }, Ei = { class: "bs-page-head-actions" }, qi = { class: "bs-asof" }, Bi = { class: "iws-export-wrap" }, Ai = ["disabled"], $i = { class: "iws-menu" }, Li = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Qi = { class: "bs-kpi-row" }, Fi = { class: "bs-kpi bs-kpi-assets" }, zi = { class: "bs-kpi-body" }, Hi = { class: "bs-kpi-amount" }, Wi = { class: "bs-kpi bs-kpi-liabilities" }, Ui = { class: "bs-kpi-body" }, Ki = { class: "bs-kpi-amount" }, Gi = { class: "bs-kpi bs-kpi-equity" }, Yi = { class: "bs-kpi-body" }, Ji = { class: "bs-kpi-amount" }, Zi = { class: "bs-sum-status-icon" }, Xi = { class: "bs-sum-status-body" }, sd = { class: "bs-sum-status-title" }, td = { class: "bs-sum-status-eq" }, ed = { class: "bs-acc" }, ad = ["onClick"], od = ["innerHTML"], ld = { class: "bs-acc-head-text" }, nd = { class: "bs-acc-label" }, id = { class: "bs-acc-desc" }, dd = { class: "bs-acc-amount" }, rd = {
  key: 0,
  class: "bs-acc-items"
}, ud = ["innerHTML"], cd = { class: "bs-acc-item-text" }, md = { class: "bs-acc-item-label" }, vd = {
  key: 0,
  class: "bs-acc-item-desc"
}, _d = { class: "bs-acc-item-amount" }, pd = {
  key: 2,
  class: "empty-msg"
}, bd = {
  key: 3,
  class: "books-card report-card bs-card"
}, yd = { class: "bs-page-head" }, hd = { class: "bs-page-head-actions" }, gd = { class: "bs-asof" }, kd = { class: "iws-export-wrap" }, fd = ["disabled"], wd = { class: "iws-menu" }, xd = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Cd = {
  key: 1,
  class: "cf-grid"
}, Sd = { class: "cf-acc" }, jd = { class: "cf-acc-row cf-row-operating" }, Md = { class: "cf-acc-row cf-row-investing" }, Dd = { class: "cf-acc-row cf-row-financing" }, Td = { class: "cf-acc-row cf-row-net" }, Od = { class: "cf-acc-text" }, Rd = { class: "cf-acc-desc" }, Pd = { class: "cf-flow-row" }, Id = { class: "cf-flow-row" }, Vd = { class: "cf-side" }, Nd = { class: "cf-trend-box" }, Ed = {
  key: 0,
  class: "cf-trend-chart"
}, qd = ["title"], Bd = ["title"], Ad = ["title"], $d = { class: "cf-trend-month" }, Ld = {
  key: 1,
  class: "empty-msg",
  style: { padding: "20px 0" }
}, Qd = { class: "cf-summary-box" }, Fd = { class: "cf-summary-text" }, zd = {
  key: 2,
  class: "empty-msg"
}, Hd = {
  key: 4,
  class: "books-card report-card bs-card"
}, Wd = { class: "bs-page-head" }, Ud = { class: "bs-page-head-actions" }, Kd = { class: "bs-asof" }, Gd = { class: "iws-export-wrap" }, Yd = ["disabled"], Jd = { class: "iws-menu" }, Zd = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "80px", "border-radius": "8px" }
}, Xd = {
  key: 1,
  class: "gst-cards"
}, sr = { class: "gst-card-head" }, tr = { class: "gst-card-title" }, er = { class: "gst-card-desc" }, ar = { class: "gst-card-stats" }, or = { class: "gst-stat-value" }, lr = { class: "gst-stat-value" }, nr = { class: "gst-card gst-c-total" }, ir = { class: "gst-card-stats" }, dr = { class: "gst-stat-value" }, rr = { class: "gst-stat-value" }, ur = {
  key: 2,
  class: "empty-msg"
}, cr = {
  key: 5,
  class: "books-card report-card bs-card"
}, mr = { class: "bs-page-head" }, vr = { class: "bs-page-head-actions" }, _r = { class: "bs-asof" }, pr = { class: "iws-export-wrap" }, br = ["disabled"], yr = { class: "iws-menu" }, hr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, gr = {
  key: 1,
  class: "iws-body"
}, kr = { class: "iws-total-panel iws-total-panel-neg" }, fr = { class: "iws-total-meta" }, wr = {
  key: 0,
  class: "iws-total-sub"
}, xr = { class: "iws-total-sub-value" }, Cr = { class: "iws-table-wrap" }, Sr = { class: "iws-table" }, jr = { class: "iws-idx" }, Mr = { class: "iws-item-name" }, Dr = { class: "ta-r mono-sm" }, Tr = { class: "ta-r mono-sm fw-700 text-danger" }, Or = { class: "iws-kebab-col" }, Rr = { class: "iws-kebab-wrap" }, Pr = ["onClick"], Ir = { class: "iws-menu iws-menu-row" }, Vr = ["onClick"], Nr = ["onClick"], Er = { class: "iws-total-row" }, qr = { class: "ta-r fw-700" }, Br = { class: "ta-r fw-700" }, Ar = { class: "ta-r fw-700" }, $r = { class: "ta-r fw-700" }, Lr = { class: "ta-r fw-700 text-danger" }, Qr = { class: "ta-r fw-700 text-danger" }, Fr = {
  key: 2,
  class: "empty-msg"
}, zr = {
  key: 6,
  class: "books-card report-card bs-card"
}, Hr = { class: "bs-page-head" }, Wr = { class: "bs-page-head-actions" }, Ur = { class: "bs-asof" }, Kr = { class: "iws-export-wrap" }, Gr = ["disabled"], Yr = { class: "iws-menu" }, Jr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Zr = {
  key: 1,
  class: "iws-body"
}, Xr = { class: "iws-total-panel iws-total-panel-neg" }, su = { class: "iws-total-meta" }, tu = {
  key: 0,
  class: "iws-total-sub"
}, eu = { class: "iws-total-sub-value" }, au = { class: "iws-table-wrap" }, ou = { class: "iws-table" }, lu = { class: "iws-idx" }, nu = { class: "iws-item-name" }, iu = { class: "ta-r mono-sm" }, du = { class: "ta-r mono-sm fw-700 text-danger" }, ru = { class: "iws-kebab-col" }, uu = { class: "iws-kebab-wrap" }, cu = ["onClick"], mu = { class: "iws-menu iws-menu-row" }, vu = ["onClick"], _u = ["onClick"], pu = { class: "iws-total-row" }, bu = { class: "ta-r fw-700" }, yu = { class: "ta-r fw-700" }, hu = { class: "ta-r fw-700" }, gu = { class: "ta-r fw-700" }, ku = { class: "ta-r fw-700 text-danger" }, fu = { class: "ta-r fw-700 text-danger" }, wu = {
  key: 2,
  class: "empty-msg"
}, xu = {
  key: 7,
  class: "books-card report-card bs-card"
}, Cu = { class: "bs-page-head" }, Su = { class: "bs-page-head-actions" }, ju = { class: "bs-asof" }, Mu = { class: "iws-export-wrap" }, Du = ["disabled"], Tu = { class: "iws-menu" }, Ou = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Ru = {
  key: 1,
  class: "iws-body"
}, Pu = { class: "iws-total-panel" }, Iu = { class: "iws-total-meta" }, Vu = { class: "iws-table-wrap" }, Nu = { class: "iws-table" }, Eu = { class: "iws-idx" }, qu = { class: "iws-item-name" }, Bu = { class: "iws-uom" }, Au = { class: "ta-r mono-sm" }, $u = { class: "ta-r mono-sm" }, Lu = { class: "ta-r mono-sm" }, Qu = { class: "ta-r mono-sm red" }, Fu = { class: "ta-r mono-sm fw-700 green" }, zu = { class: "iws-kebab-col" }, Hu = { class: "iws-kebab-wrap" }, Wu = ["onClick"], Uu = { class: "iws-menu iws-menu-row" }, Ku = ["onClick"], Gu = ["onClick"], Yu = { class: "iws-total-row" }, Ju = { class: "ta-r fw-700" }, Zu = { class: "ta-r fw-700" }, Xu = { class: "ta-r fw-700 red" }, sc = { class: "ta-r fw-700 green" }, tc = {
  key: 2,
  class: "empty-msg"
}, ec = {
  key: 8,
  class: "books-card report-card bs-card"
}, ac = { class: "bs-page-head" }, oc = { class: "bs-page-head-actions" }, lc = { class: "bs-asof" }, nc = { class: "iws-export-wrap" }, ic = ["disabled"], dc = { class: "iws-menu" }, rc = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, uc = {
  key: 1,
  class: "iws-body"
}, cc = { class: "iws-total-panel" }, mc = { class: "iws-total-meta" }, vc = {
  key: 0,
  class: "iws-total-sub"
}, _c = { class: "iws-total-sub-value" }, pc = { class: "iws-table-wrap" }, bc = { class: "iws-table" }, yc = { class: "iws-idx" }, hc = { class: "iws-item-name" }, gc = { class: "ta-r mono-sm" }, kc = { class: "ta-r mono-sm" }, fc = { class: "ta-r mono-sm red" }, wc = { class: "ta-r mono-sm" }, xc = { class: "ta-r mono-sm" }, Cc = { class: "ta-r mono-sm fw-700 green" }, Sc = { class: "iws-kebab-col" }, jc = { class: "iws-kebab-wrap" }, Mc = ["onClick"], Dc = { class: "iws-menu iws-menu-row" }, Tc = ["onClick"], Oc = ["onClick"], Rc = { class: "iws-total-row" }, Pc = { class: "ta-r fw-700" }, Ic = { class: "ta-r fw-700" }, Vc = { class: "ta-r fw-700 red" }, Nc = { class: "ta-r fw-700" }, Ec = { class: "ta-r fw-700 red" }, qc = { class: "ta-r fw-700 green" }, Bc = {
  key: 2,
  class: "empty-msg"
}, Ac = {
  key: 9,
  class: "books-card report-card bs-card"
}, $c = { class: "bs-page-head" }, Lc = { class: "bs-page-head-actions" }, Qc = { class: "bs-asof" }, Fc = { class: "iws-export-wrap" }, zc = ["disabled"], Hc = { class: "iws-menu" }, Wc = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Uc = { class: "iws-body" }, Kc = { class: "iws-total-meta" }, Gc = {
  key: 0,
  class: "iws-total-sub"
}, Yc = { class: "iws-total-sub-value" }, Jc = { class: "iws-table-wrap" }, Zc = { class: "iws-table" }, Xc = { class: "iws-idx" }, sm = { class: "iws-item-name" }, tm = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "No valuation or standard buying rate found for this item — margin below is not meaningful"
}, em = { class: "ta-r mono-sm" }, am = { class: "ta-r mono-sm" }, om = { class: "ta-r mono-sm" }, lm = { class: "ta-r mono-sm red" }, nm = { class: "iws-kebab-col" }, im = { class: "iws-kebab-wrap" }, dm = ["onClick"], rm = { class: "iws-menu iws-menu-row" }, um = ["onClick"], cm = ["onClick"], mm = { class: "iws-total-row" }, vm = { class: "ta-r fw-700" }, _m = { class: "ta-r fw-700" }, pm = { class: "ta-r fw-700 red" }, bm = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-top": "10px" }
}, ym = {
  key: 2,
  class: "empty-msg"
}, hm = {
  key: 10,
  class: "books-card report-card bs-card"
}, gm = { class: "bs-page-head" }, km = { class: "bs-page-head-actions" }, fm = { class: "bs-asof" }, wm = { class: "iws-export-wrap" }, xm = ["disabled"], Cm = { class: "iws-menu" }, Sm = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, jm = {
  key: 1,
  class: "iws-body"
}, Mm = { class: "iws-total-meta" }, Dm = {
  key: 0,
  class: "iws-total-sub"
}, Tm = { class: "iws-total-sub-label" }, Om = { style: { "font-size": "11px", color: "var(--text-3)", "margin-top": "4px" } }, Rm = { class: "iws-table-wrap" }, Pm = { class: "iws-table" }, Im = { class: "iws-idx" }, Vm = ["checked"], Nm = { class: "iws-idx" }, Em = ["checked", "onChange"], qm = { class: "mono-sm" }, Bm = ["onClick"], Am = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "One or more items on this invoice have no valuation or standard buying rate — cost/margin is understated"
}, $m = { class: "mono-sm" }, Lm = { class: "iws-item-name" }, Qm = { class: "ta-r mono-sm" }, Fm = { class: "ta-r mono-sm red" }, zm = { class: "iws-kebab-col" }, Hm = { class: "iws-kebab-wrap" }, Wm = ["onClick"], Um = { class: "iws-menu iws-menu-row" }, Km = ["onClick"], Gm = ["onClick"], Ym = ["onClick"], Jm = { class: "iws-total-row" }, Zm = { class: "ta-r fw-700" }, Xm = { class: "ta-r fw-700 red" }, sv = {
  key: 2,
  class: "empty-msg"
}, tv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "180px", "border-radius": "8px" }
}, ev = { style: { display: "flex", "flex-wrap": "wrap", gap: "16px", "font-size": "12.5px", color: "#868E96", "margin-bottom": "14px" } }, av = { style: { color: "#212529" } }, ov = { style: { color: "#212529" } }, lv = { style: { color: "#212529" } }, nv = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" }
}, iv = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, dv = { class: "ta-r mono-sm" }, rv = { class: "ta-r mono-sm" }, uv = { class: "ta-r mono-sm" }, cv = { class: "ta-r mono-sm" }, mv = { class: "ta-r mono-sm red" }, vv = { class: "aging-totals-row" }, _v = { class: "ta-r fw-700" }, pv = { class: "ta-r fw-700 red" }, bv = {
  key: 2,
  class: "empty-msg"
}, yv = {
  key: 11,
  class: "books-card report-card bs-card"
}, hv = { class: "bs-page-head" }, gv = { class: "bs-page-head-actions" }, kv = { class: "bs-asof" }, fv = { class: "iws-export-wrap" }, wv = ["disabled"], xv = { class: "iws-menu" }, Cv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Sv = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(2, 1fr)", "margin-bottom": "14px" }
}, jv = { class: "bs-kpi bs-kpi-assets" }, Mv = { class: "bs-kpi-body" }, Dv = { class: "bs-kpi-amount" }, Tv = { class: "bs-kpi bs-kpi-liabilities" }, Ov = { class: "bs-kpi-body" }, Rv = { class: "bs-kpi-amount" }, Pv = { class: "bs-sum-status-icon" }, Iv = { class: "bs-sum-status-body" }, Vv = { class: "bs-sum-status-title" }, Nv = { class: "bs-sum-status-eq" }, Ev = {
  class: "iws-table-wrap",
  style: { "margin-top": "14px" }
}, qv = { class: "iws-table" }, Bv = { class: "iws-idx" }, Av = { class: "iws-item-name" }, $v = {
  class: "iws-uom",
  style: { background: "#f1f5f9", color: "#475569" }
}, Lv = { class: "ta-r mono-sm green" }, Qv = { class: "ta-r mono-sm red" }, Fv = { class: "iws-kebab-col" }, zv = { class: "iws-kebab-wrap" }, Hv = ["onClick"], Wv = { class: "iws-menu iws-menu-row" }, Uv = ["onClick"], Kv = ["onClick"], Gv = { class: "iws-total-row" }, Yv = { class: "ta-r fw-700" }, Jv = { class: "ta-r fw-700 green" }, Zv = { class: "ta-r fw-700 red" }, Xv = { class: "ta-r fw-700" }, s1 = {
  key: 2,
  class: "empty-msg"
}, t1 = {
  key: 12,
  class: "books-card report-card bs-card"
}, e1 = { class: "bs-page-head" }, a1 = { class: "bs-page-head-actions" }, o1 = { class: "bs-asof" }, l1 = { class: "iws-export-wrap" }, n1 = ["disabled"], i1 = { class: "iws-menu" }, d1 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, r1 = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(3, 1fr)", "margin-bottom": "14px" }
}, u1 = { class: "bs-kpi bs-kpi-assets" }, c1 = { class: "bs-kpi-body" }, m1 = { class: "bs-kpi-amount" }, v1 = { class: "bs-kpi bs-kpi-equity" }, _1 = { class: "bs-kpi-body" }, p1 = { class: "bs-kpi-amount" }, b1 = { class: "bs-kpi-body" }, y1 = { class: "bs-sum-status-icon" }, h1 = { class: "bs-sum-status-body" }, g1 = { class: "bs-sum-status-title" }, k1 = { class: "bs-sum-status-eq" }, f1 = {
  key: 0,
  class: "sgl-grir-note"
}, w1 = { class: "mono-sm fw-600" }, x1 = {
  class: "iws-table-wrap",
  style: { "margin-bottom": "20px" }
}, C1 = { class: "iws-table" }, S1 = { class: "iws-idx" }, j1 = { class: "iws-item-name" }, M1 = { class: "ta-r mono-sm" }, D1 = { class: "ta-r mono-sm" }, T1 = { class: "iws-kebab-col" }, O1 = { class: "iws-kebab-wrap" }, R1 = ["onClick"], P1 = { class: "iws-menu iws-menu-row" }, I1 = ["onClick"], V1 = { class: "iws-table-wrap" }, N1 = { class: "iws-table" }, E1 = { class: "iws-idx" }, q1 = { class: "iws-item-name" }, B1 = { class: "iws-uom" }, A1 = { class: "ta-r mono-sm" }, $1 = { class: "ta-r mono-sm" }, L1 = { class: "ta-r mono-sm fw-700 green" }, Q1 = { class: "iws-kebab-col" }, F1 = { class: "iws-kebab-wrap" }, z1 = ["onClick"], H1 = { class: "iws-menu iws-menu-row" }, W1 = ["onClick"], U1 = ["onClick"], K1 = { class: "iws-total-row" }, G1 = { class: "ta-r fw-700 green" }, Y1 = {
  key: 2,
  class: "empty-msg"
}, J1 = {
  key: 13,
  class: "books-card report-card bs-card"
}, Z1 = { class: "bs-page-head" }, X1 = { class: "bs-page-head-actions" }, s_ = { class: "bs-asof" }, t_ = { class: "iws-export-wrap" }, e_ = ["disabled"], a_ = { class: "iws-menu" }, o_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, l_ = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "1fr", "margin-bottom": "14px" }
}, n_ = { class: "bs-kpi bs-kpi-assets" }, i_ = { class: "bs-kpi-body" }, d_ = { class: "bs-kpi-amount" }, r_ = { class: "iws-table-wrap" }, u_ = { class: "iws-table" }, c_ = { class: "iws-idx" }, m_ = { class: "iws-item-name" }, v_ = { class: "ta-r mono-sm fw-700 green" }, __ = { class: "ta-r mono-sm" }, p_ = { class: "iws-total-row" }, b_ = { class: "ta-r fw-700 green" }, y_ = {
  key: 1,
  class: "empty-msg"
}, h_ = {
  key: 2,
  class: "empty-msg"
}, g_ = {
  key: 14,
  class: "books-card report-card bs-card"
}, k_ = { class: "bs-page-head" }, f_ = { class: "bs-page-head-actions" }, w_ = { class: "iws-export-wrap" }, x_ = ["disabled"], C_ = { class: "iws-menu" }, S_ = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap", "margin-bottom": "12px" } }, j_ = ["value"], M_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, D_ = {
  key: 1,
  class: "iws-table-wrap"
}, T_ = { class: "iws-table" }, O_ = { class: "iws-idx" }, R_ = { class: "iws-item-name" }, P_ = {
  class: "mono-sm",
  style: { opacity: ".65" }
}, I_ = { class: "ta-r mono-sm" }, V_ = { class: "ta-r mono-sm fw-700 green" }, N_ = { class: "ta-r mono-sm fw-700" }, E_ = {
  key: 2,
  class: "empty-msg"
}, q_ = {
  key: 15,
  class: "books-card report-card bs-card"
}, B_ = { class: "bs-page-head" }, A_ = { class: "bs-page-head-actions" }, $_ = { class: "bs-asof" }, L_ = { class: "iws-export-wrap" }, Q_ = ["disabled"], F_ = { class: "iws-menu" }, z_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, H_ = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "18px" }
}, W_ = { class: "mis-summary-card" }, U_ = { class: "mis-summary-val" }, K_ = { class: "mis-summary-card" }, G_ = { class: "mis-summary-val green" }, Y_ = { class: "mis-summary-card" }, J_ = { class: "mis-summary-val" }, Z_ = { class: "mis-summary-card" }, X_ = { class: "mis-summary-val red" }, sp = { class: "mis-summary-card" }, tp = { class: "mis-summary-val" }, ep = { class: "mis-summary-card" }, ap = { class: "mis-summary-val" }, op = { class: "mis-summary-card" }, lp = { class: "mis-summary-val" }, np = { class: "mis-summary-card" }, ip = { class: "iws-table-wrap" }, dp = { class: "iws-table" }, rp = { class: "iws-item-name" }, up = { class: "ta-r mono-sm" }, cp = { class: "ta-r mono-sm green" }, mp = { class: "ta-r mono-sm" }, vp = { class: "ta-r mono-sm red" }, _p = { class: "ta-r mono-sm" }, pp = { class: "ta-r mono-sm" }, bp = { class: "ta-r mono-sm" }, yp = { class: "ta-r mono-sm" }, hp = { class: "ta-r mono-sm fw-600" }, gp = { class: "iws-total-row" }, kp = { class: "ta-r fw-700" }, fp = { class: "ta-r fw-700 green" }, wp = { class: "ta-r fw-700" }, xp = { class: "ta-r fw-700 red" }, Cp = { class: "ta-r fw-700" }, Sp = { class: "ta-r fw-700" }, jp = { class: "ta-r fw-700" }, Mp = { class: "ta-r fw-700" }, Dp = { class: "ta-r fw-700" }, Tp = {
  key: 1,
  class: "empty-msg"
}, Op = {
  key: 2,
  class: "empty-msg"
}, Rp = {
  key: 16,
  class: "books-card report-card bs-card"
}, Pp = { class: "bs-page-head" }, Ip = { class: "bs-page-head-actions" }, Vp = { class: "bs-asof" }, Np = { class: "iws-export-wrap" }, Ep = ["disabled"], qp = { class: "iws-menu" }, Bp = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Ap = ["onClick"], $p = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Lp = {
  key: 0,
  class: "mis-summary-grid"
}, Qp = { class: "mis-summary-card" }, Fp = { class: "mis-summary-val" }, zp = { class: "mis-summary-card" }, Hp = { class: "mis-summary-val" }, Wp = { class: "mis-summary-card" }, Up = { class: "mis-summary-val" }, Kp = { class: "mis-summary-card" }, Gp = { class: "mis-summary-val red" }, Yp = { class: "mis-summary-card" }, Jp = { class: "mis-summary-val green" }, Zp = { class: "mis-summary-card" }, Xp = { class: "mis-summary-val" }, sb = { class: "mis-summary-card" }, tb = { class: "mis-summary-val" }, eb = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, ab = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, ob = { class: "mis-summary-card" }, lb = { class: "mis-summary-val" }, nb = { class: "mis-summary-card" }, ib = { class: "mis-summary-val green" }, db = { class: "mis-summary-card" }, rb = { class: "mono" }, ub = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, cb = { class: "ta-r mono-sm" }, mb = { class: "ta-r mono-sm" }, vb = { class: "ta-r mono-sm red" }, _b = { class: "ta-r mono-sm fw-600" }, pb = {
  key: 3,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bb = { class: "ta-r mono-sm" }, yb = { class: "ta-r mono-sm fw-600" }, hb = { class: "ta-r mono-sm" }, gb = {
  key: 4,
  class: "books-table aging-table",
  style: { width: "100%" }
}, kb = { class: "ta-r mono-sm" }, fb = { class: "ta-r mono-sm fw-600" }, wb = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, xb = { class: "ta-r mono-sm" }, Cb = { class: "ta-r mono-sm fw-600" }, Sb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, jb = { class: "mis-summary-card" }, Mb = { class: "mis-summary-val" }, Db = { class: "mis-summary-card" }, Tb = { class: "mis-summary-val red" }, Ob = { class: "mis-summary-card" }, Rb = { class: "mis-summary-val" }, Pb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ib = { class: "ta-r mono-sm red" }, Vb = {
  key: 1,
  class: "empty-msg"
}, Nb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Eb = { class: "mis-summary-card" }, qb = { class: "mis-summary-val red" }, Bb = { class: "mis-summary-card" }, Ab = { class: "mis-summary-val red" }, $b = { class: "mis-summary-card" }, Lb = { class: "mis-summary-val" }, Qb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, Fb = { class: "ta-r mono-sm red" }, zb = { class: "ta-r mono-sm red" }, Hb = { class: "ta-r mono-sm" }, Wb = {
  key: 1,
  class: "empty-msg"
}, Ub = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Kb = { class: "ta-r mono-sm red" }, Gb = { class: "ta-r mono-sm" }, Yb = {
  key: 3,
  class: "empty-msg"
}, Jb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Zb = { class: "mis-summary-card" }, Xb = { class: "mis-summary-val" }, sy = { class: "mis-summary-card" }, ty = { class: "mis-summary-val red" }, ey = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ay = { class: "badge badge-blue" }, oy = { class: "ta-r mono-sm" }, ly = { class: "ta-r mono-sm green" }, ny = { class: "ta-r mono-sm red fw-600" }, iy = {
  key: 1,
  class: "empty-msg"
}, dy = { class: "mis-summary-grid" }, ry = { class: "mis-summary-card" }, uy = { class: "mis-summary-val" }, cy = { class: "mis-summary-card" }, my = { class: "mis-summary-val green" }, vy = { class: "mis-summary-card" }, _y = { class: "mis-summary-card" }, py = { class: "mis-summary-val" }, by = { class: "mis-summary-card" }, yy = { class: "mis-summary-val green" }, hy = { class: "mis-summary-card" }, gy = { class: "mis-summary-val" }, ky = {
  key: 2,
  class: "empty-msg"
}, fy = {
  key: 17,
  class: "books-card report-card bs-card"
}, wy = { class: "bs-page-head" }, xy = { class: "bs-page-head-actions" }, Cy = { class: "bs-asof" }, Sy = { class: "iws-export-wrap" }, jy = ["disabled"], My = { class: "iws-menu" }, Dy = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Ty = ["onClick"], Oy = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Ry = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Py = { class: "mono" }, Iy = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(4,1fr)" }
}, Vy = { class: "mis-summary-card" }, Ny = { class: "mis-summary-val" }, Ey = { class: "mis-summary-card" }, qy = { class: "mis-summary-val" }, By = { class: "mis-summary-card" }, Ay = { class: "mis-summary-val red" }, $y = { class: "mis-summary-card" }, Ly = { class: "mis-summary-val green" }, Qy = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Fy = { class: "mono" }, zy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Hy = { class: "ta-r mono-sm" }, Wy = { class: "ta-r mono-sm fw-600" }, Uy = {
  key: 1,
  class: "empty-msg"
}, Ky = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, Gy = { class: "aging-bucket" }, Yy = { class: "bucket-val mono-sm" }, Jy = { class: "aging-bucket" }, Zy = { class: "bucket-val mono-sm" }, Xy = { class: "aging-bucket" }, s0 = { class: "bucket-val mono-sm" }, t0 = { class: "aging-bucket" }, e0 = { class: "bucket-val mono-sm red" }, a0 = { class: "aging-bucket" }, o0 = { class: "bucket-val mono-sm fw-700" }, l0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n0 = { class: "ta-r mono-sm" }, i0 = { class: "ta-r mono-sm" }, d0 = { class: "ta-r mono-sm" }, r0 = { class: "ta-r mono-sm red" }, u0 = { class: "ta-r mono-sm fw-600" }, c0 = {
  key: 1,
  class: "empty-msg"
}, m0 = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, v0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, _0 = { class: "mis-summary-card" }, p0 = { class: "mis-summary-val" }, b0 = { class: "mis-summary-card" }, y0 = { class: "mis-summary-val green" }, h0 = { class: "mis-summary-card" }, g0 = { class: "mono" }, k0 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, f0 = { class: "mono" }, w0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, x0 = { class: "ta-r mono-sm" }, C0 = { class: "ta-r mono-sm green" }, S0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, j0 = { class: "mis-summary-card" }, M0 = { class: "mis-summary-val" }, D0 = { class: "mis-summary-card" }, T0 = { class: "mis-summary-val red" }, O0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, R0 = { class: "ta-r mono-sm red fw-600" }, P0 = { class: "ta-r mono-sm" }, I0 = {
  key: 1,
  class: "empty-msg"
}, V0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, N0 = { class: "ta-r mono-sm" }, E0 = { class: "ta-r mono-sm" }, q0 = {
  key: 1,
  class: "empty-msg"
}, B0 = { class: "mis-summary-grid" }, A0 = { class: "mis-summary-card" }, $0 = { class: "mis-summary-val" }, L0 = { class: "mis-summary-card" }, Q0 = { class: "mis-summary-val" }, F0 = { class: "mis-summary-card" }, z0 = { class: "mis-summary-val" }, H0 = { class: "mis-summary-card" }, W0 = { class: "mis-summary-val green" }, U0 = { class: "mis-summary-card" }, K0 = { class: "mis-summary-val red" }, G0 = { class: "mis-summary-card" }, Y0 = {
  key: 2,
  class: "empty-msg"
}, J0 = {
  key: 18,
  class: "books-card report-card bs-card"
}, Z0 = { class: "bs-page-head" }, X0 = { class: "bs-page-head-actions" }, sh = { class: "bs-asof" }, th = { class: "iws-export-wrap" }, eh = ["disabled"], ah = { class: "iws-menu" }, oh = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, lh = ["onClick"], nh = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, ih = {
  key: 0,
  class: "mis-summary-grid"
}, dh = { class: "mis-summary-card" }, rh = { class: "mis-summary-val" }, uh = { class: "mis-summary-card" }, ch = { class: "mis-summary-val" }, mh = { class: "mis-summary-card" }, vh = { class: "mis-summary-val" }, _h = { class: "mis-summary-card" }, ph = { class: "mis-summary-val green" }, bh = { class: "mis-summary-card" }, yh = { class: "mis-summary-val red" }, hh = { class: "mis-summary-card" }, gh = { class: "mis-summary-val" }, kh = { class: "mis-summary-card" }, fh = { class: "mis-summary-val" }, wh = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xh = { class: "ta-r mono-sm" }, Ch = { class: "ta-r mono-sm fw-600" }, Sh = { class: "ta-r mono-sm" }, jh = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Mh = { class: "ta-r mono-sm" }, Dh = { class: "ta-r mono-sm" }, Th = { class: "ta-r mono-sm" }, Oh = { class: "ta-r mono-sm fw-600" }, Rh = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, Ph = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, Ih = { class: "mis-summary-card" }, Vh = { class: "mis-summary-val" }, Nh = { class: "mis-summary-card" }, Eh = { class: "mis-summary-val red" }, qh = { class: "mis-summary-card" }, Bh = { class: "mono" }, Ah = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, $h = { key: 0 }, Lh = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Qh = { class: "ta-r mono-sm" }, Fh = { class: "ta-r mono-sm" }, zh = { class: "ta-r mono-sm" }, Hh = {
  key: 1,
  class: "empty-msg"
}, Wh = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Uh = { class: "mis-summary-card" }, Kh = { class: "mis-summary-val" }, Gh = { class: "mis-summary-card" }, Yh = { class: "mis-summary-val red" }, Jh = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Zh = { class: "badge badge-blue" }, Xh = { class: "ta-r mono-sm" }, sg = { class: "ta-r mono-sm" }, tg = { class: "ta-r mono-sm red fw-600" }, eg = {
  key: 1,
  class: "empty-msg"
}, ag = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, og = { class: "mis-summary-card" }, lg = { class: "mis-summary-val" }, ng = { class: "mis-summary-card" }, ig = { class: "mis-summary-val red" }, dg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, rg = { class: "badge badge-blue" }, ug = { class: "ta-r mono-sm" }, cg = { class: "ta-r mono-sm" }, mg = { class: "ta-r mono-sm red fw-600" }, vg = {
  key: 1,
  class: "empty-msg"
}, _g = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, pg = { class: "mis-summary-card" }, bg = { class: "mis-summary-val" }, yg = { class: "mis-summary-card" }, hg = { class: "mis-summary-val green" }, gg = { class: "mis-summary-card" }, kg = { class: "mis-summary-val" }, fg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wg = { class: "ta-r mono-sm fw-600" }, xg = {
  key: 1,
  class: "empty-msg"
}, Cg = {
  key: 2,
  class: "empty-msg"
}, Sg = {
  key: 19,
  class: "books-card report-card bs-card"
}, jg = { class: "bs-page-head" }, Mg = { class: "bs-page-head-actions" }, Dg = { class: "bs-asof" }, Tg = { class: "iws-export-wrap" }, Og = ["disabled"], Rg = { class: "iws-menu" }, Pg = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Ig = ["onClick"], Vg = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Ng = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Eg = { class: "mis-summary-card" }, qg = { class: "mis-summary-val" }, Bg = { class: "mis-summary-card" }, Ag = { class: "mis-summary-val green" }, $g = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Lg = { class: "ta-r mono-sm" }, Qg = { class: "ta-r mono-sm" }, Fg = { class: "ta-r mono-sm fw-600" }, zg = {
  key: 1,
  class: "empty-msg"
}, Hg = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, Wg = { class: "mono" }, Ug = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Kg = { class: "ta-r mono-sm" }, Gg = { class: "ta-r mono-sm" }, Yg = { class: "ta-r mono-sm fw-600" }, Jg = {
  key: 1,
  class: "empty-msg"
}, Zg = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Xg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, s2 = { class: "ta-r mono-sm fw-600 green" }, t2 = { class: "ta-r mono-sm" }, e2 = { class: "ta-r mono-sm" }, a2 = {
  key: 1,
  class: "empty-msg"
}, o2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, l2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n2 = { class: "ta-r mono-sm" }, i2 = { class: "ta-r mono-sm" }, d2 = { class: "ta-r mono-sm red" }, r2 = {
  key: 1,
  class: "empty-msg"
}, u2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, c2 = { class: "mis-summary-card" }, m2 = { class: "mis-summary-val" }, v2 = { class: "mis-summary-card" }, _2 = { class: "mis-summary-val red" }, p2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, b2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, y2 = { class: "ta-r mono-sm" }, h2 = { class: "ta-r mono-sm fw-600" }, g2 = { class: "ta-r mono-sm red" }, k2 = {
  key: 1,
  class: "empty-msg"
}, f2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, w2 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, x2 = { class: "aging-bucket" }, C2 = { class: "bucket-val mono-sm" }, S2 = { class: "aging-bucket" }, j2 = { class: "bucket-val mono-sm" }, M2 = { class: "aging-bucket" }, D2 = { class: "bucket-val mono-sm" }, T2 = { class: "aging-bucket" }, O2 = { class: "bucket-val mono-sm red" }, R2 = { class: "aging-bucket" }, P2 = { class: "bucket-val mono-sm fw-700" }, I2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, V2 = { class: "ta-r mono-sm" }, N2 = { class: "ta-r mono-sm" }, E2 = {
  key: 1,
  class: "empty-msg"
}, q2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, B2 = { class: "mis-summary-card" }, A2 = { class: "mis-summary-val red" }, $2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, L2 = { class: "ta-r mono-sm red fw-600" }, Q2 = { class: "ta-r mono-sm" }, F2 = { class: "ta-r mono-sm" }, z2 = { class: "ta-r mono-sm" }, H2 = {
  key: 1,
  class: "empty-msg"
}, W2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, U2 = { class: "mis-summary-card" }, K2 = { class: "mis-summary-val red" }, G2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Y2 = { class: "ta-r mono-sm" }, J2 = { class: "ta-r mono-sm" }, Z2 = { class: "ta-r mono-sm red" }, X2 = { class: "ta-r mono-sm" }, sk = { class: "ta-r mono-sm fw-600" }, tk = {
  key: 1,
  class: "empty-msg"
}, ek = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, ak = { class: "mis-summary-card" }, ok = { class: "mis-summary-val" }, lk = { class: "mis-summary-card" }, nk = { class: "mis-summary-val green" }, ik = { class: "mis-summary-card" }, dk = { class: "mis-summary-val red" }, rk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, uk = {
  key: 1,
  class: "empty-msg"
}, ck = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, mk = { class: "mis-summary-card" }, vk = { class: "mis-summary-val" }, _k = { class: "mis-summary-card" }, pk = { class: "mis-summary-val red" }, bk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, yk = { class: "ta-r mono-sm red fw-600" }, hk = { class: "ta-r mono-sm red" }, gk = {
  key: 1,
  class: "empty-msg"
}, kk = {
  key: 2,
  class: "empty-msg"
}, fk = {
  key: 20,
  class: "books-card report-card bs-card"
}, wk = { class: "bs-page-head" }, xk = { class: "bs-page-head-actions" }, Ck = { class: "bs-asof" }, Sk = { class: "iws-export-wrap" }, jk = ["disabled"], Mk = { class: "iws-menu" }, Dk = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Tk = ["onClick"], Ok = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Rk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Pk = { class: "mis-summary-card" }, Ik = { class: "mis-summary-val" }, Vk = { class: "mis-summary-card" }, Nk = { class: "mis-summary-val green" }, Ek = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qk = { class: "ta-r mono-sm" }, Bk = { class: "ta-r mono-sm" }, Ak = { class: "ta-r mono-sm" }, $k = {
  key: 1,
  class: "empty-msg"
}, Lk = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Qk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Fk = { class: "mis-summary-card" }, zk = { class: "mis-summary-val red" }, Hk = { class: "mis-summary-card" }, Wk = { class: "mis-summary-val red" }, Uk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Kk = { class: "ta-r mono-sm" }, Gk = { class: "ta-r mono-sm" }, Yk = { class: "ta-r mono-sm fw-600 red" }, Jk = {
  key: 1,
  class: "empty-msg"
}, Zk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Xk = { class: "mis-summary-card" }, sf = { class: "mis-summary-val" }, tf = { class: "mis-summary-card" }, ef = { class: "mis-summary-val" }, af = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, of = { class: "ta-r mono-sm" }, lf = { class: "ta-r mono-sm" }, nf = { class: "ta-r mono-sm" }, df = { class: "ta-r mono-sm" }, rf = {
  key: 1,
  class: "empty-msg"
}, uf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, cf = { class: "mis-summary-card" }, mf = { class: "mis-summary-val red" }, vf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _f = { class: "ta-r mono-sm" }, pf = { class: "ta-r mono-sm" }, bf = { class: "ta-r mono-sm fw-600 red" }, yf = {
  key: 1,
  class: "empty-msg"
}, hf = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, gf = { class: "mono" }, kf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ff = { class: "ta-r mono-sm" }, wf = { class: "ta-r mono-sm" }, xf = { class: "ta-r mono-sm fw-600" }, Cf = {
  key: 1,
  class: "empty-msg"
}, Sf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, jf = { class: "mis-summary-card" }, Mf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Df = { class: "ta-r mono-sm" }, Tf = { class: "ta-r mono-sm" }, Of = {
  key: 1,
  class: "empty-msg"
}, Rf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Pf = { class: "mis-summary-card" }, If = { class: "mis-summary-val" }, Vf = { class: "mis-summary-card" }, Nf = { class: "mis-summary-val" }, Ef = { class: "mis-summary-card" }, qf = { class: "mis-summary-val fw-700" }, Bf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Af = { class: "ta-r mono-sm" }, $f = { class: "ta-r mono-sm" }, Lf = { class: "ta-r mono-sm" }, Qf = { class: "ta-r mono-sm fw-600" }, Ff = { class: "ta-r mono-sm" }, zf = {
  key: 1,
  class: "empty-msg"
}, Hf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, Wf = { class: "mis-summary-card" }, Uf = { class: "mis-summary-val" }, Kf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Gf = { class: "ta-r mono-sm" }, Yf = { class: "ta-r mono-sm" }, Jf = {
  key: 1,
  class: "empty-msg"
}, Zf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Xf = { class: "mis-summary-card" }, sw = { class: "mis-summary-val red" }, tw = { class: "mis-summary-card" }, ew = { class: "mis-summary-val red" }, aw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ow = { class: "ta-r mono-sm red fw-600" }, lw = { class: "ta-r mono-sm" }, nw = {
  key: 1,
  class: "empty-msg"
}, iw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, dw = { class: "mis-summary-card" }, rw = { class: "mis-summary-val red" }, uw = { class: "mis-summary-card" }, cw = { class: "mis-summary-val red" }, mw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, vw = { class: "ta-r mono-sm red fw-600" }, _w = { class: "ta-r mono-sm" }, pw = {
  key: 1,
  class: "empty-msg"
}, bw = {
  key: 2,
  class: "empty-msg"
}, yw = {
  key: 21,
  class: "books-card report-card bs-card"
}, hw = { class: "bs-page-head" }, gw = { class: "bs-page-head-actions" }, kw = { class: "bs-asof" }, fw = { class: "iws-export-wrap" }, ww = ["disabled"], xw = { class: "iws-menu" }, Cw = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Sw = ["onClick"], jw = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Mw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Dw = { class: "mis-summary-card" }, Tw = { class: "mis-summary-val" }, Ow = { class: "mis-summary-card" }, Rw = { class: "mis-summary-val green" }, Pw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Iw = { class: "ta-r mono-sm" }, Vw = { class: "ta-r mono-sm" }, Nw = { class: "ta-r mono-sm" }, Ew = { class: "ta-r mono-sm fw-600 green" }, qw = {
  key: 1,
  class: "empty-msg"
}, Bw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Aw = { class: "mis-summary-card" }, $w = { class: "mis-summary-val" }, Lw = { class: "mis-summary-card" }, Qw = { class: "mis-summary-val" }, Fw = { class: "mis-summary-card" }, zw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Hw = { class: "ta-r mono-sm" }, Ww = { class: "ta-r mono-sm" }, Uw = { class: "ta-r mono-sm" }, Kw = {
  key: 1,
  class: "empty-msg"
}, Gw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Yw = { class: "ta-r mono-sm" }, Jw = { class: "ta-r mono-sm" }, Zw = { class: "ta-r mono-sm fw-600" }, Xw = {
  key: 1,
  class: "empty-msg"
}, s3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, t3 = { class: "ta-r mono-sm" }, e3 = { class: "ta-r mono-sm" }, a3 = {
  key: 1,
  class: "empty-msg"
}, o3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, l3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n3 = { class: "ta-r mono-sm fw-600 green" }, i3 = { class: "ta-r mono-sm" }, d3 = { class: "ta-r mono-sm" }, r3 = {
  key: 1,
  class: "empty-msg"
}, u3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, c3 = { class: "ta-r mono-sm" }, m3 = { class: "ta-r mono-sm" }, v3 = { class: "ta-r mono-sm fw-600" }, _3 = {
  key: 1,
  class: "empty-msg"
}, p3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, b3 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, y3 = { class: "mis-summary-card" }, h3 = { class: "mis-summary-val red" }, g3 = { class: "mis-summary-card" }, k3 = { class: "mis-summary-val red" }, f3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, w3 = { class: "ta-r mono-sm red fw-600" }, x3 = { class: "ta-r mono-sm red" }, C3 = { class: "ta-r mono-sm" }, S3 = {
  key: 1,
  class: "empty-msg"
}, j3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M3 = { class: "ta-r mono-sm fw-600 green" }, D3 = { class: "ta-r mono-sm" }, T3 = {
  key: 1,
  class: "empty-msg"
}, O3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, R3 = { class: "ta-r mono-sm red fw-600" }, P3 = { class: "ta-r mono-sm" }, I3 = {
  key: 1,
  class: "empty-msg"
}, V3 = {
  key: 2,
  class: "empty-msg"
}, N3 = {
  key: 22,
  class: "books-card report-card bs-card"
}, E3 = { class: "bs-page-head" }, q3 = { class: "bs-page-head-actions" }, B3 = { class: "bs-asof" }, A3 = { class: "iws-export-wrap" }, $3 = ["disabled"], L3 = { class: "iws-menu" }, Q3 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, F3 = ["onClick"], z3 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, H3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, W3 = { class: "mis-summary-grid" }, U3 = { class: "mis-summary-card" }, K3 = { class: "mis-summary-val" }, G3 = { class: "mis-summary-card" }, Y3 = { class: "mis-summary-val green" }, J3 = { class: "mis-summary-card" }, Z3 = { class: "mis-summary-val" }, X3 = { class: "mis-summary-card" }, s4 = { class: "mis-summary-val" }, t4 = { class: "mis-summary-card" }, e4 = { class: "mis-summary-val" }, a4 = { class: "mis-summary-card" }, o4 = { class: "mis-summary-val" }, l4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, n4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, i4 = { class: "mis-summary-card" }, d4 = { class: "mis-summary-val" }, r4 = { class: "mis-summary-card" }, u4 = { class: "mis-summary-val red" }, c4 = { class: "mis-summary-card" }, m4 = { class: "mis-summary-val red" }, v4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _4 = { class: "ta-r mono-sm" }, p4 = { class: "ta-r mono-sm red fw-600" }, b4 = { class: "ta-r mono-sm" }, y4 = {
  key: 1,
  class: "empty-msg"
}, h4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, g4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, k4 = { class: "mis-summary-card" }, f4 = { class: "mis-summary-val" }, w4 = { class: "mis-summary-card" }, x4 = { class: "mis-summary-val red" }, C4 = { class: "mis-summary-card" }, S4 = { class: "mis-summary-val red" }, j4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M4 = { class: "ta-r mono-sm" }, D4 = { class: "ta-r mono-sm" }, T4 = { class: "ta-r mono-sm red fw-600" }, O4 = {
  key: 1,
  class: "empty-msg"
}, R4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, P4 = { class: "mis-summary-card" }, I4 = { class: "mis-summary-val red" }, V4 = { class: "mis-summary-card" }, N4 = { class: "mis-summary-val red" }, E4 = { class: "mis-summary-card" }, q4 = { class: "mis-summary-val red" }, B4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, A4 = { class: "red fw-600" }, $4 = { class: "ta-r mono-sm red fw-600" }, L4 = { class: "ta-r mono-sm" }, Q4 = {
  key: 1,
  class: "empty-msg"
}, F4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, z4 = { class: "ta-r mono-sm" }, H4 = { class: "ta-r mono-sm" }, W4 = { class: "ta-r mono-sm red fw-600" }, U4 = {
  key: 1,
  class: "empty-msg"
}, K4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, G4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Y4 = { class: "ta-r mono-sm" }, J4 = { class: "ta-r mono-sm" }, Z4 = { class: "ta-r mono-sm" }, X4 = { class: "ta-r mono-sm fw-600" }, s6 = {
  key: 1,
  class: "empty-msg"
}, t6 = {
  key: 2,
  class: "empty-msg"
}, e6 = {
  key: 23,
  class: "books-card report-card bs-card"
}, a6 = { class: "bs-page-head" }, o6 = { class: "bs-page-head-actions" }, l6 = { class: "bs-asof" }, n6 = { class: "iws-export-wrap" }, i6 = ["disabled"], d6 = { class: "iws-menu" }, r6 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, u6 = ["onClick"], c6 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, m6 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, v6 = { class: "mis-summary-grid" }, _6 = { class: "mis-summary-card" }, p6 = { class: "mis-summary-val" }, b6 = { class: "mis-summary-card" }, y6 = { class: "mis-summary-val" }, h6 = { class: "mis-summary-card" }, g6 = { class: "mis-summary-val" }, k6 = { class: "mis-summary-card" }, f6 = { class: "mis-summary-val" }, w6 = { class: "mis-summary-card" }, x6 = { class: "mis-summary-val green" }, C6 = { class: "mis-summary-card" }, S6 = { class: "mis-summary-val red" }, j6 = { class: "mis-summary-card" }, M6 = { class: "mis-summary-val green" }, D6 = { class: "mis-summary-card" }, T6 = { class: "mis-summary-val red" }, O6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, R6 = { class: "badge badge-blue" }, P6 = { class: "ta-r mono-sm fw-600" }, I6 = {
  key: 1,
  class: "empty-msg"
}, V6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, N6 = { class: "ta-r mono-sm fw-600" }, E6 = {
  key: 1,
  class: "empty-msg"
}, q6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, B6 = { class: "badge badge-blue" }, A6 = { class: "ta-r mono-sm fw-600" }, $6 = {
  key: 1,
  class: "empty-msg"
}, L6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Q6 = { class: "ta-r mono-sm fw-600" }, F6 = {
  key: 1,
  class: "empty-msg"
}, z6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, H6 = { class: "ta-r mono-sm fw-600 green" }, W6 = {
  key: 1,
  class: "empty-msg"
}, U6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, K6 = { class: "red fw-600" }, G6 = { class: "badge badge-blue" }, Y6 = { class: "ta-r mono-sm" }, J6 = {
  key: 1,
  class: "empty-msg"
}, Z6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, X6 = { class: "badge badge-blue" }, s9 = { class: "ta-r mono-sm fw-600 green" }, t9 = {
  key: 1,
  class: "empty-msg"
}, e9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a9 = { class: "ta-r mono-sm red fw-600" }, o9 = {
  key: 1,
  class: "empty-msg"
}, l9 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, n9 = { class: "mis-summary-card" }, i9 = { class: "mis-summary-val" }, d9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, r9 = { class: "badge badge-blue" }, u9 = { class: "ta-r mono-sm" }, c9 = { class: "ta-r mono-sm fw-600" }, m9 = {
  key: 1,
  class: "empty-msg"
}, v9 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, _9 = { class: "mis-summary-card" }, p9 = { class: "mis-summary-val" }, b9 = { class: "mis-summary-card" }, y9 = { class: "mis-summary-val" }, h9 = { class: "mis-summary-card" }, g9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, k9 = { class: "ta-r mono-sm" }, f9 = { class: "ta-r mono-sm" }, w9 = { class: "ta-r mono-sm" }, x9 = {
  key: 1,
  class: "empty-msg"
}, C9 = {
  key: 2,
  class: "empty-msg"
}, S9 = {
  key: 24,
  class: "books-card report-card bs-card"
}, j9 = { class: "bs-page-head" }, M9 = { class: "bs-page-head-actions" }, D9 = { class: "bs-asof" }, T9 = { class: "iws-export-wrap" }, O9 = ["disabled"], R9 = { class: "iws-menu" }, P9 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, I9 = ["onClick"], V9 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, N9 = { class: "mis-summary-grid" }, E9 = { class: "mis-summary-card" }, q9 = { class: "mis-summary-val" }, B9 = { class: "mis-summary-card" }, A9 = { class: "mis-summary-val" }, $9 = { class: "mis-summary-card" }, L9 = { class: "mis-summary-val" }, Q9 = { class: "mis-summary-card" }, F9 = { class: "mis-summary-card" }, z9 = { class: "mis-summary-card" }, H9 = { class: "mis-summary-val" }, W9 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, U9 = { class: "ta-r mono-sm" }, K9 = { class: "ta-r mono-sm" }, G9 = { class: "ta-r mono-sm" }, Y9 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, J9 = { class: "ta-r mono-sm" }, Z9 = { class: "ta-r mono-sm" }, X9 = { class: "ta-r mono-sm" }, s5 = { class: "ta-r mono-sm" }, t5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, e5 = { class: "ta-r mono-sm" }, a5 = { class: "ta-r mono-sm" }, o5 = { class: "ta-r mono-sm" }, l5 = { key: 0 }, n5 = { class: "ta-r mono-sm" }, i5 = { class: "ta-r mono-sm" }, d5 = {
  key: 1,
  class: "empty-msg"
}, r5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, u5 = { class: "ta-r mono-sm" }, c5 = { class: "ta-r mono-sm" }, m5 = { class: "ta-r mono-sm" }, v5 = {
  key: 1,
  class: "empty-msg"
}, _5 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, p5 = { class: "ta-r mono-sm" }, b5 = { class: "ta-r mono-sm" }, y5 = { class: "ta-r mono-sm" }, h5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, g5 = { class: "ta-r mono-sm" }, k5 = { class: "ta-r mono-sm" }, f5 = { class: "ta-r mono-sm" }, w5 = {
  key: 1,
  class: "empty-msg"
}, x5 = {
  key: 2,
  class: "empty-msg"
}, C5 = {
  key: 25,
  class: "books-card report-card bs-card"
}, S5 = { class: "bs-page-head" }, j5 = { class: "bs-page-head-actions" }, M5 = { class: "bs-asof" }, D5 = { class: "iws-export-wrap" }, T5 = ["disabled"], O5 = { class: "iws-menu" }, R5 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, P5 = ["onClick"], I5 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, V5 = { class: "mis-summary-grid" }, N5 = { class: "mis-summary-card" }, E5 = { class: "mis-summary-val" }, q5 = { class: "mis-summary-card" }, B5 = { class: "mis-summary-val" }, A5 = { class: "mis-summary-card" }, $5 = { class: "mis-summary-val" }, L5 = { class: "mis-summary-card" }, Q5 = { class: "mis-summary-val" }, F5 = { class: "mis-summary-card" }, z5 = { class: "mis-summary-val" }, H5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, W5 = { class: "ta-r mono-sm" }, U5 = { class: "ta-r mono-sm fw-600" }, K5 = {
  key: 1,
  class: "empty-msg"
}, G5 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Y5 = { class: "ta-r mono-sm" }, J5 = { class: "ta-r mono-sm fw-600" }, Z5 = { class: "ta-r mono-sm" }, X5 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, sx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, tx = { class: "ta-r mono-sm" }, ex = { class: "ta-r mono-sm" }, ax = {
  key: 1,
  class: "empty-msg"
}, ox = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, lx = { class: "mis-summary-card" }, nx = { class: "mis-summary-val" }, ix = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, dx = { class: "ta-r mono-sm" }, rx = { class: "ta-r mono-sm fw-600" }, ux = {
  key: 1,
  class: "empty-msg"
}, cx = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, mx = { class: "mis-summary-card" }, vx = { class: "mis-summary-val" }, _x = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, px = { class: "ta-r mono-sm" }, bx = { class: "ta-r mono-sm fw-600" }, yx = {
  key: 1,
  class: "empty-msg"
}, hx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, gx = { class: "ta-r mono-sm" }, kx = { class: "ta-r mono-sm fw-600" }, fx = {
  key: 1,
  class: "empty-msg"
}, wx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xx = { class: "ta-r mono-sm fw-600 red" }, Cx = { class: "ta-r mono-sm" }, Sx = { style: { "font-size": "11px", color: "#94a3b8" } }, jx = {
  key: 1,
  class: "empty-msg"
}, Mx = {
  key: 2,
  class: "empty-msg"
}, Dx = {
  key: 26,
  class: "books-card report-card bs-card"
}, Tx = { class: "bs-page-head" }, Ox = { class: "bs-page-head-actions" }, Rx = { class: "bs-asof" }, Px = { class: "iws-export-wrap" }, Ix = ["disabled"], Vx = { class: "iws-menu" }, Nx = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Ex = ["onClick"], qx = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Bx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Ax = { class: "mis-summary-grid" }, $x = { class: "mis-summary-card" }, Lx = { class: "mis-summary-val" }, Qx = { class: "mis-summary-card" }, Fx = { class: "mis-summary-val red" }, zx = { class: "mis-summary-card" }, Hx = { class: "mis-summary-val green" }, Wx = { class: "mis-summary-card" }, Ux = { class: "mis-summary-val" }, Kx = { class: "mis-summary-card" }, Gx = { class: "mis-summary-val" }, Yx = { class: "mis-summary-card" }, Jx = { class: "mis-summary-val" }, Zx = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Xx = { class: "ta-r mono-sm" }, s8 = { class: "ta-r mono-sm" }, t8 = { class: "ta-r mono-sm" }, e8 = { class: "ta-r mono-sm" }, a8 = { class: "ta-r mono-sm red" }, o8 = { class: "ta-r mono-sm fw-600" }, l8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n8 = { class: "ta-r mono-sm red" }, i8 = { class: "ta-r mono-sm fw-600" }, d8 = {
  key: 1,
  class: "empty-msg"
}, r8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, u8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, c8 = { class: "ta-r mono-sm fw-600" }, m8 = {
  key: 1,
  class: "empty-msg"
}, v8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, _8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, p8 = { class: "ta-r mono-sm fw-600" }, b8 = {
  key: 1,
  class: "empty-msg"
}, y8 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, h8 = { class: "ta-r mono-sm" }, g8 = { class: "ta-r mono-sm fw-600" }, k8 = { class: "ta-r mono-sm" }, f8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, w8 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, x8 = { class: "ta-r mono-sm" }, C8 = {
  key: 2,
  class: "empty-msg"
}, S8 = {
  key: 27,
  class: "books-card report-card bs-card"
}, j8 = { class: "bs-page-head" }, M8 = { class: "bs-page-head-actions" }, D8 = { class: "bs-asof" }, T8 = { class: "iws-export-wrap" }, O8 = ["disabled"], R8 = { class: "iws-menu" }, P8 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, I8 = ["onClick"], V8 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, N8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, E8 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, q8 = { class: "mis-summary-card" }, B8 = { class: "mis-summary-val" }, A8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $8 = { class: "ta-r mono-sm" }, L8 = { class: "ta-r mono-sm fw-600" }, Q8 = {
  key: 1,
  class: "empty-msg"
}, F8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, z8 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, H8 = { class: "mis-summary-card" }, W8 = { class: "mis-summary-val" }, U8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, K8 = { class: "ta-r mono-sm" }, G8 = { class: "ta-r mono-sm fw-600" }, Y8 = {
  key: 1,
  class: "empty-msg"
}, J8 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Z8 = { class: "mis-summary-card" }, X8 = { class: "mis-summary-val" }, s7 = { class: "mis-summary-card" }, t7 = { class: "mis-summary-val green" }, e7 = { class: "mis-summary-card" }, a7 = { class: "mis-summary-val red" }, o7 = { class: "mis-summary-card" }, l7 = { class: "mis-summary-val" }, n7 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, i7 = { class: "ta-r mono-sm green" }, d7 = { class: "ta-r mono-sm red" }, r7 = { class: "ta-r mono-sm fw-600" }, u7 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, c7 = { class: "mis-summary-card" }, m7 = { class: "mis-summary-val" }, v7 = { class: "mis-summary-card" }, _7 = { class: "mis-summary-val green" }, p7 = { class: "mis-summary-card" }, b7 = { class: "mis-summary-val red" }, y7 = { class: "mis-summary-card" }, h7 = { class: "mis-summary-val" }, g7 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, k7 = { class: "ta-r mono-sm green" }, f7 = { class: "ta-r mono-sm red" }, w7 = { class: "ta-r mono-sm fw-600" }, x7 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, C7 = { class: "mis-summary-card" }, S7 = { class: "mis-summary-val green" }, j7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M7 = { class: "ta-r mono-sm fw-600 green" }, D7 = {
  key: 1,
  class: "empty-msg"
}, T7 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, O7 = { class: "mis-summary-card" }, R7 = { class: "mis-summary-val red" }, P7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, I7 = { class: "ta-r mono-sm fw-600 red" }, V7 = {
  key: 1,
  class: "empty-msg"
}, N7 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, E7 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, q7 = { class: "ta-r mono-sm green" }, B7 = { class: "ta-r mono-sm red" }, A7 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, $7 = { class: "mis-summary-card" }, L7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Q7 = { class: "red" }, F7 = { class: "ta-r mono-sm fw-600 red" }, z7 = {
  key: 1,
  class: "empty-msg"
}, H7 = {
  key: 2,
  class: "empty-msg"
}, W7 = {
  key: 28,
  class: "books-card report-card bs-card"
}, U7 = { class: "bs-page-head" }, K7 = { class: "bs-page-head-actions" }, G7 = { class: "bs-asof" }, Y7 = { class: "iws-export-wrap" }, J7 = ["disabled"], Z7 = { class: "iws-menu" }, X7 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, sC = ["onClick"], tC = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, eC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, aC = { class: "mis-summary-card" }, oC = { class: "mis-summary-val" }, lC = { class: "mis-summary-card" }, nC = { class: "mis-summary-val" }, iC = { class: "mis-summary-card" }, dC = { class: "mis-summary-val green" }, rC = { class: "mis-summary-card" }, uC = { class: "mis-summary-val" }, cC = { class: "mis-summary-card" }, mC = { class: "mis-summary-val" }, vC = { class: "mis-summary-card" }, _C = { class: "mis-summary-val green" }, pC = { class: "mis-summary-card" }, bC = { class: "mis-summary-val red" }, yC = { class: "mis-summary-card" }, hC = { class: "mis-summary-val" }, gC = { class: "mis-summary-card" }, kC = { class: "mis-summary-val red" }, fC = { class: "mis-summary-card" }, wC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, xC = { class: "mis-summary-card" }, CC = { class: "mis-summary-val" }, SC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jC = { class: "ta-r mono-sm" }, MC = { class: "ta-r mono-sm fw-600" }, DC = {
  key: 1,
  class: "empty-msg"
}, TC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, OC = { class: "mis-summary-card" }, RC = { class: "mis-summary-val" }, PC = { class: "mis-summary-card" }, IC = { class: "mis-summary-val green" }, VC = {
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
}, zC = { class: "ta-r mono-sm" }, HC = { class: "ta-r mono-sm fw-600" }, WC = {
  key: 1,
  class: "empty-msg"
}, UC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, KC = { class: "ta-r mono-sm" }, GC = { class: "ta-r mono-sm" }, YC = { class: "ta-r mono-sm" }, JC = { class: "ta-r mono-sm" }, ZC = { class: "ta-r mono-sm fw-600" }, XC = { class: "ta-r mono-sm red" }, sS = { class: "ta-r mono-sm" }, tS = {
  key: 1,
  class: "empty-msg"
}, eS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, aS = { class: "mis-summary-card" }, oS = { class: "mis-summary-val red" }, lS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nS = { class: "ta-r mono-sm" }, iS = { class: "ta-r mono-sm fw-600 red" }, dS = {
  key: 1,
  class: "empty-msg"
}, rS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, uS = { class: "mis-summary-card" }, cS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, mS = { class: "ta-r mono-sm" }, vS = { class: "ta-r mono-sm" }, _S = { class: "ta-r mono-sm" }, pS = { class: "ta-r mono-sm" }, bS = {
  key: 1,
  class: "empty-msg"
}, yS = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, hS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, gS = { class: "mis-summary-card" }, kS = { class: "mis-summary-val" }, fS = { class: "mis-summary-card" }, wS = { class: "mis-summary-val green" }, xS = { class: "mis-summary-card" }, CS = { class: "mis-summary-val red" }, SS = { class: "mis-summary-card" }, jS = { class: "mis-summary-val" }, MS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, DS = {
  key: 1,
  class: "empty-msg"
}, TS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, OS = { class: "ta-r mono-sm" }, RS = { class: "ta-r mono-sm fw-600" }, PS = {
  key: 1,
  class: "empty-msg"
}, IS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, VS = { class: "mis-summary-card" }, NS = { class: "mis-summary-val" }, ES = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qS = { class: "ta-r mono-sm red" }, BS = { class: "ta-r mono-sm" }, AS = { class: "ta-r mono-sm" }, $S = {
  key: 1,
  class: "empty-msg"
}, LS = {
  key: 2,
  class: "empty-msg"
}, QS = {
  key: 29,
  class: "books-card report-card bs-card"
}, FS = { class: "bs-page-head" }, zS = { class: "bs-page-head-actions" }, HS = { class: "bs-asof" }, WS = { class: "iws-export-wrap" }, US = ["disabled"], KS = { class: "iws-menu" }, GS = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, YS = ["onClick"], JS = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, ZS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, XS = { class: "mis-summary-card" }, sj = { class: "mis-summary-val" }, tj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ej = { class: "ta-r mono-sm" }, aj = { class: "ta-r mono-sm" }, oj = { class: "ta-r mono-sm" }, lj = { class: "ta-r mono-sm" }, nj = { class: "ta-r mono-sm fw-600" }, ij = { class: "ta-r mono-sm red" }, dj = { class: "ta-r mono-sm" }, rj = {
  key: 1,
  class: "empty-msg"
}, uj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, cj = { class: "mis-summary-card" }, mj = { class: "mis-summary-val red" }, vj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _j = { class: "ta-r mono-sm" }, pj = { class: "ta-r mono-sm fw-600 red" }, bj = { class: "ta-r mono-sm red" }, yj = {
  key: 1,
  class: "empty-msg"
}, hj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, gj = { class: "ta-r mono-sm" }, kj = { class: "ta-r mono-sm" }, fj = { class: "ta-r mono-sm" }, wj = { class: "ta-r mono-sm" }, xj = { class: "ta-r mono-sm red" }, Cj = { class: "ta-r mono-sm fw-600" }, Sj = {
  key: 1,
  class: "empty-msg"
}, jj = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Mj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Dj = { class: "ta-r mono-sm" }, Tj = { class: "ta-r mono-sm fw-600" }, Oj = {
  key: 0,
  class: "pill pill-green"
}, Rj = {
  key: 1,
  class: "empty-msg"
}, Pj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ij = { class: "ta-r mono-sm fw-600" }, Vj = { class: "ta-r mono-sm red" }, Nj = { class: "ta-r mono-sm" }, Ej = { class: "ta-r mono-sm" }, qj = { class: "ta-r mono-sm" }, Bj = {
  key: 1,
  class: "empty-msg"
}, Aj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, $j = { class: "mis-summary-card" }, Lj = { class: "mis-summary-val green" }, Qj = { class: "mis-summary-card" }, Fj = { class: "mis-summary-val" }, zj = { class: "mis-summary-card" }, Hj = { class: "mis-summary-val red" }, Wj = { class: "mis-summary-card" }, Uj = { class: "mis-summary-val" }, Kj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, Gj = { class: "ta-r mono-sm" }, Yj = { class: "ta-r mono-sm green" }, Jj = { class: "ta-r mono-sm red" }, Zj = { class: "ta-r mono-sm fw-600" }, Xj = { class: "ta-r mono-sm" }, sM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, tM = {
  key: 2,
  class: "empty-msg"
}, eM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, aM = { class: "mis-summary-card" }, oM = { class: "mis-summary-val" }, lM = { class: "mis-summary-card" }, nM = { class: "mis-summary-val red" }, iM = { class: "mis-summary-card" }, dM = { class: "mis-summary-val red" }, rM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, uM = { class: "ta-r mono-sm" }, cM = { class: "ta-r mono-sm green" }, mM = { class: "ta-r mono-sm red" }, vM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _M = { class: "ta-r mono-sm" }, pM = { class: "ta-r mono-sm green" }, bM = { class: "ta-r mono-sm red" }, yM = {
  key: 2,
  class: "empty-msg"
}, hM = {
  key: 2,
  class: "empty-msg"
}, gM = {
  key: 30,
  class: "books-card report-card bs-card"
}, kM = { class: "bs-page-head" }, fM = { class: "bs-page-head-actions" }, wM = { class: "bs-asof" }, xM = { class: "iws-export-wrap" }, CM = ["disabled"], SM = { class: "iws-menu" }, jM = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, MM = ["onClick"], DM = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, TM = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, OM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, RM = { class: "ta-r mono-sm" }, PM = { class: "ta-r mono-sm" }, IM = { class: "ta-r mono-sm" }, VM = {
  key: 1,
  class: "empty-msg"
}, NM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, EM = { class: "mis-summary-card" }, qM = { class: "mis-summary-val" }, BM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, AM = { class: "ta-r mono-sm fw-600" }, $M = { style: { "font-size": "11.5px", color: "#64748b" } }, LM = {
  key: 1,
  class: "empty-msg"
}, QM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, FM = { class: "mis-summary-card" }, zM = { class: "mis-summary-val green" }, HM = { class: "mis-summary-card" }, WM = { class: "mis-summary-val" }, UM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, KM = { class: "ta-r mono-sm" }, GM = { class: "ta-r mono-sm fw-600 green" }, YM = { class: "ta-r" }, JM = ["onUpdate:modelValue"], ZM = {
  key: 1,
  class: "empty-msg"
}, XM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, sD = { class: "mis-summary-card" }, tD = { class: "mis-summary-val green" }, eD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, aD = { class: "ta-r mono-sm" }, oD = { class: "ta-r mono-sm fw-600 green" }, lD = {
  key: 1,
  class: "empty-msg"
}, nD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, iD = { class: "mis-summary-card" }, dD = { class: "mis-summary-val" }, rD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, uD = { class: "ta-r mono-sm" }, cD = { class: "ta-r mono-sm" }, mD = { class: "ta-r mono-sm fw-600" }, vD = { class: "ta-r mono-sm" }, _D = { class: "ta-r mono-sm" }, pD = {
  key: 1,
  class: "empty-msg"
}, bD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, yD = { class: "ta-r mono-sm" }, hD = { class: "ta-r mono-sm fw-600 red" }, gD = {
  key: 1,
  class: "empty-msg"
}, kD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, fD = { class: "mis-summary-card" }, wD = { class: "mis-summary-val red" }, xD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, CD = { class: "ta-r mono-sm" }, SD = { class: "ta-r mono-sm fw-600" }, jD = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, MD = { class: "ta-r mono-sm" }, DD = { class: "ta-r mono-sm" }, TD = { class: "ta-r mono-sm fw-600" }, OD = {
  key: 2,
  class: "empty-msg"
}, RD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, PD = { class: "ta-r mono-sm" }, ID = { class: "ta-r mono-sm" }, VD = { class: "ta-r mono-sm" }, ND = { class: "ta-r mono-sm" }, ED = { class: "ta-r mono-sm" }, qD = {
  key: 1,
  class: "empty-msg"
}, BD = {
  key: 2,
  class: "empty-msg"
}, AD = {
  __name: "Reports",
  setup(F) {
    const S = xn, d = (i) => i != null ? "KES " + Number(i).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—", _ = (i) => Number(i || 0).toLocaleString("en-US", { maximumFractionDigits: 0 }), z = (i) => Number(i || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function G(i) {
      const t = String(i || "").length;
      let n = 24;
      return t > 18 ? n = 15 : t > 15 ? n = 17 : t > 12 ? n = 19 : t > 10 && (n = 21), { fontSize: n + "px" };
    }
    const ls = /* @__PURE__ */ new Date(), C = v(new Date(ls.getFullYear(), ls.getMonth(), 1).toISOString().slice(0, 10)), b = v(ls.toISOString().slice(0, 10)), k = v("mrn_lpo"), Bs = {
      mrn_lpo: "mrn_vs_lpo",
      lpo_grn: "lpo_vs_grn",
      proj_summary: "project_summary",
      supp_analysis: "supplier_analysis",
      asset_reg: "asset_register"
    }, ws = v(""), Re = v([]), ps = v([]), lt = v({}), Xo = N(() => !!lt.value[k.value]), ne = v(!1), Jt = v("");
    async function Ca() {
      const i = Bs[k.value];
      if (i) {
        ne.value = !0, Jt.value = "";
        try {
          const t = k.value === "asset_reg" ? { from_date: C.value, to_date: b.value } : ws.value ? { project: ws.value } : {}, n = await K("psd_books.api.procurement_reports." + i, t);
          if (ps.value = Array.isArray(n) ? n : (n == null ? void 0 : n.message) || [], lt.value = { ...lt.value, [k.value]: { rows: ps.value, project: ws.value } }, !Re.value.length) {
            const r = await K("psd_books.api.procurement_reports.project_summary", {});
            Re.value = (Array.isArray(r) ? r : (r == null ? void 0 : r.message) || []).map((p) => p.project);
          }
        } catch (t) {
          Jt.value = t.message || "Failed to load report", ps.value = [], lt.value = { ...lt.value, [k.value]: { rows: [], project: ws.value } };
        } finally {
          ne.value = !1;
        }
      }
    }
    const sl = {
      asset_reg: ["item_code", "adjustment_qty", "closing_qty", "issued_qty"],
      supp_analysis: ["supplier", "billed_value"],
      proj_summary: ["project", "billed_value"],
      lpo_grn: ["supplier", "project", "billed_qty"],
      mrn_lpo: ["project"]
    }, Sa = { project_name: "Project" }, ie = N(() => {
      const i = ps.value[0];
      if (!i) return [];
      const t = sl[k.value] || [];
      return Object.keys(i).filter((n) => !t.includes(n));
    }), ja = {
      mrn_lpo: ["MRN vs LPO", "How much of each material requisition has been ordered on LPOs"],
      lpo_grn: ["LPO vs GRN", "How much of each LPO has been received on goods receipts"],
      proj_summary: ["Project Summary", "Requisitions, LPOs, value received and billed for each project"],
      supp_analysis: ["Supplier Analysis", "LPOs, value and receipts for each supplier"],
      asset_reg: ["Asset Register", "Opening stock, purchases and total quantity of asset items"]
    }, tl = N(() => (ja[k.value] || [""])[0]), el = N(() => (ja[k.value] || ["", ""])[1]), al = { mrn: "MRN", lpo: "LPO", grn: "GRN", uom: "UOM" };
    function de(i) {
      return Sa[i] ? Sa[i] : i.split("_").map((t) => al[t] || t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
    }
    function Ma(i) {
      const t = ps.value[0];
      return !!t && typeof t[i] == "number";
    }
    function ol(i, t) {
      if (typeof i != "number") return i ?? "";
      const n = /_value$/.test(t);
      return i.toLocaleString("en-US", n ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 });
    }
    const w = v("");
    function es(i) {
      w.value = w.value === i ? "" : i;
    }
    let Pe = !1;
    function Y(i) {
      Pe = !0;
      try {
        i();
      } finally {
        Pe = !1;
      }
    }
    function Ws(i, t) {
      if (Pe) {
        const j = Vn(i);
        Zo(t.replace(/\.csv$/i, "") + ".xlsx", j[0] || [], j.slice(1));
        return;
      }
      const n = new Blob([i], { type: "text/csv;charset=utf-8" }), r = URL.createObjectURL(n), p = document.createElement("a");
      p.href = r, p.download = t, p.click(), URL.revokeObjectURL(r);
    }
    const Et = v(!1);
    function ll() {
      if (!ps.value.length) return;
      const i = ie.value, t = i.map((r) => de(r)), n = ps.value.map((r) => i.map((p) => r[p]));
      Zo(Bs[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".xlsx", t, n);
    }
    function nl() {
      if (!ps.value.length) return;
      const i = ie.value, t = (D) => {
        const V = D == null ? "" : String(D);
        return /[",\n]/.test(V) ? '"' + V.replace(/"/g, '""') + '"' : V;
      }, n = [i.map((D) => t(de(D))).join(",")];
      for (const D of ps.value) n.push(i.map((V) => t(D[V])).join(","));
      const r = new Blob([n.join(`
`)], { type: "text/csv;charset=utf-8" }), p = URL.createObjectURL(r), j = document.createElement("a");
      j.href = p, j.download = Bs[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", j.click(), URL.revokeObjectURL(p);
    }
    Go(k, (i) => {
      const t = lt.value[i];
      Jt.value = "", ps.value = t ? t.rows : [], t && (ws.value = t.project);
    }), Go(ws, () => {
      const i = lt.value[k.value];
      Bs[k.value] && i && i.project !== ws.value && Ca();
    });
    const { data: as, loading: il, execute: dl } = le("psd_books.db.queries.get_profit_and_loss"), { data: bs, loading: rl, execute: ul } = le("psd_books.db.queries.get_balance_sheet_totals"), { data: J, loading: cl, execute: ml } = le("psd_books.db.queries.get_cash_flow"), { data: nt, loading: vl, execute: _l } = le("psd_books.db.queries.get_gst_summary"), { data: Ks, loading: pl, execute: bl } = le("psd_books.db.queries.get_trial_balance"), it = v(!1), qt = v(null), Gs = v({ key: "", dir: "asc" });
    function re(i, t) {
      return (i || []).reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const ms = N(() => ({
      opening: re(Ks.value, "opening"),
      debit: re(Ks.value, "debit"),
      credit: re(Ks.value, "credit"),
      closing: re(Ks.value, "closing")
    })), ue = N(() => Math.abs(ms.value.debit - ms.value.credit) < 0.01), Ie = N(() => {
      const i = [...Ks.value || []], t = Gs.value.key;
      if (!t) return i;
      const n = Gs.value.dir === "desc" ? -1 : 1, r = (p) => t === "account" || t === "account_type" ? String(p[t] || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function Bt(i) {
      Gs.value.key === i ? Gs.value = { key: i, dir: Gs.value.dir === "asc" ? "desc" : "asc" } : Gs.value = { key: i, dir: "asc" };
    }
    function At(i) {
      return Gs.value.key !== i ? "" : Gs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const ce = ["Account", "Type", "Opening", "Debit", "Credit", "Closing"];
    function me(i) {
      return [i.account, i.account_type, i.opening || 0, i.debit || 0, i.credit || 0, i.closing || 0];
    }
    function yl() {
      var r;
      const i = Ie.value.map((p) => me(p).join("	")), t = ms.value;
      i.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join("	"));
      const n = [ce.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function hl(i) {
      var n;
      const t = [ce.join("	"), me(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function gl(i) {
      const t = [ce.join(","), me(i).join(",")].join(`
`), n = String(i.account || "account").replace(/[^A-Za-z0-9_-]+/g, "_");
      ks(t, "trial_balance_" + n + "_" + b.value + ".csv");
    }
    function Da() {
      var r;
      if (!((r = Ks.value) != null && r.length)) return;
      const i = Ie.value.map((p) => me(p).join(",")), t = ms.value;
      i.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join(","));
      const n = [ce.join(","), ...i].join(`
`);
      ks(n, "trial_balance_" + b.value + ".csv");
    }
    const rs = v([]), us = v([]), dt = v(!1), $t = v(null), Ys = v({ key: "", dir: "asc" });
    function xs(i, t) {
      return i.reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const Ms = N(() => ({
      current: xs(rs.value, "current"),
      days_1_30: xs(rs.value, "days_1_30"),
      days_31_60: xs(rs.value, "days_31_60"),
      days_61_90: xs(rs.value, "days_61_90"),
      days_90_plus: xs(rs.value, "days_90_plus"),
      total: xs(rs.value, "total")
    })), Ta = N(() => {
      const i = [...rs.value || []], t = Ys.value.key;
      if (!t) return i;
      const n = Ys.value.dir === "desc" ? -1 : 1, r = (p) => t === "customer" ? String(p.customer_name || p.customer || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function rt(i) {
      Ys.value.key === i ? Ys.value = { key: i, dir: Ys.value.dir === "asc" ? "desc" : "asc" } : Ys.value = { key: i, dir: "asc" };
    }
    function ut(i) {
      return Ys.value.key !== i ? "" : Ys.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function ve(i, t) {
      return [t ? i.customer_name || i.customer : i.supplier_name || i.supplier, i.current, i.days_1_30, i.days_31_60, i.days_61_90, i.days_90_plus, i.total];
    }
    function _e(i) {
      return [i ? "Customer" : "Vendor", "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"];
    }
    function kl() {
      var p;
      const i = _e(!0), t = Ta.value.map((j) => ve(j, !0).join("	")), n = Ms.value;
      t.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...t].join(`
`);
      (p = navigator.clipboard) != null && p.writeText && navigator.clipboard.writeText(r);
    }
    function Oa(i, t) {
      var p;
      const r = [_e(t).join("	"), ve(i, t).join("	")].join(`
`);
      (p = navigator.clipboard) != null && p.writeText && navigator.clipboard.writeText(r);
    }
    function Ra(i, t) {
      const r = [_e(t).join(","), ve(i, t).join(",")].join(`
`), p = String((t ? i.customer : i.supplier) || "party").replace(/[^A-Za-z0-9_-]+/g, "_");
      ks(r, (t ? "ar_aging_" : "ap_aging_") + p + "_" + b.value + ".csv");
    }
    const ct = v(!1), Lt = v(null), Js = v({ key: "", dir: "asc" }), Ds = N(() => ({
      current: xs(us.value, "current"),
      days_1_30: xs(us.value, "days_1_30"),
      days_31_60: xs(us.value, "days_31_60"),
      days_61_90: xs(us.value, "days_61_90"),
      days_90_plus: xs(us.value, "days_90_plus"),
      total: xs(us.value, "total")
    })), Pa = N(() => {
      const i = [...us.value || []], t = Js.value.key;
      if (!t) return i;
      const n = Js.value.dir === "desc" ? -1 : 1, r = (p) => t === "supplier" ? String(p.supplier_name || p.supplier || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function mt(i) {
      Js.value.key === i ? Js.value = { key: i, dir: Js.value.dir === "asc" ? "desc" : "asc" } : Js.value = { key: i, dir: "asc" };
    }
    function vt(i) {
      return Js.value.key !== i ? "" : Js.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function fl() {
      var p;
      const i = _e(!1), t = Pa.value.map((j) => ve(j, !1).join("	")), n = Ds.value;
      t.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...t].join(`
`);
      (p = navigator.clipboard) != null && p.writeText && navigator.clipboard.writeText(r);
    }
    const Ts = v([]), Zt = v([]), wl = N(() => Math.max(
      ...Zt.value.flatMap((i) => [Math.abs(i.operating || 0), Math.abs(i.investing || 0), Math.abs(i.financing || 0)]),
      1
    ));
    function Ve(i) {
      const n = Math.round(Math.abs(Number(i) || 0) / wl.value * 60);
      return (Number(i) || 0) >= 0 ? { height: n + "px", bottom: "50%", top: "auto" } : { height: n + "px", top: "50%", bottom: "auto" };
    }
    function xl(i, t) {
      if (!i || !t) return [];
      const n = new Date(i), r = new Date(t);
      if (isNaN(n) || isNaN(r) || n > r) return [];
      const p = [];
      let j = new Date(n.getFullYear(), n.getMonth(), 1);
      for (; j <= r; ) {
        const D = new Date(j.getFullYear(), j.getMonth(), 1), V = new Date(j.getFullYear(), j.getMonth() + 1, 0), Es = D < n ? n : D, Vt = V > r ? r : V;
        p.push({
          from: Es.toISOString().slice(0, 10),
          to: Vt.toISOString().slice(0, 10),
          month: j.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }), j = new Date(j.getFullYear(), j.getMonth() + 1, 1);
      }
      return p;
    }
    function Ia() {
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
      Ws(n, "cash_flow_" + b.value + ".csv");
    }
    const Cl = { CGST: "Central Goods and Services Tax", SGST: "State Goods and Services Tax", IGST: "Integrated Goods and Services Tax", UTGST: "Union Territory Goods and Services Tax" }, Va = ["gst-c-blue", "gst-c-emerald", "gst-c-cyan", "gst-c-amber", "gst-c-violet"], Sl = N(() => (nt.value || []).map((i, t) => ({
      ...i,
      desc: Cl[i.tax_type] || "Goods and Services Tax",
      cls: Va[t % Va.length]
    }))), Na = N(() => (nt.value || []).reduce((i, t) => i + (Number(t.invoice_count) || 0), 0)), Ea = N(() => (nt.value || []).reduce((i, t) => i + (Number(t.total_tax) || 0), 0));
    function qa() {
      var r;
      if (!((r = nt.value) != null && r.length)) return;
      const i = ["Tax Type", "Invoice Count", "Total Tax"].join(","), t = nt.value.map((p) => [p.tax_type, p.invoice_count, p.total_tax].join(","));
      t.push(["Total", Na.value, Ea.value].join(","));
      const n = [i, ...t].join(`
`);
      Ws(n, "gst_summary_" + b.value + ".csv");
    }
    const Ne = v(!1), Ee = v(!1), Ba = v(!1), Aa = v(!1), As = v([]), qe = v(!1), $a = v(!1), $s = v([]), Be = v(!1), La = v(!1), cs = v([]), Ae = v(!1), Qa = v(!1), ds = v([]), $e = v(!1), Fa = v(!1), Os = v(/* @__PURE__ */ new Set()), Le = v(!1), Qe = v(!1), ns = v(null);
    async function za(i) {
      Le.value = !0, Qe.value = !0, ns.value = null;
      try {
        ns.value = await K("psd_books.db.queries.get_invoice_profit_detail", { invoice: i });
      } catch {
        ns.value = null;
      }
      Qe.value = !1;
    }
    const ss = v(null), Fe = v(!1), Ha = v(!1), _t = v(!1), Xt = v(null), Qt = v(null), Ft = v({ key: "", dir: "asc" }), pt = v({ key: "", dir: "asc" });
    function jl(i, t, n) {
      const r = t.key;
      if (!r) return i;
      const p = t.dir === "desc" ? -1 : 1, j = (D) => n.includes(r) ? String(D[r] || "").toLowerCase() : Number(D[r] || 0);
      return [...i].sort((D, V) => {
        const Es = j(D), Vt = j(V);
        return typeof Es == "string" ? p * Es.localeCompare(Vt) : p * (Es - Vt);
      });
    }
    const Wa = N(() => {
      var i;
      return jl(((i = ss.value) == null ? void 0 : i.accounts) || [], Ft.value, ["account"]);
    });
    function pe(i) {
      Ft.value = Ft.value.key === i ? { key: i, dir: Ft.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function be(i) {
      return Ft.value.key !== i ? "" : Ft.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const ze = N(() => {
      var p;
      const i = [...((p = ss.value) == null ? void 0 : p.items) || []], t = pt.value.key;
      if (!t) return i;
      const n = pt.value.dir === "desc" ? -1 : 1, r = (j) => t === "item" ? String(j.item_name || j.item_code || "").toLowerCase() : t === "warehouse" ? String(j.warehouse || "").toLowerCase() : Number(j[t] || 0);
      return i.sort((j, D) => {
        const V = r(j), Es = r(D);
        return typeof V == "string" ? n * V.localeCompare(Es) : n * (V - Es);
      }), i;
    });
    function se(i) {
      pt.value = pt.value.key === i ? { key: i, dir: pt.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function te(i) {
      return pt.value.key !== i ? "" : pt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const He = N(() => {
      var i;
      return (((i = ss.value) == null ? void 0 : i.items) || []).reduce((t, n) => t + Number(n.stock_value || 0), 0);
    }), Ua = ["Inventory Account", "Bin Stock Value", "GL Balance", "Difference", "Status"];
    function Ka(i) {
      return [i.account, i.bin_stock_value, i.gl_balance, i.difference, i.is_reconciled ? "OK" : "DRIFT"];
    }
    function Ml(i) {
      var n;
      const t = [Ua.join("	"), Ka(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Dl() {
      var n, r;
      if (!((r = (n = ss.value) == null ? void 0 : n.accounts) != null && r.length)) return;
      const i = Wa.value.map((p) => Ka(p).join(",")), t = [Ua.join(","), ...i].join(`
`);
      ks(t, "stock_vs_gl_accounts_" + b.value + ".csv");
    }
    const ye = ["Item", "Warehouse", "Qty", "Valuation Rate", "Stock Value"];
    function he(i) {
      return [i.item_name || i.item_code, i.warehouse, i.actual_qty, i.valuation_rate, i.stock_value];
    }
    function Tl(i) {
      var n;
      const t = [ye.join("	"), he(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Ol() {
      var n;
      const i = ze.value.map((r) => he(r).join("	"));
      i.push(["Total", "", "", "", He.value].join("	"));
      const t = [ye.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Rl(i) {
      const t = [ye.join(","), he(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_") + "_" + String(i.warehouse || "").replace(/[^A-Za-z0-9_-]+/g, "_");
      ks(t, "stock_vs_gl_item_" + n + ".csv");
    }
    function Pl() {
      var n, r;
      if (!((r = (n = ss.value) == null ? void 0 : n.items) != null && r.length)) return;
      const i = ze.value.map((p) => he(p).join(","));
      i.push(["Total", "", "", "", He.value].join(","));
      const t = [ye.join(","), ...i].join(`
`);
      ks(t, "stock_vs_gl_items_" + b.value + ".csv");
    }
    const Cs = v(null), We = v(!1), Ga = v(!1), ee = v(null), Ue = v(!1), Ya = v(!1), Ke = v(""), ge = v(""), ke = N(() => {
      var t;
      const i = Ke.value.trim().toLowerCase();
      return (((t = ee.value) == null ? void 0 : t.rows) || []).filter(
        (n) => (!ge.value || n.warehouse === ge.value) && (!i || (n.item_code || "").toLowerCase().includes(i) || (n.item_name || "").toLowerCase().includes(i))
      );
    }), Z = v(null), Ge = v(!1), Ja = v(!1), R = v(null), Ye = v(!1), Za = v(!1), ys = v("summary"), bt = v(0), Il = [
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
    ], Xa = N(
      () => {
        var i, t;
        return bt.value ? (((t = (i = R.value) == null ? void 0 : i.summary) == null ? void 0 : t.grand_total) || 0) / bt.value * 100 : 0;
      }
    ), I = v(null), Je = v(!1), so = v(!1), Rs = v("total"), yt = v(0), Vl = [
      { key: "total", label: "Total Receivables" },
      { key: "outstanding", label: "Customer Outstanding" },
      { key: "ageing", label: "Ageing" },
      { key: "coll_target", label: "Collection Target vs Achievement" },
      { key: "daily_coll", label: "Daily Collection" },
      { key: "overdue", label: "Overdue Collection" },
      { key: "credit", label: "Credit Limit & Utilisation" },
      { key: "efficiency", label: "Collection Efficiency" }
    ], to = N(
      () => {
        var i, t;
        return yt.value ? (((t = (i = I.value) == null ? void 0 : i.daily_collection) == null ? void 0 : t.total) || 0) / yt.value * 100 : 0;
      }
    ), q = v(null), Ze = v(!1), eo = v(!1), Ps = v("summary"), ht = v(0), Nl = [
      { key: "summary", label: "Purchase Summary" },
      { key: "supplier", label: "Supplier-wise" },
      { key: "product", label: "Product-wise" },
      { key: "target", label: "Target / Budget vs Actual" },
      { key: "price_variance", label: "Price Variance" },
      { key: "pending_po", label: "Pending Purchase Orders" },
      { key: "pending_receipts", label: "Pending Material Receipts" },
      { key: "returns", label: "Purchase Return" }
    ], ao = N(
      () => {
        var i, t;
        return ht.value ? (((t = (i = q.value) == null ? void 0 : i.summary) == null ? void 0 : t.grand_total) || 0) / ht.value * 100 : 0;
      }
    ), O = v(null), Xe = v(!1), oo = v(!1), hs = v("current_stock"), El = [
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
    ], T = v(null), sa = v(!1), lo = v(!1), gs = v("plan_vs_actual"), ql = [
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
    ], A = v(null), ta = v(!1), no = v(!1), Ss = v("sales"), Bl = [
      { key: "sales", label: "Product-wise Sales" },
      { key: "profit", label: "Product-wise Profit" },
      { key: "cost", label: "Product-wise Cost" },
      { key: "margin", label: "Product-wise Margin %" },
      { key: "production", label: "Product-wise Production" },
      { key: "stock", label: "Product-wise Stock" },
      { key: "wastage", label: "Product-wise Wastage" },
      { key: "top_selling", label: "Top Selling Products" },
      { key: "low_selling", label: "Low Selling Products" }
    ], H = v(null), ea = v(!1), io = v(!1), Us = v("summary"), Al = [
      { key: "summary", label: "Dispatch Summary" },
      { key: "pending_dispatch", label: "Pending Dispatch" },
      { key: "delivery_pending", label: "Delivery Pending" },
      { key: "delayed_delivery", label: "Delayed Delivery" },
      { key: "customer_pending", label: "Customer-wise Pending Delivery" },
      { key: "transport_wise", label: "Transport-wise Dispatch" }
    ], B = v(null), aa = v(!1), ro = v(!1), vs = v("summary"), $l = [
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
    ], W = v(null), oa = v(!1), uo = v(!1), Ls = v("summary"), Ll = [
      { key: "summary", label: "Summary" },
      { key: "product", label: "Product-wise Profit" },
      { key: "customer", label: "Customer-wise Profit" },
      { key: "order", label: "Order-wise Profit" },
      { key: "branch", label: "Branch-wise Profit" },
      { key: "salesperson", label: "Salesperson-wise Profit" },
      { key: "monthly_trend", label: "Monthly Profit Trend" }
    ], U = v(null), la = v(!1), co = v(!1), Is = v("summary"), Ql = [
      { key: "summary", label: "Total Expenses" },
      { key: "department", label: "Department-wise" },
      { key: "category", label: "Expense Category-wise" },
      { key: "budget", label: "Budget vs Actual" },
      { key: "fixed", label: "Fixed Expenses" },
      { key: "variable", label: "Variable Expenses" },
      { key: "trend", label: "Expense Trend" },
      { key: "unusual", label: "Unusual / Excess" }
    ], X = v(null), na = v(!1), mo = v(!1), Qs = v("summary"), Fl = [
      { key: "summary", label: "Supplier Outstanding" },
      { key: "ageing", label: "Payable Ageing" },
      { key: "overdue", label: "Overdue Payables" },
      { key: "due_week", label: "Due This Week" },
      { key: "due_month", label: "Due This Month" },
      { key: "supplier", label: "Supplier-wise Outstanding" },
      { key: "forecast", label: "Payment Due Forecast" }
    ], E = v(null), ia = v(!1), vo = v(!1), Vs = v("cash_position"), zl = [
      { key: "cash_position", label: "Cash Position" },
      { key: "bank_balance", label: "Bank Balance" },
      { key: "daily_cash", label: "Daily Cash Flow" },
      { key: "daily_bank", label: "Daily Bank Movement" },
      { key: "receipts", label: "Receipts" },
      { key: "payments", label: "Payments" },
      { key: "forecast", label: "Cash Forecast" },
      { key: "fund_requirement", label: "Fund Requirement" }
    ], M = v(null), da = v(!1), _o = v(!1), js = v("new_customers"), Hl = [
      { key: "new_customers", label: "New Customers" },
      { key: "active_customers", label: "Active Customers" },
      { key: "repeat_customers", label: "Repeat Customers" },
      { key: "customer_wise_sales", label: "Customer-wise Sales" },
      { key: "customer_wise_outstanding", label: "Customer-wise Outstanding" },
      { key: "customer_wise_profit", label: "Customer-wise Profit" },
      { key: "customer_retention", label: "Customer Retention" },
      { key: "top_customers", label: "Top Customers" },
      { key: "inactive_customers", label: "Inactive Customers" }
    ], $ = v(null), ra = v(!1), po = v(!1), Fs = v("supplier_wise_purchase"), Wl = [
      { key: "supplier_wise_purchase", label: "Supplier-wise Purchase" },
      { key: "supplier_outstanding", label: "Supplier Outstanding" },
      { key: "supplier_payment_ageing", label: "Supplier Payment Ageing" },
      { key: "purchase_price_comparison", label: "Purchase Price Comparison" },
      { key: "supplier_performance", label: "Supplier Performance" },
      { key: "delivery_performance", label: "Delivery Performance" },
      { key: "quality_rejection", label: "Quality / Rejection" }
    ], L = v(null), ua = v(!1), bo = v(!1), Ns = v("employee_attendance"), Ul = [
      { key: "employee_attendance", label: "Employee Attendance" },
      { key: "department_manpower", label: "Department-wise Manpower" },
      { key: "salesperson_target", label: "Salesperson Target vs Achievement" },
      { key: "salesperson_collection", label: "Salesperson Collection" },
      { key: "production_productivity", label: "Production Employee Productivity" },
      { key: "overtime", label: "Overtime" },
      { key: "labour_cost", label: "Labour Cost" },
      { key: "employee_performance", label: "Employee Performance" }
    ], zt = v({});
    function ca(i) {
      const t = zt.value[i.sales_person];
      return t ? Number(i.total_amount) / t * 100 : 0;
    }
    function yo() {
      const i = ["Section", "Line", "Amount"].join(","), t = [];
      ho.value.forEach((r) => {
        t.push([r.label, "", r.total].join(",")), r.items.forEach((p) => t.push([r.label, p.label, p.value].join(",")));
      });
      const n = [i, ...t].join(`
`);
      Ws(n, "balance_sheet_" + b.value + ".csv");
    }
    const ma = N(() => {
      if (!bs.value) return !1;
      const i = Number(bs.value.total_assets) || 0, t = Number(bs.value.total_liabilities) || 0, n = Number(bs.value.total_equity) || 0;
      return Math.abs(i - (t + n)) < 1;
    }), fe = v({ assets: !0, liabilities: !0, equity: !0 });
    function Kl(i) {
      fe.value[i] = !fe.value[i];
    }
    const ho = N(() => {
      const i = bs.value || {}, t = (n) => Number(n) || 0;
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
    }), go = N(() => Math.max(...Ts.value.flatMap((i) => [i.income || 0, i.expense || 0]), 1));
    function ko(i) {
      return Math.round(Math.max(0, i) / go.value * 130);
    }
    const Gl = N(() => {
      const i = go.value;
      return [i, i * 0.66, i * 0.33, 0].map((t) => Math.round(t));
    });
    function P(i) {
      return i ? (/* @__PURE__ */ new Date(i + "T00:00:00")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    }
    const Ht = v("monthly");
    function va(i, t) {
      return t == null || i == null ? null : t === 0 ? i === 0 ? 0 : null : (i - t) / Math.abs(t) * 100;
    }
    const gt = N(() => Ts.value.length > 1 ? Ts.value[Ts.value.length - 2] : null), kt = N(() => Ts.value.length ? Ts.value[Ts.value.length - 1] : null), fo = N(() => kt.value && gt.value ? va(kt.value.income, gt.value.income) : null), wo = N(() => kt.value && gt.value ? va(kt.value.expense, gt.value.expense) : null), xo = N(() => !kt.value || !gt.value ? null : va((kt.value.income || 0) - (kt.value.expense || 0), (gt.value.income || 0) - (gt.value.expense || 0)));
    function _a(i, t) {
      if (i === null) return "muted";
      if (i === 0) return "neutral";
      const n = i > 0;
      return (t ? !n : n) ? "up" : "down";
    }
    function pa(i) {
      return i === null || i === 0 ? "— No change" : `${i > 0 ? "↑" : "↓"} ${Math.abs(Math.round(i))}% vs previous period`;
    }
    const Yl = N(() => {
      if (!as.value) return [];
      const i = [];
      return Number(as.value.total_expense) > Number(as.value.total_income) && i.push({ icon: "↗", tone: "warn", title: "Expenses are higher", desc: "Your expenses are higher than income in this period." }), Number(as.value.net_profit) < 0 ? i.push({ icon: "↘", tone: "loss", title: "Net loss", desc: `You had a net loss of ${S(Math.abs(as.value.net_profit))} in the selected period.` }) : Number(as.value.net_profit) > 0 && i.push({ icon: "↗", tone: "good", title: "Net profit", desc: `You made a net profit of ${S(as.value.net_profit)} in the selected period.` }), i;
    }), ft = N(() => cs.value.filter((i) => i.cost_rate).reduce((i, t) => i + Number(t.profit || 0), 0)), we = N(() => {
      const i = cs.value.filter((r) => r.cost_rate), t = i.reduce((r, p) => r + Number(p.revenue || 0), 0), n = i.reduce((r, p) => r + Number(p.profit || 0), 0);
      return t !== 0 ? n / t * 100 : 0;
    }), Wt = N(() => cs.value.filter((i) => !i.cost_rate).length), wt = v(!1), Ut = v(null), Zs = v({ key: "", dir: "asc" }), ba = N(() => {
      const i = [...cs.value || []], t = Zs.value.key;
      if (!t) return i;
      const n = Zs.value.dir === "desc" ? -1 : 1, r = (p) => t === "item" ? String(p.item_name || p.item_code || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function xt(i) {
      Zs.value.key === i ? Zs.value = { key: i, dir: Zs.value.dir === "asc" ? "desc" : "asc" } : Zs.value = { key: i, dir: "asc" };
    }
    function Ct(i) {
      return Zs.value.key !== i ? "" : Zs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const xe = ["Item", "Qty Sold", "Revenue", "Cost Rate", "Total Cost", "Profit", "Margin %"];
    function Ce(i) {
      return [i.item_name || i.item_code, i.qty_sold, i.revenue, i.cost_rate, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function Jl() {
      var n;
      const i = ba.value.map((r) => Ce(r).join("	")), t = [xe.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Zl(i) {
      var n;
      const t = [xe.join("	"), Ce(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Xl(i) {
      const t = [xe.join(","), Ce(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      ks(t, "profit_wise_report_" + n + "_" + C.value + "_to_" + b.value + ".csv");
    }
    const St = N(
      () => ds.value.filter((i) => Os.value.has(i.invoice))
    ), Co = N(
      () => ds.value.length > 0 && Os.value.size === ds.value.length
    );
    function sn(i) {
      const t = new Set(Os.value);
      t.has(i) ? t.delete(i) : t.add(i), Os.value = t;
    }
    function tn() {
      Os.value = Co.value ? /* @__PURE__ */ new Set() : new Set(ds.value.map((i) => i.invoice));
    }
    function Kt(i, t) {
      return i.reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const is = N(() => ({
      revenue: Kt(ds.value, "revenue"),
      total_cost: Kt(ds.value, "total_cost"),
      profit: Kt(ds.value, "profit")
    })), ae = N(() => ({
      count: St.value.length,
      revenue: Kt(St.value, "revenue"),
      total_cost: Kt(St.value, "total_cost"),
      profit: Kt(St.value, "profit")
    })), jt = v(!1), Mt = v(null), Xs = v({ key: "", dir: "asc" }), ya = N(() => {
      const i = [...ds.value || []], t = Xs.value.key;
      if (!t) return i;
      const n = Xs.value.dir === "desc" ? -1 : 1, r = (p) => t === "invoice" || t === "posting_date" ? String(p[t] || "") : t === "customer" ? String(p.customer_name || p.customer || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function Dt(i) {
      Xs.value.key === i ? Xs.value = { key: i, dir: Xs.value.dir === "asc" ? "desc" : "asc" } : Xs.value = { key: i, dir: "asc" };
    }
    function Tt(i) {
      return Xs.value.key !== i ? "" : Xs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Se = ["Invoice", "Date", "Customer", "Revenue", "Est. Cost", "Profit", "Margin %"];
    function je(i) {
      return [i.invoice, i.posting_date, i.customer_name || i.customer, i.revenue, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function en() {
      var n;
      const i = (Os.value.size ? St.value : ya.value).map((r) => je(r).join("	")), t = [Se.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function an(i) {
      var n;
      const t = [Se.join("	"), je(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function on(i) {
      const t = [Se.join(","), je(i).join(",")].join(`
`);
      ks(t, "invoice_profitability_" + i.invoice + ".csv");
    }
    async function ln() {
      if (Bs[k.value]) {
        await Ca();
        return;
      }
      if (!["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) && C.value && b.value && C.value > b.value) {
        alert("From date cannot be after To date.");
        return;
      }
      const t = await fn(), n = { company: t, from_date: C.value || "", to_date: b.value || "" };
      if (k.value === "pl") {
        await dl(n);
        try {
          Ts.value = await K("psd_books.db.queries.get_pl_monthly_breakdown", n) || [];
        } catch {
          Ts.value = [];
        }
      }
      if (k.value === "bs" && await ul({ company: t, as_of_date: b.value }), k.value === "cf") {
        await ml(n);
        try {
          const r = xl(C.value, b.value), p = await Promise.all(r.map(
            (j) => K("psd_books.db.queries.get_cash_flow", { company: t, from_date: j.from, to_date: j.to })
          ));
          Zt.value = r.map((j, D) => ({ month: j.month, ...p[D] || {} }));
        } catch {
          Zt.value = [];
        }
      }
      if (k.value === "gst" && await _l(n), k.value === "tb" && await bl(n), k.value === "ar") {
        Ne.value = !0, Ba.value = !0;
        try {
          rs.value = await K("psd_books.db.queries.get_ar_aging", { company: t, as_of_date: b.value }) || [];
        } catch {
          rs.value = [];
        }
        Ne.value = !1;
      }
      if (k.value === "ap") {
        Ee.value = !0, Aa.value = !0;
        try {
          us.value = await K("psd_books.db.queries.get_ap_aging", { company: t, as_of_date: b.value }) || [];
        } catch {
          us.value = [];
        }
        Ee.value = !1;
      }
      if (k.value === "items") {
        qe.value = !0, $a.value = !0;
        try {
          As.value = await K("psd_books.db.queries.get_item_wise_sales", n) || [];
        } catch {
          As.value = [];
        }
        qe.value = !1;
      }
      if (k.value === "customers") {
        Be.value = !0, La.value = !0;
        try {
          $s.value = await K("psd_books.db.queries.get_customer_wise_sales", n) || [];
        } catch {
          $s.value = [];
        }
        Be.value = !1;
      }
      if (k.value === "profit") {
        Ae.value = !0, Qa.value = !0;
        try {
          cs.value = await K("psd_books.db.queries.get_profit_wise_report", n) || [];
        } catch {
          cs.value = [];
        }
        Ae.value = !1;
      }
      if (k.value === "invoice_profit") {
        $e.value = !0, Fa.value = !0, Os.value = /* @__PURE__ */ new Set();
        try {
          ds.value = await K("psd_books.db.queries.get_invoice_wise_profit", n) || [];
        } catch {
          ds.value = [];
        }
        $e.value = !1;
      }
      if (k.value === "stockgl") {
        Fe.value = !0, Ha.value = !0;
        try {
          ss.value = await K("psd_books.db.queries.get_inventory_reconciliation", { company: t }) || null;
        } catch {
          ss.value = null;
        }
        Fe.value = !1;
      }
      if (k.value === "stockval") {
        We.value = !0, Ga.value = !0;
        try {
          Cs.value = await K("psd_books.api.inventory.get_stock_valuation_report", { as_of_date: b.value }) || null;
        } catch {
          Cs.value = null;
        }
        We.value = !1;
      }
      if (k.value === "price_mrp") {
        Ue.value = !0, Ya.value = !0;
        try {
          ee.value = await K("psd_books.api.inventory.get_selling_mrp_report", {}) || null;
        } catch {
          ee.value = null;
        }
        Ue.value = !1;
      }
      if (k.value === "mis") {
        Ge.value = !0, Ja.value = !0;
        try {
          Z.value = await K("psd_books.db.queries.get_daily_business_mis", n) || null;
        } catch {
          Z.value = null;
        }
        Ge.value = !1;
      }
      if (k.value === "sales_mis") {
        Ye.value = !0, Za.value = !0;
        try {
          R.value = await K("psd_books.db.queries.get_sales_mis", n) || null;
        } catch {
          R.value = null;
        }
        Ye.value = !1;
      }
      if (k.value === "receivables") {
        Je.value = !0, so.value = !0;
        try {
          I.value = await K("psd_books.db.queries.get_receivables_mis", n) || null;
        } catch {
          I.value = null;
        }
        Je.value = !1;
      }
      if (k.value === "purchase_mis") {
        Ze.value = !0, eo.value = !0;
        try {
          q.value = await K("psd_books.db.queries.get_purchase_mis", n) || null;
        } catch {
          q.value = null;
        }
        Ze.value = !1;
      }
      if (k.value === "inventory_mis") {
        Xe.value = !0, oo.value = !0;
        try {
          O.value = await K("psd_books.db.queries.get_inventory_mis", n) || null;
        } catch {
          O.value = null;
        }
        Xe.value = !1;
      }
      if (k.value === "production_mis") {
        sa.value = !0, lo.value = !0;
        try {
          T.value = await K("psd_books.db.queries.get_production_mis", n) || null;
        } catch {
          T.value = null;
        }
        sa.value = !1;
      }
      if (k.value === "product_mis") {
        ta.value = !0, no.value = !0;
        try {
          A.value = await K("psd_books.db.queries.get_product_mis", n) || null;
        } catch {
          A.value = null;
        }
        ta.value = !1;
      }
      if (k.value === "dispatch_mis") {
        ea.value = !0, io.value = !0;
        try {
          H.value = await K("psd_books.db.queries.get_dispatch_delivery_mis", n) || null;
        } catch {
          H.value = null;
        }
        ea.value = !1;
      }
      if (k.value === "order_mis") {
        aa.value = !0, ro.value = !0;
        try {
          B.value = await K("psd_books.db.queries.get_order_mis", n) || null;
        } catch {
          B.value = null;
        }
        aa.value = !1;
      }
      if (k.value === "profitability_mis") {
        oa.value = !0, uo.value = !0;
        try {
          W.value = await K("psd_books.db.queries.get_profitability_mis", n) || null;
        } catch {
          W.value = null;
        }
        oa.value = !1;
      }
      if (k.value === "expense_mis") {
        la.value = !0, co.value = !0;
        try {
          U.value = await K("psd_books.db.queries.get_expense_mis", n) || null;
        } catch {
          U.value = null;
        }
        la.value = !1;
      }
      if (k.value === "payables_mis") {
        na.value = !0, mo.value = !0;
        try {
          X.value = await K("psd_books.db.queries.get_payables_mis", { company: t, as_of_date: b.value }) || null;
        } catch {
          X.value = null;
        }
        na.value = !1;
      }
      if (k.value === "cash_bank_mis") {
        ia.value = !0, vo.value = !0;
        try {
          E.value = await K("psd_books.db.queries.get_cash_bank_mis", n) || null;
        } catch {
          E.value = null;
        }
        ia.value = !1;
      }
      if (k.value === "customer_mis") {
        da.value = !0, _o.value = !0;
        try {
          M.value = await K("psd_books.db.queries.get_customer_mis", n) || null;
        } catch {
          M.value = null;
        }
        da.value = !1;
      }
      if (k.value === "supplier_mis") {
        ra.value = !0, po.value = !0;
        try {
          $.value = await K("psd_books.db.queries.get_supplier_mis", n) || null;
        } catch {
          $.value = null;
        }
        ra.value = !1;
      }
      if (k.value === "employee_mis") {
        ua.value = !0, bo.value = !0;
        try {
          L.value = await K("psd_books.db.queries.get_employee_mis", n) || null;
        } catch {
          L.value = null;
        }
        ua.value = !1;
      }
    }
    const Ot = v(!1), Gt = v(null), st = v({ key: "", dir: "asc" }), zs = N(() => (As.value || []).reduce((i, t) => ({
      invoices: i.invoices + (Number(t.invoice_count) || 0),
      qty: i.qty + (Number(t.qty_sold) || 0),
      discount: i.discount + (Number(t.total_discount) || 0),
      amount: i.amount + (Number(t.total_amount) || 0)
    }), { invoices: 0, qty: 0, discount: 0, amount: 0 })), ha = N(() => {
      const i = [...As.value || []], t = st.value.key;
      if (!t) return i;
      const n = st.value.dir === "desc" ? -1 : 1, r = (p) => t === "item" ? String(p.item_name || p.item_code || "").toLowerCase() : t === "uom" ? String(p.uom || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function Rt(i) {
      st.value.key === i ? st.value = { key: i, dir: st.value.dir === "asc" ? "desc" : "asc" } : st.value = { key: i, dir: "asc" };
    }
    function Pt(i) {
      return st.value.key !== i ? "" : st.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Me = ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Discount", "Total Amount"];
    function De(i) {
      return [i.item_name || i.item_code, i.uom || "", i.invoice_count, i.qty_sold, i.avg_rate, i.total_discount || 0, i.total_amount];
    }
    function ks(i, t) {
      Ws(i, t);
    }
    function nn() {
      var r;
      const i = ha.value.map((p) => De(p).join("	")), t = zs.value;
      i.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join("	"));
      const n = [Me.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function dn(i) {
      var n;
      const t = [Me.join("	"), De(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function rn(i) {
      const t = [Me.join(","), De(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      ks(t, "item_wise_sales_" + n + "_" + C.value + "_to_" + b.value + ".csv");
    }
    function ga() {
      var r;
      if (!((r = As.value) != null && r.length)) return;
      const i = ha.value.map((p) => De(p).join(",")), t = zs.value;
      i.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join(","));
      const n = [Me.join(","), ...i].join(`
`);
      ks(n, "item_wise_sales_" + C.value + "_to_" + b.value + ".csv");
    }
    const It = v(!1), Yt = v(null), tt = v({ key: "", dir: "asc" }), _s = N(() => ($s.value || []).reduce((i, t) => ({
      invoices: i.invoices + (Number(t.invoice_count) || 0),
      net: i.net + (Number(t.net_total) || 0),
      discount: i.discount + (Number(t.total_discount) || 0),
      tax: i.tax + (Number(t.total_tax) || 0),
      outstanding: i.outstanding + (Number(t.outstanding_amount) || 0),
      amount: i.amount + (Number(t.total_amount) || 0)
    }), { invoices: 0, net: 0, discount: 0, tax: 0, outstanding: 0, amount: 0 })), ka = N(() => {
      const i = [...$s.value || []], t = tt.value.key;
      if (!t) return i;
      const n = tt.value.dir === "desc" ? -1 : 1, r = (p) => t === "customer" ? String(p.customer_name || p.customer || "").toLowerCase() : Number(p[t] || 0);
      return i.sort((p, j) => {
        const D = r(p), V = r(j);
        return typeof D == "string" ? n * D.localeCompare(V) : n * (D - V);
      }), i;
    });
    function et(i) {
      tt.value.key === i ? tt.value = { key: i, dir: tt.value.dir === "asc" ? "desc" : "asc" } : tt.value = { key: i, dir: "asc" };
    }
    function at(i) {
      return tt.value.key !== i ? "" : tt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Te = ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Avg Invoice", "Outstanding", "Total Amount"];
    function Oe(i) {
      return [i.customer_name || i.customer, i.invoice_count, i.net_total, i.total_discount || 0, i.total_tax, i.avg_invoice_value, i.outstanding_amount || 0, i.total_amount];
    }
    function un() {
      var r;
      const i = ka.value.map((p) => Oe(p).join("	")), t = _s.value;
      i.push(["Total", t.invoices, t.net, t.discount, t.tax, "", t.outstanding, t.amount].join("	"));
      const n = [Te.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function cn(i) {
      var n;
      const t = [Te.join("	"), Oe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function mn(i) {
      const t = [Te.join(","), Oe(i).join(",")].join(`
`), n = String(i.customer || i.customer_name || "customer").replace(/[^A-Za-z0-9_-]+/g, "_");
      ks(t, "customer_wise_sales_" + n + "_" + C.value + "_to_" + b.value + ".csv");
    }
    function fa() {
      var p;
      if (!((p = $s.value) != null && p.length)) return;
      const i = Te.join(","), t = ka.value.map((j) => Oe(j).join(",")), n = _s.value;
      t.push(["Total", n.invoices, n.net, n.discount, n.tax, "", n.outstanding, n.amount].join(","));
      const r = [i, ...t].join(`
`);
      Ws(r, "customer_wise_sales_" + C.value + "_to_" + b.value + ".csv");
    }
    function wa() {
      var n;
      if (!((n = cs.value) != null && n.length)) return;
      const i = ba.value.map((r) => Ce(r).join(",")), t = [xe.join(","), ...i].join(`
`);
      ks(t, "profit_wise_report_" + C.value + "_to_" + b.value + ".csv");
    }
    function xa() {
      var r;
      if (!((r = ds.value) != null && r.length)) return;
      const t = (St.value.length ? St.value : ya.value).map((p) => je(p).join(",")), n = [Se.join(","), ...t].join(`
`);
      ks(n, "invoice_profitability_" + C.value + "_to_" + b.value + ".csv");
    }
    function So() {
      var p, j;
      const i = ["Warehouse", "Stock Value", "% of Total"].join(","), t = ((p = Cs.value) == null ? void 0 : p.grand_total) || 0, n = (((j = Cs.value) == null ? void 0 : j.by_warehouse) || []).map(
        (D) => [D.warehouse, D.stock_value, t ? (D.stock_value / t * 100).toFixed(1) : "0"].join(",")
      ), r = [i, ...n].join(`
`);
      Ws(r, "stock_valuation_summary_" + b.value + ".csv");
    }
    function jo() {
      const i = (t) => '"' + String(t ?? "").replace(/"/g, '""') + '"';
      h(
        ["Item Code", "Item Name", "Warehouse", "Stock Qty", "UOM", "Selling Price", "MRP"],
        ke.value.map((t) => [i(t.item_code), i(t.item_name), i(t.warehouse), t.qty, i(t.uom), t.selling_price, t.mrp].join(",")),
        "selling_price_mrp_" + b.value + ".csv"
      );
    }
    function Mo() {
      var r;
      const i = ["Date", "Sales", "Collection", "Purchase", "Expenses", "Dispatch Qty", "Production Qty", "Stock In", "Stock Out", "Outstanding"].join(","), t = (((r = Z.value) == null ? void 0 : r.days) || []).map(
        (p) => [p.date, p.sales_amount, p.collection_amount, p.purchase_amount, p.expense_amount, p.dispatch_qty, p.production_qty, p.stock_inward_qty, p.stock_outward_qty, p.outstanding].join(",")
      ), n = [i, ...t].join(`
`);
      Ws(n, "daily_business_mis_" + C.value + "_to_" + b.value + ".csv");
    }
    function h(i, t, n) {
      const r = [i.join(","), ...t].join(`
`);
      Ws(r, n);
    }
    function Do() {
      if (!R.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = ys.value;
      if (t === "product")
        h(
          ["Item", "UOM", "Invoices", "Qty Sold", "Discount", "Amount"],
          R.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.total_discount || 0, n.total_amount].join(",")),
          "sales_mis_product_wise_" + i
        );
      else if (t === "customer")
        h(
          ["Customer", "Invoices", "Amount", "Outstanding"],
          R.value.customer_wise.map((n) => [n.customer_name || n.customer, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "sales_mis_customer_wise_" + i
        );
      else if (t === "salesperson")
        h(
          ["Salesperson", "Invoices", "Amount"],
          R.value.salesperson_wise.map((n) => [n.sales_person, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_salesperson_wise_" + i
        );
      else if (t === "branch")
        h(
          ["Branch / Cost Center", "Invoices", "Amount"],
          R.value.branch_wise.map((n) => [n.branch, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_branch_wise_" + i
        );
      else if (t === "returns")
        h(
          ["Credit Note", "Date", "Customer", "Against Invoice", "Amount", "Reason"],
          R.value.sales_return.rows.map((n) => [n.credit_note, n.posting_date, n.customer_name || n.customer, n.return_against || "", n.grand_total, (n.reason || "").replace(/,/g, " ")].join(",")),
          "sales_mis_returns_" + i
        );
      else if (t === "discount")
        h(
          ["Customer", "Line Discount", "Header Discount", "Net Amount"],
          R.value.discount_analysis.by_customer.map((n) => [n.customer_name || n.customer, n.line_discount || 0, n.header_discount || 0, n.net_amount].join(",")),
          "sales_mis_discount_by_customer_" + i
        );
      else if (t === "pending")
        h(
          ["Sales Order", "Date", "Customer", "Status", "Order Value", "Billed", "Pending"],
          R.value.sales_order_pending.rows.map((n) => [n.sales_order, n.transaction_date, n.customer_name || n.customer, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "sales_mis_order_pending_" + i
        );
      else {
        const n = R.value.summary;
        h(["Metric", "Value"], [
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
    function To() {
      if (!I.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Rs.value;
      t === "ageing" ? h(
        ["Customer", "0-30", "31-60", "61-90", "90+", "Total"],
        I.value.ageing.map((n) => [n.customer_name || n.customer, n.days_0_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "receivables_ageing_" + b.value + ".csv"
      ) : t === "daily_coll" ? h(
        ["Date", "Payments", "Amount"],
        I.value.daily_collection.days.map((n) => [n.date, n.count, n.amount].join(",")),
        "receivables_daily_collection_" + i
      ) : t === "overdue" ? h(
        ["Invoice", "Customer", "Due Date", "Overdue Days", "Outstanding"],
        I.value.overdue.rows.map((n) => [n.invoice, n.customer_name || n.customer, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "receivables_overdue_" + b.value + ".csv"
      ) : t === "credit" ? h(
        ["Customer", "Credit Limit", "Outstanding", "Utilisation %"],
        I.value.credit_utilisation.map((n) => [n.customer_name || n.customer, n.credit_limit || 0, n.outstanding_amount, n.utilisation_pct != null ? n.utilisation_pct.toFixed(1) : ""].join(",")),
        "receivables_credit_utilisation_" + b.value + ".csv"
      ) : h(
        ["Customer", "Open Invoices", "Oldest Due Date", "Outstanding"],
        I.value.customer_outstanding.map((n) => [n.customer_name || n.customer, n.invoice_count, n.oldest_due_date || "", n.outstanding_amount].join(",")),
        "receivables_customer_outstanding_" + b.value + ".csv"
      );
    }
    function Oo() {
      if (!q.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Ps.value;
      if (t === "supplier")
        h(
          ["Supplier", "Bills", "Amount", "Outstanding"],
          q.value.supplier_wise.map((n) => [n.supplier_name || n.supplier, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "purchase_mis_supplier_wise_" + i
        );
      else if (t === "product")
        h(
          ["Item", "UOM", "Bills", "Qty Purchased", "Discount", "Amount"],
          q.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_purchased, n.total_discount || 0, n.total_amount].join(",")),
          "purchase_mis_product_wise_" + i
        );
      else if (t === "price_variance")
        h(
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
        h(
          ["Purchase Order", "Date", "Supplier", "Status", "Order Value", "Billed", "Pending"],
          q.value.pending_purchase_orders.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "purchase_mis_pending_po_" + b.value + ".csv"
        );
      else if (t === "pending_receipts")
        h(
          ["Purchase Order", "Date", "Supplier", "Status", "Ordered Qty", "Received Qty", "Pending Qty"],
          q.value.pending_material_receipts.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.ordered_qty, n.received_qty || 0, n.pending_qty].join(",")),
          "purchase_mis_pending_receipts_" + b.value + ".csv"
        );
      else if (t === "returns")
        h(
          ["Debit Note", "Date", "Supplier", "Against Bill", "Amount"],
          q.value.purchase_return.rows.map((n) => [n.debit_note, n.posting_date, n.supplier_name || n.supplier, n.return_against || "", n.grand_total].join(",")),
          "purchase_mis_returns_" + i
        );
      else {
        const n = q.value.summary;
        h(["Metric", "Value"], [
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
    function Ro() {
      if (!O.value) return;
      const i = b.value + ".csv", t = hs.value;
      t === "current_stock" ? h(
        ["Item", "Warehouse", "UOM", "Qty", "Rate", "Value"],
        O.value.current_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.uom || "", n.actual_qty, n.valuation_rate, n.stock_value].join(",")),
        "inventory_mis_current_stock_" + i
      ) : t === "stock_value" ? h(
        ["Warehouse", "Items", "Qty", "Stock Value"],
        O.value.stock_value.by_warehouse.map((n) => [n.warehouse, n.item_count, n.total_qty, n.stock_value].join(",")),
        "inventory_mis_stock_value_" + i
      ) : t === "fast_moving" ? h(
        ["Item", "Qty Consumed", "Transactions", "Current Qty"],
        O.value.fast_moving.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.current_qty].join(",")),
        "inventory_mis_fast_moving_" + C.value + "_to_" + b.value + ".csv"
      ) : t === "slow_moving" ? h(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        O.value.slow_moving.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "", n.days_since_movement].join(",")),
        "inventory_mis_slow_moving_" + i
      ) : t === "dead_stock" ? h(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        O.value.dead_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "Never", n.days_since_movement ?? ""].join(",")),
        "inventory_mis_dead_stock_" + i
      ) : t === "ageing" ? h(
        ["Item", "Warehouse", "Qty", "Stock Value", "Last Receipt", "Age (Days)"],
        O.value.stock_ageing.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.stock_value, n.last_receipt_date || "Never", n.age_days ?? ""].join(",")),
        "inventory_mis_ageing_" + i
      ) : t === "reorder" ? h(
        ["Item", "Warehouse", "Qty on Hand", "Reorder Level", "Reorder Qty", "Shortage"],
        O.value.reorder_low_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.reorder_level, n.reorder_qty, n.shortage_qty].join(",")),
        "inventory_mis_reorder_" + i
      ) : t === "excess" ? h(
        ["Item", "Qty on Hand", "Avg Daily Consumption", "Days of Cover", "Excess Qty", "Excess Value"],
        O.value.excess_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.avg_daily_consumption, n.days_of_cover, n.excess_qty, n.excess_value].join(",")),
        "inventory_mis_excess_stock_" + i
      ) : t === "adjustment" ? h(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty", "Rate", "Value", "Reason"],
        O.value.stock_adjustment.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.rate, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_adjustment_" + C.value + "_to_" + b.value + ".csv"
      ) : t === "loss" && h(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty Lost", "Value Lost", "Reason"],
        O.value.stock_loss.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_loss_" + C.value + "_to_" + b.value + ".csv"
      );
    }
    function Po() {
      if (!T.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = gs.value;
      t === "plan_vs_actual" ? h(
        ["Production Plan", "Date", "Item", "Planned Qty", "Produced Qty", "Variance", "Variance %"],
        T.value.plan_vs_actual.rows.map((n) => [n.production_plan, n.posting_date, n.item_name || n.item_code, n.planned_qty, n.produced_qty, n.variance_qty, n.variance_pct ?? ""].join(",")),
        "production_mis_plan_vs_actual_" + i
      ) : t === "pending" ? h(
        ["Work Order", "Item", "Status", "Qty", "Produced", "Pending", "Planned End"],
        T.value.production_pending.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.qty, n.produced_qty, n.pending_qty, n.planned_end_date || ""].join(",")),
        "production_mis_pending_" + b.value + ".csv"
      ) : t === "wip" ? h(
        ["Work Order", "Item", "Qty", "Produced", "% Complete", "WIP Warehouse", "WIP Value"],
        T.value.wip_status.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.qty, n.produced_qty, n.pct_complete, n.wip_warehouse || "", n.wip_stock_value].join(",")),
        "production_mis_wip_" + b.value + ".csv"
      ) : t === "material_availability" ? h(
        ["Work Order", "Item", "Warehouse", "Still to Issue", "Available", "Shortage"],
        T.value.raw_material_availability.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.warehouse, n.still_to_issue, n.available_qty, n.shortage_qty].join(",")),
        "production_mis_material_availability_" + b.value + ".csv"
      ) : t === "material_consumption" ? h(
        ["Item", "Qty Consumed", "Transactions", "Value Consumed"],
        T.value.material_consumption.rows.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.value_consumed].join(",")),
        "production_mis_material_consumption_" + i
      ) : t === "material_variance" ? h(
        ["Work Order", "Item", "Required Qty", "Consumed Qty", "Variance Qty", "Variance Value"],
        T.value.material_variance.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.required_qty, n.consumed_qty, n.variance_qty, n.variance_value].join(",")),
        "production_mis_material_variance_" + i
      ) : t === "production_cost" ? h(
        ["Work Order", "Item", "Produced", "Material Value", "Operating Cost", "Total Cost", "Cost/Unit", "Standard/Unit"],
        T.value.production_cost.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.produced_qty, n.material_value, n.operating_cost, n.actual_total_cost, n.actual_cost_per_unit ?? "", n.standard_cost_per_unit ?? ""].join(",")),
        "production_mis_cost_" + i
      ) : t === "efficiency" ? h(
        ["Work Order", "Item", "Status", "Planned (min)", "Actual (min)", "Efficiency %"],
        T.value.production_efficiency.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.planned_mins, n.actual_mins, n.efficiency_pct].join(",")),
        "production_mis_efficiency_" + i
      ) : t === "rejection" ? h(
        ["Job Card", "Work Order", "Operation", "Item", "Qty", "Value"],
        T.value.rejection_rework.rows.map((n) => [n.job_card, n.work_order, n.operation || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_rejection_" + i
      ) : t === "scrap" && h(
        ["Stock Entry", "Work Order", "Item", "Qty", "Value"],
        T.value.scrap_wastage.rows.map((n) => [n.stock_entry, n.work_order || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_scrap_" + i
      );
    }
    function Io() {
      if (!A.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Ss.value;
      t === "sales" ? h(
        ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Revenue"],
        A.value.product_wise_sales.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.avg_rate, n.total_amount].join(",")),
        "product_mis_sales_" + i
      ) : t === "profit" ? h(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        A.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.profit, n.margin_pct].join(",")),
        "product_mis_profit_" + i
      ) : t === "cost" ? h(
        ["Item", "Qty Sold", "Cost Rate", "Total Cost"],
        A.value.product_wise_cost.rows.map((n) => [n.item_name || n.item_code, n.qty_sold, n.cost_rate, n.total_cost].join(",")),
        "product_mis_cost_" + i
      ) : t === "margin" ? h(
        ["Item", "Revenue", "Cost", "Margin %"],
        A.value.product_wise_margin.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.margin_pct].join(",")),
        "product_mis_margin_" + i
      ) : t === "production" ? h(
        ["Item", "Qty Produced", "Value Produced", "Transactions"],
        A.value.product_wise_production.rows.map((n) => [n.item_name || n.item_code, n.qty_produced, n.value_produced, n.transactions].join(",")),
        "product_mis_production_" + i
      ) : t === "stock" ? h(
        ["Item", "UOM", "Qty on Hand", "Rate", "Stock Value"],
        A.value.product_wise_stock.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.total_qty, n.valuation_rate, n.total_value].join(",")),
        "product_mis_stock_" + b.value + ".csv"
      ) : t === "wastage" ? h(
        ["Item", "Qty Scrapped", "Value Scrapped", "Transactions"],
        A.value.product_wise_wastage.rows.map((n) => [n.item_name || n.item_code, n.qty_scrapped, n.value_scrapped, n.transactions].join(",")),
        "product_mis_wastage_" + i
      ) : t === "top_selling" ? h(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.top_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_top_selling_" + i
      ) : t === "low_selling" && h(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.low_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_low_selling_" + i
      );
    }
    function Vo() {
      if (!H.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Us.value;
      t === "pending_dispatch" ? h(
        ["Sales Order", "Order Date", "Customer", "Item", "Ordered Qty", "Pending Qty", "Pending Value"],
        H.value.pending_dispatch.rows.map((n) => [n.sales_order, n.order_date, n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_pending_dispatch_" + b.value + ".csv"
      ) : t === "delivery_pending" ? h(
        ["Sales Order", "Delivery Date", "Customer", "Item", "Ordered Qty", "Dispatched Qty", "Pending Qty"],
        H.value.delivery_pending.rows.map((n) => [n.sales_order, n.delivery_date || "", n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.delivered_qty, n.pending_qty].join(",")),
        "dispatch_mis_delivery_pending_" + b.value + ".csv"
      ) : t === "delayed_delivery" ? h(
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Item", "Pending Qty", "Pending Value"],
        H.value.delayed_delivery.rows.map((n) => [n.sales_order, n.delivery_date, n.days_overdue, n.customer_name || n.customer, n.item_name || n.item_code, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_delayed_delivery_" + b.value + ".csv"
      ) : t === "customer_pending" ? h(
        ["Customer", "Orders", "Pending Qty", "Pending Value"],
        H.value.customer_wise_pending_delivery.rows.map((n) => [n.customer_name || n.customer, n.order_count, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_customer_pending_" + b.value + ".csv"
      ) : t === "transport_wise" && h(
        ["Transporter", "Dispatches", "Customers", "Total Qty", "Total Value"],
        H.value.transport_wise_dispatch.rows.map((n) => [n.transporter_name, n.dispatch_count, n.customer_count, n.total_qty, n.total_value].join(",")),
        "dispatch_mis_transport_wise_" + i
      );
    }
    function No() {
      if (!B.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = vs.value, n = (r, p, j, D) => {
        h(p, B.value.summary[r].rows.map(j), "order_mis_" + D + "_" + i);
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
      ) : t === "order_value" ? h(
        ["Status", "Orders", "Value"],
        B.value.order_value.by_status.map((r) => [r.status, r.order_count, r.total_value].join(",")),
        "order_mis_order_value_" + i
      ) : t === "profitability" && h(
        ["Sales Order", "Date", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        B.value.order_profitability.rows.map((r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.revenue, r.total_cost, r.profit, r.margin_pct].join(",")),
        "order_mis_profitability_" + i
      );
    }
    function Eo() {
      if (!W.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Ls.value;
      t === "product" ? h(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_product_" + i
      ) : t === "customer" ? h(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.customer_wise_profit.rows.map((n) => [n.customer_name || n.customer, n.invoice_count, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_customer_" + i
      ) : t === "order" ? h(
        ["Sales Order", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.order_wise_profit.rows.map((n) => [n.sales_order, n.customer_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_order_" + i
      ) : t === "branch" ? h(
        ["Branch (Cost Center)", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.branch_wise_profit.rows.map((n) => [n.cost_center_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_branch_" + i
      ) : t === "salesperson" ? h(
        ["Salesperson", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.salesperson_wise_profit.rows.map((n) => [n.sales_person_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_salesperson_" + i
      ) : t === "monthly_trend" && h(
        ["Month", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.monthly_profit_trend.rows.map((n) => [n.month, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_monthly_trend_" + i
      );
    }
    function qo() {
      if (!U.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Is.value;
      t === "department" ? h(
        ["Department (Cost Center)", "Expenses", "Amount"],
        U.value.department_wise.rows.map((n) => [n.cost_center_name, n.count, n.amount].join(",")),
        "expense_mis_department_" + i
      ) : t === "category" ? h(
        ["Category", "Expenses", "Amount", "% of Total"],
        U.value.category_wise.rows.map((n) => [n.category_name, n.count, n.amount, n.pct_of_total.toFixed(1)].join(",")),
        "expense_mis_category_" + i
      ) : t === "budget" ? h(
        ["Cost Center", "Budget Period", "Period Budget (est.)", "Actual", "Variance", "Variance %"],
        U.value.budget_vs_actual.rows.map((n) => [n.cost_center_name, n.budget_period, n.period_budget, n.actual, n.variance, n.variance_pct.toFixed(1)].join(",")),
        "expense_mis_budget_vs_actual_" + i
      ) : t === "fixed" ? h(
        ["Category", "Expenses", "Amount"],
        U.value.fixed_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_fixed_" + i
      ) : t === "variable" ? h(
        ["Category", "Expenses", "Amount"],
        U.value.variable_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_variable_" + i
      ) : t === "trend" ? h(
        ["Month", "Expenses", "Amount"],
        U.value.expense_trend.rows.map((n) => [n.month, n.count, n.amount].join(",")),
        "expense_mis_trend_" + i
      ) : t === "unusual" && h(
        ["Expense", "Date", "Category", "Department", "Amount", "Category Avg", "Basis"],
        U.value.unusual_expenses.rows.map((n) => [n.expense, n.posting_date, n.category_name, n.cost_center_name || "", n.amount, n.category_avg, n.basis].join(",")),
        "expense_mis_unusual_" + i
      );
    }
    function Bo() {
      if (!X.value) return;
      const i = b.value + ".csv", t = Qs.value;
      t === "ageing" ? h(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        X.value.payable_ageing.rows.map((n) => [n.supplier_name, n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "payables_mis_ageing_" + i
      ) : t === "overdue" ? h(
        ["Invoice", "Supplier", "Due Date", "Overdue Days", "Outstanding"],
        X.value.overdue_payables.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "payables_mis_overdue_" + i
      ) : t === "due_week" ? h(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        X.value.due_this_week.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_week_" + i
      ) : t === "due_month" ? h(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        X.value.due_this_month.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_month_" + i
      ) : t === "supplier" ? h(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Oldest Overdue (days)"],
        X.value.supplier_wise_outstanding.rows.map((n) => [n.supplier_name, n.invoice_count, n.outstanding, n.overdue_amount, n.max_overdue_days].join(",")),
        "payables_mis_supplier_" + i
      ) : t === "forecast" && h(
        ["Bucket", "Invoices", "Amount"],
        X.value.payment_due_forecast.rows.map((n) => [n.label, n.count, n.amount].join(",")),
        "payables_mis_forecast_" + i
      );
    }
    function Ao() {
      if (!E.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Vs.value;
      t === "cash_position" ? h(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.cash_position.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_cash_position_" + i
      ) : t === "bank_balance" ? h(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.bank_balance.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_bank_balance_" + i
      ) : t === "daily_cash" ? h(
        ["Date", "Receipts", "Payments", "Net", "Balance"],
        E.value.daily_cash_flow.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_cash_flow_" + i
      ) : t === "daily_bank" ? h(
        ["Date", "Deposits", "Withdrawals", "Net", "Balance"],
        E.value.daily_bank_movement.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_bank_movement_" + i
      ) : t === "receipts" ? h(
        ["Reference", "Date", "Party", "Account", "Mode", "Amount"],
        E.value.receipts.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.mode_of_payment || "", n.amount].join(",")),
        "cash_bank_mis_receipts_" + i
      ) : t === "payments" ? h(
        ["Reference", "Date", "Party", "Account", "Source", "Amount"],
        E.value.payments.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.source, n.amount].join(",")),
        "cash_bank_mis_payments_" + i
      ) : t === "forecast" ? h(
        ["Bucket", "Expected Inflow", "Expected Outflow", "Net", "Projected Balance"],
        E.value.cash_forecast.rows.map((n) => [n.label, n.inflow, n.outflow, n.net, n.projected_balance].join(",")),
        "cash_bank_mis_forecast_" + i
      ) : t === "fund_requirement" && h(
        ["Bucket", "Shortfall"],
        E.value.fund_requirement.rows.map((n) => [n.label, n.shortfall].join(",")),
        "cash_bank_mis_fund_requirement_" + i
      );
    }
    function $o() {
      if (!M.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = js.value, n = (r) => r.customer_name || r.customer;
      t === "new_customers" ? h(
        ["Customer", "First Invoice Date", "Invoices in Period", "Revenue in Period"],
        M.value.new_customers.rows.map((r) => [n(r), r.first_invoice_date, r.invoice_count, r.total_amount].join(",")),
        "customer_mis_new_customers_" + i
      ) : t === "active_customers" ? h(
        ["Customer", "Invoices", "Revenue", "First Invoice", "Last Invoice"],
        M.value.active_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount, r.first_invoice_in_period, r.last_invoice_in_period].join(",")),
        "customer_mis_active_customers_" + i
      ) : t === "repeat_customers" ? h(
        ["Customer", "Invoices", "Revenue"],
        M.value.repeat_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_repeat_customers_" + i
      ) : t === "customer_wise_sales" ? h(
        ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        M.value.customer_wise_sales.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "customer_mis_customer_wise_sales_" + i
      ) : t === "customer_wise_outstanding" ? h(
        ["Customer", "Invoices", "Outstanding", "Oldest Due Date", "Max Overdue Days"],
        M.value.customer_wise_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.oldest_due_date, r.max_overdue_days].join(",")),
        "customer_mis_customer_wise_outstanding_" + i
      ) : t === "customer_wise_profit" ? h(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        M.value.customer_wise_profit.rows.map((r) => [n(r), r.invoice_count, r.revenue, r.total_cost, r.profit, Number(r.margin_pct).toFixed(1)].join(",")),
        "customer_mis_customer_wise_profit_" + i
      ) : t === "customer_retention" ? h(
        ["Customer", "Status"],
        M.value.customer_retention.rows.map((r) => [n(r), r.status].join(",")),
        "customer_mis_customer_retention_" + i
      ) : t === "top_customers" ? h(
        ["Rank", "Customer", "Invoices", "Revenue"],
        M.value.top_customers.rows.map((r, p) => [p + 1, n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_top_customers_" + i
      ) : t === "inactive_customers" && h(
        ["Customer", "Last Invoice Date", "Days Inactive", "Lifetime Invoices", "Lifetime Revenue"],
        M.value.inactive_customers.rows.map((r) => [n(r), r.last_invoice_date, r.days_inactive, r.invoice_count, r.lifetime_revenue].join(",")),
        "customer_mis_inactive_customers_" + i
      );
    }
    function Lo() {
      if (!$.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Fs.value, n = (r) => r.supplier_name || r.supplier;
      t === "supplier_wise_purchase" ? h(
        ["Supplier", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        $.value.supplier_wise_purchase.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "supplier_mis_supplier_wise_purchase_" + i
      ) : t === "supplier_outstanding" ? h(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Max Overdue Days"],
        $.value.supplier_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.overdue_amount, r.max_overdue_days].join(",")),
        "supplier_mis_supplier_outstanding_" + i
      ) : t === "supplier_payment_ageing" ? h(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        $.value.supplier_payment_ageing.rows.map((r) => [n(r), r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
        "supplier_mis_supplier_payment_ageing_" + i
      ) : t === "purchase_price_comparison" ? h(
        ["Item", "Supplier", "Qty", "Avg Rate", "Is Lowest", "Vs Lowest %"],
        $.value.purchase_price_comparison.rows.map((r) => [r.item_name || r.item_code, n(r), r.qty, r.avg_rate, r.is_lowest ? "Yes" : "No", Number(r.variance_vs_lowest_pct).toFixed(1)].join(",")),
        "supplier_mis_purchase_price_comparison_" + i
      ) : t === "supplier_performance" ? h(
        ["Supplier", "Purchase Amount", "Outstanding", "On-time Delivery %", "Rejection %", "Avg Price Variance %", "Score"],
        $.value.supplier_performance.rows.map((r) => [n(r), r.total_purchase_amount, r.outstanding_amount, r.on_time_delivery_pct ?? "", r.rejection_pct ?? "", r.avg_price_variance_pct ?? "", r.performance_score ?? ""].join(",")),
        "supplier_mis_supplier_performance_" + i
      ) : t === "delivery_performance" ? h(
        ["Receipt", "Supplier", "Received Date", "Expected Date", "Delay (days)", "Status"],
        $.value.delivery_performance.rows.map((r) => [r.receipt, n(r), r.received_date, r.expected_date || "", r.has_reference ? r.delay_days : "", r.has_reference ? r.on_time ? "On-time" : "Late" : "No PO Ref"].join(",")),
        "supplier_mis_delivery_performance_" + i
      ) : t === "quality_rejection" && h(
        ["Supplier", "Item", "Received Qty", "Accepted Qty", "Rejected Qty", "Rejection %"],
        $.value.quality_rejection.rows.map((r) => [n(r), r.item_name || r.item_code, r.received_qty, r.accepted_qty, r.rejected_qty, Number(r.rejection_pct).toFixed(2)].join(",")),
        "supplier_mis_quality_rejection_" + i
      );
    }
    function Qo() {
      if (!L.value) return;
      const i = C.value + "_to_" + b.value + ".csv", t = Ns.value, n = (r) => r.sales_person_name || r.sales_person;
      t === "employee_attendance" ? h(
        ["Employee", "Present Days", "Period Days", "Attendance %", "Total Hours", "Avg Hrs/Day"],
        L.value.employee_attendance.rows.map((r) => [r.employee, r.present_days, r.period_days, r.attendance_pct, r.total_hours, r.avg_hours_per_day].join(",")),
        "employee_mis_attendance_" + i
      ) : t === "department_manpower" ? h(
        ["Department", "Headcount", "Employees"],
        L.value.department_manpower.rows.map((r) => [r.department, r.headcount, '"' + r.employees.map((p) => p.sales_person_name).join("; ") + '"'].join(",")),
        "employee_mis_department_manpower_" + i
      ) : t === "salesperson_target" ? h(
        ["Salesperson", "Invoices", "Achieved", "Target", "Achievement %"],
        L.value.salesperson_achievement.rows.map((r) => [n(r), r.invoice_count, r.total_amount, zt.value[r.sales_person] || "", zt.value[r.sales_person] ? ca(r).toFixed(1) : ""].join(",")),
        "employee_mis_salesperson_target_" + i
      ) : t === "salesperson_collection" ? h(
        ["Salesperson", "Payments", "Collected Amount"],
        L.value.salesperson_collection.rows.map((r) => [n(r), r.payment_count, r.collected_amount].join(",")),
        "employee_mis_salesperson_collection_" + i
      ) : t === "production_productivity" ? h(
        ["Employee", "Job Cards", "Hours", "Qty Produced", "Avg Time/Unit (min)", "Qty/Hour"],
        L.value.production_productivity.rows.map((r) => [r.employee, r.job_card_count, r.total_hours, r.qty_produced, r.avg_time_per_unit_mins ?? "", r.qty_per_hour ?? ""].join(",")),
        "employee_mis_production_productivity_" + i
      ) : t === "overtime" ? h(
        ["Employee", "Overtime Days", "Overtime Hours"],
        L.value.overtime.summary.map((r) => [r.employee, r.overtime_days, r.overtime_hours].join(",")),
        "employee_mis_overtime_" + i
      ) : t === "labour_cost" ? h(
        ["Employee", "Hours", "Cost"],
        L.value.labour_cost.by_employee.map((r) => [r.employee, r.total_hours, r.total_cost].join(",")),
        "employee_mis_labour_cost_" + i
      ) : t === "employee_performance" && h(
        ["Employee", "Hours", "Qty Produced", "Qty/Hour", "Rejection %", "Attendance %", "Overtime Hrs", "Score"],
        L.value.employee_performance.rows.map((r) => [r.employee, r.total_hours, r.qty_produced, r.qty_per_hour ?? "", r.rejection_pct ?? "", r.attendance_pct ?? "", r.overtime_hours, r.performance_score ?? ""].join(",")),
        "employee_mis_performance_" + i
      );
    }
    function oe() {
      const i = k.value === "ar", t = i ? rs.value : us.value, n = i ? "Customer" : "Vendor", r = i ? "customer_name" : "supplier_name", p = [n, "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"].join(","), j = t.map(
        (V) => [V[r] || V[i ? "customer" : "supplier"], V.current, V.days_1_30, V.days_31_60, V.days_61_90, V.days_90_plus, V.total].join(",")
      ), D = [p, ...j].join(`
`);
      Ws(D, (i ? "ar_aging" : "ap_aging") + "_" + b.value + ".csv");
    }
    const vn = [
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
    ], _n = ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg"], pn = vn.filter((i) => _n.includes(i.key)), Fo = ["c-blue", "c-slate", "c-cyan", "c-amber", "c-pink", "c-slate", "c-emerald", "c-violet", "c-blue", "c-blue"];
    function bn(i) {
      return Fo[i % Fo.length];
    }
    return (i, t) => {
      var n, r, p, j, D, V, Es, Vt, zo, Ho, Wo, Uo, Ko;
      return l(), o("div", En, [
        t[836] || (t[836] = x('<div class="reports-header" data-v-b9fb0d3a><div data-v-b9fb0d3a><p class="reports-subtitle" data-v-b9fb0d3a>Get detailed insights into your business performance</p></div><div class="reports-header-right" data-v-b9fb0d3a><div class="reports-header-icons" data-v-b9fb0d3a><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="10" width="4" height="10" rx="1" data-v-b9fb0d3a></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-b9fb0d3a></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-b9fb0d3a></rect></svg><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><circle cx="12" cy="12" r="9" data-v-b9fb0d3a></circle><path d="M12 3v9l7 3" data-v-b9fb0d3a></path></svg></div></div></div>', 1)),
        s("div", qn, [
          (l(!0), o(u, null, m(f(pn), (e, g) => (l(), o("button", {
            key: e.key,
            class: c(["report-card", [bn(g), { active: k.value === e.key }]]),
            onClick: (Q) => k.value = e.key
          }, [
            s("span", {
              class: "report-card-icon",
              innerHTML: e.icon
            }, null, 8, An),
            s("span", $n, a(e.label), 1)
          ], 10, Bn))), 128))
        ]),
        s("div", Ln, [
          ["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) ? (l(), o(u, { key: 0 }, [
            t[208] || (t[208] = s("span", { class: "dr-icon" }, "📅", -1)),
            t[209] || (t[209] = s("label", { class: "dr-label" }, "As of Date", -1)),
            Hs(s("input", {
              type: "date",
              "onUpdate:modelValue": t[0] || (t[0] = (e) => b.value = e),
              class: "dr-input"
            }, null, 512), [
              [ot, b.value]
            ])
          ], 64)) : (l(), o(u, { key: 1 }, [
            t[210] || (t[210] = s("span", { class: "dr-icon" }, "📅", -1)),
            t[211] || (t[211] = s("label", { class: "dr-label" }, "Date Range", -1)),
            Hs(s("input", {
              type: "date",
              "onUpdate:modelValue": t[1] || (t[1] = (e) => C.value = e),
              class: "dr-input"
            }, null, 512), [
              [ot, C.value]
            ]),
            t[212] || (t[212] = s("span", { class: "dr-to" }, "To", -1)),
            Hs(s("input", {
              type: "date",
              "onUpdate:modelValue": t[2] || (t[2] = (e) => b.value = e),
              class: "dr-input"
            }, null, 512), [
              [ot, b.value]
            ])
          ], 64)),
          s("button", {
            class: "books-btn books-btn-primary",
            onClick: ln
          }, "▷ Run Report"),
          t[213] || (t[213] = s("span", { class: "dr-spacer" }, null, -1)),
          ["ar", "ap"].includes(k.value) && (rs.value.length || us.value.length) ? (l(), o("button", {
            key: 2,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: oe
          }, " Export CSV ")) : y("", !0),
          k.value === "items" && As.value.length ? (l(), o("button", {
            key: 3,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ga
          }, " Export CSV ")) : y("", !0),
          k.value === "customers" && $s.value.length ? (l(), o("button", {
            key: 4,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: fa
          }, " Export CSV ")) : y("", !0),
          k.value === "profit" && cs.value.length ? (l(), o("button", {
            key: 5,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: wa
          }, " Export CSV ")) : y("", !0),
          k.value === "invoice_profit" && ds.value.length ? (l(), o("button", {
            key: 6,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: xa
          }, " Export CSV ")) : y("", !0)
        ]),
        ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg"].includes(k.value) ? (l(), o("div", Qn, [
          s("div", Fn, [
            t[216] || (t[216] = x('<div class="bs-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="3" y="3" width="18" height="18" rx="2" data-v-b9fb0d3a></rect><line x1="3" y1="9" x2="21" y2="9" data-v-b9fb0d3a></line><line x1="9" y1="21" x2="9" y2="9" data-v-b9fb0d3a></line></svg></div>', 1)),
            s("div", zn, [
              s("div", Hn, a(tl.value), 1),
              s("div", Wn, a(el.value), 1)
            ]),
            s("div", Un, [
              k.value !== "asset_reg" ? Hs((l(), o("select", {
                key: 0,
                "onUpdate:modelValue": t[3] || (t[3] = (e) => ws.value = e),
                class: "dr-input"
              }, [
                t[214] || (t[214] = s("option", { value: "" }, "All projects", -1)),
                (l(!0), o(u, null, m(Re.value, (e) => (l(), o("option", {
                  key: e,
                  value: e
                }, a(e), 9, Kn))), 128))
              ], 512)), [
                [Yo, ws.value]
              ]) : y("", !0),
              s("div", Gn, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[4] || (t[4] = (e) => Et.value = !Et.value),
                  disabled: !ps.value.length
                }, [...t[215] || (t[215] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Yn),
                Et.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[5] || (t[5] = (e) => Et.value = !1)
                  }),
                  s("div", Jn, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[6] || (t[6] = (e) => {
                        Et.value = !1, nl();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[7] || (t[7] = (e) => {
                        Et.value = !1, ll();
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          !Xo.value && !ne.value ? (l(), o("div", Zn, "Run the report to see results.")) : ne.value ? (l(), o("div", Xn)) : Jt.value ? (l(), o("div", si, a(Jt.value), 1)) : ps.value.length ? (l(), o("div", ti, [
            s("div", ei, [
              s("table", ai, [
                s("thead", null, [
                  s("tr", null, [
                    (l(!0), o(u, null, m(ie.value, (e) => (l(), o("th", {
                      key: e,
                      class: c({ "ta-r": Ma(e) })
                    }, a(de(e)), 3))), 128))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ps.value, (e, g) => (l(), o("tr", { key: g }, [
                    (l(!0), o(u, null, m(ie.value, (Q) => (l(), o("td", {
                      key: Q,
                      "data-label": de(Q),
                      class: c({ "ta-r": Ma(Q) })
                    }, a(ol(e[Q], Q)), 11, oi))), 128))
                  ]))), 128))
                ])
              ])
            ])
          ])) : (l(), o("div", li, "No rows for this report."))
        ])) : y("", !0),
        k.value === "pl" ? (l(), o("div", ni, [
          s("div", ii, [
            t[219] || (t[219] = x('<div class="pl-dash-title" data-v-b9fb0d3a><span class="pl-dash-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="10" width="4" height="10" rx="1" data-v-b9fb0d3a></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-b9fb0d3a></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-b9fb0d3a></rect></svg></span><div data-v-b9fb0d3a><div class="pl-dash-h" data-v-b9fb0d3a>Profit &amp; Loss</div><div class="pl-dash-sub" data-v-b9fb0d3a>Overview of your income, expenses and profitability</div></div></div>', 1)),
            s("div", di, [
              t[217] || (t[217] = x('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="4" width="18" height="18" rx="2" data-v-b9fb0d3a></rect><line x1="3" y1="10" x2="21" y2="10" data-v-b9fb0d3a></line><line x1="8" y1="2" x2="8" y2="6" data-v-b9fb0d3a></line><line x1="16" y1="2" x2="16" y2="6" data-v-b9fb0d3a></line></svg>', 1)),
              os(" " + a(P(C.value)) + " - " + a(P(b.value)) + " ", 1),
              t[218] || (t[218] = s("span", { class: "pl-dash-range-caret" }, "▾", -1))
            ])
          ]),
          f(il) ? (l(), o("div", ri)) : f(as) ? (l(), o(u, { key: 1 }, [
            s("div", ui, [
              s("div", ci, [
                t[220] || (t[220] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "🪙"),
                  s("span", { class: "pl-kpi-label" }, "Total Income")
                ], -1)),
                s("div", mi, a(f(S)(f(as).total_income)), 1),
                s("div", {
                  class: c(["pl-kpi-trend", _a(fo.value)])
                }, a(pa(fo.value)), 3)
              ]),
              f(as).cogs ? (l(), o("div", vi, [
                t[221] || (t[221] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "🛒"),
                  s("span", { class: "pl-kpi-label" }, "Cost of Goods Sold")
                ], -1)),
                s("div", _i, a(f(S)(f(as).cogs)), 1),
                t[222] || (t[222] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : y("", !0),
              f(as).cogs ? (l(), o("div", pi, [
                t[223] || (t[223] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📊"),
                  s("span", { class: "pl-kpi-label" }, "Gross Profit")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", f(as).gross_profit >= 0 ? "green" : "red"])
                }, a(f(S)(f(as).gross_profit)), 3),
                t[224] || (t[224] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : y("", !0),
              s("div", bi, [
                t[225] || (t[225] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📄"),
                  s("span", { class: "pl-kpi-label" }, "Total Expense")
                ], -1)),
                s("div", yi, a(f(S)(f(as).total_expense)), 1),
                s("div", {
                  class: c(["pl-kpi-trend", _a(wo.value, !0)])
                }, a(pa(wo.value)), 3)
              ]),
              f(as).stock_adjustment ? (l(), o("div", hi, [
                t[226] || (t[226] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📦"),
                  s("span", { class: "pl-kpi-label" }, "Stock Adjustment")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", f(as).stock_adjustment > 0 ? "red" : "green"])
                }, a(f(S)(f(as).stock_adjustment)), 3),
                t[227] || (t[227] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : y("", !0),
              s("div", {
                class: c(["pl-kpi", f(as).net_profit >= 0 ? "c-emerald" : "c-pink"])
              }, [
                t[228] || (t[228] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📈"),
                  s("span", { class: "pl-kpi-label" }, "Net Profit")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", f(as).net_profit >= 0 ? "green" : "red"])
                }, a(f(S)(f(as).net_profit)), 3),
                s("div", {
                  class: c(["pl-kpi-trend", _a(xo.value)])
                }, a(pa(xo.value)), 3)
              ], 2)
            ]),
            Ts.value.length ? (l(), o("div", gi, [
              s("div", ki, [
                t[229] || (t[229] = x('<div class="pl-dash-title" data-v-b9fb0d3a><span class="pl-dash-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="10" width="4" height="10" rx="1" data-v-b9fb0d3a></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-b9fb0d3a></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-b9fb0d3a></rect></svg></span><div data-v-b9fb0d3a><div class="pl-dash-h" style="font-size:14px;" data-v-b9fb0d3a>Monthly Trend</div><div class="pl-dash-sub" data-v-b9fb0d3a>Income vs Expense over the selected period</div></div></div>', 1)),
                s("div", fi, [
                  s("button", {
                    class: c({ active: Ht.value === "monthly" }),
                    onClick: t[8] || (t[8] = (e) => Ht.value = "monthly")
                  }, "Monthly", 2),
                  s("button", {
                    class: c({ active: Ht.value === "quarterly" }),
                    onClick: t[9] || (t[9] = (e) => Ht.value = "quarterly")
                  }, "Quarterly", 2),
                  s("button", {
                    class: c({ active: Ht.value === "yearly" }),
                    onClick: t[10] || (t[10] = (e) => Ht.value = "yearly")
                  }, "Yearly", 2)
                ])
              ]),
              s("div", wi, [
                s("div", xi, [
                  s("div", Ci, [
                    (l(!0), o(u, null, m(Gl.value, (e) => (l(), o("span", { key: e }, "KES " + a(_(e)), 1))), 128))
                  ]),
                  s("div", Si, [
                    (l(!0), o(u, null, m(Ts.value, (e) => (l(), o("div", {
                      key: e.month,
                      class: "pl-trend-col"
                    }, [
                      s("div", ji, [
                        s("div", {
                          class: "pl-trend-bar income",
                          style: qs({ height: ko(e.income) + "px" }),
                          title: "Income: KES " + _(e.income)
                        }, null, 12, Mi),
                        s("div", {
                          class: "pl-trend-bar expense",
                          style: qs({ height: ko(e.expense) + "px" }),
                          title: "Expense: KES " + _(e.expense)
                        }, null, 12, Di)
                      ]),
                      s("div", Ti, a(e.month.slice(5)), 1)
                    ]))), 128))
                  ])
                ]),
                s("div", Oi, [
                  t[230] || (t[230] = s("div", { class: "pl-insights-title" }, "💡 Insights", -1)),
                  (l(!0), o(u, null, m(Yl.value, (e, g) => (l(), o("div", {
                    key: g,
                    class: "pl-insight-item"
                  }, [
                    s("span", {
                      class: c(["pl-insight-icon", e.tone])
                    }, a(e.icon), 3),
                    s("div", null, [
                      s("div", Ri, a(e.title), 1),
                      s("div", Pi, a(e.desc), 1)
                    ])
                  ]))), 128))
                ])
              ]),
              t[231] || (t[231] = s("div", { class: "pl-trend-legend" }, [
                s("span", null, [
                  s("span", { class: "dot income" }),
                  os("Income")
                ]),
                s("span", null, [
                  s("span", { class: "dot expense" }),
                  os("Expense")
                ])
              ], -1))
            ])) : y("", !0)
          ], 64)) : (l(), o("div", Ii, "Run the report to see results."))
        ])) : y("", !0),
        k.value === "bs" ? (l(), o("div", Vi, [
          s("div", Ni, [
            t[233] || (t[233] = x('<div class="bs-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><path d="M12 2 3 6v2h18V6z" data-v-b9fb0d3a></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-b9fb0d3a></path><path d="M3 20h18" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Balance Sheet</div><div class="bs-page-head-sub" data-v-b9fb0d3a>What the business owns and owes</div></div>', 2)),
            s("div", Ei, [
              s("div", qi, "As of " + a(P(b.value)), 1),
              s("div", Bi, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[11] || (t[11] = (e) => es("exportBsCSV")),
                  disabled: !f(bs)
                }, [...t[232] || (t[232] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Ai),
                w.value === "exportBsCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[12] || (t[12] = (e) => w.value = "")
                  }),
                  s("div", $i, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[13] || (t[13] = (e) => {
                        w.value = "", yo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[14] || (t[14] = (e) => {
                        w.value = "", Y(yo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          f(rl) ? (l(), o("div", Li)) : f(bs) ? (l(), o(u, { key: 1 }, [
            s("div", Qi, [
              s("div", Fi, [
                t[235] || (t[235] = x('<div class="bs-kpi-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><ellipse cx="12" cy="5" rx="8" ry="3" data-v-b9fb0d3a></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-b9fb0d3a></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-b9fb0d3a></path></svg></div>', 1)),
                s("div", zi, [
                  t[234] || (t[234] = s("div", { class: "bs-kpi-label" }, "Total Assets", -1)),
                  s("div", Hi, a(f(S)(f(bs).total_assets)), 1)
                ])
              ]),
              s("div", Wi, [
                t[237] || (t[237] = s("div", { class: "bs-kpi-icon" }, [
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
                s("div", Ui, [
                  t[236] || (t[236] = s("div", { class: "bs-kpi-label" }, "Total Liabilities", -1)),
                  s("div", Ki, a(f(S)(f(bs).total_liabilities)), 1)
                ])
              ]),
              s("div", Gi, [
                t[239] || (t[239] = x('<div class="bs-kpi-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="12" width="4" height="9" data-v-b9fb0d3a></rect><rect x="10" y="7" width="4" height="14" data-v-b9fb0d3a></rect><rect x="17" y="3" width="4" height="18" data-v-b9fb0d3a></rect></svg></div>', 1)),
                s("div", Yi, [
                  t[238] || (t[238] = s("div", { class: "bs-kpi-label" }, "Total Equity", -1)),
                  s("div", Ji, a(f(S)(f(bs).total_equity)), 1)
                ])
              ])
            ]),
            s("div", {
              class: c(["bs-sum-status", ma.value ? "bs-ok" : "bs-bad"])
            }, [
              s("span", Zi, a(ma.value ? "✓" : "✕"), 1),
              s("div", Xi, [
                s("div", sd, a(ma.value ? "Assets = Liabilities + Equity" : "Balance sheet out of balance"), 1),
                s("div", td, a(f(S)(f(bs).total_assets)) + " = " + a(f(S)(f(bs).total_liabilities)) + " + " + a(f(S)(f(bs).total_equity)), 1)
              ])
            ], 2),
            s("div", ed, [
              (l(!0), o(u, null, m(ho.value, (e) => (l(), o("div", {
                key: e.key,
                class: c(["bs-acc-group", e.cls])
              }, [
                s("div", {
                  class: "bs-acc-head",
                  onClick: (g) => Kl(e.key)
                }, [
                  s("div", {
                    class: "bs-acc-icon",
                    innerHTML: e.icon
                  }, null, 8, od),
                  s("div", ld, [
                    s("div", nd, a(e.label), 1),
                    s("div", id, a(e.desc), 1)
                  ]),
                  s("div", dd, a(f(S)(e.total)), 1),
                  s("div", {
                    class: c(["bs-acc-chevron", { open: fe.value[e.key] }])
                  }, [...t[240] || (t[240] = [
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
                ], 8, ad),
                fe.value[e.key] ? (l(), o("div", rd, [
                  (l(!0), o(u, null, m(e.items, (g) => (l(), o("div", {
                    key: g.label,
                    class: "bs-acc-item"
                  }, [
                    s("div", {
                      class: "bs-acc-item-icon",
                      innerHTML: g.icon
                    }, null, 8, ud),
                    s("div", cd, [
                      s("div", md, a(g.label), 1),
                      g.desc ? (l(), o("div", vd, a(g.desc), 1)) : y("", !0)
                    ]),
                    s("div", _d, a(f(S)(g.value)), 1),
                    t[241] || (t[241] = s("div", { class: "bs-acc-item-caret" }, [
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
                ])) : y("", !0)
              ], 2))), 128))
            ])
          ], 64)) : (l(), o("div", pd, "Run the report to see results."))
        ])) : y("", !0),
        k.value === "cf" ? (l(), o("div", bd, [
          s("div", yd, [
            t[243] || (t[243] = x('<div class="bs-page-head-icon cf-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><path d="M3 3v18h18" data-v-b9fb0d3a></path><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Cash Flow Statement</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Track the movement of cash in and out of your business</div></div>', 2)),
            s("div", hd, [
              s("div", gd, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", kd, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[15] || (t[15] = (e) => es("exportCfCSV")),
                  disabled: !f(J)
                }, [...t[242] || (t[242] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, fd),
                w.value === "exportCfCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[16] || (t[16] = (e) => w.value = "")
                  }),
                  s("div", wd, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[17] || (t[17] = (e) => {
                        w.value = "", Ia();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[18] || (t[18] = (e) => {
                        w.value = "", Y(Ia);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          f(cl) ? (l(), o("div", xd)) : f(J) ? (l(), o("div", Cd, [
            s("div", Sd, [
              s("div", jd, [
                t[244] || (t[244] = x('<div class="cf-acc-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><circle cx="12" cy="12" r="3" data-v-b9fb0d3a></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" data-v-b9fb0d3a></path></svg></div><div class="cf-acc-text" data-v-b9fb0d3a><div class="cf-acc-label" data-v-b9fb0d3a>Operating Activities</div><div class="cf-acc-desc" data-v-b9fb0d3a>P&amp;L + working capital changes</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", f(J).operating >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).operating)), 3)
              ]),
              s("div", Md, [
                t[245] || (t[245] = x('<div class="cf-acc-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><ellipse cx="12" cy="5" rx="8" ry="3" data-v-b9fb0d3a></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-b9fb0d3a></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-b9fb0d3a></path></svg></div><div class="cf-acc-text" data-v-b9fb0d3a><div class="cf-acc-label" data-v-b9fb0d3a>Investing Activities</div><div class="cf-acc-desc" data-v-b9fb0d3a>Asset purchases and sales</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", f(J).investing >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).investing)), 3)
              ]),
              s("div", Dd, [
                t[246] || (t[246] = x('<div class="cf-acc-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><path d="M12 2 3 6v2h18V6z" data-v-b9fb0d3a></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-b9fb0d3a></path><path d="M3 20h18" data-v-b9fb0d3a></path></svg></div><div class="cf-acc-text" data-v-b9fb0d3a><div class="cf-acc-label" data-v-b9fb0d3a>Financing Activities</div><div class="cf-acc-desc" data-v-b9fb0d3a>Equity, loans and debt</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", f(J).financing >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).financing)), 3)
              ]),
              s("div", Td, [
                t[248] || (t[248] = x('<div class="cf-acc-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="12" width="4" height="9" data-v-b9fb0d3a></rect><rect x="10" y="7" width="4" height="14" data-v-b9fb0d3a></rect><rect x="17" y="3" width="4" height="18" data-v-b9fb0d3a></rect></svg></div>', 1)),
                s("div", Od, [
                  t[247] || (t[247] = s("div", { class: "cf-acc-label" }, "Net Change in Cash", -1)),
                  s("div", Rd, a(f(J).net_change >= 0 ? "Increase" : "Decrease") + " in cash during this period", 1)
                ]),
                s("div", {
                  class: c(["cf-acc-amount", f(J).net_change >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).net_change)), 3)
              ]),
              f(J).opening_cash != null ? (l(), o(u, { key: 0 }, [
                s("div", Pd, [
                  t[249] || (t[249] = x('<div class="cf-flow-icon cf-flow-icon-open" data-v-b9fb0d3a><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><line x1="5" y1="12" x2="19" y2="12" data-v-b9fb0d3a></line><polyline points="12 5 19 12 12 19" data-v-b9fb0d3a></polyline></svg></div><div class="cf-acc-text" data-v-b9fb0d3a><div class="cf-acc-label" style="font-size:13px;" data-v-b9fb0d3a>Opening Cash &amp; Bank</div><div class="cf-acc-desc" data-v-b9fb0d3a>Balance at the beginning of the period</div></div>', 2)),
                  s("div", {
                    class: c(["cf-acc-amount", f(J).opening_cash >= 0 ? "green" : "red"])
                  }, a(f(S)(f(J).opening_cash)), 3)
                ]),
                s("div", Id, [
                  t[250] || (t[250] = x('<div class="cf-flow-icon cf-flow-icon-close" data-v-b9fb0d3a><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><line x1="19" y1="12" x2="5" y2="12" data-v-b9fb0d3a></line><polyline points="12 5 5 12 12 19" data-v-b9fb0d3a></polyline></svg></div><div class="cf-acc-text" data-v-b9fb0d3a><div class="cf-acc-label" style="font-size:13px;" data-v-b9fb0d3a>Closing Cash &amp; Bank</div><div class="cf-acc-desc" data-v-b9fb0d3a>Balance at the end of the period</div></div>', 2)),
                  s("div", {
                    class: c(["cf-acc-amount", f(J).closing_cash >= 0 ? "green" : "red"])
                  }, a(f(S)(f(J).closing_cash)), 3)
                ])
              ], 64)) : y("", !0)
            ]),
            s("div", Vd, [
              s("div", Nd, [
                t[252] || (t[252] = s("div", { class: "cf-trend-box-head" }, [
                  s("div", null, [
                    s("div", { class: "cf-trend-box-title" }, "Cash Flow Trend"),
                    s("div", { class: "cf-trend-box-sub" }, "Monthly cash flow movement")
                  ]),
                  s("div", { class: "cf-trend-period" }, "Monthly")
                ], -1)),
                Zt.value.length ? (l(), o("div", Ed, [
                  t[251] || (t[251] = s("div", { class: "cf-trend-baseline" }, null, -1)),
                  (l(!0), o(u, null, m(Zt.value, (e) => (l(), o("div", {
                    key: e.month,
                    class: "cf-trend-col"
                  }, [
                    s("div", {
                      class: "cf-trend-bar operating",
                      style: qs(Ve(e.operating)),
                      title: "Operating: " + f(S)(e.operating)
                    }, null, 12, qd),
                    s("div", {
                      class: "cf-trend-bar investing",
                      style: qs(Ve(e.investing)),
                      title: "Investing: " + f(S)(e.investing)
                    }, null, 12, Bd),
                    s("div", {
                      class: "cf-trend-bar financing",
                      style: qs(Ve(e.financing)),
                      title: "Financing: " + f(S)(e.financing)
                    }, null, 12, Ad),
                    s("div", $d, a(e.month), 1)
                  ]))), 128))
                ])) : (l(), o("div", Ld, "No monthly data for this range.")),
                t[253] || (t[253] = s("div", { class: "cf-trend-legend" }, [
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
              s("div", Qd, [
                t[255] || (t[255] = s("div", { class: "cf-summary-icon" }, "i", -1)),
                s("div", null, [
                  t[254] || (t[254] = s("div", { class: "cf-summary-title" }, "Summary", -1)),
                  s("div", Fd, [
                    os(" Cash " + a(f(J).net_change >= 0 ? "increased" : "decreased") + " by ", 1),
                    s("span", {
                      class: c(f(J).net_change >= 0 ? "green" : "red"),
                      style: { "font-weight": "700" }
                    }, a(f(S)(Math.abs(f(J).net_change))), 3),
                    os(" during this period, from " + a(f(S)(f(J).opening_cash)) + " to " + a(f(S)(f(J).closing_cash)) + ". ", 1)
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", zd, "Run the report to see results."))
        ])) : y("", !0),
        k.value === "gst" ? (l(), o("div", Hd, [
          s("div", Wd, [
            t[257] || (t[257] = x('<div class="bs-page-head-icon gst-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-b9fb0d3a></path><polyline points="14 2 14 8 20 8" data-v-b9fb0d3a></polyline></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>GST Summary</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Overview of GST collected during the selected period</div></div>', 2)),
            s("div", Ud, [
              s("div", Kd, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", Gd, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[19] || (t[19] = (e) => es("exportGstCSV")),
                  disabled: !((n = f(nt)) != null && n.length)
                }, [...t[256] || (t[256] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Yd),
                w.value === "exportGstCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[20] || (t[20] = (e) => w.value = "")
                  }),
                  s("div", Jd, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[21] || (t[21] = (e) => {
                        w.value = "", qa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[22] || (t[22] = (e) => {
                        w.value = "", Y(qa);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          f(vl) ? (l(), o("div", Zd)) : (r = f(nt)) != null && r.length ? (l(), o("div", Xd, [
            (l(!0), o(u, null, m(Sl.value, (e) => (l(), o("div", {
              key: e.tax_type,
              class: c(["gst-card", e.cls])
            }, [
              s("div", sr, [
                t[258] || (t[258] = x('<div class="gst-card-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><ellipse cx="12" cy="5" rx="8" ry="3" data-v-b9fb0d3a></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-b9fb0d3a></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" data-v-b9fb0d3a></path></svg></div>', 1)),
                s("div", null, [
                  s("div", tr, a(e.tax_type), 1),
                  s("div", er, a(e.desc), 1)
                ])
              ]),
              s("div", ar, [
                s("div", null, [
                  t[259] || (t[259] = s("div", { class: "gst-stat-label" }, "Invoice Count", -1)),
                  s("div", or, a(e.invoice_count), 1)
                ]),
                s("div", null, [
                  t[260] || (t[260] = s("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  s("div", lr, a(f(S)(e.total_tax)), 1)
                ])
              ])
            ], 2))), 128)),
            s("div", nr, [
              t[263] || (t[263] = x('<div class="gst-card-head" data-v-b9fb0d3a><div class="gst-card-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-b9fb0d3a></path><polyline points="14 2 14 8 20 8" data-v-b9fb0d3a></polyline><line x1="9" y1="17" x2="15" y2="17" data-v-b9fb0d3a></line><line x1="9" y1="13" x2="12" y2="13" data-v-b9fb0d3a></line></svg></div><div data-v-b9fb0d3a><div class="gst-card-title" data-v-b9fb0d3a>Total Summary</div><div class="gst-card-desc" data-v-b9fb0d3a>Combined GST for the selected period</div></div></div>', 1)),
              s("div", ir, [
                s("div", null, [
                  t[261] || (t[261] = s("div", { class: "gst-stat-label" }, "Total Invoices", -1)),
                  s("div", dr, a(Na.value), 1)
                ]),
                s("div", null, [
                  t[262] || (t[262] = s("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  s("div", rr, a(f(S)(Ea.value)), 1)
                ])
              ])
            ])
          ])) : (l(), o("div", ur, "Run the report to see results."))
        ])) : y("", !0),
        k.value === "ar" ? (l(), o("div", cr, [
          s("div", mr, [
            t[265] || (t[265] = x('<div class="bs-page-head-icon ar-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="12" cy="12" r="10" data-v-b9fb0d3a></circle><polyline points="12 6 12 12 16 14" data-v-b9fb0d3a></polyline></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Accounts Receivable Aging</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Outstanding customer balances, grouped by how overdue they are</div></div>', 2)),
            s("div", vr, [
              s("div", _r, "As of " + a(P(b.value)), 1),
              s("div", pr, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[23] || (t[23] = (e) => dt.value = !dt.value),
                  disabled: !rs.value.length
                }, [...t[264] || (t[264] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, br),
                dt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[24] || (t[24] = (e) => dt.value = !1)
                  }),
                  s("div", yr, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[25] || (t[25] = (e) => {
                        dt.value = !1, oe();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[26] || (t[26] = (e) => {
                        dt.value = !1, Y(oe);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[27] || (t[27] = (e) => {
                        dt.value = !1, kl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          Ne.value ? (l(), o("div", hr)) : rs.value.length ? (l(), o("div", gr, [
            s("div", kr, [
              t[267] || (t[267] = x('<div class="iws-total-icon iws-total-icon-neg" data-v-b9fb0d3a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="12" cy="12" r="10" data-v-b9fb0d3a></circle><polyline points="12 6 12 12 16 14" data-v-b9fb0d3a></polyline></svg></div><div class="iws-total-label" data-v-b9fb0d3a>Total Outstanding</div>', 2)),
              s("div", {
                class: "iws-total-value iws-total-value-neg",
                style: qs(G(d(Ms.value.total)))
              }, a(d(Ms.value.total)), 5),
              s("div", fr, a(rs.value.length) + " " + a(rs.value.length === 1 ? "Customer" : "Customers"), 1),
              Ms.value.days_90_plus ? (l(), o("div", wr, [
                t[266] || (t[266] = s("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                s("span", xr, a(d(Ms.value.days_90_plus)), 1)
              ])) : y("", !0)
            ]),
            s("div", Cr, [
              s("table", Sr, [
                s("thead", null, [
                  s("tr", null, [
                    t[275] || (t[275] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[28] || (t[28] = (e) => rt("customer")),
                      class: "iws-sortable"
                    }, [
                      t[268] || (t[268] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[29] || (t[29] = (e) => rt("current")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[269] || (t[269] = s("span", null, "Current (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("current")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[30] || (t[30] = (e) => rt("days_1_30")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[270] || (t[270] = s("span", null, "1–30 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("days_1_30")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[31] || (t[31] = (e) => rt("days_31_60")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[271] || (t[271] = s("span", null, "31–60 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("days_31_60")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[32] || (t[32] = (e) => rt("days_61_90")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[272] || (t[272] = s("span", null, "61–90 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("days_61_90")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[33] || (t[33] = (e) => rt("days_90_plus")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[273] || (t[273] = s("span", null, "90+ Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("days_90_plus")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[34] || (t[34] = (e) => rt("total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[274] || (t[274] = s("span", null, "Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", ut("total")])
                      }, "⇅", 2)
                    ]),
                    t[276] || (t[276] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(Ta.value, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", jr, a(g + 1), 1),
                    s("td", Mr, a(e.customer_name || e.customer), 1),
                    s("td", Dr, a(e.current > 0 ? z(e.current) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_1_30 > 0 ? "text-warn" : ""])
                    }, a(e.days_1_30 > 0 ? z(e.days_1_30) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_31_60 > 0 ? "text-danger" : ""])
                    }, a(e.days_31_60 > 0 ? z(e.days_31_60) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_61_90 > 0 ? "text-danger" : ""])
                    }, a(e.days_61_90 > 0 ? z(e.days_61_90) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_90_plus > 0 ? "text-danger fw-700" : ""])
                    }, a(e.days_90_plus > 0 ? z(e.days_90_plus) : "—"), 3),
                    s("td", Tr, a(d(e.total)), 1),
                    s("td", Or, [
                      s("div", Rr, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => $t.value = $t.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Pr),
                        $t.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[35] || (t[35] = (Q) => $t.value = null)
                          }),
                          s("div", Ir, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                $t.value = null, Oa(e, !0);
                              }
                            }, "Copy row", 8, Vr),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                $t.value = null, Ra(e, !0);
                              }
                            }, "Download row as CSV", 8, Nr)
                          ])
                        ], 64)) : y("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Er, [
                    t[277] || (t[277] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[278] || (t[278] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", qr, a(d(Ms.value.current)), 1),
                    s("td", Br, a(d(Ms.value.days_1_30)), 1),
                    s("td", Ar, a(d(Ms.value.days_31_60)), 1),
                    s("td", $r, a(d(Ms.value.days_61_90)), 1),
                    s("td", Lr, a(d(Ms.value.days_90_plus)), 1),
                    s("td", Qr, a(d(Ms.value.total)), 1),
                    t[279] || (t[279] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Fr, a(Ba.value ? "No outstanding receivables as of this date." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "ap" ? (l(), o("div", zr, [
          s("div", Hr, [
            t[281] || (t[281] = x('<div class="bs-page-head-icon ap-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="12" cy="12" r="10" data-v-b9fb0d3a></circle><polyline points="12 6 12 12 16 14" data-v-b9fb0d3a></polyline></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Accounts Payable Aging</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Outstanding vendor balances, grouped by how overdue they are</div></div>', 2)),
            s("div", Wr, [
              s("div", Ur, "As of " + a(P(b.value)), 1),
              s("div", Kr, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[36] || (t[36] = (e) => ct.value = !ct.value),
                  disabled: !us.value.length
                }, [...t[280] || (t[280] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Gr),
                ct.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[37] || (t[37] = (e) => ct.value = !1)
                  }),
                  s("div", Yr, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[38] || (t[38] = (e) => {
                        ct.value = !1, oe();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[39] || (t[39] = (e) => {
                        ct.value = !1, Y(oe);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[40] || (t[40] = (e) => {
                        ct.value = !1, fl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          Ee.value ? (l(), o("div", Jr)) : us.value.length ? (l(), o("div", Zr, [
            s("div", Xr, [
              t[283] || (t[283] = x('<div class="iws-total-icon iws-total-icon-neg" data-v-b9fb0d3a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="12" cy="12" r="10" data-v-b9fb0d3a></circle><polyline points="12 6 12 12 16 14" data-v-b9fb0d3a></polyline></svg></div><div class="iws-total-label" data-v-b9fb0d3a>Total Outstanding</div>', 2)),
              s("div", {
                class: "iws-total-value iws-total-value-neg",
                style: qs(G(d(Ds.value.total)))
              }, a(d(Ds.value.total)), 5),
              s("div", su, a(us.value.length) + " " + a(us.value.length === 1 ? "Vendor" : "Vendors"), 1),
              Ds.value.days_90_plus ? (l(), o("div", tu, [
                t[282] || (t[282] = s("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                s("span", eu, a(d(Ds.value.days_90_plus)), 1)
              ])) : y("", !0)
            ]),
            s("div", au, [
              s("table", ou, [
                s("thead", null, [
                  s("tr", null, [
                    t[291] || (t[291] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[41] || (t[41] = (e) => mt("supplier")),
                      class: "iws-sortable"
                    }, [
                      t[284] || (t[284] = s("span", null, "Vendor", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("supplier")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[42] || (t[42] = (e) => mt("current")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[285] || (t[285] = s("span", null, "Current (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("current")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[43] || (t[43] = (e) => mt("days_1_30")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[286] || (t[286] = s("span", null, "1–30 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("days_1_30")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[44] || (t[44] = (e) => mt("days_31_60")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[287] || (t[287] = s("span", null, "31–60 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("days_31_60")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[45] || (t[45] = (e) => mt("days_61_90")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[288] || (t[288] = s("span", null, "61–90 Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("days_61_90")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[46] || (t[46] = (e) => mt("days_90_plus")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[289] || (t[289] = s("span", null, "90+ Days (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("days_90_plus")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[47] || (t[47] = (e) => mt("total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[290] || (t[290] = s("span", null, "Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", vt("total")])
                      }, "⇅", 2)
                    ]),
                    t[292] || (t[292] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(Pa.value, (e, g) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", lu, a(g + 1), 1),
                    s("td", nu, a(e.supplier_name || e.supplier), 1),
                    s("td", iu, a(e.current > 0 ? z(e.current) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_1_30 > 0 ? "text-warn" : ""])
                    }, a(e.days_1_30 > 0 ? z(e.days_1_30) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_31_60 > 0 ? "text-danger" : ""])
                    }, a(e.days_31_60 > 0 ? z(e.days_31_60) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_61_90 > 0 ? "text-danger" : ""])
                    }, a(e.days_61_90 > 0 ? z(e.days_61_90) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.days_90_plus > 0 ? "text-danger fw-700" : ""])
                    }, a(e.days_90_plus > 0 ? z(e.days_90_plus) : "—"), 3),
                    s("td", du, a(d(e.total)), 1),
                    s("td", ru, [
                      s("div", uu, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Lt.value = Lt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, cu),
                        Lt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[48] || (t[48] = (Q) => Lt.value = null)
                          }),
                          s("div", mu, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Lt.value = null, Oa(e, !1);
                              }
                            }, "Copy row", 8, vu),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Lt.value = null, Ra(e, !1);
                              }
                            }, "Download row as CSV", 8, _u)
                          ])
                        ], 64)) : y("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", pu, [
                    t[293] || (t[293] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[294] || (t[294] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", bu, a(d(Ds.value.current)), 1),
                    s("td", yu, a(d(Ds.value.days_1_30)), 1),
                    s("td", hu, a(d(Ds.value.days_31_60)), 1),
                    s("td", gu, a(d(Ds.value.days_61_90)), 1),
                    s("td", ku, a(d(Ds.value.days_90_plus)), 1),
                    s("td", fu, a(d(Ds.value.total)), 1),
                    t[295] || (t[295] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", wu, a(Aa.value ? "No outstanding payables as of this date." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "items" ? (l(), o("div", xu, [
          s("div", Cu, [
            t[297] || (t[297] = x('<div class="bs-page-head-icon iws-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="9" cy="21" r="1" data-v-b9fb0d3a></circle><circle cx="20" cy="21" r="1" data-v-b9fb0d3a></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Item-wise Sales</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Sales summary by item for the selected period</div></div>', 2)),
            s("div", Su, [
              s("div", ju, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", Mu, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[49] || (t[49] = (e) => Ot.value = !Ot.value),
                  disabled: !As.value.length
                }, [...t[296] || (t[296] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Du),
                Ot.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[50] || (t[50] = (e) => Ot.value = !1)
                  }),
                  s("div", Tu, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[51] || (t[51] = (e) => {
                        Ot.value = !1, ga();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[52] || (t[52] = (e) => {
                        Ot.value = !1, Y(ga);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[53] || (t[53] = (e) => {
                        Ot.value = !1, nn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          qe.value ? (l(), o("div", Ou)) : As.value.length ? (l(), o("div", Ru, [
            s("div", Pu, [
              t[298] || (t[298] = x('<div class="iws-total-icon" data-v-b9fb0d3a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><line x1="6" y1="20" x2="6" y2="13" data-v-b9fb0d3a></line><line x1="12" y1="20" x2="12" y2="4" data-v-b9fb0d3a></line><line x1="18" y1="20" x2="18" y2="9" data-v-b9fb0d3a></line></svg></div><div class="iws-total-label" data-v-b9fb0d3a>Total Sales</div>', 2)),
              s("div", {
                class: "iws-total-value",
                style: qs(G(d(zs.value.amount)))
              }, a(d(zs.value.amount)), 5),
              s("div", Iu, a(As.value.length) + " " + a(As.value.length === 1 ? "Item" : "Items") + " • " + a(zs.value.invoices) + " " + a(zs.value.invoices === 1 ? "Invoice" : "Invoices"), 1)
            ]),
            s("div", Vu, [
              s("table", Nu, [
                s("thead", null, [
                  s("tr", null, [
                    t[306] || (t[306] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[54] || (t[54] = (e) => Rt("item")),
                      class: "iws-sortable"
                    }, [
                      t[299] || (t[299] = s("span", null, "Item", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("item")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[55] || (t[55] = (e) => Rt("uom")),
                      class: "iws-sortable"
                    }, [
                      t[300] || (t[300] = s("span", null, "UOM", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("uom")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[56] || (t[56] = (e) => Rt("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[301] || (t[301] = s("span", null, "Invoices", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[57] || (t[57] = (e) => Rt("qty_sold")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[302] || (t[302] = s("span", null, "Qty Sold", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("qty_sold")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[58] || (t[58] = (e) => Rt("avg_rate")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[303] || (t[303] = s("span", null, "Avg Rate (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("avg_rate")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[59] || (t[59] = (e) => Rt("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[304] || (t[304] = s("span", null, "Discount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("total_discount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[60] || (t[60] = (e) => Rt("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[305] || (t[305] = s("span", null, "Total Amount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Pt("total_amount")])
                      }, "⇅", 2)
                    ]),
                    t[307] || (t[307] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ha.value, (e, g) => (l(), o("tr", {
                    key: (e.item_code || e.item_name) + "|" + (e.uom || "") + "|" + g
                  }, [
                    s("td", Eu, a(g + 1), 1),
                    s("td", qu, a(e.item_name || e.item_code), 1),
                    s("td", null, [
                      s("span", Bu, a(e.uom || "—"), 1)
                    ]),
                    s("td", Au, a(e.invoice_count), 1),
                    s("td", $u, a(_(e.qty_sold)), 1),
                    s("td", Lu, a(z(e.avg_rate)), 1),
                    s("td", Qu, a(e.total_discount ? z(e.total_discount) : "—"), 1),
                    s("td", Fu, a(d(e.total_amount)), 1),
                    s("td", zu, [
                      s("div", Hu, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Gt.value = Gt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Wu),
                        Gt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[61] || (t[61] = (Q) => Gt.value = null)
                          }),
                          s("div", Uu, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Gt.value = null, dn(e);
                              }
                            }, "Copy row", 8, Ku),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Gt.value = null, rn(e);
                              }
                            }, "Download row as CSV", 8, Gu)
                          ])
                        ], 64)) : y("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Yu, [
                    t[308] || (t[308] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[309] || (t[309] = s("td", { class: "fw-700" }, "Total", -1)),
                    t[310] || (t[310] = s("td", null, null, -1)),
                    s("td", Ju, a(zs.value.invoices), 1),
                    s("td", Zu, a(_(zs.value.qty)), 1),
                    t[311] || (t[311] = s("td", null, null, -1)),
                    s("td", Xu, a(d(zs.value.discount)), 1),
                    s("td", sc, a(d(zs.value.amount)), 1),
                    t[312] || (t[312] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", tc, a($a.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "customers" ? (l(), o("div", ec, [
          s("div", ac, [
            t[314] || (t[314] = x('<div class="bs-page-head-icon cws-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-b9fb0d3a></path><circle cx="9" cy="7" r="4" data-v-b9fb0d3a></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-b9fb0d3a></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Customer-wise Sales</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Sales summary by customer for the selected period</div></div>', 2)),
            s("div", oc, [
              s("div", lc, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", nc, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[62] || (t[62] = (e) => It.value = !It.value),
                  disabled: !$s.value.length
                }, [...t[313] || (t[313] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, ic),
                It.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[63] || (t[63] = (e) => It.value = !1)
                  }),
                  s("div", dc, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[64] || (t[64] = (e) => {
                        It.value = !1, fa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[65] || (t[65] = (e) => {
                        It.value = !1, Y(fa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[66] || (t[66] = (e) => {
                        It.value = !1, un();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          Be.value ? (l(), o("div", rc)) : $s.value.length ? (l(), o("div", uc, [
            s("div", cc, [
              t[316] || (t[316] = x('<div class="iws-total-icon" data-v-b9fb0d3a><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><line x1="6" y1="20" x2="6" y2="13" data-v-b9fb0d3a></line><line x1="12" y1="20" x2="12" y2="4" data-v-b9fb0d3a></line><line x1="18" y1="20" x2="18" y2="9" data-v-b9fb0d3a></line></svg></div><div class="iws-total-label" data-v-b9fb0d3a>Total Sales</div>', 2)),
              s("div", {
                class: "iws-total-value",
                style: qs(G(d(_s.value.amount)))
              }, a(d(_s.value.amount)), 5),
              s("div", mc, a($s.value.length) + " " + a($s.value.length === 1 ? "Customer" : "Customers") + " • " + a(_s.value.invoices) + " " + a(_s.value.invoices === 1 ? "Invoice" : "Invoices"), 1),
              _s.value.outstanding ? (l(), o("div", vc, [
                t[315] || (t[315] = s("span", { class: "iws-total-sub-label" }, "Outstanding", -1)),
                s("span", _c, a(d(_s.value.outstanding)), 1)
              ])) : y("", !0)
            ]),
            s("div", pc, [
              s("table", bc, [
                s("thead", null, [
                  s("tr", null, [
                    t[325] || (t[325] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[67] || (t[67] = (e) => et("customer")),
                      class: "iws-sortable"
                    }, [
                      t[317] || (t[317] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[68] || (t[68] = (e) => et("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[318] || (t[318] = s("span", null, "Invoices", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[69] || (t[69] = (e) => et("net_total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[319] || (t[319] = s("span", null, "Net Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("net_total")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[70] || (t[70] = (e) => et("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[320] || (t[320] = s("span", null, "Discount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("total_discount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[71] || (t[71] = (e) => et("total_tax")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[321] || (t[321] = s("span", null, "Tax (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("total_tax")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[72] || (t[72] = (e) => et("avg_invoice_value")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[322] || (t[322] = s("span", null, "Avg Invoice (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("avg_invoice_value")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[73] || (t[73] = (e) => et("outstanding_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[323] || (t[323] = s("span", null, "Outstanding (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("outstanding_amount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[74] || (t[74] = (e) => et("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[324] || (t[324] = s("span", null, "Total Amount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", at("total_amount")])
                      }, "⇅", 2)
                    ]),
                    t[326] || (t[326] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ka.value, (e, g) => (l(), o("tr", {
                    key: (e.customer || e.customer_name) + "|" + g
                  }, [
                    s("td", yc, a(g + 1), 1),
                    s("td", hc, a(e.customer_name || e.customer), 1),
                    s("td", gc, a(e.invoice_count), 1),
                    s("td", kc, a(z(e.net_total)), 1),
                    s("td", fc, a(e.total_discount ? z(e.total_discount) : "—"), 1),
                    s("td", wc, a(z(e.total_tax)), 1),
                    s("td", xc, a(z(e.avg_invoice_value)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.outstanding_amount > 0 ? "red" : ""])
                    }, a(e.outstanding_amount ? d(e.outstanding_amount) : "—"), 3),
                    s("td", Cc, a(d(e.total_amount)), 1),
                    s("td", Sc, [
                      s("div", jc, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Yt.value = Yt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Mc),
                        Yt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[75] || (t[75] = (Q) => Yt.value = null)
                          }),
                          s("div", Dc, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Yt.value = null, cn(e);
                              }
                            }, "Copy row", 8, Tc),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Yt.value = null, mn(e);
                              }
                            }, "Download row as CSV", 8, Oc)
                          ])
                        ], 64)) : y("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Rc, [
                    t[327] || (t[327] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[328] || (t[328] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", Pc, a(_s.value.invoices), 1),
                    s("td", Ic, a(d(_s.value.net)), 1),
                    s("td", Vc, a(d(_s.value.discount)), 1),
                    s("td", Nc, a(d(_s.value.tax)), 1),
                    t[329] || (t[329] = s("td", null, null, -1)),
                    s("td", Ec, a(d(_s.value.outstanding)), 1),
                    s("td", qc, a(d(_s.value.amount)), 1),
                    t[330] || (t[330] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Bc, a(La.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "profit" ? (l(), o("div", Ac, [
          s("div", $c, [
            t[332] || (t[332] = x('<div class="bs-page-head-icon pw-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><line x1="12" y1="1" x2="12" y2="23" data-v-b9fb0d3a></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Profit-wise Report (by Item)</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost.</div></div>', 2)),
            s("div", Lc, [
              s("div", Qc, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", Fc, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[76] || (t[76] = (e) => wt.value = !wt.value),
                  disabled: !cs.value.length
                }, [...t[331] || (t[331] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, zc),
                wt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[77] || (t[77] = (e) => wt.value = !1)
                  }),
                  s("div", Hc, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[78] || (t[78] = (e) => {
                        wt.value = !1, wa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[79] || (t[79] = (e) => {
                        wt.value = !1, Y(wa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[80] || (t[80] = (e) => {
                        wt.value = !1, Jl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          Ae.value ? (l(), o("div", Wc)) : cs.value.length ? (l(), o(u, { key: 1 }, [
            s("div", Uc, [
              s("div", {
                class: c(["iws-total-panel", ft.value >= 0 ? "" : "iws-total-panel-neg"])
              }, [
                s("div", {
                  class: c(["iws-total-icon", ft.value >= 0 ? "" : "iws-total-icon-neg"])
                }, [...t[333] || (t[333] = [
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
                t[335] || (t[335] = s("div", { class: "iws-total-label" }, "Total Profit", -1)),
                s("div", {
                  class: c(["iws-total-value", ft.value >= 0 ? "" : "iws-total-value-neg"]),
                  style: qs(G(d(ft.value)))
                }, a(d(ft.value)), 7),
                s("div", Kc, [
                  os(a(cs.value.length) + " " + a(cs.value.length === 1 ? "Item" : "Items") + " • ", 1),
                  s("span", {
                    class: c(we.value >= 0 ? "green" : "red")
                  }, a(we.value.toFixed(1)) + "% margin", 3)
                ]),
                Wt.value ? (l(), o("div", Gc, [
                  t[334] || (t[334] = s("span", { class: "iws-total-sub-label" }, "No cost data", -1)),
                  s("span", Yc, a(Wt.value) + " item" + a(Wt.value > 1 ? "s" : ""), 1)
                ])) : y("", !0)
              ], 2),
              s("div", Jc, [
                s("table", Zc, [
                  s("thead", null, [
                    s("tr", null, [
                      t[343] || (t[343] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[81] || (t[81] = (e) => xt("item")),
                        class: "iws-sortable"
                      }, [
                        t[336] || (t[336] = s("span", null, "Item", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("item")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[82] || (t[82] = (e) => xt("qty_sold")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[337] || (t[337] = s("span", null, "Qty Sold", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("qty_sold")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[83] || (t[83] = (e) => xt("revenue")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[338] || (t[338] = s("span", null, "Revenue (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("revenue")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[84] || (t[84] = (e) => xt("cost_rate")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[339] || (t[339] = s("span", null, "Cost Rate (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("cost_rate")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[85] || (t[85] = (e) => xt("total_cost")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[340] || (t[340] = s("span", null, "Total Cost (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("total_cost")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[86] || (t[86] = (e) => xt("profit")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[341] || (t[341] = s("span", null, "Profit (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("profit")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[87] || (t[87] = (e) => xt("margin_pct")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[342] || (t[342] = s("span", null, "Margin %", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", Ct("margin_pct")])
                        }, "⇅", 2)
                      ]),
                      t[344] || (t[344] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(ba.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + "|" + g
                    }, [
                      s("td", Xc, a(g + 1), 1),
                      s("td", sm, [
                        os(a(e.item_name || e.item_code) + " ", 1),
                        e.cost_rate ? y("", !0) : (l(), o("span", tm, "no cost data"))
                      ]),
                      s("td", em, a(_(e.qty_sold)), 1),
                      s("td", am, a(z(e.revenue)), 1),
                      s("td", om, a(e.cost_rate ? z(e.cost_rate) : "—"), 1),
                      s("td", lm, a(e.total_cost ? z(e.total_cost) : "—"), 1),
                      s("td", {
                        class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                      s("td", {
                        class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3),
                      s("td", nm, [
                        s("div", im, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Ut.value = Ut.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, dm),
                          Ut.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[88] || (t[88] = (Q) => Ut.value = null)
                            }),
                            s("div", rm, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Ut.value = null, Zl(e);
                                }
                              }, "Copy row", 8, um),
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Ut.value = null, Xl(e);
                                }
                              }, "Download row as CSV", 8, cm)
                            ])
                          ], 64)) : y("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", mm, [
                      t[345] || (t[345] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[346] || (t[346] = s("td", { class: "fw-700" }, "Total", -1)),
                      s("td", vm, a(_(cs.value.reduce((e, g) => e + Number(g.qty_sold || 0), 0))), 1),
                      s("td", _m, a(d(cs.value.reduce((e, g) => e + Number(g.revenue || 0), 0))), 1),
                      t[347] || (t[347] = s("td", null, null, -1)),
                      s("td", pm, a(d(cs.value.filter((e) => e.cost_rate).reduce((e, g) => e + Number(g.total_cost || 0), 0))), 1),
                      s("td", {
                        class: c(["ta-r fw-700", ft.value >= 0 ? "green" : "red"])
                      }, a(d(ft.value)), 3),
                      s("td", {
                        class: c(["ta-r fw-700", we.value >= 0 ? "green" : "red"])
                      }, a(we.value.toFixed(1)) + "%", 3),
                      t[348] || (t[348] = s("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ]),
            Wt.value ? (l(), o("div", bm, a(Wt.value) + " item" + a(Wt.value > 1 ? "s" : "") + ' excluded from the profit/margin totals above — no valuation or standard buying rate found (see "no cost data" tag). ', 1)) : y("", !0)
          ], 64)) : (l(), o("div", ym, a(Qa.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "invoice_profit" ? (l(), o("div", hm, [
          s("div", gm, [
            t[350] || (t[350] = x('<div class="bs-page-head-icon ip-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-b9fb0d3a></path><polyline points="14 2 14 8 20 8" data-v-b9fb0d3a></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-b9fb0d3a></line><line x1="9" y1="11" x2="13" y2="11" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Invoice Profitability</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost. Tick rows to see profit for a single invoice or any combination of selected invoices.</div></div>', 2)),
            s("div", km, [
              s("div", fm, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", wm, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[89] || (t[89] = (e) => jt.value = !jt.value),
                  disabled: !ds.value.length
                }, [...t[349] || (t[349] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, xm),
                jt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[90] || (t[90] = (e) => jt.value = !1)
                  }),
                  s("div", Cm, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[91] || (t[91] = (e) => {
                        jt.value = !1, xa();
                      })
                    }, "Download CSV" + a(Os.value.size ? " (selected)" : ""), 1),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[92] || (t[92] = (e) => {
                        jt.value = !1, Y(xa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[93] || (t[93] = (e) => {
                        jt.value = !1, en();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          $e.value ? (l(), o("div", Sm)) : ds.value.length ? (l(), o("div", jm, [
            s("div", {
              class: c(["iws-total-panel", is.value.profit >= 0 ? "" : "iws-total-panel-neg"])
            }, [
              s("div", {
                class: c(["iws-total-icon", is.value.profit >= 0 ? "" : "iws-total-icon-neg"])
              }, [...t[351] || (t[351] = [
                x('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-b9fb0d3a></path><polyline points="14 2 14 8 20 8" data-v-b9fb0d3a></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-b9fb0d3a></line><line x1="9" y1="11" x2="13" y2="11" data-v-b9fb0d3a></line></svg>', 1)
              ])], 2),
              t[352] || (t[352] = s("div", { class: "iws-total-label" }, "Total Profit", -1)),
              s("div", {
                class: c(["iws-total-value", is.value.profit >= 0 ? "" : "iws-total-value-neg"]),
                style: qs(G(d(is.value.profit)))
              }, a(d(is.value.profit)), 7),
              s("div", Mm, [
                os(a(ds.value.length) + " " + a(ds.value.length === 1 ? "Invoice" : "Invoices") + " • ", 1),
                s("span", {
                  class: c(is.value.revenue ? is.value.profit >= 0 ? "green" : "red" : "")
                }, a(is.value.revenue ? (is.value.profit / is.value.revenue * 100).toFixed(1) : "0.0") + "% margin ", 3)
              ]),
              Os.value.size ? (l(), o("div", Dm, [
                s("span", Tm, a(ae.value.count) + " selected", 1),
                s("span", {
                  class: c(["iws-total-sub-value", ae.value.profit >= 0 ? "green" : "red"]),
                  style: { color: "inherit" }
                }, a(d(ae.value.profit)), 3),
                s("div", Om, " Revenue " + a(d(ae.value.revenue)) + " • Cost " + a(d(ae.value.total_cost)), 1)
              ])) : y("", !0)
            ], 2),
            s("div", Rm, [
              s("table", Pm, [
                s("thead", null, [
                  s("tr", null, [
                    s("th", Im, [
                      s("input", {
                        type: "checkbox",
                        checked: Co.value,
                        onChange: tn
                      }, null, 40, Vm)
                    ]),
                    s("th", {
                      onClick: t[94] || (t[94] = (e) => Dt("invoice")),
                      class: "iws-sortable"
                    }, [
                      t[353] || (t[353] = s("span", null, "Invoice", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("invoice")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[95] || (t[95] = (e) => Dt("posting_date")),
                      class: "iws-sortable"
                    }, [
                      t[354] || (t[354] = s("span", null, "Date", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("posting_date")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[96] || (t[96] = (e) => Dt("customer")),
                      class: "iws-sortable"
                    }, [
                      t[355] || (t[355] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[97] || (t[97] = (e) => Dt("revenue")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[356] || (t[356] = s("span", null, "Revenue (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("revenue")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[98] || (t[98] = (e) => Dt("total_cost")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[357] || (t[357] = s("span", null, "Est. Cost (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("total_cost")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[99] || (t[99] = (e) => Dt("profit")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[358] || (t[358] = s("span", null, "Profit (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("profit")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[100] || (t[100] = (e) => Dt("margin_pct")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[359] || (t[359] = s("span", null, "Margin %", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", Tt("margin_pct")])
                      }, "⇅", 2)
                    ]),
                    t[360] || (t[360] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(ya.value, (e) => (l(), o("tr", {
                    key: e.invoice,
                    class: c({ "row-selected": Os.value.has(e.invoice) })
                  }, [
                    s("td", Nm, [
                      s("input", {
                        type: "checkbox",
                        checked: Os.value.has(e.invoice),
                        onChange: (g) => sn(e.invoice)
                      }, null, 40, Em)
                    ]),
                    s("td", qm, [
                      s("a", {
                        href: "#",
                        class: "inv-detail-link",
                        onClick: wn((g) => za(e.invoice), ["prevent"])
                      }, a(e.invoice), 9, Bm),
                      e.no_cost_lines ? (l(), o("span", Am, "partial cost data")) : y("", !0)
                    ]),
                    s("td", $m, a(e.posting_date), 1),
                    s("td", Lm, a(e.customer_name || e.customer), 1),
                    s("td", Qm, a(d(e.revenue)), 1),
                    s("td", Fm, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(Number(e.margin_pct || 0).toFixed(1)) + "%", 3),
                    s("td", zm, [
                      s("div", Hm, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (g) => Mt.value = Mt.value === e.invoice ? null : e.invoice,
                          title: "Row actions"
                        }, "⋮", 8, Wm),
                        Mt.value === e.invoice ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[101] || (t[101] = (g) => Mt.value = null)
                          }),
                          s("div", Um, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Mt.value = null, za(e.invoice);
                              }
                            }, "View P&L", 8, Km),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Mt.value = null, an(e);
                              }
                            }, "Copy row", 8, Gm),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Mt.value = null, on(e);
                              }
                            }, "Download row as CSV", 8, Ym)
                          ])
                        ], 64)) : y("", !0)
                      ])
                    ])
                  ], 2))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Jm, [
                    t[361] || (t[361] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[362] || (t[362] = s("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "Total", -1)),
                    s("td", Zm, a(d(is.value.revenue)), 1),
                    s("td", Xm, a(d(is.value.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r fw-700", is.value.profit >= 0 ? "green" : "red"])
                    }, a(d(is.value.profit)), 3),
                    s("td", {
                      class: c(["ta-r fw-700", is.value.profit >= 0 ? "green" : "red"])
                    }, a(is.value.revenue ? (is.value.profit / is.value.revenue * 100).toFixed(1) : "0.0") + "%", 3),
                    t[363] || (t[363] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", sv, a(Fa.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        hn(kn, {
          show: Le.value,
          width: "720px",
          title: ns.value ? `Profit & Loss — ${ns.value.invoice.name}` : "Profit & Loss",
          onClose: t[102] || (t[102] = (e) => Le.value = !1)
        }, {
          default: gn(() => [
            Qe.value ? (l(), o("div", tv)) : ns.value ? (l(), o(u, { key: 1 }, [
              s("div", ev, [
                s("span", null, [
                  t[364] || (t[364] = os("Date: ", -1)),
                  s("strong", av, a(ns.value.invoice.posting_date), 1)
                ]),
                s("span", null, [
                  t[365] || (t[365] = os("Customer: ", -1)),
                  s("strong", ov, a(ns.value.invoice.customer_name || ns.value.invoice.customer), 1)
                ]),
                s("span", null, [
                  t[366] || (t[366] = os("Status: ", -1)),
                  s("strong", lv, a(ns.value.invoice.status), 1)
                ])
              ]),
              ns.value.totals.no_cost_lines ? (l(), o("div", nv, a(ns.value.totals.no_cost_lines) + " item" + a(ns.value.totals.no_cost_lines > 1 ? "s" : "") + ' below have no valuation or standard buying rate — their cost is shown as "—" and excluded from the totals. ', 1)) : y("", !0),
              s("table", iv, [
                t[369] || (t[369] = s("thead", null, [
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
                    s("td", dv, a(_(e.qty)), 1),
                    s("td", rv, a(d(e.rate)), 1),
                    s("td", uv, a(d(e.revenue)), 1),
                    s("td", cv, a(e.cost_rate ? d(e.cost_rate) : "—"), 1),
                    s("td", mv, a(e.cost_rate ? d(e.total_cost) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", vv, [
                    t[367] || (t[367] = s("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "TOTAL", -1)),
                    s("td", _v, a(d(ns.value.totals.revenue)), 1),
                    t[368] || (t[368] = s("td", null, null, -1)),
                    s("td", pv, a(d(ns.value.totals.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r fw-700", ns.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(d(ns.value.totals.profit)), 3),
                    s("td", {
                      class: c(["ta-r fw-700", ns.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(Number(ns.value.totals.margin_pct || 0).toFixed(1)) + "%", 3)
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", bv, "Couldn't load this invoice."))
          ]),
          _: 1
        }, 8, ["show", "title"]),
        k.value === "tb" ? (l(), o("div", yv, [
          s("div", hv, [
            t[371] || (t[371] = x('<div class="bs-page-head-icon tb-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><line x1="18" y1="20" x2="18" y2="10" data-v-b9fb0d3a></line><line x1="12" y1="20" x2="12" y2="4" data-v-b9fb0d3a></line><line x1="6" y1="20" x2="6" y2="14" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Trial Balance</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Account-wise opening, movement and closing balances for the selected period</div></div>', 2)),
            s("div", gv, [
              s("div", kv, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", fv, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[103] || (t[103] = (e) => it.value = !it.value),
                  disabled: !((p = f(Ks)) != null && p.length)
                }, [...t[370] || (t[370] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, wv),
                it.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[104] || (t[104] = (e) => it.value = !1)
                  }),
                  s("div", xv, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[105] || (t[105] = (e) => {
                        it.value = !1, Da();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[106] || (t[106] = (e) => {
                        it.value = !1, Y(Da);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[107] || (t[107] = (e) => {
                        it.value = !1, yl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          f(pl) ? (l(), o("div", Cv)) : (j = f(Ks)) != null && j.length ? (l(), o(u, { key: 1 }, [
            s("div", Sv, [
              s("div", jv, [
                t[373] || (t[373] = s("div", { class: "bs-kpi-icon" }, [
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
                s("div", Mv, [
                  t[372] || (t[372] = s("div", { class: "bs-kpi-label" }, "Total Debit", -1)),
                  s("div", Dv, a(d(ms.value.debit)), 1)
                ])
              ]),
              s("div", Tv, [
                t[375] || (t[375] = s("div", { class: "bs-kpi-icon" }, [
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
                s("div", Ov, [
                  t[374] || (t[374] = s("div", { class: "bs-kpi-label" }, "Total Credit", -1)),
                  s("div", Rv, a(d(ms.value.credit)), 1)
                ])
              ])
            ]),
            s("div", {
              class: c(["bs-sum-status", ue.value ? "bs-ok" : "bs-bad"])
            }, [
              s("span", Pv, a(ue.value ? "✓" : "✕"), 1),
              s("div", Iv, [
                s("div", Vv, a(ue.value ? "Total Debit = Total Credit" : "Trial balance out of balance"), 1),
                s("div", Nv, [
                  os(a(d(ms.value.debit)) + " vs " + a(d(ms.value.credit)), 1),
                  ue.value ? y("", !0) : (l(), o(u, { key: 0 }, [
                    os(" (diff " + a(d(ms.value.debit - ms.value.credit)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            s("div", Ev, [
              s("table", qv, [
                s("thead", null, [
                  s("tr", null, [
                    t[382] || (t[382] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[108] || (t[108] = (e) => Bt("account")),
                      class: "iws-sortable"
                    }, [
                      t[376] || (t[376] = s("span", null, "Account", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", At("account")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[109] || (t[109] = (e) => Bt("account_type")),
                      class: "iws-sortable"
                    }, [
                      t[377] || (t[377] = s("span", null, "Type", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", At("account_type")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[110] || (t[110] = (e) => Bt("opening")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[378] || (t[378] = s("span", null, "Opening (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", At("opening")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[111] || (t[111] = (e) => Bt("debit")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[379] || (t[379] = s("span", null, "Debit (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", At("debit")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[112] || (t[112] = (e) => Bt("credit")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[380] || (t[380] = s("span", null, "Credit (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", At("credit")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[113] || (t[113] = (e) => Bt("closing")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[381] || (t[381] = s("span", null, "Closing (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", At("closing")])
                      }, "⇅", 2)
                    ]),
                    t[383] || (t[383] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(Ie.value, (e, g) => (l(), o("tr", {
                    key: e.account
                  }, [
                    s("td", Bv, a(g + 1), 1),
                    s("td", Av, a(e.account), 1),
                    s("td", null, [
                      s("span", $v, a(e.account_type), 1)
                    ]),
                    s("td", {
                      class: c(["ta-r mono-sm", e.opening < 0 ? "red" : ""])
                    }, a(z(e.opening || 0)), 3),
                    s("td", Lv, a(e.debit ? z(e.debit) : "—"), 1),
                    s("td", Qv, a(e.credit ? z(e.credit) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.closing < 0 ? "red" : "green"])
                    }, a(d(e.closing || 0)), 3),
                    s("td", Fv, [
                      s("div", zv, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => qt.value = qt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Hv),
                        qt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[114] || (t[114] = (Q) => qt.value = null)
                          }),
                          s("div", Wv, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                qt.value = null, hl(e);
                              }
                            }, "Copy row", 8, Uv),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                qt.value = null, gl(e);
                              }
                            }, "Download row as CSV", 8, Kv)
                          ])
                        ], 64)) : y("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Gv, [
                    t[384] || (t[384] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[385] || (t[385] = s("td", { class: "fw-700" }, "Total", -1)),
                    t[386] || (t[386] = s("td", null, null, -1)),
                    s("td", Yv, a(d(ms.value.opening)), 1),
                    s("td", Jv, a(d(ms.value.debit)), 1),
                    s("td", Zv, a(d(ms.value.credit)), 1),
                    s("td", Xv, a(d(ms.value.closing)), 1),
                    t[387] || (t[387] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ], 64)) : (l(), o("div", s1, "Run the report to see results."))
        ])) : y("", !0),
        k.value === "stockgl" ? (l(), o("div", t1, [
          s("div", e1, [
            t[389] || (t[389] = x('<div class="bs-page-head-icon sgl-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-b9fb0d3a></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-b9fb0d3a></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Stock Ledger vs Inventory GL</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Compares the operational Stock Ledger (Bin valuation) against the financial General Ledger (Inventory Asset account balance) — this check is the tripwire that catches drift immediately instead of at year-end audit.</div></div>', 2)),
            s("div", a1, [
              s("div", o1, "As of " + a(P(b.value)), 1),
              s("div", l1, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[115] || (t[115] = (e) => _t.value = !_t.value),
                  disabled: !ss.value
                }, [...t[388] || (t[388] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, n1),
                _t.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[116] || (t[116] = (e) => _t.value = !1)
                  }),
                  s("div", i1, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[117] || (t[117] = (e) => {
                        _t.value = !1, Dl();
                      })
                    }, "Download account summary (CSV)"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[118] || (t[118] = (e) => {
                        _t.value = !1, Pl();
                      })
                    }, "Download item-level detail (CSV)"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[119] || (t[119] = (e) => {
                        _t.value = !1, Ol();
                      })
                    }, "Copy item-level detail")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          Fe.value ? (l(), o("div", d1)) : ss.value ? (l(), o(u, { key: 1 }, [
            s("div", r1, [
              s("div", u1, [
                t[391] || (t[391] = s("div", { class: "bs-kpi-icon" }, [
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
                s("div", c1, [
                  t[390] || (t[390] = s("div", { class: "bs-kpi-label" }, "Bin Stock Value", -1)),
                  s("div", m1, a(d(ss.value.total_bin_value)), 1)
                ])
              ]),
              s("div", v1, [
                t[393] || (t[393] = s("div", { class: "bs-kpi-icon" }, [
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
                s("div", _1, [
                  t[392] || (t[392] = s("div", { class: "bs-kpi-label" }, "Inventory GL Balance", -1)),
                  s("div", p1, a(d(ss.value.total_gl_balance)), 1)
                ])
              ]),
              s("div", {
                class: c(["bs-kpi", ss.value.is_reconciled ? "bs-kpi-assets" : "bs-kpi-liabilities"])
              }, [
                t[395] || (t[395] = s("div", { class: "bs-kpi-icon" }, [
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
                s("div", b1, [
                  t[394] || (t[394] = s("div", { class: "bs-kpi-label" }, "Difference", -1)),
                  s("div", {
                    class: c(["bs-kpi-amount", ss.value.is_reconciled ? "" : "text-danger"])
                  }, a(d(ss.value.total_difference)), 3)
                ])
              ], 2)
            ]),
            s("div", {
              class: c(["bs-sum-status", ss.value.is_reconciled ? "bs-ok" : "bs-bad"])
            }, [
              s("span", y1, a(ss.value.is_reconciled ? "✓" : "✕"), 1),
              s("div", h1, [
                s("div", g1, a(ss.value.is_reconciled ? "Bin Stock Value = Inventory GL Balance" : "Stock and GL are out of sync"), 1),
                s("div", k1, [
                  os(a(d(ss.value.total_bin_value)) + " vs " + a(d(ss.value.total_gl_balance)), 1),
                  ss.value.is_reconciled ? y("", !0) : (l(), o(u, { key: 0 }, [
                    os(" (diff " + a(d(ss.value.total_difference)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            ss.value.grir_account ? (l(), o("div", f1, [
              t[396] || (t[396] = s("strong", null, "Stock Received (GR/IR):", -1)),
              t[397] || (t[397] = os()),
              s("span", w1, a(d(ss.value.grir_balance)), 1),
              t[398] || (t[398] = s("span", null, " — goods received, awaiting bill. Nonzero is normal.", -1))
            ])) : y("", !0),
            (D = ss.value.accounts) != null && D.length ? (l(), o(u, { key: 1 }, [
              t[406] || (t[406] = s("div", { class: "iws-section-label" }, "By Inventory Account", -1)),
              s("div", x1, [
                s("table", C1, [
                  s("thead", null, [
                    s("tr", null, [
                      t[403] || (t[403] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[120] || (t[120] = (e) => pe("account")),
                        class: "iws-sortable"
                      }, [
                        t[399] || (t[399] = s("span", null, "Inventory Account", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("account")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[121] || (t[121] = (e) => pe("bin_stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[400] || (t[400] = s("span", null, "Bin Stock Value (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("bin_stock_value")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[122] || (t[122] = (e) => pe("gl_balance")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[401] || (t[401] = s("span", null, "GL Balance (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("gl_balance")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[123] || (t[123] = (e) => pe("difference")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[402] || (t[402] = s("span", null, "Difference (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", be("difference")])
                        }, "⇅", 2)
                      ]),
                      t[404] || (t[404] = s("th", null, "Status", -1)),
                      t[405] || (t[405] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(Wa.value, (e, g) => (l(), o("tr", {
                      key: e.account
                    }, [
                      s("td", S1, a(g + 1), 1),
                      s("td", j1, a(e.account), 1),
                      s("td", M1, a(z(e.bin_stock_value)), 1),
                      s("td", D1, a(z(e.gl_balance)), 1),
                      s("td", {
                        class: c(["ta-r mono-sm", e.is_reconciled ? "" : "text-danger fw-700"])
                      }, a(z(e.difference)), 3),
                      s("td", null, [
                        s("span", {
                          class: c(["badge", e.is_reconciled ? "badge-blue" : "badge-danger"])
                        }, a(e.is_reconciled ? "OK" : "DRIFT"), 3)
                      ]),
                      s("td", T1, [
                        s("div", O1, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Xt.value = Xt.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, R1),
                          Xt.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[124] || (t[124] = (Q) => Xt.value = null)
                            }),
                            s("div", P1, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Xt.value = null, Ml(e);
                                }
                              }, "Copy row", 8, I1)
                            ])
                          ], 64)) : y("", !0)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ])
            ], 64)) : y("", !0),
            (V = ss.value.items) != null && V.length ? (l(), o(u, { key: 2 }, [
              t[418] || (t[418] = s("div", { class: "iws-section-label" }, "Item-level Bin Detail", -1)),
              s("div", V1, [
                s("table", N1, [
                  s("thead", null, [
                    s("tr", null, [
                      t[412] || (t[412] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[125] || (t[125] = (e) => se("item")),
                        class: "iws-sortable"
                      }, [
                        t[407] || (t[407] = s("span", null, "Item", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", te("item")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[126] || (t[126] = (e) => se("warehouse")),
                        class: "iws-sortable"
                      }, [
                        t[408] || (t[408] = s("span", null, "Warehouse", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", te("warehouse")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[127] || (t[127] = (e) => se("actual_qty")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[409] || (t[409] = s("span", null, "Qty", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", te("actual_qty")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[128] || (t[128] = (e) => se("valuation_rate")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[410] || (t[410] = s("span", null, "Valuation Rate (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", te("valuation_rate")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[129] || (t[129] = (e) => se("stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[411] || (t[411] = s("span", null, "Stock Value (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", te("stock_value")])
                        }, "⇅", 2)
                      ]),
                      t[413] || (t[413] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(ze.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + e.warehouse
                    }, [
                      s("td", E1, a(g + 1), 1),
                      s("td", q1, a(e.item_name || e.item_code), 1),
                      s("td", null, [
                        s("span", B1, a(e.warehouse), 1)
                      ]),
                      s("td", A1, a(_(e.actual_qty)), 1),
                      s("td", $1, a(z(e.valuation_rate)), 1),
                      s("td", L1, a(d(e.stock_value)), 1),
                      s("td", Q1, [
                        s("div", F1, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Qt.value = Qt.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, z1),
                          Qt.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[130] || (t[130] = (Q) => Qt.value = null)
                            }),
                            s("div", H1, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Qt.value = null, Tl(e);
                                }
                              }, "Copy row", 8, W1),
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Qt.value = null, Rl(e);
                                }
                              }, "Download row as CSV", 8, U1)
                            ])
                          ], 64)) : y("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", K1, [
                      t[414] || (t[414] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[415] || (t[415] = s("td", {
                        colspan: "3",
                        class: "fw-700"
                      }, "Total", -1)),
                      t[416] || (t[416] = s("td", null, null, -1)),
                      s("td", G1, a(d(He.value)), 1),
                      t[417] || (t[417] = s("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", Y1, a(Ha.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "stockval" ? (l(), o("div", J1, [
          s("div", Z1, [
            t[420] || (t[420] = x('<div class="bs-page-head-icon sv-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="3" y="3" width="18" height="18" rx="2" data-v-b9fb0d3a></rect><path d="M3 9h18" data-v-b9fb0d3a></path><path d="M9 21V9" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Stock Valuation Summary</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Total stock value per warehouse, from current Bin valuation. Reflects live stock on hand — not a historical point-in-time snapshot, since stock quantities aren&#39;t tracked by date.</div></div>', 2)),
            s("div", X1, [
              s("div", s_, "As of " + a(P(b.value)), 1),
              s("div", t_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[131] || (t[131] = (e) => es("exportStockValCSV")),
                  disabled: !((Vt = (Es = Cs.value) == null ? void 0 : Es.by_warehouse) != null && Vt.length)
                }, [...t[419] || (t[419] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, e_),
                w.value === "exportStockValCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[132] || (t[132] = (e) => w.value = "")
                  }),
                  s("div", a_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[133] || (t[133] = (e) => {
                        w.value = "", So();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[134] || (t[134] = (e) => {
                        w.value = "", Y(So);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          We.value ? (l(), o("div", o_)) : Cs.value ? (l(), o(u, { key: 1 }, [
            s("div", l_, [
              s("div", n_, [
                t[422] || (t[422] = x('<div class="bs-kpi-icon" data-v-b9fb0d3a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-b9fb0d3a><rect x="3" y="3" width="18" height="18" rx="2" data-v-b9fb0d3a></rect><path d="M3 9h18" data-v-b9fb0d3a></path><path d="M9 21V9" data-v-b9fb0d3a></path></svg></div>', 1)),
                s("div", i_, [
                  t[421] || (t[421] = s("div", { class: "bs-kpi-label" }, "Grand Total Stock Value", -1)),
                  s("div", d_, a(d(Cs.value.grand_total)), 1)
                ])
              ])
            ]),
            (zo = Cs.value.by_warehouse) != null && zo.length ? (l(), o(u, { key: 0 }, [
              t[427] || (t[427] = s("div", { class: "iws-section-label" }, "By Warehouse", -1)),
              s("div", r_, [
                s("table", u_, [
                  t[426] || (t[426] = s("thead", null, [
                    s("tr", null, [
                      s("th", { class: "iws-idx" }, "#"),
                      s("th", null, "Warehouse"),
                      s("th", { class: "ta-r" }, "Stock Value (KES)"),
                      s("th", { class: "ta-r" }, "% of Total")
                    ])
                  ], -1)),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(Cs.value.by_warehouse, (e, g) => (l(), o("tr", {
                      key: e.warehouse
                    }, [
                      s("td", c_, a(g + 1), 1),
                      s("td", m_, a(e.warehouse), 1),
                      s("td", v_, a(d(e.stock_value)), 1),
                      s("td", __, a(Cs.value.grand_total ? (e.stock_value / Cs.value.grand_total * 100).toFixed(1) + "%" : "—"), 1)
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", p_, [
                      t[423] || (t[423] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[424] || (t[424] = s("td", { class: "fw-700" }, "Total", -1)),
                      s("td", b_, a(d(Cs.value.grand_total)), 1),
                      t[425] || (t[425] = s("td", { class: "ta-r fw-700" }, "100.0%", -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", y_, "No stock on hand in any warehouse."))
          ], 64)) : (l(), o("div", h_, a(Ga.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "price_mrp" ? (l(), o("div", g_, [
          s("div", k_, [
            t[429] || (t[429] = x('<div class="bs-page-head-icon sv-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-b9fb0d3a></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Selling Price &amp; MRP</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Item-wise selling price and MRP per warehouse, from the Item master. Where MRP is not set on an item, the selling price is shown as MRP.</div></div>', 2)),
            s("div", f_, [
              s("div", w_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[135] || (t[135] = (e) => es("exportPriceMrpCSV")),
                  disabled: !ke.value.length
                }, [...t[428] || (t[428] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, x_),
                w.value === "exportPriceMrpCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[136] || (t[136] = (e) => w.value = "")
                  }),
                  s("div", C_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[137] || (t[137] = (e) => {
                        w.value = "", jo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[138] || (t[138] = (e) => {
                        w.value = "", Y(jo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", S_, [
            Hs(s("input", {
              type: "text",
              "onUpdate:modelValue": t[139] || (t[139] = (e) => Ke.value = e),
              class: "dr-input",
              placeholder: "Search item code or name",
              style: { "min-width": "220px" }
            }, null, 512), [
              [ot, Ke.value]
            ]),
            Hs(s("select", {
              "onUpdate:modelValue": t[140] || (t[140] = (e) => ge.value = e),
              class: "dr-input"
            }, [
              t[430] || (t[430] = s("option", { value: "" }, "All warehouses", -1)),
              (l(!0), o(u, null, m(((Ho = ee.value) == null ? void 0 : Ho.warehouses) || [], (e) => (l(), o("option", {
                key: e,
                value: e
              }, a(e), 9, j_))), 128))
            ], 512), [
              [Yo, ge.value]
            ])
          ]),
          Ue.value ? (l(), o("div", M_)) : ee.value && ke.value.length ? (l(), o("div", D_, [
            s("table", T_, [
              t[431] || (t[431] = s("thead", null, [
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
                (l(!0), o(u, null, m(ke.value, (e, g) => (l(), o("tr", {
                  key: e.item_code + "|" + e.warehouse
                }, [
                  s("td", O_, a(g + 1), 1),
                  s("td", R_, [
                    os(a(e.item_name || e.item_code), 1),
                    s("div", P_, a(e.item_code), 1)
                  ]),
                  s("td", null, a(e.warehouse || "—"), 1),
                  s("td", I_, a(e.qty) + " " + a(e.uom), 1),
                  s("td", V_, a(d(e.selling_price)), 1),
                  s("td", N_, a(d(e.mrp)), 1)
                ]))), 128))
              ])
            ])
          ])) : (l(), o("div", E_, a(Ya.value ? "No items found." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "mis" ? (l(), o("div", q_, [
          s("div", B_, [
            t[433] || (t[433] = x('<div class="bs-page-head-icon mis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="3" y="4" width="18" height="18" rx="2" data-v-b9fb0d3a></rect><line x1="3" y1="10" x2="21" y2="10" data-v-b9fb0d3a></line><line x1="8" y1="2" x2="8" y2="6" data-v-b9fb0d3a></line><line x1="16" y1="2" x2="16" y2="6" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Daily Business MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Day-by-day snapshot of Sales, Collection, Purchase, Expenses, Dispatch, Production, Stock Inward/Outward and running Outstanding for the selected period.</div></div>', 2)),
            s("div", A_, [
              s("div", $_, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", L_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[141] || (t[141] = (e) => es("exportDailyMisCSV")),
                  disabled: !((Uo = (Wo = Z.value) == null ? void 0 : Wo.days) != null && Uo.length)
                }, [...t[432] || (t[432] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Q_),
                w.value === "exportDailyMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[142] || (t[142] = (e) => w.value = "")
                  }),
                  s("div", F_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[143] || (t[143] = (e) => {
                        w.value = "", Mo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[144] || (t[144] = (e) => {
                        w.value = "", Y(Mo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          Ge.value ? (l(), o("div", z_)) : Z.value ? (l(), o(u, { key: 1 }, [
            s("div", H_, [
              s("div", W_, [
                t[434] || (t[434] = s("span", { class: "bucket-label" }, "Daily Sales", -1)),
                s("span", U_, a(d(Z.value.totals.sales_amount)), 1)
              ]),
              s("div", K_, [
                t[435] || (t[435] = s("span", { class: "bucket-label" }, "Daily Collection", -1)),
                s("span", G_, a(d(Z.value.totals.collection_amount)), 1)
              ]),
              s("div", Y_, [
                t[436] || (t[436] = s("span", { class: "bucket-label" }, "Daily Purchase", -1)),
                s("span", J_, a(d(Z.value.totals.purchase_amount)), 1)
              ]),
              s("div", Z_, [
                t[437] || (t[437] = s("span", { class: "bucket-label" }, "Daily Expenses", -1)),
                s("span", X_, a(d(Z.value.totals.expense_amount)), 1)
              ]),
              s("div", sp, [
                t[438] || (t[438] = s("span", { class: "bucket-label" }, "Daily Dispatch", -1)),
                s("span", tp, a(_(Z.value.totals.dispatch_qty)) + " qty", 1)
              ]),
              s("div", ep, [
                t[439] || (t[439] = s("span", { class: "bucket-label" }, "Daily Production", -1)),
                s("span", ap, a(_(Z.value.totals.production_qty)) + " qty", 1)
              ]),
              s("div", op, [
                t[440] || (t[440] = s("span", { class: "bucket-label" }, "Stock Inward / Outward", -1)),
                s("span", lp, a(_(Z.value.totals.stock_inward_qty)) + " / " + a(_(Z.value.totals.stock_outward_qty)), 1)
              ]),
              s("div", np, [
                t[441] || (t[441] = s("span", { class: "bucket-label" }, "Closing Outstanding", -1)),
                s("span", {
                  class: c(["mis-summary-val", Z.value.totals.closing_outstanding >= 0 ? "" : "green"])
                }, a(d(Z.value.totals.closing_outstanding)), 3)
              ])
            ]),
            (Ko = Z.value.days) != null && Ko.length ? (l(), o(u, { key: 0 }, [
              t[444] || (t[444] = s("div", { class: "iws-section-label" }, "Day by Day", -1)),
              s("div", ip, [
                s("table", dp, [
                  t[443] || (t[443] = s("thead", null, [
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
                      s("td", rp, a(e.date), 1),
                      s("td", up, a(d(e.sales_amount)), 1),
                      s("td", cp, a(d(e.collection_amount)), 1),
                      s("td", mp, a(d(e.purchase_amount)), 1),
                      s("td", vp, a(d(e.expense_amount)), 1),
                      s("td", _p, a(_(e.dispatch_qty)), 1),
                      s("td", pp, a(_(e.production_qty)), 1),
                      s("td", bp, a(_(e.stock_inward_qty)), 1),
                      s("td", yp, a(_(e.stock_outward_qty)), 1),
                      s("td", hp, a(d(e.outstanding)), 1)
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", gp, [
                      t[442] || (t[442] = s("td", { class: "fw-700" }, "TOTAL", -1)),
                      s("td", kp, a(d(Z.value.totals.sales_amount)), 1),
                      s("td", fp, a(d(Z.value.totals.collection_amount)), 1),
                      s("td", wp, a(d(Z.value.totals.purchase_amount)), 1),
                      s("td", xp, a(d(Z.value.totals.expense_amount)), 1),
                      s("td", Cp, a(_(Z.value.totals.dispatch_qty)), 1),
                      s("td", Sp, a(_(Z.value.totals.production_qty)), 1),
                      s("td", jp, a(_(Z.value.totals.stock_inward_qty)), 1),
                      s("td", Mp, a(_(Z.value.totals.stock_outward_qty)), 1),
                      s("td", Dp, a(d(Z.value.totals.closing_outstanding)), 1)
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Tp, "No activity in this period."))
          ], 64)) : (l(), o("div", Op, a(Ja.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "sales_mis" ? (l(), o("div", Rp, [
          s("div", Pp, [
            t[446] || (t[446] = x('<div class="bs-page-head-icon smis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M3 3v18h18" data-v-b9fb0d3a></path><path d="M18 17V9" data-v-b9fb0d3a></path><path d="M13 17V5" data-v-b9fb0d3a></path><path d="M8 17v-3" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Sales MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Sales performance broken down by summary, target, product, customer, salesperson, branch, returns, discounts, pending orders and conversion.</div></div>', 2)),
            s("div", Ip, [
              s("div", Vp, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", Np, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[145] || (t[145] = (e) => es("exportSalesMisCSV")),
                  disabled: !R.value
                }, [...t[445] || (t[445] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Ep),
                w.value === "exportSalesMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[146] || (t[146] = (e) => w.value = "")
                  }),
                  s("div", qp, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[147] || (t[147] = (e) => {
                        w.value = "", Do();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[148] || (t[148] = (e) => {
                        w.value = "", Y(Do);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Bp, [
            (l(), o(u, null, m(Il, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: ys.value === e.key }]),
              onClick: (g) => ys.value = e.key
            }, a(e.label), 11, Ap)), 64))
          ]),
          Ye.value ? (l(), o("div", $p)) : R.value ? (l(), o(u, { key: 1 }, [
            ys.value === "summary" ? (l(), o("div", Lp, [
              s("div", Qp, [
                t[447] || (t[447] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                s("span", Fp, a(_(R.value.summary.invoice_count)), 1)
              ]),
              s("div", zp, [
                t[448] || (t[448] = s("span", { class: "bucket-label" }, "Net Sales", -1)),
                s("span", Hp, a(d(R.value.summary.net_sales)), 1)
              ]),
              s("div", Wp, [
                t[449] || (t[449] = s("span", { class: "bucket-label" }, "Total Tax", -1)),
                s("span", Up, a(d(R.value.summary.total_tax)), 1)
              ]),
              s("div", Kp, [
                t[450] || (t[450] = s("span", { class: "bucket-label" }, "Discount Given", -1)),
                s("span", Gp, a(d(R.value.summary.header_discount)), 1)
              ]),
              s("div", Yp, [
                t[451] || (t[451] = s("span", { class: "bucket-label" }, "Grand Total", -1)),
                s("span", Jp, a(d(R.value.summary.grand_total)), 1)
              ]),
              s("div", Zp, [
                t[452] || (t[452] = s("span", { class: "bucket-label" }, "Qty Sold", -1)),
                s("span", Xp, a(_(R.value.summary.total_qty)), 1)
              ]),
              s("div", sb, [
                t[453] || (t[453] = s("span", { class: "bucket-label" }, "Avg Invoice Value", -1)),
                s("span", tb, a(d(R.value.summary.avg_invoice_value)), 1)
              ])
            ])) : ys.value === "target" ? (l(), o(u, { key: 1 }, [
              s("div", eb, [
                t[454] || (t[454] = s("label", { class: "dr-label" }, "Sales Target (KES)", -1)),
                Hs(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[149] || (t[149] = (e) => bt.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    ot,
                    bt.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[455] || (t[455] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actuals for this period.", -1))
              ]),
              s("div", ab, [
                s("div", ob, [
                  t[456] || (t[456] = s("span", { class: "bucket-label" }, "Target", -1)),
                  s("span", lb, a(d(bt.value)), 1)
                ]),
                s("div", nb, [
                  t[457] || (t[457] = s("span", { class: "bucket-label" }, "Achieved", -1)),
                  s("span", ib, a(d(R.value.summary.grand_total)), 1)
                ]),
                s("div", db, [
                  t[458] || (t[458] = s("span", { class: "bucket-label" }, "Achievement %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", Xa.value >= 100 ? "green" : "red"])
                  }, a(Xa.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", R.value.summary.grand_total >= bt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[459] || (t[459] = s("span", null, "Variance (Achieved − Target)", -1)),
                s("span", rb, a(f(S)(R.value.summary.grand_total - bt.value)), 1)
              ], 2)
            ], 64)) : ys.value === "product" ? (l(), o("table", ub, [
              t[460] || (t[460] = s("thead", null, [
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
                  s("td", cb, a(e.invoice_count), 1),
                  s("td", mb, a(_(e.qty_sold)), 1),
                  s("td", vb, a(d(e.total_discount)), 1),
                  s("td", _b, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "customer" ? (l(), o("table", pb, [
              t[461] || (t[461] = s("thead", null, [
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
                  s("td", bb, a(e.invoice_count), 1),
                  s("td", yb, a(d(e.total_amount)), 1),
                  s("td", hb, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "salesperson" ? (l(), o("table", gb, [
              t[462] || (t[462] = s("thead", null, [
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
                  s("td", kb, a(e.invoice_count), 1),
                  s("td", fb, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "branch" ? (l(), o(u, { key: 5 }, [
              t[464] || (t[464] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "10px" } }, "No dedicated Branch/Location doctype exists — grouped by Cost Center as a proxy.", -1)),
              s("table", wb, [
                t[463] || (t[463] = s("thead", null, [
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
                    s("td", xb, a(e.invoice_count), 1),
                    s("td", Cb, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : ys.value === "returns" ? (l(), o(u, { key: 6 }, [
              s("div", Sb, [
                s("div", jb, [
                  t[465] || (t[465] = s("span", { class: "bucket-label" }, "Return Count", -1)),
                  s("span", Mb, a(R.value.sales_return.return_count), 1)
                ]),
                s("div", Db, [
                  t[466] || (t[466] = s("span", { class: "bucket-label" }, "Return Value", -1)),
                  s("span", Tb, a(d(R.value.sales_return.return_total)), 1)
                ]),
                s("div", Ob, [
                  t[467] || (t[467] = s("span", { class: "bucket-label" }, "% of Sales", -1)),
                  s("span", Rb, a(R.value.sales_return.return_pct_of_sales.toFixed(1)) + "%", 1)
                ])
              ]),
              R.value.sales_return.rows.length ? (l(), o("table", Pb, [
                t[468] || (t[468] = s("thead", null, [
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
                    s("td", Ib, a(d(e.grand_total)), 1),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Vb, "No sales returns in this period."))
            ], 64)) : ys.value === "discount" ? (l(), o(u, { key: 7 }, [
              s("div", Nb, [
                s("div", Eb, [
                  t[469] || (t[469] = s("span", { class: "bucket-label" }, "Line Discount", -1)),
                  s("span", qb, a(d(R.value.discount_analysis.total_line_discount)), 1)
                ]),
                s("div", Bb, [
                  t[470] || (t[470] = s("span", { class: "bucket-label" }, "Header Discount", -1)),
                  s("span", Ab, a(d(R.value.discount_analysis.total_header_discount)), 1)
                ]),
                s("div", $b, [
                  t[471] || (t[471] = s("span", { class: "bucket-label" }, "Avg Discount %", -1)),
                  s("span", Lb, a(R.value.discount_analysis.avg_discount_pct.toFixed(1)) + "%", 1)
                ])
              ]),
              t[474] || (t[474] = s("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Customer", -1)),
              R.value.discount_analysis.by_customer.length ? (l(), o("table", Qb, [
                t[472] || (t[472] = s("thead", null, [
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
                    s("td", Fb, a(d(e.line_discount)), 1),
                    s("td", zb, a(d(e.header_discount)), 1),
                    s("td", Hb, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Wb, "No discounted invoices for any customer.")),
              t[475] || (t[475] = s("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Item", -1)),
              R.value.discount_analysis.by_item.length ? (l(), o("table", Ub, [
                t[473] || (t[473] = s("thead", null, [
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
                    s("td", Kb, a(d(e.total_discount)), 1),
                    s("td", Gb, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Yb, "No discounted items."))
            ], 64)) : ys.value === "pending" ? (l(), o(u, { key: 8 }, [
              s("div", Jb, [
                s("div", Zb, [
                  t[476] || (t[476] = s("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  s("span", Xb, a(R.value.sales_order_pending.order_count), 1)
                ]),
                s("div", sy, [
                  t[477] || (t[477] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", ty, a(d(R.value.sales_order_pending.pending_total)), 1)
                ])
              ]),
              R.value.sales_order_pending.rows.length ? (l(), o("table", ey, [
                t[478] || (t[478] = s("thead", null, [
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
                      s("span", ay, a(e.status), 1)
                    ]),
                    s("td", oy, a(d(e.grand_total)), 1),
                    s("td", ly, a(d(e.billed_amount)), 1),
                    s("td", ny, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", iy, "No pending sales orders."))
            ], 64)) : ys.value === "conversion" ? (l(), o(u, { key: 9 }, [
              t[485] || (t[485] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Based on Sales Orders placed within the selected date range.", -1)),
              s("div", dy, [
                s("div", ry, [
                  t[479] || (t[479] = s("span", { class: "bucket-label" }, "Orders Placed", -1)),
                  s("span", uy, a(R.value.sales_conversion.order_count), 1)
                ]),
                s("div", cy, [
                  t[480] || (t[480] = s("span", { class: "bucket-label" }, "Converted to Invoice", -1)),
                  s("span", my, a(R.value.sales_conversion.converted_count), 1)
                ]),
                s("div", vy, [
                  t[481] || (t[481] = s("span", { class: "bucket-label" }, "Conversion Rate", -1)),
                  s("span", {
                    class: c(["mis-summary-val", R.value.sales_conversion.conversion_rate_pct >= 50 ? "green" : "red"])
                  }, a(R.value.sales_conversion.conversion_rate_pct.toFixed(1)) + "%", 3)
                ]),
                s("div", _y, [
                  t[482] || (t[482] = s("span", { class: "bucket-label" }, "Order Value", -1)),
                  s("span", py, a(d(R.value.sales_conversion.order_value)), 1)
                ]),
                s("div", by, [
                  t[483] || (t[483] = s("span", { class: "bucket-label" }, "Billed Value", -1)),
                  s("span", yy, a(d(R.value.sales_conversion.billed_value)), 1)
                ]),
                s("div", hy, [
                  t[484] || (t[484] = s("span", { class: "bucket-label" }, "Value Conversion %", -1)),
                  s("span", gy, a(R.value.sales_conversion.value_conversion_pct.toFixed(1)) + "%", 1)
                ])
              ])
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", ky, a(Za.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "receivables" ? (l(), o("div", fy, [
          s("div", wy, [
            t[487] || (t[487] = x('<div class="bs-page-head-icon rmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="12" cy="12" r="10" data-v-b9fb0d3a></circle><path d="M12 6v6l4 2" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Collection &amp; Receivables MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Total receivables, customer outstanding, ageing, collection targets and efficiency for the selected period.</div></div>', 2)),
            s("div", xy, [
              s("div", Cy, "As of " + a(P(b.value)), 1),
              s("div", Sy, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[150] || (t[150] = (e) => es("exportReceivablesCSV")),
                  disabled: !I.value
                }, [...t[486] || (t[486] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, jy),
                w.value === "exportReceivablesCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[151] || (t[151] = (e) => w.value = "")
                  }),
                  s("div", My, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[152] || (t[152] = (e) => {
                        w.value = "", To();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[153] || (t[153] = (e) => {
                        w.value = "", Y(To);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Dy, [
            (l(), o(u, null, m(Vl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Rs.value === e.key }]),
              onClick: (g) => Rs.value = e.key
            }, a(e.label), 11, Ty)), 64))
          ]),
          Je.value ? (l(), o("div", Oy)) : I.value ? (l(), o(u, { key: 1 }, [
            Rs.value === "total" ? (l(), o(u, { key: 0 }, [
              s("div", Ry, [
                s("span", null, "Total Receivables (as of " + a(I.value.as_of_date) + ")", 1),
                s("span", Py, a(f(S)(I.value.total_outstanding)), 1)
              ]),
              s("div", Iy, [
                s("div", Vy, [
                  t[488] || (t[488] = s("span", { class: "bucket-label" }, "Customers Owing", -1)),
                  s("span", Ny, a(I.value.customer_outstanding.length), 1)
                ]),
                s("div", Ey, [
                  t[489] || (t[489] = s("span", { class: "bucket-label" }, "Open Invoices", -1)),
                  s("span", qy, a(I.value.customer_outstanding.reduce((e, g) => e + g.invoice_count, 0)), 1)
                ]),
                s("div", By, [
                  t[490] || (t[490] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", Ay, a(d(I.value.overdue.total)), 1)
                ]),
                s("div", $y, [
                  t[491] || (t[491] = s("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  s("span", Ly, a(d(I.value.total_outstanding - I.value.overdue.total)), 1)
                ])
              ])
            ], 64)) : Rs.value === "outstanding" ? (l(), o(u, { key: 1 }, [
              s("div", Qy, [
                s("span", null, "Total Outstanding (as of " + a(I.value.as_of_date) + ")", 1),
                s("span", Fy, a(f(S)(I.value.total_outstanding)), 1)
              ]),
              I.value.customer_outstanding.length ? (l(), o("table", zy, [
                t[492] || (t[492] = s("thead", null, [
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
                    s("td", Hy, a(e.invoice_count), 1),
                    s("td", null, a(e.oldest_due_date || "—"), 1),
                    s("td", Wy, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Uy, "No outstanding receivables."))
            ], 64)) : Rs.value === "ageing" ? (l(), o(u, { key: 2 }, [
              s("div", Ky, [
                s("div", Gy, [
                  t[493] || (t[493] = s("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  s("span", Yy, a(d(I.value.ageing_totals.days_0_30)), 1)
                ]),
                s("div", Jy, [
                  t[494] || (t[494] = s("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  s("span", Zy, a(d(I.value.ageing_totals.days_31_60)), 1)
                ]),
                s("div", Xy, [
                  t[495] || (t[495] = s("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  s("span", s0, a(d(I.value.ageing_totals.days_61_90)), 1)
                ]),
                s("div", t0, [
                  t[496] || (t[496] = s("span", { class: "bucket-label" }, "90+ Days", -1)),
                  s("span", e0, a(d(I.value.ageing_totals.days_90_plus)), 1)
                ]),
                s("div", a0, [
                  t[497] || (t[497] = s("span", { class: "bucket-label" }, "Total", -1)),
                  s("span", o0, a(d(I.value.ageing_totals.total)), 1)
                ])
              ]),
              I.value.ageing.length ? (l(), o("table", l0, [
                t[498] || (t[498] = s("thead", null, [
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
                    s("td", n0, a(d(e.days_0_30)), 1),
                    s("td", i0, a(d(e.days_31_60)), 1),
                    s("td", d0, a(d(e.days_61_90)), 1),
                    s("td", r0, a(d(e.days_90_plus)), 1),
                    s("td", u0, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", c0, "No outstanding receivables."))
            ], 64)) : Rs.value === "coll_target" ? (l(), o(u, { key: 3 }, [
              s("div", m0, [
                t[499] || (t[499] = s("label", { class: "dr-label" }, "Collection Target (KES)", -1)),
                Hs(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[154] || (t[154] = (e) => yt.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    ot,
                    yt.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[500] || (t[500] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actual collections for this period.", -1))
              ]),
              s("div", v0, [
                s("div", _0, [
                  t[501] || (t[501] = s("span", { class: "bucket-label" }, "Target", -1)),
                  s("span", p0, a(d(yt.value)), 1)
                ]),
                s("div", b0, [
                  t[502] || (t[502] = s("span", { class: "bucket-label" }, "Achieved", -1)),
                  s("span", y0, a(d(I.value.daily_collection.total)), 1)
                ]),
                s("div", h0, [
                  t[503] || (t[503] = s("span", { class: "bucket-label" }, "Achievement %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", to.value >= 100 ? "green" : "red"])
                  }, a(to.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", I.value.daily_collection.total >= yt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[504] || (t[504] = s("span", null, "Variance (Achieved − Target)", -1)),
                s("span", g0, a(f(S)(I.value.daily_collection.total - yt.value)), 1)
              ], 2)
            ], 64)) : Rs.value === "daily_coll" ? (l(), o(u, { key: 4 }, [
              s("div", k0, [
                s("span", null, "Total Collection (" + a(C.value) + " to " + a(b.value) + ")", 1),
                s("span", f0, a(f(S)(I.value.daily_collection.total)), 1)
              ]),
              I.value.daily_collection.days.length ? (l(), o("table", w0, [
                t[505] || (t[505] = s("thead", null, [
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
                    s("td", x0, a(e.count), 1),
                    s("td", C0, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : y("", !0)
            ], 64)) : Rs.value === "overdue" ? (l(), o(u, { key: 5 }, [
              s("div", S0, [
                s("div", j0, [
                  t[506] || (t[506] = s("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  s("span", M0, a(I.value.overdue.count), 1)
                ]),
                s("div", D0, [
                  t[507] || (t[507] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", T0, a(d(I.value.overdue.total)), 1)
                ])
              ]),
              I.value.overdue.rows.length ? (l(), o("table", O0, [
                t[508] || (t[508] = s("thead", null, [
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
                    s("td", R0, a(e.overdue_days), 1),
                    s("td", P0, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", I0, "No overdue invoices."))
            ], 64)) : Rs.value === "credit" ? (l(), o(u, { key: 6 }, [
              I.value.credit_utilisation.length ? (l(), o("table", V0, [
                t[509] || (t[509] = s("thead", null, [
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
                    s("td", N0, a(e.credit_limit ? d(e.credit_limit) : "No limit set"), 1),
                    s("td", E0, a(d(e.outstanding_amount)), 1),
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
              ])) : (l(), o("div", q0, "No customers with a credit limit or outstanding balance."))
            ], 64)) : Rs.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              t[516] || (t[516] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Efficiency % = Collections in period ÷ (Opening Receivables + Sales in period). ", -1)),
              s("div", B0, [
                s("div", A0, [
                  t[510] || (t[510] = s("span", { class: "bucket-label" }, "Opening Receivables", -1)),
                  s("span", $0, a(d(I.value.collection_efficiency.opening_receivables)), 1)
                ]),
                s("div", L0, [
                  t[511] || (t[511] = s("span", { class: "bucket-label" }, "Sales in Period", -1)),
                  s("span", Q0, a(d(I.value.collection_efficiency.period_sales)), 1)
                ]),
                s("div", F0, [
                  t[512] || (t[512] = s("span", { class: "bucket-label" }, "Receivable Pool", -1)),
                  s("span", z0, a(d(I.value.collection_efficiency.receivable_pool)), 1)
                ]),
                s("div", H0, [
                  t[513] || (t[513] = s("span", { class: "bucket-label" }, "Collected in Period", -1)),
                  s("span", W0, a(d(I.value.collection_efficiency.period_collection)), 1)
                ]),
                s("div", U0, [
                  t[514] || (t[514] = s("span", { class: "bucket-label" }, "Closing Receivables", -1)),
                  s("span", K0, a(d(I.value.collection_efficiency.closing_receivables)), 1)
                ]),
                s("div", G0, [
                  t[515] || (t[515] = s("span", { class: "bucket-label" }, "Collection Efficiency", -1)),
                  s("span", {
                    class: c(["mis-summary-val", I.value.collection_efficiency.efficiency_pct >= 80 ? "green" : "red"])
                  }, a(I.value.collection_efficiency.efficiency_pct.toFixed(1)) + "%", 3)
                ])
              ])
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", Y0, a(so.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "purchase_mis" ? (l(), o("div", J0, [
          s("div", Z0, [
            t[518] || (t[518] = x('<div class="bs-page-head-icon pmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M3 3v18h18" data-v-b9fb0d3a></path><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Purchase MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Purchase performance broken down by summary, supplier, product, target vs actual, price variance and pending orders/receipts.</div></div>', 2)),
            s("div", X0, [
              s("div", sh, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", th, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[155] || (t[155] = (e) => es("exportPurchaseMisCSV")),
                  disabled: !q.value
                }, [...t[517] || (t[517] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, eh),
                w.value === "exportPurchaseMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[156] || (t[156] = (e) => w.value = "")
                  }),
                  s("div", ah, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[157] || (t[157] = (e) => {
                        w.value = "", Oo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[158] || (t[158] = (e) => {
                        w.value = "", Y(Oo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", oh, [
            (l(), o(u, null, m(Nl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ps.value === e.key }]),
              onClick: (g) => Ps.value = e.key
            }, a(e.label), 11, lh)), 64))
          ]),
          Ze.value ? (l(), o("div", nh)) : q.value ? (l(), o(u, { key: 1 }, [
            Ps.value === "summary" ? (l(), o("div", ih, [
              s("div", dh, [
                t[519] || (t[519] = s("span", { class: "bucket-label" }, "Bills", -1)),
                s("span", rh, a(_(q.value.summary.invoice_count)), 1)
              ]),
              s("div", uh, [
                t[520] || (t[520] = s("span", { class: "bucket-label" }, "Net Purchases", -1)),
                s("span", ch, a(d(q.value.summary.net_purchases)), 1)
              ]),
              s("div", mh, [
                t[521] || (t[521] = s("span", { class: "bucket-label" }, "Total Tax", -1)),
                s("span", vh, a(d(q.value.summary.total_tax)), 1)
              ]),
              s("div", _h, [
                t[522] || (t[522] = s("span", { class: "bucket-label" }, "Discount Received", -1)),
                s("span", ph, a(d(q.value.summary.header_discount)), 1)
              ]),
              s("div", bh, [
                t[523] || (t[523] = s("span", { class: "bucket-label" }, "Grand Total", -1)),
                s("span", yh, a(d(q.value.summary.grand_total)), 1)
              ]),
              s("div", hh, [
                t[524] || (t[524] = s("span", { class: "bucket-label" }, "Qty Purchased", -1)),
                s("span", gh, a(_(q.value.summary.total_qty)), 1)
              ]),
              s("div", kh, [
                t[525] || (t[525] = s("span", { class: "bucket-label" }, "Avg Bill Value", -1)),
                s("span", fh, a(d(q.value.summary.avg_invoice_value)), 1)
              ])
            ])) : Ps.value === "supplier" ? (l(), o("table", wh, [
              t[526] || (t[526] = s("thead", null, [
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
                  s("td", xh, a(e.invoice_count), 1),
                  s("td", Ch, a(d(e.total_amount)), 1),
                  s("td", Sh, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : Ps.value === "product" ? (l(), o("table", jh, [
              t[527] || (t[527] = s("thead", null, [
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
                  s("td", Mh, a(e.invoice_count), 1),
                  s("td", Dh, a(_(e.qty_purchased)), 1),
                  s("td", Th, a(d(e.total_discount || 0)), 1),
                  s("td", Oh, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : Ps.value === "target" ? (l(), o(u, { key: 3 }, [
              s("div", Rh, [
                t[528] || (t[528] = s("label", { class: "dr-label" }, "Purchase Target / Budget (KES)", -1)),
                Hs(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[159] || (t[159] = (e) => ht.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    ot,
                    ht.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[529] || (t[529] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target/budget is stored — enter one to compare against actual purchases for this period.", -1))
              ]),
              s("div", Ph, [
                s("div", Ih, [
                  t[530] || (t[530] = s("span", { class: "bucket-label" }, "Target / Budget", -1)),
                  s("span", Vh, a(d(ht.value)), 1)
                ]),
                s("div", Nh, [
                  t[531] || (t[531] = s("span", { class: "bucket-label" }, "Actual", -1)),
                  s("span", Eh, a(d(q.value.summary.grand_total)), 1)
                ]),
                s("div", qh, [
                  t[532] || (t[532] = s("span", { class: "bucket-label" }, "Utilisation %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", ao.value <= 100 ? "green" : "red"])
                  }, a(ao.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", q.value.summary.grand_total <= ht.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[533] || (t[533] = s("span", null, "Variance (Budget − Actual)", -1)),
                s("span", Bh, a(f(S)(ht.value - q.value.summary.grand_total)), 1)
              ], 2)
            ], 64)) : Ps.value === "price_variance" ? (l(), o(u, { key: 4 }, [
              s("div", Ah, [
                t[534] || (t[534] = os(" Actual weighted-average purchase rate this period vs. the Item's Standard Buying Rate. ", -1)),
                q.value.no_standard_rate_count ? (l(), o("span", $h, a(q.value.no_standard_rate_count) + " item(s) below have no Standard Buying Rate set and are excluded from the % comparison.", 1)) : y("", !0)
              ]),
              q.value.price_variance.length ? (l(), o("table", Lh, [
                t[535] || (t[535] = s("thead", null, [
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
                    s("td", Qh, a(_(e.qty_purchased)), 1),
                    s("td", Fh, a(d(e.actual_rate)), 1),
                    s("td", zh, a(e.has_standard_rate ? d(e.standard_rate) : "Not set"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.has_standard_rate ? e.variance > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? d(e.variance) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.has_standard_rate ? e.variance_pct > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? e.variance_pct.toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Hh, "No purchases in this period."))
            ], 64)) : Ps.value === "pending_po" ? (l(), o(u, { key: 5 }, [
              s("div", Wh, [
                s("div", Uh, [
                  t[536] || (t[536] = s("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  s("span", Kh, a(q.value.pending_purchase_orders.order_count), 1)
                ]),
                s("div", Gh, [
                  t[537] || (t[537] = s("span", { class: "bucket-label" }, "Pending (Not Yet Billed)", -1)),
                  s("span", Yh, a(d(q.value.pending_purchase_orders.pending_total)), 1)
                ])
              ]),
              q.value.pending_purchase_orders.rows.length ? (l(), o("table", Jh, [
                t[538] || (t[538] = s("thead", null, [
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
                      s("span", Zh, a(e.status), 1)
                    ]),
                    s("td", Xh, a(d(e.grand_total)), 1),
                    s("td", sg, a(d(e.billed_amount || 0)), 1),
                    s("td", tg, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", eg, "No pending Purchase Orders as of this date."))
            ], 64)) : Ps.value === "pending_receipts" ? (l(), o(u, { key: 6 }, [
              s("div", ag, [
                s("div", og, [
                  t[539] || (t[539] = s("span", { class: "bucket-label" }, "Orders Awaiting Receipt", -1)),
                  s("span", lg, a(q.value.pending_material_receipts.order_count), 1)
                ]),
                s("div", ng, [
                  t[540] || (t[540] = s("span", { class: "bucket-label" }, "Pending Receipt Value", -1)),
                  s("span", ig, a(d(q.value.pending_material_receipts.pending_value)), 1)
                ])
              ]),
              q.value.pending_material_receipts.rows.length ? (l(), o("table", dg, [
                t[541] || (t[541] = s("thead", null, [
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
                      s("span", rg, a(e.status), 1)
                    ]),
                    s("td", ug, a(_(e.ordered_qty)), 1),
                    s("td", cg, a(_(e.received_qty || 0)), 1),
                    s("td", mg, a(_(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", vg, "No pending material receipts as of this date."))
            ], 64)) : Ps.value === "returns" ? (l(), o(u, { key: 7 }, [
              s("div", _g, [
                s("div", pg, [
                  t[542] || (t[542] = s("span", { class: "bucket-label" }, "Return Count", -1)),
                  s("span", bg, a(q.value.purchase_return.return_count), 1)
                ]),
                s("div", yg, [
                  t[543] || (t[543] = s("span", { class: "bucket-label" }, "Return Value", -1)),
                  s("span", hg, a(d(q.value.purchase_return.return_total)), 1)
                ]),
                s("div", gg, [
                  t[544] || (t[544] = s("span", { class: "bucket-label" }, "% of Purchases", -1)),
                  s("span", kg, a(q.value.purchase_return.return_pct_of_purchases.toFixed(1)) + "%", 1)
                ])
              ]),
              q.value.purchase_return.rows.length ? (l(), o("table", fg, [
                t[545] || (t[545] = s("thead", null, [
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
                    s("td", wg, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", xg, "No purchase returns in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", Cg, a(eo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "inventory_mis" ? (l(), o("div", Sg, [
          s("div", jg, [
            t[547] || (t[547] = x('<div class="bs-page-head-icon invmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-b9fb0d3a></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-b9fb0d3a></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Inventory MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Current stock, valuation, movement speed, ageing, reorder points and adjustments across all warehouses.</div></div>', 2)),
            s("div", Mg, [
              s("div", Dg, "As of " + a(P(b.value)), 1),
              s("div", Tg, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[160] || (t[160] = (e) => es("exportInventoryMisCSV")),
                  disabled: !O.value
                }, [...t[546] || (t[546] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Og),
                w.value === "exportInventoryMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[161] || (t[161] = (e) => w.value = "")
                  }),
                  s("div", Rg, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[162] || (t[162] = (e) => {
                        w.value = "", Ro();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[163] || (t[163] = (e) => {
                        w.value = "", Y(Ro);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Pg, [
            (l(), o(u, null, m(El, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: hs.value === e.key }]),
              onClick: (g) => hs.value = e.key
            }, a(e.label), 11, Ig)), 64))
          ]),
          Xe.value ? (l(), o("div", Vg)) : O.value ? (l(), o(u, { key: 1 }, [
            hs.value === "current_stock" ? (l(), o(u, { key: 0 }, [
              s("div", Ng, [
                s("div", Eg, [
                  t[548] || (t[548] = s("span", { class: "bucket-label" }, "Total Qty on Hand", -1)),
                  s("span", qg, a(_(O.value.current_stock.total_qty)), 1)
                ]),
                s("div", Bg, [
                  t[549] || (t[549] = s("span", { class: "bucket-label" }, "Total Stock Value", -1)),
                  s("span", Ag, a(d(O.value.current_stock.total_value)), 1)
                ])
              ]),
              O.value.current_stock.rows.length ? (l(), o("table", $g, [
                t[550] || (t[550] = s("thead", null, [
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
                    s("td", Lg, a(_(e.actual_qty)), 1),
                    s("td", Qg, a(d(e.valuation_rate)), 1),
                    s("td", Fg, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zg, "No stock on hand."))
            ], 64)) : hs.value === "stock_value" ? (l(), o(u, { key: 1 }, [
              s("div", Hg, [
                t[551] || (t[551] = s("span", null, "Total Stock Value (all warehouses)", -1)),
                s("span", Wg, a(f(S)(O.value.stock_value.grand_total)), 1)
              ]),
              O.value.stock_value.by_warehouse.length ? (l(), o("table", Ug, [
                t[552] || (t[552] = s("thead", null, [
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
                    s("td", Kg, a(e.item_count), 1),
                    s("td", Gg, a(_(e.total_qty)), 1),
                    s("td", Yg, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Jg, "No stock on hand."))
            ], 64)) : hs.value === "fast_moving" ? (l(), o(u, { key: 2 }, [
              s("div", Zg, " Ranked by quantity consumed (stock-out) between " + a(C.value) + " and " + a(b.value) + ". ", 1),
              O.value.fast_moving.length ? (l(), o("table", Xg, [
                t[553] || (t[553] = s("thead", null, [
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
                    s("td", s2, a(_(e.qty_consumed)), 1),
                    s("td", t2, a(e.transactions), 1),
                    s("td", e2, a(_(e.current_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a2, "No stock-out movement in this period."))
            ], 64)) : hs.value === "slow_moving" ? (l(), o(u, { key: 3 }, [
              s("div", o2, " In stock, last moved 30-180 days before " + a(b.value) + ". ", 1),
              O.value.slow_moving.length ? (l(), o("table", l2, [
                t[554] || (t[554] = s("thead", null, [
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
                    s("td", n2, a(_(e.actual_qty)), 1),
                    s("td", i2, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_movement_date), 1),
                    s("td", d2, a(e.days_since_movement), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", r2, "No slow moving items."))
            ], 64)) : hs.value === "dead_stock" ? (l(), o(u, { key: 4 }, [
              s("div", u2, [
                s("div", c2, [
                  t[555] || (t[555] = s("span", { class: "bucket-label" }, "Dead Stock Items", -1)),
                  s("span", m2, a(O.value.dead_stock.rows.length), 1)
                ]),
                s("div", v2, [
                  t[556] || (t[556] = s("span", { class: "bucket-label" }, "Value Tied Up", -1)),
                  s("span", _2, a(d(O.value.dead_stock.total_value)), 1)
                ])
              ]),
              s("div", p2, " In stock, no stock-out movement in over 180 days before " + a(b.value) + " (or ever). ", 1),
              O.value.dead_stock.rows.length ? (l(), o("table", b2, [
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
                  (l(!0), o(u, null, m(O.value.dead_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", y2, a(_(e.actual_qty)), 1),
                    s("td", h2, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_movement_date || "Never"), 1),
                    s("td", g2, a(e.days_since_movement ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", k2, "No dead stock."))
            ], 64)) : hs.value === "ageing" ? (l(), o(u, { key: 5 }, [
              s("div", f2, " Proxy ageing: days since each item+warehouse's most recent stock-in, as of " + a(b.value) + ". ", 1),
              s("div", w2, [
                s("div", x2, [
                  t[558] || (t[558] = s("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  s("span", C2, a(d(O.value.stock_ageing.totals.days_0_30)), 1)
                ]),
                s("div", S2, [
                  t[559] || (t[559] = s("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  s("span", j2, a(d(O.value.stock_ageing.totals.days_31_60)), 1)
                ]),
                s("div", M2, [
                  t[560] || (t[560] = s("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  s("span", D2, a(d(O.value.stock_ageing.totals.days_61_90)), 1)
                ]),
                s("div", T2, [
                  t[561] || (t[561] = s("span", { class: "bucket-label" }, "90+ Days", -1)),
                  s("span", O2, a(d(O.value.stock_ageing.totals.days_90_plus)), 1)
                ]),
                s("div", R2, [
                  t[562] || (t[562] = s("span", { class: "bucket-label" }, "Total", -1)),
                  s("span", P2, a(d(O.value.stock_ageing.totals.total)), 1)
                ])
              ]),
              O.value.stock_ageing.rows.length ? (l(), o("table", I2, [
                t[563] || (t[563] = s("thead", null, [
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
                    s("td", V2, a(_(e.actual_qty)), 1),
                    s("td", N2, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_receipt_date || "Never"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", (e.age_days || 0) > 90 ? "red fw-600" : ""])
                    }, a(e.age_days ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", E2, "No stock on hand."))
            ], 64)) : hs.value === "reorder" ? (l(), o(u, { key: 6 }, [
              s("div", q2, [
                s("div", B2, [
                  t[564] || (t[564] = s("span", { class: "bucket-label" }, "Items Below Reorder Level", -1)),
                  s("span", A2, a(O.value.reorder_low_stock.item_count), 1)
                ])
              ]),
              O.value.reorder_low_stock.rows.length ? (l(), o("table", $2, [
                t[565] || (t[565] = s("thead", null, [
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
                    s("td", L2, a(_(e.actual_qty)), 1),
                    s("td", Q2, a(_(e.reorder_level)), 1),
                    s("td", F2, a(_(e.reorder_qty)), 1),
                    s("td", z2, a(_(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", H2, "No items below reorder level."))
            ], 64)) : hs.value === "excess" ? (l(), o(u, { key: 7 }, [
              t[568] || (t[568] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Max Stock Level is stored — approximated from days-of-cover (qty ÷ trailing 90-day avg daily consumption); flagged when cover exceeds 180 days. ", -1)),
              s("div", W2, [
                s("div", U2, [
                  t[566] || (t[566] = s("span", { class: "bucket-label" }, "Excess Stock Value", -1)),
                  s("span", K2, a(d(O.value.excess_stock.total_value)), 1)
                ])
              ]),
              O.value.excess_stock.rows.length ? (l(), o("table", G2, [
                t[567] || (t[567] = s("thead", null, [
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
                    s("td", Y2, a(_(e.actual_qty)), 1),
                    s("td", J2, a(e.avg_daily_consumption), 1),
                    s("td", Z2, a(e.days_of_cover), 1),
                    s("td", X2, a(_(e.excess_qty)), 1),
                    s("td", sk, a(d(e.excess_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", tk, "No excess stock identified."))
            ], 64)) : hs.value === "adjustment" ? (l(), o(u, { key: 8 }, [
              s("div", ek, [
                s("div", ak, [
                  t[569] || (t[569] = s("span", { class: "bucket-label" }, "Adjustments", -1)),
                  s("span", ok, a(O.value.stock_adjustment.entry_count), 1)
                ]),
                s("div", lk, [
                  t[570] || (t[570] = s("span", { class: "bucket-label" }, "Increase Value", -1)),
                  s("span", nk, a(d(O.value.stock_adjustment.increase_value)), 1)
                ]),
                s("div", ik, [
                  t[571] || (t[571] = s("span", { class: "bucket-label" }, "Decrease Value", -1)),
                  s("span", dk, a(d(O.value.stock_adjustment.decrease_value)), 1)
                ])
              ]),
              O.value.stock_adjustment.rows.length ? (l(), o("table", rk, [
                t[572] || (t[572] = s("thead", null, [
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
              ])) : (l(), o("div", uk, "No stock adjustments in this period."))
            ], 64)) : hs.value === "loss" ? (l(), o(u, { key: 9 }, [
              s("div", ck, [
                s("div", mk, [
                  t[573] || (t[573] = s("span", { class: "bucket-label" }, "Loss Entries", -1)),
                  s("span", vk, a(O.value.stock_loss.loss_count), 1)
                ]),
                s("div", _k, [
                  t[574] || (t[574] = s("span", { class: "bucket-label" }, "Value Lost", -1)),
                  s("span", pk, a(d(O.value.stock_loss.loss_value)), 1)
                ])
              ]),
              t[576] || (t[576] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scoped to negative-qty Stock Adjustment entries (physical-count shortfalls). Manufacturing Variance Loss is tracked separately on Work Orders. ", -1)),
              O.value.stock_loss.rows.length ? (l(), o("table", bk, [
                t[575] || (t[575] = s("thead", null, [
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
                    s("td", yk, a(_(e.qty)), 1),
                    s("td", hk, a(d(e.value)), 1),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gk, "No stock loss/shortage in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", kk, a(oo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "production_mis" ? (l(), o("div", fk, [
          s("div", wk, [
            t[578] || (t[578] = x('<div class="bs-page-head-icon prodmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="2" y="7" width="20" height="14" rx="2" data-v-b9fb0d3a></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Production MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Production plan vs actual, WIP status, material availability and consumption, cost, efficiency and rejection/scrap for work orders.</div></div>', 2)),
            s("div", xk, [
              s("div", Ck, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", Sk, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[164] || (t[164] = (e) => es("exportProductionMisCSV")),
                  disabled: !T.value
                }, [...t[577] || (t[577] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, jk),
                w.value === "exportProductionMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[165] || (t[165] = (e) => w.value = "")
                  }),
                  s("div", Mk, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[166] || (t[166] = (e) => {
                        w.value = "", Po();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[167] || (t[167] = (e) => {
                        w.value = "", Y(Po);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Dk, [
            (l(), o(u, null, m(ql, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: gs.value === e.key }]),
              onClick: (g) => gs.value = e.key
            }, a(e.label), 11, Tk)), 64))
          ]),
          sa.value ? (l(), o("div", Ok)) : T.value ? (l(), o(u, { key: 1 }, [
            gs.value === "plan_vs_actual" ? (l(), o(u, { key: 0 }, [
              s("div", Rk, [
                s("div", Pk, [
                  t[579] || (t[579] = s("span", { class: "bucket-label" }, "Planned Qty", -1)),
                  s("span", Ik, a(_(T.value.plan_vs_actual.totals.planned_qty)), 1)
                ]),
                s("div", Vk, [
                  t[580] || (t[580] = s("span", { class: "bucket-label" }, "Produced Qty", -1)),
                  s("span", Nk, a(_(T.value.plan_vs_actual.totals.produced_qty)), 1)
                ])
              ]),
              T.value.plan_vs_actual.rows.length ? (l(), o("table", Ek, [
                t[581] || (t[581] = s("thead", null, [
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
                    s("td", qk, a(_(e.planned_qty)), 1),
                    s("td", Bk, a(_(e.produced_qty)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty >= 0 ? "green" : "red"])
                    }, a(_(e.variance_qty)), 3),
                    s("td", Ak, a(e.variance_pct != null ? e.variance_pct + "%" : "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $k, "No production plans posted in this period."))
            ], 64)) : gs.value === "pending" ? (l(), o(u, { key: 1 }, [
              s("div", Lk, " Live snapshot of open Work Orders (not reconstructed as of " + a(b.value) + "). ", 1),
              s("div", Qk, [
                s("div", Fk, [
                  t[582] || (t[582] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", zk, a(_(T.value.production_pending.pending_qty_total)), 1)
                ]),
                s("div", Hk, [
                  t[583] || (t[583] = s("span", { class: "bucket-label" }, "Overdue Work Orders", -1)),
                  s("span", Wk, a(T.value.production_pending.overdue_count), 1)
                ])
              ]),
              T.value.production_pending.rows.length ? (l(), o("table", Uk, [
                t[584] || (t[584] = s("thead", null, [
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
                    s("td", Kk, a(_(e.qty)), 1),
                    s("td", Gk, a(_(e.produced_qty)), 1),
                    s("td", Yk, a(_(e.pending_qty)), 1),
                    s("td", {
                      class: c(e.overdue ? "red fw-600" : "")
                    }, a(e.planned_end_date || "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Jk, "No pending production."))
            ], 64)) : gs.value === "wip" ? (l(), o(u, { key: 2 }, [
              s("div", Zk, [
                s("div", Xk, [
                  t[585] || (t[585] = s("span", { class: "bucket-label" }, "Work Orders In Process", -1)),
                  s("span", sf, a(T.value.wip_status.wo_count), 1)
                ]),
                s("div", tf, [
                  t[586] || (t[586] = s("span", { class: "bucket-label" }, "WIP Stock Value", -1)),
                  s("span", ef, a(d(T.value.wip_status.wip_value_total)), 1)
                ])
              ]),
              T.value.wip_status.rows.length ? (l(), o("table", af, [
                t[587] || (t[587] = s("thead", null, [
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
                    s("td", of, a(_(e.qty)), 1),
                    s("td", lf, a(_(e.produced_qty)), 1),
                    s("td", nf, a(e.pct_complete) + "%", 1),
                    s("td", null, a(e.wip_warehouse || "—"), 1),
                    s("td", df, a(d(e.wip_stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", rf, "No Work Orders in process."))
            ], 64)) : gs.value === "material_availability" ? (l(), o(u, { key: 3 }, [
              t[590] || (t[590] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Live shortage check: still-to-issue qty on open Work Orders vs current stock at the source warehouse. ", -1)),
              s("div", uf, [
                s("div", cf, [
                  t[588] || (t[588] = s("span", { class: "bucket-label" }, "Items Short", -1)),
                  s("span", mf, a(T.value.raw_material_availability.shortage_count), 1)
                ])
              ]),
              T.value.raw_material_availability.rows.length ? (l(), o("table", vf, [
                t[589] || (t[589] = s("thead", null, [
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
                    s("td", _f, a(_(e.still_to_issue)), 1),
                    s("td", pf, a(_(e.available_qty)), 1),
                    s("td", bf, a(_(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yf, "No material shortages against open Work Orders."))
            ], 64)) : gs.value === "material_consumption" ? (l(), o(u, { key: 4 }, [
              s("div", hf, [
                t[591] || (t[591] = s("span", null, "Total Material Consumed", -1)),
                s("span", gf, a(f(S)(T.value.material_consumption.total_value)), 1)
              ]),
              T.value.material_consumption.rows.length ? (l(), o("table", kf, [
                t[592] || (t[592] = s("thead", null, [
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
                    s("td", ff, a(_(e.qty_consumed)), 1),
                    s("td", wf, a(e.transactions), 1),
                    s("td", xf, a(d(e.value_consumed)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Cf, "No material consumed against Work Orders in this period."))
            ], 64)) : gs.value === "material_variance" ? (l(), o(u, { key: 5 }, [
              s("div", Sf, [
                s("div", jf, [
                  t[593] || (t[593] = s("span", { class: "bucket-label" }, "Net Variance Value", -1)),
                  s("span", {
                    class: c(["mis-summary-val", T.value.material_variance.net_variance_value >= 0 ? "red" : "green"])
                  }, a(d(T.value.material_variance.net_variance_value)), 3)
                ])
              ]),
              T.value.material_variance.rows.length ? (l(), o("table", Mf, [
                t[594] || (t[594] = s("thead", null, [
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
                    s("td", Df, a(_(e.required_qty)), 1),
                    s("td", Tf, a(_(e.consumed_qty)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty > 0 ? "red" : "green"])
                    }, a(_(e.variance_qty)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.variance_value > 0 ? "red" : "green"])
                    }, a(d(e.variance_value)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Of, "No material variance in this period."))
            ], 64)) : gs.value === "production_cost" ? (l(), o(u, { key: 6 }, [
              s("div", Rf, [
                s("div", Pf, [
                  t[595] || (t[595] = s("span", { class: "bucket-label" }, "Material Value", -1)),
                  s("span", If, a(d(T.value.production_cost.total_material_value)), 1)
                ]),
                s("div", Vf, [
                  t[596] || (t[596] = s("span", { class: "bucket-label" }, "Operating Cost", -1)),
                  s("span", Nf, a(d(T.value.production_cost.total_operating_cost)), 1)
                ]),
                s("div", Ef, [
                  t[597] || (t[597] = s("span", { class: "bucket-label" }, "Total Production Cost", -1)),
                  s("span", qf, a(d(T.value.production_cost.total_cost)), 1)
                ])
              ]),
              T.value.production_cost.rows.length ? (l(), o("table", Bf, [
                t[598] || (t[598] = s("thead", null, [
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
                    s("td", Af, a(_(e.produced_qty)), 1),
                    s("td", $f, a(d(e.material_value)), 1),
                    s("td", Lf, a(d(e.operating_cost)), 1),
                    s("td", Qf, a(d(e.actual_total_cost)), 1),
                    s("td", Ff, a(e.actual_cost_per_unit != null ? d(e.actual_cost_per_unit) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.cost_variance_per_unit > 0 ? "red" : e.cost_variance_per_unit < 0 ? "green" : ""])
                    }, a(e.standard_cost_per_unit != null ? d(e.standard_cost_per_unit) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zf, "No production cost recorded in this period."))
            ], 64)) : gs.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              s("div", Hf, [
                s("div", Wf, [
                  t[599] || (t[599] = s("span", { class: "bucket-label" }, "Avg Efficiency", -1)),
                  s("span", Uf, a(T.value.production_efficiency.avg_efficiency_pct != null ? T.value.production_efficiency.avg_efficiency_pct + "%" : "—"), 1)
                ])
              ]),
              T.value.production_efficiency.rows.length ? (l(), o("table", Kf, [
                t[600] || (t[600] = s("thead", null, [
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
                    s("td", Gf, a(_(e.planned_mins)), 1),
                    s("td", Yf, a(_(e.actual_mins)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.efficiency_pct >= 100 ? "green" : "red"])
                    }, a(e.efficiency_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Jf, "No operation time logged for Work Orders scheduled in this period."))
            ], 64)) : gs.value === "rejection" ? (l(), o(u, { key: 8 }, [
              t[604] || (t[604] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Job Card scrap items not flagged as process loss — defective pieces that may be reworked. ", -1)),
              s("div", Zf, [
                s("div", Xf, [
                  t[601] || (t[601] = s("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  s("span", sw, a(_(T.value.rejection_rework.qty_total)), 1)
                ]),
                s("div", tw, [
                  t[602] || (t[602] = s("span", { class: "bucket-label" }, "Value", -1)),
                  s("span", ew, a(d(T.value.rejection_rework.value_total)), 1)
                ])
              ]),
              T.value.rejection_rework.rows.length ? (l(), o("table", aw, [
                t[603] || (t[603] = s("thead", null, [
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
                    s("td", ow, a(_(e.qty)), 1),
                    s("td", lw, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", nw, "No rejection/rework recorded in this period."))
            ], 64)) : gs.value === "scrap" ? (l(), o(u, { key: 9 }, [
              t[608] || (t[608] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scrap output rows on Manufacture stock entries, plus process/yield loss recorded on those entries. ", -1)),
              s("div", iw, [
                s("div", dw, [
                  t[605] || (t[605] = s("span", { class: "bucket-label" }, "Scrap Value", -1)),
                  s("span", rw, a(d(T.value.scrap_wastage.scrap_value_total)), 1)
                ]),
                s("div", uw, [
                  t[606] || (t[606] = s("span", { class: "bucket-label" }, "Process Loss Qty", -1)),
                  s("span", cw, a(_(T.value.scrap_wastage.process_loss_qty_total)), 1)
                ])
              ]),
              T.value.scrap_wastage.rows.length ? (l(), o("table", mw, [
                t[607] || (t[607] = s("thead", null, [
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
                    s("td", vw, a(_(e.qty)), 1),
                    s("td", _w, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", pw, "No scrap output recorded in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", bw, a(lo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "product_mis" ? (l(), o("div", yw, [
          s("div", hw, [
            t[610] || (t[610] = x('<div class="bs-page-head-icon prdmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-b9fb0d3a></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Product MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Product-wise sales, profit, cost, margin, production, stock and wastage, plus top and low selling products for the period.</div></div>', 2)),
            s("div", gw, [
              s("div", kw, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", fw, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[168] || (t[168] = (e) => es("exportProductMisCSV")),
                  disabled: !A.value
                }, [...t[609] || (t[609] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, ww),
                w.value === "exportProductMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[169] || (t[169] = (e) => w.value = "")
                  }),
                  s("div", xw, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[170] || (t[170] = (e) => {
                        w.value = "", Io();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[171] || (t[171] = (e) => {
                        w.value = "", Y(Io);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Cw, [
            (l(), o(u, null, m(Bl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ss.value === e.key }]),
              onClick: (g) => Ss.value = e.key
            }, a(e.label), 11, Sw)), 64))
          ]),
          ta.value ? (l(), o("div", jw)) : A.value ? (l(), o(u, { key: 1 }, [
            Ss.value === "sales" ? (l(), o(u, { key: 0 }, [
              s("div", Mw, [
                s("div", Dw, [
                  t[611] || (t[611] = s("span", { class: "bucket-label" }, "Qty Sold", -1)),
                  s("span", Tw, a(_(A.value.product_wise_sales.totals.qty_sold)), 1)
                ]),
                s("div", Ow, [
                  t[612] || (t[612] = s("span", { class: "bucket-label" }, "Total Revenue", -1)),
                  s("span", Rw, a(d(A.value.product_wise_sales.totals.total_amount)), 1)
                ])
              ]),
              A.value.product_wise_sales.rows.length ? (l(), o("table", Pw, [
                t[613] || (t[613] = s("thead", null, [
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
                    s("td", Iw, a(e.invoice_count), 1),
                    s("td", Vw, a(_(e.qty_sold)), 1),
                    s("td", Nw, a(d(e.avg_rate)), 1),
                    s("td", Ew, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", qw, "No sales in this period."))
            ], 64)) : Ss.value === "profit" ? (l(), o(u, { key: 1 }, [
              s("div", Bw, [
                s("div", Aw, [
                  t[614] || (t[614] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", $w, a(d(A.value.product_wise_profit.totals.revenue)), 1)
                ]),
                s("div", Lw, [
                  t[615] || (t[615] = s("span", { class: "bucket-label" }, "Cost", -1)),
                  s("span", Qw, a(d(A.value.product_wise_profit.totals.total_cost)), 1)
                ]),
                s("div", Fw, [
                  t[616] || (t[616] = s("span", { class: "bucket-label" }, "Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", A.value.product_wise_profit.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(A.value.product_wise_profit.totals.profit)), 3)
                ])
              ]),
              A.value.product_wise_profit.rows.length ? (l(), o("table", zw, [
                t[617] || (t[617] = s("thead", null, [
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
                    s("td", Hw, a(d(e.revenue)), 1),
                    s("td", Ww, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", Uw, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Kw, "No sales in this period."))
            ], 64)) : Ss.value === "cost" ? (l(), o(u, { key: 2 }, [
              t[619] || (t[619] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              A.value.product_wise_cost.rows.length ? (l(), o("table", Gw, [
                t[618] || (t[618] = s("thead", null, [
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
                    s("td", Yw, a(_(e.qty_sold)), 1),
                    s("td", Jw, a(d(e.cost_rate)), 1),
                    s("td", Zw, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Xw, "No sales in this period."))
            ], 64)) : Ss.value === "margin" ? (l(), o(u, { key: 3 }, [
              A.value.product_wise_margin.rows.length ? (l(), o("table", s3, [
                t[620] || (t[620] = s("thead", null, [
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
                    s("td", t3, a(d(e.revenue)), 1),
                    s("td", e3, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.margin_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a3, "No sales in this period."))
            ], 64)) : Ss.value === "production" ? (l(), o(u, { key: 4 }, [
              s("div", o3, " Finished-goods receipts on Manufacture stock entries posted between " + a(C.value) + " and " + a(b.value) + ". ", 1),
              A.value.product_wise_production.rows.length ? (l(), o("table", l3, [
                t[621] || (t[621] = s("thead", null, [
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
                    s("td", n3, a(_(e.qty_produced)), 1),
                    s("td", i3, a(d(e.value_produced)), 1),
                    s("td", d3, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", r3, "No production recorded in this period."))
            ], 64)) : Ss.value === "stock" ? (l(), o(u, { key: 5 }, [
              A.value.product_wise_stock.rows.length ? (l(), o("table", u3, [
                t[622] || (t[622] = s("thead", null, [
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
                    s("td", c3, a(_(e.total_qty)), 1),
                    s("td", m3, a(d(e.valuation_rate)), 1),
                    s("td", v3, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _3, "No stock on hand."))
            ], 64)) : Ss.value === "wastage" ? (l(), o(u, { key: 6 }, [
              s("div", p3, " Scrap-flagged rows on Manufacture stock entries posted between " + a(C.value) + " and " + a(b.value) + ". ", 1),
              s("div", b3, [
                s("div", y3, [
                  t[623] || (t[623] = s("span", { class: "bucket-label" }, "Qty Scrapped", -1)),
                  s("span", h3, a(_(A.value.product_wise_wastage.totals.qty_scrapped)), 1)
                ]),
                s("div", g3, [
                  t[624] || (t[624] = s("span", { class: "bucket-label" }, "Value Scrapped", -1)),
                  s("span", k3, a(d(A.value.product_wise_wastage.totals.value_scrapped)), 1)
                ])
              ]),
              A.value.product_wise_wastage.rows.length ? (l(), o("table", f3, [
                t[625] || (t[625] = s("thead", null, [
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
                    s("td", w3, a(_(e.qty_scrapped)), 1),
                    s("td", x3, a(d(e.value_scrapped)), 1),
                    s("td", C3, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", S3, "No wastage recorded in this period."))
            ], 64)) : Ss.value === "top_selling" ? (l(), o(u, { key: 7 }, [
              t[627] || (t[627] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Top 10 items by quantity sold in this period.", -1)),
              A.value.top_selling.rows.length ? (l(), o("table", j3, [
                t[626] || (t[626] = s("thead", null, [
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
                    s("td", M3, a(_(e.qty_sold)), 1),
                    s("td", D3, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", T3, "No sales in this period."))
            ], 64)) : Ss.value === "low_selling" ? (l(), o(u, { key: 8 }, [
              t[629] || (t[629] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Bottom 10 items by quantity sold in this period (items with at least one sale).", -1)),
              A.value.low_selling.rows.length ? (l(), o("table", O3, [
                t[628] || (t[628] = s("thead", null, [
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
                    s("td", R3, a(_(e.qty_sold)), 1),
                    s("td", P3, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", I3, "No sales in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", V3, a(no.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "dispatch_mis" ? (l(), o("div", N3, [
          s("div", E3, [
            t[631] || (t[631] = x('<div class="bs-page-head-icon dmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="1" y="3" width="15" height="13" data-v-b9fb0d3a></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-b9fb0d3a></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-b9fb0d3a></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-b9fb0d3a></circle></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Dispatch &amp; Delivery MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Dispatch summary, pending and delayed deliveries, customer-wise pending delivery and transport-wise dispatch for the period.</div></div>', 2)),
            s("div", q3, [
              s("div", B3, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", A3, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[172] || (t[172] = (e) => es("exportDispatchMisCSV")),
                  disabled: !H.value
                }, [...t[630] || (t[630] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, $3),
                w.value === "exportDispatchMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[173] || (t[173] = (e) => w.value = "")
                  }),
                  s("div", L3, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[174] || (t[174] = (e) => {
                        w.value = "", Vo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[175] || (t[175] = (e) => {
                        w.value = "", Y(Vo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Q3, [
            (l(), o(u, null, m(Al, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Us.value === e.key }]),
              onClick: (g) => Us.value = e.key
            }, a(e.label), 11, F3)), 64))
          ]),
          ea.value ? (l(), o("div", z3)) : H.value ? (l(), o(u, { key: 1 }, [
            Us.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", H3, " Delivery Notes posted between " + a(C.value) + " and " + a(b.value) + ". ", 1),
              s("div", W3, [
                s("div", U3, [
                  t[632] || (t[632] = s("span", { class: "bucket-label" }, "Dispatches", -1)),
                  s("span", K3, a(_(H.value.dispatch_summary.dispatch_count)), 1)
                ]),
                s("div", G3, [
                  t[633] || (t[633] = s("span", { class: "bucket-label" }, "Total Qty Dispatched", -1)),
                  s("span", Y3, a(_(H.value.dispatch_summary.total_qty)), 1)
                ]),
                s("div", J3, [
                  t[634] || (t[634] = s("span", { class: "bucket-label" }, "Total Value", -1)),
                  s("span", Z3, a(d(H.value.dispatch_summary.total_value)), 1)
                ]),
                s("div", X3, [
                  t[635] || (t[635] = s("span", { class: "bucket-label" }, "Customers Served", -1)),
                  s("span", s4, a(_(H.value.dispatch_summary.customer_count)), 1)
                ]),
                s("div", t4, [
                  t[636] || (t[636] = s("span", { class: "bucket-label" }, "Transporters Used", -1)),
                  s("span", e4, a(_(H.value.dispatch_summary.transporter_count)), 1)
                ]),
                s("div", a4, [
                  t[637] || (t[637] = s("span", { class: "bucket-label" }, "Avg Qty / Dispatch", -1)),
                  s("span", o4, a(_(H.value.dispatch_summary.avg_qty_per_dispatch)), 1)
                ])
              ])
            ], 64)) : Us.value === "pending_dispatch" ? (l(), o(u, { key: 1 }, [
              s("div", l4, " Sales Order lines with nothing dispatched yet, as of " + a(b.value) + ". ", 1),
              s("div", n4, [
                s("div", i4, [
                  t[638] || (t[638] = s("span", { class: "bucket-label" }, "Orders", -1)),
                  s("span", d4, a(H.value.pending_dispatch.order_count), 1)
                ]),
                s("div", r4, [
                  t[639] || (t[639] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", u4, a(_(H.value.pending_dispatch.pending_qty)), 1)
                ]),
                s("div", c4, [
                  t[640] || (t[640] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", m4, a(d(H.value.pending_dispatch.pending_value)), 1)
                ])
              ]),
              H.value.pending_dispatch.rows.length ? (l(), o("table", v4, [
                t[641] || (t[641] = s("thead", null, [
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
                  (l(!0), o(u, null, m(H.value.pending_dispatch.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.order_date), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", _4, a(_(e.ordered_qty)), 1),
                    s("td", p4, a(_(e.pending_qty)), 1),
                    s("td", b4, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", y4, "No pending dispatch as of this date."))
            ], 64)) : Us.value === "delivery_pending" ? (l(), o(u, { key: 2 }, [
              s("div", h4, " All undelivered Sales Order quantity as of " + a(b.value) + ", including partially dispatched lines. ", 1),
              s("div", g4, [
                s("div", k4, [
                  t[642] || (t[642] = s("span", { class: "bucket-label" }, "Orders", -1)),
                  s("span", f4, a(H.value.delivery_pending.order_count), 1)
                ]),
                s("div", w4, [
                  t[643] || (t[643] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", x4, a(_(H.value.delivery_pending.pending_qty)), 1)
                ]),
                s("div", C4, [
                  t[644] || (t[644] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", S4, a(d(H.value.delivery_pending.pending_value)), 1)
                ])
              ]),
              H.value.delivery_pending.rows.length ? (l(), o("table", j4, [
                t[645] || (t[645] = s("thead", null, [
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
                  (l(!0), o(u, null, m(H.value.delivery_pending.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.delivery_date || "—"), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", M4, a(_(e.ordered_qty)), 1),
                    s("td", D4, a(_(e.delivered_qty)), 1),
                    s("td", T4, a(_(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", O4, "No pending deliveries as of this date."))
            ], 64)) : Us.value === "delayed_delivery" ? (l(), o(u, { key: 3 }, [
              t[650] || (t[650] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Delivery Pending lines whose Delivery Date has already passed. ", -1)),
              s("div", R4, [
                s("div", P4, [
                  t[646] || (t[646] = s("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  s("span", I4, a(H.value.delayed_delivery.order_count), 1)
                ]),
                s("div", V4, [
                  t[647] || (t[647] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", N4, a(_(H.value.delayed_delivery.pending_qty)), 1)
                ]),
                s("div", E4, [
                  t[648] || (t[648] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", q4, a(d(H.value.delayed_delivery.pending_value)), 1)
                ])
              ]),
              H.value.delayed_delivery.rows.length ? (l(), o("table", B4, [
                t[649] || (t[649] = s("thead", null, [
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
                  (l(!0), o(u, null, m(H.value.delayed_delivery.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    s("td", null, a(e.sales_order), 1),
                    s("td", null, a(e.delivery_date), 1),
                    s("td", A4, a(e.days_overdue), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", $4, a(_(e.pending_qty)), 1),
                    s("td", L4, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Q4, "No delayed deliveries as of today."))
            ], 64)) : Us.value === "customer_pending" ? (l(), o(u, { key: 4 }, [
              H.value.customer_wise_pending_delivery.rows.length ? (l(), o("table", F4, [
                t[651] || (t[651] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Orders"),
                    s("th", { class: "ta-r" }, "Pending Qty"),
                    s("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(H.value.customer_wise_pending_delivery.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", z4, a(e.order_count), 1),
                    s("td", H4, a(_(e.pending_qty)), 1),
                    s("td", W4, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", U4, "No pending deliveries as of this date."))
            ], 64)) : Us.value === "transport_wise" ? (l(), o(u, { key: 5 }, [
              s("div", K4, " Delivery Notes posted between " + a(C.value) + " and " + a(b.value) + ", grouped by Transporter. ", 1),
              H.value.transport_wise_dispatch.rows.length ? (l(), o("table", G4, [
                t[652] || (t[652] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Transporter"),
                    s("th", { class: "ta-r" }, "Dispatches"),
                    s("th", { class: "ta-r" }, "Customers"),
                    s("th", { class: "ta-r" }, "Total Qty"),
                    s("th", { class: "ta-r" }, "Total Value")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(H.value.transport_wise_dispatch.rows, (e) => (l(), o("tr", {
                    key: e.transporter_name
                  }, [
                    s("td", null, a(e.transporter_name), 1),
                    s("td", Y4, a(e.dispatch_count), 1),
                    s("td", J4, a(e.customer_count), 1),
                    s("td", Z4, a(_(e.total_qty)), 1),
                    s("td", X4, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", s6, "No dispatches in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", t6, a(io.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "order_mis" ? (l(), o("div", e6, [
          s("div", a6, [
            t[654] || (t[654] = x('<div class="bs-page-head-icon omis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M9 11l3 3L22 4" data-v-b9fb0d3a></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Order MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Sales order pipeline — new, pending, under production, ready for dispatch, delayed, delivered, cancelled and order-wise profitability.</div></div>', 2)),
            s("div", o6, [
              s("div", l6, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", n6, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[176] || (t[176] = (e) => es("exportOrderMisCSV")),
                  disabled: !B.value
                }, [...t[653] || (t[653] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, i6),
                w.value === "exportOrderMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[177] || (t[177] = (e) => w.value = "")
                  }),
                  s("div", d6, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[178] || (t[178] = (e) => {
                        w.value = "", No();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[179] || (t[179] = (e) => {
                        w.value = "", Y(No);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", r6, [
            (l(), o(u, null, m($l, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: vs.value === e.key }]),
              onClick: (g) => vs.value = e.key
            }, a(e.label), 11, u6)), 64))
          ]),
          aa.value ? (l(), o("div", c6)) : B.value ? (l(), o(u, { key: 1 }, [
            vs.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", m6, " Sales Orders placed between " + a(C.value) + " and " + a(b.value) + ". Under Production / Ready for Dispatch are derived from linked Work Orders; Delayed is based on today's date. ", 1),
              s("div", v6, [
                s("div", _6, [
                  t[655] || (t[655] = s("span", { class: "bucket-label" }, "Total Orders", -1)),
                  s("span", p6, a(_(B.value.summary.total_orders.count)), 1)
                ]),
                s("div", b6, [
                  t[656] || (t[656] = s("span", { class: "bucket-label" }, "New Orders", -1)),
                  s("span", y6, a(_(B.value.summary.new_orders.count)), 1)
                ]),
                s("div", h6, [
                  t[657] || (t[657] = s("span", { class: "bucket-label" }, "Pending Orders", -1)),
                  s("span", g6, a(_(B.value.summary.pending_orders.count)), 1)
                ]),
                s("div", k6, [
                  t[658] || (t[658] = s("span", { class: "bucket-label" }, "Under Production", -1)),
                  s("span", f6, a(_(B.value.summary.under_production.count)), 1)
                ]),
                s("div", w6, [
                  t[659] || (t[659] = s("span", { class: "bucket-label" }, "Ready for Dispatch", -1)),
                  s("span", x6, a(_(B.value.summary.ready_for_dispatch.count)), 1)
                ]),
                s("div", C6, [
                  t[660] || (t[660] = s("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  s("span", S6, a(_(B.value.summary.delayed_orders.count)), 1)
                ]),
                s("div", j6, [
                  t[661] || (t[661] = s("span", { class: "bucket-label" }, "Delivered Orders", -1)),
                  s("span", M6, a(_(B.value.summary.delivered_orders.count)), 1)
                ]),
                s("div", D6, [
                  t[662] || (t[662] = s("span", { class: "bucket-label" }, "Cancelled Orders", -1)),
                  s("span", T6, a(_(B.value.summary.cancelled_orders.count)), 1)
                ])
              ])
            ], 64)) : vs.value === "total" ? (l(), o(u, { key: 1 }, [
              B.value.summary.total_orders.rows.length ? (l(), o("table", O6, [
                t[663] || (t[663] = s("thead", null, [
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
                      s("span", R6, a(e.status), 1)
                    ]),
                    s("td", P6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", I6, "No orders in this period."))
            ], 64)) : vs.value === "new" ? (l(), o(u, { key: 2 }, [
              B.value.summary.new_orders.rows.length ? (l(), o("table", V6, [
                t[664] || (t[664] = s("thead", null, [
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
                    s("td", N6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", E6, "No new (unconfirmed) orders in this period."))
            ], 64)) : vs.value === "pending" ? (l(), o(u, { key: 3 }, [
              B.value.summary.pending_orders.rows.length ? (l(), o("table", q6, [
                t[665] || (t[665] = s("thead", null, [
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
                      s("span", B6, a(e.status), 1)
                    ]),
                    s("td", A6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $6, "No pending orders in this period."))
            ], 64)) : vs.value === "under_production" ? (l(), o(u, { key: 4 }, [
              B.value.summary.under_production.rows.length ? (l(), o("table", L6, [
                t[666] || (t[666] = s("thead", null, [
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
                    s("td", Q6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", F6, "No orders currently under production."))
            ], 64)) : vs.value === "ready_for_dispatch" ? (l(), o(u, { key: 5 }, [
              B.value.summary.ready_for_dispatch.rows.length ? (l(), o("table", z6, [
                t[667] || (t[667] = s("thead", null, [
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
                    s("td", H6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", W6, "No orders ready for dispatch."))
            ], 64)) : vs.value === "delayed" ? (l(), o(u, { key: 6 }, [
              B.value.summary.delayed_orders.rows.length ? (l(), o("table", U6, [
                t[668] || (t[668] = s("thead", null, [
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
                    s("td", K6, a(e.days_overdue), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", G6, a(e.status), 1)
                    ]),
                    s("td", Y6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", J6, "No delayed orders as of today."))
            ], 64)) : vs.value === "delivered" ? (l(), o(u, { key: 7 }, [
              B.value.summary.delivered_orders.rows.length ? (l(), o("table", Z6, [
                t[669] || (t[669] = s("thead", null, [
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
                      s("span", X6, a(e.status), 1)
                    ]),
                    s("td", s9, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", t9, "No delivered orders in this period."))
            ], 64)) : vs.value === "cancelled" ? (l(), o(u, { key: 8 }, [
              B.value.summary.cancelled_orders.rows.length ? (l(), o("table", e9, [
                t[670] || (t[670] = s("thead", null, [
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
                    s("td", a9, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", o9, "No cancelled orders in this period."))
            ], 64)) : vs.value === "order_value" ? (l(), o(u, { key: 9 }, [
              s("div", l9, [
                s("div", n9, [
                  t[671] || (t[671] = s("span", { class: "bucket-label" }, "Total Order Value", -1)),
                  s("span", i9, a(d(B.value.order_value.total_value)), 1)
                ])
              ]),
              B.value.order_value.by_status.length ? (l(), o("table", d9, [
                t[672] || (t[672] = s("thead", null, [
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
                      s("span", r9, a(e.status), 1)
                    ]),
                    s("td", u9, a(e.order_count), 1),
                    s("td", c9, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", m9, "No orders in this period."))
            ], 64)) : vs.value === "profitability" ? (l(), o(u, { key: 10 }, [
              t[677] || (t[677] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate — applied to Sales Order lines whether or not the order has been invoiced yet. ", -1)),
              s("div", v9, [
                s("div", _9, [
                  t[673] || (t[673] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", p9, a(d(B.value.order_profitability.totals.revenue)), 1)
                ]),
                s("div", b9, [
                  t[674] || (t[674] = s("span", { class: "bucket-label" }, "Cost", -1)),
                  s("span", y9, a(d(B.value.order_profitability.totals.total_cost)), 1)
                ]),
                s("div", h9, [
                  t[675] || (t[675] = s("span", { class: "bucket-label" }, "Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", B.value.order_profitability.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(B.value.order_profitability.totals.profit)), 3)
                ])
              ]),
              B.value.order_profitability.rows.length ? (l(), o("table", g9, [
                t[676] || (t[676] = s("thead", null, [
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
                    s("td", k9, a(d(e.revenue)), 1),
                    s("td", f9, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", w9, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", x9, "No orders in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", C9, a(ro.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "profitability_mis" ? (l(), o("div", S9, [
          s("div", j9, [
            t[679] || (t[679] = x('<div class="bs-page-head-icon pfmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><line x1="12" y1="1" x2="12" y2="23" data-v-b9fb0d3a></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Profitability MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Gross profit and margin by product, customer, order, branch and salesperson, plus the monthly profit trend. Excludes sales returns; cost is current average valuation, falling back to Standard Buying Rate.</div></div>', 2)),
            s("div", M9, [
              s("div", D9, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", T9, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[180] || (t[180] = (e) => es("exportProfitabilityMisCSV")),
                  disabled: !W.value
                }, [...t[678] || (t[678] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, O9),
                w.value === "exportProfitabilityMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[181] || (t[181] = (e) => w.value = "")
                  }),
                  s("div", R9, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[182] || (t[182] = (e) => {
                        w.value = "", Eo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[183] || (t[183] = (e) => {
                        w.value = "", Y(Eo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", P9, [
            (l(), o(u, null, m(Ll, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ls.value === e.key }]),
              onClick: (g) => Ls.value = e.key
            }, a(e.label), 11, I9)), 64))
          ]),
          oa.value ? (l(), o("div", V9)) : W.value ? (l(), o(u, { key: 1 }, [
            Ls.value === "summary" ? (l(), o(u, { key: 0 }, [
              t[686] || (t[686] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Excludes Sales Returns. Cost is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              s("div", N9, [
                s("div", E9, [
                  t[680] || (t[680] = s("span", { class: "bucket-label" }, "Gross Sales", -1)),
                  s("span", q9, a(d(W.value.summary.gross_sales)), 1)
                ]),
                s("div", B9, [
                  t[681] || (t[681] = s("span", { class: "bucket-label" }, "Net Sales", -1)),
                  s("span", A9, a(d(W.value.summary.net_sales)), 1)
                ]),
                s("div", $9, [
                  t[682] || (t[682] = s("span", { class: "bucket-label" }, "Total Cost", -1)),
                  s("span", L9, a(d(W.value.summary.total_cost)), 1)
                ]),
                s("div", Q9, [
                  t[683] || (t[683] = s("span", { class: "bucket-label" }, "Gross Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_profit >= 0 ? "green" : "red"])
                  }, a(d(W.value.summary.gross_profit)), 3)
                ]),
                s("div", F9, [
                  t[684] || (t[684] = s("span", { class: "bucket-label" }, "Gross Margin %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_margin_pct >= 0 ? "green" : "red"])
                  }, a(W.value.summary.gross_margin_pct.toFixed(1)) + "%", 3)
                ]),
                s("div", z9, [
                  t[685] || (t[685] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                  s("span", H9, a(_(W.value.summary.invoice_count)), 1)
                ])
              ])
            ], 64)) : Ls.value === "product" ? (l(), o("table", W9, [
              t[687] || (t[687] = s("thead", null, [
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
                  s("td", U9, a(d(e.revenue)), 1),
                  s("td", K9, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", G9, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ls.value === "customer" ? (l(), o("table", Y9, [
              t[688] || (t[688] = s("thead", null, [
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
                  s("td", J9, a(e.invoice_count), 1),
                  s("td", Z9, a(d(e.revenue)), 1),
                  s("td", X9, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", s5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ls.value === "order" ? (l(), o(u, { key: 3 }, [
              t[692] || (t[692] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Invoiced revenue and estimated cost, rolled up by the Sales Order each invoice line references. ", -1)),
              W.value.order_wise_profit.rows.length ? (l(), o("table", t5, [
                t[691] || (t[691] = s("thead", null, [
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
                    s("td", e5, a(d(e.revenue)), 1),
                    s("td", a5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", o5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128)),
                  W.value.order_wise_profit.no_order.revenue ? (l(), o("tr", l5, [
                    t[689] || (t[689] = s("td", {
                      colspan: "2",
                      style: { color: "#94a3b8" }
                    }, "Invoices not linked to a Sales Order", -1)),
                    s("td", n5, a(d(W.value.order_wise_profit.no_order.revenue)), 1),
                    s("td", i5, a(d(W.value.order_wise_profit.no_order.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", W.value.order_wise_profit.no_order.profit >= 0 ? "green" : "red"])
                    }, a(d(W.value.order_wise_profit.no_order.profit)), 3),
                    t[690] || (t[690] = s("td", { class: "ta-r mono-sm" }, "—", -1))
                  ])) : y("", !0)
                ])
              ])) : (l(), o("div", d5, "No order-linked sales in this period."))
            ], 64)) : Ls.value === "branch" ? (l(), o(u, { key: 4 }, [
              t[694] || (t[694] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Branch doctype exists in this app — Cost Center is used as the branch grouping. ", -1)),
              W.value.branch_wise_profit.rows.length ? (l(), o("table", r5, [
                t[693] || (t[693] = s("thead", null, [
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
                    s("td", u5, a(d(e.revenue)), 1),
                    s("td", c5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", m5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", v5, "No sales in this period."))
            ], 64)) : Ls.value === "salesperson" ? (l(), o("table", _5, [
              t[695] || (t[695] = s("thead", null, [
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
                  s("td", p5, a(d(e.revenue)), 1),
                  s("td", b5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", y5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ls.value === "monthly_trend" ? (l(), o(u, { key: 6 }, [
              W.value.monthly_profit_trend.rows.length ? (l(), o("table", h5, [
                t[696] || (t[696] = s("thead", null, [
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
                    s("td", g5, a(d(e.revenue)), 1),
                    s("td", k5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", f5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w5, "No sales in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", x5, a(uo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "expense_mis" ? (l(), o("div", C5, [
          s("div", S5, [
            t[698] || (t[698] = x('<div class="bs-page-head-icon emis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="2" y="7" width="20" height="14" rx="2" data-v-b9fb0d3a></rect><path d="M2 10h20" data-v-b9fb0d3a></path><path d="M6 15h4" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Expense MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Total expenses by department and category, budget vs actual, fixed vs variable, trend and unusual/excess spend. Submitted Expense records only — Purchase Invoices and GL journal entries are not included here.</div></div>', 2)),
            s("div", j5, [
              s("div", M5, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", D5, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[184] || (t[184] = (e) => es("exportExpenseMisCSV")),
                  disabled: !U.value
                }, [...t[697] || (t[697] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, T5),
                w.value === "exportExpenseMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[185] || (t[185] = (e) => w.value = "")
                  }),
                  s("div", O5, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[186] || (t[186] = (e) => {
                        w.value = "", qo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[187] || (t[187] = (e) => {
                        w.value = "", Y(qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", R5, [
            (l(), o(u, null, m(Ql, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Is.value === e.key }]),
              onClick: (g) => Is.value = e.key
            }, a(e.label), 11, P5)), 64))
          ]),
          la.value ? (l(), o("div", I5)) : U.value ? (l(), o(u, { key: 1 }, [
            Is.value === "summary" ? (l(), o(u, { key: 0 }, [
              t[704] || (t[704] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Submitted Expense records only (see Expenses). Purchase Invoices and GL journal entries are not included here. ", -1)),
              s("div", V5, [
                s("div", N5, [
                  t[699] || (t[699] = s("span", { class: "bucket-label" }, "Total Expenses", -1)),
                  s("span", E5, a(d(U.value.summary.total_amount)), 1)
                ]),
                s("div", q5, [
                  t[700] || (t[700] = s("span", { class: "bucket-label" }, "Net (excl. Tax)", -1)),
                  s("span", B5, a(d(U.value.summary.net_amount)), 1)
                ]),
                s("div", A5, [
                  t[701] || (t[701] = s("span", { class: "bucket-label" }, "Tax Amount", -1)),
                  s("span", $5, a(d(U.value.summary.total_tax)), 1)
                ]),
                s("div", L5, [
                  t[702] || (t[702] = s("span", { class: "bucket-label" }, "Expense Count", -1)),
                  s("span", Q5, a(_(U.value.summary.expense_count)), 1)
                ]),
                s("div", F5, [
                  t[703] || (t[703] = s("span", { class: "bucket-label" }, "Avg Expense", -1)),
                  s("span", z5, a(d(U.value.summary.avg_expense)), 1)
                ])
              ])
            ], 64)) : Is.value === "department" ? (l(), o(u, { key: 1 }, [
              t[706] || (t[706] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Department doctype exists in this app — Cost Center is used as the department grouping. ", -1)),
              U.value.department_wise.rows.length ? (l(), o("table", H5, [
                t[705] || (t[705] = s("thead", null, [
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
                    s("td", W5, a(e.count), 1),
                    s("td", U5, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", K5, "No expenses in this period."))
            ], 64)) : Is.value === "category" ? (l(), o("table", G5, [
              t[707] || (t[707] = s("thead", null, [
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
                  s("td", Y5, a(e.count), 1),
                  s("td", J5, a(d(e.amount)), 1),
                  s("td", Z5, a(e.pct_of_total.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Is.value === "budget" ? (l(), o(u, { key: 3 }, [
              s("div", X5, " Estimated: each Cost Center's stored budget is prorated to the " + a(U.value.budget_vs_actual.period_days) + "-day selected period from its Annual/Quarterly/Monthly budget period. Cost centers with no budget set are omitted. ", 1),
              U.value.budget_vs_actual.rows.length ? (l(), o("table", sx, [
                t[708] || (t[708] = s("thead", null, [
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
                    s("td", tx, a(d(e.period_budget)), 1),
                    s("td", ex, a(d(e.actual)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance > 0 ? "red" : "green"])
                    }, a(d(e.variance)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.variance > 0 ? "red" : "green"])
                    }, a(e.variance_pct.toFixed(1)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ax, "No cost centers with a budget set."))
            ], 64)) : Is.value === "fixed" ? (l(), o(u, { key: 4 }, [
              t[711] || (t[711] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Categorised by keyword match on the Expense Category name (rent, salary, insurance, depreciation, EMI, etc.) — no stored Fixed/Variable flag exists. ", -1)),
              s("div", ox, [
                s("div", lx, [
                  t[709] || (t[709] = s("span", { class: "bucket-label" }, "Fixed Total", -1)),
                  s("span", nx, a(d(U.value.fixed_expenses.total)), 1)
                ])
              ]),
              U.value.fixed_expenses.rows.length ? (l(), o("table", ix, [
                t[710] || (t[710] = s("thead", null, [
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
                    s("td", dx, a(e.count), 1),
                    s("td", rx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ux, "No categories matched the Fixed-expense keywords in this period."))
            ], 64)) : Is.value === "variable" ? (l(), o(u, { key: 5 }, [
              s("div", cx, [
                s("div", mx, [
                  t[712] || (t[712] = s("span", { class: "bucket-label" }, "Variable Total", -1)),
                  s("span", vx, a(d(U.value.variable_expenses.total)), 1)
                ])
              ]),
              U.value.variable_expenses.rows.length ? (l(), o("table", _x, [
                t[713] || (t[713] = s("thead", null, [
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
                    s("td", px, a(e.count), 1),
                    s("td", bx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yx, "No variable-expense categories in this period."))
            ], 64)) : Is.value === "trend" ? (l(), o(u, { key: 6 }, [
              U.value.expense_trend.rows.length ? (l(), o("table", hx, [
                t[714] || (t[714] = s("thead", null, [
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
                    s("td", gx, a(e.count), 1),
                    s("td", kx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fx, "No expenses in this period."))
            ], 64)) : Is.value === "unusual" ? (l(), o(u, { key: 7 }, [
              t[716] || (t[716] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Individual expenses flagged as statistical outliers within their own category for this period (mean + 2x std-dev, or 2x average for thin categories). ", -1)),
              U.value.unusual_expenses.rows.length ? (l(), o("table", wx, [
                t[715] || (t[715] = s("thead", null, [
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
                    s("td", xx, a(d(e.amount)), 1),
                    s("td", Cx, a(d(e.category_avg)), 1),
                    s("td", Sx, a(e.basis), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jx, "No unusual expenses detected in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", Mx, a(co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "payables_mis" ? (l(), o("div", Dx, [
          s("div", Tx, [
            t[718] || (t[718] = x('<div class="bs-page-head-icon payblmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><circle cx="12" cy="12" r="10" data-v-b9fb0d3a></circle><polyline points="12 6 12 12 16 14" data-v-b9fb0d3a></polyline></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Payables MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Supplier outstanding, payable ageing, overdue payables, amounts due this week/month, supplier-wise outstanding and payment due forecast.</div></div>', 2)),
            s("div", Ox, [
              s("div", Rx, "As of " + a(P(b.value)), 1),
              s("div", Px, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[188] || (t[188] = (e) => es("exportPayablesMisCSV")),
                  disabled: !X.value
                }, [...t[717] || (t[717] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, Ix),
                w.value === "exportPayablesMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[189] || (t[189] = (e) => w.value = "")
                  }),
                  s("div", Vx, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[190] || (t[190] = (e) => {
                        w.value = "", Bo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[191] || (t[191] = (e) => {
                        w.value = "", Y(Bo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", Nx, [
            (l(), o(u, null, m(Fl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Qs.value === e.key }]),
              onClick: (g) => Qs.value = e.key
            }, a(e.label), 11, Ex)), 64))
          ]),
          na.value ? (l(), o("div", qx)) : X.value ? (l(), o(u, { key: 1 }, [
            Qs.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", Bx, " As of " + a(b.value) + ". Submitted Purchase Invoices with a non-zero outstanding balance; Purchase Returns are netted in. ", 1),
              s("div", Ax, [
                s("div", $x, [
                  t[719] || (t[719] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", Lx, a(d(X.value.summary.total_outstanding)), 1)
                ]),
                s("div", Qx, [
                  t[720] || (t[720] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", Fx, a(d(X.value.summary.overdue_amount)), 1)
                ]),
                s("div", zx, [
                  t[721] || (t[721] = s("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  s("span", Hx, a(d(X.value.summary.not_yet_due_amount)), 1)
                ]),
                s("div", Wx, [
                  t[722] || (t[722] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                  s("span", Ux, a(_(X.value.summary.invoice_count)), 1)
                ]),
                s("div", Kx, [
                  t[723] || (t[723] = s("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  s("span", Gx, a(_(X.value.summary.overdue_count)), 1)
                ]),
                s("div", Yx, [
                  t[724] || (t[724] = s("span", { class: "bucket-label" }, "Suppliers", -1)),
                  s("span", Jx, a(_(X.value.summary.supplier_count)), 1)
                ])
              ])
            ], 64)) : Qs.value === "ageing" ? (l(), o("table", Zx, [
              t[725] || (t[725] = s("thead", null, [
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
                  s("td", Xx, a(d(e.current)), 1),
                  s("td", s8, a(d(e.days_1_30)), 1),
                  s("td", t8, a(d(e.days_31_60)), 1),
                  s("td", e8, a(d(e.days_61_90)), 1),
                  s("td", a8, a(d(e.days_90_plus)), 1),
                  s("td", o8, a(d(e.total)), 1)
                ]))), 128))
              ])
            ])) : Qs.value === "overdue" ? (l(), o(u, { key: 2 }, [
              X.value.overdue_payables.rows.length ? (l(), o("table", l8, [
                t[726] || (t[726] = s("thead", null, [
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
                    s("td", n8, a(e.overdue_days), 1),
                    s("td", i8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", d8, "No overdue payables as of " + a(b.value) + ".", 1))
            ], 64)) : Qs.value === "due_week" ? (l(), o(u, { key: 3 }, [
              s("div", r8, "Rolling 7 days from " + a(b.value) + ", not yet overdue.", 1),
              X.value.due_this_week.rows.length ? (l(), o("table", u8, [
                t[727] || (t[727] = s("thead", null, [
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
                    s("td", c8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", m8, "Nothing due in the next 7 days."))
            ], 64)) : Qs.value === "due_month" ? (l(), o(u, { key: 4 }, [
              s("div", v8, "Calendar month containing " + a(b.value) + " — can include invoices already overdue earlier this month.", 1),
              X.value.due_this_month.rows.length ? (l(), o("table", _8, [
                t[728] || (t[728] = s("thead", null, [
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
                    s("td", p8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", b8, "Nothing due this month."))
            ], 64)) : Qs.value === "supplier" ? (l(), o("table", y8, [
              t[729] || (t[729] = s("thead", null, [
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
                  s("td", h8, a(e.invoice_count), 1),
                  s("td", g8, a(d(e.outstanding)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm", e.overdue_amount ? "red" : ""])
                  }, a(d(e.overdue_amount)), 3),
                  s("td", k8, a(e.max_overdue_days || "—"), 1)
                ]))), 128))
              ])
            ])) : Qs.value === "forecast" ? (l(), o(u, { key: 6 }, [
              s("div", f8, "Forward-looking cash-outflow view, bucketed by days until due from " + a(b.value) + ".", 1),
              s("table", w8, [
                t[730] || (t[730] = s("thead", null, [
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
                    s("td", x8, a(e.count), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.key === "overdue" ? "red" : ""])
                    }, a(d(e.amount)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", C8, a(mo.value ? "No data as of this date." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "cash_bank_mis" ? (l(), o("div", S8, [
          s("div", j8, [
            t[732] || (t[732] = x('<div class="bs-page-head-icon cbmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="2" y="5" width="20" height="14" rx="2" data-v-b9fb0d3a></rect><line x1="2" y1="10" x2="22" y2="10" data-v-b9fb0d3a></line><line x1="6" y1="15" x2="10" y2="15" data-v-b9fb0d3a></line></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Cash &amp; Bank MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Cash position, bank balance, daily cash flow and bank movement, receipts, payments, cash forecast and fund requirement for the period.</div></div>', 2)),
            s("div", M8, [
              s("div", D8, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", T8, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[192] || (t[192] = (e) => es("exportCashBankMisCSV")),
                  disabled: !E.value
                }, [...t[731] || (t[731] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, O8),
                w.value === "exportCashBankMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[193] || (t[193] = (e) => w.value = "")
                  }),
                  s("div", R8, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[194] || (t[194] = (e) => {
                        w.value = "", Ao();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[195] || (t[195] = (e) => {
                        w.value = "", Y(Ao);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", P8, [
            (l(), o(u, null, m(zl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Vs.value === e.key }]),
              onClick: (g) => Vs.value = e.key
            }, a(e.label), 11, I8)), 64))
          ]),
          ia.value ? (l(), o("div", V8)) : E.value ? (l(), o(u, { key: 1 }, [
            Vs.value === "cash_position" ? (l(), o(u, { key: 0 }, [
              s("div", N8, "As of " + a(E.value.as_of_date) + ".", 1),
              s("div", E8, [
                s("div", q8, [
                  t[733] || (t[733] = s("span", { class: "bucket-label" }, "Total Cash", -1)),
                  s("span", B8, a(d(E.value.cash_position.total)), 1)
                ])
              ]),
              E.value.cash_position.rows.length ? (l(), o("table", A8, [
                t[734] || (t[734] = s("thead", null, [
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
                    s("td", $8, a(d(e.opening_balance)), 1),
                    s("td", L8, a(d(e.closing_balance)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Q8, "No Cash accounts found."))
            ], 64)) : Vs.value === "bank_balance" ? (l(), o(u, { key: 1 }, [
              s("div", F8, "As of " + a(E.value.as_of_date) + ".", 1),
              s("div", z8, [
                s("div", H8, [
                  t[735] || (t[735] = s("span", { class: "bucket-label" }, "Total Bank", -1)),
                  s("span", W8, a(d(E.value.bank_balance.total)), 1)
                ])
              ]),
              E.value.bank_balance.rows.length ? (l(), o("table", U8, [
                t[736] || (t[736] = s("thead", null, [
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
                    s("td", K8, a(d(e.opening_balance)), 1),
                    s("td", G8, a(d(e.closing_balance)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Y8, "No Bank accounts found."))
            ], 64)) : Vs.value === "daily_cash" ? (l(), o(u, { key: 2 }, [
              s("div", J8, [
                s("div", Z8, [
                  t[737] || (t[737] = s("span", { class: "bucket-label" }, "Opening", -1)),
                  s("span", X8, a(d(E.value.daily_cash_flow.opening_balance)), 1)
                ]),
                s("div", s7, [
                  t[738] || (t[738] = s("span", { class: "bucket-label" }, "Receipts", -1)),
                  s("span", t7, a(d(E.value.daily_cash_flow.total_receipts)), 1)
                ]),
                s("div", e7, [
                  t[739] || (t[739] = s("span", { class: "bucket-label" }, "Payments", -1)),
                  s("span", a7, a(d(E.value.daily_cash_flow.total_payments)), 1)
                ]),
                s("div", o7, [
                  t[740] || (t[740] = s("span", { class: "bucket-label" }, "Closing", -1)),
                  s("span", l7, a(d(E.value.daily_cash_flow.closing_balance)), 1)
                ])
              ]),
              s("table", n7, [
                t[741] || (t[741] = s("thead", null, [
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
                    s("td", i7, a(d(e.receipts)), 1),
                    s("td", d7, a(d(e.payments)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", r7, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : Vs.value === "daily_bank" ? (l(), o(u, { key: 3 }, [
              s("div", u7, [
                s("div", c7, [
                  t[742] || (t[742] = s("span", { class: "bucket-label" }, "Opening", -1)),
                  s("span", m7, a(d(E.value.daily_bank_movement.opening_balance)), 1)
                ]),
                s("div", v7, [
                  t[743] || (t[743] = s("span", { class: "bucket-label" }, "Deposits", -1)),
                  s("span", _7, a(d(E.value.daily_bank_movement.total_receipts)), 1)
                ]),
                s("div", p7, [
                  t[744] || (t[744] = s("span", { class: "bucket-label" }, "Withdrawals", -1)),
                  s("span", b7, a(d(E.value.daily_bank_movement.total_payments)), 1)
                ]),
                s("div", y7, [
                  t[745] || (t[745] = s("span", { class: "bucket-label" }, "Closing", -1)),
                  s("span", h7, a(d(E.value.daily_bank_movement.closing_balance)), 1)
                ])
              ]),
              s("table", g7, [
                t[746] || (t[746] = s("thead", null, [
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
                    s("td", k7, a(d(e.receipts)), 1),
                    s("td", f7, a(d(e.payments)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", w7, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : Vs.value === "receipts" ? (l(), o(u, { key: 4 }, [
              s("div", x7, [
                s("div", C7, [
                  t[747] || (t[747] = s("span", { class: "bucket-label" }, "Total Receipts", -1)),
                  s("span", S7, a(d(E.value.receipts.total)), 1)
                ])
              ]),
              E.value.receipts.rows.length ? (l(), o("table", j7, [
                t[748] || (t[748] = s("thead", null, [
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
                    s("td", M7, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", D7, "No receipts in this period."))
            ], 64)) : Vs.value === "payments" ? (l(), o(u, { key: 5 }, [
              t[751] || (t[751] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Includes both Payment Entry (Pay) and Expense records paid directly from a Cash/Bank account. ", -1)),
              s("div", T7, [
                s("div", O7, [
                  t[749] || (t[749] = s("span", { class: "bucket-label" }, "Total Payments", -1)),
                  s("span", R7, a(d(E.value.payments.total)), 1)
                ])
              ]),
              E.value.payments.rows.length ? (l(), o("table", P7, [
                t[750] || (t[750] = s("thead", null, [
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
                    s("td", I7, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", V7, "No payments in this period."))
            ], 64)) : Vs.value === "forecast" ? (l(), o(u, { key: 6 }, [
              s("div", N7, " Projected from the current Cash + Bank position (" + a(d(E.value.cash_forecast.current_position)) + "), assuming every outstanding invoice settles on its due date. ", 1),
              s("table", E7, [
                t[752] || (t[752] = s("thead", null, [
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
                    s("td", q7, a(d(e.inflow)), 1),
                    s("td", B7, a(d(e.outflow)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.projected_balance >= 0 ? "" : "red"])
                    }, a(d(e.projected_balance)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : Vs.value === "fund_requirement" ? (l(), o(u, { key: 7 }, [
              s("div", A7, [
                s("div", $7, [
                  t[753] || (t[753] = s("span", { class: "bucket-label" }, "Peak Fund Requirement", -1)),
                  s("span", {
                    class: c(["mis-summary-val", E.value.fund_requirement.peak_requirement > 0 ? "red" : "green"])
                  }, a(d(E.value.fund_requirement.peak_requirement)), 3)
                ])
              ]),
              E.value.fund_requirement.rows.length ? (l(), o("table", L7, [
                t[754] || (t[754] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Bucket"),
                    s("th", { class: "ta-r" }, "Shortfall")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(E.value.fund_requirement.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    s("td", Q7, a(e.label), 1),
                    s("td", F7, a(d(e.shortfall)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", z7, "No projected shortfall — the current Cash + Bank position covers the forecast."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", H7, a(vo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "customer_mis" ? (l(), o("div", W7, [
          s("div", U7, [
            t[756] || (t[756] = x('<div class="bs-page-head-icon custmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-b9fb0d3a></path><circle cx="9" cy="7" r="4" data-v-b9fb0d3a></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-b9fb0d3a></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Customer MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>New, active, repeat and inactive customers, customer-wise sales/outstanding/profit, retention rate, and top customers for the period.</div></div>', 2)),
            s("div", K7, [
              s("div", G7, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", Y7, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[196] || (t[196] = (e) => es("exportCustomerMisCSV")),
                  disabled: !M.value
                }, [...t[755] || (t[755] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, J7),
                w.value === "exportCustomerMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[197] || (t[197] = (e) => w.value = "")
                  }),
                  s("div", Z7, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[198] || (t[198] = (e) => {
                        w.value = "", $o();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[199] || (t[199] = (e) => {
                        w.value = "", Y($o);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", X7, [
            (l(), o(u, null, m(Hl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: js.value === e.key }]),
              onClick: (g) => js.value = e.key
            }, a(e.label), 11, sC)), 64))
          ]),
          da.value ? (l(), o("div", tC)) : M.value ? (l(), o(u, { key: 1 }, [
            s("div", eC, [
              s("div", aC, [
                t[757] || (t[757] = s("span", { class: "bucket-label" }, "Total Customers", -1)),
                s("span", oC, a(_(M.value.summary.total_customers)), 1)
              ]),
              s("div", lC, [
                t[758] || (t[758] = s("span", { class: "bucket-label" }, "Active Customers", -1)),
                s("span", nC, a(_(M.value.summary.active_count)), 1)
              ]),
              s("div", iC, [
                t[759] || (t[759] = s("span", { class: "bucket-label" }, "Active Revenue", -1)),
                s("span", dC, a(d(M.value.summary.active_revenue)), 1)
              ]),
              s("div", rC, [
                t[760] || (t[760] = s("span", { class: "bucket-label" }, "New Customers", -1)),
                s("span", uC, a(_(M.value.summary.new_count)), 1)
              ]),
              s("div", cC, [
                t[761] || (t[761] = s("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                s("span", mC, a(_(M.value.summary.repeat_count)), 1)
              ]),
              s("div", vC, [
                t[762] || (t[762] = s("span", { class: "bucket-label" }, "Repeat Revenue", -1)),
                s("span", _C, a(d(M.value.summary.repeat_revenue)), 1)
              ]),
              s("div", pC, [
                t[763] || (t[763] = s("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                s("span", bC, a(_(M.value.summary.inactive_count)), 1)
              ]),
              s("div", yC, [
                t[764] || (t[764] = s("span", { class: "bucket-label" }, "Retention Rate", -1)),
                s("span", hC, a(Number(M.value.summary.retention_pct).toFixed(1)) + "%", 1)
              ]),
              s("div", gC, [
                t[765] || (t[765] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                s("span", kC, a(d(M.value.summary.total_outstanding)), 1)
              ]),
              s("div", fC, [
                t[766] || (t[766] = s("span", { class: "bucket-label" }, "Total Profit", -1)),
                s("span", {
                  class: c(["mis-summary-val", M.value.summary.total_profit >= 0 ? "green" : "red"])
                }, a(d(M.value.summary.total_profit)), 3)
              ])
            ]),
            js.value === "new_customers" ? (l(), o(u, { key: 0 }, [
              s("div", wC, [
                s("div", xC, [
                  t[767] || (t[767] = s("span", { class: "bucket-label" }, "New Customers", -1)),
                  s("span", CC, a(M.value.new_customers.count), 1)
                ])
              ]),
              M.value.new_customers.rows.length ? (l(), o("table", SC, [
                t[768] || (t[768] = s("thead", null, [
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
                    s("td", jC, a(e.invoice_count), 1),
                    s("td", MC, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", DC, "No new customers in this period."))
            ], 64)) : js.value === "active_customers" ? (l(), o(u, { key: 1 }, [
              s("div", TC, [
                s("div", OC, [
                  t[769] || (t[769] = s("span", { class: "bucket-label" }, "Active Customers", -1)),
                  s("span", RC, a(M.value.active_customers.count), 1)
                ]),
                s("div", PC, [
                  t[770] || (t[770] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", IC, a(d(M.value.active_customers.total)), 1)
                ])
              ]),
              M.value.active_customers.rows.length ? (l(), o("table", VC, [
                t[771] || (t[771] = s("thead", null, [
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
                    s("td", NC, a(e.invoice_count), 1),
                    s("td", EC, a(d(e.total_amount)), 1),
                    s("td", null, a(e.first_invoice_in_period), 1),
                    s("td", null, a(e.last_invoice_in_period), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", qC, "No active customers in this period."))
            ], 64)) : js.value === "repeat_customers" ? (l(), o(u, { key: 2 }, [
              s("div", BC, [
                s("div", AC, [
                  t[772] || (t[772] = s("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                  s("span", $C, a(M.value.repeat_customers.count), 1)
                ]),
                s("div", LC, [
                  t[773] || (t[773] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", QC, a(d(M.value.repeat_customers.total)), 1)
                ])
              ]),
              M.value.repeat_customers.rows.length ? (l(), o("table", FC, [
                t[774] || (t[774] = s("thead", null, [
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
                    s("td", zC, a(e.invoice_count), 1),
                    s("td", HC, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", WC, "No repeat customers in this period."))
            ], 64)) : js.value === "customer_wise_sales" ? (l(), o(u, { key: 3 }, [
              M.value.customer_wise_sales.rows.length ? (l(), o("table", UC, [
                t[775] || (t[775] = s("thead", null, [
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
                    s("td", KC, a(e.invoice_count), 1),
                    s("td", GC, a(d(e.net_total)), 1),
                    s("td", YC, a(d(e.total_discount)), 1),
                    s("td", JC, a(d(e.total_tax)), 1),
                    s("td", ZC, a(d(e.total_amount)), 1),
                    s("td", XC, a(d(e.outstanding_amount)), 1),
                    s("td", sS, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", tS, "No sales in this period."))
            ], 64)) : js.value === "customer_wise_outstanding" ? (l(), o(u, { key: 4 }, [
              s("div", eS, [
                s("div", aS, [
                  t[776] || (t[776] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", oS, a(d(M.value.customer_wise_outstanding.total)), 1)
                ])
              ]),
              M.value.customer_wise_outstanding.rows.length ? (l(), o("table", lS, [
                t[777] || (t[777] = s("thead", null, [
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
                    s("td", nS, a(e.invoice_count), 1),
                    s("td", iS, a(d(e.outstanding_amount)), 1),
                    s("td", null, a(e.oldest_due_date), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", dS, "No outstanding balances."))
            ], 64)) : js.value === "customer_wise_profit" ? (l(), o(u, { key: 5 }, [
              s("div", rS, [
                s("div", uS, [
                  t[778] || (t[778] = s("span", { class: "bucket-label" }, "Total Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", M.value.customer_wise_profit.total >= 0 ? "green" : "red"])
                  }, a(d(M.value.customer_wise_profit.total)), 3)
                ])
              ]),
              M.value.customer_wise_profit.rows.length ? (l(), o("table", cS, [
                t[779] || (t[779] = s("thead", null, [
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
                    s("td", mS, a(e.invoice_count), 1),
                    s("td", vS, a(d(e.revenue)), 1),
                    s("td", _S, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", pS, a(Number(e.margin_pct).toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", bS, "No profit data for this period."))
            ], 64)) : js.value === "customer_retention" ? (l(), o(u, { key: 6 }, [
              s("div", yS, " Comparing " + a(M.value.customer_retention.prev_from) + " – " + a(M.value.customer_retention.prev_to) + " (prior period) to the selected period. ", 1),
              s("div", hS, [
                s("div", gS, [
                  t[780] || (t[780] = s("span", { class: "bucket-label" }, "Retention Rate", -1)),
                  s("span", kS, a(Number(M.value.customer_retention.retention_pct).toFixed(1)) + "%", 1)
                ]),
                s("div", fS, [
                  t[781] || (t[781] = s("span", { class: "bucket-label" }, "Retained", -1)),
                  s("span", wS, a(M.value.customer_retention.retained_count), 1)
                ]),
                s("div", xS, [
                  t[782] || (t[782] = s("span", { class: "bucket-label" }, "Churned", -1)),
                  s("span", CS, a(M.value.customer_retention.churned_count), 1)
                ]),
                s("div", SS, [
                  t[783] || (t[783] = s("span", { class: "bucket-label" }, "New", -1)),
                  s("span", jS, a(M.value.customer_retention.new_count), 1)
                ])
              ]),
              M.value.customer_retention.rows.length ? (l(), o("table", MS, [
                t[784] || (t[784] = s("thead", null, [
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
              ])) : (l(), o("div", DS, "No customer activity to compare."))
            ], 64)) : js.value === "top_customers" ? (l(), o(u, { key: 7 }, [
              M.value.top_customers.rows.length ? (l(), o("table", TS, [
                t[785] || (t[785] = s("thead", null, [
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
                    s("td", OS, a(e.invoice_count), 1),
                    s("td", RS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", PS, "No sales in this period."))
            ], 64)) : js.value === "inactive_customers" ? (l(), o(u, { key: 8 }, [
              s("div", IS, [
                s("div", VS, [
                  t[786] || (t[786] = s("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                  s("span", NS, a(M.value.inactive_customers.count), 1)
                ])
              ]),
              M.value.inactive_customers.rows.length ? (l(), o("table", ES, [
                t[787] || (t[787] = s("thead", null, [
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
                    s("td", qS, a(e.days_inactive), 1),
                    s("td", BS, a(e.invoice_count), 1),
                    s("td", AS, a(d(e.lifetime_revenue)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $S, "No inactive customers found."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", LS, a(_o.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "supplier_mis" ? (l(), o("div", QS, [
          s("div", FS, [
            t[789] || (t[789] = x('<div class="bs-page-head-icon suppmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><rect x="1" y="3" width="15" height="13" data-v-b9fb0d3a></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-b9fb0d3a></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-b9fb0d3a></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-b9fb0d3a></circle></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Supplier MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>Supplier-wise purchase and outstanding, payment ageing, price comparison, delivery/supplier performance and quality/rejection for the period.</div></div>', 2)),
            s("div", zS, [
              s("div", HS, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", WS, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[200] || (t[200] = (e) => es("exportSupplierMisCSV")),
                  disabled: !$.value
                }, [...t[788] || (t[788] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, US),
                w.value === "exportSupplierMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[201] || (t[201] = (e) => w.value = "")
                  }),
                  s("div", KS, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[202] || (t[202] = (e) => {
                        w.value = "", Lo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[203] || (t[203] = (e) => {
                        w.value = "", Y(Lo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", GS, [
            (l(), o(u, null, m(Wl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Fs.value === e.key }]),
              onClick: (g) => Fs.value = e.key
            }, a(e.label), 11, YS)), 64))
          ]),
          ra.value ? (l(), o("div", JS)) : $.value ? (l(), o(u, { key: 1 }, [
            Fs.value === "supplier_wise_purchase" ? (l(), o(u, { key: 0 }, [
              s("div", ZS, [
                s("div", XS, [
                  t[790] || (t[790] = s("span", { class: "bucket-label" }, "Total Purchase", -1)),
                  s("span", sj, a(d($.value.supplier_wise_purchase.total)), 1)
                ])
              ]),
              $.value.supplier_wise_purchase.rows.length ? (l(), o("table", tj, [
                t[791] || (t[791] = s("thead", null, [
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
                    s("td", ej, a(e.invoice_count), 1),
                    s("td", aj, a(d(e.net_total)), 1),
                    s("td", oj, a(d(e.total_discount)), 1),
                    s("td", lj, a(d(e.total_tax)), 1),
                    s("td", nj, a(d(e.total_amount)), 1),
                    s("td", ij, a(d(e.outstanding_amount)), 1),
                    s("td", dj, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", rj, "No purchases in this period."))
            ], 64)) : Fs.value === "supplier_outstanding" ? (l(), o(u, { key: 1 }, [
              s("div", uj, [
                s("div", cj, [
                  t[792] || (t[792] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", mj, a(d($.value.supplier_outstanding.total)), 1)
                ])
              ]),
              $.value.supplier_outstanding.rows.length ? (l(), o("table", vj, [
                t[793] || (t[793] = s("thead", null, [
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
                    s("td", _j, a(e.invoice_count), 1),
                    s("td", pj, a(d(e.outstanding_amount)), 1),
                    s("td", bj, a(d(e.overdue_amount)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yj, "No outstanding balances."))
            ], 64)) : Fs.value === "supplier_payment_ageing" ? (l(), o(u, { key: 2 }, [
              $.value.supplier_payment_ageing.rows.length ? (l(), o("table", hj, [
                t[794] || (t[794] = s("thead", null, [
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
                    s("td", gj, a(d(e.current)), 1),
                    s("td", kj, a(d(e.days_1_30)), 1),
                    s("td", fj, a(d(e.days_31_60)), 1),
                    s("td", wj, a(d(e.days_61_90)), 1),
                    s("td", xj, a(d(e.days_90_plus)), 1),
                    s("td", Cj, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Sj, "No outstanding balances."))
            ], 64)) : Fs.value === "purchase_price_comparison" ? (l(), o(u, { key: 3 }, [
              s("div", jj, a($.value.purchase_price_comparison.multi_supplier_item_count) + " item(s) were purchased from more than one supplier in this period. ", 1),
              $.value.purchase_price_comparison.rows.length ? (l(), o("table", Mj, [
                t[795] || (t[795] = s("thead", null, [
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
                    s("td", Dj, a(e.qty), 1),
                    s("td", Tj, a(d(e.avg_rate)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.is_lowest ? "green" : "red"])
                    }, a(e.is_lowest ? "—" : "+" + Number(e.variance_vs_lowest_pct).toFixed(1) + "%"), 3),
                    s("td", null, [
                      e.is_lowest && e.supplier_count > 1 ? (l(), o("span", Oj, "Lowest")) : y("", !0)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", Rj, "No purchases in this period."))
            ], 64)) : Fs.value === "supplier_performance" ? (l(), o(u, { key: 4 }, [
              $.value.supplier_performance.rows.length ? (l(), o("table", Pj, [
                t[796] || (t[796] = s("thead", null, [
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
                    s("td", Ij, a(d(e.total_purchase_amount)), 1),
                    s("td", Vj, a(d(e.outstanding_amount)), 1),
                    s("td", Nj, a(e.on_time_delivery_pct != null ? Number(e.on_time_delivery_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", Ej, a(e.rejection_pct != null ? Number(e.rejection_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", qj, a(e.avg_price_variance_pct != null ? Number(e.avg_price_variance_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score != null ? Number(e.performance_score).toFixed(0) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Bj, "No supplier activity in this period."))
            ], 64)) : Fs.value === "delivery_performance" ? (l(), o(u, { key: 5 }, [
              s("div", Aj, [
                s("div", $j, [
                  t[797] || (t[797] = s("span", { class: "bucket-label" }, "On-time %", -1)),
                  s("span", Lj, a(Number($.value.delivery_performance.summary.on_time_pct).toFixed(1)) + "%", 1)
                ]),
                s("div", Qj, [
                  t[798] || (t[798] = s("span", { class: "bucket-label" }, "On-time", -1)),
                  s("span", Fj, a($.value.delivery_performance.summary.on_time_count), 1)
                ]),
                s("div", zj, [
                  t[799] || (t[799] = s("span", { class: "bucket-label" }, "Late", -1)),
                  s("span", Hj, a($.value.delivery_performance.summary.late_count), 1)
                ]),
                s("div", Wj, [
                  t[800] || (t[800] = s("span", { class: "bucket-label" }, "No PO Reference", -1)),
                  s("span", Uj, a($.value.delivery_performance.summary.undated_count), 1)
                ])
              ]),
              t[803] || (t[803] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.delivery_performance.by_supplier.length ? (l(), o("table", Kj, [
                t[801] || (t[801] = s("thead", null, [
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
                    s("td", Gj, a(e.receipt_count), 1),
                    s("td", Yj, a(e.on_time_count), 1),
                    s("td", Jj, a(e.late_count), 1),
                    s("td", Zj, a(Number(e.on_time_pct).toFixed(1)) + "%", 1),
                    s("td", Xj, a(Number(e.avg_delay_days).toFixed(1)), 1)
                  ]))), 128))
                ])
              ])) : y("", !0),
              t[804] || (t[804] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "Receipts", -1)),
              $.value.delivery_performance.rows.length ? (l(), o("table", sM, [
                t[802] || (t[802] = s("thead", null, [
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
              ])) : (l(), o("div", tM, "No receipts in this period."))
            ], 64)) : Fs.value === "quality_rejection" ? (l(), o(u, { key: 6 }, [
              s("div", eM, [
                s("div", aM, [
                  t[805] || (t[805] = s("span", { class: "bucket-label" }, "Received Qty", -1)),
                  s("span", oM, a($.value.quality_rejection.summary.total_received_qty), 1)
                ]),
                s("div", lM, [
                  t[806] || (t[806] = s("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  s("span", nM, a($.value.quality_rejection.summary.total_rejected_qty), 1)
                ]),
                s("div", iM, [
                  t[807] || (t[807] = s("span", { class: "bucket-label" }, "Rejection %", -1)),
                  s("span", dM, a(Number($.value.quality_rejection.summary.overall_rejection_pct).toFixed(2)) + "%", 1)
                ])
              ]),
              t[810] || (t[810] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.quality_rejection.by_supplier.length ? (l(), o("table", rM, [
                t[808] || (t[808] = s("thead", null, [
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
                    s("td", uM, a(e.received_qty), 1),
                    s("td", cM, a(e.accepted_qty), 1),
                    s("td", mM, a(e.rejected_qty), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : y("", !0),
              t[811] || (t[811] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Item", -1)),
              $.value.quality_rejection.rows.length ? (l(), o("table", vM, [
                t[809] || (t[809] = s("thead", null, [
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
                    s("td", _M, a(e.received_qty), 1),
                    s("td", pM, a(e.accepted_qty), 1),
                    s("td", bM, a(e.rejected_qty), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yM, "No receipts in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", hM, a(po.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0),
        k.value === "employee_mis" ? (l(), o("div", gM, [
          s("div", kM, [
            t[813] || (t[813] = x('<div class="bs-page-head-icon empmis-page-head-icon" data-v-b9fb0d3a><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-b9fb0d3a></path><circle cx="9" cy="7" r="4" data-v-b9fb0d3a></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-b9fb0d3a></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-b9fb0d3a></path></svg></div><div class="bs-page-head-text" data-v-b9fb0d3a><div class="bs-page-head-title" data-v-b9fb0d3a>Employee / Performance MIS</div><div class="bs-page-head-sub" data-v-b9fb0d3a>This app has no HR/Payroll module — figures below are built from Job Card time logs and Sales Person records, so they only cover employees who had time logged or are set up as a Sales Person.</div></div>', 2)),
            s("div", fM, [
              s("div", wM, a(P(C.value)) + " - " + a(P(b.value)), 1),
              s("div", xM, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[204] || (t[204] = (e) => es("exportEmployeeMisCSV")),
                  disabled: !L.value
                }, [...t[812] || (t[812] = [
                  x('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-b9fb0d3a></path><polyline points="7 10 12 15 17 10" data-v-b9fb0d3a></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-b9fb0d3a></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9fb0d3a><polyline points="6 9 12 15 18 9" data-v-b9fb0d3a></polyline></svg>', 3)
                ])], 8, CM),
                w.value === "exportEmployeeMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[205] || (t[205] = (e) => w.value = "")
                  }),
                  s("div", SM, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[206] || (t[206] = (e) => {
                        w.value = "", Qo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[207] || (t[207] = (e) => {
                        w.value = "", Y(Qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : y("", !0)
              ])
            ])
          ]),
          s("div", jM, [
            (l(), o(u, null, m(Ul, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ns.value === e.key }]),
              onClick: (g) => Ns.value = e.key
            }, a(e.label), 11, MM)), 64))
          ]),
          ua.value ? (l(), o("div", DM)) : L.value ? (l(), o(u, { key: 1 }, [
            Ns.value === "employee_attendance" ? (l(), o(u, { key: 0 }, [
              s("div", TM, ' Proxy: a day counts as "present" if the employee has any Job Card time log on that date. ' + a(L.value.period_days) + "-day period. ", 1),
              L.value.employee_attendance.rows.length ? (l(), o("table", OM, [
                t[814] || (t[814] = s("thead", null, [
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
                    s("td", RM, a(e.present_days) + " / " + a(e.period_days), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.attendance_pct >= 80 ? "green" : "red"])
                    }, a(e.attendance_pct) + "%", 3),
                    s("td", PM, a(e.total_hours), 1),
                    s("td", IM, a(e.avg_hours_per_day), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", VM, "No Job Card time logs in this period."))
            ], 64)) : Ns.value === "department_manpower" ? (l(), o(u, { key: 1 }, [
              t[817] || (t[817] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Sales Person is the only doctype in this app with a department field, so this reflects active Sales Persons only. ", -1)),
              s("div", NM, [
                s("div", EM, [
                  t[815] || (t[815] = s("span", { class: "bucket-label" }, "Total Headcount", -1)),
                  s("span", qM, a(L.value.department_manpower.total_headcount), 1)
                ])
              ]),
              L.value.department_manpower.rows.length ? (l(), o("table", BM, [
                t[816] || (t[816] = s("thead", null, [
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
                    s("td", AM, a(e.headcount), 1),
                    s("td", $M, a(e.employees.map((g) => g.sales_person_name).join(", ")), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", LM, "No active Sales Persons set up."))
            ], 64)) : Ns.value === "salesperson_target" ? (l(), o(u, { key: 2 }, [
              t[821] || (t[821] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No target is stored — enter a target per salesperson to compare against actual sales for this period. ", -1)),
              s("div", QM, [
                s("div", FM, [
                  t[818] || (t[818] = s("span", { class: "bucket-label" }, "Total Achieved", -1)),
                  s("span", zM, a(d(L.value.salesperson_achievement.total_achieved)), 1)
                ]),
                s("div", HM, [
                  t[819] || (t[819] = s("span", { class: "bucket-label" }, "Sales with No Salesperson", -1)),
                  s("span", WM, a(d(L.value.salesperson_achievement.unassigned_sales)), 1)
                ])
              ]),
              L.value.salesperson_achievement.rows.length ? (l(), o("table", UM, [
                t[820] || (t[820] = s("thead", null, [
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
                    s("td", KM, a(e.invoice_count), 1),
                    s("td", GM, a(d(e.total_amount)), 1),
                    s("td", YM, [
                      Hs(s("input", {
                        type: "number",
                        "onUpdate:modelValue": (g) => zt.value[e.sales_person] = g,
                        class: "dr-input",
                        style: { width: "110px", "text-align": "right" },
                        min: "0"
                      }, null, 8, JM), [
                        [
                          ot,
                          zt.value[e.sales_person],
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", ca(e) >= 100 ? "green" : "red"])
                    }, a(zt.value[e.sales_person] ? ca(e).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ZM, "No sales attributed to a salesperson in this period."))
            ], 64)) : Ns.value === "salesperson_collection" ? (l(), o(u, { key: 3 }, [
              s("div", XM, [
                s("div", sD, [
                  t[822] || (t[822] = s("span", { class: "bucket-label" }, "Total Collected", -1)),
                  s("span", tD, a(d(L.value.salesperson_collection.total_collected)), 1)
                ])
              ]),
              L.value.salesperson_collection.rows.length ? (l(), o("table", eD, [
                t[823] || (t[823] = s("thead", null, [
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
                    s("td", aD, a(e.payment_count), 1),
                    s("td", oD, a(d(e.collected_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", lD, "No collections attributed to a salesperson in this period."))
            ], 64)) : Ns.value === "production_productivity" ? (l(), o(u, { key: 4 }, [
              s("div", nD, [
                s("div", iD, [
                  t[824] || (t[824] = s("span", { class: "bucket-label" }, "Team Avg Qty/Hour", -1)),
                  s("span", dD, a(L.value.production_productivity.team_avg_qty_per_hour), 1)
                ])
              ]),
              L.value.production_productivity.rows.length ? (l(), o("table", rD, [
                t[825] || (t[825] = s("thead", null, [
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
                    s("td", uD, a(e.job_card_count), 1),
                    s("td", cD, a(e.total_hours), 1),
                    s("td", mD, a(e.qty_produced), 1),
                    s("td", vD, a(e.avg_time_per_unit_mins ?? "—"), 1),
                    s("td", _D, a(e.qty_per_hour ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", pD, "No Job Card time logs in this period."))
            ], 64)) : Ns.value === "overtime" ? (l(), o(u, { key: 5 }, [
              t[827] || (t[827] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged time beyond 8 hours (480 min) in a day, from Job Card time logs. No shift doctype exists to read an actual shift length from. ", -1)),
              L.value.overtime.summary.length ? (l(), o("table", bD, [
                t[826] || (t[826] = s("thead", null, [
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
                    s("td", yD, a(e.overtime_days), 1),
                    s("td", hD, a(e.overtime_hours), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gD, "No overtime in this period."))
            ], 64)) : Ns.value === "labour_cost" ? (l(), o(u, { key: 6 }, [
              t[831] || (t[831] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged hours × the Workstation's hour rate on each Job Card — there's no per-employee wage field in this app, so this is a cost-of-time figure, not real payroll cost. ", -1)),
              s("div", kD, [
                s("div", fD, [
                  t[828] || (t[828] = s("span", { class: "bucket-label" }, "Total Labour Cost", -1)),
                  s("span", wD, a(d(L.value.labour_cost.total)), 1)
                ])
              ]),
              t[832] || (t[832] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Employee", -1)),
              L.value.labour_cost.by_employee.length ? (l(), o("table", xD, [
                t[829] || (t[829] = s("thead", null, [
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
                    s("td", CD, a(e.total_hours), 1),
                    s("td", SD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : y("", !0),
              t[833] || (t[833] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Operation", -1)),
              L.value.labour_cost.by_operation.length ? (l(), o("table", jD, [
                t[830] || (t[830] = s("thead", null, [
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
                    s("td", MD, a(e.employee_count), 1),
                    s("td", DD, a(e.total_hours), 1),
                    s("td", TD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", OD, "No Job Card time logs in this period."))
            ], 64)) : Ns.value === "employee_performance" ? (l(), o(u, { key: 7 }, [
              t[835] || (t[835] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Composite score = average of attendance %, output rate vs the team average (capped at 150%), and (100 − rejection %) — whichever of these apply to the employee. ", -1)),
              L.value.employee_performance.rows.length ? (l(), o("table", RD, [
                t[834] || (t[834] = s("thead", null, [
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
                    s("td", PD, a(e.total_hours), 1),
                    s("td", ID, a(e.qty_produced), 1),
                    s("td", VD, a(e.qty_per_hour ?? "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.rejection_pct > 0 ? "red" : ""])
                    }, a(e.rejection_pct != null ? e.rejection_pct + "%" : "—"), 3),
                    s("td", ND, a(e.attendance_pct != null ? e.attendance_pct + "%" : "—"), 1),
                    s("td", ED, a(e.overtime_hours), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", qD, "No Job Card time logs in this period."))
            ], 64)) : y("", !0)
          ], 64)) : (l(), o("div", BD, a(bo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : y("", !0)
      ]);
    };
  }
}, QD = /* @__PURE__ */ yn(AD, [["__scopeId", "data-v-b9fb0d3a"]]);
export {
  QD as default
};
