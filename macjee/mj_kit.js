// Kit de construção do deck Mac Jee — reproduz o sistema visual do CIM.
// Todos os valores vêm de DESIGN_TOKENS.md (medidos do PDF, não estimados).
const pptxgen = require('pptxgenjs');

const W = 13.333, H = 7.5;

// ---- cores ----
const NAVY   = '00092B';   // fundo escuro / título
const INK    = '000312';   // texto sobre branco
const GRID   = '1C2441';   // grade sobre o navy
const NAVBLU = '00178D';   // aba ativa
const TABGRY = 'BFBFBF';   // aba inativa
const STATFL = '343D60';   // fill renderizado do card de stat (#CED5FF a 25% sobre navy)
const CONFID = '9DADFF';
const CHART  = '1E48E0';

// acento por BU: [forte (badge), tint (bordas)]
const BU = {
  weapon:    { strong: 'B8C4FD', tint: '92A0D3', name: 'WEAPON\nSYSTEMS' },
  missile:   { strong: '949494', tint: 'DFDFDF', name: 'MISSILE'   },
  munitions: { strong: '92D050', tint: 'AFDD7E', name: 'MUNITIONS' },
  energetics:{ strong: 'FFC000', tint: 'FFE081', name: 'ENERGETICS'},
  space:     { strong: 'FFB7B7', tint: 'FFB7B7', name: 'SPACE\nSYSTEMS' },
};

// ---- fontes ----
const F   = 'Montserrat';
const FM  = 'Montserrat Medium';
const FSB = 'Montserrat SemiBold';
const FB  = 'Montserrat';           // com bold:true

const TABS = [
  ['Mac Jee At a Glance',        0.429],
  ['Mac Jee Investment Thesis',  1.788],
  ['Business Units and Portfolio', 3.462],
  ['Financials',                 5.194],
];
const TABW = { 0: 1.10, 1: 1.45, 2: 1.55, 3: 0.62 };

function init() {
  const p = new pptxgen();
  p.defineLayout({ name: 'MJ', width: W, height: H });
  p.layout = 'MJ';
  p.author = 'IGC Partners';
  p.company = 'IGC Partners';
  return p;
}

const txt = (s, t, o) => s.addText(t, Object.assign({ margin: 0, fontFace: F, color: INK }, o));

// retângulo simples
function rect(s, x, y, w, h, color, opts) {
  s.addShape('rect', Object.assign({ x, y, w, h, fill: { color }, line: { type: 'none' } }, opts || {}));
}

/**
 * A forma-assinatura: retângulo com dois cantos opostos cortados a 45°.
 * dir 'tr-bl' corta topo-direita + baixo-esquerda (cards).
 * dir 'tl-br' corta topo-esquerda + baixo-direita (molduras de foto).
 * Implementado como custGeom via pontos percentuais.
 */
function chamfer(s, x, y, w, h, cut, dir, opts) {
  const cx = cut / w, cy = cut / h;
  const pts = dir === 'tl-br'
    ? [[cx,0],[1,0],[1,1-cy],[1-cx,1],[0,1],[0,cy]]
    : [[0,0],[1-cx,0],[1,cy],[1,1],[cx,1],[0,1-cy]];
  const o = Object.assign({
    x, y, w, h,
    points: pts.map(([a,b]) => ({ x: a*w, y: b*h })).concat([{ close: true }]),
  }, opts || {});
  s.addShape('custGeom', o);
}

/**
 * Cobre o canto chanfrado topo-direita com um triângulo da cor de fundo.
 * Necessário quando uma imagem retangular é colocada dentro de um card chanfrado:
 * o canto quadrado da foto invade o corte e mata a assinatura da forma.
 */
function chamferMaskTR(s, x, y, w, cut, color) {
  s.addShape('custGeom', {
    x: x + w - cut, y, w: cut, h: cut,
    fill: { color: color || 'FFFFFF' }, line: { type: 'none' },
    points: [{ x: 0, y: 0 }, { x: cut, y: 0 }, { x: cut, y: cut }, { close: true }],
  });
}

/** Fundo navy com a grade vertical. */
function darkField(s, x, y, w, h) {
  rect(s, x, y, w, h, NAVY);
  for (let gx = 0.077; gx < W; gx += 1.586) {
    if (gx >= x - 0.03 && gx <= x + w) rect(s, gx, y, 0.03, h, GRID);
  }
}

