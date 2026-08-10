// Project Compass — Confidential Information Memorandum (Mobi)
// IGC Partners house style: white content, navy #222F44 covers/dividers, Mobi orange #F35B1A accent.
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";           // 13.3 x 7.5
p.author = "IGC Partners";
p.title = "Project Compass — Confidential Information Memorandum";

// ---------- palette ----------
const NAVY = "222F44", NAVY2 = "2C3B54", INK = "1A2230";
const ORANGE = "F35B1A", ORANGE_D = "C6470F", GOLD = "D3A93D";
const WHITE = "FFFFFF", PAPER = "F5F7F9", CARD = "EEF1F5", LINE = "D9DEE5";
const GRAY = "6B7686", GRAY_L = "97A0AD", TXT = "2A3342";
const SERIF = "Source Serif Pro", SERIF_SB = "Source Serif Pro SemiBold", SERIF_BLK = "Source Serif Pro Black";
const SANS = "Poppins", SANS_M = "Poppins Medium", SANS_SB = "Poppins SemiBold";

const W = 13.333, H = 7.5, M = 0.55;
const A = "assets/";
const ic = (n, c) => `${A}icons/${n}_${c}.png`;

const SECTIONS = ["Introduction", "Investment Thesis", "Company Overview", "Financial Highlights"];

// ---------- helpers ----------
function bg(s, color){ s.background = { color }; }

// content-slide chrome: igc top-right, eyebrow, title, subtitle, source, page number
function chrome(s, {eyebrow, title, subtitle, source, page}){
  s.addImage({ path: A+"igc_navy.png", x: W-0.55-0.62, y: 0.34, w: 0.62, h: 0.62*(778/900) });
  if (eyebrow) s.addText(eyebrow.toUpperCase(), { x:M, y:0.42, w:8, h:0.28, fontFace:SANS_SB, fontSize:10.5, color:ORANGE, charSpacing:2, align:"left" });
  if (title) s.addText(title, { x:M, y:0.66, w:W-M-1.4, h:0.7, fontFace:SERIF_SB, fontSize:25, color:NAVY, align:"left", valign:"top" });
  if (subtitle) s.addText(subtitle, { x:M, y:1.34, w:W-M-1.4, h:0.5, fontFace:SANS, fontSize:12.5, color:GRAY, align:"left", valign:"top" });
  if (source) s.addText(source, { x:M, y:H-0.34, w:W-2.2, h:0.26, fontFace:SANS, fontSize:7, color:GRAY_L, align:"left", valign:"middle" });
  s.addText([{text:"Confidential   ", options:{color:GRAY_L}},{text:String(page), options:{color:NAVY, bold:true}}],
            { x:W-1.6, y:H-0.34, w:1.05, h:0.26, fontFace:SANS_M, fontSize:8.5, align:"right", valign:"middle" });
}

// icon in a soft circle chip
function chip(s, x, y, d, icon, {fill=CARD, color="navy"}={}){
  s.addShape(p.ShapeType.ellipse, { x, y, w:d, h:d, fill:{color:fill}, line:{type:"none"} });
  const pad = d*0.26;
  s.addImage({ path: ic(icon, color), x:x+pad, y:y+pad, w:d-2*pad, h:d-2*pad });
}

// rounded card
function card(s, x, y, w, h, {fill=WHITE, line=LINE, shadow=true, radius=0.1}={}){
  const o = { x, y, w, h, rectRadius:radius, fill:{color:fill}, line: line?{color:line,width:1}:{type:"none"} };
  if (shadow) o.shadow = { type:"outer", color:"9AA6B4", opacity:0.28, blur:7, offset:2, angle:90 };
  s.addShape(p.ShapeType.roundRect, o);
}

// big stat callout (number + label)
function stat(s, x, y, w, num, label, {numColor=NAVY, numSize=27, labelColor=GRAY, align="left"}={}){
  s.addText(num, { x, y, w, h:0.5, fontFace:SERIF_BLK, fontSize:numSize, color:numColor, align, valign:"bottom", margin:0 });
  s.addText(label, { x, y:y+0.52, w, h:0.5, fontFace:SANS, fontSize:9.5, color:labelColor, align, valign:"top", margin:0, lineSpacingMultiple:0.95 });
}

// section divider (dark)
function divider(s, idx){
  bg(s, NAVY);
  s.addShape(p.ShapeType.rect, { x:0, y:0, w:W, h:H, fill:{color:NAVY} });
  // ghost number
  s.addText(String(idx+1).padStart(2,"0"), { x:W-5.6, y:-0.5, w:5.4, h:H+1, fontFace:SERIF_BLK, fontSize:300, color:NAVY2, align:"right", valign:"middle", margin:0 });
  s.addImage({ path:A+"igc_white.png", x:W-0.55-0.62, y:0.34, w:0.62, h:0.62*(778/900) });
  s.addText("EXECUTIVE SUMMARY", { x:M, y:1.4, w:8, h:0.3, fontFace:SANS_SB, fontSize:11, color:ORANGE, charSpacing:3 });
  // nav list
  let y = 2.5;
  SECTIONS.forEach((sec, i)=>{
    const active = i===idx;
    if (active){
      s.addShape(p.ShapeType.roundRect, { x:M-0.14, y:y-0.12, w:6.6, h:0.72, rectRadius:0.08, fill:{color:ORANGE}, line:{type:"none"} });
    }
    s.addText(String(i+1).padStart(2,"0"), { x:M, y:y-0.05, w:0.7, h:0.6, fontFace:SERIF_BLK, fontSize:22, color: active?WHITE:GRAY_L, valign:"middle", margin:0 });
    s.addText(sec, { x:M+0.75, y:y-0.05, w:5.6, h:0.6, fontFace: active?SERIF_SB:SERIF, fontSize:21, color: active?WHITE:"AEB7C4", valign:"middle", margin:0 });
    y += 0.92;
  });
  // Mobi logo bottom-left
  s.addImage({ path:A+"mobi_logo_black.png", x:M, y:H-1.05, w:1.7, h:1.7*(246/768) });
}

// ============================================================ SLIDE 1 — COVER
(() => {
  const s = p.addSlide(); bg(s, NAVY);
  s.addImage({ path:A+"cover_buses.jpeg", x:0, y:0, w:W, h:H, sizing:{type:"cover", w:W, h:H} });
  // dark gradient overlay via stacked translucent rects (left-heavy)
  s.addShape(p.ShapeType.rect, { x:0, y:0, w:W, h:H, fill:{color:INK, transparency:38} });
  s.addShape(p.ShapeType.rect, { x:0, y:0, w:6.6, h:H, fill:{color:INK, transparency:14} });
  s.addShape(p.ShapeType.rect, { x:0, y:H-2.6, w:W, h:2.6, fill:{color:INK, transparency:30} });
  s.addImage({ path:A+"igc_white.png", x:W-0.6-0.72, y:0.5, w:0.72, h:0.72*(778/900) });
  s.addText("PROJECT", { x:M, y:2.35, w:8, h:0.4, fontFace:SANS_SB, fontSize:15, color:"E6EAF0", charSpacing:8 });
  s.addText("Compass", { x:M-0.04, y:2.68, w:9, h:1.3, fontFace:SERIF_BLK, fontSize:66, color:WHITE, margin:0 });
  s.addShape(p.ShapeType.rect, { x:M+0.02, y:4.06, w:0.9, h:0.05, fill:{color:ORANGE} });
  s.addText("Confidential Information Memorandum", { x:M, y:4.2, w:9, h:0.5, fontFace:SANS, fontSize:16, color:"E6EAF0" });
  // Mobi logo bottom-left
  s.addImage({ path:A+"mobi_logo_black.png", x:M, y:H-1.15, w:2.1, h:2.1*(246/768) });
  s.addText("August 2026", { x:W-3.1, y:H-0.62, w:2.55, h:0.3, fontFace:SANS_M, fontSize:11, color:"D6DCE5", align:"right" });
})();

