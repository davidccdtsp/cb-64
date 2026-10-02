---
id: salesforce-data-cloud
nombre: Salesforce Data Cloud (Data 360)
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 4, confianza: media, fuentes: [sf-fuzzy] }
  MK-ID-02: { nota: 4, confianza: media, fuentes: [sf-fuzzy] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [sf-segments] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [sf-segments] }
  MK-SEG-02: { nota: 4, confianza: media, fuentes: [sf-segments, sf-zerocopy] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [sf-activation] }
  MK-ACT-03: { nota: 4, confianza: media, fuentes: [sf-zerocopy] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [sf-activation] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [sf-activation] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [sf-zerocopy] }
  MK-ARQ-02: { nota: 5, confianza: media, fuentes: [sf-zerocopy, sf-zerocopy-iceberg] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [sf-consent] }
  MK-PRI-02: { nota: 4, confianza: media, fuentes: [sf-rtbf] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [sf-hyperforce-eu] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [sf-hyperforce-eu] }
  MK-DEP-02: { nota: 1, confianza: baja, fuentes: [sf-mavlers-pricing] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [sf-hyperforce-eu] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [sf-zerocopy] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [sf-zerocopy] }
  MK-COS-02: { nota: 3, confianza: media, fuentes: [sf-rate-sheet, sf-mavlers-pricing] }
---

# Salesforce Data Cloud (Data 360)

## Resumen

Salesforce Data Cloud, renombrada «Data 360» el 14 de octubre de 2025 dentro de Agentforce 360, es la CDP de Salesforce: ingesta, modelo de datos unificado, resolución de identidad con rulesets, segmentos y activación, con federación de datos «zero copy» con Snowflake, Databricks, BigQuery y Redshift[^sf-zerocopy][^sf-segments]. Se factura por créditos de consumo[^sf-rate-sheet]. La orquestación y el envío de mensajes corresponden a Marketing Cloud (ficha aparte).

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
No se ha revisado en esta ronda el catálogo de conectores y SDKs de ingesta.

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado la captura server-side y first-party.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
Las reglas de identidad se definen en *rulesets* con tipo de coincidencia, identificadores, prioridad de reglas y umbrales de confianza.[^sf-fuzzy]

### MK-ID-02 · Resolución probabilística / difusa · 4/5
La coincidencia difusa se puede aplicar a cualquier campo de texto (hasta 2 campos difusos por regla además del nombre y 6 por ruleset) con precisión ajustable.[^sf-fuzzy]

### MK-ID-03 · Perfil unificado y latencia · 4/5
Segmentos en tiempo real que se resuelven a demanda en milisegundos y activaciones en streaming; no se ha verificado la latencia de actualización del perfil.[^sf-segments]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Segmentos en tiempo real, con insights en streaming (agregación de series temporales) para actuar sobre interacciones en vivo.[^sf-segments]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 4/5
Segmentos construidos sobre el modelo de datos unificado, incluidos datos federados de warehouses externos sin copiarlos.[^sf-segments][^sf-zerocopy]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha localizado un recuento oficial de destinos de activación.

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Data Cloud publica segmentos en destinos de activación (plataformas de marketing, publicidad, sistemas operativos); el envío lo realiza Marketing Cloud u otro sistema.[^sf-activation]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Federación de datos bidireccional con delegación de consultas (*query pushdown*) en el warehouse de origen.[^sf-zerocopy]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
Data Cloud no orquesta journeys por sí mismo: se realiza en Marketing Cloud o mediante flujos (ficha aparte).[^sf-activation]

### MK-ORQ-02 · Experimentación · 0/5
Sin experimentación propia (corresponde a las aplicaciones de engagement).[^sf-activation]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/A
Data Cloud no envía email; lo hace Marketing Cloud.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/A
Ídem.

### MK-EML-03 · IP dedicada y gestión de reputación · N/A
Ídem.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/A
Ídem.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 4/5
La federación «zero copy» permite consultar datos de warehouses sin copiarlos ni duplicarlos, y compartir datos de Data Cloud hacia ellos; el perfil unificado se mantiene además en la propia plataforma.[^sf-zerocopy]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 5/5
Federación con Snowflake, Google BigQuery, Databricks y Amazon Redshift, y federación de ficheros sobre Apache Iceberg (AWS Lake Formation, Databricks, Snowflake).[^sf-zerocopy][^sf-zerocopy-iceberg]

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado la exportación de datos y APIs de salida.


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Documenta la gestión de consentimiento para Data Cloud, aplicada a las audiencias; no se ha revisado el detalle de aplicación por finalidad ni la integración con CMPs.[^sf-consent]

