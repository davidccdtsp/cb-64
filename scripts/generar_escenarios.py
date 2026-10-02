#!/usr/bin/env python3
"""Genera app/awsome-app/public/escenarios.json a partir de docs/costes/escenarios.md (datos) y
docs/costes/escenarios-martech.md (martech).

Lee la tabla 'Id | Parámetro | S | M | L' de cada fichero. Por parámetro:
  { id, nombre, unidad, valores: {S, M, L}, textos: {S, M, L} }
'valores' solo tiene los escenarios cuya celda es numérica ('1 TB' -> 1, '2 millones' -> 2000000,
'1.000 millones' -> 1000000000, '10 %' -> 10); 'textos' conserva la celda original. 'unidad' es lo que sigue
al número en el primer escenario con valor numérico ('TB', '%', 'h', 'días'...; vacío si no hay).

Uso: python3 scripts/generar_escenarios.py [--estricto] [--salida DIR]
"""
import argparse
import re
from pathlib import Path

import md

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = {"datos": RAIZ / "docs/costes/escenarios.md", "martech": RAIZ / "docs/costes/escenarios-martech.md"}
SALIDA = RAIZ / "app/awsome-app/public"
ESCENARIOS = ("S", "M", "L")
CELDA = re.compile(r"^(\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?)\s*(millones|millón)?\s*([^\d(]*?)\s*(?:\(.*\))?$")
IDENTIFICADOR = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


def celda(texto):
    """'0,05 TB (50 GB)' -> (0.05, 'TB'); '2 millones' -> (2000000.0, ''); texto no numérico -> (None, '').

    Una celda que empieza por un dígito pero no se entiende ('2M', '0.05 TB'...) da aviso: quedaría como texto.
    """
    m = CELDA.match(texto.strip())
    if not m:
        if re.match(r"^\d", texto.strip()):
            md.aviso(f"celda '{texto}': parece un número pero no está en formato español (punto de miles, coma decimal, 'millones'); se guarda solo como texto")
        return None, ""
    if m[3].strip() in ("M", "K", "k"):
        md.aviso(f"celda '{texto}': '{m[3].strip()}' es ambiguo como multiplicador; escribe 'millones' o el número completo (se guarda como unidad)")
    valor = md.numero_es(m[1])
    if m[2]:
        valor *= 1_000_000
    return valor, m[3].strip()


def parametros(texto):
    """Filas de la primera tabla 'Id | Parámetro | S | M | L' del texto. @raises ValueError si no hay."""
    tabla = next((t for t in md.tablas(texto) if t[0][:2] == ["Id", "Parámetro"]), None)
    if tabla is None:
        raise ValueError("no se encuentra la tabla 'Id | Parámetro | S | M | L'")
    cab, filas, _ = tabla
    if [c[:1] for c in cab[2:]] != list(ESCENARIOS):
        md.aviso(f"la cabecera debería ser 'Id | Parámetro | S | M | L' (admite 'S — Pequeño'...) y es {cab}")
    out, vistos = [], set()
    for f in filas:
        if len(f) != 5:
            raise ValueError(f"fila mal formada (se esperan 5 columnas): {f}")
        id_ = f[0].strip("`")
        if not IDENTIFICADOR.match(id_):
            md.aviso(f"parámetro '{id_}': el id debe ser un identificador (letras, dígitos y '_'); no se podrá usar en fórmulas")
        if id_ in vistos:
            md.error(f"parámetro '{id_}' duplicado")
            continue
        vistos.add(id_)
        celdas = dict(zip(ESCENARIOS, (celda(c) for c in f[2:])))
        unidad = next((u for v, u in celdas.values() if v is not None), "")
        out.append({
            "id": id_,
            "nombre": f[1],
            "unidad": unidad,
            "valores": {e: v for e, (v, _) in celdas.items() if v is not None},
            "textos": dict(zip(ESCENARIOS, f[2:])),
        })
    return out


def construir():
    """{tipo: {parametros}} leyendo los .md; los errores quedan en md.ERRORES."""
    salida = {}
    for tipo, fichero in ENTRADA.items():
        try:
            salida[tipo] = {"parametros": parametros(md.leer(fichero))}
        except (ValueError, OSError) as e:
            md.error(f"{fichero.relative_to(RAIZ)}: {e}")
            salida[tipo] = {"parametros": []}
    return salida


def main():
    ap = argparse.ArgumentParser(description="Genera escenarios.json")
    ap.add_argument("--estricto", action="store_true", help="los avisos también hacen fallar")
    ap.add_argument("--salida", type=Path, default=SALIDA, help="directorio de salida (por defecto app/awsome-app/public)")
    a = ap.parse_args()
    md.reiniciar()
    salida = construir()
    if not md.ERRORES:
        md.escribir_json(a.salida / "escenarios.json", salida)
        print(f"{a.salida / 'escenarios.json'}: " + ", ".join(f"{t} {len(v['parametros'])} parámetros" for t, v in salida.items()))
    md.terminar(a.estricto, "escenarios")


if __name__ == "__main__":
    main()
