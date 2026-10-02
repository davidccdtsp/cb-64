---
id: klaviyo
nombre: Klaviyo
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
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [kv-dw-import] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 5, confianza: media, fuentes: [kv-ai] }
  MK-ACT-03: { nota: 3, confianza: alta, fuentes: [kv-dw-import, kv-dw-sync] }
  MK-ORQ-01: { nota: 3, confianza: baja, fuentes: [kv-ab-flow] }
  MK-ORQ-02: { nota: 3, confianza: media, fuentes: [kv-ab, kv-ab-flow] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 4, confianza: media, fuentes: [kv-auth, kv-deliv-faq] }
  MK-EML-03: { nota: 3, confianza: media, fuentes: [kv-deliv-faq] }
  MK-EML-04: { valor: "Sí", confianza: media, fuentes: [kv-deliv-faq] }
  MK-ARQ-01: { nota: 2, confianza: media, fuentes: [kv-dw-import] }
  MK-ARQ-02: { nota: 3, confianza: alta, fuentes: [kv-dw-import] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [kv-consent] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [kv-dpa] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [kv-dpa] }
  MK-PRI-05: { valor: "SOC 2 Tipo II; ISO 27001", confianza: media, fuentes: [kv-trust] }
  MK-IA-01: { nota: 4, confianza: alta, fuentes: [kv-predictive] }
  MK-IA-02: { nota: 4, confianza: media, fuentes: [kv-ai] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [kv-mcp] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [kv-pricing] }
  MK-DEP-02: { nota: 5, confianza: alta, fuentes: [kv-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [kv-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 4, confianza: media, fuentes: [kv-pricing] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [kv-pricing] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [kv-dw-sync] }
  MK-COS-02: { nota: 3, confianza: media, fuentes: [kv-pricing] }
---

# Klaviyo

## Resumen

Klaviyo es una plataforma de marketing y CRM orientada a comercio electrónico, con email, SMS, push y WhatsApp, flujos automatizados, segmentación, analítica predictiva, importación desde data warehouse (reverse ETL), IA (Composer, agentes) y un servidor MCP[^kv-pricing][^kv-ai][^kv-mcp]. Ofrece un plan gratuito y se factura por perfiles activos[^kv-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
No se ha revisado el catálogo de fuentes/SDKs (destaca la integración nativa con Shopify, WooCommerce y Wix).

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

### MK-SEG-01 · Segmentación en tiempo real · N/D
No se ha extraído la frecuencia de recálculo de los segmentos.

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Segmentación con constructor visual e importación de tablas/vistas del warehouse como perfiles y eventos.[^kv-dw-import]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha revisado.

### MK-ACT-02 · Canales de mensajería nativos · 5/5
Email, SMS, push y WhatsApp gestionados desde una única plataforma, con selección de canal asistida por IA; se añade el canal de atención al cliente (helpdesk).[^kv-ai]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 3/5
La importación desde el warehouse (Snowflake, BigQuery, Redshift, Databricks) usa reverse ETL con tablas o vistas de perfiles y eventos.[^kv-dw-import][^kv-dw-sync]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Flujos automatizados con ramas y pruebas A/B dentro de los flujos (correos, SMS y ramas); no se ha extraído el detalle del lienzo.[^kv-ab-flow]

### MK-ORQ-02 · Experimentación · 3/5
Pruebas A/B de campañas (asunto, contenido y hora de envío) y de correos, SMS y ramas de flujos; no se han verificado grupos de control globales.[^kv-ab][^kv-ab-flow]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha revisado el editor de email.

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
Guía de autenticación (SPF, DKIM, DMARC), dominio de envío con marca y documentación de entregabilidad; no se ha verificado inbox placement propio.[^kv-auth][^kv-deliv-faq]

### MK-EML-03 · IP dedicada y gestión de reputación · 3/5
Ofrece IP compartidas o IP dedicadas propias.[^kv-deliv-faq]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
La ayuda indica que Klaviyo añade automáticamente un enlace de baja de un clic en la cabecera de cada email.[^kv-deliv-faq]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
Klaviyo mantiene su propio perfil y el warehouse se conecta como origen de importación.[^kv-dw-import]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Importación desde Snowflake, BigQuery, Redshift y Databricks, y sincronización hacia el warehouse.[^kv-dw-import]

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado la exportación (existe el artículo de sincronización de datos hacia el warehouse).


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Formularios conformes al RGPD con casillas múltiples para consentimiento granular, doble opt-in con un clic y registro automático de la prueba y las marcas de tiempo.[^kv-consent]

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha localizado el flujo de supresión; la política de privacidad remite a autogestión de datos.

### MK-PRI-03 · DPA y subencargados publicados · Sí
Publica su DPA con cláusulas contractuales tipo y lista de subencargados en su sitio legal, y está autocertificado en el DPF.[^kv-dpa]

### MK-PRI-04 · Datos en la UE · Sí
El DPA prevé que, si el cliente estipula residencia en la UE, los datos personales se almacenen en la UE (con posible tratamiento de subencargados fuera de la UE).[^kv-dpa]

### MK-PRI-05 · Certificaciones · SOC 2 Tipo II; ISO 27001
Certificaciones listadas en su Centro de Confianza.[^kv-trust]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 4/5
Modelos predictivos de valor de vida del cliente (reentrenados al menos semanalmente) y riesgo de abandono a 90 días, utilizables en segmentación.[^kv-predictive]

### MK-IA-02 · IA generativa de contenido · 4/5
Composer construye audiencia, contenido y estrategia de envío; los créditos de IA están incluidos en el plan gratuito.[^kv-ai]

### MK-IA-03 · Agentes y MCP · 4/5
Servidor MCP oficial que permite a Cursor, Claude y otros clientes interactuar con la API de Klaviyo; además, Marketing Agent y Customer Agent.[^kv-mcp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS.[^kv-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 5/5
Plan gratuito de 250 perfiles activos y 500 emails/mes, integraciones nativas con las principales plataformas de comercio electrónico y editores de arrastrar y soltar.[^kv-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^kv-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · 4/5
Integraciones con Shopify, WooCommerce y Wix incluso en el plan gratuito, y App Marketplace propio.[^kv-pricing]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^kv-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API y sincronización de datos con el warehouse.[^kv-dw-sync]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 3/5
Plan gratuito público con límites definidos (250 perfiles, 500 emails/mes); los planes de pago se calculan con estimador por perfiles y no se extrajeron importes de la página.[^kv-pricing]


[^kv-dw-import]: Klaviyo Help Center, «Understanding data warehouse import in Klaviyo», https://help.klaviyo.com/hc/en-us/articles/40939206649627, consultado 2026-09-30.
[^kv-ai]: Klaviyo, «AI Workflow Automation Tools», https://www.klaviyo.com/solutions/ai, consultado 2026-09-30.
[^kv-dw-sync]: Klaviyo Help Center, «Understand data warehouse syncing in Klaviyo», https://help.klaviyo.com/hc/en-us/articles/17759932376475, consultado 2026-09-30.
[^kv-ab-flow]: Klaviyo Help Center, «How to A/B test a flow email», https://help.klaviyo.com/hc/en-us/articles/6960371049115, consultado 2026-09-30.
[^kv-ab]: Klaviyo Help Center, «How to A/B test an email campaign», https://help.klaviyo.com/hc/en-us/articles/115005228148, consultado 2026-09-30.
[^kv-auth]: Klaviyo Help Center, «Understanding email authentication», https://help.klaviyo.com/hc/en-us/articles/4402601857307, consultado 2026-09-30.
[^kv-deliv-faq]: Klaviyo Help Center, «Email deliverability FAQs», https://help.klaviyo.com/hc/en-us/articles/16425927010075, consultado 2026-09-30.
[^kv-consent]: Klaviyo Help Center, «How to collect GDPR-compliant consent», https://help.klaviyo.com/hc/en-us/articles/360003536031, consultado 2026-09-30.
[^kv-dpa]: Klaviyo, «Data Processing Agreement», https://www.klaviyo.com/legal/data-processing-agreement, consultado 2026-09-30.
[^kv-trust]: Klaviyo, «Trust at Klaviyo», https://www.klaviyo.com/trust, consultado 2026-09-30.
[^kv-predictive]: Klaviyo Help Center, «Understanding Klaviyo's predictive analytics», https://help.klaviyo.com/hc/en-us/articles/360020919731, consultado 2026-09-30.
[^kv-mcp]: Klaviyo Developers, «Klaviyo MCP server», https://developers.klaviyo.com/en/docs/klaviyo_mcp_server, consultado 2026-09-30.
[^kv-pricing]: Klaviyo, «Pricing», https://www.klaviyo.com/pricing, consultado 2026-09-30.
