---
id: salesforce-marketing-cloud
nombre: Salesforce Marketing Cloud (Engagement)
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
  MK-SEG-02: { nota: 3, confianza: baja, fuentes: [sm-dc-zerocopy] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 4, confianza: media, fuentes: [sm-pricing] }
  MK-ACT-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ORQ-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ORQ-02: { nota: 3, confianza: baja, fuentes: [sm-einstein] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 4, confianza: media, fuentes: [sm-sap, sm-sap-guide] }
  MK-EML-03: { nota: 4, confianza: baja, fuentes: [sm-sap-guide] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 2, confianza: baja, fuentes: [sm-dc-zerocopy] }
  MK-ARQ-02: { nota: 4, confianza: media, fuentes: [sm-dc-zerocopy] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [sm-hyperforce-eu, sm-residency] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { nota: 3, confianza: alta, fuentes: [sm-einstein] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 3, confianza: baja, fuentes: [sm-pricing] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [sm-pricing] }
  MK-DEP-02: { nota: 1, confianza: baja, fuentes: [sm-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [sm-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [sm-pricing] }
  MK-LIC-02: { nota: 1, confianza: baja, fuentes: [sm-pricing] }
  MK-COS-02: { nota: 4, confianza: alta, fuentes: [sm-pricing] }
---

# Salesforce Marketing Cloud (Engagement)

## Resumen

Salesforce Marketing Cloud Engagement (ahora comercializado junto a Marketing Cloud Next / Agentforce Marketing) es la suite de email, SMS, push y WhatsApp de Salesforce, con Journey Builder, Einstein Engagement Scoring y activación de datos desde Data Cloud[^sm-pricing][^sm-einstein]. Se ofrece en ediciones «+» (Pro+, Corporate+, Enterprise+) con precio mensual de lista para la organización[^sm-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
No se ha revisado el catálogo de fuentes/SDKs (se apoya en Data Cloud y Web/Mobile SDK).

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/D
La resolución de identidad corresponde a Data Cloud (véase su ficha).

### MK-ID-02 · Resolución probabilística / difusa · N/D
Ídem.

### MK-ID-03 · Perfil unificado y latencia · N/D
Ídem.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · N/D
No se ha revisado.

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Segmentación en la plataforma y, mediante Data Cloud, audiencias con datos federados de warehouses sin copia.[^sm-dc-zerocopy]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha revisado.

### MK-ACT-02 · Canales de mensajería nativos · 4/5
Email, mensajes de aplicación móvil y conversaciones unificadas para SMS y WhatsApp en las ediciones superiores.[^sm-pricing]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · N/D
Corresponde a Data Cloud (véase su ficha).


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · N/D
No se ha extraído la documentación de Journey Builder; las ediciones «+» incluyen Flow & Orchestration de Marketing Cloud Next.

### MK-ORQ-02 · Experimentación · 3/5
Einstein Engagement Scoring permite dividir rutas en Journey Builder (divisiones por puntuación y por persona) y personalizar contenido.[^sm-einstein]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha revisado el editor.

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
El Sender Authentication Package proporciona dominio de marca, IP dedicada, dominio de enlace/imagen y autenticación SPF, Sender ID y DKIM; no se ha verificado DMARC nativo ni inbox placement.[^sm-sap][^sm-sap-guide]

### MK-EML-03 · IP dedicada y gestión de reputación · 4/5
IP dedicada como parte del SAP (recomendada a partir de 100.000 emails al mes); el calentamiento y la gestión de reputación no se han verificado en fuente primaria.[^sm-sap-guide]

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha localizado documentación primaria de `List-Unsubscribe-Post`.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
Los datos residen en Marketing Cloud y se enriquecen con Data Cloud (federación sin copia).[^sm-dc-zerocopy]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Mediante Data Cloud: federación con Snowflake, BigQuery, Databricks y Redshift.[^sm-dc-zerocopy]

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado.


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha revisado.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha verificado en fuente primaria.

### MK-PRI-04 · Datos en la UE · Sí
Hyperforce EU Operating Zone ofrece almacenamiento y tratamiento dentro de la UE; existe un artículo de residencia de datos para Marketing Cloud Engagement, cuyo contenido no se pudo extraer y puede tener excepciones por componente.[^sm-hyperforce-eu][^sm-residency]

### MK-PRI-05 · Certificaciones · N/D
No se han revisado las certificaciones.


## MK-IA · IA

### MK-IA-01 · IA predictiva · 3/5
Einstein Engagement Scoring predice la probabilidad de interacción con email y notificaciones push por contacto y se usa en audiencias, personas y divisiones de journeys.[^sm-einstein]

### MK-IA-02 · IA generativa de contenido · N/D
No se ha revisado.

### MK-IA-03 · Agentes y MCP · 3/5
Las ediciones «+» incluyen Agentforce Campaign Creation; no se ha verificado un servidor MCP.[^sm-pricing]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS.[^sm-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 1/5
Suite empresarial con planes de éxito y costes por edición; implantación mediante proyecto.[^sm-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^sm-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado (AppExchange).


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^sm-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 1/5
Propietario, con paquetes de plataforma y contratos anuales.[^sm-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 4/5
Precios de lista publicados por edición y facturados anualmente: Pro+ 2.000 USD/mes (15 mil contactos; 2,5 M emails), Corporate+ 5.500 USD/mes (45 mil contactos; 10 M emails) y Enterprise+ 30.000 USD/mes (500 mil contactos; 150 M emails).[^sm-pricing]


[^sm-dc-zerocopy]: Salesforce, «Data Cloud — Zero Copy Connectivity», https://www.salesforce.com/data/connectivity/zero-copy/, consultado 2026-09-30.
[^sm-pricing]: Salesforce, «Marketing Cloud Engagement Pricing», https://www.salesforce.com/marketing/engagement/pricing/, consultado 2026-09-30.
[^sm-einstein]: Salesforce Help, «Einstein Engagement Scoring», https://help.salesforce.com/s/articleView?id=mktg.mc_anb_einstein_engagement_scoring.htm&language=en_US&type=5, consultado 2026-09-30.
[^sm-sap]: Salesforce Help, «Working with the Email Sender Authentication Package», https://help.salesforce.com/s/articleView?id=mc_es_sender_authentication_package.htm&language=en_US&type=5, consultado 2026-09-30.
[^sm-sap-guide]: Salesforce Ben, «Sender Authentication Package (SAP) for Marketing Cloud», https://www.salesforceben.com/sender-authentication-package-sap-for-marketing-cloud-do-you-need-it/, consultado 2026-09-30.
[^sm-hyperforce-eu]: Salesforce, «Hyperforce: European Union Public Cloud Infrastructure», https://salesforce.com/products/data-residence-eu-oz, consultado 2026-09-30.
[^sm-residency]: Salesforce Help, «Data Residency (Marketing Cloud Engagement, Hyperforce)», https://help.salesforce.com/s/articleView?id=sf.mc_anb_data_residency_hyperforce.htm&language=en_US, consultado 2026-09-30.
