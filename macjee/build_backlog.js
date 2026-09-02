// Mac Jee — slide único "Backlog and pipeline by business unit", para entrar depois da p49 do CIM v8.
// Template: seção Financials (p49) — sem badge de BU, aba "Financials", card branco chanfrado com sombra,
// faixa navy em y=5,643. Números: arquivo comercial da Companhia (Backlog & Pipeline, 05/08/2026, rev. 2).
const K = require('./mj_kit.js');
const { txt, rect, chamfer, darkField, chrome, footer } = K;
const p = K.init();
const s = p.addSlide(); s.background = { color: 'FFFFFF' };

const NAVY_S = '021B94', BLUE_L = '95A8FE', GREY_O = 'D9D9D9', GREY_T = '3C4657', GREY_L = '8C93A8', INK = K.INK;

chrome(s, { tab: 3,
  title: 'Backlog and pipeline by business unit',
  subtitle: 'US$ 138 mm signed and US$ 1.8 bn of proposals above 50% probability, from 49 open opportunities across the three legal entities' });

/* ---------------- card principal (geometria da p49) ---------------- */
const CX = 0.391, CY = 1.56, CW = 12.551, CH = 3.74, CUT = 0.348;
chamfer(s, CX, CY, CW, CH, CUT, 'tr-bl', { fill: { color: 'FFFFFF' }, line: { type: 'none' },
  shadow: { type: 'outer', blur: 4, offset: 1.5, angle: 90, color: '000000', opacity: 0.16 } });

txt(s, 'Signed backlog and open pipeline by business unit – US$ mm, face value', { x: 0.63, y: 1.70, w: 8.0, h: 0.26,
  valign: 'middle', fontFace: K.F, bold: true, fontSize: 12, color: INK });
// legenda
const LEG = [['Signed backlog', NAVY_S], ['Proposals > 50% probability', BLUE_L], ['Other identified opportunities', GREY_O]];
let lx = 8.06;
LEG.forEach(([t, c]) => { rect(s, lx, 1.78, 0.12, 0.12, c);
  txt(s, t, { x: lx + 0.16, y: 1.72, w: 1.9, h: 0.24, valign: 'middle', fontFace: K.F, fontSize: 7.4, color: GREY_T });
  lx += t.length * 0.046 + 0.42; });

// cabeçalhos de coluna
const XL = 0.63, XB = 3.05, BW = 4.55, XI = 8.45, IW = 4.40;
const hdr = (t, x, w) => txt(s, t, { x, y: 2.06, w, h: 0.18, valign: 'middle', fontFace: 'Montserrat Light', fontSize: 7, color: GREY_L, charSpacing: 1.2 });
hdr('BUSINESS UNIT', XL, 2.2); hdr('SIGNED  →  PROPOSALS > 50%  →  OTHER IDENTIFIED', XB, BW); hdr('LARGEST OPEN OPPORTUNITIES  ·  VALUE  ·  PROBABILITY', XI, IW);

const ROWS = [
  { bu: 'Munitions & Weapon Systems', legal: 'Mac Jee Indústria de Defesa', dot: K.BU.munitions.strong,
    n: '4 signed  ·  30 open', seg: [62.7, 591, 951.6], tot: '1,605',
    items: [['US$ 250 mm', '75%', '155 mm ERFBBB, 60k rounds — BNV'],
            ['US$ 224 mm', '20%', '30 / 60 / 80 km rockets — Qatar'],
            ['US$ 197 mm', '30%', '155 mm M107, 100k rounds — BNV']] },
  { bu: 'Energetics', legal: 'Mac Jee Tecnologia', dot: K.BU.energetics.strong,
    n: '2 signed  ·  10 open', seg: [75, 251, 811.3], tot: '1,137',
    items: [['US$ 200 mm', '40%', 'TNT production line, 20 kt/yr — Canada (NALAGX)'],
            ['US$ 192 mm', '75%', 'RDX / TNT / acids lines — UAE'],
            ['US$ 190 mm', '40%', 'RDX and TNT lines — BAE Systems, UK']] },
  { bu: 'Missile', legal: 'TMC — The Missile Company', dot: K.BU.missile.strong,
    n: 'No signed contracts  ·  9 open', seg: [0, 1000, 850.7], tot: '1,851',
    items: [['US$ 1,000 mm', '50%', 'Confidential programme — KSA'],
            ['US$ 400 mm', '35%', 'Confidential programme — RSAF, KSA'],
            ['US$ 200 mm', '30%', 'Confidential programme — Azerbaijan MoD']] },
];
const SCALE = BW / 1851;           // polegadas por US$ mm
const COLS = [NAVY_S, BLUE_L, GREY_O], TXTC = ['FFFFFF', '0B1F6E', GREY_T];
const fmt = v => v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + ',' + String(Math.round(v) % 1000).padStart(3, '0') : String(Math.round(v));

