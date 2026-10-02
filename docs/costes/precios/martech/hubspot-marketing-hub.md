---
candidato: hubspot-marketing-hub
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: precio_base, nombre: "Professional: cuota base mensual (800 pagando al mes, 890 con compromiso anual)", unidad: "USD/mes", valor: { min: 800, max: 890 }, fuente: hs-pricing-pro }
    - { id: contactos_incluidos, nombre: "Contactos de marketing incluidos", unidad: "contactos", valor: 2000, fuente: hs-pricing-pro }
    - { id: asientos_incluidos, nombre: "Asientos incluidos", unidad: "asientos", valor: 3, fuente: hs-pricing-pro }
    - { id: precio_asiento, nombre: "Asiento adicional", unidad: "USD/asiento-mes", valor: 45, fuente: hs-pricing-pro }
    - { id: paso_contactos, nombre: "Tamaño del tramo de contactos adicionales", unidad: "contactos", valor: 5000, fuente: hs-impactplus-pricing }
    - { id: precio_paso, nombre: "Precio de cada tramo de contactos adicionales", unidad: "USD/mes", valor: 250, fuente: hs-impactplus-pricing }
    - { id: tope_contactos, nombre: "Contactos hasta los que se aplica la tarifa por tramos", unidad: "contactos", valor: 100000 }
    - { id: factor_extra, nombre: "Parte del precio por tramo que se extrapola por encima del tope (0 = ninguna, 1 = sin descuento por volumen)", valor: { min: 0, max: 1 } }
  variantes:
    - nombre: "Marketing Hub Professional"
      componentes:
        - { nombre: "Cuota base", formula: "precio_base" }
        - { nombre: "Contactos adicionales (tramos de 5.000)", formula: "ceil(max(0, min(perfiles, tope_contactos) - contactos_incluidos) / paso_contactos) * precio_paso" }
        - { nombre: "Contactos por encima del tope (extrapolación)", formula: "max(0, perfiles - tope_contactos) / paso_contactos * precio_paso * factor_extra" }
        - { nombre: "Asientos adicionales", formula: "max(0, usuarios - asientos_incluidos) * precio_asiento" }
---

# Costes — HubSpot Marketing Hub

## 1. Modelo de precios

- **Unidad de facturación:** asientos y contactos de marketing (con créditos HubSpot incluidos)[^hs-pricing].
- **Qué incluye:** Professional: 3 asientos, 2.000 contactos, 3.000 créditos. Enterprise: 5 asientos, 10.000 contactos, 5.000 créditos.
- **Mínimos y compromisos:** Cuota única de incorporación: 3.000 USD (Professional) y 7.000 USD (Enterprise). No entra en el coste mensual.
- **Precio de lista:** Free 0; Starter desde 7 USD por asiento (1.000 contactos); Professional 800 USD/mes pagando mensualmente u 890 USD/mes con compromiso anual (la página oficial muestra ambas cifras); Enterprise desde 3.600 USD/mes. Asiento adicional: 45 USD/mes (Professional) y 75 USD/mes (Enterprise).[^hs-pricing][^hs-pricing-pro]
- **Contactos adicionales:** HubSpot no publica la tabla de tramos en su página. Una fuente de terceros (2023, confianza baja) indica 250 USD/mes por cada 5.000 contactos adicionales en Professional.[^hs-impactplus-pricing] Para Enterprise no hay tarifa pública de contactos adicionales.

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 1.300 USD – 1.390 USD | 15.600 USD – 16.680 USD |
| M | 6.340 USD – 13.930 USD | 76.080 USD – 167.160 USD |
| L | 8.365 USD – 253.455 USD | 100.380 USD – 3.041.460 USD |

Modelo de precios de la ficha: solo la edición Professional (Enterprise no se modela por no haber tarifa pública de contactos adicionales). Coste = cuota base (800–890 USD) + tramos de 5.000 contactos sobre los 2.000 incluidos × 250 USD + asientos por encima de 3 × 45 USD. Los contactos de marketing se igualan a los perfiles del escenario.

- **S** (10.000 contactos, 3 usuarios): 2 tramos adicionales (500 USD) sobre la cuota base. El rango sale de la cuota mensual frente a la anual.
- **M** (250.000 contactos, 15 usuarios): la tarifa por tramos solo se aplica hasta 100.000 contactos (supuesto del consultor, sin tarifa pública por encima); el exceso se extrapola con un factor entre 0 (sin coste adicional, cota inferior) y 1 (mismo precio por tramo, sin descuento por volumen). Más 12 asientos adicionales (540 USD).
- **L** (5 millones de contactos, 60 usuarios): fuera de cualquier tarifa publicada; mismo criterio, por lo que el rango es muy amplio y solo orienta.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^hs-pricing]: HubSpot, «Marketing Hub pricing», https://www.hubspot.com/pricing/marketing, consultado 2026-09-30.
[^hs-pricing-pro]: HubSpot, «Marketing Hub Professional pricing», https://www.hubspot.com/pricing/marketing/professional, consultado 2026-10-02.
[^hs-impactplus-pricing]: Impact, «HubSpot Pricing: Your Guide to Everything HubSpot Costs», https://www.impactplus.com/blog/hubspot-pricing-cost, consultado 2026-10-02.
