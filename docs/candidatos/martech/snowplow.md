---
id: snowplow
nombre: Snowplow
dominio: martech
categoria: cdp-oss
tipo: hibrido
licencia: SLULA-1.1 (componentes del pipeline, source-available); otros componentes Apache-2.0/MIT
despliegue: [saas, byoc, self-hosted]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 4, confianza: alta, fuentes: [sp-docs-home, sp-pricing] }
  MK-REC-02: { nota: 4, confianza: media, fuentes: [sp-security, sp-docs-home] }
  MK-ID-01: { nota: 3, confianza: media, fuentes: [sp-docs-home] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 3, confianza: media, fuentes: [sp-docs-signals] }
  MK-SEG-01: { nota: 3, confianza: media, fuentes: [sp-docs-signals] }
  MK-SEG-02: { nota: 2, confianza: media, fuentes: [sp-docs-signals] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [sp-docs-home] }
  MK-ACT-03: { nota: 3, confianza: media, fuentes: [sp-pricing, sp-docs-signals] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [sp-docs-signals] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [sp-docs-home] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 4, confianza: media, fuentes: [sp-security, sp-docs-home] }
  MK-ARQ-02: { nota: 3, confianza: media, fuentes: [sp-docs-home] }
  MK-ARQ-03: { nota: 4, confianza: media, fuentes: [sp-docs-home] }
  MK-PRI-01: { nota: 2, confianza: media, fuentes: [sp-security] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [sp-security] }
  MK-PRI-05: { valor: "ISO 27001; SOC 2 Tipo 2; ISO/IEC 42001; HIPAA (elegible)", confianza: alta, fuentes: [sp-security] }
  MK-IA-01: { nota: 1, confianza: media, fuentes: [sp-docs-signals] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { nota: 2, confianza: baja, fuentes: [sp-docs-signals] }
  MK-DEP-01: { valor: "saas; byoc (Private Managed Cloud); self-hosted (requiere licencia comercial en producción)", confianza: alta, fuentes: [sp-pricing, sp-security, sp-docs-slula-faq] }
  MK-DEP-02: { nota: 3, confianza: media, fuentes: [sp-pricing] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [sp-pricing, sp-docs-slula-faq] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 3, confianza: media, fuentes: [sp-docs-home, sp-pricing] }
  MK-LIC-01: { valor: "No", confianza: alta, fuentes: [sp-docs-slula-faq, sp-license-change] }
  MK-LIC-02: { nota: 2, confianza: alta, fuentes: [sp-docs-slula-faq, sp-blog-license] }
  MK-COS-02: { nota: 1, confianza: media, fuentes: [sp-pricing] }
---

# Snowplow

## Resumen

Snowplow es una infraestructura de datos de cliente (*Customer Data Infrastructure*) que recoge eventos con más de 20 SDKs, los valida y enriquece y los entrega al warehouse, al lago o a un stream[^sp-docs-home]. Incluye modelado de datos (paquetes dbt), unión de identidades y *Signals* (atributos de usuario en tiempo real servidos por API)[^sp-docs-home][^sp-docs-signals]. **Cambio de licencia:** desde el 8 de enero de 2024 los componentes centrales del pipeline (Collector, Enrich, loaders, Iglu Server) pasaron de Apache-2.0 a la *Snowplow Limited Use License Agreement* (SLULA), que solo permite uso no productivo o no comercial; la versión 1.1 se publicó en diciembre de 2024[^sp-license-change][^sp-docs-slula-faq]. Por tanto, deja de ser open source (OSI) para uso productivo comercial.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 4/5
Más de 20 SDKs para web, móvil y servidor según la documentación (35+ trackers y webhooks según la página de precios), con recolector, enriquecimientos y validación de esquemas de eventos.[^sp-docs-home][^sp-pricing]

### MK-REC-02 · Recogida server-side y first-party · 4/5
El pipeline puede ejecutarse en la nube del cliente (Private Managed Cloud), ofrece seguimiento anónimo sin cookies y se integra con GTM Server-Side; no se ha verificado en esta revisión la guía de cookies first-party.[^sp-security][^sp-docs-home]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 3/5
La documentación incluye funciones de unión de identidad («identity stitching») junto a paquetes dbt para modelar los datos; no se ha revisado el detalle de reglas ni límites.[^sp-docs-home]

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se ha localizado coincidencia probabilística en la documentación revisada.

### MK-ID-03 · Perfil unificado y latencia · 3/5
Signals calcula atributos de usuario a medida que llegan los eventos (o desde tablas del warehouse) y los sirve por API; no se ha localizado una cifra de latencia.[^sp-docs-signals]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Las «intervenciones» de Signals disparan acciones cuando el usuario cumple criterios definidos sobre atributos calculados en tiempo real; no se documentan latencias de segundos.[^sp-docs-signals]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Los atributos se definen mediante código/configuración y se calculan en streaming o desde tablas del warehouse; no se ha localizado un constructor no-code de audiencias.[^sp-docs-signals]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
La página de precios menciona reenvío de eventos y Reverse ETL como funciones de la plataforma gestionada, sin un número de destinos citado.

### MK-ACT-02 · Canales de mensajería nativos · 0/5
No incluye mensajería propia: entrega datos a warehouses, streams y herramientas de terceros.[^sp-docs-home]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 3/5
Reverse ETL figura como función exclusiva de la plataforma gestionada y Signals puede sincronizar atributos desde tablas del warehouse.[^sp-pricing][^sp-docs-signals]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
Las intervenciones de Signals son disparadores simples; no hay orquestador de journeys.[^sp-docs-signals]

### MK-ORQ-02 · Experimentación · 0/5
No se documenta experimentación de campañas.[^sp-docs-home]


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
Los eventos validados se entregan al warehouse, lago o stream del cliente y el pipeline puede desplegarse en su propia cuenta cloud (AWS, GCP o Azure).[^sp-security][^sp-docs-home]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 3/5
Ofrece integraciones con warehouses y lagos de datos y paquetes dbt; no se ha verificado en esta revisión el soporte de formatos abiertos (Iceberg/Delta).[^sp-docs-home]

### MK-ARQ-03 · APIs y exportabilidad · 4/5
Los eventos en bruto son propiedad del cliente y se entregan a su warehouse/lago/stream; el modelado se hace con dbt sobre esos datos.[^sp-docs-home]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Permite registrar la base del seguimiento (consentimiento) como contexto del evento; no se ha verificado integración con CMPs ni propagación a destinos.[^sp-security]

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha localizado documentación de supresión de interesados.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha localizado un DPA ni lista de subencargados públicos en las páginas revisadas.

### MK-PRI-04 · Datos en la UE · Sí
El Private Managed Cloud aloja el pipeline en la cuenta cloud del propio cliente, por lo que los datos permanecen en la infraestructura y región que este elige.[^sp-security]

### MK-PRI-05 · Certificaciones · ISO 27001; SOC 2 Tipo 2; ISO/IEC 42001; HIPAA (elegible)
Certificaciones declaradas en la página de seguridad del fabricante.[^sp-security]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 1/5
Signals proporciona características de comportamiento que alimentan modelos de ML externos (p. ej. puntuación de leads); no ofrece modelos predictivos nativos.[^sp-docs-signals]

### MK-IA-02 · IA generativa de contenido · N/D
No se ha localizado generación de contenido.

### MK-IA-03 · Agentes y MCP · 2/5
Signals se presenta como contexto en tiempo real para agentes de IA; no se ha verificado un servidor MCP ni acciones de agente.[^sp-docs-signals]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas; byoc (Private Managed Cloud); self-hosted (requiere licencia comercial en producción)
Plataforma gestionada, nube privada gestionada en la cuenta del cliente y pipeline autoalojado.[^sp-pricing][^sp-security][^sp-docs-slula-faq]

### MK-DEP-02 · Esfuerzo de implantación y operación · 3/5
Prueba gratuita de 14 días sin tarjeta y consola de la plataforma; el pipeline autoalojado exige desplegar y operar la infraestructura.[^sp-pricing]

### MK-DEP-03 · Autoalojable · Sí
Existe un pipeline autoalojado; su uso productivo comercial requiere licencia comercial.[^sp-pricing][^sp-docs-slula-faq]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha localizado en fuente primaria una métrica pública de madurez (clientes, releases) en la revisión.

### MK-ECO-02 · Integraciones y marketplace · 3/5
Más de 35 trackers, webhooks, paquetes de modelos dbt, integración con GTM Server-Side y destinos de warehouse/lago.[^sp-docs-home][^sp-pricing]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Los componentes centrales del pipeline están bajo SLULA, que solo permite uso no productivo o no comercial y no es una licencia aprobada por la OSI.[^sp-docs-slula-faq][^sp-license-change]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Source-available con restricciones: el uso productivo comercial, incluso autoalojado, requiere licencia de pago. Riesgo de licencia materializado: cambio de Apache-2.0 a SLULA en enero de 2024.[^sp-docs-slula-faq][^sp-blog-license]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 1/5
La plataforma es «contactar con ventas» y el precio depende del volumen de eventos; solo se publica una prueba gratuita de 14 días.[^sp-pricing]


[^sp-docs-home]: Snowplow Docs, «Snowplow Documentation», https://docs.snowplow.io/docs/, consultado 2026-09-30.
[^sp-pricing]: Snowplow, «Pricing», https://snowplow.io/pricing, consultado 2026-09-30.
[^sp-security]: Snowplow, «Security», https://snowplow.io/security, consultado 2026-09-30.
[^sp-docs-signals]: Snowplow Docs, «Snowplow Signals — Introduction», https://docs.snowplow.io/docs/signals/introduction/, consultado 2026-09-30.
[^sp-docs-slula-faq]: Snowplow Docs, «FAQ: Snowplow Limited Use License Agreement (SLULA)», https://docs.snowplow.io/docs/resources/limited-use-license-faq/, consultado 2026-09-30.
[^sp-license-change]: Snowplow, «Snowplow OSS license change», https://snowplow.io/snowplow-oss-license-change, consultado 2026-09-30.
[^sp-blog-license]: Snowplow, «Introducing the Snowplow Limited Use License Agreement», https://snowplow.io/blog/introducing-snowplow-limited-use-license, consultado 2026-09-30.
