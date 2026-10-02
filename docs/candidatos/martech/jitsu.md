---
id: jitsu
nombre: Jitsu
dominio: martech
categoria: cdp-oss
tipo: hibrido
licencia: MIT
despliegue: [self-hosted, kubernetes, saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 3, confianza: media, fuentes: [jt-gh] }
  MK-REC-02: { nota: 4, confianza: media, fuentes: [jt-pricing, jt-gh] }
  MK-ID-01: { nota: 3, confianza: baja, fuentes: [jt-blog-cdp] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { nota: 0, confianza: media, fuentes: [jt-gh] }
  MK-SEG-02: { nota: 0, confianza: media, fuentes: [jt-gh] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [jt-gh] }
  MK-ACT-03: { nota: 0, confianza: media, fuentes: [jt-gh] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [jt-gh] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [jt-gh] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 3, confianza: media, fuentes: [jt-gh] }
  MK-ARQ-02: { nota: 3, confianza: media, fuentes: [jt-gh, jt-blog-214] }
  MK-ARQ-03: { nota: 4, confianza: media, fuentes: [jt-gh, jt-docs-mcp] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [jt-gh] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 4, confianza: alta, fuentes: [jt-docs-mcp] }
  MK-DEP-01: { valor: "self-hosted; kubernetes; saas", confianza: alta, fuentes: [jt-gh, jt-blog-214, jt-pricing] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [jt-pricing, jt-blog-214] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [jt-gh] }
  MK-ECO-01: { nota: 3, confianza: alta, fuentes: [jt-gh] }
  MK-ECO-02: { nota: 2, confianza: baja, fuentes: [jt-blog-214] }
  MK-LIC-01: { valor: "Sí", confianza: alta, fuentes: [jt-gh] }
  MK-LIC-02: { nota: 4, confianza: media, fuentes: [jt-gh, jt-pricing] }
  MK-COS-02: { nota: 4, confianza: alta, fuentes: [jt-pricing] }
---

# Jitsu

## Resumen

Jitsu es una alternativa open source a Segment: motor de ingesta de eventos programable con funciones JavaScript que entrega a warehouses (ClickHouse, BigQuery, Snowflake, Redshift, Postgres) y herramientas SaaS, con conectores de sincronización, grafo de identidad y *profile builder*[^jt-gh]. El repositorio está bajo licencia MIT y se autoaloja sin límites de uso ni funciones restringidas[^jt-gh]; existe también Jitsu Cloud[^jt-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 3/5
Recoge eventos de sitios web, apps y servidores y ofrece conectores para volcar datos de terceros al warehouse; no se ha verificado el número de SDKs oficiales.[^jt-gh]

### MK-REC-02 · Recogida server-side y first-party · 4/5
Permite dominios personalizados en todos los planes y se autoaloja, de modo que el colector puede servirse desde dominio propio; no se ha revisado la gestión de restricciones del navegador.[^jt-pricing][^jt-gh]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 3/5
Construye un grafo de identidad en tiempo real de forma incremental; la fuente es una publicación del propio fabricante y no se ha verificado su documentación técnica.[^jt-blog-cdp]

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta coincidencia probabilística.

### MK-ID-03 · Perfil unificado y latencia · N/D
Se documenta un *profile builder* que agrupa eventos en un perfil, pero no la latencia ni la API de lectura.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 0/5
El producto se describe como ingesta y entrega de datos; no incluye segmentación de audiencias.[^jt-gh]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 0/5
Sin constructor de audiencias.[^jt-gh]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
Los destinos son ilimitados en todos los planes, pero no se ha localizado un recuento oficial.

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Entrega datos a otras herramientas; no envía mensajes.[^jt-gh]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 0/5
Los conectores traen datos de terceros al warehouse; no se documenta reverse ETL desde el warehouse.[^jt-gh]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
Sin journeys.[^jt-gh]

### MK-ORQ-02 · Experimentación · 0/5
Sin experimentación.[^jt-gh]


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
Los eventos se escriben directamente en el warehouse del cliente; el perfil se construye con su propio motor.[^jt-gh]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Destinos de warehouse: ClickHouse, BigQuery, Snowflake, Redshift, Postgres y DuckDB/MotherDuck; no se cita Databricks ni formatos abiertos.[^jt-gh][^jt-blog-214]

### MK-ARQ-03 · APIs y exportabilidad · 4/5
Licencia MIT, datos en el warehouse del cliente y API de gestión.[^jt-gh][^jt-docs-mcp]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha localizado documentación de gestión de consentimiento.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha localizado documentación de supresión de interesados.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha localizado un DPA para Jitsu Cloud en las fuentes revisadas.

### MK-PRI-04 · Datos en la UE · Sí
El autoalojamiento completo permite mantener los datos en la infraestructura y región del cliente.[^jt-gh]

### MK-PRI-05 · Certificaciones · N/D
No se han localizado certificaciones declaradas.


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se documenta.

### MK-IA-02 · IA generativa de contenido · N/D
No se documenta.

### MK-IA-03 · Agentes y MCP · 4/5
Servidor MCP oficial (nube y autoalojado) con autenticación OAuth 2.1 que permite a agentes gestionar destinos, streams y conectores, leer eventos en vivo y consultar registros de auditoría.[^jt-docs-mcp]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · self-hosted; kubernetes; saas
Autoalojamiento (recomendado en Kubernetes/Helm), Jitsu Cloud y nube privada en los planes de pago.[^jt-gh][^jt-blog-214][^jt-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Plan gratuito en la nube (200 mil eventos activos/mes) y despliegue nativo en Kubernetes para producción.[^jt-pricing][^jt-blog-214]

### MK-DEP-03 · Autoalojable · Sí
Autoalojamiento completo sin límites de uso.[^jt-gh]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 3/5
Unas 5,1 mil estrellas, 404 forks y más de 3.700 commits, con desarrollo activo.[^jt-gh]

### MK-ECO-02 · Integraciones y marketplace · 2/5
Los destinos incluyen Resend, SendGrid, Statsig, DuckDB/MotherDuck y Xero; no se han verificado integraciones más amplias.[^jt-blog-214]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · Sí
Licencia MIT (aprobada por la OSI).[^jt-gh]

### MK-LIC-02 · Apertura y riesgo de licencia · 4/5
Open source (MIT) con oferta gestionada; el fabricante afirma que la edición autoalojada no tiene funciones restringidas. Gobernanza de empresa, no de fundación.[^jt-gh][^jt-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 4/5
Free 0 USD (200 mil eventos activos/mes), Business 99 USD/mes (2 millones de eventos activos; 40 USD por millón adicional), Enterprise a medida.[^jt-pricing]


[^jt-gh]: Jitsu (GitHub), «jitsucom/jitsu», https://github.com/jitsucom/jitsu, consultado 2026-09-30.
[^jt-pricing]: Jitsu, «Pricing», https://jitsu.com/pricing, consultado 2026-09-30.
[^jt-blog-cdp]: Jitsu, «Best Open-Source CDPs & Self-Hosted Segment Alternatives (2026)», https://jitsu.com/blog/open-source-cdp, consultado 2026-09-30.
[^jt-blog-214]: Jitsu, «Jitsu 2.14 is now public: Kubernetes-native for production self-hosting», https://jitsu.com/blog/jitsu-2-14, consultado 2026-09-30.
[^jt-docs-mcp]: Jitsu Docs, «MCP Server», https://jitsu.com/docs/mcp, consultado 2026-09-30.
