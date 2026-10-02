---
candidato: customer-io
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región UE en la página oficial revisada"
moneda: USD
modelo:
  moneda: USD
  parametros:
    - { id: cuota_essentials, nombre: "Essentials, cuota base (incluye 5.000 perfiles)", unidad: "USD/mes", valor: 100, fuente: cio-pricing-3p }
    - { id: perfiles_incluidos, nombre: "Perfiles incluidos en Essentials", unidad: "perfiles", valor: 5000, fuente: cio-pricing }
    - { id: precio_perfil, nombre: "Perfil adicional", unidad: "USD/perfil-mes", valor: 0.009, fuente: cio-pricing }
    - { id: emails_incluidos, nombre: "Emails incluidos en Essentials", unidad: "emails/mes", valor: 1000000, fuente: cio-pricing }
    - { id: precio_emails, nombre: "Lote adicional de 1.000 emails", unidad: "USD/1.000 emails", valor: 0.12, fuente: cio-pricing }
  variantes:
    - nombre: Essentials
      componentes:
        - { nombre: "Cuota base", formula: "cuota_essentials" }
        - { nombre: "Perfiles adicionales", formula: "max(0, perfiles - perfiles_incluidos) * precio_perfil" }
        - { nombre: "Emails adicionales", formula: "max(0, emails_mes - emails_incluidos) / 1000 * precio_emails" }
---

# Costes — Customer.io

## 1. Modelo de precios

- **Unidad de facturación:** perfiles (personas y objetos identificados de forma única)[^cio-pricing].
- **Qué incluye:** Asientos ilimitados y sin cargos por almacenamiento. Essentials incluye 5.000 perfiles y 1 M de emails al mes.
- **Mínimos y compromisos:** Facturación anual por aniversario; la mensual solo con tarjeta.
- **Precio de lista:** la página oficial publica solo los sobrecostes: 0,009 USD por perfil adicional y 0,12 USD por cada 1.000 emails adicionales; las cuotas de los planes no se muestran (hay que pedir una demo). Un tercero sitúa Essentials en 100 USD/mes con 5.000 perfiles y Premium en 1.000 USD/mes (confianza baja).[^cio-pricing][^cio-pricing-3p]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 145 USD | 1.740 USD |
| M | 2.425 USD | 29.100 USD |
| L | 50.935 USD | 611.220 USD |

Plan Essentials: 100 USD de cuota (tercero) más 0,009 USD por perfil por encima de 5.000 y 0,12 USD por cada 1.000 emails por encima de 1 millón (oficial). S: 100 + 5.000 × 0,009 = 145 USD. M (250.000 perfiles, 2 millones de emails): 100 + 245.000 × 0,009 + 1.000 × 0,12 = 2.425 USD. L (5 millones de perfiles, 50 millones de emails): 100 + 4.995.000 × 0,009 + 49.000 × 0,12 = 50.935 USD. En M y L es de esperar que el fabricante ofrezca planes Premium o Enterprise con descuento por volumen, no publicados: son cotas superiores de lista.

## 3. Advertencias obligatorias

- Son **precios de lista**, sin descuentos comerciales negociados, y las cifras son **estimaciones**.
- Cuando el precio es «contactar con ventas», se ha buscado una referencia pública citable (marketplace de AWS/Azure/GCP); si no existe, el coste del escenario es `N/D`.
- Las cuotas únicas (incorporación, implantación) no entran en el coste mensual.
- El coste no incluye el warehouse, el proveedor de transporte de email ni servicios de implantación, salvo indicación.

[^cio-pricing]: Customer.io, «Pricing», https://customer.io/pricing, consultado 2026-10-02.
[^cio-pricing-3p]: Costbench, «Customer.io Pricing 2026: 3 Plans from $100–$1,000/month», https://costbench.com/software/marketing-automation/customerio/, consultado 2026-10-02.
