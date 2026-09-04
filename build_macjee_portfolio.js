// Mac Jee — CIM p.50, "A large portfolio of US$ 4.6 bn to drive business revenues".
// Reconstrução do slide na gramática do próprio deck.
//
// TUDO medido no PDF do CIM (caixa 960x540pt = 13,333x7,5", 1pt = 1/72"):
//
//   chrome, igual em toda página da seção Financials
//     nav          y=0,294  7pt Montserrat #BFBFBF, item ativo #00178D SemiBold
//                  x = 0,429 / 1,788 / 3,481 / 5,186; sublinhado ciano
//                  x=5,173 y=0,458 w=0,508 h=0,056 #27B0FF
//     título       x=0,429 y=0,801 24pt Montserrat Bold #00092B
//     subtítulo    x=0,375 y=1,252 12pt Montserrat #000312
//     tag WIP      x=11,008 y=0 w=1,0 h=1,0 #EE0000, texto 18pt branco
//     logo         x=12,439 y=0,376 w=0,527 h=0,527
//     nº de página x=0,391 y=7,092 8pt SemiBold branco
//     source       x=0,685 y=7,073 8pt Montserrat Light #A6A6A6
//     Confidential caixa x=11,955 y=7,075 w=1,020 h=0,215, filete #9DADFF
//
//   sistema de cor por unidade de negócio, lido das páginas 51-53:
//     pílula de sub-marca  Munitions #92D050 · Energetics #FFC000 · Missile #949494
//     título da página     Munitions #6FA82F · Energetics #C79000 · Missile #4A5261
//     A p.50 original usava #8DC63F / #F5C518 / #8B95A5 nos filetes e
//     #5FA32F / #B8800A / #4B5563 nos títulos — perto, mas fora do sistema.
//     Aqui as três colunas passam a usar exatamente as cores das páginas irmãs.
//
// O QUE MUDA DE ESTRUTURA, e por quê:
//
//   1. Os dois vazios. No original o conteúdo das três colunas terminava em
//      y=4,07 e a nota de rodapé só vinha em 5,40 — cerca de 12 pol² de branco
//      morto. E a banda navy (y=5,643 até o pé) tinha a metade esquerda inteira
//      vazia, porque o gráfico de região ocupava só x=6,62 em diante: outras
//      ~8 pol² mortas. A banda sobe para y=4,78 e o gráfico de região passa a
//      ocupar a largura toda, com legenda de seis itens numa linha. Nenhum dado
//      novo foi inventado para preencher: o que havia foi reproporcionado.
//
//   2. As barras de progresso enganavam. As três eram normalizadas pela maior
//      fatia — Missile, com 40%, aparecia com a barra 100% cheia (2,500 de
//      2,500 medidos no PDF), o que se lê como "completo". Agora a barra é
//      fração de 100% do grupo: 35% / 25% / 40% da largura da pista.
//
//   3. Pílula de sub-marca por coluna, o dispositivo das páginas 51-53. Dá peso
//      visual às colunas e é o que faz o slide parecer do deck.
//
//   4. As regiões somam 101% (48+33+10+6+3+1). As larguras das barras no PDF
//      original são 47,7 / 32,8 / 9,7 / 6,1 / 2,7 / 1,1 — ou seja, o desenho
//      está certo e o arredondamento dos rótulos é que estoura. Mantive os
//      números da companhia e a nota passa a dizer isso.

const pptxgen = require('pptxgenjs');

/* ===================== TOKENS ===================== */
const NAVY = '00092B';   // fundo escuro, títulos
const INK = '000312';    // subtítulo
const CYAN = '27B0FF';   // acento sobre escuro, sublinhado da nav
const BODY = '5B6577';   // descrições
const MUTED = '7B8494';  // rótulos miúdos
const TRACK = 'E8EAEE';  // pista de barra sobre branco
const ONDK = 'C7CDE0';   // rótulos sobre navy
const LEG = 'C6CBDA';    // legenda sobre navy
const SRC = 'A6A6A6';
const NAVMUT = 'BFBFBF';
const NAVACT = '00178D';
const FOOT = '8C93A8';
const WHITE = 'FFFFFF';
const RULE_DK = '3C4E86';  // filete sobre navy (dentro do card e sob o rótulo)
const RULE_LT = 'E5E7EB';  // filete divisor entre colunas
const LATTICE = '1C2441';  // grade vertical da banda

