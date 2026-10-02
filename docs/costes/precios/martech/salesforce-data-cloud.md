---
candidato: salesforce-data-cloud
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: precio_perfiles, nombre: "Profiles", unidad: "USD/1.000 perfiles al año", valor: 240, fuente: sf-dc-pricing }
    - { id: precio_perfiles_ent, nombre: "Enterprise Profiles", unidad: "USD/1.000 perfiles al año", valor: 420, fuente: sf-dc-pricing }
  variantes:
    - nombre: Profiles
      componentes:
        - { nombre: "Perfiles (cuota anual / 12)", formula: "perfiles / 1000 * precio_perfiles / 12" }
    - nombre: "Enterprise Profiles"
      componentes:
        - { nombre: "Perfiles (cuota anual / 12)", formula: "perfiles / 1000 * precio_perfiles_ent / 12" }
---

# Costes — Salesforce Data Cloud (Data 360)

## 1. Modelo de precios

- **Unidad de facturación:** créditos de consumo (multiplicador por operación y millón de filas)[^sf-rate-sheet].
- **Qué incluye:** La hoja de tarifas oficial define los multiplicadores por operación; p. ej. resolución de identidad 100.000 créditos por millón de filas.
- **Mínimos y compromisos:** Compra mínima de unos 100.000 créditos por unos 500 USD según fuentes secundarias.
- **Precio de lista (página oficial, 2026-10-02):** Flex Credits, 500 USD por 100.000 créditos (consumo por acción); Profiles, 240 USD por 1.000 perfiles al año (incluye las acciones de construcción de perfiles y 1 crédito por perfil al año); Enterprise Profiles, 420 USD por 1.000 perfiles al año (2 créditos por perfil y enmascaramiento de datos). La ingesta es gratuita; la hoja de tarifas oficial sigue definiendo los multiplicadores por operación.[^sf-dc-pricing][^sf-rate-sheet][^sf-mavlers-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 200 USD – 350 USD | 2.400 USD – 4.200 USD |
| M | 5.000 USD – 8.750 USD | 60.000 USD – 105.000 USD |
| L | 100.000 USD – 175.000 USD | 1.200.000 USD – 2.100.000 USD |

Modelo por perfiles: cuota anual de Profiles (240 USD por 1.000) o Enterprise Profiles (420 USD por 1.000), dividida entre 12, con los perfiles del escenario. El modelo por Flex Credits (consumo por acción) no se estima porque el escenario no fija las operaciones por millón de filas. No se conoce un mínimo de contratación; el precio es el de lista.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^sf-dc-pricing]: Salesforce, «Data 360 Pricing», https://www.salesforce.com/data/pricing/, consultado 2026-10-02.
[^sf-rate-sheet]: Salesforce, «Data Cloud Platform Services Rate Sheet», https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/platform/data-cloud-platform-services-rate-sheet-dc-9-04.pdf, consultado 2026-09-30.
[^sf-mavlers-pricing]: Mavlers, «Salesforce Data Cloud Pricing Explained (2026 Guide)», https://www.mavlers.com/blog/salesforce-data-cloud-pricing-explained/, consultado 2026-09-30.
