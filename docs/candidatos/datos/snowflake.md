---
id: snowflake
nombre: Snowflake
dominio: datos
categoria: cloud-dwh
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [sf-docs-multicluster, sf-docs-warehouses] }
  DP-ARQ-02: { nota: 3, confianza: alta, fuentes: [sf-docs-iceberg-tables, sf-relnote-iceberg-writes-ga] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [sf-docs-iceberg-tables, sf-relnote-iceberg-writes-ga] }
  DP-CAR-01: { nota: 5, confianza: alta, fuentes: [sf-docs-warehouses, fivetran-benchmark, sf-sec-fy26q4] }
  DP-CAR-02: { nota: 3, confianza: alta, fuentes: [sf-docs-snowpipe-streaming] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [sf-docs-cortex-aisql, sf-docs-vector-embeddings] }
  DP-CAR-04: { nota: 4, confianza: alta, fuentes: [sf-relnote-postgres-ga, sf-relnote-postgres-catalog-ga, sf-blog-pglake] }
  DP-REN-01: { nota: 4, confianza: alta, fuentes: [sf-docs-multicluster] }
  DP-REN-02: { valor: "Fivetran Cloud Data Warehouse Benchmark (2025, incluye Snowflake) y GigaOm TPC-DS 2019 (patrocinado por Microsoft, con Snowflake entre los comparados)", confianza: media, fuentes: [fivetran-benchmark, gigaom-2019-benchmark] }
  DP-REN-03: { valor: "Sí", confianza: alta, fuentes: [sf-docs-warehouses] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [sf-docs-sql-reference, sf-docs-scripting] }
  DP-INT-02: { nota: 4, confianza: media, fuentes: [sf-github-dbt-adapter, sf-docs-ecosystem] }
  DP-INT-03: { nota: 3, confianza: media, fuentes: [sf-docs-unload, sf-docs-data-transfer-cost] }
  DP-GOB-01: { nota: 4, confianza: alta, fuentes: [sf-docs-ddm, sf-docs-row-access, sf-docs-tag-policies] }
  DP-GOB-02: { nota: 4, confianza: alta, fuentes: [sf-docs-lineage] }
  DP-GOB-03: { valor: "ISO 27001/27017/27018/9001, SOC 1 Tipo II, SOC 2 Tipo II, PCI-DSS, C5 (BSI), TISAX, HITRUST CSF, Cyber Essentials Plus", confianza: alta, fuentes: [sf-docs-compliance] }
  DP-GOB-04: { valor: "Sí", confianza: media, fuentes: [sf-data-sovereignty] }
  DP-DEP-01: { valor: "SaaS únicamente, multi-nube (AWS, Azure, GCP), sin self-hosted", confianza: alta, fuentes: [sf-pricing-page] }
  DP-DEP-02: { valor: "N/D — no aplica, no existe modo self-managed", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica — SaaS sin modo self-hosted", confianza: n/a, fuentes: [sf-pricing-page] }
  DP-ECO-01: { nota: 3, confianza: media, fuentes: [sf-sec-fy26q4, sf-blog-polaris-open-source] }
  DP-ECO-02: { nota: 4, confianza: media, fuentes: [sf-github-dbt-adapter, sf-docs-iceberg-tables, sf-docs-ecosystem] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [sf-pricing-page] }
  DP-LIC-02: { valor: "No aplica — producto propietario desde su origen, sin historial de licencia OSS que evaluar", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 4, confianza: alta, fuentes: [sf-pricing-page, sf-pricing-calculator] }
  DP-IA-01: { valor: "Sí", confianza: alta, fuentes: [sf-docs-cortex-aisql] }
  DP-IA-02: { nota: 2, confianza: media, fuentes: [sf-docs-vector-embeddings, sf-docs-cortex-search] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Snowflake

## Resumen

Snowflake (2016) es la referencia histórica del modelo de cloud data warehouse con almacenamiento y cómputo separados: los datos residen en el object store del proveedor y el cómputo se añade o retira de forma elástica por warehouse, sin redistribuir datos[^sf-docs-warehouses]. Es SaaS puro, sin modo self-hosted, disponible en AWS, Azure y GCP.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Los *virtual warehouses* escalan verticalmente y, mediante *multi-cluster warehouses* (característica de la edición Enterprise), también horizontalmente: varios clústeres sirven la misma cola de consultas sobre una única copia de los datos[^sf-docs-multicluster][^sf-docs-warehouses]. 

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
Snowflake lee y escribe tablas Iceberg (v1–v3) con *time travel* y *schema evolution*; la escritura desde motores externos vía el catálogo REST de Horizon es GA desde mayo de 2026[^sf-docs-iceberg-tables][^sf-relnote-iceberg-writes-ga]. Delta Lake solo se **lee** (a través de la integración Iceberg), sin escritura[^sf-docs-iceberg-tables].

### DP-ARQ-03 · Catálogo externo compatible · Sí
Snowflake se integra con AWS Glue, Snowflake Open Catalog y catálogos Iceberg REST genéricos[^sf-docs-iceberg-tables], y su propio Horizon Catalog expone el protocolo REST de Iceberg para que motores externos lean y escriban las tablas gestionadas por Snowflake[^sf-relnote-iceberg-writes-ga].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 5/5
Sistema de referencia de esta categoría: SQL completo y optimizador CBO[^sf-docs-warehouses], comparativas independientes de coste/rendimiento como el *Cloud Data Warehouse Benchmark* de Fivetran (2025)[^fivetran-benchmark] y adopción a gran escala documentada en sus resultados trimestrales: 13.328 clientes, 790 de ellos de la Forbes Global 2000[^sf-sec-fy26q4]. 

### DP-CAR-02 · Streaming / tiempo real · 3/5
Snowpipe Streaming documenta una latencia de ingesta a consulta «de hasta 5 segundos» como capacidad máxima, dependiente de la forma de la carga[^sf-docs-snowpipe-streaming]. Es ingesta nativa en streaming con latencia de segundos documentada, la documentación no especifica un SLA de latencia p99 (la cifra es un «as low as», no un compromiso).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Funciones LLM en SQL (GA, salvo las marcadas individualmente como *preview*)[^sf-docs-cortex-aisql] combinadas con un tipo `VECTOR` y búsqueda exacta por similitud[^sf-docs-vector-embeddings], la búsqueda con índice la resuelve el servicio gestionado Cortex Search[^sf-docs-cortex-search].

### DP-CAR-04 · OLTP / Lakebase · 4/5
**Snowflake Postgres** (Postgres gestionado integrado en la plataforma) es GA desde el 24-feb-2026[^sf-relnote-postgres-ga], y la integración de catálogo de Snowflake Postgres es GA desde el 14-jul-2026[^sf-relnote-postgres-catalog-ga]; **pg_lake** permite a Postgres actuar como catálogo de tablas Iceberg con semántica transaccional completa[^sf-blog-pglake].

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
Los *multi-cluster warehouses* en modo *auto-scale* añaden y retiran clústeres automáticamente cuando aparecen colas (hasta 300 clústeres en tamaños pequeños según la documentación)[^sf-docs-multicluster], y warehouses distintos aíslan la carga entre grupos de usuarios. Sin benchmarks públicos.

### DP-REN-02 · Benchmarks publicados
*Cloud Data Warehouse Benchmark* de Fivetran (2025), que compara precio/rendimiento entre Redshift, Snowflake, BigQuery, Databricks y Synapse[^fivetran-benchmark]. También existe un TPC-DS de GigaOm (2019) que incluye Snowflake, **patrocinado por Microsoft** (conflicto de interés declarado por el propio informe)[^gigaom-2019-benchmark].

### DP-REN-03 · Escala a cero · Sí
Los *warehouses* se auto-suspenden tras un periodo de inactividad configurable y se reanudan automáticamente con la siguiente consulta[^sf-docs-warehouses].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
SQL amplio[^sf-docs-sql-reference] con extensiones propias (Snowflake Scripting[^sf-docs-scripting], sintaxis y funciones propietarias de uso habitual).

### DP-INT-02 · Conectores y ecosistema · 4/5
El adaptador `dbt-snowflake` está mantenido por dbt Labs en su monorepo de adaptadores[^sf-github-dbt-adapter]. La documentación oficial remite a una red de «socios tecnológicos certificados» sin listarlos[^sf-docs-ecosystem].

### DP-INT-03 · Facilidad de salida de datos · 3/5
Exportación estándar a Parquet/CSV mediante `COPY INTO <ubicación>`[^sf-docs-unload]; los costes de transferencia de datos entre regiones y nubes se documentan en la guía de costes[^sf-docs-data-transfer-cost].

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
RBAC combinado con *row access policies* (fila)[^sf-docs-row-access], *dynamic data masking* (columna)[^sf-docs-ddm] y políticas basadas en etiquetas (*tag-based* masking/agregación/proyección)[^sf-docs-tag-policies], que aportan el componente de atributos (ABAC).

### DP-GOB-02 · Linaje y auditoría · 4/5
Snowflake ofrece linaje de datos **a nivel de tabla y de columna** (GA, edición Enterprise o superior), con consulta programática mediante la función `GET_LINEAGE`[^sf-docs-lineage]. No se documenta integración del linaje con un catálogo externo vía API.

### DP-GOB-03 · Certificaciones de seguridad
ISO 27001, 27017, 27018 y 9001; SOC 1 Tipo II y SOC 2 Tipo II; PCI-DSS; C5 (BSI); TISAX; HITRUST CSF; Cyber Essentials Plus[^sf-docs-compliance]. (Se retiran ISO 42001, 22301, 20000 y HDS, que la versión anterior atribuía a esta fuente pero que **no aparecen** en la página citada; pueden existir en otro documento de Snowflake, no verificado.)

### DP-GOB-04 · Residencia de datos en la UE · Sí
Regiones EMEA en AWS, Azure y GCP; el cliente puede configurar su cuenta para que sus datos permanezcan en la región elegida (p. ej. la UE)[^sf-data-sovereignty]. La página describe un control de configuración, no cita cláusulas contractuales (DPA) ni trata los metadatos.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS multi-nube (AWS, Azure, GCP); sin opción self-hosted ni BYOC[^sf-pricing-page].

### DP-DEP-02 · N/D
No aplica al no existir modo self-managed.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No aplica
Snowflake es un servicio SaaS sin modo self-hosted que un operador de Kubernetes pudiera desplegar[^sf-pricing-page].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
Base de clientes documentada: 13.328 clientes totales a 31-ene-2026, de ellos 790 de la Forbes Global 2000 (≈43 % de los ingresos del ejercicio)[^sf-sec-fy26q4]. Gobernanza de una única empresa; contribuye proyectos puntuales a fundaciones neutrales (Polaris Catalog, donado a la ASF), pero el producto principal no es open source[^sf-blog-polaris-open-source].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 4/5
Adaptador dbt mantenido por dbt Labs[^sf-github-dbt-adapter], integración con catálogos Iceberg externos (Glue, Open Catalog, REST)[^sf-docs-iceberg-tables] y red de socios certificados[^sf-docs-ecosystem].

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
Sin fuente pública localizada en esta revisión.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
Producto propietario, sin publicación de código fuente del núcleo del motor[^sf-pricing-page].

### DP-LIC-02 · Estabilidad de la licencia
No aplica: nunca ha sido un producto open source cuya licencia pueda "cambiar".

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 4/5
Página de precios pública (modalidades *on-demand* y capacidad prepagada; ediciones Standard, Enterprise y Business Critical)[^sf-pricing-page] y **calculadora de coste oficial interactiva**[^sf-pricing-calculator].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
Las funciones de IA de Cortex (resumen, traducción, clasificación, generación) están en disponibilidad general y se invocan como funciones SQL estándar[^sf-docs-cortex-aisql].

### DP-IA-02 · Búsqueda vectorial nativa · 2/5
Snowflake ofrece el tipo `VECTOR` (GA) con funciones de similitud exactas (`VECTOR_COSINE_SIMILARITY`, `VECTOR_L2_DISTANCE`, etc.)[^sf-docs-vector-embeddings]; la documentación no menciona un índice ANN sobre esas columnas. La búsqueda híbrida (vectorial + léxica) con índice la ofrece el servicio **Cortex Search**[^sf-docs-cortex-search], consultable desde aplicaciones (REST/Python) y, desde SQL, solo con `SEARCH_PREVIEW` orientada a pruebas.

### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap público dedicado localizada en esta revisión.

[^sf-docs-multicluster]: Snowflake Docs, «Multi-cluster Warehouses» (§ Maximized vs. Auto-scale), https://docs.snowflake.com/en/user-guide/warehouses-multicluster#maximized-vs-auto-scale, consultado 2026-09-30.
[^sf-docs-warehouses]: Snowflake Docs, «Overview of Warehouses» (§ Auto-suspension and auto-resumption), https://docs.snowflake.com/en/user-guide/warehouses-overview#auto-suspension-and-auto-resumption, consultado 2026-09-30.
[^sf-docs-iceberg-tables]: Snowflake Docs, «Apache Iceberg™ tables» (§ Catalog options), https://docs.snowflake.com/en/user-guide/tables-iceberg#catalog-options, consultado 2026-09-30.
[^sf-relnote-iceberg-writes-ga]: Snowflake Docs (release notes), «Apache Iceberg™ tables: Write support by using an external query engine (GA)», https://docs.snowflake.com/en/release-notes/2026/other/2026-05-26-tables-iceberg-query-using-external-query-engine-snowflake-horizon-writes-ga, consultado 2026-09-29.
[^fivetran-benchmark]: Fivetran, «Cloud Data Warehouse Benchmark», https://www.fivetran.com/blog/warehouse-benchmark, consultado 2026-09-29.
[^sf-docs-snowpipe-streaming]: Snowflake Docs, «Snowpipe Streaming» (§ Why use Snowpipe Streaming), https://docs.snowflake.com/en/user-guide/snowpipe-streaming/data-load-snowpipe-streaming-overview#why-use-snowpipe-streaming, consultado 2026-09-30.
[^sf-docs-cortex-aisql]: Snowflake Docs, «Snowflake Cortex AI Functions» (§ Available functions), https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql#available-functions, consultado 2026-09-30.
[^sf-blog-pglake]: Snowflake Engineering Blog, «Introducing pg_lake», https://www.snowflake.com/en/blog/engineering/pg-lake-postgres-lakehouse-integration/, consultado 2026-09-29.
[^gigaom-2019-benchmark]: GigaOm, «Data Warehouse in the Cloud Benchmark» (patrocinado por Microsoft), https://gigaom.com/report/data-warehouse-cloud-benchmark/, consultado 2026-09-29.
[^sf-docs-ddm]: Snowflake Docs, «Understanding Dynamic Data Masking», https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#what-is-dynamic-data-masking, consultado 2026-09-30.
[^sf-docs-compliance]: Snowflake Docs, «Regulatory compliance» (§ Global), https://docs.snowflake.com/en/user-guide/intro-compliance#global, consultado 2026-09-30.
[^sf-data-sovereignty]: Snowflake Inc., «Snowflake's Data Sovereignty Capabilities», https://www.snowflake.com/en/company/overview/data-sovereignty-europe/, consultado 2026-09-29.
[^sf-pricing-page]: Snowflake Inc., «Snowflake Pricing — Pricing options», https://www.snowflake.com/en/pricing-options/, consultado 2026-09-30.
[^sf-github-dbt-adapter]: dbt Labs (GitHub), «dbt-snowflake», https://github.com/dbt-labs/dbt-adapters/tree/main/dbt-snowflake, consultado 2026-09-29.
[^sf-blog-polaris-open-source]: Snowflake Blog, «Polaris Catalog Is Now Open Source», https://www.snowflake.com/en/blog/polaris-catalog-open-source/, consultado 2026-09-29.
[^sf-docs-vector-embeddings]: Snowflake Docs, «Vector embeddings» (§ About vector similarity functions), https://docs.snowflake.com/en/user-guide/snowflake-cortex/vector-embeddings#about-vector-similarity-functions, consultado 2026-09-30.
[^sf-docs-cortex-search]: Snowflake Docs, «Cortex Search» (§ Overview), https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview#overview, consultado 2026-09-30.
[^sf-relnote-postgres-ga]: Snowflake Docs (release notes), «Feb 24, 2026: Snowflake Postgres (General availability)», https://docs.snowflake.com/en/release-notes/2026/other/2026-02-24-snowflake-postgres-ga, consultado 2026-09-30.
[^sf-relnote-postgres-catalog-ga]: Snowflake Docs (release notes), «Jul 14, 2026: Catalog integration for Snowflake Postgres (General availability)», https://docs.snowflake.com/en/release-notes/2026/other/2026-07-14-snowflake-postgres-catalog-integration-ga, consultado 2026-09-30.
[^sf-docs-lineage]: Snowflake Docs, «Data lineage» (§ Column lineage; § Retrieve lineage programmatically), https://docs.snowflake.com/en/user-guide/ui-snowsight-lineage#column-lineage, consultado 2026-09-30.
[^sf-docs-row-access]: Snowflake Docs, «Understanding row access policies», https://docs.snowflake.com/en/user-guide/security-row-intro#what-is-row-level-security, consultado 2026-09-30.
[^sf-docs-tag-policies]: Snowflake Docs, «Column-level Security» (masking basado en etiquetas, políticas de agregación y de proyección), https://docs.snowflake.com/en/user-guide/security-column-intro, consultado 2026-09-30.
[^sf-docs-sql-reference]: Snowflake Docs, «SQL command reference», https://docs.snowflake.com/en/sql-reference-commands, consultado 2026-09-30.
[^sf-docs-scripting]: Snowflake Docs, «Snowflake Scripting Developer Guide», https://docs.snowflake.com/en/developer-guide/snowflake-scripting/index, consultado 2026-09-30.
[^sf-docs-ecosystem]: Snowflake Docs, «Ecosystem», https://docs.snowflake.com/en/user-guide/ecosystem, consultado 2026-09-30.
[^sf-docs-unload]: Snowflake Docs, «Overview of data unloading» (§ Bulk unloading process), https://docs.snowflake.com/en/user-guide/data-unload-overview#bulk-unloading-process, consultado 2026-09-30.
[^sf-docs-data-transfer-cost]: Snowflake Docs, «Understanding data transfer cost», https://docs.snowflake.com/en/user-guide/cost-understanding-data-transfer, consultado 2026-09-30.
[^sf-pricing-calculator]: Snowflake Inc., «Snowflake Pricing Calculator», https://www.snowflake.com/en/pricing-options/calculator/, consultado 2026-09-30.
[^sf-sec-fy26q4]: Snowflake Inc. (SEC, Form 8-K), «Resultados del cuarto trimestre y ejercicio fiscal 2026», https://www.sec.gov/Archives/edgar/data/1640147/000162828026011631/fy2026q4earnings.htm, consultado 2026-09-30.
