// Project Bluebird (Biscoitê) — slide 10 redesenhado: football field de Enterprise Value.
//
// Dados reconstruídos do XML do gráfico original (chart23/chart24), não redigitados:
//   base(noFill) -> CinzaEsq -> ser1 -> ser2 -> CinzaDir, overlap 100
// Cada faixa foi conferida contra a tabela EV/EBITDA do próprio slide a EBITDA 2026E = R$ 21,4 MM.
//
// ATENÇÃO: a faixa concluída impressa no slide original ("159 - 194") NÃO bate com o
// gráfico nem com a tabela de múltiplos, que convergem para R$ 170 - 208 MM (7,9x - 9,7x).
// Este slide usa a faixa corroborada; ver nota ao usuário.
const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';
p.author = 'IGC Partners';
p.title = 'Project Bluebird — Precificação final';

// paleta do próprio deck
const PLUM='413245', BLUE='6580A2', POWDER='BED7E7', POWDER_L='DCE9F2',
      GOLD='D3A93D', GOLD_L='F5EBD3', GOLD_D='A8842B', CREAM='F9F6EF',
      WHITE='FFFFFF', LINE='E3E7EC', GRAY='6E7681', GRAY_L='9AA3AD', NAVY='222F44';
const SANS='Poppins', SANS_M='Poppins Medium', SANS_SB='Poppins SemiBold', SANS_L='Poppins Light';
const W=13.333, H=7.5, M=0.8;

const EBITDA = 21.4;
// [rótulo, mín, máx, múltiplos impressos, grupo]  — grupo: 0 = DCF (intrínseco), 1 = mercado
const ROWS = [
  ['DCF — base',                    124.3, 186.5, '5,8x – 8,7x',  0],
  ['DCF — investidor',              177.9, 242.2, '8,3x – 11,3x', 0],
  ['Companhias listadas Brasil',    130.3, 159.3, '6,1x – 7,5x',  1],
  ['Companhias listadas Europa + EUA¹', 201.6, 246.4, '9,5x – 11,6x', 1],
  ['Transações comparáveis',        215.8, 263.8, '10,1x – 12,3x',1],
];
const CONC = {min:170.1, max:207.9, mid:189.0, mult:'7,9x – 9,7x', midMult:'8,8x'};

// ---- escala ----
const AX_MIN=120, AX_MAX=280;
const PX=3.62, PW=6.62;                    // área de plotagem
const sx = v => PX + (v-AX_MIN)/(AX_MAX-AX_MIN)*PW;
const GRID=[120,160,200,240,280];
const MULT_TICKS=[6,8,10,12];              // eixo secundário: EV/EBITDA

const s = p.addSlide();
s.background = {color:WHITE};
const txt=(t,o)=>s.addText(t,Object.assign({margin:0,fontFace:SANS,color:PLUM},o));
const rect=(x,y,w,h,c,op)=>{const o={x,y,w,h,fill:{color:c},line:{type:'none'}};if(op)o.fill.transparency=op;s.addShape(p.ShapeType.rect,o);};
const rrect=(x,y,w,h,c,r,ln)=>s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:r||0.05,
  fill:c?{color:c}:{type:'none'},line:ln?{color:ln.c,width:ln.w||1,dashType:ln.d}:{type:'none'}});

/* ---------- cabeçalho ---------- */
txt('Precificação final — Enterprise Value',{x:M,y:0.46,w:9,h:0.5,fontFace:SANS_SB,fontSize:18,color:BLUE,valign:'middle'});
txt('Resultado da precificação da Biscoitê baseada em diferentes metodologias',
    {x:M,y:0.95,w:9.5,h:0.34,fontSize:10.5,color:GRAY,valign:'middle'});

// pílula de premissa
rrect(M,1.40,3.02,0.36,CREAM,0.18,{c:GOLD,w:1});
s.addText([{text:'EBITDA 2026E  ',options:{color:GRAY,fontFace:SANS}},
           {text:'R$ 21,4 MM',options:{color:PLUM,fontFace:SANS_SB}}],
  {x:M,y:1.40,w:3.02,h:0.36,fontSize:9,align:'center',valign:'middle',margin:0});