const M = 'Montserrat';
const ML = 'Montserrat Light';
const MM = 'Montserrat Medium';
const MS = 'Montserrat SemiBold';

// lineSpacing no pptxgenjs é em PONTOS, não em porcentagem: a entrelinha
// desejada em polegadas x 72 dá o valor direto.
const pitch = (inches) => inches * 72;

const BUS = [
  {
    name: 'Munitions', entity: 'Mac Jee Indústria de Defesa',
    tint: '92D050', title: '6FA82F',
    desc: ['Aerial bombs, artillery, rockets, fuzes and', 'launcher vehicles, already in serial production'],
    value: '1.6', share: 0.35, shareLabel: '35%',
  },
  {
    name: 'Energetics', entity: 'Mac Jee Tecnologia',
    tint: 'FFC000', title: 'C79000',
    desc: ['Turnkey TNT, RDX and HMX production lines', 'delivered to sovereign customers worldwide'],
    value: '1.1', share: 0.25, shareLabel: '25%',
  },
  {
    name: 'Missile', entity: 'TMC, The Missile Company',
    tint: '949494', title: '4A5261',
    desc: ['Cruise missiles, air defence and rocket', 'motors for European and Gulf primes'],
    value: '1.9', share: 0.40, shareLabel: '40%',
  },
];

// larguras reais das faixas no PDF original, em polegadas — a proporção
// desenhada pela companhia, preservada
const REGIONS = [
  { label: 'MENA', pct: '48%', w: 3.012, fill: '021B94', ink: WHITE },
  { label: 'Eastern Europe & Central Asia', pct: '33%', w: 2.071, fill: '2E4BC4', ink: WHITE },
  { label: 'Western Europe', pct: '10%', w: 0.614, fill: '6F86E8', ink: '0B1F6E' },
  { label: 'North America', pct: '6%', w: 0.386, fill: '95A8FE', ink: '0B1F6E' },
  { label: 'Asia', pct: '3%', w: 0.169, fill: 'C3CDFB', ink: '0B1F6E' },
  { label: 'LATAM', pct: '1%', w: 0.069, fill: 'E4E8FA', ink: '0B1F6E' },
];

const GROUP_ROWS = [
  ['Named programmes', '55'],
  ['Countries', '21'],
  ['Revenue, 2026–32 plan', 'US$ 4.1 bn'],
  ['Plan coverage', '1.1x'],
];

/* ===================== GRADE ===================== */
const COL = [3.778, 6.833, 9.889];   // origens das três colunas, do PDF
const CW = 2.850;   // medida única da coluna; deixa a calha livre para os
                    // filetes divisores medidos em x = 6,681 e 9,736
const CARD_X = 0.625, CARD_W = 2.847;
const TOP = 2.060;                   // topo do registro de conteúdo
const BOT = 4.720;                   // base — card e colunas terminam juntos
const BAND_Y = 4.880;                // banda navy sobe: era 5,643 com metade vazia

const p = new pptxgen();
p.defineLayout({ name: 'W169', width: 13.333, height: 7.5 });
p.layout = 'W169';
p.author = 'IGC Partners';
p.title = 'Mac Jee — identified commercial opportunity';

const s = p.addSlide();
s.background = { color: WHITE };

const txt = (t, o) => s.addText(t, Object.assign({ margin: 0, fontFace: M, color: INK }, o));
const rect = (x, y, w, h, c) =>
  s.addShape(p.ShapeType.rect, { x, y, w, h, fill: { color: c }, line: { type: 'none' } });

/* ===================== CHROME ===================== */
[['Mac Jee At a Glance', 0.429], ['Mac Jee Investment Thesis', 1.788],
 ['Business Units and Portfolio', 3.481]].forEach(([t, x]) =>
  txt(t, { x, y: 0.294, w: 2.0, h: 0.16, fontSize: 7, color: NAVMUT, valign: 'top' })
);
txt('Financials', { x: 5.186, y: 0.294, w: 1.2, h: 0.16, fontSize: 7, fontFace: MS, color: NAVACT, valign: 'top' });
rect(5.173, 0.458, 0.508, 0.056, CYAN);
[5.173, 5.625].forEach((x) => s.addShape(p.ShapeType.diamond, {
  x, y: 0.458, w: 0.056, h: 0.056, fill: { color: CYAN }, line: { type: 'none' },
}));

txt('A large portfolio of US$ 4.6 bn to drive business revenues',
  { x: 0.429, y: 0.801, w: 10.4, h: 0.40, fontSize: 24, bold: true, color: NAVY, valign: 'top' });
