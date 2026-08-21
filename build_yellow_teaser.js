// Project Yellow — teaser one-page do grupo (todas as frentes), cego.
//
// Duas peles sobre o MESMO esqueleto:
//   node build_yellow_teaser.js igc        -> paleta da casa (navy / gold)
//   node build_yellow_teaser.js tracbel    -> paleta da empresa-alvo (amarelo / preto)
//   node build_yellow_teaser.js            -> gera as duas
//
// GEOMETRIA: medida no XML do teaser do Project Compass, não estimada de PDF.
// Retrato 7,5 x 10,8333"; grade de 3 colunas em x = 0,394 / 2,662 / 4,931
// (larg. 1,969) com divisores verticais em x = 2,493 e 4,712; numerais 01/02/03
// em y = 1,399 (28pt); banda de conclusão full-bleed em y = 3,3767 h = 0,7754;
// seção branca 4,19–6,23; banda de highlights y = 6,232 h = 1,666 com 6 stats em
// x = 0,449 / 2,754 / 5,06 e y = 6,489 / 7,191; contatos em y = 8,189; faixa de
// foto y = 8,7627 h = 0,827; source em y = 9,606; "Disclaimer:" 9,810 e o
// disclaimer 10,012 (ambos vêm do layout do arquivo de referência).
//
// A seção branca troca o par mapa-simples + cluster de logos do Compass pelo
// "Geographic Index" do IM — mapa com as quatro macro-regiões sombreadas,
// contorno nos estados de operação e um callout de setores por região.
//
// Conteúdo: IM (jul-2026) + apresentação institucional (2026) + DRE da equipe.
// Teaser CEGO: não nomeia a companhia nem nenhum OEM.

const pptxgen = require('pptxgenjs');

/* ===================== PALETAS =====================
 * igc     — amostrada de um render a 300 dpi do teaser do Compass.
 * tracbel — amostrada do próprio template do IM: FDBA12 é o amarelo dominante
 *           (388 usos nos slides), EC6606 o laranja de apoio (17), pretos
 *           080808/1B1B1B, cinzas B1B3B5/7F7F7F/A5A5A5, fundo claro F2F2F2.
 *           O amarelo da marca vive como PREENCHIMENTO, não como texto: em
 *           corpo pequeno sobre claro ele não tem contraste, então o acento
 *           miúdo usa o laranja.
 */
const THEMES = {
  igc: {
    file: 'Project_Yellow_Teaser.pptx',
    dark: '222F44',        // texto, banda de conclusão, contornos
    accentBig: 'D3A93D',   // numerais e segunda linha da banda
    accentSmall: 'D3A93D', // rótulos miúdos ("Key Highlights", "Disclaimer:")
    rule: '111721',        // régua sob o título
    ruleW: 0.75,
    bandBg: 'F8F8F8',      // banda de highlights
    map: 'assets/green/map_regions.png',
    hero: 'assets/green/hero_fleet.png',
    // por região: [preenchimento do chip, cor do texto do chip]
    chips: { ncw: ['DDE1E6', '222F44'], ne: ['BCC3CD', '222F44'],
             south: ['E3CE93', '222F44'], se: ['D3A93D', '222F44'] },
  },
  tracbel: {
    file: 'Project_Yellow_Teaser_Tracbel.pptx',
    dark: '1B1B1B',
    accentBig: 'FDBA12',
    accentSmall: 'EC6606',
    rule: 'FDBA12',
    ruleW: 1.25,
    bandBg: 'F2F2F2',
    map: 'assets/green/map_regions_tracbel.png',
    hero: 'assets/green/hero_fleet.png',
    // mesmas cores em que o mapa do IM já vem: cinza claro, cinza, laranja, amarelo
    chips: { ncw: ['A5A5A5', '1B1B1B'], ne: ['7F7F7F', 'FFFFFF'],
             south: ['EC6606', 'FFFFFF'], se: ['FDBA12', '1B1B1B'] },
  },
};

const WHITE = 'FFFFFF';
const SANS = 'Poppins';
const W = 7.5;
const COL = [0.394, 2.662, 4.931];
const CW = 1.969;

/* ===================== CONTEÚDO (comum às duas peles) ===================== */
const TITLE = 'Project Yellow';
const PILLARS = [
  ['Nationwide multi-brand distribution',
   '#2 heavy-equipment dealer in Brazil across all brands, serving eight sectors from mining to agriculture'],
  ['Aftermarket-led service platform',
   'Two thirds of the workforce in after-sales, an ~85% absorption rate and +100k SKUs in parts e-commerce'],
  ['Digital and connected operations',
   'Fleet telemetry and 24/7 autonomous stores converting an installed base of +8.6k units into recurring demand'],
];
const BAND = ['The Company is one of Brazil’s largest equipment distributors,',
              'combining nationwide reach with an aftermarket-led, digital operation'];
