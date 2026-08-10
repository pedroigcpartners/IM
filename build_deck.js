// Project Compass — CIM (Mobi). IGC house style v2, modeled on Project Bluebird/Biscoitê:
// soft slate/powder-blue system, Poppins throughout, Mobi orange as signature accent.
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
p.author = "IGC Partners";
p.title = "Project Compass — Confidential Information Memorandum";

// ---------- palette ----------
const DEEP="33425A", SLATE="5C77A0", SLATE_D="44597A", TITLE="4E6486";
const POWDER="BFD3E6", POWDER_L="E4ECF4", POWDER_L2="EFF4F9", CHART_LT="C6D7E8";
const ORANGE="F35B1A", ORANGE_D="C6470F";
const WHITE="FFFFFF", PAPER="F5F7FA", CARD="EAEFF5", LINE="DBE1E9";
const TXT="39424E", GRAY="6A7481", GRAY_L="9AA3AE";
const SANS="Poppins", SANS_M="Poppins Medium", SANS_SB="Poppins SemiBold", SANS_L="Poppins Light";

const W=13.333, H=7.5, M=0.6, A="assets/";
const MOBI_AR=246/768, IGC_AR=778/900;
const SECTIONS=["Introduction","Investment Thesis","Company Overview","Financial Highlights"];
const ic=(n,c)=>`${A}icons/${n}_${c}.png`;

// ---------- helpers ----------
const bg=(s,c)=>{ s.background={color:c}; };
function rect(s,x,y,w,h,c){ s.addShape(p.ShapeType.rect,{x,y,w,h,fill:{color:c},line:{type:"none"}}); }
function rrect(s,x,y,w,h,c,{radius=0.1,line=null,shadow=false}={}){
  const o={x,y,w,h,rectRadius:radius,fill:{color:c},line:line?{color:line,width:1}:{type:"none"}};
  if(shadow) o.shadow={type:"outer",color:"B4BEC9",opacity:0.32,blur:8,offset:2,angle:90};
  s.addShape(p.ShapeType.roundRect,o);
}
function iconChip(s,x,y,d,icon,{fill=SLATE,color="white"}={}){
  s.addShape(p.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{type:"none"}});
  const pad=d*0.27; s.addImage({path:ic(icon,color),x:x+pad,y:y+pad,w:d-2*pad,h:d-2*pad});
}
function photoCircle(s,path,x,y,d,{ring=WHITE,ringW=3,badge=null,badgeFill=ORANGE}={}){
  s.addShape(p.ShapeType.ellipse,{x:x-0.04,y:y-0.04,w:d+0.08,h:d+0.08,fill:{color:ring},line:{type:"none"},shadow:{type:"outer",color:"AEB8C4",opacity:0.3,blur:7,offset:2,angle:90}});
  s.addImage({path,x,y,w:d,h:d,rounding:true,sizing:{type:"cover",w:d,h:d}});
  if(badge!==null){
    const bd=d*0.34; s.addShape(p.ShapeType.ellipse,{x:x-bd*0.15,y:y-bd*0.15,w:bd,h:bd,fill:{color:badgeFill},line:{color:WHITE,width:2}});
    s.addText(String(badge),{x:x-bd*0.15,y:y-bd*0.15,w:bd,h:bd,fontFace:SANS_SB,fontSize:15,color:WHITE,align:"center",valign:"middle",margin:0});
  }
}
function chrome(s,{eyebrow,title,subtitle,num,numFill=ORANGE,source,page,titleColor=TITLE}={}){
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-1.0,y:0.34,w:1.0,h:1.0*MOBI_AR});
  if(eyebrow) s.addText(eyebrow,{x:M,y:0.4,w:8,h:0.28,fontFace:SANS_M,fontSize:11,color:GRAY,align:"left",margin:0});
  let tx=M;
  if(num!=null){ const d=0.52; s.addShape(p.ShapeType.ellipse,{x:M,y:0.74,w:d,h:d,fill:{color:numFill},line:{type:"none"}});
    s.addText(String(num),{x:M,y:0.74,w:d,h:d,fontFace:SANS_SB,fontSize:17,color:WHITE,align:"center",valign:"middle",margin:0}); tx=M+d+0.22; }
  if(title) s.addText(title,{x:tx,y:0.7,w:W-tx-1.4,h:0.6,fontFace:SANS_SB,fontSize:23,color:titleColor,align:"left",valign:"middle",margin:0});
  if(subtitle) s.addText(subtitle,{x:M,y:1.34,w:W-M-1.4,h:0.5,fontFace:SANS,fontSize:12,color:GRAY,align:"left",valign:"top",margin:0,lineSpacingMultiple:1.02});
  if(source) s.addText(source,{x:M,y:H-0.62,w:W-2.0,h:0.24,fontFace:SANS,fontSize:7,color:GRAY_L,align:"left",valign:"middle",margin:0});
  // footer: igc + page + Confidential
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.42,w:0.34,h:0.34*IGC_AR});
  s.addText([{text:String(page),options:{color:TXT,fontFace:SANS_M}},{text:"    Confidential",options:{color:GRAY_L,fontFace:SANS}}],
            {x:M+0.44,y:H-0.4,w:3,h:0.3,fontSize:9,align:"left",valign:"middle",margin:0});
}
function conclusionBand(s,text,{y=H-1.15,color=SLATE,h=0.85}={}){
  rect(s,0,y,W,h,color);
  s.addText(text,{x:1.2,y:y,w:W-2.4,h:h,fontFace:SANS_SB,fontSize:12.5,color:WHITE,align:"center",valign:"middle",margin:0,lineSpacingMultiple:1.0});
}
// clean column chart
function colChart(s,type,data,x,y,w,h,opts={}){
  s.addChart(type,data,Object.assign({
    x,y,w,h,barDir:"col",showLegend:false,
    showValue:true,dataLabelFontFace:SANS_SB,dataLabelFontSize:10,dataLabelColor:SLATE,dataLabelPosition:"outEnd",
    catAxisLabelFontFace:SANS,catAxisLabelFontSize:9.5,catAxisLabelColor:GRAY,catGridLine:{style:"none"},catAxisLineShow:false,
    valAxisHidden:true,valGridLine:{style:"none"},valAxisLineShow:false,barGapWidthPct:55,
  },opts));
}

