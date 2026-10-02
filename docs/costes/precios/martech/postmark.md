---
candidato: postmark
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: incluidos, nombre: "Emails incluidos en cada plan", unidad: "emails/mes", valor: 10000, fuente: pm-pricing }
    - { id: cuota_basic, nombre: "Basic, cuota base", unidad: "USD/mes", valor: 15, fuente: pm-pricing }
    - { id: extra_basic, nombre: "Basic, email adicional", unidad: "USD/1.000 emails", valor: 1.8, fuente: pm-pricing }
    - { id: cuota_pro, nombre: "Pro, cuota base", unidad: "USD/mes", valor: 16.5, fuente: pm-pricing }
    - { id: extra_pro, nombre: "Pro, email adicional", unidad: "USD/1.000 emails", valor: 1.3, fuente: pm-pricing }
    - { id: cuota_platform, nombre: "Platform, cuota base", unidad: "USD/mes", valor: 18, fuente: pm-pricing }
    - { id: extra_platform, nombre: "Platform, email adicional", unidad: "USD/1.000 emails", valor: 1.2, fuente: pm-pricing }
  variantes:
    - nombre: Basic
      componentes:
        - { nombre: "Cuota y emails adicionales", formula: "cuota_basic + max(0, emails_mes - incluidos) / 1000 * extra_basic" }
    - nombre: Pro
      componentes:
        - { nombre: "Cuota y emails adicionales", formula: "cuota_pro + max(0, emails_mes - incluidos) / 1000 * extra_pro" }
    - nombre: Platform
      componentes:
        - { nombre: "Cuota y emails adicionales", formula: "cuota_platform + max(0, emails_mes - incluidos) / 1000 * extra_platform" }
---

# Costes — Postmark

## 1. Modelo de precios

- **Unidad de facturación:** emails al mes (10.000 incluidos por plan) con sobrecoste por 1.000[^pm-pricing].
- **Qué incluye:** Todos los planes de pago: API, SMTP, Multi-Region Routing y envíos diarios ilimitados. Pro/Platform: correo entrante y retención configurable (desde 5 USD/mes). Complemento: monitorización DMARC desde 14 USD/mes por dominio. Importes confirmados en la página oficial el 2026-10-02.
- **Mínimos y compromisos:** Los emails no usados no se acumulan. Descuentos por volumen bajo petición.
- **Precio de lista:** Free 0 USD (100 emails). Basic 15 USD + 1,80 USD/1.000 extra. Pro 16,50 USD + 1,30 USD/1.000. Platform 18 USD + 1,20 USD/1.000. IP dedicada desde 50 USD/mes (mín. 300.000 emails/mes, Pro o superior).[^pm-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 66,00 USD – 87,00 USD | 792 USD – 1.044 USD |
| M | 2.406 USD – 3.597 USD | 28.872 USD – 43.164 USD |
| L | 60.006 USD – 89.997 USD | 720.072 USD – 1.079.964 USD |

Rango entre el plan Platform (más barato) y Basic (más caro), con (emails − 10.000)/1.000 × sobrecoste. Los descuentos por volumen no son públicos, por lo que M y L son precios de lista máximos.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^pm-pricing]: Postmark, «Pricing», https://postmarkapp.com/pricing, consultado 2026-10-02.
