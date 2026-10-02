---
id: mailchimp
nombre: Mailchimp
dominio: martech
categoria: ma-cloud
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 2, confianza: baja, fuentes: [mc-integrations] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 1, confianza: baja, fuentes: [mc-integrations] }
  MK-ID-02: { nota: 0, confianza: baja, fuentes: [mc-integrations] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { nota: 2, confianza: baja, fuentes: [mc-ai] }
  MK-SEG-02: { nota: 2, confianza: media, fuentes: [mc-ai] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 2, confianza: media, fuentes: [mc-ai] }
  MK-ACT-03: { nota: 1, confianza: baja, fuentes: [mc-integrations] }
  MK-ORQ-01: { nota: 3, confianza: media, fuentes: [mc-journey] }
  MK-ORQ-02: { nota: 3, confianza: alta, fuentes: [mc-ab] }
  MK-EML-01: { nota: 4, confianza: media, fuentes: [mc-ai] }
  MK-EML-02: { nota: 3, confianza: alta, fuentes: [mc-domain-auth] }
  MK-EML-03: { nota: 3, confianza: media, fuentes: [mc-gmail-yahoo] }
  MK-EML-04: { valor: "Sí", confianza: media, fuentes: [mc-gmail-yahoo] }
  MK-ARQ-01: { nota: 1, confianza: baja, fuentes: [mc-integrations] }
  MK-ARQ-02: { nota: 1, confianza: baja, fuentes: [mc-integrations] }
  MK-ARQ-03: { nota: 2, confianza: baja, fuentes: [mc-integrations] }
  MK-PRI-01: { nota: 2, confianza: baja, fuentes: [mc-dpa] }
  MK-PRI-02: { nota: 3, confianza: media, fuentes: [mc-eu-transfers] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [mc-dpa, mc-subprocessors] }
  MK-PRI-04: { valor: "No", confianza: media, fuentes: [mc-eu-transfers] }
  MK-PRI-05: { valor: "SOC 2; ISO 27001; EU-US DPF", confianza: media, fuentes: [mc-security] }
  MK-IA-01: { nota: 3, confianza: media, fuentes: [mc-ai] }
  MK-IA-02: { nota: 4, confianza: media, fuentes: [mc-content-gen] }
  MK-IA-03: { nota: 3, confianza: media, fuentes: [mc-mcp-transactional] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [mc-pricing] }
  MK-DEP-02: { nota: 5, confianza: alta, fuentes: [mc-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [mc-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 4, confianza: baja, fuentes: [mc-integrations] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [mc-pricing] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [mc-integrations] }
  MK-COS-02: { nota: 4, confianza: media, fuentes: [mc-pricing] }
---

# Mailchimp

## Resumen

Mailchimp (Intuit) es una plataforma de email y marketing automation para pymes, con Customer Journey Builder, pruebas A/B, SMS, segmentación predictiva y herramientas de IA (Intuit Assist, generador de contenido)[^mc-journey][^mc-ai]. Ofrece un plan gratuito y planes Essentials, Standard y Premium por número de contactos[^mc-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 2/5
Integraciones por OAuth2 con la API de Marketing y conectores de e-commerce; no hay SDKs de captura de eventos propios documentados en las fuentes revisadas.[^mc-integrations]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 1/5
Identifica contactos por email dentro de cada audiencia; sin resolución de identidad documentada.[^mc-integrations]

### MK-ID-02 · Resolución probabilística / difusa · 0/5
No se documenta.[^mc-integrations]

### MK-ID-03 · Perfil unificado y latencia · N/D
No se ha revisado.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 2/5
Segmentación por reglas y segmentación predictiva; no se ha extraído la frecuencia de recálculo.[^mc-ai]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Constructor no-code de segmentos; sin SQL sobre warehouse.[^mc-ai]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha extraído un recuento oficial de integraciones.

### MK-ACT-02 · Canales de mensajería nativos · 2/5
Email y SMS (lanzado también en el Reino Unido).[^mc-ai]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 1/5
Importación por CSV y API; sin conector de warehouse documentado.[^mc-integrations]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Customer Journey Builder con automatizaciones de email y SMS basadas en pedidos y comportamiento; los planes limitan los pasos de flujo (p. ej. 200 en Standard).[^mc-journey]

### MK-ORQ-02 · Experimentación · 3/5
A/B sobre asunto, remitente, hora de envío y contenido, hasta 3 combinaciones de una variable; también reglas de división porcentual en journeys.[^mc-ab]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 4/5
Editor de arrastrar y soltar con plantillas, generador de contenido de email, optimizador de contenido y recomendaciones de producto.[^mc-ai]

### MK-EML-02 · Autenticación y herramientas de deliverability · 3/5
Autenticación de dominio con 2 CNAME (DKIM) y un TXT (DMARC); guía de SPF/DKIM/DMARC para los requisitos de Gmail y Yahoo. No se ha verificado monitorización de reputación ni inbox placement.[^mc-domain-auth]

### MK-EML-03 · IP dedicada y gestión de reputación · 3/5
IP dedicada opcional (recomendada a partir de 5.000 emails al día al menos tres días por semana; una IP admite hasta 500.000 emails diarios).[^mc-gmail-yahoo]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
El fabricante documenta su adaptación a los requisitos de Gmail y Yahoo, incluida la baja de un clic mediante cabeceras.[^mc-gmail-yahoo]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 1/5
Base de datos propia de audiencias.[^mc-integrations]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 1/5
Integraciones de terceros mediante API; sin conector nativo de warehouse localizado.[^mc-integrations]

### MK-ARQ-03 · APIs y exportabilidad · 2/5
API de Marketing con OAuth2 y exportación de audiencias.[^mc-integrations]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Formularios con estado de suscripción y herramientas de suscripción/baja; no se ha revisado el marco de consentimiento por finalidad.[^mc-dpa]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
Eliminación permanente de contactos (borra datos personales y anonimiza informes).[^mc-eu-transfers]

### MK-PRI-03 · DPA y subencargados publicados · Sí
El DPA con cláusulas contractuales tipo forma parte automática de los términos de uso y se publica la lista de subencargados con su ubicación.[^mc-dpa][^mc-subprocessors]

### MK-PRI-04 · Datos en la UE · No
Los servidores de Mailchimp están en EE. UU.; las transferencias se amparan en cláusulas contractuales tipo y en el Marco de Privacidad de Datos (Intuit), sin región UE.[^mc-eu-transfers]

### MK-PRI-05 · Certificaciones · SOC 2; ISO 27001; EU-US DPF
SOC 2 sobre seguridad, disponibilidad e integridad del procesamiento, y ISO 27001 con auditorías anuales.[^mc-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 3/5
Segmentación predictiva, optimización del día y hora de envío y recomendaciones de producto (más de 20 funciones de IA en la aplicación).[^mc-ai]

### MK-IA-02 · IA generativa de contenido · 4/5
Generador de contenido de email y asistente Intuit Assist para generar y personalizar contenido.[^mc-content-gen]

### MK-IA-03 · Agentes y MCP · 3/5
Asistente generativo dentro de la aplicación y guía de servidor MCP para mensajería transaccional (Mandrill); el servidor MCP del producto de marketing figura como línea estratégica.[^mc-mcp-transactional]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS.[^mc-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 5/5
Plan gratuito (hasta 250 contactos) y prueba de 14 días de Standard sin tarjeta; autoservicio.[^mc-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^mc-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · 4/5
Directorio amplio de integraciones y API de Marketing con OAuth2.[^mc-integrations]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^mc-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API.[^mc-integrations]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 4/5
Precios públicos por plan y tramo de contactos (Essentials desde 11,51 EUR/mes, Standard 17,71 EUR/mes, Premium 309,87 EUR/mes en la extracción, con descuentos indicados) y plan gratuito.[^mc-pricing]


[^mc-integrations]: Mailchimp Developer, «Integrations Documentation», https://mailchimp.com/developer/marketing/docs/integrations/, consultado 2026-09-30.
[^mc-ai]: Mailchimp, «AI marketing tools — Mailchimp with Intuit Intelligence», https://mailchimp.com/solutions/ai-tools/, consultado 2026-09-30.
[^mc-journey]: Mailchimp, «Customer Journey Builder», https://mailchimp.com/features/automations/customer-journey-builder/, consultado 2026-09-30.
[^mc-ab]: Mailchimp Help, «About A/B Tests», https://mailchimp.com/help/about-ab-tests/, consultado 2026-09-30.
[^mc-domain-auth]: Mailchimp Help, «Set Up Email Domain Authentication», https://mailchimp.com/help/set-up-email-domain-authentication/, consultado 2026-09-30.
[^mc-gmail-yahoo]: Mailchimp, «How Intuit Mailchimp Customers Can Prepare for Gmail and Yahoo’s New Sender Requirements», https://mailchimp.com/newsroom/google-changes-bulk-senders/, consultado 2026-09-30.
[^mc-dpa]: Mailchimp, «Data Processing Addendum», https://mailchimp.com/legal/data-processing-addendum/, consultado 2026-09-30.
[^mc-eu-transfers]: Mailchimp Help, «Mailchimp and European Data Transfers», https://mailchimp.com/help/mailchimp-european-data-transfers/, consultado 2026-09-30.
[^mc-subprocessors]: Mailchimp, «Mailchimp sub-processors», https://mailchimp.com/legal/subprocessors/, consultado 2026-09-30.
[^mc-security]: Mailchimp, «Mailchimp Data Security and Privacy», https://mailchimp.com/about/security/, consultado 2026-09-30.
[^mc-content-gen]: Mailchimp, «Intuit Mailchimp Announces Email Content Generator», https://mailchimp.com/newsroom/announcing-email-content-generator/, consultado 2026-09-30.
[^mc-mcp-transactional]: Mailchimp Developer, «How to Use Mailchimp's Transactional Messaging MCP», https://mailchimp.com/developer/transactional/guides/how-to-use-mailchimps-transactional-messaging-mcp/, consultado 2026-09-30.
[^mc-pricing]: Mailchimp, «Pricing — Marketing», https://mailchimp.com/pricing/marketing/, consultado 2026-09-30.
