---
candidato: dremio
fecha_revision: 2026-10-02
region_referencia: "N/D — no se ha localizado en esta revisión el detalle de regiones/tarifas UE de Dremio Cloud"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: dcu_activos, nombre: "DCU de los motores activos (estimación del consultor: tamaño del motor × nodos)", unidad: "DCU", valor: { S: 4, M: 16, L: 64 } }
    - { id: precio_dcu, nombre: "Precio por DCU (pago por uso)", unidad: "USD/DCU", valor: 0.2, fuente: dremio-pricing }
    - { id: precio_tb_cloud, nombre: "Almacenamiento en el cloud propio (objeto estándar, supuesto del consultor)", unidad: "USD/TB-mes", valor: 23 }
  variantes:
    - nombre: "Dremio Cloud, pago por uso"
      componentes:
        - { nombre: "Cómputo (DCU-hora)", formula: "dcu_activos * horas_activas_dia * 30 * precio_dcu" }
        - { nombre: "Almacenamiento (cloud propio)", formula: "tb_almacenados * precio_tb_cloud" }
---

# Costes — Dremio

## 1. Modelo de precios

- **Dremio Cloud (revisión 2026-10-02):** consumo a 0,20 USD por DCU (Dremio Compute Unit), que mide el tiempo de ejecución del motor (tamaño del motor × minutos en marcha), con prueba gratuita de 30 días y 400 USD de crédito; hay contratos anuales para cargas previsibles. La página oficial ya no menciona el nivel gratuito permanente de Sonar y Arctic que recogía la revisión anterior. Los datos permanecen en el almacenamiento del cliente, sin recargo de Dremio[^dremio-pricing].
- **Community Edition (self-hosted):** Apache-2.0, sin coste de licencia; coste íntegro de infraestructura y operación (TCO).

## 2. Coste estimado por escenario

Estimación con consumo de DCU a 0,20 USD, motores activos solo las horas activas del escenario (30 días al mes) y almacenamiento en el cloud del cliente con un supuesto del consultor de 23 USD/TB-mes. Los DCU activos por escenario (4, 16 y 64) son una estimación gruesa del consultor, no calculada con la calculadora oficial.

| Escenario | Coste Dremio Cloud estimado/mes | TCO self-hosted equivalente (alternativa) |
|---|---|---|
| S | ≈ 215 USD | ≈ 250 – 350 € |
| M | ≈ 1.996 USD | ≈ 2.500 – 3.000 € |
| L | ≈ 13.816 USD | ≈ 15.000 – 19.000 € |

## 3. Advertencias obligatorias

- Los DCU por escenario son una estimación gruesa del consultor; el consumo real depende del tamaño de los motores y de las reflexiones (*Reflections*) que se mantengan.
- El TCO self-hosted es una estimación por analogía con otros motores MPP de esta base, no calculada de forma independiente para Dremio.

[^dremio-pricing]: Dremio Inc., «Pricing», https://www.dremio.com/pricing/, consultado 2026-10-02.
[^dremio-open-source-page]: Dremio Inc., «Open Source — Accelerate Data Analytics», https://www.dremio.com/open-source/, consultado 2026-09-29.
