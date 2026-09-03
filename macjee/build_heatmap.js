// Mac Jee — duas páginas de heatmap de estágio de desenvolvimento, produto a produto.
//
// Regra de classificação (impressa no rodapé de cada página). O estágio é o mais alto
// que o produto satisfaz, e cada um é ancorado numa evidência PUBLICADA pela Companhia:
//   5 In production  — entregue, em serviço, comprovado em combate ou sob contrato assinado
//   4 Qualified      — "100% Completion" publicado
//   3 Capacity rated — capacidade de produção anual publicada
//   2 In build       — "Completion" publicado abaixo de 100%, ou planta em construção
//   1 In development — especificado no documento, sem capacidade nem completion
//
// Toda evidência vem do CIM v9 (páginas de portfólio, chips do rodapé escuro) ou da
// revisão comercial da Companhia (contratos assinados). Nada é inferido sem marcação.
const K = require('./mj_kit.js');
const { txt, rect, chamfer, darkField, chrome, footer } = K;

const p = K.init();
const INK = K.INK, GREY_T = '3C4657', GREY_L = '8C93A8', BLUE_L = '95A8FE';

// rampa do heatmap: quanto mais escuro, mais maduro
const RAMP = ['DDE3F5', 'B9C4EC', '8B9CDD', '4E66C4', '021B94'];
const EMPTY = 'F0F2F7';
const STAGES = ['In development', 'In build', 'Capacity rated', 'Qualified', 'In production'];

const PAGES = [
  { page: 51,
    title: 'Development stage by product — Weapon Systems and Munitions',
    sub: 'Seven of eleven products are qualified or already in production, on lines that are built and rated',
    groups: [
      { name: 'Weapon Systems', accent: '5A6BB8', tint: 'B8C4FD', rows: [
        ['Armadillo', 'MRLS anti-drone launcher vehicle', 4, '100% completion  ·  +100 units/year rated'],
        ['70 mm rocket', 'Air-to-ground and ground-to-ground', 4, '100% completion  ·  20k+ units/year rated'],
        ['Anshar', 'Ground-to-ground kamikaze drone', 4, '100% completion  ·  up to 500 units/year rated'],
        ['Electronic fuzes', 'Precise detonation for air-to-ground', 4, '100% completion  ·  30k+ units/year rated'],
        ['Rocket launcher pods 7 & 19', 'Rotary and fixed-wing compatible', 4, '100% completion  ·  200 units/year rated'],
        ['Dagger', 'Guided bomb system, three models', 3, 'Capacity rated per model: 840 / 500 / 120 units per year'],
      ]},
      { name: 'Munitions', accent: '6FA82F', tint: '92D050', rows: [
        ['MK line filling', 'MK-81 / 82 / 83 / 84, Tritonal and Comp B', 5, '81k units/year rated  ·  +35k units delivered in 2025'],
        ['BLU-109', 'Anti-bunker penetration bomb', 5, 'Combat proven in 2026  ·  new contracts signed in 2025'],
        ['PBX 109 filling', 'MK series filled with PBX 109', 3, '95% completion  ·  23k units/year rated'],
        ['Hurricane', 'High-blast heavy ammunition', 3, '95% completion  ·  up to 10 units/year rated'],
        ['155 mm M107 / ERFBBB', 'NATO-standard artillery projectiles', 3, '120k units/year rated  ·  no completion published'],
      ]},
    ]},
  { page: 52,
    title: 'Development stage by product — Energetics, Missile and Space',
    sub: 'Energetics sells lines that are already running; Missile is where the development still sits',
    groups: [
      { name: 'Energetics', accent: 'C79000', tint: 'FFC000', rows: [
        ['Turnkey production lines', 'Full chemical and filling plants, delivered', 5, 'US$ 75 mm signed  ·  support contract running in Saudi Arabia'],
        ['TNT', 'Military-grade trinitrotoluene', 3, '500 to 5,000 tons/year line portfolio  ·  US$ 15+/kg'],
        ['RDX', 'Hexogen, high-explosive charges', 3, '100 to 3,000 tons/year line portfolio  ·  US$ 70+/kg'],
        ['HMX', 'Octogen, Military Grade B', 3, '90% completion  ·  10 tons/year rated  ·  US$ 500/kg'],
        ['Composite rocket propellant', 'Solid propellant for missiles and rockets', 2, '20% completion  ·  +5,000 m² plant under construction in 2027'],
      ]},
      { name: 'Missile', accent: '4A5261', tint: '9AA3B2', rows: [
        ['Diana', 'High-speed aerial target drone', 5, 'Sole supplier of air-to-air target drones to the Brazilian Air Force'],
        ['Target systems', 'Air-to-ground, aerial and scoring systems', 5, 'In service for live-fire training, with technical support'],
        ['RATO hypersonic accelerator', 'Rocket-assisted take-off, Mach 10.3', 2, 'First hypersonic accelerator in Latin America  ·  step toward VLM-1 certification'],
        ['SRAAM', 'Short-range air-to-air missile', 1, 'Named as under development in the unit’s core capabilities'],
        ['MAR-1', 'Anti-radiation missile for SEAD', 1, 'Named as under development in the unit’s core capabilities'],
      ]},
      { name: 'Space Systems', accent: 'C97A85', tint: 'FFB7B7', rows: [
        ['VLM-1', 'Microsatellite launch vehicle, 500 kg to LEO', 2, 'Brazil’s first space launch vehicle  ·  industrialisation started in 2025'],
      ]},
    ]},
];