// ============================================================ SLIDE 2 — DISCLAIMER
(() => {
  const s = p.addSlide(); bg(s, NAVY);
  s.addImage({ path:A+"igc_white.png", x:W-0.55-0.6, y:0.34, w:0.6, h:0.6*(778/900) });
  s.addText("Disclaimer", { x:M, y:0.5, w:8, h:0.6, fontFace:SERIF_SB, fontSize:26, color:WHITE });
  s.addText("Project Compass", { x:M, y:1.08, w:8, h:0.35, fontFace:SANS_M, fontSize:12, color:ORANGE });
  const disc = [
    "IGC has been retained by MOBI (“Company”; “Mobi”), on an exclusive basis, to advise the Company in its M&A process (“Transaction”). This material (“Information Memorandum”) describes and summarizes the Company, its assets, market and economic and financial indicators and has been prepared exclusively to assist the recipient in deciding whether it wishes to proceed with a further investigation of a possible Transaction with the Company. In no event shall the recipient use any of this information for any commercial purposes or for purposes other than the one for which this memorandum is furnished.",
    "All information contained in this Information Memorandum has been prepared based on documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or independent research. IGC has not investigated, verified or audited the documents and information used for the preparation of this Information Memorandum. This Information Memorandum contains statements, estimates and projections provided by the Client concerning anticipated future performance, which may or may not prove to be correct. No representations, expressed or implied, are made as to the accuracy of such statements, estimates and projections.",
    "This Memorandum of Information is not intended to form any part of the basis of any investment decision and should not be considered as a recommendation by the Company or IGC to any reader. Each reader must make its own valuation of the Transaction in order to determine whether to continue with its participation in the process. No liability is or shall be attributed to the members of IGC, including its partners, directors or employees, in connection with the accuracy or completeness of the information contained herein.",
    "This material belongs to IGC and shall not be copied, reproduced, distributed and/or disclosed, in whole or in part, including by digital media, to any third party without the express and prior written consent of IGC. By accepting this material, the recipient agrees to return it as soon as requested by IGC and to maintain in strict confidentiality all information contained herein. Since the existence of the Transaction is not publicly disclosed, the recipient agrees not to approach or contact any officer, employee, client, supplier or representative of the Company without the express written permission of IGC.",
  ];
  s.addText(disc.map((t,i)=>({ text:t, options:{ breakLine:true, paraSpaceAfter:6 } })),
    { x:M, y:1.62, w:7.55, h:5.4, fontFace:SANS, fontSize:8.4, color:"C4CCD6", align:"justify", valign:"top", lineSpacingMultiple:1.02 });
  // contact panel
  const px = 8.55, pw = W-px-M;
  s.addShape(p.ShapeType.roundRect, { x:px, y:1.62, w:pw, h:5.02, rectRadius:0.1, fill:{color:NAVY2}, line:{type:"none"} });
  s.addText("All communications, questions and/or requests regarding this material shall be addressed directly to IGC.",
    { x:px+0.35, y:1.95, w:pw-0.7, h:0.9, fontFace:SANS, fontSize:10.5, color:"D6DCE5", valign:"top", lineSpacingMultiple:1.05 });
  s.addShape(p.ShapeType.line, { x:px+0.35, y:3.0, w:pw-0.7, h:0, line:{color:"49597A", width:1} });
  s.addText("Bruno Iervolino", { x:px+0.35, y:3.15, w:pw-0.7, h:0.35, fontFace:SERIF_SB, fontSize:15, color:WHITE });
  s.addText([
    {text:"Av. Brigadeiro Faria Lima, 2277 – 6th floor", options:{breakLine:true}},
    {text:"Zip Code 01452-000 – São Paulo, SP", options:{breakLine:true}},
    {text:"Tel: (55 11) 3815-3533", options:{breakLine:true}},
    {text:"bruno.iervolino@igcp.com.br", options:{color:ORANGE}},
  ], { x:px+0.35, y:3.55, w:pw-0.7, h:1.7, fontFace:SANS, fontSize:10.5, color:"C4CCD6", valign:"top", lineSpacingMultiple:1.25 });
  s.addImage({ path:A+"igc_white.png", x:px+0.35, y:5.7, w:0.7, h:0.7*(778/900) });
})();

// ============================================================ SLIDE 3 — EXECUTIVE SUMMARY / TOC
(() => {
  const s = p.addSlide(); bg(s, NAVY);
  s.addShape(p.ShapeType.rect, { x:0, y:0, w:W, h:H, fill:{color:NAVY} });
  // large ghost Mobi mark right (fully within right margin)
  s.addText("Compass", { x:4.6, y:4.75, w:W-0.35-4.6, h:1.9, fontFace:SERIF_BLK, fontSize:62, color:NAVY2, align:"right", valign:"middle", margin:0 });
  s.addImage({ path:A+"igc_white.png", x:W-0.55-0.62, y:0.34, w:0.62, h:0.62*(778/900) });
  s.addText("Executive Summary", { x:M, y:0.85, w:8, h:0.8, fontFace:SERIF_SB, fontSize:34, color:WHITE });
  s.addShape(p.ShapeType.rect, { x:M+0.02, y:1.7, w:0.9, h:0.05, fill:{color:ORANGE} });
  let y = 2.5;
  const desc = [
    "Company snapshot, market context and the platform at a glance",
    "Value drivers underpinning Mobi’s growth and resilience",
    "Fleet, footprint, technology, clients, history and structure",
    "Revenue, profitability and cash-generation profile",
  ];
  SECTIONS.forEach((sec,i)=>{
    s.addText(String(i+1).padStart(2,"0"), { x:M, y:y, w:0.9, h:0.7, fontFace:SERIF_BLK, fontSize:30, color:ORANGE, valign:"middle", margin:0 });
    s.addText(sec, { x:M+1.0, y:y-0.02, w:6.6, h:0.42, fontFace:SERIF_SB, fontSize:19, color:WHITE, valign:"middle", margin:0 });
    s.addText(desc[i], { x:M+1.02, y:y+0.38, w:6.8, h:0.35, fontFace:SANS, fontSize:10.5, color:"AEB7C4", valign:"top", margin:0 });
    if (i<3) s.addShape(p.ShapeType.line, { x:M+1.0, y:y+0.82, w:6.6, h:0, line:{color:NAVY2, width:1} });
    y += 1.05;
  });
  s.addImage({ path:A+"mobi_logo_black.png", x:M, y:H-0.95, w:1.5, h:1.5*(246/768) });
})();

// ============================================================ SLIDE 4 — DIVIDER 01
(() => { divider(p.addSlide(), 0); })();

