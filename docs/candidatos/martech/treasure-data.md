---
id: treasure-data
nombre: Treasure Data (Treasure AI)
dominio: martech
categoria: cdp-packaged
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 4, confianza: media, fuentes: [td-docs-idu] }
  MK-ID-02: { nota: 3, confianza: baja, fuentes: [td-identity] }
  MK-ID-03: { nota: 4, confianza: media, fuentes: [td-docs-rt-stitching] }
  MK-SEG-01: { nota: 3, confianza: baja, fuentes: [td-segmentation] }
  MK-SEG-02: { nota: 3, confianza: baja, fuentes: [td-segmentation] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ORQ-01: { nota: 3, confianza: baja, fuentes: [td-aws-ai-suites] }
  MK-ORQ-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 2, confianza: baja, fuentes: [td-aws-ai-suites] }
  MK-ARQ-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: media, fuentes: [td-api-endpoints] }
  MK-PRI-05: { valor: "SOC 2 Tipo 2; SOC 3; ISO 27001:2022; ISO 27701; ISO 27017; ISO 27018", confianza: alta, fuentes: [td-security] }
  MK-IA-01: { nota: 3, confianza: baja, fuentes: [td-segmentation] }
  MK-IA-02: { nota: 3, confianza: media, fuentes: [td-aws-ai-suites] }
  MK-IA-03: { nota: 3, confianza: media, fuentes: [td-docs-audience-agent, td-aws-ai-suites] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [td-aws-ai-suites] }
  MK-DEP-02: { nota: 2, confianza: baja, fuentes: [td-poc] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [td-aws-ai-suites] }
  MK-ECO-01: { nota: 4, confianza: baja, fuentes: [td-aws-ai-suites] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [td-aws-ai-suites] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [td-aws-ai-suites] }
  MK-COS-02: { nota: 2, confianza: media, fuentes: [td-aws-ai-suites] }
---

# Treasure Data (Treasure AI)

## Resumen

Treasure Data (que ahora opera bajo la marca Treasure AI) es una CDP empresarial con unificación de identidad (ID Unification y Real-Time ID Stitching), Audience Studio, segmentación predictiva y un conjunto de agentes de IA (*AI Suites*) para activar campañas[^td-docs-idu][^td-aws-ai-suites]. Su documentación se ha trasladado de docs.treasuredata.com a docs.treasure.ai.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/D
No se ha revisado en esta ronda el catálogo oficial de fuentes y SDKs.

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha localizado documentación de recogida server-side o cookies first-party.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 4/5
ID Unification asigna un `canonical_id` persistente a cada persona a partir de identificadores como email, cookie o ID de cliente, con soporte de varios identificadores canónicos.[^td-docs-idu]

### MK-ID-02 · Resolución probabilística / difusa · 3/5
La página de producto afirma coincidencia probabilística basada en modelos de ML, con prevalencia de lo determinista en conflicto; no se ha revisado documentación técnica de umbrales.[^td-identity]

### MK-ID-03 · Perfil unificado y latencia · 4/5
Existe una documentación específica de Real-Time ID Stitching: los eventos se unen al grafo de identidad de forma inmediata; no se publica latencia.[^td-docs-rt-stitching]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Según el fabricante, los paneles de audiencia se actualizan en tiempo real al construir segmentos; no se ha verificado la frecuencia de recálculo de la pertenencia.[^td-segmentation]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Audience Studio para perfiles de marketing con segmentación dinámica; no se ha verificado el modo SQL ni audiencias sobre el warehouse externo.[^td-segmentation]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha localizado un recuento oficial de destinos.

### MK-ACT-02 · Canales de mensajería nativos · N/D
No se ha verificado el envío propio de mensajes; los AI Suites hablan de orquestación multicanal.

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · N/D
No se ha revisado el soporte de activación desde warehouses externos.


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Orquestación multicanal con Treasure AI Studio y ejecución autónoma revisable; no se ha revisado el constructor de journeys.[^td-aws-ai-suites]

### MK-ORQ-02 · Experimentación · N/D
No se ha localizado experimentación.


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/A
No se ha localizado un motor de envío de email propio en las fuentes revisadas.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/A
Ídem.

