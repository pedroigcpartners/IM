// Mac Jee — 3 slides complementares ao CIM: o potencial de cada BU do modelo financeiro v025.
//
// Arco das três páginas:
//   Munitions  — a base instalada, que escala com o menor capex do grupo
//   Energetics — a curva cai porque o modelo só conta contrato identificado, não porque a planta para
//   Missile    — para onde vai 78% do capex de crescimento, e o que ele compra
//
// Design: clone medido do template "Business Unit | … at a Glance" do CIM (ver DESIGN_TOKENS.md).
// Todos os números vêm de modelo.xlsx (v025, caso Base) — não do CIM, que está defasado.
const K = require('./mj_kit.js');
const { txt, rect, chamfer, chamferMaskTR, darkField, chrome, footer, statCard, chip } = K;

const p = K.init();

// ---- geometria comum, herdada do CIM ----
const CARD = { x: 0.449, y: 1.772, w: 3.534, h: 5.127, cut: 0.589 };
const BAND_Y = 4.938, BAND_H = 2.562;
const IMG = { x: 0.469, y: 1.792, w: 3.494, h: 2.58 };
const COL2 = 4.35, COL2W = 4.62;          // gráfico
const COL3 = 9.25, COL3W = 3.72;          // mecanismo
const TOPY = 1.70, TOPH = 2.92;           // topo e altura do bloco analítico

/** Painel "o que move a curva": título de seção + N blocos numerados de altura variável. */
function mechanism(s, x, y, w, head, items, accent) {
  txt(s, head, { x, y, w, h: 0.28, valign: 'middle',
    fontFace: K.FM, fontSize: 13, color: K.INK });
  rect(s, x, y + 0.30, w, 0.014, accent);
  let cy = y + 0.42;
  items.forEach((it, i) => {
    txt(s, String(i + 1), { x, y: cy + 0.01, w: 0.22, h: 0.20, valign: 'top',
      fontFace: K.F, bold: true, fontSize: 10, color: accent });
    txt(s, it[0], { x: x + 0.26, y: cy, w: w - 0.26, h: 0.34, valign: 'top',
      fontFace: K.F, bold: true, fontSize: 9.5, color: K.INK, lineSpacingMultiple: 1.10 });
    txt(s, it[1], { x: x + 0.26, y: cy + (it[3] || 0.235), w: w - 0.26, h: 0.66, valign: 'top',
      fontFace: K.F, fontSize: 8.5, color: '3C4657', lineSpacingMultiple: 1.18 });
    cy += it[2];
  });
}

/** Gráfico de barras empilhadas no padrão do CIM, com folga no topo para os totais. */
function stackChart(s, x, y, w, h, series, colors, title, maxVal) {
  txt(s, title, { x, y, w, h: 0.28, valign: 'middle',
    fontFace: K.FM, fontSize: 13, color: K.INK });
  s.addChart('bar', series, {
    x, y: y + 0.32, w, h: h - 0.32,
    barDir: 'col', barGrouping: 'stacked', barGapWidthPct: 46,
    chartColors: colors,
    showLegend: true, legendPos: 'b', legendFontSize: 7.2, legendFontFace: K.F, legendColor: '3C4657',
    showValue: false,
    catAxisLabelFontSize: 8, catAxisLabelFontFace: K.F, catAxisLabelColor: '3C4657',
    catAxisLineShow: true, catAxisLineColor: 'D6DAE4',
    valAxisHidden: true, valAxisMaxVal: maxVal, valAxisMinVal: 0,
    valGridLine: { style: 'none' },
    showTitle: false, plotArea: { fill: { color: 'FFFFFF' } },
  });
}

/** Rótulos de total, alinhados às colunas do gráfico. */
function totals(s, x, y, w, vals) {
  const n = vals.length, cw = w / n;
  vals.forEach((v, i) =>
    txt(s, String(v), { x: x + i * cw, y, w: cw, h: 0.20, align: 'center', valign: 'middle',
      fontFace: K.F, bold: true, fontSize: 8.6, color: K.NAVY }));
}