// ============================================================ SLIDE 5 — MOBI AT A GLANCE
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Introduction", title:"Mobi at a glance",
    subtitle:"A leading platform in corporate employee transportation (fretamento), reaching ~BRL 140 Mn of net revenue in 2025",
    source:"Source: Company; Jan-2026 fleet register. (1) Owned assets; avg fleet age of 4 years per Company materials vs. ~6 years per chassis manufacture year – to reconcile. (2) Owned assets. (3) To be confirmed with Company.",
    page:5 });
  // LEFT: highlight rows
  const rows = [
    ["award", "+20 years of experience", "One of the leading platforms in corporate mobility, serving industrial, agribusiness and consumer-goods clients across the Midwest and Southeast of Brazil"],
    ["contract", "Recurring, blue-chip portfolio", "A strong base of long-term recurring-revenue contracts with blue-chip clients, reflecting trusted, long-standing partnerships"],
    ["truck", "Modern, fully-owned fleet", "373 vehicles with an average age of ~6 years¹, spanning buses, micro-buses and vans for a flexible, tailored service offering"],
    ["shield", "Reliable, technology-enabled ops", "GPS-based telemetry and driver-monitoring systems, with in-house maintenance capabilities [to be confirmed], ensuring high performance"],
  ];
  let y = 2.0;
  rows.forEach(([icon,h,d])=>{
    chip(s, M, y, 0.62, icon, {fill:PAPER, color:"orange"});
    s.addText(h, { x:M+0.82, y:y-0.04, w:4.9, h:0.32, fontFace:SANS_SB, fontSize:12.5, color:NAVY, valign:"top", margin:0 });
    s.addText(d, { x:M+0.82, y:y+0.28, w:4.95, h:0.9, fontFace:SANS, fontSize:9.6, color:GRAY, valign:"top", margin:0, lineSpacingMultiple:1.02 });
    y += 1.22;
  });
  // RIGHT top: gross revenue chart
  const rx = 6.95, rw = W-rx-M;
  card(s, rx, 2.0, rw, 2.55, {});
  s.addText("Gross revenue by entity — 1Q25 vs. 1Q26", { x:rx+0.28, y:2.16, w:rw-1.6, h:0.3, fontFace:SANS_SB, fontSize:11, color:NAVY, margin:0 });
  s.addText("BRL Mn", { x:rx+0.28, y:2.44, w:2, h:0.24, fontFace:SANS, fontSize:8.5, color:GRAY, margin:0 });
  s.addShape(p.ShapeType.roundRect, { x:rx+rw-1.55, y:2.14, w:1.3, h:0.42, rectRadius:0.06, fill:{color:"FDE7DD"}, line:{type:"none"} });
  s.addText("+41.3% YoY", { x:rx+rw-1.55, y:2.14, w:1.3, h:0.42, fontFace:SANS_SB, fontSize:10.5, color:ORANGE_D, align:"center", valign:"middle", margin:0 });
  s.addChart(p.ChartType.bar, [
    { name:"1Q25", labels:["AGM Caetano","AGM Alpha"], values:[26.62,4.16] },
    { name:"1Q26", labels:["AGM Caetano","AGM Alpha"], values:[36.22,7.25] },
  ], { x:rx+0.15, y:2.7, w:rw-0.3, h:1.75, barDir:"col", barGrouping:"clustered",
       chartColors:[NAVY2, ORANGE], showLegend:true, legendPos:"b", legendFontFace:SANS, legendFontSize:9, legendColor:GRAY,
       showValue:true, dataLabelFontFace:SANS_SB, dataLabelFontSize:9, dataLabelColor:NAVY, dataLabelPosition:"outEnd", dataLabelFormatCode:"0.0",
       catAxisLabelFontFace:SANS_M, catAxisLabelFontSize:9.5, catAxisLabelColor:TXT, catGridLine:{style:"none"},
       valAxisHidden:true, valGridLine:{style:"none"}, valAxisMaxVal:44, barGapWidthPct:60, chartColorsOpacity:100 });
  // RIGHT bottom: 4 stat tiles (Highlights)
  s.addText("HIGHLIGHTS", { x:rx, y:4.72, w:4, h:0.26, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:2 });
  const tiles = [
    ["~BRL 140 Mn", "Net revenue 2025"],
    ["~BRL 36 Mn", "EBITDA 2025 (~26% margin)"],
    ["~BRL 198 Mn", "Fleet value²"],
    ["373", "Vehicles · 100% owned"],
  ];
  const tw = (rw-0.3)/2, th = 0.98;
  tiles.forEach((t,i)=>{
    const tx = rx + (i%2)*(tw+0.3), ty = 5.06 + Math.floor(i/2)*(th+0.18);
    card(s, tx, ty, tw, th, {fill:PAPER, line:LINE, shadow:false});
    s.addText(t[0], { x:tx+0.22, y:ty+0.12, w:tw-0.4, h:0.44, fontFace:SERIF_BLK, fontSize:19, color:ORANGE, margin:0, valign:"middle" });
    s.addText(t[1], { x:tx+0.22, y:ty+0.56, w:tw-0.4, h:0.34, fontFace:SANS, fontSize:9, color:GRAY, margin:0, valign:"top" });
  });
})();

// ============================================================ SLIDE 6 — DIVIDER 02
(() => { divider(p.addSlide(), 1); })();

// ============================================================ SLIDE 7 — INVESTMENT THESIS
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Investment Thesis", title:"Mobi is well positioned for continued growth",
    subtitle:"A resilient, contracted business model supported by strong structural value drivers",
    source:"Source: Company; press research. NR-31 refers to Brazilian rural-labor safety regulation on worker transport.", page:7 });
  const pil = [
    ["Exposure to a large, structurally growing market", "Structural demand for corporate employee transportation is driven by clients’ operational needs, a national shortage of professional drivers, and labor regulations (NR-31) requiring compliant transport where public transit is inadequate."],
    ["Solid, contracted revenue model with high stickiness", "Long-term contracts (3–5 years) with built-in annual adjustment mechanisms (IPCA, collective-bargaining agreements and diesel-price pass-through) protect margins and reinforce client retention."],
    ["An asset base that compounds competitive advantage", "A modern, fully-owned fleet of 373 vehicles across buses, micro-buses and vans creates operational flexibility, service-quality control and barriers that are hard for competitors to replicate."],
    ["Integrated capabilities that deliver a full-service edge", "GPS-based telemetry and driver-monitoring systems — combined with in-house maintenance capabilities [to be confirmed] — position Mobi as a reliable, high-uptime operator across its network of bases."],
    ["Multiple, executable growth avenues", "Geographic expansion, fleet electrification, technology-enabled services and consolidation of a fragmented market create a clear and executable path for continued value creation."],
  ];
  const colW = (W-2*M-0.4)/2;
  const icons = ["trendup","repeat","truck","shield","target"];
  // layout: 3 left, 2 right
  const positions = [[M,2.0],[M,3.75],[M,5.5],[M+colW+0.4,2.0],[M+colW+0.4,3.75]];
  pil.forEach((pr,i)=>{
    if (i>=4){ // 5th spans wider on right lower — place at right col row3
      positions[i] = [M+colW+0.4, 5.5];
    }
    const [x,y] = positions[i];
    const h = 1.6;
    card(s, x, y, colW, h, {});
    s.addText(String(i+1).padStart(2,"0"), { x:x+0.22, y:y+0.18, w:0.95, h:0.9, fontFace:SERIF_BLK, fontSize:40, color:"E9DCC9", valign:"top", margin:0 });
    s.addImage({ path:ic(icons[i],"orange"), x:x+0.28, y:y+1.02, w:0.34, h:0.34 });
    s.addText(pr[0], { x:x+1.15, y:y+0.2, w:colW-1.35, h:0.5, fontFace:SANS_SB, fontSize:12, color:NAVY, valign:"top", margin:0, lineSpacingMultiple:0.98 });
    s.addText(pr[1], { x:x+1.15, y:y+0.66, w:colW-1.35, h:0.85, fontFace:SANS, fontSize:9, color:GRAY, valign:"top", margin:0, lineSpacingMultiple:1.0 });
  });
})();

