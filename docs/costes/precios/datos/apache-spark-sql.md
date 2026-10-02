---
candidato: apache-spark-sql
fecha_revision: 2026-10-02
region_referencia: "No aplica — sin oferta gestionada propia del proyecto; el coste depende de la infraestructura o servicio gestionado elegido (Databricks, EMR, Dataproc, ya evaluados aparte)"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Cómputo, sin almacenamiento propio (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 150, max: 220 }, M: { min: 1200, max: 1700 }, L: { min: 8000, max: 12000 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.1, M: 0.3, L: 0.75 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "fte * tarifa_hora * horas_base" }
---

# Costes — Apache Spark SQL

## 1. Modelo de precios

Apache Spark es software libre (Apache-2.0), sin coste de licencia ni almacenamiento propio. El coste depende íntegramente de dónde se ejecute: clúster self-managed (TCO de infraestructura + operación) o un servicio gestionado (Databricks, AWS EMR, Google Dataproc, Azure Synapse), cada uno con su propio modelo de precios — Databricks ya se evalúa como candidato aparte en esta base.

## 2. TCO estimado por escenario (self-hosted en Kubernetes/YARN)

Estimación de solo cómputo (sin almacenamiento propio, igual que en la ficha de Trino), dimensionado por volumen de datos procesados y horas activas de [`../escenarios.md`](../escenarios.md).

| Escenario | Cómputo estimado/mes | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 150 – 220 € | ≈ 104 € | **≈ 254 – 324 €** |
| M | 1.200 – 1.700 € | ≈ 1.248 € | **≈ 2.450 – 2.950 €** |
| L | 8.000 – 12.000 € | ≈ 6.240 € | **≈ 14.240 – 18.240 €** |

**No incluye** el almacenamiento de los datos procesados (se contabiliza en la ficha del sistema de almacenamiento de origen/destino).

## 3. Advertencias obligatorias

- Sin coste de licencia; TCO estimado, no auditado.
- Si se opta por un servicio gestionado (Databricks, EMR, Dataproc), el coste real puede diferir sustancialmente de esta estimación self-hosted; ver la ficha de Databricks para ese caso.
