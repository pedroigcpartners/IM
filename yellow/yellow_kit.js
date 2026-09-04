/**
 * yellow_kit.js — Project Yellow (Tracbel) page kit for pptxgenjs.
 * Geometry measured from the Project Yellow IM OOXML (canvas 48.77 × 27.43 cm = 19.2 × 10.8 in).
 * Identity: Tracbel yellow FDBA12, black, gray B1B3B5, light gray F2F2F2, Century Gothic.
 */
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Fi = require('react-icons/fi');
const Md = require('react-icons/md');

const CM = 1 / 2.54;                    // cm → in
const W = 48.77 * CM, H = 27.43 * CM;   // 19.201 × 10.799 in
const C = {
  yellow: 'FDBA12', yellowL: 'FEDD8C', yellowT: 'FFF3D6', black: '000000', ink: '1B1B1B',
  gray: 'B1B3B5', grayL: 'F2F2F2', grayM: '7F7F7F', grayD: '595959', white: 'FFFFFF', line: 'D9D9D9',
};
const F = 'Century Gothic';
const ASSETS = path.join(__dirname, 'assets');
const GEN = path.join(__dirname, 'gen');
fs.mkdirSync(GEN, { recursive: true });

let p;
function init(title) {
  p = new pptxgen();
  p.defineLayout({ name: 'YELLOW', width: W, height: H });
  p.layout = 'YELLOW';
  p.author = 'IGC Partners'; p.company = 'IGC Partners'; if (title) p.title = title;
  return p;
}
const cm = v => v * CM;

// ---- primitives ----
function rect(s, x, y, w, h, fill, o = {}) {
  const opt = { x, y, w, h, fill: fill ? { color: fill } : { type: 'none' }, line: o.line ? { color: o.line, width: o.lw || 0.75 } : { type: 'none' } };
  if (o.transparency) opt.fill.transparency = o.transparency;
  if (o.name) opt.objectName = o.name;
  s.addShape(p.ShapeType.rect, opt);
}
function rrect(s, x, y, w, h, fill, o = {}) {
  const opt = { x, y, w, h, rectRadius: o.radius || 0.12, fill: fill ? { color: fill } : { type: 'none' },
    line: o.line ? { color: o.line, width: o.lw || 1, dashType: o.dash } : { type: 'none' } };
  if (o.shadow) opt.shadow = { type: 'outer', color: '000000', opacity: 0.18, blur: 6, offset: 2, angle: 90 };
  s.addShape(p.ShapeType.roundRect, opt);
}
/** One-corner-rounded rectangle (IM motif). corner: 'tr' (default) | 'tl' | 'br' | 'bl'. */
function r1rect(s, x, y, w, h, fill, o = {}) {
  const map = { tr: {}, tl: { flipH: true }, br: { flipV: true }, bl: { rotate: 180 } };
  const opt = Object.assign({ x, y, w, h, rectRadius: o.radius || 0.18, fill: fill ? { color: fill } : { type: 'none' },
    line: o.line ? { color: o.line, width: o.lw || 1 } : { type: 'none' } }, map[o.corner || 'tr']);
  s.addShape('round1Rect', opt);
}
function line(s, x1, y1, x2, y2, color, wpt = 0.75, dash) {
  s.addShape(p.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color, width: wpt, dashType: dash || 'solid' } });
}
function txt(s, t, o) {
  s.addText(t, Object.assign({ margin: 0, fontFace: F, color: C.black, isTextBox: true, valign: 'top' }, o));
}
function img(s, file, x, y, w, h, o = {}) {
  s.addImage(Object.assign({ path: file, x, y, w, h }, o));
}

