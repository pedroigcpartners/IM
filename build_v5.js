// Project Compass — Mobi CIM v5.
// Brand skin: Mobi orange #F35B1A (logo arrow) + graphite #141A24 (fleet livery).
// Structure and craft synthesised from the reference base in refs/ (see refs/DESIGN_TOKENS.md):
//   Gold Mine  — house CIM spine: cover / disclaimer / repeated TOC / numbered thesis
//   Soul       — quadrant at-a-glance, series template with active dark rail, dark stat bands
//   Lox        — full-bleed dark TOC, band-as-footer, year cards
//   Alquimia   — dark panel + photo rows, numbered pillar circles, conclusion bands
//   Biocap     — rounded eyebrow tab
// Type + geometry locked to the measured house grid: M=0.8in (2.03cm), title 18, subtitle 10.5,
// body 9, footnote 7-8; footer baseline 7.10in; conclusion band flush to the bottom edge.
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "IGC Partners";
p.company = "IGC Partners";
p.title = "Project Compass — Confidential Information Memorandum";

// ---------- palette ----------
const ORANGE="F35B1A", ORANGE_D="C6470F", O_TINT="FDE9DE", O_TINT2="FBD9C6";
const GRAPH="141A24", G_PANEL="1F2734", G_LINE="323E50", G_SOFT="2A3442";
const NAVY="222F44";                      // IGC house dark (present in all three .pptx refs)
const CHART_D="2C3A4F", CHART_LT="D9DEE5";
const WHITE="FFFFFF", PAPER="F4F6F8", PAPER2="EDF0F3", LINE="E2E6EB";
const TXT="2B333E", GRAY="6C7683", GRAY_L="9AA3AD", ON_DARK="C7CDD6", MUTE_DARK="8B95A5";
const SANS="Poppins", SANS_M="Poppins Medium", SANS_SB="Poppins SemiBold", SANS_L="Poppins Light";

const W=13.333, H=7.5, M=0.8, A="assets/";
const MOBI_AR=246/768, IGC_AR=778/900;
const SECTIONS=[["Introduction","04"],["Investment Thesis","10"],["Company Overview","17"],["Financial Highlights","25"]];
const ic=(n,c)=>`${A}icons/${n}_${c}.png`;

// aspect ratios so logos never distort
const AR={cargill:283/95,heineken:232/59,jbs:206/101,kraftheinz:160/34,mbrf:279/88,roche:226/121,
  votorantim:244/64,mercedes:1280/926,volvo:1,scania:1,ford:195/148,hyundai:280/180,cat:264/191,
  bell:404/125,dynapac:402/125,komatsu:503/100,liebherr:600/74,lgmg:310/162,sunward:1,
  ituran:332/152,vtraxx:410/150,totvs:300/136,truckscontrol:382/132,zion:204/192,
  opensystem:478/172,monaco:1500/956,sisma:275/183,onsafety:300/99,checklistfacil:1};

// ---------- primitives ----------
const bg=(s,c)=>{ s.background={color:c}; };
function rect(s,x,y,w,h,c,transparency){ const o={x,y,w,h,fill:{color:c},line:{type:"none"}}; if(transparency) o.fill.transparency=transparency; s.addShape(p.ShapeType.rect,o); }
function rrect(s,x,y,w,h,c,{radius=0.08,line=null,lw=1,shadow=false}={}){
  const o={x,y,w,h,rectRadius:radius,fill:c?{color:c}:{type:"none"},line:line?{color:line,width:lw}:{type:"none"}};
  if(shadow) o.shadow={type:"outer",color:"9AA3AD",opacity:0.28,blur:9,offset:2,angle:90};
  s.addShape(p.ShapeType.roundRect,o);
}
function txt(s,t,o){ s.addText(t,Object.assign({margin:0,fontFace:SANS,color:TXT},o)); }
// Mobi play-arrow (from the logo) as bullet / nav marker
function arrow(s,x,y,size,color=ORANGE){ s.addShape(p.ShapeType.triangle,{x,y,w:size,h:size,fill:{color},line:{type:"none"},rotate:90}); }
// fit a logo inside a box without distorting it
function logoFit(s,key,file,cx,cy,bw,bh){
  const ar=AR[key]||1; let w=bw,h=bw/ar; if(h>bh){ h=bh; w=bh*ar; }
  s.addImage({path:A+file,x:cx-w/2,y:cy-h/2,w,h});
}
function logoCard(s,key,file,x,y,w,h,{pad=0.16,fill=WHITE,border=LINE}={}){
  rrect(s,x,y,w,h,fill,{radius:0.07,line:border});
  logoFit(s,key,file,x+w/2,y+h/2,w-2*pad,h-2*pad);
}
function iconChip(s,x,y,d,icon,{fill=O_TINT,color="orange"}={}){
  s.addShape(p.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{type:"none"}});
  const pad=d*0.27; s.addImage({path:ic(icon,color),x:x+pad,y:y+pad,w:d-2*pad,h:d-2*pad});
}
function photoCircle(s,path,x,y,d,{badge=null,ring=WHITE}={}){
  s.addShape(p.ShapeType.ellipse,{x:x-0.045,y:y-0.045,w:d+0.09,h:d+0.09,fill:{color:ring},line:{type:"none"},shadow:{type:"outer",color:"9AA3AD",opacity:0.3,blur:7,offset:2,angle:90}});
  s.addImage({path,x,y,w:d,h:d,rounding:true,sizing:{type:"cover",w:d,h:d}});
  if(badge!==null){ const bd=d*0.34;
    s.addShape(p.ShapeType.ellipse,{x:x-bd*0.12,y:y-bd*0.12,w:bd,h:bd,fill:{color:ORANGE},line:{color:WHITE,width:2}});
    txt(s,String(badge),{x:x-bd*0.12,y:y-bd*0.12,w:bd,h:bd,fontFace:SANS_SB,fontSize:12,color:WHITE,align:"center",valign:"middle"}); }
}
function tabEyebrow(s,text){                                   // Biocap rounded tab
  const w=Math.max(1.45,0.3+text.length*0.082);
  rrect(s,M,0.34,w,0.34,O_TINT,{radius:0.085});
  txt(s,text,{x:M,y:0.34,w,h:0.34,fontFace:SANS_M,fontSize:9,color:ORANGE_D,align:"center",valign:"middle"});
}
function chrome(s,{eyebrow,title,subtitle,num,source,page,band=false}={}){
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-0.95,y:0.34,w:0.95,h:0.95*MOBI_AR});
  if(eyebrow) tabEyebrow(s,eyebrow);
  let tx=M;
  if(num!=null){ const d=0.46; s.addShape(p.ShapeType.ellipse,{x:M,y:0.83,w:d,h:d,fill:{color:ORANGE},line:{type:"none"}});
    txt(s,String(num),{x:M,y:0.83,w:d,h:d,fontFace:SANS_SB,fontSize:14,color:WHITE,align:"center",valign:"middle"}); tx=M+d+0.2; }
  if(title) txt(s,title,{x:tx,y:0.79,w:W-tx-1.35,h:0.54,fontFace:SANS_SB,fontSize:18,color:GRAPH,valign:"middle"});
  if(subtitle) txt(s,subtitle,{x:M,y:1.34,w:W-M-1.35,h:0.44,fontSize:10.5,color:GRAY,valign:"top",lineSpacingMultiple:1.04});
  if(source) txt(s,source,{x:M,y:band?H-1.06:H-0.6,w:W-2*M,h:0.24,fontSize:7,color:GRAY_L,valign:"middle"});
  if(!band){
    s.addImage({path:A+"igc_navy.png",x:M,y:H-0.4,w:0.3,h:0.3*IGC_AR});
    s.addText([{text:String(page),options:{color:TXT,fontFace:SANS_M}},{text:"    Confidential",options:{color:GRAY_L,fontFace:SANS}}],
      {x:M+0.4,y:H-0.38,w:3,h:0.3,fontSize:9,align:"left",valign:"middle",margin:0});
  }
}
// conclusion band = the footer strip (Lox): flush to the bottom, igc mark reversed out
function conclusionBand(s,runs,{page=null}={}){
  const y=H-0.75,h=0.75;
  rect(s,0,y,W,h,GRAPH); rect(s,0,y,0.13,h,ORANGE);
  s.addText(runs.map(r=>({text:r[0],options:{color:r[1]?ORANGE:"E8ECF1"}})),
    {x:2.1,y,w:W-4.2,h,fontFace:SANS_SB,fontSize:12,align:"center",valign:"middle",margin:0});
  if(page!=null){
    s.addImage({path:A+"igc_white.png",x:M,y:y+h/2-0.14,w:0.3,h:0.3*IGC_AR});
    s.addText([{text:String(page),options:{color:WHITE,fontFace:SANS_M}},{text:"    Confidential",options:{color:MUTE_DARK,fontFace:SANS}}],
      {x:M+0.4,y:y+h/2-0.15,w:3,h:0.3,fontSize:9,align:"left",valign:"middle",margin:0});
  }
}
// stat tile — number over label, orange keyline (Alquimia/Soul)
function statTile(s,x,y,w,h,value,label,{dark=false,accent=false}={}){
  rrect(s,x,y,w,h,dark?G_PANEL:PAPER,{radius:0.07,line:dark?null:LINE});
  rect(s,x,y+h*0.24,0.055,h*0.52,accent?ORANGE:(dark?ORANGE:ORANGE));
  txt(s,value,{x:x+0.24,y:y+h*0.16,w:w-0.4,h:h*0.42,fontFace:SANS_SB,fontSize:18,color:dark?WHITE:GRAPH,valign:"middle"});
  txt(s,label,{x:x+0.24,y:y+h*0.56,w:w-0.4,h:h*0.32,fontSize:8,color:dark?MUTE_DARK:GRAY,valign:"middle"});
}
// dark section divider (Lox full-bleed TOC)
function tocSlide(active,page){
  const s=p.addSlide(); bg(s,GRAPH);
  s.addImage({path:A+"stripes_orange.png",x:-0.7,y:H-2.5,w:2.5,h:2.5,transparency:62});
  const cut=7.5;
  s.addImage({path:A+"mobi_fleet2.png",x:cut,y:0,w:W-cut,h:H,sizing:{type:"cover",w:W-cut,h:H}});
  rect(s,cut,0,W-cut,H,GRAPH,58);
  rect(s,cut,0,0.045,H,ORANGE);
  txt(s,"Executive",{x:M,y:0.95,w:6,h:0.72,fontFace:SANS_SB,fontSize:32,color:WHITE,valign:"middle"});
  txt(s,"Summary",{x:M,y:1.65,w:6,h:0.72,fontFace:SANS_SB,fontSize:32,color:ORANGE,valign:"middle"});
  rect(s,M,2.62,1.5,0.035,ORANGE);
  SECTIONS.forEach((sec,i)=>{
    const y=3.05+i*0.79, on=(i===active);
    arrow(s,M+0.02,y+0.09,0.19,on?ORANGE:"4A5563");
    txt(s,sec[0].toUpperCase(),{x:M+0.42,y,w:4.6,h:0.38,fontFace:on?SANS_SB:SANS_M,fontSize:11,
      color:on?WHITE:"7E8794",charSpacing:1.4,valign:"middle"});
    txt(s,sec[1],{x:M+5.05,y,w:0.7,h:0.38,fontFace:SANS_M,fontSize:12,color:on?ORANGE:"5C6674",align:"right",valign:"middle"});
  });
  s.addImage({path:A+"igc_white.png",x:W-M-0.55,y:0.42,w:0.55,h:0.55*IGC_AR});
  s.addImage({path:A+"mobi_logo_black.png",x:M,y:H-1.05,w:1.35,h:1.35*MOBI_AR});
  txt(s,String(page),{x:cut-1.0,y:H-0.6,w:0.7,h:0.3,fontFace:SANS_M,fontSize:9,color:MUTE_DARK,align:"right",valign:"middle"});
  return s;
}
function colChart(s,type,data,x,y,w,h,opts={}){
  s.addChart(type,data,Object.assign({
    x,y,w,h,barDir:"col",showLegend:false,showValue:true,
    dataLabelFontFace:SANS_SB,dataLabelFontSize:9,dataLabelColor:CHART_D,dataLabelPosition:"outEnd",
    catAxisLabelFontFace:SANS,catAxisLabelFontSize:9,catAxisLabelColor:GRAY,catGridLine:{style:"none"},
    catAxisLineShow:false,valAxisHidden:true,valGridLine:{style:"none"},valAxisLineShow:false,barGapWidthPct:52,
  },opts));
}