/** Card alto da esquerda: foto no topo (com o chanfro preservado) + tese sobre o navy. */
function argumentCard(s, tint, image, thesis, thesisSize) {
  chamfer(s, CARD.x, CARD.y, CARD.w, CARD.h, CARD.cut, 'tr-bl',
    { fill: { color: K.INK }, line: { color: tint, width: 2.25 } });
  s.addImage({ path: image, x: IMG.x, y: IMG.y, w: IMG.w, h: IMG.h,
    sizing: { type: 'cover', w: IMG.w, h: IMG.h } });
  chamferMaskTR(s, CARD.x, CARD.y, CARD.w, CARD.cut, 'FFFFFF');
  // redesenha só o contorno, para a borda ficar por cima da foto
  chamfer(s, CARD.x, CARD.y, CARD.w, CARD.h, CARD.cut, 'tr-bl',
    { fill: { type: 'none' }, line: { color: tint, width: 2.25 } });
  txt(s, 'THE ARGUMENT', { x: CARD.x, y: 4.60, w: CARD.w, h: 0.24, align: 'center',
    valign: 'middle', fontFace: K.F, bold: true, fontSize: 12, color: 'FFFFFF' });
  txt(s, thesis, { x: CARD.x + 0.26, y: 4.93, w: CARD.w - 0.52, h: 1.90, align: 'center',
    valign: 'top', fontFace: K.FM, fontSize: thesisSize || 8.6, color: 'FFFFFF',
    lineSpacingMultiple: 1.26 });
}

const Y = ['2026', '2027', '2028', '2029E', '2030E', '2031E', '2032E'];
const SRC = 'Source: Mac Jee financial model v025, Base case (FX R$ 5.1733/US$). Gross revenue.';

function source(s, t) {
  txt(s, t || SRC, { x: 4.35, y: 7.06, w: 8.6, h: 0.18, valign: 'middle',
    fontFace: K.F, fontSize: 6.5, color: '6E7796' });
}

/* ==================================================================
   A — MUNITIONS
   ================================================================== */
{
  const s = p.addSlide(); s.background = { color: 'FFFFFF' };
  const A = K.BU.munitions;
  chrome(s, { bu: 'munitions', tab: 2,
    title: 'Potential | Mac Jee Munitions',
    titleColor: '6FA82F',
    subtitle: 'The installed base scales first — US$ 18 mm to US$ 361 mm on the lightest growth capex of the three units' });
  darkField(s, -0.025, BAND_Y, 13.359, BAND_H);

  argumentCard(s, A.tint, 'assets/hero_munitions.jpg',
    'Munitions is the only unit already producing at scale. The model takes it to US$ 361 mm on US$ 33 mm of growth capex — 12% of the group total — because the lines already exist. The question is not whether it can produce, but whether the 155 mm order book converts at 50k rounds a year.', 8.8);

  stackChart(s, COL2, TOPY, COL2W, TOPH,
    [{ name: '155 mm artillery shell', labels: Y, values: [0, 72.0, 129.5, 175.5, 200.0, 205.0, 210.0] },
     { name: 'Rest of portfolio',      labels: Y, values: [18.3, 38.1, 53.5, 65.9, 93.4, 137.8, 150.7] }],
    [A.strong, '2B3A66'], 'Gross revenue by driver — US$ mm', 430);
  totals(s, COL2 + 0.26, TOPY + 0.40, COL2W - 0.36, [18, 110, 183, 241, 293, 343, 361]);

  mechanism(s, COL3, TOPY, COL3W, 'What moves the curve', [
    ['155 mm ER FB BB artillery shell',
     'From nothing to 50k rounds a year at US$ 3.6–4.2k — 65% of 2027 revenue. Even at 50k the line runs at 42% of the 120k/year capacity the CIM already declares.', 0.98],
    ['Armadillo MRLS',
     '5 units in 2028 to 35 in 2031 at US$ 1.7–2.1 mm each. Adds US$ 72 mm by 2032 — 20% of the unit — from a standing start.', 0.92],
    ['Smart-weapons tail',
     'Dagger, 70 mm rocket and fuzes reach US$ 24 mm by 2032. Small in revenue, but they defend the margin as the shell dilutes it.', 0.86],
  ], '6FA82F');

  chip(s, COL2, 5.32, { value: '42%', label: '155 mm capacity used, 2032', circle: A.tint, icon: '▲', iconColor: K.INK, w: 1.75 });
  chip(s, COL2, 6.06, { value: '41% → 35%', label: 'Gross margin to 2032', circle: A.tint, icon: '◆', iconColor: K.INK, w: 1.75 });
  chip(s, COL2 + 2.55, 5.32, { value: '12%', label: 'of group growth capex', circle: A.tint, icon: '$', iconColor: K.INK, w: 1.50 });
  chip(s, COL2 + 2.55, 6.06, { value: '16.6x', label: 'Gross profit vs BU capex', circle: A.tint, icon: '■', iconColor: K.INK, w: 1.50 });

  statCard(s, 9.090, 5.365, 1.811, 1.263, { pre: 'USD', value: '110', unit: 'mm', label: 'Revenue in 2027E', tint: A.tint });
  statCard(s, 11.050, 5.365, 1.916, 1.263, { pre: 'USD', value: '33', unit: 'mm', label: '2027 growth capex', tint: A.tint });
  source(s); footer(s, 'A');
}

