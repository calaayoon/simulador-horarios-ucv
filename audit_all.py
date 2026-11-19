import zlib, re, json

with open('programacion_derecho_25_26.pdf', 'rb') as f:
    data = f.read()

streams = []
for m in re.finditer(b'stream[\r\n]+(.*?)[\r\n]+endstream', data, re.DOTALL):
    s = m.group(1)
    try:
        dec = zlib.decompress(s).decode('latin1', errors='replace')
        streams.append(dec)
    except:
        pass

def parse_stream(stream_text):
    tokens = re.split(r'(\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+Tm|\[.*?\]\s*TJ|\(.*?\)\s*Tj)', stream_text, flags=re.DOTALL)
    cur_x = 0.0
    cur_y = 0.0
    items = []
    
    for token in tokens:
        token = token.strip()
        if not token:
            continue
        if token.endswith('Tm'):
            parts = token.split()
            if len(parts) >= 7:
                cur_x = float(parts[-3])
                cur_y = float(parts[-2])
        elif token.endswith('TJ'):
            strs = re.findall(r'\(((?:\\.|[^\)])*)\)', token)
            text = "".join(strs).replace(r'\(', '(').replace(r'\)', ')').replace(r'\n', ' ').replace(r'\\', '\\')
            if text.strip():
                items.append((cur_x, cur_y, text.strip()))
        elif token.endswith('Tj'):
            m = re.search(r'^\(((?:\\.|[^\)])*)\)', token)
            if m:
                text = m.group(1).replace(r'\(', '(').replace(r'\)', ')').replace(r'\n', ' ').replace(r'\\', '\\')
                if text.strip():
                    items.append((cur_x, cur_y, text.strip()))
    return items

# Let's inspect the subject headers in all pages
subjects_by_page = {}
for p_idx in range(len(streams)):
    items = parse_stream(streams[p_idx])
    if not items:
        continue
    # find lines with CÓDIGO or subject name
    subject_title = ""
    code = ""
    year = ""
    for it in items:
        # e.g. "INTRODUCCIÓN AL DERECHO (CÓDIGO 1501)"
        m = re.search(r'([A-ZÁÉÍÓÚÑ\s\.,\-/\(\)]+)\s*\((?:CÓDIGO|CODIGO)\s*(\d{4})\)', it[2], re.IGNORECASE)
        if m:
            subject_title = m.group(1).strip()
            code = m.group(2).strip()
        if 'Añoy' in it[2] or 'Añoy' in it[2] or 'Año' in it[2]:
            year = it[2]
    if code:
        subjects_by_page[p_idx] = {'page': p_idx, 'code': code, 'subject': subject_title}
    else:
        # Check if subject is without (CÓDIGO xxxx) or split
        for it in items:
            if any(k in it[2] for k in ['DERECHO', 'SOCIOLOGÍA', 'ECONOMÍA', 'HISTORIA', 'CRIMINOLOGÍA', 'OBLIGACIONES', 'CONSTITUCIONAL', 'ADMINISTRATIVO', 'PENAL', 'CIVIL', 'MERCANTIL', 'TRABAJO', 'TRIBUTARIO', 'INTERNACIONAL', 'PROCESAL', 'FILOSOFÍA']):
                if it[1] > 750: # header area
                    subject_title += " " + it[2]
        if subject_title.strip():
            subjects_by_page[p_idx] = {'page': p_idx, 'code': 'UNKNOWN', 'subject': subject_title.strip()}

print(f"Found {len(subjects_by_page)} pages with subjects:")
for p, info in sorted(subjects_by_page.items()):
    print(f"Page {p:2d}: Code {info['code']} - {info['subject']}")
