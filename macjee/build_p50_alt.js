// Mac Jee — dois formatos alternativos para a p50.
//   Slide 1 — MOSAICO: o total é a figura inteira, dividida em três blocos proporcionais.
//   Slide 2 — OPORTUNIDADE x PLANO: duas colunas empilhadas provam a cobertura de 1,1x.
// Mesmos números do formato A (backlog.xlsx rev.2 + modelo v025).
const K = require('./mj_kit.js');
const { txt, rect, chamfer, darkField, chrome, footer } = K;

const p = K.init();
const INK = K.INK, GREY_T = '3C4657', GREY_L = '8C93A8', BLUE_L = '95A8FE';

const BUS = [
  { name: 'Munitions', legal: 'Mac Jee Indústria de Defesa', dark: '6FA82F', bar: '92D050', tint: 'F1F8E6',
    ident: 1605.3, plan: 1549.7, hero: '1.6', share: '35%', cov: '104%',
    desc: 'Aerial bombs, artillery, rockets and fuzes',
    f: [['30 programmes · 12 countries'], ['Largest: US$ 250 mm — 155 mm ERFBBB, Bulgaria'], ['Already in serial production']],
    next: 'Capacity is already built' },
  { name: 'Energetics', legal: 'Mac Jee Tecnologia', dark: 'C79000', bar: 'FFC000', tint: 'FFF7E3',
    ident: 1137.3, plan: 606.2, hero: '1.1', share: '25%', cov: '188%',
    desc: 'Turnkey TNT, RDX and HMX production lines',
    f: [['12 programmes · 11 countries'], ['Largest: US$ 200 mm — TNT line, Canada'], ['Plants licensed and operating']],
    next: 'Revenue is contracted, not forecast' },
  { name: 'Missile', legal: 'TMC — The Missile Company', dark: '4A5261', bar: '9AA3B2', tint: 'F0F2F5',
    ident: 1850.7, plan: 1930.0, hero: '1.9', share: '40%', cov: '96%',
    desc: 'Cruise missiles, air defence and rocket motors',
    f: [['7 programmes · 6 countries'], ['Largest: US$ 1,000 mm — confidential, Saudi Arabia'], ['European and Gulf primes engaged']],
    next: 'The unit becomes the group’s engine' },
];
const IDENT_T = 4593.3, PLAN_T = 4085.9;
const SRC = 'Source: Company — commercial review of backlog and pipeline, 5 Aug 2026 (rev. 2); Company financial model, Base case (FX R$ 5.17/US$).';
const NOTE = 'Identified opportunity is the total contract value of every signed contract and open commercial opportunity in the Company’s commercial review, at face value and unweighted; a further six identified programmes carry no value yet and are excluded.';