txt('DCF: WACC 17,6% – 21,6% (base 19,6%) · g = 3,0%   ·   Múltiplos: variação de ±10%',
    {x:M+3.2,y:1.40,w:6.2,h:0.36,fontSize:8,color:GRAY_L,valign:'middle'});

/* ---------- eixo superior (R$ MM) ---------- */
const TOP=2.05, BOT=5.92;
txt('Enterprise Value — R$ MM',{x:M,y:TOP-0.30,w:PX-M-0.62,h:0.24,fontFace:SANS_M,fontSize:8,color:GRAY,align:'right',valign:'middle',charSpacing:0.8});
GRID.forEach(g=>{
  const x=sx(g);
  rect(x-0.005,TOP,0.01,BOT-TOP, g===AX_MIN?LINE:LINE);
  txt(String(g),{x:x-0.42,y:TOP-0.30,w:0.84,h:0.24,fontFace:SANS_M,fontSize:8,color:GRAY,align:'center',valign:'middle'});
});

/* ---------- corredor da faixa concluída (atrás de tudo) ---------- */
const cx0=sx(CONC.min), cx1=sx(CONC.max);
rect(cx0,TOP,cx1-cx0,BOT-TOP,GOLD_L);
[cx0,cx1].forEach(x=>s.addShape(p.ShapeType.line,{x,y:TOP,w:0,h:BOT-TOP,
  line:{color:GOLD,width:1,dashType:'dash'}}));
txt('FAIXA CONCLUÍDA',{x:cx0,y:TOP-0.0,w:cx1-cx0,h:0.22,fontFace:SANS_SB,fontSize:6.5,
  color:GOLD_D,align:'center',valign:'middle',charSpacing:0.9});

/* ---------- linhas de metodologia ---------- */
const R0=2.42, PITCH=0.54, BH=0.32;
const groupTop=[];
ROWS.forEach((r,i)=>{
  const extra = (r[4]===1 && ROWS[i-1] && ROWS[i-1][4]===0) ? 0.16 : 0;
  const y = R0 + i*PITCH + (r[4]===1?0.14:0);
  if(!groupTop[r[4]]) groupTop[r[4]] = y;
  groupTop[r[4]+10] = y+BH;                       // guarda o fim do grupo
  const x0=sx(r[1]), x1=sx(r[2]);
  // rótulo
  txt(r[0],{x:M,y:y-0.04,w:2.66,h:BH+0.08,fontSize:9,color:PLUM,align:'right',valign:'middle',lineSpacingMultiple:1.0});
  // barra
  const dcf = r[4]===0;
  rrect(x0,y,x1-x0,BH,dcf?BLUE:POWDER,0.04, dcf?null:{c:BLUE,w:0.75});
  // rótulos de extremidade
  txt(String(Math.round(r[1])),{x:x0-0.72,y,w:0.64,h:BH,fontFace:SANS_M,fontSize:8.5,color:GRAY,align:'right',valign:'middle'});
  txt(String(Math.round(r[2])),{x:x1+0.08,y,w:0.64,h:BH,fontFace:SANS_SB,fontSize:8.5,color:PLUM,align:'left',valign:'middle'});
  // múltiplo implícito à direita
  txt(r[3],{x:11.02,y,w:1.51,h:BH,fontFace:SANS_M,fontSize:8.5,color:BLUE,align:'right',valign:'middle'});
});

// chaves de grupo
[['INTRÍNSECO',0],['MERCADO',1]].forEach(([lbl,g])=>{
  const y0=groupTop[g], y1=groupTop[g+10];
  rect(M-0.16,y0,0.022,y1-y0,g===0?BLUE:POWDER);
  s.addText(lbl,{x:0.52-0.62,y:(y0+y1)/2-0.15,w:1.24,h:0.3,fontFace:SANS_SB,fontSize:6.5,color:g===0?BLUE:'8FA8C4',
    align:'center',valign:'middle',charSpacing:1,rotate:270,margin:0});
});

