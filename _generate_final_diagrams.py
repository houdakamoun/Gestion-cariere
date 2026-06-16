from PIL import Image, ImageDraw, ImageFont
from math import atan2, cos, sin

try:
    FONT_TITLE = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 50)
    FONT_HEADER = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 28)
    FONT_BODY = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 22)
    FONT_SMALL = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 20)
except Exception:
    FONT_TITLE = ImageFont.load_default()
    FONT_HEADER = ImageFont.load_default()
    FONT_BODY = ImageFont.load_default()
    FONT_SMALL = ImageFont.load_default()

BG = 'white'
INK = '#111827'
MUTED = '#4b5563'
LINE = '#6b7280'
PURPLE_FILL = '#ede9fe'
PURPLE_STROKE = '#a78bfa'
PURPLE_SOFT = '#f5f3ff'
BLUE_FILL = '#e0f2fe'
BLUE_STROKE = '#38bdf8'
GREEN_FILL = '#dcfce7'
GREEN_STROKE = '#22c55e'
AMBER_FILL = '#fef3c7'
AMBER_STROKE = '#f59e0b'
ROSE_FILL = '#ffe4e6'
ROSE_STROKE = '#fb7185'


def text_width(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def center_text(draw, x, y, lines, font, fill=INK, line_h=28):
    total_h = len(lines) * line_h
    start_y = y - total_h / 2
    for i, line in enumerate(lines):
        tw, th = text_width(draw, line, font)
        draw.text((x - tw / 2, start_y + i * line_h), line, font=font, fill=fill)


def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines = []
    current = ''
    for word in words:
        trial = word if not current else current + ' ' + word
        if draw.textbbox((0, 0), trial, font=font)[2] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [text]


def draw_arrow(draw, start, end, dashed=False, width=3, color=LINE):
    x1, y1 = start
    x2, y2 = end
    if dashed:
        segments = 16
        for i in range(segments):
            if i % 2 == 0:
                a = i / segments
                b = (i + 1) / segments
                draw.line((x1 + (x2 - x1) * a, y1 + (y2 - y1) * a, x1 + (x2 - x1) * b, y1 + (y2 - y1) * b), fill=color, width=width)
    else:
        draw.line((x1, y1, x2, y2), fill=color, width=width)

    size = 12
    if abs(x2 - x1) >= abs(y2 - y1):
        if x2 >= x1:
            pts = [(x2, y2), (x2 - size, y2 - size / 2), (x2 - size, y2 + size / 2)]
        else:
            pts = [(x2, y2), (x2 + size, y2 - size / 2), (x2 + size, y2 + size / 2)]
    else:
        if y2 >= y1:
            pts = [(x2, y2), (x2 - size / 2, y2 - size), (x2 + size / 2, y2 - size)]
        else:
            pts = [(x2, y2), (x2 - size / 2, y2 + size), (x2 + size / 2, y2 + size)]
    draw.polygon(pts, fill=color)


def draw_box(draw, x, y, w, h, title, fields, fill=PURPLE_SOFT, stroke=PURPLE_STROKE, title_fill=INK, font_header=FONT_HEADER, font_body=FONT_BODY):
    draw.rounded_rectangle((x, y, x + w, y + h), radius=14, fill=fill, outline=stroke, width=3)
    draw.line((x, y + 60, x + w, y + 60), fill=stroke, width=2)
    tw, _ = text_width(draw, title, font_header)
    draw.text((x + (w - tw) / 2, y + 15), title, font=font_header, fill=title_fill)
    fy = y + 78
    for f in fields:
        draw.text((x + 18, fy), f, font=font_body, fill=INK)
        fy += 32


def actor_icon(draw, x, y, label, fill=PURPLE_FILL, stroke=PURPLE_STROKE):
    draw.ellipse((x - 44, y - 44, x + 44, y + 44), fill=fill, outline=stroke, width=3)
    draw.line((x, y + 44, x, y + 118), fill=stroke, width=4)
    draw.line((x - 28, y + 70, x + 28, y + 70), fill=stroke, width=4)
    draw.line((x - 24, y + 118, x, y + 152), fill=stroke, width=4)
    draw.line((x + 24, y + 118, x, y + 152), fill=stroke, width=4)
    tw, _ = text_width(draw, label, FONT_BODY)
    draw.text((x - tw / 2, y + 165), label, font=FONT_BODY, fill=INK)


def make_canvas(width, height):
    return Image.new('RGB', (width, height), BG), ImageDraw.Draw(Image.new('RGB', (width, height), BG))


def new_draw(width, height):
    img = Image.new('RGB', (width, height), BG)
    return img, ImageDraw.Draw(img)


def title(draw, text, width):
    tw, _ = text_width(draw, text, FONT_TITLE)
    draw.text(((width - tw) / 2, 30), text, font=FONT_TITLE, fill=INK)


def generate_class_diagram(path):
    img, draw = new_draw(2400, 1700)
    title(draw, 'Diagramme de classes', 2400)

    draw_box(draw, 110, 120, 420, 460, 'User', [
        'int id',
        'string nom',
        'string prenom',
        'string email',
        'DateTime date_naissance',
        'string password',
        'string role',
        'string position',
        'string department',
        'DateTime hireDate',
    ])

    draw_box(draw, 120, 790, 270, 180, 'Profile', [
        'int id',
        'string photo',
        'string cv',
        'int userId',
    ], fill=BLUE_FILL, stroke=BLUE_STROKE)

    draw_box(draw, 690, 330, 330, 180, 'AssignmentStatus', [
        '<<enumeration>>',
        'NOT_STARTED',
        'IN_PROGRESS',
        'COMPLETED',
    ], fill=AMBER_FILL, stroke=AMBER_STROKE)

    draw_box(draw, 760, 790, 360, 200, 'Assignment', [
        'int id',
        'int userId',
        'int formationId',
        'AssignmentStatus status',
    ], fill=GREEN_FILL, stroke=GREEN_STROKE)

    draw_box(draw, 1360, 560, 510, 360, 'Formation', [
        'int id',
        'string title',
        'string duration',
        'int trainerId',
        'string status',
        'DateTime date',
        'DateTime createdAt',
        'DateTime updatedAt',
    ])

    draw_box(draw, 1500, 120, 430, 330, 'Career', [
        'int id',
        'string title',
        'string position',
        'string department',
        'int baseSalary',
        'int level',
        'string description',
        'DateTime createdAt',
    ], fill=ROSE_FILL, stroke=ROSE_STROKE)

    draw_box(draw, 1960, 840, 260, 150, 'Department', [
        'int id',
        'string name',
    ], fill=ROSE_FILL, stroke=ROSE_STROKE)

    draw_arrow(draw, (330, 580), (260, 790), dashed=False)
    center_text(draw, 250, 650, ['has'], FONT_BODY)
    draw.text((280, 620), '1', font=FONT_BODY, fill=INK)
    draw.text((225, 770), '0..1', font=FONT_BODY, fill=INK)

    draw_arrow(draw, (530, 390), (760, 860), dashed=False)
    draw.text((620, 520), '1', font=FONT_BODY, fill=INK)
    draw.text((700, 800), '0..*', font=FONT_BODY, fill=INK)

    draw_arrow(draw, (530, 250), (1960, 890), dashed=False)
    draw.text((760, 320), '0..*', font=FONT_BODY, fill=INK)
    draw.text((1880, 820), '1', font=FONT_BODY, fill=INK)

    draw_arrow(draw, (1360, 930), (1100, 900), dashed=False)
    draw.text((1180, 840), '1', font=FONT_BODY, fill=INK)
    draw.text((1100, 880), '0..*', font=FONT_BODY, fill=INK)

    draw_arrow(draw, (520, 580), (760, 860), dashed=False)
    draw.text((585, 650), '1', font=FONT_BODY, fill=INK)
    draw.text((685, 815), '0..*', font=FONT_BODY, fill=INK)

    draw_arrow(draw, (1500, 260), (1960, 840), dashed=False)
    draw.text((1610, 320), '0..*', font=FONT_BODY, fill=INK)
    draw.text((1885, 760), '1', font=FONT_BODY, fill=INK)

    draw_arrow(draw, (1120, 890), (960, 410), dashed=False)

    img.save(path)


def draw_actor_circle(draw, x, y, label, fill=PURPLE_FILL, stroke=PURPLE_STROKE):
    draw.ellipse((x - 38, y - 38, x + 38, y + 38), fill=fill, outline=stroke, width=3)
    draw.line((x, y + 38, x, y + 104), fill=stroke, width=4)
    draw.line((x - 26, y + 62, x + 26, y + 62), fill=stroke, width=4)
    draw.line((x - 22, y + 104, x, y + 138), fill=stroke, width=4)
    draw.line((x + 22, y + 104, x, y + 138), fill=stroke, width=4)
    tw, _ = text_width(draw, label, FONT_BODY)
    draw.text((x - tw / 2, y + 150), label, font=FONT_BODY, fill=INK)


def draw_use_case_box(draw, x, y, w, h, lines):
    draw.rounded_rectangle((x, y, x + w, y + h), radius=12, fill=PURPLE_SOFT, outline=PURPLE_STROKE, width=3)
    center_text(draw, x + w / 2, y + h / 2, lines, FONT_BODY)


def generate_use_case_diagram(path):
    img, draw = new_draw(2400, 1500)
    title(draw, 'Diagramme de cas d\'utilisation', 2400)

    actors = [
        ('Utilisateur non authentifié', 170, 220),
        ('Employé', 170, 560),
        ('RH', 170, 900),
        ('Administrateur', 170, 1230),
    ]
    for label, x, y in actors:
        draw_actor_circle(draw, x, y, label)

    cases = {
        'UC1': (620, 140, ['Créer un compte']),
        'UC2': (620, 275, ['Se connecter']),
        'UC3': (620, 410, ['Consulter les', 'carrières']),
        'UC4': (620, 555, ['Consulter le détail', "d'une carrière"]),
        'UC5': (620, 700, ['Consulter les', 'formations']),
        'UC6': (620, 845, ['Consulter le détail', "d'une formation"]),
        'UC7': (620, 990, ['Mettre à jour son profil']),
        'UC8': (620, 1135, ['Voir ses formations', 'assignées']),
        'UC9': (1460, 230, ['Gérer les formations']),
        'UC10': (1460, 385, ['Affecter une formation', 'à un utilisateur']),
        'UC11': (1460, 540, ['Consulter les', 'statistiques']),
        'UC12': (1460, 695, ['Gérer les utilisateurs']),
        'UC13': (1460, 850, ['Gérer les', 'départements']),
    }
    for _, (x, y, lines) in cases.items():
        draw_use_case_box(draw, x, y, 380, 82, lines)

    public_keys = ['UC1', 'UC2', 'UC3', 'UC4']
    employee_keys = ['UC5', 'UC6', 'UC7', 'UC8']
    rh_keys = ['UC9', 'UC10', 'UC11']
    admin_keys = ['UC11', 'UC12', 'UC13', 'UC7']

    for offset, key in zip([-36, -12, 12, 36], public_keys):
        draw_arrow(draw, (208, 220 + offset), (620, cases[key][1] + 41), dashed=False)

    for offset, key in zip([-54, -18, 18, 54], employee_keys):
        draw_arrow(draw, (208, 560 + offset), (620, cases[key][1] + 41), dashed=False)

    for offset, key in zip([-40, 0, 40], rh_keys):
        draw_arrow(draw, (208, 900 + offset), (1460, cases[key][1] + 41), dashed=False)

    for offset, key in zip([-54, -18, 18, 54], admin_keys):
        draw_arrow(draw, (208, 1230 + offset), (1460, cases[key][1] + 41), dashed=False)

    img.save(path)


def draw_sequence_base(title_text, participants, messages, path, width=1800, height=980):
    img, draw = new_draw(width, height)
    title(draw, title_text, width)

    y_top = 170
    box_w = 260
    box_h = 78
    life_bottom = height - 90

    for label, x in participants:
        draw.rounded_rectangle((x - box_w / 2, y_top, x + box_w / 2, y_top + box_h), radius=12, fill=PURPLE_FILL, outline=PURPLE_STROKE, width=3)
        tw, _ = text_width(draw, label, FONT_HEADER)
        draw.text((x - tw / 2, y_top + 22), label, font=FONT_HEADER, fill=INK)
        draw.line((x, y_top + box_h, x, life_bottom), fill=PURPLE_STROKE, width=2)

    for item in messages:
        y = item['y']
        start = item['from']
        end = item['to']
        dashed = item.get('dashed', False)
        label = item['label']
        max_width = abs(end - start) - 70
        lines = wrap_text(draw, label, FONT_SMALL, max_width)
        center_text(draw, (start + end) / 2, y - 20, lines, FONT_SMALL, fill=INK, line_h=24)
        draw_arrow(draw, (start, y), (end, y), dashed=dashed)

    img.save(path)


def generate_sequence_auth(path):
    participants = [('Utilisateur', 220), ('AuthController', 760), ('Base de données', 1360)]
    messages = [
        {'y': 310, 'from': 220, 'to': 760, 'label': 'POST /auth/signup ou /auth/login'},
        {'y': 425, 'from': 760, 'to': 1360, 'label': 'Vérifier / créer l\'utilisateur'},
        {'y': 520, 'from': 1360, 'to': 760, 'label': 'Données utilisateur', 'dashed': True},
        {'y': 620, 'from': 760, 'to': 220, 'label': 'Réponse JSON + statut', 'dashed': True},
    ]
    draw_sequence_base('Inscription / connexion', participants, messages, path, width=1600, height=900)


def generate_sequence_formation(path):
    participants = [('RH / Administrateur', 220), ('FormationController', 760), ('AssignmentController', 1220), ('Base de données', 1550)]
    messages = [
        {'y': 300, 'from': 220, 'to': 760, 'label': 'POST /api/formations'},
        {'y': 395, 'from': 760, 'to': 1550, 'label': 'Insérer la formation'},
        {'y': 480, 'from': 1550, 'to': 760, 'label': 'Formation créée', 'dashed': True},
        {'y': 565, 'from': 760, 'to': 220, 'label': 'Détails de la formation', 'dashed': True},
        {'y': 675, 'from': 220, 'to': 1220, 'label': 'POST /assignment/assign-formation'},
        {'y': 770, 'from': 1220, 'to': 1550, 'label': 'Créer l\'assignation'},
        {'y': 850, 'from': 1550, 'to': 1220, 'label': 'Assignation créée', 'dashed': True},
        {'y': 930, 'from': 1220, 'to': 220, 'label': 'Confirmation', 'dashed': True},
    ]
    draw_sequence_base('Création et affectation d\'une formation', participants, messages, path, width=1800, height=1040)


def generate_sequence_profile(path):
    participants = [('Employé', 220), ('ProfileController', 760), ('Middleware upload', 1240), ('Base de données', 1560)]
    messages = [
        {'y': 300, 'from': 220, 'to': 760, 'label': 'PUT /profiles/:id'},
        {'y': 395, 'from': 760, 'to': 1240, 'label': 'Traiter photo / CV'},
        {'y': 480, 'from': 1240, 'to': 760, 'label': 'Fichiers prêts', 'dashed': True},
        {'y': 580, 'from': 760, 'to': 1560, 'label': 'Créer ou mettre à jour le profil'},
        {'y': 675, 'from': 1560, 'to': 760, 'label': 'Profil enregistré', 'dashed': True},
        {'y': 790, 'from': 760, 'to': 220, 'label': 'Réponse JSON', 'dashed': True},
    ]
    draw_sequence_base('Mise à jour du profil', participants, messages, path, width=1800, height=940)


base = r'c:\Users\ASUS\Desktop\pfeHH\career-platform\diagrammes-png'
generate_class_diagram(base + '\\class-diagram.png')
generate_use_case_diagram(base + '\\use-case-diagram.png')
generate_sequence_auth(base + '\\sequence-auth.png')
generate_sequence_formation(base + '\\sequence-formation-affectation.png')
generate_sequence_profile(base + '\\sequence-profile-update.png')
print(base)
