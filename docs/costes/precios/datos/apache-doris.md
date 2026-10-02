---
candidato: apache-doris
fecha_revision: 2026-10-02
region_referencia: "No aplica — sin oferta gestionada oficial del proyecto; el coste depende íntegramente de la infraestructura elegida por el cliente"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura: cómputo, almacenamiento y red (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 180, max: 260 }, M: { min: 1400, max: 1900 }, L: { min: 9000, max: 13000 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.1, M: 0.3, L: 0.75 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "fte * tarifa_hora * horas_base" }
---

# Costes — Apache Doris

## 1. Modelo de precios

Apache Doris es software libre (Apache-2.0) sin coste de licencia. No existe una oferta gestionada oficial del propio proyecto Apache Doris (existen terceros como SelectDB, no evaluados en detalle en esta ficha). El coste es íntegramente de infraestructura y operación (TCO), siguiendo la metodología de [`../../metodologia.md`](../metodologia.md#3-tco-para-candidatos-oss).

## 2. TCO estimado por escenario

Mismos supuestos de partida que en la ficha de coste de ClickHouse (ver [`clickhouse.md`](clickhouse.md)) por tratarse de una arquitectura MPP comparable en tamaño de clúster: instancias equivalentes en `eu-central-1`, operación a 65 €/hora con la misma dedicación por escenario.

| Escenario | Infraestructura (estimado/mes) | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 180 – 260 € | ≈ 104 € | **≈ 284 – 364 €** |
| M | 1.400 – 1.900 € | ≈ 1.248 € | **≈ 2.650 – 3.150 €** |
| L | 9.000 – 13.000 € | ≈ 6.240 € | **≈ 15.240 – 19.240 €** |

**Advertencia de método:** estas cifras se reutilizan por analogía arquitectónica con ClickHouse (ambos MPP self-hosted de tamaño de clúster comparable), no porque se haya vuelto a calcular el dimensionado específico de Doris; en una entrega completa deberían recalcularse de forma independiente, ya que el patrón de compresión y el número de réplicas por defecto pueden diferir.

## 3. Advertencias obligatorias

- Sin licencia de coste; TCO estimado, no auditado.
- No se ha evaluado en esta ficha el coste de una oferta gestionada de terceros (p. ej. SelectDB).