// =========================================================== 1 COVER
(()=>{ const s=p.addSlide(); bg(s,POWDER);
  // big circular vehicle photo bleeding left
  const d=6.4; s.addShape(p.ShapeType.ellipse,{x:-1.5,y:H/2-d/2,w:d,h:d,fill:{color:WHITE},line:{type:"none"},shadow:{type:"outer",color:"9FB2C6",opacity:0.4,blur:14,offset:3,angle:90}});
  s.addImage({path:A+"cover_buses.jpeg",x:-1.5+0.12,y:H/2-d/2+0.12,w:d-0.24,h:d-0.24,rounding:true,sizing:{type:"cover",w:d-0.24,h:d-0.24}});
  // secondary small circle
  const d2=2.2; s.addShape(p.ShapeType.ellipse,{x:3.15,y:5.05,w:d2,h:d2,fill:{color:WHITE},line:{type:"none"},shadow:{type:"outer",color:"9FB2C6",opacity:0.4,blur:10,offset:2,angle:90}});
  s.addImage({path:A+"mobi_microbus.png",x:3.15+0.1,y:5.05+0.1,w:d2-0.2,h:d2-0.2,rounding:true,sizing:{type:"cover",w:d2-0.2,h:d2-0.2}});
  // brand block right
  s.addImage({path:A+"mobi_logo_navy.png",x:7.4,y:1.75,w:4.0,h:4.0*MOBI_AR});
  s.addText("Project Compass",{x:7.4,y:3.15,w:5.3,h:0.7,fontFace:SANS_SB,fontSize:30,color:SLATE_D,align:"left",margin:0});
  rrect(s,7.42,4.02,3.9,0.62,POWDER,{radius:0.31,line:SLATE});
  s.addText("Information Memorandum",{x:7.42,y:4.02,w:3.9,h:0.62,fontFace:SANS_M,fontSize:13,color:SLATE_D,align:"center",valign:"middle",margin:0});
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.85,w:0.6,h:0.6*IGC_AR});
})();

// =========================================================== 2 DISCLAIMER
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-1.0,y:0.34,w:1.0,h:1.0*MOBI_AR});
  s.addText("Disclaimer",{x:M,y:0.55,w:8,h:0.7,fontFace:SANS_SB,fontSize:30,color:TITLE,margin:0});
  const disc=[
    "IGC has been retained by MOBI (“Company”; “Mobi”), on an exclusive basis, to advise the Company in its M&A process (“Transaction”). This material (“Information Memorandum”) describes and summarizes the Company, its assets, market and economic and financial indicators and has been prepared exclusively to assist the recipient in deciding whether it wishes to proceed with a further investigation of a possible Transaction with the Company. In no event shall the recipient use any of this information for any commercial purposes or for purposes other than the one for which this memorandum is furnished.",
    "All information contained in this Information Memorandum has been prepared based on documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or independent research. IGC has not investigated, verified or audited the documents and information used for its preparation. This Information Memorandum contains statements, estimates and projections provided by the Client concerning anticipated future performance, which may or may not prove correct. No representations, expressed or implied, are made as to their accuracy.",
    "This Memorandum of Information is not intended to form any part of the basis of any investment decision and should not be considered a recommendation by the Company or IGC. Each reader must make its own valuation of the Transaction to determine whether to continue in the process. No liability is or shall be attributed to the members of IGC, including its partners, directors or employees, in connection with the accuracy or completeness of the information contained herein.",
  ];
  const disc2=[
    "This material belongs to IGC and shall not be copied, reproduced, distributed and/or disclosed, in whole or in part, including by digital media, to any third party without the express and prior written consent of IGC. By accepting this material, the recipient agrees to return it as soon as requested by IGC and to maintain strict confidentiality over all information contained herein.",
    "Since the existence of the Transaction is not publicly disclosed and may not be known by members of the Company or third parties, the recipient agrees not to approach or contact any officer, employee, client, supplier or representative of the Company without the express written permission of IGC. In furnishing this material, IGC undertakes no obligation to provide access to additional information or to update it, and reserves the right, at any time and without notice, to change the procedure for the Transaction or terminate negotiations prior to the execution of any binding agreement.",
  ];
  s.addText(disc.map(t=>({text:t,options:{breakLine:true,paraSpaceAfter:8}})),{x:M,y:1.5,w:5.85,h:5.3,fontFace:SANS,fontSize:8.4,color:TXT,align:"justify",valign:"top",lineSpacingMultiple:1.04});
  s.addText(disc2.map(t=>({text:t,options:{breakLine:true,paraSpaceAfter:8}})),{x:6.7,y:1.5,w:6.05,h:3.6,fontFace:SANS,fontSize:8.4,color:TXT,align:"justify",valign:"top",lineSpacingMultiple:1.04});
  // contact card
  rrect(s,6.7,5.2,4.55,1.55,PAPER,{radius:0.1,line:LINE});
  s.addText("Bruno Iervolino",{x:6.95,y:5.4,w:4,h:0.35,fontFace:SANS_SB,fontSize:15,color:TITLE,margin:0});
  s.addText("IGC Partners",{x:6.95,y:5.73,w:4,h:0.3,fontFace:SANS_M,fontSize:10.5,color:ORANGE,margin:0});
  s.addText([{text:"Av. Brigadeiro Faria Lima, 2277 – 6th floor",options:{breakLine:true}},{text:"01452-000 | São Paulo – SP    Tel: (55 11) 3815-3533",options:{breakLine:true}},{text:"bruno.iervolino@igcp.com.br",options:{}}],
    {x:6.95,y:6.05,w:4.1,h:0.65,fontFace:SANS,fontSize:9,color:GRAY,valign:"top",lineSpacingMultiple:1.15,margin:0});
  // circular photo bottom-right
  photoCircle(s,A+"mobi_bus_front.png",11.55,5.15,1.5,{});
  // wave
  s.addImage({path:A+"wave_powder.png",x:0,y:H-0.62,w:W,h:0.62});
})();

// =========================================================== TOC builder
function tocSlide(activeIdx){
  const s=p.addSlide(); bg(s,WHITE);
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-1.0,y:0.34,w:1.0,h:1.0*MOBI_AR});
  // powder band bottom
  s.addImage({path:A+"wave_powder.png",x:0,y:5.55,w:W,h:0.5});
  rect(s,0,6.0,W,1.5,POWDER);
  // photo mosaic left in white frame
  const fx=M,fy=1.05,fw=6.0,fh=5.5; rrect(s,fx,fy,fw,fh,WHITE,{radius:0.06,line:LINE,shadow:true});
  const g=0.12, ph=[A+"mobi_fleet2.png",A+"mobi_van.png",A+"mobi_microbus.png",A+"cover_buses.jpeg"];
  const ix=fx+0.2,iy=fy+0.2,iw=fw-0.4,ih=fh-0.4;
  const leftW=iw*0.52;
  s.addImage({path:ph[0],x:ix,y:iy,w:leftW,h:ih*0.72,sizing:{type:"cover",w:leftW,h:ih*0.72}});
  s.addImage({path:ph[3],x:ix,y:iy+ih*0.72+g,w:leftW,h:ih*0.28-g,sizing:{type:"cover",w:leftW,h:ih*0.28-g}});
  const rX=ix+leftW+g, rW=iw-leftW-g;
  s.addImage({path:ph[1],x:rX,y:iy,w:rW,h:ih*0.5-g/2,sizing:{type:"cover",w:rW,h:ih*0.5-g/2}});
  s.addImage({path:ph[2],x:rX,y:iy+ih*0.5+g/2,w:rW,h:ih*0.5-g/2,sizing:{type:"cover",w:rW,h:ih*0.5-g/2}});
  // right nav
  s.addText("Executive Summary",{x:7.15,y:1.15,w:5.6,h:0.7,fontFace:SANS_SB,fontSize:29,color:TITLE,margin:0});
  let y=2.15; const pw=W-7.15-M, ph2=0.68, gap=0.24;
  SECTIONS.forEach((sec,i)=>{
    const active=i===activeIdx;
    rrect(s,7.15,y,pw,ph2,active?SLATE:POWDER_L,{radius:ph2/2});
    s.addText(String(i+1).padStart(2,"0"),{x:7.5,y:y,w:0.7,h:ph2,fontFace:SANS_SB,fontSize:14,color:active?WHITE:GRAY_L,valign:"middle",margin:0});
    s.addText(sec,{x:8.25,y:y,w:pw-1.3,h:ph2,fontFace:active?SANS_SB:SANS_M,fontSize:15,color:active?WHITE:GRAY,valign:"middle",margin:0});
    y+=ph2+gap;
  });
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.42,w:0.34,h:0.34*IGC_AR});
}

