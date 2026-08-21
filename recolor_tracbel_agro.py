#!/usr/bin/env python3
"""Re-skin the Project Yellow teaser in the Tracbel Agro (John Deere) palette.

The teaser ships in the house IGC skin — navy ``#222F44`` + gold ``#D3A93D``.
Per DESIGN_SYSTEM.md §0 each deck wears the *target company's* identity, so this
script swaps the skin for Tracbel Agro's while leaving geometry, type, copy and
the IGC scaffolding mark untouched.

Every hex below was measured, not invented: the flat fills of
``tracbelagropresentation2026.pdf`` (their 2026 institutional deck) were counted
page by page, and the vector ``rg``/``RG`` operators inside its content streams
were tallied.  Provenance is recorded per entry in PALETTE.

    python3 recolor_tracbel_agro.py            # v001 -> v002, default paths
    python3 recolor_tracbel_agro.py in.pptx out.pptx

Two greens carry the deck.  ``#275417`` is Tracbel Agro's darkest field — the
solid ground of their back cover (780k px, the single largest flat area in the
deck) — and takes over every role navy held: ink, rules, icons, the conclusion
band.  ``#367C2B`` is John Deere green and fills the Brazil map, the one element
that should read as brand rather than as text.

The accent splits in two, because a single yellow cannot do both jobs.  On white
``#E4A000`` matches the outgoing gold's optical weight almost exactly (2.25:1 vs
2.21:1 against white), so the numerals and section labels keep their designed
presence; John Deere yellow at full strength would drop to 1.7:1 and go weak.
On the dark band ``#FFDE00`` is used instead — 6.6:1 over ``#275417`` — which is
how Tracbel Agro themselves set yellow, always over green or photography.

The dashed "focus of operation" ring is the one place the mapping is not
mechanical.  It was drawn in near-black over a pale Office green; inked green
over John Deere green it drops to 1.7:1 and disappears, so it goes to
``#FFDE00`` instead (3.9:1) — a marker rather than another border, and the same
yellow-over-green figure Tracbel Agro use throughout their deck.  Its label
stays green: it sits almost entirely on white below the map.
"""
import argparse
import io
import os
import re
import shutil
import sys
import zipfile

SLIDE = 'ppt/slides/slide1.xml'
THEME = 'ppt/theme/theme1.xml'
ICONS = ('ppt/media/image2.png', 'ppt/media/image3.png',
         'ppt/media/image4.png', 'ppt/media/image5.png')
IGC_MARK = 'ppt/media/image1.png'

# --- the palette -------------------------------------------------------------
# role -> (old, new, provenance)
PALETTE = {
    'ink':       ('222F44', '275417', 'Tracbel Agro back-cover field, p13 — their darkest brand green'),
    'rule':      ('111721', '16300D', 'derived deep shade of the ink green (hairline under the igc mark)'),
    'accent':    ('D3A93D', 'E4A000', 'Tracbel amber — on white; matches the outgoing gold\'s weight'),
    'accent_hi': ('D3A93D', 'FFDE00', 'John Deere yellow — reversed out of the dark band only'),
    'hairline':  ('E4E7EC', 'E1E8DC', 'green-tinted neutral at the same lightness as the original'),
    'wash':      ('F8F8F8', 'F4F7F1', 'green-tinted off-white for the Key Highlights band'),
    'map':       ('70AD47', '367C2B', 'John Deere green (Office accent6 -> brand green)'),
}
INK = PALETTE['ink'][1]
MAP = PALETTE['map'][1]
YELLOW = PALETTE['accent_hi'][1]

# Shape whose gold run sits on the dark band and therefore goes to John Deere
# yellow rather than amber.
BAND_SHAPE = 'Text 11'
# The dashed ring over the map — see the module docstring.
RING_SHAPE = 'Shape 14'

# Theme swatches, so the deck opens in PowerPoint with Tracbel colours in the
# picker instead of stock Office blue.  dk1/lt1 stay black/white — they carry
# "text" and "background" semantics that nothing brand-specific should occupy.
THEME_SCHEME = {
    'dk2':     '275417',
    'lt2':     'E1E8DC',
    'accent1': '275417',   # deep field green
    'accent2': '367C2B',   # John Deere green
    'accent3': '439539',   # mid green
    'accent4': 'FFDE00',   # John Deere yellow
    'accent5': 'E4A000',   # amber
    'accent6': '367C2B',
}


def split_shapes(xml):
    """Yield (start, end) spans of each top-level-ish <p:sp> block."""
    for m in re.finditer(r'<p:sp>.*?</p:sp>', xml, re.S):
        yield m.start(), m.end()


