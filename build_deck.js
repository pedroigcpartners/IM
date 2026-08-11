// Project Compass — CIM (Mobi) v3 "brand-first".
// Mobi's own identity: orange #F35B1A (logo arrow) + graphite (livery) + white/silver.
// Hybrid aesthetic: dark brand-heavy covers/TOCs + white content slides.
// Layout synthesis from IGC references: Lox (dark TOC w/ arrows, orange timeline cards, DRE),
// Alquimia (dark at-a-glance panel, entity split, numbered title circles, conclusion bands),
// Biocap (rounded eyebrow tab), Biscoitê (clean charts, circular photos).
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
p.author = "IGC Partners";
p.title = "Project Compass — Confidential Information Memorandum";

// ---------- Mobi brand palette ----------
const ORANGE="F35B1A", ORANGE_D="C6470F", O_TINT="FDE9DE", O_TINT2="FBD9C6";
const GRAPH="141A24", G_PANEL="1F2734", G_LINE="344052".replace("2","2"), G_LINE2="323E50";
const CHART_D="2C3A4F", CHART_LT="D9DEE5";
const WHITE="FFFFFF", PAPER="F4F6F8", LINE="E2E6EB";
const TXT="2B333E", GRAY="6C7683", GRAY_L="9AA3AD", MUTE_ON_DARK="8B95A5";
const SANS="Poppins", SANS_M="Poppins Medium", SANS_SB="Poppins SemiBold", SANS_L="Poppins Light";

const W=13.333, H=7.5, M=0.6, A="assets/";
const MOBI_AR=246/768, IGC_AR=778/900;
const SECTIONS=[["Introduction","04"],["Investment Thesis","08"],["Company Overview","14"],["Financial Highlights","21"]];
const ic=(n,c)=>`${A}icons/${n}_${c}.png`;

// ---------- helpers ----------
const bg=(s,c)=>{ s.background={color:c}; };
function rect(s,x,y,w,h,c,transparency){ const o={x,y,w,h,fill:{color:c},line:{type:"none"}}; if(transparency) o.fill.transparency=transparency; s.addShape(p.ShapeType.rect,o); }
function rrect(s,x,y,w,h,c,{radius=0.1,line=null,shadow=false}={}){
  const o={x,y,w,h,rectRadius:radius,fill:{color:c},line:line?{color:line,width:1}:{type:"none"}};
  if(shadow) o.shadow={type:"outer",color:"9AA3AD",opacity:0.3,blur:8,offset:2,angle:90};
  s.addShape(p.ShapeType.roundRect,o);
}
// Mobi play-arrow marker (from the logo) — native triangle rotated to point right
function arrow(s,x,y,size,color=ORANGE){
  s.addShape(p.ShapeType.triangle,{x,y,w:size,h:size,fill:{color},line:{type:"none"},rotate:90});
}
function iconChip(s,x,y,d,icon,{fill=O_TINT,color="orange"}={}){
  s.addShape(p.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{type:"none"}});
  const pad=d*0.27; s.addImage({path:ic(icon,color),x:x+pad,y:y+pad,w:d-2*pad,h:d-2*pad});
}
function photoCircle(s,path,x,y,d,{badge=null}={}){
  s.addShape(p.ShapeType.ellipse,{x:x-0.04,y:y-0.04,w:d+0.08,h:d+0.08,fill:{color:WHITE},line:{type:"none"},shadow:{type:"outer",color:"9AA3AD",opacity:0.3,blur:7,offset:2,angle:90}});
  s.addImage({path,x,y,w:d,h:d,rounding:true,sizing:{type:"cover",w:d,h:d}});
  if(badge!==null){ const bd=d*0.32;
    s.addShape(p.ShapeType.ellipse,{x:x-bd*0.15,y:y-bd*0.15,w:bd,h:bd,fill:{color:ORANGE},line:{color:WHITE,width:2}});
    s.addText(String(badge),{x:x-bd*0.15,y:y-bd*0.15,w:bd,h:bd,fontFace:SANS_SB,fontSize:14,color:WHITE,align:"center",valign:"middle",margin:0}); }
}
// rounded eyebrow tab (Biocap pattern)
function tabEyebrow(s,text){
  const w=Math.max(1.5, 0.25+text.length*0.085);
  s.addShape(p.ShapeType.roundRect,{x:M,y:0.36,w,h:0.36,rectRadius:0.09,fill:{color:O_TINT},line:{type:"none"}});
  s.addText(text,{x:M,y:0.36,w,h:0.36,fontFace:SANS_M,fontSize:9.5,color:ORANGE_D,align:"center",valign:"middle",margin:0});
}
function chrome(s,{eyebrow,title,subtitle,num,source,page}={}){
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-1.0,y:0.36,w:1.0,h:1.0*MOBI_AR});
  if(eyebrow) tabEyebrow(s,eyebrow);
  let tx=M;
  if(num!=null){ const d=0.5; s.addShape(p.ShapeType.ellipse,{x:M,y:0.86,w:d,h:d,fill:{color:ORANGE},line:{type:"none"}});
    s.addText(String(num),{x:M,y:0.86,w:d,h:d,fontFace:SANS_SB,fontSize:16,color:WHITE,align:"center",valign:"middle",margin:0}); tx=M+d+0.2; }
  if(title) s.addText(title,{x:tx,y:0.8,w:W-tx-1.5,h:0.6,fontFace:SANS_SB,fontSize:22,color:GRAPH,align:"left",valign:"middle",margin:0});
  if(subtitle) s.addText(subtitle,{x:M,y:1.42,w:W-M-1.5,h:0.48,fontFace:SANS,fontSize:11.5,color:GRAY,align:"left",valign:"top",margin:0,lineSpacingMultiple:1.02});
  if(source) s.addText(source,{x:M,y:H-0.6,w:W-2.0,h:0.24,fontFace:SANS,fontSize:7,color:GRAY_L,align:"left",valign:"middle",margin:0});
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.4,w:0.32,h:0.32*IGC_AR});
  s.addText([{text:String(page),options:{color:TXT,fontFace:SANS_M}},{text:"    Confidential",options:{color:GRAY_L,fontFace:SANS}}],
            {x:M+0.42,y:H-0.38,w:3,h:0.3,fontSize:9,align:"left",valign:"middle",margin:0});
}
// graphite conclusion band with orange-highlighted runs
function conclusionBand(s,runs,{y=H-0.98,h=0.64}={}){
  rect(s,0,y,W,h,GRAPH);
  rect(s,0,y,0.14,h,ORANGE);
  s.addText(runs.map(r=>({text:r[0],options:{color:r[1]?ORANGE:"E8ECF1"}})),
    {x:1.0,y,w:W-2.0,h,fontFace:SANS_SB,fontSize:12,align:"center",valign:"middle",margin:0,lineSpacingMultiple:1.0});
}
function colChart(s,type,data,x,y,w,h,opts={}){
  s.addChart(type,data,Object.assign({
    x,y,w,h,barDir:"col",showLegend:false,
    showValue:true,dataLabelFontFace:SANS_SB,dataLabelFontSize:10,dataLabelColor:CHART_D,dataLabelPosition:"outEnd",
    catAxisLabelFontFace:SANS,catAxisLabelFontSize:9.5,catAxisLabelColor:GRAY,catGridLine:{style:"none"},catAxisLineShow:false,
    valAxisHidden:true,valGridLine:{style:"none"},valAxisLineShow:false,barGapWidthPct:55,
  },opts));
}

