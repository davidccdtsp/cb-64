#!/usr/bin/env python3
"""Valida los .md de docs/ de los que salen los JSON de la app.

Paso 1: docs/fuentes.md (ids duplicados y enlaces rotos) y construcción del set de ids.
Paso 2: cada candidato (campos obligatorios, fuentes de cada puntuación que deben existir en el set,
        y ficha de costes docs/costes/precios/<tipo>/<id>.md con 'candidato' igual al id).
Paso 3: estructura de rúbricas, escenarios, candidatos y costes (los mismos análisis que hacen los generadores)
        y coherencia entre ficheros (ver validar_estructura.py).

Cada hallazgo es un ERROR o un AVISO. Los errores siempre hacen fallar (código de salida 1). Los avisos (enlaces que
no se pueden comprobar —bloqueos anti-bot, timeouts— y datos opcionales raros) se muestran por terminal y solo hacen
fallar con --estricto.

Uso: validar_candidatos.py [--estricto] [--json SALIDA.json] [--sin-red] [--sin-estructura] [FICHERO_O_DIR ...]
Sin argumentos valida docs/candidatos.
"""
import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlsplit

import yaml  # pip install pyyaml

import md
import validar_estructura

THREADS = 16
PAUSA_HOST = 1.0  # segundos entre peticiones al mismo servidor
REINTENTOS_429 = 3

OBLIGATORIOS = ["id", "nombre", "dominio", "categoria", "tipo", "licencia", "fecha_revision"]
FUENTES = Path("docs/fuentes.md")
COSTES = Path("docs/costes/precios")
FILA = md.FILA_FUENTE
# Estados que indican bloqueo anti-bot, acceso restringido o un fallo pasajero del servidor, no enlace roto
NO_CONCLUYENTE = {401, 403, 408, 429, 502, 503, 504}
REINTENTOS_5XX = 2  # 502/503/504/408: se repite la petición (con espera) antes de dar el aviso
# Cabeceras de un navegador real: con solo User-Agent muchas webs (Adobe, Salesforce, OSI, SEC) responden
# 403, 500 o no responden; con el resto de cabeceras que envía Chrome contestan igual que en el navegador.
UA = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
}


class Redirige308(urllib.request.HTTPRedirectHandler):
    # Python < 3.11 no sigue 308; es equivalente a 307
    http_error_308 = urllib.request.HTTPRedirectHandler.http_error_302

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return super().redirect_request(req, fp, 307 if code == 308 else code, msg, headers, newurl)


ABRIR = urllib.request.build_opener(Redirige308).open



def comprobar_url(url):
    """None si responde bien; mensaje si está roto; 'AVISO: ...' si no es concluyente."""
    print(f"Comprobando {url}")
    url = url.split("#")[0]  # el fragmento no viaja al servidor
    estado = None
    metodos = ["HEAD", "GET"]  # algunos servidores rechazan HEAD
    reintentos = 0
    reintentos_5xx = 0
    while metodos:
        metodo = metodos.pop(0)
        try:
            req = urllib.request.Request(url, method=metodo, headers=UA)
            with ABRIR(req, timeout=30):
                return None
        except urllib.error.HTTPError as e:
            estado = e.code
            if e.code == 429 and reintentos < REINTENTOS_429:
                reintentos += 1
                espera = e.headers.get("Retry-After", "")
                time.sleep(min(int(espera) if espera.isdigit() else 5 * reintentos, 30))
                metodos.insert(0, metodo)  # repite el mismo método
            elif e.code in (408, 502, 503, 504) and reintentos_5xx < REINTENTOS_5XX:
                reintentos_5xx += 1
                time.sleep(3 * reintentos_5xx)
                metodos.insert(0, metodo)
            elif metodo == "HEAD":
                continue  # cualquier error con HEAD: prueba con GET (algunos servidores responden 500 a HEAD)
            else:
                break
        except Exception as e:  # DNS, timeout, TLS...
            motivo = f"no accesible ({type(e).__name__}: {e})"
            # timeouts y fallos TLS suelen ser anti-bot; un fallo DNS sí es enlace roto
            return "AVISO: " + motivo if "timed out" in motivo or "_ssl" in motivo else motivo
    if estado in NO_CONCLUYENTE:
        return f"AVISO: HTTP {estado} (posible bloqueo o fallo pasajero del servidor, revisar a mano)"
    return f"HTTP {estado}"


class Informe:
    """Hallazgos de la validación: ERROR (siempre falla) y AVISO (solo falla con --estricto). Se imprimen al momento."""

    def __init__(self):
        self.errores = 0
        self.avisos = 0

    def error(self, msg):
        self.errores += 1
        print(f"ERROR {msg}")

    def aviso(self, msg):
        self.avisos += 1
        print(f"AVISO {msg}")


def validar_fuentes(comprobar_red, informe):
    """Paso 1. Devuelve el set de ids de fuentes."""
    ids, filas = set(), []
    for n, l in enumerate(md.leer(FUENTES).splitlines(), 1):
        m = FILA.match(l)
        if not m:
            continue
        if m[1] in ids:
            informe.error(f"{FUENTES}:{n}: id de fuente duplicado '{m[1]}'")
        ids.add(m[1])
        filas.append((n, m[1], m[2]))
    if comprobar_red:
        # en paralelo entre servidores distintos, en serie y con pausa dentro de cada uno
        por_host = {}
        for f in filas:
            por_host.setdefault(urlsplit(f[2]).netloc, []).append(f)

        def revisar_host(grupo):
            out = []
            for f in grupo:
                out.append((f, comprobar_url(f[2])))
                time.sleep(PAUSA_HOST)
            return out

        with ThreadPoolExecutor(THREADS) as ex:
            res = [x for g in ex.map(revisar_host, por_host.values()) for x in g]
        res.sort(key=lambda x: x[0][0])
        for (n, i, url), r in res:
            if r and r.startswith("AVISO"):
                informe.aviso(f"{FUENTES}:{n}: fuente '{i}' enlace no comprobable: {r[7:]} -> {url}")
            elif r:
                informe.error(f"{FUENTES}:{n}: fuente '{i}' enlace roto: {r} -> {url}")
    print(f"{FUENTES}: {len(ids)} fuentes", file=sys.stderr)
    return ids


