// Mac Jee — p50: "US$ 4.6 bn of identified opportunity by business unit".
//
// Quatro seções: o total do grupo como bloco próprio (painel navy, à esquerda) e três
// colunas, uma por BU. O gancho é o tamanho; a prova é a cobertura do plano; a faixa
// inferior faz a ponte explícita para as p51/52/53.
//
// Template: seção Financials do CIM v9 (p49) — sem badge de BU, aba "Financials",
// card branco chanfrado com sombra, faixa navy em y=5,643.
//
// Números: backlog.xlsx (revisão comercial da Companhia, 05/08/2026 rev.2) e modelo.xlsx v025.
const K = require('./mj_kit.js');
const { txt, rect, chamfer, darkField, chrome, footer } = K;

const p = K.init();
const s = p.addSlide(); s.background = { color: 'FFFFFF' };

const INK = K.INK, GREY_T = '3C4657', GREY_L = '8C93A8', BLUE_L = '95A8FE';

chrome(s, { tab: 3,
  title: 'US$ 4.6 bn of identified opportunity by business unit',
  subtitle: '55 named programmes across 21 countries — 1.1x the entire 2026–32 revenue plan, already identified commercially' });

/* ===================== card branco (geometria da p49) ===================== */
const CX = 0.391, CY = 1.56, CW = 12.551, CH = 3.38, CUT = 0.348;
chamfer(s, CX, CY, CW, CH, CUT, 'tr-bl', { fill: { color: 'FFFFFF' }, line: { type: 'none' },
  shadow: { type: 'outer', blur: 4, offset: 1.5, angle: 90, color: '000000', opacity: 0.16 } });

txt(s, 'Identified commercial opportunity — total contract value, US$', {
  x: 0.63, y: 1.68, w: 8.4, h: 0.24, valign: 'middle', fontFace: K.F, bold: true, fontSize: 12, color: INK });

/* ---------- seção 1: TOTAL DO GRUPO (painel navy) ---------- */
const TX = 0.63, TY = 1.99, TW = 2.78, TH = 2.81;
chamfer(s, TX, TY, TW, TH, 0.22, 'tr-bl', { fill: { color: K.NAVY }, line: { type: 'none' } });

txt(s, 'GROUP TOTAL', { x: TX + 0.24, y: TY + 0.20, w: TW - 0.48, h: 0.18, valign: 'middle',
  fontFace: K.FM, fontSize: 7.2, color: BLUE_L, charSpacing: 1.4 });
s.addText([{ text: 'US$ ', options: { fontSize: 13, color: 'C6CBDA' } },
           { text: '4.6', options: { fontSize: 44, bold: true, color: 'FFFFFF' } },
           { text: ' bn', options: { fontSize: 18, color: 'FFFFFF' } }],
  { x: TX + 0.24, y: TY + 0.44, w: TW - 0.48, h: 0.62, valign: 'middle', margin: 0, fontFace: K.F });
txt(s, 'identified commercial opportunity', { x: TX + 0.24, y: TY + 1.06, w: TW - 0.48, h: 0.18,
  valign: 'middle', fontFace: K.F, fontSize: 7.8, color: 'C6CBDA' });
rect(s, TX + 0.24, TY + 1.34, TW - 0.48, 0.010, '3C4E86');

const TM = [['Named programmes', '55'], ['Countries', '21'],
            ['Revenue in the 2026–32 plan', 'US$ 4.1 bn'], ['Plan coverage', '1.1x']];
TM.forEach(([l, v], i) => {
  const y = TY + 1.46 + i * 0.295;
  txt(s, l, { x: TX + 0.24, y, w: 1.62, h: 0.20, valign: 'middle',
    fontFace: K.F, fontSize: 7.6, color: 'C6CBDA' });
  txt(s, v, { x: TX + TW - 1.12, y, w: 0.88, h: 0.20, align: 'right', valign: 'middle',
    fontFace: K.F, bold: true, fontSize: 9.5, color: 'FFFFFF' });
});

