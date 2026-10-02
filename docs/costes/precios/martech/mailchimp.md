---
candidato: mailchimp
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: s500, nombre: "Standard, hasta 500 contactos", unidad: "USD/mes", valor: 20, fuente: mc-groupmail-pricing }
    - { id: s5000, nombre: "Standard, 5.000 contactos", unidad: "USD/mes", valor: 100, fuente: mc-groupmail-pricing }
    - { id: s10000, nombre: "Standard, 10.000 contactos", unidad: "USD/mes", valor: 135, fuente: mc-groupmail-pricing }
    - { id: s25000, nombre: "Standard, 25.000 contactos", unidad: "USD/mes", valor: 310, fuente: mc-groupmail-pricing }
    - { id: s50000, nombre: "Standard, 50.000 contactos", unidad: "USD/mes", valor: 450, fuente: mc-groupmail-pricing }
    - { id: r10000, nombre: "Premium, hasta 10.000 contactos", unidad: "USD/mes", valor: 350, fuente: mc-groupmail-pricing }
    - { id: r25000, nombre: "Premium, 25.000 contactos", unidad: "USD/mes", valor: 620, fuente: mc-groupmail-pricing }
    - { id: r50000, nombre: "Premium, 50.000 contactos", unidad: "USD/mes", valor: 815, fuente: mc-groupmail-pricing }
    - { id: factor_extra, nombre: "Parte del precio del último tramo que se extrapola por encima de 50.000 contactos (0 = ninguna, 1 = sin descuento por volumen)", valor: { min: 0, max: 1 } }
  variantes:
    - nombre: Standard
      componentes:
        - { nombre: "Contactos (interpolación entre los tramos publicados)", formula: "s500 + (s5000 - s500) * max(0, min(perfiles, 5000) - 500) / 4500 + (s10000 - s5000) * max(0, min(perfiles, 10000) - 5000) / 5000 + (s25000 - s10000) * max(0, min(perfiles, 25000) - 10000) / 15000 + (s50000 - s25000) * max(0, min(perfiles, 50000) - 25000) / 25000" }
        - { nombre: "Contactos por encima de 50.000 (extrapolación)", formula: "max(0, perfiles - 50000) * (s50000 - s25000) / 25000 * factor_extra" }
    - nombre: Premium
      componentes:
        - { nombre: "Contactos (interpolación entre los tramos publicados)", formula: "r10000 + (r25000 - r10000) * max(0, min(perfiles, 25000) - 10000) / 15000 + (r50000 - r25000) * max(0, min(perfiles, 50000) - 25000) / 25000" }
        - { nombre: "Contactos por encima de 50.000 (extrapolación)", formula: "max(0, perfiles - 50000) * (r50000 - r25000) / 25000 * factor_extra" }
---

# Costes — Mailchimp

## 1. Modelo de precios

- **Unidad de facturación:** contactos (por tramo) y plan[^mc-pricing].
- **Qué incluye:** Free: 250 contactos. Essentials: 3 audiencias, 2 roles, A/B. Standard: 5 audiencias, 3 usuarios, 200 pasos de flujo. Premium: usuarios y audiencias ilimitados, hasta 150.000 emails mensuales.
- **Mínimos y compromisos:** Prueba de 14 días de Standard sin tarjeta.
- **Precio de lista:** En la página oficial (en EUR), Essentials desde 11,54 EUR/mes, Standard desde 17,75 EUR/mes y Premium desde 310,69 EUR/mes en el tramo de entrada (500 contactos), con un 15 % de descuento los primeros 12 meses.[^mc-pricing]
- **Precio por tramo:** la página oficial no expone la tabla. Dos terceros (confianza baja) publican tablas en USD que coinciden en Standard con 10.000 contactos (135 USD), 50.000 (450 USD) y Premium con 10.000 (350 USD), pero discrepan en 100.000 contactos de Standard (650 frente a 800 USD).[^mc-groupmail-pricing][^mc-evs-pricing] Se usa la tabla de GroupMail hasta 50.000 contactos, el tramo en el que ambas coinciden.

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 135 USD – 350 USD | 1.620 USD – 4.200 USD |
| M | 450 USD – 2.375 USD | 5.400 USD – 28.500 USD |
| L | 450 USD – 39.425 USD | 5.400 USD – 473.100 USD |

Modelo de precios de la ficha, en USD: planes Standard y Premium con interpolación lineal entre los tramos publicados por terceros; el rango abarca desde Standard hasta Premium. Por eso esta ficha pasa de EUR a USD.

- **S** (10.000 contactos): Standard 135 USD y Premium 350 USD.
- **M** (250.000 contactos) y **L** (5 millones): superan el último tramo con precio coincidente (50.000 contactos). El coste es como mínimo el del último tramo y, como máximo, el que saldría extrapolando su precio marginal sin descuento por volumen. Mailchimp no publica tarifa por encima de 200.000 contactos, así que el rango es amplio y solo orienta.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^mc-pricing]: Mailchimp, «Pricing — Marketing», https://mailchimp.com/pricing/marketing/, consultado 2026-09-30.
[^mc-groupmail-pricing]: GroupMail, «Mailchimp Pricing 2026: What You Pay at Every Tier», https://blog.groupmail.io/mailchimp-pricing-2026/, consultado 2026-10-02.
[^mc-evs-pricing]: Email Vendor Selection, «Mailchimp Pricing 2026: Is it too expensive?», https://www.emailvendorselection.com/mailchimp-pricing/, consultado 2026-10-02.
