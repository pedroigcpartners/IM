# IGC Partners — Information Memorandum Design System

Extracted from 7 reference decks: `Project_Soul` (Almatia, chemicals), `Projeto_Biocap` (cosmetics),
`Project_Gold_Mine` (master template), **`Biscoitê/Bluebird`** (premium biscuits), **`Projeto_Lox`** (Z Deli, delis),
**`Project_Alquimia`** (Galena, nutraceuticals), **`Projeto_Glam`** (Mari Maria Makeup, cosmetics).
All sources live in `refs/` — see `refs/README.md`.

> **Hard numbers live in [`refs/DESIGN_TOKENS.md`](refs/DESIGN_TOKENS.md)** — palette, type scale and
> geometry measured directly from the OOXML of the four `.pptx` references, reproducible via
> `python3 refs/extract_tokens.py`. That file is the authority; this one is the narrative.

## 0. META-PATTERN (the most important rule)

**Each CIM wears the TARGET COMPANY's own brand identity** — not a fixed IGC palette:
- Z Deli/Lox → deli-green + retro orange-red + cream, display type, full-bleed food photography
- Galena/Alquimia → navy + gold (from the Galena logo), white base
- Biocap → rose/mauve/plum (brand tones), product photography
- Biscoitê → powder blue (brand color), rounded sans
- Mari Maria/Glam → total orange immersion `#FF5700`/`#F48007` (photography included) + lime `#C8FF54` spark

**Workflow for a new deck:** fetch the company's website / teaser / logo / product-asset photos FIRST,
sample the exact brand colors (hex), and derive the palette from them. IGC scaffolding stays constant;
the skin is the company's.

**Constant IGC scaffolding:** eyebrow section label · TOC repeated before each section · numbered
thesis pillars · conclusion bands (dark, key words in accent) · at-a-glance (highlights + stat tiles) ·
client logo walls · timeline · org chart · footprint map · DRE table (dark header, zebra) ·
`igc` + page + "Confidential" bottom-left · company logo top-right · source note bottom ·
**IGC disclaimer slide immediately after the cover** (verbatim boilerplate in
`refs/disclaimer_boilerplate.txt`).

Underneath every skin two colors persist: **IGC navy `#222F44`** (present in all four `.pptx`
references regardless of brand) and gold `#D3A93D` (in two of four — signature, not universal).

## 1. Mobi brand system (Project Compass v3 — current)

Sampled from official logo + fleet livery (site mobitransporte.com.br unreachable from sandbox):

| Role | Color |
|---|---|
| Brand protagonist | Orange `#F35B1A` (logo arrow, exact mean) + dark `#C6470F`, tint `#FDE9DE` |
| Dark fields | Graphite `#141A24`, panels `#1F2734`, lines `#323E50` |
| Content base | White + `#F4F6F8`, lines `#E2E6EB` |
| Text | `#2B333E` / gray `#6C7683` |
| Charts | Actuals `#2C3A4F`, emphasis orange, baseline `#D9DEE5` |

