#!/usr/bin/env python3
"""Measure a brand's palette out of a PDF it published.

Two passes, because either one alone lies.  The vector pass reads the `rg`/`RG`
operators inside the content streams, which gives exact author-chosen hexes but
no sense of how much of the deck each one covers.  The raster pass renders the
pages and counts large flat areas, which weights colours by how much they are
actually seen but rounds them through the rasteriser.  A colour that ranks high
in both is a brand colour; one that ranks high in only the raster pass is
usually photography.

    python3 sample_brand_colors.py tracbel_agro_institutional_2026.pdf

Needs poppler (`pdftoppm`) and Pillow for the raster pass; the vector pass is
pure stdlib and still runs without them.
"""
import argparse
import collections
import glob
import os
import re
import subprocess
import sys
import tempfile
import zlib


def vector_colors(path):
    """Tally every device-RGB fill/stroke set in the page content streams."""
    data = open(path, 'rb').read()
    hits = collections.Counter()
    for m in re.finditer(rb'stream\r?\n', data):
        start, end = m.end(), data.find(b'endstream', m.end())
        if end < 0:
            continue
        try:
            body = zlib.decompress(data[start:end])
        except zlib.error:
            continue  # not Flate — image data, or an unsupported filter
        for op in re.finditer(rb'([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+(?:rg|RG)\b', body):
            try:
                rgb = [float(op.group(i)) for i in (1, 2, 3)]
            except ValueError:
                continue
            if any(v < 0 or v > 1 for v in rgb):
                continue
            hits['%02X%02X%02X' % tuple(round(v * 255) for v in rgb)] += 1
    return hits


def raster_colors(path, dpi=60, min_px=700, min_chroma=45):
    """Count flat, saturated areas page by page.

    ``min_chroma`` drops near-greys (paper, type, shadow) and ``min_px`` drops
    the speckle of photographs, leaving the flat fields a designer chose.
    """
    try:
        from PIL import Image
    except ImportError:
        print('  (Pillow missing — skipping the raster pass)', file=sys.stderr)
        return collections.Counter(), {}
    tot = collections.Counter()
    per = {}
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-png', '-r', str(dpi), path,
                        os.path.join(tmp, 'p')], check=True)
        pages = sorted(glob.glob(os.path.join(tmp, 'p-*.png')),
                       key=lambda q: int(re.search(r'-(\d+)\.png', q).group(1)))
        for page in pages:
            im = Image.open(page).convert('RGB')
            local = []
            pixels = (im.get_flattened_data() if hasattr(im, 'get_flattened_data')
                      else im.getdata())  # renamed in Pillow 11
            for (r, g, b), n in collections.Counter(pixels).items():
                if max(r, g, b) - min(r, g, b) < min_chroma or n < min_px:
                    continue
                tot[(r, g, b)] += n
                local.append(((r, g, b), n))
            local.sort(key=lambda t: -t[1])
            per[os.path.basename(page)] = local[:4]
    return tot, per


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('pdf')
    ap.add_argument('--top', type=int, default=25)
    args = ap.parse_args()

    print('=== vector fills (exact hexes, by number of uses) ===')
    for hexv, n in vector_colors(args.pdf).most_common(args.top):
        print('  #%s  %d' % (hexv, n))

    tot, per = raster_colors(args.pdf)
    if tot:
        print('\n=== flat saturated areas (by pixels covered) ===')
        for (r, g, b), n in tot.most_common(args.top):
            print('  #%02X%02X%02X  %d' % (r, g, b, n))
        print('\n=== per page ===')
        for page, local in per.items():
            print('  %-10s %s' % (page, '  '.join('#%02X%02X%02X(%d)' % (r, g, b, n)
                                                  for (r, g, b), n in local) or '-'))


if __name__ == '__main__':
    main()
