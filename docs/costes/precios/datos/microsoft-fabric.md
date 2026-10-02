---
candidato: microsoft-fabric
fecha_revision: 2026-10-02
region_referencia: "Región genérica EE. UU. (tarifa por CU/hora citada por agregadores como aproximada; no se ha localizado en esta revisión el desglose oficial por región UE)"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: cu, nombre: "Capacidad F-SKU elegida (CU): F4, F32 y F128 (estimación del consultor)", unidad: "CU", valor: { S: 4, M: 32, L: 128 } }
    - { id: precio_cu_hora, nombre: "Pago por uso", unidad: "USD/CU-hora", valor: 0.18, fuente: fab-pricing-3p }
    - { id: precio_gb_mes, nombre: "Almacenamiento OneLake", unidad: "USD/GB-mes", valor: 0.023, fuente: fab-pricing-3p }
  variantes:
    - nombre: "Pago por uso (capacidad pausada fuera de las horas activas)"
      componentes:
        - { nombre: "Capacidad (CU-hora)", formula: "cu * horas_activas_dia * 30 * precio_cu_hora" }
        - { nombre: "Almacenamiento OneLake", formula: "tb_almacenados * 1000 * precio_gb_mes" }
---

# Costes — Microsoft Fabric

## 1. Modelo de precios

- **Unidad de facturación:** Capacity Units (CU), vendidas en F-SKU (F2 a F2048, cada una el doble de CU que la anterior); pago por uso (0,18 USD/CU-hora en EE. UU. según terceros[^fab-pricing-3p]) o reservado (1-3 años, ~41 % de descuento según la página oficial de Azure, cuya tabla de importes aparece vacía al leerla de forma automática). Azure factura por segundo con mínimo de un minuto y la capacidad se puede pausar[^fab-docs-licenses]. **Confianza baja**: la tarifa por CU-hora no se ha podido verificar contra la página oficial.
- **Almacenamiento OneLake:** facturado aparte de la capacidad, sin coste adicional por transacciones (lecturas/escrituras), a diferencia de S3/ADLS[^fab-docs-onelake-consumption].
- **Qué incluye la capacidad:** todo el cómputo de los motores de Fabric (Warehouse, Lakehouse, Real-Time Intelligence, Power BI) se consume de la misma bolsa de CU, no se factura cada motor por separado.
- **Mínimos y compromisos:** F2 es la unidad mínima; sin mínimo de permanencia en pago por uso.

## 2. Coste estimado por escenario

Estimación con F-SKU dimensionada según la concurrencia pico de cada escenario (ver [`../escenarios.md`](../escenarios.md)), en modo pago por uso y con la capacidad activa solo las horas activas del escenario (30 días al mes).

| Escenario | F-SKU estimada | Coste capacidad estimado/mes | Almacenamiento OneLake estimado/mes | Coste mensual estimado |
|---|---|---|---|---|
| S | F4, 8h/día | ≈ 173 USD | ≈ 23 USD (1 TB) | **≈ 196 USD** |
| M | F32, 16h/día | ≈ 2.765 USD | ≈ 460 USD (20 TB) | **≈ 3.225 USD** |
| L | F128, 24h/día | ≈ 16.589 USD | ≈ 4.600 USD (200 TB) | **≈ 21.189 USD** |

El dimensionado de F-SKU por escenario es una estimación gruesa del consultor, no calculada con la calculadora oficial de Microsoft.

## 3. Advertencias obligatorias

- Precios de lista pay-as-you-go, sin descuento de reserva.
- La tarifa por CU-hora y la del almacenamiento tienen **confianza baja**: proceden de terceros. La revisión anterior suponía M y L activos 24 h (4.200 y 16.800 USD); aquí se aplican las horas activas del escenario (16 h y 24 h con 30 días).
- No se ha localizado una tarifa oficial desglosada por región UE en esta revisión.

[^fab-pricing-3p]: Kanerika, «Microsoft Fabric Pricing 2026: F-SKU Costs and Licenses», https://kanerika.com/blogs/understanding-microsoft-fabric-pricing/, consultado 2026-10-02.
[^fab-docs-licenses]: Microsoft Learn, «Understand Microsoft Fabric licenses and capacity», https://learn.microsoft.com/en-us/fabric/enterprise/licenses, consultado 2026-10-02.
[^fab-docs-onelake-consumption]: Microsoft Learn, «OneLake capacity consumption example», https://learn.microsoft.com/en-us/fabric/onelake/onelake-capacity-consumption, consultado 2026-09-29.
