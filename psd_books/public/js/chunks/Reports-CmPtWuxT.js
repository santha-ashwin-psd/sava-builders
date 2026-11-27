import { _ as jn, h as v, z as Ta, c as o, X as C, a as t, F as u, r as m, u as k, w as Et, B as Gt, b, t as a, v as al, d as ot, n as c, p as Bt, E as Mn, G as Dn, a6 as Tn, e as Rn, l as K, g as V, k as l, x as On } from "./main-CW5mbgNI.js";
import { f as Pn, u as ie } from "./useFrappe-D_1q-LwB.js";
const Bs = new TextEncoder(), In = (() => {
  const F = new Uint32Array(256);
  for (let S = 0; S < 256; S++) {
    let d = S;
    for (let p = 0; p < 8; p++) d = d & 1 ? 3988292384 ^ d >>> 1 : d >>> 1;
    F[S] = d >>> 0;
  }
  return F;
})();
function Vn(F) {
  let S = 4294967295;
  for (let d = 0; d < F.length; d++) S = In[(S ^ F[d]) & 255] ^ S >>> 8;
  return (S ^ 4294967295) >>> 0;
}
const st = (F) => [F & 255, F >>> 8 & 255], ft = (F) => [F & 255, F >>> 8 & 255, F >>> 16 & 255, F >>> 24 & 255];
function Nn(F) {
  const S = [], d = [];
  let p = 0;
  for (const x of F) {
    const y = Bs.encode(x.name), f = Vn(x.data), St = x.data.length, de = new Uint8Array([
      ...ft(67324752),
      ...st(20),
      ...st(0),
      ...st(0),
      ...st(0),
      ...st(33),
      ...ft(f),
      ...ft(St),
      ...ft(St),
      ...st(y.length),
      ...st(0)
    ]);
    S.push(de, y, x.data), d.push({ name: y, crc: f, size: St, offset: p }), p += de.length + y.length + St;
  }
  const H = p;
  let G = 0;
  for (const x of d) {
    const y = new Uint8Array([
      ...ft(33639248),
      ...st(20),
      ...st(20),
      ...st(0),
      ...st(0),
      ...st(0),
      ...st(33),
      ...ft(x.crc),
      ...ft(x.size),
      ...ft(x.size),
      ...st(x.name.length),
      ...st(0),
      ...st(0),
      ...st(0),
      ...st(0),
      ...ft(0),
      ...ft(x.offset)
    ]);
    S.push(y, x.name), G += y.length + x.name.length;
  }
  const lt = new Uint8Array([
    ...ft(101010256),
    ...st(0),
    ...st(0),
    ...st(d.length),
    ...st(d.length),
    ...ft(G),
    ...ft(H),
    ...st(0)
  ]);
  return S.push(lt), new Blob(S, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
function ol(F) {
  return String(F).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function En(F) {
  let S = "";
  for (F += 1; F > 0; ) {
    const d = (F - 1) % 26;
    S = String.fromCharCode(65 + d) + S, F = Math.floor((F - 1) / 26);
  }
  return S;
}
function Bn(F, S) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${[F, ...S].map((H, G) => {
    const lt = H.map((x, y) => {
      const f = En(y) + (G + 1);
      return G === 0 ? `<c r="${f}" s="1" t="inlineStr"><is><t xml:space="preserve">${ol(x ?? "")}</t></is></c>` : typeof x == "number" && isFinite(x) ? `<c r="${f}" s="2"><v>${x}</v></c>` : `<c r="${f}" t="inlineStr"><is><t xml:space="preserve">${ol(x ?? "")}</t></is></c>`;
    }).join("");
    return `<row r="${G + 1}">${lt}</row>`;
  }).join("")}</sheetData></worksheet>`;
}
const qn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs></styleSheet>', An = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>', $n = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>', Ln = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Report" sheetId="1" r:id="rId1"/></sheets></workbook>', Qn = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
function ll(F, S, d) {
  const p = [
    { name: "[Content_Types].xml", data: Bs.encode(An) },
    { name: "_rels/.rels", data: Bs.encode($n) },
    { name: "xl/workbook.xml", data: Bs.encode(Ln) },
    { name: "xl/_rels/workbook.xml.rels", data: Bs.encode(Qn) },
    { name: "xl/styles.xml", data: Bs.encode(qn) },
    { name: "xl/worksheets/sheet1.xml", data: Bs.encode(Bn(S, d)) }
  ], H = Nn(p), G = URL.createObjectURL(H), lt = document.createElement("a");
  lt.href = G, lt.download = F, lt.click(), URL.revokeObjectURL(G);
}
function Fn(F) {
  const S = [];
  let d = [], p = "", H = !1;
  for (let G = 0; G < F.length; G++) {
    const lt = F[G];
    H ? lt === '"' ? F[G + 1] === '"' ? (p += '"', G++) : H = !1 : p += lt : lt === '"' ? H = !0 : lt === "," ? (d.push(p), p = "") : lt === `
` || lt === "\r" ? (lt === "\r" && F[G + 1] === `
` && G++, d.push(p), S.push(d), d = [], p = "") : p += lt;
  }
  return (p !== "" || d.length) && (d.push(p), S.push(d)), S.filter((G) => !(G.length === 1 && G[0] === "")).map((G) => G.map(Hn));
}
function Hn(F) {
  const S = F.trim();
  return /^-?(0|[1-9]\d{0,2}(,\d{3})+|[1-9]\d*)(\.\d+)?$/.test(S) ? Number(S.replace(/,/g, "")) : F;
}
const zn = { class: "page-reports" }, Wn = { class: "report-grid" }, Un = ["onClick"], Kn = ["innerHTML"], Gn = { class: "report-card-label" }, Yn = { class: "books-card date-range-bar" }, Jn = { class: "bs-page-head" }, Xn = { class: "bs-page-head-text" }, Zn = { class: "bs-page-head-title" }, ti = { class: "bs-page-head-sub" }, si = { class: "bs-page-head-actions" }, ei = {
  key: 0,
  class: "proc-search"
}, ai = ["placeholder"], oi = ["value"], li = { class: "iws-export-wrap" }, ni = ["disabled"], ii = { class: "iws-menu" }, di = {
  key: 0,
  class: "empty-msg"
}, ri = {
  key: 1,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, ui = {
  key: 2,
  class: "empty-msg"
}, ci = {
  key: 3,
  class: "empty-msg"
}, mi = {
  key: 4,
  class: "iws-body"
}, vi = { class: "iws-table-wrap iws-cards-wrap" }, _i = { class: "iws-table iws-cards" }, pi = ["data-label"], yi = {
  key: 5,
  class: "empty-msg"
}, bi = {
  key: 1,
  class: "pl-dash"
}, hi = { class: "pl-dash-header" }, gi = { class: "pl-dash-range" }, fi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, ki = { class: "pl-kpi-grid" }, wi = { class: "pl-kpi c-emerald" }, xi = { class: "pl-kpi-val green" }, Ci = {
  key: 0,
  class: "pl-kpi c-pink"
}, Si = { class: "pl-kpi-val red" }, ji = {
  key: 1,
  class: "pl-kpi c-amber"
}, Mi = { class: "pl-kpi c-violet" }, Di = { class: "pl-kpi-val red" }, Ti = {
  key: 2,
  class: "pl-kpi c-blue"
}, Ri = {
  key: 0,
  class: "pl-trend-card"
}, Oi = { class: "pl-trend-header" }, Pi = { class: "pl-trend-toggle" }, Ii = { class: "pl-trend-body" }, Vi = { class: "pl-trend-chart-wrap" }, Ni = { class: "pl-trend-yaxis" }, Ei = { class: "pl-trend-chart" }, Bi = { class: "pl-trend-bars" }, qi = ["title"], Ai = ["title"], $i = { class: "pl-trend-month" }, Li = { class: "pl-insights" }, Qi = { class: "pl-insight-title" }, Fi = { class: "pl-insight-desc" }, Hi = {
  key: 2,
  class: "empty-msg"
}, zi = {
  key: 2,
  class: "books-card report-card bs-card"
}, Wi = { class: "bs-page-head" }, Ui = { class: "bs-page-head-actions" }, Ki = { class: "bs-asof" }, Gi = { class: "iws-export-wrap" }, Yi = ["disabled"], Ji = { class: "iws-menu" }, Xi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Zi = { class: "bs-kpi-row" }, td = { class: "bs-kpi bs-kpi-assets" }, sd = { class: "bs-kpi-body" }, ed = { class: "bs-kpi-amount" }, ad = { class: "bs-kpi bs-kpi-liabilities" }, od = { class: "bs-kpi-body" }, ld = { class: "bs-kpi-amount" }, nd = { class: "bs-kpi bs-kpi-equity" }, id = { class: "bs-kpi-body" }, dd = { class: "bs-kpi-amount" }, rd = { class: "bs-sum-status-icon" }, ud = { class: "bs-sum-status-body" }, cd = { class: "bs-sum-status-title" }, md = { class: "bs-sum-status-eq" }, vd = { class: "bs-acc" }, _d = ["onClick"], pd = ["innerHTML"], yd = { class: "bs-acc-head-text" }, bd = { class: "bs-acc-label" }, hd = { class: "bs-acc-desc" }, gd = { class: "bs-acc-amount" }, fd = {
  key: 0,
  class: "bs-acc-items"
}, kd = ["innerHTML"], wd = { class: "bs-acc-item-text" }, xd = { class: "bs-acc-item-label" }, Cd = {
  key: 0,
  class: "bs-acc-item-desc"
}, Sd = { class: "bs-acc-item-amount" }, jd = {
  key: 2,
  class: "empty-msg"
}, Md = {
  key: 3,
  class: "books-card report-card bs-card"
}, Dd = { class: "bs-page-head" }, Td = { class: "bs-page-head-actions" }, Rd = { class: "bs-asof" }, Od = { class: "iws-export-wrap" }, Pd = ["disabled"], Id = { class: "iws-menu" }, Vd = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Nd = {
  key: 1,
  class: "cf-grid"
}, Ed = { class: "cf-acc" }, Bd = { class: "cf-acc-row cf-row-operating" }, qd = { class: "cf-acc-row cf-row-investing" }, Ad = { class: "cf-acc-row cf-row-financing" }, $d = { class: "cf-acc-row cf-row-net" }, Ld = { class: "cf-acc-text" }, Qd = { class: "cf-acc-desc" }, Fd = { class: "cf-flow-row" }, Hd = { class: "cf-flow-row" }, zd = { class: "cf-side" }, Wd = { class: "cf-trend-box" }, Ud = {
  key: 0,
  class: "cf-trend-chart"
}, Kd = ["title"], Gd = ["title"], Yd = ["title"], Jd = { class: "cf-trend-month" }, Xd = {
  key: 1,
  class: "empty-msg",
  style: { padding: "20px 0" }
}, Zd = { class: "cf-summary-box" }, tr = { class: "cf-summary-text" }, sr = {
  key: 2,
  class: "empty-msg"
}, er = {
  key: 4,
  class: "books-card report-card bs-card"
}, ar = { class: "bs-page-head" }, or = { class: "bs-page-head-actions" }, lr = { class: "bs-asof" }, nr = { class: "iws-export-wrap" }, ir = ["disabled"], dr = { class: "iws-menu" }, rr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "80px", "border-radius": "8px" }
}, ur = {
  key: 1,
  class: "gst-cards"
}, cr = { class: "gst-card-head" }, mr = { class: "gst-card-title" }, vr = { class: "gst-card-desc" }, _r = { class: "gst-card-stats" }, pr = { class: "gst-stat-value" }, yr = { class: "gst-stat-value" }, br = { class: "gst-card gst-c-total" }, hr = { class: "gst-card-stats" }, gr = { class: "gst-stat-value" }, fr = { class: "gst-stat-value" }, kr = {
  key: 2,
  class: "empty-msg"
}, wr = {
  key: 5,
  class: "books-card report-card bs-card"
}, xr = { class: "bs-page-head" }, Cr = { class: "bs-page-head-actions" }, Sr = { class: "bs-asof" }, jr = { class: "iws-export-wrap" }, Mr = ["disabled"], Dr = { class: "iws-menu" }, Tr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Rr = {
  key: 1,
  class: "iws-body"
}, Or = { class: "iws-total-panel iws-total-panel-neg" }, Pr = { class: "iws-total-meta" }, Ir = {
  key: 0,
  class: "iws-total-sub"
}, Vr = { class: "iws-total-sub-value" }, Nr = { class: "iws-table-wrap" }, Er = { class: "iws-table" }, Br = { class: "iws-idx" }, qr = { class: "iws-item-name" }, Ar = { class: "ta-r mono-sm" }, $r = { class: "ta-r mono-sm fw-700 text-danger" }, Lr = { class: "iws-kebab-col" }, Qr = { class: "iws-kebab-wrap" }, Fr = ["onClick"], Hr = { class: "iws-menu iws-menu-row" }, zr = ["onClick"], Wr = ["onClick"], Ur = { class: "iws-total-row" }, Kr = { class: "ta-r fw-700" }, Gr = { class: "ta-r fw-700" }, Yr = { class: "ta-r fw-700" }, Jr = { class: "ta-r fw-700" }, Xr = { class: "ta-r fw-700 text-danger" }, Zr = { class: "ta-r fw-700 text-danger" }, tu = {
  key: 2,
  class: "empty-msg"
}, su = {
  key: 6,
  class: "books-card report-card bs-card"
}, eu = { class: "bs-page-head" }, au = { class: "bs-page-head-actions" }, ou = { class: "bs-asof" }, lu = { class: "iws-export-wrap" }, nu = ["disabled"], iu = { class: "iws-menu" }, du = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, ru = {
  key: 1,
  class: "iws-body"
}, uu = { class: "iws-total-panel iws-total-panel-neg" }, cu = { class: "iws-total-meta" }, mu = {
  key: 0,
  class: "iws-total-sub"
}, vu = { class: "iws-total-sub-value" }, _u = { class: "iws-table-wrap" }, pu = { class: "iws-table" }, yu = { class: "iws-idx" }, bu = { class: "iws-item-name" }, hu = { class: "ta-r mono-sm" }, gu = { class: "ta-r mono-sm fw-700 text-danger" }, fu = { class: "iws-kebab-col" }, ku = { class: "iws-kebab-wrap" }, wu = ["onClick"], xu = { class: "iws-menu iws-menu-row" }, Cu = ["onClick"], Su = ["onClick"], ju = { class: "iws-total-row" }, Mu = { class: "ta-r fw-700" }, Du = { class: "ta-r fw-700" }, Tu = { class: "ta-r fw-700" }, Ru = { class: "ta-r fw-700" }, Ou = { class: "ta-r fw-700 text-danger" }, Pu = { class: "ta-r fw-700 text-danger" }, Iu = {
  key: 2,
  class: "empty-msg"
}, Vu = {
  key: 7,
  class: "books-card report-card bs-card"
}, Nu = { class: "bs-page-head" }, Eu = { class: "bs-page-head-actions" }, Bu = { class: "bs-asof" }, qu = { class: "iws-export-wrap" }, Au = ["disabled"], $u = { class: "iws-menu" }, Lu = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Qu = {
  key: 1,
  class: "iws-body"
}, Fu = { class: "iws-total-panel" }, Hu = { class: "iws-total-meta" }, zu = { class: "iws-table-wrap" }, Wu = { class: "iws-table" }, Uu = { class: "iws-idx" }, Ku = { class: "iws-item-name" }, Gu = { class: "iws-uom" }, Yu = { class: "ta-r mono-sm" }, Ju = { class: "ta-r mono-sm" }, Xu = { class: "ta-r mono-sm" }, Zu = { class: "ta-r mono-sm red" }, tc = { class: "ta-r mono-sm fw-700 green" }, sc = { class: "iws-kebab-col" }, ec = { class: "iws-kebab-wrap" }, ac = ["onClick"], oc = { class: "iws-menu iws-menu-row" }, lc = ["onClick"], nc = ["onClick"], ic = { class: "iws-total-row" }, dc = { class: "ta-r fw-700" }, rc = { class: "ta-r fw-700" }, uc = { class: "ta-r fw-700 red" }, cc = { class: "ta-r fw-700 green" }, mc = {
  key: 2,
  class: "empty-msg"
}, vc = {
  key: 8,
  class: "books-card report-card bs-card"
}, _c = { class: "bs-page-head" }, pc = { class: "bs-page-head-actions" }, yc = { class: "bs-asof" }, bc = { class: "iws-export-wrap" }, hc = ["disabled"], gc = { class: "iws-menu" }, fc = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, kc = {
  key: 1,
  class: "iws-body"
}, wc = { class: "iws-total-panel" }, xc = { class: "iws-total-meta" }, Cc = {
  key: 0,
  class: "iws-total-sub"
}, Sc = { class: "iws-total-sub-value" }, jc = { class: "iws-table-wrap" }, Mc = { class: "iws-table" }, Dc = { class: "iws-idx" }, Tc = { class: "iws-item-name" }, Rc = { class: "ta-r mono-sm" }, Oc = { class: "ta-r mono-sm" }, Pc = { class: "ta-r mono-sm red" }, Ic = { class: "ta-r mono-sm" }, Vc = { class: "ta-r mono-sm" }, Nc = { class: "ta-r mono-sm fw-700 green" }, Ec = { class: "iws-kebab-col" }, Bc = { class: "iws-kebab-wrap" }, qc = ["onClick"], Ac = { class: "iws-menu iws-menu-row" }, $c = ["onClick"], Lc = ["onClick"], Qc = { class: "iws-total-row" }, Fc = { class: "ta-r fw-700" }, Hc = { class: "ta-r fw-700" }, zc = { class: "ta-r fw-700 red" }, Wc = { class: "ta-r fw-700" }, Uc = { class: "ta-r fw-700 red" }, Kc = { class: "ta-r fw-700 green" }, Gc = {
  key: 2,
  class: "empty-msg"
}, Yc = {
  key: 9,
  class: "books-card report-card bs-card"
}, Jc = { class: "bs-page-head" }, Xc = { class: "bs-page-head-actions" }, Zc = { class: "bs-asof" }, tm = { class: "iws-export-wrap" }, sm = ["disabled"], em = { class: "iws-menu" }, am = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, om = { class: "iws-body" }, lm = { class: "iws-total-meta" }, nm = {
  key: 0,
  class: "iws-total-sub"
}, im = { class: "iws-total-sub-value" }, dm = { class: "iws-table-wrap" }, rm = { class: "iws-table" }, um = { class: "iws-idx" }, cm = { class: "iws-item-name" }, mm = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "No valuation or standard buying rate found for this item — margin below is not meaningful"
}, vm = { class: "ta-r mono-sm" }, _m = { class: "ta-r mono-sm" }, pm = { class: "ta-r mono-sm" }, ym = { class: "ta-r mono-sm red" }, bm = { class: "iws-kebab-col" }, hm = { class: "iws-kebab-wrap" }, gm = ["onClick"], fm = { class: "iws-menu iws-menu-row" }, km = ["onClick"], wm = ["onClick"], xm = { class: "iws-total-row" }, Cm = { class: "ta-r fw-700" }, Sm = { class: "ta-r fw-700" }, jm = { class: "ta-r fw-700 red" }, Mm = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-top": "10px" }
}, Dm = {
  key: 2,
  class: "empty-msg"
}, Tm = {
  key: 10,
  class: "books-card report-card bs-card"
}, Rm = { class: "bs-page-head" }, Om = { class: "bs-page-head-actions" }, Pm = { class: "bs-asof" }, Im = { class: "iws-export-wrap" }, Vm = ["disabled"], Nm = { class: "iws-menu" }, Em = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Bm = {
  key: 1,
  class: "iws-body"
}, qm = { class: "iws-total-meta" }, Am = {
  key: 0,
  class: "iws-total-sub"
}, $m = { class: "iws-total-sub-label" }, Lm = { style: { "font-size": "11px", color: "var(--text-3)", "margin-top": "4px" } }, Qm = { class: "iws-table-wrap" }, Fm = { class: "iws-table" }, Hm = { class: "iws-idx" }, zm = ["checked"], Wm = { class: "iws-idx" }, Um = ["checked", "onChange"], Km = { class: "mono-sm" }, Gm = ["onClick"], Ym = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "One or more items on this invoice have no valuation or standard buying rate — cost/margin is understated"
}, Jm = { class: "mono-sm" }, Xm = { class: "iws-item-name" }, Zm = { class: "ta-r mono-sm" }, tv = { class: "ta-r mono-sm red" }, sv = { class: "iws-kebab-col" }, ev = { class: "iws-kebab-wrap" }, av = ["onClick"], ov = { class: "iws-menu iws-menu-row" }, lv = ["onClick"], nv = ["onClick"], iv = ["onClick"], dv = { class: "iws-total-row" }, rv = { class: "ta-r fw-700" }, uv = { class: "ta-r fw-700 red" }, cv = {
  key: 2,
  class: "empty-msg"
}, mv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "180px", "border-radius": "8px" }
}, vv = { style: { display: "flex", "flex-wrap": "wrap", gap: "16px", "font-size": "12.5px", color: "#868E96", "margin-bottom": "14px" } }, _v = { style: { color: "#212529" } }, pv = { style: { color: "#212529" } }, yv = { style: { color: "#212529" } }, bv = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" }
}, hv = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, gv = { class: "ta-r mono-sm" }, fv = { class: "ta-r mono-sm" }, kv = { class: "ta-r mono-sm" }, wv = { class: "ta-r mono-sm" }, xv = { class: "ta-r mono-sm red" }, Cv = { class: "aging-totals-row" }, Sv = { class: "ta-r fw-700" }, jv = { class: "ta-r fw-700 red" }, Mv = {
  key: 2,
  class: "empty-msg"
}, Dv = {
  key: 11,
  class: "books-card report-card bs-card"
}, Tv = { class: "bs-page-head" }, Rv = { class: "bs-page-head-actions" }, Ov = { class: "bs-asof" }, Pv = { class: "iws-export-wrap" }, Iv = ["disabled"], Vv = { class: "iws-menu" }, Nv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Ev = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(2, 1fr)", "margin-bottom": "14px" }
}, Bv = { class: "bs-kpi bs-kpi-assets" }, qv = { class: "bs-kpi-body" }, Av = { class: "bs-kpi-amount" }, $v = { class: "bs-kpi bs-kpi-liabilities" }, Lv = { class: "bs-kpi-body" }, Qv = { class: "bs-kpi-amount" }, Fv = { class: "bs-sum-status-icon" }, Hv = { class: "bs-sum-status-body" }, zv = { class: "bs-sum-status-title" }, Wv = { class: "bs-sum-status-eq" }, Uv = {
  class: "iws-table-wrap",
  style: { "margin-top": "14px" }
}, Kv = { class: "iws-table" }, Gv = { class: "iws-idx" }, Yv = { class: "iws-item-name" }, Jv = {
  class: "iws-uom",
  style: { background: "#f1f5f9", color: "#475569" }
}, Xv = { class: "ta-r mono-sm green" }, Zv = { class: "ta-r mono-sm red" }, t1 = { class: "iws-kebab-col" }, s1 = { class: "iws-kebab-wrap" }, e1 = ["onClick"], a1 = { class: "iws-menu iws-menu-row" }, o1 = ["onClick"], l1 = ["onClick"], n1 = { class: "iws-total-row" }, i1 = { class: "ta-r fw-700" }, d1 = { class: "ta-r fw-700 green" }, r1 = { class: "ta-r fw-700 red" }, u1 = { class: "ta-r fw-700" }, c1 = {
  key: 2,
  class: "empty-msg"
}, m1 = {
  key: 12,
  class: "books-card report-card bs-card"
}, v1 = { class: "bs-page-head" }, _1 = { class: "bs-page-head-actions" }, p1 = { class: "bs-asof" }, y1 = { class: "iws-export-wrap" }, b1 = ["disabled"], h1 = { class: "iws-menu" }, g1 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, f1 = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(3, 1fr)", "margin-bottom": "14px" }
}, k1 = { class: "bs-kpi bs-kpi-assets" }, w1 = { class: "bs-kpi-body" }, x1 = { class: "bs-kpi-amount" }, C1 = { class: "bs-kpi bs-kpi-equity" }, S1 = { class: "bs-kpi-body" }, j1 = { class: "bs-kpi-amount" }, M1 = { class: "bs-kpi-body" }, D1 = { class: "bs-sum-status-icon" }, T1 = { class: "bs-sum-status-body" }, R1 = { class: "bs-sum-status-title" }, O1 = { class: "bs-sum-status-eq" }, P1 = {
  key: 0,
  class: "sgl-grir-note"
}, I1 = { class: "mono-sm fw-600" }, V1 = {
  class: "iws-table-wrap",
  style: { "margin-bottom": "20px" }
}, N1 = { class: "iws-table" }, E1 = { class: "iws-idx" }, B1 = { class: "iws-item-name" }, q1 = { class: "ta-r mono-sm" }, A1 = { class: "ta-r mono-sm" }, $1 = { class: "iws-kebab-col" }, L1 = { class: "iws-kebab-wrap" }, Q1 = ["onClick"], F1 = { class: "iws-menu iws-menu-row" }, H1 = ["onClick"], z1 = { class: "iws-table-wrap" }, W1 = { class: "iws-table" }, U1 = { class: "iws-idx" }, K1 = { class: "iws-item-name" }, G1 = { class: "iws-uom" }, Y1 = { class: "ta-r mono-sm" }, J1 = { class: "ta-r mono-sm" }, X1 = { class: "ta-r mono-sm fw-700 green" }, Z1 = { class: "iws-kebab-col" }, t_ = { class: "iws-kebab-wrap" }, s_ = ["onClick"], e_ = { class: "iws-menu iws-menu-row" }, a_ = ["onClick"], o_ = ["onClick"], l_ = { class: "iws-total-row" }, n_ = { class: "ta-r fw-700 green" }, i_ = {
  key: 2,
  class: "empty-msg"
}, d_ = {
  key: 13,
  class: "books-card report-card bs-card"
}, r_ = { class: "bs-page-head" }, u_ = { class: "bs-page-head-actions" }, c_ = { class: "bs-asof" }, m_ = { class: "iws-export-wrap" }, v_ = ["disabled"], __ = { class: "iws-menu" }, p_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, y_ = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "1fr", "margin-bottom": "14px" }
}, b_ = { class: "bs-kpi bs-kpi-assets" }, h_ = { class: "bs-kpi-body" }, g_ = { class: "bs-kpi-amount" }, f_ = { class: "iws-table-wrap" }, k_ = { class: "iws-table" }, w_ = { class: "iws-idx" }, x_ = { class: "iws-item-name" }, C_ = { class: "ta-r mono-sm fw-700 green" }, S_ = { class: "ta-r mono-sm" }, j_ = { class: "iws-total-row" }, M_ = { class: "ta-r fw-700 green" }, D_ = {
  key: 1,
  class: "empty-msg"
}, T_ = {
  key: 2,
  class: "empty-msg"
}, R_ = {
  key: 14,
  class: "books-card report-card bs-card"
}, O_ = { class: "bs-page-head" }, P_ = { class: "bs-page-head-actions" }, I_ = { class: "iws-export-wrap" }, V_ = ["disabled"], N_ = { class: "iws-menu" }, E_ = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap", "margin-bottom": "12px" } }, B_ = ["value"], q_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, A_ = {
  key: 1,
  class: "iws-table-wrap"
}, $_ = { class: "iws-table" }, L_ = { class: "iws-idx" }, Q_ = { class: "iws-item-name" }, F_ = {
  class: "mono-sm",
  style: { opacity: ".65" }
}, H_ = { class: "ta-r mono-sm" }, z_ = { class: "ta-r mono-sm fw-700 green" }, W_ = { class: "ta-r mono-sm fw-700" }, U_ = {
  key: 2,
  class: "empty-msg"
}, K_ = {
  key: 15,
  class: "books-card report-card bs-card"
}, G_ = { class: "bs-page-head" }, Y_ = { class: "bs-page-head-actions" }, J_ = { class: "bs-asof" }, X_ = { class: "iws-export-wrap" }, Z_ = ["disabled"], tp = { class: "iws-menu" }, sp = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, ep = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "18px" }
}, ap = { class: "mis-summary-card" }, op = { class: "mis-summary-val" }, lp = { class: "mis-summary-card" }, np = { class: "mis-summary-val green" }, ip = { class: "mis-summary-card" }, dp = { class: "mis-summary-val" }, rp = { class: "mis-summary-card" }, up = { class: "mis-summary-val red" }, cp = { class: "mis-summary-card" }, mp = { class: "mis-summary-val" }, vp = { class: "mis-summary-card" }, _p = { class: "mis-summary-val" }, pp = { class: "mis-summary-card" }, yp = { class: "mis-summary-val" }, bp = { class: "mis-summary-card" }, hp = { class: "iws-table-wrap" }, gp = { class: "iws-table" }, fp = { class: "iws-item-name" }, kp = { class: "ta-r mono-sm" }, wp = { class: "ta-r mono-sm green" }, xp = { class: "ta-r mono-sm" }, Cp = { class: "ta-r mono-sm red" }, Sp = { class: "ta-r mono-sm" }, jp = { class: "ta-r mono-sm" }, Mp = { class: "ta-r mono-sm" }, Dp = { class: "ta-r mono-sm" }, Tp = { class: "ta-r mono-sm fw-600" }, Rp = { class: "iws-total-row" }, Op = { class: "ta-r fw-700" }, Pp = { class: "ta-r fw-700 green" }, Ip = { class: "ta-r fw-700" }, Vp = { class: "ta-r fw-700 red" }, Np = { class: "ta-r fw-700" }, Ep = { class: "ta-r fw-700" }, Bp = { class: "ta-r fw-700" }, qp = { class: "ta-r fw-700" }, Ap = { class: "ta-r fw-700" }, $p = {
  key: 1,
  class: "empty-msg"
}, Lp = {
  key: 2,
  class: "empty-msg"
}, Qp = {
  key: 16,
  class: "books-card report-card bs-card"
}, Fp = { class: "bs-page-head" }, Hp = { class: "bs-page-head-actions" }, zp = { class: "bs-asof" }, Wp = { class: "iws-export-wrap" }, Up = ["disabled"], Kp = { class: "iws-menu" }, Gp = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Yp = ["onClick"], Jp = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Xp = {
  key: 0,
  class: "mis-summary-grid"
}, Zp = { class: "mis-summary-card" }, ty = { class: "mis-summary-val" }, sy = { class: "mis-summary-card" }, ey = { class: "mis-summary-val" }, ay = { class: "mis-summary-card" }, oy = { class: "mis-summary-val" }, ly = { class: "mis-summary-card" }, ny = { class: "mis-summary-val red" }, iy = { class: "mis-summary-card" }, dy = { class: "mis-summary-val green" }, ry = { class: "mis-summary-card" }, uy = { class: "mis-summary-val" }, cy = { class: "mis-summary-card" }, my = { class: "mis-summary-val" }, vy = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, _y = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, py = { class: "mis-summary-card" }, yy = { class: "mis-summary-val" }, by = { class: "mis-summary-card" }, hy = { class: "mis-summary-val green" }, gy = { class: "mis-summary-card" }, fy = { class: "mono" }, ky = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wy = { class: "ta-r mono-sm" }, xy = { class: "ta-r mono-sm" }, Cy = { class: "ta-r mono-sm red" }, Sy = { class: "ta-r mono-sm fw-600" }, jy = {
  key: 3,
  class: "books-table aging-table",
  style: { width: "100%" }
}, My = { class: "ta-r mono-sm" }, Dy = { class: "ta-r mono-sm fw-600" }, Ty = { class: "ta-r mono-sm" }, Ry = {
  key: 4,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Oy = { class: "ta-r mono-sm" }, Py = { class: "ta-r mono-sm fw-600" }, Iy = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, Vy = { class: "ta-r mono-sm" }, Ny = { class: "ta-r mono-sm fw-600" }, Ey = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, By = { class: "mis-summary-card" }, qy = { class: "mis-summary-val" }, Ay = { class: "mis-summary-card" }, $y = { class: "mis-summary-val red" }, Ly = { class: "mis-summary-card" }, Qy = { class: "mis-summary-val" }, Fy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Hy = { class: "ta-r mono-sm red" }, zy = {
  key: 1,
  class: "empty-msg"
}, Wy = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Uy = { class: "mis-summary-card" }, Ky = { class: "mis-summary-val red" }, Gy = { class: "mis-summary-card" }, Yy = { class: "mis-summary-val red" }, Jy = { class: "mis-summary-card" }, Xy = { class: "mis-summary-val" }, Zy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, tb = { class: "ta-r mono-sm red" }, sb = { class: "ta-r mono-sm red" }, eb = { class: "ta-r mono-sm" }, ab = {
  key: 1,
  class: "empty-msg"
}, ob = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, lb = { class: "ta-r mono-sm red" }, nb = { class: "ta-r mono-sm" }, ib = {
  key: 3,
  class: "empty-msg"
}, db = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, rb = { class: "mis-summary-card" }, ub = { class: "mis-summary-val" }, cb = { class: "mis-summary-card" }, mb = { class: "mis-summary-val red" }, vb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _b = { class: "badge badge-blue" }, pb = { class: "ta-r mono-sm" }, yb = { class: "ta-r mono-sm green" }, bb = { class: "ta-r mono-sm red fw-600" }, hb = {
  key: 1,
  class: "empty-msg"
}, gb = { class: "mis-summary-grid" }, fb = { class: "mis-summary-card" }, kb = { class: "mis-summary-val" }, wb = { class: "mis-summary-card" }, xb = { class: "mis-summary-val green" }, Cb = { class: "mis-summary-card" }, Sb = { class: "mis-summary-card" }, jb = { class: "mis-summary-val" }, Mb = { class: "mis-summary-card" }, Db = { class: "mis-summary-val green" }, Tb = { class: "mis-summary-card" }, Rb = { class: "mis-summary-val" }, Ob = {
  key: 2,
  class: "empty-msg"
}, Pb = {
  key: 17,
  class: "books-card report-card bs-card"
}, Ib = { class: "bs-page-head" }, Vb = { class: "bs-page-head-actions" }, Nb = { class: "bs-asof" }, Eb = { class: "iws-export-wrap" }, Bb = ["disabled"], qb = { class: "iws-menu" }, Ab = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, $b = ["onClick"], Lb = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Qb = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Fb = { class: "mono" }, Hb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(4,1fr)" }
}, zb = { class: "mis-summary-card" }, Wb = { class: "mis-summary-val" }, Ub = { class: "mis-summary-card" }, Kb = { class: "mis-summary-val" }, Gb = { class: "mis-summary-card" }, Yb = { class: "mis-summary-val red" }, Jb = { class: "mis-summary-card" }, Xb = { class: "mis-summary-val green" }, Zb = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, t2 = { class: "mono" }, s2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, e2 = { class: "ta-r mono-sm" }, a2 = { class: "ta-r mono-sm fw-600" }, o2 = {
  key: 1,
  class: "empty-msg"
}, l2 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, n2 = { class: "aging-bucket" }, i2 = { class: "bucket-val mono-sm" }, d2 = { class: "aging-bucket" }, r2 = { class: "bucket-val mono-sm" }, u2 = { class: "aging-bucket" }, c2 = { class: "bucket-val mono-sm" }, m2 = { class: "aging-bucket" }, v2 = { class: "bucket-val mono-sm red" }, _2 = { class: "aging-bucket" }, p2 = { class: "bucket-val mono-sm fw-700" }, y2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, b2 = { class: "ta-r mono-sm" }, h2 = { class: "ta-r mono-sm" }, g2 = { class: "ta-r mono-sm" }, f2 = { class: "ta-r mono-sm red" }, k2 = { class: "ta-r mono-sm fw-600" }, w2 = {
  key: 1,
  class: "empty-msg"
}, x2 = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, C2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, S2 = { class: "mis-summary-card" }, j2 = { class: "mis-summary-val" }, M2 = { class: "mis-summary-card" }, D2 = { class: "mis-summary-val green" }, T2 = { class: "mis-summary-card" }, R2 = { class: "mono" }, O2 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, P2 = { class: "mono" }, I2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, V2 = { class: "ta-r mono-sm" }, N2 = { class: "ta-r mono-sm green" }, E2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, B2 = { class: "mis-summary-card" }, q2 = { class: "mis-summary-val" }, A2 = { class: "mis-summary-card" }, $2 = { class: "mis-summary-val red" }, L2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Q2 = { class: "ta-r mono-sm red fw-600" }, F2 = { class: "ta-r mono-sm" }, H2 = {
  key: 1,
  class: "empty-msg"
}, z2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, W2 = { class: "ta-r mono-sm" }, U2 = { class: "ta-r mono-sm" }, K2 = {
  key: 1,
  class: "empty-msg"
}, G2 = { class: "mis-summary-grid" }, Y2 = { class: "mis-summary-card" }, J2 = { class: "mis-summary-val" }, X2 = { class: "mis-summary-card" }, Z2 = { class: "mis-summary-val" }, th = { class: "mis-summary-card" }, sh = { class: "mis-summary-val" }, eh = { class: "mis-summary-card" }, ah = { class: "mis-summary-val green" }, oh = { class: "mis-summary-card" }, lh = { class: "mis-summary-val red" }, nh = { class: "mis-summary-card" }, ih = {
  key: 2,
  class: "empty-msg"
}, dh = {
  key: 18,
  class: "books-card report-card bs-card"
}, rh = { class: "bs-page-head" }, uh = { class: "bs-page-head-actions" }, ch = { class: "bs-asof" }, mh = { class: "iws-export-wrap" }, vh = ["disabled"], _h = { class: "iws-menu" }, ph = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, yh = ["onClick"], bh = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, hh = {
  key: 0,
  class: "mis-summary-grid"
}, gh = { class: "mis-summary-card" }, fh = { class: "mis-summary-val" }, kh = { class: "mis-summary-card" }, wh = { class: "mis-summary-val" }, xh = { class: "mis-summary-card" }, Ch = { class: "mis-summary-val" }, Sh = { class: "mis-summary-card" }, jh = { class: "mis-summary-val green" }, Mh = { class: "mis-summary-card" }, Dh = { class: "mis-summary-val red" }, Th = { class: "mis-summary-card" }, Rh = { class: "mis-summary-val" }, Oh = { class: "mis-summary-card" }, Ph = { class: "mis-summary-val" }, Ih = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Vh = { class: "ta-r mono-sm" }, Nh = { class: "ta-r mono-sm fw-600" }, Eh = { class: "ta-r mono-sm" }, Bh = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qh = { class: "ta-r mono-sm" }, Ah = { class: "ta-r mono-sm" }, $h = { class: "ta-r mono-sm" }, Lh = { class: "ta-r mono-sm fw-600" }, Qh = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, Fh = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, Hh = { class: "mis-summary-card" }, zh = { class: "mis-summary-val" }, Wh = { class: "mis-summary-card" }, Uh = { class: "mis-summary-val red" }, Kh = { class: "mis-summary-card" }, Gh = { class: "mono" }, Yh = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Jh = { key: 0 }, Xh = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Zh = { class: "ta-r mono-sm" }, tg = { class: "ta-r mono-sm" }, sg = { class: "ta-r mono-sm" }, eg = {
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
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, pg = { class: "mis-summary-card" }, yg = { class: "mis-summary-val" }, bg = { class: "mis-summary-card" }, hg = { class: "mis-summary-val red" }, gg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, fg = { class: "badge badge-blue" }, kg = { class: "ta-r mono-sm" }, wg = { class: "ta-r mono-sm" }, xg = { class: "ta-r mono-sm red fw-600" }, Cg = {
  key: 1,
  class: "empty-msg"
}, Sg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, jg = { class: "mis-summary-card" }, Mg = { class: "mis-summary-val" }, Dg = { class: "mis-summary-card" }, Tg = { class: "mis-summary-val green" }, Rg = { class: "mis-summary-card" }, Og = { class: "mis-summary-val" }, Pg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ig = { class: "ta-r mono-sm fw-600" }, Vg = {
  key: 1,
  class: "empty-msg"
}, Ng = {
  key: 2,
  class: "empty-msg"
}, Eg = {
  key: 19,
  class: "books-card report-card bs-card"
}, Bg = { class: "bs-page-head" }, qg = { class: "bs-page-head-actions" }, Ag = { class: "bs-asof" }, $g = { class: "iws-export-wrap" }, Lg = ["disabled"], Qg = { class: "iws-menu" }, Fg = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Hg = ["onClick"], zg = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Wg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Ug = { class: "mis-summary-card" }, Kg = { class: "mis-summary-val" }, Gg = { class: "mis-summary-card" }, Yg = { class: "mis-summary-val green" }, Jg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Xg = { class: "ta-r mono-sm" }, Zg = { class: "ta-r mono-sm" }, t0 = { class: "ta-r mono-sm fw-600" }, s0 = {
  key: 1,
  class: "empty-msg"
}, e0 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, a0 = { class: "mono" }, o0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, l0 = { class: "ta-r mono-sm" }, n0 = { class: "ta-r mono-sm" }, i0 = { class: "ta-r mono-sm fw-600" }, d0 = {
  key: 1,
  class: "empty-msg"
}, r0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, u0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, c0 = { class: "ta-r mono-sm fw-600 green" }, m0 = { class: "ta-r mono-sm" }, v0 = { class: "ta-r mono-sm" }, _0 = {
  key: 1,
  class: "empty-msg"
}, p0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, y0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, b0 = { class: "ta-r mono-sm" }, h0 = { class: "ta-r mono-sm" }, g0 = { class: "ta-r mono-sm red" }, f0 = {
  key: 1,
  class: "empty-msg"
}, k0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, w0 = { class: "mis-summary-card" }, x0 = { class: "mis-summary-val" }, C0 = { class: "mis-summary-card" }, S0 = { class: "mis-summary-val red" }, j0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, M0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, D0 = { class: "ta-r mono-sm" }, T0 = { class: "ta-r mono-sm fw-600" }, R0 = { class: "ta-r mono-sm red" }, O0 = {
  key: 1,
  class: "empty-msg"
}, P0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, I0 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, V0 = { class: "aging-bucket" }, N0 = { class: "bucket-val mono-sm" }, E0 = { class: "aging-bucket" }, B0 = { class: "bucket-val mono-sm" }, q0 = { class: "aging-bucket" }, A0 = { class: "bucket-val mono-sm" }, $0 = { class: "aging-bucket" }, L0 = { class: "bucket-val mono-sm red" }, Q0 = { class: "aging-bucket" }, F0 = { class: "bucket-val mono-sm fw-700" }, H0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, z0 = { class: "ta-r mono-sm" }, W0 = { class: "ta-r mono-sm" }, U0 = {
  key: 1,
  class: "empty-msg"
}, K0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, G0 = { class: "mis-summary-card" }, Y0 = { class: "mis-summary-val red" }, J0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, X0 = { class: "ta-r mono-sm red fw-600" }, Z0 = { class: "ta-r mono-sm" }, tf = { class: "ta-r mono-sm" }, sf = { class: "ta-r mono-sm" }, ef = {
  key: 1,
  class: "empty-msg"
}, af = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, of = { class: "mis-summary-card" }, lf = { class: "mis-summary-val red" }, nf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, df = { class: "ta-r mono-sm" }, rf = { class: "ta-r mono-sm" }, uf = { class: "ta-r mono-sm red" }, cf = { class: "ta-r mono-sm" }, mf = { class: "ta-r mono-sm fw-600" }, vf = {
  key: 1,
  class: "empty-msg"
}, _f = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, pf = { class: "mis-summary-card" }, yf = { class: "mis-summary-val" }, bf = { class: "mis-summary-card" }, hf = { class: "mis-summary-val green" }, gf = { class: "mis-summary-card" }, ff = { class: "mis-summary-val red" }, kf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wf = {
  key: 1,
  class: "empty-msg"
}, xf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Cf = { class: "mis-summary-card" }, Sf = { class: "mis-summary-val" }, jf = { class: "mis-summary-card" }, Mf = { class: "mis-summary-val red" }, Df = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Tf = { class: "ta-r mono-sm red fw-600" }, Rf = { class: "ta-r mono-sm red" }, Of = {
  key: 1,
  class: "empty-msg"
}, Pf = {
  key: 2,
  class: "empty-msg"
}, If = {
  key: 20,
  class: "books-card report-card bs-card"
}, Vf = { class: "bs-page-head" }, Nf = { class: "bs-page-head-actions" }, Ef = { class: "bs-asof" }, Bf = { class: "iws-export-wrap" }, qf = ["disabled"], Af = { class: "iws-menu" }, $f = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Lf = ["onClick"], Qf = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Ff = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Hf = { class: "mis-summary-card" }, zf = { class: "mis-summary-val" }, Wf = { class: "mis-summary-card" }, Uf = { class: "mis-summary-val green" }, Kf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Gf = { class: "ta-r mono-sm" }, Yf = { class: "ta-r mono-sm" }, Jf = { class: "ta-r mono-sm" }, Xf = {
  key: 1,
  class: "empty-msg"
}, Zf = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, tk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, sk = { class: "mis-summary-card" }, ek = { class: "mis-summary-val red" }, ak = { class: "mis-summary-card" }, ok = { class: "mis-summary-val red" }, lk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nk = { class: "ta-r mono-sm" }, ik = { class: "ta-r mono-sm" }, dk = { class: "ta-r mono-sm fw-600 red" }, rk = {
  key: 1,
  class: "empty-msg"
}, uk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, ck = { class: "mis-summary-card" }, mk = { class: "mis-summary-val" }, vk = { class: "mis-summary-card" }, _k = { class: "mis-summary-val" }, pk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, yk = { class: "ta-r mono-sm" }, bk = { class: "ta-r mono-sm" }, hk = { class: "ta-r mono-sm" }, gk = { class: "ta-r mono-sm" }, fk = {
  key: 1,
  class: "empty-msg"
}, kk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, wk = { class: "mis-summary-card" }, xk = { class: "mis-summary-val red" }, Ck = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Sk = { class: "ta-r mono-sm" }, jk = { class: "ta-r mono-sm" }, Mk = { class: "ta-r mono-sm fw-600 red" }, Dk = {
  key: 1,
  class: "empty-msg"
}, Tk = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, Rk = { class: "mono" }, Ok = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Pk = { class: "ta-r mono-sm" }, Ik = { class: "ta-r mono-sm" }, Vk = { class: "ta-r mono-sm fw-600" }, Nk = {
  key: 1,
  class: "empty-msg"
}, Ek = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, Bk = { class: "mis-summary-card" }, qk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ak = { class: "ta-r mono-sm" }, $k = { class: "ta-r mono-sm" }, Lk = {
  key: 1,
  class: "empty-msg"
}, Qk = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Fk = { class: "mis-summary-card" }, Hk = { class: "mis-summary-val" }, zk = { class: "mis-summary-card" }, Wk = { class: "mis-summary-val" }, Uk = { class: "mis-summary-card" }, Kk = { class: "mis-summary-val fw-700" }, Gk = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Yk = { class: "ta-r mono-sm" }, Jk = { class: "ta-r mono-sm" }, Xk = { class: "ta-r mono-sm" }, Zk = { class: "ta-r mono-sm fw-600" }, t4 = { class: "ta-r mono-sm" }, s4 = {
  key: 1,
  class: "empty-msg"
}, e4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, a4 = { class: "mis-summary-card" }, o4 = { class: "mis-summary-val" }, l4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n4 = { class: "ta-r mono-sm" }, i4 = { class: "ta-r mono-sm" }, d4 = {
  key: 1,
  class: "empty-msg"
}, r4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, u4 = { class: "mis-summary-card" }, c4 = { class: "mis-summary-val red" }, m4 = { class: "mis-summary-card" }, v4 = { class: "mis-summary-val red" }, _4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, p4 = { class: "ta-r mono-sm red fw-600" }, y4 = { class: "ta-r mono-sm" }, b4 = {
  key: 1,
  class: "empty-msg"
}, h4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, g4 = { class: "mis-summary-card" }, f4 = { class: "mis-summary-val red" }, k4 = { class: "mis-summary-card" }, w4 = { class: "mis-summary-val red" }, x4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, C4 = { class: "ta-r mono-sm red fw-600" }, S4 = { class: "ta-r mono-sm" }, j4 = {
  key: 1,
  class: "empty-msg"
}, M4 = {
  key: 2,
  class: "empty-msg"
}, D4 = {
  key: 21,
  class: "books-card report-card bs-card"
}, T4 = { class: "bs-page-head" }, R4 = { class: "bs-page-head-actions" }, O4 = { class: "bs-asof" }, P4 = { class: "iws-export-wrap" }, I4 = ["disabled"], V4 = { class: "iws-menu" }, N4 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, E4 = ["onClick"], B4 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, q4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, A4 = { class: "mis-summary-card" }, $4 = { class: "mis-summary-val" }, L4 = { class: "mis-summary-card" }, Q4 = { class: "mis-summary-val green" }, F4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, H4 = { class: "ta-r mono-sm" }, z4 = { class: "ta-r mono-sm" }, W4 = { class: "ta-r mono-sm" }, U4 = { class: "ta-r mono-sm fw-600 green" }, K4 = {
  key: 1,
  class: "empty-msg"
}, G4 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Y4 = { class: "mis-summary-card" }, J4 = { class: "mis-summary-val" }, X4 = { class: "mis-summary-card" }, Z4 = { class: "mis-summary-val" }, tw = { class: "mis-summary-card" }, sw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ew = { class: "ta-r mono-sm" }, aw = { class: "ta-r mono-sm" }, ow = { class: "ta-r mono-sm" }, lw = {
  key: 1,
  class: "empty-msg"
}, nw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, iw = { class: "ta-r mono-sm" }, dw = { class: "ta-r mono-sm" }, rw = { class: "ta-r mono-sm fw-600" }, uw = {
  key: 1,
  class: "empty-msg"
}, cw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, mw = { class: "ta-r mono-sm" }, vw = { class: "ta-r mono-sm" }, _w = {
  key: 1,
  class: "empty-msg"
}, pw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, yw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bw = { class: "ta-r mono-sm fw-600 green" }, hw = { class: "ta-r mono-sm" }, gw = { class: "ta-r mono-sm" }, fw = {
  key: 1,
  class: "empty-msg"
}, kw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ww = { class: "ta-r mono-sm" }, xw = { class: "ta-r mono-sm" }, Cw = { class: "ta-r mono-sm fw-600" }, Sw = {
  key: 1,
  class: "empty-msg"
}, jw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Mw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Dw = { class: "mis-summary-card" }, Tw = { class: "mis-summary-val red" }, Rw = { class: "mis-summary-card" }, Ow = { class: "mis-summary-val red" }, Pw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Iw = { class: "ta-r mono-sm red fw-600" }, Vw = { class: "ta-r mono-sm red" }, Nw = { class: "ta-r mono-sm" }, Ew = {
  key: 1,
  class: "empty-msg"
}, Bw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qw = { class: "ta-r mono-sm fw-600 green" }, Aw = { class: "ta-r mono-sm" }, $w = {
  key: 1,
  class: "empty-msg"
}, Lw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Qw = { class: "ta-r mono-sm red fw-600" }, Fw = { class: "ta-r mono-sm" }, Hw = {
  key: 1,
  class: "empty-msg"
}, zw = {
  key: 2,
  class: "empty-msg"
}, Ww = {
  key: 22,
  class: "books-card report-card bs-card"
}, Uw = { class: "bs-page-head" }, Kw = { class: "bs-page-head-actions" }, Gw = { class: "bs-asof" }, Yw = { class: "iws-export-wrap" }, Jw = ["disabled"], Xw = { class: "iws-menu" }, Zw = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, t8 = ["onClick"], s8 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, e8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, a8 = { class: "mis-summary-grid" }, o8 = { class: "mis-summary-card" }, l8 = { class: "mis-summary-val" }, n8 = { class: "mis-summary-card" }, i8 = { class: "mis-summary-val green" }, d8 = { class: "mis-summary-card" }, r8 = { class: "mis-summary-val" }, u8 = { class: "mis-summary-card" }, c8 = { class: "mis-summary-val" }, m8 = { class: "mis-summary-card" }, v8 = { class: "mis-summary-val" }, _8 = { class: "mis-summary-card" }, p8 = { class: "mis-summary-val" }, y8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, b8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, h8 = { class: "mis-summary-card" }, g8 = { class: "mis-summary-val" }, f8 = { class: "mis-summary-card" }, k8 = { class: "mis-summary-val red" }, w8 = { class: "mis-summary-card" }, x8 = { class: "mis-summary-val red" }, C8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, S8 = { class: "ta-r mono-sm" }, j8 = { class: "ta-r mono-sm red fw-600" }, M8 = { class: "ta-r mono-sm" }, D8 = {
  key: 1,
  class: "empty-msg"
}, T8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, R8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, O8 = { class: "mis-summary-card" }, P8 = { class: "mis-summary-val" }, I8 = { class: "mis-summary-card" }, V8 = { class: "mis-summary-val red" }, N8 = { class: "mis-summary-card" }, E8 = { class: "mis-summary-val red" }, B8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, q8 = { class: "ta-r mono-sm" }, A8 = { class: "ta-r mono-sm" }, $8 = { class: "ta-r mono-sm red fw-600" }, L8 = {
  key: 1,
  class: "empty-msg"
}, Q8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, F8 = { class: "mis-summary-card" }, H8 = { class: "mis-summary-val red" }, z8 = { class: "mis-summary-card" }, W8 = { class: "mis-summary-val red" }, U8 = { class: "mis-summary-card" }, K8 = { class: "mis-summary-val red" }, G8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Y8 = { class: "red fw-600" }, J8 = { class: "ta-r mono-sm red fw-600" }, X8 = { class: "ta-r mono-sm" }, Z8 = {
  key: 1,
  class: "empty-msg"
}, t7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, s7 = { class: "ta-r mono-sm" }, e7 = { class: "ta-r mono-sm" }, a7 = { class: "ta-r mono-sm red fw-600" }, o7 = {
  key: 1,
  class: "empty-msg"
}, l7 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, n7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, i7 = { class: "ta-r mono-sm" }, d7 = { class: "ta-r mono-sm" }, r7 = { class: "ta-r mono-sm" }, u7 = { class: "ta-r mono-sm fw-600" }, c7 = {
  key: 1,
  class: "empty-msg"
}, m7 = {
  key: 2,
  class: "empty-msg"
}, v7 = {
  key: 23,
  class: "books-card report-card bs-card"
}, _7 = { class: "bs-page-head" }, p7 = { class: "bs-page-head-actions" }, y7 = { class: "bs-asof" }, b7 = { class: "iws-export-wrap" }, h7 = ["disabled"], g7 = { class: "iws-menu" }, f7 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, k7 = ["onClick"], w7 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, x7 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, C7 = { class: "mis-summary-grid" }, S7 = { class: "mis-summary-card" }, j7 = { class: "mis-summary-val" }, M7 = { class: "mis-summary-card" }, D7 = { class: "mis-summary-val" }, T7 = { class: "mis-summary-card" }, R7 = { class: "mis-summary-val" }, O7 = { class: "mis-summary-card" }, P7 = { class: "mis-summary-val" }, I7 = { class: "mis-summary-card" }, V7 = { class: "mis-summary-val green" }, N7 = { class: "mis-summary-card" }, E7 = { class: "mis-summary-val red" }, B7 = { class: "mis-summary-card" }, q7 = { class: "mis-summary-val green" }, A7 = { class: "mis-summary-card" }, $7 = { class: "mis-summary-val red" }, L7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Q7 = { class: "badge badge-blue" }, F7 = { class: "ta-r mono-sm fw-600" }, H7 = {
  key: 1,
  class: "empty-msg"
}, z7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, W7 = { class: "ta-r mono-sm fw-600" }, U7 = {
  key: 1,
  class: "empty-msg"
}, K7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, G7 = { class: "badge badge-blue" }, Y7 = { class: "ta-r mono-sm fw-600" }, J7 = {
  key: 1,
  class: "empty-msg"
}, X7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Z7 = { class: "ta-r mono-sm fw-600" }, t6 = {
  key: 1,
  class: "empty-msg"
}, s6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, e6 = { class: "ta-r mono-sm fw-600 green" }, a6 = {
  key: 1,
  class: "empty-msg"
}, o6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, l6 = { class: "red fw-600" }, n6 = { class: "badge badge-blue" }, i6 = { class: "ta-r mono-sm" }, d6 = {
  key: 1,
  class: "empty-msg"
}, r6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, u6 = { class: "badge badge-blue" }, c6 = { class: "ta-r mono-sm fw-600 green" }, m6 = {
  key: 1,
  class: "empty-msg"
}, v6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _6 = { class: "ta-r mono-sm red fw-600" }, p6 = {
  key: 1,
  class: "empty-msg"
}, y6 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, b6 = { class: "mis-summary-card" }, h6 = { class: "mis-summary-val" }, g6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, f6 = { class: "badge badge-blue" }, k6 = { class: "ta-r mono-sm" }, w6 = { class: "ta-r mono-sm fw-600" }, x6 = {
  key: 1,
  class: "empty-msg"
}, C6 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, S6 = { class: "mis-summary-card" }, j6 = { class: "mis-summary-val" }, M6 = { class: "mis-summary-card" }, D6 = { class: "mis-summary-val" }, T6 = { class: "mis-summary-card" }, R6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, O6 = { class: "ta-r mono-sm" }, P6 = { class: "ta-r mono-sm" }, I6 = { class: "ta-r mono-sm" }, V6 = {
  key: 1,
  class: "empty-msg"
}, N6 = {
  key: 2,
  class: "empty-msg"
}, E6 = {
  key: 24,
  class: "books-card report-card bs-card"
}, B6 = { class: "bs-page-head" }, q6 = { class: "bs-page-head-actions" }, A6 = { class: "bs-asof" }, $6 = { class: "iws-export-wrap" }, L6 = ["disabled"], Q6 = { class: "iws-menu" }, F6 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, H6 = ["onClick"], z6 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, W6 = { class: "mis-summary-grid" }, U6 = { class: "mis-summary-card" }, K6 = { class: "mis-summary-val" }, G6 = { class: "mis-summary-card" }, Y6 = { class: "mis-summary-val" }, J6 = { class: "mis-summary-card" }, X6 = { class: "mis-summary-val" }, Z6 = { class: "mis-summary-card" }, t3 = { class: "mis-summary-card" }, s3 = { class: "mis-summary-card" }, e3 = { class: "mis-summary-val" }, a3 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, o3 = { class: "ta-r mono-sm" }, l3 = { class: "ta-r mono-sm" }, n3 = { class: "ta-r mono-sm" }, i3 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, d3 = { class: "ta-r mono-sm" }, r3 = { class: "ta-r mono-sm" }, u3 = { class: "ta-r mono-sm" }, c3 = { class: "ta-r mono-sm" }, m3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, v3 = { class: "ta-r mono-sm" }, _3 = { class: "ta-r mono-sm" }, p3 = { class: "ta-r mono-sm" }, y3 = { key: 0 }, b3 = { class: "ta-r mono-sm" }, h3 = { class: "ta-r mono-sm" }, g3 = {
  key: 1,
  class: "empty-msg"
}, f3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, k3 = { class: "ta-r mono-sm" }, w3 = { class: "ta-r mono-sm" }, x3 = { class: "ta-r mono-sm" }, C3 = {
  key: 1,
  class: "empty-msg"
}, S3 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, j3 = { class: "ta-r mono-sm" }, M3 = { class: "ta-r mono-sm" }, D3 = { class: "ta-r mono-sm" }, T3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, R3 = { class: "ta-r mono-sm" }, O3 = { class: "ta-r mono-sm" }, P3 = { class: "ta-r mono-sm" }, I3 = {
  key: 1,
  class: "empty-msg"
}, V3 = {
  key: 2,
  class: "empty-msg"
}, N3 = {
  key: 25,
  class: "books-card report-card bs-card"
}, E3 = { class: "bs-page-head" }, B3 = { class: "bs-page-head-actions" }, q3 = { class: "bs-asof" }, A3 = { class: "iws-export-wrap" }, $3 = ["disabled"], L3 = { class: "iws-menu" }, Q3 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, F3 = ["onClick"], H3 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, z3 = { class: "mis-summary-grid" }, W3 = { class: "mis-summary-card" }, U3 = { class: "mis-summary-val" }, K3 = { class: "mis-summary-card" }, G3 = { class: "mis-summary-val" }, Y3 = { class: "mis-summary-card" }, J3 = { class: "mis-summary-val" }, X3 = { class: "mis-summary-card" }, Z3 = { class: "mis-summary-val" }, t9 = { class: "mis-summary-card" }, s9 = { class: "mis-summary-val" }, e9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a9 = { class: "ta-r mono-sm" }, o9 = { class: "ta-r mono-sm fw-600" }, l9 = {
  key: 1,
  class: "empty-msg"
}, n9 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, i9 = { class: "ta-r mono-sm" }, d9 = { class: "ta-r mono-sm fw-600" }, r9 = { class: "ta-r mono-sm" }, u9 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, c9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, m9 = { class: "ta-r mono-sm" }, v9 = { class: "ta-r mono-sm" }, _9 = {
  key: 1,
  class: "empty-msg"
}, p9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, y9 = { class: "mis-summary-card" }, b9 = { class: "mis-summary-val" }, h9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, g9 = { class: "ta-r mono-sm" }, f9 = { class: "ta-r mono-sm fw-600" }, k9 = {
  key: 1,
  class: "empty-msg"
}, w9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, x9 = { class: "mis-summary-card" }, C9 = { class: "mis-summary-val" }, S9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, j9 = { class: "ta-r mono-sm" }, M9 = { class: "ta-r mono-sm fw-600" }, D9 = {
  key: 1,
  class: "empty-msg"
}, T9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, R9 = { class: "ta-r mono-sm" }, O9 = { class: "ta-r mono-sm fw-600" }, P9 = {
  key: 1,
  class: "empty-msg"
}, I9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, V9 = { class: "ta-r mono-sm fw-600 red" }, N9 = { class: "ta-r mono-sm" }, E9 = { style: { "font-size": "11px", color: "#94a3b8" } }, B9 = {
  key: 1,
  class: "empty-msg"
}, q9 = {
  key: 2,
  class: "empty-msg"
}, A9 = {
  key: 26,
  class: "books-card report-card bs-card"
}, $9 = { class: "bs-page-head" }, L9 = { class: "bs-page-head-actions" }, Q9 = { class: "bs-asof" }, F9 = { class: "iws-export-wrap" }, H9 = ["disabled"], z9 = { class: "iws-menu" }, W9 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, U9 = ["onClick"], K9 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, G9 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Y9 = { class: "mis-summary-grid" }, J9 = { class: "mis-summary-card" }, X9 = { class: "mis-summary-val" }, Z9 = { class: "mis-summary-card" }, tx = { class: "mis-summary-val red" }, sx = { class: "mis-summary-card" }, ex = { class: "mis-summary-val green" }, ax = { class: "mis-summary-card" }, ox = { class: "mis-summary-val" }, lx = { class: "mis-summary-card" }, nx = { class: "mis-summary-val" }, ix = { class: "mis-summary-card" }, dx = { class: "mis-summary-val" }, rx = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ux = { class: "ta-r mono-sm" }, cx = { class: "ta-r mono-sm" }, mx = { class: "ta-r mono-sm" }, vx = { class: "ta-r mono-sm" }, _x = { class: "ta-r mono-sm red" }, px = { class: "ta-r mono-sm fw-600" }, yx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bx = { class: "ta-r mono-sm red" }, hx = { class: "ta-r mono-sm fw-600" }, gx = {
  key: 1,
  class: "empty-msg"
}, fx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, kx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wx = { class: "ta-r mono-sm fw-600" }, xx = {
  key: 1,
  class: "empty-msg"
}, Cx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Sx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jx = { class: "ta-r mono-sm fw-600" }, Mx = {
  key: 1,
  class: "empty-msg"
}, Dx = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Tx = { class: "ta-r mono-sm" }, Rx = { class: "ta-r mono-sm fw-600" }, Ox = { class: "ta-r mono-sm" }, Px = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Ix = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, Vx = { class: "ta-r mono-sm" }, Nx = {
  key: 2,
  class: "empty-msg"
}, Ex = {
  key: 27,
  class: "books-card report-card bs-card"
}, Bx = { class: "bs-page-head" }, qx = { class: "bs-page-head-actions" }, Ax = { class: "bs-asof" }, $x = { class: "iws-export-wrap" }, Lx = ["disabled"], Qx = { class: "iws-menu" }, Fx = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Hx = ["onClick"], zx = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Wx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Ux = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Kx = { class: "mis-summary-card" }, Gx = { class: "mis-summary-val" }, Yx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Jx = { class: "ta-r mono-sm" }, Xx = { class: "ta-r mono-sm fw-600" }, Zx = {
  key: 1,
  class: "empty-msg"
}, t5 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, s5 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, e5 = { class: "mis-summary-card" }, a5 = { class: "mis-summary-val" }, o5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, l5 = { class: "ta-r mono-sm" }, n5 = { class: "ta-r mono-sm fw-600" }, i5 = {
  key: 1,
  class: "empty-msg"
}, d5 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, r5 = { class: "mis-summary-card" }, u5 = { class: "mis-summary-val" }, c5 = { class: "mis-summary-card" }, m5 = { class: "mis-summary-val green" }, v5 = { class: "mis-summary-card" }, _5 = { class: "mis-summary-val red" }, p5 = { class: "mis-summary-card" }, y5 = { class: "mis-summary-val" }, b5 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, h5 = { class: "ta-r mono-sm green" }, g5 = { class: "ta-r mono-sm red" }, f5 = { class: "ta-r mono-sm fw-600" }, k5 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, w5 = { class: "mis-summary-card" }, x5 = { class: "mis-summary-val" }, C5 = { class: "mis-summary-card" }, S5 = { class: "mis-summary-val green" }, j5 = { class: "mis-summary-card" }, M5 = { class: "mis-summary-val red" }, D5 = { class: "mis-summary-card" }, T5 = { class: "mis-summary-val" }, R5 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, O5 = { class: "ta-r mono-sm green" }, P5 = { class: "ta-r mono-sm red" }, I5 = { class: "ta-r mono-sm fw-600" }, V5 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, N5 = { class: "mis-summary-card" }, E5 = { class: "mis-summary-val green" }, B5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, q5 = { class: "ta-r mono-sm fw-600 green" }, A5 = {
  key: 1,
  class: "empty-msg"
}, $5 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, L5 = { class: "mis-summary-card" }, Q5 = { class: "mis-summary-val red" }, F5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, H5 = { class: "ta-r mono-sm fw-600 red" }, z5 = {
  key: 1,
  class: "empty-msg"
}, W5 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, U5 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, K5 = { class: "ta-r mono-sm green" }, G5 = { class: "ta-r mono-sm red" }, Y5 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, J5 = { class: "mis-summary-card" }, X5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Z5 = { class: "red" }, tC = { class: "ta-r mono-sm fw-600 red" }, sC = {
  key: 1,
  class: "empty-msg"
}, eC = {
  key: 2,
  class: "empty-msg"
}, aC = {
  key: 28,
  class: "books-card report-card bs-card"
}, oC = { class: "bs-page-head" }, lC = { class: "bs-page-head-actions" }, nC = { class: "bs-asof" }, iC = { class: "iws-export-wrap" }, dC = ["disabled"], rC = { class: "iws-menu" }, uC = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, cC = ["onClick"], mC = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, vC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, _C = { class: "mis-summary-card" }, pC = { class: "mis-summary-val" }, yC = { class: "mis-summary-card" }, bC = { class: "mis-summary-val" }, hC = { class: "mis-summary-card" }, gC = { class: "mis-summary-val green" }, fC = { class: "mis-summary-card" }, kC = { class: "mis-summary-val" }, wC = { class: "mis-summary-card" }, xC = { class: "mis-summary-val" }, CC = { class: "mis-summary-card" }, SC = { class: "mis-summary-val green" }, jC = { class: "mis-summary-card" }, MC = { class: "mis-summary-val red" }, DC = { class: "mis-summary-card" }, TC = { class: "mis-summary-val" }, RC = { class: "mis-summary-card" }, OC = { class: "mis-summary-val red" }, PC = { class: "mis-summary-card" }, IC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, VC = { class: "mis-summary-card" }, NC = { class: "mis-summary-val" }, EC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, BC = { class: "ta-r mono-sm" }, qC = { class: "ta-r mono-sm fw-600" }, AC = {
  key: 1,
  class: "empty-msg"
}, $C = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, LC = { class: "mis-summary-card" }, QC = { class: "mis-summary-val" }, FC = { class: "mis-summary-card" }, HC = { class: "mis-summary-val green" }, zC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, WC = { class: "ta-r mono-sm" }, UC = { class: "ta-r mono-sm fw-600" }, KC = {
  key: 1,
  class: "empty-msg"
}, GC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, YC = { class: "mis-summary-card" }, JC = { class: "mis-summary-val" }, XC = { class: "mis-summary-card" }, ZC = { class: "mis-summary-val green" }, tS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, sS = { class: "ta-r mono-sm" }, eS = { class: "ta-r mono-sm fw-600" }, aS = {
  key: 1,
  class: "empty-msg"
}, oS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, lS = { class: "ta-r mono-sm" }, nS = { class: "ta-r mono-sm" }, iS = { class: "ta-r mono-sm" }, dS = { class: "ta-r mono-sm" }, rS = { class: "ta-r mono-sm fw-600" }, uS = { class: "ta-r mono-sm red" }, cS = { class: "ta-r mono-sm" }, mS = {
  key: 1,
  class: "empty-msg"
}, vS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, _S = { class: "mis-summary-card" }, pS = { class: "mis-summary-val red" }, yS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bS = { class: "ta-r mono-sm" }, hS = { class: "ta-r mono-sm fw-600 red" }, gS = {
  key: 1,
  class: "empty-msg"
}, fS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, kS = { class: "mis-summary-card" }, wS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xS = { class: "ta-r mono-sm" }, CS = { class: "ta-r mono-sm" }, SS = { class: "ta-r mono-sm" }, jS = { class: "ta-r mono-sm" }, MS = {
  key: 1,
  class: "empty-msg"
}, DS = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, TS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, RS = { class: "mis-summary-card" }, OS = { class: "mis-summary-val" }, PS = { class: "mis-summary-card" }, IS = { class: "mis-summary-val green" }, VS = { class: "mis-summary-card" }, NS = { class: "mis-summary-val red" }, ES = { class: "mis-summary-card" }, BS = { class: "mis-summary-val" }, qS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, AS = {
  key: 1,
  class: "empty-msg"
}, $S = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, LS = { class: "ta-r mono-sm" }, QS = { class: "ta-r mono-sm fw-600" }, FS = {
  key: 1,
  class: "empty-msg"
}, HS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, zS = { class: "mis-summary-card" }, WS = { class: "mis-summary-val" }, US = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, KS = { class: "ta-r mono-sm red" }, GS = { class: "ta-r mono-sm" }, YS = { class: "ta-r mono-sm" }, JS = {
  key: 1,
  class: "empty-msg"
}, XS = {
  key: 2,
  class: "empty-msg"
}, ZS = {
  key: 29,
  class: "books-card report-card bs-card"
}, tj = { class: "bs-page-head" }, sj = { class: "bs-page-head-actions" }, ej = { class: "bs-asof" }, aj = { class: "iws-export-wrap" }, oj = ["disabled"], lj = { class: "iws-menu" }, nj = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, ij = ["onClick"], dj = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, rj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, uj = { class: "mis-summary-card" }, cj = { class: "mis-summary-val" }, mj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, vj = { class: "ta-r mono-sm" }, _j = { class: "ta-r mono-sm" }, pj = { class: "ta-r mono-sm" }, yj = { class: "ta-r mono-sm" }, bj = { class: "ta-r mono-sm fw-600" }, hj = { class: "ta-r mono-sm red" }, gj = { class: "ta-r mono-sm" }, fj = {
  key: 1,
  class: "empty-msg"
}, kj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, wj = { class: "mis-summary-card" }, xj = { class: "mis-summary-val red" }, Cj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Sj = { class: "ta-r mono-sm" }, jj = { class: "ta-r mono-sm fw-600 red" }, Mj = { class: "ta-r mono-sm red" }, Dj = {
  key: 1,
  class: "empty-msg"
}, Tj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Rj = { class: "ta-r mono-sm" }, Oj = { class: "ta-r mono-sm" }, Pj = { class: "ta-r mono-sm" }, Ij = { class: "ta-r mono-sm" }, Vj = { class: "ta-r mono-sm red" }, Nj = { class: "ta-r mono-sm fw-600" }, Ej = {
  key: 1,
  class: "empty-msg"
}, Bj = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, qj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Aj = { class: "ta-r mono-sm" }, $j = { class: "ta-r mono-sm fw-600" }, Lj = {
  key: 0,
  class: "pill pill-green"
}, Qj = {
  key: 1,
  class: "empty-msg"
}, Fj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Hj = { class: "ta-r mono-sm fw-600" }, zj = { class: "ta-r mono-sm red" }, Wj = { class: "ta-r mono-sm" }, Uj = { class: "ta-r mono-sm" }, Kj = { class: "ta-r mono-sm" }, Gj = {
  key: 1,
  class: "empty-msg"
}, Yj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Jj = { class: "mis-summary-card" }, Xj = { class: "mis-summary-val green" }, Zj = { class: "mis-summary-card" }, tM = { class: "mis-summary-val" }, sM = { class: "mis-summary-card" }, eM = { class: "mis-summary-val red" }, aM = { class: "mis-summary-card" }, oM = { class: "mis-summary-val" }, lM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, nM = { class: "ta-r mono-sm" }, iM = { class: "ta-r mono-sm green" }, dM = { class: "ta-r mono-sm red" }, rM = { class: "ta-r mono-sm fw-600" }, uM = { class: "ta-r mono-sm" }, cM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, mM = {
  key: 2,
  class: "empty-msg"
}, vM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, _M = { class: "mis-summary-card" }, pM = { class: "mis-summary-val" }, yM = { class: "mis-summary-card" }, bM = { class: "mis-summary-val red" }, hM = { class: "mis-summary-card" }, gM = { class: "mis-summary-val red" }, fM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, kM = { class: "ta-r mono-sm" }, wM = { class: "ta-r mono-sm green" }, xM = { class: "ta-r mono-sm red" }, CM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, SM = { class: "ta-r mono-sm" }, jM = { class: "ta-r mono-sm green" }, MM = { class: "ta-r mono-sm red" }, DM = {
  key: 2,
  class: "empty-msg"
}, TM = {
  key: 2,
  class: "empty-msg"
}, RM = {
  key: 30,
  class: "books-card report-card bs-card"
}, OM = { class: "bs-page-head" }, PM = { class: "bs-page-head-actions" }, IM = { class: "bs-asof" }, VM = { class: "iws-export-wrap" }, NM = ["disabled"], EM = { class: "iws-menu" }, BM = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, qM = ["onClick"], AM = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, $M = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, LM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, QM = { class: "ta-r mono-sm" }, FM = { class: "ta-r mono-sm" }, HM = { class: "ta-r mono-sm" }, zM = {
  key: 1,
  class: "empty-msg"
}, WM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, UM = { class: "mis-summary-card" }, KM = { class: "mis-summary-val" }, GM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, YM = { class: "ta-r mono-sm fw-600" }, JM = { style: { "font-size": "11.5px", color: "#64748b" } }, XM = {
  key: 1,
  class: "empty-msg"
}, ZM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, tD = { class: "mis-summary-card" }, sD = { class: "mis-summary-val green" }, eD = { class: "mis-summary-card" }, aD = { class: "mis-summary-val" }, oD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, lD = { class: "ta-r mono-sm" }, nD = { class: "ta-r mono-sm fw-600 green" }, iD = { class: "ta-r" }, dD = ["onUpdate:modelValue"], rD = {
  key: 1,
  class: "empty-msg"
}, uD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, cD = { class: "mis-summary-card" }, mD = { class: "mis-summary-val green" }, vD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _D = { class: "ta-r mono-sm" }, pD = { class: "ta-r mono-sm fw-600 green" }, yD = {
  key: 1,
  class: "empty-msg"
}, bD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, hD = { class: "mis-summary-card" }, gD = { class: "mis-summary-val" }, fD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, kD = { class: "ta-r mono-sm" }, wD = { class: "ta-r mono-sm" }, xD = { class: "ta-r mono-sm fw-600" }, CD = { class: "ta-r mono-sm" }, SD = { class: "ta-r mono-sm" }, jD = {
  key: 1,
  class: "empty-msg"
}, MD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, DD = { class: "ta-r mono-sm" }, TD = { class: "ta-r mono-sm fw-600 red" }, RD = {
  key: 1,
  class: "empty-msg"
}, OD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, PD = { class: "mis-summary-card" }, ID = { class: "mis-summary-val red" }, VD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, ND = { class: "ta-r mono-sm" }, ED = { class: "ta-r mono-sm fw-600" }, BD = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qD = { class: "ta-r mono-sm" }, AD = { class: "ta-r mono-sm" }, $D = { class: "ta-r mono-sm fw-600" }, LD = {
  key: 2,
  class: "empty-msg"
}, QD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, FD = { class: "ta-r mono-sm" }, HD = { class: "ta-r mono-sm" }, zD = { class: "ta-r mono-sm" }, WD = { class: "ta-r mono-sm" }, UD = { class: "ta-r mono-sm" }, KD = {
  key: 1,
  class: "empty-msg"
}, GD = {
  key: 2,
  class: "empty-msg"
}, YD = {
  __name: "Reports",
  setup(F) {
    const S = Pn, d = (i) => i != null ? "KES " + Number(i).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—", p = (i) => Number(i || 0).toLocaleString("en-US", { maximumFractionDigits: 0 }), H = (i) => Number(i || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function G(i) {
      const s = String(i || "").length;
      let n = 24;
      return s > 18 ? n = 15 : s > 15 ? n = 17 : s > 12 ? n = 19 : s > 10 && (n = 21), { fontSize: n + "px" };
    }
    const lt = /* @__PURE__ */ new Date(), x = v(new Date(lt.getFullYear(), lt.getMonth(), 1).toISOString().slice(0, 10)), y = v(lt.toISOString().slice(0, 10)), f = v("mrn_lpo"), St = {
      mrn_lpo: "mrn_vs_lpo",
      lpo_grn: "lpo_vs_grn",
      proj_summary: "project_summary",
      supp_analysis: "supplier_analysis",
      asset_reg: "asset_register",
      // Sava Phase 2: labour contract reports (psd_books.api.labour_reports)
      lab_contract: "contract_status",
      lab_wages: "employee_wages",
      lab_weekly: "weekly_payments"
    }, de = ["lab_contract", "lab_wages", "lab_weekly"], re = ["asset_reg", "lab_wages", "lab_weekly"], zt = v(""), Ee = v([]), Wt = v([]), qt = v({}), nl = V(() => !!qt.value[f.value]), ue = v(!1);
    let Ra = 0;
    const Zs = v("");
    async function ce() {
      const i = f.value, s = St[i];
      if (s) {
        Ra++, ue.value = !0, Zs.value = "";
        try {
          const n = re.includes(i) ? { from_date: x.value, to_date: y.value } : zt.value ? { project: zt.value } : {}, r = await K("psd_books.api." + (de.includes(i) ? "labour_reports." : "procurement_reports.") + s, n), _ = Array.isArray(r) ? r : (r == null ? void 0 : r.message) || [];
          if (qt.value = { ...qt.value, [i]: { rows: _, project: zt.value } }, f.value === i && (Wt.value = _), !Ee.value.length) {
            const j = await K("psd_books.api.procurement_reports.project_summary", {});
            Ee.value = (Array.isArray(j) ? j : (j == null ? void 0 : j.message) || []).map((M) => M.project);
          }
        } catch (n) {
          qt.value = { ...qt.value, [i]: { rows: [], project: zt.value } }, f.value === i && (Zs.value = n.message || "Failed to load report", Wt.value = []);
        } finally {
          ue.value = --Ra > 0;
        }
      }
    }
    const il = {
      asset_reg: ["item_code", "adjustment_qty", "closing_qty", "issued_qty"],
      supp_analysis: ["supplier", "billed_value"],
      proj_summary: ["project", "billed_value"],
      lpo_grn: ["supplier", "project", "billed_qty"],
      mrn_lpo: ["project"],
      lab_contract: ["project"]
    }, Oa = { project_name: "Project", billed_pct: "Billed %", employee_id: "Employee ID", id_no: "ID No.", sha: "SHA", ot_amount: "OT Amount", rate: "Rate/Day" }, dl = [
      "mrn",
      "lpo",
      "supplier_name",
      "project",
      "project_name",
      "item_code",
      "item_name",
      "contract",
      "task",
      "contractor_name",
      "employee",
      "employee_id",
      "id_no",
      "week"
    ], Pa = {
      mrn_lpo: "Search MRN, project, item code, item name",
      lpo_grn: "Search LPO, supplier, project, item",
      proj_summary: "Search project",
      asset_reg: "Search item code, item name",
      lab_contract: "Search contract, project, task, contractor",
      lab_wages: "Search employee",
      lab_weekly: "Search week"
    }, ns = v(""), Ia = V(() => !!Pa[f.value]), rl = V(() => Pa[f.value] || "Search"), is = V(() => {
      const i = ns.value.trim().toLowerCase();
      if (!i || !Ia.value) return Wt.value;
      const s = i.split(/\s+/);
      return Wt.value.filter((n) => {
        const r = dl.map((_) => n[_] == null ? "" : String(n[_])).join(" ").toLowerCase();
        return s.every((_) => r.includes(_));
      });
    }), me = V(() => {
      const i = Wt.value[0];
      if (!i) return [];
      const s = il[f.value] || [];
      return Object.keys(i).filter((n) => !s.includes(n));
    }), Va = {
      mrn_lpo: ["MRN vs LPO", "How much of each material requisition has been ordered on LPOs"],
      lpo_grn: ["LPO vs GRN", "How much of each LPO has been received on goods receipts"],
      proj_summary: ["Project Summary", "Requisitions, LPOs, value received and billed for each project"],
      supp_analysis: ["Supplier Analysis", "LPOs, value and receipts for each supplier"],
      asset_reg: ["Asset Register", "Opening stock, purchases and total quantity of asset items"],
      lab_contract: ["Contract Status", "Value, billed %, paid and balance of each labour contract"],
      lab_wages: ["Employee Wages", "Days, overtime, SHA and net wages of each employee from submitted wages sheets"],
      lab_weekly: ["Weekly Payments Summary", "Paid to contractors and to employees in each week"]
    }, ul = V(() => (Va[f.value] || [""])[0]), cl = V(() => (Va[f.value] || ["", ""])[1]), ml = { mrn: "MRN", lpo: "LPO", grn: "GRN", uom: "UOM" };
    function ve(i) {
      return Oa[i] ? Oa[i] : i.split("_").map((s) => ml[s] || s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    }
    function Na(i) {
      const s = Wt.value[0];
      return !!s && typeof s[i] == "number";
    }
    function vl(i, s) {
      if (typeof i != "number") return i ?? "";
      const n = /_value$|_amount$|_wages$|^(sha|rate|paid_to_contractors|paid_to_employees|total_for_week)$/.test(s);
      return i.toLocaleString("en-US", n ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 });
    }
    const w = v("");
    function et(i) {
      w.value = w.value === i ? "" : i;
    }
    let Be = !1;
    function Y(i) {
      Be = !0;
      try {
        i();
      } finally {
        Be = !1;
      }
    }
    function Ut(i, s) {
      if (Be) {
        const j = Fn(i);
        ll(s.replace(/\.csv$/i, "") + ".xlsx", j[0] || [], j.slice(1));
        return;
      }
      const n = new Blob([i], { type: "text/csv;charset=utf-8" }), r = URL.createObjectURL(n), _ = document.createElement("a");
      _.href = r, _.download = s, _.click(), URL.revokeObjectURL(r);
    }
    const qs = v(!1);
    function _l() {
      if (!is.value.length) return;
      const i = me.value, s = i.map((r) => ve(r)), n = is.value.map((r) => i.map((_) => r[_]));
      ll(St[f.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".xlsx", s, n);
    }
    function pl() {
      if (!is.value.length) return;
      const i = me.value, s = (M) => {
        const N = M == null ? "" : String(M);
        return /[",\n]/.test(N) ? '"' + N.replace(/"/g, '""') + '"' : N;
      }, n = [i.map((M) => s(ve(M))).join(",")];
      for (const M of is.value) n.push(i.map((N) => s(M[N])).join(","));
      const r = new Blob([n.join(`
`)], { type: "text/csv;charset=utf-8" }), _ = URL.createObjectURL(r), j = document.createElement("a");
      j.href = _, j.download = St[f.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", j.click(), URL.revokeObjectURL(_);
    }
    Ta(f, (i) => {
      const s = qt.value[i];
      Zs.value = "", ns.value = "", Wt.value = s ? s.rows : [], s ? zt.value = s.project : ce();
    }, { immediate: !0 }), Ta([x, y], () => {
      const i = f.value;
      if (!re.includes(i) || x.value && y.value && x.value > y.value) return;
      const s = { ...qt.value };
      for (const n of re) n !== i && delete s[n];
      qt.value = s, qt.value[i] && ce();
    }), Ta(zt, () => {
      const i = qt.value[f.value];
      St[f.value] && i && i.project !== zt.value && ce();
    });
    const { data: at, loading: yl, execute: bl } = ie("psd_books.db.queries.get_profit_and_loss"), { data: pt, loading: hl, execute: gl } = ie("psd_books.db.queries.get_balance_sheet_totals"), { data: J, loading: fl, execute: kl } = ie("psd_books.db.queries.get_cash_flow"), { data: ds, loading: wl, execute: xl } = ie("psd_books.db.queries.get_gst_summary"), { data: Yt, loading: Cl, execute: Sl } = ie("psd_books.db.queries.get_trial_balance"), rs = v(!1), As = v(null), Jt = v({ key: "", dir: "asc" });
    function _e(i, s) {
      return (i || []).reduce((n, r) => n + Number(r[s] || 0), 0);
    }
    const mt = V(() => ({
      opening: _e(Yt.value, "opening"),
      debit: _e(Yt.value, "debit"),
      credit: _e(Yt.value, "credit"),
      closing: _e(Yt.value, "closing")
    })), pe = V(() => Math.abs(mt.value.debit - mt.value.credit) < 0.01), qe = V(() => {
      const i = [...Yt.value || []], s = Jt.value.key;
      if (!s) return i;
      const n = Jt.value.dir === "desc" ? -1 : 1, r = (_) => s === "account" || s === "account_type" ? String(_[s] || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function $s(i) {
      Jt.value.key === i ? Jt.value = { key: i, dir: Jt.value.dir === "asc" ? "desc" : "asc" } : Jt.value = { key: i, dir: "asc" };
    }
    function Ls(i) {
      return Jt.value.key !== i ? "" : Jt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const ye = ["Account", "Type", "Opening", "Debit", "Credit", "Closing"];
    function be(i) {
      return [i.account, i.account_type, i.opening || 0, i.debit || 0, i.credit || 0, i.closing || 0];
    }
    function jl() {
      var r;
      const i = qe.value.map((_) => be(_).join("	")), s = mt.value;
      i.push(["Total", "", s.opening, s.debit, s.credit, s.closing].join("	"));
      const n = [ye.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function Ml(i) {
      var n;
      const s = [ye.join("	"), be(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function Dl(i) {
      const s = [ye.join(","), be(i).join(",")].join(`
`), n = String(i.account || "account").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(s, "trial_balance_" + n + "_" + y.value + ".csv");
    }
    function Ea() {
      var r;
      if (!((r = Yt.value) != null && r.length)) return;
      const i = qe.value.map((_) => be(_).join(",")), s = mt.value;
      i.push(["Total", "", s.opening, s.debit, s.credit, s.closing].join(","));
      const n = [ye.join(","), ...i].join(`
`);
      gt(n, "trial_balance_" + y.value + ".csv");
    }
    const rt = v([]), ut = v([]), us = v(!1), Qs = v(null), Xt = v({ key: "", dir: "asc" });
    function kt(i, s) {
      return i.reduce((n, r) => n + Number(r[s] || 0), 0);
    }
    const jt = V(() => ({
      current: kt(rt.value, "current"),
      days_1_30: kt(rt.value, "days_1_30"),
      days_31_60: kt(rt.value, "days_31_60"),
      days_61_90: kt(rt.value, "days_61_90"),
      days_90_plus: kt(rt.value, "days_90_plus"),
      total: kt(rt.value, "total")
    })), Ba = V(() => {
      const i = [...rt.value || []], s = Xt.value.key;
      if (!s) return i;
      const n = Xt.value.dir === "desc" ? -1 : 1, r = (_) => s === "customer" ? String(_.customer_name || _.customer || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function cs(i) {
      Xt.value.key === i ? Xt.value = { key: i, dir: Xt.value.dir === "asc" ? "desc" : "asc" } : Xt.value = { key: i, dir: "asc" };
    }
    function ms(i) {
      return Xt.value.key !== i ? "" : Xt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function he(i, s) {
      return [s ? i.customer_name || i.customer : i.supplier_name || i.supplier, i.current, i.days_1_30, i.days_31_60, i.days_61_90, i.days_90_plus, i.total];
    }
    function ge(i) {
      return [i ? "Customer" : "Vendor", "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"];
    }
    function Tl() {
      var _;
      const i = ge(!0), s = Ba.value.map((j) => he(j, !0).join("	")), n = jt.value;
      s.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...s].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    function qa(i, s) {
      var _;
      const r = [ge(s).join("	"), he(i, s).join("	")].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    function Aa(i, s) {
      const r = [ge(s).join(","), he(i, s).join(",")].join(`
`), _ = String((s ? i.customer : i.supplier) || "party").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(r, (s ? "ar_aging_" : "ap_aging_") + _ + "_" + y.value + ".csv");
    }
    const vs = v(!1), Fs = v(null), Zt = v({ key: "", dir: "asc" }), Mt = V(() => ({
      current: kt(ut.value, "current"),
      days_1_30: kt(ut.value, "days_1_30"),
      days_31_60: kt(ut.value, "days_31_60"),
      days_61_90: kt(ut.value, "days_61_90"),
      days_90_plus: kt(ut.value, "days_90_plus"),
      total: kt(ut.value, "total")
    })), $a = V(() => {
      const i = [...ut.value || []], s = Zt.value.key;
      if (!s) return i;
      const n = Zt.value.dir === "desc" ? -1 : 1, r = (_) => s === "supplier" ? String(_.supplier_name || _.supplier || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function _s(i) {
      Zt.value.key === i ? Zt.value = { key: i, dir: Zt.value.dir === "asc" ? "desc" : "asc" } : Zt.value = { key: i, dir: "asc" };
    }
    function ps(i) {
      return Zt.value.key !== i ? "" : Zt.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    function Rl() {
      var _;
      const i = ge(!1), s = $a.value.map((j) => he(j, !1).join("	")), n = Mt.value;
      s.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...s].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    const Dt = v([]), te = v([]), Ol = V(() => Math.max(
      ...te.value.flatMap((i) => [Math.abs(i.operating || 0), Math.abs(i.investing || 0), Math.abs(i.financing || 0)]),
      1
    ));
    function Ae(i) {
      const n = Math.round(Math.abs(Number(i) || 0) / Ol.value * 60);
      return (Number(i) || 0) >= 0 ? { height: n + "px", bottom: "50%", top: "auto" } : { height: n + "px", top: "50%", bottom: "auto" };
    }
    function Pl(i, s) {
      if (!i || !s) return [];
      const n = new Date(i), r = new Date(s);
      if (isNaN(n) || isNaN(r) || n > r) return [];
      const _ = [];
      let j = new Date(n.getFullYear(), n.getMonth(), 1);
      for (; j <= r; ) {
        const M = new Date(j.getFullYear(), j.getMonth(), 1), N = new Date(j.getFullYear(), j.getMonth() + 1, 0), Nt = M < n ? n : M, Es = N > r ? r : N;
        _.push({
          from: Nt.toISOString().slice(0, 10),
          to: Es.toISOString().slice(0, 10),
          month: j.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }), j = new Date(j.getFullYear(), j.getMonth() + 1, 1);
      }
      return _;
    }
    function La() {
      if (!J.value) return;
      const i = ["Line", "Amount"].join(","), s = [
        ["Operating Activities", J.value.operating].join(","),
        ["Investing Activities", J.value.investing].join(","),
        ["Financing Activities", J.value.financing].join(","),
        ["Net Change in Cash", J.value.net_change].join(","),
        ["Opening Cash & Bank", J.value.opening_cash].join(","),
        ["Closing Cash & Bank", J.value.closing_cash].join(",")
      ], n = [i, ...s].join(`
`);
      Ut(n, "cash_flow_" + y.value + ".csv");
    }
    const Il = { CGST: "Central Goods and Services Tax", SGST: "State Goods and Services Tax", IGST: "Integrated Goods and Services Tax", UTGST: "Union Territory Goods and Services Tax" }, Qa = ["gst-c-blue", "gst-c-emerald", "gst-c-cyan", "gst-c-amber", "gst-c-violet"], Vl = V(() => (ds.value || []).map((i, s) => ({
      ...i,
      desc: Il[i.tax_type] || "Goods and Services Tax",
      cls: Qa[s % Qa.length]
    }))), Fa = V(() => (ds.value || []).reduce((i, s) => i + (Number(s.invoice_count) || 0), 0)), Ha = V(() => (ds.value || []).reduce((i, s) => i + (Number(s.total_tax) || 0), 0));
    function za() {
      var r;
      if (!((r = ds.value) != null && r.length)) return;
      const i = ["Tax Type", "Invoice Count", "Total Tax"].join(","), s = ds.value.map((_) => [_.tax_type, _.invoice_count, _.total_tax].join(","));
      s.push(["Total", Fa.value, Ha.value].join(","));
      const n = [i, ...s].join(`
`);
      Ut(n, "gst_summary_" + y.value + ".csv");
    }
    const $e = v(!1), Le = v(!1), Wa = v(!1), Ua = v(!1), At = v([]), Qe = v(!1), Ka = v(!1), $t = v([]), Fe = v(!1), Ga = v(!1), ct = v([]), He = v(!1), Ya = v(!1), dt = v([]), ze = v(!1), Ja = v(!1), Tt = v(/* @__PURE__ */ new Set()), We = v(!1), Ue = v(!1), nt = v(null);
    async function Xa(i) {
      We.value = !0, Ue.value = !0, nt.value = null;
      try {
        nt.value = await K("psd_books.db.queries.get_invoice_profit_detail", { invoice: i });
      } catch {
        nt.value = null;
      }
      Ue.value = !1;
    }
    const tt = v(null), Ke = v(!1), Za = v(!1), ys = v(!1), se = v(null), Hs = v(null), zs = v({ key: "", dir: "asc" }), bs = v({ key: "", dir: "asc" });
    function Nl(i, s, n) {
      const r = s.key;
      if (!r) return i;
      const _ = s.dir === "desc" ? -1 : 1, j = (M) => n.includes(r) ? String(M[r] || "").toLowerCase() : Number(M[r] || 0);
      return [...i].sort((M, N) => {
        const Nt = j(M), Es = j(N);
        return typeof Nt == "string" ? _ * Nt.localeCompare(Es) : _ * (Nt - Es);
      });
    }
    const to = V(() => {
      var i;
      return Nl(((i = tt.value) == null ? void 0 : i.accounts) || [], zs.value, ["account"]);
    });
    function fe(i) {
      zs.value = zs.value.key === i ? { key: i, dir: zs.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function ke(i) {
      return zs.value.key !== i ? "" : zs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ge = V(() => {
      var _;
      const i = [...((_ = tt.value) == null ? void 0 : _.items) || []], s = bs.value.key;
      if (!s) return i;
      const n = bs.value.dir === "desc" ? -1 : 1, r = (j) => s === "item" ? String(j.item_name || j.item_code || "").toLowerCase() : s === "warehouse" ? String(j.warehouse || "").toLowerCase() : Number(j[s] || 0);
      return i.sort((j, M) => {
        const N = r(j), Nt = r(M);
        return typeof N == "string" ? n * N.localeCompare(Nt) : n * (N - Nt);
      }), i;
    });
    function ee(i) {
      bs.value = bs.value.key === i ? { key: i, dir: bs.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function ae(i) {
      return bs.value.key !== i ? "" : bs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ye = V(() => {
      var i;
      return (((i = tt.value) == null ? void 0 : i.items) || []).reduce((s, n) => s + Number(n.stock_value || 0), 0);
    }), so = ["Inventory Account", "Bin Stock Value", "GL Balance", "Difference", "Status"];
    function eo(i) {
      return [i.account, i.bin_stock_value, i.gl_balance, i.difference, i.is_reconciled ? "OK" : "DRIFT"];
    }
    function El(i) {
      var n;
      const s = [so.join("	"), eo(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function Bl() {
      var n, r;
      if (!((r = (n = tt.value) == null ? void 0 : n.accounts) != null && r.length)) return;
      const i = to.value.map((_) => eo(_).join(",")), s = [so.join(","), ...i].join(`
`);
      gt(s, "stock_vs_gl_accounts_" + y.value + ".csv");
    }
    const we = ["Item", "Warehouse", "Qty", "Valuation Rate", "Stock Value"];
    function xe(i) {
      return [i.item_name || i.item_code, i.warehouse, i.actual_qty, i.valuation_rate, i.stock_value];
    }
    function ql(i) {
      var n;
      const s = [we.join("	"), xe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function Al() {
      var n;
      const i = Ge.value.map((r) => xe(r).join("	"));
      i.push(["Total", "", "", "", Ye.value].join("	"));
      const s = [we.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function $l(i) {
      const s = [we.join(","), xe(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_") + "_" + String(i.warehouse || "").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(s, "stock_vs_gl_item_" + n + ".csv");
    }
    function Ll() {
      var n, r;
      if (!((r = (n = tt.value) == null ? void 0 : n.items) != null && r.length)) return;
      const i = Ge.value.map((_) => xe(_).join(","));
      i.push(["Total", "", "", "", Ye.value].join(","));
      const s = [we.join(","), ...i].join(`
`);
      gt(s, "stock_vs_gl_items_" + y.value + ".csv");
    }
    const wt = v(null), Je = v(!1), ao = v(!1), oe = v(null), Xe = v(!1), oo = v(!1), Ze = v(""), Ce = v(""), Se = V(() => {
      var s;
      const i = Ze.value.trim().toLowerCase();
      return (((s = oe.value) == null ? void 0 : s.rows) || []).filter(
        (n) => (!Ce.value || n.warehouse === Ce.value) && (!i || (n.item_code || "").toLowerCase().includes(i) || (n.item_name || "").toLowerCase().includes(i))
      );
    }), X = v(null), ta = v(!1), lo = v(!1), O = v(null), sa = v(!1), no = v(!1), yt = v("summary"), hs = v(0), Ql = [
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
    ], io = V(
      () => {
        var i, s;
        return hs.value ? (((s = (i = O.value) == null ? void 0 : i.summary) == null ? void 0 : s.grand_total) || 0) / hs.value * 100 : 0;
      }
    ), I = v(null), ea = v(!1), ro = v(!1), Rt = v("total"), gs = v(0), Fl = [
      { key: "total", label: "Total Receivables" },
      { key: "outstanding", label: "Customer Outstanding" },
      { key: "ageing", label: "Ageing" },
      { key: "coll_target", label: "Collection Target vs Achievement" },
      { key: "daily_coll", label: "Daily Collection" },
      { key: "overdue", label: "Overdue Collection" },
      { key: "credit", label: "Credit Limit & Utilisation" },
      { key: "efficiency", label: "Collection Efficiency" }
    ], uo = V(
      () => {
        var i, s;
        return gs.value ? (((s = (i = I.value) == null ? void 0 : i.daily_collection) == null ? void 0 : s.total) || 0) / gs.value * 100 : 0;
      }
    ), B = v(null), aa = v(!1), co = v(!1), Ot = v("summary"), fs = v(0), Hl = [
      { key: "summary", label: "Purchase Summary" },
      { key: "supplier", label: "Supplier-wise" },
      { key: "product", label: "Product-wise" },
      { key: "target", label: "Target / Budget vs Actual" },
      { key: "price_variance", label: "Price Variance" },
      { key: "pending_po", label: "Pending Purchase Orders" },
      { key: "pending_receipts", label: "Pending Material Receipts" },
      { key: "returns", label: "Purchase Return" }
    ], mo = V(
      () => {
        var i, s;
        return fs.value ? (((s = (i = B.value) == null ? void 0 : i.summary) == null ? void 0 : s.grand_total) || 0) / fs.value * 100 : 0;
      }
    ), R = v(null), oa = v(!1), vo = v(!1), bt = v("current_stock"), zl = [
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
    ], T = v(null), la = v(!1), _o = v(!1), ht = v("plan_vs_actual"), Wl = [
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
    ], A = v(null), na = v(!1), po = v(!1), xt = v("sales"), Ul = [
      { key: "sales", label: "Product-wise Sales" },
      { key: "profit", label: "Product-wise Profit" },
      { key: "cost", label: "Product-wise Cost" },
      { key: "margin", label: "Product-wise Margin %" },
      { key: "production", label: "Product-wise Production" },
      { key: "stock", label: "Product-wise Stock" },
      { key: "wastage", label: "Product-wise Wastage" },
      { key: "top_selling", label: "Top Selling Products" },
      { key: "low_selling", label: "Low Selling Products" }
    ], z = v(null), ia = v(!1), yo = v(!1), Kt = v("summary"), Kl = [
      { key: "summary", label: "Dispatch Summary" },
      { key: "pending_dispatch", label: "Pending Dispatch" },
      { key: "delivery_pending", label: "Delivery Pending" },
      { key: "delayed_delivery", label: "Delayed Delivery" },
      { key: "customer_pending", label: "Customer-wise Pending Delivery" },
      { key: "transport_wise", label: "Transport-wise Dispatch" }
    ], q = v(null), da = v(!1), bo = v(!1), vt = v("summary"), Gl = [
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
    ], W = v(null), ra = v(!1), ho = v(!1), Lt = v("summary"), Yl = [
      { key: "summary", label: "Summary" },
      { key: "product", label: "Product-wise Profit" },
      { key: "customer", label: "Customer-wise Profit" },
      { key: "order", label: "Order-wise Profit" },
      { key: "branch", label: "Branch-wise Profit" },
      { key: "salesperson", label: "Salesperson-wise Profit" },
      { key: "monthly_trend", label: "Monthly Profit Trend" }
    ], U = v(null), ua = v(!1), go = v(!1), Pt = v("summary"), Jl = [
      { key: "summary", label: "Total Expenses" },
      { key: "department", label: "Department-wise" },
      { key: "category", label: "Expense Category-wise" },
      { key: "budget", label: "Budget vs Actual" },
      { key: "fixed", label: "Fixed Expenses" },
      { key: "variable", label: "Variable Expenses" },
      { key: "trend", label: "Expense Trend" },
      { key: "unusual", label: "Unusual / Excess" }
    ], Z = v(null), ca = v(!1), fo = v(!1), Qt = v("summary"), Xl = [
      { key: "summary", label: "Supplier Outstanding" },
      { key: "ageing", label: "Payable Ageing" },
      { key: "overdue", label: "Overdue Payables" },
      { key: "due_week", label: "Due This Week" },
      { key: "due_month", label: "Due This Month" },
      { key: "supplier", label: "Supplier-wise Outstanding" },
      { key: "forecast", label: "Payment Due Forecast" }
    ], E = v(null), ma = v(!1), ko = v(!1), It = v("cash_position"), Zl = [
      { key: "cash_position", label: "Cash Position" },
      { key: "bank_balance", label: "Bank Balance" },
      { key: "daily_cash", label: "Daily Cash Flow" },
      { key: "daily_bank", label: "Daily Bank Movement" },
      { key: "receipts", label: "Receipts" },
      { key: "payments", label: "Payments" },
      { key: "forecast", label: "Cash Forecast" },
      { key: "fund_requirement", label: "Fund Requirement" }
    ], D = v(null), va = v(!1), wo = v(!1), Ct = v("new_customers"), tn = [
      { key: "new_customers", label: "New Customers" },
      { key: "active_customers", label: "Active Customers" },
      { key: "repeat_customers", label: "Repeat Customers" },
      { key: "customer_wise_sales", label: "Customer-wise Sales" },
      { key: "customer_wise_outstanding", label: "Customer-wise Outstanding" },
      { key: "customer_wise_profit", label: "Customer-wise Profit" },
      { key: "customer_retention", label: "Customer Retention" },
      { key: "top_customers", label: "Top Customers" },
      { key: "inactive_customers", label: "Inactive Customers" }
    ], $ = v(null), _a = v(!1), xo = v(!1), Ft = v("supplier_wise_purchase"), sn = [
      { key: "supplier_wise_purchase", label: "Supplier-wise Purchase" },
      { key: "supplier_outstanding", label: "Supplier Outstanding" },
      { key: "supplier_payment_ageing", label: "Supplier Payment Ageing" },
      { key: "purchase_price_comparison", label: "Purchase Price Comparison" },
      { key: "supplier_performance", label: "Supplier Performance" },
      { key: "delivery_performance", label: "Delivery Performance" },
      { key: "quality_rejection", label: "Quality / Rejection" }
    ], L = v(null), pa = v(!1), Co = v(!1), Vt = v("employee_attendance"), en = [
      { key: "employee_attendance", label: "Employee Attendance" },
      { key: "department_manpower", label: "Department-wise Manpower" },
      { key: "salesperson_target", label: "Salesperson Target vs Achievement" },
      { key: "salesperson_collection", label: "Salesperson Collection" },
      { key: "production_productivity", label: "Production Employee Productivity" },
      { key: "overtime", label: "Overtime" },
      { key: "labour_cost", label: "Labour Cost" },
      { key: "employee_performance", label: "Employee Performance" }
    ], Ws = v({});
    function ya(i) {
      const s = Ws.value[i.sales_person];
      return s ? Number(i.total_amount) / s * 100 : 0;
    }
    function So() {
      const i = ["Section", "Line", "Amount"].join(","), s = [];
      jo.value.forEach((r) => {
        s.push([r.label, "", r.total].join(",")), r.items.forEach((_) => s.push([r.label, _.label, _.value].join(",")));
      });
      const n = [i, ...s].join(`
`);
      Ut(n, "balance_sheet_" + y.value + ".csv");
    }
    const ba = V(() => {
      if (!pt.value) return !1;
      const i = Number(pt.value.total_assets) || 0, s = Number(pt.value.total_liabilities) || 0, n = Number(pt.value.total_equity) || 0;
      return Math.abs(i - (s + n)) < 1;
    }), je = v({ assets: !0, liabilities: !0, equity: !0 });
    function an(i) {
      je.value[i] = !je.value[i];
    }
    const jo = V(() => {
      const i = pt.value || {}, s = (n) => Number(n) || 0;
      return [
        {
          key: "assets",
          label: "Assets",
          desc: "What the business owns",
          total: s(i.total_assets),
          cls: "bs-acc-assets",
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
          items: [
            {
              label: "Current Assets",
              desc: "Cash, Bank, Debtors, Stock, etc.",
              value: s(i.cash_and_bank) + s(i.receivables) + s(i.inventory_value),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/><circle cx="7" cy="14.5" r="1"/></svg>'
            },
            {
              label: "Non-Current Assets",
              desc: "Fixed Assets, Investments, etc.",
              value: s(i.other_assets) + s(i.itc_receivable),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-6h6v6"/></svg>'
            }
          ]
        },
        {
          key: "liabilities",
          label: "Liabilities",
          desc: "What the business owes",
          total: s(i.total_liabilities),
          cls: "bs-acc-liabilities",
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
          items: [
            {
              label: "Current Liabilities",
              desc: "Creditors, Short-term Loans, etc.",
              value: s(i.payables) + s(i.gst_liability) + s(i.stock_received_not_billed),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 20c.2-2.3 1.9-4 4-4"/></svg>'
            },
            {
              label: "Non-Current Liabilities",
              desc: "Long-term Loans, Provisions, etc.",
              value: s(i.other_liabilities),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l3 3v17H6z"/><path d="M15 2v3h3"/><path d="M9 12h6M9 16h6"/></svg>'
            }
          ]
        },
        {
          key: "equity",
          label: "Equity",
          desc: "Owner's interest in the business",
          total: s(i.total_equity),
          cls: "bs-acc-equity",
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg>',
          items: [
            {
              label: "Capital",
              desc: "",
              value: s(i.equity_capital),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>'
            },
            {
              label: "Retained Earnings",
              desc: "",
              value: s(i.retained_earnings),
              icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 3"/></svg>'
            }
          ]
        }
      ];
    }), Mo = V(() => Math.max(...Dt.value.flatMap((i) => [i.income || 0, i.expense || 0]), 1));
    function Do(i) {
      return Math.round(Math.max(0, i) / Mo.value * 130);
    }
    const on = V(() => {
      const i = Mo.value;
      return [i, i * 0.66, i * 0.33, 0].map((s) => Math.round(s));
    });
    function P(i) {
      return i ? (/* @__PURE__ */ new Date(i + "T00:00:00")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    }
    const Us = v("monthly");
    function ha(i, s) {
      return s == null || i == null ? null : s === 0 ? i === 0 ? 0 : null : (i - s) / Math.abs(s) * 100;
    }
    const ks = V(() => Dt.value.length > 1 ? Dt.value[Dt.value.length - 2] : null), ws = V(() => Dt.value.length ? Dt.value[Dt.value.length - 1] : null), To = V(() => ws.value && ks.value ? ha(ws.value.income, ks.value.income) : null), Ro = V(() => ws.value && ks.value ? ha(ws.value.expense, ks.value.expense) : null), Oo = V(() => !ws.value || !ks.value ? null : ha((ws.value.income || 0) - (ws.value.expense || 0), (ks.value.income || 0) - (ks.value.expense || 0)));
    function ga(i, s) {
      if (i === null) return "muted";
      if (i === 0) return "neutral";
      const n = i > 0;
      return (s ? !n : n) ? "up" : "down";
    }
    function fa(i) {
      return i === null || i === 0 ? "— No change" : `${i > 0 ? "↑" : "↓"} ${Math.abs(Math.round(i))}% vs previous period`;
    }
    const ln = V(() => {
      if (!at.value) return [];
      const i = [];
      return Number(at.value.total_expense) > Number(at.value.total_income) && i.push({ icon: "↗", tone: "warn", title: "Expenses are higher", desc: "Your expenses are higher than income in this period." }), Number(at.value.net_profit) < 0 ? i.push({ icon: "↘", tone: "loss", title: "Net loss", desc: `You had a net loss of ${S(Math.abs(at.value.net_profit))} in the selected period.` }) : Number(at.value.net_profit) > 0 && i.push({ icon: "↗", tone: "good", title: "Net profit", desc: `You made a net profit of ${S(at.value.net_profit)} in the selected period.` }), i;
    }), xs = V(() => ct.value.filter((i) => i.cost_rate).reduce((i, s) => i + Number(s.profit || 0), 0)), Me = V(() => {
      const i = ct.value.filter((r) => r.cost_rate), s = i.reduce((r, _) => r + Number(_.revenue || 0), 0), n = i.reduce((r, _) => r + Number(_.profit || 0), 0);
      return s !== 0 ? n / s * 100 : 0;
    }), Ks = V(() => ct.value.filter((i) => !i.cost_rate).length), Cs = v(!1), Gs = v(null), ts = v({ key: "", dir: "asc" }), ka = V(() => {
      const i = [...ct.value || []], s = ts.value.key;
      if (!s) return i;
      const n = ts.value.dir === "desc" ? -1 : 1, r = (_) => s === "item" ? String(_.item_name || _.item_code || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function Ss(i) {
      ts.value.key === i ? ts.value = { key: i, dir: ts.value.dir === "asc" ? "desc" : "asc" } : ts.value = { key: i, dir: "asc" };
    }
    function js(i) {
      return ts.value.key !== i ? "" : ts.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const De = ["Item", "Qty Sold", "Revenue", "Cost Rate", "Total Cost", "Profit", "Margin %"];
    function Te(i) {
      return [i.item_name || i.item_code, i.qty_sold, i.revenue, i.cost_rate, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function nn() {
      var n;
      const i = ka.value.map((r) => Te(r).join("	")), s = [De.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function dn(i) {
      var n;
      const s = [De.join("	"), Te(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function rn(i) {
      const s = [De.join(","), Te(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(s, "profit_wise_report_" + n + "_" + x.value + "_to_" + y.value + ".csv");
    }
    const Ms = V(
      () => dt.value.filter((i) => Tt.value.has(i.invoice))
    ), Po = V(
      () => dt.value.length > 0 && Tt.value.size === dt.value.length
    );
    function un(i) {
      const s = new Set(Tt.value);
      s.has(i) ? s.delete(i) : s.add(i), Tt.value = s;
    }
    function cn() {
      Tt.value = Po.value ? /* @__PURE__ */ new Set() : new Set(dt.value.map((i) => i.invoice));
    }
    function Ys(i, s) {
      return i.reduce((n, r) => n + Number(r[s] || 0), 0);
    }
    const it = V(() => ({
      revenue: Ys(dt.value, "revenue"),
      total_cost: Ys(dt.value, "total_cost"),
      profit: Ys(dt.value, "profit")
    })), le = V(() => ({
      count: Ms.value.length,
      revenue: Ys(Ms.value, "revenue"),
      total_cost: Ys(Ms.value, "total_cost"),
      profit: Ys(Ms.value, "profit")
    })), Ds = v(!1), Ts = v(null), ss = v({ key: "", dir: "asc" }), wa = V(() => {
      const i = [...dt.value || []], s = ss.value.key;
      if (!s) return i;
      const n = ss.value.dir === "desc" ? -1 : 1, r = (_) => s === "invoice" || s === "posting_date" ? String(_[s] || "") : s === "customer" ? String(_.customer_name || _.customer || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function Rs(i) {
      ss.value.key === i ? ss.value = { key: i, dir: ss.value.dir === "asc" ? "desc" : "asc" } : ss.value = { key: i, dir: "asc" };
    }
    function Os(i) {
      return ss.value.key !== i ? "" : ss.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Re = ["Invoice", "Date", "Customer", "Revenue", "Est. Cost", "Profit", "Margin %"];
    function Oe(i) {
      return [i.invoice, i.posting_date, i.customer_name || i.customer, i.revenue, i.total_cost, i.profit, Number(i.margin_pct || 0).toFixed(1)];
    }
    function mn() {
      var n;
      const i = (Tt.value.size ? Ms.value : wa.value).map((r) => Oe(r).join("	")), s = [Re.join("	"), ...i].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function vn(i) {
      var n;
      const s = [Re.join("	"), Oe(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function _n(i) {
      const s = [Re.join(","), Oe(i).join(",")].join(`
`);
      gt(s, "invoice_profitability_" + i.invoice + ".csv");
    }
    async function pn() {
      if (St[f.value]) {
        await ce();
        return;
      }
      if (!["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(f.value) && x.value && y.value && x.value > y.value) {
        alert("From date cannot be after To date.");
        return;
      }
      const s = await Rn(), n = { company: s, from_date: x.value || "", to_date: y.value || "" };
      if (f.value === "pl") {
        await bl(n);
        try {
          Dt.value = await K("psd_books.db.queries.get_pl_monthly_breakdown", n) || [];
        } catch {
          Dt.value = [];
        }
      }
      if (f.value === "bs" && await gl({ company: s, as_of_date: y.value }), f.value === "cf") {
        await kl(n);
        try {
          const r = Pl(x.value, y.value), _ = await Promise.all(r.map(
            (j) => K("psd_books.db.queries.get_cash_flow", { company: s, from_date: j.from, to_date: j.to })
          ));
          te.value = r.map((j, M) => ({ month: j.month, ..._[M] || {} }));
        } catch {
          te.value = [];
        }
      }
      if (f.value === "gst" && await xl(n), f.value === "tb" && await Sl(n), f.value === "ar") {
        $e.value = !0, Wa.value = !0;
        try {
          rt.value = await K("psd_books.db.queries.get_ar_aging", { company: s, as_of_date: y.value }) || [];
        } catch {
          rt.value = [];
        }
        $e.value = !1;
      }
      if (f.value === "ap") {
        Le.value = !0, Ua.value = !0;
        try {
          ut.value = await K("psd_books.db.queries.get_ap_aging", { company: s, as_of_date: y.value }) || [];
        } catch {
          ut.value = [];
        }
        Le.value = !1;
      }
      if (f.value === "items") {
        Qe.value = !0, Ka.value = !0;
        try {
          At.value = await K("psd_books.db.queries.get_item_wise_sales", n) || [];
        } catch {
          At.value = [];
        }
        Qe.value = !1;
      }
      if (f.value === "customers") {
        Fe.value = !0, Ga.value = !0;
        try {
          $t.value = await K("psd_books.db.queries.get_customer_wise_sales", n) || [];
        } catch {
          $t.value = [];
        }
        Fe.value = !1;
      }
      if (f.value === "profit") {
        He.value = !0, Ya.value = !0;
        try {
          ct.value = await K("psd_books.db.queries.get_profit_wise_report", n) || [];
        } catch {
          ct.value = [];
        }
        He.value = !1;
      }
      if (f.value === "invoice_profit") {
        ze.value = !0, Ja.value = !0, Tt.value = /* @__PURE__ */ new Set();
        try {
          dt.value = await K("psd_books.db.queries.get_invoice_wise_profit", n) || [];
        } catch {
          dt.value = [];
        }
        ze.value = !1;
      }
      if (f.value === "stockgl") {
        Ke.value = !0, Za.value = !0;
        try {
          tt.value = await K("psd_books.db.queries.get_inventory_reconciliation", { company: s }) || null;
        } catch {
          tt.value = null;
        }
        Ke.value = !1;
      }
      if (f.value === "stockval") {
        Je.value = !0, ao.value = !0;
        try {
          wt.value = await K("psd_books.api.inventory.get_stock_valuation_report", { as_of_date: y.value }) || null;
        } catch {
          wt.value = null;
        }
        Je.value = !1;
      }
      if (f.value === "price_mrp") {
        Xe.value = !0, oo.value = !0;
        try {
          oe.value = await K("psd_books.api.inventory.get_selling_mrp_report", {}) || null;
        } catch {
          oe.value = null;
        }
        Xe.value = !1;
      }
      if (f.value === "mis") {
        ta.value = !0, lo.value = !0;
        try {
          X.value = await K("psd_books.db.queries.get_daily_business_mis", n) || null;
        } catch {
          X.value = null;
        }
        ta.value = !1;
      }
      if (f.value === "sales_mis") {
        sa.value = !0, no.value = !0;
        try {
          O.value = await K("psd_books.db.queries.get_sales_mis", n) || null;
        } catch {
          O.value = null;
        }
        sa.value = !1;
      }
      if (f.value === "receivables") {
        ea.value = !0, ro.value = !0;
        try {
          I.value = await K("psd_books.db.queries.get_receivables_mis", n) || null;
        } catch {
          I.value = null;
        }
        ea.value = !1;
      }
      if (f.value === "purchase_mis") {
        aa.value = !0, co.value = !0;
        try {
          B.value = await K("psd_books.db.queries.get_purchase_mis", n) || null;
        } catch {
          B.value = null;
        }
        aa.value = !1;
      }
      if (f.value === "inventory_mis") {
        oa.value = !0, vo.value = !0;
        try {
          R.value = await K("psd_books.db.queries.get_inventory_mis", n) || null;
        } catch {
          R.value = null;
        }
        oa.value = !1;
      }
      if (f.value === "production_mis") {
        la.value = !0, _o.value = !0;
        try {
          T.value = await K("psd_books.db.queries.get_production_mis", n) || null;
        } catch {
          T.value = null;
        }
        la.value = !1;
      }
      if (f.value === "product_mis") {
        na.value = !0, po.value = !0;
        try {
          A.value = await K("psd_books.db.queries.get_product_mis", n) || null;
        } catch {
          A.value = null;
        }
        na.value = !1;
      }
      if (f.value === "dispatch_mis") {
        ia.value = !0, yo.value = !0;
        try {
          z.value = await K("psd_books.db.queries.get_dispatch_delivery_mis", n) || null;
        } catch {
          z.value = null;
        }
        ia.value = !1;
      }
      if (f.value === "order_mis") {
        da.value = !0, bo.value = !0;
        try {
          q.value = await K("psd_books.db.queries.get_order_mis", n) || null;
        } catch {
          q.value = null;
        }
        da.value = !1;
      }
      if (f.value === "profitability_mis") {
        ra.value = !0, ho.value = !0;
        try {
          W.value = await K("psd_books.db.queries.get_profitability_mis", n) || null;
        } catch {
          W.value = null;
        }
        ra.value = !1;
      }
      if (f.value === "expense_mis") {
        ua.value = !0, go.value = !0;
        try {
          U.value = await K("psd_books.db.queries.get_expense_mis", n) || null;
        } catch {
          U.value = null;
        }
        ua.value = !1;
      }
      if (f.value === "payables_mis") {
        ca.value = !0, fo.value = !0;
        try {
          Z.value = await K("psd_books.db.queries.get_payables_mis", { company: s, as_of_date: y.value }) || null;
        } catch {
          Z.value = null;
        }
        ca.value = !1;
      }
      if (f.value === "cash_bank_mis") {
        ma.value = !0, ko.value = !0;
        try {
          E.value = await K("psd_books.db.queries.get_cash_bank_mis", n) || null;
        } catch {
          E.value = null;
        }
        ma.value = !1;
      }
      if (f.value === "customer_mis") {
        va.value = !0, wo.value = !0;
        try {
          D.value = await K("psd_books.db.queries.get_customer_mis", n) || null;
        } catch {
          D.value = null;
        }
        va.value = !1;
      }
      if (f.value === "supplier_mis") {
        _a.value = !0, xo.value = !0;
        try {
          $.value = await K("psd_books.db.queries.get_supplier_mis", n) || null;
        } catch {
          $.value = null;
        }
        _a.value = !1;
      }
      if (f.value === "employee_mis") {
        pa.value = !0, Co.value = !0;
        try {
          L.value = await K("psd_books.db.queries.get_employee_mis", n) || null;
        } catch {
          L.value = null;
        }
        pa.value = !1;
      }
    }
    const Ps = v(!1), Js = v(null), es = v({ key: "", dir: "asc" }), Ht = V(() => (At.value || []).reduce((i, s) => ({
      invoices: i.invoices + (Number(s.invoice_count) || 0),
      qty: i.qty + (Number(s.qty_sold) || 0),
      discount: i.discount + (Number(s.total_discount) || 0),
      amount: i.amount + (Number(s.total_amount) || 0)
    }), { invoices: 0, qty: 0, discount: 0, amount: 0 })), xa = V(() => {
      const i = [...At.value || []], s = es.value.key;
      if (!s) return i;
      const n = es.value.dir === "desc" ? -1 : 1, r = (_) => s === "item" ? String(_.item_name || _.item_code || "").toLowerCase() : s === "uom" ? String(_.uom || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function Is(i) {
      es.value.key === i ? es.value = { key: i, dir: es.value.dir === "asc" ? "desc" : "asc" } : es.value = { key: i, dir: "asc" };
    }
    function Vs(i) {
      return es.value.key !== i ? "" : es.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Pe = ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Discount", "Total Amount"];
    function Ie(i) {
      return [i.item_name || i.item_code, i.uom || "", i.invoice_count, i.qty_sold, i.avg_rate, i.total_discount || 0, i.total_amount];
    }
    function gt(i, s) {
      Ut(i, s);
    }
    function yn() {
      var r;
      const i = xa.value.map((_) => Ie(_).join("	")), s = Ht.value;
      i.push(["Total", "", s.invoices, s.qty, "", s.discount, s.amount].join("	"));
      const n = [Pe.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function bn(i) {
      var n;
      const s = [Pe.join("	"), Ie(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function hn(i) {
      const s = [Pe.join(","), Ie(i).join(",")].join(`
`), n = String(i.item_code || i.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(s, "item_wise_sales_" + n + "_" + x.value + "_to_" + y.value + ".csv");
    }
    function Ca() {
      var r;
      if (!((r = At.value) != null && r.length)) return;
      const i = xa.value.map((_) => Ie(_).join(",")), s = Ht.value;
      i.push(["Total", "", s.invoices, s.qty, "", s.discount, s.amount].join(","));
      const n = [Pe.join(","), ...i].join(`
`);
      gt(n, "item_wise_sales_" + x.value + "_to_" + y.value + ".csv");
    }
    const Ns = v(!1), Xs = v(null), as = v({ key: "", dir: "asc" }), _t = V(() => ($t.value || []).reduce((i, s) => ({
      invoices: i.invoices + (Number(s.invoice_count) || 0),
      net: i.net + (Number(s.net_total) || 0),
      discount: i.discount + (Number(s.total_discount) || 0),
      tax: i.tax + (Number(s.total_tax) || 0),
      outstanding: i.outstanding + (Number(s.outstanding_amount) || 0),
      amount: i.amount + (Number(s.total_amount) || 0)
    }), { invoices: 0, net: 0, discount: 0, tax: 0, outstanding: 0, amount: 0 })), Sa = V(() => {
      const i = [...$t.value || []], s = as.value.key;
      if (!s) return i;
      const n = as.value.dir === "desc" ? -1 : 1, r = (_) => s === "customer" ? String(_.customer_name || _.customer || "").toLowerCase() : Number(_[s] || 0);
      return i.sort((_, j) => {
        const M = r(_), N = r(j);
        return typeof M == "string" ? n * M.localeCompare(N) : n * (M - N);
      }), i;
    });
    function os(i) {
      as.value.key === i ? as.value = { key: i, dir: as.value.dir === "asc" ? "desc" : "asc" } : as.value = { key: i, dir: "asc" };
    }
    function ls(i) {
      return as.value.key !== i ? "" : as.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ve = ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Avg Invoice", "Outstanding", "Total Amount"];
    function Ne(i) {
      return [i.customer_name || i.customer, i.invoice_count, i.net_total, i.total_discount || 0, i.total_tax, i.avg_invoice_value, i.outstanding_amount || 0, i.total_amount];
    }
    function gn() {
      var r;
      const i = Sa.value.map((_) => Ne(_).join("	")), s = _t.value;
      i.push(["Total", s.invoices, s.net, s.discount, s.tax, "", s.outstanding, s.amount].join("	"));
      const n = [Ve.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function fn(i) {
      var n;
      const s = [Ve.join("	"), Ne(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function kn(i) {
      const s = [Ve.join(","), Ne(i).join(",")].join(`
`), n = String(i.customer || i.customer_name || "customer").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(s, "customer_wise_sales_" + n + "_" + x.value + "_to_" + y.value + ".csv");
    }
    function ja() {
      var _;
      if (!((_ = $t.value) != null && _.length)) return;
      const i = Ve.join(","), s = Sa.value.map((j) => Ne(j).join(",")), n = _t.value;
      s.push(["Total", n.invoices, n.net, n.discount, n.tax, "", n.outstanding, n.amount].join(","));
      const r = [i, ...s].join(`
`);
      Ut(r, "customer_wise_sales_" + x.value + "_to_" + y.value + ".csv");
    }
    function Ma() {
      var n;
      if (!((n = ct.value) != null && n.length)) return;
      const i = ka.value.map((r) => Te(r).join(",")), s = [De.join(","), ...i].join(`
`);
      gt(s, "profit_wise_report_" + x.value + "_to_" + y.value + ".csv");
    }
    function Da() {
      var r;
      if (!((r = dt.value) != null && r.length)) return;
      const s = (Ms.value.length ? Ms.value : wa.value).map((_) => Oe(_).join(",")), n = [Re.join(","), ...s].join(`
`);
      gt(n, "invoice_profitability_" + x.value + "_to_" + y.value + ".csv");
    }
    function Io() {
      var _, j;
      const i = ["Warehouse", "Stock Value", "% of Total"].join(","), s = ((_ = wt.value) == null ? void 0 : _.grand_total) || 0, n = (((j = wt.value) == null ? void 0 : j.by_warehouse) || []).map(
        (M) => [M.warehouse, M.stock_value, s ? (M.stock_value / s * 100).toFixed(1) : "0"].join(",")
      ), r = [i, ...n].join(`
`);
      Ut(r, "stock_valuation_summary_" + y.value + ".csv");
    }
    function Vo() {
      const i = (s) => '"' + String(s ?? "").replace(/"/g, '""') + '"';
      h(
        ["Item Code", "Item Name", "Warehouse", "Stock Qty", "UOM", "Selling Price", "MRP"],
        Se.value.map((s) => [i(s.item_code), i(s.item_name), i(s.warehouse), s.qty, i(s.uom), s.selling_price, s.mrp].join(",")),
        "selling_price_mrp_" + y.value + ".csv"
      );
    }
    function No() {
      var r;
      const i = ["Date", "Sales", "Collection", "Purchase", "Expenses", "Dispatch Qty", "Production Qty", "Stock In", "Stock Out", "Outstanding"].join(","), s = (((r = X.value) == null ? void 0 : r.days) || []).map(
        (_) => [_.date, _.sales_amount, _.collection_amount, _.purchase_amount, _.expense_amount, _.dispatch_qty, _.production_qty, _.stock_inward_qty, _.stock_outward_qty, _.outstanding].join(",")
      ), n = [i, ...s].join(`
`);
      Ut(n, "daily_business_mis_" + x.value + "_to_" + y.value + ".csv");
    }
    function h(i, s, n) {
      const r = [i.join(","), ...s].join(`
`);
      Ut(r, n);
    }
    function Eo() {
      if (!O.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = yt.value;
      if (s === "product")
        h(
          ["Item", "UOM", "Invoices", "Qty Sold", "Discount", "Amount"],
          O.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.total_discount || 0, n.total_amount].join(",")),
          "sales_mis_product_wise_" + i
        );
      else if (s === "customer")
        h(
          ["Customer", "Invoices", "Amount", "Outstanding"],
          O.value.customer_wise.map((n) => [n.customer_name || n.customer, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "sales_mis_customer_wise_" + i
        );
      else if (s === "salesperson")
        h(
          ["Salesperson", "Invoices", "Amount"],
          O.value.salesperson_wise.map((n) => [n.sales_person, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_salesperson_wise_" + i
        );
      else if (s === "branch")
        h(
          ["Branch / Cost Center", "Invoices", "Amount"],
          O.value.branch_wise.map((n) => [n.branch, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_branch_wise_" + i
        );
      else if (s === "returns")
        h(
          ["Credit Note", "Date", "Customer", "Against Invoice", "Amount", "Reason"],
          O.value.sales_return.rows.map((n) => [n.credit_note, n.posting_date, n.customer_name || n.customer, n.return_against || "", n.grand_total, (n.reason || "").replace(/,/g, " ")].join(",")),
          "sales_mis_returns_" + i
        );
      else if (s === "discount")
        h(
          ["Customer", "Line Discount", "Header Discount", "Net Amount"],
          O.value.discount_analysis.by_customer.map((n) => [n.customer_name || n.customer, n.line_discount || 0, n.header_discount || 0, n.net_amount].join(",")),
          "sales_mis_discount_by_customer_" + i
        );
      else if (s === "pending")
        h(
          ["Sales Order", "Date", "Customer", "Status", "Order Value", "Billed", "Pending"],
          O.value.sales_order_pending.rows.map((n) => [n.sales_order, n.transaction_date, n.customer_name || n.customer, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "sales_mis_order_pending_" + i
        );
      else {
        const n = O.value.summary;
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
    function Bo() {
      if (!I.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Rt.value;
      s === "ageing" ? h(
        ["Customer", "0-30", "31-60", "61-90", "90+", "Total"],
        I.value.ageing.map((n) => [n.customer_name || n.customer, n.days_0_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "receivables_ageing_" + y.value + ".csv"
      ) : s === "daily_coll" ? h(
        ["Date", "Payments", "Amount"],
        I.value.daily_collection.days.map((n) => [n.date, n.count, n.amount].join(",")),
        "receivables_daily_collection_" + i
      ) : s === "overdue" ? h(
        ["Invoice", "Customer", "Due Date", "Overdue Days", "Outstanding"],
        I.value.overdue.rows.map((n) => [n.invoice, n.customer_name || n.customer, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "receivables_overdue_" + y.value + ".csv"
      ) : s === "credit" ? h(
        ["Customer", "Credit Limit", "Outstanding", "Utilisation %"],
        I.value.credit_utilisation.map((n) => [n.customer_name || n.customer, n.credit_limit || 0, n.outstanding_amount, n.utilisation_pct != null ? n.utilisation_pct.toFixed(1) : ""].join(",")),
        "receivables_credit_utilisation_" + y.value + ".csv"
      ) : h(
        ["Customer", "Open Invoices", "Oldest Due Date", "Outstanding"],
        I.value.customer_outstanding.map((n) => [n.customer_name || n.customer, n.invoice_count, n.oldest_due_date || "", n.outstanding_amount].join(",")),
        "receivables_customer_outstanding_" + y.value + ".csv"
      );
    }
    function qo() {
      if (!B.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Ot.value;
      if (s === "supplier")
        h(
          ["Supplier", "Bills", "Amount", "Outstanding"],
          B.value.supplier_wise.map((n) => [n.supplier_name || n.supplier, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "purchase_mis_supplier_wise_" + i
        );
      else if (s === "product")
        h(
          ["Item", "UOM", "Bills", "Qty Purchased", "Discount", "Amount"],
          B.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_purchased, n.total_discount || 0, n.total_amount].join(",")),
          "purchase_mis_product_wise_" + i
        );
      else if (s === "price_variance")
        h(
          ["Item", "Qty Purchased", "Actual Rate", "Standard Rate", "Variance", "Variance %"],
          B.value.price_variance.map((n) => [
            n.item_name || n.item_code,
            n.qty_purchased,
            n.actual_rate,
            n.has_standard_rate ? n.standard_rate : "Not set",
            n.has_standard_rate ? n.variance : "",
            n.has_standard_rate ? n.variance_pct.toFixed(1) : ""
          ].join(",")),
          "purchase_mis_price_variance_" + i
        );
      else if (s === "pending_po")
        h(
          ["Purchase Order", "Date", "Supplier", "Status", "Order Value", "Billed", "Pending"],
          B.value.pending_purchase_orders.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "purchase_mis_pending_po_" + y.value + ".csv"
        );
      else if (s === "pending_receipts")
        h(
          ["Purchase Order", "Date", "Supplier", "Status", "Ordered Qty", "Received Qty", "Pending Qty"],
          B.value.pending_material_receipts.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.ordered_qty, n.received_qty || 0, n.pending_qty].join(",")),
          "purchase_mis_pending_receipts_" + y.value + ".csv"
        );
      else if (s === "returns")
        h(
          ["Debit Note", "Date", "Supplier", "Against Bill", "Amount"],
          B.value.purchase_return.rows.map((n) => [n.debit_note, n.posting_date, n.supplier_name || n.supplier, n.return_against || "", n.grand_total].join(",")),
          "purchase_mis_returns_" + i
        );
      else {
        const n = B.value.summary;
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
    function Ao() {
      if (!R.value) return;
      const i = y.value + ".csv", s = bt.value;
      s === "current_stock" ? h(
        ["Item", "Warehouse", "UOM", "Qty", "Rate", "Value"],
        R.value.current_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.uom || "", n.actual_qty, n.valuation_rate, n.stock_value].join(",")),
        "inventory_mis_current_stock_" + i
      ) : s === "stock_value" ? h(
        ["Warehouse", "Items", "Qty", "Stock Value"],
        R.value.stock_value.by_warehouse.map((n) => [n.warehouse, n.item_count, n.total_qty, n.stock_value].join(",")),
        "inventory_mis_stock_value_" + i
      ) : s === "fast_moving" ? h(
        ["Item", "Qty Consumed", "Transactions", "Current Qty"],
        R.value.fast_moving.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.current_qty].join(",")),
        "inventory_mis_fast_moving_" + x.value + "_to_" + y.value + ".csv"
      ) : s === "slow_moving" ? h(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        R.value.slow_moving.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "", n.days_since_movement].join(",")),
        "inventory_mis_slow_moving_" + i
      ) : s === "dead_stock" ? h(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        R.value.dead_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "Never", n.days_since_movement ?? ""].join(",")),
        "inventory_mis_dead_stock_" + i
      ) : s === "ageing" ? h(
        ["Item", "Warehouse", "Qty", "Stock Value", "Last Receipt", "Age (Days)"],
        R.value.stock_ageing.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.stock_value, n.last_receipt_date || "Never", n.age_days ?? ""].join(",")),
        "inventory_mis_ageing_" + i
      ) : s === "reorder" ? h(
        ["Item", "Warehouse", "Qty on Hand", "Reorder Level", "Reorder Qty", "Shortage"],
        R.value.reorder_low_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.reorder_level, n.reorder_qty, n.shortage_qty].join(",")),
        "inventory_mis_reorder_" + i
      ) : s === "excess" ? h(
        ["Item", "Qty on Hand", "Avg Daily Consumption", "Days of Cover", "Excess Qty", "Excess Value"],
        R.value.excess_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.avg_daily_consumption, n.days_of_cover, n.excess_qty, n.excess_value].join(",")),
        "inventory_mis_excess_stock_" + i
      ) : s === "adjustment" ? h(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty", "Rate", "Value", "Reason"],
        R.value.stock_adjustment.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.rate, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_adjustment_" + x.value + "_to_" + y.value + ".csv"
      ) : s === "loss" && h(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty Lost", "Value Lost", "Reason"],
        R.value.stock_loss.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_loss_" + x.value + "_to_" + y.value + ".csv"
      );
    }
    function $o() {
      if (!T.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = ht.value;
      s === "plan_vs_actual" ? h(
        ["Production Plan", "Date", "Item", "Planned Qty", "Produced Qty", "Variance", "Variance %"],
        T.value.plan_vs_actual.rows.map((n) => [n.production_plan, n.posting_date, n.item_name || n.item_code, n.planned_qty, n.produced_qty, n.variance_qty, n.variance_pct ?? ""].join(",")),
        "production_mis_plan_vs_actual_" + i
      ) : s === "pending" ? h(
        ["Work Order", "Item", "Status", "Qty", "Produced", "Pending", "Planned End"],
        T.value.production_pending.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.qty, n.produced_qty, n.pending_qty, n.planned_end_date || ""].join(",")),
        "production_mis_pending_" + y.value + ".csv"
      ) : s === "wip" ? h(
        ["Work Order", "Item", "Qty", "Produced", "% Complete", "WIP Warehouse", "WIP Value"],
        T.value.wip_status.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.qty, n.produced_qty, n.pct_complete, n.wip_warehouse || "", n.wip_stock_value].join(",")),
        "production_mis_wip_" + y.value + ".csv"
      ) : s === "material_availability" ? h(
        ["Work Order", "Item", "Warehouse", "Still to Issue", "Available", "Shortage"],
        T.value.raw_material_availability.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.warehouse, n.still_to_issue, n.available_qty, n.shortage_qty].join(",")),
        "production_mis_material_availability_" + y.value + ".csv"
      ) : s === "material_consumption" ? h(
        ["Item", "Qty Consumed", "Transactions", "Value Consumed"],
        T.value.material_consumption.rows.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.value_consumed].join(",")),
        "production_mis_material_consumption_" + i
      ) : s === "material_variance" ? h(
        ["Work Order", "Item", "Required Qty", "Consumed Qty", "Variance Qty", "Variance Value"],
        T.value.material_variance.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.required_qty, n.consumed_qty, n.variance_qty, n.variance_value].join(",")),
        "production_mis_material_variance_" + i
      ) : s === "production_cost" ? h(
        ["Work Order", "Item", "Produced", "Material Value", "Operating Cost", "Total Cost", "Cost/Unit", "Standard/Unit"],
        T.value.production_cost.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.produced_qty, n.material_value, n.operating_cost, n.actual_total_cost, n.actual_cost_per_unit ?? "", n.standard_cost_per_unit ?? ""].join(",")),
        "production_mis_cost_" + i
      ) : s === "efficiency" ? h(
        ["Work Order", "Item", "Status", "Planned (min)", "Actual (min)", "Efficiency %"],
        T.value.production_efficiency.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.planned_mins, n.actual_mins, n.efficiency_pct].join(",")),
        "production_mis_efficiency_" + i
      ) : s === "rejection" ? h(
        ["Job Card", "Work Order", "Operation", "Item", "Qty", "Value"],
        T.value.rejection_rework.rows.map((n) => [n.job_card, n.work_order, n.operation || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_rejection_" + i
      ) : s === "scrap" && h(
        ["Stock Entry", "Work Order", "Item", "Qty", "Value"],
        T.value.scrap_wastage.rows.map((n) => [n.stock_entry, n.work_order || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_scrap_" + i
      );
    }
    function Lo() {
      if (!A.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = xt.value;
      s === "sales" ? h(
        ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Revenue"],
        A.value.product_wise_sales.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.avg_rate, n.total_amount].join(",")),
        "product_mis_sales_" + i
      ) : s === "profit" ? h(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        A.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.profit, n.margin_pct].join(",")),
        "product_mis_profit_" + i
      ) : s === "cost" ? h(
        ["Item", "Qty Sold", "Cost Rate", "Total Cost"],
        A.value.product_wise_cost.rows.map((n) => [n.item_name || n.item_code, n.qty_sold, n.cost_rate, n.total_cost].join(",")),
        "product_mis_cost_" + i
      ) : s === "margin" ? h(
        ["Item", "Revenue", "Cost", "Margin %"],
        A.value.product_wise_margin.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.margin_pct].join(",")),
        "product_mis_margin_" + i
      ) : s === "production" ? h(
        ["Item", "Qty Produced", "Value Produced", "Transactions"],
        A.value.product_wise_production.rows.map((n) => [n.item_name || n.item_code, n.qty_produced, n.value_produced, n.transactions].join(",")),
        "product_mis_production_" + i
      ) : s === "stock" ? h(
        ["Item", "UOM", "Qty on Hand", "Rate", "Stock Value"],
        A.value.product_wise_stock.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.total_qty, n.valuation_rate, n.total_value].join(",")),
        "product_mis_stock_" + y.value + ".csv"
      ) : s === "wastage" ? h(
        ["Item", "Qty Scrapped", "Value Scrapped", "Transactions"],
        A.value.product_wise_wastage.rows.map((n) => [n.item_name || n.item_code, n.qty_scrapped, n.value_scrapped, n.transactions].join(",")),
        "product_mis_wastage_" + i
      ) : s === "top_selling" ? h(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.top_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_top_selling_" + i
      ) : s === "low_selling" && h(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.low_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_low_selling_" + i
      );
    }
    function Qo() {
      if (!z.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Kt.value;
      s === "pending_dispatch" ? h(
        ["Sales Order", "Order Date", "Customer", "Item", "Ordered Qty", "Pending Qty", "Pending Value"],
        z.value.pending_dispatch.rows.map((n) => [n.sales_order, n.order_date, n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_pending_dispatch_" + y.value + ".csv"
      ) : s === "delivery_pending" ? h(
        ["Sales Order", "Delivery Date", "Customer", "Item", "Ordered Qty", "Dispatched Qty", "Pending Qty"],
        z.value.delivery_pending.rows.map((n) => [n.sales_order, n.delivery_date || "", n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.delivered_qty, n.pending_qty].join(",")),
        "dispatch_mis_delivery_pending_" + y.value + ".csv"
      ) : s === "delayed_delivery" ? h(
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Item", "Pending Qty", "Pending Value"],
        z.value.delayed_delivery.rows.map((n) => [n.sales_order, n.delivery_date, n.days_overdue, n.customer_name || n.customer, n.item_name || n.item_code, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_delayed_delivery_" + y.value + ".csv"
      ) : s === "customer_pending" ? h(
        ["Customer", "Orders", "Pending Qty", "Pending Value"],
        z.value.customer_wise_pending_delivery.rows.map((n) => [n.customer_name || n.customer, n.order_count, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_customer_pending_" + y.value + ".csv"
      ) : s === "transport_wise" && h(
        ["Transporter", "Dispatches", "Customers", "Total Qty", "Total Value"],
        z.value.transport_wise_dispatch.rows.map((n) => [n.transporter_name, n.dispatch_count, n.customer_count, n.total_qty, n.total_value].join(",")),
        "dispatch_mis_transport_wise_" + i
      );
    }
    function Fo() {
      if (!q.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = vt.value, n = (r, _, j, M) => {
        h(_, q.value.summary[r].rows.map(j), "order_mis_" + M + "_" + i);
      };
      s === "total" ? n(
        "total_orders",
        ["Sales Order", "Order Date", "Delivery Date", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.delivery_date || "", r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "total_orders"
      ) : s === "new" ? n(
        "new_orders",
        ["Sales Order", "Order Date", "Customer", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.grand_total].join(","),
        "new_orders"
      ) : s === "pending" ? n(
        "pending_orders",
        ["Sales Order", "Order Date", "Delivery Date", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.delivery_date || "", r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "pending_orders"
      ) : s === "under_production" ? n(
        "under_production",
        ["Sales Order", "Order Date", "Customer", "Work Order Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.wo_statuses.join(" / "), r.grand_total].join(","),
        "under_production"
      ) : s === "ready_for_dispatch" ? n(
        "ready_for_dispatch",
        ["Sales Order", "Order Date", "Customer", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.grand_total].join(","),
        "ready_for_dispatch"
      ) : s === "delayed" ? n(
        "delayed_orders",
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.delivery_date, r.days_overdue, r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "delayed_orders"
      ) : s === "delivered" ? n(
        "delivered_orders",
        ["Sales Order", "Order Date", "Customer", "Status", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.status, r.grand_total].join(","),
        "delivered_orders"
      ) : s === "cancelled" ? n(
        "cancelled_orders",
        ["Sales Order", "Order Date", "Customer", "Order Value"],
        (r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.grand_total].join(","),
        "cancelled_orders"
      ) : s === "order_value" ? h(
        ["Status", "Orders", "Value"],
        q.value.order_value.by_status.map((r) => [r.status, r.order_count, r.total_value].join(",")),
        "order_mis_order_value_" + i
      ) : s === "profitability" && h(
        ["Sales Order", "Date", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        q.value.order_profitability.rows.map((r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.revenue, r.total_cost, r.profit, r.margin_pct].join(",")),
        "order_mis_profitability_" + i
      );
    }
    function Ho() {
      if (!W.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Lt.value;
      s === "product" ? h(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_product_" + i
      ) : s === "customer" ? h(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.customer_wise_profit.rows.map((n) => [n.customer_name || n.customer, n.invoice_count, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_customer_" + i
      ) : s === "order" ? h(
        ["Sales Order", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.order_wise_profit.rows.map((n) => [n.sales_order, n.customer_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_order_" + i
      ) : s === "branch" ? h(
        ["Branch (Cost Center)", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.branch_wise_profit.rows.map((n) => [n.cost_center_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_branch_" + i
      ) : s === "salesperson" ? h(
        ["Salesperson", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.salesperson_wise_profit.rows.map((n) => [n.sales_person_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_salesperson_" + i
      ) : s === "monthly_trend" && h(
        ["Month", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.monthly_profit_trend.rows.map((n) => [n.month, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_monthly_trend_" + i
      );
    }
    function zo() {
      if (!U.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Pt.value;
      s === "department" ? h(
        ["Department (Cost Center)", "Expenses", "Amount"],
        U.value.department_wise.rows.map((n) => [n.cost_center_name, n.count, n.amount].join(",")),
        "expense_mis_department_" + i
      ) : s === "category" ? h(
        ["Category", "Expenses", "Amount", "% of Total"],
        U.value.category_wise.rows.map((n) => [n.category_name, n.count, n.amount, n.pct_of_total.toFixed(1)].join(",")),
        "expense_mis_category_" + i
      ) : s === "budget" ? h(
        ["Cost Center", "Budget Period", "Period Budget (est.)", "Actual", "Variance", "Variance %"],
        U.value.budget_vs_actual.rows.map((n) => [n.cost_center_name, n.budget_period, n.period_budget, n.actual, n.variance, n.variance_pct.toFixed(1)].join(",")),
        "expense_mis_budget_vs_actual_" + i
      ) : s === "fixed" ? h(
        ["Category", "Expenses", "Amount"],
        U.value.fixed_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_fixed_" + i
      ) : s === "variable" ? h(
        ["Category", "Expenses", "Amount"],
        U.value.variable_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_variable_" + i
      ) : s === "trend" ? h(
        ["Month", "Expenses", "Amount"],
        U.value.expense_trend.rows.map((n) => [n.month, n.count, n.amount].join(",")),
        "expense_mis_trend_" + i
      ) : s === "unusual" && h(
        ["Expense", "Date", "Category", "Department", "Amount", "Category Avg", "Basis"],
        U.value.unusual_expenses.rows.map((n) => [n.expense, n.posting_date, n.category_name, n.cost_center_name || "", n.amount, n.category_avg, n.basis].join(",")),
        "expense_mis_unusual_" + i
      );
    }
    function Wo() {
      if (!Z.value) return;
      const i = y.value + ".csv", s = Qt.value;
      s === "ageing" ? h(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        Z.value.payable_ageing.rows.map((n) => [n.supplier_name, n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "payables_mis_ageing_" + i
      ) : s === "overdue" ? h(
        ["Invoice", "Supplier", "Due Date", "Overdue Days", "Outstanding"],
        Z.value.overdue_payables.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "payables_mis_overdue_" + i
      ) : s === "due_week" ? h(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        Z.value.due_this_week.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_week_" + i
      ) : s === "due_month" ? h(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        Z.value.due_this_month.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_month_" + i
      ) : s === "supplier" ? h(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Oldest Overdue (days)"],
        Z.value.supplier_wise_outstanding.rows.map((n) => [n.supplier_name, n.invoice_count, n.outstanding, n.overdue_amount, n.max_overdue_days].join(",")),
        "payables_mis_supplier_" + i
      ) : s === "forecast" && h(
        ["Bucket", "Invoices", "Amount"],
        Z.value.payment_due_forecast.rows.map((n) => [n.label, n.count, n.amount].join(",")),
        "payables_mis_forecast_" + i
      );
    }
    function Uo() {
      if (!E.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = It.value;
      s === "cash_position" ? h(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.cash_position.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_cash_position_" + i
      ) : s === "bank_balance" ? h(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.bank_balance.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_bank_balance_" + i
      ) : s === "daily_cash" ? h(
        ["Date", "Receipts", "Payments", "Net", "Balance"],
        E.value.daily_cash_flow.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_cash_flow_" + i
      ) : s === "daily_bank" ? h(
        ["Date", "Deposits", "Withdrawals", "Net", "Balance"],
        E.value.daily_bank_movement.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_bank_movement_" + i
      ) : s === "receipts" ? h(
        ["Reference", "Date", "Party", "Account", "Mode", "Amount"],
        E.value.receipts.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.mode_of_payment || "", n.amount].join(",")),
        "cash_bank_mis_receipts_" + i
      ) : s === "payments" ? h(
        ["Reference", "Date", "Party", "Account", "Source", "Amount"],
        E.value.payments.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.source, n.amount].join(",")),
        "cash_bank_mis_payments_" + i
      ) : s === "forecast" ? h(
        ["Bucket", "Expected Inflow", "Expected Outflow", "Net", "Projected Balance"],
        E.value.cash_forecast.rows.map((n) => [n.label, n.inflow, n.outflow, n.net, n.projected_balance].join(",")),
        "cash_bank_mis_forecast_" + i
      ) : s === "fund_requirement" && h(
        ["Bucket", "Shortfall"],
        E.value.fund_requirement.rows.map((n) => [n.label, n.shortfall].join(",")),
        "cash_bank_mis_fund_requirement_" + i
      );
    }
    function Ko() {
      if (!D.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Ct.value, n = (r) => r.customer_name || r.customer;
      s === "new_customers" ? h(
        ["Customer", "First Invoice Date", "Invoices in Period", "Revenue in Period"],
        D.value.new_customers.rows.map((r) => [n(r), r.first_invoice_date, r.invoice_count, r.total_amount].join(",")),
        "customer_mis_new_customers_" + i
      ) : s === "active_customers" ? h(
        ["Customer", "Invoices", "Revenue", "First Invoice", "Last Invoice"],
        D.value.active_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount, r.first_invoice_in_period, r.last_invoice_in_period].join(",")),
        "customer_mis_active_customers_" + i
      ) : s === "repeat_customers" ? h(
        ["Customer", "Invoices", "Revenue"],
        D.value.repeat_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_repeat_customers_" + i
      ) : s === "customer_wise_sales" ? h(
        ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        D.value.customer_wise_sales.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "customer_mis_customer_wise_sales_" + i
      ) : s === "customer_wise_outstanding" ? h(
        ["Customer", "Invoices", "Outstanding", "Oldest Due Date", "Max Overdue Days"],
        D.value.customer_wise_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.oldest_due_date, r.max_overdue_days].join(",")),
        "customer_mis_customer_wise_outstanding_" + i
      ) : s === "customer_wise_profit" ? h(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        D.value.customer_wise_profit.rows.map((r) => [n(r), r.invoice_count, r.revenue, r.total_cost, r.profit, Number(r.margin_pct).toFixed(1)].join(",")),
        "customer_mis_customer_wise_profit_" + i
      ) : s === "customer_retention" ? h(
        ["Customer", "Status"],
        D.value.customer_retention.rows.map((r) => [n(r), r.status].join(",")),
        "customer_mis_customer_retention_" + i
      ) : s === "top_customers" ? h(
        ["Rank", "Customer", "Invoices", "Revenue"],
        D.value.top_customers.rows.map((r, _) => [_ + 1, n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_top_customers_" + i
      ) : s === "inactive_customers" && h(
        ["Customer", "Last Invoice Date", "Days Inactive", "Lifetime Invoices", "Lifetime Revenue"],
        D.value.inactive_customers.rows.map((r) => [n(r), r.last_invoice_date, r.days_inactive, r.invoice_count, r.lifetime_revenue].join(",")),
        "customer_mis_inactive_customers_" + i
      );
    }
    function Go() {
      if (!$.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Ft.value, n = (r) => r.supplier_name || r.supplier;
      s === "supplier_wise_purchase" ? h(
        ["Supplier", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        $.value.supplier_wise_purchase.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "supplier_mis_supplier_wise_purchase_" + i
      ) : s === "supplier_outstanding" ? h(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Max Overdue Days"],
        $.value.supplier_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.overdue_amount, r.max_overdue_days].join(",")),
        "supplier_mis_supplier_outstanding_" + i
      ) : s === "supplier_payment_ageing" ? h(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        $.value.supplier_payment_ageing.rows.map((r) => [n(r), r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
        "supplier_mis_supplier_payment_ageing_" + i
      ) : s === "purchase_price_comparison" ? h(
        ["Item", "Supplier", "Qty", "Avg Rate", "Is Lowest", "Vs Lowest %"],
        $.value.purchase_price_comparison.rows.map((r) => [r.item_name || r.item_code, n(r), r.qty, r.avg_rate, r.is_lowest ? "Yes" : "No", Number(r.variance_vs_lowest_pct).toFixed(1)].join(",")),
        "supplier_mis_purchase_price_comparison_" + i
      ) : s === "supplier_performance" ? h(
        ["Supplier", "Purchase Amount", "Outstanding", "On-time Delivery %", "Rejection %", "Avg Price Variance %", "Score"],
        $.value.supplier_performance.rows.map((r) => [n(r), r.total_purchase_amount, r.outstanding_amount, r.on_time_delivery_pct ?? "", r.rejection_pct ?? "", r.avg_price_variance_pct ?? "", r.performance_score ?? ""].join(",")),
        "supplier_mis_supplier_performance_" + i
      ) : s === "delivery_performance" ? h(
        ["Receipt", "Supplier", "Received Date", "Expected Date", "Delay (days)", "Status"],
        $.value.delivery_performance.rows.map((r) => [r.receipt, n(r), r.received_date, r.expected_date || "", r.has_reference ? r.delay_days : "", r.has_reference ? r.on_time ? "On-time" : "Late" : "No PO Ref"].join(",")),
        "supplier_mis_delivery_performance_" + i
      ) : s === "quality_rejection" && h(
        ["Supplier", "Item", "Received Qty", "Accepted Qty", "Rejected Qty", "Rejection %"],
        $.value.quality_rejection.rows.map((r) => [n(r), r.item_name || r.item_code, r.received_qty, r.accepted_qty, r.rejected_qty, Number(r.rejection_pct).toFixed(2)].join(",")),
        "supplier_mis_quality_rejection_" + i
      );
    }
    function Yo() {
      if (!L.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Vt.value, n = (r) => r.sales_person_name || r.sales_person;
      s === "employee_attendance" ? h(
        ["Employee", "Present Days", "Period Days", "Attendance %", "Total Hours", "Avg Hrs/Day"],
        L.value.employee_attendance.rows.map((r) => [r.employee, r.present_days, r.period_days, r.attendance_pct, r.total_hours, r.avg_hours_per_day].join(",")),
        "employee_mis_attendance_" + i
      ) : s === "department_manpower" ? h(
        ["Department", "Headcount", "Employees"],
        L.value.department_manpower.rows.map((r) => [r.department, r.headcount, '"' + r.employees.map((_) => _.sales_person_name).join("; ") + '"'].join(",")),
        "employee_mis_department_manpower_" + i
      ) : s === "salesperson_target" ? h(
        ["Salesperson", "Invoices", "Achieved", "Target", "Achievement %"],
        L.value.salesperson_achievement.rows.map((r) => [n(r), r.invoice_count, r.total_amount, Ws.value[r.sales_person] || "", Ws.value[r.sales_person] ? ya(r).toFixed(1) : ""].join(",")),
        "employee_mis_salesperson_target_" + i
      ) : s === "salesperson_collection" ? h(
        ["Salesperson", "Payments", "Collected Amount"],
        L.value.salesperson_collection.rows.map((r) => [n(r), r.payment_count, r.collected_amount].join(",")),
        "employee_mis_salesperson_collection_" + i
      ) : s === "production_productivity" ? h(
        ["Employee", "Job Cards", "Hours", "Qty Produced", "Avg Time/Unit (min)", "Qty/Hour"],
        L.value.production_productivity.rows.map((r) => [r.employee, r.job_card_count, r.total_hours, r.qty_produced, r.avg_time_per_unit_mins ?? "", r.qty_per_hour ?? ""].join(",")),
        "employee_mis_production_productivity_" + i
      ) : s === "overtime" ? h(
        ["Employee", "Overtime Days", "Overtime Hours"],
        L.value.overtime.summary.map((r) => [r.employee, r.overtime_days, r.overtime_hours].join(",")),
        "employee_mis_overtime_" + i
      ) : s === "labour_cost" ? h(
        ["Employee", "Hours", "Cost"],
        L.value.labour_cost.by_employee.map((r) => [r.employee, r.total_hours, r.total_cost].join(",")),
        "employee_mis_labour_cost_" + i
      ) : s === "employee_performance" && h(
        ["Employee", "Hours", "Qty Produced", "Qty/Hour", "Rejection %", "Attendance %", "Overtime Hrs", "Score"],
        L.value.employee_performance.rows.map((r) => [r.employee, r.total_hours, r.qty_produced, r.qty_per_hour ?? "", r.rejection_pct ?? "", r.attendance_pct ?? "", r.overtime_hours, r.performance_score ?? ""].join(",")),
        "employee_mis_performance_" + i
      );
    }
    function ne() {
      const i = f.value === "ar", s = i ? rt.value : ut.value, n = i ? "Customer" : "Vendor", r = i ? "customer_name" : "supplier_name", _ = [n, "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"].join(","), j = s.map(
        (N) => [N[r] || N[i ? "customer" : "supplier"], N.current, N.days_1_30, N.days_31_60, N.days_61_90, N.days_90_plus, N.total].join(",")
      ), M = [_, ...j].join(`
`);
      Ut(M, (i ? "ar_aging" : "ap_aging") + "_" + y.value + ".csv");
    }
    const wn = [
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
      { key: "asset_reg", label: "Asset Register", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "lab_contract", label: "Contract Status", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "lab_wages", label: "Employee Wages", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
      { key: "lab_weekly", label: "Weekly Payments", icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' }
    ], xn = ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg", "lab_contract", "lab_wages", "lab_weekly"], Cn = wn.filter((i) => xn.includes(i.key)), Jo = ["c-blue", "c-slate", "c-cyan", "c-amber", "c-pink", "c-slate", "c-emerald", "c-violet", "c-blue", "c-blue"];
    function Sn(i) {
      return Jo[i % Jo.length];
    }
    return (i, s) => {
      var n, r, _, j, M, N, Nt, Es, Xo, Zo, tl, sl, el;
      return l(), o("div", zn, [
        s[839] || (s[839] = C('<div class="reports-header" data-v-94f2f87b><div data-v-94f2f87b><p class="reports-subtitle" data-v-94f2f87b>Get detailed insights into your business performance</p></div><div class="reports-header-right" data-v-94f2f87b><div class="reports-header-icons" data-v-94f2f87b><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="10" width="4" height="10" rx="1" data-v-94f2f87b></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-94f2f87b></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-94f2f87b></rect></svg><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><circle cx="12" cy="12" r="9" data-v-94f2f87b></circle><path d="M12 3v9l7 3" data-v-94f2f87b></path></svg></div></div></div>', 1)),
        t("div", Wn, [
          (l(!0), o(u, null, m(k(Cn), (e, g) => (l(), o("button", {
            key: e.key,
            class: c(["report-card", [Sn(g), { active: f.value === e.key }]]),
            onClick: (Q) => f.value = e.key
          }, [
            t("span", {
              class: "report-card-icon",
              innerHTML: e.icon
            }, null, 8, Kn),
            t("span", Gn, a(e.label), 1)
          ], 10, Un))), 128))
        ]),
        t("div", Yn, [
          ["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(f.value) ? (l(), o(u, { key: 0 }, [
            s[210] || (s[210] = t("span", { class: "dr-icon" }, "📅", -1)),
            s[211] || (s[211] = t("label", { class: "dr-label" }, "As of Date", -1)),
            Et(t("input", {
              type: "date",
              "onUpdate:modelValue": s[0] || (s[0] = (e) => y.value = e),
              class: "dr-input"
            }, null, 512), [
              [Gt, y.value]
            ])
          ], 64)) : (l(), o(u, { key: 1 }, [
            s[212] || (s[212] = t("span", { class: "dr-icon" }, "📅", -1)),
            s[213] || (s[213] = t("label", { class: "dr-label" }, "Date Range", -1)),
            Et(t("input", {
              type: "date",
              "onUpdate:modelValue": s[1] || (s[1] = (e) => x.value = e),
              class: "dr-input"
            }, null, 512), [
              [Gt, x.value]
            ]),
            s[214] || (s[214] = t("span", { class: "dr-to" }, "To", -1)),
            Et(t("input", {
              type: "date",
              "onUpdate:modelValue": s[2] || (s[2] = (e) => y.value = e),
              class: "dr-input"
            }, null, 512), [
              [Gt, y.value]
            ])
          ], 64)),
          St[f.value] ? b("", !0) : (l(), o("button", {
            key: 2,
            class: "books-btn books-btn-primary",
            onClick: pn
          }, "▷ Run Report")),
          s[215] || (s[215] = t("span", { class: "dr-spacer" }, null, -1)),
          ["ar", "ap"].includes(f.value) && (rt.value.length || ut.value.length) ? (l(), o("button", {
            key: 3,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ne
          }, " Export CSV ")) : b("", !0),
          f.value === "items" && At.value.length ? (l(), o("button", {
            key: 4,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Ca
          }, " Export CSV ")) : b("", !0),
          f.value === "customers" && $t.value.length ? (l(), o("button", {
            key: 5,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ja
          }, " Export CSV ")) : b("", !0),
          f.value === "profit" && ct.value.length ? (l(), o("button", {
            key: 6,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Ma
          }, " Export CSV ")) : b("", !0),
          f.value === "invoice_profit" && dt.value.length ? (l(), o("button", {
            key: 7,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Da
          }, " Export CSV ")) : b("", !0)
        ]),
        ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg", "lab_contract", "lab_wages", "lab_weekly"].includes(f.value) ? (l(), o("div", {
          key: f.value,
          class: "books-card report-card bs-card"
        }, [
          t("div", Jn, [
            s[219] || (s[219] = C('<div class="bs-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="3" y="3" width="18" height="18" rx="2" data-v-94f2f87b></rect><line x1="3" y1="9" x2="21" y2="9" data-v-94f2f87b></line><line x1="9" y1="21" x2="9" y2="9" data-v-94f2f87b></line></svg></div>', 1)),
            t("div", Xn, [
              t("div", Zn, a(ul.value), 1),
              t("div", ti, a(cl.value), 1)
            ]),
            t("div", si, [
              Ia.value ? (l(), o("div", ei, [
                s[216] || (s[216] = t("svg", {
                  class: "proc-search-icon",
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  t("circle", {
                    cx: "11",
                    cy: "11",
                    r: "8"
                  }),
                  t("line", {
                    x1: "21",
                    y1: "21",
                    x2: "16.65",
                    y2: "16.65"
                  })
                ], -1)),
                Et(t("input", {
                  "onUpdate:modelValue": s[3] || (s[3] = (e) => ns.value = e),
                  type: "text",
                  class: "dr-input proc-search-input",
                  placeholder: rl.value
                }, null, 8, ai), [
                  [Gt, ns.value]
                ]),
                ns.value ? (l(), o("button", {
                  key: 0,
                  type: "button",
                  class: "proc-search-clear",
                  title: "Clear",
                  onClick: s[4] || (s[4] = (e) => ns.value = "")
                }, "×")) : b("", !0)
              ])) : b("", !0),
              re.includes(f.value) ? b("", !0) : Et((l(), o("select", {
                key: 1,
                "onUpdate:modelValue": s[5] || (s[5] = (e) => zt.value = e),
                class: "dr-input"
              }, [
                s[217] || (s[217] = t("option", { value: "" }, "All projects", -1)),
                (l(!0), o(u, null, m(Ee.value, (e) => (l(), o("option", {
                  key: e,
                  value: e
                }, a(e), 9, oi))), 128))
              ], 512)), [
                [al, zt.value]
              ]),
              t("div", li, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[6] || (s[6] = (e) => qs.value = !qs.value),
                  disabled: !is.value.length
                }, [...s[218] || (s[218] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, ni),
                qs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[7] || (s[7] = (e) => qs.value = !1)
                  }),
                  t("div", ii, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[8] || (s[8] = (e) => {
                        qs.value = !1, pl();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[9] || (s[9] = (e) => {
                        qs.value = !1, _l();
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          !nl.value && !ue.value ? (l(), o("div", di, "Run the report to see results.")) : ue.value ? (l(), o("div", ri)) : Zs.value ? (l(), o("div", ui, a(Zs.value), 1)) : Wt.value.length && !is.value.length ? (l(), o("div", ci, 'No rows match "' + a(ns.value) + '".', 1)) : Wt.value.length ? (l(), o("div", mi, [
            t("div", vi, [
              t("table", _i, [
                t("thead", null, [
                  t("tr", null, [
                    (l(!0), o(u, null, m(me.value, (e) => (l(), o("th", {
                      key: e,
                      class: c({ "ta-r": Na(e) })
                    }, a(ve(e)), 3))), 128))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m(is.value, (e, g) => (l(), o("tr", { key: g }, [
                    (l(!0), o(u, null, m(me.value, (Q) => (l(), o("td", {
                      key: Q,
                      "data-label": ve(Q),
                      class: c({ "ta-r": Na(Q) })
                    }, a(vl(e[Q], Q)), 11, pi))), 128))
                  ]))), 128))
                ])
              ])
            ])
          ])) : (l(), o("div", yi, "No rows for this report."))
        ])) : b("", !0),
        f.value === "pl" ? (l(), o("div", bi, [
          t("div", hi, [
            s[222] || (s[222] = C('<div class="pl-dash-title" data-v-94f2f87b><span class="pl-dash-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="10" width="4" height="10" rx="1" data-v-94f2f87b></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-94f2f87b></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-94f2f87b></rect></svg></span><div data-v-94f2f87b><div class="pl-dash-h" data-v-94f2f87b>Profit &amp; Loss</div><div class="pl-dash-sub" data-v-94f2f87b>Overview of your income, expenses and profitability</div></div></div>', 1)),
            t("div", gi, [
              s[220] || (s[220] = C('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="4" width="18" height="18" rx="2" data-v-94f2f87b></rect><line x1="3" y1="10" x2="21" y2="10" data-v-94f2f87b></line><line x1="8" y1="2" x2="8" y2="6" data-v-94f2f87b></line><line x1="16" y1="2" x2="16" y2="6" data-v-94f2f87b></line></svg>', 1)),
              ot(" " + a(P(x.value)) + " - " + a(P(y.value)) + " ", 1),
              s[221] || (s[221] = t("span", { class: "pl-dash-range-caret" }, "▾", -1))
            ])
          ]),
          k(yl) ? (l(), o("div", fi)) : k(at) ? (l(), o(u, { key: 1 }, [
            t("div", ki, [
              t("div", wi, [
                s[223] || (s[223] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "🪙"),
                  t("span", { class: "pl-kpi-label" }, "Total Income")
                ], -1)),
                t("div", xi, a(k(S)(k(at).total_income)), 1),
                t("div", {
                  class: c(["pl-kpi-trend", ga(To.value)])
                }, a(fa(To.value)), 3)
              ]),
              k(at).cogs ? (l(), o("div", Ci, [
                s[224] || (s[224] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "🛒"),
                  t("span", { class: "pl-kpi-label" }, "Cost of Goods Sold")
                ], -1)),
                t("div", Si, a(k(S)(k(at).cogs)), 1),
                s[225] || (s[225] = t("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : b("", !0),
              k(at).cogs ? (l(), o("div", ji, [
                s[226] || (s[226] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📊"),
                  t("span", { class: "pl-kpi-label" }, "Gross Profit")
                ], -1)),
                t("div", {
                  class: c(["pl-kpi-val", k(at).gross_profit >= 0 ? "green" : "red"])
                }, a(k(S)(k(at).gross_profit)), 3),
                s[227] || (s[227] = t("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : b("", !0),
              t("div", Mi, [
                s[228] || (s[228] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📄"),
                  t("span", { class: "pl-kpi-label" }, "Total Expense")
                ], -1)),
                t("div", Di, a(k(S)(k(at).total_expense)), 1),
                t("div", {
                  class: c(["pl-kpi-trend", ga(Ro.value, !0)])
                }, a(fa(Ro.value)), 3)
              ]),
              k(at).stock_adjustment ? (l(), o("div", Ti, [
                s[229] || (s[229] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📦"),
                  t("span", { class: "pl-kpi-label" }, "Stock Adjustment")
                ], -1)),
                t("div", {
                  class: c(["pl-kpi-val", k(at).stock_adjustment > 0 ? "red" : "green"])
                }, a(k(S)(k(at).stock_adjustment)), 3),
                s[230] || (s[230] = t("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : b("", !0),
              t("div", {
                class: c(["pl-kpi", k(at).net_profit >= 0 ? "c-emerald" : "c-pink"])
              }, [
                s[231] || (s[231] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📈"),
                  t("span", { class: "pl-kpi-label" }, "Net Profit")
                ], -1)),
                t("div", {
                  class: c(["pl-kpi-val", k(at).net_profit >= 0 ? "green" : "red"])
                }, a(k(S)(k(at).net_profit)), 3),
                t("div", {
                  class: c(["pl-kpi-trend", ga(Oo.value)])
                }, a(fa(Oo.value)), 3)
              ], 2)
            ]),
            Dt.value.length ? (l(), o("div", Ri, [
              t("div", Oi, [
                s[232] || (s[232] = C('<div class="pl-dash-title" data-v-94f2f87b><span class="pl-dash-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="10" width="4" height="10" rx="1" data-v-94f2f87b></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-94f2f87b></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-94f2f87b></rect></svg></span><div data-v-94f2f87b><div class="pl-dash-h" style="font-size:14px;" data-v-94f2f87b>Monthly Trend</div><div class="pl-dash-sub" data-v-94f2f87b>Income vs Expense over the selected period</div></div></div>', 1)),
                t("div", Pi, [
                  t("button", {
                    class: c({ active: Us.value === "monthly" }),
                    onClick: s[10] || (s[10] = (e) => Us.value = "monthly")
                  }, "Monthly", 2),
                  t("button", {
                    class: c({ active: Us.value === "quarterly" }),
                    onClick: s[11] || (s[11] = (e) => Us.value = "quarterly")
                  }, "Quarterly", 2),
                  t("button", {
                    class: c({ active: Us.value === "yearly" }),
                    onClick: s[12] || (s[12] = (e) => Us.value = "yearly")
                  }, "Yearly", 2)
                ])
              ]),
              t("div", Ii, [
                t("div", Vi, [
                  t("div", Ni, [
                    (l(!0), o(u, null, m(on.value, (e) => (l(), o("span", { key: e }, "KES " + a(p(e)), 1))), 128))
                  ]),
                  t("div", Ei, [
                    (l(!0), o(u, null, m(Dt.value, (e) => (l(), o("div", {
                      key: e.month,
                      class: "pl-trend-col"
                    }, [
                      t("div", Bi, [
                        t("div", {
                          class: "pl-trend-bar income",
                          style: Bt({ height: Do(e.income) + "px" }),
                          title: "Income: KES " + p(e.income)
                        }, null, 12, qi),
                        t("div", {
                          class: "pl-trend-bar expense",
                          style: Bt({ height: Do(e.expense) + "px" }),
                          title: "Expense: KES " + p(e.expense)
                        }, null, 12, Ai)
                      ]),
                      t("div", $i, a(e.month.slice(5)), 1)
                    ]))), 128))
                  ])
                ]),
                t("div", Li, [
                  s[233] || (s[233] = t("div", { class: "pl-insights-title" }, "💡 Insights", -1)),
                  (l(!0), o(u, null, m(ln.value, (e, g) => (l(), o("div", {
                    key: g,
                    class: "pl-insight-item"
                  }, [
                    t("span", {
                      class: c(["pl-insight-icon", e.tone])
                    }, a(e.icon), 3),
                    t("div", null, [
                      t("div", Qi, a(e.title), 1),
                      t("div", Fi, a(e.desc), 1)
                    ])
                  ]))), 128))
                ])
              ]),
              s[234] || (s[234] = t("div", { class: "pl-trend-legend" }, [
                t("span", null, [
                  t("span", { class: "dot income" }),
                  ot("Income")
                ]),
                t("span", null, [
                  t("span", { class: "dot expense" }),
                  ot("Expense")
                ])
              ], -1))
            ])) : b("", !0)
          ], 64)) : (l(), o("div", Hi, "Run the report to see results."))
        ])) : b("", !0),
        f.value === "bs" ? (l(), o("div", zi, [
          t("div", Wi, [
            s[236] || (s[236] = C('<div class="bs-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><path d="M12 2 3 6v2h18V6z" data-v-94f2f87b></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-94f2f87b></path><path d="M3 20h18" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Balance Sheet</div><div class="bs-page-head-sub" data-v-94f2f87b>What the business owns and owes</div></div>', 2)),
            t("div", Ui, [
              t("div", Ki, "As of " + a(P(y.value)), 1),
              t("div", Gi, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[13] || (s[13] = (e) => et("exportBsCSV")),
                  disabled: !k(pt)
                }, [...s[235] || (s[235] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Yi),
                w.value === "exportBsCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[14] || (s[14] = (e) => w.value = "")
                  }),
                  t("div", Ji, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[15] || (s[15] = (e) => {
                        w.value = "", So();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[16] || (s[16] = (e) => {
                        w.value = "", Y(So);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          k(hl) ? (l(), o("div", Xi)) : k(pt) ? (l(), o(u, { key: 1 }, [
            t("div", Zi, [
              t("div", td, [
                s[238] || (s[238] = C('<div class="bs-kpi-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><ellipse cx="12" cy="5" rx="8" ry="3" data-v-94f2f87b></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-94f2f87b></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-94f2f87b></path></svg></div>', 1)),
                t("div", sd, [
                  s[237] || (s[237] = t("div", { class: "bs-kpi-label" }, "Total Assets", -1)),
                  t("div", ed, a(k(S)(k(pt).total_assets)), 1)
                ])
              ]),
              t("div", ad, [
                s[240] || (s[240] = t("div", { class: "bs-kpi-icon" }, [
                  t("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("rect", {
                      x: "2",
                      y: "7",
                      width: "20",
                      height: "13",
                      rx: "2"
                    }),
                    t("path", { d: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                  ])
                ], -1)),
                t("div", od, [
                  s[239] || (s[239] = t("div", { class: "bs-kpi-label" }, "Total Liabilities", -1)),
                  t("div", ld, a(k(S)(k(pt).total_liabilities)), 1)
                ])
              ]),
              t("div", nd, [
                s[242] || (s[242] = C('<div class="bs-kpi-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="12" width="4" height="9" data-v-94f2f87b></rect><rect x="10" y="7" width="4" height="14" data-v-94f2f87b></rect><rect x="17" y="3" width="4" height="18" data-v-94f2f87b></rect></svg></div>', 1)),
                t("div", id, [
                  s[241] || (s[241] = t("div", { class: "bs-kpi-label" }, "Total Equity", -1)),
                  t("div", dd, a(k(S)(k(pt).total_equity)), 1)
                ])
              ])
            ]),
            t("div", {
              class: c(["bs-sum-status", ba.value ? "bs-ok" : "bs-bad"])
            }, [
              t("span", rd, a(ba.value ? "✓" : "✕"), 1),
              t("div", ud, [
                t("div", cd, a(ba.value ? "Assets = Liabilities + Equity" : "Balance sheet out of balance"), 1),
                t("div", md, a(k(S)(k(pt).total_assets)) + " = " + a(k(S)(k(pt).total_liabilities)) + " + " + a(k(S)(k(pt).total_equity)), 1)
              ])
            ], 2),
            t("div", vd, [
              (l(!0), o(u, null, m(jo.value, (e) => (l(), o("div", {
                key: e.key,
                class: c(["bs-acc-group", e.cls])
              }, [
                t("div", {
                  class: "bs-acc-head",
                  onClick: (g) => an(e.key)
                }, [
                  t("div", {
                    class: "bs-acc-icon",
                    innerHTML: e.icon
                  }, null, 8, pd),
                  t("div", yd, [
                    t("div", bd, a(e.label), 1),
                    t("div", hd, a(e.desc), 1)
                  ]),
                  t("div", gd, a(k(S)(e.total)), 1),
                  t("div", {
                    class: c(["bs-acc-chevron", { open: je.value[e.key] }])
                  }, [...s[243] || (s[243] = [
                    t("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      t("polyline", { points: "18 15 12 9 6 15" })
                    ], -1)
                  ])], 2)
                ], 8, _d),
                je.value[e.key] ? (l(), o("div", fd, [
                  (l(!0), o(u, null, m(e.items, (g) => (l(), o("div", {
                    key: g.label,
                    class: "bs-acc-item"
                  }, [
                    t("div", {
                      class: "bs-acc-item-icon",
                      innerHTML: g.icon
                    }, null, 8, kd),
                    t("div", wd, [
                      t("div", xd, a(g.label), 1),
                      g.desc ? (l(), o("div", Cd, a(g.desc), 1)) : b("", !0)
                    ]),
                    t("div", Sd, a(k(S)(g.value)), 1),
                    s[244] || (s[244] = t("div", { class: "bs-acc-item-caret" }, [
                      t("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        t("polyline", { points: "9 18 15 12 9 6" })
                      ])
                    ], -1))
                  ]))), 128))
                ])) : b("", !0)
              ], 2))), 128))
            ])
          ], 64)) : (l(), o("div", jd, "Run the report to see results."))
        ])) : b("", !0),
        f.value === "cf" ? (l(), o("div", Md, [
          t("div", Dd, [
            s[246] || (s[246] = C('<div class="bs-page-head-icon cf-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><path d="M3 3v18h18" data-v-94f2f87b></path><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Cash Flow Statement</div><div class="bs-page-head-sub" data-v-94f2f87b>Track the movement of cash in and out of your business</div></div>', 2)),
            t("div", Td, [
              t("div", Rd, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Od, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[17] || (s[17] = (e) => et("exportCfCSV")),
                  disabled: !k(J)
                }, [...s[245] || (s[245] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Pd),
                w.value === "exportCfCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[18] || (s[18] = (e) => w.value = "")
                  }),
                  t("div", Id, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[19] || (s[19] = (e) => {
                        w.value = "", La();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[20] || (s[20] = (e) => {
                        w.value = "", Y(La);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          k(fl) ? (l(), o("div", Vd)) : k(J) ? (l(), o("div", Nd, [
            t("div", Ed, [
              t("div", Bd, [
                s[247] || (s[247] = C('<div class="cf-acc-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><circle cx="12" cy="12" r="3" data-v-94f2f87b></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" data-v-94f2f87b></path></svg></div><div class="cf-acc-text" data-v-94f2f87b><div class="cf-acc-label" data-v-94f2f87b>Operating Activities</div><div class="cf-acc-desc" data-v-94f2f87b>P&amp;L + working capital changes</div></div>', 2)),
                t("div", {
                  class: c(["cf-acc-amount", k(J).operating >= 0 ? "green" : "red"])
                }, a(k(S)(k(J).operating)), 3)
              ]),
              t("div", qd, [
                s[248] || (s[248] = C('<div class="cf-acc-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><ellipse cx="12" cy="5" rx="8" ry="3" data-v-94f2f87b></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-94f2f87b></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-94f2f87b></path></svg></div><div class="cf-acc-text" data-v-94f2f87b><div class="cf-acc-label" data-v-94f2f87b>Investing Activities</div><div class="cf-acc-desc" data-v-94f2f87b>Asset purchases and sales</div></div>', 2)),
                t("div", {
                  class: c(["cf-acc-amount", k(J).investing >= 0 ? "green" : "red"])
                }, a(k(S)(k(J).investing)), 3)
              ]),
              t("div", Ad, [
                s[249] || (s[249] = C('<div class="cf-acc-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><path d="M12 2 3 6v2h18V6z" data-v-94f2f87b></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-94f2f87b></path><path d="M3 20h18" data-v-94f2f87b></path></svg></div><div class="cf-acc-text" data-v-94f2f87b><div class="cf-acc-label" data-v-94f2f87b>Financing Activities</div><div class="cf-acc-desc" data-v-94f2f87b>Equity, loans and debt</div></div>', 2)),
                t("div", {
                  class: c(["cf-acc-amount", k(J).financing >= 0 ? "green" : "red"])
                }, a(k(S)(k(J).financing)), 3)
              ]),
              t("div", $d, [
                s[251] || (s[251] = C('<div class="cf-acc-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="12" width="4" height="9" data-v-94f2f87b></rect><rect x="10" y="7" width="4" height="14" data-v-94f2f87b></rect><rect x="17" y="3" width="4" height="18" data-v-94f2f87b></rect></svg></div>', 1)),
                t("div", Ld, [
                  s[250] || (s[250] = t("div", { class: "cf-acc-label" }, "Net Change in Cash", -1)),
                  t("div", Qd, a(k(J).net_change >= 0 ? "Increase" : "Decrease") + " in cash during this period", 1)
                ]),
                t("div", {
                  class: c(["cf-acc-amount", k(J).net_change >= 0 ? "green" : "red"])
                }, a(k(S)(k(J).net_change)), 3)
              ]),
              k(J).opening_cash != null ? (l(), o(u, { key: 0 }, [
                t("div", Fd, [
                  s[252] || (s[252] = C('<div class="cf-flow-icon cf-flow-icon-open" data-v-94f2f87b><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><line x1="5" y1="12" x2="19" y2="12" data-v-94f2f87b></line><polyline points="12 5 19 12 12 19" data-v-94f2f87b></polyline></svg></div><div class="cf-acc-text" data-v-94f2f87b><div class="cf-acc-label" style="font-size:13px;" data-v-94f2f87b>Opening Cash &amp; Bank</div><div class="cf-acc-desc" data-v-94f2f87b>Balance at the beginning of the period</div></div>', 2)),
                  t("div", {
                    class: c(["cf-acc-amount", k(J).opening_cash >= 0 ? "green" : "red"])
                  }, a(k(S)(k(J).opening_cash)), 3)
                ]),
                t("div", Hd, [
                  s[253] || (s[253] = C('<div class="cf-flow-icon cf-flow-icon-close" data-v-94f2f87b><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><line x1="19" y1="12" x2="5" y2="12" data-v-94f2f87b></line><polyline points="12 5 5 12 12 19" data-v-94f2f87b></polyline></svg></div><div class="cf-acc-text" data-v-94f2f87b><div class="cf-acc-label" style="font-size:13px;" data-v-94f2f87b>Closing Cash &amp; Bank</div><div class="cf-acc-desc" data-v-94f2f87b>Balance at the end of the period</div></div>', 2)),
                  t("div", {
                    class: c(["cf-acc-amount", k(J).closing_cash >= 0 ? "green" : "red"])
                  }, a(k(S)(k(J).closing_cash)), 3)
                ])
              ], 64)) : b("", !0)
            ]),
            t("div", zd, [
              t("div", Wd, [
                s[255] || (s[255] = t("div", { class: "cf-trend-box-head" }, [
                  t("div", null, [
                    t("div", { class: "cf-trend-box-title" }, "Cash Flow Trend"),
                    t("div", { class: "cf-trend-box-sub" }, "Monthly cash flow movement")
                  ]),
                  t("div", { class: "cf-trend-period" }, "Monthly")
                ], -1)),
                te.value.length ? (l(), o("div", Ud, [
                  s[254] || (s[254] = t("div", { class: "cf-trend-baseline" }, null, -1)),
                  (l(!0), o(u, null, m(te.value, (e) => (l(), o("div", {
                    key: e.month,
                    class: "cf-trend-col"
                  }, [
                    t("div", {
                      class: "cf-trend-bar operating",
                      style: Bt(Ae(e.operating)),
                      title: "Operating: " + k(S)(e.operating)
                    }, null, 12, Kd),
                    t("div", {
                      class: "cf-trend-bar investing",
                      style: Bt(Ae(e.investing)),
                      title: "Investing: " + k(S)(e.investing)
                    }, null, 12, Gd),
                    t("div", {
                      class: "cf-trend-bar financing",
                      style: Bt(Ae(e.financing)),
                      title: "Financing: " + k(S)(e.financing)
                    }, null, 12, Yd),
                    t("div", Jd, a(e.month), 1)
                  ]))), 128))
                ])) : (l(), o("div", Xd, "No monthly data for this range.")),
                s[256] || (s[256] = t("div", { class: "cf-trend-legend" }, [
                  t("span", null, [
                    t("span", {
                      class: "dot",
                      style: { background: "#10b981" }
                    }),
                    ot("Operating")
                  ]),
                  t("span", null, [
                    t("span", {
                      class: "dot",
                      style: { background: "#2563eb" }
                    }),
                    ot("Investing")
                  ]),
                  t("span", null, [
                    t("span", {
                      class: "dot",
                      style: { background: "#7c3aed" }
                    }),
                    ot("Financing")
                  ])
                ], -1))
              ]),
              t("div", Zd, [
                s[258] || (s[258] = t("div", { class: "cf-summary-icon" }, "i", -1)),
                t("div", null, [
                  s[257] || (s[257] = t("div", { class: "cf-summary-title" }, "Summary", -1)),
                  t("div", tr, [
                    ot(" Cash " + a(k(J).net_change >= 0 ? "increased" : "decreased") + " by ", 1),
                    t("span", {
                      class: c(k(J).net_change >= 0 ? "green" : "red"),
                      style: { "font-weight": "700" }
                    }, a(k(S)(Math.abs(k(J).net_change))), 3),
                    ot(" during this period, from " + a(k(S)(k(J).opening_cash)) + " to " + a(k(S)(k(J).closing_cash)) + ". ", 1)
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", sr, "Run the report to see results."))
        ])) : b("", !0),
        f.value === "gst" ? (l(), o("div", er, [
          t("div", ar, [
            s[260] || (s[260] = C('<div class="bs-page-head-icon gst-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-94f2f87b></path><polyline points="14 2 14 8 20 8" data-v-94f2f87b></polyline></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>GST Summary</div><div class="bs-page-head-sub" data-v-94f2f87b>Overview of GST collected during the selected period</div></div>', 2)),
            t("div", or, [
              t("div", lr, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", nr, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[21] || (s[21] = (e) => et("exportGstCSV")),
                  disabled: !((n = k(ds)) != null && n.length)
                }, [...s[259] || (s[259] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, ir),
                w.value === "exportGstCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[22] || (s[22] = (e) => w.value = "")
                  }),
                  t("div", dr, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[23] || (s[23] = (e) => {
                        w.value = "", za();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[24] || (s[24] = (e) => {
                        w.value = "", Y(za);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          k(wl) ? (l(), o("div", rr)) : (r = k(ds)) != null && r.length ? (l(), o("div", ur, [
            (l(!0), o(u, null, m(Vl.value, (e) => (l(), o("div", {
              key: e.tax_type,
              class: c(["gst-card", e.cls])
            }, [
              t("div", cr, [
                s[261] || (s[261] = C('<div class="gst-card-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><ellipse cx="12" cy="5" rx="8" ry="3" data-v-94f2f87b></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-94f2f87b></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" data-v-94f2f87b></path></svg></div>', 1)),
                t("div", null, [
                  t("div", mr, a(e.tax_type), 1),
                  t("div", vr, a(e.desc), 1)
                ])
              ]),
              t("div", _r, [
                t("div", null, [
                  s[262] || (s[262] = t("div", { class: "gst-stat-label" }, "Invoice Count", -1)),
                  t("div", pr, a(e.invoice_count), 1)
                ]),
                t("div", null, [
                  s[263] || (s[263] = t("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  t("div", yr, a(k(S)(e.total_tax)), 1)
                ])
              ])
            ], 2))), 128)),
            t("div", br, [
              s[266] || (s[266] = C('<div class="gst-card-head" data-v-94f2f87b><div class="gst-card-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-94f2f87b></path><polyline points="14 2 14 8 20 8" data-v-94f2f87b></polyline><line x1="9" y1="17" x2="15" y2="17" data-v-94f2f87b></line><line x1="9" y1="13" x2="12" y2="13" data-v-94f2f87b></line></svg></div><div data-v-94f2f87b><div class="gst-card-title" data-v-94f2f87b>Total Summary</div><div class="gst-card-desc" data-v-94f2f87b>Combined GST for the selected period</div></div></div>', 1)),
              t("div", hr, [
                t("div", null, [
                  s[264] || (s[264] = t("div", { class: "gst-stat-label" }, "Total Invoices", -1)),
                  t("div", gr, a(Fa.value), 1)
                ]),
                t("div", null, [
                  s[265] || (s[265] = t("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  t("div", fr, a(k(S)(Ha.value)), 1)
                ])
              ])
            ])
          ])) : (l(), o("div", kr, "Run the report to see results."))
        ])) : b("", !0),
        f.value === "ar" ? (l(), o("div", wr, [
          t("div", xr, [
            s[268] || (s[268] = C('<div class="bs-page-head-icon ar-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="12" cy="12" r="10" data-v-94f2f87b></circle><polyline points="12 6 12 12 16 14" data-v-94f2f87b></polyline></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Accounts Receivable Aging</div><div class="bs-page-head-sub" data-v-94f2f87b>Outstanding customer balances, grouped by how overdue they are</div></div>', 2)),
            t("div", Cr, [
              t("div", Sr, "As of " + a(P(y.value)), 1),
              t("div", jr, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[25] || (s[25] = (e) => us.value = !us.value),
                  disabled: !rt.value.length
                }, [...s[267] || (s[267] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Mr),
                us.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[26] || (s[26] = (e) => us.value = !1)
                  }),
                  t("div", Dr, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[27] || (s[27] = (e) => {
                        us.value = !1, ne();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[28] || (s[28] = (e) => {
                        us.value = !1, Y(ne);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[29] || (s[29] = (e) => {
                        us.value = !1, Tl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          $e.value ? (l(), o("div", Tr)) : rt.value.length ? (l(), o("div", Rr, [
            t("div", Or, [
              s[270] || (s[270] = C('<div class="iws-total-icon iws-total-icon-neg" data-v-94f2f87b><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="12" cy="12" r="10" data-v-94f2f87b></circle><polyline points="12 6 12 12 16 14" data-v-94f2f87b></polyline></svg></div><div class="iws-total-label" data-v-94f2f87b>Total Outstanding</div>', 2)),
              t("div", {
                class: "iws-total-value iws-total-value-neg",
                style: Bt(G(d(jt.value.total)))
              }, a(d(jt.value.total)), 5),
              t("div", Pr, a(rt.value.length) + " " + a(rt.value.length === 1 ? "Customer" : "Customers"), 1),
              jt.value.days_90_plus ? (l(), o("div", Ir, [
                s[269] || (s[269] = t("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                t("span", Vr, a(d(jt.value.days_90_plus)), 1)
              ])) : b("", !0)
            ]),
            t("div", Nr, [
              t("table", Er, [
                t("thead", null, [
                  t("tr", null, [
                    s[278] || (s[278] = t("th", { class: "iws-idx" }, "#", -1)),
                    t("th", {
                      onClick: s[30] || (s[30] = (e) => cs("customer")),
                      class: "iws-sortable"
                    }, [
                      s[271] || (s[271] = t("span", null, "Customer", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("customer")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[31] || (s[31] = (e) => cs("current")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[272] || (s[272] = t("span", null, "Current (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("current")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[32] || (s[32] = (e) => cs("days_1_30")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[273] || (s[273] = t("span", null, "1–30 Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("days_1_30")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[33] || (s[33] = (e) => cs("days_31_60")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[274] || (s[274] = t("span", null, "31–60 Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("days_31_60")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[34] || (s[34] = (e) => cs("days_61_90")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[275] || (s[275] = t("span", null, "61–90 Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("days_61_90")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[35] || (s[35] = (e) => cs("days_90_plus")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[276] || (s[276] = t("span", null, "90+ Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("days_90_plus")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[36] || (s[36] = (e) => cs("total")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[277] || (s[277] = t("span", null, "Total (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ms("total")])
                      }, "⇅", 2)
                    ]),
                    s[279] || (s[279] = t("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m(Ba.value, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", Br, a(g + 1), 1),
                    t("td", qr, a(e.customer_name || e.customer), 1),
                    t("td", Ar, a(e.current > 0 ? H(e.current) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_1_30 > 0 ? "text-warn" : ""])
                    }, a(e.days_1_30 > 0 ? H(e.days_1_30) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_31_60 > 0 ? "text-danger" : ""])
                    }, a(e.days_31_60 > 0 ? H(e.days_31_60) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_61_90 > 0 ? "text-danger" : ""])
                    }, a(e.days_61_90 > 0 ? H(e.days_61_90) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_90_plus > 0 ? "text-danger fw-700" : ""])
                    }, a(e.days_90_plus > 0 ? H(e.days_90_plus) : "—"), 3),
                    t("td", $r, a(d(e.total)), 1),
                    t("td", Lr, [
                      t("div", Qr, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Qs.value = Qs.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Fr),
                        Qs.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[37] || (s[37] = (Q) => Qs.value = null)
                          }),
                          t("div", Hr, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qs.value = null, qa(e, !0);
                              }
                            }, "Copy row", 8, zr),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qs.value = null, Aa(e, !0);
                              }
                            }, "Download row as CSV", 8, Wr)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Ur, [
                    s[280] || (s[280] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[281] || (s[281] = t("td", { class: "fw-700" }, "Total", -1)),
                    t("td", Kr, a(d(jt.value.current)), 1),
                    t("td", Gr, a(d(jt.value.days_1_30)), 1),
                    t("td", Yr, a(d(jt.value.days_31_60)), 1),
                    t("td", Jr, a(d(jt.value.days_61_90)), 1),
                    t("td", Xr, a(d(jt.value.days_90_plus)), 1),
                    t("td", Zr, a(d(jt.value.total)), 1),
                    s[282] || (s[282] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", tu, a(Wa.value ? "No outstanding receivables as of this date." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "ap" ? (l(), o("div", su, [
          t("div", eu, [
            s[284] || (s[284] = C('<div class="bs-page-head-icon ap-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="12" cy="12" r="10" data-v-94f2f87b></circle><polyline points="12 6 12 12 16 14" data-v-94f2f87b></polyline></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Accounts Payable Aging</div><div class="bs-page-head-sub" data-v-94f2f87b>Outstanding vendor balances, grouped by how overdue they are</div></div>', 2)),
            t("div", au, [
              t("div", ou, "As of " + a(P(y.value)), 1),
              t("div", lu, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[38] || (s[38] = (e) => vs.value = !vs.value),
                  disabled: !ut.value.length
                }, [...s[283] || (s[283] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, nu),
                vs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[39] || (s[39] = (e) => vs.value = !1)
                  }),
                  t("div", iu, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[40] || (s[40] = (e) => {
                        vs.value = !1, ne();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[41] || (s[41] = (e) => {
                        vs.value = !1, Y(ne);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[42] || (s[42] = (e) => {
                        vs.value = !1, Rl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Le.value ? (l(), o("div", du)) : ut.value.length ? (l(), o("div", ru, [
            t("div", uu, [
              s[286] || (s[286] = C('<div class="iws-total-icon iws-total-icon-neg" data-v-94f2f87b><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="12" cy="12" r="10" data-v-94f2f87b></circle><polyline points="12 6 12 12 16 14" data-v-94f2f87b></polyline></svg></div><div class="iws-total-label" data-v-94f2f87b>Total Outstanding</div>', 2)),
              t("div", {
                class: "iws-total-value iws-total-value-neg",
                style: Bt(G(d(Mt.value.total)))
              }, a(d(Mt.value.total)), 5),
              t("div", cu, a(ut.value.length) + " " + a(ut.value.length === 1 ? "Vendor" : "Vendors"), 1),
              Mt.value.days_90_plus ? (l(), o("div", mu, [
                s[285] || (s[285] = t("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                t("span", vu, a(d(Mt.value.days_90_plus)), 1)
              ])) : b("", !0)
            ]),
            t("div", _u, [
              t("table", pu, [
                t("thead", null, [
                  t("tr", null, [
                    s[294] || (s[294] = t("th", { class: "iws-idx" }, "#", -1)),
                    t("th", {
                      onClick: s[43] || (s[43] = (e) => _s("supplier")),
                      class: "iws-sortable"
                    }, [
                      s[287] || (s[287] = t("span", null, "Vendor", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("supplier")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[44] || (s[44] = (e) => _s("current")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[288] || (s[288] = t("span", null, "Current (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("current")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[45] || (s[45] = (e) => _s("days_1_30")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[289] || (s[289] = t("span", null, "1–30 Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("days_1_30")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[46] || (s[46] = (e) => _s("days_31_60")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[290] || (s[290] = t("span", null, "31–60 Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("days_31_60")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[47] || (s[47] = (e) => _s("days_61_90")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[291] || (s[291] = t("span", null, "61–90 Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("days_61_90")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[48] || (s[48] = (e) => _s("days_90_plus")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[292] || (s[292] = t("span", null, "90+ Days (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("days_90_plus")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[49] || (s[49] = (e) => _s("total")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[293] || (s[293] = t("span", null, "Total (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ps("total")])
                      }, "⇅", 2)
                    ]),
                    s[295] || (s[295] = t("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m($a.value, (e, g) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", yu, a(g + 1), 1),
                    t("td", bu, a(e.supplier_name || e.supplier), 1),
                    t("td", hu, a(e.current > 0 ? H(e.current) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_1_30 > 0 ? "text-warn" : ""])
                    }, a(e.days_1_30 > 0 ? H(e.days_1_30) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_31_60 > 0 ? "text-danger" : ""])
                    }, a(e.days_31_60 > 0 ? H(e.days_31_60) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_61_90 > 0 ? "text-danger" : ""])
                    }, a(e.days_61_90 > 0 ? H(e.days_61_90) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.days_90_plus > 0 ? "text-danger fw-700" : ""])
                    }, a(e.days_90_plus > 0 ? H(e.days_90_plus) : "—"), 3),
                    t("td", gu, a(d(e.total)), 1),
                    t("td", fu, [
                      t("div", ku, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Fs.value = Fs.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, wu),
                        Fs.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[50] || (s[50] = (Q) => Fs.value = null)
                          }),
                          t("div", xu, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Fs.value = null, qa(e, !1);
                              }
                            }, "Copy row", 8, Cu),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Fs.value = null, Aa(e, !1);
                              }
                            }, "Download row as CSV", 8, Su)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", ju, [
                    s[296] || (s[296] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[297] || (s[297] = t("td", { class: "fw-700" }, "Total", -1)),
                    t("td", Mu, a(d(Mt.value.current)), 1),
                    t("td", Du, a(d(Mt.value.days_1_30)), 1),
                    t("td", Tu, a(d(Mt.value.days_31_60)), 1),
                    t("td", Ru, a(d(Mt.value.days_61_90)), 1),
                    t("td", Ou, a(d(Mt.value.days_90_plus)), 1),
                    t("td", Pu, a(d(Mt.value.total)), 1),
                    s[298] || (s[298] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Iu, a(Ua.value ? "No outstanding payables as of this date." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "items" ? (l(), o("div", Vu, [
          t("div", Nu, [
            s[300] || (s[300] = C('<div class="bs-page-head-icon iws-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="9" cy="21" r="1" data-v-94f2f87b></circle><circle cx="20" cy="21" r="1" data-v-94f2f87b></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Item-wise Sales</div><div class="bs-page-head-sub" data-v-94f2f87b>Sales summary by item for the selected period</div></div>', 2)),
            t("div", Eu, [
              t("div", Bu, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", qu, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[51] || (s[51] = (e) => Ps.value = !Ps.value),
                  disabled: !At.value.length
                }, [...s[299] || (s[299] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Au),
                Ps.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[52] || (s[52] = (e) => Ps.value = !1)
                  }),
                  t("div", $u, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[53] || (s[53] = (e) => {
                        Ps.value = !1, Ca();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[54] || (s[54] = (e) => {
                        Ps.value = !1, Y(Ca);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[55] || (s[55] = (e) => {
                        Ps.value = !1, yn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Qe.value ? (l(), o("div", Lu)) : At.value.length ? (l(), o("div", Qu, [
            t("div", Fu, [
              s[301] || (s[301] = C('<div class="iws-total-icon" data-v-94f2f87b><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><line x1="6" y1="20" x2="6" y2="13" data-v-94f2f87b></line><line x1="12" y1="20" x2="12" y2="4" data-v-94f2f87b></line><line x1="18" y1="20" x2="18" y2="9" data-v-94f2f87b></line></svg></div><div class="iws-total-label" data-v-94f2f87b>Total Sales</div>', 2)),
              t("div", {
                class: "iws-total-value",
                style: Bt(G(d(Ht.value.amount)))
              }, a(d(Ht.value.amount)), 5),
              t("div", Hu, a(At.value.length) + " " + a(At.value.length === 1 ? "Item" : "Items") + " • " + a(Ht.value.invoices) + " " + a(Ht.value.invoices === 1 ? "Invoice" : "Invoices"), 1)
            ]),
            t("div", zu, [
              t("table", Wu, [
                t("thead", null, [
                  t("tr", null, [
                    s[309] || (s[309] = t("th", { class: "iws-idx" }, "#", -1)),
                    t("th", {
                      onClick: s[56] || (s[56] = (e) => Is("item")),
                      class: "iws-sortable"
                    }, [
                      s[302] || (s[302] = t("span", null, "Item", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("item")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[57] || (s[57] = (e) => Is("uom")),
                      class: "iws-sortable"
                    }, [
                      s[303] || (s[303] = t("span", null, "UOM", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("uom")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[58] || (s[58] = (e) => Is("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[304] || (s[304] = t("span", null, "Invoices", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[59] || (s[59] = (e) => Is("qty_sold")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[305] || (s[305] = t("span", null, "Qty Sold", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("qty_sold")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[60] || (s[60] = (e) => Is("avg_rate")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[306] || (s[306] = t("span", null, "Avg Rate (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("avg_rate")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[61] || (s[61] = (e) => Is("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[307] || (s[307] = t("span", null, "Discount (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("total_discount")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[62] || (s[62] = (e) => Is("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[308] || (s[308] = t("span", null, "Total Amount (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Vs("total_amount")])
                      }, "⇅", 2)
                    ]),
                    s[310] || (s[310] = t("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m(xa.value, (e, g) => (l(), o("tr", {
                    key: (e.item_code || e.item_name) + "|" + (e.uom || "") + "|" + g
                  }, [
                    t("td", Uu, a(g + 1), 1),
                    t("td", Ku, a(e.item_name || e.item_code), 1),
                    t("td", null, [
                      t("span", Gu, a(e.uom || "—"), 1)
                    ]),
                    t("td", Yu, a(e.invoice_count), 1),
                    t("td", Ju, a(p(e.qty_sold)), 1),
                    t("td", Xu, a(H(e.avg_rate)), 1),
                    t("td", Zu, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    t("td", tc, a(d(e.total_amount)), 1),
                    t("td", sc, [
                      t("div", ec, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Js.value = Js.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, ac),
                        Js.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[63] || (s[63] = (Q) => Js.value = null)
                          }),
                          t("div", oc, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Js.value = null, bn(e);
                              }
                            }, "Copy row", 8, lc),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Js.value = null, hn(e);
                              }
                            }, "Download row as CSV", 8, nc)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", ic, [
                    s[311] || (s[311] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[312] || (s[312] = t("td", { class: "fw-700" }, "Total", -1)),
                    s[313] || (s[313] = t("td", null, null, -1)),
                    t("td", dc, a(Ht.value.invoices), 1),
                    t("td", rc, a(p(Ht.value.qty)), 1),
                    s[314] || (s[314] = t("td", null, null, -1)),
                    t("td", uc, a(d(Ht.value.discount)), 1),
                    t("td", cc, a(d(Ht.value.amount)), 1),
                    s[315] || (s[315] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", mc, a(Ka.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "customers" ? (l(), o("div", vc, [
          t("div", _c, [
            s[317] || (s[317] = C('<div class="bs-page-head-icon cws-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-94f2f87b></path><circle cx="9" cy="7" r="4" data-v-94f2f87b></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-94f2f87b></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Customer-wise Sales</div><div class="bs-page-head-sub" data-v-94f2f87b>Sales summary by customer for the selected period</div></div>', 2)),
            t("div", pc, [
              t("div", yc, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", bc, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[64] || (s[64] = (e) => Ns.value = !Ns.value),
                  disabled: !$t.value.length
                }, [...s[316] || (s[316] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, hc),
                Ns.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[65] || (s[65] = (e) => Ns.value = !1)
                  }),
                  t("div", gc, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[66] || (s[66] = (e) => {
                        Ns.value = !1, ja();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[67] || (s[67] = (e) => {
                        Ns.value = !1, Y(ja);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[68] || (s[68] = (e) => {
                        Ns.value = !1, gn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Fe.value ? (l(), o("div", fc)) : $t.value.length ? (l(), o("div", kc, [
            t("div", wc, [
              s[319] || (s[319] = C('<div class="iws-total-icon" data-v-94f2f87b><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><line x1="6" y1="20" x2="6" y2="13" data-v-94f2f87b></line><line x1="12" y1="20" x2="12" y2="4" data-v-94f2f87b></line><line x1="18" y1="20" x2="18" y2="9" data-v-94f2f87b></line></svg></div><div class="iws-total-label" data-v-94f2f87b>Total Sales</div>', 2)),
              t("div", {
                class: "iws-total-value",
                style: Bt(G(d(_t.value.amount)))
              }, a(d(_t.value.amount)), 5),
              t("div", xc, a($t.value.length) + " " + a($t.value.length === 1 ? "Customer" : "Customers") + " • " + a(_t.value.invoices) + " " + a(_t.value.invoices === 1 ? "Invoice" : "Invoices"), 1),
              _t.value.outstanding ? (l(), o("div", Cc, [
                s[318] || (s[318] = t("span", { class: "iws-total-sub-label" }, "Outstanding", -1)),
                t("span", Sc, a(d(_t.value.outstanding)), 1)
              ])) : b("", !0)
            ]),
            t("div", jc, [
              t("table", Mc, [
                t("thead", null, [
                  t("tr", null, [
                    s[328] || (s[328] = t("th", { class: "iws-idx" }, "#", -1)),
                    t("th", {
                      onClick: s[69] || (s[69] = (e) => os("customer")),
                      class: "iws-sortable"
                    }, [
                      s[320] || (s[320] = t("span", null, "Customer", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("customer")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[70] || (s[70] = (e) => os("invoice_count")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[321] || (s[321] = t("span", null, "Invoices", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("invoice_count")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[71] || (s[71] = (e) => os("net_total")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[322] || (s[322] = t("span", null, "Net Total (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("net_total")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[72] || (s[72] = (e) => os("total_discount")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[323] || (s[323] = t("span", null, "Discount (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("total_discount")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[73] || (s[73] = (e) => os("total_tax")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[324] || (s[324] = t("span", null, "Tax (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("total_tax")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[74] || (s[74] = (e) => os("avg_invoice_value")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[325] || (s[325] = t("span", null, "Avg Invoice (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("avg_invoice_value")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[75] || (s[75] = (e) => os("outstanding_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[326] || (s[326] = t("span", null, "Outstanding (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("outstanding_amount")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[76] || (s[76] = (e) => os("total_amount")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[327] || (s[327] = t("span", null, "Total Amount (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", ls("total_amount")])
                      }, "⇅", 2)
                    ]),
                    s[329] || (s[329] = t("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m(Sa.value, (e, g) => (l(), o("tr", {
                    key: (e.customer || e.customer_name) + "|" + g
                  }, [
                    t("td", Dc, a(g + 1), 1),
                    t("td", Tc, a(e.customer_name || e.customer), 1),
                    t("td", Rc, a(e.invoice_count), 1),
                    t("td", Oc, a(H(e.net_total)), 1),
                    t("td", Pc, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    t("td", Ic, a(H(e.total_tax)), 1),
                    t("td", Vc, a(H(e.avg_invoice_value)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.outstanding_amount > 0 ? "red" : ""])
                    }, a(e.outstanding_amount ? d(e.outstanding_amount) : "—"), 3),
                    t("td", Nc, a(d(e.total_amount)), 1),
                    t("td", Ec, [
                      t("div", Bc, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Xs.value = Xs.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, qc),
                        Xs.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[77] || (s[77] = (Q) => Xs.value = null)
                          }),
                          t("div", Ac, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Xs.value = null, fn(e);
                              }
                            }, "Copy row", 8, $c),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Xs.value = null, kn(e);
                              }
                            }, "Download row as CSV", 8, Lc)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Qc, [
                    s[330] || (s[330] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[331] || (s[331] = t("td", { class: "fw-700" }, "Total", -1)),
                    t("td", Fc, a(_t.value.invoices), 1),
                    t("td", Hc, a(d(_t.value.net)), 1),
                    t("td", zc, a(d(_t.value.discount)), 1),
                    t("td", Wc, a(d(_t.value.tax)), 1),
                    s[332] || (s[332] = t("td", null, null, -1)),
                    t("td", Uc, a(d(_t.value.outstanding)), 1),
                    t("td", Kc, a(d(_t.value.amount)), 1),
                    s[333] || (s[333] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Gc, a(Ga.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "profit" ? (l(), o("div", Yc, [
          t("div", Jc, [
            s[335] || (s[335] = C('<div class="bs-page-head-icon pw-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><line x1="12" y1="1" x2="12" y2="23" data-v-94f2f87b></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Profit-wise Report (by Item)</div><div class="bs-page-head-sub" data-v-94f2f87b>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost.</div></div>', 2)),
            t("div", Xc, [
              t("div", Zc, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", tm, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[78] || (s[78] = (e) => Cs.value = !Cs.value),
                  disabled: !ct.value.length
                }, [...s[334] || (s[334] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, sm),
                Cs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[79] || (s[79] = (e) => Cs.value = !1)
                  }),
                  t("div", em, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[80] || (s[80] = (e) => {
                        Cs.value = !1, Ma();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[81] || (s[81] = (e) => {
                        Cs.value = !1, Y(Ma);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[82] || (s[82] = (e) => {
                        Cs.value = !1, nn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          He.value ? (l(), o("div", am)) : ct.value.length ? (l(), o(u, { key: 1 }, [
            t("div", om, [
              t("div", {
                class: c(["iws-total-panel", xs.value >= 0 ? "" : "iws-total-panel-neg"])
              }, [
                t("div", {
                  class: c(["iws-total-icon", xs.value >= 0 ? "" : "iws-total-icon-neg"])
                }, [...s[336] || (s[336] = [
                  t("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    t("line", {
                      x1: "12",
                      y1: "1",
                      x2: "12",
                      y2: "23"
                    }),
                    t("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })
                  ], -1)
                ])], 2),
                s[338] || (s[338] = t("div", { class: "iws-total-label" }, "Total Profit", -1)),
                t("div", {
                  class: c(["iws-total-value", xs.value >= 0 ? "" : "iws-total-value-neg"]),
                  style: Bt(G(d(xs.value)))
                }, a(d(xs.value)), 7),
                t("div", lm, [
                  ot(a(ct.value.length) + " " + a(ct.value.length === 1 ? "Item" : "Items") + " • ", 1),
                  t("span", {
                    class: c(Me.value >= 0 ? "green" : "red")
                  }, a(Me.value.toFixed(1)) + "% margin", 3)
                ]),
                Ks.value ? (l(), o("div", nm, [
                  s[337] || (s[337] = t("span", { class: "iws-total-sub-label" }, "No cost data", -1)),
                  t("span", im, a(Ks.value) + " item" + a(Ks.value > 1 ? "s" : ""), 1)
                ])) : b("", !0)
              ], 2),
              t("div", dm, [
                t("table", rm, [
                  t("thead", null, [
                    t("tr", null, [
                      s[346] || (s[346] = t("th", { class: "iws-idx" }, "#", -1)),
                      t("th", {
                        onClick: s[83] || (s[83] = (e) => Ss("item")),
                        class: "iws-sortable"
                      }, [
                        s[339] || (s[339] = t("span", null, "Item", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("item")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[84] || (s[84] = (e) => Ss("qty_sold")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[340] || (s[340] = t("span", null, "Qty Sold", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("qty_sold")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[85] || (s[85] = (e) => Ss("revenue")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[341] || (s[341] = t("span", null, "Revenue (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("revenue")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[86] || (s[86] = (e) => Ss("cost_rate")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[342] || (s[342] = t("span", null, "Cost Rate (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("cost_rate")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[87] || (s[87] = (e) => Ss("total_cost")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[343] || (s[343] = t("span", null, "Total Cost (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("total_cost")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[88] || (s[88] = (e) => Ss("profit")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[344] || (s[344] = t("span", null, "Profit (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("profit")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[89] || (s[89] = (e) => Ss("margin_pct")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[345] || (s[345] = t("span", null, "Margin %", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", js("margin_pct")])
                        }, "⇅", 2)
                      ]),
                      s[347] || (s[347] = t("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  t("tbody", null, [
                    (l(!0), o(u, null, m(ka.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + "|" + g
                    }, [
                      t("td", um, a(g + 1), 1),
                      t("td", cm, [
                        ot(a(e.item_name || e.item_code) + " ", 1),
                        e.cost_rate ? b("", !0) : (l(), o("span", mm, "no cost data"))
                      ]),
                      t("td", vm, a(p(e.qty_sold)), 1),
                      t("td", _m, a(H(e.revenue)), 1),
                      t("td", pm, a(e.cost_rate ? H(e.cost_rate) : "—"), 1),
                      t("td", ym, a(e.total_cost ? H(e.total_cost) : "—"), 1),
                      t("td", {
                        class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                      t("td", {
                        class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3),
                      t("td", bm, [
                        t("div", hm, [
                          t("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Gs.value = Gs.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, gm),
                          Gs.value === g ? (l(), o(u, { key: 0 }, [
                            t("div", {
                              class: "iws-menu-backdrop",
                              onClick: s[90] || (s[90] = (Q) => Gs.value = null)
                            }),
                            t("div", fm, [
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gs.value = null, dn(e);
                                }
                              }, "Copy row", 8, km),
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gs.value = null, rn(e);
                                }
                              }, "Download row as CSV", 8, wm)
                            ])
                          ], 64)) : b("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", xm, [
                      s[348] || (s[348] = t("td", { class: "iws-idx" }, [
                        t("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      s[349] || (s[349] = t("td", { class: "fw-700" }, "Total", -1)),
                      t("td", Cm, a(p(ct.value.reduce((e, g) => e + Number(g.qty_sold || 0), 0))), 1),
                      t("td", Sm, a(d(ct.value.reduce((e, g) => e + Number(g.revenue || 0), 0))), 1),
                      s[350] || (s[350] = t("td", null, null, -1)),
                      t("td", jm, a(d(ct.value.filter((e) => e.cost_rate).reduce((e, g) => e + Number(g.total_cost || 0), 0))), 1),
                      t("td", {
                        class: c(["ta-r fw-700", xs.value >= 0 ? "green" : "red"])
                      }, a(d(xs.value)), 3),
                      t("td", {
                        class: c(["ta-r fw-700", Me.value >= 0 ? "green" : "red"])
                      }, a(Me.value.toFixed(1)) + "%", 3),
                      s[351] || (s[351] = t("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ]),
            Ks.value ? (l(), o("div", Mm, a(Ks.value) + " item" + a(Ks.value > 1 ? "s" : "") + ' excluded from the profit/margin totals above — no valuation or standard buying rate found (see "no cost data" tag). ', 1)) : b("", !0)
          ], 64)) : (l(), o("div", Dm, a(Ya.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "invoice_profit" ? (l(), o("div", Tm, [
          t("div", Rm, [
            s[353] || (s[353] = C('<div class="bs-page-head-icon ip-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-94f2f87b></path><polyline points="14 2 14 8 20 8" data-v-94f2f87b></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-94f2f87b></line><line x1="9" y1="11" x2="13" y2="11" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Invoice Profitability</div><div class="bs-page-head-sub" data-v-94f2f87b>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost. Tick rows to see profit for a single invoice or any combination of selected invoices.</div></div>', 2)),
            t("div", Om, [
              t("div", Pm, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Im, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[91] || (s[91] = (e) => Ds.value = !Ds.value),
                  disabled: !dt.value.length
                }, [...s[352] || (s[352] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Vm),
                Ds.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[92] || (s[92] = (e) => Ds.value = !1)
                  }),
                  t("div", Nm, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[93] || (s[93] = (e) => {
                        Ds.value = !1, Da();
                      })
                    }, "Download CSV" + a(Tt.value.size ? " (selected)" : ""), 1),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[94] || (s[94] = (e) => {
                        Ds.value = !1, Y(Da);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[95] || (s[95] = (e) => {
                        Ds.value = !1, mn();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          ze.value ? (l(), o("div", Em)) : dt.value.length ? (l(), o("div", Bm, [
            t("div", {
              class: c(["iws-total-panel", it.value.profit >= 0 ? "" : "iws-total-panel-neg"])
            }, [
              t("div", {
                class: c(["iws-total-icon", it.value.profit >= 0 ? "" : "iws-total-icon-neg"])
              }, [...s[354] || (s[354] = [
                C('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-94f2f87b></path><polyline points="14 2 14 8 20 8" data-v-94f2f87b></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-94f2f87b></line><line x1="9" y1="11" x2="13" y2="11" data-v-94f2f87b></line></svg>', 1)
              ])], 2),
              s[355] || (s[355] = t("div", { class: "iws-total-label" }, "Total Profit", -1)),
              t("div", {
                class: c(["iws-total-value", it.value.profit >= 0 ? "" : "iws-total-value-neg"]),
                style: Bt(G(d(it.value.profit)))
              }, a(d(it.value.profit)), 7),
              t("div", qm, [
                ot(a(dt.value.length) + " " + a(dt.value.length === 1 ? "Invoice" : "Invoices") + " • ", 1),
                t("span", {
                  class: c(it.value.revenue ? it.value.profit >= 0 ? "green" : "red" : "")
                }, a(it.value.revenue ? (it.value.profit / it.value.revenue * 100).toFixed(1) : "0.0") + "% margin ", 3)
              ]),
              Tt.value.size ? (l(), o("div", Am, [
                t("span", $m, a(le.value.count) + " selected", 1),
                t("span", {
                  class: c(["iws-total-sub-value", le.value.profit >= 0 ? "green" : "red"]),
                  style: { color: "inherit" }
                }, a(d(le.value.profit)), 3),
                t("div", Lm, " Revenue " + a(d(le.value.revenue)) + " • Cost " + a(d(le.value.total_cost)), 1)
              ])) : b("", !0)
            ], 2),
            t("div", Qm, [
              t("table", Fm, [
                t("thead", null, [
                  t("tr", null, [
                    t("th", Hm, [
                      t("input", {
                        type: "checkbox",
                        checked: Po.value,
                        onChange: cn
                      }, null, 40, zm)
                    ]),
                    t("th", {
                      onClick: s[96] || (s[96] = (e) => Rs("invoice")),
                      class: "iws-sortable"
                    }, [
                      s[356] || (s[356] = t("span", null, "Invoice", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("invoice")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[97] || (s[97] = (e) => Rs("posting_date")),
                      class: "iws-sortable"
                    }, [
                      s[357] || (s[357] = t("span", null, "Date", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("posting_date")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[98] || (s[98] = (e) => Rs("customer")),
                      class: "iws-sortable"
                    }, [
                      s[358] || (s[358] = t("span", null, "Customer", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("customer")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[99] || (s[99] = (e) => Rs("revenue")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[359] || (s[359] = t("span", null, "Revenue (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("revenue")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[100] || (s[100] = (e) => Rs("total_cost")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[360] || (s[360] = t("span", null, "Est. Cost (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("total_cost")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[101] || (s[101] = (e) => Rs("profit")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[361] || (s[361] = t("span", null, "Profit (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("profit")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[102] || (s[102] = (e) => Rs("margin_pct")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[362] || (s[362] = t("span", null, "Margin %", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Os("margin_pct")])
                      }, "⇅", 2)
                    ]),
                    s[363] || (s[363] = t("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m(wa.value, (e) => (l(), o("tr", {
                    key: e.invoice,
                    class: c({ "row-selected": Tt.value.has(e.invoice) })
                  }, [
                    t("td", Wm, [
                      t("input", {
                        type: "checkbox",
                        checked: Tt.value.has(e.invoice),
                        onChange: (g) => un(e.invoice)
                      }, null, 40, Um)
                    ]),
                    t("td", Km, [
                      t("a", {
                        href: "#",
                        class: "inv-detail-link",
                        onClick: On((g) => Xa(e.invoice), ["prevent"])
                      }, a(e.invoice), 9, Gm),
                      e.no_cost_lines ? (l(), o("span", Ym, "partial cost data")) : b("", !0)
                    ]),
                    t("td", Jm, a(e.posting_date), 1),
                    t("td", Xm, a(e.customer_name || e.customer), 1),
                    t("td", Zm, a(d(e.revenue)), 1),
                    t("td", tv, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(Number(e.margin_pct || 0).toFixed(1)) + "%", 3),
                    t("td", sv, [
                      t("div", ev, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (g) => Ts.value = Ts.value === e.invoice ? null : e.invoice,
                          title: "Row actions"
                        }, "⋮", 8, av),
                        Ts.value === e.invoice ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[103] || (s[103] = (g) => Ts.value = null)
                          }),
                          t("div", ov, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Ts.value = null, Xa(e.invoice);
                              }
                            }, "View P&L", 8, lv),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Ts.value = null, vn(e);
                              }
                            }, "Copy row", 8, nv),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Ts.value = null, _n(e);
                              }
                            }, "Download row as CSV", 8, iv)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ], 2))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", dv, [
                    s[364] || (s[364] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[365] || (s[365] = t("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "Total", -1)),
                    t("td", rv, a(d(it.value.revenue)), 1),
                    t("td", uv, a(d(it.value.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r fw-700", it.value.profit >= 0 ? "green" : "red"])
                    }, a(d(it.value.profit)), 3),
                    t("td", {
                      class: c(["ta-r fw-700", it.value.profit >= 0 ? "green" : "red"])
                    }, a(it.value.revenue ? (it.value.profit / it.value.revenue * 100).toFixed(1) : "0.0") + "%", 3),
                    s[366] || (s[366] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", cv, a(Ja.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        Mn(Tn, {
          show: We.value,
          width: "720px",
          title: nt.value ? `Profit & Loss — ${nt.value.invoice.name}` : "Profit & Loss",
          onClose: s[104] || (s[104] = (e) => We.value = !1)
        }, {
          default: Dn(() => [
            Ue.value ? (l(), o("div", mv)) : nt.value ? (l(), o(u, { key: 1 }, [
              t("div", vv, [
                t("span", null, [
                  s[367] || (s[367] = ot("Date: ", -1)),
                  t("strong", _v, a(nt.value.invoice.posting_date), 1)
                ]),
                t("span", null, [
                  s[368] || (s[368] = ot("Customer: ", -1)),
                  t("strong", pv, a(nt.value.invoice.customer_name || nt.value.invoice.customer), 1)
                ]),
                t("span", null, [
                  s[369] || (s[369] = ot("Status: ", -1)),
                  t("strong", yv, a(nt.value.invoice.status), 1)
                ])
              ]),
              nt.value.totals.no_cost_lines ? (l(), o("div", bv, a(nt.value.totals.no_cost_lines) + " item" + a(nt.value.totals.no_cost_lines > 1 ? "s" : "") + ' below have no valuation or standard buying rate — their cost is shown as "—" and excluded from the totals. ', 1)) : b("", !0),
              t("table", hv, [
                s[372] || (s[372] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Rate"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost Rate"),
                    t("th", { class: "ta-r" }, "Total Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(nt.value.items, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", gv, a(p(e.qty)), 1),
                    t("td", fv, a(d(e.rate)), 1),
                    t("td", kv, a(d(e.revenue)), 1),
                    t("td", wv, a(e.cost_rate ? d(e.cost_rate) : "—"), 1),
                    t("td", xv, a(e.cost_rate ? d(e.total_cost) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Cv, [
                    s[370] || (s[370] = t("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "TOTAL", -1)),
                    t("td", Sv, a(d(nt.value.totals.revenue)), 1),
                    s[371] || (s[371] = t("td", null, null, -1)),
                    t("td", jv, a(d(nt.value.totals.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r fw-700", nt.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(d(nt.value.totals.profit)), 3),
                    t("td", {
                      class: c(["ta-r fw-700", nt.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(Number(nt.value.totals.margin_pct || 0).toFixed(1)) + "%", 3)
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Mv, "Couldn't load this invoice."))
          ]),
          _: 1
        }, 8, ["show", "title"]),
        f.value === "tb" ? (l(), o("div", Dv, [
          t("div", Tv, [
            s[374] || (s[374] = C('<div class="bs-page-head-icon tb-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><line x1="18" y1="20" x2="18" y2="10" data-v-94f2f87b></line><line x1="12" y1="20" x2="12" y2="4" data-v-94f2f87b></line><line x1="6" y1="20" x2="6" y2="14" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Trial Balance</div><div class="bs-page-head-sub" data-v-94f2f87b>Account-wise opening, movement and closing balances for the selected period</div></div>', 2)),
            t("div", Rv, [
              t("div", Ov, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Pv, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[105] || (s[105] = (e) => rs.value = !rs.value),
                  disabled: !((_ = k(Yt)) != null && _.length)
                }, [...s[373] || (s[373] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Iv),
                rs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[106] || (s[106] = (e) => rs.value = !1)
                  }),
                  t("div", Vv, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[107] || (s[107] = (e) => {
                        rs.value = !1, Ea();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[108] || (s[108] = (e) => {
                        rs.value = !1, Y(Ea);
                      })
                    }, "Download Excel"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[109] || (s[109] = (e) => {
                        rs.value = !1, jl();
                      })
                    }, "Copy to clipboard")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          k(Cl) ? (l(), o("div", Nv)) : (j = k(Yt)) != null && j.length ? (l(), o(u, { key: 1 }, [
            t("div", Ev, [
              t("div", Bv, [
                s[376] || (s[376] = t("div", { class: "bs-kpi-icon" }, [
                  t("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("line", {
                      x1: "12",
                      y1: "19",
                      x2: "12",
                      y2: "5"
                    }),
                    t("polyline", { points: "5 12 12 5 19 12" })
                  ])
                ], -1)),
                t("div", qv, [
                  s[375] || (s[375] = t("div", { class: "bs-kpi-label" }, "Total Debit", -1)),
                  t("div", Av, a(d(mt.value.debit)), 1)
                ])
              ]),
              t("div", $v, [
                s[378] || (s[378] = t("div", { class: "bs-kpi-icon" }, [
                  t("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("line", {
                      x1: "12",
                      y1: "5",
                      x2: "12",
                      y2: "19"
                    }),
                    t("polyline", { points: "19 12 12 19 5 12" })
                  ])
                ], -1)),
                t("div", Lv, [
                  s[377] || (s[377] = t("div", { class: "bs-kpi-label" }, "Total Credit", -1)),
                  t("div", Qv, a(d(mt.value.credit)), 1)
                ])
              ])
            ]),
            t("div", {
              class: c(["bs-sum-status", pe.value ? "bs-ok" : "bs-bad"])
            }, [
              t("span", Fv, a(pe.value ? "✓" : "✕"), 1),
              t("div", Hv, [
                t("div", zv, a(pe.value ? "Total Debit = Total Credit" : "Trial balance out of balance"), 1),
                t("div", Wv, [
                  ot(a(d(mt.value.debit)) + " vs " + a(d(mt.value.credit)), 1),
                  pe.value ? b("", !0) : (l(), o(u, { key: 0 }, [
                    ot(" (diff " + a(d(mt.value.debit - mt.value.credit)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            t("div", Uv, [
              t("table", Kv, [
                t("thead", null, [
                  t("tr", null, [
                    s[385] || (s[385] = t("th", { class: "iws-idx" }, "#", -1)),
                    t("th", {
                      onClick: s[110] || (s[110] = (e) => $s("account")),
                      class: "iws-sortable"
                    }, [
                      s[379] || (s[379] = t("span", null, "Account", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Ls("account")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[111] || (s[111] = (e) => $s("account_type")),
                      class: "iws-sortable"
                    }, [
                      s[380] || (s[380] = t("span", null, "Type", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Ls("account_type")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[112] || (s[112] = (e) => $s("opening")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[381] || (s[381] = t("span", null, "Opening (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Ls("opening")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[113] || (s[113] = (e) => $s("debit")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[382] || (s[382] = t("span", null, "Debit (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Ls("debit")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[114] || (s[114] = (e) => $s("credit")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[383] || (s[383] = t("span", null, "Credit (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Ls("credit")])
                      }, "⇅", 2)
                    ]),
                    t("th", {
                      onClick: s[115] || (s[115] = (e) => $s("closing")),
                      class: "iws-sortable ta-r"
                    }, [
                      s[384] || (s[384] = t("span", null, "Closing (KES)", -1)),
                      t("span", {
                        class: c(["iws-sort-ind", Ls("closing")])
                      }, "⇅", 2)
                    ]),
                    s[386] || (s[386] = t("th", { class: "iws-kebab-col" }, null, -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), o(u, null, m(qe.value, (e, g) => (l(), o("tr", {
                    key: e.account
                  }, [
                    t("td", Gv, a(g + 1), 1),
                    t("td", Yv, a(e.account), 1),
                    t("td", null, [
                      t("span", Jv, a(e.account_type), 1)
                    ]),
                    t("td", {
                      class: c(["ta-r mono-sm", e.opening < 0 ? "red" : ""])
                    }, a(H(e.opening || 0)), 3),
                    t("td", Xv, a(e.debit ? H(e.debit) : "—"), 1),
                    t("td", Zv, a(e.credit ? H(e.credit) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-700", e.closing < 0 ? "red" : "green"])
                    }, a(d(e.closing || 0)), 3),
                    t("td", t1, [
                      t("div", s1, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => As.value = As.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, e1),
                        As.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[116] || (s[116] = (Q) => As.value = null)
                          }),
                          t("div", a1, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                As.value = null, Ml(e);
                              }
                            }, "Copy row", 8, o1),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                As.value = null, Dl(e);
                              }
                            }, "Download row as CSV", 8, l1)
                          ])
                        ], 64)) : b("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", n1, [
                    s[387] || (s[387] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[388] || (s[388] = t("td", { class: "fw-700" }, "Total", -1)),
                    s[389] || (s[389] = t("td", null, null, -1)),
                    t("td", i1, a(d(mt.value.opening)), 1),
                    t("td", d1, a(d(mt.value.debit)), 1),
                    t("td", r1, a(d(mt.value.credit)), 1),
                    t("td", u1, a(d(mt.value.closing)), 1),
                    s[390] || (s[390] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ], 64)) : (l(), o("div", c1, "Run the report to see results."))
        ])) : b("", !0),
        f.value === "stockgl" ? (l(), o("div", m1, [
          t("div", v1, [
            s[392] || (s[392] = C('<div class="bs-page-head-icon sgl-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-94f2f87b></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-94f2f87b></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Stock Ledger vs Inventory GL</div><div class="bs-page-head-sub" data-v-94f2f87b>Compares the operational Stock Ledger (Bin valuation) against the financial General Ledger (Inventory Asset account balance) — this check is the tripwire that catches drift immediately instead of at year-end audit.</div></div>', 2)),
            t("div", _1, [
              t("div", p1, "As of " + a(P(y.value)), 1),
              t("div", y1, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[117] || (s[117] = (e) => ys.value = !ys.value),
                  disabled: !tt.value
                }, [...s[391] || (s[391] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, b1),
                ys.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[118] || (s[118] = (e) => ys.value = !1)
                  }),
                  t("div", h1, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[119] || (s[119] = (e) => {
                        ys.value = !1, Bl();
                      })
                    }, "Download account summary (CSV)"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[120] || (s[120] = (e) => {
                        ys.value = !1, Ll();
                      })
                    }, "Download item-level detail (CSV)"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[121] || (s[121] = (e) => {
                        ys.value = !1, Al();
                      })
                    }, "Copy item-level detail")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Ke.value ? (l(), o("div", g1)) : tt.value ? (l(), o(u, { key: 1 }, [
            t("div", f1, [
              t("div", k1, [
                s[394] || (s[394] = t("div", { class: "bs-kpi-icon" }, [
                  t("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
                  ])
                ], -1)),
                t("div", w1, [
                  s[393] || (s[393] = t("div", { class: "bs-kpi-label" }, "Bin Stock Value", -1)),
                  t("div", x1, a(d(tt.value.total_bin_value)), 1)
                ])
              ]),
              t("div", C1, [
                s[396] || (s[396] = t("div", { class: "bs-kpi-icon" }, [
                  t("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("rect", {
                      x: "2",
                      y: "3",
                      width: "20",
                      height: "18",
                      rx: "2"
                    }),
                    t("line", {
                      x1: "8",
                      y1: "3",
                      x2: "8",
                      y2: "21"
                    })
                  ])
                ], -1)),
                t("div", S1, [
                  s[395] || (s[395] = t("div", { class: "bs-kpi-label" }, "Inventory GL Balance", -1)),
                  t("div", j1, a(d(tt.value.total_gl_balance)), 1)
                ])
              ]),
              t("div", {
                class: c(["bs-kpi", tt.value.is_reconciled ? "bs-kpi-assets" : "bs-kpi-liabilities"])
              }, [
                s[398] || (s[398] = t("div", { class: "bs-kpi-icon" }, [
                  t("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("line", {
                      x1: "12",
                      y1: "1",
                      x2: "12",
                      y2: "23"
                    }),
                    t("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })
                  ])
                ], -1)),
                t("div", M1, [
                  s[397] || (s[397] = t("div", { class: "bs-kpi-label" }, "Difference", -1)),
                  t("div", {
                    class: c(["bs-kpi-amount", tt.value.is_reconciled ? "" : "text-danger"])
                  }, a(d(tt.value.total_difference)), 3)
                ])
              ], 2)
            ]),
            t("div", {
              class: c(["bs-sum-status", tt.value.is_reconciled ? "bs-ok" : "bs-bad"])
            }, [
              t("span", D1, a(tt.value.is_reconciled ? "✓" : "✕"), 1),
              t("div", T1, [
                t("div", R1, a(tt.value.is_reconciled ? "Bin Stock Value = Inventory GL Balance" : "Stock and GL are out of sync"), 1),
                t("div", O1, [
                  ot(a(d(tt.value.total_bin_value)) + " vs " + a(d(tt.value.total_gl_balance)), 1),
                  tt.value.is_reconciled ? b("", !0) : (l(), o(u, { key: 0 }, [
                    ot(" (diff " + a(d(tt.value.total_difference)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            tt.value.grir_account ? (l(), o("div", P1, [
              s[399] || (s[399] = t("strong", null, "Stock Received (GR/IR):", -1)),
              s[400] || (s[400] = ot()),
              t("span", I1, a(d(tt.value.grir_balance)), 1),
              s[401] || (s[401] = t("span", null, " — goods received, awaiting bill. Nonzero is normal.", -1))
            ])) : b("", !0),
            (M = tt.value.accounts) != null && M.length ? (l(), o(u, { key: 1 }, [
              s[409] || (s[409] = t("div", { class: "iws-section-label" }, "By Inventory Account", -1)),
              t("div", V1, [
                t("table", N1, [
                  t("thead", null, [
                    t("tr", null, [
                      s[406] || (s[406] = t("th", { class: "iws-idx" }, "#", -1)),
                      t("th", {
                        onClick: s[122] || (s[122] = (e) => fe("account")),
                        class: "iws-sortable"
                      }, [
                        s[402] || (s[402] = t("span", null, "Inventory Account", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ke("account")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[123] || (s[123] = (e) => fe("bin_stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[403] || (s[403] = t("span", null, "Bin Stock Value (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ke("bin_stock_value")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[124] || (s[124] = (e) => fe("gl_balance")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[404] || (s[404] = t("span", null, "GL Balance (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ke("gl_balance")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[125] || (s[125] = (e) => fe("difference")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[405] || (s[405] = t("span", null, "Difference (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ke("difference")])
                        }, "⇅", 2)
                      ]),
                      s[407] || (s[407] = t("th", null, "Status", -1)),
                      s[408] || (s[408] = t("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  t("tbody", null, [
                    (l(!0), o(u, null, m(to.value, (e, g) => (l(), o("tr", {
                      key: e.account
                    }, [
                      t("td", E1, a(g + 1), 1),
                      t("td", B1, a(e.account), 1),
                      t("td", q1, a(H(e.bin_stock_value)), 1),
                      t("td", A1, a(H(e.gl_balance)), 1),
                      t("td", {
                        class: c(["ta-r mono-sm", e.is_reconciled ? "" : "text-danger fw-700"])
                      }, a(H(e.difference)), 3),
                      t("td", null, [
                        t("span", {
                          class: c(["badge", e.is_reconciled ? "badge-blue" : "badge-danger"])
                        }, a(e.is_reconciled ? "OK" : "DRIFT"), 3)
                      ]),
                      t("td", $1, [
                        t("div", L1, [
                          t("button", {
                            class: "iws-kebab",
                            onClick: (Q) => se.value = se.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, Q1),
                          se.value === g ? (l(), o(u, { key: 0 }, [
                            t("div", {
                              class: "iws-menu-backdrop",
                              onClick: s[126] || (s[126] = (Q) => se.value = null)
                            }),
                            t("div", F1, [
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  se.value = null, El(e);
                                }
                              }, "Copy row", 8, H1)
                            ])
                          ], 64)) : b("", !0)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ])
            ], 64)) : b("", !0),
            (N = tt.value.items) != null && N.length ? (l(), o(u, { key: 2 }, [
              s[421] || (s[421] = t("div", { class: "iws-section-label" }, "Item-level Bin Detail", -1)),
              t("div", z1, [
                t("table", W1, [
                  t("thead", null, [
                    t("tr", null, [
                      s[415] || (s[415] = t("th", { class: "iws-idx" }, "#", -1)),
                      t("th", {
                        onClick: s[127] || (s[127] = (e) => ee("item")),
                        class: "iws-sortable"
                      }, [
                        s[410] || (s[410] = t("span", null, "Item", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ae("item")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[128] || (s[128] = (e) => ee("warehouse")),
                        class: "iws-sortable"
                      }, [
                        s[411] || (s[411] = t("span", null, "Warehouse", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ae("warehouse")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[129] || (s[129] = (e) => ee("actual_qty")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[412] || (s[412] = t("span", null, "Qty", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ae("actual_qty")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[130] || (s[130] = (e) => ee("valuation_rate")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[413] || (s[413] = t("span", null, "Valuation Rate (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ae("valuation_rate")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[131] || (s[131] = (e) => ee("stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[414] || (s[414] = t("span", null, "Stock Value (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", ae("stock_value")])
                        }, "⇅", 2)
                      ]),
                      s[416] || (s[416] = t("th", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ]),
                  t("tbody", null, [
                    (l(!0), o(u, null, m(Ge.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + e.warehouse
                    }, [
                      t("td", U1, a(g + 1), 1),
                      t("td", K1, a(e.item_name || e.item_code), 1),
                      t("td", null, [
                        t("span", G1, a(e.warehouse), 1)
                      ]),
                      t("td", Y1, a(p(e.actual_qty)), 1),
                      t("td", J1, a(H(e.valuation_rate)), 1),
                      t("td", X1, a(d(e.stock_value)), 1),
                      t("td", Z1, [
                        t("div", t_, [
                          t("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Hs.value = Hs.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, s_),
                          Hs.value === g ? (l(), o(u, { key: 0 }, [
                            t("div", {
                              class: "iws-menu-backdrop",
                              onClick: s[132] || (s[132] = (Q) => Hs.value = null)
                            }),
                            t("div", e_, [
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Hs.value = null, ql(e);
                                }
                              }, "Copy row", 8, a_),
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Hs.value = null, $l(e);
                                }
                              }, "Download row as CSV", 8, o_)
                            ])
                          ], 64)) : b("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", l_, [
                      s[417] || (s[417] = t("td", { class: "iws-idx" }, [
                        t("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      s[418] || (s[418] = t("td", {
                        colspan: "3",
                        class: "fw-700"
                      }, "Total", -1)),
                      s[419] || (s[419] = t("td", null, null, -1)),
                      t("td", n_, a(d(Ye.value)), 1),
                      s[420] || (s[420] = t("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", i_, a(Za.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "stockval" ? (l(), o("div", d_, [
          t("div", r_, [
            s[423] || (s[423] = C('<div class="bs-page-head-icon sv-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="3" y="3" width="18" height="18" rx="2" data-v-94f2f87b></rect><path d="M3 9h18" data-v-94f2f87b></path><path d="M9 21V9" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Stock Valuation Summary</div><div class="bs-page-head-sub" data-v-94f2f87b>Total stock value per warehouse, from current Bin valuation. Reflects live stock on hand — not a historical point-in-time snapshot, since stock quantities aren&#39;t tracked by date.</div></div>', 2)),
            t("div", u_, [
              t("div", c_, "As of " + a(P(y.value)), 1),
              t("div", m_, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[133] || (s[133] = (e) => et("exportStockValCSV")),
                  disabled: !((Es = (Nt = wt.value) == null ? void 0 : Nt.by_warehouse) != null && Es.length)
                }, [...s[422] || (s[422] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, v_),
                w.value === "exportStockValCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[134] || (s[134] = (e) => w.value = "")
                  }),
                  t("div", __, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[135] || (s[135] = (e) => {
                        w.value = "", Io();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[136] || (s[136] = (e) => {
                        w.value = "", Y(Io);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          Je.value ? (l(), o("div", p_)) : wt.value ? (l(), o(u, { key: 1 }, [
            t("div", y_, [
              t("div", b_, [
                s[425] || (s[425] = C('<div class="bs-kpi-icon" data-v-94f2f87b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-94f2f87b><rect x="3" y="3" width="18" height="18" rx="2" data-v-94f2f87b></rect><path d="M3 9h18" data-v-94f2f87b></path><path d="M9 21V9" data-v-94f2f87b></path></svg></div>', 1)),
                t("div", h_, [
                  s[424] || (s[424] = t("div", { class: "bs-kpi-label" }, "Grand Total Stock Value", -1)),
                  t("div", g_, a(d(wt.value.grand_total)), 1)
                ])
              ])
            ]),
            (Xo = wt.value.by_warehouse) != null && Xo.length ? (l(), o(u, { key: 0 }, [
              s[430] || (s[430] = t("div", { class: "iws-section-label" }, "By Warehouse", -1)),
              t("div", f_, [
                t("table", k_, [
                  s[429] || (s[429] = t("thead", null, [
                    t("tr", null, [
                      t("th", { class: "iws-idx" }, "#"),
                      t("th", null, "Warehouse"),
                      t("th", { class: "ta-r" }, "Stock Value (KES)"),
                      t("th", { class: "ta-r" }, "% of Total")
                    ])
                  ], -1)),
                  t("tbody", null, [
                    (l(!0), o(u, null, m(wt.value.by_warehouse, (e, g) => (l(), o("tr", {
                      key: e.warehouse
                    }, [
                      t("td", w_, a(g + 1), 1),
                      t("td", x_, a(e.warehouse), 1),
                      t("td", C_, a(d(e.stock_value)), 1),
                      t("td", S_, a(wt.value.grand_total ? (e.stock_value / wt.value.grand_total * 100).toFixed(1) + "%" : "—"), 1)
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", j_, [
                      s[426] || (s[426] = t("td", { class: "iws-idx" }, [
                        t("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      s[427] || (s[427] = t("td", { class: "fw-700" }, "Total", -1)),
                      t("td", M_, a(d(wt.value.grand_total)), 1),
                      s[428] || (s[428] = t("td", { class: "ta-r fw-700" }, "100.0%", -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", D_, "No stock on hand in any warehouse."))
          ], 64)) : (l(), o("div", T_, a(ao.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "price_mrp" ? (l(), o("div", R_, [
          t("div", O_, [
            s[432] || (s[432] = C('<div class="bs-page-head-icon sv-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-94f2f87b></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Selling Price &amp; MRP</div><div class="bs-page-head-sub" data-v-94f2f87b>Item-wise selling price and MRP per warehouse, from the Item master. Where MRP is not set on an item, the selling price is shown as MRP.</div></div>', 2)),
            t("div", P_, [
              t("div", I_, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[137] || (s[137] = (e) => et("exportPriceMrpCSV")),
                  disabled: !Se.value.length
                }, [...s[431] || (s[431] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, V_),
                w.value === "exportPriceMrpCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[138] || (s[138] = (e) => w.value = "")
                  }),
                  t("div", N_, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[139] || (s[139] = (e) => {
                        w.value = "", Vo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[140] || (s[140] = (e) => {
                        w.value = "", Y(Vo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", E_, [
            Et(t("input", {
              type: "text",
              "onUpdate:modelValue": s[141] || (s[141] = (e) => Ze.value = e),
              class: "dr-input",
              placeholder: "Search item code or name",
              style: { "min-width": "220px" }
            }, null, 512), [
              [Gt, Ze.value]
            ]),
            Et(t("select", {
              "onUpdate:modelValue": s[142] || (s[142] = (e) => Ce.value = e),
              class: "dr-input"
            }, [
              s[433] || (s[433] = t("option", { value: "" }, "All warehouses", -1)),
              (l(!0), o(u, null, m(((Zo = oe.value) == null ? void 0 : Zo.warehouses) || [], (e) => (l(), o("option", {
                key: e,
                value: e
              }, a(e), 9, B_))), 128))
            ], 512), [
              [al, Ce.value]
            ])
          ]),
          Xe.value ? (l(), o("div", q_)) : oe.value && Se.value.length ? (l(), o("div", A_, [
            t("table", $_, [
              s[434] || (s[434] = t("thead", null, [
                t("tr", null, [
                  t("th", { class: "iws-idx" }, "#"),
                  t("th", null, "Item"),
                  t("th", null, "Warehouse"),
                  t("th", { class: "ta-r" }, "Stock Qty"),
                  t("th", { class: "ta-r" }, "Selling Price (KES)"),
                  t("th", { class: "ta-r" }, "MRP (KES)")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(Se.value, (e, g) => (l(), o("tr", {
                  key: e.item_code + "|" + e.warehouse
                }, [
                  t("td", L_, a(g + 1), 1),
                  t("td", Q_, [
                    ot(a(e.item_name || e.item_code), 1),
                    t("div", F_, a(e.item_code), 1)
                  ]),
                  t("td", null, a(e.warehouse || "—"), 1),
                  t("td", H_, a(e.qty) + " " + a(e.uom), 1),
                  t("td", z_, a(d(e.selling_price)), 1),
                  t("td", W_, a(d(e.mrp)), 1)
                ]))), 128))
              ])
            ])
          ])) : (l(), o("div", U_, a(oo.value ? "No items found." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "mis" ? (l(), o("div", K_, [
          t("div", G_, [
            s[436] || (s[436] = C('<div class="bs-page-head-icon mis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="3" y="4" width="18" height="18" rx="2" data-v-94f2f87b></rect><line x1="3" y1="10" x2="21" y2="10" data-v-94f2f87b></line><line x1="8" y1="2" x2="8" y2="6" data-v-94f2f87b></line><line x1="16" y1="2" x2="16" y2="6" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Daily Business MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Day-by-day snapshot of Sales, Collection, Purchase, Expenses, Dispatch, Production, Stock Inward/Outward and running Outstanding for the selected period.</div></div>', 2)),
            t("div", Y_, [
              t("div", J_, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", X_, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[143] || (s[143] = (e) => et("exportDailyMisCSV")),
                  disabled: !((sl = (tl = X.value) == null ? void 0 : tl.days) != null && sl.length)
                }, [...s[435] || (s[435] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Z_),
                w.value === "exportDailyMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[144] || (s[144] = (e) => w.value = "")
                  }),
                  t("div", tp, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[145] || (s[145] = (e) => {
                        w.value = "", No();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[146] || (s[146] = (e) => {
                        w.value = "", Y(No);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          ta.value ? (l(), o("div", sp)) : X.value ? (l(), o(u, { key: 1 }, [
            t("div", ep, [
              t("div", ap, [
                s[437] || (s[437] = t("span", { class: "bucket-label" }, "Daily Sales", -1)),
                t("span", op, a(d(X.value.totals.sales_amount)), 1)
              ]),
              t("div", lp, [
                s[438] || (s[438] = t("span", { class: "bucket-label" }, "Daily Collection", -1)),
                t("span", np, a(d(X.value.totals.collection_amount)), 1)
              ]),
              t("div", ip, [
                s[439] || (s[439] = t("span", { class: "bucket-label" }, "Daily Purchase", -1)),
                t("span", dp, a(d(X.value.totals.purchase_amount)), 1)
              ]),
              t("div", rp, [
                s[440] || (s[440] = t("span", { class: "bucket-label" }, "Daily Expenses", -1)),
                t("span", up, a(d(X.value.totals.expense_amount)), 1)
              ]),
              t("div", cp, [
                s[441] || (s[441] = t("span", { class: "bucket-label" }, "Daily Dispatch", -1)),
                t("span", mp, a(p(X.value.totals.dispatch_qty)) + " qty", 1)
              ]),
              t("div", vp, [
                s[442] || (s[442] = t("span", { class: "bucket-label" }, "Daily Production", -1)),
                t("span", _p, a(p(X.value.totals.production_qty)) + " qty", 1)
              ]),
              t("div", pp, [
                s[443] || (s[443] = t("span", { class: "bucket-label" }, "Stock Inward / Outward", -1)),
                t("span", yp, a(p(X.value.totals.stock_inward_qty)) + " / " + a(p(X.value.totals.stock_outward_qty)), 1)
              ]),
              t("div", bp, [
                s[444] || (s[444] = t("span", { class: "bucket-label" }, "Closing Outstanding", -1)),
                t("span", {
                  class: c(["mis-summary-val", X.value.totals.closing_outstanding >= 0 ? "" : "green"])
                }, a(d(X.value.totals.closing_outstanding)), 3)
              ])
            ]),
            (el = X.value.days) != null && el.length ? (l(), o(u, { key: 0 }, [
              s[447] || (s[447] = t("div", { class: "iws-section-label" }, "Day by Day", -1)),
              t("div", hp, [
                t("table", gp, [
                  s[446] || (s[446] = t("thead", null, [
                    t("tr", null, [
                      t("th", null, "Date"),
                      t("th", { class: "ta-r" }, "Sales"),
                      t("th", { class: "ta-r" }, "Collection"),
                      t("th", { class: "ta-r" }, "Purchase"),
                      t("th", { class: "ta-r" }, "Expenses"),
                      t("th", { class: "ta-r" }, "Dispatch Qty"),
                      t("th", { class: "ta-r" }, "Production Qty"),
                      t("th", { class: "ta-r" }, "Stock In"),
                      t("th", { class: "ta-r" }, "Stock Out"),
                      t("th", { class: "ta-r" }, "Outstanding")
                    ])
                  ], -1)),
                  t("tbody", null, [
                    (l(!0), o(u, null, m(X.value.days, (e) => (l(), o("tr", {
                      key: e.date
                    }, [
                      t("td", fp, a(e.date), 1),
                      t("td", kp, a(d(e.sales_amount)), 1),
                      t("td", wp, a(d(e.collection_amount)), 1),
                      t("td", xp, a(d(e.purchase_amount)), 1),
                      t("td", Cp, a(d(e.expense_amount)), 1),
                      t("td", Sp, a(p(e.dispatch_qty)), 1),
                      t("td", jp, a(p(e.production_qty)), 1),
                      t("td", Mp, a(p(e.stock_inward_qty)), 1),
                      t("td", Dp, a(p(e.stock_outward_qty)), 1),
                      t("td", Tp, a(d(e.outstanding)), 1)
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", Rp, [
                      s[445] || (s[445] = t("td", { class: "fw-700" }, "TOTAL", -1)),
                      t("td", Op, a(d(X.value.totals.sales_amount)), 1),
                      t("td", Pp, a(d(X.value.totals.collection_amount)), 1),
                      t("td", Ip, a(d(X.value.totals.purchase_amount)), 1),
                      t("td", Vp, a(d(X.value.totals.expense_amount)), 1),
                      t("td", Np, a(p(X.value.totals.dispatch_qty)), 1),
                      t("td", Ep, a(p(X.value.totals.production_qty)), 1),
                      t("td", Bp, a(p(X.value.totals.stock_inward_qty)), 1),
                      t("td", qp, a(p(X.value.totals.stock_outward_qty)), 1),
                      t("td", Ap, a(d(X.value.totals.closing_outstanding)), 1)
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", $p, "No activity in this period."))
          ], 64)) : (l(), o("div", Lp, a(lo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "sales_mis" ? (l(), o("div", Qp, [
          t("div", Fp, [
            s[449] || (s[449] = C('<div class="bs-page-head-icon smis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M3 3v18h18" data-v-94f2f87b></path><path d="M18 17V9" data-v-94f2f87b></path><path d="M13 17V5" data-v-94f2f87b></path><path d="M8 17v-3" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Sales MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Sales performance broken down by summary, target, product, customer, salesperson, branch, returns, discounts, pending orders and conversion.</div></div>', 2)),
            t("div", Hp, [
              t("div", zp, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Wp, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[147] || (s[147] = (e) => et("exportSalesMisCSV")),
                  disabled: !O.value
                }, [...s[448] || (s[448] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Up),
                w.value === "exportSalesMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[148] || (s[148] = (e) => w.value = "")
                  }),
                  t("div", Kp, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[149] || (s[149] = (e) => {
                        w.value = "", Eo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[150] || (s[150] = (e) => {
                        w.value = "", Y(Eo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", Gp, [
            (l(), o(u, null, m(Ql, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: yt.value === e.key }]),
              onClick: (g) => yt.value = e.key
            }, a(e.label), 11, Yp)), 64))
          ]),
          sa.value ? (l(), o("div", Jp)) : O.value ? (l(), o(u, { key: 1 }, [
            yt.value === "summary" ? (l(), o("div", Xp, [
              t("div", Zp, [
                s[450] || (s[450] = t("span", { class: "bucket-label" }, "Invoices", -1)),
                t("span", ty, a(p(O.value.summary.invoice_count)), 1)
              ]),
              t("div", sy, [
                s[451] || (s[451] = t("span", { class: "bucket-label" }, "Net Sales", -1)),
                t("span", ey, a(d(O.value.summary.net_sales)), 1)
              ]),
              t("div", ay, [
                s[452] || (s[452] = t("span", { class: "bucket-label" }, "Total Tax", -1)),
                t("span", oy, a(d(O.value.summary.total_tax)), 1)
              ]),
              t("div", ly, [
                s[453] || (s[453] = t("span", { class: "bucket-label" }, "Discount Given", -1)),
                t("span", ny, a(d(O.value.summary.header_discount)), 1)
              ]),
              t("div", iy, [
                s[454] || (s[454] = t("span", { class: "bucket-label" }, "Grand Total", -1)),
                t("span", dy, a(d(O.value.summary.grand_total)), 1)
              ]),
              t("div", ry, [
                s[455] || (s[455] = t("span", { class: "bucket-label" }, "Qty Sold", -1)),
                t("span", uy, a(p(O.value.summary.total_qty)), 1)
              ]),
              t("div", cy, [
                s[456] || (s[456] = t("span", { class: "bucket-label" }, "Avg Invoice Value", -1)),
                t("span", my, a(d(O.value.summary.avg_invoice_value)), 1)
              ])
            ])) : yt.value === "target" ? (l(), o(u, { key: 1 }, [
              t("div", vy, [
                s[457] || (s[457] = t("label", { class: "dr-label" }, "Sales Target (KES)", -1)),
                Et(t("input", {
                  type: "number",
                  "onUpdate:modelValue": s[151] || (s[151] = (e) => hs.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Gt,
                    hs.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                s[458] || (s[458] = t("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actuals for this period.", -1))
              ]),
              t("div", _y, [
                t("div", py, [
                  s[459] || (s[459] = t("span", { class: "bucket-label" }, "Target", -1)),
                  t("span", yy, a(d(hs.value)), 1)
                ]),
                t("div", by, [
                  s[460] || (s[460] = t("span", { class: "bucket-label" }, "Achieved", -1)),
                  t("span", hy, a(d(O.value.summary.grand_total)), 1)
                ]),
                t("div", gy, [
                  s[461] || (s[461] = t("span", { class: "bucket-label" }, "Achievement %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", io.value >= 100 ? "green" : "red"])
                  }, a(io.value.toFixed(1)) + "%", 3)
                ])
              ]),
              t("div", {
                class: c(["pl-row", O.value.summary.grand_total >= hs.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                s[462] || (s[462] = t("span", null, "Variance (Achieved − Target)", -1)),
                t("span", fy, a(k(S)(O.value.summary.grand_total - hs.value)), 1)
              ], 2)
            ], 64)) : yt.value === "product" ? (l(), o("table", ky, [
              s[463] || (s[463] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Item"),
                  t("th", null, "UOM"),
                  t("th", { class: "ta-r" }, "Invoices"),
                  t("th", { class: "ta-r" }, "Qty Sold"),
                  t("th", { class: "ta-r" }, "Discount"),
                  t("th", { class: "ta-r" }, "Amount")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(O.value.product_wise, (e) => (l(), o("tr", {
                  key: e.item_code
                }, [
                  t("td", null, a(e.item_name || e.item_code), 1),
                  t("td", null, a(e.uom || "—"), 1),
                  t("td", wy, a(e.invoice_count), 1),
                  t("td", xy, a(p(e.qty_sold)), 1),
                  t("td", Cy, a(d(e.total_discount)), 1),
                  t("td", Sy, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : yt.value === "customer" ? (l(), o("table", jy, [
              s[464] || (s[464] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Customer"),
                  t("th", { class: "ta-r" }, "Invoices"),
                  t("th", { class: "ta-r" }, "Amount"),
                  t("th", { class: "ta-r" }, "Outstanding")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(O.value.customer_wise, (e) => (l(), o("tr", {
                  key: e.customer
                }, [
                  t("td", null, a(e.customer_name || e.customer), 1),
                  t("td", My, a(e.invoice_count), 1),
                  t("td", Dy, a(d(e.total_amount)), 1),
                  t("td", Ty, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : yt.value === "salesperson" ? (l(), o("table", Ry, [
              s[465] || (s[465] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Salesperson"),
                  t("th", { class: "ta-r" }, "Invoices"),
                  t("th", { class: "ta-r" }, "Amount")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(O.value.salesperson_wise, (e) => (l(), o("tr", {
                  key: e.sales_person
                }, [
                  t("td", null, a(e.sales_person), 1),
                  t("td", Oy, a(e.invoice_count), 1),
                  t("td", Py, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : yt.value === "branch" ? (l(), o(u, { key: 5 }, [
              s[467] || (s[467] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "10px" } }, "No dedicated Branch/Location doctype exists — grouped by Cost Center as a proxy.", -1)),
              t("table", Iy, [
                s[466] || (s[466] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Branch / Cost Center"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(O.value.branch_wise, (e) => (l(), o("tr", {
                    key: e.branch
                  }, [
                    t("td", null, a(e.branch), 1),
                    t("td", Vy, a(e.invoice_count), 1),
                    t("td", Ny, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : yt.value === "returns" ? (l(), o(u, { key: 6 }, [
              t("div", Ey, [
                t("div", By, [
                  s[468] || (s[468] = t("span", { class: "bucket-label" }, "Return Count", -1)),
                  t("span", qy, a(O.value.sales_return.return_count), 1)
                ]),
                t("div", Ay, [
                  s[469] || (s[469] = t("span", { class: "bucket-label" }, "Return Value", -1)),
                  t("span", $y, a(d(O.value.sales_return.return_total)), 1)
                ]),
                t("div", Ly, [
                  s[470] || (s[470] = t("span", { class: "bucket-label" }, "% of Sales", -1)),
                  t("span", Qy, a(O.value.sales_return.return_pct_of_sales.toFixed(1)) + "%", 1)
                ])
              ]),
              O.value.sales_return.rows.length ? (l(), o("table", Fy, [
                s[471] || (s[471] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Credit Note"),
                    t("th", null, "Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Against Invoice"),
                    t("th", { class: "ta-r" }, "Amount"),
                    t("th", null, "Reason")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(O.value.sales_return.rows, (e) => (l(), o("tr", {
                    key: e.credit_note
                  }, [
                    t("td", null, a(e.credit_note), 1),
                    t("td", null, a(e.posting_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.return_against || "—"), 1),
                    t("td", Hy, a(d(e.grand_total)), 1),
                    t("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zy, "No sales returns in this period."))
            ], 64)) : yt.value === "discount" ? (l(), o(u, { key: 7 }, [
              t("div", Wy, [
                t("div", Uy, [
                  s[472] || (s[472] = t("span", { class: "bucket-label" }, "Line Discount", -1)),
                  t("span", Ky, a(d(O.value.discount_analysis.total_line_discount)), 1)
                ]),
                t("div", Gy, [
                  s[473] || (s[473] = t("span", { class: "bucket-label" }, "Header Discount", -1)),
                  t("span", Yy, a(d(O.value.discount_analysis.total_header_discount)), 1)
                ]),
                t("div", Jy, [
                  s[474] || (s[474] = t("span", { class: "bucket-label" }, "Avg Discount %", -1)),
                  t("span", Xy, a(O.value.discount_analysis.avg_discount_pct.toFixed(1)) + "%", 1)
                ])
              ]),
              s[477] || (s[477] = t("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Customer", -1)),
              O.value.discount_analysis.by_customer.length ? (l(), o("table", Zy, [
                s[475] || (s[475] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Line Discount"),
                    t("th", { class: "ta-r" }, "Header Discount"),
                    t("th", { class: "ta-r" }, "Net Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(O.value.discount_analysis.by_customer, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", tb, a(d(e.line_discount)), 1),
                    t("td", sb, a(d(e.header_discount)), 1),
                    t("td", eb, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ab, "No discounted invoices for any customer.")),
              s[478] || (s[478] = t("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Item", -1)),
              O.value.discount_analysis.by_item.length ? (l(), o("table", ob, [
                s[476] || (s[476] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Discount"),
                    t("th", { class: "ta-r" }, "Net Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(O.value.discount_analysis.by_item, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", lb, a(d(e.total_discount)), 1),
                    t("td", nb, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ib, "No discounted items."))
            ], 64)) : yt.value === "pending" ? (l(), o(u, { key: 8 }, [
              t("div", db, [
                t("div", rb, [
                  s[479] || (s[479] = t("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  t("span", ub, a(O.value.sales_order_pending.order_count), 1)
                ]),
                t("div", cb, [
                  s[480] || (s[480] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", mb, a(d(O.value.sales_order_pending.pending_total)), 1)
                ])
              ]),
              O.value.sales_order_pending.rows.length ? (l(), o("table", vb, [
                s[481] || (s[481] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Order Value"),
                    t("th", { class: "ta-r" }, "Billed"),
                    t("th", { class: "ta-r" }, "Pending")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(O.value.sales_order_pending.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.transaction_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, [
                      t("span", _b, a(e.status), 1)
                    ]),
                    t("td", pb, a(d(e.grand_total)), 1),
                    t("td", yb, a(d(e.billed_amount)), 1),
                    t("td", bb, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", hb, "No pending sales orders."))
            ], 64)) : yt.value === "conversion" ? (l(), o(u, { key: 9 }, [
              s[488] || (s[488] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Based on Sales Orders placed within the selected date range.", -1)),
              t("div", gb, [
                t("div", fb, [
                  s[482] || (s[482] = t("span", { class: "bucket-label" }, "Orders Placed", -1)),
                  t("span", kb, a(O.value.sales_conversion.order_count), 1)
                ]),
                t("div", wb, [
                  s[483] || (s[483] = t("span", { class: "bucket-label" }, "Converted to Invoice", -1)),
                  t("span", xb, a(O.value.sales_conversion.converted_count), 1)
                ]),
                t("div", Cb, [
                  s[484] || (s[484] = t("span", { class: "bucket-label" }, "Conversion Rate", -1)),
                  t("span", {
                    class: c(["mis-summary-val", O.value.sales_conversion.conversion_rate_pct >= 50 ? "green" : "red"])
                  }, a(O.value.sales_conversion.conversion_rate_pct.toFixed(1)) + "%", 3)
                ]),
                t("div", Sb, [
                  s[485] || (s[485] = t("span", { class: "bucket-label" }, "Order Value", -1)),
                  t("span", jb, a(d(O.value.sales_conversion.order_value)), 1)
                ]),
                t("div", Mb, [
                  s[486] || (s[486] = t("span", { class: "bucket-label" }, "Billed Value", -1)),
                  t("span", Db, a(d(O.value.sales_conversion.billed_value)), 1)
                ]),
                t("div", Tb, [
                  s[487] || (s[487] = t("span", { class: "bucket-label" }, "Value Conversion %", -1)),
                  t("span", Rb, a(O.value.sales_conversion.value_conversion_pct.toFixed(1)) + "%", 1)
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Ob, a(no.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "receivables" ? (l(), o("div", Pb, [
          t("div", Ib, [
            s[490] || (s[490] = C('<div class="bs-page-head-icon rmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="12" cy="12" r="10" data-v-94f2f87b></circle><path d="M12 6v6l4 2" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Collection &amp; Receivables MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Total receivables, customer outstanding, ageing, collection targets and efficiency for the selected period.</div></div>', 2)),
            t("div", Vb, [
              t("div", Nb, "As of " + a(P(y.value)), 1),
              t("div", Eb, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[152] || (s[152] = (e) => et("exportReceivablesCSV")),
                  disabled: !I.value
                }, [...s[489] || (s[489] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Bb),
                w.value === "exportReceivablesCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[153] || (s[153] = (e) => w.value = "")
                  }),
                  t("div", qb, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[154] || (s[154] = (e) => {
                        w.value = "", Bo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[155] || (s[155] = (e) => {
                        w.value = "", Y(Bo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", Ab, [
            (l(), o(u, null, m(Fl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Rt.value === e.key }]),
              onClick: (g) => Rt.value = e.key
            }, a(e.label), 11, $b)), 64))
          ]),
          ea.value ? (l(), o("div", Lb)) : I.value ? (l(), o(u, { key: 1 }, [
            Rt.value === "total" ? (l(), o(u, { key: 0 }, [
              t("div", Qb, [
                t("span", null, "Total Receivables (as of " + a(I.value.as_of_date) + ")", 1),
                t("span", Fb, a(k(S)(I.value.total_outstanding)), 1)
              ]),
              t("div", Hb, [
                t("div", zb, [
                  s[491] || (s[491] = t("span", { class: "bucket-label" }, "Customers Owing", -1)),
                  t("span", Wb, a(I.value.customer_outstanding.length), 1)
                ]),
                t("div", Ub, [
                  s[492] || (s[492] = t("span", { class: "bucket-label" }, "Open Invoices", -1)),
                  t("span", Kb, a(I.value.customer_outstanding.reduce((e, g) => e + g.invoice_count, 0)), 1)
                ]),
                t("div", Gb, [
                  s[493] || (s[493] = t("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  t("span", Yb, a(d(I.value.overdue.total)), 1)
                ]),
                t("div", Jb, [
                  s[494] || (s[494] = t("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  t("span", Xb, a(d(I.value.total_outstanding - I.value.overdue.total)), 1)
                ])
              ])
            ], 64)) : Rt.value === "outstanding" ? (l(), o(u, { key: 1 }, [
              t("div", Zb, [
                t("span", null, "Total Outstanding (as of " + a(I.value.as_of_date) + ")", 1),
                t("span", t2, a(k(S)(I.value.total_outstanding)), 1)
              ]),
              I.value.customer_outstanding.length ? (l(), o("table", s2, [
                s[495] || (s[495] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Open Invoices"),
                    t("th", null, "Oldest Due Date"),
                    t("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(I.value.customer_outstanding, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", e2, a(e.invoice_count), 1),
                    t("td", null, a(e.oldest_due_date || "—"), 1),
                    t("td", a2, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", o2, "No outstanding receivables."))
            ], 64)) : Rt.value === "ageing" ? (l(), o(u, { key: 2 }, [
              t("div", l2, [
                t("div", n2, [
                  s[496] || (s[496] = t("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  t("span", i2, a(d(I.value.ageing_totals.days_0_30)), 1)
                ]),
                t("div", d2, [
                  s[497] || (s[497] = t("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  t("span", r2, a(d(I.value.ageing_totals.days_31_60)), 1)
                ]),
                t("div", u2, [
                  s[498] || (s[498] = t("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  t("span", c2, a(d(I.value.ageing_totals.days_61_90)), 1)
                ]),
                t("div", m2, [
                  s[499] || (s[499] = t("span", { class: "bucket-label" }, "90+ Days", -1)),
                  t("span", v2, a(d(I.value.ageing_totals.days_90_plus)), 1)
                ]),
                t("div", _2, [
                  s[500] || (s[500] = t("span", { class: "bucket-label" }, "Total", -1)),
                  t("span", p2, a(d(I.value.ageing_totals.total)), 1)
                ])
              ]),
              I.value.ageing.length ? (l(), o("table", y2, [
                s[501] || (s[501] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "0-30"),
                    t("th", { class: "ta-r" }, "31-60"),
                    t("th", { class: "ta-r" }, "61-90"),
                    t("th", { class: "ta-r" }, "90+"),
                    t("th", { class: "ta-r" }, "Total")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(I.value.ageing, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", b2, a(d(e.days_0_30)), 1),
                    t("td", h2, a(d(e.days_31_60)), 1),
                    t("td", g2, a(d(e.days_61_90)), 1),
                    t("td", f2, a(d(e.days_90_plus)), 1),
                    t("td", k2, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w2, "No outstanding receivables."))
            ], 64)) : Rt.value === "coll_target" ? (l(), o(u, { key: 3 }, [
              t("div", x2, [
                s[502] || (s[502] = t("label", { class: "dr-label" }, "Collection Target (KES)", -1)),
                Et(t("input", {
                  type: "number",
                  "onUpdate:modelValue": s[156] || (s[156] = (e) => gs.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Gt,
                    gs.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                s[503] || (s[503] = t("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actual collections for this period.", -1))
              ]),
              t("div", C2, [
                t("div", S2, [
                  s[504] || (s[504] = t("span", { class: "bucket-label" }, "Target", -1)),
                  t("span", j2, a(d(gs.value)), 1)
                ]),
                t("div", M2, [
                  s[505] || (s[505] = t("span", { class: "bucket-label" }, "Achieved", -1)),
                  t("span", D2, a(d(I.value.daily_collection.total)), 1)
                ]),
                t("div", T2, [
                  s[506] || (s[506] = t("span", { class: "bucket-label" }, "Achievement %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", uo.value >= 100 ? "green" : "red"])
                  }, a(uo.value.toFixed(1)) + "%", 3)
                ])
              ]),
              t("div", {
                class: c(["pl-row", I.value.daily_collection.total >= gs.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                s[507] || (s[507] = t("span", null, "Variance (Achieved − Target)", -1)),
                t("span", R2, a(k(S)(I.value.daily_collection.total - gs.value)), 1)
              ], 2)
            ], 64)) : Rt.value === "daily_coll" ? (l(), o(u, { key: 4 }, [
              t("div", O2, [
                t("span", null, "Total Collection (" + a(x.value) + " to " + a(y.value) + ")", 1),
                t("span", P2, a(k(S)(I.value.daily_collection.total)), 1)
              ]),
              I.value.daily_collection.days.length ? (l(), o("table", I2, [
                s[508] || (s[508] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Date"),
                    t("th", { class: "ta-r" }, "Payments"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(I.value.daily_collection.days, (e) => (l(), o("tr", {
                    key: e.date
                  }, [
                    t("td", null, a(e.date), 1),
                    t("td", V2, a(e.count), 1),
                    t("td", N2, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : b("", !0)
            ], 64)) : Rt.value === "overdue" ? (l(), o(u, { key: 5 }, [
              t("div", E2, [
                t("div", B2, [
                  s[509] || (s[509] = t("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  t("span", q2, a(I.value.overdue.count), 1)
                ]),
                t("div", A2, [
                  s[510] || (s[510] = t("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  t("span", $2, a(d(I.value.overdue.total)), 1)
                ])
              ]),
              I.value.overdue.rows.length ? (l(), o("table", L2, [
                s[511] || (s[511] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Invoice"),
                    t("th", null, "Customer"),
                    t("th", null, "Due Date"),
                    t("th", { class: "ta-r" }, "Overdue Days"),
                    t("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(I.value.overdue.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    t("td", null, a(e.invoice), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.due_date), 1),
                    t("td", Q2, a(e.overdue_days), 1),
                    t("td", F2, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", H2, "No overdue invoices."))
            ], 64)) : Rt.value === "credit" ? (l(), o(u, { key: 6 }, [
              I.value.credit_utilisation.length ? (l(), o("table", z2, [
                s[512] || (s[512] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Credit Limit"),
                    t("th", { class: "ta-r" }, "Outstanding"),
                    t("th", { class: "ta-r" }, "Utilisation"),
                    t("th", null, "Status")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(I.value.credit_utilisation, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", W2, a(e.credit_limit ? d(e.credit_limit) : "No limit set"), 1),
                    t("td", U2, a(d(e.outstanding_amount)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.over_limit ? "red fw-700" : ""])
                    }, a(e.utilisation_pct != null ? e.utilisation_pct.toFixed(1) + "%" : "—"), 3),
                    t("td", null, [
                      t("span", {
                        class: c(["badge", e.over_limit ? "badge-danger" : "badge-blue"])
                      }, a(e.over_limit ? "Over Limit" : "OK"), 3)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", K2, "No customers with a credit limit or outstanding balance."))
            ], 64)) : Rt.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              s[519] || (s[519] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Efficiency % = Collections in period ÷ (Opening Receivables + Sales in period). ", -1)),
              t("div", G2, [
                t("div", Y2, [
                  s[513] || (s[513] = t("span", { class: "bucket-label" }, "Opening Receivables", -1)),
                  t("span", J2, a(d(I.value.collection_efficiency.opening_receivables)), 1)
                ]),
                t("div", X2, [
                  s[514] || (s[514] = t("span", { class: "bucket-label" }, "Sales in Period", -1)),
                  t("span", Z2, a(d(I.value.collection_efficiency.period_sales)), 1)
                ]),
                t("div", th, [
                  s[515] || (s[515] = t("span", { class: "bucket-label" }, "Receivable Pool", -1)),
                  t("span", sh, a(d(I.value.collection_efficiency.receivable_pool)), 1)
                ]),
                t("div", eh, [
                  s[516] || (s[516] = t("span", { class: "bucket-label" }, "Collected in Period", -1)),
                  t("span", ah, a(d(I.value.collection_efficiency.period_collection)), 1)
                ]),
                t("div", oh, [
                  s[517] || (s[517] = t("span", { class: "bucket-label" }, "Closing Receivables", -1)),
                  t("span", lh, a(d(I.value.collection_efficiency.closing_receivables)), 1)
                ]),
                t("div", nh, [
                  s[518] || (s[518] = t("span", { class: "bucket-label" }, "Collection Efficiency", -1)),
                  t("span", {
                    class: c(["mis-summary-val", I.value.collection_efficiency.efficiency_pct >= 80 ? "green" : "red"])
                  }, a(I.value.collection_efficiency.efficiency_pct.toFixed(1)) + "%", 3)
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", ih, a(ro.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "purchase_mis" ? (l(), o("div", dh, [
          t("div", rh, [
            s[521] || (s[521] = C('<div class="bs-page-head-icon pmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M3 3v18h18" data-v-94f2f87b></path><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Purchase MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Purchase performance broken down by summary, supplier, product, target vs actual, price variance and pending orders/receipts.</div></div>', 2)),
            t("div", uh, [
              t("div", ch, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", mh, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[157] || (s[157] = (e) => et("exportPurchaseMisCSV")),
                  disabled: !B.value
                }, [...s[520] || (s[520] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, vh),
                w.value === "exportPurchaseMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[158] || (s[158] = (e) => w.value = "")
                  }),
                  t("div", _h, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[159] || (s[159] = (e) => {
                        w.value = "", qo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[160] || (s[160] = (e) => {
                        w.value = "", Y(qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", ph, [
            (l(), o(u, null, m(Hl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Ot.value === e.key }]),
              onClick: (g) => Ot.value = e.key
            }, a(e.label), 11, yh)), 64))
          ]),
          aa.value ? (l(), o("div", bh)) : B.value ? (l(), o(u, { key: 1 }, [
            Ot.value === "summary" ? (l(), o("div", hh, [
              t("div", gh, [
                s[522] || (s[522] = t("span", { class: "bucket-label" }, "Bills", -1)),
                t("span", fh, a(p(B.value.summary.invoice_count)), 1)
              ]),
              t("div", kh, [
                s[523] || (s[523] = t("span", { class: "bucket-label" }, "Net Purchases", -1)),
                t("span", wh, a(d(B.value.summary.net_purchases)), 1)
              ]),
              t("div", xh, [
                s[524] || (s[524] = t("span", { class: "bucket-label" }, "Total Tax", -1)),
                t("span", Ch, a(d(B.value.summary.total_tax)), 1)
              ]),
              t("div", Sh, [
                s[525] || (s[525] = t("span", { class: "bucket-label" }, "Discount Received", -1)),
                t("span", jh, a(d(B.value.summary.header_discount)), 1)
              ]),
              t("div", Mh, [
                s[526] || (s[526] = t("span", { class: "bucket-label" }, "Grand Total", -1)),
                t("span", Dh, a(d(B.value.summary.grand_total)), 1)
              ]),
              t("div", Th, [
                s[527] || (s[527] = t("span", { class: "bucket-label" }, "Qty Purchased", -1)),
                t("span", Rh, a(p(B.value.summary.total_qty)), 1)
              ]),
              t("div", Oh, [
                s[528] || (s[528] = t("span", { class: "bucket-label" }, "Avg Bill Value", -1)),
                t("span", Ph, a(d(B.value.summary.avg_invoice_value)), 1)
              ])
            ])) : Ot.value === "supplier" ? (l(), o("table", Ih, [
              s[529] || (s[529] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Supplier"),
                  t("th", { class: "ta-r" }, "Bills"),
                  t("th", { class: "ta-r" }, "Amount"),
                  t("th", { class: "ta-r" }, "Outstanding")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(B.value.supplier_wise, (e) => (l(), o("tr", {
                  key: e.supplier
                }, [
                  t("td", null, a(e.supplier_name || e.supplier), 1),
                  t("td", Vh, a(e.invoice_count), 1),
                  t("td", Nh, a(d(e.total_amount)), 1),
                  t("td", Eh, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : Ot.value === "product" ? (l(), o("table", Bh, [
              s[530] || (s[530] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Item"),
                  t("th", null, "UOM"),
                  t("th", { class: "ta-r" }, "Bills"),
                  t("th", { class: "ta-r" }, "Qty Purchased"),
                  t("th", { class: "ta-r" }, "Discount"),
                  t("th", { class: "ta-r" }, "Amount")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(B.value.product_wise, (e) => (l(), o("tr", {
                  key: e.item_code
                }, [
                  t("td", null, a(e.item_name || e.item_code), 1),
                  t("td", null, a(e.uom || "—"), 1),
                  t("td", qh, a(e.invoice_count), 1),
                  t("td", Ah, a(p(e.qty_purchased)), 1),
                  t("td", $h, a(d(e.total_discount || 0)), 1),
                  t("td", Lh, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : Ot.value === "target" ? (l(), o(u, { key: 3 }, [
              t("div", Qh, [
                s[531] || (s[531] = t("label", { class: "dr-label" }, "Purchase Target / Budget (KES)", -1)),
                Et(t("input", {
                  type: "number",
                  "onUpdate:modelValue": s[161] || (s[161] = (e) => fs.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Gt,
                    fs.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                s[532] || (s[532] = t("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target/budget is stored — enter one to compare against actual purchases for this period.", -1))
              ]),
              t("div", Fh, [
                t("div", Hh, [
                  s[533] || (s[533] = t("span", { class: "bucket-label" }, "Target / Budget", -1)),
                  t("span", zh, a(d(fs.value)), 1)
                ]),
                t("div", Wh, [
                  s[534] || (s[534] = t("span", { class: "bucket-label" }, "Actual", -1)),
                  t("span", Uh, a(d(B.value.summary.grand_total)), 1)
                ]),
                t("div", Kh, [
                  s[535] || (s[535] = t("span", { class: "bucket-label" }, "Utilisation %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", mo.value <= 100 ? "green" : "red"])
                  }, a(mo.value.toFixed(1)) + "%", 3)
                ])
              ]),
              t("div", {
                class: c(["pl-row", B.value.summary.grand_total <= fs.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                s[536] || (s[536] = t("span", null, "Variance (Budget − Actual)", -1)),
                t("span", Gh, a(k(S)(fs.value - B.value.summary.grand_total)), 1)
              ], 2)
            ], 64)) : Ot.value === "price_variance" ? (l(), o(u, { key: 4 }, [
              t("div", Yh, [
                s[537] || (s[537] = ot(" Actual weighted-average purchase rate this period vs. the Item's Standard Buying Rate. ", -1)),
                B.value.no_standard_rate_count ? (l(), o("span", Jh, a(B.value.no_standard_rate_count) + " item(s) below have no Standard Buying Rate set and are excluded from the % comparison.", 1)) : b("", !0)
              ]),
              B.value.price_variance.length ? (l(), o("table", Xh, [
                s[538] || (s[538] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Purchased"),
                    t("th", { class: "ta-r" }, "Actual Rate"),
                    t("th", { class: "ta-r" }, "Standard Rate"),
                    t("th", { class: "ta-r" }, "Variance"),
                    t("th", { class: "ta-r" }, "Variance %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(B.value.price_variance, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Zh, a(p(e.qty_purchased)), 1),
                    t("td", tg, a(d(e.actual_rate)), 1),
                    t("td", sg, a(e.has_standard_rate ? d(e.standard_rate) : "Not set"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.has_standard_rate ? e.variance > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? d(e.variance) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.has_standard_rate ? e.variance_pct > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? e.variance_pct.toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", eg, "No purchases in this period."))
            ], 64)) : Ot.value === "pending_po" ? (l(), o(u, { key: 5 }, [
              t("div", ag, [
                t("div", og, [
                  s[539] || (s[539] = t("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  t("span", lg, a(B.value.pending_purchase_orders.order_count), 1)
                ]),
                t("div", ng, [
                  s[540] || (s[540] = t("span", { class: "bucket-label" }, "Pending (Not Yet Billed)", -1)),
                  t("span", ig, a(d(B.value.pending_purchase_orders.pending_total)), 1)
                ])
              ]),
              B.value.pending_purchase_orders.rows.length ? (l(), o("table", dg, [
                s[541] || (s[541] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Purchase Order"),
                    t("th", null, "Date"),
                    t("th", null, "Supplier"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Order Value"),
                    t("th", { class: "ta-r" }, "Billed"),
                    t("th", { class: "ta-r" }, "Pending")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(B.value.pending_purchase_orders.rows, (e) => (l(), o("tr", {
                    key: e.purchase_order
                  }, [
                    t("td", null, a(e.purchase_order), 1),
                    t("td", null, a(e.transaction_date), 1),
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", null, [
                      t("span", rg, a(e.status), 1)
                    ]),
                    t("td", ug, a(d(e.grand_total)), 1),
                    t("td", cg, a(d(e.billed_amount || 0)), 1),
                    t("td", mg, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", vg, "No pending Purchase Orders as of this date."))
            ], 64)) : Ot.value === "pending_receipts" ? (l(), o(u, { key: 6 }, [
              t("div", _g, [
                t("div", pg, [
                  s[542] || (s[542] = t("span", { class: "bucket-label" }, "Orders Awaiting Receipt", -1)),
                  t("span", yg, a(B.value.pending_material_receipts.order_count), 1)
                ]),
                t("div", bg, [
                  s[543] || (s[543] = t("span", { class: "bucket-label" }, "Pending Receipt Value", -1)),
                  t("span", hg, a(d(B.value.pending_material_receipts.pending_value)), 1)
                ])
              ]),
              B.value.pending_material_receipts.rows.length ? (l(), o("table", gg, [
                s[544] || (s[544] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Purchase Order"),
                    t("th", null, "Date"),
                    t("th", null, "Supplier"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Ordered Qty"),
                    t("th", { class: "ta-r" }, "Received Qty"),
                    t("th", { class: "ta-r" }, "Pending Qty")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(B.value.pending_material_receipts.rows, (e) => (l(), o("tr", {
                    key: e.purchase_order
                  }, [
                    t("td", null, a(e.purchase_order), 1),
                    t("td", null, a(e.transaction_date), 1),
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", null, [
                      t("span", fg, a(e.status), 1)
                    ]),
                    t("td", kg, a(p(e.ordered_qty)), 1),
                    t("td", wg, a(p(e.received_qty || 0)), 1),
                    t("td", xg, a(p(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Cg, "No pending material receipts as of this date."))
            ], 64)) : Ot.value === "returns" ? (l(), o(u, { key: 7 }, [
              t("div", Sg, [
                t("div", jg, [
                  s[545] || (s[545] = t("span", { class: "bucket-label" }, "Return Count", -1)),
                  t("span", Mg, a(B.value.purchase_return.return_count), 1)
                ]),
                t("div", Dg, [
                  s[546] || (s[546] = t("span", { class: "bucket-label" }, "Return Value", -1)),
                  t("span", Tg, a(d(B.value.purchase_return.return_total)), 1)
                ]),
                t("div", Rg, [
                  s[547] || (s[547] = t("span", { class: "bucket-label" }, "% of Purchases", -1)),
                  t("span", Og, a(B.value.purchase_return.return_pct_of_purchases.toFixed(1)) + "%", 1)
                ])
              ]),
              B.value.purchase_return.rows.length ? (l(), o("table", Pg, [
                s[548] || (s[548] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Debit Note"),
                    t("th", null, "Date"),
                    t("th", null, "Supplier"),
                    t("th", null, "Against Bill"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(B.value.purchase_return.rows, (e) => (l(), o("tr", {
                    key: e.debit_note
                  }, [
                    t("td", null, a(e.debit_note), 1),
                    t("td", null, a(e.posting_date), 1),
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", null, a(e.return_against || "—"), 1),
                    t("td", Ig, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Vg, "No purchase returns in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Ng, a(co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "inventory_mis" ? (l(), o("div", Eg, [
          t("div", Bg, [
            s[550] || (s[550] = C('<div class="bs-page-head-icon invmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-94f2f87b></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-94f2f87b></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Inventory MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Current stock, valuation, movement speed, ageing, reorder points and adjustments across all warehouses.</div></div>', 2)),
            t("div", qg, [
              t("div", Ag, "As of " + a(P(y.value)), 1),
              t("div", $g, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[162] || (s[162] = (e) => et("exportInventoryMisCSV")),
                  disabled: !R.value
                }, [...s[549] || (s[549] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Lg),
                w.value === "exportInventoryMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[163] || (s[163] = (e) => w.value = "")
                  }),
                  t("div", Qg, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[164] || (s[164] = (e) => {
                        w.value = "", Ao();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[165] || (s[165] = (e) => {
                        w.value = "", Y(Ao);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", Fg, [
            (l(), o(u, null, m(zl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: bt.value === e.key }]),
              onClick: (g) => bt.value = e.key
            }, a(e.label), 11, Hg)), 64))
          ]),
          oa.value ? (l(), o("div", zg)) : R.value ? (l(), o(u, { key: 1 }, [
            bt.value === "current_stock" ? (l(), o(u, { key: 0 }, [
              t("div", Wg, [
                t("div", Ug, [
                  s[551] || (s[551] = t("span", { class: "bucket-label" }, "Total Qty on Hand", -1)),
                  t("span", Kg, a(p(R.value.current_stock.total_qty)), 1)
                ]),
                t("div", Gg, [
                  s[552] || (s[552] = t("span", { class: "bucket-label" }, "Total Stock Value", -1)),
                  t("span", Yg, a(d(R.value.current_stock.total_value)), 1)
                ])
              ]),
              R.value.current_stock.rows.length ? (l(), o("table", Jg, [
                s[553] || (s[553] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", null, "Warehouse"),
                    t("th", null, "UOM"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Rate"),
                    t("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.current_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code + e.warehouse
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.warehouse), 1),
                    t("td", null, a(e.uom || "—"), 1),
                    t("td", Xg, a(p(e.actual_qty)), 1),
                    t("td", Zg, a(d(e.valuation_rate)), 1),
                    t("td", t0, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", s0, "No stock on hand."))
            ], 64)) : bt.value === "stock_value" ? (l(), o(u, { key: 1 }, [
              t("div", e0, [
                s[554] || (s[554] = t("span", null, "Total Stock Value (all warehouses)", -1)),
                t("span", a0, a(k(S)(R.value.stock_value.grand_total)), 1)
              ]),
              R.value.stock_value.by_warehouse.length ? (l(), o("table", o0, [
                s[555] || (s[555] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Warehouse"),
                    t("th", { class: "ta-r" }, "Items"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Stock Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.stock_value.by_warehouse, (e) => (l(), o("tr", {
                    key: e.warehouse
                  }, [
                    t("td", null, a(e.warehouse), 1),
                    t("td", l0, a(e.item_count), 1),
                    t("td", n0, a(p(e.total_qty)), 1),
                    t("td", i0, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", d0, "No stock on hand."))
            ], 64)) : bt.value === "fast_moving" ? (l(), o(u, { key: 2 }, [
              t("div", r0, " Ranked by quantity consumed (stock-out) between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              R.value.fast_moving.length ? (l(), o("table", u0, [
                s[556] || (s[556] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Consumed"),
                    t("th", { class: "ta-r" }, "Transactions"),
                    t("th", { class: "ta-r" }, "Current Qty")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.fast_moving, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", c0, a(p(e.qty_consumed)), 1),
                    t("td", m0, a(e.transactions), 1),
                    t("td", v0, a(p(e.current_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _0, "No stock-out movement in this period."))
            ], 64)) : bt.value === "slow_moving" ? (l(), o(u, { key: 3 }, [
              t("div", p0, " In stock, last moved 30-180 days before " + a(y.value) + ". ", 1),
              R.value.slow_moving.length ? (l(), o("table", y0, [
                s[557] || (s[557] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty on Hand"),
                    t("th", { class: "ta-r" }, "Stock Value"),
                    t("th", null, "Last Movement"),
                    t("th", { class: "ta-r" }, "Days Since")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.slow_moving, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", b0, a(p(e.actual_qty)), 1),
                    t("td", h0, a(d(e.stock_value)), 1),
                    t("td", null, a(e.last_movement_date), 1),
                    t("td", g0, a(e.days_since_movement), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", f0, "No slow moving items."))
            ], 64)) : bt.value === "dead_stock" ? (l(), o(u, { key: 4 }, [
              t("div", k0, [
                t("div", w0, [
                  s[558] || (s[558] = t("span", { class: "bucket-label" }, "Dead Stock Items", -1)),
                  t("span", x0, a(R.value.dead_stock.rows.length), 1)
                ]),
                t("div", C0, [
                  s[559] || (s[559] = t("span", { class: "bucket-label" }, "Value Tied Up", -1)),
                  t("span", S0, a(d(R.value.dead_stock.total_value)), 1)
                ])
              ]),
              t("div", j0, " In stock, no stock-out movement in over 180 days before " + a(y.value) + " (or ever). ", 1),
              R.value.dead_stock.rows.length ? (l(), o("table", M0, [
                s[560] || (s[560] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty on Hand"),
                    t("th", { class: "ta-r" }, "Stock Value"),
                    t("th", null, "Last Movement"),
                    t("th", { class: "ta-r" }, "Days Since")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.dead_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", D0, a(p(e.actual_qty)), 1),
                    t("td", T0, a(d(e.stock_value)), 1),
                    t("td", null, a(e.last_movement_date || "Never"), 1),
                    t("td", R0, a(e.days_since_movement ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", O0, "No dead stock."))
            ], 64)) : bt.value === "ageing" ? (l(), o(u, { key: 5 }, [
              t("div", P0, " Proxy ageing: days since each item+warehouse's most recent stock-in, as of " + a(y.value) + ". ", 1),
              t("div", I0, [
                t("div", V0, [
                  s[561] || (s[561] = t("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  t("span", N0, a(d(R.value.stock_ageing.totals.days_0_30)), 1)
                ]),
                t("div", E0, [
                  s[562] || (s[562] = t("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  t("span", B0, a(d(R.value.stock_ageing.totals.days_31_60)), 1)
                ]),
                t("div", q0, [
                  s[563] || (s[563] = t("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  t("span", A0, a(d(R.value.stock_ageing.totals.days_61_90)), 1)
                ]),
                t("div", $0, [
                  s[564] || (s[564] = t("span", { class: "bucket-label" }, "90+ Days", -1)),
                  t("span", L0, a(d(R.value.stock_ageing.totals.days_90_plus)), 1)
                ]),
                t("div", Q0, [
                  s[565] || (s[565] = t("span", { class: "bucket-label" }, "Total", -1)),
                  t("span", F0, a(d(R.value.stock_ageing.totals.total)), 1)
                ])
              ]),
              R.value.stock_ageing.rows.length ? (l(), o("table", H0, [
                s[566] || (s[566] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", null, "Warehouse"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Value"),
                    t("th", null, "Last Receipt"),
                    t("th", { class: "ta-r" }, "Age (Days)")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.stock_ageing.rows, (e) => (l(), o("tr", {
                    key: e.item_code + e.warehouse
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.warehouse), 1),
                    t("td", z0, a(p(e.actual_qty)), 1),
                    t("td", W0, a(d(e.stock_value)), 1),
                    t("td", null, a(e.last_receipt_date || "Never"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", (e.age_days || 0) > 90 ? "red fw-600" : ""])
                    }, a(e.age_days ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", U0, "No stock on hand."))
            ], 64)) : bt.value === "reorder" ? (l(), o(u, { key: 6 }, [
              t("div", K0, [
                t("div", G0, [
                  s[567] || (s[567] = t("span", { class: "bucket-label" }, "Items Below Reorder Level", -1)),
                  t("span", Y0, a(R.value.reorder_low_stock.item_count), 1)
                ])
              ]),
              R.value.reorder_low_stock.rows.length ? (l(), o("table", J0, [
                s[568] || (s[568] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", null, "Warehouse"),
                    t("th", { class: "ta-r" }, "Qty on Hand"),
                    t("th", { class: "ta-r" }, "Reorder Level"),
                    t("th", { class: "ta-r" }, "Reorder Qty"),
                    t("th", { class: "ta-r" }, "Shortage")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.reorder_low_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code + e.warehouse
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.warehouse), 1),
                    t("td", X0, a(p(e.actual_qty)), 1),
                    t("td", Z0, a(p(e.reorder_level)), 1),
                    t("td", tf, a(p(e.reorder_qty)), 1),
                    t("td", sf, a(p(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ef, "No items below reorder level."))
            ], 64)) : bt.value === "excess" ? (l(), o(u, { key: 7 }, [
              s[571] || (s[571] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Max Stock Level is stored — approximated from days-of-cover (qty ÷ trailing 90-day avg daily consumption); flagged when cover exceeds 180 days. ", -1)),
              t("div", af, [
                t("div", of, [
                  s[569] || (s[569] = t("span", { class: "bucket-label" }, "Excess Stock Value", -1)),
                  t("span", lf, a(d(R.value.excess_stock.total_value)), 1)
                ])
              ]),
              R.value.excess_stock.rows.length ? (l(), o("table", nf, [
                s[570] || (s[570] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty on Hand"),
                    t("th", { class: "ta-r" }, "Avg Daily Use"),
                    t("th", { class: "ta-r" }, "Days of Cover"),
                    t("th", { class: "ta-r" }, "Excess Qty"),
                    t("th", { class: "ta-r" }, "Excess Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.excess_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", df, a(p(e.actual_qty)), 1),
                    t("td", rf, a(e.avg_daily_consumption), 1),
                    t("td", uf, a(e.days_of_cover), 1),
                    t("td", cf, a(p(e.excess_qty)), 1),
                    t("td", mf, a(d(e.excess_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", vf, "No excess stock identified."))
            ], 64)) : bt.value === "adjustment" ? (l(), o(u, { key: 8 }, [
              t("div", _f, [
                t("div", pf, [
                  s[572] || (s[572] = t("span", { class: "bucket-label" }, "Adjustments", -1)),
                  t("span", yf, a(R.value.stock_adjustment.entry_count), 1)
                ]),
                t("div", bf, [
                  s[573] || (s[573] = t("span", { class: "bucket-label" }, "Increase Value", -1)),
                  t("span", hf, a(d(R.value.stock_adjustment.increase_value)), 1)
                ]),
                t("div", gf, [
                  s[574] || (s[574] = t("span", { class: "bucket-label" }, "Decrease Value", -1)),
                  t("span", ff, a(d(R.value.stock_adjustment.decrease_value)), 1)
                ])
              ]),
              R.value.stock_adjustment.rows.length ? (l(), o("table", kf, [
                s[575] || (s[575] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Stock Entry"),
                    t("th", null, "Date"),
                    t("th", null, "Item"),
                    t("th", null, "Warehouse"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Value"),
                    t("th", null, "Reason")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.stock_adjustment.rows, (e) => (l(), o("tr", {
                    key: e.stock_entry + e.item_code
                  }, [
                    t("td", null, a(e.stock_entry), 1),
                    t("td", null, a(e.posting_date), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.warehouse), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.qty >= 0 ? "green" : "red"])
                    }, a(p(e.qty)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.value >= 0 ? "" : "red"])
                    }, a(d(e.value)), 3),
                    t("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", wf, "No stock adjustments in this period."))
            ], 64)) : bt.value === "loss" ? (l(), o(u, { key: 9 }, [
              t("div", xf, [
                t("div", Cf, [
                  s[576] || (s[576] = t("span", { class: "bucket-label" }, "Loss Entries", -1)),
                  t("span", Sf, a(R.value.stock_loss.loss_count), 1)
                ]),
                t("div", jf, [
                  s[577] || (s[577] = t("span", { class: "bucket-label" }, "Value Lost", -1)),
                  t("span", Mf, a(d(R.value.stock_loss.loss_value)), 1)
                ])
              ]),
              s[579] || (s[579] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scoped to negative-qty Stock Adjustment entries (physical-count shortfalls). Manufacturing Variance Loss is tracked separately on Work Orders. ", -1)),
              R.value.stock_loss.rows.length ? (l(), o("table", Df, [
                s[578] || (s[578] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Stock Entry"),
                    t("th", null, "Date"),
                    t("th", null, "Item"),
                    t("th", null, "Warehouse"),
                    t("th", { class: "ta-r" }, "Qty Lost"),
                    t("th", { class: "ta-r" }, "Value Lost"),
                    t("th", null, "Reason")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(R.value.stock_loss.rows, (e) => (l(), o("tr", {
                    key: e.stock_entry + e.item_code
                  }, [
                    t("td", null, a(e.stock_entry), 1),
                    t("td", null, a(e.posting_date), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.warehouse), 1),
                    t("td", Tf, a(p(e.qty)), 1),
                    t("td", Rf, a(d(e.value)), 1),
                    t("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Of, "No stock loss/shortage in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Pf, a(vo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "production_mis" ? (l(), o("div", If, [
          t("div", Vf, [
            s[581] || (s[581] = C('<div class="bs-page-head-icon prodmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="2" y="7" width="20" height="14" rx="2" data-v-94f2f87b></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Production MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Production plan vs actual, WIP status, material availability and consumption, cost, efficiency and rejection/scrap for work orders.</div></div>', 2)),
            t("div", Nf, [
              t("div", Ef, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Bf, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[166] || (s[166] = (e) => et("exportProductionMisCSV")),
                  disabled: !T.value
                }, [...s[580] || (s[580] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, qf),
                w.value === "exportProductionMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[167] || (s[167] = (e) => w.value = "")
                  }),
                  t("div", Af, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[168] || (s[168] = (e) => {
                        w.value = "", $o();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[169] || (s[169] = (e) => {
                        w.value = "", Y($o);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", $f, [
            (l(), o(u, null, m(Wl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: ht.value === e.key }]),
              onClick: (g) => ht.value = e.key
            }, a(e.label), 11, Lf)), 64))
          ]),
          la.value ? (l(), o("div", Qf)) : T.value ? (l(), o(u, { key: 1 }, [
            ht.value === "plan_vs_actual" ? (l(), o(u, { key: 0 }, [
              t("div", Ff, [
                t("div", Hf, [
                  s[582] || (s[582] = t("span", { class: "bucket-label" }, "Planned Qty", -1)),
                  t("span", zf, a(p(T.value.plan_vs_actual.totals.planned_qty)), 1)
                ]),
                t("div", Wf, [
                  s[583] || (s[583] = t("span", { class: "bucket-label" }, "Produced Qty", -1)),
                  t("span", Uf, a(p(T.value.plan_vs_actual.totals.produced_qty)), 1)
                ])
              ]),
              T.value.plan_vs_actual.rows.length ? (l(), o("table", Kf, [
                s[584] || (s[584] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Production Plan"),
                    t("th", null, "Date"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Planned Qty"),
                    t("th", { class: "ta-r" }, "Produced Qty"),
                    t("th", { class: "ta-r" }, "Variance"),
                    t("th", { class: "ta-r" }, "Variance %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.plan_vs_actual.rows, (e) => (l(), o("tr", {
                    key: e.production_plan + e.item_code
                  }, [
                    t("td", null, a(e.production_plan), 1),
                    t("td", null, a(e.posting_date), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Gf, a(p(e.planned_qty)), 1),
                    t("td", Yf, a(p(e.produced_qty)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty >= 0 ? "green" : "red"])
                    }, a(p(e.variance_qty)), 3),
                    t("td", Jf, a(e.variance_pct != null ? e.variance_pct + "%" : "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Xf, "No production plans posted in this period."))
            ], 64)) : ht.value === "pending" ? (l(), o(u, { key: 1 }, [
              t("div", Zf, " Live snapshot of open Work Orders (not reconstructed as of " + a(y.value) + "). ", 1),
              t("div", tk, [
                t("div", sk, [
                  s[585] || (s[585] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", ek, a(p(T.value.production_pending.pending_qty_total)), 1)
                ]),
                t("div", ak, [
                  s[586] || (s[586] = t("span", { class: "bucket-label" }, "Overdue Work Orders", -1)),
                  t("span", ok, a(T.value.production_pending.overdue_count), 1)
                ])
              ]),
              T.value.production_pending.rows.length ? (l(), o("table", lk, [
                s[587] || (s[587] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Produced"),
                    t("th", { class: "ta-r" }, "Pending"),
                    t("th", null, "Planned End")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.production_pending.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.status), 1),
                    t("td", nk, a(p(e.qty)), 1),
                    t("td", ik, a(p(e.produced_qty)), 1),
                    t("td", dk, a(p(e.pending_qty)), 1),
                    t("td", {
                      class: c(e.overdue ? "red fw-600" : "")
                    }, a(e.planned_end_date || "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", rk, "No pending production."))
            ], 64)) : ht.value === "wip" ? (l(), o(u, { key: 2 }, [
              t("div", uk, [
                t("div", ck, [
                  s[588] || (s[588] = t("span", { class: "bucket-label" }, "Work Orders In Process", -1)),
                  t("span", mk, a(T.value.wip_status.wo_count), 1)
                ]),
                t("div", vk, [
                  s[589] || (s[589] = t("span", { class: "bucket-label" }, "WIP Stock Value", -1)),
                  t("span", _k, a(d(T.value.wip_status.wip_value_total)), 1)
                ])
              ]),
              T.value.wip_status.rows.length ? (l(), o("table", pk, [
                s[590] || (s[590] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Produced"),
                    t("th", { class: "ta-r" }, "% Complete"),
                    t("th", null, "WIP Warehouse"),
                    t("th", { class: "ta-r" }, "WIP Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.wip_status.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", yk, a(p(e.qty)), 1),
                    t("td", bk, a(p(e.produced_qty)), 1),
                    t("td", hk, a(e.pct_complete) + "%", 1),
                    t("td", null, a(e.wip_warehouse || "—"), 1),
                    t("td", gk, a(d(e.wip_stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fk, "No Work Orders in process."))
            ], 64)) : ht.value === "material_availability" ? (l(), o(u, { key: 3 }, [
              s[593] || (s[593] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Live shortage check: still-to-issue qty on open Work Orders vs current stock at the source warehouse. ", -1)),
              t("div", kk, [
                t("div", wk, [
                  s[591] || (s[591] = t("span", { class: "bucket-label" }, "Items Short", -1)),
                  t("span", xk, a(T.value.raw_material_availability.shortage_count), 1)
                ])
              ]),
              T.value.raw_material_availability.rows.length ? (l(), o("table", Ck, [
                s[592] || (s[592] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", null, "Warehouse"),
                    t("th", { class: "ta-r" }, "Still to Issue"),
                    t("th", { class: "ta-r" }, "Available"),
                    t("th", { class: "ta-r" }, "Shortage")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.raw_material_availability.rows, (e) => (l(), o("tr", {
                    key: e.work_order + e.item_code
                  }, [
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.warehouse), 1),
                    t("td", Sk, a(p(e.still_to_issue)), 1),
                    t("td", jk, a(p(e.available_qty)), 1),
                    t("td", Mk, a(p(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Dk, "No material shortages against open Work Orders."))
            ], 64)) : ht.value === "material_consumption" ? (l(), o(u, { key: 4 }, [
              t("div", Tk, [
                s[594] || (s[594] = t("span", null, "Total Material Consumed", -1)),
                t("span", Rk, a(k(S)(T.value.material_consumption.total_value)), 1)
              ]),
              T.value.material_consumption.rows.length ? (l(), o("table", Ok, [
                s[595] || (s[595] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Consumed"),
                    t("th", { class: "ta-r" }, "Transactions"),
                    t("th", { class: "ta-r" }, "Value Consumed")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.material_consumption.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Pk, a(p(e.qty_consumed)), 1),
                    t("td", Ik, a(e.transactions), 1),
                    t("td", Vk, a(d(e.value_consumed)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Nk, "No material consumed against Work Orders in this period."))
            ], 64)) : ht.value === "material_variance" ? (l(), o(u, { key: 5 }, [
              t("div", Ek, [
                t("div", Bk, [
                  s[596] || (s[596] = t("span", { class: "bucket-label" }, "Net Variance Value", -1)),
                  t("span", {
                    class: c(["mis-summary-val", T.value.material_variance.net_variance_value >= 0 ? "red" : "green"])
                  }, a(d(T.value.material_variance.net_variance_value)), 3)
                ])
              ]),
              T.value.material_variance.rows.length ? (l(), o("table", qk, [
                s[597] || (s[597] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Required Qty"),
                    t("th", { class: "ta-r" }, "Consumed Qty"),
                    t("th", { class: "ta-r" }, "Variance Qty"),
                    t("th", { class: "ta-r" }, "Variance Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.material_variance.rows, (e) => (l(), o("tr", {
                    key: e.work_order + e.item_code
                  }, [
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Ak, a(p(e.required_qty)), 1),
                    t("td", $k, a(p(e.consumed_qty)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty > 0 ? "red" : "green"])
                    }, a(p(e.variance_qty)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.variance_value > 0 ? "red" : "green"])
                    }, a(d(e.variance_value)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Lk, "No material variance in this period."))
            ], 64)) : ht.value === "production_cost" ? (l(), o(u, { key: 6 }, [
              t("div", Qk, [
                t("div", Fk, [
                  s[598] || (s[598] = t("span", { class: "bucket-label" }, "Material Value", -1)),
                  t("span", Hk, a(d(T.value.production_cost.total_material_value)), 1)
                ]),
                t("div", zk, [
                  s[599] || (s[599] = t("span", { class: "bucket-label" }, "Operating Cost", -1)),
                  t("span", Wk, a(d(T.value.production_cost.total_operating_cost)), 1)
                ]),
                t("div", Uk, [
                  s[600] || (s[600] = t("span", { class: "bucket-label" }, "Total Production Cost", -1)),
                  t("span", Kk, a(d(T.value.production_cost.total_cost)), 1)
                ])
              ]),
              T.value.production_cost.rows.length ? (l(), o("table", Gk, [
                s[601] || (s[601] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Produced"),
                    t("th", { class: "ta-r" }, "Material"),
                    t("th", { class: "ta-r" }, "Op. Cost"),
                    t("th", { class: "ta-r" }, "Total"),
                    t("th", { class: "ta-r" }, "Cost/Unit"),
                    t("th", { class: "ta-r" }, "Standard/Unit")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.production_cost.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Yk, a(p(e.produced_qty)), 1),
                    t("td", Jk, a(d(e.material_value)), 1),
                    t("td", Xk, a(d(e.operating_cost)), 1),
                    t("td", Zk, a(d(e.actual_total_cost)), 1),
                    t("td", t4, a(e.actual_cost_per_unit != null ? d(e.actual_cost_per_unit) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.cost_variance_per_unit > 0 ? "red" : e.cost_variance_per_unit < 0 ? "green" : ""])
                    }, a(e.standard_cost_per_unit != null ? d(e.standard_cost_per_unit) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", s4, "No production cost recorded in this period."))
            ], 64)) : ht.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              t("div", e4, [
                t("div", a4, [
                  s[602] || (s[602] = t("span", { class: "bucket-label" }, "Avg Efficiency", -1)),
                  t("span", o4, a(T.value.production_efficiency.avg_efficiency_pct != null ? T.value.production_efficiency.avg_efficiency_pct + "%" : "—"), 1)
                ])
              ]),
              T.value.production_efficiency.rows.length ? (l(), o("table", l4, [
                s[603] || (s[603] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Planned (min)"),
                    t("th", { class: "ta-r" }, "Actual (min)"),
                    t("th", { class: "ta-r" }, "Efficiency %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.production_efficiency.rows, (e) => (l(), o("tr", {
                    key: e.work_order
                  }, [
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.status), 1),
                    t("td", n4, a(p(e.planned_mins)), 1),
                    t("td", i4, a(p(e.actual_mins)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.efficiency_pct >= 100 ? "green" : "red"])
                    }, a(e.efficiency_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", d4, "No operation time logged for Work Orders scheduled in this period."))
            ], 64)) : ht.value === "rejection" ? (l(), o(u, { key: 8 }, [
              s[607] || (s[607] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Job Card scrap items not flagged as process loss — defective pieces that may be reworked. ", -1)),
              t("div", r4, [
                t("div", u4, [
                  s[604] || (s[604] = t("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  t("span", c4, a(p(T.value.rejection_rework.qty_total)), 1)
                ]),
                t("div", m4, [
                  s[605] || (s[605] = t("span", { class: "bucket-label" }, "Value", -1)),
                  t("span", v4, a(d(T.value.rejection_rework.value_total)), 1)
                ])
              ]),
              T.value.rejection_rework.rows.length ? (l(), o("table", _4, [
                s[606] || (s[606] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Job Card"),
                    t("th", null, "Work Order"),
                    t("th", null, "Operation"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.rejection_rework.rows, (e) => (l(), o("tr", {
                    key: e.job_card + e.item_code
                  }, [
                    t("td", null, a(e.job_card), 1),
                    t("td", null, a(e.work_order), 1),
                    t("td", null, a(e.operation), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", p4, a(p(e.qty)), 1),
                    t("td", y4, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", b4, "No rejection/rework recorded in this period."))
            ], 64)) : ht.value === "scrap" ? (l(), o(u, { key: 9 }, [
              s[611] || (s[611] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scrap output rows on Manufacture stock entries, plus process/yield loss recorded on those entries. ", -1)),
              t("div", h4, [
                t("div", g4, [
                  s[608] || (s[608] = t("span", { class: "bucket-label" }, "Scrap Value", -1)),
                  t("span", f4, a(d(T.value.scrap_wastage.scrap_value_total)), 1)
                ]),
                t("div", k4, [
                  s[609] || (s[609] = t("span", { class: "bucket-label" }, "Process Loss Qty", -1)),
                  t("span", w4, a(p(T.value.scrap_wastage.process_loss_qty_total)), 1)
                ])
              ]),
              T.value.scrap_wastage.rows.length ? (l(), o("table", x4, [
                s[610] || (s[610] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Stock Entry"),
                    t("th", null, "Work Order"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(T.value.scrap_wastage.rows, (e) => (l(), o("tr", {
                    key: e.stock_entry + e.item_code
                  }, [
                    t("td", null, a(e.stock_entry), 1),
                    t("td", null, a(e.work_order || "—"), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", C4, a(p(e.qty)), 1),
                    t("td", S4, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", j4, "No scrap output recorded in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", M4, a(_o.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "product_mis" ? (l(), o("div", D4, [
          t("div", T4, [
            s[613] || (s[613] = C('<div class="bs-page-head-icon prdmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-94f2f87b></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Product MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Product-wise sales, profit, cost, margin, production, stock and wastage, plus top and low selling products for the period.</div></div>', 2)),
            t("div", R4, [
              t("div", O4, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", P4, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[170] || (s[170] = (e) => et("exportProductMisCSV")),
                  disabled: !A.value
                }, [...s[612] || (s[612] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, I4),
                w.value === "exportProductMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[171] || (s[171] = (e) => w.value = "")
                  }),
                  t("div", V4, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[172] || (s[172] = (e) => {
                        w.value = "", Lo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[173] || (s[173] = (e) => {
                        w.value = "", Y(Lo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", N4, [
            (l(), o(u, null, m(Ul, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: xt.value === e.key }]),
              onClick: (g) => xt.value = e.key
            }, a(e.label), 11, E4)), 64))
          ]),
          na.value ? (l(), o("div", B4)) : A.value ? (l(), o(u, { key: 1 }, [
            xt.value === "sales" ? (l(), o(u, { key: 0 }, [
              t("div", q4, [
                t("div", A4, [
                  s[614] || (s[614] = t("span", { class: "bucket-label" }, "Qty Sold", -1)),
                  t("span", $4, a(p(A.value.product_wise_sales.totals.qty_sold)), 1)
                ]),
                t("div", L4, [
                  s[615] || (s[615] = t("span", { class: "bucket-label" }, "Total Revenue", -1)),
                  t("span", Q4, a(d(A.value.product_wise_sales.totals.total_amount)), 1)
                ])
              ]),
              A.value.product_wise_sales.rows.length ? (l(), o("table", F4, [
                s[616] || (s[616] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", null, "UOM"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Qty Sold"),
                    t("th", { class: "ta-r" }, "Avg Rate"),
                    t("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_sales.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.uom || "—"), 1),
                    t("td", H4, a(e.invoice_count), 1),
                    t("td", z4, a(p(e.qty_sold)), 1),
                    t("td", W4, a(d(e.avg_rate)), 1),
                    t("td", U4, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", K4, "No sales in this period."))
            ], 64)) : xt.value === "profit" ? (l(), o(u, { key: 1 }, [
              t("div", G4, [
                t("div", Y4, [
                  s[617] || (s[617] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", J4, a(d(A.value.product_wise_profit.totals.revenue)), 1)
                ]),
                t("div", X4, [
                  s[618] || (s[618] = t("span", { class: "bucket-label" }, "Cost", -1)),
                  t("span", Z4, a(d(A.value.product_wise_profit.totals.total_cost)), 1)
                ]),
                t("div", tw, [
                  s[619] || (s[619] = t("span", { class: "bucket-label" }, "Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", A.value.product_wise_profit.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(A.value.product_wise_profit.totals.profit)), 3)
                ])
              ]),
              A.value.product_wise_profit.rows.length ? (l(), o("table", sw, [
                s[620] || (s[620] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", ew, a(d(e.revenue)), 1),
                    t("td", aw, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", ow, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", lw, "No sales in this period."))
            ], 64)) : xt.value === "cost" ? (l(), o(u, { key: 2 }, [
              s[622] || (s[622] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              A.value.product_wise_cost.rows.length ? (l(), o("table", nw, [
                s[621] || (s[621] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Sold"),
                    t("th", { class: "ta-r" }, "Cost Rate"),
                    t("th", { class: "ta-r" }, "Total Cost")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_cost.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", iw, a(p(e.qty_sold)), 1),
                    t("td", dw, a(d(e.cost_rate)), 1),
                    t("td", rw, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", uw, "No sales in this period."))
            ], 64)) : xt.value === "margin" ? (l(), o(u, { key: 3 }, [
              A.value.product_wise_margin.rows.length ? (l(), o("table", cw, [
                s[623] || (s[623] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_margin.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", mw, a(d(e.revenue)), 1),
                    t("td", vw, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.margin_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _w, "No sales in this period."))
            ], 64)) : xt.value === "production" ? (l(), o(u, { key: 4 }, [
              t("div", pw, " Finished-goods receipts on Manufacture stock entries posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              A.value.product_wise_production.rows.length ? (l(), o("table", yw, [
                s[624] || (s[624] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Produced"),
                    t("th", { class: "ta-r" }, "Value Produced"),
                    t("th", { class: "ta-r" }, "Transactions")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_production.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", bw, a(p(e.qty_produced)), 1),
                    t("td", hw, a(d(e.value_produced)), 1),
                    t("td", gw, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fw, "No production recorded in this period."))
            ], 64)) : xt.value === "stock" ? (l(), o(u, { key: 5 }, [
              A.value.product_wise_stock.rows.length ? (l(), o("table", kw, [
                s[625] || (s[625] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", null, "UOM"),
                    t("th", { class: "ta-r" }, "Qty on Hand"),
                    t("th", { class: "ta-r" }, "Rate"),
                    t("th", { class: "ta-r" }, "Stock Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_stock.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.uom || "—"), 1),
                    t("td", ww, a(p(e.total_qty)), 1),
                    t("td", xw, a(d(e.valuation_rate)), 1),
                    t("td", Cw, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Sw, "No stock on hand."))
            ], 64)) : xt.value === "wastage" ? (l(), o(u, { key: 6 }, [
              t("div", jw, " Scrap-flagged rows on Manufacture stock entries posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              t("div", Mw, [
                t("div", Dw, [
                  s[626] || (s[626] = t("span", { class: "bucket-label" }, "Qty Scrapped", -1)),
                  t("span", Tw, a(p(A.value.product_wise_wastage.totals.qty_scrapped)), 1)
                ]),
                t("div", Rw, [
                  s[627] || (s[627] = t("span", { class: "bucket-label" }, "Value Scrapped", -1)),
                  t("span", Ow, a(d(A.value.product_wise_wastage.totals.value_scrapped)), 1)
                ])
              ]),
              A.value.product_wise_wastage.rows.length ? (l(), o("table", Pw, [
                s[628] || (s[628] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Scrapped"),
                    t("th", { class: "ta-r" }, "Value Scrapped"),
                    t("th", { class: "ta-r" }, "Transactions")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.product_wise_wastage.rows, (e) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Iw, a(p(e.qty_scrapped)), 1),
                    t("td", Vw, a(d(e.value_scrapped)), 1),
                    t("td", Nw, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Ew, "No wastage recorded in this period."))
            ], 64)) : xt.value === "top_selling" ? (l(), o(u, { key: 7 }, [
              s[630] || (s[630] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Top 10 items by quantity sold in this period.", -1)),
              A.value.top_selling.rows.length ? (l(), o("table", Bw, [
                s[629] || (s[629] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "#"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Sold"),
                    t("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.top_selling.rows, (e, g) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(g + 1), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", qw, a(p(e.qty_sold)), 1),
                    t("td", Aw, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $w, "No sales in this period."))
            ], 64)) : xt.value === "low_selling" ? (l(), o(u, { key: 8 }, [
              s[632] || (s[632] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Bottom 10 items by quantity sold in this period (items with at least one sale).", -1)),
              A.value.low_selling.rows.length ? (l(), o("table", Lw, [
                s[631] || (s[631] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "#"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Qty Sold"),
                    t("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(A.value.low_selling.rows, (e, g) => (l(), o("tr", {
                    key: e.item_code
                  }, [
                    t("td", null, a(g + 1), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", Qw, a(p(e.qty_sold)), 1),
                    t("td", Fw, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Hw, "No sales in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", zw, a(po.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "dispatch_mis" ? (l(), o("div", Ww, [
          t("div", Uw, [
            s[634] || (s[634] = C('<div class="bs-page-head-icon dmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="1" y="3" width="15" height="13" data-v-94f2f87b></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-94f2f87b></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-94f2f87b></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-94f2f87b></circle></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Dispatch &amp; Delivery MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Dispatch summary, pending and delayed deliveries, customer-wise pending delivery and transport-wise dispatch for the period.</div></div>', 2)),
            t("div", Kw, [
              t("div", Gw, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Yw, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[174] || (s[174] = (e) => et("exportDispatchMisCSV")),
                  disabled: !z.value
                }, [...s[633] || (s[633] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Jw),
                w.value === "exportDispatchMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[175] || (s[175] = (e) => w.value = "")
                  }),
                  t("div", Xw, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[176] || (s[176] = (e) => {
                        w.value = "", Qo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[177] || (s[177] = (e) => {
                        w.value = "", Y(Qo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", Zw, [
            (l(), o(u, null, m(Kl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Kt.value === e.key }]),
              onClick: (g) => Kt.value = e.key
            }, a(e.label), 11, t8)), 64))
          ]),
          ia.value ? (l(), o("div", s8)) : z.value ? (l(), o(u, { key: 1 }, [
            Kt.value === "summary" ? (l(), o(u, { key: 0 }, [
              t("div", e8, " Delivery Notes posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              t("div", a8, [
                t("div", o8, [
                  s[635] || (s[635] = t("span", { class: "bucket-label" }, "Dispatches", -1)),
                  t("span", l8, a(p(z.value.dispatch_summary.dispatch_count)), 1)
                ]),
                t("div", n8, [
                  s[636] || (s[636] = t("span", { class: "bucket-label" }, "Total Qty Dispatched", -1)),
                  t("span", i8, a(p(z.value.dispatch_summary.total_qty)), 1)
                ]),
                t("div", d8, [
                  s[637] || (s[637] = t("span", { class: "bucket-label" }, "Total Value", -1)),
                  t("span", r8, a(d(z.value.dispatch_summary.total_value)), 1)
                ]),
                t("div", u8, [
                  s[638] || (s[638] = t("span", { class: "bucket-label" }, "Customers Served", -1)),
                  t("span", c8, a(p(z.value.dispatch_summary.customer_count)), 1)
                ]),
                t("div", m8, [
                  s[639] || (s[639] = t("span", { class: "bucket-label" }, "Transporters Used", -1)),
                  t("span", v8, a(p(z.value.dispatch_summary.transporter_count)), 1)
                ]),
                t("div", _8, [
                  s[640] || (s[640] = t("span", { class: "bucket-label" }, "Avg Qty / Dispatch", -1)),
                  t("span", p8, a(p(z.value.dispatch_summary.avg_qty_per_dispatch)), 1)
                ])
              ])
            ], 64)) : Kt.value === "pending_dispatch" ? (l(), o(u, { key: 1 }, [
              t("div", y8, " Sales Order lines with nothing dispatched yet, as of " + a(y.value) + ". ", 1),
              t("div", b8, [
                t("div", h8, [
                  s[641] || (s[641] = t("span", { class: "bucket-label" }, "Orders", -1)),
                  t("span", g8, a(z.value.pending_dispatch.order_count), 1)
                ]),
                t("div", f8, [
                  s[642] || (s[642] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", k8, a(p(z.value.pending_dispatch.pending_qty)), 1)
                ]),
                t("div", w8, [
                  s[643] || (s[643] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", x8, a(d(z.value.pending_dispatch.pending_value)), 1)
                ])
              ]),
              z.value.pending_dispatch.rows.length ? (l(), o("table", C8, [
                s[644] || (s[644] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Ordered Qty"),
                    t("th", { class: "ta-r" }, "Pending Qty"),
                    t("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(z.value.pending_dispatch.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", S8, a(p(e.ordered_qty)), 1),
                    t("td", j8, a(p(e.pending_qty)), 1),
                    t("td", M8, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", D8, "No pending dispatch as of this date."))
            ], 64)) : Kt.value === "delivery_pending" ? (l(), o(u, { key: 2 }, [
              t("div", T8, " All undelivered Sales Order quantity as of " + a(y.value) + ", including partially dispatched lines. ", 1),
              t("div", R8, [
                t("div", O8, [
                  s[645] || (s[645] = t("span", { class: "bucket-label" }, "Orders", -1)),
                  t("span", P8, a(z.value.delivery_pending.order_count), 1)
                ]),
                t("div", I8, [
                  s[646] || (s[646] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", V8, a(p(z.value.delivery_pending.pending_qty)), 1)
                ]),
                t("div", N8, [
                  s[647] || (s[647] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", E8, a(d(z.value.delivery_pending.pending_value)), 1)
                ])
              ]),
              z.value.delivery_pending.rows.length ? (l(), o("table", B8, [
                s[648] || (s[648] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Delivery Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Ordered Qty"),
                    t("th", { class: "ta-r" }, "Dispatched Qty"),
                    t("th", { class: "ta-r" }, "Pending Qty")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(z.value.delivery_pending.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.delivery_date || "—"), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", q8, a(p(e.ordered_qty)), 1),
                    t("td", A8, a(p(e.delivered_qty)), 1),
                    t("td", $8, a(p(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", L8, "No pending deliveries as of this date."))
            ], 64)) : Kt.value === "delayed_delivery" ? (l(), o(u, { key: 3 }, [
              s[653] || (s[653] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Delivery Pending lines whose Delivery Date has already passed. ", -1)),
              t("div", Q8, [
                t("div", F8, [
                  s[649] || (s[649] = t("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  t("span", H8, a(z.value.delayed_delivery.order_count), 1)
                ]),
                t("div", z8, [
                  s[650] || (s[650] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", W8, a(p(z.value.delayed_delivery.pending_qty)), 1)
                ]),
                t("div", U8, [
                  s[651] || (s[651] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", K8, a(d(z.value.delayed_delivery.pending_value)), 1)
                ])
              ]),
              z.value.delayed_delivery.rows.length ? (l(), o("table", G8, [
                s[652] || (s[652] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Delivery Date"),
                    t("th", null, "Days Overdue"),
                    t("th", null, "Customer"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Pending Qty"),
                    t("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(z.value.delayed_delivery.rows, (e, g) => (l(), o("tr", {
                    key: e.sales_order + "_" + e.item_code + "_" + g
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.delivery_date), 1),
                    t("td", Y8, a(e.days_overdue), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", J8, a(p(e.pending_qty)), 1),
                    t("td", X8, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Z8, "No delayed deliveries as of today."))
            ], 64)) : Kt.value === "customer_pending" ? (l(), o(u, { key: 4 }, [
              z.value.customer_wise_pending_delivery.rows.length ? (l(), o("table", t7, [
                s[654] || (s[654] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Orders"),
                    t("th", { class: "ta-r" }, "Pending Qty"),
                    t("th", { class: "ta-r" }, "Pending Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(z.value.customer_wise_pending_delivery.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", s7, a(e.order_count), 1),
                    t("td", e7, a(p(e.pending_qty)), 1),
                    t("td", a7, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", o7, "No pending deliveries as of this date."))
            ], 64)) : Kt.value === "transport_wise" ? (l(), o(u, { key: 5 }, [
              t("div", l7, " Delivery Notes posted between " + a(x.value) + " and " + a(y.value) + ", grouped by Transporter. ", 1),
              z.value.transport_wise_dispatch.rows.length ? (l(), o("table", n7, [
                s[655] || (s[655] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Transporter"),
                    t("th", { class: "ta-r" }, "Dispatches"),
                    t("th", { class: "ta-r" }, "Customers"),
                    t("th", { class: "ta-r" }, "Total Qty"),
                    t("th", { class: "ta-r" }, "Total Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(z.value.transport_wise_dispatch.rows, (e) => (l(), o("tr", {
                    key: e.transporter_name
                  }, [
                    t("td", null, a(e.transporter_name), 1),
                    t("td", i7, a(e.dispatch_count), 1),
                    t("td", d7, a(e.customer_count), 1),
                    t("td", r7, a(p(e.total_qty)), 1),
                    t("td", u7, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", c7, "No dispatches in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", m7, a(yo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "order_mis" ? (l(), o("div", v7, [
          t("div", _7, [
            s[657] || (s[657] = C('<div class="bs-page-head-icon omis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M9 11l3 3L22 4" data-v-94f2f87b></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Order MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Sales order pipeline — new, pending, under production, ready for dispatch, delayed, delivered, cancelled and order-wise profitability.</div></div>', 2)),
            t("div", p7, [
              t("div", y7, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", b7, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[178] || (s[178] = (e) => et("exportOrderMisCSV")),
                  disabled: !q.value
                }, [...s[656] || (s[656] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, h7),
                w.value === "exportOrderMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[179] || (s[179] = (e) => w.value = "")
                  }),
                  t("div", g7, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[180] || (s[180] = (e) => {
                        w.value = "", Fo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[181] || (s[181] = (e) => {
                        w.value = "", Y(Fo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", f7, [
            (l(), o(u, null, m(Gl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: vt.value === e.key }]),
              onClick: (g) => vt.value = e.key
            }, a(e.label), 11, k7)), 64))
          ]),
          da.value ? (l(), o("div", w7)) : q.value ? (l(), o(u, { key: 1 }, [
            vt.value === "summary" ? (l(), o(u, { key: 0 }, [
              t("div", x7, " Sales Orders placed between " + a(x.value) + " and " + a(y.value) + ". Under Production / Ready for Dispatch are derived from linked Work Orders; Delayed is based on today's date. ", 1),
              t("div", C7, [
                t("div", S7, [
                  s[658] || (s[658] = t("span", { class: "bucket-label" }, "Total Orders", -1)),
                  t("span", j7, a(p(q.value.summary.total_orders.count)), 1)
                ]),
                t("div", M7, [
                  s[659] || (s[659] = t("span", { class: "bucket-label" }, "New Orders", -1)),
                  t("span", D7, a(p(q.value.summary.new_orders.count)), 1)
                ]),
                t("div", T7, [
                  s[660] || (s[660] = t("span", { class: "bucket-label" }, "Pending Orders", -1)),
                  t("span", R7, a(p(q.value.summary.pending_orders.count)), 1)
                ]),
                t("div", O7, [
                  s[661] || (s[661] = t("span", { class: "bucket-label" }, "Under Production", -1)),
                  t("span", P7, a(p(q.value.summary.under_production.count)), 1)
                ]),
                t("div", I7, [
                  s[662] || (s[662] = t("span", { class: "bucket-label" }, "Ready for Dispatch", -1)),
                  t("span", V7, a(p(q.value.summary.ready_for_dispatch.count)), 1)
                ]),
                t("div", N7, [
                  s[663] || (s[663] = t("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  t("span", E7, a(p(q.value.summary.delayed_orders.count)), 1)
                ]),
                t("div", B7, [
                  s[664] || (s[664] = t("span", { class: "bucket-label" }, "Delivered Orders", -1)),
                  t("span", q7, a(p(q.value.summary.delivered_orders.count)), 1)
                ]),
                t("div", A7, [
                  s[665] || (s[665] = t("span", { class: "bucket-label" }, "Cancelled Orders", -1)),
                  t("span", $7, a(p(q.value.summary.cancelled_orders.count)), 1)
                ])
              ])
            ], 64)) : vt.value === "total" ? (l(), o(u, { key: 1 }, [
              q.value.summary.total_orders.rows.length ? (l(), o("table", L7, [
                s[666] || (s[666] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Delivery Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.total_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.delivery_date || "—"), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, [
                      t("span", Q7, a(e.status), 1)
                    ]),
                    t("td", F7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", H7, "No orders in this period."))
            ], 64)) : vt.value === "new" ? (l(), o(u, { key: 2 }, [
              q.value.summary.new_orders.rows.length ? (l(), o("table", z7, [
                s[667] || (s[667] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.new_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", W7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", U7, "No new (unconfirmed) orders in this period."))
            ], 64)) : vt.value === "pending" ? (l(), o(u, { key: 3 }, [
              q.value.summary.pending_orders.rows.length ? (l(), o("table", K7, [
                s[668] || (s[668] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Delivery Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.pending_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.delivery_date || "—"), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, [
                      t("span", G7, a(e.status), 1)
                    ]),
                    t("td", Y7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", J7, "No pending orders in this period."))
            ], 64)) : vt.value === "under_production" ? (l(), o(u, { key: 4 }, [
              q.value.summary.under_production.rows.length ? (l(), o("table", X7, [
                s[669] || (s[669] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Work Order Status"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.under_production.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.wo_statuses.join(", ")), 1),
                    t("td", Z7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", t6, "No orders currently under production."))
            ], 64)) : vt.value === "ready_for_dispatch" ? (l(), o(u, { key: 5 }, [
              q.value.summary.ready_for_dispatch.rows.length ? (l(), o("table", s6, [
                s[670] || (s[670] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.ready_for_dispatch.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", e6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a6, "No orders ready for dispatch."))
            ], 64)) : vt.value === "delayed" ? (l(), o(u, { key: 6 }, [
              q.value.summary.delayed_orders.rows.length ? (l(), o("table", o6, [
                s[671] || (s[671] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Delivery Date"),
                    t("th", null, "Days Overdue"),
                    t("th", null, "Customer"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.delayed_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.delivery_date), 1),
                    t("td", l6, a(e.days_overdue), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, [
                      t("span", n6, a(e.status), 1)
                    ]),
                    t("td", i6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", d6, "No delayed orders as of today."))
            ], 64)) : vt.value === "delivered" ? (l(), o(u, { key: 7 }, [
              q.value.summary.delivered_orders.rows.length ? (l(), o("table", r6, [
                s[672] || (s[672] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Customer"),
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.delivered_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, [
                      t("span", u6, a(e.status), 1)
                    ]),
                    t("td", c6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", m6, "No delivered orders in this period."))
            ], 64)) : vt.value === "cancelled" ? (l(), o(u, { key: 8 }, [
              q.value.summary.cancelled_orders.rows.length ? (l(), o("table", v6, [
                s[673] || (s[673] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Order Date"),
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Order Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.summary.cancelled_orders.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", _6, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", p6, "No cancelled orders in this period."))
            ], 64)) : vt.value === "order_value" ? (l(), o(u, { key: 9 }, [
              t("div", y6, [
                t("div", b6, [
                  s[674] || (s[674] = t("span", { class: "bucket-label" }, "Total Order Value", -1)),
                  t("span", h6, a(d(q.value.order_value.total_value)), 1)
                ])
              ]),
              q.value.order_value.by_status.length ? (l(), o("table", g6, [
                s[675] || (s[675] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Status"),
                    t("th", { class: "ta-r" }, "Orders"),
                    t("th", { class: "ta-r" }, "Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.order_value.by_status, (e) => (l(), o("tr", {
                    key: e.status
                  }, [
                    t("td", null, [
                      t("span", f6, a(e.status), 1)
                    ]),
                    t("td", k6, a(e.order_count), 1),
                    t("td", w6, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", x6, "No orders in this period."))
            ], 64)) : vt.value === "profitability" ? (l(), o(u, { key: 10 }, [
              s[680] || (s[680] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate — applied to Sales Order lines whether or not the order has been invoiced yet. ", -1)),
              t("div", C6, [
                t("div", S6, [
                  s[676] || (s[676] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", j6, a(d(q.value.order_profitability.totals.revenue)), 1)
                ]),
                t("div", M6, [
                  s[677] || (s[677] = t("span", { class: "bucket-label" }, "Cost", -1)),
                  t("span", D6, a(d(q.value.order_profitability.totals.total_cost)), 1)
                ]),
                t("div", T6, [
                  s[678] || (s[678] = t("span", { class: "bucket-label" }, "Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", q.value.order_profitability.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(q.value.order_profitability.totals.profit)), 3)
                ])
              ]),
              q.value.order_profitability.rows.length ? (l(), o("table", R6, [
                s[679] || (s[679] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Date"),
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(q.value.order_profitability.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.order_date), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", O6, a(d(e.revenue)), 1),
                    t("td", P6, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", I6, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", V6, "No orders in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", N6, a(bo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "profitability_mis" ? (l(), o("div", E6, [
          t("div", B6, [
            s[682] || (s[682] = C('<div class="bs-page-head-icon pfmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><line x1="12" y1="1" x2="12" y2="23" data-v-94f2f87b></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Profitability MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Gross profit and margin by product, customer, order, branch and salesperson, plus the monthly profit trend. Excludes sales returns; cost is current average valuation, falling back to Standard Buying Rate.</div></div>', 2)),
            t("div", q6, [
              t("div", A6, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", $6, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[182] || (s[182] = (e) => et("exportProfitabilityMisCSV")),
                  disabled: !W.value
                }, [...s[681] || (s[681] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, L6),
                w.value === "exportProfitabilityMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[183] || (s[183] = (e) => w.value = "")
                  }),
                  t("div", Q6, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[184] || (s[184] = (e) => {
                        w.value = "", Ho();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[185] || (s[185] = (e) => {
                        w.value = "", Y(Ho);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", F6, [
            (l(), o(u, null, m(Yl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Lt.value === e.key }]),
              onClick: (g) => Lt.value = e.key
            }, a(e.label), 11, H6)), 64))
          ]),
          ra.value ? (l(), o("div", z6)) : W.value ? (l(), o(u, { key: 1 }, [
            Lt.value === "summary" ? (l(), o(u, { key: 0 }, [
              s[689] || (s[689] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Excludes Sales Returns. Cost is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              t("div", W6, [
                t("div", U6, [
                  s[683] || (s[683] = t("span", { class: "bucket-label" }, "Gross Sales", -1)),
                  t("span", K6, a(d(W.value.summary.gross_sales)), 1)
                ]),
                t("div", G6, [
                  s[684] || (s[684] = t("span", { class: "bucket-label" }, "Net Sales", -1)),
                  t("span", Y6, a(d(W.value.summary.net_sales)), 1)
                ]),
                t("div", J6, [
                  s[685] || (s[685] = t("span", { class: "bucket-label" }, "Total Cost", -1)),
                  t("span", X6, a(d(W.value.summary.total_cost)), 1)
                ]),
                t("div", Z6, [
                  s[686] || (s[686] = t("span", { class: "bucket-label" }, "Gross Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_profit >= 0 ? "green" : "red"])
                  }, a(d(W.value.summary.gross_profit)), 3)
                ]),
                t("div", t3, [
                  s[687] || (s[687] = t("span", { class: "bucket-label" }, "Gross Margin %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_margin_pct >= 0 ? "green" : "red"])
                  }, a(W.value.summary.gross_margin_pct.toFixed(1)) + "%", 3)
                ]),
                t("div", s3, [
                  s[688] || (s[688] = t("span", { class: "bucket-label" }, "Invoices", -1)),
                  t("span", e3, a(p(W.value.summary.invoice_count)), 1)
                ])
              ])
            ], 64)) : Lt.value === "product" ? (l(), o("table", a3, [
              s[690] || (s[690] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Item"),
                  t("th", { class: "ta-r" }, "Revenue"),
                  t("th", { class: "ta-r" }, "Cost"),
                  t("th", { class: "ta-r" }, "Profit"),
                  t("th", { class: "ta-r" }, "Margin %")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(W.value.product_wise_profit.rows, (e) => (l(), o("tr", {
                  key: e.item_code
                }, [
                  t("td", null, a(e.item_name || e.item_code), 1),
                  t("td", o3, a(d(e.revenue)), 1),
                  t("td", l3, a(d(e.cost)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  t("td", n3, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Lt.value === "customer" ? (l(), o("table", i3, [
              s[691] || (s[691] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Customer"),
                  t("th", { class: "ta-r" }, "Invoices"),
                  t("th", { class: "ta-r" }, "Revenue"),
                  t("th", { class: "ta-r" }, "Cost"),
                  t("th", { class: "ta-r" }, "Profit"),
                  t("th", { class: "ta-r" }, "Margin %")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(W.value.customer_wise_profit.rows, (e) => (l(), o("tr", {
                  key: e.customer
                }, [
                  t("td", null, a(e.customer_name || e.customer), 1),
                  t("td", d3, a(e.invoice_count), 1),
                  t("td", r3, a(d(e.revenue)), 1),
                  t("td", u3, a(d(e.cost)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  t("td", c3, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Lt.value === "order" ? (l(), o(u, { key: 3 }, [
              s[695] || (s[695] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Invoiced revenue and estimated cost, rolled up by the Sales Order each invoice line references. ", -1)),
              W.value.order_wise_profit.rows.length ? (l(), o("table", m3, [
                s[694] || (s[694] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Sales Order"),
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(W.value.order_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.sales_order
                  }, [
                    t("td", null, a(e.sales_order), 1),
                    t("td", null, a(e.customer_name), 1),
                    t("td", v3, a(d(e.revenue)), 1),
                    t("td", _3, a(d(e.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", p3, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128)),
                  W.value.order_wise_profit.no_order.revenue ? (l(), o("tr", y3, [
                    s[692] || (s[692] = t("td", {
                      colspan: "2",
                      style: { color: "#94a3b8" }
                    }, "Invoices not linked to a Sales Order", -1)),
                    t("td", b3, a(d(W.value.order_wise_profit.no_order.revenue)), 1),
                    t("td", h3, a(d(W.value.order_wise_profit.no_order.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", W.value.order_wise_profit.no_order.profit >= 0 ? "green" : "red"])
                    }, a(d(W.value.order_wise_profit.no_order.profit)), 3),
                    s[693] || (s[693] = t("td", { class: "ta-r mono-sm" }, "—", -1))
                  ])) : b("", !0)
                ])
              ])) : (l(), o("div", g3, "No order-linked sales in this period."))
            ], 64)) : Lt.value === "branch" ? (l(), o(u, { key: 4 }, [
              s[697] || (s[697] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Branch doctype exists in this app — Cost Center is used as the branch grouping. ", -1)),
              W.value.branch_wise_profit.rows.length ? (l(), o("table", f3, [
                s[696] || (s[696] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Branch (Cost Center)"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(W.value.branch_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.cost_center
                  }, [
                    t("td", null, a(e.cost_center_name), 1),
                    t("td", k3, a(d(e.revenue)), 1),
                    t("td", w3, a(d(e.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", x3, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", C3, "No sales in this period."))
            ], 64)) : Lt.value === "salesperson" ? (l(), o("table", S3, [
              s[698] || (s[698] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Salesperson"),
                  t("th", { class: "ta-r" }, "Revenue"),
                  t("th", { class: "ta-r" }, "Cost"),
                  t("th", { class: "ta-r" }, "Profit"),
                  t("th", { class: "ta-r" }, "Margin %")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(W.value.salesperson_wise_profit.rows, (e) => (l(), o("tr", {
                  key: e.sales_person
                }, [
                  t("td", null, a(e.sales_person_name), 1),
                  t("td", j3, a(d(e.revenue)), 1),
                  t("td", M3, a(d(e.cost)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  t("td", D3, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Lt.value === "monthly_trend" ? (l(), o(u, { key: 6 }, [
              W.value.monthly_profit_trend.rows.length ? (l(), o("table", T3, [
                s[699] || (s[699] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Month"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(W.value.monthly_profit_trend.rows, (e) => (l(), o("tr", {
                    key: e.month
                  }, [
                    t("td", null, a(e.month), 1),
                    t("td", R3, a(d(e.revenue)), 1),
                    t("td", O3, a(d(e.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", P3, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", I3, "No sales in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", V3, a(ho.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "expense_mis" ? (l(), o("div", N3, [
          t("div", E3, [
            s[701] || (s[701] = C('<div class="bs-page-head-icon emis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="2" y="7" width="20" height="14" rx="2" data-v-94f2f87b></rect><path d="M2 10h20" data-v-94f2f87b></path><path d="M6 15h4" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Expense MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Total expenses by department and category, budget vs actual, fixed vs variable, trend and unusual/excess spend. Submitted Expense records only — Purchase Invoices and GL journal entries are not included here.</div></div>', 2)),
            t("div", B3, [
              t("div", q3, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", A3, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[186] || (s[186] = (e) => et("exportExpenseMisCSV")),
                  disabled: !U.value
                }, [...s[700] || (s[700] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, $3),
                w.value === "exportExpenseMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[187] || (s[187] = (e) => w.value = "")
                  }),
                  t("div", L3, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[188] || (s[188] = (e) => {
                        w.value = "", zo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[189] || (s[189] = (e) => {
                        w.value = "", Y(zo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", Q3, [
            (l(), o(u, null, m(Jl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Pt.value === e.key }]),
              onClick: (g) => Pt.value = e.key
            }, a(e.label), 11, F3)), 64))
          ]),
          ua.value ? (l(), o("div", H3)) : U.value ? (l(), o(u, { key: 1 }, [
            Pt.value === "summary" ? (l(), o(u, { key: 0 }, [
              s[707] || (s[707] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Submitted Expense records only (see Expenses). Purchase Invoices and GL journal entries are not included here. ", -1)),
              t("div", z3, [
                t("div", W3, [
                  s[702] || (s[702] = t("span", { class: "bucket-label" }, "Total Expenses", -1)),
                  t("span", U3, a(d(U.value.summary.total_amount)), 1)
                ]),
                t("div", K3, [
                  s[703] || (s[703] = t("span", { class: "bucket-label" }, "Net (excl. Tax)", -1)),
                  t("span", G3, a(d(U.value.summary.net_amount)), 1)
                ]),
                t("div", Y3, [
                  s[704] || (s[704] = t("span", { class: "bucket-label" }, "Tax Amount", -1)),
                  t("span", J3, a(d(U.value.summary.total_tax)), 1)
                ]),
                t("div", X3, [
                  s[705] || (s[705] = t("span", { class: "bucket-label" }, "Expense Count", -1)),
                  t("span", Z3, a(p(U.value.summary.expense_count)), 1)
                ]),
                t("div", t9, [
                  s[706] || (s[706] = t("span", { class: "bucket-label" }, "Avg Expense", -1)),
                  t("span", s9, a(d(U.value.summary.avg_expense)), 1)
                ])
              ])
            ], 64)) : Pt.value === "department" ? (l(), o(u, { key: 1 }, [
              s[709] || (s[709] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Department doctype exists in this app — Cost Center is used as the department grouping. ", -1)),
              U.value.department_wise.rows.length ? (l(), o("table", e9, [
                s[708] || (s[708] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Department (Cost Center)"),
                    t("th", { class: "ta-r" }, "Expenses"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(U.value.department_wise.rows, (e) => (l(), o("tr", {
                    key: e.cost_center
                  }, [
                    t("td", null, a(e.cost_center_name), 1),
                    t("td", a9, a(e.count), 1),
                    t("td", o9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", l9, "No expenses in this period."))
            ], 64)) : Pt.value === "category" ? (l(), o("table", n9, [
              s[710] || (s[710] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Category"),
                  t("th", { class: "ta-r" }, "Expenses"),
                  t("th", { class: "ta-r" }, "Amount"),
                  t("th", { class: "ta-r" }, "% of Total")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(U.value.category_wise.rows, (e) => (l(), o("tr", {
                  key: e.expense_type
                }, [
                  t("td", null, a(e.category_name), 1),
                  t("td", i9, a(e.count), 1),
                  t("td", d9, a(d(e.amount)), 1),
                  t("td", r9, a(e.pct_of_total.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Pt.value === "budget" ? (l(), o(u, { key: 3 }, [
              t("div", u9, " Estimated: each Cost Center's stored budget is prorated to the " + a(U.value.budget_vs_actual.period_days) + "-day selected period from its Annual/Quarterly/Monthly budget period. Cost centers with no budget set are omitted. ", 1),
              U.value.budget_vs_actual.rows.length ? (l(), o("table", c9, [
                s[711] || (s[711] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Cost Center"),
                    t("th", null, "Budget Period"),
                    t("th", { class: "ta-r" }, "Period Budget (est.)"),
                    t("th", { class: "ta-r" }, "Actual"),
                    t("th", { class: "ta-r" }, "Variance"),
                    t("th", { class: "ta-r" }, "Variance %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(U.value.budget_vs_actual.rows, (e) => (l(), o("tr", {
                    key: e.cost_center
                  }, [
                    t("td", null, a(e.cost_center_name), 1),
                    t("td", null, a(e.budget_period), 1),
                    t("td", m9, a(d(e.period_budget)), 1),
                    t("td", v9, a(d(e.actual)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance > 0 ? "red" : "green"])
                    }, a(d(e.variance)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.variance > 0 ? "red" : "green"])
                    }, a(e.variance_pct.toFixed(1)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _9, "No cost centers with a budget set."))
            ], 64)) : Pt.value === "fixed" ? (l(), o(u, { key: 4 }, [
              s[714] || (s[714] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Categorised by keyword match on the Expense Category name (rent, salary, insurance, depreciation, EMI, etc.) — no stored Fixed/Variable flag exists. ", -1)),
              t("div", p9, [
                t("div", y9, [
                  s[712] || (s[712] = t("span", { class: "bucket-label" }, "Fixed Total", -1)),
                  t("span", b9, a(d(U.value.fixed_expenses.total)), 1)
                ])
              ]),
              U.value.fixed_expenses.rows.length ? (l(), o("table", h9, [
                s[713] || (s[713] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Category"),
                    t("th", { class: "ta-r" }, "Expenses"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(U.value.fixed_expenses.rows, (e) => (l(), o("tr", {
                    key: e.expense_type
                  }, [
                    t("td", null, a(e.category_name), 1),
                    t("td", g9, a(e.count), 1),
                    t("td", f9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", k9, "No categories matched the Fixed-expense keywords in this period."))
            ], 64)) : Pt.value === "variable" ? (l(), o(u, { key: 5 }, [
              t("div", w9, [
                t("div", x9, [
                  s[715] || (s[715] = t("span", { class: "bucket-label" }, "Variable Total", -1)),
                  t("span", C9, a(d(U.value.variable_expenses.total)), 1)
                ])
              ]),
              U.value.variable_expenses.rows.length ? (l(), o("table", S9, [
                s[716] || (s[716] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Category"),
                    t("th", { class: "ta-r" }, "Expenses"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(U.value.variable_expenses.rows, (e) => (l(), o("tr", {
                    key: e.expense_type
                  }, [
                    t("td", null, a(e.category_name), 1),
                    t("td", j9, a(e.count), 1),
                    t("td", M9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", D9, "No variable-expense categories in this period."))
            ], 64)) : Pt.value === "trend" ? (l(), o(u, { key: 6 }, [
              U.value.expense_trend.rows.length ? (l(), o("table", T9, [
                s[717] || (s[717] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Month"),
                    t("th", { class: "ta-r" }, "Expenses"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(U.value.expense_trend.rows, (e) => (l(), o("tr", {
                    key: e.month
                  }, [
                    t("td", null, a(e.month), 1),
                    t("td", R9, a(e.count), 1),
                    t("td", O9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", P9, "No expenses in this period."))
            ], 64)) : Pt.value === "unusual" ? (l(), o(u, { key: 7 }, [
              s[719] || (s[719] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Individual expenses flagged as statistical outliers within their own category for this period (mean + 2x std-dev, or 2x average for thin categories). ", -1)),
              U.value.unusual_expenses.rows.length ? (l(), o("table", I9, [
                s[718] || (s[718] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Expense"),
                    t("th", null, "Date"),
                    t("th", null, "Category"),
                    t("th", null, "Department"),
                    t("th", { class: "ta-r" }, "Amount"),
                    t("th", { class: "ta-r" }, "Category Avg"),
                    t("th", null, "Basis")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(U.value.unusual_expenses.rows, (e) => (l(), o("tr", {
                    key: e.expense
                  }, [
                    t("td", null, a(e.expense), 1),
                    t("td", null, a(e.posting_date), 1),
                    t("td", null, a(e.category_name), 1),
                    t("td", null, a(e.cost_center_name || "—"), 1),
                    t("td", V9, a(d(e.amount)), 1),
                    t("td", N9, a(d(e.category_avg)), 1),
                    t("td", E9, a(e.basis), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", B9, "No unusual expenses detected in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", q9, a(go.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "payables_mis" ? (l(), o("div", A9, [
          t("div", $9, [
            s[721] || (s[721] = C('<div class="bs-page-head-icon payblmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><circle cx="12" cy="12" r="10" data-v-94f2f87b></circle><polyline points="12 6 12 12 16 14" data-v-94f2f87b></polyline></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Payables MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Supplier outstanding, payable ageing, overdue payables, amounts due this week/month, supplier-wise outstanding and payment due forecast.</div></div>', 2)),
            t("div", L9, [
              t("div", Q9, "As of " + a(P(y.value)), 1),
              t("div", F9, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[190] || (s[190] = (e) => et("exportPayablesMisCSV")),
                  disabled: !Z.value
                }, [...s[720] || (s[720] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, H9),
                w.value === "exportPayablesMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[191] || (s[191] = (e) => w.value = "")
                  }),
                  t("div", z9, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[192] || (s[192] = (e) => {
                        w.value = "", Wo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[193] || (s[193] = (e) => {
                        w.value = "", Y(Wo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", W9, [
            (l(), o(u, null, m(Xl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Qt.value === e.key }]),
              onClick: (g) => Qt.value = e.key
            }, a(e.label), 11, U9)), 64))
          ]),
          ca.value ? (l(), o("div", K9)) : Z.value ? (l(), o(u, { key: 1 }, [
            Qt.value === "summary" ? (l(), o(u, { key: 0 }, [
              t("div", G9, " As of " + a(y.value) + ". Submitted Purchase Invoices with a non-zero outstanding balance; Purchase Returns are netted in. ", 1),
              t("div", Y9, [
                t("div", J9, [
                  s[722] || (s[722] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  t("span", X9, a(d(Z.value.summary.total_outstanding)), 1)
                ]),
                t("div", Z9, [
                  s[723] || (s[723] = t("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  t("span", tx, a(d(Z.value.summary.overdue_amount)), 1)
                ]),
                t("div", sx, [
                  s[724] || (s[724] = t("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  t("span", ex, a(d(Z.value.summary.not_yet_due_amount)), 1)
                ]),
                t("div", ax, [
                  s[725] || (s[725] = t("span", { class: "bucket-label" }, "Invoices", -1)),
                  t("span", ox, a(p(Z.value.summary.invoice_count)), 1)
                ]),
                t("div", lx, [
                  s[726] || (s[726] = t("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  t("span", nx, a(p(Z.value.summary.overdue_count)), 1)
                ]),
                t("div", ix, [
                  s[727] || (s[727] = t("span", { class: "bucket-label" }, "Suppliers", -1)),
                  t("span", dx, a(p(Z.value.summary.supplier_count)), 1)
                ])
              ])
            ], 64)) : Qt.value === "ageing" ? (l(), o("table", rx, [
              s[728] || (s[728] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Supplier"),
                  t("th", { class: "ta-r" }, "Current"),
                  t("th", { class: "ta-r" }, "1-30"),
                  t("th", { class: "ta-r" }, "31-60"),
                  t("th", { class: "ta-r" }, "61-90"),
                  t("th", { class: "ta-r" }, "90+"),
                  t("th", { class: "ta-r" }, "Total")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(Z.value.payable_ageing.rows, (e) => (l(), o("tr", {
                  key: e.supplier
                }, [
                  t("td", null, a(e.supplier_name), 1),
                  t("td", ux, a(d(e.current)), 1),
                  t("td", cx, a(d(e.days_1_30)), 1),
                  t("td", mx, a(d(e.days_31_60)), 1),
                  t("td", vx, a(d(e.days_61_90)), 1),
                  t("td", _x, a(d(e.days_90_plus)), 1),
                  t("td", px, a(d(e.total)), 1)
                ]))), 128))
              ])
            ])) : Qt.value === "overdue" ? (l(), o(u, { key: 2 }, [
              Z.value.overdue_payables.rows.length ? (l(), o("table", yx, [
                s[729] || (s[729] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Invoice"),
                    t("th", null, "Supplier"),
                    t("th", null, "Due Date"),
                    t("th", { class: "ta-r" }, "Overdue Days"),
                    t("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(Z.value.overdue_payables.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    t("td", null, a(e.invoice), 1),
                    t("td", null, a(e.supplier_name), 1),
                    t("td", null, a(e.due_date), 1),
                    t("td", bx, a(e.overdue_days), 1),
                    t("td", hx, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gx, "No overdue payables as of " + a(y.value) + ".", 1))
            ], 64)) : Qt.value === "due_week" ? (l(), o(u, { key: 3 }, [
              t("div", fx, "Rolling 7 days from " + a(y.value) + ", not yet overdue.", 1),
              Z.value.due_this_week.rows.length ? (l(), o("table", kx, [
                s[730] || (s[730] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Invoice"),
                    t("th", null, "Supplier"),
                    t("th", null, "Due Date"),
                    t("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(Z.value.due_this_week.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    t("td", null, a(e.invoice), 1),
                    t("td", null, a(e.supplier_name), 1),
                    t("td", null, a(e.due_date), 1),
                    t("td", wx, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", xx, "Nothing due in the next 7 days."))
            ], 64)) : Qt.value === "due_month" ? (l(), o(u, { key: 4 }, [
              t("div", Cx, "Calendar month containing " + a(y.value) + " — can include invoices already overdue earlier this month.", 1),
              Z.value.due_this_month.rows.length ? (l(), o("table", Sx, [
                s[731] || (s[731] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Invoice"),
                    t("th", null, "Supplier"),
                    t("th", null, "Due Date"),
                    t("th", { class: "ta-r" }, "Outstanding")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(Z.value.due_this_month.rows, (e) => (l(), o("tr", {
                    key: e.invoice
                  }, [
                    t("td", null, a(e.invoice), 1),
                    t("td", null, a(e.supplier_name), 1),
                    t("td", null, a(e.due_date), 1),
                    t("td", jx, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Mx, "Nothing due this month."))
            ], 64)) : Qt.value === "supplier" ? (l(), o("table", Dx, [
              s[732] || (s[732] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "Supplier"),
                  t("th", { class: "ta-r" }, "Invoices"),
                  t("th", { class: "ta-r" }, "Outstanding"),
                  t("th", { class: "ta-r" }, "Overdue Amount"),
                  t("th", { class: "ta-r" }, "Oldest Overdue (days)")
                ])
              ], -1)),
              t("tbody", null, [
                (l(!0), o(u, null, m(Z.value.supplier_wise_outstanding.rows, (e) => (l(), o("tr", {
                  key: e.supplier
                }, [
                  t("td", null, a(e.supplier_name), 1),
                  t("td", Tx, a(e.invoice_count), 1),
                  t("td", Rx, a(d(e.outstanding)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm", e.overdue_amount ? "red" : ""])
                  }, a(d(e.overdue_amount)), 3),
                  t("td", Ox, a(e.max_overdue_days || "—"), 1)
                ]))), 128))
              ])
            ])) : Qt.value === "forecast" ? (l(), o(u, { key: 6 }, [
              t("div", Px, "Forward-looking cash-outflow view, bucketed by days until due from " + a(y.value) + ".", 1),
              t("table", Ix, [
                s[733] || (s[733] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Bucket"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(Z.value.payment_due_forecast.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    t("td", {
                      class: c(e.key === "overdue" ? "red" : "")
                    }, a(e.label), 3),
                    t("td", Vx, a(e.count), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.key === "overdue" ? "red" : ""])
                    }, a(d(e.amount)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", Nx, a(fo.value ? "No data as of this date." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "cash_bank_mis" ? (l(), o("div", Ex, [
          t("div", Bx, [
            s[735] || (s[735] = C('<div class="bs-page-head-icon cbmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="2" y="5" width="20" height="14" rx="2" data-v-94f2f87b></rect><line x1="2" y1="10" x2="22" y2="10" data-v-94f2f87b></line><line x1="6" y1="15" x2="10" y2="15" data-v-94f2f87b></line></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Cash &amp; Bank MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Cash position, bank balance, daily cash flow and bank movement, receipts, payments, cash forecast and fund requirement for the period.</div></div>', 2)),
            t("div", qx, [
              t("div", Ax, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", $x, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[194] || (s[194] = (e) => et("exportCashBankMisCSV")),
                  disabled: !E.value
                }, [...s[734] || (s[734] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, Lx),
                w.value === "exportCashBankMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[195] || (s[195] = (e) => w.value = "")
                  }),
                  t("div", Qx, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[196] || (s[196] = (e) => {
                        w.value = "", Uo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[197] || (s[197] = (e) => {
                        w.value = "", Y(Uo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", Fx, [
            (l(), o(u, null, m(Zl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: It.value === e.key }]),
              onClick: (g) => It.value = e.key
            }, a(e.label), 11, Hx)), 64))
          ]),
          ma.value ? (l(), o("div", zx)) : E.value ? (l(), o(u, { key: 1 }, [
            It.value === "cash_position" ? (l(), o(u, { key: 0 }, [
              t("div", Wx, "As of " + a(E.value.as_of_date) + ".", 1),
              t("div", Ux, [
                t("div", Kx, [
                  s[736] || (s[736] = t("span", { class: "bucket-label" }, "Total Cash", -1)),
                  t("span", Gx, a(d(E.value.cash_position.total)), 1)
                ])
              ]),
              E.value.cash_position.rows.length ? (l(), o("table", Yx, [
                s[737] || (s[737] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Account"),
                    t("th", { class: "ta-r" }, "Opening"),
                    t("th", { class: "ta-r" }, "Closing"),
                    t("th", { class: "ta-r" }, "Net Movement")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.cash_position.rows, (e) => (l(), o("tr", {
                    key: e.account
                  }, [
                    t("td", null, a(e.account_name), 1),
                    t("td", Jx, a(d(e.opening_balance)), 1),
                    t("td", Xx, a(d(e.closing_balance)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Zx, "No Cash accounts found."))
            ], 64)) : It.value === "bank_balance" ? (l(), o(u, { key: 1 }, [
              t("div", t5, "As of " + a(E.value.as_of_date) + ".", 1),
              t("div", s5, [
                t("div", e5, [
                  s[738] || (s[738] = t("span", { class: "bucket-label" }, "Total Bank", -1)),
                  t("span", a5, a(d(E.value.bank_balance.total)), 1)
                ])
              ]),
              E.value.bank_balance.rows.length ? (l(), o("table", o5, [
                s[739] || (s[739] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Account"),
                    t("th", { class: "ta-r" }, "Opening"),
                    t("th", { class: "ta-r" }, "Closing"),
                    t("th", { class: "ta-r" }, "Net Movement")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.bank_balance.rows, (e) => (l(), o("tr", {
                    key: e.account
                  }, [
                    t("td", null, a(e.account_name), 1),
                    t("td", l5, a(d(e.opening_balance)), 1),
                    t("td", n5, a(d(e.closing_balance)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", i5, "No Bank accounts found."))
            ], 64)) : It.value === "daily_cash" ? (l(), o(u, { key: 2 }, [
              t("div", d5, [
                t("div", r5, [
                  s[740] || (s[740] = t("span", { class: "bucket-label" }, "Opening", -1)),
                  t("span", u5, a(d(E.value.daily_cash_flow.opening_balance)), 1)
                ]),
                t("div", c5, [
                  s[741] || (s[741] = t("span", { class: "bucket-label" }, "Receipts", -1)),
                  t("span", m5, a(d(E.value.daily_cash_flow.total_receipts)), 1)
                ]),
                t("div", v5, [
                  s[742] || (s[742] = t("span", { class: "bucket-label" }, "Payments", -1)),
                  t("span", _5, a(d(E.value.daily_cash_flow.total_payments)), 1)
                ]),
                t("div", p5, [
                  s[743] || (s[743] = t("span", { class: "bucket-label" }, "Closing", -1)),
                  t("span", y5, a(d(E.value.daily_cash_flow.closing_balance)), 1)
                ])
              ]),
              t("table", b5, [
                s[744] || (s[744] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Date"),
                    t("th", { class: "ta-r" }, "Receipts"),
                    t("th", { class: "ta-r" }, "Payments"),
                    t("th", { class: "ta-r" }, "Net"),
                    t("th", { class: "ta-r" }, "Balance")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.daily_cash_flow.days, (e) => (l(), o("tr", {
                    key: e.date
                  }, [
                    t("td", null, a(e.date), 1),
                    t("td", h5, a(d(e.receipts)), 1),
                    t("td", g5, a(d(e.payments)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    t("td", f5, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : It.value === "daily_bank" ? (l(), o(u, { key: 3 }, [
              t("div", k5, [
                t("div", w5, [
                  s[745] || (s[745] = t("span", { class: "bucket-label" }, "Opening", -1)),
                  t("span", x5, a(d(E.value.daily_bank_movement.opening_balance)), 1)
                ]),
                t("div", C5, [
                  s[746] || (s[746] = t("span", { class: "bucket-label" }, "Deposits", -1)),
                  t("span", S5, a(d(E.value.daily_bank_movement.total_receipts)), 1)
                ]),
                t("div", j5, [
                  s[747] || (s[747] = t("span", { class: "bucket-label" }, "Withdrawals", -1)),
                  t("span", M5, a(d(E.value.daily_bank_movement.total_payments)), 1)
                ]),
                t("div", D5, [
                  s[748] || (s[748] = t("span", { class: "bucket-label" }, "Closing", -1)),
                  t("span", T5, a(d(E.value.daily_bank_movement.closing_balance)), 1)
                ])
              ]),
              t("table", R5, [
                s[749] || (s[749] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Date"),
                    t("th", { class: "ta-r" }, "Deposits"),
                    t("th", { class: "ta-r" }, "Withdrawals"),
                    t("th", { class: "ta-r" }, "Net"),
                    t("th", { class: "ta-r" }, "Balance")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.daily_bank_movement.days, (e) => (l(), o("tr", {
                    key: e.date
                  }, [
                    t("td", null, a(e.date), 1),
                    t("td", O5, a(d(e.receipts)), 1),
                    t("td", P5, a(d(e.payments)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    t("td", I5, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : It.value === "receipts" ? (l(), o(u, { key: 4 }, [
              t("div", V5, [
                t("div", N5, [
                  s[750] || (s[750] = t("span", { class: "bucket-label" }, "Total Receipts", -1)),
                  t("span", E5, a(d(E.value.receipts.total)), 1)
                ])
              ]),
              E.value.receipts.rows.length ? (l(), o("table", B5, [
                s[751] || (s[751] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Reference"),
                    t("th", null, "Date"),
                    t("th", null, "Party"),
                    t("th", null, "Account"),
                    t("th", null, "Mode"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.receipts.rows, (e) => (l(), o("tr", {
                    key: e.reference
                  }, [
                    t("td", null, a(e.reference), 1),
                    t("td", null, a(e.date), 1),
                    t("td", null, a(e.party_name || e.party || "—"), 1),
                    t("td", null, a(e.account), 1),
                    t("td", null, a(e.mode_of_payment || "—"), 1),
                    t("td", q5, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", A5, "No receipts in this period."))
            ], 64)) : It.value === "payments" ? (l(), o(u, { key: 5 }, [
              s[754] || (s[754] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Includes both Payment Entry (Pay) and Expense records paid directly from a Cash/Bank account. ", -1)),
              t("div", $5, [
                t("div", L5, [
                  s[752] || (s[752] = t("span", { class: "bucket-label" }, "Total Payments", -1)),
                  t("span", Q5, a(d(E.value.payments.total)), 1)
                ])
              ]),
              E.value.payments.rows.length ? (l(), o("table", F5, [
                s[753] || (s[753] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Reference"),
                    t("th", null, "Date"),
                    t("th", null, "Party"),
                    t("th", null, "Account"),
                    t("th", null, "Source"),
                    t("th", { class: "ta-r" }, "Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.payments.rows, (e) => (l(), o("tr", {
                    key: e.source + e.reference
                  }, [
                    t("td", null, a(e.reference), 1),
                    t("td", null, a(e.date), 1),
                    t("td", null, a(e.party_name || e.party || "—"), 1),
                    t("td", null, a(e.account), 1),
                    t("td", null, a(e.source), 1),
                    t("td", H5, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", z5, "No payments in this period."))
            ], 64)) : It.value === "forecast" ? (l(), o(u, { key: 6 }, [
              t("div", W5, " Projected from the current Cash + Bank position (" + a(d(E.value.cash_forecast.current_position)) + "), assuming every outstanding invoice settles on its due date. ", 1),
              t("table", U5, [
                s[755] || (s[755] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Bucket"),
                    t("th", { class: "ta-r" }, "Expected Inflow"),
                    t("th", { class: "ta-r" }, "Expected Outflow"),
                    t("th", { class: "ta-r" }, "Net"),
                    t("th", { class: "ta-r" }, "Projected Balance")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.cash_forecast.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    t("td", {
                      class: c(e.key === "overdue" ? "red" : "")
                    }, a(e.label), 3),
                    t("td", K5, a(d(e.inflow)), 1),
                    t("td", G5, a(d(e.outflow)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.projected_balance >= 0 ? "" : "red"])
                    }, a(d(e.projected_balance)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : It.value === "fund_requirement" ? (l(), o(u, { key: 7 }, [
              t("div", Y5, [
                t("div", J5, [
                  s[756] || (s[756] = t("span", { class: "bucket-label" }, "Peak Fund Requirement", -1)),
                  t("span", {
                    class: c(["mis-summary-val", E.value.fund_requirement.peak_requirement > 0 ? "red" : "green"])
                  }, a(d(E.value.fund_requirement.peak_requirement)), 3)
                ])
              ]),
              E.value.fund_requirement.rows.length ? (l(), o("table", X5, [
                s[757] || (s[757] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Bucket"),
                    t("th", { class: "ta-r" }, "Shortfall")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(E.value.fund_requirement.rows, (e) => (l(), o("tr", {
                    key: e.key
                  }, [
                    t("td", Z5, a(e.label), 1),
                    t("td", tC, a(d(e.shortfall)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", sC, "No projected shortfall — the current Cash + Bank position covers the forecast."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", eC, a(ko.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "customer_mis" ? (l(), o("div", aC, [
          t("div", oC, [
            s[759] || (s[759] = C('<div class="bs-page-head-icon custmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-94f2f87b></path><circle cx="9" cy="7" r="4" data-v-94f2f87b></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-94f2f87b></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Customer MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>New, active, repeat and inactive customers, customer-wise sales/outstanding/profit, retention rate, and top customers for the period.</div></div>', 2)),
            t("div", lC, [
              t("div", nC, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", iC, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[198] || (s[198] = (e) => et("exportCustomerMisCSV")),
                  disabled: !D.value
                }, [...s[758] || (s[758] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, dC),
                w.value === "exportCustomerMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[199] || (s[199] = (e) => w.value = "")
                  }),
                  t("div", rC, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[200] || (s[200] = (e) => {
                        w.value = "", Ko();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[201] || (s[201] = (e) => {
                        w.value = "", Y(Ko);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", uC, [
            (l(), o(u, null, m(tn, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Ct.value === e.key }]),
              onClick: (g) => Ct.value = e.key
            }, a(e.label), 11, cC)), 64))
          ]),
          va.value ? (l(), o("div", mC)) : D.value ? (l(), o(u, { key: 1 }, [
            t("div", vC, [
              t("div", _C, [
                s[760] || (s[760] = t("span", { class: "bucket-label" }, "Total Customers", -1)),
                t("span", pC, a(p(D.value.summary.total_customers)), 1)
              ]),
              t("div", yC, [
                s[761] || (s[761] = t("span", { class: "bucket-label" }, "Active Customers", -1)),
                t("span", bC, a(p(D.value.summary.active_count)), 1)
              ]),
              t("div", hC, [
                s[762] || (s[762] = t("span", { class: "bucket-label" }, "Active Revenue", -1)),
                t("span", gC, a(d(D.value.summary.active_revenue)), 1)
              ]),
              t("div", fC, [
                s[763] || (s[763] = t("span", { class: "bucket-label" }, "New Customers", -1)),
                t("span", kC, a(p(D.value.summary.new_count)), 1)
              ]),
              t("div", wC, [
                s[764] || (s[764] = t("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                t("span", xC, a(p(D.value.summary.repeat_count)), 1)
              ]),
              t("div", CC, [
                s[765] || (s[765] = t("span", { class: "bucket-label" }, "Repeat Revenue", -1)),
                t("span", SC, a(d(D.value.summary.repeat_revenue)), 1)
              ]),
              t("div", jC, [
                s[766] || (s[766] = t("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                t("span", MC, a(p(D.value.summary.inactive_count)), 1)
              ]),
              t("div", DC, [
                s[767] || (s[767] = t("span", { class: "bucket-label" }, "Retention Rate", -1)),
                t("span", TC, a(Number(D.value.summary.retention_pct).toFixed(1)) + "%", 1)
              ]),
              t("div", RC, [
                s[768] || (s[768] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                t("span", OC, a(d(D.value.summary.total_outstanding)), 1)
              ]),
              t("div", PC, [
                s[769] || (s[769] = t("span", { class: "bucket-label" }, "Total Profit", -1)),
                t("span", {
                  class: c(["mis-summary-val", D.value.summary.total_profit >= 0 ? "green" : "red"])
                }, a(d(D.value.summary.total_profit)), 3)
              ])
            ]),
            Ct.value === "new_customers" ? (l(), o(u, { key: 0 }, [
              t("div", IC, [
                t("div", VC, [
                  s[770] || (s[770] = t("span", { class: "bucket-label" }, "New Customers", -1)),
                  t("span", NC, a(D.value.new_customers.count), 1)
                ])
              ]),
              D.value.new_customers.rows.length ? (l(), o("table", EC, [
                s[771] || (s[771] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", null, "First Invoice Date"),
                    t("th", { class: "ta-r" }, "Invoices in Period"),
                    t("th", { class: "ta-r" }, "Revenue in Period")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.new_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.first_invoice_date), 1),
                    t("td", BC, a(e.invoice_count), 1),
                    t("td", qC, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", AC, "No new customers in this period."))
            ], 64)) : Ct.value === "active_customers" ? (l(), o(u, { key: 1 }, [
              t("div", $C, [
                t("div", LC, [
                  s[772] || (s[772] = t("span", { class: "bucket-label" }, "Active Customers", -1)),
                  t("span", QC, a(D.value.active_customers.count), 1)
                ]),
                t("div", FC, [
                  s[773] || (s[773] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", HC, a(d(D.value.active_customers.total)), 1)
                ])
              ]),
              D.value.active_customers.rows.length ? (l(), o("table", zC, [
                s[774] || (s[774] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", null, "First Invoice"),
                    t("th", null, "Last Invoice")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.active_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", WC, a(e.invoice_count), 1),
                    t("td", UC, a(d(e.total_amount)), 1),
                    t("td", null, a(e.first_invoice_in_period), 1),
                    t("td", null, a(e.last_invoice_in_period), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", KC, "No active customers in this period."))
            ], 64)) : Ct.value === "repeat_customers" ? (l(), o(u, { key: 2 }, [
              t("div", GC, [
                t("div", YC, [
                  s[775] || (s[775] = t("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                  t("span", JC, a(D.value.repeat_customers.count), 1)
                ]),
                t("div", XC, [
                  s[776] || (s[776] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", ZC, a(d(D.value.repeat_customers.total)), 1)
                ])
              ]),
              D.value.repeat_customers.rows.length ? (l(), o("table", tS, [
                s[777] || (s[777] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.repeat_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", sS, a(e.invoice_count), 1),
                    t("td", eS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", aS, "No repeat customers in this period."))
            ], 64)) : Ct.value === "customer_wise_sales" ? (l(), o(u, { key: 3 }, [
              D.value.customer_wise_sales.rows.length ? (l(), o("table", oS, [
                s[778] || (s[778] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Net Total"),
                    t("th", { class: "ta-r" }, "Discount"),
                    t("th", { class: "ta-r" }, "Tax"),
                    t("th", { class: "ta-r" }, "Total"),
                    t("th", { class: "ta-r" }, "Outstanding"),
                    t("th", { class: "ta-r" }, "Avg Invoice Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.customer_wise_sales.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", lS, a(e.invoice_count), 1),
                    t("td", nS, a(d(e.net_total)), 1),
                    t("td", iS, a(d(e.total_discount)), 1),
                    t("td", dS, a(d(e.total_tax)), 1),
                    t("td", rS, a(d(e.total_amount)), 1),
                    t("td", uS, a(d(e.outstanding_amount)), 1),
                    t("td", cS, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", mS, "No sales in this period."))
            ], 64)) : Ct.value === "customer_wise_outstanding" ? (l(), o(u, { key: 4 }, [
              t("div", vS, [
                t("div", _S, [
                  s[779] || (s[779] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  t("span", pS, a(d(D.value.customer_wise_outstanding.total)), 1)
                ])
              ]),
              D.value.customer_wise_outstanding.rows.length ? (l(), o("table", yS, [
                s[780] || (s[780] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Outstanding"),
                    t("th", null, "Oldest Due Date"),
                    t("th", { class: "ta-r" }, "Max Overdue Days")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.customer_wise_outstanding.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", bS, a(e.invoice_count), 1),
                    t("td", hS, a(d(e.outstanding_amount)), 1),
                    t("td", null, a(e.oldest_due_date), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gS, "No outstanding balances."))
            ], 64)) : Ct.value === "customer_wise_profit" ? (l(), o(u, { key: 5 }, [
              t("div", fS, [
                t("div", kS, [
                  s[781] || (s[781] = t("span", { class: "bucket-label" }, "Total Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", D.value.customer_wise_profit.total >= 0 ? "green" : "red"])
                  }, a(d(D.value.customer_wise_profit.total)), 3)
                ])
              ]),
              D.value.customer_wise_profit.rows.length ? (l(), o("table", wS, [
                s[782] || (s[782] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Revenue"),
                    t("th", { class: "ta-r" }, "Cost"),
                    t("th", { class: "ta-r" }, "Profit"),
                    t("th", { class: "ta-r" }, "Margin %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.customer_wise_profit.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", xS, a(e.invoice_count), 1),
                    t("td", CS, a(d(e.revenue)), 1),
                    t("td", SS, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", jS, a(Number(e.margin_pct).toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", MS, "No profit data for this period."))
            ], 64)) : Ct.value === "customer_retention" ? (l(), o(u, { key: 6 }, [
              t("div", DS, " Comparing " + a(D.value.customer_retention.prev_from) + " – " + a(D.value.customer_retention.prev_to) + " (prior period) to the selected period. ", 1),
              t("div", TS, [
                t("div", RS, [
                  s[783] || (s[783] = t("span", { class: "bucket-label" }, "Retention Rate", -1)),
                  t("span", OS, a(Number(D.value.customer_retention.retention_pct).toFixed(1)) + "%", 1)
                ]),
                t("div", PS, [
                  s[784] || (s[784] = t("span", { class: "bucket-label" }, "Retained", -1)),
                  t("span", IS, a(D.value.customer_retention.retained_count), 1)
                ]),
                t("div", VS, [
                  s[785] || (s[785] = t("span", { class: "bucket-label" }, "Churned", -1)),
                  t("span", NS, a(D.value.customer_retention.churned_count), 1)
                ]),
                t("div", ES, [
                  s[786] || (s[786] = t("span", { class: "bucket-label" }, "New", -1)),
                  t("span", BS, a(D.value.customer_retention.new_count), 1)
                ])
              ]),
              D.value.customer_retention.rows.length ? (l(), o("table", qS, [
                s[787] || (s[787] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", null, "Status")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.customer_retention.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", {
                      class: c(e.status === "Retained" ? "green" : e.status === "Churned" ? "red" : "")
                    }, a(e.status), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", AS, "No customer activity to compare."))
            ], 64)) : Ct.value === "top_customers" ? (l(), o(u, { key: 7 }, [
              D.value.top_customers.rows.length ? (l(), o("table", $S, [
                s[788] || (s[788] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "#"),
                    t("th", null, "Customer"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Revenue")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.top_customers.rows, (e, g) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(g + 1), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", LS, a(e.invoice_count), 1),
                    t("td", QS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", FS, "No sales in this period."))
            ], 64)) : Ct.value === "inactive_customers" ? (l(), o(u, { key: 8 }, [
              t("div", HS, [
                t("div", zS, [
                  s[789] || (s[789] = t("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                  t("span", WS, a(D.value.inactive_customers.count), 1)
                ])
              ]),
              D.value.inactive_customers.rows.length ? (l(), o("table", US, [
                s[790] || (s[790] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Customer"),
                    t("th", null, "Last Invoice Date"),
                    t("th", { class: "ta-r" }, "Days Inactive"),
                    t("th", { class: "ta-r" }, "Lifetime Invoices"),
                    t("th", { class: "ta-r" }, "Lifetime Revenue")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(D.value.inactive_customers.rows, (e) => (l(), o("tr", {
                    key: e.customer
                  }, [
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.last_invoice_date), 1),
                    t("td", KS, a(e.days_inactive), 1),
                    t("td", GS, a(e.invoice_count), 1),
                    t("td", YS, a(d(e.lifetime_revenue)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", JS, "No inactive customers found."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", XS, a(wo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "supplier_mis" ? (l(), o("div", ZS, [
          t("div", tj, [
            s[792] || (s[792] = C('<div class="bs-page-head-icon suppmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><rect x="1" y="3" width="15" height="13" data-v-94f2f87b></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-94f2f87b></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-94f2f87b></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-94f2f87b></circle></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Supplier MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>Supplier-wise purchase and outstanding, payment ageing, price comparison, delivery/supplier performance and quality/rejection for the period.</div></div>', 2)),
            t("div", sj, [
              t("div", ej, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", aj, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[202] || (s[202] = (e) => et("exportSupplierMisCSV")),
                  disabled: !$.value
                }, [...s[791] || (s[791] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, oj),
                w.value === "exportSupplierMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[203] || (s[203] = (e) => w.value = "")
                  }),
                  t("div", lj, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[204] || (s[204] = (e) => {
                        w.value = "", Go();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[205] || (s[205] = (e) => {
                        w.value = "", Y(Go);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", nj, [
            (l(), o(u, null, m(sn, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Ft.value === e.key }]),
              onClick: (g) => Ft.value = e.key
            }, a(e.label), 11, ij)), 64))
          ]),
          _a.value ? (l(), o("div", dj)) : $.value ? (l(), o(u, { key: 1 }, [
            Ft.value === "supplier_wise_purchase" ? (l(), o(u, { key: 0 }, [
              t("div", rj, [
                t("div", uj, [
                  s[793] || (s[793] = t("span", { class: "bucket-label" }, "Total Purchase", -1)),
                  t("span", cj, a(d($.value.supplier_wise_purchase.total)), 1)
                ])
              ]),
              $.value.supplier_wise_purchase.rows.length ? (l(), o("table", mj, [
                s[794] || (s[794] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Net Total"),
                    t("th", { class: "ta-r" }, "Discount"),
                    t("th", { class: "ta-r" }, "Tax"),
                    t("th", { class: "ta-r" }, "Total"),
                    t("th", { class: "ta-r" }, "Outstanding"),
                    t("th", { class: "ta-r" }, "Avg Invoice Value")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_wise_purchase.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", vj, a(e.invoice_count), 1),
                    t("td", _j, a(d(e.net_total)), 1),
                    t("td", pj, a(d(e.total_discount)), 1),
                    t("td", yj, a(d(e.total_tax)), 1),
                    t("td", bj, a(d(e.total_amount)), 1),
                    t("td", hj, a(d(e.outstanding_amount)), 1),
                    t("td", gj, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fj, "No purchases in this period."))
            ], 64)) : Ft.value === "supplier_outstanding" ? (l(), o(u, { key: 1 }, [
              t("div", kj, [
                t("div", wj, [
                  s[795] || (s[795] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  t("span", xj, a(d($.value.supplier_outstanding.total)), 1)
                ])
              ]),
              $.value.supplier_outstanding.rows.length ? (l(), o("table", Cj, [
                s[796] || (s[796] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Outstanding"),
                    t("th", { class: "ta-r" }, "Overdue Amount"),
                    t("th", { class: "ta-r" }, "Max Overdue Days")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_outstanding.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", Sj, a(e.invoice_count), 1),
                    t("td", jj, a(d(e.outstanding_amount)), 1),
                    t("td", Mj, a(d(e.overdue_amount)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Dj, "No outstanding balances."))
            ], 64)) : Ft.value === "supplier_payment_ageing" ? (l(), o(u, { key: 2 }, [
              $.value.supplier_payment_ageing.rows.length ? (l(), o("table", Tj, [
                s[797] || (s[797] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Current"),
                    t("th", { class: "ta-r" }, "1-30"),
                    t("th", { class: "ta-r" }, "31-60"),
                    t("th", { class: "ta-r" }, "61-90"),
                    t("th", { class: "ta-r" }, "90+"),
                    t("th", { class: "ta-r" }, "Total")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_payment_ageing.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", Rj, a(d(e.current)), 1),
                    t("td", Oj, a(d(e.days_1_30)), 1),
                    t("td", Pj, a(d(e.days_31_60)), 1),
                    t("td", Ij, a(d(e.days_61_90)), 1),
                    t("td", Vj, a(d(e.days_90_plus)), 1),
                    t("td", Nj, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Ej, "No outstanding balances."))
            ], 64)) : Ft.value === "purchase_price_comparison" ? (l(), o(u, { key: 3 }, [
              t("div", Bj, a($.value.purchase_price_comparison.multi_supplier_item_count) + " item(s) were purchased from more than one supplier in this period. ", 1),
              $.value.purchase_price_comparison.rows.length ? (l(), o("table", qj, [
                s[798] || (s[798] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Item"),
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Qty"),
                    t("th", { class: "ta-r" }, "Avg Rate"),
                    t("th", { class: "ta-r" }, "Vs Lowest"),
                    t("th", null, "Best Price")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.purchase_price_comparison.rows, (e, g) => (l(), o("tr", {
                    key: e.item_code + e.supplier
                  }, [
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", Aj, a(e.qty), 1),
                    t("td", $j, a(d(e.avg_rate)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.is_lowest ? "green" : "red"])
                    }, a(e.is_lowest ? "—" : "+" + Number(e.variance_vs_lowest_pct).toFixed(1) + "%"), 3),
                    t("td", null, [
                      e.is_lowest && e.supplier_count > 1 ? (l(), o("span", Lj, "Lowest")) : b("", !0)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", Qj, "No purchases in this period."))
            ], 64)) : Ft.value === "supplier_performance" ? (l(), o(u, { key: 4 }, [
              $.value.supplier_performance.rows.length ? (l(), o("table", Fj, [
                s[799] || (s[799] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Purchase Amount"),
                    t("th", { class: "ta-r" }, "Outstanding"),
                    t("th", { class: "ta-r" }, "On-time Delivery %"),
                    t("th", { class: "ta-r" }, "Rejection %"),
                    t("th", { class: "ta-r" }, "Avg Price Variance %"),
                    t("th", { class: "ta-r" }, "Score")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.supplier_performance.rows, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", Hj, a(d(e.total_purchase_amount)), 1),
                    t("td", zj, a(d(e.outstanding_amount)), 1),
                    t("td", Wj, a(e.on_time_delivery_pct != null ? Number(e.on_time_delivery_pct).toFixed(1) + "%" : "—"), 1),
                    t("td", Uj, a(e.rejection_pct != null ? Number(e.rejection_pct).toFixed(1) + "%" : "—"), 1),
                    t("td", Kj, a(e.avg_price_variance_pct != null ? Number(e.avg_price_variance_pct).toFixed(1) + "%" : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score != null ? Number(e.performance_score).toFixed(0) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Gj, "No supplier activity in this period."))
            ], 64)) : Ft.value === "delivery_performance" ? (l(), o(u, { key: 5 }, [
              t("div", Yj, [
                t("div", Jj, [
                  s[800] || (s[800] = t("span", { class: "bucket-label" }, "On-time %", -1)),
                  t("span", Xj, a(Number($.value.delivery_performance.summary.on_time_pct).toFixed(1)) + "%", 1)
                ]),
                t("div", Zj, [
                  s[801] || (s[801] = t("span", { class: "bucket-label" }, "On-time", -1)),
                  t("span", tM, a($.value.delivery_performance.summary.on_time_count), 1)
                ]),
                t("div", sM, [
                  s[802] || (s[802] = t("span", { class: "bucket-label" }, "Late", -1)),
                  t("span", eM, a($.value.delivery_performance.summary.late_count), 1)
                ]),
                t("div", aM, [
                  s[803] || (s[803] = t("span", { class: "bucket-label" }, "No PO Reference", -1)),
                  t("span", oM, a($.value.delivery_performance.summary.undated_count), 1)
                ])
              ]),
              s[806] || (s[806] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.delivery_performance.by_supplier.length ? (l(), o("table", lM, [
                s[804] || (s[804] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Receipts"),
                    t("th", { class: "ta-r" }, "On-time"),
                    t("th", { class: "ta-r" }, "Late"),
                    t("th", { class: "ta-r" }, "On-time %"),
                    t("th", { class: "ta-r" }, "Avg Delay (days)")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.delivery_performance.by_supplier, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", nM, a(e.receipt_count), 1),
                    t("td", iM, a(e.on_time_count), 1),
                    t("td", dM, a(e.late_count), 1),
                    t("td", rM, a(Number(e.on_time_pct).toFixed(1)) + "%", 1),
                    t("td", uM, a(Number(e.avg_delay_days).toFixed(1)), 1)
                  ]))), 128))
                ])
              ])) : b("", !0),
              s[807] || (s[807] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "Receipts", -1)),
              $.value.delivery_performance.rows.length ? (l(), o("table", cM, [
                s[805] || (s[805] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Receipt"),
                    t("th", null, "Supplier"),
                    t("th", null, "Received Date"),
                    t("th", null, "Expected Date"),
                    t("th", { class: "ta-r" }, "Delay (days)"),
                    t("th", null, "Status")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.delivery_performance.rows, (e) => (l(), o("tr", {
                    key: e.receipt
                  }, [
                    t("td", null, a(e.receipt), 1),
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", null, a(e.received_date), 1),
                    t("td", null, a(e.expected_date || "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.has_reference && !e.on_time ? "red" : ""])
                    }, a(e.has_reference ? e.delay_days : "—"), 3),
                    t("td", {
                      class: c(e.has_reference ? e.on_time ? "green" : "red" : "")
                    }, a(e.has_reference ? e.on_time ? "On-time" : "Late" : "No PO Ref"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", mM, "No receipts in this period."))
            ], 64)) : Ft.value === "quality_rejection" ? (l(), o(u, { key: 6 }, [
              t("div", vM, [
                t("div", _M, [
                  s[808] || (s[808] = t("span", { class: "bucket-label" }, "Received Qty", -1)),
                  t("span", pM, a($.value.quality_rejection.summary.total_received_qty), 1)
                ]),
                t("div", yM, [
                  s[809] || (s[809] = t("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  t("span", bM, a($.value.quality_rejection.summary.total_rejected_qty), 1)
                ]),
                t("div", hM, [
                  s[810] || (s[810] = t("span", { class: "bucket-label" }, "Rejection %", -1)),
                  t("span", gM, a(Number($.value.quality_rejection.summary.overall_rejection_pct).toFixed(2)) + "%", 1)
                ])
              ]),
              s[813] || (s[813] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.quality_rejection.by_supplier.length ? (l(), o("table", fM, [
                s[811] || (s[811] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", { class: "ta-r" }, "Received Qty"),
                    t("th", { class: "ta-r" }, "Accepted Qty"),
                    t("th", { class: "ta-r" }, "Rejected Qty"),
                    t("th", { class: "ta-r" }, "Rejection %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.quality_rejection.by_supplier, (e) => (l(), o("tr", {
                    key: e.supplier
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", kM, a(e.received_qty), 1),
                    t("td", wM, a(e.accepted_qty), 1),
                    t("td", xM, a(e.rejected_qty), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : b("", !0),
              s[814] || (s[814] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Item", -1)),
              $.value.quality_rejection.rows.length ? (l(), o("table", CM, [
                s[812] || (s[812] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Supplier"),
                    t("th", null, "Item"),
                    t("th", { class: "ta-r" }, "Received Qty"),
                    t("th", { class: "ta-r" }, "Accepted Qty"),
                    t("th", { class: "ta-r" }, "Rejected Qty"),
                    t("th", { class: "ta-r" }, "Rejection %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m($.value.quality_rejection.rows, (e, g) => (l(), o("tr", {
                    key: e.supplier + e.item_code + g
                  }, [
                    t("td", null, a(e.supplier_name || e.supplier), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", SM, a(e.received_qty), 1),
                    t("td", jM, a(e.accepted_qty), 1),
                    t("td", MM, a(e.rejected_qty), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", DM, "No receipts in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", TM, a(xo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0),
        f.value === "employee_mis" ? (l(), o("div", RM, [
          t("div", OM, [
            s[816] || (s[816] = C('<div class="bs-page-head-icon empmis-page-head-icon" data-v-94f2f87b><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-94f2f87b></path><circle cx="9" cy="7" r="4" data-v-94f2f87b></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-94f2f87b></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-94f2f87b></path></svg></div><div class="bs-page-head-text" data-v-94f2f87b><div class="bs-page-head-title" data-v-94f2f87b>Employee / Performance MIS</div><div class="bs-page-head-sub" data-v-94f2f87b>This app has no HR/Payroll module — figures below are built from Job Card time logs and Sales Person records, so they only cover employees who had time logged or are set up as a Sales Person.</div></div>', 2)),
            t("div", PM, [
              t("div", IM, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", VM, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[206] || (s[206] = (e) => et("exportEmployeeMisCSV")),
                  disabled: !L.value
                }, [...s[815] || (s[815] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-94f2f87b></path><polyline points="7 10 12 15 17 10" data-v-94f2f87b></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-94f2f87b></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-94f2f87b><polyline points="6 9 12 15 18 9" data-v-94f2f87b></polyline></svg>', 3)
                ])], 8, NM),
                w.value === "exportEmployeeMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[207] || (s[207] = (e) => w.value = "")
                  }),
                  t("div", EM, [
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[208] || (s[208] = (e) => {
                        w.value = "", Yo();
                      })
                    }, "Download CSV"),
                    t("button", {
                      class: "iws-menu-item",
                      onClick: s[209] || (s[209] = (e) => {
                        w.value = "", Y(Yo);
                      })
                    }, "Download Excel")
                  ])
                ], 64)) : b("", !0)
              ])
            ])
          ]),
          t("div", BM, [
            (l(), o(u, null, m(en, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Vt.value === e.key }]),
              onClick: (g) => Vt.value = e.key
            }, a(e.label), 11, qM)), 64))
          ]),
          pa.value ? (l(), o("div", AM)) : L.value ? (l(), o(u, { key: 1 }, [
            Vt.value === "employee_attendance" ? (l(), o(u, { key: 0 }, [
              t("div", $M, ' Proxy: a day counts as "present" if the employee has any Job Card time log on that date. ' + a(L.value.period_days) + "-day period. ", 1),
              L.value.employee_attendance.rows.length ? (l(), o("table", LM, [
                s[817] || (s[817] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Employee"),
                    t("th", { class: "ta-r" }, "Present Days"),
                    t("th", { class: "ta-r" }, "Attendance %"),
                    t("th", { class: "ta-r" }, "Total Hours"),
                    t("th", { class: "ta-r" }, "Avg Hrs/Day")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.employee_attendance.rows, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    t("td", null, a(e.employee), 1),
                    t("td", QM, a(e.present_days) + " / " + a(e.period_days), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.attendance_pct >= 80 ? "green" : "red"])
                    }, a(e.attendance_pct) + "%", 3),
                    t("td", FM, a(e.total_hours), 1),
                    t("td", HM, a(e.avg_hours_per_day), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zM, "No Job Card time logs in this period."))
            ], 64)) : Vt.value === "department_manpower" ? (l(), o(u, { key: 1 }, [
              s[820] || (s[820] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Sales Person is the only doctype in this app with a department field, so this reflects active Sales Persons only. ", -1)),
              t("div", WM, [
                t("div", UM, [
                  s[818] || (s[818] = t("span", { class: "bucket-label" }, "Total Headcount", -1)),
                  t("span", KM, a(L.value.department_manpower.total_headcount), 1)
                ])
              ]),
              L.value.department_manpower.rows.length ? (l(), o("table", GM, [
                s[819] || (s[819] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Department"),
                    t("th", { class: "ta-r" }, "Headcount"),
                    t("th", null, "Employees")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.department_manpower.rows, (e) => (l(), o("tr", {
                    key: e.department
                  }, [
                    t("td", null, a(e.department), 1),
                    t("td", YM, a(e.headcount), 1),
                    t("td", JM, a(e.employees.map((g) => g.sales_person_name).join(", ")), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", XM, "No active Sales Persons set up."))
            ], 64)) : Vt.value === "salesperson_target" ? (l(), o(u, { key: 2 }, [
              s[824] || (s[824] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No target is stored — enter a target per salesperson to compare against actual sales for this period. ", -1)),
              t("div", ZM, [
                t("div", tD, [
                  s[821] || (s[821] = t("span", { class: "bucket-label" }, "Total Achieved", -1)),
                  t("span", sD, a(d(L.value.salesperson_achievement.total_achieved)), 1)
                ]),
                t("div", eD, [
                  s[822] || (s[822] = t("span", { class: "bucket-label" }, "Sales with No Salesperson", -1)),
                  t("span", aD, a(d(L.value.salesperson_achievement.unassigned_sales)), 1)
                ])
              ]),
              L.value.salesperson_achievement.rows.length ? (l(), o("table", oD, [
                s[823] || (s[823] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Salesperson"),
                    t("th", { class: "ta-r" }, "Invoices"),
                    t("th", { class: "ta-r" }, "Achieved"),
                    t("th", { class: "ta-r" }, "Target (KES)"),
                    t("th", { class: "ta-r" }, "Achievement %")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.salesperson_achievement.rows, (e) => (l(), o("tr", {
                    key: e.sales_person
                  }, [
                    t("td", null, a(e.sales_person_name || e.sales_person), 1),
                    t("td", lD, a(e.invoice_count), 1),
                    t("td", nD, a(d(e.total_amount)), 1),
                    t("td", iD, [
                      Et(t("input", {
                        type: "number",
                        "onUpdate:modelValue": (g) => Ws.value[e.sales_person] = g,
                        class: "dr-input",
                        style: { width: "110px", "text-align": "right" },
                        min: "0"
                      }, null, 8, dD), [
                        [
                          Gt,
                          Ws.value[e.sales_person],
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", ya(e) >= 100 ? "green" : "red"])
                    }, a(Ws.value[e.sales_person] ? ya(e).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", rD, "No sales attributed to a salesperson in this period."))
            ], 64)) : Vt.value === "salesperson_collection" ? (l(), o(u, { key: 3 }, [
              t("div", uD, [
                t("div", cD, [
                  s[825] || (s[825] = t("span", { class: "bucket-label" }, "Total Collected", -1)),
                  t("span", mD, a(d(L.value.salesperson_collection.total_collected)), 1)
                ])
              ]),
              L.value.salesperson_collection.rows.length ? (l(), o("table", vD, [
                s[826] || (s[826] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Salesperson"),
                    t("th", { class: "ta-r" }, "Payments"),
                    t("th", { class: "ta-r" }, "Collected Amount")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.salesperson_collection.rows, (e) => (l(), o("tr", {
                    key: e.sales_person
                  }, [
                    t("td", null, a(e.sales_person_name || e.sales_person), 1),
                    t("td", _D, a(e.payment_count), 1),
                    t("td", pD, a(d(e.collected_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", yD, "No collections attributed to a salesperson in this period."))
            ], 64)) : Vt.value === "production_productivity" ? (l(), o(u, { key: 4 }, [
              t("div", bD, [
                t("div", hD, [
                  s[827] || (s[827] = t("span", { class: "bucket-label" }, "Team Avg Qty/Hour", -1)),
                  t("span", gD, a(L.value.production_productivity.team_avg_qty_per_hour), 1)
                ])
              ]),
              L.value.production_productivity.rows.length ? (l(), o("table", fD, [
                s[828] || (s[828] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Employee"),
                    t("th", { class: "ta-r" }, "Job Cards"),
                    t("th", { class: "ta-r" }, "Hours"),
                    t("th", { class: "ta-r" }, "Qty Produced"),
                    t("th", { class: "ta-r" }, "Avg Time/Unit (min)"),
                    t("th", { class: "ta-r" }, "Qty/Hour")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.production_productivity.rows, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    t("td", null, a(e.employee), 1),
                    t("td", kD, a(e.job_card_count), 1),
                    t("td", wD, a(e.total_hours), 1),
                    t("td", xD, a(e.qty_produced), 1),
                    t("td", CD, a(e.avg_time_per_unit_mins ?? "—"), 1),
                    t("td", SD, a(e.qty_per_hour ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jD, "No Job Card time logs in this period."))
            ], 64)) : Vt.value === "overtime" ? (l(), o(u, { key: 5 }, [
              s[830] || (s[830] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged time beyond 8 hours (480 min) in a day, from Job Card time logs. No shift doctype exists to read an actual shift length from. ", -1)),
              L.value.overtime.summary.length ? (l(), o("table", MD, [
                s[829] || (s[829] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Employee"),
                    t("th", { class: "ta-r" }, "Overtime Days"),
                    t("th", { class: "ta-r" }, "Overtime Hours")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.overtime.summary, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    t("td", null, a(e.employee), 1),
                    t("td", DD, a(e.overtime_days), 1),
                    t("td", TD, a(e.overtime_hours), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", RD, "No overtime in this period."))
            ], 64)) : Vt.value === "labour_cost" ? (l(), o(u, { key: 6 }, [
              s[834] || (s[834] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged hours × the Workstation's hour rate on each Job Card — there's no per-employee wage field in this app, so this is a cost-of-time figure, not real payroll cost. ", -1)),
              t("div", OD, [
                t("div", PD, [
                  s[831] || (s[831] = t("span", { class: "bucket-label" }, "Total Labour Cost", -1)),
                  t("span", ID, a(d(L.value.labour_cost.total)), 1)
                ])
              ]),
              s[835] || (s[835] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Employee", -1)),
              L.value.labour_cost.by_employee.length ? (l(), o("table", VD, [
                s[832] || (s[832] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Employee"),
                    t("th", { class: "ta-r" }, "Hours"),
                    t("th", { class: "ta-r" }, "Cost")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.labour_cost.by_employee, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    t("td", null, a(e.employee), 1),
                    t("td", ND, a(e.total_hours), 1),
                    t("td", ED, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : b("", !0),
              s[836] || (s[836] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Operation", -1)),
              L.value.labour_cost.by_operation.length ? (l(), o("table", BD, [
                s[833] || (s[833] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Operation"),
                    t("th", { class: "ta-r" }, "Employees"),
                    t("th", { class: "ta-r" }, "Hours"),
                    t("th", { class: "ta-r" }, "Cost")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.labour_cost.by_operation, (e) => (l(), o("tr", {
                    key: e.operation
                  }, [
                    t("td", null, a(e.operation), 1),
                    t("td", qD, a(e.employee_count), 1),
                    t("td", AD, a(e.total_hours), 1),
                    t("td", $D, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", LD, "No Job Card time logs in this period."))
            ], 64)) : Vt.value === "employee_performance" ? (l(), o(u, { key: 7 }, [
              s[838] || (s[838] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Composite score = average of attendance %, output rate vs the team average (capped at 150%), and (100 − rejection %) — whichever of these apply to the employee. ", -1)),
              L.value.employee_performance.rows.length ? (l(), o("table", QD, [
                s[837] || (s[837] = t("thead", null, [
                  t("tr", null, [
                    t("th", null, "Employee"),
                    t("th", { class: "ta-r" }, "Hours"),
                    t("th", { class: "ta-r" }, "Qty Produced"),
                    t("th", { class: "ta-r" }, "Qty/Hour"),
                    t("th", { class: "ta-r" }, "Rejection %"),
                    t("th", { class: "ta-r" }, "Attendance %"),
                    t("th", { class: "ta-r" }, "Overtime Hrs"),
                    t("th", { class: "ta-r" }, "Score")
                  ])
                ], -1)),
                t("tbody", null, [
                  (l(!0), o(u, null, m(L.value.employee_performance.rows, (e) => (l(), o("tr", {
                    key: e.employee
                  }, [
                    t("td", null, a(e.employee), 1),
                    t("td", FD, a(e.total_hours), 1),
                    t("td", HD, a(e.qty_produced), 1),
                    t("td", zD, a(e.qty_per_hour ?? "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.rejection_pct > 0 ? "red" : ""])
                    }, a(e.rejection_pct != null ? e.rejection_pct + "%" : "—"), 3),
                    t("td", WD, a(e.attendance_pct != null ? e.attendance_pct + "%" : "—"), 1),
                    t("td", UD, a(e.overtime_hours), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", KD, "No Job Card time logs in this period."))
            ], 64)) : b("", !0)
          ], 64)) : (l(), o("div", GD, a(Co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : b("", !0)
      ]);
    };
  }
}, ZD = /* @__PURE__ */ jn(YD, [["__scopeId", "data-v-94f2f87b"]]);
export {
  ZD as default
};
