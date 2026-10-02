---
id: rudderstack
nombre: RudderStack
dominio: martech
categoria: cdp-oss
tipo: hibrido
licencia: Elastic-2.0 (rudder-server, source-available); enterprise propietario
despliegue: [saas, self-hosted, kubernetes, docker]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 4, confianza: alta, fuentes: [rud-docs-sources] }
  MK-REC-02: { nota: 3, confianza: media, fuentes: [rud-docs-sources, rud-docs-governance] }
  MK-ID-01: { nota: 3, confianza: media, fuentes: [rud-docs-profiles] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 2, confianza: media, fuentes: [rud-docs-profiles, rud-pricing] }
  MK-SEG-01: { nota: 2, confianza: media, fuentes: [rud-docs-home, rud-pricing] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [rud-docs-home] }
  MK-ACT-01: { nota: 4, confianza: alta, fuentes: [rud-pricing, rud-docs-home] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [rud-docs-home] }
  MK-ACT-03: { nota: 4, confianza: alta, fuentes: [rud-docs-sources, rud-pricing] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [rud-docs-home] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [rud-docs-home] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [rud-docs-profiles, rud-docs-home] }
  MK-ARQ-02: { nota: 3, confianza: alta, fuentes: [rud-docs-sources] }
  MK-ARQ-03: { nota: 4, confianza: media, fuentes: [rud-docs-cloud-vs-oss, rud-docs-home] }
  MK-PRI-01: { nota: 3, confianza: alta, fuentes: [rud-docs-governance] }
  MK-PRI-02: { nota: 3, confianza: alta, fuentes: [rud-docs-governance] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [rud-dpa] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [rud-docs-architecture] }
  MK-PRI-05: { valor: "SOC 2 Tipo II (auditoría anual); HIPAA", confianza: alta, fuentes: [rud-security] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [rud-docs-ai] }
  MK-DEP-01: { valor: "saas; self-hosted (plano de datos); kubernetes; docker", confianza: alta, fuentes: [rud-docs-cloud-vs-oss, rud-docs-k8s] }
  MK-DEP-02: { nota: 3, confianza: media, fuentes: [rud-docs-k8s, rud-pricing] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [rud-docs-k8s] }
  MK-ECO-01: { nota: 3, confianza: media, fuentes: [rud-gh-readme] }
  MK-ECO-02: { nota: 3, confianza: media, fuentes: [rud-docs-home, rud-pricing] }
  MK-LIC-01: { valor: "No", confianza: alta, fuentes: [rud-gh-readme, rud-gh-license] }
  MK-LIC-02: { nota: 3, confianza: alta, fuentes: [rud-gh-readme, rud-blog-licensing] }
  MK-COS-02: { nota: 5, confianza: alta, fuentes: [rud-pricing] }
---

# RudderStack

## Resumen

RudderStack es una plataforma de pipelines de datos de cliente («CDP warehouse-first») con captura de eventos, reverse ETL, Profiles (identidad en el warehouse) y gobierno de datos[^rud-docs-home]. El servidor de eventos (rudder-server) está publicado bajo Elastic License 2.0, una licencia **source-available no aprobada por la OSI**[^rud-gh-readme]; una publicación de 2021 del propio fabricante lo describía bajo AGPL-3.0, por lo que se considera desactualizada[^rud-blog-licensing]. Las funciones de reverse ETL, transformaciones y SSO son propietarias[^rud-blog-licensing]. Se ofrece en nube gestionada y con plano de datos autoalojado[^rud-docs-cloud-vs-oss].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 4/5
SDKs para web (JavaScript, AMP), 8 plataformas móviles y 8 lenguajes de servidor, API HTTP y Pixel, webhook personalizado, más de 45 fuentes de aplicaciones cloud y 9 fuentes de warehouse para reverse ETL.[^rud-docs-sources]

### MK-REC-02 · Recogida server-side y first-party · 3/5
Ofrece SDKs de servidor y API HTTP oficiales y seguimiento sin cookies («cookieless tracking»); en el plano de datos autoalojado el colector reside en la infraestructura del cliente, aunque no se ha localizado la guía de cookies first-party servidas desde dominio propio.[^rud-docs-sources][^rud-docs-governance]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 3/5
Profiles declara tipos de identidad y reglas de unión (stitching) en YAML y las ejecuta como SQL en el warehouse; la documentación revisada no describe límites anti-fusión ni auditoría de cada fusión.[^rud-docs-profiles]

