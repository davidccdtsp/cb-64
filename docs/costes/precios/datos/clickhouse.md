---
candidato: clickhouse
fecha_revision: 2026-09-29
region_referencia: "AWS us-east-1 (N. Virginia) — no se ha localizado una tabla de tarifas específica y desglosada por unidad para una región UE en la documentación pública; ClickHouse Cloud documenta que el precio 'varía por región y proveedor cloud' sin publicar la tabla completa por región. Se usa us-east-1 como referencia porque es la única con cifras desglosadas por unidad en la documentación oficial, y se advierte de esta limitación."
moneda: USD
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura: cómputo, almacenamiento y red (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 180, max: 260 }, M: { min: 1400, max: 1900 }, L: { min: 9000, max: 13000 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.1, M: 0.3, L: 0.75 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: "Infraestructura", formula: "infraestructura" }
        - { nombre: "Operación", formula: "fte * tarifa_hora * horas_base" }
---

# Costes — ClickHouse

## 1. Modelo de precios

ClickHouse existe en dos modalidades de coste que se documentan por separado, según lo indicado en [`../metodologia.md`](../metodologia.md#3-tco-para-candidatos-oss):

### 1.1 ClickHouse Cloud (oferta gestionada)

- **Unidad de facturación:** cómputo medido **por minuto, en incrementos de 8 GiB de RAM** ("compute-unit"), más almacenamiento por GB/TB-mes, más transferencia de red (egress) por GB[^ch-docs-pricing-overview][^ch-pricing-page].
- **Tiers:** Basic (hasta 1 TB, 8-12 GiB, una zona de disponibilidad), Scale (almacenamiento ilimitado, separación almacenamiento/cómputo, 2+ zonas, escalado vertical automático) y Enterprise (todo lo de Scale + SSO SAML, regiones privadas, cifrado gestionado por el cliente/CMEK, cumplimiento HIPAA/PCI)[^ch-pricing-page].
- **Qué incluye:** cómputo, almacenamiento y soporte "Expert" según el tier. **Qué no incluye:** transferencia de red fuera de la nube/región (egress), que se factura aparte[^ch-docs-pricing-overview].
- **Precio de referencia (AWS us-east-1, tier Enterprise):** cómputo **0,3903 USD por compute-unit-hora**; almacenamiento **25,30 USD por TB-mes**[^ch-pricing-page]. Ejemplos de factura mensual publicados por ClickHouse: Basic ≈ 66,52 USD/mes (uso parcial) a 159,66 USD/mes (24/7); Scale desde ≈ 499,38 USD/mes (ejemplo con 2 réplicas de 8 GiB); Enterprise ≈ 2.285,60 USD/mes en el ejemplo de 2 réplicas de 32 GiB[^ch-docs-pricing-overview].
- **Mínimos y compromisos:** sin mínimo mensual, facturación por uso. Prueba gratuita de 300 USD en créditos durante 30 días[^ch-pricing-page].
- **Advertencia:** los importes anteriores son cifras de ejemplo publicadas por el propio fabricante para ilustrar el modelo, no una tabla de tarifas cerrada por región UE; para una cotización exacta en una región UE concreta (p. ej. `eu-central-1`), ClickHouse remite a su calculadora de precios interactiva, no accesible como tabla estática citable en el momento de esta revisión.

### 1.2 ClickHouse OSS autogestionado

- Sin coste de licencia (Apache-2.0). El coste es íntegramente de infraestructura + operación, calculado como TCO (ver §2).
- Existe también la modalidad **BYOC** (Bring Your Own Cloud): ClickHouse Cloud gestionado, pero desplegado dentro de la cuenta cloud del cliente, pensado para requisitos estrictos de residencia/cumplimiento[^ch-docs-byoc-architecture][^ch-blog-byoc-aws]. Su modelo de precios no está desglosado públicamente por unidad (se gestiona vía acuerdo comercial); se marca `N/D` a efectos de cálculo cuantitativo en los escenarios de este documento.

## 2. TCO — ClickHouse OSS autogestionado por escenario

Supuestos de cálculo (documentados como tales, no como fuente factual — ver [`../metodologia.md`](../metodologia.md#3-tco-para-candidatos-oss)):

- Cómputo: instancias `m6i` equivalentes en AWS `eu-central-1`, dimensionadas para cubrir la concurrencia pico de cada escenario (ver [`../escenarios.md`](../escenarios.md)) con 3 réplicas para alta disponibilidad en M y L, 1 nodo en S.
- Almacenamiento: EBS/gp3 equivalente al volumen de datos del escenario + 30 % de margen para *merges* de MergeTree.
- Operación: perfil SRE/DBA senior a **65 €/hora** (supuesto del consultor, no fuente), con dedicación estimada de 0,1 FTE (S), 0,3 FTE (M) y 0,75 FTE (L) al mes.
- Soporte comercial opcional (p. ej. Altinity Enterprise Support): no incluido en el cálculo base; se indicaría como línea aparte si el cliente lo contrata.

| Escenario | Infraestructura (estimado/mes) | Operación (estimado/mes) | TCO mensual estimado | TCO anual estimado |
|---|---|---|---|---|
| S | 180 – 260 € | ≈ 104 € (0,1 FTE × 65 €/h × 16 h/mes) | **≈ 284 – 364 €** | ≈ 3.400 – 4.370 € |
| M | 1.400 – 1.900 € | ≈ 1.248 € (0,3 FTE × 65 €/h × 64 h/mes) | **≈ 2.650 – 3.150 €** | ≈ 31.800 – 37.800 € |
| L | 9.000 – 13.000 € | ≈ 6.240 € (0,75 FTE × 65 €/h × 128 h/mes) | **≈ 15.240 – 19.240 €** | ≈ 182.900 – 230.900 € |

Los rangos de infraestructura son estimaciones del consultor a partir de tarifas públicas de cómputo/almacenamiento en la nube (no se han fijado aquí como cifra exacta por no formar parte del alcance de esta ficha; en una entrega completa cada franja debería desglosarse con el mismo nivel de detalle que la tabla del §1.1, citando la página de precios de la nube de referencia). Se marcan por tanto como estimaciones de rango, según exige la sección 5.5 del encargo.

## 3. Advertencias obligatorias

- Los precios de ClickHouse Cloud son **precios de lista**, sin descuentos por volumen ni compromiso anual, salvo indicación contraria.
- La región UE de referencia no tiene tabla de tarifas desglosada citable de forma directa en la documentación pública revisada; se usa `us-east-1` como referencia con esa salvedad explícita (ver frontmatter).
- El TCO del modo autogestionado es una **estimación**, no una cifra auditada: depende de la política de compresión/replicación real, que varía por caso de uso.
- Cuando exista un precio "contactar con ventas" (p. ej. BYOC, soporte Enterprise negociado), se marca `N/D` porque no se ha localizado una referencia pública citable equivalente (ni en marketplace de AWS/GCP/Azure) en esta revisión.

[^ch-docs-pricing-overview]: ClickHouse Docs, «Pricing — Billing overview», https://clickhouse.com/docs/cloud/manage/billing/overview, consultado 2026-09-29.
[^ch-pricing-page]: ClickHouse Inc., «ClickHouse Cloud Pricing», https://clickhouse.com/pricing, consultado 2026-09-29.
[^ch-docs-byoc-architecture]: ClickHouse Docs, «BYOC — Architecture», https://clickhouse.com/docs/cloud/reference/byoc/architecture, consultado 2026-09-29.
[^ch-blog-byoc-aws]: ClickHouse, «Building ClickHouse BYOC (Bring Your Own Cloud) on AWS», https://clickhouse.com/blog/building-clickhouse-byoc-on-aws, consultado 2026-09-29.