/* ===========================================================
   01 COVER — Lox: photo field 2/3 + brand field 1/3
   =========================================================== */
(()=>{ const s=p.addSlide(); bg(s,GRAPH);
  const cut=8.15;
  s.addImage({path:A+"cover_buses.jpeg",x:0,y:0,w:cut,h:H,sizing:{type:"cover",w:cut,h:H}});
  rect(s,0,0,cut,H,GRAPH,70);
  rect(s,cut,0,W-cut,H,GRAPH);
  rect(s,cut,0,0.05,H,ORANGE);
  s.addImage({path:A+"stripes_orange.png",x:W-2.5,y:H-2.5,w:2.5,h:2.5,transparency:38});
  s.addImage({path:A+"mobi_logo_black.png",x:cut+0.72,y:1.62,w:3.5,h:3.5*MOBI_AR});
  rrect(s,cut+0.74,3.15,3.45,0.86,null,{radius:0.06,line:ORANGE,lw:1.5});
  txt(s,"PROJECT COMPASS",{x:cut+0.74,y:3.15,w:3.45,h:0.86,fontFace:SANS_SB,fontSize:18,color:WHITE,align:"center",valign:"middle",charSpacing:2});
  txt(s,"Confidential Information Memorandum",{x:cut+0.74,y:4.22,w:3.45,h:0.32,fontSize:10.5,color:ON_DARK,align:"center"});
  txt(s,"São Paulo  ·  2026",{x:cut+0.74,y:4.58,w:3.45,h:0.3,fontFace:SANS_M,fontSize:9,color:ORANGE,align:"center",charSpacing:1});
  s.addImage({path:A+"igc_white.png",x:W-M-0.58,y:0.42,w:0.58,h:0.58*IGC_AR});
  txt(s,"Urban mobility platform  ·  Midwest & Southeast of Brazil",{x:M,y:H-0.62,w:7,h:0.3,fontFace:SANS_M,fontSize:10,color:"E8ECF1"});
})();

/* =========================================================== 02 DISCLAIMER */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  txt(s,"Disclaimer",{x:M,y:0.5,w:8,h:0.6,fontFace:SANS_SB,fontSize:24,color:GRAPH,valign:"middle"});
  txt(s,"Project Compass",{x:M,y:1.06,w:8,h:0.28,fontFace:SANS_M,fontSize:9,color:ORANGE});
  rect(s,M,1.42,0.9,0.03,ORANGE);
  const c1=[
   "IGC has been retained by MOBI (“Company”; “Mobi”), on an exclusive basis, to advise the Company in its M&A process (“Transaction”). This material (“Information Memorandum”) describes and summarizes the Company, its assets, market and economic and financial indicators and has been prepared exclusively to assist the recipient in deciding whether it wishes to proceed with a further investigation of a possible Transaction with the Company. In no event shall the recipient use any of this information for any commercial purposes or for purposes other than the one for which this memorandum is furnished.",
   "All information contained in this Information Memorandum has been prepared based on the documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or through independent research. IGC has not investigated, verified or audited the documents and information used for its preparation. This Information Memorandum contains statements, estimates and projections provided by the Client concerning anticipated future performance, which may or may not prove to be correct. No representations, expressed or implied, are made as to their accuracy.",
   "This Memorandum of Information is not intended to form any part of the basis of any investment decision or other evaluation, or any decision to participate in the Transaction process, and should not be considered a recommendation by the Company or IGC to any reader. Each reader must make its own valuation of the Transaction in order to determine whether to continue with its participation in the process. No liability is or shall be attributed to the members of IGC, including its partners, directors or employees, in connection with the accuracy or completeness of the information contained herein."];
  const c2=[
   "This material belongs to IGC and shall not be copied, reproduced, distributed and/or disclosed, in whole or in part, including by digital media, to any third party without the express and prior written consent of IGC. By accepting this material, the recipient agrees to return it as soon as requested by IGC, and to maintain strict confidentiality over all information contained herein.",
   "Since the existence of the Transaction is not publicly disclosed and may not be known by members of the Company or third parties, the recipient agrees not to approach or contact any officer, employee, client, supplier or representative of the Company without the express written permission of IGC. In furnishing this material, IGC undertakes no obligation to provide access to additional information, to update it, or to correct any inaccuracies which may become apparent, and reserves the right, at any time and without notice, to change the procedure for the Transaction or terminate negotiations prior to the execution of any binding agreement.",
   "All communications, questions and/or requests regarding this material shall be addressed directly to IGC."];
  const mk=a=>a.map(t=>({text:t,options:{breakLine:true,paraSpaceAfter:9}}));
  txt(s,mk(c1),{x:M,y:1.62,w:5.5,h:3.5,fontSize:7.5,color:"55606D",align:"justify",valign:"top",lineSpacingMultiple:1.16});
  txt(s,mk(c2),{x:6.62,y:1.62,w:5.5,h:3.5,fontSize:7.5,color:"55606D",align:"justify",valign:"top",lineSpacingMultiple:1.16});
  // banker card (Soul disclaimer pattern)
  rrect(s,6.62,5.28,4.72,1.32,GRAPH,{radius:0.1});
  rect(s,6.62,5.52,0.055,0.84,ORANGE);
  txt(s,"Bruno Iervolino",{x:6.88,y:5.42,w:3.6,h:0.3,fontFace:SANS_SB,fontSize:12,color:WHITE});
  txt(s,"IGC Partners",{x:6.88,y:5.7,w:3.6,h:0.24,fontFace:SANS_M,fontSize:9,color:ORANGE});
  txt(s,"Av. Brigadeiro Faria Lima, 2277 — 6th floor\n01452-000  São Paulo – SP    Tel: (55 11) 3815-3533\nbruno.iervolino@igcp.com.br",
      {x:6.88,y:5.94,w:4.2,h:0.62,fontSize:7.5,color:ON_DARK,lineSpacingMultiple:1.2,valign:"top"});
  photoCircle(s,A+"mobi_bus_front.png",11.5,5.5,0.88,{ring:GRAPH});
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.4,w:0.3,h:0.3*IGC_AR});
  s.addText([{text:"2",options:{color:TXT,fontFace:SANS_M}},{text:"    Confidential",options:{color:GRAY_L,fontFace:SANS}}],
    {x:M+0.4,y:H-0.38,w:3,h:0.3,fontSize:9,align:"left",valign:"middle",margin:0});
})();

/* =========================================================== 03 TOC — Introduction */
tocSlide(0,3);

