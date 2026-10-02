#!/usr/bin/env python3
"""Genera app/awsome-app/public/costes_<tipo>.json a partir de docs/costes/precios/<tipo>/*.md.

Por candidato: del front matter, candidato, fecha_revision, region_referencia y moneda (vacío si falta),
y de la sección '## 2.' las tablas de cálculo como {titulo, filas: [{columna: celda}]}.
Las celdas se guardan como texto, tal cual aparecen en el markdown (sin el énfasis **).
Además, 'enlaces': las notas al pie del final del .md ('[^id]: Autor, «Título», url, consultado AAAA-MM-DD.') como
{id, titulo, url, consultado}, en el orden en que aparecen, y 'totales': el coste mensual total de cada escenario (S/M/L) como {min, max, moneda, origen, texto};
min y max son null cuando la celda no es una cifra (N/D, texto, "+ almacenamiento"...).

Si la ficha declara un 'modelo' de precios en el front matter (ver docs/costes/metodologia.md §8), se valida
(identificadores de las fórmulas, valores por escenario, fuentes) y se copia tal cual al JSON; si tiene errores
se avisa por stderr y la ficha sale sin modelo.

Uso: python3 scripts/generar_costes.py [--estricto] [--salida DIR]
"""
import argparse
import re
from pathlib import Path

import md
from formula import comprobar as comprobar_formula
from generar_candidatos import cargar_fuentes
from generar_escenarios import ENTRADA as ESCENARIOS_MD, parametros

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "docs/costes/precios"
SALIDA = RAIZ / "app/awsome-app/public"
front_matter = md.front_matter
CAMPOS = ("candidato", "fecha_revision", "region_referencia", "moneda")
# columnas que contienen el total mensual, por orden de preferencia
COLUMNAS_TOTAL = (r"^TCO mensual", r"^Coste mensual", r"Dremio Cloud")
NUM = r"\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?"
MONEDA = {"€": "EUR", "EUR": "EUR", "USD": "USD", "$": "USD"}
CIFRA = re.compile(rf"^[≈~]?\s*({NUM})\s*(€|EUR|USD|\$)?(?:\s*[–-]\s*({NUM})\s*(€|EUR|USD|\$)?)?$")


FUNCIONES = {"max", "min", "ceil"}
IDENT = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")


def valor_valido(v):
    """número, {min, max} o {S, M, L} donde cada uno es número o {min, max}."""
    def num(x):
        return isinstance(x, (int, float)) and not isinstance(x, bool)

    def rango(x):
        return num(x) or (isinstance(x, dict) and set(x) == {"min", "max"} and num(x["min"]) and num(x["max"]) and x["min"] <= x["max"])

    if rango(v):
        return True
    return isinstance(v, dict) and set(v) == {"S", "M", "L"} and all(rango(x) for x in v.values())


def validar_modelo(modelo, ids_escenario, fuentes):
    """Lista de errores del modelo de precios (vacía si es válido)."""
    if not isinstance(modelo, dict):
        return ["'modelo' debe ser un mapa"]
    errores = []
    if modelo.get("moneda") not in ("EUR", "USD"):
        errores.append(f"modelo.moneda debe ser EUR o USD (valor: {modelo.get('moneda')!r})")
    ids = set()
    for p in modelo.get("parametros") or []:
        pid = p.get("id") if isinstance(p, dict) else None
        if not isinstance(pid, str) or not IDENT.fullmatch(pid):
            errores.append(f"parámetro sin 'id' válido: {p!r}")
            continue
        if pid in ids or pid in ids_escenario:
            errores.append(f"parámetro '{pid}' duplicado o con el mismo id que un parámetro de escenario")
        ids.add(pid)
        if not p.get("nombre"):
            errores.append(f"parámetro '{pid}' sin 'nombre'")
        if not valor_valido(p.get("valor")):
            errores.append(f"parámetro '{pid}': 'valor' debe ser número, {{min, max}} o {{S, M, L}} (valor: {p.get('valor')!r})")
        if p.get("fuente") is not None and p["fuente"] not in fuentes:
            errores.append(f"parámetro '{pid}': fuente '{p['fuente']}' no existe en docs/fuentes.md")
    variantes = modelo.get("variantes")
    if not isinstance(variantes, list) or not variantes:
        errores.append("modelo.variantes debe ser una lista con al menos una variante")
        return errores
    conocidos = ids | ids_escenario | FUNCIONES
    for v in variantes:
        comps = v.get("componentes") if isinstance(v, dict) else None
        if not comps:
            errores.append(f"variante sin componentes: {v!r}")
            continue
        for c in comps:
            if not isinstance(c, dict) or not c.get("nombre") or not isinstance(c.get("formula"), str):
                errores.append(f"componente sin 'nombre' o 'formula': {c!r}")
                continue
            try:
                usadas = comprobar_formula(c["formula"])
            except ValueError as e:
                errores.append(f"componente '{c['nombre']}': fórmula inválida ({e}): {c['formula']}")
                continue
            for ident in usadas - conocidos:
                errores.append(f"componente '{c['nombre']}': identificador desconocido '{ident}' en la fórmula")
    return errores