/* ==================================================================
   B — ENERGETICS
   ================================================================== */
{
  const s = p.addSlide(); s.background = { color: 'FFFFFF' };
  const A = K.BU.energetics;
  chrome(s, { bu: 'energetics', tab: 2,
    title: 'Potential | Mac Jee Energetics',
    titleColor: 'C79000',
    subtitle: 'The curve falls after 2029 because the model counts only contracts already identified — not because the plants stop' });
  darkField(s, -0.025, BAND_Y, 13.359, BAND_H);

  argumentCard(s, A.tint, 'assets/hero_energetic.jpg',
    'Energetics converts contracts, it does not sell a catalogue — and the model reflects exactly that. Revenue peaks at US$ 150 mm in 2029 and falls to US$ 45 mm because five named country contracts run off and the Base case replaces them with US$ 25 mm. The plants do not run off. That gap is the whole upside, and it is not in the numbers.', 8.4);

  stackChart(s, COL2, TOPY, COL2W, TOPH,
    [{ name: 'Azerbaijan', labels: Y, values: [24.5, 24.5, 0, 0, 0, 0, 0] },
     { name: 'UAE',        labels: Y, values: [0, 40.0, 60.0, 50.0, 41.7, 0, 0] },
     { name: 'ICOR',       labels: Y, values: [0, 30.0, 25.0, 20.0, 0, 0, 0] },
     { name: 'Malaysia',   labels: Y, values: [0, 10.9, 24.4, 24.4, 0, 0, 0] },
     { name: 'Canada',     labels: Y, values: [0, 10.0, 15.0, 50.0, 50.0, 10.0, 0] },
     { name: 'HMX',        labels: Y, values: [0, 0, 3.5, 6.0, 11.3, 19.4, 20.1] },
     { name: 'New contracts', labels: Y, values: [0, 0, 0, 0, 0, 10.5, 25.0] }],
    ['2B3A66', '3E5490', '54699F', '6E82B4', '8B9CC6', A.strong, 'D9D9D9'],
    'Gross revenue by contract — US$ mm', 178);
  totals(s, COL2 + 0.26, TOPY + 0.40, COL2W - 0.36, [25, 115, 128, 150, 103, 40, 45]);

  mechanism(s, COL3, TOPY, COL3W, 'Why the curve falls', [
    ['Five country contracts, finite by construction',
     'Azerbaijan ends 2027, Malaysia 2028, ICOR 2029, UAE 2030, Canada 2031 — 91% of 2027 revenue, and zero by 2032.', 0.92],
    ['Only two lines survive the horizon',
     'HMX reaches US$ 15 mm in 2032. “New contracts” — the replacement line — is set at US$ 10.5 mm and US$ 25 mm. That is the entire renewal assumption.', 0.96],
    ['The CIM’s own pipeline is not in the model',
     'Page 41 of the CIM shows a US$ 900 mm 2027 pipeline for Energetics. The model books US$ 35 mm of new contracts across 2031–32. That gap is the upside.', 0.90],
  ], 'C79000');

  chip(s, COL2, 5.32, { value: '91%', label: '2027 from 5 contracts', circle: A.tint, icon: '▲', iconColor: K.INK, w: 1.75 });
  chip(s, COL2, 6.06, { value: '43%', label: 'Gross margin, flat', circle: A.tint, icon: '◆', iconColor: K.INK, w: 1.75 });
  chip(s, COL2 + 2.55, 5.32, { value: 'US$ 25 mm', label: 'Lowest growth capex', circle: A.tint, icon: '$', iconColor: K.INK, w: 1.50 });
  chip(s, COL2 + 2.55, 6.06, { value: 'US$ 35 mm', label: 'new contracts booked', circle: A.tint, icon: '■', iconColor: K.INK, w: 1.50 });

  statCard(s, 9.090, 5.365, 1.811, 1.263, { pre: 'USD', value: '115', unit: 'mm', label: 'Revenue in 2027E', tint: A.tint });
  statCard(s, 11.050, 5.365, 1.916, 1.263, { pre: 'USD', value: '150', unit: 'mm', label: 'Peak year, 2029E', tint: A.tint });
  source(s, SRC + ' “New contracts” is the model’s own replacement line, not an IGC estimate.');
  footer(s, 'B');
}