const OVERVIEW = 'Multi-brand distributor of construction, mining, forestry and agricultural equipment, operating across Brazil for 59 years on an aftermarket-led model built on parts e‑commerce, fleet telemetry and 24/7 autonomous stores';
const CALLOUTS = [
  { k: 'ncw', x: 2.58, y: 4.52, label: 'North and Middle West',
    items: ['Construction', 'Agriculture', 'Logistics', 'Infrastructure'] },
  { k: 'ne', x: 5.86, y: 4.52, label: 'Northeast',
    items: ['Forest', 'Agriculture', 'Construction'] },
  { k: 'south', x: 2.58, y: 5.34, label: 'South',
    items: ['Agriculture', 'Industry', 'Forest', 'Construction'] },
  { k: 'se', x: 5.86, y: 5.34, label: 'Southeast',
    items: ['Forest and mining', 'Agriculture', 'Industry', 'Construction'] },
];
const STATS = [
  ['BRL 2.6 Bn', 'Net revenues 2025⁽¹⁾'], ['BRL 123 Mn', 'EBITDA 2025⁽¹⁾'],
  ['#2', 'Dealer in heavy equipment'], ['36', 'Locations⁽²⁾'],
  ['+1,000', 'Employees⁽²⁾'], ['8', 'Sectors served'],
];
const CONTACTS = [
  ['Bruno Iervolino', 'Bruno.iervolino@igcp.com.br'],
  ['Gabriel Brito', 'Gabriel.brito@igcp.com.br'],
  ['Pedro Grando', 'Pedro.grando@igcp.com.br'],
];
const SOURCE = 'Information Memorandum (Jul-2026) and Company materials. (1) Sum of two separately reported perimeters: heavy equipment BRL 1,200 Mn / BRL 65 Mn and agriculture BRL 1,360 Mn / BRL 58 Mn (net revenues / EBITDA); not audited consolidated. (2) 23 + 13 locations; 470 + 600 employees; overlap to be confirmed.';
const DISCLAIMER = 'All information contained in this material has been prepared based on the documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or through independent researches. No liability is or shall be attributed to the members of IGC, including its partners, directors, employees, agents or advisers, in connection with the accuracy or completeness of the information contained herein or in connection with any other written or oral information made available to the recipient or its advisor. In particular, no representation or warranty is given as to the achievement or reasonableness of any future projections, management estimates, prospects or returns. This material belongs to IGC and shall not be copied, reproduced and/or distributed or disclosed to any third party without the prior consent of IGC. By receiving this material, the recipient agrees to return it as soon as requested by IGC, without retaining any copies.';

