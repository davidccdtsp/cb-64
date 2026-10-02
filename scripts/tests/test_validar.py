#!/usr/bin/env python3
"""Mutaciones sobre una copia de docs/ y scripts/: cada defecto típico en un .md debe detectarse (ERROR o AVISO) y los
generadores deben seguir produciendo JSON válido o no escribir nada. Uso: python3 scripts/tests/test_validar.py"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

RAIZ = Path(__file__).resolve().parent.parent.parent


def copia():
    t = Path(tempfile.mkdtemp())
    shutil.copytree(RAIZ / "docs", t / "docs")
    shutil.copytree(RAIZ / "scripts", t / "scripts", ignore=shutil.ignore_patterns("__pycache__"))
    (t / "app/awsome-app/public").mkdir(parents=True)
    return t


def validar(t, *args):
    r = subprocess.run([sys.executable, "scripts/validar_candidatos.py", "--sin-red", *args], cwd=t, capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr


def cambiar(t, ruta, antes, despues, veces=1):
    p = t / ruta
    s = p.read_text(encoding="utf-8")
    assert antes in s, f"{ruta}: no contiene {antes!r}"
    p.write_text(s.replace(antes, despues, veces), encoding="utf-8")


# (descripción, ruta, antes, después, texto esperado, nivel esperado)
CASOS = [
    ("bloque VALOR sin cerrar", "docs/rubricas/datos.md", "<!-- /VALOR -->", "<!-- /VALORES -->", "sin cerrar", "AVISO*"),
    ("criterio duplicado", "docs/rubricas/datos.md", "### DP-ARQ-02", "### DP-ARQ-01", "duplicado", "AVISO*"),
    ("peso no entero", "docs/rubricas/datos.md", "**Peso:** 3", "**Peso:** 2,5", "'Peso' debe ser un entero", "AVISO"),
    ("id con dos puntos", "docs/rubricas/datos.md", "### DP-ARQ-03 —", "### DP-ARQ-03: ", "", "OK"),  # se tolera
    ("dominio distinto de la carpeta", "docs/candidatos/datos/bigquery.md", "dominio: datos", "dominio: data", "'dominio'", "AVISO"),
    ("fecha imposible", "docs/candidatos/datos/bigquery.md", "fecha_revision: 2026-", "fecha_revision: 2026-13-", "fecha_revision", "ERROR"),
    ("puntuaciones como lista", "docs/candidatos/datos/bigquery.md", "puntuaciones:\n", "puntuaciones: []\n_viejas:\n", "debe ser un mapa", "ERROR"),
    ("nota fuera de escala", "docs/candidatos/datos/bigquery.md", "DP-ARQ-01: { nota: ", "DP-ARQ-01: { nota: 9", "fuera de la escala", "ERROR"),
    ("categoría desconocida", "docs/candidatos/datos/bigquery.md", "categoria: cloud-dwh", "categoria: inventada", "categoría", "ERROR"),
    ("criterio que no existe", "docs/candidatos/datos/bigquery.md", "DP-ARQ-01: {", "DP-XXX-99: {", "no es un criterio", "ERROR"),
    ("fórmula con coma decimal", "docs/costes/precios/datos/bigquery.md", "tb_almacenados * 1000 * precio_gb_mes", "tb_almacenados * 1000 * 2,5", "fórmula inválida", "AVISO"),
    ("magnitud 2M en escenarios", "docs/costes/escenarios-martech.md", "2 millones", "2M", "ambiguo", "AVISO"),
    ("ficha de costes sin candidato", "", "", "", "no tiene candidato", "ERROR"),
]


def main():
    fallos = 0
    for desc, ruta, antes, despues, esperado, nivel in CASOS:
        t = copia()
        try:
            if ruta:
                cambiar(t, ruta, antes, despues)
            else:  # ficha de costes huérfana
                src = (t / "docs/costes/precios/datos/bigquery.md").read_text(encoding="utf-8").replace("candidato: bigquery", "candidato: huerfano")
                (t / "docs/costes/precios/datos/huerfano.md").write_text(src, encoding="utf-8")
            code, out = validar(t)
            if nivel == "OK":
                ok = code == 0 and "AVISO" not in out and "ERROR" not in out
            else:
                solo = nivel.rstrip("*")  # 'AVISO*': el defecto puede provocar además errores en cascada
                lineas = [l for l in out.splitlines() if l.startswith(solo) and esperado in l]
                ok = bool(lineas) and (code == 1 if solo == "ERROR" else (code == 0 or nivel.endswith("*")))
                if ok and nivel == "AVISO":
                    ok = validar(t, "--estricto")[0] == 1  # en modo estricto el aviso hace fallar
            print(("ok   " if ok else "FALLA"), desc)
            if not ok:
                fallos += 1
                print(out[-600:])
        finally:
            shutil.rmtree(t)

    # BOM + CRLF no cambian el resultado
    t = copia()
    try:
        subprocess.run([sys.executable, "scripts/generar_json.py", "--salida", "a"], cwd=t, check=True, capture_output=True)
        p = t / "docs/rubricas/datos.md"
        p.write_bytes(b"\xef\xbb\xbf" + p.read_text(encoding="utf-8").replace("\n", "\r\n").encode("utf-8"))
        subprocess.run([sys.executable, "scripts/generar_json.py", "--salida", "b"], cwd=t, check=True, capture_output=True)
        ok = json.loads((t / "a/rubrica.json").read_text()) == json.loads((t / "b/rubrica.json").read_text())
        print(("ok   " if ok else "FALLA"), "BOM y CRLF no cambian el JSON")
        fallos += not ok
    finally:
        shutil.rmtree(t)

    # un error estructural no escribe el JSON
    t = copia()
    try:
        cambiar(t, "docs/candidatos/datos/bigquery.md", "fecha_revision: 2026-", "fecha_revision: 2026-13-")
        r = subprocess.run([sys.executable, "scripts/generar_candidatos.py", "--salida", "c"], cwd=t, capture_output=True, text=True)
        ok = r.returncode == 1 and not (t / "c/candidatos.json").exists()
        print(("ok   " if ok else "FALLA"), "un error no escribe el JSON y sale con código 1")
        fallos += not ok
    finally:
        shutil.rmtree(t)
    sys.exit(1 if fallos else 0)


if __name__ == "__main__":
    main()
