// Project Amazon — Anavilhanas Jungle Lodge · teaser one-page para a Great Plains.
//
// Formato e linguagem visual do teaser de referência (Pj_Amazon_Teaser_2026): retrato
// 7,5 x 10,833 pol, verde #23574A, dourado #96772C, teal #46AD95, Source Serif Pro + sans.
//
// Todo dado vem dos slides 9-17 do Information Memorandum. O teaser é construído para
// responder de frente à preocupação da Great Plains com o TAMANHO: reenquadra 25 chaves
// como baixa densidade no portal de um parque de 350.000 ha, abre a composição unidade a
// unidade, e declara com transparência as áreas fora do lote principal (incluindo a
// expansão de 16 quartos, que levaria o total a 41).
const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.defineLayout({name:'ONEPAGER', width:7.5, height:10.833});
p.layout = 'ONEPAGER';
p.author = 'IGC Partners';
p.title = 'Project Amazon — Anavilhanas Jungle Lodge';

const GREEN='23574A', GREEN_D='1A4239', TEAL='46AD95', TEAL_L='D6EDE6',
      GOLD='96772C', GOLD_L='B08F3E', GOLD_T='F3EEE0',
      GRAYBG='EAEDF2', GRAYBG2='F5F6FA', WHITE='FFFFFF',
      TEXT='1F2A28', GRAY='6E7681', GRAY_L='9AA3AD', ONDARK='D9E4E0';
const SERIF='Source Serif Pro', SERIF_B='Source Serif Pro Black', SERIF_L='Source Serif Pro Light';
const SANS='Poppins', SANS_M='Poppins Medium', SANS_SB='Poppins SemiBold', SANS_L='Poppins Light';
const W=7.5, H=10.833, M=0.42, CW=W-2*M;
const A='assets/anav/';

const s=p.addSlide(); s.background={color:WHITE};
const txt=(t,o)=>s.addText(t,Object.assign({margin:0,fontFace:SANS,color:TEXT},o));
const rect=(x,y,w,h,c,tr)=>{const o={x,y,w,h,fill:{color:c},line:{type:'none'}};if(tr)o.fill.transparency=tr;s.addShape(p.ShapeType.rect,o);};
const rrect=(x,y,w,h,c,r,ln)=>s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:r||0.04,
  fill:c?{color:c}:{type:'none'},line:ln?{color:ln.c,width:ln.w||0.75,dashType:ln.d}:{type:'none'}});
// numeral de seção + título, no padrão do teaser de referência
function sectionHead(n,y,title,sub){
  txt(n+'.',{x:M,y:y-0.06,w:0.62,h:0.42,fontFace:SERIF_B,fontSize:22,color:GOLD,valign:'middle'});
  txt(title,{x:M+0.66,y:y-0.08,w:CW-0.66,h:0.28,fontFace:SERIF_B,fontSize:12,color:TEXT,valign:'middle'});
  if(sub) txt(sub,{x:M+0.66,y:y+0.19,w:CW-0.66,h:0.22,fontSize:7.5,color:GRAY,valign:'middle'});
}

/* ================= CABEÇALHO ================= */
s.addImage({path:'assets/bluebird/igc.png',x:M,y:0.30,w:0.44,h:0.44*(778/900)});
txt('Project Amazon',{x:M,y:0.82,w:5.2,h:0.46,fontFace:SERIF_B,fontSize:26,color:TEXT,valign:'middle'});
txt('ANAVILHANAS JUNGLE LODGE  ·  RIO NEGRO, AMAZONAS  ·  40′ DE HIDROAVIÃO DESDE MANAUS',{x:M,y:1.26,w:CW,h:0.2,fontFace:SANS_M,fontSize:7,color:GOLD,charSpacing:1.1,valign:'middle'});
txt('Lodge de conservação em escala boutique, no portal de um dos maiores arquipélagos fluviais do mundo',
    {x:M,y:1.46,w:CW,h:0.22,fontSize:8.5,color:GRAY,valign:'middle'});