/* ==================================================================
   C — MISSILE
   ================================================================== */
{
  const s = p.addSlide(); s.background = { color: 'FFFFFF' };
  const A = K.BU.missile;
  chrome(s, { bu: 'missile', tab: 2,
    title: 'Potential | Mac Jee Missile',
    titleColor: '4A5261',
    subtitle: 'From zero to the group’s largest unit — and the destination of 78% of the growth capex' });
  darkField(s, -0.025, BAND_Y, 13.359, BAND_H);

  argumentCard(s, A.tint, 'assets/hero_missile.jpg',
    'Missile carries the equity story: nothing in 2026, US$ 711 mm and 64% of group revenue by 2032, at the only expanding gross margin in the group. It is also where the money goes — US$ 210 mm of growth capex in 2027 alone, spent before the first GGM units ship at scale. The unit is the thesis and the risk in the same line.', 8.6);

  stackChart(s, COL2, TOPY, COL2W, TOPH,
    [{ name: 'GGM Cruise 300', labels: Y, values: [0, 28.5, 71.8, 107.5, 184.0, 294.0, 382.5] },
     { name: 'MAR-1',          labels: Y, values: [0, 0, 0, 29.0, 45.6, 64.0, 167.5] },
     { name: 'Propellant plants', labels: Y, values: [0, 0, 15.0, 30.0, 50.0, 55.0, 60.0] },
     { name: '3rd-party motors',  labels: Y, values: [0, 0, 10.0, 12.5, 25.0, 37.5, 45.0] },
     { name: 'SRAAM + SAM',    labels: Y, values: [0, 0, 0, 3.5, 11.9, 29.8, 55.5] },
     { name: 'MICLA',          labels: Y, values: [0, 5.0, 10.0, 30.0, 35.0, 35.0, 0] }],
    ['1E48E0', '2B3A66', '54699F', '8B9CC6', 'B9C2D6', 'DCE0E8'],
    'Gross revenue by programme — US$ mm', 840);
  totals(s, COL2 + 0.26, TOPY + 0.40, COL2W - 0.36, [0, 34, 107, 213, 351, 515, 711]);

  mechanism(s, COL3, TOPY, COL3W, 'Where the value sits', [
    ['GGM Cruise Missile 300 is the unit',
     '15 units in 2027 to 150 in 2032, at US$ 1.9 mm rising to US$ 2.55 mm each. Alone it is 54% of the unit in 2032 and 34% of the group.', 0.92],
    ['US$ 210 mm of capex, all in 2027',
     '78% of the group’s US$ 268 mm total, committed in one year. Gross profit repays it 4.6x by 2032 — against 16.6x for Munitions on a fraction of the cheque.', 0.94],
    ['The only expanding margin in the group',
     '49% in 2028 to 52% in 2032, while Munitions dilutes from 41% to 35%. Mix, not price.', 0.90],
  ], '1E48E0');

  chip(s, COL2, 5.32, { value: '78%', label: 'of group growth capex', circle: A.tint, icon: '$', iconColor: K.INK, w: 1.75 });
  chip(s, COL2, 6.06, { value: '64%', label: 'of group revenue 2032E', circle: A.tint, icon: '▲', iconColor: K.INK, w: 1.75 });
  chip(s, COL2 + 2.55, 5.32, { value: '50% → 52%', label: 'Margin, expanding', circle: A.tint, icon: '◆', iconColor: K.INK, w: 1.50 });
  chip(s, COL2 + 2.55, 6.06, { value: '8 programmes', label: 'from zero in 2026', circle: A.tint, icon: '■', iconColor: K.INK, w: 1.50 });

  statCard(s, 9.090, 5.365, 1.811, 1.263, { pre: 'USD', value: '34', unit: 'mm', label: 'Revenue in 2027E', tint: A.tint });
  statCard(s, 11.050, 5.365, 1.916, 1.263, { pre: 'USD', value: '210', unit: 'mm', label: '2027 growth capex', tint: A.tint });
  source(s); footer(s, 'C');
}

p.writeFile({ fileName: 'MacJee_BU_Potential.pptx' })
 .then(() => console.log('WROTE MacJee_BU_Potential.pptx'));