txt('55 named programmes across 21 countries: 1.1x the entire 2026–32 revenue plan, already identified commercially',
  { x: 0.375, y: 1.252, w: 11.5, h: 0.26, fontSize: 12, valign: 'top' });

rect(11.008, 0, 1.0, 1.0, 'EE0000');
txt('WIP', { x: 11.008, y: 0.355, w: 1.0, h: 0.30, fontSize: 18, color: WHITE, align: 'center', valign: 'middle' });
s.addImage({ path: 'assets/macjee/logo.png', x: 12.439, y: 0.376, w: 0.527, h: 0.527 });

/* ===================== RÓTULO DO REGISTRO ===================== */
txt('Identified commercial opportunity: total contract value, US$',
  { x: 0.630, y: 1.726, w: 6.0, h: 0.22, fontSize: 12, bold: true, valign: 'top' });

/* ===================== CARD DO GRUPO ===================== */
const CH = 0.209, CH_H = BOT - TOP;
s.addShape(p.ShapeType.custGeom, {
  x: CARD_X, y: TOP, w: CARD_W, h: CH_H,
  fill: { color: NAVY }, line: { type: 'none' },
  points: [
    { x: 0, y: 0 }, { x: CARD_W - CH, y: 0 }, { x: CARD_W, y: CH },
    { x: CARD_W, y: CH_H }, { x: CH, y: CH_H }, { x: 0, y: CH_H - CH },
    { close: true },
  ],
});
const CIN = CARD_X + 0.250;                       // recuo interno, do PDF
txt('G R O U P   T O T A L', { x: CIN, y: TOP + 0.135, w: 2.3, h: 0.18, fontSize: 8.5, color: CYAN, valign: 'top' });
s.addText(
  [{ text: 'US$ ', options: { fontSize: 12 } },
   { text: '4.6', options: { fontSize: 44, bold: true } },
   { text: ' bn', options: { fontSize: 18 } }],
  { x: CIN, y: TOP + 0.30, w: 2.4, h: 0.72, margin: 0, fontFace: M, color: WHITE, valign: 'bottom' }
);
txt('identified commercial opportunity',
  { x: CIN, y: TOP + 1.075, w: 2.3, h: 0.18, fontSize: 8.5, color: ONDK, valign: 'top' });
rect(CIN, TOP + 1.335, 2.347, 0.010, RULE_DK);
GROUP_ROWS.forEach(([k, v], i) => {
  const y = TOP + 1.455 + i * 0.278;
  txt(k, { x: CIN, y: y + 0.012, w: 1.75, h: 0.19, fontSize: 9, color: ONDK, valign: 'top' });
  txt(v, { x: CIN, y, w: CARD_W - 0.50, h: 0.20, fontSize: 10.6, bold: true, color: WHITE, align: 'right', valign: 'top' });
});

/* ===================== TRÊS COLUNAS ===================== */
BUS.forEach((b, i) => {
  const x = COL[i];

  // pílula de sub-marca — dispositivo das páginas 51-53
  s.addShape(p.ShapeType.roundRect, {
    x, y: TOP, w: 1.38, h: 0.660, rectRadius: 0.10,
    fill: { color: b.tint }, line: { type: 'none' },
  });
  s.addImage({ path: 'assets/macjee/mark.png', x: x + 0.135, y: TOP + 0.100, w: 0.400, h: 0.264 });
  txt(b.name.toUpperCase().split('').join(' '),
    { x: x + 0.070, y: TOP + 0.415, w: 1.24, h: 0.17, fontSize: 6.5, fontFace: MS, color: INK, align: 'center', valign: 'middle' });

  txt(b.name, { x, y: TOP + 0.855, w: CW, h: 0.28, fontSize: 16, bold: true, color: b.title, valign: 'top' });
  txt(b.entity, { x, y: TOP + 1.185, w: CW, h: 0.18, fontSize: 8.5, color: MUTED, valign: 'top' });
  txt(b.desc.join(' '),
    { x, y: TOP + 1.375, w: CW, h: 0.32, fontSize: 9, color: BODY,
      valign: 'top', lineSpacing: pitch(0.150) });

  s.addText(
    [{ text: 'US$ ', options: { fontSize: 11, color: BODY } },
     { text: b.value, options: { fontSize: 32, bold: true, color: NAVY } },
     { text: ' bn', options: { fontSize: 14, color: NAVY } }],
    { x, y: TOP + 1.800, w: CW, h: 0.52, margin: 0, fontFace: M, valign: 'bottom' }
  );
  txt(`identified  ·  ${b.shareLabel} of the group`,
    { x, y: TOP + 2.500, w: CW, h: 0.18, fontSize: 8.5, color: MUTED, valign: 'top' });

  // fração de 100% do grupo — antes era normalizada pela maior fatia,
  // e Missile aparecia com a barra cheia
  rect(x, TOP + 2.380, CW, 0.083, TRACK);
  rect(x, TOP + 2.380, CW * b.share, 0.083, b.tint);
});