// =========================================================== 3 TOC 01
tocSlide(0);

// =========================================================== 4 AT A GLANCE
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"Mobi at a glance",
    subtitle:"A leading platform in corporate employee transportation (fretamento), reaching ~BRL 140 Mn of net revenue in 2025",
    source:"Source: Company; Jan-2026 fleet register. (1) Owned assets; avg fleet age 4 yrs per Company materials vs ~6 yrs per chassis manufacture year – to reconcile. (2) Owned assets.",page:4});
  const rows=[
    ["award","+20 years of experience","One of the leading platforms in corporate mobility, serving industrial, agribusiness and consumer-goods clients"],
    ["contract","Recurring, blue-chip portfolio","A strong base of long-term recurring-revenue contracts with blue-chip clients and trusted partnerships"],
    ["truck","Modern, fully-owned fleet","373 vehicles, avg age ~6 years¹, across buses, micro-buses and vans for a flexible service offering"],
    ["mappin","Midwest & Southeast footprint","Headquarters in Goiânia plus 10 operational bases across Goiás, the Federal District and Minas Gerais"],
    ["activity","Technology-enabled operations","GPS telemetry and driver monitoring, with in-house maintenance [TBC], ensuring high reliability"],
    ["users","Experienced, scalable team","A seasoned management team and a workforce built for continued, safety-focused growth"],
  ];
  const cw=(W-2*M-0.5)/2, rh=1.02;
  rows.forEach((r,i)=>{ const x=M+(i%2)*(cw+0.5), y=2.0+Math.floor(i/2)*rh;
    iconChip(s,x,y+0.06,0.58,r[0]);
    s.addText(r[1],{x:x+0.76,y:y,w:cw-0.8,h:0.3,fontFace:SANS_SB,fontSize:12,color:TITLE,valign:"top",margin:0});
    s.addText(r[2],{x:x+0.76,y:y+0.3,w:cw-0.8,h:0.6,fontFace:SANS,fontSize:9.3,color:GRAY,valign:"top",margin:0,lineSpacingMultiple:1.0});
    if(i<4) s.addShape(p.ShapeType.line,{x:x+0.76,y:y+0.94,w:cw-0.8,h:0,line:{color:LINE,width:1}});
  });
  // highlight stat cards
  const tiles=[["~BRL 140 Mn","Net revenue 2025"],["~BRL 36 Mn","EBITDA (~26% margin)"],["~BRL 198 Mn","Fleet value²"],["373","Vehicles · 100% owned"]];
  const tw=(W-2*M-3*0.3)/4;
  tiles.forEach((t,i)=>{ const x=M+i*(tw+0.3), y=5.35, h=1.05;
    rrect(s,x,y,tw,h,PAPER,{radius:0.09,line:LINE});
    s.addShape(p.ShapeType.rect,{x:x,y:y+0.18,w:0.09,h:0.69,fill:{color:ORANGE}});
    s.addText(t[0],{x:x+0.28,y:y+0.16,w:tw-0.4,h:0.46,fontFace:SANS_SB,fontSize:19,color:TITLE,margin:0,valign:"middle"});
    s.addText(t[1],{x:x+0.28,y:y+0.62,w:tw-0.4,h:0.34,fontFace:SANS,fontSize:9,color:GRAY,margin:0,valign:"top"});
  });
})();

// =========================================================== 5 PLATFORM / MOMENTUM
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Introduction",title:"A scalable platform with strong recent momentum",
    subtitle:"Operations concentrated in the high-growth Midwest–Southeast corridor, with double-digit revenue growth",
    source:"Source: Company. Gross revenue by operating entity. (1) 1Q gross revenue growth year-over-year.",page:5});
  // choropleth left
  const mh=4.0, mw=mh*(2000/1878);
  s.addImage({path:A+"brazil_choro.png",x:M-0.1,y:2.05,w:mw,h:mh});
  const leg=[["Core state — Goiás (HQ)",SLATE_D],["Operating states — DF & MG",SLATE]];
  let ly=6.2; leg.forEach(l=>{ s.addShape(p.ShapeType.rect,{x:M+0.15,y:ly,w:0.2,h:0.2,fill:{color:l[1]}}); s.addText(l[0],{x:M+0.45,y:ly-0.06,w:3.5,h:0.32,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0}); ly+=0.32; });
  // right: chart + stats
  const rx=5.5, rw=W-rx-M;
  rrect(s,rx,2.05,rw,2.75,PAPER,{radius:0.1,line:LINE});
  s.addText("Gross revenue by entity — 1Q25 vs. 1Q26",{x:rx+0.3,y:2.22,w:rw-1.7,h:0.3,fontFace:SANS_SB,fontSize:11.5,color:TITLE,margin:0});
  s.addText("BRL Mn",{x:rx+0.3,y:2.5,w:2,h:0.24,fontFace:SANS,fontSize:8.5,color:GRAY,margin:0});
  rrect(s,rx+rw-1.65,2.2,1.35,0.44,POWDER,{radius:0.08});
  s.addText("+41.3% YoY¹",{x:rx+rw-1.65,y:2.2,w:1.35,h:0.44,fontFace:SANS_SB,fontSize:10.5,color:SLATE_D,align:"center",valign:"middle",margin:0});
  colChart(s,p.ChartType.bar,[
    {name:"1Q25",labels:["AGM Caetano","AGM Alpha"],values:[26.62,4.16]},
    {name:"1Q26",labels:["AGM Caetano","AGM Alpha"],values:[36.22,7.25]},
  ],rx+0.2,2.8,rw-0.4,1.85,{barGrouping:"clustered",chartColors:[CHART_LT,SLATE],dataLabelFormatCode:"0.0",showLegend:true,legendPos:"b",legendFontFace:SANS,legendFontSize:9,legendColor:GRAY,valAxisMaxVal:44,catAxisLabelFontSize:10,catAxisLabelColor:TXT});
  // stat callouts
  const st=[["~BRL 140 Mn","Net revenue 2025"],["~26%","EBITDA margin 2025"],["10","Operational bases · 3 states"]];
  const sw=(rw-2*0.3)/3;
  st.forEach((t,i)=>{ const x=rx+i*(sw+0.3), y=5.05, h=1.3;
    rrect(s,x,y,sw,h,WHITE,{radius:0.09,line:LINE,shadow:true});
    s.addText(t[0],{x:x+0.1,y:y+0.22,w:sw-0.2,h:0.5,fontFace:SANS_SB,fontSize:20,color:ORANGE,align:"center",valign:"middle",margin:0});
    s.addText(t[1],{x:x+0.15,y:y+0.74,w:sw-0.3,h:0.44,fontFace:SANS,fontSize:9,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:0.95});
  });
})();