/* =====================================================================
   FORMATO B — MOSAICO PROPORCIONAL
   O total é a figura inteira; cada bloco tem a largura do seu tamanho.
   ===================================================================== */
{
  const s = p.addSlide(); s.background = { color: 'FFFFFF' };
  chrome(s, { tab: 3,
    title: 'US$ 4.6 bn of identified opportunity by business unit',
    subtitle: '49 valued programmes across 21 countries — every block below is sized by the value it carries' });

  const CX = 0.391, CY = 1.56, CW = 12.551, CH = 3.38;
  chamfer(s, CX, CY, CW, CH, 0.348, 'tr-bl', { fill: { color: 'FFFFFF' }, line: { type: 'none' },
    shadow: { type: 'outer', blur: 4, offset: 1.5, angle: 90, color: '000000', opacity: 0.16 } });

  // faixa de total, largura cheia
  const IX = 0.63, IW = 12.07;
  chamfer(s, IX, 1.80, IW, 0.52, 0.14, 'tr-bl', { fill: { color: K.NAVY }, line: { type: 'none' } });
  s.addText([{ text: 'GROUP TOTAL     ', options: { fontSize: 7.6, color: BLUE_L, charSpacing: 1.4 } },
             { text: 'US$ ', options: { fontSize: 11, color: 'C6CBDA' } },
             { text: '4.6', options: { fontSize: 22, bold: true, color: 'FFFFFF' } },
             { text: ' bn', options: { fontSize: 12, color: 'FFFFFF' } },
             { text: '     identified commercial opportunity', options: { fontSize: 9, color: 'C6CBDA' } }],
    { x: IX + 0.26, y: 1.80, w: 7.4, h: 0.52, valign: 'middle', margin: 0, fontFace: K.F });
  s.addText([{ text: 'US$ 4.1 bn', options: { bold: true, color: 'FFFFFF' } },
             { text: ' converted in the 2026–32 plan     ', options: { color: 'C6CBDA' } },
             { text: '1.1x', options: { bold: true, color: 'FFFFFF' } },
             { text: ' coverage', options: { color: 'C6CBDA' } }],
    { x: IX + 7.8, y: 1.80, w: IW - 8.06, h: 0.52, align: 'right', valign: 'middle', margin: 0,
      fontFace: K.F, fontSize: 9 });

  // mosaico: largura proporcional ao valor
  const MY = 2.50, MH = 2.20, GAPM = 0.16;
  const SLAB = IW - GAPM * 2;
  let mx = IX;
  BUS.forEach(b => {
    const w = SLAB * b.ident / IDENT_T;
    rect(s, mx, MY, w, MH, b.tint);
    rect(s, mx, MY, w, 1.16, b.dark);
    txt(s, b.name, { x: mx + 0.22, y: MY + 0.14, w: w - 0.44, h: 0.28, valign: 'middle',
      fontFace: K.F, bold: true, fontSize: 15, color: 'FFFFFF' });
    txt(s, b.desc, { x: mx + 0.22, y: MY + 0.40, w: w - 0.44, h: 0.18, valign: 'middle',
      fontFace: K.F, fontSize: 7.6, color: 'FFFFFF' });
    s.addText([{ text: 'US$ ', options: { fontSize: 12, color: 'FFFFFF' } },
               { text: b.hero, options: { fontSize: 32, bold: true, color: 'FFFFFF' } },
               { text: ' bn', options: { fontSize: 14, color: 'FFFFFF' } },
               { text: '     ' + b.share, options: { fontSize: 11, color: 'FFFFFF' } }],
      { x: mx + 0.22, y: MY + 0.62, w: w - 0.44, h: 0.46, valign: 'middle', margin: 0, fontFace: K.F });
    b.f.forEach(([t], j) => txt(s, t, { x: mx + 0.22, y: MY + 1.28 + j * 0.24, w: w - 0.44, h: 0.20,
      valign: 'middle', fontFace: K.F, fontSize: 7.8, color: GREY_T }));
    txt(s, `US$ ${(b.plan / 1000).toFixed(2)} bn in the plan  ·  ${b.cov} covered`,
      { x: mx + 0.22, y: MY + 1.94, w: w - 0.44, h: 0.20, valign: 'middle',
        fontFace: K.F, bold: true, fontSize: 8, color: b.dark });
    mx += w + GAPM;
  });

  txt(s, NOTE + ' Coverage compares it with cumulative gross revenue in the 2026–32 plan.',
    { x: 0.63, y: 5.10, w: 12.0, h: 0.22, valign: 'middle', fontFace: 'Montserrat Light', fontSize: 6.6, color: GREY_L });

  darkField(s, 0, 5.643, 13.333, 1.857);
  txt(s, 'The three pages that follow take each unit in turn', { x: 0.60, y: 5.90, w: 12.3, h: 0.24,
    valign: 'middle', fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
  rect(s, 0.60, 6.16, 12.34, 0.010, '3C4E86');
  BUS.forEach((b, i) => {
    const x = 0.60 + i * 4.12;
    rect(s, x, 6.34, 0.06, 0.52, b.bar);
    txt(s, b.name, { x: x + 0.20, y: 6.32, w: 3.6, h: 0.24, valign: 'middle',
      fontFace: K.F, bold: true, fontSize: 10, color: 'FFFFFF' });
    txt(s, b.next, { x: x + 0.20, y: 6.58, w: 3.6, h: 0.24, valign: 'middle',
      fontFace: K.F, fontSize: 8.6, color: 'C6CBDA' });
  });
  footer(s, 50, { source: SRC });
}

/* =====================================================================
   FORMATO C — OPORTUNIDADE x PLANO
   Duas colunas empilhadas provam visualmente a cobertura de 1,1x.
   ===================================================================== */
{
  const s = p.addSlide(); s.background = { color: 'FFFFFF' };
  chrome(s, { tab: 3,
    title: 'The plan is smaller than what is already on the table',
    subtitle: 'US$ 4.6 bn of identified opportunity against US$ 4.1 bn of revenue in the 2026–32 plan — 1.1x coverage, unit by unit' });

  const CX = 0.391, CY = 1.56, CW = 12.551, CH = 3.38;
  chamfer(s, CX, CY, CW, CH, 0.348, 'tr-bl', { fill: { color: 'FFFFFF' }, line: { type: 'none' },
    shadow: { type: 'outer', blur: 4, offset: 1.5, angle: 90, color: '000000', opacity: 0.16 } });

  txt(s, 'Identified opportunity vs. the 2026–32 plan — US$ bn', { x: 0.63, y: 1.70, w: 6.0, h: 0.24,
    valign: 'middle', fontFace: K.F, bold: true, fontSize: 12, color: INK });

  // duas colunas empilhadas
  const BASE = 4.62, SC = 2.34 / IDENT_T, BW = 1.34;
  const COLS = [{ x: 1.42, k: 'ident', lab: 'Identified\nopportunity', tot: IDENT_T, strong: true },
                { x: 3.62, k: 'plan',  lab: 'In the\n2026–32 plan', tot: PLAN_T, strong: false }];
  COLS.forEach(c => {
    let y = BASE;
    [...BUS].reverse().forEach(b => {
      const h = b[c.k] * SC; y -= h;
      rect(s, c.x, y, BW, h, c.strong ? b.bar : b.tint);
      if (h > 0.26) txt(s, (b[c.k] / 1000).toFixed(2), { x: c.x, y, w: BW, h, align: 'center',
        valign: 'middle', fontFace: K.F, bold: true, fontSize: 9, color: c.strong ? '0B1F6E' : GREY_T });
    });
    txt(s, (c.tot / 1000).toFixed(1), { x: c.x, y: y - 0.30, w: BW, h: 0.26, align: 'center',
      valign: 'middle', fontFace: K.F, bold: true, fontSize: 14, color: INK });
    txt(s, c.lab, { x: c.x - 0.20, y: BASE + 0.08, w: BW + 0.40, h: 0.40, align: 'center', valign: 'top',
      fontFace: K.F, fontSize: 8, color: GREY_T, lineSpacingMultiple: 1.12 });
  });
  rect(s, 1.42, BASE, 3.54, 0.012, 'D6DAE4');

  // seta de cobertura entre as colunas
  txt(s, '1.1x', { x: 2.76, y: 1.98, w: 1.0, h: 0.28, align: 'center', valign: 'middle',
    fontFace: K.F, bold: true, fontSize: 15, color: '021B94' });
  txt(s, 'coverage', { x: 2.76, y: 2.24, w: 1.0, h: 0.18, align: 'center', valign: 'middle',
    fontFace: K.F, fontSize: 7.6, color: GREY_L });

  // divisor
  rect(s, 5.55, 1.98, 0.008, 2.76, 'E6E8EE');

  // faixas por BU à direita
  const RX = 5.92, RW = 6.78;
  BUS.forEach((b, i) => {
    const y = 2.02 + i * 0.92;
    rect(s, RX, y, 0.06, 0.74, b.dark);
    txt(s, b.name, { x: RX + 0.20, y, w: 2.2, h: 0.24, valign: 'middle',
      fontFace: K.F, bold: true, fontSize: 12.5, color: b.dark });
    txt(s, b.legal, { x: RX + 0.20, y: y + 0.24, w: 2.2, h: 0.17, valign: 'middle',
      fontFace: K.F, fontSize: 7, color: GREY_L });
    txt(s, b.f[1][0].replace('Largest: ', ''), { x: RX + 0.20, y: y + 0.44, w: 2.5, h: 0.28,
      valign: 'top', fontFace: K.F, fontSize: 7.4, color: GREY_T, lineSpacingMultiple: 1.12 });
    const M = [['Identified', `US$ ${b.hero} bn`], ['In the plan', `US$ ${(b.plan / 1000).toFixed(2)} bn`],
               ['Coverage', b.cov]];
    M.forEach(([l, v], j) => {
      const mx = RX + 2.92 + j * 1.30;
      txt(s, l, { x: mx, y: y + 0.06, w: 1.24, h: 0.16, valign: 'middle',
        fontFace: 'Montserrat Light', fontSize: 6.4, color: GREY_L, charSpacing: 0.6 });
      txt(s, v, { x: mx, y: y + 0.24, w: 1.24, h: 0.26, valign: 'middle',
        fontFace: K.F, bold: true, fontSize: 12, color: j === 2 ? b.dark : INK });
    });
    if (i < 2) rect(s, RX, y + 0.84, RW, 0.008, 'EDEFF4');
  });

  txt(s, NOTE + ' Plan figures are cumulative gross revenue 2026–32 in the Base case.',
    { x: 0.63, y: 5.10, w: 12.0, h: 0.22, valign: 'middle', fontFace: 'Montserrat Light', fontSize: 6.6, color: GREY_L });

  darkField(s, 0, 5.643, 13.333, 1.857);
  const SC2 = [['4.6', 'bn', 'Identified opportunity'], ['4.1', 'bn', 'Revenue in the plan'],
               ['49', '', 'Valued programmes'], ['21', '', 'Countries']];
  SC2.forEach(([v, u, l], i) => {
    const x = 0.60 + i * 1.78, y = 5.88, w = 1.62, h = 1.00;
    chamfer(s, x, y, w, h, 0.16, 'tr-bl', { fill: { color: K.STATFL }, line: { color: BLUE_L, width: 1.5 } });
    s.addText([{ text: u ? 'USD ' : '', options: { fontSize: 9 } },
               { text: v, options: { fontSize: 20, bold: true } },
               { text: u ? ' ' + u : '', options: { fontSize: 11.5 } }],
      { x, y: y + 0.16, w, h: 0.40, align: 'center', valign: 'middle', color: 'FFFFFF', margin: 0, fontFace: K.F });
    txt(s, l, { x: x + 0.05, y: y + 0.58, w: w - 0.10, h: 0.30, align: 'center', valign: 'top',
      fontFace: K.F, fontSize: 7.2, color: 'FFFFFF', lineSpacingMultiple: 1.1 });
  });
  const BX = 7.90;
  txt(s, 'The three pages that follow take each unit in turn', { x: BX, y: 5.88, w: 5.0, h: 0.24,
    valign: 'middle', fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
  rect(s, BX, 6.14, 5.04, 0.010, '3C4E86');
  BUS.forEach((b, i) => {
    const y = 6.26 + i * 0.26;
    rect(s, BX, y + 0.055, 0.10, 0.10, b.bar);
    s.addText([{ text: b.name, options: { bold: true, color: 'FFFFFF' } },
               { text: '   ' + b.next, options: { color: 'C6CBDA' } }],
      { x: BX + 0.20, y, w: 4.84, h: 0.22, valign: 'middle', margin: 0, fontFace: K.F, fontSize: 8.4 });
  });
  footer(s, 50, { source: SRC });
}

p.writeFile({ fileName: 'MacJee_p50_alternativas.pptx' }).then(() => console.log('WROTE MacJee_p50_alternativas.pptx'));
