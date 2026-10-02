#!/usr/bin/env python3
"""Comprobación mínima del parseo de totales de generar_costes.py. Uso: python3 scripts/tests/test_costes.py"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))  # los módulos están en scripts/
from generar_costes import cifra, enlaces, totales

assert cifra("≈ 284 – 364 €", "USD") == (284.0, 364.0, "EUR")
assert cifra("2.000 USD", "EUR") == (2000.0, 2000.0, "USD")
assert cifra("5,00 USD – 8,00 USD", "EUR") == (5.0, 8.0, "USD")
assert cifra("60 – 120", "EUR") == (60.0, 120.0, "EUR")  # sin símbolo: moneda por defecto
assert cifra("≈ 29 USD", "EUR") == (29.0, 29.0, "USD")
for texto in ("N/D", "≈ 182 USD + almacenamiento", "F128 (24/7)", ""):
    assert cifra(texto, "USD") is None, texto

# la primera tabla con cifra gana; una tabla N/D no tapa a otra posterior con cifra
tablas = [
    {"titulo": "2.1 Oferta comercial (USD)", "filas": [{"Escenario": "S", "Coste mensual": "N/D"}]},
    {"titulo": "2.2 TCO autoalojado (EUR)", "filas": [{"Escenario": "S", "TCO mensual": "100 – 200"}]},
]
assert totales(tablas, "USD")["S"] == {"min": 100.0, "max": 200.0, "moneda": "EUR", "origen": "2.2 TCO autoalojado (EUR)", "texto": "100 – 200"}
assert totales(tablas[:1], "USD")["S"]["min"] is None
print("ok")

# modelo de precios
from generar_costes import validar_modelo, valor_valido

assert valor_valido(6.25) and valor_valido({"min": 1, "max": 2}) and valor_valido({"S": 1, "M": {"min": 1, "max": 2}, "L": 3})
for malo in ("6,25", {"min": 3, "max": 2}, {"S": 1, "M": 2}, True, None):
    assert not valor_valido(malo), malo
ok = {"moneda": "USD", "parametros": [{"id": "p1", "nombre": "x", "valor": 1, "fuente": "f1"}],
      "variantes": [{"componentes": [{"nombre": "c", "formula": "max(0, emails_mes - 5) * p1"}]}]}
assert validar_modelo(ok, {"emails_mes"}, {"f1"}) == []
assert any("desconocido" in e for e in validar_modelo(ok, set(), {"f1"}))  # emails_mes no existe
assert any("fuente" in e for e in validar_modelo(ok, {"emails_mes"}, set()))
assert any("moneda" in e for e in validar_modelo({**ok, "moneda": "GBP"}, {"emails_mes"}, {"f1"}))
assert any("duplicado" in e for e in validar_modelo({**ok, "parametros": ok["parametros"] * 2}, {"emails_mes"}, {"f1"}))
print("ok modelo")

nota = "[^bq]: Google Cloud, «BigQuery pricing», https://cloud.google.com/bigquery/pricing, consultado 2026-09-29.\ntexto suelto\n[^sin]: sin enlace"
assert enlaces(nota) == [{"id": "bq", "titulo": "Google Cloud, «BigQuery pricing»", "url": "https://cloud.google.com/bigquery/pricing", "consultado": "2026-09-29"}], enlaces(nota)