### MK-PRI-02 · Supresión y derechos de los interesados · 4/5
Políticas de derecho al olvido y Consent API para purgar perfiles individuales o masivos con constancia del borrado; no se ha verificado la propagación a todos los destinos.[^sf-rtbf]

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha revisado en fuente primaria el DPA y la lista de subencargados.

### MK-PRI-04 · Datos en la UE · Sí
Hyperforce EU Operating Zone almacena y procesa los datos de la UE estrictamente dentro de la región, con soporte en la región.[^sf-hyperforce-eu]

### MK-PRI-05 · Certificaciones · N/D
No se han revisado las certificaciones.


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha revisado la IA predictiva.

### MK-IA-02 · IA generativa de contenido · N/D
No se ha revisado la IA generativa de contenido.

### MK-IA-03 · Agentes y MCP · N/D
No se ha revisado en fuente primaria la disponibilidad de agentes y MCP sobre Data 360.


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS sobre Hyperforce.[^sf-hyperforce-eu]

### MK-DEP-02 · Esfuerzo de implantación y operación · 1/5
Producto empresarial de implantación por proyecto; fuentes de terceros describen consumo por créditos con compras mínimas.[^sf-mavlers-pricing]

### MK-DEP-03 · Autoalojable · No
Solo se ofrece como servicio en la nube de Salesforce.[^sf-hyperforce-eu]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado el ecosistema (AppExchange).


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^sf-zerocopy]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario, pero con federación bidireccional que reduce la duplicación y facilita la salida.[^sf-zerocopy]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 3/5
Salesforce publica una hoja de tarifas con multiplicadores de créditos por operación (p. ej. 100.000 créditos por millón de filas en resolución de identidad); el precio por crédito procede de fuentes secundarias (compra mínima de unos 100.000 créditos por unos 500 USD).[^sf-rate-sheet][^sf-mavlers-pricing]


[^sf-fuzzy]: Salesforce Help, «Improve Identity Resolution Match Rules with Fuzzy Matching», https://help.salesforce.com/s/articleView?language=en_US&id=release-notes.cdp_rn_2024_fuzzy_matching_more.htm&release=248&type=5, consultado 2026-09-30.
[^sf-segments]: Salesforce Help, «Create Segments in Data 360», https://help.salesforce.com/s/articleView?language=en_US&id=data.c360_a_segments.htm&type=5, consultado 2026-09-30.
[^sf-zerocopy]: Salesforce, «Data Cloud — Zero Copy Connectivity», https://www.salesforce.com/data/connectivity/zero-copy/, consultado 2026-09-30.
[^sf-activation]: Salesforce Help, «Activation for Data 360 Segments», https://help.salesforce.com/s/articleView?id=sf.c360_a_activation_for_a_segment.htm&language=en_US&type=5, consultado 2026-09-30.
[^sf-zerocopy-iceberg]: Salesforce, «Introducing Zero Copy File Federation in Data Cloud», https://www.salesforce.com/blog/unlock-trapped-data-in-your-data-lakes-introducing-zero-copy-file-federation-in-data-cloud/, consultado 2026-09-30.
[^sf-consent]: Salesforce Help, «Consent Management for Data Cloud», https://help.salesforce.com/s/articleView?id=xcloud.consent_management_c360_audiences.htm&language=en_US&type=5, consultado 2026-09-30.
[^sf-rtbf]: Salesforce Help, «Delete Data with Right to Be Forgotten Policies», https://help.salesforce.com/s/articleView?id=xcloud.right_to_be_forgotten.htm&language=en_US&type=5, consultado 2026-09-30.
[^sf-hyperforce-eu]: Salesforce, «Hyperforce: European Union Public Cloud Infrastructure», https://salesforce.com/products/data-residence-eu-oz, consultado 2026-09-30.
[^sf-mavlers-pricing]: Mavlers, «Salesforce Data Cloud Pricing Explained (2026 Guide)», https://www.mavlers.com/blog/salesforce-data-cloud-pricing-explained/, consultado 2026-09-30.
[^sf-rate-sheet]: Salesforce, «Data Cloud Platform Services Rate Sheet», https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/platform/data-cloud-platform-services-rate-sheet-dc-9-04.pdf, consultado 2026-09-30.