// =========================================================== 6 TOC 02
tocSlide(1);

// =========================================================== 7 INVESTMENT THESIS
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",title:"Mobi is well positioned for continued growth",
    subtitle:"A resilient, contracted business model supported by strong structural value drivers",
    source:"Source: Company; press research. NR-31 = Brazilian rural-labor safety regulation on worker transport.",page:7});
  const pil=[
    "Exposure to a large, structurally growing corporate mobility market — driven by client operational needs, a national driver shortage and labor regulations (NR-31)",
    "Solid, contracted revenue model with high stickiness — long-term contracts (3–5 years) with IPCA, CBA and diesel pass-through adjustments protecting margins",
    "An asset base that compounds competitive advantage — a modern, fully-owned 373-vehicle fleet creating flexibility and hard-to-replicate barriers",
    "Integrated capabilities delivering a full-service edge — GPS telemetry and driver monitoring, with in-house maintenance [TBC], for a high-uptime operation",
    "Multiple, executable growth avenues — geographic expansion, fleet electrification, technology-enabled services and consolidation of a fragmented market",
  ];
  let y=2.15;
  pil.forEach((t,i)=>{
    const d=0.62; s.addShape(p.ShapeType.ellipse,{x:M,y:y,w:d,h:d,fill:{color:i%2?SLATE:SLATE_D},line:{type:"none"}});
    s.addText(String(i+1),{x:M,y:y,w:d,h:d,fontFace:SANS_SB,fontSize:20,color:WHITE,align:"center",valign:"middle",margin:0});
    const parts=t.split(" — ");
    s.addText([{text:parts[0],options:{fontFace:SANS_SB,color:TITLE}},{text:"  —  "+parts[1],options:{fontFace:SANS,color:GRAY}}],
      {x:M+0.85,y:y-0.05,w:7.4,h:0.75,fontSize:11.5,valign:"middle",margin:0,lineSpacingMultiple:1.02});
    y+=0.93;
  });
  // decorative circular photo stack right
  photoCircle(s,A+"mobi_fleet2.png",9.5,2.5,3.0,{});
  photoCircle(s,A+"mobi_microbus.png",11.0,5.05,1.7,{});
})();

// =========================================================== 8 PILLAR 1 TRACK RECORD
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:1,title:"A solid track record with blue-chip clients",
    subtitle:"Long-term contracts across industrial, agribusiness and consumer-goods sectors",
    source:"Source: Company. Client relationship metrics (contracts delivered, years, share of revenue) to be confirmed with management.",page:8});
  s.addText("SELECTED CLIENTS",{x:M,y:2.0,w:5,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1.5,margin:0});
  const clients=["cli_votorantim","cli_cargill","cli_jbs","cli_kraftheinz","cli_mbrf","cli_heineken"];
  const gx=M,gy=2.36,gw=7.4,cols=3,rows=2, cw=(gw-2*0.25)/cols, chh=1.35;
  clients.forEach((c,i)=>{ const x=gx+(i%cols)*(cw+0.25), y=gy+Math.floor(i/cols)*(chh+0.22);
    rrect(s,x,y,cw,chh,WHITE,{radius:0.08,line:LINE,shadow:true});
    s.addImage({path:A+c+".png",x:x+0.25,y:y+chh*0.22,w:cw-0.5,h:chh*0.56,sizing:{type:"contain",w:cw-0.5,h:chh*0.56}});
  });
  // right stat cards
  const rx=8.35,rw=W-rx-M;
  s.addText("PORTFOLIO CHARACTERISTICS",{x:rx,y:2.0,w:rw,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1,margin:0});
  const stats=[["repeat","Recurring","revenue contract model"],["clock","3–5 years","average contract term"],["contract","[XXX]","contracts executed"],["barchart","[XXX]","of contract backlog"]];
  let y=2.36;
  stats.forEach(t=>{ rrect(s,rx,y,rw,0.82,PAPER,{radius:0.09,line:LINE}); iconChip(s,rx+0.18,y+0.16,0.5,t[0]);
    s.addText(t[1],{x:rx+0.82,y:y+0.11,w:rw-1,h:0.38,fontFace:SANS_SB,fontSize:16,color:TITLE,margin:0,valign:"middle"});
    s.addText(t[2],{x:rx+0.82,y:y+0.47,w:rw-1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,margin:0,valign:"top"});
    y+=0.95; });
  conclusionBand(s,"A recurring, contracted revenue base with blue-chip clients underpins visibility and resilience",{y:H-0.95,h:0.62});
})();

// =========================================================== 9 PILLAR 2 FLEET
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:2,title:"A modern, fully-owned fleet tailored to client needs",
    subtitle:"373 vehicles across buses, micro-buses and vans, sourced from leading chassis brands",
    source:"Source: Company; Jan-2026 fleet register. (1) Based on chassis manufacture year; Company materials cite 4 years – to reconcile. (2) Owned assets.",page:9});
  // left highlights (slate panel)
  const px=M,pw=3.05; rrect(s,px,2.0,pw,4.0,SLATE_D,{radius:0.12});
  s.addText("HIGHLIGHTS",{x:px+0.3,y:2.22,w:pw-0.6,h:0.3,fontFace:SANS_SB,fontSize:10,color:POWDER,charSpacing:2,margin:0});
  const hl=[["~6 years","Average fleet age¹"],["373","Total fleet"],["~BRL 198 Mn","Total equipment value²"],["100%","Owned fleet"]];
  let hy=2.62; hl.forEach((t,i)=>{ s.addText(t[0],{x:px+0.3,y:hy,w:pw-0.6,h:0.44,fontFace:SANS_SB,fontSize:22,color:WHITE,margin:0,valign:"bottom"});
    s.addText(t[1],{x:px+0.3,y:hy+0.46,w:pw-0.6,h:0.3,fontFace:SANS,fontSize:9.5,color:POWDER,margin:0,valign:"top"});
    if(i<3) s.addShape(p.ShapeType.line,{x:px+0.3,y:hy+0.82,w:pw-0.6,h:0,line:{color:SLATE,width:1}}); hy+=0.86; });
  // middle composition
  const mx=3.95,mw=4.3; s.addText("FLEET COMPOSITION",{x:mx,y:2.0,w:mw,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1,margin:0});
  const comp=[["Bus","223"],["Micro-bus","74"],["Van","55"],["Support vehicle","17"],["Truck","2"],["Pickup truck","2"]];
  const maxv=223; let cy=2.44;
  comp.forEach(([n,v])=>{ s.addText(n,{x:mx,y:cy,w:2.2,h:0.3,fontFace:SANS_M,fontSize:10.5,color:TXT,valign:"middle",margin:0});
    s.addText(v+" un.",{x:mx+mw-1.0,y:cy,w:1.0,h:0.3,fontFace:SANS_SB,fontSize:10.5,color:TITLE,align:"right",valign:"middle",margin:0});
    const by=cy+0.32; rrect(s,mx,by,mw,0.14,CARD,{radius:0.07}); rrect(s,mx,by,Math.max(0.16,mw*(parseInt(v)/maxv)),0.14,SLATE,{radius:0.07}); cy+=0.6; });
  // right photo + brands
  const rx=8.55,rw=W-rx-M;
  photoCircle(s,A+"mobi_van.png",rx+rw/2-1.0,2.0,2.0,{});
  s.addText("LEADING CHASSIS & EQUIPMENT BRANDS",{x:rx,y:4.15,w:rw,h:0.26,fontFace:SANS_SB,fontSize:8.5,color:ORANGE,charSpacing:0.5,margin:0});
  const brands=["br_mercedes","br_volvo","br_scania","br_ford","br_hyundai","br_cat","br_komatsu","br_liebherr"];
  const bx=rx,by=4.46,bcols=2,bw=(rw-0.2)/bcols,bh=0.5;
  brands.forEach((b,i)=>{ const x=bx+(i%bcols)*(bw+0.2), y=by+Math.floor(i/bcols)*(bh+0.1);
    rrect(s,x,y,bw,bh,WHITE,{radius:0.06,line:LINE}); s.addImage({path:A+b+".png",x:x+0.18,y:y+0.08,w:bw-0.36,h:bh-0.16,sizing:{type:"contain",w:bw-0.36,h:bh-0.16}}); });
})();

