// Project Green — teaser one-page do grupo (todas as frentes), cego.
//
// MESMA GEOMETRIA do teaser Project Compass, medida no XML do próprio arquivo
// (não estimada de PDF). Retrato 7,5 x 10,8333"; grade de 3 colunas em
// x = 0,394 / 2,662 / 4,931 (larg. 1,969) com divisores verticais em x = 2,493
// e 4,712; numerais 01/02/03 em y = 1,399 (28pt, gold); banda navy full-bleed em
// y = 3,3767 h = 0,7754; seção branca 4,19–6,23; banda cinza y = 6,232 h = 1,666
// com 6 stats em x = 0,449 / 2,754 / 5,06 e y = 6,489 / 7,191; contatos em
// y = 8,189; faixa de foto y = 8,7627 h = 0,827.
// "Disclaimer:" e o disclaimer vêm do layout do arquivo de referência e são
// reproduzidos aqui em y = 9,810 / 10,012.
//
// DIFERENÇA vs. o teaser do Compass: a seção branca troca o par mapa-simples +
// cluster de logos pelo "Geographic Index" do IM do grupo — mapa com as quatro
// macro-regiões sombreadas, contorno nos estados de operação e um callout de
// setores por região. Assets e conteúdo: IM (jul-2026) + apresentação agro
// (2026) + DRE fornecido pela equipe.
//
// Teaser CEGO: não nomeia a companhia nem nenhum OEM.

const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.defineLayout({ name: 'ONEPAGER', width: 7.5, height: 10.8333 });
p.layout = 'ONEPAGER';
p.author = 'IGC Partners';
p.title = 'Project Green — Teaser';

/* ===== TOKENS (amostrados do render do Compass a 300 dpi) ===== */
const NAVY = '222F44';     // tx1 / dk1
const GOLD = 'D3A93D';     // accent1
const GRAYBG = 'F8F8F8';   // accent5 @50% sobre branco
const RULE = '111721';     // tx1 lumMod 50% — régua sob o título
const WHITE = 'FFFFFF';
const SANS = 'Poppins';
// as quatro macro-regiões, nas mesmas cores em que o mapa foi recolorido
const R_NCW = 'DDE1E6';    // North and Middle West
const R_NE = 'BCC3CD';     // Northeast
const R_SE = 'D3A93D';     // Southeast
const R_S = 'E3CE93';      // South

const W = 7.5;
const COL = [0.394, 2.662, 4.931];
const CW = 1.969;

const s = p.addSlide();
s.background = { color: WHITE };

const txt = (t, o) => s.addText(t, Object.assign({ margin: 0, fontFace: SANS, color: NAVY }, o));
const rect = (x, y, w, h, c) =>
  s.addShape(p.ShapeType.rect, { x, y, w, h, fill: { color: c }, line: { type: 'none' } });

/* ===== CABEÇALHO ===== */
s.addImage({ path: 'assets/igc_navy.png', x: 0.394, y: 0.394, w: 0.399, h: 0.345 });
s.addShape(p.ShapeType.line, {
  x: 0.394, y: 0.809, w: 6.508, h: 0,
  line: { color: RULE, width: 0.75 },
});
txt('Project Green', {
  x: 0.394, y: 0.905, w: 6.512, h: 0.315,
  fontSize: 24, bold: true, valign: 'top', lineSpacingMultiple: 1.1,
});

/* ===== TRÊS PILARES ===== */
const PILLARS = [
  ['Nationwide multi-brand distribution',
   '#2 heavy-equipment dealer in Brazil across all brands, serving eight sectors from mining to agriculture'],
  ['Aftermarket-led service platform',
   'Two thirds of the workforce in after-sales, an ~85% absorption rate and +100k SKUs in parts e-commerce'],
  ['Digital and connected operations',
   'Fleet telemetry and 24/7 autonomous stores converting an installed base of +8.6k units into recurring demand'],
];
PILLARS.forEach((pl, i) => {
  txt('0' + (i + 1) + '.', {
    x: COL[i], y: 1.399, w: CW, h: 0.499,
    fontSize: 28, bold: true, color: GOLD, valign: 'bottom', align: 'left',
    lineSpacingMultiple: 1.1,
  });
  s.addText(
    [
      { text: pl[0], options: { bold: true, breakLine: true, paraSpaceAfter: 8 } },
      { text: pl[1], options: {} },
    ],
    {
      x: COL[i], y: 1.798, w: (i === 2 ? 2.10 : CW), h: 1.415,
      margin: 0, fontFace: SANS, color: NAVY, fontSize: 10,
      valign: 'top', align: 'left', lineSpacingMultiple: 1.1,
    }
  );
});
[2.493, 4.712].forEach((x) =>
  s.addShape(p.ShapeType.line, { x, y: 1.397, w: 0, h: 1.761, line: { color: NAVY, width: 0.75 } })
);