// ============================================================ SLIDE 8 — TRACK RECORD
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Investment Thesis", title:"A solid track record with blue-chip clients",
    subtitle:"Mobi has consistently focused on long-term contracts across industrial, agribusiness and consumer-goods sectors",
    source:"Source: Company. Client relationship metrics (contracts delivered, years, share of revenue) to be confirmed with management.", page:8 });
  // client logo grid
  s.addText("SELECTED CLIENTS", { x:M, y:2.0, w:5, h:0.26, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:2 });
  const clients = ["cli_votorantim","cli_cargill","cli_jbs","cli_kraftheinz","cli_mbrf","cli_heineken"];
  const gx=M, gy=2.42, gw=7.5, gh=3.55, cols=2, rows=3;
  const cw=(gw-0.3)/cols, chh=(gh-0.4)/rows;
  clients.forEach((c,i)=>{
    const x=gx+(i%cols)*(cw+0.3), y=gy+Math.floor(i/cols)*(chh+0.2);
    card(s, x, y, cw, chh, {fill:WHITE, line:LINE, shadow:false});
    s.addImage({ path:A+c+".png", x:x+0.35, y:y+chh*0.2, w:cw-0.7, h:chh*0.6, sizing:{type:"contain", w:cw-0.7, h:chh*0.6} });
  });
  // right: relationship stat cards + highlights bar
  const rx=8.4, rw=W-rx-M;
  const stats=[["Recurring","revenue contract model"],["3–5 years","average contract term"],["[XXX]","contracts executed"],["[XXX]","of contract backlog"]];
  s.addText("PORTFOLIO CHARACTERISTICS", { x:rx, y:2.0, w:rw, h:0.26, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:1.5 });
  let y=2.42;
  const sicons=["repeat","clock","contract","barchart"];
  stats.forEach((t,i)=>{
    card(s, rx, y, rw, 0.78, {fill:PAPER, line:LINE, shadow:false});
    chip(s, rx+0.16, y+0.14, 0.5, sicons[i], {fill:WHITE, color:"orange"});
    s.addText(t[0], { x:rx+0.8, y:y+0.1, w:rw-0.95, h:0.36, fontFace:SERIF_BLK, fontSize:16, color:NAVY, margin:0, valign:"middle" });
    s.addText(t[1], { x:rx+0.8, y:y+0.44, w:rw-0.95, h:0.28, fontFace:SANS, fontSize:9, color:GRAY, margin:0, valign:"top" });
    y+=0.9;
  });
})();

// ============================================================ SLIDE 9 — FLEET
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:"A modern, fully-owned fleet tailored to client needs",
    subtitle:"Fleet composition and leading chassis brands across a 373-vehicle base",
    source:"Source: Company; Jan-2026 fleet register. (1) Based on chassis manufacture year; Company materials cite 4 years – to reconcile. (2) 373 owned assets (100% of fleet). (3) Owned assets.", page:9 });
  // LEFT dark highlights panel
  const px=M, pw=3.1;
  s.addShape(p.ShapeType.roundRect, { x:px, y:2.0, w:pw, h:4.05, rectRadius:0.12, fill:{color:NAVY}, line:{type:"none"} });
  s.addText("HIGHLIGHTS", { x:px+0.3, y:2.22, w:pw-0.6, h:0.3, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:2 });
  const hl=[["~6 years","Average fleet age¹"],["373","Total fleet²"],["~BRL 198 Mn","Total equipment value³"],["100%","Owned fleet"]];
  let hy=2.62;
  hl.forEach((t,i)=>{
    s.addText(t[0], { x:px+0.3, y:hy, w:pw-0.6, h:0.44, fontFace:SERIF_BLK, fontSize:23, color:WHITE, margin:0, valign:"bottom" });
    s.addText(t[1], { x:px+0.3, y:hy+0.46, w:pw-0.6, h:0.3, fontFace:SANS, fontSize:9.5, color:"AEB7C4", margin:0, valign:"top" });
    if(i<3) s.addShape(p.ShapeType.line, { x:px+0.3, y:hy+0.82, w:pw-0.6, h:0, line:{color:NAVY2,width:1} });
    hy+=0.86;
  });
  // MIDDLE fleet composition
  const mx=3.95, mw=4.35;
  s.addText("FLEET COMPOSITION", { x:mx, y:2.0, w:mw, h:0.26, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:1.5 });
  const comp=[["Bus","223","truck"],["Micro-bus","74","truck"],["Van","55","truck"],["Support vehicle","17","tool"],["Truck","2","truck"],["Pickup truck","2","truck"]];
  const maxv=223;
  let cy=2.44;
  comp.forEach(([name,val,icon])=>{
    s.addText(name, { x:mx, y:cy, w:2.0, h:0.3, fontFace:SANS_M, fontSize:10.5, color:TXT, valign:"middle", margin:0 });
    s.addText(val+" un.", { x:mx+mw-1.0, y:cy, w:1.0, h:0.3, fontFace:SANS_SB, fontSize:10.5, color:NAVY, align:"right", valign:"middle", margin:0 });
    const barY=cy+0.32, barMax=mw;
    s.addShape(p.ShapeType.roundRect, { x:mx, y:barY, w:barMax, h:0.14, rectRadius:0.07, fill:{color:CARD}, line:{type:"none"} });
    s.addShape(p.ShapeType.roundRect, { x:mx, y:barY, w:Math.max(0.16,barMax*(parseInt(val)/maxv)), h:0.14, rectRadius:0.07, fill:{color:ORANGE}, line:{type:"none"} });
    cy+=0.6;
  });
  // photo top-right
  const rx=8.55, rw=W-rx-M;
  s.addImage({ path:A+"mobi_microbus.png", x:rx, y:2.0, w:rw, h:1.85, rounding:true, sizing:{type:"cover", w:rw, h:1.85} });
  // chassis brand logos grid
  s.addText("LEADING CHASSIS & EQUIPMENT BRANDS", { x:rx, y:3.98, w:rw, h:0.26, fontFace:SANS_SB, fontSize:9, color:ORANGE, charSpacing:1 });
  const brands=["br_mercedes","br_volvo","br_scania","br_ford","br_hyundai","br_cat","br_komatsu","br_liebherr"];
  const bx=rx, by=4.3, bcols=2, bw=(rw-0.2)/bcols, bh=0.5;
  brands.forEach((b,i)=>{
    const x=bx+(i%bcols)*(bw+0.2), y=by+Math.floor(i/bcols)*(bh+0.12);
    card(s, x, y, bw, bh, {fill:WHITE, line:LINE, shadow:false, radius:0.06});
    s.addImage({ path:A+b+".png", x:x+0.18, y:y+0.08, w:bw-0.36, h:bh-0.16, sizing:{type:"contain", w:bw-0.36, h:bh-0.16} });
  });
})();