// =========================================================== 10 PILLAR 3 TECH
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:3,title:"Technology-enabled operations support high reliability",
    subtitle:"GPS telemetry, driver monitoring and operational discipline keep the fleet running reliably",
    source:"Source: Company. Availability and preventive-maintenance metrics, and scope of in-house maintenance, to be confirmed with management.",page:10});
  const groups=[
    ["activity","GPS Telemetry & Driver Monitoring",["sw_ituran","sw_vtraxx"],"GPS-based tracking and AI-powered driver-fatigue monitoring provide continuous oversight across all bases"],
    ["cpu","ERP & Management",["sw_totvs"],"TOTVS Protheus underpins enterprise resource planning and back-office control"],
    ["tool","Fleet & Maintenance Management",["sw_truckscontrol","sw_zion","sw_opensystem","sw_monaco"],"Specialized systems manage maintenance workflows, parts and fleet operations"],
    ["shield","Safety, PPE & Inspection",["sw_sisma","sw_onsafety","sw_checklistfacil"],"Digital checklists, PPE control and safety management reinforce operational discipline"],
  ];
  const gw=(W-2*M-0.4)/2, gh=1.78;
  groups.forEach((g,i)=>{ const x=M+(i%2)*(gw+0.4), y=2.0+Math.floor(i/2)*(gh+0.25);
    rrect(s,x,y,gw,gh,PAPER,{radius:0.1,line:LINE});
    iconChip(s,x+0.24,y+0.22,0.5,g[0]);
    s.addText(g[1],{x:x+0.86,y:y+0.24,w:gw-1.05,h:0.44,fontFace:SANS_SB,fontSize:11.5,color:TITLE,valign:"middle",margin:0,lineSpacingMultiple:0.95});
    s.addText(g[3],{x:x+0.24,y:y+0.78,w:gw-0.48,h:0.5,fontFace:SANS,fontSize:8.8,color:GRAY,valign:"top",margin:0,lineSpacingMultiple:1.0});
    const logos=g[2],n=logos.length,gapL=0.18,maxCell=1.3,cellW=Math.min(maxCell,(gw-0.48-gapL*(n-1))/n),tot=cellW*n+gapL*(n-1),sX=x+(gw-tot)/2;
    logos.forEach((lg,j)=>{ s.addImage({path:A+lg+".png",x:sX+j*(cellW+gapL),y:y+gh-0.5,w:cellW,h:0.4,sizing:{type:"contain",w:cellW,h:0.4}}); });
  });
})();

// =========================================================== 11 GROWTH AVENUES
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Investment Thesis",num:4,title:"Multiple avenues for continued value creation",
    subtitle:"Geographic expansion, consolidation and fleet electrification position Mobi for a sustained growth trajectory",
    source:"Source: Company; press research. Growth avenues to be validated with management.",page:11});
  const av=[
    ["mappin","Deepen share & expand geographically","Grow wallet share with existing clients and win new logos; expand within the GO–DF–MG corridor and selectively into adjacent regions, leveraging existing bases"],
    ["zap","Electrification & tech-enabled services","Gradual fleet electrification aligned to clients’ ESG and Scope-3 goals; a technology layer (route optimization, apps, carbon dashboards) deepens stickiness"],
    ["layers","Consolidate a fragmented market","A highly fragmented Brazilian market with consolidation underway; Mobi’s scale and track record position it as a natural platform for smaller regional operators"],
  ];
  const cw=(W-2*M-0.8)/3;
  av.forEach((a,i)=>{ const x=M+i*(cw+0.4), y=2.4, h=3.5;
    rrect(s,x,y,cw,h,PAPER,{radius:0.12,line:LINE,shadow:true});
    iconChip(s,x+cw/2-0.42,y+0.4,0.84,a[0]);
    s.addText(String.fromCharCode(65+i),{x:x+cw-0.7,y:y+0.25,w:0.5,h:0.5,fontFace:SANS_SB,fontSize:22,color:CHART_LT,align:"center",valign:"middle",margin:0});
    s.addText(a[1],{x:x+0.3,y:y+1.4,w:cw-0.6,h:0.75,fontFace:SANS_SB,fontSize:13,color:TITLE,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.0});
    s.addText(a[2],{x:x+0.32,y:y+2.2,w:cw-0.64,h:1.15,fontFace:SANS,fontSize:9.5,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
})();

// =========================================================== 12 TOC 03
tocSlide(2);

// =========================================================== 13 FOOTPRINT
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Strategically positioned across the Midwest and Southeast",
    subtitle:"From its Goiânia headquarters to 10 operational bases across Goiás, the Federal District and Minas Gerais",
    source:"Source: Company; Jan-2026 fleet register.",page:13});
  const mh=3.6, mw=mh*(2000/1878);
  s.addImage({path:A+"brazil_map.png",x:M-0.1,y:2.05,w:mw,h:mh});
  const rx=5.3,rw=W-rx-M;
  rrect(s,rx,2.0,rw,1.0,SLATE_D,{radius:0.1,shadow:true});
  iconChip(s,rx+0.24,2.2,0.56,"home",{fill:SLATE});
  s.addText("Headquarters — Goiânia, GO",{x:rx+0.98,y:2.14,w:rw-1.2,h:0.32,fontFace:SANS_SB,fontSize:13,color:WHITE,valign:"top",margin:0});
  s.addText("Corporate HQ (Garagem Central) centralizing fleet management, monitoring infrastructure and administration",{x:rx+0.98,y:2.46,w:rw-1.2,h:0.5,fontFace:SANS,fontSize:9.2,color:POWDER,valign:"top",margin:0,lineSpacingMultiple:1.0});
  s.addText("10 ACTIVE OPERATIONAL BASES",{x:rx,y:3.14,w:rw,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1.5,margin:0});
  const bases=[["Anápolis – GO","Largest base outside HQ, supporting fleet availability across the Goiás corridor"],
    ["Brasília – DF","Garagem BSB supporting operations across the Federal District"],
    ["Senador Canedo – GO","Support base close to client sites, enabling faster response times"],
    ["Uberlândia – MG","Serving the Triângulo Mineiro region with strong execution oversight"]];
  let by=3.44; bases.forEach(([n,d])=>{ iconChip(s,rx,by+0.02,0.42,"mappin");
    s.addText(n,{x:rx+0.6,y:by-0.04,w:rw-0.6,h:0.3,fontFace:SANS_SB,fontSize:11,color:TITLE,valign:"top",margin:0});
    s.addText(d,{x:rx+0.6,y:by+0.26,w:rw-0.6,h:0.36,fontFace:SANS,fontSize:8.8,color:GRAY,valign:"top",margin:0,lineSpacingMultiple:0.98}); by+=0.68; });
  const sb=[["1","Headquarters"],["10","Operational bases"],["3","States covered"],["373","Vehicles deployed"]];
  const sy=6.0,sw=(W-2*M)/4;
  sb.forEach((t,i)=>{ const x=M+i*sw; if(i>0) s.addShape(p.ShapeType.line,{x,y:sy+0.05,w:0,h:0.55,line:{color:LINE,width:1}});
    s.addText(t[0],{x:x+0.2,y:sy,w:sw-0.3,h:0.42,fontFace:SANS_SB,fontSize:22,color:ORANGE,margin:0,valign:"bottom"});
    s.addText(t[1],{x:x+0.2,y:sy+0.44,w:sw-0.3,h:0.26,fontFace:SANS,fontSize:9,color:GRAY,margin:0,valign:"top"}); });
})();

