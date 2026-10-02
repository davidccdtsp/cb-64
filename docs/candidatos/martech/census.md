---
id: census
nombre: Census (Fivetran Activations)
dominio: martech
categoria: cdp-composable
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 1, confianza: media, fuentes: [fv-act-overview] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 2, confianza: baja, fuentes: [fv-act-overview, fv-blog-acquisition] }
  MK-SEG-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-02: { nota: 3, confianza: media, fuentes: [fv-act-audience-hub] }
  MK-ACT-01: { nota: 3, confianza: baja, fuentes: [fv-blog-acquisition] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [fv-act-overview] }
  MK-ACT-03: { nota: 4, confianza: media, fuentes: [fv-act-overview, fv-blog-acquisition] }
  MK-ORQ-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ORQ-02: { nota: 2, confianza: baja, fuentes: [fv-act-audience-hub] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [fv-blog-acquisition, fv-act-audience-hub] }
  MK-ARQ-02: { nota: 3, confianza: media, fuentes: [fv-blog-acquisition] }
  MK-ARQ-03: { nota: 2, confianza: baja, fuentes: [fv-act-migration-faq] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: baja, fuentes: [fv-act-migration-faq] }
  MK-PRI-05: { valor: "Fivetran declara SOC 2, HIPAA y RGPD (según el anuncio de adquisición)", confianza: baja, fuentes: [fv-blog-acquisition] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-DEP-01: { valor: "saas; hybrid (Fivetran)", confianza: media, fuentes: [fv-docs-security] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [fv-blog-census-joins] }
  MK-DEP-03: { valor: "No", confianza: baja, fuentes: [fv-act-overview] }
  MK-ECO-01: { nota: 3, confianza: baja, fuentes: [fv-blog-acquisition] }
  MK-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [fv-act-overview] }
  MK-LIC-02: { nota: 1, confianza: media, fuentes: [fv-act-migration-faq] }
  MK-COS-02: { nota: 3, confianza: media, fuentes: [fv-blog-census-joins] }
---

# Census (Fivetran Activations)

## Resumen

Census es una plataforma de reverse ETL y activación de datos desde el warehouse, adquirida por Fivetran en mayo de 2025 y renombrada «Fivetran Activations»[^fv-blog-acquisition]. La documentación de producto se ha migrado al sitio de Fivetran y el producto está en transición (retirada de espacios de trabajo y de Census Store/CSV)[^fv-act-migration-faq]. Muchos criterios quedan `N/D` porque la documentación pública actual es escueta.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 1/5
Activations trabaja como origen desde warehouses, streaming, aplicaciones SaaS y ficheros CSV; no es una herramienta de captura de eventos con SDKs propios según la documentación revisada.[^fv-act-overview]

### MK-REC-02 · Recogida server-side y first-party · N/D
No aplica a la captura: Activations no documenta SDKs ni colectores propios.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/D
No se ha localizado documentación de resolución de identidad en la documentación de Activations revisada.

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se ha localizado documentación de coincidencia probabilística.

### MK-ID-03 · Perfil unificado y latencia · 2/5
No mantiene un perfil propio: activa datos modelados en el warehouse. El anuncio de la adquisición menciona sincronizaciones «en vivo» de latencia de un segundo (Live Syncs) para escenarios de streaming; no se ha localizado documentación de producto de esa cifra.[^fv-act-overview][^fv-blog-acquisition]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · N/D
La documentación de Audience Hub no especifica la frecuencia de recálculo de audiencias.

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 3/5
Audience Hub ofrece un constructor visual de segmentos que funciona directamente sobre el warehouse, con condiciones entre entidades y segmentos. La documentación revisada no aborda el modo SQL, y la función es exclusiva del plan Enterprise.[^fv-act-audience-hub]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 3/5
Fuentes secundarias citan más de 150 herramientas operativas como destinos; no se ha localizado el catálogo oficial actualizado tras la migración a Fivetran.[^fv-blog-acquisition]

### MK-ACT-02 · Canales de mensajería nativos · 0/5
Envía datos a CRM, plataformas de marketing y herramientas de soporte (p. ej. Salesforce, Braze); no envía mensajes por sí mismo.[^fv-act-overview]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 4/5
Es un producto de reverse ETL sin código con gestión de mapeos, comportamientos, disparadores y programaciones; detecta cambios de esquema y ofrece observabilidad.[^fv-act-overview][^fv-blog-acquisition]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · N/D
No se ha localizado un orquestador de journeys en la documentación de Activations.

