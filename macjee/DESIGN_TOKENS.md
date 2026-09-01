# Mac Jee CIM — tokens de design medidos

Medidos do `cim.pdf` (não estimados): vetores via `pdfplumber` (`.curves`/`.rects`),
tipografia via `pdfplumber.chars` (tamanho e cor reais do content stream), grade de fundo
por amostragem de pixel em render de 300 dpi.

Página PDF = **960 × 540 pt** → canvas **13,333 × 7,5 in** (1 pt = 1/72 in, mapeamento direto).

## Fontes

**Montserrat** é a família da casa neste deck (Regular / Medium / SemiBold / Bold).
Poppins e Source Serif Pro aparecem só em resíduos de edição.

> Aviso de ambiente: o `Montserrat` instalado em `/usr/share/fonts/truetype/igc/` declara
> família interna `Montserrat Thin` nos pesos 400–700, então pedir "Montserrat" não casa.
> Resolvido com `apt-get install fonts-montserrat`.

## Escala tipográfica (valores reais, não arredondados por mim)

| Elemento | pt | Fonte | Cor | x (in) | y (in) |
|---|---|---|---|---|---|
| Abas de navegação | 6,98 | Montserrat | `#BFBFBF` | 0,429 / 1,788 / 3,462 / 5,194 | 0,315 |
| Aba ativa | 6,98 | Montserrat SemiBold | `#00178D` | — | 0,315 |
| Título | 24,0 | Montserrat Bold | `#00092B` | 1,440 | 0,835 |
| Nome da BU (badge) | 6,0 | Montserrat Medium | `#000312` | centrado | 1,371 |
| Cabeçalho de seção | 15,96 | Montserrat Medium | `#000312` | 4,627 / 9,05 | 1,685 |
| Título de item | 9,96 | Montserrat Bold | `#000312` | 5,517 / 9,712 | — |
| Corpo | 9,0 | Montserrat | `#000312` | 5,517 / 9,712 | — |
| EXECUTIVE SUMMARY | 12,0 | Montserrat Bold | branco | — | 5,17 |
| Corpo do exec summary | 9,0 | Montserrat Medium | branco | centrado | — |
| Stat — número | 24,0 | Montserrat Bold | branco | 9,729 | 5,800 |
| Stat — "USD" | 10,68 | Montserrat | branco | 9,269 | 5,872 |
| Stat — "+" | 10,68 | Montserrat Bold | branco | 9,641 | 5,872 |
| Stat — unidade (mm/bi) | 14,04 | Montserrat | branco | 10,309 | 5,903 |
| Stat — label | 8,04 | Montserrat | branco | 9,497 | 6,154 |
| Número da página | 8,04 | Montserrat SemiBold | branco | 0,391 | 7,108 |
| "Confidential" | 6,96 | Montserrat | `#9DADFF` | 12,159 | 7,149 |

## Cores

| Papel | Hex |
|---|---|
| Navy de fundo / faixa escura | `#00092B` |
| Grade sobre o navy | `#1C2441`, linha de 0,03 in |
| Texto no branco | `#000312` |
| Título | `#00092B` |
| Azul da aba ativa | `#00178D` |
| Preenchimento do card de stat | `#CED5FF` a ~25% sobre o navy (renderiza `#343D60`) |
| Azul dos gráficos (p47/48) | `#1E48E0` família |

### Acento por BU

| BU | Badge (forte) | Borda / tint (claro) |
|---|---|---|
| Weapon Systems | `#B8C4FD` | `#92A0D3` |
| Missile | `#949494` | `#DFDFDF` |
| Munitions | `#92D050` | `#AFDD7E` |
| Energetics | `#FFC000` | `#FFE081` |
| Space Systems | `#FFB7B7` | `#FFB7B7` |

O badge renderiza claro porque o preenchimento é o acento **forte com transparência**
(~40% sobre branco): `#92D050` a 40% → `#D3ECB9`.

## Geometria

### Faixa escura inferior
`x=-0,025  y=4,938  w=13,359  h=2,562` · fill `#00092B` · retângulo reto (sem chanfro).
Começa em **y=4,938** nos três templates de "Business Unit … at a Glance" — constante.

### O chanfro — a assinatura do deck
Corte reto a 45°, **nunca arredondado**. Dois cantos opostos por forma.

| Forma | x | y | w | h | Cantos cortados | Chanfro |
|---|---|---|---|---|---|---|
| Card exec + foto | 0,449 | 1,772 | 3,534 | 5,127 | topo-dir + baixo-esq | **0,589 in** |
| Card de stat | 9,090 | 5,365 | 1,811 | 1,263 | topo-dir + baixo-esq | **0,211 in** |
| Moldura de foto | 4,490 | 5,353 | 2,017 | 1,295 | topo-**esq** + baixo-**dir** | **0,220 in** |

Molduras de foto invertem os cantos em relação aos cards — é o que dá o ritmo diagonal
da página. Borda: 2,25 pt na cor tint da BU.

### Badge da BU (pílula)
`x=-0,986  y=0,674  w=2,321  h=0,959` — sangra pela borda esquerda; raio = metade da
altura (0,479) → extremidades totalmente arredondadas. Logo Mac Jee dentro em
`x=0,378 y=0,852 w=0,501 h=0,474`; nome da BU em 6 pt centrado em y=1,371.

### Sublinhado da aba ativa
Linha azul em y≈0,49 com losangos nas duas pontas, cobrindo a largura da aba ativa.

### Logo Mac Jee (topo direito)
`x=12,439  y=0,376  w=0,527  h=0,527`. Dourado sobre fundo branco, branco sobre navy.
Extraído com alpha para `assets/macjee_gold.png`.

### Grade do fundo navy
Linhas verticais a cada **1,586 in**, largura 0,03 in, `#1C2441`.
Ancoradas em x=1,663 (→ 0,077 / 1,663 / 3,249 / 4,835 / 6,421 / 8,007 / 9,593 / 11,179 / 12,765).

## Resíduos de edição encontrados no PDF

Texto branco de 12 pt em Source Serif Pro, sobrando do processo de montagem:

| Página | Texto | Posição |
|---|---|---|
| 33 | `Completar` | y = −0,643 (fora do slide, acima) |
| 33 | `Atualizar` | x=7,174 y=6,162 — **dentro da faixa escura** |
| 37 | `Atualizar` | x=7,174 y=6,162 — **dentro da faixa escura** |

Também há um retângulo `#ED0000` (vermelho puro) em `x=6,667 y=6,026 w=1,691 h=0,382`
na p37.

**Nenhum deles aparece no render** — todos ficam cobertos pela foto que é desenhada por
cima (amostrei os pixels para confirmar). São marcações internas que sobreviveram no
arquivo entregue e reapareceriam se alguém movesse a foto. Vale limpar no `.pptx` de origem.