/* =========================================================== 04 AT A GLANCE (Soul quadrants + dark rail) */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"Mobi at a glance",
    subtitle:"An urban mobility platform with +20 years of operations, serving employees of large corporations and residents of condominiums",
    source:"Source: Company management information; Jan-2026 fleet register. (1) Aggregate fleet per Company materials; 373 owned vehicles per the Jan-26 register. (2) Average age per Company materials; ~6 years based on chassis manufacture year — to reconcile with management.",page:4});
  // four quadrant modules
  const qs=[["truck","Essential mobility platform","Route-optimized transportation for corporations and condominiums, underpinning a recurring-revenue model"],
            ["settings","Scaled operational platform","Modern fleet backed by intensive monitoring and telemetry, tailored to each client's needs"],
            ["repeat","Visible, resilient cash flow","Long-term contracts (3–5 years) with built-in price adjustment mechanisms supporting margin resilience"],
            ["mappin","Strategic footprint","Headquarters in Goiânia plus 10 operational bases across Goiás, the Federal District and Minas Gerais"]];
  const qw=3.95, qh=1.42, qx=M, qy=1.95;
  qs.forEach((q,i)=>{
    const x=qx+(i%2)*(qw+0.28), y=qy+Math.floor(i/2)*(qh+0.24);
    rrect(s,x,y,qw,qh,PAPER,{radius:0.08,line:LINE});
    iconChip(s,x+0.22,y+0.24,0.44,q[0]);
    txt(s,q[1],{x:x+0.78,y:y+0.24,w:qw-1.0,h:0.34,fontFace:SANS_SB,fontSize:10.5,color:GRAPH,valign:"middle"});
    txt(s,q[2],{x:x+0.24,y:y+0.68,w:qw-0.48,h:0.6,fontSize:8,color:GRAY,valign:"top",lineSpacingMultiple:1.14});
  });
  // dark KPI rail (Soul)
  const px=M+2*qw+0.56, pw=W-M-px;
  rrect(s,px,qy,pw,qh*2+0.24,GRAPH,{radius:0.1});
  s.addImage({path:A+"stripes_orange.png",x:px+pw-1.5,y:qy+qh*2+0.24-1.5,w:1.5,h:1.5,transparency:72});
  txt(s,"KEY HIGHLIGHTS",{x:px+0.28,y:qy+0.22,w:pw-0.56,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.5});
  const kp=[["BRL 140 Mn","Net revenues 2025"],["BRL 36 Mn","EBITDA 2025 (~26% margin)"],["+50","Clients"],["+400","Vehicles¹"]];
  kp.forEach((k,i)=>{ const y=qy+0.58+i*0.63;
    txt(s,k[0],{x:px+0.28,y,w:pw-0.56,h:0.3,fontFace:SANS_SB,fontSize:15,color:WHITE,valign:"middle"});
    txt(s,k[1],{x:px+0.28,y:y+0.28,w:pw-0.56,h:0.22,fontSize:8,color:MUTE_DARK,valign:"middle"});
    if(i<kp.length-1) rect(s,px+0.28,y+0.54,pw-0.56,0.012,G_LINE);
  });
  // bottom strip: fleet value / age / clients logos
  const by=qy+qh*2+0.52;
  statTile(s,M,by,2.55,0.86,"BRL 200 Mn","Value of the fleet");
  statTile(s,M+2.72,by,2.55,0.86,"4 years","Average fleet age²");
  txt(s,"SELECTED CLIENTS",{x:M+5.6,y:by+0.02,w:3,h:0.22,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const cl=[["heineken","cli_heineken.png"],["roche","cli_roche.png"],["kraftheinz","cli_kraftheinz.png"],["cargill","cli_cargill.png"]];
  cl.forEach((c,i)=>logoCard(s,c[0],c[1],M+5.6+i*1.55,by+0.28,1.42,0.58,{pad:0.13}));
  conclusionBand(s,[["A recurring, contracted mobility platform with ",0],["BRL 140 Mn",1],[" of net revenues and a ",0],["fully-owned fleet",1]],{page:4});
})();

/* =========================================================== 05 WHAT MOBI DOES */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"What Mobi does",
    subtitle:"Mobi operates dedicated employee-transportation contracts (fretamento) — planning, running and monitoring fixed routes on behalf of its clients",
    source:"Source: Company. Illustrative representation of the service model; contract-level operating metrics to be confirmed with management.",page:5,band:true});
  // process chain
  const steps=[["mappin","Route design","Routes, stops and shift windows are planned around each client's sites and headcount"],
               ["truck","Fleet allocation","Dedicated vehicles and drivers are assigned to the contract from the owned fleet"],
               ["activity","Live monitoring","GPS telemetry and driver-fatigue monitoring track every trip across all bases"],
               ["tool","Maintenance","Preventive and corrective maintenance keeps contracted vehicles available"],
               ["barchart","Reporting & billing","Recurring monthly billing with contractual price-adjustment mechanisms"]];
  const cw=2.16, gap=0.24, x0=M, y0=2.05, chh=2.5;
  steps.forEach((st,i)=>{
    const x=x0+i*(cw+gap);
    rrect(s,x,y0,cw,chh,PAPER,{radius:0.08,line:LINE});
    rect(s,x,y0,cw,0.045,ORANGE);
    iconChip(s,x+cw/2-0.26,y0+0.3,0.52,st[0]);
    txt(s,st[1],{x:x+0.14,y:y0+0.95,w:cw-0.28,h:0.34,fontFace:SANS_SB,fontSize:10,color:GRAPH,align:"center",valign:"middle"});
    txt(s,st[2],{x:x+0.16,y:y0+1.32,w:cw-0.32,h:1.0,fontSize:8,color:GRAY,align:"center",valign:"top",lineSpacingMultiple:1.16});
    if(i<steps.length-1) arrow(s,x+cw+0.045,y0+chh/2-0.075,0.15,ORANGE);
  });
  // what it means
  const wy=y0+chh+0.36;
  const notes=[["Dedicated, not shared","Vehicles and drivers are committed to a single client contract, which is what makes revenue recurring and predictable"],
               ["Owned, not leased","100% of the operating fleet is owned, giving Mobi control over service quality, availability and asset value"],
               ["Contracted, not spot","3–5 year contracts with IPCA, collective-bargaining and diesel pass-through clauses protect margin over the cycle"]];
  const nw=(W-2*M-0.5)/3;
  notes.forEach((n,i)=>{ const x=M+i*(nw+0.25);
    arrow(s,x,wy+0.05,0.15);
    txt(s,n[0],{x:x+0.26,y:wy-0.02,w:nw-0.3,h:0.28,fontFace:SANS_SB,fontSize:10,color:ORANGE_D,valign:"middle"});
    txt(s,n[1],{x:x+0.26,y:wy+0.28,w:nw-0.3,h:0.66,fontSize:8,color:GRAY,valign:"top",lineSpacingMultiple:1.16});
  });
  conclusionBand(s,[["A ",0],["dedicated, owned and contracted",1],[" service model — the source of Mobi's revenue visibility",0]],{page:5});
})();

/* =========================================================== 06 TWO CLIENT FRONTS */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"Two client fronts on one operating platform",
    subtitle:"The same fleet, bases and monitoring infrastructure serve corporate employee transportation and condominium residents",
    source:"Source: Company management information; Project Compass teaser. Revenue split between client fronts to be confirmed with management.",page:6,band:true});
  const cw=5.72, y0=2.0, chh=3.35;
  const fronts=[
    {x:M,fill:PAPER,ic:"briefcase",t:"Corporate employee transportation",
     d:"Route-optimized transportation of employees to and from industrial, agribusiness and consumer-goods sites — the core of the platform",
     b:["Blue-chip client base including Heineken, Roche, Kraft Heinz and Cargill","Long-term contracts (3–5 years) with price-adjustment mechanisms","Driven by clients' operational needs and NR-31 compliance requirements"]},
    {x:M+cw+0.29,fill:O_TINT,ic:"home",t:"Condominium & urban mobility",
     d:"Transportation for residents of condominiums, extending the platform beyond the corporate segment using the same operating base",
     b:["Same fleet, operational bases and monitoring standards","Broadens the addressable market beyond corporate contracts","Segment economics to be confirmed with management"]}];
  fronts.forEach(f=>{
    rrect(s,f.x,y0,cw,chh,f.fill,{radius:0.1,line:f.fill===PAPER?LINE:null});
    iconChip(s,f.x+0.3,y0+0.3,0.56,f.ic,{fill:f.fill===PAPER?O_TINT:WHITE});
    txt(s,f.t,{x:f.x+1.0,y:y0+0.32,w:cw-1.3,h:0.52,fontFace:SANS_SB,fontSize:12,color:GRAPH,valign:"middle"});
    txt(s,f.d,{x:f.x+0.32,y:y0+0.98,w:cw-0.64,h:0.6,fontSize:9,color:GRAY,valign:"top",lineSpacingMultiple:1.16});
    f.b.forEach((b,i)=>{ const by=y0+1.68+i*0.53;
      arrow(s,f.x+0.34,by+0.06,0.14);
      txt(s,b,{x:f.x+0.62,y:by-0.03,w:cw-0.96,h:0.48,fontSize:8.5,color:TXT,valign:"top",lineSpacingMultiple:1.14});
    });
  });
  conclusionBand(s,[["One platform, ",0],["two demand pools",1],[" — corporate contracts and condominium mobility",0]],{page:6});
})();

