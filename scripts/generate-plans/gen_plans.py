"""Genera los 4 PDF de planes de entrenamiento en public/plans/.

Requiere: pip install reportlab
Uso: python3 scripts/generate-plans/gen_plans.py
(las fuentes ya están en scripts/generate-plans/fonts/, no hace falta bajar nada)
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(SCRIPT_DIR, "fonts")
OUT_DIR = os.path.join(SCRIPT_DIR, "..", "..", "public", "plans")
os.makedirs(OUT_DIR, exist_ok=True)

pdfmetrics.registerFont(TTFont("Oswald-Bold", f"{FONT_DIR}/Oswald-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Oswald-SemiBold", f"{FONT_DIR}/Oswald-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("WorkSans", f"{FONT_DIR}/WorkSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("WorkSans-SemiBold", f"{FONT_DIR}/WorkSans-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("WorkSans-Bold", f"{FONT_DIR}/WorkSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("PlexMono", f"{FONT_DIR}/PlexMono.ttf"))
pdfmetrics.registerFont(TTFont("PlexMono-Bold", f"{FONT_DIR}/PlexMonoBold.ttf"))

# ---- brand tokens (mismos valores que src/styles/global.css) ----
INK = colors.HexColor("#1C1A17")
INK_SOFT = colors.HexColor("#726A5D")
INK_FAINT = colors.HexColor("#A29A8B")
LINE = colors.HexColor("#DBD3C4")
BG_RAISED = colors.HexColor("#FBF9F5")
ACCENT = colors.HexColor("#FF5A1F")
ACCENT_SOFT = colors.HexColor("#FCE0D2")
WHITE = colors.HexColor("#FFFFFF")

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm

styles = {
    "intro": ParagraphStyle(
        "intro", fontName="WorkSans", fontSize=10.5, leading=15.5,
        textColor=INK, spaceAfter=4,
    ),
    "sectionLabel": ParagraphStyle(
        "sectionLabel", fontName="PlexMono", fontSize=9, leading=11,
        textColor=ACCENT, tracking=1,
    ),
    "sectionTitle": ParagraphStyle(
        "sectionTitle", fontName="Oswald-Bold", fontSize=15, leading=17,
        textColor=INK, spaceAfter=6,
    ),
    "tip": ParagraphStyle(
        "tip", fontName="WorkSans", fontSize=9.5, leading=14,
        textColor=INK_SOFT,
    ),
    "cell": ParagraphStyle(
        "cell", fontName="WorkSans", fontSize=8.7, leading=11.5,
        textColor=INK,
    ),
    "cellHead": ParagraphStyle(
        "cellHead", fontName="PlexMono", fontSize=8, leading=10,
        textColor=WHITE,
    ),
    "weekNum": ParagraphStyle(
        "weekNum", fontName="PlexMono-Bold", fontSize=10, leading=12,
        textColor=ACCENT,
    ),
    "total": ParagraphStyle(
        "total", fontName="PlexMono-Bold", fontSize=8.7, leading=11,
        textColor=INK,
    ),
}


def draw_header_footer(canv: canvas.Canvas, doc, plan_num, plan_label):
    canv.saveState()
    canv.setFillColor(ACCENT)
    canv.rect(0, PAGE_H - 8 * mm, PAGE_W, 8 * mm, stroke=0, fill=1)
    canv.setFillColor(WHITE)
    canv.setFont("Oswald-Bold", 9)
    canv.drawString(MARGIN, PAGE_H - 6.2 * mm, "PIQUE")
    canv.setFont("PlexMono", 7.5)
    canv.drawRightString(
        PAGE_W - MARGIN, PAGE_H - 6.2 * mm, f"PLAN {plan_num} · {plan_label}"
    )
    canv.setFillColor(INK_FAINT)
    canv.setFont("PlexMono", 7.5)
    canv.drawString(MARGIN, 10 * mm, "pique — calendario, calculadora y rutas de running en Argentina")
    canv.drawRightString(PAGE_W - MARGIN, 10 * mm, f"Página {doc.page}")
    canv.restoreState()


def week_row_flowable(week_label, week_tag, cells, total_km, col_widths):
    """Una 'tarjeta de semana': columna de semana + N columnas de días + total."""
    header_cells = [Paragraph(c[0], styles["cellHead"]) for c in cells]
    body_cells = [Paragraph(c[1], styles["cell"]) for c in cells]

    data = [
        [Paragraph(f"{week_label}<br/><font color='#A29A8B' size=6.5>{week_tag}</font>", styles["weekNum"])]
        + header_cells
        + [Paragraph("TOTAL", styles["cellHead"])],
        [""] + body_cells + [Paragraph(total_km, styles["total"])],
    ]

    t = Table(data, colWidths=col_widths, rowHeights=[13, None])
    t.setStyle(
        TableStyle(
            [
                ("SPAN", (0, 0), (0, 1)),
                ("BACKGROUND", (0, 0), (0, 1), INK),
                ("BACKGROUND", (1, 0), (-1, 0), INK_SOFT),
                ("BACKGROUND", (1, 1), (-1, 1), BG_RAISED),
                ("BACKGROUND", (-1, 0), (-1, 1), ACCENT_SOFT),
                ("TEXTCOLOR", (-1, 1), (-1, 1), INK),
                ("BOX", (0, 0), (-1, -1), 0.75, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def build_plan_pdf(
    filename, plan_num, plan_label, title, subtitle,
    intro_paragraphs, day_headers, weeks, tips,
):
    path = os.path.join(OUT_DIR, filename)
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        topMargin=MARGIN + 6 * mm, bottomMargin=MARGIN,
        leftMargin=MARGIN, rightMargin=MARGIN,
        title=f"{title} — PIQUE", author="PIQUE",
    )

    story = []
    story.append(Spacer(1, 4))
    num_style = ParagraphStyle(
        "num", fontName="Oswald-Bold", fontSize=50, leading=50, textColor=ACCENT_SOFT
    )
    title_style = ParagraphStyle(
        "title", fontName="Oswald-Bold", fontSize=26, leading=28, textColor=INK
    )
    header_table = Table(
        [[Paragraph(plan_num, num_style), Paragraph(f"{title}<br/>{subtitle}", title_style)]],
        colWidths=[42 * mm, None],
    )
    header_table.setStyle(
        TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ])
    )
    story.append(header_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=LINE, spaceAfter=10))

    for p in intro_paragraphs:
        story.append(Paragraph(p, styles["intro"]))
    story.append(Spacer(1, 10))

    story.append(Paragraph("PLAN SEMANA A SEMANA", styles["sectionLabel"]))
    story.append(Paragraph("Cómo entrenar", styles["sectionTitle"]))
    story.append(Spacer(1, 2))

    content_w = PAGE_W - 2 * MARGIN
    n_days = len(day_headers)
    week_col = 26 * mm
    total_col = 20 * mm
    day_col = (content_w - week_col - total_col) / n_days
    col_widths = [week_col] + [day_col] * n_days + [total_col]

    for week_label, week_tag, day_cells, total_km in weeks:
        cells = list(zip(day_headers, day_cells))
        story.append(
            KeepTogether(
                [week_row_flowable(week_label, week_tag, cells, total_km, col_widths), Spacer(1, 6)]
            )
        )

    tips_block = [
        Paragraph("ANTES DE ARRANCAR", styles["sectionLabel"]),
        Paragraph("Tips rápidos", styles["sectionTitle"]),
    ]
    for t in tips:
        tips_block.append(Paragraph(f"→ {t}", styles["tip"]))
        tips_block.append(Spacer(1, 3))
    story.append(Spacer(1, 10))
    story.append(KeepTogether(tips_block))

    doc.build(
        story,
        onFirstPage=lambda c, d: draw_header_footer(c, d, plan_num, plan_label),
        onLaterPages=lambda c, d: draw_header_footer(c, d, plan_num, plan_label),
    )
    print(f"wrote {path}")


COMMON_TIPS = [
    "Si hace tiempo que no entrenás o tenés alguna condición médica, consultá a un profesional antes de arrancar.",
    "Usá zapatillas de running en buen estado — es el único equipo que realmente importa.",
    "“Fácil” significa un ritmo en el que podés hablar sin cortarte. Si no podés, vas muy rápido.",
    "El día largo es el más importante de la semana: no lo saltees, pero tampoco lo corras a fondo.",
    "Dos semanas de descarga (menos volumen) están incluidas a propósito — son parte del entrenamiento, no un lujo.",
    "Para calcular tu ritmo objetivo en cada tipo de sesión, usá la calculadora de pique.",
]

build_plan_pdf(
    filename="plan-5k-principiante.pdf",
    plan_num="05K", plan_label="Principiante",
    title="Plan 5K", subtitle="Principiante · 6 semanas",
    intro_paragraphs=[
        "Para quién es: nunca corriste o volvés después de mucho tiempo parade. El objetivo es llegar a correr "
        "5K seguidos, sin cronómetro de por medio — lo importante acá es la constancia, no la velocidad.",
        "Frecuencia: 3 días por semana, no consecutivos (por ejemplo lunes, miércoles y sábado), con descanso "
        "o actividad suave el resto de los días.",
    ],
    day_headers=["DÍA 1", "DÍA 2", "DÍA 3"],
    weeks=[
        ("SEM 1", "adaptación", ["Caminar 5' + 8x(correr 1' / caminar 2') + caminar 5'", "Igual que el día 1", "Igual que el día 1"], "~5.5K"),
        ("SEM 2", "adaptación", ["Caminar 5' + 6x(correr 2' / caminar 2') + caminar 5'", "Igual que el día 1", "Igual que el día 1"], "~6.5K"),
        ("SEM 3", "progresión", ["Caminar 5' + 5x(correr 4' / caminar 2') + caminar 5'", "Igual que el día 1", "Igual que el día 1"], "~8K"),
        ("SEM 4", "progresión", ["Caminar 5' + 4x(correr 6' / caminar 90\") + caminar 5'", "Igual que el día 1", "Igual que el día 1"], "~9K"),
        ("SEM 5", "casi ahí", ["Caminar 5' + 3x(correr 9' / caminar 90\") + caminar 5'", "Igual que el día 1", "Correr 20' continuos, al ritmo que sea"], "~10K"),
        ("SEM 6", "¡carrera!", ["Correr 15' suave", "Correr 20' suave", "Correr 5K completos — sin cortes"], "~8K"),
    ],
    tips=COMMON_TIPS,
)

build_plan_pdf(
    filename="plan-10k-intermedio.pdf",
    plan_num="10K", plan_label="Intermedio",
    title="Plan 10K", subtitle="Intermedio · 8 semanas",
    intro_paragraphs=[
        "Para quién es: ya podés correr 5K seguidos sin parar y querés dar el salto a los 10K, sumando algo "
        "de velocidad al entrenamiento.",
        "Frecuencia: 4 días por semana. “Series” es esfuerzo fuerte con recuperación trotando entre "
        "repeticiones; “tempo” es un ritmo incómodo pero sostenible, no un sprint.",
    ],
    day_headers=["FÁCIL", "SERIES", "TEMPO", "LARGO"],
    weeks=[
        ("SEM 1", "base", ["30' suave", "6x400m fuerte / 400m trote", "20' a ritmo cómodo-duro", "6K suave"], "~18K"),
        ("SEM 2", "base", ["30' suave", "8x400m fuerte / 400m trote", "20' tempo", "7K suave"], "~20K"),
        ("SEM 3", "construcción", ["35' suave", "5x800m fuerte / 400m trote", "25' tempo", "8K suave"], "~23K"),
        ("SEM 4", "descarga", ["25' suave", "4x400m suave", "15' suave", "6K suave"], "~16K"),
        ("SEM 5", "construcción", ["35' suave", "6x800m fuerte / 400m trote", "25' tempo", "9K suave"], "~25K"),
        ("SEM 6", "pico", ["40' suave", "5x1000m fuerte / 400m trote", "30' tempo", "10K suave"], "~28K"),
        ("SEM 7", "afinar", ["30' suave", "4x600m fuerte", "20' tempo suave", "6K suave"], "~18K"),
        ("SEM 8", "¡carrera!", ["20' suave + técnica", "Descanso", "15' trote + 3 progresivos", "Carrera 10K"], "~10K"),
    ],
    tips=COMMON_TIPS,
)

build_plan_pdf(
    filename="plan-21k-medio-maraton.pdf",
    plan_num="21K", plan_label="Medio maratón",
    title="Plan 21K", subtitle="Medio maratón · 10 semanas",
    intro_paragraphs=[
        "Para quién es: ya corrés 10K con comodidad y querés preparar tu primer (o próximo) medio maratón.",
        "Frecuencia: 5 días de running por semana + 2 de descanso (podés cambiar uno por cross-training suave, "
        "como bici o natación). Las semanas 4 y 8 son de descarga a propósito — bajan volumen para absorber "
        "el entrenamiento previo.",
    ],
    day_headers=["FÁCIL", "CALIDAD", "FÁCIL", "LARGO"],
    weeks=[
        ("SEM 1", "base", ["6K", "8x400m", "6K", "10K"], "~34K"),
        ("SEM 2", "base", ["6K", "6x600m", "7K", "12K"], "~38K"),
        ("SEM 3", "construcción", ["7K", "5x1000m", "7K", "13K"], "~40K"),
        ("SEM 4", "descarga", ["5K", "4x400m suave", "5K", "9K"], "~26K"),
        ("SEM 5", "construcción", ["7K", "6x1000m", "8K", "15K"], "~44K"),
        ("SEM 6", "construcción", ["8K", "20' tempo", "8K", "16K"], "~46K"),
        ("SEM 7", "pico", ["8K", "8x600m", "8K", "17K"], "~48K"),
        ("SEM 8", "descarga", ["6K", "4x400m", "6K", "12K"], "~32K"),
        ("SEM 9", "pico", ["6K", "25' tempo", "6K", "18K"], "~48K"),
        ("SEM 10", "¡carrera!", ["5K", "4x300m suave", "Descanso", "21K — carrera"], "~30K"),
    ],
    tips=COMMON_TIPS,
)

build_plan_pdf(
    filename="plan-42k-maraton.pdf",
    plan_num="42K", plan_label="Maratón",
    title="Plan 42K", subtitle="Maratón · 14 semanas",
    intro_paragraphs=[
        "Para quién es: ya corriste al menos un medio maratón (o tenés una base sólida de 10-12 semanas de "
        "running regular) y querés preparar tu maratón.",
        "Frecuencia: 5 días de running por semana. Estructura clásica: 4 semanas de base, 6 de construcción, "
        "2 de pico y 2 de afinado (taper) antes de la carrera. Las semanas de descarga (4, 8 y 12) son la "
        "clave para llegar entero, no un relleno.",
    ],
    day_headers=["FÁCIL", "CALIDAD", "FÁCIL", "LARGO"],
    weeks=[
        ("SEM 1", "base", ["8K", "6x400m", "8K", "16K"], "~48K"),
        ("SEM 2", "base", ["8K", "8x400m", "8K", "18K"], "~52K"),
        ("SEM 3", "base", ["9K", "5x1000m", "9K", "19K"], "~56K"),
        ("SEM 4", "descarga", ["6K", "4x400m suave", "6K", "14K"], "~38K"),
        ("SEM 5", "construcción", ["9K", "6x1000m", "9K", "21K"], "~60K"),
        ("SEM 6", "construcción", ["10K", "30' tempo", "10K", "23K"], "~65K"),
        ("SEM 7", "construcción", ["10K", "8x600m", "10K", "25K"], "~68K"),
        ("SEM 8", "descarga", ["7K", "4x400m", "7K", "16K"], "~42K"),
        ("SEM 9", "construcción", ["10K", "35' tempo", "10K", "27K"], "~70K"),
        ("SEM 10", "pico", ["11K", "8x800m", "11K", "29K"], "~74K"),
        ("SEM 11", "pico", ["10K", "40' tempo", "10K", "32K"], "~76K"),
        ("SEM 12", "descarga", ["8K", "6x400m suave", "8K", "21K"], "~52K"),
        ("SEM 13", "afinado", ["6K", "20' tempo suave", "6K", "13K"], "~34K"),
        ("SEM 14", "¡carrera!", ["5K + técnica", "Descanso", "20' trote + 3 progresivos", "42K — carrera"], "~35K"),
    ],
    tips=COMMON_TIPS,
)

print("done")
