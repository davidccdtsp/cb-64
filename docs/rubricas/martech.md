# Rúbrica — Bloque B: MarTech

## Categorías de candidatos

Vocabulario controlado del campo `categoria` de cada ficha (`candidatos/martech/<id>.md`).

<!-- CATEGORIAS -->

| Categoría (`categoria`) | Descripción | Candidatos en esta base |
|---|---|---|
| `cdp-packaged` | CDP / plataforma de datos de cliente propietaria y empaquetada: almacena su propia copia del perfil unificado. | Salesforce Data Cloud, Adobe Real-Time CDP, Twilio Segment, Tealium, mParticle, Bloomreach, Treasure Data |
| `cdp-composable` | Capa de activación y modelado que opera sobre el data warehouse / lakehouse del cliente (warehouse-native, reverse ETL). | Hightouch, Census |
| `cdp-oss` | CDP / pipeline de datos de cliente con código publicado (open source, open core o source-available). | RudderStack, Apache Unomi, Jitsu, Snowplow |
| `ma-cloud` | Email marketing / marketing automation / plataforma de engagement en SaaS. | Salesforce Marketing Cloud, Adobe Journey Optimizer, Braze, HubSpot Marketing Hub, Klaviyo, Mailchimp, Brevo, Customer.io |
| `ma-oss` | Email marketing / marketing automation de código abierto y autoalojable. | Mautic, listmonk, Dittofeed, Keila |
| `email-transporte` | Servicio de envío de email (SMTP/API), sin editor de campañas ni segmentación. | Amazon SES, SendGrid, Postmark |

<!-- /CATEGORIAS -->

`categoria` clasifica *qué hace* el candidato; `tipo` (`cloud` / `oss` / `hibrido`) clasifica *su modelo de licencia y distribución*: `cloud` = SaaS propietario; `oss` = código abierto o source-available autoalojable sin oferta gestionada propia evaluada; `hibrido` = código publicado con oferta gestionada del mismo proyecto. Para cada candidato con código publicado se distingue además, en `LIC-01`/`LIC-02`, entre open source (aprobado por la OSI), source-available y open core.

## Resumen de dimensiones

<!--  DIMENSIONES  -->

| Dimensión | Nombre | Nº criterios | Peso agregado por defecto |
|---|---|---|---|
| MK-REC | Recogida de datos | 2 | 4 |
| MK-ID | Identidad y perfil unificado | 3 | 6 |
| MK-SEG | Segmentación y audiencias | 2 | 4 |
| MK-ACT | Activación y canales | 3 | 7 |
| MK-ORQ | Orquestación y experimentación | 2 | 4 |
| MK-EML | Email | 4 | 9 |
| MK-ARQ | Arquitectura e integración con datos | 3 | 8 |
| MK-PRI | Privacidad y cumplimiento | 5 | 12 |
| MK-IA | IA | 3 | 5 |
| MK-DEP | Despliegue y operación | 3 | 4 |
| MK-ECO | Ecosistema y madurez | 2 | 4 |
| MK-LIC | Licencia | 2 | 4 |
| MK-COS | Coste | 1 | 4 |

<!--  /DIMENSIONES  -->
---

<!-- VALOR -->

## MK-REC · Recogida de datos

### MK-REC-01 — SDKs y fuentes de datos
- **Descripción:** Cobertura oficial de captura de eventos y de fuentes de datos.
- **Pregunta:** ¿Qué SDKs, APIs y conectores de fuente mantiene oficialmente el candidato (web, móvil, servidor, SaaS, streaming)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin captura propia ni importación. | Solo API HTTP o carga de ficheros (CSV). | SDK web y al menos un SDK móvil o servidor, más API. | SDKs oficiales para web, iOS, Android y ≥3 lenguajes de servidor, más conectores a fuentes SaaS. | Además fuentes de warehouse/streaming (Kafka, Kinesis, Pub/Sub) documentadas en catálogo oficial. | Catálogo oficial con más de 300 fuentes/SDKs mantenidos por el fabricante, incluidos dispositivos OTT/servidor, y esquemas o *tracking plans* validados en ingesta. |