// =========================================================== 14 TIMELINE
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"A track record built over more than 20 years",
    subtitle:"Mobi has +20 years of experience in corporate employee transportation",
    source:"Source: Company. Foundation year and milestone dates to be confirmed with management.",page:14});
  const nodes=[["[Year TBC]","Foundation of Mobi"],["[Year]","[Milestone — TBC]"],["[Year]","[Milestone — TBC]"],["2025","[Milestone — TBC]"],["2026E","Positioned for continued growth"]];
  const railY=3.0, x0=M+0.9, x1=W-M-0.9, n=nodes.length, gap=(x1-x0)/(n-1);
  s.addShape(p.ShapeType.line,{x:x0,y:railY,w:x1-x0,h:0,line:{color:LINE,width:1.5}});
  nodes.forEach((nd,i)=>{ const cx=x0+i*gap, last=i===n-1;
    const d=0.9; s.addShape(p.ShapeType.ellipse,{x:cx-d/2,y:railY-d/2,w:d,h:d,fill:{color:last?ORANGE:SLATE},line:{color:WHITE,width:3}});
    s.addText(nd[0],{x:cx-d/2,y:railY-d/2,w:d,h:d,fontFace:SANS_SB,fontSize:13,color:WHITE,align:"center",valign:"middle",margin:0});
    // card below
    const cw=1.85, cx0=cx-cw/2, cyy=railY+0.85;
    rrect(s,cx0,cyy,cw,1.5,PAPER,{radius:0.08,line:LINE});
    s.addShape(p.ShapeType.line,{x:cx,y:railY+d/2,w:0,h:0.85-d/2,line:{color:LINE,width:1.5}});
    s.addText(nd[1],{x:cx0+0.15,y:cyy+0.2,w:cw-0.3,h:1.1,fontFace:SANS_M,fontSize:10,color:TXT,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
  conclusionBand(s,"More than two decades of disciplined operation, positioned for its next phase of growth",{y:H-0.95,h:0.62});
})();

// =========================================================== 15 REVENUE / SERVICE MODEL
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"A recurring, contract-based revenue model",
    subtitle:"Revenue is generated through long-term corporate transportation contracts across two operating entities",
    source:"Source: Company. Revenue split and contract economics to be confirmed with management.",page:15});
  const cards=[
    [A+"mobi_microbus.png","Dedicated fleet contracts","Long-term contracts (3–5 years) providing dedicated vehicles, drivers and routes to corporate clients, billed on a recurring monthly basis"],
    [A+"mobi_fleet2.png","Route & shift management","Employee transportation planned around client shifts and sites, with GPS telemetry and monitoring ensuring reliability and safety"],
    [A+"mobi_bus_front.png","Two operating entities","Revenue consolidated across AGM Caetano and AGM Alpha, together reaching ~BRL 140 Mn of net revenue in 2025"],
  ];
  const cw=(W-2*M-0.8)/3;
  cards.forEach((c,i)=>{ const x=M+i*(cw+0.4), y=2.5;
    photoCircle(s,c[0],x+cw/2-1.05,y,2.1,{badge:i+1});
    rrect(s,x,y+2.35,cw,1.85,PAPER,{radius:0.1,line:LINE});
    s.addText(c[1],{x:x+0.25,y:y+2.55,w:cw-0.5,h:0.4,fontFace:SANS_SB,fontSize:13,color:TITLE,align:"center",valign:"top",margin:0});
    s.addText(c[2],{x:x+0.3,y:y+3.0,w:cw-0.6,h:1.1,fontFace:SANS,fontSize:9.5,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
})();

// =========================================================== 16 KEY MANAGEMENT
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"An experienced and committed management team",
    subtitle:"Management team overview — names, roles and backgrounds to be confirmed with the Company",
    source:"Source: Company. Roles and backgrounds to be confirmed with management.",page:16});
  const team=[["Antônio Gabriel","AG"],["Morgana","M"],["Pedro","P"],["Gabriela","G"],["[Name TBC]","?"]];
  const n=team.length, gw=(W-2*M-(n-1)*0.4)/n;
  team.forEach((t,i)=>{ const x=M+i*(gw+0.4), y=2.35, h=3.8;
    rrect(s,x,y,gw,h,PAPER,{radius:0.12,line:LINE,shadow:true});
    const d=1.4; s.addShape(p.ShapeType.ellipse,{x:x+gw/2-d/2,y:y+0.35,w:d,h:d,fill:{color:i%2?SLATE:SLATE_D},line:{type:"none"}});
    s.addText(t[1],{x:x+gw/2-d/2,y:y+0.35,w:d,h:d,fontFace:SANS_SB,fontSize:30,color:WHITE,align:"center",valign:"middle",margin:0});
    s.addText(t[0],{x:x+0.1,y:y+1.9,w:gw-0.2,h:0.35,fontFace:SANS_SB,fontSize:12,color:TITLE,align:"center",margin:0});
    s.addText("[Role — TBC]",{x:x+0.1,y:y+2.25,w:gw-0.2,h:0.3,fontFace:SANS_M,fontSize:9.5,color:ORANGE,align:"center",margin:0});
    s.addShape(p.ShapeType.line,{x:x+0.4,y:y+2.68,w:gw-0.8,h:0,line:{color:LINE,width:1}});
    s.addText("[Background — to be\nconfirmed with the\nCompany]",{x:x+0.25,y:y+2.82,w:gw-0.5,h:0.9,fontFace:SANS,fontSize:8.6,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.1});
  });
})();