/* =========================================================== 07 OPERATING ENTITIES & MOMENTUM */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"Recent momentum across both operating entities",
    subtitle:"Gross revenue grew +41.3% year-on-year in the first quarter, with both operating entities expanding",
    source:"Source: Company management information. 1Q gross revenue by operating entity, 1Q26 vs. 1Q25. Entity-level scope of operations to be confirmed with management.",page:7,band:true});
  // chart
  rrect(s,M,1.95,7.3,4.25,PAPER,{radius:0.09,line:LINE});
  txt(s,"Gross revenue by operating entity — 1Q25 vs. 1Q26",{x:M+0.32,y:2.12,w:5.6,h:0.3,fontFace:SANS_SB,fontSize:10,color:GRAPH});
  txt(s,"BRL Mn",{x:M+0.32,y:2.42,w:2,h:0.22,fontSize:8,color:GRAY});
  rrect(s,M+5.62,2.1,1.5,0.42,ORANGE,{radius:0.08});
  txt(s,"+41.3% YoY",{x:M+5.62,y:2.1,w:1.5,h:0.42,fontFace:SANS_SB,fontSize:10,color:WHITE,align:"center",valign:"middle"});
  colChart(s,p.ChartType.bar,[
    {name:"1Q25",labels:["AGM Caetano","AGM Alpha"],values:[26.6,4.2]},
    {name:"1Q26",labels:["AGM Caetano","AGM Alpha"],values:[36.2,7.3]}],
    M+0.3,2.72,6.7,3.25,{chartColors:[CHART_LT,ORANGE],showLegend:true,legendPos:"b",legendFontFace:SANS,legendFontSize:8,legendColor:GRAY});
  // entity cards
  const ex=M+7.6, ew=W-M-ex;
  const ents=[["AGM Caetano","Core operating entity","26.6","36.2","+36%"],
              ["AGM Alpha","Matriz Brasília","4.2","7.3","+74%"]];
  ents.forEach((e,i)=>{ const y=1.95+i*2.2;
    rrect(s,ex,y,ew,2.05,i?GRAPH:PAPER,{radius:0.09,line:i?null:LINE});
    txt(s,e[0],{x:ex+0.28,y:y+0.2,w:ew-0.56,h:0.3,fontFace:SANS_SB,fontSize:12,color:i?WHITE:GRAPH});
    txt(s,e[1],{x:ex+0.28,y:y+0.52,w:ew-0.56,h:0.24,fontSize:8.5,color:i?MUTE_DARK:GRAY});
    txt(s,[{text:"BRL "+e[3]+" Mn",options:{fontFace:SANS_SB,fontSize:15,color:i?WHITE:GRAPH}},
           {text:"   1Q26",options:{fontSize:8,color:i?MUTE_DARK:GRAY}}],
        {x:ex+0.28,y:y+1.02,w:ew-0.56,h:0.36,valign:"middle",margin:0});
    rrect(s,ex+0.28,y+1.48,1.15,0.32,ORANGE,{radius:0.06});
    txt(s,e[4]+" YoY",{x:ex+0.28,y:y+1.48,w:1.15,h:0.32,fontFace:SANS_SB,fontSize:9,color:WHITE,align:"center",valign:"middle"});
    txt(s,"from BRL "+e[2]+" Mn in 1Q25",{x:ex+1.52,y:y+1.48,w:ew-1.8,h:0.32,fontSize:8,color:i?MUTE_DARK:GRAY,valign:"middle"});
  });
  conclusionBand(s,[["Both entities growing — a combined ",0],["+41.3% YoY",1],[" in 1Q gross revenue",0]],{page:7});
})();

/* =========================================================== 08 MARKET CONTEXT */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"A structurally supported corporate mobility market",
    subtitle:"Demand for outsourced employee transportation is underpinned by regulation, labour scarcity and client operating needs",
    source:"Source: Company; press research. NR-31 = Brazilian rural-labour safety regulation governing worker transport. Market sizing and share data to be developed with management.",page:8,band:true});
  const dr=[["shield","Regulatory requirement","NR-31 and related labour regulations require compliant employee transport where adequate public transit is unavailable, making the service non-discretionary for many industrial and agribusiness sites"],
            ["users","Professional driver shortage","A national shortage of qualified professional drivers raises the barrier to entry and favours operators that can recruit, train and retain drivers at scale"],
            ["briefcase","Outsourcing of non-core logistics","Corporations increasingly outsource employee transportation to specialised operators rather than running fleets in-house, converting fixed assets into contracted service costs"],
            ["layers","Fragmented supplier base","The Brazilian fretamento market remains highly fragmented among small regional operators, creating consolidation opportunity for platforms with scale and governance"]];
  const cw=(W-2*M-0.72)/4, y0=2.0, chh=3.42;
  dr.forEach((d,i)=>{ const x=M+i*(cw+0.24);
    rrect(s,x,y0,cw,chh,PAPER,{radius:0.09,line:LINE});
    rect(s,x,y0,cw,0.045,ORANGE);
    iconChip(s,x+0.24,y0+0.3,0.5,d[0]);
    txt(s,d[1],{x:x+0.22,y:y0+0.92,w:cw-0.44,h:0.5,fontFace:SANS_SB,fontSize:10,color:GRAPH,valign:"top",lineSpacingMultiple:1.1});
    txt(s,d[2],{x:x+0.22,y:y0+1.46,w:cw-0.44,h:1.8,fontSize:8,color:GRAY,valign:"top",lineSpacingMultiple:1.18});
  });
  // footprint stat strip
  const by=y0+chh+0.32;
  const st=[["+20 years","of operations"],["3 states","GO · DF · MG"],["10 bases","plus headquarters"],["100%","owned fleet"]];
  const sw=(W-2*M-0.72)/4;
  st.forEach((t,i)=>{ const x=M+i*(sw+0.24);
    txt(s,t[0],{x,y:by,w:sw,h:0.34,fontFace:SANS_SB,fontSize:16,color:ORANGE,valign:"middle"});
    txt(s,t[1],{x,y:by+0.32,w:sw,h:0.24,fontSize:8.5,color:GRAY,valign:"middle"});
  });
  conclusionBand(s,[["Demand is ",0],["structural, not cyclical",1],[" — and the supplier base is fragmented",0]],{page:8});
})();

/* =========================================================== 09 TOC — Investment Thesis */
tocSlide(1,9);

/* =========================================================== 10 THESIS OVERVIEW */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",title:"Mobi is well positioned for continued growth",
    subtitle:"A resilient, contracted business model supported by strong structural value drivers",
    source:"Source: Company; press research. NR-31 = Brazilian rural-labour safety regulation on worker transport.",page:10});
  const th=[["Essential mobility platform in a structurally growing market","Consistent demand from corporations and condominiums, a national driver shortage and labour regulations (NR-31) sustain recurring demand"],
            ["Solid, contracted revenue model with high stickiness","Long-term contracts (3–5 years) with IPCA, collective-bargaining and diesel pass-through adjustments protecting margins"],
            ["An asset base that compounds competitive advantage","A modern, 100% owned fleet of 373 vehicles creating operational flexibility and hard-to-replicate barriers"],
            ["Integrated capabilities delivering a full-service edge","GPS telemetry and driver monitoring, with in-house maintenance [TBC], for a high-uptime operation"],
            ["Multiple, executable growth avenues","Geographic expansion, fleet electrification, technology-enabled services and consolidation of a fragmented market"]];
  const y0=1.92, rh=0.84;
  th.forEach((t,i)=>{ const y=y0+i*rh, d=0.46;
    s.addShape(p.ShapeType.ellipse,{x:M,y:y+0.06,w:d,h:d,fill:{color:ORANGE},line:{type:"none"}});
    txt(s,String(i+1),{x:M,y:y+0.06,w:d,h:d,fontFace:SANS_SB,fontSize:14,color:WHITE,align:"center",valign:"middle"});
    txt(s,[{text:t[0],options:{fontFace:SANS_SB,color:GRAPH}},{text:"  —  ",options:{color:ORANGE}},{text:t[1],options:{color:GRAY}}],
      {x:M+0.66,y:y-0.02,w:7.5,h:0.74,fontSize:9.5,valign:"middle",lineSpacingMultiple:1.16,margin:0});
    if(i<th.length-1) rect(s,M+0.66,y+rh-0.08,7.5,0.01,LINE);
  });
  photoCircle(s,A+"mobi_microbus.png",9.74,2.05,2.10);
  photoCircle(s,A+"mobi_bus_front.png",9.20,4.42,1.50);
  photoCircle(s,A+"mobi_van.png",10.90,4.42,1.50);
})();