/* ================= FAIXA HERO — A ESCALA ================= */
const HY=1.72, HH=1.24;
s.addImage({path:A+'aerial_river.jpg',x:0,y:HY,w:W,h:HH,sizing:{type:'cover',w:W,h:HH}});
rect(0,HY,W,HH,GREEN,26);
rect(0,HY,W,0.035,GOLD);
const stats=[['25','chaves no lote principal'],['24','unidades independentes'],['350.000 ha','de floresta protegida no entorno¹']];
stats.forEach((t,i)=>{
  const x=M+i*(CW/3);
  txt(t[0],{x,y:HY+0.24,w:CW/3-0.14,h:0.44,fontFace:SERIF_B,fontSize:i===2?21:26,color:WHITE,valign:'middle'});
  txt(t[1],{x,y:HY+0.70,w:CW/3-0.14,h:0.3,fontSize:7.5,color:ONDARK,valign:'top',lineSpacingMultiple:1.1});
  if(i) rect(x-0.11,HY+0.28,0.008,0.62,'FFFFFF',62);
});
txt('Densidade rara: uma chave para cada ~14 mil hectares de floresta protegida no entorno',
    {x:M,y:HY+HH-0.28,w:CW,h:0.22,fontFace:SANS_M,fontSize:7.5,color:TEAL_L,valign:'middle'});

/* ================= 01 · COMPOSIÇÃO DO LOTE ================= */
let y=3.12;
sectionHead('01',y,'A composição real do lote','25 chaves distribuídas em 24 unidades independentes — não um bloco hoteleiro único');
const UY=y+0.46;
const units=[['16','Chalés','com vista para a floresta'],
             ['04','Bangalôs','vista de 180°'],
             ['03','Panorâmicos','quartos com varanda'],
             ['01','Villa','exclusiva, com 2 quartos']];
const uw=(4.28-0.18*3)/4;
units.forEach((u,i)=>{
  const x=M+i*(uw+0.18);
  rrect(x,UY,uw,0.80,GRAYBG2,0.04,{c:GRAYBG,w:0.75});
  rect(x,UY,uw,0.028,TEAL);
  txt(u[0],{x:x+0.1,y:UY+0.10,w:uw-0.2,h:0.30,fontFace:SERIF_B,fontSize:16,color:GREEN,valign:'middle'});
  txt(u[1],{x:x+0.1,y:UY+0.39,w:uw-0.2,h:0.18,fontFace:SANS_SB,fontSize:7,color:TEXT,valign:'middle'});
  txt(u[2],{x:x+0.1,y:UY+0.56,w:uw-0.2,h:0.22,fontSize:6.2,color:GRAY,valign:'top',lineSpacingMultiple:1.05});
});
rrect(M,UY+0.88,4.28,0.30,GOLD_T,0.04);
s.addText([{text:'24 unidades  ·  ',options:{fontFace:SANS_M,fontSize:7.5,color:GRAY}},
           {text:'25 chaves no total',options:{fontFace:SANS_SB,fontSize:8,color:GOLD}},
           {text:'   —   a villa responde por 2 das 25',options:{fontFace:SANS,fontSize:7,color:GRAY}}],
  {x:M+0.12,y:UY+0.88,w:4.04,h:0.30,valign:'middle',margin:0});
// foto aérea comprovando a dispersão
s.addImage({path:A+'aerial_lodge.jpg',x:M+4.44,y:UY,w:CW-4.44,h:1.18,sizing:{type:'cover',w:CW-4.44,h:1.18}});
rect(M+4.44,UY+0.88,CW-4.44,0.30,GREEN,18);
txt('O lodge visto do alto, imerso na mata',{x:M+4.52,y:UY+0.88,w:CW-4.6,h:0.30,fontFace:SANS_M,fontSize:6.5,color:WHITE,valign:'middle'});

