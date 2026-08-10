# IGC Partners — Information Memorandum Design System

Extracted from 3 reference decks: `Project_Soul` (Almatia, chemicals, Colombia — polished/real),
`Projeto_Biocap` (cosmetics, Brazil — polished/real), `Project_Gold_Mine` (Infrabrasil, mining — master template w/ placeholders).

## 1. Color system

**Base (all decks):**
- Navy / primary dark: `#222F44`
- Gold accent: `#D3A93D`
- White background: `#FFFFFF`
- Near-black text: `#111111` / `#000000`
- Neutral gray: `#A5A5A5` / `#B1AEAE`

**Per-project sector accent** (one deck = one accent family, layered over navy+gold):
- Soul (chemicals): deep teal `#07272D` / `#2E4D58`, coral accent `#EE5340`, ice `#ABC7CA` / `#EEE7E7`
- Biocap (beauty): purple `#4B2582` / `#AD6ABF` / `#410B30`, dusty rose `#F9EBEC` / `#FDC9CD`, teal `#5A9B9F`
- Gold Mine (mining): red `#FF0003`, black gradients

Rule: dominant navy/dark + white; ONE sector accent for highlights, stats, chart bars, dividers; gold as premium secondary.

## 2. Typography (installed on system, families verified via fc-list)
- **Headlines / titles:** Source Serif Pro (also: Light 300, SemiBold 600, Black 900)
- **Body / labels / eyebrows / stats:** Poppins (Light 300, Regular 400, Medium 500, SemiBold 600)
- Montserrat used in Biocap as body sans (alt). Arial = fallback.
- Convention: serif for big statements + section titles; geometric sans for everything functional.

## 3. Standard IM structure (section flow)
1. **Cover** — project codename + "Confidential Information Memorandum" + country. Full-bleed sector photo (dark gradient) OR white w/ circular photo. IGC logo + company logo(s).
2. **Disclaimer** — dense legal text, IGC contact block, dark or white.
3. **Table of Contents / Executive Summary** — numbered sections w/ page numbers, large ghosted letterform or photo on one side.
4. **Section dividers** (one per section) — dark panel, section name, active item highlighted in accent pill, big company logo / photo.

Sections (typical):
- **Introduction** → "[Company] at a Glance" (financial+operational highlights, stat callouts, segment mix, revenue/EBITDA charts)
- **Investment Thesis** → 5–6 numbered pillars; market-size slides; global/structural tailwind slides
- **Company Overview** → products/one-stop-shop, revenue models, portfolio, clients (logo grid + recurrence), suppliers (table), footprint (map + warehouses), history timeline, ESG, ownership/org chart
- **Financial Information** → revenue/EBITDA/margin evolution, cash generation, growth vectors
5. **Back cover** — mirrors cover; IGC + company logos; deal team contacts + IGC address.

## 4. Layout archetypes (reusable)
- Cover / back-cover (photo or white)
- Disclaimer (text-dense)
- TOC + section divider (dark, letterform/photo)
- "At a Glance" (2-col highlights + 4 stat tiles + mini charts)
- Numbered thesis pillars (01–06, accent numerals, serif header + sans desc)
- Market sizing (bar chart + CAGR callout + ranking/flags)
- One-stop-shop / segment breakdown (left vertical nav w/ circular icons, middle portfolio list, right stats + revenue chart)
- Client base (logo grid + recurrence charts + stats)
- Supplier table (dark header, logos, country/products/years/description columns)
- Footprint (country map + photo strip + dark stat bar: sites / area / countries)
- History timeline (year milestones + circular photos)
- Ownership / org chart (accent % badges, boxes)
- Financials (grouped bar + line margin, CAGR callouts)

## 5. Recurring motifs
- Circular framed photos & circular icon chips
- Big stat callouts: huge accent number + small sans label
- Accent "pill" highlight for active nav item
- Rounded-rectangle cards (subtle tint, no edge stripes)
- IGC "igc" wordmark top-right on every content slide; company logo bottom.
- Source note bottom-left (small gray), page number bottom-right.

## 6. Assets captured
- `refs/igc_logo.svg` — IGC wordmark (white version, for dark bg). Need dark version for white slides.
- Fonts installed: `/usr/share/fonts/truetype/igc/` (Source Serif Pro *, Poppins *).

## 7. Render pipeline (working)
- Build .pptx (pptxgenjs or template-edit) → `soffice --headless --convert-to pdf` → `pdftoppm` for QA.
- LibreOffice needed `libreoffice-impress` + `libreoffice-writer` installed (core-only was broken).
- Deliverable = PDF (per client); keep .pptx as editable source.
