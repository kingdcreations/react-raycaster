var fr = Object.defineProperty;
var cr = (w, R, L) => R in w ? fr(w, R, { enumerable: !0, configurable: !0, writable: !0, value: L }) : w[R] = L;
var H = (w, R, L) => (cr(w, typeof R != "symbol" ? R + "" : R, L), L);
import Ge, { useRef as ur, useMemo as dr, useState as xe, useEffect as ce } from "react";
var $e = { exports: {} }, be = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function pr() {
  if (ze)
    return be;
  ze = 1;
  var w = Ge, R = Symbol.for("react.element"), L = Symbol.for("react.fragment"), re = Object.prototype.hasOwnProperty, te = w.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ne = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(G, S, Z) {
    var C, U = {}, ae = null, E = null;
    Z !== void 0 && (ae = "" + Z), S.key !== void 0 && (ae = "" + S.key), S.ref !== void 0 && (E = S.ref);
    for (C in S)
      re.call(S, C) && !ne.hasOwnProperty(C) && (U[C] = S[C]);
    if (G && G.defaultProps)
      for (C in S = G.defaultProps, S)
        U[C] === void 0 && (U[C] = S[C]);
    return { $$typeof: R, type: G, key: ae, ref: E, props: U, _owner: te.current };
  }
  return be.Fragment = L, be.jsx = m, be.jsxs = m, be;
}
var Re = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He;
function hr() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && function() {
    var w = Ge, R = Symbol.for("react.element"), L = Symbol.for("react.portal"), re = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), ne = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), G = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), ae = Symbol.for("react.lazy"), E = Symbol.for("react.offscreen"), P = Symbol.iterator, _e = "@@iterator";
    function Me(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = P && e[P] || e[_e];
      return typeof t == "function" ? t : null;
    }
    var u = w.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
          a[s - 1] = arguments[s];
        W("error", e, a);
      }
    }
    function W(e, t, a) {
      {
        var s = u.ReactDebugCurrentFrame, h = s.getStackAddendum();
        h !== "" && (t += "%s", a = a.concat([h]));
        var y = a.map(function(f) {
          return String(f);
        });
        y.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var r = !1, ue = !1, Te = !1, oe = !1, Oe = !1, J;
    J = Symbol.for("react.module.reference");
    function Se(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === re || e === ne || Oe || e === te || e === Z || e === C || oe || e === E || r || ue || Te || typeof e == "object" && e !== null && (e.$$typeof === ae || e.$$typeof === U || e.$$typeof === m || e.$$typeof === G || e.$$typeof === S || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === J || e.getModuleId !== void 0));
    }
    function Q(e, t, a) {
      var s = e.displayName;
      if (s)
        return s;
      var h = t.displayName || t.name || "";
      return h !== "" ? a + "(" + h + ")" : a;
    }
    function ge(e) {
      return e.displayName || "Context";
    }
    function $(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case re:
          return "Fragment";
        case L:
          return "Portal";
        case ne:
          return "Profiler";
        case te:
          return "StrictMode";
        case Z:
          return "Suspense";
        case C:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case G:
            var t = e;
            return ge(t) + ".Consumer";
          case m:
            var a = e;
            return ge(a._context) + ".Provider";
          case S:
            return Q(e, e.render, "ForwardRef");
          case U:
            var s = e.displayName || null;
            return s !== null ? s : $(e.type) || "Memo";
          case ae: {
            var h = e, y = h._payload, f = h._init;
            try {
              return $(f(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ee = Object.assign, K = 0, ke, F, me, de, Ce, fe, Pe;
    function De() {
    }
    De.__reactDisabledLog = !0;
    function Ae() {
      {
        if (K === 0) {
          ke = console.log, F = console.info, me = console.warn, de = console.error, Ce = console.group, fe = console.groupCollapsed, Pe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: De,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        K++;
      }
    }
    function je() {
      {
        if (K--, K === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ee({}, e, {
              value: ke
            }),
            info: ee({}, e, {
              value: F
            }),
            warn: ee({}, e, {
              value: me
            }),
            error: ee({}, e, {
              value: de
            }),
            group: ee({}, e, {
              value: Ce
            }),
            groupCollapsed: ee({}, e, {
              value: fe
            }),
            groupEnd: ee({}, e, {
              value: Pe
            })
          });
        }
        K < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ee = u.ReactCurrentDispatcher, we;
    function pe(e, t, a) {
      {
        if (we === void 0)
          try {
            throw Error();
          } catch (h) {
            var s = h.stack.trim().match(/\n( *(at )?)/);
            we = s && s[1] || "";
          }
        return `
` + we + e;
      }
    }
    var he = !1, n;
    {
      var o = typeof WeakMap == "function" ? WeakMap : Map;
      n = new o();
    }
    function i(e, t) {
      if (!e || he)
        return "";
      {
        var a = n.get(e);
        if (a !== void 0)
          return a;
      }
      var s;
      he = !0;
      var h = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = Ee.current, Ee.current = null, Ae();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (se) {
              s = se;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (se) {
              s = se;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (se) {
            s = se;
          }
          e();
        }
      } catch (se) {
        if (se && s && typeof se.stack == "string") {
          for (var l = se.stack.split(`
`), X = s.stack.split(`
`), M = l.length - 1, O = X.length - 1; M >= 1 && O >= 0 && l[M] !== X[O]; )
            O--;
          for (; M >= 1 && O >= 0; M--, O--)
            if (l[M] !== X[O]) {
              if (M !== 1 || O !== 1)
                do
                  if (M--, O--, O < 0 || l[M] !== X[O]) {
                    var z = `
` + l[M].replace(" at new ", " at ");
                    return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), typeof e == "function" && n.set(e, z), z;
                  }
                while (M >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        he = !1, Ee.current = y, je(), Error.prepareStackTrace = h;
      }
      var ye = e ? e.displayName || e.name : "", Be = ye ? pe(ye) : "";
      return typeof e == "function" && n.set(e, Be), Be;
    }
    function c(e, t, a) {
      return i(e, !1);
    }
    function p(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function g(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return i(e, p(e));
      if (typeof e == "string")
        return pe(e);
      switch (e) {
        case Z:
          return pe("Suspense");
        case C:
          return pe("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case S:
            return c(e.render);
          case U:
            return g(e.type, t, a);
          case ae: {
            var s = e, h = s._payload, y = s._init;
            try {
              return g(y(h), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    var T = Object.prototype.hasOwnProperty, Y = {}, N = u.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var t = e._owner, a = g(e.type, e._source, t ? t.type : null);
        N.setExtraStackFrame(a);
      } else
        N.setExtraStackFrame(null);
    }
    function k(e, t, a, s, h) {
      {
        var y = Function.call.bind(T);
        for (var f in e)
          if (y(e, f)) {
            var l = void 0;
            try {
              if (typeof e[f] != "function") {
                var X = Error((s || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw X.name = "Invariant Violation", X;
              }
              l = e[f](t, f, s, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (M) {
              l = M;
            }
            l && !(l instanceof Error) && (V(h), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", a, f, typeof l), V(null)), l instanceof Error && !(l.message in Y) && (Y[l.message] = !0, V(h), _("Failed %s type: %s", a, l.message), V(null));
          }
      }
    }
    var b = Array.isArray;
    function d(e) {
      return b(e);
    }
    function x(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function A(e) {
      try {
        return D(e), !1;
      } catch {
        return !0;
      }
    }
    function D(e) {
      return "" + e;
    }
    function v(e) {
      if (A(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", x(e)), D(e);
    }
    var I = u.ReactCurrentOwner, le = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, q, j, ie;
    ie = {};
    function B(e) {
      if (T.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ie(e) {
      if (T.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Je(e, t) {
      if (typeof e.ref == "string" && I.current && t && I.current.stateNode !== t) {
        var a = $(I.current.type);
        ie[a] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(I.current.type), e.ref), ie[a] = !0);
      }
    }
    function Ke(e, t) {
      {
        var a = function() {
          q || (q = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function Ze(e, t) {
      {
        var a = function() {
          j || (j = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var Qe = function(e, t, a, s, h, y, f) {
      var l = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: R,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: a,
        props: f,
        // Record the component responsible for creating this element.
        _owner: y
      };
      return l._store = {}, Object.defineProperty(l._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(l, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(l, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.freeze && (Object.freeze(l.props), Object.freeze(l)), l;
    };
    function er(e, t, a, s, h) {
      {
        var y, f = {}, l = null, X = null;
        a !== void 0 && (v(a), l = "" + a), Ie(t) && (v(t.key), l = "" + t.key), B(t) && (X = t.ref, Je(t, h));
        for (y in t)
          T.call(t, y) && !le.hasOwnProperty(y) && (f[y] = t[y]);
        if (e && e.defaultProps) {
          var M = e.defaultProps;
          for (y in M)
            f[y] === void 0 && (f[y] = M[y]);
        }
        if (l || X) {
          var O = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          l && Ke(f, O), X && Ze(f, O);
        }
        return Qe(e, l, X, h, s, I.current, f);
      }
    }
    var Fe = u.ReactCurrentOwner, Xe = u.ReactDebugCurrentFrame;
    function ve(e) {
      if (e) {
        var t = e._owner, a = g(e.type, e._source, t ? t.type : null);
        Xe.setExtraStackFrame(a);
      } else
        Xe.setExtraStackFrame(null);
    }
    var Ye;
    Ye = !1;
    function We(e) {
      return typeof e == "object" && e !== null && e.$$typeof === R;
    }
    function Le() {
      {
        if (Fe.current) {
          var e = $(Fe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function rr(e) {
      {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), a = e.lineNumber;
          return `

Check your code at ` + t + ":" + a + ".";
        }
        return "";
      }
    }
    var Ue = {};
    function tr(e) {
      {
        var t = Le();
        if (!t) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (t = `

Check the top-level render call using <` + a + ">.");
        }
        return t;
      }
    }
    function Ve(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = tr(t);
        if (Ue[a])
          return;
        Ue[a] = !0;
        var s = "";
        e && e._owner && e._owner !== Fe.current && (s = " It was passed a child from " + $(e._owner.type) + "."), ve(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, s), ve(null);
      }
    }
    function Ne(e, t) {
      {
        if (typeof e != "object")
          return;
        if (d(e))
          for (var a = 0; a < e.length; a++) {
            var s = e[a];
            We(s) && Ve(s, t);
          }
        else if (We(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var h = Me(e);
          if (typeof h == "function" && h !== e.entries)
            for (var y = h.call(e), f; !(f = y.next()).done; )
              We(f.value) && Ve(f.value, t);
        }
      }
    }
    function nr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var a;
        if (typeof t == "function")
          a = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === S || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === U))
          a = t.propTypes;
        else
          return;
        if (a) {
          var s = $(t);
          k(a, e.props, "prop", s, e);
        } else if (t.PropTypes !== void 0 && !Ye) {
          Ye = !0;
          var h = $(t);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", h || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ar(e) {
      {
        for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
          var s = t[a];
          if (s !== "children" && s !== "key") {
            ve(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), ve(null);
            break;
          }
        }
        e.ref !== null && (ve(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), ve(null));
      }
    }
    function qe(e, t, a, s, h, y) {
      {
        var f = Se(e);
        if (!f) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var X = rr(h);
          X ? l += X : l += Le();
          var M;
          e === null ? M = "null" : d(e) ? M = "array" : e !== void 0 && e.$$typeof === R ? (M = "<" + ($(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : M = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", M, l);
        }
        var O = er(e, t, a, h, y);
        if (O == null)
          return O;
        if (f) {
          var z = t.children;
          if (z !== void 0)
            if (s)
              if (d(z)) {
                for (var ye = 0; ye < z.length; ye++)
                  Ne(z[ye], e);
                Object.freeze && Object.freeze(z);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ne(z, e);
        }
        return e === re ? ar(O) : nr(O), O;
      }
    }
    function or(e, t, a) {
      return qe(e, t, a, !0);
    }
    function ir(e, t, a) {
      return qe(e, t, a, !1);
    }
    var sr = ir, lr = or;
    Re.Fragment = re, Re.jsx = sr, Re.jsxs = lr;
  }()), Re;
}
process.env.NODE_ENV === "production" ? $e.exports = pr() : $e.exports = hr();
var vr = $e.exports;
class yr {
  constructor(R, L) {
    H(this, "up", 0);
    H(this, "left", 0);
    H(this, "down", 0);
    H(this, "right", 0);
    H(this, "action", !1);
    H(this, "px", 22);
    H(this, "py", 12);
    H(this, "dirx", -1);
    H(this, "diry", 0);
    H(this, "planex", 0);
    H(this, "planey");
    this.planey = R / 2 / L;
  }
}
function Er({
  map: w,
  raystep: R = 2,
  shadows: L = !0,
  showFPS: re = !1,
  width: te = window.innerWidth,
  height: ne = window.innerHeight,
  objects: m,
  skybox: G,
  ceiling: S,
  floor: Z,
  speed: C = 15,
  rotSpeed: U = 2.5,
  ...ae
}) {
  var he;
  te = Math.min(window.innerWidth, te), ne = Math.min(window.innerHeight, ne);
  const E = Math.floor(te / R), P = Math.floor(ne / R), _e = P / 2;
  C /= 100, U /= 100, R < 1 && (R = 1);
  const Me = ur(null), u = (he = Me.current) == null ? void 0 : he.getContext("2d", { willReadFrequently: !0 }), _ = u == null ? void 0 : u.createImageData(E, P), W = _ == null ? void 0 : _.data, r = dr(() => new yr(E, P), [P, E]), [ue, Te] = xe([]), [oe, Oe] = xe(), [J, Se] = xe(), [Q, ge] = xe(), $ = [], ee = Array(E), [K, ke] = xe([]), F = Array.from(Array(w.length), () => Array(w[0].length).fill(0)), me = setInterval(() => {
    const n = r.up + r.down;
    if (n && m) {
      const i = w[Math.floor(r.px + r.dirx * n)][Math.floor(r.py)], c = F[Math.floor(r.px + r.dirx * n)][Math.floor(r.py)];
      (i === 0 || !m[i].collision || c === 1) && (r.px += r.dirx * n);
      const p = w[Math.floor(r.px)][Math.floor(r.py + r.diry * n)], g = F[Math.floor(r.px)][Math.floor(r.py + r.diry * n)];
      (p === 0 || !m[p].collision || g === 1) && (r.py += r.diry * n);
    }
    const o = -(r.left + r.right);
    if (o) {
      const i = r.dirx;
      r.dirx = r.dirx * Math.cos(o) - r.diry * Math.sin(o), r.diry = i * Math.sin(o) + r.diry * Math.cos(o);
      const c = r.planex;
      r.planex = r.planex * Math.cos(o) - r.planey * Math.sin(o), r.planey = c * Math.sin(o) + r.planey * Math.cos(o);
    }
    r.action && Pe(), De();
  }, 1e3 / 60), de = (n, o) => {
    let i = 0, c = "opening";
    const p = setInterval(() => {
      F[n][o] < 1 && c === "opening" ? F[n][o] += 0.025 : (i++, c = "open", F[n][o] = 1, i >= 60 * 3 && fe(Math.floor(r.px), Math.floor(r.py)) !== "door" && (clearInterval(p), c = "closing", Ce(n, o)));
    }, 1e3 / 60);
  }, Ce = (n, o) => {
    const i = setInterval(() => {
      F[n][o] > 0 ? F[n][o] -= 0.025 : (F[n][o] = 0, clearInterval(i));
    }, 16.666666666666668);
  }, fe = (n, o) => m && m[w[n][o]] ? m[w[n][o]].type : null, Pe = () => {
    const n = Math.floor(r.px + r.dirx), o = Math.floor(r.py + r.diry), i = Math.floor(r.px + r.dirx * 2), c = Math.floor(r.py + r.diry * 2);
    fe(n, o) === "door" && F[n][o] === 0 && de(n, o), fe(i, c) === "door" && F[i][c] === 0 && de(i, c), fe(Math.floor(r.px), Math.floor(r.py)) === "door" && de(Math.floor(r.px), Math.floor(r.py));
  }, De = () => window.requestAnimationFrame(() => {
    if (re) {
      const n = performance.now();
      for (; $.length > 0 && $[0] <= n - 1e3; )
        $.shift();
      $.push(n);
    }
    Ae(), pe(), _ && (u == null || u.putImageData(_, 0, 0)), je(), we(), Ee(), re && (u == null || u.fillText($.length.toString(), E / 50, P / 15 + 12));
  }), Ae = () => W == null ? void 0 : W.fill(0), je = () => {
    if (!oe)
      return;
    const n = E * 4, o = Math.atan2(r.diry, r.dirx) / Math.PI + 1, i = Math.floor(o * E * 2);
    u && (u.drawImage(oe, 0, 0, oe.width, oe.height / 2, i, 0, n, _e), u.drawImage(oe, 0, 0, oe.width, oe.height / 2, i - n, 0, n, _e));
  }, Ee = () => {
    if (!ue)
      return;
    const n = [];
    K.forEach((o, i) => {
      n.push({
        ...o,
        distance: (r.px - K[i].x) * (r.px - K[i].x) + (r.py - K[i].y) * (r.py - K[i].y)
      });
    }), n.sort((o, i) => i.distance - o.distance).forEach((o) => {
      const i = o.x - r.px, c = o.y - r.py, p = 1 / (r.planex * r.diry - r.planey * r.dirx), g = p * (r.diry * i - r.dirx * c), T = p * (-r.planey * i + r.planex * c);
      if (T > 0) {
        const Y = Math.floor(E / 2 * (1 + g / T)), N = Math.abs(Math.floor(P / T)), V = Math.floor(-N / 2 + P / 2), k = Math.abs(Math.floor(P / T));
        let b = Math.floor(-k / 2 + Y), d = b + k, x = b, A = d;
        b < -k && (b = -k), d > E + k && (d = d = E + k);
        const D = ue[o.object];
        for (let v = b; v <= d; v++)
          if (T >= ee[v])
            if (v === 0)
              x = 0;
            else if (v <= x + 1)
              x = v + 1;
            else {
              A = v;
              break;
            }
        if (x !== A && A > 0 && x < E && u) {
          const v = D.width / k;
          b = Math.floor((x - b) * v), b < 0 && (b = 0), d = Math.floor((A - x) * v) + 1, d > D.width && (d = D.width);
          let I = A - x;
          I < 0 && (I = 0), u.drawImage(ue[o.object], b, 0, d, D.height, x, V, I, N);
        }
      }
    });
  }, we = () => {
    if (W)
      for (let n = 0; n < E; n++) {
        const o = 2 * n / E - 1, i = r.dirx + r.planex * o, c = r.diry + r.planey * o;
        let p = Math.floor(r.px), g = Math.floor(r.py), T, Y, N = 0, V = 0;
        const k = i === 0 ? 1e30 : Math.abs(1 / i), b = c === 0 ? 1e30 : Math.abs(1 / c);
        let d, x, A, D = 0, v = 0;
        for (i < 0 ? (x = -1, T = (r.px - p) * k) : (x = 1, T = (p + 1 - r.px) * k), c < 0 ? (A = -1, Y = (r.py - g) * b) : (A = 1, Y = (g + 1 - r.py) * b); D === 0; ) {
          T < Y ? (T += k, p += x, v = 0) : (Y += b, g += A, v = 1);
          let B;
          const Ie = w[p][g];
          w[p][g] > 0 && (m && m[Ie].type === "wall" ? D = 1 : m && m[Ie].type === "door" && (D = 1, v == 1 ? (V = 0.5 * A, d = (g - r.py + V + (1 - A) / 2) / c, B = r.px + d * i, B -= Math.floor(B), Y - b / 2 < T ? 1 - B <= F[p][g] && (D = 0, V = 0) : (D = 0, v = 0, V = 0)) : (N = 0.5 * x, d = (p - r.px + N + (1 - x) / 2) / i, B = r.py + d * c, B -= Math.floor(B), T - k / 2 < Y ? 1 - B <= F[p][g] && (D = 0, N = 0) : (D = 0, v = 0, N = 0))));
        }
        v === 0 ? d = (p - r.px + N + (1 - x) * 0.5) / i : d = (g - r.py + V + (1 - A) * 0.5) / c;
        const I = Math.floor(P / d), le = -I * 0.5 + P * 0.5, q = ue[w[p][g] - 1];
        let j;
        v === 0 ? j = r.py + d * c : j = r.px + d * i, j -= Math.floor(j), m && m[w[p][g]].type === "door" && (j += F[p][g]);
        let ie = Math.floor(j * q.width);
        if (v == 0 && i > 0 && (ie = q.width - ie - 1), v == 1 && c < 0 && (ie = q.width - ie - 1), u && (u.drawImage(q, ie, 0, 1, q.height, n, le, 1, I), L)) {
          u.save();
          const B = d * 0.02 + v / 10;
          u.fillStyle = "rgba(0, 0, 0, " + B + ")", u.fillRect(n, le, 1, I), u.restore();
        }
        ee[n] = d;
      }
  }, pe = () => {
    if (!W || !Q && !J)
      return;
    const n = 0.5 * P;
    for (let o = 0; o < P; o++) {
      const i = r.dirx - r.planex, c = r.diry - r.planey, p = r.dirx + r.planex, g = r.diry + r.planey, T = Math.floor(o - n), Y = n / T, N = Y * (p - i) / E, V = Y * (g - c) / E;
      let k = r.px + Y * i, b = r.py + Y * c;
      const d = L ? o / P : 1;
      for (let x = 0; x < E; ++x) {
        if (T > 0) {
          const A = Math.floor(k), D = Math.floor(b), v = 4 * (o * E + x), I = 4 * ((P - o - 1) * E + x);
          if (Q) {
            const le = Math.floor(Q.width * (k - A)) & 63, q = Math.floor(Q.height * (b - D)) & 63, j = 4 * (Q.width * q + le);
            W[v + 0] = Q.data[j + 0] * d, W[v + 1] = Q.data[j + 1] * d, W[v + 2] = Q.data[j + 2] * d, W[v + 3] = 255;
          }
          if (J) {
            const le = Math.floor(J.width * (k - A)) & 63, q = Math.floor(J.height * (b - D)) & 63, j = 4 * (J.width * q + le);
            W[I + 0] = J.data[j + 0] * d, W[I + 1] = J.data[j + 1] * d, W[I + 2] = J.data[j + 2] * d, W[I + 3] = 255;
          }
        }
        k += N, b += V;
      }
    }
  };
  return ce(() => {
    u && (u.fillStyle = "red", u.font = "24px Arial", u.imageSmoothingEnabled = !1);
  }, [u, R]), ce(() => {
    if (m) {
      const n = Object.values(m), o = new Array(n.length);
      n.forEach((i, c) => {
        const p = new Image();
        p.onload = () => o[c] = p, p.src = i.src, p.crossOrigin = "Anonymous";
      }), Te(o);
    } else
      Te([]);
  }, [m]), ce(() => {
    if (G) {
      const n = new Image();
      n.onload = () => Oe(n), n.src = G, n.crossOrigin = "Anonymous";
    } else
      Oe(void 0);
  }, [G]), ce(() => {
    if (S) {
      const n = new Image();
      n.onload = () => {
        const o = document.createElement("canvas").getContext("2d");
        o == null || o.drawImage(n, 0, 0, n.width, n.height), Se(o == null ? void 0 : o.getImageData(0, 0, n.width, n.height));
      }, n.src = S, n.crossOrigin = "Anonymous";
    } else
      Se(void 0);
  }, [S]), ce(() => {
    const n = new Image();
    Z ? (n.onload = () => {
      const o = document.createElement("canvas").getContext("2d");
      o == null || o.drawImage(n, 0, 0, n.width, n.height), ge(o == null ? void 0 : o.getImageData(0, 0, n.width, n.height));
    }, n.src = Z, n.crossOrigin = "Anonymous") : ge(void 0);
  }, [Z]), ce(() => {
    const n = [];
    m && w.forEach((o, i) => {
      o.forEach((c, p) => {
        var g;
        ((g = m[c]) == null ? void 0 : g.type) === "sprite" && n.push({ x: i + 0.5, y: p + 0.5, object: c - 1 });
      });
    }), ke(n);
  }, [w, m]), ce(() => {
    console.log("useEffect inputs");
    const n = (i) => {
      switch (i.key) {
        case "z":
          r.up = C;
          break;
        case "d":
          r.right = U;
          break;
        case "s":
          r.down = -C;
          break;
        case "q":
          r.left = -U;
          break;
        case " ":
          r.action = !0;
          break;
      }
    }, o = (i) => {
      switch (i.key) {
        case "z":
          r.up = 0;
          break;
        case "d":
          r.right = 0;
          break;
        case "s":
          r.down = 0;
          break;
        case "q":
          r.left = 0;
          break;
        case " ":
          r.action = !1;
          break;
      }
    };
    return addEventListener("keydown", n), addEventListener("keyup", o), () => {
      removeEventListener("keydown", n), removeEventListener("keyup", o), clearInterval(me);
    };
  }, [r, me, U, C]), /* @__PURE__ */ vr.jsx("canvas", { style: {
    width: te,
    height: ne,
    imageRendering: "pixelated"
  }, ref: Me, width: E, height: P, ...ae });
}
export {
  Er as Raycaster
};
//# sourceMappingURL=index.es.js.map
