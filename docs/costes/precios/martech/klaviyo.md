---
candidato: klaviyo
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: p500, nombre: "Plan Email, hasta 500 perfiles activos", unidad: "USD/mes", valor: 20, fuente: kv-etester-pricing }
    - { id: p5000, nombre: "Plan Email, 5.000 perfiles activos", unidad: "USD/mes", valor: 100, fuente: kv-usecarly-pricing }
    - { id: p10000, nombre: "Plan Email, 10.000 perfiles activos", unidad: "USD/mes", valor: 150, fuente: kv-usecarly-pricing }
    - { id: p25000, nombre: "Plan Email, 25.000 perfiles activos", unidad: "USD/mes", valor: 400, fuente: kv-usecarly-pricing }
    - { id: p50000, nombre: "Plan Email, 50.000 perfiles activos", unidad: "USD/mes", valor: 720, fuente: kv-etester-pricing }
    - { id: factor_extra, nombre: "Parte del precio del último tramo que se extrapola por encima de 50.000 perfiles (0 = ninguna, 1 = sin descuento por volumen)", valor: { min: 0, max: 1 } }
  variantes:
    - nombre: "Plan Email"
      componentes:
        - { nombre: "Perfiles activos (interpolación entre los tramos publicados)", formula: "p500 + (p5000 - p500) * max(0, min(perfiles, 5000) - 500) / 4500 + (p10000 - p5000) * max(0, min(perfiles, 10000) - 5000) / 5000 + (p25000 - p10000) * max(0, min(perfiles, 25000) - 10000) / 15000 + (p50000 - p25000) * max(0, min(perfiles, 50000) - 25000) / 25000" }
        - { nombre: "Perfiles por encima de 50.000 (extrapolación)", formula: "max(0, perfiles - 50000) * (p50000 - p25000) / 25000 * factor_extra" }
---

# Costes — Klaviyo

## 1. Modelo de precios

- **Unidad de facturación:** perfiles activos (email/SMS), con créditos aparte para SMS e IA[^kv-pricing].
- **Qué incluye:** Plan gratuito: 250 perfiles activos, 500 emails/mes, 5 USD de créditos de mensajería móvil y 5 USD de créditos de IA. En los planes de pago, unos 10 emails al mes por perfil activo.
- **Mínimos y compromisos:** El plan gratuito bloquea el envío al superar sus límites. Desde febrero de 2025 se factura por todos los perfiles activos de la cuenta, no por los contactados.
- **Precio de lista:** La página oficial solo muestra el plan gratuito; el precio por tramo sale de un estimador. Tramos del plan Email según terceros (confianza baja): 500 perfiles 20 USD; 5.000 → 100 USD; 10.000 → 150 USD; 25.000 → 400 USD; 50.000 → 720 USD.[^kv-pricing][^kv-etester-pricing][^kv-usecarly-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 150 USD | 1.800 USD |
| M | 720 USD – 3.280 USD | 8.640 USD – 39.360 USD |
| L | 720 USD – 64.080 USD | 8.640 USD – 768.960 USD |

Modelo de precios de la ficha: plan Email con interpolación lineal entre los tramos publicados por terceros (en los tramos reales el precio es escalonado). Los perfiles del escenario son los perfiles activos.

- **S** (10.000 perfiles): coincide con el tramo de 10.000 perfiles, 150 USD.
- **M** (250.000 perfiles) y **L** (5 millones): superan el último tramo con precio conocido (50.000 perfiles, 720 USD). El coste es como mínimo el del último tramo y, como máximo, el que saldría extrapolando su precio marginal sin descuento por volumen. Por encima de ese tope Klaviyo no publica tarifa, así que el rango es amplio y solo orienta.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^kv-pricing]: Klaviyo, «Pricing», https://www.klaviyo.com/pricing, consultado 2026-09-30.
[^kv-etester-pricing]: EmailToolTester, «Klaviyo Pricing 2026», https://www.emailtooltester.com/en/reviews/klaviyo/pricing/, consultado 2026-10-02.
[^kv-usecarly-pricing]: Carly, «Klaviyo Pricing in 2026: What Active-Profile Billing Actually Costs», https://www.usecarly.com/blog/klaviyo-pricing/, consultado 2026-10-02.