/* =========================================================== 11 PILLAR 1 — CLIENTS */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:1,title:"A solid track record with blue-chip clients",
    subtitle:"Long-term contracts across industrial, agribusiness and consumer-goods sectors — serving +50 clients",
    source:"Source: Company. Client relationship metrics (contracts delivered, years of relationship, share of revenue) to be confirmed with management.",page:11,band:true});
  txt(s,"SELECTED CLIENTS",{x:M,y:1.95,w:5,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const cl=[["heineken","cli_heineken.png"],["roche","cli_roche.png"],["kraftheinz","cli_kraftheinz.png"],
            ["cargill","cli_cargill.png"],["votorantim","cli_votorantim.png"],["jbs","cli_jbs.png"],["mbrf","cli_mbrf.png"]];
  const lw=2.28, lh=1.02;
  cl.forEach((c,i)=>logoCard(s,c[0],c[1],M+(i%3)*(lw+0.2),2.28+Math.floor(i/3)*(lh+0.2),lw,lh,{pad:0.2}));
  // right rail
  const rx=M+3*lw+0.4+0.5, rw=W-M-rx;
  txt(s,"PORTFOLIO CHARACTERISTICS",{x:rx,y:1.95,w:rw,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const pc=[["users","+50","clients served"],["clock","3–5 years","average contract term"],
            ["repeat","Recurring","revenue contract model"],["barchart","[XXX]","of contract backlog"]];
  pc.forEach((t,i)=>{ const y=2.28+i*0.86;
    rrect(s,rx,y,rw,0.72,PAPER,{radius:0.07,line:LINE});
    iconChip(s,rx+0.18,y+0.14,0.44,t[0]);
    txt(s,t[1],{x:rx+0.76,y:y+0.08,w:rw-0.95,h:0.34,fontFace:SANS_SB,fontSize:12,color:GRAPH,valign:"middle"});
    txt(s,t[2],{x:rx+0.76,y:y+0.4,w:rw-0.95,h:0.24,fontSize:8,color:GRAY,valign:"middle"});
  });
  conclusionBand(s,[["A recurring, contracted revenue base with ",0],["blue-chip clients",1],[" underpins visibility and resilience",0]],{page:11});
})();

/* =========================================================== 12 PILLAR 2 — CONTRACT MODEL */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:2,title:"A contracted revenue model built for stickiness",
    subtitle:"Long-term contracts with built-in adjustment mechanisms transfer the main cost risks and protect margin over the cycle",
    source:"Source: Company. Contract terms per Company materials; contract-level economics and backlog to be confirmed with management. IPCA = Brazilian consumer price index; CBA = collective bargaining agreement.",page:12,band:true});
  // adjustment mechanisms
  txt(s,"BUILT-IN PRICE ADJUSTMENT MECHANISMS",{x:M,y:1.92,w:6,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const adj=[["trendup","IPCA","General inflation indexation applied to the contract value"],
             ["users","Collective bargaining","Driver wage increases negotiated sector-wide are passed through"],
             ["zap","Diesel variation","Fuel price movements — the largest variable cost — are passed through"]];
  const aw=(7.5-0.4)/3;
  adj.forEach((a,i)=>{ const x=M+i*(aw+0.2);
    rrect(s,x,2.24,aw,1.62,PAPER,{radius:0.08,line:LINE});
    rect(s,x,2.24,aw,0.04,ORANGE);
    iconChip(s,x+aw/2-0.24,2.46,0.48,a[0]);
    txt(s,a[1],{x:x+0.12,y:3.02,w:aw-0.24,h:0.3,fontFace:SANS_SB,fontSize:10.5,color:GRAPH,align:"center",valign:"middle"});
    txt(s,a[2],{x:x+0.14,y:3.34,w:aw-0.28,h:0.48,fontSize:8,color:GRAY,align:"center",valign:"top",lineSpacingMultiple:1.14});
  });
  // stickiness drivers
  txt(s,"WHY CLIENTS RENEW",{x:M,y:4.06,w:6,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const wh=[["Operational embedding","Routes, shift windows and stops are designed around the client's own operation — switching supplier means redesigning it"],
            ["Compliance exposure","Employee transport carries labour and safety obligations; an established, compliant operator lowers the client's risk"],
            ["Dedicated assets","Vehicles and drivers are committed to the contract, so service continuity does not depend on spot capacity"]];
  wh.forEach((t,i)=>{ const y=4.38+i*0.62;
    arrow(s,M,y+0.07,0.15);
    txt(s,[{text:t[0]+"  —  ",options:{fontFace:SANS_SB,color:GRAPH}},{text:t[1],options:{color:GRAY}}],
      {x:M+0.26,y,w:7.2,h:0.56,fontSize:8.5,valign:"top",lineSpacingMultiple:1.14,margin:0});
  });
  // right dark panel
  const px=M+7.7, pw=W-M-px;
  rrect(s,px,1.92,pw,4.3,GRAPH,{radius:0.1});
  s.addImage({path:A+"stripes_orange.png",x:px+pw-1.4,y:1.92+4.3-1.4,w:1.4,h:1.4,transparency:74});
  txt(s,"CONTRACT PROFILE",{x:px+0.28,y:2.14,w:pw-0.56,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const cp=[["3–5 years","Typical contract term"],["Monthly","Recurring billing cycle"],["Dedicated","Vehicles and drivers per contract"],["[XXX]","Contract backlog"],["[XXX]","Contracts executed recently"]];
  cp.forEach((c,i)=>{ const y=2.52+i*0.73;
    txt(s,c[0],{x:px+0.28,y,w:pw-0.56,h:0.32,fontFace:SANS_SB,fontSize:14,color:WHITE,valign:"middle"});
    txt(s,c[1],{x:px+0.28,y:y+0.3,w:pw-0.56,h:0.22,fontSize:8,color:MUTE_DARK,valign:"middle"});
    if(i<cp.length-1) rect(s,px+0.28,y+0.6,pw-0.56,0.012,G_LINE);
  });
  conclusionBand(s,[["Contracts that ",0],["pass through the main cost risks",1],[" and are costly for clients to unwind",0]],{page:12});
})();

/* =========================================================== 13 PILLAR 3 — FLEET */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:3,title:"A modern, fully-owned fleet tailored to client needs",
    subtitle:"373 owned vehicles across buses, micro-buses and vans, sourced from leading chassis brands",
    source:"Source: Company; Jan-2026 fleet register. (1) Average age per Company materials; ~6 years based on chassis manufacture year — to reconcile with management. (2) 373 owned vehicles per the Jan-26 register; +400 aggregate fleet per Company materials. (3) Value of the fleet per Company materials.",page:13,band:true});
  // dark highlights panel
  const px=M, pw=3.0;
  rrect(s,px,1.95,pw,3.6,GRAPH,{radius:0.1});
  rect(s,px,2.25,0.055,3.0,ORANGE);
  txt(s,"HIGHLIGHTS",{x:px+0.3,y:2.12,w:pw-0.6,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const hl=[["4 years","Average fleet age¹"],["+400","Vehicles²"],["BRL 200 Mn","Value of the fleet³"],["100%","Owned fleet"]];
  hl.forEach((t,i)=>{ const y=2.52+i*0.76;
    txt(s,t[0],{x:px+0.3,y,w:pw-0.6,h:0.36,fontFace:SANS_SB,fontSize:16,color:WHITE,valign:"middle"});
    txt(s,t[1],{x:px+0.3,y:y+0.34,w:pw-0.6,h:0.22,fontSize:8,color:MUTE_DARK,valign:"middle"});
  });
  // composition bars
  const bx=px+pw+0.42, bw=4.6;
  txt(s,"FLEET COMPOSITION  (OWNED, JAN-26)",{x:bx,y:1.95,w:bw,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const comp=[["Bus",223],["Micro-bus",74],["Van",55],["Support vehicle",17],["Truck",2],["Pickup truck",2]];
  const mx=223;
  comp.forEach((c,i)=>{ const y=2.34+i*0.55;
    txt(s,c[0],{x:bx,y,w:2.3,h:0.24,fontSize:9,color:TXT,valign:"middle"});
    txt(s,c[1]+" un.",{x:bx+bw-1.1,y,w:1.1,h:0.24,fontFace:SANS_SB,fontSize:9,color:GRAPH,align:"right",valign:"middle"});
    rrect(s,bx,y+0.28,bw,0.14,PAPER2,{radius:0.07});
    rrect(s,bx,y+0.28,Math.max(0.14,bw*c[1]/mx),0.14,ORANGE,{radius:0.07});
  });
  // chassis brands
  const rx=bx+bw+0.45, rw=W-M-rx;
  photoCircle(s,A+"mobi_van.png",rx+rw/2-0.65,1.98,1.30);
  txt(s,"LEADING CHASSIS & EQUIPMENT BRANDS",{x:rx,y:3.48,w:rw,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const br=[["mercedes","br_mercedes.png"],["volvo","br_volvo.png"],["scania","br_scania.png"],
            ["ford","br_ford.png"],["hyundai","br_hyundai.png"],["cat","br_cat.png"]];
  const bwid=(rw-0.16)/2, bhei=0.68;
  br.forEach((b,i)=>logoCard(s,b[0],b[1],rx+(i%2)*(bwid+0.16),3.80+Math.floor(i/2)*(bhei+0.14),bwid,bhei,{pad:0.11}));
  conclusionBand(s,[["A ",0],["fully-owned, modern fleet",1],[" creates operational flexibility and barriers that are hard to replicate",0]],{page:13});
})();

/* =========================================================== 14 PILLAR 4 — TECHNOLOGY */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:4,title:"Technology-enabled operations support high reliability",
    subtitle:"GPS telemetry, driver monitoring and operational discipline keep the fleet running reliably across all bases",
    source:"Source: Company. Availability and preventive-maintenance metrics, and the scope of in-house maintenance, to be confirmed with management.",page:14,band:true});
  const gw=(W-2*M-0.3)/2, gh=1.94;
  const grp=[["activity","GPS Telemetry & Driver Monitoring","GPS-based tracking and AI-powered driver-fatigue monitoring provide continuous oversight across all bases",[["ituran","sw_ituran.png"],["vtraxx","sw_vtraxx.png"]]],
             ["cpu","ERP & Management","TOTVS Protheus underpins enterprise resource planning and back-office control",[["totvs","sw_totvs.png"]]],
             ["tool","Fleet & Maintenance Management","Specialized systems manage maintenance workflows, parts and fleet operations",[["truckscontrol","sw_truckscontrol.png"],["zion","sw_zion.png"],["opensystem","sw_opensystem.png"],["monaco","sw_monaco.png"]]],
             ["shield","Safety, PPE & Inspection","Digital checklists, PPE control and safety management reinforce operational discipline",[["sisma","sw_sisma.png"],["onsafety","sw_onsafety.png"],["checklistfacil","sw_checklistfacil.png"]]]];
  grp.forEach((g,i)=>{ const x=M+(i%2)*(gw+0.3), y=1.95+Math.floor(i/2)*(gh+0.24);
    rrect(s,x,y,gw,gh,PAPER,{radius:0.09,line:LINE});
    iconChip(s,x+0.26,y+0.24,0.5,g[0]);
    txt(s,g[1],{x:x+0.86,y:y+0.24,w:gw-1.1,h:0.5,fontFace:SANS_SB,fontSize:10.5,color:GRAPH,valign:"middle",lineSpacingMultiple:1.08});
    txt(s,g[2],{x:x+0.28,y:y+0.78,w:gw-0.56,h:0.42,fontSize:8,color:GRAY,valign:"top",lineSpacingMultiple:1.16});
    const n=g[3].length, cwid=Math.min(1.34,(gw-0.56)/n-0.09);
    g[3].forEach((l,j)=>logoCard(s,l[0],l[1],x+0.28+j*(cwid+0.09),y+1.26,cwid,0.6,{pad:0.1,fill:WHITE}));
  });
  conclusionBand(s,[["Intensive ",0],["monitoring and telemetry",1],[" ensure a high level of service across the network",0]],{page:14});
})();

/* =========================================================== 15 PILLAR 5 — GROWTH */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:5,title:"Multiple avenues for continued value creation",
    subtitle:"Geographic expansion, consolidation and fleet electrification position Mobi for a sustained growth trajectory",
    source:"Source: Company; press research. Growth avenues to be validated with management.",page:15,band:true});
  const av=[["A","mappin","Deepen share & expand geographically",
             ["Grow wallet share with existing clients and win new logos","Expand within the GO–DF–MG corridor and selectively into adjacent regions","Leverage the existing base network to serve new sites"]],
            ["B","zap","Electrification & tech-enabled services",
             ["Gradual fleet electrification aligned to clients' ESG and Scope-3 goals","A technology layer — route optimization, booking apps, carbon dashboards","Driver capacitation and retention programmes addressing the labour bottleneck"]],
            ["C","layers","Consolidate a fragmented market",
             ["A highly fragmented Brazilian market with consolidation already underway","Mobi's scale and track record position it as a natural consolidation platform","Selective acquisition of smaller regional fretamento operators"]]];
  const cw=(W-2*M-0.56)/3, y0=1.95, chh=3.9;
  av.forEach((a,i)=>{ const x=M+i*(cw+0.28);
    rrect(s,x,y0,cw,chh,PAPER,{radius:0.1,line:LINE});
    rect(s,x,y0,cw,0.05,ORANGE);
    iconChip(s,x+0.28,y0+0.32,0.54,a[1]);
    txt(s,a[0],{x:x+cw-0.72,y:y0+0.3,w:0.5,h:0.5,fontFace:SANS_SB,fontSize:20,color:O_TINT2,align:"right",valign:"middle"});
    txt(s,a[2],{x:x+0.28,y:y0+1.0,w:cw-0.56,h:0.66,fontFace:SANS_SB,fontSize:11,color:GRAPH,valign:"top",lineSpacingMultiple:1.1});
    a[3].forEach((b,j)=>{ const by=y0+1.78+j*0.72;
      arrow(s,x+0.3,by+0.05,0.13);
      txt(s,b,{x:x+0.56,y:by-0.03,w:cw-0.86,h:0.66,fontSize:8,color:GRAY,valign:"top",lineSpacingMultiple:1.16});
    });
  });
  conclusionBand(s,[["A clear and ",0],["executable path",1],[" for continued value creation",0]],{page:15});
})();

