---
candidato: dittofeed
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: cuota_cloud, nombre: "Cloud Pro, cuota base (incluye 10.000 usuarios únicos)", unidad: "USD/mes", valor: 75, fuente: df-pricing }
    - { id: usuarios_incluidos, nombre: "Usuarios únicos incluidos", unidad: "usuarios", valor: 10000, fuente: df-pricing }
    - { id: precio_tramo_1, nombre: "Usuario adicional, de 10.000 a 100.000", unidad: "USD/usuario", valor: 0.004, fuente: df-pricing }
    - { id: precio_tramo_2, nombre: "Usuario adicional, de 100.000 a 500.000", unidad: "USD/usuario", valor: 0.002, fuente: df-pricing }
    - { id: precio_tramo_3, nombre: "Usuario adicional, por encima de 500.000", unidad: "USD/usuario", valor: 0.001, fuente: df-pricing }
  variantes:
    - nombre: "Cloud Pro"
      componentes:
        - { nombre: "Cuota base", formula: "cuota_cloud" }
        - { nombre: "Usuarios adicionales (por tramos)", formula: "max(0, min(perfiles, 100000) - usuarios_incluidos) * precio_tramo_1 + max(0, min(perfiles, 500000) - 100000) * precio_tramo_2 + max(0, perfiles - 500000) * precio_tramo_3" }
---

# Costes — Dittofeed

## 1. Modelo de precios

- **Unidad de facturación:** usuarios únicos al mes[^df-pricing].
- **Qué incluye:** Cloud Pro: hosting e integraciones completas. Enterprise: autenticación multi-tenant avanzada, marca blanca y componentes embebidos.
- **Mínimos y compromisos:** Prueba de 14 días.
- **Precio de lista:** Cloud Pro 75 USD/mes (10.000 usuarios únicos); 0,004 USD por usuario entre 10 mil y 100 mil; 0,002 entre 100 mil y 500 mil; 0,001 por encima de 500 mil.[^df-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 75,00 USD | 900 USD |
| M | 735 USD | 8.820 USD |
| L | 5.735 USD | 68.820 USD |

Modelo de precios de la ficha: solo la oferta Cloud Pro; el TCO autoalojado de 2.2 no entra en el total. Precios confirmados en la página oficial el 2026-10-02. Supuesto: usuarios únicos = perfiles del escenario. M: 75 + 90.000×0,004 + 150.000×0,002 = 735. L: 75 + 360 + 800 + 4.500 = 5.735. No incluye el proveedor de email/SMS.

### 2.2 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Autoalojamiento gratuito sin límites de uso (MIT); el envío requiere proveedor de transporte.

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 60 – 120 | 6 h → 390 | **450 € – 510 €** | 5.400 € – 6.120 € |
| M | 400 – 900 | 24 h → 1560 | **1.960 € – 2.460 €** | 23.520 € – 29.520 € |
| L | 2.500 – 6.000 | 80 h → 5200 | **7.700 € – 11.200 €** | 92.400 € – 134.400 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^df-pricing]: Dittofeed, «Pricing», https://www.dittofeed.com/pricing, consultado 2026-10-02.