/* ---------- linha concluída ---------- */
const CY=5.30, CBH=0.44;
rect(M,CY-0.15,W-2*M,0.012,LINE);
txt('Faixa de precificação',{x:M,y:CY-0.02,w:2.66,h:CBH,fontFace:SANS_SB,fontSize:9.5,color:GOLD_D,align:'right',valign:'middle'});
// trilho claro do intervalo total
rrect(sx(124.3),CY+0.08,sx(263.8)-sx(124.3),CBH-0.16,'F1F3F5',0.04);
rrect(cx0,CY,cx1-cx0,CBH,GOLD,0.05);
// marca da mediana
s.addShape(p.ShapeType.line,{x:sx(CONC.mid),y:CY-0.06,w:0,h:CBH+0.12,line:{color:WHITE,width:1.5}});
txt(String(Math.round(CONC.min)),{x:cx0-0.72,y:CY,w:0.64,h:CBH,fontFace:SANS_SB,fontSize:9,color:GOLD_D,align:'right',valign:'middle'});
txt(String(Math.round(CONC.max)),{x:cx1+0.08,y:CY,w:0.64,h:CBH,fontFace:SANS_SB,fontSize:9,color:GOLD_D,align:'left',valign:'middle'});
txt(CONC.mult,{x:11.02,y:CY,w:1.51,h:CBH,fontFace:SANS_SB,fontSize:8.5,color:GOLD_D,align:'right',valign:'middle'});

/* ---------- eixo secundário: EV/EBITDA ---------- */
MULT_TICKS.forEach(m=>{
  const v=m*EBITDA; if(v<AX_MIN||v>AX_MAX) return;
  const x=sx(v);
  s.addShape(p.ShapeType.line,{x,y:BOT,w:0,h:0.07,line:{color:GRAY_L,width:0.75}});
  txt(m+',0x',{x:x-0.42,y:BOT+0.08,w:0.84,h:0.22,fontFace:SANS_M,fontSize:8,color:GRAY,align:'center',valign:'middle'});
});
txt('EV / EBITDA 2026E  →',{x:PX-2.5,y:BOT+0.07,w:2.4,h:0.22,fontFace:SANS_M,fontSize:8,color:GRAY,align:'right',valign:'middle'});

/* ---------- destaque da conclusão ---------- */
const bx=M, by=6.46, bw=W-2*M, bh=0.5;
rrect(bx,by,bw,bh,CREAM,0.06,{c:GOLD,w:1});
rect(bx,by,0.06,bh,GOLD);
s.addText([
  {text:'Faixa de precificação sugerida   ',options:{fontFace:SANS_M,fontSize:9.5,color:GRAY}},
  {text:'R$ 170 – 208 MM',options:{fontFace:SANS_SB,fontSize:14,color:PLUM}},
  {text:'   ·   ponto médio  ',options:{fontFace:SANS,fontSize:9,color:GRAY}},
  {text:'R$ 189 MM',options:{fontFace:SANS_SB,fontSize:10.5,color:PLUM}},
  {text:'   ·   ',options:{fontFace:SANS,fontSize:9,color:GRAY_L}},
  {text:'7,9x – 9,7x',options:{fontFace:SANS_SB,fontSize:10.5,color:GOLD_D}},
  {text:'  EBITDA 2026E',options:{fontFace:SANS,fontSize:9,color:GRAY}},
],{x:bx+0.28,y:by,w:bw-0.5,h:bh,valign:'middle',margin:0});

/* ---------- marcas do deck ---------- */
s.addImage({path:'assets/bluebird/igc.png',   x:W-M-0.52, y:0.42, w:0.52, h:0.52*(778/900)});
s.addImage({path:'assets/bluebird/biscoite.png', x:W-M-1.35, y:6.92, w:1.25, h:1.25*(448/1200)});

/* ---------- rodapé ---------- */
txt('Fonte: Empresa, S&P Capital IQ, Mergermarket.  (1) Desconto de 14,3% sobre os múltiplos das listadas no exterior, equivalente aos prêmios de tamanho, liquidez e risco-país refletidos no custo de capital.',
    {x:M+0.36,y:7.08,w:9.7,h:0.22,fontSize:7,color:GRAY_L,valign:'middle'});
txt('10',{x:M,y:7.08,w:0.3,h:0.22,fontFace:SANS_M,fontSize:8,color:GRAY_L,align:'left',valign:'middle'});

p.writeFile({fileName:'Bluebird_slide10_v2.pptx'}).then(()=>console.log('WROTE Bluebird_slide10_v2.pptx'));