### MK-REC-02 — Recogida server-side y first-party
- **Descripción:** Capacidad de capturar datos sin depender de cookies de terceros ni del navegador.
- **Pregunta:** ¿Ofrece captura server-side y cookies o identificadores first-party servidos desde dominio propio del cliente?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Depende de cookies de terceros. | Solo JavaScript en el cliente. | Envío server-side solo vía API manual. | SDKs server-side oficiales y proxy first-party documentado. | Además cookies first-party fijadas desde el servidor (dominio propio) y guía de mitigación de restricciones del navegador. | Además colector propio desplegable en la infraestructura del cliente (los datos no transitan por terceros) o tag server-side gestionado. |

## MK-ID · Identidad y perfil unificado

### MK-ID-01 — Resolución de identidad determinista
- **Descripción:** Unión de identificadores con coincidencia exacta (anónimo → conocido, email, ID de cliente).
- **Pregunta:** ¿Qué control ofrece sobre las reglas de coincidencia exacta y la fusión de perfiles?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin resolución de identidad. | Deduplicación por un único identificador (p. ej. email). | Regla fija anónimo → usuario tras autenticarse. | Reglas configurables con varios tipos de identificador, prioridades y fusión/separación documentada. | Además grafo de identidad persistente, límites para evitar fusiones erróneas y trazabilidad de cada fusión. | Grafo a escala con identificadores personalizados, multi-dispositivo, auditoría completa y documentación pública del algoritmo. |

### MK-ID-02 — Resolución probabilística / difusa
- **Descripción:** Vinculación por similitud o señales indirectas.
- **Pregunta:** ¿Ofrece coincidencia difusa o probabilística nativa?
- **Tipo:** puntuable · **Peso:** 1
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No. | Solo mediante un proveedor externo sin integración documentada. | Integración documentada con proveedores de identidad de terceros. | Coincidencia difusa nativa configurable (nombre, dirección, etc.). | Modelo de coincidencia nativo con umbrales de confianza configurables. | Grafo probabilístico propio con cobertura multi-dispositivo y documentación de precisión y consideraciones de privacidad. |

### MK-ID-03 — Perfil unificado y latencia
- **Descripción:** Disponibilidad del perfil para su uso en activación.
- **Pregunta:** ¿Con qué latencia se actualiza y se puede leer el perfil unificado?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No hay perfil unificado. | Perfil por lotes con actualización de un día o más. | Actualización horaria o por lotes frecuentes. | Actualización en minutos y API de lectura del perfil. | Latencia de segundos documentada y API de baja latencia. | Latencia inferior al segundo documentada, con decisión y activación en línea. |

## MK-SEG · Segmentación y audiencias

### MK-SEG-01 — Segmentación en tiempo real
- **Descripción:** Frecuencia y granularidad de cálculo de audiencias.
- **Pregunta:** ¿Se recalculan los segmentos por evento o en tiempo real?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No hay segmentación. | Solo listas estáticas. | Segmentos por lotes (diarios). | Recalculados en minutos o por lotes horarios frecuentes. | Tiempo real (segundos) con condiciones de comportamiento y ventanas temporales. | Tiempo real con secuencias/trayectorias, estimación de tamaño y uso en decisión en línea. |

### MK-SEG-02 — Modos de construcción (no-code y SQL)
- **Descripción:** Formas de definir audiencias para perfiles técnicos y de negocio.
- **Pregunta:** ¿Pueden crearse audiencias con constructor visual y con SQL sobre el warehouse?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Solo código a medida. | Solo API. | Constructor no-code básico. | No-code y SQL. | No-code y SQL, con audiencias definidas directamente sobre tablas del warehouse sin copiarlas. | Además capa semántica o modelos dbt reutilizables como fuente de audiencias. |

## MK-ACT · Activación y canales

### MK-ACT-01 — Catálogo de destinos
- **Descripción:** Integraciones de salida hacia herramientas de marketing, ventas, analítica y publicidad.
- **Pregunta:** ¿Cuántos destinos mantiene oficialmente y permite añadir destinos propios?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin destinos. | Solo webhook/API genérica. | Menos de 50 destinos oficiales. | Entre 50 y 199 destinos oficiales. | Entre 200 y 499 destinos oficiales. | Más de 500 destinos oficiales y SDK para destinos personalizados. |