/* =========================================================== 16 TOC — Company Overview */
tocSlide(2,16);

/* =========================================================== 17 TRACK RECORD */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"A track record built over more than 20 years",
    subtitle:"Mobi has +20 years of experience in urban mobility and corporate employee transportation",
    source:"Source: Company. Foundation year and milestone dates to be confirmed with management.",page:17,band:true});
  const tl=[["[Year TBC]","Foundation of Mobi",0],["[Year]","[Milestone — TBC]",0],["[Year]","[Milestone — TBC]",0],
            ["2025","BRL 140 Mn net revenues",1],["2026E","Positioned for continued growth",2]];
  const cw=(W-2*M-4*0.26)/5, y0=2.15, chh=2.15;
  tl.forEach((t,i)=>{ const x=M+i*(cw+0.26);
    const dark=t[2]===2, hot=t[2]===1;
    rrect(s,x,y0,cw,chh,dark?GRAPH:(hot?ORANGE:O_TINT),{radius:0.1});
    txt(s,t[0],{x:x+0.24,y:y0+0.28,w:cw-0.48,h:0.42,fontFace:SANS_SB,fontSize:16,
      color:dark?WHITE:(hot?WHITE:ORANGE_D),valign:"middle"});
    rect(s,x+0.24,y0+0.78,0.7,0.03,dark?ORANGE:(hot?WHITE:ORANGE));
    txt(s,t[1],{x:x+0.24,y:y0+0.94,w:cw-0.48,h:0.9,fontSize:9,
      color:dark?ON_DARK:(hot?WHITE:TXT),valign:"top",lineSpacingMultiple:1.16});
    if(i<tl.length-1) arrow(s,x+cw+0.055,y0+chh/2-0.075,0.15,ORANGE);
  });
  // supporting stats
  const by=y0+chh+0.45;
  const st=[["+20","years of operations"],["+50","clients served"],["373","owned vehicles"],["10","operational bases"],["3","states covered"]];
  const sw=(W-2*M-4*0.26)/5;
  st.forEach((t,i)=>{ const x=M+i*(sw+0.26);
    rrect(s,x,by,sw,0.82,PAPER,{radius:0.07,line:LINE});
    txt(s,t[0],{x:x+0.2,y:by+0.1,w:sw-0.4,h:0.36,fontFace:SANS_SB,fontSize:16,color:GRAPH,valign:"middle"});
    txt(s,t[1],{x:x+0.2,y:by+0.46,w:sw-0.4,h:0.24,fontSize:8,color:GRAY,valign:"middle"});
  });
  conclusionBand(s,[["More than ",0],["two decades",1],[" of disciplined operation, positioned for its next phase of growth",0]],{page:17});
})();

/* =========================================================== 18 FOOTPRINT */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Strategically positioned across the Midwest and Southeast",
    subtitle:"From its Goiânia headquarters to 10 operational bases across Goiás, the Federal District and Minas Gerais",
    source:"Source: Company; Jan-2026 fleet register.",page:18});
  s.addImage({path:A+"brazil_map.png",x:M,y:1.95,w:3.5,h:3.5/1.065});
  rect(s,M+0.05,5.42,0.16,0.16,ORANGE);
  txt(s,"States with operational bases",{x:M+0.3,y:5.38,w:3,h:0.24,fontSize:8,color:GRAY,valign:"middle"});
  const rx=M+3.85, rw=W-M-rx;
  // HQ card
  rrect(s,rx,1.95,rw,0.92,GRAPH,{radius:0.09});
  rect(s,rx,1.95,0.055,0.92,ORANGE);
  iconChip(s,rx+0.28,2.14,0.54,"home",{fill:G_PANEL,color:"orange"});
  txt(s,"Headquarters — Goiânia, GO",{x:rx+1.0,y:2.1,w:rw-1.2,h:0.3,fontFace:SANS_SB,fontSize:11,color:WHITE});
  txt(s,"Corporate HQ (Garagem Central) centralizing fleet management, monitoring infrastructure and administration",
      {x:rx+1.0,y:2.4,w:rw-1.25,h:0.4,fontSize:8,color:MUTE_DARK,valign:"top",lineSpacingMultiple:1.14});
  txt(s,"10 ACTIVE OPERATIONAL BASES",{x:rx,y:3.02,w:rw,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const bs=[["Anápolis – GO","Largest base outside HQ, supporting fleet availability across the Goiás corridor"],
            ["Brasília – DF","Garagem BSB supporting operations across the Federal District"],
            ["Senador Canedo – GO","Support base close to client sites, enabling faster response times"],
            ["Uberlândia – MG","Serving the Triângulo Mineiro region with strong execution oversight"]];
  bs.forEach((b,i)=>{ const y=3.34+i*0.62;
    iconChip(s,rx,y,0.36,"mappin",{fill:O_TINT});
    txt(s,b[0],{x:rx+0.5,y:y-0.03,w:rw-0.6,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:GRAPH,valign:"middle"});
    txt(s,b[1],{x:rx+0.5,y:y+0.21,w:rw-0.6,h:0.3,fontSize:8,color:GRAY,valign:"top"});
  });
  txt(s,"Further bases: Nerópolis, Alexânia, Rio Verde, Pires do Rio and Itumbiara",
      {x:rx,y:5.86,w:rw,h:0.26,fontFace:SANS_M,fontSize:8.5,color:ORANGE_D,valign:"middle"});
  // stat strip
  const st=[["1","Headquarters"],["10","Operational bases"],["3","States covered"],["373","Owned vehicles"]];
  const sw=(3.5)/2;
  st.forEach((t,i)=>{ const x=M+(i%2)*(sw+0.0), y=5.72+Math.floor(i/2)*0.55;
    txt(s,t[0],{x,y,w:sw,h:0.3,fontFace:SANS_SB,fontSize:14,color:ORANGE,valign:"middle"});
    txt(s,t[1],{x:x+0.62,y,w:sw-0.62,h:0.3,fontSize:8,color:GRAY,valign:"middle"});
  });
})();

/* =========================================================== 19 OPERATING MODEL */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"A recurring, contract-based operating model",
    subtitle:"Revenue is generated through long-term transportation contracts operated across two entities and a network of bases",
    source:"Source: Company. Revenue split and contract economics to be confirmed with management.",page:19,band:true});
  const cards=[[A+"mobi_microbus.png","Dedicated fleet contracts","Long-term contracts (3–5 years) providing dedicated vehicles, drivers and routes, billed on a recurring monthly basis"],
               [A+"mobi_bus_front.png","Route & shift management","Transportation planned around client shifts, sites and condominium routes, with telemetry ensuring reliability and safety"],
               [A+"mobi_van.png","Two operating entities","Revenue consolidated across AGM Caetano and AGM Alpha, together reaching BRL 140 Mn of net revenues in 2025"]];
  const cw=(W-2*M-0.56)/3, y0=2.0;
  cards.forEach((c,i)=>{ const x=M+i*(cw+0.28);
    photoCircle(s,c[0],x+cw/2-0.78,y0,1.56,{badge:i+1});
    rrect(s,x,y0+1.82,cw,2.35,PAPER,{radius:0.09,line:LINE});
    txt(s,c[1],{x:x+0.24,y:y0+2.0,w:cw-0.48,h:0.34,fontFace:SANS_SB,fontSize:11,color:GRAPH,align:"center",valign:"middle"});
    txt(s,c[2],{x:x+0.26,y:y0+2.42,w:cw-0.52,h:1.6,fontSize:8.5,color:GRAY,align:"center",valign:"top",lineSpacingMultiple:1.16});
  });
  conclusionBand(s,[["Revenue anchored in ",0],["dedicated, long-term contracts",1],[" across a network of operational bases",0]],{page:19});
})();

/* =========================================================== 20–22 SUCCESS CASES (Soul series template) */
const CASES=[
  {n:"Cargill",key:"cargill",file:"cli_cargill.png",sector:"Agribusiness & food ingredients"},
  {n:"JBS",key:"jbs",file:"cli_jbs.png",sector:"Protein & food processing"},
  {n:"Votorantim Cimentos",key:"votorantim",file:"cli_votorantim.png",sector:"Cement & building materials"}];
