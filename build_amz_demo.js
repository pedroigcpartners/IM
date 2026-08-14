// Project Rainforest — Amazon Brasil CIM (DEMO, dados públicos ilustrativos).
// Construído com o kit da skill cim-builder para demonstrar a troca de pele:
// laranja #FF9900 (smile) + squid-ink #131A22 / painel #232F3E (tokens públicos da marca;
// site inacessível do sandbox). Brasil-específicos não divulgados ficam [TBC].
const K = require('./.claude/skills/cim-builder/scripts/igc_deck.js');
const {p, T} = K.init({
  accent:'FF9900', accentDark:'CC7A00', tint:'FFF0D6', tint2:'FFE2AD',
  dark:'131A24'.replace('24','22'), darkPanel:'232F3E', darkLine:'3A4A5E',
  chartDark:'232F3E', chartLight:'DDE3EA',
  logo:'assets/demo_amz/amz_dark.png', logoAR:340/1200,
  sections:[['Introduction','04'],['Investment Thesis','08'],['Company Overview','13'],['Financial Highlights','16']],
  title:'Project Rainforest — Confidential Information Memorandum (demo)',
});
const A='assets/demo_amz/', W=K.W, H=K.H, M=K.M;
const AMZ_AR=340/1200;
const DEMO='Demonstração ilustrativa — fontes públicas (relatórios anuais, imprensa); dados Brasil não divulgados marcados [TBC].';

/* ============ 1 COVER ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.dark);
  s.addImage({path:A+'smile.png',x:1.2,y:2.2,w:7.2,h:3.6,transparency:22});
  K.rect(s,8.6,0,0.05,H,T.accent);
  s.addImage({path:A+'amz_white.png',x:8.95,y:1.7,w:3.4,h:3.4*AMZ_AR});
  K.rrect(s,8.97,3.1,3.36,0.86,null,{radius:0.06,line:T.accent,lw:1.5});
  K.txt(s,'PROJECT RAINFOREST',{x:8.97,y:3.1,w:3.36,h:0.86,fontFace:'Poppins SemiBold',fontSize:18,color:T.white,align:'center',valign:'middle',charSpacing:1.5});
  K.txt(s,'Confidential Information Memorandum',{x:8.97,y:4.16,w:3.36,h:0.32,fontSize:10.5,color:T.onDark,align:'center'});
  K.txt(s,'São Paulo  ·  2026  ·  Demonstração',{x:8.97,y:4.52,w:3.36,h:0.3,fontFace:'Poppins Medium',fontSize:9,color:T.accent,align:'center',charSpacing:1});
  s.addImage({path:'assets/igc_white.png',x:W-M-0.58,y:0.42,w:0.58,h:0.58*T.igcAR});
  K.txt(s,'E-commerce & cloud platform  ·  Brasil',{x:M,y:H-0.62,w:7,h:0.3,fontFace:'Poppins Medium',fontSize:10,color:'E8ECF1'});
})();

/* ============ 2 DISCLAIMER ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.txt(s,'Disclaimer',{x:M,y:0.5,w:8,h:0.6,fontFace:'Poppins SemiBold',fontSize:24,color:T.dark,valign:'middle'});
  K.txt(s,'Project Rainforest — demonstração',{x:M,y:1.06,w:8,h:0.28,fontFace:'Poppins Medium',fontSize:9,color:T.accentDark});
  K.rect(s,M,1.42,0.9,0.03,T.accent);
  const c1=[
   'IGC has been retained by Amazon Brasil ("Company"), on an exclusive basis, to advise the Company in its M&A process ("Transaction"). This material ("Information Memorandum") describes and summarizes the Company, its assets, market and economic and financial indicators and has been prepared exclusively to assist the recipient in deciding whether it wishes to proceed with a further investigation of a possible Transaction with the Company. In no event shall the recipient use any of this information for any commercial purposes or for purposes other than the one for which this memorandum is furnished.',
   'All information contained in this Information Memorandum has been prepared based on the documents and/or information provided by the Company or obtained directly by IGC through legal sources and/or through independent research. IGC has not investigated, verified or audited the documents and information used for its preparation. This Information Memorandum contains statements, estimates and projections concerning anticipated future performance, which may or may not prove to be correct. No representations, expressed or implied, are made as to their accuracy.',
   'This Memorandum of Information is not intended to form any part of the basis of any investment decision or other evaluation, or any decision to participate in the Transaction process, and should not be considered a recommendation by the Company or IGC to any reader. Each reader must make its own valuation of the Transaction. No liability is or shall be attributed to the members of IGC, including its partners, directors or employees, in connection with the accuracy or completeness of the information contained herein.'];
  const c2=[
   'This material belongs to IGC and shall not be copied, reproduced, distributed and/or disclosed, in whole or in part, including by digital media, to any third party without the express and prior written consent of IGC. By accepting this material, the recipient agrees to return it as soon as requested by IGC, and to maintain strict confidentiality over all information contained herein.',
   'Since the existence of the Transaction is not publicly disclosed, the recipient agrees not to approach or contact any officer, employee, client, supplier or representative of the Company without the express written permission of IGC. In furnishing this material, IGC undertakes no obligation to provide access to additional information, to update it, or to correct any inaccuracies which may become apparent.',
   'Material de demonstração: este documento foi gerado como exemplo de design; os dados são públicos e ilustrativos e não representam qualquer mandato real.'];
  const mk=a=>a.map(t=>({text:t,options:{breakLine:true,paraSpaceAfter:9}}));
  K.txt(s,mk(c1),{x:M,y:1.62,w:5.5,h:3.5,fontSize:7.5,color:'55606D',align:'justify',valign:'top',lineSpacingMultiple:1.16});
  K.txt(s,mk(c2),{x:6.62,y:1.62,w:5.5,h:3.5,fontSize:7.5,color:'55606D',align:'justify',valign:'top',lineSpacingMultiple:1.16});
  K.rrect(s,6.62,5.28,4.72,1.32,T.dark,{radius:0.1});
  K.rect(s,6.62,5.52,0.055,0.84,T.accent);
  K.txt(s,'[Deal team — TBC]',{x:6.88,y:5.42,w:3.6,h:0.3,fontFace:'Poppins SemiBold',fontSize:12,color:T.white});
  K.txt(s,'IGC Partners',{x:6.88,y:5.7,w:3.6,h:0.24,fontFace:'Poppins Medium',fontSize:9,color:T.accent});
  K.txt(s,'Av. Brigadeiro Faria Lima, 2277 — 6th floor\n01452-000  São Paulo – SP    Tel: (55 11) 3815-3533',
      {x:6.88,y:5.94,w:4.2,h:0.62,fontSize:7.5,color:T.onDark,lineSpacingMultiple:1.2,valign:'top'});
  K.footerMark(s,2,false);
})();

/* ============ 3 TOC — Introduction ============ */
K.tocSlide({active:0,page:3,photo:A+'toc_panel.png'});

