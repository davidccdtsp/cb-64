"""Utilidades comunes de los scripts que leen los .md de docs/: lectura, tablas, números, sí/no y avisos.

Contrato de errores de los generadores:
  - aviso(): el dato opcional falta o es raro; el JSON se genera igual (con valor por defecto o sin ese elemento).
  - error(): el dato estructural es imposible (id inválido, YAML ilegible...); el elemento se omite y el script
    termina con código 1 sin escribir el JSON, para no publicar uno incompleto (el anterior sigue siendo válido).
  - con --estricto, los avisos también hacen fallar.
"""
import re
import sys
import unicodedata
from pathlib import Path

import yaml  # pip install pyyaml

# fila de docs/fuentes.md: '| `id` | ... | https://url ...' -> (id, url)
FILA_FUENTE = re.compile(r"^\| `([^`]+)` \|.*?(https?://[^\s|]+)")

AVISOS = []
ERRORES = []


def reiniciar():
    AVISOS.clear()
    ERRORES.clear()


def aviso(msg):
    AVISOS.append(msg)
    print(f"aviso: {msg}", file=sys.stderr)


def error(msg):
    ERRORES.append(msg)
    print(f"error: {msg}", file=sys.stderr)


def terminar(estricto, nombre):
    """Resumen y código de salida: 1 si hay errores o, en modo estricto, avisos."""
    print(f"{nombre}: {len(ERRORES)} errores, {len(AVISOS)} avisos", file=sys.stderr)
    if ERRORES or (estricto and AVISOS):
        sys.exit(1)


def leer(path):
    """Texto del fichero sin BOM y con saltos de línea \\n."""
    return Path(path).read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n")


def escribir_json(destino, datos, **kw):
    import json

    Path(destino).parent.mkdir(parents=True, exist_ok=True)
    Path(destino).write_text(json.dumps(datos, ensure_ascii=False, indent=2, **kw) + "\n", encoding="utf-8")


# --- front matter ---

def front_matter(texto):
    """Mapa YAML del bloque entre el '---' de la línea 1 y el siguiente '---'.

    @raises ValueError si no empieza por '---', no se cierra, no es un mapa o el YAML es ilegible.
    """
    lineas = texto.lstrip("﻿").replace("\r\n", "\n").split("\n")
    if not lineas or lineas[0].strip() != "---":
        raise ValueError("no empieza con '---'")
    for i, l in enumerate(lineas[1:], 1):
        if l.strip() == "---":
            try:
                datos = yaml.safe_load("\n".join(lineas[1:i]))
            except (yaml.YAMLError, ValueError) as e:  # ValueError: fechas imposibles como 2026-13-30
                raise ValueError(f"YAML ilegible: {e}")
            if not isinstance(datos, dict):
                raise ValueError("el front matter no es un mapa")
            return datos
    raise ValueError("falta el '---' de cierre")


# --- tablas ---

SEPARADOR = re.compile(r"^\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?$")


def celdas(linea):
    """Celdas de una fila '| a | b |'; respeta '\\|' (barra escapada dentro de la celda)."""
    s = linea.strip()
    s = s[1:] if s.startswith("|") else s
    s = s[:-1] if s.endswith("|") and not s.endswith("\\|") else s
    return [c.strip().replace("\\|", "|") for c in re.split(r"(?<!\\)\|", s)]


def tablas(texto):
    """Todas las tablas del texto como (cabecera, filas, nº de línea de la cabecera).

    Una tabla es un grupo de líneas '|' consecutivas cuya segunda línea es el separador '|---|---|'.
    Los grupos sin separador no son tablas (se ignoran). Una fila con distinto nº de columnas que la
    cabecera se rellena o se recorta a ese nº, con aviso.
    """
    out, grupo, inicio = [], [], 0
    lineas = texto.split("\n") + [""]
    for n, l in enumerate(lineas, 1):
        if l.strip().startswith("|"):
            if not grupo:
                inicio = n
            grupo.append(l)
            continue
        if len(grupo) >= 2 and SEPARADOR.match(grupo[1].strip()):
            cab = celdas(grupo[0])
            filas = []
            for k, f in enumerate(grupo[2:], inicio + 2):
                c = celdas(f)
                if len(c) != len(cab):
                    aviso(f"línea {k}: la fila tiene {len(c)} columnas y la cabecera {len(cab)}")
                    c = (c + [""] * len(cab))[: len(cab)]
                filas.append(c)
            out.append((cab, filas, inicio))
        grupo = []
    return out


# --- valores ---

def si_no(v):
    """True/False si v es sí/no (sin distinguir mayúsculas ni acentos, ignorando '.', '*' y espacios); None si no."""
    s = unicodedata.normalize("NFD", str(v)).encode("ascii", "ignore").decode().strip().strip(".*,; ").lower()
    return {"si": True, "no": False}.get(s)


NUMERO_ES = re.compile(r"^(\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?)$")


def numero_es(texto):
    """'1.234,5' -> 1234.5; '0,05' -> 0.05; None si no es un número en formato español (punto de miles, coma decimal)."""
    m = NUMERO_ES.match(texto.strip())
    return float(m[1].replace(".", "").replace(",", ".")) if m else None