def vacio(v):
    return v is None or (isinstance(v, (str, list, dict)) and len(v) == 0)


def parser(path):
    """Parsea solo el bloque entre el primer par de '---'. Devuelve (datos, líneas del bloque)."""
    lineas = md.leer(path).splitlines()
    if not lineas or lineas[0].strip() != "---":
        raise ValueError("no empieza con '---'")
    for i, l in enumerate(lineas[1:], 1):
        if l.strip() == "---":
            try:
                datos = yaml.safe_load("\n".join(lineas[1:i]))
            except ValueError as e:  # fechas imposibles como 2026-13-30
                raise ValueError(f"YAML ilegible: {e}")
            if not isinstance(datos, dict):
                raise ValueError("front matter no es un mapa")
            return datos, lineas[1:i]
    raise ValueError("falta '---' de cierre")


def linea(bloque, clave):
    """Nº de línea (del fichero) de la primera clave con ese nombre; 1 si no existe."""
    for n, l in enumerate(bloque, 2):
        if l.strip().startswith(clave + ":"):
            return n
    return 1


def validar_coste(d, fichero):
    """El candidato <tipo>/<id>.md debe tener docs/costes/precios/<tipo>/<id>.md con 'candidato: <id>'."""
    id_ = d.get("id") or fichero.stem
    coste = COSTES / fichero.parent.name / f"{id_}.md"
    if not coste.exists():
        return [(1, f"sin ficha de costes: falta {coste}")]
    try:
        candidato = parser(coste)[0].get("candidato")
    except (ValueError, yaml.YAMLError) as e:
        return [(1, f"{coste}: front matter ilegible: {e}")]
    if candidato != id_:
        return [(1, f"{coste}: 'candidato' es {candidato!r}, debería ser '{id_}'")]
    return []


def validar(d, bloque, ids):
    """Devuelve lista de (línea, mensaje)."""
    errs = []
    for c in OBLIGATORIOS:
        if c not in d:
            errs.append((1, f"campo '{c}' ausente"))
        elif vacio(d[c]):
            errs.append((linea(bloque, c), f"campo '{c}' vacío (valor: {d[c]!r})"))
    desp = d.get("despliegue")
    if not isinstance(desp, list) or not desp:
        errs.append((linea(bloque, "despliegue"), f"campo 'despliegue' debe ser una lista con al menos un elemento (valor: {desp!r})"))
    punt = d.get("puntuaciones")
    if punt is not None and not isinstance(punt, dict):
        errs.append((linea(bloque, "puntuaciones"), "'puntuaciones' debe ser un mapa id -> puntuación (no una lista ni un texto)"))
        punt = {}
    for k, p in (punt or {}).items():
        if not isinstance(p, dict):
            errs.append((linea(bloque, k), f"puntuación '{k}' no es un mapa (valor: {p!r})"))
        elif not vacio(p.get("nota")) and vacio(p.get("fuentes")):
            errs.append((linea(bloque, k), f"puntuación '{k}' tiene nota={p['nota']!r} pero 'fuentes' está vacío"))
        for f in p.get("fuentes") or [] if isinstance(p, dict) else []:
            if f not in ids:
                errs.append((linea(bloque, k), f"puntuación '{k}': fuente '{f}' no existe en {FUENTES}"))
    return errs


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("rutas", nargs="*", default=["docs/candidatos"])
    ap.add_argument("--json", metavar="SALIDA", help="vuelca los candidatos válidos a JSON")
    ap.add_argument("--sin-red", action="store_true", help="no comprueba los enlaces de fuentes.md")
    ap.add_argument("--sin-estructura", action="store_true", help="omite el paso 3 (estructura de rúbricas, escenarios, candidatos y costes)")
    ap.add_argument("--estricto", action="store_true", help="los avisos (enlaces no comprobables, datos opcionales raros) también hacen fallar")
    a = ap.parse_args()

    informe = Informe()
    ids = validar_fuentes(not a.sin_red, informe)

    ficheros = []
    for r in map(Path, a.rutas):
        ficheros += sorted(r.rglob("*.md")) if r.is_dir() else [r]

    validos = []
    for f in ficheros:
        try:
            d, bloque = parser(f)
            errs = validar(d, bloque, ids) + validar_coste(d, f)
        except (ValueError, yaml.YAMLError) as e:
            errs = [(1, f"parseo ilegible: {e}")]
        for n, msg in errs:
            informe.error(f"{f}:{n}: {msg}")
        if not errs:
            validos.append(d)

    if not a.sin_estructura:
        validar_estructura.comprobar(informe)

    if a.json:
        Path(a.json).write_text(json.dumps(validos, ensure_ascii=False, indent=2, default=str), encoding="utf-8")
    modo = "estricto" if a.estricto else "no estricto"
    print(f"{len(ficheros)} candidatos, {informe.errores} errores, {informe.avisos} avisos ({modo}: "
          + ("los avisos también fallan" if a.estricto else "los avisos solo se muestran") + ")", file=sys.stderr)
    sys.exit(1 if informe.errores or (a.estricto and informe.avisos) else 0)


if __name__ == "__main__":
    main()