### MK-ACT-02 — Canales de mensajería nativos
- **Descripción:** Canales que el propio producto envía sin herramienta externa.
- **Pregunta:** ¿Qué canales envía de forma nativa (email, SMS, push, WhatsApp, in-app, web)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Ninguno (solo envía datos a otras herramientas). | Un solo canal (email). | Email y un canal más. | Email, SMS y push. | Además WhatsApp, in-app o web. | Seis o más canales con orquestación unificada. |

### MK-ACT-03 — Activación desde el warehouse (reverse ETL)
- **Descripción:** Uso de tablas del warehouse/lakehouse como origen de audiencias y atributos.
- **Pregunta:** ¿Puede sincronizar datos desde el warehouse/lakehouse hacia canales y herramientas?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No lee del warehouse. | Solo importación por fichero. | Conector por lotes a un warehouse. | Conectores nativos a varios warehouses con sincronización programada. | Sincronización incremental (solo cambios) con mapeo y observabilidad de filas. | Modelo principal de operación, con múltiples warehouses/lakehouses y sincronización casi en tiempo real. |

## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 — Journeys
- **Descripción:** Orquestación de recorridos multi-paso del cliente.
- **Pregunta:** ¿Qué capacidad tiene el orquestador de journeys?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No hay. | Secuencias lineales (*drip*). | Flujos con ramas condicionales simples. | Lienzo visual con eventos, esperas, ramas y varios canales. | Además entrada/salida por segmento en tiempo real, reingreso, límites de frecuencia y versionado. | Además decisión asistida por IA, simulación/pruebas previas y escala documentada. |

