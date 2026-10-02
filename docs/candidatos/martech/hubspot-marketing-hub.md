---
id: hubspot-marketing-hub
nombre: HubSpot Marketing Hub
dominio: martech
categoria: ma-cloud
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [hs-cloud-storage] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-03: { nota: 3, confianza: media, fuentes: [hs-cloud-storage] }
  MK-ORQ-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ORQ-02: { nota: 3, confianza: alta, fuentes: [hs-ab-workflows, hs-ab-email] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 4, confianza: media, fuentes: [hs-email-auth, hs-deliverability] }
  MK-EML-03: { nota: 4, confianza: media, fuentes: [hs-community-gy] }
  MK-EML-04: { valor: "Sí", confianza: media, fuentes: [hs-community-gy] }
  MK-ARQ-01: { nota: 2, confianza: media, fuentes: [hs-cloud-storage] }
  MK-ARQ-02: { nota: 4, confianza: media, fuentes: [hs-cloud-storage, hs-snowflake-share] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [hs-cloud-storage] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { nota: 3, confianza: media, fuentes: [hs-dpa] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [hs-dpa, hs-eu-transfers] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [hs-hosting-faq] }
  MK-PRI-05: { valor: "SOC 2; ISO 27001 (incluidos subencargados de alojamiento)", confianza: media, fuentes: [hs-security] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [hs-mcp] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [hs-hosting-faq] }
  MK-DEP-02: { nota: 3, confianza: media, fuentes: [hs-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [hs-hosting-faq] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [hs-pricing] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [hs-cloud-storage] }
  MK-COS-02: { nota: 5, confianza: media, fuentes: [hs-pricing] }
---

# HubSpot Marketing Hub

## Resumen

HubSpot Marketing Hub es la suite de marketing de HubSpot integrada con su CRM: email, formularios, workflows, pruebas A/B, atribución, agentes de IA (Breeze) y Data Hub para sincronizar datos con warehouses[^hs-pricing][^hs-cloud-storage]. Se ofrece en cuatro niveles (Free, Starter, Professional, Enterprise) con tarifa por asiento y contactos de marketing[^hs-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
No se ha revisado en esta ronda el catálogo de SDKs; HubSpot recoge datos mediante código de seguimiento, formularios y API.

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/D
No se ha revisado.

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta.

### MK-ID-03 · Perfil unificado y latencia · N/D
No se ha revisado.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · N/D
No se ha revisado.

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Segmentación (listas) y datos del warehouse que enriquecen registros para segmentación y automatización; sin SQL directo sobre warehouse.[^hs-cloud-storage]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha extraído un recuento oficial.

### MK-ACT-02 · Canales de mensajería nativos · N/D
Marketing Hub cubre email, formularios y anuncios; no se ha verificado el resto de canales en esta ronda.

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 3/5
Sincronización bidireccional con Snowflake, BigQuery y AWS S3 (y Databricks vía Data Studio), programable de cada hora a cada día.[^hs-cloud-storage]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · N/D
No se ha revisado el constructor de workflows en esta ronda.

### MK-ORQ-02 · Experimentación · 3/5
Pruebas A/B de emails, incluidas dentro de workflows con reparto 50/50 y selección de ganador; no se han verificado grupos de control globales.[^hs-ab-workflows][^hs-ab-email]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha revisado el editor.

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
Autenticación con DKIM (dos CNAME), SPF y DMARC (TXT), gestión de la autenticación desde la plataforma y guía de entregabilidad.[^hs-email-auth][^hs-deliverability]

### MK-EML-03 · IP dedicada y gestión de reputación · 4/5
IP dedicada como complemento, con calentamiento automatizado de 40 días en el que el tráfico se reparte entre la red compartida y la IP nueva.[^hs-community-gy]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
El fabricante indica que la herramienta de email de marketing cumple la baja de un clic mediante la cabecera `List-Unsubscribe`.[^hs-community-gy]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
El CRM es la base de datos maestra; el warehouse se sincroniza de forma bidireccional.[^hs-cloud-storage]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Integraciones con Snowflake (incluida compartición de datos), BigQuery, S3 y Databricks.[^hs-cloud-storage][^hs-snowflake-share]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
Volcado de contactos, empresas, negocios, tickets y objetos personalizados al warehouse.[^hs-cloud-storage]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha revisado.

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
Función «GDPR delete» que elimina de forma permanente los datos de un registro e impide su recreación accidental.[^hs-dpa]

### MK-PRI-03 · DPA y subencargados publicados · Sí
Publica el DPA (con DPF y cláusulas contractuales tipo) y la lista de subencargados con ubicación del centro de datos.[^hs-dpa][^hs-eu-transfers]

### MK-PRI-04 · Datos en la UE · Sí
Los clientes pueden alojar sus datos en el centro de datos de la UE (Fráncfort, Alemania) sobre AWS desde julio de 2021; algunos subencargados pueden tratar datos fuera del lugar de alojamiento.[^hs-hosting-faq]

### MK-PRI-05 · Certificaciones · SOC 2; ISO 27001 (incluidos subencargados de alojamiento)
El programa de seguridad describe auditorías anuales SOC 2 y proveedores de alojamiento con ISO 27001.[^hs-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha revisado.

### MK-IA-02 · IA generativa de contenido · N/D
No se ha revisado.

### MK-IA-03 · Agentes y MCP · 4/5
Dos servidores MCP oficiales de HubSpot (CRM y plataforma de desarrolladores) y agentes Breeze que pueden conectarse a sistemas externos mediante un cliente MCP.[^hs-mcp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS sobre AWS (EE. UU., Canadá, Australia y UE).[^hs-hosting-faq]

### MK-DEP-02 · Esfuerzo de implantación y operación · 3/5
Plan gratuito, pero los niveles Professional y Enterprise requieren cuotas de incorporación de 3.000 y 7.000 USD.[^hs-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^hs-hosting-faq]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado el marketplace de aplicaciones.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^hs-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API y sincronización bidireccional con warehouse.[^hs-cloud-storage]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Precios de lista publicados: Free 0 USD; Starter desde 7 USD por asiento (1.000 contactos); Professional 800 USD/mes (2.000 contactos; onboarding 3.000 USD); Enterprise desde 3.600 USD/mes (10.000 contactos; onboarding 7.000 USD).[^hs-pricing]


[^hs-cloud-storage]: HubSpot, «Cloud Data Storage Integrations», https://www.hubspot.com/products/data/cloud-data-storage-integrations, consultado 2026-09-30.
[^hs-ab-workflows]: HubSpot Knowledge Base, «Automate A/B email testing with workflows», https://knowledge.hubspot.com/workflows/automate-ab-emails-with-workflows, consultado 2026-09-30.
[^hs-ab-email]: HubSpot Knowledge Base, «Run A/B tests for marketing emails», https://knowledge.hubspot.com/marketing-email/run-an-a/b-test-on-your-marketing-email, consultado 2026-09-30.
[^hs-email-auth]: HubSpot Knowledge Base, «Overview of email authentication», https://knowledge.hubspot.com/marketing-email/overview-of-email-authentication, consultado 2026-09-30.
[^hs-deliverability]: HubSpot Knowledge Base, «Improve email deliverability», https://knowledge.hubspot.com/marketing-email/email-deliverability-best-practices, consultado 2026-09-30.
[^hs-community-gy]: HubSpot Community, «Google/Yahoo Auth Requirements», https://community.hubspot.com/t5/Email-Marketing-Tool/Google-Yahoo-Auth-Requirements-We-re-here-for-you/m-p/872108, consultado 2026-09-30.
[^hs-snowflake-share]: HubSpot Knowledge Base, «Connect HubSpot and Snowflake Data Share», https://knowledge.hubspot.com/integrations/connect-snowflake-data-share, consultado 2026-09-30.
[^hs-dpa]: HubSpot Legal, «HubSpot Data Processing Agreement», https://legal.hubspot.com/dpa, consultado 2026-09-30.
[^hs-eu-transfers]: HubSpot Legal, «HubSpot's Commitment to Protecting EU Data Transfers», https://legal.hubspot.com/dp-eu-data-transfers, consultado 2026-09-30.
[^hs-hosting-faq]: HubSpot Knowledge Base, «HubSpot Cloud Infrastructure and Data Hosting FAQ», https://knowledge.hubspot.com/account-security/hubspot-cloud-infrastructure-and-data-hosting-frequently-asked-questions, consultado 2026-09-30.
[^hs-security]: HubSpot Legal, «HubSpot Security Program», https://legal.hubspot.com/security, consultado 2026-09-30.
[^hs-mcp]: HubSpot Developers, «HubSpot MCP Server», https://developers.hubspot.com/ai-tools/mcp, consultado 2026-09-30.
[^hs-pricing]: HubSpot, «Marketing Hub pricing», https://www.hubspot.com/pricing/marketing, consultado 2026-09-30.
