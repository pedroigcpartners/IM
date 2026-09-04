#!/usr/bin/env python3
"""Reestiliza o slide "Innovations" do Biscoitê na gramática do próprio CIM.

O slide é reconstruído DENTRO do .pptx original, não gerado do zero: assim o
master continua entregando o chrome (marca igc, wordmark Biscoitê, "Confidential",
numeração) e as seis fotos já embutidas seguem valendo.

Tudo que segue foi MEDIDO no PDF do CIM (caixa 960x540pt = 13,333x7,5", 1pt = 1/72"),
não estimado:

  chrome, igual em toda página de conteúdo
    eyebrow   x=0,800 y=0,374  10pt Poppins Light   #413245
    título    x=0,800 y=0,756  18pt Poppins Medium  #6580A2
    subtítulo x=0,806 y=1,183  11pt Poppins Medium  #413245
    source    x=0,800 y=6,773   8pt Poppins Light   #706A69

  card de conteúdo (página 34 do deck, "Four complementary store formats"):
    quatro colunas em x = 0,800 / 3,857 / 6,914 / 9,971, largura 2,893, calha 0,164
    painel #E0E6EC SÓLIDO (o slide original usava 75% de alpha, e por isso
      lavava perto do resto do deck)
    título do card 16pt Poppins SemiBold #6580A2 CENTRALIZADO
    corpo 10pt Poppins Regular #413245, recuo lateral 0,205, entrelinha 0,1835
      (132% de 10pt), fundo do card em 6,562 com respiro largo embaixo

Uma adaptação necessária: na página 34 a foto é uma imagem real sangrada no topo
do card. Aqui cinco das seis fotos são recortes com fundo transparente — sangrar
não é opção. Então o card vira um bloco único #E0E6EC com o produto flutuando na
metade de cima, que é como o deck trata packshot recortado na página 26. A foto
do Soft Cookie, a única retangular, é mascarada em círculo — dispositivo que o
deck usa na página 9 — para ficar coerente com os recortes.
"""

import os
import re
import shutil
import subprocess
import zipfile

from PIL import Image, ImageDraw

SRC = "/root/.claude/uploads/25be0b4b-3e9e-5535-bf7e-d47c43e5e1b5/f6cbce83-Biscoit___Slide_Inova__es_EN.pptx"
WORK = "/tmp/claude-0/-home-user-IM/25be0b4b-3e9e-5535-bf7e-d47c43e5e1b5/scratchpad/bisc_build"
OUT = "/home/user/IM/Biscoite_Slide_Innovations_EN_v2.pptx"

EMU = 914400


def emu(v):
    return int(round(v * EMU))


# ---------------------------------------------------------------- tokens
SLATE = "6580A2"   # títulos e acentos
PLUM = "413245"    # corpo
PANEL = "E0E6EC"   # painel do card
GREY = "706A69"    # rodapé / fonte

CARD_X = [0.800, 3.857, 6.914, 9.971]
CARD_W = 2.893
CARD_Y = 1.700
CARD_BOT = 6.562
WELL_H = 1.900                     # zona da foto, dentro do card
TITLE_Y = CARD_Y + WELL_H + 0.135  # 3,735 — mesmo respiro da pág. 34
CAP_Y = TITLE_Y + 0.310            # sub-linha de status
BODY_Y = TITLE_Y + 0.510           # 4,245
BODY_INSET = 0.205
BODY_W = CARD_W - 2 * BODY_INSET
# PowerPoint/LibreOffice tratam espaçamento simples como 1,2x o corpo, então a
# entrelinha renderizada é pt * lnSpc * 1,2 / 72 — e não pt * lnSpc / 72. Fixar
# 132% dava 0,220" onde o CIM tem 0,1835" (medido nos dois PDFs: 0,220 contra
# 0,184/0,183/0,183). A porcentagem passa a sair da entrelinha-alvo.
def lnspc(pt, pitch_in):
    return int(round(pitch_in * 72.0 / (pt * 1.2) * 100000))


BODY_PITCH = 0.1835                # pág. 34 do CIM, corpo de 10pt
LNSPC = lnspc(10, BODY_PITCH)      # 110%

CARDS = [
    {
        "title": "B.Eat",
        "cap": "Already in stores",
        "body": "Individually wrapped biscuits at an accessible price point give customers a "
                "reason to walk in mid-week, not only for a gift. Limonê is already in stores, "
                "with Tubê and Stroopwafel to follow.",
        "note": [("Benchmark: ", 0), ("+22% visit frequency", 1),
                 (" on the same customer base and ", 0),
                 ("1 in 3 new triers returning within 30 days", 1)],
    },
    {
        "title": "Origens",
        "cap": "2026 pipeline",
        "body": "A line built on Brazilian ingredients — Brasilê with Brazil nut and cashew, "
                "Marú with cumaru. No other artisanal biscuit chain in Brazil runs a dedicated "
                "national-flavor range.",
    },
    {
        "title": "Futi × Neymar Jr.",
        "cap": "2026 pipeline",
        "body": "A licensing partnership with the most followed Brazilian athlete turns biscuits "
                "into collectibles across three price points — Card, blind-box Collection and "
                "Arena — with a national campaign in 2026.",
    },
    {
        "title": "Soft Cookie 2.0",
        "cap": "2026 pipeline",
        "body": "The soft cookie range was reformulated for texture, flavor intensity and "
                "consistent execution across stores. Biscoitê PRO adds a zero-sugar, "
                "12g-protein bar from Jan/27.",
    },
]

