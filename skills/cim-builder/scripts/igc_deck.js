/**
 * igc_deck.js — reusable IGC Information Memorandum deck kit (pptxgenjs).
 *
 * The IGC scaffolding is constant across every CIM; only the brand skin changes.
 * So: pass the target company's palette to `init()`, then compose slides from the
 * helpers below. Geometry and type are pre-locked to the measured house grid
 * (see references/design-tokens.md) so you do not have to re-derive them.
 *
 *   const K = require('./igc_deck.js');
 *   const {p, T} = K.init({
 *     accent:'F35B1A', accentDark:'C6470F', tint:'FDE9DE',
 *     dark:'141A24', darkPanel:'1F2734',
 *     logo:'assets/mobi_logo_navy.png', logoAR:246/768,
 *     sections:[['Introduction','04'],['Investment Thesis','10'],
 *               ['Company Overview','17'],['Financial Highlights','25']],
 *     title:'Project Compass — Confidential Information Memorandum'
 *   });
 *   const s = p.addSlide(); K.bg(s,'FFFFFF');
 *   K.chrome(s,{eyebrow:'Introduction',title:'Company at a glance',page:4});
 *
 * Requires: pptxgenjs, and Poppins installed (the house sans).
 */

const pptxgen = require("pptxgenjs");

// ---- house constants (measured; do not tune per-deck) ----
const W = 13.333, H = 7.5;      // 33.867 x 19.05 cm — identical in every reference
const M = 0.8;                  // 2.03 cm — the most repeated coordinate in the house decks
const FOOT_Y = H - 0.4;         // footer baseline 7.10 in = 18.05 cm
const IGC_NAVY = "222F44";      // present in all three .pptx references, whatever the skin
const IGC_GOLD = "D3A93D";      // in two of three — signature, not universal
const SANS = "Poppins", SANS_M = "Poppins Medium", SANS_SB = "Poppins SemiBold", SANS_L = "Poppins Light";
// house type grid — integer pt, 10.5 the only half-step
const TYPE = {tocDisplay:32, pillarNum:20, title:18, tocSection:16, stat:16,
              cardTitle:12, band:12, tocPage:12, pillar:11, subtitle:10.5,
              body:9, label:8, foot:7};

let p, T;   // T = the resolved theme

function init(brand={}){
  p = new pptxgen();
  p.layout = "LAYOUT_WIDE";
  p.author = "IGC Partners";
  p.company = "IGC Partners";
  if(brand.title) p.title = brand.title;
  T = Object.assign({
    accent:"F35B1A", accentDark:"C6470F", tint:"FDE9DE", tint2:"FBD9C6",
    dark:"141A24", darkPanel:"1F2734", darkLine:"323E50",
    white:"FFFFFF", paper:"F4F6F8", paper2:"EDF0F3", line:"E2E6EB",
    text:"2B333E", gray:"6C7683", grayL:"9AA3AD", onDark:"C7CDD6", muteDark:"8B95A5",
    chartDark:"2C3A4F", chartLight:"D9DEE5",
    igcNavy:IGC_NAVY, igcGold:IGC_GOLD,
    logo:null, logoAR:1, igcNavyLogo:"assets/igc_navy.png", igcWhiteLogo:"assets/igc_white.png",
    igcAR:778/900, stripes:null, sections:[], W, H, M, TYPE
  }, brand);
  return {p, T};
}

// ---- primitives ----
const bg = (s,c) => { s.background = {color:c}; };
function rect(s,x,y,w,h,c,transparency){
  const o={x,y,w,h,fill:{color:c},line:{type:"none"}};
  if(transparency) o.fill.transparency=transparency;
  s.addShape(p.ShapeType.rect,o);
}
function rrect(s,x,y,w,h,c,{radius=0.08,line=null,lw=1,shadow=false}={}){
  const o={x,y,w,h,rectRadius:radius,fill:c?{color:c}:{type:"none"},
           line:line?{color:line,width:lw}:{type:"none"}};
  if(shadow) o.shadow={type:"outer",color:"9AA3AD",opacity:0.28,blur:9,offset:2,angle:90};
  s.addShape(p.ShapeType.roundRect,o);
}
function txt(s,t,o){ s.addText(t,Object.assign({margin:0,fontFace:SANS,color:T.text},o)); }

/** Play-arrow bullet. Many brand marks contain a triangle/chevron; if the target's
 *  does, this reads as native rather than as generic clip-art. */
function arrow(s,x,y,size,color){
  s.addShape(p.ShapeType.triangle,{x,y,w:size,h:size,fill:{color:color||T.accent},line:{type:"none"},rotate:90});
}

