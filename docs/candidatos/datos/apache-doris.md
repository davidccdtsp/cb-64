---
id: apache-doris
nombre: Apache Doris
dominio: datos
categoria: real-time-dwh-lakehouse
tipo: oss
licencia: Apache-2.0
despliegue: [self-hosted]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [doris-docs-compute-group, doris-docs-intro] }
  DP-ARQ-02: { nota: 3, confianza: media, fuentes: [doris-docs-iceberg-catalog] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [doris-docs-iceberg-catalog] }
  DP-CAR-01: { nota: 4, confianza: alta, fuentes: [doris-docs-intro] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [doris-docs-routine-load, doris-docs-continuous-load] }
  DP-CAR-03: { nota: 4, confianza: media, fuentes: [doris-docs-vector-index, doris-docs-llm-functions] }
  DP-CAR-04: { nota: 2, confianza: media, fuentes: [doris-unique-key-model, doris-high-concurrency-point-query, doris-updating-data-on-unique-key-model] }
  DP-REN-01: { nota: 1, confianza: media, fuentes: [doris-docs-compute-group, doris-docs-resource-group] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No aplica — proyecto OSS self-hosted, sin servicio gestionado oficial que suspenda cómputo", confianza: n/a, fuentes: [] }
  DP-INT-01: { nota: 4, confianza: media, fuentes: [doris-docs-mysql-proto] }
  DP-INT-02: { nota: 4, confianza: media, fuentes: [doris-docs-dbt, doris-docs-bi-tableau, doris-docs-flink-connector] }
  DP-INT-03: { nota: 3, confianza: media, fuentes: [doris-docs-outfile, doris-docs-iceberg-catalog] }
  DP-GOB-01: { nota: 4, confianza: media, fuentes: [doris-docs-authz-data, doris-docs-authz-internal] }
  DP-GOB-02: { nota: 3, confianza: media, fuentes: [doris-docs-audit, doris-docs-lineage] }
  DP-GOB-03: { valor: "No aplica — proyecto OSS sin oferta gestionada propia", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica directamente — self-hosted, la residencia depende de dónde despliegue el cliente", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted (binario/Docker/Kubernetes con operador oficial de la ASF, plantillas de despliegue en AWS); ofertas gestionadas de terceros (p. ej. SelectDB)", confianza: media, fuentes: [doris-operator-github, doris-docs-aws] }
  DP-DEP-02: { nota: 3, confianza: alta, fuentes: [doris-operator-github, doris-docs-operator] }
  DP-DEP-03: { valor: "Sí", confianza: alta, fuentes: [doris-operator-github] }
  DP-ECO-01: { nota: 4, confianza: alta, fuentes: [doris-github-readme] }
  DP-ECO-02: { nota: 4, confianza: media, fuentes: [doris-docs-iceberg-catalog, doris-docs-lineage, doris-docs-operator] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [doris-github-readme] }
  DP-LIC-02: { nota: 5, confianza: media, fuentes: [doris-github-readme, asf-licenses] }
  DP-COS-02: { valor: "No aplica — proyecto OSS self-hosted sin oferta gestionada oficial", confianza: n/a, fuentes: [] }
  DP-IA-01: { valor: "Sí", confianza: media, fuentes: [doris-docs-llm-functions] }
  DP-IA-02: { nota: 5, confianza: alta, fuentes: [doris-docs-vector-index] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Apache Doris

## Resumen

Apache Doris es un Data Warehouse en tiempo real basado en MPP, reconocido por su alta velocidad de consulta (respuestas en milisegundos) con arquitectura de referencia SQL y planificación distribuida[^doris-docs-intro]. Soporta tanto consultas puntuales de alta concurrencia como  búsqueda híbrida, análisis complejos de gran volumen, sirviendo para reportes, consultas ad-hoc, almacenamiento unificado y aceleración de Data Lakes. 

Graduado como Top-Level Project de Apache en junio de 2022[^doris-github-readme]. Es el "padre" arquitectónico de StarRocks (ver ficha separada), del que se bifurcó en 2020.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Soporta despliegue acoplado y desacoplado; en el modo desacoplado varios *compute groups* comparten los mismos datos sin réplicas adicionales y añadir o quitar uno no requiere migrar datos, solo calentar caché[^doris-docs-compute-group][^doris-docs-intro]. 

Nivel 4 (varios clústeres de cómputo sobre el mismo almacenamiento). No es 5: sin evidencia pública de escalado «en segundos».

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
Doris lee tablas Iceberg mediante catálogos `hms`, `rest`, `glue`, etc. y **escribe** en ellas (`INSERT`, `INSERT OVERWRITE`, `UPDATE`, `DELETE`, `MERGE INTO`)[^doris-docs-iceberg-catalog]. 

Nivel 3 por prudencia: la escritura estable está verificada en Iceberg; el soporte de escritura en un segundo formato abierto (Hudi, Paimon, Delta) y el de *time travel*/*schema evolution* no se han verificado con la misma solidez para el nivel 4.

### DP-ARQ-03 · Catálogo externo compatible · Sí
La documentación oficial describe catálogos Iceberg REST, Hive Metastore y AWS Glue, con guías de integración para S3 Tables, Polaris, Gravitino, OneLake y Databricks Unity Catalog[^^doris-docs-catalog]. Confianza alta.

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Motor MPP con planificación en DAG de fragmentos, ejecutado en paralelo por los *backends*[^doris-docs-intro].

### DP-CAR-02 · Streaming / tiempo real · 3/5
Ingesta nativa en streaming: *Routine Load* desde Kafka[^doris-docs-routine-load], *streaming jobs* de carga continua desde bases de datos MySQL/PostgreSQL por CDC y desde S3[^doris-docs-continuous-load], y conectores Flink y Kafka. Nivel 3 (ingesta nativa con latencia de segundos). El nivel 4 exige un SLA de latencia p99 que no se ha podido comprobar.

### DP-CAR-03 · ML/IA y búsqueda vectorial · 4/5
Nota agregada según la escala de `rubricas/datos.md`: DP-IA-02 (índice ANN GA desde la 4.0)[^doris-docs-vector-index] y DP-IA-01 (familia de funciones `AI_*` que invocan un LLM externo desde SQL, versión 4.x)[^doris-docs-llm-functions]. Ambos resueltos: nivel 4. No llega al 5 porque no se ha verificado un flujo RAG completo invocable desde SQL con evidencia de adopción.

### DP-CAR-04 · OLTP / Lakebase · 2/5
Doris Soporta upserts/actualizaciones puntuales pero sin garantías transaccionales OLTP, incluye características nativas para soportar modificaciones puntuales de datos en tiempo real: Modelo Unike Key con Merge-on-Write (MoW) y Optimizaciones de baja lantencia [^doris-unique-key-model][^doris-high-concurrency-point-query] [^doris-updating-data-on-unique-key-model]. 

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 1/5
La gestión de concurrencia se apoya en *workload/resource groups* y en *compute groups* aislados[^doris-docs-resource-group][^doris-docs-compute-group]; añadir capacidad se hace con `ALTER SYSTEM ADD BACKEND`, es decir, **manualmente** (o mediante el operador de Kubernetes)[^doris-docs-compute-group]. No se documenta autoescalado automático. Nivel 1 de la rúbrica («gestión manual con *resource groups*»), aunque el aislamiento por *compute groups* sin migración de datos apunta a un techo superior.

### DP-REN-02 Benchmarks publicados
Sin benchmark independiente localizado. Existen benchmarks en la propia página [https://doris.apache.org/why-doris/benchmarks/](https://doris.apache.org/why-doris/benchmarks/)

### DP-REN-03 Escala a cero
DP-REN-03: no aplica al ser un proyecto self-hosted sin servicio gestionado oficial (antes `N/D`).

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 4/5
Doris es compatible con el protocolo MySQL (clientes y herramientas MySQL se conectan directamente)[^doris-docs-mysql-proto] y ofrece SQL amplio. Nivel 4 (SQL amplio + compatibilidad de protocolo documentada).

### DP-INT-02 · Conectores y ecosistema · 4/5
Adaptador `dbt-doris` mantenido en el propio repositorio de Apache Doris[^doris-docs-dbt], integración documentada con herramientas de BI (Tableau, Power BI, QuickSight, Superset, Metabase, entre otras)[^doris-docs-bi-tableau], y conectores oficiales de Flink, Spark y Kafka[^doris-docs-flink-connector]. No se ha verificado un proveedor de Airflow oficial.

### DP-INT-03 · Facilidad de salida de datos · 3/5
Exportación a formatos estándar mediante `SELECT … INTO OUTFILE`/`EXPORT` (Parquet, CSV…)[^doris-docs-outfile]; los datos de tablas internas siguen el formato propio de Doris incluso en object storage compartido, salvo que se opte por tablas Iceberg escritas desde Doris[^doris-docs-iceberg-catalog]. Nivel 3, el nivel 4 requiere que los datos ya residan en formato de tabla abierto de forma nativa.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
Autorización RBAC integrada con privilegios a nivel de catálogo, base de datos, tabla y columna[^doris-docs-authz-internal]; políticas de fila (*Row Policy*), permisos de columna y **enmascaramiento de datos** (este último depende de Apache Ranger)[^doris-docs-authz-data]. Nivel 4 (RBAC + enmascaramiento dinámico). No se verifica ABAC con atributos dinámicos.

### DP-GOB-02 · Linaje y auditoría · 3/5
Registro de auditoría consultable (tabla interna `audit_log` y *plugin* de auditoría)[^doris-docs-audit] y linaje de tabla **y de columna** emitido mediante un `LineagePlugin` hacia sistemas de gobierno externos; Doris es productor de linaje y no lo retiene ni lo expone para consulta[^doris-docs-lineage].

### DP-GOB-03 · Certificaciones de seguridad
No aplica: proyecto OSS sin oferta gestionada propia.

### DP-GOB-04 · Residencia de datos en la UE
No aplica directamente a un producto self-hosted.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (binario, Docker, Kubernetes mediante el operador oficial[^doris-operator-github], plantillas de despliegue en AWS[^doris-docs-aws]); existen ofertas gestionadas de terceros como SelectDB, no verificadas en detalle en esta revisión.

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
Existe un **operador de Kubernetes oficial** (operador oficial mantenido por una fundación). en el repositorio `apache/doris-operator` (Apache-2.0) que gestiona FE, BE, CN y brokers mediante el recurso `DorisCluster`, con cambios seguros de configuración y topología y soporte del modo desacoplado[^doris-operator-github][^doris-docs-operator].

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
`apache/doris-operator`, repositorio oficial de la ASF[^doris-operator-github].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 4/5
Proyecto bajo la Apache Software Foundation, graduado como Top-Level Project en junio de 2022[^doris-github-readme]; 16.015 estrellas, 3.967 *forks* y 844 contribuidores (incluidos anónimos) en GitHub, con actividad el día de esta consulta[^github-doris-api].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 4/5
Catálogos externos Iceberg (REST, HMS, Glue, Polaris, Unity Catalog)[^doris-docs-iceberg-catalog], emisión de linaje a sistemas de gobierno[^doris-docs-lineage] y operador de Kubernetes[^doris-docs-operator].

### DP-ECO-03 · Disponibilidad de perfiles en el mercado
N/D.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Apache License 2.0[^doris-github-readme].

### DP-LIC-02 · Estabilidad de la licencia · 5/5
Apache-2.0 desde su donación a la ASF (proyecto con más de 5 años bajo la fundación, graduado como TLP en 2022)[^doris-github-readme]; la política de la ASF obliga a que todos sus proyectos se distribuyan bajo Apache-2.0, lo que constituye el compromiso institucional que exige el nivel 5[^asf-licenses]. El README indica que algunas dependencias de terceros no son compatibles con Apache 2.0 y deben deshabilitarse para cumplir estrictamente la licencia: es una salvedad de implementación, no un cambio de licencia.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · No aplica
No aplica un modelo de precios propio del proyecto: es self-hosted y gratuito, sin oferta gestionada oficial.

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
Apache Doris incluye funciones `AI_*` (`AI_CLASSIFY`, `AI_EXTRACT`, `AI_GENERATE`, `AI_SUMMARIZE`, `AI_TRANSLATE`, `AI_FILTER`, etc.) que envían el valor de una columna a un LLM externo configurado como `AI RESOURCE`[^doris-docs-llm-functions]. Confianza media: no se ha verificado el estado de disponibilidad general en las notas de versión.

### DP-IA-02 · Búsqueda vectorial nativa · 5/5
Apache Doris soporta tres algoritmos ANN (HNSW, IVF e IVF On-Disk, construidos sobre Faiss), en disponibilidad general desde la versión 4.0 (no experimental)[^doris-docs-vector-index]. La documentación oficial reporta recuperación en milisegundos sobre miles de millones de vectores ("*millisecond-level TopN and range retrieval over billions of vectors*"), con la búsqueda aproximada reduciendo la latencia de ~290 ms (búsqueda exacta) a ~20 ms, y cifras de rendimiento publicadas sobre datasets de Cohere (3.340 QPS con 240 conexiones concurrentes)[^doris-docs-vector-index]. Cumple el nivel máximo de la escala: "índice ANN a escala de miles de millones de vectores con coste/rendimiento publicado".

### DP-IA-03 · N/D
Sin fuente verificada en esta revisión.

[^doris-docs-intro]: Apache Doris Docs, «Introduction to Apache Doris» (3.x), https://doris.apache.org/docs/3.x/gettingStarted/what-is-apache-doris/, consultado 2026-09-30.
[^doris-github-readme]: Apache Doris (GitHub), «README.md», https://github.com/apache/doris/blob/master/README.md, consultado 2026-09-29.
[^doris-docs-vector-index]: Apache Doris Docs, «Vector Index» (4.x; § Performance), https://doris.apache.org/docs/4.x/key-features/vector-index#performance, consultado 2026-09-30.
[^doris-docs-compute-group]: Apache Doris Docs, «Compute Group management» (4.x), https://doris.apache.org/docs/4.x/admin-manual/workload-management/compute-group, consultado 2026-09-30.
[^doris-docs-resource-group]: Apache Doris Docs, «Resource Group» (4.x), https://doris.apache.org/docs/4.x/admin-manual/workload-management/resource-group, consultado 2026-09-30.
[^doris-docs-catalog]: Apache Doris Docs, "Data Catalog Overview, https://doris.apache.org/docs/4.x/lakehouse/catalog-overview, consultado 2026-09-30.
[^doris-docs-iceberg-catalog]: Apache Doris Docs, «Iceberg Catalog» (4.x), https://doris.apache.org/docs/4.x/lakehouse/catalogs/iceberg-catalog/, consultado 2026-09-30.
[^doris-docs-routine-load]: Apache Doris Docs, «Routine Load» (4.x), https://doris.apache.org/docs/4.x/data-operate/import/import-way/routine-load-manual, consultado 2026-09-30.
[^doris-docs-continuous-load]: Apache Doris Docs, «Continuous load (streaming jobs)» (4.x), https://doris.apache.org/docs/4.x/data-operate/import/import-way/streaming-job/continuous-load-overview, consultado 2026-09-30.
[^doris-docs-llm-functions]: Apache Doris Docs, «LLM SQL Functions» (4.x; § What), https://doris.apache.org/docs/4.x/key-features/llm-sql-functions#what, consultado 2026-09-30.
[^doris-docs-mysql-proto]: Apache Doris Docs, «MySQL protocol» (4.x), https://doris.apache.org/docs/4.x/connection-integration/mysql-proto, consultado 2026-09-30.
[^doris-docs-dbt]: Apache Doris Docs, «DBT Doris Adapter» (3.x), https://doris.apache.org/docs/3.x/ecosystem/dbt-doris-adapter, consultado 2026-09-30.
[^doris-docs-bi-tableau]: Apache Doris Docs, «Tableau» (BI; 3.x), https://doris.apache.org/docs/3.x/ecosystem/bi/tableau, consultado 2026-09-30.
[^doris-docs-flink-connector]: Apache Doris Docs, «Flink Doris Connector» (4.x), https://doris.apache.org/docs/4.x/connection-integration/data-integration/flink-doris-connector, consultado 2026-09-30.
[^doris-docs-outfile]: Apache Doris Docs, «SELECT INTO OUTFILE» (4.x), https://doris.apache.org/docs/4.x/data-operate/export/outfile/, consultado 2026-09-30.
[^doris-docs-authz-data]: Apache Doris Docs, «Data access control: Row Policy, Column Permission, Data Masking» (4.x; § Row Policy), https://doris.apache.org/docs/4.x/admin-manual/auth/authorization/data#row-policy, consultado 2026-09-30.
[^doris-docs-authz-internal]: Apache Doris Docs, «Built-in authorization (RBAC)» (4.x), https://doris.apache.org/docs/4.x/admin-manual/auth/authorization/internal, consultado 2026-09-30.
[^doris-docs-audit]: Apache Doris Docs, «Audit Log» (4.x), https://doris.apache.org/docs/4.x/admin-manual/audit-plugin, consultado 2026-09-30.
[^doris-docs-lineage]: Apache Doris Docs, «Data Lineage» (4.x; § Capabilities and limitations), https://doris.apache.org/docs/4.x/data-governance/data-lineage#capabilities-and-limitations, consultado 2026-09-30.
[^doris-operator-github]: Apache Doris (GitHub), «apache/doris-operator» (Apache-2.0), https://github.com/apache/doris-operator, consultado 2026-09-30.
[^doris-docs-operator]: Apache Doris Docs, «Doris Kubernetes Operator» (4.x), https://doris.apache.org/docs/4.x/ecosystem/doris-operator/doris-operator-overview, consultado 2026-09-30.
[^doris-docs-aws]: Apache Doris Docs, «Doris on AWS» (4.x), https://doris.apache.org/docs/4.x/install/deploy-on-cloud/doris-on-aws, consultado 2026-09-30.
[^github-doris-api]: GitHub API, «apache/doris» (estrellas, forks, contribuidores), https://api.github.com/repos/apache/doris, consultado 2026-09-30.
[^asf-licenses]: Apache Software Foundation, «Apache Licenses», https://www.apache.org/licenses/, consultado 2026-09-30.
[^doris-unique-key-model]: Apache Doris Docs, «Unique Key Model», https://doris.apache.org/docs/dev/table-design/data-model/unique
[^doris-high-concurrency-point-query]: Apache Doris Docs «High-Concurrency Point Query», https://doris.apache.org/docs/dev/key-features/high-concurrency-point-query
[^doris-updating-data-on-unique-key-model]: Apache Doris Docs «Updating Data on Unique Key Model», https://doris.apache.org/docs/3.x/data-operate/update/update-of-unique-model
