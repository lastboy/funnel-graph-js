(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FunnelGraph = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports = require('./src/js/main').default;

},{"./src/js/main":139}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.Rgb = Rgb;
exports.darker = exports.brighter = void 0;
exports.default = color;
exports.hsl = hsl;
exports.hslConvert = hslConvert;
exports.rgb = rgb;
exports.rgbConvert = rgbConvert;
var _define = _interopRequireWildcard(require("./define.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Color() {}
var _darker = exports.darker = 0.7;
var _brighter = exports.brighter = 1 / _darker;
var reI = "\\s*([+-]?\\d+)\\s*",
  reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  reHex = /^#([0-9a-f]{3,8})$/,
  reRgbInteger = new RegExp("^rgb\\(".concat(reI, ",").concat(reI, ",").concat(reI, "\\)$")),
  reRgbPercent = new RegExp("^rgb\\(".concat(reP, ",").concat(reP, ",").concat(reP, "\\)$")),
  reRgbaInteger = new RegExp("^rgba\\(".concat(reI, ",").concat(reI, ",").concat(reI, ",").concat(reN, "\\)$")),
  reRgbaPercent = new RegExp("^rgba\\(".concat(reP, ",").concat(reP, ",").concat(reP, ",").concat(reN, "\\)$")),
  reHslPercent = new RegExp("^hsl\\(".concat(reN, ",").concat(reP, ",").concat(reP, "\\)$")),
  reHslaPercent = new RegExp("^hsla\\(".concat(reN, ",").concat(reP, ",").concat(reP, ",").concat(reN, "\\)$"));
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function rgb() {
    return this;
  },
  clamp: function clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable: function displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#".concat(hex(this.r)).concat(hex(this.g)).concat(hex(this.b));
}
function rgb_formatHex8() {
  return "#".concat(hex(this.r)).concat(hex(this.g)).concat(hex(this.b)).concat(hex((isNaN(this.opacity) ? 1 : this.opacity) * 255));
}
function rgb_formatRgb() {
  var a = clampa(this.opacity);
  return "".concat(a === 1 ? "rgb(" : "rgba(").concat(clampi(this.r), ", ").concat(clampi(this.g), ", ").concat(clampi(this.b)).concat(a === 1 ? ")" : ", ".concat(a, ")"));
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    h = NaN,
    s = max - min,
    l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
      s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
      l = this.l,
      m2 = l + (l < 0.5 ? l : 1 - l) * s,
      m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  clamp: function clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable: function displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function formatHsl() {
    var a = clampa(this.opacity);
    return "".concat(a === 1 ? "hsl(" : "hsla(").concat(clamph(this.h), ", ").concat(clampt(this.s) * 100, "%, ").concat(clampt(this.l) * 100, "%").concat(a === 1 ? ")" : ", ".concat(a, ")"));
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

},{"./define.js":4}],3:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cubehelix = Cubehelix;
exports.default = cubehelix;
var _define = _interopRequireWildcard(require("./define.js"));
var _color = require("./color.js");
var _math = require("./math.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var A = -0.14861,
  B = +1.78277,
  C = -0.29227,
  D = -0.90649,
  E = +1.97294,
  ED = E * D,
  EB = E * B,
  BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
    bl = b - l,
    k = (E * (g - l) - C * bl) / D,
    s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
    // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * _math.degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function brighter(k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.radians,
      l = +this.l,
      a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
      cosh = Math.cos(h),
      sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));

},{"./color.js":2,"./define.js":4,"./math.js":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.extend = extend;
function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

},{}],5:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function get() {
    return _color.default;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function get() {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function get() {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function get() {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function get() {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function get() {
    return _lab.default;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function get() {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function get() {
    return _color.rgb;
  }
});
var _color = _interopRequireWildcard(require("./color.js"));
var _lab = _interopRequireWildcard(require("./lab.js"));
var _cubehelix = _interopRequireDefault(require("./cubehelix.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }

},{"./color.js":2,"./cubehelix.js":3,"./lab.js":6}],6:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hcl = Hcl;
exports.Lab = Lab;
exports.default = lab;
exports.gray = gray;
exports.hcl = hcl;
exports.lch = lch;
var _define = _interopRequireWildcard(require("./define.js"));
var _color = require("./color.js");
var _math = require("./math.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
  Xn = 0.96422,
  Yn = 1,
  Zn = 0.82521,
  t0 = 4 / 29,
  t1 = 6 / 29,
  t2 = 3 * t1 * t1,
  t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
    g = rgb2lrgb(o.g),
    b = rgb2lrgb(o.b),
    y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
    x,
    z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function rgb() {
    var y = (this.l + 16) / 116,
      x = isNaN(this.a) ? y : y + this.a / 500,
      z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math.degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function rgb() {
    return hcl2lab(this).rgb();
  }
}));

},{"./color.js":2,"./define.js":4,"./math.js":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.radians = exports.degrees = void 0;
var radians = exports.radians = Math.PI / 180;
var degrees = exports.degrees = 180 / Math.PI;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var noop = {
  value: function value() {}
};
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name: name
    };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function on(typename, callback) {
    var _ = this._,
      T = parseTypenames(typename + "", _),
      t,
      i = -1,
      n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function copy() {
    var copy = {},
      _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function call(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function apply(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name: name,
    value: callback
  });
  return type;
}
var _default = exports.default = dispatch;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dispatch", {
  enumerable: true,
  get: function get() {
    return _dispatch.default;
  }
});
var _dispatch = _interopRequireDefault(require("./dispatch.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./dispatch.js":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backOut = exports.backInOut = exports.backIn = void 0;
var overshoot = 1.70158;
var backIn = exports.backIn = function custom(s) {
  s = +s;
  function backIn(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }
  backIn.overshoot = custom;
  return backIn;
}(overshoot);
var backOut = exports.backOut = function custom(s) {
  s = +s;
  function backOut(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }
  backOut.overshoot = custom;
  return backOut;
}(overshoot);
var backInOut = exports.backInOut = function custom(s) {
  s = +s;
  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }
  backInOut.overshoot = custom;
  return backInOut;
}(overshoot);

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bounceIn = bounceIn;
exports.bounceInOut = bounceInOut;
exports.bounceOut = bounceOut;
var b1 = 4 / 11,
  b2 = 6 / 11,
  b3 = 8 / 11,
  b4 = 3 / 4,
  b5 = 9 / 11,
  b6 = 10 / 11,
  b7 = 15 / 16,
  b8 = 21 / 22,
  b9 = 63 / 64,
  b0 = 1 / b1 / b1;
function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}
function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circleIn = circleIn;
exports.circleInOut = circleInOut;
exports.circleOut = circleOut;
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}
function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicIn = cubicIn;
exports.cubicInOut = cubicInOut;
exports.cubicOut = cubicOut;
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  return --t * t * t + 1;
}
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elasticOut = exports.elasticInOut = exports.elasticIn = void 0;
var _math = require("./math.js");
var tau = 2 * Math.PI,
  amplitude = 1,
  period = 0.3;
var elasticIn = exports.elasticIn = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticIn(t) {
    return a * (0, _math.tpmt)(- --t) * Math.sin((s - t) / p);
  }
  elasticIn.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticIn.period = function (p) {
    return custom(a, p);
  };
  return elasticIn;
}(amplitude, period);
var elasticOut = exports.elasticOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticOut(t) {
    return 1 - a * (0, _math.tpmt)(t = +t) * Math.sin((t + s) / p);
  }
  elasticOut.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticOut.period = function (p) {
    return custom(a, p);
  };
  return elasticOut;
}(amplitude, period);
var elasticInOut = exports.elasticInOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0 ? a * (0, _math.tpmt)(-t) * Math.sin((s - t) / p) : 2 - a * (0, _math.tpmt)(t) * Math.sin((s + t) / p)) / 2;
  }
  elasticInOut.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticInOut.period = function (p) {
    return custom(a, p);
  };
  return elasticInOut;
}(amplitude, period);

},{"./math.js":18}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expIn = expIn;
exports.expInOut = expInOut;
exports.expOut = expOut;
var _math = require("./math.js");
function expIn(t) {
  return (0, _math.tpmt)(1 - +t);
}
function expOut(t) {
  return 1 - (0, _math.tpmt)(t);
}
function expInOut(t) {
  return ((t *= 2) <= 1 ? (0, _math.tpmt)(1 - t) : 2 - (0, _math.tpmt)(t - 1)) / 2;
}

},{"./math.js":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "easeBack", {
  enumerable: true,
  get: function get() {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeBackIn", {
  enumerable: true,
  get: function get() {
    return _back.backIn;
  }
});
Object.defineProperty(exports, "easeBackInOut", {
  enumerable: true,
  get: function get() {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeBackOut", {
  enumerable: true,
  get: function get() {
    return _back.backOut;
  }
});
Object.defineProperty(exports, "easeBounce", {
  enumerable: true,
  get: function get() {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeBounceIn", {
  enumerable: true,
  get: function get() {
    return _bounce.bounceIn;
  }
});
Object.defineProperty(exports, "easeBounceInOut", {
  enumerable: true,
  get: function get() {
    return _bounce.bounceInOut;
  }
});
Object.defineProperty(exports, "easeBounceOut", {
  enumerable: true,
  get: function get() {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeCircle", {
  enumerable: true,
  get: function get() {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeCircleIn", {
  enumerable: true,
  get: function get() {
    return _circle.circleIn;
  }
});
Object.defineProperty(exports, "easeCircleInOut", {
  enumerable: true,
  get: function get() {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeCircleOut", {
  enumerable: true,
  get: function get() {
    return _circle.circleOut;
  }
});
Object.defineProperty(exports, "easeCubic", {
  enumerable: true,
  get: function get() {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easeCubicIn", {
  enumerable: true,
  get: function get() {
    return _cubic.cubicIn;
  }
});
Object.defineProperty(exports, "easeCubicInOut", {
  enumerable: true,
  get: function get() {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easeCubicOut", {
  enumerable: true,
  get: function get() {
    return _cubic.cubicOut;
  }
});
Object.defineProperty(exports, "easeElastic", {
  enumerable: true,
  get: function get() {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeElasticIn", {
  enumerable: true,
  get: function get() {
    return _elastic.elasticIn;
  }
});
Object.defineProperty(exports, "easeElasticInOut", {
  enumerable: true,
  get: function get() {
    return _elastic.elasticInOut;
  }
});
Object.defineProperty(exports, "easeElasticOut", {
  enumerable: true,
  get: function get() {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeExp", {
  enumerable: true,
  get: function get() {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeExpIn", {
  enumerable: true,
  get: function get() {
    return _exp.expIn;
  }
});
Object.defineProperty(exports, "easeExpInOut", {
  enumerable: true,
  get: function get() {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeExpOut", {
  enumerable: true,
  get: function get() {
    return _exp.expOut;
  }
});
Object.defineProperty(exports, "easeLinear", {
  enumerable: true,
  get: function get() {
    return _linear.linear;
  }
});
Object.defineProperty(exports, "easePoly", {
  enumerable: true,
  get: function get() {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easePolyIn", {
  enumerable: true,
  get: function get() {
    return _poly.polyIn;
  }
});
Object.defineProperty(exports, "easePolyInOut", {
  enumerable: true,
  get: function get() {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easePolyOut", {
  enumerable: true,
  get: function get() {
    return _poly.polyOut;
  }
});
Object.defineProperty(exports, "easeQuad", {
  enumerable: true,
  get: function get() {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeQuadIn", {
  enumerable: true,
  get: function get() {
    return _quad.quadIn;
  }
});
Object.defineProperty(exports, "easeQuadInOut", {
  enumerable: true,
  get: function get() {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeQuadOut", {
  enumerable: true,
  get: function get() {
    return _quad.quadOut;
  }
});
Object.defineProperty(exports, "easeSin", {
  enumerable: true,
  get: function get() {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeSinIn", {
  enumerable: true,
  get: function get() {
    return _sin.sinIn;
  }
});
Object.defineProperty(exports, "easeSinInOut", {
  enumerable: true,
  get: function get() {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeSinOut", {
  enumerable: true,
  get: function get() {
    return _sin.sinOut;
  }
});
var _linear = require("./linear.js");
var _quad = require("./quad.js");
var _cubic = require("./cubic.js");
var _poly = require("./poly.js");
var _sin = require("./sin.js");
var _exp = require("./exp.js");
var _circle = require("./circle.js");
var _bounce = require("./bounce.js");
var _back = require("./back.js");
var _elastic = require("./elastic.js");

},{"./back.js":10,"./bounce.js":11,"./circle.js":12,"./cubic.js":13,"./elastic.js":14,"./exp.js":15,"./linear.js":17,"./poly.js":19,"./quad.js":20,"./sin.js":21}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = void 0;
var linear = exports.linear = function linear(t) {
  return +t;
};

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tpmt = tpmt;
// tpmt is two power minus ten times t scaled to [0,1]
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyOut = exports.polyInOut = exports.polyIn = void 0;
var exponent = 3;
var polyIn = exports.polyIn = function custom(e) {
  e = +e;
  function polyIn(t) {
    return Math.pow(t, e);
  }
  polyIn.exponent = custom;
  return polyIn;
}(exponent);
var polyOut = exports.polyOut = function custom(e) {
  e = +e;
  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }
  polyOut.exponent = custom;
  return polyOut;
}(exponent);
var polyInOut = exports.polyInOut = function custom(e) {
  e = +e;
  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }
  polyInOut.exponent = custom;
  return polyInOut;
}(exponent);

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quadIn = quadIn;
exports.quadInOut = quadInOut;
exports.quadOut = quadOut;
function quadIn(t) {
  return t * t;
}
function quadOut(t) {
  return t * (2 - t);
}
function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinIn = sinIn;
exports.sinInOut = sinInOut;
exports.sinOut = sinOut;
var pi = Math.PI,
  halfPi = pi / 2;
function sinIn(t) {
  return +t === 1 ? 1 : 1 - Math.cos(t * halfPi);
}
function sinOut(t) {
  return Math.sin(t * halfPi);
}
function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}

},{}],22:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.genericArray = genericArray;
var _value = _interopRequireDefault(require("./value.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(a, b) {
  return ((0, _numberArray.isNumberArray)(b) ? _numberArray.default : genericArray)(a, b);
}
function genericArray(a, b) {
  var nb = b ? b.length : 0,
    na = a ? Math.min(nb, a.length) : 0,
    x = new Array(na),
    c = new Array(nb),
    i;
  for (i = 0; i < na; ++i) x[i] = (0, _value.default)(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

},{"./numberArray.js":36,"./value.js":46}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basis = basis;
exports.default = _default;
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
    t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function _default(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
      v1 = values[i],
      v2 = values[i + 1],
      v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
      v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _basis = require("./basis.js");
function _default(values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
      v0 = values[(i + n - 1) % n],
      v1 = values[i % n],
      v2 = values[(i + 1) % n],
      v3 = values[(i + 2) % n];
    return (0, _basis.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}

},{"./basis.js":23}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nogamma;
exports.gamma = gamma;
exports.hue = hue;
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constant.default)(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : (0, _constant.default)(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0, _constant.default)(isNaN(a) ? b : a);
}

},{"./constant.js":26}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = function _default(x) {
  return function () {
    return x;
  };
};

},{}],27:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cubehelixLong = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix(start, end) {
      var h = hue((start = (0, _d3Color.cubehelix)(start)).h, (end = (0, _d3Color.cubehelix)(end)).h),
        s = (0, _color.default)(start.s, end.s),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }
    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  }(1);
}
var _default = exports.default = cubehelix(_color.hue);
var cubehelixLong = exports.cubehelixLong = cubehelix(_color.default);

},{"./color.js":25,"d3-color":5}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

},{}],30:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hclLong = exports.default = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function hcl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hcl)(start)).h, (end = (0, _d3Color.hcl)(end)).h),
      c = (0, _color.default)(start.c, end.c),
      l = (0, _color.default)(start.l, end.l),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var _default = exports.default = hcl(_color.hue);
var hclLong = exports.hclLong = hcl(_color.default);

},{"./color.js":25,"d3-color":5}],31:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hslLong = exports.default = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function hsl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hsl)(start)).h, (end = (0, _d3Color.hsl)(end)).h),
      s = (0, _color.default)(start.s, end.s),
      l = (0, _color.default)(start.l, end.l),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var _default = exports.default = hsl(_color.hue);
