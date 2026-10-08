# Prompt: modelo buy-side de Lam Research (LRCX)

Monte um modelo financeiro em Excel da Lam Research (NASDAQ: LRCX) no padrão dos melhores buy sides do Brasil. O arquivo tem que parecer construído por um analista experiente de semicap, não por IA. Entregue `models/Lam_LRCX_modelo_out26.xlsx` com fórmulas vivas, gerado por um único script Python (openpyxl) re-executável, e recalculado com LibreOffice antes de entregar (zero erros de fórmula).

## Contexto e calendário
- Hoje é 07/out/2026. O ano fiscal da Lam termina no último domingo de junho: FY2026 terminou em 28/jun/2026, reportado no fim de julho de 2026, e o 10-K de FY26 foi arquivado em agosto. O 1T27 (trimestre de setembro) só sai no fim de outubro. Portanto o último ano fechado é FY26 e o último trimestre reportado é o 4T26, com guidance dado para o 1T27.
- Split de 10:1 em outubro de 2024: todo histórico por ação deve estar ajustado.
- Unidade: US$ milhões, exceto por ação. Anos como texto ("FY24A", "FY27E").

## Fontes e rede
- Prioridade: 10-K, 10-Q, 8-K (press release trimestral), prepared remarks e transcrição de call, slides de resultados. Depois: TrendForce, SEMI, Gartner para WFE; Damodaran para ERP; FRED para Treasury.
- Teste primeiro se curl ou WebFetch chegam em sec.gov. Se a rede bloquear, use a busca web (modo extended) com perguntas muito específicas, nomeando documento, período e linhas ("Lam Research 10-K fiscal 2026 consolidated balance sheet June 28 2026 inventories accounts receivable deferred profit"). Os trechos retornados vêm dos filings; prefira sempre o trecho do documento primário ao resumo de terceiros e cruze duas fontes quando houver conflito.
- Nunca invente número. Cada dado histórico com fonte (URL) numa nota ou na aba Notas. O que não achar fica "n.d." em texto, nunca um chute.

## Pesquisa (rode em paralelo se tiver subagentes)
1. Anuais FY22A a FY26A: DRE, BP e FC completos em GAAP; itens non-GAAP (SBC, amortização de intangíveis, reestruturação, EPS non-GAAP); D&A; ações diluídas; DPS; recompras; dívida por nota (cupom e vencimento); deferred revenue e deferred profit; caixa e aplicações.
2. Trimestrais 1T24 a 4T26 (12 trimestres): receita, Systems vs Customer Support Business Group (CSBG), mix por mercado (Memory com DRAM e NAND separados, Foundry, Logic/Other), mix geográfico (China, Coreia, Taiwan, Japão, EUA), margem bruta GAAP e non-GAAP, opex, EBIT, EPS GAAP e non-GAAP, FCF, recompras, deferred revenue; guidance de cada trimestre seguinte e, em especial, o guidance do 1T27 (receita, MB, mg op, EPS, alíquota, ações).
3. Mercado e valuation em 06-07/out/2026: preço de fechamento, ações em circulação (capa do último 10-Q/10-K), market cap, 52 semanas, consenso FY27 e FY28 (receita, EPS, MB), preço-alvo médio, ações recentes de brokers; Treasury 10 anos, ERP, beta, rating; peers com múltiplos (AMAT, KLAC, ASML, Tokyo Electron, Screen, e Micron como referência de cliente).
4. Setor e ciclo: WFE por ano CY2013 a CY2026 e projeções CY2027 e CY2028 (SEMI, TrendForce, brokers), participação da Lam em WFE, histórico FY13 a FY26 de receita, MB, mg EBIT, LL e capex da Lam; ciclos 2019, 2023 e o atual; export controls para China e o peso da China na receita; drivers de intensidade de etch/deposição (GAA, backside power, HBM e advanced packaging, NAND de alta camada, dry resist EUV); capex de clientes (TSMC, Samsung, SK hynix, Micron, Intel); metas de longo prazo da administração (modelo financeiro do investor day: receita, MB, mg op, EPS para 2028).

## Premissas (FY27E a FY31E, cenários Base, Bull e Bear, mais ano normalizado)
- Receita de Systems = WFE do ano (US$ bi) x participação da Lam. Projete WFE por ano e participação por cenário, com o mix por mercado (DRAM, NAND, Foundry/Logic) como memória de cálculo. CSBG cresce com base instalada (câmaras) e receita por câmara, ou por taxa de crescimento com justificativa.
- Margem bruta por cenário (volume, mix, custo e China), opex em US$ (R&D e SG&A crescendo em dólar, não como % fixo), alíquota conforme guidance, capex em US$, D&A como % do imobilizado inicial, dias de giro (DSO, DIO, DPO), recompras em US$ coerentes com FCF e com a política da empresa (histórico de devolver 75% a 100% do FCF), crescimento do DPS, yield do caixa, custo da dívida.
- O Base é a visão da casa e precisa bater com o guidance do 1T27 e ser defensável diante do consenso. O Bear tem que ser um bear de semicap de verdade (queda de WFE de 20% a 30% já aconteceu, com MB caindo 3 a 5 p.p.). O Bull plausível, não fantasia.
- Ano normalizado (mid-cycle) para o valor terminal: WFE de meio de ciclo, participação, MB e mg op normalizadas, com a tabela de ciclo FY13 a FY26 ao lado como referência. WACC com Rf, beta e ERP de fontes citadas.
- Evite números redondos em tudo: um analista calibra. Escreva o racional de cada cenário em 6 a 10 linhas, em português, voz de analista.

