import { _ as Cn, h as v, y as Ma, c as o, W as C, a as s, F as u, r as m, u as f, w as qs, A as Ks, b, t as a, v as tl, d as os, n as c, p as Bs, D as Sn, E as jn, a6 as Mn, e as Dn, l as K, g as V, k as l, q as Tn } from "./main-LhCeK3GV.js";
import { a as On, u as ie } from "./useFrappe-SNRFR69e.js";
const qt = new TextEncoder(), Rn = (() => {
  const F = new Uint32Array(256);
  for (let S = 0; S < 256; S++) {
    let d = S;
    for (let p = 0; p < 8; p++) d = d & 1 ? 3988292384 ^ d >>> 1 : d >>> 1;
    F[S] = d >>> 0;
  }
  return F;
})();
function Pn(F) {
  let S = 4294967295;
  for (let d = 0; d < F.length; d++) S = Rn[(S ^ F[d]) & 255] ^ S >>> 8;
  return (S ^ 4294967295) >>> 0;
}
const ts = (F) => [F & 255, F >>> 8 & 255], ks = (F) => [F & 255, F >>> 8 & 255, F >>> 16 & 255, F >>> 24 & 255];
function In(F) {
  const S = [], d = [];
  let p = 0;
  for (const x of F) {
    const y = qt.encode(x.name), k = Pn(x.data), js = x.data.length, fs = new Uint8Array([
      ...ks(67324752),
      ...ts(20),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(33),
      ...ks(k),
      ...ks(js),
      ...ks(js),
      ...ts(y.length),
      ...ts(0)
    ]);
    S.push(fs, y, x.data), d.push({ name: y, crc: k, size: js, offset: p }), p += fs.length + y.length + js;
  }
  const H = p;
  let G = 0;
  for (const x of d) {
    const y = new Uint8Array([
      ...ks(33639248),
      ...ts(20),
      ...ts(20),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(33),
      ...ks(x.crc),
      ...ks(x.size),
      ...ks(x.size),
      ...ts(x.name.length),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ts(0),
      ...ks(0),
      ...ks(x.offset)
    ]);
    S.push(y, x.name), G += y.length + x.name.length;
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
function el(F) {
  return String(F).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function Vn(F) {
  let S = "";
  for (F += 1; F > 0; ) {
    const d = (F - 1) % 26;
    S = String.fromCharCode(65 + d) + S, F = Math.floor((F - 1) / 26);
  }
  return S;
}
function Nn(F, S) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${[F, ...S].map((H, G) => {
    const ls = H.map((x, y) => {
      const k = Vn(y) + (G + 1);
      return G === 0 ? `<c r="${k}" s="1" t="inlineStr"><is><t xml:space="preserve">${el(x ?? "")}</t></is></c>` : typeof x == "number" && isFinite(x) ? `<c r="${k}" s="2"><v>${x}</v></c>` : `<c r="${k}" t="inlineStr"><is><t xml:space="preserve">${el(x ?? "")}</t></is></c>`;
    }).join("");
    return `<row r="${G + 1}">${ls}</row>`;
  }).join("")}</sheetData></worksheet>`;
}
const En = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs></styleSheet>', qn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>', Bn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>', An = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Report" sheetId="1" r:id="rId1"/></sheets></workbook>', $n = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
function al(F, S, d) {
  const p = [
    { name: "[Content_Types].xml", data: qt.encode(qn) },
    { name: "_rels/.rels", data: qt.encode(Bn) },
    { name: "xl/workbook.xml", data: qt.encode(An) },
    { name: "xl/_rels/workbook.xml.rels", data: qt.encode($n) },
    { name: "xl/styles.xml", data: qt.encode(En) },
    { name: "xl/worksheets/sheet1.xml", data: qt.encode(Nn(S, d)) }
  ], H = In(p), G = URL.createObjectURL(H), ls = document.createElement("a");
  ls.href = G, ls.download = F, ls.click(), URL.revokeObjectURL(G);
}
function Ln(F) {
  const S = [];
  let d = [], p = "", H = !1;
  for (let G = 0; G < F.length; G++) {
    const ls = F[G];
    H ? ls === '"' ? F[G + 1] === '"' ? (p += '"', G++) : H = !1 : p += ls : ls === '"' ? H = !0 : ls === "," ? (d.push(p), p = "") : ls === `
` || ls === "\r" ? (ls === "\r" && F[G + 1] === `
` && G++, d.push(p), S.push(d), d = [], p = "") : p += ls;
  }
  return (p !== "" || d.length) && (d.push(p), S.push(d)), S.filter((G) => !(G.length === 1 && G[0] === "")).map((G) => G.map(Qn));
}
function Qn(F) {
  const S = F.trim();
  return /^-?(0|[1-9]\d{0,2}(,\d{3})+|[1-9]\d*)(\.\d+)?$/.test(S) ? Number(S.replace(/,/g, "")) : F;
}
const Fn = { class: "page-reports" }, Hn = { class: "report-grid" }, zn = ["onClick"], Wn = ["innerHTML"], Un = { class: "report-card-label" }, Kn = { class: "books-card date-range-bar" }, Gn = {
  key: 0,
  class: "books-card report-card bs-card"
}, Yn = { class: "bs-page-head" }, Jn = { class: "bs-page-head-text" }, Zn = { class: "bs-page-head-title" }, Xn = { class: "bs-page-head-sub" }, si = { class: "bs-page-head-actions" }, ti = {
  key: 0,
  class: "proc-search"
}, ei = ["placeholder"], ai = ["value"], oi = { class: "iws-export-wrap" }, li = ["disabled"], ni = { class: "iws-menu" }, ii = {
  key: 0,
  class: "empty-msg"
}, di = {
  key: 1,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, ri = {
  key: 2,
  class: "empty-msg"
}, ui = {
  key: 3,
  class: "empty-msg"
}, ci = {
  key: 4,
  class: "iws-body"
}, mi = { class: "iws-table-wrap iws-cards-wrap" }, vi = { class: "iws-table iws-cards" }, _i = ["data-label"], pi = {
  key: 5,
  class: "empty-msg"
}, yi = {
  key: 1,
  class: "pl-dash"
}, bi = { class: "pl-dash-header" }, hi = { class: "pl-dash-range" }, gi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, ki = { class: "pl-kpi-grid" }, fi = { class: "pl-kpi c-emerald" }, wi = { class: "pl-kpi-val green" }, xi = {
  key: 0,
  class: "pl-kpi c-pink"
}, Ci = { class: "pl-kpi-val red" }, Si = {
  key: 1,
  class: "pl-kpi c-amber"
}, ji = { class: "pl-kpi c-violet" }, Mi = { class: "pl-kpi-val red" }, Di = {
  key: 2,
  class: "pl-kpi c-blue"
}, Ti = {
  key: 0,
  class: "pl-trend-card"
}, Oi = { class: "pl-trend-header" }, Ri = { class: "pl-trend-toggle" }, Pi = { class: "pl-trend-body" }, Ii = { class: "pl-trend-chart-wrap" }, Vi = { class: "pl-trend-yaxis" }, Ni = { class: "pl-trend-chart" }, Ei = { class: "pl-trend-bars" }, qi = ["title"], Bi = ["title"], Ai = { class: "pl-trend-month" }, $i = { class: "pl-insights" }, Li = { class: "pl-insight-title" }, Qi = { class: "pl-insight-desc" }, Fi = {
  key: 2,
  class: "empty-msg"
}, Hi = {
  key: 2,
  class: "books-card report-card bs-card"
}, zi = { class: "bs-page-head" }, Wi = { class: "bs-page-head-actions" }, Ui = { class: "bs-asof" }, Ki = { class: "iws-export-wrap" }, Gi = ["disabled"], Yi = { class: "iws-menu" }, Ji = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Zi = { class: "bs-kpi-row" }, Xi = { class: "bs-kpi bs-kpi-assets" }, sd = { class: "bs-kpi-body" }, td = { class: "bs-kpi-amount" }, ed = { class: "bs-kpi bs-kpi-liabilities" }, ad = { class: "bs-kpi-body" }, od = { class: "bs-kpi-amount" }, ld = { class: "bs-kpi bs-kpi-equity" }, nd = { class: "bs-kpi-body" }, id = { class: "bs-kpi-amount" }, dd = { class: "bs-sum-status-icon" }, rd = { class: "bs-sum-status-body" }, ud = { class: "bs-sum-status-title" }, cd = { class: "bs-sum-status-eq" }, md = { class: "bs-acc" }, vd = ["onClick"], _d = ["innerHTML"], pd = { class: "bs-acc-head-text" }, yd = { class: "bs-acc-label" }, bd = { class: "bs-acc-desc" }, hd = { class: "bs-acc-amount" }, gd = {
  key: 0,
  class: "bs-acc-items"
}, kd = ["innerHTML"], fd = { class: "bs-acc-item-text" }, wd = { class: "bs-acc-item-label" }, xd = {
  key: 0,
  class: "bs-acc-item-desc"
}, Cd = { class: "bs-acc-item-amount" }, Sd = {
  key: 2,
  class: "empty-msg"
}, jd = {
  key: 3,
  class: "books-card report-card bs-card"
}, Md = { class: "bs-page-head" }, Dd = { class: "bs-page-head-actions" }, Td = { class: "bs-asof" }, Od = { class: "iws-export-wrap" }, Rd = ["disabled"], Pd = { class: "iws-menu" }, Id = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Vd = {
  key: 1,
  class: "cf-grid"
}, Nd = { class: "cf-acc" }, Ed = { class: "cf-acc-row cf-row-operating" }, qd = { class: "cf-acc-row cf-row-investing" }, Bd = { class: "cf-acc-row cf-row-financing" }, Ad = { class: "cf-acc-row cf-row-net" }, $d = { class: "cf-acc-text" }, Ld = { class: "cf-acc-desc" }, Qd = { class: "cf-flow-row" }, Fd = { class: "cf-flow-row" }, Hd = { class: "cf-side" }, zd = { class: "cf-trend-box" }, Wd = {
  key: 0,
  class: "cf-trend-chart"
}, Ud = ["title"], Kd = ["title"], Gd = ["title"], Yd = { class: "cf-trend-month" }, Jd = {
  key: 1,
  class: "empty-msg",
  style: { padding: "20px 0" }
}, Zd = { class: "cf-summary-box" }, Xd = { class: "cf-summary-text" }, sr = {
  key: 2,
  class: "empty-msg"
}, tr = {
  key: 4,
  class: "books-card report-card bs-card"
}, er = { class: "bs-page-head" }, ar = { class: "bs-page-head-actions" }, or = { class: "bs-asof" }, lr = { class: "iws-export-wrap" }, nr = ["disabled"], ir = { class: "iws-menu" }, dr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "80px", "border-radius": "8px" }
}, rr = {
  key: 1,
  class: "gst-cards"
}, ur = { class: "gst-card-head" }, cr = { class: "gst-card-title" }, mr = { class: "gst-card-desc" }, vr = { class: "gst-card-stats" }, _r = { class: "gst-stat-value" }, pr = { class: "gst-stat-value" }, yr = { class: "gst-card gst-c-total" }, br = { class: "gst-card-stats" }, hr = { class: "gst-stat-value" }, gr = { class: "gst-stat-value" }, kr = {
  key: 2,
  class: "empty-msg"
}, fr = {
  key: 5,
  class: "books-card report-card bs-card"
}, wr = { class: "bs-page-head" }, xr = { class: "bs-page-head-actions" }, Cr = { class: "bs-asof" }, Sr = { class: "iws-export-wrap" }, jr = ["disabled"], Mr = { class: "iws-menu" }, Dr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Tr = {
  key: 1,
  class: "iws-body"
}, Or = { class: "iws-total-panel iws-total-panel-neg" }, Rr = { class: "iws-total-meta" }, Pr = {
  key: 0,
  class: "iws-total-sub"
}, Ir = { class: "iws-total-sub-value" }, Vr = { class: "iws-table-wrap" }, Nr = { class: "iws-table" }, Er = { class: "iws-idx" }, qr = { class: "iws-item-name" }, Br = { class: "ta-r mono-sm" }, Ar = { class: "ta-r mono-sm fw-700 text-danger" }, $r = { class: "iws-kebab-col" }, Lr = { class: "iws-kebab-wrap" }, Qr = ["onClick"], Fr = { class: "iws-menu iws-menu-row" }, Hr = ["onClick"], zr = ["onClick"], Wr = { class: "iws-total-row" }, Ur = { class: "ta-r fw-700" }, Kr = { class: "ta-r fw-700" }, Gr = { class: "ta-r fw-700" }, Yr = { class: "ta-r fw-700" }, Jr = { class: "ta-r fw-700 text-danger" }, Zr = { class: "ta-r fw-700 text-danger" }, Xr = {
  key: 2,
  class: "empty-msg"
}, su = {
  key: 6,
  class: "books-card report-card bs-card"
}, tu = { class: "bs-page-head" }, eu = { class: "bs-page-head-actions" }, au = { class: "bs-asof" }, ou = { class: "iws-export-wrap" }, lu = ["disabled"], nu = { class: "iws-menu" }, iu = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, du = {
  key: 1,
  class: "iws-body"
}, ru = { class: "iws-total-panel iws-total-panel-neg" }, uu = { class: "iws-total-meta" }, cu = {
  key: 0,
  class: "iws-total-sub"
}, mu = { class: "iws-total-sub-value" }, vu = { class: "iws-table-wrap" }, _u = { class: "iws-table" }, pu = { class: "iws-idx" }, yu = { class: "iws-item-name" }, bu = { class: "ta-r mono-sm" }, hu = { class: "ta-r mono-sm fw-700 text-danger" }, gu = { class: "iws-kebab-col" }, ku = { class: "iws-kebab-wrap" }, fu = ["onClick"], wu = { class: "iws-menu iws-menu-row" }, xu = ["onClick"], Cu = ["onClick"], Su = { class: "iws-total-row" }, ju = { class: "ta-r fw-700" }, Mu = { class: "ta-r fw-700" }, Du = { class: "ta-r fw-700" }, Tu = { class: "ta-r fw-700" }, Ou = { class: "ta-r fw-700 text-danger" }, Ru = { class: "ta-r fw-700 text-danger" }, Pu = {
  key: 2,
  class: "empty-msg"
}, Iu = {
  key: 7,
  class: "books-card report-card bs-card"
}, Vu = { class: "bs-page-head" }, Nu = { class: "bs-page-head-actions" }, Eu = { class: "bs-asof" }, qu = { class: "iws-export-wrap" }, Bu = ["disabled"], Au = { class: "iws-menu" }, $u = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Lu = {
  key: 1,
  class: "iws-body"
}, Qu = { class: "iws-total-panel" }, Fu = { class: "iws-total-meta" }, Hu = { class: "iws-table-wrap" }, zu = { class: "iws-table" }, Wu = { class: "iws-idx" }, Uu = { class: "iws-item-name" }, Ku = { class: "iws-uom" }, Gu = { class: "ta-r mono-sm" }, Yu = { class: "ta-r mono-sm" }, Ju = { class: "ta-r mono-sm" }, Zu = { class: "ta-r mono-sm red" }, Xu = { class: "ta-r mono-sm fw-700 green" }, sc = { class: "iws-kebab-col" }, tc = { class: "iws-kebab-wrap" }, ec = ["onClick"], ac = { class: "iws-menu iws-menu-row" }, oc = ["onClick"], lc = ["onClick"], nc = { class: "iws-total-row" }, ic = { class: "ta-r fw-700" }, dc = { class: "ta-r fw-700" }, rc = { class: "ta-r fw-700 red" }, uc = { class: "ta-r fw-700 green" }, cc = {
  key: 2,
  class: "empty-msg"
}, mc = {
  key: 8,
  class: "books-card report-card bs-card"
}, vc = { class: "bs-page-head" }, _c = { class: "bs-page-head-actions" }, pc = { class: "bs-asof" }, yc = { class: "iws-export-wrap" }, bc = ["disabled"], hc = { class: "iws-menu" }, gc = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, kc = {
  key: 1,
  class: "iws-body"
}, fc = { class: "iws-total-panel" }, wc = { class: "iws-total-meta" }, xc = {
  key: 0,
  class: "iws-total-sub"
}, Cc = { class: "iws-total-sub-value" }, Sc = { class: "iws-table-wrap" }, jc = { class: "iws-table" }, Mc = { class: "iws-idx" }, Dc = { class: "iws-item-name" }, Tc = { class: "ta-r mono-sm" }, Oc = { class: "ta-r mono-sm" }, Rc = { class: "ta-r mono-sm red" }, Pc = { class: "ta-r mono-sm" }, Ic = { class: "ta-r mono-sm" }, Vc = { class: "ta-r mono-sm fw-700 green" }, Nc = { class: "iws-kebab-col" }, Ec = { class: "iws-kebab-wrap" }, qc = ["onClick"], Bc = { class: "iws-menu iws-menu-row" }, Ac = ["onClick"], $c = ["onClick"], Lc = { class: "iws-total-row" }, Qc = { class: "ta-r fw-700" }, Fc = { class: "ta-r fw-700" }, Hc = { class: "ta-r fw-700 red" }, zc = { class: "ta-r fw-700" }, Wc = { class: "ta-r fw-700 red" }, Uc = { class: "ta-r fw-700 green" }, Kc = {
  key: 2,
  class: "empty-msg"
}, Gc = {
  key: 9,
  class: "books-card report-card bs-card"
}, Yc = { class: "bs-page-head" }, Jc = { class: "bs-page-head-actions" }, Zc = { class: "bs-asof" }, Xc = { class: "iws-export-wrap" }, sm = ["disabled"], tm = { class: "iws-menu" }, em = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, am = { class: "iws-body" }, om = { class: "iws-total-meta" }, lm = {
  key: 0,
  class: "iws-total-sub"
}, nm = { class: "iws-total-sub-value" }, im = { class: "iws-table-wrap" }, dm = { class: "iws-table" }, rm = { class: "iws-idx" }, um = { class: "iws-item-name" }, cm = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "No valuation or standard buying rate found for this item — margin below is not meaningful"
}, mm = { class: "ta-r mono-sm" }, vm = { class: "ta-r mono-sm" }, _m = { class: "ta-r mono-sm" }, pm = { class: "ta-r mono-sm red" }, ym = { class: "iws-kebab-col" }, bm = { class: "iws-kebab-wrap" }, hm = ["onClick"], gm = { class: "iws-menu iws-menu-row" }, km = ["onClick"], fm = ["onClick"], wm = { class: "iws-total-row" }, xm = { class: "ta-r fw-700" }, Cm = { class: "ta-r fw-700" }, Sm = { class: "ta-r fw-700 red" }, jm = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-top": "10px" }
}, Mm = {
  key: 2,
  class: "empty-msg"
}, Dm = {
  key: 10,
  class: "books-card report-card bs-card"
}, Tm = { class: "bs-page-head" }, Om = { class: "bs-page-head-actions" }, Rm = { class: "bs-asof" }, Pm = { class: "iws-export-wrap" }, Im = ["disabled"], Vm = { class: "iws-menu" }, Nm = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Em = {
  key: 1,
  class: "iws-body"
}, qm = { class: "iws-total-meta" }, Bm = {
  key: 0,
  class: "iws-total-sub"
}, Am = { class: "iws-total-sub-label" }, $m = { style: { "font-size": "11px", color: "var(--text-3)", "margin-top": "4px" } }, Lm = { class: "iws-table-wrap" }, Qm = { class: "iws-table" }, Fm = { class: "iws-idx" }, Hm = ["checked"], zm = { class: "iws-idx" }, Wm = ["checked", "onChange"], Um = { class: "mono-sm" }, Km = ["onClick"], Gm = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "One or more items on this invoice have no valuation or standard buying rate — cost/margin is understated"
}, Ym = { class: "mono-sm" }, Jm = { class: "iws-item-name" }, Zm = { class: "ta-r mono-sm" }, Xm = { class: "ta-r mono-sm red" }, sv = { class: "iws-kebab-col" }, tv = { class: "iws-kebab-wrap" }, ev = ["onClick"], av = { class: "iws-menu iws-menu-row" }, ov = ["onClick"], lv = ["onClick"], nv = ["onClick"], iv = { class: "iws-total-row" }, dv = { class: "ta-r fw-700" }, rv = { class: "ta-r fw-700 red" }, uv = {
  key: 2,
  class: "empty-msg"
}, cv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "180px", "border-radius": "8px" }
}, mv = { style: { display: "flex", "flex-wrap": "wrap", gap: "16px", "font-size": "12.5px", color: "#868E96", "margin-bottom": "14px" } }, vv = { style: { color: "#212529" } }, _v = { style: { color: "#212529" } }, pv = { style: { color: "#212529" } }, yv = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" }
}, bv = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, hv = { class: "ta-r mono-sm" }, gv = { class: "ta-r mono-sm" }, kv = { class: "ta-r mono-sm" }, fv = { class: "ta-r mono-sm" }, wv = { class: "ta-r mono-sm red" }, xv = { class: "aging-totals-row" }, Cv = { class: "ta-r fw-700" }, Sv = { class: "ta-r fw-700 red" }, jv = {
  key: 2,
  class: "empty-msg"
}, Mv = {
  key: 11,
  class: "books-card report-card bs-card"
}, Dv = { class: "bs-page-head" }, Tv = { class: "bs-page-head-actions" }, Ov = { class: "bs-asof" }, Rv = { class: "iws-export-wrap" }, Pv = ["disabled"], Iv = { class: "iws-menu" }, Vv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Nv = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(2, 1fr)", "margin-bottom": "14px" }
}, Ev = { class: "bs-kpi bs-kpi-assets" }, qv = { class: "bs-kpi-body" }, Bv = { class: "bs-kpi-amount" }, Av = { class: "bs-kpi bs-kpi-liabilities" }, $v = { class: "bs-kpi-body" }, Lv = { class: "bs-kpi-amount" }, Qv = { class: "bs-sum-status-icon" }, Fv = { class: "bs-sum-status-body" }, Hv = { class: "bs-sum-status-title" }, zv = { class: "bs-sum-status-eq" }, Wv = {
  class: "iws-table-wrap",
  style: { "margin-top": "14px" }
}, Uv = { class: "iws-table" }, Kv = { class: "iws-idx" }, Gv = { class: "iws-item-name" }, Yv = {
  class: "iws-uom",
  style: { background: "#f1f5f9", color: "#475569" }
}, Jv = { class: "ta-r mono-sm green" }, Zv = { class: "ta-r mono-sm red" }, Xv = { class: "iws-kebab-col" }, s1 = { class: "iws-kebab-wrap" }, t1 = ["onClick"], e1 = { class: "iws-menu iws-menu-row" }, a1 = ["onClick"], o1 = ["onClick"], l1 = { class: "iws-total-row" }, n1 = { class: "ta-r fw-700" }, i1 = { class: "ta-r fw-700 green" }, d1 = { class: "ta-r fw-700 red" }, r1 = { class: "ta-r fw-700" }, u1 = {
  key: 2,
  class: "empty-msg"
}, c1 = {
  key: 12,
  class: "books-card report-card bs-card"
}, m1 = { class: "bs-page-head" }, v1 = { class: "bs-page-head-actions" }, _1 = { class: "bs-asof" }, p1 = { class: "iws-export-wrap" }, y1 = ["disabled"], b1 = { class: "iws-menu" }, h1 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, g1 = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(3, 1fr)", "margin-bottom": "14px" }
}, k1 = { class: "bs-kpi bs-kpi-assets" }, f1 = { class: "bs-kpi-body" }, w1 = { class: "bs-kpi-amount" }, x1 = { class: "bs-kpi bs-kpi-equity" }, C1 = { class: "bs-kpi-body" }, S1 = { class: "bs-kpi-amount" }, j1 = { class: "bs-kpi-body" }, M1 = { class: "bs-sum-status-icon" }, D1 = { class: "bs-sum-status-body" }, T1 = { class: "bs-sum-status-title" }, O1 = { class: "bs-sum-status-eq" }, R1 = {
  key: 0,
  class: "sgl-grir-note"
}, P1 = { class: "mono-sm fw-600" }, I1 = {
  class: "iws-table-wrap",
  style: { "margin-bottom": "20px" }
}, V1 = { class: "iws-table" }, N1 = { class: "iws-idx" }, E1 = { class: "iws-item-name" }, q1 = { class: "ta-r mono-sm" }, B1 = { class: "ta-r mono-sm" }, A1 = { class: "iws-kebab-col" }, $1 = { class: "iws-kebab-wrap" }, L1 = ["onClick"], Q1 = { class: "iws-menu iws-menu-row" }, F1 = ["onClick"], H1 = { class: "iws-table-wrap" }, z1 = { class: "iws-table" }, W1 = { class: "iws-idx" }, U1 = { class: "iws-item-name" }, K1 = { class: "iws-uom" }, G1 = { class: "ta-r mono-sm" }, Y1 = { class: "ta-r mono-sm" }, J1 = { class: "ta-r mono-sm fw-700 green" }, Z1 = { class: "iws-kebab-col" }, X1 = { class: "iws-kebab-wrap" }, s_ = ["onClick"], t_ = { class: "iws-menu iws-menu-row" }, e_ = ["onClick"], a_ = ["onClick"], o_ = { class: "iws-total-row" }, l_ = { class: "ta-r fw-700 green" }, n_ = {
  key: 2,
  class: "empty-msg"
}, i_ = {
  key: 13,
  class: "books-card report-card bs-card"
}, d_ = { class: "bs-page-head" }, r_ = { class: "bs-page-head-actions" }, u_ = { class: "bs-asof" }, c_ = { class: "iws-export-wrap" }, m_ = ["disabled"], v_ = { class: "iws-menu" }, __ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, p_ = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "1fr", "margin-bottom": "14px" }
}, y_ = { class: "bs-kpi bs-kpi-assets" }, b_ = { class: "bs-kpi-body" }, h_ = { class: "bs-kpi-amount" }, g_ = { class: "iws-table-wrap" }, k_ = { class: "iws-table" }, f_ = { class: "iws-idx" }, w_ = { class: "iws-item-name" }, x_ = { class: "ta-r mono-sm fw-700 green" }, C_ = { class: "ta-r mono-sm" }, S_ = { class: "iws-total-row" }, j_ = { class: "ta-r fw-700 green" }, M_ = {
  key: 1,
  class: "empty-msg"
}, D_ = {
  key: 2,
  class: "empty-msg"
}, T_ = {
  key: 14,
  class: "books-card report-card bs-card"
}, O_ = { class: "bs-page-head" }, R_ = { class: "bs-page-head-actions" }, P_ = { class: "iws-export-wrap" }, I_ = ["disabled"], V_ = { class: "iws-menu" }, N_ = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap", "margin-bottom": "12px" } }, E_ = ["value"], q_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, B_ = {
  key: 1,
  class: "iws-table-wrap"
}, A_ = { class: "iws-table" }, $_ = { class: "iws-idx" }, L_ = { class: "iws-item-name" }, Q_ = {
  class: "mono-sm",
  style: { opacity: ".65" }
}, F_ = { class: "ta-r mono-sm" }, H_ = { class: "ta-r mono-sm fw-700 green" }, z_ = { class: "ta-r mono-sm fw-700" }, W_ = {
  key: 2,
  class: "empty-msg"
}, U_ = {
  key: 15,
  class: "books-card report-card bs-card"
}, K_ = { class: "bs-page-head" }, G_ = { class: "bs-page-head-actions" }, Y_ = { class: "bs-asof" }, J_ = { class: "iws-export-wrap" }, Z_ = ["disabled"], X_ = { class: "iws-menu" }, sp = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, tp = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "18px" }
}, ep = { class: "mis-summary-card" }, ap = { class: "mis-summary-val" }, op = { class: "mis-summary-card" }, lp = { class: "mis-summary-val green" }, np = { class: "mis-summary-card" }, ip = { class: "mis-summary-val" }, dp = { class: "mis-summary-card" }, rp = { class: "mis-summary-val red" }, up = { class: "mis-summary-card" }, cp = { class: "mis-summary-val" }, mp = { class: "mis-summary-card" }, vp = { class: "mis-summary-val" }, _p = { class: "mis-summary-card" }, pp = { class: "mis-summary-val" }, yp = { class: "mis-summary-card" }, bp = { class: "iws-table-wrap" }, hp = { class: "iws-table" }, gp = { class: "iws-item-name" }, kp = { class: "ta-r mono-sm" }, fp = { class: "ta-r mono-sm green" }, wp = { class: "ta-r mono-sm" }, xp = { class: "ta-r mono-sm red" }, Cp = { class: "ta-r mono-sm" }, Sp = { class: "ta-r mono-sm" }, jp = { class: "ta-r mono-sm" }, Mp = { class: "ta-r mono-sm" }, Dp = { class: "ta-r mono-sm fw-600" }, Tp = { class: "iws-total-row" }, Op = { class: "ta-r fw-700" }, Rp = { class: "ta-r fw-700 green" }, Pp = { class: "ta-r fw-700" }, Ip = { class: "ta-r fw-700 red" }, Vp = { class: "ta-r fw-700" }, Np = { class: "ta-r fw-700" }, Ep = { class: "ta-r fw-700" }, qp = { class: "ta-r fw-700" }, Bp = { class: "ta-r fw-700" }, Ap = {
  key: 1,
  class: "empty-msg"
}, $p = {
  key: 2,
  class: "empty-msg"
}, Lp = {
  key: 16,
  class: "books-card report-card bs-card"
}, Qp = { class: "bs-page-head" }, Fp = { class: "bs-page-head-actions" }, Hp = { class: "bs-asof" }, zp = { class: "iws-export-wrap" }, Wp = ["disabled"], Up = { class: "iws-menu" }, Kp = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Gp = ["onClick"], Yp = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Jp = {
  key: 0,
  class: "mis-summary-grid"
}, Zp = { class: "mis-summary-card" }, Xp = { class: "mis-summary-val" }, sy = { class: "mis-summary-card" }, ty = { class: "mis-summary-val" }, ey = { class: "mis-summary-card" }, ay = { class: "mis-summary-val" }, oy = { class: "mis-summary-card" }, ly = { class: "mis-summary-val red" }, ny = { class: "mis-summary-card" }, iy = { class: "mis-summary-val green" }, dy = { class: "mis-summary-card" }, ry = { class: "mis-summary-val" }, uy = { class: "mis-summary-card" }, cy = { class: "mis-summary-val" }, my = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, vy = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, _y = { class: "mis-summary-card" }, py = { class: "mis-summary-val" }, yy = { class: "mis-summary-card" }, by = { class: "mis-summary-val green" }, hy = { class: "mis-summary-card" }, gy = { class: "mono" }, ky = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, fy = { class: "ta-r mono-sm" }, wy = { class: "ta-r mono-sm" }, xy = { class: "ta-r mono-sm red" }, Cy = { class: "ta-r mono-sm fw-600" }, Sy = {
  key: 3,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jy = { class: "ta-r mono-sm" }, My = { class: "ta-r mono-sm fw-600" }, Dy = { class: "ta-r mono-sm" }, Ty = {
  key: 4,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Oy = { class: "ta-r mono-sm" }, Ry = { class: "ta-r mono-sm fw-600" }, Py = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, Iy = { class: "ta-r mono-sm" }, Vy = { class: "ta-r mono-sm fw-600" }, Ny = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Ey = { class: "mis-summary-card" }, qy = { class: "mis-summary-val" }, By = { class: "mis-summary-card" }, Ay = { class: "mis-summary-val red" }, $y = { class: "mis-summary-card" }, Ly = { class: "mis-summary-val" }, Qy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Fy = { class: "ta-r mono-sm red" }, Hy = {
  key: 1,
  class: "empty-msg"
}, zy = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Wy = { class: "mis-summary-card" }, Uy = { class: "mis-summary-val red" }, Ky = { class: "mis-summary-card" }, Gy = { class: "mis-summary-val red" }, Yy = { class: "mis-summary-card" }, Jy = { class: "mis-summary-val" }, Zy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, Xy = { class: "ta-r mono-sm red" }, sb = { class: "ta-r mono-sm red" }, tb = { class: "ta-r mono-sm" }, eb = {
  key: 1,
  class: "empty-msg"
}, ab = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ob = { class: "ta-r mono-sm red" }, lb = { class: "ta-r mono-sm" }, nb = {
  key: 3,
  class: "empty-msg"
}, ib = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, db = { class: "mis-summary-card" }, rb = { class: "mis-summary-val" }, ub = { class: "mis-summary-card" }, cb = { class: "mis-summary-val red" }, mb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, vb = { class: "badge badge-blue" }, _b = { class: "ta-r mono-sm" }, pb = { class: "ta-r mono-sm green" }, yb = { class: "ta-r mono-sm red fw-600" }, bb = {
  key: 1,
  class: "empty-msg"
}, hb = { class: "mis-summary-grid" }, gb = { class: "mis-summary-card" }, kb = { class: "mis-summary-val" }, fb = { class: "mis-summary-card" }, wb = { class: "mis-summary-val green" }, xb = { class: "mis-summary-card" }, Cb = { class: "mis-summary-card" }, Sb = { class: "mis-summary-val" }, jb = { class: "mis-summary-card" }, Mb = { class: "mis-summary-val green" }, Db = { class: "mis-summary-card" }, Tb = { class: "mis-summary-val" }, Ob = {
  key: 2,
  class: "empty-msg"
}, Rb = {
  key: 17,
  class: "books-card report-card bs-card"
}, Pb = { class: "bs-page-head" }, Ib = { class: "bs-page-head-actions" }, Vb = { class: "bs-asof" }, Nb = { class: "iws-export-wrap" }, Eb = ["disabled"], qb = { class: "iws-menu" }, Bb = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Ab = ["onClick"], $b = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Lb = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Qb = { class: "mono" }, Fb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(4,1fr)" }
}, Hb = { class: "mis-summary-card" }, zb = { class: "mis-summary-val" }, Wb = { class: "mis-summary-card" }, Ub = { class: "mis-summary-val" }, Kb = { class: "mis-summary-card" }, Gb = { class: "mis-summary-val red" }, Yb = { class: "mis-summary-card" }, Jb = { class: "mis-summary-val green" }, Zb = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Xb = { class: "mono" }, s0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, t0 = { class: "ta-r mono-sm" }, e0 = { class: "ta-r mono-sm fw-600" }, a0 = {
  key: 1,
  class: "empty-msg"
}, o0 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, l0 = { class: "aging-bucket" }, n0 = { class: "bucket-val mono-sm" }, i0 = { class: "aging-bucket" }, d0 = { class: "bucket-val mono-sm" }, r0 = { class: "aging-bucket" }, u0 = { class: "bucket-val mono-sm" }, c0 = { class: "aging-bucket" }, m0 = { class: "bucket-val mono-sm red" }, v0 = { class: "aging-bucket" }, _0 = { class: "bucket-val mono-sm fw-700" }, p0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, y0 = { class: "ta-r mono-sm" }, b0 = { class: "ta-r mono-sm" }, h0 = { class: "ta-r mono-sm" }, g0 = { class: "ta-r mono-sm red" }, k0 = { class: "ta-r mono-sm fw-600" }, f0 = {
  key: 1,
  class: "empty-msg"
}, w0 = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, x0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, C0 = { class: "mis-summary-card" }, S0 = { class: "mis-summary-val" }, j0 = { class: "mis-summary-card" }, M0 = { class: "mis-summary-val green" }, D0 = { class: "mis-summary-card" }, T0 = { class: "mono" }, O0 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, R0 = { class: "mono" }, P0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, I0 = { class: "ta-r mono-sm" }, V0 = { class: "ta-r mono-sm green" }, N0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, E0 = { class: "mis-summary-card" }, q0 = { class: "mis-summary-val" }, B0 = { class: "mis-summary-card" }, A0 = { class: "mis-summary-val red" }, $0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, L0 = { class: "ta-r mono-sm red fw-600" }, Q0 = { class: "ta-r mono-sm" }, F0 = {
  key: 1,
  class: "empty-msg"
}, H0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, z0 = { class: "ta-r mono-sm" }, W0 = { class: "ta-r mono-sm" }, U0 = {
  key: 1,
  class: "empty-msg"
}, K0 = { class: "mis-summary-grid" }, G0 = { class: "mis-summary-card" }, Y0 = { class: "mis-summary-val" }, J0 = { class: "mis-summary-card" }, Z0 = { class: "mis-summary-val" }, X0 = { class: "mis-summary-card" }, sh = { class: "mis-summary-val" }, th = { class: "mis-summary-card" }, eh = { class: "mis-summary-val green" }, ah = { class: "mis-summary-card" }, oh = { class: "mis-summary-val red" }, lh = { class: "mis-summary-card" }, nh = {
  key: 2,
  class: "empty-msg"
}, ih = {
  key: 18,
  class: "books-card report-card bs-card"
}, dh = { class: "bs-page-head" }, rh = { class: "bs-page-head-actions" }, uh = { class: "bs-asof" }, ch = { class: "iws-export-wrap" }, mh = ["disabled"], vh = { class: "iws-menu" }, _h = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, ph = ["onClick"], yh = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, bh = {
  key: 0,
  class: "mis-summary-grid"
}, hh = { class: "mis-summary-card" }, gh = { class: "mis-summary-val" }, kh = { class: "mis-summary-card" }, fh = { class: "mis-summary-val" }, wh = { class: "mis-summary-card" }, xh = { class: "mis-summary-val" }, Ch = { class: "mis-summary-card" }, Sh = { class: "mis-summary-val green" }, jh = { class: "mis-summary-card" }, Mh = { class: "mis-summary-val red" }, Dh = { class: "mis-summary-card" }, Th = { class: "mis-summary-val" }, Oh = { class: "mis-summary-card" }, Rh = { class: "mis-summary-val" }, Ph = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ih = { class: "ta-r mono-sm" }, Vh = { class: "ta-r mono-sm fw-600" }, Nh = { class: "ta-r mono-sm" }, Eh = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qh = { class: "ta-r mono-sm" }, Bh = { class: "ta-r mono-sm" }, Ah = { class: "ta-r mono-sm" }, $h = { class: "ta-r mono-sm fw-600" }, Lh = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, Qh = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, Fh = { class: "mis-summary-card" }, Hh = { class: "mis-summary-val" }, zh = { class: "mis-summary-card" }, Wh = { class: "mis-summary-val red" }, Uh = { class: "mis-summary-card" }, Kh = { class: "mono" }, Gh = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Yh = { key: 0 }, Jh = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Zh = { class: "ta-r mono-sm" }, Xh = { class: "ta-r mono-sm" }, sg = { class: "ta-r mono-sm" }, tg = {
  key: 1,
  class: "empty-msg"
}, eg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, ag = { class: "mis-summary-card" }, og = { class: "mis-summary-val" }, lg = { class: "mis-summary-card" }, ng = { class: "mis-summary-val red" }, ig = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, dg = { class: "badge badge-blue" }, rg = { class: "ta-r mono-sm" }, ug = { class: "ta-r mono-sm" }, cg = { class: "ta-r mono-sm red fw-600" }, mg = {
  key: 1,
  class: "empty-msg"
}, vg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, _g = { class: "mis-summary-card" }, pg = { class: "mis-summary-val" }, yg = { class: "mis-summary-card" }, bg = { class: "mis-summary-val red" }, hg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, gg = { class: "badge badge-blue" }, kg = { class: "ta-r mono-sm" }, fg = { class: "ta-r mono-sm" }, wg = { class: "ta-r mono-sm red fw-600" }, xg = {
  key: 1,
  class: "empty-msg"
}, Cg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Sg = { class: "mis-summary-card" }, jg = { class: "mis-summary-val" }, Mg = { class: "mis-summary-card" }, Dg = { class: "mis-summary-val green" }, Tg = { class: "mis-summary-card" }, Og = { class: "mis-summary-val" }, Rg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Pg = { class: "ta-r mono-sm fw-600" }, Ig = {
  key: 1,
  class: "empty-msg"
}, Vg = {
  key: 2,
  class: "empty-msg"
}, Ng = {
  key: 19,
  class: "books-card report-card bs-card"
}, Eg = { class: "bs-page-head" }, qg = { class: "bs-page-head-actions" }, Bg = { class: "bs-asof" }, Ag = { class: "iws-export-wrap" }, $g = ["disabled"], Lg = { class: "iws-menu" }, Qg = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Fg = ["onClick"], Hg = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, zg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Wg = { class: "mis-summary-card" }, Ug = { class: "mis-summary-val" }, Kg = { class: "mis-summary-card" }, Gg = { class: "mis-summary-val green" }, Yg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Jg = { class: "ta-r mono-sm" }, Zg = { class: "ta-r mono-sm" }, Xg = { class: "ta-r mono-sm fw-600" }, s2 = {
  key: 1,
  class: "empty-msg"
}, t2 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, e2 = { class: "mono" }, a2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, o2 = { class: "ta-r mono-sm" }, l2 = { class: "ta-r mono-sm" }, n2 = { class: "ta-r mono-sm fw-600" }, i2 = {
  key: 1,
  class: "empty-msg"
}, d2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, r2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, u2 = { class: "ta-r mono-sm fw-600 green" }, c2 = { class: "ta-r mono-sm" }, m2 = { class: "ta-r mono-sm" }, v2 = {
  key: 1,
  class: "empty-msg"
}, _2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, p2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, y2 = { class: "ta-r mono-sm" }, b2 = { class: "ta-r mono-sm" }, h2 = { class: "ta-r mono-sm red" }, g2 = {
  key: 1,
  class: "empty-msg"
}, k2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, f2 = { class: "mis-summary-card" }, w2 = { class: "mis-summary-val" }, x2 = { class: "mis-summary-card" }, C2 = { class: "mis-summary-val red" }, S2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, j2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M2 = { class: "ta-r mono-sm" }, D2 = { class: "ta-r mono-sm fw-600" }, T2 = { class: "ta-r mono-sm red" }, O2 = {
  key: 1,
  class: "empty-msg"
}, R2 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, P2 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, I2 = { class: "aging-bucket" }, V2 = { class: "bucket-val mono-sm" }, N2 = { class: "aging-bucket" }, E2 = { class: "bucket-val mono-sm" }, q2 = { class: "aging-bucket" }, B2 = { class: "bucket-val mono-sm" }, A2 = { class: "aging-bucket" }, $2 = { class: "bucket-val mono-sm red" }, L2 = { class: "aging-bucket" }, Q2 = { class: "bucket-val mono-sm fw-700" }, F2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, H2 = { class: "ta-r mono-sm" }, z2 = { class: "ta-r mono-sm" }, W2 = {
  key: 1,
  class: "empty-msg"
}, U2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, K2 = { class: "mis-summary-card" }, G2 = { class: "mis-summary-val red" }, Y2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, J2 = { class: "ta-r mono-sm red fw-600" }, Z2 = { class: "ta-r mono-sm" }, X2 = { class: "ta-r mono-sm" }, sk = { class: "ta-r mono-sm" }, tk = {
  key: 1,
  class: "empty-msg"
}, ek = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, ak = { class: "mis-summary-card" }, ok = { class: "mis-summary-val red" }, lk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nk = { class: "ta-r mono-sm" }, ik = { class: "ta-r mono-sm" }, dk = { class: "ta-r mono-sm red" }, rk = { class: "ta-r mono-sm" }, uk = { class: "ta-r mono-sm fw-600" }, ck = {
  key: 1,
  class: "empty-msg"
}, mk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, vk = { class: "mis-summary-card" }, _k = { class: "mis-summary-val" }, pk = { class: "mis-summary-card" }, yk = { class: "mis-summary-val green" }, bk = { class: "mis-summary-card" }, hk = { class: "mis-summary-val red" }, gk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, kk = {
  key: 1,
  class: "empty-msg"
}, fk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, wk = { class: "mis-summary-card" }, xk = { class: "mis-summary-val" }, Ck = { class: "mis-summary-card" }, Sk = { class: "mis-summary-val red" }, jk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Mk = { class: "ta-r mono-sm red fw-600" }, Dk = { class: "ta-r mono-sm red" }, Tk = {
  key: 1,
  class: "empty-msg"
}, Ok = {
  key: 2,
  class: "empty-msg"
}, Rk = {
  key: 20,
  class: "books-card report-card bs-card"
}, Pk = { class: "bs-page-head" }, Ik = { class: "bs-page-head-actions" }, Vk = { class: "bs-asof" }, Nk = { class: "iws-export-wrap" }, Ek = ["disabled"], qk = { class: "iws-menu" }, Bk = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Ak = ["onClick"], $k = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Lk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Qk = { class: "mis-summary-card" }, Fk = { class: "mis-summary-val" }, Hk = { class: "mis-summary-card" }, zk = { class: "mis-summary-val green" }, Wk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Uk = { class: "ta-r mono-sm" }, Kk = { class: "ta-r mono-sm" }, Gk = { class: "ta-r mono-sm" }, Yk = {
  key: 1,
  class: "empty-msg"
}, Jk = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Zk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Xk = { class: "mis-summary-card" }, sf = { class: "mis-summary-val red" }, tf = { class: "mis-summary-card" }, ef = { class: "mis-summary-val red" }, af = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, of = { class: "ta-r mono-sm" }, lf = { class: "ta-r mono-sm" }, nf = { class: "ta-r mono-sm fw-600 red" }, df = {
  key: 1,
  class: "empty-msg"
}, rf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, uf = { class: "mis-summary-card" }, cf = { class: "mis-summary-val" }, mf = { class: "mis-summary-card" }, vf = { class: "mis-summary-val" }, _f = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, pf = { class: "ta-r mono-sm" }, yf = { class: "ta-r mono-sm" }, bf = { class: "ta-r mono-sm" }, hf = { class: "ta-r mono-sm" }, gf = {
  key: 1,
  class: "empty-msg"
}, kf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, ff = { class: "mis-summary-card" }, wf = { class: "mis-summary-val red" }, xf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Cf = { class: "ta-r mono-sm" }, Sf = { class: "ta-r mono-sm" }, jf = { class: "ta-r mono-sm fw-600 red" }, Mf = {
  key: 1,
  class: "empty-msg"
}, Df = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, Tf = { class: "mono" }, Of = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Rf = { class: "ta-r mono-sm" }, Pf = { class: "ta-r mono-sm" }, If = { class: "ta-r mono-sm fw-600" }, Vf = {
  key: 1,
  class: "empty-msg"
}, Nf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, Ef = { class: "mis-summary-card" }, qf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Bf = { class: "ta-r mono-sm" }, Af = { class: "ta-r mono-sm" }, $f = {
  key: 1,
  class: "empty-msg"
}, Lf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Qf = { class: "mis-summary-card" }, Ff = { class: "mis-summary-val" }, Hf = { class: "mis-summary-card" }, zf = { class: "mis-summary-val" }, Wf = { class: "mis-summary-card" }, Uf = { class: "mis-summary-val fw-700" }, Kf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Gf = { class: "ta-r mono-sm" }, Yf = { class: "ta-r mono-sm" }, Jf = { class: "ta-r mono-sm" }, Zf = { class: "ta-r mono-sm fw-600" }, Xf = { class: "ta-r mono-sm" }, sw = {
  key: 1,
  class: "empty-msg"
}, tw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, ew = { class: "mis-summary-card" }, aw = { class: "mis-summary-val" }, ow = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, lw = { class: "ta-r mono-sm" }, nw = { class: "ta-r mono-sm" }, iw = {
  key: 1,
  class: "empty-msg"
}, dw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, rw = { class: "mis-summary-card" }, uw = { class: "mis-summary-val red" }, cw = { class: "mis-summary-card" }, mw = { class: "mis-summary-val red" }, vw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _w = { class: "ta-r mono-sm red fw-600" }, pw = { class: "ta-r mono-sm" }, yw = {
  key: 1,
  class: "empty-msg"
}, bw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, hw = { class: "mis-summary-card" }, gw = { class: "mis-summary-val red" }, kw = { class: "mis-summary-card" }, fw = { class: "mis-summary-val red" }, ww = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xw = { class: "ta-r mono-sm red fw-600" }, Cw = { class: "ta-r mono-sm" }, Sw = {
  key: 1,
  class: "empty-msg"
}, jw = {
  key: 2,
  class: "empty-msg"
}, Mw = {
  key: 21,
  class: "books-card report-card bs-card"
}, Dw = { class: "bs-page-head" }, Tw = { class: "bs-page-head-actions" }, Ow = { class: "bs-asof" }, Rw = { class: "iws-export-wrap" }, Pw = ["disabled"], Iw = { class: "iws-menu" }, Vw = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Nw = ["onClick"], Ew = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, qw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Bw = { class: "mis-summary-card" }, Aw = { class: "mis-summary-val" }, $w = { class: "mis-summary-card" }, Lw = { class: "mis-summary-val green" }, Qw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Fw = { class: "ta-r mono-sm" }, Hw = { class: "ta-r mono-sm" }, zw = { class: "ta-r mono-sm" }, Ww = { class: "ta-r mono-sm fw-600 green" }, Uw = {
  key: 1,
  class: "empty-msg"
}, Kw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Gw = { class: "mis-summary-card" }, Yw = { class: "mis-summary-val" }, Jw = { class: "mis-summary-card" }, Zw = { class: "mis-summary-val" }, Xw = { class: "mis-summary-card" }, s3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, t3 = { class: "ta-r mono-sm" }, e3 = { class: "ta-r mono-sm" }, a3 = { class: "ta-r mono-sm" }, o3 = {
  key: 1,
  class: "empty-msg"
}, l3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n3 = { class: "ta-r mono-sm" }, i3 = { class: "ta-r mono-sm" }, d3 = { class: "ta-r mono-sm fw-600" }, r3 = {
  key: 1,
  class: "empty-msg"
}, u3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, c3 = { class: "ta-r mono-sm" }, m3 = { class: "ta-r mono-sm" }, v3 = {
  key: 1,
  class: "empty-msg"
}, _3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, p3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, y3 = { class: "ta-r mono-sm fw-600 green" }, b3 = { class: "ta-r mono-sm" }, h3 = { class: "ta-r mono-sm" }, g3 = {
  key: 1,
  class: "empty-msg"
}, k3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, f3 = { class: "ta-r mono-sm" }, w3 = { class: "ta-r mono-sm" }, x3 = { class: "ta-r mono-sm fw-600" }, C3 = {
  key: 1,
  class: "empty-msg"
}, S3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, j3 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, M3 = { class: "mis-summary-card" }, D3 = { class: "mis-summary-val red" }, T3 = { class: "mis-summary-card" }, O3 = { class: "mis-summary-val red" }, R3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, P3 = { class: "ta-r mono-sm red fw-600" }, I3 = { class: "ta-r mono-sm red" }, V3 = { class: "ta-r mono-sm" }, N3 = {
  key: 1,
  class: "empty-msg"
}, E3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, q3 = { class: "ta-r mono-sm fw-600 green" }, B3 = { class: "ta-r mono-sm" }, A3 = {
  key: 1,
  class: "empty-msg"
}, $3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, L3 = { class: "ta-r mono-sm red fw-600" }, Q3 = { class: "ta-r mono-sm" }, F3 = {
  key: 1,
  class: "empty-msg"
}, H3 = {
  key: 2,
  class: "empty-msg"
}, z3 = {
  key: 22,
  class: "books-card report-card bs-card"
}, W3 = { class: "bs-page-head" }, U3 = { class: "bs-page-head-actions" }, K3 = { class: "bs-asof" }, G3 = { class: "iws-export-wrap" }, Y3 = ["disabled"], J3 = { class: "iws-menu" }, Z3 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, X3 = ["onClick"], s4 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, t4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, e4 = { class: "mis-summary-grid" }, a4 = { class: "mis-summary-card" }, o4 = { class: "mis-summary-val" }, l4 = { class: "mis-summary-card" }, n4 = { class: "mis-summary-val green" }, i4 = { class: "mis-summary-card" }, d4 = { class: "mis-summary-val" }, r4 = { class: "mis-summary-card" }, u4 = { class: "mis-summary-val" }, c4 = { class: "mis-summary-card" }, m4 = { class: "mis-summary-val" }, v4 = { class: "mis-summary-card" }, _4 = { class: "mis-summary-val" }, p4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, y4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, b4 = { class: "mis-summary-card" }, h4 = { class: "mis-summary-val" }, g4 = { class: "mis-summary-card" }, k4 = { class: "mis-summary-val red" }, f4 = { class: "mis-summary-card" }, w4 = { class: "mis-summary-val red" }, x4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, C4 = { class: "ta-r mono-sm" }, S4 = { class: "ta-r mono-sm red fw-600" }, j4 = { class: "ta-r mono-sm" }, M4 = {
  key: 1,
  class: "empty-msg"
}, D4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, T4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, O4 = { class: "mis-summary-card" }, R4 = { class: "mis-summary-val" }, P4 = { class: "mis-summary-card" }, I4 = { class: "mis-summary-val red" }, V4 = { class: "mis-summary-card" }, N4 = { class: "mis-summary-val red" }, E4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, q4 = { class: "ta-r mono-sm" }, B4 = { class: "ta-r mono-sm" }, A4 = { class: "ta-r mono-sm red fw-600" }, $4 = {
  key: 1,
  class: "empty-msg"
}, L4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Q4 = { class: "mis-summary-card" }, F4 = { class: "mis-summary-val red" }, H4 = { class: "mis-summary-card" }, z4 = { class: "mis-summary-val red" }, W4 = { class: "mis-summary-card" }, U4 = { class: "mis-summary-val red" }, K4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, G4 = { class: "red fw-600" }, Y4 = { class: "ta-r mono-sm red fw-600" }, J4 = { class: "ta-r mono-sm" }, Z4 = {
  key: 1,
  class: "empty-msg"
}, X4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, s7 = { class: "ta-r mono-sm" }, t7 = { class: "ta-r mono-sm" }, e7 = { class: "ta-r mono-sm red fw-600" }, a7 = {
  key: 1,
  class: "empty-msg"
}, o7 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, l7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n7 = { class: "ta-r mono-sm" }, i7 = { class: "ta-r mono-sm" }, d7 = { class: "ta-r mono-sm" }, r7 = { class: "ta-r mono-sm fw-600" }, u7 = {
  key: 1,
  class: "empty-msg"
}, c7 = {
  key: 2,
  class: "empty-msg"
}, m7 = {
  key: 23,
  class: "books-card report-card bs-card"
}, v7 = { class: "bs-page-head" }, _7 = { class: "bs-page-head-actions" }, p7 = { class: "bs-asof" }, y7 = { class: "iws-export-wrap" }, b7 = ["disabled"], h7 = { class: "iws-menu" }, g7 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, k7 = ["onClick"], f7 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, w7 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, x7 = { class: "mis-summary-grid" }, C7 = { class: "mis-summary-card" }, S7 = { class: "mis-summary-val" }, j7 = { class: "mis-summary-card" }, M7 = { class: "mis-summary-val" }, D7 = { class: "mis-summary-card" }, T7 = { class: "mis-summary-val" }, O7 = { class: "mis-summary-card" }, R7 = { class: "mis-summary-val" }, P7 = { class: "mis-summary-card" }, I7 = { class: "mis-summary-val green" }, V7 = { class: "mis-summary-card" }, N7 = { class: "mis-summary-val red" }, E7 = { class: "mis-summary-card" }, q7 = { class: "mis-summary-val green" }, B7 = { class: "mis-summary-card" }, A7 = { class: "mis-summary-val red" }, $7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, L7 = { class: "badge badge-blue" }, Q7 = { class: "ta-r mono-sm fw-600" }, F7 = {
  key: 1,
  class: "empty-msg"
}, H7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, z7 = { class: "ta-r mono-sm fw-600" }, W7 = {
  key: 1,
  class: "empty-msg"
}, U7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, K7 = { class: "badge badge-blue" }, G7 = { class: "ta-r mono-sm fw-600" }, Y7 = {
  key: 1,
  class: "empty-msg"
}, J7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Z7 = { class: "ta-r mono-sm fw-600" }, X7 = {
  key: 1,
  class: "empty-msg"
}, s6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, t6 = { class: "ta-r mono-sm fw-600 green" }, e6 = {
  key: 1,
  class: "empty-msg"
}, a6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, o6 = { class: "red fw-600" }, l6 = { class: "badge badge-blue" }, n6 = { class: "ta-r mono-sm" }, i6 = {
  key: 1,
  class: "empty-msg"
}, d6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, r6 = { class: "badge badge-blue" }, u6 = { class: "ta-r mono-sm fw-600 green" }, c6 = {
  key: 1,
  class: "empty-msg"
}, m6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, v6 = { class: "ta-r mono-sm red fw-600" }, _6 = {
  key: 1,
  class: "empty-msg"
}, p6 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, y6 = { class: "mis-summary-card" }, b6 = { class: "mis-summary-val" }, h6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, g6 = { class: "badge badge-blue" }, k6 = { class: "ta-r mono-sm" }, f6 = { class: "ta-r mono-sm fw-600" }, w6 = {
  key: 1,
  class: "empty-msg"
}, x6 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, C6 = { class: "mis-summary-card" }, S6 = { class: "mis-summary-val" }, j6 = { class: "mis-summary-card" }, M6 = { class: "mis-summary-val" }, D6 = { class: "mis-summary-card" }, T6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, O6 = { class: "ta-r mono-sm" }, R6 = { class: "ta-r mono-sm" }, P6 = { class: "ta-r mono-sm" }, I6 = {
  key: 1,
  class: "empty-msg"
}, V6 = {
  key: 2,
  class: "empty-msg"
}, N6 = {
  key: 24,
  class: "books-card report-card bs-card"
}, E6 = { class: "bs-page-head" }, q6 = { class: "bs-page-head-actions" }, B6 = { class: "bs-asof" }, A6 = { class: "iws-export-wrap" }, $6 = ["disabled"], L6 = { class: "iws-menu" }, Q6 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, F6 = ["onClick"], H6 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, z6 = { class: "mis-summary-grid" }, W6 = { class: "mis-summary-card" }, U6 = { class: "mis-summary-val" }, K6 = { class: "mis-summary-card" }, G6 = { class: "mis-summary-val" }, Y6 = { class: "mis-summary-card" }, J6 = { class: "mis-summary-val" }, Z6 = { class: "mis-summary-card" }, X6 = { class: "mis-summary-card" }, s5 = { class: "mis-summary-card" }, t5 = { class: "mis-summary-val" }, e5 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a5 = { class: "ta-r mono-sm" }, o5 = { class: "ta-r mono-sm" }, l5 = { class: "ta-r mono-sm" }, n5 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, i5 = { class: "ta-r mono-sm" }, d5 = { class: "ta-r mono-sm" }, r5 = { class: "ta-r mono-sm" }, u5 = { class: "ta-r mono-sm" }, c5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, m5 = { class: "ta-r mono-sm" }, v5 = { class: "ta-r mono-sm" }, _5 = { class: "ta-r mono-sm" }, p5 = { key: 0 }, y5 = { class: "ta-r mono-sm" }, b5 = { class: "ta-r mono-sm" }, h5 = {
  key: 1,
  class: "empty-msg"
}, g5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, k5 = { class: "ta-r mono-sm" }, f5 = { class: "ta-r mono-sm" }, w5 = { class: "ta-r mono-sm" }, x5 = {
  key: 1,
  class: "empty-msg"
}, C5 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, S5 = { class: "ta-r mono-sm" }, j5 = { class: "ta-r mono-sm" }, M5 = { class: "ta-r mono-sm" }, D5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, T5 = { class: "ta-r mono-sm" }, O5 = { class: "ta-r mono-sm" }, R5 = { class: "ta-r mono-sm" }, P5 = {
  key: 1,
  class: "empty-msg"
}, I5 = {
  key: 2,
  class: "empty-msg"
}, V5 = {
  key: 25,
  class: "books-card report-card bs-card"
}, N5 = { class: "bs-page-head" }, E5 = { class: "bs-page-head-actions" }, q5 = { class: "bs-asof" }, B5 = { class: "iws-export-wrap" }, A5 = ["disabled"], $5 = { class: "iws-menu" }, L5 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Q5 = ["onClick"], F5 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, H5 = { class: "mis-summary-grid" }, z5 = { class: "mis-summary-card" }, W5 = { class: "mis-summary-val" }, U5 = { class: "mis-summary-card" }, K5 = { class: "mis-summary-val" }, G5 = { class: "mis-summary-card" }, Y5 = { class: "mis-summary-val" }, J5 = { class: "mis-summary-card" }, Z5 = { class: "mis-summary-val" }, X5 = { class: "mis-summary-card" }, sx = { class: "mis-summary-val" }, tx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ex = { class: "ta-r mono-sm" }, ax = { class: "ta-r mono-sm fw-600" }, ox = {
  key: 1,
  class: "empty-msg"
}, lx = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nx = { class: "ta-r mono-sm" }, ix = { class: "ta-r mono-sm fw-600" }, dx = { class: "ta-r mono-sm" }, rx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, ux = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, cx = { class: "ta-r mono-sm" }, mx = { class: "ta-r mono-sm" }, vx = {
  key: 1,
  class: "empty-msg"
}, _x = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, px = { class: "mis-summary-card" }, yx = { class: "mis-summary-val" }, bx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, hx = { class: "ta-r mono-sm" }, gx = { class: "ta-r mono-sm fw-600" }, kx = {
  key: 1,
  class: "empty-msg"
}, fx = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, wx = { class: "mis-summary-card" }, xx = { class: "mis-summary-val" }, Cx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Sx = { class: "ta-r mono-sm" }, jx = { class: "ta-r mono-sm fw-600" }, Mx = {
  key: 1,
  class: "empty-msg"
}, Dx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Tx = { class: "ta-r mono-sm" }, Ox = { class: "ta-r mono-sm fw-600" }, Rx = {
  key: 1,
  class: "empty-msg"
}, Px = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ix = { class: "ta-r mono-sm fw-600 red" }, Vx = { class: "ta-r mono-sm" }, Nx = { style: { "font-size": "11px", color: "#94a3b8" } }, Ex = {
  key: 1,
  class: "empty-msg"
}, qx = {
  key: 2,
  class: "empty-msg"
}, Bx = {
  key: 26,
  class: "books-card report-card bs-card"
}, Ax = { class: "bs-page-head" }, $x = { class: "bs-page-head-actions" }, Lx = { class: "bs-asof" }, Qx = { class: "iws-export-wrap" }, Fx = ["disabled"], Hx = { class: "iws-menu" }, zx = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Wx = ["onClick"], Ux = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Kx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Gx = { class: "mis-summary-grid" }, Yx = { class: "mis-summary-card" }, Jx = { class: "mis-summary-val" }, Zx = { class: "mis-summary-card" }, Xx = { class: "mis-summary-val red" }, s8 = { class: "mis-summary-card" }, t8 = { class: "mis-summary-val green" }, e8 = { class: "mis-summary-card" }, a8 = { class: "mis-summary-val" }, o8 = { class: "mis-summary-card" }, l8 = { class: "mis-summary-val" }, n8 = { class: "mis-summary-card" }, i8 = { class: "mis-summary-val" }, d8 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, r8 = { class: "ta-r mono-sm" }, u8 = { class: "ta-r mono-sm" }, c8 = { class: "ta-r mono-sm" }, m8 = { class: "ta-r mono-sm" }, v8 = { class: "ta-r mono-sm red" }, _8 = { class: "ta-r mono-sm fw-600" }, p8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, y8 = { class: "ta-r mono-sm red" }, b8 = { class: "ta-r mono-sm fw-600" }, h8 = {
  key: 1,
  class: "empty-msg"
}, g8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, k8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, f8 = { class: "ta-r mono-sm fw-600" }, w8 = {
  key: 1,
  class: "empty-msg"
}, x8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, C8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, S8 = { class: "ta-r mono-sm fw-600" }, j8 = {
  key: 1,
  class: "empty-msg"
}, M8 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, D8 = { class: "ta-r mono-sm" }, T8 = { class: "ta-r mono-sm fw-600" }, O8 = { class: "ta-r mono-sm" }, R8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, P8 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, I8 = { class: "ta-r mono-sm" }, V8 = {
  key: 2,
  class: "empty-msg"
}, N8 = {
  key: 27,
  class: "books-card report-card bs-card"
}, E8 = { class: "bs-page-head" }, q8 = { class: "bs-page-head-actions" }, B8 = { class: "bs-asof" }, A8 = { class: "iws-export-wrap" }, $8 = ["disabled"], L8 = { class: "iws-menu" }, Q8 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, F8 = ["onClick"], H8 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, z8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, W8 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, U8 = { class: "mis-summary-card" }, K8 = { class: "mis-summary-val" }, G8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Y8 = { class: "ta-r mono-sm" }, J8 = { class: "ta-r mono-sm fw-600" }, Z8 = {
  key: 1,
  class: "empty-msg"
}, X8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, s9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, t9 = { class: "mis-summary-card" }, e9 = { class: "mis-summary-val" }, a9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, o9 = { class: "ta-r mono-sm" }, l9 = { class: "ta-r mono-sm fw-600" }, n9 = {
  key: 1,
  class: "empty-msg"
}, i9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, d9 = { class: "mis-summary-card" }, r9 = { class: "mis-summary-val" }, u9 = { class: "mis-summary-card" }, c9 = { class: "mis-summary-val green" }, m9 = { class: "mis-summary-card" }, v9 = { class: "mis-summary-val red" }, _9 = { class: "mis-summary-card" }, p9 = { class: "mis-summary-val" }, y9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, b9 = { class: "ta-r mono-sm green" }, h9 = { class: "ta-r mono-sm red" }, g9 = { class: "ta-r mono-sm fw-600" }, k9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, f9 = { class: "mis-summary-card" }, w9 = { class: "mis-summary-val" }, x9 = { class: "mis-summary-card" }, C9 = { class: "mis-summary-val green" }, S9 = { class: "mis-summary-card" }, j9 = { class: "mis-summary-val red" }, M9 = { class: "mis-summary-card" }, D9 = { class: "mis-summary-val" }, T9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, O9 = { class: "ta-r mono-sm green" }, R9 = { class: "ta-r mono-sm red" }, P9 = { class: "ta-r mono-sm fw-600" }, I9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, V9 = { class: "mis-summary-card" }, N9 = { class: "mis-summary-val green" }, E9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, q9 = { class: "ta-r mono-sm fw-600 green" }, B9 = {
  key: 1,
  class: "empty-msg"
}, A9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, $9 = { class: "mis-summary-card" }, L9 = { class: "mis-summary-val red" }, Q9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, F9 = { class: "ta-r mono-sm fw-600 red" }, H9 = {
  key: 1,
  class: "empty-msg"
}, z9 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, W9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, U9 = { class: "ta-r mono-sm green" }, K9 = { class: "ta-r mono-sm red" }, G9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Y9 = { class: "mis-summary-card" }, J9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Z9 = { class: "red" }, X9 = { class: "ta-r mono-sm fw-600 red" }, sC = {
  key: 1,
  class: "empty-msg"
}, tC = {
  key: 2,
  class: "empty-msg"
}, eC = {
  key: 28,
  class: "books-card report-card bs-card"
}, aC = { class: "bs-page-head" }, oC = { class: "bs-page-head-actions" }, lC = { class: "bs-asof" }, nC = { class: "iws-export-wrap" }, iC = ["disabled"], dC = { class: "iws-menu" }, rC = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, uC = ["onClick"], cC = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, mC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, vC = { class: "mis-summary-card" }, _C = { class: "mis-summary-val" }, pC = { class: "mis-summary-card" }, yC = { class: "mis-summary-val" }, bC = { class: "mis-summary-card" }, hC = { class: "mis-summary-val green" }, gC = { class: "mis-summary-card" }, kC = { class: "mis-summary-val" }, fC = { class: "mis-summary-card" }, wC = { class: "mis-summary-val" }, xC = { class: "mis-summary-card" }, CC = { class: "mis-summary-val green" }, SC = { class: "mis-summary-card" }, jC = { class: "mis-summary-val red" }, MC = { class: "mis-summary-card" }, DC = { class: "mis-summary-val" }, TC = { class: "mis-summary-card" }, OC = { class: "mis-summary-val red" }, RC = { class: "mis-summary-card" }, PC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, IC = { class: "mis-summary-card" }, VC = { class: "mis-summary-val" }, NC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, EC = { class: "ta-r mono-sm" }, qC = { class: "ta-r mono-sm fw-600" }, BC = {
  key: 1,
  class: "empty-msg"
}, AC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, $C = { class: "mis-summary-card" }, LC = { class: "mis-summary-val" }, QC = { class: "mis-summary-card" }, FC = { class: "mis-summary-val green" }, HC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, zC = { class: "ta-r mono-sm" }, WC = { class: "ta-r mono-sm fw-600" }, UC = {
  key: 1,
  class: "empty-msg"
}, KC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, GC = { class: "mis-summary-card" }, YC = { class: "mis-summary-val" }, JC = { class: "mis-summary-card" }, ZC = { class: "mis-summary-val green" }, XC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, sS = { class: "ta-r mono-sm" }, tS = { class: "ta-r mono-sm fw-600" }, eS = {
  key: 1,
  class: "empty-msg"
}, aS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, oS = { class: "ta-r mono-sm" }, lS = { class: "ta-r mono-sm" }, nS = { class: "ta-r mono-sm" }, iS = { class: "ta-r mono-sm" }, dS = { class: "ta-r mono-sm fw-600" }, rS = { class: "ta-r mono-sm red" }, uS = { class: "ta-r mono-sm" }, cS = {
  key: 1,
  class: "empty-msg"
}, mS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, vS = { class: "mis-summary-card" }, _S = { class: "mis-summary-val red" }, pS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, yS = { class: "ta-r mono-sm" }, bS = { class: "ta-r mono-sm fw-600 red" }, hS = {
  key: 1,
  class: "empty-msg"
}, gS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, kS = { class: "mis-summary-card" }, fS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wS = { class: "ta-r mono-sm" }, xS = { class: "ta-r mono-sm" }, CS = { class: "ta-r mono-sm" }, SS = { class: "ta-r mono-sm" }, jS = {
  key: 1,
  class: "empty-msg"
}, MS = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, DS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, TS = { class: "mis-summary-card" }, OS = { class: "mis-summary-val" }, RS = { class: "mis-summary-card" }, PS = { class: "mis-summary-val green" }, IS = { class: "mis-summary-card" }, VS = { class: "mis-summary-val red" }, NS = { class: "mis-summary-card" }, ES = { class: "mis-summary-val" }, qS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, BS = {
  key: 1,
  class: "empty-msg"
}, AS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $S = { class: "ta-r mono-sm" }, LS = { class: "ta-r mono-sm fw-600" }, QS = {
  key: 1,
  class: "empty-msg"
}, FS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, HS = { class: "mis-summary-card" }, zS = { class: "mis-summary-val" }, WS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, US = { class: "ta-r mono-sm red" }, KS = { class: "ta-r mono-sm" }, GS = { class: "ta-r mono-sm" }, YS = {
  key: 1,
  class: "empty-msg"
}, JS = {
  key: 2,
  class: "empty-msg"
}, ZS = {
  key: 29,
  class: "books-card report-card bs-card"
}, XS = { class: "bs-page-head" }, sj = { class: "bs-page-head-actions" }, tj = { class: "bs-asof" }, ej = { class: "iws-export-wrap" }, aj = ["disabled"], oj = { class: "iws-menu" }, lj = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, nj = ["onClick"], ij = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, dj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, rj = { class: "mis-summary-card" }, uj = { class: "mis-summary-val" }, cj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, mj = { class: "ta-r mono-sm" }, vj = { class: "ta-r mono-sm" }, _j = { class: "ta-r mono-sm" }, pj = { class: "ta-r mono-sm" }, yj = { class: "ta-r mono-sm fw-600" }, bj = { class: "ta-r mono-sm red" }, hj = { class: "ta-r mono-sm" }, gj = {
  key: 1,
  class: "empty-msg"
}, kj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, fj = { class: "mis-summary-card" }, wj = { class: "mis-summary-val red" }, xj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Cj = { class: "ta-r mono-sm" }, Sj = { class: "ta-r mono-sm fw-600 red" }, jj = { class: "ta-r mono-sm red" }, Mj = {
  key: 1,
  class: "empty-msg"
}, Dj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Tj = { class: "ta-r mono-sm" }, Oj = { class: "ta-r mono-sm" }, Rj = { class: "ta-r mono-sm" }, Pj = { class: "ta-r mono-sm" }, Ij = { class: "ta-r mono-sm red" }, Vj = { class: "ta-r mono-sm fw-600" }, Nj = {
  key: 1,
  class: "empty-msg"
}, Ej = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, qj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Bj = { class: "ta-r mono-sm" }, Aj = { class: "ta-r mono-sm fw-600" }, $j = {
  key: 0,
  class: "pill pill-green"
}, Lj = {
  key: 1,
  class: "empty-msg"
}, Qj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Fj = { class: "ta-r mono-sm fw-600" }, Hj = { class: "ta-r mono-sm red" }, zj = { class: "ta-r mono-sm" }, Wj = { class: "ta-r mono-sm" }, Uj = { class: "ta-r mono-sm" }, Kj = {
  key: 1,
  class: "empty-msg"
}, Gj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Yj = { class: "mis-summary-card" }, Jj = { class: "mis-summary-val green" }, Zj = { class: "mis-summary-card" }, Xj = { class: "mis-summary-val" }, sM = { class: "mis-summary-card" }, tM = { class: "mis-summary-val red" }, eM = { class: "mis-summary-card" }, aM = { class: "mis-summary-val" }, oM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, lM = { class: "ta-r mono-sm" }, nM = { class: "ta-r mono-sm green" }, iM = { class: "ta-r mono-sm red" }, dM = { class: "ta-r mono-sm fw-600" }, rM = { class: "ta-r mono-sm" }, uM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, cM = {
  key: 2,
  class: "empty-msg"
}, mM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, vM = { class: "mis-summary-card" }, _M = { class: "mis-summary-val" }, pM = { class: "mis-summary-card" }, yM = { class: "mis-summary-val red" }, bM = { class: "mis-summary-card" }, hM = { class: "mis-summary-val red" }, gM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, kM = { class: "ta-r mono-sm" }, fM = { class: "ta-r mono-sm green" }, wM = { class: "ta-r mono-sm red" }, xM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, CM = { class: "ta-r mono-sm" }, SM = { class: "ta-r mono-sm green" }, jM = { class: "ta-r mono-sm red" }, MM = {
  key: 2,
  class: "empty-msg"
}, DM = {
  key: 2,
  class: "empty-msg"
}, TM = {
  key: 30,
  class: "books-card report-card bs-card"
}, OM = { class: "bs-page-head" }, RM = { class: "bs-page-head-actions" }, PM = { class: "bs-asof" }, IM = { class: "iws-export-wrap" }, VM = ["disabled"], NM = { class: "iws-menu" }, EM = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, qM = ["onClick"], BM = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, AM = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, $M = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, LM = { class: "ta-r mono-sm" }, QM = { class: "ta-r mono-sm" }, FM = { class: "ta-r mono-sm" }, HM = {
  key: 1,
  class: "empty-msg"
}, zM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, WM = { class: "mis-summary-card" }, UM = { class: "mis-summary-val" }, KM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, GM = { class: "ta-r mono-sm fw-600" }, YM = { style: { "font-size": "11.5px", color: "#64748b" } }, JM = {
  key: 1,
  class: "empty-msg"
}, ZM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, XM = { class: "mis-summary-card" }, sD = { class: "mis-summary-val green" }, tD = { class: "mis-summary-card" }, eD = { class: "mis-summary-val" }, aD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, oD = { class: "ta-r mono-sm" }, lD = { class: "ta-r mono-sm fw-600 green" }, nD = { class: "ta-r" }, iD = ["onUpdate:modelValue"], dD = {
  key: 1,
  class: "empty-msg"
}, rD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, uD = { class: "mis-summary-card" }, cD = { class: "mis-summary-val green" }, mD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, vD = { class: "ta-r mono-sm" }, _D = { class: "ta-r mono-sm fw-600 green" }, pD = {
  key: 1,
  class: "empty-msg"
}, yD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, bD = { class: "mis-summary-card" }, hD = { class: "mis-summary-val" }, gD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, kD = { class: "ta-r mono-sm" }, fD = { class: "ta-r mono-sm" }, wD = { class: "ta-r mono-sm fw-600" }, xD = { class: "ta-r mono-sm" }, CD = { class: "ta-r mono-sm" }, SD = {
  key: 1,
  class: "empty-msg"
}, jD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, MD = { class: "ta-r mono-sm" }, DD = { class: "ta-r mono-sm fw-600 red" }, TD = {
  key: 1,
  class: "empty-msg"
}, OD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, RD = { class: "mis-summary-card" }, PD = { class: "mis-summary-val red" }, ID = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, VD = { class: "ta-r mono-sm" }, ND = { class: "ta-r mono-sm fw-600" }, ED = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qD = { class: "ta-r mono-sm" }, BD = { class: "ta-r mono-sm" }, AD = { class: "ta-r mono-sm fw-600" }, $D = {
  key: 2,
  class: "empty-msg"
}, LD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, QD = { class: "ta-r mono-sm" }, FD = { class: "ta-r mono-sm" }, HD = { class: "ta-r mono-sm" }, zD = { class: "ta-r mono-sm" }, WD = { class: "ta-r mono-sm" }, UD = {
  key: 1,
  class: "empty-msg"
}, KD = {
  key: 2,
  class: "empty-msg"
}, GD = {
  __name: "Reports",
  setup(F) {
    const S = On, d = (i) => i != null ? "KES " + Number(i).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—", p = (i) => Number(i || 0).toLocaleString("en-US", { maximumFractionDigits: 0 }), H = (i) => Number(i || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function G(i) {
      const t = String(i || "").length;
      let n = 24;
      return t > 18 ? n = 15 : t > 15 ? n = 17 : t > 12 ? n = 19 : t > 10 && (n = 21), { fontSize: n + "px" };
    }
    const ls = /* @__PURE__ */ new Date(), x = v(new Date(ls.getFullYear(), ls.getMonth(), 1).toISOString().slice(0, 10)), y = v(ls.toISOString().slice(0, 10)), k = v("mrn_lpo"), js = {
      mrn_lpo: "mrn_vs_lpo",
      lpo_grn: "lpo_vs_grn",
      proj_summary: "project_summary",
      supp_analysis: "supplier_analysis",
      asset_reg: "asset_register"
    }, fs = v(""), Ve = v([]), zs = v([]), Gs = v({}), ol = V(() => !!Gs.value[k.value]), de = v(!1);
    let Da = 0;
    const Xt = v("");
    async function re() {
      const i = k.value, t = js[i];
      if (t) {
        Da++, de.value = !0, Xt.value = "";
        try {
          const n = i === "asset_reg" ? { from_date: x.value, to_date: y.value } : fs.value ? { project: fs.value } : {}, r = await K("psd_books.api.procurement_reports." + t, n), _ = Array.isArray(r) ? r : (r == null ? void 0 : r.message) || [];
          if (Gs.value = { ...Gs.value, [i]: { rows: _, project: fs.value } }, k.value === i && (zs.value = _), !Ve.value.length) {
            const j = await K("psd_books.api.procurement_reports.project_summary", {});
            Ve.value = (Array.isArray(j) ? j : (j == null ? void 0 : j.message) || []).map((M) => M.project);
          }
        } catch (n) {
          Gs.value = { ...Gs.value, [i]: { rows: [], project: fs.value } }, k.value === i && (Xt.value = n.message || "Failed to load report", zs.value = []);
        } finally {
          de.value = --Da > 0;
        }
      }
    }
    const ll = {
      asset_reg: ["item_code", "adjustment_qty", "closing_qty", "issued_qty"],
      supp_analysis: ["supplier", "billed_value"],
      proj_summary: ["project", "billed_value"],
      lpo_grn: ["supplier", "project", "billed_qty"],
      mrn_lpo: ["project"]
    }, Ta = { project_name: "Project" }, nl = ["mrn", "lpo", "supplier_name", "project", "project_name", "item_code", "item_name"], Oa = {
      mrn_lpo: "Search MRN, project, item code, item name",
      lpo_grn: "Search LPO, supplier, project, item",
      proj_summary: "Search project",
      asset_reg: "Search item code, item name"
    }, nt = v(""), Ra = V(() => !!Oa[k.value]), il = V(() => Oa[k.value] || "Search"), it = V(() => {
      const i = nt.value.trim().toLowerCase();
      if (!i || !Ra.value) return zs.value;
      const t = i.split(/\s+/);
      return zs.value.filter((n) => {
        const r = nl.map((_) => n[_] == null ? "" : String(n[_])).join(" ").toLowerCase();
        return t.every((_) => r.includes(_));
      });
    }), ue = V(() => {
      const i = zs.value[0];
      if (!i) return [];
      const t = ll[k.value] || [];
      return Object.keys(i).filter((n) => !t.includes(n));
    }), Pa = {
      mrn_lpo: ["MRN vs LPO", "How much of each material requisition has been ordered on LPOs"],
      lpo_grn: ["LPO vs GRN", "How much of each LPO has been received on goods receipts"],
      proj_summary: ["Project Summary", "Requisitions, LPOs, value received and billed for each project"],
      supp_analysis: ["Supplier Analysis", "LPOs, value and receipts for each supplier"],
      asset_reg: ["Asset Register", "Opening stock, purchases and total quantity of asset items"]
    }, dl = V(() => (Pa[k.value] || [""])[0]), rl = V(() => (Pa[k.value] || ["", ""])[1]), ul = { mrn: "MRN", lpo: "LPO", grn: "GRN", uom: "UOM" };
    function ce(i) {
      return Ta[i] ? Ta[i] : i.split("_").map((t) => ul[t] || t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
    }
    function Ia(i) {
      const t = zs.value[0];
      return !!t && typeof t[i] == "number";
    }
    function cl(i, t) {
      if (typeof i != "number") return i ?? "";
      const n = /_value$/.test(t);
      return i.toLocaleString("en-US", n ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 });
    }
    const w = v("");
    function es(i) {
      w.value = w.value === i ? "" : i;
    }
    let Ne = !1;
    function Y(i) {
      Ne = !0;
      try {
        i();
      } finally {
        Ne = !1;
      }
    }
    function Ws(i, t) {
      if (Ne) {
        const j = Ln(i);
        al(t.replace(/\.csv$/i, "") + ".xlsx", j[0] || [], j.slice(1));
        return;
      }
      const n = new Blob([i], { type: "text/csv;charset=utf-8" }), r = URL.createObjectURL(n), _ = document.createElement("a");
      _.href = r, _.download = t, _.click(), URL.revokeObjectURL(r);
    }
    const Bt = v(!1);
    function ml() {
      if (!it.value.length) return;
      const i = ue.value, t = i.map((r) => ce(r)), n = it.value.map((r) => i.map((_) => r[_]));
      al(js[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".xlsx", t, n);
    }
    function vl() {
      if (!it.value.length) return;
      const i = ue.value, t = (M) => {
        const N = M == null ? "" : String(M);
        return /[",\n]/.test(N) ? '"' + N.replace(/"/g, '""') + '"' : N;
      }, n = [i.map((M) => t(ce(M))).join(",")];
      for (const M of it.value) n.push(i.map((N) => t(M[N])).join(","));
      const r = new Blob([n.join(`
`)], { type: "text/csv;charset=utf-8" }), _ = URL.createObjectURL(r), j = document.createElement("a");
      j.href = _, j.download = js[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", j.click(), URL.revokeObjectURL(_);
    }
    Ma(k, (i) => {
      const t = Gs.value[i];
      Xt.value = "", nt.value = "", zs.value = t ? t.rows : [], t ? fs.value = t.project : re();
    }, { immediate: !0 }), Ma([x, y], () => {
      k.value !== "asset_reg" || !Gs.value.asset_reg || x.value && y.value && x.value > y.value || re();
    }), Ma(fs, () => {
      const i = Gs.value[k.value];
      js[k.value] && i && i.project !== fs.value && re();
    });
    const { data: as, loading: _l, execute: pl } = ie("psd_books.db.queries.get_profit_and_loss"), { data: ps, loading: yl, execute: bl } = ie("psd_books.db.queries.get_balance_sheet_totals"), { data: J, loading: hl, execute: gl } = ie("psd_books.db.queries.get_cash_flow"), { data: dt, loading: kl, execute: fl } = ie("psd_books.db.queries.get_gst_summary"), { data: Ys, loading: wl, execute: xl } = ie("psd_books.db.queries.get_trial_balance"), rt = v(!1), At = v(null), Js = v({ key: "", dir: "asc" });
    function me(i, t) {
      return (i || []).reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const ms = V(() => ({
      opening: me(Ys.value, "opening"),
      debit: me(Ys.value, "debit"),
      credit: me(Ys.value, "credit"),
      closing: me(Ys.value, "closing")
    })), ve = V(() => Math.abs(ms.value.debit - ms.value.credit) < 0.01), Ee = V(() => {
      const i = [...Ys.value || []], t = Js.value.key;
      if (!t) return i;
      const n = Js.value.dir === "desc" ? -1 : 1, r = (_) => t === "account" || t === "account_type" ? String(_[t] || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function $t(i) {
      Js.value.key === i ? Js.value = { key: i, dir: Js.value.dir === "asc" ? "desc" : "asc" } : Js.value = { key: i, dir: "asc" };
    }
    function Lt(i) {
      return Js.value.key !== i ? "" : Js.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const _e = ["Account", "Type", "Opening", "Debit", "Credit", "Closing"];
    function pe(i) {
      return [i.account, i.account_type, i.opening || 0, i.debit || 0, i.credit || 0, i.closing || 0];
    }
    function Cl() {
      var r;
      const i = Ee.value.map((_) => pe(_).join("	")), t = ms.value;
      i.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join("	"));
      const n = [_e.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function Sl(i) {
      var n;
      const t = [_e.join("	"), pe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function jl(i) {
      const t = [_e.join(","), pe(i).join(",")].join(`
`), n = String(i.account || "account").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "trial_balance_" + n + "_" + y.value + ".csv");
    }
    function Va() {
      var r;
      if (!((r = Ys.value) != null && r.length)) return;
      const i = Ee.value.map((_) => pe(_).join(",")), t = ms.value;
      i.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join(","));
      const n = [_e.join(","), ...i].join(`
`);
      gs(n, "trial_balance_" + y.value + ".csv");
    }
    const rs = v([]), us = v([]), ut = v(!1), Qt = v(null), Zs = v({ key: "", dir: "asc" });
    function ws(i, t) {
      return i.reduce((n, r) => n + Number(r[t] || 0), 0);
    }
    const Ms = V(() => ({
      current: ws(rs.value, "current"),
      days_1_30: ws(rs.value, "days_1_30"),
      days_31_60: ws(rs.value, "days_31_60"),
      days_61_90: ws(rs.value, "days_61_90"),
      days_90_plus: ws(rs.value, "days_90_plus"),
      total: ws(rs.value, "total")
    })), Na = V(() => {
      const i = [...rs.value || []], t = Zs.value.key;
      if (!t) return i;
      const n = Zs.value.dir === "desc" ? -1 : 1, r = (_) => t === "customer" ? String(_.customer_name || _.customer || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function ct(i) {
      Zs.value.key === i ? Zs.value = { key: i, dir: Zs.value.dir === "asc" ? "desc" : "asc" } : Zs.value = { key: i, dir: "asc" };
    }
    function mt(i) {
      return Zs.value.key !== i ? "" : Zs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function ye(i, t) {
      return [t ? i.customer_name || i.customer : i.supplier_name || i.supplier, i.current, i.days_1_30, i.days_31_60, i.days_61_90, i.days_90_plus, i.total];
    }
    function be(i) {
      return [i ? "Customer" : "Vendor", "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"];
    }
    function Ml() {
      var _;
      const i = be(!0), t = Na.value.map((j) => ye(j, !0).join("	")), n = Ms.value;
      t.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...t].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    function Ea(i, t) {
      var _;
      const r = [be(t).join("	"), ye(i, t).join("	")].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    function qa(i, t) {
      const r = [be(t).join(","), ye(i, t).join(",")].join(`
`), _ = String((t ? i.customer : i.supplier) || "party").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(r, (t ? "ar_aging_" : "ap_aging_") + _ + "_" + y.value + ".csv");
    }
    const vt = v(!1), Ft = v(null), Xs = v({ key: "", dir: "asc" }), Ds = V(() => ({
      current: ws(us.value, "current"),
      days_1_30: ws(us.value, "days_1_30"),
      days_31_60: ws(us.value, "days_31_60"),
      days_61_90: ws(us.value, "days_61_90"),
      days_90_plus: ws(us.value, "days_90_plus"),
      total: ws(us.value, "total")
    })), Ba = V(() => {
      const i = [...us.value || []], t = Xs.value.key;
      if (!t) return i;
      const n = Xs.value.dir === "desc" ? -1 : 1, r = (_) => t === "supplier" ? String(_.supplier_name || _.supplier || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function _t(i) {
      Xs.value.key === i ? Xs.value = { key: i, dir: Xs.value.dir === "asc" ? "desc" : "asc" } : Xs.value = { key: i, dir: "asc" };
    }
    function pt(i) {
      return Xs.value.key !== i ? "" : Xs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function Dl() {
      var _;
      const i = be(!1), t = Ba.value.map((j) => ye(j, !1).join("	")), n = Ds.value;
      t.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...t].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    const Ts = v([]), se = v([]), Tl = V(() => Math.max(
      ...se.value.flatMap((i) => [Math.abs(i.operating || 0), Math.abs(i.investing || 0), Math.abs(i.financing || 0)]),
      1
    ));
    function qe(i) {
      const n = Math.round(Math.abs(Number(i) || 0) / Tl.value * 60);
      return (Number(i) || 0) >= 0 ? { height: n + "px", bottom: "50%", top: "auto" } : { height: n + "px", top: "50%", bottom: "auto" };
    }
    function Ol(i, t) {
      if (!i || !t) return [];
      const n = new Date(i), r = new Date(t);
      if (isNaN(n) || isNaN(r) || n > r) return [];
      const _ = [];
      let j = new Date(n.getFullYear(), n.getMonth(), 1);
      for (; j <= r; ) {
        const M = new Date(j.getFullYear(), j.getMonth(), 1), N = new Date(j.getFullYear(), j.getMonth() + 1, 0), Es = M < n ? n : M, Et = N > r ? r : N;
        _.push({
          from: Es.toISOString().slice(0, 10),
          to: Et.toISOString().slice(0, 10),
          month: j.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }), j = new Date(j.getFullYear(), j.getMonth() + 1, 1);
      }
      return _;
    }
    function Aa() {
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
    const Rl = { CGST: "Central Goods and Services Tax", SGST: "State Goods and Services Tax", IGST: "Integrated Goods and Services Tax", UTGST: "Union Territory Goods and Services Tax" }, $a = ["gst-c-blue", "gst-c-emerald", "gst-c-cyan", "gst-c-amber", "gst-c-violet"], Pl = V(() => (dt.value || []).map((i, t) => ({
      ...i,
      desc: Rl[i.tax_type] || "Goods and Services Tax",
      cls: $a[t % $a.length]
    }))), La = V(() => (dt.value || []).reduce((i, t) => i + (Number(t.invoice_count) || 0), 0)), Qa = V(() => (dt.value || []).reduce((i, t) => i + (Number(t.total_tax) || 0), 0));
    function Fa() {
      var r;
      if (!((r = dt.value) != null && r.length)) return;
      const i = ["Tax Type", "Invoice Count", "Total Tax"].join(","), t = dt.value.map((_) => [_.tax_type, _.invoice_count, _.total_tax].join(","));
      t.push(["Total", La.value, Qa.value].join(","));
      const n = [i, ...t].join(`
`);
      Ws(n, "gst_summary_" + y.value + ".csv");
    }
    const Be = v(!1), Ae = v(!1), Ha = v(!1), za = v(!1), As = v([]), $e = v(!1), Wa = v(!1), $s = v([]), Le = v(!1), Ua = v(!1), cs = v([]), Qe = v(!1), Ka = v(!1), ds = v([]), Fe = v(!1), Ga = v(!1), Os = v(/* @__PURE__ */ new Set()), He = v(!1), ze = v(!1), ns = v(null);
    async function Ya(i) {
      He.value = !0, ze.value = !0, ns.value = null;
      try {
        ns.value = await K("psd_books.db.queries.get_invoice_profit_detail", { invoice: i });
      } catch {
        ns.value = null;
      }
      ze.value = !1;
    }
    const ss = v(null), We = v(!1), Ja = v(!1), yt = v(!1), te = v(null), Ht = v(null), zt = v({ key: "", dir: "asc" }), bt = v({ key: "", dir: "asc" });
    function Il(i, t, n) {
      const r = t.key;
      if (!r) return i;
      const _ = t.dir === "desc" ? -1 : 1, j = (M) => n.includes(r) ? String(M[r] || "").toLowerCase() : Number(M[r] || 0);
      return [...i].sort((M, N) => {
        const Es = j(M), Et = j(N);
        return typeof Es == "string" ? _ * Es.localeCompare(Et) : _ * (Es - Et);
      });
    }
    const Za = V(() => {
      var i;
      return Il(((i = ss.value) == null ? void 0 : i.accounts) || [], zt.value, ["account"]);
    });
    function he(i) {
      zt.value = zt.value.key === i ? { key: i, dir: zt.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function ge(i) {
      return zt.value.key !== i ? "" : zt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ue = V(() => {
      var _;
      const i = [...((_ = ss.value) == null ? void 0 : _.items) || []], t = bt.value.key;
      if (!t) return i;
      const n = bt.value.dir === "desc" ? -1 : 1, r = (j) => t === "item" ? String(j.item_name || j.item_code || "").toLowerCase() : t === "warehouse" ? String(j.warehouse || "").toLowerCase() : Number(j[t] || 0);
      return i.sort((j, M) => {
        const N = r(j), Es = r(M);
        return typeof N == "string" ? n * N.localeCompare(Es) : n * (N - Es);
      }), i;
    });
    function ee(i) {
      bt.value = bt.value.key === i ? { key: i, dir: bt.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function ae(i) {
      return bt.value.key !== i ? "" : bt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ke = V(() => {
      var i;
      return (((i = ss.value) == null ? void 0 : i.items) || []).reduce((t, n) => t + Number(n.stock_value || 0), 0);
    }), Xa = ["Inventory Account", "Bin Stock Value", "GL Balance", "Difference", "Status"];
    function so(i) {
      return [i.account, i.bin_stock_value, i.gl_balance, i.difference, i.is_reconciled ? "OK" : "DRIFT"];
    }
    function Vl(i) {
      var n;
      const t = [Xa.join("	"), so(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Nl() {
      var n, r;
      if (!((r = (n = ss.value) == null ? void 0 : n.accounts) != null && r.length)) return;
      const i = Za.value.map((_) => so(_).join(",")), t = [Xa.join(","), ...i].join(`
`);
      gs(t, "stock_vs_gl_accounts_" + y.value + ".csv");
    }
    const ke = ["Item", "Warehouse", "Qty", "Valuation Rate", "Stock Value"];
    function fe(i) {
      return [i.item_name || i.item_code, i.warehouse, i.actual_qty, i.valuation_rate, i.stock_value];
    }
    function El(i) {
      var n;
      const t = [ke.join("	"), fe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function ql() {
      var n;
      const i = Ue.value.map((r) => fe(r).join("	"));
      i.push(["Total", "", "", "", Ke.value].join("	"));
      const t = [ke.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function Bl(i) {
      const t = [ke.join(","), fe(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_") + "_" + String(i.warehouse || "").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "stock_vs_gl_item_" + n + ".csv");
    }
    function Al() {
      var n, r;
      if (!((r = (n = ss.value) == null ? void 0 : n.items) != null && r.length)) return;
      const i = Ue.value.map((_) => fe(_).join(","));
      i.push(["Total", "", "", "", Ke.value].join(","));
      const t = [ke.join(","), ...i].join(`
`);
      gs(t, "stock_vs_gl_items_" + y.value + ".csv");
    }
    const xs = v(null), Ge = v(!1), to = v(!1), oe = v(null), Ye = v(!1), eo = v(!1), Je = v(""), we = v(""), xe = V(() => {
      var t;
      const i = Je.value.trim().toLowerCase();
      return (((t = oe.value) == null ? void 0 : t.rows) || []).filter(
        (n) => (!we.value || n.warehouse === we.value) && (!i || (n.item_code || "").toLowerCase().includes(i) || (n.item_name || "").toLowerCase().includes(i))
      );
    }), Z = v(null), Ze = v(!1), ao = v(!1), R = v(null), Xe = v(!1), oo = v(!1), ys = v("summary"), ht = v(0), $l = [
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
    ], lo = V(
      () => {
        var i, t;
        return ht.value ? (((t = (i = R.value) == null ? void 0 : i.summary) == null ? void 0 : t.grand_total) || 0) / ht.value * 100 : 0;
      }
    ), I = v(null), sa = v(!1), no = v(!1), Rs = v("total"), gt = v(0), Ll = [
      { key: "total", label: "Total Receivables" },
      { key: "outstanding", label: "Customer Outstanding" },
      { key: "ageing", label: "Ageing" },
      { key: "coll_target", label: "Collection Target vs Achievement" },
      { key: "daily_coll", label: "Daily Collection" },
      { key: "overdue", label: "Overdue Collection" },
      { key: "credit", label: "Credit Limit & Utilisation" },
      { key: "efficiency", label: "Collection Efficiency" }
    ], io = V(
      () => {
        var i, t;
        return gt.value ? (((t = (i = I.value) == null ? void 0 : i.daily_collection) == null ? void 0 : t.total) || 0) / gt.value * 100 : 0;
      }
    ), q = v(null), ta = v(!1), ro = v(!1), Ps = v("summary"), kt = v(0), Ql = [
      { key: "summary", label: "Purchase Summary" },
      { key: "supplier", label: "Supplier-wise" },
      { key: "product", label: "Product-wise" },
      { key: "target", label: "Target / Budget vs Actual" },
      { key: "price_variance", label: "Price Variance" },
      { key: "pending_po", label: "Pending Purchase Orders" },
      { key: "pending_receipts", label: "Pending Material Receipts" },
      { key: "returns", label: "Purchase Return" }
    ], uo = V(
      () => {
        var i, t;
        return kt.value ? (((t = (i = q.value) == null ? void 0 : i.summary) == null ? void 0 : t.grand_total) || 0) / kt.value * 100 : 0;
      }
    ), O = v(null), ea = v(!1), co = v(!1), bs = v("current_stock"), Fl = [
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
    ], T = v(null), aa = v(!1), mo = v(!1), hs = v("plan_vs_actual"), Hl = [
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
    ], A = v(null), oa = v(!1), vo = v(!1), Cs = v("sales"), zl = [
      { key: "sales", label: "Product-wise Sales" },
      { key: "profit", label: "Product-wise Profit" },
      { key: "cost", label: "Product-wise Cost" },
      { key: "margin", label: "Product-wise Margin %" },
      { key: "production", label: "Product-wise Production" },
      { key: "stock", label: "Product-wise Stock" },
      { key: "wastage", label: "Product-wise Wastage" },
      { key: "top_selling", label: "Top Selling Products" },
      { key: "low_selling", label: "Low Selling Products" }
    ], z = v(null), la = v(!1), _o = v(!1), Us = v("summary"), Wl = [
      { key: "summary", label: "Dispatch Summary" },
      { key: "pending_dispatch", label: "Pending Dispatch" },
      { key: "delivery_pending", label: "Delivery Pending" },
      { key: "delayed_delivery", label: "Delayed Delivery" },
      { key: "customer_pending", label: "Customer-wise Pending Delivery" },
      { key: "transport_wise", label: "Transport-wise Dispatch" }
    ], B = v(null), na = v(!1), po = v(!1), vs = v("summary"), Ul = [
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
    ], W = v(null), ia = v(!1), yo = v(!1), Ls = v("summary"), Kl = [
      { key: "summary", label: "Summary" },
      { key: "product", label: "Product-wise Profit" },
      { key: "customer", label: "Customer-wise Profit" },
      { key: "order", label: "Order-wise Profit" },
      { key: "branch", label: "Branch-wise Profit" },
      { key: "salesperson", label: "Salesperson-wise Profit" },
      { key: "monthly_trend", label: "Monthly Profit Trend" }
    ], U = v(null), da = v(!1), bo = v(!1), Is = v("summary"), Gl = [
      { key: "summary", label: "Total Expenses" },
      { key: "department", label: "Department-wise" },
      { key: "category", label: "Expense Category-wise" },
      { key: "budget", label: "Budget vs Actual" },
      { key: "fixed", label: "Fixed Expenses" },
      { key: "variable", label: "Variable Expenses" },
      { key: "trend", label: "Expense Trend" },
      { key: "unusual", label: "Unusual / Excess" }
    ], X = v(null), ra = v(!1), ho = v(!1), Qs = v("summary"), Yl = [
      { key: "summary", label: "Supplier Outstanding" },
      { key: "ageing", label: "Payable Ageing" },
      { key: "overdue", label: "Overdue Payables" },
      { key: "due_week", label: "Due This Week" },
      { key: "due_month", label: "Due This Month" },
      { key: "supplier", label: "Supplier-wise Outstanding" },
      { key: "forecast", label: "Payment Due Forecast" }
    ], E = v(null), ua = v(!1), go = v(!1), Vs = v("cash_position"), Jl = [
      { key: "cash_position", label: "Cash Position" },
      { key: "bank_balance", label: "Bank Balance" },
      { key: "daily_cash", label: "Daily Cash Flow" },
      { key: "daily_bank", label: "Daily Bank Movement" },
      { key: "receipts", label: "Receipts" },
      { key: "payments", label: "Payments" },
      { key: "forecast", label: "Cash Forecast" },
      { key: "fund_requirement", label: "Fund Requirement" }
    ], D = v(null), ca = v(!1), ko = v(!1), Ss = v("new_customers"), Zl = [
      { key: "new_customers", label: "New Customers" },
      { key: "active_customers", label: "Active Customers" },
      { key: "repeat_customers", label: "Repeat Customers" },
      { key: "customer_wise_sales", label: "Customer-wise Sales" },
      { key: "customer_wise_outstanding", label: "Customer-wise Outstanding" },
      { key: "customer_wise_profit", label: "Customer-wise Profit" },
      { key: "customer_retention", label: "Customer Retention" },
      { key: "top_customers", label: "Top Customers" },
      { key: "inactive_customers", label: "Inactive Customers" }
    ], $ = v(null), ma = v(!1), fo = v(!1), Fs = v("supplier_wise_purchase"), Xl = [
      { key: "supplier_wise_purchase", label: "Supplier-wise Purchase" },
      { key: "supplier_outstanding", label: "Supplier Outstanding" },
      { key: "supplier_payment_ageing", label: "Supplier Payment Ageing" },
      { key: "purchase_price_comparison", label: "Purchase Price Comparison" },
      { key: "supplier_performance", label: "Supplier Performance" },
      { key: "delivery_performance", label: "Delivery Performance" },
      { key: "quality_rejection", label: "Quality / Rejection" }
    ], L = v(null), va = v(!1), wo = v(!1), Ns = v("employee_attendance"), sn = [
      { key: "employee_attendance", label: "Employee Attendance" },
      { key: "department_manpower", label: "Department-wise Manpower" },
      { key: "salesperson_target", label: "Salesperson Target vs Achievement" },
      { key: "salesperson_collection", label: "Salesperson Collection" },
      { key: "production_productivity", label: "Production Employee Productivity" },
      { key: "overtime", label: "Overtime" },
      { key: "labour_cost", label: "Labour Cost" },
      { key: "employee_performance", label: "Employee Performance" }
    ], Wt = v({});
    function _a(i) {
      const t = Wt.value[i.sales_person];
      return t ? Number(i.total_amount) / t * 100 : 0;
    }
    function xo() {
      const i = ["Section", "Line", "Amount"].join(","), t = [];
      Co.value.forEach((r) => {
        t.push([r.label, "", r.total].join(",")), r.items.forEach((_) => t.push([r.label, _.label, _.value].join(",")));
      });
      const n = [i, ...t].join(`
`);
      Ws(n, "balance_sheet_" + y.value + ".csv");
    }
    const pa = V(() => {
      if (!ps.value) return !1;
      const i = Number(ps.value.total_assets) || 0, t = Number(ps.value.total_liabilities) || 0, n = Number(ps.value.total_equity) || 0;
      return Math.abs(i - (t + n)) < 1;
    }), Ce = v({ assets: !0, liabilities: !0, equity: !0 });
    function tn(i) {
      Ce.value[i] = !Ce.value[i];
    }
    const Co = V(() => {
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
    }), So = V(() => Math.max(...Ts.value.flatMap((i) => [i.income || 0, i.expense || 0]), 1));
    function jo(i) {
      return Math.round(Math.max(0, i) / So.value * 130);
    }
    const en = V(() => {
      const i = So.value;
      return [i, i * 0.66, i * 0.33, 0].map((t) => Math.round(t));
    });
    function P(i) {
      return i ? (/* @__PURE__ */ new Date(i + "T00:00:00")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    }
    const Ut = v("monthly");
    function ya(i, t) {
      return t == null || i == null ? null : t === 0 ? i === 0 ? 0 : null : (i - t) / Math.abs(t) * 100;
    }
    const ft = V(() => Ts.value.length > 1 ? Ts.value[Ts.value.length - 2] : null), wt = V(() => Ts.value.length ? Ts.value[Ts.value.length - 1] : null), Mo = V(() => wt.value && ft.value ? ya(wt.value.income, ft.value.income) : null), Do = V(() => wt.value && ft.value ? ya(wt.value.expense, ft.value.expense) : null), To = V(() => !wt.value || !ft.value ? null : ya((wt.value.income || 0) - (wt.value.expense || 0), (ft.value.income || 0) - (ft.value.expense || 0)));
    function ba(i, t) {
      if (i === null) return "muted";
      if (i === 0) return "neutral";
      const n = i > 0;
      return (t ? !n : n) ? "up" : "down";
    }
    function ha(i) {
      return i === null || i === 0 ? "— No change" : `${i > 0 ? "↑" : "↓"} ${Math.abs(Math.round(i))}% vs previous period`;
    }
    const an = V(() => {
      if (!as.value) return [];
      const i = [];
      return Number(as.value.total_expense) > Number(as.value.total_income) && i.push({ icon: "↗", tone: "warn", title: "Expenses are higher", desc: "Your expenses are higher than income in this period." }), Number(as.value.net_profit) < 0 ? i.push({ icon: "↘", tone: "loss", title: "Net loss", desc: `You had a net loss of ${S(Math.abs(as.value.net_profit))} in the selected period.` }) : Number(as.value.net_profit) > 0 && i.push({ icon: "↗", tone: "good", title: "Net profit", desc: `You made a net profit of ${S(as.value.net_profit)} in the selected period.` }), i;
    }), xt = V(() => cs.value.filter((i) => i.cost_rate).reduce((i, t) => i + Number(t.profit || 0), 0)), Se = V(() => {
      const i = cs.value.filter((r) => r.cost_rate), t = i.reduce((r, _) => r + Number(_.revenue || 0), 0), n = i.reduce((r, _) => r + Number(_.profit || 0), 0);
      return t !== 0 ? n / t * 100 : 0;
    }), Kt = V(() => cs.value.filter((i) => !i.cost_rate).length), Ct = v(!1), Gt = v(null), st = v({ key: "", dir: "asc" }), ga = V(() => {
      const i = [...cs.value || []], t = st.value.key;
      if (!t) return i;
      const n = st.value.dir === "desc" ? -1 : 1, r = (_) => t === "item" ? String(_.item_name || _.item_code || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function St(i) {
      st.value.key === i ? st.value = { key: i, dir: st.value.dir === "asc" ? "desc" : "asc" } : st.value = { key: i, dir: "asc" };
    }
    function jt(i) {
      return st.value.key !== i ? "" : st.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const je = ["Item", "Qty Sold", "Revenue", "Cost Rate", "Total Cost", "Profit", "Margin %"];
    function Me(i) {
      return [i.item_name || i.item_code, i.qty_sold, i.revenue, i.cost_rate, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function on() {
      var n;
      const i = ga.value.map((r) => Me(r).join("	")), t = [je.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function ln(i) {
      var n;
      const t = [je.join("	"), Me(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function nn(i) {
      const t = [je.join(","), Me(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "profit_wise_report_" + n + "_" + x.value + "_to_" + y.value + ".csv");
    }
    const Mt = V(
      () => ds.value.filter((i) => Os.value.has(i.invoice))
    ), Oo = V(
      () => ds.value.length > 0 && Os.value.size === ds.value.length
    );
    function dn(i) {
      const t = new Set(Os.value);
      t.has(i) ? t.delete(i) : t.add(i), Os.value = t;
    }
    function rn() {
      Os.value = Oo.value ? /* @__PURE__ */ new Set() : new Set(ds.value.map((i) => i.invoice));
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
    })), Dt = v(!1), Tt = v(null), tt = v({ key: "", dir: "asc" }), ka = V(() => {
      const i = [...ds.value || []], t = tt.value.key;
      if (!t) return i;
      const n = tt.value.dir === "desc" ? -1 : 1, r = (_) => t === "invoice" || t === "posting_date" ? String(_[t] || "") : t === "customer" ? String(_.customer_name || _.customer || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function Ot(i) {
      tt.value.key === i ? tt.value = { key: i, dir: tt.value.dir === "asc" ? "desc" : "asc" } : tt.value = { key: i, dir: "asc" };
    }
    function Rt(i) {
      return tt.value.key !== i ? "" : tt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const De = ["Invoice", "Date", "Customer", "Revenue", "Est. Cost", "Profit", "Margin %"];
    function Te(i) {
      return [i.invoice, i.posting_date, i.customer_name || i.customer, i.revenue, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function un() {
      var n;
      const i = (Os.value.size ? Mt.value : ka.value).map((r) => Te(r).join("	")), t = [De.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function cn(i) {
      var n;
      const t = [De.join("	"), Te(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function mn(i) {
      const t = [De.join(","), Te(i).join(",")].join(`
`);
      gs(t, "invoice_profitability_" + i.invoice + ".csv");
    }
    async function vn() {
      if (js[k.value]) {
        await re();
        return;
      }
      if (!["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) && x.value && y.value && x.value > y.value) {
        alert("From date cannot be after To date.");
        return;
      }
      const t = await Dn(), n = { company: t, from_date: x.value || "", to_date: y.value || "" };
      if (k.value === "pl") {
        await pl(n);
        try {
          Ts.value = await K("psd_books.db.queries.get_pl_monthly_breakdown", n) || [];
        } catch {
          Ts.value = [];
        }
      }
      if (k.value === "bs" && await bl({ company: t, as_of_date: y.value }), k.value === "cf") {
        await gl(n);
        try {
          const r = Ol(x.value, y.value), _ = await Promise.all(r.map(
            (j) => K("psd_books.db.queries.get_cash_flow", { company: t, from_date: j.from, to_date: j.to })
          ));
          se.value = r.map((j, M) => ({ month: j.month, ..._[M] || {} }));
        } catch {
          se.value = [];
        }
      }
      if (k.value === "gst" && await fl(n), k.value === "tb" && await xl(n), k.value === "ar") {
        Be.value = !0, Ha.value = !0;
        try {
          rs.value = await K("psd_books.db.queries.get_ar_aging", { company: t, as_of_date: y.value }) || [];
        } catch {
          rs.value = [];
        }
        Be.value = !1;
      }
      if (k.value === "ap") {
        Ae.value = !0, za.value = !0;
        try {
          us.value = await K("psd_books.db.queries.get_ap_aging", { company: t, as_of_date: y.value }) || [];
        } catch {
          us.value = [];
        }
        Ae.value = !1;
      }
      if (k.value === "items") {
        $e.value = !0, Wa.value = !0;
        try {
          As.value = await K("psd_books.db.queries.get_item_wise_sales", n) || [];
        } catch {
          As.value = [];
        }
        $e.value = !1;
      }
      if (k.value === "customers") {
        Le.value = !0, Ua.value = !0;
        try {
          $s.value = await K("psd_books.db.queries.get_customer_wise_sales", n) || [];
        } catch {
          $s.value = [];
        }
        Le.value = !1;
      }
      if (k.value === "profit") {
        Qe.value = !0, Ka.value = !0;
        try {
          cs.value = await K("psd_books.db.queries.get_profit_wise_report", n) || [];
        } catch {
          cs.value = [];
        }
        Qe.value = !1;
      }
      if (k.value === "invoice_profit") {
        Fe.value = !0, Ga.value = !0, Os.value = /* @__PURE__ */ new Set();
        try {
          ds.value = await K("psd_books.db.queries.get_invoice_wise_profit", n) || [];
        } catch {
          ds.value = [];
        }
        Fe.value = !1;
      }
      if (k.value === "stockgl") {
        We.value = !0, Ja.value = !0;
        try {
          ss.value = await K("psd_books.db.queries.get_inventory_reconciliation", { company: t }) || null;
        } catch {
          ss.value = null;
        }
        We.value = !1;
      }
      if (k.value === "stockval") {
        Ge.value = !0, to.value = !0;
        try {
          xs.value = await K("psd_books.api.inventory.get_stock_valuation_report", { as_of_date: y.value }) || null;
        } catch {
          xs.value = null;
        }
        Ge.value = !1;
      }
      if (k.value === "price_mrp") {
        Ye.value = !0, eo.value = !0;
        try {
          oe.value = await K("psd_books.api.inventory.get_selling_mrp_report", {}) || null;
        } catch {
          oe.value = null;
        }
        Ye.value = !1;
      }
      if (k.value === "mis") {
        Ze.value = !0, ao.value = !0;
        try {
          Z.value = await K("psd_books.db.queries.get_daily_business_mis", n) || null;
        } catch {
          Z.value = null;
        }
        Ze.value = !1;
      }
      if (k.value === "sales_mis") {
        Xe.value = !0, oo.value = !0;
        try {
          R.value = await K("psd_books.db.queries.get_sales_mis", n) || null;
        } catch {
          R.value = null;
        }
        Xe.value = !1;
      }
      if (k.value === "receivables") {
        sa.value = !0, no.value = !0;
        try {
          I.value = await K("psd_books.db.queries.get_receivables_mis", n) || null;
        } catch {
          I.value = null;
        }
        sa.value = !1;
      }
      if (k.value === "purchase_mis") {
        ta.value = !0, ro.value = !0;
        try {
          q.value = await K("psd_books.db.queries.get_purchase_mis", n) || null;
        } catch {
          q.value = null;
        }
        ta.value = !1;
      }
      if (k.value === "inventory_mis") {
        ea.value = !0, co.value = !0;
        try {
          O.value = await K("psd_books.db.queries.get_inventory_mis", n) || null;
        } catch {
          O.value = null;
        }
        ea.value = !1;
      }
      if (k.value === "production_mis") {
        aa.value = !0, mo.value = !0;
        try {
          T.value = await K("psd_books.db.queries.get_production_mis", n) || null;
        } catch {
          T.value = null;
        }
        aa.value = !1;
      }
      if (k.value === "product_mis") {
        oa.value = !0, vo.value = !0;
        try {
          A.value = await K("psd_books.db.queries.get_product_mis", n) || null;
        } catch {
          A.value = null;
        }
        oa.value = !1;
      }
      if (k.value === "dispatch_mis") {
        la.value = !0, _o.value = !0;
        try {
          z.value = await K("psd_books.db.queries.get_dispatch_delivery_mis", n) || null;
        } catch {
          z.value = null;
        }
        la.value = !1;
      }
      if (k.value === "order_mis") {
        na.value = !0, po.value = !0;
        try {
          B.value = await K("psd_books.db.queries.get_order_mis", n) || null;
        } catch {
          B.value = null;
        }
        na.value = !1;
      }
      if (k.value === "profitability_mis") {
        ia.value = !0, yo.value = !0;
        try {
          W.value = await K("psd_books.db.queries.get_profitability_mis", n) || null;
        } catch {
          W.value = null;
        }
        ia.value = !1;
      }
      if (k.value === "expense_mis") {
        da.value = !0, bo.value = !0;
        try {
          U.value = await K("psd_books.db.queries.get_expense_mis", n) || null;
        } catch {
          U.value = null;
        }
        da.value = !1;
      }
      if (k.value === "payables_mis") {
        ra.value = !0, ho.value = !0;
        try {
          X.value = await K("psd_books.db.queries.get_payables_mis", { company: t, as_of_date: y.value }) || null;
        } catch {
          X.value = null;
        }
        ra.value = !1;
      }
      if (k.value === "cash_bank_mis") {
        ua.value = !0, go.value = !0;
        try {
          E.value = await K("psd_books.db.queries.get_cash_bank_mis", n) || null;
        } catch {
          E.value = null;
        }
        ua.value = !1;
      }
      if (k.value === "customer_mis") {
        ca.value = !0, ko.value = !0;
        try {
          D.value = await K("psd_books.db.queries.get_customer_mis", n) || null;
        } catch {
          D.value = null;
        }
        ca.value = !1;
      }
      if (k.value === "supplier_mis") {
        ma.value = !0, fo.value = !0;
        try {
          $.value = await K("psd_books.db.queries.get_supplier_mis", n) || null;
        } catch {
          $.value = null;
        }
        ma.value = !1;
      }
      if (k.value === "employee_mis") {
        va.value = !0, wo.value = !0;
        try {
          L.value = await K("psd_books.db.queries.get_employee_mis", n) || null;
        } catch {
          L.value = null;
        }
        va.value = !1;
      }
    }
    const Pt = v(!1), Jt = v(null), et = v({ key: "", dir: "asc" }), Hs = V(() => (As.value || []).reduce((i, t) => ({
      invoices: i.invoices + (Number(t.invoice_count) || 0),
      qty: i.qty + (Number(t.qty_sold) || 0),
      discount: i.discount + (Number(t.total_discount) || 0),
      amount: i.amount + (Number(t.total_amount) || 0)
    }), { invoices: 0, qty: 0, discount: 0, amount: 0 })), fa = V(() => {
      const i = [...As.value || []], t = et.value.key;
      if (!t) return i;
      const n = et.value.dir === "desc" ? -1 : 1, r = (_) => t === "item" ? String(_.item_name || _.item_code || "").toLowerCase() : t === "uom" ? String(_.uom || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function It(i) {
      et.value.key === i ? et.value = { key: i, dir: et.value.dir === "asc" ? "desc" : "asc" } : et.value = { key: i, dir: "asc" };
    }
    function Vt(i) {
      return et.value.key !== i ? "" : et.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Oe = ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Discount", "Total Amount"];
    function Re(i) {
      return [i.item_name || i.item_code, i.uom || "", i.invoice_count, i.qty_sold, i.avg_rate, i.total_discount || 0, i.total_amount];
    }
    function gs(i, t) {
      Ws(i, t);
    }
    function _n() {
      var r;
      const i = fa.value.map((_) => Re(_).join("	")), t = Hs.value;
      i.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join("	"));
      const n = [Oe.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function pn(i) {
      var n;
      const t = [Oe.join("	"), Re(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function yn(i) {
      const t = [Oe.join(","), Re(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "item_wise_sales_" + n + "_" + x.value + "_to_" + y.value + ".csv");
    }
    function wa() {
      var r;
      if (!((r = As.value) != null && r.length)) return;
      const i = fa.value.map((_) => Re(_).join(",")), t = Hs.value;
      i.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join(","));
      const n = [Oe.join(","), ...i].join(`
`);
      gs(n, "item_wise_sales_" + x.value + "_to_" + y.value + ".csv");
    }
    const Nt = v(!1), Zt = v(null), at = v({ key: "", dir: "asc" }), _s = V(() => ($s.value || []).reduce((i, t) => ({
      invoices: i.invoices + (Number(t.invoice_count) || 0),
      net: i.net + (Number(t.net_total) || 0),
      discount: i.discount + (Number(t.total_discount) || 0),
      tax: i.tax + (Number(t.total_tax) || 0),
      outstanding: i.outstanding + (Number(t.outstanding_amount) || 0),
      amount: i.amount + (Number(t.total_amount) || 0)
    }), { invoices: 0, net: 0, discount: 0, tax: 0, outstanding: 0, amount: 0 })), xa = V(() => {
      const i = [...$s.value || []], t = at.value.key;
      if (!t) return i;
      const n = at.value.dir === "desc" ? -1 : 1, r = (_) => t === "customer" ? String(_.customer_name || _.customer || "").toLowerCase() : Number(_[t] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function ot(i) {
      at.value.key === i ? at.value = { key: i, dir: at.value.dir === "asc" ? "desc" : "asc" } : at.value = { key: i, dir: "asc" };
    }
    function lt(i) {
      return at.value.key !== i ? "" : at.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Pe = ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Avg Invoice", "Outstanding", "Total Amount"];
    function Ie(i) {
      return [i.customer_name || i.customer, i.invoice_count, i.net_total, i.total_discount || 0, i.total_tax, i.avg_invoice_value, i.outstanding_amount || 0, i.total_amount];
    }
    function bn() {
      var r;
      const i = xa.value.map((_) => Ie(_).join("	")), t = _s.value;
      i.push(["Total", t.invoices, t.net, t.discount, t.tax, "", t.outstanding, t.amount].join("	"));
      const n = [Pe.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function hn(i) {
      var n;
      const t = [Pe.join("	"), Ie(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(t);
    }
    function gn(i) {
      const t = [Pe.join(","), Ie(i).join(",")].join(`
`), n = String(i.customer || i.customer_name || "customer").replace(/[^A-Za-z0-9_-]+/g, "_");
      gs(t, "customer_wise_sales_" + n + "_" + x.value + "_to_" + y.value + ".csv");
    }
    function Ca() {
      var _;
      if (!((_ = $s.value) != null && _.length)) return;
      const i = Pe.join(","), t = xa.value.map((j) => Ie(j).join(",")), n = _s.value;
      t.push(["Total", n.invoices, n.net, n.discount, n.tax, "", n.outstanding, n.amount].join(","));
      const r = [i, ...t].join(`
`);
      Ws(r, "customer_wise_sales_" + x.value + "_to_" + y.value + ".csv");
    }
    function Sa() {
      var n;
      if (!((n = cs.value) != null && n.length)) return;
      const i = ga.value.map((r) => Me(r).join(",")), t = [je.join(","), ...i].join(`
`);
      gs(t, "profit_wise_report_" + x.value + "_to_" + y.value + ".csv");
    }
    function ja() {
      var r;
      if (!((r = ds.value) != null && r.length)) return;
      const t = (Mt.value.length ? Mt.value : ka.value).map((_) => Te(_).join(",")), n = [De.join(","), ...t].join(`
`);
      gs(n, "invoice_profitability_" + x.value + "_to_" + y.value + ".csv");
    }
    function Ro() {
      var _, j;
      const i = ["Warehouse", "Stock Value", "% of Total"].join(","), t = ((_ = xs.value) == null ? void 0 : _.grand_total) || 0, n = (((j = xs.value) == null ? void 0 : j.by_warehouse) || []).map(
        (M) => [M.warehouse, M.stock_value, t ? (M.stock_value / t * 100).toFixed(1) : "0"].join(",")
      ), r = [i, ...n].join(`
`);
      Ws(r, "stock_valuation_summary_" + y.value + ".csv");
    }
    function Po() {
      const i = (t) => '"' + String(t ?? "").replace(/"/g, '""') + '"';
      h(
        ["Item Code", "Item Name", "Warehouse", "Stock Qty", "UOM", "Selling Price", "MRP"],
        xe.value.map((t) => [i(t.item_code), i(t.item_name), i(t.warehouse), t.qty, i(t.uom), t.selling_price, t.mrp].join(",")),
        "selling_price_mrp_" + y.value + ".csv"
      );
    }
    function Io() {
      var r;
      const i = ["Date", "Sales", "Collection", "Purchase", "Expenses", "Dispatch Qty", "Production Qty", "Stock In", "Stock Out", "Outstanding"].join(","), t = (((r = Z.value) == null ? void 0 : r.days) || []).map(
        (_) => [_.date, _.sales_amount, _.collection_amount, _.purchase_amount, _.expense_amount, _.dispatch_qty, _.production_qty, _.stock_inward_qty, _.stock_outward_qty, _.outstanding].join(",")
      ), n = [i, ...t].join(`
`);
      Ws(n, "daily_business_mis_" + x.value + "_to_" + y.value + ".csv");
    }
    function h(i, t, n) {
      const r = [i.join(","), ...t].join(`
`);
      Ws(r, n);
    }
    function Vo() {
      if (!R.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = ys.value;
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
    function No() {
      if (!I.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Rs.value;
      t === "ageing" ? h(
        ["Customer", "0-30", "31-60", "61-90", "90+", "Total"],
        I.value.ageing.map((n) => [n.customer_name || n.customer, n.days_0_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "receivables_ageing_" + y.value + ".csv"
      ) : t === "daily_coll" ? h(
        ["Date", "Payments", "Amount"],
        I.value.daily_collection.days.map((n) => [n.date, n.count, n.amount].join(",")),
        "receivables_daily_collection_" + i
      ) : t === "overdue" ? h(
        ["Invoice", "Customer", "Due Date", "Overdue Days", "Outstanding"],
        I.value.overdue.rows.map((n) => [n.invoice, n.customer_name || n.customer, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "receivables_overdue_" + y.value + ".csv"
      ) : t === "credit" ? h(
        ["Customer", "Credit Limit", "Outstanding", "Utilisation %"],
        I.value.credit_utilisation.map((n) => [n.customer_name || n.customer, n.credit_limit || 0, n.outstanding_amount, n.utilisation_pct != null ? n.utilisation_pct.toFixed(1) : ""].join(",")),
        "receivables_credit_utilisation_" + y.value + ".csv"
      ) : h(
        ["Customer", "Open Invoices", "Oldest Due Date", "Outstanding"],
        I.value.customer_outstanding.map((n) => [n.customer_name || n.customer, n.invoice_count, n.oldest_due_date || "", n.outstanding_amount].join(",")),
        "receivables_customer_outstanding_" + y.value + ".csv"
      );
    }
    function Eo() {
      if (!q.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Ps.value;
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
          "purchase_mis_pending_po_" + y.value + ".csv"
        );
      else if (t === "pending_receipts")
        h(
          ["Purchase Order", "Date", "Supplier", "Status", "Ordered Qty", "Received Qty", "Pending Qty"],
          q.value.pending_material_receipts.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.ordered_qty, n.received_qty || 0, n.pending_qty].join(",")),
          "purchase_mis_pending_receipts_" + y.value + ".csv"
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
    function qo() {
      if (!O.value) return;
      const i = y.value + ".csv", t = bs.value;
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
        "inventory_mis_fast_moving_" + x.value + "_to_" + y.value + ".csv"
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
        "inventory_mis_stock_adjustment_" + x.value + "_to_" + y.value + ".csv"
      ) : t === "loss" && h(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty Lost", "Value Lost", "Reason"],
        O.value.stock_loss.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_loss_" + x.value + "_to_" + y.value + ".csv"
      );
    }
    function Bo() {
      if (!T.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = hs.value;
      t === "plan_vs_actual" ? h(
        ["Production Plan", "Date", "Item", "Planned Qty", "Produced Qty", "Variance", "Variance %"],
        T.value.plan_vs_actual.rows.map((n) => [n.production_plan, n.posting_date, n.item_name || n.item_code, n.planned_qty, n.produced_qty, n.variance_qty, n.variance_pct ?? ""].join(",")),
        "production_mis_plan_vs_actual_" + i
      ) : t === "pending" ? h(
        ["Work Order", "Item", "Status", "Qty", "Produced", "Pending", "Planned End"],
        T.value.production_pending.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.qty, n.produced_qty, n.pending_qty, n.planned_end_date || ""].join(",")),
        "production_mis_pending_" + y.value + ".csv"
      ) : t === "wip" ? h(
        ["Work Order", "Item", "Qty", "Produced", "% Complete", "WIP Warehouse", "WIP Value"],
        T.value.wip_status.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.qty, n.produced_qty, n.pct_complete, n.wip_warehouse || "", n.wip_stock_value].join(",")),
        "production_mis_wip_" + y.value + ".csv"
      ) : t === "material_availability" ? h(
        ["Work Order", "Item", "Warehouse", "Still to Issue", "Available", "Shortage"],
        T.value.raw_material_availability.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.warehouse, n.still_to_issue, n.available_qty, n.shortage_qty].join(",")),
        "production_mis_material_availability_" + y.value + ".csv"
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
    function Ao() {
      if (!A.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Cs.value;
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
        "product_mis_stock_" + y.value + ".csv"
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
    function $o() {
      if (!z.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Us.value;
      t === "pending_dispatch" ? h(
        ["Sales Order", "Order Date", "Customer", "Item", "Ordered Qty", "Pending Qty", "Pending Value"],
        z.value.pending_dispatch.rows.map((n) => [n.sales_order, n.order_date, n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_pending_dispatch_" + y.value + ".csv"
      ) : t === "delivery_pending" ? h(
        ["Sales Order", "Delivery Date", "Customer", "Item", "Ordered Qty", "Dispatched Qty", "Pending Qty"],
        z.value.delivery_pending.rows.map((n) => [n.sales_order, n.delivery_date || "", n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.delivered_qty, n.pending_qty].join(",")),
        "dispatch_mis_delivery_pending_" + y.value + ".csv"
      ) : t === "delayed_delivery" ? h(
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Item", "Pending Qty", "Pending Value"],
        z.value.delayed_delivery.rows.map((n) => [n.sales_order, n.delivery_date, n.days_overdue, n.customer_name || n.customer, n.item_name || n.item_code, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_delayed_delivery_" + y.value + ".csv"
      ) : t === "customer_pending" ? h(
        ["Customer", "Orders", "Pending Qty", "Pending Value"],
        z.value.customer_wise_pending_delivery.rows.map((n) => [n.customer_name || n.customer, n.order_count, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_customer_pending_" + y.value + ".csv"
      ) : t === "transport_wise" && h(
        ["Transporter", "Dispatches", "Customers", "Total Qty", "Total Value"],
        z.value.transport_wise_dispatch.rows.map((n) => [n.transporter_name, n.dispatch_count, n.customer_count, n.total_qty, n.total_value].join(",")),
        "dispatch_mis_transport_wise_" + i
      );
    }
    function Lo() {
      if (!B.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = vs.value, n = (r, _, j, M) => {
        h(_, B.value.summary[r].rows.map(j), "order_mis_" + M + "_" + i);
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
    function Qo() {
      if (!W.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Ls.value;
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
    function Fo() {
      if (!U.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Is.value;
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
    function Ho() {
      if (!X.value) return;
      const i = y.value + ".csv", t = Qs.value;
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
    function zo() {
      if (!E.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Vs.value;
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
    function Wo() {
      if (!D.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Ss.value, n = (r) => r.customer_name || r.customer;
      t === "new_customers" ? h(
        ["Customer", "First Invoice Date", "Invoices in Period", "Revenue in Period"],
        D.value.new_customers.rows.map((r) => [n(r), r.first_invoice_date, r.invoice_count, r.total_amount].join(",")),
        "customer_mis_new_customers_" + i
      ) : t === "active_customers" ? h(
        ["Customer", "Invoices", "Revenue", "First Invoice", "Last Invoice"],
        D.value.active_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount, r.first_invoice_in_period, r.last_invoice_in_period].join(",")),
        "customer_mis_active_customers_" + i
      ) : t === "repeat_customers" ? h(
        ["Customer", "Invoices", "Revenue"],
        D.value.repeat_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_repeat_customers_" + i
      ) : t === "customer_wise_sales" ? h(
        ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        D.value.customer_wise_sales.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "customer_mis_customer_wise_sales_" + i
      ) : t === "customer_wise_outstanding" ? h(
        ["Customer", "Invoices", "Outstanding", "Oldest Due Date", "Max Overdue Days"],
        D.value.customer_wise_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.oldest_due_date, r.max_overdue_days].join(",")),
        "customer_mis_customer_wise_outstanding_" + i
      ) : t === "customer_wise_profit" ? h(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        D.value.customer_wise_profit.rows.map((r) => [n(r), r.invoice_count, r.revenue, r.total_cost, r.profit, Number(r.margin_pct).toFixed(1)].join(",")),
        "customer_mis_customer_wise_profit_" + i
      ) : t === "customer_retention" ? h(
        ["Customer", "Status"],
        D.value.customer_retention.rows.map((r) => [n(r), r.status].join(",")),
        "customer_mis_customer_retention_" + i
      ) : t === "top_customers" ? h(
        ["Rank", "Customer", "Invoices", "Revenue"],
        D.value.top_customers.rows.map((r, _) => [_ + 1, n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_top_customers_" + i
      ) : t === "inactive_customers" && h(
        ["Customer", "Last Invoice Date", "Days Inactive", "Lifetime Invoices", "Lifetime Revenue"],
        D.value.inactive_customers.rows.map((r) => [n(r), r.last_invoice_date, r.days_inactive, r.invoice_count, r.lifetime_revenue].join(",")),
        "customer_mis_inactive_customers_" + i
      );
    }
    function Uo() {
      if (!$.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Fs.value, n = (r) => r.supplier_name || r.supplier;
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
    function Ko() {
      if (!L.value) return;
      const i = x.value + "_to_" + y.value + ".csv", t = Ns.value, n = (r) => r.sales_person_name || r.sales_person;
      t === "employee_attendance" ? h(
        ["Employee", "Present Days", "Period Days", "Attendance %", "Total Hours", "Avg Hrs/Day"],
        L.value.employee_attendance.rows.map((r) => [r.employee, r.present_days, r.period_days, r.attendance_pct, r.total_hours, r.avg_hours_per_day].join(",")),
        "employee_mis_attendance_" + i
      ) : t === "department_manpower" ? h(
        ["Department", "Headcount", "Employees"],
        L.value.department_manpower.rows.map((r) => [r.department, r.headcount, '"' + r.employees.map((_) => _.sales_person_name).join("; ") + '"'].join(",")),
        "employee_mis_department_manpower_" + i
      ) : t === "salesperson_target" ? h(
        ["Salesperson", "Invoices", "Achieved", "Target", "Achievement %"],
        L.value.salesperson_achievement.rows.map((r) => [n(r), r.invoice_count, r.total_amount, Wt.value[r.sales_person] || "", Wt.value[r.sales_person] ? _a(r).toFixed(1) : ""].join(",")),
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
    function ne() {
      const i = k.value === "ar", t = i ? rs.value : us.value, n = i ? "Customer" : "Vendor", r = i ? "customer_name" : "supplier_name", _ = [n, "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"].join(","), j = t.map(
        (N) => [N[r] || N[i ? "customer" : "supplier"], N.current, N.days_1_30, N.days_31_60, N.days_61_90, N.days_90_plus, N.total].join(",")
      ), M = [_, ...j].join(`
`);
      Ws(M, (i ? "ar_aging" : "ap_aging") + "_" + y.value + ".csv");
    }
    const kn = [
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
    ], fn = ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg"], wn = kn.filter((i) => fn.includes(i.key)), Go = ["c-blue", "c-slate", "c-cyan", "c-amber", "c-pink", "c-slate", "c-emerald", "c-violet", "c-blue", "c-blue"];
    function xn(i) {
      return Go[i % Go.length];
    }
    return (i, t) => {
      var n, r, _, j, M, N, Es, Et, Yo, Jo, Zo, Xo, sl;
      return l(), o("div", Fn, [
        t[839] || (t[839] = C('<div class="reports-header" data-v-bfa37a0c><div data-v-bfa37a0c><p class="reports-subtitle" data-v-bfa37a0c>Get detailed insights into your business performance</p></div><div class="reports-header-right" data-v-bfa37a0c><div class="reports-header-icons" data-v-bfa37a0c><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="10" width="4" height="10" rx="1" data-v-bfa37a0c></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-bfa37a0c></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-bfa37a0c></rect></svg><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><circle cx="12" cy="12" r="9" data-v-bfa37a0c></circle><path d="M12 3v9l7 3" data-v-bfa37a0c></path></svg></div></div></div>', 1)),
        s("div", Hn, [
          (l(!0), o(u, null, m(f(wn), (e, g) => (l(), o("button", {
            key: e.key,
            class: c(["report-card", [xn(g), { active: k.value === e.key }]]),
            onClick: (Q) => k.value = e.key
          }, [
            s("span", {
              class: "report-card-icon",
              innerHTML: e.icon
            }, null, 8, Wn),
            s("span", Un, a(e.label), 1)
          ], 10, zn))), 128))
        ]),
        s("div", Kn, [
          ["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) ? (l(), o(u, { key: 0 }, [
            t[210] || (t[210] = s("span", { class: "dr-icon" }, "📅", -1)),
            t[211] || (t[211] = s("label", { class: "dr-label" }, "As of Date", -1)),
            qs(s("input", {
              type: "date",
              "onUpdate:modelValue": t[0] || (t[0] = (e) => y.value = e),
              class: "dr-input"
            }, null, 512), [
              [Ks, y.value]
            ])
          ], 64)) : (l(), o(u, { key: 1 }, [
            t[212] || (t[212] = s("span", { class: "dr-icon" }, "📅", -1)),
            t[213] || (t[213] = s("label", { class: "dr-label" }, "Date Range", -1)),
            qs(s("input", {
              type: "date",
              "onUpdate:modelValue": t[1] || (t[1] = (e) => x.value = e),
              class: "dr-input"
            }, null, 512), [
              [Ks, x.value]
            ]),
            t[214] || (t[214] = s("span", { class: "dr-to" }, "To", -1)),
            qs(s("input", {
              type: "date",
              "onUpdate:modelValue": t[2] || (t[2] = (e) => y.value = e),
              class: "dr-input"
            }, null, 512), [
              [Ks, y.value]
            ])
          ], 64)),
          js[k.value] ? b("", !0) : (l(), o("button", {
            key: 2,
            class: "books-btn books-btn-primary",
            onClick: vn
          }, "▷ Run Report")),
          t[215] || (t[215] = s("span", { class: "dr-spacer" }, null, -1)),
          ["ar", "ap"].includes(k.value) && (rs.value.length || us.value.length) ? (l(), o("button", {
            key: 3,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ne
          }, " Export CSV ")) : b("", !0),
          k.value === "items" && As.value.length ? (l(), o("button", {
            key: 4,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: wa
          }, " Export CSV ")) : b("", !0),
          k.value === "customers" && $s.value.length ? (l(), o("button", {
            key: 5,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Ca
          }, " Export CSV ")) : b("", !0),
          k.value === "profit" && cs.value.length ? (l(), o("button", {
            key: 6,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Sa
          }, " Export CSV ")) : b("", !0),
          k.value === "invoice_profit" && ds.value.length ? (l(), o("button", {
            key: 7,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ja
          }, " Export CSV ")) : b("", !0)
        ]),
        ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg"].includes(k.value) ? (l(), o("div", Gn, [
          s("div", Yn, [
            t[219] || (t[219] = C('<div class="bs-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="3" y="3" width="18" height="18" rx="2" data-v-bfa37a0c></rect><line x1="3" y1="9" x2="21" y2="9" data-v-bfa37a0c></line><line x1="9" y1="21" x2="9" y2="9" data-v-bfa37a0c></line></svg></div>', 1)),
            s("div", Jn, [
              s("div", Zn, a(dl.value), 1),
              s("div", Xn, a(rl.value), 1)
            ]),
            s("div", si, [
              Ra.value ? (l(), o("div", ti, [
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
                qs(s("input", {
                  "onUpdate:modelValue": t[3] || (t[3] = (e) => nt.value = e),
                  type: "text",
                  class: "dr-input proc-search-input",
                  placeholder: il.value
                }, null, 8, ei), [
                  [Ks, nt.value]
                ]),
                nt.value ? (l(), o("button", {
                  key: 0,
                  type: "button",
                  class: "proc-search-clear",
                  title: "Clear",
                  onClick: t[4] || (t[4] = (e) => nt.value = "")
                }, "×")) : b("", !0)
              ])) : b("", !0),
              k.value !== "asset_reg" ? qs((l(), o("select", {
                key: 1,
                "onUpdate:modelValue": t[5] || (t[5] = (e) => fs.value = e),
                class: "dr-input"
              }, [
                t[217] || (t[217] = s("option", { value: "" }, "All projects", -1)),
                (l(!0), o(u, null, m(Ve.value, (e) => (l(), o("option", {
                  key: e,
                  value: e
                }, a(e), 9, ai))), 128))
              ], 512)), [
                [tl, fs.value]
              ]) : b("", !0),
              s("div", oi, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[6] || (t[6] = (e) => Bt.value = !Bt.value),
                  disabled: !it.value.length
                }, [...t[218] || (t[218] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, li),
                Bt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[7] || (t[7] = (e) => Bt.value = !1)
                  }),
                  s("div", ni, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[8] || (t[8] = (e) => {
                        Bt.value = !1, vl();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[9] || (t[9] = (e) => {
                        Bt.value = !1, ml();
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          !ol.value && !de.value ? (l(), o("div", ii, "Run the report to see results.")) : de.value ? (l(), o("div", di)) : Xt.value ? (l(), o("div", ri, a(Xt.value), 1)) : zs.value.length && !it.value.length ? (l(), o("div", ui, 'No rows match "' + a(nt.value) + '".', 1)) : zs.value.length ? (l(), o("div", ci, [
            s("div", mi, [
              s("table", vi, [
                s("thead", null, [
                  s("tr", null, [
                    (l(!0), o(u, null, m(ue.value, (e) => (l(), o("th", {
                      key: e,
                      class: c({ "ta-r": Ia(e) })
                    }, a(ce(e)), 3))), 128))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(it.value, (e, g) => (l(), o("tr", { key: g }, [
                    (l(!0), o(u, null, m(ue.value, (Q) => (l(), o("td", {
                      key: Q,
                      "data-label": ce(Q),
                      class: c({ "ta-r": Ia(Q) })
                    }, a(cl(e[Q], Q)), 11, _i))), 128))
                  ]))), 128))
                ])
              ])
            ])
          ])) : (l(), o("div", pi, "No rows for this report."))
        ])) : b("", !0),
        k.value === "pl" ? (l(), o("div", yi, [
          s("div", bi, [
            t[222] || (t[222] = C('<div class="pl-dash-title" data-v-bfa37a0c><span class="pl-dash-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="10" width="4" height="10" rx="1" data-v-bfa37a0c></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-bfa37a0c></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-bfa37a0c></rect></svg></span><div data-v-bfa37a0c><div class="pl-dash-h" data-v-bfa37a0c>Profit &amp; Loss</div><div class="pl-dash-sub" data-v-bfa37a0c>Overview of your income, expenses and profitability</div></div></div>', 1)),
            s("div", hi, [
              t[220] || (t[220] = C('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="4" width="18" height="18" rx="2" data-v-bfa37a0c></rect><line x1="3" y1="10" x2="21" y2="10" data-v-bfa37a0c></line><line x1="8" y1="2" x2="8" y2="6" data-v-bfa37a0c></line><line x1="16" y1="2" x2="16" y2="6" data-v-bfa37a0c></line></svg>', 1)),
              os(" " + a(P(x.value)) + " - " + a(P(y.value)) + " ", 1),
              t[221] || (t[221] = s("span", { class: "pl-dash-range-caret" }, "▾", -1))
            ])
          ]),
          f(_l) ? (l(), o("div", gi)) : f(as) ? (l(), o(u, { key: 1 }, [
            s("div", ki, [
              s("div", fi, [
                t[223] || (t[223] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "🪙"),
                  s("span", { class: "pl-kpi-label" }, "Total Income")
                ], -1)),
                s("div", wi, a(f(S)(f(as).total_income)), 1),
                s("div", {
                  class: c(["pl-kpi-trend", ba(Mo.value)])
                }, a(ha(Mo.value)), 3)
              ]),
              f(as).cogs ? (l(), o("div", xi, [
                t[224] || (t[224] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "🛒"),
                  s("span", { class: "pl-kpi-label" }, "Cost of Goods Sold")
                ], -1)),
                s("div", Ci, a(f(S)(f(as).cogs)), 1),
                t[225] || (t[225] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : b("", !0),
              f(as).cogs ? (l(), o("div", Si, [
                t[226] || (t[226] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📊"),
                  s("span", { class: "pl-kpi-label" }, "Gross Profit")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", f(as).gross_profit >= 0 ? "green" : "red"])
                }, a(f(S)(f(as).gross_profit)), 3),
                t[227] || (t[227] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : b("", !0),
              s("div", ji, [
                t[228] || (t[228] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📄"),
                  s("span", { class: "pl-kpi-label" }, "Total Expense")
                ], -1)),
                s("div", Mi, a(f(S)(f(as).total_expense)), 1),
                s("div", {
                  class: c(["pl-kpi-trend", ba(Do.value, !0)])
                }, a(ha(Do.value)), 3)
              ]),
              f(as).stock_adjustment ? (l(), o("div", Di, [
                t[229] || (t[229] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📦"),
                  s("span", { class: "pl-kpi-label" }, "Stock Adjustment")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", f(as).stock_adjustment > 0 ? "red" : "green"])
                }, a(f(S)(f(as).stock_adjustment)), 3),
                t[230] || (t[230] = s("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : b("", !0),
              s("div", {
                class: c(["pl-kpi", f(as).net_profit >= 0 ? "c-emerald" : "c-pink"])
              }, [
                t[231] || (t[231] = s("div", { class: "pl-kpi-top" }, [
                  s("span", { class: "pl-kpi-icon" }, "📈"),
                  s("span", { class: "pl-kpi-label" }, "Net Profit")
                ], -1)),
                s("div", {
                  class: c(["pl-kpi-val", f(as).net_profit >= 0 ? "green" : "red"])
                }, a(f(S)(f(as).net_profit)), 3),
                s("div", {
                  class: c(["pl-kpi-trend", ba(To.value)])
                }, a(ha(To.value)), 3)
              ], 2)
            ]),
            Ts.value.length ? (l(), o("div", Ti, [
              s("div", Oi, [
                t[232] || (t[232] = C('<div class="pl-dash-title" data-v-bfa37a0c><span class="pl-dash-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="10" width="4" height="10" rx="1" data-v-bfa37a0c></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-bfa37a0c></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-bfa37a0c></rect></svg></span><div data-v-bfa37a0c><div class="pl-dash-h" style="font-size:14px;" data-v-bfa37a0c>Monthly Trend</div><div class="pl-dash-sub" data-v-bfa37a0c>Income vs Expense over the selected period</div></div></div>', 1)),
                s("div", Ri, [
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
              s("div", Pi, [
                s("div", Ii, [
                  s("div", Vi, [
                    (l(!0), o(u, null, m(en.value, (e) => (l(), o("span", { key: e }, "KES " + a(p(e)), 1))), 128))
                  ]),
                  s("div", Ni, [
                    (l(!0), o(u, null, m(Ts.value, (e) => (l(), o("div", {
                      key: e.month,
                      class: "pl-trend-col"
                    }, [
                      s("div", Ei, [
                        s("div", {
                          class: "pl-trend-bar income",
                          style: Bs({ height: jo(e.income) + "px" }),
                          title: "Income: KES " + p(e.income)
                        }, null, 12, qi),
                        s("div", {
                          class: "pl-trend-bar expense",
                          style: Bs({ height: jo(e.expense) + "px" }),
                          title: "Expense: KES " + p(e.expense)
                        }, null, 12, Bi)
                      ]),
                      s("div", Ai, a(e.month.slice(5)), 1)
                    ]))), 128))
                  ])
                ]),
                s("div", $i, [
                  t[233] || (t[233] = s("div", { class: "pl-insights-title" }, "💡 Insights", -1)),
                  (l(!0), o(u, null, m(an.value, (e, g) => (l(), o("div", {
                    key: g,
                    class: "pl-insight-item"
                  }, [
                    s("span", {
                      class: c(["pl-insight-icon", e.tone])
                    }, a(e.icon), 3),
                    s("div", null, [
                      s("div", Li, a(e.title), 1),
                      s("div", Qi, a(e.desc), 1)
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
            ])) : b("", !0)
          ], 64)) : (l(), o("div", Fi, "Run the report to see results."))
        ])) : b("", !0),
        k.value === "bs" ? (l(), o("div", Hi, [
          s("div", zi, [
            t[236] || (t[236] = C('<div class="bs-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><path d="M12 2 3 6v2h18V6z" data-v-bfa37a0c></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-bfa37a0c></path><path d="M3 20h18" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Balance Sheet</div><div class="bs-page-head-sub" data-v-bfa37a0c>What the business owns and owes</div></div>', 2)),
            s("div", Wi, [
              s("div", Ui, "As of " + a(P(y.value)), 1),
              s("div", Ki, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[13] || (t[13] = (e) => es("exportBsCSV")),
                  disabled: !f(ps)
                }, [...t[235] || (t[235] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Gi),
                w.value === "exportBsCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[14] || (t[14] = (e) => w.value = "")
                  }),
                  s("div", Yi, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[15] || (t[15] = (e) => {
                        w.value = "", xo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[16] || (t[16] = (e) => {
                        w.value = "", Y(xo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          f(yl) ? (l(), o("div", Ji)) : f(ps) ? (l(), o(u, { key: 1 }, [
            s("div", Zi, [
              s("div", Xi, [
                t[238] || (t[238] = C('<div class="bs-kpi-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><ellipse cx="12" cy="5" rx="8" ry="3" data-v-bfa37a0c></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-bfa37a0c></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-bfa37a0c></path></svg></div>', 1)),
                s("div", sd, [
                  t[237] || (t[237] = s("div", { class: "bs-kpi-label" }, "Total Assets", -1)),
                  s("div", td, a(f(S)(f(ps).total_assets)), 1)
                ])
              ]),
              s("div", ed, [
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
                s("div", ad, [
                  t[239] || (t[239] = s("div", { class: "bs-kpi-label" }, "Total Liabilities", -1)),
                  s("div", od, a(f(S)(f(ps).total_liabilities)), 1)
                ])
              ]),
              s("div", ld, [
                t[242] || (t[242] = C('<div class="bs-kpi-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="12" width="4" height="9" data-v-bfa37a0c></rect><rect x="10" y="7" width="4" height="14" data-v-bfa37a0c></rect><rect x="17" y="3" width="4" height="18" data-v-bfa37a0c></rect></svg></div>', 1)),
                s("div", nd, [
                  t[241] || (t[241] = s("div", { class: "bs-kpi-label" }, "Total Equity", -1)),
                  s("div", id, a(f(S)(f(ps).total_equity)), 1)
                ])
              ])
            ]),
            s("div", {
              class: c(["bs-sum-status", pa.value ? "bs-ok" : "bs-bad"])
            }, [
              s("span", dd, a(pa.value ? "✓" : "✕"), 1),
              s("div", rd, [
                s("div", ud, a(pa.value ? "Assets = Liabilities + Equity" : "Balance sheet out of balance"), 1),
                s("div", cd, a(f(S)(f(ps).total_assets)) + " = " + a(f(S)(f(ps).total_liabilities)) + " + " + a(f(S)(f(ps).total_equity)), 1)
              ])
            ], 2),
            s("div", md, [
              (l(!0), o(u, null, m(Co.value, (e) => (l(), o("div", {
                key: e.key,
                class: c(["bs-acc-group", e.cls])
              }, [
                s("div", {
                  class: "bs-acc-head",
                  onClick: (g) => tn(e.key)
                }, [
                  s("div", {
                    class: "bs-acc-icon",
                    innerHTML: e.icon
                  }, null, 8, _d),
                  s("div", pd, [
                    s("div", yd, a(e.label), 1),
                    s("div", bd, a(e.desc), 1)
                  ]),
                  s("div", hd, a(f(S)(e.total)), 1),
                  s("div", {
                    class: c(["bs-acc-chevron", { open: Ce.value[e.key] }])
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
                ], 8, vd),
                Ce.value[e.key] ? (l(), o("div", gd, [
                  (l(!0), o(u, null, m(e.items, (g) => (l(), o("div", {
                    key: g.label,
                    class: "bs-acc-item"
                  }, [
                    s("div", {
                      class: "bs-acc-item-icon",
                      innerHTML: g.icon
                    }, null, 8, kd),
                    s("div", fd, [
                      s("div", wd, a(g.label), 1),
                      g.desc ? (l(), o("div", xd, a(g.desc), 1)) : b("", !0)
                    ]),
                    s("div", Cd, a(f(S)(g.value)), 1),
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
                ])) : b("", !0)
              ], 2))), 128))
            ])
          ], 64)) : (l(), o("div", Sd, "Run the report to see results."))
        ])) : b("", !0),
        k.value === "cf" ? (l(), o("div", jd, [
          s("div", Md, [
            t[246] || (t[246] = C('<div class="bs-page-head-icon cf-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><path d="M3 3v18h18" data-v-bfa37a0c></path><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Cash Flow Statement</div><div class="bs-page-head-sub" data-v-bfa37a0c>Track the movement of cash in and out of your business</div></div>', 2)),
            s("div", Dd, [
              s("div", Td, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", Od, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[17] || (t[17] = (e) => es("exportCfCSV")),
                  disabled: !f(J)
                }, [...t[245] || (t[245] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Rd),
                w.value === "exportCfCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[18] || (t[18] = (e) => w.value = "")
                  }),
                  s("div", Pd, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[19] || (t[19] = (e) => {
                        w.value = "", Aa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[20] || (t[20] = (e) => {
                        w.value = "", Y(Aa);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          f(hl) ? (l(), o("div", Id)) : f(J) ? (l(), o("div", Vd, [
            s("div", Nd, [
              s("div", Ed, [
                t[247] || (t[247] = C('<div class="cf-acc-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><circle cx="12" cy="12" r="3" data-v-bfa37a0c></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" data-v-bfa37a0c></path></svg></div><div class="cf-acc-text" data-v-bfa37a0c><div class="cf-acc-label" data-v-bfa37a0c>Operating Activities</div><div class="cf-acc-desc" data-v-bfa37a0c>P&amp;L + working capital changes</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", f(J).operating >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).operating)), 3)
              ]),
              s("div", qd, [
                t[248] || (t[248] = C('<div class="cf-acc-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><ellipse cx="12" cy="5" rx="8" ry="3" data-v-bfa37a0c></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-bfa37a0c></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-bfa37a0c></path></svg></div><div class="cf-acc-text" data-v-bfa37a0c><div class="cf-acc-label" data-v-bfa37a0c>Investing Activities</div><div class="cf-acc-desc" data-v-bfa37a0c>Asset purchases and sales</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", f(J).investing >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).investing)), 3)
              ]),
              s("div", Bd, [
                t[249] || (t[249] = C('<div class="cf-acc-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><path d="M12 2 3 6v2h18V6z" data-v-bfa37a0c></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-bfa37a0c></path><path d="M3 20h18" data-v-bfa37a0c></path></svg></div><div class="cf-acc-text" data-v-bfa37a0c><div class="cf-acc-label" data-v-bfa37a0c>Financing Activities</div><div class="cf-acc-desc" data-v-bfa37a0c>Equity, loans and debt</div></div>', 2)),
                s("div", {
                  class: c(["cf-acc-amount", f(J).financing >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).financing)), 3)
              ]),
              s("div", Ad, [
                t[251] || (t[251] = C('<div class="cf-acc-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="12" width="4" height="9" data-v-bfa37a0c></rect><rect x="10" y="7" width="4" height="14" data-v-bfa37a0c></rect><rect x="17" y="3" width="4" height="18" data-v-bfa37a0c></rect></svg></div>', 1)),
                s("div", $d, [
                  t[250] || (t[250] = s("div", { class: "cf-acc-label" }, "Net Change in Cash", -1)),
                  s("div", Ld, a(f(J).net_change >= 0 ? "Increase" : "Decrease") + " in cash during this period", 1)
                ]),
                s("div", {
                  class: c(["cf-acc-amount", f(J).net_change >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).net_change)), 3)
              ]),
              f(J).opening_cash != null ? (l(), o(u, { key: 0 }, [
                s("div", Qd, [
                  t[252] || (t[252] = C('<div class="cf-flow-icon cf-flow-icon-open" data-v-bfa37a0c><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><line x1="5" y1="12" x2="19" y2="12" data-v-bfa37a0c></line><polyline points="12 5 19 12 12 19" data-v-bfa37a0c></polyline></svg></div><div class="cf-acc-text" data-v-bfa37a0c><div class="cf-acc-label" style="font-size:13px;" data-v-bfa37a0c>Opening Cash &amp; Bank</div><div class="cf-acc-desc" data-v-bfa37a0c>Balance at the beginning of the period</div></div>', 2)),
                  s("div", {
                    class: c(["cf-acc-amount", f(J).opening_cash >= 0 ? "green" : "red"])
                  }, a(f(S)(f(J).opening_cash)), 3)
                ]),
                s("div", Fd, [
                  t[253] || (t[253] = C('<div class="cf-flow-icon cf-flow-icon-close" data-v-bfa37a0c><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><line x1="19" y1="12" x2="5" y2="12" data-v-bfa37a0c></line><polyline points="12 5 5 12 12 19" data-v-bfa37a0c></polyline></svg></div><div class="cf-acc-text" data-v-bfa37a0c><div class="cf-acc-label" style="font-size:13px;" data-v-bfa37a0c>Closing Cash &amp; Bank</div><div class="cf-acc-desc" data-v-bfa37a0c>Balance at the end of the period</div></div>', 2)),
                  s("div", {
                    class: c(["cf-acc-amount", f(J).closing_cash >= 0 ? "green" : "red"])
                  }, a(f(S)(f(J).closing_cash)), 3)
                ])
              ], 64)) : b("", !0)
            ]),
            s("div", Hd, [
              s("div", zd, [
                t[255] || (t[255] = s("div", { class: "cf-trend-box-head" }, [
                  s("div", null, [
                    s("div", { class: "cf-trend-box-title" }, "Cash Flow Trend"),
                    s("div", { class: "cf-trend-box-sub" }, "Monthly cash flow movement")
                  ]),
                  s("div", { class: "cf-trend-period" }, "Monthly")
                ], -1)),
                se.value.length ? (l(), o("div", Wd, [
                  t[254] || (t[254] = s("div", { class: "cf-trend-baseline" }, null, -1)),
                  (l(!0), o(u, null, m(se.value, (e) => (l(), o("div", {
                    key: e.month,
                    class: "cf-trend-col"
                  }, [
                    s("div", {
                      class: "cf-trend-bar operating",
                      style: Bs(qe(e.operating)),
                      title: "Operating: " + f(S)(e.operating)
                    }, null, 12, Ud),
                    s("div", {
                      class: "cf-trend-bar investing",
                      style: Bs(qe(e.investing)),
                      title: "Investing: " + f(S)(e.investing)
                    }, null, 12, Kd),
                    s("div", {
                      class: "cf-trend-bar financing",
                      style: Bs(qe(e.financing)),
                      title: "Financing: " + f(S)(e.financing)
                    }, null, 12, Gd),
                    s("div", Yd, a(e.month), 1)
                  ]))), 128))
                ])) : (l(), o("div", Jd, "No monthly data for this range.")),
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
              s("div", Zd, [
                t[258] || (t[258] = s("div", { class: "cf-summary-icon" }, "i", -1)),
                s("div", null, [
                  t[257] || (t[257] = s("div", { class: "cf-summary-title" }, "Summary", -1)),
                  s("div", Xd, [
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
          ])) : (l(), o("div", sr, "Run the report to see results."))
        ])) : b("", !0),
        k.value === "gst" ? (l(), o("div", tr, [
          s("div", er, [
            t[260] || (t[260] = C('<div class="bs-page-head-icon gst-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-bfa37a0c></path><polyline points="14 2 14 8 20 8" data-v-bfa37a0c></polyline></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>GST Summary</div><div class="bs-page-head-sub" data-v-bfa37a0c>Overview of GST collected during the selected period</div></div>', 2)),
            s("div", ar, [
              s("div", or, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", lr, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[21] || (t[21] = (e) => es("exportGstCSV")),
                  disabled: !((n = f(dt)) != null && n.length)
                }, [...t[259] || (t[259] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, nr),
                w.value === "exportGstCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[22] || (t[22] = (e) => w.value = "")
                  }),
                  s("div", ir, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[23] || (t[23] = (e) => {
                        w.value = "", Fa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[24] || (t[24] = (e) => {
                        w.value = "", Y(Fa);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          f(kl) ? (l(), o("div", dr)) : (r = f(dt)) != null && r.length ? (l(), o("div", rr, [
            (l(!0), o(u, null, m(Pl.value, (e) => (l(), o("div", {
              key: e.tax_type,
              class: c(["gst-card", e.cls])
            }, [
              s("div", ur, [
                t[261] || (t[261] = C('<div class="gst-card-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><ellipse cx="12" cy="5" rx="8" ry="3" data-v-bfa37a0c></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-bfa37a0c></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" data-v-bfa37a0c></path></svg></div>', 1)),
                s("div", null, [
                  s("div", cr, a(e.tax_type), 1),
                  s("div", mr, a(e.desc), 1)
                ])
              ]),
              s("div", vr, [
                s("div", null, [
                  t[262] || (t[262] = s("div", { class: "gst-stat-label" }, "Invoice Count", -1)),
                  s("div", _r, a(e.invoice_count), 1)
                ]),
                s("div", null, [
                  t[263] || (t[263] = s("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  s("div", pr, a(f(S)(e.total_tax)), 1)
                ])
              ])
            ], 2))), 128)),
            s("div", yr, [
              t[266] || (t[266] = C('<div class="gst-card-head" data-v-bfa37a0c><div class="gst-card-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-bfa37a0c></path><polyline points="14 2 14 8 20 8" data-v-bfa37a0c></polyline><line x1="9" y1="17" x2="15" y2="17" data-v-bfa37a0c></line><line x1="9" y1="13" x2="12" y2="13" data-v-bfa37a0c></line></svg></div><div data-v-bfa37a0c><div class="gst-card-title" data-v-bfa37a0c>Total Summary</div><div class="gst-card-desc" data-v-bfa37a0c>Combined GST for the selected period</div></div></div>', 1)),
              s("div", br, [
                s("div", null, [
                  t[264] || (t[264] = s("div", { class: "gst-stat-label" }, "Total Invoices", -1)),
                  s("div", hr, a(La.value), 1)
                ]),
                s("div", null, [
                  t[265] || (t[265] = s("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  s("div", gr, a(f(S)(Qa.value)), 1)
                ])
              ])
            ])
          ])) : (l(), o("div", kr, "Run the report to see results."))
        ])) : b("", !0),
        k.value === "ar" ? (l(), o("div", fr, [
          s("div", wr, [
            t[268] || (t[268] = C('<div class="bs-page-head-icon ar-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="12" cy="12" r="10" data-v-bfa37a0c></circle><polyline points="12 6 12 12 16 14" data-v-bfa37a0c></polyline></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Accounts Receivable Aging</div><div class="bs-page-head-sub" data-v-bfa37a0c>Outstanding customer balances, grouped by how overdue they are</div></div>', 2)),
            s("div", xr, [
              s("div", Cr, "As of " + a(P(y.value)), 1),
              s("div", Sr, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[25] || (t[25] = (e) => ut.value = !ut.value),
                  disabled: !rs.value.length
                }, [...t[267] || (t[267] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, jr),
                ut.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[26] || (t[26] = (e) => ut.value = !1)
                  }),
                  s("div", Mr, [
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
                        ut.value = !1, Ml();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Be.value ? (l(), o("div", Dr)) : rs.value.length ? (l(), o("div", Tr, [
            s("div", Or, [
              t[270] || (t[270] = C('<div class="iws-total-icon iws-total-icon-neg" data-v-bfa37a0c><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="12" cy="12" r="10" data-v-bfa37a0c></circle><polyline points="12 6 12 12 16 14" data-v-bfa37a0c></polyline></svg></div><div class="iws-total-label" data-v-bfa37a0c>Total Outstanding</div>', 2)),
              s("div", {
                class: "iws-total-value iws-total-value-neg",
                style: Bs(G(d(Ms.value.total)))
              }, a(d(Ms.value.total)), 5),
              s("div", Rr, a(rs.value.length) + " " + a(rs.value.length === 1 ? "Customer" : "Customers"), 1),
              Ms.value.days_90_plus ? (l(), o("div", Pr, [
                t[269] || (t[269] = s("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                s("span", Ir, a(d(Ms.value.days_90_plus)), 1)
              ])) : b("", !0)
            ]),
            s("div", Vr, [
              s("table", Nr, [
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
                  (l(!0), o(u, null, m(Na.value, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", Er, a(g + 1), 1),
                    s("td", qr, a(e.customer_name || e.customer), 1),
                    s("td", Br, a(e.current > 0 ? H(e.current) : "—"), 1),
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
                    s("td", Ar, a(d(e.total)), 1),
                    s("td", $r, [
                      s("div", Lr, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Qt.value = Qt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Qr),
                        Qt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[37] || (t[37] = (Q) => Qt.value = null)
                          }),
                          s("div", Fr, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qt.value = null, Ea(e, !0);
                              }
                            }, "Copy row", 8, Hr),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qt.value = null, qa(e, !0);
                              }
                            }, "Download row as CSV", 8, zr)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Wr, [
                    t[280] || (t[280] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[281] || (t[281] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", Ur, a(d(Ms.value.current)), 1),
                    s("td", Kr, a(d(Ms.value.days_1_30)), 1),
                    s("td", Gr, a(d(Ms.value.days_31_60)), 1),
                    s("td", Yr, a(d(Ms.value.days_61_90)), 1),
                    s("td", Jr, a(d(Ms.value.days_90_plus)), 1),
                    s("td", Zr, a(d(Ms.value.total)), 1),
                    t[282] || (t[282] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Xr, a(Ha.value ? "No outstanding receivables as of this date." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "ap" ? (l(), o("div", su, [
          s("div", tu, [
            t[284] || (t[284] = C('<div class="bs-page-head-icon ap-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="12" cy="12" r="10" data-v-bfa37a0c></circle><polyline points="12 6 12 12 16 14" data-v-bfa37a0c></polyline></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Accounts Payable Aging</div><div class="bs-page-head-sub" data-v-bfa37a0c>Outstanding vendor balances, grouped by how overdue they are</div></div>', 2)),
            s("div", eu, [
              s("div", au, "As of " + a(P(y.value)), 1),
              s("div", ou, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[38] || (t[38] = (e) => vt.value = !vt.value),
                  disabled: !us.value.length
                }, [...t[283] || (t[283] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, lu),
                vt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[39] || (t[39] = (e) => vt.value = !1)
                  }),
                  s("div", nu, [
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
                        vt.value = !1, Dl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Ae.value ? (l(), o("div", iu)) : us.value.length ? (l(), o("div", du, [
            s("div", ru, [
              t[286] || (t[286] = C('<div class="iws-total-icon iws-total-icon-neg" data-v-bfa37a0c><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="12" cy="12" r="10" data-v-bfa37a0c></circle><polyline points="12 6 12 12 16 14" data-v-bfa37a0c></polyline></svg></div><div class="iws-total-label" data-v-bfa37a0c>Total Outstanding</div>', 2)),
              s("div", {
                class: "iws-total-value iws-total-value-neg",
                style: Bs(G(d(Ds.value.total)))
              }, a(d(Ds.value.total)), 5),
              s("div", uu, a(us.value.length) + " " + a(us.value.length === 1 ? "Vendor" : "Vendors"), 1),
              Ds.value.days_90_plus ? (l(), o("div", cu, [
                t[285] || (t[285] = s("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                s("span", mu, a(d(Ds.value.days_90_plus)), 1)
              ])) : b("", !0)
            ]),
            s("div", vu, [
              s("table", _u, [
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
                  (l(!0), o(u, null, m(Ba.value, (e, g) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    s("td", pu, a(g + 1), 1),
                    s("td", yu, a(e.supplier_name || e.supplier), 1),
                    s("td", bu, a(e.current > 0 ? H(e.current) : "—"), 1),
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
                    s("td", gu, [
                      s("div", ku, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Ft.value = Ft.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, fu),
                        Ft.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[50] || (t[50] = (Q) => Ft.value = null)
                          }),
                          s("div", wu, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Ft.value = null, Ea(e, !1);
                              }
                            }, "Copy row", 8, xu),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Ft.value = null, qa(e, !1);
                              }
                            }, "Download row as CSV", 8, Cu)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Su, [
                    t[296] || (t[296] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[297] || (t[297] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", ju, a(d(Ds.value.current)), 1),
                    s("td", Mu, a(d(Ds.value.days_1_30)), 1),
                    s("td", Du, a(d(Ds.value.days_31_60)), 1),
                    s("td", Tu, a(d(Ds.value.days_61_90)), 1),
                    s("td", Ou, a(d(Ds.value.days_90_plus)), 1),
                    s("td", Ru, a(d(Ds.value.total)), 1),
                    t[298] || (t[298] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Pu, a(za.value ? "No outstanding payables as of this date." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "items" ? (l(), o("div", Iu, [
          s("div", Vu, [
            t[300] || (t[300] = C('<div class="bs-page-head-icon iws-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="9" cy="21" r="1" data-v-bfa37a0c></circle><circle cx="20" cy="21" r="1" data-v-bfa37a0c></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Item-wise Sales</div><div class="bs-page-head-sub" data-v-bfa37a0c>Sales summary by item for the selected period</div></div>', 2)),
            s("div", Nu, [
              s("div", Eu, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", qu, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[51] || (t[51] = (e) => Pt.value = !Pt.value),
                  disabled: !As.value.length
                }, [...t[299] || (t[299] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Bu),
                Pt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[52] || (t[52] = (e) => Pt.value = !1)
                  }),
                  s("div", Au, [
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
                        Pt.value = !1, _n();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          $e.value ? (l(), o("div", $u)) : As.value.length ? (l(), o("div", Lu, [
            s("div", Qu, [
              t[301] || (t[301] = C('<div class="iws-total-icon" data-v-bfa37a0c><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><line x1="6" y1="20" x2="6" y2="13" data-v-bfa37a0c></line><line x1="12" y1="20" x2="12" y2="4" data-v-bfa37a0c></line><line x1="18" y1="20" x2="18" y2="9" data-v-bfa37a0c></line></svg></div><div class="iws-total-label" data-v-bfa37a0c>Total Sales</div>', 2)),
              s("div", {
                class: "iws-total-value",
                style: Bs(G(d(Hs.value.amount)))
              }, a(d(Hs.value.amount)), 5),
              s("div", Fu, a(As.value.length) + " " + a(As.value.length === 1 ? "Item" : "Items") + " • " + a(Hs.value.invoices) + " " + a(Hs.value.invoices === 1 ? "Invoice" : "Invoices"), 1)
            ]),
            s("div", Hu, [
              s("table", zu, [
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
                  (l(!0), o(u, null, m(fa.value, (e, g) => (l(), o("tr", {
                    key: (e.item_code || e.item_name) + "|" + (e.uom || "") + "|" + g
                  }, [
                    s("td", Wu, a(g + 1), 1),
                    s("td", Uu, a(e.item_name || e.item_code), 1),
                    s("td", null, [
                      s("span", Ku, a(e.uom || "—"), 1)
                    ]),
                    s("td", Gu, a(e.invoice_count), 1),
                    s("td", Yu, a(p(e.qty_sold)), 1),
                    s("td", Ju, a(H(e.avg_rate)), 1),
                    s("td", Zu, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    s("td", Xu, a(d(e.total_amount)), 1),
                    s("td", sc, [
                      s("div", tc, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Jt.value = Jt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, ec),
                        Jt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[63] || (t[63] = (Q) => Jt.value = null)
                          }),
                          s("div", ac, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Jt.value = null, pn(e);
                              }
                            }, "Copy row", 8, oc),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Jt.value = null, yn(e);
                              }
                            }, "Download row as CSV", 8, lc)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", nc, [
                    t[311] || (t[311] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[312] || (t[312] = s("td", { class: "fw-700" }, "Total", -1)),
                    t[313] || (t[313] = s("td", null, null, -1)),
                    s("td", ic, a(Hs.value.invoices), 1),
                    s("td", dc, a(p(Hs.value.qty)), 1),
                    t[314] || (t[314] = s("td", null, null, -1)),
                    s("td", rc, a(d(Hs.value.discount)), 1),
                    s("td", uc, a(d(Hs.value.amount)), 1),
                    t[315] || (t[315] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", cc, a(Wa.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "customers" ? (l(), o("div", mc, [
          s("div", vc, [
            t[317] || (t[317] = C('<div class="bs-page-head-icon cws-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-bfa37a0c></path><circle cx="9" cy="7" r="4" data-v-bfa37a0c></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-bfa37a0c></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Customer-wise Sales</div><div class="bs-page-head-sub" data-v-bfa37a0c>Sales summary by customer for the selected period</div></div>', 2)),
            s("div", _c, [
              s("div", pc, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", yc, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[64] || (t[64] = (e) => Nt.value = !Nt.value),
                  disabled: !$s.value.length
                }, [...t[316] || (t[316] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, bc),
                Nt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[65] || (t[65] = (e) => Nt.value = !1)
                  }),
                  s("div", hc, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[66] || (t[66] = (e) => {
                        Nt.value = !1, Ca();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[67] || (t[67] = (e) => {
                        Nt.value = !1, Y(Ca);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[68] || (t[68] = (e) => {
                        Nt.value = !1, bn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Le.value ? (l(), o("div", gc)) : $s.value.length ? (l(), o("div", kc, [
            s("div", fc, [
              t[319] || (t[319] = C('<div class="iws-total-icon" data-v-bfa37a0c><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><line x1="6" y1="20" x2="6" y2="13" data-v-bfa37a0c></line><line x1="12" y1="20" x2="12" y2="4" data-v-bfa37a0c></line><line x1="18" y1="20" x2="18" y2="9" data-v-bfa37a0c></line></svg></div><div class="iws-total-label" data-v-bfa37a0c>Total Sales</div>', 2)),
              s("div", {
                class: "iws-total-value",
                style: Bs(G(d(_s.value.amount)))
              }, a(d(_s.value.amount)), 5),
              s("div", wc, a($s.value.length) + " " + a($s.value.length === 1 ? "Customer" : "Customers") + " • " + a(_s.value.invoices) + " " + a(_s.value.invoices === 1 ? "Invoice" : "Invoices"), 1),
              _s.value.outstanding ? (l(), o("div", xc, [
                t[318] || (t[318] = s("span", { class: "iws-total-sub-label" }, "Outstanding", -1)),
                s("span", Cc, a(d(_s.value.outstanding)), 1)
              ])) : b("", !0)
            ]),
            s("div", Sc, [
              s("table", jc, [
                s("thead", null, [
                  s("tr", null, [
                    t[328] || (t[328] = s("th", { class: "iws-idx" }, "#", -1)),
                    s("th", {
                      onClick: t[69] || (t[69] = (e) => ot("customer")),
                      class: "iws-sortable"
                    }, [
                      t[320] || (t[320] = s("span", null, "Customer", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("customer")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[70] || (t[70] = (e) => ot("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[321] || (t[321] = s("span", null, "Invoices", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[71] || (t[71] = (e) => ot("net_total")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[322] || (t[322] = s("span", null, "Net Total (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("net_total")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[72] || (t[72] = (e) => ot("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[323] || (t[323] = s("span", null, "Discount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("total_discount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[73] || (t[73] = (e) => ot("total_tax")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[324] || (t[324] = s("span", null, "Tax (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("total_tax")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[74] || (t[74] = (e) => ot("avg_invoice_value")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[325] || (t[325] = s("span", null, "Avg Invoice (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("avg_invoice_value")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[75] || (t[75] = (e) => ot("outstanding_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[326] || (t[326] = s("span", null, "Outstanding (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("outstanding_amount")])
                      }, "⇅", 2)
                    ]),
                    s("th", {
                      onClick: t[76] || (t[76] = (e) => ot("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      t[327] || (t[327] = s("span", null, "Total Amount (KES)", -1)),
                      s("span", {
                        class: c(["iws-sort-ind", lt("total_amount")])
                      }, "⇅", 2)
                    ]),
                    t[329] || (t[329] = s("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                s("tbody", null, [
                  (l(!0), o(u, null, m(xa.value, (e, g) => (l(), o("tr", {
                    key: (e.customer || e.customer_name) + "|" + g
                  }, [
                    s("td", Mc, a(g + 1), 1),
                    s("td", Dc, a(e.customer_name || e.customer), 1),
                    s("td", Tc, a(e.invoice_count), 1),
                    s("td", Oc, a(H(e.net_total)), 1),
                    s("td", Rc, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    s("td", Pc, a(H(e.total_tax)), 1),
                    s("td", Ic, a(H(e.avg_invoice_value)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.outstanding_amount > 0 ? "red" : ""])
                    }, a(e.outstanding_amount ? d(e.outstanding_amount) : "—"), 3),
                    s("td", Vc, a(d(e.total_amount)), 1),
                    s("td", Nc, [
                      s("div", Ec, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Zt.value = Zt.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, qc),
                        Zt.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[77] || (t[77] = (Q) => Zt.value = null)
                          }),
                          s("div", Bc, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Zt.value = null, hn(e);
                              }
                            }, "Copy row", 8, Ac),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Zt.value = null, gn(e);
                              }
                            }, "Download row as CSV", 8, $c)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", Lc, [
                    t[330] || (t[330] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[331] || (t[331] = s("td", { class: "fw-700" }, "Total", -1)),
                    s("td", Qc, a(_s.value.invoices), 1),
                    s("td", Fc, a(d(_s.value.net)), 1),
                    s("td", Hc, a(d(_s.value.discount)), 1),
                    s("td", zc, a(d(_s.value.tax)), 1),
                    t[332] || (t[332] = s("td", null, null, -1)),
                    s("td", Wc, a(d(_s.value.outstanding)), 1),
                    s("td", Uc, a(d(_s.value.amount)), 1),
                    t[333] || (t[333] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Kc, a(Ua.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "profit" ? (l(), o("div", Gc, [
          s("div", Yc, [
            t[335] || (t[335] = C('<div class="bs-page-head-icon pw-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><line x1="12" y1="1" x2="12" y2="23" data-v-bfa37a0c></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Profit-wise Report (by Item)</div><div class="bs-page-head-sub" data-v-bfa37a0c>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost.</div></div>', 2)),
            s("div", Jc, [
              s("div", Zc, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", Xc, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[78] || (t[78] = (e) => Ct.value = !Ct.value),
                  disabled: !cs.value.length
                }, [...t[334] || (t[334] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, sm),
                Ct.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[79] || (t[79] = (e) => Ct.value = !1)
                  }),
                  s("div", tm, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[80] || (t[80] = (e) => {
                        Ct.value = !1, Sa();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[81] || (t[81] = (e) => {
                        Ct.value = !1, Y(Sa);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[82] || (t[82] = (e) => {
                        Ct.value = !1, on();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Qe.value ? (l(), o("div", em)) : cs.value.length ? (l(), o(u, { key: 1 }, [
            s("div", am, [
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
                  style: Bs(G(d(xt.value)))
                }, a(d(xt.value)), 7),
                s("div", om, [
                  os(a(cs.value.length) + " " + a(cs.value.length === 1 ? "Item" : "Items") + " • ", 1),
                  s("span", {
                    class: c(Se.value >= 0 ? "green" : "red")
                  }, a(Se.value.toFixed(1)) + "% margin", 3)
                ]),
                Kt.value ? (l(), o("div", lm, [
                  t[337] || (t[337] = s("span", { class: "iws-total-sub-label" }, "No cost data", -1)),
                  s("span", nm, a(Kt.value) + " item" + a(Kt.value > 1 ? "s" : ""), 1)
                ])) : b("", !0)
              ], 2),
              s("div", im, [
                s("table", dm, [
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
                    (l(!0), o(u, null, m(ga.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + "|" + g
                    }, [
                      s("td", rm, a(g + 1), 1),
                      s("td", um, [
                        os(a(e.item_name || e.item_code) + " ", 1),
                        e.cost_rate ? b("", !0) : (l(), o("span", cm, "no cost data"))
                      ]),
                      s("td", mm, a(p(e.qty_sold)), 1),
                      s("td", vm, a(H(e.revenue)), 1),
                      s("td", _m, a(e.cost_rate ? H(e.cost_rate) : "—"), 1),
                      s("td", pm, a(e.total_cost ? H(e.total_cost) : "—"), 1),
                      s("td", {
                        class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                      s("td", {
                        class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3),
                      s("td", ym, [
                        s("div", bm, [
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
                            s("div", gm, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gt.value = null, ln(e);
                                }
                              }, "Copy row", 8, km),
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gt.value = null, nn(e);
                                }
                              }, "Download row as CSV", 8, fm)
                            ])
                          ], 64)) : b("", !0)
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
                      s("td", xm, a(p(cs.value.reduce((e, g) => e + Number(g.qty_sold || 0), 0))), 1),
                      s("td", Cm, a(d(cs.value.reduce((e, g) => e + Number(g.revenue || 0), 0))), 1),
                      t[350] || (t[350] = s("td", null, null, -1)),
                      s("td", Sm, a(d(cs.value.filter((e) => e.cost_rate).reduce((e, g) => e + Number(g.total_cost || 0), 0))), 1),
                      s("td", {
                        class: c(["ta-r fw-700", xt.value >= 0 ? "green" : "red"])
                      }, a(d(xt.value)), 3),
                      s("td", {
                        class: c(["ta-r fw-700", Se.value >= 0 ? "green" : "red"])
                      }, a(Se.value.toFixed(1)) + "%", 3),
                      t[351] || (t[351] = s("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ]),
            Kt.value ? (l(), o("div", jm, a(Kt.value) + " item" + a(Kt.value > 1 ? "s" : "") + ' excluded from the profit/margin totals above — no valuation or standard buying rate found (see "no cost data" tag). ', 1)) : b("", !0)
          ], 64)) : (l(), o("div", Mm, a(Ka.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "invoice_profit" ? (l(), o("div", Dm, [
          s("div", Tm, [
            t[353] || (t[353] = C('<div class="bs-page-head-icon ip-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-bfa37a0c></path><polyline points="14 2 14 8 20 8" data-v-bfa37a0c></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-bfa37a0c></line><line x1="9" y1="11" x2="13" y2="11" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Invoice Profitability</div><div class="bs-page-head-sub" data-v-bfa37a0c>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost. Tick rows to see profit for a single invoice or any combination of selected invoices.</div></div>', 2)),
            s("div", Om, [
              s("div", Rm, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", Pm, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[91] || (t[91] = (e) => Dt.value = !Dt.value),
                  disabled: !ds.value.length
                }, [...t[352] || (t[352] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Im),
                Dt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[92] || (t[92] = (e) => Dt.value = !1)
                  }),
                  s("div", Vm, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[93] || (t[93] = (e) => {
                        Dt.value = !1, ja();
                      })
                    }, "Download CSV" + a(Os.value.size ? " (selected)" : ""), 1),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[94] || (t[94] = (e) => {
                        Dt.value = !1, Y(ja);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[95] || (t[95] = (e) => {
                        Dt.value = !1, un();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Fe.value ? (l(), o("div", Nm)) : ds.value.length ? (l(), o("div", Em, [
            s("div", {
              class: c(["iws-total-panel", is.value.profit >= 0 ? "" : "iws-total-panel-neg"])
            }, [
              s("div", {
                class: c(["iws-total-icon", is.value.profit >= 0 ? "" : "iws-total-icon-neg"])
              }, [...t[354] || (t[354] = [
                C('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-bfa37a0c></path><polyline points="14 2 14 8 20 8" data-v-bfa37a0c></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-bfa37a0c></line><line x1="9" y1="11" x2="13" y2="11" data-v-bfa37a0c></line></svg>', 1)
              ])], 2),
              t[355] || (t[355] = s("div", { class: "iws-total-label" }, "Total Profit", -1)),
              s("div", {
                class: c(["iws-total-value", is.value.profit >= 0 ? "" : "iws-total-value-neg"]),
                style: Bs(G(d(is.value.profit)))
              }, a(d(is.value.profit)), 7),
              s("div", qm, [
                os(a(ds.value.length) + " " + a(ds.value.length === 1 ? "Invoice" : "Invoices") + " • ", 1),
                s("span", {
                  class: c(is.value.revenue ? is.value.profit >= 0 ? "green" : "red" : "")
                }, a(is.value.revenue ? (is.value.profit / is.value.revenue * 100).toFixed(1) : "0.0") + "% margin ", 3)
              ]),
              Os.value.size ? (l(), o("div", Bm, [
                s("span", Am, a(le.value.count) + " selected", 1),
                s("span", {
                  class: c(["iws-total-sub-value", le.value.profit >= 0 ? "green" : "red"]),
                  style: { color: "inherit" }
                }, a(d(le.value.profit)), 3),
                s("div", $m, " Revenue " + a(d(le.value.revenue)) + " • Cost " + a(d(le.value.total_cost)), 1)
              ])) : b("", !0)
            ], 2),
            s("div", Lm, [
              s("table", Qm, [
                s("thead", null, [
                  s("tr", null, [
                    s("th", Fm, [
                      s("input", {
                        type: "checkbox",
                        checked: Oo.value,
                        onChange: rn
                      }, null, 40, Hm)
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
                  (l(!0), o(u, null, m(ka.value, (e) => (l(), o("tr", {
                    key: e.invoice,
                    class: c({ "row-selected": Os.value.has(e.invoice) })
                  }, [
                    s("td", zm, [
                      s("input", {
                        type: "checkbox",
                        checked: Os.value.has(e.invoice),
                        onChange: (g) => dn(e.invoice)
                      }, null, 40, Wm)
                    ]),
                    s("td", Um, [
                      s("a", {
                        href: "#",
                        class: "inv-detail-link",
                        onClick: Tn((g) => Ya(e.invoice), ["prevent"])
                      }, a(e.invoice), 9, Km),
                      e.no_cost_lines ? (l(), o("span", Gm, "partial cost data")) : b("", !0)
                    ]),
                    s("td", Ym, a(e.posting_date), 1),
                    s("td", Jm, a(e.customer_name || e.customer), 1),
                    s("td", Zm, a(d(e.revenue)), 1),
                    s("td", Xm, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(Number(e.margin_pct || 0).toFixed(1)) + "%", 3),
                    s("td", sv, [
                      s("div", tv, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (g) => Tt.value = Tt.value === e.invoice ? null : e.invoice,
                          title: "Row actions"
                        }, "⋮", 8, ev),
                        Tt.value === e.invoice ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[103] || (t[103] = (g) => Tt.value = null)
                          }),
                          s("div", av, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Tt.value = null, Ya(e.invoice);
                              }
                            }, "View P&L", 8, ov),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Tt.value = null, cn(e);
                              }
                            }, "Copy row", 8, lv),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Tt.value = null, mn(e);
                              }
                            }, "Download row as CSV", 8, nv)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ], 2))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", iv, [
                    t[364] || (t[364] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[365] || (t[365] = s("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "Total", -1)),
                    s("td", dv, a(d(is.value.revenue)), 1),
                    s("td", rv, a(d(is.value.total_cost)), 1),
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
          ])) : (l(), o("div", uv, a(Ga.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        Sn(Mn, {
          show: He.value,
          width: "720px",
          title: ns.value ? `Profit & Loss — ${ns.value.invoice.name}` : "Profit & Loss",
          onClose: t[104] || (t[104] = (e) => He.value = !1)
        }, {
          default: jn(() => [
            ze.value ? (l(), o("div", cv)) : ns.value ? (l(), o(u, { key: 1 }, [
              s("div", mv, [
                s("span", null, [
                  t[367] || (t[367] = os("Date: ", -1)),
                  s("strong", vv, a(ns.value.invoice.posting_date), 1)
                ]),
                s("span", null, [
                  t[368] || (t[368] = os("Customer: ", -1)),
                  s("strong", _v, a(ns.value.invoice.customer_name || ns.value.invoice.customer), 1)
                ]),
                s("span", null, [
                  t[369] || (t[369] = os("Status: ", -1)),
                  s("strong", pv, a(ns.value.invoice.status), 1)
                ])
              ]),
              ns.value.totals.no_cost_lines ? (l(), o("div", yv, a(ns.value.totals.no_cost_lines) + " item" + a(ns.value.totals.no_cost_lines > 1 ? "s" : "") + ' below have no valuation or standard buying rate — their cost is shown as "—" and excluded from the totals. ', 1)) : b("", !0),
              s("table", bv, [
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
                    s("td", hv, a(p(e.qty)), 1),
                    s("td", gv, a(d(e.rate)), 1),
                    s("td", kv, a(d(e.revenue)), 1),
                    s("td", fv, a(e.cost_rate ? d(e.cost_rate) : "—"), 1),
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
                  s("tr", xv, [
                    t[370] || (t[370] = s("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "TOTAL", -1)),
                    s("td", Cv, a(d(ns.value.totals.revenue)), 1),
                    t[371] || (t[371] = s("td", null, null, -1)),
                    s("td", Sv, a(d(ns.value.totals.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r fw-700", ns.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(d(ns.value.totals.profit)), 3),
                    s("td", {
                      class: c(["ta-r fw-700", ns.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(Number(ns.value.totals.margin_pct || 0).toFixed(1)) + "%", 3)
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", jv, "Couldn't load this invoice."))
          ]),
          _: 1
        }, 8, ["show", "title"]),
        k.value === "tb" ? (l(), o("div", Mv, [
          s("div", Dv, [
            t[374] || (t[374] = C('<div class="bs-page-head-icon tb-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><line x1="18" y1="20" x2="18" y2="10" data-v-bfa37a0c></line><line x1="12" y1="20" x2="12" y2="4" data-v-bfa37a0c></line><line x1="6" y1="20" x2="6" y2="14" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Trial Balance</div><div class="bs-page-head-sub" data-v-bfa37a0c>Account-wise opening, movement and closing balances for the selected period</div></div>', 2)),
            s("div", Tv, [
              s("div", Ov, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", Rv, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[105] || (t[105] = (e) => rt.value = !rt.value),
                  disabled: !((_ = f(Ys)) != null && _.length)
                }, [...t[373] || (t[373] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Pv),
                rt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[106] || (t[106] = (e) => rt.value = !1)
                  }),
                  s("div", Iv, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[107] || (t[107] = (e) => {
                        rt.value = !1, Va();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[108] || (t[108] = (e) => {
                        rt.value = !1, Y(Va);
                      })
                    }, "Download Excel"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[109] || (t[109] = (e) => {
                        rt.value = !1, Cl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          f(wl) ? (l(), o("div", Vv)) : (j = f(Ys)) != null && j.length ? (l(), o(u, { key: 1 }, [
            s("div", Nv, [
              s("div", Ev, [
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
                s("div", qv, [
                  t[375] || (t[375] = s("div", { class: "bs-kpi-label" }, "Total Debit", -1)),
                  s("div", Bv, a(d(ms.value.debit)), 1)
                ])
              ]),
              s("div", Av, [
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
                s("div", $v, [
                  t[377] || (t[377] = s("div", { class: "bs-kpi-label" }, "Total Credit", -1)),
                  s("div", Lv, a(d(ms.value.credit)), 1)
                ])
              ])
            ]),
            s("div", {
              class: c(["bs-sum-status", ve.value ? "bs-ok" : "bs-bad"])
            }, [
              s("span", Qv, a(ve.value ? "✓" : "✕"), 1),
              s("div", Fv, [
                s("div", Hv, a(ve.value ? "Total Debit = Total Credit" : "Trial balance out of balance"), 1),
                s("div", zv, [
                  os(a(d(ms.value.debit)) + " vs " + a(d(ms.value.credit)), 1),
                  ve.value ? b("", !0) : (l(), o(u, { key: 0 }, [
                    os(" (diff " + a(d(ms.value.debit - ms.value.credit)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            s("div", Wv, [
              s("table", Uv, [
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
                  (l(!0), o(u, null, m(Ee.value, (e, g) => (l(), o("tr", {
                    key: e.account
                  }, [
                    s("td", Kv, a(g + 1), 1),
                    s("td", Gv, a(e.account), 1),
                    s("td", null, [
                      s("span", Yv, a(e.account_type), 1)
                    ]),
                    s("td", {
                      class: c(["ta-r mono-sm", e.opening < 0 ? "red" : ""])
                    }, a(H(e.opening || 0)), 3),
                    s("td", Jv, a(e.debit ? H(e.debit) : "—"), 1),
                    s("td", Zv, a(e.credit ? H(e.credit) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-700", e.closing < 0 ? "red" : "green"])
                    }, a(d(e.closing || 0)), 3),
                    s("td", Xv, [
                      s("div", s1, [
                        s("button", {
                          class: "iws-kebab",
                          onClick: (Q) => At.value = At.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, t1),
                        At.value === g ? (l(), o(u, { key: 0 }, [
                          s("div", {
                            class: "iws-menu-backdrop",
                            onClick: t[116] || (t[116] = (Q) => At.value = null)
                          }),
                          s("div", e1, [
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                At.value = null, Sl(e);
                              }
                            }, "Copy row", 8, a1),
                            s("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                At.value = null, jl(e);
                              }
                            }, "Download row as CSV", 8, o1)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                s("tfoot", null, [
                  s("tr", l1, [
                    t[387] || (t[387] = s("td", { class: "iws-idx" }, [
                      s("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    t[388] || (t[388] = s("td", { class: "fw-700" }, "Total", -1)),
                    t[389] || (t[389] = s("td", null, null, -1)),
                    s("td", n1, a(d(ms.value.opening)), 1),
                    s("td", i1, a(d(ms.value.debit)), 1),
                    s("td", d1, a(d(ms.value.credit)), 1),
                    s("td", r1, a(d(ms.value.closing)), 1),
                    t[390] || (t[390] = s("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ], 64)) : (l(), o("div", u1, "Run the report to see results."))
        ])) : b("", !0),
        k.value === "stockgl" ? (l(), o("div", c1, [
          s("div", m1, [
            t[392] || (t[392] = C('<div class="bs-page-head-icon sgl-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-bfa37a0c></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-bfa37a0c></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Stock Ledger vs Inventory GL</div><div class="bs-page-head-sub" data-v-bfa37a0c>Compares the operational Stock Ledger (Bin valuation) against the financial General Ledger (Inventory Asset account balance) — this check is the tripwire that catches drift immediately instead of at year-end audit.</div></div>', 2)),
            s("div", v1, [
              s("div", _1, "As of " + a(P(y.value)), 1),
              s("div", p1, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[117] || (t[117] = (e) => yt.value = !yt.value),
                  disabled: !ss.value
                }, [...t[391] || (t[391] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, y1),
                yt.value ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[118] || (t[118] = (e) => yt.value = !1)
                  }),
                  s("div", b1, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[119] || (t[119] = (e) => {
                        yt.value = !1, Nl();
                      })
                    }, "Download account summary (CSV)"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[120] || (t[120] = (e) => {
                        yt.value = !1, Al();
                      })
                    }, "Download item-level detail (CSV)"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[121] || (t[121] = (e) => {
                        yt.value = !1, ql();
                      })
                    }, "Copy item-level detail")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          We.value ? (l(), o("div", h1)) : ss.value ? (l(), o(u, { key: 1 }, [
            s("div", g1, [
              s("div", k1, [
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
                s("div", f1, [
                  t[393] || (t[393] = s("div", { class: "bs-kpi-label" }, "Bin Stock Value", -1)),
                  s("div", w1, a(d(ss.value.total_bin_value)), 1)
                ])
              ]),
              s("div", x1, [
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
                s("div", C1, [
                  t[395] || (t[395] = s("div", { class: "bs-kpi-label" }, "Inventory GL Balance", -1)),
                  s("div", S1, a(d(ss.value.total_gl_balance)), 1)
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
                s("div", j1, [
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
              s("span", M1, a(ss.value.is_reconciled ? "✓" : "✕"), 1),
              s("div", D1, [
                s("div", T1, a(ss.value.is_reconciled ? "Bin Stock Value = Inventory GL Balance" : "Stock and GL are out of sync"), 1),
                s("div", O1, [
                  os(a(d(ss.value.total_bin_value)) + " vs " + a(d(ss.value.total_gl_balance)), 1),
                  ss.value.is_reconciled ? b("", !0) : (l(), o(u, { key: 0 }, [
                    os(" (diff " + a(d(ss.value.total_difference)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            ss.value.grir_account ? (l(), o("div", R1, [
              t[399] || (t[399] = s("strong", null, "Stock Received (GR/IR):", -1)),
              t[400] || (t[400] = os()),
              s("span", P1, a(d(ss.value.grir_balance)), 1),
              t[401] || (t[401] = s("span", null, " — goods received, awaiting bill. Nonzero is normal.", -1))
            ])) : b("", !0),
            (M = ss.value.accounts) != null && M.length ? (l(), o(u, { key: 1 }, [
              t[409] || (t[409] = s("div", { class: "iws-section-label" }, "By Inventory Account", -1)),
              s("div", I1, [
                s("table", V1, [
                  s("thead", null, [
                    s("tr", null, [
                      t[406] || (t[406] = s("th", { class: "iws-idx" }, "#", -1)),
                      s("th", {
                        onClick: t[122] || (t[122] = (e) => he("account")),
                        class: "iws-sortable"
                      }, [
                        t[402] || (t[402] = s("span", null, "Inventory Account", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ge("account")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[123] || (t[123] = (e) => he("bin_stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[403] || (t[403] = s("span", null, "Bin Stock Value (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ge("bin_stock_value")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[124] || (t[124] = (e) => he("gl_balance")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[404] || (t[404] = s("span", null, "GL Balance (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ge("gl_balance")])
                        }, "⇅", 2)
                      ]),
                      s("th", {
                        onClick: t[125] || (t[125] = (e) => he("difference")),
                        class: "iws-sortable ta-r"
                      }, [
                        t[405] || (t[405] = s("span", null, "Difference (KES)", -1)),
                        s("span", {
                          class: c(["iws-sort-ind", ge("difference")])
                        }, "⇅", 2)
                      ]),
                      t[407] || (t[407] = s("th", null, "Status", -1)),
                      t[408] || (t[408] = s("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  s("tbody", null, [
                    (l(!0), o(u, null, m(Za.value, (e, g) => (l(), o("tr", {
                      key: e.account
                    }, [
                      s("td", N1, a(g + 1), 1),
                      s("td", E1, a(e.account), 1),
                      s("td", q1, a(H(e.bin_stock_value)), 1),
                      s("td", B1, a(H(e.gl_balance)), 1),
                      s("td", {
                        class: c(["ta-r mono-sm", e.is_reconciled ? "" : "text-danger fw-700"])
                      }, a(H(e.difference)), 3),
                      s("td", null, [
                        s("span", {
                          class: c(["badge", e.is_reconciled ? "badge-blue" : "badge-danger"])
                        }, a(e.is_reconciled ? "OK" : "DRIFT"), 3)
                      ]),
                      s("td", A1, [
                        s("div", $1, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => te.value = te.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, L1),
                          te.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[126] || (t[126] = (Q) => te.value = null)
                            }),
                            s("div", Q1, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  te.value = null, Vl(e);
                                }
                              }, "Copy row", 8, F1)
                            ])
                          ], 64)) : b("", !0)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ])
            ], 64)) : b("", !0),
            (N = ss.value.items) != null && N.length ? (l(), o(u, { key: 2 }, [
              t[421] || (t[421] = s("div", { class: "iws-section-label" }, "Item-level Bin Detail", -1)),
              s("div", H1, [
                s("table", z1, [
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
                    (l(!0), o(u, null, m(Ue.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + e.warehouse
                    }, [
                      s("td", W1, a(g + 1), 1),
                      s("td", U1, a(e.item_name || e.item_code), 1),
                      s("td", null, [
                        s("span", K1, a(e.warehouse), 1)
                      ]),
                      s("td", G1, a(p(e.actual_qty)), 1),
                      s("td", Y1, a(H(e.valuation_rate)), 1),
                      s("td", J1, a(d(e.stock_value)), 1),
                      s("td", Z1, [
                        s("div", X1, [
                          s("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Ht.value = Ht.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, s_),
                          Ht.value === g ? (l(), o(u, { key: 0 }, [
                            s("div", {
                              class: "iws-menu-backdrop",
                              onClick: t[132] || (t[132] = (Q) => Ht.value = null)
                            }),
                            s("div", t_, [
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Ht.value = null, El(e);
                                }
                              }, "Copy row", 8, e_),
                              s("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Ht.value = null, Bl(e);
                                }
                              }, "Download row as CSV", 8, a_)
                            ])
                          ], 64)) : b("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", o_, [
                      t[417] || (t[417] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[418] || (t[418] = s("td", {
                        colspan: "3",
                        class: "fw-700"
                      }, "Total", -1)),
                      t[419] || (t[419] = s("td", null, null, -1)),
                      s("td", l_, a(d(Ke.value)), 1),
                      t[420] || (t[420] = s("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", n_, a(Ja.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "stockval" ? (l(), o("div", i_, [
          s("div", d_, [
            t[423] || (t[423] = C('<div class="bs-page-head-icon sv-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="3" y="3" width="18" height="18" rx="2" data-v-bfa37a0c></rect><path d="M3 9h18" data-v-bfa37a0c></path><path d="M9 21V9" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Stock Valuation Summary</div><div class="bs-page-head-sub" data-v-bfa37a0c>Total stock value per warehouse, from current Bin valuation. Reflects live stock on hand — not a historical point-in-time snapshot, since stock quantities aren&#39;t tracked by date.</div></div>', 2)),
            s("div", r_, [
              s("div", u_, "As of " + a(P(y.value)), 1),
              s("div", c_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[133] || (t[133] = (e) => es("exportStockValCSV")),
                  disabled: !((Et = (Es = xs.value) == null ? void 0 : Es.by_warehouse) != null && Et.length)
                }, [...t[422] || (t[422] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, m_),
                w.value === "exportStockValCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[134] || (t[134] = (e) => w.value = "")
                  }),
                  s("div", v_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[135] || (t[135] = (e) => {
                        w.value = "", Ro();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[136] || (t[136] = (e) => {
                        w.value = "", Y(Ro);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Ge.value ? (l(), o("div", __)) : xs.value ? (l(), o(u, { key: 1 }, [
            s("div", p_, [
              s("div", y_, [
                t[425] || (t[425] = C('<div class="bs-kpi-icon" data-v-bfa37a0c><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-bfa37a0c><rect x="3" y="3" width="18" height="18" rx="2" data-v-bfa37a0c></rect><path d="M3 9h18" data-v-bfa37a0c></path><path d="M9 21V9" data-v-bfa37a0c></path></svg></div>', 1)),
                s("div", b_, [
                  t[424] || (t[424] = s("div", { class: "bs-kpi-label" }, "Grand Total Stock Value", -1)),
                  s("div", h_, a(d(xs.value.grand_total)), 1)
                ])
              ])
            ]),
            (Yo = xs.value.by_warehouse) != null && Yo.length ? (l(), o(u, { key: 0 }, [
              t[430] || (t[430] = s("div", { class: "iws-section-label" }, "By Warehouse", -1)),
              s("div", g_, [
                s("table", k_, [
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
                      s("td", f_, a(g + 1), 1),
                      s("td", w_, a(e.warehouse), 1),
                      s("td", x_, a(d(e.stock_value)), 1),
                      s("td", C_, a(xs.value.grand_total ? (e.stock_value / xs.value.grand_total * 100).toFixed(1) + "%" : "—"), 1)
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", S_, [
                      t[426] || (t[426] = s("td", { class: "iws-idx" }, [
                        s("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      t[427] || (t[427] = s("td", { class: "fw-700" }, "Total", -1)),
                      s("td", j_, a(d(xs.value.grand_total)), 1),
                      t[428] || (t[428] = s("td", { class: "ta-r fw-700" }, "100.0%", -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", M_, "No stock on hand in any warehouse."))
          ], 64)) : (l(), o("div", D_, a(to.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "price_mrp" ? (l(), o("div", T_, [
          s("div", O_, [
            t[432] || (t[432] = C('<div class="bs-page-head-icon sv-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-bfa37a0c></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Selling Price &amp; MRP</div><div class="bs-page-head-sub" data-v-bfa37a0c>Item-wise selling price and MRP per warehouse, from the Item master. Where MRP is not set on an item, the selling price is shown as MRP.</div></div>', 2)),
            s("div", R_, [
              s("div", P_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[137] || (t[137] = (e) => es("exportPriceMrpCSV")),
                  disabled: !xe.value.length
                }, [...t[431] || (t[431] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, I_),
                w.value === "exportPriceMrpCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[138] || (t[138] = (e) => w.value = "")
                  }),
                  s("div", V_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[139] || (t[139] = (e) => {
                        w.value = "", Po();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[140] || (t[140] = (e) => {
                        w.value = "", Y(Po);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", N_, [
            qs(s("input", {
              type: "text",
              "onUpdate:modelValue": t[141] || (t[141] = (e) => Je.value = e),
              class: "dr-input",
              placeholder: "Search item code or name",
              style: { "min-width": "220px" }
            }, null, 512), [
              [Ks, Je.value]
            ]),
            qs(s("select", {
              "onUpdate:modelValue": t[142] || (t[142] = (e) => we.value = e),
              class: "dr-input"
            }, [
              t[433] || (t[433] = s("option", { value: "" }, "All warehouses", -1)),
              (l(!0), o(u, null, m(((Jo = oe.value) == null ? void 0 : Jo.warehouses) || [], (e) => (l(), o("option", {
                key: e,
                value: e
              }, a(e), 9, E_))), 128))
            ], 512), [
              [tl, we.value]
            ])
          ]),
          Ye.value ? (l(), o("div", q_)) : oe.value && xe.value.length ? (l(), o("div", B_, [
            s("table", A_, [
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
                (l(!0), o(u, null, m(xe.value, (e, g) => (l(), o("tr", {
                  key: e.item_code + "|" + e.warehouse
                }, [
                  s("td", $_, a(g + 1), 1),
                  s("td", L_, [
                    os(a(e.item_name || e.item_code), 1),
                    s("div", Q_, a(e.item_code), 1)
                  ]),
                  s("td", null, a(e.warehouse || "—"), 1),
                  s("td", F_, a(e.qty) + " " + a(e.uom), 1),
                  s("td", H_, a(d(e.selling_price)), 1),
                  s("td", z_, a(d(e.mrp)), 1)
                ]))), 128))
              ])
            ])
          ])) : (l(), o("div", W_, a(eo.value ? "No items found." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "mis" ? (l(), o("div", U_, [
          s("div", K_, [
            t[436] || (t[436] = C('<div class="bs-page-head-icon mis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="3" y="4" width="18" height="18" rx="2" data-v-bfa37a0c></rect><line x1="3" y1="10" x2="21" y2="10" data-v-bfa37a0c></line><line x1="8" y1="2" x2="8" y2="6" data-v-bfa37a0c></line><line x1="16" y1="2" x2="16" y2="6" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Daily Business MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Day-by-day snapshot of Sales, Collection, Purchase, Expenses, Dispatch, Production, Stock Inward/Outward and running Outstanding for the selected period.</div></div>', 2)),
            s("div", G_, [
              s("div", Y_, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", J_, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[143] || (t[143] = (e) => es("exportDailyMisCSV")),
                  disabled: !((Xo = (Zo = Z.value) == null ? void 0 : Zo.days) != null && Xo.length)
                }, [...t[435] || (t[435] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Z_),
                w.value === "exportDailyMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[144] || (t[144] = (e) => w.value = "")
                  }),
                  s("div", X_, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[145] || (t[145] = (e) => {
                        w.value = "", Io();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[146] || (t[146] = (e) => {
                        w.value = "", Y(Io);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Ze.value ? (l(), o("div", sp)) : Z.value ? (l(), o(u, { key: 1 }, [
            s("div", tp, [
              s("div", ep, [
                t[437] || (t[437] = s("span", { class: "bucket-label" }, "Daily Sales", -1)),
                s("span", ap, a(d(Z.value.totals.sales_amount)), 1)
              ]),
              s("div", op, [
                t[438] || (t[438] = s("span", { class: "bucket-label" }, "Daily Collection", -1)),
                s("span", lp, a(d(Z.value.totals.collection_amount)), 1)
              ]),
              s("div", np, [
                t[439] || (t[439] = s("span", { class: "bucket-label" }, "Daily Purchase", -1)),
                s("span", ip, a(d(Z.value.totals.purchase_amount)), 1)
              ]),
              s("div", dp, [
                t[440] || (t[440] = s("span", { class: "bucket-label" }, "Daily Expenses", -1)),
                s("span", rp, a(d(Z.value.totals.expense_amount)), 1)
              ]),
              s("div", up, [
                t[441] || (t[441] = s("span", { class: "bucket-label" }, "Daily Dispatch", -1)),
                s("span", cp, a(p(Z.value.totals.dispatch_qty)) + " qty", 1)
              ]),
              s("div", mp, [
                t[442] || (t[442] = s("span", { class: "bucket-label" }, "Daily Production", -1)),
                s("span", vp, a(p(Z.value.totals.production_qty)) + " qty", 1)
              ]),
              s("div", _p, [
                t[443] || (t[443] = s("span", { class: "bucket-label" }, "Stock Inward / Outward", -1)),
                s("span", pp, a(p(Z.value.totals.stock_inward_qty)) + " / " + a(p(Z.value.totals.stock_outward_qty)), 1)
              ]),
              s("div", yp, [
                t[444] || (t[444] = s("span", { class: "bucket-label" }, "Closing Outstanding", -1)),
                s("span", {
                  class: c(["mis-summary-val", Z.value.totals.closing_outstanding >= 0 ? "" : "green"])
                }, a(d(Z.value.totals.closing_outstanding)), 3)
              ])
            ]),
            (sl = Z.value.days) != null && sl.length ? (l(), o(u, { key: 0 }, [
              t[447] || (t[447] = s("div", { class: "iws-section-label" }, "Day by Day", -1)),
              s("div", bp, [
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
                      s("td", gp, a(e.date), 1),
                      s("td", kp, a(d(e.sales_amount)), 1),
                      s("td", fp, a(d(e.collection_amount)), 1),
                      s("td", wp, a(d(e.purchase_amount)), 1),
                      s("td", xp, a(d(e.expense_amount)), 1),
                      s("td", Cp, a(p(e.dispatch_qty)), 1),
                      s("td", Sp, a(p(e.production_qty)), 1),
                      s("td", jp, a(p(e.stock_inward_qty)), 1),
                      s("td", Mp, a(p(e.stock_outward_qty)), 1),
                      s("td", Dp, a(d(e.outstanding)), 1)
                    ]))), 128))
                  ]),
                  s("tfoot", null, [
                    s("tr", Tp, [
                      t[445] || (t[445] = s("td", { class: "fw-700" }, "TOTAL", -1)),
                      s("td", Op, a(d(Z.value.totals.sales_amount)), 1),
                      s("td", Rp, a(d(Z.value.totals.collection_amount)), 1),
                      s("td", Pp, a(d(Z.value.totals.purchase_amount)), 1),
                      s("td", Ip, a(d(Z.value.totals.expense_amount)), 1),
                      s("td", Vp, a(p(Z.value.totals.dispatch_qty)), 1),
                      s("td", Np, a(p(Z.value.totals.production_qty)), 1),
                      s("td", Ep, a(p(Z.value.totals.stock_inward_qty)), 1),
                      s("td", qp, a(p(Z.value.totals.stock_outward_qty)), 1),
                      s("td", Bp, a(d(Z.value.totals.closing_outstanding)), 1)
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Ap, "No activity in this period."))
          ], 64)) : (l(), o("div", $p, a(ao.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "sales_mis" ? (l(), o("div", Lp, [
          s("div", Qp, [
            t[449] || (t[449] = C('<div class="bs-page-head-icon smis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M3 3v18h18" data-v-bfa37a0c></path><path d="M18 17V9" data-v-bfa37a0c></path><path d="M13 17V5" data-v-bfa37a0c></path><path d="M8 17v-3" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Sales MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Sales performance broken down by summary, target, product, customer, salesperson, branch, returns, discounts, pending orders and conversion.</div></div>', 2)),
            s("div", Fp, [
              s("div", Hp, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", zp, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[147] || (t[147] = (e) => es("exportSalesMisCSV")),
                  disabled: !R.value
                }, [...t[448] || (t[448] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Wp),
                w.value === "exportSalesMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[148] || (t[148] = (e) => w.value = "")
                  }),
                  s("div", Up, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[149] || (t[149] = (e) => {
                        w.value = "", Vo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[150] || (t[150] = (e) => {
                        w.value = "", Y(Vo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Kp, [
            (l(), o(u, null, m($l, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: ys.value === e.key }]),
              onClick: (g) => ys.value = e.key
            }, a(e.label), 11, Gp)), 64))
          ]),
          Xe.value ? (l(), o("div", Yp)) : R.value ? (l(), o(u, { key: 1 }, [
            ys.value === "summary" ? (l(), o("div", Jp, [
              s("div", Zp, [
                t[450] || (t[450] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                s("span", Xp, a(p(R.value.summary.invoice_count)), 1)
              ]),
              s("div", sy, [
                t[451] || (t[451] = s("span", { class: "bucket-label" }, "Net Sales", -1)),
                s("span", ty, a(d(R.value.summary.net_sales)), 1)
              ]),
              s("div", ey, [
                t[452] || (t[452] = s("span", { class: "bucket-label" }, "Total Tax", -1)),
                s("span", ay, a(d(R.value.summary.total_tax)), 1)
              ]),
              s("div", oy, [
                t[453] || (t[453] = s("span", { class: "bucket-label" }, "Discount Given", -1)),
                s("span", ly, a(d(R.value.summary.header_discount)), 1)
              ]),
              s("div", ny, [
                t[454] || (t[454] = s("span", { class: "bucket-label" }, "Grand Total", -1)),
                s("span", iy, a(d(R.value.summary.grand_total)), 1)
              ]),
              s("div", dy, [
                t[455] || (t[455] = s("span", { class: "bucket-label" }, "Qty Sold", -1)),
                s("span", ry, a(p(R.value.summary.total_qty)), 1)
              ]),
              s("div", uy, [
                t[456] || (t[456] = s("span", { class: "bucket-label" }, "Avg Invoice Value", -1)),
                s("span", cy, a(d(R.value.summary.avg_invoice_value)), 1)
              ])
            ])) : ys.value === "target" ? (l(), o(u, { key: 1 }, [
              s("div", my, [
                t[457] || (t[457] = s("label", { class: "dr-label" }, "Sales Target (KES)", -1)),
                qs(s("input", {
                  type: "number",
                  "onUpdate:modelValue": t[151] || (t[151] = (e) => ht.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Ks,
                    ht.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                t[458] || (t[458] = s("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actuals for this period.", -1))
              ]),
              s("div", vy, [
                s("div", _y, [
                  t[459] || (t[459] = s("span", { class: "bucket-label" }, "Target", -1)),
                  s("span", py, a(d(ht.value)), 1)
                ]),
                s("div", yy, [
                  t[460] || (t[460] = s("span", { class: "bucket-label" }, "Achieved", -1)),
                  s("span", by, a(d(R.value.summary.grand_total)), 1)
                ]),
                s("div", hy, [
                  t[461] || (t[461] = s("span", { class: "bucket-label" }, "Achievement %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", lo.value >= 100 ? "green" : "red"])
                  }, a(lo.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", R.value.summary.grand_total >= ht.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[462] || (t[462] = s("span", null, "Variance (Achieved − Target)", -1)),
                s("span", gy, a(f(S)(R.value.summary.grand_total - ht.value)), 1)
              ], 2)
            ], 64)) : ys.value === "product" ? (l(), o("table", ky, [
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
                  s("td", fy, a(e.invoice_count), 1),
                  s("td", wy, a(p(e.qty_sold)), 1),
                  s("td", xy, a(d(e.total_discount)), 1),
                  s("td", Cy, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "customer" ? (l(), o("table", Sy, [
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
                  s("td", jy, a(e.invoice_count), 1),
                  s("td", My, a(d(e.total_amount)), 1),
                  s("td", Dy, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "salesperson" ? (l(), o("table", Ty, [
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
                  s("td", Oy, a(e.invoice_count), 1),
                  s("td", Ry, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : ys.value === "branch" ? (l(), o(u, { key: 5 }, [
              t[467] || (t[467] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "10px" } }, "No dedicated Branch/Location doctype exists — grouped by Cost Center as a proxy.", -1)),
              s("table", Py, [
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
                    s("td", Iy, a(e.invoice_count), 1),
                    s("td", Vy, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : ys.value === "returns" ? (l(), o(u, { key: 6 }, [
              s("div", Ny, [
                s("div", Ey, [
                  t[468] || (t[468] = s("span", { class: "bucket-label" }, "Return Count", -1)),
                  s("span", qy, a(R.value.sales_return.return_count), 1)
                ]),
                s("div", By, [
                  t[469] || (t[469] = s("span", { class: "bucket-label" }, "Return Value", -1)),
                  s("span", Ay, a(d(R.value.sales_return.return_total)), 1)
                ]),
                s("div", $y, [
                  t[470] || (t[470] = s("span", { class: "bucket-label" }, "% of Sales", -1)),
                  s("span", Ly, a(R.value.sales_return.return_pct_of_sales.toFixed(1)) + "%", 1)
                ])
              ]),
              R.value.sales_return.rows.length ? (l(), o("table", Qy, [
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
                    s("td", Fy, a(d(e.grand_total)), 1),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Hy, "No sales returns in this period."))
            ], 64)) : ys.value === "discount" ? (l(), o(u, { key: 7 }, [
              s("div", zy, [
                s("div", Wy, [
                  t[472] || (t[472] = s("span", { class: "bucket-label" }, "Line Discount", -1)),
                  s("span", Uy, a(d(R.value.discount_analysis.total_line_discount)), 1)
                ]),
                s("div", Ky, [
                  t[473] || (t[473] = s("span", { class: "bucket-label" }, "Header Discount", -1)),
                  s("span", Gy, a(d(R.value.discount_analysis.total_header_discount)), 1)
                ]),
                s("div", Yy, [
                  t[474] || (t[474] = s("span", { class: "bucket-label" }, "Avg Discount %", -1)),
                  s("span", Jy, a(R.value.discount_analysis.avg_discount_pct.toFixed(1)) + "%", 1)
                ])
              ]),
              t[477] || (t[477] = s("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Customer", -1)),
              R.value.discount_analysis.by_customer.length ? (l(), o("table", Zy, [
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
                    s("td", Xy, a(d(e.line_discount)), 1),
                    s("td", sb, a(d(e.header_discount)), 1),
                    s("td", tb, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", eb, "No discounted invoices for any customer.")),
              t[478] || (t[478] = s("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Item", -1)),
              R.value.discount_analysis.by_item.length ? (l(), o("table", ab, [
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
                    s("td", ob, a(d(e.total_discount)), 1),
                    s("td", lb, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", nb, "No discounted items."))
            ], 64)) : ys.value === "pending" ? (l(), o(u, { key: 8 }, [
              s("div", ib, [
                s("div", db, [
                  t[479] || (t[479] = s("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  s("span", rb, a(R.value.sales_order_pending.order_count), 1)
                ]),
                s("div", ub, [
                  t[480] || (t[480] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", cb, a(d(R.value.sales_order_pending.pending_total)), 1)
                ])
              ]),
              R.value.sales_order_pending.rows.length ? (l(), o("table", mb, [
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
                      s("span", vb, a(e.status), 1)
                    ]),
                    s("td", _b, a(d(e.grand_total)), 1),
                    s("td", pb, a(d(e.billed_amount)), 1),
                    s("td", yb, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", bb, "No pending sales orders."))
            ], 64)) : ys.value === "conversion" ? (l(), o(u, { key: 9 }, [
              t[488] || (t[488] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Based on Sales Orders placed within the selected date range.", -1)),
              s("div", hb, [
                s("div", gb, [
                  t[482] || (t[482] = s("span", { class: "bucket-label" }, "Orders Placed", -1)),
                  s("span", kb, a(R.value.sales_conversion.order_count), 1)
                ]),
                s("div", fb, [
                  t[483] || (t[483] = s("span", { class: "bucket-label" }, "Converted to Invoice", -1)),
                  s("span", wb, a(R.value.sales_conversion.converted_count), 1)
                ]),
                s("div", xb, [
                  t[484] || (t[484] = s("span", { class: "bucket-label" }, "Conversion Rate", -1)),
                  s("span", {
                    class: c(["mis-summary-val", R.value.sales_conversion.conversion_rate_pct >= 50 ? "green" : "red"])
                  }, a(R.value.sales_conversion.conversion_rate_pct.toFixed(1)) + "%", 3)
                ]),
                s("div", Cb, [
                  t[485] || (t[485] = s("span", { class: "bucket-label" }, "Order Value", -1)),
                  s("span", Sb, a(d(R.value.sales_conversion.order_value)), 1)
                ]),
                s("div", jb, [
                  t[486] || (t[486] = s("span", { class: "bucket-label" }, "Billed Value", -1)),
                  s("span", Mb, a(d(R.value.sales_conversion.billed_value)), 1)
                ]),
                s("div", Db, [
                  t[487] || (t[487] = s("span", { class: "bucket-label" }, "Value Conversion %", -1)),
                  s("span", Tb, a(R.value.sales_conversion.value_conversion_pct.toFixed(1)) + "%", 1)
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Ob, a(oo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "receivables" ? (l(), o("div", Rb, [
          s("div", Pb, [
            t[490] || (t[490] = C('<div class="bs-page-head-icon rmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="12" cy="12" r="10" data-v-bfa37a0c></circle><path d="M12 6v6l4 2" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Collection &amp; Receivables MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Total receivables, customer outstanding, ageing, collection targets and efficiency for the selected period.</div></div>', 2)),
            s("div", Ib, [
              s("div", Vb, "As of " + a(P(y.value)), 1),
              s("div", Nb, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[152] || (t[152] = (e) => es("exportReceivablesCSV")),
                  disabled: !I.value
                }, [...t[489] || (t[489] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Eb),
                w.value === "exportReceivablesCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[153] || (t[153] = (e) => w.value = "")
                  }),
                  s("div", qb, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[154] || (t[154] = (e) => {
                        w.value = "", No();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[155] || (t[155] = (e) => {
                        w.value = "", Y(No);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Bb, [
            (l(), o(u, null, m(Ll, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Rs.value === e.key }]),
              onClick: (g) => Rs.value = e.key
            }, a(e.label), 11, Ab)), 64))
          ]),
          sa.value ? (l(), o("div", $b)) : I.value ? (l(), o(u, { key: 1 }, [
            Rs.value === "total" ? (l(), o(u, { key: 0 }, [
              s("div", Lb, [
                s("span", null, "Total Receivables (as of " + a(I.value.as_of_date) + ")", 1),
                s("span", Qb, a(f(S)(I.value.total_outstanding)), 1)
              ]),
              s("div", Fb, [
                s("div", Hb, [
                  t[491] || (t[491] = s("span", { class: "bucket-label" }, "Customers Owing", -1)),
                  s("span", zb, a(I.value.customer_outstanding.length), 1)
                ]),
                s("div", Wb, [
                  t[492] || (t[492] = s("span", { class: "bucket-label" }, "Open Invoices", -1)),
                  s("span", Ub, a(I.value.customer_outstanding.reduce((e, g) => e + g.invoice_count, 0)), 1)
                ]),
                s("div", Kb, [
                  t[493] || (t[493] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", Gb, a(d(I.value.overdue.total)), 1)
                ]),
                s("div", Yb, [
                  t[494] || (t[494] = s("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  s("span", Jb, a(d(I.value.total_outstanding - I.value.overdue.total)), 1)
                ])
              ])
            ], 64)) : Rs.value === "outstanding" ? (l(), o(u, { key: 1 }, [
              s("div", Zb, [
                s("span", null, "Total Outstanding (as of " + a(I.value.as_of_date) + ")", 1),
                s("span", Xb, a(f(S)(I.value.total_outstanding)), 1)
              ]),
              I.value.customer_outstanding.length ? (l(), o("table", s0, [
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
                    s("td", t0, a(e.invoice_count), 1),
                    s("td", null, a(e.oldest_due_date || "—"), 1),
                    s("td", e0, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a0, "No outstanding receivables."))
            ], 64)) : Rs.value === "ageing" ? (l(), o(u, { key: 2 }, [
              s("div", o0, [
                s("div", l0, [
                  t[496] || (t[496] = s("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  s("span", n0, a(d(I.value.ageing_totals.days_0_30)), 1)
                ]),
                s("div", i0, [
                  t[497] || (t[497] = s("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  s("span", d0, a(d(I.value.ageing_totals.days_31_60)), 1)
                ]),
                s("div", r0, [
                  t[498] || (t[498] = s("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  s("span", u0, a(d(I.value.ageing_totals.days_61_90)), 1)
                ]),
                s("div", c0, [
                  t[499] || (t[499] = s("span", { class: "bucket-label" }, "90+ Days", -1)),
                  s("span", m0, a(d(I.value.ageing_totals.days_90_plus)), 1)
                ]),
                s("div", v0, [
                  t[500] || (t[500] = s("span", { class: "bucket-label" }, "Total", -1)),
                  s("span", _0, a(d(I.value.ageing_totals.total)), 1)
                ])
              ]),
              I.value.ageing.length ? (l(), o("table", p0, [
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
                    s("td", y0, a(d(e.days_0_30)), 1),
                    s("td", b0, a(d(e.days_31_60)), 1),
                    s("td", h0, a(d(e.days_61_90)), 1),
                    s("td", g0, a(d(e.days_90_plus)), 1),
                    s("td", k0, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", f0, "No outstanding receivables."))
            ], 64)) : Rs.value === "coll_target" ? (l(), o(u, { key: 3 }, [
              s("div", w0, [
                t[502] || (t[502] = s("label", { class: "dr-label" }, "Collection Target (KES)", -1)),
                qs(s("input", {
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
              s("div", x0, [
                s("div", C0, [
                  t[504] || (t[504] = s("span", { class: "bucket-label" }, "Target", -1)),
                  s("span", S0, a(d(gt.value)), 1)
                ]),
                s("div", j0, [
                  t[505] || (t[505] = s("span", { class: "bucket-label" }, "Achieved", -1)),
                  s("span", M0, a(d(I.value.daily_collection.total)), 1)
                ]),
                s("div", D0, [
                  t[506] || (t[506] = s("span", { class: "bucket-label" }, "Achievement %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", io.value >= 100 ? "green" : "red"])
                  }, a(io.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", I.value.daily_collection.total >= gt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[507] || (t[507] = s("span", null, "Variance (Achieved − Target)", -1)),
                s("span", T0, a(f(S)(I.value.daily_collection.total - gt.value)), 1)
              ], 2)
            ], 64)) : Rs.value === "daily_coll" ? (l(), o(u, { key: 4 }, [
              s("div", O0, [
                s("span", null, "Total Collection (" + a(x.value) + " to " + a(y.value) + ")", 1),
                s("span", R0, a(f(S)(I.value.daily_collection.total)), 1)
              ]),
              I.value.daily_collection.days.length ? (l(), o("table", P0, [
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
                    s("td", I0, a(e.count), 1),
                    s("td", V0, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : b("", !0)
            ], 64)) : Rs.value === "overdue" ? (l(), o(u, { key: 5 }, [
              s("div", N0, [
                s("div", E0, [
                  t[509] || (t[509] = s("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  s("span", q0, a(I.value.overdue.count), 1)
                ]),
                s("div", B0, [
                  t[510] || (t[510] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", A0, a(d(I.value.overdue.total)), 1)
                ])
              ]),
              I.value.overdue.rows.length ? (l(), o("table", $0, [
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
                    s("td", L0, a(e.overdue_days), 1),
                    s("td", Q0, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", F0, "No overdue invoices."))
            ], 64)) : Rs.value === "credit" ? (l(), o(u, { key: 6 }, [
              I.value.credit_utilisation.length ? (l(), o("table", H0, [
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
                    s("td", z0, a(e.credit_limit ? d(e.credit_limit) : "No limit set"), 1),
                    s("td", W0, a(d(e.outstanding_amount)), 1),
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
              ])) : (l(), o("div", U0, "No customers with a credit limit or outstanding balance."))
            ], 64)) : Rs.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              t[519] || (t[519] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Efficiency % = Collections in period ÷ (Opening Receivables + Sales in period). ", -1)),
              s("div", K0, [
                s("div", G0, [
                  t[513] || (t[513] = s("span", { class: "bucket-label" }, "Opening Receivables", -1)),
                  s("span", Y0, a(d(I.value.collection_efficiency.opening_receivables)), 1)
                ]),
                s("div", J0, [
                  t[514] || (t[514] = s("span", { class: "bucket-label" }, "Sales in Period", -1)),
                  s("span", Z0, a(d(I.value.collection_efficiency.period_sales)), 1)
                ]),
                s("div", X0, [
                  t[515] || (t[515] = s("span", { class: "bucket-label" }, "Receivable Pool", -1)),
                  s("span", sh, a(d(I.value.collection_efficiency.receivable_pool)), 1)
                ]),
                s("div", th, [
                  t[516] || (t[516] = s("span", { class: "bucket-label" }, "Collected in Period", -1)),
                  s("span", eh, a(d(I.value.collection_efficiency.period_collection)), 1)
                ]),
                s("div", ah, [
                  t[517] || (t[517] = s("span", { class: "bucket-label" }, "Closing Receivables", -1)),
                  s("span", oh, a(d(I.value.collection_efficiency.closing_receivables)), 1)
                ]),
                s("div", lh, [
                  t[518] || (t[518] = s("span", { class: "bucket-label" }, "Collection Efficiency", -1)),
                  s("span", {
                    class: c(["mis-summary-val", I.value.collection_efficiency.efficiency_pct >= 80 ? "green" : "red"])
                  }, a(I.value.collection_efficiency.efficiency_pct.toFixed(1)) + "%", 3)
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", nh, a(no.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "purchase_mis" ? (l(), o("div", ih, [
          s("div", dh, [
            t[521] || (t[521] = C('<div class="bs-page-head-icon pmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M3 3v18h18" data-v-bfa37a0c></path><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Purchase MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Purchase performance broken down by summary, supplier, product, target vs actual, price variance and pending orders/receipts.</div></div>', 2)),
            s("div", rh, [
              s("div", uh, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", ch, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[157] || (t[157] = (e) => es("exportPurchaseMisCSV")),
                  disabled: !q.value
                }, [...t[520] || (t[520] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, mh),
                w.value === "exportPurchaseMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[158] || (t[158] = (e) => w.value = "")
                  }),
                  s("div", vh, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[159] || (t[159] = (e) => {
                        w.value = "", Eo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[160] || (t[160] = (e) => {
                        w.value = "", Y(Eo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", _h, [
            (l(), o(u, null, m(Ql, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ps.value === e.key }]),
              onClick: (g) => Ps.value = e.key
            }, a(e.label), 11, ph)), 64))
          ]),
          ta.value ? (l(), o("div", yh)) : q.value ? (l(), o(u, { key: 1 }, [
            Ps.value === "summary" ? (l(), o("div", bh, [
              s("div", hh, [
                t[522] || (t[522] = s("span", { class: "bucket-label" }, "Bills", -1)),
                s("span", gh, a(p(q.value.summary.invoice_count)), 1)
              ]),
              s("div", kh, [
                t[523] || (t[523] = s("span", { class: "bucket-label" }, "Net Purchases", -1)),
                s("span", fh, a(d(q.value.summary.net_purchases)), 1)
              ]),
              s("div", wh, [
                t[524] || (t[524] = s("span", { class: "bucket-label" }, "Total Tax", -1)),
                s("span", xh, a(d(q.value.summary.total_tax)), 1)
              ]),
              s("div", Ch, [
                t[525] || (t[525] = s("span", { class: "bucket-label" }, "Discount Received", -1)),
                s("span", Sh, a(d(q.value.summary.header_discount)), 1)
              ]),
              s("div", jh, [
                t[526] || (t[526] = s("span", { class: "bucket-label" }, "Grand Total", -1)),
                s("span", Mh, a(d(q.value.summary.grand_total)), 1)
              ]),
              s("div", Dh, [
                t[527] || (t[527] = s("span", { class: "bucket-label" }, "Qty Purchased", -1)),
                s("span", Th, a(p(q.value.summary.total_qty)), 1)
              ]),
              s("div", Oh, [
                t[528] || (t[528] = s("span", { class: "bucket-label" }, "Avg Bill Value", -1)),
                s("span", Rh, a(d(q.value.summary.avg_invoice_value)), 1)
              ])
            ])) : Ps.value === "supplier" ? (l(), o("table", Ph, [
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
                  s("td", Ih, a(e.invoice_count), 1),
                  s("td", Vh, a(d(e.total_amount)), 1),
                  s("td", Nh, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : Ps.value === "product" ? (l(), o("table", Eh, [
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
                  s("td", qh, a(e.invoice_count), 1),
                  s("td", Bh, a(p(e.qty_purchased)), 1),
                  s("td", Ah, a(d(e.total_discount || 0)), 1),
                  s("td", $h, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : Ps.value === "target" ? (l(), o(u, { key: 3 }, [
              s("div", Lh, [
                t[531] || (t[531] = s("label", { class: "dr-label" }, "Purchase Target / Budget (KES)", -1)),
                qs(s("input", {
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
              s("div", Qh, [
                s("div", Fh, [
                  t[533] || (t[533] = s("span", { class: "bucket-label" }, "Target / Budget", -1)),
                  s("span", Hh, a(d(kt.value)), 1)
                ]),
                s("div", zh, [
                  t[534] || (t[534] = s("span", { class: "bucket-label" }, "Actual", -1)),
                  s("span", Wh, a(d(q.value.summary.grand_total)), 1)
                ]),
                s("div", Uh, [
                  t[535] || (t[535] = s("span", { class: "bucket-label" }, "Utilisation %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", uo.value <= 100 ? "green" : "red"])
                  }, a(uo.value.toFixed(1)) + "%", 3)
                ])
              ]),
              s("div", {
                class: c(["pl-row", q.value.summary.grand_total <= kt.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                t[536] || (t[536] = s("span", null, "Variance (Budget − Actual)", -1)),
                s("span", Kh, a(f(S)(kt.value - q.value.summary.grand_total)), 1)
              ], 2)
            ], 64)) : Ps.value === "price_variance" ? (l(), o(u, { key: 4 }, [
              s("div", Gh, [
                t[537] || (t[537] = os(" Actual weighted-average purchase rate this period vs. the Item's Standard Buying Rate. ", -1)),
                q.value.no_standard_rate_count ? (l(), o("span", Yh, a(q.value.no_standard_rate_count) + " item(s) below have no Standard Buying Rate set and are excluded from the % comparison.", 1)) : b("", !0)
              ]),
              q.value.price_variance.length ? (l(), o("table", Jh, [
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
                    s("td", Zh, a(p(e.qty_purchased)), 1),
                    s("td", Xh, a(d(e.actual_rate)), 1),
                    s("td", sg, a(e.has_standard_rate ? d(e.standard_rate) : "Not set"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.has_standard_rate ? e.variance > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? d(e.variance) : "—"), 3),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.has_standard_rate ? e.variance_pct > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? e.variance_pct.toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", tg, "No purchases in this period."))
            ], 64)) : Ps.value === "pending_po" ? (l(), o(u, { key: 5 }, [
              s("div", eg, [
                s("div", ag, [
                  t[539] || (t[539] = s("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  s("span", og, a(q.value.pending_purchase_orders.order_count), 1)
                ]),
                s("div", lg, [
                  t[540] || (t[540] = s("span", { class: "bucket-label" }, "Pending (Not Yet Billed)", -1)),
                  s("span", ng, a(d(q.value.pending_purchase_orders.pending_total)), 1)
                ])
              ]),
              q.value.pending_purchase_orders.rows.length ? (l(), o("table", ig, [
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
                      s("span", dg, a(e.status), 1)
                    ]),
                    s("td", rg, a(d(e.grand_total)), 1),
                    s("td", ug, a(d(e.billed_amount || 0)), 1),
                    s("td", cg, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", mg, "No pending Purchase Orders as of this date."))
            ], 64)) : Ps.value === "pending_receipts" ? (l(), o(u, { key: 6 }, [
              s("div", vg, [
                s("div", _g, [
                  t[542] || (t[542] = s("span", { class: "bucket-label" }, "Orders Awaiting Receipt", -1)),
                  s("span", pg, a(q.value.pending_material_receipts.order_count), 1)
                ]),
                s("div", yg, [
                  t[543] || (t[543] = s("span", { class: "bucket-label" }, "Pending Receipt Value", -1)),
                  s("span", bg, a(d(q.value.pending_material_receipts.pending_value)), 1)
                ])
              ]),
              q.value.pending_material_receipts.rows.length ? (l(), o("table", hg, [
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
                      s("span", gg, a(e.status), 1)
                    ]),
                    s("td", kg, a(p(e.ordered_qty)), 1),
                    s("td", fg, a(p(e.received_qty || 0)), 1),
                    s("td", wg, a(p(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", xg, "No pending material receipts as of this date."))
            ], 64)) : Ps.value === "returns" ? (l(), o(u, { key: 7 }, [
              s("div", Cg, [
                s("div", Sg, [
                  t[545] || (t[545] = s("span", { class: "bucket-label" }, "Return Count", -1)),
                  s("span", jg, a(q.value.purchase_return.return_count), 1)
                ]),
                s("div", Mg, [
                  t[546] || (t[546] = s("span", { class: "bucket-label" }, "Return Value", -1)),
                  s("span", Dg, a(d(q.value.purchase_return.return_total)), 1)
                ]),
                s("div", Tg, [
                  t[547] || (t[547] = s("span", { class: "bucket-label" }, "% of Purchases", -1)),
                  s("span", Og, a(q.value.purchase_return.return_pct_of_purchases.toFixed(1)) + "%", 1)
                ])
              ]),
              q.value.purchase_return.rows.length ? (l(), o("table", Rg, [
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
                    s("td", Pg, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Ig, "No purchase returns in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Vg, a(ro.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "inventory_mis" ? (l(), o("div", Ng, [
          s("div", Eg, [
            t[550] || (t[550] = C('<div class="bs-page-head-icon invmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-bfa37a0c></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-bfa37a0c></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Inventory MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Current stock, valuation, movement speed, ageing, reorder points and adjustments across all warehouses.</div></div>', 2)),
            s("div", qg, [
              s("div", Bg, "As of " + a(P(y.value)), 1),
              s("div", Ag, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[162] || (t[162] = (e) => es("exportInventoryMisCSV")),
                  disabled: !O.value
                }, [...t[549] || (t[549] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, $g),
                w.value === "exportInventoryMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[163] || (t[163] = (e) => w.value = "")
                  }),
                  s("div", Lg, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[164] || (t[164] = (e) => {
                        w.value = "", qo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[165] || (t[165] = (e) => {
                        w.value = "", Y(qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Qg, [
            (l(), o(u, null, m(Fl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: bs.value === e.key }]),
              onClick: (g) => bs.value = e.key
            }, a(e.label), 11, Fg)), 64))
          ]),
          ea.value ? (l(), o("div", Hg)) : O.value ? (l(), o(u, { key: 1 }, [
            bs.value === "current_stock" ? (l(), o(u, { key: 0 }, [
              s("div", zg, [
                s("div", Wg, [
                  t[551] || (t[551] = s("span", { class: "bucket-label" }, "Total Qty on Hand", -1)),
                  s("span", Ug, a(p(O.value.current_stock.total_qty)), 1)
                ]),
                s("div", Kg, [
                  t[552] || (t[552] = s("span", { class: "bucket-label" }, "Total Stock Value", -1)),
                  s("span", Gg, a(d(O.value.current_stock.total_value)), 1)
                ])
              ]),
              O.value.current_stock.rows.length ? (l(), o("table", Yg, [
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
                    s("td", Jg, a(p(e.actual_qty)), 1),
                    s("td", Zg, a(d(e.valuation_rate)), 1),
                    s("td", Xg, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", s2, "No stock on hand."))
            ], 64)) : bs.value === "stock_value" ? (l(), o(u, { key: 1 }, [
              s("div", t2, [
                t[554] || (t[554] = s("span", null, "Total Stock Value (all warehouses)", -1)),
                s("span", e2, a(f(S)(O.value.stock_value.grand_total)), 1)
              ]),
              O.value.stock_value.by_warehouse.length ? (l(), o("table", a2, [
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
                    s("td", o2, a(e.item_count), 1),
                    s("td", l2, a(p(e.total_qty)), 1),
                    s("td", n2, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", i2, "No stock on hand."))
            ], 64)) : bs.value === "fast_moving" ? (l(), o(u, { key: 2 }, [
              s("div", d2, " Ranked by quantity consumed (stock-out) between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              O.value.fast_moving.length ? (l(), o("table", r2, [
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
                    s("td", u2, a(p(e.qty_consumed)), 1),
                    s("td", c2, a(e.transactions), 1),
                    s("td", m2, a(p(e.current_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", v2, "No stock-out movement in this period."))
            ], 64)) : bs.value === "slow_moving" ? (l(), o(u, { key: 3 }, [
              s("div", _2, " In stock, last moved 30-180 days before " + a(y.value) + ". ", 1),
              O.value.slow_moving.length ? (l(), o("table", p2, [
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
                    s("td", y2, a(p(e.actual_qty)), 1),
                    s("td", b2, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_movement_date), 1),
                    s("td", h2, a(e.days_since_movement), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", g2, "No slow moving items."))
            ], 64)) : bs.value === "dead_stock" ? (l(), o(u, { key: 4 }, [
              s("div", k2, [
                s("div", f2, [
                  t[558] || (t[558] = s("span", { class: "bucket-label" }, "Dead Stock Items", -1)),
                  s("span", w2, a(O.value.dead_stock.rows.length), 1)
                ]),
                s("div", x2, [
                  t[559] || (t[559] = s("span", { class: "bucket-label" }, "Value Tied Up", -1)),
                  s("span", C2, a(d(O.value.dead_stock.total_value)), 1)
                ])
              ]),
              s("div", S2, " In stock, no stock-out movement in over 180 days before " + a(y.value) + " (or ever). ", 1),
              O.value.dead_stock.rows.length ? (l(), o("table", j2, [
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
                    s("td", M2, a(p(e.actual_qty)), 1),
                    s("td", D2, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_movement_date || "Never"), 1),
                    s("td", T2, a(e.days_since_movement ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", O2, "No dead stock."))
            ], 64)) : bs.value === "ageing" ? (l(), o(u, { key: 5 }, [
              s("div", R2, " Proxy ageing: days since each item+warehouse's most recent stock-in, as of " + a(y.value) + ". ", 1),
              s("div", P2, [
                s("div", I2, [
                  t[561] || (t[561] = s("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  s("span", V2, a(d(O.value.stock_ageing.totals.days_0_30)), 1)
                ]),
                s("div", N2, [
                  t[562] || (t[562] = s("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  s("span", E2, a(d(O.value.stock_ageing.totals.days_31_60)), 1)
                ]),
                s("div", q2, [
                  t[563] || (t[563] = s("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  s("span", B2, a(d(O.value.stock_ageing.totals.days_61_90)), 1)
                ]),
                s("div", A2, [
                  t[564] || (t[564] = s("span", { class: "bucket-label" }, "90+ Days", -1)),
                  s("span", $2, a(d(O.value.stock_ageing.totals.days_90_plus)), 1)
                ]),
                s("div", L2, [
                  t[565] || (t[565] = s("span", { class: "bucket-label" }, "Total", -1)),
                  s("span", Q2, a(d(O.value.stock_ageing.totals.total)), 1)
                ])
              ]),
              O.value.stock_ageing.rows.length ? (l(), o("table", F2, [
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
                    s("td", H2, a(p(e.actual_qty)), 1),
                    s("td", z2, a(d(e.stock_value)), 1),
                    s("td", null, a(e.last_receipt_date || "Never"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", (e.age_days || 0) > 90 ? "red fw-600" : ""])
                    }, a(e.age_days ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", W2, "No stock on hand."))
            ], 64)) : bs.value === "reorder" ? (l(), o(u, { key: 6 }, [
              s("div", U2, [
                s("div", K2, [
                  t[567] || (t[567] = s("span", { class: "bucket-label" }, "Items Below Reorder Level", -1)),
                  s("span", G2, a(O.value.reorder_low_stock.item_count), 1)
                ])
              ]),
              O.value.reorder_low_stock.rows.length ? (l(), o("table", Y2, [
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
                    s("td", J2, a(p(e.actual_qty)), 1),
                    s("td", Z2, a(p(e.reorder_level)), 1),
                    s("td", X2, a(p(e.reorder_qty)), 1),
                    s("td", sk, a(p(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", tk, "No items below reorder level."))
            ], 64)) : bs.value === "excess" ? (l(), o(u, { key: 7 }, [
              t[571] || (t[571] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Max Stock Level is stored — approximated from days-of-cover (qty ÷ trailing 90-day avg daily consumption); flagged when cover exceeds 180 days. ", -1)),
              s("div", ek, [
                s("div", ak, [
                  t[569] || (t[569] = s("span", { class: "bucket-label" }, "Excess Stock Value", -1)),
                  s("span", ok, a(d(O.value.excess_stock.total_value)), 1)
                ])
              ]),
              O.value.excess_stock.rows.length ? (l(), o("table", lk, [
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
                    s("td", nk, a(p(e.actual_qty)), 1),
                    s("td", ik, a(e.avg_daily_consumption), 1),
                    s("td", dk, a(e.days_of_cover), 1),
                    s("td", rk, a(p(e.excess_qty)), 1),
                    s("td", uk, a(d(e.excess_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ck, "No excess stock identified."))
            ], 64)) : bs.value === "adjustment" ? (l(), o(u, { key: 8 }, [
              s("div", mk, [
                s("div", vk, [
                  t[572] || (t[572] = s("span", { class: "bucket-label" }, "Adjustments", -1)),
                  s("span", _k, a(O.value.stock_adjustment.entry_count), 1)
                ]),
                s("div", pk, [
                  t[573] || (t[573] = s("span", { class: "bucket-label" }, "Increase Value", -1)),
                  s("span", yk, a(d(O.value.stock_adjustment.increase_value)), 1)
                ]),
                s("div", bk, [
                  t[574] || (t[574] = s("span", { class: "bucket-label" }, "Decrease Value", -1)),
                  s("span", hk, a(d(O.value.stock_adjustment.decrease_value)), 1)
                ])
              ]),
              O.value.stock_adjustment.rows.length ? (l(), o("table", gk, [
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
                    }, a(p(e.qty)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.value >= 0 ? "" : "red"])
                    }, a(d(e.value)), 3),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", kk, "No stock adjustments in this period."))
            ], 64)) : bs.value === "loss" ? (l(), o(u, { key: 9 }, [
              s("div", fk, [
                s("div", wk, [
                  t[576] || (t[576] = s("span", { class: "bucket-label" }, "Loss Entries", -1)),
                  s("span", xk, a(O.value.stock_loss.loss_count), 1)
                ]),
                s("div", Ck, [
                  t[577] || (t[577] = s("span", { class: "bucket-label" }, "Value Lost", -1)),
                  s("span", Sk, a(d(O.value.stock_loss.loss_value)), 1)
                ])
              ]),
              t[579] || (t[579] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scoped to negative-qty Stock Adjustment entries (physical-count shortfalls). Manufacturing Variance Loss is tracked separately on Work Orders. ", -1)),
              O.value.stock_loss.rows.length ? (l(), o("table", jk, [
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
                    s("td", Mk, a(p(e.qty)), 1),
                    s("td", Dk, a(d(e.value)), 1),
                    s("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Tk, "No stock loss/shortage in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Ok, a(co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "production_mis" ? (l(), o("div", Rk, [
          s("div", Pk, [
            t[581] || (t[581] = C('<div class="bs-page-head-icon prodmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="2" y="7" width="20" height="14" rx="2" data-v-bfa37a0c></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Production MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Production plan vs actual, WIP status, material availability and consumption, cost, efficiency and rejection/scrap for work orders.</div></div>', 2)),
            s("div", Ik, [
              s("div", Vk, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", Nk, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[166] || (t[166] = (e) => es("exportProductionMisCSV")),
                  disabled: !T.value
                }, [...t[580] || (t[580] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Ek),
                w.value === "exportProductionMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[167] || (t[167] = (e) => w.value = "")
                  }),
                  s("div", qk, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[168] || (t[168] = (e) => {
                        w.value = "", Bo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[169] || (t[169] = (e) => {
                        w.value = "", Y(Bo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Bk, [
            (l(), o(u, null, m(Hl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: hs.value === e.key }]),
              onClick: (g) => hs.value = e.key
            }, a(e.label), 11, Ak)), 64))
          ]),
          aa.value ? (l(), o("div", $k)) : T.value ? (l(), o(u, { key: 1 }, [
            hs.value === "plan_vs_actual" ? (l(), o(u, { key: 0 }, [
              s("div", Lk, [
                s("div", Qk, [
                  t[582] || (t[582] = s("span", { class: "bucket-label" }, "Planned Qty", -1)),
                  s("span", Fk, a(p(T.value.plan_vs_actual.totals.planned_qty)), 1)
                ]),
                s("div", Hk, [
                  t[583] || (t[583] = s("span", { class: "bucket-label" }, "Produced Qty", -1)),
                  s("span", zk, a(p(T.value.plan_vs_actual.totals.produced_qty)), 1)
                ])
              ]),
              T.value.plan_vs_actual.rows.length ? (l(), o("table", Wk, [
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
                    s("td", Uk, a(p(e.planned_qty)), 1),
                    s("td", Kk, a(p(e.produced_qty)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty >= 0 ? "green" : "red"])
                    }, a(p(e.variance_qty)), 3),
                    s("td", Gk, a(e.variance_pct != null ? e.variance_pct + "%" : "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Yk, "No production plans posted in this period."))
            ], 64)) : hs.value === "pending" ? (l(), o(u, { key: 1 }, [
              s("div", Jk, " Live snapshot of open Work Orders (not reconstructed as of " + a(y.value) + "). ", 1),
              s("div", Zk, [
                s("div", Xk, [
                  t[585] || (t[585] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", sf, a(p(T.value.production_pending.pending_qty_total)), 1)
                ]),
                s("div", tf, [
                  t[586] || (t[586] = s("span", { class: "bucket-label" }, "Overdue Work Orders", -1)),
                  s("span", ef, a(T.value.production_pending.overdue_count), 1)
                ])
              ]),
              T.value.production_pending.rows.length ? (l(), o("table", af, [
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
                    s("td", of, a(p(e.qty)), 1),
                    s("td", lf, a(p(e.produced_qty)), 1),
                    s("td", nf, a(p(e.pending_qty)), 1),
                    s("td", {
                      class: c(e.overdue ? "red fw-600" : "")
                    }, a(e.planned_end_date || "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", df, "No pending production."))
            ], 64)) : hs.value === "wip" ? (l(), o(u, { key: 2 }, [
              s("div", rf, [
                s("div", uf, [
                  t[588] || (t[588] = s("span", { class: "bucket-label" }, "Work Orders In Process", -1)),
                  s("span", cf, a(T.value.wip_status.wo_count), 1)
                ]),
                s("div", mf, [
                  t[589] || (t[589] = s("span", { class: "bucket-label" }, "WIP Stock Value", -1)),
                  s("span", vf, a(d(T.value.wip_status.wip_value_total)), 1)
                ])
              ]),
              T.value.wip_status.rows.length ? (l(), o("table", _f, [
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
                    s("td", pf, a(p(e.qty)), 1),
                    s("td", yf, a(p(e.produced_qty)), 1),
                    s("td", bf, a(e.pct_complete) + "%", 1),
                    s("td", null, a(e.wip_warehouse || "—"), 1),
                    s("td", hf, a(d(e.wip_stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gf, "No Work Orders in process."))
            ], 64)) : hs.value === "material_availability" ? (l(), o(u, { key: 3 }, [
              t[593] || (t[593] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Live shortage check: still-to-issue qty on open Work Orders vs current stock at the source warehouse. ", -1)),
              s("div", kf, [
                s("div", ff, [
                  t[591] || (t[591] = s("span", { class: "bucket-label" }, "Items Short", -1)),
                  s("span", wf, a(T.value.raw_material_availability.shortage_count), 1)
                ])
              ]),
              T.value.raw_material_availability.rows.length ? (l(), o("table", xf, [
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
                    s("td", Cf, a(p(e.still_to_issue)), 1),
                    s("td", Sf, a(p(e.available_qty)), 1),
                    s("td", jf, a(p(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Mf, "No material shortages against open Work Orders."))
            ], 64)) : hs.value === "material_consumption" ? (l(), o(u, { key: 4 }, [
              s("div", Df, [
                t[594] || (t[594] = s("span", null, "Total Material Consumed", -1)),
                s("span", Tf, a(f(S)(T.value.material_consumption.total_value)), 1)
              ]),
              T.value.material_consumption.rows.length ? (l(), o("table", Of, [
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
                    s("td", Rf, a(p(e.qty_consumed)), 1),
                    s("td", Pf, a(e.transactions), 1),
                    s("td", If, a(d(e.value_consumed)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Vf, "No material consumed against Work Orders in this period."))
            ], 64)) : hs.value === "material_variance" ? (l(), o(u, { key: 5 }, [
              s("div", Nf, [
                s("div", Ef, [
                  t[596] || (t[596] = s("span", { class: "bucket-label" }, "Net Variance Value", -1)),
                  s("span", {
                    class: c(["mis-summary-val", T.value.material_variance.net_variance_value >= 0 ? "red" : "green"])
                  }, a(d(T.value.material_variance.net_variance_value)), 3)
                ])
              ]),
              T.value.material_variance.rows.length ? (l(), o("table", qf, [
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
                    s("td", Bf, a(p(e.required_qty)), 1),
                    s("td", Af, a(p(e.consumed_qty)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty > 0 ? "red" : "green"])
                    }, a(p(e.variance_qty)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.variance_value > 0 ? "red" : "green"])
                    }, a(d(e.variance_value)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $f, "No material variance in this period."))
            ], 64)) : hs.value === "production_cost" ? (l(), o(u, { key: 6 }, [
              s("div", Lf, [
                s("div", Qf, [
                  t[598] || (t[598] = s("span", { class: "bucket-label" }, "Material Value", -1)),
                  s("span", Ff, a(d(T.value.production_cost.total_material_value)), 1)
                ]),
                s("div", Hf, [
                  t[599] || (t[599] = s("span", { class: "bucket-label" }, "Operating Cost", -1)),
                  s("span", zf, a(d(T.value.production_cost.total_operating_cost)), 1)
                ]),
                s("div", Wf, [
                  t[600] || (t[600] = s("span", { class: "bucket-label" }, "Total Production Cost", -1)),
                  s("span", Uf, a(d(T.value.production_cost.total_cost)), 1)
                ])
              ]),
              T.value.production_cost.rows.length ? (l(), o("table", Kf, [
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
                    s("td", Gf, a(p(e.produced_qty)), 1),
                    s("td", Yf, a(d(e.material_value)), 1),
                    s("td", Jf, a(d(e.operating_cost)), 1),
                    s("td", Zf, a(d(e.actual_total_cost)), 1),
                    s("td", Xf, a(e.actual_cost_per_unit != null ? d(e.actual_cost_per_unit) : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.cost_variance_per_unit > 0 ? "red" : e.cost_variance_per_unit < 0 ? "green" : ""])
                    }, a(e.standard_cost_per_unit != null ? d(e.standard_cost_per_unit) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", sw, "No production cost recorded in this period."))
            ], 64)) : hs.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              s("div", tw, [
                s("div", ew, [
                  t[602] || (t[602] = s("span", { class: "bucket-label" }, "Avg Efficiency", -1)),
                  s("span", aw, a(T.value.production_efficiency.avg_efficiency_pct != null ? T.value.production_efficiency.avg_efficiency_pct + "%" : "—"), 1)
                ])
              ]),
              T.value.production_efficiency.rows.length ? (l(), o("table", ow, [
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
                    s("td", lw, a(p(e.planned_mins)), 1),
                    s("td", nw, a(p(e.actual_mins)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.efficiency_pct >= 100 ? "green" : "red"])
                    }, a(e.efficiency_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", iw, "No operation time logged for Work Orders scheduled in this period."))
            ], 64)) : hs.value === "rejection" ? (l(), o(u, { key: 8 }, [
              t[607] || (t[607] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Job Card scrap items not flagged as process loss — defective pieces that may be reworked. ", -1)),
              s("div", dw, [
                s("div", rw, [
                  t[604] || (t[604] = s("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  s("span", uw, a(p(T.value.rejection_rework.qty_total)), 1)
                ]),
                s("div", cw, [
                  t[605] || (t[605] = s("span", { class: "bucket-label" }, "Value", -1)),
                  s("span", mw, a(d(T.value.rejection_rework.value_total)), 1)
                ])
              ]),
              T.value.rejection_rework.rows.length ? (l(), o("table", vw, [
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
                    s("td", _w, a(p(e.qty)), 1),
                    s("td", pw, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yw, "No rejection/rework recorded in this period."))
            ], 64)) : hs.value === "scrap" ? (l(), o(u, { key: 9 }, [
              t[611] || (t[611] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scrap output rows on Manufacture stock entries, plus process/yield loss recorded on those entries. ", -1)),
              s("div", bw, [
                s("div", hw, [
                  t[608] || (t[608] = s("span", { class: "bucket-label" }, "Scrap Value", -1)),
                  s("span", gw, a(d(T.value.scrap_wastage.scrap_value_total)), 1)
                ]),
                s("div", kw, [
                  t[609] || (t[609] = s("span", { class: "bucket-label" }, "Process Loss Qty", -1)),
                  s("span", fw, a(p(T.value.scrap_wastage.process_loss_qty_total)), 1)
                ])
              ]),
              T.value.scrap_wastage.rows.length ? (l(), o("table", ww, [
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
                    s("td", xw, a(p(e.qty)), 1),
                    s("td", Cw, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Sw, "No scrap output recorded in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", jw, a(mo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "product_mis" ? (l(), o("div", Mw, [
          s("div", Dw, [
            t[613] || (t[613] = C('<div class="bs-page-head-icon prdmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-bfa37a0c></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Product MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Product-wise sales, profit, cost, margin, production, stock and wastage, plus top and low selling products for the period.</div></div>', 2)),
            s("div", Tw, [
              s("div", Ow, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", Rw, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[170] || (t[170] = (e) => es("exportProductMisCSV")),
                  disabled: !A.value
                }, [...t[612] || (t[612] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Pw),
                w.value === "exportProductMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[171] || (t[171] = (e) => w.value = "")
                  }),
                  s("div", Iw, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[172] || (t[172] = (e) => {
                        w.value = "", Ao();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[173] || (t[173] = (e) => {
                        w.value = "", Y(Ao);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Vw, [
            (l(), o(u, null, m(zl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Cs.value === e.key }]),
              onClick: (g) => Cs.value = e.key
            }, a(e.label), 11, Nw)), 64))
          ]),
          oa.value ? (l(), o("div", Ew)) : A.value ? (l(), o(u, { key: 1 }, [
            Cs.value === "sales" ? (l(), o(u, { key: 0 }, [
              s("div", qw, [
                s("div", Bw, [
                  t[614] || (t[614] = s("span", { class: "bucket-label" }, "Qty Sold", -1)),
                  s("span", Aw, a(p(A.value.product_wise_sales.totals.qty_sold)), 1)
                ]),
                s("div", $w, [
                  t[615] || (t[615] = s("span", { class: "bucket-label" }, "Total Revenue", -1)),
                  s("span", Lw, a(d(A.value.product_wise_sales.totals.total_amount)), 1)
                ])
              ]),
              A.value.product_wise_sales.rows.length ? (l(), o("table", Qw, [
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
                    s("td", Fw, a(e.invoice_count), 1),
                    s("td", Hw, a(p(e.qty_sold)), 1),
                    s("td", zw, a(d(e.avg_rate)), 1),
                    s("td", Ww, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Uw, "No sales in this period."))
            ], 64)) : Cs.value === "profit" ? (l(), o(u, { key: 1 }, [
              s("div", Kw, [
                s("div", Gw, [
                  t[617] || (t[617] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", Yw, a(d(A.value.product_wise_profit.totals.revenue)), 1)
                ]),
                s("div", Jw, [
                  t[618] || (t[618] = s("span", { class: "bucket-label" }, "Cost", -1)),
                  s("span", Zw, a(d(A.value.product_wise_profit.totals.total_cost)), 1)
                ]),
                s("div", Xw, [
                  t[619] || (t[619] = s("span", { class: "bucket-label" }, "Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", A.value.product_wise_profit.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(A.value.product_wise_profit.totals.profit)), 3)
                ])
              ]),
              A.value.product_wise_profit.rows.length ? (l(), o("table", s3, [
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
                    s("td", t3, a(d(e.revenue)), 1),
                    s("td", e3, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", a3, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", o3, "No sales in this period."))
            ], 64)) : Cs.value === "cost" ? (l(), o(u, { key: 2 }, [
              t[622] || (t[622] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              A.value.product_wise_cost.rows.length ? (l(), o("table", l3, [
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
                    s("td", n3, a(p(e.qty_sold)), 1),
                    s("td", i3, a(d(e.cost_rate)), 1),
                    s("td", d3, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", r3, "No sales in this period."))
            ], 64)) : Cs.value === "margin" ? (l(), o(u, { key: 3 }, [
              A.value.product_wise_margin.rows.length ? (l(), o("table", u3, [
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
                    s("td", c3, a(d(e.revenue)), 1),
                    s("td", m3, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.margin_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", v3, "No sales in this period."))
            ], 64)) : Cs.value === "production" ? (l(), o(u, { key: 4 }, [
              s("div", _3, " Finished-goods receipts on Manufacture stock entries posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              A.value.product_wise_production.rows.length ? (l(), o("table", p3, [
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
                    s("td", y3, a(p(e.qty_produced)), 1),
                    s("td", b3, a(d(e.value_produced)), 1),
                    s("td", h3, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", g3, "No production recorded in this period."))
            ], 64)) : Cs.value === "stock" ? (l(), o(u, { key: 5 }, [
              A.value.product_wise_stock.rows.length ? (l(), o("table", k3, [
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
                    s("td", f3, a(p(e.total_qty)), 1),
                    s("td", w3, a(d(e.valuation_rate)), 1),
                    s("td", x3, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", C3, "No stock on hand."))
            ], 64)) : Cs.value === "wastage" ? (l(), o(u, { key: 6 }, [
              s("div", S3, " Scrap-flagged rows on Manufacture stock entries posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              s("div", j3, [
                s("div", M3, [
                  t[626] || (t[626] = s("span", { class: "bucket-label" }, "Qty Scrapped", -1)),
                  s("span", D3, a(p(A.value.product_wise_wastage.totals.qty_scrapped)), 1)
                ]),
                s("div", T3, [
                  t[627] || (t[627] = s("span", { class: "bucket-label" }, "Value Scrapped", -1)),
                  s("span", O3, a(d(A.value.product_wise_wastage.totals.value_scrapped)), 1)
                ])
              ]),
              A.value.product_wise_wastage.rows.length ? (l(), o("table", R3, [
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
                    s("td", P3, a(p(e.qty_scrapped)), 1),
                    s("td", I3, a(d(e.value_scrapped)), 1),
                    s("td", V3, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", N3, "No wastage recorded in this period."))
            ], 64)) : Cs.value === "top_selling" ? (l(), o(u, { key: 7 }, [
              t[630] || (t[630] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Top 10 items by quantity sold in this period.", -1)),
              A.value.top_selling.rows.length ? (l(), o("table", E3, [
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
                    s("td", q3, a(p(e.qty_sold)), 1),
                    s("td", B3, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", A3, "No sales in this period."))
            ], 64)) : Cs.value === "low_selling" ? (l(), o(u, { key: 8 }, [
              t[632] || (t[632] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Bottom 10 items by quantity sold in this period (items with at least one sale).", -1)),
              A.value.low_selling.rows.length ? (l(), o("table", $3, [
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
                    s("td", L3, a(p(e.qty_sold)), 1),
                    s("td", Q3, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", F3, "No sales in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", H3, a(vo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "dispatch_mis" ? (l(), o("div", z3, [
          s("div", W3, [
            t[634] || (t[634] = C('<div class="bs-page-head-icon dmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="1" y="3" width="15" height="13" data-v-bfa37a0c></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-bfa37a0c></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-bfa37a0c></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-bfa37a0c></circle></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Dispatch &amp; Delivery MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Dispatch summary, pending and delayed deliveries, customer-wise pending delivery and transport-wise dispatch for the period.</div></div>', 2)),
            s("div", U3, [
              s("div", K3, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", G3, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[174] || (t[174] = (e) => es("exportDispatchMisCSV")),
                  disabled: !z.value
                }, [...t[633] || (t[633] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Y3),
                w.value === "exportDispatchMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[175] || (t[175] = (e) => w.value = "")
                  }),
                  s("div", J3, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[176] || (t[176] = (e) => {
                        w.value = "", $o();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[177] || (t[177] = (e) => {
                        w.value = "", Y($o);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Z3, [
            (l(), o(u, null, m(Wl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Us.value === e.key }]),
              onClick: (g) => Us.value = e.key
            }, a(e.label), 11, X3)), 64))
          ]),
          la.value ? (l(), o("div", s4)) : z.value ? (l(), o(u, { key: 1 }, [
            Us.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", t4, " Delivery Notes posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              s("div", e4, [
                s("div", a4, [
                  t[635] || (t[635] = s("span", { class: "bucket-label" }, "Dispatches", -1)),
                  s("span", o4, a(p(z.value.dispatch_summary.dispatch_count)), 1)
                ]),
                s("div", l4, [
                  t[636] || (t[636] = s("span", { class: "bucket-label" }, "Total Qty Dispatched", -1)),
                  s("span", n4, a(p(z.value.dispatch_summary.total_qty)), 1)
                ]),
                s("div", i4, [
                  t[637] || (t[637] = s("span", { class: "bucket-label" }, "Total Value", -1)),
                  s("span", d4, a(d(z.value.dispatch_summary.total_value)), 1)
                ]),
                s("div", r4, [
                  t[638] || (t[638] = s("span", { class: "bucket-label" }, "Customers Served", -1)),
                  s("span", u4, a(p(z.value.dispatch_summary.customer_count)), 1)
                ]),
                s("div", c4, [
                  t[639] || (t[639] = s("span", { class: "bucket-label" }, "Transporters Used", -1)),
                  s("span", m4, a(p(z.value.dispatch_summary.transporter_count)), 1)
                ]),
                s("div", v4, [
                  t[640] || (t[640] = s("span", { class: "bucket-label" }, "Avg Qty / Dispatch", -1)),
                  s("span", _4, a(p(z.value.dispatch_summary.avg_qty_per_dispatch)), 1)
                ])
              ])
            ], 64)) : Us.value === "pending_dispatch" ? (l(), o(u, { key: 1 }, [
              s("div", p4, " Sales Order lines with nothing dispatched yet, as of " + a(y.value) + ". ", 1),
              s("div", y4, [
                s("div", b4, [
                  t[641] || (t[641] = s("span", { class: "bucket-label" }, "Orders", -1)),
                  s("span", h4, a(z.value.pending_dispatch.order_count), 1)
                ]),
                s("div", g4, [
                  t[642] || (t[642] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", k4, a(p(z.value.pending_dispatch.pending_qty)), 1)
                ]),
                s("div", f4, [
                  t[643] || (t[643] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", w4, a(d(z.value.pending_dispatch.pending_value)), 1)
                ])
              ]),
              z.value.pending_dispatch.rows.length ? (l(), o("table", x4, [
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
                    s("td", C4, a(p(e.ordered_qty)), 1),
                    s("td", S4, a(p(e.pending_qty)), 1),
                    s("td", j4, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", M4, "No pending dispatch as of this date."))
            ], 64)) : Us.value === "delivery_pending" ? (l(), o(u, { key: 2 }, [
              s("div", D4, " All undelivered Sales Order quantity as of " + a(y.value) + ", including partially dispatched lines. ", 1),
              s("div", T4, [
                s("div", O4, [
                  t[645] || (t[645] = s("span", { class: "bucket-label" }, "Orders", -1)),
                  s("span", R4, a(z.value.delivery_pending.order_count), 1)
                ]),
                s("div", P4, [
                  t[646] || (t[646] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", I4, a(p(z.value.delivery_pending.pending_qty)), 1)
                ]),
                s("div", V4, [
                  t[647] || (t[647] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", N4, a(d(z.value.delivery_pending.pending_value)), 1)
                ])
              ]),
              z.value.delivery_pending.rows.length ? (l(), o("table", E4, [
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
                    s("td", q4, a(p(e.ordered_qty)), 1),
                    s("td", B4, a(p(e.delivered_qty)), 1),
                    s("td", A4, a(p(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $4, "No pending deliveries as of this date."))
            ], 64)) : Us.value === "delayed_delivery" ? (l(), o(u, { key: 3 }, [
              t[653] || (t[653] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Delivery Pending lines whose Delivery Date has already passed. ", -1)),
              s("div", L4, [
                s("div", Q4, [
                  t[649] || (t[649] = s("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  s("span", F4, a(z.value.delayed_delivery.order_count), 1)
                ]),
                s("div", H4, [
                  t[650] || (t[650] = s("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  s("span", z4, a(p(z.value.delayed_delivery.pending_qty)), 1)
                ]),
                s("div", W4, [
                  t[651] || (t[651] = s("span", { class: "bucket-label" }, "Pending Value", -1)),
                  s("span", U4, a(d(z.value.delayed_delivery.pending_value)), 1)
                ])
              ]),
              z.value.delayed_delivery.rows.length ? (l(), o("table", K4, [
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
                    s("td", G4, a(e.days_overdue), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.item_name || e.item_code), 1),
                    s("td", Y4, a(p(e.pending_qty)), 1),
                    s("td", J4, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Z4, "No delayed deliveries as of today."))
            ], 64)) : Us.value === "customer_pending" ? (l(), o(u, { key: 4 }, [
              z.value.customer_wise_pending_delivery.rows.length ? (l(), o("table", X4, [
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
                    s("td", s7, a(e.order_count), 1),
                    s("td", t7, a(p(e.pending_qty)), 1),
                    s("td", e7, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a7, "No pending deliveries as of this date."))
            ], 64)) : Us.value === "transport_wise" ? (l(), o(u, { key: 5 }, [
              s("div", o7, " Delivery Notes posted between " + a(x.value) + " and " + a(y.value) + ", grouped by Transporter. ", 1),
              z.value.transport_wise_dispatch.rows.length ? (l(), o("table", l7, [
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
                    s("td", n7, a(e.dispatch_count), 1),
                    s("td", i7, a(e.customer_count), 1),
                    s("td", d7, a(p(e.total_qty)), 1),
                    s("td", r7, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", u7, "No dispatches in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", c7, a(_o.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "order_mis" ? (l(), o("div", m7, [
          s("div", v7, [
            t[657] || (t[657] = C('<div class="bs-page-head-icon omis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M9 11l3 3L22 4" data-v-bfa37a0c></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Order MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Sales order pipeline — new, pending, under production, ready for dispatch, delayed, delivered, cancelled and order-wise profitability.</div></div>', 2)),
            s("div", _7, [
              s("div", p7, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", y7, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[178] || (t[178] = (e) => es("exportOrderMisCSV")),
                  disabled: !B.value
                }, [...t[656] || (t[656] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, b7),
                w.value === "exportOrderMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[179] || (t[179] = (e) => w.value = "")
                  }),
                  s("div", h7, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[180] || (t[180] = (e) => {
                        w.value = "", Lo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[181] || (t[181] = (e) => {
                        w.value = "", Y(Lo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", g7, [
            (l(), o(u, null, m(Ul, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: vs.value === e.key }]),
              onClick: (g) => vs.value = e.key
            }, a(e.label), 11, k7)), 64))
          ]),
          na.value ? (l(), o("div", f7)) : B.value ? (l(), o(u, { key: 1 }, [
            vs.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", w7, " Sales Orders placed between " + a(x.value) + " and " + a(y.value) + ". Under Production / Ready for Dispatch are derived from linked Work Orders; Delayed is based on today's date. ", 1),
              s("div", x7, [
                s("div", C7, [
                  t[658] || (t[658] = s("span", { class: "bucket-label" }, "Total Orders", -1)),
                  s("span", S7, a(p(B.value.summary.total_orders.count)), 1)
                ]),
                s("div", j7, [
                  t[659] || (t[659] = s("span", { class: "bucket-label" }, "New Orders", -1)),
                  s("span", M7, a(p(B.value.summary.new_orders.count)), 1)
                ]),
                s("div", D7, [
                  t[660] || (t[660] = s("span", { class: "bucket-label" }, "Pending Orders", -1)),
                  s("span", T7, a(p(B.value.summary.pending_orders.count)), 1)
                ]),
                s("div", O7, [
                  t[661] || (t[661] = s("span", { class: "bucket-label" }, "Under Production", -1)),
                  s("span", R7, a(p(B.value.summary.under_production.count)), 1)
                ]),
                s("div", P7, [
                  t[662] || (t[662] = s("span", { class: "bucket-label" }, "Ready for Dispatch", -1)),
                  s("span", I7, a(p(B.value.summary.ready_for_dispatch.count)), 1)
                ]),
                s("div", V7, [
                  t[663] || (t[663] = s("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  s("span", N7, a(p(B.value.summary.delayed_orders.count)), 1)
                ]),
                s("div", E7, [
                  t[664] || (t[664] = s("span", { class: "bucket-label" }, "Delivered Orders", -1)),
                  s("span", q7, a(p(B.value.summary.delivered_orders.count)), 1)
                ]),
                s("div", B7, [
                  t[665] || (t[665] = s("span", { class: "bucket-label" }, "Cancelled Orders", -1)),
                  s("span", A7, a(p(B.value.summary.cancelled_orders.count)), 1)
                ])
              ])
            ], 64)) : vs.value === "total" ? (l(), o(u, { key: 1 }, [
              B.value.summary.total_orders.rows.length ? (l(), o("table", $7, [
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
                      s("span", L7, a(e.status), 1)
                    ]),
                    s("td", Q7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", F7, "No orders in this period."))
            ], 64)) : vs.value === "new" ? (l(), o(u, { key: 2 }, [
              B.value.summary.new_orders.rows.length ? (l(), o("table", H7, [
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
                    s("td", z7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", W7, "No new (unconfirmed) orders in this period."))
            ], 64)) : vs.value === "pending" ? (l(), o(u, { key: 3 }, [
              B.value.summary.pending_orders.rows.length ? (l(), o("table", U7, [
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
                      s("span", K7, a(e.status), 1)
                    ]),
                    s("td", G7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Y7, "No pending orders in this period."))
            ], 64)) : vs.value === "under_production" ? (l(), o(u, { key: 4 }, [
              B.value.summary.under_production.rows.length ? (l(), o("table", J7, [
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
                    s("td", Z7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", X7, "No orders currently under production."))
            ], 64)) : vs.value === "ready_for_dispatch" ? (l(), o(u, { key: 5 }, [
              B.value.summary.ready_for_dispatch.rows.length ? (l(), o("table", s6, [
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
                    s("td", t6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", e6, "No orders ready for dispatch."))
            ], 64)) : vs.value === "delayed" ? (l(), o(u, { key: 6 }, [
              B.value.summary.delayed_orders.rows.length ? (l(), o("table", a6, [
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
                    s("td", o6, a(e.days_overdue), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, [
                      s("span", l6, a(e.status), 1)
                    ]),
                    s("td", n6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", i6, "No delayed orders as of today."))
            ], 64)) : vs.value === "delivered" ? (l(), o(u, { key: 7 }, [
              B.value.summary.delivered_orders.rows.length ? (l(), o("table", d6, [
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
                      s("span", r6, a(e.status), 1)
                    ]),
                    s("td", u6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", c6, "No delivered orders in this period."))
            ], 64)) : vs.value === "cancelled" ? (l(), o(u, { key: 8 }, [
              B.value.summary.cancelled_orders.rows.length ? (l(), o("table", m6, [
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
                    s("td", v6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _6, "No cancelled orders in this period."))
            ], 64)) : vs.value === "order_value" ? (l(), o(u, { key: 9 }, [
              s("div", p6, [
                s("div", y6, [
                  t[674] || (t[674] = s("span", { class: "bucket-label" }, "Total Order Value", -1)),
                  s("span", b6, a(d(B.value.order_value.total_value)), 1)
                ])
              ]),
              B.value.order_value.by_status.length ? (l(), o("table", h6, [
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
                      s("span", g6, a(e.status), 1)
                    ]),
                    s("td", k6, a(e.order_count), 1),
                    s("td", f6, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w6, "No orders in this period."))
            ], 64)) : vs.value === "profitability" ? (l(), o(u, { key: 10 }, [
              t[680] || (t[680] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate — applied to Sales Order lines whether or not the order has been invoiced yet. ", -1)),
              s("div", x6, [
                s("div", C6, [
                  t[676] || (t[676] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", S6, a(d(B.value.order_profitability.totals.revenue)), 1)
                ]),
                s("div", j6, [
                  t[677] || (t[677] = s("span", { class: "bucket-label" }, "Cost", -1)),
                  s("span", M6, a(d(B.value.order_profitability.totals.total_cost)), 1)
                ]),
                s("div", D6, [
                  t[678] || (t[678] = s("span", { class: "bucket-label" }, "Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", B.value.order_profitability.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(B.value.order_profitability.totals.profit)), 3)
                ])
              ]),
              B.value.order_profitability.rows.length ? (l(), o("table", T6, [
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
                    s("td", O6, a(d(e.revenue)), 1),
                    s("td", R6, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", P6, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", I6, "No orders in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", V6, a(po.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "profitability_mis" ? (l(), o("div", N6, [
          s("div", E6, [
            t[682] || (t[682] = C('<div class="bs-page-head-icon pfmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><line x1="12" y1="1" x2="12" y2="23" data-v-bfa37a0c></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Profitability MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Gross profit and margin by product, customer, order, branch and salesperson, plus the monthly profit trend. Excludes sales returns; cost is current average valuation, falling back to Standard Buying Rate.</div></div>', 2)),
            s("div", q6, [
              s("div", B6, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", A6, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[182] || (t[182] = (e) => es("exportProfitabilityMisCSV")),
                  disabled: !W.value
                }, [...t[681] || (t[681] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, $6),
                w.value === "exportProfitabilityMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[183] || (t[183] = (e) => w.value = "")
                  }),
                  s("div", L6, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[184] || (t[184] = (e) => {
                        w.value = "", Qo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[185] || (t[185] = (e) => {
                        w.value = "", Y(Qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Q6, [
            (l(), o(u, null, m(Kl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ls.value === e.key }]),
              onClick: (g) => Ls.value = e.key
            }, a(e.label), 11, F6)), 64))
          ]),
          ia.value ? (l(), o("div", H6)) : W.value ? (l(), o(u, { key: 1 }, [
            Ls.value === "summary" ? (l(), o(u, { key: 0 }, [
              t[689] || (t[689] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Excludes Sales Returns. Cost is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              s("div", z6, [
                s("div", W6, [
                  t[683] || (t[683] = s("span", { class: "bucket-label" }, "Gross Sales", -1)),
                  s("span", U6, a(d(W.value.summary.gross_sales)), 1)
                ]),
                s("div", K6, [
                  t[684] || (t[684] = s("span", { class: "bucket-label" }, "Net Sales", -1)),
                  s("span", G6, a(d(W.value.summary.net_sales)), 1)
                ]),
                s("div", Y6, [
                  t[685] || (t[685] = s("span", { class: "bucket-label" }, "Total Cost", -1)),
                  s("span", J6, a(d(W.value.summary.total_cost)), 1)
                ]),
                s("div", Z6, [
                  t[686] || (t[686] = s("span", { class: "bucket-label" }, "Gross Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_profit >= 0 ? "green" : "red"])
                  }, a(d(W.value.summary.gross_profit)), 3)
                ]),
                s("div", X6, [
                  t[687] || (t[687] = s("span", { class: "bucket-label" }, "Gross Margin %", -1)),
                  s("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_margin_pct >= 0 ? "green" : "red"])
                  }, a(W.value.summary.gross_margin_pct.toFixed(1)) + "%", 3)
                ]),
                s("div", s5, [
                  t[688] || (t[688] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                  s("span", t5, a(p(W.value.summary.invoice_count)), 1)
                ])
              ])
            ], 64)) : Ls.value === "product" ? (l(), o("table", e5, [
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
                  s("td", a5, a(d(e.revenue)), 1),
                  s("td", o5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", l5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ls.value === "customer" ? (l(), o("table", n5, [
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
                  s("td", i5, a(e.invoice_count), 1),
                  s("td", d5, a(d(e.revenue)), 1),
                  s("td", r5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", u5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ls.value === "order" ? (l(), o(u, { key: 3 }, [
              t[695] || (t[695] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Invoiced revenue and estimated cost, rolled up by the Sales Order each invoice line references. ", -1)),
              W.value.order_wise_profit.rows.length ? (l(), o("table", c5, [
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
                    s("td", m5, a(d(e.revenue)), 1),
                    s("td", v5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", _5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128)),
                  W.value.order_wise_profit.no_order.revenue ? (l(), o("tr", p5, [
                    t[692] || (t[692] = s("td", {
                      colspan: "2",
                      style: { color: "#94a3b8" }
                    }, "Invoices not linked to a Sales Order", -1)),
                    s("td", y5, a(d(W.value.order_wise_profit.no_order.revenue)), 1),
                    s("td", b5, a(d(W.value.order_wise_profit.no_order.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", W.value.order_wise_profit.no_order.profit >= 0 ? "green" : "red"])
                    }, a(d(W.value.order_wise_profit.no_order.profit)), 3),
                    t[693] || (t[693] = s("td", { class: "ta-r mono-sm" }, "—", -1))
                  ])) : b("", !0)
                ])
              ])) : (l(), o("div", h5, "No order-linked sales in this period."))
            ], 64)) : Ls.value === "branch" ? (l(), o(u, { key: 4 }, [
              t[697] || (t[697] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Branch doctype exists in this app — Cost Center is used as the branch grouping. ", -1)),
              W.value.branch_wise_profit.rows.length ? (l(), o("table", g5, [
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
                    s("td", k5, a(d(e.revenue)), 1),
                    s("td", f5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", w5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", x5, "No sales in this period."))
            ], 64)) : Ls.value === "salesperson" ? (l(), o("table", C5, [
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
                  s("td", S5, a(d(e.revenue)), 1),
                  s("td", j5, a(d(e.cost)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  s("td", M5, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Ls.value === "monthly_trend" ? (l(), o(u, { key: 6 }, [
              W.value.monthly_profit_trend.rows.length ? (l(), o("table", D5, [
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
                    s("td", T5, a(d(e.revenue)), 1),
                    s("td", O5, a(d(e.cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", R5, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", P5, "No sales in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", I5, a(yo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "expense_mis" ? (l(), o("div", V5, [
          s("div", N5, [
            t[701] || (t[701] = C('<div class="bs-page-head-icon emis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="2" y="7" width="20" height="14" rx="2" data-v-bfa37a0c></rect><path d="M2 10h20" data-v-bfa37a0c></path><path d="M6 15h4" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Expense MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Total expenses by department and category, budget vs actual, fixed vs variable, trend and unusual/excess spend. Submitted Expense records only — Purchase Invoices and GL journal entries are not included here.</div></div>', 2)),
            s("div", E5, [
              s("div", q5, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", B5, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[186] || (t[186] = (e) => es("exportExpenseMisCSV")),
                  disabled: !U.value
                }, [...t[700] || (t[700] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, A5),
                w.value === "exportExpenseMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[187] || (t[187] = (e) => w.value = "")
                  }),
                  s("div", $5, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[188] || (t[188] = (e) => {
                        w.value = "", Fo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[189] || (t[189] = (e) => {
                        w.value = "", Y(Fo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", L5, [
            (l(), o(u, null, m(Gl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Is.value === e.key }]),
              onClick: (g) => Is.value = e.key
            }, a(e.label), 11, Q5)), 64))
          ]),
          da.value ? (l(), o("div", F5)) : U.value ? (l(), o(u, { key: 1 }, [
            Is.value === "summary" ? (l(), o(u, { key: 0 }, [
              t[707] || (t[707] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Submitted Expense records only (see Expenses). Purchase Invoices and GL journal entries are not included here. ", -1)),
              s("div", H5, [
                s("div", z5, [
                  t[702] || (t[702] = s("span", { class: "bucket-label" }, "Total Expenses", -1)),
                  s("span", W5, a(d(U.value.summary.total_amount)), 1)
                ]),
                s("div", U5, [
                  t[703] || (t[703] = s("span", { class: "bucket-label" }, "Net (excl. Tax)", -1)),
                  s("span", K5, a(d(U.value.summary.net_amount)), 1)
                ]),
                s("div", G5, [
                  t[704] || (t[704] = s("span", { class: "bucket-label" }, "Tax Amount", -1)),
                  s("span", Y5, a(d(U.value.summary.total_tax)), 1)
                ]),
                s("div", J5, [
                  t[705] || (t[705] = s("span", { class: "bucket-label" }, "Expense Count", -1)),
                  s("span", Z5, a(p(U.value.summary.expense_count)), 1)
                ]),
                s("div", X5, [
                  t[706] || (t[706] = s("span", { class: "bucket-label" }, "Avg Expense", -1)),
                  s("span", sx, a(d(U.value.summary.avg_expense)), 1)
                ])
              ])
            ], 64)) : Is.value === "department" ? (l(), o(u, { key: 1 }, [
              t[709] || (t[709] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Department doctype exists in this app — Cost Center is used as the department grouping. ", -1)),
              U.value.department_wise.rows.length ? (l(), o("table", tx, [
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
                    s("td", ex, a(e.count), 1),
                    s("td", ax, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ox, "No expenses in this period."))
            ], 64)) : Is.value === "category" ? (l(), o("table", lx, [
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
                  s("td", nx, a(e.count), 1),
                  s("td", ix, a(d(e.amount)), 1),
                  s("td", dx, a(e.pct_of_total.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Is.value === "budget" ? (l(), o(u, { key: 3 }, [
              s("div", rx, " Estimated: each Cost Center's stored budget is prorated to the " + a(U.value.budget_vs_actual.period_days) + "-day selected period from its Annual/Quarterly/Monthly budget period. Cost centers with no budget set are omitted. ", 1),
              U.value.budget_vs_actual.rows.length ? (l(), o("table", ux, [
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
                    s("td", cx, a(d(e.period_budget)), 1),
                    s("td", mx, a(d(e.actual)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance > 0 ? "red" : "green"])
                    }, a(d(e.variance)), 3),
                    s("td", {
                      class: c(["ta-r mono-sm", e.variance > 0 ? "red" : "green"])
                    }, a(e.variance_pct.toFixed(1)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", vx, "No cost centers with a budget set."))
            ], 64)) : Is.value === "fixed" ? (l(), o(u, { key: 4 }, [
              t[714] || (t[714] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Categorised by keyword match on the Expense Category name (rent, salary, insurance, depreciation, EMI, etc.) — no stored Fixed/Variable flag exists. ", -1)),
              s("div", _x, [
                s("div", px, [
                  t[712] || (t[712] = s("span", { class: "bucket-label" }, "Fixed Total", -1)),
                  s("span", yx, a(d(U.value.fixed_expenses.total)), 1)
                ])
              ]),
              U.value.fixed_expenses.rows.length ? (l(), o("table", bx, [
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
                    s("td", gx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", kx, "No categories matched the Fixed-expense keywords in this period."))
            ], 64)) : Is.value === "variable" ? (l(), o(u, { key: 5 }, [
              s("div", fx, [
                s("div", wx, [
                  t[715] || (t[715] = s("span", { class: "bucket-label" }, "Variable Total", -1)),
                  s("span", xx, a(d(U.value.variable_expenses.total)), 1)
                ])
              ]),
              U.value.variable_expenses.rows.length ? (l(), o("table", Cx, [
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
                    s("td", Sx, a(e.count), 1),
                    s("td", jx, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Mx, "No variable-expense categories in this period."))
            ], 64)) : Is.value === "trend" ? (l(), o(u, { key: 6 }, [
              U.value.expense_trend.rows.length ? (l(), o("table", Dx, [
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
                    s("td", Tx, a(e.count), 1),
                    s("td", Ox, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Rx, "No expenses in this period."))
            ], 64)) : Is.value === "unusual" ? (l(), o(u, { key: 7 }, [
              t[719] || (t[719] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Individual expenses flagged as statistical outliers within their own category for this period (mean + 2x std-dev, or 2x average for thin categories). ", -1)),
              U.value.unusual_expenses.rows.length ? (l(), o("table", Px, [
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
                    s("td", Ix, a(d(e.amount)), 1),
                    s("td", Vx, a(d(e.category_avg)), 1),
                    s("td", Nx, a(e.basis), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Ex, "No unusual expenses detected in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", qx, a(bo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "payables_mis" ? (l(), o("div", Bx, [
          s("div", Ax, [
            t[721] || (t[721] = C('<div class="bs-page-head-icon payblmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><circle cx="12" cy="12" r="10" data-v-bfa37a0c></circle><polyline points="12 6 12 12 16 14" data-v-bfa37a0c></polyline></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Payables MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Supplier outstanding, payable ageing, overdue payables, amounts due this week/month, supplier-wise outstanding and payment due forecast.</div></div>', 2)),
            s("div", $x, [
              s("div", Lx, "As of " + a(P(y.value)), 1),
              s("div", Qx, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[190] || (t[190] = (e) => es("exportPayablesMisCSV")),
                  disabled: !X.value
                }, [...t[720] || (t[720] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, Fx),
                w.value === "exportPayablesMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[191] || (t[191] = (e) => w.value = "")
                  }),
                  s("div", Hx, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[192] || (t[192] = (e) => {
                        w.value = "", Ho();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[193] || (t[193] = (e) => {
                        w.value = "", Y(Ho);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", zx, [
            (l(), o(u, null, m(Yl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Qs.value === e.key }]),
              onClick: (g) => Qs.value = e.key
            }, a(e.label), 11, Wx)), 64))
          ]),
          ra.value ? (l(), o("div", Ux)) : X.value ? (l(), o(u, { key: 1 }, [
            Qs.value === "summary" ? (l(), o(u, { key: 0 }, [
              s("div", Kx, " As of " + a(y.value) + ". Submitted Purchase Invoices with a non-zero outstanding balance; Purchase Returns are netted in. ", 1),
              s("div", Gx, [
                s("div", Yx, [
                  t[722] || (t[722] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", Jx, a(d(X.value.summary.total_outstanding)), 1)
                ]),
                s("div", Zx, [
                  t[723] || (t[723] = s("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  s("span", Xx, a(d(X.value.summary.overdue_amount)), 1)
                ]),
                s("div", s8, [
                  t[724] || (t[724] = s("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  s("span", t8, a(d(X.value.summary.not_yet_due_amount)), 1)
                ]),
                s("div", e8, [
                  t[725] || (t[725] = s("span", { class: "bucket-label" }, "Invoices", -1)),
                  s("span", a8, a(p(X.value.summary.invoice_count)), 1)
                ]),
                s("div", o8, [
                  t[726] || (t[726] = s("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  s("span", l8, a(p(X.value.summary.overdue_count)), 1)
                ]),
                s("div", n8, [
                  t[727] || (t[727] = s("span", { class: "bucket-label" }, "Suppliers", -1)),
                  s("span", i8, a(p(X.value.summary.supplier_count)), 1)
                ])
              ])
            ], 64)) : Qs.value === "ageing" ? (l(), o("table", d8, [
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
                  s("td", r8, a(d(e.current)), 1),
                  s("td", u8, a(d(e.days_1_30)), 1),
                  s("td", c8, a(d(e.days_31_60)), 1),
                  s("td", m8, a(d(e.days_61_90)), 1),
                  s("td", v8, a(d(e.days_90_plus)), 1),
                  s("td", _8, a(d(e.total)), 1)
                ]))), 128))
              ])
            ])) : Qs.value === "overdue" ? (l(), o(u, { key: 2 }, [
              X.value.overdue_payables.rows.length ? (l(), o("table", p8, [
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
                    s("td", y8, a(e.overdue_days), 1),
                    s("td", b8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", h8, "No overdue payables as of " + a(y.value) + ".", 1))
            ], 64)) : Qs.value === "due_week" ? (l(), o(u, { key: 3 }, [
              s("div", g8, "Rolling 7 days from " + a(y.value) + ", not yet overdue.", 1),
              X.value.due_this_week.rows.length ? (l(), o("table", k8, [
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
                    s("td", f8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w8, "Nothing due in the next 7 days."))
            ], 64)) : Qs.value === "due_month" ? (l(), o(u, { key: 4 }, [
              s("div", x8, "Calendar month containing " + a(y.value) + " — can include invoices already overdue earlier this month.", 1),
              X.value.due_this_month.rows.length ? (l(), o("table", C8, [
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
                    s("td", S8, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", j8, "Nothing due this month."))
            ], 64)) : Qs.value === "supplier" ? (l(), o("table", M8, [
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
                  s("td", D8, a(e.invoice_count), 1),
                  s("td", T8, a(d(e.outstanding)), 1),
                  s("td", {
                    class: c(["ta-r mono-sm", e.overdue_amount ? "red" : ""])
                  }, a(d(e.overdue_amount)), 3),
                  s("td", O8, a(e.max_overdue_days || "—"), 1)
                ]))), 128))
              ])
            ])) : Qs.value === "forecast" ? (l(), o(u, { key: 6 }, [
              s("div", R8, "Forward-looking cash-outflow view, bucketed by days until due from " + a(y.value) + ".", 1),
              s("table", P8, [
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
                    s("td", I8, a(e.count), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.key === "overdue" ? "red" : ""])
                    }, a(d(e.amount)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", V8, a(ho.value ? "No data as of this date." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "cash_bank_mis" ? (l(), o("div", N8, [
          s("div", E8, [
            t[735] || (t[735] = C('<div class="bs-page-head-icon cbmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="2" y="5" width="20" height="14" rx="2" data-v-bfa37a0c></rect><line x1="2" y1="10" x2="22" y2="10" data-v-bfa37a0c></line><line x1="6" y1="15" x2="10" y2="15" data-v-bfa37a0c></line></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Cash &amp; Bank MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Cash position, bank balance, daily cash flow and bank movement, receipts, payments, cash forecast and fund requirement for the period.</div></div>', 2)),
            s("div", q8, [
              s("div", B8, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", A8, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[194] || (t[194] = (e) => es("exportCashBankMisCSV")),
                  disabled: !E.value
                }, [...t[734] || (t[734] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, $8),
                w.value === "exportCashBankMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[195] || (t[195] = (e) => w.value = "")
                  }),
                  s("div", L8, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[196] || (t[196] = (e) => {
                        w.value = "", zo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[197] || (t[197] = (e) => {
                        w.value = "", Y(zo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", Q8, [
            (l(), o(u, null, m(Jl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Vs.value === e.key }]),
              onClick: (g) => Vs.value = e.key
            }, a(e.label), 11, F8)), 64))
          ]),
          ua.value ? (l(), o("div", H8)) : E.value ? (l(), o(u, { key: 1 }, [
            Vs.value === "cash_position" ? (l(), o(u, { key: 0 }, [
              s("div", z8, "As of " + a(E.value.as_of_date) + ".", 1),
              s("div", W8, [
                s("div", U8, [
                  t[736] || (t[736] = s("span", { class: "bucket-label" }, "Total Cash", -1)),
                  s("span", K8, a(d(E.value.cash_position.total)), 1)
                ])
              ]),
              E.value.cash_position.rows.length ? (l(), o("table", G8, [
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
                    s("td", Y8, a(d(e.opening_balance)), 1),
                    s("td", J8, a(d(e.closing_balance)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Z8, "No Cash accounts found."))
            ], 64)) : Vs.value === "bank_balance" ? (l(), o(u, { key: 1 }, [
              s("div", X8, "As of " + a(E.value.as_of_date) + ".", 1),
              s("div", s9, [
                s("div", t9, [
                  t[738] || (t[738] = s("span", { class: "bucket-label" }, "Total Bank", -1)),
                  s("span", e9, a(d(E.value.bank_balance.total)), 1)
                ])
              ]),
              E.value.bank_balance.rows.length ? (l(), o("table", a9, [
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
                    s("td", o9, a(d(e.opening_balance)), 1),
                    s("td", l9, a(d(e.closing_balance)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", n9, "No Bank accounts found."))
            ], 64)) : Vs.value === "daily_cash" ? (l(), o(u, { key: 2 }, [
              s("div", i9, [
                s("div", d9, [
                  t[740] || (t[740] = s("span", { class: "bucket-label" }, "Opening", -1)),
                  s("span", r9, a(d(E.value.daily_cash_flow.opening_balance)), 1)
                ]),
                s("div", u9, [
                  t[741] || (t[741] = s("span", { class: "bucket-label" }, "Receipts", -1)),
                  s("span", c9, a(d(E.value.daily_cash_flow.total_receipts)), 1)
                ]),
                s("div", m9, [
                  t[742] || (t[742] = s("span", { class: "bucket-label" }, "Payments", -1)),
                  s("span", v9, a(d(E.value.daily_cash_flow.total_payments)), 1)
                ]),
                s("div", _9, [
                  t[743] || (t[743] = s("span", { class: "bucket-label" }, "Closing", -1)),
                  s("span", p9, a(d(E.value.daily_cash_flow.closing_balance)), 1)
                ])
              ]),
              s("table", y9, [
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
                    s("td", b9, a(d(e.receipts)), 1),
                    s("td", h9, a(d(e.payments)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", g9, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : Vs.value === "daily_bank" ? (l(), o(u, { key: 3 }, [
              s("div", k9, [
                s("div", f9, [
                  t[745] || (t[745] = s("span", { class: "bucket-label" }, "Opening", -1)),
                  s("span", w9, a(d(E.value.daily_bank_movement.opening_balance)), 1)
                ]),
                s("div", x9, [
                  t[746] || (t[746] = s("span", { class: "bucket-label" }, "Deposits", -1)),
                  s("span", C9, a(d(E.value.daily_bank_movement.total_receipts)), 1)
                ]),
                s("div", S9, [
                  t[747] || (t[747] = s("span", { class: "bucket-label" }, "Withdrawals", -1)),
                  s("span", j9, a(d(E.value.daily_bank_movement.total_payments)), 1)
                ]),
                s("div", M9, [
                  t[748] || (t[748] = s("span", { class: "bucket-label" }, "Closing", -1)),
                  s("span", D9, a(d(E.value.daily_bank_movement.closing_balance)), 1)
                ])
              ]),
              s("table", T9, [
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
                    s("td", O9, a(d(e.receipts)), 1),
                    s("td", R9, a(d(e.payments)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    s("td", P9, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : Vs.value === "receipts" ? (l(), o(u, { key: 4 }, [
              s("div", I9, [
                s("div", V9, [
                  t[750] || (t[750] = s("span", { class: "bucket-label" }, "Total Receipts", -1)),
                  s("span", N9, a(d(E.value.receipts.total)), 1)
                ])
              ]),
              E.value.receipts.rows.length ? (l(), o("table", E9, [
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
                    s("td", q9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", B9, "No receipts in this period."))
            ], 64)) : Vs.value === "payments" ? (l(), o(u, { key: 5 }, [
              t[754] || (t[754] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Includes both Payment Entry (Pay) and Expense records paid directly from a Cash/Bank account. ", -1)),
              s("div", A9, [
                s("div", $9, [
                  t[752] || (t[752] = s("span", { class: "bucket-label" }, "Total Payments", -1)),
                  s("span", L9, a(d(E.value.payments.total)), 1)
                ])
              ]),
              E.value.payments.rows.length ? (l(), o("table", Q9, [
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
                    s("td", F9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", H9, "No payments in this period."))
            ], 64)) : Vs.value === "forecast" ? (l(), o(u, { key: 6 }, [
              s("div", z9, " Projected from the current Cash + Bank position (" + a(d(E.value.cash_forecast.current_position)) + "), assuming every outstanding invoice settles on its due date. ", 1),
              s("table", W9, [
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
                    s("td", U9, a(d(e.inflow)), 1),
                    s("td", K9, a(d(e.outflow)), 1),
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
              s("div", G9, [
                s("div", Y9, [
                  t[756] || (t[756] = s("span", { class: "bucket-label" }, "Peak Fund Requirement", -1)),
                  s("span", {
                    class: c(["mis-summary-val", E.value.fund_requirement.peak_requirement > 0 ? "red" : "green"])
                  }, a(d(E.value.fund_requirement.peak_requirement)), 3)
                ])
              ]),
              E.value.fund_requirement.rows.length ? (l(), o("table", J9, [
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
                    s("td", Z9, a(e.label), 1),
                    s("td", X9, a(d(e.shortfall)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", sC, "No projected shortfall — the current Cash + Bank position covers the forecast."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", tC, a(go.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "customer_mis" ? (l(), o("div", eC, [
          s("div", aC, [
            t[759] || (t[759] = C('<div class="bs-page-head-icon custmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-bfa37a0c></path><circle cx="9" cy="7" r="4" data-v-bfa37a0c></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-bfa37a0c></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Customer MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>New, active, repeat and inactive customers, customer-wise sales/outstanding/profit, retention rate, and top customers for the period.</div></div>', 2)),
            s("div", oC, [
              s("div", lC, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", nC, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[198] || (t[198] = (e) => es("exportCustomerMisCSV")),
                  disabled: !D.value
                }, [...t[758] || (t[758] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, iC),
                w.value === "exportCustomerMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[199] || (t[199] = (e) => w.value = "")
                  }),
                  s("div", dC, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[200] || (t[200] = (e) => {
                        w.value = "", Wo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[201] || (t[201] = (e) => {
                        w.value = "", Y(Wo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", rC, [
            (l(), o(u, null, m(Zl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ss.value === e.key }]),
              onClick: (g) => Ss.value = e.key
            }, a(e.label), 11, uC)), 64))
          ]),
          ca.value ? (l(), o("div", cC)) : D.value ? (l(), o(u, { key: 1 }, [
            s("div", mC, [
              s("div", vC, [
                t[760] || (t[760] = s("span", { class: "bucket-label" }, "Total Customers", -1)),
                s("span", _C, a(p(D.value.summary.total_customers)), 1)
              ]),
              s("div", pC, [
                t[761] || (t[761] = s("span", { class: "bucket-label" }, "Active Customers", -1)),
                s("span", yC, a(p(D.value.summary.active_count)), 1)
              ]),
              s("div", bC, [
                t[762] || (t[762] = s("span", { class: "bucket-label" }, "Active Revenue", -1)),
                s("span", hC, a(d(D.value.summary.active_revenue)), 1)
              ]),
              s("div", gC, [
                t[763] || (t[763] = s("span", { class: "bucket-label" }, "New Customers", -1)),
                s("span", kC, a(p(D.value.summary.new_count)), 1)
              ]),
              s("div", fC, [
                t[764] || (t[764] = s("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                s("span", wC, a(p(D.value.summary.repeat_count)), 1)
              ]),
              s("div", xC, [
                t[765] || (t[765] = s("span", { class: "bucket-label" }, "Repeat Revenue", -1)),
                s("span", CC, a(d(D.value.summary.repeat_revenue)), 1)
              ]),
              s("div", SC, [
                t[766] || (t[766] = s("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                s("span", jC, a(p(D.value.summary.inactive_count)), 1)
              ]),
              s("div", MC, [
                t[767] || (t[767] = s("span", { class: "bucket-label" }, "Retention Rate", -1)),
                s("span", DC, a(Number(D.value.summary.retention_pct).toFixed(1)) + "%", 1)
              ]),
              s("div", TC, [
                t[768] || (t[768] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                s("span", OC, a(d(D.value.summary.total_outstanding)), 1)
              ]),
              s("div", RC, [
                t[769] || (t[769] = s("span", { class: "bucket-label" }, "Total Profit", -1)),
                s("span", {
                  class: c(["mis-summary-val", D.value.summary.total_profit >= 0 ? "green" : "red"])
                }, a(d(D.value.summary.total_profit)), 3)
              ])
            ]),
            Ss.value === "new_customers" ? (l(), o(u, { key: 0 }, [
              s("div", PC, [
                s("div", IC, [
                  t[770] || (t[770] = s("span", { class: "bucket-label" }, "New Customers", -1)),
                  s("span", VC, a(D.value.new_customers.count), 1)
                ])
              ]),
              D.value.new_customers.rows.length ? (l(), o("table", NC, [
                t[771] || (t[771] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", null, "First Invoice Date"),
                    s("th", { class: "ta-r" }, "Invoices in Period"),
                    s("th", { class: "ta-r" }, "Revenue in Period")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(D.value.new_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.first_invoice_date), 1),
                    s("td", EC, a(e.invoice_count), 1),
                    s("td", qC, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", BC, "No new customers in this period."))
            ], 64)) : Ss.value === "active_customers" ? (l(), o(u, { key: 1 }, [
              s("div", AC, [
                s("div", $C, [
                  t[772] || (t[772] = s("span", { class: "bucket-label" }, "Active Customers", -1)),
                  s("span", LC, a(D.value.active_customers.count), 1)
                ]),
                s("div", QC, [
                  t[773] || (t[773] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", FC, a(d(D.value.active_customers.total)), 1)
                ])
              ]),
              D.value.active_customers.rows.length ? (l(), o("table", HC, [
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
                  (l(!0), o(u, null, m(D.value.active_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", zC, a(e.invoice_count), 1),
                    s("td", WC, a(d(e.total_amount)), 1),
                    s("td", null, a(e.first_invoice_in_period), 1),
                    s("td", null, a(e.last_invoice_in_period), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", UC, "No active customers in this period."))
            ], 64)) : Ss.value === "repeat_customers" ? (l(), o(u, { key: 2 }, [
              s("div", KC, [
                s("div", GC, [
                  t[775] || (t[775] = s("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                  s("span", YC, a(D.value.repeat_customers.count), 1)
                ]),
                s("div", JC, [
                  t[776] || (t[776] = s("span", { class: "bucket-label" }, "Revenue", -1)),
                  s("span", ZC, a(d(D.value.repeat_customers.total)), 1)
                ])
              ]),
              D.value.repeat_customers.rows.length ? (l(), o("table", XC, [
                t[777] || (t[777] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(D.value.repeat_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", sS, a(e.invoice_count), 1),
                    s("td", tS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", eS, "No repeat customers in this period."))
            ], 64)) : Ss.value === "customer_wise_sales" ? (l(), o(u, { key: 3 }, [
              D.value.customer_wise_sales.rows.length ? (l(), o("table", aS, [
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
                  (l(!0), o(u, null, m(D.value.customer_wise_sales.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", oS, a(e.invoice_count), 1),
                    s("td", lS, a(d(e.net_total)), 1),
                    s("td", nS, a(d(e.total_discount)), 1),
                    s("td", iS, a(d(e.total_tax)), 1),
                    s("td", dS, a(d(e.total_amount)), 1),
                    s("td", rS, a(d(e.outstanding_amount)), 1),
                    s("td", uS, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", cS, "No sales in this period."))
            ], 64)) : Ss.value === "customer_wise_outstanding" ? (l(), o(u, { key: 4 }, [
              s("div", mS, [
                s("div", vS, [
                  t[779] || (t[779] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", _S, a(d(D.value.customer_wise_outstanding.total)), 1)
                ])
              ]),
              D.value.customer_wise_outstanding.rows.length ? (l(), o("table", pS, [
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
                  (l(!0), o(u, null, m(D.value.customer_wise_outstanding.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", yS, a(e.invoice_count), 1),
                    s("td", bS, a(d(e.outstanding_amount)), 1),
                    s("td", null, a(e.oldest_due_date), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", hS, "No outstanding balances."))
            ], 64)) : Ss.value === "customer_wise_profit" ? (l(), o(u, { key: 5 }, [
              s("div", gS, [
                s("div", kS, [
                  t[781] || (t[781] = s("span", { class: "bucket-label" }, "Total Profit", -1)),
                  s("span", {
                    class: c(["mis-summary-val", D.value.customer_wise_profit.total >= 0 ? "green" : "red"])
                  }, a(d(D.value.customer_wise_profit.total)), 3)
                ])
              ]),
              D.value.customer_wise_profit.rows.length ? (l(), o("table", fS, [
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
                  (l(!0), o(u, null, m(D.value.customer_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", wS, a(e.invoice_count), 1),
                    s("td", xS, a(d(e.revenue)), 1),
                    s("td", CS, a(d(e.total_cost)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    s("td", SS, a(Number(e.margin_pct).toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jS, "No profit data for this period."))
            ], 64)) : Ss.value === "customer_retention" ? (l(), o(u, { key: 6 }, [
              s("div", MS, " Comparing " + a(D.value.customer_retention.prev_from) + " – " + a(D.value.customer_retention.prev_to) + " (prior period) to the selected period. ", 1),
              s("div", DS, [
                s("div", TS, [
                  t[783] || (t[783] = s("span", { class: "bucket-label" }, "Retention Rate", -1)),
                  s("span", OS, a(Number(D.value.customer_retention.retention_pct).toFixed(1)) + "%", 1)
                ]),
                s("div", RS, [
                  t[784] || (t[784] = s("span", { class: "bucket-label" }, "Retained", -1)),
                  s("span", PS, a(D.value.customer_retention.retained_count), 1)
                ]),
                s("div", IS, [
                  t[785] || (t[785] = s("span", { class: "bucket-label" }, "Churned", -1)),
                  s("span", VS, a(D.value.customer_retention.churned_count), 1)
                ]),
                s("div", NS, [
                  t[786] || (t[786] = s("span", { class: "bucket-label" }, "New", -1)),
                  s("span", ES, a(D.value.customer_retention.new_count), 1)
                ])
              ]),
              D.value.customer_retention.rows.length ? (l(), o("table", qS, [
                t[787] || (t[787] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "Customer"),
                    s("th", null, "Status")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(D.value.customer_retention.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", {
                      class: c(e.status === "Retained" ? "green" : e.status === "Churned" ? "red" : "")
                    }, a(e.status), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", BS, "No customer activity to compare."))
            ], 64)) : Ss.value === "top_customers" ? (l(), o(u, { key: 7 }, [
              D.value.top_customers.rows.length ? (l(), o("table", AS, [
                t[788] || (t[788] = s("thead", null, [
                  s("tr", null, [
                    s("th", null, "#"),
                    s("th", null, "Customer"),
                    s("th", { class: "ta-r" }, "Invoices"),
                    s("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                s("tbody", null, [
                  (l(!0), o(u, null, m(D.value.top_customers.rows, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(g + 1), 1),
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", $S, a(e.invoice_count), 1),
                    s("td", LS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", QS, "No sales in this period."))
            ], 64)) : Ss.value === "inactive_customers" ? (l(), o(u, { key: 8 }, [
              s("div", FS, [
                s("div", HS, [
                  t[789] || (t[789] = s("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                  s("span", zS, a(D.value.inactive_customers.count), 1)
                ])
              ]),
              D.value.inactive_customers.rows.length ? (l(), o("table", WS, [
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
                  (l(!0), o(u, null, m(D.value.inactive_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    s("td", null, a(e.customer_name || e.customer), 1),
                    s("td", null, a(e.last_invoice_date), 1),
                    s("td", US, a(e.days_inactive), 1),
                    s("td", KS, a(e.invoice_count), 1),
                    s("td", GS, a(d(e.lifetime_revenue)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", YS, "No inactive customers found."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", JS, a(ko.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "supplier_mis" ? (l(), o("div", ZS, [
          s("div", XS, [
            t[792] || (t[792] = C('<div class="bs-page-head-icon suppmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><rect x="1" y="3" width="15" height="13" data-v-bfa37a0c></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-bfa37a0c></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-bfa37a0c></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-bfa37a0c></circle></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Supplier MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>Supplier-wise purchase and outstanding, payment ageing, price comparison, delivery/supplier performance and quality/rejection for the period.</div></div>', 2)),
            s("div", sj, [
              s("div", tj, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", ej, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[202] || (t[202] = (e) => es("exportSupplierMisCSV")),
                  disabled: !$.value
                }, [...t[791] || (t[791] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, aj),
                w.value === "exportSupplierMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[203] || (t[203] = (e) => w.value = "")
                  }),
                  s("div", oj, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[204] || (t[204] = (e) => {
                        w.value = "", Uo();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[205] || (t[205] = (e) => {
                        w.value = "", Y(Uo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", lj, [
            (l(), o(u, null, m(Xl, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Fs.value === e.key }]),
              onClick: (g) => Fs.value = e.key
            }, a(e.label), 11, nj)), 64))
          ]),
          ma.value ? (l(), o("div", ij)) : $.value ? (l(), o(u, { key: 1 }, [
            Fs.value === "supplier_wise_purchase" ? (l(), o(u, { key: 0 }, [
              s("div", dj, [
                s("div", rj, [
                  t[793] || (t[793] = s("span", { class: "bucket-label" }, "Total Purchase", -1)),
                  s("span", uj, a(d($.value.supplier_wise_purchase.total)), 1)
                ])
              ]),
              $.value.supplier_wise_purchase.rows.length ? (l(), o("table", cj, [
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
                    s("td", mj, a(e.invoice_count), 1),
                    s("td", vj, a(d(e.net_total)), 1),
                    s("td", _j, a(d(e.total_discount)), 1),
                    s("td", pj, a(d(e.total_tax)), 1),
                    s("td", yj, a(d(e.total_amount)), 1),
                    s("td", bj, a(d(e.outstanding_amount)), 1),
                    s("td", hj, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gj, "No purchases in this period."))
            ], 64)) : Fs.value === "supplier_outstanding" ? (l(), o(u, { key: 1 }, [
              s("div", kj, [
                s("div", fj, [
                  t[795] || (t[795] = s("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  s("span", wj, a(d($.value.supplier_outstanding.total)), 1)
                ])
              ]),
              $.value.supplier_outstanding.rows.length ? (l(), o("table", xj, [
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
                    s("td", Cj, a(e.invoice_count), 1),
                    s("td", Sj, a(d(e.outstanding_amount)), 1),
                    s("td", jj, a(d(e.overdue_amount)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Mj, "No outstanding balances."))
            ], 64)) : Fs.value === "supplier_payment_ageing" ? (l(), o(u, { key: 2 }, [
              $.value.supplier_payment_ageing.rows.length ? (l(), o("table", Dj, [
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
                    s("td", Tj, a(d(e.current)), 1),
                    s("td", Oj, a(d(e.days_1_30)), 1),
                    s("td", Rj, a(d(e.days_31_60)), 1),
                    s("td", Pj, a(d(e.days_61_90)), 1),
                    s("td", Ij, a(d(e.days_90_plus)), 1),
                    s("td", Vj, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Nj, "No outstanding balances."))
            ], 64)) : Fs.value === "purchase_price_comparison" ? (l(), o(u, { key: 3 }, [
              s("div", Ej, a($.value.purchase_price_comparison.multi_supplier_item_count) + " item(s) were purchased from more than one supplier in this period. ", 1),
              $.value.purchase_price_comparison.rows.length ? (l(), o("table", qj, [
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
                    s("td", Bj, a(e.qty), 1),
                    s("td", Aj, a(d(e.avg_rate)), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.is_lowest ? "green" : "red"])
                    }, a(e.is_lowest ? "—" : "+" + Number(e.variance_vs_lowest_pct).toFixed(1) + "%"), 3),
                    s("td", null, [
                      e.is_lowest && e.supplier_count > 1 ? (l(), o("span", $j, "Lowest")) : b("", !0)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", Lj, "No purchases in this period."))
            ], 64)) : Fs.value === "supplier_performance" ? (l(), o(u, { key: 4 }, [
              $.value.supplier_performance.rows.length ? (l(), o("table", Qj, [
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
                    s("td", Fj, a(d(e.total_purchase_amount)), 1),
                    s("td", Hj, a(d(e.outstanding_amount)), 1),
                    s("td", zj, a(e.on_time_delivery_pct != null ? Number(e.on_time_delivery_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", Wj, a(e.rejection_pct != null ? Number(e.rejection_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", Uj, a(e.avg_price_variance_pct != null ? Number(e.avg_price_variance_pct).toFixed(1) + "%" : "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score != null ? Number(e.performance_score).toFixed(0) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Kj, "No supplier activity in this period."))
            ], 64)) : Fs.value === "delivery_performance" ? (l(), o(u, { key: 5 }, [
              s("div", Gj, [
                s("div", Yj, [
                  t[800] || (t[800] = s("span", { class: "bucket-label" }, "On-time %", -1)),
                  s("span", Jj, a(Number($.value.delivery_performance.summary.on_time_pct).toFixed(1)) + "%", 1)
                ]),
                s("div", Zj, [
                  t[801] || (t[801] = s("span", { class: "bucket-label" }, "On-time", -1)),
                  s("span", Xj, a($.value.delivery_performance.summary.on_time_count), 1)
                ]),
                s("div", sM, [
                  t[802] || (t[802] = s("span", { class: "bucket-label" }, "Late", -1)),
                  s("span", tM, a($.value.delivery_performance.summary.late_count), 1)
                ]),
                s("div", eM, [
                  t[803] || (t[803] = s("span", { class: "bucket-label" }, "No PO Reference", -1)),
                  s("span", aM, a($.value.delivery_performance.summary.undated_count), 1)
                ])
              ]),
              t[806] || (t[806] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.delivery_performance.by_supplier.length ? (l(), o("table", oM, [
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
                    s("td", lM, a(e.receipt_count), 1),
                    s("td", nM, a(e.on_time_count), 1),
                    s("td", iM, a(e.late_count), 1),
                    s("td", dM, a(Number(e.on_time_pct).toFixed(1)) + "%", 1),
                    s("td", rM, a(Number(e.avg_delay_days).toFixed(1)), 1)
                  ]))), 128))
                ])
              ])) : b("", !0),
              t[807] || (t[807] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "Receipts", -1)),
              $.value.delivery_performance.rows.length ? (l(), o("table", uM, [
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
              ])) : (l(), o("div", cM, "No receipts in this period."))
            ], 64)) : Fs.value === "quality_rejection" ? (l(), o(u, { key: 6 }, [
              s("div", mM, [
                s("div", vM, [
                  t[808] || (t[808] = s("span", { class: "bucket-label" }, "Received Qty", -1)),
                  s("span", _M, a($.value.quality_rejection.summary.total_received_qty), 1)
                ]),
                s("div", pM, [
                  t[809] || (t[809] = s("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  s("span", yM, a($.value.quality_rejection.summary.total_rejected_qty), 1)
                ]),
                s("div", bM, [
                  t[810] || (t[810] = s("span", { class: "bucket-label" }, "Rejection %", -1)),
                  s("span", hM, a(Number($.value.quality_rejection.summary.overall_rejection_pct).toFixed(2)) + "%", 1)
                ])
              ]),
              t[813] || (t[813] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.quality_rejection.by_supplier.length ? (l(), o("table", gM, [
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
                    s("td", kM, a(e.received_qty), 1),
                    s("td", fM, a(e.accepted_qty), 1),
                    s("td", wM, a(e.rejected_qty), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : b("", !0),
              t[814] || (t[814] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Item", -1)),
              $.value.quality_rejection.rows.length ? (l(), o("table", xM, [
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
                    s("td", CM, a(e.received_qty), 1),
                    s("td", SM, a(e.accepted_qty), 1),
                    s("td", jM, a(e.rejected_qty), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", MM, "No receipts in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", DM, a(fo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        k.value === "employee_mis" ? (l(), o("div", TM, [
          s("div", OM, [
            t[816] || (t[816] = C('<div class="bs-page-head-icon empmis-page-head-icon" data-v-bfa37a0c><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-bfa37a0c></path><circle cx="9" cy="7" r="4" data-v-bfa37a0c></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-bfa37a0c></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-bfa37a0c></path></svg></div><div class="bs-page-head-text" data-v-bfa37a0c><div class="bs-page-head-title" data-v-bfa37a0c>Employee / Performance MIS</div><div class="bs-page-head-sub" data-v-bfa37a0c>This app has no HR/Payroll module — figures below are built from Job Card time logs and Sales Person records, so they only cover employees who had time logged or are set up as a Sales Person.</div></div>', 2)),
            s("div", RM, [
              s("div", PM, a(P(x.value)) + " - " + a(P(y.value)), 1),
              s("div", IM, [
                s("button", {
                  class: "bs-export-btn",
                  onClick: t[206] || (t[206] = (e) => es("exportEmployeeMisCSV")),
                  disabled: !L.value
                }, [...t[815] || (t[815] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-bfa37a0c></path><polyline points="7 10 12 15 17 10" data-v-bfa37a0c></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-bfa37a0c></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-bfa37a0c><polyline points="6 9 12 15 18 9" data-v-bfa37a0c></polyline></svg>', 3)
                ])], 8, VM),
                w.value === "exportEmployeeMisCSV" ? (l(), o(u, { key: 0 }, [
                  s("div", {
                    class: "iws-menu-backdrop",
                    onClick: t[207] || (t[207] = (e) => w.value = "")
                  }),
                  s("div", NM, [
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[208] || (t[208] = (e) => {
                        w.value = "", Ko();
                      })
                    }, "Download CSV"),
                    s("button", {
                      class: "iws-menu-item",
                      onClick: t[209] || (t[209] = (e) => {
                        w.value = "", Y(Ko);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          s("div", EM, [
            (l(), o(u, null, m(sn, (e) => s("button", {
              key: e.key,
              class: c(["report-tab", { active: Ns.value === e.key }]),
              onClick: (g) => Ns.value = e.key
            }, a(e.label), 11, qM)), 64))
          ]),
          va.value ? (l(), o("div", BM)) : L.value ? (l(), o(u, { key: 1 }, [
            Ns.value === "employee_attendance" ? (l(), o(u, { key: 0 }, [
              s("div", AM, ' Proxy: a day counts as "present" if the employee has any Job Card time log on that date. ' + a(L.value.period_days) + "-day period. ", 1),
              L.value.employee_attendance.rows.length ? (l(), o("table", $M, [
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
                    s("td", LM, a(e.present_days) + " / " + a(e.period_days), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.attendance_pct >= 80 ? "green" : "red"])
                    }, a(e.attendance_pct) + "%", 3),
                    s("td", QM, a(e.total_hours), 1),
                    s("td", FM, a(e.avg_hours_per_day), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", HM, "No Job Card time logs in this period."))
            ], 64)) : Ns.value === "department_manpower" ? (l(), o(u, { key: 1 }, [
              t[820] || (t[820] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Sales Person is the only doctype in this app with a department field, so this reflects active Sales Persons only. ", -1)),
              s("div", zM, [
                s("div", WM, [
                  t[818] || (t[818] = s("span", { class: "bucket-label" }, "Total Headcount", -1)),
                  s("span", UM, a(L.value.department_manpower.total_headcount), 1)
                ])
              ]),
              L.value.department_manpower.rows.length ? (l(), o("table", KM, [
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
                    s("td", GM, a(e.headcount), 1),
                    s("td", YM, a(e.employees.map((g) => g.sales_person_name).join(", ")), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", JM, "No active Sales Persons set up."))
            ], 64)) : Ns.value === "salesperson_target" ? (l(), o(u, { key: 2 }, [
              t[824] || (t[824] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No target is stored — enter a target per salesperson to compare against actual sales for this period. ", -1)),
              s("div", ZM, [
                s("div", XM, [
                  t[821] || (t[821] = s("span", { class: "bucket-label" }, "Total Achieved", -1)),
                  s("span", sD, a(d(L.value.salesperson_achievement.total_achieved)), 1)
                ]),
                s("div", tD, [
                  t[822] || (t[822] = s("span", { class: "bucket-label" }, "Sales with No Salesperson", -1)),
                  s("span", eD, a(d(L.value.salesperson_achievement.unassigned_sales)), 1)
                ])
              ]),
              L.value.salesperson_achievement.rows.length ? (l(), o("table", aD, [
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
                    s("td", oD, a(e.invoice_count), 1),
                    s("td", lD, a(d(e.total_amount)), 1),
                    s("td", nD, [
                      qs(s("input", {
                        type: "number",
                        "onUpdate:modelValue": (g) => Wt.value[e.sales_person] = g,
                        class: "dr-input",
                        style: { width: "110px", "text-align": "right" },
                        min: "0"
                      }, null, 8, iD), [
                        [
                          Ks,
                          Wt.value[e.sales_person],
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", _a(e) >= 100 ? "green" : "red"])
                    }, a(Wt.value[e.sales_person] ? _a(e).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", dD, "No sales attributed to a salesperson in this period."))
            ], 64)) : Ns.value === "salesperson_collection" ? (l(), o(u, { key: 3 }, [
              s("div", rD, [
                s("div", uD, [
                  t[825] || (t[825] = s("span", { class: "bucket-label" }, "Total Collected", -1)),
                  s("span", cD, a(d(L.value.salesperson_collection.total_collected)), 1)
                ])
              ]),
              L.value.salesperson_collection.rows.length ? (l(), o("table", mD, [
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
                    s("td", vD, a(e.payment_count), 1),
                    s("td", _D, a(d(e.collected_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", pD, "No collections attributed to a salesperson in this period."))
            ], 64)) : Ns.value === "production_productivity" ? (l(), o(u, { key: 4 }, [
              s("div", yD, [
                s("div", bD, [
                  t[827] || (t[827] = s("span", { class: "bucket-label" }, "Team Avg Qty/Hour", -1)),
                  s("span", hD, a(L.value.production_productivity.team_avg_qty_per_hour), 1)
                ])
              ]),
              L.value.production_productivity.rows.length ? (l(), o("table", gD, [
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
                    s("td", kD, a(e.job_card_count), 1),
                    s("td", fD, a(e.total_hours), 1),
                    s("td", wD, a(e.qty_produced), 1),
                    s("td", xD, a(e.avg_time_per_unit_mins ?? "—"), 1),
                    s("td", CD, a(e.qty_per_hour ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", SD, "No Job Card time logs in this period."))
            ], 64)) : Ns.value === "overtime" ? (l(), o(u, { key: 5 }, [
              t[830] || (t[830] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged time beyond 8 hours (480 min) in a day, from Job Card time logs. No shift doctype exists to read an actual shift length from. ", -1)),
              L.value.overtime.summary.length ? (l(), o("table", jD, [
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
                    s("td", MD, a(e.overtime_days), 1),
                    s("td", DD, a(e.overtime_hours), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", TD, "No overtime in this period."))
            ], 64)) : Ns.value === "labour_cost" ? (l(), o(u, { key: 6 }, [
              t[834] || (t[834] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged hours × the Workstation's hour rate on each Job Card — there's no per-employee wage field in this app, so this is a cost-of-time figure, not real payroll cost. ", -1)),
              s("div", OD, [
                s("div", RD, [
                  t[831] || (t[831] = s("span", { class: "bucket-label" }, "Total Labour Cost", -1)),
                  s("span", PD, a(d(L.value.labour_cost.total)), 1)
                ])
              ]),
              t[835] || (t[835] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Employee", -1)),
              L.value.labour_cost.by_employee.length ? (l(), o("table", ID, [
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
                    s("td", VD, a(e.total_hours), 1),
                    s("td", ND, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : b("", !0),
              t[836] || (t[836] = s("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Operation", -1)),
              L.value.labour_cost.by_operation.length ? (l(), o("table", ED, [
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
                    s("td", qD, a(e.employee_count), 1),
                    s("td", BD, a(e.total_hours), 1),
                    s("td", AD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $D, "No Job Card time logs in this period."))
            ], 64)) : Ns.value === "employee_performance" ? (l(), o(u, { key: 7 }, [
              t[838] || (t[838] = s("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Composite score = average of attendance %, output rate vs the team average (capped at 150%), and (100 − rejection %) — whichever of these apply to the employee. ", -1)),
              L.value.employee_performance.rows.length ? (l(), o("table", LD, [
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
                    s("td", QD, a(e.total_hours), 1),
                    s("td", FD, a(e.qty_produced), 1),
                    s("td", HD, a(e.qty_per_hour ?? "—"), 1),
                    s("td", {
                      class: c(["ta-r mono-sm", e.rejection_pct > 0 ? "red" : ""])
                    }, a(e.rejection_pct != null ? e.rejection_pct + "%" : "—"), 3),
                    s("td", zD, a(e.attendance_pct != null ? e.attendance_pct + "%" : "—"), 1),
                    s("td", WD, a(e.overtime_hours), 1),
                    s("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", UD, "No Job Card time logs in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", KD, a(wo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0)
      ]);
    };
  }
}, ZD = /* @__PURE__ */ Cn(GD, [["__scopeId", "data-v-bfa37a0c"]]);
export {
  ZD as default
};