ROWS.forEach((r, i) => {
  const y = 2.34 + i * 0.98;
  // rótulo
  s.addShape('ellipse', { x: XL, y: y + 0.05, w: 0.11, h: 0.11, fill: { color: r.dot }, line: { type: 'none' } });
  txt(s, r.bu, { x: XL + 0.17, y, w: 2.25, h: 0.22, valign: 'middle', fontFace: K.F, bold: true, fontSize: 9.5, color: INK, fit: 'shrink' });
  txt(s, r.legal, { x: XL + 0.17, y: y + 0.23, w: 2.15, h: 0.18, valign: 'middle', fontFace: K.F, fontSize: 7.4, color: GREY_T });
  txt(s, r.n, { x: XL + 0.17, y: y + 0.41, w: 2.15, h: 0.18, valign: 'middle', fontFace: K.F, fontSize: 7.4, color: GREY_L });
  // barra
  const by = y + 0.12, bh = 0.40; let bx = XB;
  r.seg.forEach((v, j) => {
    if (!v) return;
    const w = v * SCALE;
    rect(s, bx, by, w, bh, COLS[j]);
    if (w >= 0.42) txt(s, fmt(v), { x: bx, y: by, w, h: bh, align: 'center', valign: 'middle', fontFace: K.F, bold: true, fontSize: 8.4, color: TXTC[j] });
    else txt(s, fmt(v), { x: bx - 0.30, y: by - 0.20, w: w + 0.60, h: 0.18, align: 'center', valign: 'middle', fontFace: K.F, bold: true, fontSize: 7.4, color: NAVY_S });
    bx += w;
  });
  if (!r.seg[0]) txt(s, 'no signed backlog', { x: XB, y: by - 0.20, w: 1.4, h: 0.18, valign: 'middle', fontFace: K.F, fontSize: 7, color: GREY_L, italic: true });
  txt(s, r.tot, { x: bx + 0.08, y: by, w: 0.7, h: bh, valign: 'middle', fontFace: K.F, bold: true, fontSize: 9.5, color: INK });
  // oportunidades
  r.items.forEach(([v, pr, d], k) => {
    s.addText([{ text: v, options: { bold: true, color: INK } }, { text: '  ·  ' + pr, options: { bold: true, color: NAVY_S } },
               { text: '   ' + d, options: { color: GREY_T } }],
      { x: XI, y: y + k * 0.21, w: IW, h: 0.20, valign: 'middle', margin: 0, fontFace: K.F, fontSize: 7.6 });
  });
  if (i < 2) rect(s, XL, y + 0.80, CW - 0.55, 0.008, 'E6E8EE');
});

txt(s, 'Proposals above 50% as reported by the Company per legal entity (US$ 251 / 591 / 1,000 mm; TMC’s own sheet totals US$ 1,229 mm). “Other identified” is every remaining open opportunity at face value, unweighted. Weapon Systems products (Armadillo, Dagger, rockets, fuzes) are carried within Mac Jee Indústria de Defesa.',
  { x: 0.63, y: 5.00, w: 11.9, h: 0.26, valign: 'middle', fontFace: 'Montserrat Light', fontSize: 6.8, color: GREY_L });

/* ---------------- faixa escura (p49: y=5,643) ---------------- */
darkField(s, 0, 5.643, 13.333, 1.857);

const SC = [['138', 'mm', 'Signed backlog'], ['1.8', 'bn', 'Proposals above 50% probability'], ['1.9', 'bn', 'Probability-weighted open pipeline']];
SC.forEach(([v, u, l], i) => {
  const x = 0.60 + i * 1.92, y = 5.84, w = 1.74, h = 1.04;
  chamfer(s, x, y, w, h, 0.17, 'tr-bl', { fill: { color: K.STATFL }, line: { color: BLUE_L, width: 1.5 } });
  s.addText([{ text: 'USD ', options: { fontSize: 9 } }, { text: v, options: { fontSize: 20, bold: true } }, { text: ' ' + u, options: { fontSize: 11.5 } }],
    { x, y: y + 0.18, w, h: 0.40, align: 'center', valign: 'middle', color: 'FFFFFF', margin: 0, fontFace: K.F });
  txt(s, l, { x: x + 0.05, y: y + 0.60, w: w - 0.10, h: 0.30, align: 'center', valign: 'top', fontFace: K.F, fontSize: 7.2, color: 'FFFFFF', lineSpacingMultiple: 1.1 });
});

// geografia — todas as oportunidades + assinados, US$ 4.6 bn
const GX = 6.62, GW = 6.32;
txt(s, 'Where the US$ 4.6 bn sits — by end-user region, all stages', { x: GX, y: 5.86, w: GW, h: 0.24, valign: 'middle', fontFace: K.FM, fontSize: 9.5, color: 'FFFFFF' });
const GEO = [['MENA', 2188.8, '021B94'], ['Eastern Europe & Central Asia', 1505.4, '2E4BC4'], ['Western Europe', 446.1, '6F86E8'],
             ['North America', 280.5, '95A8FE'], ['Asia', 122.8, 'C3CDFB'], ['LATAM', 49.8, 'E4E8FA']];
const GT = GEO.reduce((a, g) => a + g[1], 0); let gx = GX;
GEO.forEach(([n, v, c]) => { const w = GW * v / GT; rect(s, gx, 6.20, w, 0.30, c);
  const pct = Math.round(100 * v / GT);
  if (w > 0.45) txt(s, pct + '%', { x: gx, y: 6.20, w, h: 0.30, align: 'center', valign: 'middle', fontFace: K.F, bold: true, fontSize: 8.4, color: v > 1000 ? 'FFFFFF' : '0B1F6E' });
  gx += w; });
GEO.forEach(([n, v, c], i) => { const pct = Math.round(100 * v / GT);
  const col = i % 3, row = Math.floor(i / 3), x = GX + col * 2.12, y = 6.58 + row * 0.24;
  rect(s, x, y + 0.06, 0.10, 0.10, c);
  s.addText([{ text: `${n}  `, options: { color: 'C6CBDA' } }, { text: `${pct}%`, options: { bold: true, color: 'FFFFFF' } }],
    { x: x + 0.15, y, w: 2.0, h: 0.22, valign: 'middle', margin: 0, fontFace: K.F, fontSize: 7.4 }); });

footer(s, 50, { source: 'Source: Company — Backlog & Pipeline commercial review, 5 Aug 2026 (rev. 2). Values at face value in US$; probabilities as assigned by the Company.' });
p.writeFile({ fileName: 'MacJee_Backlog_slide.pptx' }).then(() => console.log('WROTE MacJee_Backlog_slide.pptx'));