## Estrutura do arquivo (abas nesta ordem; colunas iguais em todas as abas de projeção: D=FY22A ... H=FY26A, I=FY27E ... M=FY31E, N=Normalizado no DCF)
1. Resumo: cabeçalho (Lam Research | LRCX US | Preço US$ em dd/mm/aa | Preço-alvo 12m | Upside | Mkt cap | EV | Net cash | Cenário ativo | Analista | Atualizado); tabela FY24A a FY29E (receita, cresc. a/a, MB, EBITDA e mg, EBIT, LL, EPS non-GAAP e cresc., FCF, FCF yield, net cash, EV/EBITDA, P/E, P/B, DY); preço-alvo e upside por cenário (snapshot em azul, com nota de data); tese em 5 bullets e riscos em 4; linha de checks.
2. Premissas: seletor de cenário em D4 (1 Base, 2 Bull, 3 Bear) com fundo amarelo; para cada driver três linhas de input (Base, Bull, Bear, em azul) e uma linha "selecionado" com CHOOSE; blocos de WACC, g e ano normalizado.
3. Operacional: WFE, participação, receita de Systems por mercado, CSBG, mix geográfico (China em destaque), deferred revenue.
4. DRE, 5. BP, 6. FC (indireto), 7. Suporte (imobilizado, capital de giro, dívida por nota, ações diluídas com recompras), 8. DCF (FCFF FY27E a FY31E mais normalizado, meio de ano opcional, TV por Gordon, ponte EV para equity, valor justo hoje, preço-alvo 12m com rolagem pelo Ke menos DPS, TV % EV, múltiplos implícitos, duas sensibilidades 5x5 com fórmula própria em cada célula, sem Data Table, e célula de conferência do centro), 9. Múltiplos (LRCX no preço atual e peers), 10. Trimestral (12 trimestres mais guidance 1T27 e conferência do FY27E contra o guidance anualizado), 11. Ciclo (FY13 a FY26 e WFE CY13 a CY26, médias e mediana, comentário de ciclo), 12. Notas (racional, fontes por tema, controle de versão "v1 - 07/out/26 - modelo inicial pós-4T26", pendências, legenda de cores).

## Regras de construção
- Histórico em azul (hardcoded), fórmulas em preto, links entre abas em verde. Nenhuma constante numérica dentro de fórmula de projeção além de 0, 1, 2, 4, 100, 365 e 1000. Mesmo padrão de fórmula em toda a linha de I a M.
- Checks: BP fecha em todos os anos, caixa do FC igual ao caixa do BP, soma de segmentos igual à receita, EBITDA igual a EBIT mais D&A.
- Sem XLOOKUP, FILTER, LET, LAMBDA, SORT ou UNIQUE. Use INDEX/MATCH, CHOOSE, SUMPRODUCT, IF, IFERROR.
- Arial 9, gridlines desligadas, zoom 85 a 90, freeze panes, coluna A estreita, rótulos em B, nota ou unidade em C. Formatos: US$ mn `#,##0;(#,##0);"-"`, percentuais `0.0%;(0.0%);"-"` guardados como fração, múltiplos `0.0"x"`, por ação `0.00;(0.00);"-"`.
- Propriedades do arquivo com autor humano (iniciais do analista), nada de "openpyxl". Comentários de célula só onde um analista anotaria (fonte, estimativa, guidance).
- Rótulos em português com jargão de mercado em inglês onde é assim que se fala (WFE, Systems, CSBG, EBITDA, Capex, FCF yield, net cash, mix). Abreviações naturais (Rec. líq., LB, MB, Desp. op., LL, Dív. líq., a/a, t/t, p.p.). Sem emojis, sem "Note:", sem parágrafos explicativos espalhados, sem texto genérico de template.
- Depois de gerar: alterne o seletor em 1, 2 e 3, recalcule a cada troca, grave os snapshots de cenário no Resumo e deixe o seletor em 1. Confirme Bull > Base > Bear.

## Verificação antes de entregar (faça de verdade, de preferência com revisores independentes)
1. Mecânica: recalc sem erros, checks ok, consistência de fórmulas por linha, seletor funcionando, centro da sensibilidade igual ao preço-alvo, fontes e formatos.
2. Dados: todas as células históricas conferidas contra os filings, mais 8 a 10 conferências independentes de números-chave.
3. Olhar de PM: o Resumo responde tese, preço-alvo e upside em 30 segundos; nada que denuncie geração automática.
4. Especialista em semicap: WFE e participação coerentes com fontes, FY27E coerente com guidance e consenso, forma do ciclo nos três cenários, China, recompras versus FCF, mid-cycle defensável.
Corrija tudo que for apontado e repita até limpar. No fim, me entregue o caminho do arquivo, os números-chave por cenário (receita, MB, EPS FY27E e FY28E, preço-alvo e upside), o que ficou pendente e as fontes principais.
