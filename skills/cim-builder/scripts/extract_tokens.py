#!/usr/bin/env python3
"""Extract hard design tokens (palette, type, geometry) from the reference .pptx decks.

Usage:  python3 refs/extract_tokens.py [deck.pptx ...]
With no args, runs over every .pptx in refs/. Findings are written up in DESIGN_TOKENS.md.
"""
import re, sys, os, glob, zipfile, collections, tempfile

CM = 360000.0
HERE = os.path.dirname(os.path.abspath(__file__))


def unpack(pptx, dest):
    with zipfile.ZipFile(pptx) as z:
        z.extractall(dest)
    return dest


def rd(p):
    try:
        return open(p, encoding='utf-8').read()
    except Exception:
        return ''


def slides_of(d):
    return sorted(glob.glob(os.path.join(d, 'ppt/slides/slide*.xml')),
                  key=lambda p: int(re.search(r'slide(\d+)', p).group(1)))


def report(pptx):
    name = os.path.basename(pptx)
    with tempfile.TemporaryDirectory() as tmp:
        d = unpack(pptx, tmp)
        print('=' * 68)
        print(name)
        print('=' * 68)

        pres = rd(os.path.join(d, 'ppt/presentation.xml'))
        m = re.search(r'sldSz cx="(\d+)" cy="(\d+)"', pres)
        W = H = 0
        if m:
            W, H = int(m.group(1)) / CM, int(m.group(2)) / CM
            print('canvas: %.3f x %.3f cm  (%.3f)' % (W, H, W / H))

        theme = rd(os.path.join(d, 'ppt/theme/theme1.xml'))
        sm = re.search(r'<a:clrScheme.*?</a:clrScheme>', theme, re.S)
        if sm:
            sch = {}
            for nm, body in re.findall(r'<a:(\w+)>(.*?)</a:\1>', sm.group(0), re.S):
                c = (re.search(r'srgbClr val="([0-9A-Fa-f]{6})"', body)
                     or re.search(r'lastClr="([0-9A-Fa-f]{6})"', body))
                if c:
                    sch[nm] = '#' + c.group(1).upper()
            print('theme:', ' '.join('%s=%s' % kv for kv in sch.items()))
        for kind in ('major', 'minor'):
            fm = re.search(r'<a:%sFont>\s*<a:latin typeface="([^"]*)"' % kind, theme)
            if fm:
                print('%s font: %s' % (kind, fm.group(1)))

        colors, fonts, sizes = collections.Counter(), collections.Counter(), collections.Counter()
        shapes, radii = collections.Counter(), collections.Counter()
        lefts, foot = collections.Counter(), collections.Counter()
        sl = slides_of(d)
        for p in sl:
            x = rd(p)
            for c in re.findall(r'srgbClr val="([0-9A-Fa-f]{6})"', x):
                colors['#' + c.upper()] += 1
            for f in re.findall(r'typeface="([^"+][^"]*)"', x):
                fonts[f] += 1
            for s in re.findall(r'\ssz="(\d+)"', x):
                sizes[round(int(s) / 100.0, 1)] += 1
            for s in re.findall(r'<a:prstGeom prst="(\w+)"', x):
                shapes[s] += 1
            for mm in re.finditer(r'prst="(roundRect|round2SameRect|round1Rect)"[^>]*>\s*<a:avLst>(.*?)</a:avLst>', x, re.S):
                for a in re.findall(r'fmla="val (\d+)"', mm.group(2)):
                    radii[(mm.group(1), int(a))] += 1
            for mm in re.finditer(r'<a:off x="(-?\d+)" y="(-?\d+)"/>\s*<a:ext cx="(\d+)" cy="(\d+)"/>', x):
                ox, oy, cx, cy = (int(g) / CM for g in mm.groups())
                if cx < 0.3 or cy < 0.15 or (cx > W * 0.94 and ox < 0.4):
                    continue
                lefts[round(ox, 2)] += 1
            for mm in re.finditer(r'<a:off x="(\d+)" y="(\d+)"/>', x):
                oy = int(mm.group(2)) / CM
                if oy > H - 1.6:
                    foot[round(oy, 2)] += 1

        print('slides: %d' % len(sl))
        def show(lbl, c, n=10, fmt='%s'):
            print('  %-16s %s' % (lbl, '  '.join((fmt + '×%d') % (a, b) for a, b in c.most_common(n))))
        show('colors', colors, 12)
        show('fonts', fonts, 8)
        show('sizes(pt)', sizes, 12, '%.1f')
        show('left margin cm', lefts, 6, '%.2f')
        show('footer y cm', foot, 4, '%.2f')
        show('prstGeom', shapes, 8)
        print('  %-16s %s' % ('radii', '  '.join('%s/%d×%d' % (k[0], k[1], v) for k, v in radii.most_common(6))))
        print()


if __name__ == '__main__':
    args = sys.argv[1:] or sorted(glob.glob(os.path.join(HERE, '*.pptx')))
    if not args:
        sys.exit('no .pptx found')
    for a in args:
        report(a)
