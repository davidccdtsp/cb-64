---
id: listmonk
nombre: listmonk
dominio: martech
categoria: ma-oss
tipo: oss
licencia: AGPL-3.0
despliegue: [self-hosted, docker]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 1, confianza: media, fuentes: [lm-api-subs] }
  MK-REC-02: { nota: 3, confianza: media, fuentes: [lm-gh] }
  MK-ID-01: { nota: 1, confianza: media, fuentes: [lm-concepts] }
  MK-ID-02: { nota: 0, confianza: media, fuentes: [lm-concepts] }
  MK-ID-03: { nota: 1, confianza: baja, fuentes: [lm-concepts] }
  MK-SEG-01: { nota: 2, confianza: media, fuentes: [lm-concepts] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [lm-concepts] }
  MK-ACT-01: { nota: 1, confianza: baja, fuentes: [lm-concepts] }
  MK-ACT-02: { nota: 2, confianza: media, fuentes: [lm-concepts] }
  MK-ACT-03: { nota: 1, confianza: media, fuentes: [lm-api-subs] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [lm-concepts] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [lm-concepts] }
  MK-EML-01: { nota: 3, confianza: media, fuentes: [lm-concepts] }
  MK-EML-02: { nota: 2, confianza: media, fuentes: [lm-bounces] }
  MK-EML-03: { nota: 1, confianza: media, fuentes: [lm-gh] }
  MK-EML-04: { valor: "Sí", confianza: baja, fuentes: [lm-issue-unsub] }
  MK-ARQ-01: { nota: 1, confianza: media, fuentes: [lm-gh] }
  MK-ARQ-02: { nota: 1, confianza: baja, fuentes: [lm-gh] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [lm-api-subs] }
  MK-PRI-01: { nota: 2, confianza: media, fuentes: [lm-concepts] }
  MK-PRI-02: { nota: 3, confianza: media, fuentes: [lm-api-subs] }
  MK-PRI-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [lm-gh] }
  MK-PRI-05: { valor: "Ninguna declarada por el proyecto", confianza: media, fuentes: [lm-gh] }
  MK-IA-01: { nota: 0, confianza: media, fuentes: [lm-concepts] }
  MK-IA-02: { nota: 0, confianza: media, fuentes: [lm-concepts] }
  MK-IA-03: { nota: 0, confianza: media, fuentes: [lm-concepts] }
  MK-DEP-01: { valor: "self-hosted; docker", confianza: alta, fuentes: [lm-gh] }
  MK-DEP-02: { nota: 4, confianza: alta, fuentes: [lm-gh] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [lm-gh] }
  MK-ECO-01: { nota: 4, confianza: alta, fuentes: [lm-gh, lm-releases] }
  MK-ECO-02: { nota: 2, confianza: baja, fuentes: [lm-bounces] }
  MK-LIC-01: { valor: "Sí", confianza: alta, fuentes: [lm-gh, osi-agpl3] }
  MK-LIC-02: { nota: 5, confianza: media, fuentes: [lm-gh] }
  MK-COS-02: { nota: 5, confianza: media, fuentes: [lm-gh] }
---

# listmonk

## Resumen

listmonk es un gestor de newsletters y listas de correo autoalojado, en un único binario Go con PostgreSQL, con plantillas, gestión de rebotes, campañas y mensajes transaccionales[^lm-gh][^lm-concepts]. Es un envío de campañas, no una plataforma de journeys: no incluye automatización por eventos.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 1/5
Solo API REST y importación de suscriptores; sin SDKs ni seguimiento de eventos web.[^lm-api-subs]

### MK-REC-02 · Recogida server-side y first-party · 3/5
Autoalojado: los datos se recogen en el servidor del cliente, aunque solo mediante API/formularios de suscripción.[^lm-gh]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 1/5
Identifica suscriptores por email; sin resolución de identidad.[^lm-concepts]

### MK-ID-02 · Resolución probabilística / difusa · 0/5
No.[^lm-concepts]

### MK-ID-03 · Perfil unificado y latencia · 1/5
Registro del suscriptor con atributos JSON personalizados, sin perfil unificado en tiempo real.[^lm-concepts]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 2/5
Segmentación por atributos y condiciones evaluada al lanzar la campaña.[^lm-concepts]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Segmentación con consultas SQL sobre los suscriptores y atributos JSON personalizados; sin constructor visual de segmentos completo.[^lm-concepts]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 1/5
Mensajeros JSON extensibles (SMS, FCM) y webhooks; sin catálogo de destinos.[^lm-concepts]

