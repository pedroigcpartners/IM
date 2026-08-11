# The house CIM spine

From `Project_Gold_Mine` (the master template), as built out in the other five references.
A short CIM runs ~23 slides, a full one ~29–30. Sections and their slide counts flex with
how much the company actually supports; the spine does not.

```
FRONT
  1  Cover ......................... project name + "Confidential Information Memorandum"
  2  Disclaimer .................... verbatim boilerplate + banker contact card
  3  TOC ........................... Introduction active

INTRODUCTION
  4  <Company> at a glance ......... quadrants + KPI rail + client logos
  5  What the company does ......... the service model — do not assume the reader knows
  6  Client fronts / segments ...... who is served, and how the same platform serves them
  7  Recent momentum ............... the hardest growth datapoint you have
  8  Market context ................ structural drivers; qualitative is fine, invented is not
  9  TOC ........................... Investment Thesis active

INVESTMENT THESIS
 10  Thesis overview ............... 5 numbered pillars, one line each
 11  Pillar 1 ...................... typically the client base
 12  Pillar 2 ...................... typically the revenue/contract model
 13  Pillar 3 ...................... typically the asset base
 14  Pillar 4 ...................... typically capabilities / technology
 15  Pillar 5 ...................... growth avenues
 16  TOC ........................... Company Overview active

COMPANY OVERVIEW
 17  Track record / timeline
 18  Footprint ..................... map + sites + stat strip
 19  Operating model
 20  Success case A ................ series template, rail active on A
 21  Success case B ................ same layout, rail active on B
 22  Success case C ................ same layout, rail active on C
 23  Management team
 24  Corporate structure
 25  TOC ........................... Financial Highlights active

FINANCIAL HIGHLIGHTS
 26  Financial highlights .......... KPI tiles + revenue/EBITDA chart
 27  Revenue momentum .............. the growth series in detail
 28  Income statement .............. dark-header zebra table
 29  Back cover .................... deal team + IGC address
```

## Section rules worth keeping

**Repeat the TOC before every section**, active item advanced. In a 30-slide document the
reader loses their place otherwise; every reference does this and it costs four slides.

**Every thesis pillar gets its own slide.** The overview slide states the five claims; each
pillar slide has to actually evidence one. A thesis slide with no follow-through reads as
assertion.

**End argument slides with a conclusion band.** It is the last thing on the page and the
sentence a reader carries forward — so put the claim there, not a restatement of the title.

**The disclaimer is not optional** and is not paraphrased. Use `references/disclaimer.txt`
verbatim, replacing the company name, and close it with the banker contact block.

## What to do about missing data

Most CIMs are drafted before the data room is complete. The honest handling — and what the
reference decks do — is:

- Keep placeholders **visibly** bracketed: `[XXX]`, `[Year — TBC]`, `[Role — TBC]`. A reader
  must be able to tell at a glance what is known from what is pending.
- Never fill a gap with a plausible-looking number. A fabricated figure that survives into a
  buyer conversation is far more damaging than a visible blank.
- Where two sources disagree (e.g. a teaser says 4 years, the fleet register implies 6),
  present the client-approved figure and **footnote the discrepancy** with both sources and
  a note to reconcile with management. Do not silently pick one.
- Build the slide to its final layout anyway. Filling values into a finished structure later
  is minutes; designing the slide later is hours.