[6.681, 9.736].forEach((x) => rect(x, TOP, 0.010, BOT - TOP, RULE_LT));

/* ===================== BANDA NAVY — regiões ===================== */
rect(0, BAND_Y, 13.333, 7.5 - BAND_Y, NAVY);
for (let i = 0; i < 9; i++) rect(0.077 + i * 1.586, BAND_Y, 0.030, 7.5 - BAND_Y, LATTICE);
txt('Where the opportunity sits: by end-user region',
  { x: 0.625, y: BAND_Y + 0.180, w: 6.0, h: 0.20, fontSize: 9.5, fontFace: MM, color: WHITE, valign: 'top' });

const RIGHT = COL[2] + CW;                    // 12,739
rect(0.625, BAND_Y + 0.435, RIGHT - 0.625, 0.010, RULE_DK);
const BAR_X = 0.625, BAR_W = RIGHT - 0.625, BAR_Y = BAND_Y + 0.600, BAR_H = 0.480;
const total = REGIONS.reduce((a, r) => a + r.w, 0);
let cx = BAR_X;
REGIONS.forEach((r) => {
  const w = (r.w / total) * BAR_W;
  rect(cx, BAR_Y, w, BAR_H, r.fill);
  if (w > 0.55) {
    txt(r.pct, { x: cx, y: BAR_Y, w, h: BAR_H, fontSize: 9, bold: true, color: r.ink, align: 'center', valign: 'middle' });
  }
  cx += w;
});

const LEG_Y = BAND_Y + 1.260, LEG_PITCH = BAR_W / 3;
REGIONS.forEach((r, i) => {
  const x = BAR_X + (i % 3) * LEG_PITCH;
  const y = LEG_Y + Math.floor(i / 3) * 0.290;
  rect(x, y + 0.034, 0.105, 0.105, r.fill);
  s.addText(
    [{ text: r.label + '  ', options: { color: LEG } },
     { text: r.pct, options: { fontFace: MS, color: WHITE } }],
    { x: x + 0.180, y, w: LEG_PITCH - 0.22, h: 0.175, margin: 0, fontFace: M, fontSize: 7.8, valign: 'middle' }
  );
});

txt('Identified opportunity: total contract value of every signed contract and open opportunity in the Company’s commercial review, at face value and unweighted. Coverage compares it with cumulative gross revenue in the 2026–32 plan. Bar widths follow the Company’s underlying mix; labelled shares are rounded and do not sum to 100%.',
  { x: BAR_X, y: BAND_Y + 1.775, w: BAR_W, h: 0.28, fontSize: 7, fontFace: ML, color: FOOT,
    valign: 'top', lineSpacing: pitch(0.130) });

/* ===================== PÉ ===================== */
txt('50', { x: 0.391, y: 7.092, w: 0.30, h: 0.17, fontSize: 8, fontFace: MS, color: WHITE, valign: 'top' });
txt('Source: Company, commercial review of backlog and pipeline, 5 Aug 2026 (rev. 2); Company financial model, Base case (FX R$ 5.17/US$).',
  { x: 0.685, y: 7.073, w: 9.5, h: 0.17, fontSize: 8, fontFace: ML, color: SRC, valign: 'top' });
s.addShape(p.ShapeType.roundRect, {
  x: 11.955, y: 7.075, w: 1.020, h: 0.215, rectRadius: 0.06,
  fill: { type: 'none' }, line: { color: '9DADFF', width: 0.5 },
});
txt('Confidential', { x: 11.955, y: 7.075, w: 1.020, h: 0.215, fontSize: 7, color: '9DADFF', align: 'center', valign: 'middle' });

p.writeFile({ fileName: 'MacJee_p50_Portfolio_v2.pptx' }).then(() =>
  console.log('WROTE MacJee_p50_Portfolio_v2.pptx')
);