### MK-ORQ-02 — Experimentación
- **Descripción:** Pruebas A/B, multivariante, grupos de control.
- **Pregunta:** ¿Qué experimentos permite y cómo mide el efecto incremental?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No hay. | A/B manual de un elemento (p. ej. asunto). | A/B en un canal con ganador automático. | A/B y multivariante en journeys y canales. | Además grupos de control/*holdout* y significancia estadística. | Además medición de incrementalidad y optimización automática (p. ej. *bandits*). |

## MK-EML · Email

Todos los criterios de esta dimensión son `N/A` si el candidato no envía email por sí mismo.

### MK-EML-01 — Editor y plantillas
- **Pregunta:** ¿Qué editor y qué mecanismos de personalización ofrece?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin editor. | Solo texto/HTML crudo. | Editor básico. | Editor visual (arrastrar y soltar) + HTML + plantillas + variables. | Además bloques reutilizables, contenido dinámico condicional y previsualización. | Además contenido dinámico basado en datos en tiempo real y control de marca/accesibilidad. |

### MK-EML-02 — Autenticación y herramientas de deliverability
- **Pregunta:** ¿Permite autenticar el dominio propio (SPF, DKIM, DMARC) y qué ayuda ofrece para entregabilidad?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No permite autenticación. | Solo dominio compartido del proveedor. | SPF y DKIM con dominio propio. | SPF, DKIM y guía de DMARC/alineación, con gestión automática de rebotes y quejas. | Además monitorización de reputación (p. ej. Postmaster Tools), informes DMARC o soporte de BIMI. | Además pruebas de bandeja de entrada (*inbox placement*) o servicio de deliverability documentado. |

### MK-EML-03 — IP dedicada y gestión de reputación
- **Pregunta:** ¿Ofrece IP dedicada y herramientas para gestionar reputación?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No. | IP compartida sin control. | IP compartida con *pools* separados. | IP dedicada opcional. | IP dedicada con *warm-up* automatizado y varios *pools*. | Además gestión de reputación documentada (subdominios, limitación por proveedor de buzón, monitorización). |

### MK-EML-04 — Baja de un clic (RFC 8058)
- **Pregunta:** ¿Documenta el soporte de `List-Unsubscribe` y `List-Unsubscribe-Post` para baja de un clic, requerida por Google y Yahoo a remitentes masivos?
- **Tipo:** booleano · **Peso:** 2 · **elimina_si:** No
- **Obligatorio:** No

## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 — Modelo de datos: copia propia frente a warehouse-native
- **Descripción:** Dónde reside el perfil de cliente.
- **Pregunta:** ¿Puede operar sin mantener una copia persistente propia de los datos del cliente?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Solo copia propietaria sin acceso al warehouse. | Exportación periódica al warehouse. | Lee del warehouse pero mantiene su propio perfil. | Sincronización bidireccional con el warehouse. | Modo en que perfiles y audiencias se calculan en el warehouse del cliente, con datos maestros en él. | Arquitectura warehouse-native por defecto, sin copia persistente del dato del cliente, multi-warehouse. |

### MK-ARQ-02 — Integración con plataformas de datos (Bloque A)
- **Pregunta:** ¿Se integra de forma nativa con Snowflake, BigQuery, Databricks, Redshift y formatos abiertos?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Ninguna. | Exportación a ficheros/almacenamiento de objetos. | Conector a un warehouse. | Conectores nativos a Snowflake, BigQuery y Databricks o Redshift. | Además compartición sin copia (*zero-copy*) o lectura de tablas de formato abierto (Iceberg/Delta). | Además catálogos abiertos y federación con las plataformas del Bloque A. |

### MK-ARQ-03 — APIs y exportabilidad
- **Pregunta:** ¿Es posible extraer todos los datos y configuración con facilidad?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin API ni exportación. | Exportación manual (CSV). | API REST parcial. | API completa de perfiles/eventos y exportación programada al almacenamiento del cliente. | Además emisión de eventos en bruto (*streaming*) y exportación masiva sin coste adicional documentado. | Además formatos abiertos (Parquet/Iceberg) y esquema documentado. |

## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 — Gestión del consentimiento
- **Pregunta:** ¿Cómo gestiona y propaga el consentimiento?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin soporte. | Campo manual de aceptación. | Marcas de consentimiento que suprimen el envío. | Integración con CMPs y propagación del estado a los destinos. | Además consentimiento por finalidad/canal aplicado en la activación, con registro. | Además aplicación en tiempo real (bloqueo de destinos por finalidad), soporte de marcos como TCF/GPP y registro probatorio. |

### MK-PRI-02 — Supresión y derechos de los interesados
- **Pregunta:** ¿Facilita el derecho de supresión y de acceso?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No. | Solo mediante soporte manual. | Borrado por usuario, manual o por API. | API de supresión y acceso con propagación a destinos. | Además propagación automática, flujo de trabajo y seguimiento. | Además garantía documentada de borrado en almacenes y copias, con plazos y auditoría. |

### MK-PRI-03 — DPA y subencargados publicados
- **Pregunta:** ¿Publica un acuerdo de encargado de tratamiento (DPA) y la lista de subencargados accesibles sin contrato?
- **Tipo:** booleano · **Peso:** 3 · **elimina_si:** No · `N/A` para software solo autoalojable.
- **Obligatorio:** No

### MK-PRI-04 — Datos en la UE
- **Pregunta:** ¿Permite mantener los datos del cliente en la UE (región UE del SaaS o despliegue en infraestructura del cliente)?
- **Tipo:** booleano · **Peso:** 3 · **elimina_si:** No
- **Obligatorio:** No

### MK-PRI-05 — Certificaciones
- **Pregunta:** ¿Qué certificaciones de seguridad y privacidad declara (ISO 27001, SOC 2, ENS, etc.)?
- **Tipo:** informativo · **Formato:** lista de certificaciones con enlace.
- **Obligatorio:** No

## MK-IA · IA

### MK-IA-01 — IA predictiva
- **Pregunta:** ¿Ofrece modelos predictivos (propensión, abandono, valor de vida) integrados en segmentación y journeys?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No. | Solo mediante integración externa. | Puntuaciones heurísticas (p. ej. RFM). | Modelos predictivos nativos sin ciencia de datos. | Además configuración y explicabilidad, y uso directo en segmentos y journeys. | Además modelos propios del cliente y puntuación en tiempo real. |

### MK-IA-02 — IA generativa de contenido
- **Pregunta:** ¿Genera texto o imágenes de campaña dentro del producto?
- **Tipo:** puntuable · **Peso:** 1
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No. | Integración manual con un LLM externo. | Asistente de texto. | Generación de asunto/copy/imagen en el editor. | Además controles de marca y aprobación. | Además personalización a escala por segmento con gobernanza documentada. |

### MK-IA-03 — Agentes y MCP
- **Pregunta:** ¿Ofrece agentes o interfaz para agentes de terceros (por ejemplo, servidor MCP)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No. | Solo anuncio o *roadmap*. | Copiloto que responde consultas. | Asistente que ejecuta acciones (crear segmento/campaña). | Servidor MCP o API oficial para agentes externos. | Agentes autónomos con límites y auditoría, disponibles con carácter general. |

## MK-DEP · Despliegue y operación

### MK-DEP-01 — Modelos de despliegue
- **Tipo:** informativo · **Formato:** lista (`saas`, `self-hosted`, `byoc`, `kubernetes`, `docker`).
- **Obligatorio:** No

### MK-DEP-02 — Esfuerzo de implantación y operación
- **Pregunta:** ¿Cuánto esfuerzo requiere ponerlo en marcha y mantenerlo?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Desarrollo a medida extenso. | Proyecto de meses, consultoría necesaria. | Semanas de integración con apoyo de servicios. | Autoservicio con guías (días–semanas), o software autoalojado con operación moderada. | Autoservicio con plantillas y plan gratuito o de prueba. | Operativo en horas, sin infraestructura, con plan gratuito autoservicio. |

### MK-DEP-03 — Autoalojable
- **Pregunta:** ¿Puede ejecutarse en infraestructura controlada por el cliente?
- **Tipo:** booleano · **Peso:** 2 · **elimina_si:** No
- **Obligatorio:** No

## MK-ECO · Ecosistema y madurez

### MK-ECO-01 — Comunidad y madurez
- **Pregunta:** ¿Qué madurez y actividad demuestra (releases, contribuidores, base de clientes)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Abandonado o descontinuado. | Mantenedor único o sin versiones en 6–12 meses. | Actividad esporádica. | Versiones regulares y equipo o comunidad activos. | Comunidad o base de clientes amplia y documentada. | Referencia del mercado, con reconocimiento independiente (analistas) o adopción a gran escala. |

### MK-ECO-02 — Integraciones y marketplace
- **Pregunta:** ¿Tiene ecosistema de integraciones, socios y aplicaciones de terceros?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Ninguno. | Pocas integraciones sueltas. | Integraciones con e-commerce/CRM esenciales. | Integraciones con CRM, e-commerce, BI y dbt. | Marketplace o red de socios establecida. | Ecosistema de referencia con marketplace, certificaciones de socios y miles de aplicaciones. |

## MK-LIC · Licencia

### MK-LIC-01 — Licencia aprobada por la OSI
- **Pregunta:** ¿El código está bajo una licencia aprobada por la OSI?
- **Tipo:** booleano · **Peso:** 2 · **elimina_si:** No
- **Obligatorio:** No

### MK-LIC-02 — Apertura y riesgo de licencia
- **Pregunta:** ¿Qué apertura ofrece y cuál es el riesgo de cambio o restricción?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Propietario, sin salida. | Propietario con condiciones que dificultan la salida. | Propietario con exportación y API. | Source-available u open core con núcleo funcional. | Open source con oferta gestionada y funciones avanzadas restringidas. | Open source (OSI) sin funciones clave restringidas, gobernanza abierta y sin cambios de licencia restrictivos. |

## MK-COS · Coste

> El criterio de coste (`MK-COS-01`, nota calculada, peso 3) no se define aquí: lo aporta la propia aplicación, que lo calcula a partir de las fichas de [`costes/precios/`](../costes/precios/) (ver [`../costes/metodologia.md`](../costes/metodologia.md#conversión-de-coste-a-nota)).

### MK-COS-02 — Transparencia de precios
- **Pregunta:** ¿Publica precios de lista y unidades de facturación?
- **Tipo:** puntuable · **Peso:** 1
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No hay precio. | Solo «contactar con ventas». | Referencia pública indirecta (marketplace, analistas). | Precios públicos parciales por tier. | Precios de lista completos y unidades definidas. | Precios completos, calculadora y plan gratuito. |

<!-- /VALOR -->
