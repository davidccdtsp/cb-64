---
id: braze
nombre: Braze
dominio: martech
categoria: ma-cloud
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 4, confianza: media, fuentes: [bz-arch, bz-cdi] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 3, confianza: media, fuentes: [bz-forge24] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-02: { nota: 4, confianza: alta, fuentes: [bz-cdi] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 4, confianza: media, fuentes: [bz-pricing] }
  MK-ACT-03: { nota: 4, confianza: alta, fuentes: [bz-cdi] }
  MK-ORQ-01: { nota: 4, confianza: media, fuentes: [bz-ai-docs] }
  MK-ORQ-02: { nota: 4, confianza: media, fuentes: [bz-decisioning] }
  MK-EML-01: { nota: 4, confianza: media, fuentes: [bz-inbox-vision] }
  MK-EML-02: { nota: 5, confianza: media, fuentes: [bz-deliv-center, bz-inbox-vision] }
  MK-EML-03: { nota: 5, confianza: media, fuentes: [bz-ip-warming, bz-ips-domains] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [bz-cdi] }
  MK-ARQ-02: { nota: 4, confianza: alta, fuentes: [bz-cdi] }
  MK-ARQ-03: { nota: 4, confianza: alta, fuentes: [bz-cdi] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "Sí", confianza: media, fuentes: [bz-dpa] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [bz-gdpr-faq] }
  MK-PRI-05: { valor: "ISO 27001; SOC 2 Tipo 2; HIPAA; EU-US DPF", confianza: alta, fuentes: [bz-security-docs] }
  MK-IA-01: { nota: 4, confianza: alta, fuentes: [bz-predictive-churn] }
  MK-IA-02: { nota: 3, confianza: media, fuentes: [bz-agent-console] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [bz-mcp] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [bz-pricing] }
  MK-DEP-02: { nota: 2, confianza: baja, fuentes: [bz-pricing] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [bz-pricing] }
  MK-ECO-01: { nota: 4, confianza: baja, fuentes: [bz-forrester] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [bz-pricing] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [bz-cdi] }
  MK-COS-02: { nota: 1, confianza: alta, fuentes: [bz-pricing] }
---

# Braze

## Resumen

