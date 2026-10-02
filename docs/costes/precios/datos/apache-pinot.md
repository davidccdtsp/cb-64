---
candidato: apache-pinot
fecha_revision: 2026-10-02
region_referencia: "No aplica al self-hosted; no se ha verificado en esta revisión una tarifa pública desglosada de StarTree Cloud"
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

# Costes — Apache Pinot

## 1. Modelo de precios

Software libre (Apache-2.0), sin coste de licencia. StarTree ofrece SaaS y BYOC gestionados; su modelo de precios no se ha verificado con una tarifa pública desglosada en esta revisión (`N/D`).

## 2. TCO estimado por escenario (self-hosted)

Mismos supuestos que en la ficha de coste de Apache Druid (ver [`apache-druid.md`](apache-druid.md)), por comparabilidad arquitectónica (multi-rol, orientado a streaming):

| Escenario | Infraestructura (estimado/mes) | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 200 – 300 € | ≈ 156 € | **≈ 356 – 456 €** |
| M | 1.600 – 2.200 € | ≈ 1.560 € | **≈ 3.160 – 3.760 €** |
| L | 10.000 – 14.000 € | ≈ 7.800 € | **≈ 17.800 – 21.800 €** |

## 3. Advertencias obligatorias

- Cifras por analogía con Druid, no recalculadas de forma independiente para Pinot.
- Coste de StarTree marcado `N/D` por falta de tarifa pública localizada en esta revisión.
