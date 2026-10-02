---
id: starrocks
nombre: StarRocks
dominio: datos
categoria: motor-olap
tipo: hibrido
licencia: Apache-2.0
despliegue: [self-hosted, saas, byoc, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [sr-docs-shared-data, sr-docs-intro] }
  DP-ARQ-02: { nota: 3, confianza: alta, fuentes: [sr-docs-iceberg-dml, sr-docs-iceberg-timetravel] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [sr-docs-iceberg-dml, sr-docs-unified-catalog] }
  DP-CAR-01: { nota: 4, confianza: media, fuentes: [sr-docs-intro, sr-docs-tpcds] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [sr-docs-routine-load] }
  DP-CAR-03: { nota: 2, confianza: media, fuentes: [sr-docs-vector-index] }
  DP-CAR-04: { nota: 0, confianza: media, fuentes: [sr-docs-intro] }
  DP-REN-01: { nota: 4, confianza: media, fuentes: [sr-docs-operator, sr-docs-shared-data] }
  DP-REN-02: { valor: "Benchmarks propios del proyecto: SSB 100 GB (vs ClickHouse y Druid), TPC-DS 1 TB (vs Trino) y TPC-H 100 GB (vs Trino), publicados por el fabricante; no se ha localizado benchmark independiente", confianza: media, fuentes: [sr-docs-tpcds] }
  DP-REN-03: { valor: "No aplica — proyecto OSS self-hosted; la suspensión automática dependería de la oferta gestionada, no verificada", confianza: n/a, fuentes: [] }
  DP-INT-01: { nota: 4, confianza: media, fuentes: [sr-docs-intro-md] }
  DP-INT-02: { nota: 4, confianza: media, fuentes: [sr-docs-dbt, sr-docs-intro-md] }
  DP-INT-03: { nota: 3, confianza: media, fuentes: [sr-docs-unloading, sr-docs-iceberg-dml] }
  DP-GOB-01: { nota: 4, confianza: media, fuentes: [sr-docs-ranger, sr-docs-privileges] }
  DP-GOB-02: { nota: 2, confianza: media, fuentes: [sr-docs-audit-loader] }
  DP-GOB-03: { valor: "N/D — la oferta gestionada (CelerData, ahora PhoenixAI) no se ha verificado", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica directamente en self-hosted; la oferta gestionada de CelerData no se ha verificado en esta revisión", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted (Apache-2.0, incluido Kubernetes con operador oficial); oferta comercial de PhoenixAI (antes CelerData): BYOC en AWS/Azure/GCP y PhoenixAI Anywhere (autogestionado en Kubernetes, on-prem o air-gapped)", confianza: media, fuentes: [sr-docs-operator, phoenix-pricing, phoenix-rebrand] }
  DP-DEP-02: { nota: 3, confianza: alta, fuentes: [sr-docs-operator, sr-operator-github] }
  DP-DEP-03: { valor: "Sí", confianza: alta, fuentes: [sr-operator-github, sr-docs-operator] }
  DP-ECO-01: { nota: 4, confianza: media, fuentes: [sr-blog-license-apache2, sr-web] }
  DP-ECO-02: { nota: 4, confianza: media, fuentes: [sr-docs-iceberg-dml, sr-docs-ranger, sr-docs-operator] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [sr-blog-license-apache2] }
  DP-LIC-02: { nota: 3, confianza: media, fuentes: [sr-blog-license-apache2] }
  DP-COS-02: { nota: 0, confianza: media, fuentes: [phoenix-pricing] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [sr-llms] }
  DP-IA-02: { nota: 2, confianza: alta, fuentes: [sr-docs-vector-index, sr-docs-maturity] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# StarRocks

## Resumen

StarRocks es un motor MPP de código abierto especializado en analítica sub-segundo, nacido en 2020 como bifurcación comercial de Apache Doris 0.13 (bajo el nombre inicial DorisDB) y desde entonces reescrito en gran parte, incluyendo un motor de ejecución vectorizado propio y un optimizador CBO[^sr-docs-intro]. Se distribuye tanto como proyecto self-hosted (donado a la Linux Foundation en febrero de 2023) como oferta gestionada de su empresa promotora, **CelerData, antes PhoenixAI**[^phoenix-rebrand].

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Arquitectura MPP con modo *shared-nothing* y modo *shared-data* (almacenamiento remoto desacoplado del cómputo, con aislamiento de recursos entre *warehouses*)[^sr-docs-shared-data][^sr-docs-intro].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
Lee Iceberg, Hive, Hudi, Delta Lake y Paimon mediante catálogos externos[^sr-docs-unified-catalog]; **escribe** en Iceberg con `INSERT`/`INSERT OVERWRITE` desde la v3.1 (por ahora solo ficheros Parquet) y admite *time travel* de Iceberg desde la 3.4[^sr-docs-iceberg-dml][^sr-docs-iceberg-timetravel].

### DP-ARQ-03 · Catálogo externo compatible · Sí
Catálogos externos Iceberg (REST, Hive Metastore, Glue…) y un *unified catalog* para varias fuentes[^sr-docs-iceberg-dml][^sr-docs-unified-catalog].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Motor vectorizado propio con optimizador basado en costes, orientado a analítica sub-segundo[^sr-docs-intro]. Sus benchmarks (TPC-DS 1 TB: 8,13× más rápido que Trino; TPC-H 100 GB; SSB 100 GB frente a ClickHouse y Druid) son del propio proyecto.

### DP-CAR-02 · Streaming / tiempo real · 3/5
Ingesta nativa desde Kafka mediante *Routine Load*[^sr-docs-routine-load], además de *Stream Load* y conectores. Nivel 3 (ingesta nativa en streaming con latencia de segundos).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 2/5
Índices vectoriales IVFPQ y HNSW, marcados como **Beta** y solo para clústeres *shared-nothing* de v3.4 o posterior[^sr-docs-vector-index]; no se ha localizado ninguna función LLM en SQL[^sr-llms].

### DP-CAR-04 · OLTP / Lakebase · 0/5
StarRocks se define como almacén analítico MPP y no ofrece un motor transaccional OLTP propio[^sr-docs-intro]. Nivel 0; confianza media (ausencia).

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
El operador oficial de Kubernetes crea un recurso HPA a partir de la política `autoScalingPolicy` del clúster CN, con comportamiento de escalado configurable[^sr-docs-operator], y el modo *shared-data* ofrece aislamiento de recursos entre *warehouses*[^sr-docs-shared-data]. El autoescalado depende de Kubernetes/HPA y no se ha encontrado evidencia pública de concurrencia a gran escala.

### DP-REN-02 · Benchmarks publicados
SSB 100 GB (frente a ClickHouse y Druid), TPC-DS 1 TB y TPC-H 100 GB (frente a Trino), publicados por el propio proyecto (conflicto de interés)[^sr-docs-tpcds]; sin benchmark independiente localizado.

### DP-REN-03 · Escala a cero
No aplica al proyecto self-hosted; la oferta gestionada no se ha verificado.

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 4/5
SQL amplio con optimizador CBO propio y compatibilidad con el protocolo MySQL (clientes y herramientas de BI MySQL se conectan directamente)[^sr-docs-intro-md]. 

### DP-INT-02 · Conectores y ecosistema · 4/5
Adaptador `dbt-starrocks` mantenido en la organización del proyecto[^sr-docs-dbt], compatibilidad con herramientas de BI por protocolo MySQL[^sr-docs-intro-md] y conectores de streaming (Kafka, Flink, Spark). No se ha verificado proveedor de Airflow oficial ni BI certificada. 

### DP-INT-03 · Facilidad de salida de datos · 3/5
Exportación a ficheros mediante las sentencias de *unloading*[^sr-docs-unloading]; en modo *shared-data* los datos viven en object storage pero en el formato de segmentos propio de StarRocks, salvo que se opte por tablas Iceberg escritas desde StarRocks[^sr-docs-iceberg-dml].

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
RBAC e IBAC nativos con privilegios por objeto[^sr-docs-privileges], más integración con Apache Ranger para políticas de acceso, **enmascaramiento** y **filtros a nivel de fila**[^sr-docs-ranger].

### DP-GOB-02 · Linaje y auditoría · 2/5
El *plugin* AuditLoader carga el registro de auditoría en una tabla consultable con SQL[^sr-docs-audit-loader]; no se ha localizado linaje nativo. Nivel 2.

### DP-GOB-03 · Certificaciones de seguridad
N/D: la oferta gestionada (CelerData, hoy PhoenixAI) no se ha verificado.

### DP-GOB-04 · Residencia de datos en la UE
No aplica directamente en self-hosted; la oferta gestionada funciona en BYOC, en la cuenta cloud del cliente[^phoenix-pricing].

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (Apache-2.0; binarios, Docker, Helm y operador de Kubernetes[^sr-docs-operator]) u oferta comercial de PhoenixAI (antes CelerData): PhoenixAI Cloud en modo BYOC (AWS, Azure, GCP) y PhoenixAI Anywhere (autogestionado en Kubernetes, on-prem o air-gapped)[^phoenix-pricing].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
Operador oficial del proyecto (`StarRocks/starrocks-kubernetes-operator`) que despliega FE, BE y CN, automatiza la actualización ordenada del clúster y crea el HPA de los nodos CN[^sr-docs-operator][^sr-operator-github]. Nivel 3 (operador oficial). No se sube al 4: no se ha verificado automatización documentada de *backups*.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
Mantenido en el repositorio oficial del proyecto[^sr-operator-github].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 4/5
Nació como fork comercial en 2020 y se relicenció íntegramente a Apache-2.0 en diciembre de 2022, tras alcanzar cientos de usuarios empresariales y cerca de 10.000 miembros de comunidad, según el propio anuncio[^sr-blog-license-apache2]; el proyecto pasó a la Linux Foundation en 2023[^sr-web]; 12.150 estrellas, 2.611 *forks* y 698 contribuidores (incluidos anónimos) en GitHub, con actividad el día de esta consulta[^github-starrocks-api].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 4/5
Catálogos Iceberg externos[^sr-docs-iceberg-dml], Apache Ranger para gobierno[^sr-docs-ranger] y operador de Kubernetes[^sr-docs-operator]. Nivel 4 con confianza media.

### DP-ECO-03 · Disponibilidad de perfiles en el mercado
N/D.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Apache License 2.0 desde diciembre de 2022[^sr-blog-license-apache2].

### DP-LIC-02 · Estabilidad de la licencia · 3/5
**Caso singular en esta rúbrica:** StarRocks cambió de licencia en 2022, pero hacia una más permisiva (de Elastic License 2.0, *source-available*, a Apache-2.0)[^sr-blog-license-apache2]. No hay cambios restrictivos, pero lleva solo unos 3,8 años bajo Apache-2.0 (< 5 años).

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 0/5
La oferta gestionada (PhoenixAI, antes CelerData) indica que el precio «depende de la carga de trabajo» y exige contactar con ventas; no publica tarifas, aunque ofrece 30 días de prueba gratuita[^phoenix-pricing]. Nivel 0 («ningún precio público»). Confianza media: no se ha comprobado una posible referencia en marketplaces de hiperescaladores, que elevaría la nota a 1.

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
No figura ninguna función de invocación de LLM en el índice de documentación oficial[^sr-llms]. Confianza media (ausencia).

### DP-IA-02 · Búsqueda vectorial nativa · 2/5
Índices IVFPQ y HNSW en **Beta**, solo en clústeres *shared-nothing* (v3.4+)[^sr-docs-vector-index][^sr-docs-maturity]. Nivel 2 (ANN no GA).

### DP-IA-03 · Roadmap público de IA
N/D.

[^sr-docs-intro]: StarRocks Docs, «StarRocks introduction», https://docs.starrocks.io/docs/introduction/StarRocks_intro/, consultado 2026-09-30.
[^sr-blog-license-apache2]: StarRocks Blog, «StarRocks Is Now Under Apache License 2.0», https://www.starrocks.io/blog/starrocks-is-now-under-apache-license-2.0 (la URL redirige actualmente al índice del blog; no se pudo reverificar el texto), consultado 2026-09-29.
[^sr-docs-intro-md]: StarRocks Docs, «StarRocks introduction» (texto: compatibilidad con el protocolo MySQL), https://docs.starrocks.io/docs/introduction/StarRocks_intro/, consultado 2026-09-30.
[^sr-docs-shared-data]: StarRocks Docs, «Feature support: shared-data clusters» (§ Overview), https://docs.starrocks.io/docs/deployment/feature-support-shared-data/#overview, consultado 2026-09-30.
[^sr-docs-iceberg-dml]: StarRocks Docs, «Iceberg catalog — DML» (§ INSERT), https://docs.starrocks.io/docs/data_source/catalog/iceberg/DML/#insert, consultado 2026-09-30.
[^sr-docs-iceberg-timetravel]: StarRocks Docs, «Time Travel with Iceberg Catalog», https://docs.starrocks.io/docs/data_source/catalog/iceberg/iceberg_timetravel/, consultado 2026-09-30.
[^sr-docs-unified-catalog]: StarRocks Docs, «Unified catalog», https://docs.starrocks.io/docs/data_source/catalog/unified_catalog/, consultado 2026-09-30.
[^sr-docs-tpcds]: StarRocks Docs, «TPC-DS Benchmarking» (benchmark del propio proyecto), https://docs.starrocks.io/docs/benchmarking/TPC_DS_Benchmark/, consultado 2026-09-30.
[^sr-docs-routine-load]: StarRocks Docs, «Continuously load data from Apache Kafka» (Routine Load), https://docs.starrocks.io/docs/loading/kafka/RoutineLoad/, consultado 2026-09-30.
[^sr-docs-vector-index]: StarRocks Docs, «Vector Index» (estado Beta; § Overview), https://docs.starrocks.io/docs/table_design/indexes/vector_index/#overview, consultado 2026-09-30.
[^sr-docs-maturity]: StarRocks Docs, «Beta and experimental features», https://docs.starrocks.io/docs/introduction/maturity/#beta-features, consultado 2026-09-30.
[^sr-docs-operator]: StarRocks Docs, «StarRocks Kubernetes Operator» (§ How it works), https://docs.starrocks.io/docs/deployment/sr_operator/#how-it-works, consultado 2026-09-30.
[^sr-operator-github]: StarRocks (GitHub), «starrocks-kubernetes-operator», https://github.com/StarRocks/starrocks-kubernetes-operator, consultado 2026-09-30.
[^sr-docs-dbt]: StarRocks Docs, «dbt», https://docs.starrocks.io/docs/integrations/dbt/, consultado 2026-09-30.
[^sr-docs-unloading]: StarRocks Docs, «Unloading» (exportación de datos), https://docs.starrocks.io/docs/unloading/, consultado 2026-09-30.
[^sr-docs-ranger]: StarRocks Docs, «Manage permissions with Apache Ranger» (§ Permission control method), https://docs.starrocks.io/docs/administration/user_privs/authorization/ranger_plugin/#permission-control-method, consultado 2026-09-30.
[^sr-docs-privileges]: StarRocks Docs, «Manage user privileges», https://docs.starrocks.io/docs/administration/user_privs/authorization/User_privilege/, consultado 2026-09-30.
[^sr-docs-audit-loader]: StarRocks Docs, «Manage audit logs within StarRocks via AuditLoader», https://docs.starrocks.io/docs/administration/management/audit_loader/, consultado 2026-09-30.
[^sr-llms]: StarRocks Docs, índice de documentación (llms.txt), https://docs.starrocks.io/llms.txt, consultado 2026-09-30.
[^sr-web]: StarRocks, web oficial (licencia Apache-2.0; Linux Foundation), https://www.starrocks.io/, consultado 2026-09-30.
[^phoenix-pricing]: PhoenixAI (antes CelerData), «Pricing», https://phoenixdata.ai/pricing, consultado 2026-09-30.
[^phoenix-rebrand]: Database Trends and Applications, «CelerData Rebrands as PhoenixAI, Introduces Analytical Engine Designed for AI Agents», https://www.dbta.com/Editorial/News-Flashes/CelerData-Rebrands-as-PhoenixAI-Introduces-Analytical-Engine-Designed-for-AI-Agents-174972.aspx, consultado 2026-09-30.
[^github-starrocks-api]: GitHub API, «StarRocks/starrocks» (estrellas, forks, contribuidores), https://api.github.com/repos/StarRocks/starrocks, consultado 2026-09-30.
