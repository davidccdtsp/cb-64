---
candidato: redshift
fecha_revision: 2026-10-02
region_referencia: "AWS us-east-1 (N. Virginia) — no se ha desglosado en esta revisión una tarifa específica de región UE (p. ej. eu-central-1), que suele tener un recargo variable sobre us-east-1 en AWS."
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: rpu_horas_mes, nombre: "RPU-hora al mes (estimación del consultor)", unidad: "RPU-hora", valor: { S: 320, M: 3840, L: 43200 } }
    - { id: precio_rpu_hora, nombre: "Redshift Serverless", unidad: "USD/RPU-hora", valor: 0.375, fuente: rs-pricing-serverless }
    - { id: precio_gb_mes, nombre: "Almacenamiento gestionado", unidad: "USD/GB-mes", valor: 0.024, fuente: rs-pricing-serverless }
  variantes:
    - nombre: "Serverless on-demand"
      componentes:
        - { nombre: "Cómputo (RPU-hora)", formula: "rpu_horas_mes * precio_rpu_hora" }
        - { nombre: "Almacenamiento gestionado", formula: "tb_almacenados * 1000 * precio_gb_mes" }
---

# Costes — Amazon Redshift

## 1. Modelo de precios

- **Redshift Serverless (RPU):** 0,375 USD por RPU-hora en us-east-1, facturado por segundo con mínimo de 60 segundos; capacidad base mínima de 4 RPU (≈ 1,50 USD/hora de arranque); crédito de 300 USD durante 90 días para cuentas nuevas. Cifras confirmadas en la página oficial el 2026-10-02[^rs-pricing-serverless].
- **RA3 provisionado (on-demand, us-east-1):** `ra3.4xlarge` 3,26 USD/hora; el precio de `ra3.xlplus` (1,086 USD/hora en la revisión anterior) no aparece en la lectura de 2026-10-02[^rs-pricing-serverless].
- **Almacenamiento gestionado (RMS):** ≈ 0,024 USD/GB-mes, igual en ambos modos de cómputo[^rs-pricing-serverless].
- **Reservas:** descuentos de hasta el 24 % (1 año) o 45 % (3 años) sobre Serverless on-demand[^rs-pricing-serverless].
- **Qué no incluye:** transferencia de red entre regiones/fuera de AWS, facturada aparte.

## 2. Coste estimado por escenario

Estimación con Redshift Serverless (0,375 USD/RPU-hora), dimensionando RPU según la concurrencia pico de cada escenario y las horas activas de [`../escenarios.md`](../escenarios.md).

| Escenario | RPU-hora estimadas/mes | Coste cómputo estimado/mes | Almacenamiento estimado/mes | Coste mensual estimado |
|---|---|---|---|---|
| S | ≈ 320 (4 RPU × 8h × 10 días activos aprox.) | ≈ 120 USD | ≈ 24 USD (1 TB) | **≈ 144 USD** |
| M | ≈ 3.840 (16 RPU × 16h/día) | ≈ 1.440 USD | ≈ 480 USD (20 TB) | **≈ 1.920 USD** |
| L | ≈ 43.200 (60 RPU × 24h/día) | ≈ 16.200 USD | ≈ 4.800 USD (200 TB) | **≈ 21.000 USD** |

El dimensionado de RPU por escenario es una estimación gruesa del consultor, no una cifra auditada ni calculada con la calculadora oficial de AWS.

## 3. Advertencias obligatorias

- Precios de lista on-demand, sin reservas ni descuentos negociados.
- No se ha desglosado una tarifa específica de región UE en esta revisión; se usa `us-east-1` como referencia con esa salvedad explícita.
- Las cifras por escenario son estimaciones, no auditadas.

[^rs-pricing-serverless]: AWS, «Amazon Redshift Serverless pricing», https://aws.amazon.com/redshift/pricing/, consultado 2026-10-02.
