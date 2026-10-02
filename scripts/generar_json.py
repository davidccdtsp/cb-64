#!/usr/bin/env python3
"""Genera los JSON estáticos de la app Angular a partir de los .md de docs/.

Rúbricas: lee docs/rubricas/{datos,martech}.md y escribe app/awsome-app/public/rubrica.json.
Solo se parsean los bloques delimitados por <!-- NOMBRE --> ... <!-- /NOMBRE -->; lo demás se ignora.
Bloques soportados:
  CATEGORIAS  (tabla -> [{id, descripcion}])
  DIMENSIONES (tabla 'id | nombre | nº criterios | peso' -> [{id, nombre, criterios, peso}])
  VALOR       (varios; '## DIMENSION' previo + '### ID — NOMBRE', Pregunta, Tipo, Escala; un 'puntuable (calculado)' no lleva escala y sale con "calculado": true) -> dentro de cada dimensión
Si falta un bloque, avisa por stderr y la sección queda vacía en el JSON.

Uso: python3 scripts/generar_json.py [--estricto] [--salida DIR]
"""
import argparse
import re
from pathlib import Path

import md

RAIZ = Path(__file__).resolve().parent.parent
RUBRICAS = {"datos": RAIZ / "docs/rubricas/datos.md", "martech": RAIZ / "docs/rubricas/martech.md"}
SALIDA = RAIZ / "app/awsome-app/public"
BLOQUES = ("CATEGORIAS", "DIMENSIONES", "VALOR")
ID_CRITERIO = re.compile(r"^[A-Z]{2,3}-[A-Z]+-\d{2}$")
si_no = md.si_no


def delimitadores(texto, nombre_fichero):
    """Avisa de comentarios <!-- X --> mal escritos: bloque desconocido, sin cerrar, sin abrir o anidado."""
    pila = []
    for m in re.finditer(r"<!--\s*(/?)\s*([A-Za-z_]+)\s*-->", texto):
        cierra, nombre = m[1] == "/", m[2]
        linea = texto[: m.start()].count("\n") + 1
        if nombre not in BLOQUES:
            md.aviso(f"{nombre_fichero}:{linea}: comentario <!-- {m[1]}{nombre} --> desconocido (se esperan {', '.join(BLOQUES)}); se ignora")
        elif not cierra:
            if pila:
                md.aviso(f"{nombre_fichero}:{linea}: <!-- {nombre} --> dentro de <!-- {pila[-1][0]} --> sin cerrar")
            pila.append((nombre, linea))
        elif pila and pila[-1][0] == nombre:
            pila.pop()
        else:
            md.aviso(f"{nombre_fichero}:{linea}: <!-- /{nombre} --> sin su <!-- {nombre} --> de apertura")
    for nombre, linea in pila:
        md.aviso(f"{nombre_fichero}:{linea}: <!-- {nombre} --> sin cerrar; su contenido no se lee")


def bloque(texto, nombre):
    """Contenido entre <!-- NOMBRE --> y <!-- /NOMBRE --> (tolera espacios extra); None si falta."""
    m = re.search(rf"<!--\s*{nombre}\s*-->(.*?)<!--\s*/{nombre}\s*-->", texto, re.S)
    return m[1] if m else None


def filas_tabla(texto, esperadas):
    """Filas de datos de la primera tabla del texto, con al menos `esperadas` columnas; [] si no hay tabla."""
    t = md.tablas(texto)
    if not t:
        return []
    return t[0][1]


def categorias(texto, fichero):
    contenido = bloque(texto, "CATEGORIAS")
    if contenido is None:
        md.aviso(f"{fichero}: falta el bloque <!-- CATEGORIAS --> ... <!-- /CATEGORIAS -->, sección vacía")
        return []
    out, vistos = [], set()
    for celdas in filas_tabla(contenido, 2):
        id_ = celdas[0].strip("`")
        if len(celdas) < 2 or not id_:
            raise ValueError(f"fila de categoría mal formada: {celdas}")
        if id_ in vistos:
            md.error(f"{fichero}: categoría '{id_}' duplicada")
            continue
        vistos.add(id_)
        out.append({"id": id_, "descripcion": celdas[1]})
    return out