/* ============ 4 AT A GLANCE ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Introduction',title:'Amazon Brasil at a glance',
    subtitle:'Plataforma de e-commerce, logística e serviços digitais operando no Brasil desde 2012, apoiada na infraestrutura global da Amazon',
    source:'Source: relatórios anuais Amazon.com Inc. (10-K 2024); imprensa. '+DEMO, page:4, band:true});
  const qs=[['Everything store + Prime','Seleção ampla com entrega rápida e assinatura Prime — frete, vídeo, música e ofertas em um programa único de fidelidade'],
            ['Logística própria','Rede de centros de distribuição e estações de entrega própria, com same-day nas principais capitais [escopo — TBC]'],
            ['Marketplace + FBA','Vendedores terceiros vendem na plataforma e contratam a logística como serviço (Logística da Amazon), gerando receita de take-rate'],
            ['AWS + Ads','Nuvem AWS (região São Paulo desde 2011) e retail media — motores globais de margem presentes no país']];
  const qw=3.95, qh=1.42, qy=1.95;
  qs.forEach((q,i)=>{ const x=M+(i%2)*(qw+0.28), y=qy+Math.floor(i/2)*(qh+0.24);
    K.rrect(s,x,y,qw,qh,T.paper,{radius:0.08,line:T.line});
    K.rect(s,x,y,0.05,qh,T.accent);
    K.txt(s,q[0],{x:x+0.24,y:y+0.16,w:qw-0.44,h:0.34,fontFace:'Poppins SemiBold',fontSize:10.5,color:T.dark,valign:'middle'});
    K.txt(s,q[1],{x:x+0.24,y:y+0.54,w:qw-0.48,h:0.8,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.16});
  });
  const px=M+2*qw+0.56, pw=W-M-px;
  K.rrect(s,px,qy,pw,qh*2+0.24,T.dark,{radius:0.1});
  K.txt(s,'REFERÊNCIAS GLOBAIS',{x:px+0.28,y:qy+0.2,w:pw-0.56,h:0.24,fontFace:'Poppins SemiBold',fontSize:8,color:T.accent,charSpacing:1.5});
  const kp=[['US$ 638 bn','Net sales globais 2024 (+11%)'],['+200 Mn','Membros Prime no mundo'],['2012','Início das operações no Brasil'],['[TBC]','Receita Brasil (não divulgada)']];
  kp.forEach((k,i)=>{ const y=qy+0.56+i*0.63;
    K.txt(s,k[0],{x:px+0.28,y,w:pw-0.56,h:0.3,fontFace:'Poppins SemiBold',fontSize:15,color:k[0]==='[TBC]'?T.muteDark:T.white,valign:'middle'});
    K.txt(s,k[1],{x:px+0.28,y:y+0.28,w:pw-0.56,h:0.22,fontSize:8,color:T.muteDark,valign:'middle'});
    if(i<kp.length-1) K.rect(s,px+0.28,y+0.55,pw-0.56,0.012,T.darkLine);
  });
  const by=qy+qh*2+0.5;
  K.statTile(s,M,by,2.75,0.86,'US$ 107,6 bn','AWS — receita global 2024');
  K.statTile(s,M+2.95,by,2.75,0.86,'US$ 56,2 bn','Advertising — receita global 2024');
  K.txt(s,'Aberturas por país não são divulgadas pela companhia; métricas Brasil a construir com a gestão.',
    {x:M+5.95,y:by+0.12,w:W-M-6.0-M+0.2,h:0.66,fontSize:8.5,color:T.gray,valign:'middle',italic:true,lineSpacingMultiple:1.15});
  K.conclusionBand(s,[['Escala global, operação local — e um ',0],['flywheel de crescimento',1],[' rodando no Brasil desde 2012',0]],{page:4});
})();

/* ============ 5 FLYWHEEL ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Introduction',title:'O flywheel que sustenta o modelo',
    subtitle:'O ciclo virtuoso clássico da Amazon: mais seleção melhora a experiência, que traz tráfego, que atrai vendedores — reduzindo custos e preços',
    source:'Source: framework público da companhia (flywheel). '+DEMO, page:5, band:true});
  const cx=4.05, cy=4.05, R=1.62;
  s.addShape(p.ShapeType.ellipse,{x:cx-R,y:cy-R,w:2*R,h:2*R,fill:{type:'none'},line:{color:T.accent,width:2.5,dashType:'dash'}});
  s.addShape(p.ShapeType.ellipse,{x:cx-0.62,y:cy-0.62,w:1.24,h:1.24,fill:{color:T.dark},line:{type:'none'}});
  K.txt(s,'Cresci-\nmento',{x:cx-0.62,y:cy-0.62,w:1.24,h:1.24,fontFace:'Poppins SemiBold',fontSize:11,color:T.white,align:'center',valign:'middle',lineSpacingMultiple:0.95});
  const nodes=[['Seleção',0,-1],['Experiência\ndo cliente',1,0],['Tráfego',0,1],['Vendedores',-1,0]];
  nodes.forEach(n=>{ const nx=cx+n[1]*R, ny=cy+n[2]*R, d=0.72;
    s.addShape(p.ShapeType.ellipse,{x:nx-d/2,y:ny-d/2,w:d,h:d,fill:{color:T.accent},line:{color:T.white,width:2}});
    let lx=nx-0.85, ly=n[2]<0?ny-1.04:ny+0.44, la='center';
    if(n[1]<0){ lx=nx-d/2-1.62; ly=ny-0.3; la='right'; }        // rótulo à esquerda do círculo
    if(n[1]>0){ lx=nx+d/2+0.12; ly=ny-0.3; la='left';  }        // rótulo à direita do círculo
    K.txt(s,n[0],{x:lx,y:ly,w:1.5,h:0.6,fontFace:'Poppins SemiBold',fontSize:9,color:T.dark,align:la,valign:'middle',lineSpacingMultiple:0.95});
  });
  ['Seleção','Experiência\ndo cliente'].forEach(()=>{});
  const caps=[['Mais seleção','Marketplace amplia o sortimento sem capital próprio em estoque'],
              ['Melhor experiência','Entrega rápida e confiável eleva conversão e recompra'],
              ['Mais tráfego','Clientes recorrentes atraem mais vendedores à plataforma'],
              ['Custos menores','Escala dilui custo fixo e permite preços menores — girando o ciclo']];
  const rx=8.15, rw=W-M-rx;
  caps.forEach((c,i)=>{ const y=1.98+i*1.06;
    K.rrect(s,rx,y,rw,0.92,i%2?T.tint:T.paper,{radius:0.08,line:i%2?null:T.line});
    K.arrow(s,rx+0.2,y+0.18,0.15);
    K.txt(s,c[0],{x:rx+0.48,y:y+0.08,w:rw-0.68,h:0.3,fontFace:'Poppins SemiBold',fontSize:10,color:T.dark});
    K.txt(s,c[1],{x:rx+0.48,y:y+0.38,w:rw-0.68,h:0.48,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.12});
  });
  K.conclusionBand(s,[['Cada volta do ciclo ',0],['reforça a próxima',1],[' — o modelo compõe vantagem com escala',0]],{page:5});
})();

/* ============ 6 MARKET ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Introduction',title:'Um mercado estrutural para o e-commerce brasileiro',
    subtitle:'Drivers de longo prazo sustentam a digitalização do varejo no Brasil',
    source:'Source: imprensa e dados setoriais públicos; dimensionamento a desenvolver. '+DEMO, page:6, band:true});
  const dr=[['Penetração digital em expansão','O e-commerce ainda responde por fração minoritária do varejo total brasileiro, com espaço estrutural de conversão do físico para o digital'],
            ['Logística continental','Dimensão territorial e malha complexa favorecem quem tem rede própria de distribuição e densidade de entrega'],
            ['Pagamentos instantâneos','Pix e parcelamento ampliaram o acesso à compra online em todas as classes de renda'],
            ['Consumo fora das capitais','A interiorização da demanda premia plataformas com alcance nacional e promessa de prazo confiável']];
  const cw=(W-2*M-0.72)/4, y0=2.0, chh=3.42;
  dr.forEach((d,i)=>{ const x=M+i*(cw+0.24);
    K.rrect(s,x,y0,cw,chh,T.paper,{radius:0.09,line:T.line});
    K.rect(s,x,y0,cw,0.045,T.accent);
    K.txt(s,'0'+(i+1),{x:x+0.22,y:y0+0.22,w:1,h:0.4,fontFace:'Poppins SemiBold',fontSize:20,color:T.accent});
    K.txt(s,d[0],{x:x+0.22,y:y0+0.72,w:cw-0.44,h:0.62,fontFace:'Poppins SemiBold',fontSize:10,color:T.dark,valign:'top',lineSpacingMultiple:1.1});
    K.txt(s,d[1],{x:x+0.22,y:y0+1.4,w:cw-0.44,h:1.86,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.18});
  });
  const by=y0+chh+0.3;
  K.txt(s,'[Dimensionamento de mercado — TAM, penetração e share por categoria — a desenvolver com dados setoriais]',
    {x:M,y:by,w:W-2*M,h:0.3,fontSize:9,color:T.grayL,italic:true,align:'center',valign:'middle'});
  K.conclusionBand(s,[['Drivers ',0],['estruturais, não cíclicos',1],[' — digitalização, logística e pagamentos',0]],{page:6});
})();

/* ============ 7 TOC — Thesis ============ */
K.tocSlide({active:1,page:7,photo:A+'toc_panel.png'});

