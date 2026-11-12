import { o as L, m as U, aa as x, h as f } from "./main-BOYBNf1s.js";
function M({ onScan: s, minLength: E = 3, maxKeystrokeGapMs: B = 40 } = {}) {
  let n = "", m = 0, o = null;
  function d() {
    n = "", o && (clearTimeout(o), o = null);
  }
  function w(e) {
    var k, C;
    const t = (((k = e.target) == null ? void 0 : k.tagName) || "").toLowerCase(), y = t === "input" || t === "textarea" || t === "select" || ((C = e.target) == null ? void 0 : C.isContentEditable), b = Date.now(), T = b - m;
    if (m = b, e.key === "Enter") {
      if (n.length >= E) {
        const D = n;
        d(), s && s(D), y && e.preventDefault();
      }
      return;
    }
    e.key.length === 1 && (y && n === "" && T > B || (T > 300 && (n = ""), n += e.key, o && clearTimeout(o), o = setTimeout(d, 300)));
  }
  L(() => window.addEventListener("keydown", w, !0)), U(() => {
    window.removeEventListener("keydown", w, !0), d(), g();
  });
  const v = typeof window < "u" && "BarcodeDetector" in window, r = f(!1), c = f(""), i = f(null);
  let a = null, l = null, u = null;
  async function _() {
    var e;
    if (c.value = "", !v) {
      c.value = "This browser doesn't support camera barcode scanning. Use a USB/Bluetooth barcode scanner instead — just scan while the item field is focused.", r.value = !0;
      return;
    }
    try {
      if (a = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }), r.value = !0, await x(), i.value)
        i.value.srcObject = a, await i.value.play();
      else {
        a.getTracks().forEach((t) => t.stop()), a = null, c.value = "Couldn't initialize the camera preview. Please try again.";
        return;
      }
      u = new window.BarcodeDetector({
        formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"]
      }), p();
    } catch (t) {
      c.value = (e = t == null ? void 0 : t.message) != null && e.includes("Permission") ? "Camera permission denied. Allow camera access to scan, or use a USB barcode scanner." : "Couldn't access the camera: " + ((t == null ? void 0 : t.message) || t), r.value = !0;
    }
  }
  async function p() {
    if (!(!r.value || !i.value || !u)) {
      try {
        const e = await u.detect(i.value);
        if (e && e.length) {
          const t = e[0].rawValue;
          s && s(t), h();
          return;
        }
      } catch {
      }
      l = requestAnimationFrame(p);
    }
  }
  function g() {
    l && cancelAnimationFrame(l), l = null, a && (a.getTracks().forEach((e) => e.stop()), a = null), u = null;
  }
  function h() {
    r.value = !1, g();
  }
  return { cameraSupported: v, cameraOpen: r, cameraError: c, videoRef: i, openCamera: _, closeCamera: h };
}
export {
  M as u
};
