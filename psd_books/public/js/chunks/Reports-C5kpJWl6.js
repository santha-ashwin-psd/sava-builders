import { _ as jn, h as v, z as Ta, c as o, X as C, a as t, F as u, r as m, u as f, w as Et, B as Gt, b as h, t as a, v as al, d as ot, n as c, p as Bt, E as Mn, G as Dn, a6 as Tn, e as Rn, l as K, g as V, k as l, x as On } from "./main-DyN58TIP.js";
import { a as Pn, u as ie } from "./useFrappe-8bCdrpGo.js";
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
const st = (F) => [F & 255, F >>> 8 & 255], kt = (F) => [F & 255, F >>> 8 & 255, F >>> 16 & 255, F >>> 24 & 255];
function Nn(F) {
  const S = [], d = [];
  let p = 0;
  for (const x of F) {
    const y = Bs.encode(x.name), k = Vn(x.data), St = x.data.length, de = new Uint8Array([
      ...kt(67324752),
      ...st(20),
      ...st(0),
      ...st(0),
      ...st(0),
      ...st(33),
      ...kt(k),
      ...kt(St),
      ...kt(St),
      ...st(y.length),
      ...st(0)
    ]);
    S.push(de, y, x.data), d.push({ name: y, crc: k, size: St, offset: p }), p += de.length + y.length + St;
  }
  const H = p;
  let G = 0;
  for (const x of d) {
    const y = new Uint8Array([
      ...kt(33639248),
      ...st(20),
      ...st(20),
      ...st(0),
      ...st(0),
      ...st(0),
      ...st(33),
      ...kt(x.crc),
      ...kt(x.size),
      ...kt(x.size),
      ...st(x.name.length),
      ...st(0),
      ...st(0),
      ...st(0),
      ...st(0),
      ...kt(0),
      ...kt(x.offset)
    ]);
    S.push(y, x.name), G += y.length + x.name.length;
  }
  const lt = new Uint8Array([
    ...kt(101010256),
    ...st(0),
    ...st(0),
    ...st(d.length),
    ...st(d.length),
    ...kt(G),
    ...kt(H),
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
      const k = En(y) + (G + 1);
      return G === 0 ? `<c r="${k}" s="1" t="inlineStr"><is><t xml:space="preserve">${ol(x ?? "")}</t></is></c>` : typeof x == "number" && isFinite(x) ? `<c r="${k}" s="2"><v>${x}</v></c>` : `<c r="${k}" t="inlineStr"><is><t xml:space="preserve">${ol(x ?? "")}</t></is></c>`;
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
const zn = { class: "page-reports" }, Wn = { class: "report-grid" }, Un = ["onClick"], Kn = ["innerHTML"], Gn = { class: "report-card-label" }, Yn = { class: "books-card date-range-bar" }, Jn = {
  key: 0,
  class: "books-card report-card bs-card"
}, Xn = { class: "bs-page-head" }, Zn = { class: "bs-page-head-text" }, ti = { class: "bs-page-head-title" }, si = { class: "bs-page-head-sub" }, ei = { class: "bs-page-head-actions" }, ai = {
  key: 0,
  class: "proc-search"
}, oi = ["placeholder"], li = ["value"], ni = { class: "iws-export-wrap" }, ii = ["disabled"], di = { class: "iws-menu" }, ri = {
  key: 0,
  class: "empty-msg"
}, ui = {
  key: 1,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, ci = {
  key: 2,
  class: "empty-msg"
}, mi = {
  key: 3,
  class: "empty-msg"
}, vi = {
  key: 4,
  class: "iws-body"
}, _i = { class: "iws-table-wrap iws-cards-wrap" }, pi = { class: "iws-table iws-cards" }, yi = ["data-label"], hi = {
  key: 5,
  class: "empty-msg"
}, bi = {
  key: 1,
  class: "pl-dash"
}, gi = { class: "pl-dash-header" }, ki = { class: "pl-dash-range" }, fi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, wi = { class: "pl-kpi-grid" }, xi = { class: "pl-kpi c-emerald" }, Ci = { class: "pl-kpi-val green" }, Si = {
  key: 0,
  class: "pl-kpi c-pink"
}, ji = { class: "pl-kpi-val red" }, Mi = {
  key: 1,
  class: "pl-kpi c-amber"
}, Di = { class: "pl-kpi c-violet" }, Ti = { class: "pl-kpi-val red" }, Ri = {
  key: 2,
  class: "pl-kpi c-blue"
}, Oi = {
  key: 0,
  class: "pl-trend-card"
}, Pi = { class: "pl-trend-header" }, Ii = { class: "pl-trend-toggle" }, Vi = { class: "pl-trend-body" }, Ni = { class: "pl-trend-chart-wrap" }, Ei = { class: "pl-trend-yaxis" }, Bi = { class: "pl-trend-chart" }, qi = { class: "pl-trend-bars" }, Ai = ["title"], $i = ["title"], Li = { class: "pl-trend-month" }, Qi = { class: "pl-insights" }, Fi = { class: "pl-insight-title" }, Hi = { class: "pl-insight-desc" }, zi = {
  key: 2,
  class: "empty-msg"
}, Wi = {
  key: 2,
  class: "books-card report-card bs-card"
}, Ui = { class: "bs-page-head" }, Ki = { class: "bs-page-head-actions" }, Gi = { class: "bs-asof" }, Yi = { class: "iws-export-wrap" }, Ji = ["disabled"], Xi = { class: "iws-menu" }, Zi = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, td = { class: "bs-kpi-row" }, sd = { class: "bs-kpi bs-kpi-assets" }, ed = { class: "bs-kpi-body" }, ad = { class: "bs-kpi-amount" }, od = { class: "bs-kpi bs-kpi-liabilities" }, ld = { class: "bs-kpi-body" }, nd = { class: "bs-kpi-amount" }, id = { class: "bs-kpi bs-kpi-equity" }, dd = { class: "bs-kpi-body" }, rd = { class: "bs-kpi-amount" }, ud = { class: "bs-sum-status-icon" }, cd = { class: "bs-sum-status-body" }, md = { class: "bs-sum-status-title" }, vd = { class: "bs-sum-status-eq" }, _d = { class: "bs-acc" }, pd = ["onClick"], yd = ["innerHTML"], hd = { class: "bs-acc-head-text" }, bd = { class: "bs-acc-label" }, gd = { class: "bs-acc-desc" }, kd = { class: "bs-acc-amount" }, fd = {
  key: 0,
  class: "bs-acc-items"
}, wd = ["innerHTML"], xd = { class: "bs-acc-item-text" }, Cd = { class: "bs-acc-item-label" }, Sd = {
  key: 0,
  class: "bs-acc-item-desc"
}, jd = { class: "bs-acc-item-amount" }, Md = {
  key: 2,
  class: "empty-msg"
}, Dd = {
  key: 3,
  class: "books-card report-card bs-card"
}, Td = { class: "bs-page-head" }, Rd = { class: "bs-page-head-actions" }, Od = { class: "bs-asof" }, Pd = { class: "iws-export-wrap" }, Id = ["disabled"], Vd = { class: "iws-menu" }, Nd = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "120px", "border-radius": "8px" }
}, Ed = {
  key: 1,
  class: "cf-grid"
}, Bd = { class: "cf-acc" }, qd = { class: "cf-acc-row cf-row-operating" }, Ad = { class: "cf-acc-row cf-row-investing" }, $d = { class: "cf-acc-row cf-row-financing" }, Ld = { class: "cf-acc-row cf-row-net" }, Qd = { class: "cf-acc-text" }, Fd = { class: "cf-acc-desc" }, Hd = { class: "cf-flow-row" }, zd = { class: "cf-flow-row" }, Wd = { class: "cf-side" }, Ud = { class: "cf-trend-box" }, Kd = {
  key: 0,
  class: "cf-trend-chart"
}, Gd = ["title"], Yd = ["title"], Jd = ["title"], Xd = { class: "cf-trend-month" }, Zd = {
  key: 1,
  class: "empty-msg",
  style: { padding: "20px 0" }
}, tr = { class: "cf-summary-box" }, sr = { class: "cf-summary-text" }, er = {
  key: 2,
  class: "empty-msg"
}, ar = {
  key: 4,
  class: "books-card report-card bs-card"
}, or = { class: "bs-page-head" }, lr = { class: "bs-page-head-actions" }, nr = { class: "bs-asof" }, ir = { class: "iws-export-wrap" }, dr = ["disabled"], rr = { class: "iws-menu" }, ur = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "80px", "border-radius": "8px" }
}, cr = {
  key: 1,
  class: "gst-cards"
}, mr = { class: "gst-card-head" }, vr = { class: "gst-card-title" }, _r = { class: "gst-card-desc" }, pr = { class: "gst-card-stats" }, yr = { class: "gst-stat-value" }, hr = { class: "gst-stat-value" }, br = { class: "gst-card gst-c-total" }, gr = { class: "gst-card-stats" }, kr = { class: "gst-stat-value" }, fr = { class: "gst-stat-value" }, wr = {
  key: 2,
  class: "empty-msg"
}, xr = {
  key: 5,
  class: "books-card report-card bs-card"
}, Cr = { class: "bs-page-head" }, Sr = { class: "bs-page-head-actions" }, jr = { class: "bs-asof" }, Mr = { class: "iws-export-wrap" }, Dr = ["disabled"], Tr = { class: "iws-menu" }, Rr = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Or = {
  key: 1,
  class: "iws-body"
}, Pr = { class: "iws-total-panel iws-total-panel-neg" }, Ir = { class: "iws-total-meta" }, Vr = {
  key: 0,
  class: "iws-total-sub"
}, Nr = { class: "iws-total-sub-value" }, Er = { class: "iws-table-wrap" }, Br = { class: "iws-table" }, qr = { class: "iws-idx" }, Ar = { class: "iws-item-name" }, $r = { class: "ta-r mono-sm" }, Lr = { class: "ta-r mono-sm fw-700 text-danger" }, Qr = { class: "iws-kebab-col" }, Fr = { class: "iws-kebab-wrap" }, Hr = ["onClick"], zr = { class: "iws-menu iws-menu-row" }, Wr = ["onClick"], Ur = ["onClick"], Kr = { class: "iws-total-row" }, Gr = { class: "ta-r fw-700" }, Yr = { class: "ta-r fw-700" }, Jr = { class: "ta-r fw-700" }, Xr = { class: "ta-r fw-700" }, Zr = { class: "ta-r fw-700 text-danger" }, tu = { class: "ta-r fw-700 text-danger" }, su = {
  key: 2,
  class: "empty-msg"
}, eu = {
  key: 6,
  class: "books-card report-card bs-card"
}, au = { class: "bs-page-head" }, ou = { class: "bs-page-head-actions" }, lu = { class: "bs-asof" }, nu = { class: "iws-export-wrap" }, iu = ["disabled"], du = { class: "iws-menu" }, ru = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, uu = {
  key: 1,
  class: "iws-body"
}, cu = { class: "iws-total-panel iws-total-panel-neg" }, mu = { class: "iws-total-meta" }, vu = {
  key: 0,
  class: "iws-total-sub"
}, _u = { class: "iws-total-sub-value" }, pu = { class: "iws-table-wrap" }, yu = { class: "iws-table" }, hu = { class: "iws-idx" }, bu = { class: "iws-item-name" }, gu = { class: "ta-r mono-sm" }, ku = { class: "ta-r mono-sm fw-700 text-danger" }, fu = { class: "iws-kebab-col" }, wu = { class: "iws-kebab-wrap" }, xu = ["onClick"], Cu = { class: "iws-menu iws-menu-row" }, Su = ["onClick"], ju = ["onClick"], Mu = { class: "iws-total-row" }, Du = { class: "ta-r fw-700" }, Tu = { class: "ta-r fw-700" }, Ru = { class: "ta-r fw-700" }, Ou = { class: "ta-r fw-700" }, Pu = { class: "ta-r fw-700 text-danger" }, Iu = { class: "ta-r fw-700 text-danger" }, Vu = {
  key: 2,
  class: "empty-msg"
}, Nu = {
  key: 7,
  class: "books-card report-card bs-card"
}, Eu = { class: "bs-page-head" }, Bu = { class: "bs-page-head-actions" }, qu = { class: "bs-asof" }, Au = { class: "iws-export-wrap" }, $u = ["disabled"], Lu = { class: "iws-menu" }, Qu = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Fu = {
  key: 1,
  class: "iws-body"
}, Hu = { class: "iws-total-panel" }, zu = { class: "iws-total-meta" }, Wu = { class: "iws-table-wrap" }, Uu = { class: "iws-table" }, Ku = { class: "iws-idx" }, Gu = { class: "iws-item-name" }, Yu = { class: "iws-uom" }, Ju = { class: "ta-r mono-sm" }, Xu = { class: "ta-r mono-sm" }, Zu = { class: "ta-r mono-sm" }, tc = { class: "ta-r mono-sm red" }, sc = { class: "ta-r mono-sm fw-700 green" }, ec = { class: "iws-kebab-col" }, ac = { class: "iws-kebab-wrap" }, oc = ["onClick"], lc = { class: "iws-menu iws-menu-row" }, nc = ["onClick"], ic = ["onClick"], dc = { class: "iws-total-row" }, rc = { class: "ta-r fw-700" }, uc = { class: "ta-r fw-700" }, cc = { class: "ta-r fw-700 red" }, mc = { class: "ta-r fw-700 green" }, vc = {
  key: 2,
  class: "empty-msg"
}, _c = {
  key: 8,
  class: "books-card report-card bs-card"
}, pc = { class: "bs-page-head" }, yc = { class: "bs-page-head-actions" }, hc = { class: "bs-asof" }, bc = { class: "iws-export-wrap" }, gc = ["disabled"], kc = { class: "iws-menu" }, fc = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, wc = {
  key: 1,
  class: "iws-body"
}, xc = { class: "iws-total-panel" }, Cc = { class: "iws-total-meta" }, Sc = {
  key: 0,
  class: "iws-total-sub"
}, jc = { class: "iws-total-sub-value" }, Mc = { class: "iws-table-wrap" }, Dc = { class: "iws-table" }, Tc = { class: "iws-idx" }, Rc = { class: "iws-item-name" }, Oc = { class: "ta-r mono-sm" }, Pc = { class: "ta-r mono-sm" }, Ic = { class: "ta-r mono-sm red" }, Vc = { class: "ta-r mono-sm" }, Nc = { class: "ta-r mono-sm" }, Ec = { class: "ta-r mono-sm fw-700 green" }, Bc = { class: "iws-kebab-col" }, qc = { class: "iws-kebab-wrap" }, Ac = ["onClick"], $c = { class: "iws-menu iws-menu-row" }, Lc = ["onClick"], Qc = ["onClick"], Fc = { class: "iws-total-row" }, Hc = { class: "ta-r fw-700" }, zc = { class: "ta-r fw-700" }, Wc = { class: "ta-r fw-700 red" }, Uc = { class: "ta-r fw-700" }, Kc = { class: "ta-r fw-700 red" }, Gc = { class: "ta-r fw-700 green" }, Yc = {
  key: 2,
  class: "empty-msg"
}, Jc = {
  key: 9,
  class: "books-card report-card bs-card"
}, Xc = { class: "bs-page-head" }, Zc = { class: "bs-page-head-actions" }, tm = { class: "bs-asof" }, sm = { class: "iws-export-wrap" }, em = ["disabled"], am = { class: "iws-menu" }, om = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, lm = { class: "iws-body" }, nm = { class: "iws-total-meta" }, im = {
  key: 0,
  class: "iws-total-sub"
}, dm = { class: "iws-total-sub-value" }, rm = { class: "iws-table-wrap" }, um = { class: "iws-table" }, cm = { class: "iws-idx" }, mm = { class: "iws-item-name" }, vm = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "No valuation or standard buying rate found for this item — margin below is not meaningful"
}, _m = { class: "ta-r mono-sm" }, pm = { class: "ta-r mono-sm" }, ym = { class: "ta-r mono-sm" }, hm = { class: "ta-r mono-sm red" }, bm = { class: "iws-kebab-col" }, gm = { class: "iws-kebab-wrap" }, km = ["onClick"], fm = { class: "iws-menu iws-menu-row" }, wm = ["onClick"], xm = ["onClick"], Cm = { class: "iws-total-row" }, Sm = { class: "ta-r fw-700" }, jm = { class: "ta-r fw-700" }, Mm = { class: "ta-r fw-700 red" }, Dm = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-top": "10px" }
}, Tm = {
  key: 2,
  class: "empty-msg"
}, Rm = {
  key: 10,
  class: "books-card report-card bs-card"
}, Om = { class: "bs-page-head" }, Pm = { class: "bs-page-head-actions" }, Im = { class: "bs-asof" }, Vm = { class: "iws-export-wrap" }, Nm = ["disabled"], Em = { class: "iws-menu" }, Bm = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, qm = {
  key: 1,
  class: "iws-body"
}, Am = { class: "iws-total-meta" }, $m = {
  key: 0,
  class: "iws-total-sub"
}, Lm = { class: "iws-total-sub-label" }, Qm = { style: { "font-size": "11px", color: "var(--text-3)", "margin-top": "4px" } }, Fm = { class: "iws-table-wrap" }, Hm = { class: "iws-table" }, zm = { class: "iws-idx" }, Wm = ["checked"], Um = { class: "iws-idx" }, Km = ["checked", "onChange"], Gm = { class: "mono-sm" }, Ym = ["onClick"], Jm = {
  key: 0,
  class: "badge badge-muted",
  style: { "margin-left": "6px", "font-size": "10px" },
  title: "One or more items on this invoice have no valuation or standard buying rate — cost/margin is understated"
}, Xm = { class: "mono-sm" }, Zm = { class: "iws-item-name" }, tv = { class: "ta-r mono-sm" }, sv = { class: "ta-r mono-sm red" }, ev = { class: "iws-kebab-col" }, av = { class: "iws-kebab-wrap" }, ov = ["onClick"], lv = { class: "iws-menu iws-menu-row" }, nv = ["onClick"], iv = ["onClick"], dv = ["onClick"], rv = { class: "iws-total-row" }, uv = { class: "ta-r fw-700" }, cv = { class: "ta-r fw-700 red" }, mv = {
  key: 2,
  class: "empty-msg"
}, vv = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "180px", "border-radius": "8px" }
}, _v = { style: { display: "flex", "flex-wrap": "wrap", gap: "16px", "font-size": "12.5px", color: "#868E96", "margin-bottom": "14px" } }, pv = { style: { color: "#212529" } }, yv = { style: { color: "#212529" } }, hv = { style: { color: "#212529" } }, bv = {
  key: 0,
  style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" }
}, gv = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, kv = { class: "ta-r mono-sm" }, fv = { class: "ta-r mono-sm" }, wv = { class: "ta-r mono-sm" }, xv = { class: "ta-r mono-sm" }, Cv = { class: "ta-r mono-sm red" }, Sv = { class: "aging-totals-row" }, jv = { class: "ta-r fw-700" }, Mv = { class: "ta-r fw-700 red" }, Dv = {
  key: 2,
  class: "empty-msg"
}, Tv = {
  key: 11,
  class: "books-card report-card bs-card"
}, Rv = { class: "bs-page-head" }, Ov = { class: "bs-page-head-actions" }, Pv = { class: "bs-asof" }, Iv = { class: "iws-export-wrap" }, Vv = ["disabled"], Nv = { class: "iws-menu" }, Ev = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, Bv = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(2, 1fr)", "margin-bottom": "14px" }
}, qv = { class: "bs-kpi bs-kpi-assets" }, Av = { class: "bs-kpi-body" }, $v = { class: "bs-kpi-amount" }, Lv = { class: "bs-kpi bs-kpi-liabilities" }, Qv = { class: "bs-kpi-body" }, Fv = { class: "bs-kpi-amount" }, Hv = { class: "bs-sum-status-icon" }, zv = { class: "bs-sum-status-body" }, Wv = { class: "bs-sum-status-title" }, Uv = { class: "bs-sum-status-eq" }, Kv = {
  class: "iws-table-wrap",
  style: { "margin-top": "14px" }
}, Gv = { class: "iws-table" }, Yv = { class: "iws-idx" }, Jv = { class: "iws-item-name" }, Xv = {
  class: "iws-uom",
  style: { background: "#f1f5f9", color: "#475569" }
}, Zv = { class: "ta-r mono-sm green" }, t1 = { class: "ta-r mono-sm red" }, s1 = { class: "iws-kebab-col" }, e1 = { class: "iws-kebab-wrap" }, a1 = ["onClick"], o1 = { class: "iws-menu iws-menu-row" }, l1 = ["onClick"], n1 = ["onClick"], i1 = { class: "iws-total-row" }, d1 = { class: "ta-r fw-700" }, r1 = { class: "ta-r fw-700 green" }, u1 = { class: "ta-r fw-700 red" }, c1 = { class: "ta-r fw-700" }, m1 = {
  key: 2,
  class: "empty-msg"
}, v1 = {
  key: 12,
  class: "books-card report-card bs-card"
}, _1 = { class: "bs-page-head" }, p1 = { class: "bs-page-head-actions" }, y1 = { class: "bs-asof" }, h1 = { class: "iws-export-wrap" }, b1 = ["disabled"], g1 = { class: "iws-menu" }, k1 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, f1 = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "repeat(3, 1fr)", "margin-bottom": "14px" }
}, w1 = { class: "bs-kpi bs-kpi-assets" }, x1 = { class: "bs-kpi-body" }, C1 = { class: "bs-kpi-amount" }, S1 = { class: "bs-kpi bs-kpi-equity" }, j1 = { class: "bs-kpi-body" }, M1 = { class: "bs-kpi-amount" }, D1 = { class: "bs-kpi-body" }, T1 = { class: "bs-sum-status-icon" }, R1 = { class: "bs-sum-status-body" }, O1 = { class: "bs-sum-status-title" }, P1 = { class: "bs-sum-status-eq" }, I1 = {
  key: 0,
  class: "sgl-grir-note"
}, V1 = { class: "mono-sm fw-600" }, N1 = {
  class: "iws-table-wrap",
  style: { "margin-bottom": "20px" }
}, E1 = { class: "iws-table" }, B1 = { class: "iws-idx" }, q1 = { class: "iws-item-name" }, A1 = { class: "ta-r mono-sm" }, $1 = { class: "ta-r mono-sm" }, L1 = { class: "iws-kebab-col" }, Q1 = { class: "iws-kebab-wrap" }, F1 = ["onClick"], H1 = { class: "iws-menu iws-menu-row" }, z1 = ["onClick"], W1 = { class: "iws-table-wrap" }, U1 = { class: "iws-table" }, K1 = { class: "iws-idx" }, G1 = { class: "iws-item-name" }, Y1 = { class: "iws-uom" }, J1 = { class: "ta-r mono-sm" }, X1 = { class: "ta-r mono-sm" }, Z1 = { class: "ta-r mono-sm fw-700 green" }, t_ = { class: "iws-kebab-col" }, s_ = { class: "iws-kebab-wrap" }, e_ = ["onClick"], a_ = { class: "iws-menu iws-menu-row" }, o_ = ["onClick"], l_ = ["onClick"], n_ = { class: "iws-total-row" }, i_ = { class: "ta-r fw-700 green" }, d_ = {
  key: 2,
  class: "empty-msg"
}, r_ = {
  key: 13,
  class: "books-card report-card bs-card"
}, u_ = { class: "bs-page-head" }, c_ = { class: "bs-page-head-actions" }, m_ = { class: "bs-asof" }, v_ = { class: "iws-export-wrap" }, __ = ["disabled"], p_ = { class: "iws-menu" }, y_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, h_ = {
  class: "bs-kpi-row",
  style: { "grid-template-columns": "1fr", "margin-bottom": "14px" }
}, b_ = { class: "bs-kpi bs-kpi-assets" }, g_ = { class: "bs-kpi-body" }, k_ = { class: "bs-kpi-amount" }, f_ = { class: "iws-table-wrap" }, w_ = { class: "iws-table" }, x_ = { class: "iws-idx" }, C_ = { class: "iws-item-name" }, S_ = { class: "ta-r mono-sm fw-700 green" }, j_ = { class: "ta-r mono-sm" }, M_ = { class: "iws-total-row" }, D_ = { class: "ta-r fw-700 green" }, T_ = {
  key: 1,
  class: "empty-msg"
}, R_ = {
  key: 2,
  class: "empty-msg"
}, O_ = {
  key: 14,
  class: "books-card report-card bs-card"
}, P_ = { class: "bs-page-head" }, I_ = { class: "bs-page-head-actions" }, V_ = { class: "iws-export-wrap" }, N_ = ["disabled"], E_ = { class: "iws-menu" }, B_ = { style: { display: "flex", gap: "10px", "flex-wrap": "wrap", "margin-bottom": "12px" } }, q_ = ["value"], A_ = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "160px", "border-radius": "8px" }
}, $_ = {
  key: 1,
  class: "iws-table-wrap"
}, L_ = { class: "iws-table" }, Q_ = { class: "iws-idx" }, F_ = { class: "iws-item-name" }, H_ = {
  class: "mono-sm",
  style: { opacity: ".65" }
}, z_ = { class: "ta-r mono-sm" }, W_ = { class: "ta-r mono-sm fw-700 green" }, U_ = { class: "ta-r mono-sm fw-700" }, K_ = {
  key: 2,
  class: "empty-msg"
}, G_ = {
  key: 15,
  class: "books-card report-card bs-card"
}, Y_ = { class: "bs-page-head" }, J_ = { class: "bs-page-head-actions" }, X_ = { class: "bs-asof" }, Z_ = { class: "iws-export-wrap" }, tp = ["disabled"], sp = { class: "iws-menu" }, ep = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "200px", "border-radius": "8px" }
}, ap = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "18px" }
}, op = { class: "mis-summary-card" }, lp = { class: "mis-summary-val" }, np = { class: "mis-summary-card" }, ip = { class: "mis-summary-val green" }, dp = { class: "mis-summary-card" }, rp = { class: "mis-summary-val" }, up = { class: "mis-summary-card" }, cp = { class: "mis-summary-val red" }, mp = { class: "mis-summary-card" }, vp = { class: "mis-summary-val" }, _p = { class: "mis-summary-card" }, pp = { class: "mis-summary-val" }, yp = { class: "mis-summary-card" }, hp = { class: "mis-summary-val" }, bp = { class: "mis-summary-card" }, gp = { class: "iws-table-wrap" }, kp = { class: "iws-table" }, fp = { class: "iws-item-name" }, wp = { class: "ta-r mono-sm" }, xp = { class: "ta-r mono-sm green" }, Cp = { class: "ta-r mono-sm" }, Sp = { class: "ta-r mono-sm red" }, jp = { class: "ta-r mono-sm" }, Mp = { class: "ta-r mono-sm" }, Dp = { class: "ta-r mono-sm" }, Tp = { class: "ta-r mono-sm" }, Rp = { class: "ta-r mono-sm fw-600" }, Op = { class: "iws-total-row" }, Pp = { class: "ta-r fw-700" }, Ip = { class: "ta-r fw-700 green" }, Vp = { class: "ta-r fw-700" }, Np = { class: "ta-r fw-700 red" }, Ep = { class: "ta-r fw-700" }, Bp = { class: "ta-r fw-700" }, qp = { class: "ta-r fw-700" }, Ap = { class: "ta-r fw-700" }, $p = { class: "ta-r fw-700" }, Lp = {
  key: 1,
  class: "empty-msg"
}, Qp = {
  key: 2,
  class: "empty-msg"
}, Fp = {
  key: 16,
  class: "books-card report-card bs-card"
}, Hp = { class: "bs-page-head" }, zp = { class: "bs-page-head-actions" }, Wp = { class: "bs-asof" }, Up = { class: "iws-export-wrap" }, Kp = ["disabled"], Gp = { class: "iws-menu" }, Yp = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Jp = ["onClick"], Xp = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Zp = {
  key: 0,
  class: "mis-summary-grid"
}, ty = { class: "mis-summary-card" }, sy = { class: "mis-summary-val" }, ey = { class: "mis-summary-card" }, ay = { class: "mis-summary-val" }, oy = { class: "mis-summary-card" }, ly = { class: "mis-summary-val" }, ny = { class: "mis-summary-card" }, iy = { class: "mis-summary-val red" }, dy = { class: "mis-summary-card" }, ry = { class: "mis-summary-val green" }, uy = { class: "mis-summary-card" }, cy = { class: "mis-summary-val" }, my = { class: "mis-summary-card" }, vy = { class: "mis-summary-val" }, _y = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, py = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, yy = { class: "mis-summary-card" }, hy = { class: "mis-summary-val" }, by = { class: "mis-summary-card" }, gy = { class: "mis-summary-val green" }, ky = { class: "mis-summary-card" }, fy = { class: "mono" }, wy = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xy = { class: "ta-r mono-sm" }, Cy = { class: "ta-r mono-sm" }, Sy = { class: "ta-r mono-sm red" }, jy = { class: "ta-r mono-sm fw-600" }, My = {
  key: 3,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Dy = { class: "ta-r mono-sm" }, Ty = { class: "ta-r mono-sm fw-600" }, Ry = { class: "ta-r mono-sm" }, Oy = {
  key: 4,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Py = { class: "ta-r mono-sm" }, Iy = { class: "ta-r mono-sm fw-600" }, Vy = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ny = { class: "ta-r mono-sm" }, Ey = { class: "ta-r mono-sm fw-600" }, By = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, qy = { class: "mis-summary-card" }, Ay = { class: "mis-summary-val" }, $y = { class: "mis-summary-card" }, Ly = { class: "mis-summary-val red" }, Qy = { class: "mis-summary-card" }, Fy = { class: "mis-summary-val" }, Hy = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, zy = { class: "ta-r mono-sm red" }, Wy = {
  key: 1,
  class: "empty-msg"
}, Uy = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Ky = { class: "mis-summary-card" }, Gy = { class: "mis-summary-val red" }, Yy = { class: "mis-summary-card" }, Jy = { class: "mis-summary-val red" }, Xy = { class: "mis-summary-card" }, Zy = { class: "mis-summary-val" }, th = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, sh = { class: "ta-r mono-sm red" }, eh = { class: "ta-r mono-sm red" }, ah = { class: "ta-r mono-sm" }, oh = {
  key: 1,
  class: "empty-msg"
}, lh = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nh = { class: "ta-r mono-sm red" }, ih = { class: "ta-r mono-sm" }, dh = {
  key: 3,
  class: "empty-msg"
}, rh = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, uh = { class: "mis-summary-card" }, ch = { class: "mis-summary-val" }, mh = { class: "mis-summary-card" }, vh = { class: "mis-summary-val red" }, _h = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ph = { class: "badge badge-blue" }, yh = { class: "ta-r mono-sm" }, hh = { class: "ta-r mono-sm green" }, bh = { class: "ta-r mono-sm red fw-600" }, gh = {
  key: 1,
  class: "empty-msg"
}, kh = { class: "mis-summary-grid" }, fh = { class: "mis-summary-card" }, wh = { class: "mis-summary-val" }, xh = { class: "mis-summary-card" }, Ch = { class: "mis-summary-val green" }, Sh = { class: "mis-summary-card" }, jh = { class: "mis-summary-card" }, Mh = { class: "mis-summary-val" }, Dh = { class: "mis-summary-card" }, Th = { class: "mis-summary-val green" }, Rh = { class: "mis-summary-card" }, Oh = { class: "mis-summary-val" }, Ph = {
  key: 2,
  class: "empty-msg"
}, Ih = {
  key: 17,
  class: "books-card report-card bs-card"
}, Vh = { class: "bs-page-head" }, Nh = { class: "bs-page-head-actions" }, Eh = { class: "bs-asof" }, Bh = { class: "iws-export-wrap" }, qh = ["disabled"], Ah = { class: "iws-menu" }, $h = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Lh = ["onClick"], Qh = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Fh = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, Hh = { class: "mono" }, zh = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(4,1fr)" }
}, Wh = { class: "mis-summary-card" }, Uh = { class: "mis-summary-val" }, Kh = { class: "mis-summary-card" }, Gh = { class: "mis-summary-val" }, Yh = { class: "mis-summary-card" }, Jh = { class: "mis-summary-val red" }, Xh = { class: "mis-summary-card" }, Zh = { class: "mis-summary-val green" }, tb = {
  class: "pl-row net loss",
  style: { "margin-bottom": "12px" }
}, sb = { class: "mono" }, eb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, ab = { class: "ta-r mono-sm" }, ob = { class: "ta-r mono-sm fw-600" }, lb = {
  key: 1,
  class: "empty-msg"
}, nb = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, ib = { class: "aging-bucket" }, db = { class: "bucket-val mono-sm" }, rb = { class: "aging-bucket" }, ub = { class: "bucket-val mono-sm" }, cb = { class: "aging-bucket" }, mb = { class: "bucket-val mono-sm" }, vb = { class: "aging-bucket" }, _b = { class: "bucket-val mono-sm red" }, pb = { class: "aging-bucket" }, yb = { class: "bucket-val mono-sm fw-700" }, hb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bb = { class: "ta-r mono-sm" }, gb = { class: "ta-r mono-sm" }, kb = { class: "ta-r mono-sm" }, fb = { class: "ta-r mono-sm red" }, wb = { class: "ta-r mono-sm fw-600" }, xb = {
  key: 1,
  class: "empty-msg"
}, Cb = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, Sb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, jb = { class: "mis-summary-card" }, Mb = { class: "mis-summary-val" }, Db = { class: "mis-summary-card" }, Tb = { class: "mis-summary-val green" }, Rb = { class: "mis-summary-card" }, Ob = { class: "mono" }, Pb = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, Ib = { class: "mono" }, Vb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Nb = { class: "ta-r mono-sm" }, Eb = { class: "ta-r mono-sm green" }, Bb = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, qb = { class: "mis-summary-card" }, Ab = { class: "mis-summary-val" }, $b = { class: "mis-summary-card" }, Lb = { class: "mis-summary-val red" }, Qb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Fb = { class: "ta-r mono-sm red fw-600" }, Hb = { class: "ta-r mono-sm" }, zb = {
  key: 1,
  class: "empty-msg"
}, Wb = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ub = { class: "ta-r mono-sm" }, Kb = { class: "ta-r mono-sm" }, Gb = {
  key: 1,
  class: "empty-msg"
}, Yb = { class: "mis-summary-grid" }, Jb = { class: "mis-summary-card" }, Xb = { class: "mis-summary-val" }, Zb = { class: "mis-summary-card" }, tg = { class: "mis-summary-val" }, sg = { class: "mis-summary-card" }, eg = { class: "mis-summary-val" }, ag = { class: "mis-summary-card" }, og = { class: "mis-summary-val green" }, lg = { class: "mis-summary-card" }, ng = { class: "mis-summary-val red" }, ig = { class: "mis-summary-card" }, dg = {
  key: 2,
  class: "empty-msg"
}, rg = {
  key: 18,
  class: "books-card report-card bs-card"
}, ug = { class: "bs-page-head" }, cg = { class: "bs-page-head-actions" }, mg = { class: "bs-asof" }, vg = { class: "iws-export-wrap" }, _g = ["disabled"], pg = { class: "iws-menu" }, yg = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, hg = ["onClick"], bg = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, gg = {
  key: 0,
  class: "mis-summary-grid"
}, kg = { class: "mis-summary-card" }, fg = { class: "mis-summary-val" }, wg = { class: "mis-summary-card" }, xg = { class: "mis-summary-val" }, Cg = { class: "mis-summary-card" }, Sg = { class: "mis-summary-val" }, jg = { class: "mis-summary-card" }, Mg = { class: "mis-summary-val green" }, Dg = { class: "mis-summary-card" }, Tg = { class: "mis-summary-val red" }, Rg = { class: "mis-summary-card" }, Og = { class: "mis-summary-val" }, Pg = { class: "mis-summary-card" }, Ig = { class: "mis-summary-val" }, Vg = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ng = { class: "ta-r mono-sm" }, Eg = { class: "ta-r mono-sm fw-600" }, Bg = { class: "ta-r mono-sm" }, qg = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Ag = { class: "ta-r mono-sm" }, $g = { class: "ta-r mono-sm" }, Lg = { class: "ta-r mono-sm" }, Qg = { class: "ta-r mono-sm fw-600" }, Fg = { style: { display: "flex", "align-items": "center", gap: "10px", "margin-bottom": "16px", "flex-wrap": "wrap" } }, Hg = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)" }
}, zg = { class: "mis-summary-card" }, Wg = { class: "mis-summary-val" }, Ug = { class: "mis-summary-card" }, Kg = { class: "mis-summary-val red" }, Gg = { class: "mis-summary-card" }, Yg = { class: "mono" }, Jg = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Xg = { key: 0 }, Zg = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, t2 = { class: "ta-r mono-sm" }, s2 = { class: "ta-r mono-sm" }, e2 = { class: "ta-r mono-sm" }, a2 = {
  key: 1,
  class: "empty-msg"
}, o2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, l2 = { class: "mis-summary-card" }, n2 = { class: "mis-summary-val" }, i2 = { class: "mis-summary-card" }, d2 = { class: "mis-summary-val red" }, r2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, u2 = { class: "badge badge-blue" }, c2 = { class: "ta-r mono-sm" }, m2 = { class: "ta-r mono-sm" }, v2 = { class: "ta-r mono-sm red fw-600" }, _2 = {
  key: 1,
  class: "empty-msg"
}, p2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, y2 = { class: "mis-summary-card" }, h2 = { class: "mis-summary-val" }, b2 = { class: "mis-summary-card" }, g2 = { class: "mis-summary-val red" }, k2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, f2 = { class: "badge badge-blue" }, w2 = { class: "ta-r mono-sm" }, x2 = { class: "ta-r mono-sm" }, C2 = { class: "ta-r mono-sm red fw-600" }, S2 = {
  key: 1,
  class: "empty-msg"
}, j2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, M2 = { class: "mis-summary-card" }, D2 = { class: "mis-summary-val" }, T2 = { class: "mis-summary-card" }, R2 = { class: "mis-summary-val green" }, O2 = { class: "mis-summary-card" }, P2 = { class: "mis-summary-val" }, I2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, V2 = { class: "ta-r mono-sm fw-600" }, N2 = {
  key: 1,
  class: "empty-msg"
}, E2 = {
  key: 2,
  class: "empty-msg"
}, B2 = {
  key: 19,
  class: "books-card report-card bs-card"
}, q2 = { class: "bs-page-head" }, A2 = { class: "bs-page-head-actions" }, $2 = { class: "bs-asof" }, L2 = { class: "iws-export-wrap" }, Q2 = ["disabled"], F2 = { class: "iws-menu" }, H2 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, z2 = ["onClick"], W2 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, U2 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, K2 = { class: "mis-summary-card" }, G2 = { class: "mis-summary-val" }, Y2 = { class: "mis-summary-card" }, J2 = { class: "mis-summary-val green" }, X2 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Z2 = { class: "ta-r mono-sm" }, t0 = { class: "ta-r mono-sm" }, s0 = { class: "ta-r mono-sm fw-600" }, e0 = {
  key: 1,
  class: "empty-msg"
}, a0 = {
  class: "pl-row net profit",
  style: { "margin-bottom": "12px" }
}, o0 = { class: "mono" }, l0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n0 = { class: "ta-r mono-sm" }, i0 = { class: "ta-r mono-sm" }, d0 = { class: "ta-r mono-sm fw-600" }, r0 = {
  key: 1,
  class: "empty-msg"
}, u0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, c0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, m0 = { class: "ta-r mono-sm fw-600 green" }, v0 = { class: "ta-r mono-sm" }, _0 = { class: "ta-r mono-sm" }, p0 = {
  key: 1,
  class: "empty-msg"
}, y0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, h0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, b0 = { class: "ta-r mono-sm" }, g0 = { class: "ta-r mono-sm" }, k0 = { class: "ta-r mono-sm red" }, f0 = {
  key: 1,
  class: "empty-msg"
}, w0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, x0 = { class: "mis-summary-card" }, C0 = { class: "mis-summary-val" }, S0 = { class: "mis-summary-card" }, j0 = { class: "mis-summary-val red" }, M0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, D0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, T0 = { class: "ta-r mono-sm" }, R0 = { class: "ta-r mono-sm fw-600" }, O0 = { class: "ta-r mono-sm red" }, P0 = {
  key: 1,
  class: "empty-msg"
}, I0 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, V0 = {
  class: "aging-buckets",
  style: { "margin-bottom": "16px" }
}, N0 = { class: "aging-bucket" }, E0 = { class: "bucket-val mono-sm" }, B0 = { class: "aging-bucket" }, q0 = { class: "bucket-val mono-sm" }, A0 = { class: "aging-bucket" }, $0 = { class: "bucket-val mono-sm" }, L0 = { class: "aging-bucket" }, Q0 = { class: "bucket-val mono-sm red" }, F0 = { class: "aging-bucket" }, H0 = { class: "bucket-val mono-sm fw-700" }, z0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, W0 = { class: "ta-r mono-sm" }, U0 = { class: "ta-r mono-sm" }, K0 = {
  key: 1,
  class: "empty-msg"
}, G0 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, Y0 = { class: "mis-summary-card" }, J0 = { class: "mis-summary-val red" }, X0 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Z0 = { class: "ta-r mono-sm red fw-600" }, t8 = { class: "ta-r mono-sm" }, s8 = { class: "ta-r mono-sm" }, e8 = { class: "ta-r mono-sm" }, a8 = {
  key: 1,
  class: "empty-msg"
}, o8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, l8 = { class: "mis-summary-card" }, n8 = { class: "mis-summary-val red" }, i8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, d8 = { class: "ta-r mono-sm" }, r8 = { class: "ta-r mono-sm" }, u8 = { class: "ta-r mono-sm red" }, c8 = { class: "ta-r mono-sm" }, m8 = { class: "ta-r mono-sm fw-600" }, v8 = {
  key: 1,
  class: "empty-msg"
}, _8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, p8 = { class: "mis-summary-card" }, y8 = { class: "mis-summary-val" }, h8 = { class: "mis-summary-card" }, b8 = { class: "mis-summary-val green" }, g8 = { class: "mis-summary-card" }, k8 = { class: "mis-summary-val red" }, f8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, w8 = {
  key: 1,
  class: "empty-msg"
}, x8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, C8 = { class: "mis-summary-card" }, S8 = { class: "mis-summary-val" }, j8 = { class: "mis-summary-card" }, M8 = { class: "mis-summary-val red" }, D8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, T8 = { class: "ta-r mono-sm red fw-600" }, R8 = { class: "ta-r mono-sm red" }, O8 = {
  key: 1,
  class: "empty-msg"
}, P8 = {
  key: 2,
  class: "empty-msg"
}, I8 = {
  key: 20,
  class: "books-card report-card bs-card"
}, V8 = { class: "bs-page-head" }, N8 = { class: "bs-page-head-actions" }, E8 = { class: "bs-asof" }, B8 = { class: "iws-export-wrap" }, q8 = ["disabled"], A8 = { class: "iws-menu" }, $8 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, L8 = ["onClick"], Q8 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, F8 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, H8 = { class: "mis-summary-card" }, z8 = { class: "mis-summary-val" }, W8 = { class: "mis-summary-card" }, U8 = { class: "mis-summary-val green" }, K8 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, G8 = { class: "ta-r mono-sm" }, Y8 = { class: "ta-r mono-sm" }, J8 = { class: "ta-r mono-sm" }, X8 = {
  key: 1,
  class: "empty-msg"
}, Z8 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, tk = {
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
}, yk = { class: "ta-r mono-sm" }, hk = { class: "ta-r mono-sm" }, bk = { class: "ta-r mono-sm" }, gk = { class: "ta-r mono-sm" }, kk = {
  key: 1,
  class: "empty-msg"
}, fk = {
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
}, Yk = { class: "ta-r mono-sm" }, Jk = { class: "ta-r mono-sm" }, Xk = { class: "ta-r mono-sm" }, Zk = { class: "ta-r mono-sm fw-600" }, tf = { class: "ta-r mono-sm" }, sf = {
  key: 1,
  class: "empty-msg"
}, ef = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, af = { class: "mis-summary-card" }, of = { class: "mis-summary-val" }, lf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nf = { class: "ta-r mono-sm" }, df = { class: "ta-r mono-sm" }, rf = {
  key: 1,
  class: "empty-msg"
}, uf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, cf = { class: "mis-summary-card" }, mf = { class: "mis-summary-val red" }, vf = { class: "mis-summary-card" }, _f = { class: "mis-summary-val red" }, pf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, yf = { class: "ta-r mono-sm red fw-600" }, hf = { class: "ta-r mono-sm" }, bf = {
  key: 1,
  class: "empty-msg"
}, gf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, kf = { class: "mis-summary-card" }, ff = { class: "mis-summary-val red" }, wf = { class: "mis-summary-card" }, xf = { class: "mis-summary-val red" }, Cf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Sf = { class: "ta-r mono-sm red fw-600" }, jf = { class: "ta-r mono-sm" }, Mf = {
  key: 1,
  class: "empty-msg"
}, Df = {
  key: 2,
  class: "empty-msg"
}, Tf = {
  key: 21,
  class: "books-card report-card bs-card"
}, Rf = { class: "bs-page-head" }, Of = { class: "bs-page-head-actions" }, Pf = { class: "bs-asof" }, If = { class: "iws-export-wrap" }, Vf = ["disabled"], Nf = { class: "iws-menu" }, Ef = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, Bf = ["onClick"], qf = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Af = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, $f = { class: "mis-summary-card" }, Lf = { class: "mis-summary-val" }, Qf = { class: "mis-summary-card" }, Ff = { class: "mis-summary-val green" }, Hf = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, zf = { class: "ta-r mono-sm" }, Wf = { class: "ta-r mono-sm" }, Uf = { class: "ta-r mono-sm" }, Kf = { class: "ta-r mono-sm fw-600 green" }, Gf = {
  key: 1,
  class: "empty-msg"
}, Yf = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, Jf = { class: "mis-summary-card" }, Xf = { class: "mis-summary-val" }, Zf = { class: "mis-summary-card" }, tw = { class: "mis-summary-val" }, sw = { class: "mis-summary-card" }, ew = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, aw = { class: "ta-r mono-sm" }, ow = { class: "ta-r mono-sm" }, lw = { class: "ta-r mono-sm" }, nw = {
  key: 1,
  class: "empty-msg"
}, iw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, dw = { class: "ta-r mono-sm" }, rw = { class: "ta-r mono-sm" }, uw = { class: "ta-r mono-sm fw-600" }, cw = {
  key: 1,
  class: "empty-msg"
}, mw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, vw = { class: "ta-r mono-sm" }, _w = { class: "ta-r mono-sm" }, pw = {
  key: 1,
  class: "empty-msg"
}, yw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, hw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bw = { class: "ta-r mono-sm fw-600 green" }, gw = { class: "ta-r mono-sm" }, kw = { class: "ta-r mono-sm" }, fw = {
  key: 1,
  class: "empty-msg"
}, ww = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xw = { class: "ta-r mono-sm" }, Cw = { class: "ta-r mono-sm" }, Sw = { class: "ta-r mono-sm fw-600" }, jw = {
  key: 1,
  class: "empty-msg"
}, Mw = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Dw = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(2,1fr)", "margin-bottom": "16px" }
}, Tw = { class: "mis-summary-card" }, Rw = { class: "mis-summary-val red" }, Ow = { class: "mis-summary-card" }, Pw = { class: "mis-summary-val red" }, Iw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Vw = { class: "ta-r mono-sm red fw-600" }, Nw = { class: "ta-r mono-sm red" }, Ew = { class: "ta-r mono-sm" }, Bw = {
  key: 1,
  class: "empty-msg"
}, qw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Aw = { class: "ta-r mono-sm fw-600 green" }, $w = { class: "ta-r mono-sm" }, Lw = {
  key: 1,
  class: "empty-msg"
}, Qw = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Fw = { class: "ta-r mono-sm red fw-600" }, Hw = { class: "ta-r mono-sm" }, zw = {
  key: 1,
  class: "empty-msg"
}, Ww = {
  key: 2,
  class: "empty-msg"
}, Uw = {
  key: 22,
  class: "books-card report-card bs-card"
}, Kw = { class: "bs-page-head" }, Gw = { class: "bs-page-head-actions" }, Yw = { class: "bs-asof" }, Jw = { class: "iws-export-wrap" }, Xw = ["disabled"], Zw = { class: "iws-menu" }, t5 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, s5 = ["onClick"], e5 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, a5 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, o5 = { class: "mis-summary-grid" }, l5 = { class: "mis-summary-card" }, n5 = { class: "mis-summary-val" }, i5 = { class: "mis-summary-card" }, d5 = { class: "mis-summary-val green" }, r5 = { class: "mis-summary-card" }, u5 = { class: "mis-summary-val" }, c5 = { class: "mis-summary-card" }, m5 = { class: "mis-summary-val" }, v5 = { class: "mis-summary-card" }, _5 = { class: "mis-summary-val" }, p5 = { class: "mis-summary-card" }, y5 = { class: "mis-summary-val" }, h5 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, b5 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, g5 = { class: "mis-summary-card" }, k5 = { class: "mis-summary-val" }, f5 = { class: "mis-summary-card" }, w5 = { class: "mis-summary-val red" }, x5 = { class: "mis-summary-card" }, C5 = { class: "mis-summary-val red" }, S5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, j5 = { class: "ta-r mono-sm" }, M5 = { class: "ta-r mono-sm red fw-600" }, D5 = { class: "ta-r mono-sm" }, T5 = {
  key: 1,
  class: "empty-msg"
}, R5 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, O5 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, P5 = { class: "mis-summary-card" }, I5 = { class: "mis-summary-val" }, V5 = { class: "mis-summary-card" }, N5 = { class: "mis-summary-val red" }, E5 = { class: "mis-summary-card" }, B5 = { class: "mis-summary-val red" }, q5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, A5 = { class: "ta-r mono-sm" }, $5 = { class: "ta-r mono-sm" }, L5 = { class: "ta-r mono-sm red fw-600" }, Q5 = {
  key: 1,
  class: "empty-msg"
}, F5 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, H5 = { class: "mis-summary-card" }, z5 = { class: "mis-summary-val red" }, W5 = { class: "mis-summary-card" }, U5 = { class: "mis-summary-val red" }, K5 = { class: "mis-summary-card" }, G5 = { class: "mis-summary-val red" }, Y5 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, J5 = { class: "red fw-600" }, X5 = { class: "ta-r mono-sm red fw-600" }, Z5 = { class: "ta-r mono-sm" }, t4 = {
  key: 1,
  class: "empty-msg"
}, s4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, e4 = { class: "ta-r mono-sm" }, a4 = { class: "ta-r mono-sm" }, o4 = { class: "ta-r mono-sm red fw-600" }, l4 = {
  key: 1,
  class: "empty-msg"
}, n4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, i4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, d4 = { class: "ta-r mono-sm" }, r4 = { class: "ta-r mono-sm" }, u4 = { class: "ta-r mono-sm" }, c4 = { class: "ta-r mono-sm fw-600" }, m4 = {
  key: 1,
  class: "empty-msg"
}, v4 = {
  key: 2,
  class: "empty-msg"
}, _4 = {
  key: 23,
  class: "books-card report-card bs-card"
}, p4 = { class: "bs-page-head" }, y4 = { class: "bs-page-head-actions" }, h4 = { class: "bs-asof" }, b4 = { class: "iws-export-wrap" }, g4 = ["disabled"], k4 = { class: "iws-menu" }, f4 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, w4 = ["onClick"], x4 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, C4 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, S4 = { class: "mis-summary-grid" }, j4 = { class: "mis-summary-card" }, M4 = { class: "mis-summary-val" }, D4 = { class: "mis-summary-card" }, T4 = { class: "mis-summary-val" }, R4 = { class: "mis-summary-card" }, O4 = { class: "mis-summary-val" }, P4 = { class: "mis-summary-card" }, I4 = { class: "mis-summary-val" }, V4 = { class: "mis-summary-card" }, N4 = { class: "mis-summary-val green" }, E4 = { class: "mis-summary-card" }, B4 = { class: "mis-summary-val red" }, q4 = { class: "mis-summary-card" }, A4 = { class: "mis-summary-val green" }, $4 = { class: "mis-summary-card" }, L4 = { class: "mis-summary-val red" }, Q4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, F4 = { class: "badge badge-blue" }, H4 = { class: "ta-r mono-sm fw-600" }, z4 = {
  key: 1,
  class: "empty-msg"
}, W4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, U4 = { class: "ta-r mono-sm fw-600" }, K4 = {
  key: 1,
  class: "empty-msg"
}, G4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Y4 = { class: "badge badge-blue" }, J4 = { class: "ta-r mono-sm fw-600" }, X4 = {
  key: 1,
  class: "empty-msg"
}, Z4 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, t7 = { class: "ta-r mono-sm fw-600" }, s7 = {
  key: 1,
  class: "empty-msg"
}, e7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, a7 = { class: "ta-r mono-sm fw-600 green" }, o7 = {
  key: 1,
  class: "empty-msg"
}, l7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n7 = { class: "red fw-600" }, i7 = { class: "badge badge-blue" }, d7 = { class: "ta-r mono-sm" }, r7 = {
  key: 1,
  class: "empty-msg"
}, u7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, c7 = { class: "badge badge-blue" }, m7 = { class: "ta-r mono-sm fw-600 green" }, v7 = {
  key: 1,
  class: "empty-msg"
}, _7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, p7 = { class: "ta-r mono-sm red fw-600" }, y7 = {
  key: 1,
  class: "empty-msg"
}, h7 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(1,1fr)", "margin-bottom": "16px" }
}, b7 = { class: "mis-summary-card" }, g7 = { class: "mis-summary-val" }, k7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, f7 = { class: "badge badge-blue" }, w7 = { class: "ta-r mono-sm" }, x7 = { class: "ta-r mono-sm fw-600" }, C7 = {
  key: 1,
  class: "empty-msg"
}, S7 = {
  class: "mis-summary-grid",
  style: { "grid-template-columns": "repeat(3,1fr)", "margin-bottom": "16px" }
}, j7 = { class: "mis-summary-card" }, M7 = { class: "mis-summary-val" }, D7 = { class: "mis-summary-card" }, T7 = { class: "mis-summary-val" }, R7 = { class: "mis-summary-card" }, O7 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, P7 = { class: "ta-r mono-sm" }, I7 = { class: "ta-r mono-sm" }, V7 = { class: "ta-r mono-sm" }, N7 = {
  key: 1,
  class: "empty-msg"
}, E7 = {
  key: 2,
  class: "empty-msg"
}, B7 = {
  key: 24,
  class: "books-card report-card bs-card"
}, q7 = { class: "bs-page-head" }, A7 = { class: "bs-page-head-actions" }, $7 = { class: "bs-asof" }, L7 = { class: "iws-export-wrap" }, Q7 = ["disabled"], F7 = { class: "iws-menu" }, H7 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, z7 = ["onClick"], W7 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, U7 = { class: "mis-summary-grid" }, K7 = { class: "mis-summary-card" }, G7 = { class: "mis-summary-val" }, Y7 = { class: "mis-summary-card" }, J7 = { class: "mis-summary-val" }, X7 = { class: "mis-summary-card" }, Z7 = { class: "mis-summary-val" }, t6 = { class: "mis-summary-card" }, s6 = { class: "mis-summary-card" }, e6 = { class: "mis-summary-card" }, a6 = { class: "mis-summary-val" }, o6 = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, l6 = { class: "ta-r mono-sm" }, n6 = { class: "ta-r mono-sm" }, i6 = { class: "ta-r mono-sm" }, d6 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, r6 = { class: "ta-r mono-sm" }, u6 = { class: "ta-r mono-sm" }, c6 = { class: "ta-r mono-sm" }, m6 = { class: "ta-r mono-sm" }, v6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _6 = { class: "ta-r mono-sm" }, p6 = { class: "ta-r mono-sm" }, y6 = { class: "ta-r mono-sm" }, h6 = { key: 0 }, b6 = { class: "ta-r mono-sm" }, g6 = { class: "ta-r mono-sm" }, k6 = {
  key: 1,
  class: "empty-msg"
}, f6 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, w6 = { class: "ta-r mono-sm" }, x6 = { class: "ta-r mono-sm" }, C6 = { class: "ta-r mono-sm" }, S6 = {
  key: 1,
  class: "empty-msg"
}, j6 = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M6 = { class: "ta-r mono-sm" }, D6 = { class: "ta-r mono-sm" }, T6 = { class: "ta-r mono-sm" }, R6 = {
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
  key: 25,
  class: "books-card report-card bs-card"
}, B6 = { class: "bs-page-head" }, q6 = { class: "bs-page-head-actions" }, A6 = { class: "bs-asof" }, $6 = { class: "iws-export-wrap" }, L6 = ["disabled"], Q6 = { class: "iws-menu" }, F6 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, H6 = ["onClick"], z6 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, W6 = { class: "mis-summary-grid" }, U6 = { class: "mis-summary-card" }, K6 = { class: "mis-summary-val" }, G6 = { class: "mis-summary-card" }, Y6 = { class: "mis-summary-val" }, J6 = { class: "mis-summary-card" }, X6 = { class: "mis-summary-val" }, Z6 = { class: "mis-summary-card" }, t3 = { class: "mis-summary-val" }, s3 = { class: "mis-summary-card" }, e3 = { class: "mis-summary-val" }, a3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, o3 = { class: "ta-r mono-sm" }, l3 = { class: "ta-r mono-sm fw-600" }, n3 = {
  key: 1,
  class: "empty-msg"
}, i3 = {
  key: 2,
  class: "books-table aging-table",
  style: { width: "100%" }
}, d3 = { class: "ta-r mono-sm" }, r3 = { class: "ta-r mono-sm fw-600" }, u3 = { class: "ta-r mono-sm" }, c3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, m3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, v3 = { class: "ta-r mono-sm" }, _3 = { class: "ta-r mono-sm" }, p3 = {
  key: 1,
  class: "empty-msg"
}, y3 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, h3 = { class: "mis-summary-card" }, b3 = { class: "mis-summary-val" }, g3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, k3 = { class: "ta-r mono-sm" }, f3 = { class: "ta-r mono-sm fw-600" }, w3 = {
  key: 1,
  class: "empty-msg"
}, x3 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, C3 = { class: "mis-summary-card" }, S3 = { class: "mis-summary-val" }, j3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, M3 = { class: "ta-r mono-sm" }, D3 = { class: "ta-r mono-sm fw-600" }, T3 = {
  key: 1,
  class: "empty-msg"
}, R3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, O3 = { class: "ta-r mono-sm" }, P3 = { class: "ta-r mono-sm fw-600" }, I3 = {
  key: 1,
  class: "empty-msg"
}, V3 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, N3 = { class: "ta-r mono-sm fw-600 red" }, E3 = { class: "ta-r mono-sm" }, B3 = { style: { "font-size": "11px", color: "#94a3b8" } }, q3 = {
  key: 1,
  class: "empty-msg"
}, A3 = {
  key: 2,
  class: "empty-msg"
}, $3 = {
  key: 26,
  class: "books-card report-card bs-card"
}, L3 = { class: "bs-page-head" }, Q3 = { class: "bs-page-head-actions" }, F3 = { class: "bs-asof" }, H3 = { class: "iws-export-wrap" }, z3 = ["disabled"], W3 = { class: "iws-menu" }, U3 = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, K3 = ["onClick"], G3 = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Y3 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, J3 = { class: "mis-summary-grid" }, X3 = { class: "mis-summary-card" }, Z3 = { class: "mis-summary-val" }, tx = { class: "mis-summary-card" }, sx = { class: "mis-summary-val red" }, ex = { class: "mis-summary-card" }, ax = { class: "mis-summary-val green" }, ox = { class: "mis-summary-card" }, lx = { class: "mis-summary-val" }, nx = { class: "mis-summary-card" }, ix = { class: "mis-summary-val" }, dx = { class: "mis-summary-card" }, rx = { class: "mis-summary-val" }, ux = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, cx = { class: "ta-r mono-sm" }, mx = { class: "ta-r mono-sm" }, vx = { class: "ta-r mono-sm" }, _x = { class: "ta-r mono-sm" }, px = { class: "ta-r mono-sm red" }, yx = { class: "ta-r mono-sm fw-600" }, hx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bx = { class: "ta-r mono-sm red" }, gx = { class: "ta-r mono-sm fw-600" }, kx = {
  key: 1,
  class: "empty-msg"
}, fx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, wx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, xx = { class: "ta-r mono-sm fw-600" }, Cx = {
  key: 1,
  class: "empty-msg"
}, Sx = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, jx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Mx = { class: "ta-r mono-sm fw-600" }, Dx = {
  key: 1,
  class: "empty-msg"
}, Tx = {
  key: 5,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Rx = { class: "ta-r mono-sm" }, Ox = { class: "ta-r mono-sm fw-600" }, Px = { class: "ta-r mono-sm" }, Ix = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Vx = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, Nx = { class: "ta-r mono-sm" }, Ex = {
  key: 2,
  class: "empty-msg"
}, Bx = {
  key: 27,
  class: "books-card report-card bs-card"
}, qx = { class: "bs-page-head" }, Ax = { class: "bs-page-head-actions" }, $x = { class: "bs-asof" }, Lx = { class: "iws-export-wrap" }, Qx = ["disabled"], Fx = { class: "iws-menu" }, Hx = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, zx = ["onClick"], Wx = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, Ux = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Kx = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Gx = { class: "mis-summary-card" }, Yx = { class: "mis-summary-val" }, Jx = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Xx = { class: "ta-r mono-sm" }, Zx = { class: "ta-r mono-sm fw-600" }, t9 = {
  key: 1,
  class: "empty-msg"
}, s9 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, e9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, a9 = { class: "mis-summary-card" }, o9 = { class: "mis-summary-val" }, l9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, n9 = { class: "ta-r mono-sm" }, i9 = { class: "ta-r mono-sm fw-600" }, d9 = {
  key: 1,
  class: "empty-msg"
}, r9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, u9 = { class: "mis-summary-card" }, c9 = { class: "mis-summary-val" }, m9 = { class: "mis-summary-card" }, v9 = { class: "mis-summary-val green" }, _9 = { class: "mis-summary-card" }, p9 = { class: "mis-summary-val red" }, y9 = { class: "mis-summary-card" }, h9 = { class: "mis-summary-val" }, b9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, g9 = { class: "ta-r mono-sm green" }, k9 = { class: "ta-r mono-sm red" }, f9 = { class: "ta-r mono-sm fw-600" }, w9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, x9 = { class: "mis-summary-card" }, C9 = { class: "mis-summary-val" }, S9 = { class: "mis-summary-card" }, j9 = { class: "mis-summary-val green" }, M9 = { class: "mis-summary-card" }, D9 = { class: "mis-summary-val red" }, T9 = { class: "mis-summary-card" }, R9 = { class: "mis-summary-val" }, O9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, P9 = { class: "ta-r mono-sm green" }, I9 = { class: "ta-r mono-sm red" }, V9 = { class: "ta-r mono-sm fw-600" }, N9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, E9 = { class: "mis-summary-card" }, B9 = { class: "mis-summary-val green" }, q9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, A9 = { class: "ta-r mono-sm fw-600 green" }, $9 = {
  key: 1,
  class: "empty-msg"
}, L9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Q9 = { class: "mis-summary-card" }, F9 = { class: "mis-summary-val red" }, H9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, z9 = { class: "ta-r mono-sm fw-600 red" }, W9 = {
  key: 1,
  class: "empty-msg"
}, U9 = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, K9 = {
  class: "books-table aging-table",
  style: { width: "100%" }
}, G9 = { class: "ta-r mono-sm green" }, Y9 = { class: "ta-r mono-sm red" }, J9 = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, X9 = { class: "mis-summary-card" }, Z9 = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, tC = { class: "red" }, sC = { class: "ta-r mono-sm fw-600 red" }, eC = {
  key: 1,
  class: "empty-msg"
}, aC = {
  key: 2,
  class: "empty-msg"
}, oC = {
  key: 28,
  class: "books-card report-card bs-card"
}, lC = { class: "bs-page-head" }, nC = { class: "bs-page-head-actions" }, iC = { class: "bs-asof" }, dC = { class: "iws-export-wrap" }, rC = ["disabled"], uC = { class: "iws-menu" }, cC = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, mC = ["onClick"], vC = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, _C = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, pC = { class: "mis-summary-card" }, yC = { class: "mis-summary-val" }, hC = { class: "mis-summary-card" }, bC = { class: "mis-summary-val" }, gC = { class: "mis-summary-card" }, kC = { class: "mis-summary-val green" }, fC = { class: "mis-summary-card" }, wC = { class: "mis-summary-val" }, xC = { class: "mis-summary-card" }, CC = { class: "mis-summary-val" }, SC = { class: "mis-summary-card" }, jC = { class: "mis-summary-val green" }, MC = { class: "mis-summary-card" }, DC = { class: "mis-summary-val red" }, TC = { class: "mis-summary-card" }, RC = { class: "mis-summary-val" }, OC = { class: "mis-summary-card" }, PC = { class: "mis-summary-val red" }, IC = { class: "mis-summary-card" }, VC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, NC = { class: "mis-summary-card" }, EC = { class: "mis-summary-val" }, BC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, qC = { class: "ta-r mono-sm" }, AC = { class: "ta-r mono-sm fw-600" }, $C = {
  key: 1,
  class: "empty-msg"
}, LC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, QC = { class: "mis-summary-card" }, FC = { class: "mis-summary-val" }, HC = { class: "mis-summary-card" }, zC = { class: "mis-summary-val green" }, WC = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, UC = { class: "ta-r mono-sm" }, KC = { class: "ta-r mono-sm fw-600" }, GC = {
  key: 1,
  class: "empty-msg"
}, YC = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, JC = { class: "mis-summary-card" }, XC = { class: "mis-summary-val" }, ZC = { class: "mis-summary-card" }, tS = { class: "mis-summary-val green" }, sS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, eS = { class: "ta-r mono-sm" }, aS = { class: "ta-r mono-sm fw-600" }, oS = {
  key: 1,
  class: "empty-msg"
}, lS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nS = { class: "ta-r mono-sm" }, iS = { class: "ta-r mono-sm" }, dS = { class: "ta-r mono-sm" }, rS = { class: "ta-r mono-sm" }, uS = { class: "ta-r mono-sm fw-600" }, cS = { class: "ta-r mono-sm red" }, mS = { class: "ta-r mono-sm" }, vS = {
  key: 1,
  class: "empty-msg"
}, _S = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, pS = { class: "mis-summary-card" }, yS = { class: "mis-summary-val red" }, hS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, bS = { class: "ta-r mono-sm" }, gS = { class: "ta-r mono-sm fw-600 red" }, kS = {
  key: 1,
  class: "empty-msg"
}, fS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, wS = { class: "mis-summary-card" }, xS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, CS = { class: "ta-r mono-sm" }, SS = { class: "ta-r mono-sm" }, jS = { class: "ta-r mono-sm" }, MS = { class: "ta-r mono-sm" }, DS = {
  key: 1,
  class: "empty-msg"
}, TS = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, RS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, OS = { class: "mis-summary-card" }, PS = { class: "mis-summary-val" }, IS = { class: "mis-summary-card" }, VS = { class: "mis-summary-val green" }, NS = { class: "mis-summary-card" }, ES = { class: "mis-summary-val red" }, BS = { class: "mis-summary-card" }, qS = { class: "mis-summary-val" }, AS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $S = {
  key: 1,
  class: "empty-msg"
}, LS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, QS = { class: "ta-r mono-sm" }, FS = { class: "ta-r mono-sm fw-600" }, HS = {
  key: 1,
  class: "empty-msg"
}, zS = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, WS = { class: "mis-summary-card" }, US = { class: "mis-summary-val" }, KS = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, GS = { class: "ta-r mono-sm red" }, YS = { class: "ta-r mono-sm" }, JS = { class: "ta-r mono-sm" }, XS = {
  key: 1,
  class: "empty-msg"
}, ZS = {
  key: 2,
  class: "empty-msg"
}, tj = {
  key: 29,
  class: "books-card report-card bs-card"
}, sj = { class: "bs-page-head" }, ej = { class: "bs-page-head-actions" }, aj = { class: "bs-asof" }, oj = { class: "iws-export-wrap" }, lj = ["disabled"], nj = { class: "iws-menu" }, ij = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, dj = ["onClick"], rj = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, uj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, cj = { class: "mis-summary-card" }, mj = { class: "mis-summary-val" }, vj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, _j = { class: "ta-r mono-sm" }, pj = { class: "ta-r mono-sm" }, yj = { class: "ta-r mono-sm" }, hj = { class: "ta-r mono-sm" }, bj = { class: "ta-r mono-sm fw-600" }, gj = { class: "ta-r mono-sm red" }, kj = { class: "ta-r mono-sm" }, fj = {
  key: 1,
  class: "empty-msg"
}, wj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, xj = { class: "mis-summary-card" }, Cj = { class: "mis-summary-val red" }, Sj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jj = { class: "ta-r mono-sm" }, Mj = { class: "ta-r mono-sm fw-600 red" }, Dj = { class: "ta-r mono-sm red" }, Tj = {
  key: 1,
  class: "empty-msg"
}, Rj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, Oj = { class: "ta-r mono-sm" }, Pj = { class: "ta-r mono-sm" }, Ij = { class: "ta-r mono-sm" }, Vj = { class: "ta-r mono-sm" }, Nj = { class: "ta-r mono-sm red" }, Ej = { class: "ta-r mono-sm fw-600" }, Bj = {
  key: 1,
  class: "empty-msg"
}, qj = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, Aj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, $j = { class: "ta-r mono-sm" }, Lj = { class: "ta-r mono-sm fw-600" }, Qj = {
  key: 0,
  class: "pill pill-green"
}, Fj = {
  key: 1,
  class: "empty-msg"
}, Hj = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, zj = { class: "ta-r mono-sm fw-600" }, Wj = { class: "ta-r mono-sm red" }, Uj = { class: "ta-r mono-sm" }, Kj = { class: "ta-r mono-sm" }, Gj = { class: "ta-r mono-sm" }, Yj = {
  key: 1,
  class: "empty-msg"
}, Jj = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, Xj = { class: "mis-summary-card" }, Zj = { class: "mis-summary-val green" }, tM = { class: "mis-summary-card" }, sM = { class: "mis-summary-val" }, eM = { class: "mis-summary-card" }, aM = { class: "mis-summary-val red" }, oM = { class: "mis-summary-card" }, lM = { class: "mis-summary-val" }, nM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, iM = { class: "ta-r mono-sm" }, dM = { class: "ta-r mono-sm green" }, rM = { class: "ta-r mono-sm red" }, uM = { class: "ta-r mono-sm fw-600" }, cM = { class: "ta-r mono-sm" }, mM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, vM = {
  key: 2,
  class: "empty-msg"
}, _M = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, pM = { class: "mis-summary-card" }, yM = { class: "mis-summary-val" }, hM = { class: "mis-summary-card" }, bM = { class: "mis-summary-val red" }, gM = { class: "mis-summary-card" }, kM = { class: "mis-summary-val red" }, fM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, wM = { class: "ta-r mono-sm" }, xM = { class: "ta-r mono-sm green" }, CM = { class: "ta-r mono-sm red" }, SM = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, jM = { class: "ta-r mono-sm" }, MM = { class: "ta-r mono-sm green" }, DM = { class: "ta-r mono-sm red" }, TM = {
  key: 2,
  class: "empty-msg"
}, RM = {
  key: 2,
  class: "empty-msg"
}, OM = {
  key: 30,
  class: "books-card report-card bs-card"
}, PM = { class: "bs-page-head" }, IM = { class: "bs-page-head-actions" }, VM = { class: "bs-asof" }, NM = { class: "iws-export-wrap" }, EM = ["disabled"], BM = { class: "iws-menu" }, qM = {
  class: "report-tabs",
  style: { "margin-bottom": "14px" }
}, AM = ["onClick"], $M = {
  key: 0,
  class: "loading-shimmer",
  style: { height: "220px", "border-radius": "8px" }
}, LM = { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, QM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, FM = { class: "ta-r mono-sm" }, HM = { class: "ta-r mono-sm" }, zM = { class: "ta-r mono-sm" }, WM = {
  key: 1,
  class: "empty-msg"
}, UM = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, KM = { class: "mis-summary-card" }, GM = { class: "mis-summary-val" }, YM = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, JM = { class: "ta-r mono-sm fw-600" }, XM = { style: { "font-size": "11.5px", color: "#64748b" } }, ZM = {
  key: 1,
  class: "empty-msg"
}, tD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, sD = { class: "mis-summary-card" }, eD = { class: "mis-summary-val green" }, aD = { class: "mis-summary-card" }, oD = { class: "mis-summary-val" }, lD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, nD = { class: "ta-r mono-sm" }, iD = { class: "ta-r mono-sm fw-600 green" }, dD = { class: "ta-r" }, rD = ["onUpdate:modelValue"], uD = {
  key: 1,
  class: "empty-msg"
}, cD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, mD = { class: "mis-summary-card" }, vD = { class: "mis-summary-val green" }, _D = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, pD = { class: "ta-r mono-sm" }, yD = { class: "ta-r mono-sm fw-600 green" }, hD = {
  key: 1,
  class: "empty-msg"
}, bD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, gD = { class: "mis-summary-card" }, kD = { class: "mis-summary-val" }, fD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, wD = { class: "ta-r mono-sm" }, xD = { class: "ta-r mono-sm" }, CD = { class: "ta-r mono-sm fw-600" }, SD = { class: "ta-r mono-sm" }, jD = { class: "ta-r mono-sm" }, MD = {
  key: 1,
  class: "empty-msg"
}, DD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, TD = { class: "ta-r mono-sm" }, RD = { class: "ta-r mono-sm fw-600 red" }, OD = {
  key: 1,
  class: "empty-msg"
}, PD = {
  class: "mis-summary-grid",
  style: { "margin-bottom": "14px" }
}, ID = { class: "mis-summary-card" }, VD = { class: "mis-summary-val red" }, ND = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%", "margin-bottom": "20px" }
}, ED = { class: "ta-r mono-sm" }, BD = { class: "ta-r mono-sm fw-600" }, qD = {
  key: 1,
  class: "books-table aging-table",
  style: { width: "100%" }
}, AD = { class: "ta-r mono-sm" }, $D = { class: "ta-r mono-sm" }, LD = { class: "ta-r mono-sm fw-600" }, QD = {
  key: 2,
  class: "empty-msg"
}, FD = {
  key: 0,
  class: "books-table aging-table",
  style: { width: "100%" }
}, HD = { class: "ta-r mono-sm" }, zD = { class: "ta-r mono-sm" }, WD = { class: "ta-r mono-sm" }, UD = { class: "ta-r mono-sm" }, KD = { class: "ta-r mono-sm" }, GD = {
  key: 1,
  class: "empty-msg"
}, YD = {
  key: 2,
  class: "empty-msg"
}, JD = {
  __name: "Reports",
  setup(F) {
    const S = Pn, d = (i) => i != null ? "KES " + Number(i).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—", p = (i) => Number(i || 0).toLocaleString("en-US", { maximumFractionDigits: 0 }), H = (i) => Number(i || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function G(i) {
      const s = String(i || "").length;
      let n = 24;
      return s > 18 ? n = 15 : s > 15 ? n = 17 : s > 12 ? n = 19 : s > 10 && (n = 21), { fontSize: n + "px" };
    }
    const lt = /* @__PURE__ */ new Date(), x = v(new Date(lt.getFullYear(), lt.getMonth(), 1).toISOString().slice(0, 10)), y = v(lt.toISOString().slice(0, 10)), k = v("mrn_lpo"), St = {
      mrn_lpo: "mrn_vs_lpo",
      lpo_grn: "lpo_vs_grn",
      proj_summary: "project_summary",
      supp_analysis: "supplier_analysis",
      asset_reg: "asset_register",
      // Sava Phase 2: labour contract reports (psd_books.api.labour_reports)
      lab_contract: "contract_status",
      lab_wages: "employee_wages",
      lab_weekly: "weekly_payments"
    }, de = ["lab_contract", "lab_wages", "lab_weekly"], re = ["asset_reg", "lab_wages", "lab_weekly"], zt = v(""), Ee = v([]), Wt = v([]), qt = v({}), nl = V(() => !!qt.value[k.value]), ue = v(!1);
    let Ra = 0;
    const Zs = v("");
    async function ce() {
      const i = k.value, s = St[i];
      if (s) {
        Ra++, ue.value = !0, Zs.value = "";
        try {
          const n = re.includes(i) ? { from_date: x.value, to_date: y.value } : zt.value ? { project: zt.value } : {}, r = await K("psd_books.api." + (de.includes(i) ? "labour_reports." : "procurement_reports.") + s, n), _ = Array.isArray(r) ? r : (r == null ? void 0 : r.message) || [];
          if (qt.value = { ...qt.value, [i]: { rows: _, project: zt.value } }, k.value === i && (Wt.value = _), !Ee.value.length) {
            const j = await K("psd_books.api.procurement_reports.project_summary", {});
            Ee.value = (Array.isArray(j) ? j : (j == null ? void 0 : j.message) || []).map((M) => M.project);
          }
        } catch (n) {
          qt.value = { ...qt.value, [i]: { rows: [], project: zt.value } }, k.value === i && (Zs.value = n.message || "Failed to load report", Wt.value = []);
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
    }, Oa = { project_name: "Project", billed_pct: "Billed %", employee_id: "Employee ID", sha: "SHA", ot_amount: "OT Amount", rate: "Rate/Day" }, dl = [
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
      "week"
    ], Pa = {
      mrn_lpo: "Search MRN, project, item code, item name",
      lpo_grn: "Search LPO, supplier, project, item",
      proj_summary: "Search project",
      asset_reg: "Search item code, item name",
      lab_contract: "Search contract, project, task, contractor",
      lab_wages: "Search employee",
      lab_weekly: "Search week"
    }, ns = v(""), Ia = V(() => !!Pa[k.value]), rl = V(() => Pa[k.value] || "Search"), is = V(() => {
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
      const s = il[k.value] || [];
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
    }, ul = V(() => (Va[k.value] || [""])[0]), cl = V(() => (Va[k.value] || ["", ""])[1]), ml = { mrn: "MRN", lpo: "LPO", grn: "GRN", uom: "UOM" };
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
      ll(St[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".xlsx", s, n);
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
      j.href = _, j.download = St[k.value] + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv", j.click(), URL.revokeObjectURL(_);
    }
    Ta(k, (i) => {
      const s = qt.value[i];
      Zs.value = "", ns.value = "", Wt.value = s ? s.rows : [], s ? zt.value = s.project : ce();
    }, { immediate: !0 }), Ta([x, y], () => {
      const i = k.value;
      if (!re.includes(i) || x.value && y.value && x.value > y.value) return;
      const s = { ...qt.value };
      for (const n of re) n !== i && delete s[n];
      qt.value = s, qt.value[i] && ce();
    }), Ta(zt, () => {
      const i = qt.value[k.value];
      St[k.value] && i && i.project !== zt.value && ce();
    });
    const { data: at, loading: yl, execute: hl } = ie("psd_books.db.queries.get_profit_and_loss"), { data: pt, loading: bl, execute: gl } = ie("psd_books.db.queries.get_balance_sheet_totals"), { data: J, loading: kl, execute: fl } = ie("psd_books.db.queries.get_cash_flow"), { data: ds, loading: wl, execute: xl } = ie("psd_books.db.queries.get_gst_summary"), { data: Yt, loading: Cl, execute: Sl } = ie("psd_books.db.queries.get_trial_balance"), rs = v(!1), As = v(null), Jt = v({ key: "", dir: "asc" });
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
    function he(i) {
      return [i.account, i.account_type, i.opening || 0, i.debit || 0, i.credit || 0, i.closing || 0];
    }
    function jl() {
      var r;
      const i = qe.value.map((_) => he(_).join("	")), s = mt.value;
      i.push(["Total", "", s.opening, s.debit, s.credit, s.closing].join("	"));
      const n = [ye.join("	"), ...i].join(`
`);
      (r = navigator.clipboard) != null && r.writeText && navigator.clipboard.writeText(n);
    }
    function Ml(i) {
      var n;
      const s = [ye.join("	"), he(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function Dl(i) {
      const s = [ye.join(","), he(i).join(",")].join(`
`), n = String(i.account || "account").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(s, "trial_balance_" + n + "_" + y.value + ".csv");
    }
    function Ea() {
      var r;
      if (!((r = Yt.value) != null && r.length)) return;
      const i = qe.value.map((_) => he(_).join(",")), s = mt.value;
      i.push(["Total", "", s.opening, s.debit, s.credit, s.closing].join(","));
      const n = [ye.join(","), ...i].join(`
`);
      gt(n, "trial_balance_" + y.value + ".csv");
    }
    const rt = v([]), ut = v([]), us = v(!1), Qs = v(null), Xt = v({ key: "", dir: "asc" });
    function ft(i, s) {
      return i.reduce((n, r) => n + Number(r[s] || 0), 0);
    }
    const jt = V(() => ({
      current: ft(rt.value, "current"),
      days_1_30: ft(rt.value, "days_1_30"),
      days_31_60: ft(rt.value, "days_31_60"),
      days_61_90: ft(rt.value, "days_61_90"),
      days_90_plus: ft(rt.value, "days_90_plus"),
      total: ft(rt.value, "total")
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
    function be(i, s) {
      return [s ? i.customer_name || i.customer : i.supplier_name || i.supplier, i.current, i.days_1_30, i.days_31_60, i.days_61_90, i.days_90_plus, i.total];
    }
    function ge(i) {
      return [i ? "Customer" : "Vendor", "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"];
    }
    function Tl() {
      var _;
      const i = ge(!0), s = Ba.value.map((j) => be(j, !0).join("	")), n = jt.value;
      s.push(["Total", n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join("	"));
      const r = [i.join("	"), ...s].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    function qa(i, s) {
      var _;
      const r = [ge(s).join("	"), be(i, s).join("	")].join(`
`);
      (_ = navigator.clipboard) != null && _.writeText && navigator.clipboard.writeText(r);
    }
    function Aa(i, s) {
      const r = [ge(s).join(","), be(i, s).join(",")].join(`
`), _ = String((s ? i.customer : i.supplier) || "party").replace(/[^A-Za-z0-9_-]+/g, "_");
      gt(r, (s ? "ar_aging_" : "ap_aging_") + _ + "_" + y.value + ".csv");
    }
    const vs = v(!1), Fs = v(null), Zt = v({ key: "", dir: "asc" }), Mt = V(() => ({
      current: ft(ut.value, "current"),
      days_1_30: ft(ut.value, "days_1_30"),
      days_31_60: ft(ut.value, "days_31_60"),
      days_61_90: ft(ut.value, "days_61_90"),
      days_90_plus: ft(ut.value, "days_90_plus"),
      total: ft(ut.value, "total")
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
      const i = ge(!1), s = $a.value.map((j) => be(j, !1).join("	")), n = Mt.value;
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
    const tt = v(null), Ke = v(!1), Za = v(!1), ys = v(!1), se = v(null), Hs = v(null), zs = v({ key: "", dir: "asc" }), hs = v({ key: "", dir: "asc" });
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
    function ke(i) {
      zs.value = zs.value.key === i ? { key: i, dir: zs.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function fe(i) {
      return zs.value.key !== i ? "" : zs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
    }
    const Ge = V(() => {
      var _;
      const i = [...((_ = tt.value) == null ? void 0 : _.items) || []], s = hs.value.key;
      if (!s) return i;
      const n = hs.value.dir === "desc" ? -1 : 1, r = (j) => s === "item" ? String(j.item_name || j.item_code || "").toLowerCase() : s === "warehouse" ? String(j.warehouse || "").toLowerCase() : Number(j[s] || 0);
      return i.sort((j, M) => {
        const N = r(j), Nt = r(M);
        return typeof N == "string" ? n * N.localeCompare(Nt) : n * (N - Nt);
      }), i;
    });
    function ee(i) {
      hs.value = hs.value.key === i ? { key: i, dir: hs.value.dir === "asc" ? "desc" : "asc" } : { key: i, dir: "asc" };
    }
    function ae(i) {
      return hs.value.key !== i ? "" : hs.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
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
    }), X = v(null), ta = v(!1), lo = v(!1), O = v(null), sa = v(!1), no = v(!1), yt = v("summary"), bs = v(0), Ql = [
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
        return bs.value ? (((s = (i = O.value) == null ? void 0 : i.summary) == null ? void 0 : s.grand_total) || 0) / bs.value * 100 : 0;
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
    ), B = v(null), aa = v(!1), co = v(!1), Ot = v("summary"), ks = v(0), Hl = [
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
        return ks.value ? (((s = (i = B.value) == null ? void 0 : i.summary) == null ? void 0 : s.grand_total) || 0) / ks.value * 100 : 0;
      }
    ), R = v(null), oa = v(!1), vo = v(!1), ht = v("current_stock"), zl = [
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
    ], T = v(null), la = v(!1), _o = v(!1), bt = v("plan_vs_actual"), Wl = [
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
    ], q = v(null), da = v(!1), ho = v(!1), vt = v("summary"), Gl = [
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
    ], W = v(null), ra = v(!1), bo = v(!1), Lt = v("summary"), Yl = [
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
    ], Z = v(null), ca = v(!1), ko = v(!1), Qt = v("summary"), Xl = [
      { key: "summary", label: "Supplier Outstanding" },
      { key: "ageing", label: "Payable Ageing" },
      { key: "overdue", label: "Overdue Payables" },
      { key: "due_week", label: "Due This Week" },
      { key: "due_month", label: "Due This Month" },
      { key: "supplier", label: "Supplier-wise Outstanding" },
      { key: "forecast", label: "Payment Due Forecast" }
    ], E = v(null), ma = v(!1), fo = v(!1), It = v("cash_position"), Zl = [
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
    const ha = V(() => {
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
    function ba(i, s) {
      return s == null || i == null ? null : s === 0 ? i === 0 ? 0 : null : (i - s) / Math.abs(s) * 100;
    }
    const fs = V(() => Dt.value.length > 1 ? Dt.value[Dt.value.length - 2] : null), ws = V(() => Dt.value.length ? Dt.value[Dt.value.length - 1] : null), To = V(() => ws.value && fs.value ? ba(ws.value.income, fs.value.income) : null), Ro = V(() => ws.value && fs.value ? ba(ws.value.expense, fs.value.expense) : null), Oo = V(() => !ws.value || !fs.value ? null : ba((ws.value.income || 0) - (ws.value.expense || 0), (fs.value.income || 0) - (fs.value.expense || 0)));
    function ga(i, s) {
      if (i === null) return "muted";
      if (i === 0) return "neutral";
      const n = i > 0;
      return (s ? !n : n) ? "up" : "down";
    }
    function ka(i) {
      return i === null || i === 0 ? "— No change" : `${i > 0 ? "↑" : "↓"} ${Math.abs(Math.round(i))}% vs previous period`;
    }
    const ln = V(() => {
      if (!at.value) return [];
      const i = [];
      return Number(at.value.total_expense) > Number(at.value.total_income) && i.push({ icon: "↗", tone: "warn", title: "Expenses are higher", desc: "Your expenses are higher than income in this period." }), Number(at.value.net_profit) < 0 ? i.push({ icon: "↘", tone: "loss", title: "Net loss", desc: `You had a net loss of ${S(Math.abs(at.value.net_profit))} in the selected period.` }) : Number(at.value.net_profit) > 0 && i.push({ icon: "↗", tone: "good", title: "Net profit", desc: `You made a net profit of ${S(at.value.net_profit)} in the selected period.` }), i;
    }), xs = V(() => ct.value.filter((i) => i.cost_rate).reduce((i, s) => i + Number(s.profit || 0), 0)), Me = V(() => {
      const i = ct.value.filter((r) => r.cost_rate), s = i.reduce((r, _) => r + Number(_.revenue || 0), 0), n = i.reduce((r, _) => r + Number(_.profit || 0), 0);
      return s !== 0 ? n / s * 100 : 0;
    }), Ks = V(() => ct.value.filter((i) => !i.cost_rate).length), Cs = v(!1), Gs = v(null), ts = v({ key: "", dir: "asc" }), fa = V(() => {
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
      const i = fa.value.map((r) => Te(r).join("	")), s = [De.join("	"), ...i].join(`
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
      if (St[k.value]) {
        await ce();
        return;
      }
      if (!["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) && x.value && y.value && x.value > y.value) {
        alert("From date cannot be after To date.");
        return;
      }
      const s = await Rn(), n = { company: s, from_date: x.value || "", to_date: y.value || "" };
      if (k.value === "pl") {
        await hl(n);
        try {
          Dt.value = await K("psd_books.db.queries.get_pl_monthly_breakdown", n) || [];
        } catch {
          Dt.value = [];
        }
      }
      if (k.value === "bs" && await gl({ company: s, as_of_date: y.value }), k.value === "cf") {
        await fl(n);
        try {
          const r = Pl(x.value, y.value), _ = await Promise.all(r.map(
            (j) => K("psd_books.db.queries.get_cash_flow", { company: s, from_date: j.from, to_date: j.to })
          ));
          te.value = r.map((j, M) => ({ month: j.month, ..._[M] || {} }));
        } catch {
          te.value = [];
        }
      }
      if (k.value === "gst" && await xl(n), k.value === "tb" && await Sl(n), k.value === "ar") {
        $e.value = !0, Wa.value = !0;
        try {
          rt.value = await K("psd_books.db.queries.get_ar_aging", { company: s, as_of_date: y.value }) || [];
        } catch {
          rt.value = [];
        }
        $e.value = !1;
      }
      if (k.value === "ap") {
        Le.value = !0, Ua.value = !0;
        try {
          ut.value = await K("psd_books.db.queries.get_ap_aging", { company: s, as_of_date: y.value }) || [];
        } catch {
          ut.value = [];
        }
        Le.value = !1;
      }
      if (k.value === "items") {
        Qe.value = !0, Ka.value = !0;
        try {
          At.value = await K("psd_books.db.queries.get_item_wise_sales", n) || [];
        } catch {
          At.value = [];
        }
        Qe.value = !1;
      }
      if (k.value === "customers") {
        Fe.value = !0, Ga.value = !0;
        try {
          $t.value = await K("psd_books.db.queries.get_customer_wise_sales", n) || [];
        } catch {
          $t.value = [];
        }
        Fe.value = !1;
      }
      if (k.value === "profit") {
        He.value = !0, Ya.value = !0;
        try {
          ct.value = await K("psd_books.db.queries.get_profit_wise_report", n) || [];
        } catch {
          ct.value = [];
        }
        He.value = !1;
      }
      if (k.value === "invoice_profit") {
        ze.value = !0, Ja.value = !0, Tt.value = /* @__PURE__ */ new Set();
        try {
          dt.value = await K("psd_books.db.queries.get_invoice_wise_profit", n) || [];
        } catch {
          dt.value = [];
        }
        ze.value = !1;
      }
      if (k.value === "stockgl") {
        Ke.value = !0, Za.value = !0;
        try {
          tt.value = await K("psd_books.db.queries.get_inventory_reconciliation", { company: s }) || null;
        } catch {
          tt.value = null;
        }
        Ke.value = !1;
      }
      if (k.value === "stockval") {
        Je.value = !0, ao.value = !0;
        try {
          wt.value = await K("psd_books.api.inventory.get_stock_valuation_report", { as_of_date: y.value }) || null;
        } catch {
          wt.value = null;
        }
        Je.value = !1;
      }
      if (k.value === "price_mrp") {
        Xe.value = !0, oo.value = !0;
        try {
          oe.value = await K("psd_books.api.inventory.get_selling_mrp_report", {}) || null;
        } catch {
          oe.value = null;
        }
        Xe.value = !1;
      }
      if (k.value === "mis") {
        ta.value = !0, lo.value = !0;
        try {
          X.value = await K("psd_books.db.queries.get_daily_business_mis", n) || null;
        } catch {
          X.value = null;
        }
        ta.value = !1;
      }
      if (k.value === "sales_mis") {
        sa.value = !0, no.value = !0;
        try {
          O.value = await K("psd_books.db.queries.get_sales_mis", n) || null;
        } catch {
          O.value = null;
        }
        sa.value = !1;
      }
      if (k.value === "receivables") {
        ea.value = !0, ro.value = !0;
        try {
          I.value = await K("psd_books.db.queries.get_receivables_mis", n) || null;
        } catch {
          I.value = null;
        }
        ea.value = !1;
      }
      if (k.value === "purchase_mis") {
        aa.value = !0, co.value = !0;
        try {
          B.value = await K("psd_books.db.queries.get_purchase_mis", n) || null;
        } catch {
          B.value = null;
        }
        aa.value = !1;
      }
      if (k.value === "inventory_mis") {
        oa.value = !0, vo.value = !0;
        try {
          R.value = await K("psd_books.db.queries.get_inventory_mis", n) || null;
        } catch {
          R.value = null;
        }
        oa.value = !1;
      }
      if (k.value === "production_mis") {
        la.value = !0, _o.value = !0;
        try {
          T.value = await K("psd_books.db.queries.get_production_mis", n) || null;
        } catch {
          T.value = null;
        }
        la.value = !1;
      }
      if (k.value === "product_mis") {
        na.value = !0, po.value = !0;
        try {
          A.value = await K("psd_books.db.queries.get_product_mis", n) || null;
        } catch {
          A.value = null;
        }
        na.value = !1;
      }
      if (k.value === "dispatch_mis") {
        ia.value = !0, yo.value = !0;
        try {
          z.value = await K("psd_books.db.queries.get_dispatch_delivery_mis", n) || null;
        } catch {
          z.value = null;
        }
        ia.value = !1;
      }
      if (k.value === "order_mis") {
        da.value = !0, ho.value = !0;
        try {
          q.value = await K("psd_books.db.queries.get_order_mis", n) || null;
        } catch {
          q.value = null;
        }
        da.value = !1;
      }
      if (k.value === "profitability_mis") {
        ra.value = !0, bo.value = !0;
        try {
          W.value = await K("psd_books.db.queries.get_profitability_mis", n) || null;
        } catch {
          W.value = null;
        }
        ra.value = !1;
      }
      if (k.value === "expense_mis") {
        ua.value = !0, go.value = !0;
        try {
          U.value = await K("psd_books.db.queries.get_expense_mis", n) || null;
        } catch {
          U.value = null;
        }
        ua.value = !1;
      }
      if (k.value === "payables_mis") {
        ca.value = !0, ko.value = !0;
        try {
          Z.value = await K("psd_books.db.queries.get_payables_mis", { company: s, as_of_date: y.value }) || null;
        } catch {
          Z.value = null;
        }
        ca.value = !1;
      }
      if (k.value === "cash_bank_mis") {
        ma.value = !0, fo.value = !0;
        try {
          E.value = await K("psd_books.db.queries.get_cash_bank_mis", n) || null;
        } catch {
          E.value = null;
        }
        ma.value = !1;
      }
      if (k.value === "customer_mis") {
        va.value = !0, wo.value = !0;
        try {
          D.value = await K("psd_books.db.queries.get_customer_mis", n) || null;
        } catch {
          D.value = null;
        }
        va.value = !1;
      }
      if (k.value === "supplier_mis") {
        _a.value = !0, xo.value = !0;
        try {
          $.value = await K("psd_books.db.queries.get_supplier_mis", n) || null;
        } catch {
          $.value = null;
        }
        _a.value = !1;
      }
      if (k.value === "employee_mis") {
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
    function hn(i) {
      var n;
      const s = [Pe.join("	"), Ie(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function bn(i) {
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
    function kn(i) {
      var n;
      const s = [Ve.join("	"), Ne(i).join("	")].join(`
`);
      (n = navigator.clipboard) != null && n.writeText && navigator.clipboard.writeText(s);
    }
    function fn(i) {
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
      const i = fa.value.map((r) => Te(r).join(",")), s = [De.join(","), ...i].join(`
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
      b(
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
    function b(i, s, n) {
      const r = [i.join(","), ...s].join(`
`);
      Ut(r, n);
    }
    function Eo() {
      if (!O.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = yt.value;
      if (s === "product")
        b(
          ["Item", "UOM", "Invoices", "Qty Sold", "Discount", "Amount"],
          O.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.total_discount || 0, n.total_amount].join(",")),
          "sales_mis_product_wise_" + i
        );
      else if (s === "customer")
        b(
          ["Customer", "Invoices", "Amount", "Outstanding"],
          O.value.customer_wise.map((n) => [n.customer_name || n.customer, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "sales_mis_customer_wise_" + i
        );
      else if (s === "salesperson")
        b(
          ["Salesperson", "Invoices", "Amount"],
          O.value.salesperson_wise.map((n) => [n.sales_person, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_salesperson_wise_" + i
        );
      else if (s === "branch")
        b(
          ["Branch / Cost Center", "Invoices", "Amount"],
          O.value.branch_wise.map((n) => [n.branch, n.invoice_count, n.total_amount].join(",")),
          "sales_mis_branch_wise_" + i
        );
      else if (s === "returns")
        b(
          ["Credit Note", "Date", "Customer", "Against Invoice", "Amount", "Reason"],
          O.value.sales_return.rows.map((n) => [n.credit_note, n.posting_date, n.customer_name || n.customer, n.return_against || "", n.grand_total, (n.reason || "").replace(/,/g, " ")].join(",")),
          "sales_mis_returns_" + i
        );
      else if (s === "discount")
        b(
          ["Customer", "Line Discount", "Header Discount", "Net Amount"],
          O.value.discount_analysis.by_customer.map((n) => [n.customer_name || n.customer, n.line_discount || 0, n.header_discount || 0, n.net_amount].join(",")),
          "sales_mis_discount_by_customer_" + i
        );
      else if (s === "pending")
        b(
          ["Sales Order", "Date", "Customer", "Status", "Order Value", "Billed", "Pending"],
          O.value.sales_order_pending.rows.map((n) => [n.sales_order, n.transaction_date, n.customer_name || n.customer, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "sales_mis_order_pending_" + i
        );
      else {
        const n = O.value.summary;
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
    function Bo() {
      if (!I.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Rt.value;
      s === "ageing" ? b(
        ["Customer", "0-30", "31-60", "61-90", "90+", "Total"],
        I.value.ageing.map((n) => [n.customer_name || n.customer, n.days_0_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "receivables_ageing_" + y.value + ".csv"
      ) : s === "daily_coll" ? b(
        ["Date", "Payments", "Amount"],
        I.value.daily_collection.days.map((n) => [n.date, n.count, n.amount].join(",")),
        "receivables_daily_collection_" + i
      ) : s === "overdue" ? b(
        ["Invoice", "Customer", "Due Date", "Overdue Days", "Outstanding"],
        I.value.overdue.rows.map((n) => [n.invoice, n.customer_name || n.customer, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "receivables_overdue_" + y.value + ".csv"
      ) : s === "credit" ? b(
        ["Customer", "Credit Limit", "Outstanding", "Utilisation %"],
        I.value.credit_utilisation.map((n) => [n.customer_name || n.customer, n.credit_limit || 0, n.outstanding_amount, n.utilisation_pct != null ? n.utilisation_pct.toFixed(1) : ""].join(",")),
        "receivables_credit_utilisation_" + y.value + ".csv"
      ) : b(
        ["Customer", "Open Invoices", "Oldest Due Date", "Outstanding"],
        I.value.customer_outstanding.map((n) => [n.customer_name || n.customer, n.invoice_count, n.oldest_due_date || "", n.outstanding_amount].join(",")),
        "receivables_customer_outstanding_" + y.value + ".csv"
      );
    }
    function qo() {
      if (!B.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Ot.value;
      if (s === "supplier")
        b(
          ["Supplier", "Bills", "Amount", "Outstanding"],
          B.value.supplier_wise.map((n) => [n.supplier_name || n.supplier, n.invoice_count, n.total_amount, n.outstanding_amount || 0].join(",")),
          "purchase_mis_supplier_wise_" + i
        );
      else if (s === "product")
        b(
          ["Item", "UOM", "Bills", "Qty Purchased", "Discount", "Amount"],
          B.value.product_wise.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_purchased, n.total_discount || 0, n.total_amount].join(",")),
          "purchase_mis_product_wise_" + i
        );
      else if (s === "price_variance")
        b(
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
        b(
          ["Purchase Order", "Date", "Supplier", "Status", "Order Value", "Billed", "Pending"],
          B.value.pending_purchase_orders.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.grand_total, n.billed_amount || 0, n.pending_amount].join(",")),
          "purchase_mis_pending_po_" + y.value + ".csv"
        );
      else if (s === "pending_receipts")
        b(
          ["Purchase Order", "Date", "Supplier", "Status", "Ordered Qty", "Received Qty", "Pending Qty"],
          B.value.pending_material_receipts.rows.map((n) => [n.purchase_order, n.transaction_date, n.supplier_name || n.supplier, n.status, n.ordered_qty, n.received_qty || 0, n.pending_qty].join(",")),
          "purchase_mis_pending_receipts_" + y.value + ".csv"
        );
      else if (s === "returns")
        b(
          ["Debit Note", "Date", "Supplier", "Against Bill", "Amount"],
          B.value.purchase_return.rows.map((n) => [n.debit_note, n.posting_date, n.supplier_name || n.supplier, n.return_against || "", n.grand_total].join(",")),
          "purchase_mis_returns_" + i
        );
      else {
        const n = B.value.summary;
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
    function Ao() {
      if (!R.value) return;
      const i = y.value + ".csv", s = ht.value;
      s === "current_stock" ? b(
        ["Item", "Warehouse", "UOM", "Qty", "Rate", "Value"],
        R.value.current_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.uom || "", n.actual_qty, n.valuation_rate, n.stock_value].join(",")),
        "inventory_mis_current_stock_" + i
      ) : s === "stock_value" ? b(
        ["Warehouse", "Items", "Qty", "Stock Value"],
        R.value.stock_value.by_warehouse.map((n) => [n.warehouse, n.item_count, n.total_qty, n.stock_value].join(",")),
        "inventory_mis_stock_value_" + i
      ) : s === "fast_moving" ? b(
        ["Item", "Qty Consumed", "Transactions", "Current Qty"],
        R.value.fast_moving.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.current_qty].join(",")),
        "inventory_mis_fast_moving_" + x.value + "_to_" + y.value + ".csv"
      ) : s === "slow_moving" ? b(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        R.value.slow_moving.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "", n.days_since_movement].join(",")),
        "inventory_mis_slow_moving_" + i
      ) : s === "dead_stock" ? b(
        ["Item", "Qty on Hand", "Stock Value", "Last Movement", "Days Since Movement"],
        R.value.dead_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.stock_value, n.last_movement_date || "Never", n.days_since_movement ?? ""].join(",")),
        "inventory_mis_dead_stock_" + i
      ) : s === "ageing" ? b(
        ["Item", "Warehouse", "Qty", "Stock Value", "Last Receipt", "Age (Days)"],
        R.value.stock_ageing.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.stock_value, n.last_receipt_date || "Never", n.age_days ?? ""].join(",")),
        "inventory_mis_ageing_" + i
      ) : s === "reorder" ? b(
        ["Item", "Warehouse", "Qty on Hand", "Reorder Level", "Reorder Qty", "Shortage"],
        R.value.reorder_low_stock.rows.map((n) => [n.item_name || n.item_code, n.warehouse, n.actual_qty, n.reorder_level, n.reorder_qty, n.shortage_qty].join(",")),
        "inventory_mis_reorder_" + i
      ) : s === "excess" ? b(
        ["Item", "Qty on Hand", "Avg Daily Consumption", "Days of Cover", "Excess Qty", "Excess Value"],
        R.value.excess_stock.rows.map((n) => [n.item_name || n.item_code, n.actual_qty, n.avg_daily_consumption, n.days_of_cover, n.excess_qty, n.excess_value].join(",")),
        "inventory_mis_excess_stock_" + i
      ) : s === "adjustment" ? b(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty", "Rate", "Value", "Reason"],
        R.value.stock_adjustment.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.rate, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_adjustment_" + x.value + "_to_" + y.value + ".csv"
      ) : s === "loss" && b(
        ["Stock Entry", "Date", "Item", "Warehouse", "Qty Lost", "Value Lost", "Reason"],
        R.value.stock_loss.rows.map((n) => [n.stock_entry, n.posting_date, n.item_name || n.item_code, n.warehouse, n.qty, n.value, (n.reason || "").replace(/,/g, " ")].join(",")),
        "inventory_mis_stock_loss_" + x.value + "_to_" + y.value + ".csv"
      );
    }
    function $o() {
      if (!T.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = bt.value;
      s === "plan_vs_actual" ? b(
        ["Production Plan", "Date", "Item", "Planned Qty", "Produced Qty", "Variance", "Variance %"],
        T.value.plan_vs_actual.rows.map((n) => [n.production_plan, n.posting_date, n.item_name || n.item_code, n.planned_qty, n.produced_qty, n.variance_qty, n.variance_pct ?? ""].join(",")),
        "production_mis_plan_vs_actual_" + i
      ) : s === "pending" ? b(
        ["Work Order", "Item", "Status", "Qty", "Produced", "Pending", "Planned End"],
        T.value.production_pending.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.qty, n.produced_qty, n.pending_qty, n.planned_end_date || ""].join(",")),
        "production_mis_pending_" + y.value + ".csv"
      ) : s === "wip" ? b(
        ["Work Order", "Item", "Qty", "Produced", "% Complete", "WIP Warehouse", "WIP Value"],
        T.value.wip_status.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.qty, n.produced_qty, n.pct_complete, n.wip_warehouse || "", n.wip_stock_value].join(",")),
        "production_mis_wip_" + y.value + ".csv"
      ) : s === "material_availability" ? b(
        ["Work Order", "Item", "Warehouse", "Still to Issue", "Available", "Shortage"],
        T.value.raw_material_availability.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.warehouse, n.still_to_issue, n.available_qty, n.shortage_qty].join(",")),
        "production_mis_material_availability_" + y.value + ".csv"
      ) : s === "material_consumption" ? b(
        ["Item", "Qty Consumed", "Transactions", "Value Consumed"],
        T.value.material_consumption.rows.map((n) => [n.item_name || n.item_code, n.qty_consumed, n.transactions, n.value_consumed].join(",")),
        "production_mis_material_consumption_" + i
      ) : s === "material_variance" ? b(
        ["Work Order", "Item", "Required Qty", "Consumed Qty", "Variance Qty", "Variance Value"],
        T.value.material_variance.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.required_qty, n.consumed_qty, n.variance_qty, n.variance_value].join(",")),
        "production_mis_material_variance_" + i
      ) : s === "production_cost" ? b(
        ["Work Order", "Item", "Produced", "Material Value", "Operating Cost", "Total Cost", "Cost/Unit", "Standard/Unit"],
        T.value.production_cost.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.produced_qty, n.material_value, n.operating_cost, n.actual_total_cost, n.actual_cost_per_unit ?? "", n.standard_cost_per_unit ?? ""].join(",")),
        "production_mis_cost_" + i
      ) : s === "efficiency" ? b(
        ["Work Order", "Item", "Status", "Planned (min)", "Actual (min)", "Efficiency %"],
        T.value.production_efficiency.rows.map((n) => [n.work_order, n.item_name || n.item_code, n.status, n.planned_mins, n.actual_mins, n.efficiency_pct].join(",")),
        "production_mis_efficiency_" + i
      ) : s === "rejection" ? b(
        ["Job Card", "Work Order", "Operation", "Item", "Qty", "Value"],
        T.value.rejection_rework.rows.map((n) => [n.job_card, n.work_order, n.operation || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_rejection_" + i
      ) : s === "scrap" && b(
        ["Stock Entry", "Work Order", "Item", "Qty", "Value"],
        T.value.scrap_wastage.rows.map((n) => [n.stock_entry, n.work_order || "", n.item_name || n.item_code, n.qty, n.amount].join(",")),
        "production_mis_scrap_" + i
      );
    }
    function Lo() {
      if (!A.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = xt.value;
      s === "sales" ? b(
        ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Revenue"],
        A.value.product_wise_sales.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.invoice_count, n.qty_sold, n.avg_rate, n.total_amount].join(",")),
        "product_mis_sales_" + i
      ) : s === "profit" ? b(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        A.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.profit, n.margin_pct].join(",")),
        "product_mis_profit_" + i
      ) : s === "cost" ? b(
        ["Item", "Qty Sold", "Cost Rate", "Total Cost"],
        A.value.product_wise_cost.rows.map((n) => [n.item_name || n.item_code, n.qty_sold, n.cost_rate, n.total_cost].join(",")),
        "product_mis_cost_" + i
      ) : s === "margin" ? b(
        ["Item", "Revenue", "Cost", "Margin %"],
        A.value.product_wise_margin.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.total_cost, n.margin_pct].join(",")),
        "product_mis_margin_" + i
      ) : s === "production" ? b(
        ["Item", "Qty Produced", "Value Produced", "Transactions"],
        A.value.product_wise_production.rows.map((n) => [n.item_name || n.item_code, n.qty_produced, n.value_produced, n.transactions].join(",")),
        "product_mis_production_" + i
      ) : s === "stock" ? b(
        ["Item", "UOM", "Qty on Hand", "Rate", "Stock Value"],
        A.value.product_wise_stock.rows.map((n) => [n.item_name || n.item_code, n.uom || "", n.total_qty, n.valuation_rate, n.total_value].join(",")),
        "product_mis_stock_" + y.value + ".csv"
      ) : s === "wastage" ? b(
        ["Item", "Qty Scrapped", "Value Scrapped", "Transactions"],
        A.value.product_wise_wastage.rows.map((n) => [n.item_name || n.item_code, n.qty_scrapped, n.value_scrapped, n.transactions].join(",")),
        "product_mis_wastage_" + i
      ) : s === "top_selling" ? b(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.top_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_top_selling_" + i
      ) : s === "low_selling" && b(
        ["Rank", "Item", "Qty Sold", "Revenue"],
        A.value.low_selling.rows.map((n, r) => [r + 1, n.item_name || n.item_code, n.qty_sold, n.total_amount].join(",")),
        "product_mis_low_selling_" + i
      );
    }
    function Qo() {
      if (!z.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Kt.value;
      s === "pending_dispatch" ? b(
        ["Sales Order", "Order Date", "Customer", "Item", "Ordered Qty", "Pending Qty", "Pending Value"],
        z.value.pending_dispatch.rows.map((n) => [n.sales_order, n.order_date, n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_pending_dispatch_" + y.value + ".csv"
      ) : s === "delivery_pending" ? b(
        ["Sales Order", "Delivery Date", "Customer", "Item", "Ordered Qty", "Dispatched Qty", "Pending Qty"],
        z.value.delivery_pending.rows.map((n) => [n.sales_order, n.delivery_date || "", n.customer_name || n.customer, n.item_name || n.item_code, n.ordered_qty, n.delivered_qty, n.pending_qty].join(",")),
        "dispatch_mis_delivery_pending_" + y.value + ".csv"
      ) : s === "delayed_delivery" ? b(
        ["Sales Order", "Delivery Date", "Days Overdue", "Customer", "Item", "Pending Qty", "Pending Value"],
        z.value.delayed_delivery.rows.map((n) => [n.sales_order, n.delivery_date, n.days_overdue, n.customer_name || n.customer, n.item_name || n.item_code, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_delayed_delivery_" + y.value + ".csv"
      ) : s === "customer_pending" ? b(
        ["Customer", "Orders", "Pending Qty", "Pending Value"],
        z.value.customer_wise_pending_delivery.rows.map((n) => [n.customer_name || n.customer, n.order_count, n.pending_qty, n.pending_value].join(",")),
        "dispatch_mis_customer_pending_" + y.value + ".csv"
      ) : s === "transport_wise" && b(
        ["Transporter", "Dispatches", "Customers", "Total Qty", "Total Value"],
        z.value.transport_wise_dispatch.rows.map((n) => [n.transporter_name, n.dispatch_count, n.customer_count, n.total_qty, n.total_value].join(",")),
        "dispatch_mis_transport_wise_" + i
      );
    }
    function Fo() {
      if (!q.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = vt.value, n = (r, _, j, M) => {
        b(_, q.value.summary[r].rows.map(j), "order_mis_" + M + "_" + i);
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
      ) : s === "order_value" ? b(
        ["Status", "Orders", "Value"],
        q.value.order_value.by_status.map((r) => [r.status, r.order_count, r.total_value].join(",")),
        "order_mis_order_value_" + i
      ) : s === "profitability" && b(
        ["Sales Order", "Date", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        q.value.order_profitability.rows.map((r) => [r.sales_order, r.order_date, r.customer_name || r.customer, r.revenue, r.total_cost, r.profit, r.margin_pct].join(",")),
        "order_mis_profitability_" + i
      );
    }
    function Ho() {
      if (!W.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Lt.value;
      s === "product" ? b(
        ["Item", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.product_wise_profit.rows.map((n) => [n.item_name || n.item_code, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_product_" + i
      ) : s === "customer" ? b(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.customer_wise_profit.rows.map((n) => [n.customer_name || n.customer, n.invoice_count, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_customer_" + i
      ) : s === "order" ? b(
        ["Sales Order", "Customer", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.order_wise_profit.rows.map((n) => [n.sales_order, n.customer_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_order_" + i
      ) : s === "branch" ? b(
        ["Branch (Cost Center)", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.branch_wise_profit.rows.map((n) => [n.cost_center_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_branch_" + i
      ) : s === "salesperson" ? b(
        ["Salesperson", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.salesperson_wise_profit.rows.map((n) => [n.sales_person_name, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_salesperson_" + i
      ) : s === "monthly_trend" && b(
        ["Month", "Revenue", "Cost", "Profit", "Margin %"],
        W.value.monthly_profit_trend.rows.map((n) => [n.month, n.revenue, n.cost, n.profit, n.margin_pct.toFixed(1)].join(",")),
        "profitability_mis_monthly_trend_" + i
      );
    }
    function zo() {
      if (!U.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Pt.value;
      s === "department" ? b(
        ["Department (Cost Center)", "Expenses", "Amount"],
        U.value.department_wise.rows.map((n) => [n.cost_center_name, n.count, n.amount].join(",")),
        "expense_mis_department_" + i
      ) : s === "category" ? b(
        ["Category", "Expenses", "Amount", "% of Total"],
        U.value.category_wise.rows.map((n) => [n.category_name, n.count, n.amount, n.pct_of_total.toFixed(1)].join(",")),
        "expense_mis_category_" + i
      ) : s === "budget" ? b(
        ["Cost Center", "Budget Period", "Period Budget (est.)", "Actual", "Variance", "Variance %"],
        U.value.budget_vs_actual.rows.map((n) => [n.cost_center_name, n.budget_period, n.period_budget, n.actual, n.variance, n.variance_pct.toFixed(1)].join(",")),
        "expense_mis_budget_vs_actual_" + i
      ) : s === "fixed" ? b(
        ["Category", "Expenses", "Amount"],
        U.value.fixed_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_fixed_" + i
      ) : s === "variable" ? b(
        ["Category", "Expenses", "Amount"],
        U.value.variable_expenses.rows.map((n) => [n.category_name, n.count, n.amount].join(",")),
        "expense_mis_variable_" + i
      ) : s === "trend" ? b(
        ["Month", "Expenses", "Amount"],
        U.value.expense_trend.rows.map((n) => [n.month, n.count, n.amount].join(",")),
        "expense_mis_trend_" + i
      ) : s === "unusual" && b(
        ["Expense", "Date", "Category", "Department", "Amount", "Category Avg", "Basis"],
        U.value.unusual_expenses.rows.map((n) => [n.expense, n.posting_date, n.category_name, n.cost_center_name || "", n.amount, n.category_avg, n.basis].join(",")),
        "expense_mis_unusual_" + i
      );
    }
    function Wo() {
      if (!Z.value) return;
      const i = y.value + ".csv", s = Qt.value;
      s === "ageing" ? b(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        Z.value.payable_ageing.rows.map((n) => [n.supplier_name, n.current, n.days_1_30, n.days_31_60, n.days_61_90, n.days_90_plus, n.total].join(",")),
        "payables_mis_ageing_" + i
      ) : s === "overdue" ? b(
        ["Invoice", "Supplier", "Due Date", "Overdue Days", "Outstanding"],
        Z.value.overdue_payables.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.overdue_days, n.outstanding_amount].join(",")),
        "payables_mis_overdue_" + i
      ) : s === "due_week" ? b(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        Z.value.due_this_week.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_week_" + i
      ) : s === "due_month" ? b(
        ["Invoice", "Supplier", "Due Date", "Outstanding"],
        Z.value.due_this_month.rows.map((n) => [n.invoice, n.supplier_name, n.due_date, n.outstanding_amount].join(",")),
        "payables_mis_due_this_month_" + i
      ) : s === "supplier" ? b(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Oldest Overdue (days)"],
        Z.value.supplier_wise_outstanding.rows.map((n) => [n.supplier_name, n.invoice_count, n.outstanding, n.overdue_amount, n.max_overdue_days].join(",")),
        "payables_mis_supplier_" + i
      ) : s === "forecast" && b(
        ["Bucket", "Invoices", "Amount"],
        Z.value.payment_due_forecast.rows.map((n) => [n.label, n.count, n.amount].join(",")),
        "payables_mis_forecast_" + i
      );
    }
    function Uo() {
      if (!E.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = It.value;
      s === "cash_position" ? b(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.cash_position.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_cash_position_" + i
      ) : s === "bank_balance" ? b(
        ["Account", "Opening", "Closing", "Net Movement"],
        E.value.bank_balance.rows.map((n) => [n.account_name, n.opening_balance, n.closing_balance, n.net_movement].join(",")),
        "cash_bank_mis_bank_balance_" + i
      ) : s === "daily_cash" ? b(
        ["Date", "Receipts", "Payments", "Net", "Balance"],
        E.value.daily_cash_flow.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_cash_flow_" + i
      ) : s === "daily_bank" ? b(
        ["Date", "Deposits", "Withdrawals", "Net", "Balance"],
        E.value.daily_bank_movement.days.map((n) => [n.date, n.receipts, n.payments, n.net, n.balance].join(",")),
        "cash_bank_mis_daily_bank_movement_" + i
      ) : s === "receipts" ? b(
        ["Reference", "Date", "Party", "Account", "Mode", "Amount"],
        E.value.receipts.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.mode_of_payment || "", n.amount].join(",")),
        "cash_bank_mis_receipts_" + i
      ) : s === "payments" ? b(
        ["Reference", "Date", "Party", "Account", "Source", "Amount"],
        E.value.payments.rows.map((n) => [n.reference, n.date, n.party_name || n.party || "", n.account, n.source, n.amount].join(",")),
        "cash_bank_mis_payments_" + i
      ) : s === "forecast" ? b(
        ["Bucket", "Expected Inflow", "Expected Outflow", "Net", "Projected Balance"],
        E.value.cash_forecast.rows.map((n) => [n.label, n.inflow, n.outflow, n.net, n.projected_balance].join(",")),
        "cash_bank_mis_forecast_" + i
      ) : s === "fund_requirement" && b(
        ["Bucket", "Shortfall"],
        E.value.fund_requirement.rows.map((n) => [n.label, n.shortfall].join(",")),
        "cash_bank_mis_fund_requirement_" + i
      );
    }
    function Ko() {
      if (!D.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Ct.value, n = (r) => r.customer_name || r.customer;
      s === "new_customers" ? b(
        ["Customer", "First Invoice Date", "Invoices in Period", "Revenue in Period"],
        D.value.new_customers.rows.map((r) => [n(r), r.first_invoice_date, r.invoice_count, r.total_amount].join(",")),
        "customer_mis_new_customers_" + i
      ) : s === "active_customers" ? b(
        ["Customer", "Invoices", "Revenue", "First Invoice", "Last Invoice"],
        D.value.active_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount, r.first_invoice_in_period, r.last_invoice_in_period].join(",")),
        "customer_mis_active_customers_" + i
      ) : s === "repeat_customers" ? b(
        ["Customer", "Invoices", "Revenue"],
        D.value.repeat_customers.rows.map((r) => [n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_repeat_customers_" + i
      ) : s === "customer_wise_sales" ? b(
        ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        D.value.customer_wise_sales.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "customer_mis_customer_wise_sales_" + i
      ) : s === "customer_wise_outstanding" ? b(
        ["Customer", "Invoices", "Outstanding", "Oldest Due Date", "Max Overdue Days"],
        D.value.customer_wise_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.oldest_due_date, r.max_overdue_days].join(",")),
        "customer_mis_customer_wise_outstanding_" + i
      ) : s === "customer_wise_profit" ? b(
        ["Customer", "Invoices", "Revenue", "Cost", "Profit", "Margin %"],
        D.value.customer_wise_profit.rows.map((r) => [n(r), r.invoice_count, r.revenue, r.total_cost, r.profit, Number(r.margin_pct).toFixed(1)].join(",")),
        "customer_mis_customer_wise_profit_" + i
      ) : s === "customer_retention" ? b(
        ["Customer", "Status"],
        D.value.customer_retention.rows.map((r) => [n(r), r.status].join(",")),
        "customer_mis_customer_retention_" + i
      ) : s === "top_customers" ? b(
        ["Rank", "Customer", "Invoices", "Revenue"],
        D.value.top_customers.rows.map((r, _) => [_ + 1, n(r), r.invoice_count, r.total_amount].join(",")),
        "customer_mis_top_customers_" + i
      ) : s === "inactive_customers" && b(
        ["Customer", "Last Invoice Date", "Days Inactive", "Lifetime Invoices", "Lifetime Revenue"],
        D.value.inactive_customers.rows.map((r) => [n(r), r.last_invoice_date, r.days_inactive, r.invoice_count, r.lifetime_revenue].join(",")),
        "customer_mis_inactive_customers_" + i
      );
    }
    function Go() {
      if (!$.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Ft.value, n = (r) => r.supplier_name || r.supplier;
      s === "supplier_wise_purchase" ? b(
        ["Supplier", "Invoices", "Net Total", "Discount", "Tax", "Total", "Outstanding", "Avg Invoice Value"],
        $.value.supplier_wise_purchase.rows.map((r) => [n(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
        "supplier_mis_supplier_wise_purchase_" + i
      ) : s === "supplier_outstanding" ? b(
        ["Supplier", "Invoices", "Outstanding", "Overdue Amount", "Max Overdue Days"],
        $.value.supplier_outstanding.rows.map((r) => [n(r), r.invoice_count, r.outstanding_amount, r.overdue_amount, r.max_overdue_days].join(",")),
        "supplier_mis_supplier_outstanding_" + i
      ) : s === "supplier_payment_ageing" ? b(
        ["Supplier", "Current", "1-30", "31-60", "61-90", "90+", "Total"],
        $.value.supplier_payment_ageing.rows.map((r) => [n(r), r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
        "supplier_mis_supplier_payment_ageing_" + i
      ) : s === "purchase_price_comparison" ? b(
        ["Item", "Supplier", "Qty", "Avg Rate", "Is Lowest", "Vs Lowest %"],
        $.value.purchase_price_comparison.rows.map((r) => [r.item_name || r.item_code, n(r), r.qty, r.avg_rate, r.is_lowest ? "Yes" : "No", Number(r.variance_vs_lowest_pct).toFixed(1)].join(",")),
        "supplier_mis_purchase_price_comparison_" + i
      ) : s === "supplier_performance" ? b(
        ["Supplier", "Purchase Amount", "Outstanding", "On-time Delivery %", "Rejection %", "Avg Price Variance %", "Score"],
        $.value.supplier_performance.rows.map((r) => [n(r), r.total_purchase_amount, r.outstanding_amount, r.on_time_delivery_pct ?? "", r.rejection_pct ?? "", r.avg_price_variance_pct ?? "", r.performance_score ?? ""].join(",")),
        "supplier_mis_supplier_performance_" + i
      ) : s === "delivery_performance" ? b(
        ["Receipt", "Supplier", "Received Date", "Expected Date", "Delay (days)", "Status"],
        $.value.delivery_performance.rows.map((r) => [r.receipt, n(r), r.received_date, r.expected_date || "", r.has_reference ? r.delay_days : "", r.has_reference ? r.on_time ? "On-time" : "Late" : "No PO Ref"].join(",")),
        "supplier_mis_delivery_performance_" + i
      ) : s === "quality_rejection" && b(
        ["Supplier", "Item", "Received Qty", "Accepted Qty", "Rejected Qty", "Rejection %"],
        $.value.quality_rejection.rows.map((r) => [n(r), r.item_name || r.item_code, r.received_qty, r.accepted_qty, r.rejected_qty, Number(r.rejection_pct).toFixed(2)].join(",")),
        "supplier_mis_quality_rejection_" + i
      );
    }
    function Yo() {
      if (!L.value) return;
      const i = x.value + "_to_" + y.value + ".csv", s = Vt.value, n = (r) => r.sales_person_name || r.sales_person;
      s === "employee_attendance" ? b(
        ["Employee", "Present Days", "Period Days", "Attendance %", "Total Hours", "Avg Hrs/Day"],
        L.value.employee_attendance.rows.map((r) => [r.employee, r.present_days, r.period_days, r.attendance_pct, r.total_hours, r.avg_hours_per_day].join(",")),
        "employee_mis_attendance_" + i
      ) : s === "department_manpower" ? b(
        ["Department", "Headcount", "Employees"],
        L.value.department_manpower.rows.map((r) => [r.department, r.headcount, '"' + r.employees.map((_) => _.sales_person_name).join("; ") + '"'].join(",")),
        "employee_mis_department_manpower_" + i
      ) : s === "salesperson_target" ? b(
        ["Salesperson", "Invoices", "Achieved", "Target", "Achievement %"],
        L.value.salesperson_achievement.rows.map((r) => [n(r), r.invoice_count, r.total_amount, Ws.value[r.sales_person] || "", Ws.value[r.sales_person] ? ya(r).toFixed(1) : ""].join(",")),
        "employee_mis_salesperson_target_" + i
      ) : s === "salesperson_collection" ? b(
        ["Salesperson", "Payments", "Collected Amount"],
        L.value.salesperson_collection.rows.map((r) => [n(r), r.payment_count, r.collected_amount].join(",")),
        "employee_mis_salesperson_collection_" + i
      ) : s === "production_productivity" ? b(
        ["Employee", "Job Cards", "Hours", "Qty Produced", "Avg Time/Unit (min)", "Qty/Hour"],
        L.value.production_productivity.rows.map((r) => [r.employee, r.job_card_count, r.total_hours, r.qty_produced, r.avg_time_per_unit_mins ?? "", r.qty_per_hour ?? ""].join(",")),
        "employee_mis_production_productivity_" + i
      ) : s === "overtime" ? b(
        ["Employee", "Overtime Days", "Overtime Hours"],
        L.value.overtime.summary.map((r) => [r.employee, r.overtime_days, r.overtime_hours].join(",")),
        "employee_mis_overtime_" + i
      ) : s === "labour_cost" ? b(
        ["Employee", "Hours", "Cost"],
        L.value.labour_cost.by_employee.map((r) => [r.employee, r.total_hours, r.total_cost].join(",")),
        "employee_mis_labour_cost_" + i
      ) : s === "employee_performance" && b(
        ["Employee", "Hours", "Qty Produced", "Qty/Hour", "Rejection %", "Attendance %", "Overtime Hrs", "Score"],
        L.value.employee_performance.rows.map((r) => [r.employee, r.total_hours, r.qty_produced, r.qty_per_hour ?? "", r.rejection_pct ?? "", r.attendance_pct ?? "", r.overtime_hours, r.performance_score ?? ""].join(",")),
        "employee_mis_performance_" + i
      );
    }
    function ne() {
      const i = k.value === "ar", s = i ? rt.value : ut.value, n = i ? "Customer" : "Vendor", r = i ? "customer_name" : "supplier_name", _ = [n, "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"].join(","), j = s.map(
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
        s[839] || (s[839] = C('<div class="reports-header" data-v-dc85887f><div data-v-dc85887f><p class="reports-subtitle" data-v-dc85887f>Get detailed insights into your business performance</p></div><div class="reports-header-right" data-v-dc85887f><div class="reports-header-icons" data-v-dc85887f><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="10" width="4" height="10" rx="1" data-v-dc85887f></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-dc85887f></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-dc85887f></rect></svg><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><circle cx="12" cy="12" r="9" data-v-dc85887f></circle><path d="M12 3v9l7 3" data-v-dc85887f></path></svg></div></div></div>', 1)),
        t("div", Wn, [
          (l(!0), o(u, null, m(f(Cn), (e, g) => (l(), o("button", {
            key: e.key,
            class: c(["report-card", [Sn(g), { active: k.value === e.key }]]),
            onClick: (Q) => k.value = e.key
          }, [
            t("span", {
              class: "report-card-icon",
              innerHTML: e.icon
            }, null, 8, Kn),
            t("span", Gn, a(e.label), 1)
          ], 10, Un))), 128))
        ]),
        t("div", Yn, [
          ["ar", "ap", "stockval", "price_mrp", "payables_mis"].includes(k.value) ? (l(), o(u, { key: 0 }, [
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
          St[k.value] ? h("", !0) : (l(), o("button", {
            key: 2,
            class: "books-btn books-btn-primary",
            onClick: pn
          }, "▷ Run Report")),
          s[215] || (s[215] = t("span", { class: "dr-spacer" }, null, -1)),
          ["ar", "ap"].includes(k.value) && (rt.value.length || ut.value.length) ? (l(), o("button", {
            key: 3,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ne
          }, " Export CSV ")) : h("", !0),
          k.value === "items" && At.value.length ? (l(), o("button", {
            key: 4,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Ca
          }, " Export CSV ")) : h("", !0),
          k.value === "customers" && $t.value.length ? (l(), o("button", {
            key: 5,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: ja
          }, " Export CSV ")) : h("", !0),
          k.value === "profit" && ct.value.length ? (l(), o("button", {
            key: 6,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Ma
          }, " Export CSV ")) : h("", !0),
          k.value === "invoice_profit" && dt.value.length ? (l(), o("button", {
            key: 7,
            class: "books-btn",
            style: { background: "#EBFBEE", color: "#2F9E44", border: "1px solid #8CE99A" },
            onClick: Da
          }, " Export CSV ")) : h("", !0)
        ]),
        ["mrn_lpo", "lpo_grn", "proj_summary", "supp_analysis", "asset_reg", "lab_contract", "lab_wages", "lab_weekly"].includes(k.value) ? (l(), o("div", Jn, [
          t("div", Xn, [
            s[219] || (s[219] = C('<div class="bs-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="3" y="3" width="18" height="18" rx="2" data-v-dc85887f></rect><line x1="3" y1="9" x2="21" y2="9" data-v-dc85887f></line><line x1="9" y1="21" x2="9" y2="9" data-v-dc85887f></line></svg></div>', 1)),
            t("div", Zn, [
              t("div", ti, a(ul.value), 1),
              t("div", si, a(cl.value), 1)
            ]),
            t("div", ei, [
              Ia.value ? (l(), o("div", ai, [
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
                }, null, 8, oi), [
                  [Gt, ns.value]
                ]),
                ns.value ? (l(), o("button", {
                  key: 0,
                  type: "button",
                  class: "proc-search-clear",
                  title: "Clear",
                  onClick: s[4] || (s[4] = (e) => ns.value = "")
                }, "×")) : h("", !0)
              ])) : h("", !0),
              re.includes(k.value) ? h("", !0) : Et((l(), o("select", {
                key: 1,
                "onUpdate:modelValue": s[5] || (s[5] = (e) => zt.value = e),
                class: "dr-input"
              }, [
                s[217] || (s[217] = t("option", { value: "" }, "All projects", -1)),
                (l(!0), o(u, null, m(Ee.value, (e) => (l(), o("option", {
                  key: e,
                  value: e
                }, a(e), 9, li))), 128))
              ], 512)), [
                [al, zt.value]
              ]),
              t("div", ni, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[6] || (s[6] = (e) => qs.value = !qs.value),
                  disabled: !is.value.length
                }, [...s[218] || (s[218] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, ii),
                qs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[7] || (s[7] = (e) => qs.value = !1)
                  }),
                  t("div", di, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          !nl.value && !ue.value ? (l(), o("div", ri, "Run the report to see results.")) : ue.value ? (l(), o("div", ui)) : Zs.value ? (l(), o("div", ci, a(Zs.value), 1)) : Wt.value.length && !is.value.length ? (l(), o("div", mi, 'No rows match "' + a(ns.value) + '".', 1)) : Wt.value.length ? (l(), o("div", vi, [
            t("div", _i, [
              t("table", pi, [
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
                    }, a(vl(e[Q], Q)), 11, yi))), 128))
                  ]))), 128))
                ])
              ])
            ])
          ])) : (l(), o("div", hi, "No rows for this report."))
        ])) : h("", !0),
        k.value === "pl" ? (l(), o("div", bi, [
          t("div", gi, [
            s[222] || (s[222] = C('<div class="pl-dash-title" data-v-dc85887f><span class="pl-dash-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="10" width="4" height="10" rx="1" data-v-dc85887f></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-dc85887f></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-dc85887f></rect></svg></span><div data-v-dc85887f><div class="pl-dash-h" data-v-dc85887f>Profit &amp; Loss</div><div class="pl-dash-sub" data-v-dc85887f>Overview of your income, expenses and profitability</div></div></div>', 1)),
            t("div", ki, [
              s[220] || (s[220] = C('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="4" width="18" height="18" rx="2" data-v-dc85887f></rect><line x1="3" y1="10" x2="21" y2="10" data-v-dc85887f></line><line x1="8" y1="2" x2="8" y2="6" data-v-dc85887f></line><line x1="16" y1="2" x2="16" y2="6" data-v-dc85887f></line></svg>', 1)),
              ot(" " + a(P(x.value)) + " - " + a(P(y.value)) + " ", 1),
              s[221] || (s[221] = t("span", { class: "pl-dash-range-caret" }, "▾", -1))
            ])
          ]),
          f(yl) ? (l(), o("div", fi)) : f(at) ? (l(), o(u, { key: 1 }, [
            t("div", wi, [
              t("div", xi, [
                s[223] || (s[223] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "🪙"),
                  t("span", { class: "pl-kpi-label" }, "Total Income")
                ], -1)),
                t("div", Ci, a(f(S)(f(at).total_income)), 1),
                t("div", {
                  class: c(["pl-kpi-trend", ga(To.value)])
                }, a(ka(To.value)), 3)
              ]),
              f(at).cogs ? (l(), o("div", Si, [
                s[224] || (s[224] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "🛒"),
                  t("span", { class: "pl-kpi-label" }, "Cost of Goods Sold")
                ], -1)),
                t("div", ji, a(f(S)(f(at).cogs)), 1),
                s[225] || (s[225] = t("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : h("", !0),
              f(at).cogs ? (l(), o("div", Mi, [
                s[226] || (s[226] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📊"),
                  t("span", { class: "pl-kpi-label" }, "Gross Profit")
                ], -1)),
                t("div", {
                  class: c(["pl-kpi-val", f(at).gross_profit >= 0 ? "green" : "red"])
                }, a(f(S)(f(at).gross_profit)), 3),
                s[227] || (s[227] = t("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : h("", !0),
              t("div", Di, [
                s[228] || (s[228] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📄"),
                  t("span", { class: "pl-kpi-label" }, "Total Expense")
                ], -1)),
                t("div", Ti, a(f(S)(f(at).total_expense)), 1),
                t("div", {
                  class: c(["pl-kpi-trend", ga(Ro.value, !0)])
                }, a(ka(Ro.value)), 3)
              ]),
              f(at).stock_adjustment ? (l(), o("div", Ri, [
                s[229] || (s[229] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📦"),
                  t("span", { class: "pl-kpi-label" }, "Stock Adjustment")
                ], -1)),
                t("div", {
                  class: c(["pl-kpi-val", f(at).stock_adjustment > 0 ? "red" : "green"])
                }, a(f(S)(f(at).stock_adjustment)), 3),
                s[230] || (s[230] = t("div", { class: "pl-kpi-trend muted" }, "vs previous period", -1))
              ])) : h("", !0),
              t("div", {
                class: c(["pl-kpi", f(at).net_profit >= 0 ? "c-emerald" : "c-pink"])
              }, [
                s[231] || (s[231] = t("div", { class: "pl-kpi-top" }, [
                  t("span", { class: "pl-kpi-icon" }, "📈"),
                  t("span", { class: "pl-kpi-label" }, "Net Profit")
                ], -1)),
                t("div", {
                  class: c(["pl-kpi-val", f(at).net_profit >= 0 ? "green" : "red"])
                }, a(f(S)(f(at).net_profit)), 3),
                t("div", {
                  class: c(["pl-kpi-trend", ga(Oo.value)])
                }, a(ka(Oo.value)), 3)
              ], 2)
            ]),
            Dt.value.length ? (l(), o("div", Oi, [
              t("div", Pi, [
                s[232] || (s[232] = C('<div class="pl-dash-title" data-v-dc85887f><span class="pl-dash-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="10" width="4" height="10" rx="1" data-v-dc85887f></rect><rect x="10" y="6" width="4" height="14" rx="1" data-v-dc85887f></rect><rect x="17" y="13" width="4" height="7" rx="1" data-v-dc85887f></rect></svg></span><div data-v-dc85887f><div class="pl-dash-h" style="font-size:14px;" data-v-dc85887f>Monthly Trend</div><div class="pl-dash-sub" data-v-dc85887f>Income vs Expense over the selected period</div></div></div>', 1)),
                t("div", Ii, [
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
              t("div", Vi, [
                t("div", Ni, [
                  t("div", Ei, [
                    (l(!0), o(u, null, m(on.value, (e) => (l(), o("span", { key: e }, "KES " + a(p(e)), 1))), 128))
                  ]),
                  t("div", Bi, [
                    (l(!0), o(u, null, m(Dt.value, (e) => (l(), o("div", {
                      key: e.month,
                      class: "pl-trend-col"
                    }, [
                      t("div", qi, [
                        t("div", {
                          class: "pl-trend-bar income",
                          style: Bt({ height: Do(e.income) + "px" }),
                          title: "Income: KES " + p(e.income)
                        }, null, 12, Ai),
                        t("div", {
                          class: "pl-trend-bar expense",
                          style: Bt({ height: Do(e.expense) + "px" }),
                          title: "Expense: KES " + p(e.expense)
                        }, null, 12, $i)
                      ]),
                      t("div", Li, a(e.month.slice(5)), 1)
                    ]))), 128))
                  ])
                ]),
                t("div", Qi, [
                  s[233] || (s[233] = t("div", { class: "pl-insights-title" }, "💡 Insights", -1)),
                  (l(!0), o(u, null, m(ln.value, (e, g) => (l(), o("div", {
                    key: g,
                    class: "pl-insight-item"
                  }, [
                    t("span", {
                      class: c(["pl-insight-icon", e.tone])
                    }, a(e.icon), 3),
                    t("div", null, [
                      t("div", Fi, a(e.title), 1),
                      t("div", Hi, a(e.desc), 1)
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
            ])) : h("", !0)
          ], 64)) : (l(), o("div", zi, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "bs" ? (l(), o("div", Wi, [
          t("div", Ui, [
            s[236] || (s[236] = C('<div class="bs-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><path d="M12 2 3 6v2h18V6z" data-v-dc85887f></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-dc85887f></path><path d="M3 20h18" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Balance Sheet</div><div class="bs-page-head-sub" data-v-dc85887f>What the business owns and owes</div></div>', 2)),
            t("div", Ki, [
              t("div", Gi, "As of " + a(P(y.value)), 1),
              t("div", Yi, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[13] || (s[13] = (e) => et("exportBsCSV")),
                  disabled: !f(pt)
                }, [...s[235] || (s[235] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Ji),
                w.value === "exportBsCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[14] || (s[14] = (e) => w.value = "")
                  }),
                  t("div", Xi, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          f(bl) ? (l(), o("div", Zi)) : f(pt) ? (l(), o(u, { key: 1 }, [
            t("div", td, [
              t("div", sd, [
                s[238] || (s[238] = C('<div class="bs-kpi-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><ellipse cx="12" cy="5" rx="8" ry="3" data-v-dc85887f></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-dc85887f></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-dc85887f></path></svg></div>', 1)),
                t("div", ed, [
                  s[237] || (s[237] = t("div", { class: "bs-kpi-label" }, "Total Assets", -1)),
                  t("div", ad, a(f(S)(f(pt).total_assets)), 1)
                ])
              ]),
              t("div", od, [
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
                t("div", ld, [
                  s[239] || (s[239] = t("div", { class: "bs-kpi-label" }, "Total Liabilities", -1)),
                  t("div", nd, a(f(S)(f(pt).total_liabilities)), 1)
                ])
              ]),
              t("div", id, [
                s[242] || (s[242] = C('<div class="bs-kpi-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="12" width="4" height="9" data-v-dc85887f></rect><rect x="10" y="7" width="4" height="14" data-v-dc85887f></rect><rect x="17" y="3" width="4" height="18" data-v-dc85887f></rect></svg></div>', 1)),
                t("div", dd, [
                  s[241] || (s[241] = t("div", { class: "bs-kpi-label" }, "Total Equity", -1)),
                  t("div", rd, a(f(S)(f(pt).total_equity)), 1)
                ])
              ])
            ]),
            t("div", {
              class: c(["bs-sum-status", ha.value ? "bs-ok" : "bs-bad"])
            }, [
              t("span", ud, a(ha.value ? "✓" : "✕"), 1),
              t("div", cd, [
                t("div", md, a(ha.value ? "Assets = Liabilities + Equity" : "Balance sheet out of balance"), 1),
                t("div", vd, a(f(S)(f(pt).total_assets)) + " = " + a(f(S)(f(pt).total_liabilities)) + " + " + a(f(S)(f(pt).total_equity)), 1)
              ])
            ], 2),
            t("div", _d, [
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
                  }, null, 8, yd),
                  t("div", hd, [
                    t("div", bd, a(e.label), 1),
                    t("div", gd, a(e.desc), 1)
                  ]),
                  t("div", kd, a(f(S)(e.total)), 1),
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
                ], 8, pd),
                je.value[e.key] ? (l(), o("div", fd, [
                  (l(!0), o(u, null, m(e.items, (g) => (l(), o("div", {
                    key: g.label,
                    class: "bs-acc-item"
                  }, [
                    t("div", {
                      class: "bs-acc-item-icon",
                      innerHTML: g.icon
                    }, null, 8, wd),
                    t("div", xd, [
                      t("div", Cd, a(g.label), 1),
                      g.desc ? (l(), o("div", Sd, a(g.desc), 1)) : h("", !0)
                    ]),
                    t("div", jd, a(f(S)(g.value)), 1),
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
                ])) : h("", !0)
              ], 2))), 128))
            ])
          ], 64)) : (l(), o("div", Md, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "cf" ? (l(), o("div", Dd, [
          t("div", Td, [
            s[246] || (s[246] = C('<div class="bs-page-head-icon cf-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><path d="M3 3v18h18" data-v-dc85887f></path><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Cash Flow Statement</div><div class="bs-page-head-sub" data-v-dc85887f>Track the movement of cash in and out of your business</div></div>', 2)),
            t("div", Rd, [
              t("div", Od, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Pd, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[17] || (s[17] = (e) => et("exportCfCSV")),
                  disabled: !f(J)
                }, [...s[245] || (s[245] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Id),
                w.value === "exportCfCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[18] || (s[18] = (e) => w.value = "")
                  }),
                  t("div", Vd, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          f(kl) ? (l(), o("div", Nd)) : f(J) ? (l(), o("div", Ed, [
            t("div", Bd, [
              t("div", qd, [
                s[247] || (s[247] = C('<div class="cf-acc-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><circle cx="12" cy="12" r="3" data-v-dc85887f></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" data-v-dc85887f></path></svg></div><div class="cf-acc-text" data-v-dc85887f><div class="cf-acc-label" data-v-dc85887f>Operating Activities</div><div class="cf-acc-desc" data-v-dc85887f>P&amp;L + working capital changes</div></div>', 2)),
                t("div", {
                  class: c(["cf-acc-amount", f(J).operating >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).operating)), 3)
              ]),
              t("div", Ad, [
                s[248] || (s[248] = C('<div class="cf-acc-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><ellipse cx="12" cy="5" rx="8" ry="3" data-v-dc85887f></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-dc85887f></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" data-v-dc85887f></path></svg></div><div class="cf-acc-text" data-v-dc85887f><div class="cf-acc-label" data-v-dc85887f>Investing Activities</div><div class="cf-acc-desc" data-v-dc85887f>Asset purchases and sales</div></div>', 2)),
                t("div", {
                  class: c(["cf-acc-amount", f(J).investing >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).investing)), 3)
              ]),
              t("div", $d, [
                s[249] || (s[249] = C('<div class="cf-acc-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><path d="M12 2 3 6v2h18V6z" data-v-dc85887f></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8" data-v-dc85887f></path><path d="M3 20h18" data-v-dc85887f></path></svg></div><div class="cf-acc-text" data-v-dc85887f><div class="cf-acc-label" data-v-dc85887f>Financing Activities</div><div class="cf-acc-desc" data-v-dc85887f>Equity, loans and debt</div></div>', 2)),
                t("div", {
                  class: c(["cf-acc-amount", f(J).financing >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).financing)), 3)
              ]),
              t("div", Ld, [
                s[251] || (s[251] = C('<div class="cf-acc-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="12" width="4" height="9" data-v-dc85887f></rect><rect x="10" y="7" width="4" height="14" data-v-dc85887f></rect><rect x="17" y="3" width="4" height="18" data-v-dc85887f></rect></svg></div>', 1)),
                t("div", Qd, [
                  s[250] || (s[250] = t("div", { class: "cf-acc-label" }, "Net Change in Cash", -1)),
                  t("div", Fd, a(f(J).net_change >= 0 ? "Increase" : "Decrease") + " in cash during this period", 1)
                ]),
                t("div", {
                  class: c(["cf-acc-amount", f(J).net_change >= 0 ? "green" : "red"])
                }, a(f(S)(f(J).net_change)), 3)
              ]),
              f(J).opening_cash != null ? (l(), o(u, { key: 0 }, [
                t("div", Hd, [
                  s[252] || (s[252] = C('<div class="cf-flow-icon cf-flow-icon-open" data-v-dc85887f><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><line x1="5" y1="12" x2="19" y2="12" data-v-dc85887f></line><polyline points="12 5 19 12 12 19" data-v-dc85887f></polyline></svg></div><div class="cf-acc-text" data-v-dc85887f><div class="cf-acc-label" style="font-size:13px;" data-v-dc85887f>Opening Cash &amp; Bank</div><div class="cf-acc-desc" data-v-dc85887f>Balance at the beginning of the period</div></div>', 2)),
                  t("div", {
                    class: c(["cf-acc-amount", f(J).opening_cash >= 0 ? "green" : "red"])
                  }, a(f(S)(f(J).opening_cash)), 3)
                ]),
                t("div", zd, [
                  s[253] || (s[253] = C('<div class="cf-flow-icon cf-flow-icon-close" data-v-dc85887f><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><line x1="19" y1="12" x2="5" y2="12" data-v-dc85887f></line><polyline points="12 5 5 12 12 19" data-v-dc85887f></polyline></svg></div><div class="cf-acc-text" data-v-dc85887f><div class="cf-acc-label" style="font-size:13px;" data-v-dc85887f>Closing Cash &amp; Bank</div><div class="cf-acc-desc" data-v-dc85887f>Balance at the end of the period</div></div>', 2)),
                  t("div", {
                    class: c(["cf-acc-amount", f(J).closing_cash >= 0 ? "green" : "red"])
                  }, a(f(S)(f(J).closing_cash)), 3)
                ])
              ], 64)) : h("", !0)
            ]),
            t("div", Wd, [
              t("div", Ud, [
                s[255] || (s[255] = t("div", { class: "cf-trend-box-head" }, [
                  t("div", null, [
                    t("div", { class: "cf-trend-box-title" }, "Cash Flow Trend"),
                    t("div", { class: "cf-trend-box-sub" }, "Monthly cash flow movement")
                  ]),
                  t("div", { class: "cf-trend-period" }, "Monthly")
                ], -1)),
                te.value.length ? (l(), o("div", Kd, [
                  s[254] || (s[254] = t("div", { class: "cf-trend-baseline" }, null, -1)),
                  (l(!0), o(u, null, m(te.value, (e) => (l(), o("div", {
                    key: e.month,
                    class: "cf-trend-col"
                  }, [
                    t("div", {
                      class: "cf-trend-bar operating",
                      style: Bt(Ae(e.operating)),
                      title: "Operating: " + f(S)(e.operating)
                    }, null, 12, Gd),
                    t("div", {
                      class: "cf-trend-bar investing",
                      style: Bt(Ae(e.investing)),
                      title: "Investing: " + f(S)(e.investing)
                    }, null, 12, Yd),
                    t("div", {
                      class: "cf-trend-bar financing",
                      style: Bt(Ae(e.financing)),
                      title: "Financing: " + f(S)(e.financing)
                    }, null, 12, Jd),
                    t("div", Xd, a(e.month), 1)
                  ]))), 128))
                ])) : (l(), o("div", Zd, "No monthly data for this range.")),
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
              t("div", tr, [
                s[258] || (s[258] = t("div", { class: "cf-summary-icon" }, "i", -1)),
                t("div", null, [
                  s[257] || (s[257] = t("div", { class: "cf-summary-title" }, "Summary", -1)),
                  t("div", sr, [
                    ot(" Cash " + a(f(J).net_change >= 0 ? "increased" : "decreased") + " by ", 1),
                    t("span", {
                      class: c(f(J).net_change >= 0 ? "green" : "red"),
                      style: { "font-weight": "700" }
                    }, a(f(S)(Math.abs(f(J).net_change))), 3),
                    ot(" during this period, from " + a(f(S)(f(J).opening_cash)) + " to " + a(f(S)(f(J).closing_cash)) + ". ", 1)
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", er, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "gst" ? (l(), o("div", ar, [
          t("div", or, [
            s[260] || (s[260] = C('<div class="bs-page-head-icon gst-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-dc85887f></path><polyline points="14 2 14 8 20 8" data-v-dc85887f></polyline></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>GST Summary</div><div class="bs-page-head-sub" data-v-dc85887f>Overview of GST collected during the selected period</div></div>', 2)),
            t("div", lr, [
              t("div", nr, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", ir, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[21] || (s[21] = (e) => et("exportGstCSV")),
                  disabled: !((n = f(ds)) != null && n.length)
                }, [...s[259] || (s[259] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, dr),
                w.value === "exportGstCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[22] || (s[22] = (e) => w.value = "")
                  }),
                  t("div", rr, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          f(wl) ? (l(), o("div", ur)) : (r = f(ds)) != null && r.length ? (l(), o("div", cr, [
            (l(!0), o(u, null, m(Vl.value, (e) => (l(), o("div", {
              key: e.tax_type,
              class: c(["gst-card", e.cls])
            }, [
              t("div", mr, [
                s[261] || (s[261] = C('<div class="gst-card-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><ellipse cx="12" cy="5" rx="8" ry="3" data-v-dc85887f></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" data-v-dc85887f></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" data-v-dc85887f></path></svg></div>', 1)),
                t("div", null, [
                  t("div", vr, a(e.tax_type), 1),
                  t("div", _r, a(e.desc), 1)
                ])
              ]),
              t("div", pr, [
                t("div", null, [
                  s[262] || (s[262] = t("div", { class: "gst-stat-label" }, "Invoice Count", -1)),
                  t("div", yr, a(e.invoice_count), 1)
                ]),
                t("div", null, [
                  s[263] || (s[263] = t("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  t("div", hr, a(f(S)(e.total_tax)), 1)
                ])
              ])
            ], 2))), 128)),
            t("div", br, [
              s[266] || (s[266] = C('<div class="gst-card-head" data-v-dc85887f><div class="gst-card-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-dc85887f></path><polyline points="14 2 14 8 20 8" data-v-dc85887f></polyline><line x1="9" y1="17" x2="15" y2="17" data-v-dc85887f></line><line x1="9" y1="13" x2="12" y2="13" data-v-dc85887f></line></svg></div><div data-v-dc85887f><div class="gst-card-title" data-v-dc85887f>Total Summary</div><div class="gst-card-desc" data-v-dc85887f>Combined GST for the selected period</div></div></div>', 1)),
              t("div", gr, [
                t("div", null, [
                  s[264] || (s[264] = t("div", { class: "gst-stat-label" }, "Total Invoices", -1)),
                  t("div", kr, a(Fa.value), 1)
                ]),
                t("div", null, [
                  s[265] || (s[265] = t("div", { class: "gst-stat-label" }, "Total Tax", -1)),
                  t("div", fr, a(f(S)(Ha.value)), 1)
                ])
              ])
            ])
          ])) : (l(), o("div", wr, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "ar" ? (l(), o("div", xr, [
          t("div", Cr, [
            s[268] || (s[268] = C('<div class="bs-page-head-icon ar-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="12" cy="12" r="10" data-v-dc85887f></circle><polyline points="12 6 12 12 16 14" data-v-dc85887f></polyline></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Accounts Receivable Aging</div><div class="bs-page-head-sub" data-v-dc85887f>Outstanding customer balances, grouped by how overdue they are</div></div>', 2)),
            t("div", Sr, [
              t("div", jr, "As of " + a(P(y.value)), 1),
              t("div", Mr, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[25] || (s[25] = (e) => us.value = !us.value),
                  disabled: !rt.value.length
                }, [...s[267] || (s[267] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Dr),
                us.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[26] || (s[26] = (e) => us.value = !1)
                  }),
                  t("div", Tr, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          $e.value ? (l(), o("div", Rr)) : rt.value.length ? (l(), o("div", Or, [
            t("div", Pr, [
              s[270] || (s[270] = C('<div class="iws-total-icon iws-total-icon-neg" data-v-dc85887f><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="12" cy="12" r="10" data-v-dc85887f></circle><polyline points="12 6 12 12 16 14" data-v-dc85887f></polyline></svg></div><div class="iws-total-label" data-v-dc85887f>Total Outstanding</div>', 2)),
              t("div", {
                class: "iws-total-value iws-total-value-neg",
                style: Bt(G(d(jt.value.total)))
              }, a(d(jt.value.total)), 5),
              t("div", Ir, a(rt.value.length) + " " + a(rt.value.length === 1 ? "Customer" : "Customers"), 1),
              jt.value.days_90_plus ? (l(), o("div", Vr, [
                s[269] || (s[269] = t("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                t("span", Nr, a(d(jt.value.days_90_plus)), 1)
              ])) : h("", !0)
            ]),
            t("div", Er, [
              t("table", Br, [
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
                    t("td", qr, a(g + 1), 1),
                    t("td", Ar, a(e.customer_name || e.customer), 1),
                    t("td", $r, a(e.current > 0 ? H(e.current) : "—"), 1),
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
                    t("td", Lr, a(d(e.total)), 1),
                    t("td", Qr, [
                      t("div", Fr, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Qs.value = Qs.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Hr),
                        Qs.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[37] || (s[37] = (Q) => Qs.value = null)
                          }),
                          t("div", zr, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qs.value = null, qa(e, !0);
                              }
                            }, "Copy row", 8, Wr),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Qs.value = null, Aa(e, !0);
                              }
                            }, "Download row as CSV", 8, Ur)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Kr, [
                    s[280] || (s[280] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[281] || (s[281] = t("td", { class: "fw-700" }, "Total", -1)),
                    t("td", Gr, a(d(jt.value.current)), 1),
                    t("td", Yr, a(d(jt.value.days_1_30)), 1),
                    t("td", Jr, a(d(jt.value.days_31_60)), 1),
                    t("td", Xr, a(d(jt.value.days_61_90)), 1),
                    t("td", Zr, a(d(jt.value.days_90_plus)), 1),
                    t("td", tu, a(d(jt.value.total)), 1),
                    s[282] || (s[282] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", su, a(Wa.value ? "No outstanding receivables as of this date." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "ap" ? (l(), o("div", eu, [
          t("div", au, [
            s[284] || (s[284] = C('<div class="bs-page-head-icon ap-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="12" cy="12" r="10" data-v-dc85887f></circle><polyline points="12 6 12 12 16 14" data-v-dc85887f></polyline></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Accounts Payable Aging</div><div class="bs-page-head-sub" data-v-dc85887f>Outstanding vendor balances, grouped by how overdue they are</div></div>', 2)),
            t("div", ou, [
              t("div", lu, "As of " + a(P(y.value)), 1),
              t("div", nu, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[38] || (s[38] = (e) => vs.value = !vs.value),
                  disabled: !ut.value.length
                }, [...s[283] || (s[283] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, iu),
                vs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[39] || (s[39] = (e) => vs.value = !1)
                  }),
                  t("div", du, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Le.value ? (l(), o("div", ru)) : ut.value.length ? (l(), o("div", uu, [
            t("div", cu, [
              s[286] || (s[286] = C('<div class="iws-total-icon iws-total-icon-neg" data-v-dc85887f><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="12" cy="12" r="10" data-v-dc85887f></circle><polyline points="12 6 12 12 16 14" data-v-dc85887f></polyline></svg></div><div class="iws-total-label" data-v-dc85887f>Total Outstanding</div>', 2)),
              t("div", {
                class: "iws-total-value iws-total-value-neg",
                style: Bt(G(d(Mt.value.total)))
              }, a(d(Mt.value.total)), 5),
              t("div", mu, a(ut.value.length) + " " + a(ut.value.length === 1 ? "Vendor" : "Vendors"), 1),
              Mt.value.days_90_plus ? (l(), o("div", vu, [
                s[285] || (s[285] = t("span", { class: "iws-total-sub-label" }, "90+ days overdue", -1)),
                t("span", _u, a(d(Mt.value.days_90_plus)), 1)
              ])) : h("", !0)
            ]),
            t("div", pu, [
              t("table", yu, [
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
                    t("td", hu, a(g + 1), 1),
                    t("td", bu, a(e.supplier_name || e.supplier), 1),
                    t("td", gu, a(e.current > 0 ? H(e.current) : "—"), 1),
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
                    t("td", ku, a(d(e.total)), 1),
                    t("td", fu, [
                      t("div", wu, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Fs.value = Fs.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, xu),
                        Fs.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[50] || (s[50] = (Q) => Fs.value = null)
                          }),
                          t("div", Cu, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Fs.value = null, qa(e, !1);
                              }
                            }, "Copy row", 8, Su),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Fs.value = null, Aa(e, !1);
                              }
                            }, "Download row as CSV", 8, ju)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Mu, [
                    s[296] || (s[296] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[297] || (s[297] = t("td", { class: "fw-700" }, "Total", -1)),
                    t("td", Du, a(d(Mt.value.current)), 1),
                    t("td", Tu, a(d(Mt.value.days_1_30)), 1),
                    t("td", Ru, a(d(Mt.value.days_31_60)), 1),
                    t("td", Ou, a(d(Mt.value.days_61_90)), 1),
                    t("td", Pu, a(d(Mt.value.days_90_plus)), 1),
                    t("td", Iu, a(d(Mt.value.total)), 1),
                    s[298] || (s[298] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Vu, a(Ua.value ? "No outstanding payables as of this date." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "items" ? (l(), o("div", Nu, [
          t("div", Eu, [
            s[300] || (s[300] = C('<div class="bs-page-head-icon iws-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="9" cy="21" r="1" data-v-dc85887f></circle><circle cx="20" cy="21" r="1" data-v-dc85887f></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Item-wise Sales</div><div class="bs-page-head-sub" data-v-dc85887f>Sales summary by item for the selected period</div></div>', 2)),
            t("div", Bu, [
              t("div", qu, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Au, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[51] || (s[51] = (e) => Ps.value = !Ps.value),
                  disabled: !At.value.length
                }, [...s[299] || (s[299] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, $u),
                Ps.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[52] || (s[52] = (e) => Ps.value = !1)
                  }),
                  t("div", Lu, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Qe.value ? (l(), o("div", Qu)) : At.value.length ? (l(), o("div", Fu, [
            t("div", Hu, [
              s[301] || (s[301] = C('<div class="iws-total-icon" data-v-dc85887f><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><line x1="6" y1="20" x2="6" y2="13" data-v-dc85887f></line><line x1="12" y1="20" x2="12" y2="4" data-v-dc85887f></line><line x1="18" y1="20" x2="18" y2="9" data-v-dc85887f></line></svg></div><div class="iws-total-label" data-v-dc85887f>Total Sales</div>', 2)),
              t("div", {
                class: "iws-total-value",
                style: Bt(G(d(Ht.value.amount)))
              }, a(d(Ht.value.amount)), 5),
              t("div", zu, a(At.value.length) + " " + a(At.value.length === 1 ? "Item" : "Items") + " • " + a(Ht.value.invoices) + " " + a(Ht.value.invoices === 1 ? "Invoice" : "Invoices"), 1)
            ]),
            t("div", Wu, [
              t("table", Uu, [
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
                    t("td", Ku, a(g + 1), 1),
                    t("td", Gu, a(e.item_name || e.item_code), 1),
                    t("td", null, [
                      t("span", Yu, a(e.uom || "—"), 1)
                    ]),
                    t("td", Ju, a(e.invoice_count), 1),
                    t("td", Xu, a(p(e.qty_sold)), 1),
                    t("td", Zu, a(H(e.avg_rate)), 1),
                    t("td", tc, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    t("td", sc, a(d(e.total_amount)), 1),
                    t("td", ec, [
                      t("div", ac, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Js.value = Js.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, oc),
                        Js.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[63] || (s[63] = (Q) => Js.value = null)
                          }),
                          t("div", lc, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Js.value = null, hn(e);
                              }
                            }, "Copy row", 8, nc),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Js.value = null, bn(e);
                              }
                            }, "Download row as CSV", 8, ic)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", dc, [
                    s[311] || (s[311] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[312] || (s[312] = t("td", { class: "fw-700" }, "Total", -1)),
                    s[313] || (s[313] = t("td", null, null, -1)),
                    t("td", rc, a(Ht.value.invoices), 1),
                    t("td", uc, a(p(Ht.value.qty)), 1),
                    s[314] || (s[314] = t("td", null, null, -1)),
                    t("td", cc, a(d(Ht.value.discount)), 1),
                    t("td", mc, a(d(Ht.value.amount)), 1),
                    s[315] || (s[315] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", vc, a(Ka.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "customers" ? (l(), o("div", _c, [
          t("div", pc, [
            s[317] || (s[317] = C('<div class="bs-page-head-icon cws-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-dc85887f></path><circle cx="9" cy="7" r="4" data-v-dc85887f></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-dc85887f></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Customer-wise Sales</div><div class="bs-page-head-sub" data-v-dc85887f>Sales summary by customer for the selected period</div></div>', 2)),
            t("div", yc, [
              t("div", hc, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", bc, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[64] || (s[64] = (e) => Ns.value = !Ns.value),
                  disabled: !$t.value.length
                }, [...s[316] || (s[316] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, gc),
                Ns.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[65] || (s[65] = (e) => Ns.value = !1)
                  }),
                  t("div", kc, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Fe.value ? (l(), o("div", fc)) : $t.value.length ? (l(), o("div", wc, [
            t("div", xc, [
              s[319] || (s[319] = C('<div class="iws-total-icon" data-v-dc85887f><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><line x1="6" y1="20" x2="6" y2="13" data-v-dc85887f></line><line x1="12" y1="20" x2="12" y2="4" data-v-dc85887f></line><line x1="18" y1="20" x2="18" y2="9" data-v-dc85887f></line></svg></div><div class="iws-total-label" data-v-dc85887f>Total Sales</div>', 2)),
              t("div", {
                class: "iws-total-value",
                style: Bt(G(d(_t.value.amount)))
              }, a(d(_t.value.amount)), 5),
              t("div", Cc, a($t.value.length) + " " + a($t.value.length === 1 ? "Customer" : "Customers") + " • " + a(_t.value.invoices) + " " + a(_t.value.invoices === 1 ? "Invoice" : "Invoices"), 1),
              _t.value.outstanding ? (l(), o("div", Sc, [
                s[318] || (s[318] = t("span", { class: "iws-total-sub-label" }, "Outstanding", -1)),
                t("span", jc, a(d(_t.value.outstanding)), 1)
              ])) : h("", !0)
            ]),
            t("div", Mc, [
              t("table", Dc, [
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
                    t("td", Tc, a(g + 1), 1),
                    t("td", Rc, a(e.customer_name || e.customer), 1),
                    t("td", Oc, a(e.invoice_count), 1),
                    t("td", Pc, a(H(e.net_total)), 1),
                    t("td", Ic, a(e.total_discount ? H(e.total_discount) : "—"), 1),
                    t("td", Vc, a(H(e.total_tax)), 1),
                    t("td", Nc, a(H(e.avg_invoice_value)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.outstanding_amount > 0 ? "red" : ""])
                    }, a(e.outstanding_amount ? d(e.outstanding_amount) : "—"), 3),
                    t("td", Ec, a(d(e.total_amount)), 1),
                    t("td", Bc, [
                      t("div", qc, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => Xs.value = Xs.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, Ac),
                        Xs.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[77] || (s[77] = (Q) => Xs.value = null)
                          }),
                          t("div", $c, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Xs.value = null, kn(e);
                              }
                            }, "Copy row", 8, Lc),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                Xs.value = null, fn(e);
                              }
                            }, "Download row as CSV", 8, Qc)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Fc, [
                    s[330] || (s[330] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[331] || (s[331] = t("td", { class: "fw-700" }, "Total", -1)),
                    t("td", Hc, a(_t.value.invoices), 1),
                    t("td", zc, a(d(_t.value.net)), 1),
                    t("td", Wc, a(d(_t.value.discount)), 1),
                    t("td", Uc, a(d(_t.value.tax)), 1),
                    s[332] || (s[332] = t("td", null, null, -1)),
                    t("td", Kc, a(d(_t.value.outstanding)), 1),
                    t("td", Gc, a(d(_t.value.amount)), 1),
                    s[333] || (s[333] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ])) : (l(), o("div", Yc, a(Ga.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "profit" ? (l(), o("div", Jc, [
          t("div", Xc, [
            s[335] || (s[335] = C('<div class="bs-page-head-icon pw-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><line x1="12" y1="1" x2="12" y2="23" data-v-dc85887f></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Profit-wise Report (by Item)</div><div class="bs-page-head-sub" data-v-dc85887f>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost.</div></div>', 2)),
            t("div", Zc, [
              t("div", tm, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", sm, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[78] || (s[78] = (e) => Cs.value = !Cs.value),
                  disabled: !ct.value.length
                }, [...s[334] || (s[334] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, em),
                Cs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[79] || (s[79] = (e) => Cs.value = !1)
                  }),
                  t("div", am, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          He.value ? (l(), o("div", om)) : ct.value.length ? (l(), o(u, { key: 1 }, [
            t("div", lm, [
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
                t("div", nm, [
                  ot(a(ct.value.length) + " " + a(ct.value.length === 1 ? "Item" : "Items") + " • ", 1),
                  t("span", {
                    class: c(Me.value >= 0 ? "green" : "red")
                  }, a(Me.value.toFixed(1)) + "% margin", 3)
                ]),
                Ks.value ? (l(), o("div", im, [
                  s[337] || (s[337] = t("span", { class: "iws-total-sub-label" }, "No cost data", -1)),
                  t("span", dm, a(Ks.value) + " item" + a(Ks.value > 1 ? "s" : ""), 1)
                ])) : h("", !0)
              ], 2),
              t("div", rm, [
                t("table", um, [
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
                    (l(!0), o(u, null, m(fa.value, (e, g) => (l(), o("tr", {
                      key: e.item_code + "|" + g
                    }, [
                      t("td", cm, a(g + 1), 1),
                      t("td", mm, [
                        ot(a(e.item_name || e.item_code) + " ", 1),
                        e.cost_rate ? h("", !0) : (l(), o("span", vm, "no cost data"))
                      ]),
                      t("td", _m, a(p(e.qty_sold)), 1),
                      t("td", pm, a(H(e.revenue)), 1),
                      t("td", ym, a(e.cost_rate ? H(e.cost_rate) : "—"), 1),
                      t("td", hm, a(e.total_cost ? H(e.total_cost) : "—"), 1),
                      t("td", {
                        class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                      t("td", {
                        class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                      }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3),
                      t("td", bm, [
                        t("div", gm, [
                          t("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Gs.value = Gs.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, km),
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
                              }, "Copy row", 8, wm),
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Gs.value = null, rn(e);
                                }
                              }, "Download row as CSV", 8, xm)
                            ])
                          ], 64)) : h("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", Cm, [
                      s[348] || (s[348] = t("td", { class: "iws-idx" }, [
                        t("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      s[349] || (s[349] = t("td", { class: "fw-700" }, "Total", -1)),
                      t("td", Sm, a(p(ct.value.reduce((e, g) => e + Number(g.qty_sold || 0), 0))), 1),
                      t("td", jm, a(d(ct.value.reduce((e, g) => e + Number(g.revenue || 0), 0))), 1),
                      s[350] || (s[350] = t("td", null, null, -1)),
                      t("td", Mm, a(d(ct.value.filter((e) => e.cost_rate).reduce((e, g) => e + Number(g.total_cost || 0), 0))), 1),
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
            Ks.value ? (l(), o("div", Dm, a(Ks.value) + " item" + a(Ks.value > 1 ? "s" : "") + ' excluded from the profit/margin totals above — no valuation or standard buying rate found (see "no cost data" tag). ', 1)) : h("", !0)
          ], 64)) : (l(), o("div", Tm, a(Ya.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "invoice_profit" ? (l(), o("div", Rm, [
          t("div", Om, [
            s[353] || (s[353] = C('<div class="bs-page-head-icon ip-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-dc85887f></path><polyline points="14 2 14 8 20 8" data-v-dc85887f></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-dc85887f></line><line x1="9" y1="11" x2="13" y2="11" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Invoice Profitability</div><div class="bs-page-head-sub" data-v-dc85887f>Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost. Tick rows to see profit for a single invoice or any combination of selected invoices.</div></div>', 2)),
            t("div", Pm, [
              t("div", Im, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Vm, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[91] || (s[91] = (e) => Ds.value = !Ds.value),
                  disabled: !dt.value.length
                }, [...s[352] || (s[352] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Nm),
                Ds.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[92] || (s[92] = (e) => Ds.value = !1)
                  }),
                  t("div", Em, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          ze.value ? (l(), o("div", Bm)) : dt.value.length ? (l(), o("div", qm, [
            t("div", {
              class: c(["iws-total-panel", it.value.profit >= 0 ? "" : "iws-total-panel-neg"])
            }, [
              t("div", {
                class: c(["iws-total-icon", it.value.profit >= 0 ? "" : "iws-total-icon-neg"])
              }, [...s[354] || (s[354] = [
                C('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-dc85887f></path><polyline points="14 2 14 8 20 8" data-v-dc85887f></polyline><line x1="9" y1="15" x2="15" y2="15" data-v-dc85887f></line><line x1="9" y1="11" x2="13" y2="11" data-v-dc85887f></line></svg>', 1)
              ])], 2),
              s[355] || (s[355] = t("div", { class: "iws-total-label" }, "Total Profit", -1)),
              t("div", {
                class: c(["iws-total-value", it.value.profit >= 0 ? "" : "iws-total-value-neg"]),
                style: Bt(G(d(it.value.profit)))
              }, a(d(it.value.profit)), 7),
              t("div", Am, [
                ot(a(dt.value.length) + " " + a(dt.value.length === 1 ? "Invoice" : "Invoices") + " • ", 1),
                t("span", {
                  class: c(it.value.revenue ? it.value.profit >= 0 ? "green" : "red" : "")
                }, a(it.value.revenue ? (it.value.profit / it.value.revenue * 100).toFixed(1) : "0.0") + "% margin ", 3)
              ]),
              Tt.value.size ? (l(), o("div", $m, [
                t("span", Lm, a(le.value.count) + " selected", 1),
                t("span", {
                  class: c(["iws-total-sub-value", le.value.profit >= 0 ? "green" : "red"]),
                  style: { color: "inherit" }
                }, a(d(le.value.profit)), 3),
                t("div", Qm, " Revenue " + a(d(le.value.revenue)) + " • Cost " + a(d(le.value.total_cost)), 1)
              ])) : h("", !0)
            ], 2),
            t("div", Fm, [
              t("table", Hm, [
                t("thead", null, [
                  t("tr", null, [
                    t("th", zm, [
                      t("input", {
                        type: "checkbox",
                        checked: Po.value,
                        onChange: cn
                      }, null, 40, Wm)
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
                    t("td", Um, [
                      t("input", {
                        type: "checkbox",
                        checked: Tt.value.has(e.invoice),
                        onChange: (g) => un(e.invoice)
                      }, null, 40, Km)
                    ]),
                    t("td", Gm, [
                      t("a", {
                        href: "#",
                        class: "inv-detail-link",
                        onClick: On((g) => Xa(e.invoice), ["prevent"])
                      }, a(e.invoice), 9, Ym),
                      e.no_cost_lines ? (l(), o("span", Jm, "partial cost data")) : h("", !0)
                    ]),
                    t("td", Xm, a(e.posting_date), 1),
                    t("td", Zm, a(e.customer_name || e.customer), 1),
                    t("td", tv, a(d(e.revenue)), 1),
                    t("td", sv, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(Number(e.margin_pct || 0).toFixed(1)) + "%", 3),
                    t("td", ev, [
                      t("div", av, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (g) => Ts.value = Ts.value === e.invoice ? null : e.invoice,
                          title: "Row actions"
                        }, "⋮", 8, ov),
                        Ts.value === e.invoice ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[103] || (s[103] = (g) => Ts.value = null)
                          }),
                          t("div", lv, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Ts.value = null, Xa(e.invoice);
                              }
                            }, "View P&L", 8, nv),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Ts.value = null, vn(e);
                              }
                            }, "Copy row", 8, iv),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (g) => {
                                Ts.value = null, _n(e);
                              }
                            }, "Download row as CSV", 8, dv)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ], 2))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", rv, [
                    s[364] || (s[364] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[365] || (s[365] = t("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "Total", -1)),
                    t("td", uv, a(d(it.value.revenue)), 1),
                    t("td", cv, a(d(it.value.total_cost)), 1),
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
          ])) : (l(), o("div", mv, a(Ja.value ? "No sales in this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        Mn(Tn, {
          show: We.value,
          width: "720px",
          title: nt.value ? `Profit & Loss — ${nt.value.invoice.name}` : "Profit & Loss",
          onClose: s[104] || (s[104] = (e) => We.value = !1)
        }, {
          default: Dn(() => [
            Ue.value ? (l(), o("div", vv)) : nt.value ? (l(), o(u, { key: 1 }, [
              t("div", _v, [
                t("span", null, [
                  s[367] || (s[367] = ot("Date: ", -1)),
                  t("strong", pv, a(nt.value.invoice.posting_date), 1)
                ]),
                t("span", null, [
                  s[368] || (s[368] = ot("Customer: ", -1)),
                  t("strong", yv, a(nt.value.invoice.customer_name || nt.value.invoice.customer), 1)
                ]),
                t("span", null, [
                  s[369] || (s[369] = ot("Status: ", -1)),
                  t("strong", hv, a(nt.value.invoice.status), 1)
                ])
              ]),
              nt.value.totals.no_cost_lines ? (l(), o("div", bv, a(nt.value.totals.no_cost_lines) + " item" + a(nt.value.totals.no_cost_lines > 1 ? "s" : "") + ' below have no valuation or standard buying rate — their cost is shown as "—" and excluded from the totals. ', 1)) : h("", !0),
              t("table", gv, [
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
                    t("td", kv, a(p(e.qty)), 1),
                    t("td", fv, a(d(e.rate)), 1),
                    t("td", wv, a(d(e.revenue)), 1),
                    t("td", xv, a(e.cost_rate ? d(e.cost_rate) : "—"), 1),
                    t("td", Cv, a(e.cost_rate ? d(e.total_cost) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-700", e.profit >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? d(e.profit) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.cost_rate ? Number(e.margin_pct || 0).toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", Sv, [
                    s[370] || (s[370] = t("td", {
                      colspan: "3",
                      class: "fw-700"
                    }, "TOTAL", -1)),
                    t("td", jv, a(d(nt.value.totals.revenue)), 1),
                    s[371] || (s[371] = t("td", null, null, -1)),
                    t("td", Mv, a(d(nt.value.totals.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r fw-700", nt.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(d(nt.value.totals.profit)), 3),
                    t("td", {
                      class: c(["ta-r fw-700", nt.value.totals.profit >= 0 ? "green" : "red"])
                    }, a(Number(nt.value.totals.margin_pct || 0).toFixed(1)) + "%", 3)
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Dv, "Couldn't load this invoice."))
          ]),
          _: 1
        }, 8, ["show", "title"]),
        k.value === "tb" ? (l(), o("div", Tv, [
          t("div", Rv, [
            s[374] || (s[374] = C('<div class="bs-page-head-icon tb-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><line x1="18" y1="20" x2="18" y2="10" data-v-dc85887f></line><line x1="12" y1="20" x2="12" y2="4" data-v-dc85887f></line><line x1="6" y1="20" x2="6" y2="14" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Trial Balance</div><div class="bs-page-head-sub" data-v-dc85887f>Account-wise opening, movement and closing balances for the selected period</div></div>', 2)),
            t("div", Ov, [
              t("div", Pv, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Iv, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[105] || (s[105] = (e) => rs.value = !rs.value),
                  disabled: !((_ = f(Yt)) != null && _.length)
                }, [...s[373] || (s[373] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Vv),
                rs.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[106] || (s[106] = (e) => rs.value = !1)
                  }),
                  t("div", Nv, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          f(Cl) ? (l(), o("div", Ev)) : (j = f(Yt)) != null && j.length ? (l(), o(u, { key: 1 }, [
            t("div", Bv, [
              t("div", qv, [
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
                t("div", Av, [
                  s[375] || (s[375] = t("div", { class: "bs-kpi-label" }, "Total Debit", -1)),
                  t("div", $v, a(d(mt.value.debit)), 1)
                ])
              ]),
              t("div", Lv, [
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
                t("div", Qv, [
                  s[377] || (s[377] = t("div", { class: "bs-kpi-label" }, "Total Credit", -1)),
                  t("div", Fv, a(d(mt.value.credit)), 1)
                ])
              ])
            ]),
            t("div", {
              class: c(["bs-sum-status", pe.value ? "bs-ok" : "bs-bad"])
            }, [
              t("span", Hv, a(pe.value ? "✓" : "✕"), 1),
              t("div", zv, [
                t("div", Wv, a(pe.value ? "Total Debit = Total Credit" : "Trial balance out of balance"), 1),
                t("div", Uv, [
                  ot(a(d(mt.value.debit)) + " vs " + a(d(mt.value.credit)), 1),
                  pe.value ? h("", !0) : (l(), o(u, { key: 0 }, [
                    ot(" (diff " + a(d(mt.value.debit - mt.value.credit)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            t("div", Kv, [
              t("table", Gv, [
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
                    t("td", Yv, a(g + 1), 1),
                    t("td", Jv, a(e.account), 1),
                    t("td", null, [
                      t("span", Xv, a(e.account_type), 1)
                    ]),
                    t("td", {
                      class: c(["ta-r mono-sm", e.opening < 0 ? "red" : ""])
                    }, a(H(e.opening || 0)), 3),
                    t("td", Zv, a(e.debit ? H(e.debit) : "—"), 1),
                    t("td", t1, a(e.credit ? H(e.credit) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-700", e.closing < 0 ? "red" : "green"])
                    }, a(d(e.closing || 0)), 3),
                    t("td", s1, [
                      t("div", e1, [
                        t("button", {
                          class: "iws-kebab",
                          onClick: (Q) => As.value = As.value === g ? null : g,
                          title: "Row actions"
                        }, "⋮", 8, a1),
                        As.value === g ? (l(), o(u, { key: 0 }, [
                          t("div", {
                            class: "iws-menu-backdrop",
                            onClick: s[116] || (s[116] = (Q) => As.value = null)
                          }),
                          t("div", o1, [
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                As.value = null, Ml(e);
                              }
                            }, "Copy row", 8, l1),
                            t("button", {
                              class: "iws-menu-item",
                              onClick: (Q) => {
                                As.value = null, Dl(e);
                              }
                            }, "Download row as CSV", 8, n1)
                          ])
                        ], 64)) : h("", !0)
                      ])
                    ])
                  ]))), 128))
                ]),
                t("tfoot", null, [
                  t("tr", i1, [
                    s[387] || (s[387] = t("td", { class: "iws-idx" }, [
                      t("span", { class: "iws-sigma" }, "Σ")
                    ], -1)),
                    s[388] || (s[388] = t("td", { class: "fw-700" }, "Total", -1)),
                    s[389] || (s[389] = t("td", null, null, -1)),
                    t("td", d1, a(d(mt.value.opening)), 1),
                    t("td", r1, a(d(mt.value.debit)), 1),
                    t("td", u1, a(d(mt.value.credit)), 1),
                    t("td", c1, a(d(mt.value.closing)), 1),
                    s[390] || (s[390] = t("td", { class: "iws-kebab-col" }, null, -1))
                  ])
                ])
              ])
            ])
          ], 64)) : (l(), o("div", m1, "Run the report to see results."))
        ])) : h("", !0),
        k.value === "stockgl" ? (l(), o("div", v1, [
          t("div", _1, [
            s[392] || (s[392] = C('<div class="bs-page-head-icon sgl-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-dc85887f></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-dc85887f></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Stock Ledger vs Inventory GL</div><div class="bs-page-head-sub" data-v-dc85887f>Compares the operational Stock Ledger (Bin valuation) against the financial General Ledger (Inventory Asset account balance) — this check is the tripwire that catches drift immediately instead of at year-end audit.</div></div>', 2)),
            t("div", p1, [
              t("div", y1, "As of " + a(P(y.value)), 1),
              t("div", h1, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[117] || (s[117] = (e) => ys.value = !ys.value),
                  disabled: !tt.value
                }, [...s[391] || (s[391] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, b1),
                ys.value ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[118] || (s[118] = (e) => ys.value = !1)
                  }),
                  t("div", g1, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Ke.value ? (l(), o("div", k1)) : tt.value ? (l(), o(u, { key: 1 }, [
            t("div", f1, [
              t("div", w1, [
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
                t("div", x1, [
                  s[393] || (s[393] = t("div", { class: "bs-kpi-label" }, "Bin Stock Value", -1)),
                  t("div", C1, a(d(tt.value.total_bin_value)), 1)
                ])
              ]),
              t("div", S1, [
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
                t("div", j1, [
                  s[395] || (s[395] = t("div", { class: "bs-kpi-label" }, "Inventory GL Balance", -1)),
                  t("div", M1, a(d(tt.value.total_gl_balance)), 1)
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
                t("div", D1, [
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
              t("span", T1, a(tt.value.is_reconciled ? "✓" : "✕"), 1),
              t("div", R1, [
                t("div", O1, a(tt.value.is_reconciled ? "Bin Stock Value = Inventory GL Balance" : "Stock and GL are out of sync"), 1),
                t("div", P1, [
                  ot(a(d(tt.value.total_bin_value)) + " vs " + a(d(tt.value.total_gl_balance)), 1),
                  tt.value.is_reconciled ? h("", !0) : (l(), o(u, { key: 0 }, [
                    ot(" (diff " + a(d(tt.value.total_difference)) + ")", 1)
                  ], 64))
                ])
              ])
            ], 2),
            tt.value.grir_account ? (l(), o("div", I1, [
              s[399] || (s[399] = t("strong", null, "Stock Received (GR/IR):", -1)),
              s[400] || (s[400] = ot()),
              t("span", V1, a(d(tt.value.grir_balance)), 1),
              s[401] || (s[401] = t("span", null, " — goods received, awaiting bill. Nonzero is normal.", -1))
            ])) : h("", !0),
            (M = tt.value.accounts) != null && M.length ? (l(), o(u, { key: 1 }, [
              s[409] || (s[409] = t("div", { class: "iws-section-label" }, "By Inventory Account", -1)),
              t("div", N1, [
                t("table", E1, [
                  t("thead", null, [
                    t("tr", null, [
                      s[406] || (s[406] = t("th", { class: "iws-idx" }, "#", -1)),
                      t("th", {
                        onClick: s[122] || (s[122] = (e) => ke("account")),
                        class: "iws-sortable"
                      }, [
                        s[402] || (s[402] = t("span", null, "Inventory Account", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", fe("account")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[123] || (s[123] = (e) => ke("bin_stock_value")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[403] || (s[403] = t("span", null, "Bin Stock Value (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", fe("bin_stock_value")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[124] || (s[124] = (e) => ke("gl_balance")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[404] || (s[404] = t("span", null, "GL Balance (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", fe("gl_balance")])
                        }, "⇅", 2)
                      ]),
                      t("th", {
                        onClick: s[125] || (s[125] = (e) => ke("difference")),
                        class: "iws-sortable ta-r"
                      }, [
                        s[405] || (s[405] = t("span", null, "Difference (KES)", -1)),
                        t("span", {
                          class: c(["iws-sort-ind", fe("difference")])
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
                      t("td", B1, a(g + 1), 1),
                      t("td", q1, a(e.account), 1),
                      t("td", A1, a(H(e.bin_stock_value)), 1),
                      t("td", $1, a(H(e.gl_balance)), 1),
                      t("td", {
                        class: c(["ta-r mono-sm", e.is_reconciled ? "" : "text-danger fw-700"])
                      }, a(H(e.difference)), 3),
                      t("td", null, [
                        t("span", {
                          class: c(["badge", e.is_reconciled ? "badge-blue" : "badge-danger"])
                        }, a(e.is_reconciled ? "OK" : "DRIFT"), 3)
                      ]),
                      t("td", L1, [
                        t("div", Q1, [
                          t("button", {
                            class: "iws-kebab",
                            onClick: (Q) => se.value = se.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, F1),
                          se.value === g ? (l(), o(u, { key: 0 }, [
                            t("div", {
                              class: "iws-menu-backdrop",
                              onClick: s[126] || (s[126] = (Q) => se.value = null)
                            }),
                            t("div", H1, [
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  se.value = null, El(e);
                                }
                              }, "Copy row", 8, z1)
                            ])
                          ], 64)) : h("", !0)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ])
            ], 64)) : h("", !0),
            (N = tt.value.items) != null && N.length ? (l(), o(u, { key: 2 }, [
              s[421] || (s[421] = t("div", { class: "iws-section-label" }, "Item-level Bin Detail", -1)),
              t("div", W1, [
                t("table", U1, [
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
                      t("td", K1, a(g + 1), 1),
                      t("td", G1, a(e.item_name || e.item_code), 1),
                      t("td", null, [
                        t("span", Y1, a(e.warehouse), 1)
                      ]),
                      t("td", J1, a(p(e.actual_qty)), 1),
                      t("td", X1, a(H(e.valuation_rate)), 1),
                      t("td", Z1, a(d(e.stock_value)), 1),
                      t("td", t_, [
                        t("div", s_, [
                          t("button", {
                            class: "iws-kebab",
                            onClick: (Q) => Hs.value = Hs.value === g ? null : g,
                            title: "Row actions"
                          }, "⋮", 8, e_),
                          Hs.value === g ? (l(), o(u, { key: 0 }, [
                            t("div", {
                              class: "iws-menu-backdrop",
                              onClick: s[132] || (s[132] = (Q) => Hs.value = null)
                            }),
                            t("div", a_, [
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Hs.value = null, ql(e);
                                }
                              }, "Copy row", 8, o_),
                              t("button", {
                                class: "iws-menu-item",
                                onClick: (Q) => {
                                  Hs.value = null, $l(e);
                                }
                              }, "Download row as CSV", 8, l_)
                            ])
                          ], 64)) : h("", !0)
                        ])
                      ])
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", n_, [
                      s[417] || (s[417] = t("td", { class: "iws-idx" }, [
                        t("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      s[418] || (s[418] = t("td", {
                        colspan: "3",
                        class: "fw-700"
                      }, "Total", -1)),
                      s[419] || (s[419] = t("td", null, null, -1)),
                      t("td", i_, a(d(Ye.value)), 1),
                      s[420] || (s[420] = t("td", { class: "iws-kebab-col" }, null, -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", d_, a(Za.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "stockval" ? (l(), o("div", r_, [
          t("div", u_, [
            s[423] || (s[423] = C('<div class="bs-page-head-icon sv-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="3" y="3" width="18" height="18" rx="2" data-v-dc85887f></rect><path d="M3 9h18" data-v-dc85887f></path><path d="M9 21V9" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Stock Valuation Summary</div><div class="bs-page-head-sub" data-v-dc85887f>Total stock value per warehouse, from current Bin valuation. Reflects live stock on hand — not a historical point-in-time snapshot, since stock quantities aren&#39;t tracked by date.</div></div>', 2)),
            t("div", c_, [
              t("div", m_, "As of " + a(P(y.value)), 1),
              t("div", v_, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[133] || (s[133] = (e) => et("exportStockValCSV")),
                  disabled: !((Es = (Nt = wt.value) == null ? void 0 : Nt.by_warehouse) != null && Es.length)
                }, [...s[422] || (s[422] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, __),
                w.value === "exportStockValCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[134] || (s[134] = (e) => w.value = "")
                  }),
                  t("div", p_, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          Je.value ? (l(), o("div", y_)) : wt.value ? (l(), o(u, { key: 1 }, [
            t("div", h_, [
              t("div", b_, [
                s[425] || (s[425] = C('<div class="bs-kpi-icon" data-v-dc85887f><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dc85887f><rect x="3" y="3" width="18" height="18" rx="2" data-v-dc85887f></rect><path d="M3 9h18" data-v-dc85887f></path><path d="M9 21V9" data-v-dc85887f></path></svg></div>', 1)),
                t("div", g_, [
                  s[424] || (s[424] = t("div", { class: "bs-kpi-label" }, "Grand Total Stock Value", -1)),
                  t("div", k_, a(d(wt.value.grand_total)), 1)
                ])
              ])
            ]),
            (Xo = wt.value.by_warehouse) != null && Xo.length ? (l(), o(u, { key: 0 }, [
              s[430] || (s[430] = t("div", { class: "iws-section-label" }, "By Warehouse", -1)),
              t("div", f_, [
                t("table", w_, [
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
                      t("td", x_, a(g + 1), 1),
                      t("td", C_, a(e.warehouse), 1),
                      t("td", S_, a(d(e.stock_value)), 1),
                      t("td", j_, a(wt.value.grand_total ? (e.stock_value / wt.value.grand_total * 100).toFixed(1) + "%" : "—"), 1)
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", M_, [
                      s[426] || (s[426] = t("td", { class: "iws-idx" }, [
                        t("span", { class: "iws-sigma" }, "Σ")
                      ], -1)),
                      s[427] || (s[427] = t("td", { class: "fw-700" }, "Total", -1)),
                      t("td", D_, a(d(wt.value.grand_total)), 1),
                      s[428] || (s[428] = t("td", { class: "ta-r fw-700" }, "100.0%", -1))
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", T_, "No stock on hand in any warehouse."))
          ], 64)) : (l(), o("div", R_, a(ao.value ? "No stock on hand for this company." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "price_mrp" ? (l(), o("div", O_, [
          t("div", P_, [
            s[432] || (s[432] = C('<div class="bs-page-head-icon sv-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-dc85887f></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Selling Price &amp; MRP</div><div class="bs-page-head-sub" data-v-dc85887f>Item-wise selling price and MRP per warehouse, from the Item master. Where MRP is not set on an item, the selling price is shown as MRP.</div></div>', 2)),
            t("div", I_, [
              t("div", V_, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[137] || (s[137] = (e) => et("exportPriceMrpCSV")),
                  disabled: !Se.value.length
                }, [...s[431] || (s[431] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, N_),
                w.value === "exportPriceMrpCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[138] || (s[138] = (e) => w.value = "")
                  }),
                  t("div", E_, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", B_, [
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
              }, a(e), 9, q_))), 128))
            ], 512), [
              [al, Ce.value]
            ])
          ]),
          Xe.value ? (l(), o("div", A_)) : oe.value && Se.value.length ? (l(), o("div", $_, [
            t("table", L_, [
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
                  t("td", Q_, a(g + 1), 1),
                  t("td", F_, [
                    ot(a(e.item_name || e.item_code), 1),
                    t("div", H_, a(e.item_code), 1)
                  ]),
                  t("td", null, a(e.warehouse || "—"), 1),
                  t("td", z_, a(e.qty) + " " + a(e.uom), 1),
                  t("td", W_, a(d(e.selling_price)), 1),
                  t("td", U_, a(d(e.mrp)), 1)
                ]))), 128))
              ])
            ])
          ])) : (l(), o("div", K_, a(oo.value ? "No items found." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "mis" ? (l(), o("div", G_, [
          t("div", Y_, [
            s[436] || (s[436] = C('<div class="bs-page-head-icon mis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="3" y="4" width="18" height="18" rx="2" data-v-dc85887f></rect><line x1="3" y1="10" x2="21" y2="10" data-v-dc85887f></line><line x1="8" y1="2" x2="8" y2="6" data-v-dc85887f></line><line x1="16" y1="2" x2="16" y2="6" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Daily Business MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Day-by-day snapshot of Sales, Collection, Purchase, Expenses, Dispatch, Production, Stock Inward/Outward and running Outstanding for the selected period.</div></div>', 2)),
            t("div", J_, [
              t("div", X_, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Z_, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[143] || (s[143] = (e) => et("exportDailyMisCSV")),
                  disabled: !((sl = (tl = X.value) == null ? void 0 : tl.days) != null && sl.length)
                }, [...s[435] || (s[435] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, tp),
                w.value === "exportDailyMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[144] || (s[144] = (e) => w.value = "")
                  }),
                  t("div", sp, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          ta.value ? (l(), o("div", ep)) : X.value ? (l(), o(u, { key: 1 }, [
            t("div", ap, [
              t("div", op, [
                s[437] || (s[437] = t("span", { class: "bucket-label" }, "Daily Sales", -1)),
                t("span", lp, a(d(X.value.totals.sales_amount)), 1)
              ]),
              t("div", np, [
                s[438] || (s[438] = t("span", { class: "bucket-label" }, "Daily Collection", -1)),
                t("span", ip, a(d(X.value.totals.collection_amount)), 1)
              ]),
              t("div", dp, [
                s[439] || (s[439] = t("span", { class: "bucket-label" }, "Daily Purchase", -1)),
                t("span", rp, a(d(X.value.totals.purchase_amount)), 1)
              ]),
              t("div", up, [
                s[440] || (s[440] = t("span", { class: "bucket-label" }, "Daily Expenses", -1)),
                t("span", cp, a(d(X.value.totals.expense_amount)), 1)
              ]),
              t("div", mp, [
                s[441] || (s[441] = t("span", { class: "bucket-label" }, "Daily Dispatch", -1)),
                t("span", vp, a(p(X.value.totals.dispatch_qty)) + " qty", 1)
              ]),
              t("div", _p, [
                s[442] || (s[442] = t("span", { class: "bucket-label" }, "Daily Production", -1)),
                t("span", pp, a(p(X.value.totals.production_qty)) + " qty", 1)
              ]),
              t("div", yp, [
                s[443] || (s[443] = t("span", { class: "bucket-label" }, "Stock Inward / Outward", -1)),
                t("span", hp, a(p(X.value.totals.stock_inward_qty)) + " / " + a(p(X.value.totals.stock_outward_qty)), 1)
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
              t("div", gp, [
                t("table", kp, [
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
                      t("td", wp, a(d(e.sales_amount)), 1),
                      t("td", xp, a(d(e.collection_amount)), 1),
                      t("td", Cp, a(d(e.purchase_amount)), 1),
                      t("td", Sp, a(d(e.expense_amount)), 1),
                      t("td", jp, a(p(e.dispatch_qty)), 1),
                      t("td", Mp, a(p(e.production_qty)), 1),
                      t("td", Dp, a(p(e.stock_inward_qty)), 1),
                      t("td", Tp, a(p(e.stock_outward_qty)), 1),
                      t("td", Rp, a(d(e.outstanding)), 1)
                    ]))), 128))
                  ]),
                  t("tfoot", null, [
                    t("tr", Op, [
                      s[445] || (s[445] = t("td", { class: "fw-700" }, "TOTAL", -1)),
                      t("td", Pp, a(d(X.value.totals.sales_amount)), 1),
                      t("td", Ip, a(d(X.value.totals.collection_amount)), 1),
                      t("td", Vp, a(d(X.value.totals.purchase_amount)), 1),
                      t("td", Np, a(d(X.value.totals.expense_amount)), 1),
                      t("td", Ep, a(p(X.value.totals.dispatch_qty)), 1),
                      t("td", Bp, a(p(X.value.totals.production_qty)), 1),
                      t("td", qp, a(p(X.value.totals.stock_inward_qty)), 1),
                      t("td", Ap, a(p(X.value.totals.stock_outward_qty)), 1),
                      t("td", $p, a(d(X.value.totals.closing_outstanding)), 1)
                    ])
                  ])
                ])
              ])
            ], 64)) : (l(), o("div", Lp, "No activity in this period."))
          ], 64)) : (l(), o("div", Qp, a(lo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "sales_mis" ? (l(), o("div", Fp, [
          t("div", Hp, [
            s[449] || (s[449] = C('<div class="bs-page-head-icon smis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M3 3v18h18" data-v-dc85887f></path><path d="M18 17V9" data-v-dc85887f></path><path d="M13 17V5" data-v-dc85887f></path><path d="M8 17v-3" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Sales MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Sales performance broken down by summary, target, product, customer, salesperson, branch, returns, discounts, pending orders and conversion.</div></div>', 2)),
            t("div", zp, [
              t("div", Wp, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Up, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[147] || (s[147] = (e) => et("exportSalesMisCSV")),
                  disabled: !O.value
                }, [...s[448] || (s[448] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Kp),
                w.value === "exportSalesMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[148] || (s[148] = (e) => w.value = "")
                  }),
                  t("div", Gp, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", Yp, [
            (l(), o(u, null, m(Ql, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: yt.value === e.key }]),
              onClick: (g) => yt.value = e.key
            }, a(e.label), 11, Jp)), 64))
          ]),
          sa.value ? (l(), o("div", Xp)) : O.value ? (l(), o(u, { key: 1 }, [
            yt.value === "summary" ? (l(), o("div", Zp, [
              t("div", ty, [
                s[450] || (s[450] = t("span", { class: "bucket-label" }, "Invoices", -1)),
                t("span", sy, a(p(O.value.summary.invoice_count)), 1)
              ]),
              t("div", ey, [
                s[451] || (s[451] = t("span", { class: "bucket-label" }, "Net Sales", -1)),
                t("span", ay, a(d(O.value.summary.net_sales)), 1)
              ]),
              t("div", oy, [
                s[452] || (s[452] = t("span", { class: "bucket-label" }, "Total Tax", -1)),
                t("span", ly, a(d(O.value.summary.total_tax)), 1)
              ]),
              t("div", ny, [
                s[453] || (s[453] = t("span", { class: "bucket-label" }, "Discount Given", -1)),
                t("span", iy, a(d(O.value.summary.header_discount)), 1)
              ]),
              t("div", dy, [
                s[454] || (s[454] = t("span", { class: "bucket-label" }, "Grand Total", -1)),
                t("span", ry, a(d(O.value.summary.grand_total)), 1)
              ]),
              t("div", uy, [
                s[455] || (s[455] = t("span", { class: "bucket-label" }, "Qty Sold", -1)),
                t("span", cy, a(p(O.value.summary.total_qty)), 1)
              ]),
              t("div", my, [
                s[456] || (s[456] = t("span", { class: "bucket-label" }, "Avg Invoice Value", -1)),
                t("span", vy, a(d(O.value.summary.avg_invoice_value)), 1)
              ])
            ])) : yt.value === "target" ? (l(), o(u, { key: 1 }, [
              t("div", _y, [
                s[457] || (s[457] = t("label", { class: "dr-label" }, "Sales Target (KES)", -1)),
                Et(t("input", {
                  type: "number",
                  "onUpdate:modelValue": s[151] || (s[151] = (e) => bs.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Gt,
                    bs.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                s[458] || (s[458] = t("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target is stored — enter one to compare against actuals for this period.", -1))
              ]),
              t("div", py, [
                t("div", yy, [
                  s[459] || (s[459] = t("span", { class: "bucket-label" }, "Target", -1)),
                  t("span", hy, a(d(bs.value)), 1)
                ]),
                t("div", by, [
                  s[460] || (s[460] = t("span", { class: "bucket-label" }, "Achieved", -1)),
                  t("span", gy, a(d(O.value.summary.grand_total)), 1)
                ]),
                t("div", ky, [
                  s[461] || (s[461] = t("span", { class: "bucket-label" }, "Achievement %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", io.value >= 100 ? "green" : "red"])
                  }, a(io.value.toFixed(1)) + "%", 3)
                ])
              ]),
              t("div", {
                class: c(["pl-row", O.value.summary.grand_total >= bs.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                s[462] || (s[462] = t("span", null, "Variance (Achieved − Target)", -1)),
                t("span", fy, a(f(S)(O.value.summary.grand_total - bs.value)), 1)
              ], 2)
            ], 64)) : yt.value === "product" ? (l(), o("table", wy, [
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
                  t("td", xy, a(e.invoice_count), 1),
                  t("td", Cy, a(p(e.qty_sold)), 1),
                  t("td", Sy, a(d(e.total_discount)), 1),
                  t("td", jy, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : yt.value === "customer" ? (l(), o("table", My, [
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
                  t("td", Dy, a(e.invoice_count), 1),
                  t("td", Ty, a(d(e.total_amount)), 1),
                  t("td", Ry, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : yt.value === "salesperson" ? (l(), o("table", Oy, [
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
                  t("td", Py, a(e.invoice_count), 1),
                  t("td", Iy, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : yt.value === "branch" ? (l(), o(u, { key: 5 }, [
              s[467] || (s[467] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "10px" } }, "No dedicated Branch/Location doctype exists — grouped by Cost Center as a proxy.", -1)),
              t("table", Vy, [
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
                    t("td", Ny, a(e.invoice_count), 1),
                    t("td", Ey, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : yt.value === "returns" ? (l(), o(u, { key: 6 }, [
              t("div", By, [
                t("div", qy, [
                  s[468] || (s[468] = t("span", { class: "bucket-label" }, "Return Count", -1)),
                  t("span", Ay, a(O.value.sales_return.return_count), 1)
                ]),
                t("div", $y, [
                  s[469] || (s[469] = t("span", { class: "bucket-label" }, "Return Value", -1)),
                  t("span", Ly, a(d(O.value.sales_return.return_total)), 1)
                ]),
                t("div", Qy, [
                  s[470] || (s[470] = t("span", { class: "bucket-label" }, "% of Sales", -1)),
                  t("span", Fy, a(O.value.sales_return.return_pct_of_sales.toFixed(1)) + "%", 1)
                ])
              ]),
              O.value.sales_return.rows.length ? (l(), o("table", Hy, [
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
                    t("td", zy, a(d(e.grand_total)), 1),
                    t("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Wy, "No sales returns in this period."))
            ], 64)) : yt.value === "discount" ? (l(), o(u, { key: 7 }, [
              t("div", Uy, [
                t("div", Ky, [
                  s[472] || (s[472] = t("span", { class: "bucket-label" }, "Line Discount", -1)),
                  t("span", Gy, a(d(O.value.discount_analysis.total_line_discount)), 1)
                ]),
                t("div", Yy, [
                  s[473] || (s[473] = t("span", { class: "bucket-label" }, "Header Discount", -1)),
                  t("span", Jy, a(d(O.value.discount_analysis.total_header_discount)), 1)
                ]),
                t("div", Xy, [
                  s[474] || (s[474] = t("span", { class: "bucket-label" }, "Avg Discount %", -1)),
                  t("span", Zy, a(O.value.discount_analysis.avg_discount_pct.toFixed(1)) + "%", 1)
                ])
              ]),
              s[477] || (s[477] = t("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Customer", -1)),
              O.value.discount_analysis.by_customer.length ? (l(), o("table", th, [
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
                    t("td", sh, a(d(e.line_discount)), 1),
                    t("td", eh, a(d(e.header_discount)), 1),
                    t("td", ah, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", oh, "No discounted invoices for any customer.")),
              s[478] || (s[478] = t("div", {
                class: "books-card-title",
                style: { "font-size": "13px", "margin-bottom": "10px" }
              }, "By Item", -1)),
              O.value.discount_analysis.by_item.length ? (l(), o("table", lh, [
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
                    t("td", nh, a(d(e.total_discount)), 1),
                    t("td", ih, a(d(e.net_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", dh, "No discounted items."))
            ], 64)) : yt.value === "pending" ? (l(), o(u, { key: 8 }, [
              t("div", rh, [
                t("div", uh, [
                  s[479] || (s[479] = t("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  t("span", ch, a(O.value.sales_order_pending.order_count), 1)
                ]),
                t("div", mh, [
                  s[480] || (s[480] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", vh, a(d(O.value.sales_order_pending.pending_total)), 1)
                ])
              ]),
              O.value.sales_order_pending.rows.length ? (l(), o("table", _h, [
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
                      t("span", ph, a(e.status), 1)
                    ]),
                    t("td", yh, a(d(e.grand_total)), 1),
                    t("td", hh, a(d(e.billed_amount)), 1),
                    t("td", bh, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", gh, "No pending sales orders."))
            ], 64)) : yt.value === "conversion" ? (l(), o(u, { key: 9 }, [
              s[488] || (s[488] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Based on Sales Orders placed within the selected date range.", -1)),
              t("div", kh, [
                t("div", fh, [
                  s[482] || (s[482] = t("span", { class: "bucket-label" }, "Orders Placed", -1)),
                  t("span", wh, a(O.value.sales_conversion.order_count), 1)
                ]),
                t("div", xh, [
                  s[483] || (s[483] = t("span", { class: "bucket-label" }, "Converted to Invoice", -1)),
                  t("span", Ch, a(O.value.sales_conversion.converted_count), 1)
                ]),
                t("div", Sh, [
                  s[484] || (s[484] = t("span", { class: "bucket-label" }, "Conversion Rate", -1)),
                  t("span", {
                    class: c(["mis-summary-val", O.value.sales_conversion.conversion_rate_pct >= 50 ? "green" : "red"])
                  }, a(O.value.sales_conversion.conversion_rate_pct.toFixed(1)) + "%", 3)
                ]),
                t("div", jh, [
                  s[485] || (s[485] = t("span", { class: "bucket-label" }, "Order Value", -1)),
                  t("span", Mh, a(d(O.value.sales_conversion.order_value)), 1)
                ]),
                t("div", Dh, [
                  s[486] || (s[486] = t("span", { class: "bucket-label" }, "Billed Value", -1)),
                  t("span", Th, a(d(O.value.sales_conversion.billed_value)), 1)
                ]),
                t("div", Rh, [
                  s[487] || (s[487] = t("span", { class: "bucket-label" }, "Value Conversion %", -1)),
                  t("span", Oh, a(O.value.sales_conversion.value_conversion_pct.toFixed(1)) + "%", 1)
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Ph, a(no.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "receivables" ? (l(), o("div", Ih, [
          t("div", Vh, [
            s[490] || (s[490] = C('<div class="bs-page-head-icon rmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="12" cy="12" r="10" data-v-dc85887f></circle><path d="M12 6v6l4 2" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Collection &amp; Receivables MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Total receivables, customer outstanding, ageing, collection targets and efficiency for the selected period.</div></div>', 2)),
            t("div", Nh, [
              t("div", Eh, "As of " + a(P(y.value)), 1),
              t("div", Bh, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[152] || (s[152] = (e) => et("exportReceivablesCSV")),
                  disabled: !I.value
                }, [...s[489] || (s[489] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, qh),
                w.value === "exportReceivablesCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[153] || (s[153] = (e) => w.value = "")
                  }),
                  t("div", Ah, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", $h, [
            (l(), o(u, null, m(Fl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Rt.value === e.key }]),
              onClick: (g) => Rt.value = e.key
            }, a(e.label), 11, Lh)), 64))
          ]),
          ea.value ? (l(), o("div", Qh)) : I.value ? (l(), o(u, { key: 1 }, [
            Rt.value === "total" ? (l(), o(u, { key: 0 }, [
              t("div", Fh, [
                t("span", null, "Total Receivables (as of " + a(I.value.as_of_date) + ")", 1),
                t("span", Hh, a(f(S)(I.value.total_outstanding)), 1)
              ]),
              t("div", zh, [
                t("div", Wh, [
                  s[491] || (s[491] = t("span", { class: "bucket-label" }, "Customers Owing", -1)),
                  t("span", Uh, a(I.value.customer_outstanding.length), 1)
                ]),
                t("div", Kh, [
                  s[492] || (s[492] = t("span", { class: "bucket-label" }, "Open Invoices", -1)),
                  t("span", Gh, a(I.value.customer_outstanding.reduce((e, g) => e + g.invoice_count, 0)), 1)
                ]),
                t("div", Yh, [
                  s[493] || (s[493] = t("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  t("span", Jh, a(d(I.value.overdue.total)), 1)
                ]),
                t("div", Xh, [
                  s[494] || (s[494] = t("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  t("span", Zh, a(d(I.value.total_outstanding - I.value.overdue.total)), 1)
                ])
              ])
            ], 64)) : Rt.value === "outstanding" ? (l(), o(u, { key: 1 }, [
              t("div", tb, [
                t("span", null, "Total Outstanding (as of " + a(I.value.as_of_date) + ")", 1),
                t("span", sb, a(f(S)(I.value.total_outstanding)), 1)
              ]),
              I.value.customer_outstanding.length ? (l(), o("table", eb, [
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
                    t("td", ab, a(e.invoice_count), 1),
                    t("td", null, a(e.oldest_due_date || "—"), 1),
                    t("td", ob, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", lb, "No outstanding receivables."))
            ], 64)) : Rt.value === "ageing" ? (l(), o(u, { key: 2 }, [
              t("div", nb, [
                t("div", ib, [
                  s[496] || (s[496] = t("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  t("span", db, a(d(I.value.ageing_totals.days_0_30)), 1)
                ]),
                t("div", rb, [
                  s[497] || (s[497] = t("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  t("span", ub, a(d(I.value.ageing_totals.days_31_60)), 1)
                ]),
                t("div", cb, [
                  s[498] || (s[498] = t("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  t("span", mb, a(d(I.value.ageing_totals.days_61_90)), 1)
                ]),
                t("div", vb, [
                  s[499] || (s[499] = t("span", { class: "bucket-label" }, "90+ Days", -1)),
                  t("span", _b, a(d(I.value.ageing_totals.days_90_plus)), 1)
                ]),
                t("div", pb, [
                  s[500] || (s[500] = t("span", { class: "bucket-label" }, "Total", -1)),
                  t("span", yb, a(d(I.value.ageing_totals.total)), 1)
                ])
              ]),
              I.value.ageing.length ? (l(), o("table", hb, [
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
                    t("td", bb, a(d(e.days_0_30)), 1),
                    t("td", gb, a(d(e.days_31_60)), 1),
                    t("td", kb, a(d(e.days_61_90)), 1),
                    t("td", fb, a(d(e.days_90_plus)), 1),
                    t("td", wb, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", xb, "No outstanding receivables."))
            ], 64)) : Rt.value === "coll_target" ? (l(), o(u, { key: 3 }, [
              t("div", Cb, [
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
              t("div", Sb, [
                t("div", jb, [
                  s[504] || (s[504] = t("span", { class: "bucket-label" }, "Target", -1)),
                  t("span", Mb, a(d(gs.value)), 1)
                ]),
                t("div", Db, [
                  s[505] || (s[505] = t("span", { class: "bucket-label" }, "Achieved", -1)),
                  t("span", Tb, a(d(I.value.daily_collection.total)), 1)
                ]),
                t("div", Rb, [
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
                t("span", Ob, a(f(S)(I.value.daily_collection.total - gs.value)), 1)
              ], 2)
            ], 64)) : Rt.value === "daily_coll" ? (l(), o(u, { key: 4 }, [
              t("div", Pb, [
                t("span", null, "Total Collection (" + a(x.value) + " to " + a(y.value) + ")", 1),
                t("span", Ib, a(f(S)(I.value.daily_collection.total)), 1)
              ]),
              I.value.daily_collection.days.length ? (l(), o("table", Vb, [
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
                    t("td", Nb, a(e.count), 1),
                    t("td", Eb, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : h("", !0)
            ], 64)) : Rt.value === "overdue" ? (l(), o(u, { key: 5 }, [
              t("div", Bb, [
                t("div", qb, [
                  s[509] || (s[509] = t("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  t("span", Ab, a(I.value.overdue.count), 1)
                ]),
                t("div", $b, [
                  s[510] || (s[510] = t("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  t("span", Lb, a(d(I.value.overdue.total)), 1)
                ])
              ]),
              I.value.overdue.rows.length ? (l(), o("table", Qb, [
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
                    t("td", Fb, a(e.overdue_days), 1),
                    t("td", Hb, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zb, "No overdue invoices."))
            ], 64)) : Rt.value === "credit" ? (l(), o(u, { key: 6 }, [
              I.value.credit_utilisation.length ? (l(), o("table", Wb, [
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
                    t("td", Ub, a(e.credit_limit ? d(e.credit_limit) : "No limit set"), 1),
                    t("td", Kb, a(d(e.outstanding_amount)), 1),
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
              ])) : (l(), o("div", Gb, "No customers with a credit limit or outstanding balance."))
            ], 64)) : Rt.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              s[519] || (s[519] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Efficiency % = Collections in period ÷ (Opening Receivables + Sales in period). ", -1)),
              t("div", Yb, [
                t("div", Jb, [
                  s[513] || (s[513] = t("span", { class: "bucket-label" }, "Opening Receivables", -1)),
                  t("span", Xb, a(d(I.value.collection_efficiency.opening_receivables)), 1)
                ]),
                t("div", Zb, [
                  s[514] || (s[514] = t("span", { class: "bucket-label" }, "Sales in Period", -1)),
                  t("span", tg, a(d(I.value.collection_efficiency.period_sales)), 1)
                ]),
                t("div", sg, [
                  s[515] || (s[515] = t("span", { class: "bucket-label" }, "Receivable Pool", -1)),
                  t("span", eg, a(d(I.value.collection_efficiency.receivable_pool)), 1)
                ]),
                t("div", ag, [
                  s[516] || (s[516] = t("span", { class: "bucket-label" }, "Collected in Period", -1)),
                  t("span", og, a(d(I.value.collection_efficiency.period_collection)), 1)
                ]),
                t("div", lg, [
                  s[517] || (s[517] = t("span", { class: "bucket-label" }, "Closing Receivables", -1)),
                  t("span", ng, a(d(I.value.collection_efficiency.closing_receivables)), 1)
                ]),
                t("div", ig, [
                  s[518] || (s[518] = t("span", { class: "bucket-label" }, "Collection Efficiency", -1)),
                  t("span", {
                    class: c(["mis-summary-val", I.value.collection_efficiency.efficiency_pct >= 80 ? "green" : "red"])
                  }, a(I.value.collection_efficiency.efficiency_pct.toFixed(1)) + "%", 3)
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", dg, a(ro.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "purchase_mis" ? (l(), o("div", rg, [
          t("div", ug, [
            s[521] || (s[521] = C('<div class="bs-page-head-icon pmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M3 3v18h18" data-v-dc85887f></path><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Purchase MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Purchase performance broken down by summary, supplier, product, target vs actual, price variance and pending orders/receipts.</div></div>', 2)),
            t("div", cg, [
              t("div", mg, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", vg, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[157] || (s[157] = (e) => et("exportPurchaseMisCSV")),
                  disabled: !B.value
                }, [...s[520] || (s[520] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, _g),
                w.value === "exportPurchaseMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[158] || (s[158] = (e) => w.value = "")
                  }),
                  t("div", pg, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", yg, [
            (l(), o(u, null, m(Hl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Ot.value === e.key }]),
              onClick: (g) => Ot.value = e.key
            }, a(e.label), 11, hg)), 64))
          ]),
          aa.value ? (l(), o("div", bg)) : B.value ? (l(), o(u, { key: 1 }, [
            Ot.value === "summary" ? (l(), o("div", gg, [
              t("div", kg, [
                s[522] || (s[522] = t("span", { class: "bucket-label" }, "Bills", -1)),
                t("span", fg, a(p(B.value.summary.invoice_count)), 1)
              ]),
              t("div", wg, [
                s[523] || (s[523] = t("span", { class: "bucket-label" }, "Net Purchases", -1)),
                t("span", xg, a(d(B.value.summary.net_purchases)), 1)
              ]),
              t("div", Cg, [
                s[524] || (s[524] = t("span", { class: "bucket-label" }, "Total Tax", -1)),
                t("span", Sg, a(d(B.value.summary.total_tax)), 1)
              ]),
              t("div", jg, [
                s[525] || (s[525] = t("span", { class: "bucket-label" }, "Discount Received", -1)),
                t("span", Mg, a(d(B.value.summary.header_discount)), 1)
              ]),
              t("div", Dg, [
                s[526] || (s[526] = t("span", { class: "bucket-label" }, "Grand Total", -1)),
                t("span", Tg, a(d(B.value.summary.grand_total)), 1)
              ]),
              t("div", Rg, [
                s[527] || (s[527] = t("span", { class: "bucket-label" }, "Qty Purchased", -1)),
                t("span", Og, a(p(B.value.summary.total_qty)), 1)
              ]),
              t("div", Pg, [
                s[528] || (s[528] = t("span", { class: "bucket-label" }, "Avg Bill Value", -1)),
                t("span", Ig, a(d(B.value.summary.avg_invoice_value)), 1)
              ])
            ])) : Ot.value === "supplier" ? (l(), o("table", Vg, [
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
                  t("td", Ng, a(e.invoice_count), 1),
                  t("td", Eg, a(d(e.total_amount)), 1),
                  t("td", Bg, a(d(e.outstanding_amount)), 1)
                ]))), 128))
              ])
            ])) : Ot.value === "product" ? (l(), o("table", qg, [
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
                  t("td", Ag, a(e.invoice_count), 1),
                  t("td", $g, a(p(e.qty_purchased)), 1),
                  t("td", Lg, a(d(e.total_discount || 0)), 1),
                  t("td", Qg, a(d(e.total_amount)), 1)
                ]))), 128))
              ])
            ])) : Ot.value === "target" ? (l(), o(u, { key: 3 }, [
              t("div", Fg, [
                s[531] || (s[531] = t("label", { class: "dr-label" }, "Purchase Target / Budget (KES)", -1)),
                Et(t("input", {
                  type: "number",
                  "onUpdate:modelValue": s[161] || (s[161] = (e) => ks.value = e),
                  class: "dr-input",
                  style: { width: "160px" },
                  min: "0"
                }, null, 512), [
                  [
                    Gt,
                    ks.value,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                s[532] || (s[532] = t("span", { style: { "font-size": "11.5px", color: "#94a3b8" } }, "No target/budget is stored — enter one to compare against actual purchases for this period.", -1))
              ]),
              t("div", Hg, [
                t("div", zg, [
                  s[533] || (s[533] = t("span", { class: "bucket-label" }, "Target / Budget", -1)),
                  t("span", Wg, a(d(ks.value)), 1)
                ]),
                t("div", Ug, [
                  s[534] || (s[534] = t("span", { class: "bucket-label" }, "Actual", -1)),
                  t("span", Kg, a(d(B.value.summary.grand_total)), 1)
                ]),
                t("div", Gg, [
                  s[535] || (s[535] = t("span", { class: "bucket-label" }, "Utilisation %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", mo.value <= 100 ? "green" : "red"])
                  }, a(mo.value.toFixed(1)) + "%", 3)
                ])
              ]),
              t("div", {
                class: c(["pl-row", B.value.summary.grand_total <= ks.value ? "profit" : "loss"]),
                style: { "margin-top": "12px" }
              }, [
                s[536] || (s[536] = t("span", null, "Variance (Budget − Actual)", -1)),
                t("span", Yg, a(f(S)(ks.value - B.value.summary.grand_total)), 1)
              ], 2)
            ], 64)) : Ot.value === "price_variance" ? (l(), o(u, { key: 4 }, [
              t("div", Jg, [
                s[537] || (s[537] = ot(" Actual weighted-average purchase rate this period vs. the Item's Standard Buying Rate. ", -1)),
                B.value.no_standard_rate_count ? (l(), o("span", Xg, a(B.value.no_standard_rate_count) + " item(s) below have no Standard Buying Rate set and are excluded from the % comparison.", 1)) : h("", !0)
              ]),
              B.value.price_variance.length ? (l(), o("table", Zg, [
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
                    t("td", t2, a(p(e.qty_purchased)), 1),
                    t("td", s2, a(d(e.actual_rate)), 1),
                    t("td", e2, a(e.has_standard_rate ? d(e.standard_rate) : "Not set"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.has_standard_rate ? e.variance > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? d(e.variance) : "—"), 3),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.has_standard_rate ? e.variance_pct > 0 ? "red" : "green" : ""])
                    }, a(e.has_standard_rate ? e.variance_pct.toFixed(1) + "%" : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a2, "No purchases in this period."))
            ], 64)) : Ot.value === "pending_po" ? (l(), o(u, { key: 5 }, [
              t("div", o2, [
                t("div", l2, [
                  s[539] || (s[539] = t("span", { class: "bucket-label" }, "Open Orders (as of To date)", -1)),
                  t("span", n2, a(B.value.pending_purchase_orders.order_count), 1)
                ]),
                t("div", i2, [
                  s[540] || (s[540] = t("span", { class: "bucket-label" }, "Pending (Not Yet Billed)", -1)),
                  t("span", d2, a(d(B.value.pending_purchase_orders.pending_total)), 1)
                ])
              ]),
              B.value.pending_purchase_orders.rows.length ? (l(), o("table", r2, [
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
                      t("span", u2, a(e.status), 1)
                    ]),
                    t("td", c2, a(d(e.grand_total)), 1),
                    t("td", m2, a(d(e.billed_amount || 0)), 1),
                    t("td", v2, a(d(e.pending_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", _2, "No pending Purchase Orders as of this date."))
            ], 64)) : Ot.value === "pending_receipts" ? (l(), o(u, { key: 6 }, [
              t("div", p2, [
                t("div", y2, [
                  s[542] || (s[542] = t("span", { class: "bucket-label" }, "Orders Awaiting Receipt", -1)),
                  t("span", h2, a(B.value.pending_material_receipts.order_count), 1)
                ]),
                t("div", b2, [
                  s[543] || (s[543] = t("span", { class: "bucket-label" }, "Pending Receipt Value", -1)),
                  t("span", g2, a(d(B.value.pending_material_receipts.pending_value)), 1)
                ])
              ]),
              B.value.pending_material_receipts.rows.length ? (l(), o("table", k2, [
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
                      t("span", f2, a(e.status), 1)
                    ]),
                    t("td", w2, a(p(e.ordered_qty)), 1),
                    t("td", x2, a(p(e.received_qty || 0)), 1),
                    t("td", C2, a(p(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", S2, "No pending material receipts as of this date."))
            ], 64)) : Ot.value === "returns" ? (l(), o(u, { key: 7 }, [
              t("div", j2, [
                t("div", M2, [
                  s[545] || (s[545] = t("span", { class: "bucket-label" }, "Return Count", -1)),
                  t("span", D2, a(B.value.purchase_return.return_count), 1)
                ]),
                t("div", T2, [
                  s[546] || (s[546] = t("span", { class: "bucket-label" }, "Return Value", -1)),
                  t("span", R2, a(d(B.value.purchase_return.return_total)), 1)
                ]),
                t("div", O2, [
                  s[547] || (s[547] = t("span", { class: "bucket-label" }, "% of Purchases", -1)),
                  t("span", P2, a(B.value.purchase_return.return_pct_of_purchases.toFixed(1)) + "%", 1)
                ])
              ]),
              B.value.purchase_return.rows.length ? (l(), o("table", I2, [
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
                    t("td", V2, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", N2, "No purchase returns in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", E2, a(co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "inventory_mis" ? (l(), o("div", B2, [
          t("div", q2, [
            s[550] || (s[550] = C('<div class="bs-page-head-icon invmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-dc85887f></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-dc85887f></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Inventory MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Current stock, valuation, movement speed, ageing, reorder points and adjustments across all warehouses.</div></div>', 2)),
            t("div", A2, [
              t("div", $2, "As of " + a(P(y.value)), 1),
              t("div", L2, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[162] || (s[162] = (e) => et("exportInventoryMisCSV")),
                  disabled: !R.value
                }, [...s[549] || (s[549] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Q2),
                w.value === "exportInventoryMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[163] || (s[163] = (e) => w.value = "")
                  }),
                  t("div", F2, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", H2, [
            (l(), o(u, null, m(zl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: ht.value === e.key }]),
              onClick: (g) => ht.value = e.key
            }, a(e.label), 11, z2)), 64))
          ]),
          oa.value ? (l(), o("div", W2)) : R.value ? (l(), o(u, { key: 1 }, [
            ht.value === "current_stock" ? (l(), o(u, { key: 0 }, [
              t("div", U2, [
                t("div", K2, [
                  s[551] || (s[551] = t("span", { class: "bucket-label" }, "Total Qty on Hand", -1)),
                  t("span", G2, a(p(R.value.current_stock.total_qty)), 1)
                ]),
                t("div", Y2, [
                  s[552] || (s[552] = t("span", { class: "bucket-label" }, "Total Stock Value", -1)),
                  t("span", J2, a(d(R.value.current_stock.total_value)), 1)
                ])
              ]),
              R.value.current_stock.rows.length ? (l(), o("table", X2, [
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
                    t("td", Z2, a(p(e.actual_qty)), 1),
                    t("td", t0, a(d(e.valuation_rate)), 1),
                    t("td", s0, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", e0, "No stock on hand."))
            ], 64)) : ht.value === "stock_value" ? (l(), o(u, { key: 1 }, [
              t("div", a0, [
                s[554] || (s[554] = t("span", null, "Total Stock Value (all warehouses)", -1)),
                t("span", o0, a(f(S)(R.value.stock_value.grand_total)), 1)
              ]),
              R.value.stock_value.by_warehouse.length ? (l(), o("table", l0, [
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
                    t("td", n0, a(e.item_count), 1),
                    t("td", i0, a(p(e.total_qty)), 1),
                    t("td", d0, a(d(e.stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", r0, "No stock on hand."))
            ], 64)) : ht.value === "fast_moving" ? (l(), o(u, { key: 2 }, [
              t("div", u0, " Ranked by quantity consumed (stock-out) between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              R.value.fast_moving.length ? (l(), o("table", c0, [
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
                    t("td", m0, a(p(e.qty_consumed)), 1),
                    t("td", v0, a(e.transactions), 1),
                    t("td", _0, a(p(e.current_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", p0, "No stock-out movement in this period."))
            ], 64)) : ht.value === "slow_moving" ? (l(), o(u, { key: 3 }, [
              t("div", y0, " In stock, last moved 30-180 days before " + a(y.value) + ". ", 1),
              R.value.slow_moving.length ? (l(), o("table", h0, [
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
                    t("td", g0, a(d(e.stock_value)), 1),
                    t("td", null, a(e.last_movement_date), 1),
                    t("td", k0, a(e.days_since_movement), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", f0, "No slow moving items."))
            ], 64)) : ht.value === "dead_stock" ? (l(), o(u, { key: 4 }, [
              t("div", w0, [
                t("div", x0, [
                  s[558] || (s[558] = t("span", { class: "bucket-label" }, "Dead Stock Items", -1)),
                  t("span", C0, a(R.value.dead_stock.rows.length), 1)
                ]),
                t("div", S0, [
                  s[559] || (s[559] = t("span", { class: "bucket-label" }, "Value Tied Up", -1)),
                  t("span", j0, a(d(R.value.dead_stock.total_value)), 1)
                ])
              ]),
              t("div", M0, " In stock, no stock-out movement in over 180 days before " + a(y.value) + " (or ever). ", 1),
              R.value.dead_stock.rows.length ? (l(), o("table", D0, [
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
                    t("td", T0, a(p(e.actual_qty)), 1),
                    t("td", R0, a(d(e.stock_value)), 1),
                    t("td", null, a(e.last_movement_date || "Never"), 1),
                    t("td", O0, a(e.days_since_movement ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", P0, "No dead stock."))
            ], 64)) : ht.value === "ageing" ? (l(), o(u, { key: 5 }, [
              t("div", I0, " Proxy ageing: days since each item+warehouse's most recent stock-in, as of " + a(y.value) + ". ", 1),
              t("div", V0, [
                t("div", N0, [
                  s[561] || (s[561] = t("span", { class: "bucket-label" }, "0-30 Days", -1)),
                  t("span", E0, a(d(R.value.stock_ageing.totals.days_0_30)), 1)
                ]),
                t("div", B0, [
                  s[562] || (s[562] = t("span", { class: "bucket-label" }, "31-60 Days", -1)),
                  t("span", q0, a(d(R.value.stock_ageing.totals.days_31_60)), 1)
                ]),
                t("div", A0, [
                  s[563] || (s[563] = t("span", { class: "bucket-label" }, "61-90 Days", -1)),
                  t("span", $0, a(d(R.value.stock_ageing.totals.days_61_90)), 1)
                ]),
                t("div", L0, [
                  s[564] || (s[564] = t("span", { class: "bucket-label" }, "90+ Days", -1)),
                  t("span", Q0, a(d(R.value.stock_ageing.totals.days_90_plus)), 1)
                ]),
                t("div", F0, [
                  s[565] || (s[565] = t("span", { class: "bucket-label" }, "Total", -1)),
                  t("span", H0, a(d(R.value.stock_ageing.totals.total)), 1)
                ])
              ]),
              R.value.stock_ageing.rows.length ? (l(), o("table", z0, [
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
                    t("td", W0, a(p(e.actual_qty)), 1),
                    t("td", U0, a(d(e.stock_value)), 1),
                    t("td", null, a(e.last_receipt_date || "Never"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", (e.age_days || 0) > 90 ? "red fw-600" : ""])
                    }, a(e.age_days ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", K0, "No stock on hand."))
            ], 64)) : ht.value === "reorder" ? (l(), o(u, { key: 6 }, [
              t("div", G0, [
                t("div", Y0, [
                  s[567] || (s[567] = t("span", { class: "bucket-label" }, "Items Below Reorder Level", -1)),
                  t("span", J0, a(R.value.reorder_low_stock.item_count), 1)
                ])
              ]),
              R.value.reorder_low_stock.rows.length ? (l(), o("table", X0, [
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
                    t("td", Z0, a(p(e.actual_qty)), 1),
                    t("td", t8, a(p(e.reorder_level)), 1),
                    t("td", s8, a(p(e.reorder_qty)), 1),
                    t("td", e8, a(p(e.shortage_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", a8, "No items below reorder level."))
            ], 64)) : ht.value === "excess" ? (l(), o(u, { key: 7 }, [
              s[571] || (s[571] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Max Stock Level is stored — approximated from days-of-cover (qty ÷ trailing 90-day avg daily consumption); flagged when cover exceeds 180 days. ", -1)),
              t("div", o8, [
                t("div", l8, [
                  s[569] || (s[569] = t("span", { class: "bucket-label" }, "Excess Stock Value", -1)),
                  t("span", n8, a(d(R.value.excess_stock.total_value)), 1)
                ])
              ]),
              R.value.excess_stock.rows.length ? (l(), o("table", i8, [
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
                    t("td", d8, a(p(e.actual_qty)), 1),
                    t("td", r8, a(e.avg_daily_consumption), 1),
                    t("td", u8, a(e.days_of_cover), 1),
                    t("td", c8, a(p(e.excess_qty)), 1),
                    t("td", m8, a(d(e.excess_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", v8, "No excess stock identified."))
            ], 64)) : ht.value === "adjustment" ? (l(), o(u, { key: 8 }, [
              t("div", _8, [
                t("div", p8, [
                  s[572] || (s[572] = t("span", { class: "bucket-label" }, "Adjustments", -1)),
                  t("span", y8, a(R.value.stock_adjustment.entry_count), 1)
                ]),
                t("div", h8, [
                  s[573] || (s[573] = t("span", { class: "bucket-label" }, "Increase Value", -1)),
                  t("span", b8, a(d(R.value.stock_adjustment.increase_value)), 1)
                ]),
                t("div", g8, [
                  s[574] || (s[574] = t("span", { class: "bucket-label" }, "Decrease Value", -1)),
                  t("span", k8, a(d(R.value.stock_adjustment.decrease_value)), 1)
                ])
              ]),
              R.value.stock_adjustment.rows.length ? (l(), o("table", f8, [
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
              ])) : (l(), o("div", w8, "No stock adjustments in this period."))
            ], 64)) : ht.value === "loss" ? (l(), o(u, { key: 9 }, [
              t("div", x8, [
                t("div", C8, [
                  s[576] || (s[576] = t("span", { class: "bucket-label" }, "Loss Entries", -1)),
                  t("span", S8, a(R.value.stock_loss.loss_count), 1)
                ]),
                t("div", j8, [
                  s[577] || (s[577] = t("span", { class: "bucket-label" }, "Value Lost", -1)),
                  t("span", M8, a(d(R.value.stock_loss.loss_value)), 1)
                ])
              ]),
              s[579] || (s[579] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scoped to negative-qty Stock Adjustment entries (physical-count shortfalls). Manufacturing Variance Loss is tracked separately on Work Orders. ", -1)),
              R.value.stock_loss.rows.length ? (l(), o("table", D8, [
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
                    t("td", T8, a(p(e.qty)), 1),
                    t("td", R8, a(d(e.value)), 1),
                    t("td", null, a(e.reason || "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", O8, "No stock loss/shortage in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", P8, a(vo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "production_mis" ? (l(), o("div", I8, [
          t("div", V8, [
            s[581] || (s[581] = C('<div class="bs-page-head-icon prodmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="2" y="7" width="20" height="14" rx="2" data-v-dc85887f></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Production MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Production plan vs actual, WIP status, material availability and consumption, cost, efficiency and rejection/scrap for work orders.</div></div>', 2)),
            t("div", N8, [
              t("div", E8, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", B8, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[166] || (s[166] = (e) => et("exportProductionMisCSV")),
                  disabled: !T.value
                }, [...s[580] || (s[580] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, q8),
                w.value === "exportProductionMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[167] || (s[167] = (e) => w.value = "")
                  }),
                  t("div", A8, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", $8, [
            (l(), o(u, null, m(Wl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: bt.value === e.key }]),
              onClick: (g) => bt.value = e.key
            }, a(e.label), 11, L8)), 64))
          ]),
          la.value ? (l(), o("div", Q8)) : T.value ? (l(), o(u, { key: 1 }, [
            bt.value === "plan_vs_actual" ? (l(), o(u, { key: 0 }, [
              t("div", F8, [
                t("div", H8, [
                  s[582] || (s[582] = t("span", { class: "bucket-label" }, "Planned Qty", -1)),
                  t("span", z8, a(p(T.value.plan_vs_actual.totals.planned_qty)), 1)
                ]),
                t("div", W8, [
                  s[583] || (s[583] = t("span", { class: "bucket-label" }, "Produced Qty", -1)),
                  t("span", U8, a(p(T.value.plan_vs_actual.totals.produced_qty)), 1)
                ])
              ]),
              T.value.plan_vs_actual.rows.length ? (l(), o("table", K8, [
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
                    t("td", G8, a(p(e.planned_qty)), 1),
                    t("td", Y8, a(p(e.produced_qty)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance_qty >= 0 ? "green" : "red"])
                    }, a(p(e.variance_qty)), 3),
                    t("td", J8, a(e.variance_pct != null ? e.variance_pct + "%" : "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", X8, "No production plans posted in this period."))
            ], 64)) : bt.value === "pending" ? (l(), o(u, { key: 1 }, [
              t("div", Z8, " Live snapshot of open Work Orders (not reconstructed as of " + a(y.value) + "). ", 1),
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
            ], 64)) : bt.value === "wip" ? (l(), o(u, { key: 2 }, [
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
                    t("td", hk, a(p(e.produced_qty)), 1),
                    t("td", bk, a(e.pct_complete) + "%", 1),
                    t("td", null, a(e.wip_warehouse || "—"), 1),
                    t("td", gk, a(d(e.wip_stock_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", kk, "No Work Orders in process."))
            ], 64)) : bt.value === "material_availability" ? (l(), o(u, { key: 3 }, [
              s[593] || (s[593] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Live shortage check: still-to-issue qty on open Work Orders vs current stock at the source warehouse. ", -1)),
              t("div", fk, [
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
            ], 64)) : bt.value === "material_consumption" ? (l(), o(u, { key: 4 }, [
              t("div", Tk, [
                s[594] || (s[594] = t("span", null, "Total Material Consumed", -1)),
                t("span", Rk, a(f(S)(T.value.material_consumption.total_value)), 1)
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
            ], 64)) : bt.value === "material_variance" ? (l(), o(u, { key: 5 }, [
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
            ], 64)) : bt.value === "production_cost" ? (l(), o(u, { key: 6 }, [
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
                    t("td", tf, a(e.actual_cost_per_unit != null ? d(e.actual_cost_per_unit) : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.cost_variance_per_unit > 0 ? "red" : e.cost_variance_per_unit < 0 ? "green" : ""])
                    }, a(e.standard_cost_per_unit != null ? d(e.standard_cost_per_unit) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", sf, "No production cost recorded in this period."))
            ], 64)) : bt.value === "efficiency" ? (l(), o(u, { key: 7 }, [
              t("div", ef, [
                t("div", af, [
                  s[602] || (s[602] = t("span", { class: "bucket-label" }, "Avg Efficiency", -1)),
                  t("span", of, a(T.value.production_efficiency.avg_efficiency_pct != null ? T.value.production_efficiency.avg_efficiency_pct + "%" : "—"), 1)
                ])
              ]),
              T.value.production_efficiency.rows.length ? (l(), o("table", lf, [
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
                    t("td", nf, a(p(e.planned_mins)), 1),
                    t("td", df, a(p(e.actual_mins)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.efficiency_pct >= 100 ? "green" : "red"])
                    }, a(e.efficiency_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", rf, "No operation time logged for Work Orders scheduled in this period."))
            ], 64)) : bt.value === "rejection" ? (l(), o(u, { key: 8 }, [
              s[607] || (s[607] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Job Card scrap items not flagged as process loss — defective pieces that may be reworked. ", -1)),
              t("div", uf, [
                t("div", cf, [
                  s[604] || (s[604] = t("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  t("span", mf, a(p(T.value.rejection_rework.qty_total)), 1)
                ]),
                t("div", vf, [
                  s[605] || (s[605] = t("span", { class: "bucket-label" }, "Value", -1)),
                  t("span", _f, a(d(T.value.rejection_rework.value_total)), 1)
                ])
              ]),
              T.value.rejection_rework.rows.length ? (l(), o("table", pf, [
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
                    t("td", yf, a(p(e.qty)), 1),
                    t("td", hf, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", bf, "No rejection/rework recorded in this period."))
            ], 64)) : bt.value === "scrap" ? (l(), o(u, { key: 9 }, [
              s[611] || (s[611] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Scrap output rows on Manufacture stock entries, plus process/yield loss recorded on those entries. ", -1)),
              t("div", gf, [
                t("div", kf, [
                  s[608] || (s[608] = t("span", { class: "bucket-label" }, "Scrap Value", -1)),
                  t("span", ff, a(d(T.value.scrap_wastage.scrap_value_total)), 1)
                ]),
                t("div", wf, [
                  s[609] || (s[609] = t("span", { class: "bucket-label" }, "Process Loss Qty", -1)),
                  t("span", xf, a(p(T.value.scrap_wastage.process_loss_qty_total)), 1)
                ])
              ]),
              T.value.scrap_wastage.rows.length ? (l(), o("table", Cf, [
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
                    t("td", Sf, a(p(e.qty)), 1),
                    t("td", jf, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Mf, "No scrap output recorded in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Df, a(_o.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "product_mis" ? (l(), o("div", Tf, [
          t("div", Rf, [
            s[613] || (s[613] = C('<div class="bs-page-head-icon prdmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" data-v-dc85887f></path><line x1="7" y1="7" x2="7.01" y2="7" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Product MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Product-wise sales, profit, cost, margin, production, stock and wastage, plus top and low selling products for the period.</div></div>', 2)),
            t("div", Of, [
              t("div", Pf, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", If, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[170] || (s[170] = (e) => et("exportProductMisCSV")),
                  disabled: !A.value
                }, [...s[612] || (s[612] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Vf),
                w.value === "exportProductMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[171] || (s[171] = (e) => w.value = "")
                  }),
                  t("div", Nf, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", Ef, [
            (l(), o(u, null, m(Ul, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: xt.value === e.key }]),
              onClick: (g) => xt.value = e.key
            }, a(e.label), 11, Bf)), 64))
          ]),
          na.value ? (l(), o("div", qf)) : A.value ? (l(), o(u, { key: 1 }, [
            xt.value === "sales" ? (l(), o(u, { key: 0 }, [
              t("div", Af, [
                t("div", $f, [
                  s[614] || (s[614] = t("span", { class: "bucket-label" }, "Qty Sold", -1)),
                  t("span", Lf, a(p(A.value.product_wise_sales.totals.qty_sold)), 1)
                ]),
                t("div", Qf, [
                  s[615] || (s[615] = t("span", { class: "bucket-label" }, "Total Revenue", -1)),
                  t("span", Ff, a(d(A.value.product_wise_sales.totals.total_amount)), 1)
                ])
              ]),
              A.value.product_wise_sales.rows.length ? (l(), o("table", Hf, [
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
                    t("td", zf, a(e.invoice_count), 1),
                    t("td", Wf, a(p(e.qty_sold)), 1),
                    t("td", Uf, a(d(e.avg_rate)), 1),
                    t("td", Kf, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Gf, "No sales in this period."))
            ], 64)) : xt.value === "profit" ? (l(), o(u, { key: 1 }, [
              t("div", Yf, [
                t("div", Jf, [
                  s[617] || (s[617] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", Xf, a(d(A.value.product_wise_profit.totals.revenue)), 1)
                ]),
                t("div", Zf, [
                  s[618] || (s[618] = t("span", { class: "bucket-label" }, "Cost", -1)),
                  t("span", tw, a(d(A.value.product_wise_profit.totals.total_cost)), 1)
                ]),
                t("div", sw, [
                  s[619] || (s[619] = t("span", { class: "bucket-label" }, "Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", A.value.product_wise_profit.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(A.value.product_wise_profit.totals.profit)), 3)
                ])
              ]),
              A.value.product_wise_profit.rows.length ? (l(), o("table", ew, [
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
                    t("td", aw, a(d(e.revenue)), 1),
                    t("td", ow, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", lw, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", nw, "No sales in this period."))
            ], 64)) : xt.value === "cost" ? (l(), o(u, { key: 2 }, [
              s[622] || (s[622] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              A.value.product_wise_cost.rows.length ? (l(), o("table", iw, [
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
                    t("td", dw, a(p(e.qty_sold)), 1),
                    t("td", rw, a(d(e.cost_rate)), 1),
                    t("td", uw, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", cw, "No sales in this period."))
            ], 64)) : xt.value === "margin" ? (l(), o(u, { key: 3 }, [
              A.value.product_wise_margin.rows.length ? (l(), o("table", mw, [
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
                    t("td", vw, a(d(e.revenue)), 1),
                    t("td", _w, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.margin_pct >= 0 ? "green" : "red"])
                    }, a(e.margin_pct) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", pw, "No sales in this period."))
            ], 64)) : xt.value === "production" ? (l(), o(u, { key: 4 }, [
              t("div", yw, " Finished-goods receipts on Manufacture stock entries posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              A.value.product_wise_production.rows.length ? (l(), o("table", hw, [
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
                    t("td", gw, a(d(e.value_produced)), 1),
                    t("td", kw, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fw, "No production recorded in this period."))
            ], 64)) : xt.value === "stock" ? (l(), o(u, { key: 5 }, [
              A.value.product_wise_stock.rows.length ? (l(), o("table", ww, [
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
                    t("td", xw, a(p(e.total_qty)), 1),
                    t("td", Cw, a(d(e.valuation_rate)), 1),
                    t("td", Sw, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", jw, "No stock on hand."))
            ], 64)) : xt.value === "wastage" ? (l(), o(u, { key: 6 }, [
              t("div", Mw, " Scrap-flagged rows on Manufacture stock entries posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              t("div", Dw, [
                t("div", Tw, [
                  s[626] || (s[626] = t("span", { class: "bucket-label" }, "Qty Scrapped", -1)),
                  t("span", Rw, a(p(A.value.product_wise_wastage.totals.qty_scrapped)), 1)
                ]),
                t("div", Ow, [
                  s[627] || (s[627] = t("span", { class: "bucket-label" }, "Value Scrapped", -1)),
                  t("span", Pw, a(d(A.value.product_wise_wastage.totals.value_scrapped)), 1)
                ])
              ]),
              A.value.product_wise_wastage.rows.length ? (l(), o("table", Iw, [
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
                    t("td", Vw, a(p(e.qty_scrapped)), 1),
                    t("td", Nw, a(d(e.value_scrapped)), 1),
                    t("td", Ew, a(e.transactions), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Bw, "No wastage recorded in this period."))
            ], 64)) : xt.value === "top_selling" ? (l(), o(u, { key: 7 }, [
              s[630] || (s[630] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Top 10 items by quantity sold in this period.", -1)),
              A.value.top_selling.rows.length ? (l(), o("table", qw, [
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
                    t("td", Aw, a(p(e.qty_sold)), 1),
                    t("td", $w, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Lw, "No sales in this period."))
            ], 64)) : xt.value === "low_selling" ? (l(), o(u, { key: 8 }, [
              s[632] || (s[632] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, "Bottom 10 items by quantity sold in this period (items with at least one sale).", -1)),
              A.value.low_selling.rows.length ? (l(), o("table", Qw, [
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
                    t("td", Fw, a(p(e.qty_sold)), 1),
                    t("td", Hw, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", zw, "No sales in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Ww, a(po.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "dispatch_mis" ? (l(), o("div", Uw, [
          t("div", Kw, [
            s[634] || (s[634] = C('<div class="bs-page-head-icon dmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="1" y="3" width="15" height="13" data-v-dc85887f></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-dc85887f></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-dc85887f></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-dc85887f></circle></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Dispatch &amp; Delivery MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Dispatch summary, pending and delayed deliveries, customer-wise pending delivery and transport-wise dispatch for the period.</div></div>', 2)),
            t("div", Gw, [
              t("div", Yw, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Jw, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[174] || (s[174] = (e) => et("exportDispatchMisCSV")),
                  disabled: !z.value
                }, [...s[633] || (s[633] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Xw),
                w.value === "exportDispatchMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[175] || (s[175] = (e) => w.value = "")
                  }),
                  t("div", Zw, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", t5, [
            (l(), o(u, null, m(Kl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Kt.value === e.key }]),
              onClick: (g) => Kt.value = e.key
            }, a(e.label), 11, s5)), 64))
          ]),
          ia.value ? (l(), o("div", e5)) : z.value ? (l(), o(u, { key: 1 }, [
            Kt.value === "summary" ? (l(), o(u, { key: 0 }, [
              t("div", a5, " Delivery Notes posted between " + a(x.value) + " and " + a(y.value) + ". ", 1),
              t("div", o5, [
                t("div", l5, [
                  s[635] || (s[635] = t("span", { class: "bucket-label" }, "Dispatches", -1)),
                  t("span", n5, a(p(z.value.dispatch_summary.dispatch_count)), 1)
                ]),
                t("div", i5, [
                  s[636] || (s[636] = t("span", { class: "bucket-label" }, "Total Qty Dispatched", -1)),
                  t("span", d5, a(p(z.value.dispatch_summary.total_qty)), 1)
                ]),
                t("div", r5, [
                  s[637] || (s[637] = t("span", { class: "bucket-label" }, "Total Value", -1)),
                  t("span", u5, a(d(z.value.dispatch_summary.total_value)), 1)
                ]),
                t("div", c5, [
                  s[638] || (s[638] = t("span", { class: "bucket-label" }, "Customers Served", -1)),
                  t("span", m5, a(p(z.value.dispatch_summary.customer_count)), 1)
                ]),
                t("div", v5, [
                  s[639] || (s[639] = t("span", { class: "bucket-label" }, "Transporters Used", -1)),
                  t("span", _5, a(p(z.value.dispatch_summary.transporter_count)), 1)
                ]),
                t("div", p5, [
                  s[640] || (s[640] = t("span", { class: "bucket-label" }, "Avg Qty / Dispatch", -1)),
                  t("span", y5, a(p(z.value.dispatch_summary.avg_qty_per_dispatch)), 1)
                ])
              ])
            ], 64)) : Kt.value === "pending_dispatch" ? (l(), o(u, { key: 1 }, [
              t("div", h5, " Sales Order lines with nothing dispatched yet, as of " + a(y.value) + ". ", 1),
              t("div", b5, [
                t("div", g5, [
                  s[641] || (s[641] = t("span", { class: "bucket-label" }, "Orders", -1)),
                  t("span", k5, a(z.value.pending_dispatch.order_count), 1)
                ]),
                t("div", f5, [
                  s[642] || (s[642] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", w5, a(p(z.value.pending_dispatch.pending_qty)), 1)
                ]),
                t("div", x5, [
                  s[643] || (s[643] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", C5, a(d(z.value.pending_dispatch.pending_value)), 1)
                ])
              ]),
              z.value.pending_dispatch.rows.length ? (l(), o("table", S5, [
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
                    t("td", j5, a(p(e.ordered_qty)), 1),
                    t("td", M5, a(p(e.pending_qty)), 1),
                    t("td", D5, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", T5, "No pending dispatch as of this date."))
            ], 64)) : Kt.value === "delivery_pending" ? (l(), o(u, { key: 2 }, [
              t("div", R5, " All undelivered Sales Order quantity as of " + a(y.value) + ", including partially dispatched lines. ", 1),
              t("div", O5, [
                t("div", P5, [
                  s[645] || (s[645] = t("span", { class: "bucket-label" }, "Orders", -1)),
                  t("span", I5, a(z.value.delivery_pending.order_count), 1)
                ]),
                t("div", V5, [
                  s[646] || (s[646] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", N5, a(p(z.value.delivery_pending.pending_qty)), 1)
                ]),
                t("div", E5, [
                  s[647] || (s[647] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", B5, a(d(z.value.delivery_pending.pending_value)), 1)
                ])
              ]),
              z.value.delivery_pending.rows.length ? (l(), o("table", q5, [
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
                    t("td", A5, a(p(e.ordered_qty)), 1),
                    t("td", $5, a(p(e.delivered_qty)), 1),
                    t("td", L5, a(p(e.pending_qty)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Q5, "No pending deliveries as of this date."))
            ], 64)) : Kt.value === "delayed_delivery" ? (l(), o(u, { key: 3 }, [
              s[653] || (s[653] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Delivery Pending lines whose Delivery Date has already passed. ", -1)),
              t("div", F5, [
                t("div", H5, [
                  s[649] || (s[649] = t("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  t("span", z5, a(z.value.delayed_delivery.order_count), 1)
                ]),
                t("div", W5, [
                  s[650] || (s[650] = t("span", { class: "bucket-label" }, "Pending Qty", -1)),
                  t("span", U5, a(p(z.value.delayed_delivery.pending_qty)), 1)
                ]),
                t("div", K5, [
                  s[651] || (s[651] = t("span", { class: "bucket-label" }, "Pending Value", -1)),
                  t("span", G5, a(d(z.value.delayed_delivery.pending_value)), 1)
                ])
              ]),
              z.value.delayed_delivery.rows.length ? (l(), o("table", Y5, [
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
                    t("td", J5, a(e.days_overdue), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, a(e.item_name || e.item_code), 1),
                    t("td", X5, a(p(e.pending_qty)), 1),
                    t("td", Z5, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", t4, "No delayed deliveries as of today."))
            ], 64)) : Kt.value === "customer_pending" ? (l(), o(u, { key: 4 }, [
              z.value.customer_wise_pending_delivery.rows.length ? (l(), o("table", s4, [
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
                    t("td", e4, a(e.order_count), 1),
                    t("td", a4, a(p(e.pending_qty)), 1),
                    t("td", o4, a(d(e.pending_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", l4, "No pending deliveries as of this date."))
            ], 64)) : Kt.value === "transport_wise" ? (l(), o(u, { key: 5 }, [
              t("div", n4, " Delivery Notes posted between " + a(x.value) + " and " + a(y.value) + ", grouped by Transporter. ", 1),
              z.value.transport_wise_dispatch.rows.length ? (l(), o("table", i4, [
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
                    t("td", d4, a(e.dispatch_count), 1),
                    t("td", r4, a(e.customer_count), 1),
                    t("td", u4, a(p(e.total_qty)), 1),
                    t("td", c4, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", m4, "No dispatches in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", v4, a(yo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "order_mis" ? (l(), o("div", _4, [
          t("div", p4, [
            s[657] || (s[657] = C('<div class="bs-page-head-icon omis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M9 11l3 3L22 4" data-v-dc85887f></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Order MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Sales order pipeline — new, pending, under production, ready for dispatch, delayed, delivered, cancelled and order-wise profitability.</div></div>', 2)),
            t("div", y4, [
              t("div", h4, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", b4, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[178] || (s[178] = (e) => et("exportOrderMisCSV")),
                  disabled: !q.value
                }, [...s[656] || (s[656] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, g4),
                w.value === "exportOrderMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[179] || (s[179] = (e) => w.value = "")
                  }),
                  t("div", k4, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", f4, [
            (l(), o(u, null, m(Gl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: vt.value === e.key }]),
              onClick: (g) => vt.value = e.key
            }, a(e.label), 11, w4)), 64))
          ]),
          da.value ? (l(), o("div", x4)) : q.value ? (l(), o(u, { key: 1 }, [
            vt.value === "summary" ? (l(), o(u, { key: 0 }, [
              t("div", C4, " Sales Orders placed between " + a(x.value) + " and " + a(y.value) + ". Under Production / Ready for Dispatch are derived from linked Work Orders; Delayed is based on today's date. ", 1),
              t("div", S4, [
                t("div", j4, [
                  s[658] || (s[658] = t("span", { class: "bucket-label" }, "Total Orders", -1)),
                  t("span", M4, a(p(q.value.summary.total_orders.count)), 1)
                ]),
                t("div", D4, [
                  s[659] || (s[659] = t("span", { class: "bucket-label" }, "New Orders", -1)),
                  t("span", T4, a(p(q.value.summary.new_orders.count)), 1)
                ]),
                t("div", R4, [
                  s[660] || (s[660] = t("span", { class: "bucket-label" }, "Pending Orders", -1)),
                  t("span", O4, a(p(q.value.summary.pending_orders.count)), 1)
                ]),
                t("div", P4, [
                  s[661] || (s[661] = t("span", { class: "bucket-label" }, "Under Production", -1)),
                  t("span", I4, a(p(q.value.summary.under_production.count)), 1)
                ]),
                t("div", V4, [
                  s[662] || (s[662] = t("span", { class: "bucket-label" }, "Ready for Dispatch", -1)),
                  t("span", N4, a(p(q.value.summary.ready_for_dispatch.count)), 1)
                ]),
                t("div", E4, [
                  s[663] || (s[663] = t("span", { class: "bucket-label" }, "Delayed Orders", -1)),
                  t("span", B4, a(p(q.value.summary.delayed_orders.count)), 1)
                ]),
                t("div", q4, [
                  s[664] || (s[664] = t("span", { class: "bucket-label" }, "Delivered Orders", -1)),
                  t("span", A4, a(p(q.value.summary.delivered_orders.count)), 1)
                ]),
                t("div", $4, [
                  s[665] || (s[665] = t("span", { class: "bucket-label" }, "Cancelled Orders", -1)),
                  t("span", L4, a(p(q.value.summary.cancelled_orders.count)), 1)
                ])
              ])
            ], 64)) : vt.value === "total" ? (l(), o(u, { key: 1 }, [
              q.value.summary.total_orders.rows.length ? (l(), o("table", Q4, [
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
                      t("span", F4, a(e.status), 1)
                    ]),
                    t("td", H4, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", z4, "No orders in this period."))
            ], 64)) : vt.value === "new" ? (l(), o(u, { key: 2 }, [
              q.value.summary.new_orders.rows.length ? (l(), o("table", W4, [
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
                    t("td", U4, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", K4, "No new (unconfirmed) orders in this period."))
            ], 64)) : vt.value === "pending" ? (l(), o(u, { key: 3 }, [
              q.value.summary.pending_orders.rows.length ? (l(), o("table", G4, [
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
                      t("span", Y4, a(e.status), 1)
                    ]),
                    t("td", J4, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", X4, "No pending orders in this period."))
            ], 64)) : vt.value === "under_production" ? (l(), o(u, { key: 4 }, [
              q.value.summary.under_production.rows.length ? (l(), o("table", Z4, [
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
                    t("td", t7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", s7, "No orders currently under production."))
            ], 64)) : vt.value === "ready_for_dispatch" ? (l(), o(u, { key: 5 }, [
              q.value.summary.ready_for_dispatch.rows.length ? (l(), o("table", e7, [
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
                    t("td", a7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", o7, "No orders ready for dispatch."))
            ], 64)) : vt.value === "delayed" ? (l(), o(u, { key: 6 }, [
              q.value.summary.delayed_orders.rows.length ? (l(), o("table", l7, [
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
                    t("td", n7, a(e.days_overdue), 1),
                    t("td", null, a(e.customer_name || e.customer), 1),
                    t("td", null, [
                      t("span", i7, a(e.status), 1)
                    ]),
                    t("td", d7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", r7, "No delayed orders as of today."))
            ], 64)) : vt.value === "delivered" ? (l(), o(u, { key: 7 }, [
              q.value.summary.delivered_orders.rows.length ? (l(), o("table", u7, [
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
                      t("span", c7, a(e.status), 1)
                    ]),
                    t("td", m7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", v7, "No delivered orders in this period."))
            ], 64)) : vt.value === "cancelled" ? (l(), o(u, { key: 8 }, [
              q.value.summary.cancelled_orders.rows.length ? (l(), o("table", _7, [
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
                    t("td", p7, a(d(e.grand_total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", y7, "No cancelled orders in this period."))
            ], 64)) : vt.value === "order_value" ? (l(), o(u, { key: 9 }, [
              t("div", h7, [
                t("div", b7, [
                  s[674] || (s[674] = t("span", { class: "bucket-label" }, "Total Order Value", -1)),
                  t("span", g7, a(d(q.value.order_value.total_value)), 1)
                ])
              ]),
              q.value.order_value.by_status.length ? (l(), o("table", k7, [
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
                      t("span", f7, a(e.status), 1)
                    ]),
                    t("td", w7, a(e.order_count), 1),
                    t("td", x7, a(d(e.total_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", C7, "No orders in this period."))
            ], 64)) : vt.value === "profitability" ? (l(), o(u, { key: 10 }, [
              s[680] || (s[680] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate — applied to Sales Order lines whether or not the order has been invoiced yet. ", -1)),
              t("div", S7, [
                t("div", j7, [
                  s[676] || (s[676] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", M7, a(d(q.value.order_profitability.totals.revenue)), 1)
                ]),
                t("div", D7, [
                  s[677] || (s[677] = t("span", { class: "bucket-label" }, "Cost", -1)),
                  t("span", T7, a(d(q.value.order_profitability.totals.total_cost)), 1)
                ]),
                t("div", R7, [
                  s[678] || (s[678] = t("span", { class: "bucket-label" }, "Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", q.value.order_profitability.totals.profit >= 0 ? "green" : "red"])
                  }, a(d(q.value.order_profitability.totals.profit)), 3)
                ])
              ]),
              q.value.order_profitability.rows.length ? (l(), o("table", O7, [
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
                    t("td", P7, a(d(e.revenue)), 1),
                    t("td", I7, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", V7, a(e.margin_pct) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", N7, "No orders in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", E7, a(ho.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "profitability_mis" ? (l(), o("div", B7, [
          t("div", q7, [
            s[682] || (s[682] = C('<div class="bs-page-head-icon pfmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><line x1="12" y1="1" x2="12" y2="23" data-v-dc85887f></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Profitability MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Gross profit and margin by product, customer, order, branch and salesperson, plus the monthly profit trend. Excludes sales returns; cost is current average valuation, falling back to Standard Buying Rate.</div></div>', 2)),
            t("div", A7, [
              t("div", $7, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", L7, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[182] || (s[182] = (e) => et("exportProfitabilityMisCSV")),
                  disabled: !W.value
                }, [...s[681] || (s[681] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Q7),
                w.value === "exportProfitabilityMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[183] || (s[183] = (e) => w.value = "")
                  }),
                  t("div", F7, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", H7, [
            (l(), o(u, null, m(Yl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Lt.value === e.key }]),
              onClick: (g) => Lt.value = e.key
            }, a(e.label), 11, z7)), 64))
          ]),
          ra.value ? (l(), o("div", W7)) : W.value ? (l(), o(u, { key: 1 }, [
            Lt.value === "summary" ? (l(), o(u, { key: 0 }, [
              s[689] || (s[689] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Excludes Sales Returns. Cost is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate. ", -1)),
              t("div", U7, [
                t("div", K7, [
                  s[683] || (s[683] = t("span", { class: "bucket-label" }, "Gross Sales", -1)),
                  t("span", G7, a(d(W.value.summary.gross_sales)), 1)
                ]),
                t("div", Y7, [
                  s[684] || (s[684] = t("span", { class: "bucket-label" }, "Net Sales", -1)),
                  t("span", J7, a(d(W.value.summary.net_sales)), 1)
                ]),
                t("div", X7, [
                  s[685] || (s[685] = t("span", { class: "bucket-label" }, "Total Cost", -1)),
                  t("span", Z7, a(d(W.value.summary.total_cost)), 1)
                ]),
                t("div", t6, [
                  s[686] || (s[686] = t("span", { class: "bucket-label" }, "Gross Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_profit >= 0 ? "green" : "red"])
                  }, a(d(W.value.summary.gross_profit)), 3)
                ]),
                t("div", s6, [
                  s[687] || (s[687] = t("span", { class: "bucket-label" }, "Gross Margin %", -1)),
                  t("span", {
                    class: c(["mis-summary-val", W.value.summary.gross_margin_pct >= 0 ? "green" : "red"])
                  }, a(W.value.summary.gross_margin_pct.toFixed(1)) + "%", 3)
                ]),
                t("div", e6, [
                  s[688] || (s[688] = t("span", { class: "bucket-label" }, "Invoices", -1)),
                  t("span", a6, a(p(W.value.summary.invoice_count)), 1)
                ])
              ])
            ], 64)) : Lt.value === "product" ? (l(), o("table", o6, [
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
                  t("td", l6, a(d(e.revenue)), 1),
                  t("td", n6, a(d(e.cost)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  t("td", i6, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Lt.value === "customer" ? (l(), o("table", d6, [
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
                  t("td", r6, a(e.invoice_count), 1),
                  t("td", u6, a(d(e.revenue)), 1),
                  t("td", c6, a(d(e.cost)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  t("td", m6, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Lt.value === "order" ? (l(), o(u, { key: 3 }, [
              s[695] || (s[695] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Invoiced revenue and estimated cost, rolled up by the Sales Order each invoice line references. ", -1)),
              W.value.order_wise_profit.rows.length ? (l(), o("table", v6, [
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
                    t("td", _6, a(d(e.revenue)), 1),
                    t("td", p6, a(d(e.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", y6, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128)),
                  W.value.order_wise_profit.no_order.revenue ? (l(), o("tr", h6, [
                    s[692] || (s[692] = t("td", {
                      colspan: "2",
                      style: { color: "#94a3b8" }
                    }, "Invoices not linked to a Sales Order", -1)),
                    t("td", b6, a(d(W.value.order_wise_profit.no_order.revenue)), 1),
                    t("td", g6, a(d(W.value.order_wise_profit.no_order.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", W.value.order_wise_profit.no_order.profit >= 0 ? "green" : "red"])
                    }, a(d(W.value.order_wise_profit.no_order.profit)), 3),
                    s[693] || (s[693] = t("td", { class: "ta-r mono-sm" }, "—", -1))
                  ])) : h("", !0)
                ])
              ])) : (l(), o("div", k6, "No order-linked sales in this period."))
            ], 64)) : Lt.value === "branch" ? (l(), o(u, { key: 4 }, [
              s[697] || (s[697] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Branch doctype exists in this app — Cost Center is used as the branch grouping. ", -1)),
              W.value.branch_wise_profit.rows.length ? (l(), o("table", f6, [
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
                    t("td", w6, a(d(e.revenue)), 1),
                    t("td", x6, a(d(e.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", C6, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", S6, "No sales in this period."))
            ], 64)) : Lt.value === "salesperson" ? (l(), o("table", j6, [
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
                  t("td", M6, a(d(e.revenue)), 1),
                  t("td", D6, a(d(e.cost)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                  }, a(d(e.profit)), 3),
                  t("td", T6, a(e.margin_pct.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Lt.value === "monthly_trend" ? (l(), o(u, { key: 6 }, [
              W.value.monthly_profit_trend.rows.length ? (l(), o("table", R6, [
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
                    t("td", O6, a(d(e.revenue)), 1),
                    t("td", P6, a(d(e.cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", I6, a(e.margin_pct.toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", V6, "No sales in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", N6, a(bo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "expense_mis" ? (l(), o("div", E6, [
          t("div", B6, [
            s[701] || (s[701] = C('<div class="bs-page-head-icon emis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="2" y="7" width="20" height="14" rx="2" data-v-dc85887f></rect><path d="M2 10h20" data-v-dc85887f></path><path d="M6 15h4" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Expense MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Total expenses by department and category, budget vs actual, fixed vs variable, trend and unusual/excess spend. Submitted Expense records only — Purchase Invoices and GL journal entries are not included here.</div></div>', 2)),
            t("div", q6, [
              t("div", A6, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", $6, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[186] || (s[186] = (e) => et("exportExpenseMisCSV")),
                  disabled: !U.value
                }, [...s[700] || (s[700] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, L6),
                w.value === "exportExpenseMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[187] || (s[187] = (e) => w.value = "")
                  }),
                  t("div", Q6, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", F6, [
            (l(), o(u, null, m(Jl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Pt.value === e.key }]),
              onClick: (g) => Pt.value = e.key
            }, a(e.label), 11, H6)), 64))
          ]),
          ua.value ? (l(), o("div", z6)) : U.value ? (l(), o(u, { key: 1 }, [
            Pt.value === "summary" ? (l(), o(u, { key: 0 }, [
              s[707] || (s[707] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Submitted Expense records only (see Expenses). Purchase Invoices and GL journal entries are not included here. ", -1)),
              t("div", W6, [
                t("div", U6, [
                  s[702] || (s[702] = t("span", { class: "bucket-label" }, "Total Expenses", -1)),
                  t("span", K6, a(d(U.value.summary.total_amount)), 1)
                ]),
                t("div", G6, [
                  s[703] || (s[703] = t("span", { class: "bucket-label" }, "Net (excl. Tax)", -1)),
                  t("span", Y6, a(d(U.value.summary.net_amount)), 1)
                ]),
                t("div", J6, [
                  s[704] || (s[704] = t("span", { class: "bucket-label" }, "Tax Amount", -1)),
                  t("span", X6, a(d(U.value.summary.total_tax)), 1)
                ]),
                t("div", Z6, [
                  s[705] || (s[705] = t("span", { class: "bucket-label" }, "Expense Count", -1)),
                  t("span", t3, a(p(U.value.summary.expense_count)), 1)
                ]),
                t("div", s3, [
                  s[706] || (s[706] = t("span", { class: "bucket-label" }, "Avg Expense", -1)),
                  t("span", e3, a(d(U.value.summary.avg_expense)), 1)
                ])
              ])
            ], 64)) : Pt.value === "department" ? (l(), o(u, { key: 1 }, [
              s[709] || (s[709] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No Department doctype exists in this app — Cost Center is used as the department grouping. ", -1)),
              U.value.department_wise.rows.length ? (l(), o("table", a3, [
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
                    t("td", o3, a(e.count), 1),
                    t("td", l3, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", n3, "No expenses in this period."))
            ], 64)) : Pt.value === "category" ? (l(), o("table", i3, [
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
                  t("td", d3, a(e.count), 1),
                  t("td", r3, a(d(e.amount)), 1),
                  t("td", u3, a(e.pct_of_total.toFixed(1)) + "%", 1)
                ]))), 128))
              ])
            ])) : Pt.value === "budget" ? (l(), o(u, { key: 3 }, [
              t("div", c3, " Estimated: each Cost Center's stored budget is prorated to the " + a(U.value.budget_vs_actual.period_days) + "-day selected period from its Annual/Quarterly/Monthly budget period. Cost centers with no budget set are omitted. ", 1),
              U.value.budget_vs_actual.rows.length ? (l(), o("table", m3, [
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
                    t("td", v3, a(d(e.period_budget)), 1),
                    t("td", _3, a(d(e.actual)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.variance > 0 ? "red" : "green"])
                    }, a(d(e.variance)), 3),
                    t("td", {
                      class: c(["ta-r mono-sm", e.variance > 0 ? "red" : "green"])
                    }, a(e.variance_pct.toFixed(1)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", p3, "No cost centers with a budget set."))
            ], 64)) : Pt.value === "fixed" ? (l(), o(u, { key: 4 }, [
              s[714] || (s[714] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Categorised by keyword match on the Expense Category name (rent, salary, insurance, depreciation, EMI, etc.) — no stored Fixed/Variable flag exists. ", -1)),
              t("div", y3, [
                t("div", h3, [
                  s[712] || (s[712] = t("span", { class: "bucket-label" }, "Fixed Total", -1)),
                  t("span", b3, a(d(U.value.fixed_expenses.total)), 1)
                ])
              ]),
              U.value.fixed_expenses.rows.length ? (l(), o("table", g3, [
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
                    t("td", k3, a(e.count), 1),
                    t("td", f3, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", w3, "No categories matched the Fixed-expense keywords in this period."))
            ], 64)) : Pt.value === "variable" ? (l(), o(u, { key: 5 }, [
              t("div", x3, [
                t("div", C3, [
                  s[715] || (s[715] = t("span", { class: "bucket-label" }, "Variable Total", -1)),
                  t("span", S3, a(d(U.value.variable_expenses.total)), 1)
                ])
              ]),
              U.value.variable_expenses.rows.length ? (l(), o("table", j3, [
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
                    t("td", M3, a(e.count), 1),
                    t("td", D3, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", T3, "No variable-expense categories in this period."))
            ], 64)) : Pt.value === "trend" ? (l(), o(u, { key: 6 }, [
              U.value.expense_trend.rows.length ? (l(), o("table", R3, [
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
                    t("td", O3, a(e.count), 1),
                    t("td", P3, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", I3, "No expenses in this period."))
            ], 64)) : Pt.value === "unusual" ? (l(), o(u, { key: 7 }, [
              s[719] || (s[719] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Individual expenses flagged as statistical outliers within their own category for this period (mean + 2x std-dev, or 2x average for thin categories). ", -1)),
              U.value.unusual_expenses.rows.length ? (l(), o("table", V3, [
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
                    t("td", N3, a(d(e.amount)), 1),
                    t("td", E3, a(d(e.category_avg)), 1),
                    t("td", B3, a(e.basis), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", q3, "No unusual expenses detected in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", A3, a(go.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "payables_mis" ? (l(), o("div", $3, [
          t("div", L3, [
            s[721] || (s[721] = C('<div class="bs-page-head-icon payblmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><circle cx="12" cy="12" r="10" data-v-dc85887f></circle><polyline points="12 6 12 12 16 14" data-v-dc85887f></polyline></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Payables MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Supplier outstanding, payable ageing, overdue payables, amounts due this week/month, supplier-wise outstanding and payment due forecast.</div></div>', 2)),
            t("div", Q3, [
              t("div", F3, "As of " + a(P(y.value)), 1),
              t("div", H3, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[190] || (s[190] = (e) => et("exportPayablesMisCSV")),
                  disabled: !Z.value
                }, [...s[720] || (s[720] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, z3),
                w.value === "exportPayablesMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[191] || (s[191] = (e) => w.value = "")
                  }),
                  t("div", W3, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", U3, [
            (l(), o(u, null, m(Xl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Qt.value === e.key }]),
              onClick: (g) => Qt.value = e.key
            }, a(e.label), 11, K3)), 64))
          ]),
          ca.value ? (l(), o("div", G3)) : Z.value ? (l(), o(u, { key: 1 }, [
            Qt.value === "summary" ? (l(), o(u, { key: 0 }, [
              t("div", Y3, " As of " + a(y.value) + ". Submitted Purchase Invoices with a non-zero outstanding balance; Purchase Returns are netted in. ", 1),
              t("div", J3, [
                t("div", X3, [
                  s[722] || (s[722] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  t("span", Z3, a(d(Z.value.summary.total_outstanding)), 1)
                ]),
                t("div", tx, [
                  s[723] || (s[723] = t("span", { class: "bucket-label" }, "Overdue Amount", -1)),
                  t("span", sx, a(d(Z.value.summary.overdue_amount)), 1)
                ]),
                t("div", ex, [
                  s[724] || (s[724] = t("span", { class: "bucket-label" }, "Not Yet Due", -1)),
                  t("span", ax, a(d(Z.value.summary.not_yet_due_amount)), 1)
                ]),
                t("div", ox, [
                  s[725] || (s[725] = t("span", { class: "bucket-label" }, "Invoices", -1)),
                  t("span", lx, a(p(Z.value.summary.invoice_count)), 1)
                ]),
                t("div", nx, [
                  s[726] || (s[726] = t("span", { class: "bucket-label" }, "Overdue Invoices", -1)),
                  t("span", ix, a(p(Z.value.summary.overdue_count)), 1)
                ]),
                t("div", dx, [
                  s[727] || (s[727] = t("span", { class: "bucket-label" }, "Suppliers", -1)),
                  t("span", rx, a(p(Z.value.summary.supplier_count)), 1)
                ])
              ])
            ], 64)) : Qt.value === "ageing" ? (l(), o("table", ux, [
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
                  t("td", cx, a(d(e.current)), 1),
                  t("td", mx, a(d(e.days_1_30)), 1),
                  t("td", vx, a(d(e.days_31_60)), 1),
                  t("td", _x, a(d(e.days_61_90)), 1),
                  t("td", px, a(d(e.days_90_plus)), 1),
                  t("td", yx, a(d(e.total)), 1)
                ]))), 128))
              ])
            ])) : Qt.value === "overdue" ? (l(), o(u, { key: 2 }, [
              Z.value.overdue_payables.rows.length ? (l(), o("table", hx, [
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
                    t("td", gx, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", kx, "No overdue payables as of " + a(y.value) + ".", 1))
            ], 64)) : Qt.value === "due_week" ? (l(), o(u, { key: 3 }, [
              t("div", fx, "Rolling 7 days from " + a(y.value) + ", not yet overdue.", 1),
              Z.value.due_this_week.rows.length ? (l(), o("table", wx, [
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
                    t("td", xx, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Cx, "Nothing due in the next 7 days."))
            ], 64)) : Qt.value === "due_month" ? (l(), o(u, { key: 4 }, [
              t("div", Sx, "Calendar month containing " + a(y.value) + " — can include invoices already overdue earlier this month.", 1),
              Z.value.due_this_month.rows.length ? (l(), o("table", jx, [
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
                    t("td", Mx, a(d(e.outstanding_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Dx, "Nothing due this month."))
            ], 64)) : Qt.value === "supplier" ? (l(), o("table", Tx, [
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
                  t("td", Rx, a(e.invoice_count), 1),
                  t("td", Ox, a(d(e.outstanding)), 1),
                  t("td", {
                    class: c(["ta-r mono-sm", e.overdue_amount ? "red" : ""])
                  }, a(d(e.overdue_amount)), 3),
                  t("td", Px, a(e.max_overdue_days || "—"), 1)
                ]))), 128))
              ])
            ])) : Qt.value === "forecast" ? (l(), o(u, { key: 6 }, [
              t("div", Ix, "Forward-looking cash-outflow view, bucketed by days until due from " + a(y.value) + ".", 1),
              t("table", Vx, [
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
                    t("td", Nx, a(e.count), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.key === "overdue" ? "red" : ""])
                    }, a(d(e.amount)), 3)
                  ]))), 128))
                ])
              ])
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", Ex, a(ko.value ? "No data as of this date." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "cash_bank_mis" ? (l(), o("div", Bx, [
          t("div", qx, [
            s[735] || (s[735] = C('<div class="bs-page-head-icon cbmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="2" y="5" width="20" height="14" rx="2" data-v-dc85887f></rect><line x1="2" y1="10" x2="22" y2="10" data-v-dc85887f></line><line x1="6" y1="15" x2="10" y2="15" data-v-dc85887f></line></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Cash &amp; Bank MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Cash position, bank balance, daily cash flow and bank movement, receipts, payments, cash forecast and fund requirement for the period.</div></div>', 2)),
            t("div", Ax, [
              t("div", $x, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", Lx, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[194] || (s[194] = (e) => et("exportCashBankMisCSV")),
                  disabled: !E.value
                }, [...s[734] || (s[734] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, Qx),
                w.value === "exportCashBankMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[195] || (s[195] = (e) => w.value = "")
                  }),
                  t("div", Fx, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", Hx, [
            (l(), o(u, null, m(Zl, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: It.value === e.key }]),
              onClick: (g) => It.value = e.key
            }, a(e.label), 11, zx)), 64))
          ]),
          ma.value ? (l(), o("div", Wx)) : E.value ? (l(), o(u, { key: 1 }, [
            It.value === "cash_position" ? (l(), o(u, { key: 0 }, [
              t("div", Ux, "As of " + a(E.value.as_of_date) + ".", 1),
              t("div", Kx, [
                t("div", Gx, [
                  s[736] || (s[736] = t("span", { class: "bucket-label" }, "Total Cash", -1)),
                  t("span", Yx, a(d(E.value.cash_position.total)), 1)
                ])
              ]),
              E.value.cash_position.rows.length ? (l(), o("table", Jx, [
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
                    t("td", Xx, a(d(e.opening_balance)), 1),
                    t("td", Zx, a(d(e.closing_balance)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", t9, "No Cash accounts found."))
            ], 64)) : It.value === "bank_balance" ? (l(), o(u, { key: 1 }, [
              t("div", s9, "As of " + a(E.value.as_of_date) + ".", 1),
              t("div", e9, [
                t("div", a9, [
                  s[738] || (s[738] = t("span", { class: "bucket-label" }, "Total Bank", -1)),
                  t("span", o9, a(d(E.value.bank_balance.total)), 1)
                ])
              ]),
              E.value.bank_balance.rows.length ? (l(), o("table", l9, [
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
                    t("td", n9, a(d(e.opening_balance)), 1),
                    t("td", i9, a(d(e.closing_balance)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net_movement >= 0 ? "green" : "red"])
                    }, a(d(e.net_movement)), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", d9, "No Bank accounts found."))
            ], 64)) : It.value === "daily_cash" ? (l(), o(u, { key: 2 }, [
              t("div", r9, [
                t("div", u9, [
                  s[740] || (s[740] = t("span", { class: "bucket-label" }, "Opening", -1)),
                  t("span", c9, a(d(E.value.daily_cash_flow.opening_balance)), 1)
                ]),
                t("div", m9, [
                  s[741] || (s[741] = t("span", { class: "bucket-label" }, "Receipts", -1)),
                  t("span", v9, a(d(E.value.daily_cash_flow.total_receipts)), 1)
                ]),
                t("div", _9, [
                  s[742] || (s[742] = t("span", { class: "bucket-label" }, "Payments", -1)),
                  t("span", p9, a(d(E.value.daily_cash_flow.total_payments)), 1)
                ]),
                t("div", y9, [
                  s[743] || (s[743] = t("span", { class: "bucket-label" }, "Closing", -1)),
                  t("span", h9, a(d(E.value.daily_cash_flow.closing_balance)), 1)
                ])
              ]),
              t("table", b9, [
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
                    t("td", g9, a(d(e.receipts)), 1),
                    t("td", k9, a(d(e.payments)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    t("td", f9, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : It.value === "daily_bank" ? (l(), o(u, { key: 3 }, [
              t("div", w9, [
                t("div", x9, [
                  s[745] || (s[745] = t("span", { class: "bucket-label" }, "Opening", -1)),
                  t("span", C9, a(d(E.value.daily_bank_movement.opening_balance)), 1)
                ]),
                t("div", S9, [
                  s[746] || (s[746] = t("span", { class: "bucket-label" }, "Deposits", -1)),
                  t("span", j9, a(d(E.value.daily_bank_movement.total_receipts)), 1)
                ]),
                t("div", M9, [
                  s[747] || (s[747] = t("span", { class: "bucket-label" }, "Withdrawals", -1)),
                  t("span", D9, a(d(E.value.daily_bank_movement.total_payments)), 1)
                ]),
                t("div", T9, [
                  s[748] || (s[748] = t("span", { class: "bucket-label" }, "Closing", -1)),
                  t("span", R9, a(d(E.value.daily_bank_movement.closing_balance)), 1)
                ])
              ]),
              t("table", O9, [
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
                    t("td", P9, a(d(e.receipts)), 1),
                    t("td", I9, a(d(e.payments)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.net >= 0 ? "green" : "red"])
                    }, a(d(e.net)), 3),
                    t("td", V9, a(d(e.balance)), 1)
                  ]))), 128))
                ])
              ])
            ], 64)) : It.value === "receipts" ? (l(), o(u, { key: 4 }, [
              t("div", N9, [
                t("div", E9, [
                  s[750] || (s[750] = t("span", { class: "bucket-label" }, "Total Receipts", -1)),
                  t("span", B9, a(d(E.value.receipts.total)), 1)
                ])
              ]),
              E.value.receipts.rows.length ? (l(), o("table", q9, [
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
                    t("td", A9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $9, "No receipts in this period."))
            ], 64)) : It.value === "payments" ? (l(), o(u, { key: 5 }, [
              s[754] || (s[754] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Includes both Payment Entry (Pay) and Expense records paid directly from a Cash/Bank account. ", -1)),
              t("div", L9, [
                t("div", Q9, [
                  s[752] || (s[752] = t("span", { class: "bucket-label" }, "Total Payments", -1)),
                  t("span", F9, a(d(E.value.payments.total)), 1)
                ])
              ]),
              E.value.payments.rows.length ? (l(), o("table", H9, [
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
                    t("td", z9, a(d(e.amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", W9, "No payments in this period."))
            ], 64)) : It.value === "forecast" ? (l(), o(u, { key: 6 }, [
              t("div", U9, " Projected from the current Cash + Bank position (" + a(d(E.value.cash_forecast.current_position)) + "), assuming every outstanding invoice settles on its due date. ", 1),
              t("table", K9, [
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
                    t("td", G9, a(d(e.inflow)), 1),
                    t("td", Y9, a(d(e.outflow)), 1),
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
              t("div", J9, [
                t("div", X9, [
                  s[756] || (s[756] = t("span", { class: "bucket-label" }, "Peak Fund Requirement", -1)),
                  t("span", {
                    class: c(["mis-summary-val", E.value.fund_requirement.peak_requirement > 0 ? "red" : "green"])
                  }, a(d(E.value.fund_requirement.peak_requirement)), 3)
                ])
              ]),
              E.value.fund_requirement.rows.length ? (l(), o("table", Z9, [
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
                    t("td", tC, a(e.label), 1),
                    t("td", sC, a(d(e.shortfall)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", eC, "No projected shortfall — the current Cash + Bank position covers the forecast."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", aC, a(fo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "customer_mis" ? (l(), o("div", oC, [
          t("div", lC, [
            s[759] || (s[759] = C('<div class="bs-page-head-icon custmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-dc85887f></path><circle cx="9" cy="7" r="4" data-v-dc85887f></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-dc85887f></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Customer MIS</div><div class="bs-page-head-sub" data-v-dc85887f>New, active, repeat and inactive customers, customer-wise sales/outstanding/profit, retention rate, and top customers for the period.</div></div>', 2)),
            t("div", nC, [
              t("div", iC, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", dC, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[198] || (s[198] = (e) => et("exportCustomerMisCSV")),
                  disabled: !D.value
                }, [...s[758] || (s[758] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, rC),
                w.value === "exportCustomerMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[199] || (s[199] = (e) => w.value = "")
                  }),
                  t("div", uC, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", cC, [
            (l(), o(u, null, m(tn, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Ct.value === e.key }]),
              onClick: (g) => Ct.value = e.key
            }, a(e.label), 11, mC)), 64))
          ]),
          va.value ? (l(), o("div", vC)) : D.value ? (l(), o(u, { key: 1 }, [
            t("div", _C, [
              t("div", pC, [
                s[760] || (s[760] = t("span", { class: "bucket-label" }, "Total Customers", -1)),
                t("span", yC, a(p(D.value.summary.total_customers)), 1)
              ]),
              t("div", hC, [
                s[761] || (s[761] = t("span", { class: "bucket-label" }, "Active Customers", -1)),
                t("span", bC, a(p(D.value.summary.active_count)), 1)
              ]),
              t("div", gC, [
                s[762] || (s[762] = t("span", { class: "bucket-label" }, "Active Revenue", -1)),
                t("span", kC, a(d(D.value.summary.active_revenue)), 1)
              ]),
              t("div", fC, [
                s[763] || (s[763] = t("span", { class: "bucket-label" }, "New Customers", -1)),
                t("span", wC, a(p(D.value.summary.new_count)), 1)
              ]),
              t("div", xC, [
                s[764] || (s[764] = t("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                t("span", CC, a(p(D.value.summary.repeat_count)), 1)
              ]),
              t("div", SC, [
                s[765] || (s[765] = t("span", { class: "bucket-label" }, "Repeat Revenue", -1)),
                t("span", jC, a(d(D.value.summary.repeat_revenue)), 1)
              ]),
              t("div", MC, [
                s[766] || (s[766] = t("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                t("span", DC, a(p(D.value.summary.inactive_count)), 1)
              ]),
              t("div", TC, [
                s[767] || (s[767] = t("span", { class: "bucket-label" }, "Retention Rate", -1)),
                t("span", RC, a(Number(D.value.summary.retention_pct).toFixed(1)) + "%", 1)
              ]),
              t("div", OC, [
                s[768] || (s[768] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                t("span", PC, a(d(D.value.summary.total_outstanding)), 1)
              ]),
              t("div", IC, [
                s[769] || (s[769] = t("span", { class: "bucket-label" }, "Total Profit", -1)),
                t("span", {
                  class: c(["mis-summary-val", D.value.summary.total_profit >= 0 ? "green" : "red"])
                }, a(d(D.value.summary.total_profit)), 3)
              ])
            ]),
            Ct.value === "new_customers" ? (l(), o(u, { key: 0 }, [
              t("div", VC, [
                t("div", NC, [
                  s[770] || (s[770] = t("span", { class: "bucket-label" }, "New Customers", -1)),
                  t("span", EC, a(D.value.new_customers.count), 1)
                ])
              ]),
              D.value.new_customers.rows.length ? (l(), o("table", BC, [
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
                    t("td", qC, a(e.invoice_count), 1),
                    t("td", AC, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", $C, "No new customers in this period."))
            ], 64)) : Ct.value === "active_customers" ? (l(), o(u, { key: 1 }, [
              t("div", LC, [
                t("div", QC, [
                  s[772] || (s[772] = t("span", { class: "bucket-label" }, "Active Customers", -1)),
                  t("span", FC, a(D.value.active_customers.count), 1)
                ]),
                t("div", HC, [
                  s[773] || (s[773] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", zC, a(d(D.value.active_customers.total)), 1)
                ])
              ]),
              D.value.active_customers.rows.length ? (l(), o("table", WC, [
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
                    t("td", UC, a(e.invoice_count), 1),
                    t("td", KC, a(d(e.total_amount)), 1),
                    t("td", null, a(e.first_invoice_in_period), 1),
                    t("td", null, a(e.last_invoice_in_period), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", GC, "No active customers in this period."))
            ], 64)) : Ct.value === "repeat_customers" ? (l(), o(u, { key: 2 }, [
              t("div", YC, [
                t("div", JC, [
                  s[775] || (s[775] = t("span", { class: "bucket-label" }, "Repeat Customers", -1)),
                  t("span", XC, a(D.value.repeat_customers.count), 1)
                ]),
                t("div", ZC, [
                  s[776] || (s[776] = t("span", { class: "bucket-label" }, "Revenue", -1)),
                  t("span", tS, a(d(D.value.repeat_customers.total)), 1)
                ])
              ]),
              D.value.repeat_customers.rows.length ? (l(), o("table", sS, [
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
                    t("td", eS, a(e.invoice_count), 1),
                    t("td", aS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", oS, "No repeat customers in this period."))
            ], 64)) : Ct.value === "customer_wise_sales" ? (l(), o(u, { key: 3 }, [
              D.value.customer_wise_sales.rows.length ? (l(), o("table", lS, [
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
                    t("td", nS, a(e.invoice_count), 1),
                    t("td", iS, a(d(e.net_total)), 1),
                    t("td", dS, a(d(e.total_discount)), 1),
                    t("td", rS, a(d(e.total_tax)), 1),
                    t("td", uS, a(d(e.total_amount)), 1),
                    t("td", cS, a(d(e.outstanding_amount)), 1),
                    t("td", mS, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", vS, "No sales in this period."))
            ], 64)) : Ct.value === "customer_wise_outstanding" ? (l(), o(u, { key: 4 }, [
              t("div", _S, [
                t("div", pS, [
                  s[779] || (s[779] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  t("span", yS, a(d(D.value.customer_wise_outstanding.total)), 1)
                ])
              ]),
              D.value.customer_wise_outstanding.rows.length ? (l(), o("table", hS, [
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
                    t("td", gS, a(d(e.outstanding_amount)), 1),
                    t("td", null, a(e.oldest_due_date), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", kS, "No outstanding balances."))
            ], 64)) : Ct.value === "customer_wise_profit" ? (l(), o(u, { key: 5 }, [
              t("div", fS, [
                t("div", wS, [
                  s[781] || (s[781] = t("span", { class: "bucket-label" }, "Total Profit", -1)),
                  t("span", {
                    class: c(["mis-summary-val", D.value.customer_wise_profit.total >= 0 ? "green" : "red"])
                  }, a(d(D.value.customer_wise_profit.total)), 3)
                ])
              ]),
              D.value.customer_wise_profit.rows.length ? (l(), o("table", xS, [
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
                    t("td", CS, a(e.invoice_count), 1),
                    t("td", SS, a(d(e.revenue)), 1),
                    t("td", jS, a(d(e.total_cost)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.profit >= 0 ? "green" : "red"])
                    }, a(d(e.profit)), 3),
                    t("td", MS, a(Number(e.margin_pct).toFixed(1)) + "%", 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", DS, "No profit data for this period."))
            ], 64)) : Ct.value === "customer_retention" ? (l(), o(u, { key: 6 }, [
              t("div", TS, " Comparing " + a(D.value.customer_retention.prev_from) + " – " + a(D.value.customer_retention.prev_to) + " (prior period) to the selected period. ", 1),
              t("div", RS, [
                t("div", OS, [
                  s[783] || (s[783] = t("span", { class: "bucket-label" }, "Retention Rate", -1)),
                  t("span", PS, a(Number(D.value.customer_retention.retention_pct).toFixed(1)) + "%", 1)
                ]),
                t("div", IS, [
                  s[784] || (s[784] = t("span", { class: "bucket-label" }, "Retained", -1)),
                  t("span", VS, a(D.value.customer_retention.retained_count), 1)
                ]),
                t("div", NS, [
                  s[785] || (s[785] = t("span", { class: "bucket-label" }, "Churned", -1)),
                  t("span", ES, a(D.value.customer_retention.churned_count), 1)
                ]),
                t("div", BS, [
                  s[786] || (s[786] = t("span", { class: "bucket-label" }, "New", -1)),
                  t("span", qS, a(D.value.customer_retention.new_count), 1)
                ])
              ]),
              D.value.customer_retention.rows.length ? (l(), o("table", AS, [
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
              ])) : (l(), o("div", $S, "No customer activity to compare."))
            ], 64)) : Ct.value === "top_customers" ? (l(), o(u, { key: 7 }, [
              D.value.top_customers.rows.length ? (l(), o("table", LS, [
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
                    t("td", QS, a(e.invoice_count), 1),
                    t("td", FS, a(d(e.total_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", HS, "No sales in this period."))
            ], 64)) : Ct.value === "inactive_customers" ? (l(), o(u, { key: 8 }, [
              t("div", zS, [
                t("div", WS, [
                  s[789] || (s[789] = t("span", { class: "bucket-label" }, "Inactive Customers", -1)),
                  t("span", US, a(D.value.inactive_customers.count), 1)
                ])
              ]),
              D.value.inactive_customers.rows.length ? (l(), o("table", KS, [
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
                    t("td", GS, a(e.days_inactive), 1),
                    t("td", YS, a(e.invoice_count), 1),
                    t("td", JS, a(d(e.lifetime_revenue)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", XS, "No inactive customers found."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", ZS, a(wo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "supplier_mis" ? (l(), o("div", tj, [
          t("div", sj, [
            s[792] || (s[792] = C('<div class="bs-page-head-icon suppmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><rect x="1" y="3" width="15" height="13" data-v-dc85887f></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-dc85887f></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-dc85887f></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-dc85887f></circle></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Supplier MIS</div><div class="bs-page-head-sub" data-v-dc85887f>Supplier-wise purchase and outstanding, payment ageing, price comparison, delivery/supplier performance and quality/rejection for the period.</div></div>', 2)),
            t("div", ej, [
              t("div", aj, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", oj, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[202] || (s[202] = (e) => et("exportSupplierMisCSV")),
                  disabled: !$.value
                }, [...s[791] || (s[791] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, lj),
                w.value === "exportSupplierMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[203] || (s[203] = (e) => w.value = "")
                  }),
                  t("div", nj, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", ij, [
            (l(), o(u, null, m(sn, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Ft.value === e.key }]),
              onClick: (g) => Ft.value = e.key
            }, a(e.label), 11, dj)), 64))
          ]),
          _a.value ? (l(), o("div", rj)) : $.value ? (l(), o(u, { key: 1 }, [
            Ft.value === "supplier_wise_purchase" ? (l(), o(u, { key: 0 }, [
              t("div", uj, [
                t("div", cj, [
                  s[793] || (s[793] = t("span", { class: "bucket-label" }, "Total Purchase", -1)),
                  t("span", mj, a(d($.value.supplier_wise_purchase.total)), 1)
                ])
              ]),
              $.value.supplier_wise_purchase.rows.length ? (l(), o("table", vj, [
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
                    t("td", _j, a(e.invoice_count), 1),
                    t("td", pj, a(d(e.net_total)), 1),
                    t("td", yj, a(d(e.total_discount)), 1),
                    t("td", hj, a(d(e.total_tax)), 1),
                    t("td", bj, a(d(e.total_amount)), 1),
                    t("td", gj, a(d(e.outstanding_amount)), 1),
                    t("td", kj, a(d(e.avg_invoice_value)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", fj, "No purchases in this period."))
            ], 64)) : Ft.value === "supplier_outstanding" ? (l(), o(u, { key: 1 }, [
              t("div", wj, [
                t("div", xj, [
                  s[795] || (s[795] = t("span", { class: "bucket-label" }, "Total Outstanding", -1)),
                  t("span", Cj, a(d($.value.supplier_outstanding.total)), 1)
                ])
              ]),
              $.value.supplier_outstanding.rows.length ? (l(), o("table", Sj, [
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
                    t("td", jj, a(e.invoice_count), 1),
                    t("td", Mj, a(d(e.outstanding_amount)), 1),
                    t("td", Dj, a(d(e.overdue_amount)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.max_overdue_days > 0 ? "red" : ""])
                    }, a(e.max_overdue_days), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Tj, "No outstanding balances."))
            ], 64)) : Ft.value === "supplier_payment_ageing" ? (l(), o(u, { key: 2 }, [
              $.value.supplier_payment_ageing.rows.length ? (l(), o("table", Rj, [
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
                    t("td", Oj, a(d(e.current)), 1),
                    t("td", Pj, a(d(e.days_1_30)), 1),
                    t("td", Ij, a(d(e.days_31_60)), 1),
                    t("td", Vj, a(d(e.days_61_90)), 1),
                    t("td", Nj, a(d(e.days_90_plus)), 1),
                    t("td", Ej, a(d(e.total)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Bj, "No outstanding balances."))
            ], 64)) : Ft.value === "purchase_price_comparison" ? (l(), o(u, { key: 3 }, [
              t("div", qj, a($.value.purchase_price_comparison.multi_supplier_item_count) + " item(s) were purchased from more than one supplier in this period. ", 1),
              $.value.purchase_price_comparison.rows.length ? (l(), o("table", Aj, [
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
                    t("td", $j, a(e.qty), 1),
                    t("td", Lj, a(d(e.avg_rate)), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.is_lowest ? "green" : "red"])
                    }, a(e.is_lowest ? "—" : "+" + Number(e.variance_vs_lowest_pct).toFixed(1) + "%"), 3),
                    t("td", null, [
                      e.is_lowest && e.supplier_count > 1 ? (l(), o("span", Qj, "Lowest")) : h("", !0)
                    ])
                  ]))), 128))
                ])
              ])) : (l(), o("div", Fj, "No purchases in this period."))
            ], 64)) : Ft.value === "supplier_performance" ? (l(), o(u, { key: 4 }, [
              $.value.supplier_performance.rows.length ? (l(), o("table", Hj, [
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
                    t("td", zj, a(d(e.total_purchase_amount)), 1),
                    t("td", Wj, a(d(e.outstanding_amount)), 1),
                    t("td", Uj, a(e.on_time_delivery_pct != null ? Number(e.on_time_delivery_pct).toFixed(1) + "%" : "—"), 1),
                    t("td", Kj, a(e.rejection_pct != null ? Number(e.rejection_pct).toFixed(1) + "%" : "—"), 1),
                    t("td", Gj, a(e.avg_price_variance_pct != null ? Number(e.avg_price_variance_pct).toFixed(1) + "%" : "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score != null ? Number(e.performance_score).toFixed(0) : "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", Yj, "No supplier activity in this period."))
            ], 64)) : Ft.value === "delivery_performance" ? (l(), o(u, { key: 5 }, [
              t("div", Jj, [
                t("div", Xj, [
                  s[800] || (s[800] = t("span", { class: "bucket-label" }, "On-time %", -1)),
                  t("span", Zj, a(Number($.value.delivery_performance.summary.on_time_pct).toFixed(1)) + "%", 1)
                ]),
                t("div", tM, [
                  s[801] || (s[801] = t("span", { class: "bucket-label" }, "On-time", -1)),
                  t("span", sM, a($.value.delivery_performance.summary.on_time_count), 1)
                ]),
                t("div", eM, [
                  s[802] || (s[802] = t("span", { class: "bucket-label" }, "Late", -1)),
                  t("span", aM, a($.value.delivery_performance.summary.late_count), 1)
                ]),
                t("div", oM, [
                  s[803] || (s[803] = t("span", { class: "bucket-label" }, "No PO Reference", -1)),
                  t("span", lM, a($.value.delivery_performance.summary.undated_count), 1)
                ])
              ]),
              s[806] || (s[806] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Supplier", -1)),
              $.value.delivery_performance.by_supplier.length ? (l(), o("table", nM, [
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
                    t("td", iM, a(e.receipt_count), 1),
                    t("td", dM, a(e.on_time_count), 1),
                    t("td", rM, a(e.late_count), 1),
                    t("td", uM, a(Number(e.on_time_pct).toFixed(1)) + "%", 1),
                    t("td", cM, a(Number(e.avg_delay_days).toFixed(1)), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              s[807] || (s[807] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "Receipts", -1)),
              $.value.delivery_performance.rows.length ? (l(), o("table", mM, [
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
              ])) : (l(), o("div", vM, "No receipts in this period."))
            ], 64)) : Ft.value === "quality_rejection" ? (l(), o(u, { key: 6 }, [
              t("div", _M, [
                t("div", pM, [
                  s[808] || (s[808] = t("span", { class: "bucket-label" }, "Received Qty", -1)),
                  t("span", yM, a($.value.quality_rejection.summary.total_received_qty), 1)
                ]),
                t("div", hM, [
                  s[809] || (s[809] = t("span", { class: "bucket-label" }, "Rejected Qty", -1)),
                  t("span", bM, a($.value.quality_rejection.summary.total_rejected_qty), 1)
                ]),
                t("div", gM, [
                  s[810] || (s[810] = t("span", { class: "bucket-label" }, "Rejection %", -1)),
                  t("span", kM, a(Number($.value.quality_rejection.summary.overall_rejection_pct).toFixed(2)) + "%", 1)
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
                    t("td", wM, a(e.received_qty), 1),
                    t("td", xM, a(e.accepted_qty), 1),
                    t("td", CM, a(e.rejected_qty), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : h("", !0),
              s[814] || (s[814] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Item", -1)),
              $.value.quality_rejection.rows.length ? (l(), o("table", SM, [
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
                    t("td", jM, a(e.received_qty), 1),
                    t("td", MM, a(e.accepted_qty), 1),
                    t("td", DM, a(e.rejected_qty), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.rejection_pct > 0 ? "red" : ""])
                    }, a(Number(e.rejection_pct).toFixed(2)) + "%", 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", TM, "No receipts in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", RM, a(xo.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0),
        k.value === "employee_mis" ? (l(), o("div", OM, [
          t("div", PM, [
            s[816] || (s[816] = C('<div class="bs-page-head-icon empmis-page-head-icon" data-v-dc85887f><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-dc85887f></path><circle cx="9" cy="7" r="4" data-v-dc85887f></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-dc85887f></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-dc85887f></path></svg></div><div class="bs-page-head-text" data-v-dc85887f><div class="bs-page-head-title" data-v-dc85887f>Employee / Performance MIS</div><div class="bs-page-head-sub" data-v-dc85887f>This app has no HR/Payroll module — figures below are built from Job Card time logs and Sales Person records, so they only cover employees who had time logged or are set up as a Sales Person.</div></div>', 2)),
            t("div", IM, [
              t("div", VM, a(P(x.value)) + " - " + a(P(y.value)), 1),
              t("div", NM, [
                t("button", {
                  class: "bs-export-btn",
                  onClick: s[206] || (s[206] = (e) => et("exportEmployeeMisCSV")),
                  disabled: !L.value
                }, [...s[815] || (s[815] = [
                  C('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-dc85887f></path><polyline points="7 10 12 15 17 10" data-v-dc85887f></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-dc85887f></line></svg> Export <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dc85887f><polyline points="6 9 12 15 18 9" data-v-dc85887f></polyline></svg>', 3)
                ])], 8, EM),
                w.value === "exportEmployeeMisCSV" ? (l(), o(u, { key: 0 }, [
                  t("div", {
                    class: "iws-menu-backdrop",
                    onClick: s[207] || (s[207] = (e) => w.value = "")
                  }),
                  t("div", BM, [
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
                ], 64)) : h("", !0)
              ])
            ])
          ]),
          t("div", qM, [
            (l(), o(u, null, m(en, (e) => t("button", {
              key: e.key,
              class: c(["report-tab", { active: Vt.value === e.key }]),
              onClick: (g) => Vt.value = e.key
            }, a(e.label), 11, AM)), 64))
          ]),
          pa.value ? (l(), o("div", $M)) : L.value ? (l(), o(u, { key: 1 }, [
            Vt.value === "employee_attendance" ? (l(), o(u, { key: 0 }, [
              t("div", LM, ' Proxy: a day counts as "present" if the employee has any Job Card time log on that date. ' + a(L.value.period_days) + "-day period. ", 1),
              L.value.employee_attendance.rows.length ? (l(), o("table", QM, [
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
                    t("td", FM, a(e.present_days) + " / " + a(e.period_days), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.attendance_pct >= 80 ? "green" : "red"])
                    }, a(e.attendance_pct) + "%", 3),
                    t("td", HM, a(e.total_hours), 1),
                    t("td", zM, a(e.avg_hours_per_day), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", WM, "No Job Card time logs in this period."))
            ], 64)) : Vt.value === "department_manpower" ? (l(), o(u, { key: 1 }, [
              s[820] || (s[820] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Sales Person is the only doctype in this app with a department field, so this reflects active Sales Persons only. ", -1)),
              t("div", UM, [
                t("div", KM, [
                  s[818] || (s[818] = t("span", { class: "bucket-label" }, "Total Headcount", -1)),
                  t("span", GM, a(L.value.department_manpower.total_headcount), 1)
                ])
              ]),
              L.value.department_manpower.rows.length ? (l(), o("table", YM, [
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
                    t("td", JM, a(e.headcount), 1),
                    t("td", XM, a(e.employees.map((g) => g.sales_person_name).join(", ")), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", ZM, "No active Sales Persons set up."))
            ], 64)) : Vt.value === "salesperson_target" ? (l(), o(u, { key: 2 }, [
              s[824] || (s[824] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " No target is stored — enter a target per salesperson to compare against actual sales for this period. ", -1)),
              t("div", tD, [
                t("div", sD, [
                  s[821] || (s[821] = t("span", { class: "bucket-label" }, "Total Achieved", -1)),
                  t("span", eD, a(d(L.value.salesperson_achievement.total_achieved)), 1)
                ]),
                t("div", aD, [
                  s[822] || (s[822] = t("span", { class: "bucket-label" }, "Sales with No Salesperson", -1)),
                  t("span", oD, a(d(L.value.salesperson_achievement.unassigned_sales)), 1)
                ])
              ]),
              L.value.salesperson_achievement.rows.length ? (l(), o("table", lD, [
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
                    t("td", nD, a(e.invoice_count), 1),
                    t("td", iD, a(d(e.total_amount)), 1),
                    t("td", dD, [
                      Et(t("input", {
                        type: "number",
                        "onUpdate:modelValue": (g) => Ws.value[e.sales_person] = g,
                        class: "dr-input",
                        style: { width: "110px", "text-align": "right" },
                        min: "0"
                      }, null, 8, rD), [
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
              ])) : (l(), o("div", uD, "No sales attributed to a salesperson in this period."))
            ], 64)) : Vt.value === "salesperson_collection" ? (l(), o(u, { key: 3 }, [
              t("div", cD, [
                t("div", mD, [
                  s[825] || (s[825] = t("span", { class: "bucket-label" }, "Total Collected", -1)),
                  t("span", vD, a(d(L.value.salesperson_collection.total_collected)), 1)
                ])
              ]),
              L.value.salesperson_collection.rows.length ? (l(), o("table", _D, [
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
                    t("td", pD, a(e.payment_count), 1),
                    t("td", yD, a(d(e.collected_amount)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", hD, "No collections attributed to a salesperson in this period."))
            ], 64)) : Vt.value === "production_productivity" ? (l(), o(u, { key: 4 }, [
              t("div", bD, [
                t("div", gD, [
                  s[827] || (s[827] = t("span", { class: "bucket-label" }, "Team Avg Qty/Hour", -1)),
                  t("span", kD, a(L.value.production_productivity.team_avg_qty_per_hour), 1)
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
                    t("td", wD, a(e.job_card_count), 1),
                    t("td", xD, a(e.total_hours), 1),
                    t("td", CD, a(e.qty_produced), 1),
                    t("td", SD, a(e.avg_time_per_unit_mins ?? "—"), 1),
                    t("td", jD, a(e.qty_per_hour ?? "—"), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", MD, "No Job Card time logs in this period."))
            ], 64)) : Vt.value === "overtime" ? (l(), o(u, { key: 5 }, [
              s[830] || (s[830] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged time beyond 8 hours (480 min) in a day, from Job Card time logs. No shift doctype exists to read an actual shift length from. ", -1)),
              L.value.overtime.summary.length ? (l(), o("table", DD, [
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
                    t("td", TD, a(e.overtime_days), 1),
                    t("td", RD, a(e.overtime_hours), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", OD, "No overtime in this period."))
            ], 64)) : Vt.value === "labour_cost" ? (l(), o(u, { key: 6 }, [
              s[834] || (s[834] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Proxy: logged hours × the Workstation's hour rate on each Job Card — there's no per-employee wage field in this app, so this is a cost-of-time figure, not real payroll cost. ", -1)),
              t("div", PD, [
                t("div", ID, [
                  s[831] || (s[831] = t("span", { class: "bucket-label" }, "Total Labour Cost", -1)),
                  t("span", VD, a(d(L.value.labour_cost.total)), 1)
                ])
              ]),
              s[835] || (s[835] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Employee", -1)),
              L.value.labour_cost.by_employee.length ? (l(), o("table", ND, [
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
                    t("td", ED, a(e.total_hours), 1),
                    t("td", BD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              s[836] || (s[836] = t("div", { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "8px" } }, "By Operation", -1)),
              L.value.labour_cost.by_operation.length ? (l(), o("table", qD, [
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
                    t("td", AD, a(e.employee_count), 1),
                    t("td", $D, a(e.total_hours), 1),
                    t("td", LD, a(d(e.total_cost)), 1)
                  ]))), 128))
                ])
              ])) : (l(), o("div", QD, "No Job Card time logs in this period."))
            ], 64)) : Vt.value === "employee_performance" ? (l(), o(u, { key: 7 }, [
              s[838] || (s[838] = t("div", { style: { "font-size": "11.5px", color: "#94a3b8", "margin-bottom": "12px" } }, " Composite score = average of attendance %, output rate vs the team average (capped at 150%), and (100 − rejection %) — whichever of these apply to the employee. ", -1)),
              L.value.employee_performance.rows.length ? (l(), o("table", FD, [
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
                    t("td", HD, a(e.total_hours), 1),
                    t("td", zD, a(e.qty_produced), 1),
                    t("td", WD, a(e.qty_per_hour ?? "—"), 1),
                    t("td", {
                      class: c(["ta-r mono-sm", e.rejection_pct > 0 ? "red" : ""])
                    }, a(e.rejection_pct != null ? e.rejection_pct + "%" : "—"), 3),
                    t("td", UD, a(e.attendance_pct != null ? e.attendance_pct + "%" : "—"), 1),
                    t("td", KD, a(e.overtime_hours), 1),
                    t("td", {
                      class: c(["ta-r mono-sm fw-600", e.performance_score != null && e.performance_score < 70 ? "red" : "green"])
                    }, a(e.performance_score ?? "—"), 3)
                  ]))), 128))
                ])
              ])) : (l(), o("div", GD, "No Job Card time logs in this period."))
            ], 64)) : h("", !0)
          ], 64)) : (l(), o("div", YD, a(Co.value ? "No data for this period." : "Run the report to see results."), 1))
        ])) : h("", !0)
      ]);
    };
  }
}, tT = /* @__PURE__ */ jn(JD, [["__scopeId", "data-v-dc85887f"]]);
export {
  tT as default
};
