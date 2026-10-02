---
id: firebolt
nombre: Firebolt
dominio: datos
categoria: cloud-dwh
tipo: cloud
licencia: propietaria
despliegue: [saas, self-hosted, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [fb-docs-architecture] }
  DP-ARQ-02: { nota: 2, confianza: media, fuentes: [fb-docs-iceberg] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [fb-docs-iceberg] }
  DP-CAR-01: { nota: 4, confianza: alta, fuentes: [fb-docs-architecture] }
  DP-CAR-02: { nota: 2, confianza: media, fuentes: [fb-github-kafka-connector] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [fb-docs-ai-query, fb-docs-vector-search] }
  DP-CAR-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-REN-01: { nota: 4, confianza: alta, fuentes: [fb-docs-autoscaling, fb-docs-create-engine] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente que incluya a Firebolt en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "Sí", confianza: alta, fuentes: [fb-docs-create-engine] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [fb-blog-postgres-compliant, fb-github-dbt-adapter] }
  DP-INT-02: { nota: 2, confianza: alta, fuentes: [fb-github-dbt-adapter] }
  DP-INT-03: { nota: 2, confianza: media, fuentes: [fb-docs-export] }
  DP-GOB-01: { nota: 2, confianza: alta, fuentes: [fb-docs-rbac, fb-docs-secure-views] }
  DP-GOB-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-GOB-03: { valor: "SOC 2 Tipo II, ISO 27001, ISO 27018, HIPAA (Business Associate), alineado con GDPR", confianza: alta, fuentes: [fb-security] }
  DP-GOB-04: { valor: "N/D — regiones UE disponibles (Fráncfort, Irlanda) pero sin compromiso contractual de residencia verificado", confianza: n/a, fuentes: [fb-docs-regions] }
  DP-DEP-01: { valor: "SaaS gestionado solo en AWS (6 regiones); autoalojado con Firebolt Core (gratuito, licencia Elastic 2.0) y operador de Kubernetes oficial (Apache-2.0)", confianza: alta, fuentes: [fb-docs-regions, fb-blog-core, fb-github-operator] }
  DP-DEP-02: { nota: 3, confianza: media, fuentes: [fb-github-operator] }
  DP-DEP-03: { valor: "Sí", confianza: alta, fuentes: [fb-github-operator] }
  DP-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-ECO-02: { nota: 2, confianza: alta, fuentes: [fb-github-dbt-adapter, fb-github-kafka-connector] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [fb-core-license] }
  DP-LIC-02: { valor: "No aplica — producto propietario desde su origen", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 4, confianza: alta, fuentes: [fb-pricing-page, fb-docs-billing] }
  DP-IA-01: { valor: "Sí", confianza: alta, fuentes: [fb-faq-sql-capabilities] }
  DP-IA-02: { nota: 3, confianza: media, fuentes: [fb-docs-vector-search] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Firebolt

## Resumen

Firebolt es un cloud data warehouse propietario centrado en analítica de baja latencia, con separación de almacenamiento y cómputo y facturación por segundo[^fb-docs-architecture]. Además del SaaS (solo en AWS) ofrece **Firebolt Core**, una edición autoalojada gratuita del mismo motor[^fb-blog-core], y un operador de Kubernetes de código abierto[^fb-github-operator]; la versión anterior de esta ficha afirmaba que no existía modo self-hosted. Esta revisión sustituye varios `N/D` por notas respaldadas por la documentación oficial; los que quedan carecen de fuente.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Arquitectura de tres capas (gestión, cómputo, almacenamiento) con el almacenamiento en object storage independiente del cómputo, organizado en "engines" de dos familias (optimizado a cómputo u optimizado a almacenamiento)[^fb-docs-architecture].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 2/5
Firebolt consulta tablas Apache Iceberg (GA) y puede exportar con `CREATE ICEBERG TABLE AS SELECT`, pero **sin DML**; la documentación indica que no admite *time travel*, que la evolución de esquema es restringida y que algunos tipos (`variant`, `geometry`, `geography`) no se soportan[^fb-docs-iceberg]. No se ha localizado soporte de Delta Lake ni Hudi. 

### DP-ARQ-03 · Catálogo externo compatible · Sí
Firebolt se conecta a catálogos Iceberg de tipo `REST`, `AWS_GLUE`, `DATABRICKS_UNITY`, `SNOWFLAKE_OPEN_CATALOG` y basados en ficheros (`S3_TABLES` figura como función *nightly*)[^fb-docs-iceberg].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Motor columnar con fuerte compresión, orientado explícitamente a analítica de baja latencia[^fb-docs-architecture].

### DP-CAR-02 · Streaming / tiempo real · 2/5
Conector Kafka Connect (*sink*) oficial[^fb-github-kafka-connector]; la fuente no documenta latencia de ingesta ni SLA. Un conector nativo a una cola sin latencia documentada corresponde al nivel 2 de la rúbrica (el nivel 3 exige ingesta nativa en streaming con latencia de segundos documentada). La documentación también describe ingesta CDC desde Postgres/MongoDB, cuya latencia tampoco se ha verificado.

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Nota agregada de DP-IA-01 (`AI_QUERY`, GA, un único modelo soportado)[^fb-docs-ai-query] y DP-IA-02 (índice HNSW, estado no declarado)[^fb-docs-vector-search].

### DP-CAR-04 · OLTP / Lakebase · N/D
Sin fuente localizada en esta revisión.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
Autoescalado horizontal de concurrencia: Firebolt añade o retira clústeres de un *engine* según CPU, RAM y tiempo de cola, entre los límites `MIN_CLUSTERS` y `MAX_CLUSTERS`[^fb-docs-autoscaling][^fb-docs-create-engine]; varios *engines* independientes pueden leer la misma base, lo que aporta aislamiento de carga.

### DP-REN-02 · Benchmarks publicados
Sin benchmark independiente localizado.

### DP-REN-03 · Escala a cero · Sí
`CREATE ENGINE` admite `AUTO_STOP` (20 minutos de inactividad por defecto) y `AUTO_START` (por defecto `true`: una consulta a un *engine* parado lo arranca)[^fb-docs-create-engine].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
Firebolt declara un dialecto SQL cercano a ANSI y un esquema `pg_catalog` parcial, pero la compatibilidad a nivel de protocolo de red (*wire protocol*) no se encuentra documentada en la referencia oficial[^fb-blog-postgres-compliant][^fb-github-dbt-adapter].

### DP-INT-03 · Facilidad de salida de datos · 2/5
`COPY TO` exporta a Amazon S3 en CSV, TSV, JSON y Parquet[^fb-docs-export]; la documentación no trata los costes de egress, y la documentación de facturación no los detalla[^fb-docs-billing]. 

### DP-INT-02 · Conectores y ecosistema · 2/5
Adaptador `dbt-firebolt` nativo y drivers básicos, sin verificación de herramientas de BI certificadas ni de orquestador oficial (Airflow)[^fb-github-dbt-adapter]

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 2/5
RBAC jerárquico con privilegios globales, regionales y por objeto, y seguridad a nivel de columna[^fb-docs-rbac]. La seguridad a nivel de fila se resuelve con **vistas seguras** (filtros estáticos o dinámicos con `session_user`)[^fb-docs-secure-views], no con políticas de fila nativas; no se documenta ABAC ni enmascaramiento dinámico.

### DP-GOB-02 · Linaje y auditoría · N/D
Sin fuente verificada de auditoría de accesos ni linaje.

### DP-GOB-04 · Residencia de datos en la UE · N/D
Existen regiones AWS en Fráncfort e Irlanda[^fb-docs-regions], pero no se ha localizado el compromiso contractual de residencia que exige el criterio; la página de seguridad cita cláusulas contractuales tipo para transferencias internacionales[^fb-security].

### DP-GOB-03 · Certificaciones de seguridad
SOC 2 Tipo II, ISO 27001, ISO 27018, HIPAA (Business Associate) y alineación con GDPR, según la página de seguridad del fabricante[^fb-security]. (La URL anterior, dedicada a las certificaciones ISO, ahora redirige a esta página; la mención de que el informe SOC 2/HIPAA está «bajo NDA» no se ha podido reverificar y se retira.)

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS gestionado exclusivamente en AWS, en seis regiones (us-east-1, us-west-2, eu-central-1, eu-west-1, ap-southeast-1, ap-south-1)[^fb-docs-regions]; edición autoalojada gratuita **Firebolt Core** (nodo único o multinodo con Helm)[^fb-blog-core]; y un operador de Kubernetes oficial[^fb-github-operator]. La página de precios menciona también BYOC, no verificado en documentación.

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
Firebolt mantiene un operador oficial de Kubernetes (Apache-2.0) con recursos personalizados para instancias y *engines*, escalado sin *downtime* mediante despliegues *blue-green*, elección de líder para HA y *auto-stop*/*wake-up* de *engines*[^fb-github-operator].

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
El repositorio `firebolt-db/firebolt-kubernetes-operator` está mantenido por Firebolt[^fb-github-operator].

## Ecosistema y madurez

### DP-ECO-01 / DP-ECO-03 · N/D
Sin fuente verificada en esta revisión.

### DP-ECO-02 · Integraciones con el ecosistema de datos · 2/5
Conector Kafka oficial para ingesta de datos[^fb-github-dbt-adapter][^fb-github-kafka-connector].

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
El motor de Firebolt Core se distribuye bajo la **Elastic License 2.0** (*source-available*, no aprobada por la OSI; prohíbe ofrecerlo como servicio gestionado)[^fb-core-license]; el resto del producto (SaaS) es propietario. Nota: la página de precios afirma que Firebolt es «fully open source», lo que no es coherente con esa licencia ni con el blog de lanzamiento, que lo describe como *closed-source*[^fb-blog-core]; se prefiere el texto de la licencia. Los operadores y SDK sí son Apache-2.0.

### DP-LIC-02
No aplica.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 4/5
Página de precios pública con facturación por segundo y **calculadora interactiva de motor** oficial[^fb-pricing-page]; la documentación de facturación describe edición, almacenamiento y cómputo[^fb-docs-billing].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
`AI_QUERY` (GA) invoca un modelo de lenguaje desde SQL; la documentación indica que el único modelo soportado es Meta Llama 3.3 70B Instruct, con Amazon Bedrock como *backend*[^fb-docs-ai-query]. La FAQ del fabricante menciona además `AWS_BEDROCK_AI_QUERY`[^fb-faq-sql-capabilities].

### DP-IA-02 · Búsqueda vectorial nativa · 3/5
Índice HNSW nativo (`CREATE INDEX … USING HNSW`) sobre columnas de embeddings, consultado con la función `VECTOR_SEARCH`, dentro del propio warehouse[^fb-docs-vector-search]. La documentación no declara su estado (GA/preview) ni describe un flujo RAG completo.
### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap dedicado localizada en esta revisión.

[^fb-docs-architecture]: Firebolt Docs, «Architecture», https://docs.firebolt.io/overview/architecture-overview, consultado 2026-09-30.
[^fb-github-kafka-connector]: Firebolt (GitHub), «firebolt-kafka-connector», https://github.com/firebolt-db/firebolt-kafka-connector, consultado 2026-09-29.
[^fb-faq-sql-capabilities]: Firebolt Inc., «FAQ — What SQL capabilities does Firebolt offer?», https://www.firebolt.io/faq#what-sql-capabilities-does-firebolt-offer, consultado 2026-09-30.
[^fb-docs-vector-search]: Firebolt Docs, «VECTOR_SEARCH» (§ Syntax; § Notes), https://docs.firebolt.io/reference-sql/functions-reference/vector/vector-search#syntax, consultado 2026-09-30.
[^fb-github-dbt-adapter]: Firebolt (GitHub), «dbt-firebolt», https://github.com/firebolt-db/dbt-firebolt, consultado 2026-09-29.
[^fb-pricing-page]: Firebolt Inc., «Pricing» (calculadora de motor), https://www.firebolt.io/pricing, consultado 2026-09-30.
[^fb-docs-iceberg]: Firebolt Docs, «Iceberg» (§ Supported features and limitations), https://docs.firebolt.io/guides/iceberg-and-data-lake/iceberg#supported-features-and-limitations, consultado 2026-09-30.
[^fb-docs-autoscaling]: Firebolt Docs, «Understanding Autoscaling» (§ Auto-scaling metrics), https://docs.firebolt.io/managed-service/operate-engines/understand-autoscaling#auto-scaling-metrics, consultado 2026-09-30.
[^fb-docs-create-engine]: Firebolt Docs, «CREATE ENGINE» (§ Options), https://docs.firebolt.io/reference-sql/commands/engines/create-engine#options, consultado 2026-09-30.
[^fb-docs-export]: Firebolt Docs, «Export data» (§ Choose the right export format), https://docs.firebolt.io/guides/exporting-data#choose-the-right-export-format, consultado 2026-09-30.
[^fb-docs-rbac]: Firebolt Docs, «Role-Based Access Control» (§ Key object types), https://docs.firebolt.io/security/rbac#key-object-types, consultado 2026-09-30.
[^fb-docs-secure-views]: Firebolt Docs, «Using secure views» (§ Row-level security), https://docs.firebolt.io/security/guides/rbac-views-security#row-level-security, consultado 2026-09-30.
[^fb-docs-regions]: Firebolt Docs, «Available regions», https://docs.firebolt.io/managed-service/available-regions, consultado 2026-09-30.
[^fb-docs-billing]: Firebolt Docs, «Pricing and billing» (§ Fully managed pricing model), https://docs.firebolt.io/managed-service/billing#fully-managed-pricing-model, consultado 2026-09-30.
[^fb-docs-ai-query]: Firebolt Docs, «AI_QUERY», https://docs.firebolt.io/reference-sql/functions-reference/ai/ai-query, consultado 2026-09-30.
[^fb-security]: Firebolt Inc., «Security», https://www.firebolt.io/security, consultado 2026-09-30.
[^fb-blog-postgres-compliant]: Firebolt Blog, «Making a Query Engine Postgres Compliant — Part I: Functions», https://www.firebolt.io/blog/making-a-query-engine-postgres-compliant-part-i-functions, consultado 2026-09-30.
[^fb-blog-core]: Firebolt Blog, «Introducing Firebolt Core — Self-Hosted Firebolt, For Free, Forever» (24-jun-2025), https://www.firebolt.io/blog/introducing-firebolt-core, consultado 2026-09-30.
[^fb-core-license]: Firebolt (GitHub), «firebolt-core — LICENSE.md» (Elastic License 2.0), https://github.com/firebolt-db/firebolt-core/blob/main/LICENSE.md, consultado 2026-09-30.
[^fb-github-operator]: Firebolt (GitHub), «firebolt-kubernetes-operator» (Apache-2.0), https://github.com/firebolt-db/firebolt-kubernetes-operator, consultado 2026-09-30.
