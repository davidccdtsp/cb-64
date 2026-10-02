---
id: bigquery
nombre: Google BigQuery
dominio: datos
categoria: cloud-dwh
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [bq-docs-slots-autoscaling, bq-docs-editions] }
  DP-ARQ-02: { nota: 3, confianza: media, fuentes: [bq-docs-lakehouse-tables, bq-docs-biglake-iceberg] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [bq-docs-lakehouse-tables] }
  DP-CAR-01: { nota: 4, confianza: media, fuentes: [bq-docs-editions] }
  DP-CAR-02: { nota: 3, confianza: alta, fuentes: [bq-docs-write-api, bq-docs-quotas] }
  DP-CAR-03: { nota: 4, confianza: media, fuentes: [bq-docs-vector-search, bq-docs-ai-generate-text] }
  DP-CAR-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-REN-01: { nota: 4, confianza: alta, fuentes: [bq-docs-slots-autoscaling] }
  DP-REN-02: { valor: "Fivetran Cloud Data Warehouse Benchmark (2025, incluye BigQuery); GigaOm TPC-DS 2019 (patrocinado por Microsoft, con BigQuery entre los comparados)", confianza: media, fuentes: [fivetran-benchmark, gigaom-2019-benchmark] }
  DP-REN-03: { valor: "Sí", confianza: alta, fuentes: [bq-docs-slots-autoscaling] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [bq-docs-standard-sql] }
  DP-INT-02: { nota: 4, confianza: media, fuentes: [bq-github-dbt-bigquery] }
  DP-INT-03: { nota: 2, confianza: media, fuentes: [bq-docs-lakehouse-tables] }
  DP-GOB-01: { nota: 4, confianza: alta, fuentes: [bq-docs-column-security, bq-docs-row-security] }
  DP-GOB-02: { nota: 0, confianza: media, fuentes: [bq-docs-lineage] }
  DP-GOB-03: { valor: "SOC 1/2/3, ISO/IEC 27001, HIPAA — verificado solo para Gemini in BigQuery en la fuente citada; no se ha verificado el listado completo para BigQuery", confianza: media, fuentes: [bq-docs-gemini-compliance] }
  DP-GOB-04: { valor: "Sí", confianza: media, fuentes: [bq-docs-locations, bq-docs-gemini-compliance] }
  DP-DEP-01: { valor: "SaaS únicamente, en Google Cloud; sin self-hosted ni BYOC", confianza: alta, fuentes: [bq-docs-editions] }
  DP-DEP-02: { valor: "N/D — no aplica, no existe modo self-managed", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica — SaaS sin modo self-hosted", confianza: n/a, fuentes: [bq-docs-editions] }
  DP-ECO-01: { nota: 3, confianza: media, fuentes: [bq-release-notes] }
  DP-ECO-02: { nota: 4, confianza: media, fuentes: [bq-docs-lakehouse-tables, bq-docs-lineage, bq-github-dbt-bigquery] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [bq-docs-editions] }
  DP-LIC-02: { valor: "No aplica — producto propietario desde su origen", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 4, confianza: alta, fuentes: [bq-pricing-page] }
  DP-IA-01: { valor: "Sí", confianza: alta, fuentes: [bq-docs-ai-generate-text] }
  DP-IA-02: { nota: 4, confianza: alta, fuentes: [bq-docs-vector-search] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Google BigQuery

## Resumen

Google BigQuery es la plataforma de data warehouse y lakehouse totalmente gestionada (serverless) nativa de Google Cloud. Carece del concepto de clúster que dimensionar, ni en el modelo *on-demand* (pago por TiB escaneado) ni en el modelo de *Editions* (pago por *slot*-hora)[^bq-docs-editions]. Se trata de un SaaS puro sobre Google Cloud, sin alternativas self-hosted.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Arquitectura serverless: el cómputo (*slots*) se asigna dinámicamente sobre el almacenamiento gestionado, y el autoescalado de reservas se documenta como «casi instantáneo», en incrementos de 50 *slots*, con reservas de línea base cero y reparto de *slots* ociosos entre reservas[^bq-docs-slots-autoscaling][^bq-docs-editions].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
Las tablas Apache Iceberg gestionadas por el catálogo de tiempo de ejecución de Lakehouse (antes BigLake Metastore) son GA, con lectura/escritura desde motores abiertos (Spark, Flink, Trino) a través del endpoint REST de Iceberg y lectura/escritura desde BigQuery; las operaciones DML desde BigQuery sobre esa variante figuran como *Preview*[^bq-docs-lakehouse-tables]. La misma página lista tablas Hive (*Preview*, BigQuery solo lectura). No se ha verificado lectura/escritura estable de un segundo formato abierto (Delta/Hudi).

### DP-ARQ-03 · Catálogo externo compatible · Sí
El catálogo de tiempo de ejecución de Lakehouse (antes BigLake Metastore) expone el protocolo REST de Iceberg para motores externos (GA)[^bq-docs-lakehouse-tables].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
GoogleSQL completo con ejecución columnar/distribuida sobre *slots*[^bq-docs-editions]. No se ha localizado una cifra pública de clientes o volumen para BigQuery (a diferencia dotras candidaturas).

### DP-CAR-02 · Streaming / tiempo real · 3/5
La Storage Write API permite ingesta en streaming con semántica *exactly-once* mediante *offsets* de flujo[^bq-docs-write-api], con una cuota por defecto de 3 GB/s por proyecto[^bq-docs-quotas]. Ingesta nativa en streaming con latencia baja, la documentación citada no publica SLA de latencia p99 ni latencia de disponibilidad para consulta.

### DP-CAR-03 · ML/IA y búsqueda vectorial · 4/5
Nota agregada de `VECTOR_SEARCH` con índices ANN (IVF, TreeAH) y de las funciones generativas en SQL[^bq-docs-vector-search][^bq-docs-ai-generate-text].

### DP-CAR-04 · OLTP / Lakebase · N/D
No se ha localizado, en esta revisión, una oferta equivalente a Lakebase/Snowflake Postgres integrada de forma nativa en BigQuery. Google ofrece AlloyDB y Cloud SQL como productos OLTP separados; **no se ha verificado** con fuente oficial cómo se conectan con BigQuery (consultas federadas, CDC), por lo que no se asigna nota. Si se verificara una conexión que requiera configuración explícita de replicación, correspondería el nivel 3 de la rúbrica. Pendiente de revisión.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
Las reservas del modelo *Editions* autoescalan en incrementos de 50 *slots* y reparten capacidad de forma equitativa entre proyectos, con aislamiento entre reservas[^bq-docs-slots-autoscaling].  No es 5 por falta de evidencia pública de concurrencia a gran escala (benchmark independiente o caso documentado).

### DP-REN-02 · Benchmarks publicados
Fivetran (2025)[^fivetran-benchmark] y GigaOm TPC-DS (2019, patrocinado por Microsoft)[^gigaom-2019-benchmark] incluyen BigQuery.

### DP-REN-03 · Escala a cero · Sí
El modelo on-demand no requiere cómputo activo entre consultas, y las reservas admiten línea base de 0 *slots* con autoescalado[^bq-docs-slots-autoscaling].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
GoogleSQL es un dialecto amplio con extensiones propias documentadas en la referencia oficial[^bq-docs-standard-sql]. No se ha verificado el grado de conformidad ANSI ni compatibilidad de protocolo con otro motor.

### DP-INT-02 · Conectores y ecosistema · 4/5
`dbt-bigquery` está mantenido por dbt Labs[^bq-github-dbt-bigquery]. La fuente no acredita herramientas de BI certificadas ni orquestador oficial.

### DP-INT-03 · Facilidad de salida de datos · 2/5
Solo las tablas Iceberg gestionadas residen en el bucket Cloud Storage del cliente[^bq-docs-lakehouse-tables]; el almacenamiento nativo de BigQuery (el caso por defecto) es propietario. Exportación a CSV/Parquet vía `EXPORT DATA`.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
Seguridad a nivel de columna mediante *policy tags* de Data Catalog integrados con IAM, enmascaramiento dinámico de datos y seguridad a nivel de fila mediante políticas de acceso[^bq-docs-column-security][^bq-docs-row-security]. No se ha verificado ABAC dinámico más allá de *policy tags*.

### DP-GOB-02 · Linaje y auditoría · 0/5
Knowledge Catalog (antes Dataplex Universal Catalog) registra automáticamente el linaje de los trabajos de BigQuery (CTAS, vistas, INSERT, MERGE…) y dispone de una API de linaje documentada; el linaje **a nivel de columna** es GA desde el 29-sep-2025[^bq-docs-lineage]. Sin embargo, la rúbrica impone la *auditoría de accesos* como prerrequisito ineludible para obtener los niveles 2, 3 y 4. Al no haberse verificado ni documentado los logs de auditoría de accesos en esta ficha, la calificación decae obligatoriamente al Nivel 0 («sin logs de auditoría verificados»).

### DP-GOB-03 · Certificaciones de seguridad
SOC 1/2/3, ISO/IEC 27001 y HIPAA, según la página de seguridad y cumplimiento de Gemini in BigQuery[^bq-docs-gemini-compliance]. **Limitación:** esa página cubre las funciones de Gemini, no el servicio BigQuery completo; el listado oficial de Google Cloud por producto no se pudo verificar en esta revisión.

### DP-GOB-04 · Residencia de datos en la UE · Sí
Los datos de la multi-región `EU` se almacenan solo en `europe-west1` (Bélgica) o `europe-west4` (Países Bajos)[^bq-docs-locations]. Matices: si no se especifica la ubicación de la consulta, esta puede registrarse temporalmente en logs de enrutamiento; y Gemini in BigQuery no ofrece residencia por ubicación individual, solo por jurisdicción US/EU[^bq-docs-gemini-compliance]. No se ha verificado la cláusula contractual (Service Specific Terms / DPA), de ahí la confianza media.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS únicamente, exclusivo de Google Cloud; sin self-hosted ni BYOC[^bq-docs-editions].

### DP-DEP-02 · N/D
No aplica al no existir modo self-managed.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No aplica
BigQuery es un servicio SaaS sin modo self-hosted que un operador de Kubernetes pudiera desplegar[^bq-docs-editions]. «No aplica» y no «No», para no penalizar con un 0 (coherente con DP-DEP-02 y metodología §2).

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
Producto propietario de una única empresa (Google Cloud), sin gobernanza de fundación neutral. Actividad de producto alta y regular, acreditada por las notas de versión (entradas casi diarias)[^bq-release-notes]; no se ha localizado una cifra pública de clientes.

### DP-ECO-02 · Integraciones con el ecosistema de datos · 4/5
Adaptador dbt[^bq-github-dbt-bigquery], catálogo REST de Iceberg para motores externos[^bq-docs-lakehouse-tables] y linaje vía API[^bq-docs-lineage]. 

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
Sin fuente pública localizada en esta revisión.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
Producto propietario, sin código fuente publicado[^bq-docs-editions].

### DP-LIC-02 · Estabilidad de la licencia
No aplica.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 4/5
Página de precios pública con ambos modelos (on-demand y Editions) detallados[^bq-pricing-page].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
`AI.GENERATE_TEXT`/`ML.GENERATE_TEXT` invocan modelos (incluido Gemini) directamente desde SQL[^bq-docs-ai-generate-text].

### DP-IA-02 · Búsqueda vectorial nativa · 4/5
`VECTOR_SEARCH` con índices ANN (`CREATE VECTOR INDEX`, tipos IVF y TreeAH; sin índice, búsqueda exacta por fuerza bruta), generación de embeddings en SQL (`AI.EMBED`, `AI.GENERATE_EMBEDDING`, generación autónoma) y casos de uso RAG documentados[^bq-docs-vector-search]. No se verifica escala de miles de millones ni cifras de coste/rendimiento publicadas, necesarias para el 5.

### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap dedicado localizada en esta revisión.

[^bq-docs-editions]: Google Cloud Docs, «Understand BigQuery editions» (§ Editions features), https://docs.cloud.google.com/bigquery/docs/editions-intro#editions_features, consultado 2026-09-30.
[^bq-docs-biglake-iceberg]: Google Cloud, «Use BigLake tables for Apache Iceberg in BigQuery» (la URL anterior `cloud.google.com/biglake/docs/...` redirige a `/lakehouse/docs/...`), https://cloud.google.com/lakehouse/docs/biglake-iceberg-tables-in-bigquery, consultado 2026-09-30.
[^fivetran-benchmark]: Fivetran, «Cloud Data Warehouse Benchmark», https://www.fivetran.com/blog/warehouse-benchmark, consultado 2026-09-29.
[^gigaom-2019-benchmark]: GigaOm, «Data Warehouse in the Cloud Benchmark» (patrocinado por Microsoft), https://gigaom.com/report/data-warehouse-cloud-benchmark/, consultado 2026-09-29.
[^bq-docs-column-security]: Google Cloud Docs, «Introduction to column-level access control» (§ Column-level security workflow), https://docs.cloud.google.com/bigquery/docs/column-level-security-intro#column-level_security_workflow, consultado 2026-09-30.
[^bq-docs-row-security]: Google Cloud Docs, «Introduction to BigQuery row-level security» (§ How row-level security works), https://docs.cloud.google.com/bigquery/docs/row-level-security-intro#how_row-level_security_works, consultado 2026-09-30.
[^bq-docs-gemini-compliance]: Google Cloud Docs, «Security, privacy, and compliance for Gemini in BigQuery», https://docs.cloud.google.com/bigquery/docs/gemini-security-privacy-compliance, consultado 2026-09-29.
[^bq-github-dbt-bigquery]: dbt Labs (GitHub), «dbt-bigquery», https://github.com/dbt-labs/dbt-adapters/tree/main/dbt-bigquery, consultado 2026-09-29.
[^bq-docs-vector-search]: Google Cloud Docs, «Introduction to embeddings and vector search» (§ Search), https://docs.cloud.google.com/bigquery/docs/vector-search-intro#search, consultado 2026-09-30.
[^bq-docs-ai-generate-text]: Google Cloud Docs, «The AI.GENERATE_TEXT function», https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-text, consultado 2026-09-29.
[^bq-pricing-page]: Google Cloud, «BigQuery pricing», https://cloud.google.com/bigquery/pricing, consultado 2026-09-29.
[^bq-docs-write-api]: Google Cloud Docs, «Introduction to the BigQuery Storage Write API» (§ Choose a streaming approach), https://docs.cloud.google.com/bigquery/docs/write-api-intro#choose_a_streaming_approach, consultado 2026-09-30.
[^bq-docs-standard-sql]: Google Cloud Docs, «GoogleSQL for BigQuery», https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax, consultado 2026-09-29.
[^bq-docs-slots-autoscaling]: Google Cloud Docs, «Understand slots» (§ Slot autoscaling), https://docs.cloud.google.com/bigquery/docs/slots#slot-autoscaling, consultado 2026-09-30.
[^bq-docs-lakehouse-tables]: Google Cloud Docs, «Compare table types» — Lakehouse (§ Table formats by catalog or engine), https://docs.cloud.google.com/lakehouse/docs/lakehouse-tables#table_formats_by_catalog_or_engine, consultado 2026-09-30.
[^bq-docs-quotas]: Google Cloud Docs, «BigQuery quotas and limits» (§ Write API limits), https://docs.cloud.google.com/bigquery/quotas#write-api-limits, consultado 2026-09-30.
[^bq-docs-lineage]: Google Cloud Docs, «About data lineage» — Knowledge Catalog (§ Lineage sources: BigQuery), https://docs.cloud.google.com/knowledge-catalog/docs/about-data-lineage#auto-lineage-bq-support, consultado 2026-09-30.
[^bq-docs-locations]: Google Cloud Docs, «BigQuery locations» (§ Locations and regions), https://docs.cloud.google.com/bigquery/docs/locations#locations_and_regions, consultado 2026-09-30.
[^bq-release-notes]: Google Cloud Docs, «BigQuery release notes», https://docs.cloud.google.com/bigquery/docs/release-notes, consultado 2026-09-30.