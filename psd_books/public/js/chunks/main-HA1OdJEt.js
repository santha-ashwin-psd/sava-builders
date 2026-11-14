/**
* @vue/shared v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Uo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Ie = {}, Mn = [], Dt = () => {
}, Ka = () => !1, Hs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Vs = (e) => e.startsWith("onUpdate:"), Ge = Object.assign, Ko = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Bl = Object.prototype.hasOwnProperty, Pe = (e, t) => Bl.call(e, t), le = Array.isArray, On = (e) => vs(e) === "[object Map]", zn = (e) => vs(e) === "[object Set]", gi = (e) => vs(e) === "[object Date]", me = (e) => typeof e == "function", Le = (e) => typeof e == "string", $t = (e) => typeof e == "symbol", Re = (e) => e !== null && typeof e == "object", Ga = (e) => (Re(e) || me(e)) && me(e.then) && me(e.catch), Wa = Object.prototype.toString, vs = (e) => Wa.call(e), jl = (e) => vs(e).slice(8, -1), Ya = (e) => vs(e) === "[object Object]", Go = (e) => Le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ts = /* @__PURE__ */ Uo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), zs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Hl = /-\w/g, lt = zs(
  (e) => e.replace(Hl, (t) => t.slice(1).toUpperCase())
), Vl = /\B([A-Z])/g, hn = zs(
  (e) => e.replace(Vl, "-$1").toLowerCase()
), Fs = zs((e) => e.charAt(0).toUpperCase() + e.slice(1)), oo = zs(
  (e) => e ? `on${Fs(e)}` : ""
), Ot = (e, t) => !Object.is(e, t), Es = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ja = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Us = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, zl = (e) => {
  const t = Le(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let vi;
const Ks = () => vi || (vi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function _t(e) {
  if (le(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = Le(s) ? Gl(s) : _t(s);
      if (o)
        for (const a in o)
          t[a] = o[a];
    }
    return t;
  } else if (Le(e) || Re(e))
    return e;
}
const Fl = /;(?![^(]*\))/g, Ul = /:([^]+)/, Kl = /\/\*[^]*?\*\//g;
function Gl(e) {
  const t = {};
  return e.replace(Kl, "").split(Fl).forEach((n) => {
    if (n) {
      const s = n.split(Ul);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function De(e) {
  let t = "";
  if (Le(e))
    t = e;
  else if (le(e))
    for (let n = 0; n < e.length; n++) {
      const s = De(e[n]);
      s && (t += s + " ");
    }
  else if (Re(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Wl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yl = /* @__PURE__ */ Uo(Wl);
function Qa(e) {
  return !!e || e === "";
}
function Jl(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = pn(e[s], t[s]);
  return n;
}
function pn(e, t) {
  if (e === t) return !0;
  let n = gi(e), s = gi(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = $t(e), s = $t(t), n || s)
    return e === t;
  if (n = le(e), s = le(t), n || s)
    return n && s ? Jl(e, t) : !1;
  if (n = Re(e), s = Re(t), n || s) {
    if (!n || !s)
      return !1;
    const o = Object.keys(e).length, a = Object.keys(t).length;
    if (o !== a)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), d = t.hasOwnProperty(i);
      if (l && !d || !l && d || !pn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Wo(e, t) {
  return e.findIndex((n) => pn(n, t));
}
const Za = (e) => !!(e && e.__v_isRef === !0), T = (e) => Le(e) ? e : e == null ? "" : le(e) || Re(e) && (e.toString === Wa || !me(e.toString)) ? Za(e) ? T(e.value) : JSON.stringify(e, Xa, 2) : String(e), Xa = (e, t) => Za(t) ? Xa(e, t.value) : On(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], a) => (n[io(s, a) + " =>"] = o, n),
    {}
  )
} : zn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => io(n))
} : $t(t) ? io(t) : Re(t) && !le(t) && !Ya(t) ? String(t) : t, io = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    $t(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Qe;
class Ql {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Qe, !t && Qe && (this.index = (Qe.scopes || (Qe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Qe;
      try {
        return Qe = this, t();
      } finally {
        Qe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Qe, Qe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Qe === this)
        Qe = this.prevScope;
      else {
        let t = Qe;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Zl() {
  return Qe;
}
let Me;
const ao = /* @__PURE__ */ new WeakSet();
class er {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Qe && Qe.active && Qe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ao.has(this) && (ao.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || nr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, yi(this), sr(this);
    const t = Me, n = wt;
    Me = this, wt = !0;
    try {
      return this.fn();
    } finally {
      or(this), Me = t, wt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qo(t);
      this.deps = this.depsTail = void 0, yi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ao.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Co(this) && this.run();
  }
  get dirty() {
    return Co(this);
  }
}
let tr = 0, ns, ss;
function nr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ss, ss = e;
    return;
  }
  e.next = ns, ns = e;
}
function Yo() {
  tr++;
}
function Jo() {
  if (--tr > 0)
    return;
  if (ss) {
    let t = ss;
    for (ss = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ns; ) {
    let t = ns;
    for (ns = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function sr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function or(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), Qo(s), Xl(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function Co(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ir(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ir(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ls) || (e.globalVersion = ls, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Co(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Me, s = wt;
  Me = e, wt = !0;
  try {
    sr(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ot(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Me = n, wt = s, or(e), e.flags &= -3;
  }
}
function Qo(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let a = n.computed.deps; a; a = a.nextDep)
      Qo(a, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Xl(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let wt = !0;
const ar = [];
function Qt() {
  ar.push(wt), wt = !1;
}
function Zt() {
  const e = ar.pop();
  wt = e === void 0 ? !0 : e;
}
function yi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Me;
    Me = void 0;
    try {
      t();
    } finally {
      Me = n;
    }
  }
}
let ls = 0;
class ec {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Zo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Me || !wt || Me === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Me)
      n = this.activeLink = new ec(Me, this), Me.deps ? (n.prevDep = Me.depsTail, Me.depsTail.nextDep = n, Me.depsTail = n) : Me.deps = Me.depsTail = n, rr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Me.depsTail, n.nextDep = void 0, Me.depsTail.nextDep = n, Me.depsTail = n, Me.deps === n && (Me.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, ls++, this.notify(t);
  }
  notify(t) {
    Yo();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Jo();
    }
  }
}
function rr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        rr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ao = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ Symbol(
  ""
), Eo = /* @__PURE__ */ Symbol(
  ""
), cs = /* @__PURE__ */ Symbol(
  ""
);
function Ze(e, t, n) {
  if (wt && Me) {
    let s = Ao.get(e);
    s || Ao.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new Zo()), o.map = s, o.key = n), o.track();
  }
}
function Ut(e, t, n, s, o, a) {
  const i = Ao.get(e);
  if (!i) {
    ls++;
    return;
  }
  const l = (d) => {
    d && d.trigger();
  };
  if (Yo(), t === "clear")
    i.forEach(l);
  else {
    const d = le(e), u = d && Go(n);
    if (d && n === "length") {
      const c = Number(s);
      i.forEach((p, m) => {
        (m === "length" || m === cs || !$t(m) && m >= c) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(cs)), t) {
        case "add":
          d ? u && l(i.get("length")) : (l(i.get(An)), On(e) && l(i.get(Eo)));
          break;
        case "delete":
          d || (l(i.get(An)), On(e) && l(i.get(Eo)));
          break;
        case "set":
          On(e) && l(i.get(An));
          break;
      }
  }
  Jo();
}
function Nn(e) {
  const t = /* @__PURE__ */ Ne(e);
  return t === e ? t : (Ze(t, "iterate", cs), /* @__PURE__ */ yt(e) ? t : t.map(St));
}
function Gs(e) {
  return Ze(e = /* @__PURE__ */ Ne(e), "iterate", cs), e;
}
function It(e, t) {
  return /* @__PURE__ */ Xt(e) ? Bn(/* @__PURE__ */ En(e) ? St(t) : t) : St(t);
}
const tc = {
  __proto__: null,
  [Symbol.iterator]() {
    return ro(this, Symbol.iterator, (e) => It(this, e));
  },
  concat(...e) {
    return Nn(this).concat(
      ...e.map((t) => le(t) ? Nn(t) : t)
    );
  },
  entries() {
    return ro(this, "entries", (e) => (e[1] = It(this, e[1]), e));
  },
  every(e, t) {
    return jt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return jt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => It(this, s)),
      arguments
    );
  },
  find(e, t) {
    return jt(
      this,
      "find",
      e,
      t,
      (n) => It(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return jt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return jt(
      this,
      "findLast",
      e,
      t,
      (n) => It(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return jt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return jt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return lo(this, "includes", e);
  },
  indexOf(...e) {
    return lo(this, "indexOf", e);
  },
  join(e) {
    return Nn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return lo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return jt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Un(this, "pop");
  },
  push(...e) {
    return Un(this, "push", e);
  },
  reduce(e, ...t) {
    return bi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return bi(this, "reduceRight", e, t);
  },
  shift() {
    return Un(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return jt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Un(this, "splice", e);
  },
  toReversed() {
    return Nn(this).toReversed();
  },
  toSorted(e) {
    return Nn(this).toSorted(e);
  },
  toSpliced(...e) {
    return Nn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Un(this, "unshift", e);
  },
  values() {
    return ro(this, "values", (e) => It(this, e));
  }
};
function ro(e, t, n) {
  const s = Gs(e), o = s[t]();
  return s !== e && !/* @__PURE__ */ yt(e) && (o._next = o.next, o.next = () => {
    const a = o._next();
    return a.done || (a.value = n(a.value)), a;
  }), o;
}
const nc = Array.prototype;
function jt(e, t, n, s, o, a) {
  const i = Gs(e), l = i !== e && !/* @__PURE__ */ yt(e), d = i[t];
  if (d !== nc[t]) {
    const p = d.apply(e, a);
    return l ? St(p) : p;
  }
  let u = n;
  i !== e && (l ? u = function(p, m) {
    return n.call(this, It(e, p), m, e);
  } : n.length > 2 && (u = function(p, m) {
    return n.call(this, p, m, e);
  }));
  const c = d.call(i, u, s);
  return l && o ? o(c) : c;
}
function bi(e, t, n, s) {
  const o = Gs(e), a = o !== e && !/* @__PURE__ */ yt(e);
  let i = n, l = !1;
  o !== e && (a ? (l = s.length === 0, i = function(u, c, p) {
    return l && (l = !1, u = It(e, u)), n.call(this, u, It(e, c), p, e);
  }) : n.length > 3 && (i = function(u, c, p) {
    return n.call(this, u, c, p, e);
  }));
  const d = o[t](i, ...s);
  return l ? It(e, d) : d;
}
function lo(e, t, n) {
  const s = /* @__PURE__ */ Ne(e);
  Ze(s, "iterate", cs);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ ti(n[0]) ? (n[0] = /* @__PURE__ */ Ne(n[0]), s[t](...n)) : o;
}
function Un(e, t, n = []) {
  Qt(), Yo();
  const s = (/* @__PURE__ */ Ne(e))[t].apply(e, n);
  return Jo(), Zt(), s;
}
const sc = /* @__PURE__ */ Uo("__proto__,__v_isRef,__isVue"), lr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter($t)
);
function oc(e) {
  $t(e) || (e = String(e));
  const t = /* @__PURE__ */ Ne(this);
  return Ze(t, "has", e), t.hasOwnProperty(e);
}
class cr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, a = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return a;
    if (n === "__v_raw")
      return s === (o ? a ? mc : fr : a ? pr : ur).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = le(t);
    if (!o) {
      let d;
      if (i && (d = tc[n]))
        return d;
      if (n === "hasOwnProperty")
        return oc;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ nt(t) ? t : s
    );
    if (($t(n) ? lr.has(n) : sc(n)) || (o || Ze(t, "get", n), a))
      return l;
    if (/* @__PURE__ */ nt(l)) {
      const d = i && Go(n) ? l : l.value;
      return o && Re(d) ? /* @__PURE__ */ To(d) : d;
    }
    return Re(l) ? o ? /* @__PURE__ */ To(l) : /* @__PURE__ */ ze(l) : l;
  }
}
class dr extends cr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let a = t[n];
    const i = le(t) && Go(n);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Xt(a);
      if (!/* @__PURE__ */ yt(s) && !/* @__PURE__ */ Xt(s) && (a = /* @__PURE__ */ Ne(a), s = /* @__PURE__ */ Ne(s)), !i && /* @__PURE__ */ nt(a) && !/* @__PURE__ */ nt(s))
        return u || (a.value = s), !0;
    }
    const l = i ? Number(n) < t.length : Pe(t, n), d = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ nt(t) ? t : o
    );
    return t === /* @__PURE__ */ Ne(o) && (l ? Ot(s, a) && Ut(t, "set", n, s) : Ut(t, "add", n, s)), d;
  }
  deleteProperty(t, n) {
    const s = Pe(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && s && Ut(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!$t(n) || !lr.has(n)) && Ze(t, "has", n), s;
  }
  ownKeys(t) {
    return Ze(
      t,
      "iterate",
      le(t) ? "length" : An
    ), Reflect.ownKeys(t);
  }
}
class ic extends cr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ac = /* @__PURE__ */ new dr(), rc = /* @__PURE__ */ new ic(), lc = /* @__PURE__ */ new dr(!0);
const No = (e) => e, _s = (e) => Reflect.getPrototypeOf(e);
function cc(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, a = /* @__PURE__ */ Ne(o), i = On(a), l = e === "entries" || e === Symbol.iterator && i, d = e === "keys" && i, u = o[e](...s), c = n ? No : t ? Bn : St;
    return !t && Ze(
      a,
      "iterate",
      d ? Eo : An
    ), Ge(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: p, done: m } = u.next();
          return m ? { value: p, done: m } : {
            value: l ? [c(p[0]), c(p[1])] : c(p),
            done: m
          };
        }
      }
    );
  };
}
function ws(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function dc(e, t) {
  const n = {
    get(o) {
      const a = this.__v_raw, i = /* @__PURE__ */ Ne(a), l = /* @__PURE__ */ Ne(o);
      e || (Ot(o, l) && Ze(i, "get", o), Ze(i, "get", l));
      const { has: d } = _s(i), u = t ? No : e ? Bn : St;
      if (d.call(i, o))
        return u(a.get(o));
      if (d.call(i, l))
        return u(a.get(l));
      a !== i && a.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ze(/* @__PURE__ */ Ne(o), "iterate", An), o.size;
    },
    has(o) {
      const a = this.__v_raw, i = /* @__PURE__ */ Ne(a), l = /* @__PURE__ */ Ne(o);
      return e || (Ot(o, l) && Ze(i, "has", o), Ze(i, "has", l)), o === l ? a.has(o) : a.has(o) || a.has(l);
    },
    forEach(o, a) {
      const i = this, l = i.__v_raw, d = /* @__PURE__ */ Ne(l), u = t ? No : e ? Bn : St;
      return !e && Ze(d, "iterate", An), l.forEach((c, p) => o.call(a, u(c), u(p), i));
    }
  };
  return Ge(
    n,
    e ? {
      add: ws("add"),
      set: ws("set"),
      delete: ws("delete"),
      clear: ws("clear")
    } : {
      add(o) {
        const a = /* @__PURE__ */ Ne(this), i = _s(a), l = /* @__PURE__ */ Ne(o), d = !t && !/* @__PURE__ */ yt(o) && !/* @__PURE__ */ Xt(o) ? l : o;
        return i.has.call(a, d) || Ot(o, d) && i.has.call(a, o) || Ot(l, d) && i.has.call(a, l) || (a.add(d), Ut(a, "add", d, d)), this;
      },
      set(o, a) {
        !t && !/* @__PURE__ */ yt(a) && !/* @__PURE__ */ Xt(a) && (a = /* @__PURE__ */ Ne(a));
        const i = /* @__PURE__ */ Ne(this), { has: l, get: d } = _s(i);
        let u = l.call(i, o);
        u || (o = /* @__PURE__ */ Ne(o), u = l.call(i, o));
        const c = d.call(i, o);
        return i.set(o, a), u ? Ot(a, c) && Ut(i, "set", o, a) : Ut(i, "add", o, a), this;
      },
      delete(o) {
        const a = /* @__PURE__ */ Ne(this), { has: i, get: l } = _s(a);
        let d = i.call(a, o);
        d || (o = /* @__PURE__ */ Ne(o), d = i.call(a, o)), l && l.call(a, o);
        const u = a.delete(o);
        return d && Ut(a, "delete", o, void 0), u;
      },
      clear() {
        const o = /* @__PURE__ */ Ne(this), a = o.size !== 0, i = o.clear();
        return a && Ut(
          o,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = cc(o, e, t);
  }), n;
}
function Xo(e, t) {
  const n = dc(e, t);
  return (s, o, a) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    Pe(n, o) && o in s ? n : s,
    o,
    a
  );
}
const uc = {
  get: /* @__PURE__ */ Xo(!1, !1)
}, pc = {
  get: /* @__PURE__ */ Xo(!1, !0)
}, fc = {
  get: /* @__PURE__ */ Xo(!0, !1)
};
const ur = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap(), mc = /* @__PURE__ */ new WeakMap();
function hc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function gc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : hc(jl(e));
}
// @__NO_SIDE_EFFECTS__
function ze(e) {
  return /* @__PURE__ */ Xt(e) ? e : ei(
    e,
    !1,
    ac,
    uc,
    ur
  );
}
// @__NO_SIDE_EFFECTS__
function mr(e) {
  return ei(
    e,
    !1,
    lc,
    pc,
    pr
  );
}
// @__NO_SIDE_EFFECTS__
function To(e) {
  return ei(
    e,
    !0,
    rc,
    fc,
    fr
  );
}
function ei(e, t, n, s, o) {
  if (!Re(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = gc(e);
  if (a === 0)
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    a === 2 ? s : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function En(e) {
  return /* @__PURE__ */ Xt(e) ? /* @__PURE__ */ En(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ti(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Ne(t) : e;
}
function vc(e) {
  return !Pe(e, "__v_skip") && Object.isExtensible(e) && Ja(e, "__v_skip", !0), e;
}
const St = (e) => Re(e) ? /* @__PURE__ */ ze(e) : e, Bn = (e) => Re(e) ? /* @__PURE__ */ To(e) : e;
// @__NO_SIDE_EFFECTS__
function nt(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function pe(e) {
  return hr(e, !1);
}
// @__NO_SIDE_EFFECTS__
function yc(e) {
  return hr(e, !0);
}
function hr(e, t) {
  return /* @__PURE__ */ nt(e) ? e : new bc(e, t);
}
class bc {
  constructor(t, n) {
    this.dep = new Zo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Ne(t), this._value = n ? t : St(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ yt(t) || /* @__PURE__ */ Xt(t);
    t = s ? t : /* @__PURE__ */ Ne(t), Ot(t, n) && (this._rawValue = t, this._value = s ? t : St(t), this.dep.trigger());
  }
}
function C(e) {
  return /* @__PURE__ */ nt(e) ? e.value : e;
}
const xc = {
  get: (e, t, n) => t === "__v_raw" ? e : C(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ nt(o) && !/* @__PURE__ */ nt(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function gr(e) {
  return /* @__PURE__ */ En(e) ? e : new Proxy(e, xc);
}
class _c {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Zo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ls - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Me !== this)
      return nr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ir(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function wc(e, t, n = !1) {
  let s, o;
  return me(e) ? s = e : (s = e.get, o = e.set), new _c(s, o, n);
}
const ks = {}, Rs = /* @__PURE__ */ new WeakMap();
let wn;
function kc(e, t = !1, n = wn) {
  if (n) {
    let s = Rs.get(n);
    s || Rs.set(n, s = []), s.push(e);
  }
}
function $c(e, t, n = Ie) {
  const { immediate: s, deep: o, once: a, scheduler: i, augmentJob: l, call: d } = n, u = (L) => o ? L : /* @__PURE__ */ yt(L) || o === !1 || o === 0 ? Kt(L, 1) : Kt(L);
  let c, p, m, g, _ = !1, $ = !1;
  if (/* @__PURE__ */ nt(e) ? (p = () => e.value, _ = /* @__PURE__ */ yt(e)) : /* @__PURE__ */ En(e) ? (p = () => u(e), _ = !0) : le(e) ? ($ = !0, _ = e.some((L) => /* @__PURE__ */ En(L) || /* @__PURE__ */ yt(L)), p = () => e.map((L) => {
    if (/* @__PURE__ */ nt(L))
      return L.value;
    if (/* @__PURE__ */ En(L))
      return u(L);
    if (me(L))
      return d ? d(L, 2) : L();
  })) : me(e) ? t ? p = d ? () => d(e, 2) : e : p = () => {
    if (m) {
      Qt();
      try {
        m();
      } finally {
        Zt();
      }
    }
    const L = wn;
    wn = c;
    try {
      return d ? d(e, 3, [g]) : e(g);
    } finally {
      wn = L;
    }
  } : p = Dt, t && o) {
    const L = p, b = o === !0 ? 1 / 0 : o;
    p = () => Kt(L(), b);
  }
  const I = Zl(), f = () => {
    c.stop(), I && I.active && Ko(I.effects, c);
  };
  if (a && t) {
    const L = t;
    t = (...b) => {
      L(...b), f();
    };
  }
  let h = $ ? new Array(e.length).fill(ks) : ks;
  const O = (L) => {
    if (!(!(c.flags & 1) || !c.dirty && !L))
      if (t) {
        const b = c.run();
        if (o || _ || ($ ? b.some((R, A) => Ot(R, h[A])) : Ot(b, h))) {
          m && m();
          const R = wn;
          wn = c;
          try {
            const A = [
              b,
              // pass undefined as the old value when it's changed for the first time
              h === ks ? void 0 : $ && h[0] === ks ? [] : h,
              g
            ];
            h = b, d ? d(t, 3, A) : (
              // @ts-expect-error
              t(...A)
            );
          } finally {
            wn = R;
          }
        }
      } else
        c.run();
  };
  return l && l(O), c = new er(p), c.scheduler = i ? () => i(O, !1) : O, g = (L) => kc(L, !1, c), m = c.onStop = () => {
    const L = Rs.get(c);
    if (L) {
      if (d)
        d(L, 4);
      else
        for (const b of L) b();
      Rs.delete(c);
    }
  }, t ? s ? O(!0) : h = c.run() : i ? i(O.bind(null, !0), !0) : c.run(), f.pause = c.pause.bind(c), f.resume = c.resume.bind(c), f.stop = f, f;
}
function Kt(e, t = 1 / 0, n) {
  if (t <= 0 || !Re(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ nt(e))
    Kt(e.value, t, n);
  else if (le(e))
    for (let s = 0; s < e.length; s++)
      Kt(e[s], t, n);
  else if (zn(e) || On(e))
    e.forEach((s) => {
      Kt(s, t, n);
    });
  else if (Ya(e)) {
    for (const s in e)
      Kt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Kt(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ys(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (o) {
    Ws(o, t, n);
  }
}
function Ct(e, t, n, s) {
  if (me(e)) {
    const o = ys(e, t, n, s);
    return o && Ga(o) && o.catch((a) => {
      Ws(a, t, n);
    }), o;
  }
  if (le(e)) {
    const o = [];
    for (let a = 0; a < e.length; a++)
      o.push(Ct(e[a], t, n, s));
    return o;
  }
}
function Ws(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Ie;
  if (t) {
    let l = t.parent;
    const d = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](e, d, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (a) {
      Qt(), ys(a, null, 10, [
        e,
        d,
        u
      ]), Zt();
      return;
    }
  }
  Sc(e, n, o, s, i);
}
function Sc(e, t, n, s = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const rt = [];
let Pt = -1;
const Dn = [];
let dn = null, Rn = 0;
const vr = /* @__PURE__ */ Promise.resolve();
let Is = null;
function Yt(e) {
  const t = Is || vr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Cc(e) {
  let t = Pt + 1, n = rt.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = rt[s], a = ds(o);
    a < e || a === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ni(e) {
  if (!(e.flags & 1)) {
    const t = ds(e), n = rt[rt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ds(n) ? rt.push(e) : rt.splice(Cc(t), 0, e), e.flags |= 1, yr();
  }
}
function yr() {
  Is || (Is = vr.then(xr));
}
function Ac(e) {
  le(e) ? Dn.push(...e) : dn && e.id === -1 ? dn.splice(Rn + 1, 0, e) : e.flags & 1 || (Dn.push(e), e.flags |= 1), yr();
}
function xi(e, t, n = Pt + 1) {
  for (; n < rt.length; n++) {
    const s = rt[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      rt.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function br(e) {
  if (Dn.length) {
    const t = [...new Set(Dn)].sort(
      (n, s) => ds(n) - ds(s)
    );
    if (Dn.length = 0, dn) {
      dn.push(...t);
      return;
    }
    for (dn = t, Rn = 0; Rn < dn.length; Rn++) {
      const n = dn[Rn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    dn = null, Rn = 0;
  }
}
const ds = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function xr(e) {
  try {
    for (Pt = 0; Pt < rt.length; Pt++) {
      const t = rt[Pt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ys(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Pt < rt.length; Pt++) {
      const t = rt[Pt];
      t && (t.flags &= -2);
    }
    Pt = -1, rt.length = 0, br(), Is = null, (rt.length || Dn.length) && xr();
  }
}
let Ye = null, _r = null;
function Ms(e) {
  const t = Ye;
  return Ye = e, _r = e && e.type.__scopeId || null, t;
}
function Sn(e, t = Ye, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && Ls(-1);
    const a = Ms(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Ms(a), s._d && Ls(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function oe(e, t) {
  if (Ye === null)
    return e;
  const n = Xs(Ye), s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [a, i, l, d = Ie] = t[o];
    a && (me(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && Kt(i), s.push({
      dir: a,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: d
    }));
  }
  return e;
}
function yn(e, t, n, s) {
  const o = e.dirs, a = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    a && (l.oldValue = a[i].value);
    let d = l.dir[s];
    d && (Qt(), Ct(d, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Zt());
  }
}
function Ns(e, t) {
  if (et) {
    let n = et.provides;
    const s = et.parent && et.parent.provides;
    s === n && (n = et.provides = Object.create(s)), n[e] = t;
  }
}
function kt(e, t, n = !1) {
  const s = nl();
  if (s || qn) {
    let o = qn ? qn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && me(t) ? t.call(s && s.proxy) : t;
  }
}
const Ec = /* @__PURE__ */ Symbol.for("v-scx"), Nc = () => kt(Ec);
function ct(e, t, n) {
  return wr(e, t, n);
}
function wr(e, t, n = Ie) {
  const { immediate: s, deep: o, flush: a, once: i } = n, l = Ge({}, n), d = t && s || !t && a !== "post";
  let u;
  if (ms) {
    if (a === "sync") {
      const g = Nc();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!d) {
      const g = () => {
      };
      return g.stop = Dt, g.resume = Dt, g.pause = Dt, g;
    }
  }
  const c = et;
  l.call = (g, _, $) => Ct(g, c, _, $);
  let p = !1;
  a === "post" ? l.scheduler = (g) => {
    it(g, c && c.suspense);
  } : a !== "sync" && (p = !0, l.scheduler = (g, _) => {
    _ ? g() : ni(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), p && (g.flags |= 2, c && (g.id = c.uid, g.i = c));
  };
  const m = $c(e, t, l);
  return ms && (u ? u.push(m) : d && m()), m;
}
function Tc(e, t, n) {
  const s = this.proxy, o = Le(e) ? e.includes(".") ? kr(s, e) : () => s[e] : e.bind(s, s);
  let a;
  me(t) ? a = t : (a = t.handler, n = t);
  const i = bs(this), l = wr(o, a.bind(s), n);
  return i(), l;
}
function kr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const cn = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ Symbol("_vte"), Sr = (e) => e.__isTeleport, kn = (e) => e && (e.disabled || e.disabled === ""), Pc = (e) => e && (e.defer || e.defer === ""), _i = (e) => typeof SVGElement < "u" && e instanceof SVGElement, wi = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Po = (e, t) => {
  const n = e && e.to;
  return Le(n) ? t ? t(n) : null : n;
}, Rc = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, o, a, i, l, d, u) {
    const {
      mc: c,
      pc: p,
      pbc: m,
      o: { insert: g, querySelector: _, createText: $, createComment: I, parentNode: f }
    } = u, h = kn(t.props);
    let { dynamicChildren: O } = t;
    const L = (A, D, N) => {
      A.shapeFlag & 16 && c(
        A.children,
        D,
        N,
        o,
        a,
        i,
        l,
        d
      );
    }, b = (A = t) => {
      const D = kn(A.props), N = A.target = Po(A.props, _), M = Ro(N, A, $, g);
      N && (i !== "svg" && _i(N) ? i = "svg" : i !== "mathml" && wi(N) && (i = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add(N), D || (L(A, N, M), Zn(A, !1)));
    }, R = (A) => {
      const D = () => {
        if (cn.get(A) === D) {
          if (cn.delete(A), kn(A.props)) {
            const N = f(A.el) || n;
            L(A, N, A.anchor), Zn(A, !0);
          }
          b(A);
        }
      };
      cn.set(A, D), it(D, a);
    };
    if (e == null) {
      const A = t.el = $(""), D = t.anchor = $("");
      if (g(A, n, s), g(D, n, s), Pc(t.props) || a && a.pendingBranch) {
        R(t);
        return;
      }
      h && (L(t, n, D), Zn(t, !0)), b();
    } else {
      t.el = e.el;
      const A = t.anchor = e.anchor, D = cn.get(e);
      if (D) {
        D.flags |= 8, cn.delete(e), R(t);
        return;
      }
      t.targetStart = e.targetStart;
      const N = t.target = e.target, M = t.targetAnchor = e.targetAnchor, H = kn(e.props), j = H ? n : N, te = H ? A : M;
      if (i === "svg" || _i(N) ? i = "svg" : (i === "mathml" || wi(N)) && (i = "mathml"), O ? (m(
        e.dynamicChildren,
        O,
        j,
        o,
        a,
        i,
        l
      ), ai(e, t, !0)) : d || p(
        e,
        t,
        j,
        te,
        o,
        a,
        i,
        l,
        !1
      ), h)
        H ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : $s(
          t,
          n,
          A,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const Z = t.target = Po(
          t.props,
          _
        );
        Z && $s(
          t,
          Z,
          null,
          u,
          0
        );
      } else H && $s(
        t,
        N,
        M,
        u,
        1
      );
      Zn(t, h);
    }
  },
  remove(e, t, n, { um: s, o: { remove: o } }, a) {
    const {
      shapeFlag: i,
      children: l,
      anchor: d,
      targetStart: u,
      targetAnchor: c,
      target: p,
      props: m
    } = e;
    let g = a || !kn(m);
    const _ = cn.get(e);
    if (_ && (_.flags |= 8, cn.delete(e), g = !1), p && (o(u), o(c)), a && o(d), i & 16)
      for (let $ = 0; $ < l.length; $++) {
        const I = l[$];
        s(
          I,
          t,
          n,
          g,
          !!I.dynamicChildren
        );
      }
  },
  move: $s,
  hydrate: Ic
};
function $s(e, t, n, { o: { insert: s }, m: o }, a = 2) {
  a === 0 && s(e.targetAnchor, t, n);
  const { el: i, anchor: l, shapeFlag: d, children: u, props: c } = e, p = a === 2;
  if (p && s(i, t, n), !cn.has(e) && (!p || kn(c)) && d & 16)
    for (let m = 0; m < u.length; m++)
      o(
        u[m],
        t,
        n,
        2
      );
  p && s(l, t, n);
}
function Ic(e, t, n, s, o, a, {
  o: { nextSibling: i, parentNode: l, querySelector: d, insert: u, createText: c }
}, p) {
  function m(I, f) {
    let h = f;
    for (; h; ) {
      if (h && h.nodeType === 8) {
        if (h.data === "teleport start anchor")
          t.targetStart = h;
        else if (h.data === "teleport anchor") {
          t.targetAnchor = h, I._lpa = t.targetAnchor && i(t.targetAnchor);
          break;
        }
      }
      h = i(h);
    }
  }
  function g(I, f) {
    f.anchor = p(
      i(I),
      f,
      l(I),
      n,
      s,
      o,
      a
    );
  }
  const _ = t.target = Po(
    t.props,
    d
  ), $ = kn(t.props);
  if (_) {
    const I = _._lpa || _.firstChild;
    t.shapeFlag & 16 && ($ ? (g(e, t), m(_, I), t.targetAnchor || Ro(
      _,
      t,
      c,
      u,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === _ ? e : null
    )) : (t.anchor = i(e), m(_, I), t.targetAnchor || Ro(_, t, c, u), p(
      I && i(I),
      t,
      _,
      n,
      s,
      o,
      a
    ))), Zn(t, $);
  } else $ && t.shapeFlag & 16 && (g(e, t), t.targetStart = e, t.targetAnchor = i(e));
  return t.anchor && i(t.anchor);
}
const Lt = Rc;
function Zn(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, o;
    for (t ? (s = e.el, o = e.anchor) : (s = e.targetStart, o = e.targetAnchor); s && s !== o; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function Ro(e, t, n, s, o = null) {
  const a = t.targetStart = n(""), i = t.targetAnchor = n("");
  return a[$r] = i, e && (s(a, e, o), s(i, e, o)), i;
}
const Rt = /* @__PURE__ */ Symbol("_leaveCb"), Kn = /* @__PURE__ */ Symbol("_enterCb");
function Mc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return gn(() => {
    e.isMounted = !0;
  }), Mr(() => {
    e.isUnmounting = !0;
  }), e;
}
const ht = [Function, Array], Cr = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: ht,
  onEnter: ht,
  onAfterEnter: ht,
  onEnterCancelled: ht,
  // leave
  onBeforeLeave: ht,
  onLeave: ht,
  onAfterLeave: ht,
  onLeaveCancelled: ht,
  // appear
  onBeforeAppear: ht,
  onAppear: ht,
  onAfterAppear: ht,
  onAppearCancelled: ht
}, Ar = (e) => {
  const t = e.subTree;
  return t.component ? Ar(t.component) : t;
}, Oc = {
  name: "BaseTransition",
  props: Cr,
  setup(e, { slots: t }) {
    const n = nl(), s = Mc();
    return () => {
      const o = t.default && Tr(t.default(), !0), a = o && o.length ? Er(o) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? G() : void 0
      );
      if (!a)
        return;
      const i = /* @__PURE__ */ Ne(e), { mode: l } = i;
      if (s.isLeaving)
        return co(a);
      const d = ki(a);
      if (!d)
        return co(a);
      let u = Io(
        d,
        i,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (p) => u = p
      );
      d.type !== Xe && us(d, u);
      let c = n.subTree && ki(n.subTree);
      if (c && c.type !== Xe && !$n(c, d) && Ar(n).type !== Xe) {
        let p = Io(
          c,
          i,
          s,
          n
        );
        if (us(c, p), l === "out-in" && d.type !== Xe)
          return s.isLeaving = !0, p.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete p.afterLeave, c = void 0;
          }, co(a);
        l === "in-out" && d.type !== Xe ? p.delayLeave = (m, g, _) => {
          const $ = Nr(
            s,
            c
          );
          $[String(c.key)] = c, m[Rt] = () => {
            g(), m[Rt] = void 0, delete u.delayedLeave, c = void 0;
          }, u.delayedLeave = () => {
            _(), delete u.delayedLeave, c = void 0;
          };
        } : c = void 0;
      } else c && (c = void 0);
      return a;
    };
  }
};
function Er(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Xe) {
        t = n;
        break;
      }
  }
  return t;
}
const Dc = Oc;
function Nr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function Io(e, t, n, s, o) {
  const {
    appear: a,
    mode: i,
    persisted: l = !1,
    onBeforeEnter: d,
    onEnter: u,
    onAfterEnter: c,
    onEnterCancelled: p,
    onBeforeLeave: m,
    onLeave: g,
    onAfterLeave: _,
    onLeaveCancelled: $,
    onBeforeAppear: I,
    onAppear: f,
    onAfterAppear: h,
    onAppearCancelled: O
  } = t, L = String(e.key), b = Nr(n, e), R = (N, M) => {
    N && Ct(
      N,
      s,
      9,
      M
    );
  }, A = (N, M) => {
    const H = M[1];
    R(N, M), le(N) ? N.every((j) => j.length <= 1) && H() : N.length <= 1 && H();
  }, D = {
    mode: i,
    persisted: l,
    beforeEnter(N) {
      let M = d;
      if (!n.isMounted)
        if (a)
          M = I || d;
        else
          return;
      N[Rt] && N[Rt](
        !0
        /* cancelled */
      );
      const H = b[L];
      H && $n(e, H) && H.el[Rt] && H.el[Rt](), R(M, [N]);
    },
    enter(N) {
      if (b[L] === e) return;
      let M = u, H = c, j = p;
      if (!n.isMounted)
        if (a)
          M = f || u, H = h || c, j = O || p;
        else
          return;
      let te = !1;
      N[Kn] = (fe) => {
        te || (te = !0, fe ? R(j, [N]) : R(H, [N]), D.delayedLeave && D.delayedLeave(), N[Kn] = void 0);
      };
      const Z = N[Kn].bind(null, !1);
      M ? A(M, [N, Z]) : Z();
    },
    leave(N, M) {
      const H = String(e.key);
      if (N[Kn] && N[Kn](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return M();
      R(m, [N]);
      let j = !1;
      N[Rt] = (Z) => {
        j || (j = !0, M(), Z ? R($, [N]) : R(_, [N]), N[Rt] = void 0, b[H] === e && delete b[H]);
      };
      const te = N[Rt].bind(null, !1);
      b[H] = e, g ? A(g, [N, te]) : te();
    },
    clone(N) {
      const M = Io(
        N,
        t,
        n,
        s,
        o
      );
      return o && o(M), M;
    }
  };
  return D;
}
function co(e) {
  if (Ys(e))
    return e = fn(e), e.children = null, e;
}
function ki(e) {
  if (!Ys(e))
    return Sr(e.type) && e.children ? Er(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && me(n.default))
      return n.default();
  }
}
function us(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, us(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Tr(e, t = !1, n) {
  let s = [], o = 0;
  for (let a = 0; a < e.length; a++) {
    let i = e[a];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : a);
    i.type === ee ? (i.patchFlag & 128 && o++, s = s.concat(
      Tr(i.children, t, l)
    )) : (t || i.type !== Xe) && s.push(l != null ? fn(i, { key: l }) : i);
  }
  if (o > 1)
    for (let a = 0; a < s.length; a++)
      s[a].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
  return me(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ge({ name: e.name }, t, { setup: e })
  ) : e;
}
function Rr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function $i(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Os = /* @__PURE__ */ new WeakMap();
function os(e, t, n, s, o = !1) {
  if (le(e)) {
    e.forEach(
      ($, I) => os(
        $,
        t && (le(t) ? t[I] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Ln(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && os(e, t, n, s.component.subTree);
    return;
  }
  const a = s.shapeFlag & 4 ? Xs(s.component) : s.el, i = o ? null : a, { i: l, r: d } = e, u = t && t.r, c = l.refs === Ie ? l.refs = {} : l.refs, p = l.setupState, m = /* @__PURE__ */ Ne(p), g = p === Ie ? Ka : ($) => $i(c, $) ? !1 : Pe(m, $), _ = ($, I) => !(I && $i(c, I));
  if (u != null && u !== d) {
    if (Si(t), Le(u))
      c[u] = null, g(u) && (p[u] = null);
    else if (/* @__PURE__ */ nt(u)) {
      const $ = t;
      _(u, $.k) && (u.value = null), $.k && (c[$.k] = null);
    }
  }
  if (me(d))
    ys(d, l, 12, [i, c]);
  else {
    const $ = Le(d), I = /* @__PURE__ */ nt(d);
    if ($ || I) {
      const f = () => {
        if (e.f) {
          const h = $ ? g(d) ? p[d] : c[d] : _() || !e.k ? d.value : c[e.k];
          if (o)
            le(h) && Ko(h, a);
          else if (le(h))
            h.includes(a) || h.push(a);
          else if ($)
            c[d] = [a], g(d) && (p[d] = c[d]);
          else {
            const O = [a];
            _(d, e.k) && (d.value = O), e.k && (c[e.k] = O);
          }
        } else $ ? (c[d] = i, g(d) && (p[d] = i)) : I && (_(d, e.k) && (d.value = i), e.k && (c[e.k] = i));
      };
      if (i) {
        const h = () => {
          f(), Os.delete(e);
        };
        h.id = -1, Os.set(e, h), it(h, n);
      } else
        Si(e), f();
    }
  }
}
function Si(e) {
  const t = Os.get(e);
  t && (t.flags |= 8, Os.delete(e));
}
Ks().requestIdleCallback;
Ks().cancelIdleCallback;
const Ln = (e) => !!e.type.__asyncLoader, Ys = (e) => e.type.__isKeepAlive;
function Lc(e, t) {
  Ir(e, "a", t);
}
function qc(e, t) {
  Ir(e, "da", t);
}
function Ir(e, t, n = et) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Js(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Ys(o.parent.vnode) && Bc(s, t, n, o), o = o.parent;
  }
}
function Bc(e, t, n, s) {
  const o = Js(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  si(() => {
    Ko(s[t], o);
  }, n);
}
function Js(e, t, n = et, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...i) => {
      Qt();
      const l = bs(n), d = Ct(t, n, e, i);
      return l(), Zt(), d;
    });
    return s ? o.unshift(a) : o.push(a), a;
  }
}
const en = (e) => (t, n = et) => {
  (!ms || e === "sp") && Js(e, (...s) => t(...s), n);
}, jc = en("bm"), gn = en("m"), Hc = en(
  "bu"
), Vc = en("u"), Mr = en(
  "bum"
), si = en("um"), zc = en(
  "sp"
), Fc = en("rtg"), Uc = en("rtc");
function Kc(e, t = et) {
  Js("ec", e, t);
}
const Or = "components", Gc = "directives";
function Wc(e, t) {
  return Dr(Or, e, !0, t) || e;
}
const Yc = /* @__PURE__ */ Symbol.for("v-ndc");
function y0(e) {
  return Dr(Gc, e);
}
function Dr(e, t, n = !0, s = !1) {
  const o = Ye || et;
  if (o) {
    const a = o.type;
    if (e === Or) {
      const l = Md(
        a,
        !1
      );
      if (l && (l === t || l === lt(t) || l === Fs(lt(t))))
        return a;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ci(o[e] || a[e], t) || // global registration
      Ci(o.appContext[e], t)
    );
    return !i && s ? a : i;
  }
}
function Ci(e, t) {
  return e && (e[t] || e[lt(t)] || e[Fs(lt(t))]);
}
function Ae(e, t, n, s) {
  let o;
  const a = n, i = le(e);
  if (i || Le(e)) {
    const l = i && /* @__PURE__ */ En(e);
    let d = !1, u = !1;
    l && (d = !/* @__PURE__ */ yt(e), u = /* @__PURE__ */ Xt(e), e = Gs(e)), o = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      o[c] = t(
        d ? u ? Bn(St(e[c])) : St(e[c]) : e[c],
        c,
        void 0,
        a
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, a);
  } else if (Re(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, d) => t(l, d, void 0, a)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let d = 0, u = l.length; d < u; d++) {
        const c = l[d];
        o[d] = t(e[c], c, d, a);
      }
    }
  else
    o = [];
  return o;
}
function Jc(e, t) {
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    if (le(s))
      for (let o = 0; o < s.length; o++)
        e[s[o].name] = s[o].fn;
    else s && (e[s.name] = s.key ? (...o) => {
      const a = s.fn(...o);
      return a && (a.key = s.key), a;
    } : s.fn);
  }
  return e;
}
function uo(e, t, n = {}, s, o) {
  if (Ye.ce || Ye.parent && Ln(Ye.parent) && Ye.parent.ce) {
    const u = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), w(), st(
      ee,
      null,
      [ve("slot", n, s && s())],
      u ? -2 : 64
    );
  }
  let a = e[t];
  a && a._c && (a._d = !1), w();
  const i = a && Lr(a(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, d = st(
    ee,
    {
      key: (l && !$t(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !o && d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), a && a._c && (a._d = !0), d;
}
function Lr(e) {
  return e.some((t) => fs(t) ? !(t.type === Xe || t.type === ee && !Lr(t.children)) : !0) ? e : null;
}
const Mo = (e) => e ? sl(e) ? Xs(e) : Mo(e.parent) : null, is = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ge(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Mo(e.parent),
    $root: (e) => Mo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Br(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ni(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Yt.bind(e.proxy)),
    $watch: (e) => Tc.bind(e)
  })
), po = (e, t) => e !== Ie && !e.__isScriptSetup && Pe(e, t), Qc = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: a, accessCache: i, type: l, appContext: d } = e;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return a[t];
        }
      else {
        if (po(s, t))
          return i[t] = 1, s[t];
        if (o !== Ie && Pe(o, t))
          return i[t] = 2, o[t];
        if (Pe(a, t))
          return i[t] = 3, a[t];
        if (n !== Ie && Pe(n, t))
          return i[t] = 4, n[t];
        Oo && (i[t] = 0);
      }
    }
    const u = is[t];
    let c, p;
    if (u)
      return t === "$attrs" && Ze(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== Ie && Pe(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = d.config.globalProperties, Pe(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: a } = e;
    return po(o, t) ? (o[t] = n, !0) : s !== Ie && Pe(s, t) ? (s[t] = n, !0) : Pe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: a, type: i }
  }, l) {
    let d;
    return !!(n[l] || e !== Ie && l[0] !== "$" && Pe(e, l) || po(t, l) || Pe(a, l) || Pe(s, l) || Pe(is, l) || Pe(o.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Pe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ai(e) {
  return le(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Oo = !0;
function Zc(e) {
  const t = Br(e), n = e.proxy, s = e.ctx;
  Oo = !1, t.beforeCreate && Ei(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: a,
    methods: i,
    watch: l,
    provide: d,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: p,
    mounted: m,
    beforeUpdate: g,
    updated: _,
    activated: $,
    deactivated: I,
    beforeDestroy: f,
    beforeUnmount: h,
    destroyed: O,
    unmounted: L,
    render: b,
    renderTracked: R,
    renderTriggered: A,
    errorCaptured: D,
    serverPrefetch: N,
    // public API
    expose: M,
    inheritAttrs: H,
    // assets
    components: j,
    directives: te,
    filters: Z
  } = t;
  if (u && Xc(u, s, null), i)
    for (const be in i) {
      const xe = i[be];
      me(xe) && (s[be] = xe.bind(n));
    }
  if (o) {
    const be = o.call(n, n);
    Re(be) && (e.data = /* @__PURE__ */ ze(be));
  }
  if (Oo = !0, a)
    for (const be in a) {
      const xe = a[be], Oe = me(xe) ? xe.bind(n, n) : me(xe.get) ? xe.get.bind(n, n) : Dt, qe = !me(xe) && me(xe.set) ? xe.set.bind(n) : Dt, We = _e({
        get: Oe,
        set: qe
      });
      Object.defineProperty(s, be, {
        enumerable: !0,
        configurable: !0,
        get: () => We.value,
        set: (Je) => We.value = Je
      });
    }
  if (l)
    for (const be in l)
      qr(l[be], s, n, be);
  if (d) {
    const be = me(d) ? d.call(n) : d;
    Reflect.ownKeys(be).forEach((xe) => {
      Ns(xe, be[xe]);
    });
  }
  c && Ei(c, e, "c");
  function Ce(be, xe) {
    le(xe) ? xe.forEach((Oe) => be(Oe.bind(n))) : xe && be(xe.bind(n));
  }
  if (Ce(jc, p), Ce(gn, m), Ce(Hc, g), Ce(Vc, _), Ce(Lc, $), Ce(qc, I), Ce(Kc, D), Ce(Uc, R), Ce(Fc, A), Ce(Mr, h), Ce(si, L), Ce(zc, N), le(M))
    if (M.length) {
      const be = e.exposed || (e.exposed = {});
      M.forEach((xe) => {
        Object.defineProperty(be, xe, {
          get: () => n[xe],
          set: (Oe) => n[xe] = Oe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  b && e.render === Dt && (e.render = b), H != null && (e.inheritAttrs = H), j && (e.components = j), te && (e.directives = te), N && Rr(e);
}
function Xc(e, t, n = Dt) {
  le(e) && (e = Do(e));
  for (const s in e) {
    const o = e[s];
    let a;
    Re(o) ? "default" in o ? a = kt(
      o.from || s,
      o.default,
      !0
    ) : a = kt(o.from || s) : a = kt(o), /* @__PURE__ */ nt(a) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (i) => a.value = i
    }) : t[s] = a;
  }
}
function Ei(e, t, n) {
  Ct(
    le(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function qr(e, t, n, s) {
  let o = s.includes(".") ? kr(n, s) : () => n[s];
  if (Le(e)) {
    const a = t[e];
    me(a) && ct(o, a);
  } else if (me(e))
    ct(o, e.bind(n));
  else if (Re(e))
    if (le(e))
      e.forEach((a) => qr(a, t, n, s));
    else {
      const a = me(e.handler) ? e.handler.bind(n) : t[e.handler];
      me(a) && ct(o, a, e);
    }
}
function Br(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: a,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = a.get(t);
  let d;
  return l ? d = l : !o.length && !n && !s ? d = t : (d = {}, o.length && o.forEach(
    (u) => Ds(d, u, i, !0)
  ), Ds(d, t, i)), Re(t) && a.set(t, d), d;
}
function Ds(e, t, n, s = !1) {
  const { mixins: o, extends: a } = t;
  a && Ds(e, a, n, !0), o && o.forEach(
    (i) => Ds(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = ed[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const ed = {
  data: Ni,
  props: Ti,
  emits: Ti,
  // objects
  methods: Xn,
  computed: Xn,
  // lifecycle
  beforeCreate: ot,
  created: ot,
  beforeMount: ot,
  mounted: ot,
  beforeUpdate: ot,
  updated: ot,
  beforeDestroy: ot,
  beforeUnmount: ot,
  destroyed: ot,
  unmounted: ot,
  activated: ot,
  deactivated: ot,
  errorCaptured: ot,
  serverPrefetch: ot,
  // assets
  components: Xn,
  directives: Xn,
  // watch
  watch: nd,
  // provide / inject
  provide: Ni,
  inject: td
};
function Ni(e, t) {
  return t ? e ? function() {
    return Ge(
      me(e) ? e.call(this, this) : e,
      me(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function td(e, t) {
  return Xn(Do(e), Do(t));
}
function Do(e) {
  if (le(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ot(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Xn(e, t) {
  return e ? Ge(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ti(e, t) {
  return e ? le(e) && le(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ge(
    /* @__PURE__ */ Object.create(null),
    Ai(e),
    Ai(t ?? {})
  ) : t;
}
function nd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ge(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ot(e[s], t[s]);
  return n;
}
function jr() {
  return {
    app: null,
    config: {
      isNativeTag: Ka,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let sd = 0;
function od(e, t) {
  return function(s, o = null) {
    me(s) || (s = Ge({}, s)), o != null && !Re(o) && (o = null);
    const a = jr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let d = !1;
    const u = a.app = {
      _uid: sd++,
      _component: s,
      _props: o,
      _container: null,
      _context: a,
      _instance: null,
      version: Dd,
      get config() {
        return a.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return i.has(c) || (c && me(c.install) ? (i.add(c), c.install(u, ...p)) : me(c) && (i.add(c), c(u, ...p))), u;
      },
      mixin(c) {
        return a.mixins.includes(c) || a.mixins.push(c), u;
      },
      component(c, p) {
        return p ? (a.components[c] = p, u) : a.components[c];
      },
      directive(c, p) {
        return p ? (a.directives[c] = p, u) : a.directives[c];
      },
      mount(c, p, m) {
        if (!d) {
          const g = u._ceVNode || ve(s, o);
          return g.appContext = a, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(g, c, m), d = !0, u._container = c, c.__vue_app__ = u, Xs(g.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        d && (Ct(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, p) {
        return a.provides[c] = p, u;
      },
      runWithContext(c) {
        const p = qn;
        qn = u;
        try {
          return c();
        } finally {
          qn = p;
        }
      }
    };
    return u;
  };
}
let qn = null;
const id = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${lt(t)}Modifiers`] || e[`${hn(t)}Modifiers`];
function ad(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Ie;
  let o = n;
  const a = t.startsWith("update:"), i = a && id(s, t.slice(7));
  i && (i.trim && (o = n.map((c) => Le(c) ? c.trim() : c)), i.number && (o = n.map(Us)));
  let l, d = s[l = oo(t)] || // also try camelCase event handler (#2249)
  s[l = oo(lt(t))];
  !d && a && (d = s[l = oo(hn(t))]), d && Ct(
    d,
    e,
    6,
    o
  );
  const u = s[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ct(
      u,
      e,
      6,
      o
    );
  }
}
const rd = /* @__PURE__ */ new WeakMap();
function Hr(e, t, n = !1) {
  const s = n ? rd : t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const a = e.emits;
  let i = {}, l = !1;
  if (!me(e)) {
    const d = (u) => {
      const c = Hr(u, t, !0);
      c && (l = !0, Ge(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !a && !l ? (Re(e) && s.set(e, null), null) : (le(a) ? a.forEach((d) => i[d] = null) : Ge(i, a), Re(e) && s.set(e, i), i);
}
function Qs(e, t) {
  return !e || !Hs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Pe(e, t[0].toLowerCase() + t.slice(1)) || Pe(e, hn(t)) || Pe(e, t));
}
function Pi(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    propsOptions: [a],
    slots: i,
    attrs: l,
    emit: d,
    render: u,
    renderCache: c,
    props: p,
    data: m,
    setupState: g,
    ctx: _,
    inheritAttrs: $
  } = e, I = Ms(e);
  let f, h;
  try {
    if (n.shapeFlag & 4) {
      const L = o || s, b = L;
      f = Mt(
        u.call(
          b,
          L,
          c,
          p,
          g,
          m,
          _
        )
      ), h = l;
    } else {
      const L = t;
      f = Mt(
        L.length > 1 ? L(
          p,
          { attrs: l, slots: i, emit: d }
        ) : L(
          p,
          null
        )
      ), h = t.props ? l : ld(l);
    }
  } catch (L) {
    as.length = 0, Ws(L, e, 1), f = ve(Xe);
  }
  let O = f;
  if (h && $ !== !1) {
    const L = Object.keys(h), { shapeFlag: b } = O;
    L.length && b & 7 && (a && L.some(Vs) && (h = cd(
      h,
      a
    )), O = fn(O, h, !1, !0));
  }
  return n.dirs && (O = fn(O, null, !1, !0), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition && us(O, n.transition), f = O, Ms(I), f;
}
const ld = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Hs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, cd = (e, t) => {
  const n = {};
  for (const s in e)
    (!Vs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function dd(e, t, n) {
  const { props: s, children: o, component: a } = e, { props: i, children: l, patchFlag: d } = t, u = a.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return s ? Ri(s, i, u) : !!i;
    if (d & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const m = c[p];
        if (Vr(i, s, m) && !Qs(u, m))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? Ri(s, i, u) : !0 : !!i;
  return !1;
}
function Ri(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    if (Vr(t, e, a) && !Qs(n, a))
      return !0;
  }
  return !1;
}
function Vr(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && Re(s) && Re(o) ? !pn(s, o) : s !== o;
}
function ud({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = s, e = o), o === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const zr = {}, Fr = () => Object.create(zr), Ur = (e) => Object.getPrototypeOf(e) === zr;
function pd(e, t, n, s = !1) {
  const o = {}, a = Fr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Kr(e, t, o, a);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : /* @__PURE__ */ mr(o) : e.type.props ? e.props = o : e.props = a, e.attrs = a;
}
function fd(e, t, n, s) {
  const {
    props: o,
    attrs: a,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Ne(o), [d] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let m = c[p];
        if (Qs(e.emitsOptions, m))
          continue;
        const g = t[m];
        if (d)
          if (Pe(a, m))
            g !== a[m] && (a[m] = g, u = !0);
          else {
            const _ = lt(m);
            o[_] = Lo(
              d,
              l,
              _,
              g,
              e,
              !1
            );
          }
        else
          g !== a[m] && (a[m] = g, u = !0);
      }
    }
  } else {
    Kr(e, t, o, a) && (u = !0);
    let c;
    for (const p in l)
      (!t || // for camelCase
      !Pe(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = hn(p)) === p || !Pe(t, c))) && (d ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[c] !== void 0) && (o[p] = Lo(
        d,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (a !== l)
      for (const p in a)
        (!t || !Pe(t, p)) && (delete a[p], u = !0);
  }
  u && Ut(e.attrs, "set", "");
}
function Kr(e, t, n, s) {
  const [o, a] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let d in t) {
      if (ts(d))
        continue;
      const u = t[d];
      let c;
      o && Pe(o, c = lt(d)) ? !a || !a.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Qs(e.emitsOptions, d) || (!(d in s) || u !== s[d]) && (s[d] = u, i = !0);
    }
  if (a) {
    const d = /* @__PURE__ */ Ne(n), u = l || Ie;
    for (let c = 0; c < a.length; c++) {
      const p = a[c];
      n[p] = Lo(
        o,
        d,
        p,
        u[p],
        e,
        !Pe(u, p)
      );
    }
  }
  return i;
}
function Lo(e, t, n, s, o, a) {
  const i = e[n];
  if (i != null) {
    const l = Pe(i, "default");
    if (l && s === void 0) {
      const d = i.default;
      if (i.type !== Function && !i.skipFactory && me(d)) {
        const { propsDefaults: u } = o;
        if (n in u)
          s = u[n];
        else {
          const c = bs(o);
          s = u[n] = d.call(
            null,
            t
          ), c();
        }
      } else
        s = d;
      o.ce && o.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (a && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === hn(n)) && (s = !0));
  }
  return s;
}
const md = /* @__PURE__ */ new WeakMap();
function Gr(e, t, n = !1) {
  const s = n ? md : t.propsCache, o = s.get(e);
  if (o)
    return o;
  const a = e.props, i = {}, l = [];
  let d = !1;
  if (!me(e)) {
    const c = (p) => {
      d = !0;
      const [m, g] = Gr(p, t, !0);
      Ge(i, m), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!a && !d)
    return Re(e) && s.set(e, Mn), Mn;
  if (le(a))
    for (let c = 0; c < a.length; c++) {
      const p = lt(a[c]);
      Ii(p) && (i[p] = Ie);
    }
  else if (a)
    for (const c in a) {
      const p = lt(c);
      if (Ii(p)) {
        const m = a[c], g = i[p] = le(m) || me(m) ? { type: m } : Ge({}, m), _ = g.type;
        let $ = !1, I = !0;
        if (le(_))
          for (let f = 0; f < _.length; ++f) {
            const h = _[f], O = me(h) && h.name;
            if (O === "Boolean") {
              $ = !0;
              break;
            } else O === "String" && (I = !1);
          }
        else
          $ = me(_) && _.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = $, g[
          1
          /* shouldCastTrue */
        ] = I, ($ || Pe(g, "default")) && l.push(p);
      }
    }
  const u = [i, l];
  return Re(e) && s.set(e, u), u;
}
function Ii(e) {
  return e[0] !== "$" && !ts(e);
}
const oi = (e) => e === "_" || e === "_ctx" || e === "$stable", ii = (e) => le(e) ? e.map(Mt) : [Mt(e)], hd = (e, t, n) => {
  if (t._n)
    return t;
  const s = Sn((...o) => ii(t(...o)), n);
  return s._c = !1, s;
}, Wr = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (oi(o)) continue;
    const a = e[o];
    if (me(a))
      t[o] = hd(o, a, s);
    else if (a != null) {
      const i = ii(a);
      t[o] = () => i;
    }
  }
}, Yr = (e, t) => {
  const n = ii(t);
  e.slots.default = () => n;
}, Jr = (e, t, n) => {
  for (const s in t)
    (n || !oi(s)) && (e[s] = t[s]);
}, gd = (e, t, n) => {
  const s = e.slots = Fr();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Jr(s, t, n), n && Ja(s, "_", o, !0)) : Wr(t, s);
  } else t && Yr(e, t);
}, vd = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let a = !0, i = Ie;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? a = !1 : Jr(o, t, n) : (a = !t.$stable, Wr(t, o)), i = t;
  } else t && (Yr(e, t), i = { default: 1 });
  if (a)
    for (const l in o)
      !oi(l) && i[l] == null && delete o[l];
}, it = wd;
function yd(e) {
  return bd(e);
}
function bd(e, t) {
  const n = Ks();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: a,
    createElement: i,
    createText: l,
    createComment: d,
    setText: u,
    setElementText: c,
    parentNode: p,
    nextSibling: m,
    setScopeId: g = Dt,
    insertStaticContent: _
  } = e, $ = (v, x, E, B = null, F = null, V = null, Y = void 0, W = null, K = !!x.dynamicChildren) => {
    if (v === x)
      return;
    v && !$n(v, x) && (B = z(v), Je(v, F, V, !0), v = null), x.patchFlag === -2 && (K = !1, x.dynamicChildren = null);
    const { type: U, ref: ce, shapeFlag: Q } = x;
    switch (U) {
      case Zs:
        I(v, x, E, B);
        break;
      case Xe:
        f(v, x, E, B);
        break;
      case Ts:
        v == null && h(x, E, B, Y);
        break;
      case ee:
        j(
          v,
          x,
          E,
          B,
          F,
          V,
          Y,
          W,
          K
        );
        break;
      default:
        Q & 1 ? b(
          v,
          x,
          E,
          B,
          F,
          V,
          Y,
          W,
          K
        ) : Q & 6 ? te(
          v,
          x,
          E,
          B,
          F,
          V,
          Y,
          W,
          K
        ) : (Q & 64 || Q & 128) && U.process(
          v,
          x,
          E,
          B,
          F,
          V,
          Y,
          W,
          K,
          ae
        );
    }
    ce != null && F ? os(ce, v && v.ref, V, x || v, !x) : ce == null && v && v.ref != null && os(v.ref, null, V, v, !0);
  }, I = (v, x, E, B) => {
    if (v == null)
      s(
        x.el = l(x.children),
        E,
        B
      );
    else {
      const F = x.el = v.el;
      x.children !== v.children && u(F, x.children);
    }
  }, f = (v, x, E, B) => {
    v == null ? s(
      x.el = d(x.children || ""),
      E,
      B
    ) : x.el = v.el;
  }, h = (v, x, E, B) => {
    [v.el, v.anchor] = _(
      v.children,
      x,
      E,
      B,
      v.el,
      v.anchor
    );
  }, O = ({ el: v, anchor: x }, E, B) => {
    let F;
    for (; v && v !== x; )
      F = m(v), s(v, E, B), v = F;
    s(x, E, B);
  }, L = ({ el: v, anchor: x }) => {
    let E;
    for (; v && v !== x; )
      E = m(v), o(v), v = E;
    o(x);
  }, b = (v, x, E, B, F, V, Y, W, K) => {
    if (x.type === "svg" ? Y = "svg" : x.type === "math" && (Y = "mathml"), v == null)
      R(
        x,
        E,
        B,
        F,
        V,
        Y,
        W,
        K
      );
    else {
      const U = v.el && v.el._isVueCE ? v.el : null;
      try {
        U && U._beginPatch(), N(
          v,
          x,
          F,
          V,
          Y,
          W,
          K
        );
      } finally {
        U && U._endPatch();
      }
    }
  }, R = (v, x, E, B, F, V, Y, W) => {
    let K, U;
    const { props: ce, shapeFlag: Q, transition: re, dirs: ue } = v;
    if (K = v.el = i(
      v.type,
      V,
      ce && ce.is,
      ce
    ), Q & 8 ? c(K, v.children) : Q & 16 && D(
      v.children,
      K,
      null,
      B,
      F,
      fo(v, V),
      Y,
      W
    ), ue && yn(v, null, B, "created"), A(K, v, v.scopeId, Y, B), ce) {
      for (const de in ce)
        de !== "value" && !ts(de) && a(K, de, null, ce[de], V, B);
      "value" in ce && a(K, "value", null, ce.value, V), (U = ce.onVnodeBeforeMount) && Tt(U, B, v);
    }
    ue && yn(v, null, B, "beforeMount");
    const ke = xd(F, re);
    ke && re.beforeEnter(K), s(K, x, E), ((U = ce && ce.onVnodeMounted) || ke || ue) && it(() => {
      try {
        U && Tt(U, B, v), ke && re.enter(K), ue && yn(v, null, B, "mounted");
      } finally {
      }
    }, F);
  }, A = (v, x, E, B, F) => {
    if (E && g(v, E), B)
      for (let V = 0; V < B.length; V++)
        g(v, B[V]);
    if (F) {
      let V = F.subTree;
      if (x === V || Xr(V.type) && (V.ssContent === x || V.ssFallback === x)) {
        const Y = F.vnode;
        A(
          v,
          Y,
          Y.scopeId,
          Y.slotScopeIds,
          F.parent
        );
      }
    }
  }, D = (v, x, E, B, F, V, Y, W, K = 0) => {
    for (let U = K; U < v.length; U++) {
      const ce = v[U] = W ? Ft(v[U]) : Mt(v[U]);
      $(
        null,
        ce,
        x,
        E,
        B,
        F,
        V,
        Y,
        W
      );
    }
  }, N = (v, x, E, B, F, V, Y) => {
    const W = x.el = v.el;
    let { patchFlag: K, dynamicChildren: U, dirs: ce } = x;
    K |= v.patchFlag & 16;
    const Q = v.props || Ie, re = x.props || Ie;
    let ue;
    if (E && bn(E, !1), (ue = re.onVnodeBeforeUpdate) && Tt(ue, E, x, v), ce && yn(x, v, E, "beforeUpdate"), E && bn(E, !0), (Q.innerHTML && re.innerHTML == null || Q.textContent && re.textContent == null) && c(W, ""), U ? M(
      v.dynamicChildren,
      U,
      W,
      E,
      B,
      fo(x, F),
      V
    ) : Y || xe(
      v,
      x,
      W,
      null,
      E,
      B,
      fo(x, F),
      V,
      !1
    ), K > 0) {
      if (K & 16)
        H(W, Q, re, E, F);
      else if (K & 2 && Q.class !== re.class && a(W, "class", null, re.class, F), K & 4 && a(W, "style", Q.style, re.style, F), K & 8) {
        const ke = x.dynamicProps;
        for (let de = 0; de < ke.length; de++) {
          const $e = ke[de], q = Q[$e], y = re[$e];
          (y !== q || $e === "value") && a(W, $e, q, y, F, E);
        }
      }
      K & 1 && v.children !== x.children && c(W, x.children);
    } else !Y && U == null && H(W, Q, re, E, F);
    ((ue = re.onVnodeUpdated) || ce) && it(() => {
      ue && Tt(ue, E, x, v), ce && yn(x, v, E, "updated");
    }, B);
  }, M = (v, x, E, B, F, V, Y) => {
    for (let W = 0; W < x.length; W++) {
      const K = v[W], U = x[W], ce = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        K.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (K.type === ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !$n(K, U) || // - In the case of a component, it could contain anything.
        K.shapeFlag & 198) ? p(K.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          E
        )
      );
      $(
        K,
        U,
        ce,
        null,
        B,
        F,
        V,
        Y,
        !0
      );
    }
  }, H = (v, x, E, B, F) => {
    if (x !== E) {
      if (x !== Ie)
        for (const V in x)
          !ts(V) && !(V in E) && a(
            v,
            V,
            x[V],
            null,
            F,
            B
          );
      for (const V in E) {
        if (ts(V)) continue;
        const Y = E[V], W = x[V];
        Y !== W && V !== "value" && a(v, V, W, Y, F, B);
      }
      "value" in E && a(v, "value", x.value, E.value, F);
    }
  }, j = (v, x, E, B, F, V, Y, W, K) => {
    const U = x.el = v ? v.el : l(""), ce = x.anchor = v ? v.anchor : l("");
    let { patchFlag: Q, dynamicChildren: re, slotScopeIds: ue } = x;
    ue && (W = W ? W.concat(ue) : ue), v == null ? (s(U, E, B), s(ce, E, B), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      x.children || [],
      E,
      ce,
      F,
      V,
      Y,
      W,
      K
    )) : Q > 0 && Q & 64 && re && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    v.dynamicChildren && v.dynamicChildren.length === re.length ? (M(
      v.dynamicChildren,
      re,
      E,
      F,
      V,
      Y,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (x.key != null || F && x === F.subTree) && ai(
      v,
      x,
      !0
      /* shallow */
    )) : xe(
      v,
      x,
      E,
      ce,
      F,
      V,
      Y,
      W,
      K
    );
  }, te = (v, x, E, B, F, V, Y, W, K) => {
    x.slotScopeIds = W, v == null ? x.shapeFlag & 512 ? F.ctx.activate(
      x,
      E,
      B,
      Y,
      K
    ) : Z(
      x,
      E,
      B,
      F,
      V,
      Y,
      K
    ) : fe(v, x, K);
  }, Z = (v, x, E, B, F, V, Y) => {
    const W = v.component = Nd(
      v,
      B,
      F
    );
    if (Ys(v) && (W.ctx.renderer = ae), Td(W, !1, Y), W.asyncDep) {
      if (F && F.registerDep(W, Ce, Y), !v.el) {
        const K = W.subTree = ve(Xe);
        f(null, K, x, E), v.placeholder = K.el;
      }
    } else
      Ce(
        W,
        v,
        x,
        E,
        F,
        V,
        Y
      );
  }, fe = (v, x, E) => {
    const B = x.component = v.component;
    if (dd(v, x, E))
      if (B.asyncDep && !B.asyncResolved) {
        be(B, x, E);
        return;
      } else
        B.next = x, B.update();
    else
      x.el = v.el, B.vnode = x;
  }, Ce = (v, x, E, B, F, V, Y) => {
    const W = () => {
      if (v.isMounted) {
        let { next: Q, bu: re, u: ue, parent: ke, vnode: de } = v;
        {
          const Se = Qr(v);
          if (Se) {
            Q && (Q.el = de.el, be(v, Q, Y)), Se.asyncDep.then(() => {
              it(() => {
                v.isUnmounted || U();
              }, F);
            });
            return;
          }
        }
        let $e = Q, q;
        bn(v, !1), Q ? (Q.el = de.el, be(v, Q, Y)) : Q = de, re && Es(re), (q = Q.props && Q.props.onVnodeBeforeUpdate) && Tt(q, ke, Q, de), bn(v, !0);
        const y = Pi(v), P = v.subTree;
        v.subTree = y, $(
          P,
          y,
          // parent may have changed if it's in a teleport
          p(P.el),
          // anchor may have changed if it's in a fragment
          z(P),
          v,
          F,
          V
        ), Q.el = y.el, $e === null && ud(v, y.el), ue && it(ue, F), (q = Q.props && Q.props.onVnodeUpdated) && it(
          () => Tt(q, ke, Q, de),
          F
        );
      } else {
        let Q;
        const { el: re, props: ue } = x, { bm: ke, m: de, parent: $e, root: q, type: y } = v, P = Ln(x);
        bn(v, !1), ke && Es(ke), !P && (Q = ue && ue.onVnodeBeforeMount) && Tt(Q, $e, x), bn(v, !0);
        {
          q.ce && q.ce._hasShadowRoot() && q.ce._injectChildStyle(
            y,
            v.parent ? v.parent.type : void 0
          );
          const Se = v.subTree = Pi(v);
          $(
            null,
            Se,
            E,
            B,
            v,
            F,
            V
          ), x.el = Se.el;
        }
        if (de && it(de, F), !P && (Q = ue && ue.onVnodeMounted)) {
          const Se = x;
          it(
            () => Tt(Q, $e, Se),
            F
          );
        }
        (x.shapeFlag & 256 || $e && Ln($e.vnode) && $e.vnode.shapeFlag & 256) && v.a && it(v.a, F), v.isMounted = !0, x = E = B = null;
      }
    };
    v.scope.on();
    const K = v.effect = new er(W);
    v.scope.off();
    const U = v.update = K.run.bind(K), ce = v.job = K.runIfDirty.bind(K);
    ce.i = v, ce.id = v.uid, K.scheduler = () => ni(ce), bn(v, !0), U();
  }, be = (v, x, E) => {
    x.component = v;
    const B = v.vnode.props;
    v.vnode = x, v.next = null, fd(v, x.props, B, E), vd(v, x.children, E), Qt(), xi(v), Zt();
  }, xe = (v, x, E, B, F, V, Y, W, K = !1) => {
    const U = v && v.children, ce = v ? v.shapeFlag : 0, Q = x.children, { patchFlag: re, shapeFlag: ue } = x;
    if (re > 0) {
      if (re & 128) {
        qe(
          U,
          Q,
          E,
          B,
          F,
          V,
          Y,
          W,
          K
        );
        return;
      } else if (re & 256) {
        Oe(
          U,
          Q,
          E,
          B,
          F,
          V,
          Y,
          W,
          K
        );
        return;
      }
    }
    ue & 8 ? (ce & 16 && dt(U, F, V), Q !== U && c(E, Q)) : ce & 16 ? ue & 16 ? qe(
      U,
      Q,
      E,
      B,
      F,
      V,
      Y,
      W,
      K
    ) : dt(U, F, V, !0) : (ce & 8 && c(E, ""), ue & 16 && D(
      Q,
      E,
      B,
      F,
      V,
      Y,
      W,
      K
    ));
  }, Oe = (v, x, E, B, F, V, Y, W, K) => {
    v = v || Mn, x = x || Mn;
    const U = v.length, ce = x.length, Q = Math.min(U, ce);
    let re;
    for (re = 0; re < Q; re++) {
      const ue = x[re] = K ? Ft(x[re]) : Mt(x[re]);
      $(
        v[re],
        ue,
        E,
        null,
        F,
        V,
        Y,
        W,
        K
      );
    }
    U > ce ? dt(
      v,
      F,
      V,
      !0,
      !1,
      Q
    ) : D(
      x,
      E,
      B,
      F,
      V,
      Y,
      W,
      K,
      Q
    );
  }, qe = (v, x, E, B, F, V, Y, W, K) => {
    let U = 0;
    const ce = x.length;
    let Q = v.length - 1, re = ce - 1;
    for (; U <= Q && U <= re; ) {
      const ue = v[U], ke = x[U] = K ? Ft(x[U]) : Mt(x[U]);
      if ($n(ue, ke))
        $(
          ue,
          ke,
          E,
          null,
          F,
          V,
          Y,
          W,
          K
        );
      else
        break;
      U++;
    }
    for (; U <= Q && U <= re; ) {
      const ue = v[Q], ke = x[re] = K ? Ft(x[re]) : Mt(x[re]);
      if ($n(ue, ke))
        $(
          ue,
          ke,
          E,
          null,
          F,
          V,
          Y,
          W,
          K
        );
      else
        break;
      Q--, re--;
    }
    if (U > Q) {
      if (U <= re) {
        const ue = re + 1, ke = ue < ce ? x[ue].el : B;
        for (; U <= re; )
          $(
            null,
            x[U] = K ? Ft(x[U]) : Mt(x[U]),
            E,
            ke,
            F,
            V,
            Y,
            W,
            K
          ), U++;
      }
    } else if (U > re)
      for (; U <= Q; )
        Je(v[U], F, V, !0), U++;
    else {
      const ue = U, ke = U, de = /* @__PURE__ */ new Map();
      for (U = ke; U <= re; U++) {
        const ut = x[U] = K ? Ft(x[U]) : Mt(x[U]);
        ut.key != null && de.set(ut.key, U);
      }
      let $e, q = 0;
      const y = re - ke + 1;
      let P = !1, Se = 0;
      const X = new Array(y);
      for (U = 0; U < y; U++) X[U] = 0;
      for (U = ue; U <= Q; U++) {
        const ut = v[U];
        if (q >= y) {
          Je(ut, F, V, !0);
          continue;
        }
        let Nt;
        if (ut.key != null)
          Nt = de.get(ut.key);
        else
          for ($e = ke; $e <= re; $e++)
            if (X[$e - ke] === 0 && $n(ut, x[$e])) {
              Nt = $e;
              break;
            }
        Nt === void 0 ? Je(ut, F, V, !0) : (X[Nt - ke] = U + 1, Nt >= Se ? Se = Nt : P = !0, $(
          ut,
          x[Nt],
          E,
          null,
          F,
          V,
          Y,
          W,
          K
        ), q++);
      }
      const Ue = P ? _d(X) : Mn;
      for ($e = Ue.length - 1, U = y - 1; U >= 0; U--) {
        const ut = ke + U, Nt = x[ut], mi = x[ut + 1], hi = ut + 1 < ce ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          mi.el || Zr(mi)
        ) : B;
        X[U] === 0 ? $(
          null,
          Nt,
          E,
          hi,
          F,
          V,
          Y,
          W,
          K
        ) : P && ($e < 0 || U !== Ue[$e] ? We(Nt, E, hi, 2) : $e--);
      }
    }
  }, We = (v, x, E, B, F = null) => {
    const { el: V, type: Y, transition: W, children: K, shapeFlag: U } = v;
    if (U & 6) {
      We(v.component.subTree, x, E, B);
      return;
    }
    if (U & 128) {
      v.suspense.move(x, E, B);
      return;
    }
    if (U & 64) {
      Y.move(v, x, E, ae);
      return;
    }
    if (Y === ee) {
      s(V, x, E);
      for (let Q = 0; Q < K.length; Q++)
        We(K[Q], x, E, B);
      s(v.anchor, x, E);
      return;
    }
    if (Y === Ts) {
      O(v, x, E);
      return;
    }
    if (B !== 2 && U & 1 && W)
      if (B === 0)
        W.beforeEnter(V), s(V, x, E), it(() => W.enter(V), F);
      else {
        const { leave: Q, delayLeave: re, afterLeave: ue } = W, ke = () => {
          v.ctx.isUnmounted ? o(V) : s(V, x, E);
        }, de = () => {
          V._isLeaving && V[Rt](
            !0
            /* cancelled */
          ), Q(V, () => {
            ke(), ue && ue();
          });
        };
        re ? re(V, ke, de) : de();
      }
    else
      s(V, x, E);
  }, Je = (v, x, E, B = !1, F = !1) => {
    const {
      type: V,
      props: Y,
      ref: W,
      children: K,
      dynamicChildren: U,
      shapeFlag: ce,
      patchFlag: Q,
      dirs: re,
      cacheIndex: ue,
      memo: ke
    } = v;
    if (Q === -2 && (F = !1), W != null && (Qt(), os(W, null, E, v, !0), Zt()), ue != null && (x.renderCache[ue] = void 0), ce & 256) {
      x.ctx.deactivate(v);
      return;
    }
    const de = ce & 1 && re, $e = !Ln(v);
    let q;
    if ($e && (q = Y && Y.onVnodeBeforeUnmount) && Tt(q, x, v), ce & 6)
      Bt(v.component, E, B);
    else {
      if (ce & 128) {
        v.suspense.unmount(E, B);
        return;
      }
      de && yn(v, null, x, "beforeUnmount"), ce & 64 ? v.type.remove(
        v,
        x,
        E,
        ae,
        B
      ) : U && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !U.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (V !== ee || Q > 0 && Q & 64) ? dt(
        U,
        x,
        E,
        !1,
        !0
      ) : (V === ee && Q & 384 || !F && ce & 16) && dt(K, x, E), B && qt(v);
    }
    const y = ke != null && ue == null;
    ($e && (q = Y && Y.onVnodeUnmounted) || de || y) && it(() => {
      q && Tt(q, x, v), de && yn(v, null, x, "unmounted"), y && (v.el = null);
    }, E);
  }, qt = (v) => {
    const { type: x, el: E, anchor: B, transition: F } = v;
    if (x === ee) {
      tn(E, B);
      return;
    }
    if (x === Ts) {
      L(v);
      return;
    }
    const V = () => {
      o(E), F && !F.persisted && F.afterLeave && F.afterLeave();
    };
    if (v.shapeFlag & 1 && F && !F.persisted) {
      const { leave: Y, delayLeave: W } = F, K = () => Y(E, V);
      W ? W(v.el, V, K) : K();
    } else
      V();
  }, tn = (v, x) => {
    let E;
    for (; v !== x; )
      E = m(v), o(v), v = E;
    o(x);
  }, Bt = (v, x, E) => {
    const { bum: B, scope: F, job: V, subTree: Y, um: W, m: K, a: U } = v;
    Mi(K), Mi(U), B && Es(B), F.stop(), V && (V.flags |= 8, Je(Y, v, x, E)), W && it(W, x), it(() => {
      v.isUnmounted = !0;
    }, x);
  }, dt = (v, x, E, B = !1, F = !1, V = 0) => {
    for (let Y = V; Y < v.length; Y++)
      Je(v[Y], x, E, B, F);
  }, z = (v) => {
    if (v.shapeFlag & 6)
      return z(v.component.subTree);
    if (v.shapeFlag & 128)
      return v.suspense.next();
    const x = m(v.anchor || v.el), E = x && x[$r];
    return E ? m(E) : x;
  };
  let ne = !1;
  const J = (v, x, E) => {
    let B;
    v == null ? x._vnode && (Je(x._vnode, null, null, !0), B = x._vnode.component) : $(
      x._vnode || null,
      v,
      x,
      null,
      null,
      null,
      E
    ), x._vnode = v, ne || (ne = !0, xi(B), br(), ne = !1);
  }, ae = {
    p: $,
    um: Je,
    m: We,
    r: qt,
    mt: Z,
    mc: D,
    pc: xe,
    pbc: M,
    n: z,
    o: e
  };
  return {
    render: J,
    hydrate: void 0,
    createApp: od(J)
  };
}
function fo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function bn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function xd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ai(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (le(s) && le(o))
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      let l = o[a];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[a] = Ft(o[a]), l.el = i.el), !n && l.patchFlag !== -2 && ai(i, l)), l.type === Zs && (l.patchFlag === -1 && (l = o[a] = Ft(l)), l.el = i.el), l.type === Xe && !l.el && (l.el = i.el);
    }
}
function _d(e) {
  const t = e.slice(), n = [0];
  let s, o, a, i, l;
  const d = e.length;
  for (s = 0; s < d; s++) {
    const u = e[s];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[s] = o, n.push(s);
        continue;
      }
      for (a = 0, i = n.length - 1; a < i; )
        l = a + i >> 1, e[n[l]] < u ? a = l + 1 : i = l;
      u < e[n[a]] && (a > 0 && (t[s] = n[a - 1]), n[a] = s);
    }
  }
  for (a = n.length, i = n[a - 1]; a-- > 0; )
    n[a] = i, i = t[i];
  return n;
}
function Qr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Qr(t);
}
function Mi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Zr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Zr(t.subTree) : null;
}
const Xr = (e) => e.__isSuspense;
function wd(e, t) {
  t && t.pendingBranch ? le(e) ? t.effects.push(...e) : t.effects.push(e) : Ac(e);
}
const ee = /* @__PURE__ */ Symbol.for("v-fgt"), Zs = /* @__PURE__ */ Symbol.for("v-txt"), Xe = /* @__PURE__ */ Symbol.for("v-cmt"), Ts = /* @__PURE__ */ Symbol.for("v-stc"), as = [];
let ft = null;
function w(e = !1) {
  as.push(ft = e ? null : []);
}
function kd() {
  as.pop(), ft = as[as.length - 1] || null;
}
let ps = 1;
function Ls(e, t = !1) {
  ps += e, e < 0 && ft && t && (ft.hasOnce = !0);
}
function el(e) {
  return e.dynamicChildren = ps > 0 ? ft || Mn : null, kd(), ps > 0 && ft && ft.push(e), e;
}
function S(e, t, n, s, o, a) {
  return el(
    r(
      e,
      t,
      n,
      s,
      o,
      a,
      !0
    )
  );
}
function st(e, t, n, s, o) {
  return el(
    ve(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function fs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function $n(e, t) {
  return e.type === t.type && e.key === t.key;
}
const tl = ({ key: e }) => e ?? null, Ps = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Le(e) || /* @__PURE__ */ nt(e) || me(e) ? { i: Ye, r: e, k: t, f: !!n } : e : null);
function r(e, t = null, n = null, s = 0, o = null, a = e === ee ? 0 : 1, i = !1, l = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && tl(t),
    ref: t && Ps(t),
    scopeId: _r,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ye
  };
  return l ? (ri(d, n), a & 128 && e.normalize(d)) : n && (d.shapeFlag |= Le(n) ? 8 : 16), ps > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ft && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && ft.push(d), d;
}
const ve = $d;
function $d(e, t = null, n = null, s = 0, o = null, a = !1) {
  if ((!e || e === Yc) && (e = Xe), fs(e)) {
    const l = fn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ri(l, n), ps > 0 && !a && ft && (l.shapeFlag & 6 ? ft[ft.indexOf(e)] = l : ft.push(l)), l.patchFlag = -2, l;
  }
  if (Od(e) && (e = e.__vccOpts), t) {
    t = Sd(t);
    let { class: l, style: d } = t;
    l && !Le(l) && (t.class = De(l)), Re(d) && (/* @__PURE__ */ ti(d) && !le(d) && (d = Ge({}, d)), t.style = _t(d));
  }
  const i = Le(e) ? 1 : Xr(e) ? 128 : Sr(e) ? 64 : Re(e) ? 4 : me(e) ? 2 : 0;
  return r(
    e,
    t,
    n,
    s,
    o,
    i,
    a,
    !0
  );
}
function Sd(e) {
  return e ? /* @__PURE__ */ ti(e) || Ur(e) ? Ge({}, e) : e : null;
}
function fn(e, t, n = !1, s = !1) {
  const { props: o, ref: a, patchFlag: i, children: l, transition: d } = e, u = t ? Cd(o || {}, t) : o, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && tl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && a ? le(a) ? a.concat(Ps(t)) : [a, Ps(t)] : Ps(t)
    ) : a,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ee ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && fn(e.ssContent),
    ssFallback: e.ssFallback && fn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && s && us(
    c,
    d.clone(c)
  ), c;
}
function ye(e = " ", t = 0) {
  return ve(Zs, null, e, t);
}
function b0(e, t) {
  const n = ve(Ts, null, e);
  return n.staticCount = t, n;
}
function G(e = "", t = !1) {
  return t ? (w(), st(Xe, null, e)) : ve(Xe, null, e);
}
function Mt(e) {
  return e == null || typeof e == "boolean" ? ve(Xe) : le(e) ? ve(
    ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fs(e) ? Ft(e) : ve(Zs, null, String(e));
}
function Ft(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : fn(e);
}
function ri(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (le(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), ri(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Ur(t) ? t._ctx = Ye : o === 3 && Ye && (Ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else me(t) ? (t = { default: t, _ctx: Ye }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [ye(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Cd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = De([t.class, s.class]));
      else if (o === "style")
        t.style = _t([t.style, s.style]);
      else if (Hs(o)) {
        const a = t[o], i = s[o];
        i && a !== i && !(le(a) && a.includes(i)) ? t[o] = a ? [].concat(a, i) : i : i == null && a == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Vs(o) && (t[o] = i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function Tt(e, t, n, s = null) {
  Ct(e, t, 7, [
    n,
    s
  ]);
}
const Ad = jr();
let Ed = 0;
function Nd(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || Ad, a = {
    uid: Ed++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ql(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Gr(s, o),
    emitsOptions: Hr(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ie,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Ie,
    data: Ie,
    props: Ie,
    attrs: Ie,
    slots: Ie,
    refs: Ie,
    setupState: Ie,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ad.bind(null, a), e.ce && e.ce(a), a;
}
let et = null;
const nl = () => et || Ye;
let qs, qo;
{
  const e = Ks(), t = (n, s) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(s), (a) => {
      o.length > 1 ? o.forEach((i) => i(a)) : o[0](a);
    };
  };
  qs = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => et = n
  ), qo = t(
    "__VUE_SSR_SETTERS__",
    (n) => ms = n
  );
}
const bs = (e) => {
  const t = et;
  return qs(e), e.scope.on(), () => {
    e.scope.off(), qs(t);
  };
}, Oi = () => {
  et && et.scope.off(), qs(null);
};
function sl(e) {
  return e.vnode.shapeFlag & 4;
}
let ms = !1;
function Td(e, t = !1, n = !1) {
  t && qo(t);
  const { props: s, children: o } = e.vnode, a = sl(e);
  pd(e, s, a, t), gd(e, o, n || t);
  const i = a ? Pd(e, t) : void 0;
  return t && qo(!1), i;
}
function Pd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Qc);
  const { setup: s } = n;
  if (s) {
    Qt();
    const o = e.setupContext = s.length > 1 ? Id(e) : null, a = bs(e), i = ys(
      s,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Ga(i);
    if (Zt(), a(), (l || e.sp) && !Ln(e) && Rr(e), l) {
      if (i.then(Oi, Oi), t)
        return i.then((d) => {
          Di(e, d);
        }).catch((d) => {
          Ws(d, e, 0);
        });
      e.asyncDep = i;
    } else
      Di(e, i);
  } else
    ol(e);
}
function Di(e, t, n) {
  me(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Re(t) && (e.setupState = gr(t)), ol(e);
}
function ol(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Dt);
  {
    const o = bs(e);
    Qt();
    try {
      Zc(e);
    } finally {
      Zt(), o();
    }
  }
}
const Rd = {
  get(e, t) {
    return Ze(e, "get", ""), e[t];
  }
};
function Id(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Rd),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Xs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(gr(vc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in is)
        return is[n](e);
    },
    has(t, n) {
      return n in t || n in is;
    }
  })) : e.proxy;
}
function Md(e, t = !0) {
  return me(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Od(e) {
  return me(e) && "__vccOpts" in e;
}
const _e = (e, t) => /* @__PURE__ */ wc(e, t, ms);
function li(e, t, n) {
  try {
    Ls(-1);
    const s = arguments.length;
    return s === 2 ? Re(t) && !le(t) ? fs(t) ? ve(e, null, [t]) : ve(e, t) : ve(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && fs(n) && (n = [n]), ve(e, t, n));
  } finally {
    Ls(1);
  }
}
const Dd = "3.5.33";
/**
* @vue/runtime-dom v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Bo;
const Li = typeof window < "u" && window.trustedTypes;
if (Li)
  try {
    Bo = /* @__PURE__ */ Li.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const il = Bo ? (e) => Bo.createHTML(e) : (e) => e, Ld = "http://www.w3.org/2000/svg", qd = "http://www.w3.org/1998/Math/MathML", zt = typeof document < "u" ? document : null, qi = zt && /* @__PURE__ */ zt.createElement("template"), Bd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? zt.createElementNS(Ld, e) : t === "mathml" ? zt.createElementNS(qd, e) : n ? zt.createElement(e, { is: n }) : zt.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => zt.createTextNode(e),
  createComment: (e) => zt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => zt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, a) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === a || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === a || !(o = o.nextSibling)); )
        ;
    else {
      qi.innerHTML = il(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = qi.content;
      if (s === "svg" || s === "mathml") {
        const d = l.firstChild;
        for (; d.firstChild; )
          l.appendChild(d.firstChild);
        l.removeChild(d);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, nn = "transition", Gn = "animation", hs = /* @__PURE__ */ Symbol("_vtc"), al = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, jd = /* @__PURE__ */ Ge(
  {},
  Cr,
  al
), Hd = (e) => (e.displayName = "Transition", e.props = jd, e), x0 = /* @__PURE__ */ Hd(
  (e, { slots: t }) => li(Dc, Vd(e), t)
), xn = (e, t = []) => {
  le(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Bi = (e) => e ? le(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Vd(e) {
  const t = {};
  for (const j in e)
    j in al || (t[j] = e[j]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: o,
    enterFromClass: a = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: d = a,
    appearActiveClass: u = i,
    appearToClass: c = l,
    leaveFromClass: p = `${n}-leave-from`,
    leaveActiveClass: m = `${n}-leave-active`,
    leaveToClass: g = `${n}-leave-to`
  } = e, _ = zd(o), $ = _ && _[0], I = _ && _[1], {
    onBeforeEnter: f,
    onEnter: h,
    onEnterCancelled: O,
    onLeave: L,
    onLeaveCancelled: b,
    onBeforeAppear: R = f,
    onAppear: A = h,
    onAppearCancelled: D = O
  } = t, N = (j, te, Z, fe) => {
    j._enterCancelled = fe, _n(j, te ? c : l), _n(j, te ? u : i), Z && Z();
  }, M = (j, te) => {
    j._isLeaving = !1, _n(j, p), _n(j, g), _n(j, m), te && te();
  }, H = (j) => (te, Z) => {
    const fe = j ? A : h, Ce = () => N(te, j, Z);
    xn(fe, [te, Ce]), ji(() => {
      _n(te, j ? d : a), Ht(te, j ? c : l), Bi(fe) || Hi(te, s, $, Ce);
    });
  };
  return Ge(t, {
    onBeforeEnter(j) {
      xn(f, [j]), Ht(j, a), Ht(j, i);
    },
    onBeforeAppear(j) {
      xn(R, [j]), Ht(j, d), Ht(j, u);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(j, te) {
      j._isLeaving = !0;
      const Z = () => M(j, te);
      Ht(j, p), j._enterCancelled ? (Ht(j, m), Fi(j)) : (Fi(j), Ht(j, m)), ji(() => {
        j._isLeaving && (_n(j, p), Ht(j, g), Bi(L) || Hi(j, s, I, Z));
      }), xn(L, [j, Z]);
    },
    onEnterCancelled(j) {
      N(j, !1, void 0, !0), xn(O, [j]);
    },
    onAppearCancelled(j) {
      N(j, !0, void 0, !0), xn(D, [j]);
    },
    onLeaveCancelled(j) {
      M(j), xn(b, [j]);
    }
  });
}
function zd(e) {
  if (e == null)
    return null;
  if (Re(e))
    return [mo(e.enter), mo(e.leave)];
  {
    const t = mo(e);
    return [t, t];
  }
}
function mo(e) {
  return zl(e);
}
function Ht(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[hs] || (e[hs] = /* @__PURE__ */ new Set())).add(t);
}
function _n(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[hs];
  n && (n.delete(t), n.size || (e[hs] = void 0));
}
function ji(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Fd = 0;
function Hi(e, t, n, s) {
  const o = e._endId = ++Fd, a = () => {
    o === e._endId && s();
  };
  if (n != null)
    return setTimeout(a, n);
  const { type: i, timeout: l, propCount: d } = Ud(e, t);
  if (!i)
    return s();
  const u = i + "end";
  let c = 0;
  const p = () => {
    e.removeEventListener(u, m), a();
  }, m = (g) => {
    g.target === e && ++c >= d && p();
  };
  setTimeout(() => {
    c < d && p();
  }, l + 1), e.addEventListener(u, m);
}
function Ud(e, t) {
  const n = window.getComputedStyle(e), s = (_) => (n[_] || "").split(", "), o = s(`${nn}Delay`), a = s(`${nn}Duration`), i = Vi(o, a), l = s(`${Gn}Delay`), d = s(`${Gn}Duration`), u = Vi(l, d);
  let c = null, p = 0, m = 0;
  t === nn ? i > 0 && (c = nn, p = i, m = a.length) : t === Gn ? u > 0 && (c = Gn, p = u, m = d.length) : (p = Math.max(i, u), c = p > 0 ? i > u ? nn : Gn : null, m = c ? c === nn ? a.length : d.length : 0);
  const g = c === nn && /\b(?:transform|all)(?:,|$)/.test(
    s(`${nn}Property`).toString()
  );
  return {
    type: c,
    timeout: p,
    propCount: m,
    hasTransform: g
  };
}
function Vi(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => zi(n) + zi(e[s])));
}
function zi(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Fi(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Kd(e, t, n) {
  const s = e[hs];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Bs = /* @__PURE__ */ Symbol("_vod"), rl = /* @__PURE__ */ Symbol("_vsh"), _0 = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[Bs] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Wn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), Wn(e, !0), s.enter(e)) : s.leave(e, () => {
      Wn(e, !1);
    }) : Wn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Wn(e, t);
  }
};
function Wn(e, t) {
  e.style.display = t ? e[Bs] : "none", e[rl] = !t;
}
const Gd = /* @__PURE__ */ Symbol(""), Wd = /(?:^|;)\s*display\s*:/;
function Yd(e, t, n) {
  const s = e.style, o = Le(n);
  let a = !1;
  if (n && !o) {
    if (t)
      if (Le(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && es(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && es(s, i, "");
    for (const i in n) {
      i === "display" && (a = !0);
      const l = n[i];
      l != null ? Qd(
        e,
        i,
        !Le(t) && t ? t[i] : void 0,
        l
      ) || es(s, i, l) : es(s, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = s[Gd];
      i && (n += ";" + i), s.cssText = n, a = Wd.test(n);
    }
  } else t && e.removeAttribute("style");
  Bs in e && (e[Bs] = a ? s.display : "", e[rl] && (s.display = "none"));
}
const Ui = /\s*!important$/;
function es(e, t, n) {
  if (le(n))
    n.forEach((s) => es(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Jd(e, t);
    Ui.test(n) ? e.setProperty(
      hn(s),
      n.replace(Ui, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ki = ["Webkit", "Moz", "ms"], ho = {};
function Jd(e, t) {
  const n = ho[t];
  if (n)
    return n;
  let s = lt(t);
  if (s !== "filter" && s in e)
    return ho[t] = s;
  s = Fs(s);
  for (let o = 0; o < Ki.length; o++) {
    const a = Ki[o] + s;
    if (a in e)
      return ho[t] = a;
  }
  return t;
}
function Qd(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Le(s) && n === s;
}
const Gi = "http://www.w3.org/1999/xlink";
function Wi(e, t, n, s, o, a = Yl(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Gi, t.slice(6, t.length)) : e.setAttributeNS(Gi, t, n) : n == null || a && !Qa(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    a ? "" : $t(n) ? String(n) : n
  );
}
function Yi(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? il(n) : n);
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && // custom elements may use _value internally
  !a.includes("-")) {
    const l = a === "OPTION" ? e.getAttribute("value") || "" : e.value, d = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== d || !("_value" in e)) && (e.value = d), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Qa(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Gt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Zd(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Ji = /* @__PURE__ */ Symbol("_vei");
function Xd(e, t, n, s, o = null) {
  const a = e[Ji] || (e[Ji] = {}), i = a[t];
  if (s && i)
    i.value = s;
  else {
    const [l, d] = eu(t);
    if (s) {
      const u = a[t] = su(
        s,
        o
      );
      Gt(e, l, u, d);
    } else i && (Zd(e, l, i, d), a[t] = void 0);
  }
}
const Qi = /(?:Once|Passive|Capture)$/;
function eu(e) {
  let t;
  if (Qi.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Qi); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : hn(e.slice(2)), t];
}
let go = 0;
const tu = /* @__PURE__ */ Promise.resolve(), nu = () => go || (tu.then(() => go = 0), go = Date.now());
function su(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Ct(
      ou(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = nu(), n;
}
function ou(e, t) {
  if (le(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (o) => !o._stopped && s && s(o)
    );
  } else
    return t;
}
const Zi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, iu = (e, t, n, s, o, a) => {
  const i = o === "svg";
  t === "class" ? Kd(e, s, i) : t === "style" ? Yd(e, n, s) : Hs(t) ? Vs(t) || Xd(e, t, n, s, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : au(e, t, s, i)) ? (Yi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Wi(e, t, s, i, a, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (ru(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Le(s))) ? Yi(e, lt(t), s, a, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Wi(e, t, s, i));
};
function au(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Zi(t) && me(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Zi(t) && Le(n) ? !1 : t in e;
}
function ru(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = lt(t);
  return Array.isArray(n) ? n.some((o) => lt(o) === s) : Object.keys(n).some((o) => lt(o) === s);
}
const mn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return le(t) ? (n) => Es(t, n) : t;
};
function lu(e) {
  e.target.composing = !0;
}
function Xi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const bt = /* @__PURE__ */ Symbol("_assign");
function ea(e, t, n) {
  return t && (e = e.trim()), n && (e = Us(e)), e;
}
const ge = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e[bt] = mn(o);
    const a = s || o.props && o.props.type === "number";
    Gt(e, t ? "change" : "input", (i) => {
      i.target.composing || e[bt](ea(e.value, n, a));
    }), (n || a) && Gt(e, "change", () => {
      e.value = ea(e.value, n, a);
    }), t || (Gt(e, "compositionstart", lu), Gt(e, "compositionend", Xi), Gt(e, "change", Xi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: o, number: a } }, i) {
    if (e[bt] = mn(i), e.composing) return;
    const l = (a || e.type === "number") && !/^0\d/.test(e.value) ? Us(e.value) : e.value, d = t ?? "";
    if (l === d)
      return;
    const u = e.getRootNode();
    (u instanceof Document || u instanceof ShadowRoot) && u.activeElement === e && e.type !== "range" && (s && t === n || o && e.value.trim() === d) || (e.value = d);
  }
}, ci = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[bt] = mn(n), Gt(e, "change", () => {
      const s = e._modelValue, o = jn(e), a = e.checked, i = e[bt];
      if (le(s)) {
        const l = Wo(s, o), d = l !== -1;
        if (a && !d)
          i(s.concat(o));
        else if (!a && d) {
          const u = [...s];
          u.splice(l, 1), i(u);
        }
      } else if (zn(s)) {
        const l = new Set(s);
        a ? l.add(o) : l.delete(o), i(l);
      } else
        i(ll(e, a));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: ta,
  beforeUpdate(e, t, n) {
    e[bt] = mn(n), ta(e, t, n);
  }
};
function ta(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let o;
  if (le(t))
    o = Wo(t, s.props.value) > -1;
  else if (zn(t))
    o = t.has(s.props.value);
  else {
    if (t === n) return;
    o = pn(t, ll(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const cu = {
  created(e, { value: t }, n) {
    e.checked = pn(t, n.props.value), e[bt] = mn(n), Gt(e, "change", () => {
      e[bt](jn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[bt] = mn(s), t !== n && (e.checked = pn(t, s.props.value));
  }
}, je = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const o = zn(t);
    Gt(e, "change", () => {
      const a = Array.prototype.filter.call(e.options, (i) => i.selected).map(
        (i) => n ? Us(jn(i)) : jn(i)
      );
      e[bt](
        e.multiple ? o ? new Set(a) : a : a[0]
      ), e._assigning = !0, Yt(() => {
        e._assigning = !1;
      });
    }), e[bt] = mn(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    na(e, t);
  },
  beforeUpdate(e, t, n) {
    e[bt] = mn(n);
  },
  updated(e, { value: t }) {
    e._assigning || na(e, t);
  }
};
function na(e, t) {
  const n = e.multiple, s = le(t);
  if (!(n && !s && !zn(t))) {
    for (let o = 0, a = e.options.length; o < a; o++) {
      const i = e.options[o], l = jn(i);
      if (n)
        if (s) {
          const d = typeof l;
          d === "string" || d === "number" ? i.selected = t.some((u) => String(u) === String(l)) : i.selected = Wo(t, l) > -1;
        } else
          i.selected = t.has(l);
      else if (pn(jn(i), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function jn(e) {
  return "_value" in e ? e._value : e.value;
}
function ll(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const du = {
  created(e, t, n) {
    Ss(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    Ss(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    Ss(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    Ss(e, t, n, s, "updated");
  }
};
function uu(e, t) {
  switch (e) {
    case "SELECT":
      return je;
    case "TEXTAREA":
      return ge;
    default:
      switch (t) {
        case "checkbox":
          return ci;
        case "radio":
          return cu;
        default:
          return ge;
      }
  }
}
function Ss(e, t, n, s, o) {
  const i = uu(
    e.tagName,
    n.props && n.props.type
  )[o];
  i && i(e, t, n, s);
}
const pu = ["ctrl", "shift", "alt", "meta"], fu = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => pu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Fe = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (o, ...a) => {
    for (let i = 0; i < t.length; i++) {
      const l = fu[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...a);
  });
}, mu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, cl = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (o) => {
    if (!("key" in o))
      return;
    const a = hn(o.key);
    if (t.some(
      (i) => i === a || mu[i] === a
    ))
      return e(o);
  });
}, hu = /* @__PURE__ */ Ge({ patchProp: iu }, Bd);
let sa;
function gu() {
  return sa || (sa = yd(hu));
}
const vu = (...e) => {
  const t = gu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const o = bu(s);
    if (!o) return;
    const a = t._component;
    !me(a) && !a.render && !a.template && (a.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, yu(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function yu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function bu(e) {
  return Le(e) ? document.querySelector(e) : e;
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const In = typeof document < "u";
function dl(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function xu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && dl(e.default);
}
const Te = Object.assign;
function vo(e, t) {
  const n = {};
  for (const s in t) {
    const o = t[s];
    n[s] = At(o) ? o.map(e) : e(o);
  }
  return n;
}
const rs = () => {
}, At = Array.isArray;
function oa(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const ul = /#/g, _u = /&/g, wu = /\//g, ku = /=/g, $u = /\?/g, pl = /\+/g, Su = /%5B/g, Cu = /%5D/g, fl = /%5E/g, Au = /%60/g, ml = /%7B/g, Eu = /%7C/g, hl = /%7D/g, Nu = /%20/g;
function di(e) {
  return e == null ? "" : encodeURI("" + e).replace(Eu, "|").replace(Su, "[").replace(Cu, "]");
}
function Tu(e) {
  return di(e).replace(ml, "{").replace(hl, "}").replace(fl, "^");
}
function jo(e) {
  return di(e).replace(pl, "%2B").replace(Nu, "+").replace(ul, "%23").replace(_u, "%26").replace(Au, "`").replace(ml, "{").replace(hl, "}").replace(fl, "^");
}
function Pu(e) {
  return jo(e).replace(ku, "%3D");
}
function Ru(e) {
  return di(e).replace(ul, "%23").replace($u, "%3F");
}
function Iu(e) {
  return Ru(e).replace(wu, "%2F");
}
function gs(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Mu = /\/$/, Ou = (e) => e.replace(Mu, "");
function yo(e, t, n = "/") {
  let s, o = {}, a = "", i = "";
  const l = t.indexOf("#");
  let d = t.indexOf("?");
  return d = l >= 0 && d > l ? -1 : d, d >= 0 && (s = t.slice(0, d), a = t.slice(d, l > 0 ? l : t.length), o = e(a.slice(1))), l >= 0 && (s = s || t.slice(0, l), i = t.slice(l, t.length)), s = Bu(s ?? t, n), {
    fullPath: s + a + i,
    path: s,
    query: o,
    hash: gs(i)
  };
}
function Du(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ia(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Lu(e, t, n) {
  const s = t.matched.length - 1, o = n.matched.length - 1;
  return s > -1 && s === o && Hn(t.matched[s], n.matched[o]) && gl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Hn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function gl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!qu(e[n], t[n])) return !1;
  return !0;
}
function qu(e, t) {
  return At(e) ? aa(e, t) : At(t) ? aa(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function aa(e, t) {
  return At(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Bu(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), o = s[s.length - 1];
  (o === ".." || o === ".") && s.push("");
  let a = n.length - 1, i, l;
  for (i = 0; i < s.length; i++)
    if (l = s[i], l !== ".")
      if (l === "..")
        a > 1 && a--;
      else break;
  return n.slice(0, a).join("/") + "/" + s.slice(i).join("/");
}
const sn = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let Ho = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), bo = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function ju(e) {
  if (!e) if (In) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Ou(e);
}
const Hu = /^[^#]+#/;
function Vu(e, t) {
  return e.replace(Hu, "#") + t;
}
function zu(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const eo = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Fu(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), o = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o)
      return;
    t = zu(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function ra(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Vo = /* @__PURE__ */ new Map();
function Uu(e, t) {
  Vo.set(e, t);
}
function Ku(e) {
  const t = Vo.get(e);
  return Vo.delete(e), t;
}
function Gu(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function vl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let He = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const yl = Symbol("");
He.MATCHER_NOT_FOUND + "", He.NAVIGATION_GUARD_REDIRECT + "", He.NAVIGATION_ABORTED + "", He.NAVIGATION_CANCELLED + "", He.NAVIGATION_DUPLICATED + "";
function Vn(e, t) {
  return Te(/* @__PURE__ */ new Error(), {
    type: e,
    [yl]: !0
  }, t);
}
function Vt(e, t) {
  return e instanceof Error && yl in e && (t == null || !!(e.type & t));
}
const Wu = [
  "params",
  "query",
  "hash"
];
function Yu(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Wu) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Ju(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const o = n[s].replace(pl, " "), a = o.indexOf("="), i = gs(a < 0 ? o : o.slice(0, a)), l = a < 0 ? null : gs(o.slice(a + 1));
    if (i in t) {
      let d = t[i];
      At(d) || (d = t[i] = [d]), d.push(l);
    } else t[i] = l;
  }
  return t;
}
function la(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Pu(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (At(s) ? s.map((o) => o && jo(o)) : [s && jo(s)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function Qu(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = At(s) ? s.map((o) => o == null ? null : "" + o) : s == null ? s : "" + s);
  }
  return t;
}
const Zu = Symbol(""), ca = Symbol(""), to = Symbol(""), ui = Symbol(""), zo = Symbol("");
function Yn() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const o = e.indexOf(s);
      o > -1 && e.splice(o, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function un(e, t, n, s, o, a = (i) => i()) {
  const i = s && (s.enterCallbacks[o] = s.enterCallbacks[o] || []);
  return () => new Promise((l, d) => {
    const u = (m) => {
      m === !1 ? d(Vn(He.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : m instanceof Error ? d(m) : Gu(m) ? d(Vn(He.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: m
      })) : (i && s.enterCallbacks[o] === i && typeof m == "function" && i.push(m), l());
    }, c = a(() => e.call(s && s.instances[o], t, n, u));
    let p = Promise.resolve(c);
    e.length < 3 && (p = p.then(u)), p.catch((m) => d(m));
  });
}
function xo(e, t, n, s, o = (a) => a()) {
  const a = [];
  for (const i of e)
    for (const l in i.components) {
      let d = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (dl(d)) {
          const u = (d.__vccOpts || d)[t];
          u && a.push(un(u, n, s, i, l, o));
        } else {
          let u = d();
          a.push(() => u.then((c) => {
            if (!c) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const p = xu(c) ? c.default : c;
            i.mods[l] = c, i.components[l] = p;
            const m = (p.__vccOpts || p)[t];
            return m && un(m, n, s, i, l, o)();
          }));
        }
    }
  return a;
}
function Xu(e, t) {
  const n = [], s = [], o = [], a = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < a; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => Hn(u, l)) ? s.push(l) : n.push(l));
    const d = e.matched[i];
    d && (t.matched.find((u) => Hn(u, d)) || o.push(d));
  }
  return [
    n,
    s,
    o
  ];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ep = () => location.protocol + "//" + location.host;
function bl(e, t) {
  const { pathname: n, search: s, hash: o } = t, a = e.indexOf("#");
  if (a > -1) {
    let i = o.includes(e.slice(a)) ? e.slice(a).length : 1, l = o.slice(i);
    return l[0] !== "/" && (l = "/" + l), ia(l, "");
  }
  return ia(n, e) + s + o;
}
function tp(e, t, n, s) {
  let o = [], a = [], i = null;
  const l = ({ state: m }) => {
    const g = bl(e, location), _ = n.value, $ = t.value;
    let I = 0;
    if (m) {
      if (n.value = g, t.value = m, i && i === _) {
        i = null;
        return;
      }
      I = $ ? m.position - $.position : 0;
    } else s(g);
    o.forEach((f) => {
      f(n.value, _, {
        delta: I,
        type: Ho.pop,
        direction: I ? I > 0 ? bo.forward : bo.back : bo.unknown
      });
    });
  };
  function d() {
    i = n.value;
  }
  function u(m) {
    o.push(m);
    const g = () => {
      const _ = o.indexOf(m);
      _ > -1 && o.splice(_, 1);
    };
    return a.push(g), g;
  }
  function c() {
    if (document.visibilityState === "hidden") {
      const { history: m } = window;
      if (!m.state) return;
      m.replaceState(Te({}, m.state, { scroll: eo() }), "");
    }
  }
  function p() {
    for (const m of a) m();
    a = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", c), document.removeEventListener("visibilitychange", c);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", c), document.addEventListener("visibilitychange", c), {
    pauseListeners: d,
    listen: u,
    destroy: p
  };
}
function da(e, t, n, s = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: o ? eo() : null
  };
}
function np(e) {
  const { history: t, location: n } = window, s = { value: bl(e, n) }, o = { value: t.state };
  o.value || a(s.value, {
    back: null,
    current: s.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function a(d, u, c) {
    const p = e.indexOf("#"), m = p > -1 ? (n.host && document.querySelector("base") ? e : e.slice(p)) + d : ep() + e + d;
    try {
      t[c ? "replaceState" : "pushState"](u, "", m), o.value = u;
    } catch (g) {
      console.error(g), n[c ? "replace" : "assign"](m);
    }
  }
  function i(d, u) {
    a(d, Te({}, t.state, da(o.value.back, d, o.value.forward, !0), u, { position: o.value.position }), !0), s.value = d;
  }
  function l(d, u) {
    const c = Te({}, o.value, t.state, {
      forward: d,
      scroll: eo()
    });
    a(c.current, c, !0), a(d, Te({}, da(s.value, d, null), { position: c.position + 1 }, u), !1), s.value = d;
  }
  return {
    location: s,
    state: o,
    push: l,
    replace: i
  };
}
function sp(e) {
  e = ju(e);
  const t = np(e), n = tp(e, t.state, t.location, t.replace);
  function s(a, i = !0) {
    i || n.pauseListeners(), history.go(a);
  }
  const o = Te({
    location: "",
    base: e,
    go: s,
    createHref: Vu.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
let Cn = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Ke = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Ke || {});
const op = {
  type: Cn.Static,
  value: ""
}, ip = /[a-zA-Z0-9_]/;
function ap(e) {
  if (!e) return [[]];
  if (e === "/") return [[op]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${u}": ${g}`);
  }
  let n = Ke.Static, s = n;
  const o = [];
  let a;
  function i() {
    a && o.push(a), a = [];
  }
  let l = 0, d, u = "", c = "";
  function p() {
    u && (n === Ke.Static ? a.push({
      type: Cn.Static,
      value: u
    }) : n === Ke.Param || n === Ke.ParamRegExp || n === Ke.ParamRegExpEnd ? (a.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), a.push({
      type: Cn.Param,
      value: u,
      regexp: c,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), u = "");
  }
  function m() {
    u += d;
  }
  for (; l < e.length; ) {
    if (d = e[l++], d === "\\" && n !== Ke.ParamRegExp) {
      s = n, n = Ke.EscapeNext;
      continue;
    }
    switch (n) {
      case Ke.Static:
        d === "/" ? (u && p(), i()) : d === ":" ? (p(), n = Ke.Param) : m();
        break;
      case Ke.EscapeNext:
        m(), n = s;
        break;
      case Ke.Param:
        d === "(" ? n = Ke.ParamRegExp : ip.test(d) ? m() : (p(), n = Ke.Static, d !== "*" && d !== "?" && d !== "+" && l--);
        break;
      case Ke.ParamRegExp:
        d === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + d : n = Ke.ParamRegExpEnd : c += d;
        break;
      case Ke.ParamRegExpEnd:
        p(), n = Ke.Static, d !== "*" && d !== "?" && d !== "+" && l--, c = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === Ke.ParamRegExp && t(`Unfinished custom RegExp for param "${u}"`), p(), i(), o;
}
const ua = "[^/]+?", rp = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var at = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(at || {});
const lp = /[.+*?^${}()[\]/\\]/g;
function cp(e, t) {
  const n = Te({}, rp, t), s = [];
  let o = n.start ? "^" : "";
  const a = [];
  for (const u of e) {
    const c = u.length ? [] : [at.Root];
    n.strict && !u.length && (o += "/");
    for (let p = 0; p < u.length; p++) {
      const m = u[p];
      let g = at.Segment + (n.sensitive ? at.BonusCaseSensitive : 0);
      if (m.type === Cn.Static)
        p || (o += "/"), o += m.value.replace(lp, "\\$&"), g += at.Static;
      else if (m.type === Cn.Param) {
        const { value: _, repeatable: $, optional: I, regexp: f } = m;
        a.push({
          name: _,
          repeatable: $,
          optional: I
        });
        const h = f || ua;
        if (h !== ua) {
          g += at.BonusCustomRegExp;
          try {
            `${h}`;
          } catch (L) {
            throw new Error(`Invalid custom RegExp for param "${_}" (${h}): ` + L.message);
          }
        }
        let O = $ ? `((?:${h})(?:/(?:${h}))*)` : `(${h})`;
        p || (O = I && u.length < 2 ? `(?:/${O})` : "/" + O), I && (O += "?"), o += O, g += at.Dynamic, I && (g += at.BonusOptional), $ && (g += at.BonusRepeatable), h === ".*" && (g += at.BonusWildcard);
      }
      c.push(g);
    }
    s.push(c);
  }
  if (n.strict && n.end) {
    const u = s.length - 1;
    s[u][s[u].length - 1] += at.BonusStrict;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function l(u) {
    const c = u.match(i), p = {};
    if (!c) return null;
    for (let m = 1; m < c.length; m++) {
      const g = c[m] || "", _ = a[m - 1];
      p[_.name] = g && _.repeatable ? g.split("/") : g;
    }
    return p;
  }
  function d(u) {
    let c = "", p = !1;
    for (const m of e) {
      (!p || !c.endsWith("/")) && (c += "/"), p = !1;
      for (const g of m) if (g.type === Cn.Static) c += g.value;
      else if (g.type === Cn.Param) {
        const { value: _, repeatable: $, optional: I } = g, f = _ in u ? u[_] : "";
        if (At(f) && !$) throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);
        const h = At(f) ? f.join("/") : f;
        if (!h) if (I)
          m.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : p = !0);
        else throw new Error(`Missing required param "${_}"`);
        c += h;
      }
    }
    return c || "/";
  }
  return {
    re: i,
    score: s,
    keys: a,
    parse: l,
    stringify: d
  };
}
function dp(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === at.Static + at.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === at.Static + at.Segment ? 1 : -1 : 0;
}
function xl(e, t) {
  let n = 0;
  const s = e.score, o = t.score;
  for (; n < s.length && n < o.length; ) {
    const a = dp(s[n], o[n]);
    if (a) return a;
    n++;
  }
  if (Math.abs(o.length - s.length) === 1) {
    if (pa(s)) return 1;
    if (pa(o)) return -1;
  }
  return o.length - s.length;
}
function pa(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const up = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function pp(e, t, n) {
  const s = cp(ap(e.path), n), o = Te(s, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function fp(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = oa(up, t);
  function o(p) {
    return s.get(p);
  }
  function a(p, m, g) {
    const _ = !g, $ = ma(p);
    $.aliasOf = g && g.record;
    const I = oa(t, p), f = [$];
    if ("alias" in p) {
      const L = typeof p.alias == "string" ? [p.alias] : p.alias;
      for (const b of L) f.push(ma(Te({}, $, {
        components: g ? g.record.components : $.components,
        path: b,
        aliasOf: g ? g.record : $
      })));
    }
    let h, O;
    for (const L of f) {
      const { path: b } = L;
      if (m && b[0] !== "/") {
        const R = m.record.path, A = R[R.length - 1] === "/" ? "" : "/";
        L.path = m.record.path + (b && A + b);
      }
      if (h = pp(L, m, I), g ? g.alias.push(h) : (O = O || h, O !== h && O.alias.push(h), _ && p.name && !ha(h) && i(p.name)), _l(h) && d(h), $.children) {
        const R = $.children;
        for (let A = 0; A < R.length; A++) a(R[A], h, g && g.children[A]);
      }
      g = g || h;
    }
    return O ? () => {
      i(O);
    } : rs;
  }
  function i(p) {
    if (vl(p)) {
      const m = s.get(p);
      m && (s.delete(p), n.splice(n.indexOf(m), 1), m.children.forEach(i), m.alias.forEach(i));
    } else {
      const m = n.indexOf(p);
      m > -1 && (n.splice(m, 1), p.record.name && s.delete(p.record.name), p.children.forEach(i), p.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function d(p) {
    const m = gp(p, n);
    n.splice(m, 0, p), p.record.name && !ha(p) && s.set(p.record.name, p);
  }
  function u(p, m) {
    let g, _ = {}, $, I;
    if ("name" in p && p.name) {
      if (g = s.get(p.name), !g) throw Vn(He.MATCHER_NOT_FOUND, { location: p });
      I = g.record.name, _ = Te(fa(m.params, g.keys.filter((O) => !O.optional).concat(g.parent ? g.parent.keys.filter((O) => O.optional) : []).map((O) => O.name)), p.params && fa(p.params, g.keys.map((O) => O.name))), $ = g.stringify(_);
    } else if (p.path != null)
      $ = p.path, g = n.find((O) => O.re.test($)), g && (_ = g.parse($), I = g.record.name);
    else {
      if (g = m.name ? s.get(m.name) : n.find((O) => O.re.test(m.path)), !g) throw Vn(He.MATCHER_NOT_FOUND, {
        location: p,
        currentLocation: m
      });
      I = g.record.name, _ = Te({}, m.params, p.params), $ = g.stringify(_);
    }
    const f = [];
    let h = g;
    for (; h; )
      f.unshift(h.record), h = h.parent;
    return {
      name: I,
      path: $,
      params: _,
      matched: f,
      meta: hp(f)
    };
  }
  e.forEach((p) => a(p));
  function c() {
    n.length = 0, s.clear();
  }
  return {
    addRoute: a,
    resolve: u,
    removeRoute: i,
    clearRoutes: c,
    getRoutes: l,
    getRecordMatcher: o
  };
}
function fa(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function ma(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: mp(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function mp(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function ha(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function hp(e) {
  return e.reduce((t, n) => Te(t, n.meta), {});
}
function gp(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const a = n + s >> 1;
    xl(e, t[a]) < 0 ? s = a : n = a + 1;
  }
  const o = vp(e);
  return o && (s = t.lastIndexOf(o, s - 1)), s;
}
function vp(e) {
  let t = e;
  for (; t = t.parent; ) if (_l(t) && xl(e, t) === 0) return t;
}
function _l({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function ga(e) {
  const t = kt(to), n = kt(ui), s = _e(() => {
    const d = C(e.to);
    return t.resolve(d);
  }), o = _e(() => {
    const { matched: d } = s.value, { length: u } = d, c = d[u - 1], p = n.matched;
    if (!c || !p.length) return -1;
    const m = p.findIndex(Hn.bind(null, c));
    if (m > -1) return m;
    const g = va(d[u - 2]);
    return u > 1 && va(c) === g && p[p.length - 1].path !== g ? p.findIndex(Hn.bind(null, d[u - 2])) : m;
  }), a = _e(() => o.value > -1 && wp(n.params, s.value.params)), i = _e(() => o.value > -1 && o.value === n.matched.length - 1 && gl(n.params, s.value.params));
  function l(d = {}) {
    if (_p(d)) {
      const u = t[C(e.replace) ? "replace" : "push"](C(e.to)).catch(rs);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: _e(() => s.value.href),
    isActive: a,
    isExactActive: i,
    navigate: l
  };
}
function yp(e) {
  return e.length === 1 ? e[0] : e;
}
const bp = /* @__PURE__ */ Pr({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: ga,
  setup(e, { slots: t }) {
    const n = /* @__PURE__ */ ze(ga(e)), { options: s } = kt(to), o = _e(() => ({
      [ya(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      [ya(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const a = t.default && yp(t.default(n));
      return e.custom ? a : li("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: o.value
      }, a);
    };
  }
}), xp = bp;
function _p(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function wp(e, t) {
  for (const n in t) {
    const s = t[n], o = e[n];
    if (typeof s == "string") {
      if (s !== o) return !1;
    } else if (!At(o) || o.length !== s.length || s.some((a, i) => a.valueOf() !== o[i].valueOf())) return !1;
  }
  return !0;
}
function va(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ya = (e, t, n) => e ?? t ?? n, kp = /* @__PURE__ */ Pr({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    const s = kt(zo), o = _e(() => e.route || s.value), a = kt(ca, 0), i = _e(() => {
      let u = C(a);
      const { matched: c } = o.value;
      let p;
      for (; (p = c[u]) && !p.components; ) u++;
      return u;
    }), l = _e(() => o.value.matched[i.value]);
    Ns(ca, _e(() => i.value + 1)), Ns(Zu, l), Ns(zo, o);
    const d = /* @__PURE__ */ pe();
    return ct(() => [
      d.value,
      l.value,
      e.name
    ], ([u, c, p], [m, g, _]) => {
      c && (c.instances[p] = u, g && g !== c && u && u === m && (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards), c.updateGuards.size || (c.updateGuards = g.updateGuards))), u && c && (!g || !Hn(c, g) || !m) && (c.enterCallbacks[p] || []).forEach(($) => $(u));
    }, { flush: "post" }), () => {
      const u = o.value, c = e.name, p = l.value, m = p && p.components[c];
      if (!m) return ba(n.default, {
        Component: m,
        route: u
      });
      const g = p.props[c], _ = g ? g === !0 ? u.params : typeof g == "function" ? g(u) : g : null, I = li(m, Te({}, _, t, {
        onVnodeUnmounted: (f) => {
          f.component.isUnmounted && (p.instances[c] = null);
        },
        ref: d
      }));
      return ba(n.default, {
        Component: I,
        route: u
      }) || I;
    };
  }
});
function ba(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const $p = kp;
function Sp(e) {
  const t = fp(e.routes, e), n = e.parseQuery || Ju, s = e.stringifyQuery || la, o = e.history, a = Yn(), i = Yn(), l = Yn(), d = /* @__PURE__ */ yc(sn);
  let u = sn;
  In && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const c = vo.bind(null, (z) => "" + z), p = vo.bind(null, Iu), m = vo.bind(null, gs);
  function g(z, ne) {
    let J, ae;
    return vl(z) ? (J = t.getRecordMatcher(z), ae = ne) : ae = z, t.addRoute(ae, J);
  }
  function _(z) {
    const ne = t.getRecordMatcher(z);
    ne && t.removeRoute(ne);
  }
  function $() {
    return t.getRoutes().map((z) => z.record);
  }
  function I(z) {
    return !!t.getRecordMatcher(z);
  }
  function f(z, ne) {
    if (ne = Te({}, ne || d.value), typeof z == "string") {
      const E = yo(n, z, ne.path), B = t.resolve({ path: E.path }, ne), F = o.createHref(E.fullPath);
      return Te(E, B, {
        params: m(B.params),
        hash: gs(E.hash),
        redirectedFrom: void 0,
        href: F
      });
    }
    let J;
    if (z.path != null)
      J = Te({}, z, { path: yo(n, z.path, ne.path).path });
    else {
      const E = Te({}, z.params);
      for (const B in E) E[B] == null && delete E[B];
      J = Te({}, z, { params: p(E) }), ne.params = p(ne.params);
    }
    const ae = t.resolve(J, ne), we = z.hash || "";
    ae.params = c(m(ae.params));
    const v = Du(s, Te({}, z, {
      hash: Tu(we),
      path: ae.path
    })), x = o.createHref(v);
    return Te({
      fullPath: v,
      hash: we,
      query: s === la ? Qu(z.query) : z.query || {}
    }, ae, {
      redirectedFrom: void 0,
      href: x
    });
  }
  function h(z) {
    return typeof z == "string" ? yo(n, z, d.value.path) : Te({}, z);
  }
  function O(z, ne) {
    if (u !== z) return Vn(He.NAVIGATION_CANCELLED, {
      from: ne,
      to: z
    });
  }
  function L(z) {
    return A(z);
  }
  function b(z) {
    return L(Te(h(z), { replace: !0 }));
  }
  function R(z, ne) {
    const J = z.matched[z.matched.length - 1];
    if (J && J.redirect) {
      const { redirect: ae } = J;
      let we = typeof ae == "function" ? ae(z, ne) : ae;
      return typeof we == "string" && (we = we.includes("?") || we.includes("#") ? we = h(we) : { path: we }, we.params = {}), Te({
        query: z.query,
        hash: z.hash,
        params: we.path != null ? {} : z.params
      }, we);
    }
  }
  function A(z, ne) {
    const J = u = f(z), ae = d.value, we = z.state, v = z.force, x = z.replace === !0, E = R(J, ae);
    if (E) return A(Te(h(E), {
      state: typeof E == "object" ? Te({}, we, E.state) : we,
      force: v,
      replace: x
    }), ne || J);
    const B = J;
    B.redirectedFrom = ne;
    let F;
    return !v && Lu(s, ae, J) && (F = Vn(He.NAVIGATION_DUPLICATED, {
      to: B,
      from: ae
    }), We(ae, ae, !0, !1)), (F ? Promise.resolve(F) : M(B, ae)).catch((V) => Vt(V) ? Vt(V, He.NAVIGATION_GUARD_REDIRECT) ? V : qe(V) : xe(V, B, ae)).then((V) => {
      if (V) {
        if (Vt(V, He.NAVIGATION_GUARD_REDIRECT))
          return A(Te({ replace: x }, h(V.to), {
            state: typeof V.to == "object" ? Te({}, we, V.to.state) : we,
            force: v
          }), ne || B);
      } else V = j(B, ae, !0, x, we);
      return H(B, ae, V), V;
    });
  }
  function D(z, ne) {
    const J = O(z, ne);
    return J ? Promise.reject(J) : Promise.resolve();
  }
  function N(z) {
    const ne = tn.values().next().value;
    return ne && typeof ne.runWithContext == "function" ? ne.runWithContext(z) : z();
  }
  function M(z, ne) {
    let J;
    const [ae, we, v] = Xu(z, ne);
    J = xo(ae.reverse(), "beforeRouteLeave", z, ne);
    for (const E of ae) E.leaveGuards.forEach((B) => {
      J.push(un(B, z, ne));
    });
    const x = D.bind(null, z, ne);
    return J.push(x), dt(J).then(() => {
      J = [];
      for (const E of a.list()) J.push(un(E, z, ne));
      return J.push(x), dt(J);
    }).then(() => {
      J = xo(we, "beforeRouteUpdate", z, ne);
      for (const E of we) E.updateGuards.forEach((B) => {
        J.push(un(B, z, ne));
      });
      return J.push(x), dt(J);
    }).then(() => {
      J = [];
      for (const E of v) if (E.beforeEnter) if (At(E.beforeEnter)) for (const B of E.beforeEnter) J.push(un(B, z, ne));
      else J.push(un(E.beforeEnter, z, ne));
      return J.push(x), dt(J);
    }).then(() => (z.matched.forEach((E) => E.enterCallbacks = {}), J = xo(v, "beforeRouteEnter", z, ne, N), J.push(x), dt(J))).then(() => {
      J = [];
      for (const E of i.list()) J.push(un(E, z, ne));
      return J.push(x), dt(J);
    }).catch((E) => Vt(E, He.NAVIGATION_CANCELLED) ? E : Promise.reject(E));
  }
  function H(z, ne, J) {
    l.list().forEach((ae) => N(() => ae(z, ne, J)));
  }
  function j(z, ne, J, ae, we) {
    const v = O(z, ne);
    if (v) return v;
    const x = ne === sn, E = In ? history.state : {};
    J && (ae || x ? o.replace(z.fullPath, Te({ scroll: x && E && E.scroll }, we)) : o.push(z.fullPath, we)), d.value = z, We(z, ne, J, x), qe();
  }
  let te;
  function Z() {
    te || (te = o.listen((z, ne, J) => {
      if (!Bt.listening) return;
      const ae = f(z), we = R(ae, Bt.currentRoute.value);
      if (we) {
        A(Te(we, {
          replace: !0,
          force: !0
        }), ae).catch(rs);
        return;
      }
      u = ae;
      const v = d.value;
      In && Uu(ra(v.fullPath, J.delta), eo()), M(ae, v).catch((x) => Vt(x, He.NAVIGATION_ABORTED | He.NAVIGATION_CANCELLED) ? x : Vt(x, He.NAVIGATION_GUARD_REDIRECT) ? (A(Te(h(x.to), { force: !0 }), ae).then((E) => {
        Vt(E, He.NAVIGATION_ABORTED | He.NAVIGATION_DUPLICATED) && !J.delta && J.type === Ho.pop && o.go(-1, !1);
      }).catch(rs), Promise.reject()) : (J.delta && o.go(-J.delta, !1), xe(x, ae, v))).then((x) => {
        x = x || j(ae, v, !1), x && (J.delta && !Vt(x, He.NAVIGATION_CANCELLED) ? o.go(-J.delta, !1) : J.type === Ho.pop && Vt(x, He.NAVIGATION_ABORTED | He.NAVIGATION_DUPLICATED) && o.go(-1, !1)), H(ae, v, x);
      }).catch(rs);
    }));
  }
  let fe = Yn(), Ce = Yn(), be;
  function xe(z, ne, J) {
    qe(z);
    const ae = Ce.list();
    return ae.length ? ae.forEach((we) => we(z, ne, J)) : console.error(z), Promise.reject(z);
  }
  function Oe() {
    return be && d.value !== sn ? Promise.resolve() : new Promise((z, ne) => {
      fe.add([z, ne]);
    });
  }
  function qe(z) {
    return be || (be = !z, Z(), fe.list().forEach(([ne, J]) => z ? J(z) : ne()), fe.reset()), z;
  }
  function We(z, ne, J, ae) {
    const { scrollBehavior: we } = e;
    if (!In || !we) return Promise.resolve();
    const v = !J && Ku(ra(z.fullPath, 0)) || (ae || !J) && history.state && history.state.scroll || null;
    return Yt().then(() => we(z, ne, v)).then((x) => x && Fu(x)).catch((x) => xe(x, z, ne));
  }
  const Je = (z) => o.go(z);
  let qt;
  const tn = /* @__PURE__ */ new Set(), Bt = {
    currentRoute: d,
    listening: !0,
    addRoute: g,
    removeRoute: _,
    clearRoutes: t.clearRoutes,
    hasRoute: I,
    getRoutes: $,
    resolve: f,
    options: e,
    push: L,
    replace: b,
    go: Je,
    back: () => Je(-1),
    forward: () => Je(1),
    beforeEach: a.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: Ce.add,
    isReady: Oe,
    install(z) {
      z.component("RouterLink", xp), z.component("RouterView", $p), z.config.globalProperties.$router = Bt, Object.defineProperty(z.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => C(d)
      }), In && !qt && d.value === sn && (qt = !0, L(o.location).catch((ae) => {
      }));
      const ne = {};
      for (const ae in sn) Object.defineProperty(ne, ae, {
        get: () => d.value[ae],
        enumerable: !0
      });
      z.provide(to, Bt), z.provide(ui, /* @__PURE__ */ mr(ne)), z.provide(zo, d);
      const J = z.unmount;
      tn.add(z), z.unmount = function() {
        tn.delete(z), tn.size < 1 && (u = sn, te && te(), te = null, d.value = sn, qt = !1, be = !1), J();
      };
    }
  };
  function dt(z) {
    return z.reduce((ne, J) => ne.then(() => N(J)), Promise.resolve());
  }
  return Bt;
}
function pi() {
  return kt(to);
}
function wl(e) {
  return kt(ui);
}
function Tn(e, t) {
  return t = t || 16, `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${kl[e] || ""}</svg>`;
}
const kl = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  pay: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  bank: '<path d="M3 22h18M6 18v-7m4 7v-7m4 7v-7m4 7v-7M3 7l9-5 9 5H3z"/>',
  accts: '<path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 14v-4M8 14v-2M16 14v-3"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  purchase: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  print: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  warehouse: '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  users: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  quote: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  order: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  recurring: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  creditnote: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>',
  truck: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  vendors: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  badge: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="10" r="2.5"/><path d="M7 18c0-2.5 2.2-4 5-4s5 1.5 5 4"/>',
  fileplus: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>',
  payment: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',
  rupee: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  coa: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  journal: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  opening: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  costcenter: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  fiscal: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M17 12h.01M7 12h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  cancel: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  chevD: '<polyline points="6 9 12 15 18 9"/>',
  chevR: '<polyline points="9 18 15 12 9 6"/>',
  chevL: '<polyline points="15 18 9 12 15 6"/>',
  chevU: '<polyline points="18 15 12 9 6 15"/>',
  balance: '<path d="M12 3v18M3 9l9-6 9 6M3 15l9 6 9-6"/>',
  expense: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>',
  claim: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 13 11 15 15 11"/>',
  warehouse: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M12 12h.01"/>',
  ledger: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="12" y1="6" x2="16" y2="6"/><line x1="12" y1="10" x2="16" y2="10"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  stack: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  qr: '<rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/>',
  gstfile: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/><circle cx="16" cy="17" r="1.5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  percent: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  building: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  audit: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  org: '<circle cx="12" cy="5" r="3"/><path d="M6 12h12M9 12v6M15 12v6M6 22h12"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="19" r="3"/>',
  webhook: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  "user-plus": '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
  hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  currency: '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="12" y1="3" x2="12" y2="6"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  sparkle: '<path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  play: '<polygon points="6 4 20 12 6 20 6 4"/>',
  repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  // ── Previously missing icons (used in Invoice view drawer) ──
  printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  delete: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>',
  indianrupee: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  indianrupees: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  "map-pin": '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  "message-circle": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  "sticky-note": '<path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"/><polyline points="15 3 15 9 21 9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  "x-circle": '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  "alert-circle": '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
}, Cp = ["width", "height", "innerHTML"], gt = {
  __name: "IconSvg",
  props: {
    name: { type: String, required: !0 },
    size: { type: [Number, String], default: 16 }
  },
  setup(e) {
    const t = e, n = _e(() => kl[t.name] || "");
    return (s, o) => (w(), S("svg", {
      width: e.size,
      height: e.size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      innerHTML: n.value
    }, null, 8, Cp));
  }
}, Fo = [
  { path: "/dashboard", label: "Dashboard", icon: "grid", module: null },
  { section: "Projects" },
  { path: "/projects", label: "Projects", icon: "folder", module: "inventory" },
  // { section: "Delivery" },  // hidden for Sava
  // Sales items hidden for Sava (Phase 1 is inventory and purchase only).
  // To show again, uncomment the line.
  // { path: "/quotes",                        label: "Quotes",       icon: "quote",      module: "invoices"   },
  // { path: "/sales-orders",                  label: "Sales Orders",     icon: "order",      module: "invoices"   },
  // { path: "/invoices",                      label: "Invoices",         icon: "file",       module: "invoices"   },
  // { path: "/recurring",                     label: "Recurring",        icon: "recurring",  module: "invoices"   },
  // { path: "/delivery-challans",             label: "Delivery Notes",    icon: "truck",      module: "inventory"  },  // moved to Purchases
  // { path: "/payments-received",             label: "Payments Received",icon: "rupee",      module: "payments"   },
  // { path: "/credit-notes",                  label: "Credit Notes",     icon: "creditnote", module: "invoices"   },
  // { path: "/proforma-invoices",             label: "Proforma Invoices",icon: "file",       module: "invoices"   },
  // { path: "/eway-bills",                    label: "E-Way Bills",      icon: "truck",      module: "invoices"   },  // hidden for Sava
  { section: "Purchases" },
  // { path: "/expenses",                      label: "Expenses",         icon: "expense",    module: "bills"      },  // hidden for Sava (Purchases)
  // { path: "/expenses/categories",           label: "Expense Categories", icon: "folder",   module: "bills"      },  // hidden for Sava (Purchases)
  { path: "/manufacturing/material-request", label: "Material Requests", icon: "purchase", module: "inventory", doctype: "Material Request" },
  { path: "/rfqs", label: "Request for Quotation", icon: "purchase", module: "bills" },
  { path: "/purchase-orders", label: "Purchase Orders", icon: "purchase", module: "bills", doctype: "Purchase Order" },
  { path: "/purchase-receipts", label: "GRN", icon: "purchase", module: "inventory" },
  // also shown to anyone who may read Purchase Orders (Store Keeper: marks goods received)
  { path: "/delivery-challans", label: "Delivery Notes", icon: "truck", module: "inventory" },
  // { path: "/purchases",                     label: "Bills",            icon: "fileplus",   module: "bills"      },  // hidden (sidebar)
  // { path: "/recurring-bills",               label: "Recurring Bills",  icon: "recurring",  module: "bills"      },  // hidden (sidebar)
  // { path: "/purchasing/landed-cost-vouchers", label: "Landed Costs",   icon: "balance",    module: "bills"      },  // hidden for Sava (Purchases)
  // { path: "/payments",                      label: "Payments Made",    icon: "payment",    module: "payments"   },  // hidden for Sava (Purchases)
  // { path: "/debit-notes",                   label: "Debit Notes",      icon: "creditnote", module: "bills"      },  // hidden for Sava (Purchases)
  { section: "Contacts" },
  // { path: "/customers",                     label: "Customers",        icon: "users",      module: "customers"  },  // hidden for Sava (Contacts)
  { path: "/vendors", label: "Vendors", icon: "vendors", module: "customers" },
  // { path: "/sales-persons",                 label: "Sales Persons",    icon: "badge",      module: "customers"  },  // hidden for Sava (Contacts)
  // { section: "Banking" },  // hidden for Sava (Banking)
  // { path: "/banking/accounts",              label: "Bank Accounts",    icon: "bank",       module: "banking"    },  // hidden for Sava (Banking)
  // { path: "/banking/transactions",          label: "Transactions",     icon: "ledger",     module: "banking"    },  // hidden for Sava (Banking)
  // { path: "/banking/reconciliation",        label: "Reconciliation",   icon: "balance",    module: "banking"    },  // hidden for Sava (Banking)
  // { path: "/banking/transfers",             label: "Transfers",        icon: "share",      module: "banking"    },  // hidden for Sava (Banking)
  // { path: "/banking/cheques",               label: "Cheques",          icon: "file",       module: "banking"    },  // hidden for Sava (Banking)
  // { path: "/banking/cash",                  label: "Cash",             icon: "cash",       module: "banking"    },  // hidden for Sava (Banking)
  // { section: "Accounting" },  // hidden for Sava (Accounting)
  // { path: "/accounting/chart-of-accounts",  label: "Chart of Accounts",icon: "coa",        module: "accounts"   },  // hidden for Sava (Accounting)
  // { path: "/accounting/journal-entries",    label: "Journal Entries",  icon: "journal",    module: "accounts"   },  // hidden for Sava (Accounting)
  // { path: "/accounting/opening-balances",   label: "Opening Balances", icon: "opening",    module: "accounts"   },  // hidden for Sava (Accounting)
  // { path: "/accounting/cost-centers",       label: "Cost Centers",     icon: "costcenter", module: "accounts"   },  // hidden for Sava (Accounting)
  // { path: "/accounting/fiscal-years",       label: "Fiscal Years",     icon: "fiscal",     module: "accounts"   },  // hidden for Sava (Accounting)
  { section: "Inventory" },
  { path: "/inventory/items", label: "Items", icon: "box", module: "inventory" },
  { path: "/inventory/item-groups", label: "Item Groups", icon: "folder", module: "inventory" },
  { path: "/inventory/warehouses", label: "Warehouses", icon: "warehouse", module: "inventory" },
  // { path: "/manufacturing/material-request",  label: "Material Requests", icon: "purchase",   module: "inventory" },  // moved to Purchases for Sava
  { path: "/inventory/opening-stock", label: "Opening Stock", icon: "opening", module: "inventory" },
  { path: "/inventory/stock-entries", label: "Stock Entries", icon: "stack", module: "inventory" },
  // { path: "/inventory/adjustments",         label: "Stock Adjustments", icon: "repeat",    module: "inventory"  },  // hidden for Sava (Inventory)
  { path: "/inventory/stock-ledger", label: "Stock Ledger", icon: "ledger", module: "inventory" },
  // { path: "/inventory/valuation",           label: "Valuation",        icon: "chart",      module: "inventory"  },  // hidden for Sava (Inventory)
  // { path: "/inventory/reorder-alerts",      label: "Reorder Alerts",   icon: "alert",      module: "inventory"  },  // hidden for Sava
  // { path: "/inventory/price-lists",         label: "Price Lists",      icon: "rupee",      module: "inventory"  },  // hidden for Sava (Inventory)
  // { path: "/inventory/batches",             label: "Batch Tracking",   icon: "qr",         module: "inventory"  },  // hidden for Sava
  { path: "/inventory/settings", label: "Settings", icon: "gear", module: "inventory" },
  // { section: "Assets" },  // hidden for Sava
  // { path: "/assets",                        label: "Assets",           icon: "box",        module: "inventory"  },  // hidden for Sava
  // { path: "/assets/asset-category",         label: "Asset Category",   icon: "folder",     module: "inventory"  },  // hidden for Sava
  // { path: "/assets/disposals",               label: "Asset Disposals",  icon: "trash",      module: "inventory"  },  // hidden for Sava
  // { path: "/assets/movements",              label: "Asset Movements",  icon: "truck",      module: "inventory"  },  // hidden for Sava
  // { path: "/assets/repairs",                label: "Asset Repairs",    icon: "gear",       module: "inventory"  },  // hidden for Sava
  // { path: "/assets/value-adjustments",      label: "Value Adjustments",icon: "balance",    module: "inventory"  },  // hidden for Sava
  // { path: "/assets/quantity-adjustments",   label: "Quantity Write-offs", icon: "alert",   module: "inventory"  },  // hidden for Sava
  // { path: "/assets/reports",                label: "Asset Reports",    icon: "chart",      module: "inventory"  },  // hidden for Sava
  // { path: "/assets/department",             label: "Department",       icon: "users",      module: "inventory"  },  // hidden for Sava
  // { path: "/assets/depreciation-schedule",  label: "Depreciation Schedule", icon: "calendar", module: "inventory"  },  // hidden for Sava
  // { path: "/assets/maintenance-log",        label: "Maintenance Log",  icon: "gear",       module: "inventory"  },  // hidden for Sava
  // { section: "Quality" },  // hidden for Sava (Quality)
  // { path: "/quality/inspections",           label: "Inspections",      icon: "shield",     module: "inventory"  },  // hidden for Sava (Quality)
  // { path: "/quality/templates",             label: "QC Templates",     icon: "file",       module: "inventory"  },  // hidden for Sava (Quality)
  // { path: "/quality/approvals",             label: "QC Approvals",     icon: "check",      module: "inventory"  },  // hidden for Sava (Quality)
  // { section: "Manufacturing" },  // hidden for Sava
  // { path: "/manufacturing",                    label: "Dashboard",        icon: "grid",       module: "inventory" },
  // Setup — masters used to define how things are made
  // { path: "/manufacturing/workstation-type",  label: "Workstation Types",icon: "badge",      module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/workstation",       label: "Workstations",     icon: "gear",       module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/operation",         label: "Operations",       icon: "stack",      module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/routing",           label: "Routing",          icon: "recurring",  module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/bom",               label: "Bill of Materials", icon: "box",        module: "inventory" },  // hidden for Sava
  // Plan — decide what and how much to make
  // { path: "/manufacturing/production-plan",   label: "Production Plan",  icon: "chart",      module: "inventory" },  // hidden for Sava
  // Execute — run production day to day
  // { path: "/manufacturing/work-order",        label: "Work Orders",      icon: "order",      module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/job-card",          label: "Job Cards",        icon: "stack",      module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/packing-slip",      label: "Packing Slips",     icon: "box",        module: "inventory" },  // hidden for Sava
  // Exceptions — substitutions when the plan doesn't hold
  // { path: "/manufacturing/alternative-item", label: "Alternative Items",   icon: "stack", module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/material-substitutions", label: "Substitution Approvals", icon: "check", module: "inventory" },  // hidden for Sava
  // Insights & configuration
  // { path: "/manufacturing/reports",          label: "Mfg Reports",         icon: "chart",      module: "inventory" },  // hidden for Sava
  // { path: "/manufacturing/settings",         label: "Mfg Settings",        icon: "gear",       module: "inventory" },  // hidden for Sava
  { section: "Taxes" },
  { path: "/gst/tax-templates", label: "Tax Templates", icon: "percent", module: "taxes" },
  // { path: "/gst/gstr1",                     label: "GSTR-1",           icon: "gstfile",    module: "accounts"   },  // hidden for Sava
  // { path: "/gst/gstr3b",                    label: "GSTR-3B",          icon: "gstfile",    module: "accounts"   },  // hidden for Sava
  // { path: "/gst/einvoice",                  label: "e-Invoice",        icon: "qr",         module: "accounts"   },  // hidden for Sava
  // { path: "/gst/tds",                       label: "TDS",              icon: "percent",    module: "accounts"   },  // hidden for Sava
  { section: "Reports" },
  { path: "/reports", label: "All Reports", icon: "chart", module: "reports" },
  { path: "/bulk-import", label: "Bulk Import", icon: "fileplus", module: "admin" },
  { section: "Settings" },
  { path: "/settings/users", label: "Users", icon: "users", module: "admin" },
  { path: "/employees", label: "Employees", icon: "user", module: "admin" },
  { path: "/settings/profile", label: "My Profile", icon: "user", module: null },
  { path: "/settings/company", label: "Company", icon: "building", module: "admin" },
  { path: "/settings/email", label: "Email & SMTP", icon: "mail", module: "admin" },
  { path: "/settings/email-templates", label: "Email Templates", icon: "mail", module: "admin" }
  // { path: "/settings/number-series",        label: "Number Series",    icon: "hash",       module: "admin"      },
  // { path: "/settings/payment-terms",        label: "Payment Terms",    icon: "calendar",   module: "admin"      },
  // { path: "/settings/currency-exchange", label: "Currency", icon: "currency", module: "admin" }, // KES-only: hidden
  // { path: "/settings/roles",                label: "Roles",            icon: "shield",     module: "admin"      },  // hidden for Sava: roles are the 4 job roles
  // { path: "/settings/organization",         label: "Organization",     icon: "org",        module: "admin"      },
  // { path: "/settings/security",             label: "Security",         icon: "lock",       module: null         },
  // { path: "/settings/sso",                  label: "Single Sign-On",   icon: "shield",     module: "admin"      },  // hidden for Sava
  // { path: "/settings/audit-log",            label: "Audit Log",        icon: "audit",      module: "admin"      },
  // { path: "/settings/integrations",         label: "Integrations",     icon: "webhook",    module: "admin"      },  // hidden for Sava
], Cs = Object.fromEntries(
  Fo.filter((e) => e.path).map((e) => [e.path, e.label])
);
function Ap(e) {
  if (Cs[e]) return Cs[e];
  const t = Object.keys(Cs).filter((n) => e.startsWith(n) && n !== "/").sort((n, s) => s.length - n.length)[0];
  return Cs[t] || "Books";
}
const Ee = /* @__PURE__ */ ze({
  user: "",
  fullname: "",
  company: "",
  isNewUser: !1,
  permissions: {
    books_role: "",
    is_company_admin: !1,
    read_only: !1,
    mod_invoices: !1,
    mod_bills: !1,
    mod_payments: !1,
    mod_banking: !1,
    mod_inventory: !1,
    mod_accounts: !1,
    mod_reports: !1,
    mod_customers: !1,
    mod_taxes: !1,
    mod_admin: !1,
    // Per-module granular level ("None"|"View"|"Create"|"Edit"|"Delete"),
    // added in Phase 3 alongside the legacy mod_* booleans above (which
    // usePermissions().can()/canWrite() still read — this is additive).
    // Populated from get_books_session()'s `levels` payload; empty until
    // bootstrapSession() resolves, same as the mod_* flags above.
    levels: {}
  },
  ready: !1
}), $l = (e) => `books_tut_done:${e}`, xa = "books_session_user";
async function Ep() {
  window.frappe || (window.frappe = { session: {}, boot: { sysdefaults: { company: "" } } }), window.frappe.session || (window.frappe.session = {}), window.frappe.boot || (window.frappe.boot = { sysdefaults: { company: "" } });
  let e;
  try {
    const t = await fetch("/api/method/psd_books.api.session.get_books_session", {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" }
    });
    if (t.status === 401 || t.status === 403) {
      const s = window.location.pathname + window.location.hash;
      return window.location.replace("/login?redirect-to=" + encodeURIComponent(s || "/books")), !1;
    }
    const n = await t.json();
    e = n == null ? void 0 : n.message;
  } catch (t) {
    console.error("[Books] session bootstrap failed", t);
    return;
  }
  if (e) {
    try {
      const t = localStorage.getItem(xa);
      t && t !== e.user && Object.keys(localStorage).filter((n) => n.startsWith("books_") || n.startsWith("zb_")).forEach((n) => localStorage.removeItem(n)), localStorage.setItem(xa, e.user);
    } catch {
    }
    Ee.user = e.user || "", Ee.fullname = e.fullname || e.user || "", Ee.company = e.company || "", Ee.isNewUser = !!e.is_new_user, Object.assign(Ee.permissions, e.permissions || {}), Ee.ready = !0, window.frappe.csrf_token = e.csrf_token || "", window.frappe.session.user = e.user, window.frappe.session.fullname = e.fullname, window.frappe.boot.sysdefaults.company = e.company || "", window.__booksCompany = e.company || "", window.__booksUser = { fullname: e.fullname, books_role: Ee.permissions.books_role };
    try {
      const t = localStorage.getItem($l(e.user)) === "1";
      window.__booksIsNewUser = Ee.isNewUser && !t;
    } catch {
      window.__booksIsNewUser = Ee.isNewUser;
    }
  }
}
function Np() {
  var e;
  try {
    localStorage.setItem($l(Ee.user), "1");
  } catch {
  }
  window.__booksIsNewUser = !1, fetch("/api/method/psd_books.api.session.mark_tutorial_done", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Frappe-CSRF-Token": ((e = window.frappe) == null ? void 0 : e.csrf_token) || ""
    }
  }).catch(() => {
  });
}
const _a = ["None", "View", "Create", "Edit", "Delete"];
function _o(e, t) {
  return _a.indexOf(e) >= _a.indexOf(t);
}
function xs() {
  const e = _e(() => Ee.permissions || {}), t = _e(() => {
    var c;
    return ((c = Ee.permissions) == null ? void 0 : c.books_role) || "";
  }), n = _e(() => {
    var c;
    return !!((c = Ee.permissions) != null && c.is_company_admin);
  }), s = _e(() => {
    const c = Ee.permissions || {};
    return typeof c.read_only == "boolean" ? c.read_only : c.books_role === "Books Viewer" && !c.is_company_admin;
  });
  function o(c) {
    var p, m;
    return !c || n.value ? !0 : (((m = (p = Ee.permissions) == null ? void 0 : p.levels) == null ? void 0 : m[c]) || "None") !== "None";
  }
  function a(c) {
    return n.value ? !0 : s.value ? !1 : o(c);
  }
  function i(c) {
    var p, m;
    return n.value ? "Delete" : ((m = (p = Ee.permissions) == null ? void 0 : p.levels) == null ? void 0 : m[c]) || "None";
  }
  function l(c) {
    return n.value ? !0 : _o(i(c), "Create");
  }
  function d(c) {
    return n.value ? !0 : _o(i(c), "Edit");
  }
  function u(c) {
    return n.value ? !0 : _o(i(c), "Delete");
  }
  return {
    flags: e,
    role: t,
    isAdmin: n,
    isReadonly: s,
    can: o,
    canWrite: a,
    levelOf: i,
    canCreate: l,
    canEdit: d,
    canDelete: u
  };
}
const Be = /* @__PURE__ */ ze({
  open: !1,
  title: "",
  body: "",
  okLabel: "Confirm",
  cancelLabel: "Cancel",
  okStyle: "danger",
  // "danger" | "primary"
  hideCancel: !1,
  // true -> single-button "OK" alert dialog
  width: "420px",
  // widen for callers whose body has a longer item list
  icon: "",
  // "" | "warning" -- shows a colored icon badge next to the title
  items: [],
  // optional structured item cards, rendered above/instead of `body`.
  // Each: { title, badge?: {label, tone}, fields?: [{label, value, tone}] }
  resolve: null
});
function no() {
  function e({
    title: s = "Are you sure?",
    body: o = "",
    okLabel: a = "Confirm",
    cancelLabel: i = "Cancel",
    okStyle: l = "danger",
    hideCancel: d = !1,
    width: u = "420px",
    icon: c = "",
    items: p = []
  } = {}) {
    return new Promise((m) => {
      Be.title = s, Be.body = o, Be.okLabel = a, Be.cancelLabel = i, Be.okStyle = l, Be.hideCancel = d, Be.width = u, Be.icon = c, Be.items = p, Be.resolve = m, Be.open = !0;
    });
  }
  function t() {
    var s;
    Be.open = !1, (s = Be.resolve) == null || s.call(Be, !0), Be.resolve = null;
  }
  function n() {
    var s;
    Be.open = !1, (s = Be.resolve) == null || s.call(Be, !1), Be.resolve = null;
  }
  return { state: Be, confirm: e, _ok: t, _cancel: n };
}
const Tp = { class: "bv-sidebar-brand" }, Pp = {
  key: 0,
  class: "bv-sidebar-brand-text"
}, Rp = ["title"], Ip = { class: "bv-sidebar-nav" }, Mp = ["onClick"], Op = ["href", "title", "onClick"], Dp = { class: "bv-sidebar-icon" }, Lp = {
  key: 0,
  class: "bv-sidebar-label"
}, qp = ["title"], Bp = { class: "bv-sidebar-avatar" }, jp = {
  key: 0,
  class: "bv-sidebar-user-info"
}, Hp = { class: "bv-sidebar-user-name" }, Vp = { class: "bv-sidebar-user-role" }, zp = ["title"], Fp = { key: 0 }, wo = "books_sidebar_open_section", Up = {
  __name: "Sidebar",
  props: {
    collapsed: { type: Boolean, default: !1 },
    mobileOpen: { type: Boolean, default: !1 }
  },
  emits: ["toggle", "close-mobile"],
  setup(e, { emit: t }) {
    const { confirm: n } = no(), s = t, o = /* @__PURE__ */ pe(null), a = /* @__PURE__ */ pe(!1), i = wl(), l = pi(), { can: d, role: u, flags: c } = xs(), p = /* @__PURE__ */ pe(null);
    function m() {
      var b;
      return ((b = h.value.find((R) => R.section && R.items.some((A) => O(A.path)))) == null ? void 0 : b.section) ?? null;
    }
    gn(() => {
      l.isReady().then(() => {
        a.value = !0;
        const b = m();
        if (b)
          p.value = b;
        else
          try {
            const R = localStorage.getItem(wo);
            p.value = R || null;
          } catch {
          }
        Yt(() => {
          o.value && (o.value.scrollIntoView({ block: "nearest", behavior: "smooth" }), o.value.focus({ preventScroll: !0 }));
        });
      });
    });
    function g(b) {
      var R;
      if (p.value === b) {
        if ((R = h.value.find((D) => D.section === b)) == null ? void 0 : R.items.some((D) => O(D.path))) return;
        p.value = null;
      } else
        p.value = b;
      try {
        localStorage.setItem(wo, p.value || "");
      } catch {
      }
    }
    function _(b) {
      return p.value === b;
    }
    function $(b) {
      return b.items.some((R) => O(R.path));
    }
    const I = _e(() => {
      var A, D;
      const R = (Ee.fullname || Ee.user || "?").trim().split(/\s+/).filter(Boolean);
      return ((((A = R[0]) == null ? void 0 : A[0]) || "") + (((D = R[1]) == null ? void 0 : D[0]) || "")).toUpperCase() || "?";
    });
    async function f() {
      var R, A;
      if (await n({
        title: "Sign out?",
        body: "Are you sure you want to sign out of your account?",
        okLabel: "Sign Out",
        cancelLabel: "Cancel",
        okStyle: "danger"
      })) {
        try {
          const D = ((R = window.frappe) == null ? void 0 : R.csrf_token) || ((A = document.cookie.match(/csrf_token=([^;]+)/)) == null ? void 0 : A[1]) || "";
          await fetch("/api/method/logout", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Frappe-CSRF-Token": D
            },
            body: D ? "csrf_token=" + encodeURIComponent(D) : ""
          });
        } catch {
        }
        window.location.replace("/login");
      }
    }
    const h = _e(() => {
      var A, D;
      const b = [];
      let R = null;
      for (const N of Fo) {
        if (N.section) {
          R && b.push(R), R = { section: N.section, items: [] };
          continue;
        }
        !d(N.module) && !(N.doctype && ((D = (A = c.value.doc_access) == null ? void 0 : A[N.doctype]) != null && D.read)) || (R || (R = { section: null, items: [] }), R.items.push(N));
      }
      return R && R.items.length && b.push(R), b.filter((N) => N.items.length);
    });
    function O(b) {
      return a.value ? b === "/" ? i.path === "/" : i.path === b ? !0 : i.path.startsWith(b + "/") ? !Fo.some((A) => !A.path || A.path === b || A.path.length <= b.length ? !1 : i.path === A.path || i.path.startsWith(A.path + "/")) : !1 : !1;
    }
    function L(b) {
      l.push(b.path), s("close-mobile");
    }
    return ct(() => i.path, () => {
      if (!a.value) return;
      const b = m();
      if (b && b !== p.value) {
        p.value = b;
        try {
          localStorage.setItem(wo, b);
        } catch {
        }
      }
    }), (b, R) => (w(), S("aside", {
      class: De(["bv-sidebar", { "bv-sidebar-collapsed": e.collapsed }])
    }, [
      r("div", Tp, [
        r("span", {
          class: "bv-sidebar-brand-mark",
          onClick: R[0] || (R[0] = Fe((A) => e.collapsed && b.$emit("toggle"), ["stop"])),
          style: _t(e.collapsed ? "cursor:pointer" : "")
        }, "B", 4),
        e.collapsed ? G("", !0) : (w(), S("span", Pp, "Books")),
        r("button", {
          class: "bv-sidebar-collapse",
          onClick: R[1] || (R[1] = Fe((A) => b.$emit("toggle"), ["stop"])),
          title: e.collapsed ? "Expand" : "Collapse"
        }, [
          ve(gt, {
            name: e.collapsed ? "chevR" : "chevL",
            size: 13
          }, null, 8, ["name"])
        ], 8, Rp),
        r("button", {
          class: "bv-sidebar-close-mob",
          onClick: R[2] || (R[2] = Fe((A) => b.$emit("close-mobile"), ["stop"])),
          "aria-label": "Close menu"
        }, [
          ve(gt, {
            name: "x",
            size: 15
          })
        ])
      ]),
      r("nav", Ip, [
        (w(!0), S(ee, null, Ae(h.value, (A) => (w(), S(ee, {
          key: A.section ?? "__root__"
        }, [
          A.section && !e.collapsed ? (w(), S("div", {
            key: 0,
            class: De(["bv-sidebar-section", { "bv-sidebar-section-active": $(A) }]),
            onClick: (D) => g(A.section)
          }, [
            r("span", null, T(A.section), 1),
            ve(gt, {
              name: _(A.section) ? "chevU" : "chevD",
              size: 10,
              class: "bv-section-chev"
            }, null, 8, ["name"])
          ], 10, Mp)) : G("", !0),
          e.collapsed || !A.section || _(A.section) ? (w(!0), S(ee, { key: 1 }, Ae(A.items, (D) => (w(), S("a", {
            key: D.path,
            href: `#${D.path}`,
            class: De(["bv-sidebar-item", { "bv-sidebar-item-active": O(D.path) }]),
            ref_for: !0,
            ref: (N) => {
              N && O(D.path) && (o.value = N);
            },
            title: e.collapsed ? D.label : "",
            onClick: Fe((N) => L(D), ["prevent"])
          }, [
            r("span", Dp, [
              ve(gt, {
                name: D.icon,
                size: 15
              }, null, 8, ["name"])
            ]),
            e.collapsed ? G("", !0) : (w(), S("span", Lp, T(D.label), 1))
          ], 10, Op))), 128)) : G("", !0)
        ], 64))), 128))
      ]),
      r("div", {
        class: "bv-sidebar-user",
        onClick: R[3] || (R[3] = (A) => L({ path: "/settings/profile" })),
        title: e.collapsed ? C(Ee).fullname || C(Ee).user : ""
      }, [
        r("div", Bp, T(I.value), 1),
        e.collapsed ? G("", !0) : (w(), S("div", jp, [
          r("div", Hp, T(C(Ee).fullname || C(Ee).user), 1),
          r("div", Vp, T(C(u) || "Member"), 1)
        ]))
      ], 8, qp),
      r("button", {
        class: "bv-sidebar-logout",
        onClick: Fe(f, ["stop"]),
        title: e.collapsed ? "Sign out" : ""
      }, [
        ve(gt, {
          name: "logout",
          size: 14
        }),
        e.collapsed ? G("", !0) : (w(), S("span", Fp, "Sign out"))
      ], 8, zp)
    ], 2));
  }
}, Kp = { class: "bv-topbar" }, Gp = { class: "bv-topbar-title" }, Wp = {
  key: 0,
  class: "bv-ai-badge"
}, Yp = { class: "bv-topbar-avatar" }, Jp = { class: "bv-topbar-username" }, Qp = { class: "bv-topbar-chevron" }, Zp = {
  key: 0,
  class: "bv-topbar-user-menu"
}, Xp = {
  __name: "Topbar",
  props: { alertCount: { type: Number, default: 0 } },
  emits: ["toggle-ai", "toggle-mobile"],
  setup(e) {
    const { confirm: t } = no(), n = wl(), s = pi(), o = /* @__PURE__ */ pe(!1), { isAdmin: a } = xs(), i = _e(() => Ap(n.path)), l = _e(() => {
      var m;
      const p = (Ee.fullname || Ee.user || "?").trim().split(/\s+/).filter(Boolean);
      return p.length ? ((p[0][0] || "") + (((m = p[1]) == null ? void 0 : m[0]) || "")).toUpperCase() : "?";
    });
    async function d() {
      var p, m;
      if (o.value = !1, !!await t({
        title: "Sign out?",
        body: "Are you sure you want to sign out of your account?",
        okLabel: "Sign Out",
        cancelLabel: "Cancel",
        okStyle: "danger"
      })) {
        try {
          const g = ((p = window.frappe) == null ? void 0 : p.csrf_token) || ((m = document.cookie.match(/csrf_token=([^;]+)/)) == null ? void 0 : m[1]) || "";
          await fetch("/api/method/logout", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Frappe-CSRF-Token": g
            },
            body: g ? "csrf_token=" + encodeURIComponent(g) : ""
          });
        } catch {
        }
        window.location.replace("/login");
      }
    }
    function u(c) {
      c.target.closest(".bv-topbar-user") || (o.value = !1);
    }
    return gn(() => document.addEventListener("click", u)), si(() => document.removeEventListener("click", u)), (c, p) => (w(), S("header", Kp, [
      r("button", {
        class: "bv-hamburger",
        onClick: p[0] || (p[0] = (m) => c.$emit("toggle-mobile")),
        "aria-label": "Open menu"
      }, [...p[6] || (p[6] = [
        r("span", { class: "bv-ham-icon" }, null, -1)
      ])]),
      r("div", Gp, T(i.value), 1),
      p[12] || (p[12] = r("div", { class: "bv-topbar-spacer" }, null, -1)),
      r("button", {
        class: "bv-topbar-icon-btn bv-topbar-ai-btn",
        title: "AI Assistant",
        onClick: p[1] || (p[1] = (m) => c.$emit("toggle-ai"))
      }, [
        ve(gt, {
          name: "sparkle",
          size: 17
        }),
        e.alertCount > 0 ? (w(), S("span", Wp, T(e.alertCount > 9 ? "9+" : e.alertCount), 1)) : G("", !0)
      ]),
      r("div", {
        class: "bv-topbar-user",
        onClick: p[5] || (p[5] = Fe((m) => o.value = !o.value, ["stop"]))
      }, [
        r("div", Yp, T(l.value), 1),
        r("span", Jp, T(C(Ee).fullname || C(Ee).user), 1),
        r("span", Qp, [
          ve(gt, {
            name: o.value ? "chevU" : "chevD",
            size: 12
          }, null, 8, ["name"])
        ]),
        o.value ? (w(), S("div", Zp, [
          r("a", {
            href: "#",
            onClick: p[2] || (p[2] = Fe((m) => {
              C(s).push("/settings/profile"), o.value = !1;
            }, ["prevent"]))
          }, [
            ve(gt, {
              name: "user",
              size: 14
            }),
            p[7] || (p[7] = ye(" My Profile ", -1))
          ]),
          C(a) ? (w(), S("a", {
            key: 0,
            href: "#",
            onClick: p[3] || (p[3] = Fe((m) => {
              C(s).push("/settings/users"), o.value = !1;
            }, ["prevent"]))
          }, [
            ve(gt, {
              name: "users",
              size: 14
            }),
            p[8] || (p[8] = ye(" Users ", -1))
          ])) : G("", !0),
          C(a) ? (w(), S("a", {
            key: 1,
            href: "#",
            onClick: p[4] || (p[4] = Fe((m) => {
              C(s).push("/settings/company"), o.value = !1;
            }, ["prevent"]))
          }, [
            ve(gt, {
              name: "building",
              size: 14
            }),
            p[9] || (p[9] = ye(" Company Settings ", -1))
          ])) : G("", !0),
          p[11] || (p[11] = r("hr", null, null, -1)),
          r("a", {
            href: "#",
            class: "danger",
            onClick: Fe(d, ["prevent"])
          }, [
            ve(gt, {
              name: "logout",
              size: 14
            }),
            p[10] || (p[10] = ye(" Sign out ", -1))
          ])
        ])) : G("", !0)
      ])
    ]));
  }
};
let ef = 0;
const As = /* @__PURE__ */ ze({ items: [] });
function vn() {
  function e(t, n = "success", s = 3500) {
    const o = ++ef;
    As.items.push({ id: o, message: t, type: n }), setTimeout(() => {
      const a = As.items.findIndex((i) => i.id === o);
      a !== -1 && As.items.splice(a, 1);
    }, s);
  }
  return e.success = (t) => e(t, "success"), e.error = (t) => e(t, "error"), e.warn = (t) => e(t, "warning"), e.info = (t) => e(t, "info"), {
    items: As.items,
    toast: e,
    success: e.success,
    error: e.error,
    warn: e.warn,
    info: e.info
  };
}
const tf = /* @__PURE__ */ new Set([
  "frappe.client.insert",
  "frappe.client.set_value",
  "frappe.client.delete",
  "frappe.client.rename_doc",
  "frappe.client.cancel",
  "frappe.client.submit"
]), nf = /(^|\.)(create|save|update|delete|submit|cancel|record|apply|convert|refund|mark|bulk|set_|pay|post|generate|remove|add|toggle|disable|enable|import|reconcile|close|run|duplicate|make|extend|reset|change|invite|connect|send|write_off|seed)[a-z_0-9]*$/;
function sf(e) {
  return e ? tf.has(e) || nf.test(e) || e.endsWith("ai_execute_pro_action") : !1;
}
const wa = ["None", "View", "Create", "Edit", "Delete"];
function of(e, t) {
  return wa.indexOf(e) >= wa.indexOf(t);
}
const af = {
  create: "Create",
  write: "Edit",
  edit: "Edit",
  submit: "Edit",
  cancel: "Edit",
  delete: "Delete"
};
function rf(e, t) {
  if (Ee.permissions && Ee.permissions.read_only && sf(e))
    throw new Error("Read-only access — your role can view but not make changes.");
  if (t && t.module && t.action && Ee.permissions && !Ee.permissions.is_company_admin) {
    const n = af[t.action] || "Edit", s = Ee.permissions.levels && Ee.permissions.levels[t.module] || "None";
    if (!of(s, n))
      throw new Error(
        `Your ${t.module} access (${s}) doesn't allow you to ${t.action}.`
      );
  }
}
function ko(e) {
  if (!e) return "";
  let t = e;
  if (typeof e == "string") {
    const s = e.trim();
    if (s.startsWith("{") || s.startsWith("["))
      try {
        t = JSON.parse(s);
      } catch {
      }
  }
  return (typeof t == "object" ? t.message : String(t) || "").replace(/<[^>]*>/g, "").replace(/\\n/g, `
`).replace(/\\"/g, '"').replace(/^\s+|\s+$/g, "");
}
function ka(e) {
  let t = e;
  if (typeof e == "string") {
    const s = e.trim();
    if (s.startsWith("{") || s.startsWith("["))
      try {
        t = JSON.parse(s);
      } catch {
        return "info";
      }
    else
      return "info";
  }
  const n = typeof t == "object" && t.indicator ? String(t.indicator).toLowerCase() : "";
  return n === "red" ? "error" : n === "orange" || n === "yellow" ? "warning" : n === "green" ? "success" : "info";
}
function Sl(e, t, n) {
  if (t === 401) {
    const s = window.location.pathname + window.location.hash;
    throw window.location.href = "/login?redirect-to=" + encodeURIComponent(s || "/books"), new Error("Session expired");
  }
  if (t === 403 && e && (e.exc_type === "CSRFTokenError" || (e.exc || "").includes("CSRFToken")) && fetch("/api/method/psd_books.api.session.get_books_session", {
    method: "GET",
    credentials: "same-origin"
  }).then((s) => s.json()).then((s) => {
    var o;
    (o = s.message) != null && o.csrf_token && (window.frappe.csrf_token = s.message.csrf_token);
  }).catch(() => {
  }), e.exc || e.exc_type) {
    if (e._server_messages)
      try {
        const i = JSON.parse(e._server_messages), l = Array.isArray(i) ? i[0] : i, d = ko(l);
        if (d) throw new Error(d);
      } catch (i) {
        if (i instanceof Error) throw i;
      }
    const s = (e.exc || "").replace(/\\n/g, `
`).replace(/\\"/g, '"'), o = s.match(/frappe\.exceptions\.\w+:\s*([\s\S]+)/);
    if (o && o[1].trim())
      throw new Error(o[1].trim());
    let a = e.exc_type || "Server error " + t;
    if (e.exc_type === "PermissionError" && (a = "You don't have permission to do that. Check your role's access level for this module."), e.message) {
      if (typeof e.message == "object" && e.message.name && typeof e.message.docstatus < "u")
        return console.warn("Server returned exception but also returned document. Proceeding with document.", s), e.message;
      a = typeof e.message == "string" ? e.message : JSON.stringify(e.message);
    }
    throw new Error(a);
  }
  if (e._server_messages)
    try {
      const s = JSON.parse(e._server_messages), o = Array.isArray(s) ? s : [s];
      if (n && n.suppressMessages) {
        const a = o.map((i) => ({ text: ko(i), type: ka(i) })).filter((i) => i.text);
        return { message: e.message, serverMessages: a };
      }
      for (const a of o) {
        const i = ko(a);
        i && vn().toast(i, ka(a), 6e3);
      }
    } catch {
    }
  return e.message;
}
async function Et(e, t) {
  const n = new URLSearchParams();
  for (const [a, i] of Object.entries(t || {}))
    i != null && n.append(a, typeof i == "string" ? i : JSON.stringify(i));
  const s = await fetch("/api/method/" + e + "?" + n.toString(), {
    method: "GET",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    cache: "no-store"
  });
  let o;
  try {
    o = await s.json();
  } catch {
    throw new Error("Non-JSON response (" + s.status + ")");
  }
  return Sl(o, s.status);
}
async function Cl() {
  var n, s;
  const e = document.querySelector("meta[name='csrf-token']");
  if (e) {
    const o = e.getAttribute("content");
    if (o && o !== "None" && o !== "{{ csrf_token }}")
      return window.frappe && (window.frappe.csrf_token = o), o;
  }
  if ((n = window.frappe) != null && n.csrf_token && window.frappe.csrf_token !== "None" && window.frappe.csrf_token !== "{{ csrf_token }}")
    return window.frappe.csrf_token;
  const t = document.cookie.split(";").map((o) => o.trim()).find((o) => o.startsWith("csrf_token="));
  if (t) {
    const o = decodeURIComponent(t.split("=").slice(1).join("="));
    if (o && o !== "None")
      return window.frappe && (window.frappe.csrf_token = o), o;
  }
  try {
    const a = await (await fetch("/api/method/psd_books.api.session.get_books_session", {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" }
    })).json(), i = (s = a == null ? void 0 : a.message) == null ? void 0 : s.csrf_token;
    if (i && i !== "None")
      return window.frappe && (window.frappe.csrf_token = i), i;
  } catch {
  }
  return "";
}
async function tt(e, t, n, s) {
  rf(e, n);
  const o = await Cl(), a = new URLSearchParams();
  for (const [d, u] of Object.entries(t || {}))
    u != null && a.append(d, typeof u == "string" ? u : JSON.stringify(u));
  o && a.append("csrf_token", o);
  const i = await fetch("/api/method/" + e, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Frappe-CSRF-Token": o || "",
      Accept: "application/json"
    },
    body: a.toString()
  });
  let l;
  try {
    l = await i.json();
  } catch {
    throw new Error("Non-JSON response (" + i.status + ")");
  }
  return Sl(l, i.status, s);
}
async function Jt(e, t) {
  return await Et("psd_books.api.docs.get_doc", { doctype: e, name: t });
}
async function Al(e) {
  return await tt("psd_books.api.docs.save_doc", { doc: JSON.stringify(e) });
}
async function El(e, t, n = 0) {
  try {
    return await tt("psd_books.api.docs.submit_doc", { doctype: e, name: t, ignore_budget_warning: n });
  } catch (s) {
    if (s.message && s.message.startsWith("BUDGET_WARNING: ")) {
      const o = s.message.replace("BUDGET_WARNING: ", ""), { confirm: a } = no();
      if (await a({
        title: "Budget Limit Exceeded",
        body: o,
        okLabel: "Submit anyway",
        cancelLabel: "Go back",
        okStyle: "primary"
      }))
        return await El(e, t, 1);
      throw new Error("Submission cancelled by user");
    }
    throw s;
  }
}
async function lf(e, t, n) {
  return await tt("psd_books.api.docs.delete_doc", { doctype: e, name: t }, n);
}
async function cf(e, t, n) {
  return await tt("psd_books.api.docs.cancel_doc", { doctype: e, name: t }, n);
}
async function df(e, t) {
  return await tt("psd_books.api.docs.amend_doc", { doctype: e, name: t });
}
const uf = /* @__PURE__ */ new Set([
  "Sales Invoice",
  "Purchase Invoice",
  "Quotation",
  "Sales Order",
  "Purchase Order",
  "Payment Entry",
  "Stock Entry",
  "Journal Entry",
  "Account",
  "Warehouse",
  "Cost Center",
  "Bank Account",
  "Expense Claim",
  "Fiscal Year",
  "Tax Template",
  "Landed Cost Voucher",
  "Expense Category"
]), Nl = /* @__PURE__ */ new Set([
  "Customer",
  "Supplier",
  "Item",
  "Contact"
]);
async function Wt(e, t = {}) {
  const n = [...t.filters || []], s = window.__booksCompany || "";
  return s && uf.has(e) && (n.some((o) => Array.isArray(o) && o[0] === "company") || n.push(["company", "=", s])), s && Nl.has(e) && (n.some((o) => Array.isArray(o) && o[0] === "books_company") || n.push(["books_company", "=", s])), await Et("psd_books.api.docs.get_list", {
    doctype: e,
    fields: JSON.stringify(t.fields || ["name"]),
    filters: JSON.stringify(n),
    order_by: t.order || "modified desc",
    limit_page_length: t.limit || 50
  }) || [];
}
async function pf(e, t, n) {
  const s = n ? [...n, ["name", "like", "%" + t + "%"]] : [["name", "like", "%" + t + "%"]], o = window.__booksCompany || "";
  return o && Nl.has(e) && (s.some((a) => Array.isArray(a) && a[0] === "books_company") || s.push(["books_company", "=", o])), await Et("frappe.client.get_list", {
    doctype: e,
    fields: JSON.stringify(["name"]),
    filters: JSON.stringify(s),
    limit_page_length: 10
  }) || [];
}
async function ff(e, t) {
  return await Et(e, t);
}
async function mf(e, t = {}, n, s) {
  return await tt(e, t, n, s);
}
async function Tl() {
  var e, t;
  if (window.__booksCompany)
    return console.log("[BooksCompany][client.js] resolveCompany() returning CACHED value:", window.__booksCompany), window.__booksCompany;
  try {
    const n = await Et("frappe.client.get_value", {
      doctype: "Books Settings",
      filters: JSON.stringify({ name: "Books Settings" }),
      fieldname: JSON.stringify(["default_company"])
    }), s = (n == null ? void 0 : n.default_company) || "";
    return console.log("[BooksCompany][client.js] resolveCompany() FETCHED from server (Books Settings.default_company):", s), window.__booksCompany = s, (t = (e = window.frappe) == null ? void 0 : e.boot) != null && t.sysdefaults && (window.frappe.boot.sysdefaults.company = s), s;
  } catch (n) {
    return console.log("[BooksCompany][client.js] resolveCompany() FAILED, falling back to cached value:", window.__booksCompany, n), window.__booksCompany || "";
  }
}
function hf(e) {
  var n, s;
  const t = e || "";
  return console.log("[BooksCompany][client.js] setBooksCompany() called with", e, "| previous value was", window.__booksCompany), window.__booksCompany = t, (s = (n = window.frappe) == null ? void 0 : n.boot) != null && s.sysdefaults && (window.frappe.boot.sysdefaults.company = t), console.log("[BooksCompany][client.js] window.__booksCompany is now", window.__booksCompany), t;
}
const w0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  api: ff,
  apiAmend: df,
  apiCall: mf,
  apiCancel: cf,
  apiDelete: lf,
  apiGET: Et,
  apiGet: Jt,
  apiLinkValues: pf,
  apiList: Wt,
  apiPOST: tt,
  apiSave: Al,
  apiSubmit: El,
  refreshCsrfToken: Cl,
  resolveCompany: Tl,
  setBooksCompany: hf
}, Symbol.toStringTag, { value: "Module" })), Jn = /* @__PURE__ */ ze({ handlers: {} });
function Pl() {
  function e(n, s) {
    return Jn.handlers[n] = s, () => {
      Jn.handlers[n] === s && delete Jn.handlers[n];
    };
  }
  function t(n, s) {
    const o = Jn.handlers[n];
    if (!o) return !1;
    try {
      return o(s), !0;
    } catch (a) {
      return console.error("[ai] handler failed", n, a), !1;
    }
  }
  return { register: e, dispatch: t, handlers: Jn.handlers };
}
const gf = { class: "bv-ai-header-title" }, vf = {
  key: 0,
  class: "bv-ai-pro-badge"
}, yf = { style: { display: "flex", "align-items": "center", gap: "6px" } }, bf = ["title"], xf = {
  key: 0,
  class: "bv-ai-pro-banner"
}, _f = {
  key: 1,
  class: "bv-ai-goal-banner"
}, wf = {
  key: 2,
  class: "bv-ai-alerts"
}, kf = ["onClick"], $f = {
  key: 0,
  class: "bv-ai-alert-arrow"
}, Sf = ["innerHTML"], Cf = {
  key: 0,
  class: "bv-ai-cust-chips"
}, Af = ["onClick"], Ef = {
  key: 1,
  class: "bv-ai-item-chips"
}, Nf = ["onClick"], Tf = {
  key: 0,
  class: "bv-ai-wh-chips"
}, Pf = ["onClick"], Rf = { class: "bv-ai-wh-qty" }, If = {
  key: 1,
  class: "bv-ai-nostock-panel"
}, Mf = { class: "bv-ai-nostock-title" }, Of = { class: "bv-ai-nostock-actions" }, Df = {
  key: 3,
  class: "bv-ai-sup-chips"
}, Lf = ["onClick"], qf = {
  key: 4,
  class: "bv-ai-pay-chips"
}, Bf = ["onClick"], jf = {
  key: 5,
  class: "bv-ai-inv-chips"
}, Hf = ["onClick"], Vf = { class: "bv-ai-inv-name" }, zf = { class: "bv-ai-inv-meta" }, Ff = {
  key: 6,
  class: "bv-ai-yn-chips"
}, Uf = {
  key: 7,
  class: "bv-ai-pl-chips"
}, Kf = ["onClick"], Gf = {
  key: 0,
  class: "bv-ai-pl-currency"
}, Wf = {
  key: 8,
  class: "bv-ai-confirm-card"
}, Yf = { class: "bv-ai-confirm-row" }, Jf = { class: "bv-ai-confirm-label" }, Qf = {
  key: 0,
  class: "bv-ai-confirm-total"
}, Zf = {
  key: 1,
  class: "bv-ai-confirm-actions"
}, Xf = ["onClick"], em = ["onClick"], tm = {
  key: 2,
  class: "bv-ai-confirm-done"
}, nm = { class: "bv-ai-confirm-row" }, sm = {
  key: 0,
  class: "bv-ai-confirm-row"
}, om = {
  key: 1,
  class: "bv-ai-confirm-row"
}, im = { class: "bv-ai-confirm-row" }, am = {
  key: 0,
  class: "bv-ai-confirm-row"
}, rm = {
  key: 1,
  class: "bv-ai-confirm-row"
}, lm = { class: "bv-ai-confirm-row" }, cm = { class: "bv-ai-confirm-row" }, dm = {
  key: 0,
  class: "bv-ai-confirm-row"
}, um = { class: "bv-ai-confirm-row" }, pm = { class: "bv-ai-confirm-row" }, fm = { class: "bv-ai-confirm-row" }, mm = { class: "bv-ai-confirm-label" }, hm = {
  key: 0,
  class: "bv-ai-confirm-total"
}, gm = { class: "bv-ai-confirm-row" }, vm = { class: "bv-ai-confirm-row" }, ym = { class: "bv-ai-confirm-row" }, bm = { style: { "font-weight": "700", color: "#2F9E44" } }, xm = { class: "bv-ai-confirm-row" }, _m = { class: "bv-ai-confirm-row" }, wm = { class: "bv-ai-confirm-row" }, km = { class: "bv-ai-confirm-row" }, $m = { class: "bv-ai-confirm-row" }, Sm = { class: "bv-ai-confirm-row" }, Cm = { style: { "text-decoration": "line-through", color: "#94a3b8" } }, Am = { class: "bv-ai-confirm-row" }, Em = { style: { "font-weight": "700", color: "#2F9E44" } }, Nm = { class: "bv-ai-confirm-row" }, Tm = { class: "bv-ai-confirm-row" }, Pm = { class: "bv-ai-confirm-row" }, Rm = {
  key: 0,
  class: "bv-ai-confirm-row"
}, Im = {
  key: 8,
  class: "bv-ai-confirm-actions"
}, Mm = ["onClick"], Om = ["onClick"], Dm = {
  key: 9,
  class: "bv-ai-confirm-done"
}, Lm = {
  key: 10,
  class: "bv-ai-action-chip"
}, qm = {
  key: 0,
  class: "bv-ai-msg bv-ai-msg-assistant bv-ai-thinking"
}, Bm = {
  key: 3,
  class: "bv-ai-chips"
}, jm = ["disabled", "placeholder", "onKeydown"], Hm = ["disabled"], $o = "books_ai_chat_v2", $a = "books_ai_pro_mode", Sa = `Hi! I'm your Books AI assistant.

I can query revenue, outstanding invoices, payments, profit estimates, check stock levels, find low-stock items, show top customers & suppliers, guide you through creating invoices, and navigate the app.

Enable **Pro Mode** (⚡ button above) to also create customers, suppliers, items, quotations, record payments, cancel invoices, and update prices.

Use the quick actions below or just type naturally.`, Vm = {
  __name: "AiPanel",
  props: {
    open: { type: Boolean, default: !1 },
    alerts: { type: Array, default: () => [] }
  },
  emits: ["close", "alerts-seen"],
  setup(e, { emit: t }) {
    const n = e, s = t, o = ["Cash", "Bank Transfer", "UPI", "Cheque"], a = /* @__PURE__ */ new Set([
      "create_customer_confirm",
      "create_supplier_confirm",
      "create_item_confirm",
      "create_quotation_confirm",
      "create_payment_confirm",
      "cancel_invoice_confirm",
      "update_item_price_confirm",
      "create_purchase_order_confirm"
    ]), i = {
      create_customer_confirm: "create_customer",
      create_supplier_confirm: "create_supplier",
      create_item_confirm: "create_item",
      create_quotation_confirm: "create_quotation",
      create_payment_confirm: "create_payment",
      cancel_invoice_confirm: "cancel_invoice",
      update_item_price_confirm: "update_item_price",
      create_purchase_order_confirm: "create_purchase_order"
    }, l = /* @__PURE__ */ pe(""), d = /* @__PURE__ */ pe(!1), u = /* @__PURE__ */ pe(!1), c = /* @__PURE__ */ pe([]), p = /* @__PURE__ */ pe(null), m = /* @__PURE__ */ pe(null), g = /* @__PURE__ */ pe(!0), _ = /* @__PURE__ */ pe([]), $ = /* @__PURE__ */ pe([]), I = /* @__PURE__ */ pe([]), f = /* @__PURE__ */ pe([]), h = /* @__PURE__ */ pe([]), O = /* @__PURE__ */ pe([]), L = /* @__PURE__ */ pe(null), b = /* @__PURE__ */ pe(null), R = /* @__PURE__ */ pe(null), { dispatch: A } = Pl(), D = {
      show_items: "#/inventory/items",
      show_item_groups: "#/inventory/item-groups",
      show_warehouses: "#/inventory/warehouses",
      show_inventory: "#/inventory/items",
      show_suppliers: "#/suppliers",
      show_customers: "#/customers",
      show_dashboard: "#/"
    }, N = {
      show_overdue: "Filtered to overdue invoices",
      show_unpaid: "Filtered to unpaid invoices",
      show_all_invoices: "Showing all invoices",
      find_invoices: "Filtered by customer",
      create_invoice: "Opened new invoice",
      show_outstanding: "Navigated to dashboard",
      show_bills: "Navigated to bills",
      show_quotes: "Navigated to quotes",
      show_customers: "Navigated to customers",
      show_suppliers: "Navigated to suppliers",
      show_dashboard: "Navigated to dashboard",
      show_sales_orders: "Navigated to sales orders",
      show_purchase_orders: "Navigated to purchase orders",
      show_items: "Navigated to items",
      show_item_groups: "Navigated to item groups",
      show_warehouses: "Navigated to warehouses",
      show_inventory: "Navigated to inventory",
      navigate: "Navigated"
    };
    function M(q) {
      return N[q] || q;
    }
    function H(q, y) {
      return y === c.value.length - 1 && !q.confirm && !q.proAction;
    }
    function j(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return P.includes("invoice for") || P.includes("quotation for") || P.includes("who is this") || P.includes("customer") && (P.includes("invoice") || P.includes("which") || P.includes("quotation"));
    }
    function te(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return P.includes("item") && (P.includes("add") || P.includes("like") || P.includes("want") || P.includes("invoice")) || P.includes("what would you like") || P.includes("which item") || P.includes("product");
    }
    function Z(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return P.includes("warehouse") || P.includes("stock location") || P.includes("from which location");
    }
    function fe(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return P.includes("supplier") && (P.includes("which") || P.includes("from") || P.includes("order"));
    }
    function Ce(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return (P.includes("mode") || P.includes("method")) && P.includes("pay");
    }
    function be(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return P.includes("which invoice") || P.includes("outstanding invoice") || P.includes("invoice") && P.includes("payment for");
    }
    function xe(q, y) {
      if (!H(q, y)) return !1;
      const P = (q.content || "").toLowerCase();
      return P.includes("would you like") || P.includes("should i") || P.includes("do you want") || P.includes("shall i");
    }
    function Oe(q, y) {
      return H(q, y) ? (q.content || "").toLowerCase().includes("price list") : !1;
    }
    async function qe() {
      if (!_.value.length)
        try {
          const q = await Wt("Customer", { fields: ["name", "customer_name"], limit: 5, order_by: "modified desc" });
          _.value = q || [];
        } catch {
        }
    }
    async function We() {
      if (!$.value.length)
        try {
          const q = await tt("psd_books.api.books_data.get_top_sold_items", { limit: 7 });
          $.value = Array.isArray(q) ? q : [];
        } catch {
        }
    }
    async function Je(q) {
      if (I.value = [], !!q)
        try {
          const y = await tt("psd_books.api.books_data.get_item_warehouse_stock", { item_code: q });
          I.value = Array.isArray(y) ? y : [];
        } catch {
        }
    }
    async function qt() {
      if (!f.value.length)
        try {
          const q = await Wt("Supplier", { fields: ["name", "supplier_name"], limit: 5, order_by: "modified desc" });
          f.value = q || [];
        } catch {
        }
    }
    async function tn() {
      if (!h.value.length)
        try {
          const q = await Wt("Sales Invoice", {
            filters: [["outstanding_amount", ">", 0], ["docstatus", "=", 1]],
            fields: ["name", "customer", "outstanding_amount"],
            limit: 5,
            order_by: "due_date asc"
          });
          h.value = q || [];
        } catch {
        }
    }
    async function Bt() {
      if (!O.value.length)
        try {
          const q = await Wt("Price List", {
            filters: [["enabled", "=", 1]],
            fields: ["name", "currency"],
            limit: 5
          });
          O.value = q || [];
        } catch {
        }
    }
    function dt(q) {
      const y = q.customer_name || q.name;
      b.value = y, de(y);
    }
    function z(q) {
      L.value = q.item_code || q.name, I.value = [], Je(L.value), de(q.item_name || q.item_code || q.name);
    }
    function ne(q) {
      de(q.warehouse);
    }
    function J() {
      R.value = { type: "create_invoice", customer: b.value || "" }, qt();
      const q = L.value || "the item";
      de(`I need to order "${q}" from a supplier to restock before creating the invoice`);
    }
    function ae() {
      R.value = { type: "create_invoice", customer: b.value || "" };
      const q = L.value || "the item";
      de(`I want to add stock manually for "${q}" before creating the invoice`);
    }
    function we() {
      const q = R.value;
      if (!q) return;
      R.value = null;
      const y = q.customer ? `Stock is now available. Let's create the invoice for ${q.customer}` : "Stock is now available. Let's get back to creating that invoice";
      setTimeout(() => de(y), 900);
    }
    function v(q) {
      return (q || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
    }
    function x(q) {
      return (q.items || []).reduce((y, P) => y + Number(P.rate || 0) * Number(P.qty || 1), 0);
    }
    function E() {
      u.value = !u.value;
      try {
        localStorage.setItem($a, u.value ? "1" : "0");
      } catch {
      }
    }
    function B() {
      try {
        const q = c.value.slice(-50).map((y) => ({
          role: y.role,
          content: y.content,
          action: y.action || null,
          confirm: y.confirm || null,
          confirmed: y.confirmed || null,
          proAction: y.proAction || null,
          proData: y.proData || null,
          proConfirmed: y.proConfirmed || null
        }));
        localStorage.setItem($o, JSON.stringify(q));
      } catch {
      }
    }
    function F() {
      try {
        const q = localStorage.getItem($o);
        if (!q) return !1;
        const y = JSON.parse(q);
        if (Array.isArray(y) && y.length)
          return c.value = y, !0;
      } catch {
      }
      return !1;
    }
    function V() {
      c.value = [], localStorage.removeItem($o), R.value = null, L.value = null, b.value = null, c.value.push({ role: "assistant", content: Sa }), B();
    }
    function Y(q, y) {
      let P = 0;
      const Se = 5, X = setInterval(async () => {
        if (P >= y.length) {
          clearInterval(X), c.value[q].content = y, B(), await $e();
          return;
        }
        c.value[q].content = y.slice(0, P + Se), P += Se, P % 30 === 0 && await $e();
      }, 18);
    }
    function W() {
      g.value = !1, s("alerts-seen");
    }
    function K(q) {
      q.action && ue(q.action, {}), W(), s("close");
    }
    async function U(q) {
      q.confirmed = "✓ Creating invoice…", A("create_invoice", q.confirm), await Yt(), s("close");
    }
    function ce(q) {
      q.confirmed = "Cancelled.", c.value.push({ role: "assistant", content: "No problem — invoice creation cancelled." }), $e();
    }
    async function Q(q) {
      q.proConfirmed = "⏳ Processing…";
      try {
        const y = await tt("psd_books.api.books_data.ai_execute_pro_action", {
          action: q.proAction,
          data: JSON.stringify(q.proData || {})
        }), P = (y == null ? void 0 : y.reply) || "Done.";
        q.proConfirmed = P;
        const Se = { role: "assistant", content: P, action: (y == null ? void 0 : y.action) || null };
        c.value.push(Se), y != null && y.action && ue(y.action, y), B(), await $e(), q.proAction === "create_purchase_order" && R.value && we();
      } catch (y) {
        q.proConfirmed = "Failed: " + ((y == null ? void 0 : y.message) || "unknown error"), B();
      }
    }
    function re(q) {
      q.proConfirmed = "Cancelled.", c.value.push({ role: "assistant", content: "Action cancelled." }), B(), $e();
    }
    function ue(q, y) {
      if (q) {
        if (D[q]) {
          window.location.hash = D[q], s("close");
          return;
        }
        A(q, y);
      }
    }
    async function ke() {
      const q = l.value.trim();
      if (!(!q || d.value)) {
        l.value = "", c.value.push({ role: "user", content: q }), B(), d.value = !0, await $e();
        try {
          const y = await tt("psd_books.api.books_data.ai_chat", {
            pro_mode: u.value ? 1 : 0,
            messages: JSON.stringify(
              c.value.filter((Ue) => Ue.role === "user" || Ue.role === "assistant").map((Ue) => ({ role: Ue.role, content: Ue.content })).slice(-14)
            )
          }), P = (y == null ? void 0 : y.reply) || (y == null ? void 0 : y.message) || (typeof y == "string" ? y : "…"), Se = (y == null ? void 0 : y.action) || null, X = { role: "assistant", content: "", action: Se };
          Se === "create_invoice_confirm" ? X.confirm = { customer: y.customer, items: y.items } : a.has(Se) ? (X.proAction = i[Se], X.proData = { ...y }) : Se && ue(Se, y), c.value.push(X), Y(c.value.length - 1, P);
        } catch (y) {
          c.value.push({ role: "assistant", content: "Sorry — " + ((y == null ? void 0 : y.message) || "something went wrong.") }), B();
        } finally {
          d.value = !1, await $e();
        }
      }
    }
    function de(q) {
      l.value = q, ke();
    }
    async function $e() {
      await Yt(), p.value && (p.value.scrollTop = p.value.scrollHeight);
    }
    return ct(c, () => {
      const q = c.value[c.value.length - 1];
      !q || q.role !== "assistant" || (be(q, c.value.length - 1) && tn(), fe(q, c.value.length - 1) && qt(), Oe(q, c.value.length - 1) && Bt());
    }, { deep: !1 }), gn(() => {
      try {
        u.value = localStorage.getItem($a) === "1";
      } catch {
      }
      F() || (c.value.push({ role: "assistant", content: Sa }), B()), qe(), We();
    }), ct(() => n.open, (q) => {
      q && (g.value = !0, Yt(() => {
        var y;
        (y = m.value) == null || y.focus(), $e();
      }));
    }), (q, y) => (w(), st(Lt, { to: "body" }, [
      e.open ? (w(), S("div", {
        key: 0,
        class: De(["bv-ai-panel", { "bv-ai-panel--pro": u.value }])
      }, [
        r("div", {
          class: De(["bv-ai-header", { "bv-ai-header--pro": u.value }])
        }, [
          r("span", gf, [
            ve(gt, {
              name: "sparkle",
              size: 15
            }),
            y[15] || (y[15] = ye(" Books AI ", -1)),
            u.value ? (w(), S("span", vf, "PRO")) : G("", !0)
          ]),
          r("div", yf, [
            r("button", {
              class: De(["bv-ai-pro-toggle", { active: u.value }]),
              onClick: E,
              title: u.value ? "Disable Pro Mode" : "Enable Pro Mode — full app control"
            }, " ⚡ " + T(u.value ? "Pro On" : "Pro"), 11, bf),
            r("button", {
              class: "bv-ai-clear-btn",
              onClick: V,
              title: "Clear conversation"
            }, "🗑"),
            r("button", {
              class: "bv-ai-close",
              onClick: y[0] || (y[0] = (P) => q.$emit("close"))
            }, "✕")
          ])
        ], 2),
        u.value ? (w(), S("div", xf, " ⚡ Pro Mode — AI can create customers, suppliers, items, quotations, record payments, cancel invoices, and update prices. ")) : G("", !0),
        R.value ? (w(), S("div", _f, [
          y[16] || (y[16] = ye(" 📋 Invoice for ", -1)),
          r("strong", null, T(R.value.customer), 1),
          y[17] || (y[17] = ye(" — completing purchase first, then resuming ", -1))
        ])) : G("", !0),
        e.alerts.length && g.value ? (w(), S("div", wf, [
          r("div", { class: "bv-ai-alerts-title" }, [
            y[18] || (y[18] = r("span", null, "🔔 Alerts", -1)),
            r("button", {
              class: "bv-ai-alerts-dismiss",
              onClick: W
            }, "Dismiss")
          ]),
          (w(!0), S(ee, null, Ae(e.alerts, (P, Se) => (w(), S("div", {
            key: Se,
            class: De(["bv-ai-alert-item", `bv-ai-alert-${P.type}`]),
            onClick: (X) => P.action && K(P),
            style: _t(P.action ? "cursor:pointer" : "")
          }, [
            ye(T(P.icon) + " " + T(P.text) + " ", 1),
            P.action ? (w(), S("span", $f, "→")) : G("", !0)
          ], 14, kf))), 128))
        ])) : G("", !0),
        r("div", {
          ref_key: "logEl",
          ref: p,
          class: "bv-ai-log"
        }, [
          (w(!0), S(ee, null, Ae(c.value, (P, Se) => (w(), S("div", {
            key: Se,
            class: De(`bv-ai-msg bv-ai-msg-${P.role}`)
          }, [
            r("div", {
              class: "bv-ai-msg-text",
              innerHTML: v(P.content)
            }, null, 8, Sf),
            j(P, Se) && _.value.length ? (w(), S("div", Cf, [
              y[19] || (y[19] = r("span", { class: "bv-ai-cust-chips-label" }, "Quick select:", -1)),
              (w(!0), S(ee, null, Ae(_.value, (X) => (w(), S("button", {
                key: X.name,
                class: "bv-ai-cust-chip",
                onClick: (Ue) => dt(X)
              }, T(X.customer_name || X.name), 9, Af))), 128))
            ])) : G("", !0),
            te(P, Se) && $.value.length ? (w(), S("div", Ef, [
              y[20] || (y[20] = r("span", { class: "bv-ai-item-chips-label" }, "Top sold items:", -1)),
              (w(!0), S(ee, null, Ae($.value, (X) => (w(), S("button", {
                key: X.item_code || X.name,
                class: "bv-ai-item-chip",
                onClick: (Ue) => z(X)
              }, T(X.item_name || X.item_code || X.name), 9, Nf))), 128))
            ])) : G("", !0),
            Z(P, Se) ? (w(), S(ee, { key: 2 }, [
              I.value.length ? (w(), S("div", Tf, [
                y[21] || (y[21] = r("span", { class: "bv-ai-wh-chips-label" }, "In stock:", -1)),
                (w(!0), S(ee, null, Ae(I.value, (X) => (w(), S("button", {
                  key: X.warehouse,
                  class: "bv-ai-wh-chip",
                  onClick: (Ue) => ne(X)
                }, [
                  ye(T(X.warehouse) + " ", 1),
                  r("span", Rf, T(X.actual_qty) + " units", 1)
                ], 8, Pf))), 128))
              ])) : L.value ? (w(), S("div", If, [
                r("div", Mf, [
                  y[22] || (y[22] = ye("⚠️ No warehouse has stock for ", -1)),
                  r("strong", null, T(L.value), 1)
                ]),
                y[23] || (y[23] = r("div", { class: "bv-ai-nostock-sub" }, "To create this invoice you'll need to receive stock first.", -1)),
                r("div", Of, [
                  r("button", {
                    class: "bv-ai-nostock-btn bv-ai-nostock-btn--primary",
                    onClick: J
                  }, " 🛒 Order from supplier "),
                  r("button", {
                    class: "bv-ai-nostock-btn bv-ai-nostock-btn--secondary",
                    onClick: ae
                  }, " 📦 Add stock manually "),
                  r("button", {
                    class: "bv-ai-nostock-btn bv-ai-nostock-btn--ghost",
                    onClick: y[1] || (y[1] = (X) => de("continue without checking stock"))
                  }, " ⏭ Continue anyway ")
                ])
              ])) : G("", !0)
            ], 64)) : G("", !0),
            fe(P, Se) && f.value.length ? (w(), S("div", Df, [
              y[24] || (y[24] = r("span", { class: "bv-ai-sup-chips-label" }, "Recent suppliers:", -1)),
              (w(!0), S(ee, null, Ae(f.value, (X) => (w(), S("button", {
                key: X.name,
                class: "bv-ai-sup-chip",
                onClick: (Ue) => de(X.supplier_name || X.name)
              }, T(X.supplier_name || X.name), 9, Lf))), 128))
            ])) : G("", !0),
            Ce(P, Se) ? (w(), S("div", qf, [
              y[25] || (y[25] = r("span", { class: "bv-ai-pay-chips-label" }, "Select mode:", -1)),
              (w(), S(ee, null, Ae(o, (X) => r("button", {
                key: X,
                class: "bv-ai-pay-chip",
                onClick: (Ue) => de(X)
              }, T(X), 9, Bf)), 64))
            ])) : G("", !0),
            be(P, Se) && h.value.length ? (w(), S("div", jf, [
              y[26] || (y[26] = r("span", { class: "bv-ai-inv-chips-label" }, "Outstanding invoices:", -1)),
              (w(!0), S(ee, null, Ae(h.value, (X) => (w(), S("button", {
                key: X.name,
                class: "bv-ai-inv-chip",
                onClick: (Ue) => de(X.name)
              }, [
                r("span", Vf, T(X.name), 1),
                r("span", zf, T(X.customer) + " · KES " + T(Number(X.outstanding_amount || 0).toLocaleString()), 1)
              ], 8, Hf))), 128))
            ])) : G("", !0),
            xe(P, Se) ? (w(), S("div", Ff, [
              r("button", {
                class: "bv-ai-yn-chip bv-ai-yn-chip--yes",
                onClick: y[2] || (y[2] = (X) => de("Yes, proceed"))
              }, "✓ Yes, proceed"),
              r("button", {
                class: "bv-ai-yn-chip bv-ai-yn-chip--no",
                onClick: y[3] || (y[3] = (X) => de("No, skip"))
              }, "✕ No, skip")
            ])) : G("", !0),
            Oe(P, Se) && O.value.length ? (w(), S("div", Uf, [
              y[27] || (y[27] = r("span", { class: "bv-ai-pl-chips-label" }, "Price lists:", -1)),
              (w(!0), S(ee, null, Ae(O.value, (X) => (w(), S("button", {
                key: X.name,
                class: "bv-ai-pl-chip",
                onClick: (Ue) => de(X.name)
              }, [
                ye(T(X.name) + " ", 1),
                X.currency ? (w(), S("span", Gf, T(X.currency), 1)) : G("", !0)
              ], 8, Kf))), 128))
            ])) : G("", !0),
            P.confirm ? (w(), S("div", Wf, [
              y[29] || (y[29] = r("div", { class: "bv-ai-confirm-header" }, "📄 Invoice Preview", -1)),
              r("div", Yf, [
                y[28] || (y[28] = r("span", { class: "bv-ai-confirm-label" }, "Customer", -1)),
                r("span", null, T(P.confirm.customer || "—"), 1)
              ]),
              (w(!0), S(ee, null, Ae(P.confirm.items || [], (X, Ue) => (w(), S("div", {
                key: Ue,
                class: "bv-ai-confirm-row"
              }, [
                r("span", Jf, T(X.item_name), 1),
                r("span", null, "× " + T(X.qty) + " @ KES " + T(Number(X.rate || 0).toLocaleString()), 1)
              ]))), 128)),
              x(P.confirm) ? (w(), S("div", Qf, " Total: KES " + T(x(P.confirm).toLocaleString()), 1)) : G("", !0),
              P.confirmed ? (w(), S("div", tm, T(P.confirmed), 1)) : (w(), S("div", Zf, [
                r("button", {
                  class: "bv-ai-confirm-yes",
                  onClick: (X) => U(P)
                }, "✓ Confirm", 8, Xf),
                r("button", {
                  class: "bv-ai-confirm-no",
                  onClick: (X) => ce(P)
                }, "✕ Cancel", 8, em)
              ]))
            ])) : G("", !0),
            P.proAction ? (w(), S("div", {
              key: 9,
              class: De(["bv-ai-confirm-card", P.proAction === "cancel_invoice" ? "bv-ai-confirm-card--danger" : "bv-ai-confirm-card--pro"])
            }, [
              P.proAction === "create_customer" ? (w(), S(ee, { key: 0 }, [
                y[33] || (y[33] = r("div", { class: "bv-ai-confirm-header" }, "👤 New Customer", -1)),
                r("div", nm, [
                  y[30] || (y[30] = r("span", { class: "bv-ai-confirm-label" }, "Name", -1)),
                  r("span", null, T(P.proData.customer_name), 1)
                ]),
                P.proData.email ? (w(), S("div", sm, [
                  y[31] || (y[31] = r("span", { class: "bv-ai-confirm-label" }, "Email", -1)),
                  r("span", null, T(P.proData.email), 1)
                ])) : G("", !0),
                P.proData.mobile_no ? (w(), S("div", om, [
                  y[32] || (y[32] = r("span", { class: "bv-ai-confirm-label" }, "Phone", -1)),
                  r("span", null, T(P.proData.mobile_no), 1)
                ])) : G("", !0)
              ], 64)) : P.proAction === "create_supplier" ? (w(), S(ee, { key: 1 }, [
                y[37] || (y[37] = r("div", { class: "bv-ai-confirm-header" }, "🏭 New Supplier", -1)),
                r("div", im, [
                  y[34] || (y[34] = r("span", { class: "bv-ai-confirm-label" }, "Name", -1)),
                  r("span", null, T(P.proData.supplier_name), 1)
                ]),
                P.proData.email ? (w(), S("div", am, [
                  y[35] || (y[35] = r("span", { class: "bv-ai-confirm-label" }, "Email", -1)),
                  r("span", null, T(P.proData.email), 1)
                ])) : G("", !0),
                P.proData.mobile_no ? (w(), S("div", rm, [
                  y[36] || (y[36] = r("span", { class: "bv-ai-confirm-label" }, "Phone", -1)),
                  r("span", null, T(P.proData.mobile_no), 1)
                ])) : G("", !0)
              ], 64)) : P.proAction === "create_item" ? (w(), S(ee, { key: 2 }, [
                y[43] || (y[43] = r("div", { class: "bv-ai-confirm-header" }, "📦 New Item", -1)),
                r("div", lm, [
                  y[38] || (y[38] = r("span", { class: "bv-ai-confirm-label" }, "Name", -1)),
                  r("span", null, T(P.proData.item_name), 1)
                ]),
                r("div", cm, [
                  y[39] || (y[39] = r("span", { class: "bv-ai-confirm-label" }, "Type", -1)),
                  r("span", null, T(P.proData.item_type || "Product"), 1)
                ]),
                P.proData.item_group ? (w(), S("div", dm, [
                  y[40] || (y[40] = r("span", { class: "bv-ai-confirm-label" }, "Group", -1)),
                  r("span", null, T(P.proData.item_group), 1)
                ])) : G("", !0),
                r("div", um, [
                  y[41] || (y[41] = r("span", { class: "bv-ai-confirm-label" }, "Rate", -1)),
                  r("span", null, "KES " + T(Number(P.proData.rate || 0).toLocaleString()), 1)
                ]),
                r("div", pm, [
                  y[42] || (y[42] = r("span", { class: "bv-ai-confirm-label" }, "UOM", -1)),
                  r("span", null, T(P.proData.uom || "Nos"), 1)
                ])
              ], 64)) : P.proAction === "create_quotation" ? (w(), S(ee, { key: 3 }, [
                y[45] || (y[45] = r("div", { class: "bv-ai-confirm-header" }, "📋 Quotation Preview", -1)),
                r("div", fm, [
                  y[44] || (y[44] = r("span", { class: "bv-ai-confirm-label" }, "Customer", -1)),
                  r("span", null, T(P.proData.customer), 1)
                ]),
                (w(!0), S(ee, null, Ae(P.proData.items || [], (X, Ue) => (w(), S("div", {
                  key: Ue,
                  class: "bv-ai-confirm-row"
                }, [
                  r("span", mm, T(X.item_name), 1),
                  r("span", null, "× " + T(X.qty) + " @ KES " + T(Number(X.rate || 0).toLocaleString()), 1)
                ]))), 128)),
                x(P.proData) ? (w(), S("div", hm, " Total: KES " + T(x(P.proData).toLocaleString()), 1)) : G("", !0)
              ], 64)) : P.proAction === "create_payment" ? (w(), S(ee, { key: 4 }, [
                y[50] || (y[50] = r("div", { class: "bv-ai-confirm-header" }, "💵 Payment Preview", -1)),
                r("div", gm, [
                  y[46] || (y[46] = r("span", { class: "bv-ai-confirm-label" }, "Invoice", -1)),
                  r("span", null, T(P.proData.invoice), 1)
                ]),
                r("div", vm, [
                  y[47] || (y[47] = r("span", { class: "bv-ai-confirm-label" }, "Customer", -1)),
                  r("span", null, T(P.proData.customer), 1)
                ]),
                r("div", ym, [
                  y[48] || (y[48] = r("span", { class: "bv-ai-confirm-label" }, "Amount", -1)),
                  r("span", bm, "KES " + T(Number(P.proData.amount || 0).toLocaleString()), 1)
                ]),
                r("div", xm, [
                  y[49] || (y[49] = r("span", { class: "bv-ai-confirm-label" }, "Mode", -1)),
                  r("span", null, T(P.proData.mode || "Cash"), 1)
                ])
              ], 64)) : P.proAction === "cancel_invoice" ? (w(), S(ee, { key: 5 }, [
                y[54] || (y[54] = r("div", { class: "bv-ai-confirm-header" }, "🚫 Cancel Invoice", -1)),
                r("div", _m, [
                  y[51] || (y[51] = r("span", { class: "bv-ai-confirm-label" }, "Invoice", -1)),
                  r("span", null, T(P.proData.invoice), 1)
                ]),
                r("div", wm, [
                  y[52] || (y[52] = r("span", { class: "bv-ai-confirm-label" }, "Customer", -1)),
                  r("span", null, T(P.proData.customer), 1)
                ]),
                r("div", km, [
                  y[53] || (y[53] = r("span", { class: "bv-ai-confirm-label" }, "Amount", -1)),
                  r("span", null, "KES " + T(Number(P.proData.amount || 0).toLocaleString()), 1)
                ]),
                y[55] || (y[55] = r("div", { style: { "font-size": "11px", color: "#b91c1c", "margin-top": "6px" } }, "⚠️ This action cannot be easily undone.", -1))
              ], 64)) : P.proAction === "update_item_price" ? (w(), S(ee, { key: 6 }, [
                y[59] || (y[59] = r("div", { class: "bv-ai-confirm-header" }, "💲 Price Update", -1)),
                r("div", $m, [
                  y[56] || (y[56] = r("span", { class: "bv-ai-confirm-label" }, "Item", -1)),
                  r("span", null, T(P.proData.item_name), 1)
                ]),
                r("div", Sm, [
                  y[57] || (y[57] = r("span", { class: "bv-ai-confirm-label" }, "Old Rate", -1)),
                  r("span", Cm, "KES " + T(Number(P.proData.old_rate || 0).toLocaleString()), 1)
                ]),
                r("div", Am, [
                  y[58] || (y[58] = r("span", { class: "bv-ai-confirm-label" }, "New Rate", -1)),
                  r("span", Em, "KES " + T(Number(P.proData.new_rate || 0).toLocaleString()), 1)
                ])
              ], 64)) : P.proAction === "create_purchase_order" ? (w(), S(ee, { key: 7 }, [
                y[64] || (y[64] = r("div", { class: "bv-ai-confirm-header" }, "🛒 Purchase Order", -1)),
                r("div", Nm, [
                  y[60] || (y[60] = r("span", { class: "bv-ai-confirm-label" }, "Item", -1)),
                  r("span", null, T(P.proData.item_code), 1)
                ]),
                r("div", Tm, [
                  y[61] || (y[61] = r("span", { class: "bv-ai-confirm-label" }, "Supplier", -1)),
                  r("span", null, T(P.proData.supplier), 1)
                ]),
                r("div", Pm, [
                  y[62] || (y[62] = r("span", { class: "bv-ai-confirm-label" }, "Qty", -1)),
                  r("span", null, T(P.proData.qty), 1)
                ]),
                P.proData.rate ? (w(), S("div", Rm, [
                  y[63] || (y[63] = r("span", { class: "bv-ai-confirm-label" }, "Rate", -1)),
                  r("span", null, "KES " + T(Number(P.proData.rate || 0).toLocaleString()), 1)
                ])) : G("", !0),
                y[65] || (y[65] = r("div", { style: { "font-size": "11px", color: "#15803d", "margin-top": "6px" } }, "✓ Stock will be received immediately after confirmation.", -1))
              ], 64)) : G("", !0),
              P.proConfirmed ? (w(), S("div", Dm, T(P.proConfirmed), 1)) : (w(), S("div", Im, [
                r("button", {
                  class: De(["bv-ai-confirm-yes", P.proAction === "cancel_invoice" ? "bv-ai-confirm-yes--danger" : ""]),
                  onClick: (X) => Q(P)
                }, "✓ Confirm", 10, Mm),
                r("button", {
                  class: "bv-ai-confirm-no",
                  onClick: (X) => re(P)
                }, "✕ Cancel", 8, Om)
              ]))
            ], 2)) : G("", !0),
            P.action && !C(a).has(P.action) && P.action !== "create_invoice_confirm" ? (w(), S("div", Lm, " ✓ " + T(M(P.action)), 1)) : G("", !0)
          ], 2))), 128)),
          d.value ? (w(), S("div", qm, [...y[66] || (y[66] = [
            r("span", null, null, -1),
            r("span", null, null, -1),
            r("span", null, null, -1)
          ])])) : G("", !0)
        ], 512),
        c.value.length <= 1 && !d.value ? (w(), S("div", Bm, [
          r("button", {
            class: "bv-ai-chip",
            onClick: y[4] || (y[4] = (P) => de("Create invoice"))
          }, "📄 New invoice"),
          r("button", {
            class: "bv-ai-chip",
            onClick: y[5] || (y[5] = (P) => de("Show overdue invoices"))
          }, "⚠️ Overdue"),
          r("button", {
            class: "bv-ai-chip",
            onClick: y[6] || (y[6] = (P) => de("Revenue this month"))
          }, "📈 Revenue"),
          r("button", {
            class: "bv-ai-chip",
            onClick: y[7] || (y[7] = (P) => de("Business summary"))
          }, "📊 Summary"),
          r("button", {
            class: "bv-ai-chip",
            onClick: y[8] || (y[8] = (P) => de("Profit estimate this month"))
          }, "💰 Profit"),
          u.value ? (w(), S(ee, { key: 0 }, [
            r("button", {
              class: "bv-ai-chip bv-ai-chip--pro",
              onClick: y[9] || (y[9] = (P) => de("Create a new customer"))
            }, "👤 New customer"),
            r("button", {
              class: "bv-ai-chip bv-ai-chip--pro",
              onClick: y[10] || (y[10] = (P) => de("Record a payment for an invoice"))
            }, "💵 Record payment"),
            r("button", {
              class: "bv-ai-chip bv-ai-chip--pro",
              onClick: y[11] || (y[11] = (P) => de("Create a quotation"))
            }, "📋 New quote"),
            r("button", {
              class: "bv-ai-chip bv-ai-chip--pro",
              onClick: y[12] || (y[12] = (P) => de("Update item price"))
            }, "💲 Update price")
          ], 64)) : G("", !0),
          r("button", {
            class: "bv-ai-chip",
            onClick: y[13] || (y[13] = (P) => de("help"))
          }, "❓ Help")
        ])) : G("", !0),
        r("form", {
          class: "bv-ai-input",
          onSubmit: Fe(ke, ["prevent"])
        }, [
          oe(r("input", {
            ref_key: "inputEl",
            ref: m,
            "onUpdate:modelValue": y[14] || (y[14] = (P) => l.value = P),
            disabled: d.value,
            placeholder: u.value ? "Create, update, or query anything…" : "Ask about invoices, revenue, stock levels…",
            onKeydown: cl(Fe(ke, ["prevent"]), ["enter"])
          }, null, 40, jm), [
            [ge, l.value]
          ]),
          r("button", {
            type: "submit",
            disabled: d.value || !l.value.trim(),
            class: De(["bv-ai-send", { "bv-ai-send--pro": u.value }])
          }, "→", 10, Hm)
        ], 32)
      ], 2)) : G("", !0)
    ]));
  }
}, zm = {
  __name: "TutorialOverlay",
  setup(e) {
    const t = /* @__PURE__ */ pe(!1);
    gn(() => {
      t.value = !!window.__booksIsNewUser;
    });
    function n() {
      t.value = !1, Np();
    }
    return (s, o) => (w(), st(Lt, { to: "body" }, [
      t.value ? (w(), S("div", {
        key: 0,
        class: "bv-tutorial-overlay",
        onClick: Fe(n, ["self"])
      }, [
        r("div", { class: "bv-tutorial-card" }, [
          o[0] || (o[0] = r("h2", null, "Welcome to Books", -1)),
          o[1] || (o[1] = r("p", null, "This is your accounting workspace. The sidebar groups everything by Sales, Purchases, Banking, and Accounting. Start by adding your first customer or recording an invoice.", -1)),
          r("button", {
            class: "nim-btn nim-btn-primary",
            onClick: n
          }, "Got it")
        ])
      ])) : G("", !0)
    ]));
  }
}, Fm = { class: "bv-toast-stack" }, Um = {
  __name: "Toast",
  setup(e) {
    const { items: t } = vn();
    return (n, s) => (w(), st(Lt, { to: "body" }, [
      r("div", Fm, [
        (w(!0), S(ee, null, Ae(C(t), (o) => (w(), S("div", {
          key: o.id,
          class: De(["bv-toast", `bv-toast-${o.type}`])
        }, T(o.message), 3))), 128))
      ])
    ]));
  }
}, Km = {
  key: 0,
  class: "nim-dialog-header"
}, Gm = { class: "nim-dialog-body" }, Wm = {
  key: 1,
  class: "nim-dialog-footer"
}, Rl = {
  __name: "Modal",
  props: {
    show: { type: Boolean, required: !0 },
    title: { type: String, default: "" },
    width: { type: String, default: "560px" },
    closable: { type: Boolean, default: !0 },
    closeOnBackdrop: { type: Boolean, default: !0 }
  },
  emits: ["close"],
  setup(e) {
    return (t, n) => (w(), st(Lt, { to: "body" }, [
      e.show ? (w(), S("div", {
        key: 0,
        class: "nim-overlay",
        onMousedown: n[1] || (n[1] = Fe((s) => e.closeOnBackdrop && t.$emit("close"), ["self"]))
      }, [
        r("div", {
          class: "nim-dialog",
          style: _t({ maxWidth: e.width })
        }, [
          t.$slots.header || e.title ? (w(), S("div", Km, [
            uo(t.$slots, "header", {}, () => [
              r("h3", null, T(e.title), 1),
              e.closable ? (w(), S("button", {
                key: 0,
                class: "nim-dialog-close",
                onClick: n[0] || (n[0] = (s) => t.$emit("close"))
              }, "✕")) : G("", !0)
            ])
          ])) : G("", !0),
          r("div", Gm, [
            uo(t.$slots, "default")
          ]),
          t.$slots.footer ? (w(), S("div", Wm, [
            uo(t.$slots, "footer")
          ])) : G("", !0)
        ], 4)
      ], 32)) : G("", !0)
    ]));
  }
}, Ym = { class: "bv-confirm-header" }, Jm = ["innerHTML"], Qm = {
  key: 1,
  class: "bv-confirm-cards"
}, Zm = { class: "bv-confirm-card-top" }, Xm = { class: "bv-confirm-card-title" }, eh = {
  key: 0,
  class: "bv-confirm-card-fields"
}, th = { class: "bv-confirm-field-label" }, nh = {
  __name: "Confirm",
  setup(e) {
    const { state: t, _ok: n, _cancel: s } = no();
    return (o, a) => (w(), st(Rl, {
      show: C(t).open,
      width: C(t).width,
      onClose: C(s)
    }, Jc({
      footer: Sn(() => [
        C(t).hideCancel ? G("", !0) : (w(), S("button", {
          key: 0,
          class: "nim-btn",
          onClick: a[2] || (a[2] = (...i) => C(s) && C(s)(...i))
        }, T(C(t).cancelLabel), 1)),
        r("button", {
          class: De(["nim-btn", C(t).okStyle === "danger" ? "nim-btn-danger" : C(t).icon ? "nim-btn-dark" : "nim-btn-primary"]),
          onClick: a[3] || (a[3] = (...i) => C(n) && C(n)(...i))
        }, T(C(t).okLabel), 3)
      ]),
      default: Sn(() => [
        C(t).body ? (w(), S("div", {
          key: 0,
          class: "bv-confirm-body",
          innerHTML: C(t).body
        }, null, 8, Jm)) : G("", !0),
        C(t).items && C(t).items.length ? (w(), S("div", Qm, [
          (w(!0), S(ee, null, Ae(C(t).items, (i, l) => (w(), S("div", {
            key: l,
            class: "bv-confirm-card"
          }, [
            r("div", Zm, [
              r("span", Xm, T(i.title), 1),
              i.badge ? (w(), S("span", {
                key: 0,
                class: De(["bv-confirm-badge", `bv-confirm-badge-${i.badge.tone || "default"}`])
              }, T(i.badge.label), 3)) : G("", !0)
            ]),
            i.fields && i.fields.length ? (w(), S("div", eh, [
              (w(!0), S(ee, null, Ae(i.fields, (d, u) => (w(), S("div", {
                key: u,
                class: "bv-confirm-field"
              }, [
                r("div", th, T(d.label), 1),
                r("div", {
                  class: De(["bv-confirm-field-value", d.tone ? `bv-confirm-field-value-${d.tone}` : ""])
                }, T(d.value), 3)
              ]))), 128))
            ])) : G("", !0)
          ]))), 128))
        ])) : G("", !0)
      ]),
      _: 2
    }, [
      C(t).icon ? {
        name: "header",
        fn: Sn(() => [
          r("div", Ym, [
            r("span", {
              class: De(["bv-confirm-icon", `bv-confirm-icon-${C(t).icon}`])
            }, "!", 2),
            r("h3", null, T(C(t).title), 1)
          ]),
          r("button", {
            class: "nim-dialog-close",
            onClick: a[0] || (a[0] = (...i) => C(s) && C(s)(...i))
          }, "✕")
        ]),
        key: "0"
      } : {
        name: "header",
        fn: Sn(() => [
          r("h3", null, T(C(t).title), 1),
          r("button", {
            class: "nim-dialog-close",
            onClick: a[1] || (a[1] = (...i) => C(s) && C(s)(...i))
          }, "✕")
        ]),
        key: "1"
      }
    ]), 1032, ["show", "width", "onClose"]));
  }
}, Ve = /* @__PURE__ */ ze({
  open: !1,
  title: "",
  label: "",
  value: "",
  placeholder: "",
  okLabel: "OK",
  cancelLabel: "Cancel",
  inputType: "text",
  // "text" | "email" | "number"
  resolve: null
});
function sh() {
  function e({
    title: s = "Enter a value",
    label: o = "",
    defaultValue: a = "",
    placeholder: i = "",
    okLabel: l = "OK",
    cancelLabel: d = "Cancel",
    inputType: u = "text"
  } = {}) {
    return new Promise((c) => {
      Ve.title = s, Ve.label = o, Ve.value = a || "", Ve.placeholder = i, Ve.okLabel = l, Ve.cancelLabel = d, Ve.inputType = u, Ve.resolve = c, Ve.open = !0;
    });
  }
  function t() {
    var o;
    const s = (Ve.value ?? "").trim();
    Ve.open = !1, (o = Ve.resolve) == null || o.call(Ve, s || null), Ve.resolve = null;
  }
  function n() {
    var s;
    Ve.open = !1, (s = Ve.resolve) == null || s.call(Ve, null), Ve.resolve = null;
  }
  return { state: Ve, prompt: e, _ok: t, _cancel: n };
}
const oh = { class: "bv-prompt-body" }, ih = {
  key: 0,
  class: "bv-prompt-label"
}, ah = ["type", "placeholder"], rh = {
  __name: "PromptDialog",
  setup(e) {
    const { state: t, _ok: n, _cancel: s } = sh(), o = /* @__PURE__ */ pe(null);
    return ct(() => t.open, (a) => {
      a && Yt(() => {
        var i;
        return (i = o.value) == null ? void 0 : i.focus();
      });
    }), (a, i) => (w(), st(Rl, {
      show: C(t).open,
      title: C(t).title,
      width: "420px",
      onClose: C(s)
    }, {
      footer: Sn(() => [
        r("button", {
          class: "nim-btn",
          onClick: i[2] || (i[2] = (...l) => C(s) && C(s)(...l))
        }, T(C(t).cancelLabel), 1),
        r("button", {
          class: "nim-btn nim-btn-primary",
          onClick: i[3] || (i[3] = (...l) => C(n) && C(n)(...l))
        }, T(C(t).okLabel), 1)
      ]),
      default: Sn(() => [
        r("div", oh, [
          C(t).label ? (w(), S("label", ih, T(C(t).label), 1)) : G("", !0),
          oe(r("input", {
            ref_key: "inputEl",
            ref: o,
            "onUpdate:modelValue": i[0] || (i[0] = (l) => C(t).value = l),
            type: C(t).inputType,
            placeholder: C(t).placeholder,
            class: "nim-input bv-prompt-input",
            onKeyup: i[1] || (i[1] = cl((...l) => C(n) && C(n)(...l), ["enter"]))
          }, null, 40, ah), [
            [du, C(t).value]
          ])
        ])
      ]),
      _: 1
    }, 8, ["show", "title", "onClose"]));
  }
}, on = /* @__PURE__ */ ze({ open: !1, doctype: "", prefill: "", resolve: null });
function lh() {
  function e(s, o = "") {
    return new Promise((a) => {
      Object.assign(on, { open: !0, doctype: s, prefill: o, resolve: a });
    });
  }
  function t(s) {
    on.open = !1;
    const o = on.resolve;
    on.resolve = null, o == null || o(s);
  }
  function n() {
    on.open = !1;
    const s = on.resolve;
    on.resolve = null, s == null || s(null);
  }
  return { state: on, openCreate: e, complete: t, cancel: n };
}
const Il = {
  Kenya: [
    "Baringo",
    "Bomet",
    "Bungoma",
    "Busia",
    "Elgeyo-Marakwet",
    "Embu",
    "Garissa",
    "Homa Bay",
    "Isiolo",
    "Kajiado",
    "Kakamega",
    "Kericho",
    "Kiambu",
    "Kilifi",
    "Kirinyaga",
    "Kisii",
    "Kisumu",
    "Kitui",
    "Kwale",
    "Laikipia",
    "Lamu",
    "Machakos",
    "Makueni",
    "Mandera",
    "Marsabit",
    "Meru",
    "Migori",
    "Mombasa",
    "Murang'a",
    "Nairobi",
    "Nakuru",
    "Nandi",
    "Narok",
    "Nyamira",
    "Nyandarua",
    "Nyeri",
    "Samburu",
    "Siaya",
    "Taita-Taveta",
    "Tana River",
    "Tharaka-Nithi",
    "Trans Nzoia",
    "Turkana",
    "Uasin Gishu",
    "Vihiga",
    "Wajir",
    "West Pokot"
  ],
  India: [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ],
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia"
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Australia: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia"
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon"
  ],
  "United Arab Emirates": [
    "Abu Dhabi",
    "Ajman",
    "Dubai",
    "Fujairah",
    "Ras Al Khaimah",
    "Sharjah",
    "Umm Al Quwain"
  ],
  Germany: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia"
  ],
  France: [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Brittany",
    "Centre-Val de Loire",
    "Corsica",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandy",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur"
  ],
  Singapore: [
    "Central Region",
    "East Region",
    "North Region",
    "North-East Region",
    "West Region"
  ],
  Malaysia: [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu"
  ],
  "Sri Lanka": [
    "Central",
    "Eastern",
    "North Central",
    "Northern",
    "North Western",
    "Sabaragamuwa",
    "Southern",
    "Uva",
    "Western"
  ],
  "Saudi Arabia": [
    "Riyadh",
    "Makkah",
    "Madinah",
    "Qassim",
    "Eastern Province",
    "Asir",
    "Tabuk",
    "Hail",
    "Northern Borders",
    "Jazan",
    "Najran",
    "Bahah",
    "Jawf"
  ],
  Pakistan: [
    "Balochistan",
    "Khyber Pakhtunkhwa",
    "Punjab",
    "Sindh",
    "Azad Kashmir",
    "Gilgit-Baltistan",
    "Islamabad Capital Territory"
  ],
  Bangladesh: [
    "Barisal",
    "Chittagong",
    "Dhaka",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet"
  ],
  Nepal: [
    "Koshi",
    "Madhesh",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpashchim"
  ],
  "South Africa": [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape"
  ],
  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
    "Distrito Federal"
  ],
  China: [
    "Anhui",
    "Beijing",
    "Chongqing",
    "Fujian",
    "Gansu",
    "Guangdong",
    "Guangxi",
    "Guizhou",
    "Hainan",
    "Hebei",
    "Heilongjiang",
    "Henan",
    "Hubei",
    "Hunan",
    "Inner Mongolia",
    "Jiangsu",
    "Jiangxi",
    "Jilin",
    "Liaoning",
    "Ningxia",
    "Qinghai",
    "Shaanxi",
    "Shandong",
    "Shanghai",
    "Shanxi",
    "Sichuan",
    "Tianjin",
    "Tibet",
    "Xinjiang",
    "Yunnan",
    "Zhejiang"
  ],
  Japan: [
    "Aichi",
    "Akita",
    "Aomori",
    "Chiba",
    "Ehime",
    "Fukui",
    "Fukuoka",
    "Fukushima",
    "Gifu",
    "Gunma",
    "Hiroshima",
    "Hokkaido",
    "Hyogo",
    "Ibaraki",
    "Ishikawa",
    "Iwate",
    "Kagawa",
    "Kagoshima",
    "Kanagawa",
    "Kochi",
    "Kumamoto",
    "Kyoto",
    "Mie",
    "Miyagi",
    "Miyazaki",
    "Nagano",
    "Nagasaki",
    "Nara",
    "Niigata",
    "Oita",
    "Okayama",
    "Okinawa",
    "Osaka",
    "Saga",
    "Saitama",
    "Shiga",
    "Shimane",
    "Shizuoka",
    "Tochigi",
    "Tokushima",
    "Tokyo",
    "Tottori",
    "Toyama",
    "Wakayama",
    "Yamagata",
    "Yamaguchi",
    "Yamanashi"
  ]
}, Ml = Object.keys(Il), ch = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Angola",
  "Argentina",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Belgium",
  "Bolivia",
  "Bulgaria",
  "Cambodia",
  "Chile",
  "Colombia",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Ethiopia",
  "Finland",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hungary",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Maldives",
  "Malta",
  "Mexico",
  "Morocco",
  "Myanmar",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",
  "Panama",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Senegal",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Zambia",
  "Zimbabwe"
].filter((e) => !Ml.includes(e)), So = [...Ml, ...ch.sort()];
function Pn(e) {
  return Il[e] || [];
}
const dh = {
  "01": "Jammu and Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  10: "Bihar",
  11: "Sikkim",
  12: "Arunachal Pradesh",
  13: "Nagaland",
  14: "Manipur",
  15: "Mizoram",
  16: "Tripura",
  17: "Meghalaya",
  18: "Assam",
  19: "West Bengal",
  20: "Jharkhand",
  21: "Odisha",
  22: "Chhattisgarh",
  23: "Madhya Pradesh",
  24: "Gujarat",
  25: "Daman and Diu",
  26: "Dadra and Nagar Haveli",
  27: "Maharashtra",
  28: "Andhra Pradesh",
  29: "Karnataka",
  30: "Goa",
  31: "Lakshadweep",
  32: "Kerala",
  33: "Tamil Nadu",
  34: "Puducherry",
  35: "Andaman and Nicobar Islands",
  36: "Telangana",
  37: "Andhra Pradesh",
  38: "Ladakh"
};
function k0(e) {
  return !e || e.length < 2 ? "" : dh[e.slice(0, 2)] || "";
}
const $0 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, S0 = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, uh = /^[AP][0-9]{9}[A-Z]$/, C0 = /^[A-Z]{4}0[A-Z0-9]{6}$/, A0 = /^https?:\/\/.+\..+/, ph = {
  "+254": { min: 9, max: 9, pattern: /^[17]\d{8}$/, hint: "9 digits starting with 7 or 1 (Kenya)" },
  "+91": { min: 10, max: 10, pattern: /^[6-9]\d{9}$/, hint: "10 digits starting with 6–9 (India)" },
  "+1": { min: 10, max: 10, pattern: /^\d{10}$/, hint: "10 digits (US/Canada)" },
  "+44": { min: 10, max: 10, pattern: /^7\d{9}$/, hint: "10 digits starting with 7 (UK mobile)" },
  "+61": { min: 9, max: 9, pattern: /^4\d{8}$/, hint: "9 digits starting with 4 (Australia)" },
  "+971": { min: 9, max: 9, pattern: /^5\d{8}$/, hint: "9 digits starting with 5 (UAE)" },
  "+65": { min: 8, max: 8, pattern: /^[689]\d{7}$/, hint: "8 digits starting with 6, 8, or 9 (Singapore)" },
  "+49": { min: 10, max: 12, pattern: /^\d{10,12}$/, hint: "10–12 digits (Germany)" },
  "+33": { min: 9, max: 9, pattern: /^\d{9}$/, hint: "9 digits (France)" },
  "+60": { min: 9, max: 10, pattern: /^\d{9,10}$/, hint: "9–10 digits (Malaysia)" },
  "+94": { min: 9, max: 9, pattern: /^\d{9}$/, hint: "9 digits (Sri Lanka)" },
  "+966": { min: 9, max: 9, pattern: /^5\d{8}$/, hint: "9 digits starting with 5 (Saudi Arabia)" },
  "+92": { min: 10, max: 10, pattern: /^3\d{9}$/, hint: "10 digits starting with 3 (Pakistan)" },
  "+880": { min: 10, max: 10, pattern: /^\d{10}$/, hint: "10 digits (Bangladesh)" },
  "+977": { min: 10, max: 10, pattern: /^\d{10}$/, hint: "10 digits (Nepal)" },
  "+27": { min: 9, max: 9, pattern: /^\d{9}$/, hint: "9 digits (South Africa)" },
  "+55": { min: 10, max: 11, pattern: /^\d{10,11}$/, hint: "10–11 digits (Brazil)" },
  "+86": { min: 11, max: 11, pattern: /^\d{11}$/, hint: "11 digits (China)" },
  "+81": { min: 10, max: 11, pattern: /^\d{10,11}$/, hint: "10–11 digits (Japan)" }
}, fh = {
  Kenya: { pattern: /^\d{5}$/, placeholder: "00100", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  India: { pattern: /^\d{6}$/, placeholder: "400001", hint: "6 digits", filterRe: /\D/g, maxlen: 6 },
  "United States": { pattern: /^\d{5}(-\d{4})?$/, placeholder: "90210", hint: "5 digits (e.g. 90210)", filterRe: /[^\d-]/g, maxlen: 10 },
  "United Kingdom": { pattern: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, placeholder: "SW1A 1AA", hint: "e.g. SW1A 1AA", filterRe: /[^A-Za-z0-9\s]/g, maxlen: 8 },
  Canada: { pattern: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, placeholder: "K1A 0A9", hint: "A1A 1A1 format", filterRe: /[^A-Za-z0-9\s]/g, maxlen: 7 },
  Australia: { pattern: /^\d{4}$/, placeholder: "2000", hint: "4 digits", filterRe: /\D/g, maxlen: 4 },
  Germany: { pattern: /^\d{5}$/, placeholder: "10115", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  France: { pattern: /^\d{5}$/, placeholder: "75001", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  Singapore: { pattern: /^\d{6}$/, placeholder: "018956", hint: "6 digits", filterRe: /\D/g, maxlen: 6 },
  Malaysia: { pattern: /^\d{5}$/, placeholder: "50480", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  Japan: { pattern: /^\d{3}-?\d{4}$/, placeholder: "100-0001", hint: "7 digits (NNN-NNNN)", filterRe: /[^\d-]/g, maxlen: 8 },
  China: { pattern: /^\d{6}$/, placeholder: "100000", hint: "6 digits", filterRe: /\D/g, maxlen: 6 },
  Brazil: { pattern: /^\d{5}-?\d{3}$/, placeholder: "01310-100", hint: "8 digits (NNNNN-NNN)", filterRe: /[^\d-]/g, maxlen: 9 },
  "South Africa": { pattern: /^\d{4}$/, placeholder: "8001", hint: "4 digits", filterRe: /\D/g, maxlen: 4 },
  "Sri Lanka": { pattern: /^\d{5}$/, placeholder: "10230", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  Pakistan: { pattern: /^\d{5}$/, placeholder: "75500", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  Nepal: { pattern: /^\d{5}$/, placeholder: "44600", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  Bangladesh: { pattern: /^\d{4}$/, placeholder: "1212", hint: "4 digits", filterRe: /\D/g, maxlen: 4 },
  "Saudi Arabia": { pattern: /^\d{5}$/, placeholder: "12345", hint: "5 digits", filterRe: /\D/g, maxlen: 5 },
  "United Arab Emirates": { pattern: /^\d{0,6}$/, placeholder: "", hint: "optional (up to 6 digits)", filterRe: /\D/g, maxlen: 6 }
};
function E0(e, t) {
  if (!e) return null;
  const n = ph[t];
  return n ? n.pattern.test(e) ? null : `Invalid mobile — ${n.hint}` : e.length < 7 || e.length > 15 ? "Enter a valid mobile number (7–15 digits)" : null;
}
function N0(e) {
  return e && e.replace(/[^\d]/g, "").length < 6 ? "Enter a valid phone number (at least 6 digits)" : null;
}
function T0(e, t) {
  if (!e) return null;
  const n = fh[t];
  return n ? n.pattern.test(e.trim()) ? null : `Invalid postcode — expected ${n.hint}` : null;
}
const mh = { class: "qcd-panel" }, hh = { class: "qcd-header" }, gh = { class: "qcd-title" }, vh = { class: "qcd-body" }, yh = { class: "qcd-grid" }, bh = { class: "qcd-field qcd-full" }, xh = { class: "qcd-field" }, _h = { class: "qcd-field" }, wh = { class: "qcd-field" }, kh = { class: "qcd-field" }, $h = { class: "qcd-field" }, Sh = ["value"], Ch = { class: "qcd-field" }, Ah = ["value"], Eh = { class: "qcd-field" }, Nh = ["value"], Th = { class: "qcd-grid" }, Ph = { class: "qcd-field qcd-full" }, Rh = { class: "qcd-field" }, Ih = { class: "qcd-field" }, Mh = { class: "qcd-field" }, Oh = { class: "qcd-field" }, Dh = { class: "qcd-field" }, Lh = ["value"], qh = { class: "qcd-field" }, Bh = ["value"], jh = { class: "qcd-field" }, Hh = ["value"], Vh = { class: "qcd-grid" }, zh = { class: "qcd-field qcd-full" }, Fh = { class: "qcd-field" }, Uh = { class: "qcd-field" }, Kh = { class: "qcd-field" }, Gh = { class: "qcd-field" }, Wh = { class: "qcd-field" }, Yh = ["value"], Jh = { class: "qcd-grid" }, Qh = { class: "qcd-field qcd-full" }, Zh = { class: "qcd-field" }, Xh = { class: "qcd-field" }, e1 = ["value"], t1 = { class: "qcd-field qcd-full" }, n1 = { class: "qcd-field" }, s1 = { class: "qcd-field" }, o1 = { class: "qcd-field" }, i1 = ["value"], a1 = { class: "qcd-field" }, r1 = ["value"], l1 = { class: "qcd-grid" }, c1 = { class: "qcd-field qcd-full" }, d1 = { class: "qcd-field" }, u1 = { class: "qcd-field" }, p1 = ["value"], f1 = { class: "qcd-field qcd-full" }, m1 = {
  key: 5,
  class: "qcd-grid"
}, h1 = { class: "qcd-field qcd-full" }, g1 = ["placeholder"], v1 = { class: "qcd-footer" }, y1 = ["disabled"], b1 = {
  __name: "QuickCreateDrawer",
  setup(e) {
    const { state: t, complete: n, cancel: s } = lh(), { toast: o } = vn(), a = /* @__PURE__ */ pe(!1), i = /* @__PURE__ */ ze({}), l = /* @__PURE__ */ pe([]), d = /* @__PURE__ */ pe([]), u = /* @__PURE__ */ pe([]), c = ["Due on Receipt", "Net 7", "Net 15", "Net 30", "Net 45", "Net 60", "Net 90"], p = /* @__PURE__ */ pe(["Due on Receipt", "Net 7", "Net 15", "Net 30", "Net 60", "Net 90", "End of Month"]), m = { Customer: "Customer", Supplier: "Vendor / Supplier", Item: "Item", Warehouse: "Warehouse", Account: "Account" };
    async function g() {
      try {
        const f = (await Wt("Payment Terms", { fields: ["name"], order: "credit_days asc, name asc", limit: 100 }) || []).map((h) => h.name).filter(Boolean);
        f.length && (p.value = f);
      } catch {
      }
    }
    gn(async () => {
      g();
      try {
        const I = await Wt("UOM", { fields: ["name"], order: "name asc", limit: 200 });
        l.value = (I || []).map((f) => f.name);
      } catch {
        l.value = ["Nos", "Kg", "Ltr", "Mtr", "Box", "Pcs", "Set", "Dozen"];
      }
      try {
        const I = await Wt("Warehouse", { fields: ["name"], filters: [["is_group", "=", 1], ["disabled", "=", 0]], order: "name asc", limit: 100 });
        d.value = (I || []).map((f) => f.name);
      } catch {
        d.value = [];
      }
      try {
        const I = await Wt("Account", { fields: ["name"], filters: [["is_group", "=", 1]], order: "name asc", limit: 300 });
        u.value = (I || []).map((f) => f.name);
      } catch {
        u.value = [];
      }
    }), ct(() => t.open, (I) => {
      if (I) {
        for (const f in i) delete i[f];
        t.doctype === "Customer" ? Object.assign(i, {
          customer_name: t.prefill,
          customer_type: "Company",
          gst_treatment: "Registered Business",
          email_id: "",
          mobile_no: "",
          tax_id: "",
          country: "Kenya",
          state: "",
          payment_terms: ""
        }) : t.doctype === "Supplier" ? Object.assign(i, {
          supplier_name: t.prefill,
          supplier_type: "Company",
          email_id: "",
          mobile_no: "",
          tax_id: "",
          country: "Kenya",
          state: "",
          payment_terms: ""
        }) : t.doctype === "Item" ? Object.assign(i, {
          item_name: t.prefill,
          item_code: "",
          item_group: "All Item Groups",
          item_type: "Product",
          standard_rate: 0,
          stock_uom: "Nos",
          hsn_code: ""
        }) : t.doctype === "Warehouse" ? Object.assign(i, {
          warehouse_name: t.prefill,
          warehouse_type: "Stores",
          parent_warehouse: "",
          address_line_1: "",
          city: "",
          state: "",
          pin: "",
          country: "Kenya"
        }) : t.doctype === "Account" ? Object.assign(i, {
          account_name: t.prefill,
          account_type: "",
          parent_account: "",
          account_number: ""
        }) : i.name = t.prefill;
      }
    });
    function _() {
      a.value || s();
    }
    async function $() {
      var I, f, h, O, L, b, R;
      if (t.doctype === "Customer" && !((I = i.customer_name) != null && I.trim())) {
        o("Customer Name is required", "error");
        return;
      }
      if (t.doctype === "Supplier" && !((f = i.supplier_name) != null && f.trim())) {
        o("Supplier Name is required", "error");
        return;
      }
      if (t.doctype === "Supplier") {
        const A = (i.tax_id || "").trim();
        if (!A) {
          o("KRA PIN is required", "error");
          return;
        }
        if (!uh.test(A)) {
          o("Invalid KRA PIN (e.g. A123456789Z)", "error");
          return;
        }
      }
      if (t.doctype === "Item" && !((h = i.item_name) != null && h.trim())) {
        o("Item Name is required", "error");
        return;
      }
      if (t.doctype === "Warehouse" && !((O = i.warehouse_name) != null && O.trim())) {
        o("Warehouse Name is required", "error");
        return;
      }
      if (t.doctype === "Account") {
        if (!((L = i.account_name) != null && L.trim())) {
          o("Account Name is required", "error");
          return;
        }
        if (!((b = i.parent_account) != null && b.trim())) {
          o("Parent Account is required", "error");
          return;
        }
      }
      if (!t.doctype && !((R = i.name) != null && R.trim())) {
        o("Name is required", "error");
        return;
      }
      a.value = !0;
      try {
        const A = await Tl(), D = { doctype: t.doctype };
        for (const [j, te] of Object.entries(i))
          te !== "" && te !== null && te !== void 0 && (D[j] = te);
        A && (["Customer", "Supplier", "Item"].includes(t.doctype) && (D.books_company = A), ["Warehouse", "Account"].includes(t.doctype) && (D.company = A));
        const N = await Al(D), M = (N == null ? void 0 : N.name) || N, H = t.doctype === "Customer" ? i.customer_name || M : t.doctype === "Supplier" ? i.supplier_name || M : t.doctype === "Item" ? i.item_name || M : t.doctype === "Warehouse" ? i.warehouse_name || M : t.doctype === "Account" && i.account_name || M;
        o(`${m[t.doctype] || t.doctype} "${H}" created`, "success"), n({ name: M, label: H });
      } catch (A) {
        o("Failed to create: " + ((A == null ? void 0 : A.message) || String(A)), "error");
      } finally {
        a.value = !1;
      }
    }
    return (I, f) => (w(), st(Lt, { to: "body" }, [
      C(t).open ? (w(), S("div", {
        key: 0,
        class: "qcd-backdrop",
        onMousedown: Fe(_, ["self"])
      }, [
        r("div", mh, [
          r("div", hh, [
            r("div", null, [
              r("div", gh, "Create New " + T(m[C(t).doctype] || C(t).doctype), 1),
              f[46] || (f[46] = r("div", { class: "qcd-subtitle" }, "Fill in the details below — the record will be auto-selected after saving", -1))
            ]),
            r("button", {
              class: "qcd-close",
              onClick: _,
              title: "Close"
            }, [...f[47] || (f[47] = [
              r("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                r("line", {
                  x1: "18",
                  y1: "6",
                  x2: "6",
                  y2: "18"
                }),
                r("line", {
                  x1: "6",
                  y1: "6",
                  x2: "18",
                  y2: "18"
                })
              ], -1)
            ])])
          ]),
          r("div", vh, [
            C(t).doctype === "Customer" ? (w(), S(ee, { key: 0 }, [
              f[62] || (f[62] = r("div", { class: "qcd-section" }, "Contact Details", -1)),
              r("div", yh, [
                r("div", bh, [
                  f[48] || (f[48] = r("label", { class: "qcd-lbl" }, [
                    ye("Customer Name "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[0] || (f[0] = (h) => i.customer_name = h),
                    class: "qcd-input",
                    placeholder: "Full name or business name",
                    autofocus: ""
                  }, null, 512), [
                    [ge, i.customer_name]
                  ])
                ]),
                r("div", xh, [
                  f[50] || (f[50] = r("label", { class: "qcd-lbl" }, "Customer Type", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[1] || (f[1] = (h) => i.customer_type = h),
                    class: "qcd-input"
                  }, [...f[49] || (f[49] = [
                    r("option", { value: "Company" }, "Company", -1),
                    r("option", { value: "Individual" }, "Individual", -1)
                  ])], 512), [
                    [je, i.customer_type]
                  ])
                ]),
                G("", !0),
                r("div", _h, [
                  f[53] || (f[53] = r("label", { class: "qcd-lbl" }, "Email", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[3] || (f[3] = (h) => i.email_id = h),
                    type: "email",
                    class: "qcd-input",
                    placeholder: "contact@example.com"
                  }, null, 512), [
                    [ge, i.email_id]
                  ])
                ]),
                r("div", wh, [
                  f[54] || (f[54] = r("label", { class: "qcd-lbl" }, "Mobile", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[4] || (f[4] = (h) => i.mobile_no = h),
                    type: "tel",
                    class: "qcd-input",
                    placeholder: "712345678"
                  }, null, 512), [
                    [ge, i.mobile_no]
                  ])
                ]),
                r("div", kh, [
                  f[55] || (f[55] = r("label", { class: "qcd-lbl" }, "KRA PIN", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[5] || (f[5] = (h) => i.tax_id = h),
                    class: "qcd-input",
                    placeholder: "A123456789Z",
                    onInput: f[6] || (f[6] = (h) => i.tax_id = i.tax_id.toUpperCase())
                  }, null, 544), [
                    [ge, i.tax_id]
                  ])
                ]),
                r("div", $h, [
                  f[57] || (f[57] = r("label", { class: "qcd-lbl" }, "Country", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[7] || (f[7] = (h) => i.country = h),
                    class: "qcd-input",
                    onChange: f[8] || (f[8] = (h) => i.state = "")
                  }, [
                    f[56] || (f[56] = r("option", { value: "" }, "— Select Country —", -1)),
                    (w(!0), S(ee, null, Ae(C(So), (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, Sh))), 128))
                  ], 544), [
                    [je, i.country]
                  ])
                ]),
                r("div", Ch, [
                  f[59] || (f[59] = r("label", { class: "qcd-lbl" }, "State", -1)),
                  C(Pn)(i.country).length ? oe((w(), S("select", {
                    key: 0,
                    "onUpdate:modelValue": f[9] || (f[9] = (h) => i.state = h),
                    class: "qcd-input"
                  }, [
                    f[58] || (f[58] = r("option", { value: "" }, "— Select State —", -1)),
                    (w(!0), S(ee, null, Ae(C(Pn)(i.country), (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, Ah))), 128))
                  ], 512)), [
                    [je, i.state]
                  ]) : oe((w(), S("input", {
                    key: 1,
                    "onUpdate:modelValue": f[10] || (f[10] = (h) => i.state = h),
                    class: "qcd-input",
                    placeholder: "State"
                  }, null, 512)), [
                    [ge, i.state]
                  ])
                ]),
                r("div", null, [
                  r("div", Eh, [
                    f[61] || (f[61] = r("label", { class: "qcd-lbl" }, "Payment Terms", -1)),
                    oe(r("select", {
                      "onUpdate:modelValue": f[11] || (f[11] = (h) => i.payment_terms = h),
                      class: "qcd-input",
                      onChange: f[12] || (f[12] = (...h) => I.applyPaymentTerms && I.applyPaymentTerms(...h))
                    }, [
                      f[60] || (f[60] = r("option", { value: "" }, "— Select Payment Terms —", -1)),
                      (w(), S(ee, null, Ae(c, (h) => r("option", {
                        key: h,
                        value: h
                      }, T(h), 9, Nh)), 64))
                    ], 544), [
                      [je, i.payment_terms]
                    ])
                  ])
                ])
              ])
            ], 64)) : C(t).doctype === "Supplier" ? (w(), S(ee, { key: 1 }, [
              f[75] || (f[75] = r("div", { class: "qcd-section" }, "Vendor Details", -1)),
              r("div", Th, [
                r("div", Ph, [
                  f[63] || (f[63] = r("label", { class: "qcd-lbl" }, [
                    ye("Supplier Name "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[13] || (f[13] = (h) => i.supplier_name = h),
                    class: "qcd-input",
                    placeholder: "Vendor / company name",
                    autofocus: ""
                  }, null, 512), [
                    [ge, i.supplier_name]
                  ])
                ]),
                r("div", Rh, [
                  f[65] || (f[65] = r("label", { class: "qcd-lbl" }, "Supplier Type", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[14] || (f[14] = (h) => i.supplier_type = h),
                    class: "qcd-input"
                  }, [...f[64] || (f[64] = [
                    r("option", { value: "Company" }, "Company", -1),
                    r("option", { value: "Individual" }, "Individual", -1)
                  ])], 512), [
                    [je, i.supplier_type]
                  ])
                ]),
                r("div", Ih, [
                  f[66] || (f[66] = r("label", { class: "qcd-lbl" }, "Email", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[15] || (f[15] = (h) => i.email_id = h),
                    type: "email",
                    class: "qcd-input",
                    placeholder: "vendor@example.com"
                  }, null, 512), [
                    [ge, i.email_id]
                  ])
                ]),
                r("div", Mh, [
                  f[67] || (f[67] = r("label", { class: "qcd-lbl" }, "Mobile", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[16] || (f[16] = (h) => i.mobile_no = h),
                    type: "tel",
                    class: "qcd-input",
                    placeholder: "712345678"
                  }, null, 512), [
                    [ge, i.mobile_no]
                  ])
                ]),
                r("div", Oh, [
                  f[68] || (f[68] = r("label", { class: "qcd-lbl" }, [
                    ye("KRA PIN "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[17] || (f[17] = (h) => i.tax_id = h),
                    class: "qcd-input",
                    placeholder: "A123456789Z",
                    maxlength: "11",
                    onInput: f[18] || (f[18] = (h) => i.tax_id = i.tax_id.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                  }, null, 544), [
                    [ge, i.tax_id]
                  ])
                ]),
                r("div", Dh, [
                  f[70] || (f[70] = r("label", { class: "qcd-lbl" }, "Country", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[19] || (f[19] = (h) => i.country = h),
                    class: "qcd-input",
                    onChange: f[20] || (f[20] = (h) => i.state = "")
                  }, [
                    f[69] || (f[69] = r("option", { value: "" }, "— Select Country —", -1)),
                    (w(!0), S(ee, null, Ae(C(So), (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, Lh))), 128))
                  ], 544), [
                    [je, i.country]
                  ])
                ]),
                r("div", qh, [
                  f[72] || (f[72] = r("label", { class: "qcd-lbl" }, "State", -1)),
                  C(Pn)(i.country).length ? oe((w(), S("select", {
                    key: 0,
                    "onUpdate:modelValue": f[21] || (f[21] = (h) => i.state = h),
                    class: "qcd-input"
                  }, [
                    f[71] || (f[71] = r("option", { value: "" }, "— Select State —", -1)),
                    (w(!0), S(ee, null, Ae(C(Pn)(i.country), (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, Bh))), 128))
                  ], 512)), [
                    [je, i.state]
                  ]) : oe((w(), S("input", {
                    key: 1,
                    "onUpdate:modelValue": f[22] || (f[22] = (h) => i.state = h),
                    class: "qcd-input",
                    placeholder: "State"
                  }, null, 512)), [
                    [ge, i.state]
                  ])
                ]),
                r("div", jh, [
                  f[74] || (f[74] = r("label", { class: "qcd-lbl" }, "Payment Terms", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[23] || (f[23] = (h) => i.payment_terms = h),
                    class: "qcd-input"
                  }, [
                    f[73] || (f[73] = r("option", { value: "" }, "— Select Payment Terms —", -1)),
                    (w(!0), S(ee, null, Ae(p.value, (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, Hh))), 128))
                  ], 512), [
                    [je, i.payment_terms]
                  ])
                ])
              ])
            ], 64)) : C(t).doctype === "Item" ? (w(), S(ee, { key: 2 }, [
              f[85] || (f[85] = r("div", { class: "qcd-section" }, "Item Details", -1)),
              r("div", Vh, [
                r("div", zh, [
                  f[76] || (f[76] = r("label", { class: "qcd-lbl" }, [
                    ye("Item Name "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[24] || (f[24] = (h) => i.item_name = h),
                    class: "qcd-input",
                    placeholder: "Product or service name",
                    autofocus: ""
                  }, null, 512), [
                    [ge, i.item_name]
                  ])
                ]),
                r("div", Fh, [
                  f[77] || (f[77] = r("label", { class: "qcd-lbl" }, "Item Code", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[25] || (f[25] = (h) => i.item_code = h),
                    class: "qcd-input",
                    placeholder: "Auto from name if blank"
                  }, null, 512), [
                    [ge, i.item_code]
                  ])
                ]),
                r("div", Uh, [
                  f[78] || (f[78] = r("label", { class: "qcd-lbl" }, "Item Group", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[26] || (f[26] = (h) => i.item_group = h),
                    class: "qcd-input",
                    placeholder: "All Item Groups"
                  }, null, 512), [
                    [ge, i.item_group]
                  ])
                ]),
                r("div", Kh, [
                  f[80] || (f[80] = r("label", { class: "qcd-lbl" }, "Item Type", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[27] || (f[27] = (h) => i.item_type = h),
                    class: "qcd-input"
                  }, [...f[79] || (f[79] = [
                    r("option", { value: "Product" }, "Product", -1),
                    r("option", { value: "Service" }, "Service", -1)
                  ])], 512), [
                    [je, i.item_type]
                  ])
                ]),
                r("div", Gh, [
                  f[81] || (f[81] = r("label", { class: "qcd-lbl" }, "Standard Rate (KES)", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[28] || (f[28] = (h) => i.standard_rate = h),
                    type: "number",
                    min: "0",
                    step: "0.01",
                    class: "qcd-input",
                    placeholder: "0.00"
                  }, null, 512), [
                    [
                      ge,
                      i.standard_rate,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                r("div", Wh, [
                  f[83] || (f[83] = r("label", { class: "qcd-lbl" }, "Unit of Measure", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[29] || (f[29] = (h) => i.stock_uom = h),
                    class: "qcd-input"
                  }, [
                    f[82] || (f[82] = r("option", { value: "" }, "— Select UOM —", -1)),
                    (w(!0), S(ee, null, Ae(l.value, (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, Yh))), 128))
                  ], 512), [
                    [je, i.stock_uom]
                  ])
                ]),
                G("", !0)
              ])
            ], 64)) : C(t).doctype === "Warehouse" ? (w(), S(ee, { key: 3 }, [
              f[98] || (f[98] = r("div", { class: "qcd-section" }, "Warehouse Details", -1)),
              r("div", Jh, [
                r("div", Qh, [
                  f[86] || (f[86] = r("label", { class: "qcd-lbl" }, [
                    ye("Warehouse Name "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[31] || (f[31] = (h) => i.warehouse_name = h),
                    class: "qcd-input",
                    placeholder: "e.g. Main Store, Finished Goods",
                    autofocus: ""
                  }, null, 512), [
                    [ge, i.warehouse_name]
                  ])
                ]),
                r("div", Zh, [
                  f[88] || (f[88] = r("label", { class: "qcd-lbl" }, "Warehouse Type", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[32] || (f[32] = (h) => i.warehouse_type = h),
                    class: "qcd-input"
                  }, [...f[87] || (f[87] = [
                    r("option", { value: "" }, "— Select Type —", -1),
                    r("option", { value: "Stores" }, "Stores", -1),
                    r("option", { value: "Work In Progress" }, "Work In Progress", -1),
                    r("option", { value: "Finished Goods" }, "Finished Goods", -1),
                    r("option", { value: "Rejected" }, "Rejected", -1),
                    r("option", { value: "Scrap" }, "Scrap", -1)
                  ])], 512), [
                    [je, i.warehouse_type]
                  ])
                ]),
                r("div", Xh, [
                  f[90] || (f[90] = r("label", { class: "qcd-lbl" }, "Parent Warehouse", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[33] || (f[33] = (h) => i.parent_warehouse = h),
                    class: "qcd-input"
                  }, [
                    f[89] || (f[89] = r("option", { value: "" }, "— Top level —", -1)),
                    (w(!0), S(ee, null, Ae(d.value, (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, e1))), 128))
                  ], 512), [
                    [je, i.parent_warehouse]
                  ])
                ]),
                r("div", t1, [
                  f[91] || (f[91] = r("label", { class: "qcd-lbl" }, "Address (optional)", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[34] || (f[34] = (h) => i.address_line_1 = h),
                    class: "qcd-input",
                    placeholder: "Street / building"
                  }, null, 512), [
                    [ge, i.address_line_1]
                  ])
                ]),
                r("div", n1, [
                  f[92] || (f[92] = r("label", { class: "qcd-lbl" }, "City", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[35] || (f[35] = (h) => i.city = h),
                    class: "qcd-input",
                    placeholder: "City"
                  }, null, 512), [
                    [ge, i.city]
                  ])
                ]),
                r("div", s1, [
                  f[93] || (f[93] = r("label", { class: "qcd-lbl" }, "Postal Code", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[36] || (f[36] = (h) => i.pin = h),
                    class: "qcd-input",
                    placeholder: "e.g. 00100",
                    maxlength: "10"
                  }, null, 512), [
                    [ge, i.pin]
                  ])
                ]),
                r("div", o1, [
                  f[95] || (f[95] = r("label", { class: "qcd-lbl" }, "Country", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[37] || (f[37] = (h) => i.country = h),
                    class: "qcd-input",
                    onChange: f[38] || (f[38] = (h) => i.state = "")
                  }, [
                    f[94] || (f[94] = r("option", { value: "" }, "— Select Country —", -1)),
                    (w(!0), S(ee, null, Ae(C(So), (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, i1))), 128))
                  ], 544), [
                    [je, i.country]
                  ])
                ]),
                r("div", a1, [
                  f[97] || (f[97] = r("label", { class: "qcd-lbl" }, "State", -1)),
                  C(Pn)(i.country).length ? oe((w(), S("select", {
                    key: 0,
                    "onUpdate:modelValue": f[39] || (f[39] = (h) => i.state = h),
                    class: "qcd-input"
                  }, [
                    f[96] || (f[96] = r("option", { value: "" }, "— Select State —", -1)),
                    (w(!0), S(ee, null, Ae(C(Pn)(i.country), (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, r1))), 128))
                  ], 512)), [
                    [je, i.state]
                  ]) : oe((w(), S("input", {
                    key: 1,
                    "onUpdate:modelValue": f[40] || (f[40] = (h) => i.state = h),
                    class: "qcd-input",
                    placeholder: "State"
                  }, null, 512)), [
                    [ge, i.state]
                  ])
                ])
              ])
            ], 64)) : C(t).doctype === "Account" ? (w(), S(ee, { key: 4 }, [
              f[105] || (f[105] = r("div", { class: "qcd-section" }, "Account Details", -1)),
              r("div", l1, [
                r("div", c1, [
                  f[99] || (f[99] = r("label", { class: "qcd-lbl" }, [
                    ye("Account Name "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[41] || (f[41] = (h) => i.account_name = h),
                    class: "qcd-input",
                    placeholder: "e.g. Sales Revenue, Office Supplies",
                    autofocus: ""
                  }, null, 512), [
                    [ge, i.account_name]
                  ])
                ]),
                r("div", d1, [
                  f[101] || (f[101] = r("label", { class: "qcd-lbl" }, "Account Type", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[42] || (f[42] = (h) => i.account_type = h),
                    class: "qcd-input"
                  }, [...f[100] || (f[100] = [
                    r("option", { value: "" }, "— Select Type —", -1),
                    r("option", { value: "Income Account" }, "Income Account", -1),
                    r("option", { value: "Expense Account" }, "Expense Account", -1),
                    r("option", { value: "Cost of Goods Sold" }, "Cost of Goods Sold", -1),
                    r("option", { value: "Fixed Asset" }, "Fixed Asset", -1),
                    r("option", { value: "Accumulated Depreciation" }, "Accumulated Depreciation", -1),
                    r("option", { value: "Depreciation" }, "Depreciation", -1),
                    r("option", { value: "Current Asset" }, "Current Asset", -1),
                    r("option", { value: "Current Liability" }, "Current Liability", -1),
                    r("option", { value: "Equity" }, "Equity", -1),
                    r("option", { value: "Cash" }, "Cash", -1),
                    r("option", { value: "Bank" }, "Bank", -1),
                    r("option", { value: "Receivable" }, "Receivable", -1),
                    r("option", { value: "Payable" }, "Payable", -1),
                    r("option", { value: "Tax" }, "Tax", -1)
                  ])], 512), [
                    [je, i.account_type]
                  ])
                ]),
                r("div", u1, [
                  f[103] || (f[103] = r("label", { class: "qcd-lbl" }, [
                    ye("Parent Account "),
                    r("span", { class: "qcd-req" }, "*")
                  ], -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": f[43] || (f[43] = (h) => i.parent_account = h),
                    class: "qcd-input"
                  }, [
                    f[102] || (f[102] = r("option", { value: "" }, "— Select Parent —", -1)),
                    (w(!0), S(ee, null, Ae(u.value, (h) => (w(), S("option", {
                      key: h,
                      value: h
                    }, T(h), 9, p1))), 128))
                  ], 512), [
                    [je, i.parent_account]
                  ])
                ]),
                r("div", f1, [
                  f[104] || (f[104] = r("label", { class: "qcd-lbl" }, "Account Number", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": f[44] || (f[44] = (h) => i.account_number = h),
                    class: "qcd-input",
                    placeholder: "Optional account code"
                  }, null, 512), [
                    [ge, i.account_number]
                  ])
                ])
              ])
            ], 64)) : (w(), S("div", m1, [
              r("div", h1, [
                f[106] || (f[106] = r("label", { class: "qcd-lbl" }, [
                  ye("Name "),
                  r("span", { class: "qcd-req" }, "*")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": f[45] || (f[45] = (h) => i.name = h),
                  class: "qcd-input",
                  placeholder: C(t).doctype + " name",
                  autofocus: ""
                }, null, 8, g1), [
                  [ge, i.name]
                ])
              ])
            ]))
          ]),
          r("div", v1, [
            r("button", {
              class: "qcd-btn-cancel",
              onClick: _
            }, "Cancel"),
            r("button", {
              class: "add-btn-draft",
              disabled: a.value,
              onClick: $
            }, T(a.value ? "Saving…" : "Create & Select"), 9, y1)
          ])
        ])
      ], 32)) : G("", !0)
    ]));
  }
}, xt = /* @__PURE__ */ ze({
  open: !1,
  loading: !1,
  title: "",
  message: "",
  actionLabel: "Confirm",
  actionStyle: "danger",
  links: [],
  resolve: null
});
function x1() {
  function e({
    title: s = "Are you sure?",
    message: o = "",
    actionLabel: a = "Confirm",
    actionStyle: i = "danger",
    links: l = []
  } = {}) {
    return new Promise((d) => {
      Object.assign(xt, {
        open: !0,
        loading: !1,
        title: s,
        message: o,
        actionLabel: a,
        actionStyle: i,
        links: l,
        resolve: d
      });
    });
  }
  async function t() {
    xt.loading = !0;
    const s = xt.resolve;
    xt.resolve = null, xt.open = !1, xt.loading = !1, s == null || s(!0);
  }
  function n() {
    if (xt.loading) return;
    const s = xt.resolve;
    xt.resolve = null, xt.open = !1, s == null || s(!1);
  }
  return { state: xt, confirmCascade: e, _ok: t, _cancel: n };
}
const Fn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, _1 = { class: "ccd-dialog" }, w1 = { class: "ccd-header" }, k1 = { class: "ccd-title" }, $1 = ["disabled"], S1 = { class: "ccd-body" }, C1 = {
  key: 0,
  class: "ccd-msg"
}, A1 = {
  key: 1,
  class: "ccd-links"
}, E1 = { style: { color: "#6b7280" } }, N1 = { style: { "text-align": "right", "font-weight": "700", color: "#059669" } }, T1 = {
  key: 2,
  class: "ccd-warn"
}, P1 = { class: "ccd-footer" }, R1 = ["disabled"], I1 = ["disabled"], M1 = {
  __name: "ConfirmCascadeDialog",
  setup(e) {
    const { state: t, _ok: n, _cancel: s } = x1();
    function o(a) {
      return a == null ? "—" : "KES " + Number(a).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return (a, i) => (w(), st(Lt, { to: "body" }, [
      C(t).open ? (w(), S("div", {
        key: 0,
        class: "ccd-backdrop",
        onClick: i[3] || (i[3] = Fe((...l) => C(s) && C(s)(...l), ["self"]))
      }, [
        r("div", _1, [
          r("div", w1, [
            r("span", k1, T(C(t).title), 1),
            r("button", {
              class: "ccd-close",
              onClick: i[0] || (i[0] = (...l) => C(s) && C(s)(...l)),
              disabled: C(t).loading
            }, "✕", 8, $1)
          ]),
          r("div", S1, [
            C(t).message ? (w(), S("p", C1, T(C(t).message), 1)) : G("", !0),
            C(t).links.length ? (w(), S("div", A1, [
              i[4] || (i[4] = r("div", { class: "ccd-links-head" }, [
                r("span", null, "Linked"),
                r("span", null, "Mode / Type"),
                r("span", null, "Date"),
                r("span", { style: { "text-align": "right" } }, "Amount")
              ], -1)),
              (w(!0), S(ee, null, Ae(C(t).links, (l) => (w(), S("div", {
                key: l.name,
                class: "ccd-links-row"
              }, [
                r("span", null, T(l.name), 1),
                r("span", null, T(l.mode || l.type || "—"), 1),
                r("span", E1, T(l.date || "—"), 1),
                r("span", N1, T(o(l.amount)), 1)
              ]))), 128))
            ])) : G("", !0),
            C(t).links.length ? (w(), S("p", T1, " The " + T(C(t).links.length) + " record(s) above will also be cancelled. This cannot be undone. ", 1)) : G("", !0)
          ]),
          r("div", P1, [
            r("button", {
              class: "ccd-btn ccd-btn-ghost",
              onClick: i[1] || (i[1] = (...l) => C(s) && C(s)(...l)),
              disabled: C(t).loading
            }, "Keep", 8, R1),
            r("button", {
              class: De(["ccd-btn", C(t).actionStyle === "danger" ? "ccd-btn-danger" : "ccd-btn-primary"]),
              disabled: C(t).loading,
              onClick: i[2] || (i[2] = (...l) => C(n) && C(n)(...l))
            }, T(C(t).loading ? "Working…" : C(t).actionLabel), 11, I1)
          ])
        ])
      ])) : G("", !0)
    ]));
  }
}, O1 = /* @__PURE__ */ Fn(M1, [["__scopeId", "data-v-3c3318f7"]]), Qn = /* @__PURE__ */ ze({
  open: !1,
  doctype: "",
  name: "",
  docLabel: "",
  getDefaultsEndpoint: "",
  sendEndpoint: "",
  enhanceEndpoint: "",
  paramKey: "name",
  // the request key that holds the doc name (e.g. invoice_name, bill_name)
  // When set, the dialog renders the document with the active branding template
  // (useLivePreview) and sends the resulting HTML as `pdf_html` so the emailed
  // PDF matches the on-screen download. Shape: { title, partyLabel, partyField }.
  printConfig: null,
  resolve: null
});
function D1() {
  function e({
    doctype: n,
    name: s,
    docLabel: o,
    getDefaultsEndpoint: a,
    sendEndpoint: i,
    enhanceEndpoint: l = "",
    paramKey: d = "name",
    printConfig: u = null
  }) {
    return new Promise((c) => {
      Object.assign(Qn, {
        open: !0,
        doctype: n,
        name: s,
        docLabel: o || `${n} ${s}`,
        getDefaultsEndpoint: a,
        sendEndpoint: i,
        enhanceEndpoint: l,
        paramKey: d,
        printConfig: u,
        resolve: c
      });
    });
  }
  function t(n) {
    Qn.open = !1;
    const s = Qn.resolve;
    Qn.resolve = null, s == null || s(n);
  }
  return { state: Qn, openEmail: e, complete: t };
}
const ie = /* @__PURE__ */ ze({
  template: "classic",
  brandColor: "#1a6ef7",
  logo: "",
  company: "",
  companyGstin: "",
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyPincode: "",
  companyPhone: "",
  companyEmail: "",
  bankName: "",
  bankBranch: "",
  bankAccountNo: "",
  bankIfsc: ""
});
async function Ca(e) {
  var t;
  ie.company = e || "";
  try {
    const n = ((t = window.frappe) == null ? void 0 : t.csrf_token) || "", a = (await (await fetch("/api/method/psd_books.api.admin.get_company_settings", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Frappe-CSRF-Token": n },
      credentials: "same-origin",
      body: new URLSearchParams({})
    })).json()).message || {};
    a.pdf_template && (ie.template = a.pdf_template), a.brand_color && (ie.brandColor = a.brand_color), a.company_logo && (ie.logo = a.company_logo), ie.companyGstin = a.kra_pin || "", ie.companyAddress = a.company_address || "", ie.companyCity = a.company_city || "", ie.companyState = a.company_state || "", ie.companyPincode = a.company_pincode || "", ie.companyPhone = a.company_phone || "", ie.companyEmail = a.company_email || "", ie.bankName = a.bank_name || "", ie.bankBranch = a.bank_branch || "", ie.bankAccountNo = a.bank_account_no || "", ie.bankIfsc = a.bank_ifsc || "";
  } catch {
  }
}
function k(e) {
  return String(e ?? "").replace(
    /[&<>"']/g,
    (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
  );
}
function pt(e) {
  return e || "KES";
}
function vt(e, t) {
  return (t || "KES") + " " + Number(e || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function so(e, t) {
  return Number(e || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function mt(e) {
  if (!e) return "";
  const t = new Date(e);
  return isNaN(t) ? String(e) : t.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
}
function Aa(e) {
  if (e = Math.floor(Number(e) || 0), e === 0) return "Zero";
  const t = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen"
  ], n = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"], s = (u) => u < 20 ? t[u] : n[Math.floor(u / 10)] + (u % 10 ? " " + t[u % 10] : ""), o = (u) => u >= 100 ? t[Math.floor(u / 100)] + " Hundred" + (u % 100 ? " " + s(u % 100) : "") : s(u), a = [], i = Math.floor(e / 1e9);
  e %= 1e9;
  const l = Math.floor(e / 1e6);
  e %= 1e6;
  const d = Math.floor(e / 1e3);
  return e %= 1e3, i && a.push(o(i) + " Billion"), l && a.push(o(l) + " Million"), d && a.push(o(d) + " Thousand"), e && a.push(o(e)), a.join(" ");
}
function fi(e) {
  const t = Math.round((Number(e) || 0) * 100), n = Math.floor(t / 100), s = t % 100;
  return "Kenya Shillings " + Aa(n) + (s ? " and " + Aa(s) + " Cents" : "") + " Only";
}
function Ol() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function Ea(e) {
  const t = String(e || "").split(`
`).map((n) => n.trim()).filter(Boolean);
  return t.length ? `<ul>${t.map((n) => `<li>${k(n)}</li>`).join("")}</ul>` : "";
}
function L1(e) {
  const t = /* @__PURE__ */ new Map();
  return (e || []).forEach((n) => {
    const s = n.gst_hsn_code || n.hsn_code || "";
    if (!s) return;
    const o = Number(n.taxable_amount != null ? n.taxable_amount : n.amount) || 0, a = Number(n.cgst_rate || 0), i = Number(n.sgst_rate || 0), l = Number(n.igst_rate || 0), d = t.get(s) || { hsn: s, taxable: 0, cgstRate: a, sgstRate: i, igstRate: l, cgstAmt: 0, sgstAmt: 0, igstAmt: 0 };
    d.taxable += o, d.cgstAmt += o * a / 100, d.sgstAmt += o * i / 100, d.igstAmt += o * l / 100, t.set(s, d);
  }), [...t.values()];
}
function js(e) {
  var t, n;
  return e ? e.startsWith("data:") || e.startsWith("http") ? e : (((n = (t = window.frappe) == null ? void 0 : t.boot) == null ? void 0 : n.site_url) || window.location.origin).replace(/\/$/, "") + e : "";
}
function Na(e) {
  let t = String(e || "").split(`
`).map((l) => l.trim()).filter(Boolean);
  if (!t.length) return [];
  if (t.length > 1 && /^india$/i.test(t[t.length - 1]) && t.pop(), t.length <= 1) return t;
  let n = "";
  /^\d{4,8}$/.test(t[t.length - 1]) && (n = t.pop());
  const s = t.length ? t.pop() : "", o = t.length ? t.pop() : "", a = t.join(", "), i = [o, s].filter(Boolean).join(", ") + (n ? " - " + n : "");
  return [a, i].filter(Boolean);
}
function q1(e, t) {
  const n = ie.brandColor, s = js(ie.logo), o = t.currency || e.currency || "KES", a = (b) => so(b), i = e.net_total != null ? e.net_total : (e.grand_total || 0) - (e.total_taxes_and_charges ?? e.total_tax ?? (e.taxes || []).reduce((b, R) => b + (R.tax_amount || 0), 0)), l = e[t.partyField] || e.customer || e.supplier || "", d = e.posting_date || e.transaction_date || "", u = t.includeMrp && (e.items || []).some((b) => Number(b.mrp) > 0), c = (e.items || []).some((b) => Number(b.igst_rate) > 0), p = (e.items || []).some((b) => Number(b.cgst_rate) > 0 || Number(b.sgst_rate) > 0), m = t.includeGst !== !1 && (c || p), g = e.total_taxes_and_charges ?? (e.taxes || []).reduce((b, R) => b + (R.tax_amount || 0), 0), _ = e.grand_total != null ? Math.round((e.grand_total - (i + g)) * 100) / 100 : 0, $ = e.in_words || fi(e.grand_total);
  function I(b) {
    if (!b) return "";
    const R = new Date(b);
    return isNaN(R) ? "" : R.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }).replace(/ /g, "-");
  }
  const f = (e.items || []).map((b, R) => `
    <tr>
      <td class="c">${R + 1}</td>
      <td>
        <div class="inm">${k(b.item_name || b.item_code)}</div>
        ${b.description && b.description !== b.item_name ? `<div class="ids">${k(b.description)}</div>` : ""}
        ${b.batch_no ? `<div class="ids">Batch: ${k(b.batch_no)} (${Number(b.qty || 0)})${b.batch_expiry_date ? ` (exp ${I(b.batch_expiry_date)})` : ""}</div>` : ""}
      </td>
      ${t.includeHsn ? `<td class="c nw">${k(b.gst_hsn_code || b.hsn_code || "—")}</td>` : ""}
      <td class="r nw">${Number(b.qty || 0)}</td>
      <td class="c nw">${k(b.uom || "Nos")}</td>
      ${u ? `<td class="r nw">${b.mrp ? a(b.mrp) : "—"}</td>` : ""}
      <td class="r nw">${a(b.rate)}</td>
      ${t.includeDiscount ? `<td class="c nw">${Number(b.discount_percentage || 0).toFixed(2)}%</td>` : ""}
      ${m ? `<td class="r nw">${a(b.taxable_amount != null ? b.taxable_amount : b.amount)}</td>` : ""}
      ${m ? c ? `<td class="c nw">${Number(b.igst_rate || 0).toFixed(2)}%</td>` : `<td class="c nw">${Number(b.cgst_rate || 0).toFixed(2)}%</td><td class="c nw">${Number(b.sgst_rate || 0).toFixed(2)}%</td>` : ""}
      <td class="r b nw">${a(b.amount)}</td>
    </tr>`).join(""), h = (e.taxes || []).map((b) => {
    const R = b.description || b.account_head || "Tax", A = t.keepTaxLabel ? String(R).trim() : R.replace(/[@(]?\s*[\d.]+\s*%\)?/g, "").replace(/\(\s*\)/g, "").trim();
    return `<div class="row"><span>Add ${k(A)} (${k(pt(o))})</span><span>${a(b.tax_amount || 0)}</span></div>`;
  }).join(""), O = 6 + (t.includeHsn ? 1 : 0) + (t.includeDiscount ? 1 : 0) + (u ? 1 : 0) + (m ? c ? 2 : 3 : 0), L = m ? L1(e.items) : [];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;background:#fff;font-size:12.5px;line-height:1.55;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:980px;margin:0 auto;padding:40px}
  .frame{padding:28px 30px}
  /* Letterhead */
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;font-family:Arial,Helvetica,sans-serif}
  .hdr-l .co{font-size:32px;font-weight:700;color:#111;letter-spacing:-.01em;font-family:Arial,Helvetica,sans-serif}
  .hdr-l .addr{font-size:11px;font-weight:600;color:#111;margin-top:8px;line-height:1.55}
  .hdr-l .contact{margin-top:8px;font-size:11px;color:${n};display:flex;flex-direction:row;flex-wrap:wrap;gap:16px}
  .hdr-l .contact .ci{display:flex;align-items:center;gap:6px}
  .hdr-l .contact svg{width:12px;height:12px;flex-shrink:0}
  .hdr-r{flex-shrink:0}
  .hdr-r img{max-height:110px;max-width:170px;object-fit:contain;display:block}
  .title{text-align:center;font-size:20px;font-weight:800;letter-spacing:.05em;color:#111;margin:28px 0 20px;font-family:Arial,Helvetica,sans-serif}
  .hdr-bot{display:flex;justify-content:space-between;align-items:flex-end;font-family:Arial,sans-serif;font-size:11.5px;color:#111;padding-bottom:16px;margin-bottom:18px;border-bottom:1px solid #1c1c1c}
  .hdr-bot .hb-r{text-align:right}
  .hdr-bot .hb-r div+div{margin-top:3px}
  .hdr-bot b{font-weight:700}
  .hdr-bot .inv-no{font-size:20px;font-weight:800;color:#111}
  .hdr-bot .inv-no b{font-size:11.5px;font-weight:700}
  /* Parties row */
  .pr{display:flex;justify-content:space-between;gap:24px;margin-bottom:6px;font-family:Arial,sans-serif}
  .pr .blk{font-size:12px}
  .pr .blk.r{text-align:right}
  .pr .l{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${n};margin-bottom:3px}
  .pr .nm{font-weight:700;font-size:13.5px;color:#111;font-family:Arial,Helvetica,sans-serif}
  .pr .sub{color:#555;font-size:11px;margin-top:2px;white-space:pre-line;line-height:1.45}
  .pr .kv{margin-top:6px}
  hr.sep{border:none;border-top:1px solid #1c1c1c;margin:16px 0}
  /* Billing / Shipping address table */
  .addr-table{display:flex;width:100%;border:1.3px solid #1c1c1c;margin:10px 0 16px;font-family:Arial,sans-serif}
  .addr-table.has-dispatch{margin-bottom:0}
  .addr-col{flex:1;min-width:0;width:50%}
  .addr-col+.addr-col{border-left:1.3px solid #1c1c1c}
  .addr-h{font-size:12px;font-weight:700;color:#111;padding:8px 12px;border-bottom:1.3px solid #1c1c1c}
  .addr-body{padding:10px 12px}
  .addr-ct{font-size:12px;color:#111;margin-bottom:2px}
  .addr-nm{font-size:12px;font-weight:700;color:#111;margin-bottom:4px}
  .addr-ln{font-size:12px;color:#111;line-height:1.6}
  .addr-body-split{display:flex}
  .addr-body-left{flex:1;min-width:0;padding:10px 12px}
  .addr-body-right{flex:1;min-width:0;padding:10px 12px;border-left:1.3px solid #1c1c1c}
  /* Dispatch details table -- separate row directly under Billing/Shipping,
     not squeezed into the Shipping Address column */
  .dispatch-table{display:flex;width:100%;border:1.3px solid #1c1c1c;border-top:none;margin:0 0 16px;font-family:Arial,sans-serif}
  .dispatch-cell{flex:1;min-width:0;padding:8px 12px}
  .dispatch-cell+.dispatch-cell{border-left:1.3px solid #1c1c1c}
  .dispatch-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#555;margin-bottom:2px}
  .dispatch-val{font-size:12px;color:#111;font-weight:600}
  /* Table */
  table.it{width:100%;border-collapse:collapse;font-size:12px;font-family:Arial,sans-serif;margin-top:4px;border:1.3px solid #1c1c1c}
  table.it th{background:#fff;color:#111;padding:8px 9px;font-size:11.5px;font-weight:700;letter-spacing:0;text-transform:none;text-align:left;border:none;border-bottom:1.5px solid #1c1c1c;border-right:1px solid #1c1c1c;white-space:nowrap}
  table.it th.r{text-align:right}table.it th.c{text-align:center}
  table.it th:last-child{border-right:none}
  table.it td{padding:6px 9px;font-size:11.5px;line-height:1.35;border:none;border-bottom:1px solid #1c1c1c;border-right:1px solid #1c1c1c;vertical-align:top;word-break:break-word;overflow-wrap:anywhere}
  table.it td:last-child{border-right:none}
  table.it tr:last-child td{border-bottom:none}
  table.it td.nw{white-space:nowrap}
  .it .inm{font-weight:700;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif;line-height:1.3}
  .it .ids{font-size:10px;color:#666;margin-top:1px;line-height:1.3}
  .it .r{text-align:right}.it .c{text-align:center}.it .b{font-weight:700}
  /* Bottom section: Bank / Amount-in-Words / Totals, Terms & Conditions, and
     the signature strip are all rows of ONE continuous bordered frame,
     matching the reference invoice (not separate boxes with gaps). */
  .bottom-frame{margin-top:16px;border:1.3px solid #1c1c1c;font-family:Arial,sans-serif}
  .bf-row{display:flex}
  .bf-row+.bf-row{border-top:1.3px solid #1c1c1c}
  .bf-cell{flex:1;min-width:0;padding:10px 14px;font-size:11.5px;color:#333;line-height:1.7}
  .bf-cell+.bf-cell{border-left:1.3px solid #1c1c1c}
  .bf-cell .h{font-weight:700;color:#111;font-size:12px;margin-bottom:5px}
  .bf-cell .val{font-weight:700;color:#111;font-size:12px;line-height:1.5}
  .bf-cell ul{margin:0;padding-left:18px}
  .bf-cell li{margin:0 0 2px}
  .bf-cell-totals{padding:0}
  .tot-figs{display:table;width:100%;border-collapse:collapse}
  .tot-figs .row{display:table-row}
  .tot-figs .row>span{display:table-cell;padding:6px 8px;font-size:11px;color:#333;border-bottom:1px solid #1c1c1c;vertical-align:middle;white-space:nowrap}
  .tot-figs .row>span:first-child{border-right:1px solid #1c1c1c}
  .tot-figs .row>span:last-child{text-align:right;color:#111;width:1%}
  .tot-figs .row:last-child>span{border-bottom:none}
  .tot-figs .row.grand>span{font-weight:700;color:#111;border-top:1.3px solid #1c1c1c;border-bottom:none;padding-top:9px}
  .bf-row-sign .bf-cell{display:flex;align-items:center}
  .sign-note-cell{flex:2.2;font-size:11px;color:#333}
  .sign-qr-cell{flex:0 0 130px;justify-content:center}
  .sign-qr-cell img{width:76px;height:76px;object-fit:contain}
  .sign-for-cell{flex:1.4;flex-direction:column;align-items:flex-end;text-align:right;font-size:11.5px;color:#333;gap:22px}
  .sign-for-cell b{font-weight:700;color:#111}
  /* HSN/SAC tax-rate summary table — intentionally content-width (not
     full-page), matching the reference invoice's compact tax summary. */
  .hsn-tbl{margin-top:14px;border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px}
  .hsn-tbl th,.hsn-tbl td{border:1px solid #1c1c1c;padding:6px 10px}
  .hsn-tbl th{background:#fff;font-weight:700;color:#111;text-align:left}
  .hsn-tbl td.r{text-align:right}
  /* Keep table rows and bottom blocks intact across a page break instead of
     splitting mid-row (which otherwise duplicates a row's content across
     two pages when printed). */
  table.it tr{page-break-inside:avoid;break-inside:avoid}
  .addr-table,.bf-row,.hsn-tbl{page-break-inside:avoid;break-inside:avoid}
  @media print{.sheet{padding:0;max-width:none}@page{margin:22mm 15mm}}
</style></head><body><div class="sheet"><div class="frame">
  <div class="hdr">
    <div class="hdr-l">
      <div class="co">${k(e.company || t.companyName || "")}</div>
      ${ie.companyAddress ? `<div class="addr">${k(ie.companyAddress)}${ie.companyCity || ie.companyPincode ? `,<br/>${k(ie.companyCity || "")}${ie.companyPincode ? ", " + k(ie.companyPincode) : ""}` : ""}</div>` : ""}
      ${ie.companyPhone || ie.companyEmail ? `<div class="contact">
        ${ie.companyPhone ? `<span class="ci"><svg viewBox="0 0 24 24" fill="${k(n)}"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z"/></svg>${k(ie.companyPhone)}</span>` : ""}
        ${ie.companyEmail ? `<span class="ci"><svg viewBox="0 0 24 24" fill="${k(n)}"><path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2.4.2 7.1 6.2a.8.8 0 0 0 1 0l7.1-6.2a.6.6 0 0 0-.4-1H4.8a.6.6 0 0 0-.4 1"/></svg>${k(ie.companyEmail)}</span>` : ""}
      </div>` : ""}
    </div>
    <div class="hdr-r">
      <div class="print-copy-text" style="font-size:11.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#111;text-align:right;margin-bottom:8px">${k(t.copyText || "")}</div>
      ${s ? `<img src="${k(s)}"/>` : ""}
    </div>
  </div>
  <div class="title">${k(t.title)}</div>
  <div class="hdr-bot" style="border-bottom:none">
    <div class="hb-l">${e.company_gstin || e.gstin || ie.companyGstin ? `<b>${k(t.taxIdLabel || "KRA PIN :")}</b> ${k(e.company_gstin || e.gstin || ie.companyGstin)}` : ""}</div>
    <div class="hb-r">
      <div class="inv-no"><b>${k(t.title ? t.title.charAt(0) + t.title.slice(1).toLowerCase() : "")} No. :</b> ${k(e.name || "")}</div>
      <div><b>Date :</b> ${k(mt(d))}</div>
      ${e.due_date ? `<div><b>Due Date :</b> ${k(mt(e.due_date))}</div>` : ""}${t.po && e.expected_delivery_date ? `<div><b>Delivery Date :</b> ${k(mt(e.expected_delivery_date))}</div>` : ""}
    </div>
  </div>
  ${(() => {
    const b = Na(e.billing_address || e.address_display || ""), R = Na(e.shipping_address || e.billing_address || e.address_display || ""), A = e.customer_gstin || e.supplier_gstin || "", D = e.customer_mobile || e.contact_mobile || e.contact_phone || "", N = e.contact_display || "", M = e.customer_company_name || e.supplier_company_name || "", H = e.dispatched_through || "", j = e.destination || "", te = !!(H || j), Z = (Ce, be) => {
      const xe = `
          ${N ? `<div class="addr-ct">${k(N)}</div>` : ""}
          <div class="addr-nm">${k(l)}</div>
          ${M ? `<div class="addr-nm">${k(M)}</div>` : ""}
          ${be.map((Oe) => `<div class="addr-ln">${k(Oe)}</div>`).join("")}
          ${A ? `<div class="addr-ln"><b>${k(t.taxIdLabel || "KRA PIN :")}</b> ${k(A)}</div>` : ""}
          ${D ? `<div class="addr-ln"><b>Phone :</b> ${k(D)}</div>` : ""}`;
      return `
      <div class="addr-col">
        <div class="addr-h">${Ce}</div>
        <div class="addr-body">${xe}</div>
      </div>`;
    };
    if (t.po) {
      const Ce = (qe) => String(qe || "").split(`
`).map((We) => We.trim()).filter(Boolean), be = Ce(e.supplier_address), xe = Ce(e.delivery_address || e.billing_address), Oe = e.delivery_address && e.billing_address && e.billing_address !== e.delivery_address ? Ce(e.billing_address) : [];
      return `<div class="addr-table">
      <div class="addr-col">
        <div class="addr-h">Vendor</div>
        <div class="addr-body">
          <div class="addr-nm">${k(l)}</div>
          ${be.map((qe) => `<div class="addr-ln">${k(qe)}</div>`).join("")}
          ${A ? `<div class="addr-ln"><b>${k(t.taxIdLabel || "KRA PIN :")}</b> ${k(A)}</div>` : ""}
          ${D ? `<div class="addr-ln"><b>Phone :</b> ${k(D)}</div>` : ""}
        </div>
      </div>
      <div class="addr-col">
        <div class="addr-h">Deliver To</div>
        <div class="addr-body">
          ${xe.length ? xe.map((qe) => `<div class="addr-ln">${k(qe)}</div>`).join("") : '<div class="addr-ln">&mdash;</div>'}
          ${Oe.length ? `<div class="addr-ln" style="margin-top:6px"><b>Billing Address :</b></div>${Oe.map((qe) => `<div class="addr-ln">${k(qe)}</div>`).join("")}` : ""}
        </div>
      </div>
    </div>`;
    }
    if (!b.length && !R.length && !A && !D && !M) return "";
    const fe = te ? `
      <div class="dispatch-table">
        <div class="dispatch-cell">
          <div class="dispatch-lbl">Dispatched Through</div>
          <div class="dispatch-val">${H ? k(H) : "&mdash;"}</div>
        </div>
        <div class="dispatch-cell">
          <div class="dispatch-lbl">Destination</div>
          <div class="dispatch-val">${j ? k(j) : "&mdash;"}</div>
        </div>
      </div>` : "";
    return `<div class="addr-table${te ? " has-dispatch" : ""}">${Z("Billing Address", b)}${Z("Shipping Address", R)}</div>${fe}`;
  })()}
  <table class="it">
    <thead><tr>
      <th class="c" style="width:30px">No.</th><th>Item &amp; Description</th>
      ${t.includeHsn ? '<th class="c" style="width:78px">HSN / SAC</th>' : ""}
      <th class="r" style="width:44px">Qty</th><th class="c" style="width:50px">Unit</th>
      ${u ? `<th class="r" style="width:82px">MRP (${k(pt(o))})</th>` : ""}
      <th class="r" style="width:82px">Rate (${k(pt(o))})</th>
      ${t.includeDiscount ? '<th class="c" style="width:64px">Discount</th>' : ""}
      ${m ? `<th class="r" style="width:88px">Taxable (${k(pt(o))})</th>` : ""}
      ${m ? c ? '<th class="c" style="width:58px">IGST</th>' : '<th class="c" style="width:58px">CGST</th><th class="c" style="width:58px">SGST</th>' : ""}
      <th class="r" style="width:104px">Amount (${k(pt(o))})</th>
    </tr></thead>
    <tbody>${f || `<tr><td colspan="${O}" style="text-align:center;color:#999;padding:24px">No items</td></tr>`}</tbody>
  </table>
  ${(() => {
    const b = [
      e.terms || e.customer_note ? `<div><div class="h">${e.customer_note ? "Note :" : "Terms &amp; Conditions :"}</div>${Ea(e.customer_note || e.terms)}</div>` : "",
      e.remarks ? `<div style="margin-top:${e.terms || e.customer_note ? "10px" : "0"}"><div class="h">Remarks :</div>${Ea(e.remarks)}</div>` : ""
    ].filter(Boolean).join(""), R = (e.payment_lines || []).filter(Boolean), A = t.po ? R.length ? `<div class="h">Payment Details :</div>${R.map((D) => k(D)).join("<br/>")}` : "" : null;
    return `<div class="bottom-frame">
  <div class="bf-row">
    <div class="bf-cell">
      ${A !== null ? A : ie.bankName || ie.bankAccountNo ? `
        <div class="h">Bank Details :</div>
        ${ie.bankName ? `Bank Name: ${k(ie.bankName)}<br/>` : ""}
        ${ie.bankBranch ? `Branch: ${k(ie.bankBranch)}<br/>` : ""}
        ${ie.bankAccountNo ? `Account No.: ${k(ie.bankAccountNo)}<br/>` : ""}
        ${ie.bankIfsc ? `Bank Code: ${k(ie.bankIfsc)}` : ""}
      ` : ""}
    </div>
    <div class="bf-cell">
      <div class="h">${k(t.amountWordsLabel || "Total Invoice Amount in Words :")}</div>
      <div class="val">${k($)}</div>
    </div>
    <div class="bf-cell bf-cell-totals">
      <div class="tot-figs">
        <div class="row"><span>Total Amount before Tax (${k(pt(o))})</span><span>${a(i)}</span></div>
        ${h}
        ${e.discount_amount ? `<div class="row"><span style="color:#b91c1c">Discount (${k(pt(o))})</span><span style="color:#b91c1c">− ${a(e.discount_amount)}</span></div>` : ""}
        ${_ ? `<div class="row"><span>Round Off (${k(pt(o))})</span><span>${_ > 0 ? "" : "− "}${a(Math.abs(_))}</span></div>` : ""}
        <div class="row grand"><span>Grand Total (${k(pt(o))})</span><span>${a(e.grand_total)}</span></div>
      </div>
    </div>
  </div>
  ${b ? `<div class="bf-row"><div class="bf-cell">${b}</div></div>` : ""}
  <div class="bf-row bf-row-sign">
    <div class="bf-cell sign-note-cell">${t.footerNote ? k(t.footerNote) : "This is a computer-generated invoice. E. &amp; O. E."}</div>
    <div class="bf-cell sign-qr-cell">
  ${t.showQr === !1 ? "" : `<img src="${js("/assets/psd_books/img/upi.png")}" alt="UPI QR Code"/>`}
</div>
    <div class="bf-cell sign-for-cell">
      <div>For, ${k(e.company || t.companyName || "")}</div>
      <b>Authorised Signatory</b>
    </div>
  </div>
</div>`;
  })()}
  ${L.length ? `<table class="hsn-tbl"><thead><tr>
    <th>HSN/SAC Code</th><th class="r">Taxable (${k(pt(o))})</th>
    ${c ? `<th class="r">IGST %</th><th class="r">IGST (${k(pt(o))})</th>` : `<th class="r">CGST %</th><th class="r">CGST (${k(pt(o))})</th><th class="r">SGST %</th><th class="r">SGST (${k(pt(o))})</th>`}
  </tr></thead><tbody>
    ${L.map((b) => `<tr><td>${k(b.hsn)}</td><td class="r">${a(b.taxable)}</td>
      ${c ? `<td class="r">${b.igstRate.toFixed(2)}%</td><td class="r">${a(b.igstAmt)}</td>` : `<td class="r">${b.cgstRate.toFixed(2)}%</td><td class="r">${a(b.cgstAmt)}</td><td class="r">${b.sgstRate.toFixed(2)}%</td><td class="r">${a(b.sgstAmt)}</td>`}
    </tr>`).join("")}
  </tbody></table>` : ""}
</div></div>
<script>
  (function () {
    function syncAddrWidth() {
      var tbl = document.querySelector('table.it');
      var addr = document.querySelector('.addr-table');
      if (!tbl || !addr) return;
      var w = tbl.getBoundingClientRect().width;
      if (w > 0) addr.style.width = w + 'px';
    }
    // Run after layout has settled (fonts/images can still shift table width
    // right after DOMContentLoaded, so re-check on load and once more on the
    // next frame).
    document.addEventListener('DOMContentLoaded', syncAddrWidth);
    window.addEventListener('load', function () {
      syncAddrWidth();
      requestAnimationFrame(syncAddrWidth);
    });
  })();
<\/script>
</body></html>`;
}
function B1(e, t) {
  const n = ie.brandColor, s = js(ie.logo), o = e.currency || "KES", a = e.net_total != null ? e.net_total : (e.grand_total || 0) - (e.total_taxes_and_charges ?? e.total_tax ?? (e.taxes || []).reduce((c, p) => c + (p.tax_amount || 0), 0)), i = e[t.partyField] || e.customer || e.supplier || "", l = e.posting_date || e.transaction_date || "", d = (e.items || []).map((c, p) => `
    <tr>
      <td><div class="inm">${k(c.item_name || c.item_code)}</div>
        ${c.description && c.description !== c.item_name ? `<div class="ids">${k(c.description)}</div>` : ""}
        ${t.includeHsn && (c.gst_hsn_code || c.hsn_code) ? `<div class="ihs">HSN ${k(c.gst_hsn_code || c.hsn_code)}</div>` : ""}
      </td>
      <td class="r">${Number(c.qty || 0)} <span class="mut">${k(c.uom || "")}</span></td>
      <td class="r">${vt(c.rate, o)}</td>
      ${t.includeDiscount ? `<td class="c mut">${Number(c.discount_percentage || 0)}%</td>` : ""}
      <td class="r b">${vt(c.amount, o)}</td>
    </tr>`).join(""), u = 4 + (t.includeDiscount ? 1 : 0);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#1f2937;background:#f1f5f9;font-size:12.5px;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{max-width:900px;margin:0 auto;padding:28px}
  /* Hero card */
  .hero{background:${n};color:#fff;border-radius:18px;padding:26px 30px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 10px 30px ${n}40}
  .hero .co{font-size:21px;font-weight:800;letter-spacing:-.01em}
  .hero img{max-height:46px;max-width:130px;object-fit:contain;background:#fff;border-radius:10px;padding:6px;margin-bottom:10px;display:block}
  .hero .gst{font-size:10.5px;opacity:.85;margin-top:4px}
  .hero .rt{text-align:right}
  .hero .badge{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;opacity:.85}
  .hero .num{font-size:26px;font-weight:800;margin-top:2px;line-height:1}
  .hero .dt{font-size:11px;opacity:.85;margin-top:6px}
  /* Info chips */
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0}
  .chip{background:#fff;border-radius:12px;padding:10px 16px;box-shadow:0 2px 8px rgba(15,23,42,.06);font-size:11.5px}
  .chip .l{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8}
  .chip .v{font-weight:700;color:#0f172a;margin-top:2px}
  /* Party cards */
  .cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
  .card{background:#fff;border-radius:14px;padding:16px 18px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
  .card .l{font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:${n};margin-bottom:5px}
  .card .nm{font-size:14px;font-weight:800;color:#0f172a}
  .card .sub{font-size:11px;color:#64748b;margin-top:3px;white-space:pre-line;line-height:1.45}
  /* Items card */
  .tbl-card{background:#fff;border-radius:14px;padding:8px 10px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
  table{width:100%;border-collapse:collapse;font-size:12.5px}
  thead th{text-align:left;padding:12px 12px;font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;border-bottom:2px solid #eef2f7}
  thead th.r{text-align:right}thead th.c{text-align:center}
  tbody td{padding:13px 12px;border-bottom:1px solid #f4f6f9;vertical-align:top;word-break:break-word;overflow-wrap:anywhere}
  tbody tr:last-child td{border-bottom:none}
  .inm{font-weight:700;color:#0f172a}.ids{font-size:10.5px;color:#64748b;margin-top:2px}.ihs{font-size:10px;color:#94a3b8;margin-top:2px}
  .r{text-align:right}.c{text-align:center}.b{font-weight:800}.mut{color:#94a3b8;font-size:10.5px}
  /* Totals */
  .tw{display:flex;justify-content:flex-end;margin-top:16px}
  .tt{width:300px;background:#fff;border-radius:14px;padding:8px 18px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
  .tt .row{display:flex;justify-content:space-between;padding:8px 0;font-size:12.5px;color:#64748b;border-bottom:1px solid #f4f6f9}
  .tt .row span:last-child{color:#0f172a;font-weight:600}
  .tt .grand{display:flex;justify-content:space-between;align-items:center;margin:10px -18px -8px;padding:14px 18px;background:${n};color:#fff;border-radius:0 0 14px 14px;font-weight:800;font-size:15px}
  .notes{background:#fff;border-radius:14px;padding:14px 18px;margin-top:16px;box-shadow:0 2px 8px rgba(15,23,42,.06);font-size:11.5px;color:#374151;line-height:1.6}
  .notes .h{font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${n};margin-bottom:4px}
  .sig{display:flex;gap:18px;margin-top:26px}
  .sig div{flex:1;border-top:1.5px solid #cbd5e1;padding-top:7px;font-size:10px;color:#94a3b8;text-align:center}
  .ft{text-align:center;margin-top:18px;font-size:10px;color:#a8b3c1}
  @media print{body{background:#fff}.page{padding:0;max-width:none}.hero{box-shadow:none}.chip,.card,.tbl-card,.tt,.notes{box-shadow:none;border:1px solid #eef2f7}}
</style></head><body><div class="page">
  <div class="hero">
    <div>
      ${s ? `<img src="${k(s)}"/>` : ""}
      <div class="co">${k(e.company || t.companyName || "")}</div>
      ${e.company_gstin || e.gstin ? `<div class="gst">KRA PIN: ${k(e.company_gstin || e.gstin)}</div>` : ""}
    </div>
    <div class="rt">
      <div class="print-copy-text" style="font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#fff;text-align:right;margin-bottom:6px">${k(t.copyText || "")}</div>
      <div class="badge">${k(t.title)}</div>
      <div class="num">${k(e.name || "")}</div>
      <div class="dt">${k(l)}${e.status ? " · " + k(e.status) : ""}</div>
    </div>
  </div>
  <div class="chips">
    <div class="chip"><div class="l">Date</div><div class="v">${k(l)}</div></div>
    ${e.due_date ? `<div class="chip"><div class="l">Due Date</div><div class="v">${k(e.due_date)}</div></div>` : ""}
    ${e.valid_till ? `<div class="chip"><div class="l">Valid Till</div><div class="v">${k(e.valid_till)}</div></div>` : ""}
    ${e.delivery_date ? `<div class="chip"><div class="l">Delivery</div><div class="v">${k(e.delivery_date)}</div></div>` : ""}
    ${e.po_no ? `<div class="chip"><div class="l">PO Number</div><div class="v">${k(e.po_no)}</div></div>` : ""}
    ${e.place_of_supply ? `<div class="chip"><div class="l">Place of Supply</div><div class="v">${k(e.place_of_supply)}</div></div>` : ""}
  </div>
  <div class="cards">
    <div class="card"><div class="l">From</div><div class="nm">${k(e.company || t.companyName || "")}</div>${e.company_gstin || e.gstin ? `<div class="sub">KRA PIN: ${k(e.company_gstin || e.gstin)}</div>` : ""}</div>
    <div class="card"><div class="l">${k(t.partyLabel)}</div><div class="nm">${k(i)}</div>${e.address_display ? `<div class="sub">${k(e.address_display)}</div>` : ""}${e.customer_gstin || e.supplier_gstin ? `<div class="sub">KRA PIN: ${k(e.customer_gstin || e.supplier_gstin)}</div>` : ""}</div>
  </div>
  <div class="tbl-card"><table>
    <thead><tr>
      <th>Item</th><th class="r" style="width:96px">Qty</th><th class="r" style="width:110px">Rate</th>
      ${t.includeDiscount ? '<th class="c" style="width:52px">Disc</th>' : ""}
      <th class="r" style="width:120px">Amount</th>
    </tr></thead>
    <tbody>${d || `<tr><td colspan="${u}" style="text-align:center;color:#94a3b8;padding:28px">No items</td></tr>`}</tbody>
  </table></div>
  <div class="tw"><div class="tt">
    <div class="row"><span>Subtotal</span><span>${vt(a, o)}</span></div>
    ${(e.taxes || []).map((c) => `<div class="row"><span>${k(c.description || c.account_head)}</span><span>${vt(c.tax_amount || 0, o)}</span></div>`).join("")}
    ${e.discount_amount ? `<div class="row"><span style="color:#dc2626">Discount</span><span style="color:#dc2626">− ${vt(e.discount_amount, o)}</span></div>` : ""}
    <div class="grand"><span>Grand Total</span><span>${vt(e.grand_total, o)}</span></div>
  </div></div>
  ${e.terms || e.customer_note ? `<div class="notes"><div class="h">${e.customer_note ? "Note" : "Terms & Conditions"}</div>${k(e.customer_note || e.terms)}</div>` : ""}
  ${e.remarks ? `<div class="notes"><div class="h">Remarks</div>${k(e.remarks)}</div>` : ""}
  <div class="sig"><div>Prepared By</div><div>Authorised Signatory</div><div>Receiver's Signature</div></div>
  <div class="ft">${k(e.name)} · Printed ${Ol()}</div>
</div></body></html>`;
}
function j1(e, t) {
  const n = ie.brandColor, s = js(ie.logo), o = e.currency || "KES", a = e.net_total != null ? e.net_total : (e.grand_total || 0) - (e.total_taxes_and_charges ?? e.total_tax ?? (e.taxes || []).reduce((c, p) => c + (p.tax_amount || 0), 0)), i = e[t.partyField] || e.customer || e.supplier || "", l = e.posting_date || e.transaction_date || "", d = (e.items || []).map((c, p) => `
    <tr>
      <td class="n">${String(p + 1).padStart(2, "0")}</td>
      <td>
        <span class="inm">${k(c.item_name || c.item_code)}</span>
        ${c.description && c.description !== c.item_name ? `<div class="ids">${k(c.description)}</div>` : ""}
      </td>
      ${t.includeHsn ? `<td class="c mono">${k(c.gst_hsn_code || c.hsn_code || "—")}</td>` : ""}
      <td class="r mono">${Number(c.qty || 0)} ${k(c.uom || "")}</td>
      <td class="r mono">${vt(c.rate, o)}</td>
      ${t.includeDiscount ? `<td class="r mono">${Number(c.discount_percentage || 0) ? Number(c.discount_percentage) + "%" : "—"}</td>` : ""}
      <td class="r mono b">${vt(c.amount, o)}</td>
    </tr>`).join(""), u = 5 + (t.includeHsn ? 1 : 0) + (t.includeDiscount ? 1 : 0);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#111;background:#fff;font-size:12px;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .mono{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}
  .page{max-width:780px;margin:0 auto;padding:64px 60px}
  .accent{height:4px;width:48px;background:${n};margin-bottom:28px}
  /* Header */
  .hdr{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:44px}
  .hdr .co{font-size:18px;font-weight:700;letter-spacing:-.01em;display:flex;align-items:center;gap:10px}
  .hdr .co img{max-height:30px;max-width:90px;object-fit:contain}
  .hdr .gst{font-size:10px;color:#999;margin-top:4px;font-weight:400}
  .hdr .rt{text-align:right}
  .hdr .t{font-size:10px;font-weight:600;letter-spacing:.34em;text-transform:uppercase;color:#999}
  .hdr .num{font-size:17px;font-weight:700;margin-top:4px}
  /* Meta grid */
  .meta{display:grid;grid-template-columns:repeat(4,1fr);gap:18px 24px;margin-bottom:38px}
  .meta .m .l{font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bbb}
  .meta .m .v{font-size:12px;font-weight:600;color:#111;margin-top:3px}
  .meta .m .v.sub{font-weight:400;color:#555;font-size:11px;white-space:pre-line;line-height:1.4}
  /* Table */
  table{width:100%;border-collapse:collapse;font-size:12px}
  thead th{text-align:left;padding:0 4px 10px;font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bbb;border-bottom:1px solid #111}
  thead th.r{text-align:right}thead th.c{text-align:center}
  tbody td{padding:13px 4px;border-bottom:1px solid #f0f0f0;vertical-align:top;word-break:break-word;overflow-wrap:anywhere}
  tbody tr:last-child td{border-bottom:none}
  .n{color:#ccc;width:30px;font-variant-numeric:tabular-nums}
  .inm{font-weight:600}.ids{font-size:10.5px;color:#888;margin-top:2px}
  .r{text-align:right}.c{text-align:center}.b{font-weight:700}
  /* Totals */
  .tw{display:flex;justify-content:flex-end;margin-top:8px}
  .tt{width:280px}
  .tt .row{display:flex;justify-content:space-between;padding:7px 0;font-size:12px;color:#777}
  .tt .row span:last-child{color:#111}
  .tt .grand{display:flex;justify-content:space-between;align-items:baseline;margin-top:10px;padding-top:14px;border-top:3px solid ${n};font-size:18px;font-weight:700;color:#111}
  .tt .grand .amt{color:${n}}
  /* Notes */
  .notes{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:28px}
  .notes .h{font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bbb;margin-bottom:6px}
  .notes .bd{font-size:11.5px;color:#444;line-height:1.6}
  .sig{display:flex;gap:30px;margin-top:54px}
  .sig div{flex:1;border-top:1px solid #ccc;padding-top:6px;font-size:9.5px;color:#aaa;letter-spacing:.04em}
  .ft{margin-top:34px;font-size:9px;color:#ccc;letter-spacing:.06em;text-transform:uppercase}
  @media print{.page{padding:44px 40px;max-width:none}}
</style></head><body><div class="page">
  <div class="accent"></div>
  <div class="hdr">
    <div>
      <div class="co">${s ? `<img src="${k(s)}"/>` : ""}${k(e.company || t.companyName || "")}</div>
      ${e.company_gstin || e.gstin ? `<div class="gst">KRA PIN ${k(e.company_gstin || e.gstin)}</div>` : ""}
    </div>
    <div class="rt"><div class="print-copy-text" style="font-size:10px;font-weight:700;color:#111;text-transform:uppercase;margin-bottom:6px;letter-spacing:.05em;text-align:right">${k(t.copyText || "")}</div><div class="t">${k(t.title)}</div><div class="num mono">${k(e.name || "")}</div></div>
  </div>
  <div class="meta">
    <div class="m" style="grid-column:span 2"><div class="l">${k(t.partyLabel)}</div><div class="v">${k(i)}</div>${e.address_display ? `<div class="v sub">${k(e.address_display)}</div>` : ""}${e.customer_gstin || e.supplier_gstin ? `<div class="v sub">KRA PIN ${k(e.customer_gstin || e.supplier_gstin)}</div>` : ""}</div>
    <div class="m"><div class="l">Date</div><div class="v mono">${k(l)}</div></div>
    ${e.due_date ? `<div class="m"><div class="l">Due</div><div class="v mono">${k(e.due_date)}</div></div>` : e.valid_till ? `<div class="m"><div class="l">Valid Till</div><div class="v mono">${k(e.valid_till)}</div></div>` : "<div class='m'></div>"}
    ${e.po_no ? `<div class="m"><div class="l">PO Number</div><div class="v mono">${k(e.po_no)}</div></div>` : ""}
    ${e.place_of_supply ? `<div class="m"><div class="l">Place of Supply</div><div class="v">${k(e.place_of_supply)}</div></div>` : ""}
  </div>
  <table>
    <thead><tr>
      <th style="width:30px">No</th><th>Item</th>
      ${t.includeHsn ? '<th class="c" style="width:70px">HSN/SAC</th>' : ""}
      <th class="r" style="width:96px">Qty</th><th class="r" style="width:100px">Rate</th>
      ${t.includeDiscount ? '<th class="r" style="width:52px">Disc</th>' : ""}
      <th class="r" style="width:110px">Amount</th>
    </tr></thead>
    <tbody>${d || `<tr><td colspan="${u}" style="text-align:center;color:#bbb;padding:24px">No items</td></tr>`}</tbody>
  </table>
  <div class="tw"><div class="tt">
    <div class="row"><span>Subtotal</span><span class="mono">${vt(a, o)}</span></div>
    ${(e.taxes || []).map((c) => `<div class="row"><span>${k(c.description || c.account_head)}</span><span class="mono">${vt(c.tax_amount || 0, o)}</span></div>`).join("")}
    ${e.discount_amount ? `<div class="row"><span style="color:#b91c1c">Discount</span><span class="mono" style="color:#b91c1c">− ${vt(e.discount_amount, o)}</span></div>` : ""}
    <div class="grand"><span>Total</span><span class="amt mono">${vt(e.grand_total, o)}</span></div>
  </div></div>
  ${e.remarks || e.terms || e.customer_note ? `<div class="notes">
    ${e.remarks ? `<div><div class="h">Remarks</div><div class="bd">${k(e.remarks)}</div></div>` : "<div></div>"}
    ${e.terms || e.customer_note ? `<div><div class="h">${e.customer_note ? "Note" : "Terms"}</div><div class="bd">${k(e.customer_note || e.terms)}</div></div>` : ""}
  </div>` : ""}
  <div class="sig"><div>Prepared By</div><div>Authorised Signatory</div><div>Receiver's Signature</div></div>
  <div class="ft">${k(e.company || "")} — ${k(e.name)} — Printed ${Ol()}</div>
</div></body></html>`;
}
function H1(e, t) {
  t.currency || e.currency;
  const n = (I) => so(I), s = e.transaction_date || e.posting_date || "", o = (I) => String(I || "").split(`
`).map((f) => f.trim()).filter(Boolean), a = [e.supplier_name || e.supplier || "", ...o(e.supplier_address)].filter(Boolean), i = (e.items || []).some((I) => Number(I.discount_percentage || 0) > 0), l = (I) => {
    const f = e.taxes || [], h = I.tax_code ? f.find((L) => L.description === I.tax_code || L.account_head === I.tax_code) : null;
    if (h && h.rate != null) return Number(h.rate);
    const O = [...new Set(f.map((L) => Number(L.rate || 0)).filter((L) => L > 0))];
    return O.length === 1 ? O[0] : null;
  }, d = 7 + (i ? 1 : 0), u = (e.items || []).map((I, f) => `
    <tr>
      <td class="c">${f + 1}</td>
      <td>${k(I.item_name || I.item_code)}${I.description && I.description !== I.item_name ? `<div class="ds">${k(I.description)}</div>` : ""}</td>
      <td class="r">${Number(I.qty || 0)}</td>
      <td class="c">${k(I.uom || "Nos")}</td>
      <td class="r">${n(I.rate)}</td>
      ${i ? `<td class="c">${Number(I.discount_percentage || 0) ? Number(I.discount_percentage).toFixed(2) : ""}</td>` : ""}
      <td class="c">${l(I) != null ? l(I) + "%" : ""}</td>
      <td class="r">${n(I.amount)}</td>
    </tr>`).join(""), p = Array.from({ length: 0 }, () => `<tr class="bl">${"<td></td>".repeat(d)}</tr>`).join(""), m = e.in_words || fi(e.grand_total), g = o(e.terms).join("; "), _ = (e.payment_lines || []).filter(Boolean).join("; "), $ = e.prepared_by_name || e.owner_name || e.owner || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  @page{size:A4 landscape;margin:8mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Times New Roman",Georgia,serif;color:#111;background:#fff;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:1040px;margin:0 auto;padding:18px 24px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:210px;min-height:120px;display:flex;align-items:flex-start}
  .lg img{max-height:135px;max-width:200px;width:auto;height:auto;object-fit:contain}
  .ttl{flex:1;text-align:center;font-size:24px;font-weight:700;letter-spacing:.03em;padding-top:56px}
  .co{width:420px;text-align:left}
  .co .n{font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;color:#d32f2f;line-height:1.05;letter-spacing:-.01em}
  .co .a{font-size:11px;line-height:1.4;margin-top:4px}
  .co .v{font-size:13px;font-weight:700;margin-top:6px}
  .mid{display:flex;justify-content:space-between;gap:24px;margin-top:6px}
  .ms{flex:1;max-width:560px;min-height:128px;border:1.6px solid #111;border-radius:0 0 22px 0;border-top-left-radius:0;padding:8px 12px}
  .ms .l{font-weight:700;font-size:14px}
  .ms .t{margin-top:4px;line-height:1.45}
  .ms .t b{font-size:14px}
  .pn{width:470px;border:1.6px solid #111;border-radius:16px 16px 16px 16px;overflow:hidden;align-self:flex-start}
  .pn .r{display:flex;min-height:44px}
  .pn .r+.r{border-top:1.6px solid #111}
  .pn .k{width:36%;border-right:1.6px solid #111;padding:10px 14px;font-weight:700;font-size:14px}
  .pn .v{flex:1;padding:10px 14px;font-size:14px}
  .sup{font-weight:700;font-size:13px;margin:10px 0 4px}
  table.it{width:100%;border-collapse:collapse;table-layout:fixed;border:1.6px solid #111}
  table.it th{border:1.6px solid #111;padding:6px 6px;font-size:13px;font-weight:700;text-align:center}
  table.it td{border-left:1.6px solid #111;border-right:1.6px solid #111;padding:4px 7px;vertical-align:top;font-size:12.5px;height:26px}
  table.it .c{text-align:center}table.it .r{text-align:right}
  table.it .ds{font-size:11px;color:#444}
  table.it tr.bl td{height:26px}
  table.it tfoot td{border:1.6px solid #111;height:1px;padding:0}
  .w1{width:6%}.w2{width:36%}.w3{width:8%}.w4{width:8%}.w5{width:12%}.w6{width:8%}.w8{width:8%}.w7{width:14%}table.it.nd .w2{width:44%}
  .ft{display:flex;gap:0;align-items:flex-start;margin-top:0}
  .ft .lines{flex:1;padding-top:14px}
  .ft .ln{display:flex;gap:6px;align-items:baseline;margin-bottom:10px;font-size:13.5px}
  .ft .ln .lb{white-space:nowrap}
  .ft .ln .dl{flex:1;border-bottom:1.5px dotted #111;min-height:16px;padding:0 4px;font-size:12.5px}
  .tot{display:flex;align-items:stretch}
  .tot .tl{align-self:center;padding:0 10px;font-size:14px;white-space:nowrap;margin-top:14px}
  .tot .tb{width:13%;min-width:130px;border:1.6px solid #111;border-top:none;text-align:right;padding:8px 8px;font-weight:700;font-size:14px;min-height:56px}
  .notes{display:flex;justify-content:space-between;gap:12px;font-size:13.5px;margin-top:8px}
  .sig{display:flex;justify-content:space-between;gap:40px;margin-top:22px;font-size:14px}
  .sig .s{flex:1;display:flex;gap:8px;align-items:flex-end}
  .sig .s .u{flex:1;border-bottom:1.5px solid #111;min-height:20px;padding:0 4px}
  .cp{position:absolute;top:6px;right:24px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet" style="position:relative">
  <span class="cp print-copy-text">${k(t.copyText || "")}</span>
  <div class="mid">
    <div class="ms"><div class="l">M/s</div><div class="t">${a.length ? `<b>${k(a[0])}</b>${a.slice(1).map((I) => `<br/>${k(I)}`).join("")}` : ""}</div></div>
    <div class="pn">
      <div class="r"><div class="k">P.O No.</div><div class="v">${k(e.name || "")}</div></div>
      <div class="r"><div class="k">DATE</div><div class="v">${k(mt(s))}</div></div>
    </div>
  </div>
  <div class="sup">PLEASE SUPPLY THE FOLLOWING GOODS:-</div>
  <table class="it${i ? "" : " nd"}">
    <thead><tr><th class="w1">Sr. No</th><th class="w2">Description</th><th class="w3">Qty</th><th class="w4">Unit</th><th class="w5">Rate</th>${i ? '<th class="w6">Disc. %</th>' : ""}<th class="w8">Tax</th><th class="w7">Amount</th></tr></thead>
    <tbody>${u}${p}</tbody>
    <tfoot><tr><td colspan="${d}"></td></tr></tfoot>
  </table>
  <div class="ft">
    <div class="lines">
      <div class="ln"><span class="lb">Amount in Words:</span><span class="dl">${k(m)}</span></div>
      <div class="ln"><span class="lb">Special Instructions:</span><span class="dl">${k(g)}</span></div>
      <div class="ln"><span class="lb">Payment Details:</span><span class="dl">${k(_)}</span></div>
    </div>
    <div class="tot"><span class="tl">Total Amount</span><div class="tb">${n(e.grand_total)}</div></div>
  </div>
  <div class="notes"><span>Please quote P.O No. on all Invoices</span><span>This P.O is issued without any alteration</span><span>The P.O amount is inclusive of VAT.</span></div>
  <div class="sig">
    <div class="s"><span>Prepared By:</span><span class="u">${k($)}</span></div>
    <div class="s"><span>Authorized by:</span><span class="u"></span></div>
  </div>
</div></body></html>`;
}
const se = {
  pageW: 225,
  pageH: 209,
  tx: 14.7,
  // paper left edge -> left line of the item table
  ty: 72.5,
  // paper top edge  -> top line of the table header   (calibrate on the real sheet)
  hdrH: 7.5,
  // table header row height
  bodyH: 72.6,
  // item area height (header bottom -> bottom line of the table)
  lineH: 4.8,
  // one printed line
  cols: { sr: [0, 16], desc: [16, 96], qty: [96, 117], unit: [117, 137], rate: [137, 155], disc: [155, 173], amt: [173, 197] },
  ms: { x: 0, y: -32, w: 83, h: 29 },
  // M/s box
  poVal: { x: 145, w: 50, yPo: -26.8, yDate: -12 },
  // P.O No. and DATE value cells (y = vertical centre)
  total: { x: 173, w: 24, y: 82.5 },
  // Total Amount box (y = vertical centre)
  words: { x: 32.3, w: 113, y: 88 },
  // dotted line baselines
  special: { x: 32.4, w: 115, y: 96.7 },
  payment: { x: 27, w: 118, y: 103.3 },
  prepared: { x: 22.4, w: 60, y: 119.2 },
  descChars: 41
  // characters that fit one line of the 80 mm Description column
};
function Dl(e, t) {
  t.currency || e.currency;
  const n = (b) => so(b), s = e.transaction_date || e.posting_date || "", o = (b) => String(b || "").split(`
`).map((R) => R.trim()).filter(Boolean), a = [e.supplier_name || e.supplier || "", ...o(e.supplier_address)].filter(Boolean).slice(0, 4), i = e.in_words || fi(e.grand_total), l = o(e.terms).join("; "), d = e.prepared_by_name || e.owner_name || e.owner || "", u = (b) => Number(b).toFixed(2) + "mm", c = (b) => String(+Number(b || 0).toFixed(3)), p = (b, R) => {
    const A = [];
    let D = "";
    for (const N of String(b || "").split(/\s+/).filter(Boolean))
      for (D ? (D + " " + N).length <= R ? D += " " + N : (A.push(D), D = N) : D = N; D.length > R; )
        A.push(D.slice(0, R)), D = D.slice(R);
    return D && A.push(D), A.length > 3 && (A.length = 3, A[2] = A[2].slice(0, Math.max(0, R - 1)) + "…"), A.length ? A : [""];
  }, m = Math.floor(se.bodyH / se.lineH), g = (b) => {
    const R = String(b.item_code || "").trim(), A = (H) => String(H || "").replace(/\s+/g, " ").trim(), D = (H) => {
      const j = A(H);
      if (!j || j.toLowerCase() === R.toLowerCase()) return "";
      const te = R + " - ";
      return R && j.toLowerCase().startsWith(te.toLowerCase()) ? j.slice(te.length).trim() : j;
    }, N = D(b.item_name) || D(b.print_name), M = D(b.description);
    return N && M && M !== N ? N + " - " + M : N || M || R;
  }, _ = (e.items || []).map((b, R) => ({ it: b, no: R + 1, lines: p(g(b), se.descChars) })), $ = [[]];
  let I = 0;
  for (const b of _)
    I + b.lines.length > m && I > 0 && ($.push([]), I = 0), $[$.length - 1].push(b), I += b.lines.length;
  const f = (b, R, A = 9.5, D = 5.5, N = 0.52) => {
    const M = String(b || "").length * N * 0.3528;
    return Math.max(D, Math.min(A, M ? R / M : A)).toFixed(2) + "pt";
  }, h = (b, R, A, D, N, M = "") => `<div class="t" style="left:${u(se.tx + b)};top:${u(se.ty + R)};width:${u(A)};height:${u(D)};line-height:${u(D)};${M}">${N}</div>`, O = (b, R) => h(R.x, R.y - 4.4, R.w, 4.4, k(b), `font-size:${f(b, R.w)}`), L = $.map((b, R) => {
    const A = R === $.length - 1;
    let D = se.hdrH + 0.4, N = "";
    for (const { it: H, no: j, lines: te } of b) {
      const Z = se.cols, fe = se.lineH;
      N += h(Z.sr[0], D, Z.sr[1] - Z.sr[0], fe, j, "text-align:center"), te.forEach((Ce, be) => {
        N += h(Z.desc[0] + 1.5, D + be * fe, Z.desc[1] - Z.desc[0] - 2, fe, k(Ce));
      }), N += h(Z.qty[0], D, Z.qty[1] - Z.qty[0] - 4.5, fe, c(H.qty), `text-align:right;font-size:${f(c(H.qty), Z.qty[1] - Z.qty[0] - 4.5, 9.5, 6, 0.56)}`), N += h(Z.unit[0], D, Z.unit[1] - Z.unit[0], fe, k(H.uom || "Nos"), "text-align:center"), N += h(Z.rate[0], D, Z.rate[1] - Z.rate[0] - 3.5, fe, n(H.rate), `text-align:right;font-size:${f(n(H.rate), Z.rate[1] - Z.rate[0] - 4, 9.5, 6, 0.56)}`), Number(H.discount_percentage || 0) > 0 && (N += h(Z.disc[0], D, Z.disc[1] - Z.disc[0], fe, Number(H.discount_percentage).toFixed(2), "text-align:center")), N += h(Z.amt[0], D, Z.amt[1] - Z.amt[0] - 4.5, fe, n(H.amount), `text-align:right;font-size:${f(n(H.amount), Z.amt[1] - Z.amt[0] - 5, 9.5, 6, 0.56)}`), D += te.length * fe;
    }
    const M = $.length > 1 ? ` <span class="pg-no">(${R + 1}/${$.length})</span>` : "";
    return `<div class="pg"><div class="shift">
      <div class="outline">${V1()}</div>
      ${a.length ? h(
      se.ms.x + 9,
      se.ms.y + 8,
      se.ms.w - 11,
      se.ms.h - 9,
      `<b>${k(a[0])}</b>${a.slice(1).map((H) => `<br/>${k(H)}`).join("")}`,
      "line-height:4.3mm;height:auto;white-space:normal"
    ) : ""}
      ${h(se.poVal.x + 2, se.poVal.yPo - 2.8, se.poVal.w - 3, 5.6, `<b>${k(e.name || "")}</b>${M}`, `font-size:${f((e.name || "") + ($.length > 1 ? " (1/1)" : ""), se.poVal.w - 3, 9.5, 6, 0.58)}`)}
      ${h(se.poVal.x + 2, se.poVal.yDate - 2.8, se.poVal.w - 3, 5.6, k(mt(s)))}
      ${N}
      ${A ? h(se.total.x, se.total.y - 2.8, se.total.w - 4.5, 5.6, `<b>${n(e.grand_total)}</b>`, `text-align:right;font-size:${f(n(e.grand_total), se.total.w - 5.5, 10, 6, 0.6)}`) : h(se.total.x, se.total.y - 2.8, se.total.w - 4.5, 5.6, "cont.", "text-align:right;font-size:8pt")}
      ${A ? O(i, se.words) + O(l, se.special) : ""}
      ${h(se.prepared.x, se.prepared.y - 4.4, se.prepared.w, 4.4, k(d))}
    </div></div>`;
  }).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<style id="pgsz">@page{size:${se.pageW}mm ${se.pageH}mm;margin:0}</style>
<title>${k(t.title)} — ${k(e.name)} (pre-printed sheet)</title>
<style>
  @page{margin:0}
  *{box-sizing:border-box;margin:0;padding:0}
  :root{--dx:0mm;--dy:0mm;--pw:${se.pageW}mm;--ph:${se.pageH}mm;--rot:translate(0,0)}
  html,body{font-family:Arial,Helvetica,sans-serif;color:#000;font-size:9.5pt;background:#e5e7eb}
  .toolbar{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #e5e7eb;padding:10px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:12.5px}
  .toolbar b{font-size:11.5px;letter-spacing:.04em}
  .toolbar label{display:flex;align-items:center;gap:5px}
  .toolbar input[type=number]{width:70px;padding:4px 6px;border:1px solid #cbd5e1;border-radius:5px;font:inherit}
  .toolbar button{font:inherit;padding:6px 12px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;cursor:pointer}
  .toolbar .go{margin-left:auto;background:#1a6ef7;border-color:#1a6ef7;color:#fff;font-weight:700}
  .toolbar .hint{flex-basis:100%;font-size:11.5px;color:#64748b}
  .pg{position:relative;width:var(--pw);height:var(--ph);margin:14px auto;background:#fff;box-shadow:0 2px 14px rgba(0,0,0,.18);overflow:hidden;page-break-after:always;break-after:page}
  .pg:last-of-type{page-break-after:auto;break-after:auto}
  .shift{position:absolute;left:0;top:0;width:${se.pageW}mm;height:${se.pageH}mm;transform-origin:0 0;transform:var(--rot) translate(var(--dx),var(--dy))}
  .t{position:absolute;white-space:nowrap;overflow:hidden;text-overflow:clip}
  .pg-no{font-size:7.5pt;font-weight:400}
  .outline{display:none}
  body.ol .outline{display:block}
  .outline div{position:absolute;border:1px dashed #777;color:#777;font-size:6pt;line-height:1}
  @media print{
    html,body{background:#fff}
    .toolbar{display:none!important}
    .pg{margin:0;box-shadow:none;height:calc(var(--ph) - 12mm);overflow:visible}
    .pg:last-of-type{page-break-after:avoid;break-after:avoid}
  }
</style></head><body>
<div class="toolbar">
  <b>PRINT ON PRE-PRINTED LPO SHEET</b>
  <label>X nudge (mm) <input id="dx" type="number" step="0.5" value="-7"/></label>
  <label>Y nudge (mm) <input id="dy" type="number" step="0.5" value="-4"/></label>
  <label>Orientation <select id="rt"><option value="0">Normal (225 x 209 landscape)</option><option value="90">Rotate 90° clockwise (portrait page)</option><option value="270">Rotate 90° anticlockwise (portrait page)</option><option value="180">Rotate 180°</option></select></label>
  <label><input id="ol" type="checkbox"/> Print form outline (for a test on plain paper)</label>
  <button id="rs" type="button">Reset</button>
  <button class="go" type="button" onclick="window.print()">Print</button>
  <div class="hint">Printer: paper 225 x 209 mm, margins None, scale 100%. If the text prints sideways, pick the matching Orientation here (and tick the outline to test on plain paper first). Positive X moves the text right, positive Y moves it down. The nudge is remembered on this computer.</div>
</div>
${L}
<script>
(function(){
  var K='bv_po_pp_calib', root=document.documentElement;
  var dx=document.getElementById('dx'), dy=document.getElementById('dy'), ol=document.getElementById('ol'), rt=document.getElementById('rt');
  try{var c=JSON.parse(localStorage.getItem(K)||'{}'); dx.value=(c.dx===undefined?-7:c.dx); dy.value=(c.dy===undefined?-4:c.dy); rt.value=c.rot||'0';}catch(e){}
  function apply(){
    root.style.setProperty('--dx',(parseFloat(dx.value)||0)+'mm');
    root.style.setProperty('--dy',(parseFloat(dy.value)||0)+'mm');
    var W=225,H=209,R=rt.value,sw=(R==='90'||R==='270'),pw=sw?H:W,ph=sw?W:H;
    root.style.setProperty('--pw',pw+'mm'); root.style.setProperty('--ph',ph+'mm');
    root.style.setProperty('--rot', R==='90'?'translate('+H+'mm,0) rotate(90deg)': R==='270'?'translate(0,'+W+'mm) rotate(-90deg)': R==='180'?'translate('+W+'mm,'+H+'mm) rotate(180deg)':'translate(0,0)');
    document.getElementById('pgsz').textContent='@page{size:'+pw+'mm '+ph+'mm;margin:0}';
    document.body.classList.toggle('ol',ol.checked);
    try{localStorage.setItem(K,JSON.stringify({dx:parseFloat(dx.value)||0,dy:parseFloat(dy.value)||0,rot:rt.value}));}catch(e){}
  }
  dx.oninput=dy.oninput=ol.onchange=rt.onchange=apply;
  document.getElementById('rs').onclick=function(){dx.value=-7;dy.value=-4;rt.value='0';apply();};
  apply();
})();
<\/script>
</body></html>`;
}
function V1() {
  const e = (o) => Number(o).toFixed(2) + "mm", t = (o, a, i, l, d = "") => `<div style="left:${e(se.tx + o)};top:${e(se.ty + a)};width:${e(i)};height:${e(l)}">${d}</div>`, n = se.cols;
  let s = t(se.ms.x, se.ms.y, se.ms.w, se.ms.h, "M/s") + t(se.poVal.x - 22, -34.5, 22 + se.poVal.w, 11, "P.O No.") + t(se.poVal.x - 22, -23.5, 22 + se.poVal.w, 16, "DATE") + t(0, 0, 197, se.hdrH + se.bodyH, "") + t(se.total.x, 81, se.total.w, 15.5, "Total") + t(se.words.x, se.words.y - 0.2, se.words.w, 0.1) + t(se.special.x, se.special.y - 0.2, se.special.w, 0.1) + t(se.payment.x, se.payment.y - 0.2, se.payment.w, 0.1) + t(se.prepared.x, se.prepared.y - 0.2, 62, 0.1);
  for (const o of Object.keys(n)) s += t(n[o][0], 0, n[o][1] - n[o][0], se.hdrH + se.bodyH, o);
  return s;
}
function z1(e, t) {
  const n = (i) => String(i || "").split(`
`).map((l) => l.trim()).filter(Boolean), s = [e.customer_name || e.customer || "", ...n(e.shipping_address)].filter(Boolean), o = (e.items || []).map((i, l) => `
    <tr>
      <td class="c">${l + 1}</td>
      <td>${k(i.item_name || i.item_code)}${i.description && i.description !== i.item_name ? `<div class="ds">${k(i.description)}</div>` : ""}</td>
      <td class="c">${Number(i.qty || 0)} ${k(i.uom || "")}</td>
      <td>${k(i.intended_use || "")}</td>
    </tr>`).join(""), a = (i, l) => `<div class="bk"><div class="bt">${i}</div>${l.map(([d, u]) => `<div class="ln"><span class="lb">${d}</span><span class="dl">${k(u || "")}</span></div>`).join("")}</div>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  @page{size:A4 landscape;margin:8mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Times New Roman",Georgia,serif;color:#111;background:#fff;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:1040px;margin:0 auto;padding:18px 24px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:210px;min-height:120px;display:flex;align-items:flex-start}
  .lg img{max-height:135px;max-width:200px;width:auto;height:auto;object-fit:contain}
  .ttl{flex:1;text-align:center;font-size:24px;font-weight:700;letter-spacing:.03em;padding-top:56px}
  .co{width:420px;text-align:left}
  .co .n{font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;color:#d32f2f;line-height:1.05;letter-spacing:-.01em}
  .co .a{font-size:11px;line-height:1.4;margin-top:4px}
  .mid{display:flex;justify-content:space-between;gap:24px;margin-top:6px}
  .ms{flex:1;max-width:560px;min-height:110px;border:1.6px solid #111;border-radius:14px;padding:8px 12px;line-height:1.45}
  .ms b{font-size:14px}
  .pn{width:470px;border:1.6px solid #111;border-radius:16px;overflow:hidden;align-self:flex-start}
  .pn .r{display:flex;min-height:44px}
  .pn .r+.r{border-top:1.6px solid #111}
  .pn .k{width:36%;border-right:1.6px solid #111;padding:10px 14px;font-weight:700;font-size:14px}
  .pn .v{flex:1;padding:10px 14px;font-size:14px}
  .sup{font-size:13.5px;margin:12px 0 4px}
  table.it{width:100%;border-collapse:collapse;table-layout:fixed;border:1.6px solid #111}
  table.it th{border:1.6px solid #111;padding:6px;font-size:13px;font-weight:700;text-align:center}
  table.it td{border-left:1.6px solid #111;border-right:1.6px solid #111;padding:4px 7px;vertical-align:top;font-size:12.5px;height:26px}
  table.it .c{text-align:center}
  table.it .ds{font-size:11px;color:#444}
  table.it tfoot td{border:1.6px solid #111;height:1px;padding:0}
  .w1{width:8%}.w2{width:48%}.w3{width:10%}.w4{width:34%}
  .sig{display:flex;gap:36px;margin-top:22px}
  .bk{flex:1}
  .bt{font-weight:700;font-size:14.5px;margin-bottom:8px}
  .ln{display:flex;gap:6px;align-items:baseline;margin-bottom:9px;font-size:13.5px}
  .ln .lb{white-space:nowrap}
  .ln .dl{flex:1;border-bottom:1.5px dotted #111;min-height:16px;padding:0 4px;font-size:12.5px}
  .cp{position:absolute;top:6px;right:24px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet" style="position:relative">
  <span class="cp print-copy-text">${k(t.copyText || "")}</span>
  <div class="mid">
    <div class="ms">${s.length ? `<b>${k(s[0])}</b>${s.slice(1).map((i) => `<br/>${k(i)}`).join("")}` : ""}</div>
    <div class="pn">
      <div class="r"><div class="k">D.N No.</div><div class="v">${k(e.name || "")}</div></div>
      <div class="r"><div class="k">DATE</div><div class="v">${k(mt(e.posting_date || ""))}</div></div>
    </div>
  </div>
  <div class="sup">PLEASE RECEIVE THE FOLLOWING GOODS IN GOOD CONDITION &amp; ORDER:-</div>
  <table class="it">
    <thead><tr><th class="w1">Sr. No</th><th class="w2">Item Description</th><th class="w3">Qty</th><th class="w4">Intended Use</th></tr></thead>
    <tbody>${o}</tbody>
    <tfoot><tr><td colspan="4"></td></tr></tfoot>
  </table>
  <div class="sig">
    ${a("Prepared By:", [["Name:", e.prepared_by_name || e.owner_name || ""], ["I.D. No.", ""], ["Time:", e.posting_time ? String(e.posting_time).slice(0, 5) : ""], ["Signature:", ""]])}
    ${a("Delivered By:", [["Name:", e.driver_name], ["I.D. No.", e.driver_id], ["Truck No.", e.truck_no || e.vehicle_no], ["Signature:", ""]])}
    ${a("Received By:", [["Name:", e.received_by_name], ["I.D. No.", e.received_by_id], ["Time:", ""], ["Signature:", ""]])}
  </div>
</div></body></html>`;
}
const he = {
  pageW: 225,
  pageH: 209,
  to: { x: 10, y: 41, w: 83, h: 30 },
  // address box (83 x 30)
  dn: { x: 151.4, w: 56, yNo: 48.5, yDate: 63.5 },
  // D.N No. / DATE value cells (y = vertical centre)
  tbl: { x: 10, hdrBottom: 87.7, bottom: 162.6 },
  // table left edge, header bottom line, table bottom line
  cols: { sr: [0, 14], desc: [14, 110], qty: [110, 128], use: [128, 196] },
  // 14 + 96 + 18 + 68 mm, from the table's left edge
  lineH: 4.8,
  descChars: 46,
  // characters that fit one line of the 96 mm Description column
  // signature lines: y = the dotted line, x = where each line starts, end = right end of the block (lines are ~50 mm)
  sigY: { name: 181, id: 188.7, third: 196.3 },
  prepared: { end: 74.6, name: 24.6, id: 29.5, time: 23.4 },
  delivered: { end: 142.9, name: 92.1, id: 98.9, truck: 102.5 },
  received: { end: 208, name: 158.7, id: 164.5, time: 159 }
};
function F1(e, t) {
  const n = (b) => String(b || "").split(`
`).map((R) => R.trim()).filter(Boolean), s = (b) => Number(b).toFixed(2) + "mm", o = (b) => String(+Number(b || 0).toFixed(3)), a = [e.customer_name || e.customer || "", ...n(e.shipping_address)].filter(Boolean).slice(0, 6), i = e.posting_date || e.transaction_date || "", l = e.prepared_by_name || e.owner_name || e.owner || "", d = e.posting_time ? String(e.posting_time).slice(0, 5) : "", u = e.truck_no || e.vehicle_no || "", c = (b, R) => {
    const A = [];
    let D = "";
    for (const N of String(b || "").split(/\s+/).filter(Boolean))
      for (D ? (D + " " + N).length <= R ? D += " " + N : (A.push(D), D = N) : D = N; D.length > R; )
        A.push(D.slice(0, R)), D = D.slice(R);
    return D && A.push(D), A.length > 3 && (A.length = 3, A[2] = A[2].slice(0, Math.max(0, R - 1)) + "…"), A.length ? A : [""];
  }, p = (b, R, A = 9.5, D = 5.5, N = 0.52) => {
    const M = String(b || "").length * N * 0.3528;
    return Math.max(D, Math.min(A, M ? R / M : A)).toFixed(2) + "pt";
  }, m = (b, R, A, D, N, M = "") => `<div class="t" style="left:${s(b)};top:${s(R)};width:${s(A)};height:${s(D)};line-height:${s(D)};${M}">${N}</div>`, g = (b, R, A, D) => b ? m(R, D - 4.4, A - R, 4.4, k(b), `font-size:${p(b, A - R)}`) : "", _ = he.tbl, $ = he.cols, I = Math.floor((_.bottom - _.hdrBottom - 1) / he.lineH), f = (e.items || []).map((b, R) => {
    const A = (b.item_name || b.item_code || "") + (b.description && b.description !== b.item_name ? " - " + String(b.description).replace(/\s+/g, " ") : ""), D = o(b.qty), N = String(b.uom || b.stock_uom || "Nos").trim(), M = $.qty[1] - $.qty[0] - 1.5, H = `${D} - ${N}`, j = H.length * 0.56 * 9.5 * 0.3528 * (6 / 9.5) <= M ? [H] : [`${D} -`, N], te = c(A, he.descChars);
    return { it: b, no: R + 1, d: te, q: j, n: Math.max(te.length, j.length) };
  }), h = [[]];
  let O = 0;
  for (const b of f)
    O + b.n > I && O > 0 && (h.push([]), O = 0), h[h.length - 1].push(b), O += b.n;
  const L = h.map((b, R) => {
    let A = _.hdrBottom + 0.5, D = "";
    for (const { it: Z, no: fe, d: Ce, q: be, n: xe } of b) {
      const Oe = he.lineH;
      D += m(_.x + $.sr[0] + 8.6, A, 5.4, Oe, fe, "text-align:center"), Ce.forEach((qe, We) => {
        D += m(_.x + $.desc[0] + 1.5, A + We * Oe, $.desc[1] - $.desc[0] - 2.5, Oe, k(qe));
      }), be.forEach((qe, We) => {
        D += m(_.x + $.qty[0] + 0.5, A + We * Oe, $.qty[1] - $.qty[0] - 1, Oe, k(qe), `text-align:center;font-size:${p(qe, $.qty[1] - $.qty[0] - 1.5, 9.5, 5.5, 0.56)}`);
      }), A += xe * Oe;
    }
    const N = h.length > 1 ? ` <span class="pg-no">(${R + 1}/${h.length})</span>` : "", M = he.sigY, H = he.prepared, j = he.delivered, te = he.received;
    return `<div class="pg"><div class="shift">
      <div class="outline">${U1()}</div>
      ${a.length ? m(
      he.to.x + 12,
      he.to.y + 3.5,
      he.to.w - 19,
      he.to.h - 4,
      `<b>${k(a[0])}</b>${a.slice(1).map((Z) => `<br/>${k(Z)}`).join("")}`,
      "line-height:4.5mm;height:22.5mm;white-space:normal;overflow-wrap:anywhere"
    ) : ""}
      ${m(he.dn.x + 2, he.dn.yNo - 2.8, he.dn.w - 3, 5.6, `<b>${k(e.name || "")}</b>${N}`, `font-size:${p((e.name || "") + (h.length > 1 ? " (1/1)" : ""), he.dn.w - 3, 9.5, 6, 0.58)}`)}
      ${m(he.dn.x + 2, he.dn.yDate - 2.8, he.dn.w - 3, 5.6, k(mt(i)))}
      ${D}
      ${g(l, H.name, H.end, M.name)}${g(d, H.time, H.end, M.third)}
      ${g(e.driver_name, j.name, j.end, M.name)}${g(e.driver_id, j.id, j.end, M.id)}${g(u, j.truck, j.end, M.third)}
      ${g(e.received_by_name, te.name, te.end, M.name)}${g(e.received_by_id, te.id, te.end, M.id)}
    </div></div>`;
  }).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)} (pre-printed sheet)</title>
<style>
  @page{size:${he.pageW}mm ${he.pageH}mm;margin:0}
  *{box-sizing:border-box;margin:0;padding:0}
  :root{--dx:0mm;--dy:0mm}
  html,body{font-family:Arial,Helvetica,sans-serif;color:#000;font-size:9.5pt;background:#e5e7eb}
  .toolbar{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #e5e7eb;padding:10px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:12.5px}
  .toolbar b{font-size:11.5px;letter-spacing:.04em}
  .toolbar label{display:flex;align-items:center;gap:5px}
  .toolbar input[type=number]{width:70px;padding:4px 6px;border:1px solid #cbd5e1;border-radius:5px;font:inherit}
  .toolbar button{font:inherit;padding:6px 12px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;cursor:pointer}
  .toolbar .go{margin-left:auto;background:#1a6ef7;border-color:#1a6ef7;color:#fff;font-weight:700}
  .toolbar .hint{flex-basis:100%;font-size:11.5px;color:#64748b}
  .pg{position:relative;width:${he.pageW}mm;height:${he.pageH}mm;margin:14px auto;background:#fff;box-shadow:0 2px 14px rgba(0,0,0,.18);overflow:hidden;page-break-after:always;break-after:page}
  .pg:last-child{page-break-after:auto;break-after:auto}
  .shift{position:absolute;left:var(--dx);top:var(--dy);width:100%;height:100%;transform-origin:0 0;transform:translateY(-1.8mm) scaleY(.943)}
  .t{position:absolute;white-space:nowrap;overflow:hidden;text-overflow:clip}
  .pg-no{font-size:7.5pt;font-weight:400}
  .outline{display:none}
  body.ol .outline{display:block}
  .outline div{position:absolute;border:1px dashed #777;color:#777;font-size:6pt;line-height:1}
  @media print{
    html,body{background:#fff}
    .toolbar{display:none!important}
    .pg{margin:0;box-shadow:none}
  }
</style></head><body>
<div class="toolbar">
  <b>PRINT ON PRE-PRINTED DELIVERY NOTE SHEET</b>
  <label>X nudge (mm) <input id="dx" type="number" step="0.5" value="0"/></label>
  <label>Y nudge (mm) <input id="dy" type="number" step="0.5" value="0"/></label>
  <label><input id="ol" type="checkbox"/> Print form outline (for a test on plain paper)</label>
  <button id="rs" type="button">Reset</button>
  <button class="go" type="button" onclick="window.print()">Print</button>
  <div class="hint">Printer: paper 225 x 209 mm, margins None, scale 100%. Positive X moves the text right, positive Y moves it down. The nudge is remembered on this computer.</div>
</div>
${L}
<script>
(function(){
  var K='bv_dn_pp_calib', root=document.documentElement;
  var dx=document.getElementById('dx'), dy=document.getElementById('dy'), ol=document.getElementById('ol');
  try{var c=JSON.parse(localStorage.getItem(K)||'{}'); dx.value=c.dx||0; dy.value=c.dy||0;}catch(e){}
  function apply(){
    root.style.setProperty('--dx',(parseFloat(dx.value)||0)+'mm');
    root.style.setProperty('--dy',(parseFloat(dy.value)||0)+'mm');
    document.body.classList.toggle('ol',ol.checked);
    try{localStorage.setItem(K,JSON.stringify({dx:parseFloat(dx.value)||0,dy:parseFloat(dy.value)||0}));}catch(e){}
  }
  dx.oninput=dy.oninput=ol.onchange=apply;
  document.getElementById('rs').onclick=function(){dx.value=0;dy.value=0;apply();};
  apply();
})();
<\/script>
</body></html>`;
}
function U1() {
  const e = (i) => Number(i).toFixed(2) + "mm", t = (i, l, d, u, c = "") => `<div style="left:${e(i)};top:${e(l)};width:${e(d)};height:${e(u)}">${c}</div>`, n = he.tbl, s = he.cols, o = n.bottom - (n.hdrBottom - 6.2);
  let a = t(he.to.x, he.to.y, he.to.w, he.to.h, "To") + t(he.dn.x - 26, he.to.y, 26 + he.dn.w, 15, "D.N No.") + t(he.dn.x - 26, he.to.y + 15, 26 + he.dn.w, 15, "DATE") + t(n.x, n.hdrBottom - 6.2, 198, o, "");
  for (const i of Object.keys(s)) a += t(n.x + s[i][0], n.hdrBottom - 6.2, s[i][1] - s[i][0], o, i);
  for (const [i, l] of [[he.prepared, "prepared"], [he.delivered, "delivered"], [he.received, "received"]])
    for (const [d, u] of [["name", he.sigY.name], ["id", he.sigY.id], [i.time !== void 0 ? "time" : "truck", he.sigY.third]])
      a += t(i[d], u - 0.2, i.end - i[d], 0.1, "");
  return a;
}
const K1 = 0;
function G1(e, t) {
  const n = e.items || [], s = (d) => {
    const u = Number(d.required_qty ?? d.qty ?? 0);
    return `${Number.isInteger(u) ? u : u.toFixed(3).replace(/0+$/, "")}${d.uom ? " " + d.uom : ""}`;
  }, o = n.map((d, u) => `
    <tr><td class="c">${u + 1}</td><td>${k(d.item_name || d.item_code || "")}</td><td>${k(d.intended_use || "")}</td><td class="c">${k(s(d))}</td></tr>`).join(""), a = Array.from({ length: Math.max(0, K1 - n.length) }).map(() => '<tr><td class="c">&nbsp;</td><td></td><td></td><td></td></tr>').join(""), i = mt(String(e.creation || e.posting_date || "").slice(0, 10)), l = mt(e.posting_date || "");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  @page{size:A4 portrait;margin:10mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Times New Roman",Georgia,serif;color:#111;background:#fff;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:760px;margin:0 auto;padding:10px 6px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:190px;min-height:110px;display:flex;align-items:flex-start}
  .lg img{max-height:125px;max-width:185px;width:auto;height:auto;object-fit:contain}
  .co{width:400px;text-align:right}
  .co .n{font-family:Arial,Helvetica,sans-serif;font-size:32px;font-weight:800;color:#111;line-height:1.05;letter-spacing:-.01em}
  .co .a{font-size:10.5px;line-height:1.4;margin-top:4px}
  .nr{display:flex;justify-content:flex-end;align-items:baseline;gap:6px;margin-top:10px}
  .nr b{font-size:13px}.nr .no{font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#7a1a8a;letter-spacing:.04em}
  .ttl{display:flex;justify-content:space-between;align-items:flex-end;margin-top:18px}
  .ttl h1{font-size:25px;font-weight:700;letter-spacing:.02em}
  .dt{display:flex;align-items:baseline;gap:6px;width:250px;font-weight:700;font-size:13px}
  .dt span.v{flex:1;border-bottom:1.5px solid #111;font-weight:400;padding:0 4px;min-height:18px;font-size:13px}
  .pj{display:flex;align-items:baseline;gap:6px;margin:16px 0 8px;font-weight:700;font-size:13px}
  .pj span.v{flex:1;border-bottom:1.5px solid #111;font-weight:400;padding:0 4px;min-height:18px;font-size:13px}
  table.it{width:100%;border-collapse:collapse;table-layout:fixed;border:1.6px solid #111}
  table.it th{border:1.6px solid #111;padding:6px;font-size:13px;font-weight:700;text-align:center}
  table.it td{border:1px solid #111;padding:3px 7px;font-size:12.5px;height:27px;vertical-align:middle;overflow:hidden}
  table.it tr{page-break-inside:avoid}
  table.it .c{text-align:center}
  .w1{width:9%}.w2{width:40%}.w3{width:35%}.w4{width:16%}
  .sg{display:flex;border:1.6px solid #111;border-top:0;margin-top:0}
  .sg>div{flex:1;min-height:78px;padding:8px 10px;font-weight:700;font-size:12.5px}
  .sg>div+div{border-left:1.6px solid #111}
  .sg .v{display:block;font-weight:400;font-size:12.5px;margin-top:8px}
  .cp{position:absolute;top:0;right:6px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet" style="position:relative">
  <span class="cp print-copy-text">${k(t.copyText || "")}</span>
  <div class="ttl"><div class="dt" style="width:auto">No.<span class="v" style="border:0;font-size:18px;color:#7a1a8a">${k(e.name || "")}</span></div><div class="dt">Date:<span class="v">${k(i)}</span></div></div>
  <div class="pj">Project:<span class="v">${k(e.project_label || e.project || "")}</span></div>
  <table class="it">
    <thead><tr><th class="w1">S. No.</th><th class="w2">Item</th><th class="w3">Intended Use</th><th class="w4">Qty</th></tr></thead>
    <tbody>${o}${a}</tbody>
  </table>
  <div class="sg">
    <div>Requested By:<span class="v">${k(e.requested_by_name || "")}</span></div>
    <div>Required By:<span class="v">${k(l)}</span></div>
    <div>Approved By:<span class="v">${k(e.approved_by_name || "")}</span></div>
  </div>
</div></body></html>`;
}
function W1(e, t) {
  const n = (_) => so(_), s = (_) => String(_ || "").split(`
`).map(($) => $.trim()).filter(Boolean), o = e.items || [], a = Number(e.po_tax_rate || 0), i = o.map((_) => {
    const $ = Number(_.qty || 0), I = Number(_.rate || 0), f = _.amount != null && _.amount !== "" ? Number(_.amount) : $ * I;
    return { it: _, qty: $, rate: I, amt: f, orig: f * (1 + a / 100) };
  }), l = (_) => i.reduce(($, I) => $ + I[_], 0), d = l("amt"), u = l("qty"), c = l("orig"), p = s(e.supplier_address), m = (_, $) => `<div class="kv"><span class="k">${_}</span><span class="v">${k($ || "")}</span></div>`, g = i.map((_, $) => `
    <tr><td class="c">${$ + 1}</td>
      <td>${k(_.it.item_name || _.it.item_code)}</td>
      <td class="r">${n(_.qty)}</td><td class="c">${k(_.it.uom || "")}</td>
      <td class="r">${n(_.rate)}</td><td class="r b">${n(_.rate)}</td>
      <td class="r b">${n(_.amt)}</td><td class="r">${n(_.orig)}</td></tr>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${k(t.title)} — ${k(e.name)}</title>
<style>
  @page{size:A4 portrait;margin:10mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,Helvetica,sans-serif;color:#111;background:#fff;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:780px;margin:0 auto;padding:16px 20px;position:relative}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:210px}.lg img{max-height:135px;max-width:200px;width:auto;height:auto;object-fit:contain}
  .co{width:420px;padding-top:14px}
  .co .n{font-size:17px;font-weight:700}
  .co .a{font-size:12.5px;line-height:1.5;margin-top:6px}
  .ttl{font-weight:700;font-size:14px;margin:6px 0 8px 330px}
  .info{display:flex;gap:18px;justify-content:space-between}
  .info .l{flex:1}.info .rt{width:46%}
  .sup{font-weight:700;font-size:14px;margin-bottom:6px}
  .kv{display:flex;gap:10px;min-height:26px;align-items:center;border-bottom:1px dotted #bbb}
  .kv .k{width:44%;font-size:12.5px}.kv .v{flex:1;font-weight:700;font-size:12.5px}
  .two{display:flex;gap:18px}.two .kv{flex:1}
  table{width:100%;border-collapse:collapse;border:1.5px solid #111;margin-top:20px;table-layout:fixed}
  th{border-bottom:1.5px solid #111;padding:5px 6px;font-size:11.5px;text-align:right;vertical-align:bottom}
  th.t,td.t{text-align:left}
  td{padding:5px 6px;font-size:11.5px;vertical-align:top}
  td.c,th.c{text-align:center}td.r{text-align:right}td.b{font-weight:700}
  tr.tot td{border-top:1.5px solid #111;font-weight:700;text-align:right}
  .sub td{border-top:1px solid #111;font-size:11px}
  .foot{margin-top:70px;font-size:10px;color:#444;display:flex;justify-content:space-between}
  .cp{position:absolute;top:4px;right:20px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet">
  <span class="cp print-copy-text">${k(t.copyText || "")}</span>
  <div class="info">
    <div class="l">
      <div class="sup">${k(e.supplier_name || e.supplier || "")}</div>
      <div style="min-height:52px;font-size:12.5px;line-height:1.5">${p.map(k).join("<br/>")}</div>
      ${m("Payment term", e.payment_term_label)}
      ${m("Costing Factor", "1.000000")}
    </div>
    <div class="rt">
      ${m("Doc#", e.name)}${m("Doc Date", mt(e.posting_date || ""))}
      ${m("Order#", e.purchase_order)}${m("Order date", e.po_date ? mt(e.po_date) : "")}
      ${m("Currency", "Kenyan Shillings")}${m("Costing Factor with Tax", "1.000000")}
    </div>
  </div>
  <table>
    <thead><tr><th class="c" style="width:7%">S/N</th><th class="t" style="width:33%">Document Product Line Items and Allocated Landed Cost Expenses Line Items for Costing</th>
      <th style="width:16%">Amount</th><th class="c" style="width:14%">Currency</th><th style="width:12%">Currency Rate</th><th style="width:18%">Amount in Home Currency</th></tr></thead>
    <tbody>
      <tr><td class="c">1</td><td class="t">${k(e.name || "")} &nbsp; ${k(mt(e.posting_date || ""))}</td>
        <td class="r b">${n(d)}</td><td class="c">Kenyan Shillings</td><td class="r">1.00</td><td class="r b">${n(d)}</td></tr>
      <tr class="sub"><td></td><td class="t" colspan="5">Goods Received Item Total Amount</td></tr>
      <tr class="tot"><td colspan="5">Total</td><td>${n(d)}</td></tr>
    </tbody>
  </table>
  <table>
    <thead><tr><th class="c" style="width:6%">S/N</th><th class="t" style="width:28%">Document Product Line Items Costed and Expense Line Items</th>
      <th style="width:12%">Quantity</th><th class="c" style="width:7%">UOM</th><th style="width:11%">Unit Price</th><th style="width:11%">Landed Cost</th>
      <th style="width:13%">Total Landed Cost</th><th style="width:12%">Amount Original Currency</th></tr></thead>
    <tbody>${g}
      <tr class="tot"><td></td><td></td><td>${n(u)}</td><td></td><td></td><td></td><td>${n(d)}</td><td>${n(c)}</td></tr>
    </tbody>
  </table>
  <div class="foot"><span>Printed By: ${k(e.prepared_by_name || "")}</span><span>Printed On: ${k(mt((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)))}</span></div>
</div></body></html>`;
}
const P0 = { title: "Goods Received Note", savaGRN: !0 };
async function R0(e) {
  const t = { ...e };
  try {
    if (e != null && e.supplier) {
      const n = await Jt("Supplier", e.supplier);
      if (n && (t.supplier_address = [n.address_line1, n.address_line2, [n.city, n.state].filter(Boolean).join(", "), n.country].filter(Boolean).join(`
`), n.payment_terms)) {
        let s = null;
        try {
          s = await Jt("Payment Terms", n.payment_terms);
        } catch {
        }
        t.payment_term_label = s != null && s.credit_days ? `${s.credit_days} DAYS` : n.payment_terms;
      }
    }
  } catch {
  }
  try {
    if (e != null && e.purchase_order) {
      const n = await Jt("Purchase Order", e.purchase_order);
      if (n) {
        t.po_date = n.transaction_date || "";
        const s = [...new Set((n.taxes || []).map((o) => Number(o.rate || 0)).filter((o) => o > 0))];
        t.po_tax_rate = s.length === 1 ? s[0] : 0;
      }
    }
  } catch {
  }
  return t;
}
const I0 = { title: "MATERIAL REQUISITION", savaMR: !0 };
async function M0(e) {
  const t = { ...e };
  try {
    if (e != null && e.project) {
      const n = await Jt("Project", e.project);
      n && (t.project_label = [n.project_code || n.name, n.project_name].filter(Boolean).join(" — "));
    }
  } catch {
  }
  return t;
}
const Y1 = { title: "DELIVERY NOTE", savaDN: !0 };
function O0(e, t) {
  const n = window.open("", "_blank");
  return n ? (n.document.open(), n.document.write(F1(e, { ...Y1, ...t })), n.document.close(), !0) : !1;
}
const J1 = {
  title: "PURCHASE ORDER",
  partyLabel: "Vendor",
  partyField: "supplier_name",
  po: !0,
  currency: "KES",
  taxIdLabel: "KRA PIN :",
  keepTaxLabel: !0,
  amountWordsLabel: "Total Amount in Words :",
  footerNote: "This is a computer-generated Purchase Order.",
  showQr: !1,
  includeHsn: !1,
  includeDiscount: !1,
  savaPaper: !0
  // render on the Sava Builders pre-printed LPO sheet layout
}, Q1 = { ...J1, savaPreprinted: !0 };
function D0(e, t) {
  const n = window.open("", "_blank");
  return n ? (n.document.open(), n.document.write(Dl(e, { ...Q1, ...t })), n.document.close(), !0) : !1;
}
async function L0(e) {
  const t = { ...e, currency: "KES" };
  try {
    const n = [...new Set(((e == null ? void 0 : e.items) || []).map((s) => s.item_code).filter(Boolean))];
    if (n.length) {
      const s = {};
      await Promise.all(n.map(async (o) => {
        try {
          const a = await Jt("Item", o);
          a != null && a.item_name && (s[o] = a.item_name);
        } catch {
        }
      })), t.items = (e.items || []).map((o) => ({ ...o, print_name: s[o.item_code] || "" }));
    }
  } catch {
  }
  if (!(e != null && e.supplier)) return t;
  try {
    const n = await Jt("Supplier", e.supplier);
    if (n && (t.supplier_gstin = n.tax_id || "", t.contact_mobile = n.mobile_no || n.phone || "", t.supplier_address = [
      n.address_line1,
      n.address_line2,
      [n.city, n.state, n.pincode].filter(Boolean).join(", "),
      n.country
    ].filter(Boolean).join(`
`), n.payment_terms)) {
      let s = null;
      try {
        s = await Jt("Payment Terms", n.payment_terms);
      } catch {
      }
      t.payment_lines = [
        `Payment Terms: ${n.payment_terms}`,
        s != null && s.credit_days ? `Credit Days: ${s.credit_days}` : "",
        (s == null ? void 0 : s.description) || ""
      ].filter(Boolean);
    }
  } catch {
  }
  return t;
}
function Z1() {
  function e(c) {
    return Ca(c);
  }
  function t() {
    return Ca(ie.company);
  }
  function n(c) {
    ie.template = c;
  }
  function s(c) {
    ie.brandColor = c;
  }
  function o(c) {
    ie.logo = c;
  }
  function a(c, p) {
    const m = {
      title: "INVOICE",
      partyLabel: "Bill To",
      partyField: "customer_name",
      companyName: "",
      includeHsn: !0,
      includeDiscount: !0,
      ...p
    };
    return m.savaMR ? G1(c, m) : m.savaGRN ? W1(c, m) : m.savaDN ? z1(c, m) : m.po && m.savaPreprinted ? Dl(c, m) : m.po && m.savaPaper ? H1(c, m) : ie.template === "modern" ? B1(c, m) : ie.template === "minimal" ? j1(c, m) : q1(c, m);
  }
  function i(c, p) {
    const m = a(c, p), g = !!(p && (p.savaMR || p.savaGRN || p.savaDN || p.po && p.savaPaper)), _ = m.replace(/"/g, "&quot;"), $ = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Print — ${(c == null ? void 0 : c.name) || ""}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,sans-serif;background:#e5e7eb;min-height:100vh}
  .toolbar{position:sticky;top:0;z-index:10;background:#fff;padding:10px 18px;
    border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .tb-lbl{font-size:11.5px;font-weight:700;color:#374151;letter-spacing:.04em;margin-right:4px}
  .tbtn{font:inherit;font-size:12px;padding:6px 14px;border-radius:6px;border:1px solid #e5e7eb;
    background:#fff;color:#374151;cursor:pointer;font-weight:500;transition:all .15s}
  .tbtn.active{background:#1a6ef7;color:#fff;border-color:#1a6ef7}
  .tbtn:hover:not(.active){background:#f9fafb;border-color:#cbd5e1}
  .sep{width:1px;height:22px;background:#e5e7eb;margin:0 4px}
  .print-btn{margin-left:auto;background:#1a6ef7;color:#fff;border:none;padding:7px 16px;
    border-radius:7px;font-weight:700;cursor:pointer;font:inherit;font-size:12.5px;
    display:flex;align-items:center;gap:6px;transition:background .15s}
  .print-btn:hover{background:#1558d0}
  .doc-wrap{max-width:900px;margin:20px auto;background:#fff;
    box-shadow:0 4px 24px rgba(0,0,0,.1);border-radius:4px;overflow:hidden}
  iframe{border:none;width:100%;min-height:1100px;display:block}
  @media print{.toolbar{display:none!important}.doc-wrap{box-shadow:none;margin:0;max-width:none;border-radius:0}}
</style></head><body>
<div class="toolbar">
  <span class="tb-lbl">PRINT PREVIEW</span>
  <div class="sep"></div>
  <button class="tbtn ${ie.template === "classic" ? "active" : ""}" data-t="classic">Classic</button>
  ${g ? "" : `<button class="tbtn ${ie.template === "modern" ? "active" : ""}" data-t="modern">Modern</button>
  <button class="tbtn ${ie.template === "minimal" ? "active" : ""}" data-t="minimal">Minimal</button>`}
  <div class="sep"></div>
  <select class="tbtn" id="copy-sel" style="padding-right:8px;appearance:auto;outline:none">
    <option value="" ${p.copyText ? "" : "selected"}>Original Copy</option>
    <option value="DUPLICATE COPY" ${p.copyText === "DUPLICATE COPY" ? "selected" : ""}>Duplicate Copy</option>
    <option value="TRIPLICATE COPY" ${p.copyText === "TRIPLICATE COPY" ? "selected" : ""}>Triplicate Copy</option>
    <option value="EXTRA COPY" ${p.copyText === "EXTRA COPY" ? "selected" : ""}>Extra Copy</option>
  </select>
  <button class="print-btn" onclick="window.print()">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
    Print
  </button>
</div>
<div class="doc-wrap"><iframe id="frm" srcdoc="${_}"></iframe></div>
<script>
  document.getElementById('copy-sel').onchange = (e) => {
    try {
      const txt = e.target.value;
      const f = document.getElementById('frm');
      const el = f.contentDocument.querySelector('.print-copy-text');
      if (el) el.textContent = txt;
    } catch {}
  };
  document.querySelectorAll('button.tbtn').forEach(b => b.onclick = () => {
    document.querySelectorAll('button.tbtn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({
        kind: 'switch-template',
        template: b.dataset.t,
        doc: ${JSON.stringify(c || {})},
        config: Object.assign(${JSON.stringify(p || {})}, { copyText: document.getElementById('copy-sel').value })
      }, '*');
    }
  });
  // Auto-resize iframe to content height
  // Wait for iframe and all images (including QR) to load
const frm = document.getElementById('frm');

frm.onload = () => {
  try {
    const doc = frm.contentDocument;

    const images = Array.from(doc.images || []);

    Promise.all(
      images.map(img => {
        if (img.complete) {
          return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
        }

        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => {
      const h = doc.documentElement.scrollHeight;
      if (h > 400) frm.style.minHeight = h + 'px';
    });
  } catch {}
};
<\/script>
</body></html>`, I = window.open("", "_blank");
    I && (I.document.open(), I.document.write($), I.document.close());
  }
  typeof window < "u" && !window.__bvLivePreviewListener && (window.__bvLivePreviewListener = !0, window.addEventListener("message", (c) => {
    const p = c.data || {};
    p.kind === "switch-template" && p.template && (n(p.template), p.doc && p.config && i(p.doc, p.config));
  }));
  const l = _e({ get: () => ie.template, set: n }), d = _e({ get: () => ie.brandColor, set: s }), u = _e({ get: () => ie.logo, set: o });
  return { state: ie, template: l, brandColor: d, logo: u, setCompany: e, refreshBranding: t, renderDocument: a, printDoc: i };
}
const X1 = { class: "emd-dialog" }, eg = { class: "emd-header" }, tg = { class: "emd-title" }, ng = ["disabled"], sg = { class: "emd-body" }, og = {
  key: 0,
  class: "emd-loading"
}, ig = { class: "emd-field" }, ag = { class: "emd-field" }, rg = { class: "emd-field" }, lg = { class: "emd-field" }, cg = { class: "emd-lbl-row" }, dg = ["disabled"], ug = { class: "emd-footer" }, pg = ["disabled"], fg = ["disabled"], mg = {
  __name: "EmailDialog",
  setup(e) {
    const { state: t, complete: n } = D1(), { toast: s } = vn(), { setCompany: o, renderDocument: a } = Z1(), i = /* @__PURE__ */ pe(!1), l = /* @__PURE__ */ pe(!1), d = /* @__PURE__ */ pe(!1), u = /* @__PURE__ */ pe(null), c = /* @__PURE__ */ ze({ to: "", cc: "", subject: "", body: "" });
    ct(() => t.open, async (_) => {
      if (_) {
        Object.assign(c, { to: "", cc: "", subject: "", body: "" }), i.value = !0;
        try {
          const $ = { [t.paramKey]: t.name }, I = await Et(t.getDefaultsEndpoint, $);
          I && (c.to = I.to || "", c.subject = I.subject || "", c.body = I.body || "");
        } catch {
          s("Failed to load email defaults", "error");
        }
        i.value = !1, await Yt(), u.value && (u.value.innerHTML = c.body);
      }
    });
    async function p() {
      if (!(!t.enhanceEndpoint || !c.body)) {
        d.value = !0;
        try {
          const _ = await tt(t.enhanceEndpoint, {
            subject: c.subject,
            body: c.body,
            [t.paramKey]: t.name
          });
          _ != null && _.subject && (c.subject = _.subject), _ != null && _.body && (c.body = _.body, u.value && (u.value.innerHTML = _.body)), s("Enhanced", "success");
        } catch (_) {
          s("Enhance failed: " + (_.message || ""), "error");
        }
        d.value = !1;
      }
    }
    async function m() {
      if (!c.to) {
        s("Recipient is required", "error");
        return;
      }
      l.value = !0;
      try {
        const _ = {
          [t.paramKey]: t.name,
          to: c.to,
          subject: c.subject,
          body: c.body,
          cc: c.cc || ""
        };
        if (t.printConfig)
          try {
            let $ = await Jt(t.doctype, t.name);
            t.printConfig.prepareDoc && ($ = await t.printConfig.prepareDoc($)), await o(($ == null ? void 0 : $.company) || ""), _.pdf_html = a($, {
              ...t.printConfig,
              companyName: ($ == null ? void 0 : $.company) || ""
            });
          } catch {
          }
        await tt(t.sendEndpoint, _), s("Email sent", "success"), n(!0);
      } catch (_) {
        s("Send failed: " + (_.message || ""), "error");
      }
      l.value = !1;
    }
    function g() {
      l.value || n(!1);
    }
    return (_, $) => (w(), st(Lt, { to: "body" }, [
      C(t).open ? (w(), S("div", {
        key: 0,
        class: "emd-backdrop",
        onClick: Fe(g, ["self"])
      }, [
        r("div", X1, [
          r("div", eg, [
            r("span", tg, "Send " + T(C(t).docLabel), 1),
            r("button", {
              class: "emd-close",
              onClick: g,
              disabled: l.value
            }, "✕", 8, ng)
          ]),
          r("div", sg, [
            i.value ? (w(), S("div", og, "Loading email defaults…")) : (w(), S(ee, { key: 1 }, [
              r("div", ig, [
                $[4] || ($[4] = r("label", { class: "emd-lbl" }, [
                  ye("To "),
                  r("span", { class: "emd-req" }, "*")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": $[0] || ($[0] = (I) => c.to = I),
                  type: "email",
                  class: "emd-input",
                  placeholder: "customer@example.com"
                }, null, 512), [
                  [ge, c.to]
                ])
              ]),
              r("div", ag, [
                $[5] || ($[5] = r("label", { class: "emd-lbl" }, "CC", -1)),
                oe(r("input", {
                  "onUpdate:modelValue": $[1] || ($[1] = (I) => c.cc = I),
                  type: "email",
                  class: "emd-input",
                  placeholder: "cc@example.com (comma-separated)"
                }, null, 512), [
                  [ge, c.cc]
                ])
              ]),
              r("div", rg, [
                $[6] || ($[6] = r("label", { class: "emd-lbl" }, [
                  ye("Subject "),
                  r("span", { class: "emd-req" }, "*")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": $[2] || ($[2] = (I) => c.subject = I),
                  class: "emd-input"
                }, null, 512), [
                  [ge, c.subject]
                ])
              ]),
              r("div", lg, [
                r("div", cg, [
                  $[7] || ($[7] = r("label", { class: "emd-lbl" }, "Message", -1)),
                  C(t).enhanceEndpoint ? (w(), S("button", {
                    key: 0,
                    class: "emd-enhance",
                    disabled: d.value || !c.body,
                    onClick: p,
                    title: "AI rewrite"
                  }, "✨ " + T(d.value ? "Enhancing…" : "AI Enhance"), 9, dg)) : G("", !0)
                ]),
                r("div", {
                  ref_key: "bodyRef",
                  ref: u,
                  class: "emd-rich",
                  contenteditable: "true",
                  onInput: $[3] || ($[3] = (I) => c.body = I.target.innerHTML)
                }, null, 544)
              ]),
              $[8] || ($[8] = r("div", { class: "emd-note" }, "📎 The PDF will be attached automatically.", -1))
            ], 64))
          ]),
          r("div", ug, [
            r("button", {
              class: "emd-btn emd-btn-ghost",
              onClick: g,
              disabled: l.value
            }, "Cancel", 8, pg),
            r("button", {
              class: "emd-btn emd-btn-primary",
              disabled: l.value || i.value || !c.to || !c.subject,
              onClick: m
            }, T(l.value ? "Sending…" : "Send Email"), 9, fg)
          ])
        ])
      ])) : G("", !0)
    ]));
  }
}, hg = /* @__PURE__ */ Fn(mg, [["__scopeId", "data-v-fd4655b6"]]), Ll = {
  open: !1,
  multi: !1,
  direction: "receive",
  doctype: "",
  name: "",
  party: "",
  partyLabel: "",
  balance: 0,
  invoices: null,
  // pre-fetched invoice list, multi mode only
  invoicesEndpoint: "",
  // used to fetch invoices if `invoices` not passed
  getDefaultsEndpoint: "",
  sendEndpoint: "",
  paramKey: "name",
  resolve: null
}, an = /* @__PURE__ */ ze({ ...Ll });
function gg() {
  function e(s) {
    return new Promise((o) => {
      Object.assign(an, { ...Ll, ...s, open: !0, resolve: o });
    });
  }
  function t(s) {
    an.open = !1;
    const o = an.resolve;
    an.resolve = null, o == null || o(s);
  }
  function n() {
    an.open = !1;
    const s = an.resolve;
    an.resolve = null, s == null || s(null);
  }
  return { state: an, openPayment: e, complete: t, cancel: n };
}
const vg = { class: "pmd-dialog" }, yg = { class: "pmd-header" }, bg = { class: "pmd-title" }, xg = ["disabled"], _g = { class: "pmd-party" }, wg = { class: "pmd-avatar" }, kg = { class: "pmd-party-info" }, $g = { class: "pmd-party-name" }, Sg = { class: "pmd-balance" }, Cg = { class: "pmd-body" }, Ag = {
  key: 0,
  class: "pmd-loading"
}, Eg = {
  key: 1,
  class: "pmd-empty"
}, Ng = { class: "pmd-grid" }, Tg = { class: "pmd-field" }, Pg = { class: "pmd-field" }, Rg = { class: "pmd-field" }, Ig = { class: "pmd-field" }, Mg = { class: "pmd-field pmd-full" }, Og = { class: "pmd-lbl" }, Dg = { class: "pmd-hint" }, Lg = ["value"], qg = {
  key: 0,
  class: "pmd-warn"
}, Bg = { class: "pmd-field" }, jg = { class: "pmd-field pmd-full" }, Hg = { class: "pmd-invoices-head" }, Vg = { class: "pmd-lbl" }, zg = ["disabled"], Fg = { class: "pmd-table" }, Ug = { class: "pmd-row pmd-row-head" }, Kg = { class: "pmd-col pmd-col-inv" }, Gg = { class: "pmd-col pmd-col-check" }, Wg = ["onUpdate:modelValue", "onChange"], Yg = { class: "pmd-col pmd-col-inv" }, Jg = { class: "pmd-col pmd-col-due" }, Qg = { class: "pmd-col pmd-col-amt" }, Zg = { class: "pmd-col pmd-col-amt" }, Xg = ["disabled", "onUpdate:modelValue", "onInput"], ev = { class: "pmd-summary" }, tv = { key: 0 }, nv = {
  key: 0,
  class: "pmd-after"
}, sv = { class: "pmd-red" }, ov = {
  key: 2,
  class: "pmd-after"
}, iv = {
  key: 1,
  class: "pmd-warn"
}, av = { class: "pmd-footer" }, rv = ["disabled"], lv = ["disabled", "title"], cv = {
  __name: "PaymentDialog",
  setup(e) {
    const { state: t, complete: n, cancel: s } = gg(), { toast: o } = vn(), a = /* @__PURE__ */ pe(!1), i = /* @__PURE__ */ pe(!1), l = /* @__PURE__ */ pe([]), d = /* @__PURE__ */ pe([]), u = /* @__PURE__ */ ze({ amount: 0, date: "", mode: "Cash", ref: "", bank: "", charges: 0, notes: "" }), c = _e(() => u.mode === "Cash"), p = _e(
      () => d.value.filter((N) => N.account_type === (c.value ? "Cash" : "Bank"))
    ), m = _e(() => t.direction === "pay" ? "Paid From" : c.value ? "Received Into" : "Deposit To"), g = _e(
      () => l.value.reduce((N, M) => N + (Number(M.outstanding_amount) || 0), 0)
    ), _ = _e(
      () => l.value.filter((N) => N.checked).reduce((N, M) => N + (Number(M.allocated) || 0), 0)
    ), $ = _e(() => f((u.amount || 0) - _.value)), I = _e(() => !u.amount || u.amount <= 0 ? !1 : t.multi ? l.value.length > 0 && $.value === 0 : !0);
    function f(N) {
      return Math.round((N + Number.EPSILON) * 100) / 100;
    }
    function h(N) {
      if (!N) return "—";
      try {
        return new Date(N).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      } catch {
        return N;
      }
    }
    ct(() => u.mode, () => {
      var N;
      p.value.some((M) => M.name === u.bank) || (u.bank = ((N = p.value[0]) == null ? void 0 : N.name) || "");
    });
    function O(N) {
      if (!N.checked) {
        N.allocated = 0, u.amount = f(_.value);
        return;
      }
      const M = f((u.amount || 0) - _.value);
      N.allocated = Math.max(0, Math.min(N.outstanding_amount, M || N.outstanding_amount)), u.amount = f(_.value);
    }
    function L(N) {
      N.allocated < 0 && (N.allocated = 0), N.allocated > N.outstanding_amount && (N.allocated = N.outstanding_amount), u.amount = f(_.value);
    }
    function b() {
      let N = f(u.amount || 0);
      for (const M of l.value) {
        if (N <= 0) {
          M.checked = !1, M.allocated = 0;
          continue;
        }
        const H = Math.min(M.outstanding_amount, N);
        M.checked = !0, M.allocated = f(H), N = f(N - H);
      }
    }
    ct(() => t.open, async (N) => {
      var M, H;
      if (N) {
        if (Object.assign(u, {
          amount: t.multi ? 0 : t.balance || 0,
          date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
          mode: "Cash",
          ref: "",
          bank: "",
          charges: 0,
          notes: ""
        }), d.value = [], l.value = [], t.multi) {
          i.value = !0;
          try {
            const j = Array.isArray(t.invoices) && t.invoices.length > 0, te = t.invoices || (t.invoicesEndpoint ? (await Et(t.invoicesEndpoint, { customer: t.party })).invoices || [] : []);
            l.value = te.map((Z) => ({
              ...Z,
              checked: j,
              allocated: j ? f(Number(Z.outstanding_amount) || 0) : 0
            })), j && (u.amount = f(l.value.reduce((Z, fe) => Z + (Number(fe.outstanding_amount) || 0), 0)));
          } catch (j) {
            o("Failed to load invoices: " + (j.message || ""), "error");
          }
          i.value = !1;
        }
        if (t.getDefaultsEndpoint)
          try {
            const j = t.multi ? { [t.paramKey || "invoice_name"]: (M = l.value[0]) == null ? void 0 : M.name } : { [t.paramKey]: t.name }, te = await Et(t.getDefaultsEndpoint, j);
            te != null && te.bank_accounts && (d.value = te.bank_accounts.map(
              (fe) => typeof fe == "string" ? { name: fe, account_type: "Bank" } : fe
            ));
            const Z = c.value ? "Cash" : "Bank";
            u.bank = ((H = d.value.find((fe) => fe.account_type === Z)) == null ? void 0 : H.name) || "";
          } catch (j) {
            o("Failed to load payment accounts: " + (j.message || ""), "error");
          }
      }
    });
    function R(N) {
      return "KES " + Number(N || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    async function A() {
      if (!u.amount || u.amount <= 0) {
        o("Amount must be > 0", "error");
        return;
      }
      if (!u.bank) {
        o(`Select a ${c.value ? "Cash" : "Bank"} account`, "error");
        return;
      }
      const N = d.value.find((H) => H.name === u.bank), M = c.value ? "Cash" : "Bank";
      if (N && N.account_type !== M) {
        o(`Mode is "${u.mode}" but the selected account is a ${N.account_type} account. Please pick a ${M} account.`, "error");
        return;
      }
      if (t.multi && $.value !== 0) {
        o("Total allocated must equal amount received", "error");
        return;
      }
      a.value = !0;
      try {
        let H;
        if (t.multi) {
          const te = l.value.filter((fe) => fe.checked && fe.allocated > 0).map((fe) => ({ invoice: fe.name, allocated_amount: fe.allocated }));
          if (!te.length) {
            o("Select at least one invoice", "error"), a.value = !1;
            return;
          }
          const Z = {
            payment_date: u.date,
            payment_mode: u.mode,
            reference_no: u.ref || "",
            notes: u.notes || "",
            allocations: JSON.stringify(te),
            bank_charges: u.charges || 0,
            save_as_draft: 0
          };
          H = t.direction === "pay" ? { ...Z, supplier: t.party, amount_paid: u.amount, paid_from: u.bank || "" } : { ...Z, customer: t.party, amount_received: u.amount, deposit_to: u.bank || "" };
        } else
          H = {
            [t.paramKey]: t.name,
            amount_received: u.amount,
            amount_paid: u.amount,
            payment_date: u.date,
            payment_mode: u.mode,
            deposit_to: u.bank || "",
            paid_from: u.bank || "",
            bank_charges: u.charges || 0,
            reference_no: u.ref || "",
            notes: u.notes || "",
            save_as_draft: 0
          };
        const j = await tt(t.sendEndpoint, H);
        o(t.direction === "pay" ? "Vendor payment recorded" : "Payment recorded", "success"), n((j == null ? void 0 : j.payment_entry) || (j == null ? void 0 : j.name) || !0);
      } catch (H) {
        o("Failed: " + (H.message || ""), "error");
      }
      a.value = !1;
    }
    function D() {
      a.value || s();
    }
    return (N, M) => (w(), st(Lt, { to: "body" }, [
      C(t).open ? (w(), S("div", {
        key: 0,
        class: "pmd-backdrop",
        onClick: Fe(D, ["self"])
      }, [
        r("div", vg, [
          r("div", yg, [
            r("span", bg, T(C(t).direction === "pay" ? "Pay Vendor" : "Record Payment") + " — " + T(C(t).multi ? C(t).partyLabel || C(t).party : C(t).name), 1),
            r("button", {
              class: "pmd-close",
              onClick: D,
              disabled: a.value
            }, "✕", 8, xg)
          ]),
          r("div", _g, [
            r("div", wg, T((C(t).partyLabel || C(t).party || "?").charAt(0).toUpperCase()), 1),
            r("div", kg, [
              r("div", $g, T(C(t).partyLabel || C(t).party), 1),
              r("div", Sg, [
                ye(T(C(t).multi ? "Total Outstanding" : C(t).direction === "pay" ? "Balance Payable" : "Balance Due") + ": ", 1),
                r("strong", null, T(R(C(t).multi ? g.value : C(t).balance)), 1)
              ])
            ])
          ]),
          r("div", Cg, [
            C(t).multi && i.value ? (w(), S("div", Ag, "Loading outstanding " + T(C(t).direction === "pay" ? "bills" : "invoices") + "…", 1)) : C(t).multi && !l.value.length ? (w(), S("div", Eg, " This " + T(C(t).direction === "pay" ? "vendor" : "customer") + " has no outstanding " + T(C(t).direction === "pay" ? "bills" : "invoices") + ". ", 1)) : (w(), S(ee, { key: 2 }, [
              r("div", Ng, [
                r("div", Tg, [
                  M[7] || (M[7] = r("label", { class: "pmd-lbl" }, [
                    ye("Amount "),
                    r("span", { class: "pmd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": M[0] || (M[0] = (H) => u.amount = H),
                    type: "number",
                    min: "0.01",
                    step: "0.01",
                    class: "pmd-input pmd-money"
                  }, null, 512), [
                    [
                      ge,
                      u.amount,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                r("div", Pg, [
                  M[8] || (M[8] = r("label", { class: "pmd-lbl" }, [
                    ye("Payment Date "),
                    r("span", { class: "pmd-req" }, "*")
                  ], -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": M[1] || (M[1] = (H) => u.date = H),
                    type: "date",
                    class: "pmd-input"
                  }, null, 512), [
                    [ge, u.date]
                  ])
                ]),
                r("div", Rg, [
                  M[10] || (M[10] = r("label", { class: "pmd-lbl" }, "Mode", -1)),
                  oe(r("select", {
                    "onUpdate:modelValue": M[2] || (M[2] = (H) => u.mode = H),
                    class: "pmd-input"
                  }, [...M[9] || (M[9] = [
                    r("option", null, "Cash", -1),
                    r("option", null, "Cheque", -1),
                    r("option", null, "Bank Transfer", -1),
                    r("option", null, "UPI", -1),
                    r("option", null, "NEFT", -1),
                    r("option", null, "RTGS", -1),
                    r("option", null, "IMPS", -1),
                    r("option", null, "Credit Card", -1),
                    r("option", null, "Debit Card", -1),
                    r("option", null, "Demand Draft", -1)
                  ])], 512), [
                    [je, u.mode]
                  ])
                ]),
                r("div", Ig, [
                  M[11] || (M[11] = r("label", { class: "pmd-lbl" }, "Reference #", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": M[3] || (M[3] = (H) => u.ref = H),
                    class: "pmd-input",
                    placeholder: "Cheque / Txn #"
                  }, null, 512), [
                    [ge, u.ref]
                  ])
                ]),
                r("div", Mg, [
                  r("label", Og, [
                    ye(T(m.value) + " ", 1),
                    r("span", Dg, "(" + T(c.value ? "Cash-in-Hand ledger" : "Bank ledger") + ")", 1)
                  ]),
                  oe(r("select", {
                    "onUpdate:modelValue": M[4] || (M[4] = (H) => u.bank = H),
                    class: "pmd-input"
                  }, [
                    M[12] || (M[12] = r("option", { value: "" }, "— Select —", -1)),
                    (w(!0), S(ee, null, Ae(p.value, (H) => (w(), S("option", {
                      key: H.name,
                      value: H.name
                    }, T(H.name), 9, Lg))), 128))
                  ], 512), [
                    [je, u.bank]
                  ]),
                  p.value.length ? G("", !0) : (w(), S("div", qg, " No " + T(c.value ? "Cash" : "Bank") + " account found for this company. Set one up under Accounts first. ", 1))
                ]),
                r("div", Bg, [
                  M[13] || (M[13] = r("label", { class: "pmd-lbl" }, "Bank Charges", -1)),
                  oe(r("input", {
                    "onUpdate:modelValue": M[5] || (M[5] = (H) => u.charges = H),
                    type: "number",
                    min: "0",
                    step: "0.01",
                    class: "pmd-input pmd-money"
                  }, null, 512), [
                    [
                      ge,
                      u.charges,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                r("div", jg, [
                  M[14] || (M[14] = r("label", { class: "pmd-lbl" }, "Notes", -1)),
                  oe(r("textarea", {
                    "onUpdate:modelValue": M[6] || (M[6] = (H) => u.notes = H),
                    class: "pmd-input",
                    rows: "2"
                  }, null, 512), [
                    [ge, u.notes]
                  ])
                ])
              ]),
              C(t).multi ? (w(), S(ee, { key: 0 }, [
                r("div", Hg, [
                  r("span", Vg, "Apply to " + T(C(t).direction === "pay" ? "Bills" : "Invoices"), 1),
                  r("button", {
                    class: "pmd-link-btn",
                    type: "button",
                    onClick: b,
                    disabled: !u.amount
                  }, " Auto-allocate (oldest due first) ", 8, zg)
                ]),
                r("div", Fg, [
                  r("div", Ug, [
                    M[15] || (M[15] = r("div", { class: "pmd-col pmd-col-check" }, null, -1)),
                    r("div", Kg, T(C(t).direction === "pay" ? "Bill" : "Invoice"), 1),
                    M[16] || (M[16] = r("div", { class: "pmd-col pmd-col-due" }, "Due Date", -1)),
                    M[17] || (M[17] = r("div", { class: "pmd-col pmd-col-amt" }, "Outstanding", -1)),
                    M[18] || (M[18] = r("div", { class: "pmd-col pmd-col-amt" }, "Allocate", -1))
                  ]),
                  (w(!0), S(ee, null, Ae(l.value, (H) => (w(), S("div", {
                    key: H.name,
                    class: "pmd-row"
                  }, [
                    r("div", Gg, [
                      oe(r("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": (j) => H.checked = j,
                        onChange: (j) => O(H)
                      }, null, 40, Wg), [
                        [ci, H.checked]
                      ])
                    ]),
                    r("div", Yg, T(H.name), 1),
                    r("div", Jg, T(h(H.due_date)), 1),
                    r("div", Qg, T(R(H.outstanding_amount)), 1),
                    r("div", Zg, [
                      oe(r("input", {
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "pmd-alloc-input",
                        disabled: !H.checked,
                        "onUpdate:modelValue": (j) => H.allocated = j,
                        onInput: (j) => L(H)
                      }, null, 40, Xg), [
                        [
                          ge,
                          H.allocated,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ])
                  ]))), 128))
                ])
              ], 64)) : G("", !0),
              r("div", ev, [
                C(t).multi ? G("", !0) : (w(), S("div", tv, [
                  M[19] || (M[19] = r("span", null, "Total Balance", -1)),
                  r("strong", null, T(R(C(t).balance)), 1)
                ])),
                r("div", null, [
                  r("span", null, T(C(t).direction === "pay" ? "Paying" : "Receiving"), 1),
                  r("strong", null, T(R(u.amount)), 1)
                ]),
                C(t).multi ? (w(), S(ee, { key: 1 }, [
                  r("div", null, [
                    M[20] || (M[20] = r("span", null, "Total Allocated", -1)),
                    r("strong", {
                      class: De($.value !== 0 ? "pmd-red" : "")
                    }, T(R(_.value)), 3)
                  ]),
                  $.value !== 0 ? (w(), S("div", nv, [
                    r("span", null, T($.value > 0 ? "Unallocated" : "Over-allocated"), 1),
                    r("strong", sv, T(R(Math.abs($.value))), 1)
                  ])) : G("", !0)
                ], 64)) : (w(), S("div", ov, [
                  M[21] || (M[21] = r("span", null, "Balance After", -1)),
                  r("strong", {
                    style: _t(`color:${C(t).balance - u.amount > 0 ? "#dc2626" : "#059669"}`)
                  }, T(R(Math.max(0, C(t).balance - u.amount))), 5)
                ]))
              ]),
              C(t).multi && $.value !== 0 ? (w(), S("div", iv, " Total allocated must equal Amount before you can save. Use Auto-allocate or adjust the amounts above. ")) : G("", !0)
            ], 64))
          ]),
          r("div", av, [
            r("button", {
              class: "pmd-btn pmd-btn-ghost",
              onClick: D,
              disabled: a.value
            }, "Cancel", 8, rv),
            r("button", {
              class: "pmd-btn pmd-btn-primary",
              disabled: a.value || !I.value || !N.$canWrite("payments"),
              title: N.$canWrite("payments") ? "" : "Read-only access",
              onClick: A
            }, T(a.value ? "Recording…" : C(t).direction === "pay" ? "Record Payment" : "Receive Payment"), 9, lv)
          ])
        ])
      ])) : G("", !0)
    ]));
  }
}, dv = /* @__PURE__ */ Fn(cv, [["__scopeId", "data-v-82aa3f2b"]]), rn = /* @__PURE__ */ ze({
  open: !1,
  kind: "credit",
  parentName: "",
  party: "",
  items: [],
  taxes: [],
  invoiceTotal: 0,
  existingEndpoint: "",
  createEndpoint: "",
  paramKey: "name",
  partyKey: "customer",
  parentKey: "against_invoice",
  resolve: null
});
function uv() {
  function e(s) {
    return new Promise((o) => {
      Object.assign(rn, {
        open: !0,
        kind: "credit",
        parentName: "",
        party: "",
        items: [],
        taxes: [],
        invoiceTotal: 0,
        existingEndpoint: "",
        createEndpoint: "",
        paramKey: "name",
        partyKey: "customer",
        parentKey: "against_invoice",
        ...s,
        resolve: o
      });
    });
  }
  function t(s) {
    rn.open = !1;
    const o = rn.resolve;
    rn.resolve = null, o == null || o(s);
  }
  function n() {
    rn.open = !1;
    const s = rn.resolve;
    rn.resolve = null, s == null || s(null);
  }
  return { state: rn, openReturnNote: e, complete: t, cancel: n };
}
const pv = { class: "rnd-dialog" }, fv = { class: "rnd-title" }, mv = ["disabled"], hv = { class: "rnd-body" }, gv = {
  key: 0,
  class: "rnd-warn"
}, vv = { class: "rnd-warn-sub" }, yv = { class: "rnd-grid" }, bv = { class: "rnd-field" }, xv = { class: "rnd-field" }, _v = { key: 0 }, wv = { key: 1 }, kv = { class: "rnd-lbl rnd-section" }, $v = { class: "rnd-table" }, Sv = { class: "rnd-item" }, Cv = { class: "rnd-max-hint" }, Av = { key: 0 }, Ev = ["onUpdate:modelValue", "max", "onInput"], Nv = { class: "rnd-num" }, Tv = { class: "rnd-num rnd-amt" }, Pv = { class: "rnd-total" }, Rv = { style: { color: "#374151" } }, Iv = { class: "rnd-total rnd-total-grand" }, Mv = {
  key: 1,
  class: "rnd-total"
}, Ov = {
  key: 2,
  class: "rnd-cap-bar"
}, Dv = {
  key: 3,
  class: "rnd-cap-warn"
}, Lv = { class: "rnd-field" }, qv = { class: "rnd-footer" }, Bv = ["disabled"], jv = ["disabled", "title"], Hv = {
  __name: "ReturnNoteDialog",
  setup(e) {
    const { state: t, complete: n, cancel: s } = uv(), { toast: o } = vn(), a = /* @__PURE__ */ pe(!1), i = /* @__PURE__ */ pe([]), l = /* @__PURE__ */ pe([]), d = /* @__PURE__ */ ze({ date: "", reason: "Price Adjustment", notes: "" }), u = _e(
      () => t.kind === "debit" ? "linear-gradient(135deg,#7c2d12,#ea580c)" : "linear-gradient(135deg,#7f1d1d,#dc2626)"
    ), c = _e(() => l.value.reduce((h, O) => h + Number(O.amount || 0), 0)), p = _e(
      () => i.value.filter((h) => h.docstatus === 1).reduce((h, O) => h + Math.abs(Number(O.grand_total || 0)), 0)
    ), m = _e(() => Math.max(0, Number(t.invoiceTotal || 0) - p.value)), g = _e(() => c.value > m.value + 5e-3);
    function _(h) {
      return "KES " + Number(h || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function $(h) {
      h.qty > h.maxQty && (h.qty = h.maxQty), h.qty < 0 && (h.qty = 0), h.amount = Math.round(Number(h.qty || 0) * Number(h.rate || 0) * 100) / 100;
    }
    ct(() => t.open, async (h) => {
      if (h && (Object.assign(d, {
        date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        reason: t.kind === "debit" ? "Vendor Overcharge" : "Price Adjustment",
        notes: ""
      }), l.value = (t.items || []).map((O) => ({
        item_code: O.item_code || "",
        item_name: O.item_name || O.item_code || "",
        description: O.description || "",
        uom: O.uom || "",
        batch_no: O.batch_no || "",
        batch_expiry_date: O.batch_expiry_date || "",
        maxQty: Number(O.qty || 0),
        qty: Number(O.qty || 0),
        rate: Number(O.rate || 0),
        amount: Math.round(Number(O.qty || 0) * Number(O.rate || 0) * 100) / 100
      })), i.value = [], t.existingEndpoint && t.parentName))
        try {
          const O = { [t.paramKey]: t.parentName }, L = await Et(t.existingEndpoint, O);
          i.value = L || [];
        } catch {
          i.value = [];
        }
    });
    async function I() {
      if (!d.date) {
        o("Please pick a date", "error");
        return;
      }
      const h = l.value.filter((O) => Number(O.qty) > 0);
      if (!h.length) {
        o("At least one item must have qty > 0", "error");
        return;
      }
      a.value = !0;
      try {
        const O = h.map((A) => ({
          item_code: A.item_code,
          item_name: A.item_name,
          description: A.description,
          uom: A.uom || "",
          batch_no: A.batch_no || "",
          batch_expiry_date: A.batch_expiry_date || "",
          qty: Number(A.qty),
          rate: Number(A.rate),
          amount: Number(A.amount)
        })), L = {
          [t.partyKey]: t.party,
          [t.parentKey]: t.parentName,
          date: d.date,
          reason: d.reason,
          notes: d.notes || "",
          items: JSON.stringify(O),
          taxes: JSON.stringify(t.taxes || [])
        }, b = await tt(t.createEndpoint, L), R = (b == null ? void 0 : b.credit_note) || (b == null ? void 0 : b.debit_note) || (b == null ? void 0 : b.name) || "";
        o((t.kind === "debit" ? "Debit Note" : "Credit Note") + " created: " + R, "success"), n({ noteName: R });
      } catch (O) {
        o("Failed: " + (O.message || ""), "error");
      }
      a.value = !1;
    }
    function f() {
      a.value || s();
    }
    return (h, O) => (w(), st(Lt, { to: "body" }, [
      C(t).open ? (w(), S("div", {
        key: 0,
        class: "rnd-backdrop",
        onClick: Fe(f, ["self"])
      }, [
        r("div", pv, [
          r("div", {
            class: "rnd-header",
            style: _t(`background:${u.value}`)
          }, [
            r("span", fv, T(C(t).kind === "debit" ? "Debit Note" : "Credit Note") + " — " + T(C(t).parentName), 1),
            r("button", {
              class: "rnd-close",
              onClick: f,
              disabled: a.value
            }, "✕", 8, mv)
          ], 4),
          r("div", hv, [
            i.value.length ? (w(), S("div", gv, [
              r("strong", null, "⚠ Existing " + T(C(t).kind === "debit" ? "debit" : "credit") + " notes:", 1),
              (w(!0), S(ee, null, Ae(i.value, (L) => (w(), S("span", {
                key: L.name,
                class: "rnd-warn-tag"
              }, T(L.name) + " (" + T(_(Math.abs(L.grand_total))) + ") ", 1))), 128)),
              r("div", vv, " Creating another will further reduce the " + T(C(t).kind === "debit" ? "bill" : "invoice") + " balance. ", 1)
            ])) : G("", !0),
            r("div", yv, [
              r("div", bv, [
                O[3] || (O[3] = r("label", { class: "rnd-lbl" }, [
                  ye("Date "),
                  r("span", { class: "rnd-req" }, "*")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": O[0] || (O[0] = (L) => d.date = L),
                  type: "date",
                  class: "rnd-input"
                }, null, 512), [
                  [ge, d.date]
                ])
              ]),
              r("div", xv, [
                O[8] || (O[8] = r("label", { class: "rnd-lbl" }, [
                  ye("Reason "),
                  r("span", { class: "rnd-req" }, "*")
                ], -1)),
                oe(r("select", {
                  "onUpdate:modelValue": O[1] || (O[1] = (L) => d.reason = L),
                  class: "rnd-input"
                }, [
                  O[4] || (O[4] = r("option", null, "Price Adjustment", -1)),
                  O[5] || (O[5] = r("option", null, "Goods Returned", -1)),
                  O[6] || (O[6] = r("option", null, "Damaged Goods", -1)),
                  C(t).kind === "credit" ? (w(), S("option", _v, "Duplicate Invoice")) : G("", !0),
                  C(t).kind === "debit" ? (w(), S("option", wv, "Vendor Overcharge")) : G("", !0),
                  O[7] || (O[7] = r("option", null, "Other", -1))
                ], 512), [
                  [je, d.reason]
                ])
              ])
            ]),
            r("div", null, [
              r("label", kv, "Items to " + T(C(t).kind === "debit" ? "Debit" : "Credit"), 1),
              r("div", $v, [
                O[9] || (O[9] = r("div", { class: "rnd-th" }, [
                  r("span", null, "Item"),
                  r("span", { style: { "text-align": "center" } }, "Qty"),
                  r("span", { style: { "text-align": "right" } }, "Rate"),
                  r("span", { style: { "text-align": "right" } }, "Amount")
                ], -1)),
                (w(!0), S(ee, null, Ae(l.value, (L, b) => (w(), S("div", {
                  key: b,
                  class: "rnd-tr"
                }, [
                  r("div", null, [
                    r("div", Sv, T(L.item_name || L.item_code), 1),
                    r("div", Cv, [
                      ye(" max " + T(L.maxQty), 1),
                      L.batch_no ? (w(), S("span", Av, " · Batch " + T(L.batch_no), 1)) : G("", !0)
                    ])
                  ]),
                  r("div", null, [
                    oe(r("input", {
                      "onUpdate:modelValue": (R) => L.qty = R,
                      type: "number",
                      max: L.maxQty,
                      min: "0",
                      step: "0.001",
                      class: De(["rnd-qty", { "rnd-qty-warn": L.qty > L.maxQty }]),
                      onInput: (R) => $(L)
                    }, null, 42, Ev), [
                      [
                        ge,
                        L.qty,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ]),
                  r("span", Nv, T(_(L.rate)), 1),
                  r("span", Tv, T(_(L.amount)), 1)
                ]))), 128))
              ]),
              r("div", Pv, [
                O[10] || (O[10] = ye(" Subtotal: ", -1)),
                r("strong", Rv, T(_(c.value)), 1)
              ]),
              C(t).taxes && C(t).taxes.length ? (w(), S(ee, { key: 0 }, [
                (w(!0), S(ee, null, Ae(C(t).taxes, (L, b) => (w(), S("div", {
                  key: b,
                  class: "rnd-tax-row"
                }, [
                  r("span", null, T(L.description || L.tax_type) + " (" + T(L.rate) + "%)", 1),
                  r("span", null, T(_(c.value * L.rate / 100)), 1)
                ]))), 128)),
                r("div", Iv, [
                  ye(T(C(t).kind === "debit" ? "Debit" : "Credit") + " Total (incl. tax): ", 1),
                  r("strong", {
                    style: _t(`color:${C(t).kind === "debit" ? "#7c2d12" : "#dc2626"}`)
                  }, T(_(c.value + C(t).taxes.reduce((L, b) => L + c.value * b.rate / 100, 0))), 5)
                ])
              ], 64)) : (w(), S("div", Mv, [
                ye(T(C(t).kind === "debit" ? "Debit" : "Credit") + " Total: ", 1),
                r("strong", {
                  style: _t(`color:${C(t).kind === "debit" ? "#7c2d12" : "#dc2626"}`)
                }, T(_(c.value)), 5)
              ])),
              m.value > 0 ? (w(), S("div", Ov, [
                r("div", {
                  class: De(["rnd-cap-used", g.value ? "rnd-cap-over" : "rnd-cap-ok"]),
                  style: _t(`width:${Math.min(100, c.value / m.value * 100)}%`)
                }, null, 6)
              ])) : G("", !0),
              g.value ? (w(), S("div", Dv, " ⚠ " + T(C(t).kind === "debit" ? "Debit" : "Credit") + " total " + T(_(c.value)) + " exceeds " + T(C(t).kind === "debit" ? "bill" : "invoice") + " outstanding " + T(_(m.value)), 1)) : G("", !0)
            ]),
            r("div", Lv, [
              O[11] || (O[11] = r("label", { class: "rnd-lbl" }, [
                ye("Notes "),
                r("span", { class: "rnd-opt" }, "(optional)")
              ], -1)),
              oe(r("input", {
                "onUpdate:modelValue": O[2] || (O[2] = (L) => d.notes = L),
                class: "rnd-input",
                placeholder: "Internal note or message…"
              }, null, 512), [
                [ge, d.notes]
              ])
            ])
          ]),
          r("div", qv, [
            r("button", {
              class: "rnd-btn rnd-btn-ghost",
              onClick: f,
              disabled: a.value
            }, "Cancel", 8, Bv),
            r("button", {
              class: "rnd-btn rnd-btn-danger",
              disabled: a.value || c.value <= 0 || g.value || !h.$canWrite("invoices") && !h.$canWrite("bills"),
              title: !h.$canWrite("invoices") && !h.$canWrite("bills") ? "Read-only access" : "",
              onClick: I
            }, T(a.value ? "Creating…" : `Issue ${C(t).kind === "debit" ? "Debit" : "Credit"} Note  ${_(c.value)}`), 9, jv)
          ])
        ])
      ])) : G("", !0)
    ]));
  }
}, Vv = /* @__PURE__ */ Fn(Hv, [["__scopeId", "data-v-b537f07b"]]), ln = /* @__PURE__ */ ze({
  open: !1,
  doctype: "",
  name: "",
  partyLabel: "",
  amount: 0,
  resolve: null
});
function zv() {
  function e(s) {
    return new Promise((o) => {
      Object.assign(ln, {
        open: !0,
        doctype: "",
        name: "",
        partyLabel: "",
        amount: 0,
        ...s,
        resolve: o
      });
    });
  }
  function t(s) {
    ln.open = !1;
    const o = ln.resolve;
    ln.resolve = null, o == null || o(s);
  }
  function n() {
    ln.open = !1;
    const s = ln.resolve;
    ln.resolve = null, s == null || s(null);
  }
  return { state: ln, openMakeRecurring: e, complete: t, cancel: n };
}
const Fv = {
  key: 1,
  class: "mr-drawer"
}, Uv = { class: "mr-header" }, Kv = { class: "mr-header-left" }, Gv = { class: "mr-header-ico" }, Wv = ["innerHTML"], Yv = { class: "mr-sub" }, Jv = ["innerHTML"], Qv = { class: "mr-body" }, Zv = {
  key: 0,
  class: "mr-context"
}, Xv = { class: "mr-context-row" }, ey = { class: "mr-context-lbl" }, ty = { class: "mr-context-val" }, ny = {
  key: 0,
  class: "mr-context-row"
}, sy = { class: "mr-context-val mono" }, oy = { class: "mr-section" }, iy = { class: "mr-section-hdr" }, ay = ["innerHTML"], ry = { class: "mr-grid" }, ly = { class: "mr-field" }, cy = { class: "mr-field" }, dy = { class: "mr-field" }, uy = { class: "mr-field" }, py = ["min"], fy = {
  key: 0,
  class: "mr-plan",
  style: { "grid-column": "1/-1" }
}, my = ["innerHTML"], hy = { class: "mr-section" }, gy = { class: "mr-section-hdr" }, vy = ["innerHTML"], yy = { class: "mr-toggle" }, by = {
  key: 0,
  class: "mr-section-empty"
}, xy = {
  key: 1,
  class: "mr-grid"
}, _y = {
  class: "mr-field",
  style: { "grid-column": "1/-1" }
}, wy = {
  class: "mr-field",
  style: { "grid-column": "1/-1" }
}, ky = {
  class: "mr-field",
  style: { "grid-column": "1/-1" }
}, $y = { class: "mr-footer" }, Sy = ["disabled"], Cy = ["disabled"], Ay = ["innerHTML"], Ey = {
  __name: "MakeRecurringDialog",
  setup(e) {
    const { state: t, complete: n, cancel: s } = zv(), { toast: o } = vn(), a = /* @__PURE__ */ pe(!1), i = /* @__PURE__ */ ze({
      frequency: "Monthly",
      start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      end_date: "",
      submit_on_creation: 1,
      _notify: !1,
      recipients: "",
      subject: "",
      message: ""
    }), l = _e(() => {
      if (!i.start_date) return "";
      const m = new Date(i.start_date);
      return m.setDate(m.getDate() + 1), m.toISOString().slice(0, 10);
    }), d = _e(() => {
      if (!i.start_date) return "";
      if (!i.end_date) return "Open-ended subscription — runs until paused or cancelled.";
      const m = new Date(i.start_date), g = new Date(i.end_date);
      if (g < m) return "End date is before start date.";
      const _ = (g.getFullYear() - m.getFullYear()) * 12 + (g.getMonth() - m.getMonth()), I = {
        Daily: Math.max(1, Math.round((g - m) / 864e5)),
        Weekly: Math.max(1, Math.round((g - m) / (7 * 864e5))),
        Monthly: _ + 1,
        Quarterly: Math.floor(_ / 3) + 1,
        "Half-yearly": Math.floor(_ / 6) + 1,
        Yearly: g.getFullYear() - m.getFullYear() + 1
      }[i.frequency] || 0;
      return `Will generate approximately ${I} document${I !== 1 ? "s" : ""}.`;
    });
    ct(() => t.open, (m) => {
      m && (Object.assign(i, {
        frequency: "Monthly",
        start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        end_date: "",
        submit_on_creation: 1,
        _notify: !1,
        recipients: "",
        subject: "",
        message: ""
      }), a.value = !1);
    });
    function u(m) {
      return m == null || m === "" ? "—" : "KES " + (Number(m) || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
    }
    function c() {
      a.value || s();
    }
    async function p() {
      var m;
      if (!i.start_date) return o.error("Start date is required");
      if (i.end_date && i.end_date <= i.start_date)
        return o.error("End date must be after start date");
      a.value = !0;
      try {
        const g = await tt("psd_books.api.recurring.make_recurring_from_doc", {
          reference_doctype: t.doctype,
          reference_document: t.name,
          frequency: i.frequency,
          start_date: i.start_date,
          end_date: i.end_date || null,
          submit_on_creation: i.submit_on_creation,
          recipients: i._notify ? i.recipients : "",
          subject: i._notify ? i.subject : "",
          message: i._notify ? i.message : ""
        }), _ = ((m = g == null ? void 0 : g.message) == null ? void 0 : m.name) || (g == null ? void 0 : g.name);
        o.success(`Recurring subscription ${_ || ""} created`), n(_);
      } catch (g) {
        o.error(g.message || "Failed to create subscription");
      } finally {
        a.value = !1;
      }
    }
    return (m, g) => (w(), st(Lt, { to: "body" }, [
      C(t).open ? (w(), S("div", {
        key: 0,
        class: "mr-overlay",
        onClick: Fe(c, ["self"])
      })) : G("", !0),
      C(t).open ? (w(), S("div", Fv, [
        r("div", Uv, [
          r("div", Kv, [
            r("div", Gv, [
              r("span", {
                innerHTML: C(Tn)("repeat", 18)
              }, null, 8, Wv)
            ]),
            r("div", null, [
              g[8] || (g[8] = r("div", { class: "mr-title" }, "Make Recurring", -1)),
              r("div", Yv, T(C(t).doctype) + " · " + T(C(t).name), 1)
            ])
          ]),
          r("button", {
            class: "mr-close",
            onClick: c
          }, [
            r("span", {
              innerHTML: C(Tn)("x", 16)
            }, null, 8, Jv)
          ])
        ]),
        r("div", Qv, [
          C(t).partyLabel || C(t).amount ? (w(), S("div", Zv, [
            r("div", Xv, [
              r("span", ey, T(C(t).partyLabel ? "Party" : "Reference"), 1),
              r("span", ty, T(C(t).partyLabel || C(t).name), 1)
            ]),
            C(t).amount ? (w(), S("div", ny, [
              g[9] || (g[9] = r("span", { class: "mr-context-lbl" }, "Template Amount", -1)),
              r("span", sy, T(u(C(t).amount)), 1)
            ])) : G("", !0)
          ])) : G("", !0),
          r("div", oy, [
            r("div", iy, [
              r("span", {
                innerHTML: C(Tn)("refresh", 13)
              }, null, 8, ay),
              g[10] || (g[10] = r("span", null, "Schedule", -1))
            ]),
            r("div", ry, [
              r("div", ly, [
                g[12] || (g[12] = r("label", null, [
                  ye("Frequency "),
                  r("span", { class: "req" }, "*")
                ], -1)),
                oe(r("select", {
                  "onUpdate:modelValue": g[0] || (g[0] = (_) => i.frequency = _),
                  class: "mr-input"
                }, [...g[11] || (g[11] = [
                  r("option", { value: "Daily" }, "Daily", -1),
                  r("option", { value: "Weekly" }, "Weekly", -1),
                  r("option", { value: "Monthly" }, "Monthly", -1),
                  r("option", { value: "Quarterly" }, "Quarterly", -1),
                  r("option", { value: "Half-yearly" }, "Half-yearly", -1),
                  r("option", { value: "Yearly" }, "Yearly", -1)
                ])], 512), [
                  [je, i.frequency]
                ])
              ]),
              r("div", cy, [
                g[14] || (g[14] = r("label", null, "Submit on Creation", -1)),
                oe(r("select", {
                  "onUpdate:modelValue": g[1] || (g[1] = (_) => i.submit_on_creation = _),
                  class: "mr-input"
                }, [...g[13] || (g[13] = [
                  r("option", { value: 1 }, "Yes — auto-submit", -1),
                  r("option", { value: 0 }, "No — save as draft", -1)
                ])], 512), [
                  [je, i.submit_on_creation]
                ])
              ]),
              r("div", dy, [
                g[15] || (g[15] = r("label", null, [
                  ye("Start Date "),
                  r("span", { class: "req" }, "*")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": g[2] || (g[2] = (_) => i.start_date = _),
                  type: "date",
                  class: "mr-input"
                }, null, 512), [
                  [ge, i.start_date]
                ])
              ]),
              r("div", uy, [
                g[16] || (g[16] = r("label", null, [
                  ye("End Date "),
                  r("span", { class: "hint" }, "(optional)")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": g[3] || (g[3] = (_) => i.end_date = _),
                  type: "date",
                  class: "mr-input",
                  min: l.value
                }, null, 8, py), [
                  [ge, i.end_date]
                ])
              ]),
              d.value ? (w(), S("div", fy, [
                r("span", {
                  innerHTML: C(Tn)("info", 13)
                }, null, 8, my),
                ye(" " + T(d.value), 1)
              ])) : G("", !0)
            ])
          ]),
          r("div", hy, [
            r("div", gy, [
              r("span", {
                innerHTML: C(Tn)("mail", 13)
              }, null, 8, vy),
              g[18] || (g[18] = r("span", null, "Notification", -1)),
              r("label", yy, [
                oe(r("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": g[4] || (g[4] = (_) => i._notify = _)
                }, null, 512), [
                  [ci, i._notify]
                ]),
                g[17] || (g[17] = r("span", { class: "mr-toggle-slider" }, null, -1))
              ])
            ]),
            i._notify ? (w(), S("div", xy, [
              r("div", _y, [
                g[19] || (g[19] = r("label", null, [
                  ye("Recipients "),
                  r("span", { class: "hint" }, "(comma separated)")
                ], -1)),
                oe(r("input", {
                  "onUpdate:modelValue": g[5] || (g[5] = (_) => i.recipients = _),
                  type: "text",
                  class: "mr-input",
                  placeholder: "finance@company.com, owner@company.com"
                }, null, 512), [
                  [ge, i.recipients]
                ])
              ]),
              r("div", wy, [
                g[20] || (g[20] = r("label", null, "Email Subject", -1)),
                oe(r("input", {
                  "onUpdate:modelValue": g[6] || (g[6] = (_) => i.subject = _),
                  type: "text",
                  class: "mr-input",
                  placeholder: "Your recurring invoice is ready"
                }, null, 512), [
                  [ge, i.subject]
                ])
              ]),
              r("div", ky, [
                g[21] || (g[21] = r("label", null, "Email Message", -1)),
                oe(r("textarea", {
                  "onUpdate:modelValue": g[7] || (g[7] = (_) => i.message = _),
                  class: "mr-input",
                  rows: "3",
                  placeholder: "Hello, please find your latest document attached…"
                }, null, 512), [
                  [ge, i.message]
                ])
              ])
            ])) : (w(), S("div", by, " Email notifications are off. Toggle to email someone every time a document is generated. "))
          ])
        ]),
        r("div", $y, [
          r("button", {
            class: "mr-btn-ghost",
            onClick: c,
            disabled: a.value
          }, "Cancel", 8, Sy),
          r("button", {
            class: "mr-btn-primary",
            onClick: p,
            disabled: a.value
          }, [
            r("span", {
              innerHTML: C(Tn)("repeat", 13)
            }, null, 8, Ay),
            ye(" " + T(a.value ? "Creating…" : "Create Subscription"), 1)
          ], 8, Cy)
        ])
      ])) : G("", !0)
    ]));
  }
}, Ny = /* @__PURE__ */ Fn(Ey, [["__scopeId", "data-v-abbd8239"]]), Ty = { class: "bv-app-main" }, Py = {
  key: 0,
  class: "bv-readonly-bar"
}, Ry = { class: "bv-app-content" }, Ta = "books_sidebar_collapsed", Iy = {
  __name: "AppShell",
  setup(e) {
    const { isReadonly: t } = xs(), n = /* @__PURE__ */ pe(!1), s = /* @__PURE__ */ pe(!1), o = /* @__PURE__ */ pe(!1), a = /* @__PURE__ */ pe(0), i = /* @__PURE__ */ pe([]), l = pi(), { register: d } = Pl();
    return gn(async () => {
      try {
        n.value = localStorage.getItem(Ta) === "1";
      } catch {
      }
      try {
        const u = await Et("psd_books.api.books_data.get_ai_alerts");
        i.value = (u == null ? void 0 : u.alerts) || [], a.value = i.value.length;
      } catch {
      }
      d("show_overdue", () => l.push("/invoices?ai_filter=Overdue")), d("show_unpaid", () => l.push("/invoices?ai_filter=Unpaid")), d("show_all_invoices", () => l.push("/invoices")), d("find_invoices", (u) => l.push("/invoices?ai_search=" + encodeURIComponent(u.customer || ""))), d("create_invoice", (u) => {
        var p;
        const c = new URLSearchParams({ ai_create: "1" });
        if (u.customer && c.set("ai_customer", u.customer), (p = u.items) != null && p[0]) {
          const m = u.items[0];
          m.item_name && c.set("ai_item", m.item_name), m.qty && c.set("ai_qty", String(m.qty)), m.rate && c.set("ai_rate", String(m.rate)), m.amount && c.set("ai_amount", String(m.amount));
        }
        l.push("/invoices?" + c.toString());
      }), d("show_outstanding", () => l.push("/dashboard")), d("show_bills", () => l.push("/bills")), d("show_quotes", () => l.push("/quotes")), d("show_customers", () => l.push("/customers")), d("show_dashboard", () => l.push("/dashboard")), d("show_sales_orders", () => l.push("/sales-orders")), d("show_purchase_orders", () => l.push("/purchase-orders")), d("navigate", (u) => {
        u.path && l.push(u.path);
      });
    }), ct(n, (u) => {
      try {
        localStorage.setItem(Ta, u ? "1" : "0");
      } catch {
      }
    }), (u, c) => {
      const p = Wc("router-view");
      return w(), S("div", {
        class: De(["bv-app", { "bv-app-sidebar-collapsed": n.value, "bv-mobile-open": s.value }])
      }, [
        s.value ? (w(), S("div", {
          key: 0,
          class: "bv-mob-overlay",
          onClick: c[0] || (c[0] = (m) => s.value = !1)
        })) : G("", !0),
        ve(Up, {
          collapsed: n.value,
          "mobile-open": s.value,
          onToggle: c[1] || (c[1] = (m) => n.value = !n.value),
          onCloseMobile: c[2] || (c[2] = (m) => s.value = !1)
        }, null, 8, ["collapsed", "mobile-open"]),
        r("div", Ty, [
          ve(Xp, {
            onToggleAi: c[3] || (c[3] = (m) => o.value = !o.value),
            "alert-count": a.value,
            onToggleMobile: c[4] || (c[4] = (m) => s.value = !s.value)
          }, null, 8, ["alert-count"]),
          C(t) ? (w(), S("div", Py, [...c[7] || (c[7] = [
            r("span", { class: "bv-readonly-icon" }, "👁", -1),
            ye(" Read-only access — you can view data but cannot make changes. ", -1)
          ])])) : G("", !0),
          r("main", Ry, [
            ve(p)
          ])
        ]),
        ve(Um),
        ve(nh),
        ve(rh),
        ve(b1),
        ve(O1),
        ve(hg),
        ve(dv),
        ve(Vv),
        ve(Ny),
        ve(Vm, {
          open: o.value,
          alerts: i.value,
          onClose: c[5] || (c[5] = (m) => o.value = !1),
          onAlertsSeen: c[6] || (c[6] = (m) => a.value = 0)
        }, null, 8, ["open", "alerts"]),
        ve(zm)
      ], 2);
    };
  }
}, My = /* @__PURE__ */ Fn(Iy, [["__scopeId", "data-v-ac1f49a0"]]), Oy = {
  __name: "App",
  setup(e) {
    return (t, n) => (w(), st(My));
  }
}, Dy = () => import("./PhaseAHome-81JsO-Ft.js"), Ly = () => import("./Dashboard-BHZ3V1Mp.js"), qy = () => import("./Customers-XCUKdBEg.js"), By = () => import("./CustomerProfile-DTnbCADG.js"), jy = () => import("./Vendors-D3aOavBq.js"), Hy = () => import("./SalesPersons-D57_LqyU.js"), Vy = () => import("./InventoryItems-BifyKSdY.js"), zy = () => import("./InventoryItemView-Cb68-IJ3.js"), Fy = () => import("./InventoryVariants-D2sL_MyA.js"), Uy = () => import("./InventoryItemGroups-BNIO0eez.js"), Ky = () => import("./InventoryWarehouses-BTZrnOxL.js"), Gy = () => import("./InventoryBatches-brazFRKy.js"), Wy = () => import("./InventorySettings-Br5EEErl.js"), Yy = () => import("./Asset-gWUJVhda.js"), Jy = () => import("./AssetDetails-CEzObCHa.js"), Qy = () => import("./AssetCategory-DV4V7lQ4.js"), Zy = () => import("./AssetDisposal-vk9RdUdd.js"), Xy = () => import("./AssetReports-DVNZcO0h.js"), eb = () => import("./AssetMovement-BXB0TnCh.js"), tb = () => import("./AssetRepair-BOc88zM9.js"), nb = () => import("./AssetValueAdjustment-nt56P69u.js"), sb = () => import("./AssetQuantityAdjustment-CKSfpG21.js"), ob = () => import("./Department-jsHkIeCT.js"), ib = () => import("./Projects-DJG0l0_i.js"), ab = () => import("./Employees-B2HhBuPD.js"), rb = () => import("./DepreciationSchedule-BPOlVXVC.js"), lb = () => import("./MaintenanceLog-ZZtjEUxA.js"), cb = () => import("./OpeningStockBatchEntry-DBEmcRFT.js"), db = () => import("./SettingsProfile-BTQIEaJa.js"), ub = () => import("./SettingsCompany-CWs5Yb-Y.js"), pb = () => import("./SettingsNumberSeries-D_b2of03.js"), fb = () => import("./SettingsPaymentTerms-B3Sbob3e.js"), mb = () => import("./SettingsUsers-DTAidEmo.js"), hb = () => import("./SettingsEmail-eMv4bwiy.js"), gb = () => import("./SettingsEmailTemplates-qaWq_AEl.js"), vb = () => import("./SettingsRoles-BK8j1dS1.js"), yb = () => import("./SettingsAuditLog-CQSsq3Ab.js"), bb = () => import("./SettingsOrganization-BDt5w-ye.js"), xb = () => import("./SettingsSecurity-BtDl73Rg.js"), _b = () => import("./SettingsIntegrations-B63WeTX2.js"), wb = () => import("./SettingsSSO-BbLjkjjk.js"), kb = () => import("./ChartOfAccounts-DLSyAZXT.js"), $b = () => import("./JournalEntries-CuFerhLS.js"), Sb = () => import("./OpeningBalances-C9Ld3hKb.js"), Cb = () => import("./CostCenters-DIOtrjwy.js"), Ab = () => import("./FiscalYears-Bdj6NQ7a.js"), Eb = () => import("./Invoices-B9s3jMSj.js"), Nb = () => import("./Quotes-ypvIvGkQ.js"), Tb = () => import("./SalesOrders-DAcCtEeA.js"), Pb = () => import("./CreditNotes-CrB75HIJ.js"), Rb = () => import("./Bills-Dx6UKewL.js"), Ib = () => import("./PurchaseOrders-Dveek1zO.js"), Mb = () => import("./Expenses-B3674NJO.js"), Pa = () => import("./Payments-BP5awPly.js"), Ob = () => import("./DebitNotes-lVSfgQri.js"), Db = () => import("./Recurring-DyphgPQD.js"), Lb = () => import("./EwayBills-f5TU90ay.js"), qb = () => import("./BankAccounts-B0XR-9qo.js"), Bb = () => import("./BankTransactions-CKiUZ2yQ.js"), jb = () => import("./BankReconciliation-CeoYoKTC.js"), Hb = () => import("./BankTransfers-UyxzZI9E.js"), Vb = () => import("./BankCheques-CbXLjpvM.js"), zb = () => import("./BankCash-D_CCt_WR.js"), Ra = () => import("./StockEntries-BM2BDbvl.js"), Fb = () => import("./InventoryAdjustments-DqGe82b3.js"), Ub = () => import("./StockLedger-DX8zdKwl.js"), Kb = () => import("./StockValuation-Bo6qQGy4.js"), Gb = () => import("./ReorderAlerts-4QovVe-B.js"), Wb = () => import("./GSTReturn1-DDy5-lmF.js"), Yb = () => import("./GSTReturn3B-CnqPuhBx.js"), Jb = () => import("./EInvoice-TL30XQL4.js"), Qb = () => import("./TDS-DA2ez_t3.js"), Zb = () => import("./TaxTemplates-DjKgnUTk.js"), Xb = () => import("./ExpenseCategories-DfTdiRBm.js"), e0 = () => import("./Reports-jW-4crFE.js"), t0 = () => import("./PriceLists-LWM_m8YM.js"), n0 = () => import("./RecurringBills-CP5dm0yf.js"), s0 = () => import("./BulkImport-Djuk7XbU.js"), o0 = () => import("./ProformaInvoices-PCDfTA6a.js"), i0 = () => import("./PurchaseReceipts-Btgnt0oQ.js"), a0 = () => import("./RequestForQuotation-qYpEceZh.js"), Ia = () => import("./LandedCostVoucher-Deq1cZ_B.js"), r0 = () => import("./QualityInspections-wYbh0hUR.js"), l0 = () => import("./QCTemplates-BYR4xvW4.js"), c0 = () => import("./QCApprovals-BNXaOkY0.js"), d0 = () => import("./MaterialSubstitutions-BEmjAU-T.js"), Ma = () => import("./BOM-LdLVl4Cf.js"), u0 = () => import("./ManufacturingDashboard-DbFNOcVk.js"), Oa = () => import("./Operation-B84wIY4n.js"), Da = () => import("./Workstation-DR56zhFJ.js"), La = () => import("./WorkstationType-DdIJJMNi.js"), qa = () => import("./Routing-BmHbKmYM.js"), Ba = () => import("./JobCard-Bs6_Ki5T.js"), ja = () => import("./WorkOrder-BWbzOx2z.js"), Ha = () => import("./ProductionPlan-CGlC9c0B.js"), Va = () => import("./MaterialRequest-6A2OmEAQ.js"), za = () => import("./PackingSlip-U9sYO4ay.js"), Fa = () => import("./AlternativeItem-CMWDcw_L.js"), p0 = () => import("./ManufacturingSettings-CtA0IE1d.js"), f0 = () => import("./ManufacturingReports-aCjJalnl.js"), m0 = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Ly,
    meta: { module: null }
  },
  {
    path: "/books",
    redirect: "/dashboard"
  },
  {
    path: "/home",
    name: "home",
    component: Dy,
    meta: { module: null }
  },
  {
    path: "/customers",
    name: "customers",
    component: qy,
    meta: { module: "customers" }
  },
  {
    path: "/customers/:name",
    name: "customer-profile",
    component: By,
    meta: { module: "customers" }
  },
  {
    path: "/vendors",
    name: "vendors",
    component: jy,
    meta: { module: "customers" }
    // Vendors share the customers module flag in Books Company Member
  },
  {
    path: "/sales-persons",
    name: "sales-persons",
    component: Hy,
    meta: { module: "customers" }
    // Sales Persons share the customers module flag in Books Company Member
  },
  {
    path: "/inventory/items",
    name: "inventory-items",
    component: Vy,
    meta: { module: "inventory" }
  },
  {
    path: "/inventory/items/:itemCode",
    name: "item-view",
    component: zy,
    meta: { module: "inventory" }
  },
  {
    path: "/inventory/variants/:template",
    name: "inventory-variants",
    component: Fy,
    meta: { module: "inventory" }
  },
  {
    path: "/inventory/item-groups",
    name: "inventory-item-groups",
    component: Uy,
    meta: { module: "inventory" }
  },
  {
    path: "/inventory/warehouses",
    name: "inventory-warehouses",
    component: Ky,
    meta: { module: "inventory" }
  },
  {
    path: "/inventory/settings",
    name: "inventory-settings",
    component: Wy,
    meta: { module: "inventory" }
  },
  {
    path: "/assets",
    name: "assets-assets",
    component: Yy,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/:id",
    name: "asset-details",
    component: Jy,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/asset-category",
    name: "assets-asset-category",
    component: Qy,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/disposals",
    name: "assets-disposals",
    component: Zy,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/reports",
    name: "assets-reports",
    component: Xy,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/movements",
    name: "assets-movements",
    component: eb,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/repairs",
    name: "assets-repairs",
    component: tb,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/value-adjustments",
    name: "assets-value-adjustments",
    component: nb,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/quantity-adjustments",
    name: "assets-quantity-adjustments",
    component: sb,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/department",
    name: "assets-department",
    component: ob,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/depreciation-schedule",
    name: "assets-depreciation-schedule",
    component: rb,
    meta: { module: "inventory" }
  },
  {
    path: "/assets/maintenance-log",
    name: "assets-maintenance-log",
    component: lb,
    meta: { module: "inventory" }
  },
  {
    path: "/projects",
    name: "projects",
    component: ib,
    meta: { module: "inventory" }
  },
  {
    path: "/employees",
    name: "employees",
    component: ab,
    meta: { module: "admin" }
  },
  {
    path: "/settings/profile",
    name: "settings-profile",
    component: db,
    meta: { module: null }
    // every user can edit their own profile
  },
  {
    path: "/settings/company",
    name: "settings-company",
    component: ub,
    meta: { module: "admin" }
  },
  {
    path: "/settings/number-series",
    name: "settings-number-series",
    component: pb,
    meta: { module: "admin" }
  },
  {
    path: "/settings/payment-terms",
    name: "settings-payment-terms",
    component: fb,
    meta: { module: "admin" }
  },
  {
    path: "/settings/users",
    name: "settings-users",
    component: mb,
    meta: { module: "admin" }
  },
  {
    path: "/settings/email",
    name: "settings-email",
    component: hb,
    meta: { module: "admin" }
  },
  {
    path: "/settings/email-templates",
    name: "settings-email-templates",
    component: gb,
    meta: { module: "admin" }
  },
  { path: "/settings/roles", name: "settings-roles", component: vb, meta: { module: "admin" } },
  { path: "/settings/audit-log", name: "settings-audit-log", component: yb, meta: { module: "admin" } },
  { path: "/settings/organization", name: "settings-organization", component: bb, meta: { module: "admin" } },
  { path: "/settings/security", name: "settings-security", component: xb, meta: { module: null } },
  { path: "/settings/sso", name: "settings-sso", component: wb, meta: { module: "admin" } },
  { path: "/settings/integrations", name: "settings-integrations", component: _b, meta: { module: "admin" } },
  // { path: "/settings/currency-exchange", name: "settings-currency", component: SettingsCurrencyExchange, meta: { module: "admin" } }, // KES-only: hidden
  { path: "/accounting/chart-of-accounts", name: "chart-of-accounts", component: kb, meta: { module: "accounts" } },
  { path: "/accounting/journal-entries", name: "journal-entries", component: $b, meta: { module: "accounts" } },
  { path: "/accounting/opening-balances", name: "opening-balances", component: Sb, meta: { module: "accounts" } },
  { path: "/accounting/cost-centers", name: "cost-centers", component: Cb, meta: { module: "accounts" } },
  { path: "/accounting/fiscal-years", name: "fiscal-years", component: Ab, meta: { module: "accounts" } },
  { path: "/invoices", name: "invoices", component: Eb, meta: { module: "invoices" } },
  { path: "/quotes", name: "quotes", component: Nb, meta: { module: "invoices" } },
  { path: "/sales-orders", name: "sales-orders", component: Tb, meta: { module: "invoices" } },
  { path: "/credit-notes", name: "credit-notes", component: Pb, meta: { module: "invoices" } },
  { path: "/purchases", name: "purchases", component: Rb, meta: { module: "bills" } },
  { path: "/purchase-orders", name: "purchase-orders", component: Ib, meta: { module: "bills", doctype: "Purchase Order" } },
  { path: "/expenses", name: "expenses", component: Mb, meta: { module: "bills" } },
  { path: "/expenses/categories", name: "expense-categories", component: Xb, meta: { module: "bills" } },
  { path: "/payments", name: "payments", component: Pa, meta: { module: "payments" } },
  { path: "/payments-received", name: "payments-received", component: Pa, meta: { module: "payments" } },
  { path: "/debit-notes", name: "debit-notes", component: Ob, meta: { module: "bills" } },
  { path: "/recurring-bills", name: "recurring-bills", component: n0, meta: { module: "bills" } },
  { path: "/recurring", name: "recurring", component: Db, meta: { module: "invoices" } },
  { path: "/eway-bills", name: "eway-bills", component: Lb, meta: { module: "invoices" } },
  { path: "/banking/accounts", name: "banking-accounts", component: qb, meta: { module: "accounts" } },
  { path: "/banking/transactions", name: "banking-transactions", component: Bb, meta: { module: "accounts" } },
  { path: "/banking/reconciliation", name: "banking-reconciliation", component: jb, meta: { module: "accounts" } },
  { path: "/banking/transfers", name: "banking-transfers", component: Hb, meta: { module: "accounts" } },
  { path: "/banking/cheques", name: "banking-cheques", component: Vb, meta: { module: "accounts" } },
  { path: "/banking/cash", name: "banking-cash", component: zb, meta: { module: "accounts" } },
  { path: "/inventory/stock-entries", name: "stock-entries", component: Ra, meta: { module: "inventory" } },
  { path: "/inventory/opening-stock", name: "opening-stock", component: cb, meta: { module: "inventory" } },
  { path: "/inventory/adjustments", name: "inventory-adjustments", component: Fb, meta: { module: "inventory" } },
  { path: "/inventory/stock-ledger", name: "stock-ledger", component: Ub, meta: { module: "inventory" } },
  { path: "/inventory/valuation", name: "stock-valuation", component: Kb, meta: { module: "inventory" } },
  { path: "/inventory/reorder-alerts", name: "reorder-alerts", component: Gb, meta: { module: "inventory" } },
  { path: "/inventory/price-lists", name: "price-lists", component: t0, meta: { module: "inventory" } },
  { path: "/inventory/batches", name: "inventory-batches", component: Gy, meta: { module: "inventory" } },
  { path: "/gst/gstr1", name: "gstr1", component: Wb, meta: { module: "accounts" } },
  { path: "/gst/gstr3b", name: "gstr3b", component: Yb, meta: { module: "accounts" } },
  { path: "/gst/einvoice", name: "einvoice", component: Jb, meta: { module: "invoices" } },
  { path: "/gst/tds", name: "tds", component: Qb, meta: { module: "accounts" } },
  { path: "/gst/tax-templates", name: "tax-templates", component: Zb, meta: { module: "taxes" } },
  { path: "/reports", name: "reports", component: e0, meta: { module: null } },
  { path: "/bulk-import", name: "bulk-import", component: s0, meta: { module: "admin" } },
  { path: "/delivery-challans", name: "delivery-challans", component: Ra, meta: { module: "inventory" } },
  { path: "/proforma-invoices", name: "proforma-invoices", component: o0, meta: { module: "invoices" } },
  { path: "/purchase-receipts", name: "purchase-receipts", component: i0, meta: { module: "inventory" } },
  { path: "/rfqs", name: "rfqs", component: a0, meta: { module: "bills" } },
  { path: "/purchasing/landed-cost-vouchers", name: "landed-cost-vouchers", component: Ia, meta: { module: "bills" } },
  { path: "/purchasing/landed-cost-vouchers/:name", name: "landed-cost-vouchers-view", component: Ia, meta: { module: "bills" } },
  // Quality
  { path: "/quality/inspections", name: "quality-inspections", component: r0, meta: { module: "inventory" } },
  { path: "/quality/templates", name: "quality-templates", component: l0, meta: { module: "inventory" } },
  { path: "/quality/approvals", name: "quality-approvals", component: c0, meta: { module: "inventory" } },
  // Manufacturing
  { path: "/manufacturing", name: "manufacturing-dashboard", component: u0, meta: { module: "inventory" } },
  { path: "/manufacturing/bom", name: "manufacturing-bom", component: Ma, meta: { module: "inventory" } },
  { path: "/manufacturing/bom/:name", name: "manufacturing-bom-view", component: Ma, meta: { module: "inventory" } },
  { path: "/manufacturing/operation", name: "manufacturing-operation", component: Oa, meta: { module: "inventory" } },
  { path: "/manufacturing/operation/:name", name: "manufacturing-operation-view", component: Oa, meta: { module: "inventory" } },
  { path: "/manufacturing/workstation", name: "manufacturing-workstation", component: Da, meta: { module: "inventory" } },
  { path: "/manufacturing/workstation/:name", name: "manufacturing-workstation-view", component: Da, meta: { module: "inventory" } },
  { path: "/manufacturing/workstation-type", name: "manufacturing-workstation-type", component: La, meta: { module: "inventory" } },
  { path: "/manufacturing/workstation-type/:name", name: "manufacturing-workstation-type-view", component: La, meta: { module: "inventory" } },
  { path: "/manufacturing/routing", name: "manufacturing-routing", component: qa, meta: { module: "inventory" } },
  { path: "/manufacturing/routing/:name", name: "manufacturing-routing-view", component: qa, meta: { module: "inventory" } },
  { path: "/manufacturing/job-card", name: "manufacturing-job-card", component: Ba, meta: { module: "inventory" } },
  { path: "/manufacturing/job-card/:name", name: "manufacturing-job-card-view", component: Ba, meta: { module: "inventory" } },
  { path: "/manufacturing/work-order", name: "manufacturing-work-order", component: ja, meta: { module: "inventory" } },
  { path: "/manufacturing/work-order/:name", name: "manufacturing-work-order-view", component: ja, meta: { module: "inventory" } },
  { path: "/manufacturing/production-plan", name: "manufacturing-production-plan", component: Ha, meta: { module: "inventory" } },
  { path: "/manufacturing/production-plan/:name", name: "manufacturing-production-plan-view", component: Ha, meta: { module: "inventory" } },
  { path: "/manufacturing/material-request", name: "manufacturing-material-request", component: Va, meta: { module: "inventory", doctype: "Material Request" } },
  { path: "/manufacturing/material-request/:name", name: "manufacturing-material-request-view", component: Va, meta: { module: "inventory", doctype: "Material Request" } },
  { path: "/manufacturing/packing-slip", name: "manufacturing-packing-slip", component: za, meta: { module: "inventory" } },
  { path: "/manufacturing/packing-slip/:name", name: "manufacturing-packing-slip-view", component: za, meta: { module: "inventory" } },
  { path: "/manufacturing/alternative-item", name: "manufacturing-alternative-item", component: Fa, meta: { module: "inventory" } },
  { path: "/manufacturing/alternative-item/:name", name: "manufacturing-alternative-item-view", component: Fa, meta: { module: "inventory" } },
  { path: "/manufacturing/material-substitutions", name: "manufacturing-material-substitutions", component: d0, meta: { module: "inventory" } },
  { path: "/manufacturing/settings", name: "manufacturing-settings", component: p0, meta: { module: "inventory" } },
  { path: "/manufacturing/reports", name: "manufacturing-reports", component: f0, meta: { module: "inventory" } },
  // Future phases append entries here.
  // Any unknown / wrong URL falls through to the dashboard instead of a 404.
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/dashboard"
  }
], ql = Sp({
  history: sp(),
  routes: m0
}), h0 = [
  "/assets",
  "/manufacturing",
  "/gst/gstr1",
  "/gst/gstr3b",
  "/gst/einvoice",
  "/gst/tds",
  "/settings/sso",
  "/settings/integrations",
  "/settings/roles"
], g0 = [
  "/manufacturing/material-request"
], Ua = (e, t) => e === t || e.startsWith(t + "/");
function v0(e) {
  return g0.some((t) => Ua(e, t)) ? !1 : h0.some((t) => Ua(e, t));
}
ql.beforeEach((e) => {
  var o, a, i, l;
  if (!Ee.ready) return !1;
  if (v0(e.path)) return { path: "/dashboard" };
  const { can: t, flags: n } = xs(), s = ((o = e.meta) == null ? void 0 : o.doctype) && !!((i = (a = n.value.doc_access) == null ? void 0 : a[e.meta.doctype]) != null && i.read);
  return (l = e.meta) != null && l.module && !t(e.meta.module) && !s ? (vn().error(`You don't have access to "${e.name || e.path}".`), { path: "/dashboard" }) : !0;
});
Ep().then((e) => {
  if (e === !1) return;
  const t = vu(Oy), { canWrite: n, can: s, canCreate: o, canEdit: a, canDelete: i } = xs();
  t.config.globalProperties.$canWrite = n, t.config.globalProperties.$can = s, t.config.globalProperties.$canCreate = o, t.config.globalProperties.$canEdit = a, t.config.globalProperties.$canDelete = i, t.use(ql), t.mount("#books-app");
});
export {
  ci as $,
  ge as A,
  _0 as B,
  st as C,
  ve as D,
  Sn as E,
  ee as F,
  $0 as G,
  Lt as H,
  C0 as I,
  tt as J,
  Al as K,
  El as L,
  E0 as M,
  N0 as N,
  uh as O,
  S0 as P,
  T0 as Q,
  xs as R,
  wl as S,
  x0 as T,
  A0 as U,
  y0 as V,
  b0 as W,
  Jt as X,
  Wc as Y,
  sh as Z,
  Fn as _,
  r as a,
  So as a0,
  Pn as a1,
  lf as a2,
  no as a3,
  nt as a4,
  cu as a5,
  Rl as a6,
  mf as a7,
  cf as a8,
  cl as a9,
  Yt as aa,
  du as ab,
  hf as ac,
  nl as ad,
  uo as ae,
  gt as af,
  lh as ag,
  Z1 as ah,
  gg as ai,
  D1 as aj,
  uv as ak,
  zv as al,
  x1 as am,
  k0 as an,
  L0 as ao,
  J1 as ap,
  D0 as aq,
  b1 as ar,
  df as as,
  O0 as at,
  pf as au,
  R0 as av,
  P0 as aw,
  M0 as ax,
  I0 as ay,
  w0 as az,
  G as b,
  S as c,
  ye as d,
  Tl as e,
  Wt as f,
  _e as g,
  pe as h,
  Tn as i,
  pi as j,
  w as k,
  Et as l,
  si as m,
  De as n,
  gn as o,
  _t as p,
  Fe as q,
  Ae as r,
  Ee as s,
  T as t,
  C as u,
  je as v,
  oe as w,
  vn as x,
  ct as y,
  ze as z
};