Braze es una plataforma de engagement multicanal (email, SMS, mensajes en producto, WhatsApp y más) con orquestación de journeys (Canvas), plataforma de datos con ingesta desde el warehouse (Cloud Data Ingestion) y exportación en streaming (Currents), y una capa de IA (BrazeAI: Predictive Suite, Decisioning Studio, Agent Console y servidor MCP)[^bz-pricing][^bz-cdi][^bz-ai-docs]. Se comercializa por usuarios activos mensuales (MAU) y créditos de acción[^bz-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 4/5
Ingesta por SDKs, API REST, Cloud Data Ingestion desde Redshift, Databricks, BigQuery, Microsoft Fabric y Snowflake y desde almacenamiento de objetos (S3, Azure Blob, GCS). No se ha extraído el recuento de SDKs.[^bz-arch][^bz-cdi]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado la captura server-side ni first-party.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 3/5
Braze anunció en 2024 resolución de identidad automatizada; la documentación de perfiles no se ha podido extraer, por lo que no se valoran límites de fusión.[^bz-forge24]

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta.

### MK-ID-03 · Perfil unificado y latencia · N/D
No se ha revisado la latencia de perfil.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · N/D
No se ha revisado la frecuencia de recálculo de segmentos.

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 4/5
Los CDI Segments y las *Connected Sources* permiten consultar el warehouse o el almacenamiento de ficheros sin copiar los datos a Braze para construir segmentos, además del constructor de segmentos de la plataforma.[^bz-cdi]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha localizado un recuento oficial de destinos.

### MK-ACT-02 · Canales de mensajería nativos · 4/5
Los créditos de acción cubren email, SMS y mensajes en producto, además de la generación con BrazeAI Agent Console; no se ha verificado WhatsApp en esta revisión.[^bz-pricing]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Cloud Data Ingestion sincroniza desde cinco warehouses y tres almacenamientos de objetos, y las Connected Sources ofrecen acceso sin copia.[^bz-cdi]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 4/5
Canvas modela entrada, ramas, esperas y salida de usuarios y se puede generar un borrador a partir de una descripción en lenguaje natural; no se ha revisado el versionado.[^bz-ai-docs]

### MK-ORQ-02 · Experimentación · 4/5
Decisioning Studio ejecuta experimentos continuos sobre oferta, canal, momento y frecuencia para maximizar una métrica; no se ha verificado la medición de incrementalidad.[^bz-decisioning]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 4/5
Editor con previsualización de correos en distintos clientes y dispositivos y en modos claro y oscuro, y comprobación de accesibilidad (WCAG) mediante Inbox Vision.[^bz-inbox-vision]

### MK-EML-02 · Autenticación y herramientas de deliverability · 5/5
Deliverability Center integra Google Postmaster y Microsoft SNDS (reputación, rebotes, aplazamientos) y Inbox Vision añade pruebas de spam; existe además el servicio Email Deliverability Essentials.[^bz-deliv-center][^bz-inbox-vision]

### MK-EML-03 · IP dedicada y gestión de reputación · 5/5
IP dedicadas con calentamiento automatizado y recalentamiento, y configuración de IP y dominios de envío; la reputación se monitoriza en el Deliverability Center.[^bz-ip-warming][^bz-ips-domains]

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha localizado en esta revisión la documentación de `List-Unsubscribe-Post`.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 4/5
Las *Connected Sources* consultan el warehouse sin copia y Snowflake Data Sharing evita transferir datos; los perfiles se mantienen en Braze.[^bz-cdi]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Cloud Data Ingestion con Redshift, Databricks, BigQuery, Fabric y Snowflake, acceso sin copia y Snowflake Secure Data Sharing.[^bz-cdi]

### MK-ARQ-03 · APIs y exportabilidad · 4/5
Currents exporta en streaming (cada cinco minutos o 15.000 eventos, lo primero que ocurra) y se puede combinar con Snowflake Data Sharing; además hay API REST.[^bz-cdi]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha revisado.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · Sí
Publica su DPA y suscribe las cláusulas contractuales tipo de la UE; no se ha revisado la lista de subencargados.[^bz-dpa]

### MK-PRI-04 · Datos en la UE · Sí
Su documentación de RGPD indica que ofrece a los clientes la opción de alojar sus datos; los clústeres de la UE no se han verificado en esta revisión.[^bz-gdpr-faq]

### MK-PRI-05 · Certificaciones · ISO 27001; SOC 2 Tipo 2; HIPAA; EU-US DPF
ISO 27001 renovada el 29/08/2025 con vencimiento el 15/12/2027, informe SOC 2 Tipo 2 y autocertificación en los marcos de privacidad de datos UE-EE. UU.[^bz-security-docs]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 4/5
Predictive Suite entrena modelos de gradient boosting para identificar usuarios en riesgo de abandono y usarlos como audiencia.[^bz-predictive-churn]

### MK-IA-02 · IA generativa de contenido · 3/5
BrazeAI Agent Console lleva generación de contenido a Canvas y Catalogs.[^bz-agent-console]

### MK-IA-03 · Agentes y MCP · 4/5
Servidor MCP oficial para acceder a activos, consultar datos y orquestar flujos entre espacios de trabajo mediante lenguaje natural; además, agentes propios y BrazeAI Operator.[^bz-mcp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS.[^bz-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 2/5
Cuatro ediciones (Go, Select, Pro, Enterprise) y prueba gratuita; la implantación empresarial requiere servicios.[^bz-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^bz-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 4/5
Forrester Wave (T1 2026) para proveedores de email: «Strong Performer» según el propio fabricante; no verificado en fuente independiente.[^bz-forrester]

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado el ecosistema de socios.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^bz-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con Currents y Snowflake Data Sharing para exportar datos.[^bz-cdi]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 1/5
Precio por MAU y créditos de acción sin importes públicos («hablar con un experto»); hay prueba gratuita.[^bz-pricing]


[^bz-arch]: Braze Docs, «Getting started: Architectural overview», https://www.braze.com/docs/developer_guide/getting_started/architecture_overview, consultado 2026-09-30.
[^bz-cdi]: Braze Docs, «Braze Cloud Data Ingestion», https://www.braze.com/docs/user_guide/data/unification/cloud_ingestion, consultado 2026-09-30.
[^bz-forge24]: Braze, «Pre-built data integrations, automated identity resolution and reporting (Forge 2024)», https://www.braze.com/resources/articles/forge-2024-braze-data-platform-announcements, consultado 2026-09-30.
[^bz-pricing]: Braze, «Pricing», https://www.braze.com/pricing, consultado 2026-09-30.
[^bz-ai-docs]: Braze Docs, «BrazeAI», https://www.braze.com/docs/user_guide/brazeai, consultado 2026-09-30.
[^bz-decisioning]: Braze Docs, «Getting started with BrazeAI Decisioning Studio», https://www.braze.com/docs/user_guide/brazeai/decisioning_studio, consultado 2026-09-30.
[^bz-inbox-vision]: Braze Docs, «Inbox Vision», https://www.braze.com/docs/user_guide/channels/email/inbox_vision, consultado 2026-09-30.
[^bz-deliv-center]: Braze Docs, «Deliverability Center», https://www.braze.com/docs/user_guide/analytics/dashboards/deliverability_center, consultado 2026-09-30.
[^bz-ip-warming]: Braze Docs, «Automated IP Warming», https://www.braze.com/docs/user_guide/channels/email/email_setup/ip_warming/automated_ip_warming, consultado 2026-09-30.
[^bz-ips-domains]: Braze Docs, «Set up IPs and domains», https://www.braze.com/docs/user_guide/channels/email/email_setup/setting_up_ips_and_domains, consultado 2026-09-30.
[^bz-dpa]: Braze, «Data Processing Addendum (Rev. March 2023)», https://marketing-assets.braze.com/production/hero/Braze-DPA-Rev-March-2023-FINAL-3.pdf?v=1680703997, consultado 2026-09-30.
[^bz-gdpr-faq]: Braze, «GDPR Compliance FAQ», https://marketing-assets.braze.com/production/hero/GDPR-Compliance-FAQ-2.pdf?v=1721903379, consultado 2026-09-30.
[^bz-security-docs]: Braze Docs, «Security Qualifications», https://www.braze.com/docs/developer_guide/disclosures/security_qualifications, consultado 2026-09-30.
[^bz-predictive-churn]: Braze Docs, «Predictive Churn», https://www.braze.com/docs/user_guide/brazeai/predictive_suite/predictive_churn, consultado 2026-09-30.
[^bz-agent-console]: Braze, «BrazeAI tools guide», https://www.braze.com/resources/articles/braze-ai-marketing-tools, consultado 2026-09-30.
[^bz-mcp]: Braze Docs, «About the Braze MCP server», https://www.braze.com/docs/user_guide/brazeai/mcp_server, consultado 2026-09-30.
[^bz-forrester]: Braze, «Braze named strong performer in The Forrester Wave for Email Marketing Service Providers, Q1 2026», https://www.braze.com/resources/articles/forrester-email-wave-q1-2026, consultado 2026-09-30.
