---
id: bloomreach
nombre: Bloomreach Engagement
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 3, confianza: media, fuentes: [br-docs-technical] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 3, confianza: media, fuentes: [br-docs-technical] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [br-docs-technical] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [br-docs-technical] }
  MK-SEG-02: { nota: 2, confianza: baja, fuentes: [br-docs-technical] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 5, confianza: alta, fuentes: [br-mobile-messaging] }
  MK-ACT-03: { nota: 2, confianza: media, fuentes: [br-docs-technical] }
  MK-ORQ-01: { nota: 3, confianza: baja, fuentes: [br-data-engine] }
  MK-ORQ-02: { nota: 3, confianza: media, fuentes: [br-ai] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 5, confianza: media, fuentes: [br-deliverability] }
  MK-EML-03: { nota: 4, confianza: media, fuentes: [br-deliverability] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 2, confianza: media, fuentes: [br-docs-technical] }
  MK-ARQ-02: { nota: 2, confianza: media, fuentes: [br-docs-technical] }
  MK-ARQ-03: { nota: 3, confianza: baja, fuentes: [br-docs-technical] }
  MK-PRI-01: { nota: 4, confianza: media, fuentes: [br-docs-consent, br-docs-privacy] }
  MK-PRI-02: { nota: 3, confianza: media, fuentes: [br-docs-privacy] }
  MK-PRI-03: { valor: "Sí", confianza: media, fuentes: [br-docs-privacy] }
  MK-PRI-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-05: { valor: "SOC 2; certificados ISO (detalle en el Portal de Seguridad de Bloomreach)", confianza: media, fuentes: [br-docs-privacy] }
  MK-IA-01: { nota: 4, confianza: media, fuentes: [br-ai] }
  MK-IA-02: { nota: 3, confianza: media, fuentes: [br-ai] }
  MK-IA-03: { nota: 3, confianza: media, fuentes: [br-ai] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [br-docs-technical] }
  MK-DEP-02: { nota: 1, confianza: media, fuentes: [br-pricing] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [br-docs-technical] }
  MK-ECO-01: { nota: 4, confianza: baja, fuentes: [br-deliverability] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [br-docs-technical] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [br-docs-technical] }
  MK-COS-02: { nota: 1, confianza: alta, fuentes: [br-pricing] }
---

# Bloomreach Engagement

## Resumen

Bloomreach Engagement combina un *customer data engine* (unificación de datos, resolución de identidad y capacidades de CDP) con orquestación de journeys, IA (Loomi) y analítica de marketing, con canales propios de email, SMS, push y WhatsApp[^br-data-engine][^br-mobile-messaging]. Se ejecuta como SaaS sobre Google Cloud[^br-docs-technical].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 3/5
SDK JavaScript para web, SDKs móviles y carga desde CSV/XML, bases SQL, almacenamiento de ficheros y API.[^br-docs-technical]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha localizado documentación de recogida server-side ni de cookies first-party.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 3/5
Gestiona identificadores «duros» (autenticados) y «blandos» (anónimos) y fusiona el perfil anónimo con el perfil conocido; no se han revisado límites ni auditoría de fusiones.[^br-docs-technical]

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta coincidencia probabilística.

### MK-ID-03 · Perfil unificado y latencia · 4/5
Vista única del cliente con actualización de datos en tiempo real que alimenta segmentos y campañas; no se publica latencia.[^br-docs-technical]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Segmentación y campañas en tiempo real sobre el perfil unificado.[^br-docs-technical]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Segmentación no-code sobre el perfil propio; el modo SQL y la definición sobre el warehouse no se han verificado.[^br-docs-technical]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha localizado un recuento oficial de destinos.

### MK-ACT-02 · Canales de mensajería nativos · 5/5
Email, SMS, RCS, WhatsApp, notificaciones push móviles y de navegador, bandeja en la app y personalización dentro de la app.[^br-mobile-messaging]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 2/5
Importa desde bases SQL, ficheros y API y exporta a BigQuery; no se ha verificado sincronización incremental de reverse ETL.[^br-docs-technical]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Se presenta como combinación de CDP con orquestación de journeys; no se ha revisado el detalle del constructor.[^br-data-engine]

### MK-ORQ-02 · Experimentación · 3/5
La personalización contextual prueba variantes de contenido de forma continua; no se ha verificado el A/B clásico ni los grupos de control.[^br-ai]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha revisado la documentación del editor de email.

