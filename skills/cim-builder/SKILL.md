---
name: cim-builder
description: "Monta, redesenha ou estende um CIM / Information Memorandum (memorando de informações) de M&A sell-side da IGC Partners como deck .pptx — a partir de um teaser, de dados da empresa, de um CIM anterior ou do zero. Entrega o deck com a identidade visual da empresa-alvo sobre o scaffolding da casa (capa, disclaimer, TOC repetido, tese numerada, at-a-glance, success cases, DRE, back cover). Use sempre que o usuário mencionar CIM, IM, memorando de informações ou information memorandum, e também quando pedir apenas \"monta a apresentação do Project X\" ou \"faz o deck da empresa Y\" num contexto de M&A sell-side. Serve também para revisar o design de um CIM existente ou extrair o padrão visual de decks de referencia. NÃO usar para: teaser, proposta/pitch (mapeamento-compradores), status de roadshow (roadshow-status-update), comitês (comite-reviewer), emails (abordagem-sounding, email-reviewer), intels (intel-builder), Q&A (qa-writer)."
---

# CIM builder — IGC Partners

Monta o Information Memorandum de um processo sell-side como deck `.pptx`, no padrão da casa.

O material aqui foi destilado de seis CIMs reais da IGC (Gold Mine, Soul, Biocap, Lox,
Alquimia, Biscoitê), medindo o XML dos arquivos — não estimando de PDFs. Você não precisa
redescobrir a grade tipográfica nem as margens: elas já estão codificadas em
`scripts/igc_deck.js`.

---

## A regra que governa tudo o resto

**Cada CIM veste a identidade da empresa-alvo — não existe paleta fixa da IGC.**

Z Deli usa verde-deli e laranja retrô; Galena, navy e dourado; Biocap, ameixa e rosé;
Biscoitê, azul-pó. O que permanece constante é o *scaffolding* — capa, disclaimer, TOC
repetido, pilares numerados, conclusion bands, at-a-glance, tabela de DRE, marca `igc` no
rodapé. A pele é da empresa; o esqueleto é da IGC.

Por isso o **primeiro passo é sempre buscar a marca**, antes de desenhar qualquer slide:
logo oficial, site, teaser, fotos de produto/operação. Amostre os hexadecimais exatos do
logo (não estime "parece laranja") e derive a paleta deles. Um deck com a cor errada da
empresa é imediatamente reconhecível como genérico.

Se o site estiver inacessível, o logo e as fotos da operação carregam a mesma identidade —
use-os e diga ao usuário de onde veio a paleta, para ele poder corrigir.

## Fluxo

**1. Inventarie o conteúdo antes de desenhar.** Leia tudo que existe — teaser, materiais da
empresa, CIM anterior, planilhas — e separe explicitamente o que é **dado** do que é **TBC**.
Essa separação decide a arquitetura: não adianta desenhar um slide de série histórica se só
existe um ano. Vale escrever esse inventário num arquivo antes de começar.

**2. Fixe a paleta e monte o tema.** `init()` em `scripts/igc_deck.js` recebe accent /
accentDark / tint / dark, o logo com seu aspect ratio, e as seções do TOC.

**3. Escolha a arquitetura.** `references/structure.md` traz a espinha da casa (~29 slides)
e as regras de seção. Ajuste o número de slides ao que o conteúdo sustenta — mas não corte
o disclaimer nem os TOCs repetidos.

**4. Para cada slide, escolha o layout pelo formato do conteúdo**, não pelo deck de origem.
`references/layout-vocabulary.md` tem uma tabela "você tem X → use Y". O padrão mais
subutilizado é o **template-série** do Soul: quando houver N itens com a mesma anatomia
(success cases, unidades de negócio, segmentos), um slide por item com rail escuro à
esquerda e o ativo em destaque — `seriesRail()` faz isso.

**5. Construa com o kit.** `scripts/igc_deck.js` já resolve a geometria da casa:

```js
const K = require('./igc_deck.js');
const {p} = K.init({accent:'F35B1A', accentDark:'C6470F', tint:'FDE9DE', dark:'141A24',
                    logo:'assets/logo.png', logoAR:246/768,
                    sections:[['Introduction','04'],['Investment Thesis','10'],
                              ['Company Overview','17'],['Financial Highlights','25']]});
const s = p.addSlide(); K.bg(s,'FFFFFF');
K.chrome(s,{eyebrow:'Investment Thesis', num:1, title:'...', subtitle:'...',
            source:'Source: Company.', page:11, band:true});
K.conclusionBand(s,[['A recurring base with ',0],['blue-chip clients',1],[' underpins visibility',0]],{page:11});
p.writeFile({fileName:'Project_X_CIM.pptx'});
```

Helpers: `chrome` `tocSlide` `conclusionBand` `seriesRail` `statTile` `logoCard` `logoFit`
`iconChip` `photoCircle` `arrow` `colChart` `dreTable` `rrect` `txt`.

**6. Renderize e olhe cada slide.** Este é o passo que não pode ser pulado.

```bash
python3 scripts/qa_deck.py Project_X_CIM.pptx
```

Gera contact sheets e audita a escala tipográfica. Construir deck às cegas falha de formas
que só aparecem na imagem: cards cortados, texto sob o rodapé, logos quadrados sumindo em
cards largos, espaço morto no terço inferior. **Abra as folhas e revise slide a slide** —
espere encontrar e corrigir meia dúzia de coisas na primeira passada; isso é normal, não
sinal de erro.

## Dados: a linha que não se cruza

CIM vai para comprador. Um número inventado que sobrevive até a mesa de negociação custa
muito mais caro do que um espaço em branco.

- Placeholders ficam **visíveis**: `[XXX]`, `[Year — TBC]`, `[Role — TBC]`.
- Fontes que divergem: apresente o número aprovado pelo cliente e **rodapé com as duas
  fontes** e nota de reconciliar com a gestão. Nunca escolha uma calado.
- Cuidado especial com **inferência que vira afirmação**: se o teaser diz que a plataforma
  atende corporações e condomínios, e a empresa tem duas entidades, *não* conclua que uma
  entidade é o braço de condomínios. Apresente os dois fatos separados e marque a ligação
  como a confirmar. Esse erro é fácil de cometer e difícil de detectar depois.
- O disclaimer (`references/disclaimer.txt`) vai verbatim, trocando o nome da empresa.

## Arquivos

| Caminho | Quando ler |
|---|---|
| `references/structure.md` | ao definir a arquitetura do deck |
| `references/layout-vocabulary.md` | ao escolher o layout de um slide |
| `references/design-tokens.md` | ao justificar/estender valores, ou ao incorporar nova referência |
| `references/disclaimer.txt` | no slide 2, verbatim |
| `assets/thumbs/` | contact sheets das seis referências — olhe antes de desenhar |
| `scripts/igc_deck.js` | o kit de construção |
| `scripts/qa_deck.py` | depois de cada build |
| `scripts/extract_tokens.py` | para extrair tokens de um `.pptx` de referência novo |

## Incorporando uma referência nova

Quando aparecer um CIM novo que valha a pena absorver, prefira o `.pptx` ao PDF — o PDF
achata cor, fonte e geometria exatas. `python3 scripts/extract_tokens.py novo.pptx` reporta
paleta, fontes, escala, margens e raios; compare com `design-tokens.md` e registre o
vocabulário de layout em `layout-vocabulary.md`.

## Fontes

O par da casa é **Poppins** (Light / Medium / SemiBold) para UI e corpo, e **Source Serif
Pro** para display. Se Poppins não estiver instalado o LibreOffice substitui em silêncio e
o deck sai com outra cara — confira antes de renderizar (`fc-list | grep -i poppins`).
