// Project Amazon — teaser one-page do lote (Anavilhanas) para a Great Plains.
//
// MESMO DESIGN do teaser de referência Pj_Amazon_Teaser_2026 — geometria medida do próprio
// arquivo e do render: retrato 7,5 x 10,833"; colunas em x = 0,39 / 2,66 / 4,93 (larg. 1,97);
// numerais 01/02/03 em y=1,22; banda verde full-bleed em y=2,34 h=1,37; seção branca até
// 5,72; seção cinza y=5,72 h=2,14; contatos em y=7,97/8,25; faixa de foto y=8,76 h=0,83;
// fontes e disclaimer no pé. Só o CONTEÚDO muda.
const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.defineLayout({name:'ONEPAGER', width:7.5, height:10.833});
p.layout='ONEPAGER';
p.author='IGC Partners';
p.title='Project Amazon — teaser do lote';

const GREEN='23574A', TEAL='46AD95', TEAL_D='2E7D6B', GOLD='96772C',
      GRAYBG='F4F5F9', LINE='E3E6EC', WHITE='FFFFFF',
      TEXT='121212', GRAY='6E7681', GRAY_L='9AA3AD', ONDARK='CFE0DA';
const SERIF='Source Serif Pro', SERIF_B='Source Serif Pro Black', SERIF_L='Source Serif Pro Light';
const SANS='Poppins', SANS_M='Poppins Medium', SANS_SB='Poppins SemiBold', SANS_L='Poppins Light';
const W=7.5, H=10.833, M=0.39;
const COL=[0.39,2.66,4.93], CWID=1.97;
const A='assets/anav/';

const s=p.addSlide(); s.background={color:WHITE};
const txt=(t,o)=>s.addText(t,Object.assign({margin:0,fontFace:SANS,color:TEXT},o));
const rect=(x,y,w,h,c,tr)=>{const o={x,y,w,h,fill:{color:c},line:{type:'none'}};if(tr)o.fill.transparency=tr;s.addShape(p.ShapeType.rect,o);};
// anel de estatística, como os donuts do teaser de referência
function ring(cx,cy,d,color,label,sub){
  s.addShape(p.ShapeType.ellipse,{x:cx-d/2,y:cy-d/2,w:d,h:d,fill:{type:'none'},line:{color,width:6}});
  txt(label,{x:cx-d/2,y:cy-0.16,w:d,h:0.32,fontFace:SERIF_B,fontSize:15,color:GOLD,align:'center',valign:'middle'});
  if(sub) txt(sub,{x:cx-0.62,y:cy+d/2+0.05,w:1.24,h:0.20,fontSize:6.2,color:GRAY,align:'center',valign:'middle'});
}

/* ===== CABEÇALHO ===== */
s.addImage({path:'assets/bluebird/igc.png',x:M,y:0.20,w:0.50,h:0.50*(778/900)});
txt('Project Amazon',{x:M,y:0.64,w:6.5,h:0.46,fontFace:SERIF_B,fontSize:28,color:TEXT,valign:'middle'});

/* ===== TRÊS BLOCOS NUMERADOS ===== */
const heads=['O lote opera em escala boutique, não de hotel',
             'Conservação e comunidade estão no centro da operação',
             'A expansão é opcional e fisicamente separada'];
heads.forEach((h,i)=>{
  txt('0'+(i+1)+'.',{x:COL[i],y:1.20,w:CWID,h:0.56,fontFace:SERIF_B,fontSize:30,color:GOLD,valign:'middle'});
  txt(h,{x:COL[i],y:1.76,w:(i===2?2.08:CWID),h:0.56,fontSize:10,color:TEXT,valign:'top',lineSpacingMultiple:1.16});
});

/* ===== BANDA VERDE ===== */
const BY=2.34, BH=1.37;
rect(0,BY,W,BH,GREEN);
const bullets=[
 [['25 chaves','em 24 unidades independentes, dispersas na mata'],
  ['16 chalés','· 4 bangalôs · 3 panorâmicos · 1 villa (2 quartos)'],
  ['~14 mil ha','de floresta protegida no entorno por chave¹']],
 [['B Corp 88','única empresa certificada do estado do Amazonas'],
  ['+150 famílias','impactadas pelo Instituto Anavilhanas'],
  ['Desde 2007','trabalho contínuo com comunidades ribeirinhas']],
 [['420 m','distância da área de expansão ao lodge'],
  ['16 quartos','em 1.252 m² — pode não ser executada'],
  ['2 áreas extras','Base Avançada (50 km) e Villa Amazônia (Manaus)']],
];
bullets.forEach((col,i)=>{
  col.forEach((b,j)=>{
    const x=COL[i]-0.05, y=BY+0.18+j*0.36;
    rect(x,y+0.10,0.075,0.012,TEAL);
    s.addText([{text:b[0]+'  ',options:{fontFace:SANS_SB,fontSize:8,color:WHITE}},
               {text:b[1],options:{fontFace:SANS,fontSize:7,color:ONDARK}}],
      {x:x+0.13,y,w:2.06,h:0.34,valign:'top',lineSpacingMultiple:1.12,margin:0});
  });
});