/* ================= 02 · CONSERVAÇÃO E COMUNIDADE ================= */
y=4.92;
sectionHead('02',y,'Conservação e comunidade','Única empresa certificada B Corp do estado do Amazonas');
const CY=y+0.46;
// bloco B Corp
rrect(M,CY,3.16,1.06,GREEN,0.04);
txt('88',{x:M+0.16,y:CY+0.14,w:0.78,h:0.44,fontFace:SERIF_B,fontSize:24,color:WHITE,valign:'middle'});
txt('B Impact\nAssessment',{x:M+0.16,y:CY+0.58,w:0.9,h:0.4,fontSize:6.5,color:ONDARK,valign:'top',lineSpacingMultiple:1.1});
[['Ambiente','18,3'],['Comunidade','30,1'],['Colaboradores','21,7']].forEach((t,i)=>{
  const yy=CY+0.13+i*0.28;
  txt(t[0],{x:M+1.16,y:yy,w:1.2,h:0.24,fontSize:7,color:ONDARK,valign:'middle'});
  txt(t[1],{x:M+2.36,y:yy,w:0.66,h:0.24,fontFace:SANS_SB,fontSize:8.5,color:TEAL,align:'right',valign:'middle'});
  if(i<2) rect(M+1.16,yy+0.27,1.86,0.006,'FFFFFF',72);
});
// bloco Instituto
rrect(M+3.32,CY,CW-3.32,1.06,GRAYBG2,0.04,{c:GRAYBG,w:0.75});
txt('Instituto Anavilhanas',{x:M+3.46,y:CY+0.12,w:CW-3.6,h:0.22,fontFace:SANS_SB,fontSize:8,color:GREEN,valign:'middle'});
txt('Criado em 2022, formaliza um trabalho com as comunidades ribeirinhas em curso desde a fundação do lodge, em 2007 — educação, saúde, desenvolvimento local e proteção ambiental',
    {x:M+3.46,y:CY+0.33,w:CW-3.62,h:0.44,fontSize:6.5,color:GRAY,valign:'top',lineSpacingMultiple:1.12});
[['+150','famílias impactadas'],['8','projetos sociais']].forEach((t,i)=>{
  const x=M+3.46+i*1.42;
  txt(t[0],{x,y:CY+0.74,w:0.62,h:0.26,fontFace:SERIF_B,fontSize:14,color:GOLD,valign:'middle'});
  txt(t[1],{x:x+0.62,y:CY+0.77,w:0.8,h:0.24,fontSize:6.5,color:GRAY,valign:'middle',lineSpacingMultiple:1.05});
});

/* ================= 03 · ÁREAS ALÉM DO LOTE ================= */
y=6.62;
sectionHead('03',y,'Áreas além do lote principal','Declaradas integralmente — cada uma é uma decisão separada para o comprador');
const SY=y+0.46;
const sat=[['Base Avançada','50 km','do lodge','Complexo de apoio, destino final de trilhas e passeios','core'],
           ['Área de expansão','420 m','do lodge','1.252 m² construídos · 16 quartos · conclusão prevista 2026','opt'],
           ['Villa Amazônia','Manaus','centro histórico','Hotel urbano com 29 chaves (4 standard · 20 superior · 5 premium)','opt']];
const sw=(CW-0.2*2)/3;
sat.forEach((t,i)=>{
  const x=M+i*(sw+0.2);
  const opt = t[4]==='opt';
  rrect(x,SY,sw,0.98,WHITE,0.04,{c:opt?GOLD_L:TEAL,w:0.9,d:opt?'dash':null});
  txt(t[0],{x:x+0.12,y:SY+0.10,w:sw-0.24,h:0.2,fontFace:SANS_SB,fontSize:7.5,color:opt?GOLD:GREEN,valign:'middle'});
  s.addText([{text:t[1],options:{fontFace:SERIF_B,fontSize:13,color:TEXT}},
             {text:'  '+t[2],options:{fontFace:SANS,fontSize:6.5,color:GRAY}}],
    {x:x+0.12,y:SY+0.31,w:sw-0.24,h:0.28,valign:'middle',margin:0});
  txt(t[3],{x:x+0.12,y:SY+0.60,w:sw-0.24,h:0.38,fontSize:6.5,color:GRAY,valign:'top',lineSpacingMultiple:1.12});
});
// a aritmética da expansão, dita abertamente
rrect(M,SY+1.08,CW,0.44,GOLD_T,0.04);
rect(M,SY+1.08,0.045,0.44,GOLD);
s.addText([{text:'Expansão:  ',options:{fontFace:SANS_SB,fontSize:7.5,color:GOLD}},
           {text:'25 chaves hoje  →  41 se integralmente executada.',options:{fontFace:SANS_SB,fontSize:7.5,color:TEXT}},
           {text:'  O terreno fica a 420 m do lodge e a obra é fisicamente separada — pode ser mantida como reserva de terra, redimensionada ou não executada, sem afetar a operação atual.',options:{fontFace:SANS,fontSize:7,color:GRAY}}],
  {x:M+0.16,y:SY+1.08,w:CW-0.3,h:0.44,valign:'middle',margin:0,lineSpacingMultiple:1.08});