// =========================================================== 1 COVER (Lox pattern: photo left + brand field right)
(()=>{ const s=p.addSlide(); bg(s,GRAPH);
  const cut=8.15;
  s.addImage({path:A+"cover_buses.jpeg",x:0,y:0,w:cut,h:H,sizing:{type:"cover",w:cut,h:H}});
  rect(s,0,0,cut,H,GRAPH,72);           // light graphite veil over photo
  rect(s,cut,0,W-cut,H,GRAPH);          // brand field
  s.addImage({path:A+"stripes_orange.png",x:W-2.6,y:H-2.6,w:2.6,h:2.6,transparency:35});
  // brand block
  s.addImage({path:A+"mobi_logo_black.png",x:cut+0.75,y:1.7,w:3.6,h:3.6*MOBI_AR});
  s.addShape(p.ShapeType.rect,{x:cut+0.77,y:3.25,w:3.55,h:0.9,fill:{type:"none"},line:{color:ORANGE,width:1.5}});
  s.addText("PROJECT COMPASS",{x:cut+0.77,y:3.25,w:3.55,h:0.9,fontFace:SANS_SB,fontSize:19,color:WHITE,align:"center",valign:"middle",charSpacing:2,margin:0});
  s.addText("Confidential Information Memorandum",{x:cut+0.77,y:4.35,w:3.55,h:0.35,fontFace:SANS,fontSize:11,color:"C7CDD6",align:"center",margin:0});
  s.addText("São Paulo, 2026  |  Confidencial",{x:cut+0.77,y:4.72,w:3.55,h:0.3,fontFace:SANS_M,fontSize:9.5,color:ORANGE,align:"center",margin:0});
  s.addImage({path:A+"igc_white.png",x:W-M-0.62,y:0.45,w:0.62,h:0.62*IGC_AR});
  // photo-side caption
  s.addText("Urban mobility platform  ·  Midwest & Southeast of Brazil",{x:M,y:H-0.55,w:7,h:0.3,fontFace:SANS_M,fontSize:10,color:"E8ECF1",margin:0});
})();

// =========================================================== 2 DISCLAIMER
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-1.0,y:0.36,w:1.0,h:1.0*MOBI_AR});
  s.addText("Disclaimer",{x:M,y:0.5,w:8,h:0.65,fontFace:SANS_SB,fontSize:28,color:GRAPH,margin:0});
  s.addText("Project Compass",{x:M,y:1.12,w:8,h:0.3,fontFace:SANS_M,fontSize:11,color:ORANGE,margin:0});
  const disc=[
    "IGC has been retained by MOBI (“Company”; “Mobi”), on an exclusive basis, to advise the Company in its M&A process (“Transaction”). This material (“Information Memorandum”) describes and summarizes the Company, its assets, market and economic and financial indicators and has been prepared exclusively to assist the recipient in deciding whether it wishes to proceed with a further investigation of a possible Transaction with the Company. In no event shall the recipient use any of this information for any commercial purposes or for purposes other than the one for which this memorandum is furnished.",
    "All information contained in this Information Memorandum has been prepared based on documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or independent research. IGC has not investigated, verified or audited the documents and information used for its preparation. This Information Memorandum contains statements, estimates and projections provided by the Client concerning anticipated future performance, which may or may not prove correct. No representations, expressed or implied, are made as to their accuracy.",
    "This Memorandum of Information is not intended to form any part of the basis of any investment decision and should not be considered a recommendation by the Company or IGC. Each reader must make its own valuation of the Transaction to determine whether to continue in the process. No liability is or shall be attributed to the members of IGC, including its partners, directors or employees, in connection with the accuracy or completeness of the information contained herein.",
  ];
  const disc2=[
    "This material belongs to IGC and shall not be copied, reproduced, distributed and/or disclosed, in whole or in part, including by digital media, to any third party without the express and prior written consent of IGC. By accepting this material, the recipient agrees to return it as soon as requested by IGC and to maintain strict confidentiality over all information contained herein.",
    "Since the existence of the Transaction is not publicly disclosed and may not be known by members of the Company or third parties, the recipient agrees not to approach or contact any officer, employee, client, supplier or representative of the Company without the express written permission of IGC. In furnishing this material, IGC undertakes no obligation to provide access to additional information or to update it, and reserves the right, at any time and without notice, to change the procedure for the Transaction or terminate negotiations prior to the execution of any binding agreement.",
  ];
  s.addText(disc.map(t=>({text:t,options:{breakLine:true,paraSpaceAfter:8}})),{x:M,y:1.62,w:5.85,h:5.2,fontFace:SANS,fontSize:8.4,color:TXT,align:"justify",valign:"top",lineSpacingMultiple:1.04});
  s.addText(disc2.map(t=>({text:t,options:{breakLine:true,paraSpaceAfter:8}})),{x:6.7,y:1.62,w:6.05,h:3.4,fontFace:SANS,fontSize:8.4,color:TXT,align:"justify",valign:"top",lineSpacingMultiple:1.04});
  // graphite contact card (Alquimia pattern)
  rrect(s,6.7,5.15,4.55,1.7,GRAPH,{radius:0.12,shadow:true});
  rect(s,6.7,5.15,0.12,1.7,ORANGE);
  s.addText("Bruno Iervolino",{x:7.05,y:5.35,w:4,h:0.35,fontFace:SANS_SB,fontSize:15,color:WHITE,margin:0});
  s.addText("IGC Partners",{x:7.05,y:5.68,w:4,h:0.28,fontFace:SANS_M,fontSize:10,color:ORANGE,margin:0});
  s.addText([{text:"Av. Brigadeiro Faria Lima, 2277 – 6th floor",options:{breakLine:true}},{text:"01452-000 | São Paulo – SP    Tel: (55 11) 3815-3533",options:{breakLine:true}},{text:"bruno.iervolino@igcp.com.br",options:{}}],
    {x:7.05,y:6.0,w:4.1,h:0.75,fontFace:SANS,fontSize:9,color:"C7CDD6",valign:"top",lineSpacingMultiple:1.18,margin:0});
  photoCircle(s,A+"mobi_bus_front.png",11.65,5.35,1.35,{});
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.4,w:0.32,h:0.32*IGC_AR});
  s.addText([{text:"2",options:{color:TXT,fontFace:SANS_M}},{text:"    Confidential",options:{color:GRAY_L,fontFace:SANS}}],{x:M+0.42,y:H-0.38,w:3,h:0.3,fontSize:9,valign:"middle",margin:0});
})();

// =========================================================== DARK TOC (Lox pattern)
function tocSlide(activeIdx){
  const s=p.addSlide(); bg(s,GRAPH);
  rect(s,0,0,W,H,GRAPH);
  // photo panel right
  const px=7.6;
  s.addImage({path:A+"cover_buses.jpeg",x:px,y:0.95,w:W-px,h:4.6,sizing:{type:"cover",w:W-px,h:4.6}});
  rect(s,px,0.95,W-px,4.6,GRAPH,74);
  // stripes bottom-left
  s.addImage({path:A+"stripes_orange.png",x:-0.9,y:H-2.2,w:2.2,h:2.2,transparency:45});
  // headline
  s.addText("Executive",{x:M,y:1.0,w:6,h:0.75,fontFace:SANS_SB,fontSize:40,color:WHITE,margin:0});
  s.addText("Summary",{x:M,y:1.72,w:6,h:0.75,fontFace:SANS_SB,fontSize:40,color:ORANGE,margin:0});
  // items with play-arrow + page number
  let y=3.15;
  SECTIONS.forEach((sec,i)=>{
    const active=i===activeIdx;
    arrow(s, M+0.02, y+0.13, 0.26, active?ORANGE:G_LINE2);
    s.addText(sec[0].toUpperCase(),{x:M+0.5,y:y,w:4.6,h:0.5,fontFace:SANS_SB,fontSize:14,color:active?ORANGE:MUTE_ON_DARK,charSpacing:1,valign:"middle",margin:0});
    s.addText(sec[1],{x:M+5.2,y:y,w:0.8,h:0.5,fontFace:SANS_M,fontSize:13,color:active?WHITE:MUTE_ON_DARK,valign:"middle",margin:0});
    y+=0.78;
  });
  s.addImage({path:A+"mobi_logo_black.png",x:W-M-1.55,y:H-0.95,w:1.55,h:1.55*MOBI_AR});
  s.addImage({path:A+"igc_white.png",x:W-M-0.5,y:0.4,w:0.5,h:0.5*IGC_AR});
}

// =========================================================== 3 TOC 01
tocSlide(0);