### MK-ACT-02 · Canales de mensajería nativos · 2/5
Email de serie y otros canales (SMS, notificaciones FCM) mediante mensajeros configurables.[^lm-concepts]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 1/5
Importación por CSV y API de suscriptores.[^lm-api-subs]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
No incluye journeys ni automatización por eventos: envía campañas a listas y mensajes transaccionales.[^lm-concepts]

### MK-ORQ-02 · Experimentación · 0/5
No incluye pruebas A/B en los conceptos documentados.[^lm-concepts]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 3/5
Plantillas HTML reutilizables con expresiones de plantilla Go y, desde la versión 6.2, modo de compatibilidad con Outlook en el constructor visual.[^lm-concepts]

### MK-EML-02 · Autenticación y herramientas de deliverability · 2/5
Se conecta a un SMTP externo; procesa rebotes vía buzón POP o APIs de SES y SendGrid (y Azure), pero la autenticación SPF/DKIM/DMARC se configura en el proveedor.[^lm-bounces]

### MK-EML-03 · IP dedicada y gestión de reputación · 1/5
La IP de envío es la del SMTP configurado; no gestiona IP dedicadas.[^lm-gh]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
El proyecto genera las cabeceras `List-Unsubscribe` y `List-Unsubscribe-Post` cuando se activa la opción; hay incidencias abiertas por la experiencia de dos clics en Gmail.[^lm-issue-unsub]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 1/5
Almacena todo en PostgreSQL propio.[^lm-gh]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 1/5
Sin conectores de warehouses.[^lm-gh]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API REST de suscriptores, exportación de datos por suscriptor y datos en PostgreSQL del cliente.[^lm-api-subs]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Doble opt-in de suscripción y estado por lista; opción global de desactivar seguimiento de aperturas y clics (v6.1).[^lm-concepts]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
Exportación de los datos de un suscriptor y operaciones de borrado.[^lm-api-subs]

### MK-PRI-03 · DPA y subencargados publicados · N/A
Software autoalojado.

### MK-PRI-04 · Datos en la UE · Sí
Se autoaloja en la infraestructura del cliente.[^lm-gh]

### MK-PRI-05 · Certificaciones · Ninguna declarada por el proyecto
Proyecto comunitario.[^lm-gh]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 0/5
Sin funciones de IA.[^lm-concepts]

### MK-IA-02 · IA generativa de contenido · 0/5
Sin funciones de IA.[^lm-concepts]

### MK-IA-03 · Agentes y MCP · 0/5
Sin funciones de IA.[^lm-concepts]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · self-hosted; docker
Binario único y imágenes Docker.[^lm-gh]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Un único binario con PostgreSQL y Docker; despliegue sencillo.[^lm-gh]

### MK-DEP-03 · Autoalojable · Sí
Autoalojado por diseño.[^lm-gh]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 4/5
Unas 23,6 mil estrellas; versiones activas (v6.2.0 en junio de 2026, v6.1.0 en marzo de 2025 y v6.0.0 en enero de 2025).[^lm-gh][^lm-releases]

### MK-ECO-02 · Integraciones y marketplace · 2/5
Webhooks de rebotes con SES, SendGrid, Postmark y Azure, y mensajeros; sin marketplace.[^lm-bounces]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · Sí
AGPL-3.0, licencia aprobada por la OSI.[^lm-gh][^osi-agpl3]

### MK-LIC-02 · Apertura y riesgo de licencia · 5/5
Open source (AGPL) sin funciones restringidas, mantenido por un desarrollador principal (no fundación).[^lm-gh]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Sin coste de licencia; el coste es infraestructura y el proveedor SMTP.[^lm-gh]


[^lm-api-subs]: listmonk Docs, «API / Subscribers», https://listmonk.app/docs/apis/subscribers/, consultado 2026-09-30.
[^lm-gh]: listmonk (GitHub), «knadh/listmonk», https://github.com/knadh/listmonk, consultado 2026-09-30.
[^lm-concepts]: listmonk Docs, «Concepts», https://listmonk.app/docs/concepts/, consultado 2026-09-30.
[^lm-bounces]: listmonk Docs, «Bounce processing», https://listmonk.app/docs/bounces/, consultado 2026-09-30.
[^lm-issue-unsub]: listmonk (GitHub), «List-Unsubscribe header issue #1206», https://github.com/knadh/listmonk/issues/1206, consultado 2026-09-30.
[^lm-releases]: listmonk (GitHub), «Releases», https://github.com/knadh/listmonk/releases, consultado 2026-09-30.
[^osi-agpl3]: Open Source Initiative, «GNU Affero General Public License version 3», https://opensource.org/license/agpl-v3, consultado 2026-09-30.