var hslLong = exports.hslLong = hsl(_color.default);

},{"./color.js":25,"d3-color":5}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _color = require("./color.js");
function _default(a, b) {
  var i = (0, _color.hue)(+a, +b);
  return function (t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}

},{"./color.js":25}],33:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function get() {
    return _value.default;
  }
});
Object.defineProperty(exports, "interpolateArray", {
  enumerable: true,
  get: function get() {
    return _array.default;
  }
});
Object.defineProperty(exports, "interpolateBasis", {
  enumerable: true,
  get: function get() {
    return _basis.default;
  }
});
Object.defineProperty(exports, "interpolateBasisClosed", {
  enumerable: true,
  get: function get() {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelix", {
  enumerable: true,
  get: function get() {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelixLong", {
  enumerable: true,
  get: function get() {
    return _cubehelix.cubehelixLong;
  }
});
Object.defineProperty(exports, "interpolateDate", {
  enumerable: true,
  get: function get() {
    return _date.default;
  }
});
Object.defineProperty(exports, "interpolateDiscrete", {
  enumerable: true,
  get: function get() {
    return _discrete.default;
  }
});
Object.defineProperty(exports, "interpolateHcl", {
  enumerable: true,
  get: function get() {
    return _hcl.default;
  }
});
Object.defineProperty(exports, "interpolateHclLong", {
  enumerable: true,
  get: function get() {
    return _hcl.hclLong;
  }
});
Object.defineProperty(exports, "interpolateHsl", {
  enumerable: true,
  get: function get() {
    return _hsl.default;
  }
});
Object.defineProperty(exports, "interpolateHslLong", {
  enumerable: true,
  get: function get() {
    return _hsl.hslLong;
  }
});
Object.defineProperty(exports, "interpolateHue", {
  enumerable: true,
  get: function get() {
    return _hue.default;
  }
});
Object.defineProperty(exports, "interpolateLab", {
  enumerable: true,
  get: function get() {
    return _lab.default;
  }
});
Object.defineProperty(exports, "interpolateNumber", {
  enumerable: true,
  get: function get() {
    return _number.default;
  }
});
Object.defineProperty(exports, "interpolateNumberArray", {
  enumerable: true,
  get: function get() {
    return _numberArray.default;
  }
});
Object.defineProperty(exports, "interpolateObject", {
  enumerable: true,
  get: function get() {
    return _object.default;
  }
});
Object.defineProperty(exports, "interpolateRgb", {
  enumerable: true,
  get: function get() {
    return _rgb.default;
  }
});
Object.defineProperty(exports, "interpolateRgbBasis", {
  enumerable: true,
  get: function get() {
    return _rgb.rgbBasis;
  }
});
Object.defineProperty(exports, "interpolateRgbBasisClosed", {
  enumerable: true,
  get: function get() {
    return _rgb.rgbBasisClosed;
  }
});
Object.defineProperty(exports, "interpolateRound", {
  enumerable: true,
  get: function get() {
    return _round.default;
  }
});
Object.defineProperty(exports, "interpolateString", {
  enumerable: true,
  get: function get() {
    return _string.default;
  }
});
Object.defineProperty(exports, "interpolateTransformCss", {
  enumerable: true,
  get: function get() {
    return _index.interpolateTransformCss;
  }
});
Object.defineProperty(exports, "interpolateTransformSvg", {
  enumerable: true,
  get: function get() {
    return _index.interpolateTransformSvg;
  }
});
Object.defineProperty(exports, "interpolateZoom", {
  enumerable: true,
  get: function get() {
    return _zoom.default;
  }
});
Object.defineProperty(exports, "piecewise", {
  enumerable: true,
  get: function get() {
    return _piecewise.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function get() {
    return _quantize.default;
  }
});
var _value = _interopRequireDefault(require("./value.js"));
var _array = _interopRequireDefault(require("./array.js"));
var _basis = _interopRequireDefault(require("./basis.js"));
var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));
var _date = _interopRequireDefault(require("./date.js"));
var _discrete = _interopRequireDefault(require("./discrete.js"));
var _hue = _interopRequireDefault(require("./hue.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _numberArray = _interopRequireDefault(require("./numberArray.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _round = _interopRequireDefault(require("./round.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _index = require("./transform/index.js");
var _zoom = _interopRequireDefault(require("./zoom.js"));
var _rgb = _interopRequireWildcard(require("./rgb.js"));
var _hsl = _interopRequireWildcard(require("./hsl.js"));
var _lab = _interopRequireDefault(require("./lab.js"));
var _hcl = _interopRequireWildcard(require("./hcl.js"));
var _cubehelix = _interopRequireWildcard(require("./cubehelix.js"));
var _piecewise = _interopRequireDefault(require("./piecewise.js"));
var _quantize = _interopRequireDefault(require("./quantize.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./array.js":22,"./basis.js":23,"./basisClosed.js":24,"./cubehelix.js":27,"./date.js":28,"./discrete.js":29,"./hcl.js":30,"./hsl.js":31,"./hue.js":32,"./lab.js":34,"./number.js":35,"./numberArray.js":36,"./object.js":37,"./piecewise.js":38,"./quantize.js":39,"./rgb.js":40,"./round.js":41,"./string.js":42,"./transform/index.js":44,"./value.js":46,"./zoom.js":47}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lab;
var _d3Color = require("d3-color");
var _color = _interopRequireDefault(require("./color.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function lab(start, end) {
  var l = (0, _color.default)((start = (0, _d3Color.lab)(start)).l, (end = (0, _d3Color.lab)(end)).l),
    a = (0, _color.default)(start.a, end.a),
    b = (0, _color.default)(start.b, end.b),
    opacity = (0, _color.default)(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

},{"./color.js":25,"d3-color":5}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.isNumberArray = isNumberArray;
function _default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
    c = b.slice(),
    i;
  return function (t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _value = _interopRequireDefault(require("./value.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _default(a, b) {
  var i = {},
    c = {},
    k;
  if (a === null || _typeof(a) !== "object") a = {};
  if (b === null || _typeof(b) !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = (0, _value.default)(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function (t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

},{"./value.js":46}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = piecewise;
var _value = _interopRequireDefault(require("./value.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function piecewise(interpolate, values) {
  if (values === undefined) values = interpolate, interpolate = _value.default;
  var i = 0,
    n = values.length - 1,
    v = values[0],
    I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function (t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}

},{"./value.js":46}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

},{}],40:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbBasisClosed = exports.rgbBasis = exports.default = void 0;
var _d3Color = require("d3-color");
var _basis = _interopRequireDefault(require("./basis.js"));
var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = function rgbGamma(y) {
  var color = (0, _color.gamma)(y);
  function rgb(start, end) {
    var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r),
      g = color(start.g, end.g),
      b = color(start.b, end.b),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb.gamma = rgbGamma;
  return rgb;
}(1);
function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
      r = new Array(n),
      g = new Array(n),
      b = new Array(n),
      i,
      color;
    for (i = 0; i < n; ++i) {
      color = (0, _d3Color.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}
var rgbBasis = exports.rgbBasis = rgbSpline(_basis.default);
var rgbBasisClosed = exports.rgbBasisClosed = rgbSpline(_basisClosed.default);

},{"./basis.js":23,"./basisClosed.js":24,"./color.js":25,"d3-color":5}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  reB = new RegExp(reA.source, "g");
function zero(b) {
  return function () {
    return b;
  };
}
function one(b) {
  return function (t) {
    return b(t) + "";
  };
}
function _default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
    // scan index for next number in b
    am,
    // current match in a
    bm,
    // current match in b
    bs,
    // string preceding current number in b, if any
    i = -1,
    // index in s
    s = [],
    // string constants and placeholders
    q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: (0, _number.default)(am, bm)
      });
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  });
}

},{"./number.js":35}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.identity = void 0;
var degrees = 180 / Math.PI;
var identity = exports.identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function _default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateTransformSvg = exports.interpolateTransformCss = void 0;
var _number = _interopRequireDefault(require("../number.js"));
var _parse = require("./parse.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function (a, b) {
    var s = [],
      // string constants and placeholders
      q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function (t) {
      var i = -1,
        n = q.length,
        o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = exports.interpolateTransformCss = interpolateTransform(_parse.parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = exports.interpolateTransformSvg = interpolateTransform(_parse.parseSvg, ", ", ")", ")");

},{"../number.js":35,"./parse.js":45}],45:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCss = parseCss;
exports.parseSvg = parseSvg;
var _decompose = _interopRequireWildcard(require("./decompose.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  var m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? _decompose.identity : (0, _decompose.default)(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return _decompose.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose.identity;
  value = value.matrix;
  return (0, _decompose.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}

},{"./decompose.js":43}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Color = require("d3-color");
var _rgb = _interopRequireDefault(require("./rgb.js"));
var _array = require("./array.js");
var _date = _interopRequireDefault(require("./date.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _default(a, b) {
  var t = _typeof(b),
    c;
  return b == null || t === "boolean" ? (0, _constant.default)(b) : (t === "number" ? _number.default : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgb.default) : _string.default : b instanceof _d3Color.color ? _rgb.default : b instanceof Date ? _date.default : (0, _numberArray.isNumberArray)(b) ? _numberArray.default : Array.isArray(b) ? _array.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object.default : _number.default)(a, b);
}

},{"./array.js":22,"./constant.js":26,"./date.js":28,"./number.js":35,"./numberArray.js":36,"./object.js":37,"./rgb.js":40,"./string.js":42,"d3-color":5}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var _default = exports.default = function zoomRho(rho, rho2, rho4) {
  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function i(t) {
        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function i(t) {
        var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }
    i.duration = S * 1000 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function (_) {
    var _1 = Math.max(1e-3, +_),
      _2 = _1 * _1,
      _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

},{}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = array;
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

},{}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function () {
    return x;
  };
}

},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("./creator.js"));
var _select = _interopRequireDefault(require("./select.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}

},{"./creator.js":51,"./select.js":59}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("./namespace.js"));
var _namespaces = require("./namespaces.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
      uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

},{"./namespace.js":55,"./namespaces.js":56}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function get() {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function get() {
    return _creator.default;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function get() {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function get() {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function get() {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function get() {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "pointer", {
  enumerable: true,
  get: function get() {
    return _pointer.default;
  }
});
Object.defineProperty(exports, "pointers", {
  enumerable: true,
  get: function get() {
    return _pointers.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function get() {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function get() {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function get() {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function get() {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function get() {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function get() {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function get() {
    return _window.default;
  }
});
var _create = _interopRequireDefault(require("./create.js"));
var _creator = _interopRequireDefault(require("./creator.js"));
var _local = _interopRequireDefault(require("./local.js"));
var _matcher = _interopRequireDefault(require("./matcher.js"));
var _namespace = _interopRequireDefault(require("./namespace.js"));
var _namespaces = _interopRequireDefault(require("./namespaces.js"));
var _pointer = _interopRequireDefault(require("./pointer.js"));
var _pointers = _interopRequireDefault(require("./pointers.js"));
var _select = _interopRequireDefault(require("./select.js"));
var _selectAll = _interopRequireDefault(require("./selectAll.js"));
var _index = _interopRequireDefault(require("./selection/index.js"));
var _selector = _interopRequireDefault(require("./selector.js"));
var _selectorAll = _interopRequireDefault(require("./selectorAll.js"));
var _style = require("./selection/style.js");
var _window = _interopRequireDefault(require("./window.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./create.js":50,"./creator.js":51,"./local.js":53,"./matcher.js":54,"./namespace.js":55,"./namespaces.js":56,"./pointer.js":57,"./pointers.js":58,"./select.js":59,"./selectAll.js":60,"./selection/index.js":75,"./selection/style.js":95,"./selector.js":97,"./selectorAll.js":98,"./window.js":100}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function get(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function set(node, value) {
    return node[this._] = value;
  },
  remove: function remove(node) {
    return this._ in node && delete node[this._];
  },
  toString: function toString() {
    return this._;
  }
};

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childMatcher = childMatcher;
exports.default = _default;
function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function (node) {
    return node.matches(selector);
  };
}

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespaces = _interopRequireDefault(require("./namespaces.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  var prefix = name += "",
    i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name; // eslint-disable-line no-prototype-builtins
}

},{"./namespaces.js":56}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhtml = exports.default = void 0;
var xhtml = exports.xhtml = "http://www.w3.org/1999/xhtml";
var _default = exports.default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(event, node) {
  event = (0, _sourceEvent.default)(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

},{"./sourceEvent.js":99}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _pointer = _interopRequireDefault(require("./pointer.js"));
var _sourceEvent = _interopRequireDefault(require("./sourceEvent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(events, node) {
  if (events.target) {
    // i.e., instanceof Event, not TouchList or iterable
    events = (0, _sourceEvent.default)(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, function (event) {
    return (0, _pointer.default)(event, node);
  });
}

},{"./pointer.js":57,"./sourceEvent.js":99}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./selection/index.js");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}

},{"./selection/index.js":75}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _array = _interopRequireDefault(require("./array.js"));
var _index = require("./selection/index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([(0, _array.default)(selector)], _index.root);
}

},{"./array.js":48,"./selection/index.js":75}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}

},{"../creator.js":51}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("../namespace.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function _default(name, value) {
  var fullname = (0, _namespace.default)(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

},{"../namespace.js":55}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function add(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function remove(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function contains(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function _default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()),
      i = -1,
      n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function selection_cloneShallow() {
  var clone = this.cloneNode(false),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _enter = require("./enter.js");
var _constant = _interopRequireDefault(require("../constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
    node,
    groupLength = group.length,
    dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
    node,
    nodeByKeyValue = new Map(),
    groupLength = group.length,
    dataLength = data.length,
    keyValues = new Array(groupLength),
    keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function _default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex,
    parents = this._parents,
    groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
      dataLength = data.length,
      enterGroup = enter[j] = new Array(dataLength),
      updateGroup = update[j] = new Array(dataLength),
      exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }
  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return _typeof(data) === "object" && "length" in data ? data // Array, TypedArray, NodeList, array-like
  : Array.from(data); // Map, Set, iterable, string, or anything else
}

},{"../constant.js":49,"./enter.js":71,"./index.js":75}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _window = _interopRequireDefault(require("../window.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
    event = window.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}

},{"../window.js":100}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

},{}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return !this.node();
}

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterNode = EnterNode;
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse.js"));
var _index = require("./index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}
function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function appendChild(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function insertBefore(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function querySelector(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function querySelectorAll(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

},{"./index.js":75,"./sparse.js":94}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse.js"));
var _index = require("./index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}

},{"./index.js":75,"./sparse.js":94}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _matcher = _interopRequireDefault(require("../matcher.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}

},{"../matcher.js":54,"./index.js":75}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

},{}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.root = exports.default = void 0;
var _select = _interopRequireDefault(require("./select.js"));
var _selectAll = _interopRequireDefault(require("./selectAll.js"));
var _selectChild = _interopRequireDefault(require("./selectChild.js"));
var _selectChildren = _interopRequireDefault(require("./selectChildren.js"));
var _filter = _interopRequireDefault(require("./filter.js"));
var _data = _interopRequireDefault(require("./data.js"));
var _enter = _interopRequireDefault(require("./enter.js"));
var _exit = _interopRequireDefault(require("./exit.js"));
var _join = _interopRequireDefault(require("./join.js"));
var _merge = _interopRequireDefault(require("./merge.js"));
var _order = _interopRequireDefault(require("./order.js"));
var _sort = _interopRequireDefault(require("./sort.js"));
var _call = _interopRequireDefault(require("./call.js"));
var _nodes = _interopRequireDefault(require("./nodes.js"));
var _node = _interopRequireDefault(require("./node.js"));
var _size = _interopRequireDefault(require("./size.js"));
var _empty = _interopRequireDefault(require("./empty.js"));
var _each = _interopRequireDefault(require("./each.js"));
var _attr = _interopRequireDefault(require("./attr.js"));
var _style = _interopRequireDefault(require("./style.js"));
var _property = _interopRequireDefault(require("./property.js"));
var _classed = _interopRequireDefault(require("./classed.js"));
var _text = _interopRequireDefault(require("./text.js"));
var _html = _interopRequireDefault(require("./html.js"));
var _raise = _interopRequireDefault(require("./raise.js"));
var _lower = _interopRequireDefault(require("./lower.js"));
var _append = _interopRequireDefault(require("./append.js"));
var _insert = _interopRequireDefault(require("./insert.js"));
var _remove = _interopRequireDefault(require("./remove.js"));
var _clone = _interopRequireDefault(require("./clone.js"));
var _datum = _interopRequireDefault(require("./datum.js"));
var _on = _interopRequireDefault(require("./on.js"));
var _dispatch = _interopRequireDefault(require("./dispatch.js"));
var _iterator = _interopRequireDefault(require("./iterator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var root = exports.root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = _defineProperty({
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  selectChild: _selectChild.default,
  selectChildren: _selectChildren.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  selection: selection_selection,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default
}, Symbol.iterator, _iterator.default);
var _default = exports.default = selection;

},{"./append.js":61,"./attr.js":62,"./call.js":63,"./classed.js":64,"./clone.js":65,"./data.js":66,"./datum.js":67,"./dispatch.js":68,"./each.js":69,"./empty.js":70,"./enter.js":71,"./exit.js":72,"./filter.js":73,"./html.js":74,"./insert.js":76,"./iterator.js":77,"./join.js":78,"./lower.js":79,"./merge.js":80,"./node.js":81,"./nodes.js":82,"./on.js":83,"./order.js":84,"./property.js":85,"./raise.js":86,"./remove.js":87,"./select.js":88,"./selectAll.js":89,"./selectChild.js":90,"./selectChildren.js":91,"./size.js":92,"./sort.js":93,"./style.js":95,"./text.js":96}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator.js"));
var _selector = _interopRequireDefault(require("../selector.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function constantNull() {
  return null;
}
function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
    select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

},{"../creator.js":51,"../selector.js":97}],77:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _callee;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(_callee);
function _callee() {
  var groups, j, m, group, i, n, node;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        groups = this._groups, j = 0, m = groups.length;
      case 1:
        if (!(j < m)) {
          _context.next = 13;
          break;
        }
        group = groups[j], i = 0, n = group.length;
      case 3:
        if (!(i < n)) {
          _context.next = 10;
          break;
        }
        if (!(node = group[i])) {
          _context.next = 7;
          break;
        }
        _context.next = 7;
        return node;
      case 7:
        ++i;
        _context.next = 3;
        break;
      case 10:
        ++j;
        _context.next = 1;
        break;
      case 13:
      case "end":
        return _context.stop();
    }
  }, _marked, this);
}

},{}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

},{}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _default() {
  return this.each(lower);
}

},{}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
function _default(context) {
  var selection = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new _index.Selection(merges, this._parents);
}

},{"./index.js":75}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return Array.from(this);
}

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function contextListener(listener) {
  return function (event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}
function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function () {
    var on = this.__on,
      o,
      listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      options: options
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}
function _default(typename, value, options) {
  var typenames = parseTypenames(typename + ""),
    i,
    n = typenames.length,
    t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}
function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

},{}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function _default() {
  return this.each(raise);
}

},{}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function _default() {
  return this.each(remove);
}

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _selector = _interopRequireDefault(require("../selector.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}

},{"../selector.js":97,"./index.js":75}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _array = _interopRequireDefault(require("../array.js"));
var _selectorAll = _interopRequireDefault(require("../selectorAll.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function arrayAll(select) {
  return function () {
    return (0, _array.default)(select.apply(this, arguments));
  };
}
function _default(select) {
  if (typeof select === "function") select = arrayAll(select);else select = (0, _selectorAll.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, parents);
}

},{"../array.js":48,"../selectorAll.js":98,"./index.js":75}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _matcher = require("../matcher.js");
var find = Array.prototype.find;
function childFind(match) {
  return function () {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function _default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : (0, _matcher.childMatcher)(match)));
}

},{"../matcher.js":54}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _matcher = require("../matcher.js");
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function () {
    return filter.call(this.children, match);
  };
}
function _default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : (0, _matcher.childMatcher)(match)));
}

},{"../matcher.js":54}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _default() {
  var size = 0;
  var _iterator = _createForOfIteratorHelper(this),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      ++size;
    } // eslint-disable-line no-unused-vars
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return size;
}

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
function _default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new _index.Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

},{"./index.js":75}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(update) {
  return new Array(update.length);
}

},{}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;
var _window = _interopRequireDefault(require("../window.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}
function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}

},{"../window.js":100}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

},{}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function none() {}
function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}

},{}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function empty() {
  return [];
}
function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}

},{}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(event) {
  var sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

},{}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
  || node.document && node // node is a Window
  || node.defaultView; // node is a Document
}

},{}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interval", {
  enumerable: true,
  get: function get() {
    return _interval.default;
  }
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function get() {
    return _timer.now;
  }
});
Object.defineProperty(exports, "timeout", {
  enumerable: true,
  get: function get() {
    return _timeout.default;
  }
});
Object.defineProperty(exports, "timer", {
  enumerable: true,
  get: function get() {
    return _timer.timer;
  }
});
Object.defineProperty(exports, "timerFlush", {
  enumerable: true,
  get: function get() {
    return _timer.timerFlush;
  }
});
var _timer = require("./timer.js");
var _timeout = _interopRequireDefault(require("./timeout.js"));
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./interval.js":102,"./timeout.js":103,"./timer.js":104}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _timer = require("./timer.js");
function _default(callback, delay, time) {
  var t = new _timer.Timer(),
    total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  t._restart = t.restart;
  t.restart = function (callback, delay, time) {
    delay = +delay, time = time == null ? (0, _timer.now)() : +time;
    t._restart(function tick(elapsed) {
      elapsed += total;
      t._restart(tick, total += delay, time);
      callback(elapsed);
    }, delay, time);
  };
  t.restart(callback, delay, time);
  return t;
}

},{"./timer.js":104}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _timer = require("./timer.js");
function _default(callback, delay, time) {
  var t = new _timer.Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function (elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

},{"./timer.js":104}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = Timer;
exports.now = now;
exports.timer = timer;
exports.timerFlush = timerFlush;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var frame = 0,
  // is an animation frame pending?
  timeout = 0,
  // is a timeout pending?
  interval = 0,
  // are any timers active?
  pokeDelay = 1000,
  // how frequently we check for clock skew
  taskHead,
  taskTail,
  clockLast = 0,
  clockNow = 0,
  clockSkew = 0,
  clock = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === "object" && performance.now ? performance : Date,
  setFrame = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
    setTimeout(f, 17);
  };
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function restart(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function stop() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead,
    e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now = clock.now(),
    delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
  var t0,
    t1 = taskHead,
    t2,
    time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

},{}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./transition/index.js");
var _schedule = require("./transition/schedule.js");
var root = [null];
function _default(node, name) {
  var schedules = node.__transition,
    schedule,
    i;
  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > _schedule.SCHEDULED && schedule.name === name) {
        return new _index.Transition([[node]], root, name, +i);
      }
    }
  }
  return null;
}

},{"./transition/index.js":119,"./transition/schedule.js":124}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "active", {
  enumerable: true,
  get: function get() {
    return _active.default;
  }
});
Object.defineProperty(exports, "interrupt", {
  enumerable: true,
  get: function get() {
    return _interrupt.default;
  }
});
Object.defineProperty(exports, "transition", {
  enumerable: true,
  get: function get() {
    return _index2.default;
  }
});
require("./selection/index.js");
var _index2 = _interopRequireDefault(require("./transition/index.js"));
var _active = _interopRequireDefault(require("./active.js"));
var _interrupt = _interopRequireDefault(require("./interrupt.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./active.js":105,"./interrupt.js":107,"./selection/index.js":108,"./transition/index.js":119}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./transition/schedule.js");
function _default(node, name) {
  var schedules = node.__transition,
    schedule,
    active,
    empty = true,
    i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty = false;
      continue;
    }
    active = schedule.state > _schedule.STARTING && schedule.state < _schedule.ENDING;
    schedule.state = _schedule.ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty) delete node.__transition;
}

},{"./transition/schedule.js":124}],108:[function(require,module,exports){
"use strict";

var _d3Selection = require("d3-selection");
var _interrupt = _interopRequireDefault(require("./interrupt.js"));
var _transition = _interopRequireDefault(require("./transition.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_d3Selection.selection.prototype.interrupt = _interrupt.default;
_d3Selection.selection.prototype.transition = _transition.default;

},{"./interrupt.js":109,"./transition.js":110,"d3-selection":52}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _interrupt = _interopRequireDefault(require("../interrupt.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  return this.each(function () {
    (0, _interrupt.default)(this, name);
  });
}

},{"../interrupt.js":107}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("../transition/index.js");
var _schedule = _interopRequireDefault(require("../transition/schedule.js"));
var _d3Ease = require("d3-ease");
var _d3Timer = require("d3-timer");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: _d3Ease.easeCubicInOut
};
function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error("transition ".concat(id, " not found"));
    }
  }
  return timing;
}
function _default(name) {
  var id, timing;
  if (name instanceof _index.Transition) {
    id = name._id, name = name._name;
  } else {
    id = (0, _index.newId)(), (timing = defaultTiming).time = (0, _d3Timer.now)(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        (0, _schedule.default)(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }
  return new _index.Transition(groups, this._parents, name, id);
}

},{"../transition/index.js":119,"../transition/schedule.js":124,"d3-ease":16,"d3-timer":101}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _tween = require("./tween.js");
var _interpolate = _interopRequireDefault(require("./interpolate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function _default(name, value) {
  var fullname = (0, _d3Selection.namespace)(name),
    i = fullname === "transform" ? _d3Interpolate.interpolateTransformSvg : _interpolate.default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0, _tween.tweenValue)(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}

},{"./interpolate.js":120,"./tween.js":133,"d3-interpolate":33,"d3-selection":52}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
function attrInterpolate(name, i) {
  return function (t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function (t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function _default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = (0, _d3Selection.namespace)(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

},{"d3-selection":52}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function delayFunction(id, value) {
  return function () {
    (0, _schedule.init)(this, id).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id, value) {
  return value = +value, function () {
    (0, _schedule.init)(this, id).delay = value;
  };
}
function _default(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : (0, _schedule.get)(this.node(), id).delay;
}

},{"./schedule.js":124}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function durationFunction(id, value) {
  return function () {
    (0, _schedule.set)(this, id).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id, value) {
  return value = +value, function () {
    (0, _schedule.set)(this, id).duration = value;
  };
}
function _default(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : (0, _schedule.get)(this.node(), id).duration;
}

},{"./schedule.js":124}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error();
  return function () {
    (0, _schedule.set)(this, id).ease = value;
  };
}
function _default(value) {
  var id = this._id;
  return arguments.length ? this.each(easeConstant(id, value)) : (0, _schedule.get)(this.node(), id).ease;
}

},{"./schedule.js":124}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function easeVarying(id, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    (0, _schedule.set)(this, id).ease = v;
  };
}
function _default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}

},{"./schedule.js":124}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function _default() {
  var on0,
    on1,
    that = this,
    id = that._id,
    size = that.size();
  return new Promise(function (resolve, reject) {
    var cancel = {
        value: reject
      },
      end = {
        value: function value() {
          if (--size === 0) resolve();
        }
      };
    that.each(function () {
      var schedule = (0, _schedule.set)(this, id),
        on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

},{"./schedule.js":124}],118:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var _index = require("./index.js");
function _default(match) {
  if (typeof match !== "function") match = (0, _d3Selection.matcher)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new _index.Transition(subgroups, this._parents, this._name, this._id);
}

},{"./index.js":119,"d3-selection":52}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transition = Transition;
exports.default = transition;
exports.newId = newId;
var _d3Selection = require("d3-selection");
var _attr = _interopRequireDefault(require("./attr.js"));
var _attrTween = _interopRequireDefault(require("./attrTween.js"));
var _delay = _interopRequireDefault(require("./delay.js"));
var _duration = _interopRequireDefault(require("./duration.js"));
var _ease = _interopRequireDefault(require("./ease.js"));
var _easeVarying = _interopRequireDefault(require("./easeVarying.js"));
var _filter = _interopRequireDefault(require("./filter.js"));
var _merge = _interopRequireDefault(require("./merge.js"));
var _on = _interopRequireDefault(require("./on.js"));
var _remove = _interopRequireDefault(require("./remove.js"));
var _select = _interopRequireDefault(require("./select.js"));
var _selectAll = _interopRequireDefault(require("./selectAll.js"));
var _selection = _interopRequireDefault(require("./selection.js"));
var _style = _interopRequireDefault(require("./style.js"));
var _styleTween = _interopRequireDefault(require("./styleTween.js"));
var _text = _interopRequireDefault(require("./text.js"));
var _textTween = _interopRequireDefault(require("./textTween.js"));
var _transition = _interopRequireDefault(require("./transition.js"));
var _tween = _interopRequireDefault(require("./tween.js"));
var _end = _interopRequireDefault(require("./end.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var id = 0;
function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}
function transition(name) {
  return (0, _d3Selection.selection)().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = _d3Selection.selection.prototype;
Transition.prototype = transition.prototype = _defineProperty({
  constructor: Transition,
  select: _select.default,
  selectAll: _selectAll.default,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: _filter.default,
  merge: _merge.default,
  selection: _selection.default,
  transition: _transition.default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: _on.default,
  attr: _attr.default,
  attrTween: _attrTween.default,
  style: _style.default,
  styleTween: _styleTween.default,
  text: _text.default,
  textTween: _textTween.default,
  remove: _remove.default,
  tween: _tween.default,
  delay: _delay.default,
  duration: _duration.default,
  ease: _ease.default,
  easeVarying: _easeVarying.default,
  end: _end.default
}, Symbol.iterator, selection_prototype[Symbol.iterator]);

},{"./attr.js":111,"./attrTween.js":112,"./delay.js":113,"./duration.js":114,"./ease.js":115,"./easeVarying.js":116,"./end.js":117,"./filter.js":118,"./merge.js":121,"./on.js":122,"./remove.js":123,"./select.js":125,"./selectAll.js":126,"./selection.js":127,"./style.js":128,"./styleTween.js":129,"./text.js":130,"./textTween.js":131,"./transition.js":132,"./tween.js":133,"d3-selection":52}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
function _default(a, b) {
  var c;
  return (typeof b === "number" ? _d3Interpolate.interpolateNumber : b instanceof _d3Color.color ? _d3Interpolate.interpolateRgb : (c = (0, _d3Color.color)(b)) ? (b = c, _d3Interpolate.interpolateRgb) : _d3Interpolate.interpolateString)(a, b);
}

},{"d3-color":5,"d3-interpolate":33}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
function _default(transition) {
  if (transition._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new _index.Transition(merges, this._parents, this._name, this._id);
}

},{"./index.js":119}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function (t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id, name, listener) {
  var on0,
    on1,
    sit = start(name) ? _schedule.init : _schedule.set;
  return function () {
    var schedule = sit(this, id),
      on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function _default(name, listener) {
  var id = this._id;
  return arguments.length < 2 ? (0, _schedule.get)(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}

},{"./schedule.js":124}],123:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function removeFunction(id) {
  return function () {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}
function _default() {
  return this.on("end.remove", removeFunction(this._id));
}

},{}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STARTING = exports.STARTED = exports.SCHEDULED = exports.RUNNING = exports.ENDING = exports.ENDED = exports.CREATED = void 0;
exports.default = _default;
exports.get = get;
exports.init = init;
exports.set = set;
var _d3Dispatch = require("d3-dispatch");
var _d3Timer = require("d3-timer");
var emptyOn = (0, _d3Dispatch.dispatch)("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = exports.CREATED = 0;
var SCHEDULED = exports.SCHEDULED = 1;
var STARTING = exports.STARTING = 2;
var STARTED = exports.STARTED = 3;
var RUNNING = exports.RUNNING = 4;
var ENDING = exports.ENDING = 5;
var ENDED = exports.ENDED = 6;
function _default(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index,
    // For context during callback.
    group: group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}
function create(node, id, self) {
  var schedules = node.__transition,
    tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = (0, _d3Timer.timer)(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }
  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return (0, _d3Timer.timeout)(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    (0, _d3Timer.timeout)(function () {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
      i = -1,
      n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

},{"d3-dispatch":9,"d3-timer":101}],125:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var _index = require("./index.js");
var _schedule = _interopRequireWildcard(require("./schedule.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default(select) {
  var name = this._name,
    id = this._id;
  if (typeof select !== "function") select = (0, _d3Selection.selector)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        (0, _schedule.default)(subgroup[i], name, id, i, subgroup, (0, _schedule.get)(node, id));
      }
    }
  }
  return new _index.Transition(subgroups, this._parents, name, id);
}

},{"./index.js":119,"./schedule.js":124,"d3-selection":52}],126:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var _index = require("./index.js");
var _schedule = _interopRequireWildcard(require("./schedule.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default(select) {
  var name = this._name,
    id = this._id;
  if (typeof select !== "function") select = (0, _d3Selection.selectorAll)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = (0, _schedule.get)(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            (0, _schedule.default)(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }
  return new _index.Transition(subgroups, parents, name, id);
}

},{"./index.js":119,"./schedule.js":124,"d3-selection":52}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var Selection = _d3Selection.selection.prototype.constructor;
function _default() {
  return new Selection(this._groups, this._parents);
}

},{"d3-selection":52}],128:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _schedule = require("./schedule.js");
var _tween = require("./tween.js");
var _interpolate = _interopRequireDefault(require("./interpolate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name),
      string1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name),
      value1 = value(this),
      string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id, name) {
  var on0,
    on1,
    listener0,
    key = "style." + name,
    event = "end." + key,
    remove;
  return function () {
    var schedule = (0, _schedule.set)(this, id),
      on = schedule.on,
      listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function _default(name, value, priority) {
  var i = (name += "") === "transform" ? _d3Interpolate.interpolateTransformCss : _interpolate.default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, (0, _tween.tweenValue)(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}

},{"./interpolate.js":120,"./schedule.js":124,"./tween.js":133,"d3-interpolate":33,"d3-selection":52}],129:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function styleInterpolate(name, i, priority) {
  return function (t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function _default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

},{}],130:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _tween = require("./tween.js");
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function _default(value) {
  return this.tween("text", typeof value === "function" ? textFunction((0, _tween.tweenValue)(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}

},{"./tween.js":133}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function textInterpolate(i) {
  return function (t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function _default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}

},{}],132:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _schedule = _interopRequireWildcard(require("./schedule.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default() {
  var name = this._name,
    id0 = this._id,
    id1 = (0, _index.newId)();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = (0, _schedule.get)(node, id0);
        (0, _schedule.default)(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }
  return new _index.Transition(groups, this._parents, name, id1);
}

},{"./index.js":119,"./schedule.js":124}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.tweenValue = tweenValue;
var _schedule = require("./schedule.js");
function tweenRemove(id, name) {
  var tween0, tween1;
  return function () {
    var schedule = (0, _schedule.set)(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function () {
    var schedule = (0, _schedule.set)(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
          name: name,
          value: value
        }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function _default(name, value) {
  var id = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = (0, _schedule.get)(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}
function tweenValue(transition, name, value) {
  var id = transition._id;
  transition.each(function () {
    var schedule = (0, _schedule.set)(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function (node) {
    return (0, _schedule.get)(node, id).value[name];
  };
}

},{"./schedule.js":124}],134:[function(require,module,exports){
(function (process){(function (){
"use strict";

var _require = require('./url-alphabet/index.cjs'),
  urlAlphabet = _require.urlAlphabet;
if (process.env.NODE_ENV !== 'production') {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative' && typeof crypto === 'undefined') {
    throw new Error('React Native does not have a built-in secure random generator. ' + 'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' + 'For secure IDs, import `react-native-get-random-values` ' + 'before Nano ID.');
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error('Import file with `if (!window.crypto) window.crypto = window.msCrypto`' + ' before importing Nano ID to fix IE 11 support');
  }
  if (typeof crypto === 'undefined') {
    throw new Error('Your browser does not have secure random generator. ' + 'If you don’t need unpredictable IDs, you can use nanoid/non-secure.');
  }
}
var random = function random(bytes) {
  return crypto.getRandomValues(new Uint8Array(bytes));
};
var customRandom = function customRandom(alphabet, size, getRandom) {
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  var step = -~(1.6 * mask * size / alphabet.length);
  return function () {
    var id = '';
    while (true) {
      var bytes = getRandom(step);
      var j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || '';
        if (id.length === size) return id;
      }
    }
  };
};
var customAlphabet = function customAlphabet(alphabet, size) {
  return customRandom(alphabet, size, random);
};
var nanoid = function nanoid() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var id = '';
  var bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    var byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }
  return id;
};
module.exports = {
  nanoid: nanoid,
  customAlphabet: customAlphabet,
  customRandom: customRandom,
  urlAlphabet: urlAlphabet,
  random: random
};

}).call(this)}).call(this,require('_process'))
},{"./url-alphabet/index.cjs":135,"_process":136}],135:[function(require,module,exports){
"use strict";

var urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
module.exports = {
  urlAlphabet: urlAlphabet
};

},{}],136:[function(require,module,exports){
"use strict";

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};

},{}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultColors = void 0;
var defaultColors = ['#FF4589', '#FF5050', '#05DF9D', '#4FF2FD', '#2D9CDB', '#A0BBFF', '#FFD76F', '#F2C94C', '#FF9A9A', '#FFB178'];
var getDefaultColors = exports.getDefaultColors = function getDefaultColors(number) {
  var colors = [].concat(defaultColors);
  var colorSet = [];
  for (var i = 0; i < number; i++) {
    // get a random color
    var index = Math.abs(Math.round(Math.random() * (colors.length - 1)));
    // push it to the list
    colorSet.push(colors[index]);
    // and remove it, so that it is not chosen again
    colors.splice(index, 1);
  }
  return colorSet;
};

},{}],138:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRootSVG = exports.gradientMakeVertical = exports.gradientMakeHorizontal = exports.getRootSvg = exports.getContainer = exports.drawPaths = exports.drawInfo = exports.destroySVG = exports.createRootSVG = void 0;
var _d3Selection = require("d3-selection");
require("d3-transition");
var _d3Timer = require("d3-timer");
var _d3Ease = require("d3-ease");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Get the main root SVG element
 */
var getRootSvg = exports.getRootSvg = function getRootSvg(id) {
  return (0, _d3Selection.select)("#".concat(id));
};

/**
 * Get the graph group [create if not exists]
 */
var getRootSvgGroup = function getRootSvgGroup(id, margin) {
  var svg = getRootSvg(id);
  var groupId = "".concat(id, "_graph");
  var group = svg.select("#".concat(groupId));
  if (group.empty()) {
    group = svg.append('g').attr('id', groupId);
    if (margin) {
      group.attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
    }
  }
  return group;
};

/**
 * Get the info group [create if not exists]
 */
var getInfoSvgGroup = function getInfoSvgGroup(id, margin) {
  var svg = getRootSvg(id);
  var groupId = "".concat(id, "_info");
  var group = svg.select("#".concat(groupId));
  if (group.empty()) {
    group = svg.append('g').attr('id', groupId);
    if (margin) {
      // group.attr('transform', `translate(${margin.left}, 0)`);
    }
  }
  return group;
};

/**
 * Get he main container div according to the selector
 */
var getContainer = exports.getContainer = function getContainer(containerSelector) {
  return (0, _d3Selection.select)(containerSelector);
};
var getTooltipElement = function getTooltipElement() {
  return (0, _d3Selection.select)("#d3-funnel-js-tooltip");
};

/**
 * Create the main SVG element 
 */
var createRootSVG = exports.createRootSVG = function createRootSVG(_ref) {
  var context = _ref.context;
  var id = context.getId();
  var responsive = context.getResponsive();
  var width = context.getWidth();
  var height = context.getHeight();
  var margin = context.getMargin();
  var containerSelector = context.getContainerSelector();
  var container = (0, _d3Selection.select)(containerSelector);
  container.append('div').attr('id', "d3-funnel-js-tooltip").attr('class', 'd3-funnel-js-tooltip');
  var d3Svg = container.append('svg').attr('class', 'd3-funnel-js').attr('id', id).attr('width', responsive ? "100%" : width).attr('height', responsive ? "100%" : height).attr('viewBox', "0 0 ".concat(width, " ").concat(height)).attr('preserveAspectRatio', 'xMidYMin meet');
  getRootSvgGroup(id, margin);
  return d3Svg;
};
var updateSVGGroup = function updateSVGGroup(id, margin) {
  var group = getRootSvgGroup(id);
  group === null || group === void 0 || group.attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
};

/**
 * Update the root SVG [demnsions, transform] 
 */
var updateRootSVG = exports.updateRootSVG = function updateRootSVG(_ref2) {
  var context = _ref2.context,
    rotateFrom = _ref2.rotateFrom,
    rotateTo = _ref2.rotateTo;
  var id = context.getId();
  var responsive = context.getResponsive();
  var width = context.getWidth();
  var height = context.getHeight();
  var d3Svg = id ? getRootSvg(id) : undefined;
  if (d3Svg) {
    var root = d3Svg.transition().delay(500).duration(1000);
    if (!isNaN(width) && !isNaN(height)) {
      if (!responsive) {
        d3Svg.attr("width", width);
        d3Svg.attr("height", height);
      } else {
        d3Svg.attr("width", "100%");
        d3Svg.attr("height", "100%");
      }
      d3Svg.attr('viewBox', "0 0 ".concat(width, " ").concat(height));
    }
    if (!isNaN(rotateTo) && !isNaN(rotateTo)) {
      var centerX = 0;
      var centerY = 0;
      root.attrTween('transform', function () {
        return function (t) {
          return "rotate(".concat((1 - t) * rotateFrom + t * rotateTo, " ").concat(centerX, " ").concat(centerY, ")");
        };
      }).on('end', function () {});
    }
  }
};
var gradientMakeVertical = exports.gradientMakeVertical = function gradientMakeVertical(_ref3) {
  var _getRootSvg;
  var id = _ref3.id;
  var gradients = (_getRootSvg = getRootSvg(id)) === null || _getRootSvg === void 0 || (_getRootSvg = _getRootSvg.select('defs')) === null || _getRootSvg === void 0 ? void 0 : _getRootSvg.selectAll('linearGradient');
  if (gradients) {
    gradients.attr('x1', '0').attr('x2', '0').attr('y1', '0').attr('y2', '1');
  }
};
var gradientMakeHorizontal = exports.gradientMakeHorizontal = function gradientMakeHorizontal(_ref4) {
  var _getRootSvg2;
  var id = _ref4.id;
  var gradients = (_getRootSvg2 = getRootSvg(id)) === null || _getRootSvg2 === void 0 || (_getRootSvg2 = _getRootSvg2.select('defs')) === null || _getRootSvg2 === void 0 ? void 0 : _getRootSvg2.selectAll('linearGradient');
  if (gradients) {
    gradients.attr('x1', null).attr('x2', null).attr('y1', null).attr('y2', null);
  }
};
var mouseInfoHandler = function mouseInfoHandler(_ref5) {
  var context = _ref5.context,
    handler = _ref5.handler,
    metadata = _ref5.metadata,
    tooltip = _ref5.tooltip;
  return function (event) {
    var width = context.getWidth(false);
    var height = context.getHeight(false);
    var isVertical = context.isVertical();
    var linePositions = context.getLinePositions();
    var clickPoint = {
      x: event.offsetX,
      y: event.offsetY
    };

    // Determine the area between the lines
    var areaIndex = linePositions.findIndex(function (pos, i) {
      if (!isVertical) {
        return clickPoint.x > pos && clickPoint.x < (linePositions[i + 1] || width);
      } else {
        return clickPoint.y > pos && clickPoint.y < (linePositions[i + 1] || height);
      }
    });

    // values are -1, 0, ...
    areaIndex++;
    var dataInfoItem = JSON.parse(this.getAttribute('data-info'));
    var dataInfoItemForArea = {};
    var dataInfoValues = (dataInfoItem === null || dataInfoItem === void 0 ? void 0 : dataInfoItem.values) || [];
    var dataInfoLabels = (dataInfoItem === null || dataInfoItem === void 0 ? void 0 : dataInfoItem.labels) || [];
    var dataInfoSubLabels = (dataInfoItem === null || dataInfoItem === void 0 ? void 0 : dataInfoItem.subLabels) || [];
    var index = metadata.hasOwnProperty("index") ? metadata.index : -1;
    dataInfoItemForArea = {
      value: dataInfoValues === null || dataInfoValues === void 0 ? void 0 : dataInfoValues[areaIndex],
      label: dataInfoLabels === null || dataInfoLabels === void 0 ? void 0 : dataInfoLabels[areaIndex],
      subLabel: dataInfoSubLabels === null || dataInfoSubLabels === void 0 ? void 0 : dataInfoSubLabels[index],
      sectionIndex: areaIndex
    };
    metadata = _objectSpread(_objectSpread({}, metadata), dataInfoItemForArea);
    if (!tooltip) {
      handler(event, metadata);
    }
    return metadata;
  };
};
var addMouseEventIfNotExists = function addMouseEventIfNotExists(_ref6) {
  var context = _ref6.context;
  return function (pathElement, handler, metadata) {
    var clickEventExists = !!(pathElement !== null && pathElement !== void 0 && pathElement.on('click'));
    if (!clickEventExists) {
      pathElement === null || pathElement === void 0 || pathElement.on('click', mouseInfoHandler({
        context: context,
        handler: handler,
        metadata: metadata
      }));
    }
    if (!context.showDetails() || !context.showTooltip()) {
      pathElement === null || pathElement === void 0 || pathElement.on('mouseover', null);
      pathElement === null || pathElement === void 0 || pathElement.on('mousemove', null);
      pathElement === null || pathElement === void 0 || pathElement.on('mouseout', null);
      return;
    }
    var overEventExists = !!pathElement.on('mouseover');
    if (!overEventExists) {
      var updateTooltip = function updateTooltip(event) {
        var is2d = context.is2d();
        var mouseHandler = mouseInfoHandler({
          context: context,
          handler: handler,
          metadata: metadata,
          tooltip: true
        }).bind(this);
        var handlerMetadata = mouseHandler(event);
        if (handlerMetadata) {
          var tooltipElement = getTooltipElement();
          if (tooltipTimeout) tooltipTimeout.stop();
          tooltipTimeout = (0, _d3Timer.timeout)(function () {
            var label = handlerMetadata.label || "Value";
            label = is2d ? handlerMetadata.subLabel || label : label;
            var tooltipText = "".concat(label, ": ").concat(handlerMetadata.value);
            tooltipElement.style("left", event.offsetX + 10 + "px").style("top", event.offsetY + 10 + "px").text(tooltipText).style("opacity", "1").style("display", "flex");
          }, 500);
        }
      };
      var tooltipTimeout;
      pathElement.on('mouseover', updateTooltip);
      pathElement.on('mousemove', updateTooltip);
      pathElement.on('mouseout', function () {
        if (tooltipTimeout) tooltipTimeout.stop();
        var tooltipElement = getTooltipElement();
        tooltipElement.style("opacity", "0").style("display", "none").text("");
      });
    }
  };
};
var removeClickEvent = function removeClickEvent(pathElement) {
  pathElement.on('click', null);
};

/**
 * Apply the color / gradient to each path
 */
var onEachPathHandler = function onEachPathHandler(_ref7) {
  var context = _ref7.context;
  return function (d, i, nodes) {
    // id, is2d, width, height, isVertical, colors, gradientDirection, callbacks

    var id = context.getId();
    var is2d = context.is2d();
    var colors = context.getColors();
    var gradientDirection = context.getGradientDirection();
    var callbacks = context.getCallBacks();
    var d3Path = (0, _d3Selection.select)(nodes[i]);
    var color = is2d ? colors[i] : colors;
    var fillMode = typeof color === 'string' || (color === null || color === void 0 ? void 0 : color.length) === 1 ? 'solid' : 'gradient';
    if (fillMode === 'solid') {
      d3Path.attr('fill', color).attr('stroke', color);
    } else if (fillMode === 'gradient') {
      applyGradient(id, d3Path, color, i + 1, gradientDirection);
    }
    if (typeof (callbacks === null || callbacks === void 0 ? void 0 : callbacks.click) === 'function') {
      var addMouseHandler = addMouseEventIfNotExists({
        context: context
      });
      addMouseHandler(d3Path, callbacks.click, {
        index: i
      });
    }
  };
};

/**
 * Get the data nfo for each path
 */
var getDataInfo = function getDataInfo(_ref8) {
  var context = _ref8.context;
  return function (d, i) {
    var is2d = context.is2d();
    var data = {
      values: context.getValues(),
      labels: context.getLabels(),
      subLabels: context.getSubLabels()
    };
    var infoItemValues = is2d ? data.values.map(function (array) {
      return array[i];
    }) || [] : data.values || [];
    var infoItemLabels = data.labels || [];
    var infoItemSubLabels = (data === null || data === void 0 ? void 0 : data.subLabels) || [];
    return "{ \"values\": ".concat(JSON.stringify(infoItemValues), ", \"labels\": ").concat(JSON.stringify(infoItemLabels), ", \"subLabels\": ").concat(JSON.stringify(infoItemSubLabels), " }");
  };
};

/**
 * Draw the SVG paths
 */
var drawPaths = exports.drawPaths = function drawPaths(_ref9) {
  var context = _ref9.context,
    definitions = _ref9.definitions;
  var id = context.getId();
  var rootSvg = getRootSvgGroup(id);
  updateRootSVG({
    context: context
  });
  if (definitions && rootSvg) {
    var paths = rootSvg.selectAll('path').data(definitions.paths);
    var pathHandler = onEachPathHandler({
      context: context
    });
    var getDataInfoHandler = getDataInfo({
      context: context
    });

    // paths creation
    var enterPaths = paths.enter().append('path').attr('d', function (d) {
      return d.path;
    }).attr('data-info', getDataInfoHandler).attr('opacity', 0).transition().ease(_d3Ease.easePolyInOut).delay(function (d, i) {
      return i * 100;
    }).duration(1000).attr('opacity', 1).each(pathHandler);

    // Update existing paths
    paths.merge(enterPaths).transition().ease(_d3Ease.easePolyInOut).delay(function (d, i) {
      return i * 100;
    }).duration(1000).attr('d', function (d) {
      return d.path;
    }).attr('data-info', getDataInfoHandler).attr('opacity', 1).each(pathHandler);

    // Exit and remove old paths
    paths.exit().transition().ease(_d3Ease.easePolyInOut).delay(function (d, i) {
      return i * 100;
    }).duration(1000).attr('opacity', 0).each(function () {
      var path = (0, _d3Selection.select)(this);
      path.on('end', function () {
        removeClickEvent(path);
      });
    }).remove();
    return paths;
  }
};

/**
 * SVG texts positioning according to the selected direction
 */
var onEachTextHandler = function onEachTextHandler(_ref10) {
  var offset = _ref10.offset;
  return function (d, i) {
    var padding = 5;
    var bbox = this.getBBox();
    if (!offset.value) {
      offset.value = +(0, _d3Selection.select)(this).attr('y');
    }
    var newValue = bbox.height + offset.value + padding;
    (0, _d3Selection.select)(this).attr('y', newValue);
    offset.value += bbox.height + padding;
  };
};

// Function to update line positions
var updateLinePositions = function updateLinePositions(_ref11) {
  var context = _ref11.context;
  return function (info, vertical, margin, noMarginSpacing) {
    context.setLinePositions(info.map(function (d, i) {
      return noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top);
    }));
  };
};

/**
 * Handle the SVG text display on the graph
 */
var drawInfo = exports.drawInfo = function drawInfo(_ref12) {
  var context = _ref12.context,
    info = _ref12.info;
  var id = context.getId();
  var margin = context.getMargin();
  updateSVGGroup(id, margin);
  if (!context.showDetails()) {
    getInfoSvgGroup(id, margin).selectAll('g.label__group').remove();
    getInfoSvgGroup(id, margin).selectAll('.divider').remove();
    return;
  }
  if (info) {
    var width = context.getWidth();
    var height = context.getHeight();
    var vertical = context.isVertical();
    var textGap = info.length + 1;
    var noMarginHeight = height - margin.top - margin.bottom;
    var noMarginWidth = width - margin.left - margin.right;
    var noMarginSpacing = (!vertical ? noMarginWidth : noMarginHeight) / info.length;
    var calcTextPos = function calcTextPos(i) {
      return noMarginSpacing * i + (!vertical ? margin.left : margin.top) + noMarginSpacing / textGap;
    };
    var updateLinePositionsHandler = updateLinePositions({
      context: context
    });
    getInfoSvgGroup(id, margin).selectAll('g.label__group').data(info).join(function (enter) {
      return enter.append("g").attr("class", "label__group").each(function (d, i) {
        var x = !vertical ? calcTextPos(i) : margin.text;
        var y = !vertical ? margin.text : calcTextPos(i);
        var offsetValue = {
          value: 0
        };
        var textHandlerValue = onEachTextHandler({
          offset: offsetValue
        });
        var g = (0, _d3Selection.select)(this);
        g.append("text").attr("class", "label__value").attr('x', x).attr('y', y).text(function (d) {
          return d.value;
        }).each(textHandlerValue);
        var textHandlerTitle = onEachTextHandler({
          offset: offsetValue
        });
        g.append("text").attr("class", "label__title").attr('x', x).attr('y', y).text(function (d) {
          return d.label;
        }).each(textHandlerTitle);
        var textHandlerPercentage = onEachTextHandler({
          offset: offsetValue
        });
        g.append("text").attr("class", "label__percentage").attr('x', x).attr('y', y).text(function (d) {
          return d.percentage;
        }).each(textHandlerPercentage);
      });
    }, function (update) {
      return update.each(function (d, i) {
        var x = !vertical ? calcTextPos(i) : margin.text;
        var y = !vertical ? margin.text : calcTextPos(i);
        var offsetValue = {
          value: 0
        };
        var textHandlerValue = onEachTextHandler({
          offset: offsetValue
        });
        (0, _d3Selection.select)(this).select(".label__value").attr('x', x).attr('y', y).text(function (d) {
          return d.value;
        }).style('opacity', 0.5).transition().duration(400).ease(_d3Ease.easePolyInOut).style('opacity', 1).each(textHandlerValue);
        var textHandlerTitle = onEachTextHandler({
          offset: offsetValue
        });
        (0, _d3Selection.select)(this).select(".label__title").attr('x', x).attr('y', y).text(function (d) {
          return d.label;
        }).each(textHandlerTitle);
        var textHandlerPercentage = onEachTextHandler({
          offset: offsetValue
        });
        (0, _d3Selection.select)(this).select(".label__percentage").attr('x', x).attr('y', y).text(function (d) {
          return d.percentage;
        }).each(textHandlerPercentage);
      });
    }, function (exit) {
      return exit.remove();
    });

    // Update line positions initially
    updateLinePositionsHandler(info, vertical, margin, noMarginSpacing);

    // display graph dividers
    var infoCopy = info.slice(0, -1);
    var lines = getInfoSvgGroup(id, margin).selectAll('.divider').data(infoCopy);

    // Enter selection
    var enterLines = lines.enter().append('line').attr('class', 'divider').attr("".concat(!vertical ? 'x' : 'y', "1"), function (d, i) {
      return noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top);
    }).attr("".concat(!vertical ? 'y' : 'x', "1"), function (d, i) {
      return 0;
    }).attr("".concat(!vertical ? 'x' : 'y', "2"), function (d, i) {
      return noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top);
    }).attr("".concat(!vertical ? 'y' : 'x', "2"), !vertical ? height : width);

    // Update selection
    lines.merge(enterLines).transition().duration(500).attr("".concat(!vertical ? 'x' : 'y', "1"), function (d, i) {
      return noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top);
    }).attr("".concat(!vertical ? 'y' : 'x', "1"), 0).attr("".concat(!vertical ? 'x' : 'y', "2"), function (d, i) {
      return noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top);
    }).attr("".concat(!vertical ? 'y' : 'x', "2"), !vertical ? height : width);

    // Exit selection
    lines.exit().transition().duration(500).attr('stroke-opacity', 0).remove();
  } else {
    getInfoSvgGroup(id, margin).selectAll('g.label__group').remove();
    getInfoSvgGroup(id, margin).selectAll('.divider').remove();
  }
};
var applyGradient = function applyGradient(id, d3Path, colors, index, gradientDirection) {
  var gradientId = "funnelGradient-".concat(index);
  var d3Svg = getRootSvgGroup(id);
  var d3Defs = d3Svg.select('defs');
  if (d3Defs.empty()) {
    d3Defs = d3Svg.append('defs');
  }

  // Check if the gradient already exists, if not create a new one
  var d3Gradient = d3Defs.select("#".concat(gradientId));
  if (d3Gradient.empty()) {
    d3Gradient = d3Defs.append('linearGradient').attr('id', gradientId);
  } else {
    // Clear existing stops before adding new ones
    d3Gradient.selectAll('stop').remove();
  }
  if (gradientDirection === 'vertical') {
    d3Gradient.attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
  } else {
    // Assuming horizontal gradient as a default or alternative
    d3Gradient.attr('x1', '0').attr('y1', '0').attr('x2', '1').attr('y2', '0');
  }

  // Set color stops
  var numberOfColors = (colors === null || colors === void 0 ? void 0 : colors.length) || 0;
  for (var i = 0; i < numberOfColors; i++) {
    d3Gradient.append('stop').attr('offset', "".concat(Math.round(100 * i / (numberOfColors - 1)), "%")).attr('stop-color', colors[i]);
  }

  // Apply the gradient to the path
  d3Path.attr('fill', "url(\"#".concat(gradientId, "\")")).attr('stroke', "url(\"#".concat(gradientId, "\")"));
};
var destroySVG = exports.destroySVG = function destroySVG(_ref13) {
  var context = _ref13.context;
  return function () {
    var svg = getRootSvg(context.getId());
    if (svg) {
      // Stop any ongoing transitions
      svg.selectAll('*').interrupt();

      // Remove all SVG elements
      svg.selectAll('*').remove();
      svg.remove();
    }
  };
};

},{"d3-ease":16,"d3-selection":52,"d3-timer":101,"d3-transition":106}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _number = require("./number");
var _colors = require("./colors");
var _path = require("./path");
var _d = require("./d3");
var _nanoid = require("nanoid");
var _utils = require("./utils");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-trailing-spaces */ /* global HTMLElement */
/**
 * Funnel graph class
 * 
 * @param options {
 * 
 *      container: '.selector'
 *      width: ...
 *      height: ...
 *      labels: ['Impressions', ...],
 *      subLabels: ['Direct', ...],
 *      colors: [
 *          ['#000', ...
 *      ],
 *      values: [
 *          [3500, ...
 *      ],
 *      displayPercent: false,
 *      margin: { ?top, ?right, ?bottom, ?left, text },
 *      gradientDirection: 'vertical',
 *      callbacks: {
 *          'click': () => {}
 *      }
 *      details: false
 *      tooltip: true,
 *      responsive: false
 * }
 *  TODO: outlines: for two dimensions graph display
 */
