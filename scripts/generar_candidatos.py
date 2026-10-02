#!/usr/bin/env python3
"""Genera app/awsome-app/public/candidatos.json a partir de docs/candidatos/<tipo>/*.md.

Solo se lee el front matter (el bloque entre el '---' de la línea 1 y el siguiente); el resto del fichero se ignora.
Cada puntuación se normaliza a {id, nota, valor, texto, confianza, fuentes}:
  confianza -> texto
  fuentes   -> [{id, url}], la url se busca por id en docs/fuentes.md
  nota  -> número (null si no hay o no es numérica)
  valor -> booleano si es sí/no (en cualquier variante de mayúsculas o acentos), si no null
  texto -> el valor cuando es un texto distinto de sí/no, si no null

Uso: python3 scripts/generar_candidatos.py [--estricto] [--salida DIR]
"""
import argparse
import json
import re
from datetime import date, datetime
from pathlib import Path

import md

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "docs/candidatos"
SALIDA = RAIZ / "app/awsome-app/public"
FUENTES = RAIZ / "docs/fuentes.md"
front_matter = md.front_matter  # compatibilidad: lo importan otros scripts
si_no = md.si_no


def numero(v):
    if isinstance(v, bool):
        return None
    if isinstance(v, (int, float)):
        return v
    try:
        return float(v) if "." in str(v) else int(v)
    except ValueError:
        return None


def cargar_fuentes():
    filas = (md.FILA_FUENTE.match(l) for l in md.leer(FUENTES).splitlines())
    return {m[1]: m[2] for m in filas if m}


def puntuacion(id_, p, urls, origen):
    nota, valor, conf = p.get("nota"), p.get("valor"), p.get("confianza")
    fuentes = []
    for f in p.get("fuentes") or []:
        if f not in urls:
            md.aviso(f"{origen}: {id_}: fuente '{f}' no está en docs/fuentes.md, url null")
        fuentes.append({"id": f, "url": urls.get(f)})
    out = {"id": id_, "nota": None, "valor": None, "texto": None,
           "confianza": None if conf is None else str(conf), "fuentes": fuentes}
    if nota is not None:
        out["nota"] = numero(nota)
    if isinstance(valor, bool):  # YAML sin comillas convierte yes/no en bool
        out["valor"] = valor
    elif valor is not None:
        b = si_no(valor)
        if b is None:
            out["texto"] = str(valor)
        else:
            out["valor"] = b
    return out


def fecha_iso(v):
    """datetime.date o 'AAAA-MM-DD' -> 'AAAA-MM-DD'; None si no es una fecha ISO válida."""
    if isinstance(v, datetime):
        return v.date().isoformat()
    if isinstance(v, date):
        return v.isoformat()
    if isinstance(v, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", v.strip()):
        try:
            return date.fromisoformat(v.strip()).isoformat()
        except ValueError:
            return None
    return None


def candidato(f, carpeta, urls):
    """Ficha -> dict normalizado para el JSON, o None (con error) si no se puede usar."""
    rel = str(f.relative_to(RAIZ))
    try:
        d = md.front_matter(md.leer(f))
    except ValueError as e:
        md.error(f"{rel}: front matter ilegible ({e}), ficha omitida")
        return None
    if not d.get("id") or not isinstance(d["id"], str):
        md.error(f"{rel}: falta 'id' (texto), ficha omitida")
        return None
    if d["id"] != f.stem:
        md.aviso(f"{rel}: 'id' es {d['id']!r} y el fichero se llama {f.stem!r}")
    if d.get("dominio") != carpeta:
        md.aviso(f"{rel}: 'dominio' es {d.get('dominio')!r} y la ficha está en la carpeta {carpeta!r}")
        d["dominio"] = carpeta  # la app clasifica por dominio: manda la carpeta
    fecha = fecha_iso(d.get("fecha_revision"))
    if fecha is None:
        md.error(f"{rel}: 'fecha_revision' no es una fecha AAAA-MM-DD ({d.get('fecha_revision')!r}), ficha omitida")
        return None
    d["fecha_revision"] = fecha
    desp = d.get("despliegue")
    if isinstance(desp, str):
        desp = [desp]
    if not isinstance(desp, list):
        md.aviso(f"{rel}: 'despliegue' debe ser una lista; se deja vacía")
        desp = []
    d["despliegue"] = [str(x) for x in desp]
    punt = d.get("puntuaciones")
    if punt is not None and not isinstance(punt, dict):
        md.aviso(f"{rel}: 'puntuaciones' debe ser un mapa id -> puntuación, no {type(punt).__name__}; se ignora")
        punt = None
    for k, p in (punt or {}).items():
        if not isinstance(p, dict):
            md.aviso(f"{rel}: la puntuación {k} no es un mapa, ignorada")
        elif p.get("nota") is not None and numero(p["nota"]) is None:
            md.aviso(f"{rel}: {k} tiene nota no numérica ({p['nota']!r}), se guarda null")
    d["puntuaciones"] = [puntuacion(k, p, urls, rel) for k, p in (punt or {}).items() if isinstance(p, dict)]
    return d


def construir():
    """{tipo: [candidato]} leyendo los .md; los errores quedan en md.ERRORES."""
    urls = cargar_fuentes()
    salida = {}
    for carpeta in sorted(p for p in ENTRADA.iterdir() if p.is_dir()):
        candidatos, ids = [], set()
        for f in sorted(carpeta.glob("*.md")):
            d = candidato(f, carpeta.name, urls)
            if d is None:
                continue
            if d["id"] in ids:
                md.error(f"{f.relative_to(RAIZ)}: 'id' {d['id']!r} duplicado en {carpeta.name}, ficha omitida")
                continue
            ids.add(d["id"])
            candidatos.append(d)
        salida[carpeta.name] = candidatos
    for area in ("datos", "martech"):
        salida.setdefault(area, [])  # la app espera las dos áreas
    return salida


def main():
    ap = argparse.ArgumentParser(description="Genera candidatos.json")
    ap.add_argument("--estricto", action="store_true", help="los avisos también hacen fallar")
    ap.add_argument("--salida", type=Path, default=SALIDA, help="directorio de salida (por defecto app/awsome-app/public)")
    a = ap.parse_args()
    md.reiniciar()
    salida = construir()
    if not md.ERRORES:
        md.escribir_json(a.salida / "candidatos.json", salida, default=str)
        print(f"{a.salida / 'candidatos.json'}: " + ", ".join(f"{t} {len(c)} candidatos" for t, c in salida.items()))
    md.terminar(a.estricto, "candidatos")


if __name__ == "__main__":
    main()