/** Cabeçalho padrão: abas + logo + título + subtítulo (+ badge de BU opcional). */
function chrome(s, o) {
  const active = o.tab === undefined ? 2 : o.tab;
  TABS.forEach(([label, x], i) => {
    txt(s, label, {
      x, y: 0.245, w: TABW[i] + 0.3, h: 0.16, valign: 'middle',
      fontFace: i === active ? FSB : F, fontSize: 6.98,
      color: i === active ? NAVBLU : TABGRY,
    });
  });
  // sublinhado da aba ativa, com losangos nas pontas
  const ax = TABS[active][1], aw = TABW[active];
  rect(s, ax, 0.487, aw, 0.012, '2196F3');
  [ax, ax + aw].forEach(dx =>
    s.addShape('diamond', { x: dx - 0.035, y: 0.458, w: 0.07, h: 0.07,
      fill: { color: '2196F3' }, line: { type: 'none' } }));

  s.addImage({ path: o.logo || 'assets/macjee_gold.png', x: 12.439, y: 0.376, w: 0.527, h: 0.527 });

  const bu = o.bu ? BU[o.bu] : null;
  if (bu) {
    // pílula sangrando pela esquerda, no acento forte a 40%
    s.addShape('roundRect', {
      x: -0.986, y: 0.674, w: 2.321, h: 0.959, rectRadius: 0.479,
      fill: { color: bu.strong, transparency: 60 }, line: { type: 'none' },
    });
    s.addImage({ path: 'assets/macjee_badge.png', x: 0.378, y: 0.852, w: 0.501, h: 0.474 });
    txt(s, bu.name, { x: -0.17, y: 1.345, w: 1.60, h: 0.30, align: 'center', valign: 'top',
      fontFace: FM, fontSize: 6, color: INK, charSpacing: 1.2, lineSpacingMultiple: 1.05 });
  }

  const tx = bu ? 1.440 : 0.429;
  txt(s, o.title, { x: tx, y: 0.80, w: W - tx - 0.55, h: 0.42, valign: 'middle',
    fontFace: F, bold: true, fontSize: 24, color: o.titleColor || NAVY });
  if (o.subtitle) {
    txt(s, o.subtitle, { x: tx, y: 1.235, w: W - tx - 0.55, h: 0.26, valign: 'middle',
      fontFace: F, fontSize: 11, color: '3C4657' });
  }
}

/** Rodapé: número da página + pílula Confidential. Chame por último. */
function footer(s, page, opts) {
  const onDark = !(opts && opts.onWhite);
  txt(s, String(page), { x: 0.391, y: 7.06, w: 0.5, h: 0.20, valign: 'middle',
    fontFace: FSB, fontSize: 8.04, color: onDark ? 'FFFFFF' : INK });
  s.addShape('roundRect', { x: 11.955, y: 7.075, w: 1.02, h: 0.215, rectRadius: 0.04,
    fill: { type: 'none' }, line: { color: '3C4E86', width: 0.75 } });
  txt(s, 'Confidential', { x: 11.955, y: 7.075, w: 1.02, h: 0.215, align: 'center',
    valign: 'middle', fontFace: F, fontSize: 6.96, color: CONFID });
}

/** Card de stat do rodapé escuro: USD +101 mm / Revenue in 2027E */
function statCard(s, x, y, w, h, o) {
  chamfer(s, x, y, w, h, 0.211, 'tr-bl', {
    fill: { color: STATFL }, line: { color: o.tint || 'DEF0C9', width: 2.25 },
  });
  const parts = [];
  if (o.pre)  parts.push({ text: o.pre + ' ', options: { fontSize: 10.68, fontFace: F } });
  if (o.plus) parts.push({ text: '+',        options: { fontSize: 10.68, fontFace: F, bold: true } });
  parts.push({ text: o.value, options: { fontSize: o.valueSize || 24, fontFace: F, bold: true } });
  if (o.unit) parts.push({ text: ' ' + o.unit, options: { fontSize: 14.04, fontFace: F } });
  s.addText(parts, { x, y: y + 0.30, w, h: 0.42, align: 'center', valign: 'middle',
    color: 'FFFFFF', margin: 0 });
  txt(s, o.label, { x, y: y + 0.72, w, h: 0.22, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 8.04, color: 'FFFFFF' });
}

/** "Chip" das páginas Portfolio: círculo + valor bold + label. */
function chip(s, x, y, o) {
  const d = 0.52;
  s.addShape('ellipse', { x, y, w: d, h: d, fill: { color: o.circle || 'FFFFFF' }, line: { type: 'none' } });
  if (o.icon) txt(s, o.icon, { x, y, w: d, h: d, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 13, color: o.iconColor || NAVY });
  txt(s, o.value, { x: x + d + 0.14, y: y - 0.01, w: o.w || 2.0, h: 0.26, valign: 'middle',
    fontFace: F, bold: true, fontSize: 11, color: 'FFFFFF' });
  txt(s, o.label, { x: x + d + 0.14, y: y + 0.25, w: o.w || 2.0, h: 0.22, valign: 'middle',
    fontFace: F, fontSize: 8, color: 'C6CBDA' });
}

module.exports = {
  pptxgen, init, W, H,
  NAVY, INK, GRID, NAVBLU, TABGRY, STATFL, CONFID, CHART, BU,
  F, FM, FSB, FB,
  txt, rect, chamfer, chamferMaskTR, darkField, chrome, footer, statCard, chip,
};
