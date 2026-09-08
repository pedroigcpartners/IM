/**
 * Project Yellow — Management Meeting & Site Visits · Invitation and Practical Guide (one page)
 *
 * Built on the Project Yellow IM canvas and identity (see yellow_kit.js).
 * All copy lives in CONTENT; anything not confirmed by a source is a visible [TBC] placeholder.
 *
 * Sources: the logistics e-mail thread (Bruno Iervolino → Henrik, 25 Aug 2026, and Lars's reply),
 * the Project Yellow Information Memorandum (16 Jul 2026), and public sources for the practical
 * notes. See yellow/README.md for the fact-by-fact provenance and the open items.
 */
const K = require('./yellow_kit.js');
const path = require('path');
const { C, cm } = K;

// ------------------------------------------------------------------ CONTENT
const CONTENT = {
  eyebrow: 'PROJECT YELLOW  ·  MANAGEMENT MEETING',
  titleHighlight: 'Welcome to Brazil',
  titleRest: ' — Invitation and Practical Guide',
  subtitle: 'Prepared for Lars and Henrik  ·  Ferronordic   |   Mon 21 – Fri 25 September 2026   |   São Paulo  ·  Sumaré  ·  Belo Horizonte / Contagem  ·  Curitiba',

  invite: {
    label: 'INVITATION',
    greeting: 'Dear Lars and Henrik,',
    body: 'It is our great pleasure to welcome you to Brazil. Over the coming days you will meet the management team, walk through our operations in Sumaré and Contagem and see at first hand the people and the operating model presented in the Information Memorandum. The IGC team will accompany you throughout and interpret on site; the sessions themselves are expected to be in English [to be confirmed].',
    signoff: [['The Tracbel management team', 'Contagem  ·  Minas Gerais'], ['Bruno Iervolino', 'IGC Partners  ·  São Paulo']],
  },

  see: {
    label: 'WHAT YOU WILL SEE',
    items: [
      'Sumaré (SP) — the branch where the LEAN / Tracbel Performance System began (IM p. 26)',
      'Contagem (MG) — headquarters and operations: after-sales, parts e-commerce (IM pp. 13, 25, 28)',
      'Curitiba (PR) — programme [TBC]',
    ],
  },

  rsvp: {
    label: 'BEFORE YOU TRAVEL  ·  PLEASE SEND BY [DATE — TBC]',
    items: [
      'Priority questions for management — IGC keeps one Q&A log',
      'Henrik: return flight and number of nights in Curitiba',
      'Passport names for the private flights; dietary requirements',
      'Pre-read: IM sections “The Company” and “Business Plan”',
    ],
  },

  schedule: {
    label: 'Programme  ·  21–25 September 2026',
    // Time rail on the left; one column per day. '' renders as the empty-slot mark [ ].
    times: ['06:00', '08:00', '09:30', '11:00', '12:30', '14:00', '16:00', '18:00', '20:00'],
    days: [
      { d: 'Mon 21', city: 'São Paulo', night: 'São Paulo  [hotel — TBC]', cells: [
        'LX 92 lands 05:25 · GRU T3\nBTG Pactual · car to the hotel',
        'Hotel check-in  [early check-in — TBC]',
        '', '', '', '', '', '',
        'Welcome dinner  [TBC]'] },
      { d: 'Tue 22', city: 'Sumaré', night: 'Belo Horizonte  [hotel — TBC]', cells: [
        '',
        'Private flight Congonhas (CGH) → Sumaré  [time — TBC]',
        'Sumaré — site visit',
        '', '', '', '',
        'Private flight Sumaré → Belo Horizonte  (evening)',
        ''] },
      { d: 'Wed 23', city: 'Contagem', night: 'Belo Horizonte  (same hotel)', cells: [
        '',
        'Car to Contagem  [departure — TBC]',
        'Contagem — operations visit',
        '', '', '', '',
        'Return to Belo Horizonte',
        ''] },
      { d: 'Thu 24', city: 'Belo Horizonte → Curitiba', night: 'Curitiba  [hotel — TBC]', cells: [
        '',
        'Morning programme proposed by Luiz Gustavo  [details — TBC]',
        '', '', '', '', '',
        'Private flight Confins (CNF) → Curitiba (CWB)  (evening)',
        ''] },
      { d: 'Fri 25', city: 'Curitiba → departure', night: '— departure', cells: [
        '',
        'Curitiba programme  [TBC]',
        '',
        'Commercial flight CWB → GRU  [flight — TBC]',
        'Arrive GRU · transfer T1 / T2 → T3',
        '', '',
        'LX 93 to Zürich departs 18:25 · GRU T3',
        ''] },
    ],
  },

  notes: {
    label: 'Practical notes',
    tiles: [
      { icon: 'MdFlightLand', title: 'Travel & who arranges what',
        text: 'International flights: Ferronordic. Everything in Brazil — BTG Pactual terminal, cars, private flights, hotels and the CWB → GRU flight: Tracbel. On the private legs carry your passport for FBO check-in and arrive about 30 minutes before wheels-up.' },
      { icon: 'FiEyeOff', title: 'Confidentiality & conduct',
        text: 'Refer to the process only as “Project Yellow”. Most Tracbel employees are unaware of it: on site you will be introduced as [agreed narrative — TBC]; first names only, no business cards on the shop floor, deal topics only in closed sessions, no photographs.' },
      { icon: 'MdOutlineHealthAndSafety', title: 'Dress code & safety',
        text: 'Business casual for the management sessions — a jacket is enough, no tie needed. In workshops and yards: long trousers and closed, sturdy shoes. Site PPE and a safety briefing [to be provided by Tracbel — TBC].' },
      { icon: 'FiSun', title: 'Weather, time & health',
        text: 'Spring: São Paulo 15–26 °C (showers), Belo Horizonte 17–29 °C (dry), Curitiba 11–23 °C (cool, rainy) — bring a jacket and an umbrella. Brazil (UTC−3) is 5 h behind Zürich. No vaccination is required to enter; CDC and WHO recommend yellow fever for these states.' },
      { icon: 'MdOutlinePower', title: 'Money & connectivity',
        text: 'Currency BRL; cards and contactless work almost everywhere and restaurants add a 10% service charge, so little cash is needed. Sockets 127 V, type N: Europlugs fit, Swiss and Schuko plugs need an adapter. Roaming or a travel eSIM works well.' },
    ],
  },

  contacts: {
    label: 'CONTACTS',
    cols: [
      ['Bruno Iervolino  ·  IGC Partners', '+55 11 3815-3533 (office)   ·   [mobile — TBC]   ·   bruno.iervolino@igcp.com.br'],
      ['Luca Francini  ·  IGC Partners  ·  24h during the week', '[mobile / WhatsApp — TBC]   ·   luca.francini@igcp.com.br'],
      ['Luiz Gustavo Rocha  ·  Tracbel host  [title — TBC]', '[mobile — TBC]   ·   [e-mail — TBC]'],
    ],
    note: 'Strictly private and confidential  ·  Programme as of 8 September 2026 — items in [brackets] to be confirmed  ·  Emergency: 192 ambulance  ·  190 police  ·  193 fire  ·  Prepared by IGC Partners',
  },
  page: 1,
};

