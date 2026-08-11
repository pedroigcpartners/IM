#!/usr/bin/env python3
"""Render a .pptx to page images and contact sheets, and audit its type scale.

Building a deck blind is the main failure mode: pptxgenjs will happily emit
overlapping shapes, clipped cards and text running under the footer, and none of
it shows up until someone opens the file. Run this after every build and actually
look at the sheets.

    python3 qa_deck.py deck.pptx                 # sheets + type audit
    python3 qa_deck.py deck.pptx --slides 9 14   # only these, full size
"""
import argparse, glob, os, re, subprocess, sys, tempfile, zipfile, collections

# the house type grid — integer pt, 10.5 the only half-step
GRID = {7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 14, 15, 16, 18, 20, 24, 28, 32}


def audit_type(pptx):
    z = zipfile.ZipFile(pptx)
    slides = [n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)]
    sizes = collections.Counter()
    for n in slides:
        for s in re.findall(r'\ssz="(\d+)"', z.read(n).decode('utf8')):
            sizes[int(s) / 100.0] += 1
    off = [k for k in sorted(sizes) if k not in GRID]
    print('slides    : %d' % len(slides))
    print('type scale: %s' % '  '.join('%g×%d' % kv for kv in sorted(sizes.items())))
    print('off-grid  : %s' % (off or 'none'))
    if off:
        print('  -> sizes outside the house grid read as "not an IGC deck"; snap them.')
    return len(slides)


def render(pptx, outdir, dpi=100):
    subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', pptx,
                    '--outdir', outdir], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pdf = os.path.join(outdir, os.path.splitext(os.path.basename(pptx))[0] + '.pdf')
    subprocess.run(['pdftoppm', '-jpeg', '-r', str(dpi), '-jpegopt', 'quality=85',
                    pdf, os.path.join(outdir, 's')], check=True)
    return sorted(glob.glob(os.path.join(outdir, 's-*.jpg')),
                  key=lambda q: int(re.search(r'-(\d+)\.jpg', q).group(1)))


def sheets(files, outdir, per=6, cols=2, scale=0.62):
    from PIL import Image
    made = []
    for g in range(0, len(files), per):
        ims = [Image.open(f) for f in files[g:g + per]]
        w, h = ims[0].size
        w2, h2 = int(w * scale), int(h * scale)
        rows = (len(ims) + cols - 1) // cols
        sheet = Image.new('RGB', (cols * w2, rows * h2), '#888888')
        for i, im in enumerate(ims):
            sheet.paste(im.resize((w2, h2)), ((i % cols) * w2, (i // cols) * h2))
        out = os.path.join(outdir, 'qa-%d.jpg' % (g // per + 1))
        sheet.save(out, quality=82)
        made.append(out)
    return made


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pptx')
    ap.add_argument('--outdir', default=None)
    ap.add_argument('--slides', nargs='*', type=int, help='render only these, full size')
    ap.add_argument('--dpi', type=int, default=100)
    a = ap.parse_args()

    if not os.path.exists(a.pptx):
        sys.exit('no such file: ' + a.pptx)
    out = a.outdir or tempfile.mkdtemp(prefix='deckqa-')
    os.makedirs(out, exist_ok=True)

    audit_type(a.pptx)
    files = render(a.pptx, out, a.dpi)
    if a.slides:
        keep = [files[n - 1] for n in a.slides if 0 < n <= len(files)]
        print('\npages:')
        for f in keep:
            print('  ' + f)
    else:
        print('\ncontact sheets:')
        for f in sheets(files, out):
            print('  ' + f)
    print('\nOpen these and check every slide: overlap, clipping, text under the '
          'footer, distorted logos, empty space.')


if __name__ == '__main__':
    main()