/** Fit a logo inside a box WITHOUT distorting it. Client logo walls look amateur the
 *  moment one mark is stretched, so always pass the true aspect ratio. */
function logoFit(s,path,ar,cx,cy,bw,bh){
  let w=bw, h=bw/ar; if(h>bh){ h=bh; w=bh*ar; }
  s.addImage({path,x:cx-w/2,y:cy-h/2,w,h});
}
function logoCard(s,path,ar,x,y,w,h,opts={}){
  const {pad=0.14,fill=null}=opts;
  const border = ('border' in opts) ? opts.border : T.line;   // pass border:null for no keyline
  rrect(s,x,y,w,h,fill||T.white,{radius:0.07,line:border});
  logoFit(s,path,ar,x+w/2,y+h/2,w-2*pad,h-2*pad);
}
function iconChip(s,x,y,d,iconPath,{fill=null}={}){
  s.addShape(p.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill||T.tint},line:{type:"none"}});
  const pad=d*0.27;
  if(iconPath) s.addImage({path:iconPath,x:x+pad,y:y+pad,w:d-2*pad,h:d-2*pad});
}
function photoCircle(s,path,x,y,d,{badge=null,ring=null}={}){
  s.addShape(p.ShapeType.ellipse,{x:x-0.045,y:y-0.045,w:d+0.09,h:d+0.09,
    fill:{color:ring||T.white},line:{type:"none"},
    shadow:{type:"outer",color:"9AA3AD",opacity:0.3,blur:7,offset:2,angle:90}});
  s.addImage({path,x,y,w:d,h:d,rounding:true,sizing:{type:"cover",w:d,h:d}});
  if(badge!==null){ const bd=d*0.34;
    s.addShape(p.ShapeType.ellipse,{x:x-bd*0.12,y:y-bd*0.12,w:bd,h:bd,
      fill:{color:T.accent},line:{color:T.white,width:2}});
    txt(s,String(badge),{x:x-bd*0.12,y:y-bd*0.12,w:bd,h:bd,fontFace:SANS_SB,
      fontSize:TYPE.cardTitle,color:T.white,align:"center",valign:"middle"});
  }
}

/** Rounded eyebrow tab (Biocap). Marks which section the slide belongs to. */
function tabEyebrow(s,text){
  const w=Math.max(1.45,0.3+text.length*0.082);
  rrect(s,M,0.34,w,0.34,T.tint,{radius:0.085});
  txt(s,text,{x:M,y:0.34,w,h:0.34,fontFace:SANS_M,fontSize:TYPE.body,
    color:T.accentDark,align:"center",valign:"middle"});
}

/**
 * Standard content-slide furniture: eyebrow tab, title (optionally with a numbered
 * pillar circle), subtitle, source note, company logo, and the igc + page + Confidential
 * footer. Pass band:true on slides that end in a conclusionBand — the band occupies the
 * footer strip, so chrome lifts the source note and lets the band draw the igc mark.
 */
function chrome(s,{eyebrow,title,subtitle,num,source,page,band=false}={}){
  if(T.logo) s.addImage({path:T.logo,x:W-M-0.95,y:0.34,w:0.95,h:0.95*T.logoAR});
  if(eyebrow) tabEyebrow(s,eyebrow);
  let tx=M;
  if(num!=null){ const d=0.46;
    s.addShape(p.ShapeType.ellipse,{x:M,y:0.83,w:d,h:d,fill:{color:T.accent},line:{type:"none"}});
    txt(s,String(num),{x:M,y:0.83,w:d,h:d,fontFace:SANS_SB,fontSize:14,color:T.white,
      align:"center",valign:"middle"});
    tx=M+d+0.2;
  }
  if(title) txt(s,title,{x:tx,y:0.79,w:W-tx-1.35,h:0.54,fontFace:SANS_SB,
    fontSize:TYPE.title,color:T.dark,valign:"middle"});
  if(subtitle) txt(s,subtitle,{x:M,y:1.34,w:W-M-1.35,h:0.44,fontSize:TYPE.subtitle,
    color:T.gray,valign:"top",lineSpacingMultiple:1.04});
  if(source) txt(s,source,{x:M,y:band?H-1.06:H-0.6,w:W-2*M,h:0.24,fontSize:TYPE.foot,
    color:T.grayL,valign:"middle"});
  if(!band) footerMark(s,page,false);
}