// ============================================================ SLIDE 10 — FOOTPRINT
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:"Strategically positioned across the Midwest and Southeast",
    subtitle:"From its Goiânia headquarters to 10 operational bases across Goiás, the Federal District and Minas Gerais",
    source:"Source: Company; Jan-2026 fleet register.", page:10 });
  // map left
  const mapH=4.0, mapW=mapH*(2000/1878);
  s.addImage({ path:A+"brazil_map.png", x:M-0.1, y:2.15, w:mapW, h:mapH });
  // legend
  s.addShape(p.ShapeType.rect, { x:M+0.2, y:6.25, w:0.18, h:0.18, fill:{color:ORANGE} });
  s.addText("States with operational bases", { x:M+0.45, y:6.18, w:3.6, h:0.32, fontFace:SANS, fontSize:9, color:GRAY, valign:"middle", margin:0 });
  // right: HQ + bases
  const rx=5.4, rw=W-rx-M;
  card(s, rx, 2.0, rw, 1.02, {fill:NAVY, line:null, shadow:true});
  chip(s, rx+0.26, 2.2, 0.56, "home", {fill:NAVY2, color:"orange"});
  s.addText("Headquarters — Goiânia, GO", { x:rx+1.0, y:2.14, w:rw-1.25, h:0.32, fontFace:SANS_SB, fontSize:13, color:WHITE, margin:0, valign:"top" });
  s.addText("Corporate HQ (Garagem Central) centralizing fleet management, monitoring infrastructure and administrative functions", { x:rx+1.0, y:2.46, w:rw-1.25, h:0.5, fontFace:SANS, fontSize:9.2, color:"C4CCD6", margin:0, valign:"top", lineSpacingMultiple:1.0 });
  s.addText("10 ACTIVE OPERATIONAL BASES", { x:rx, y:3.14, w:rw, h:0.26, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:1.5 });
  const bases=[["Anápolis – GO","Largest base outside HQ, supporting fleet availability across the Goiás corridor"],
    ["Brasília – DF","Garagem BSB supporting operations across the Federal District"],
    ["Senador Canedo – GO","Support base close to client sites, enabling faster response times"],
    ["Uberlândia – MG","Serving the Triângulo Mineiro region with strong execution oversight"]];
  let by=3.44;
  bases.forEach(([n,d])=>{
    chip(s, rx, by+0.02, 0.42, "mappin", {fill:PAPER, color:"orange"});
    s.addText(n, { x:rx+0.6, y:by-0.04, w:rw-0.6, h:0.3, fontFace:SANS_SB, fontSize:11, color:NAVY, margin:0, valign:"top" });
    s.addText(d, { x:rx+0.6, y:by+0.26, w:rw-0.6, h:0.36, fontFace:SANS, fontSize:8.8, color:GRAY, margin:0, valign:"top", lineSpacingMultiple:0.98 });
    by+=0.68;
  });
  // stat bar bottom
  const sb=[["1","Headquarters"],["10","Operational bases"],["3","States covered"],["373","Vehicles deployed"]];
  const sy=6.35, sw=(W-2*M)/4;
  sb.forEach((t,i)=>{
    const x=M+i*sw;
    if(i>0) s.addShape(p.ShapeType.line, { x:x, y:sy+0.05, w:0, h:0.55, line:{color:LINE,width:1} });
    s.addText(t[0], { x:x+0.2, y:sy, w:sw-0.3, h:0.42, fontFace:SERIF_BLK, fontSize:22, color:ORANGE, margin:0, valign:"bottom" });
    s.addText(t[1], { x:x+0.2, y:sy+0.44, w:sw-0.3, h:0.26, fontFace:SANS, fontSize:9, color:GRAY, margin:0, valign:"top" });
  });
})();

// ============================================================ SLIDE 11 — TECHNOLOGY
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:"Technology-enabled operations support high reliability",
    subtitle:"GPS-based telemetry, driver monitoring and operational discipline keep the fleet running reliably",
    source:"Source: Company. Availability and preventive-maintenance metrics, and scope of in-house maintenance, to be confirmed with management.", page:11 });
  const groups=[
    ["GPS TELEMETRY & DRIVER MONITORING", ["sw_ituran","sw_vtraxx"], "activity", "GPS-based tracking and AI-powered driver-fatigue monitoring provide continuous oversight of fleet and drivers across all bases"],
    ["ERP & MANAGEMENT", ["sw_totvs"], "cpu", "TOTVS Protheus underpins enterprise resource planning and back-office control"],
    ["FLEET & MAINTENANCE MANAGEMENT", ["sw_truckscontrol","sw_zion","sw_opensystem","sw_monaco"], "tool", "Specialized systems manage maintenance workflows, parts and fleet operations"],
    ["SAFETY, PPE & INSPECTION", ["sw_sisma","sw_onsafety","sw_checklistfacil"], "shield", "Digital checklists, PPE control and safety management reinforce operational discipline"],
  ];
  const gx=M, gw=(W-2*M-0.4)/2;
  const pos=[[M,2.05],[M+gw+0.4,2.05],[M,4.15],[M+gw+0.4,4.15]];
  groups.forEach((g,i)=>{
    const [x,y]=pos[i]; const h=1.9;
    card(s, x, y, gw, h, {});
    chip(s, x+0.24, y+0.22, 0.5, g[2], {fill:PAPER, color:"orange"});
    s.addText(g[0], { x:x+0.86, y:y+0.26, w:gw-1.05, h:0.42, fontFace:SANS_SB, fontSize:10.5, color:NAVY, charSpacing:0.5, valign:"middle", margin:0, lineSpacingMultiple:0.95 });
    s.addText(g[3], { x:x+0.24, y:y+0.82, w:gw-0.48, h:0.5, fontFace:SANS, fontSize:8.8, color:GRAY, valign:"top", margin:0, lineSpacingMultiple:1.0 });
    // logo row — capped cell width, centered group (avoids single-logo stretch)
    const logos=g[1]; const nlg=logos.length;
    const gapL=0.18, maxCell=1.35;
    const cellW=Math.min(maxCell,(gw-0.48-gapL*(nlg-1))/nlg);
    const totalW=cellW*nlg+gapL*(nlg-1);
    const startX=x+(gw-totalW)/2;
    logos.forEach((lg,j)=>{
      const lx=startX+j*(cellW+gapL);
      s.addImage({ path:A+lg+".png", x:lx, y:y+1.36, w:cellW, h:0.42, sizing:{type:"contain", w:cellW, h:0.42} });
    });
  });
})();

// ============================================================ SLIDE 12 — GROWTH AVENUES
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Investment Thesis", title:"Multiple avenues for continued value creation",
    subtitle:"Geographic expansion, consolidation and fleet electrification position Mobi for a sustained growth trajectory",
    source:"Source: Company; press research. Growth avenues to be validated with management.", page:12 });
  const av=[
    ["A","Deepen wallet share & expand geographically","mappin",
      ["Well positioned to grow share with existing clients while winning new logos","Expansion within the Goiás–DF–Minas Gerais corridor and selectively into adjacent regions leverages existing bases and relationships"]],
    ["B","Fleet electrification & tech-enabled services","zap",
      ["Gradual electrification responds to clients’ ESG and Scope-3 commitments","A technology layer (route optimization, booking apps, carbon dashboards) can further strengthen client stickiness"]],
    ["C","Consolidate a fragmented market","layers",
      ["The Brazilian corporate-transportation market remains highly fragmented, with consolidation already underway","Mobi’s scale and track record position it as a natural consolidation platform for smaller regional operators"]],
  ];
  const cw=(W-2*M-0.8)/3;
  av.forEach((a,i)=>{
    const x=M+i*(cw+0.4), y=2.15, h=4.15;
    card(s, x, y, cw, h, {});
    // header band
    s.addShape(p.ShapeType.roundRect, { x:x, y:y, w:cw, h:1.15, rectRadius:0.1, fill:{color:NAVY}, line:{type:"none"} });
    s.addShape(p.ShapeType.rect, { x:x, y:y+0.6, w:cw, h:0.55, fill:{color:NAVY} });
    s.addShape(p.ShapeType.ellipse, { x:x+0.28, y:y+0.28, w:0.6, h:0.6, fill:{color:ORANGE}, line:{type:"none"} });
    s.addText(a[0], { x:x+0.28, y:y+0.28, w:0.6, h:0.6, fontFace:SERIF_BLK, fontSize:22, color:WHITE, align:"center", valign:"middle", margin:0 });
    s.addImage({ path:ic(a[2],"white"), x:x+cw-0.86, y:y+0.36, w:0.44, h:0.44 });
    s.addText(a[1], { x:x+0.28, y:y+1.32, w:cw-0.56, h:0.85, fontFace:SANS_SB, fontSize:13, color:NAVY, valign:"top", margin:0, lineSpacingMultiple:1.0 });
    let ly=y+2.25;
    a[3].forEach(pt=>{
      s.addShape(p.ShapeType.ellipse, { x:x+0.3, y:ly+0.07, w:0.1, h:0.1, fill:{color:ORANGE}, line:{type:"none"} });
      s.addText(pt, { x:x+0.52, y:ly-0.04, w:cw-0.78, h:0.85, fontFace:SANS, fontSize:9.3, color:GRAY, valign:"top", margin:0, lineSpacingMultiple:1.02 });
      ly+=0.98;
    });
  });
})();