// =========================================================== 4 AT A GLANCE (Alquimia pattern: dark left panel)
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"Mobi at a glance",
    subtitle:"An urban mobility platform with +20 years of operations, serving employees of large corporations and residents of condominiums",
    source:"Source: Company management information; Jan-2026 fleet register. (1) Aggregate fleet per Company materials; 373 owned vehicles per Jan-26 fleet register. (2) Average age per Company materials.",
    page:4});
  // LEFT graphite panel with photo-thumb rows
  const pw=6.35; rrect(s,M,2.0,pw,4.75,GRAPH,{radius:0.12,shadow:true});
  const rows=[
    [A+"mobi_fleet2.png","Essential mobility platform","Route-optimized transportation for corporations and condominiums, supporting a recurring-revenue model"],
    [A+"mobi_microbus.png","Scaled operational platform","Modern fleet backed by intensive monitoring and telemetry, tailored to serve clients’ needs"],
    [A+"mobi_van.png","Visible, resilient cash flow","Long-term contracts (3–5 years) with built-in price adjustment mechanisms supporting margin resilience"],
    [A+"mobi_bus_front.png","Strategic footprint","Headquarters in Goiânia plus 10 operational bases across Goiás, the Federal District and Minas Gerais"],
  ];
  let ry=2.3;
  rows.forEach(r=>{
    s.addImage({path:r[0],x:M+0.3,y:ry,w:0.82,h:0.82,rounding:true,sizing:{type:"cover",w:0.82,h:0.82}});
    s.addText(r[1],{x:M+1.35,y:ry-0.02,w:pw-1.7,h:0.3,fontFace:SANS_SB,fontSize:11.5,color:WHITE,valign:"top",margin:0});
    s.addText(r[2],{x:M+1.35,y:ry+0.28,w:pw-1.7,h:0.62,fontFace:SANS,fontSize:8.8,color:"AEB6C2",valign:"top",margin:0,lineSpacingMultiple:1.0});
    ry+=1.12;
  });
  // RIGHT: key highlights tiles (teaser figures)
  const rx=M+pw+0.45, rw=W-rx-M;
  s.addText("KEY HIGHLIGHTS",{x:rx,y:2.0,w:rw,h:0.28,fontFace:SANS_SB,fontSize:10,color:ORANGE,charSpacing:2,margin:0});
  const tiles=[["BRL 140 Mn","Net revenues 2025"],["BRL 36 Mn","EBITDA 2025 (~26%)"],["+50","Clients"],["+400","Vehicles¹"],["BRL 200 Mn","Value of the fleet"],["4 years","Average fleet age²"]];
  const tw=(rw-0.3)/2, th=0.98;
  tiles.forEach((t,i)=>{ const x=rx+(i%2)*(tw+0.3), y=2.38+Math.floor(i/2)*(th+0.16);
    rrect(s,x,y,tw,th,PAPER,{radius:0.09,line:LINE});
    s.addText(t[0],{x:x+0.2,y:y+0.12,w:tw-0.36,h:0.46,fontFace:SANS_SB,fontSize:18,color:ORANGE,margin:0,valign:"middle"});
    s.addText(t[1],{x:x+0.2,y:y+0.6,w:tw-0.36,h:0.32,fontFace:SANS,fontSize:8.8,color:GRAY,margin:0,valign:"top"});
  });
  // selected clients strip
  s.addText("SELECTED CLIENTS",{x:rx,y:5.9,w:rw,h:0.26,fontFace:SANS_SB,fontSize:9,color:ORANGE,charSpacing:1.5,margin:0});
  const cl=["cli_heineken","cli_roche","cli_kraftheinz","cli_cargill"];
  const cw=(rw-3*0.2)/4;
  cl.forEach((c,i)=>{ const x=rx+i*(cw+0.2);
    rrect(s,x,6.2,cw,0.62,WHITE,{radius:0.07,line:LINE});
    s.addImage({path:A+c+".png",x:x+0.12,y:6.3,w:cw-0.24,h:0.42,sizing:{type:"contain",w:cw-0.24,h:0.42}});
  });
})();

// =========================================================== 5 MOMENTUM
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"A scalable platform with strong recent momentum",
    subtitle:"Operations concentrated in the high-growth Midwest–Southeast corridor, with double-digit revenue growth",
    source:"Source: Company. Gross revenue by operating entity. (1) 1Q gross revenue growth year-over-year.",page:5});
  const mh=3.6, mw=mh*(2000/1878);
  s.addImage({path:A+"brazil_map.png",x:M-0.1,y:2.05,w:mw,h:mh});
  s.addShape(p.ShapeType.rect,{x:M+0.15,y:5.9,w:0.2,h:0.2,fill:{color:ORANGE}});
  s.addText("States of operation — GO · DF · MG",{x:M+0.45,y:5.84,w:3.8,h:0.32,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  const rx=5.5, rw=W-rx-M;
  rrect(s,rx,2.05,rw,2.75,PAPER,{radius:0.1,line:LINE});
  s.addText("Gross revenue by entity — 1Q25 vs. 1Q26",{x:rx+0.3,y:2.22,w:rw-1.7,h:0.3,fontFace:SANS_SB,fontSize:11.5,color:GRAPH,margin:0});
  s.addText("BRL Mn",{x:rx+0.3,y:2.5,w:2,h:0.24,fontFace:SANS,fontSize:8.5,color:GRAY,margin:0});
  rrect(s,rx+rw-1.65,2.2,1.35,0.44,O_TINT,{radius:0.08});
  s.addText("+41.3% YoY¹",{x:rx+rw-1.65,y:2.2,w:1.35,h:0.44,fontFace:SANS_SB,fontSize:10.5,color:ORANGE_D,align:"center",valign:"middle",margin:0});
  colChart(s,p.ChartType.bar,[
    {name:"1Q25",labels:["AGM Caetano","AGM Alpha"],values:[26.62,4.16]},
    {name:"1Q26",labels:["AGM Caetano","AGM Alpha"],values:[36.22,7.25]},
  ],rx+0.2,2.8,rw-0.4,1.85,{barGrouping:"clustered",chartColors:[CHART_LT,ORANGE],dataLabelFormatCode:"0.0",showLegend:true,legendPos:"b",legendFontFace:SANS,legendFontSize:9,legendColor:GRAY,valAxisMaxVal:44,catAxisLabelFontSize:10,catAxisLabelColor:TXT});
  const st=[["BRL 140 Mn","Net revenues 2025"],["~26%","EBITDA margin 2025"],["10","Operational bases · 3 states"]];
  const sw=(rw-2*0.3)/3;
  st.forEach((t,i)=>{ const x=rx+i*(sw+0.3), y=5.05, h=1.3;
    rrect(s,x,y,sw,h,WHITE,{radius:0.09,line:LINE,shadow:true});
    s.addText(t[0],{x:x+0.1,y:y+0.22,w:sw-0.2,h:0.5,fontFace:SANS_SB,fontSize:19,color:ORANGE,align:"center",valign:"middle",margin:0});
    s.addText(t[1],{x:x+0.15,y:y+0.74,w:sw-0.3,h:0.44,fontFace:SANS,fontSize:9,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:0.95});
  });
})();

