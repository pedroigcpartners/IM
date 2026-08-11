# IGC IM — hard design tokens

Measured directly from the OOXML of the three reference `.pptx` decks in this folder
(`Project_Gold_Mine` = house master template, `Project_Soul`, `Projeto_Biocap`).
Numbers below are counted occurrences, not impressions — a PDF cannot yield these.

Re-run the extraction with `refs/extract_tokens.py` (see bottom).

---

## 1. Canvas

| | value |
|---|---|
| Slide size | **33.867 × 19.05 cm** = 13.333 × 7.5 in = 16:9 |
| Identical across | Gold ✓ Soul ✓ Biocap ✓ |

## 2. The two constants that survive every brand skin

Each CIM re-skins to the target company's brand (see `../DESIGN_SYSTEM.md` §0), but these
persist underneath regardless of skin:

| Token | Hex | Gold | Soul | Biocap | Note |
|---|---|---|---|---|---|
| **IGC navy** | `#222F44` | 5 | 73 | 4 | **In all three.** The house dark. Scaffolding, footer marks, chart darks. |
| IGC gold | `#D3A93D` | 2 | 19 | — | In 2 of 3. Signature accent, *not* universal — absent from Biocap. |

Everything else in the palette is the target company's own:
Gold Mine `#FF0003` red · Soul `#07272D`/`#EE5340` teal+coral · Biocap `#AD6AC0`/`#410B30`/`#F9EBEC` plum+rose.

## 3. Type

**House pair:** `Poppins` (Light / Medium / SemiBold) for UI and body · `Source Serif Pro`
(Light / SemiBold / Black) for display and serif accents. Biocap substitutes `Montserrat`
for Poppins as part of its skin — the *roles* stay, the faces swap.

Font usage counts (Gold master): Poppins Light 1356 · Poppins SemiBold 818 · Source Serif Pro 496 ·
Poppins 466 · Source Serif Pro Black 308.

### Size scale — verified against real title/body runs, not just frequency

| Role | pt | Evidence |
|---|---|---|
| TOC display headline | **32** | Soul s5 "Executive Summary" |
| Pillar / stat numeral | **20–28** | Gold s6 `01.` = 20 Poppins · Biocap s4 `01` = 28 Montserrat |
| **Slide title** | **18** | Biocap s4 "Sumário - Tese de Investimento" = 18 |
| TOC section name | **16** | Soul s5 "Introduction" |
| **Subtitle / deck line** | **10.5** | Biocap s4 subtitle = 10.5 Montserrat Light (Gold s6 uses 10 Poppins Light) |
| Pillar body / callout | **11** | Gold s6 pillar text = 11 |
| **Body** | **9** | Biocap s4 pillar body = 9 Montserrat Medium |
| TOC page number | **12** | Soul s5 |
| Footnote / source | **7–8** | all three |

Dominant sizes by raw count, all three decks: **12, 18, 8, 9, 10, 11, 14, 16, 20, 24** (+10.5).
The grid is integer-pt with 10.5 the single half-step. Sizes like 9.5 / 8.8 / 11.5 appear
**nowhere** in any reference — they read as off-house.

## 4. Geometry

| Token | Value | Evidence |
|---|---|---|
| **Left margin** | **2.03 cm** (0.8 in) | Most common shape origin in all three: Gold 66× · Soul 87× · Biocap 33× |
| Right margin | ~0.99–2.03 cm | 0.99 is the logo/page-number edge; 2.03 for content |
| **Footer baseline** | **y ≈ 18.05 cm** (1.0 cm from bottom) | Gold 18.14 · Soul 18.02–18.05 · Biocap 18.04 |
| Pill radius | `roundRect adj=50000` (stadium) | Gold 39× · Biocap 10× |
| Card radius | `roundRect adj≈7900` (~7.9%) | Soul 101× |
| Tab / card motif | `round2SameRect adj=0` | Biocap 21× · Gold 11× · Soul 7× — square-top card |
| Photo chip | `ellipse` | Soul 92× · Biocap 34× |
| Map pin | `teardrop` | Soul 52× |

Shape mix overall: `rect` dominates, then `roundRect`, `line`, `ellipse`, `round2SameRect`.

## 5. Structure of the house CIM (from Gold Mine master)

1. **Cover** — project name + "Confidential Information Memorandum"
2. **Disclaimer** — full IGC boilerplate (verbatim text in `disclaimer_boilerplate.txt`),
   closing with the contact block: *"All communications, questions, and/or requests regarding
   this material shall be directly addressed to the Company."* + banker name, Av. Brigadeiro
   Faria Lima 2277 – 6th floor, 01452-000 São Paulo – SP, Tel (55 11) 3815-3533, e-mail.
3. **TOC** — Executive Summary / Investment Thesis / Company Overview / Financial Information,
   with page numbers; **repeated before each section**, active item highlighted
4. **At-a-glance** — company one-liner + stat tiles + highlights
5. **Investment thesis** — numbered pillars `01.` `02.` …
6. Company overview → Financial information

## 6. Reproducing

```bash
python3 refs/extract_tokens.py            # unpacks the .pptx and prints §2–§4
```