// ============================================================ SLIDE 13 — DIVIDER 03
(() => { divider(p.addSlide(), 2); })();

// ============================================================ SLIDE 14 — TIMELINE
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:"A track record built over more than 20 years",
    subtitle:"Mobi has +20 years of experience in corporate employee transportation",
    source:"Source: Company. Foundation year, milestone dates and revenue evolution to be confirmed with management.", page:14 });
  // timeline rail
  const railY=3.15, x0=M+0.2, x1=W-M-0.2;
  s.addShape(p.ShapeType.line, { x:x0, y:railY, w:x1-x0, h:0, line:{color:LINE, width:2} });
  const nodes=[["Foundation","[Year TBC]"],["[Milestone]","[Year]"],["[Milestone]","[Year]"],["[Milestone]","[Year]"],["[Milestone]","2025"],["Positioned for growth","2026E"]];
  const n=nodes.length, gap=(x1-x0)/(n-1);
  nodes.forEach((nd,i)=>{
    const cx=x0+i*gap; const last=i===n-1;
    s.addShape(p.ShapeType.ellipse, { x:cx-0.1, y:railY-0.1, w:0.2, h:0.2, fill:{color:last?ORANGE:NAVY}, line:{color:WHITE, width:2} });
    const up=i%2===0;
    // consistent order everywhere: YEAR (bold) then MILESTONE (gray) reading toward the rail
    const yYear = up ? railY-0.98 : railY+0.22;
    const yMile = up ? railY-0.64 : railY+0.54;
    s.addText(nd[1], { x:cx-1.0, y:yYear, w:2.0, h:0.3, fontFace:SANS_SB, fontSize:11, color:ORANGE, align:"center", margin:0 });
    s.addText(nd[0], { x:cx-1.0, y:yMile, w:2.0, h:0.42, fontFace:SANS, fontSize:9, color:GRAY, align:"center", valign:"top", margin:0, lineSpacingMultiple:0.95 });
  });
  // revenue chart area
  card(s, M, 4.35, W-2*M, 2.05, {fill:PAPER, line:LINE, shadow:false});
  s.addText("Gross revenue evolution  —  BRL Mn", { x:M+0.3, y:4.5, w:6, h:0.3, fontFace:SANS_SB, fontSize:11, color:NAVY, margin:0 });
  s.addShape(p.ShapeType.roundRect, { x:W-M-2.0, y:4.48, w:1.7, h:0.4, rectRadius:0.06, fill:{color:"E9EDF2"}, line:{type:"none"} });
  s.addText("CAGR  [XX]%", { x:W-M-2.0, y:4.48, w:1.7, h:0.4, fontFace:SANS_SB, fontSize:10.5, color:GRAY, align:"center", valign:"middle", margin:0 });
  s.addText("Revenue history and projection pending Company data", { x:M+0.3, y:5.4, w:W-2*M-0.6, h:0.5, fontFace:SANS, fontSize:11, color:GRAY_L, align:"center", italic:true, valign:"middle" });
})();

// ============================================================ SLIDE 15 — KEY MANAGEMENT
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:"An experienced and committed management team",
    subtitle:"Management team overview — names, roles and backgrounds to be confirmed with the Company",
    source:"Source: Company. Roles and backgrounds to be confirmed with management.", page:15 });
  const team=[["Antônio Gabriel","AG"],["Morgana","M"],["Pedro","P"],["Gabriela","G"],["[Name TBC]","?"]];
  const n=team.length, gw=(W-2*M-(n-1)*0.4)/n;
  team.forEach((t,i)=>{
    const x=M+i*(gw+0.4), y=2.2, h=3.9;
    card(s, x, y, gw, h, {});
    s.addShape(p.ShapeType.ellipse, { x:x+gw/2-0.7, y:y+0.35, w:1.4, h:1.4, fill:{color:NAVY}, line:{type:"none"} });
    s.addText(t[1], { x:x+gw/2-0.7, y:y+0.35, w:1.4, h:1.4, fontFace:SERIF_BLK, fontSize:34, color:WHITE, align:"center", valign:"middle", margin:0 });
    s.addText(t[0], { x:x+0.1, y:y+1.95, w:gw-0.2, h:0.35, fontFace:SANS_SB, fontSize:12.5, color:NAVY, align:"center", margin:0 });
    s.addText("[Role — TBC]", { x:x+0.1, y:y+2.3, w:gw-0.2, h:0.3, fontFace:SANS, fontSize:9.5, color:ORANGE, align:"center", margin:0 });
    s.addShape(p.ShapeType.line, { x:x+0.4, y:y+2.72, w:gw-0.8, h:0, line:{color:LINE, width:1} });
    s.addText("[Background — to be\nconfirmed with the\nCompany]", { x:x+0.25, y:y+2.85, w:gw-0.5, h:0.9, fontFace:SANS, fontSize:8.8, color:GRAY, align:"center", valign:"top", margin:0, lineSpacingMultiple:1.05 });
  });
})();