CASES.forEach((c,idx)=>{
  const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Success case: "+c.n+" operation",
    subtitle:"An illustrative long-term client relationship — contract values, terms and milestones to be confirmed with the Company",
    source:"Source: Company — relationship details, contract values and milestone dates to be confirmed with management.",page:20+idx,band:true});
  // left rail listing all cases, active highlighted (Soul)
  const rw=2.5, y0=1.95, rh=4.28;
  rrect(s,M,y0,rw,rh,GRAPH,{radius:0.1});
  txt(s,"SUCCESS CASES",{x:M+0.26,y:y0+0.24,w:rw-0.52,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  CASES.forEach((cc,j)=>{ const y=y0+0.66+j*0.92, on=(j===idx);
    if(on){ rrect(s,M+0.16,y,rw-0.32,0.78,ORANGE,{radius:0.07}); }
    arrow(s,M+0.3,y+0.31,0.15,on?WHITE:"4A5563");
    txt(s,cc.n,{x:M+0.56,y:y+0.08,w:rw-0.78,h:0.3,fontFace:on?SANS_SB:SANS_M,fontSize:10,color:on?WHITE:"8B95A5",valign:"middle"});
    txt(s,cc.sector,{x:M+0.56,y:y+0.36,w:rw-0.78,h:0.32,fontSize:7.5,color:on?"FBD9C6":"5C6674",valign:"top",lineSpacingMultiple:1.1});
  });
  logoCard(s,c.key,c.file,M+0.26,y0+rh-1.0,rw-0.52,0.74,{pad:0.12,fill:WHITE,border:null});
  // right detail
  const dx=M+rw+0.4, dw=W-M-dx;
  const half=(dw-0.28)/2;
  [["Start of contract","BRL [XXX]k","of total value","[X] months","of total term"],
   ["Current contract","BRL [XXX] Mn","of total value","[X] years","of total term"]].forEach((b,i)=>{
    const x=dx+i*(half+0.28);
    rrect(s,x,y0,half,1.72,i?O_TINT:PAPER,{radius:0.09,line:i?null:LINE});
    txt(s,b[0].toUpperCase(),{x:x+0.26,y:y0+0.2,w:half-0.52,h:0.24,fontFace:SANS_SB,fontSize:8,color:i?ORANGE_D:GRAY,charSpacing:1.3});
    txt(s,b[1],{x:x+0.26,y:y0+0.5,w:half-0.52,h:0.4,fontFace:SANS_SB,fontSize:16,color:GRAPH,valign:"middle"});
    txt(s,b[2],{x:x+0.26,y:y0+0.88,w:half-0.52,h:0.22,fontSize:8,color:GRAY});
    txt(s,b[3],{x:x+0.26,y:y0+1.14,w:half-0.52,h:0.3,fontFace:SANS_SB,fontSize:12,color:ORANGE_D,valign:"middle"});
    txt(s,b[4],{x:x+1.5,y:y0+1.14,w:half-1.7,h:0.3,fontSize:8,color:GRAY,valign:"middle"});
  });
  txt(s,"RELATIONSHIP TIMELINE",{x:dx,y:y0+1.96,w:dw,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  rect(s,dx+0.1,y0+2.62,dw-0.4,0.025,LINE);
  for(let k=0;k<4;k++){ const x=dx+0.1+k*((dw-0.4)/3.35);
    s.addShape(p.ShapeType.ellipse,{x:x-0.075,y:y0+2.55,w:0.15,h:0.15,fill:{color:ORANGE},line:{type:"none"}});
    txt(s,"[Mon-YY]",{x:x-0.5,y:y0+2.28,w:1.0,h:0.22,fontFace:SANS_M,fontSize:8,color:GRAPH,align:"center",valign:"middle"});
    txt(s,"[Milestone — TBC]",{x:x-0.62,y:y0+2.78,w:1.24,h:0.44,fontSize:7.5,color:GRAY,align:"center",valign:"top",lineSpacingMultiple:1.1});
  }
  rrect(s,dx,y0+3.44,dw,0.8,PAPER,{radius:0.08,line:LINE});
  txt(s,"[Service scope — to be confirmed with the Company]",{x:dx+0.26,y:y0+3.56,w:dw-0.52,h:0.26,fontFace:SANS_M,fontSize:9,color:ORANGE_D});
  txt(s,"[Relationship highlights, contracted routes and headcount served to be confirmed]",{x:dx+0.26,y:y0+3.82,w:dw-0.52,h:0.3,fontSize:8,color:GRAY});
  conclusionBand(s,[["A ",0],["long-standing relationship",1],[" with "+c.n+" — details to be confirmed with the Company",0]],{page:20+idx});
});

/* =========================================================== 23 MANAGEMENT */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"An experienced and committed management team",
    subtitle:"Management team overview — names, roles and backgrounds to be confirmed with the Company",
    source:"Source: Company. Roles and backgrounds to be confirmed with management.",page:23});
  const mg=[["Antônio Gabriel","AG",0],["Morgana","M",1],["Pedro","P",0],["Gabriela","G",1],["[Name TBC]","?",0]];
  const gw=(W-2*M-4*0.28)/5, y0=2.1;
  mg.forEach((m,i)=>{ const x=M+i*(gw+0.28), d=1.24;
    rrect(s,x,y0,gw,4.2,PAPER,{radius:0.1,line:LINE});
    s.addShape(p.ShapeType.ellipse,{x:x+gw/2-d/2,y:y0+0.32,w:d,h:d,fill:{color:m[2]?ORANGE:GRAPH},line:{type:"none"}});
    txt(s,m[1],{x:x+gw/2-d/2,y:y0+0.32,w:d,h:d,fontFace:SANS_SB,fontSize:28,color:WHITE,align:"center",valign:"middle"});
    txt(s,m[0],{x:x+0.12,y:y0+1.72,w:gw-0.24,h:0.3,fontFace:SANS_SB,fontSize:10.5,color:GRAPH,align:"center",valign:"middle"});
    txt(s,"[Role — TBC]",{x:x+0.12,y:y0+2.02,w:gw-0.24,h:0.26,fontFace:SANS_M,fontSize:9,color:ORANGE,align:"center",valign:"middle"});
    rect(s,x+gw/2-0.4,y0+2.36,0.8,0.02,LINE);
    txt(s,"[Background — to be\nconfirmed with the\nCompany]",{x:x+0.16,y:y0+2.56,w:gw-0.32,h:1.4,fontSize:8,color:GRAY,align:"center",valign:"top",lineSpacingMultiple:1.2});
  });
})();

/* =========================================================== 24 CORPORATE STRUCTURE */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Organization & corporate structure",
    subtitle:"Multi-entity structure (Grupo AGM Caetano / AGM Alpha) — simplified representation, to be confirmed",
    source:"Source: Company. Simplified representation; entities and ownership to be confirmed with management.",page:24});
  const cx=W/2;
  // shareholders
  rrect(s,cx-1.55,1.95,3.1,0.5,ORANGE,{radius:0.07});
  txt(s,"Family Shareholders",{x:cx-1.55,y:1.95,w:3.1,h:0.5,fontFace:SANS_SB,fontSize:10,color:WHITE,align:"center",valign:"middle"});
  rect(s,cx-0.01,2.45,0.022,0.34,"C3CAD3");
  // holding
  rrect(s,cx-1.9,2.79,3.8,0.68,GRAPH,{radius:0.08});
  txt(s,"AGM Caetano Participações",{x:cx-1.9,y:2.86,w:3.8,h:0.3,fontFace:SANS_SB,fontSize:10.5,color:WHITE,align:"center",valign:"middle"});
  txt(s,"Holding company",{x:cx-1.9,y:3.14,w:3.8,h:0.24,fontSize:8,color:MUTE_DARK,align:"center",valign:"middle"});
  rect(s,cx-0.01,3.47,0.022,0.36,"C3CAD3");
  // operating entities
  const ents=[["AGM Caetano LTDA","Operating entity"],["MOBI Alpha","Matriz Brasília"],["Moura e Carrilho Part.","[Related party]"]];
  const ew=3.5, tot=3*ew+2*0.34, x0=cx-tot/2;
  rect(s,x0+ew/2,3.83,tot-ew,0.022,"C3CAD3");
  ents.forEach((e,i)=>{ const x=x0+i*(ew+0.34);
    rect(s,x+ew/2-0.011,3.83,0.022,0.26,"C3CAD3");
    rrect(s,x,4.09,ew,0.76,WHITE,{radius:0.08,line:LINE});
    rect(s,x,4.09,ew,0.04,i===2?"C3CAD3":ORANGE);
    txt(s,e[0],{x:x+0.16,y:4.2,w:ew-0.32,h:0.3,fontFace:SANS_SB,fontSize:10,color:GRAPH,align:"center",valign:"middle"});
    txt(s,e[1],{x:x+0.16,y:4.5,w:ew-0.32,h:0.24,fontSize:8,color:GRAY,align:"center",valign:"middle"});
  });
  // fleet badge
  rrect(s,W-M-2.5,1.95,2.5,0.62,GRAPH,{radius:0.08});
  txt(s,[{text:"Fleet   ",options:{color:MUTE_DARK,fontSize:9}},{text:"373 vehicles",options:{color:ORANGE,fontFace:SANS_SB,fontSize:11}}],
      {x:W-M-2.5,y:1.95,w:2.5,h:0.62,align:"center",valign:"middle",margin:0});
  // branches
  txt(s,"OPERATIONAL BRANCHES (FILIAIS)",{x:M,y:5.15,w:6,h:0.24,fontFace:SANS_SB,fontSize:8,color:ORANGE,charSpacing:1.4});
  const fil=["Goiânia","Anápolis","Nerópolis","Senador Canedo","Itumbiara","Alexânia","Uberlândia","Rio Verde","Pires do Rio"];
  const fw=(W-2*M-4*0.2)/5;
  fil.forEach((f,i)=>{ const x=M+(i%5)*(fw+0.2), y=5.47+Math.floor(i/5)*0.5;
    rrect(s,x,y,fw,0.4,PAPER,{radius:0.06,line:LINE});
    txt(s,"Filial "+f,{x:x+0.08,y,w:fw-0.16,h:0.4,fontSize:8.5,color:TXT,align:"center",valign:"middle"});
  });
})();

/* =========================================================== 25 TOC — Financial Highlights */
tocSlide(3,25);

