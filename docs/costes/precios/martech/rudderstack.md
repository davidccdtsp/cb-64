---
candidato: rudderstack
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 100, max: 200 }, M: { min: 700, max: 1500 }, L: { min: 4500, max: 10000 } } }
    - { id: horas_operacion, nombre: "Horas de operación al mes (estimación del consultor)", unidad: "h/mes", valor: { S: 8, M: 30, L: 100 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
  variantes:
    - nombre: "OSS autoalojado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "horas_operacion * tarifa_hora" }
---

# Costes — RudderStack

## 1. Modelo de precios

- **Unidad de facturación:** eventos al mes[^rud-pricing].
- **Qué incluye:** Todos los planes incluyen más de 200 destinos; Growth y Enterprise añaden miembros ilimitados y sincronizaciones de warehouse cada 30 y 5 minutos.
- **Mínimos y compromisos:** Free: 250 mil eventos/mes (16 fuentes SDK, 5 transformaciones). Growth: 1M–25M+ eventos con tramos. Enterprise a medida.
- **Precio de lista (confirmado el 2026-10-02):** Free 0 USD; Growth desde 265 USD/mes con 1 M de eventos (15 % menos con pago anual) y tramos de 3, 5, 7, 10 y 25 M de eventos cuyo importe no se publica; más de 25 M, a medida. Como la página no da el precio de cada tramo, el modelo cubre solo el autoalojamiento (TCO).[^rud-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | N/D | N/D |
| M | N/D | N/D |
| L | N/D | N/D |

S (2 millones de eventos) supera el tramo de entrada de Growth (1 M) y el importe del tramo no se publicó en la extracción: N/D. Referencia: desde 265 USD/mes. M y L: Growth por tramos o Enterprise sin cifra.

### 2.2 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Plano de datos autoalojado (rudder-server, Elastic License 2.0). Sin reverse ETL, transformaciones definidas por el usuario ni Live Events (funciones de la edición gestionada).

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 100 – 200 | 8 h → 520 | **620 € – 720 €** | 7.440 € – 8.640 € |
| M | 700 – 1.500 | 30 h → 1950 | **2.650 € – 3.450 €** | 31.800 € – 41.400 € |
| L | 4.500 – 10.000 | 100 h → 6500 | **11.000 € – 16.500 €** | 132.000 € – 198.000 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^rud-pricing]: RudderStack, «Pricing», https://www.rudderstack.com/pricing/, consultado 2026-10-02.