// ============================================================ SLIDE 16 — ORG CHART
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:"Organization & corporate structure",
    subtitle:"Mobi operates under a multi-entity structure (Grupo AGM Caetano / AGM Alpha) — simplified representation, to be confirmed",
    source:"Source: Company. Simplified representation; entities and ownership to be confirmed with management.", page:16 });
  const box=(x,y,w,h,txt,sub,{fill=WHITE,tc=NAVY,line=NAVY}={})=>{
    s.addShape(p.ShapeType.roundRect, { x,y,w,h, rectRadius:0.06, fill:{color:fill}, line:{color:line,width:1.25} });
    s.addText(txt, { x:x+0.1, y:sub?y+0.08:y, w:w-0.2, h:sub?0.32:h, fontFace:SANS_SB, fontSize:10.5, color:tc, align:"center", valign:sub?"top":"middle", margin:0 });
    if(sub) s.addText(sub, { x:x+0.1, y:y+0.36, w:w-0.2, h:h-0.4, fontFace:SANS, fontSize:8, color: fill===NAVY?"C4CCD6":GRAY, align:"center", valign:"top", margin:0 });
  };
  const conn=(x1,y1,x2,y2)=>s.addShape(p.ShapeType.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),line:{color:GRAY_L,width:1}});
  // shareholders
  box(W/2-1.6,2.05,3.2,0.55,"Family Shareholders",null,{fill:ORANGE,tc:WHITE,line:ORANGE});
  conn(W/2,2.6,W/2,2.95);
  // holding
  box(W/2-1.9,2.95,3.8,0.7,"AGM Caetano Participações","Holding company",{fill:NAVY,tc:WHITE,line:NAVY});
  // level 3 - three entities
  const l3=[["AGM Caetano LTDA","Operating entity"],["MOBI Alpha","Matriz Brasília"],["Moura e Carrilho Part.","[Related party]"]];
  const bw=3.5, tot=3*bw+2*0.55, sx=W/2-tot/2, ly=4.15;
  conn(W/2,3.65,W/2,3.9); s.addShape(p.ShapeType.line,{x:sx+bw/2,y:3.9,w:tot-bw,h:0,line:{color:GRAY_L,width:1}});
  l3.forEach((b,i)=>{ const x=sx+i*(bw+0.55); conn(x+bw/2,3.9,x+bw/2,ly); box(x,ly,bw,0.7,b[0],b[1]); });
  // filiais under first
  s.addText("OPERATIONAL BRANCHES (FILIAIS)", { x:M, y:5.35, w:6, h:0.26, fontFace:SANS_SB, fontSize:9.5, color:ORANGE, charSpacing:1 });
  const fil=["Goiânia","Anápolis","Nerópolis","Senador Canedo","Itumbiara","Alexânia","Uberlândia","Rio Verde","Pires do Rio"];
  const fcols=5, fw=(W-2*M-(fcols-1)*0.2)/fcols;
  fil.forEach((f,i)=>{ const x=M+(i%fcols)*(fw+0.2), y=5.68+Math.floor(i/fcols)*0.5;
    s.addShape(p.ShapeType.roundRect,{x,y,w:fw,h:0.4,rectRadius:0.05,fill:{color:PAPER},line:{color:LINE,width:1}});
    s.addText("Filial "+f,{x:x+0.05,y,w:fw-0.1,h:0.4,fontFace:SANS_M,fontSize:8.5,color:TXT,align:"center",valign:"middle",margin:0}); });
  // total fleet badge (top-right, clear of the filiais row)
  s.addShape(p.ShapeType.roundRect,{x:W-M-2.5,y:2.12,w:2.5,h:0.62,rectRadius:0.08,fill:{color:ORANGE},line:{type:"none"}});
  s.addText([{text:"Total fleet   ",options:{color:"FBE0D3",fontFace:SANS}},{text:"373",options:{color:WHITE,fontFace:SANS_SB,fontSize:14}}],{x:W-M-2.5,y:2.12,w:2.5,h:0.62,fontSize:11,align:"center",valign:"middle",margin:0});
})();

// ============================================================ SLIDES 17-19 — SUCCESS CASES
function successCase(page, client, logo, valLabel){
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Company Overview", title:`Success case: ${client}`,
    subtitle:"Long-term relationship example — details to be confirmed with the Company",
    source:"Source: Company — to be confirmed with management.", page });
  // client logo card
  card(s, M, 2.15, 3.0, 1.5, {fill:WHITE, line:LINE, shadow:true});
  s.addImage({ path:A+logo+".png", x:M+0.4, y:2.45, w:2.2, h:0.9, sizing:{type:"contain", w:2.2, h:0.9} });
  s.addText("[City — State]", { x:M, y:3.75, w:3.0, h:0.3, fontFace:SANS_M, fontSize:10, color:GRAY, align:"center" });
  // two stat blocks: start vs current
  const blocks=[["Start of contract","BRL [XXX]k","[X] months","[Service scope — TBC]"],["Current contract","BRL [XXX] Mn","[X] years","[Service scope — TBC]"]];
  const bx=3.75, bw=(W-bx-M-0.4)/2;
  blocks.forEach((b,i)=>{
    const x=bx+i*(bw+0.4), y=2.15, h=1.9;
    card(s, x, y, bw, h, {fill:i?NAVY:PAPER, line:i?null:LINE, shadow:i>0});
    const tc=i?WHITE:NAVY, sc=i?"C4CCD6":GRAY, ac=ORANGE;
    s.addText(b[0].toUpperCase(), { x:x+0.28, y:y+0.2, w:bw-0.56, h:0.3, fontFace:SANS_SB, fontSize:9.5, color:ac, charSpacing:1, margin:0 });
    s.addText(b[1], { x:x+0.28, y:y+0.55, w:(bw-0.56)/2, h:0.4, fontFace:SERIF_BLK, fontSize:19, color:tc, margin:0, valign:"middle" });
    s.addText("total value", { x:x+0.28, y:y+0.95, w:(bw-0.56)/2, h:0.25, fontFace:SANS, fontSize:8, color:sc, margin:0 });
    s.addText(b[2], { x:x+0.28+(bw-0.56)/2, y:y+0.55, w:(bw-0.56)/2, h:0.4, fontFace:SERIF_BLK, fontSize:19, color:tc, margin:0, valign:"middle" });
    s.addText("total term", { x:x+0.28+(bw-0.56)/2, y:y+0.95, w:(bw-0.56)/2, h:0.25, fontFace:SANS, fontSize:8, color:sc, margin:0 });
    s.addText(b[3], { x:x+0.28, y:y+1.32, w:bw-0.56, h:0.45, fontFace:SANS, fontSize:9, color:sc, margin:0, valign:"top" });
  });
  // timeline bottom
  s.addText("TIMELINE", { x:M, y:4.45, w:4, h:0.26, fontFace:SANS_SB, fontSize:10, color:ORANGE, charSpacing:1.5 });
  const railY=5.25, x0=M+0.3, x1=W-M-0.3;
  s.addShape(p.ShapeType.line, { x:x0, y:railY, w:x1-x0, h:0, line:{color:LINE, width:2} });
  const nn=4, gap=(x1-x0)/(nn-1);
  for(let i=0;i<nn;i++){ const cx=x0+i*gap;
    s.addShape(p.ShapeType.ellipse, { x:cx-0.09, y:railY-0.09, w:0.18, h:0.18, fill:{color:NAVY}, line:{color:WHITE,width:2} });
    s.addText("[Mon-YY]", { x:cx-0.9, y:railY-0.5, w:1.8, h:0.28, fontFace:SANS_SB, fontSize:9.5, color:NAVY, align:"center", margin:0 });
    s.addText("[Milestone — TBC]", { x:cx-0.9, y:railY+0.18, w:1.8, h:0.4, fontFace:SANS, fontSize:8.5, color:GRAY, align:"center", margin:0, valign:"top" });
  }
}
successCase(17, "Cargill operation", "cli_cargill");
successCase(18, "JBS operation", "cli_jbs");
successCase(19, "Votorantim Cimentos operation", "cli_votorantim");

// ============================================================ SLIDE 20 — DIVIDER 04
(() => { divider(p.addSlide(), 3); })();

