---
id: twilio-segment
nombre: Twilio Segment
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 4, confianza: media, fuentes: [sg-docs-sources, sg-docs-protocols] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 4, confianza: alta, fuentes: [sg-docs-identity, sg-docs-identity-settings] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [sg-docs-identity] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [sg-docs-journeys] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [sg-reverse-etl, sg-profiles-sync] }
  MK-ACT-01: { nota: 5, confianza: alta, fuentes: [sg-pricing-cdp] }
  MK-ACT-02: { nota: 3, confianza: media, fuentes: [sg-docs-journeys] }
  MK-ACT-03: { nota: 4, confianza: media, fuentes: [sg-reverse-etl] }
  MK-ORQ-01: { nota: 3, confianza: alta, fuentes: [sg-docs-journeys] }
  MK-ORQ-02: { nota: 3, confianza: media, fuentes: [sg-docs-journeys] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 3, confianza: media, fuentes: [sg-profiles-sync, sg-press-customerai] }
  MK-ARQ-02: { nota: 4, confianza: media, fuentes: [sg-reverse-etl, sg-press-customerai] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [sg-profiles-sync, sg-docs-deletion] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [sg-docs-onetrust] }
  MK-PRI-02: { nota: 4, confianza: alta, fuentes: [sg-docs-deletion] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [sg-docs-regional] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { nota: 4, confianza: media, fuentes: [sg-pricing-cdp, sg-press-customerai] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 2, confianza: baja, fuentes: [sg-pricing-cdp] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [sg-docs-regional] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [sg-pricing-connections] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [sg-pricing-cdp] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 4, confianza: media, fuentes: [sg-pricing-cdp] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [sg-pricing-cdp] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [sg-profiles-sync, sg-reverse-etl] }
  MK-COS-02: { nota: 3, confianza: alta, fuentes: [sg-pricing-connections, sg-pricing-cdp] }
---

# Twilio Segment

## Resumen

Twilio Segment es la CDP de Twilio: *Connections* (recogida y envío de datos a más de 700 destinos), *Unify* (perfiles con resolución de identidad), *Engage* (audiencias y journeys) y *Protocols* (calidad de datos), facturada por usuarios únicos mensuales (MTU)[^sg-pricing-cdp]. La documentación pública de segment.com bloquea las descargas automáticas; se han usado las páginas equivalentes en twilio.com y resultados de búsqueda oficiales. Muchos detalles quedan `N/D` por esa limitación.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 4/5
Catálogo oficial de fuentes y validación de eventos con planes de seguimiento (Protocols), que genera violaciones por eventos o propiedades no previstos y permite bloquearlos con controles de esquema. No se ha podido extraer el recuento de SDKs.[^sg-docs-sources][^sg-docs-protocols]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha podido acceder a la documentación de captura server-side y cookies first-party (la documentación devuelve HTTP 403 a descargas automáticas).


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
Tres reglas configurables (bloquear valores erróneos, límite de valores por identificador y prioridad) con *merge protection* y resolución en tiempo real; conserva un identificador persistente para varios identificadores externos y admite identificadores externos personalizados.[^sg-docs-identity][^sg-docs-identity-settings]

### MK-ID-02 · Resolución probabilística / difusa · N/D
La documentación revisada no menciona coincidencia probabilística.

### MK-ID-03 · Perfil unificado y latencia · 4/5
La documentación afirma que las fusiones del flujo de datos en tiempo real se realizan «con latencia mínima»; no se publica una cifra.[^sg-docs-identity]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Journeys admite entrada y salida en tiempo real según comportamiento y atributos; no se ha verificado la latencia de recálculo de audiencias.[^sg-docs-journeys]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Constructor de audiencias y activación de datos del warehouse (Reverse ETL) hacia perfiles y audiencias; los datos del warehouse se sincronizan como eventos, no se consultan sin copiarlos.[^sg-reverse-etl][^sg-profiles-sync]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 5/5
La página oficial habla de más de 700 destinos.[^sg-pricing-cdp]

### MK-ACT-02 · Canales de mensajería nativos · 3/5
Journeys conecta email, SMS y WhatsApp; no se ha verificado push ni in-app.[^sg-docs-journeys]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Reverse ETL con Snowflake, Databricks, Redshift y BigQuery; Profiles Sync escribe perfiles resueltos («golden record») en el warehouse como origen de reverse ETL.[^sg-reverse-etl]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Constructor visual con ramas por comportamiento y atributos, entrada y salida en tiempo real y campañas repetidas; requiere el plan Business.[^sg-docs-journeys]

### MK-ORQ-02 · Experimentación · 3/5
La documentación menciona pruebas A/B en journeys; no se ha verificado grupos de control ni medición de incrementalidad.[^sg-docs-journeys]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
El envío de email de Engage se apoya en Twilio SendGrid; sus capacidades de editor se evalúan en la ficha de SendGrid y no se ha podido verificar en la documentación de Segment.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/D
Ídem: delegado en Twilio SendGrid (véase su ficha).

### MK-EML-03 · IP dedicada y gestión de reputación · N/D
Ídem: delegado en Twilio SendGrid (véase su ficha).

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
Ídem: delegado en Twilio SendGrid (véase su ficha).


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 3/5
Mantiene su propio almacén de perfiles y lo sincroniza con el warehouse (Profiles Sync) y desde él (Reverse ETL); Twilio anuncia con Databricks y Snowflake capacidades de ejecución en el propio warehouse sin copia de datos.[^sg-profiles-sync][^sg-press-customerai]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Integraciones con Snowflake, Databricks, Redshift y BigQuery y anuncio de ejecución delegada en el warehouse (*push down*) sin copiar los datos.[^sg-reverse-etl][^sg-press-customerai]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
Puede volcar perfiles resueltos y datos de eventos al warehouse cliente y dispone de API pública; no se ha verificado exportación en formatos abiertos.[^sg-profiles-sync][^sg-docs-deletion]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Documenta gestión del consentimiento con envoltorio para OneTrust en Analytics.js; no se ha podido verificar el bloqueo por finalidad en destinos.[^sg-docs-onetrust]

### MK-PRI-02 · Supresión y derechos de los interesados · 4/5
Las «regulaciones» de supresión y borrado (SUPPRESS_ONLY, SUPPRESS_WITH_DELETE) se aplican a sus sistemas, warehouses conectados, buckets S3 y algunos destinos; hasta 5.000 usuarios por llamada y SLA de 30 días en almacenes internos. El borrado en destinos es parcial, por lo que no llega al 5.[^sg-docs-deletion]

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha podido verificar en fuente primaria la lista de subencargados ni el DPA específico de Segment.

### MK-PRI-04 · Datos en la UE · Sí
Los espacios de trabajo con región EU West (Dublín) almacenan y procesan los datos en la UE; por defecto los espacios son de EE. UU. y la región UE debe solicitarse a través del ejecutivo de cuenta.[^sg-docs-regional]

### MK-PRI-05 · Certificaciones · N/D
No se ha podido acceder a la página de cumplimiento de Segment.


## MK-IA · IA

### MK-IA-01 · IA predictiva · 4/5
Predictions (CustomerAI) estima la probabilidad de que un usuario realice un evento y se usa para audiencias predictivas dentro de la plataforma.[^sg-pricing-cdp][^sg-press-customerai]

### MK-IA-02 · IA generativa de contenido · N/D
No se ha verificado generación de contenido dentro de Segment.

### MK-IA-03 · Agentes y MCP · 2/5
La página de producto describe «Generative Audiences» (creación de audiencias asistida por IA); el servidor MCP que Twilio publica se refiere a sus API generales, no a Segment.[^sg-pricing-cdp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS con procesamiento en regiones de EE. UU. o UE.[^sg-docs-regional]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Plan gratuito hasta 1.000 MTU y prueba de 14 días del plan Team; la CDP completa requiere contactar con ventas.[^sg-pricing-connections]

### MK-DEP-03 · Autoalojable · No
Solo se documenta como servicio de Twilio; no se ha localizado edición autoalojada.[^sg-pricing-cdp]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente primaria el reconocimiento por analistas ni cifras de clientes.

### MK-ECO-02 · Integraciones y marketplace · 4/5
Más de 700 destinos y catálogo de fuentes propio, con funciones para crear destinos personalizados.[^sg-pricing-cdp]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Servicio propietario de Twilio.[^sg-pricing-cdp]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario, pero permite volcar los perfiles resueltos al warehouse y sincronizar de vuelta.[^sg-profiles-sync][^sg-reverse-etl]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 3/5
Connections: plan Free (1.000 MTU) y Team con base de 120 USD/mes y 10.000 MTU; la CDP completa (Unify + Engage) es «contactar con ventas».[^sg-pricing-connections][^sg-pricing-cdp]


[^sg-docs-sources]: Twilio Docs, «Sources Catalog», https://www.twilio.com/docs/segment/connections/sources/catalog, consultado 2026-09-30.
[^sg-docs-protocols]: Twilio Docs, «Protocols Overview», https://www.twilio.com/docs/segment/protocols, consultado 2026-09-30.
[^sg-docs-identity]: Twilio Docs, «Identity Resolution Overview», https://www.twilio.com/docs/segment/unify/identity-resolution, consultado 2026-09-30.
[^sg-docs-identity-settings]: Twilio Docs, «Identity Resolution Settings», https://www.twilio.com/docs/segment/unify/identity-resolution/identity-resolution-settings, consultado 2026-09-30.
[^sg-docs-journeys]: Twilio Docs, «Journeys overview», https://www.twilio.com/docs/segment/engage/journeys, consultado 2026-09-30.
[^sg-reverse-etl]: Twilio, «Reverse ETL: Activate Data from Your Warehouse», https://www.twilio.com/en-us/products/connections/reverse-etl, consultado 2026-09-30.
[^sg-profiles-sync]: Twilio, «Customer Profiles Sync», https://www.twilio.com/en-us/products/unify/profiles-sync, consultado 2026-09-30.
[^sg-pricing-cdp]: Twilio, «Customer Data Platform Pricing», https://www.twilio.com/en-us/pricing/customer-data, consultado 2026-09-30.
[^sg-press-customerai]: Twilio, «Twilio CustomerAI press release», https://www.twilio.com/en-us/press/releases/twilio-customerai-fuels-next-generation-customer-relationships-a, consultado 2026-09-30.
[^sg-docs-deletion]: Segment Docs, «User Deletion and Suppression», https://segment.com/docs/guides/best-practices/user-deletion-and-suppression/, consultado 2026-09-30.
[^sg-docs-onetrust]: Segment Docs, «Analytics.js OneTrust Wrapper», https://segment.com/docs/privacy/consent-management/onetrust-wrapper/, consultado 2026-09-30.
[^sg-docs-regional]: Twilio Docs, «Regional Segment», https://www.twilio.com/docs/segment/guides/regional-segment, consultado 2026-09-30.
[^sg-pricing-connections]: Twilio, «Connections pricing», https://www.twilio.com/en-us/products/connections/pricing, consultado 2026-09-30.
