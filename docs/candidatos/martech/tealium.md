---
id: tealium
nombre: Tealium
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas, byoc]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 5, confianza: media, fuentes: [tl-home, tl-iq] }
  MK-REC-02: { nota: 4, confianza: media, fuentes: [tl-home, tl-docs-csp] }
  MK-ID-01: { nota: 4, confianza: alta, fuentes: [tl-docs-stitching] }
  MK-ID-02: { nota: 2, confianza: media, fuentes: [tl-docs-stitching] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [tl-docs-as-intro, tl-ai] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [tl-docs-as-intro] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [tl-docs-as-intro, tl-cloud-activation] }
  MK-ACT-01: { nota: 5, confianza: media, fuentes: [tl-home] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [tl-docs-as-intro] }
  MK-ACT-03: { nota: 4, confianza: media, fuentes: [tl-cloud-activation] }
  MK-ORQ-01: { nota: 2, confianza: baja, fuentes: [tl-home] }
  MK-ORQ-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 3, confianza: media, fuentes: [tl-databricks, tl-cloud-activation] }
  MK-ARQ-02: { nota: 4, confianza: media, fuentes: [tl-cloud-activation, tl-databricks] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [tl-docs-as-intro] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [tl-ai, tl-security] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [tl-docs-csp] }
  MK-PRI-05: { valor: "SOC 2 Tipo II; ISO 27001; ISO 27018; ISO 27701; ISO 42001; HIPAA", confianza: media, fuentes: [tl-security] }
  MK-IA-01: { nota: 4, confianza: alta, fuentes: [tl-predict] }
  MK-IA-02: { nota: 2, confianza: baja, fuentes: [tl-ai] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [tl-ai] }
  MK-DEP-01: { valor: "saas; byoc", confianza: baja, fuentes: [tl-databricks] }
  MK-DEP-02: { nota: 2, confianza: baja, fuentes: [tl-pricing] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [tl-home] }
  MK-ECO-01: { nota: 4, confianza: baja, fuentes: [tl-home] }
  MK-ECO-02: { nota: 5, confianza: media, fuentes: [tl-home] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [tl-home] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [tl-cloud-activation] }
  MK-COS-02: { nota: 2, confianza: media, fuentes: [tl-pricing, tl-aws-marketplace] }
---

# Tealium

## Resumen

Tealium es una plataforma de datos de cliente que integra gestión de etiquetas (iQ), recogida de eventos (EventStream), CDP (AudienceStream con *visitor stitching*), activación desde el warehouse (Data Cloud Activation) y aprendizaje automático (Predict)[^tl-home]. Declara más de 850 clientes empresariales y más de 1.300 integraciones[^tl-home]. Es SaaS propietario.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 5/5
Gestor de etiquetas (iQ) con más de 1.300 integraciones de proveedores y recogida server-side (EventStream), con SDKs web y móviles.[^tl-home][^tl-iq]

### MK-REC-02 · Recogida server-side y first-party · 4/5
Recogida server-side mediante EventStream y dominios de recolección regionales; no se ha verificado en esta revisión la publicación bajo dominio propio (CNAME).[^tl-home][^tl-docs-csp]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
*Visitor stitching* patentado: combina en tiempo real identificadores (email, UID2, etc.) en un perfil maestro multi-dispositivo mediante identidad determinista.[^tl-docs-stitching]

### MK-ID-02 · Resolución probabilística / difusa · 2/5
El modelo es determinista; se documenta un ecosistema de socios de identidad, pero no coincidencia probabilística propia.[^tl-docs-stitching]

### MK-ID-03 · Perfil unificado y latencia · 4/5
AudienceStream mantiene perfiles unificados actualizados en tiempo real; un caso de cliente citado por el fabricante indica decisión y activación en menos de 300 ms.[^tl-docs-as-intro][^tl-ai]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Audiencias sobre perfiles con conectores que ejecutan acciones en tiempo real.[^tl-docs-as-intro]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Constructor de audiencias basado en atributos y activación de datos modelados en Snowflake, Databricks, BigQuery y Redshift; no se ha verificado consulta SQL directa sin copia.[^tl-docs-as-intro][^tl-cloud-activation]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 5/5
Más de 1.300 integraciones (etiquetas y APIs).[^tl-home]

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Los conectores actúan sobre plataformas de email, publicidad, redes sociales y CRM de terceros; no envía mensajes por sí mismo.[^tl-docs-as-intro]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Data Cloud Activation activa datos modelados de Snowflake, Databricks, BigQuery y Redshift.[^tl-cloud-activation]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 2/5
Ofrece orquestación de datos y acciones en tiempo real; no se ha verificado un lienzo visual de journeys propio.[^tl-home]

### MK-ORQ-02 · Experimentación · N/D
No se ha localizado experimentación en la documentación revisada.


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/A
No envía email.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/A
No envía email.

