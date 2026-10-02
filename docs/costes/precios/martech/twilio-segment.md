---
candidato: twilio-segment
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: cuota_team, nombre: "Team, cuota base (incluye 10.000 MTU)", unidad: "USD/mes", valor: 120, fuente: sg-pricing-connections }
    - { id: mtu_incluidos, nombre: "MTU incluidos", unidad: "MTU", valor: 10000, fuente: sg-pricing-connections }
    - { id: precio_tramo_1, nombre: "MTU adicional, de 10.000 a 25.000", unidad: "USD/MTU", valor: 0.012, fuente: sg-pricing-connections }
    - { id: precio_tramo_2, nombre: "MTU adicional, de 25.000 a 100.000", unidad: "USD/MTU", valor: 0.011, fuente: sg-pricing-connections }
    - { id: precio_tramo_3, nombre: "MTU adicional, por encima de 100.000", unidad: "USD/MTU", valor: 0.01, fuente: sg-pricing-connections }
  variantes:
    - nombre: "Connections, plan Team"
      componentes:
        - { nombre: "Cuota base", formula: "cuota_team" }
        - { nombre: "MTU adicionales (por tramos)", formula: "max(0, min(mtu, 25000) - mtu_incluidos) * precio_tramo_1 + max(0, min(mtu, 100000) - 25000) * precio_tramo_2 + max(0, mtu - 100000) * precio_tramo_3" }
---

# Costes — Twilio Segment

## 1. Modelo de precios

- **Unidad de facturación:** MTU (usuarios activos mensuales + visitantes anónimos)[^sg-pricing-connections].
- **Qué incluye:** Connections (recogida y envío a más de 700 destinos); Unify y Engage solo en la CDP completa.
- **Mínimos y compromisos:** Free: 1.000 MTU. Team: 120 USD/mes con 10.000 MTU, 10 asientos y dos sincronizaciones de warehouse al día.
- **Precio de lista:** Team 120 USD/mes base (10.000 MTU); MTU adicionales a 12 USD por 1.000 (de 10.000 a 25.000), 11 USD (de 25.000 a 100.000) y 10 USD (por encima), según la página oficial el 2026-10-02. CDP completa (Connections + Unify + Engage): «contactar con ventas».[^sg-pricing-connections][^sg-pricing-cdp]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 355 USD | 4.260 USD |
| M | 6.125 USD | 73.500 USD |
| L | 120.125 USD | 1.441.500 USD |

Plan Team de Connections (solo recogida y envío de datos, sin Unify ni Engage). S (30.000 MTU): 120 + 15.000 × 0,012 + 5.000 × 0,011 = 355 USD. M (600.000 MTU): 120 + 180 + 75.000 × 0,011 + 500.000 × 0,010 = 6.125 USD. L (12 millones): 120 + 180 + 825 + 11.900.000 × 0,010 = 120.125 USD. Con esos volúmenes el fabricante ofrece el plan Business, con precio a medida y descuentos (hasta un 20 % por pago anual): M y L son cotas superiores de lista.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^sg-pricing-connections]: Twilio, «Connections pricing», https://www.twilio.com/en-us/products/connections/pricing, consultado 2026-10-02.
[^sg-pricing-cdp]: Twilio, «Customer Data Platform Pricing», https://www.twilio.com/en-us/pricing/customer-data, consultado 2026-09-30.
