#!/usr/bin/env python3
"""Comprobación mínima de md.py y formula.py. Uso: python3 scripts/tests/test_md.py"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))  # los módulos están en scripts/
import md
from formula import comprobar

assert md.celdas("| a \\| b | c |") == ["a | b", "c"]
assert md.celdas("a | b") == ["a", "b"]
assert md.si_no("Sí.") is True and md.si_no("**No**") is False and md.si_no(" si ") is True and md.si_no("quizá") is None
assert md.numero_es("1.234,5") == 1234.5 and md.numero_es("0,05") == 0.05 and md.numero_es("5.000") == 5000.0
assert md.numero_es("2M") is None and md.numero_es("0.05") is None and md.numero_es("1 millón") is None

md.reiniciar()
t = md.tablas("x\n| a | b |\n|---|---|\n| 1 | 2 |\n| 3 |\n\n| sin | sep |\n| 1 | 2 |\n\n| c |\n|:--:|\n| 9 |")
assert t == [(["a", "b"], [["1", "2"], ["3", ""]], 2), (["c"], [["9"]], 10)], t
assert len(md.AVISOS) == 1  # la fila con una columna de menos
md.reiniciar()

assert md.front_matter("﻿---\na: 1\n---\ncuerpo") == {"a": 1}
assert md.front_matter("---\r\na: 1\r\n---\r\n") == {"a": 1}
for malo in ("a: 1\n---\n", "---\na: 1\n", "---\n- x\n---\n", "---\nf: 2026-13-30\n---\n", "---\n: : :\n---\n"):
    try:
        md.front_matter(malo)
        raise SystemExit(f"debería fallar: {malo!r}")
    except ValueError:
        pass

assert comprobar("max(0, a * 30 - b) * c") == {"a", "b", "c"}
assert comprobar("-x + ceil(y / 2)") == {"x", "y"}
for mala in ("x * 2,5", "x ^ 2", "max(x", "x % 3", "ceil(a,b)", "foo(1)", "1 +", "(1", "1 2"):
    try:
        comprobar(mala)
        raise SystemExit(f"debería fallar: {mala!r}")
    except ValueError:
        pass
print("ok")