### MK-EML-03 · IP dedicada y gestión de reputación · N/A
No envía email.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/A
No envía email.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 3/5
Mantiene su propio almacén de perfiles y lo sincroniza en ambos sentidos con el warehouse (streaming a Snowflake en segundos, feed a Databricks y activación de datos modelados). Tealium se declara ahora construido sobre Databricks.[^tl-databricks][^tl-cloud-activation]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Snowflake mediante Snowpipe Streaming, Databricks con streaming de eventos y perfiles, BigQuery y Redshift.[^tl-cloud-activation][^tl-databricks]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API de perfiles (Moments API) y volcado en tiempo real al warehouse del cliente.[^tl-docs-as-intro]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Gestor de consentimiento propio para RGPD y CCPA; según el fabricante «el consentimiento viaja con cada evento» y la detección y cifrado de PII se ejecutan en línea.[^tl-ai][^tl-security]

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha localizado documentación de supresión/acceso de interesados.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha verificado la publicación de DPA y lista de subencargados; el Trust Center existe pero no se ha podido revisar.

### MK-PRI-04 · Datos en la UE · Sí
Ofrece centros de datos en la UE (Dublín y Frankfurt) y la región de los perfiles server-side se configura en los ajustes.[^tl-docs-csp]

### MK-PRI-05 · Certificaciones · SOC 2 Tipo II; ISO 27001; ISO 27018; ISO 27701; ISO 42001; HIPAA
Certificaciones declaradas por el fabricante.[^tl-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 4/5
Predict ML integrado en AudienceStream para predecir la probabilidad de cualquier comportamiento y usarla en audiencias.[^tl-predict]

### MK-IA-02 · IA generativa de contenido · 2/5
Ofrece un asistente en lenguaje natural para resumir perfiles y localizar atributos; no se ha verificado generación de contenido de campaña.[^tl-ai]

### MK-IA-03 · Agentes y MCP · 4/5
Servidor MCP disponible con carácter general: los agentes obtienen contexto del cliente, pertenencia a audiencias y estado de consentimiento, y pueden actuar mediante la capa de activación.[^tl-ai]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas; byoc
SaaS multi-región; el fabricante habla de Private Cloud en sus hojas de seguridad.[^tl-databricks]

### MK-DEP-02 · Esfuerzo de implantación y operación · 2/5
Implantación empresarial con account manager y contrato; no se ha localizado plan gratuito.[^tl-pricing]

### MK-DEP-03 · Autoalojable · No
No se ha localizado edición autoalojada.[^tl-home]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 4/5
Más de 850 clientes empresariales y reconocimiento de analistas declarado por el propio fabricante («2x Gartner Magic Quadrant Leader»); no verificado en fuente independiente.[^tl-home]

### MK-ECO-02 · Integraciones y marketplace · 5/5
Más de 1.300 integraciones y ecosistema de socios de warehouses y de identidad.[^tl-home]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^tl-home]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API y feeds de datos hacia el warehouse.[^tl-cloud-activation]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 2/5
El precio depende del volumen de eventos y del contrato («contactar con su account manager»); una oferta en AWS Marketplace referencia un precio desde 1.000 USD/mes con facturación anual.[^tl-pricing][^tl-aws-marketplace]


[^tl-home]: Tealium, «Customer Data Platform | Trusted Data for AI», https://tealium.com/, consultado 2026-09-30.
[^tl-iq]: Tealium, «Tealium iQ Features», https://tealium.com/tealium-iq-features/, consultado 2026-09-30.
[^tl-docs-csp]: Tealium Docs, «Content Security Policy (dominios de centros de datos UE)», https://docs.tealium.com/server-side/administration/tealium-content-security-policies-reference-guide/, consultado 2026-09-30.
[^tl-docs-stitching]: Tealium Docs, «About visitor stitching», https://docs.tealium.com/server-side/visitor-stitching/about/, consultado 2026-09-30.
[^tl-docs-as-intro]: Tealium Docs, «Introduction to AudienceStream», https://docs.tealium.com/server-side/getting-started/audiencestream-cdp/introduction/, consultado 2026-09-30.
[^tl-ai]: Tealium, «Tealium for AI», https://tealium.com/platform/tealium-for-ai/, consultado 2026-09-30.
[^tl-cloud-activation]: Tealium, «Data Cloud Activation», https://tealium.com/platform/cloud-activation/, consultado 2026-09-30.
[^tl-databricks]: Tealium, «Databricks and Tealium join forces», https://tealium.com/press-releases/databricks-better-together/, consultado 2026-09-30.
[^tl-security]: Tealium, «Data Security and Privacy Tools», https://tealium.com/resource/datasheet/tealium-data-security-and-privacy-tools/, consultado 2026-09-30.
[^tl-predict]: Tealium, «Tealium Predict ML», https://tealium.com/products/tealium-predict-machine-learning/, consultado 2026-09-30.
[^tl-pricing]: Tealium, «Tealium Pricing», https://tealium.com/tealium-pricing/, consultado 2026-09-30.
[^tl-aws-marketplace]: AWS Marketplace, «Tealium Event and Audience Data Hub», https://aws.amazon.com/marketplace/pp/prodview-qafd6co4nw45g, consultado 2026-09-30.
