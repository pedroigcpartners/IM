# Tracbel Agro brand source

`tracbel_agro_institutional_2026.pdf` — Tracbel Agro's own 2026 institutional deck, the source the
palette in `DESIGN_SYSTEM.md` §1b was measured from. Tracbel Agro is a John Deere dealer, so the
identity is John Deere's green and yellow as Tracbel Agro apply it.

Reproduce every hex in that table:

    python3 sample_brand_colors.py tracbel_agro_institutional_2026.pdf

It runs two passes. The vector pass reads the `rg`/`RG` operators out of the content streams, giving
the exact hexes the authors picked but no sense of coverage — that is where `#017C34` (97 uses),
`#FEBA12`, `#439539`, `#FFDE00` and `#367C2B` come from. The raster pass renders the pages and
counts large flat areas, weighting each colour by how much of the deck it actually occupies — that
is where `#275417` (780k px, the back cover) and `#3C7D23` come from. Colours ranking high in both
are brand colours; ones that show up only in the raster pass are usually photography.

The site (tracbelagro.com.br) is blocked by the sandbox egress proxy, so the deck is the sole
source. Re-sample from the site when a session has access and reconcile against these figures
before changing the palette.