/* ===== SEÇÃO BRANCA ===== */
// coluna esquerda — o argumento de densidade
txt('A relação entre quartos e área',{x:M,y:3.92,w:1.95,h:0.42,fontFace:SANS_SB,fontSize:10,color:TEXT,valign:'top',lineSpacingMultiple:1.14});
txt('As 25 chaves estão distribuídas em 24 unidades independentes, implantadas dentro da mata às margens do Rio Negro — não em um bloco hoteleiro único. O lote fica no portal do Parque Nacional de Anavilhanas, um dos maiores arquipélagos fluviais do mundo.',
    {x:M,y:4.38,w:1.95,h:1.10,fontSize:7.5,color:GRAY,valign:'top',lineSpacingMultiple:1.22});
// coluna central — composição das unidades
txt('COMPOSIÇÃO DAS UNIDADES',{x:2.60,y:3.90,w:2.30,h:0.18,fontFace:SANS_SB,fontSize:6.5,color:GOLD,charSpacing:1});
[['16','Chalés com vista para a floresta'],['04','Bangalôs com vista de 180°'],
 ['03','Quartos panorâmicos com varanda'],['01','Villa exclusiva, com 2 quartos']].forEach((u,i)=>{
  const y=4.14+i*0.30;
  txt(u[0],{x:2.60,y,w:0.42,h:0.26,fontFace:SERIF_B,fontSize:14,color:GREEN,valign:'middle'});
  txt(u[1],{x:3.06,y,w:1.86,h:0.26,fontSize:7,color:TEXT,valign:'middle'});
  if(i<3) rect(2.60,y+0.27,2.30,0.008,LINE);
});
s.addText([{text:'24 unidades  ·  ',options:{fontFace:SANS,fontSize:7,color:GRAY}},
           {text:'25 chaves',options:{fontFace:SANS_SB,fontSize:8,color:GOLD}},
           {text:'   ·  a villa responde por 2',options:{fontFace:SANS,fontSize:6.5,color:GRAY}}],
  {x:2.60,y:5.36,w:2.42,h:0.24,valign:'middle',margin:0});
// coluna direita — foto aérea do lodge
s.addImage({path:A+'aerial_lodge.jpg',x:5.02,y:3.88,w:2.09,h:1.42,sizing:{type:'cover',w:2.09,h:1.42}});
txt('O lodge visto do alto, imerso na mata',{x:5.02,y:5.34,w:2.09,h:0.2,fontSize:6.2,color:GRAY_L,align:'center',valign:'middle'});

/* ===== SEÇÃO CINZA ===== */
const GY=5.72, GH=2.14;
rect(0,GY,W,GH,GRAYBG);
txt('Uma operação de conservação certificada, com trabalho comunitário estruturado e uma expansão que o comprador decide se executa.',
    {x:0.40,y:GY+0.12,w:6.70,h:0.44,fontFace:SANS_SB,fontSize:10,color:TEXT,valign:'top',lineSpacingMultiple:1.16});
// mix das unidades como barra empilhada
txt('Distribuição das 24 unidades',{x:0.40,y:GY+0.60,w:3.0,h:0.18,fontSize:7,color:GRAY});
const segs=[[16,'16 chalés',GREEN],[4,'4 bangalôs',TEAL_D],[3,'3 panorâmicos',TEAL],[1,'1 villa',GOLD]];
let bx=0.40; const BW=4.42;
segs.forEach(g=>{ const w=BW*g[0]/24; rect(bx,GY+0.80,w-0.02,0.22,g[2]); bx+=w; });
bx=0.40;
segs.forEach((g,i)=>{ const w=BW*g[0]/24;
  if(i<2) txt(g[1],{x:bx+0.06,y:GY+0.80,w:w-0.1,h:0.22,fontSize:6.5,color:WHITE,valign:'middle'});
  bx+=w; });