function footerMark(s,page,onDark,y){
  const yy = y==null?FOOT_Y:y;
  s.addImage({path:onDark?T.igcWhiteLogo:T.igcNavyLogo,x:M,y:yy,w:0.3,h:0.3*T.igcAR});
  s.addText([{text:String(page),options:{color:onDark?T.white:T.text,fontFace:SANS_M}},
             {text:"    Confidential",options:{color:onDark?T.muteDark:T.grayL,fontFace:SANS}}],
    {x:M+0.4,y:yy+0.02,w:3,h:0.3,fontSize:TYPE.body,align:"left",valign:"middle",margin:0});
}

/**
 * Conclusion band = the footer strip (Lox pattern). It sits flush to the bottom edge
 * and carries the igc mark reversed out in white.
 *
 * Do not float this band above the footer: at the house footer baseline it collides
 * with the igc mark, and raising it far enough to clear the mark pushes it into the
 * content on any slide whose cards run near the bottom. Flush-to-edge is the geometry
 * that satisfies both.
 *
 * runs: [[text, isAccent], ...] — accent runs carry the phrase you want remembered.
 */
function conclusionBand(s,runs,{page=null}={}){
  const y=H-0.75, h=0.75;
  rect(s,0,y,W,h,T.dark);
  rect(s,0,y,0.13,h,T.accent);
  s.addText(runs.map(r=>({text:r[0],options:{color:r[1]?T.accent:"E8ECF1"}})),
    {x:2.1,y,w:W-4.2,h,fontFace:SANS_SB,fontSize:TYPE.band,align:"center",valign:"middle",margin:0});
  if(page!=null) footerMark(s,page,true,y+h/2-0.14);
}

/** Stat tile — number over label with an accent keyline. */
function statTile(s,x,y,w,h,value,label,{dark=false}={}){
  rrect(s,x,y,w,h,dark?T.darkPanel:T.paper,{radius:0.07,line:dark?null:T.line});
  rect(s,x,y+h*0.24,0.055,h*0.52,T.accent);
  txt(s,value,{x:x+0.24,y:y+h*0.16,w:w-0.4,h:h*0.42,fontFace:SANS_SB,fontSize:TYPE.title,
    color:dark?T.white:T.dark,valign:"middle"});
  txt(s,label,{x:x+0.24,y:y+h*0.56,w:w-0.4,h:h*0.32,fontSize:TYPE.label,
    color:dark?T.muteDark:T.gray,valign:"middle"});
}

/**
 * Full-bleed dark section divider (Lox). Repeat it before every section with the
 * active index advanced — the reader needs to know where they are in a 30-slide document.
 */
function tocSlide({active=0,page,photo=null,heading=["Executive","Summary"]}={}){
  const s=p.addSlide(); bg(s,T.dark);
  const cut=7.5;
  if(T.stripes) s.addImage({path:T.stripes,x:-0.7,y:H-2.5,w:2.5,h:2.5,transparency:62});
  if(photo){
    s.addImage({path:photo,x:cut,y:0,w:W-cut,h:H,sizing:{type:"cover",w:W-cut,h:H}});
    rect(s,cut,0,W-cut,H,T.dark,58);
    rect(s,cut,0,0.045,H,T.accent);
  }
  txt(s,heading[0],{x:M,y:0.95,w:6,h:0.72,fontFace:SANS_SB,fontSize:TYPE.tocDisplay,
    color:T.white,valign:"middle"});
  txt(s,heading[1],{x:M,y:1.65,w:6,h:0.72,fontFace:SANS_SB,fontSize:TYPE.tocDisplay,
    color:T.accent,valign:"middle"});
  rect(s,M,2.62,1.5,0.035,T.accent);
  T.sections.forEach((sec,i)=>{
    const y=3.05+i*0.79, on=(i===active);
    arrow(s,M+0.02,y+0.09,0.19,on?T.accent:"4A5563");
    txt(s,sec[0].toUpperCase(),{x:M+0.42,y,w:4.6,h:0.38,fontFace:on?SANS_SB:SANS_M,
      fontSize:TYPE.pillar,color:on?T.white:"7E8794",charSpacing:1.4,valign:"middle"});
    txt(s,sec[1],{x:M+5.05,y,w:0.7,h:0.38,fontFace:SANS_M,fontSize:TYPE.tocPage,
      color:on?T.accent:"5C6674",align:"right",valign:"middle"});
  });
  s.addImage({path:T.igcWhiteLogo,x:W-M-0.55,y:0.42,w:0.55,h:0.55*T.igcAR});
  // page number stays on the dark field — over the photo it loses contrast
  txt(s,String(page),{x:cut-1.0,y:H-0.6,w:0.7,h:0.3,fontFace:SANS_M,fontSize:TYPE.body,
    color:T.muteDark,align:"right",valign:"middle"});
  return s;
}

