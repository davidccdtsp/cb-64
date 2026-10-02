---
candidato: bigquery
fecha_revision: 2026-10-02
region_referencia: "us-central1 / europe-west1 (las tarifas listadas de referencia coinciden en USD para ambas regiones base; otras regiones pueden tener recargos)"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: precio_tib, nombre: "Precio por TiB escaneado (on-demand)", unidad: "USD/TiB", valor: 6.25, fuente: bq-pricing-page }
    - { id: tib_gratis_mes, nombre: "TiB de consulta gratuitos al mes", unidad: "TiB", valor: 1, fuente: bq-pricing-page }
    - { id: precio_gb_mes_logico_activo, nombre: "Almacenamiento lógico activo", unidad: "USD/GB-mes", valor: 0.02, fuente: bq-pricing-page }
    - { id: precio_gb_mes_logico_largo_plazo, nombre: "Almacenamiento lógico a largo plazo", unidad: "USD/GB-mes", valor: 0.01, fuente: bq-pricing-page }
    - { id: precio_gb_mes_fisico_activo, nombre: "Almacenamiento físico activo", unidad: "USD/GB-mes", valor: 0.04, fuente: bq-pricing-page }
    - { id: precio_gb_mes_fisico_largo_plazo, nombre: "Almacenamiento físico a largo plazo", unidad: "USD/GB-mes", valor: 0.02, fuente: bq-pricing-page }
    - { id: dias_mes, nombre: "Días de consulta por mes", unidad: "días", valor: 30 }
  variantes:
    - nombre: On-demand
      componentes:
        - { nombre: "Consultas (TiB escaneados)", formula: "max(0, tb_escaneados_dia * dias_mes - tib_gratis_mes) * precio_tib" }
        - { nombre: "Almacenamiento activo", formula: "tb_almacenados * 1000 * precio_gb_mes_logico_activo" }
---

# Costes — Google BigQuery

## 1. Modelo de precios

### Consultas (Compute)
- **On-demand:** 6,25 USD por TiB escaneado, con el primer 1 TiB totalmente gratuito al mes[^bq-pricing-page].
- **Capacity Pricing (Editions):** Facturación por capacidad de computación mediante *ranuras (slots)*. El coste por *slot-hora* varía según la edición y el nivel de compromiso (Pay-as-you-go, 1 año o 3 años). A continuación, se muestra el precio base correspondiente a regiones como `us-central1` o `europe-west1`[^bq-pricing-page]:

| Edición | Pay-as-you-go (USD/slot-hora) | Compromiso 1 año (USD/slot-hora) | Compromiso 3 años (USD/slot-hora) | Notas principales |
|---|---|---|---|---|
| **Standard** | 0,04 USD | 0,036 USD | 0,032 USD | Sin compromisos forzosos (mín. 1 minuto por consulta). |
| **Enterprise** | 0,06 USD | 0,048 USD | 0,036 USD | Descuentos agresivos, seguridad mejorada y soporte a la gobernanza de datos. |
| **Enterprise Plus** | 0,10 USD | 0,08 USD | 0,06 USD | Máximo rendimiento, IA y Machine Learning (ML) avanzado, máxima disponibilidad. |

### Almacenamiento
BigQuery factura el almacenamiento de forma independiente a la computación. Existen dos modelos: **lógico** (sin comprimir) y **físico** (comprimido)[^bq-pricing-page]. En ambos casos, los primeros 10 GiB al mes son gratuitos.

| Tipo de Almacenamiento | Activo (USD/GB-mes) | A largo plazo (>90 días sin modificar) (USD/GB-mes) |
|---|---|---|
| **Lógico** (por defecto) | 0,02 USD | 0,01 USD |
| **Físico** (datos comprimidos) | 0,04 USD | 0,02 USD |

- **Qué no incluye:** El precio no incluye explícitamente el coste de BigLake/almacenamiento externo en un bucket del cliente, que se factura aparte según las tarifas de Google Cloud Storage.
- **Mínimos y compromisos:** No existe un mínimo en on-demand[cite: 1]; sin embargo, la compra de compromisos (CUD) para las ranuras en Editions exige un mínimo de contratación (normalmente a partir de 50 o 100 slots) por 1 o 3 años para aplicar el descuento.

## 2. Coste estimado por escenario

Estimación combinando on-demand (para el volumen escaneado) y almacenamiento lógico activo, apoyada en los parámetros de [`../escenarios.md`](../../escenarios.md).

| Escenario | TiB escaneados/mes | Coste consulta estimado/mes | Almacenamiento estimado/mes | Coste mensual estimado |
|---|---|---|---|---|
| S | ≈ 1,5 | ≈ 3 USD (tras 1 TiB gratuito) | ≈ 20 USD (1 TB) | **≈ 23 USD** |
| M | ≈ 30 | ≈ 181 USD | ≈ 400 USD (20 TB) | **≈ 581 USD** |
| L | ≈ 300 | ≈ 1.869 USD | ≈ 4.000 USD (200 TB) | **≈ 5.869 USD** |

*Nota[cite: 1]:* Para los escenarios con concurrencia sostenida alta o grandes picos operativos (como el M y el L), la adquisición de reservas *slots* en Enterprise Edition sujeta a compromisos multianuales resulta notablemente más económica que el modelo por on-demand.

## 3. Advertencias obligatorias

- Precios de lista (List Prices). No se contemplan posibles descuentos por volumen (EDP) del cliente[cite: 1].
- Las cifras expresan la tarifa base en USD que aplica a las principales regiones (p. ej., us-central1 y europe-west1). Regiones secundarias o remotas pueden incurrir en recargos adicionales sobre este listado[cite: 1].
- Las cifras por escenario son aproximaciones y estimaciones del consultor, y no han sido auditadas[cite: 1].

[^bq-pricing-page]: Google Cloud, «BigQuery pricing», https://cloud.google.com/bigquery/pricing, consultado 2026-10-02.