---
candidato: trino
fecha_revision: 2026-10-02
region_referencia: "No aplica al self-hosted; no se ha verificado en esta revisión una tarifa pública desglosada de Starburst Galaxy"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Cómputo, sin almacenamiento propio (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 120, max: 180 }, M: { min: 900, max: 1300 }, L: { min: 6000, max: 9000 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.1, M: 0.3, L: 0.75 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "fte * tarifa_hora * horas_base" }
---

# Costes — Trino

## 1. Modelo de precios

Trino en sí no almacena datos: su coste es únicamente el del cómputo del clúster (coordinador + *workers*), sin coste de almacenamiento propio (los datos residen y se pagan en el sistema de origen consultado). Sin coste de licencia (Apache-2.0). Starburst ofrece una versión gestionada cuyo modelo de precios no se ha verificado con una tarifa pública desglosada en esta revisión (`N/D`).

## 2. TCO estimado por escenario (self-hosted, solo cómputo)

A diferencia de ClickHouse/Doris/StarRocks, aquí no se estima almacenamiento propio, solo cómputo dimensionado por concurrencia pico y horas activas (ver [`../escenarios.md`](../escenarios.md)), más operación.

| Escenario | Cómputo estimado/mes | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 120 – 180 € | ≈ 104 € | **≈ 224 – 284 €** |
| M | 900 – 1.300 € | ≈ 1.248 € | **≈ 2.150 – 2.550 €** |
| L | 6.000 – 9.000 € | ≈ 6.240 € | **≈ 12.240 – 15.240 €** |

**No incluye** el coste del almacenamiento subyacente (Iceberg/Delta en S3, bases relacionales, etc.), que se contabiliza en la ficha del sistema de origen, no en esta.

## 3. Advertencias obligatorias

- Sin coste de licencia; TCO estimado, no auditado.
- Coste de la oferta gestionada de Starburst marcado `N/D` por falta de tarifa pública localizada en esta revisión.
- El almacenamiento de los datos consultados no se contabiliza aquí para evitar doble conteo con la ficha del sistema de origen.
