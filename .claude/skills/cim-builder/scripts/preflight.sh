#!/usr/bin/env bash
# Preflight for cim-builder: verify (and where possible install) everything the
# deck pipeline needs. Run this once per project before the first build.
#
#   bash scripts/preflight.sh [target-dir]      # default: current directory
#
# Two of these fail *silently* if unchecked, which is why this script exists:
#   - pptxgenjs missing        -> require() throws, obvious
#   - Poppins missing          -> LibreOffice substitutes another face without a
#                                 warning and the deck renders in the wrong type
set -uo pipefail
DIR="${1:-$PWD}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL="$(dirname "$HERE")"
ok=0; warn=0; fail=0
say(){ printf '%-16s %s\n' "$1" "$2"; }

echo "cim-builder preflight — target: $DIR"
echo "------------------------------------------------------------"

# --- node + pptxgenjs (the deck is generated with pptxgenjs) ---
if command -v node >/dev/null 2>&1; then
  say "node" "$(node -v)"; ok=$((ok+1))
  if (cd "$DIR" && node -e "require.resolve('pptxgenjs')" >/dev/null 2>&1); then
    say "pptxgenjs" "present"; ok=$((ok+1))
  else
    say "pptxgenjs" "missing — installing into $DIR"
    if (cd "$DIR" && npm install pptxgenjs --no-audit --no-fund >/dev/null 2>&1); then
      say "pptxgenjs" "installed"; ok=$((ok+1))
    else
      say "pptxgenjs" "INSTALL FAILED — run: npm install pptxgenjs"; fail=$((fail+1))
    fi
  fi
else
  say "node" "MISSING — required to generate the .pptx"; fail=$((fail+1))
fi

# --- Poppins, the house sans ---
poppins_faces(){ fc-list 2>/dev/null | grep -ci poppins || true; }
if [ "$(poppins_faces)" -gt 0 ]; then
  say "Poppins" "present ($(poppins_faces) faces)"; ok=$((ok+1))
else
  FDIR="$HOME/.fonts"
  if [ -d "$SKILL/assets/fonts" ]; then
    mkdir -p "$FDIR" && cp "$SKILL"/assets/fonts/poppins-*.ttf "$FDIR"/ 2>/dev/null
    fc-cache -f "$FDIR" >/dev/null 2>&1
    if [ "$(poppins_faces)" -gt 0 ]; then
      say "Poppins" "installed from the skill bundle"; ok=$((ok+1))
    else
      say "Poppins" "INSTALL FAILED — deck will render in a substituted face"; fail=$((fail+1))
    fi
  else
    say "Poppins" "MISSING and no bundle found"; fail=$((fail+1))
  fi
fi

# --- rendering / QA chain (only needed to review the deck, not to build it) ---
if command -v soffice >/dev/null 2>&1; then say "libreoffice" "present"; ok=$((ok+1))
else say "libreoffice" "missing — cannot render to PDF for visual QA"; warn=$((warn+1)); fi

if command -v pdftoppm >/dev/null 2>&1; then say "poppler" "present"; ok=$((ok+1))
else say "poppler" "missing — cannot rasterise pages for contact sheets"; warn=$((warn+1)); fi

if python3 -c "import PIL" >/dev/null 2>&1; then say "python3+PIL" "present"; ok=$((ok+1))
else
  say "python3+PIL" "missing — installing"
  if pip install --quiet pillow >/dev/null 2>&1; then say "python3+PIL" "installed"; ok=$((ok+1))
  else say "python3+PIL" "missing — contact sheets unavailable"; warn=$((warn+1)); fi
fi

echo "------------------------------------------------------------"
echo "ok:$ok  warnings:$warn  blocking:$fail"
if [ "$fail" -gt 0 ]; then
  echo "Blocking problems above must be resolved before building — a deck built"
  echo "without Poppins looks wrong in a way that is easy to miss on screen."
  exit 1
fi
[ "$warn" -gt 0 ] && echo "The deck can still be built; only the visual QA loop is degraded."
exit 0