def dimensiones(texto, fichero):
    contenido = bloque(texto, "DIMENSIONES")
    if contenido is None:
        md.aviso(f"{fichero}: falta el bloque <!-- DIMENSIONES --> ... <!-- /DIMENSIONES -->, sección vacía")
        return []
    out, vistos = [], set()
    for celdas in filas_tabla(contenido, 4):
        try:
            id_, nombre, criterios, peso = celdas
            d = {"id": id_.strip("`"), "nombre": nombre, "criterios": int(criterios), "peso": int(peso)}
        except ValueError:
            raise ValueError(f"fila de dimensión mal formada (se espera 'id | nombre | nº criterios | peso' con enteros): {celdas}")
        if d["id"] in vistos:
            md.error(f"{fichero}: dimensión '{d['id']}' duplicada")
            continue
        vistos.add(d["id"])
        out.append(d)
    return out


TIPOS = ("puntuable", "booleano", "informativo")


def tabla_escala(texto):
    """Tabla horizontal: cabecera = valores numéricos, primera fila de datos = descripciones. None si no hay tabla válida."""
    t = md.tablas(texto)
    if not t or not t[0][1]:
        return None
    cab, filas, _ = t[0]
    if not all(v.isdigit() for v in cab):
        return None  # p. ej. una escala en vertical ('Valor | Descripción')
    return [{"valor": int(v), "descripcion": d} for v, d in zip(cab, filas[0])]


def valor(cont, id_, nombre_raw, aviso):
    """Un criterio (texto entre dos títulos) -> dict, o None con aviso."""
    tipo = re.search(rf"\*\*Tipo:\*\*\s*({'|'.join(TIPOS)})", cont)
    if not tipo:
        aviso(f"{id_}: 'Tipo' ausente o no empieza por {'/'.join(TIPOS)}")
        return None
    pregunta = re.search(r"\*\*Pregunta:\*\*\s*(.*?)\s*-\s*\*\*Tipo:\*\*", cont, re.S)
    peso = re.search(r"\*\*Peso:\*\*\s*(\S+)", cont)
    oblig = re.search(r"\*\*Obligatorio:\*\*\s*(\S+)", cont)
    peso_v = None
    if peso:
        p = peso[1].strip("*.,;")
        if re.fullmatch(r"\d+", p):
            peso_v = int(p)
        else:
            md.aviso(f"{id_}: 'Peso' debe ser un entero y es {peso[1]!r}; queda sin peso")
    elif tipo[1] != "informativo":
        md.aviso(f"{id_}: sin '**Peso:**'; queda sin peso")
    oblig_v = None
    if oblig:
        oblig_v = si_no(oblig[1])
        if oblig_v is None:
            md.aviso(f"{id_}: 'Obligatorio' debe ser Sí o No y es {oblig[1]!r}; se toma como no definido")
    if not pregunta and tipo[1] != "informativo" and not re.search(r"\*\*Tipo:\*\*\s*puntuable\s*\(calculado", cont):
        md.aviso(f"{id_}: sin '**Pregunta:**' seguida de '- **Tipo:**'; la pregunta queda vacía")
    v = {
        "id": id_,
        # el nombre empieza en la primera letra tras el id: se saltan espacios, guiones y símbolos
        "nombre": re.sub(r"^[\W\d_]+", "", nombre_raw).strip(),
        "pregunta": " ".join(pregunta[1].split()) if pregunta else "",
        "tipo": tipo[1],
        "peso": peso_v,
        "obligatorio": oblig_v,
    }
    if tipo[1] == "puntuable":
        esc = re.search(r"\*\*Escala:\*\*(.*)", cont, re.S)
        niveles = tabla_escala(esc[1]) if esc else None
        # '**Tipo:** puntuable (calculado ...)': la nota la calcula la app (p. ej. la de coste), no lleva escala
        if niveles is None and re.search(r"\*\*Tipo:\*\*\s*puntuable\s*\(calculado", cont):
            v["calculado"] = True
            return v
        if niveles is None:
            aviso(f"{id_}: puntuable sin tabla de escala válida (cabecera con los valores 0-5 y una fila de descripciones)")
            return None
        v["escala"] = {"niveles": niveles}
    return v


