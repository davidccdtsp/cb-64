---
id: adobe-journey-optimizer
nombre: Adobe Journey Optimizer (y Adobe Campaign)
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
  MK-SEG-02: { nota: 4, confianza: media, fuentes: [aj-fac] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-03: { nota: 4, confianza: media, fuentes: [aj-fac] }
  MK-ORQ-01: { nota: 4, confianza: baja, fuentes: [aj-email] }
  MK-ORQ-02: { nota: 4, confianza: media, fuentes: [aj-experiments] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 4, confianza: media, fuentes: [aj-deliverability] }
  MK-EML-03: { nota: 4, confianza: media, fuentes: [aj-ip-warmup, aj-product-desc] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [aj-fac] }
  MK-ARQ-02: { nota: 4, confianza: media, fuentes: [aj-fac] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [aj-hosting] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [aj-product-desc] }
  MK-DEP-02: { nota: 1, confianza: baja, fuentes: [aj-community-deliv] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [aj-product-desc] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [aj-product-desc] }
  MK-LIC-02: { nota: 1, confianza: baja, fuentes: [aj-pricing] }
  MK-COS-02: { nota: 1, confianza: baja, fuentes: [aj-pricing] }
---

# Adobe Journey Optimizer (y Adobe Campaign)

## Resumen

Adobe Journey Optimizer (AJO) es la aplicación de orquestación de journeys y mensajería (email, y otros canales) sobre Adobe Experience Platform, que reutiliza los perfiles y audiencias de Real-Time CDP[^aj-product-desc][^aj-email]. Adobe Campaign es el producto clásico de campañas de Adobe y queda fuera de esta ficha por falta de documentación revisada. Se comercializa por paquetes (Select, Prime, Ultimate) con precio por contrato[^aj-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
La captura de datos se realiza con Adobe Experience Platform (véase su ficha).

### MK-REC-02 · Recogida server-side y first-party · N/D
Ídem.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/D
La identidad reside en Identity Service (véase la ficha de Adobe Real-Time CDP).

### MK-ID-02 · Resolución probabilística / difusa · N/D
Ídem.

### MK-ID-03 · Perfil unificado y latencia · N/D
Ídem.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · N/D
Las audiencias proceden de Experience Platform.

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 4/5
La composición federada de audiencias permite usar tablas del warehouse (Snowflake, Databricks, BigQuery, Redshift y otros) sin copiar los datos.[^aj-fac]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha revisado.

### MK-ACT-02 · Canales de mensajería nativos · N/D
No se pudo extraer la descripción de producto con los canales de cada paquete (la página devolvió acceso denegado).

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Audiencias federadas desde el warehouse activadas en journeys y campañas.[^aj-fac]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 4/5
Orquestación de journeys en tiempo real con lienzo, según el fabricante; el detalle de versionado y límites no se ha revisado.[^aj-email]

### MK-ORQ-02 · Experimentación · 4/5
Ejecución de experimentos para identificar y escalar la mejor variante de email, con posibilidad de combinar segmentación (variantes por regla) y experimentación dentro de un mismo journey o campaña.[^aj-experiments]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha revisado el editor.

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
Comprueba SPF, DKIM, DMARC y PTR antes de activar un canal de email y ofrece una guía de entregabilidad con listas de supresión automáticas (rebotes y quejas); sin confirmación de BIMI ni inbox placement.[^aj-deliverability]

### MK-EML-03 · IP dedicada y gestión de reputación · 4/5
Planes de calentamiento de IP dentro de la interfaz y servicios de entregabilidad (calendarios de calentamiento, dominios e IP adecuados) según el producto.[^aj-ip-warmup][^aj-product-desc]

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha localizado documentación de `List-Unsubscribe-Post`.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 4/5
Patrón «zero copy»: los datos del warehouse se consultan sin copiarlos para construir audiencias.[^aj-fac]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 4/5
Amazon Redshift, Azure Synapse, Databricks, BigQuery, Snowflake, Vertica y Microsoft Fabric.[^aj-fac]

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado.


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
El consentimiento se procesa en Experience Platform (véase su ficha).

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
Ídem.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha verificado en fuente primaria.

### MK-PRI-04 · Datos en la UE · Sí
Experience Platform ofrece varios centros de datos y el cliente designa la región; el detalle de residencia en la UE para AJO no se ha verificado.[^aj-hosting]

### MK-PRI-05 · Certificaciones · N/D
No se han revisado.


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha revisado.

### MK-IA-02 · IA generativa de contenido · N/D
No se ha revisado.

### MK-IA-03 · Agentes y MCP · N/D
No se ha revisado.


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS.[^aj-product-desc]

### MK-DEP-02 · Esfuerzo de implantación y operación · 1/5
Implantación empresarial con configuración de dominios, IP y calentamiento.[^aj-community-deliv]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^aj-product-desc]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^aj-product-desc]

### MK-LIC-02 · Apertura y riesgo de licencia · 1/5
Propietario, con paquetes por contrato.[^aj-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 1/5
Página de precios por paquete (Select, Prime, Ultimate) sin importes públicos; la extracción automática no devolvió cifras.[^aj-pricing]


[^aj-fac]: Adobe Experience League, «Federated Audience Composition overview», https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/overview, consultado 2026-09-30.
[^aj-email]: Adobe, «Email Marketing Customer Journeys — Adobe Journey Optimizer», https://business.adobe.com/products/journey-optimizer/email-marketing.html, consultado 2026-09-30.
[^aj-experiments]: Adobe Experience League, «Combine targeting and experimentation», https://experienceleague.adobe.com/en/docs/journey-optimizer/using/content-management/message-optimization/optimization-combination, consultado 2026-09-30.
[^aj-deliverability]: Adobe Experience League, «Get started with deliverability», https://experienceleague.adobe.com/en/docs/journey-optimizer/using/monitor/deliverability/deliverability, consultado 2026-09-30.
[^aj-ip-warmup]: Adobe Experience League, «IP warmup deliverability guide», https://experienceleague.adobe.com/en/docs/journey-optimizer/using/configuration/implement-ip-warmup-plan/ip-warmup-deliverability-guide, consultado 2026-09-30.
[^aj-product-desc]: Adobe, «Adobe Journey Optimizer — Product Description», https://helpx.adobe.com/legal/product-descriptions/adobe-journey-optimizer.html, consultado 2026-09-30.
[^aj-hosting]: Adobe Trust Center, «Experience Cloud Hosting Locations», https://www.adobe.com/trust/experience-cloud-hosting-locations.html, consultado 2026-09-30.
[^aj-community-deliv]: Adobe Experience League Community, «Email Deliverability at Scale: Lessons from Building with Adobe Journey Optimizer», https://experienceleaguecommunities.adobe.com/t5/journey-optimizer-blogs/email-deliverability-at-scale-lessons-from-building-with-adobe/ba-p/761710, consultado 2026-09-30.
[^aj-pricing]: Adobe, «Journey Optimizer Product Pricing», https://business.adobe.com/products/journey-optimizer/pricing.html, consultado 2026-09-30.
