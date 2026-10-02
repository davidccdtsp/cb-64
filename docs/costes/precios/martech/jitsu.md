---
candidato: jitsu
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: cuota_business, nombre: "Business, cuota base (incluye 2 M de eventos activos)", unidad: "USD/mes", valor: 99, fuente: jt-pricing }
    - { id: eventos_incluidos, nombre: "Eventos activos incluidos", unidad: "eventos/mes", valor: 2000000, fuente: jt-pricing }
    - { id: precio_millon, nombre: "Millón de eventos activos adicional", unidad: "USD/millón", valor: 40, fuente: jt-pricing }
  variantes:
    - nombre: Business
      componentes:
        - { nombre: "Cuota base", formula: "cuota_business" }
        - { nombre: "Eventos activos adicionales", formula: "max(0, eventos_mes - eventos_incluidos) / 1000000 * precio_millon" }
---

# Costes — Jitsu

## 1. Modelo de precios

- **Unidad de facturación:** eventos activos (enviados con éxito a al menos un destino); los eventos capturados no facturan[^jt-pricing].
- **Qué incluye:** Destinos ilimitados en todos los planes; Business añade 2M eventos activos y sincronizaciones de conectores cada hora (5 activas).
- **Mínimos y compromisos:** Free 0 USD (200 mil eventos activos/mes). Business 99 USD/mes con 2 millones de eventos activos; 40 USD por cada millón adicional; 20 USD por sincronización adicional. Enterprise a medida.
- **Precio de lista:** Business: 99 USD/mes + 40 USD por millón de eventos activos adicionales.[^jt-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 99,00 USD | 1.188 USD |
| M | 2.019 USD | 24.228 USD |
| L | 40.019 USD | 480.228 USD |

Modelo de precios de la ficha: solo el plan Business; el TCO autoalojado de 2.2 no entra en el total. Precios confirmados en la página oficial el 2026-10-02. Supuesto: todos los eventos del escenario son activos. Cálculo: 99 + (eventos/1 M − 2) × 40. Por encima de decenas de millones de eventos es previsible una negociación Enterprise (no publicada), por lo que M y L son precios de lista máximos.

### 2.2 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Edición MIT autoalojada sin límites de uso; despliegue en Kubernetes recomendado. Incluye ClickHouse propio si se usa el almacenamiento por defecto.

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 80 – 150 | 6 h → 390 | **470 € – 540 €** | 5.640 € – 6.480 € |
| M | 500 – 1.200 | 24 h → 1560 | **2.060 € – 2.760 €** | 24.720 € – 33.120 € |
| L | 3.500 – 8.000 | 80 h → 5200 | **8.700 € – 13.200 €** | 104.400 € – 158.400 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^jt-pricing]: Jitsu, «Pricing», https://jitsu.com/pricing, consultado 2026-10-02.