- **Type:** Poppins family (matches Mobi's geometric wordmark). No serif.
- **Brand-native motifs:** ▶ play-arrow from the logo as list markers / nav arrows; diagonal livery
  stripes as graphic on dark fields (`assets/stripes_orange.png`); circular photos.
- **Hybrid aesthetic:** covers/TOCs dark brand-heavy (graphite + photo + strong orange); content slides white.

## 2. Layout patterns imported per reference

- **Soul (Almatia — the richest reference, 29 slides):** TOC as white panel + giant brand-glyph
  watermark + full-height person photo, section items with pill page numbers, active in accent —
  repeated 4× through the deck; **series template** — one layout repeated per segment with a dark
  left rail listing all segments and the active one highlighted (used 4× for portfolio, 4× for
  product breakdown — the pattern for any "N segments, same anatomy" content); at-a-glance as
  4 text quadrants + dark financial side panel + mini-chart row; supplier/partner matrix as a
  full-width table on dark; footprint as full-bleed photos + dark bottom stat band; growth avenues
  as numbered circles on a dotted path; ESG 3-column with letter badges; year-column timeline with
  logo chips; shareholder cards with % badges; back cover = logo lockup + team photo + contact
  columns. Signature motifs: teardrop/blob shapes (52×), rounded-corner photo frames, brand glyph
  as watermark.
- **Lox:** dark full-bleed TOC (display headline + arrow items + page numbers, active in accent);
  timeline as solid accent year-cards grid; DRE dark-header table; footer color band; unit-detail pages
  with accent label pills; covers = photo 2/3 + brand field 1/3 with framed project name.
- **Alquimia:** at-a-glance dark rounded panel with photo-thumb rows; two-business-unit split cards with
  dark×accent stat bands; numbered accent circles beside pillar titles; conclusion band with accent-
  highlighted words; eyebrow + colored title header.
- **Biocap:** eyebrow as rounded tab; numbered rail over photo; brand-field TOC with product photo.
- **Biscoitê:** pill TOC nav; clean axis-less charts (labels above bars, CAGR brackets); circular photo
  chips with number badges; choropleth map.
- **Glam (Mari Maria — the maximalist reference, 19 visible slides + 5 hidden):** total brand
  immersion — the accent plays the dark-field role (navy only in scaffolding). **Color-fused
  photography**: product shots art-directed on the brand color so photo and flat field merge
  (cover, dividers, back cover). **Photo-split TOC**: photo ⅔ + solid accent rail ⅓, active row
  in a white-keyline box, rotating product hero per section. **Charts reversed onto the accent
  field** (tint bars + white labels): evidence rails, a "Brasil × Mundo" duel scoreboard with
  ×-paired percentages, a bottom social-proof band (platform glyphs + follower counts).
  **Precedent-transactions case diptych** (Huda/Glossier): mirrored case modules on a tint band +
  founder pull-quotes + orange-keyline "investment tickets" (money pill + investor logo + rationale).
  **Full-bleed photo triptych** for growth avenues (photos as column headers). **Two-tone org
  charts** (solid accent = leadership, tint = teams; scalloped %-bubble badges; headcount equation
  44 = 10 + 34). Logo-labeled benchmark bars + smartphone mockup as evidence; star-rating
  testimonials + Reclame Aqui scorecard; circular flywheel diagram; half-page hero band
  at-a-glance ("brand above, numbers below").

## 3. Typography scale (content slides) — locked to the house grid

Measured from the references, not invented (see `refs/DESIGN_TOKENS.md` §3). The grid is integer-pt
with **10.5 as the only half-step**; sizes like 9.5 / 8.8 / 11.5 appear in no IGC deck.

- Title **18** SemiBold · subtitle **10.5** Regular gray · eyebrow tab **9** Medium
- Section labels **9** SemiBold accent CAPS charSpacing · body **9–11** · stat numerals **20** SemiBold
- TOC display **32** · TOC section **16** · TOC page number **12** · footnote/source **7–8**
- Conclusion band **12** SemiBold white + accent runs

**Left margin `M = 0.8 in` (2.03 cm)** — the single most-repeated coordinate in every reference
(66–87 shape origins per deck). Footer baseline `y = 7.10 in` (18.05 cm), i.e. 1.0 cm off the bottom.

**Conclusion band = the footer strip** (Lox pattern): flush to the bottom edge, `y = H-0.75, h = 0.75`,
with the `igc` mark + page reversed out in white on the band and the source note lifted above it.
Do not float the band mid-air — it collides with both the footer and the content.

## 4. Assets (repo `assets/`)
- `mobi_logo_black/navy.png`, `igc_white/navy.png`, fleet photos, `road_panorama.png`
- Client logos (official, from teaser): `cli_heineken/roche/kraftheinz/cargill.png` (+ votorantim/jbs/mbrf)
- Chassis brands `br_*.png`, software `sw_*.png` (TOTVS, VTRAXX, Ituran, Trucks Control, Zion,
  Open System, Mônaco, Sisma, On Safety, Checklist Fácil)
- `brazil_map.png` (GO/DF/MG orange) + `brazil_choro.png` · `stripes_orange.png` · `icons/` (26 × 4 colors)
- Fonts: `/usr/share/fonts/truetype/igc/` (Poppins*, Source Serif Pro*, Montserrat*)

## 5. Render pipeline
- `node build_deck.js` → `.pptx` → validate (`skills/synced/pptx/scripts/office/validate.py`) →
  `soffice.py --headless --convert-to pdf` → `pdftoppm -jpeg -r 110` → visual QA every slide.
- Deliverable = PDF; keep `.pptx` as editable source.

## 6. Content sources (Compass)
- Teaser-approved external figures: +50 clients, +400 vehicles, BRL 200 Mn fleet, 4 years avg age,
  BRL 140 Mn net revenues / BRL 36 Mn EBITDA 2025; clients incl. Heineken, Roche, Kraft Heinz, Cargill;
  positioning "urban mobility platform" serving corporations AND condominium residents.
- Fleet register (Jan-26): 373 owned vehicles (223 bus / 74 micro / 55 van / 17 support / 2+2) —
  reconciled in footnotes with the +400 aggregate.
- Entities: AGM Caetano (corporate core) × AGM Alpha (Matriz Brasília; +74% 1Q26 YoY).