### MK-EML-02 · Autenticación y herramientas de deliverability · 5/5
Configuración de SPF, DKIM y DMARC, soporte de BIMI, pruebas de colocación en bandeja, paneles de entregabilidad en tiempo real y monitorización de trampas de spam y listas de bloqueo.[^br-deliverability]

### MK-EML-03 · IP dedicada y gestión de reputación · 4/5
Gestión y calentamiento de IP dedicadas, con monitorización de listas de bloqueo; no se documenta gestión de subdominios o limitación por proveedor.[^br-deliverability]

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha localizado documentación explícita de `List-Unsubscribe-Post` (RFC 8058).


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
Almacena los datos en su propia base NoSQL de clientes y eventos; exporta a BigQuery.[^br-docs-technical]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 2/5
Conector de exportación a BigQuery y otros conectores de warehouse; no se documenta compartición sin copia.[^br-docs-technical]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API y exportaciones a warehouses.[^br-docs-technical]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 4/5
Categorías de consentimiento con estado propio y política de comunicación por categoría, herramientas de consentimiento de seguimiento (ePrivacy) e integración de CMP antes de inicializar el SDK.[^br-docs-consent][^br-docs-privacy]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
API y UI para acceso, supresión y portabilidad, con borrado y anonimización.[^br-docs-privacy]

### MK-PRI-03 · DPA y subencargados publicados · Sí
Mantiene un DPA que cubre la gestión de subencargados y transferencias con cláusulas contractuales tipo; no se ha revisado la lista pública de subencargados.[^br-docs-privacy]

### MK-PRI-04 · Datos en la UE · N/D
No se ha localizado en las fuentes revisadas una declaración de región UE.

### MK-PRI-05 · Certificaciones · SOC 2; certificados ISO (detalle en el Portal de Seguridad de Bloomreach)
La documentación remite al portal de seguridad para informes SOC 2 y certificados ISO.[^br-docs-privacy]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 4/5
Loomi identifica clientes en fuga, prevé los canales más rentables y la probabilidad de compra durante la sesión, y permite modelos propios.[^br-ai]

### MK-IA-02 · IA generativa de contenido · 3/5
Genera texto para email, SMS y notificaciones push.[^br-ai]

### MK-IA-03 · Agentes y MCP · 3/5
El Marketing Agent (marcado como «LIVE») convierte una instrucción en flujos de email completos; no se ha verificado servidor MCP.[^br-ai]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS en Google Cloud con opciones multi-tenant, single-tenant y exclusiva.[^br-docs-technical]

### MK-DEP-02 · Esfuerzo de implantación y operación · 1/5
La propia página de precios cita una media de 3 meses hasta el uso activo de la automatización de marketing; sin prueba gratuita.[^br-pricing]

### MK-DEP-03 · Autoalojable · No
Solo se describe como SaaS.[^br-docs-technical]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 4/5
El fabricante afirma ser líder en The Forrester Wave para proveedores de email (T3 2024); no verificado en fuente independiente.[^br-deliverability]

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado el ecosistema de integraciones y socios.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^br-docs-technical]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API y exportaciones.[^br-docs-technical]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 1/5
Suscripción anual con cuota por módulo más cuota de uso escalonada; sin importes públicos ni prueba gratuita.[^br-pricing]


[^br-docs-technical]: Bloomreach Docs, «Technical Overview», https://documentation.bloomreach.com/engagement/docs/technical-overview, consultado 2026-09-30.
[^br-mobile-messaging]: Bloomreach, «SMS, RCS & WhatsApp», https://www.bloomreach.com/en/products/marketing-automation/mobile-messaging, consultado 2026-09-30.
[^br-data-engine]: Bloomreach, «Customer Data Engine», https://www.bloomreach.com/en/products/data-engine, consultado 2026-09-30.
[^br-ai]: Bloomreach, «Marketing Intelligence and AI», https://www.bloomreach.com/en/products/engagement/marketing-intelligence-and-ai, consultado 2026-09-30.
[^br-deliverability]: Bloomreach, «Email Deliverability Services», https://bloomreach.com/en/products/engagement/email-marketing/email-deliverability, consultado 2026-09-30.
[^br-docs-consent]: Bloomreach Docs, «Consent management», https://documentation.bloomreach.com/engagement/docs/consent-management, consultado 2026-09-30.
[^br-docs-privacy]: Bloomreach Docs, «Privacy», https://documentation.bloomreach.com/engagement/docs/security-gdpr, consultado 2026-09-30.
[^br-pricing]: Bloomreach, «Marketing Automation Pricing», https://www.bloomreach.com/en/pricing/engagement, consultado 2026-09-30.