// =========================================================== 6 NEW — TWO FRONTS (Alquimia entity split)
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"Two complementary fronts within one platform",
    subtitle:"Mobi combines corporate employee transportation with urban mobility for condominium residents, across two operating entities",
    source:"Source: Company management information. Entity split per 1Q26 gross revenue; growth 1Q26 vs. 1Q25. Segment economics to be confirmed with management.",page:6});
  const cw=(W-2*M-0.5)/2;
  // LEFT: Corporate (light paper)
  rrect(s,M,2.05,cw,3.3,PAPER,{radius:0.12,line:LINE});
  iconChip(s,M+0.3,2.32,0.6,"briefcase",{fill:WHITE,color:"orange"});
  s.addText("Corporate transportation",{x:M+1.05,y:2.36,w:cw-2.6,h:0.35,fontFace:SANS_SB,fontSize:14,color:GRAPH,valign:"middle",margin:0});
  rrect(s,M+cw-1.55,2.36,1.3,0.44,WHITE,{radius:0.08,line:LINE});
  s.addText([{text:"83%",options:{fontFace:SANS_SB,color:ORANGE}},{text:" of 1Q26",options:{fontFace:SANS,color:GRAY,fontSize:8.5}}],{x:M+cw-1.55,y:2.36,w:1.3,h:0.44,fontSize:12,align:"center",valign:"middle",margin:0});
  const lpts=[
    "Route-optimized employee transportation (fretamento) for industrial, agribusiness and consumer-goods clients",
    "Long-term contracts (3–5 years) with IPCA, CBA and diesel pass-through adjustment mechanisms",
    "Blue-chip portfolio including Heineken, Roche, Kraft Heinz and Cargill",
  ];
  let ly=3.1; lpts.forEach(t=>{ arrow(s,M+0.34,ly+0.06,0.16);
    s.addText(t,{x:M+0.62,y:ly-0.04,w:cw-0.95,h:0.68,fontFace:SANS,fontSize:9.5,color:TXT,valign:"top",margin:0,lineSpacingMultiple:1.0}); ly+=0.72; });
  // RIGHT: Condominiums (orange tint)
  rrect(s,M+cw+0.5,2.05,cw,3.3,O_TINT,{radius:0.12});
  iconChip(s,M+cw+0.8,2.32,0.6,"home",{fill:WHITE,color:"orange"});
  s.addText("Condominium & urban mobility",{x:M+cw+1.55,y:2.36,w:cw-2.9,h:0.35,fontFace:SANS_SB,fontSize:14,color:GRAPH,valign:"middle",margin:0});
  rrect(s,M+2*cw-1.05,2.36,1.3,0.44,WHITE,{radius:0.08});
  s.addText([{text:"17%",options:{fontFace:SANS_SB,color:ORANGE}},{text:" of 1Q26",options:{fontFace:SANS,color:GRAY,fontSize:8.5}}],{x:M+2*cw-1.05,y:2.36,w:1.3,h:0.44,fontSize:12,align:"center",valign:"middle",margin:0});
  const rpts=[
    "Route-optimized transportation for residents of condominiums, extending the platform beyond the corporate segment",
    "Operated through AGM Alpha (Matriz Brasília), leveraging the same fleet, monitoring and operating standards",
    "Fastest-growing front: +74% gross revenue growth in 1Q26 (YoY)",
  ];
  ly=3.1; rpts.forEach(t=>{ arrow(s,M+cw+0.84,ly+0.06,0.16);
    s.addText(t,{x:M+cw+1.12,y:ly-0.04,w:cw-0.95,h:0.68,fontFace:SANS,fontSize:9.5,color:TXT,valign:"top",margin:0,lineSpacingMultiple:1.0}); ly+=0.72; });
  // entity stat bands (Alquimia bottom bands)
  const by=5.55, bh=0.85;
  rrect(s,M,by,cw,bh,GRAPH,{radius:0.1});
  s.addText([{text:"AGM Caetano   ",options:{fontFace:SANS_SB,fontSize:12,color:WHITE}},{text:"BRL 36.2 Mn",options:{fontFace:SANS_SB,fontSize:15,color:ORANGE}},{text:"  1Q26 gross revenue   ·   ",options:{fontFace:SANS,fontSize:9,color:"AEB6C2"}},{text:"+36% YoY",options:{fontFace:SANS_SB,fontSize:11,color:WHITE}}],
    {x:M+0.25,y:by,w:cw-0.5,h:bh,align:"center",valign:"middle",margin:0});
  rrect(s,M+cw+0.5,by,cw,bh,ORANGE,{radius:0.1});
  s.addText([{text:"AGM Alpha   ",options:{fontFace:SANS_SB,fontSize:12,color:WHITE}},{text:"BRL 7.3 Mn",options:{fontFace:SANS_SB,fontSize:15,color:GRAPH}},{text:"  1Q26 gross revenue   ·   ",options:{fontFace:SANS,fontSize:9,color:"FBD9C6"}},{text:"+74% YoY",options:{fontFace:SANS_SB,fontSize:11,color:WHITE}}],
    {x:M+cw+0.75,y:by,w:cw-0.5,h:bh,align:"center",valign:"middle",margin:0});
})();

// =========================================================== 7 TOC 02
tocSlide(1);

// =========================================================== 8 THESIS SUMMARY
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",title:"Mobi is well positioned for continued growth",
    subtitle:"A resilient, contracted business model supported by strong structural value drivers",
    source:"Source: Company; press research. NR-31 = Brazilian rural-labor safety regulation on worker transport.",page:8});
  const pil=[
    ["Essential mobility platform in a structurally growing market","consistent demand from corporations and condominiums, a national driver shortage and labor regulations (NR-31) sustain recurring demand"],
    ["Solid, contracted revenue model with high stickiness","long-term contracts (3–5 years) with IPCA, CBA and diesel pass-through adjustments protecting margins"],
    ["An asset base that compounds competitive advantage","a modern, fully-owned fleet (+400 vehicles) creating flexibility and hard-to-replicate barriers"],
    ["Integrated capabilities delivering a full-service edge","GPS telemetry and driver monitoring, with in-house maintenance [TBC], for a high-uptime operation"],
    ["Multiple, executable growth avenues","geographic expansion, fleet electrification, technology-enabled services and consolidation of a fragmented market"],
  ];
  let y=2.15;
  pil.forEach((t,i)=>{
    const d=0.6; s.addShape(p.ShapeType.ellipse,{x:M,y,w:d,h:d,fill:{color:ORANGE},line:{type:"none"}});
    s.addText(String(i+1),{x:M,y,w:d,h:d,fontFace:SANS_SB,fontSize:19,color:WHITE,align:"center",valign:"middle",margin:0});
    s.addText([{text:t[0],options:{fontFace:SANS_SB,color:GRAPH}},{text:"  —  "+t[1],options:{fontFace:SANS,color:GRAY}}],
      {x:M+0.85,y:y-0.05,w:7.35,h:0.75,fontSize:11.5,valign:"middle",margin:0,lineSpacingMultiple:1.02});
    y+=0.92;
  });
  photoCircle(s,A+"mobi_fleet2.png",9.55,2.5,2.95,{});
  photoCircle(s,A+"mobi_microbus.png",11.05,5.05,1.65,{});
})();

// =========================================================== 9 PILLAR 1 — TRACK RECORD
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:1,title:"A solid track record with blue-chip clients",
    subtitle:"Long-term contracts across industrial, agribusiness and consumer-goods sectors — serving +50 clients",
    source:"Source: Company. Client relationship metrics (contracts delivered, years, share of revenue) to be confirmed with management.",page:9});
  s.addText("SELECTED CLIENTS",{x:M,y:2.05,w:5,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1.5,margin:0});
  const clients=["cli_heineken","cli_roche","cli_kraftheinz","cli_cargill","cli_votorantim","cli_jbs","cli_mbrf"];
  const gx=M, gy=2.42, gw=7.4, cols=3, cw=(gw-2*0.25)/cols, chh=1.22;
  clients.forEach((c,i)=>{ const row=Math.floor(i/cols), inRow=(row<2)?cols:clients.length-cols*2;
    const rowStart=(row<2)?gx:gx+((cols-inRow)*(cw+0.25))/2;
    const x=rowStart+(i%cols)*(cw+0.25), y=gy+row*(chh+0.2);
    rrect(s,x,y,cw,chh,WHITE,{radius:0.08,line:LINE,shadow:true});
    s.addImage({path:A+c+".png",x:x+0.25,y:y+chh*0.2,w:cw-0.5,h:chh*0.6,sizing:{type:"contain",w:cw-0.5,h:chh*0.6}});
  });
  const rx=8.35, rw=W-rx-M;
  s.addText("PORTFOLIO CHARACTERISTICS",{x:rx,y:2.05,w:rw,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1,margin:0});
  const stats=[["users","+50","clients served"],["clock","3–5 years","average contract term"],["repeat","Recurring","revenue contract model"],["barchart","[XXX]","of contract backlog"]];
  let y=2.42;
  stats.forEach(t=>{ rrect(s,rx,y,rw,0.8,PAPER,{radius:0.09,line:LINE}); iconChip(s,rx+0.18,y+0.15,0.5,t[0],{fill:WHITE});
    s.addText(t[1],{x:rx+0.82,y:y+0.1,w:rw-1,h:0.38,fontFace:SANS_SB,fontSize:15.5,color:GRAPH,margin:0,valign:"middle"});
    s.addText(t[2],{x:rx+0.82,y:y+0.46,w:rw-1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,margin:0,valign:"top"});
    y+=0.93; });
  conclusionBand(s,[["A recurring, contracted revenue base with ",0],["blue-chip clients",1],[" underpins visibility and resilience",0]]);
})();