var FunnelGraph = /*#__PURE__*/function () {
  function FunnelGraph(options) {
    var _options$data, _options$data2, _options$data3, _options$data4;
    _classCallCheck(this, FunnelGraph);
    this.id = this.generateId(), this.containerSelector = options.container;
    this.gradientDirection = options.gradientDirection && options.gradientDirection === 'vertical' ? 'vertical' : 'horizontal';
    this.setResponsive(options.hasOwnProperty("responsive") ? options.responsive : false);
    this.setDetails(options.hasOwnProperty('details') ? options.details : true);
    this.setTooltip(options.hasOwnProperty('tooltip') ? options.tooltip : true);
    this.getDirection(options === null || options === void 0 ? void 0 : options.direction);
    this.setValues((options === null || options === void 0 || (_options$data = options.data) === null || _options$data === void 0 ? void 0 : _options$data.values) || []);
    this.setLabels((options === null || options === void 0 || (_options$data2 = options.data) === null || _options$data2 === void 0 ? void 0 : _options$data2.labels) || []);
    this.setSubLabels((options === null || options === void 0 || (_options$data3 = options.data) === null || _options$data3 === void 0 ? void 0 : _options$data3.subLabels) || []);
    this.percentages = this.createPercentages();
    this.colors = (options === null || options === void 0 || (_options$data4 = options.data) === null || _options$data4 === void 0 ? void 0 : _options$data4.colors) || (0, _colors.getDefaultColors)(this.is2d() ? this.getSubDataSize() : 2);
    this.displayPercent = options.displayPercent || false;
    this.margin = {
      top: 120,
      right: 60,
      bottom: 60,
      left: 60,
      text: 10
    };
    this.setMargin(options === null || options === void 0 ? void 0 : options.margin);
    var height = options.height || (0, _d.getContainer)(this.containerSelector).clientHeight;
    var width = options.width || (0, _d.getContainer)(this.containerSelector).clientWidth;
    this.callbacks = options === null || options === void 0 ? void 0 : options.callbacks;
    this.height = height;
    this.width = width;
    this.origHeight = height;
    this.origWidth = width;
    this.subLabelValue = options.subLabelValue || 'percent';
    if (this.isVertical()) {
      this.makeVertical(true);
    } else {
      this.makeHorizontal(true);
    }

    /**
     * Helper for the dividers location 
     * Main use for the tooltip sections over the paths 
     */
    this.linePositions = [];
  }
  return _createClass(FunnelGraph, [{
    key: "destroy",
    value: function destroy() {
      var destroy = (0, _d.destroySVG)({
        context: this.getContext()
      });
      if (destroy) {
        destroy();
      }
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "showTooltip",
    value: function showTooltip() {
      return this.tooltip;
    }
  }, {
    key: "showDetails",
    value: function showDetails() {
      return this.details;
    }
  }, {
    key: "getContainerSelector",
    value: function getContainerSelector() {
      return this.containerSelector;
    }
  }, {
    key: "generateId",
    value: function generateId() {
      return "id_".concat((0, _nanoid.nanoid)());
    }
  }, {
    key: "getColors",
    value: function getColors() {
      return this.colors;
    }
  }, {
    key: "getGradientDirection",
    value: function getGradientDirection() {
      return this.gradientDirection;
    }
  }, {
    key: "getDirection",
    value: function getDirection(direction) {
      if (!direction || direction && direction !== 'horizontal' && direction !== 'vertical') {
        return 'horizontal';
      }
      return direction;
    }
  }, {
    key: "getGraphType",
    value: function getGraphType() {
      return this.values && this.values[0] instanceof Array ? '2d' : 'normal';
    }
  }, {
    key: "is2d",
    value: function is2d() {
      return this.getGraphType() === '2d';
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.direction === 'vertical';
    }
  }, {
    key: "setDirection",
    value: function setDirection(d) {
      this.direction = d;
    }
  }, {
    key: "setHeight",
    value: function setHeight(h) {
      this.height = h;
    }
  }, {
    key: "setWidth",
    value: function setWidth(w) {
      this.width = w;
    }
  }, {
    key: "setTooltip",
    value: function setTooltip(bool) {
      this.tooltip = bool;
    }
  }, {
    key: "setDetails",
    value: function setDetails(bool) {
      this.details = bool;
    }

    /**
     * Get the graph width
     * 
     * @param {*} margin included if true or else return the original width
     * @returns 
     */
  }, {
    key: "getWidth",
    value: function getWidth() {
      var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var width = margin ? this.margin.left + this.margin.right : 0;
      return this.width + width;
    }

    /**
     * Get the graph height
     * 
     * @param {*} margin included if true or else return the original width
     * @returns 
     */
  }, {
    key: "getHeight",
    value: function getHeight() {
      var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var height = margin ? this.margin.top + this.margin.bottom : 0;
      return this.height + height;
    }

    /**
     * Get the margin object { top: , right: , bottom: , left:  }
     */
  }, {
    key: "getMargin",
    value: function getMargin() {
      return this.margin;
    }
  }, {
    key: "setMargin",
    value: function setMargin(margin) {
      if (margin && _typeof(margin) === 'object') {
        this.margin = _objectSpread(_objectSpread({}, this.margin), margin);
      }
    }
  }, {
    key: "getDataSize",
    value: function getDataSize() {
      return this.values.length;
    }
  }, {
    key: "getSubDataSize",
    value: function getSubDataSize() {
      var _this$values;
      // TODO:
      return ((_this$values = this.values) === null || _this$values === void 0 || (_this$values = _this$values[0]) === null || _this$values === void 0 ? void 0 : _this$values.length) || 0;
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this.values;
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      return this.labels;
    }
  }, {
    key: "getSubLabels",
    value: function getSubLabels() {
      return this.subLabels;
    }
  }, {
    key: "getCallBacks",
    value: function getCallBacks() {
      return this.callbacks;
    }
  }, {
    key: "setLinePositions",
    value: function setLinePositions(position) {
      this.linePositions = position || [];
    }
  }, {
    key: "getLinePositions",
    value: function getLinePositions() {
      return this.linePositions;
    }
  }, {
    key: "getResponsive",
    value: function getResponsive() {
      return this.responsive;
    }
  }, {
    key: "setResponsive",
    value: function setResponsive(value) {
      this.responsive = value;
    }
  }, {
    key: "getValues2d",
    value: function getValues2d() {
      var values = [];
      (this.values || []).forEach(function (valueSet) {
        values.push(valueSet.reduce(function (sum, value) {
          return sum + value;
        }, 0));
      });
      return values;
    }
  }, {
    key: "getPercentages2d",
    value: function getPercentages2d() {
      var percentages = [];
      this.values.forEach(function (valueSet) {
        var total = valueSet.reduce(function (sum, value) {
          return sum + value;
        }, 0);
        percentages.push(valueSet.map(function (value) {
          return total === 0 ? 0 : (0, _number.roundPoint)(value * 100 / total);
        }));
      });
      return percentages;
    }
  }, {
    key: "setSubLabels",
    value: function setSubLabels(subLabels) {
      subLabels = (0, _utils.normalizeArray)(subLabels);
      this.subLabels = subLabels;
    }
  }, {
    key: "setLabels",
    value: function setLabels(labels) {
      // if (!options.data) {
      //     throw new Error('Data is missing');
      // }

      // const { data } = options;

      // if (typeof data.labels === 'undefined') return [];

      labels = (0, _utils.normalizeArray)(labels);
      this.labels = labels;
    }
  }, {
    key: "setValues",
    value: function setValues(values) {
      // let values = [];

      // const { data } = options;

      // if (typeof data === 'object') {
      //     values = data.values;
      // }

      values = (0, _utils.normalizeArray)(values);
      this.values = values;
    }
  }, {
    key: "createPercentages",
    value: function createPercentages() {
      var values = [];
      if (this.is2d()) {
        values = this.getValues2d();
      } else {
        values = _toConsumableArray(this.values);
      }
      var max = Math.max.apply(Math, _toConsumableArray(values));
      return values.map(function (value) {
        return value === 0 ? 0 : (0, _number.roundPoint)(value * 100 / max);
      });
    }
  }, {
    key: "makeVertical",
    value: function makeVertical() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!force && this.direction === 'vertical') return true;
      this.setDirection('vertical');
      this.setWidth(this.origHeight);
      this.setHeight(this.origWidth);
      (0, _d.updateRootSVG)({
        context: this.getContext()
      });
      this.updateData();
    }
  }, {
    key: "makeHorizontal",
    value: function makeHorizontal() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!force && this.direction === 'horizontal') return true;
      this.setDirection('horizontal');
      this.setWidth(this.origWidth);
      this.setHeight(this.origHeight);
      (0, _d.updateRootSVG)({
        context: this.getContext()
      });
      this.updateData();
    }
  }, {
    key: "toggleDirection",
    value: function toggleDirection() {
      if (this.direction === 'horizontal') {
        this.makeVertical();
      } else {
        this.makeHorizontal();
      }
    }
  }, {
    key: "gradientMakeVertical",
    value: function gradientMakeVertical() {
      if (this.gradientDirection === 'vertical') {
        return true;
      }
      this.gradientDirection = 'vertical';
      (0, _d.gradientMakeVertical)({
        id: this.id
      });
      return true;
    }
  }, {
    key: "gradientMakeHorizontal",
    value: function gradientMakeHorizontal() {
      if (this.gradientDirection === 'horizontal') {
        return true;
      }
      this.gradientDirection = 'horizontal';
      (0, _d.gradientMakeHorizontal)({
        id: this.id
      });
      return true;
    }
  }, {
    key: "gradientToggleDirection",
    value: function gradientToggleDirection() {
      if (this.gradientDirection === 'horizontal') {
        this.gradientMakeVertical();
      } else {
        this.gradientMakeHorizontal();
      }
    }

    /**
     * Get class context 
     */
  }, {
    key: "getContext",
    value: function getContext() {
      var _this = this;
      var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(function (prop) {
        return typeof _this[prop] === 'function' && prop !== 'constructor';
      });
      var boundMethods = {};
      var _iterator = _createForOfIteratorHelper(methods),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var method = _step.value;
          boundMethods[method] = this[method].bind(this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return boundMethods;
    }

    /**
     * Get the graph information 
     * 
     * @returns the information fot the graph object
     *  {label: , subLabel: , value: , percentage: } 
     */
  }, {
    key: "getInfo",
    value: function getInfo() {
      var _this2 = this;
      var data = this.percentages;
      return data.map(function (percentage, index) {
        var _this2$labels;
        var infoItem = {
          label: undefined,
          subLabel: undefined,
          value: undefined,
          percentage: undefined
        };

        // update value 
        var valueNumber = _this2.is2d() ? _this2.getValues2d()[index] : _this2.values[index];
        infoItem.value = (0, _number.formatNumber)(valueNumber);

        // update label
        infoItem.label = ((_this2$labels = _this2.labels) === null || _this2$labels === void 0 ? void 0 : _this2$labels[index]) || 'NA';

        // update percentage if set to true
        if (_this2.displayPercent) {
          infoItem.percentage = "".concat(percentage.toString(), "%");
        }
        return infoItem;
      });
    }

    /**
     * Calculate the paths and draw the svg elements
     * Get the info and draw the vertical svg lines with the relevant text
     */
  }, {
    key: "drawGraph",
    value: function drawGraph() {
      var crossAxisPoints = (0, _path.getCrossAxisPoints)({
        context: this.getContext()
      });
      var definitions = (0, _path.getPathDefinitions)({
        context: this.getContext(),
        crossAxisPoints: crossAxisPoints
      });
      (0, _d.drawPaths)({
        context: this.getContext(),
        definitions: definitions
      });
      var info = this.getInfo();
      (0, _d.drawInfo)({
        context: this.getContext(),
        info: info
      });
    }

    /**
     * Create the main SVG and draw the graph
     */
  }, {
    key: "draw",
    value: function draw() {
      (0, _d.createRootSVG)({
        context: this.getContext()
      });
      this.drawGraph();
    }

    /**
     * Redraw the graph and info according to the incoming data changes
     * 
     * @param {*} d {
     *      width: ...
     *      height: ...
     *      margin: ...
     *      values: ...
     *      labels: ...
     *      subLabels: ...
     *      colors: ...
     *      details: ...
     *      tooltip: ...
     * }
     */
  }, {
    key: "updateData",
    value: function updateData(d) {
      if (d) {
        if (typeof d.responsive !== 'undefined') {
          this.setResponsive(d.responsive);
        }
        if (typeof d.width !== 'undefined') {
          this.setWidth(d.width);
        }
        if (typeof d.height !== 'undefined') {
          this.setHeight(d.height);
        }
        if (typeof d.margin !== 'undefined') {
          this.setMargin(d.margin);
        }
        if (typeof d.details !== 'undefined') {
          this.setDetails(d.details);
        }
        if (typeof d.tooltip !== 'undefined') {
          this.setTooltip(d.tooltip);
        }
        if (typeof d.values !== 'undefined') {
          // Update values
          this.setValues(_toConsumableArray(d.values));
        }
        if (typeof d.labels !== 'undefined') {
          // Update labels if specified in the new data
          this.setLabels(_toConsumableArray(d.labels));
        }
        if (typeof d.colors !== 'undefined') {
          // Update colors if specified, or use default colors as a fallback
          this.colors = d.colors || (0, _colors.getDefaultColors)(this.is2d() ? this.getSubDataSize() : 2);
        }

        // Calculate percentages for the graph based on the updated or existing values
        this.percentages = this.createPercentages();
        if (typeof d.subLabels !== 'undefined') {
          // Update subLabels if specified in the new data
          this.setSubLabels(_toConsumableArray(d.subLabels));
        }
      }
      this.drawGraph();
    }
  }]);
}();
var _default = exports.default = FunnelGraph;

},{"./colors":137,"./d3":138,"./number":140,"./path":141,"./utils":142,"nanoid":134}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundPoint = exports.formatNumber = void 0;
var roundPoint = exports.roundPoint = function roundPoint(number) {
  return Math.round(number * 10) / 10;
};
var formatNumber = exports.formatNumber = function formatNumber(number) {
  return Number(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

},{}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPathDefinitions = exports.getCrossAxisPoints = void 0;
var _number = require("./number");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var getPathDefinitions = exports.getPathDefinitions = function getPathDefinitions(_ref) {
  var context = _ref.context,
    crossAxisPoints = _ref.crossAxisPoints;
  var paths = [];
  if (!(crossAxisPoints !== null && crossAxisPoints !== void 0 && crossAxisPoints.length)) {
    return {
      paths: paths,
      crossAxisPoints: []
    };
  }
  var dataSize = context.getDataSize();
  var isVertical = context.isVertical();
  var width = context.getWidth(false);
  var height = context.getHeight(false);
  var valuesNum = crossAxisPoints.length - 1;
  for (var i = 0; i < valuesNum; i++) {
    var _crossAxisPoints$i;
    var allZeros = crossAxisPoints === null || crossAxisPoints === void 0 || (_crossAxisPoints$i = crossAxisPoints[i]) === null || _crossAxisPoints$i === void 0 ? void 0 : _crossAxisPoints$i.every(function (value) {
      return value === 0;
    });
    if (allZeros) {
      continue;
    }
    if (isVertical) {
      var X = crossAxisPoints[i];
      var XNext = crossAxisPoints[i + 1];
      var Y = getMainAxisPoints({
        dataSize: dataSize,
        isVertical: isVertical,
        height: height,
        width: width
      });
      var d = createVerticalPath(i, X, XNext, Y);
      paths.push({
        path: d,
        data: {}
      });
    } else {
      var _X = getMainAxisPoints({
        dataSize: dataSize,
        isVertical: isVertical,
        height: height,
        width: width
      });
      var _Y = crossAxisPoints[i];
      var YNext = crossAxisPoints[i + 1];
      var _d = createPath(i, _X, _Y, YNext);
      paths.push({
        path: _d,
        data: {}
      });
    }
  }
  return {
    paths: paths,
    crossAxisPoints: crossAxisPoints
  };
};
var getCrossAxisPoints = exports.getCrossAxisPoints = function getCrossAxisPoints(_ref2) {
  var context = _ref2.context;
  var points = [];
  var values = context.getValues();
  if (!(values !== null && values !== void 0 && values.length)) {
    return points;
  }
  var dataSize = context.getDataSize();
  var subDataSize = context.getSubDataSize();
  var values2d = context.is2d() ? context.getValues2d() : undefined;
  var percentages2d = context.is2d() ? context.getPercentages2d() : undefined;
  var isVertical = context.isVertical();
  var width = context.getWidth(false);
  var height = context.getHeight(false);
  var is2d = context.is2d();
  var fullDimension = isVertical ? width : height;

  // get half of the graph container height or width, since funnel shape is symmetric
  // we use this when calculating the "A" shape
  var dimension = fullDimension / 2;
  if (is2d) {
    var _pointsOfFirstPath;
    var totalValues = values2d;
    var max = Math.max.apply(Math, _toConsumableArray(totalValues));

    // duplicate last value
    totalValues.push(_toConsumableArray(totalValues).pop());
    // get points for path "A"
    points.push(totalValues.map(function (value) {
      var point = (0, _number.roundPoint)((max - value) / max * dimension);
      return isNaN(point) ? 0 : point;
    }));
    // percentages with duplicated last value
    var percentagesFull = percentages2d;
    var pointsOfFirstPath = points[0];
    for (var i = 1; i < subDataSize; i++) {
      var _newPoints;
      var p = points[i - 1];
      var newPoints = [];
      for (var j = 0; j < dataSize; j++) {
        newPoints.push((0, _number.roundPoint)(
        // eslint-disable-next-line comma-dangle
        p[j] + (fullDimension - pointsOfFirstPath[j] * 2) * (percentagesFull[j][i - 1] / 100)));
      }
      newPoints = (_newPoints = newPoints) === null || _newPoints === void 0 ? void 0 : _newPoints.map(function (value) {
        return isNaN(value) ? 0 : value;
      });
      // duplicate the last value as points #2 and #3 have the same value on the cross axis
      newPoints.push(_toConsumableArray(newPoints).pop());
      points.push(newPoints);
    }
    pointsOfFirstPath = (_pointsOfFirstPath = pointsOfFirstPath) === null || _pointsOfFirstPath === void 0 ? void 0 : _pointsOfFirstPath.map(function (value) {
      return isNaN(value) ? 0 : value;
    });
    var allZeros = pointsOfFirstPath.every(function (value) {
      return value === 0;
    });
    if (allZeros) {
      points.push(pointsOfFirstPath);
    } else {
      // add points for path "D", that is simply the "inverted" path "A"
      points.push(pointsOfFirstPath.map(function (point) {
        return fullDimension - point;
      }));
    }
  } else {
    // As you can see on the visualization above points #2 and #3 have the same cross axis coordinate
    // so we duplicate the last value
    var _max = Math.max.apply(Math, _toConsumableArray(values));
    var aggregatedValues = _toConsumableArray(values).concat(_toConsumableArray(values).pop());
    // if the graph is simple (not two-dimensional) then we have only paths "A" and "D"
    // which are symmetric. So we get the points for "A" and then get points for "D" by subtracting "A"
    // points from graph cross dimension length
    points.push(aggregatedValues.map(function (value) {
      return (0, _number.roundPoint)((_max - value) / _max * dimension);
    }));
    points.push(points[0].map(function (point) {
      return fullDimension - point;
    }));
  }
  return points;
};

/**
An example of a two-dimensional funnel graph
#0..................
                   ...#1................
                                       ......
#0********************#1**                    #2.........................#3 (A)
                          *******************
                                              #2*************************#3 (B)
                                              #2+++++++++++++++++++++++++#3 (C)
                          +++++++++++++++++++
#0++++++++++++++++++++#1++                    #2-------------------------#3 (D)
                                       ------
                   ---#1----------------
#0-----------------
 Main axis is the primary axis of the graph.
 In a horizontal graph it's the X axis, and Y is the cross axis.
 However we use the names "main" and "cross" axis,
 because in a vertical graph the primary axis is the Y axis
 and the cross axis is the X axis.
 First step of drawing the funnel graph is getting the coordinates of points,
 that are used when drawing the paths.
 There are 4 paths in the example above: A, B, C and D.
 Such funnel has 3 labels and 3 subLabels.
 This means that the main axis has 4 points (number of labels + 1)
 One the ASCII illustrated graph above, those points are illustrated with a # symbol.
*/
var getMainAxisPoints = function getMainAxisPoints(_ref3) {
  var dataSize = _ref3.dataSize,
    isVertical = _ref3.isVertical,
    height = _ref3.height,
    width = _ref3.width;
  var size = dataSize;
  var points = [];
  var fullDimension = isVertical ? height : width;
  for (var i = 0; i <= size; i++) {
    points.push((0, _number.roundPoint)(fullDimension * i / size));
  }
  return points;
};
var createCurves = function createCurves(x1, y1, x2, y2) {
  return " C".concat((0, _number.roundPoint)((x2 + x1) / 2), ",").concat(y1, " ") + "".concat((0, _number.roundPoint)((x2 + x1) / 2), ",").concat(y2, " ").concat(x2, ",").concat(y2);
};
var createVerticalCurves = function createVerticalCurves(x1, y1, x2, y2) {
  return " C".concat(x1, ",").concat((0, _number.roundPoint)((y2 + y1) / 2), " ") + "".concat(x2, ",").concat((0, _number.roundPoint)((y2 + y1) / 2), " ").concat(x2, ",").concat(y2);
};

/*
    A funnel segment is draw in a clockwise direction.
    Path 1-2 is drawn,
    then connected with a straight vertical line 2-3,
    then a line 3-4 is draw (using YNext points going in backwards direction)
    then path is closed (connected with the starting point 1).

    1---------->2
    ^           |
    |           v
    4<----------3

    On the graph on line 20 it works like this:
    A#0, A#1, A#2, A#3, B#3, B#2, B#1, B#0, close the path.

    Points for path "B" are passed as the YNext param.
 */

var createPath = function createPath(index, X, Y, YNext) {
  var str = "M".concat(X[0], ",").concat(Y[0]);
  for (var i = 0; i < X.length - 1; i++) {
    str += createCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
  }
  str += " L".concat(_toConsumableArray(X).pop(), ",").concat(_toConsumableArray(YNext).pop());
  for (var _i = X.length - 1; _i > 0; _i--) {
    str += createCurves(X[_i], YNext[_i], X[_i - 1], YNext[_i - 1]);
  }
  str += ' Z';
  return str;
};

/*
    In a vertical path we go counter-clockwise

    1<----------4
    |           ^
    v           |
    2---------->3
 */

var createVerticalPath = function createVerticalPath(index, X, XNext, Y) {
  var str = "M".concat(X[0], ",").concat(Y[0]);
  for (var i = 0; i < X.length - 1; i++) {
    str += createVerticalCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
  }
  str += " L".concat(_toConsumableArray(XNext).pop(), ",").concat(_toConsumableArray(Y).pop());
  for (var _i2 = X.length - 1; _i2 > 0; _i2--) {
    str += createVerticalCurves(XNext[_i2], Y[_i2], XNext[_i2 - 1], Y[_i2 - 1]);
  }
  str += ' Z';
  return str;
};

},{"./number":140}],142:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeArray = void 0;
var _normalizeArray = function _normalizeArray(arr) {
  // Helper function to check if a single cell is considered empty
  var isEmpty = function isEmpty(el) {
    return Array.isArray(el) ? _normalizeArray(el) : el === null || el === undefined;
  };

  // Check if every cell in the array is empty
  return Array.isArray(arr) && arr.every(isEmpty);
};
var normalizeArray = exports.normalizeArray = function normalizeArray(arr) {
  // If the array is empty, return an empty array
  var nArray = [];
  try {
    nArray = _normalizeArray(arr) ? [] : arr;
  } catch (e) {
    console.warn("normalizing array function failed with errors: ", e);
  }
  return nArray;
};

},{}]},{},[1])(1)
});
