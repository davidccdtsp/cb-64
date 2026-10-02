# Bibliografía central

Fuentes reutilizables citadas en las fichas de candidato y en las fichas de coste, con id estable. Cada ficha las referencia por este id en sus notas al pie, siguiendo el formato de la plantilla de la sección 8 del encargo.

Jerarquía de fuentes (ver [`01-metodologia.md`](01-metodologia.md#10-reglas-de-fuentes-resumen)): (1) documentación/precios/repos/papers oficiales — **alta**; (2) benchmarks e informes independientes, blogs de ingeniería, fundaciones — **media**; (3) analistas y prensa especializada — **baja**. La columna "Jerarquía" indica en cuál se apoya cada fuente.

> Las primeras secciones documentan candidatos del Bloque A (datos). El Bloque B (MarTech) se añade en la sección final.

| id | Título | Organización / autor | URL | Fecha de consulta | Jerarquía |
|---|---|---|---|---|---|
| `ch-github-license` | LICENSE | ClickHouse Inc. (GitHub) | https://github.com/ClickHouse/ClickHouse/blob/master/LICENSE | 2026-09-29 | Alta |
| `ch-blog-apache2` | ClickHouse is Apache 2.0: Our Commitment to Open Source Licensing | Altinity (blog técnico) | https://altinity.com/blog/clickhouse-is-apache-2-0 | 2026-09-29 | Media |
| `ch-docs-pricing-overview` | Pricing — Billing overview | ClickHouse Docs (oficial) | https://clickhouse.com/docs/products/cloud/reference/billing/billing-overview | 2026-09-30 | Alta |
| `ch-pricing-page` | ClickHouse Cloud Pricing | ClickHouse Inc. (oficial) | https://clickhouse.com/pricing | 2026-09-30 | Alta |
| `ch-docs-network-transfer` | Network data transfer billing | ClickHouse Docs (oficial) | https://clickhouse.com/docs/products/cloud/reference/billing/network-data-transfer | 2026-09-30 | Alta |
| `ch-docs-rbac` | Does ClickHouse support row-level and column-level security? | ClickHouse Docs (oficial) | https://clickhouse.com/docs/resources/support-center/knowledge-base/security/row-column-policy | 2026-09-30 | Alta |
| `ch-docs-byoc-architecture` | BYOC — Architecture | ClickHouse Docs (oficial) | https://clickhouse.com/docs/products/bring-your-own-cloud/overview/architecture#architecture | 2026-09-30 | Alta |
| `ch-blog-byoc-aws` | Building ClickHouse BYOC (Bring Your Own Cloud) on AWS | ClickHouse (blog de ingeniería) | https://clickhouse.com/blog/building-clickhouse-byoc-on-aws | 2026-09-29 | Media |
| `ch-operator-github` | Altinity Kubernetes Operator for ClickHouse | Altinity (repositorio, licencia Apache-2.0) | https://github.com/altinity/clickhouse-operator | 2026-09-29 | Alta |
| `ch-docs-vector-search` | Exact and Approximate Vector Search (§ Vector Similarity Indexes) | ClickHouse Docs (oficial) | https://clickhouse.com/docs/reference/engines/table-engines/mergetree-family/annindexes#vector-similarity-index | 2026-09-30 | Alta |
| `ch-docs-datalake-directly` | Querying open table formats directly | ClickHouse Docs (oficial) | https://clickhouse.com/docs/guides/use-cases/data-warehousing/getting-started/querying-directly#iceberg-table-engine | 2026-09-30 | Alta |
| `ch-docs-deltalake-function` | deltaLake table function | ClickHouse Docs (oficial) | https://clickhouse.com/docs/reference/functions/table-functions/deltalake | 2026-09-29 | Alta |
| `ch-blog-iceberg-climbing` | Climbing the Iceberg with ClickHouse | ClickHouse (blog de ingeniería) | https://clickhouse.com/blog/climbing-the-iceberg-with-clickhouse | 2026-09-29 | Media |
| `ch-docs-compliance` | Security and compliance reports (§ SOC 2 Type II, ISO 27001, HIPAA, PCI) | ClickHouse Docs (oficial) | https://clickhouse.com/docs/products/cloud/reference/security/compliance-overview#soc-2-type-ii-since-2022 | 2026-09-30 | Alta |
| `ch-blog-soc2` | ClickHouse Cloud is now SOC 2 Type II Compliant | ClickHouse (blog corporativo) | https://clickhouse.com/blog/clickhouse-cloud-is-now-soc-2-type-ii-compliant | 2026-09-29 | Alta |
| `ch-legal-dpa` | Customer Data Processing Addendum | ClickHouse Inc. (legal, oficial) | https://clickhouse.com/legal/agreements/data-processing-addendum | 2026-09-29 | Alta |
| `ch-docs-dbt-integration` | Integrating dbt and ClickHouse | ClickHouse Docs (oficial) | https://clickhouse.com/docs/integrations/connectors/data-ingestion/etl-tools/dbt | 2026-09-30 | Alta |
| `ch-blog-dbt-platform` | ClickHouse is now available on the dbt platform | ClickHouse (blog de ingeniería) | https://clickhouse.com/blog/clickhouse-is-now-available-on-the-dbt-platform | 2026-09-29 | Media |
| `ch-blog-2025-roundup` | What's new in ClickHouse — 2025 roundup | ClickHouse (blog corporativo) | https://clickhouse.com/blog/clickhouse-2025-roundup | 2026-09-29 | Media |
| `ch-github-repo` | ClickHouse Inc. (GitHub), repositorio «ClickHouse/ClickHouse» | ClickHouse Inc. (GitHub, oficial) | https://github.com/ClickHouse/ClickHouse | 2026-09-29 | Alta |
| `clickbench` | ClickBench — a Benchmark For Analytical DBMS | ClickHouse Inc. (benchmark propio, con más de 40 sistemas comparados) | https://benchmark.clickhouse.com/ | 2026-09-29 | Media *(publicado por el propio fabricante; ver nota de conflicto de interés en la ficha del candidato)* |
| `ch-benchmarks-page` | ClickHouse benchmarks: Performance, cost & scalability compared | ClickHouse Inc. (oficial) | https://clickhouse.com/benchmarks | 2026-09-29 | Media *(mismo conflicto de interés que `clickbench`)* |
| `osi-apache2` | Apache License, Version 2.0 | Open Source Initiative | https://opensource.org/license/apache-2.0 | 2026-09-30 | Alta |
| `ch-docs-rest-catalog` | REST catalog | ClickHouse Docs (oficial) | https://clickhouse.com/docs/guides/use-cases/data-warehousing/rest-catalog#querying-rest-catalog-tables-using-clickhouse | 2026-09-30 | Alta |
| `ch-docs-kafka-engine` | Using the Kafka table engine (§ Kafka to ClickHouse) | ClickHouse Docs (oficial) | https://clickhouse.com/docs/integrations/connectors/data-ingestion/kafka/kafka-table-engine#kafka-to-clickhouse | 2026-09-30 | Alta |
| `ch-docs-sql-reference` | SQL Reference | ClickHouse Docs (oficial) | https://clickhouse.com/docs/reference/home | 2026-09-30 | Alta |
| `ch-docs-query-log` | System table: query_log | ClickHouse Docs (oficial) | https://clickhouse.com/docs/reference/system-tables/query_log#description | 2026-09-30 | Alta |
| `sf-pricing-page` | Snowflake Pricing — Pricing options | Snowflake Inc. (oficial) | https://www.snowflake.com/en/pricing-options/ | 2026-09-30 | Alta |
| `sf-docs-warehouses` | Overview of Warehouses (§ Auto-suspension and auto-resumption) | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/warehouses-overview#auto-suspension-and-auto-resumption | 2026-09-30 | Alta |
| `sf-docs-multicluster` | Multi-cluster Warehouses (§ Maximized vs. Auto-scale) | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/warehouses-multicluster#maximized-vs-auto-scale | 2026-09-30 | Alta |
| `sf-docs-ddm` | Understanding Dynamic Data Masking | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/security-column-ddm-intro#what-is-dynamic-data-masking | 2026-09-30 | Alta |
| `sf-docs-iceberg-tables` | Apache Iceberg™ tables (§ Catalog options) | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/tables-iceberg#catalog-options | 2026-09-30 | Alta |
| `sf-relnote-iceberg-writes-ga` | Apache Iceberg™ tables: Write support by using an external query engine (GA) | Snowflake Docs — release notes (oficial) | https://docs.snowflake.com/en/release-notes/2026/other/2026-05-26-tables-iceberg-query-using-external-query-engine-snowflake-horizon-writes-ga | 2026-09-29 | Alta |
| `sf-docs-compliance` | Regulatory compliance (§ Global) | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/intro-compliance#global | 2026-09-30 | Alta |
| `sf-data-sovereignty` | Snowflake's Data Sovereignty Capabilities | Snowflake Inc. (oficial) | https://www.snowflake.com/en/company/overview/data-sovereignty-europe/ | 2026-09-29 | Alta |
| `sf-docs-snowpipe-streaming` | Snowpipe Streaming (§ Why use Snowpipe Streaming) | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/snowpipe-streaming/data-load-snowpipe-streaming-overview#why-use-snowpipe-streaming | 2026-09-30 | Alta |
| `sf-docs-cortex-aisql` | Snowflake Cortex AI Functions (§ Available functions) | Snowflake Docs (oficial) | https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql#available-functions | 2026-09-30 | Alta |
| `sf-blog-cortex-analyst` | Snowflake Cortex Analyst: Evaluating Text-to-SQL Accuracy for Real-World BI | Snowflake Engineering Blog | https://www.snowflake.com/en/blog/engineering/cortex-analyst-text-to-sql-accuracy-bi/ | 2026-09-29 | Media |
| `sf-blog-polaris-open-source` | Polaris Catalog Is Now Open Source | Snowflake Blog | https://www.snowflake.com/en/blog/polaris-catalog-open-source/ | 2026-09-29 | Media |
| `sf-github-dbt-adapter` | dbt-snowflake | dbt Labs (GitHub, oficial) | https://github.com/dbt-labs/dbt-adapters/tree/main/dbt-snowflake | 2026-09-29 | Alta |
| `db-blog-neon` | Databricks and Neon | Databricks Blog | https://www.databricks.com/blog/databricks-neon | 2026-09-29 | Alta |
| `db-blog-lakebase` | A New Era of Databases: Lakebase | Databricks Blog | https://www.databricks.com/blog/what-is-a-lakebase | 2026-09-29 | Alta |
| `db-docs-photon` | What is Photon? (§ How Photon works) | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/compute/photon#how-photon-works | 2026-09-30 | Alta |
| `db-docs-warehouse-behavior` | SQL warehouse sizing, scaling, and queuing behavior (§ Intelligent Workload Management and autoscaling) | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/compute/sql-warehouse/warehouse-behavior#intelligent-workload-management-and-autoscaling | 2026-09-30 | Alta |
| `db-docs-uniform` | Read Delta tables with Iceberg clients (UniForm) (§ How Iceberg reads work) | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/delta/iceberg-reads#how-iceberg-reads-work | 2026-09-30 | Alta |
| `db-docs-abac` | Attribute-based access control in Unity Catalog | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/data-governance/unity-catalog/abac/ | 2026-09-30 | Alta |
| `db-blog-abac-ga` | ABAC row filtering and column masking policies... are now generally available | Databricks Blog | https://www.databricks.com/blog/abac-row-filtering-and-column-masking-policies-governed-tags-and-data-classification-are-now | 2026-09-29 | Alta |
| `db-trust-soc` | Databricks SOC Compliance | Databricks Inc. (oficial) | https://www.databricks.com/trust/compliance/soc | 2026-09-29 | Alta |
| `db-blog-genie-ga` | AI/BI Genie is now Generally Available | Databricks Blog | https://www.databricks.com/blog/aibi-genie-now-generally-available | 2026-09-29 | Alta |
| `db-product-vector-search` | Mosaic AI Vector Search | Databricks Inc. (oficial) | https://www.databricks.com/product/machine-learning/vector-search | 2026-09-29 | Alta |
| `db-community-serverless` | How is Serverless Compute implemented under the hood | Databricks Community (oficial, foro de Databricks) | https://community.databricks.com/t5/administration-architecture/how-is-serverless-compute-implemented-under-the-hood/td-p/164803 | 2026-09-29 | Media |
| `db-pricing-page` | Databricks Pricing | Databricks Inc. (oficial) | https://www.databricks.com/product/pricing | 2026-10-02 | Alta |
| `bq-pricing-page` | BigQuery pricing | Google Cloud (oficial) | https://cloud.google.com/bigquery/pricing | 2026-09-29 | Alta |
| `bq-docs-editions` | Understand BigQuery editions (§ Editions features) | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/editions-intro#editions_features | 2026-09-30 | Alta |
| `bq-docs-biglake-iceberg` | Use BigLake tables for Apache Iceberg in BigQuery (la URL anterior `cloud.google.com/biglake/docs/...` redirige a `/lakehouse/docs/...`) | Google Cloud Docs (oficial) | https://cloud.google.com/lakehouse/docs/biglake-iceberg-tables-in-bigquery | 2026-09-30 | Alta |
| `bq-docs-column-security` | Introduction to column-level access control (§ Column-level security workflow) | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/column-level-security-intro#column-level_security_workflow | 2026-09-30 | Alta |
| `bq-docs-row-security` | Introduction to BigQuery row-level security (§ How row-level security works) | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/row-level-security-intro#how_row-level_security_works | 2026-09-30 | Alta |
| `bq-docs-vector-search` | Introduction to embeddings and vector search (§ Search) | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/vector-search-intro#search | 2026-09-30 | Alta |
| `bq-docs-ai-generate-text` | The AI.GENERATE_TEXT function | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-generate-text | 2026-09-29 | Alta |
| `bq-docs-gemini-compliance` | Security, privacy, and compliance for Gemini in BigQuery | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/gemini-security-privacy-compliance | 2026-09-29 | Alta |
| `bq-github-dbt-bigquery` | dbt-bigquery | dbt Labs (GitHub, oficial) | https://github.com/dbt-labs/dbt-adapters/tree/main/dbt-bigquery | 2026-09-29 | Alta |
| `bq-docs-write-api` | Introduction to the BigQuery Storage Write API (§ Choose a streaming approach) | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/write-api-intro#choose_a_streaming_approach | 2026-09-30 | Alta |
| `bq-docs-standard-sql` | GoogleSQL for BigQuery | Google Cloud Docs (oficial) | https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax | 2026-09-29 | Alta |
| `rs-pricing-serverless` | Amazon Redshift Serverless pricing | AWS (oficial) | https://aws.amazon.com/redshift/pricing/ | 2026-10-02 | Alta |
| `rs-docs-iceberg` | Apache Iceberg compatibility for Amazon Redshift | AWS Docs (oficial) | https://docs.aws.amazon.com/redshift/latest/dg/iceberg-integration_overview.html | 2026-09-30 | Alta |
| `rs-blog-iceberg-write` | Getting started with Apache Iceberg write support in Amazon Redshift — Part 1 | AWS Big Data Blog | https://aws.amazon.com/blogs/big-data/getting-started-with-apache-iceberg-write-support-in-amazon-redshift-part-1/ | 2026-09-29 | Media |
| `rs-docs-rls-ddm` | Amazon Redshift security overview | AWS Docs (oficial) | https://docs.aws.amazon.com/redshift/latest/dg/c_security-overview.html | 2026-09-29 | Alta |
| `rs-whatsnew-ddm-ga` | Amazon Redshift announces general availability of Dynamic Data Masking | AWS (oficial, anuncio) | https://aws.amazon.com/about-aws/whats-new/2023/04/amazon-redshift-availability-dynamic-data-masking/ | 2026-09-30 | Alta |
| `rs-docs-streaming` | Streaming ingestion to a materialized view (§ Data flow) | AWS Docs (oficial) | https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-streaming-ingestion.html#materialized-view-streaming-ingestion-data-flow | 2026-09-30 | Alta |
| `rs-docs-compliance` | Compliance validation for Amazon Redshift | AWS Docs (oficial) | https://docs.aws.amazon.com/redshift/latest/mgmt/security-compliance.html | 2026-09-29 | Alta |
| `rs-docs-bedrock-ml` | Amazon Redshift ML integration with Amazon Bedrock | AWS Docs (oficial) | https://docs.aws.amazon.com/redshift/latest/dg/machine-learning-br.html | 2026-09-29 | Alta |
| `rs-github-dbt-redshift` | dbt-redshift | dbt Labs (GitHub, oficial) | https://github.com/dbt-labs/dbt-adapters | 2026-09-29 | Alta |
| `fab-docs-onelake-consumption` | OneLake capacity consumption example | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/onelake/onelake-capacity-consumption | 2026-09-29 | Alta |
| `fab-docs-onelake-overview` | OneLake, the unified data lake (§ One copy of data) | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview#one-copy-of-data | 2026-09-30 | Alta |
| `fab-docs-shortcuts` | Shortcut transformations (file) | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/onelake/shortcuts/transformations | 2026-09-29 | Alta |
| `fab-docs-purview-govern` | Govern your Fabric data with the OneLake catalog | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/governance/onelake-catalog-govern | 2026-09-30 | Alta |
| `fab-docs-copilot-sql` | Microsoft Copilot in the SQL Database Workload Overview | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/database/sql/copilot-sql-database | 2026-09-29 | Alta |
| `fab-trust-eudb` | Microsoft EU Data Boundary Overview | Microsoft Trust Center (oficial) | https://www.microsoft.com/en-ie/trust-center/privacy/european-data-boundary-eudb | 2026-09-29 | Alta |
| `fab-docs-realtime-intelligence` | Fabric Real-Time Intelligence documentation | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/real-time-intelligence/ | 2026-09-29 | Alta |
| `fab-docs-eventstream` | Microsoft Fabric Eventstreams Overview | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/overview | 2026-09-30 | Alta |
| `fab-docs-rls` | Row-Level Security in Fabric Data Warehouse | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/data-warehouse/row-level-security | 2026-09-30 | Alta |
| `fab-docs-security` | Secure Your Fabric Data Warehouse | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/data-warehouse/security | 2026-09-29 | Alta |
| `fab-github-dbt-fabric` | dbt-fabric | Microsoft (GitHub, oficial) | https://github.com/microsoft/dbt-fabric | 2026-09-29 | Alta |
| `fb-docs-architecture` | Architecture | Firebolt Docs (oficial) | https://docs.firebolt.io/overview/architecture-overview | 2026-09-30 | Alta |
| `fb-pricing-page` | Pricing (calculadora de motor) | Firebolt Inc. (oficial) | https://www.firebolt.io/pricing | 2026-10-02 | Alta |
| `fb-docs-vector-search` | VECTOR_SEARCH (§ Syntax; § Notes) | Firebolt Docs (oficial) | https://docs.firebolt.io/reference-sql/functions-reference/vector/vector-search#syntax | 2026-09-30 | Alta |
| `fb-iso-cert` | ISO 27001 and ISO 27018 Certification | Firebolt Inc. (oficial) | https://www.firebolt.io/iso-27001-and-iso-27018-certification | 2026-09-29 | Alta |
| `fb-github-kafka-connector` | firebolt-kafka-connector | Firebolt (GitHub, oficial) | https://github.com/firebolt-db/firebolt-kafka-connector | 2026-09-29 | Alta |
| `fb-github-dbt-adapter` | dbt-firebolt | Firebolt (GitHub, oficial) | https://github.com/firebolt-db/dbt-firebolt | 2026-09-29 | Alta |
| `fb-faq-sql-capabilities` | FAQ — What SQL capabilities does Firebolt offer? | Firebolt Inc. (oficial) | https://www.firebolt.io/faq#what-sql-capabilities-does-firebolt-offer | 2026-09-30 | Alta |
| `md-github-dbt-duckdb` | dbt-duckdb | DuckDB Labs (GitHub, oficial) | https://github.com/duckdb/dbt-duckdb | 2026-09-29 | Alta |
| `md-blog-eu-region` | MotherDuck is Landing in Europe! Announcing our EU Region | MotherDuck Blog | https://motherduck.com/blog/motherduck-in-europe/ | 2026-09-29 | Alta |
| `md-docs-architecture` | Architecture and capabilities | MotherDuck Docs (oficial) | https://motherduck.com/docs/concepts/architecture-and-capabilities/ | 2026-09-30 | Alta |
| `md-docs-hybrid-queries` | Running dual execution (or hybrid) queries | MotherDuck Docs (oficial) | https://motherduck.com/docs/key-tasks/running-hybrid-queries/ | 2026-09-29 | Alta |
| `md-pricing-page` | MotherDuck Pricing | MotherDuck Inc. (oficial) | https://motherduck.com/product/pricing/ | 2026-10-02 | Alta |
| `md-blog-business-analytics` | MotherDuck for Business Analytics: SOC 2 Type II, GDPR, and New Plan Offerings | MotherDuck Blog | https://motherduck.com/blog/introducing-motherduck-for-business-analytics/ | 2026-09-29 | Alta |
| `md-docs-ingestion` | Ingestion | MotherDuck Docs (oficial) | https://motherduck.com/docs/integrations/ingestion/ | 2026-09-29 | Alta |
| `duckdb-wikipedia` | DuckDB (licencia MIT) | Wikipedia | https://en.wikipedia.org/wiki/DuckDB | 2026-09-29 | Baja |
| `doris-github-readme` | README.md | Apache Doris (GitHub, oficial) | https://github.com/apache/doris/blob/master/README.md | 2026-09-29 | Alta |
| `doris-web-official` | Apache Doris — web oficial | Apache Software Foundation (oficial) | https://doris.apache.org/ | 2026-09-29 | Alta |
| `doris-docs-intro` | Introduction to Apache Doris (3.x) | Apache Doris Docs (oficial) | https://doris.apache.org/docs/3.x/gettingStarted/what-is-apache-doris/ | 2026-09-30 | Alta |
| `doris-docs-vector-index` | Vector Index (4.x; § Performance) | Apache Doris Docs (oficial) | https://doris.apache.org/docs/4.x/key-features/vector-index#performance | 2026-09-30 | Alta |
| `sr-blog-license-apache2` | StarRocks Is Now Under Apache License 2.0 | StarRocks Blog | https://www.starrocks.io/blog/starrocks-is-now-under-apache-license-2.0 | 2026-09-29 | Alta |
| `sr-docs-intro` | StarRocks introduction | StarRocks Docs (oficial) | https://docs.starrocks.io/docs/introduction/StarRocks_intro/ | 2026-09-30 | Alta |
| `spark-web` | Apache Spark, web oficial | Apache Software Foundation (oficial) | https://spark.apache.org/ | 2026-09-30 | Alta |
| `spark-sql-guide` | Spark SQL Programming Guide | Apache Spark Docs (oficial) | https://spark.apache.org/docs/latest/sql-programming-guide.html | 2026-09-30 | Alta |
| `dremio-github-license` | LICENSE (dremio/dremio-oss) | Dremio (GitHub, oficial) | https://github.com/dremio/dremio-oss/blob/master/LICENSE | 2026-09-29 | Alta |
| `dremio-open-source-page` | Open Source — Accelerate Data Analytics | Dremio Inc. (oficial) | https://www.dremio.com/open-source/ | 2026-09-30 | Alta |
| `dremio-blog-architecture` | Understanding Dremio's Architecture | Dremio Blog | https://www.dremio.com/blog/understanding-dremios-architecture-a-game-changing-approach-to-data-lakes-and-self-service-analytics/ | 2026-09-29 | Media |
| `druid-license-page` | License | Apache Druid (oficial) | https://druid.apache.org/licensing/ | 2026-09-29 | Alta |
| `druid-web` | Apache Druid, web oficial | Apache Software Foundation (oficial) | https://druid.apache.org/ | 2026-09-29 | Alta |
| `pinot-github-license` | LICENSE (apache/pinot) | Apache Software Foundation (GitHub, oficial) | https://github.com/apache/pinot/blob/master/LICENSE | 2026-09-29 | Alta |
| `pinot-web` | Apache Pinot — web oficial | Apache Software Foundation (oficial) | https://pinot.apache.org/ | 2026-09-29 | Alta |
| `pg-extensions-tigerdata` | Best PostgreSQL Extensions for Analytics Workloads | Tiger Data (Timescale) Blog | https://www.tigerdata.com/learn/postgresql-extensions-for-analytics | 2026-09-29 | Media |
| `timescaledb-github` | timescaledb | Timescale (GitHub, oficial) | https://github.com/timescale/timescaledb | 2026-09-29 | Alta |
| `fab-blog-compliance` | Updated Microsoft Fabric compliance offerings | Microsoft Fabric Blog (oficial) | https://blog.fabric.microsoft.com/en-us/blog/microsoft-fabric-is-now-hipaa-compliant/ | 2026-09-29 | Alta |
| `pg-license-official` | The PostgreSQL Licence | PostgreSQL Global Development Group (oficial) | https://www.postgresql.org/about/licence/ | 2026-09-30 | Alta |
| `pg-web-official` | PostgreSQL Global Development Group, web oficial | PostgreSQL Global Development Group (oficial) | https://www.postgresql.org/ | 2026-09-29 | Alta |
| `pg-docs-rls` | Row Security Policies | PostgreSQL Docs (oficial) | https://www.postgresql.org/docs/current/ddl-rowsecurity.html | 2026-09-29 | Alta |
| `cloudnativepg-official` | CloudNativePG, web oficial | CloudNativePG (oficial, sandbox CNCF) | https://cloudnative-pg.io/ | 2026-09-30 | Alta |
| `pg-docs-pgdump` | pg_dump | PostgreSQL Docs (oficial) | https://www.postgresql.org/docs/current/app-pgdump.html | 2026-09-29 | Alta |
| `pg-docs-grant` | GRANT | PostgreSQL Docs (oficial) | https://www.postgresql.org/docs/current/sql-grant.html | 2026-09-29 | Alta |
| `spark-k8s-operator-official` | Apache Spark K8s Operator (subproyecto de Spark) | Apache Spark (oficial) | https://apache.github.io/spark-kubernetes-operator/ | 2026-09-30 | Alta |
| `trino-legal` | Legal notices | Trino Docs (oficial) | https://trino.io/docs/current/appendix/legal-notices.html | 2026-09-30 | Alta |
| `trino-opa-access-control` | Open Policy Agent access control (§ Row filtering; § Column masking) | Trino Docs (oficial) | https://trino.io/docs/current/security/opa-access-control.html#row-filtering | 2026-09-30 | Alta |
| `trino-file-access-control` | File-based access control (§ Table rules) | Trino Docs (oficial) | https://trino.io/docs/current/security/file-system-access-control.html | 2026-09-30 | Alta |
| `trino-github-dbt` | dbt-trino | Starburst Data (GitHub, oficial) | https://github.com/starburstdata/dbt-trino | 2026-09-29 | Alta |
| `trino-wikipedia` | Trino (SQL query engine) | Wikipedia | https://en.wikipedia.org/wiki/Trino_(SQL_query_engine) | 2026-09-29 | Baja |
| `spark-github-dbt` | dbt-spark | dbt Labs (GitHub, oficial) | https://github.com/dbt-labs/dbt-spark | 2026-09-29 | Alta |
| `spark-wikipedia` | Apache Spark | Wikipedia | https://en.wikipedia.org/wiki/Apache_Spark | 2026-09-29 | Baja |
| `duckdb-foundation` | DuckDB Foundation, web oficial | DuckDB Foundation (oficial) | https://duckdb.foundation/ | 2026-09-29 | Alta |
| `duckdb-docs-iceberg` | Iceberg Extension (LTS) | DuckDB Docs (oficial) | https://duckdb.org/docs/lts/core_extensions/iceberg/overview#limitations | 2026-09-30 | Alta |
| `duckdb-docs-delta` | Delta Extension (LTS) | DuckDB Docs (oficial) | https://duckdb.org/docs/lts/core_extensions/delta#features | 2026-09-30 | Alta |
| `duckdb-docs-iceberg-rest` | Iceberg REST Catalogs (§ Supported operations; § Specific catalog examples) | DuckDB Docs (oficial) | https://duckdb.org/docs/lts/core_extensions/iceberg/iceberg_rest_catalogs#supported-operations | 2026-09-30 | Alta |
| `duckdb-org-100` | Announcing DuckDB 1.0.0 | DuckDB Blog (oficial) | https://duckdb.org/2024/06/03/announcing-duckdb-100 | 2026-09-30 | Alta |
| `duckdb-sigmod-paper` | DuckDB: an Embeddable Analytical Database , SIGMOD 2019 | M. Raasveldt, H. Mühleisen (SIGMOD 2019) | https://ir.cwi.nl/pub/28800/28800.pdf | 2026-09-29 | Alta |
| `duckdb-docs-sql-intro` | SQL Introduction | DuckDB Docs (oficial) | https://duckdb.org/docs/sql/introduction | 2026-09-29 | Alta |
| `duckdb-docs-export` | Export to Parquet/CSV | DuckDB Docs (oficial) | https://duckdb.org/docs/guides/file_formats/parquet_export | 2026-09-29 | Alta |
| `duckdb-docs-clients` | Client APIs Overview | DuckDB Docs (oficial) | https://duckdb.org/docs/api/overview | 2026-09-29 | Alta |
| `druid-docs-kubernetes` | Kubernetes (extensión de descubrimiento) | Apache Druid Docs (oficial) | https://druid.apache.org/docs/latest/development/extensions-core/kubernetes/ | 2026-09-30 | Alta |
| `druid-operator-github` | druid-operator (operador previo, enlazado por la documentación de Druid) | datainfrahq (GitHub, no oficial de la ASF) | https://github.com/datainfrahq/druid-operator | 2026-09-30 | Media |
| `druid-pdf-paper` | Druid: A Real-time Analytical Data Store , SIGMOD 2014 | Fangjin Yang et al. (SIGMOD 2014) | http://static.druid.io/docs/druid.pdf | 2026-09-29 | Alta |
| `druid-docs-security` | Basic Security (§ Authorizer) | Apache Druid Docs (oficial) | https://druid.apache.org/docs/latest/development/extensions-core/druid-basic-security/ | 2026-09-30 | Alta |
| `pinot-web-official` | Apache Pinot, web oficial | Apache Pinot (oficial) | https://pinot.apache.org/ | 2026-09-29 | Alta |
| `pinot-linkedin-blog` | Real-time Analytics at Massive Scale with Pinot (2015; contexto histórico, no respalda métricas actuales) | LinkedIn Engineering Blog | https://engineering.linkedin.com/analytics/real-time-analytics-massive-scale-pinot | 2026-09-29 | Media |
| `startree-rbac` | Introducing Security Manager: Role-Based Access Control (RBAC) in StarTree | StarTree Inc. (oficial) | https://startree.ai/resources/introducing-security-manager-rbac-in-startree/ | 2026-09-29 | Alta |
| `startree-cloud` | StarTree Cloud | StarTree Inc. (oficial) | https://startree.ai/products/startree-cloud/ | 2026-09-29 | Alta |
| `sf-blog-postgres-enterprise` | Delivering the Most Enterprise-Ready Postgres, Built for Snowflake | Snowflake Blog | https://www.snowflake.com/en/blog/snowflake-postgres-enterprise-ai-database/ | 2026-09-29 | Alta |
| `sf-blog-pglake` | Introducing pg_lake | Snowflake Engineering Blog | https://www.snowflake.com/en/blog/engineering/pg-lake-postgres-lakehouse-integration/ | 2026-09-29 | Alta |
| `fivetran-benchmark` | Cloud Data Warehouse Benchmark | Fivetran (informe independiente, patrocinado por un proveedor de ingesta de datos, no un fabricante de DWH) | https://www.fivetran.com/blog/warehouse-benchmark | 2026-09-29 | Media |
| `gigaom-2019-benchmark` | Data Warehouse in the Cloud Benchmark (patrocinado por Microsoft) | GigaOm (informe independiente, patrocinado por Microsoft — conflicto de interés declarado) | https://gigaom.com/report/data-warehouse-cloud-benchmark/ | 2026-09-29 | Media |
| `db-docs-real-time` | Real-time mode concepts (§ What is real-time mode?) | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/structured-streaming/real-time/concepts#what-is-real-time-mode | 2026-09-30 | Alta |
| `db-blog-full-iceberg` | Announcing full Apache Iceberg support in Databricks | Databricks Blog | https://www.databricks.com/blog/announcing-full-apache-iceberg-support-databricks | 2026-09-29 | Alta |
| `db-docs-lineage` | Lineage in Unity Catalog (§ Query lineage with system tables) | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage#query-lineage-with-system-tables | 2026-09-30 | Alta |
| `db-docs-geos` | Databricks Geos: Data residency (§ Will my data be sent out of a geo?) | Databricks Docs (oficial) | https://docs.databricks.com/aws/en/resources/databricks-geos#will-my-data-be-sent-out-of-a-geo | 2026-09-30 | Alta |
| `db-trust-gdpr` | Databricks GDPR Compliance | Databricks Inc. (oficial) | https://www.databricks.com/trust/compliance/gdpr | 2026-09-29 | Alta |
| `db-github-dbt-databricks` | dbt-databricks | Databricks (GitHub, oficial) | https://github.com/databricks/dbt-databricks | 2026-09-29 | Alta |
| `airflow-provider-postgres` | apache-airflow-providers-postgres | Apache Airflow | https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html | 2026-09-30 | Alta |
| `airflow-provider-spark` | apache-airflow-providers-apache-spark | Apache Airflow | https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html | 2026-09-30 | Alta |
| `asf-licenses` | Apache Licenses | Apache Software Foundation | https://www.apache.org/licenses/ | 2026-09-30 | Alta |
| `db-kube-operator` | Github | databricks-kube-operator | https://github.com/mach-kernel/databricks-kube-operator | 2026-10-02 | Media |
| `aws-data-privacy-faq` | Data Privacy FAQ | AWS | https://aws.amazon.com/compliance/data-privacy-faq/ | 2026-09-30 | Alta |
| `bq-docs-lakehouse-tables` | Compare table types — Lakehouse (§ Table formats by catalog or engine) | Google Cloud Docs | https://docs.cloud.google.com/lakehouse/docs/lakehouse-tables#table_formats_by_catalog_or_engine | 2026-09-30 | Alta |
| `bq-docs-lineage` | About data lineage — Knowledge Catalog (§ Lineage sources: BigQuery) | Google Cloud Docs | https://docs.cloud.google.com/knowledge-catalog/docs/about-data-lineage#auto-lineage-bq-support | 2026-09-30 | Alta |
| `bq-docs-locations` | BigQuery locations (§ Locations and regions) | Google Cloud Docs | https://docs.cloud.google.com/bigquery/docs/locations#locations_and_regions | 2026-09-30 | Alta |
| `bq-docs-quotas` | BigQuery quotas and limits (§ Write API limits) | Google Cloud Docs | https://docs.cloud.google.com/bigquery/quotas#write-api-limits | 2026-09-30 | Alta |
| `bq-docs-slots-autoscaling` | Understand slots (§ Slot autoscaling) | Google Cloud Docs | https://docs.cloud.google.com/bigquery/docs/slots#slot-autoscaling | 2026-09-30 | Alta |
| `bq-release-notes` | BigQuery release notes | Google Cloud Docs | https://docs.cloud.google.com/bigquery/docs/release-notes | 2026-09-30 | Alta |
| `ch-blog-k8s-operator` | Introducing the Official ClickHouse Kubernetes Operator | ClickHouse | https://clickhouse.com/blog/clickhouse-kubernetes-operator | 2026-09-30 | Media |
| `ch-docs-access-rights` | Access control and account management (§ Role management; § Row policy management) | ClickHouse Docs | https://clickhouse.com/docs/concepts/features/security/access-rights#role-management | 2026-09-30 | Alta |
| `ch-docs-autoscaling` | Automatic scaling (§ How scaling works in ClickHouse Cloud) | ClickHouse Docs | https://clickhouse.com/docs/products/cloud/features/autoscaling/overview#how-scaling-works-in-clickhouse-cloud | 2026-09-30 | Alta |
| `ch-docs-datalake-support-matrix` | Open table format support matrix (§ Format support; § Catalog support) | ClickHouse Docs | https://clickhouse.com/docs/guides/use-cases/data-warehousing/support-matrix#format-support | 2026-09-30 | Alta |
| `ch-docs-horizontal-autoscaling` | Horizontal autoscaling (estado Private Preview) | ClickHouse Docs | https://clickhouse.com/docs/products/cloud/features/autoscaling/horizontal-autoscaling | 2026-09-30 | Alta |
| `ch-docs-idling` | Idling (§ Automatic idling) | ClickHouse Docs | https://clickhouse.com/docs/products/cloud/features/autoscaling/idling#automatic-idling | 2026-09-30 | Alta |
| `ch-docs-integrations` | Integrations (catálogo por nivel de soporte Core/Partner/Community) | ClickHouse Docs | https://clickhouse.com/docs/integrations/home | 2026-09-30 | Alta |
| `ch-docs-k8s-operator` | ClickHouse Operator (§ Features) | ClickHouse Docs | https://clickhouse.com/docs/products/kubernetes-operator/overview#features | 2026-09-30 | Alta |
| `ch-docs-managed-postgres` | ClickHouse Managed Postgres | ClickHouse Docs | https://clickhouse.com/docs/products/managed-postgres/overview | 2026-09-30 | Alta |
| `ch-docs-mysql-interface` | MySQL Interface (§ Enabling the MySQL interface on ClickHouse Cloud) | ClickHouse Docs | https://clickhouse.com/docs/concepts/features/interfaces/mysql#enabling-the-mysql-interface-on-clickhouse-cloud | 2026-09-30 | Alta |
| `ch-docs-postgres-interface` | PostgreSQL Interface | ClickHouse Docs | https://clickhouse.com/docs/concepts/features/interfaces/postgresql | 2026-09-30 | Alta |
| `ch-docs-row-policy` | CREATE ROW POLICY | ClickHouse Docs | https://clickhouse.com/docs/reference/statements/create/row-policy#using-clause | 2026-09-30 | Alta |
| `ch-docs-warehouses` | Warehouses (compute-compute separation) | ClickHouse Docs | https://clickhouse.com/docs/products/cloud/features/infrastructure/warehouses#what-is-compute-compute-separation | 2026-09-30 | Alta |
| `ch-operator-official-github` | ClickHouse/clickhouse-operator — Official Kubernetes Operator for ClickHouse | ClickHouse Inc. (GitHub) | https://github.com/ClickHouse/clickhouse-operator | 2026-09-30 | Alta |
| `cncf-cloudnativepg` | CloudNativePG (aceptado el 21-ene-2025, nivel Sandbox) | CNCF | https://www.cncf.io/projects/cloudnativepg/ | 2026-09-30 | Alta |
| `db-docs-ai-functions` | AI Functions (§ Task-specific and general-purpose) | Databricks Docs | https://docs.databricks.com/aws/en/large-language-models/ai-functions#task-specific-and-general-purpose | 2026-09-30 | Alta |
| `db-docs-ai-search` | AI Search (antes Vector Search) (§ How does AI Search work?; § Endpoint options) | Databricks Docs | https://docs.databricks.com/aws/en/ai-search/ai-search#how-does-ai-search-work | 2026-09-30 | Alta |
| `db-docs-ansi-compliance` | ANSI compliance in Databricks Runtime | Databricks Docs | https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-ansi-compliance | 2026-09-30 | Alta |
| `db-docs-iceberg` | Use Apache Iceberg tables on Databricks (§ Create Iceberg tables in Unity Catalog; § Access Iceberg tables using external systems) | Databricks Docs | https://docs.databricks.com/aws/en/iceberg/#access-iceberg-tables-using-external-systems | 2026-09-30 | Alta |
| `db-docs-integrations` | Technology partners / Partner Connect (§ BI and visualization) | Databricks Docs | https://docs.databricks.com/aws/en/integrations/ | 2026-09-30 | Alta |
| `db-docs-lakebase` | Lakebase Postgres (§ Key features) | Databricks Docs | https://docs.databricks.com/aws/en/oltp/projects#key-features | 2026-09-30 | Alta |
| `db-docs-warehouse-create` | Create a SQL warehouse (§ Configure SQL warehouse settings: Auto stop) | Databricks Docs | https://docs.databricks.com/aws/en/compute/sql-warehouse/create#configure-sql-warehouse-settings | 2026-09-30 | Alta |
| `db-pr-5-4b` | Databricks Grows >65% YoY, Surpasses $5.4 Billion Revenue Run-Rate | Databricks Inc. (PR Newswire) | https://www.prnewswire.com/news-releases/databricks-grows-65-yoy-surpasses-5-4-billion-revenue-run-rate-doubles-down-on-lakebase-and-genie-302682674.html | 2026-09-30 | Media |
| `dbt-postgres-github` | dbt-postgres | dbt Labs (GitHub) | https://github.com/dbt-labs/dbt-adapters/tree/main/dbt-postgres | 2026-09-30 | Alta |
| `delta-docs-batch` | Table batch reads and writes (§ Query an older snapshot / time travel) | Delta Lake Docs | https://docs.delta.io/delta-batch/#query-an-older-snapshot-of-a-table-time-travel | 2026-09-30 | Alta |
| `doris-docs-audit` | Audit Log (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/admin-manual/audit-plugin | 2026-09-30 | Alta |
| `doris-docs-authz-data` | Data access control: Row Policy, Column Permission, Data Masking (4.x; § Row Policy) | Apache Doris Docs | https://doris.apache.org/docs/4.x/admin-manual/auth/authorization/data#row-policy | 2026-09-30 | Alta |
| `doris-docs-authz-internal` | Built-in authorization (RBAC) (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/admin-manual/auth/authorization/internal | 2026-09-30 | Alta |
| `doris-docs-aws` | Doris on AWS (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/install/deploy-on-cloud/doris-on-aws | 2026-09-30 | Alta |
| `doris-docs-bi-tableau` | Tableau (BI; 3.x) | Apache Doris Docs | https://doris.apache.org/docs/3.x/ecosystem/bi/tableau | 2026-09-30 | Alta |
| `doris-docs-compute-group` | Compute Group management (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/admin-manual/workload-management/compute-group | 2026-09-30 | Alta |
| `doris-docs-continuous-load` | Continuous load (streaming jobs) (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/data-operate/import/import-way/streaming-job/continuous-load-overview | 2026-09-30 | Alta |
| `doris-docs-dbt` | DBT Doris Adapter (3.x) | Apache Doris Docs | https://doris.apache.org/docs/3.x/ecosystem/dbt-doris-adapter | 2026-09-30 | Alta |
| `doris-docs-flink-connector` | Flink Doris Connector (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/connection-integration/data-integration/flink-doris-connector | 2026-09-30 | Alta |
| `doris-docs-iceberg-catalog` | Iceberg Catalog (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/lakehouse/catalogs/iceberg-catalog/ | 2026-09-30 | Alta |
| `doris-docs-lineage` | Data Lineage (4.x; § Capabilities and limitations) | Apache Doris Docs | https://doris.apache.org/docs/4.x/data-governance/data-lineage#capabilities-and-limitations | 2026-09-30 | Alta |
| `doris-docs-llm-functions` | LLM SQL Functions (4.x; § What) | Apache Doris Docs | https://doris.apache.org/docs/4.x/key-features/llm-sql-functions#what | 2026-09-30 | Alta |
| `doris-docs-mysql-proto` | MySQL protocol (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/connection-integration/mysql-proto | 2026-09-30 | Alta |
| `doris-docs-operator` | Doris Kubernetes Operator (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/ecosystem/doris-operator/doris-operator-overview | 2026-09-30 | Alta |
| `doris-docs-outfile` | SELECT INTO OUTFILE (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/data-operate/export/outfile/ | 2026-09-30 | Alta |
| `doris-docs-resource-group` | Resource Group (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/admin-manual/workload-management/resource-group | 2026-09-30 | Alta |
| `doris-docs-routine-load` | Routine Load (4.x) | Apache Doris Docs | https://doris.apache.org/docs/4.x/data-operate/import/import-way/routine-load-manual | 2026-09-30 | Alta |
| `doris-operator-github` | apache/doris-operator (Apache-2.0) | Apache Doris (GitHub) | https://github.com/apache/doris-operator | 2026-09-30 | Alta |
| `dremio-dockerhub` | dremio/dremio-oss (Community Edition; última actualización 10-sep-2025) | Docker Hub | https://hub.docker.com/r/dremio/dremio-oss | 2026-09-30 | Alta |
| `dremio-docs-architecture` | Architecture (Enterprise) | Dremio Docs | https://docs.dremio.com/current/what-is-dremio/architecture/ | 2026-09-30 | Alta |
| `dremio-docs-autoingest` | Auto-ingestion | Dremio Docs | https://docs.dremio.com/current/load-data/autoingestion/ | 2026-09-30 | Alta |
| `dremio-docs-ce` | Community Edition on Docker | Dremio Docs | https://docs.dremio.com/current/get-started/docker/ | 2026-09-30 | Alta |
| `dremio-docs-client-apps` | Client applications | Dremio Docs | https://docs.dremio.com/dremio-cloud/explore-analyze/client-apps/ | 2026-09-30 | Alta |
| `dremio-docs-compliance` | Compliance (§ SOC 2 Type II; § ISO 27001) | Dremio Docs | https://docs.dremio.com/dremio-cloud/security/compliance/#soc-2-type-ii-report | 2026-09-30 | Alta |
| `dremio-docs-concepts` | Concepts (proyectos, almacenamiento, catálogo) | Dremio Docs | https://docs.dremio.com/dremio-cloud/about/concepts/ | 2026-09-30 | Alta |
| `dremio-docs-connect` | Connect data sources (catálogos Iceberg) | Dremio Docs | https://docs.dremio.com/dremio-cloud/bring-data/connect/ | 2026-09-30 | Alta |
| `dremio-docs-data-formats` | Data formats (Iceberg, Delta Lake, Parquet) | Dremio Docs | https://docs.dremio.com/dremio-cloud/developer/data-formats/ | 2026-09-30 | Alta |
| `dremio-docs-dbt` | dbt | Dremio Docs | https://docs.dremio.com/dremio-cloud/developer/dbt/ | 2026-09-30 | Alta |
| `dremio-docs-engines` | Engines (§ Autoscaling) | Dremio Docs | https://docs.dremio.com/dremio-cloud/admin/engines/#autoscaling | 2026-09-30 | Alta |
| `dremio-docs-information-schema` | Information schema | Dremio Docs | https://docs.dremio.com/dremio-cloud/sql/information-schema/ | 2026-09-30 | Alta |
| `dremio-docs-k8s` | Deploy Dremio on Kubernetes (Enterprise) | Dremio Docs | https://docs.dremio.com/current/deploy-dremio/deploy-on-kubernetes/ | 2026-09-30 | Alta |
| `dremio-docs-lineage` | Lineage | Dremio Docs | https://docs.dremio.com/dremio-cloud/manage-govern/lineage/ | 2026-09-30 | Alta |
| `dremio-docs-model-providers` | Configure model providers | Dremio Docs | https://docs.dremio.com/dremio-cloud/admin/model-providers/ | 2026-09-30 | Alta |
| `dremio-docs-monitor` | Monitoring (auditoría de eventos) | Dremio Docs | https://docs.dremio.com/dremio-cloud/admin/monitor/ | 2026-09-30 | Alta |
| `dremio-docs-open-catalog` | Open Catalog (Apache Polaris) | Dremio Docs | https://docs.dremio.com/current/data-sources/open-catalog/ | 2026-09-30 | Alta |
| `dremio-docs-privileges` | Privileges (§ Key concepts) | Dremio Docs | https://docs.dremio.com/dremio-cloud/security/privileges/#key-concepts | 2026-09-30 | Alta |
| `dremio-docs-row-column` | Row-access and column-masking policies (§ Column masking policies) | Dremio Docs | https://docs.dremio.com/dremio-cloud/manage-govern/row-column-policies/#column-masking-policies | 2026-09-30 | Alta |
| `dremio-docs-sql-commands` | SQL commands | Dremio Docs | https://docs.dremio.com/dremio-cloud/sql/commands/ | 2026-09-30 | Alta |
| `dremio-docs-sql-functions` | SQL functions | Dremio Docs | https://docs.dremio.com/dremio-cloud/sql/sql-functions/ | 2026-09-30 | Alta |
| `dremio-docs-usage` | Subscription & usage (DCU) | Dremio Docs | https://docs.dremio.com/dremio-cloud/admin/subscription/usage/ | 2026-09-30 | Alta |
| `dremio-oss-github-api` | dremio/dremio-oss (último push 26-sep-2025; 7 contribuidores; última release 26.0.5) | GitHub API | https://api.github.com/repos/dremio/dremio-oss | 2026-09-30 | Alta |
| `dremio-pricing` | Pricing | Dremio Inc. | https://www.dremio.com/pricing/ | 2026-10-02 | Alta |
| `druid-docs-architecture` | Design / Architecture (§ Druid services; § Deep storage) | Apache Druid Docs | https://druid.apache.org/docs/latest/design/architecture/ | 2026-09-30 | Alta |
| `druid-docs-delta` | Delta Lake extension (contrib) | Apache Druid Docs | https://druid.apache.org/docs/latest/development/extensions-contrib/delta-lake | 2026-09-30 | Alta |
| `druid-docs-iceberg` | Iceberg extension (contrib; § Iceberg ingest extension) | Apache Druid Docs | https://druid.apache.org/docs/latest/development/extensions-contrib/iceberg/#iceberg-ingest-extension | 2026-09-30 | Alta |
| `druid-docs-joins` | Joins | Apache Druid Docs | https://druid.apache.org/docs/latest/querying/joins/ | 2026-09-30 | Alta |
| `druid-docs-kafka` | Apache Kafka ingestion | Apache Druid Docs | https://druid.apache.org/docs/latest/ingestion/kafka-ingestion/ | 2026-09-30 | Alta |
| `druid-docs-kubernetes-ops` | Kubernetes (operaciones) | Apache Druid Docs | https://druid.apache.org/docs/latest/operations/kubernetes/ | 2026-09-30 | Alta |
| `druid-docs-ranger` | Apache Ranger Security (extensión contrib) | Apache Druid Docs | https://druid.apache.org/docs/latest/development/extensions-contrib/druid-ranger-security | 2026-09-30 | Alta |
| `druid-docs-sql` | Druid SQL overview (§ Syntax) | Apache Druid Docs | https://druid.apache.org/docs/latest/querying/sql/#syntax | 2026-09-30 | Alta |
| `druid-operator-apache` | apache/druid-operator (Apache-2.0) | Apache Druid (GitHub) | https://github.com/apache/druid-operator | 2026-09-30 | Alta |
| `duckdb-blog-delta-writes` | Delta Grows Up: Writes, Unity Catalog and Time Travel (7-may-2026) | DuckDB Blog | https://duckdb.org/2026/05/07/delta-uc-updates#building-up-the-delta-lake-writes | 2026-09-30 | Media |
| `duckdb-blog-quack` | Quack: The DuckDB Client-Server Protocol (12-may-2026) | DuckDB Blog | https://duckdb.org/2026/05/12/quack-remote-protocol | 2026-09-30 | Media |
| `duckdb-docs-concurrency` | Concurrency (§ Handling concurrency) | DuckDB Docs | https://duckdb.org/docs/current/connect/concurrency#handling-concurrency | 2026-09-30 | Alta |
| `duckdb-docs-core-extensions` | Core Extensions (LTS) | DuckDB Docs | https://duckdb.org/docs/lts/core_extensions/overview | 2026-09-30 | Alta |
| `duckdb-docs-vss` | Vector Similarity Search Extension (§ Persistence) | DuckDB Docs | https://duckdb.org/docs/lts/core_extensions/vss#persistence | 2026-09-30 | Alta |
| `duckdb-github-license` | LICENSE | DuckDB (GitHub) | https://github.com/duckdb/duckdb/blob/main/LICENSE | 2026-09-30 | Alta |
| `fab-blog-diskann-preview` | Public preview of vector indexing in Azure SQL DB, Azure SQL MI, and SQL database in Microsoft Fabric | Microsoft Azure SQL Dev Corner | https://devblogs.microsoft.com/azure-sql/public-preview-of-vector-indexing-in-azure-sql-db-azure-sql-mi-and-sql-database-in-microsoft-fabric/ | 2026-09-30 | Media |
| `fab-docs-ai-functions` | AI Functions in Microsoft Fabric | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/data-science/ai-functions/overview | 2026-09-30 | Alta |
| `fab-docs-ddm` | Dynamic data masking in Fabric Data Warehouse | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/data-warehouse/dynamic-data-masking | 2026-09-30 | Alta |
| `fab-docs-dw-overview` | What is Fabric Data Warehouse? | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/data-warehouse/data-warehousing | 2026-09-30 | Alta |
| `fab-docs-eudb` | What is the EU Data Boundary? (§ Customer data) | Microsoft Learn | https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn#customer-data | 2026-09-30 | Alta |
| `fab-docs-eventhouse` | Eventhouse overview | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/real-time-intelligence/eventhouse | 2026-09-30 | Alta |
| `fab-docs-iceberg` | Use Iceberg tables with OneLake (§ Virtualize Delta Lake tables as Iceberg) | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/onelake/onelake-iceberg-tables#virtualize-delta-lake-tables-as-iceberg | 2026-09-30 | Alta |
| `fab-docs-lineage` | Lineage in Fabric (§ What do you see in lineage view) | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/governance/lineage#what-do-you-see-in-lineage-view | 2026-09-30 | Alta |
| `fab-docs-mirroring-databricks` | Mirroring Azure Databricks Unity Catalog | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/mirroring/azure-databricks | 2026-09-30 | Alta |
| `fab-docs-onelake-security` | OneLake security (plano de datos) | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/onelake/security/get-started-security | 2026-09-30 | Alta |
| `fab-docs-onelake-shortcuts` | OneLake shortcuts (§ What are shortcuts) | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts#what-are-shortcuts | 2026-09-30 | Alta |
| `fab-docs-pause-resume` | Pause and resume your Fabric capacity | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/enterprise/pause-resume | 2026-09-30 | Alta |
| `fab-docs-sqldb-overview` | SQL database in Microsoft Fabric (§ Why use SQL database in Fabric) | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/database/sql/overview#why-use-sql-database-in-fabric | 2026-09-30 | Alta |
| `fab-docs-tsql-surface` | T-SQL surface area in Fabric Data Warehouse (§ Limitations) | Microsoft Learn | https://learn.microsoft.com/en-us/fabric/data-warehouse/tsql-surface-area#limitations | 2026-09-30 | Alta |
| `fab-pricing-page` | Microsoft Fabric pricing | Microsoft Azure | https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/ | 2026-09-30 | Alta |
| `fb-blog-core` | Introducing Firebolt Core — Self-Hosted Firebolt, For Free, Forever (24-jun-2025) | Firebolt Blog | https://www.firebolt.io/blog/introducing-firebolt-core | 2026-09-30 | Media |
| `fb-blog-postgres-compliant` | Making a Query Engine Postgres Compliant — Part I: Functions | Firebolt Blog | https://www.firebolt.io/blog/making-a-query-engine-postgres-compliant-part-i-functions | 2026-09-30 | Media |
| `fb-core-license` | firebolt-core — LICENSE.md (Elastic License 2.0) | Firebolt (GitHub) | https://github.com/firebolt-db/firebolt-core/blob/main/LICENSE.md | 2026-09-30 | Alta |
| `fb-docs-ai-query` | AI_QUERY | Firebolt Docs | https://docs.firebolt.io/reference-sql/functions-reference/ai/ai-query | 2026-09-30 | Alta |
| `fb-docs-autoscaling` | Understanding Autoscaling (§ Auto-scaling metrics) | Firebolt Docs | https://docs.firebolt.io/managed-service/operate-engines/understand-autoscaling#auto-scaling-metrics | 2026-09-30 | Alta |
| `fb-docs-billing` | Pricing and billing (§ Fully managed pricing model) | Firebolt Docs | https://docs.firebolt.io/managed-service/billing#fully-managed-pricing-model | 2026-09-30 | Alta |
| `fb-docs-create-engine` | CREATE ENGINE (§ Options) | Firebolt Docs | https://docs.firebolt.io/reference-sql/commands/engines/create-engine#options | 2026-09-30 | Alta |
| `fb-docs-export` | Export data (§ Choose the right export format) | Firebolt Docs | https://docs.firebolt.io/guides/exporting-data#choose-the-right-export-format | 2026-09-30 | Alta |
| `fb-docs-iceberg` | Iceberg (§ Supported features and limitations) | Firebolt Docs | https://docs.firebolt.io/guides/iceberg-and-data-lake/iceberg#supported-features-and-limitations | 2026-09-30 | Alta |
| `fb-docs-rbac` | Role-Based Access Control (§ Key object types) | Firebolt Docs | https://docs.firebolt.io/security/rbac#key-object-types | 2026-09-30 | Alta |
| `fb-docs-regions` | Available regions | Firebolt Docs | https://docs.firebolt.io/managed-service/available-regions | 2026-09-30 | Alta |
| `fb-docs-secure-views` | Using secure views (§ Row-level security) | Firebolt Docs | https://docs.firebolt.io/security/guides/rbac-views-security#row-level-security | 2026-09-30 | Alta |
| `fb-github-operator` | firebolt-kubernetes-operator (Apache-2.0) | Firebolt (GitHub) | https://github.com/firebolt-db/firebolt-kubernetes-operator | 2026-09-30 | Alta |
| `fb-security` | Security | Firebolt Inc. | https://www.firebolt.io/security | 2026-09-30 | Alta |
| `github-doris-api` | apache/doris (estrellas, forks, contribuidores) | GitHub API | https://api.github.com/repos/apache/doris | 2026-09-30 | Alta |
| `github-druid-api` | apache/druid (estrellas, forks, contribuidores) | GitHub API | https://api.github.com/repos/apache/druid | 2026-09-30 | Alta |
| `github-pinot-api` | apache/pinot (estrellas, forks, contribuidores) | GitHub API | https://api.github.com/repos/apache/pinot | 2026-09-30 | Alta |
| `github-spark-contributors` | apache/spark (estrellas, forks y contribuidores) | GitHub API | https://api.github.com/repos/apache/spark | 2026-09-30 | Alta |
| `github-starrocks-api` | StarRocks/starrocks (estrellas, forks, contribuidores) | GitHub API | https://api.github.com/repos/StarRocks/starrocks | 2026-09-30 | Alta |
| `github-trino-api` | trinodb/trino (estrellas, forks, contribuidores, licencia) | GitHub API | https://api.github.com/repos/trinodb/trino | 2026-09-30 | Alta |
| `iceberg-docs-spark-config` | Spark Configuration (§ Catalogs) | Apache Iceberg Docs | https://iceberg.apache.org/docs/latest/spark-configuration/#catalogs | 2026-09-30 | Alta |
| `iceberg-docs-spark-queries` | Spark Queries (§ Time travel queries with SQL) | Apache Iceberg Docs | https://iceberg.apache.org/docs/latest/spark-queries/#time-travel-queries-with-sql | 2026-09-30 | Alta |
| `iceberg-docs-spark-writes` | Spark Writes (§ MERGE INTO) | Apache Iceberg Docs | https://iceberg.apache.org/docs/latest/spark-writes/#merge-into | 2026-09-30 | Alta |
| `md-docs-ai-functions` | AI functions reference (PROMPT, EMBEDDING) | MotherDuck Docs | https://motherduck.com/docs/sql-reference/motherduck-sql-reference/ai-functions/ | 2026-09-30 | Alta |
| `md-docs-airflow` | Airflow | MotherDuck Docs | https://motherduck.com/docs/integrations/orchestration/airflow/ | 2026-09-30 | Alta |
| `md-docs-delta` | Delta Lake | MotherDuck Docs | https://motherduck.com/docs/integrations/file-formats/delta-lake/ | 2026-09-30 | Alta |
| `md-docs-ducklake` | DuckLake (estado Preview) | MotherDuck Docs | https://motherduck.com/docs/concepts/ducklake/ | 2026-09-30 | Alta |
| `md-docs-iceberg` | Apache Iceberg (§ Persisted Iceberg catalogs) | MotherDuck Docs | https://motherduck.com/docs/integrations/file-formats/apache-iceberg/ | 2026-09-30 | Alta |
| `md-docs-postgres-endpoint` | Postgres endpoint (estado Preview) | MotherDuck Docs | https://motherduck.com/docs/getting-started/interfaces/postgres-endpoint/ | 2026-09-30 | Alta |
| `md-docs-rbac` | Role-based access control (RBAC) (§ How roles work) | MotherDuck Docs | https://motherduck.com/docs/concepts/roles-and-access-control/ | 2026-09-30 | Alta |
| `md-docs-read-scaling` | Read Scaling (§ Configuring a read scaling duckling pool) | MotherDuck Docs | https://motherduck.com/docs/key-tasks/authenticating-and-connecting-to-motherduck/read-scaling/ | 2026-09-30 | Alta |
| `md-docs-regions` | Cloud regions (§ Available regions) | MotherDuck Docs | https://motherduck.com/docs/about-motherduck/cloud-regions/ | 2026-09-30 | Alta |
| `md-docs-scaling-patterns` | Workload scaling patterns (§ How MotherDuck scales per workload) | MotherDuck Docs | https://motherduck.com/docs/concepts/scaling-patterns/ | 2026-09-30 | Alta |
| `md-docs-security` | Security and compliance (§ Data encryption) | MotherDuck Docs | https://motherduck.com/docs/concepts/security/ | 2026-09-30 | Alta |
| `osi-mit` | The MIT License | Open Source Initiative | https://opensource.org/license/mit | 2026-09-30 | Alta |
| `pg-contributors` | Contributor Profiles | PostgreSQL | https://www.postgresql.org/community/contributors/ | 2026-09-30 | Alta |
| `pg-docs-conformance` | SQL Conformance (§ Supported features) | PostgreSQL Docs | https://www.postgresql.org/docs/current/features.html | 2026-09-30 | Alta |
| `pg-docs-planner` | Planner/Optimizer | PostgreSQL Docs | https://www.postgresql.org/docs/current/planner-optimizer.html | 2026-09-30 | Alta |
| `pg-docs-protocol` | Frontend/Backend Protocol | PostgreSQL Docs | https://www.postgresql.org/docs/current/protocol.html | 2026-09-30 | Alta |
| `pg-versioning` | Versioning Policy | PostgreSQL | https://www.postgresql.org/support/versioning/ | 2026-09-30 | Alta |
| `pgaudit-github` | PostgreSQL Audit Extension | pgaudit (GitHub) | https://github.com/pgaudit/pgaudit | 2026-09-30 | Alta |
| `pgduckdb-github` | pg_duckdb | DuckDB (GitHub) | https://github.com/duckdb/pg_duckdb | 2026-09-30 | Alta |
| `pglake-github` | pg_lake: Postgres for Iceberg and Data lakes (Apache-2.0) | Snowflake-Labs (GitHub) | https://github.com/Snowflake-Labs/pg_lake | 2026-09-30 | Alta |
| `pgvector-github` | pgvector: open-source vector similarity search for Postgres | pgvector (GitHub) | https://github.com/pgvector/pgvector | 2026-09-30 | Alta |
| `phoenix-pricing` | Pricing | PhoenixAI (antes CelerData) | https://phoenixdata.ai/pricing | 2026-09-30 | Alta |
| `phoenix-rebrand` | CelerData Rebrands as PhoenixAI, Introduces Analytical Engine Designed for AI Agents | Database Trends and Applications | https://www.dbta.com/Editorial/News-Flashes/CelerData-Rebrands-as-PhoenixAI-Introduces-Analytical-Engine-Designed-for-AI-Agents-174972.aspx | 2026-09-30 | Baja |
| `pinot-docs-access-control` | Access control (§ Row-Level Security, desde 1.4.0) | Apache Pinot Docs | https://docs.pinot.apache.org/operate-pinot/security/access-control#row-level-security-rls | 2026-09-30 | Alta |
| `pinot-docs-audit` | Audit logging (desde 1.5.0; § How it works) | Apache Pinot Docs | https://docs.pinot.apache.org/operate-pinot/security/audit-logging#how-it-works | 2026-09-30 | Alta |
| `pinot-docs-bi-tools` | BI tools (Superset, Tableau, Metabase) | Apache Pinot Docs | https://docs.pinot.apache.org/build-with-pinot/connectors-clients-apis/bi-tools | 2026-09-30 | Alta |
| `pinot-docs-deep-store` | Deep Store (§ How do segments get into the deep store?) | Apache Pinot Docs | https://docs.pinot.apache.org/architecture-and-concepts/components/table/segment/deep-store#how-do-segments-get-into-the-deep-store | 2026-09-30 | Alta |
| `pinot-docs-jdbc` | JDBC client | Apache Pinot Docs | https://docs.pinot.apache.org/build-with-pinot/connectors-clients-apis/client-libraries/jdbc | 2026-09-30 | Alta |
| `pinot-docs-kubernetes` | Kubernetes (Helm) | Apache Pinot Docs | https://docs.pinot.apache.org/start-here/install/kubernetes | 2026-09-30 | Alta |
| `pinot-docs-mse` | Multi-Stage Query | Apache Pinot Docs | https://docs.pinot.apache.org/build-with-pinot/querying-and-sql/multi-stage-query | 2026-09-30 | Alta |
| `pinot-docs-query-quotas` | Query Quotas | Apache Pinot Docs | https://docs.pinot.apache.org/build-with-pinot/querying-and-sql/query-execution-controls/query-quotas | 2026-09-30 | Alta |
| `pinot-docs-stream-ingestion` | Stream ingestion | Apache Pinot Docs | https://docs.pinot.apache.org/build-with-pinot/ingestion/stream-ingestion/stream-ingestion | 2026-09-30 | Alta |
| `pinot-docs-tenant` | Tenant (§ Tenant configuration) | Apache Pinot Docs | https://docs.pinot.apache.org/architecture-and-concepts/components/cluster/tenant#tenant-configuration | 2026-09-30 | Alta |
| `pinot-docs-vector-index` | Vector index (§ Overview) | Apache Pinot Docs | https://docs.pinot.apache.org/build-with-pinot/indexing/vector-index#overview | 2026-09-30 | Alta |
| `rs-docs-architecture` | Amazon Redshift system architecture | AWS Docs | https://docs.aws.amazon.com/redshift/latest/dg/c_redshift_system_overview.html | 2026-09-30 | Alta |
| `rs-docs-audit` | Database audit logging (§ Audit logs) | AWS Docs | https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing.html#db-auditing-logs | 2026-09-30 | Alta |
| `rs-docs-concurrency-scaling` | Concurrency scaling (§ Capabilities; § Limitations) | AWS Docs | https://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html#concurrency-scaling-capabilities | 2026-09-30 | Alta |
| `rs-docs-datashare` | Data sharing in Amazon Redshift (§ Use cases) | AWS Docs | https://docs.aws.amazon.com/redshift/latest/dg/datashare-overview.html#use_cases | 2026-09-30 | Alta |
| `rs-docs-ddm` | Dynamic data masking | AWS Docs | https://docs.aws.amazon.com/redshift/latest/dg/t_ddm.html | 2026-09-30 | Alta |
| `rs-docs-postgres-differences` | Amazon Redshift and PostgreSQL | AWS Docs | https://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html | 2026-09-30 | Alta |
| `rs-docs-rls` | Row-level security | AWS Docs | https://docs.aws.amazon.com/redshift/latest/dg/t_rls.html | 2026-09-30 | Alta |
| `rs-docs-zero-etl` | Zero-ETL integrations | AWS Docs | https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.html | 2026-09-30 | Alta |
| `sf-docs-cortex-search` | Cortex Search (§ Overview) | Snowflake Docs | https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview#overview | 2026-09-30 | Alta |
| `sf-docs-data-transfer-cost` | Understanding data transfer cost | Snowflake Docs | https://docs.snowflake.com/en/user-guide/cost-understanding-data-transfer | 2026-09-30 | Alta |
| `sf-docs-ecosystem` | Ecosystem | Snowflake Docs | https://docs.snowflake.com/en/user-guide/ecosystem | 2026-09-30 | Alta |
| `sf-docs-lineage` | Data lineage (§ Column lineage; § Retrieve lineage programmatically) | Snowflake Docs | https://docs.snowflake.com/en/user-guide/ui-snowsight-lineage#column-lineage | 2026-09-30 | Alta |
| `sf-docs-row-access` | Understanding row access policies | Snowflake Docs | https://docs.snowflake.com/en/user-guide/security-row-intro#what-is-row-level-security | 2026-09-30 | Alta |
| `sf-docs-scripting` | Snowflake Scripting Developer Guide | Snowflake Docs | https://docs.snowflake.com/en/developer-guide/snowflake-scripting/index | 2026-09-30 | Alta |
| `sf-docs-sql-reference` | SQL command reference | Snowflake Docs | https://docs.snowflake.com/en/sql-reference-commands | 2026-09-30 | Alta |
| `sf-docs-tag-policies` | Column-level Security (masking basado en etiquetas, políticas de agregación y de proyección) | Snowflake Docs | https://docs.snowflake.com/en/user-guide/security-column-intro | 2026-09-30 | Alta |
| `sf-docs-unload` | Overview of data unloading (§ Bulk unloading process) | Snowflake Docs | https://docs.snowflake.com/en/user-guide/data-unload-overview#bulk-unloading-process | 2026-09-30 | Alta |
| `sf-docs-vector-embeddings` | Vector embeddings (§ About vector similarity functions) | Snowflake Docs | https://docs.snowflake.com/en/user-guide/snowflake-cortex/vector-embeddings#about-vector-similarity-functions | 2026-09-30 | Alta |
| `sf-pricing-calculator` | Snowflake Pricing Calculator | Snowflake Inc. | https://www.snowflake.com/en/pricing-options/calculator/ | 2026-09-30 | Alta |
| `sf-relnote-postgres-catalog-ga` | Jul 14, 2026: Catalog integration for Snowflake Postgres (General availability) | Snowflake Docs (release notes) | https://docs.snowflake.com/en/release-notes/2026/other/2026-07-14-snowflake-postgres-catalog-integration-ga | 2026-09-30 | Alta |
| `sf-relnote-postgres-ga` | Feb 24, 2026: Snowflake Postgres (General availability) | Snowflake Docs (release notes) | https://docs.snowflake.com/en/release-notes/2026/other/2026-02-24-snowflake-postgres-ga | 2026-09-30 | Alta |
| `sf-sec-fy26q4` | Resultados del cuarto trimestre y ejercicio fiscal 2026 | Snowflake Inc. (SEC, Form 8-K) | https://www.sec.gov/Archives/edgar/data/1640147/000162828026011631/fy2026q4earnings.htm | 2026-09-30 | Alta |
| `spark-docs-ansi` | ANSI Compliance | Apache Spark Docs | https://spark.apache.org/docs/latest/sql-ref-ansi-compliance.html | 2026-09-30 | Alta |
| `spark-docs-job-scheduling` | Job Scheduling (§ Dynamic Resource Allocation) | Apache Spark Docs | https://spark.apache.org/docs/latest/job-scheduling.html#dynamic-resource-allocation | 2026-09-30 | Alta |
| `spark-docs-k8s` | Running Spark on Kubernetes (§ Cluster mode) | Apache Spark Docs | https://spark.apache.org/docs/latest/running-on-kubernetes.html#cluster-mode | 2026-09-30 | Alta |
| `spark-docs-security` | Security (§ Authentication and authorization; § Spark History Server ACLs) | Apache Spark Docs | https://spark.apache.org/docs/latest/security.html#authentication-and-authorization | 2026-09-30 | Alta |
| `spark-docs-structured-streaming` | Structured Streaming Programming Guide | Apache Spark Docs | https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html | 2026-09-30 | Alta |
| `spark-docs-thrift` | Distributed SQL Engine (§ Running the Thrift JDBC/ODBC server) | Apache Spark Docs | https://spark.apache.org/docs/latest/sql-distributed-sql-engine.html#running-the-thrift-jdbcodbc-server | 2026-09-30 | Alta |
| `spark-github-license` | LICENSE | Apache Spark (GitHub) | https://github.com/apache/spark/blob/master/LICENSE | 2026-09-30 | Alta |
| `sr-docs-audit-loader` | Manage audit logs within StarRocks via AuditLoader | StarRocks Docs | https://docs.starrocks.io/docs/administration/management/audit_loader/ | 2026-09-30 | Alta |
| `sr-docs-dbt` | dbt | StarRocks Docs | https://docs.starrocks.io/docs/integrations/dbt/ | 2026-09-30 | Alta |
| `sr-docs-iceberg-dml` | Iceberg catalog — DML (§ INSERT) | StarRocks Docs | https://docs.starrocks.io/docs/data_source/catalog/iceberg/DML/#insert | 2026-09-30 | Alta |
| `sr-docs-iceberg-timetravel` | Time Travel with Iceberg Catalog | StarRocks Docs | https://docs.starrocks.io/docs/data_source/catalog/iceberg/iceberg_timetravel/ | 2026-09-30 | Alta |
| `sr-docs-intro-md` | StarRocks introduction (texto: compatibilidad con el protocolo MySQL) | StarRocks Docs | https://docs.starrocks.io/docs/introduction/StarRocks_intro/ | 2026-09-30 | Alta |
| `sr-docs-maturity` | Beta and experimental features | StarRocks Docs | https://docs.starrocks.io/docs/introduction/maturity/#beta-features | 2026-09-30 | Alta |
| `sr-docs-operator` | StarRocks Kubernetes Operator (§ How it works) | StarRocks Docs | https://docs.starrocks.io/docs/deployment/sr_operator/#how-it-works | 2026-09-30 | Alta |
| `sr-docs-privileges` | Manage user privileges | StarRocks Docs | https://docs.starrocks.io/docs/administration/user_privs/authorization/User_privilege/ | 2026-09-30 | Alta |
| `sr-docs-ranger` | Manage permissions with Apache Ranger (§ Permission control method) | StarRocks Docs | https://docs.starrocks.io/docs/administration/user_privs/authorization/ranger_plugin/#permission-control-method | 2026-09-30 | Alta |
| `sr-docs-routine-load` | Continuously load data from Apache Kafka (Routine Load) | StarRocks Docs | https://docs.starrocks.io/docs/loading/kafka/RoutineLoad/ | 2026-09-30 | Alta |
| `sr-docs-shared-data` | Feature support: shared-data clusters (§ Overview) | StarRocks Docs | https://docs.starrocks.io/docs/deployment/feature-support-shared-data/#overview | 2026-09-30 | Alta |
| `sr-docs-tpcds` | TPC-DS Benchmarking (benchmark del propio proyecto) | StarRocks Docs | https://docs.starrocks.io/docs/benchmarking/TPC_DS_Benchmark/ | 2026-09-30 | Alta |
| `sr-docs-unified-catalog` | Unified catalog | StarRocks Docs | https://docs.starrocks.io/docs/data_source/catalog/unified_catalog/ | 2026-09-30 | Alta |
| `sr-docs-unloading` | Unloading (exportación de datos) | StarRocks Docs | https://docs.starrocks.io/docs/unloading/ | 2026-09-30 | Alta |
| `sr-docs-vector-index` | Vector Index (estado Beta; § Overview) | StarRocks Docs | https://docs.starrocks.io/docs/table_design/indexes/vector_index/#overview | 2026-09-30 | Alta |
| `sr-llms` | StarRocks Docs, índice de documentación (llms.txt) | StarRocks Docs, índice de documentación (llms.txt) | https://docs.starrocks.io/llms.txt | 2026-09-30 | Alta |
| `sr-operator-github` | starrocks-kubernetes-operator | StarRocks (GitHub) | https://github.com/StarRocks/starrocks-kubernetes-operator | 2026-09-30 | Alta |
| `sr-web` | StarRocks, web oficial (licencia Apache-2.0; Linux Foundation) | StarRocks, web oficial (licencia Apache-2.0; Linux Foundation) | https://www.starrocks.io/ | 2026-09-30 | Alta |
| `starburst-pricing` | Starburst Galaxy pricing | Starburst Data | https://www.starburst.io/pricing/ | 2026-09-30 | Alta |
| `startree-pricing` | Pricing | StarTree Inc. | https://startree.ai/pricing | 2026-09-30 | Alta |
| `trino-charts-readme` | trinodb/charts — README (server.autoscaling, server.keda) | Trino (GitHub) | https://github.com/trinodb/charts/blob/main/charts/trino/README.md | 2026-09-30 | Alta |
| `trino-docs-ai` | AI functions (§ Configuration; § Functions) | Trino Docs | https://trino.io/docs/current/functions/ai.html#functions | 2026-09-30 | Alta |
| `trino-docs-delta` | Delta Lake connector | Trino Docs | https://trino.io/docs/current/connector/delta-lake.html | 2026-09-30 | Alta |
| `trino-docs-event-listener` | HTTP event listener | Trino Docs | https://trino.io/docs/current/admin/event-listeners-http.html | 2026-09-30 | Alta |
| `trino-docs-hudi` | Hudi connector | Trino Docs | https://trino.io/docs/current/connector/hudi.html | 2026-09-30 | Alta |
| `trino-docs-iceberg` | Iceberg connector (§ Schema evolution; catálogos) | Trino Docs | https://trino.io/docs/current/connector/iceberg.html | 2026-09-30 | Alta |
| `trino-docs-k8s` | Trino on Kubernetes with Helm (§ Running Trino using Helm) | Trino Docs | https://trino.io/docs/current/installation/kubernetes.html#running-trino-using-helm | 2026-09-30 | Alta |
| `trino-docs-kafka` | Kafka connector | Trino Docs | https://trino.io/docs/current/connector/kafka.html | 2026-09-30 | Alta |
| `trino-docs-openlineage` | OpenLineage event listener (§ Available Trino facets) | Trino Docs | https://trino.io/docs/current/admin/event-listeners-openlineage.html#available-trino-facets | 2026-09-30 | Alta |
| `trino-docs-resource-groups` | Resource groups | Trino Docs | https://trino.io/docs/current/admin/resource-groups.html | 2026-09-30 | Alta |
| `trino-docs-sql` | SQL language | Trino Docs | https://trino.io/docs/current/language.html | 2026-09-30 | Alta |
| `trino-foundation` | Trino Software Foundation | Trino Software Foundation | https://trino.io/foundation.html | 2026-09-30 | Alta |
| `trino-users` | Users | Trino | https://trino.io/users.html | 2026-09-30 | Alta |

## Bloque B — MarTech

Fuentes de las fichas de `candidatos/martech/`. Las fuentes de licencia OSI (`osi-*`) son compartidas con el Bloque A. Los ids de RudderStack usan el prefijo `rud-` para no colisionar con los de Redshift (`rs-`). Varias páginas de fabricantes (Segment, Brevo, Adobe, HubSpot Community) devuelven 403 a descargas automáticas por protección anti-bot; los enlaces proceden de resultados de búsqueda oficiales y deben revisarse manualmente en un navegador.

| id | Título | Organización / autor | URL | Fecha de consulta | Jerarquía |
|---|---|---|---|---|---|
| `aj-fac` | Federated Audience Composition overview | Adobe Experience League | https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/overview | 2026-09-30 | Alta |
| `aj-email` | Email Marketing Customer Journeys — Adobe Journey Optimizer | Adobe | https://business.adobe.com/products/journey-optimizer/email-marketing.html | 2026-09-30 | Media |
| `aj-experiments` | Combine targeting and experimentation | Adobe Experience League | https://experienceleague.adobe.com/en/docs/journey-optimizer/using/content-management/message-optimization/optimization-combination | 2026-09-30 | Alta |
| `aj-deliverability` | Get started with deliverability | Adobe Experience League | https://experienceleague.adobe.com/en/docs/journey-optimizer/using/monitor/deliverability/deliverability | 2026-09-30 | Alta |
| `aj-ip-warmup` | IP warmup deliverability guide | Adobe Experience League | https://experienceleague.adobe.com/en/docs/journey-optimizer/using/configuration/implement-ip-warmup-plan/ip-warmup-deliverability-guide | 2026-09-30 | Alta |
| `aj-product-desc` | Adobe Journey Optimizer — Product Description | Adobe | https://helpx.adobe.com/legal/product-descriptions/adobe-journey-optimizer.html | 2026-09-30 | Alta |
| `aj-hosting` | Experience Cloud Hosting Locations | Adobe Trust Center | https://www.adobe.com/trust/experience-cloud-hosting-locations.html | 2026-09-30 | Alta |
| `aj-community-deliv` | Email Deliverability at Scale: Lessons from Building with Adobe Journey Optimizer | Adobe Experience League Community | https://experienceleaguecommunities.adobe.com/t5/journey-optimizer-blogs/email-deliverability-at-scale-lessons-from-building-with-adobe/ba-p/761710 | 2026-09-30 | Baja |
| `aj-pricing` | Journey Optimizer Product Pricing | Adobe | https://business.adobe.com/products/journey-optimizer/pricing.html | 2026-09-30 | Alta |
| `ad-identity` | Identity Service Overview | Adobe Experience League | https://experienceleague.adobe.com/en/docs/experience-platform/identity/home | 2026-09-30 | Alta |
| `ad-linking-rules` | Identity Graph Linking Rules | Adobe Experience League | https://experienceleague.adobe.com/en/docs/experience-platform/identity/features/identity-graph-linking-rules/overview | 2026-09-30 | Alta |
| `ad-rtcdp-identities` | Identities in Real-Time Customer Data Platform | Adobe Experience League | https://experienceleague.adobe.com/en/docs/experience-platform/rtcdp/identity/identities-overview | 2026-09-30 | Alta |
| `ad-multiregion` | Adobe Experience Platform for multi-region, multi-brand enterprises | Adobe Experience League | https://experienceleague.adobe.com/en/docs/experience-platform/landing/multi-region-multi-brand-whitepaper | 2026-09-30 | Alta |
| `ad-fac-overview` | Federated Audience Composition overview | Adobe Experience League | https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/overview | 2026-09-30 | Alta |
| `ad-rtcdp-product` | Real-Time Customer Data Platform — Product Description | Adobe | https://helpx.adobe.com/legal/product-descriptions/real-time-customer-data-platform.html | 2026-09-30 | Alta |
| `ad-fac-arch` | Federated Audience Composition High-level Architecture & Flow | Adobe Experience League | https://experienceleague.adobe.com/en/docs/platform-learn/engage-with-audiences-from-your-data-warehouse-using-fac/fac-architecture-and-flow | 2026-09-30 | Alta |
| `ad-consent` | Consent Processing in Adobe Experience Platform | Adobe Experience League | https://experienceleague.adobe.com/en/docs/experience-platform/landing/governance-privacy-security/consent/adobe/overview | 2026-09-30 | Alta |
| `ad-privacy-service` | Privacy Service Overview | Adobe Experience League | https://experienceleague.adobe.com/en/docs/experience-platform/privacy/home | 2026-09-30 | Alta |
| `ad-hosting` | Experience Cloud Hosting Locations | Adobe Trust Center | https://www.adobe.com/trust/experience-cloud-hosting-locations.html | 2026-09-30 | Alta |
| `ad-fac-ai` | AI Assistant Overview (Federated Audience Composition) | Adobe Experience League | https://experienceleague.adobe.com/en/docs/federated-audience-composition/using/start/ai-assistant | 2026-09-30 | Alta |
| `ses-subscription` | Using subscription management (SES) | AWS Docs | https://docs.aws.amazon.com/ses/latest/dg/sending-email-subscription-management.html | 2026-09-30 | Alta |
| `ses-auth` | Amazon SES — Email authentication | AWS Docs | https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication.html | 2026-09-30 | Alta |
| `ses-vdm` | Virtual Deliverability Manager for Amazon SES | AWS Docs | https://docs.aws.amazon.com/ses/latest/dg/vdm.html | 2026-09-30 | Alta |
| `ses-dedicated-ip` | Dedicated IP addresses for Amazon SES | AWS Docs | https://docs.aws.amazon.com/ses/latest/dg/dedicated-ip.html | 2026-09-30 | Alta |
| `aws-gdpr` | GDPR Center | AWS | https://aws.amazon.com/compliance/gdpr-center/ | 2026-09-30 | Alta |
| `ses-endpoints` | Amazon SES endpoints and quotas | AWS Docs | https://docs.aws.amazon.com/general/latest/gr/ses.html | 2026-09-30 | Alta |
| `aws-soc` | SOC Compliance | AWS | https://aws.amazon.com/compliance/soc-faqs/ | 2026-09-30 | Alta |
| `aws-iso` | ISO/IEC 27001:2022 Compliance | AWS | https://aws.amazon.com/compliance/iso-27001-faqs/ | 2026-09-30 | Alta |
| `ses-pricing` | Amazon SES Pricing | AWS | https://aws.amazon.com/ses/pricing/ | 2026-09-30 | Alta |
| `uo-manual` | Apache Unomi 3.x — Documentation | Apache Unomi | https://unomi.apache.org/manual/latest/ | 2026-09-30 | Alta |
| `uo-manual-merge` | Documentation — Automatic profile merging | Apache Unomi | https://unomi.apache.org/manual/latest/#_automatic_profile_merging | 2026-09-30 | Alta |
| `uo-home` | Apache Unomi — Open Source Customer Data Platform | Apache Unomi | https://unomi.apache.org/ | 2026-09-30 | Alta |
| `uo-manual-segment` | Documentation — Segments | Apache Unomi | https://unomi.apache.org/manual/latest/#_segment | 2026-09-30 | Alta |
| `uo-manual-arch` | Documentation — Architecture overview | Apache Unomi | https://unomi.apache.org/manual/latest/#_architecture_overview | 2026-09-30 | Alta |
| `uo-manual-consent` | Documentation — Consent management | Apache Unomi | https://unomi.apache.org/manual/latest/#_consent_management | 2026-09-30 | Alta |
| `uo-manual-docker` | Documentation — Five minutes quickstart | Apache Unomi | https://unomi.apache.org/manual/latest/#_five_minutes_quickstart | 2026-09-30 | Alta |
| `br-docs-technical` | Technical Overview | Bloomreach Docs | https://documentation.bloomreach.com/engagement/docs/technical-overview | 2026-09-30 | Alta |
| `br-mobile-messaging` | SMS, RCS & WhatsApp | Bloomreach | https://www.bloomreach.com/en/products/marketing-automation/mobile-messaging | 2026-09-30 | Alta |
| `br-data-engine` | Customer Data Engine | Bloomreach | https://www.bloomreach.com/en/products/data-engine | 2026-09-30 | Alta |
| `br-ai` | Marketing Intelligence and AI | Bloomreach | https://www.bloomreach.com/en/products/engagement/marketing-intelligence-and-ai | 2026-09-30 | Alta |
| `br-deliverability` | Email Deliverability Services | Bloomreach | https://bloomreach.com/en/products/engagement/email-marketing/email-deliverability | 2026-09-30 | Alta |
| `br-docs-consent` | Consent management | Bloomreach Docs | https://documentation.bloomreach.com/engagement/docs/consent-management | 2026-09-30 | Alta |
| `br-docs-privacy` | Privacy | Bloomreach Docs | https://documentation.bloomreach.com/engagement/docs/security-gdpr | 2026-09-30 | Alta |
| `br-pricing` | Marketing Automation Pricing | Bloomreach | https://www.bloomreach.com/en/pricing/engagement | 2026-09-30 | Alta |
| `bz-arch` | Getting started: Architectural overview | Braze Docs | https://www.braze.com/docs/developer_guide/getting_started/architecture_overview | 2026-09-30 | Alta |
| `bz-cdi` | Braze Cloud Data Ingestion | Braze Docs | https://www.braze.com/docs/user_guide/data/unification/cloud_ingestion | 2026-09-30 | Alta |
| `bz-forge24` | Pre-built data integrations, automated identity resolution and reporting (Forge 2024) | Braze | https://www.braze.com/resources/articles/forge-2024-braze-data-platform-announcements | 2026-09-30 | Media |
| `bz-pricing` | Pricing | Braze | https://www.braze.com/pricing | 2026-10-02 | Alta |
| `bz-ai-docs` | BrazeAI | Braze Docs | https://www.braze.com/docs/user_guide/brazeai | 2026-09-30 | Alta |
| `bz-decisioning` | Getting started with BrazeAI Decisioning Studio | Braze Docs | https://www.braze.com/docs/user_guide/brazeai/decisioning_studio | 2026-09-30 | Alta |
| `bz-inbox-vision` | Inbox Vision | Braze Docs | https://www.braze.com/docs/user_guide/channels/email/inbox_vision | 2026-09-30 | Alta |
| `bz-deliv-center` | Deliverability Center | Braze Docs | https://www.braze.com/docs/user_guide/analytics/dashboards/deliverability_center | 2026-09-30 | Alta |
| `bz-ip-warming` | Automated IP Warming | Braze Docs | https://www.braze.com/docs/user_guide/channels/email/email_setup/ip_warming/automated_ip_warming | 2026-09-30 | Alta |
| `bz-ips-domains` | Set up IPs and domains | Braze Docs | https://www.braze.com/docs/user_guide/channels/email/email_setup/setting_up_ips_and_domains | 2026-09-30 | Alta |
| `bz-dpa` | Data Processing Addendum (Rev. March 2023) | Braze | https://marketing-assets.braze.com/production/hero/Braze-DPA-Rev-March-2023-FINAL-3.pdf?v=1680703997 | 2026-09-30 | Alta |
| `bz-gdpr-faq` | GDPR Compliance FAQ | Braze | https://marketing-assets.braze.com/production/hero/GDPR-Compliance-FAQ-2.pdf?v=1721903379 | 2026-09-30 | Alta |
| `bz-security-docs` | Security Qualifications | Braze Docs | https://www.braze.com/docs/developer_guide/disclosures/security_qualifications | 2026-09-30 | Alta |
| `bz-predictive-churn` | Predictive Churn | Braze Docs | https://www.braze.com/docs/user_guide/brazeai/predictive_suite/predictive_churn | 2026-09-30 | Alta |
| `bz-agent-console` | BrazeAI tools guide | Braze | https://www.braze.com/resources/articles/braze-ai-marketing-tools | 2026-09-30 | Media |
| `bz-mcp` | About the Braze MCP server | Braze Docs | https://www.braze.com/docs/user_guide/brazeai/mcp_server | 2026-09-30 | Alta |
| `bz-forrester` | Braze named strong performer in The Forrester Wave for Email Marketing Service Providers, Q1 2026 | Braze | https://www.braze.com/resources/articles/forrester-email-wave-q1-2026 | 2026-09-30 | Baja |
| `bv-automation` | Automate Your Marketing with Brevo | Brevo | https://www.brevo.com/features/automation/ | 2026-09-30 | Media |
| `bv-pred-seg` | Predictive Segmentation with AI | Brevo | https://www.brevo.com/blog/predictive-segmentation-ai/ | 2026-09-30 | Baja |
| `bv-ab-automation` | A/B test an Automation workflow | Brevo Help | https://help.brevo.com/hc/en-us/articles/360003140799-Classic-editor-A-B-test-an-Automation-workflow-to-optimize-its-performance | 2026-09-30 | Alta |
| `bv-auth` | Authenticate your domain with Brevo (Brevo code, DKIM, DMARC) | Brevo Help | https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC | 2026-09-30 | Alta |
| `bv-bimi` | Implement BIMI to display your logo next to your emails | Brevo Help | https://help.brevo.com/hc/en-us/articles/27769318543506-Implement-BIMI-to-display-your-logo-next-to-your-emails | 2026-09-30 | Alta |
| `bv-dedicated-ip` | Set up your dedicated IP in Brevo | Brevo Help | https://help.brevo.com/hc/en-us/articles/115000240344-Set-up-your-dedicated-IP-in-Brevo | 2026-09-30 | Alta |
| `bv-gmail-yahoo` | Comply with Gmail, Yahoo, and Microsoft's requirements for email senders | Brevo Help | https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-Yahoo-and-Microsoft-s-requirements-for-email-senders | 2026-09-30 | Alta |
| `bv-gdpr` | How does Brevo comply with the GDPR? | Brevo Help | https://help.brevo.com/hc/en-us/articles/360001258744-How-does-Brevo-comply-with-the-GDPR | 2026-09-30 | Alta |
| `bv-dpa` | Where can I find the Data Processing Agreement (DPA)? | Brevo Help | https://help.brevo.com/hc/en-us/articles/15403782599570-Where-can-I-find-the-Data-Processing-Agreement-DPA | 2026-09-30 | Alta |
| `bv-storage` | Data storage location | Brevo Help | https://help.brevo.com/hc/en-us/articles/360001005510-Data-storage-location | 2026-09-30 | Alta |
| `bv-security` | Data Security and Privacy | Brevo | https://www.brevo.com/features/data-security/ | 2026-09-30 | Alta |
| `bv-iso` | ISO 27001 certificate | Brevo | https://www.brevo.com/wp-content/uploads/2022/11/SENDINBLUE-ISO27001-Certificate.pdf | 2026-09-30 | Alta |
| `bv-aura` | Create an automation with Aura, Brevo’s AI-powered assistant | Brevo Help | https://help.brevo.com/hc/en-us/articles/34804478408850-Create-an-automation-with-Aura-Brevo-s-AI-powered-assistant | 2026-09-30 | Alta |
| `bv-pricing` | Pricing | Brevo | https://www.brevo.com/pricing/ | 2026-10-02 | Alta |
| `fv-act-overview` | Activations overview | Fivetran Docs | https://fivetran.com/docs/activations | 2026-09-30 | Alta |
| `fv-blog-acquisition` | Why Fivetran and Census are joining forces | Fivetran | https://www.fivetran.com/blog/why-fivetran-and-census-are-joining-forces | 2026-09-30 | Media |
| `fv-act-audience-hub` | Audience Hub | Fivetran Docs | https://fivetran.com/docs/activations/audience-hub | 2026-09-30 | Alta |
| `fv-act-migration-faq` | Census Migration Frequently Asked Questions | Fivetran Docs | https://fivetran.com/docs/activations/census-migration-faq | 2026-09-30 | Alta |
| `fv-docs-security` | Security | Fivetran Docs | https://fivetran.com/docs/security-and-privacy/security | 2026-09-30 | Alta |
| `fv-blog-census-joins` | Census joins Fivetran’s consumption-based pricing | Fivetran | https://www.fivetran.com/blog/census-joins-fivetrans-consumption-based-pricing | 2026-09-30 | Media |
| `cio-rev-etl` | Understanding reverse ETL integrations | Customer.io Docs | https://docs.customer.io/integrations/data-in/connections/reverse-etl/about-reverse-etl/ | 2026-09-30 | Alta |
| `cio-launch-demo` | AI marketing demo: AI Agent, Goals, WhatsApp, LINE, and more | Customer.io | https://customer.io/learn/announcements/ai-marketing-launch-demo | 2026-09-30 | Media |
| `cio-snowflake` | Snowflake Reverse ETL | Customer.io Docs | https://docs.customer.io/integrations/data-in/connections/reverse-etl/snowflake/ | 2026-09-30 | Alta |
| `cio-bigquery` | Google BigQuery reverse ETL | Customer.io Docs | https://docs.customer.io/journeys/bigquery-reverse-etl | 2026-09-30 | Alta |
| `cio-auth` | Domain authentication | Customer.io Docs | https://docs.customer.io/journeys/authentication/ | 2026-09-30 | Alta |
| `cio-ips` | IP addresses: shared vs dedicated | Customer.io Docs | https://docs.customer.io/messaging/channels/email/deliverability/ip-addresses/ | 2026-09-30 | Alta |
| `cio-unsub` | Custom unsubscribe links: staying compliant with list-unsubscribe-post (RFC 8058) | Customer.io Docs | https://docs.customer.io/messaging/channels/email/deliverability/custom-unsubscribe-links/ | 2026-09-30 | Alta |
| `cio-snowflake-out` | Snowflake (advanced) — data out | Customer.io Docs | https://docs.customer.io/integrations/data-out/connections/snowflake/ | 2026-09-30 | Alta |
| `cio-subscriptions` | Overview of subscription options | Customer.io Docs | https://docs.customer.io/messaging/channels/subscriptions/overview/ | 2026-09-30 | Alta |
| `cio-compliance-docs` | Data compliance and privacy | Customer.io Docs | https://docs.customer.io/integrations/getting-started/data-compliance/ | 2026-09-30 | Alta |
| `cio-gdpr` | GDPR Compliance Statement | Customer.io | https://customer.io/legal/gdpr | 2026-09-30 | Alta |
| `cio-regions` | Account regions (US and EU) | Customer.io Docs | https://docs.customer.io/accounts/settings/data-centers/ | 2026-09-30 | Alta |
| `cio-certs` | Customer.io security qualifications | Customer.io Docs | https://docs.customer.io/accounts/security/certifications/ | 2026-09-30 | Alta |
| `cio-agent` | AI Agent | Customer.io | https://customer.io/platform/agent | 2026-09-30 | Media |
| `cio-mcp` | Get started with the Customer.io MCP server | Customer.io Docs | https://docs.customer.io/ai/mcp/get-started/ | 2026-09-30 | Alta |
| `cio-pricing` | Pricing | Customer.io | https://customer.io/pricing | 2026-10-02 | Alta |
| `df-gh` | dittofeed/dittofeed | Dittofeed (GitHub) | https://github.com/dittofeed/dittofeed | 2026-09-30 | Alta |
| `df-docs` | Introduction | Dittofeed Docs | https://docs.dittofeed.com/introduction | 2026-09-30 | Alta |
| `df-pricing` | Pricing | Dittofeed | https://www.dittofeed.com/pricing | 2026-09-30 | Alta |
| `ht-docs-events` | Events overview | Hightouch Docs | https://hightouch.com/docs/events/overview | 2026-09-30 | Alta |
| `ht-docs-data` | Technical setup (Data teams & engineers) | Hightouch Docs | https://hightouch.com/docs/getting-started/data | 2026-09-30 | Alta |
| `ht-docs-identity-graph` | Create an identity graph | Hightouch Docs | https://hightouch.com/docs/identity-resolution/identity-graph | 2026-09-30 | Alta |
| `ht-docs-personalization-api` | Personalization API | Hightouch Docs | https://hightouch.com/docs/destinations/personalization-api | 2026-09-30 | Alta |
| `ht-docs-customer-studio` | Customer Studio overview | Hightouch Docs | https://hightouch.com/docs/customer-studio/overview | 2026-09-30 | Alta |
| `ht-pricing` | Pricing | Hightouch | https://hightouch.com/pricing | 2026-10-02 | Alta |
| `ht-docs-mcp` | Hightouch MCP | Hightouch Docs | https://hightouch.com/docs/ai-integrations/mcp | 2026-09-30 | Alta |
| `ht-docs-experiments` | Experiments | Hightouch Docs | https://hightouch.com/docs/customer-studio/experiments | 2026-09-30 | Alta |
| `ht-security` | Security | Hightouch | https://hightouch.com/security | 2026-09-30 | Alta |
| `ht-docs-regions` | Regions | Hightouch Docs | https://hightouch.com/docs/security/regions | 2026-09-30 | Alta |
| `ht-docs-api` | Hightouch API (1.0.0) | Hightouch Docs | https://hightouch.com/docs/api-reference | 2026-09-30 | Alta |
| `ht-docs-consent` | Consent Manager | Hightouch Docs | https://hightouch.com/docs/events/consent/consent-manager | 2026-09-30 | Alta |
| `ht-ai-decisioning` | AI Decisioning | Hightouch | https://hightouch.com/platform/ai-decisioning | 2026-09-30 | Media |
| `ht-docs-ss-pricing` | Self-serve pricing | Hightouch Docs | https://hightouch.com/docs/pricing/ss-pricing | 2026-09-30 | Alta |
| `hs-cloud-storage` | Cloud Data Storage Integrations | HubSpot | https://www.hubspot.com/products/data/cloud-data-storage-integrations | 2026-09-30 | Alta |
| `hs-ab-workflows` | Automate A/B email testing with workflows | HubSpot Knowledge Base | https://knowledge.hubspot.com/workflows/automate-ab-emails-with-workflows | 2026-09-30 | Alta |
| `hs-ab-email` | Run A/B tests for marketing emails | HubSpot Knowledge Base | https://knowledge.hubspot.com/marketing-email/run-an-a/b-test-on-your-marketing-email | 2026-09-30 | Alta |
| `hs-email-auth` | Overview of email authentication | HubSpot Knowledge Base | https://knowledge.hubspot.com/marketing-email/overview-of-email-authentication | 2026-09-30 | Alta |
| `hs-deliverability` | Improve email deliverability | HubSpot Knowledge Base | https://knowledge.hubspot.com/marketing-email/email-deliverability-best-practices | 2026-09-30 | Alta |
| `hs-community-gy` | Google/Yahoo Auth Requirements | HubSpot Community | https://community.hubspot.com/t5/Email-Marketing-Tool/Google-Yahoo-Auth-Requirements-We-re-here-for-you/m-p/872108 | 2026-09-30 | Baja |
| `hs-snowflake-share` | Connect HubSpot and Snowflake Data Share | HubSpot Knowledge Base | https://knowledge.hubspot.com/integrations/connect-snowflake-data-share | 2026-09-30 | Alta |
| `hs-dpa` | HubSpot Data Processing Agreement | HubSpot Legal | https://legal.hubspot.com/dpa | 2026-09-30 | Alta |
| `hs-eu-transfers` | HubSpot's Commitment to Protecting EU Data Transfers | HubSpot Legal | https://legal.hubspot.com/dp-eu-data-transfers | 2026-09-30 | Alta |
| `hs-hosting-faq` | HubSpot Cloud Infrastructure and Data Hosting FAQ | HubSpot Knowledge Base | https://knowledge.hubspot.com/account-security/hubspot-cloud-infrastructure-and-data-hosting-frequently-asked-questions | 2026-09-30 | Alta |
| `hs-security` | HubSpot Security Program | HubSpot Legal | https://legal.hubspot.com/security | 2026-09-30 | Alta |
| `hs-mcp` | HubSpot MCP Server | HubSpot Developers | https://developers.hubspot.com/ai-tools/mcp | 2026-09-30 | Alta |
| `hs-pricing` | Marketing Hub pricing | HubSpot | https://www.hubspot.com/pricing/marketing | 2026-09-30 | Alta |
| `jt-gh` | jitsucom/jitsu | Jitsu (GitHub) | https://github.com/jitsucom/jitsu | 2026-09-30 | Alta |
| `jt-pricing` | Pricing | Jitsu | https://jitsu.com/pricing | 2026-09-30 | Alta |
| `jt-blog-cdp` | Best Open-Source CDPs & Self-Hosted Segment Alternatives (2026) | Jitsu | https://jitsu.com/blog/open-source-cdp | 2026-09-30 | Baja |
| `jt-blog-214` | Jitsu 2.14 is now public: Kubernetes-native for production self-hosting | Jitsu | https://jitsu.com/blog/jitsu-2-14 | 2026-09-30 | Media |
| `jt-docs-mcp` | MCP Server | Jitsu Docs | https://jitsu.com/docs/mcp | 2026-09-30 | Alta |
| `kl-gh` | pentacent/keila | Keila (GitHub) | https://github.com/pentacent/keila | 2026-09-30 | Alta |
| `kl-pricing` | Pricing | Keila | https://www.keila.io/pricing | 2026-09-30 | Alta |
| `osi-agpl3` | GNU Affero General Public License version 3 | Open Source Initiative | https://opensource.org/license/agpl-v3 | 2026-09-30 | Alta |
| `kv-dw-import` | Understanding data warehouse import in Klaviyo | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/40939206649627 | 2026-09-30 | Alta |
| `kv-ai` | AI Workflow Automation Tools | Klaviyo | https://www.klaviyo.com/solutions/ai | 2026-09-30 | Media |
| `kv-dw-sync` | Understand data warehouse syncing in Klaviyo | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/17759932376475 | 2026-09-30 | Alta |
| `kv-ab-flow` | How to A/B test a flow email | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/6960371049115 | 2026-09-30 | Alta |
| `kv-ab` | How to A/B test an email campaign | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/115005228148 | 2026-09-30 | Alta |
| `kv-auth` | Understanding email authentication | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/4402601857307 | 2026-09-30 | Alta |
| `kv-deliv-faq` | Email deliverability FAQs | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/16425927010075 | 2026-09-30 | Alta |
| `kv-consent` | How to collect GDPR-compliant consent | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/360003536031 | 2026-09-30 | Alta |
| `kv-dpa` | Data Processing Agreement | Klaviyo | https://www.klaviyo.com/legal/data-processing-agreement | 2026-09-30 | Alta |
| `kv-trust` | Trust at Klaviyo | Klaviyo | https://www.klaviyo.com/trust | 2026-09-30 | Alta |
| `kv-predictive` | Understanding Klaviyo's predictive analytics | Klaviyo Help Center | https://help.klaviyo.com/hc/en-us/articles/360020919731 | 2026-09-30 | Alta |
| `kv-mcp` | Klaviyo MCP server | Klaviyo Developers | https://developers.klaviyo.com/en/docs/klaviyo_mcp_server | 2026-09-30 | Alta |
| `kv-pricing` | Pricing | Klaviyo | https://www.klaviyo.com/pricing | 2026-09-30 | Alta |
| `lm-api-subs` | API / Subscribers | listmonk Docs | https://listmonk.app/docs/apis/subscribers/ | 2026-09-30 | Alta |
| `lm-gh` | knadh/listmonk | listmonk (GitHub) | https://github.com/knadh/listmonk | 2026-09-30 | Alta |
| `lm-concepts` | Concepts | listmonk Docs | https://listmonk.app/docs/concepts/ | 2026-09-30 | Alta |
| `lm-bounces` | Bounce processing | listmonk Docs | https://listmonk.app/docs/bounces/ | 2026-09-30 | Alta |
| `lm-issue-unsub` | List-Unsubscribe header issue #1206 | listmonk (GitHub) | https://github.com/knadh/listmonk/issues/1206 | 2026-09-30 | Baja |
| `lm-releases` | Releases | listmonk (GitHub) | https://github.com/knadh/listmonk/releases | 2026-09-30 | Alta |
| `mc-integrations` | Integrations Documentation | Mailchimp Developer | https://mailchimp.com/developer/marketing/docs/integrations/ | 2026-09-30 | Alta |
| `mc-ai` | AI marketing tools — Mailchimp with Intuit Intelligence | Mailchimp | https://mailchimp.com/solutions/ai-tools/ | 2026-09-30 | Media |
| `mc-journey` | Customer Journey Builder | Mailchimp | https://mailchimp.com/features/automations/customer-journey-builder/ | 2026-09-30 | Media |
| `mc-ab` | About A/B Tests | Mailchimp Help | https://mailchimp.com/help/about-ab-tests/ | 2026-09-30 | Alta |
| `mc-domain-auth` | Set Up Email Domain Authentication | Mailchimp Help | https://mailchimp.com/help/set-up-email-domain-authentication/ | 2026-09-30 | Alta |
| `mc-gmail-yahoo` | How Intuit Mailchimp Customers Can Prepare for Gmail and Yahoo’s New Sender Requirements | Mailchimp | https://mailchimp.com/newsroom/google-changes-bulk-senders/ | 2026-09-30 | Media |
| `mc-dpa` | Data Processing Addendum | Mailchimp | https://mailchimp.com/legal/data-processing-addendum/ | 2026-09-30 | Alta |
| `mc-eu-transfers` | Mailchimp and European Data Transfers | Mailchimp Help | https://mailchimp.com/help/mailchimp-european-data-transfers/ | 2026-09-30 | Alta |
| `mc-subprocessors` | Mailchimp sub-processors | Mailchimp | https://mailchimp.com/legal/subprocessors/ | 2026-09-30 | Alta |
| `mc-security` | Mailchimp Data Security and Privacy | Mailchimp | https://mailchimp.com/about/security/ | 2026-09-30 | Alta |
| `mc-content-gen` | Intuit Mailchimp Announces Email Content Generator | Mailchimp | https://mailchimp.com/newsroom/announcing-email-content-generator/ | 2026-09-30 | Media |
| `mc-mcp-transactional` | How to Use Mailchimp's Transactional Messaging MCP | Mailchimp Developer | https://mailchimp.com/developer/transactional/guides/how-to-use-mailchimps-transactional-messaging-mcp/ | 2026-09-30 | Alta |
| `mc-pricing` | Pricing — Marketing | Mailchimp | https://mailchimp.com/pricing/marketing/ | 2026-09-30 | Alta |
| `mt-product` | Product | Mautic | https://mautic.org/product/ | 2026-09-30 | Alta |
| `mt-campaign-builder` | Using the Campaign Builder | Mautic Docs | https://docs.mautic.org/en/5.2/campaigns/campaign_builder.html | 2026-09-30 | Alta |
| `mt-overview` | Mautic overview (7.1) | Mautic Docs | https://docs.mautic.org/en/7.1/overview/overview.html | 2026-09-30 | Alta |
| `mt-kb-sendgrid` | How to Use the SendGrid API in Mautic 5 with Symfony Mailer | Mautic Knowledgebase | https://kb.mautic.org/article/how-to-use-the-sendgrid-api-in-mautic-5-with-symfony-mailer.html | 2026-09-30 | Alta |
| `mt-forum-ses-dmarc` | Sending via SMTP to Amazon SES: missing DKIM signature for FROM domain | Mautic Forums | https://forum.mautic.org/t/sending-via-smtp-to-amazon-ses-missing-dkim-signature-for-from-domain-thus-causing-domain-dkim-misalignment-failed-dmarc/31082 | 2026-09-30 | Baja |
| `mt-issue-8058` | Add support for RFC 8058 (One-Click unsubscribe), issue #12880 | Mautic (GitHub) | https://github.com/mautic/mautic/issues/12880 | 2026-09-30 | Alta |
| `mt-gh` | mautic/mautic | Mautic (GitHub) | https://github.com/mautic/mautic | 2026-09-30 | Alta |
| `mt-hosting` | Mautic Hosting | Mautic | https://mautic.org/start-using-mautic/mautic-hosting/ | 2026-09-30 | Alta |
| `mt-ai-manifesto` | Mautic’s AI Manifesto | Mautic | https://mautic.org/mautics-ai-manifesto/ | 2026-09-30 | Alta |
| `mt-release7` | Mautic 7: Columba Edition is released | Mautic | https://mautic.org/blog/mautic-7-columba-edition-is-released/ | 2026-09-30 | Alta |
| `osi-gpl3` | GNU General Public License version 3 | Open Source Initiative | https://opensource.org/license/gpl-3-0 | 2026-09-30 | Alta |
| `mp-cdpcom` | What Is mParticle? CDP Features, Pricing, and Alternatives | CDP.com | https://cdp.com/articles/what-is-mparticle/ | 2026-09-30 | Baja |
| `mp-idsync` | IDSync overview | mParticle Docs | https://docs.mparticle.com/guides/idsync/introduction/ | 2026-09-30 | Alta |
| `mp-composable` | Composable Audiences Overview | mParticle Docs | https://docs.mparticle.com/guides/composable-audiences/overview/ | 2026-09-30 | Alta |
| `mp-warehouse-sync` | Warehouse Sync API Overview | mParticle Docs | https://docs.mparticle.com/developers/apis/warehouse-sync-api/overview/ | 2026-09-30 | Alta |
| `mp-privacy-controls` | Data Privacy Controls | mParticle Docs | https://docs.mparticle.com/guides/data-privacy-controls/ | 2026-09-30 | Alta |
| `mp-dsr` | Data Subject Requests | mParticle Docs | https://docs.mparticle.com/guides/data-subject-requests/ | 2026-09-30 | Alta |
| `mp-localization` | Data Localization | mParticle | https://www.mparticle.com/platform/detail/data-localization/ | 2026-09-30 | Media |
| `mp-security-press` | mParticle receives ISO 27001 certification and SOC 2 Type II attestation | mParticle | https://www.mparticle.com/news/press-release-iso-27001-soc-2-type-ii/ | 2026-09-30 | Media |
| `mp-predictive` | Predictive Audiences Overview | mParticle Docs | https://docs.mparticle.com/guides/segmentation/predictive-audiences/overview/ | 2026-09-30 | Alta |
| `mp-adx-rokt` | Rokt Acquires mParticle For $300 Million | AdExchanger | https://www.adexchanger.com/commerce/rokt-acquires-mparticle-for-300-million/ | 2026-09-30 | Baja |
| `pm-pricing` | Pricing | Postmark | https://postmarkapp.com/pricing | 2026-10-02 | Alta |
| `pm-dmarc-digests` | Getting Started with DMARC Digests | Postmark Support | https://postmarkapp.com/support/article/getting-started-with-dmarc-digests | 2026-09-30 | Alta |
| `pm-gmail-yahoo` | Your 2024 guide to Google and Yahoo’s new requirements for email senders | Postmark | https://postmarkapp.com/blog/2024-gmail-yahoo-email-requirements | 2026-09-30 | Media |
| `pm-unsub` | How to include a List-Unsubscribe header | Postmark Support | https://postmarkapp.com/support/article/1299-how-to-include-a-list-unsubscribe-header | 2026-09-30 | Alta |
| `pm-dpa` | Data Processing Addendum | Postmark | https://postmarkapp.com/dpa | 2026-09-30 | Alta |
| `pm-eu-privacy` | EU Data Protection | Postmark | https://postmarkapp.com/eu-privacy | 2026-09-30 | Alta |
| `pm-gdpr-faq` | GDPR FAQ | Postmark Support | https://postmarkapp.com/support/article/1218-gdpr-faq | 2026-09-30 | Alta |
| `rud-docs-sources` | Event Stream sources overview | RudderStack Docs | https://www.rudderstack.com/docs/sources/overview/ | 2026-09-30 | Alta |
| `rud-docs-governance` | Data Governance | RudderStack Docs | https://www.rudderstack.com/docs/data-governance/ | 2026-09-30 | Alta |
| `rud-docs-profiles` | Profiles overview | RudderStack Docs | https://www.rudderstack.com/docs/profiles/overview/ | 2026-09-30 | Alta |
| `rud-pricing` | Pricing | RudderStack | https://www.rudderstack.com/pricing/ | 2026-09-30 | Alta |
| `rud-docs-home` | Documentation | RudderStack Docs | https://www.rudderstack.com/docs/ | 2026-09-30 | Alta |
| `rud-docs-cloud-vs-oss` | RudderStack-managed Plans vs. RudderStack Open Source | RudderStack Docs | https://www.rudderstack.com/docs/get-started/cloud-vs-open-source/ | 2026-09-30 | Alta |
| `rud-dpa` | Data Protection Addendum | RudderStack | https://www.rudderstack.com/data-privacy-addendum/ | 2026-09-30 | Alta |
| `rud-docs-architecture` | RudderStack Architecture | RudderStack Docs | https://www.rudderstack.com/docs/resources/rudderstack-architecture/ | 2026-09-30 | Alta |
| `rud-security` | Data security at scale | RudderStack | https://www.rudderstack.com/security/ | 2026-09-30 | Alta |
| `rud-docs-ai` | AI features | RudderStack Docs | https://www.rudderstack.com/docs/ai-features/ | 2026-09-30 | Alta |
| `rud-docs-k8s` | RudderStack Kubernetes Setup | RudderStack Docs | https://www.rudderstack.com/docs/get-started/rudderstack-open-source/data-plane-setup/kubernetes/ | 2026-09-30 | Alta |
| `rud-gh-readme` | rudder-server — README (License) | RudderStack (GitHub) | https://github.com/rudderlabs/rudder-server#license | 2026-09-30 | Alta |
| `rud-gh-license` | rudder-server — LICENSE | RudderStack (GitHub) | https://github.com/rudderlabs/rudder-server/blob/master/LICENSE | 2026-09-30 | Alta |
| `rud-blog-licensing` | RudderStack’s Licensing: Introduction (2021) | RudderStack | https://www.rudderstack.com/blog/rudderstacks-licensing-explained/ | 2026-09-30 | Media |
| `sf-fuzzy` | Improve Identity Resolution Match Rules with Fuzzy Matching | Salesforce Help | https://help.salesforce.com/s/articleView?language=en_US&id=release-notes.cdp_rn_2024_fuzzy_matching_more.htm&release=248&type=5 | 2026-09-30 | Alta |
| `sf-segments` | Create Segments in Data 360 | Salesforce Help | https://help.salesforce.com/s/articleView?language=en_US&id=data.c360_a_segments.htm&type=5 | 2026-09-30 | Alta |
| `sf-zerocopy` | Data Cloud — Zero Copy Connectivity | Salesforce | https://www.salesforce.com/data/connectivity/zero-copy/ | 2026-09-30 | Alta |
| `sf-activation` | Activation for Data 360 Segments | Salesforce Help | https://help.salesforce.com/s/articleView?id=sf.c360_a_activation_for_a_segment.htm&language=en_US&type=5 | 2026-09-30 | Alta |
| `sf-zerocopy-iceberg` | Introducing Zero Copy File Federation in Data Cloud | Salesforce | https://www.salesforce.com/blog/unlock-trapped-data-in-your-data-lakes-introducing-zero-copy-file-federation-in-data-cloud/ | 2026-09-30 | Media |
| `sf-consent` | Consent Management for Data Cloud | Salesforce Help | https://help.salesforce.com/s/articleView?id=xcloud.consent_management_c360_audiences.htm&language=en_US&type=5 | 2026-09-30 | Alta |
| `sf-rtbf` | Delete Data with Right to Be Forgotten Policies | Salesforce Help | https://help.salesforce.com/s/articleView?id=xcloud.right_to_be_forgotten.htm&language=en_US&type=5 | 2026-09-30 | Alta |
| `sf-hyperforce-eu` | Hyperforce: European Union Public Cloud Infrastructure | Salesforce | https://salesforce.com/products/data-residence-eu-oz | 2026-09-30 | Alta |
| `sf-mavlers-pricing` | Salesforce Data Cloud Pricing Explained (2026 Guide) | Mavlers | https://www.mavlers.com/blog/salesforce-data-cloud-pricing-explained/ | 2026-09-30 | Baja |
| `sf-rate-sheet` | Data Cloud Platform Services Rate Sheet | Salesforce | https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/platform/data-cloud-platform-services-rate-sheet-dc-9-04.pdf | 2026-09-30 | Alta |
| `sm-dc-zerocopy` | Data Cloud — Zero Copy Connectivity | Salesforce | https://www.salesforce.com/data/connectivity/zero-copy/ | 2026-09-30 | Alta |
| `sm-pricing` | Marketing Cloud Engagement Pricing | Salesforce | https://www.salesforce.com/marketing/engagement/pricing/ | 2026-09-30 | Alta |
| `sm-einstein` | Einstein Engagement Scoring | Salesforce Help | https://help.salesforce.com/s/articleView?id=mktg.mc_anb_einstein_engagement_scoring.htm&language=en_US&type=5 | 2026-09-30 | Alta |
| `sm-sap` | Working with the Email Sender Authentication Package | Salesforce Help | https://help.salesforce.com/s/articleView?id=mc_es_sender_authentication_package.htm&language=en_US&type=5 | 2026-09-30 | Alta |
| `sm-sap-guide` | Sender Authentication Package (SAP) for Marketing Cloud | Salesforce Ben | https://www.salesforceben.com/sender-authentication-package-sap-for-marketing-cloud-do-you-need-it/ | 2026-09-30 | Baja |
| `sm-hyperforce-eu` | Hyperforce: European Union Public Cloud Infrastructure | Salesforce | https://salesforce.com/products/data-residence-eu-oz | 2026-09-30 | Alta |
| `sm-residency` | Data Residency (Marketing Cloud Engagement, Hyperforce) | Salesforce Help | https://help.salesforce.com/s/articleView?id=sf.mc_anb_data_residency_hyperforce.htm&language=en_US | 2026-09-30 | Alta |
| `sgd-pricing` | Twilio SendGrid Email API pricing | Twilio | https://www.twilio.com/en-us/products/email-api/pricing | 2026-09-30 | Alta |
| `sgd-domain-auth` | Configure domain authentication | Twilio Docs | https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication | 2026-09-30 | Alta |
| `sgd-dmarc` | Enforce authentication with a DMARC policy | Twilio Docs | https://www.twilio.com/docs/sendgrid/ui/sending-email/dmarc | 2026-09-30 | Alta |
| `sgd-bimi` | Getting Started with BIMI and SendGrid | Twilio | https://www.twilio.com/en-us/blog/insights/getting-started-bimi-sendgrid | 2026-09-30 | Media |
| `sgd-residency` | Data Residency Email (EU) | Twilio Docs | https://www.twilio.com/docs/sendgrid/data-residency | 2026-09-30 | Alta |
| `sgd-eu-locations` | EU Data Processing Locations | Twilio Docs | https://www.twilio.com/docs/sendgrid/data-residency/locations-eu | 2026-09-30 | Alta |
| `sgd-trial` | Overview of 60-Day Free Trial Plans | SendGrid Support | https://support.sendgrid.com/hc/en-us/articles/35270136965403-Twilio-SendGrid-Trial-Account-Plan | 2026-09-30 | Alta |
| `sp-docs-home` | Snowplow Documentation | Snowplow Docs | https://docs.snowplow.io/docs/ | 2026-09-30 | Alta |
| `sp-pricing` | Pricing | Snowplow | https://snowplow.io/pricing | 2026-10-02 | Alta |
| `sp-security` | Security | Snowplow | https://snowplow.io/security | 2026-09-30 | Alta |
| `sp-docs-signals` | Snowplow Signals — Introduction | Snowplow Docs | https://docs.snowplow.io/docs/signals/introduction/ | 2026-09-30 | Alta |
| `sp-docs-slula-faq` | FAQ: Snowplow Limited Use License Agreement (SLULA) | Snowplow Docs | https://docs.snowplow.io/docs/resources/limited-use-license-faq/ | 2026-09-30 | Alta |
| `sp-license-change` | Snowplow OSS license change | Snowplow | https://snowplow.io/snowplow-oss-license-change | 2026-09-30 | Alta |
| `sp-blog-license` | Introducing the Snowplow Limited Use License Agreement | Snowplow | https://snowplow.io/blog/introducing-snowplow-limited-use-license | 2026-09-30 | Alta |
| `tl-home` | Customer Data Platform / Trusted Data for AI | Tealium | https://tealium.com/ | 2026-09-30 | Alta |
| `tl-iq` | Tealium iQ Features | Tealium | https://tealium.com/tealium-iq-features/ | 2026-09-30 | Alta |
| `tl-docs-csp` | Content Security Policy (dominios de centros de datos UE) | Tealium Docs | https://docs.tealium.com/server-side/administration/tealium-content-security-policies-reference-guide/ | 2026-09-30 | Alta |
| `tl-docs-stitching` | About visitor stitching | Tealium Docs | https://docs.tealium.com/server-side/visitor-stitching/about/ | 2026-09-30 | Alta |
| `tl-docs-as-intro` | Introduction to AudienceStream | Tealium Docs | https://docs.tealium.com/server-side/getting-started/audiencestream-cdp/introduction/ | 2026-09-30 | Alta |
| `tl-ai` | Tealium for AI | Tealium | https://tealium.com/platform/tealium-for-ai/ | 2026-09-30 | Alta |
| `tl-cloud-activation` | Data Cloud Activation | Tealium | https://tealium.com/platform/cloud-activation/ | 2026-09-30 | Alta |
| `tl-databricks` | Databricks and Tealium join forces | Tealium | https://tealium.com/press-releases/databricks-better-together/ | 2026-09-30 | Media |
| `tl-security` | Data Security and Privacy Tools | Tealium | https://tealium.com/resource/datasheet/tealium-data-security-and-privacy-tools/ | 2026-09-30 | Alta |
| `tl-predict` | Tealium Predict ML | Tealium | https://tealium.com/products/tealium-predict-machine-learning/ | 2026-09-30 | Alta |
| `tl-pricing` | Tealium Pricing | Tealium | https://tealium.com/tealium-pricing/ | 2026-10-02 | Alta |
| `tl-aws-marketplace` | Tealium Event and Audience Data Hub | AWS Marketplace | https://aws.amazon.com/marketplace/pp/prodview-qafd6co4nw45g | 2026-09-30 | Media |
| `td-docs-idu` | What is ID Unification? | Treasure AI Docs | https://docs.treasure.ai/products/customer-data-platform/id-unification/p0_introduction | 2026-09-30 | Alta |
| `td-identity` | Identity Resolution | Treasure AI | https://www.treasure.ai/product/identity-resolution | 2026-09-30 | Media |
| `td-docs-rt-stitching` | Real-Time ID Stitching Overview | Treasure AI Docs | https://docs.treasure.ai/products/customer-data-platform/real-time/real-time-id-stitching-overview | 2026-09-30 | Alta |
| `td-segmentation` | Segmentación y CDP inteligente | Treasure AI | https://www.treasure.ai/product/intelligent-cdp/ | 2026-09-30 | Media |
| `td-aws-ai-suites` | Treasure AI Suites | AWS Marketplace | https://aws.amazon.com/marketplace/pp/prodview-2okdekfzpigfo | 2026-09-30 | Media |
| `td-api-endpoints` | Treasure AI Sites and API Endpoints | Treasure AI API Docs | https://api-docs.treasuredata.com/en/overview/aboutendpoints | 2026-09-30 | Alta |
| `td-security` | CDP Security | Treasure AI | https://www.treasure.ai/security/ | 2026-09-30 | Alta |
| `td-docs-audience-agent` | Audience Agent Overview | Treasure AI Docs | https://docs.treasure.ai/products/customer-data-platform/audience-studio/audience-agent/audience-agent-overview | 2026-09-30 | Alta |
| `td-poc` | CDP Proof of Concept | Treasure AI | https://www.treasuredata.com/cdp-poc/ | 2026-09-30 | Baja |
| `sg-docs-sources` | Sources Catalog | Twilio Docs | https://www.twilio.com/docs/segment/connections/sources/catalog | 2026-09-30 | Alta |
| `sg-docs-protocols` | Protocols Overview | Twilio Docs | https://www.twilio.com/docs/segment/protocols | 2026-09-30 | Alta |
| `sg-docs-identity` | Identity Resolution Overview | Twilio Docs | https://www.twilio.com/docs/segment/unify/identity-resolution | 2026-09-30 | Alta |
| `sg-docs-identity-settings` | Identity Resolution Settings | Twilio Docs | https://www.twilio.com/docs/segment/unify/identity-resolution/identity-resolution-settings | 2026-09-30 | Alta |
| `sg-docs-journeys` | Journeys overview | Twilio Docs | https://www.twilio.com/docs/segment/engage/journeys | 2026-09-30 | Alta |
| `sg-reverse-etl` | Reverse ETL: Activate Data from Your Warehouse | Twilio | https://www.twilio.com/en-us/products/connections/reverse-etl | 2026-09-30 | Alta |
| `sg-profiles-sync` | Customer Profiles Sync | Twilio | https://www.twilio.com/en-us/products/unify/profiles-sync | 2026-09-30 | Alta |
| `sg-pricing-cdp` | Customer Data Platform Pricing | Twilio | https://www.twilio.com/en-us/pricing/customer-data | 2026-09-30 | Alta |
| `sg-press-customerai` | Twilio CustomerAI press release | Twilio | https://www.twilio.com/en-us/press/releases/twilio-customerai-fuels-next-generation-customer-relationships-a | 2026-09-30 | Media |
| `sg-docs-deletion` | User Deletion and Suppression | Segment Docs | https://segment.com/docs/guides/best-practices/user-deletion-and-suppression/ | 2026-09-30 | Alta |
| `sg-docs-onetrust` | Analytics.js OneTrust Wrapper | Segment Docs | https://segment.com/docs/privacy/consent-management/onetrust-wrapper/ | 2026-09-30 | Alta |
| `sg-docs-regional` | Regional Segment | Twilio Docs | https://www.twilio.com/docs/segment/guides/regional-segment | 2026-09-30 | Alta |
| `sg-pricing-connections` | Connections pricing | Twilio | https://www.twilio.com/en-us/products/connections/pricing | 2026-10-02 | Alta |
| `mp-rokt-news` | Rokt and mParticle Merge to Redefine Real-Time Relevance | mParticle | https://www.mparticle.com/news/rokt-and-mparticle-merge/ | 2026-09-30 | Media |
| `pm-broadcast` | Best practices for bulk broadcast sending | Postmark | https://postmarkapp.com/guides/best-practices-for-broadcast-sending | 2026-09-30 | Alta |
| `doris-unique-key-model` | Apache Doris Docs, «Unique Key Model» | Apache Doris | https://doris.apache.org/docs/dev/table-design/data-model/unique | 2026-09-30 | Alta |
| `doris-high-concurrency-point-query` | Apache Doris Docs «High-Concurrency Point Query» | Apache Doris |  https://doris.apache.org/docs/dev/key-features/high-concurrency-point-query | 2026-09-30 | Alta 
| `doris-updating-data-on-unique-key-model` |  Apache Doris Docs «Updating Data on Unique Key Model»| Apache Doris| https://doris.apache.org/docs/3.x/data-operate/update/update-of-unique-model | 2026-09-30 | Alta 
| `hs-pricing-pro` | Marketing Hub Professional pricing | HubSpot | https://www.hubspot.com/pricing/marketing/professional | 2026-10-02 | Alta |
| `hs-impactplus-pricing` | HubSpot Pricing: Your Guide to Everything HubSpot Costs (contactos adicionales: 250 USD por cada 5.000; artículo de 2023-08-24) | Impact (agencia) | https://www.impactplus.com/blog/hubspot-pricing-cost | 2026-10-02 | Baja |
| `kv-etester-pricing` | Klaviyo Pricing 2026 (plan Email: 20 USD a 500 perfiles; 720 USD a 50.000) | EmailToolTester | https://www.emailtooltester.com/en/reviews/klaviyo/pricing/ | 2026-10-02 | Baja |
| `kv-usecarly-pricing` | Klaviyo Pricing in 2026: What Active-Profile Billing Actually Costs (tabla de tramos, 2026-07-15) | Carly | https://www.usecarly.com/blog/klaviyo-pricing/ | 2026-10-02 | Baja |
| `mc-groupmail-pricing` | Mailchimp Pricing 2026: What You Pay at Every Tier (tabla por contactos, 2026-03-02) | GroupMail | https://blog.groupmail.io/mailchimp-pricing-2026/ | 2026-10-02 | Baja |
| `mc-evs-pricing` | Mailchimp Pricing 2026: Is it too expensive? (Standard 100.000 contactos: 800 USD, no coincide con la otra tabla) | Email Vendor Selection | https://www.emailvendorselection.com/mailchimp-pricing/ | 2026-10-02 | Baja |
| `db-pricing-3p` | Databricks Pricing: $0.07–$0.70 a DBU, Plus Your Cloud Bill (SQL Serverless 0,70 USD/DBU, Pro 0,55, Classic 0,22) | Mammoth Analytics | https://mammoth.io/blog/databricks-pricing/ | 2026-10-02 | Baja |
| `fab-pricing-3p` | Microsoft Fabric Pricing 2026: F-SKU Costs and Licenses (pago por uso: 0,18 USD por CU-hora en EE. UU.; almacenamiento OneLake ≈ 0,023 USD/GB-mes) | Kanerika | https://kanerika.com/blogs/understanding-microsoft-fabric-pricing/ | 2026-10-02 | Baja |
| `sgd-pricing-3p` | SendGrid Pricing: Plans, Features, and Best Deals Explained (Essentials 19,95 USD a 50.000 emails y 34,95 a 100.000; Pro 89,95 a 100.000, 249 a 300.000, 499 a 700.000, 799 a 1,5 M, 1.099 a 2,5 M) | Spendflo | https://www.spendflo.com/blog/sendgrid-pricing-guide | 2026-10-02 | Baja |
| `cio-pricing-3p` | Customer.io Pricing 2026: 3 Plans from $100–$1,000/month (Essentials 100 USD con 5.000 perfiles) | Costbench | https://costbench.com/software/marketing-automation/customerio/ | 2026-10-02 | Baja |
| `fab-docs-licenses` | Understand Microsoft Fabric licenses and capacity (SKU y CU; facturación por segundo con mínimo de un minuto) | Microsoft Learn (oficial) | https://learn.microsoft.com/en-us/fabric/enterprise/licenses | 2026-10-02 | Alta |
| `sf-dc-pricing` | Salesforce Data 360 Pricing (Flex Credits: 500 USD por 100.000; Profiles: 240 USD por 1.000 perfiles al año; Enterprise Profiles: 420 USD) | Salesforce (oficial) | https://www.salesforce.com/data/pricing/ | 2026-10-02 | Alta |
