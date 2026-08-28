// Biscoitê (Project Bluebird) — slide de portfólio: as cinco famílias de produto.
//
// Layout: "matriz de cobertura" — 5 famílias × (papel · canal · calendário). Escolhido sobre
// duas alternativas "core + extensões" porque estas subordinavam Cestas e Colecionáveis a
// extensões, contradizendo o posicionamento do próprio deck ("nationwide premium gifting
// platform", TAM de gifting US$ 48 Bn). A matriz dá linha própria a cada família e argumenta
// COBERTURA — que é literalmente o argumento de mercado do CIM.
//
// Famílias confirmadas nas tarjas manuscritas do material da Companhia (Biscoitês, salgados,
// cestas, colecionáveis, infantil). Números verificados: +120 SKUs e ~200 lançamentos/ano (p4),
// +380 no pipeline (p30), 30-45 dias até a prateleira (p19).
// A coluna de calendário é INFERÊNCIA — marcada como indicativa no cabeçalho e no rodapé.
const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';
p.author = 'IGC Partners';
p.title = 'Biscoitê — Portfólio de produtos';

const NAVY='222F44', BLUE='6580A2', POWDER='B8D0E0', LIGHT='E0E8F0',
      PAPER='F2F5F8', WHITE='FFFFFF', TEXT='3A4657', GRAY='6E7681', GRAY_L='9AA3AD';
const SERIF='Source Serif Pro', SERIF_B='Source Serif Pro Black';
const SANS='Poppins', SANS_M='Poppins Medium', SANS_SB='Poppins SemiBold';
const W=13.333, H=7.5, M=0.8;
const A='assets/biscoite/';

const s=p.addSlide(); s.background={color:WHITE};
const txt=(t,o)=>s.addText(t,Object.assign({margin:0,fontFace:SANS,color:TEXT},o));
const rect=(x,y,w,h,c,tr)=>{const o={x,y,w,h,fill:{color:c},line:{type:'none'}};if(tr)o.fill.transparency=tr;s.addShape(p.ShapeType.rect,o);};
const rrect=(x,y,w,h,c,r,ln)=>s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:r||0.04,
  fill:c?{color:c}:{type:'none'},line:ln?{color:ln.c,width:ln.w||0.75}:{type:'none'}});

/* ===== CABEÇALHO ===== */
txt('PORTFÓLIO DE PRODUTOS',{x:M,y:0.32,w:5,h:0.20,fontFace:SANS_M,fontSize:9,color:BLUE,charSpacing:1.4,valign:'middle'});
txt('Cinco famílias que cobrem ocasiões, canais e meses diferentes',
    {x:M,y:0.54,w:9.4,h:0.36,fontFace:SANS_SB,fontSize:18,color:NAVY,valign:'middle'});
txt('+120 SKUs e ~200 lançamentos por ano — amplitude ancorada numa linha core de recompra',
    {x:M,y:0.92,w:9.4,h:0.26,fontSize:10.5,color:BLUE,valign:'middle'});
s.addImage({path:'assets/bluebird/biscoite.png',x:11.63,y:0.36,w:0.90,h:0.90*(448/1200)});

/* ===== RAIL DE ESCALA ===== */
const RY=1.28, RH=0.42;
rrect(M,RY,W-2*M,RH,LIGHT,0.04);
const rail=[['5','famílias'],['+120','SKUs'],['~200','lançamentos/ano'],['+380','no pipeline'],['30–45','dias até a prateleira']];
const rw=(W-2*M)/5;
rail.forEach((r,i)=>{
  const x=M+i*rw;
  if(i) rect(x,RY+0.08,0.01,RH-0.16,BLUE,55);
  s.addText([{text:r[0]+'  ',options:{fontFace:SANS_SB,fontSize:12,color:NAVY}},
             {text:r[1],options:{fontFace:SANS,fontSize:8,color:BLUE}}],
    {x:x+0.22,y:RY,w:rw-0.3,h:RH,valign:'middle',margin:0});
});

/* ===== GRADE ===== */
const C1=M, C2=5.00, C3=6.95, CAL=9.30, CALW=12.533-CAL;
const CELLS=12, STEP=CALW/CELLS, CW=STEP-0.031;
const MON=['J','F','M','A','M','J','J','A','S','O','N','D'];

// cabeçalho da matriz
const HY=1.88;
txt('família',{x:C1,y:HY,w:3.6,h:0.18,fontFace:SANS_SB,fontSize:9,color:NAVY,charSpacing:1,valign:'middle'});
txt('papel no portfólio',{x:C2,y:HY,w:1.85,h:0.18,fontFace:SANS_SB,fontSize:9,color:NAVY,charSpacing:1,valign:'middle'});
txt('canal de maior tração',{x:C3,y:HY,w:2.10,h:0.18,fontFace:SANS_SB,fontSize:9,color:NAVY,charSpacing:1,valign:'middle'});
txt('calendário (indicativo)',{x:CAL,y:HY,w:CALW,h:0.18,fontFace:SANS_SB,fontSize:9,color:NAVY,charSpacing:1,valign:'middle'});
MON.forEach((m,i)=>txt(m,{x:CAL+i*STEP,y:2.08,w:CW,h:0.16,fontSize:7,color:BLUE,align:'center',valign:'middle'}));
rect(M,2.26,W-2*M,0.01,BLUE);
rect(9.15,2.26,0.008,4.27,LIGHT);