// =========================================================== 10 PILLAR 2 — FLEET
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:2,title:"A modern, fully-owned fleet tailored to client needs",
    subtitle:"+400 vehicles across buses, micro-buses and vans, sourced from leading chassis brands",
    source:"Source: Company; Jan-2026 fleet register. (1) Average age per Company materials. (2) 373 owned vehicles per Jan-26 fleet register; +400 aggregate fleet per Company materials. (3) Value of the fleet per Company materials.",page:10});
  const px=M,pw=3.05; rrect(s,px,2.05,pw,4.0,GRAPH,{radius:0.12,shadow:true});
  rect(s,px,2.05,0.12,4.0,ORANGE);
  s.addText("HIGHLIGHTS",{x:px+0.34,y:2.27,w:pw-0.6,h:0.3,fontFace:SANS_SB,fontSize:10,color:ORANGE,charSpacing:2,margin:0});
  const hl=[["4 years","Average fleet age¹"],["+400","Vehicles²"],["BRL 200 Mn","Value of the fleet³"],["100%","Owned fleet²"]];
  let hy=2.67; hl.forEach((t,i)=>{ s.addText(t[0],{x:px+0.34,y:hy,w:pw-0.6,h:0.44,fontFace:SANS_SB,fontSize:21,color:WHITE,margin:0,valign:"bottom"});
    s.addText(t[1],{x:px+0.34,y:hy+0.46,w:pw-0.6,h:0.3,fontFace:SANS,fontSize:9.5,color:"AEB6C2",margin:0,valign:"top"});
    if(i<3) s.addShape(p.ShapeType.line,{x:px+0.34,y:hy+0.82,w:pw-0.66,h:0,line:{color:G_LINE2,width:1}}); hy+=0.85; });
  const mx=3.95,mw=4.3; s.addText("FLEET COMPOSITION  (OWNED, JAN-26)",{x:mx,y:2.05,w:mw,h:0.26,fontFace:SANS_SB,fontSize:9,color:ORANGE,charSpacing:0.8,margin:0});
  const comp=[["Bus","223"],["Micro-bus","74"],["Van","55"],["Support vehicle","17"],["Truck","2"],["Pickup truck","2"]];
  const maxv=223; let cy=2.48;
  comp.forEach(([n,v])=>{ s.addText(n,{x:mx,y:cy,w:2.2,h:0.3,fontFace:SANS_M,fontSize:10.5,color:TXT,valign:"middle",margin:0});
    s.addText(v+" un.",{x:mx+mw-1.0,y:cy,w:1.0,h:0.3,fontFace:SANS_SB,fontSize:10.5,color:GRAPH,align:"right",valign:"middle",margin:0});
    const by=cy+0.32; rrect(s,mx,by,mw,0.14,PAPER,{radius:0.07}); rrect(s,mx,by,Math.max(0.16,mw*(parseInt(v)/maxv)),0.14,ORANGE,{radius:0.07}); cy+=0.6; });
  const rx=8.55,rw=W-rx-M;
  photoCircle(s,A+"mobi_van.png",rx+rw/2-1.0,2.05,2.0,{});
  s.addText("LEADING CHASSIS & EQUIPMENT BRANDS",{x:rx,y:4.2,w:rw,h:0.26,fontFace:SANS_SB,fontSize:8.5,color:ORANGE,charSpacing:0.5,margin:0});
  const brands=["br_mercedes","br_volvo","br_scania","br_ford","br_hyundai","br_cat"];
  const bx=rx,by=4.51,bcols=2,bw=(rw-0.2)/bcols,bh=0.48;
  brands.forEach((b,i)=>{ const x=bx+(i%bcols)*(bw+0.2), y=by+Math.floor(i/bcols)*(bh+0.1);
    rrect(s,x,y,bw,bh,WHITE,{radius:0.06,line:LINE}); s.addImage({path:A+b+".png",x:x+0.18,y:y+0.08,w:bw-0.36,h:bh-0.16,sizing:{type:"contain",w:bw-0.36,h:bh-0.16}}); });
  conclusionBand(s,[["A ",0],["fully-owned, modern fleet",1],[" creates operational flexibility and barriers that are hard to replicate",0]],{y:H-0.9,h:0.58});
})();

// =========================================================== 11 PILLAR 3 — TECHNOLOGY
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:3,title:"Technology-enabled operations support high reliability",
    subtitle:"GPS telemetry, driver monitoring and operational discipline keep the fleet running reliably",
    source:"Source: Company. Availability and preventive-maintenance metrics, and scope of in-house maintenance, to be confirmed with management.",page:11});
  const groups=[
    ["activity","GPS Telemetry & Driver Monitoring",["sw_ituran","sw_vtraxx"],"GPS-based tracking and AI-powered driver-fatigue monitoring provide continuous oversight across all bases"],
    ["cpu","ERP & Management",["sw_totvs"],"TOTVS Protheus underpins enterprise resource planning and back-office control"],
    ["tool","Fleet & Maintenance Management",["sw_truckscontrol","sw_zion","sw_opensystem","sw_monaco"],"Specialized systems manage maintenance workflows, parts and fleet operations"],
    ["shield","Safety, PPE & Inspection",["sw_sisma","sw_onsafety","sw_checklistfacil"],"Digital checklists, PPE control and safety management reinforce operational discipline"],
  ];
  const gw=(W-2*M-0.4)/2, gh=1.75;
  groups.forEach((g,i)=>{ const x=M+(i%2)*(gw+0.4), y=2.05+Math.floor(i/2)*(gh+0.25);
    rrect(s,x,y,gw,gh,PAPER,{radius:0.1,line:LINE});
    iconChip(s,x+0.24,y+0.2,0.5,g[0],{fill:WHITE});
    s.addText(g[1],{x:x+0.86,y:y+0.22,w:gw-1.05,h:0.44,fontFace:SANS_SB,fontSize:11.5,color:GRAPH,valign:"middle",margin:0,lineSpacingMultiple:0.95});
    s.addText(g[3],{x:x+0.24,y:y+0.76,w:gw-0.48,h:0.5,fontFace:SANS,fontSize:8.8,color:GRAY,valign:"top",margin:0,lineSpacingMultiple:1.0});
    const logos=g[2],n=logos.length,gapL=0.18,maxCell=1.3,cellW=Math.min(maxCell,(gw-0.48-gapL*(n-1))/n),tot=cellW*n+gapL*(n-1),sX=x+(gw-tot)/2;
    logos.forEach((lg,j)=>{ s.addImage({path:A+lg+".png",x:sX+j*(cellW+gapL),y:y+gh-0.5,w:cellW,h:0.4,sizing:{type:"contain",w:cellW,h:0.4}}); });
  });
  conclusionBand(s,[["Intensive ",0],["monitoring and telemetry",1],[" ensure a high level of service across the network",0]],{y:H-0.9,h:0.58});
})();