function build(T) {
  const p = new pptxgen();
  p.defineLayout({ name: 'ONEPAGER', width: 7.5, height: 10.8333 });
  p.layout = 'ONEPAGER';
  p.author = 'IGC Partners';
  p.title = TITLE + ' — Teaser';

  const s = p.addSlide();
  s.background = { color: WHITE };
  const txt = (t, o) => s.addText(t, Object.assign({ margin: 0, fontFace: SANS, color: T.dark }, o));
  const rect = (x, y, w, h, c) =>
    s.addShape(p.ShapeType.rect, { x, y, w, h, fill: { color: c }, line: { type: 'none' } });

  /* ----- cabeçalho: a marca igc é do documento, não da empresa-alvo ----- */
  s.addImage({ path: 'assets/igc_navy.png', x: 0.394, y: 0.394, w: 0.399, h: 0.345 });
  s.addShape(p.ShapeType.line, {
    x: 0.394, y: 0.809, w: 6.508, h: 0, line: { color: T.rule, width: T.ruleW },
  });
  txt(TITLE, { x: 0.394, y: 0.905, w: 6.512, h: 0.315, fontSize: 24, bold: true, valign: 'top', lineSpacingMultiple: 1.1 });

  /* ----- três pilares ----- */
  PILLARS.forEach((pl, i) => {
    txt('0' + (i + 1) + '.', {
      x: COL[i], y: 1.399, w: CW, h: 0.499,
      fontSize: 28, bold: true, color: T.accentBig, valign: 'bottom', align: 'left', lineSpacingMultiple: 1.1,
    });
    s.addText(
      [{ text: pl[0], options: { bold: true, breakLine: true, paraSpaceAfter: 8 } },
       { text: pl[1], options: {} }],
      { x: COL[i], y: 1.798, w: (i === 2 ? 2.10 : CW), h: 1.415,
        margin: 0, fontFace: SANS, color: T.dark, fontSize: 10,
        valign: 'top', align: 'left', lineSpacingMultiple: 1.1 }
    );
  });
  [2.493, 4.712].forEach((x) =>
    s.addShape(p.ShapeType.line, { x, y: 1.397, w: 0, h: 1.761, line: { color: T.dark, width: 0.75 } })
  );

  /* ----- banda de conclusão ----- */
  rect(0, 3.3767, W, 0.7754, T.dark);
  s.addText(
    [{ text: BAND[0], options: { color: WHITE, breakLine: true } },
     { text: BAND[1], options: { color: T.accentBig } }],
    { x: 0.20, y: 3.3767, w: W - 0.40, h: 0.7754,
      margin: 0, fontFace: SANS, fontSize: 12, align: 'center', valign: 'middle', lineSpacingMultiple: 1.1 }
  );

  /* ----- seção branca: overview | geographic index ----- */
  txt('Business Overview', { x: 0.394, y: 4.19, w: 2.15, h: 0.35, fontSize: 14, bold: true, valign: 'top' });
  txt(OVERVIEW, { x: 0.394, y: 4.50, w: 2.10, h: 1.62, fontSize: 10, valign: 'top', lineSpacingMultiple: 1.1 });
  txt('Geographic Index', { x: 2.58, y: 4.19, w: 2.30, h: 0.35, fontSize: 14, bold: true, valign: 'top' });

  // mapa das quatro macro-regiões, tirado do IM a 600 dpi. O contorno marca os
  // estados de operação; o Sul aparece sombreado como região mas SEM contorno,
  // porque não há operação lá — confere com a lista de unidades do IM.
  const MW = 1.64, MH = MW / 1.0008, MX = 4.02, MY = 4.44;
  s.addImage({ path: T.map, x: MX, y: MY, w: MW, h: MH });

  const CW_CO = 1.24;
  CALLOUTS.forEach((c) => {
    const [fill, ink] = T.chips[c.k];
    rect(c.x, c.y, CW_CO, 0.155, fill);
    txt(c.label, { x: c.x, y: c.y, w: CW_CO, h: 0.155, fontSize: 6, bold: true, color: ink, align: 'center', valign: 'middle' });
    c.items.forEach((it, j) =>
      txt(it, { x: c.x + 0.05, y: c.y + 0.195 + j * 0.105, w: CW_CO - 0.05, h: 0.105, fontSize: 6, valign: 'middle' })
    );
  });
  s.addShape(p.ShapeType.rect, {
    x: 3.90, y: 6.115, w: 0.075, h: 0.075, fill: { color: WHITE }, line: { color: T.dark, width: 1 },
  });
  txt('Shading by region · outline marks main operating states', {
    x: 4.02, y: 6.103, w: 2.10, h: 0.10, fontSize: 5, valign: 'middle',
  });

  /* ----- banda de highlights ----- */
  rect(0, 6.232, W, 1.666, T.bandBg);
  txt('Key Highlights', { x: 0.394, y: 6.279, w: 2.114, h: 0.217, fontSize: 12, bold: true, color: T.accentSmall, valign: 'top' });
  const SX = [0.449, 2.754, 5.06], SY = [6.489, 7.191];
  STATS.forEach((st, i) => {
    s.addText(
      [{ text: st[0], options: { fontSize: 20, bold: true, breakLine: true } },
       { text: st[1], options: { fontSize: 10, bold: true } }],
      { x: SX[i % 3], y: SY[Math.floor(i / 3)], w: 2.165, h: 0.505,
        margin: 0, fontFace: SANS, color: T.dark, align: 'left', valign: 'top', lineSpacingMultiple: 1.1 }
    );
  });

  /* ----- contatos ----- */
  txt('For any further questions please contact:', {
    x: 0.396, y: 7.953, w: 6.307, h: 0.178, fontSize: 10, underline: { style: 'sng' }, valign: 'top',
  });
  CONTACTS.forEach((c, i) => {
    s.addText(
      [{ text: c[0], options: { bold: true, breakLine: true } },
       { text: c[1], options: { breakLine: true } },
       { text: '+55 11 3815 3533', options: {} }],
      { x: 0.394 + i * 2.23, y: 8.189, w: 2.047, h: 0.673,
        margin: 0, fontFace: SANS, color: T.dark, fontSize: 10, valign: 'top', lineSpacingMultiple: 1.1 }
    );
  });

  /* ----- faixa de foto: nenhuma marca de OEM legível no quadro ----- */
  s.addImage({ path: T.hero, x: -0.0003, y: 8.7627, w: 7.5305, h: 0.827, sizing: { type: 'cover', w: 7.5305, h: 0.827 } });

  /* ----- source + disclaimer ----- */
  s.addText(
    [{ text: 'Source: ', options: { bold: true } }, { text: SOURCE, options: {} }],
    { x: 0.394, y: 9.606, w: 6.512, h: 0.20, margin: 0, fontFace: SANS, color: T.dark, fontSize: 5, valign: 'top', lineSpacingMultiple: 1.1 }
  );
  txt('Disclaimer:', { x: 0.396, y: 9.810, w: 6.307, h: 0.135, fontSize: 8, bold: true, color: T.accentSmall, charSpacing: 0.3, valign: 'top' });
  txt(DISCLAIMER, { x: 0.394, y: 10.012, w: 6.512, h: 0.664, fontSize: 6, align: 'justify', valign: 'top', lineSpacingMultiple: 1.1 });

  return p.writeFile({ fileName: T.file }).then(() => console.log('WROTE ' + T.file));
}

const which = process.argv[2];
const list = which ? [THEMES[which]] : Object.values(THEMES);
if (which && !THEMES[which]) {
  console.error('tema desconhecido: ' + which + ' (use igc ou tracbel)');
  process.exit(1);
}
list.reduce((chain, T) => chain.then(() => build(T)), Promise.resolve());
