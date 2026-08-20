// Project Green — teaser one-page (Tracbel Agro perimeter), blind.
//
// MESMA GEOMETRIA do teaser Project Compass, medida no XML do próprio arquivo
// (não estimada de PDF). Retrato 7,5 x 10,8333"; grade de 3 colunas em
// x = 0,394 / 2,662 / 4,931 (larg. 1,969) com divisores verticais em x = 2,493
// e 4,712; numerais 01/02/03 em y = 1,399 (28pt, gold); banda navy full-bleed em
// y = 3,3767 h = 0,7754; seção branca 4,19–6,23; banda cinza y = 6,232 h = 1,666
// com 6 stats em x = 0,449 / 2,754 / 5,06 e y = 6,489 / 7,191; contatos em
// y = 8,189; faixa de foto y = 8,7627 h = 0,827; source em y = 9,555.
// "Disclaimer:" e o disclaimer em si vêm do layout do arquivo de referência e
// são reproduzidos aqui em y = 9,810 / 10,012.
//
// Conteúdo: apresentação Tracbel Agro (2026) + DRE fornecido pela equipe.
// Teaser CEGO: não nomeia a companhia nem o OEM.

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
const HAIR = 'E4E7EC';
const WHITE = 'FFFFFF';
const SANS = 'Poppins';

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
  ['Leading agricultural dealership',
   'Authorised dealer for a global agricultural machinery OEM across ~35% of Brazil’s sugarcane area'],
  ['Aftermarket-led service platform',
   '70% of the workforce dedicated to after-sales and technology, with +88% immediate parts availability'],
  ['Technology-driven recurrence',
   '4.1k connected machines and 6.1 Mn hours of machine data feeding proactive service demand'],
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
    { text: 'The Company operates at the core of Brazil’s sugarcane belt,', options: { color: WHITE, breakLine: true } },
    { text: 'combining OEM-backed scale, 13 branches and aftermarket recurrence', options: { color: GOLD } },
  ],
  {
    x: 0.20, y: 3.3767, w: W - 0.40, h: 0.7754,
    margin: 0, fontFace: SANS, fontSize: 12, align: 'center', valign: 'middle',
    lineSpacingMultiple: 1.1,
  }
);

/* ===== SEÇÃO BRANCA — overview | mapa | plataformas ===== */
txt('Business Overview', { x: 0.399, y: 4.19, w: 2.191, h: 0.35, fontSize: 14, bold: true, valign: 'top' });
txt('Agricultural machinery dealership with 13 branches across Brazil’s Center-South, distributing and servicing equipment for sugarcane, grain, citrus and coffee producers across a 3.7 Mn hectare area, supported by +600 employees and a connected-support structure that keeps client fleets running',
  { x: 0.399, y: 4.50, w: 2.785, h: 1.76, fontSize: 10, valign: 'top', lineSpacingMultiple: 1.1 });

// mapa (aspecto próprio do asset: 1966 x 1845 -> 1,0656)
const MX = 3.02, MY = 4.28, MW = 1.80, MH = MW / 1.0656;
s.addImage({ path: 'assets/green/map_brazil_gray.png', x: MX, y: MY, w: MW, h: MH });
// círculo tracejado sobre o cinturão canavieiro (SP e entorno)
// centro calibrado contra o realce GO/DF/MG do asset original (ground truth):
// dfx/dlon = 0,0238 e dfy/dlat = 0,0256 -> fx 0,630 / fy 0,665 = Sao Paulo +
// Triangulo Mineiro, o cinturao canavieiro do Centro-Sul. Verificado em overlay.
const CD = 0.40;
const cx = MX + 0.630 * MW, cy = MY + 0.665 * MH;
s.addShape(p.ShapeType.ellipse, {
  x: cx - CD / 2, y: cy - CD / 2, w: CD, h: CD,
  fill: { type: 'none' },
  line: { color: GOLD, width: 1.5, dashType: 'dash' },
});
txt('Focus of operation', {
  x: cx - 0.50, y: cy + CD / 2 + 0.055, w: 1.0, h: 0.363,
  fontSize: 10, align: 'center', valign: 'top', lineSpacingMultiple: 1.1,
});

