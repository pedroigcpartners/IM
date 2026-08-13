# Layout vocabulary — what each reference deck does best

Seven IGC CIMs, each strong at something different. Contact sheets of every page are in
`assets/thumbs/` — look at them before designing a slide; the patterns below are labels for
things that are easier to recognise than to read about.

The point of this file is **borrow by problem, not by deck**. When you have a content shape
and don't know how to lay it out, find the shape here.

---

## By problem

| You have… | Use | From |
|---|---|---|
| N items with identical anatomy (business units, success cases, product segments) | **series template** — one slide per item, dark left rail listing all, active highlighted | Soul (8× in one deck) |
| A section boundary in a long document | full-bleed dark TOC, repeated, active item in accent | Lox / Soul |
| A company summary that must land in 30 seconds | quadrant modules + dark KPI rail + client logo strip | Soul / Alquimia |
| A claim you want remembered after the page turns | conclusion band, flush to the bottom, key phrase in accent | Lox / Alquimia |
| A numbered argument (investment thesis) | accent circles beside each pillar title | Alquimia / Gold Mine |
| Two things to compare | split cards with dark × accent stat bands | Alquimia |
| A process or value chain | card row with arrow connectors between steps | Gold Mine |
| Geography | choropleth + base list with pin chips + stat strip | Biscoitê / Soul |
| A time series of events | year cards in a row, current year in solid accent | Lox |
| Financials | dark-header zebra table | all seven |
| Precedent transactions / why raise capital | **case diptych**: mirrored case modules on a tint band + founder pull-quotes + keyline "investment tickets" (money pill + investor logo + rationale) + conclusion band | Glam |
| A brand with strong monochrome product photography | **color-fused pages**: photos art-directed on the brand color so photo and flat field merge (cover, dividers, back cover); photo-split TOC ⅔/⅓ with active row in a white-keyline box | Glam |
| Social proof / community traction | bottom accent band with platform glyphs + follower counts; testimonial column (star rows + quote + client chip); third-party rating scorecard | Glam |
| Competitor benchmark | bar chart with **competitor logos as axis labels** + a circle badge on each bar end carrying a second metric; smartphone mockup as evidence exhibit | Glam |
| Survey / consumer-research data | twin-column survey module (intro + methodology caption + chart + keyline takeaway); "A × B" duel scoreboard with paired big percentages, home value white vs comparison ghosted | Glam |
| Org chart with team sizes | two-tone hierarchy (solid accent = leadership, tint = teams) + headcount badges + "44 = 10 + 34" equation strip | Glam |
| A cycle / flywheel | circular diagram: white disc, 4 accent icon nodes on the ring, arrowed arcs, quadrant captions | Glam |
| Growth avenues with strong photography | **full-bleed photo triptych** — three edge-to-edge photos as the headers of numbered columns; photography as structure, zero chrome | Glam |

---

## Per deck

**Soul (Almatia — the richest, 29 slides).** TOC as white panel + giant brand-glyph
watermark + full-height cut-out person photo, section items with pill page numbers,
repeated 4×. **Series template**: one layout repeated per segment with a dark left rail
listing all segments, active highlighted — used 4× for portfolio and 4× for product
breakdown. At-a-glance as four text quadrants + dark financial side panel + mini-chart row.
Supplier matrix as a full-width table on dark. Footprint as full-bleed photos + dark bottom
stat band. Growth avenues as numbered circles on a dotted path. ESG in three columns with
letter badges. Year-column timeline with logo chips. Shareholder cards with % badges. Back
cover = logo lockup + team photo + contact columns. Motifs: teardrop/blob shapes (52×),
rounded photo frames, brand glyph as watermark.

**Glam (Mari Maria Makeup — the maximalist, 19 visible + 5 hidden slides).** Total brand
immersion: the accent (`#FF5700`) plays the dark-field role — covers, TOC rails, hero bands,
org-chart nodes are all saturated brand orange, and IGC navy survives only in scaffolding.
The defining move is **color-fused photography**: product shots art-directed on the brand color
so a photo can fill ⅔ of a page and dissolve into the flat color rail with no visible edge.
Charts render **directly on the accent field** with tint bars + white labels (evidence rail,
ranking card, duel scoreboard, social-proof band) — reusable in any brand color. Section
dividers are photo-split TOCs with a rotating product hero and the active row in a
white-keyline outlined box. At-a-glance is a half-page hero band: brand story above (founder
quote + channel photos + KPI cluster), analytics below on white. Unique content templates:
the precedent-transactions case diptych (Huda Beauty / Glossier) with investment tickets;
logo-labeled benchmark bars; two-tone org charts with scalloped %-bubble badges and a grouping
capsule for related shareholders; star-rating testimonials + Reclame Aqui scorecard; circular
flywheel; full-bleed photo triptych for growth avenues; choropleth carrying two datasets
(on-map brand metric + legend keyed to % of GDP), with a donut → arrow → stat connector.
*Caveat: the source deck ships with visible text-overflow bugs ("Internacionalizaçã/o",
"1.70/0") and a title/subtitle collision on p11 — proof that even house decks skip the render
QA loop; do not copy those.*

**Lox (Z Deli).** Dark full-bleed TOC with display headline, arrow items and page numbers.
Timeline as solid accent year-cards. DRE with dark header. **Footer colour band** — the
pattern that resolves the band/footer collision. Unit-detail pages with accent label pills.
Cover = photo ⅔ + brand field ⅓ with the project name in a keyline box.

**Alquimia (Galena).** At-a-glance as a dark rounded panel with photo-thumb rows.
Two-business-unit split cards with dark × accent stat bands. Numbered accent circles beside
pillar titles. Conclusion bands with accent-highlighted words. Eyebrow + coloured title header.

**Gold Mine (house master template).** The CIM spine — cover, disclaimer, repeated TOC,
numbered thesis, at-a-glance, financials. Pills (`roundRect adj=50000`) used heavily.
The disclaimer boilerplate in `references/disclaimer.txt` is lifted verbatim from its slide 2.

**Biocap.** Eyebrow as a rounded tab. Numbered rail over photography. Brand-field TOC with
product photo. Large numerals (28pt) for pillar numbers.

**Biscoitê/Bluebird.** Pill TOC nav. Clean axis-less charts — labels above bars, CAGR
brackets. Circular photo chips with number badges. Choropleth map.
