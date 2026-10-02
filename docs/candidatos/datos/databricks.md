---
id: databricks
nombre: Databricks (SQL Warehouse / Lakehouse Platform)
dominio: datos
categoria: lakehouse
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [db-docs-warehouse-behavior, db-community-serverless] }
  DP-ARQ-02: { nota: 4, confianza: alta, fuentes: [db-docs-iceberg, db-docs-uniform, db-blog-full-iceberg] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [db-docs-iceberg, db-blog-full-iceberg] }
  DP-CAR-01: { nota: 5, confianza: alta, fuentes: [db-docs-photon, db-pr-5-4b] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [db-docs-real-time] }
  DP-CAR-03: { nota: 4, confianza: alta, fuentes: [db-docs-ai-search, db-docs-ai-functions] }
  DP-CAR-04: { nota: 4, confianza: alta, fuentes: [db-docs-lakebase, db-blog-lakebase, db-blog-neon] }
  DP-REN-01: { nota: 4, confianza: alta, fuentes: [db-docs-warehouse-behavior] }
  DP-REN-02: { valor: "Fivetran Cloud Data Warehouse Benchmark (2025, incluye Databricks)", confianza: media, fuentes: [fivetran-benchmark] }
  DP-REN-03: { valor: "Sí", confianza: alta, fuentes: [db-docs-warehouse-create, db-community-serverless] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [db-docs-ansi-compliance] }
  DP-INT-02: { nota: 3, confianza: media, fuentes: [db-github-dbt-databricks, db-docs-integrations] }
  DP-INT-03: { nota: 4, confianza: media, fuentes: [db-docs-iceberg, db-docs-uniform] }
  DP-GOB-01: { nota: 4, confianza: alta, fuentes: [db-docs-abac, db-blog-abac-ga] }
  DP-GOB-02: { nota: 4, confianza: alta, fuentes: [db-docs-lineage] }
  DP-GOB-03: { valor: "ISO 27001/27017/27018/27701/27036/22301, SOC 1 Tipo II, SOC 2 Tipo II, SOC 3, HIPAA, HITRUST, PCI-DSS, FedRAMP, C5, GxP", confianza: alta, fuentes: [db-trust-soc] }
  DP-GOB-04: { valor: "N/D — disponibilidad técnica en la UE verificada, pero la cláusula contractual de residencia no se ha verificado en el DPA", confianza: media, fuentes: [db-docs-geos, db-trust-gdpr] }
  DP-DEP-01: { valor: "SaaS con dos modelos de plano de cómputo: 'classic' (dentro de la cuenta cloud del cliente) y 'serverless' (gestionado por Databricks); multi-nube (AWS, Azure, GCP)", confianza: alta, fuentes: [db-community-serverless] }
  DP-DEP-02: { valor: "N/D — no existe un modo self-managed en el sentido de instalar el motor en infraestructura propia sin control plane de Databricks", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica — servicio gestionado sin binario desplegable en Kubernetes propio", confianza: n/a, fuentes: [db-community-serverless, db-kube-operator] }
  DP-ECO-01: { nota: 3, confianza: media, fuentes: [db-pr-5-4b, db-blog-lakebase] }
  DP-ECO-02: { nota: 4, confianza: media, fuentes: [db-docs-iceberg, db-docs-integrations, db-github-dbt-databricks] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [db-pricing-page] }
  DP-LIC-02: { valor: "No aplica — producto propietario desde su origen (aunque Databricks libera componentes OSS como Delta Lake, Unity Catalog OSS o MLflow bajo Apache-2.0, la plataforma SQL Warehouse/Lakehouse en sí es propietaria)", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 4, confianza: alta, fuentes: [db-pricing-page] }
  DP-IA-01: { valor: "Sí", confianza: alta, fuentes: [db-docs-ai-functions] }
  DP-IA-02: { nota: 4, confianza: alta, fuentes: [db-docs-ai-search] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Databricks (SQL Warehouse / Lakehouse Platform)

## Resumen

Databricks es la plataforma lakehouse propietaria construida sobre Apache Spark, Delta Lake y Unity Catalog, con SQL Warehouses (motor Photon) como capa de consulta SQL. Es SaaS con dos modelos de cómputo: *classic* (dentro de la cuenta cloud del cliente) y *serverless* (gestionado por Databricks)[^db-community-serverless]. Es también el fabricante de referencia de la convergencia OLTP/OLAP descrita en `estado-del-arte/datos/estado-del-arte.md` (compra de Neon → Lakebase).

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Separación nativa (datos en Delta Lake sobre el object store) más autoescalado multi-clúster de los SQL Warehouses y un plano de cómputo serverless separado del plano clásico[^db-docs-warehouse-behavior][^db-community-serverless]. No se ha encontrado prueba de escalado en segundos en la documentación, la página citada solo habla de escalado «rápido» de los warehouses serverless sin cifras[^db-docs-warehouse-behavior].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 4/5
Delta Lake nativo (lectura/escritura) y tablas **Iceberg gestionadas** con lectura y escritura, incluida la API REST de catálogo Iceberg para motores externos y la federación de tablas Iceberg externas (solo lectura), todo ello GA según la documentación actual[^db-docs-iceberg]. UniForm expone además tablas Delta a clientes Iceberg, **solo en lectura**[^db-docs-uniform]. Nivel 4 (lectura y escritura estables de dos formatos). No se ha verificado soporte de Hudi. El blog de anuncio citado[^db-blog-full-iceberg] data de junio de 2025 y describía estas funciones en *Public Preview*;

### DP-ARQ-03 · Catálogo externo compatible · Sí
Unity Catalog expone una API REST de catálogo Iceberg (GA) y federa tablas Iceberg de catálogos externos como AWS Glue o Hive Metastore[^db-docs-iceberg][^db-blog-full-iceberg].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 5/5
Photon, el motor de ejecución vectorizado nativo, está habilitado por defecto en SQL Warehouses y cómputo serverless[^db-docs-photon]. La adopción a gran escala (nivel 5) se apoya en los datos corporativos del propio fabricante: más de 20.000 organizaciones, incluyendo más del 60 % de la Fortune 500[^db-pr-5-4b] (fuente del fabricante, de ahí no subir la confianza).

### DP-CAR-02 · Streaming / tiempo real · 3/5
El modo *real-time* de Structured Streaming documenta latencias extremo a extremo «tan bajas como cinco milisegundos»[^db-docs-real-time]. La página no indica el percentil ni publica un SLA p99, y tampoco declara el estado de disponibilidad (GA/preview) del modo; además se refiere a procesamiento de streams, no a consultas SQL sobre datos recién ingeridos.

### DP-CAR-03 · ML/IA y búsqueda vectorial · 4/5
Nota agregada de DP-IA-01 (funciones `ai_*` GA) y DP-IA-02 (AI Search/Vector Search con índice ANN HNSW GA)[^db-docs-ai-functions][^db-docs-ai-search]. No se ha verificado un flujo RAG completo invocable desde SQL.

### DP-CAR-04 · OLTP / Lakebase · 4/5
Tras la compra de Neon, Databricks ofrece **Lakebase**, un Postgres serverless integrado en la plataforma[^db-blog-lakebase][^db-blog-neon]. Según la documentación, Lakebase usa **almacenamiento propio** y se conecta al lakehouse mediante *synced tables* (Unity Catalog → Lakebase) y *Lakehouse Sync* (cambios de Postgres → tablas Delta), esta última en *Public Preview*[^db-docs-lakebase]. Según la documentación no existe una misma capa de almacenamiento sin sincronización para ambos motores .

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
Autoescalado horizontal automático de clústeres por SQL Warehouse, con reglas de cola documentadas (p. ej. alta de clústeres según el tiempo de carga y baja tras 15 minutos de carga reducida en warehouses *classic*/*pro*) y gestión inteligente de la carga (IWM) en serverless[^db-docs-warehouse-behavior]. Warehouses distintos aíslan la carga entre equipos. No se ha encontrado evidencia pública de concurrencia sostenida a gran escala (benchmark independiente o caso documentado).

### DP-REN-02 · Benchmarks publicados
Incluido en el *Cloud Data Warehouse Benchmark* de Fivetran (2025)[^fivetran-benchmark].

### DP-REN-03 · Escala a cero · Sí
Los SQL warehouses se detienen automáticamente tras un periodo de inactividad configurable (serverless: 10 minutos por defecto, mínimo 5 en la UI y 1 por API) y se reanudan al recibir consultas[^db-docs-warehouse-create].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
Dialecto Spark SQL con modo ANSI[^db-docs-ansi-compliance] y diferencias respecto al estándar en funciones y sintaxis habituales.

### DP-INT-02 · Conectores y ecosistema · 3/5
`dbt-databricks` está mantenido oficialmente por Databricks[^db-github-dbt-databricks], y la documentación de integraciones atesora un catálogo de herramientas de BI validadas por Partner Connect (Tableau, Power BI, Qlik Sense, ThoughtSpot, Sigma, Hex, Preset) y dbt Cloud[^db-docs-integrations].

### DP-INT-03 · Facilidad de salida de datos · 4/5
En el modo *classic*, los datos residen en formato Delta/Parquet abierto dentro del propio object store del cliente, y las tablas Iceberg gestionadas son legibles por motores externos vía la API REST[^db-docs-iceberg][^db-docs-uniform].

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
ABAC con filtros de fila y máscaras de columna basados en etiquetas gobernadas, en GA; las políticas a nivel de metastore y las `DENY` siguen en Beta[^db-docs-abac][^db-blog-abac-ga]. Nivel 4 (RBAC + ABAC + enmascaramiento dinámico). No mencionan catálogos federados ni motores externos.

### DP-GOB-02 · Linaje y auditoría · 4/5
Unity Catalog captura linaje automático hasta nivel de columna, consultable mediante tablas de sistema (`system.access.table_lineage`, `system.access.column_lineage`, retención de 1 año)[^db-docs-lineage].

### DP-GOB-03 · Certificaciones de seguridad
ISO 27001, 27017, 27018, 27701, 27036 y 22301; SOC 1 y SOC 2 Tipo II y SOC 3 (público); HIPAA y HITRUST; PCI-DSS; además FedRAMP, C5, GxP, Cyber Essentials Plus, entre otras[^db-trust-soc].

### DP-GOB-04 · Residencia de datos en la UE · N/D
El sistema de «Geos» de Databricks define en qué geografía se procesa el contenido del cliente y en qué casos puede salir de ella (`#will-my-data-be-sent-out-of-a-geo`)[^db-docs-geos][^db-trust-gdpr]. Sin embargo, la rúbrica exige obligatoriamente un compromiso contractual documentado de residencia en la región de la UE (p. ej. el DPA). Al haberse revisado únicamente documentación técnica y de confianza que no constituye una garantía contractual expresa, se asigna N/D por falta de verificación formal.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS multi-nube con plano de cómputo *classic* (en la cuenta cloud del cliente) o *serverless* (gestionado por Databricks)[^db-community-serverless].

### DP-DEP-02 · Esfuerzo operativo en self-managed · N/D
No existe un modo self-managed comparable al de un motor OSS: incluso en modo *classic*, el plano de control lo opera Databricks.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No aplica
Databricks es un servicio gestionado sin un binario del motor que el cliente instale sobre su propio Kubernetes, ya sea en modo *classic* o *serverless*[^db-community-serverless]. No se ha localizado un operador de Kubernetes mantenido oficialmente por Databricks, existe uno

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
Base de clientes documentada por el fabricante: más de 20.000 organizaciones y más de 800 clientes con más de 1 M$ de ingresos recurrentes anuales (febrero de 2026)[^db-pr-5-4b]. Empresa única; libera componentes OSS puntuales (Delta Lake, Unity Catalog OSS, MLflow) pero la plataforma no lo es[^db-blog-lakebase].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 4/5
Adaptador dbt mantenido por Databricks[^db-github-dbt-databricks], API REST de catálogo Iceberg y federación con catálogos externos[^db-docs-iceberg], y ecosistema de socios validados[^db-docs-integrations].

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
Sin fuente pública localizada en esta revisión.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
La plataforma SQL Warehouse/Lakehouse es un servicio comercial propietario, sin código fuente publicado[^db-pricing-page].

### DP-LIC-02 · Estabilidad de la licencia
No aplica en el mismo sentido que un producto OSS; Databricks sí ha liberado componentes bajo Apache-2.0 de forma creciente (Delta Lake, Unity Catalog), una tendencia estable y no restrictiva.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 4/5
Página de precios pública con el modelo DBU y listas de precios por producto/nube, más una «Cost Calculator» oficial para estimar costes de cómputo[^db-pricing-page].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
Sí: las AI Functions de SQL (`ai_query`, `ai_classify`, `ai_summarize`, `ai_translate`, `ai_extract`, `ai_gen`, etc.) figuran como GA; algunas (`ai_search`, `ai_transcribe`, `ai_predict_*`…) siguen en Beta[^db-docs-ai-functions]. La versión anterior justificaba el «Sí» con AI/BI Genie, que es una interfaz en lenguaje natural y no una función SQL; el resultado no cambia, pero la justificación sí.

### DP-IA-02 · Búsqueda vectorial nativa · 4/5
AI Search (antes Mosaic AI Vector Search) usa un índice ANN HNSW y ofrece búsqueda híbrida (BM25 + vectorial), sincronización automática con tablas Delta, y capacidad documentada de ~320 M de vectores (endpoints estándar) y más de 1.000 M (endpoints optimizados para almacenamiento)[^db-docs-ai-search].

### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap dedicado localizada en esta revisión.

[^db-docs-warehouse-behavior]: Databricks Docs, «SQL warehouse sizing, scaling, and queuing behavior» (§ Intelligent Workload Management and autoscaling), https://docs.databricks.com/aws/en/compute/sql-warehouse/warehouse-behavior#intelligent-workload-management-and-autoscaling, consultado 2026-09-30.
[^db-community-serverless]: Databricks Community, «How is Serverless Compute implemented under the hood», https://community.databricks.com/t5/administration-architecture/how-is-serverless-compute-implemented-under-the-hood/td-p/164803, consultado 2026-09-29.
[^db-docs-uniform]: Databricks Docs, «Read Delta tables with Iceberg clients (UniForm)» (§ How Iceberg reads work), https://docs.databricks.com/aws/en/delta/iceberg-reads#how-iceberg-reads-work, consultado 2026-09-30.
[^db-blog-full-iceberg]: Databricks Blog, «Announcing full Apache Iceberg support in Databricks», https://www.databricks.com/blog/announcing-full-apache-iceberg-support-databricks, consultado 2026-09-29.
[^db-docs-photon]: Databricks Docs, «What is Photon?» (§ How Photon works), https://docs.databricks.com/aws/en/compute/photon#how-photon-works, consultado 2026-09-30.
[^db-docs-real-time]: Databricks Docs, «Real-time mode concepts» (§ What is real-time mode?), https://docs.databricks.com/aws/en/structured-streaming/real-time/concepts#what-is-real-time-mode, consultado 2026-09-30.
[^db-blog-lakebase]: Databricks Blog, «A New Era of Databases: Lakebase», https://www.databricks.com/blog/what-is-a-lakebase, consultado 2026-09-29.
[^db-blog-neon]: Databricks Blog, «Databricks and Neon», https://www.databricks.com/blog/databricks-neon, consultado 2026-09-29.
[^fivetran-benchmark]: Fivetran, «Cloud Data Warehouse Benchmark», https://www.fivetran.com/blog/warehouse-benchmark, consultado 2026-09-29.
[^db-github-dbt-databricks]: Databricks (GitHub), «dbt-databricks», https://github.com/databricks/dbt-databricks, consultado 2026-09-29.
[^db-docs-abac]: Databricks Docs, «Attribute-based access control in Unity Catalog», https://docs.databricks.com/aws/en/data-governance/unity-catalog/abac/, consultado 2026-09-30.
[^db-blog-abac-ga]: Databricks Blog, «ABAC row filtering and column masking policies... are now generally available», https://www.databricks.com/blog/abac-row-filtering-and-column-masking-policies-governed-tags-and-data-classification-are-now, consultado 2026-09-29.
[^db-docs-lineage]: Databricks Docs, «Lineage in Unity Catalog» (§ Query lineage with system tables), https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage#query-lineage-with-system-tables, consultado 2026-09-30.
[^db-trust-soc]: Databricks Inc., «Databricks SOC Compliance», https://www.databricks.com/trust/compliance/soc, consultado 2026-09-29.
[^db-docs-geos]: Databricks Docs, «Databricks Geos: Data residency» (§ Will my data be sent out of a geo?), https://docs.databricks.com/aws/en/resources/databricks-geos#will-my-data-be-sent-out-of-a-geo, consultado 2026-09-30.
[^db-trust-gdpr]: Databricks Inc., «Databricks GDPR Compliance», https://www.databricks.com/trust/compliance/gdpr, consultado 2026-09-29.
[^db-pricing-page]: Databricks Inc., «Databricks Pricing», https://www.databricks.com/product/pricing, consultado 2026-09-29.
[^db-docs-iceberg]: Databricks Docs, «Use Apache Iceberg tables on Databricks» (§ Create Iceberg tables in Unity Catalog; § Access Iceberg tables using external systems), https://docs.databricks.com/aws/en/iceberg/#access-iceberg-tables-using-external-systems, consultado 2026-09-30.
[^db-docs-lakebase]: Databricks Docs, «Lakebase Postgres» (§ Key features), https://docs.databricks.com/aws/en/oltp/projects#key-features, consultado 2026-09-30.
[^db-docs-ai-functions]: Databricks Docs, «AI Functions» (§ Task-specific and general-purpose), https://docs.databricks.com/aws/en/large-language-models/ai-functions#task-specific-and-general-purpose, consultado 2026-09-30.
[^db-docs-ai-search]: Databricks Docs, «AI Search (antes Vector Search)» (§ How does AI Search work?; § Endpoint options), https://docs.databricks.com/aws/en/ai-search/ai-search#how-does-ai-search-work, consultado 2026-09-30.
[^db-docs-warehouse-create]: Databricks Docs, «Create a SQL warehouse» (§ Configure SQL warehouse settings: Auto stop), https://docs.databricks.com/aws/en/compute/sql-warehouse/create#configure-sql-warehouse-settings, consultado 2026-09-30.
[^db-docs-ansi-compliance]: Databricks Docs, «ANSI compliance in Databricks Runtime», https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-ansi-compliance, consultado 2026-09-30.
[^db-docs-integrations]: Databricks Docs, «Technology partners / Partner Connect» (§ BI and visualization), https://docs.databricks.com/aws/en/integrations/, consultado 2026-09-30.
[^db-pr-5-4b]: Databricks Inc. (PR Newswire), «Databricks Grows >65% YoY, Surpasses $5.4 Billion Revenue Run-Rate», https://www.prnewswire.com/news-releases/databricks-grows-65-yoy-surpasses-5-4-billion-revenue-run-rate-doubles-down-on-lakebase-and-genie-302682674.html, consultado 2026-09-30.
[^db-kube-operator]: Github,  «databricks-kube-operator», https://github.com/mach-kernel/databricks-kube-operator, consultado 2026-10-02.