/* ===== BANDA NAVY — conclusão ===== */
rect(0, 3.3767, W, 0.7754, NAVY);
s.addText(
  [
    { text: 'The Company is one of Brazil’s largest equipment distributors,', options: { color: WHITE, breakLine: true } },
    { text: 'combining nationwide reach with an aftermarket-led, digital operation', options: { color: GOLD } },
  ],
  {
    x: 0.20, y: 3.3767, w: W - 0.40, h: 0.7754,
    margin: 0, fontFace: SANS, fontSize: 12, align: 'center', valign: 'middle',
    lineSpacingMultiple: 1.1,
  }
);

/* ===== SEÇÃO BRANCA — overview | geographic index ===== */
txt('Business Overview', { x: 0.394, y: 4.19, w: 2.15, h: 0.35, fontSize: 14, bold: true, valign: 'top' });
txt('Multi-brand distributor of construction, mining, forestry and agricultural equipment, operating across Brazil for 59 years on an aftermarket-led model built on parts e‑commerce, fleet telemetry and 24/7 autonomous stores',
  { x: 0.394, y: 4.50, w: 2.10, h: 1.62, fontSize: 10, valign: 'top', lineSpacingMultiple: 1.1 });

txt('Geographic Index', { x: 2.58, y: 4.19, w: 2.30, h: 0.35, fontSize: 14, bold: true, valign: 'top' });

// mapa das quatro macro-regiões, recolorido do IM para a paleta da casa.
// Contorno navy = estados de operação (o Sul aparece sombreado como região, mas
// não tem contorno: não há operação lá — confere com a lista de unidades do IM).
const MW = 1.64, MH = MW / 1.0008, MX = 4.02, MY = 4.44;
s.addImage({ path: 'assets/green/map_regions.png', x: MX, y: MY, w: MW, h: MH });

// callouts de setor por região — mesma leitura do IM, dois de cada lado do mapa
const CALLOUTS = [
  { x: 2.58, y: 4.52, label: 'North and Middle West', fill: R_NCW, dark: true,
    items: ['Construction', 'Agriculture', 'Logistics', 'Infrastructure'] },
  { x: 5.86, y: 4.52, label: 'Northeast', fill: R_NE, dark: true,
    items: ['Forest', 'Agriculture', 'Construction'] },
  { x: 2.58, y: 5.34, label: 'South', fill: R_S, dark: true,
    items: ['Agriculture', 'Industry', 'Forest', 'Construction'] },
  { x: 5.86, y: 5.34, label: 'Southeast', fill: R_SE, dark: true,
    items: ['Forest and mining', 'Agriculture', 'Industry', 'Construction'] },
];
const CW_CO = 1.24;
CALLOUTS.forEach((c) => {
  rect(c.x, c.y, CW_CO, 0.155, c.fill);
  txt(c.label, {
    x: c.x, y: c.y, w: CW_CO, h: 0.155,
    fontSize: 6, bold: true, color: c.dark ? NAVY : WHITE,
    align: 'center', valign: 'middle',
  });
  c.items.forEach((it, j) =>
    txt(it, {
      x: c.x + 0.05, y: c.y + 0.195 + j * 0.105, w: CW_CO - 0.05, h: 0.105,
      fontSize: 6, valign: 'middle',
    })
  );
});

// legenda do contorno, sob o mapa
s.addShape(p.ShapeType.rect, {
  x: 3.98, y: 6.115, w: 0.075, h: 0.075,
  fill: { color: WHITE }, line: { color: NAVY, width: 1 },
});
txt('States of the Company’s main operations', {
  x: 4.10, y: 6.103, w: 1.70, h: 0.10, fontSize: 5, valign: 'middle',
});