def recolor_slide(xml):
    counts = {}

    def sub(pattern, repl, key, text):
        text, n = re.subn(pattern, repl, text)
        counts[key] = counts.get(key, 0) + n
        return text

    # 1. The gold run inside the conclusion band becomes John Deere yellow.
    #    Do this first, while the band's gold is still distinguishable by shape.
    band = None
    for s, e in split_shapes(xml):
        if 'name="%s"' % BAND_SHAPE in xml[s:e]:
            band = (s, e)
            break
    if band is None:
        raise SystemExit('could not locate the conclusion band shape %r' % BAND_SHAPE)
    s, e = band
    inner, n = re.subn('srgbClr val="%s"' % PALETTE['accent_hi'][0],
                       'srgbClr val="%s"' % PALETTE['accent_hi'][1], xml[s:e])
    if n != 1:
        raise SystemExit('expected exactly one gold run in the band, found %d' % n)
    counts['accent_hi'] = n
    xml = xml[:s] + inner + xml[e:]

    # 2. Flat hex swaps for every remaining role.
    for key in ('ink', 'rule', 'accent', 'hairline', 'wash'):
        old, new, _ = PALETTE[key]
        xml = sub('srgbClr val="%s"' % old, 'srgbClr val="%s"' % new, key, xml)

    # 3. The Brazil map is filled from the Office theme (accent6) and its state
    #    outlines from bg1.  Pin the fill to John Deere green explicitly so the
    #    map survives a theme change; leave bg1 alone — those outlines are white
    #    by intent.
    xml = sub(r'<a:schemeClr val="accent6"/>',
              '<a:srgbClr val="%s"/>' % MAP, 'map', xml)

    # 4. The dashed "focus of operation" ring is drawn in tx1 (black) and sits
    #    on top of the map, so it takes John Deere yellow rather than the ink.
    ring = None
    for s, e in split_shapes(xml):
        if 'name="%s"' % RING_SHAPE in xml[s:e]:
            ring = (s, e)
            break
    if ring is None:
        raise SystemExit('could not locate the focus ring shape %r' % RING_SHAPE)
    s, e = ring
    inner, n = re.subn(r'<a:schemeClr val="tx1"/>',
                       '<a:srgbClr val="%s"/>' % YELLOW, xml[s:e])
    if n != 1:
        raise SystemExit('expected one tx1 fill on the focus ring, found %d' % n)
    counts['ring'] = n
    xml = xml[:s] + inner + xml[e:]

    if re.search(r'srgbClr val="(?:222F44|D3A93D|111721|E4E7EC|F8F8F8)"', xml):
        raise SystemExit('an old brand colour survived the swap')
    return xml, counts


def recolor_theme(xml):
    n = 0
    for slot, hexv in THEME_SCHEME.items():
        xml, k = re.subn(r'(<a:%s>\s*<a:srgbClr val=")[0-9A-Fa-f]{6}(")' % slot,
                         r'\g<1>%s\g<2>' % hexv, xml)
        n += k
    return xml, n


def recolor_icon(data, hexv):
    """Repaint a monochrome PNG icon, keeping its anti-aliasing intact.

    The icons are one navy plus an alpha ramp, so the RGB channels carry no
    information worth preserving — only the alpha does.
    """
    from PIL import Image
    im = Image.open(io.BytesIO(data)).convert('RGBA')
    rgb = tuple(int(hexv[i:i + 2], 16) for i in (0, 2, 4))
    solid = Image.new('RGBA', im.size, rgb + (255,))
    solid.putalpha(im.getchannel('A'))
    buf = io.BytesIO()
    solid.save(buf, 'PNG', optimize=True)
    return buf.getvalue()


def recolor_mark(data):
    """Swap the igc mark's navy and gold for the deck's greens.

    Off by default: DESIGN_SYSTEM.md §0 keeps the IGC scaffolding — mark, page
    number, "Confidential" — in house navy and gold under every brand skin, so
    the advisor's mark stays the advisor's.  Pass --green-mark when the deck is
    wanted in one colour family end to end.
    """
    from PIL import Image
    im = Image.open(io.BytesIO(data)).convert('RGBA')
    ink = tuple(int(INK[i:i + 2], 16) for i in (0, 2, 4))
    acc = tuple(int(PALETTE['accent'][1][i:i + 2], 16) for i in (0, 2, 4))
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            # the mark is two flat colours; the dot is far warmer than the
            # letterforms, so red-minus-blue separates them cleanly.
            px[x, y] = (acc if r - b > 40 else ink) + (a,)
    buf = io.BytesIO()
    im.save(buf, 'PNG', optimize=True)
    return buf.getvalue()


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('src', nargs='?', default='Project_Yellow_Teaser_v001.pptx')
    ap.add_argument('dst', nargs='?', default='Project_Yellow_Teaser_v002_TracbelAgro.pptx')
    ap.add_argument('--green-mark', action='store_true',
                    help="also recolour the igc mark into the deck's greens "
                         '(default: leave it in house navy + gold)')
    args = ap.parse_args()

    if not os.path.exists(args.src):
        sys.exit('source not found: %s' % args.src)

    zin = zipfile.ZipFile(args.src)
    names = zin.namelist()
    for required in (SLIDE, THEME):
        if required not in names:
            sys.exit('%s is missing %s — is this the teaser?' % (args.src, required))

    slide, counts = recolor_slide(zin.read(SLIDE).decode('utf8'))
    theme, theme_n = recolor_theme(zin.read(THEME).decode('utf8'))

    tmp = args.dst + '.tmp'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == SLIDE:
                payload = slide.encode('utf8')
            elif item.filename == THEME:
                payload = theme.encode('utf8')
            elif item.filename in ICONS:
                payload = recolor_icon(zin.read(item.filename), INK)
            elif item.filename == IGC_MARK and args.green_mark:
                payload = recolor_mark(zin.read(item.filename))
            else:
                payload = zin.read(item.filename)
            zout.writestr(item, payload)
    zin.close()
    shutil.move(tmp, args.dst)

    print('%s -> %s' % (args.src, args.dst))
    for key, (old, new, why) in PALETTE.items():
        print('  #%s -> #%s  %-3s  %s' % (old, new, counts.get(key, 0), why))
    print('  #%s -> #%s  1    focus ring over the map — a marker, not a border'
          % (PALETTE['ink'][0], YELLOW))
    print('  icons %d · theme swatches %d' % (len(ICONS), theme_n))
    print('  igc mark %s' % ('recoloured green + amber (--green-mark)' if args.green_mark
                             else 'left in house navy + gold (IGC scaffolding, DESIGN_SYSTEM.md §0)'))


if __name__ == '__main__':
    main()