// =========================================================== 17 CORPORATE STRUCTURE
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Organization & corporate structure",
    subtitle:"Multi-entity structure (Grupo AGM Caetano / AGM Alpha) — simplified representation, to be confirmed",
    source:"Source: Company. Simplified representation; entities and ownership to be confirmed with management.",page:17});
  const box=(x,y,w,h,txt,sub,{fill=WHITE,tc=TITLE,line=SLATE}={})=>{
    rrect(s,x,y,w,h,fill,{radius:0.07,line});
    s.addText(txt,{x:x+0.1,y:sub?y+0.1:y,w:w-0.2,h:sub?0.34:h,fontFace:SANS_SB,fontSize:11,color:tc,align:"center",valign:sub?"top":"middle",margin:0});
    if(sub) s.addText(sub,{x:x+0.1,y:y+0.4,w:w-0.2,h:h-0.44,fontFace:SANS,fontSize:8,color:fill===SLATE_D?POWDER:GRAY,align:"center",valign:"top",margin:0});
  };
  const conn=(x1,y1,x2,y2)=>s.addShape(p.ShapeType.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),line:{color:GRAY_L,width:1}});
  box(W/2-1.6,2.1,3.2,0.55,"Family Shareholders",null,{fill:ORANGE,tc:WHITE,line:ORANGE});
  conn(W/2,2.65,W/2,3.0);
  box(W/2-1.95,3.0,3.9,0.72,"AGM Caetano Participações","Holding company",{fill:SLATE_D,tc:WHITE,line:SLATE_D});
  const l3=[["AGM Caetano LTDA","Operating entity"],["MOBI Alpha","Matriz Brasília"],["Moura e Carrilho Part.","[Related party]"]];
  const bw=3.5,tot=3*bw+2*0.55,sx=W/2-tot/2,ly=4.25;
  conn(W/2,3.72,W/2,4.0); s.addShape(p.ShapeType.line,{x:sx+bw/2,y:4.0,w:tot-bw,h:0,line:{color:GRAY_L,width:1}});
  l3.forEach((b,i)=>{ const x=sx+i*(bw+0.55); conn(x+bw/2,4.0,x+bw/2,ly); box(x,ly,bw,0.72,b[0],b[1]); });
  s.addText("OPERATIONAL BRANCHES (FILIAIS)",{x:M,y:5.45,w:6,h:0.26,fontFace:SANS_SB,fontSize:9.5,color:ORANGE,charSpacing:1,margin:0});
  const fil=["Goiânia","Anápolis","Nerópolis","Senador Canedo","Itumbiara","Alexânia","Uberlândia","Rio Verde","Pires do Rio"];
  const fcols=5,fw=(W-2*M-(fcols-1)*0.2)/fcols;
  fil.forEach((f,i)=>{ const x=M+(i%fcols)*(fw+0.2), y=5.78+Math.floor(i/fcols)*0.5;
    rrect(s,x,y,fw,0.4,POWDER_L,{radius:0.05,line:LINE}); s.addText("Filial "+f,{x:x+0.05,y,w:fw-0.1,h:0.4,fontFace:SANS_M,fontSize:8.5,color:TXT,align:"center",valign:"middle",margin:0}); });
  rrect(s,W-M-2.5,2.15,2.5,0.62,ORANGE,{radius:0.08});
  s.addText([{text:"Total fleet   ",options:{color:"FBE0D3",fontFace:SANS}},{text:"373",options:{color:WHITE,fontFace:SANS_SB,fontSize:14}}],{x:W-M-2.5,y:2.15,w:2.5,h:0.62,fontSize:11,align:"center",valign:"middle",margin:0});
})();

// =========================================================== 18 SUCCESS CASES
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Company Overview",title:"Long-standing relationships with anchor clients",
    subtitle:"Selected success cases illustrating Mobi’s durable, multi-year client partnerships — details to be confirmed",
    source:"Source: Company — to be confirmed with management.",page:18});
  const cases=[["cli_cargill","Cargill"],["cli_jbs","JBS"],["cli_votorantim","Votorantim Cimentos"]];
  const cw=(W-2*M-0.8)/3;
  cases.forEach((c,i)=>{ const x=M+i*(cw+0.4), y=2.2, h=4.15;
    rrect(s,x,y,cw,h,PAPER,{radius:0.12,line:LINE,shadow:true});
    rrect(s,x+0.3,y+0.35,cw-0.6,1.1,WHITE,{radius:0.08,line:LINE});
    s.addImage({path:A+c[0]+".png",x:x+0.6,y:y+0.6,w:cw-1.2,h:0.6,sizing:{type:"contain",w:cw-1.2,h:0.6}});
    s.addText("[City — State]",{x:x+0.2,y:y+1.55,w:cw-0.4,h:0.3,fontFace:SANS_M,fontSize:9.5,color:GRAY,align:"center",margin:0});
    // two stats
    const sy=y+2.0, sw=(cw-0.6)/2;
    [["BRL [XXX] Mn","total value"],["[X] years","total term"]].forEach((t,j)=>{ const sx=x+0.3+j*sw;
      s.addText(t[0],{x:sx,y:sy,w:sw,h:0.4,fontFace:SANS_SB,fontSize:15,color:ORANGE,align:"center",valign:"middle",margin:0});
      s.addText(t[1],{x:sx,y:sy+0.4,w:sw,h:0.26,fontFace:SANS,fontSize:8.5,color:GRAY,align:"center",valign:"top",margin:0}); });
    s.addShape(p.ShapeType.line,{x:x+0.4,y:sy+0.8,w:cw-0.8,h:0,line:{color:LINE,width:1}});
    s.addText("[Service scope — TBC]",{x:x+0.3,y:sy+0.95,w:cw-0.6,h:0.35,fontFace:SANS_M,fontSize:9.5,color:TITLE,align:"center",margin:0});
    s.addText("[Relationship highlights and milestones to be confirmed with the Company]",{x:x+0.3,y:sy+1.3,w:cw-0.6,h:0.6,fontFace:SANS,fontSize:8.5,color:GRAY,align:"center",valign:"top",margin:0,lineSpacingMultiple:1.05});
  });
})();

// =========================================================== 19 TOC 04
tocSlide(3);