TITLE = ("A continuous innovation pipeline broadens the audience and increases "
         "purchase frequency")
SUBTITLE = ("The 2026 roadmap adds an accessible everyday line, a proprietary Brazilian-flavor "
            "range and licensed collectibles, expanding consumption occasions without diluting "
            "the premium positioning")


# ---------------------------------------------------------------- assets
def prepare(work):
    """Mascara a foto do Soft Cookie em círculo — é a única não recortada."""
    src = os.path.join(work, "ppt/media/innov_soft.jpg")
    im = Image.open(src).convert("RGB")
    w, h = im.size
    d = min(w, h)
    # enquadra no biscoito: centro levemente à esquerda e abaixo do meio
    cx, cy = int(w * 0.46), int(h * 0.58)
    x0 = max(0, min(w - d, cx - d // 2))
    y0 = max(0, min(h - d, cy - d // 2))
    im = im.crop((x0, y0, x0 + d, y0 + d)).resize((1400, 1400), Image.LANCZOS)
    mask = Image.new("L", (1400 * 4, 1400 * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 1400 * 4 - 1, 1400 * 4 - 1), fill=255)
    mask = mask.resize((1400, 1400), Image.LANCZOS)   # borda suavizada
    out = Image.new("RGBA", (1400, 1400), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    dst = os.path.join(work, "ppt/media/innov_soft_circle.png")
    out.save(dst)
    return dst


def contain(ar, bw, bh):
    """Maior caixa de AR dado que cabe em bw x bh."""
    w = bw
    h = w / ar
    if h > bh:
        h = bh
        w = h * ar
    return w, h


# ---------------------------------------------------------------- XML
def sp_rect(sid, name, x, y, w, h, fill):
    return (
        f'<p:sp><p:nvSpPr><p:cNvPr id="{sid}" name="{name}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>'
        f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr>'
        f'<p:txBody><a:bodyPr lIns="0" tIns="0" rIns="0" bIns="0"/><a:lstStyle/>'
        f'<a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp>'
    )


def esc(t):
    return (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def run(text, sz, face, color, bold=False):
    b = ' b="1"' if bold else ""
    return (
        f'<a:r><a:rPr lang="en-US" sz="{int(sz * 100)}"{b} dirty="0">'
        f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
        f'<a:latin typeface="{face}"/><a:cs typeface="{face}"/></a:rPr>'
        f'<a:t>{esc(text)}</a:t></a:r>'
    )


def sp_text(sid, name, x, y, w, h, paras, align="l", anchor="t", ls=None):
    ls = LNSPC if ls is None else ls
    body = "".join(
        f'<a:p><a:pPr algn="{align}"><a:lnSpc><a:spcPct val="{ls}"/></a:lnSpc>'
        f'<a:spcBef><a:spcPts val="{sb}"/></a:spcBef></a:pPr>{runs}</a:p>'
        for runs, sb in paras
    )
    return (
        f'<p:sp><p:nvSpPr><p:cNvPr id="{sid}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
        f'<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" '
        f'anchor="{anchor}"><a:noAutofit/></a:bodyPr><a:lstStyle/>{body}</p:txBody></p:sp>'
    )


def pic(sid, name, rid, x, y, w, h):
    return (
        f'<p:pic><p:nvPicPr><p:cNvPr id="{sid}" name="{name}"/>'
        f'<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>'
        f'<p:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>'
    )


def build_slide(ars):
    sid = [200]

    def nid():
        sid[0] += 1
        return sid[0]

    out = []

    # ---- quatro cards ------------------------------------------------
    for i, c in enumerate(CARDS):
        cx = CARD_X[i]
        out.append(sp_rect(nid(), f"Card{i}", cx, CARD_Y, CARD_W, CARD_BOT - CARD_Y, PANEL))

    # ---- fotos, contidas na zona superior de cada card ----------------
    wy, wh = CARD_Y + 0.10, WELL_H - 0.20          # 1,80 .. 3,60
    wcy = wy + wh / 2

    # card 0: os três B.Eat lado a lado
    slot = (CARD_W - 0.36) / 3
    for k, (nm, rid, capw, caph) in enumerate([
            ("beat_limone", "rId2", slot * 1.02, wh * 0.94),
            ("beat_tube", "rId3", slot * 0.66, wh * 1.00),
            ("beat_stroop", "rId4", slot * 1.02, wh * 0.94)]):
        w, h = contain(ars[nm], capw, caph)
        scx = CARD_X[0] + 0.18 + slot * (k + 0.5)
        base = wy + wh                                   # linha de base comum
        out.append(pic(nid(), nm, rid, scx - w / 2, base - h, w, h))

    # cards 1..3: uma foto centrada
    for i, (nm, rid) in enumerate([("origens", "rId5"), ("futi", "rId6"), ("soft", "rId8")], start=1):
        w, h = contain(ars[nm], CARD_W - 0.60, wh)
        out.append(pic(nid(), nm, rid, CARD_X[i] + CARD_W / 2 - w / 2, wcy - h / 2, w, h))

    # ---- título e corpo de cada card ---------------------------------
    for i, c in enumerate(CARDS):
        cx = CARD_X[i]
        out.append(sp_text(nid(), f"CardTitle{i}", cx, TITLE_Y, CARD_W, 0.30,
                           [(run(c["title"], 16, "Poppins SemiBold", SLATE), 0)], align="ctr", ls=100000))
        out.append(sp_text(nid(), f"CardCap{i}", cx, CAP_Y, CARD_W, 0.20,
                           [(run(c["cap"], 9, "Poppins Medium", SLATE), 0)], align="ctr", ls=100000))
        paras = [(run(c["body"], 10, "Poppins", PLUM), 0)]
        if c.get("note"):
            runs = "".join(
                run(t, 10, "Poppins SemiBold" if b else "Poppins", SLATE if b else PLUM, bold=False)
                for t, b in c["note"])
            paras.append((runs, 700))
        out.append(sp_text(nid(), f"CardBody{i}", cx + BODY_INSET, BODY_Y, BODY_W,
                           CARD_BOT - BODY_Y - 0.14, paras))

    # ---- chrome da página --------------------------------------------
    out.append(sp_text(nid(), "Section", 0.800, 0.374, 2.400, 0.190,
                       [(run("Company overview", 10, "Poppins Light", PLUM), 0)], ls=100000))
    out.append(sp_text(nid(), "Title", 0.800, 0.756, 12.142, 0.330,
                       [(run(TITLE, 18, "Poppins Medium", SLATE), 0)], ls=100000))
    out.append(sp_text(nid(), "Subtitle", 0.806, 1.183, 11.900, 0.460,
                       [(run(SUBTITLE, 11, "Poppins Medium", PLUM), 0)], ls=lnspc(11, 0.202)))
    out.append(sp_text(nid(), "Source", 0.800, 6.773, 10.144, 0.170,
                       [(run("Source: Company", 8, "Poppins Light", GREY), 0)], ls=100000))
    # marcador de rascunho, idêntico ao que o CIM carrega nas páginas novas
    out.append(sp_rect(nid(), "NewTag", 10.604, 0.0, 1.000, 0.559, "92D050"))
    out.append(sp_text(nid(), "NewTagTxt", 10.604, 0.140, 1.000, 0.280,
                       [(run("New", 12, "Source Serif Pro", PLUM), 0)], align="ctr", ls=100000))

    head = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
            'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
            '<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/>'
            '</p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>'
            '<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>')
    tail = '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>'
    return head + "".join(out) + tail


def main():
    if os.path.exists(WORK):
        shutil.rmtree(WORK)
    os.makedirs(WORK)
    with zipfile.ZipFile(SRC) as z:
        z.extractall(WORK)

    circle = prepare(WORK)

    ars = {}
    for nm, f in [("beat_limone", "innov_beat_limone.png"), ("beat_tube", "innov_beat_tube.png"),
                  ("beat_stroop", "innov_beat_stroop.png"), ("origens", "innov_origens.png"),
                  ("futi", "innov_futi.png"), ("soft", os.path.basename(circle))]:
        im = Image.open(os.path.join(WORK, "ppt/media", f))
        ars[nm] = im.size[0] / im.size[1]

    rels_p = os.path.join(WORK, "ppt/slides/_rels/slide34.xml.rels")
    rels = open(rels_p, encoding="utf-8").read()
    if "rId8" not in rels:
        rels = rels.replace(
            "</Relationships>",
            '<Relationship Id="rId8" '
            'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" '
            'Target="../media/innov_soft_circle.png"/></Relationships>')
        open(rels_p, "w", encoding="utf-8").write(rels)

    open(os.path.join(WORK, "ppt/slides/slide34.xml"), "w", encoding="utf-8").write(build_slide(ars))

    if os.path.exists(OUT):
        os.remove(OUT)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(WORK):
            for f in files:
                p = os.path.join(root, f)
                z.write(p, os.path.relpath(p, WORK))
    print("WROTE", OUT)


if __name__ == "__main__":
    main()