### MK-EML-03 · IP dedicada y gestión de reputación · N/A
Ídem.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/A
Ídem.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
Los perfiles y eventos residen en el almacén propio de la plataforma.[^td-aws-ai-suites]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · N/D
No se ha revisado la integración con warehouses/lakehouses.

### MK-ARQ-03 · APIs y exportabilidad · N/D
No se ha revisado la exportación de datos.


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha localizado documentación de gestión de consentimiento.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha podido acceder a la documentación de solicitudes de interesados (las páginas localizadas devuelven 404).

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha podido verificar en fuente primaria el DPA y la lista de subencargados (las páginas localizadas devuelven 404).

### MK-PRI-04 · Datos en la UE · Sí
Dispone de sitios regionales (EE. UU., Tokio, UE 01 y AP02); en la región europea los datos residen físicamente en Alemania.[^td-api-endpoints]

### MK-PRI-05 · Certificaciones · SOC 2 Tipo 2; SOC 3; ISO 27001:2022; ISO 27701; ISO 27017; ISO 27018
Certificaciones anuales declaradas en su página de seguridad.[^td-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 3/5
El fabricante afirma puntuación predictiva y segmentación dinámica con modelos de ML integrados en la segmentación; la API de modelos predictivos localizada figura como heredada y no se ha podido revisar.[^td-segmentation]

### MK-IA-02 · IA generativa de contenido · 3/5
El AI Suite «Creative» se enfoca en generación de contenido.[^td-aws-ai-suites]

### MK-IA-03 · Agentes y MCP · 3/5
Audience Agent es un asistente LLM para dividir segmentos (función premium sujeta a solicitud) y los AI Suites ejecutan acciones revisables por personas.[^td-docs-audience-agent][^td-aws-ai-suites]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS desplegado en AWS.[^td-aws-ai-suites]

### MK-DEP-02 · Esfuerzo de implantación y operación · 2/5
Ofrece una prueba de concepto de dos semanas; producto empresarial con implantación de servicios.[^td-poc]

### MK-DEP-03 · Autoalojable · No
Solo se describe como SaaS.[^td-aws-ai-suites]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 4/5
Clientes citados por el fabricante (Nestlé, PMI, Nordstrom) y valoración 4,5/5 (165 reseñas) en AWS Marketplace.[^td-aws-ai-suites]

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha revisado el ecosistema.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^td-aws-ai-suites]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario.[^td-aws-ai-suites]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 2/5
Referencia indirecta en AWS Marketplace: contrato de 12 meses de 90.000 USD/año más 1 USD por unidad adicional para Treasure AI Suites; la plataforma CDP base es «contactar con ventas».[^td-aws-ai-suites]


[^td-docs-idu]: Treasure AI Docs, «What is ID Unification?», https://docs.treasure.ai/products/customer-data-platform/id-unification/p0_introduction, consultado 2026-09-30.
[^td-identity]: Treasure AI, «Identity Resolution», https://www.treasure.ai/product/identity-resolution, consultado 2026-09-30.
[^td-docs-rt-stitching]: Treasure AI Docs, «Real-Time ID Stitching Overview», https://docs.treasure.ai/products/customer-data-platform/real-time/real-time-id-stitching-overview, consultado 2026-09-30.
[^td-segmentation]: Treasure AI, «Segmentación y CDP inteligente», https://www.treasure.ai/product/intelligent-cdp/, consultado 2026-09-30.
[^td-aws-ai-suites]: AWS Marketplace, «Treasure AI Suites», https://aws.amazon.com/marketplace/pp/prodview-2okdekfzpigfo, consultado 2026-09-30.
[^td-api-endpoints]: Treasure AI API Docs, «Treasure AI Sites and API Endpoints», https://api-docs.treasuredata.com/en/overview/aboutendpoints, consultado 2026-09-30.
[^td-security]: Treasure AI, «CDP Security», https://www.treasure.ai/security/, consultado 2026-09-30.
[^td-docs-audience-agent]: Treasure AI Docs, «Audience Agent Overview», https://docs.treasure.ai/products/customer-data-platform/audience-studio/audience-agent/audience-agent-overview, consultado 2026-09-30.
[^td-poc]: Treasure AI, «CDP Proof of Concept», https://www.treasuredata.com/cdp-poc/, consultado 2026-09-30.
