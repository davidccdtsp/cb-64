---
id: customer-io
nombre: Customer.io
dominio: martech
categoria: ma-cloud
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 4, confianza: baja, fuentes: [cio-rev-etl] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { nota: 3, confianza: baja, fuentes: [cio-rev-etl] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [cio-rev-etl] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 5, confianza: media, fuentes: [cio-launch-demo] }
  MK-ACT-03: { nota: 4, confianza: alta, fuentes: [cio-snowflake, cio-bigquery] }
  MK-ORQ-01: { nota: 3, confianza: baja, fuentes: [cio-snowflake] }
  MK-ORQ-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 3, confianza: media, fuentes: [cio-auth] }
  MK-EML-03: { nota: 3, confianza: alta, fuentes: [cio-ips] }
  MK-EML-04: { valor: "Sí", confianza: alta, fuentes: [cio-unsub] }
  MK-ARQ-01: { nota: 2, confianza: media, fuentes: [cio-rev-etl] }
  MK-ARQ-02: { nota: 3, confianza: alta, fuentes: [cio-snowflake, cio-bigquery] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [cio-snowflake-out] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [cio-subscriptions] }
  MK-PRI-02: { nota: 3, confianza: media, fuentes: [cio-compliance-docs] }
  MK-PRI-03: { valor: "Sí", confianza: media, fuentes: [cio-gdpr] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [cio-regions] }
  MK-PRI-05: { valor: "SOC 2 Tipo 2; ISO 27001; HIPAA", confianza: alta, fuentes: [cio-certs] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { nota: 3, confianza: media, fuentes: [cio-agent] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [cio-mcp] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [cio-regions] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [cio-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [cio-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 3, confianza: baja, fuentes: [cio-rev-etl] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [cio-pricing] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [cio-snowflake-out] }
  MK-COS-02: { nota: 4, confianza: media, fuentes: [cio-pricing] }
---

# Customer.io

## Resumen

Customer.io es una plataforma de mensajería basada en datos: Data Pipelines (captura de eventos y reverse ETL), journeys y campañas, email, SMS, push, in-app y WhatsApp, agente de IA y servidor MCP[^cio-pricing][^cio-launch-demo][^cio-mcp]. Permite elegir región de EE. UU. o UE (Bélgica)[^cio-regions]. Se factura por perfiles (personas y objetos identificados de forma única)[^cio-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 4/5
Capta eventos con la API de Pipelines (identify/track), SDKs y sincroniza desde bases de datos y warehouses; no se ha extraído el número de SDKs.[^cio-rev-etl]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/D
No se ha revisado la resolución de identidad.

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta.

### MK-ID-03 · Perfil unificado y latencia · N/D
No se ha revisado.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Los segmentos se actualizan con cada sincronización (hasta cada minuto en reverse ETL) y con eventos; no se ha extraído la latencia de recálculo.[^cio-rev-etl]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Constructor de segmentos y segmentación manual alimentada por consultas SQL sobre el warehouse.[^cio-rev-etl]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha extraído un recuento oficial de destinos.

### MK-ACT-02 · Canales de mensajería nativos · 5/5
Email, SMS, push, in-app, WhatsApp y LINE.[^cio-launch-demo]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Reverse ETL desde Snowflake y BigQuery con consultas SQL que definen personas, eventos, objetos y relaciones, con sincronización recurrente hasta cada minuto.[^cio-snowflake][^cio-bigquery]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Los cambios de cada sincronización pueden añadir personas a segmentos que disparan campañas automáticamente; el detalle del lienzo no se ha extraído.[^cio-snowflake]

### MK-ORQ-02 · Experimentación · N/D
No se ha revisado en esta ronda.


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha revisado el editor.

### MK-EML-02 · Autenticación y herramientas de deliverability · 3/5
Autenticación de dominio con registros MX, DKIM y SPF para lograr la alineación DMARC; guía de buenas prácticas de entregabilidad.[^cio-auth]

### MK-EML-03 · IP dedicada y gestión de reputación · 3/5
IP compartidas o dedicadas; la IP dedicada exige un mínimo de 50.000 emails por semana.[^cio-ips]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
Implementa la cabecera `List-Unsubscribe-Post` (RFC 8058) automáticamente con la funcionalidad de baja por defecto.[^cio-unsub]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
Mantiene sus propios perfiles; el warehouse actúa como origen de importación y como destino de exportación.[^cio-rev-etl]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Reverse ETL con Snowflake y BigQuery y exportación hacia Snowflake (Data Out, cada 15 minutos).[^cio-snowflake][^cio-bigquery]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
Exportación al warehouse con refresco cada 15 minutos y reenvío de datos históricos.[^cio-snowflake-out]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Centro de suscripciones con preferencias por tema y canal y bajas globales.[^cio-subscriptions]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
Se puede suprimir o eliminar de forma permanente a una persona, por API o en la interfaz, y evitar la recogida futura de sus datos.[^cio-compliance-docs]

### MK-PRI-03 · DPA y subencargados publicados · Sí
Ofrece un DPA firmado descargable; la lista de subencargados no se ha verificado en esta revisión.[^cio-gdpr]

### MK-PRI-04 · Datos en la UE · Sí
Región UE con centro de datos en Bélgica; los perfiles se almacenan exclusivamente en centros de datos de Estados miembros de la UE.[^cio-regions]

### MK-PRI-05 · Certificaciones · SOC 2 Tipo 2; ISO 27001; HIPAA
Certificaciones declaradas en la documentación de seguridad del fabricante.[^cio-certs]


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha revisado.

### MK-IA-02 · IA generativa de contenido · 3/5
El AI Agent genera y ejecuta tareas de marketing dentro de la plataforma.[^cio-agent]

### MK-IA-03 · Agentes y MCP · 4/5
Servidor MCP oficial que permite generar segmentos con atributos y comportamiento reales, crear campañas, inspeccionar perfiles y extraer analítica desde Claude o Cursor.[^cio-mcp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS con regiones de EE. UU. y UE.[^cio-regions]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Plan Essentials autoservicio y programa gratuito para startups; requiere modelar datos para reverse ETL.[^cio-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^cio-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · 3/5
Conectores de reverse ETL y de exportación y API de pipelines.[^cio-rev-etl]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^cio-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con exportación al warehouse.[^cio-snowflake-out]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 4/5
Precio por perfiles con tres planes (Essentials, Premium, Enterprise); sobrecoste publicado de 0,009 USD por perfil extra y 0,12 USD por lote adicional de 1.000 mensajes. No se extrajeron las cuotas base de cada plan.[^cio-pricing]


[^cio-rev-etl]: Customer.io Docs, «Understanding reverse ETL integrations», https://docs.customer.io/integrations/data-in/connections/reverse-etl/about-reverse-etl/, consultado 2026-09-30.
[^cio-launch-demo]: Customer.io, «AI marketing demo: AI Agent, Goals, WhatsApp, LINE, and more», https://customer.io/learn/announcements/ai-marketing-launch-demo, consultado 2026-09-30.
[^cio-snowflake]: Customer.io Docs, «Snowflake Reverse ETL», https://docs.customer.io/integrations/data-in/connections/reverse-etl/snowflake/, consultado 2026-09-30.
[^cio-bigquery]: Customer.io Docs, «Google BigQuery reverse ETL», https://docs.customer.io/journeys/bigquery-reverse-etl, consultado 2026-09-30.
[^cio-auth]: Customer.io Docs, «Domain authentication», https://docs.customer.io/journeys/authentication/, consultado 2026-09-30.
[^cio-ips]: Customer.io Docs, «IP addresses: shared vs dedicated», https://docs.customer.io/messaging/channels/email/deliverability/ip-addresses/, consultado 2026-09-30.
[^cio-unsub]: Customer.io Docs, «Custom unsubscribe links: staying compliant with list-unsubscribe-post (RFC 8058)», https://docs.customer.io/messaging/channels/email/deliverability/custom-unsubscribe-links/, consultado 2026-09-30.
[^cio-snowflake-out]: Customer.io Docs, «Snowflake (advanced) — data out», https://docs.customer.io/integrations/data-out/connections/snowflake/, consultado 2026-09-30.
[^cio-subscriptions]: Customer.io Docs, «Overview of subscription options», https://docs.customer.io/messaging/channels/subscriptions/overview/, consultado 2026-09-30.
[^cio-compliance-docs]: Customer.io Docs, «Data compliance and privacy», https://docs.customer.io/integrations/getting-started/data-compliance/, consultado 2026-09-30.
[^cio-gdpr]: Customer.io, «GDPR Compliance Statement», https://customer.io/legal/gdpr, consultado 2026-09-30.
[^cio-regions]: Customer.io Docs, «Account regions (US and EU)», https://docs.customer.io/accounts/settings/data-centers/, consultado 2026-09-30.
[^cio-certs]: Customer.io Docs, «Customer.io security qualifications», https://docs.customer.io/accounts/security/certifications/, consultado 2026-09-30.
[^cio-agent]: Customer.io, «AI Agent», https://customer.io/platform/agent, consultado 2026-09-30.
[^cio-mcp]: Customer.io Docs, «Get started with the Customer.io MCP server», https://docs.customer.io/ai/mcp/get-started/, consultado 2026-09-30.
[^cio-pricing]: Customer.io, «Pricing», https://customer.io/pricing, consultado 2026-09-30.
