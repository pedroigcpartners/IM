// Mac Jee — p50: "US$ 4.6 bn of identified opportunity by business unit".
//
// Substitui o slide de backlog decomposto. O banqueiro pediu UM número de tamanho por BU,
// tom vendedor, e que a página sirva de base para as p51/52/53 (Potential | Munitions /
// Energetics / Missile). O gancho é o tamanho; a prova é a cobertura do plano.
//
// Template: seção Financials do CIM v9 (p49) — sem badge de BU, aba "Financials",
// card branco chanfrado com sombra, faixa navy em y=5,643.
//
// Números: backlog.xlsx (revisão comercial da Companhia, 05/08/2026 rev.2) e modelo.xlsx v025.
const K = require('./mj_kit.js');
const { txt, rect, chamfer, darkField, chrome, footer } = K;

const p = K.init();
const s = p.addSlide(); s.background = { color: 'FFFFFF' };

const INK = K.INK, GREY_T = '3C4657', GREY_L = '8C93A8', NAVY_S = '021B94', BLUE_L = '95A8FE';

chrome(s, { tab: 3,
  title: 'US$ 4.6 bn of identified opportunity by business unit',
  subtitle: '55 named programmes across 21 countries — 1.1x the entire 2026–32 revenue plan, already identified commercially' });

/* ===================== card branco (geometria da p49) ===================== */
const CX = 0.391, CY = 1.56, CW = 12.551, CH = 3.38, CUT = 0.348;
chamfer(s, CX, CY, CW, CH, CUT, 'tr-bl', { fill: { color: 'FFFFFF' }, line: { type: 'none' },
  shadow: { type: 'outer', blur: 4, offset: 1.5, angle: 90, color: '000000', opacity: 0.16 } });

txt(s, 'Identified commercial opportunity by business unit — total contract value', {
  x: 0.63, y: 1.70, w: 8.4, h: 0.26, valign: 'middle', fontFace: K.F, bold: true, fontSize: 12, color: INK });

const BUS = [
  { name: 'Munitions', legal: 'Mac Jee Indústria de Defesa', accent: '6FA82F', bar: '92D050',
    desc: 'Aerial bombs, artillery, rockets, fuzes and launcher vehicles — the unit already in serial production',
    hero: '1.6', total: 1605.3, share: '35%',
    m: [['PROGRAMMES', '34 across 11 countries'],
        ['LARGEST', 'US$ 250 mm · 155 mm ERFBBB — Bulgaria'],
        ['IN THE 2026–32 PLAN', 'US$ 1.55 bn  ·  104% covered']],
    next: 'Capacity is already built' },
  { name: 'Energetics', legal: 'Mac Jee Tecnologia', accent: 'C79000', bar: 'FFC000',
    desc: 'Turnkey TNT, RDX and HMX production lines delivered to sovereign customers worldwide',
    hero: '1.1', total: 1137.3, share: '25%',
    m: [['PROGRAMMES', '12 across 11 countries'],
        ['LARGEST', 'US$ 200 mm · TNT line, 20 kt/yr — Canada'],
        ['IN THE 2026–32 PLAN', 'US$ 0.61 bn  ·  188% covered']],
    next: 'Revenue is contracted, not forecast' },
  { name: 'Missile', legal: 'TMC — The Missile Company', accent: '4A5261', bar: '9AA3B2',
    desc: 'Cruise missiles, air defence, anti-radiation and rocket motors for European and Gulf primes',
    hero: '1.9', total: 1850.7, share: '40%',
    m: [['PROGRAMMES', '9 across 5 countries'],
        ['LARGEST', 'US$ 1,000 mm · confidential — Saudi Arabia'],
        ['IN THE 2026–32 PLAN', 'US$ 1.93 bn  ·  96% covered']],
    next: 'The unit becomes the group’s engine' },
];

const COLW = 3.86, GAP = 0.245, X0 = 0.63;
const BARMAX = 1850.7, BARW = 3.30;