const NOTE = 'Stage is the highest step the product satisfies: in production = delivered, in service, combat proven or under signed contract; qualified = 100% completion published; capacity rated = annual production capacity published; in build = completion published below 100% or plant under construction; in development = specified without either. Evidence as published by the Company.';
const SRC = 'Source: Company — Information Memorandum portfolio pages and commercial review of backlog and pipeline, 5 Aug 2026 (rev. 2).';

PAGES.forEach(P => {
  const s = p.addSlide(); s.background = { color: 'FFFFFF' };
  chrome(s, { tab: 2, title: P.title, subtitle: P.sub });

  const CX = 0.391, CY = 1.46, CW = 12.551, CH = 3.74;
  chamfer(s, CX, CY, CW, CH, 0.348, 'tr-bl', { fill: { color: 'FFFFFF' }, line: { type: 'none' },
    shadow: { type: 'outer', blur: 4, offset: 1.5, angle: 90, color: '000000', opacity: 0.16 } });

  // geometria das colunas
  const NX = 0.63, NW = 3.20;                 // produto
  const TX = 3.98, CELLW = 0.62, CELLG = 0.05; // trilha de estágio
  const TW = STAGES.length * CELLW + (STAGES.length - 1) * CELLG;
  const EX = TX + TW + 0.34, EW = 12.70 - EX;  // evidência

  // cabeçalhos
  txt(s, 'PRODUCT', { x: NX, y: 1.62, w: NW, h: 0.16, valign: 'middle',
    fontFace: 'Montserrat Light', fontSize: 6.4, color: GREY_L, charSpacing: 1.0 });
  STAGES.forEach((st, i) => {
    const x = TX + i * (CELLW + CELLG);
    rect(s, x, 1.80, CELLW, 0.035, RAMP[i]);
    txt(s, st, { x: x - 0.06, y: 1.58, w: CELLW + 0.12, h: 0.20, align: 'center', valign: 'middle',
      fontFace: 'Montserrat Light', fontSize: 5.8, color: GREY_L, lineSpacingMultiple: 1.0 });
  });
  txt(s, 'EVIDENCE PUBLISHED BY THE COMPANY', { x: EX, y: 1.62, w: EW, h: 0.16, valign: 'middle',
    fontFace: 'Montserrat Light', fontSize: 6.4, color: GREY_L, charSpacing: 1.0 });

  // altura de linha calculada para as duas páginas terminarem no mesmo y
  const Y0 = 1.93, YEND = 5.06, GH = 0.19, GGAP = 0.05;
  const nG = P.groups.length, nR = P.groups.reduce((a, g) => a + g.rows.length, 0);
  const RH = (YEND - Y0 - nG * (GH + GGAP)) / nR;
  let y = Y0;
  P.groups.forEach(g => {
    rect(s, NX, y + 0.06, 0.08, 0.13, g.accent);
    txt(s, g.name, { x: NX + 0.16, y, w: 4.0, h: 0.20, valign: 'middle',
      fontFace: K.F, bold: true, fontSize: 9.5, color: g.accent });
    rect(s, NX, y + 0.19, 12.07, 0.008, 'E6E8EE');
    y += GH;

    g.rows.forEach(([name, desc, stage, ev]) => {
      txt(s, name, { x: NX + 0.16, y: y + 0.01, w: NW - 0.16, h: 0.13, valign: 'middle',
        fontFace: K.F, bold: true, fontSize: 8, color: INK });
      txt(s, desc, { x: NX + 0.16, y: y + 0.125, w: NW - 0.16, h: 0.11, valign: 'middle',
        fontFace: K.F, fontSize: 6.6, color: GREY_L });
      STAGES.forEach((_, i) => {
        const x = TX + i * (CELLW + CELLG);
        rect(s, x, y + 0.03, CELLW, 0.175, i < stage ? RAMP[i] : EMPTY);
      });
      // marcador do estágio atual
      txt(s, '●', { x: TX + (stage - 1) * (CELLW + CELLG), y: y + 0.03, w: CELLW, h: 0.175,
        align: 'center', valign: 'middle', fontFace: K.F, fontSize: 6, color: 'FFFFFF' });
      txt(s, ev, { x: EX, y: y + 0.02, w: EW, h: 0.20, valign: 'middle',
        fontFace: K.F, fontSize: 7.2, color: GREY_T });
      y += RH;
    });
    y += GGAP;
  });

  txt(s, NOTE, { x: 0.63, y: 5.28, w: 12.07, h: 0.26, valign: 'top',
    fontFace: 'Montserrat Light', fontSize: 6.2, color: GREY_L, lineSpacingMultiple: 1.14 });

  /* ---- faixa navy: distribuição dos produtos por estágio ---- */
  darkField(s, 0, 5.643, 13.333, 1.857);
  const all = P.groups.flatMap(g => g.rows);
  const dist = STAGES.map((_, i) => all.filter(r => r[2] === i + 1).length);

  txt(s, 'Where the portfolio sits', { x: 0.60, y: 5.86, w: 5.4, h: 0.24, valign: 'middle',
    fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
  rect(s, 0.60, 6.11, 5.4, 0.010, '3C4E86');
  let bx = 0.60; const BW = 5.4;
  dist.forEach((n, i) => {
    if (!n) return;
    const w = BW * n / all.length;
    rect(s, bx, 6.24, w, 0.34, RAMP[i]);
    txt(s, String(n), { x: bx, y: 6.24, w, h: 0.34, align: 'center', valign: 'middle',
      fontFace: K.F, bold: true, fontSize: 10, color: i >= 3 ? 'FFFFFF' : '0B1F6E' });
    bx += w;
  });
  let lx = 0.60;
  STAGES.forEach((st, i) => {
    if (!dist[i]) return;
    rect(s, lx, 6.73, 0.09, 0.09, RAMP[i]);
    txt(s, st, { x: lx + 0.13, y: 6.67, w: 1.5, h: 0.20, valign: 'middle',
      fontFace: K.F, fontSize: 7, color: 'C6CBDA' });
    lx += st.length * 0.046 + 0.30;
  });

  const READY = all.filter(r => r[2] >= 3).length;
  txt(s, `${READY} of ${all.length} products already have a rated production line`, {
    x: 6.60, y: 5.86, w: 6.34, h: 0.24, valign: 'middle', fontFace: K.FM, fontSize: 10, color: 'FFFFFF' });
  rect(s, 6.60, 6.11, 6.34, 0.010, '3C4E86');
  const BULLETS = P.page === 51
    ? ['Every Weapon Systems product on this page has published a 100% completion figure or a rated capacity',
       'The two products in serial production are the ones carrying deliveries and signed contracts today',
       'The 155 mm line is rated at 120k units a year — the largest single capacity in the group']
    : ['Energetics sells the line itself: US$ 75 mm is already signed and a support contract is running',
       'The target and drone family is in service as sole supplier to the Brazilian Air Force',
       'Development is concentrated in three programmes — RATO, SRAAM and MAR-1 — and in the VLM-1'];
  BULLETS.forEach((b, i) => {
    const yy = 6.24 + i * 0.27;
    rect(s, 6.60, yy + 0.075, 0.07, 0.07, BLUE_L);
    txt(s, b, { x: 6.78, y: yy, w: 6.16, h: 0.24, valign: 'middle',
      fontFace: K.F, fontSize: 8.2, color: 'C6CBDA' });
  });

  footer(s, P.page, { source: SRC });
});

p.writeFile({ fileName: 'MacJee_heatmap_estagio.pptx' }).then(() => console.log('WROTE MacJee_heatmap_estagio.pptx'));