// estados do calendário: 0 base · 1 elevada · 2 pico
const ROWS=[
 {n:'1',name:'Biscoitês',core:true,img:'biscoites.jpg',
  desc:'Cookies, amanteigados e di limone — o produto que traz o cliente de volta.',
  role:'recompra e frequência', ch:'Lojas próprias e franquias',
  cal:[1,1,1,1,1,1,1,1,1,1,1,1]},
 {n:'2',name:'Colecionáveis',img:'colecionaveis.jpg',
  desc:'Latas e edições limitadas: a embalagem é o produto.',
  role:'ticket e recompra por coleção', ch:'Colabs, edições limitadas, store-in-store',
  cal:[0,0,2,2,0,0,0,0,0,0,2,2]},
 {n:'3',name:'Cestas',img:'cestas.jpg',
  desc:'Kits que reúnem as outras quatro famílias num único ticket.',
  role:'cross-sell entre famílias', ch:'E-commerce, marketplaces e B2B',
  cal:[0,0,0,0,2,1,0,2,0,0,0,2]},
 {n:'4',name:'Salgados',img:'salgados.jpg',
  desc:'Biscoito de queijo, Azeitê, Olivê e geleias.',
  role:'ocasião não-doce', ch:'Lojas próprias e e-commerce',
  cal:[0,0,0,0,0,0,0,0,0,0,1,1]},
 {n:'5',name:'Infantil',img:'infantil.jpg',
  desc:'Biscoitos decorados e latas-personagem.',
  role:'novo público', ch:'Quiosques, shoppings e licenças',
  cal:[0,0,0,0,0,0,1,0,0,2,0,2]},
];
const CALC=[LIGHT,BLUE,NAVY];

let y=2.30;
ROWS.forEach((r,i)=>{
  const h = r.core?1.03:0.80;
  if(r.core){ rect(M,y,W-2*M,h,LIGHT); rect(M,y,0.06,h,NAVY); }
  else rect(M,y,W-2*M,0.008,LIGHT);

  const chip = r.core?0.88:0.72;
  const cy   = r.core? y+0.08 : y+0.04;
  txt(r.n,{x:M+0.06,y:cy+0.06,w:0.26,h:0.28,fontFace:SERIF_B,fontSize:r.core?14:12,
    color:r.core?NAVY:BLUE,align:'center',valign:'middle'});
  const cx = r.core?1.20:1.28;
  s.addImage({path:A+r.img,x:cx,y:cy,w:chip,h:chip,sizing:{type:'cover',w:chip,h:chip}});
  rrect(cx,cy,chip,chip,null,0.03,{c:LIGHT,w:0.75});

  const nx=2.20;
  txt(r.name,{x:nx,y:r.core?y+0.16:y+0.08,w:2.0,h:0.24,fontFace:SANS_SB,
    fontSize:r.core?12:11,color:NAVY,valign:'middle'});
  if(r.core){ rrect(nx+1.02,y+0.19,0.60,0.18,NAVY,0.09);
    txt('core',{x:nx+1.02,y:y+0.19,w:0.60,h:0.18,fontFace:SANS_M,fontSize:7,color:WHITE,align:'center',valign:'middle'}); }
  txt(r.desc,{x:nx,y:r.core?y+0.44:y+0.32,w:2.70,h:0.44,fontSize:9,color:TEXT,valign:'top',lineSpacingMultiple:1.14});

  const my=r.core?y+0.34:y+0.22;
  txt(r.role,{x:C2,y:my,w:1.85,h:0.34,fontFace:SANS_SB,fontSize:9,color:BLUE,valign:'top',lineSpacingMultiple:1.14});
  txt(r.ch,{x:C3,y:my,w:2.10,h:0.34,fontSize:9,color:NAVY,valign:'top',lineSpacingMultiple:1.14});

  const bh=r.core?0.26:0.24;
  r.cal.forEach((v,j)=>rect(CAL+j*STEP,my,CW,bh,CALC[v]));
  y+=h;
});
rect(M,y,W-2*M,0.01,BLUE);

// legenda do calendário
const lg=[['pico',NAVY],['elevada',BLUE],['base',LIGHT]];
let lx=CAL;
lg.forEach(g=>{ rect(lx,6.64,0.10,0.10,g[1]);
  txt(g[0],{x:lx+0.14,y:6.59,w:0.66,h:0.20,fontSize:7,color:BLUE,valign:'middle'}); lx+=0.86; });

/* ===== FONTE ===== */
txt('Fonte: Companhia. Famílias e fotos são material da própria Companhia; o CIM não traz quebra de receita nem de SKU por família. Papel, canal e calendário são leitura da IGC — os picos são indicativos, a confirmar com a Companhia.',
    {x:M,y:6.58,w:8.20,h:0.26,fontSize:7,color:GRAY_L,valign:'top',lineSpacingMultiple:1.16});

/* ===== BANDA DE FECHO ===== */
rect(0,6.88,W,0.62,NAVY);
rect(0,6.88,0.13,0.62,POWDER);
s.addText([{text:'Uma linha core sustenta a recompra; quatro famílias ampliam ',options:{color:'E8ECF1'}},
           {text:'ocasião, ticket e calendário',options:{color:POWDER}}],
  {x:2.10,y:6.88,w:W-4.2,h:0.62,fontFace:SANS_SB,fontSize:12,align:'center',valign:'middle',margin:0});
s.addImage({path:'assets/igc_white.png',x:M,y:7.05,w:0.30,h:0.30*(778/900)});
s.addText([{text:'12',options:{color:WHITE,fontFace:SANS_M}},{text:'    Confidential',options:{color:'8B95A5',fontFace:SANS}}],
  {x:M+0.40,y:7.07,w:3,h:0.24,fontSize:9,align:'left',valign:'middle',margin:0});

p.writeFile({fileName:'Biscoite_slide_produtos.pptx'}).then(()=>console.log('WROTE Biscoite_slide_produtos.pptx'));
