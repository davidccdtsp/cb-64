---
candidato: keila
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: p2000, nombre: "Plan XS (2.000 emails)", unidad: "EUR/mes", valor: 8, fuente: kl-pricing }
    - { id: p5000, nombre: "Plan S (5.000 emails)", unidad: "EUR/mes", valor: 16, fuente: kl-pricing }
    - { id: p15000, nombre: "Plan M (15.000 emails)", unidad: "EUR/mes", valor: 32, fuente: kl-pricing }
    - { id: p50000, nombre: "Plan L (50.000 emails)", unidad: "EUR/mes", valor: 64, fuente: kl-pricing }
    - { id: p100000, nombre: "Plan XL (100.000 emails)", unidad: "EUR/mes", valor: 128, fuente: kl-pricing }
    - { id: p250000, nombre: "Plan XXL (250.000 emails)", unidad: "EUR/mes", valor: 256, fuente: kl-pricing }
    - { id: factor_extra, nombre: "Parte del precio marginal del último tramo que se extrapola por encima de 250.000 emails (0 = ninguna, 1 = sin descuento por volumen)", valor: { min: 0, max: 1 } }
  variantes:
    - nombre: "Keila Cloud"
      componentes:
        - { nombre: "Plan (interpolación entre los planes publicados)", formula: "p2000 + (p5000 - p2000) * max(0, min(1, (emails_mes - 2000) / 3000)) + (p15000 - p5000) * max(0, min(1, (emails_mes - 5000) / 10000)) + (p50000 - p15000) * max(0, min(1, (emails_mes - 15000) / 35000)) + (p100000 - p50000) * max(0, min(1, (emails_mes - 50000) / 50000)) + (p250000 - p100000) * max(0, min(1, (emails_mes - 100000) / 150000))" }
        - { nombre: "Emails por encima de 250.000 (extrapolación)", formula: "max(0, emails_mes - 250000) * (p250000 - p100000) / 150000 * factor_extra" }
---

# Costes — Keila

## 1. Modelo de precios

- **Unidad de facturación:** emails al mes por plan de Keila Cloud[^kl-pricing].
- **Qué incluye:** Contactos y proyectos ilimitados; servidores de Keila o proveedor propio; alojamiento en la UE.
- **Mínimos y compromisos:** Sin plan gratuito.
- **Precio de lista:** XS 8 EUR (2.000 emails); S 16 (5.000); M 32 (15.000); L 64 (50.000); XL 128 (100.000); XXL 256 EUR/mes (250.000).[^kl-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (EUR)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 64,00 € | 768 € |
| M | 256,00 € – 1.749 € | 3.072 € – 20.992 € |
| L | 256,00 € – 42.709 € | 3.072 € – 512.512 € |

S: plan L (50.000 emails) = 64 EUR/mes. M (2 millones de emails) y L (50 millones) superan el mayor plan publicado (250.000 emails, 256 EUR): el mínimo es ese plan y el máximo, el que saldría extrapolando el precio marginal del último tramo (0,85 EUR por 1.000 emails) sin descuento por volumen. Keila no publica tarifa por encima de 250.000 emails, así que el rango es amplio y solo orienta (para M y L el TCO autoalojado de 2.2 es la alternativa). Precios confirmados en la página oficial el 2026-10-02.

### 2.2 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Autoalojado con Docker (AGPL-3.0); el envío requiere proveedor de transporte.

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 30 – 60 | 4 h → 260 | **290 € – 320 €** | 3.480 € – 3.840 € |
| M | 150 – 350 | 12 h → 780 | **930 € – 1.130 €** | 11.160 € – 13.560 € |
| L | 800 – 1.800 | 40 h → 2600 | **3.400 € – 4.400 €** | 40.800 € – 52.800 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^kl-pricing]: Keila, «Pricing», https://www.keila.io/pricing, consultado 2026-10-02.