/* ============ 8 THESIS OVERVIEW ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Investment Thesis',title:'Por que Amazon Brasil',
    subtitle:'Cinco pilares sustentam a tese de investimento',
    source:'Source: framework ilustrativo sobre fontes públicas. '+DEMO, page:8});
  const th=[['Marca e escala globais a serviço da operação local','Infraestrutura, tecnologia e poder de compra globais aplicados ao varejo brasileiro'],
            ['Receita recorrente ancorada no Prime','Assinatura consolida frete, vídeo e ofertas — elevando frequência e retenção'],
            ['Rede logística própria difícil de replicar','Centros de distribuição e estações de entrega com densidade crescente e same-day nas capitais'],
            ['Economia de plataforma no marketplace','Take-rate + FBA transformam vendedores em clientes de serviços logísticos'],
            ['Múltiplas avenidas de crescimento','Retail media, novas categorias e interiorização — além de AWS no negócio corporativo']];
  const y0=1.92, rh=0.84;
  th.forEach((t,i)=>{ const y=y0+i*rh, d=0.46;
    s.addShape(p.ShapeType.ellipse,{x:M,y:y+0.06,w:d,h:d,fill:{color:T.accent},line:{type:'none'}});
    K.txt(s,String(i+1),{x:M,y:y+0.06,w:d,h:d,fontFace:'Poppins SemiBold',fontSize:14,color:T.white,align:'center',valign:'middle'});
    s.addText([{text:t[0],options:{fontFace:'Poppins SemiBold',color:T.dark}},{text:'  —  ',options:{color:T.accent}},{text:t[1],options:{color:T.gray}}],
      {x:M+0.66,y:y-0.02,w:7.6,h:0.74,fontSize:9,valign:'middle',lineSpacingMultiple:1.16,margin:0,fontFace:'Poppins'});
    if(i<th.length-1) K.rect(s,M+0.66,y+rh-0.08,7.6,0.01,T.line);
  });
  const px=9.35, pw=W-M-px;
  K.rrect(s,px,1.95,pw,4.3,T.dark,{radius:0.1});
  s.addImage({path:A+'smile.png',x:px+0.3,y:4.7,w:pw-0.6,h:(pw-0.6)/2,transparency:35});
  K.txt(s,'O QUE JÁ É PÚBLICO',{x:px+0.26,y:2.16,w:pw-0.52,h:0.24,fontFace:'Poppins SemiBold',fontSize:8,color:T.accent,charSpacing:1.4});
  [['+30 anos','de operação global'],['14 anos','de Brasil (desde 2012)'],['+200 Mn','membros Prime no mundo']].forEach((t,i)=>{ const y=2.5+i*0.72;
    K.txt(s,t[0],{x:px+0.26,y,w:pw-0.52,h:0.3,fontFace:'Poppins SemiBold',fontSize:14,color:T.white,valign:'middle'});
    K.txt(s,t[1],{x:px+0.26,y:y+0.28,w:pw-0.52,h:0.22,fontSize:8,color:T.muteDark,valign:'middle'});
  });
})();

/* ============ 9 PILLAR — LOGISTICS ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Investment Thesis',num:3,title:'Uma rede logística própria difícil de replicar',
    subtitle:'Da entrada do pedido à porta do cliente, a malha própria encurta prazos e protege a experiência',
    source:'Source: divulgações públicas; contagens e cobertura por praça a confirmar. '+DEMO, page:9, band:true});
  const steps=[['Centros de distribuição','Estoque posicionado perto da demanda; CDs em múltiplos estados [contagem — TBC]'],
               ['Estações de entrega','Pontos avançados de last mile nas regiões metropolitanas [rede — TBC]'],
               ['Last mile & same-day','Entrega no mesmo dia nas principais capitais [cobertura — TBC]'],
               ['Devolução & atendimento','Logística reversa integrada à promessa de confiança da marca']];
  const cw2=2.62, gap=0.24, y0=2.05, chh=2.4;
  steps.forEach((st,i)=>{ const x=M+i*(cw2+gap);
    K.rrect(s,x,y0,cw2,chh,T.paper,{radius:0.08,line:T.line});
    K.rect(s,x,y0,cw2,0.045,T.accent);
    K.txt(s,'0'+(i+1),{x:x+0.2,y:y0+0.2,w:1,h:0.36,fontFace:'Poppins SemiBold',fontSize:16,color:T.accent});
    K.txt(s,st[0],{x:x+0.2,y:y0+0.64,w:cw2-0.4,h:0.56,fontFace:'Poppins SemiBold',fontSize:10,color:T.dark,valign:'top',lineSpacingMultiple:1.08});
    K.txt(s,st[1],{x:x+0.2,y:y0+1.24,w:cw2-0.4,h:1.0,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.16});
    if(i<steps.length-1) K.arrow(s,x+cw2+0.045,y0+chh/2-0.075,0.15);
  });
  const wy=y0+chh+0.34;
  const notes=[['Densidade composta','Cada novo CD e estação encurta o prazo médio e barateia a entrega seguinte — a vantagem cresce com a rede'],
               ['Promessa como produto','Prazo confiável é o que o cliente compra; a malha própria protege essa promessa do gargalo de terceiros'],
               ['Barreira de capital','Replicar a rede exige anos de investimento e volume — proteção estrutural da posição']];
  const nw=(W-2*M-0.5)/3;
  notes.forEach((n,i)=>{ const x=M+i*(nw+0.25);
    K.arrow(s,x,wy+0.05,0.15);
    K.txt(s,n[0],{x:x+0.26,y:wy-0.02,w:nw-0.3,h:0.28,fontFace:'Poppins SemiBold',fontSize:10,color:T.accentDark,valign:'middle'});
    K.txt(s,n[1],{x:x+0.26,y:wy+0.28,w:nw-0.3,h:0.72,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.16});
  });
  K.conclusionBand(s,[['Logística própria é ',0],['vantagem que compõe',1],[' — cada nó da rede barateia o próximo',0]],{page:9});
})();

/* ============ 10 PILLAR — PRIME & MARKETPLACE ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Investment Thesis',num:2,title:'Prime e marketplace: receita recorrente e economia de plataforma',
    subtitle:'Assinatura de um lado, take-rate e serviços logísticos do outro — dois motores que se reforçam',
    source:'Source: modelo público da companhia; métricas Brasil a confirmar. '+DEMO, page:10, band:true});
  K.txt(s,'TRÊS MOTORES DE RECEITA',{x:M,y:1.92,w:6,h:0.24,fontFace:'Poppins SemiBold',fontSize:8,color:T.accent,charSpacing:1.4});
  const adj=[['Assinatura Prime','Receita recorrente mensal/anual que consolida frete, vídeo, música e ofertas'],
             ['Take-rate do marketplace','Comissão sobre vendas de terceiros — cresce sem capital próprio em estoque'],
             ['FBA / Logística da Amazon','O vendedor contrata a malha logística como serviço, monetizando a rede duas vezes']];
  const aw=(7.5-0.4)/3;
  adj.forEach((a,i)=>{ const x=M+i*(aw+0.2);
    K.rrect(s,x,2.24,aw,1.78,T.paper,{radius:0.08,line:T.line});
    K.rect(s,x,2.24,aw,0.04,T.accent);
    K.txt(s,a[0],{x:x+0.14,y:2.42,w:aw-0.28,h:0.56,fontFace:'Poppins SemiBold',fontSize:10,color:T.dark,align:'center',valign:'middle',lineSpacingMultiple:1.05});
    K.txt(s,a[1],{x:x+0.16,y:3.02,w:aw-0.32,h:0.9,fontSize:8,color:T.gray,align:'center',valign:'top',lineSpacingMultiple:1.15});
  });
  K.txt(s,'POR QUE O CLIENTE FICA',{x:M,y:4.2,w:6,h:0.24,fontFace:'Poppins SemiBold',fontSize:8,color:T.accent,charSpacing:1.4});
  const wh=[['Custo de troca crescente','Quanto mais serviços na assinatura, mais cara fica a saída para o cliente'],
            ['Hábito de frequência','Frete incluído muda o comportamento: compras menores e mais frequentes'],
            ['Confiança na promessa','Prazo cumprido repetidamente vira o padrão contra o qual concorrentes são medidos']];
  wh.forEach((t,i)=>{ const y=4.52+i*0.58;
    K.arrow(s,M,y+0.07,0.15);
    s.addText([{text:t[0]+'  —  ',options:{fontFace:'Poppins SemiBold',color:T.dark}},{text:t[1],options:{color:T.gray}}],
      {x:M+0.26,y,w:7.2,h:0.52,fontSize:8.5,valign:'top',lineSpacingMultiple:1.14,margin:0,fontFace:'Poppins'});
  });
  const px=M+7.7, pw=W-M-px;
  K.rrect(s,px,1.92,pw,4.34,T.dark,{radius:0.1});
  K.txt(s,'PERFIL DO MODELO',{x:px+0.28,y:2.14,w:pw-0.56,h:0.24,fontFace:'Poppins SemiBold',fontSize:8,color:T.accent,charSpacing:1.4});
  const cp=[['Recorrente','Assinatura + reposição frequente'],['Two-sided','Clientes e vendedores na mesma rede'],['Asset-light','Marketplace cresce sem estoque próprio'],['[TBC]','Membros Prime no Brasil'],['[TBC]','GMV / take-rate Brasil']];
  cp.forEach((c,i)=>{ const y=2.52+i*0.73;
    K.txt(s,c[0],{x:px+0.28,y,w:pw-0.56,h:0.32,fontFace:'Poppins SemiBold',fontSize:14,color:c[0]==='[TBC]'?T.muteDark:T.white,valign:'middle'});
    K.txt(s,c[1],{x:px+0.28,y:y+0.3,w:pw-0.56,h:0.22,fontSize:8,color:T.muteDark,valign:'middle'});
    if(i<cp.length-1) K.rect(s,px+0.28,y+0.6,pw-0.56,0.012,T.darkLine);
  });
  K.conclusionBand(s,[['Assinatura de um lado, ',0],['plataforma do outro',1],[' — os dois motores giram o mesmo flywheel',0]],{page:10});
})();

/* ============ 11 GROWTH AVENUES ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Investment Thesis',num:5,title:'Avenidas de crescimento',
    subtitle:'Retail media, novas categorias e interiorização ampliam o mercado endereçável',
    source:'Source: direções públicas da companhia; priorização a validar. '+DEMO, page:11, band:true});
  const av=[['A','Retail media & Ads',['Publicidade sobre a intenção de compra — o inventário mais próximo da conversão','Referência global: US$ 56,2 bn de receita de ads em 2024','Espaço de crescimento no inventário brasileiro [dimensão — TBC]']],
            ['B','Novas categorias',['Expansão em grocery, farmácia e recorrência de consumíveis','Categorias de reposição elevam a frequência e alimentam o Prime','Parcerias e modelos híbridos de estoque [estratégia — TBC]']],
            ['C','Interiorização & prazo',['Levar a promessa de entrega rápida para além das capitais','Cada avanço de malha converte demanda reprimida do interior','Sequência de praças e investimento [plano — TBC]']]];
  const cw=(W-2*M-0.56)/3, y0=1.95, chh=3.9;
  av.forEach((a,i)=>{ const x=M+i*(cw+0.28);
    K.rrect(s,x,y0,cw,chh,T.paper,{radius:0.1,line:T.line});
    K.rect(s,x,y0,cw,0.05,T.accent);
    K.txt(s,a[0],{x:x+cw-0.72,y:y0+0.24,w:0.5,h:0.5,fontFace:'Poppins SemiBold',fontSize:20,color:T.tint2,align:'right',valign:'middle'});
    K.txt(s,a[1],{x:x+0.28,y:y0+0.3,w:cw-1.0,h:0.66,fontFace:'Poppins SemiBold',fontSize:11,color:T.dark,valign:'middle',lineSpacingMultiple:1.05});
    a[2].forEach((b,j)=>{ const by=y0+1.16+j*0.86;
      K.arrow(s,x+0.3,by+0.05,0.13);
      K.txt(s,b,{x:x+0.56,y:by-0.03,w:cw-0.86,h:0.8,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.16});
    });
  });
  K.conclusionBand(s,[['Um caminho ',0],['claro e executável',1],[' de criação de valor além do varejo core',0]],{page:11});
})();

/* ============ 12 TOC — Company ============ */
K.tocSlide({active:2,page:12,photo:A+'toc_panel.png'});