// =========================================================== 20 FINANCIAL HIGHLIGHTS
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Financial highlights",
    subtitle:"Solid profitability in 2025; full historical series and projections pending Company data",
    source:"Source: Company. 2025 figures are approximate and preliminary; historical series and projections to be confirmed with management.",page:20});
  const tiles=[["~BRL 140 Mn","Net revenue 2025"],["~BRL 36 Mn","EBITDA 2025"],["~26%","EBITDA margin 2025"],["+41.3%","1Q gross revenue YoY"]];
  const tw=(W-2*M-3*0.3)/4;
  tiles.forEach((t,i)=>{ const x=M+i*(tw+0.3), y=2.05, h=1.15;
    rrect(s,x,y,tw,h,PAPER,{radius:0.09,line:LINE});
    s.addText(t[0],{x:x+0.22,y:y+0.16,w:tw-0.44,h:0.5,fontFace:SANS_SB,fontSize:21,color:ORANGE,margin:0,valign:"middle"});
    s.addText(t[1],{x:x+0.22,y:y+0.7,w:tw-0.44,h:0.32,fontFace:SANS,fontSize:9.5,color:GRAY,margin:0,valign:"top"}); });
  rrect(s,M,3.5,W-2*M,2.9,WHITE,{radius:0.1,line:LINE,shadow:true});
  s.addText("Net revenue & EBITDA evolution — BRL Mn",{x:M+0.3,y:3.66,w:8,h:0.3,fontFace:SANS_SB,fontSize:12,color:TITLE,margin:0});
  s.addShape(p.ShapeType.rect,{x:W-M-3.0,y:3.72,w:0.18,h:0.18,fill:{color:CHART_LT}}); s.addText("Net revenue",{x:W-M-2.78,y:3.66,w:1.1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  s.addShape(p.ShapeType.rect,{x:W-M-1.6,y:3.72,w:0.18,h:0.18,fill:{color:SLATE}}); s.addText("EBITDA",{x:W-M-1.38,y:3.66,w:1.1,h:0.28,fontFace:SANS,fontSize:9,color:GRAY,valign:"middle",margin:0});
  colChart(s,p.ChartType.bar,[
    {name:"Net revenue",labels:["2022","2023","2024","2025","2026E"],values:[null,null,null,140,null]},
    {name:"EBITDA",labels:["2022","2023","2024","2025","2026E"],values:[null,null,null,36,null]},
  ],M+0.2,4.1,W-2*M-0.5,2.15,{barGrouping:"clustered",chartColors:[CHART_LT,SLATE],valAxisMaxVal:170,barGapWidthPct:70,catAxisLabelFontSize:10,catAxisLabelColor:TXT});
  s.addText("2022–2024 and 2026E\nfigures pending Company data",{x:M+0.55,y:4.75,w:3.6,h:0.7,fontFace:SANS,fontSize:10,color:GRAY_L,italic:true,align:"left",valign:"top",margin:0,lineSpacingMultiple:1.05});
})();

// =========================================================== 21 P&L TABLE
(()=>{ const s=p.addSlide(); bg(s,WHITE);
  chrome(s,{eyebrow:"Financial Highlights",title:"Consolidated income statement",
    subtitle:"Combined figures for AGM Caetano and AGM Alpha — full series to be confirmed with the Company",
    source:"Source: Company. Illustrative structure; all figures to be confirmed with management. Net revenue and EBITDA for 2025 are approximate.",page:21});
  const cols=["BRL Mn","2022","2023","2024","2025","2026E"];
  const rows=[
    ["Gross revenue","—","—","—","—","—","h"],
    ["Taxes","—","—","—","—","—",""],
    ["Net revenue","—","—","—","~140","—","b"],
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
  const tx=M, tw=W-2*M, ty=2.0, colLabW=3.6, dataW=(tw-colLabW)/(cols.length-1), rh=0.278;
  // header
  rect(s,tx,ty,tw,0.38,SLATE_D);
  s.addText(cols[0],{x:tx+0.2,y:ty,w:colLabW-0.2,h:0.38,fontFace:SANS_SB,fontSize:10.5,color:WHITE,valign:"middle",margin:0});
  for(let c=1;c<cols.length;c++) s.addText(cols[c],{x:tx+colLabW+(c-1)*dataW,y:ty,w:dataW,h:0.38,fontFace:SANS_SB,fontSize:10.5,color:WHITE,align:"center",valign:"middle",margin:0});
  let y=ty+0.38;
  rows.forEach((r,ri)=>{ const kind=r[6];
    if(kind==="h"||kind==="b") rect(s,tx,y,tw,rh,POWDER_L2);
    else if(ri%2===1) rect(s,tx,y,tw,rh,PAPER);
    const bold=(kind==="h"||kind==="b"), ital=(kind==="i");
    s.addText(r[0],{x:tx+0.2,y,w:colLabW-0.2,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:9.5,italic:ital,color:ital?SLATE:TXT,valign:"middle",margin:0});
    for(let c=1;c<cols.length;c++){ const v=r[c]; const hot=(typeof v==="string"&&v.indexOf("~")>=0);
      s.addText(v,{x:tx+colLabW+(c-1)*dataW,y,w:dataW,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:9.5,italic:ital,color:hot?ORANGE:(ital?SLATE:TXT),align:"center",valign:"middle",margin:0}); }
    y+=rh;
  });
})();

// =========================================================== 22 BACK COVER
(()=>{ const s=p.addSlide(); bg(s,POWDER);
  const d=6.4; s.addShape(p.ShapeType.ellipse,{x:-1.6,y:H/2-d/2,w:d,h:d,fill:{color:WHITE},line:{type:"none"},shadow:{type:"outer",color:"9FB2C6",opacity:0.4,blur:14,offset:3,angle:90}});
  s.addImage({path:A+"cover_buses.jpeg",x:-1.6+0.12,y:H/2-d/2+0.12,w:d-0.24,h:d-0.24,rounding:true,sizing:{type:"cover",w:d-0.24,h:d-0.24}});
  s.addImage({path:A+"mobi_logo_navy.png",x:W-M-1.6,y:0.5,w:1.6,h:1.6*MOBI_AR});
  s.addText("Deal team",{x:6.9,y:1.5,w:5.8,h:0.6,fontFace:SANS_SB,fontSize:26,color:SLATE_D,margin:0});
  const team=[["Bruno Iervolino","bruno.iervolino@igcp.com.br"],["Gabriel Brito","gabriel.brito@igcp.com.br"],["[Team member — TBC]","[email — TBC]"]];
  let y=2.4; team.forEach(t=>{ s.addText(t[0],{x:6.9,y,w:6,h:0.32,fontFace:SANS_SB,fontSize:14,color:SLATE_D,margin:0});
    s.addText(t[1],{x:6.9,y:y+0.32,w:6,h:0.28,fontFace:SANS,fontSize:10.5,color:ORANGE,margin:0});
    s.addText("+55 11 3815-3533",{x:6.9,y:y+0.62,w:6,h:0.28,fontFace:SANS,fontSize:10.5,color:GRAY,margin:0}); y+=1.15; });
  s.addText([{text:"Av. Brigadeiro Faria Lima, 2277 – 6th floor",options:{breakLine:true}},{text:"01452-000, Jardim Paulistano, São Paulo – SP",options:{breakLine:true}},{text:"+55 11 3815-3533",options:{}}],
    {x:6.9,y:H-1.15,w:6,h:0.9,fontFace:SANS,fontSize:9.5,color:GRAY,valign:"top",lineSpacingMultiple:1.2,margin:0});
  s.addImage({path:A+"igc_navy.png",x:M,y:H-0.85,w:0.55,h:0.55*IGC_AR});
})();

p.writeFile({fileName:"Project_Compass_CIM.pptx"}).then(f=>console.log("WROTE",f));