BUS.forEach((b, i) => {
  const x = X0 + i * (COLW + GAP);
  // divisor vertical entre colunas
  if (i) rect(s, x - GAP / 2, 1.98, 0.008, 2.72, 'E6E8EE');

  rect(s, x, 2.02, 1.05, 0.055, b.accent);
  txt(s, b.name, { x, y: 2.14, w: COLW, h: 0.26, valign: 'middle',
    fontFace: K.F, bold: true, fontSize: 14, color: b.accent });
  txt(s, b.legal, { x, y: 2.40, w: COLW, h: 0.18, valign: 'middle',
    fontFace: K.F, fontSize: 7.4, color: GREY_L });
  txt(s, b.desc, { x, y: 2.60, w: COLW - 0.12, h: 0.42, valign: 'top',
    fontFace: K.F, fontSize: 8.4, color: GREY_T, lineSpacingMultiple: 1.16 });

  // número-herói
  s.addText([{ text: 'US$ ', options: { fontSize: 13, color: GREY_T } },
             { text: b.hero, options: { fontSize: 40, bold: true, color: INK } },
             { text: ' bn', options: { fontSize: 17, color: INK } }],
    { x, y: 3.06, w: COLW, h: 0.56, valign: 'middle', margin: 0, fontFace: K.F });
  txt(s, `identified opportunity  ·  ${b.share} of the group`, { x, y: 3.60, w: COLW, h: 0.18,
    valign: 'middle', fontFace: K.F, fontSize: 8, color: GREY_L });

  // barra proporcional, mesma escala nas três colunas
  rect(s, x, 3.84, BARW, 0.115, 'EDEFF4');
  rect(s, x, 3.84, BARW * b.total / BARMAX, 0.115, b.bar);

  // métricas
  b.m.forEach(([lab, val], j) => {
    const y = 4.08 + j * 0.285;
    txt(s, lab, { x, y, w: 1.30, h: 0.16, valign: 'middle',
      fontFace: 'Montserrat Light', fontSize: 6.2, color: GREY_L, charSpacing: 0.5 });
    txt(s, val, { x: x + 1.34, y: y - 0.02, w: COLW - 1.40, h: 0.20, valign: 'middle',
      fontFace: K.F, bold: j === 2, fontSize: 7.6, color: j === 2 ? b.accent : INK });
  });
});

txt(s, 'Identified opportunity is the total contract value of every signed contract and open commercial opportunity in the Company’s commercial review, at face value and unweighted. Coverage compares it with cumulative gross revenue in the 2026–32 plan.',
  { x: 0.63, y: 5.10, w: 12.0, h: 0.22, valign: 'middle',
    fontFace: 'Montserrat Light', fontSize: 6.6, color: GREY_L });

/* ===================== faixa navy ===================== */
darkField(s, 0, 5.643, 13.333, 1.857);

const CARDS = [['4.6', 'bn', 'Identified opportunity'],
               ['4.1', 'bn', 'Revenue in the 2026–32 plan'],
               ['1.1', 'x', 'Plan coverage']];
CARDS.forEach(([v, u, l], i) => {
  const x = 0.60 + i * 1.92, y = 5.86, w = 1.74, h = 1.04;
  chamfer(s, x, y, w, h, 0.17, 'tr-bl', { fill: { color: K.STATFL }, line: { color: BLUE_L, width: 1.5 } });
  s.addText([{ text: 'USD ', options: { fontSize: 9 } }, { text: v, options: { fontSize: 20, bold: true } },
             { text: ' ' + u, options: { fontSize: 11.5 } }],
    { x, y: y + 0.18, w, h: 0.40, align: 'center', valign: 'middle', color: 'FFFFFF', margin: 0, fontFace: K.F });
  txt(s, l, { x: x + 0.05, y: y + 0.60, w: w - 0.10, h: 0.30, align: 'center', valign: 'top',
    fontFace: K.F, fontSize: 7.2, color: 'FFFFFF', lineSpacingMultiple: 1.1 });
});

// ponte explícita para as três páginas seguintes
const BX = 6.62;
txt(s, 'The three pages that follow take each unit in turn', { x: BX, y: 5.86, w: 6.3, h: 0.24,
  valign: 'middle', fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
rect(s, BX, 6.13, 6.31, 0.010, '3C4E86');
BUS.forEach((b, i) => {
  const y = 6.26 + i * 0.30;
  rect(s, BX, y + 0.055, 0.10, 0.10, b.bar);
  s.addText([{ text: b.name, options: { bold: true, color: 'FFFFFF' } },
             { text: '   ' + b.next, options: { color: 'C6CBDA' } }],
    { x: BX + 0.20, y, w: 6.1, h: 0.22, valign: 'middle', margin: 0, fontFace: K.F, fontSize: 8.6 });
});

footer(s, 50, { source: 'Source: Company — commercial review of backlog and pipeline, 5 Aug 2026 (rev. 2); Company financial model, Base case (FX R$ 5.17/US$).' });

p.writeFile({ fileName: 'MacJee_p50_BU_size.pptx' }).then(() => console.log('WROTE MacJee_p50_BU_size.pptx'));