/* ================= DIFERENCIAIS + FAUNA ================= */
y=8.72;
rect(M,y,CW,0.012,GRAYBG);
txt('DIFERENCIAIS DO LOTE',{x:M,y:y+0.10,w:2.4,h:0.18,fontFace:SANS_SB,fontSize:6.5,color:GOLD,charSpacing:1});
const dif=['Duas piscinas sobre o Rio Negro','Torre de observação da floresta',
           'Bar flutuante no rio','Restaurante, spa e academia'];
dif.forEach((d,i)=>{
  const x=M+(i%2)*2.16, yy=y+0.32+Math.floor(i/2)*0.19;
  txt('▪',{x,y:yy,w:0.1,h:0.17,fontSize:6,color:TEAL,valign:'middle'});
  txt(d,{x:x+0.11,y:yy,w:2.0,h:0.17,fontSize:6.6,color:TEXT,valign:'middle'});
});
txt('FAUNA E PAISAGEM',{x:M+4.5,y:y+0.10,w:2.16,h:0.18,fontFace:SANS_SB,fontSize:6.5,color:GOLD,charSpacing:1});
txt('Arquipélago de Anavilhanas (Parque Nacional) · igapós e igarapés navegáveis de canoa · observação noturna de fauna no Rio Negro',
    {x:M+4.5,y:y+0.32,w:2.16,h:0.56,fontSize:6.4,color:GRAY,valign:'top',lineSpacingMultiple:1.16});

/* ================= CONTATOS ================= */
y=9.48;
rect(M,y,CW,0.012,GRAYBG);
txt('Para mais informações, entre em contato:',{x:M,y:y+0.10,w:3.4,h:0.2,fontFace:SANS_M,fontSize:7,color:GOLD,valign:'middle'});
txt('+55 11 3815 3533',{x:M+CW-2.0,y:y+0.10,w:2.0,h:0.2,fontSize:6.6,color:GRAY_L,align:'right',valign:'middle'});
[['Bruno Iervolino','Bruno.iervolino@igcp.com.br'],['Luca Francini','Luca.francini@igcp.com.br'],['Pedro Grando','Pedro.grando@igcp.com.br']]
 .forEach((t,i)=>{
  const x=M+i*(CW/3);
  txt(t[0],{x,y:y+0.32,w:CW/3-0.1,h:0.18,fontFace:SANS_SB,fontSize:7,color:TEXT,valign:'middle'});
  txt(t[1],{x,y:y+0.49,w:CW/3-0.1,h:0.16,fontSize:6.3,color:GRAY,valign:'middle'});
});

/* ================= FAIXA DE FOTO ================= */
const PY=10.18, PH=0.14;
s.addImage({path:A+'panorama.jpg',x:0,y:PY,w:W,h:PH,sizing:{type:'cover',w:W,h:PH}});

/* ================= FONTES E DISCLAIMER ================= */
txt('Fontes: Information Memorandum Project Amazon (páginas 9–17), Companhia, B Corp, Vogue.  (1) Parque Nacional de Anavilhanas — área protegida pública no entorno do lote, com mais de 3,5 bilhões de m² de floresta preservada; não integra a propriedade.  Área do lote principal a confirmar com a Companhia.',
    {x:M,y:PY+PH+0.04,w:CW,h:0.20,fontSize:5.2,color:GRAY_L,valign:'top',lineSpacingMultiple:1.14});
txt('Disclaimer: material preparado com base em informações fornecidas pela Companhia ou obtidas pela IGC por fontes legais e pesquisas independentes. Nenhuma responsabilidade é atribuída à IGC quanto à exatidão ou completude das informações, nem garantia quanto a projeções futuras. Este material pertence à IGC e não deve ser reproduzido ou divulgado a terceiros sem consentimento prévio.',
    {x:M,y:PY+PH+0.26,w:CW,h:0.24,fontSize:4.9,color:GRAY_L,align:'justify',valign:'top',lineSpacingMultiple:1.1});

p.writeFile({fileName:'Project_Amazon_Teaser_Lote_GreatPlains.pptx'}).then(()=>console.log('WROTE Project_Amazon_Teaser_Lote_GreatPlains.pptx'));
