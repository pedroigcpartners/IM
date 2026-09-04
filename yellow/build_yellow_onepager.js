/**
 * Project Yellow — Management Meeting & Site Visits · Invitation and Practical Guide (one page)
 * Built on the Project Yellow IM canvas and identity (see yellow_kit.js).
 * All copy lives in CONTENT; anything not confirmed is a visible [TBC] placeholder.
 * Sources: logistics e-mail thread (Bruno Iervolino, 25 Aug 2026; Lars's reply), Project Yellow IM (16 Jul 2026),
 * public sources for practical facts (see research notes in the repo).
 */
const K = require('./yellow_kit.js');
const path = require('path');
const { C, cm } = K;

// ------------------------------------------------------------------ CONTENT
const CONTENT = {
  eyebrow: 'PROJECT YELLOW  ·  MANAGEMENT MEETING',
  title: 'Welcome to Brazil — Invitation and Practical Guide',
  subtitle: 'Prepared for Lars Corneliusson and Henrik Carlborg, Ferronordic   ·   Mon 21 – Fri 25 September 2026   ·   São Paulo  ·  Sumaré  ·  Belo Horizonte / Contagem  ·  Curitiba',
  invite: {
    label: 'INVITATION',
    greeting: 'Dear Lars and Henrik,',
    body: 'It is our great pleasure to welcome you to Brazil. Over the coming days you will meet the management team, walk through our operations in Sumaré and Contagem and see at first hand the people and the operating model presented in the Information Memorandum. This page gathers the programme, travel arrangements and practical notes; the IGC team will accompany you throughout.',
    signoff: [['Luiz Gustavo Rocha', 'Chairman of the Board  ·  Tracbel'], ['Bruno Iervolino', 'IGC Partners']],
  },
  purpose: {
    label: 'PURPOSE OF THE WEEK',
    items: [
      'Management sessions on strategy and the 2026–2030 plan',
      'Sumaré: visit to the LEAN / TPS pilot unit',
      'Contagem: headquarters and operations tour',
      'Curitiba: programme [TBC]',
    ],
  },
  rsvp: {
    label: 'BEFORE YOU TRAVEL  —  PLEASE SEND BY [DATE — TBC]',
    items: [
      'Priority questions for management (single IGC Q&A log)',
      'Henrik: return flight and nights in Curitiba',
      'Passport names (private flights), shoe sizes, diet',
      'Pre-read: IM sections The Company and Business Plan',
    ],
  },
  itinerary: {
    label: 'Programme  ·  21–25 September 2026',
    cols: ['DAY', 'PROGRAMME', 'TRAVEL & ACCOMMODATION', 'ARRANGED BY'],
    rows: [
      { d: '21', wd: 'Mon', title: 'Arrival in São Paulo',
        prog: 'LX 092 from Zürich lands at GRU Terminal 3 at 05:25. Clearance through Terminal BTG Pactual — met at the aircraft, private immigration and customs, driver waiting at the terminal exit. Day to recover; [welcome dinner — TBC].',
        travel: 'Hotel in São Paulo [name — TBC]', by: 'Intl. flight: Ferronordic\nTerminal, car, hotel: Tracbel' },
      { d: '22', wd: 'Tue', title: 'Sumaré site visit',
        prog: 'Private flight Congonhas (CGH) → Sumaré [operator & landing field — TBC]. Visit to the Sumaré branch, the first LEAN / TPS unit, and management sessions [agenda — TBC]. Evening private flight Sumaré → Belo Horizonte.',
        travel: 'Private flights CGH → Sumaré → BH\nHotel in Belo Horizonte [name — TBC]', by: 'Tracbel' },
      { d: '23', wd: 'Wed', title: 'Contagem: headquarters & operations',
        prog: 'Car from the hotel to Tracbel’s headquarters in Contagem (~30 min). Operations visit and management meeting [agenda & times — TBC]. Return to Belo Horizonte for the night.',
        travel: 'Car BH ⇄ Contagem\nHotel in Belo Horizonte', by: 'Tracbel' },
      { d: '24', wd: 'Thu', title: 'Belo Horizonte → Curitiba',
        prog: 'Morning programme as proposed by Luiz Gustavo [details — TBC]. Evening private flight Confins (CNF) → Curitiba (CWB). Overnight in Curitiba.',
        travel: 'Private flight CNF → CWB\nHotel in Curitiba [name — TBC]', by: 'Tracbel' },
      { d: '25', wd: 'Fri', title: 'Curitiba → departure',
        prog: 'Curitiba programme [TBC]. Commercial flight CWB → GRU departing 11:00–13:00 [flight — TBC]; domestic arrivals use Terminal 2 — allow time to transfer to T3. LX 93 to Zürich departs T3 at 18:25. Henrik: return [TBC].',
        travel: 'Commercial flight CWB → GRU (~1h15)', by: 'CWB → GRU: Tracbel\nIntl. flight: Ferronordic' },
    ],
  },
  notes: {
    label: 'Practical notes',
    tiles: [
      { icon: 'MdFlightLand', title: 'Flights & transfers',
        text: 'Terminal BTG Pactual is a private terminal beside T3: you are met at the aircraft, immigration, customs and luggage are handled privately, and your driver waits at its exit. Private legs: passport at FBO check-in, arrive ~30 min before wheels-up, soft luggage [limit — TBC].' },
      { icon: 'FiEyeOff', title: 'Confidentiality & conduct',
        text: 'Refer to the process only as “Project Yellow”. Most Tracbel employees are unaware of it: on site you will be introduced as [agreed narrative — TBC]; first names only, no business cards on the shop floor, deal topics only in closed sessions. No photos or recordings without permission.' },
      { icon: 'MdOutlineHealthAndSafety', title: 'Dress code & safety',
        text: 'Business casual for management sessions (jacket, no tie needed). Workshops and yards: long trousers and closed, sturdy shoes — Tracbel provides high-visibility vests, safety glasses and hearing protection, with a short safety briefing on arrival.' },
      { icon: 'FiSun', title: 'Weather, time & health',
        text: 'Spring: São Paulo 15–26 °C (showers possible), Belo Horizonte 17–29 °C (dry), Curitiba 11–23 °C (cool, rainy) — pack a jacket and umbrella. Brazil is 5 h behind Zürich (UTC−3). No vaccination is required for entry; CDC/WHO recommend yellow-fever vaccination for these states — ask your travel clinic.' },
      { icon: 'MdOutlinePower', title: 'Money, power & connectivity',
        text: 'Currency BRL; cards and contactless work almost everywhere; restaurants add a 10% service charge — no further tip expected. Sockets 127 V (some 220 V), type N: Europlugs fit, Swiss 3-pin and Schuko plugs need an adapter. EU roaming or a travel eSIM works well. Portuguese on site — IGC will interpret.' },
    ],
  },
  contacts: {
    label: 'CONTACTS',
    cols: [
      ['Bruno Iervolino  ·  IGC Partners', '+55 11 3815-3533   ·   bruno.iervolino@igcp.com.br'],
      ['Luca Francini  ·  IGC Partners (logistics)', '[mobile — TBC]   ·   luca.francini@igcp.com.br'],
      ['Luiz Gustavo Rocha  ·  Tracbel', '[mobile — TBC]   ·   Emergency: ambulance 192  ·  police 190'],
    ],
    note: 'Strictly private and confidential  ·  Programme as of 4 September 2026 — items in [brackets] to be confirmed  ·  Prepared by IGC Partners',
  },
  page: 1,
};

