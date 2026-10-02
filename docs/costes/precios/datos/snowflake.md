---
candidato: snowflake
fecha_revision: 2026-09-29
region_referencia: "AWS us-east-1 (N. Virginia) — no se ha localizado, en esta revisión, un desglose de precio por crédito específico para una región UE en fuentes accesibles sin registro; se usa us-east-1 como referencia habitual del sector, con la salvedad explícita."
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: creditos_mes, nombre: "Créditos de cómputo al mes (estimación del consultor)", unidad: "créditos", valor: { S: 60, M: 900, L: 7500 } }
    - { id: precio_credito, nombre: "Precio por crédito (Enterprise, on-demand)", unidad: "USD/crédito", valor: 3, fuente: sf-pricing-page }
    - { id: precio_tb_mes, nombre: "Almacenamiento", unidad: "USD/TB-mes", valor: 23, fuente: sf-pricing-page }
  variantes:
    - nombre: "Enterprise on-demand"
      componentes:
        - { nombre: "Cómputo (créditos)", formula: "creditos_mes * precio_credito" }
        - { nombre: "Almacenamiento", formula: "tb_almacenados * precio_tb_mes" }
---

# Costes — Snowflake

## 1. Modelo de precios

- **Unidad de facturación:** créditos de cómputo (consumidos por segundo, con mínimo de 60 segundos por arranque/resume/cambio de tamaño de *warehouse*) más almacenamiento por TB-mes[^sf-pricing-page].
- **Ediciones:** Standard, Enterprise (añade gobierno avanzado), Business Critical (añade cifrado gestionado por el cliente y aislamiento reforzado) y VPS (aislamiento dedicado). Cada edición tiene un precio por crédito distinto[^sf-pricing-page].
- **Qué incluye:** cómputo y *cloud services* (metadatos, optimización, seguridad) hasta un umbral gratuito. **Qué no incluye:** almacenamiento (se factura aparte) y transferencia de red entre regiones/nubes.
- **Precio de referencia (AWS us-east-1, on-demand):** los agregados de precios consultados sitúan el crédito on-demand en torno a 2,00 USD (Standard), 3,00 USD (Enterprise), 4,00 USD (Business Critical) y 6,00 USD (VPS); almacenamiento en torno a 23,00 USD/TB-mes. **Advertencia de confianza:** estas cifras proceden de agregadores de terceros que citan la tabla oficial de consumo de servicios de Snowflake, no de una lectura directa de esa tabla en esta sesión; se marcan con **confianza media** y deben verificarse contra la página oficial de precios antes de usarse en una cotización real[^sf-pricing-page].
- **Mínimos y compromisos:** Snowflake opera principalmente bajo contratos de consumo comprometido (*capacity*) más que con un mínimo mensual fijo publicado; no se ha verificado el detalle exacto en esta revisión.

## 2. Coste estimado por escenario

Cálculo ilustrativo a partir de los parámetros de [`../escenarios.md`](../escenarios.md), asumiendo edición Enterprise (3,00 USD/crédito) y un *warehouse* Small-Medium dimensionado por escenario, con escala a cero fuera de las horas activas.

| Escenario | Créditos estimados/mes | Coste cómputo estimado/mes | Almacenamiento estimado/mes | Coste mensual estimado |
|---|---|---|---|---|
| S | ≈ 60 | ≈ 180 USD | ≈ 23 USD (1 TB) | **≈ 203 USD** |
| M | ≈ 900 | ≈ 2.700 USD | ≈ 460 USD (20 TB) | **≈ 3.160 USD** |
| L | ≈ 7.500 | ≈ 22.500 USD | ≈ 4.600 USD (200 TB) | **≈ 27.100 USD** |

Los créditos por escenario son una estimación gruesa del consultor (no una fuente factual), basada en el tamaño de *warehouse* necesario para la concurrencia pico de cada escenario y las horas activas definidas en `escenarios.md`; en una entrega completa deberían recalcularse con la calculadora oficial de Snowflake.

## 3. Advertencias obligatorias

- Precios de lista on-demand, sin descuentos por compromiso de capacidad.
- El precio por crédito citado en esta ficha tiene **confianza media** (fuente secundaria que cita la tabla oficial, no verificada directamente en esta sesión); antes de una decisión real, debe confirmarse en [snowflake.com/en/pricing](https://www.snowflake.com/en/pricing/).
- Los créditos por escenario son estimaciones, no cifras auditadas.

[^sf-pricing-page]: Snowflake Inc., «Snowflake Pricing», https://www.snowflake.com/en/pricing/, consultado 2026-09-29.
