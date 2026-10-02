---
id: hightouch
nombre: Hightouch
dominio: martech
categoria: cdp-composable
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 3, confianza: media, fuentes: [ht-docs-events, ht-docs-data] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 4, confianza: alta, fuentes: [ht-docs-identity-graph] }
  MK-ID-02: { nota: 3, confianza: media, fuentes: [ht-docs-identity-graph] }
  MK-ID-03: { nota: 3, confianza: media, fuentes: [ht-docs-personalization-api, ht-docs-identity-graph] }
  MK-SEG-01: { nota: 3, confianza: media, fuentes: [ht-docs-customer-studio] }
  MK-SEG-02: { nota: 4, confianza: media, fuentes: [ht-docs-customer-studio] }
  MK-ACT-01: { nota: 4, confianza: alta, fuentes: [ht-docs-data] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [ht-pricing, ht-docs-mcp] }
  MK-ACT-03: { nota: 4, confianza: alta, fuentes: [ht-docs-data] }
  MK-ORQ-01: { nota: 3, confianza: media, fuentes: [ht-docs-customer-studio] }
  MK-ORQ-02: { nota: 4, confianza: media, fuentes: [ht-docs-experiments] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [ht-security, ht-docs-regions] }
  MK-ARQ-02: { nota: 3, confianza: alta, fuentes: [ht-docs-customer-studio] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [ht-docs-api, ht-docs-events] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [ht-docs-consent] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [ht-docs-regions] }
  MK-PRI-05: { valor: "SOC 2 Tipo 2; ISO 27001", confianza: alta, fuentes: [ht-security] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { nota: 3, confianza: media, fuentes: [ht-ai-decisioning] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [ht-docs-mcp] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [ht-docs-regions] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [ht-docs-ss-pricing, ht-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [ht-docs-regions] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 3, confianza: media, fuentes: [ht-docs-data] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [ht-docs-data] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [ht-docs-api, ht-docs-data] }
  MK-COS-02: { nota: 2, confianza: media, fuentes: [ht-pricing, ht-docs-ss-pricing] }
---

# Hightouch

## Resumen

Hightouch es una plataforma de activación de datos que opera sobre el data warehouse del cliente (reverse ETL) y ha evolucionado a «Composable CDP» y a una plataforma de marketing agéntica[^ht-pricing]. Sus componentes son reverse ETL, Events, Customer Studio (audiencias y journeys), Identity Resolution y Personalization API[^ht-pricing][^ht-docs-customer-studio]. Es SaaS propietario; el envío de mensajes se hace a través de destinos externos.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 3/5
Hightouch Events ofrece SDKs para navegador, iOS, Android y Node.js, una API HTTP y conectores de streaming (Kafka, Pub/Sub); además se conecta a más de 30 fuentes de warehouse y plataformas de datos. No hemos localizado un catálogo con cientos de fuentes propias, por lo que no se otorga el 4.[^ht-docs-events][^ht-docs-data]

### MK-REC-02 · Recogida server-side y first-party · N/D
La documentación revisada de Events describe SDKs y API de servidor, pero no se ha localizado una descripción de cookies first-party servidas desde dominio propio ni de colector desplegable en la infraestructura del cliente.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
Identity Resolution ejecuta reglas deterministas por identificador con prioridades y límites de valores por perfil (los conflictos de mayor prioridad descartan la fusión) y escribe en el warehouse las tablas `_resolved`, `_resolved_identifiers` y `_unresolved`. No se ha localizado trazabilidad de cada fusión, por eso no se llega al 5.[^ht-docs-identity-graph]

### MK-ID-02 · Resolución probabilística / difusa · 3/5
La coincidencia probabilística existe como función opcional que requiere un bucket externo y ser activada por el equipo de Hightouch; no se documentan umbrales de confianza configurables (nivel 4).[^ht-docs-identity-graph]

### MK-ID-03 · Perfil unificado y latencia · 3/5
El perfil vive en el warehouse (tabla `_golden_records`) y la Personalization API permite consultar modelos del warehouse desde otras aplicaciones; no se ha localizado una cifra de latencia publicada.[^ht-docs-personalization-api][^ht-docs-identity-graph]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Customer Studio «reevalúa las audiencias a medida que cambian los datos del warehouse»; la frecuencia depende del ciclo de sincronización y no se documentan latencias de segundos.[^ht-docs-customer-studio]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 4/5
Las audiencias se construyen con un constructor visual (o con ayuda del agente) sobre modelos definidos en el warehouse, sin copiar los datos fuera de él; no se ha localizado una capa semántica o integración de modelos reutilizables (nivel 5).[^ht-docs-customer-studio]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 4/5
La documentación oficial declara más de 300 destinos (email, publicidad, CRM, analítica y webhooks personalizados).[^ht-docs-data]

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Los journeys y sincronizaciones envían a las plataformas de marketing del cliente («integraciones con cualquier plataforma de marketing»); no se ha localizado un motor de entrega propio de email, SMS o push.[^ht-pricing][^ht-docs-mcp]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Es el modelo principal: motor Lightning que calcula los cambios (CDC) en el propio warehouse y sincroniza con destinos, con registros de sincronización a nivel de fila. No se documenta sincronización casi en tiempo real generalizada, por lo que no se otorga el 5.[^ht-docs-data]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Los journeys permiten esperar entre pasos, ramificar por comportamiento o atributos y eliminar miembros al cumplir criterios de salida; no se han verificado límites de frecuencia ni versionado.[^ht-docs-customer-studio]

### MK-ORQ-02 · Experimentación · 4/5
Un experimento asigna aleatoriamente miembros de una audiencia a grupos (incluido un *holdout* sin tratamiento) y registra las filas excluidas para análisis en el warehouse. No se ha verificado medición de incrementalidad integrada.[^ht-docs-experiments]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/A
Hightouch no envía email por sí mismo: activa audiencias en plataformas de email de terceros.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/A
No envía email; la autenticación de dominio corresponde a la plataforma de envío conectada.

### MK-EML-03 · IP dedicada y gestión de reputación · N/A
No envía email; la IP dedicada corresponde a la plataforma de envío conectada.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/A
No envía email.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 4/5
Los perfiles, las audiencias y la identidad se calculan sobre el warehouse del cliente y los resultados se escriben en él. Hightouch afirma que «nunca almacena sus datos», aunque su documentación describe un bucket cifrado por región para el tránsito de las sincronizaciones; por eso no se otorga el 5.[^ht-security][^ht-docs-regions]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Customer Studio es compatible con Snowflake, Databricks, BigQuery, Redshift, Trino, Athena, Azure Synapse y Microsoft Fabric. No se ha localizado lectura de tablas Iceberg/Delta ni compartición sin copia.[^ht-docs-customer-studio]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
Ofrece una API pública y los eventos recogidos se almacenan en el warehouse del cliente, donde los datos son accesibles en su forma original; no se ha verificado emisión de eventos en bruto en streaming ni exportación en formatos abiertos.[^ht-docs-api][^ht-docs-events]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Hightouch Events incorpora un Consent Manager que permite aceptar o rechazar categorías y sincroniza las preferencias con los destinos configurados; la documentación también hace referencia a la integración con OneTrust.[^ht-docs-consent]

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha localizado documentación pública de un mecanismo de supresión/acceso de interesados. Al operar sobre el warehouse del cliente, la supresión de la fuente corresponde al cliente.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha localizado un DPA ni una lista de subencargados públicos en la documentación revisada.

### MK-PRI-04 · Datos en la UE · Sí
Ofrece regiones en la UE: AWS eu-west-1 (Irlanda) y Google Cloud europe-west1 (Bélgica). Los datos en tránsito permanecen en la región del espacio de trabajo, que se elige al crearlo.[^ht-docs-regions]

### MK-PRI-05 · Certificaciones · SOC 2 Tipo 2; ISO 27001
La página de seguridad declara «SOC 2 Type 2 e ISO 27001».[^ht-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha localizado documentación de modelos predictivos (propensión, abandono) en las páginas revisadas; la toma de decisiones con IA se basa en aprendizaje por refuerzo.

### MK-IA-02 · IA generativa de contenido · 3/5
La función «Content Assembly» genera contenido a partir de los recursos existentes y las guías de marca (disponible con carácter general según la página del producto). No se han verificado controles de aprobación.[^ht-ai-decisioning]

### MK-IA-03 · Agentes y MCP · 4/5
El MCP de Hightouch permite a un asistente leer el esquema y actuar (crear audiencias, diseñar journeys, generar creatividades) respetando los permisos del usuario; debe ser activado por Hightouch a petición del cliente.[^ht-docs-mcp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS en AWS, Google Cloud y Azure, con región elegida al crear el espacio de trabajo.[^ht-docs-regions]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Plan gratuito y plan de autoservicio con límite de sincronizaciones activas, usuarios ilimitados; requiere disponer ya de un warehouse con datos modelados.[^ht-docs-ss-pricing][^ht-pricing]

### MK-DEP-03 · Autoalojable · No
La documentación describe únicamente la versión alojada por Hightouch (regiones en tres nubes); no se documenta una edición autoalojada.[^ht-docs-regions]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha localizado una fuente primaria con cifras de clientes o releases; el reconocimiento de analistas no se ha verificado en fuente primaria.

### MK-ECO-02 · Integraciones y marketplace · 3/5
Más de 300 destinos y más de 30 fuentes de datos. No se ha verificado un marketplace o programa de socios propio.[^ht-docs-data]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto SaaS propietario; los conectores se ofrecen como servicio. No se ha localizado repositorio de código del producto.[^ht-docs-data]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario, pero los datos y modelos residen en el warehouse del cliente y hay una API pública, lo que facilita la salida.[^ht-docs-api][^ht-docs-data]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 2/5
Solo están publicados el plan gratuito (2 sincronizaciones activas) y los límites del autoservicio (10 sincronizaciones activas); la Composable CDP y la Agentic Marketing Platform figuran como «contactar con ventas». No se publican precios en moneda.[^ht-pricing][^ht-docs-ss-pricing]


[^ht-docs-events]: Hightouch Docs, «Events overview», https://hightouch.com/docs/events/overview, consultado 2026-09-30.
[^ht-docs-data]: Hightouch Docs, «Technical setup (Data teams & engineers)», https://hightouch.com/docs/getting-started/data, consultado 2026-09-30.
[^ht-docs-identity-graph]: Hightouch Docs, «Create an identity graph», https://hightouch.com/docs/identity-resolution/identity-graph, consultado 2026-09-30.
[^ht-docs-personalization-api]: Hightouch Docs, «Personalization API», https://hightouch.com/docs/destinations/personalization-api, consultado 2026-09-30.
[^ht-docs-customer-studio]: Hightouch Docs, «Customer Studio overview», https://hightouch.com/docs/customer-studio/overview, consultado 2026-09-30.
[^ht-pricing]: Hightouch, «Pricing», https://hightouch.com/pricing, consultado 2026-09-30.
[^ht-docs-mcp]: Hightouch Docs, «Hightouch MCP», https://hightouch.com/docs/ai-integrations/mcp, consultado 2026-09-30.
[^ht-docs-experiments]: Hightouch Docs, «Experiments», https://hightouch.com/docs/customer-studio/experiments, consultado 2026-09-30.
[^ht-security]: Hightouch, «Security», https://hightouch.com/security, consultado 2026-09-30.
[^ht-docs-regions]: Hightouch Docs, «Regions», https://hightouch.com/docs/security/regions, consultado 2026-09-30.
[^ht-docs-api]: Hightouch Docs, «Hightouch API (1.0.0)», https://hightouch.com/docs/api-reference, consultado 2026-09-30.
[^ht-docs-consent]: Hightouch Docs, «Consent Manager», https://hightouch.com/docs/events/consent/consent-manager, consultado 2026-09-30.
[^ht-ai-decisioning]: Hightouch, «AI Decisioning», https://hightouch.com/platform/ai-decisioning, consultado 2026-09-30.
[^ht-docs-ss-pricing]: Hightouch Docs, «Self-serve pricing», https://hightouch.com/docs/pricing/ss-pricing, consultado 2026-09-30.