def ids_numericos(tipo):
    """Ids de los parámetros de escenario con valor numérico en S, M y L (los que puede usar una fórmula)."""
    if tipo not in ESCENARIOS_MD:
        return set()
    ps = parametros(md.leer(ESCENARIOS_MD[tipo]))
    return {p["id"] for p in ps if set(p["valores"]) == {"S", "M", "L"}}


def tablas(texto):
    """Tablas de la sección '## 2.', cada una con el último '###' que la precede como título."""
    m = re.search(r"(?ms)^##\s+2\b.*?(?=^##\s|\Z)", texto)
    if not m:
        return []
    seccion = m[0]
    lineas = seccion.split("\n")
    out = []
    for cab, filas, inicio in md.tablas(seccion):
        titulo = next((l.lstrip("#").strip() for l in reversed(lineas[: inicio - 1]) if l.startswith("###")), "")
        cab = [c.replace("**", "") for c in cab]
        if len(set(cab)) != len(cab):
            md.aviso(f"la tabla «{titulo}» tiene columnas con el mismo nombre ({cab}); la última pisa a la anterior")
        out.append({"titulo": titulo, "filas": [dict(zip(cab, (c.replace("**", "") for c in f))) for f in filas]})
    return out


NOTA = re.compile(r"^\[\^([^\]]+)\]:\s*(.+)$")
URL = re.compile(r"https?://[^\s,;)>\]]+")
CONSULTADO = re.compile(r"consultado\s+(\d{4}-\d{2}-\d{2})", re.I)


def enlaces(texto):
    """Notas al pie '[^id]: Título, url, consultado fecha.' -> [{id, titulo, url, consultado}]; sin url se ignoran."""
    out = []
    for l in texto.splitlines():
        m = NOTA.match(l.strip())
        u = m and URL.search(m[2])
        if not u:
            continue
        titulo = m[2][: u.start()].strip().rstrip(",").strip()
        c = CONSULTADO.search(m[2])
        out.append({"id": m[1], "titulo": titulo or u[0], "url": u[0], "consultado": c[1] if c else ""})
    return out


def numero(t):
    return float(t.replace(".", "").replace(",", "."))


def cifra(texto, moneda):
    """'≈ 284 – 364 €' -> (284.0, 364.0, 'EUR'); '2.000 USD' -> (2000.0, 2000.0, 'USD').

    La moneda sale de la propia celda y, si no la lleva, de `moneda`. None si no es una cifra
    (N/D, texto libre, '≈ 182 USD + almacenamiento'...).
    """
    m = CIFRA.match(texto.strip())
    if not m:
        return None
    mn = numero(m[1])
    mx = numero(m[3]) if m[3] else mn
    sim = m[4] or m[2]
    return mn, mx, MONEDA.get(sim, moneda)


def moneda_tabla(titulo, defecto):
    """La moneda que indica el título de la tabla, p. ej. '2.2 TCO autoalojado (EUR)'; si no, `defecto`."""
    m = re.search(r"\((EUR|USD)\)", titulo)
    return m[1] if m else defecto