### MK-ORQ-02 · Experimentación · 2/5
Audience Hub menciona una sección de «Experimentos y análisis» y la posibilidad de experimentar con segmentos; no hay detalle de grupos de control ni de pruebas A/B.[^fv-act-audience-hub]


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
Los datos permanecen por defecto en el warehouse del cliente y las audiencias se construyen directamente sobre él.[^fv-blog-acquisition][^fv-act-audience-hub]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Se integra con Snowflake (caso de cliente citado en el anuncio) y con el resto de warehouses soportados; no se ha localizado una lista oficial completa ni lectura de formatos abiertos.[^fv-blog-acquisition]

### MK-ARQ-03 · APIs y exportabilidad · 2/5
Se está sustituyendo la API de espacios de trabajo por las API de Fivetran; la función de cargas CSV (Census Store) se retira el 1 de agosto de 2026. No se documenta exportación de datos en formatos abiertos.[^fv-act-migration-faq]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha localizado documentación de gestión del consentimiento en Activations.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha localizado documentación de supresión de interesados en Activations.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha localizado un DPA o una lista de subencargados específicos de Activations en la documentación revisada.

### MK-PRI-04 · Datos en la UE · Sí
La migración a Fivetran sustituye las IP de salida de Census por direcciones de Fivetran en EE. UU., UE y APAC, lo que indica presencia en la UE; el despliegue en regiones «se está ampliando gradualmente» sobre GCP.[^fv-act-migration-faq]

### MK-PRI-05 · Certificaciones · Fivetran declara SOC 2, HIPAA y RGPD (según el anuncio de adquisición)
La certificación exacta de Activations no se ha verificado en una fuente primaria de seguridad.[^fv-blog-acquisition]


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
Sin documentación de IA predictiva en las páginas revisadas.

### MK-IA-02 · IA generativa de contenido · N/D
Sin documentación de IA generativa en las páginas revisadas.

### MK-IA-03 · Agentes y MCP · N/D
Sin documentación de agentes/MCP en las páginas revisadas.


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas; hybrid (Fivetran)
Fivetran ofrece modelos SaaS y «Hybrid»; no está confirmado que Activations soporte el modelo híbrido.[^fv-docs-security]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Prueba gratuita de 14 días en cada conexión y activación, y un plan gratuito con asignación inicial; interfaz sin código.[^fv-blog-census-joins]

### MK-DEP-03 · Autoalojable · No
Se describe como producto «basado en la nube»; no se documenta edición autoalojada.[^fv-act-overview]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 3/5
Producto establecido, ahora respaldado por Fivetran; no se han verificado métricas de clientes o de comunidad en fuente primaria.[^fv-blog-acquisition]

### MK-ECO-02 · Integraciones y marketplace · N/D
No se ha localizado un marketplace o ecosistema de socios documentado.


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto SaaS propietario de Fivetran.[^fv-act-overview]

### MK-LIC-02 · Apertura y riesgo de licencia · 1/5
Propietario y en migración: se retiran funciones (espacios de trabajo, plantillas, Census Store) y los contratos anuales heredados pasan al modelo de consumo al vencer.[^fv-act-migration-faq]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 3/5
Precio por filas activas mensuales (MAR) con plan Free (3.500 MAR de Activations), Standard y Enterprise; no se publican importes por MAR y hay un estimador de precios.[^fv-blog-census-joins]


[^fv-act-overview]: Fivetran Docs, «Activations overview», https://fivetran.com/docs/activations, consultado 2026-09-30.
[^fv-blog-acquisition]: Fivetran, «Why Fivetran and Census are joining forces», https://www.fivetran.com/blog/why-fivetran-and-census-are-joining-forces, consultado 2026-09-30.
[^fv-act-audience-hub]: Fivetran Docs, «Audience Hub», https://fivetran.com/docs/activations/audience-hub, consultado 2026-09-30.
[^fv-act-migration-faq]: Fivetran Docs, «Census Migration Frequently Asked Questions», https://fivetran.com/docs/activations/census-migration-faq, consultado 2026-09-30.
[^fv-docs-security]: Fivetran Docs, «Security», https://fivetran.com/docs/security-and-privacy/security, consultado 2026-09-30.
[^fv-blog-census-joins]: Fivetran, «Census joins Fivetran’s consumption-based pricing», https://www.fivetran.com/blog/census-joins-fivetrans-consumption-based-pricing, consultado 2026-09-30.