/* =========================================================== 26 FINANCIAL HIGHLIGHTS */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Financial highlights",
    subtitle:"Solid profitability in 2025; the full historical series and projections are pending Company data",
    source:"Source: Company management information. 2025 figures are preliminary; historical series and projections to be confirmed with management.",page:26});
  const kp=[["BRL 140 Mn","Net revenues 2025"],["BRL 36 Mn","EBITDA 2025"],["~26%","EBITDA margin 2025"],["+41.3%","1Q gross revenue YoY"]];
  const kw=(W-2*M-3*0.28)/4;
  kp.forEach((k,i)=>statTile(s,M+i*(kw+0.28),1.95,kw,0.92,k[0],k[1]));
  rrect(s,M,3.06,W-2*M,3.28,PAPER,{radius:0.09,line:LINE});
  txt(s,"Net revenues & EBITDA evolution — BRL Mn",{x:M+0.32,y:3.26,w:6,h:0.3,fontFace:SANS_SB,fontSize:10,color:GRAPH});
  colChart(s,p.ChartType.bar,[
    {name:"Net revenues",labels:["2022","2023","2024","2025","2026E"],values:[null,null,null,140,null]},
    {name:"EBITDA",labels:["2022","2023","2024","2025","2026E"],values:[null,null,null,36,null]}],
    M+0.3,3.62,W-2*M-0.6,2.5,{chartColors:[CHART_D,ORANGE],showLegend:true,legendPos:"t",legendFontFace:SANS,legendFontSize:8,legendColor:GRAY});
  txt(s,"2022–2024 and 2026E figures pending Company data",{x:M+0.55,y:4.5,w:3.1,h:0.5,fontSize:9,color:GRAY_L,italic:true,valign:"middle",lineSpacingMultiple:1.14});
})();

/* =========================================================== 27 REVENUE MOMENTUM */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Revenue momentum",
    subtitle:"First-quarter gross revenue grew +41.3% year-on-year, with growth in both operating entities",
    source:"Source: Company management information. 1Q gross revenue by operating entity; figures are preliminary and to be confirmed with management.",page:27,band:true});
  rrect(s,M,1.95,6.5,3.9,PAPER,{radius:0.09,line:LINE});
  txt(s,"Gross revenue — 1Q25 vs. 1Q26 (BRL Mn)",{x:M+0.32,y:2.12,w:5.5,h:0.3,fontFace:SANS_SB,fontSize:10,color:GRAPH});
  colChart(s,p.ChartType.bar,[
    {name:"1Q25",labels:["AGM Caetano","AGM Alpha","Total"],values:[26.6,4.2,30.8]},
    {name:"1Q26",labels:["AGM Caetano","AGM Alpha","Total"],values:[36.2,7.3,43.5]}],
    M+0.3,2.5,5.9,3.0,{chartColors:[CHART_LT,ORANGE],showLegend:true,legendPos:"b",legendFontFace:SANS,legendFontSize:8,legendColor:GRAY});
  const rx=M+6.8, rw=W-M-rx;
  const rows=[["Total 1Q gross revenue","BRL 30.8 Mn","BRL 43.5 Mn","+41.3%"],
              ["AGM Caetano","BRL 26.6 Mn","BRL 36.2 Mn","+36.1%"],
              ["AGM Alpha","BRL 4.2 Mn","BRL 7.3 Mn","+74.3%"]];
  rrect(s,rx,1.95,rw,0.44,GRAPH,{radius:0.06});
  ["","1Q25","1Q26","YoY"].forEach((hd,i)=>{
    const cw=[2.0,1.15,1.15,0.95], x=rx+0.18+cw.slice(0,i).reduce((a,b)=>a+b,0);
    txt(s,hd,{x,y:1.95,w:cw[i],h:0.44,fontFace:SANS_SB,fontSize:8.5,color:WHITE,align:i?"right":"left",valign:"middle"});
  });
  rows.forEach((r,i)=>{ const y=2.39+i*0.56;
    if(i===0) rect(s,rx,y,rw,0.56,O_TINT);
    else if(i%2===0) rect(s,rx,y,rw,0.56,PAPER);
    r.forEach((v,j)=>{ const cw=[2.0,1.15,1.15,0.95], x=rx+0.18+cw.slice(0,j).reduce((a,b)=>a+b,0);
      txt(s,v,{x,y,w:cw[j],h:0.56,fontFace:(j===0||j===3)?SANS_SB:SANS,fontSize:8.5,
        color:j===3?ORANGE_D:(i===0?GRAPH:TXT),align:j?"right":"left",valign:"middle"});
    });
  });
  statTile(s,rx,4.25,rw,0.9,"+41.3%","Combined 1Q gross revenue growth (YoY)");
  rrect(s,rx,5.3,rw,0.55,GRAPH,{radius:0.07});
  txt(s,"Both entities contributed to growth",{x:rx+0.2,y:5.3,w:rw-0.4,h:0.55,fontFace:SANS_M,fontSize:9,color:WHITE,align:"center",valign:"middle"});
  conclusionBand(s,[["1Q gross revenue up ",0],["+41.3% year-on-year",1],[" across both operating entities",0]],{page:27});
})();

/* =========================================================== 28 INCOME STATEMENT */
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Consolidated income statement",
    subtitle:"Combined figures for AGM Caetano and AGM Alpha — full series to be confirmed with the Company",
    source:"Source: Company. Illustrative structure; all figures to be confirmed with management. Net revenues and EBITDA for 2025 are preliminary.",page:28});
  const cols=["2022","2023","2024","2025","2026E"];
  const rows=[["Gross revenue",0],["Taxes",0],["Net revenues",1],["growth %",2],["COGS",0],["Gross profit",1],["gross margin %",2],
              ["Personnel expenses",0],["General & administrative",0],["Selling expenses",0],["EBITDA",1],["EBITDA margin %",2],
              ["D&A",0],["Financial result",0],["EBT",1],["Net income",1]];
  const tx=M, tw=W-2*M, labW=4.0, dataW=(tw-labW)/cols.length, y0=1.95, rh=0.28;
  rrect(s,tx,y0,tw,0.42,GRAPH,{radius:0.05});
  txt(s,"BRL Mn",{x:tx+0.2,y:y0,w:labW,h:0.42,fontFace:SANS_SB,fontSize:8.5,color:WHITE,valign:"middle"});
  cols.forEach((c,i)=>txt(s,c,{x:tx+labW+i*dataW,y:y0,w:dataW-0.16,h:0.42,fontFace:SANS_SB,fontSize:8.5,color:WHITE,align:"right",valign:"middle"}));
  rows.forEach((r,i)=>{ const y=y0+0.42+i*rh, bold=r[1]===1, it=r[1]===2;
    if(bold) rect(s,tx,y,tw,rh,O_TINT);
    else if(i%2===1) rect(s,tx,y,tw,rh,PAPER);
    txt(s,r[0],{x:tx+0.2,y,w:labW-0.2,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:8,color:it?GRAY:TXT,italic:it,valign:"middle"});
    cols.forEach((c,j)=>{
      let v="–";
      if(c==="2025"&&r[0]==="Net revenues") v="~140";
      if(c==="2025"&&r[0]==="EBITDA") v="~36";
      if(c==="2025"&&r[0]==="EBITDA margin %") v="~26%";
      txt(s,v,{x:tx+labW+j*dataW,y,w:dataW-0.16,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:8,
        color:it?GRAY:(v==="–"?GRAY_L:TXT),italic:it,align:"right",valign:"middle"});
    });
  });
})();

/* =========================================================== 29 BACK COVER */
(()=>{ const s=p.addSlide(); bg(s,GRAPH);
  const cut=6.0;
  s.addImage({path:A+"cover_buses.jpeg",x:0,y:0,w:cut,h:H,sizing:{type:"cover",w:cut,h:H}});
  rect(s,0,0,cut,H,GRAPH,68);
  rect(s,cut,0,W-cut,H,GRAPH);
  rect(s,cut,0,0.05,H,ORANGE);
  s.addImage({path:A+"stripes_orange.png",x:W-2.1,y:0.3,w:2.0,h:2.0,transparency:70});
  s.addImage({path:A+"mobi_logo_black.png",x:cut+0.8,y:1.5,w:2.7,h:2.7*MOBI_AR});
  txt(s,"Deal team",{x:cut+0.8,y:2.58,w:4.5,h:0.5,fontFace:SANS_SB,fontSize:24,color:WHITE,valign:"middle"});
  rect(s,cut+0.82,3.18,1.0,0.035,ORANGE);
  const team=[["Bruno Iervolino","bruno.iervolino@igcp.com.br"],["Gabriel Brito","gabriel.brito@igcp.com.br"]];
  team.forEach((t,i)=>{ const y=3.58+i*0.86;
    arrow(s,cut+0.82,y+0.06,0.15);
    txt(s,t[0],{x:cut+1.1,y:y-0.02,w:4.2,h:0.28,fontFace:SANS_SB,fontSize:11,color:WHITE,valign:"middle"});
    txt(s,t[1],{x:cut+1.1,y:y+0.26,w:4.2,h:0.24,fontFace:SANS_M,fontSize:9,color:ORANGE,valign:"middle"});
    txt(s,"+55 11 3815-3533",{x:cut+1.1,y:y+0.48,w:4.2,h:0.24,fontSize:8.5,color:MUTE_DARK,valign:"middle"});
  });
  rect(s,cut+0.82,5.3,4.3,0.015,G_LINE);
  txt(s,"Av. Brigadeiro Faria Lima, 2277 — 6th floor\n01452-000  Jardim Paulistano, São Paulo – SP\n+55 11 3815-3533",
      {x:cut+0.82,y:5.48,w:4.6,h:0.8,fontSize:8.5,color:ON_DARK,valign:"top",lineSpacingMultiple:1.24});
  s.addImage({path:A+"igc_white.png",x:cut+0.8,y:H-1.1,w:0.62,h:0.62*IGC_AR});
  txt(s,"Confidential Information Memorandum",{x:M,y:H-0.62,w:5,h:0.3,fontFace:SANS_M,fontSize:9,color:"E8ECF1"});
})();

p.writeFile({fileName:"Project_Compass_CIM_v5.pptx"}).then(()=>console.log("WROTE Project_Compass_CIM_v5.pptx"));
