---
candidato: apache-unomi
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 120, max: 250 }, M: { min: 800, max: 1800 }, L: { min: 5000, max: 12000 } } }
    - { id: horas_operacion, nombre: "Horas de operación al mes (estimación del consultor)", unidad: "h/mes", valor: { S: 10, M: 40, L: 120 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
  variantes:
    - nombre: "OSS autoalojado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "horas_operacion * tarifa_hora" }
---

# Costes — Apache Unomi

## 1. Modelo de precios

- **Unidad de facturación:** sin licencia (software libre)[^uo-home].
- **Qué incluye:** Todo el software; el coste es de infraestructura (Elasticsearch/OpenSearch, Karaf) y operación.
- **Mínimos y compromisos:** Ninguno.
- **Precio de lista:** 0 EUR de licencia (Apache-2.0).[^uo-home][^uo-manual-arch]

## 2. Coste estimado por escenario

### 2.1 TCO autoalojado (EUR)

Supuestos (consultor, sin fuente factual; ver [`../../metodologia.md`](../../metodologia.md#7-bloque-b-martech)): operación a **65 €/hora**; horas/mes y rangos de infraestructura de la tabla. Requiere clúster Elasticsearch/OpenSearch y runtime Karaf; el rango de infraestructura contempla 1 nodo (S), 3 nodos (M) y clúster de 9 o más nodos (L).

| Escenario | Infraestructura (€/mes) | Operación (h/mes → €/mes) | TCO mensual | TCO anual |
|---|---|---|---|---|
| S | 120 – 250 | 10 h → 650 | **770 € – 900 €** | 9.240 € – 10.800 € |
| M | 800 – 1.800 | 40 h → 2600 | **3.400 € – 4.400 €** | 40.800 € – 52.800 € |
| L | 5.000 – 12.000 | 120 h → 7800 | **12.800 € – 19.800 €** | 153.600 € – 237.600 € |

No incluye soporte comercial, el warehouse (Bloque A) ni el proveedor de transporte de email.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^uo-home]: Apache Unomi, «Apache Unomi — Open Source Customer Data Platform», https://unomi.apache.org/, consultado 2026-10-02.
[^uo-manual-arch]: Apache Unomi, «Documentation — Architecture overview», https://unomi.apache.org/manual/latest/#_architecture_overview, consultado 2026-10-02.
