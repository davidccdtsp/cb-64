---
candidato: apache-druid
fecha_revision: 2026-10-02
region_referencia: "No aplica — sin oferta gestionada oficial del proyecto"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura: cómputo, almacenamiento y red (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 200, max: 300 }, M: { min: 1600, max: 2200 }, L: { min: 10000, max: 14000 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.15, M: 0.375, L: 0.9375 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "fte * tarifa_hora * horas_base" }
---

# Costes — Apache Druid

## 1. Modelo de precios

Software libre (Apache-2.0), sin coste de licencia. El coste es íntegramente de infraestructura y operación (TCO): la arquitectura multi-rol de Druid (histórico, *broker*, *coordinator*, *overlord*, *middle manager*) suele requerir más tipos de nodo distintos que un motor MPP monolítico como ClickHouse, lo que se refleja en un supuesto de mayor dedicación operativa.

## 2. TCO estimado por escenario

| Escenario | Infraestructura (estimado/mes) | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 200 – 300 € | ≈ 156 € (0,15 FTE) | **≈ 356 – 456 €** |
| M | 1.600 – 2.200 € | ≈ 1.560 € (0,375 FTE) | **≈ 3.160 – 3.760 €** |
| L | 10.000 – 14.000 € | ≈ 7.800 € (0,9375 FTE) | **≈ 17.800 – 21.800 €** |

Se asume una dedicación operativa un 50 % superior a la de ClickHouse (ver [`clickhouse.md`](clickhouse.md)) por el mayor número de roles de nodo distintos a gestionar; es un supuesto del consultor, no una cifra medida.

## 3. Advertencias obligatorias

- Sin coste de licencia; TCO estimado, no auditado.
- El supuesto de mayor esfuerzo operativo frente a ClickHouse es una estimación cualitativa, no calculada a partir de un caso real.
