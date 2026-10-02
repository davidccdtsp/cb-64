---
id: mparticle
nombre: mParticle (by Rokt)
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 4, confianza: baja, fuentes: [mp-cdpcom] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 4, confianza: alta, fuentes: [mp-idsync] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [mp-idsync, mp-composable] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [mp-composable] }
  MK-SEG-02: { nota: 4, confianza: alta, fuentes: [mp-composable] }
  MK-ACT-01: { nota: 4, confianza: baja, fuentes: [mp-cdpcom] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [mp-cdpcom] }
  MK-ACT-03: { nota: 4, confianza: alta, fuentes: [mp-warehouse-sync] }
  MK-ORQ-01: { nota: 3, confianza: media, fuentes: [mp-composable] }
  MK-ORQ-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: alta, fuentes: [mp-composable] }
  MK-ARQ-02: { nota: 4, confianza: alta, fuentes: [mp-composable, mp-warehouse-sync] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { nota: 4, confianza: alta, fuentes: [mp-privacy-controls] }
  MK-PRI-02: { nota: 3, confianza: alta, fuentes: [mp-dsr] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [mp-localization] }
  MK-PRI-05: { valor: "ISO 27001; SOC 2 Tipo II", confianza: media, fuentes: [mp-security-press] }
  MK-IA-01: { nota: 4, confianza: alta, fuentes: [mp-predictive] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 2, confianza: baja, fuentes: [mp-cdpcom] }
  MK-DEP-01: { valor: "saas", confianza: media, fuentes: [mp-localization] }
  MK-DEP-02: { nota: 2, confianza: baja, fuentes: [mp-cdpcom] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [mp-localization] }
  MK-ECO-01: { nota: 3, confianza: baja, fuentes: [mp-adx-rokt] }
  MK-ECO-02: { nota: 4, confianza: baja, fuentes: [mp-cdpcom] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [mp-idsync] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [mp-warehouse-sync] }
  MK-COS-02: { nota: 1, confianza: baja, fuentes: [mp-cdpcom] }
---

# mParticle (by Rokt)

## Resumen

mParticle es una CDP en tiempo real centrada en aplicaciones móviles y web, con IDSync (identidad), Audiences en tiempo real, Composable Audiences (segmentación sin copia sobre el warehouse), Warehouse Sync y predicciones (Cortex)[^mp-idsync][^mp-composable][^mp-predictive]. En enero de 2025 fue adquirida por Rokt por unos 300 millones de dólares y opera como «mParticle by Rokt»[^mp-rokt-news][^mp-adx-rokt].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 4/5
La documentación consultada de SDKs no se ha podido extraer; fuentes secundarias citan más de 300 integraciones y SDKs para web, móvil y servidor. Se asigna 4 con confianza baja.[^mp-cdpcom]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha localizado documentación sobre captura server-side o cookies first-party.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
IDSync gestiona estrategia de identidad, identificadores deterministas, priorización y resolución de conflictos en tiempo real, con soporte multi-dispositivo.[^mp-idsync]

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta coincidencia probabilística en IDSync.

### MK-ID-03 · Perfil unificado y latencia · 4/5
Perfil en tiempo real y audiencias en tiempo real; no se publica latencia numérica.[^mp-idsync][^mp-composable]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Audiences en tiempo real (fusión de Real-Time Audiences y Journeys desde marzo de 2025); las audiencias composables, en cambio, se refrescan por programación.[^mp-composable]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 4/5
Composable Audiences traduce los criterios a SQL ejecutado en el warehouse del cliente, sin copiar los datos, y envía solo las altas y bajas de miembros; permite audiencias híbridas con criterios en tiempo real.[^mp-composable]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 4/5
Más de 300 integraciones según una fuente secundaria.[^mp-cdpcom]

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Activa hacia plataformas de email, publicidad y CRM; no se ha verificado envío propio.[^mp-cdpcom]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Warehouse Sync ingiere perfiles y eventos desde Snowflake, BigQuery, Redshift y Databricks, y Composable Audiences activa con lógica de diferencias.[^mp-warehouse-sync]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Audiences unifica la segmentación en tiempo real y los journeys; no se ha revisado el detalle del lienzo.[^mp-composable]

### MK-ORQ-02 · Experimentación · N/D
No se ha localizado experimentación.


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
Composable Audiences es una solución de cero copia: la segmentación se calcula en el warehouse; el perfil en tiempo real se mantiene aparte, por eso no llega al 5.[^mp-composable]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Integración con Snowflake, BigQuery, Redshift y Databricks en ambos sentidos.[^mp-composable][^mp-warehouse-sync]

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado la exportación de datos y APIs de salida.


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 4/5
ConsentState define propósitos de consentimiento por usuario, se almacena en el perfil, controla el flujo de datos hacia destinos y se envía a los integrados; admite consentimiento RGPD y exclusión CCPA.[^mp-privacy-controls]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
Implementación OpenDSR para borrado, acceso y portabilidad con coincidencia de perfiles por identidades; no se ha verificado la propagación a todos los destinos.[^mp-dsr]

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha verificado la publicación de DPA y subencargados.

### MK-PRI-04 · Datos en la UE · Sí
La oferta de localización de datos permite elegir el país o región de almacenamiento; no se ha podido confirmar qué regiones UE concretas existen.[^mp-localization]

### MK-PRI-05 · Certificaciones · ISO 27001; SOC 2 Tipo II
Certificaciones anunciadas por el fabricante.[^mp-security-press]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 4/5
Predictive Audiences usa el motor Cortex para predicciones de comportamiento (se regeneran semanalmente) y las emplea en audiencias.[^mp-predictive]

### MK-IA-02 · IA generativa de contenido · N/D
No se ha localizado generación de contenido.

### MK-IA-03 · Agentes y MCP · 2/5
Se menciona un «Audience Agent» (acceso anticipado) en la documentación; no se ha revisado en detalle.[^mp-cdpcom]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS con hospedaje regional (pods).[^mp-localization]

### MK-DEP-02 · Esfuerzo de implantación y operación · 2/5
Producto empresarial con precio por cotización; sin plan gratuito verificado.[^mp-cdpcom]

### MK-DEP-03 · Autoalojable · No
No se ha localizado edición autoalojada.[^mp-localization]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 3/5
Adquirida en 2025 por Rokt (unos 300 M$), lo que indica una base de clientes relevante; no verificado en fuente primaria.[^mp-adx-rokt]

### MK-ECO-02 · Integraciones y marketplace · 4/5
Más de 300 integraciones (fuente secundaria).[^mp-cdpcom]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario (los SDKs cliente se publican en GitHub).[^mp-idsync]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con integración bidireccional con el warehouse.[^mp-warehouse-sync]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 1/5
Precio por cotización basado en créditos ligados al volumen de eventos y perfiles; solo estimaciones de terceros.[^mp-cdpcom]


[^mp-cdpcom]: CDP.com, «What Is mParticle? CDP Features, Pricing, and Alternatives», https://cdp.com/articles/what-is-mparticle/, consultado 2026-09-30.
[^mp-idsync]: mParticle Docs, «IDSync overview», https://docs.mparticle.com/guides/idsync/introduction/, consultado 2026-09-30.
[^mp-composable]: mParticle Docs, «Composable Audiences Overview», https://docs.mparticle.com/guides/composable-audiences/overview/, consultado 2026-09-30.
[^mp-warehouse-sync]: mParticle Docs, «Warehouse Sync API Overview», https://docs.mparticle.com/developers/apis/warehouse-sync-api/overview/, consultado 2026-09-30.
[^mp-privacy-controls]: mParticle Docs, «Data Privacy Controls», https://docs.mparticle.com/guides/data-privacy-controls/, consultado 2026-09-30.
[^mp-dsr]: mParticle Docs, «Data Subject Requests», https://docs.mparticle.com/guides/data-subject-requests/, consultado 2026-09-30.
[^mp-localization]: mParticle, «Data Localization», https://www.mparticle.com/platform/detail/data-localization/, consultado 2026-09-30.
[^mp-security-press]: mParticle, «mParticle receives ISO 27001 certification and SOC 2 Type II attestation», https://www.mparticle.com/news/press-release-iso-27001-soc-2-type-ii/, consultado 2026-09-30.
[^mp-predictive]: mParticle Docs, «Predictive Audiences Overview», https://docs.mparticle.com/guides/segmentation/predictive-audiences/overview/, consultado 2026-09-30.
[^mp-adx-rokt]: AdExchanger, «Rokt Acquires mParticle For $300 Million», https://www.adexchanger.com/commerce/rokt-acquires-mparticle-for-300-million/, consultado 2026-09-30.
[^mp-rokt-news]: mParticle, «Rokt and mParticle Merge to Redefine Real-Time Relevance», https://www.mparticle.com/news/rokt-and-mparticle-merge/, consultado 2026-09-30.