// ------------------------------------------------------------------ LAYOUT
(async () => {
  const p = K.init('Project Yellow — Management Meeting & Site Visits · Invitation and Practical Guide');
  const s = p.addSlide(); s.background = { color: C.white };
  const W = K.W, H = K.H;
  const L = cm(1.58), R = W - cm(1.58);
  const TOP = cm(5.6);

  // --- chrome (IM slide-3 pattern: hatch strip, eyebrow tab, logo, bold title)
  K.img(s, await K.hatch(cm(43.06), cm(1.25)), 0, 0, cm(43.06), cm(1.25));
  K.eyebrow(s, CONTENT.eyebrow, { w: cm(13.4) });
  K.tracbelLogo(s);
  s.addText([
    { text: CONTENT.titleHighlight, options: { bold: true, highlight: C.yellow } },
    { text: CONTENT.titleRest, options: { bold: true } },
  ], { x: L, y: cm(3.15), w: cm(45.2), h: cm(1.2), fontSize: 24, fontFace: K.F, color: C.black, margin: 0, isTextBox: true, valign: 'middle' });
  K.txt(s, CONTENT.subtitle, { x: L, y: cm(4.42), w: cm(45.2), h: cm(0.8), fontSize: 12.5, color: C.grayD, valign: 'middle' });

  // --- left: invitation panel (black, one rounded corner — IM motif)
  const PX = L, PW = cm(13.4), pad = cm(0.78);
  const PY = TOP, PH = cm(13.12);
  K.r1rect(s, PX, PY, PW, PH, C.ink, { corner: 'tr', radius: 0.35 });
  let y = PY + pad; const tx = PX + pad, tw = PW - 2 * pad;
  const label = (t, yy) => K.txt(s, t, { x: tx, y: yy, w: tw, h: cm(0.5), fontSize: 9.5, bold: true, color: C.yellow, charSpacing: 1.0, valign: 'middle' });
  const rule = (yy) => K.line(s, tx, yy, tx + tw, yy, '3A3A3A', 0.75);
  const bullets = (items, yy, size, lhs) => { items.forEach((it, i) => {
    const lh = Array.isArray(lhs) ? lhs[i] : lhs;
    K.rect(s, tx, yy + cm(0.15), cm(0.22), cm(0.22), C.yellow);
    K.txt(s, it, { x: tx + cm(0.45), y: yy, w: tw - cm(0.45), h: cm(lh), fontSize: size, color: 'E8E8E8', lineSpacingMultiple: 1.05, valign: 'top' });
    yy += cm(lh); }); return yy; };

  label(CONTENT.invite.label, y); y += cm(0.6);
  K.txt(s, CONTENT.invite.greeting, { x: tx, y, w: tw, h: cm(0.55), fontSize: 12, bold: true, color: C.white }); y += cm(0.68);
  K.txt(s, CONTENT.invite.body, { x: tx, y, w: tw, h: cm(3.75), fontSize: 10.5, color: 'E8E8E8', lineSpacingMultiple: 1.1 }); y += cm(3.82);
  CONTENT.invite.signoff.forEach((sg, i) => {
    const sx = tx + i * (tw / 2);
    K.txt(s, sg[0], { x: sx, y, w: tw / 2 - cm(0.2), h: cm(0.45), fontSize: 10.5, bold: true, color: C.white });
    K.txt(s, sg[1], { x: sx, y: y + cm(0.44), w: tw / 2 - cm(0.2), h: cm(0.4), fontSize: 8.5, color: C.gray });
  });
  y += cm(1.0); rule(y); y += cm(0.24);
  label(CONTENT.see.label, y); y += cm(0.55);
  y = bullets(CONTENT.see.items, y, 9.5, [0.85, 0.85, 0.5]);
  y += cm(0.14); rule(y); y += cm(0.24);
  label(CONTENT.rsvp.label, y); y += cm(0.55);
  y = bullets(CONTENT.rsvp.items, y, 9.5, 0.5);

  // --- right: programme as a time grid (times on the left, tasks in the day columns)
  const IX = PX + PW + cm(0.7), IW = R - IX, IY = TOP;
  K.rrect(s, IX, IY, IW, cm(0.82), C.yellow, { radius: 0.08 });
  K.txt(s, CONTENT.schedule.label, { x: IX + cm(0.4), y: IY, w: IW - cm(0.8), h: cm(0.82), fontSize: 12.5, bold: true, valign: 'middle' });

  const RAIL = cm(2.1), DAYS = CONTENT.schedule.days, DW = (IW - RAIL) / DAYS.length;
  const HY = IY + cm(0.82), HH = cm(0.95);        // day header row
  const GY = HY + HH;                              // first time row
  const RH = cm(1.15), NH2 = cm(1.0);              // time-row height, night strip
  const dayX = i => IX + RAIL + i * DW;

  // day headers
  DAYS.forEach((d, i) => {
    K.txt(s, d.d, { x: dayX(i) + cm(0.3), y: HY + cm(0.08), w: DW - cm(0.4), h: cm(0.45), fontSize: 11.5, bold: true, valign: 'middle' });
    K.txt(s, d.city, { x: dayX(i) + cm(0.3), y: HY + cm(0.5), w: DW - cm(0.4), h: cm(0.4), fontSize: 8.5, color: C.grayD, valign: 'middle' });
  });
  K.line(s, IX, GY, IX + IW, GY, C.black, 1);

  // time rows
  CONTENT.schedule.times.forEach((t, r) => {
    const y0 = GY + r * RH;
    if (r % 2 === 1) K.rect(s, IX, y0, IW, RH, C.grayL);
    K.txt(s, t, { x: IX + cm(0.2), y: y0, w: RAIL - cm(0.5), h: RH, fontSize: 10, bold: true, color: C.grayD, align: 'right', valign: 'middle' });
    DAYS.forEach((d, i) => {
      const cell = d.cells[r];
      if (cell) {
        K.txt(s, cell, { x: dayX(i) + cm(0.3), y: y0 + cm(0.08), w: DW - cm(0.45), h: RH - cm(0.16), fontSize: 9, color: C.ink, lineSpacingMultiple: 1.05, valign: 'middle' });
      } else {
        K.txt(s, '[    ]', { x: dayX(i) + cm(0.3), y: y0, w: DW - cm(0.45), h: RH, fontSize: 9, color: C.gray, valign: 'middle' });
      }
    });
    K.line(s, IX, y0 + RH, IX + IW, y0 + RH, C.line, 0.5);
  });

  // night strip
  const NY2 = GY + CONTENT.schedule.times.length * RH;
  K.rect(s, IX, NY2, IW, NH2, C.ink);
  K.txt(s, 'NIGHT', { x: IX + cm(0.2), y: NY2, w: RAIL - cm(0.5), h: NH2, fontSize: 8.5, bold: true, color: C.yellow, align: 'right', charSpacing: 1.0, valign: 'middle' });
  DAYS.forEach((d, i) => K.txt(s, d.night, { x: dayX(i) + cm(0.3), y: NY2, w: DW - cm(0.45), h: NH2, fontSize: 9, color: 'E8E8E8', valign: 'middle' }));

  // --- bottom: practical notes (five tiles, full width)
  const NY = cm(19.15), NH = cm(5.45);          // tiles end at 24.60 → 0.40 cm clear of the footer band
  K.rrect(s, L, NY, R - L, cm(0.82), C.yellow, { radius: 0.08 });
  K.txt(s, CONTENT.notes.label, { x: L + cm(0.4), y: NY, w: cm(20), h: cm(0.82), fontSize: 12.5, bold: true, valign: 'middle' });
  const n = CONTENT.notes.tiles.length, gap = cm(0.45), TW = (R - L - gap * (n - 1)) / n;
  const TY = NY + cm(1.02), TH = NH - cm(1.02);
  for (let i = 0; i < n; i++) {
    const t = CONTENT.notes.tiles[i], x = L + i * (TW + gap);
    K.rect(s, x, TY, TW, TH, C.grayL);
    K.rect(s, x + cm(0.35), TY + cm(0.32), cm(0.92), cm(0.92), C.gray);   // IM icon-square motif
    K.img(s, await K.icon(t.icon, '000000'), x + cm(0.5), TY + cm(0.47), cm(0.62), cm(0.62));
    K.txt(s, t.title, { x: x + cm(1.45), y: TY + cm(0.32), w: TW - cm(1.75), h: cm(0.92), fontSize: 11, bold: true, valign: 'middle' });
    K.txt(s, t.text, { x: x + cm(0.35), y: TY + cm(1.42), w: TW - cm(0.7), h: TH - cm(1.6), fontSize: 10, color: C.ink, lineSpacingMultiple: 1.06 });
  }

  // --- footer band: IGC lockup, contacts, legend, page number (IM black band)
  const FY = cm(25.0), FH = H - FY;
  K.rect(s, 0, FY, W, FH, C.black);
  K.igcLogo(s, L, FY + cm(0.6), cm(1.15), true);
  K.rect(s, L + cm(1.55), FY + cm(1.2), cm(0.5), cm(0.5), C.yellow);
  const CX0 = L + cm(2.9), CW = (W - cm(3.4) - CX0) / 3;
  K.txt(s, CONTENT.contacts.label, { x: CX0, y: FY + cm(0.26), w: cm(4), h: cm(0.4), fontSize: 8.5, bold: true, color: C.yellow, charSpacing: 1.2, valign: 'middle' });
  CONTENT.contacts.cols.forEach((c, i) => {
    const x = CX0 + i * CW;
    K.txt(s, c[0], { x, y: FY + cm(0.68), w: CW - cm(0.3), h: cm(0.45), fontSize: 9.5, bold: true, color: C.white, valign: 'middle' });
    K.txt(s, c[1], { x, y: FY + cm(1.12), w: CW - cm(0.3), h: cm(0.42), fontSize: 9, color: C.gray, valign: 'middle' });
  });
  K.txt(s, CONTENT.contacts.note, { x: CX0, y: FY + cm(1.60), w: cm(42), h: cm(0.45), fontSize: 8.5, color: '8A8C8E', valign: 'middle' });
  K.pageNo(s, CONTENT.page, { color: C.white, y: FY + FH / 2 - cm(0.25) });

  const out = path.join(__dirname, 'Project_Yellow_Management_Meeting_Guide.pptx');
  await p.writeFile({ fileName: out });
  console.log('written', out);
})().catch(e => { console.error(e); process.exit(1); });