/* ============ 13 TIMELINE ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Company Overview',title:'Três décadas de plataforma, catorze anos de Brasil',
    subtitle:'Da livraria online global à operação logística nacional',
    source:'Source: divulgações públicas e imprensa; marcos Brasil detalhados a confirmar. '+DEMO, page:13, band:true});
  const tl=[['1994','Fundação da Amazon (Seattle)',0],['2012','Entrada no Brasil — loja de livros digitais',0],
            ['2017','Marketplace aberto a vendedores brasileiros',0],['2019','Prime no Brasil + Logística da Amazon (FBA)',1],
            ['2026E','Expansão contínua de malha e categorias',2]];
  const cw=(W-2*M-4*0.26)/5, y0=2.15, chh=2.15;
  tl.forEach((t,i)=>{ const x=M+i*(cw+0.26);
    const dark=t[2]===2, hot=t[2]===1;
    K.rrect(s,x,y0,cw,chh,dark?T.dark:(hot?T.accent:T.tint),{radius:0.1});
    K.txt(s,t[0],{x:x+0.24,y:y0+0.28,w:cw-0.48,h:0.42,fontFace:'Poppins SemiBold',fontSize:16,
      color:dark?T.white:(hot?T.white:T.accentDark),valign:'middle'});
    K.rect(s,x+0.24,y0+0.78,0.7,0.03,dark?T.accent:(hot?T.white:T.accent));
    K.txt(s,t[1],{x:x+0.24,y:y0+0.94,w:cw-0.48,h:1.05,fontSize:9,
      color:dark?T.onDark:(hot?T.white:T.text),valign:'top',lineSpacingMultiple:1.16});
    if(i<tl.length-1) K.arrow(s,x+cw+0.055,y0+chh/2-0.075,0.15);
  });
  const by=y0+chh+0.45;
  const st=[['+30','anos de operação global'],['14','anos de Brasil'],['[TBC]','CDs no país'],['[TBC]','colaboradores no Brasil'],['24/7','operação nacional']];
  const sw=(W-2*M-4*0.26)/5;
  st.forEach((t,i)=>{ const x=M+i*(sw+0.26);
    K.rrect(s,x,by,sw,0.82,T.paper,{radius:0.07,line:T.line});
    K.txt(s,t[0],{x:x+0.2,y:by+0.1,w:sw-0.4,h:0.36,fontFace:'Poppins SemiBold',fontSize:16,color:t[0]==='[TBC]'?T.grayL:T.dark,valign:'middle'});
    K.txt(s,t[1],{x:x+0.2,y:by+0.46,w:sw-0.4,h:0.24,fontSize:8,color:T.gray,valign:'middle'});
  });
  K.conclusionBand(s,[['Mais de ',0],['uma década de infraestrutura',1],[' construída no país — pronta para a próxima fase',0]],{page:13});
})();

/* ============ 14 PRESENCE ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Company Overview',title:'Presença nacional apoiada em malha própria',
    subtitle:'Escritório central em São Paulo e centros de distribuição em múltiplos estados, segundo divulgações públicas',
    source:'Source: divulgações públicas e imprensa; contagens e endereços a confirmar com a gestão. '+DEMO, page:14});
  K.rrect(s,M,1.95,W-2*M,0.92,T.dark,{radius:0.09});
  K.rect(s,M,1.95,0.055,0.92,T.accent);
  K.txt(s,'São Paulo — SP · Escritório central',{x:M+0.3,y:2.08,w:8,h:0.3,fontFace:'Poppins SemiBold',fontSize:11,color:T.white});
  K.txt(s,'Sede administrativa e de tecnologia da operação brasileira; região AWS São Paulo em operação desde 2011',
      {x:M+0.3,y:2.38,w:W-2*M-0.6,h:0.4,fontSize:8,color:T.muteDark,valign:'top'});
  K.txt(s,'REDE LOGÍSTICA — DIVULGAÇÕES PÚBLICAS',{x:M,y:3.1,w:6,h:0.24,fontFace:'Poppins SemiBold',fontSize:8,color:T.accent,charSpacing:1.4});
  const bases=[['Estado de São Paulo','Concentração da malha de CDs e estações na maior praça consumidora'],
               ['Pernambuco & Nordeste','CDs regionais aproximando estoque da demanda do Nordeste'],
               ['Minas Gerais & Sul','Cobertura do Sudeste expandido e da região Sul [detalhe — TBC]'],
               ['Distrito Federal & outros','Presença em praças adicionais conforme divulgações [lista — TBC]']];
  const bw=(W-2*M-0.72)/4;
  bases.forEach((b,i)=>{ const x=M+i*(bw+0.24);
    K.rrect(s,x,3.42,bw,1.7,T.paper,{radius:0.08,line:T.line});
    K.rect(s,x,3.42,bw,0.04,T.accent);
    K.txt(s,b[0],{x:x+0.2,y:3.58,w:bw-0.4,h:0.52,fontFace:'Poppins SemiBold',fontSize:9.5,color:T.dark,valign:'top',lineSpacingMultiple:1.08});
    K.txt(s,b[1],{x:x+0.2,y:4.14,w:bw-0.4,h:0.86,fontSize:8,color:T.gray,valign:'top',lineSpacingMultiple:1.15});
  });
  const by=5.4;
  [['1','Escritório central (SP)'],['[TBC]','Centros de distribuição'],['[TBC]','Estações de entrega'],['1','Região AWS (São Paulo)']].forEach((t,i)=>{ const x=M+i*( (W-2*M-0.72)/4 +0.24);
    K.statTile(s,x,by,(W-2*M-0.72)/4,0.86,t[0],t[1]);
  });
})();

/* ============ 15 TOC — Financials ============ */
K.tocSlide({active:3,page:15,photo:A+'toc_panel.png'});