// =========================================================== 12 PILLAR 4 — GROWTH AVENUES
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:4,title:"Multiple avenues for continued value creation",
    subtitle:"Geographic expansion, consolidation and fleet electrification position Mobi for a sustained growth trajectory",
    source:"Source: Company; press research. Growth avenues to be validated with management.",page:12});
  const av=[
    ["mappin","Deepen share & expand geographically","Grow wallet share with existing clients and win new logos; expand within the GO–DF–MG corridor and selectively into adjacent regions, leveraging existing bases"],
    ["zap","Electrification & tech-enabled services","Gradual fleet electrification aligned to clients’ ESG and Scope-3 goals; a technology layer (route optimization, apps, carbon dashboards) deepens stickiness"],
    ["layers","Consolidate a fragmented market","A highly fragmented Brazilian market with consolidation underway; Mobi’s scale and track record position it as a natural platform for smaller regional operators"],
  ];
  const cw=(W-2*M-0.8)/3;
  av.forEach((a,i)=>{ const x=M+i*(cw+0.4), y=2.3, h=3.55;
    rrect(s,x,y,cw,h,PAPER,{radius:0.12,line:LINE,shadow:true});
    iconChip(s,x+cw/2-0.42,y+0.4,0.84,a[0],{fill:WHITE});
    s.addText(String.fromCharCode(65+i),{x:x+cw-0.7,y:y+0.25,w:0.5,h:0.5,fontFace:SANS_SB,fontSize:22,color:O_TINT2,align:"center",valign:"middle",margin:0});
    s.addText(a[1],{x:x+0.3,y:y+1.4,w:cw-0.6,h:0.75,fontFace:SANS_SB,fontSize:13,color:GRAPH,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.0});
    s.addText(a[2],{x:x+0.32,y:y+2.2,w:cw-0.64,h:1.2,fontFace:SANS,fontSize:9.5,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
  conclusionBand(s,[["A clear and ",0],["executable path",1],[" for continued value creation",0]],{y:H-0.9,h:0.58});
})();

// =========================================================== 13 TOC 03
tocSlide(2);

// =========================================================== 14 TIMELINE (Lox orange cards)
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"A track record built over more than 20 years",
    subtitle:"Mobi has +20 years of experience in urban mobility and corporate employee transportation",
    source:"Source: Company. Foundation year and milestone dates to be confirmed with management.",page:14});
  const nodes=[["[Year TBC]",["Foundation of Mobi"]],["[Year]",["[Milestone — TBC]"]],["[Year]",["[Milestone — TBC]"]],["2025",["BRL 140 Mn net revenues","[Milestone — TBC]"]],["2026E",["Positioned for continued growth"]]];
  const n=nodes.length, gap=0.35, cw=(W-2*M-(n-1)*gap)/n, cy=2.35, chh=2.9;
  nodes.forEach((nd,i)=>{ const x=M+i*(cw+gap); const last=i===n-1;
    rrect(s,x,cy,cw,chh,last?GRAPH:ORANGE,{radius:0.08,shadow:true});
    s.addText(nd[0],{x:x+0.22,y:cy+0.25,w:cw-0.44,h:0.55,fontFace:SANS_SB,fontSize:21,color:WHITE,margin:0,valign:"middle"});
    s.addShape(p.ShapeType.line,{x:x+0.24,y:cy+0.95,w:cw-0.48,h:0,line:{color:last?G_LINE2:"F9926B",width:1}});
    s.addText(nd[1].map((m,j)=>({text:m,options:{breakLine:true,paraSpaceAfter:6}})),
      {x:x+0.22,y:cy+1.1,w:cw-0.44,h:chh-1.3,fontFace:SANS,fontSize:9.5,color:last?"C7CDD6":WHITE,valign:"top",margin:0,lineSpacingMultiple:1.05});
    if(i<n-1) arrow(s,x+cw+gap/2-0.08,cy+chh/2-0.08,0.16,GRAY_L);
  });
  conclusionBand(s,[["More than ",0],["two decades",1],[" of disciplined operation, positioned for its next phase of growth",0]],{y:H-0.98,h:0.64});
})();

// =========================================================== 15 FOOTPRINT
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Strategically positioned across the Midwest and Southeast",
    subtitle:"From its Goiânia headquarters to 10 operational bases across Goiás, the Federal District and Minas Gerais",
    source:"Source: Company; Jan-2026 fleet register.",page:15});
  const mh=3.6, mw=mh*(2000/1878);
  s.addImage({path:A+"brazil_map.png",x:M-0.1,y:2.05,w:mw,h:mh});
  s.addShape(p.ShapeType.rect,{x:M+0.15,y:5.75,w:0.2,h:0.2,fill:{color:ORANGE}});
  s.addText("States with operational bases",{x:M+0.45,y:5.69,w:3.5,h:0.32,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  const rx=5.3,rw=W-rx-M;
  rrect(s,rx,2.0,rw,1.0,GRAPH,{radius:0.1,shadow:true});
  rect(s,rx,2.0,0.12,1.0,ORANGE);
  iconChip(s,rx+0.28,2.2,0.56,"home",{fill:G_PANEL,color:"orange"});
  s.addText("Headquarters — Goiânia, GO",{x:rx+1.02,y:2.14,w:rw-1.25,h:0.32,fontFace:SANS_SB,fontSize:13,color:WHITE,valign:"top",margin:0});
  s.addText("Corporate HQ (Garagem Central) centralizing fleet management, monitoring infrastructure and administration",{x:rx+1.02,y:2.46,w:rw-1.25,h:0.5,fontFace:SANS,fontSize:9.2,color:"AEB6C2",valign:"top",margin:0,lineSpacingMultiple:1.0});
  s.addText("10 ACTIVE OPERATIONAL BASES",{x:rx,y:3.16,w:rw,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1.5,margin:0});
  const bases=[["Anápolis – GO","Largest base outside HQ, supporting fleet availability across the Goiás corridor"],
    ["Brasília – DF","Garagem BSB supporting operations across the Federal District"],
    ["Senador Canedo – GO","Support base close to client sites, enabling faster response times"],
    ["Uberlândia – MG","Serving the Triângulo Mineiro region with strong execution oversight"]];
  let by=3.46; bases.forEach(([n,d])=>{ iconChip(s,rx,by+0.02,0.42,"mappin");
    s.addText(n,{x:rx+0.6,y:by-0.04,w:rw-0.6,h:0.3,fontFace:SANS_SB,fontSize:11,color:GRAPH,valign:"top",margin:0});
    s.addText(d,{x:rx+0.6,y:by+0.26,w:rw-0.6,h:0.36,fontFace:SANS,fontSize:8.8,color:GRAY,valign:"top",margin:0,lineSpacingMultiple:0.98}); by+=0.66; });
  const sb=[["1","Headquarters"],["10","Operational bases"],["3","States covered"],["+400","Vehicles"]];
  const sy=6.05,sw2=(W-2*M)/4;
  sb.forEach((t,i)=>{ const x=M+i*sw2; if(i>0) s.addShape(p.ShapeType.line,{x,y:sy+0.05,w:0,h:0.55,line:{color:LINE,width:1}});
    s.addText(t[0],{x:x+0.2,y:sy,w:sw2-0.3,h:0.42,fontFace:SANS_SB,fontSize:22,color:ORANGE,margin:0,valign:"bottom"});
    s.addText(t[1],{x:x+0.2,y:sy+0.44,w:sw2-0.3,h:0.26,fontFace:SANS,fontSize:9,color:GRAY,margin:0,valign:"top"}); });
})();

// =========================================================== 16 REVENUE MODEL
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"A recurring, contract-based revenue model",
    subtitle:"Revenue is generated through long-term transportation contracts across two operating entities",
    source:"Source: Company. Revenue split and contract economics to be confirmed with management.",page:16});
  const cards=[
    [A+"mobi_microbus.png","Dedicated fleet contracts","Long-term contracts (3–5 years) providing dedicated vehicles, drivers and routes, billed on a recurring monthly basis"],
    [A+"mobi_fleet2.png","Route & shift management","Transportation planned around client shifts, sites and condominium routes, with telemetry ensuring reliability and safety"],
    [A+"mobi_bus_front.png","Two operating entities","Revenue consolidated across AGM Caetano and AGM Alpha, together reaching BRL 140 Mn of net revenues in 2025"],
  ];
  const cw=(W-2*M-0.8)/3;
  cards.forEach((c,i)=>{ const x=M+i*(cw+0.4), y=2.45;
    photoCircle(s,c[0],x+cw/2-1.05,y,2.1,{badge:i+1});
    rrect(s,x,y+2.35,cw,1.8,PAPER,{radius:0.1,line:LINE});
    s.addText(c[1],{x:x+0.25,y:y+2.55,w:cw-0.5,h:0.4,fontFace:SANS_SB,fontSize:13,color:GRAPH,align:"center",valign:"top",margin:0});
    s.addText(c[2],{x:x+0.3,y:y+2.98,w:cw-0.6,h:1.1,fontFace:SANS,fontSize:9.5,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
})();

// =========================================================== 17 MANAGEMENT
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"An experienced and committed management team",
    subtitle:"Management team overview — names, roles and backgrounds to be confirmed with the Company",
    source:"Source: Company. Roles and backgrounds to be confirmed with management.",page:17});
  const team=[["Antônio Gabriel","AG"],["Morgana","M"],["Pedro","P"],["Gabriela","G"],["[Name TBC]","?"]];
  const n=team.length, gw=(W-2*M-(n-1)*0.4)/n;
  team.forEach((t,i)=>{ const x=M+i*(gw+0.4), y=2.35, h=3.8;
    rrect(s,x,y,gw,h,PAPER,{radius:0.12,line:LINE,shadow:true});
    const d=1.4; s.addShape(p.ShapeType.ellipse,{x:x+gw/2-d/2,y:y+0.35,w:d,h:d,fill:{color:i%2?ORANGE:GRAPH},line:{type:"none"}});
    s.addText(t[1],{x:x+gw/2-d/2,y:y+0.35,w:d,h:d,fontFace:SANS_SB,fontSize:30,color:WHITE,align:"center",valign:"middle",margin:0});
    s.addText(t[0],{x:x+0.1,y:y+1.9,w:gw-0.2,h:0.35,fontFace:SANS_SB,fontSize:12,color:GRAPH,align:"center",margin:0});
    s.addText("[Role — TBC]",{x:x+0.1,y:y+2.25,w:gw-0.2,h:0.3,fontFace:SANS_M,fontSize:9.5,color:ORANGE,align:"center",margin:0});
    s.addShape(p.ShapeType.line,{x:x+0.4,y:y+2.68,w:gw-0.8,h:0,line:{color:LINE,width:1}});
    s.addText("[Background — to be\nconfirmed with the\nCompany]",{x:x+0.25,y:y+2.82,w:gw-0.5,h:0.9,fontFace:SANS,fontSize:8.6,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.1});
  });
})();