### MK-ID-02 · Resolución probabilística / difusa · N/D
La documentación de Profiles no especifica si existe coincidencia probabilística.

### MK-ID-03 · Perfil unificado y latencia · 2/5
El perfil se construye por lotes en el warehouse (Profiles es un marco declarativo que genera SQL); las sincronizaciones de warehouse son de 30 minutos en Growth y 5 minutos en Enterprise.[^rud-docs-profiles][^rud-pricing]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 2/5
Las audiencias («Audiences and Models») se calculan y activan mediante sincronizaciones periódicas desde el warehouse, no por evento.[^rud-docs-home][^rud-pricing]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Ofrece audiencias sobre datos del warehouse con enfoque SQL/declarativo (Profiles, Models) y una herramienta de audiencias en lenguaje natural (Rudder Lookout, en beta).[^rud-docs-home]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 4/5
Más de 200 destinos en la nube incluidos en todos los planes.[^rud-pricing][^rud-docs-home]

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Enruta eventos y audiencias a herramientas de terceros; no envía mensajes por sí mismo.[^rud-docs-home]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Reverse ETL desde Redshift, BigQuery, Snowflake, PostgreSQL, MySQL, Databricks, S3, Trino y SFTP (10 conexiones en Free, ilimitadas en Enterprise).[^rud-docs-sources][^rud-pricing]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
Las áreas de producto documentadas (Event Stream, Reverse ETL, Profiles, Activation, Monitor) no incluyen un orquestador de journeys.[^rud-docs-home]

### MK-ORQ-02 · Experimentación · 0/5
La documentación no incluye experimentación de campañas.[^rud-docs-home]


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

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 4/5
Profiles calcula el perfil dentro del warehouse del cliente («customer 360 en su warehouse»); los eventos se entregan al warehouse. El plano de datos autoalojado evita que los datos transiten por terceros.[^rud-docs-profiles][^rud-docs-home]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Conecta con Snowflake, BigQuery, Redshift, Databricks y Trino como origen de reverse ETL y como destino de eventos; no se ha verificado compartición sin copia ni lectura de Iceberg/Delta.[^rud-docs-sources]

### MK-ARQ-03 · APIs y exportabilidad · 4/5
Los eventos se entregan al warehouse del cliente y puede migrarse de plano de datos autoalojado a gestionado; existe API y CLI. No se ha verificado exportación en formatos abiertos.[^rud-docs-cloud-vs-oss][^rud-docs-home]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Gestión de consentimiento en cliente y en servidor, con integración con OneTrust y Ketch, y propagación a destinos.[^rud-docs-governance]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
La User Suppression API permite crear regulaciones para suspender la recogida y borrar los datos de un usuario en múltiples destinos.[^rud-docs-governance]

### MK-PRI-03 · DPA y subencargados publicados · Sí
Publica un Data Protection Addendum con la lista de subencargados incluida y un análisis de impacto de transferencias.[^rud-dpa]

### MK-PRI-04 · Datos en la UE · Sí
Los espacios de trabajo alojados por RudderStack pueden asociarse a una región (EE. UU. o UE) donde se procesan y almacenan los datos; el plano de datos autoalojado puede desplegarse en cualquier infraestructura del cliente.[^rud-docs-architecture]