/* ============ 16 FINANCIAL HIGHLIGHTS ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Financial Highlights',title:'Referências financeiras globais',
    subtitle:'A companhia não divulga aberturas por país — os números abaixo são globais e públicos; a visão Brasil é a construir com a gestão',
    source:'Source: Amazon.com Inc. 10-K (FY2022–FY2024). Net sales globais; câmbio não aplicado. '+DEMO, page:16});
  const kp=[['US$ 638,0 bn','Net sales 2024 (+11% YoY)'],['US$ 107,6 bn','AWS 2024'],['US$ 56,2 bn','Advertising 2024'],['+200 Mn','Membros Prime (global)']];
  const kw=(W-2*M-3*0.28)/4;
  kp.forEach((k,i)=>K.statTile(s,M+i*(kw+0.28),1.98,kw,0.92,k[0],k[1]));
  K.rrect(s,M,3.12,W-2*M,3.2,T.paper,{radius:0.09,line:T.line});
  K.txt(s,'Net sales globais — US$ bn',{x:M+0.32,y:3.3,w:6,h:0.3,fontFace:'Poppins SemiBold',fontSize:10,color:T.dark});
  K.colChart(s,p.ChartType.bar,[
    {name:'Net sales',labels:['2022','2023','2024'],values:[514.0,574.8,638.0]}],
    M+0.3,3.7,W-2*M-0.6,2.4,{chartColors:[T.chartDark],barGapWidthPct:120});
  K.txt(s,'Visão Brasil (R$): receita, GMV e margens [TBC — dados não públicos]',
    {x:M,y:6.42,w:W-2*M,h:0.28,fontSize:9,color:T.grayL,italic:true,align:'center'});
})();

/* ============ 17 DRE ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.white);
  K.chrome(s,{eyebrow:'Financial Highlights',title:'Demonstração de resultados — Brasil',
    subtitle:'Estrutura ilustrativa; todas as linhas a preencher com dados da gestão',
    source:'Source: estrutura ilustrativa. Nenhum valor Brasil é público. '+DEMO, page:17});
  K.dreTable(s,{cols:['2022','2023','2024','2025','2026E'],
    rows:[['Receita bruta',0],['Impostos',0],['Receita líquida',1],['crescimento %',2],['CPV / custo de serviços',0],
          ['Lucro bruto',1],['margem bruta %',2],['Despesas com pessoal',0],['Logística e fulfillment',0],['Marketing e vendas',0],
          ['EBITDA',1],['margem EBITDA %',2],['D&A',0],['Resultado financeiro',0],['EBT',1],['Lucro líquido',1]],
    value:()=>null});
})();

/* ============ 18 BACK COVER ============ */
(()=>{ const s=p.addSlide(); K.bg(s,T.dark);
  s.addImage({path:A+'smile.png',x:0.6,y:4.6,w:5.4,h:2.7,transparency:30});
  K.rect(s,6.0,0,0.05,H,T.accent);
  s.addImage({path:A+'amz_white.png',x:6.55,y:1.35,w:3.1,h:3.1*AMZ_AR});
  K.txt(s,'Deal team',{x:6.55,y:2.6,w:4.5,h:0.5,fontFace:'Poppins SemiBold',fontSize:24,color:T.white,valign:'middle'});
  K.rect(s,6.57,3.2,1.0,0.035,T.accent);
  [['[Banker — TBC]','[email — TBC]'],['[Banker — TBC]','[email — TBC]']].forEach((t,i)=>{ const y=3.6+i*0.86;
    K.arrow(s,6.57,y+0.06,0.15);
    K.txt(s,t[0],{x:6.85,y:y-0.02,w:4.2,h:0.28,fontFace:'Poppins SemiBold',fontSize:11,color:T.white,valign:'middle'});
    K.txt(s,t[1],{x:6.85,y:y+0.26,w:4.2,h:0.24,fontFace:'Poppins Medium',fontSize:9,color:T.accent,valign:'middle'});
    K.txt(s,'+55 11 3815-3533',{x:6.85,y:y+0.48,w:4.2,h:0.24,fontSize:8.5,color:T.muteDark,valign:'middle'});
  });
  K.rect(s,6.57,5.5,4.3,0.015,T.darkLine);
  K.txt(s,'Av. Brigadeiro Faria Lima, 2277 — 6th floor\n01452-000  Jardim Paulistano, São Paulo – SP\n+55 11 3815-3533',
      {x:6.57,y:5.68,w:4.6,h:0.8,fontSize:8.5,color:T.onDark,valign:'top',lineSpacingMultiple:1.24});
  s.addImage({path:'assets/igc_white.png',x:6.55,y:H-1.05,w:0.62,h:0.62*T.igcAR});
  K.txt(s,'Confidential Information Memorandum — demonstração',{x:M,y:H-0.62,w:5.5,h:0.3,fontFace:'Poppins Medium',fontSize:9,color:'E8ECF1'});
})();

p.writeFile({fileName:'Project_Rainforest_CIM_demo.pptx'}).then(()=>console.log('WROTE Project_Rainforest_CIM_demo.pptx'));
