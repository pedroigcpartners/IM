# IGC Partners — Information Memorandum Design System

Extracted from 5 reference decks: `Project_Soul` (Almatia, chemicals), `Projeto_Biocap` (cosmetics),
`Project_Gold_Mine` (master template), **`Biscoitê/Bluebird`** (premium biscuits), **`Projeto_Lox`** (Z Deli, delis),
**`Project_Alquimia`** (Galena, nutraceuticals).

## 0. META-PATTERN (the most important rule)

**Each CIM wears the TARGET COMPANY's own brand identity** — not a fixed IGC palette:
- Z Deli/Lox → deli-green + retro orange-red + cream, display type, full-bleed food photography
- Galena/Alquimia → navy + gold (from the Galena logo), white base
- Biocap → rose/mauve/plum (brand tones), product photography
- Biscoitê → powder blue (brand color), rounded sans

**Workflow for a new deck:** fetch the company's website / teaser / logo / product-asset photos FIRST,
sample the exact brand colors (hex), and derive the palette from them. IGC scaffolding stays constant;
the skin is the company's.

**Constant IGC scaffolding:** eyebrow section label · TOC repeated before each section · numbered
thesis pillars · conclusion bands (dark, key words in accent) · at-a-glance (highlights + stat tiles) ·
client logo walls · timeline · org chart · footprint map · DRE table (dark header, zebra) ·
`igc` + page + "Confidential" bottom-left · company logo top-right · source note bottom.

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

- **Lox:** dark full-bleed TOC (display headline + arrow items + page numbers, active in accent);
  timeline as solid accent year-cards grid; DRE dark-header table; footer color band; unit-detail pages
  with accent label pills; covers = photo 2/3 + brand field 1/3 with framed project name.
- **Alquimia:** at-a-glance dark rounded panel with photo-thumb rows; two-business-unit split cards with
  dark×accent stat bands; numbered accent circles beside pillar titles; conclusion band with accent-
  highlighted words; eyebrow + colored title header.
- **Biocap:** eyebrow as rounded tab; numbered rail over photo; brand-field TOC with product photo.
- **Biscoitê:** pill TOC nav; clean axis-less charts (labels above bars, CAGR brackets); circular photo
  chips with number badges; choropleth map.

## 3. Typography scale (content slides)
- Title 22pt SemiBold · subtitle 11.5 Regular gray · eyebrow tab 9.5 Medium
- Section labels 9.5 SemiBold accent CAPS charSpacing · body 9–10 · stat numerals 18–22 SemiBold
- Conclusion band 12 SemiBold white + accent runs

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