### MK-PRI-05 · Certificaciones · SOC 2 Tipo II (auditoría anual); HIPAA
El sitio oficial declara SOC 2 Tipo II con validación anual por auditor externo; no se ha localizado ISO 27001.[^rud-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha localizado documentación de modelos predictivos nativos en las páginas revisadas.

### MK-IA-02 · IA generativa de contenido · N/D
No se ha localizado generación de contenido de campaña.

### MK-IA-03 · Agentes y MCP · 4/5
RudderStack MCP integra asistentes (Claude, Cursor, VS Code) con la plataforma y RudderAI es un agente disponible en Slack o en el panel; la mayoría de funciones están disponibles con carácter general (Rudder Lookout y RudderAI Reviewer en beta).[^rud-docs-ai]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas; self-hosted (plano de datos); kubernetes; docker
Nube gestionada y edición abierta con plano de datos autoalojado (Docker y Kubernetes con Helm; este último recomendado para producción).[^rud-docs-cloud-vs-oss][^rud-docs-k8s]

### MK-DEP-02 · Esfuerzo de implantación y operación · 3/5
Plan gratuito autoservicio en la nube; el modo autoalojado exige operar Kubernetes/Helm y, en la edición abierta, carece de transformaciones definidas por el usuario y de Live Events.[^rud-docs-k8s][^rud-pricing]

### MK-DEP-03 · Autoalojable · Sí
El plano de datos (rudder-server) puede autoalojarse; el plano de control lo gestiona RudderStack en la edición abierta.[^rud-docs-k8s]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 3/5
Repositorio principal con unas 4,5 mil estrellas; producto con actividad continuada de releases y documentación amplia.[^rud-gh-readme]

### MK-ECO-02 · Integraciones y marketplace · 3/5
Más de 200 destinos, integraciones con warehouses; no se ha verificado un marketplace de socios.[^rud-docs-home][^rud-pricing]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
rudder-server se publica bajo Elastic License 2.0, licencia source-available que prohíbe ofrecer el software como servicio gestionado; no está aprobada por la OSI.[^rud-gh-readme][^rud-gh-license]

### MK-LIC-02 · Apertura y riesgo de licencia · 3/5
Open core: núcleo con código publicado (source-available) y funciones enterprise propietarias. Cambio de licencia relevante: de AGPL-3.0 (2021) a Elastic License 2.0 (actual).[^rud-gh-readme][^rud-blog-licensing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Precios públicos: Free 0 USD (250 mil eventos/mes), Growth desde 265 USD/mes (15 % menos con pago anual), Enterprise a medida; unidad de facturación en eventos.[^rud-pricing]


[^rud-docs-sources]: RudderStack Docs, «Event Stream sources overview», https://www.rudderstack.com/docs/sources/overview/, consultado 2026-09-30.
[^rud-docs-governance]: RudderStack Docs, «Data Governance», https://www.rudderstack.com/docs/data-governance/, consultado 2026-09-30.
[^rud-docs-profiles]: RudderStack Docs, «Profiles overview», https://www.rudderstack.com/docs/profiles/overview/, consultado 2026-09-30.
[^rud-pricing]: RudderStack, «Pricing», https://www.rudderstack.com/pricing/, consultado 2026-09-30.
[^rud-docs-home]: RudderStack Docs, «Documentation», https://www.rudderstack.com/docs/, consultado 2026-09-30.
[^rud-docs-cloud-vs-oss]: RudderStack Docs, «RudderStack-managed Plans vs. RudderStack Open Source», https://www.rudderstack.com/docs/get-started/cloud-vs-open-source/, consultado 2026-09-30.
[^rud-dpa]: RudderStack, «Data Protection Addendum», https://www.rudderstack.com/data-privacy-addendum/, consultado 2026-09-30.
[^rud-docs-architecture]: RudderStack Docs, «RudderStack Architecture», https://www.rudderstack.com/docs/resources/rudderstack-architecture/, consultado 2026-09-30.
[^rud-security]: RudderStack, «Data security at scale», https://www.rudderstack.com/security/, consultado 2026-09-30.
[^rud-docs-ai]: RudderStack Docs, «AI features», https://www.rudderstack.com/docs/ai-features/, consultado 2026-09-30.
[^rud-docs-k8s]: RudderStack Docs, «RudderStack Kubernetes Setup», https://www.rudderstack.com/docs/get-started/rudderstack-open-source/data-plane-setup/kubernetes/, consultado 2026-09-30.
[^rud-gh-readme]: RudderStack (GitHub), «rudder-server — README (License)», https://github.com/rudderlabs/rudder-server#license, consultado 2026-09-30.
[^rud-gh-license]: RudderStack (GitHub), «rudder-server — LICENSE», https://github.com/rudderlabs/rudder-server/blob/master/LICENSE, consultado 2026-09-30.
[^rud-blog-licensing]: RudderStack, «RudderStack’s Licensing: Introduction (2021)», https://www.rudderstack.com/blog/rudderstacks-licensing-explained/, consultado 2026-09-30.
