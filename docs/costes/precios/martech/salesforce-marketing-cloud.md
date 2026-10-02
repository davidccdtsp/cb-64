---
candidato: salesforce-marketing-cloud
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: precio_pro, nombre: "Pro+ (hasta 15.000 contactos)", unidad: "USD/mes", valor: 2000, fuente: sm-pricing }
    - { id: precio_corp, nombre: "Corporate+ (hasta 45.000 contactos)", unidad: "USD/mes", valor: 5500, fuente: sm-pricing }
    - { id: precio_ent, nombre: "Enterprise+ (hasta 500.000 contactos)", unidad: "USD/mes", valor: 30000, fuente: sm-pricing }
    - { id: tope_pro, nombre: "Contactos incluidos en Pro+", unidad: "contactos", valor: 15000, fuente: sm-pricing }
    - { id: tope_corp, nombre: "Contactos incluidos en Corporate+", unidad: "contactos", valor: 45000, fuente: sm-pricing }
    - { id: tope_ent, nombre: "Contactos incluidos en Enterprise+", unidad: "contactos", valor: 500000, fuente: sm-pricing }
    - { id: factor_extra, nombre: "Parte del precio de Enterprise+ por contacto que se extrapola por encima del tope (0 = ninguna, 1 = sin descuento por volumen)", valor: { min: 0, max: 1 } }
  variantes:
    - nombre: "Edición según contactos"
      componentes:
        - { nombre: "Edición (Pro+, Corporate+ o Enterprise+)", formula: "precio_pro + (precio_corp - precio_pro) * ceil(min(1, max(0, perfiles - tope_pro) / 1000000)) + (precio_ent - precio_corp) * ceil(min(1, max(0, perfiles - tope_corp) / 1000000))" }
        - { nombre: "Contactos por encima del tope de Enterprise+ (extrapolación)", formula: "max(0, perfiles - tope_ent) * precio_ent / tope_ent * factor_extra" }
---

# Costes — Salesforce Marketing Cloud (Engagement)

## 1. Modelo de precios

- **Unidad de facturación:** edición «+» por organización y mes (facturación anual) con topes de contactos y emails[^sm-pricing].
- **Qué incluye:** Pro+: 15 mil contactos, 2,5 M emails, Marketing Cloud Growth. Corporate+: 45 mil contactos, 10 M emails, 1 M mensajes de app, Marketing Cloud Advanced. Enterprise+: 500 mil contactos, 150 M emails, 10 M mensajes de app.
- **Mínimos y compromisos:** Facturación anual. Planes de éxito (desde estándar gratuito hasta Signature).
- **Precio de lista:** Pro+ 2.000 USD/mes; Corporate+ 5.500 USD/mes; Enterprise+ 30.000 USD/mes.[^sm-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 2.000 USD | 24.000 USD |
| M | 30.000 USD | 360.000 USD |
| L | 30.000 USD – 300.000 USD | 360.000 USD – 3.600.000 USD |

Modelo de precios de la ficha: la edición se elige por el número de contactos (Pro+ hasta 15.000, Corporate+ hasta 45.000, Enterprise+ hasta 500.000); los topes de emails de las tres ediciones cubren los tres escenarios.

- **S** (10.000 contactos, 50.000 emails): Pro+, 2.000 USD.
- **M** (250.000 contactos): supera Corporate+ (45.000) y requiere Enterprise+, 30.000 USD.
- **L** (5 millones de contactos): excede el tope publicado de Enterprise+ (500.000). El coste es como mínimo el de Enterprise+ y, como máximo, el que saldría extrapolando su precio por contacto sin descuento por volumen; fuera de la lista, el precio sería a medida, por lo que el rango es muy amplio y solo orienta.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^sm-pricing]: Salesforce, «Marketing Cloud Engagement Pricing», https://www.salesforce.com/marketing/engagement/pricing/, consultado 2026-09-30.

