#!/usr/bin/env python3
"""Comprobación mínima del parseo de generar_escenarios.py. Uso: python3 scripts/tests/test_escenarios.py"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))  # los módulos están en scripts/
from generar_escenarios import celda, parametros

assert celda("1 TB") == (1.0, "TB")
assert celda("0,05 TB (50 GB)") == (0.05, "TB")
assert celda("10 %") == (10.0, "%")
assert celda("8 h") == (8.0, "h")
assert celda("5.000") == (5000.0, "")
assert celda("2 millones") == (2_000_000.0, "")
assert celda("1.000 millones") == (1_000_000_000.0, "")
assert celda("7 días") == (7.0, "días")
assert celda("Email, SMS, push") == (None, "")
assert celda("Sí") == (None, "")

p = parametros("| Id | Parámetro | S | M | L |\n|---|---|---|---|---|\n| `canales` | Canales | Email | Email, SMS | Todos |\n| `emails_mes` | Emails | 50.000 | 2 millones | 50 millones |\n")
assert p[0]["valores"] == {} and p[0]["textos"]["M"] == "Email, SMS"
assert p[1]["valores"] == {"S": 50000.0, "M": 2e6, "L": 5e7}
print("ok")
