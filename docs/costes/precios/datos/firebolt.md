---
candidato: firebolt
fecha_revision: 2026-10-02
region_referencia: "N/D — no se ha localizado en esta revisión un desglose de precio por región en la página oficial"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: nodos, nombre: "Nodos S del motor, activos en las horas activas (estimación del consultor)", unidad: "nodos", valor: { S: 1, M: 4, L: 16 } }
    - { id: precio_nodo_hora, nombre: "Nodo S (ejemplo de la calculadora oficial)", unidad: "USD/hora", valor: 0.92, fuente: fb-pricing-page }
    - { id: precio_gb_mes, nombre: "Almacenamiento (tamaño comprimido)", unidad: "USD/GB-mes", valor: 0.0264, fuente: fb-pricing-page }
  variantes:
    - nombre: "Firebolt gestionado"
      componentes:
        - { nombre: "Cómputo (nodo-hora)", formula: "nodos * horas_activas_dia * 30 * precio_nodo_hora" }
        - { nombre: "Almacenamiento", formula: "tb_almacenados * 1000 * precio_gb_mes" }
---

# Costes — Firebolt

## 1. Modelo de precios

- **Unidad de facturación:** cómputo facturado por segundo (arquitectura Arm), sin cargo cuando el *engine* está detenido; almacenamiento en object storage de paso (*pass-through*), cobrado según el tamaño comprimido de los datos[^fb-docs-architecture].
- **Familias de engine:** *storage-optimized* (más memoria y almacenamiento, menos vCPU) y *compute-optimized* (más vCPU, menos memoria) al mismo nivel de consumo de FBU (Firebolt Billing Units)[^fb-docs-architecture].
- **Precios (página oficial, 2026-10-02):** el ejemplo de su calculadora da ≈ 0,92 USD por hora para un nodo S; el almacenamiento cuesta 0,0264 USD/GB-mes sobre el tamaño comprimido; 200 USD de crédito inicial; también hay una edición de código abierto autoalojable sin límites[^fb-pricing-page].
- **Qué no incluye:** no se ha verificado en esta revisión el desglose de transferencia de red ni un mínimo mensual.

## 2. Coste estimado por escenario

Estimación con nodos S a 0,92 USD/hora, activos solo las horas activas del escenario (30 días al mes), más el almacenamiento a 0,0264 USD/GB-mes. Los nodos por escenario (1, 4 y 16) son una estimación gruesa del consultor y el precio del nodo S es el de un ejemplo de la calculadora, no una tarifa publicada por tipo de motor: **confianza media**.

| Escenario | Nodos S | Cómputo estimado/mes | Almacenamiento estimado/mes | Coste mensual estimado |
|---|---|---|---|---|
| S | 1 (8h/día) | ≈ 221 USD | ≈ 26 USD (1 TB) | **≈ 247 USD** |
| M | 4 (16h/día) | ≈ 1.766 USD | ≈ 528 USD (20 TB) | **≈ 2.294 USD** |
| L | 16 (24h/día) | ≈ 10.598 USD | ≈ 5.280 USD (200 TB) | **≈ 15.878 USD** |

## 3. Advertencias obligatorias

- El precio del nodo S sale de un ejemplo de la calculadora de la página oficial, no de una tabla de tarifas por tipo de motor; antes de usar este candidato en una comparación de coste real conviene confirmarlo con la calculadora o con una cotización.

[^fb-docs-architecture]: Firebolt Docs, «Architecture», https://docs.firebolt.io/overview/architecture-overview, consultado 2026-09-29.