// plataformas de tecnologia — lista de 4, no lugar do cluster de logos do Compass
txt('Technology platforms', { x: 5.004, y: 4.20, w: 2.30, h: 0.35, fontSize: 13, bold: true, valign: 'top' });
const ROWS = [
  ['activity', 'Connected fleet support', '4.1k machines · 2 control centres'],
  ['target', 'Harvest monitoring', 'Full field monitoring of harvesters'],
  ['layers', 'Agronomic intelligence', 'Satellite, climate and soil data'],
  ['clock', 'Autonomous parts store', '24/7 self-service parts and tools'],
];
const RX = 5.004, RW = 2.102, RY = 4.60, RH = 0.395;
ROWS.forEach((r, i) => {
  const y = RY + i * RH;
  s.addImage({ path: `assets/icons/${r[0]}_navy.png`, x: RX, y: y + 0.10, w: 0.185, h: 0.185 });
  txt(r[1], { x: RX + 0.255, y: y + 0.025, w: RW - 0.255, h: 0.17, fontSize: 8, bold: true, valign: 'top', lineSpacingMultiple: 1.1 });
  txt(r[2], { x: RX + 0.255, y: y + 0.195, w: RW - 0.255, h: 0.16, fontSize: 7, valign: 'top', lineSpacingMultiple: 1.1 });
  if (i < ROWS.length - 1) rect(RX, y + RH - 0.012, RW, 0.006, HAIR);
});

/* ===== BANDA CINZA — key highlights ===== */
rect(0, 6.232, W, 1.666, GRAYBG);
txt('Key Highlights', { x: 0.394, y: 6.279, w: 2.114, h: 0.217, fontSize: 12, bold: true, color: GOLD, valign: 'top' });
const STATS = [
  ['BRL 1.4 Bn', 'Net revenues 2025⁽¹⁾'],
  ['BRL 58 Mn', 'EBITDA 2025⁽¹⁾'],
  ['1,513', 'Machines sold in 2025'],
  ['~35%', 'Of Brazil’s sugarcane area'],
  ['13', 'Branches'],
  ['+600', 'Employees'],
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
   Aerea de canavial: teaser cego -> nenhuma maquina no quadro, para nao
   revelar o OEM pela livery do equipamento. */
s.addImage({
  path: 'assets/green/hero_cane_aerial.png',
  x: -0.0003, y: 8.7627, w: 7.5305, h: 0.827,
  sizing: { type: 'cover', w: 7.5305, h: 0.827 },
});

/* ===== SOURCE + DISCLAIMER ===== */
s.addText(
  [
    { text: 'Source: ', options: { bold: true } },
    { text: 'Company management information; Company presentation (2026). (1) 2025 net revenues of BRL 1,360 Mn and EBITDA of BRL 58 Mn (4.2% margin); area of operation = 3.7 Mn ha of crop area, of which ~75% sugarcane — state coverage to be confirmed with management.', options: {} },
  ],
  { x: 0.394, y: 9.612, w: 6.512, h: 0.19, margin: 0, fontFace: SANS, color: NAVY, fontSize: 5, valign: 'top', lineSpacingMultiple: 1.1 }
);
txt('Disclaimer:', { x: 0.396, y: 9.810, w: 6.307, h: 0.135, fontSize: 8, bold: true, color: GOLD, charSpacing: 0.3, valign: 'top' });
txt('All information contained in this material has been prepared based on the documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or through independent researches. No liability is or shall be attributed to the members of IGC, including its partners, directors, employees, agents or advisers, in connection with the accuracy or completeness of the information contained herein or in connection with any other written or oral information made available to the recipient or its advisor. In particular, no representation or warranty is given as to the achievement or reasonableness of any future projections, management estimates, prospects or returns. This material belongs to IGC and shall not be copied, reproduced and/or distributed or disclosed to any third party without the prior consent of IGC. By receiving this material, the recipient agrees to return it as soon as requested by IGC, without retaining any copies.',
  { x: 0.394, y: 10.012, w: 6.512, h: 0.664, fontSize: 6, align: 'justify', valign: 'top', lineSpacingMultiple: 1.1 });

p.writeFile({ fileName: 'Project_Green_Teaser.pptx' }).then(() =>
  console.log('WROTE Project_Green_Teaser.pptx')
);