// ============================================================ SLIDE 21 — FINANCIAL HIGHLIGHTS
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Financial Highlights", title:"Financial highlights",
    subtitle:"Solid profitability in 2025; full historical series and projections pending Company data",
    source:"Source: Company. 2025 figures are approximate and preliminary; historical series and projections to be confirmed with management.", page:21 });
  // 2025 known stats row
  const tiles=[["~BRL 140 Mn","Net revenue 2025",ORANGE],["~BRL 36 Mn","EBITDA 2025",ORANGE],["~26%","EBITDA margin 2025",ORANGE],["+41.3%","1Q gross revenue YoY",ORANGE]];
  const tw=(W-2*M-3*0.3)/4;
  tiles.forEach((t,i)=>{ const x=M+i*(tw+0.3), y=2.05, h=1.2;
    card(s, x, y, tw, h, {fill:PAPER, line:LINE, shadow:false});
    s.addText(t[0], { x:x+0.22, y:y+0.16, w:tw-0.44, h:0.5, fontFace:SERIF_BLK, fontSize:22, color:t[2], margin:0, valign:"middle" });
    s.addText(t[1], { x:x+0.22, y:y+0.72, w:tw-0.44, h:0.32, fontFace:SANS, fontSize:9.5, color:GRAY, margin:0, valign:"top" });
  });
  // chart placeholder (revenue & EBITDA) with 2025 anchored
  card(s, M, 3.5, W-2*M, 2.9, {fill:WHITE, line:LINE, shadow:true});
  s.addText("Net revenue & EBITDA evolution  —  BRL Mn", { x:M+0.3, y:3.66, w:8, h:0.3, fontFace:SANS_SB, fontSize:12, color:NAVY, margin:0 });
  // legend
  s.addShape(p.ShapeType.rect,{x:W-M-3.0,y:3.72,w:0.18,h:0.18,fill:{color:NAVY2}}); s.addText("Net revenue",{x:W-M-2.78,y:3.66,w:1.1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  s.addShape(p.ShapeType.rect,{x:W-M-1.6,y:3.72,w:0.18,h:0.18,fill:{color:ORANGE}}); s.addText("EBITDA",{x:W-M-1.38,y:3.66,w:1.1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  s.addChart(p.ChartType.bar, [
    { name:"Net revenue", labels:["2022","2023","2024","2025","2026E"], values:[null,null,null,140,null] },
    { name:"EBITDA", labels:["2022","2023","2024","2025","2026E"], values:[null,null,null,36,null] },
  ], { x:M+0.2, y:4.1, w:W-2*M-0.5, h:2.15, barDir:"col", barGrouping:"clustered",
       chartColors:[NAVY2, ORANGE], showLegend:false,
       showValue:true, dataLabelFontFace:SANS_SB, dataLabelFontSize:10, dataLabelColor:NAVY, dataLabelPosition:"outEnd",
       catAxisLabelFontFace:SANS_M, catAxisLabelFontSize:10, catAxisLabelColor:TXT, catGridLine:{style:"none"},
       valAxisHidden:true, valGridLine:{style:"none"}, valAxisMaxVal:170, barGapWidthPct:70 });
  s.addText("2022–2024 and 2026E\nfigures pending Company data", { x:M+0.55, y:4.75, w:3.6, h:0.7, fontFace:SANS, fontSize:10, color:GRAY_L, italic:true, align:"left", valign:"top", lineSpacingMultiple:1.05 });
})();

// ============================================================ SLIDE 22 — CASH & GROWTH VECTORS
(() => {
  const s = p.addSlide(); bg(s, WHITE);
  chrome(s, { eyebrow:"Financial Highlights", title:"Cash generation & value drivers",
    subtitle:"A capital-efficient, contracted model — detailed metrics to be confirmed with the Company",
    source:"Source: Company. Framework for discussion; all figures to be confirmed with management.", page:22 });
  const cards=[
    ["repeat","Contracted revenue base","Long-term contracts (3–5 years) with annual price adjustments (IPCA, CBA, diesel pass-through) provide strong revenue visibility and margin protection","[XXX] backlog"],
    ["dollar","Healthy profitability","~26% EBITDA margin in 2025, underpinned by scale, fleet ownership and operational discipline","~BRL 36 Mn EBITDA"],
    ["truck","Asset-backed balance sheet","A fully-owned fleet of 373 vehicles (~BRL 198 Mn value) supports financing flexibility and residual-value optionality","100% owned"],
    ["trendup","Reinvestment for growth","Capex directed at fleet renewal and expansion; capital-allocation profile to be detailed with management","Capex profile [TBC]"],
  ];
  const cw=(W-2*M-0.4)/2;
  cards.forEach((c,i)=>{ const x=M+(i%2)*(cw+0.4), y=2.15+Math.floor(i/2)*2.1, h=1.9;
    card(s, x, y, cw, h, {});
    chip(s, x+0.26, y+0.26, 0.62, c[0], {fill:PAPER, color:"orange"});
    s.addText(c[1], { x:x+1.05, y:y+0.28, w:cw-2.4, h:0.5, fontFace:SANS_SB, fontSize:13, color:NAVY, valign:"top", margin:0 });
    s.addShape(p.ShapeType.roundRect, { x:x+cw-1.35, y:y+0.28, w:1.1, h:0.42, rectRadius:0.06, fill:{color:"FDE7DD"}, line:{type:"none"} });
    s.addText(c[3], { x:x+cw-1.35, y:y+0.28, w:1.1, h:0.42, fontFace:SANS_SB, fontSize:8.5, color:ORANGE_D, align:"center", valign:"middle", margin:0 });
    s.addText(c[2], { x:x+0.28, y:y+1.02, w:cw-0.56, h:0.75, fontFace:SANS, fontSize:9.5, color:GRAY, valign:"top", margin:0, lineSpacingMultiple:1.02 });
  });
})();

// ============================================================ SLIDE 23 — BACK COVER
(() => {
  const s = p.addSlide(); bg(s, NAVY);
  s.addShape(p.ShapeType.rect, { x:0, y:0, w:W, h:H, fill:{color:NAVY} });
  s.addText("Compass", { x:4.6, y:0.35, w:W-0.35-4.6, h:1.6, fontFace:SERIF_BLK, fontSize:56, color:NAVY2, align:"right", valign:"middle", margin:0 });
  s.addImage({ path:A+"mobi_logo_black.png", x:M, y:0.7, w:2.2, h:2.2*(246/768) });
  s.addText("Deal team", { x:M, y:2.1, w:8, h:0.6, fontFace:SERIF_SB, fontSize:30, color:WHITE });
  s.addShape(p.ShapeType.rect, { x:M+0.02, y:2.95, w:0.9, h:0.05, fill:{color:ORANGE} });
  const team=[["Bruno Iervolino","bruno.iervolino@igcp.com.br","+55 11 3815-3533"],
              ["Gabriel Brito","gabriel.brito@igcp.com.br","+55 11 3815-3533"],
              ["[Team member — TBC]","[email — TBC]","+55 11 3815-3533"]];
  const cw=(W-2*M-2*0.4)/3;
  team.forEach((t,i)=>{ const x=M+i*(cw+0.4), y=3.4;
    s.addShape(p.ShapeType.roundRect, { x, y, w:cw, h:1.7, rectRadius:0.1, fill:{color:NAVY2}, line:{type:"none"} });
    s.addText(t[0], { x:x+0.3, y:y+0.28, w:cw-0.6, h:0.4, fontFace:SERIF_SB, fontSize:15, color:WHITE, margin:0 });
    s.addText(t[1], { x:x+0.3, y:y+0.78, w:cw-0.6, h:0.3, fontFace:SANS, fontSize:10, color:ORANGE, margin:0 });
    s.addText(t[2], { x:x+0.3, y:y+1.12, w:cw-0.6, h:0.3, fontFace:SANS, fontSize:10, color:"C4CCD6", margin:0 });
  });
  // address + igc
  s.addImage({ path:A+"igc_white.png", x:M, y:H-1.35, w:0.85, h:0.85*(778/900) });
  s.addText([
    {text:"Av. Brigadeiro Faria Lima, 2277 – 6th floor", options:{breakLine:true}},
    {text:"São Paulo, SP, Brazil – 01452-000", options:{breakLine:true}},
    {text:"+55 11 3815-3533", options:{}},
  ], { x:M+1.15, y:H-1.35, w:6, h:0.9, fontFace:SANS, fontSize:10.5, color:"C4CCD6", valign:"middle", lineSpacingMultiple:1.2 });
  s.addText("Confidential Information Memorandum", { x:W-5.0, y:H-0.7, w:4.45, h:0.3, fontFace:SANS_M, fontSize:10, color:GRAY_L, align:"right" });
})();

p.writeFile({ fileName:"Project_Compass_CIM.pptx" }).then(f=>console.log("WROTE", f));
