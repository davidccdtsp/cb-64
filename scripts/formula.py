"""Comprobación de la sintaxis de las fórmulas de coste, con la misma gramática que app/awsome-app/src/app/services/expression.ts:
números, variables, + - * /, paréntesis, '-' unario y las funciones max(...), min(...) y ceil(...) (ceil con un solo argumento)."""
import re

FUNCIONES = {"max": None, "min": None, "ceil": 1}
TOKEN = re.compile(r"\s*(?:(\d+(?:\.\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|([-+*/(),]))")


def tokens(formula):
    out, pos = [], 0
    while pos < len(formula):
        m = TOKEN.match(formula, pos)
        if not m:
            if not formula[pos:].strip():
                break
            raise ValueError(f"carácter inesperado «{formula[pos:pos + 1]}» en la posición {pos}")
        out.append(("num", m[1]) if m[1] else ("id", m[2]) if m[2] else ("op", m[3]))
        pos = m.end()
    return out


def comprobar(formula):
    """Devuelve el conjunto de variables que usa la fórmula. @raises ValueError si no cumple la gramática."""
    t = tokens(formula)
    i = 0
    usadas = set()

    def es(op):
        return i < len(t) and t[i] == ("op", op)

    def expr():
        nonlocal i
        term()
        while es("+") or es("-"):
            i += 1
            term()

    def term():
        nonlocal i
        factor()
        while es("*") or es("/"):
            i += 1
            factor()

    def factor():
        nonlocal i
        if i >= len(t):
            raise ValueError("fórmula incompleta")
        tipo, v = t[i]
        i += 1
        if tipo == "num":
            return
        if (tipo, v) == ("op", "-"):
            return factor()
        if (tipo, v) == ("op", "("):
            expr()
            if not es(")"):
                raise ValueError("falta «)»")
            i += 1
            return
        if tipo == "id":
            if es("("):
                if v not in FUNCIONES:
                    raise ValueError(f"función desconocida «{v}»")
                i += 1
                n = 1
                expr()
                while es(","):
                    i += 1
                    n += 1
                    expr()
                if not es(")"):
                    raise ValueError("falta «)»")
                i += 1
                if FUNCIONES[v] and n != FUNCIONES[v]:
                    raise ValueError(f"«{v}» admite {FUNCIONES[v]} argumento(s) y tiene {n}")
                return
            usadas.add(v)
            return
        raise ValueError(f"símbolo inesperado «{v}»")

    expr()
    if i < len(t):
        raise ValueError(f"sobran símbolos a partir de «{t[i][1]}»")
    return usadas
