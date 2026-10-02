---
candidato: census
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
---

# Costes — Census (Fivetran Activations)

## 1. Modelo de precios

- **Unidad de facturación:** filas activas mensuales (MAR: claves primarias añadidas, actualizadas o borradas en el mes; cada fila cuenta una vez)[^fv-blog-census-joins].
- **Qué incluye:** Usuarios ilimitados; plan Enterprise incluye Audience Hub. Prueba de 14 días en cada conexión.
- **Mínimos y compromisos:** Plan Free con 3.500 MAR de Activations; los contratos anuales heredados de Census continúan hasta su vencimiento.
- **Precio de lista:** sin importe por MAR publicado; la página de precios de Fivetran (2026-10-02) da solo ejemplos (12.007 MAR por 202,25 USD al mes y 9.934 MAR por 197,96 USD, en conexiones con curvas de coste distintas), insuficientes para modelar; existe un estimador de precios en el sitio de Fivetran.[^fv-blog-census-joins][^fv-act-migration-faq]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | N/D | N/D |
| M | N/D | N/D |
| L | N/D | N/D |

Sin tarifa por MAR citable; el estimador no es un dato estático.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^fv-blog-census-joins]: Fivetran, «Census joins Fivetran’s consumption-based pricing», https://www.fivetran.com/blog/census-joins-fivetrans-consumption-based-pricing, consultado 2026-09-30.
[^fv-act-migration-faq]: Fivetran Docs, «Census Migration Frequently Asked Questions», https://fivetran.com/docs/activations/census-migration-faq, consultado 2026-09-30.