/* ---------- seções 2-4: uma por BU ---------- */
const BUS = [
  { name: 'Munitions', legal: 'Mac Jee Indústria de Defesa', accent: '6FA82F', bar: '92D050',
    desc: 'Aerial bombs, artillery, rockets, fuzes and launcher vehicles — already in serial production',
    hero: '1.6', total: 1605.3, share: '35%',
    prog: '34 programmes  ·  11 countries',
    big: 'US$ 250 mm — 155 mm ERFBBB, Bulgaria',
    plan: 'US$ 1.55 bn  ·  104% covered',
    next: 'Capacity is already built' },
  { name: 'Energetics', legal: 'Mac Jee Tecnologia', accent: 'C79000', bar: 'FFC000',
    desc: 'Turnkey TNT, RDX and HMX production lines delivered to sovereign customers worldwide',
    hero: '1.1', total: 1137.3, share: '25%',
    prog: '12 programmes  ·  11 countries',
    big: 'US$ 200 mm — TNT line, 20 kt/yr, Canada',
    plan: 'US$ 0.61 bn  ·  188% covered',
    next: 'Revenue is contracted, not forecast' },
  { name: 'Missile', legal: 'TMC — The Missile Company', accent: '4A5261', bar: '9AA3B2',
    desc: 'Cruise missiles, air defence, anti-radiation systems and rocket motors for European and Gulf primes',
    hero: '1.9', total: 1850.7, share: '40%',
    prog: '9 programmes  ·  5 countries',
    big: 'US$ 1,000 mm — confidential, Saudi Arabia',
    plan: 'US$ 1.93 bn  ·  96% covered',
    next: 'The unit becomes the group’s engine' },
];

const X0 = 3.72, COLW = 2.80, GAP = 0.24, BARMAX = 1850.7, BARW = 2.42;

BUS.forEach((b, i) => {
  const x = X0 + i * (COLW + GAP);
  if (i) rect(s, x - GAP / 2, TY, 0.008, TH, 'E6E8EE');

  rect(s, x, 2.02, 0.95, 0.055, b.accent);
  txt(s, b.name, { x, y: 2.13, w: COLW, h: 0.26, valign: 'middle',
    fontFace: K.F, bold: true, fontSize: 13.5, color: b.accent });
  txt(s, b.legal, { x, y: 2.38, w: COLW, h: 0.17, valign: 'middle',
    fontFace: K.F, fontSize: 7, color: GREY_L });
  txt(s, b.desc, { x, y: 2.57, w: COLW - 0.08, h: 0.46, valign: 'top',
    fontFace: K.F, fontSize: 7.8, color: GREY_T, lineSpacingMultiple: 1.16 });

  s.addText([{ text: 'US$ ', options: { fontSize: 12, color: GREY_T } },
             { text: b.hero, options: { fontSize: 34, bold: true, color: INK } },
             { text: ' bn', options: { fontSize: 15, color: INK } }],
    { x, y: 3.06, w: COLW, h: 0.50, valign: 'middle', margin: 0, fontFace: K.F });
  txt(s, `identified  ·  ${b.share} of the group`, { x, y: 3.54, w: COLW, h: 0.18,
    valign: 'middle', fontFace: K.F, fontSize: 7.6, color: GREY_L });

  rect(s, x, 3.77, BARW, 0.105, 'EDEFF4');
  rect(s, x, 3.77, BARW * b.total / BARMAX, 0.105, b.bar);

  txt(s, b.prog, { x, y: 3.98, w: COLW, h: 0.20, valign: 'middle',
    fontFace: K.F, fontSize: 8, color: INK });
  txt(s, 'Largest', { x, y: 4.22, w: COLW, h: 0.16, valign: 'middle',
    fontFace: 'Montserrat Light', fontSize: 6.2, color: GREY_L, charSpacing: 0.6 });
  txt(s, b.big, { x, y: 4.37, w: COLW, h: 0.20, valign: 'middle',
    fontFace: K.F, fontSize: 7.8, color: INK });
  txt(s, b.plan, { x, y: 4.60, w: COLW, h: 0.20, valign: 'middle',
    fontFace: K.F, bold: true, fontSize: 8, color: b.accent });
});

