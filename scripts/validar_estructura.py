"""Paso 3 del validador: estructura de rúbricas, escenarios, candidatos y costes, y coherencia entre ficheros.

Ejecuta los mismos análisis que los generadores (`construir()` de cada uno, sin escribir nada) y recoge sus errores
y avisos; después comprueba lo que solo se ve cruzando ficheros: categorías y criterios de las fichas frente a la rúbrica,
notas dentro de la escala y fichas de costes sin candidato.
"""
import md
import generar_candidatos
import generar_costes
import generar_escenarios
import generar_json


def _correr(nombre, construir):
    md.reiniciar()
    datos = construir()
    errores, avisos = list(md.ERRORES), list(md.AVISOS)
    md.reiniciar()
    return datos, [f"{nombre}: {e}" for e in errores], [f"{nombre}: {a}" for a in avisos]


def coherencia(rubrica, candidatos, costes):
    """Hallazgos (errores, avisos) que dependen de varios ficheros."""
    errores, avisos = [], []
    for area, fichas in candidatos.items():
        r = rubrica.get(area, {"categorias": [], "dimensiones": []})
        categorias = {c["id"] for c in r["categorias"]}
        criterios = {v["id"]: v for d in r["dimensiones"] for v in d["valores"]}
        for c in fichas:
            if categorias and c.get("categoria") not in categorias:
                errores.append(f"candidato {c['id']}: categoría {c.get('categoria')!r} no existe en la rúbrica de {area}")
            vistos = set()
            for p in c["puntuaciones"]:
                crit = criterios.get(p["id"])
                if crit is None:
                    errores.append(f"candidato {c['id']}: la puntuación {p['id']} no es un criterio de la rúbrica de {area}")
                    continue
                vistos.add(p["id"])
                if p["nota"] is not None:
                    niveles = [n["valor"] for n in crit.get("escala", {}).get("niveles", [])]
                    if crit["tipo"] != "puntuable":
                        avisos.append(f"candidato {c['id']}: {p['id']} es {crit['tipo']} y tiene nota")
                    elif niveles and not (min(niveles) <= p["nota"] <= max(niveles)):
                        errores.append(f"candidato {c['id']}: {p['id']} tiene nota {p['nota']} fuera de la escala {min(niveles)}-{max(niveles)}")
            faltan = [i for i in criterios if i not in vistos]
            if faltan:
                avisos.append(f"candidato {c['id']}: sin puntuación para {len(faltan)} criterios de la rúbrica ({', '.join(faltan[:4])}{'…' if len(faltan) > 4 else ''})")
        ids = {c["id"] for c in fichas}
        for f in costes.get(area, []):
            if f["candidato"] and f["candidato"] not in ids:
                errores.append(f"costes: la ficha de costes de {f['candidato']!r} no tiene candidato en {area}")
    return errores, avisos


def comprobar(informe):
    """Imprime en `informe` los errores y avisos de la estructura de los .md."""
    rubrica, e1, a1 = _correr("rúbricas", generar_json.construir)
    _, e2, a2 = _correr("escenarios", generar_escenarios.construir)
    candidatos, e3, a3 = _correr("candidatos", generar_candidatos.construir)
    costes, e4, a4 = _correr("costes", generar_costes.construir)
    e5, a5 = coherencia(rubrica, candidatos, costes)
    for e in e1 + e2 + e3 + e4 + e5:
        informe.error(e)
    for a in a1 + a2 + a3 + a4 + a5:
        informe.aviso(a)