// =========================================================== 18 ORG CHART
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Organization & corporate structure",
    subtitle:"Multi-entity structure (Grupo AGM Caetano / AGM Alpha) — simplified representation, to be confirmed",
    source:"Source: Company. Simplified representation; entities and ownership to be confirmed with management.",page:18});
  const box=(x,y,w,h,txt,sub,{fill=WHITE,tc=GRAPH,line=GRAY_L}={})=>{
    rrect(s,x,y,w,h,fill,{radius:0.07,line});
    s.addText(txt,{x:x+0.1,y:sub?y+0.1:y,w:w-0.2,h:sub?0.34:h,fontFace:SANS_SB,fontSize:11,color:tc,align:"center",valign:sub?"top":"middle",margin:0});
    if(sub) s.addText(sub,{x:x+0.1,y:y+0.4,w:w-0.2,h:h-0.44,fontFace:SANS,fontSize:8,color:fill===GRAPH?"AEB6C2":GRAY,align:"center",valign:"top",margin:0});
  };
  const conn=(x1,y1,x2,y2)=>s.addShape(p.ShapeType.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),line:{color:GRAY_L,width:1}});
  box(W/2-1.6,2.12,3.2,0.55,"Family Shareholders",null,{fill:ORANGE,tc:WHITE,line:ORANGE});
  conn(W/2,2.67,W/2,3.0);
  box(W/2-1.95,3.0,3.9,0.72,"AGM Caetano Participações","Holding company",{fill:GRAPH,tc:WHITE,line:GRAPH});
  const l3=[["AGM Caetano LTDA","Operating entity"],["MOBI Alpha","Matriz Brasília"],["Moura e Carrilho Part.","[Related party]"]];
  const bw=3.5,tot=3*bw+2*0.55,sx=W/2-tot/2,ly=4.25;
  conn(W/2,3.72,W/2,4.0); s.addShape(p.ShapeType.line,{x:sx+bw/2,y:4.0,w:tot-bw,h:0,line:{color:GRAY_L,width:1}});
  l3.forEach((b,i)=>{ const x=sx+i*(bw+0.55); conn(x+bw/2,4.0,x+bw/2,ly); box(x,ly,bw,0.72,b[0],b[1]); });
  s.addText("OPERATIONAL BRANCHES (FILIAIS)",{x:M,y:5.45,w:6,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1,margin:0});
  const fil=["Goiânia","Anápolis","Nerópolis","Senador Canedo","Itumbiara","Alexânia","Uberlândia","Rio Verde","Pires do Rio"];
  const fcols=5,fw=(W-2*M-(fcols-1)*0.2)/fcols;
  fil.forEach((f,i)=>{ const x=M+(i%fcols)*(fw+0.2), y=5.76+Math.floor(i/fcols)*0.5;
    rrect(s,x,y,fw,0.4,PAPER,{radius:0.05,line:LINE}); s.addText("Filial "+f,{x:x+0.05,y,w:fw-0.1,h:0.4,fontFace:SANS_M,fontSize:8.5,color:TXT,align:"center",valign:"middle",margin:0}); });
  rrect(s,W-M-2.5,2.17,2.5,0.62,GRAPH,{radius:0.08});
  s.addText([{text:"Fleet   ",options:{color:"AEB6C2",fontFace:SANS}},{text:"+400 vehicles",options:{color:ORANGE,fontFace:SANS_SB,fontSize:13}}],{x:W-M-2.5,y:2.17,w:2.5,h:0.62,fontSize:11,align:"center",valign:"middle",margin:0});
})();

