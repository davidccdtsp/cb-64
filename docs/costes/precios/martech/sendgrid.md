---
candidato: sendgrid
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
---

# Costes — Twilio SendGrid

## 1. Modelo de precios

- **Unidad de facturación:** emails al mes por tramo (de menos de 3.000 a más de 5 millones) y complementos (IP dedicada, validación)[^sgd-pricing].
- **Qué incluye:** La IP dedicada es un complemento de pago; Marketing Campaigns tiene precio propio.
- **Mínimos y compromisos:** Prueba gratuita de 60 días con 100 emails al día.
- **Precio de lista (página oficial, 2026-10-02):** prueba gratuita de 60 días (0 USD, 100 emails al día); Essentials desde 19,95 USD al mes y Pro desde 89,95 USD al mes, con volúmenes de 50.000, 100.000, 300.000, 700.000, 1,5 M, 2,5 M y más de 5 M emails; ambos incluyen una IP dedicada; Premier a medida; IP adicionales de pago. La página no muestra el precio de cada tramo: un tercero (confianza baja) cita Essentials 19,95 USD (50.000) y 34,95 USD (100.000), y Pro 89,95 USD (100.000), 249 USD (300.000), 499 USD (700.000), 799 USD (1,5 M) y 1.099 USD (2,5 M).[^sgd-pricing][^sgd-pricing-3p][^sgd-trial]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 19,95 USD – 89,95 USD | 239,40 USD – 1.079,40 USD |
| M | 799 USD – 1.099 USD | 9.588 USD – 13.188 USD |
| L | N/D | N/D |

S (50.000 emails): de Essentials (19,95 USD) a Pro (89,95 USD, el primer tramo de Pro es de 100.000). M (2 millones): entre los tramos de Pro de 1,5 M (799 USD) y 2,5 M (1.099 USD), ya que el precio de Essentials para ese volumen no está publicado. L (50 millones): supera los 5 millones, donde el precio es «a medida»; `N/D`. Las cifras de tramo son de un tercero (confianza baja). No se añade modelo de precios: faltan los precios de Essentials por encima de 100.000 emails y el precio por encima de 2,5 M.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^sgd-pricing]: Twilio, «Twilio SendGrid Email API pricing», https://www.twilio.com/en-us/products/email-api/pricing, consultado 2026-10-02.
[^sgd-pricing-3p]: Spendflo, «SendGrid Pricing: Plans, Features, and Best Deals Explained», https://www.spendflo.com/blog/sendgrid-pricing-guide, consultado 2026-10-02.
[^sgd-trial]: SendGrid Support, «Overview of 60-Day Free Trial Plans», https://support.sendgrid.com/hc/en-us/articles/35270136965403-Twilio-SendGrid-Trial-Account-Plan, consultado 2026-09-30.
