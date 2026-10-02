---
candidato: motherduck
fecha_revision: 2026-10-02
region_referencia: "US East (tarifa de referencia de agregadores de la página oficial de precios); región UE eu-central-1 disponible pero sin tarifa diferenciada localizada en esta revisión"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: cuota_plan, nombre: "Cuota base del plan Business (por organización)", unidad: "USD/mes", valor: 250, fuente: md-pricing-page }
    - { id: precio_hora, nombre: "Instancia de cómputo: Standard (S y M) y Jumbo (L)", unidad: "USD/hora", valor: { S: 2.4, M: 2.4, L: 4.8 }, fuente: md-pricing-page }
    - { id: precio_gb_mes, nombre: "Almacenamiento", unidad: "USD/GB-mes", valor: 0.04, fuente: md-pricing-page }
  variantes:
    - nombre: Business
      componentes:
        - { nombre: "Cuota del plan", formula: "cuota_plan" }
        - { nombre: "Cómputo (horas activas)", formula: "horas_activas_dia * 30 * precio_hora" }
        - { nombre: "Almacenamiento", formula: "tb_almacenados * 1000 * precio_gb_mes" }
---

# Costes — MotherDuck

## 1. Modelo de precios

- **Planes (revisión 2026-10-02):** Lite (gratuito: hasta 3 usuarios internos, 10 GB y 10 horas de cómputo Pulse al mes incluidos), Business (250 USD/mes por organización más consumo, hasta 10 usuarios internos, SLA de disponibilidad del 99,9 %) y Enterprise (precio a medida, usuarios ilimitados). Los planes Pro (25 USD) y Team (49 USD) de la revisión anterior ya no aparecen[^md-pricing-page].
- **Cómputo ("Ducklings"), facturado por segundo:** Pulse 0,60 USD por CU-hora, Standard 2,40 USD/hora, Jumbo 4,80 USD/hora, Mega 12,00 USD/hora, Giga 24,00 USD/hora (36,00 en la revisión anterior)[^md-pricing-page].
- **Almacenamiento:** 0,04 USD/GB-mes (0,08 en la revisión anterior)[^md-pricing-page].
- **Qué no incluye:** no se ha verificado en esta revisión el coste de transferencia de red entre regiones.

## 2. Coste estimado por escenario

Estimación con el plan Business (250 USD/mes), instancia Standard (2,40 USD/hora) para S/M y Jumbo (4,80 USD/hora) para L, según las horas activas de [`../escenarios.md`](../escenarios.md) (30 días al mes). En M (40 usuarios) y L (250) se superan los 10 usuarios del plan Business, por lo que en la práctica haría falta Enterprise, cuyo precio no es público: la cuota de 250 USD es un mínimo.

| Escenario | Plan base | Cómputo estimado/mes | Almacenamiento estimado/mes | Coste mensual estimado |
|---|---|---|---|---|
| S | Business (250 USD) + Standard 8h/día | ≈ 576 USD | ≈ 40 USD (1 TB) | **≈ 866 USD** |
| M | Business (250 USD) + Standard 16h/día | ≈ 1.152 USD | ≈ 800 USD (20 TB) | **≈ 2.202 USD** |
| L | Business (250 USD) + Jumbo 24h/día | ≈ 3.456 USD | ≈ 8.000 USD (200 TB) | **≈ 11.706 USD** |

El almacenamiento en el escenario L sigue siendo alto frente a otros candidatos, aunque la tarifa se ha reducido a la mitad: es un indicio de que, para volúmenes grandes, MotherDuck puede no ser la opción de menor coste, coherente con su posicionamiento como herramienta para cargas de tamaño pequeño-medio más que como sustituto directo de un data warehouse a gran escala.

## 3. Advertencias obligatorias

- Precios de lista sin descuentos por compromiso.
- No se ha verificado en esta revisión una tarifa diferenciada para la región UE (`eu-central-1`); se asume la misma tarifa que EE. UU. como aproximación, con esa salvedad explícita.
- Las cifras por escenario son estimaciones, no auditadas.

[^md-pricing-page]: MotherDuck Inc., «MotherDuck Pricing», https://motherduck.com/product/pricing/, consultado 2026-10-02.
