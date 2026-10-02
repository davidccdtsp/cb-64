---
candidato: databricks
fecha_revision: 2026-10-02
region_referencia: "Azure/AWS región UE (agregadores citan explícitamente una tarifa diferenciada para regiones UE, sin especificar cuál; no se ha localizado en esta revisión una región UE concreta con tarifa oficial desglosada)"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: dbu_mes, nombre: "DBU de SQL Serverless al mes (estimación del consultor)", unidad: "DBU", valor: { S: 200, M: 3000, L: 25000 } }
    - { id: precio_dbu_us, nombre: "Precio por DBU, SQL Serverless, región EE. UU.", unidad: "USD/DBU", valor: 0.70, fuente: db-pricing-3p }
    - { id: precio_dbu_ue, nombre: "Precio por DBU, SQL Serverless, región UE", unidad: "USD/DBU", valor: 0.91, fuente: db-pricing-page }
    - { id: precio_tb_cloud, nombre: "Almacenamiento en el cloud subyacente (objeto estándar, supuesto del consultor)", unidad: "USD/TB-mes", valor: 23 }
  variantes:
    - nombre: "SQL Serverless, región EE. UU."
      componentes:
        - { nombre: "Cómputo (DBU)", formula: "dbu_mes * precio_dbu_us" }
        - { nombre: "Almacenamiento (cloud subyacente)", formula: "tb_almacenados * precio_tb_cloud" }
    - nombre: "SQL Serverless, región UE"
      componentes:
        - { nombre: "Cómputo (DBU)", formula: "dbu_mes * precio_dbu_ue" }
        - { nombre: "Almacenamiento (cloud subyacente)", formula: "tb_almacenados * precio_tb_cloud" }
---

# Costes — Databricks

## 1. Modelo de precios

- **Unidad de facturación:** DBU (Databricks Unit), un valor normalizado de capacidad de procesamiento por hora, multiplicado por una tarifa en USD que varía según el tipo de cómputo (SQL Serverless, SQL Classic, All-Purpose, Jobs) y la nube subyacente. Se factura además el cómputo/almacenamiento de la nube subyacente (EC2/Azure VM/S3/ADLS) por separado[^db-pricing-page].
- **SQL Warehouses Serverless:** 0,70 USD/DBU en EE. UU. (SQL Pro, 0,55; SQL Classic, 0,22, ambos sin la infraestructura cloud) según un artículo de terceros[^db-pricing-3p], y 0,91 USD/DBU en regiones UE según fuentes agregadas. La página oficial de precios y su calculadora se cargan con JavaScript y no exponen las tarifas al leerlas de forma automática, así que ninguna cifra está verificada contra la tarifa oficial en esta revisión (2026-10-02): **confianza baja**[^db-pricing-page].
- **Qué incluye:** el DBU cubre el cómputo de la plataforma Databricks; en modo *classic* la infraestructura cloud subyacente (VM, red) se factura aparte directamente por el proveedor cloud. En modo *serverless* Databricks factura un DBU que ya incluye la infraestructura subyacente.
- **Mínimos y compromisos:** sin mínimo mensual publicado en el modelo pay-as-you-go; existen compromisos de consumo (DBCU) con descuento, no cuantificados en esta revisión.

## 2. Coste estimado por escenario

Estimación ilustrativa con SQL Warehouse Serverless y un consumo de DBU proporcional a las horas activas y la concurrencia pico de cada escenario (ver [`../escenarios.md`](../escenarios.md)). El rango va de la tarifa de EE. UU. (0,70 USD/DBU) a la de la UE (0,91 USD/DBU). El almacenamiento, que Databricks no factura, se estima con un supuesto del consultor de 23 USD/TB-mes de almacenamiento de objetos estándar del proveedor cloud.

| Escenario | DBU estimados/mes | Coste cómputo estimado/mes | Almacenamiento (cloud subyacente) | Coste mensual estimado |
|---|---|---|---|---|
| S | ≈ 200 | 140 – 182 USD | ≈ 23 USD (1 TB) | **≈ 163 – 205 USD** |
| M | ≈ 3.000 | 2.100 – 2.730 USD | ≈ 460 USD (20 TB) | **≈ 2.560 – 3.190 USD** |
| L | ≈ 25.000 | 17.500 – 22.750 USD | ≈ 4.600 USD (200 TB) | **≈ 22.100 – 27.350 USD** |

Los DBU por escenario son una estimación gruesa del consultor, no una cifra auditada ni calculada con la calculadora oficial de Databricks. El almacenamiento es un supuesto: depende del proveedor cloud elegido.

## 3. Advertencias obligatorias

- Precios de lista, sin descuentos por compromiso de consumo (DBCU).
- Las tarifas por DBU tienen **confianza baja**: proceden de terceros y agregadores, no de una lectura directa de la página oficial de precios (que no expone las cifras sin JavaScript).
- El coste de infraestructura cloud en modo *classic* no se ha estimado: la estimación usa SQL Serverless, que ya incluye la infraestructura, más el almacenamiento del cloud.

[^db-pricing-page]: Databricks Inc., «Databricks Pricing», https://www.databricks.com/product/pricing, consultado 2026-10-02.
[^db-pricing-3p]: Mammoth Analytics, «Databricks Pricing: $0.07–$0.70 a DBU, Plus Your Cloud Bill», https://mammoth.io/blog/databricks-pricing/, consultado 2026-10-02.
