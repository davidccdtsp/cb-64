---
candidato: mautic
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 60, max: 120 }, M: { min: 400, max: 900 }, L: { min: 2500, max: 6000 } } }
    - { id: horas_operacion, nombre: "Horas de operación al mes (estimación del consultor)", unidad: "h/mes", valor: { S: 8, M: 30, L: 100 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
  variantes:
    - nombre: "OSS autoalojado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "horas_operacion * tarifa_hora" }
---

# Costes — Mautic

## 1. Modelo de precios

- **Unidad de facturación:** sin licencia (GPL-3.0)[^mt-hosting].
- **Qué incluye:** Todo el software; hosting gestionado de terceros con precios propios.
- **Mínimos y compromisos:** Prueba de 14 días en hosting gestionado de la comunidad.
- **Precio de lista:** 0 EUR de licencia.[^mt-hosting][^mt-gh]

## 2. Coste estimado por escenario

### 2.1 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Requiere PHP y base de datos; el envío de email requiere un proveedor de transporte (coste aparte, véase Amazon SES).

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 60 – 120 | 8 h → 520 | **580 € – 640 €** | 6.960 € – 7.680 € |
| M | 400 – 900 | 30 h → 1950 | **2.350 € – 2.850 €** | 28.200 € – 34.200 € |
| L | 2.500 – 6.000 | 100 h → 6500 | **9.000 € – 12.500 €** | 108.000 € – 150.000 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^mt-hosting]: Mautic, «Mautic Hosting», https://mautic.org/start-using-mautic/mautic-hosting/, consultado 2026-10-02.
[^mt-gh]: Mautic (GitHub), «mautic/mautic», https://github.com/mautic/mautic, consultado 2026-10-02.