// =========================================================== 19 SUCCESS CASES
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Long-standing relationships with anchor clients",
    subtitle:"Selected success cases illustrating Mobi’s durable, multi-year client partnerships — details to be confirmed",
    source:"Source: Company — to be confirmed with management.",page:19});
  const cases=[["cli_cargill","Cargill"],["cli_heineken","Heineken"],["cli_roche","Roche"]];
  const cw=(W-2*M-0.8)/3;
  cases.forEach((c,i)=>{ const x=M+i*(cw+0.4), y=2.25, h=4.1;
    rrect(s,x,y,cw,h,PAPER,{radius:0.12,line:LINE,shadow:true});
    rrect(s,x+0.3,y+0.35,cw-0.6,1.05,WHITE,{radius:0.08,line:LINE});
    s.addImage({path:A+c[0]+".png",x:x+0.6,y:y+0.58,w:cw-1.2,h:0.58,sizing:{type:"contain",w:cw-1.2,h:0.58}});
    s.addText("[City — State]",{x:x+0.2,y:y+1.5,w:cw-0.4,h:0.3,fontFace:SANS_M,fontSize:9.5,color:GRAY,align:"center",margin:0});
    const sy=y+1.95, sw=(cw-0.6)/2;
    [["BRL [XXX] Mn","total value"],["[X] years","total term"]].forEach((t,j)=>{ const sx2=x+0.3+j*sw;
      s.addText(t[0],{x:sx2,y:sy,w:sw,h:0.4,fontFace:SANS_SB,fontSize:15,color:ORANGE,align:"center",valign:"middle",margin:0});
      s.addText(t[1],{x:sx2,y:sy+0.4,w:sw,h:0.26,fontFace:SANS,fontSize:8.5,color:GRAY,align:"center",valign:"top",margin:0}); });
    s.addShape(p.ShapeType.line,{x:x+0.4,y:sy+0.8,w:cw-0.8,h:0,line:{color:LINE,width:1}});
    s.addText("[Service scope — TBC]",{x:x+0.3,y:sy+0.95,w:cw-0.6,h:0.35,fontFace:SANS_M,fontSize:9.5,color:GRAPH,align:"center",margin:0});
    s.addText("[Relationship highlights and milestones to be confirmed with the Company]",{x:x+0.3,y:sy+1.3,w:cw-0.6,h:0.6,fontFace:SANS,fontSize:8.5,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
})();

// =========================================================== 20 TOC 04
tocSlide(3);

// =========================================================== 21 FINANCIAL HIGHLIGHTS
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Financial highlights",
    subtitle:"Solid profitability in 2025; full historical series and projections pending Company data",
    source:"Source: Company management information. 2025 figures are preliminary; historical series and projections to be confirmed with management.",page:21});
  const tiles=[["BRL 140 Mn","Net revenues 2025"],["BRL 36 Mn","EBITDA 2025"],["~26%","EBITDA margin 2025"],["+41.3%","1Q gross revenue YoY"]];
  const tw=(W-2*M-3*0.3)/4;
  tiles.forEach((t,i)=>{ const x=M+i*(tw+0.3), y=2.05, h=1.15;
    rrect(s,x,y,tw,h,PAPER,{radius:0.09,line:LINE});
    s.addShape(p.ShapeType.rect,{x,y:y+0.2,w:0.09,h:0.75,fill:{color:ORANGE}});
    s.addText(t[0],{x:x+0.26,y:y+0.14,w:tw-0.44,h:0.5,fontFace:SANS_SB,fontSize:20,color:GRAPH,margin:0,valign:"middle"});
    s.addText(t[1],{x:x+0.26,y:y+0.68,w:tw-0.44,h:0.32,fontFace:SANS,fontSize:9.5,color:GRAY,margin:0,valign:"top"}); });
  rrect(s,M,3.5,W-2*M,2.9,WHITE,{radius:0.1,line:LINE,shadow:true});
  s.addText("Net revenues & EBITDA evolution — BRL Mn",{x:M+0.3,y:3.66,w:8,h:0.3,fontFace:SANS_SB,fontSize:12,color:GRAPH,margin:0});
  s.addShape(p.ShapeType.rect,{x:W-M-3.1,y:3.72,w:0.18,h:0.18,fill:{color:CHART_D}}); s.addText("Net revenues",{x:W-M-2.88,y:3.66,w:1.2,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  s.addShape(p.ShapeType.rect,{x:W-M-1.6,y:3.72,w:0.18,h:0.18,fill:{color:ORANGE}}); s.addText("EBITDA",{x:W-M-1.38,y:3.66,w:1.1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  colChart(s,p.ChartType.bar,[
    {name:"Net revenues",labels:["2022","2023","2024","2025","2026E"],values:[null,null,null,140,null]},
    {name:"EBITDA",labels:["2022","2023","2024","2025","2026E"],values:[null,null,null,36,null]},
  ],M+0.2,4.1,W-2*M-0.5,2.15,{barGrouping:"clustered",chartColors:[CHART_D,ORANGE],valAxisMaxVal:170,barGapWidthPct:70,catAxisLabelFontSize:10,catAxisLabelColor:TXT});
  s.addText("2022–2024 and 2026E\nfigures pending Company data",{x:M+0.55,y:4.75,w:3.6,h:0.7,fontFace:SANS,fontSize:10,color:GRAY_L,italic:true,align:"left",valign:"top",margin:0,lineSpacingMultiple:1.05});
})();

// =========================================================== 22 P&L TABLE (Lox DRE pattern)
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Consolidated income statement",
    subtitle:"Combined figures for AGM Caetano and AGM Alpha — full series to be confirmed with the Company",
    source:"Source: Company. Illustrative structure; all figures to be confirmed with management. Net revenues and EBITDA for 2025 are preliminary.",page:22});
  const cols=["BRL Mn","2022","2023","2024","2025","2026E"];
  const rows=[
    ["Gross revenue","—","—","—","—","—","h"],
    ["Taxes","—","—","—","—","—",""],
    ["Net revenues","—","—","—","~140","—","b"],
    ["growth %","—","—","—","—","—","i"],
    ["COGS","—","—","—","—","—",""],
    ["Gross profit","—","—","—","—","—","h"],
    ["gross margin %","—","—","—","—","—","i"],
    ["Personnel expenses","—","—","—","—","—",""],
    ["General & administrative","—","—","—","—","—",""],
    ["Selling expenses","—","—","—","—","—",""],
    ["EBITDA","—","—","—","~36","—","b"],
    ["EBITDA margin %","—","—","—","~26%","—","i"],
    ["D&A","—","—","—","—","—",""],
    ["Financial result","—","—","—","—","—",""],
    ["EBT","—","—","—","—","—","h"],
    ["Net income","—","—","—","—","—","b"],
  ];
  const tx=M, tw=W-2*M, ty=2.05, colLabW=3.6, dataW=(tw-colLabW)/(cols.length-1), rh=0.272;
  rect(s,tx,ty,tw,0.38,GRAPH);
  s.addText(cols[0],{x:tx+0.2,y:ty,w:colLabW-0.2,h:0.38,fontFace:SANS_SB,fontSize:10.5,color:WHITE,valign:"middle",margin:0});
  for(let c=1;c<cols.length;c++) s.addText(cols[c],{x:tx+colLabW+(c-1)*dataW,y:ty,w:dataW,h:0.38,fontFace:SANS_SB,fontSize:10.5,color:WHITE,align:"center",valign:"middle",margin:0});
  let y=ty+0.38;
  rows.forEach((r,ri)=>{ const kind=r[6];
    if(kind==="h"||kind==="b") rect(s,tx,y,tw,rh,O_TINT);
    else if(ri%2===1) rect(s,tx,y,tw,rh,PAPER);
    const bold=(kind==="h"||kind==="b"), ital=(kind==="i");
    s.addText(r[0],{x:tx+0.2,y,w:colLabW-0.2,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:9.5,italic:ital,color:ital?GRAY:TXT,valign:"middle",margin:0});
    for(let c=1;c<cols.length;c++){ const v=r[c]; const hot=(typeof v==="string"&&v.indexOf("~")>=0);
      s.addText(v,{x:tx+colLabW+(c-1)*dataW,y,w:dataW,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:9.5,italic:ital,color:hot?ORANGE_D:(ital?GRAY:TXT),align:"center",valign:"middle",margin:0}); }
    y+=rh;
  });
})();

// =========================================================== 23 BACK COVER
(()=>{ const s=p.addSlide(); bg(s,GRAPH);
  const cut=7.4;
  s.addImage({path:A+"cover_buses.jpeg",x:0,y:0,w:cut,h:H,sizing:{type:"cover",w:cut,h:H}});
  rect(s,0,0,cut,H,GRAPH,68);
  rect(s,cut,0,W-cut,H,GRAPH);
  s.addImage({path:A+"stripes_orange.png",x:W-2.3,y:-0.7,w:2.3,h:2.3,transparency:40});
  s.addImage({path:A+"mobi_logo_black.png",x:cut+0.8,y:0.85,w:2.4,h:2.4*MOBI_AR});
  s.addText("Deal team",{x:cut+0.8,y:2.05,w:4.5,h:0.55,fontFace:SANS_SB,fontSize:24,color:WHITE,margin:0});
  const team=[["Bruno Iervolino","bruno.iervolino@igcp.com.br"],["Gabriel Brito","gabriel.brito@igcp.com.br"]];
  let y=2.85; team.forEach(t=>{
    arrow(s,cut+0.82,y+0.1,0.16);
    s.addText(t[0],{x:cut+1.1,y,w:4.4,h:0.32,fontFace:SANS_SB,fontSize:14,color:WHITE,margin:0});
    s.addText(t[1],{x:cut+1.1,y:y+0.32,w:4.4,h:0.28,fontFace:SANS,fontSize:10,color:ORANGE,margin:0});
    s.addText("+55 11 3815-3533",{x:cut+1.1,y:y+0.6,w:4.4,h:0.28,fontFace:SANS,fontSize:10,color:"AEB6C2",margin:0});
    y+=1.1; });
  s.addShape(p.ShapeType.line,{x:cut+0.82,y:5.25,w:4.3,h:0,line:{color:G_LINE2,width:1}});
  s.addText([{text:"Av. Brigadeiro Faria Lima, 2277 – 6th floor",options:{breakLine:true}},{text:"01452-000, Jardim Paulistano, São Paulo – SP",options:{breakLine:true}},{text:"+55 11 3815-3533",options:{}}],
    {x:cut+0.82,y:5.45,w:4.4,h:0.95,fontFace:SANS,fontSize:9.5,color:"AEB6C2",valign:"top",lineSpacingMultiple:1.2,margin:0});
  s.addImage({path:A+"igc_white.png",x:cut+0.82,y:H-0.95,w:0.6,h:0.6*IGC_AR});
  s.addText("Confidential Information Memorandum",{x:M,y:H-0.55,w:5,h:0.3,fontFace:SANS_M,fontSize:10,color:"E8ECF1",margin:0});
})();

p.writeFile({fileName:"Project_Compass_CIM.pptx"}).then(f=>console.log("WROTE",f));