def valores(texto, nombre_fichero):
    """Bloques VALOR -> [(dimension, valor)].

    Dentro de un bloque, cada '## DIMENSION' fija la dimensión (su primer token) y cada
    '### ID — NOMBRE' abre un criterio. Si el bloque empieza sin '##', rige el último '## ' anterior.
    """
    out, ids = [], set()
    dentro = []
    for m in re.finditer(r"<!--\s*VALOR\s*-->(.*?)<!--\s*/VALOR\s*-->", texto, re.S):
        dentro.append((m.start(), m.end()))
        previos = re.findall(r"^##\s+(\S+)", texto[: m.start()], re.M)
        dim = previos[-1] if previos else None
        linea = texto[: m.start(1)].count("\n") + 1
        for trozo in re.split(r"(?m)^(?=#{2,3}\s)", m[1]):
            n, linea = linea, linea + trozo.count("\n")  # n = línea donde empieza el trozo

            def aviso(msg, n=n):
                md.aviso(f"{nombre_fichero}:{n}: {msg}, ignorado")

            if re.match(r"##\s", trozo):
                dim = trozo.split()[1] if len(trozo.split()) > 1 else None
            elif t := re.match(r"###\s+(\S+)(.*)", trozo):
                id_ = t[1].rstrip(":")
                if not ID_CRITERIO.match(id_):
                    aviso(f"'{t[1]}' no es un id de criterio válido (formato XX-YYY-NN, p. ej. DP-ARQ-01)")
                elif id_ in ids:
                    aviso(f"{id_} duplicado")
                elif dim is None:
                    aviso(f"{id_} sin '## DIMENSION' previo")
                elif (v := valor(trozo, id_, t[2], aviso)):
                    ids.add(id_)
                    out.append((dim, v))
    # un '### XX-YYY-NN' fuera de un bloque VALOR no se lee: probablemente un delimitador mal escrito
    for m in re.finditer(r"(?m)^###\s+([A-Z]{2,3}-[A-Z]+-\d{2})\b", texto):
        if not any(a <= m.start() < b for a, b in dentro):
            md.aviso(f"{nombre_fichero}:{texto[: m.start()].count(chr(10)) + 1}: criterio {m[1]} fuera de un bloque <!-- VALOR -->, no se lee")
    return out


def construir():
    """{tipo: {categorias, dimensiones}} leyendo los .md; los errores quedan en md.ERRORES."""
    rubrica = {}
    for tipo, fichero in RUBRICAS.items():
        nombre = fichero.name
        try:
            texto = md.leer(fichero)
            delimitadores(texto, nombre)
            dims = dimensiones(texto, nombre)
            por_id = {d["id"]: d for d in dims}
            for d in dims:
                d["valores"] = []
            for dim_id, valor_ in valores(texto, nombre):
                if dim_id in por_id:
                    por_id[dim_id]["valores"].append(valor_)
                else:
                    md.aviso(f"{nombre}: {valor_['id']} apunta a la dimensión '{dim_id}', que no está en DIMENSIONES, ignorado")
            for d in dims:
                if d["criterios"] != len(d["valores"]):
                    md.aviso(f"{nombre}: la dimensión {d['id']} declara {d['criterios']} criterios y se han leído {len(d['valores'])}")
            rubrica[tipo] = {"categorias": categorias(texto, nombre), "dimensiones": dims}
        except (ValueError, OSError) as e:
            md.error(f"{nombre}: {e}")
            rubrica[tipo] = {"categorias": [], "dimensiones": []}
    return rubrica


def main():
    ap = argparse.ArgumentParser(description="Genera rubrica.json")
    ap.add_argument("--estricto", action="store_true", help="los avisos también hacen fallar")
    ap.add_argument("--salida", type=Path, default=SALIDA, help="directorio de salida (por defecto app/awsome-app/public)")
    a = ap.parse_args()
    md.reiniciar()
    rubrica = construir()
    if not md.ERRORES:
        md.escribir_json(a.salida / "rubrica.json", rubrica)
        print(f"{a.salida / 'rubrica.json'}: " + ", ".join(f"{t} {len(v['categorias'])} categorías, {len(v['dimensiones'])} dimensiones, {sum(len(d['valores']) for d in v['dimensiones'])} valores" for t, v in rubrica.items()))
    md.terminar(a.estricto, "rúbricas")


if __name__ == "__main__":
    main()
