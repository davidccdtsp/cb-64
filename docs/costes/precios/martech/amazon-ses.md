---
candidato: amazon-ses
fecha_revision: 2026-09-30
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: precio_alacarta, nombre: "À la carte", unidad: "USD/1.000 emails", valor: 0.10, fuente: ses-pricing }
    - { id: precio_essentials_1, nombre: "Essentials, tramo hasta 10 M emails/mes", unidad: "USD/1.000 emails", valor: 0.16, fuente: ses-pricing }
    - { id: precio_essentials_2, nombre: "Essentials, tramo de 10 M a 100 M emails/mes", unidad: "USD/1.000 emails", valor: 0.14, fuente: ses-pricing }
    - { id: limite_tramo_1, nombre: "Fin del primer tramo", unidad: "emails/mes", valor: 10000000, fuente: ses-pricing }
    - { id: limite_tramo_2, nombre: "Fin del segundo tramo", unidad: "emails/mes", valor: 100000000, fuente: ses-pricing }
  variantes:
    - nombre: "À la carte"
      componentes:
        - { nombre: "Emails enviados", formula: "emails_mes / 1000 * precio_alacarta" }
    - nombre: "Essentials"
      componentes:
        - { nombre: "Emails enviados (por tramos)", formula: "(min(emails_mes, limite_tramo_1) * precio_essentials_1 + max(0, min(emails_mes, limite_tramo_2) - limite_tramo_1) * precio_essentials_2) / 1000" }
---

# Costes — Amazon SES

## 1. Modelo de precios

- **Unidad de facturación:** emails enviados (por 1.000), IP dedicadas y Virtual Deliverability Manager[^ses-pricing].
- **Qué incluye:** À la carte: 0,10 USD por 1.000 emails; planes Essentials/Pro/Enterprise por tramo de volumen. Excluye transferencia de adjuntos (0,12 USD/GB).
- **Mínimos y compromisos:** Crédito gratuito de hasta 200 USD durante 6 meses para cuentas nuevas.
- **Precio de lista:** À la carte 0,10 USD/1.000. Essentials 0,16 USD/1.000 (0–10 M/mes) y 0,14 (10–100 M). IP dedicada estándar 24,95 USD/mes por IP; IP gestionadas 15 USD/mes + uso.[^ses-pricing]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 5,00 USD – 8,00 USD | 60,00 USD – 96,00 USD |
| M | 200 USD – 320 USD | 2.400 USD – 3.840 USD |
| L | 5.000 USD – 7.200 USD | 60.000 USD – 86.400 USD |

Rango: mínimo con precio à la carte (0,10 USD/1.000), máximo con Essentials (0,16 USD/1.000 hasta 10 M y 0,14 USD/1.000 entre 10 M y 100 M). Sin IP dedicada, sin adjuntos ni VDM. Región de referencia: la página oficial de precios no desglosa por región.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^ses-pricing]: AWS, «Amazon SES Pricing», https://aws.amazon.com/ses/pricing/, consultado 2026-09-30.
