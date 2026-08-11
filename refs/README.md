# Reference base — IGC Information Memoranda

Everything here is a **source of truth for design**, committed so it survives the session container.
Do not delete: these are the decks the house style is derived from.

## What to read first

| File | Use it for |
|---|---|
| **`DESIGN_TOKENS.md`** | Hard numbers — palette, type scale, margins, radii. Measured, reproducible. |
| **`../DESIGN_SYSTEM.md`** | The narrative — meta-pattern, per-deck layout vocabulary, workflow. |
| **`disclaimer_boilerplate.txt`** | Verbatim IGC disclaimer + contact block for slide 2 of any CIM. |
| **`extract_tokens.py`** | Re-derive the tokens: `python3 refs/extract_tokens.py` |

## Sources

### `.pptx` — editable, full design fidelity
These carry exact colors, font names/sizes and shape geometry. **Prefer these over the PDFs**
when deriving style; a PDF flattens all of it away.

| Deck | Company / sector | Skin |
|---|---|---|
| `Project_Gold_Mine.pptx` | **house master template** | red `#FF0003` + gray |
| `Project_Soul.pptx` | Almatia, chemicals | teal `#07272D` + coral `#EE5340` |
| `Projeto_Biocap.pptx` | Biocap, cosmetics | plum `#AD6AC0` / `#410B30` + rose `#F9EBEC` |

### `.pdf` — visual reference only
| Deck | Company / sector | Skin |
|---|---|---|
| `Projeto_Lox_CIM.pdf` | Z Deli, delicatessens | deli-green + retro orange-red + cream |
| `Project_Alquimia.pdf` | Galena, nutraceuticals | navy + gold |
| `Biscoite_CIM_v037.pdf` | Biscoitê, premium biscuits | powder blue |
| `Projeto_Biocap.pdf` | same deck as the `.pptx` above | — |

### Contact sheets
`*-thumbs-*.jpg` — every page of each reference at thumbnail size, for fast visual lookup
without opening the source. Committed on purpose (they are cheap and they are the only way a
future session can *see* the references).

## Current project

`../company/` holds the Compass (Mobi) inputs — `compass.md` (extracted content),
`Project_Compass_Teaser.pdf` (approved external figures), `Project_Compass_CIM_v2.pptx` (prior version).