txt(s, 'Identified opportunity is the total contract value of every signed contract and open commercial opportunity in the Company’s commercial review, at face value and unweighted. Coverage compares it with cumulative gross revenue in the 2026–32 plan.',
  { x: 0.63, y: 5.10, w: 12.0, h: 0.22, valign: 'middle',
    fontFace: 'Montserrat Light', fontSize: 6.6, color: GREY_L });

/* ===================== faixa navy ===================== */
darkField(s, 0, 5.643, 13.333, 1.857);

// esquerda: ponte para as três páginas seguintes
const BX = 0.60;
txt(s, 'The three pages that follow take each unit in turn', { x: BX, y: 5.84, w: 5.6, h: 0.24,
  valign: 'middle', fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
rect(s, BX, 6.09, 5.6, 0.010, '3C4E86');
BUS.forEach((b, i) => {
  const y = 6.20 + i * 0.26;
  rect(s, BX, y + 0.055, 0.10, 0.10, b.bar);
  s.addText([{ text: b.name, options: { bold: true, color: 'FFFFFF' } },
             { text: '   ' + b.next, options: { color: 'C6CBDA' } }],
    { x: BX + 0.20, y, w: 5.4, h: 0.22, valign: 'middle', margin: 0, fontFace: K.F, fontSize: 8.6 });
});

// direita: onde a oportunidade está
const GX = 6.90, GW = 6.04;
txt(s, 'Where the opportunity sits — by end-user region', { x: GX, y: 5.84, w: GW, h: 0.24,
  valign: 'middle', fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
rect(s, GX, 6.09, GW, 0.010, '3C4E86');
const GEO = [['MENA', 2188.8, '021B94'], ['Eastern Europe & Central Asia', 1505.4, '2E4BC4'],
             ['Western Europe', 446.1, '6F86E8'], ['North America', 280.5, '95A8FE'],
             ['Asia', 122.8, 'C3CDFB'], ['LATAM', 49.8, 'E4E8FA']];
const GT = GEO.reduce((a, g) => a + g[1], 0);
let gx = GX;
GEO.forEach(([n, v, c]) => {
  const w = GW * v / GT, pct = Math.round(100 * v / GT);
  rect(s, gx, 6.22, w, 0.28, c);
  if (w > 0.42) txt(s, pct + '%', { x: gx, y: 6.22, w, h: 0.28, align: 'center', valign: 'middle',
    fontFace: K.F, bold: true, fontSize: 8.4, color: v > 1000 ? 'FFFFFF' : '0B1F6E' });
  gx += w;
});
// legenda em grade 3 x 2, para não colidir
GEO.forEach(([n, v, c], i) => {
  const lx = GX + (i % 3) * 2.02, ly = 6.58 + Math.floor(i / 3) * 0.23;
  rect(s, lx, ly + 0.055, 0.10, 0.10, c);
  s.addText([{ text: n + '  ', options: { color: 'C6CBDA' } },
             { text: Math.round(100 * v / GT) + '%', options: { color: 'FFFFFF', bold: true } }],
    { x: lx + 0.15, y: ly, w: 1.82, h: 0.21, valign: 'middle', margin: 0, fontFace: K.F, fontSize: 7.2 });
});

footer(s, 50, { source: 'Source: Company — commercial review of backlog and pipeline, 5 Aug 2026 (rev. 2); Company financial model, Base case (FX R$ 5.17/US$).' });

p.writeFile({ fileName: 'MacJee_p50_BU_size.pptx' }).then(() => console.log('WROTE MacJee_p50_BU_size.pptx'));