// ---- generated raster assets ----
/** Diagonal hatch texture ("/" stripes), spacing 0.255 in like the IM's tiled SVG. Returns PNG path. */
function hatch(wIn, hIn, color = 'D9D9D9', tag = 'g') {
  const dpi = 200, pw = Math.round(wIn * dpi), ph = Math.round(hIn * dpi);
  const sp = Math.round(0.255 * dpi), lw = Math.max(2, Math.round(0.034 * dpi));
  const out = path.join(GEN, `hatch_${tag}_${pw}x${ph}.png`);
  if (fs.existsSync(out)) return out;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}">
  <defs><pattern id="h" width="${sp}" height="${sp}" patternUnits="userSpaceOnUse">
    <path d="M -${sp / 2} ${sp / 2} L ${sp / 2} -${sp / 2} M 0 ${sp} L ${sp} 0 M ${sp / 2} ${sp * 1.5} L ${sp * 1.5} ${sp / 2}" stroke="#${color}" stroke-width="${lw}" fill="none"/>
  </pattern></defs><rect width="100%" height="100%" fill="url(#h)"/></svg>`;
  fs.writeFileSync(out.replace('.png', '.svg'), svg);
  return sharp(Buffer.from(svg)).png().toFile(out).then(() => out);
}
/** react-icons → PNG (Feather 'fi' or Material 'md'), colour as hex. Returns Promise<path>. */
async function icon(name, color = '000000', px = 256) {
  const out = path.join(GEN, `icon_${name}_${color}.png`);
  if (fs.existsSync(out)) return out;
  const Comp = Fi[name] || Md[name];
  if (!Comp) throw new Error('icon not found: ' + name);
  let svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: '#' + color, size: px }));
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

// ---- IM chrome ----
/** Eyebrow tab: light tab with yellow stub, section name in caps (IM: x=-0.06, y=1.77, 8.31×1.42 cm). */
function eyebrow(s, text, o = {}) {
  const y = o.y == null ? cm(1.77) : o.y, h = cm(1.42), w = o.w || cm(8.31);
  r1rect(s, cm(-0.06), y, w, h, o.fill || C.grayL, { corner: 'br', radius: 0.11 });
  rect(s, cm(-0.06), y, cm(0.86), h, C.yellow);
  txt(s, text, { x: cm(1.1), y, w: w - cm(1.2), h, fontSize: o.size || 14, color: o.color || C.black, valign: 'middle', charSpacing: 0.6 });
}
function tracbelLogo(s, o = {}) {
  const w = o.w || cm(4.27), h = w * 450 / 2308;
  img(s, path.join(ASSETS, 'tracbel_logo.png'), o.x == null ? W - cm(0.97) - w : o.x, o.y == null ? cm(0.97) : o.y, w, h);
}
function igcLogo(s, x, y, h, white = false) {
  const w = h * 1200 / 1037; // igc_*.png are 1200 × ~1037
  img(s, path.join(ASSETS, white ? 'igc_white.png' : 'igc_black.png'), x, y, w, h);
}
function pageNo(s, n, o = {}) {
  txt(s, String(n), { x: W - cm(1.76), y: o.y == null ? cm(25.97) : o.y, w: cm(0.9), h: cm(0.51), fontSize: 12, color: o.color || C.black, align: 'right', valign: 'middle' });
}
/** Yellow letter/number badge (IM: A/B/C squares). */
function badge(s, x, y, d, label, o = {}) {
  rect(s, x, y, d, d, o.fill || C.yellow);
  txt(s, label, { x, y, w: d, h: d, fontSize: o.size || 12, bold: true, color: o.color || C.black, align: 'center', valign: 'middle' });
}
/** Yellow-outlined rounded comment card (IM slides 36–48). */
function card(s, x, y, w, h, o = {}) {
  rrect(s, x, y, w, h, o.fill || C.white, { radius: o.radius || 0.16, line: o.line || C.yellow, lw: o.lw || 1.5 });
}

module.exports = { init, get p() { return p; }, W, H, C, F, cm, CM, ASSETS, GEN,
  rect, rrect, r1rect, line, txt, img, hatch, icon, eyebrow, tracbelLogo, igcLogo, pageNo, badge, card };