def totales(tablas_, moneda):
    """Total mensual por escenario: la primera tabla donde el total es una cifra; si no, la primera celda vista."""
    out = {}
    for t in tablas_:
        for fila in t["filas"]:
            esc = fila.get("Escenario", "")[:1]
            col = next((k for pat in COLUMNAS_TOTAL for k in fila if re.search(pat, k, re.I)), None)
            if not esc or esc not in "SML" or col is None:
                continue
            actual = out.get(esc)
            if actual and actual["min"] is not None:
                continue  # ya hay una cifra de una tabla anterior
            mon = moneda_tabla(t["titulo"], moneda)
            c = cifra(fila[col], mon)
            if c or actual is None:
                mn, mx, mon = c or (None, None, mon)
                out[esc] = {"min": mn, "max": mx, "moneda": mon, "origen": t["titulo"], "texto": fila[col]}
    return out


def construir():
    """{tipo: [ficha]} leyendo los .md; los errores quedan en md.ERRORES."""
    fuentes = set(cargar_fuentes())
    salida = {}
    for carpeta in sorted(p for p in ENTRADA.iterdir() if p.is_dir()):
        costes, vistos = [], set()
        for f in sorted(carpeta.glob("*.md")):
            rel = f.relative_to(RAIZ)
            texto = md.leer(f)
            try:
                d = md.front_matter(texto)
            except ValueError as e:
                d = {}
                md.aviso(f"{rel}: front matter ilegible ({e})")
            for c in CAMPOS:
                if d.get(c) is None:
                    md.aviso(f"{rel}: falta '{c}', se deja en blanco")
            t = tablas(texto)
            justificado = bool(d.get("sin_total"))  # front matter 'sin_total: motivo': la ficha no tiene total mensual a propósito
            if not t:
                if not justificado:
                    md.aviso(f"{rel}: sin tabla de cálculo en la sección 2 (si es a propósito, añade 'sin_total: motivo' al front matter)")
            elif not justificado and not any("Escenario" in fila for tb in t for fila in tb["filas"]):
                md.aviso(f"{rel}: ninguna tabla de la sección 2 tiene columna 'Escenario'; no se podrán extraer totales")
            ficha = {c: "" if d.get(c) is None else str(d[c]) for c in CAMPOS}
            if ficha["candidato"] and ficha["candidato"] != f.stem:
                md.aviso(f"{rel}: 'candidato' es {ficha['candidato']!r} y el fichero se llama {f.stem!r}")
            if ficha["candidato"] in vistos:
                md.error(f"{rel}: ficha de costes duplicada para el candidato {ficha['candidato']!r}")
                continue
            vistos.add(ficha["candidato"])
            tot = totales(t, ficha["moneda"])
            if t and not justificado and any("Escenario" in fila for tb in t for fila in tb["filas"]):
                for esc in "SML":
                    if esc not in tot:
                        md.aviso(f"{rel}: sin fila del escenario {esc} con una columna de total reconocida (columnas: 'TCO mensual', 'Coste mensual')")
            ficha |= {"tablas": t, "totales": tot, "enlaces": enlaces(texto)}
            if "modelo" in d:
                errores = validar_modelo(d["modelo"], ids_numericos(carpeta.name), fuentes)
                for e in errores:
                    md.aviso(f"{rel}: modelo: {e}")
                if not errores:
                    ficha["modelo"] = d["modelo"]
            costes.append(ficha)
        salida[carpeta.name] = costes
    for area in ("datos", "martech"):
        salida.setdefault(area, [])
    return salida


def main():
    ap = argparse.ArgumentParser(description="Genera costes_<tipo>.json")
    ap.add_argument("--estricto", action="store_true", help="los avisos también hacen fallar")
    ap.add_argument("--salida", type=Path, default=SALIDA, help="directorio de salida (por defecto app/awsome-app/public)")
    a = ap.parse_args()
    md.reiniciar()
    salida = construir()
    if not md.ERRORES:
        for tipo, costes in salida.items():
            destino = a.salida / f"costes_{tipo}.json"
            md.escribir_json(destino, costes)
            print(f"{destino}: {len(costes)} candidatos")
    md.terminar(a.estricto, "costes")


if __name__ == "__main__":
    main()