/**
 * Series rail (Soul). For "N items, same anatomy" content — success cases, business
 * units, product segments. Render one slide per item with the same detail layout and
 * this rail on the left, active item highlighted. The repetition is the point: it lets
 * a reader compare items without relearning the layout each time.
 *
 * items: [{name, sub}, ...]  ·  returns the x where the detail column should start.
 */
function seriesRail(s,items,active,{y=1.95,h=4.28,w=2.5,footer=null,footerAR=1}={}){
  rrect(s,M,y,w,h,T.dark,{radius:0.1});
  txt(s,"SUCCESS CASES",{x:M+0.26,y:y+0.24,w:w-0.52,h:0.24,fontFace:SANS_SB,
    fontSize:TYPE.label,color:T.accent,charSpacing:1.4});
  items.forEach((it,j)=>{
    const iy=y+0.66+j*0.92, on=(j===active);
    if(on) rrect(s,M+0.16,iy,w-0.32,0.78,T.accent,{radius:0.07});
    arrow(s,M+0.3,iy+0.31,0.15,on?T.white:"4A5563");
    txt(s,it.name,{x:M+0.56,y:iy+0.08,w:w-0.78,h:0.3,fontFace:on?SANS_SB:SANS_M,
      fontSize:10,color:on?T.white:"8B95A5",valign:"middle"});
    if(it.sub) txt(s,it.sub,{x:M+0.56,y:iy+0.36,w:w-0.78,h:0.32,fontSize:7.5,
      color:on?T.tint2:"5C6674",valign:"top",lineSpacingMultiple:1.1});
  });
  if(footer) logoCard(s,footer,footerAR,M+0.26,y+h-1.0,w-0.52,0.74,{pad:0.12,border:null});
  return M+w+0.4;
}

function colChart(s,type,data,x,y,w,h,opts={}){
  s.addChart(type,data,Object.assign({
    x,y,w,h,barDir:"col",showLegend:false,showValue:true,
    chartColors:[T.chartDark,T.accent,T.chartLight,T.muteDark],
    dataLabelFontFace:SANS_SB,dataLabelFontSize:TYPE.body,dataLabelColor:T.chartDark,
    dataLabelPosition:"outEnd",
    catAxisLabelFontFace:SANS,catAxisLabelFontSize:TYPE.body,catAxisLabelColor:T.gray,
    catGridLine:{style:"none"},catAxisLineShow:false,
    valAxisHidden:true,valGridLine:{style:"none"},valAxisLineShow:false,barGapWidthPct:52,
  },opts));
}

/** Zebra financial table with a dark header (every reference deck uses this shape). */
function dreTable(s,{cols,rows,x=M,y=1.95,w=W-2*M,labW=4.0,rh=0.28,value}={}){
  const dataW=(w-labW)/cols.length;
  rrect(s,x,y,w,0.42,T.dark,{radius:0.05});
  txt(s,"BRL Mn",{x:x+0.2,y,w:labW,h:0.42,fontFace:SANS_SB,fontSize:8.5,
    color:T.white,valign:"middle"});
  cols.forEach((c,i)=>txt(s,c,{x:x+labW+i*dataW,y,w:dataW-0.16,h:0.42,fontFace:SANS_SB,
    fontSize:8.5,color:T.white,align:"right",valign:"middle"}));
  rows.forEach((r,i)=>{
    const ry=y+0.42+i*rh, bold=r[1]===1, it=r[1]===2;
    if(bold) rect(s,x,ry,w,rh,T.tint);
    else if(i%2===1) rect(s,x,ry,w,rh,T.paper);
    txt(s,r[0],{x:x+0.2,y:ry,w:labW-0.2,h:rh,fontFace:bold?SANS_SB:SANS,fontSize:TYPE.label,
      color:it?T.gray:T.text,italic:it,valign:"middle"});
    cols.forEach((c,j)=>{
      const v=(value&&value(r[0],c))||"–";
      txt(s,v,{x:x+labW+j*dataW,y:ry,w:dataW-0.16,h:rh,fontFace:bold?SANS_SB:SANS,
        fontSize:TYPE.label,color:it?T.gray:(v==="–"?T.grayL:T.text),italic:it,
        align:"right",valign:"middle"});
    });
  });
}

module.exports = {init, get p(){return p;}, get T(){return T;},
  W,H,M,FOOT_Y,IGC_NAVY,IGC_GOLD,SANS,SANS_M,SANS_SB,SANS_L,TYPE,
  bg,rect,rrect,txt,arrow,logoFit,logoCard,iconChip,photoCircle,tabEyebrow,
  chrome,footerMark,conclusionBand,statTile,tocSlide,seriesRail,colChart,dreTable};