// legenda completa, abaixo da barra
let lx=0.40;
segs.forEach(g=>{
  rect(lx,GY+1.11,0.09,0.09,g[2]);
  txt(g[1],{x:lx+0.14,y:GY+1.05,w:1.0,h:0.20,fontSize:6.2,color:GRAY,valign:'middle'});
  lx+=1.12;
});
// áreas fora do lote principal
txt('ÁREAS ALÉM DO LOTE PRINCIPAL',{x:0.40,y:GY+1.34,w:3.0,h:0.18,fontFace:SANS_SB,fontSize:6.5,color:GOLD,charSpacing:1});
[['Base Avançada','50 km do lodge — apoio a trilhas e passeios'],
 ['Área de expansão','420 m — 16 quartos em 1.252 m², prevista para 2026'],
 ['Villa Amazônia','Manaus — 29 chaves (4 standard · 20 superior · 5 premium)']].forEach((t,i)=>{
  const y=GY+1.55+i*0.19;
  rect(0.40,y+0.07,0.06,0.012,GOLD);
  s.addText([{text:t[0]+'  ',options:{fontFace:SANS_SB,fontSize:6.8,color:TEXT}},
             {text:t[1],options:{fontFace:SANS,fontSize:6.5,color:GRAY}}],
    {x:0.54,y,w:4.30,h:0.19,valign:'middle',margin:0});
});
// anéis de estatística, à direita
ring(5.56,GY+0.78,0.68,GREEN,'88','B Corp score');
ring(6.62,GY+0.78,0.68,GOLD,'+150','famílias impactadas');
txt('25 chaves hoje  →  41 se a expansão for integralmente executada',
    {x:5.02,y:GY+1.46,w:2.16,h:0.44,fontFace:SANS_M,fontSize:6.6,color:GREEN,align:'center',valign:'top',lineSpacingMultiple:1.20});

/* ===== CONTATOS ===== */
txt('For any further questions please contact:',{x:0.40,y:7.97,w:6.31,h:0.18,fontFace:SANS_SB,fontSize:8,color:GOLD,valign:'middle'});
[['Bruno Iervolino','Bruno.iervolino@igcp.com.br'],
 ['Luca Francini','Luca.francini@igcp.com.br'],
 ['Pedro Grando','Pedro.grando@igcp.com.br']].forEach((t,i)=>{
  const x=[0.39,2.97,5.58][i];
  txt(t[0],{x,y:8.22,w:1.9,h:0.18,fontFace:SANS_SB,fontSize:7.5,color:TEXT,valign:'middle'});
  txt(t[1],{x,y:8.40,w:1.9,h:0.16,fontSize:6.8,color:GRAY,valign:'middle'});
  txt('+55 11 3815 3533',{x,y:8.55,w:1.9,h:0.16,fontSize:6.8,color:GRAY_L,valign:'middle'});
});

/* ===== FAIXA DE FOTO ===== */
s.addImage({path:A+'aerial_river.jpg',x:0,y:8.76,w:W,h:0.83,sizing:{type:'cover',w:W,h:0.83}});

/* ===== FONTES E DISCLAIMER ===== */
txt('Fontes: Information Memorandum Project Amazon (páginas 9–17), Companhia, B Corp, Vogue.',
    {x:0.39,y:9.68,w:3.65,h:0.30,fontSize:5.5,color:GRAY_L,valign:'top',lineSpacingMultiple:1.16});
txt('[1] Parque Nacional de Anavilhanas — área protegida pública no entorno do lote (mais de 3,5 bilhões de m² de floresta preservada); não integra a propriedade. Área do lote principal a confirmar com a Companhia.',
    {x:4.13,y:9.68,w:3.06,h:0.34,fontSize:5.5,color:GRAY_L,valign:'top',lineSpacingMultiple:1.16});
txt('Disclaimer:',{x:0.39,y:10.10,w:1.0,h:0.16,fontFace:SANS_SB,fontSize:7,color:GOLD,valign:'middle'});
txt('All information contained in this material has been prepared based on the documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or through independent researches. No liability is or shall be attributed to the members of IGC, including its partners, directors, employees, agents or advisers, in connection with the accuracy or completeness of the information contained herein. In particular, no representation or warranty is given as to the achievement or reasonableness of any future projections, management estimates, prospects or returns. This material belongs to IGC and shall not be copied, reproduced and/or distributed or disclosed to any third party without the prior consent of IGC.',
    {x:0.39,y:10.28,w:6.72,h:0.46,fontSize:5,color:GRAY_L,align:'justify',valign:'top',lineSpacingMultiple:1.14});

p.writeFile({fileName:'Project_Amazon_Teaser_Lote_GreatPlains.pptx'}).then(()=>console.log('WROTE Project_Amazon_Teaser_Lote_GreatPlains.pptx'));
