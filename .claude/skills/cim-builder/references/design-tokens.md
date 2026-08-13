# IGC IM — hard design tokens

Measured directly from the OOXML of four reference decks — `Project_Gold_Mine` (the house
master template), `Project_Soul`, `Projeto_Biocap`, `Projeto_Glam` (Mari Maria Makeup) — not
estimated from PDFs. Counts are
occurrences. `scripts/igc_deck.js` already encodes all of this; read here when you need to
justify a value, extend the kit, or fold in a new reference.

Re-derive from any `.pptx` with `python3 scripts/extract_tokens.py deck.pptx`.

---

## 1. Canvas

Slide size **33.867 × 19.05 cm** = 13.333 × 7.5 in = 16:9. Identical in all four decks.

## 2. The two colors that survive every brand skin

| Token | Hex | Gold | Soul | Biocap | Glam |
|---|---|---|---|---|---|
| **IGC navy** | `#222F44` | 5 | 73 | 4 | 19 |
| IGC gold | `#D3A93D` | 2 | 19 | — | — |

One skin variant worth knowing: in a maximalist brand skin (Glam), the **accent itself plays
the dark-field role** — covers, rails and bands are saturated brand color, and navy retreats to
scaffolding only. The constant is navy's *presence*, not its area.

Navy appears in all four decks despite four unrelated palettes — it is the house dark,
not a brand color. Gold is in two of four: signature, not universal.

Everything else is the target company's: Gold Mine `#FF0003` red · Soul `#07272D` teal +
`#EE5340` coral · Biocap `#AD6AC0` plum + `#F9EBEC` rose · Glam `#FF5700` orange +
`#FAE7D7` tint + `#C8FF54` lime spark.

## 3. Type

**House pair:** `Poppins` (Light / Medium / SemiBold) for UI and body · `Source Serif Pro`
(Light / SemiBold / Black) for display accents. Biocap swaps Poppins for `Montserrat` as
part of its skin — the roles persist, the faces swap.

### Size scale — verified against real title and body runs, not just frequency

| Role | pt | Evidence |
|---|---|---|
| TOC display headline | **32** | Soul s5 "Executive Summary" |
| Pillar number / stat | **20–28** | Gold s6 `01.` = 20 · Biocap s4 `01` = 28 |
| **Slide title** | **18** | Biocap s4 "Sumário - Tese de Investimento" |
| TOC section name | **16** | Soul s5 |
| **Subtitle / deck line** | **10.5** | Biocap s4 (Gold s6 uses 10) |
| Pillar body / callout | **11** | Gold s6 |
| **Body** | **9** | Biocap s4 pillar body |
| TOC page number | **12** | Soul s5 |
| Footnote / source | **7–8** | all four |

Dominant sizes by raw count: **12, 18, 8, 9, 10, 11, 14, 16, 20, 24** (+10.5). The grid is
integer-pt with **10.5 the only half-step**. Sizes like 9.5 / 8.8 / 11.5 appear in no
reference — they are the clearest tell that a deck was not built to house standard.

## 4. Geometry

| Token | Value | Evidence |
|---|---|---|
| **Left margin** | **2.03 cm** (0.8 in) | Most common shape origin: Gold 66× · Soul 87× · Biocap 33× · Glam 42× |
| Right margin | 0.99–2.03 cm | 0.99 is the logo / page-number edge; 2.03 for content |
| **Footer baseline** | **y ≈ 18.05 cm** (7.10 in, 1.0 cm off the bottom) | Gold 18.14 · Soul 18.02 · Biocap 18.04 |
| Pill radius | `roundRect adj=50000` (stadium) | Gold 39× · Biocap 10× |
| Card radius | `roundRect adj≈7900` (~7.9%) | Soul 101× |
| Tab / card motif | `round2SameRect adj=0` | Biocap 21× · Gold 11× · Soul 7× |
| Photo chip | `ellipse` | Soul 92× · Biocap 34× |
| Map pin | `teardrop` | Soul 52× |

Shape mix: `rect` dominates, then `roundRect`, `line`, `ellipse`, `round2SameRect`.

## 5. Two geometry traps

**The conclusion band and the footer want the same 0.4 in.** A band placed just above the
footer baseline overlaps the `igc` mark; raised far enough to clear it, it cuts into content
on any slide whose cards run near the bottom. The resolution is the Lox pattern: the band
sits flush to the bottom edge and *becomes* the footer strip, carrying the `igc` mark
reversed out in white, with the source note lifted above it. `conclusionBand()` does this.

**Square logos vanish in wide cards.** `logoFit` scales to the limiting dimension, so a
1:1 mark in a short wide card renders tiny and the wall looks broken. Give logo cards
enough height (≥0.6 in) that square marks still read, and always pass the true aspect ratio.