/* ===== BANDA CINZA — key highlights ===== */
rect(0, 6.232, W, 1.666, GRAYBG);
txt('Key Highlights', { x: 0.394, y: 6.279, w: 2.114, h: 0.217, fontSize: 12, bold: true, color: GOLD, valign: 'top' });
const STATS = [
  ['BRL 2.6 Bn', 'Net revenues 2025⁽¹⁾'],
  ['BRL 123 Mn', 'EBITDA 2025⁽¹⁾'],
  ['#2', 'Dealer in heavy equipment'],
  ['36', 'Locations⁽²⁾'],
  ['+1,000', 'Employees⁽²⁾'],
  ['8', 'Sectors served'],
];
const SX = [0.449, 2.754, 5.06], SY = [6.489, 7.191];
STATS.forEach((st, i) => {
  const x = SX[i % 3], y = SY[Math.floor(i / 3)];
  s.addText(
    [
      { text: st[0], options: { fontSize: 20, bold: true, breakLine: true } },
      { text: st[1], options: { fontSize: 10, bold: true } },
    ],
    { x, y, w: 2.165, h: 0.505, margin: 0, fontFace: SANS, color: NAVY, align: 'left', valign: 'top', lineSpacingMultiple: 1.1 }
  );
});

/* ===== CONTATOS ===== */
txt('For any further questions please contact:', {
  x: 0.396, y: 7.953, w: 6.307, h: 0.178, fontSize: 10, underline: { style: 'sng' }, valign: 'top',
});
[['Bruno Iervolino', 'Bruno.iervolino@igcp.com.br'],
 ['Gabriel Brito', 'Gabriel.brito@igcp.com.br'],
 ['Pedro Grando', 'Pedro.grando@igcp.com.br']].forEach((c, i) => {
  s.addText(
    [
      { text: c[0], options: { bold: true, breakLine: true } },
      { text: c[1], options: { breakLine: true } },
      { text: '+55 11 3815 3533', options: {} },
    ],
    { x: 0.394 + i * 2.23, y: 8.189, w: 2.047, h: 0.673, margin: 0, fontFace: SANS, color: NAVY, fontSize: 10, valign: 'top', lineSpacingMultiple: 1.1 }
  );
});

/* ===== FAIXA DE FOTO =====
   Teaser cego: nenhuma máquina no quadro, para não revelar OEM pela livery. */
s.addImage({
  path: 'assets/green/hero_cane_aerial.png',
  x: -0.0003, y: 8.7627, w: 7.5305, h: 0.827,
  sizing: { type: 'cover', w: 7.5305, h: 0.827 },
});

/* ===== SOURCE + DISCLAIMER ===== */
s.addText(
  [
    { text: 'Source: ', options: { bold: true } },
    { text: 'Information Memorandum (Jul-2026) and Company materials. (1) Sum of two separately reported perimeters: heavy equipment BRL 1,200 Mn / BRL 65 Mn and agriculture BRL 1,360 Mn / BRL 58 Mn (net revenues / EBITDA); not audited consolidated. (2) 23 + 13 locations; 470 + 600 employees; overlap to be confirmed.', options: {} },
  ],
  { x: 0.394, y: 9.606, w: 6.512, h: 0.20, margin: 0, fontFace: SANS, color: NAVY, fontSize: 5, valign: 'top', lineSpacingMultiple: 1.1 }
);
txt('Disclaimer:', { x: 0.396, y: 9.810, w: 6.307, h: 0.135, fontSize: 8, bold: true, color: GOLD, charSpacing: 0.3, valign: 'top' });
txt('All information contained in this material has been prepared based on the documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or through independent researches. No liability is or shall be attributed to the members of IGC, including its partners, directors, employees, agents or advisers, in connection with the accuracy or completeness of the information contained herein or in connection with any other written or oral information made available to the recipient or its advisor. In particular, no representation or warranty is given as to the achievement or reasonableness of any future projections, management estimates, prospects or returns. This material belongs to IGC and shall not be copied, reproduced and/or distributed or disclosed to any third party without the prior consent of IGC. By receiving this material, the recipient agrees to return it as soon as requested by IGC, without retaining any copies.',
  { x: 0.394, y: 10.012, w: 6.512, h: 0.664, fontSize: 6, align: 'justify', valign: 'top', lineSpacingMultiple: 1.1 });

p.writeFile({ fileName: 'Project_Green_Teaser.pptx' }).then(() =>
  console.log('WROTE Project_Green_Teaser.pptx')
);
