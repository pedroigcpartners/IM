# Project Yellow — Management Meeting & Site Visits · Invitation and Practical Guide

One-page invitation + practical guide for the Ferronordic visit to Tracbel (21–25 Sep 2026), built on the
Project Yellow Information Memorandum canvas and identity (48.77 × 27.43 cm, Tracbel yellow `#FDBA12`,
black, gray `#B1B3B5`, Century Gothic, eyebrow tab with yellow stub, Tracbel logo top-right, hatch texture,
one-corner-rounded black panel, black footer band).

## Files

| File | What |
|---|---|
| `Project_Yellow_Management_Meeting_Guide.pptx` | editable one-pager (PowerPoint, Century Gothic) |
| `Project_Yellow_Management_Meeting_Guide.pdf` | print/e-mail version |
| `Project_Yellow_Management_Meeting_Guide.png` | preview |
| `build_yellow_onepager.js` | generator — all copy lives in the `CONTENT` object at the top |
| `yellow_kit.js` | Project Yellow page kit (chrome, motifs, hatch and icon generators) |
| `assets/` | Tracbel logo, IGC logo, hatch, excavator cut-out and site photos extracted from the IM |

Rebuild: `node yellow/build_yellow_onepager.js` (needs `pptxgenjs`, `sharp`, `react-icons`; run from the repo root).
Render for QA: `soffice --headless --convert-to pdf --outdir yellow/gen yellow/Project_Yellow_Management_Meeting_Guide.pptx`
then `pdftoppm -png -r 90 …`. LibreOffice here substitutes URW Gothic for Century Gothic (similar widths).

## Sources of every fact on the page

- **Itinerary, arranged-by, flights LX 092 / LX 93, GRU T3, 05:25 / 18:25** — logistics e-mail thread
  (Bruno Iervolino → Henrik, 25 Aug 2026; Lars's reply). Reproduced verbatim; open items kept as `[TBC]`.
- **Company facts** (Sumaré = first LEAN / TPS unit, Contagem HQ, IM page ranges) — Project Yellow IM (16 Jul 2026), slides 13, 16, 19, 26.
- **Names/roles** — public sources: Luiz Gustavo Rocha (de Magalhães Pereira) is Chairman of the Board and President of
  Holding Tracbel since Jan 2024 (Group CEO is Gidalto Santos). Lars Corneliusson (Executive Chairman) and Henrik Carlborg
  (President & CEO) are the only Lars/Henrik in Ferronordic's board and management — **confirm they are the visitors**.
- **Terminal BTG Pactual** — private terminal ~250 m from GRU T3; planeside pick-up, private immigration/customs, baggage
  delivered, exit to the car. Operating slot at 05:25 on a Monday **not verified** — confirm with the booking.
- **Practical notes** — visa-free 90 days for Swedish/Swiss passports; Brazil UTC−3, no DST (5 h behind Zürich in September);
  127 V / type N sockets (Europlug fits, Swiss type J and Schuko need adapters); September climate averages
  (SP 15–26 °C, BH 17–29 °C, CWB 11–23 °C); CDC Yellow Book 2026 / PAHO yellow-fever recommendation for SP, MG, PR;
  10% restaurant service charge; CWB→GRU ~1h15, domestic arrivals at GRU T2.

## Open items surfaced by the research (not on the page, for the deal team)

1. **Sumaré landing point** — no jet-capable aerodrome named Sumaré could be found; Viracopos (VCP, ~30 min) or a
   helicopter are the realistic options. Since Jan 2025 Congonhas restricts general aviation (slots cut; aircraft with
   wingspan < 21 m barred), so the CGH departure needs a slot and a suitable aircraft — confirm with the operator.
2. **Confins vs Pampulha** — the thread says Confins (CNF) for the 24/09 evening flight; Pampulha (PLU) is BH's executive
   airport and much closer to the hotel zones — worth confirming which one the operator uses.
3. **CWB → GRU on Fri 25/09** — recommend an 11:00–13:00 departure (arrive GRU 12:15–14:15) to protect LX 93 at 18:25;
   domestic flights land at T2, so allow for the T2 → T3 transfer.
4. **Henrik's return flight and Curitiba nights** — still open in the thread.
5. **On-site narrative** — the IM disclaimer says employees may not know about the process; agree with Tracbel how the
   visitors are introduced on the shop floor before Tue 22/09.