// ------------------------------------------------------------------ LAYOUT
(async () => {
  const p = K.init('Project Yellow — Management Meeting & Site Visits · Invitation and Practical Guide');
  const s = p.addSlide(); s.background = { color: C.white };
  const W = K.W, H = K.H;
  const L = cm(1.58), R = W - cm(1.58);

  // --- chrome (IM slide 3 pattern: hatch strip, eyebrow tab, logo, bold title)
  K.img(s, await K.hatch(cm(43.06), cm(1.25)), 0, 0, cm(43.06), cm(1.25));
  K.eyebrow(s, CONTENT.eyebrow, { w: cm(12.6) });
  K.tracbelLogo(s);
  K.txt(s, CONTENT.title, { x: L, y: cm(3.19), w: cm(45.2), h: cm(1.2), fontSize: 24, bold: true, valign: 'middle' });
  K.txt(s, CONTENT.subtitle, { x: L, y: cm(4.45), w: cm(45.2), h: cm(0.8), fontSize: 12.5, color: C.grayD, valign: 'middle' });

  // --- left: invitation panel (black, one rounded corner)
  const PX = L, PY = cm(5.75), PW = cm(13.4), PH = cm(13.2), pad = cm(0.8);
  K.r1rect(s, PX, PY, PW, PH, C.ink, { corner: 'tr', radius: 0.35 });
  K.img(s, await K.hatch(cm(2.6), cm(1.05), 'FFFFFF', 'w'), PX + PW - cm(2.6), PY + PH - cm(1.05), cm(2.6), cm(1.05));
  let y = PY + pad; const tx = PX + pad, tw = PW - 2 * pad;
  const label = (t, yy) => K.txt(s, t, { x: tx, y: yy, w: tw, h: cm(0.5), fontSize: 9.5, bold: true, color: C.yellow, charSpacing: 1.2, valign: 'middle' });
  const rule = (yy) => K.line(s, tx, yy, tx + tw, yy, '3A3A3A', 0.75);
  const bullets = (items, yy, size, lh) => { items.forEach(it => {
    K.rect(s, tx, yy + cm(0.16), cm(0.22), cm(0.22), C.yellow);
    K.txt(s, it, { x: tx + cm(0.45), y: yy, w: tw - cm(0.45), h: cm(lh), fontSize: size, color: 'E8E8E8', valign: 'middle' });
    yy += cm(lh); }); return yy; };
  label(CONTENT.invite.label, y); y += cm(0.65);
  K.txt(s, CONTENT.invite.greeting, { x: tx, y, w: tw, h: cm(0.55), fontSize: 12, bold: true, color: C.white }); y += cm(0.7);
  K.txt(s, CONTENT.invite.body, { x: tx, y, w: tw, h: cm(3.4), fontSize: 10.5, color: 'E8E8E8', lineSpacingMultiple: 1.1 }); y += cm(3.6);
  CONTENT.invite.signoff.forEach((sg, i) => {
    const sx = tx + i * (tw / 2);
    K.txt(s, sg[0], { x: sx, y, w: tw / 2 - cm(0.2), h: cm(0.45), fontSize: 10.5, bold: true, color: C.white });
    K.txt(s, sg[1], { x: sx, y: y + cm(0.45), w: tw / 2 - cm(0.2), h: cm(0.4), fontSize: 8.5, color: C.gray });
  });
  y += cm(1.0); rule(y); y += cm(0.22);
  label(CONTENT.purpose.label, y); y += cm(0.55);
  y = bullets(CONTENT.purpose.items, y, 9.5, 0.48);
  y += cm(0.12); rule(y); y += cm(0.22);
  label(CONTENT.rsvp.label, y); y += cm(0.55);
  y = bullets(CONTENT.rsvp.items, y, 9.5, 0.48);

  // --- right: itinerary grid
  const IX = PX + PW + cm(0.7), IW = R - IX, IY = PY;
  K.rrect(s, IX, IY, IW, cm(0.85), C.yellow, { radius: 0.08 });
  K.txt(s, CONTENT.itinerary.label, { x: IX + cm(0.4), y: IY, w: IW - cm(0.8), h: cm(0.85), fontSize: 12.5, bold: true, valign: 'middle' });
  const colW = [cm(3.9), cm(15.8), cm(7.6)]; colW.push(IW - colW[0] - colW[1] - colW[2]);
  const colX = [IX]; for (let i = 1; i < 4; i++) colX.push(colX[i - 1] + colW[i - 1]);
  let ry = IY + cm(1.05);
  CONTENT.itinerary.cols.forEach((c, i) => K.txt(s, c, { x: colX[i] + cm(0.3), y: ry, w: colW[i] - cm(0.4), h: cm(0.5), fontSize: 8.5, bold: true, color: C.grayD, charSpacing: 1.0, valign: 'middle' }));
  ry += cm(0.55);
  K.line(s, IX, ry, IX + IW, ry, C.black, 1);
  const RH = cm(2.32);
  CONTENT.itinerary.rows.forEach((r, i) => {
    if (i % 2 === 1) K.rect(s, IX, ry, IW, RH, C.grayL);
    K.badge(s, colX[0] + cm(0.3), ry + cm(0.35), cm(1.05), r.d, { size: 13 });
    K.txt(s, r.wd, { x: colX[0] + cm(1.55), y: ry + cm(0.35), w: cm(2.2), h: cm(0.5), fontSize: 11, bold: true, valign: 'middle' });
    K.txt(s, 'Sep 2026', { x: colX[0] + cm(1.55), y: ry + cm(0.85), w: cm(2.2), h: cm(0.5), fontSize: 8.5, color: C.grayD, valign: 'middle' });
    K.txt(s, r.title, { x: colX[1] + cm(0.3), y: ry + cm(0.25), w: colW[1] - cm(0.5), h: cm(0.5), fontSize: 11.5, bold: true, valign: 'middle' });
    K.txt(s, r.prog, { x: colX[1] + cm(0.3), y: ry + cm(0.78), w: colW[1] - cm(0.5), h: RH - cm(0.85), fontSize: 10, color: C.ink, lineSpacingMultiple: 1.06 });
    K.txt(s, r.travel, { x: colX[2] + cm(0.3), y: ry + cm(0.3), w: colW[2] - cm(0.5), h: RH - cm(0.4), fontSize: 10, color: C.ink, lineSpacingMultiple: 1.1 });
    K.txt(s, r.by, { x: colX[3] + cm(0.3), y: ry + cm(0.3), w: colW[3] - cm(0.4), h: RH - cm(0.4), fontSize: 9.5, color: C.grayD, lineSpacingMultiple: 1.1 });
    ry += RH;
    K.line(s, IX, ry, IX + IW, ry, C.line, 0.5);
  });

  // --- bottom: practical notes (5 tiles, full width)
  const NY = cm(19.4), NH = cm(5.45);
  K.rrect(s, L, NY, R - L, cm(0.85), C.yellow, { radius: 0.08 });
  K.txt(s, CONTENT.notes.label, { x: L + cm(0.4), y: NY, w: cm(20), h: cm(0.85), fontSize: 12.5, bold: true, valign: 'middle' });
  const n = CONTENT.notes.tiles.length, gap = cm(0.45), TW = (R - L - gap * (n - 1)) / n, TY = NY + cm(1.05), TH = NH - cm(1.05);
  for (let i = 0; i < n; i++) {
    const t = CONTENT.notes.tiles[i], x = L + i * (TW + gap);
    K.rect(s, x, TY, TW, TH, C.grayL);
    K.rect(s, x + cm(0.35), TY + cm(0.35), cm(0.95), cm(0.95), C.white);
    K.img(s, await K.icon(t.icon, '000000'), x + cm(0.5), TY + cm(0.5), cm(0.65), cm(0.65));
    K.txt(s, t.title, { x: x + cm(1.5), y: TY + cm(0.35), w: TW - cm(1.8), h: cm(0.95), fontSize: 11, bold: true, valign: 'middle' });
    K.txt(s, t.text, { x: x + cm(0.35), y: TY + cm(1.5), w: TW - cm(0.7), h: TH - cm(1.65), fontSize: 9, color: C.ink, lineSpacingMultiple: 1.08 });
  }

  // --- footer band: contacts + legend + page (IM black band)
  const FY = cm(25.0), FH = H - FY;
  K.rect(s, 0, FY, W, FH, C.black);
  K.igcLogo(s, L, FY + cm(0.62), cm(1.2), true);
  const CX0 = L + cm(2.6), CW = (W - cm(3.2) - CX0) / 3;
  K.txt(s, CONTENT.contacts.label, { x: CX0, y: FY + cm(0.3), w: cm(3), h: cm(0.4), fontSize: 8, bold: true, color: C.yellow, charSpacing: 1.2, valign: 'middle' });
  CONTENT.contacts.cols.forEach((c, i) => {
    const x = CX0 + i * CW;
    K.txt(s, c[0], { x, y: FY + cm(0.7), w: CW - cm(0.3), h: cm(0.45), fontSize: 9.5, bold: true, color: C.white, valign: 'middle' });
    K.txt(s, c[1], { x, y: FY + cm(1.12), w: CW - cm(0.3), h: cm(0.42), fontSize: 8.5, color: C.gray, valign: 'middle' });
  });
  K.txt(s, CONTENT.contacts.note, { x: CX0, y: FY + cm(1.7), w: cm(40), h: cm(0.45), fontSize: 8, color: '8A8C8E', valign: 'middle' });
  K.pageNo(s, CONTENT.page, { color: C.white, y: FY + FH / 2 - cm(0.25) });

  const out = path.join(__dirname, 'Project_Yellow_Management_Meeting_Guide.pptx');
  await p.writeFile({ fileName: out });
  console.log('written', out);
})().catch(e => { console.error(e); process.exit(1); });
