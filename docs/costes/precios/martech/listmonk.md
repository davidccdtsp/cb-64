---
candidato: listmonk
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 30, max: 60 }, M: { min: 150, max: 350 }, L: { min: 800, max: 1800 } } }
    - { id: horas_operacion, nombre: "Horas de operación al mes (estimación del consultor)", unidad: "h/mes", valor: { S: 4, M: 12, L: 40 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
  variantes:
    - nombre: "OSS autoalojado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "horas_operacion * tarifa_hora" }
---

# Costes — listmonk

## 1. Modelo de precios

- **Unidad de facturación:** sin licencia (AGPL-3.0)[^lm-gh].
- **Qué incluye:** Todo el software.
- **Mínimos y compromisos:** Ninguno.
- **Precio de lista:** 0 EUR de licencia.[^lm-gh]

## 2. Coste estimado por escenario

### 2.1 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Binario único y PostgreSQL; el envío requiere proveedor SMTP (coste aparte). Ampliar a millones de emails exige cola y proveedor con capacidad suficiente.

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 30 – 60 | 4 h → 260 | **290 € – 320 €** | 3.480 € – 3.840 € |
| M | 150 – 350 | 12 h → 780 | **930 € – 1.130 €** | 11.160 € – 13.560 € |
| L | 800 – 1.800 | 40 h → 2600 | **3.400 € – 4.400 €** | 40.800 € – 52.800 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^lm-gh]: listmonk (GitHub), «knadh/listmonk», https://github.com/knadh/listmonk, consultado 2026-10-02.
