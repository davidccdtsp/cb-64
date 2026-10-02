---
id: clickhouse
nombre: ClickHouse
dominio: datos
categoria: motor-olap
tipo: hibrido               # oss con oferta gestionada (ClickHouse Cloud) + BYOC
licencia: Apache-2.0
despliegue: [self-hosted, saas, byoc, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 2, confianza: alta,  fuentes: [ch-docs-warehouses, ch-pricing-page] }
  DP-ARQ-02: { nota: 3, confianza: alta,  fuentes: [ch-docs-datalake-support-matrix, ch-docs-datalake-directly, ch-docs-deltalake-function] }
  DP-ARQ-03: { valor: "Sí", confianza: media, fuentes: [ch-docs-datalake-support-matrix, ch-docs-rest-catalog] }
  DP-CAR-01: { nota: 4, confianza: media, fuentes: [clickbench, ch-benchmarks-page] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [ch-docs-kafka-engine] }
  DP-CAR-03: { nota: 2, confianza: media, fuentes: [ch-docs-vector-search] }
  DP-CAR-04: { nota: 3, confianza: media, fuentes: [ch-docs-managed-postgres, ch-github-repo] }
  DP-REN-01: { nota: 2, confianza: alta,  fuentes: [ch-docs-autoscaling, ch-docs-horizontal-autoscaling, ch-pricing-page] }
  DP-REN-02: { valor: "ClickBench (benchmark.clickhouse.com), publicado por el propio fabricante, más de 40 sistemas comparados con metodología y datasets públicos", confianza: media, fuentes: [clickbench, ch-benchmarks-page] }
  DP-REN-03: { valor: "Sí", confianza: media, fuentes: [ch-docs-idling, ch-pricing-page] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [ch-docs-sql-reference, ch-docs-mysql-interface] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [ch-docs-dbt-integration, ch-blog-dbt-platform, ch-docs-integrations] }
  DP-INT-03: { nota: 3, confianza: media, fuentes: [ch-docs-network-transfer, ch-docs-datalake-directly] }
  DP-GOB-01: { nota: 3, confianza: alta,  fuentes: [ch-docs-access-rights, ch-docs-row-policy, ch-docs-rbac] }
  DP-GOB-02: { nota: 2, confianza: media, fuentes: [ch-docs-query-log] }
  DP-GOB-03: { valor: "ISO 27001, SOC 2 Tipo II, HIPAA, PCI (Nivel 1 Service Provider) para ClickHouse Cloud", confianza: alta, fuentes: [ch-docs-compliance, ch-blog-soc2] }
  DP-GOB-04: { valor: "Sí", confianza: alta, fuentes: [ch-legal-dpa] }
  DP-DEP-01: { valor: "self-hosted (Apache-2.0), ClickHouse Cloud (SaaS), BYOC, Kubernetes vía operador oficial de ClickHouse Inc. (u operador de Altinity)", confianza: alta, fuentes: [ch-docs-byoc-architecture, ch-operator-official-github, ch-operator-github] }
  DP-DEP-02: { nota: 3, confianza: alta,  fuentes: [ch-operator-official-github, ch-docs-k8s-operator] }
  DP-DEP-03: { valor: "Sí", confianza: alta, fuentes: [ch-operator-official-github, ch-blog-k8s-operator] }
  DP-ECO-01: { nota: 3, confianza: alta,  fuentes: [ch-blog-2025-roundup, ch-github-repo] }
  DP-ECO-02: { nota: 2, confianza: media, fuentes: [ch-docs-k8s-operator, ch-docs-datalake-support-matrix] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [ch-github-license, osi-apache2] }
  DP-LIC-02: { nota: 4, confianza: media, fuentes: [ch-github-license, ch-blog-apache2] }
  DP-COS-02: { nota: 4, confianza: alta,  fuentes: [ch-pricing-page, ch-docs-pricing-overview] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [ch-docs-sql-reference] }
  DP-IA-02: { nota: 2, confianza: alta,  fuentes: [ch-docs-vector-search] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# ClickHouse

## Resumen

ClickHouse es un motor OLAP columnar de código abierto (Apache-2.0) originado en Yandex y liberado en 2016, orientado a analítica de baja latencia sobre grandes volúmenes de datos[^ch-github-license][^ch-blog-apache2]. Se distribuye en tres modalidades: núcleo self-hosted, oferta gestionada ClickHouse Cloud, y BYOC (gestionado dentro de la cuenta cloud del cliente)[^ch-docs-byoc-architecture].

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 2/5
ClickHouse Cloud factura el almacenamiento por separado del cómputo y lo comparte entre servicios[^ch-pricing-page]. Además, la función *compute-compute separation* («warehouses», planes Scale y Enterprise) permite que varios servicios de cómputo independientes lean y escriban sobre el mismo almacenamiento[^ch-docs-warehouses]. Sin embargo, en *self-hosted* la segregación no es por defecto (MergeTree sobre disco local salvo disco S3 configurado explícitamente). Al estar la separación funcional y multi-cluster disponible fundamentalmente en la oferta gestionada y no en self-hosted por defecto, corresponde el nivel 2 de la rúbrica («Separación disponible solo en la oferta gestionada, no en self-hosted»).

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
La matriz de soporte oficial[^ch-docs-datalake-support-matrix] indica lectura completa de Iceberg y Delta Lake (con *time travel*, *schema evolution* y *deletes*), lectura GA de Hudi y lectura experimental de Paimon. La **escritura** existe en Iceberg (`INSERT`) y en Delta Lake, pero ambas figuran como **Beta** (las operaciones `DELETE`/`ALTER` de Iceberg, como experimentales)[^ch-docs-datalake-support-matrix][^ch-docs-deltalake-function]. 

### DP-ARQ-03 · Catálogo externo compatible · Sí
ClickHouse integra Unity Catalog, AWS Glue, Iceberg REST, Lakekeeper, Nessie, BigLake Metastore, OneLake y SeaweedFS[^ch-docs-datalake-support-matrix][^ch-docs-rest-catalog]. **Matiz:** la documentación marca todas estas integraciones como Beta (Nessie, experimental) y exige activar un ajuste experimental/beta; por eso la confianza es media. Se mantiene «Sí» porque son funcionalidades publicadas y documentadas, no *roadmap*.

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
ClickHouse implementa ejecución vectorizada sobre almacenamiento columnar (familia MergeTree) y un optimizador de consultas, con resultados destacados en **ClickBench**, el banco de pruebas de más de 40 sistemas analíticos mantenido por el propio ClickHouse con metodología y datasets públicos[^clickbench][^ch-benchmarks-page]. Al estar publicado por el propio fabricante, se marca **confianza media** en lugar de alta por el conflicto de interés evidente, aunque la metodología es abierta y reproducible.

### DP-CAR-02 · Streaming / tiempo real · 3/5
La ingesta en streaming se resuelve mediante el motor de tabla `Kafka` nativo, normalmente combinado con una vista materializada que vuelca los mensajes consumidos en una tabla MergeTree persistente[^ch-docs-kafka-engine]. Es un patrón funcional y bien documentado, pero requiere configurar manualmente las tres piezas (motor Kafka + vista materializada + tabla MergeTree); no se ha localizado un SLA de latencia p99 publicado que respalde una puntuación superior, a diferencia de los motores especializados en tiempo real (Druid, Pinot).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 2/5
Nota agregada de DP-IA-01 (sin funciones LLM nativas en SQL) y DP-IA-02 (índice ANN **experimental**[^ch-docs-vector-search]).

### DP-CAR-04 · OLTP / Lakebase · 3/5
El motor ClickHouse es **OLAP**[^ch-github-repo], pero el fabricante ofrece **ClickHouse Managed Postgres** dentro de ClickHouse Cloud, con replicación CDC hacia ClickHouse mediante ClickPipes y extensión `pg_clickhouse`[^ch-docs-managed-postgres]. Es un motor OLTP separado del fabricante cuya sincronización hacia el analítico es explícita (CDC). **Matiz:** el servicio está en *beta* pública.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 2/5
ClickHouse Cloud ofrece autoescalado **vertical** automático en Scale y en Enterprise (según perfil)[^ch-docs-autoscaling][^ch-pricing-page]. El escalado horizontal solo es manual (API/UI) y el **autoescalado horizontal está en *Private Preview***[^ch-docs-horizontal-autoscaling], por lo que no cuenta como disponible. El aislamiento de carga mediante *warehouses*[^ch-docs-warehouses] no compensa la falta de autoescalado horizontal.

### DP-REN-02 · Benchmarks publicados
Ver ClickBench, banco de pruebas propio del fabricante, con metodología y resultados públicos y reproducibles para más de 40 sistemas[^clickbench][^ch-benchmarks-page]. **Conflicto de interés:** publicado y mantenido por ClickHouse, se recomienda contrastar con benchmarks independientes de terceros antes de usar como criterio único de decisión.

### DP-REN-03 · Escala a cero · Sí
La documentación describe el *idling* automático: el servicio se pausa tras un periodo sin consultas y se reanuda al recibir una conexión, sin facturar cómputo mientras está pausado[^ch-docs-idling]; la página de precios lo resume como «*Scale-to-zero stops compute automatically while a service is idle*»[^ch-pricing-page].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
ClickHouse ofrece una referencia SQL amplia[^ch-docs-sql-reference]. Existe compatibilidad de protocolo MySQL, también en Cloud[^ch-docs-mysql-interface]. La compatibilidad con el protocolo PostgreSQL solo está disponible en self-managed, no en Cloud, y únicamente admite contraseñas en texto plano o SCRAM[^ch-docs-postgres-interface]. El dialecto requiere construcciones no estándar de uso normal (p. ej. `ENGINE`/`ORDER BY` obligatorios en `CREATE TABLE`) por lo que la compatibilidad no es completa.

### DP-INT-02 · Conectores y ecosistema · 2/5
Dispone de un adaptador **dbt oficial**, mantenido por ClickHouse y disponible en la dbt Platform[^ch-docs-dbt-integration][^ch-blog-dbt-platform], además de drivers JDBC/ODBC oficiales y un catálogo de integraciones[^ch-docs-integrations], no se ha podido verficiar la certificación de las herramienta según se especifica en la rúbrica. 

### DP-INT-03 · Facilidad de salida de datos · 3/5
Para tablas MergeTree nativas —el caso por defecto— la exportación a Parquet/CSV es estándar vía cláusula `FORMAT`, y el coste de transferencia de red se publica en la documentación de facturación[^ch-docs-network-transfer]. Eventualmente sería posible mejorar la facilidad de salida de datos (datos ya en formato abierto) si el usuario opta por tablas Iceberg/Delta externas, lo cual no suele ser habitual.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 3/5
ClickHouse (self-hosted y Cloud) soporta control de acceso basado en roles (RBAC)[^ch-docs-access-rights], políticas de fila (*row policies*)[^ch-docs-row-policy] y restricciones a nivel de columna vía `GRANT`[^ch-docs-rbac]. No se ha localizado documentación de control basado en atributos (ABAC) dinámico ni enmascaramiento dinámico de columnas.

### DP-GOB-02 · Linaje y auditoría · 2/5
Existen tablas de sistema como `query_log`, consultables con SQL, que permiten reconstruir un registro de auditoría de consultas y accesos[^ch-docs-query-log]. No se ha localizado documentación oficial de una funcionalidad de **linaje de datos** nativa (trazabilidad de transformaciones entre tablas).

### DP-GOB-03 · Certificaciones de seguridad
ClickHouse Cloud dispone de SOC 2 Tipo II, ISO 27001, HIPAA y atestación PCI de Nivel 1 como proveedor de servicios, documentadas en su centro de confianza y blog corporativo[^ch-docs-compliance][^ch-blog-soc2].

### DP-GOB-04 · Residencia de datos en la UE · Sí
El Addendum de Tratamiento de Datos (DPA) de ClickHouse establece contractualmente que los datos personales del cliente solo se alojan en la región seleccionada por el cliente y no se transfieren fuera de ella salvo necesidad operativa razonable u obligación legal[^ch-legal-dpa].

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (núcleo Apache-2.0), ClickHouse Cloud (SaaS gestionado), BYOC (gestionado dentro de la cuenta cloud del cliente)[^ch-docs-byoc-architecture][^ch-blog-byoc-aws], y despliegue en Kubernetes vía el operador oficial de ClickHouse[^ch-operator-official-github] o el de Altinity[^ch-operator-github].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
ClickHouse Inc. publicó en mayo de 2026 su **operador oficial de Kubernetes** (Apache-2.0), que gestiona clústeres ClickHouse y ClickHouse Keeper, con guías de almacenamiento, monitorización, TLS y escalado de réplicas/shards[^ch-operator-official-github][^ch-blog-k8s-operator][^ch-docs-k8s-operator]. No se ha verificado documentación de automatización de *backups*. Sigue existiendo el operador de Altinity, más antiguo y ampliamente adoptado[^ch-operator-github], como alternativa de un socio del ecosistema.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
Sí: existe un operador mantenido por ClickHouse Inc. (`ClickHouse/clickhouse-operator`)[^ch-operator-official-github]. El operador de Altinity[^ch-operator-github] sigue activo pero ya no es el único ni el «oficial».

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
ClickHouse publica una versión open source **mensual**; en 2025 acumuló 277 nuevas funcionalidades, 319 optimizaciones de rendimiento y 1.051 correcciones de errores a lo largo del año, con una comunidad de contribuidores activa[^ch-blog-2025-roundup][^ch-github-repo]. La gobernanza recae en una única empresa (ClickHouse Inc.).

### DP-ECO-02 · Integraciones con el ecosistema de datos · 2/5
Evaluado estrictamente para integraciones de plataforma (orquestadores, observabilidad, catálogos) para evitar el doble conteo de herramientas de consumo como dbt, según exige la rúbrica. El operador oficial incluye una guía de monitorización[^ch-docs-k8s-operator] y los catálogos externos (Unity, Glue, REST) están integrados aunque marcados como Beta[^ch-docs-datalake-support-matrix]. No se ha verificado integración oficial y estable con orquestadores de datos (como Airflow). La presencia de integraciones en estado Beta y la ausencia de orquestador lo sitúan en el nivel 2.

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
No se ha localizado, dentro del alcance de esta revisión, una fuente pública específica (encuesta de adopción, informe de mercado laboral) que permite puntuar este criterio con confianza suficiente.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
El núcleo de ClickHouse se distribuye bajo licencia **Apache License 2.0**[^ch-github-license], aprobada por la Open Source Initiative[^osi-apache2].

### DP-LIC-02 · Estabilidad de la licencia · 4/5
ClickHouse mantiene la licencia Apache-2.0 desde su publicación como proyecto abierto en 2016 (más de 5 años) sin cambios hacia una más restrictiva[^ch-github-license].

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 4/5
ClickHouse Cloud publica una página de precios completa, con la unidad de facturación explicada y ejemplos por tier[^ch-pricing-page][^ch-docs-pricing-overview], **y una calculadora interactiva oficial** en esa misma página (la propia página remite a ella para «una cifra exacta»)[^ch-pricing-page].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
No se ha encontrado, en la referencia SQL oficial revisada, una función equivalente a `SUMMARIZE`/`COMPLETE`/`ai_query` que invoque un modelo de lenguaje directamente desde SQL[^ch-docs-sql-reference]. ClickHouse permite invocar servicios externos vía funciones definidas por el usuario (UDF), pero esto no equivale a una función LLM nativa de primera clase como las de Snowflake Cortex o Databricks `ai_query`.

### DP-IA-02 · Búsqueda vectorial nativa · 2/5
ClickHouse documenta búsqueda exacta y aproximada (ANN); el **índice de similitud vectorial** está disponible desde la versión 25.8 pero sigue marcado con la etiqueta «*Experimental feature*» en la documentación oficial[^ch-docs-vector-search].

### DP-IA-03 · Roadmap público de IA · N/D
No se ha localizado un roadmap de IA específico y diferenciado del roadmap general del producto (visible en GitHub/*release notes*) dentro del alcance de esta revisión.

[^ch-github-license]: ClickHouse (GitHub), «LICENSE», https://github.com/ClickHouse/ClickHouse/blob/master/LICENSE, consultado 2026-09-29.
[^ch-blog-apache2]: Altinity, «ClickHouse is Apache 2.0: Our Commitment to Open Source Licensing», https://altinity.com/blog/clickhouse-is-apache-2-0, consultado 2026-09-29.
[^ch-docs-datalake-directly]: ClickHouse Docs, «Querying open table formats directly», https://clickhouse.com/docs/guides/use-cases/data-warehousing/getting-started/querying-directly#iceberg-table-engine, consultado 2026-09-30.
[^ch-docs-deltalake-function]: ClickHouse Docs, «deltaLake table function», https://clickhouse.com/docs/reference/functions/table-functions/deltalake, consultado 2026-09-29.
[^ch-docs-rest-catalog]: ClickHouse Docs, «REST catalog», https://clickhouse.com/docs/guides/use-cases/data-warehousing/rest-catalog#querying-rest-catalog-tables-using-clickhouse, consultado 2026-09-30.
[^clickbench]: ClickHouse Inc., «ClickBench — a Benchmark For Analytical DBMS», https://benchmark.clickhouse.com/, consultado 2026-09-29.
[^ch-benchmarks-page]: ClickHouse Inc., «ClickHouse benchmarks: Performance, cost & scalability compared», https://clickhouse.com/benchmarks, consultado 2026-09-29.
[^ch-docs-kafka-engine]: ClickHouse Docs, «Using the Kafka table engine» (§ Kafka to ClickHouse), https://clickhouse.com/docs/integrations/connectors/data-ingestion/kafka/kafka-table-engine#kafka-to-clickhouse, consultado 2026-09-30.
[^ch-docs-vector-search]: ClickHouse Docs, «Exact and Approximate Vector Search» (§ Vector Similarity Indexes), https://clickhouse.com/docs/reference/engines/table-engines/mergetree-family/annindexes#vector-similarity-index, consultado 2026-09-30.
[^ch-github-repo]: ClickHouse Inc. (GitHub), repositorio «ClickHouse/ClickHouse», https://github.com/ClickHouse/ClickHouse, consultado 2026-09-29.
[^ch-pricing-page]: ClickHouse Inc., «ClickHouse Cloud Pricing», https://clickhouse.com/pricing, consultado 2026-09-30.
[^ch-docs-pricing-overview]: ClickHouse Docs, «Pricing — Billing overview», https://clickhouse.com/docs/products/cloud/reference/billing/billing-overview, consultado 2026-09-30.
[^ch-docs-sql-reference]: ClickHouse Docs, «SQL Reference», https://clickhouse.com/docs/reference/home, consultado 2026-09-30.
[^ch-docs-dbt-integration]: ClickHouse Docs, «Integrating dbt and ClickHouse», https://clickhouse.com/docs/integrations/connectors/data-ingestion/etl-tools/dbt, consultado 2026-09-30.
[^ch-blog-dbt-platform]: ClickHouse, «ClickHouse is now available on the dbt platform», https://clickhouse.com/blog/clickhouse-is-now-available-on-the-dbt-platform, consultado 2026-09-29.
[^ch-docs-rbac]: ClickHouse Docs (Knowledge Base), «Does ClickHouse support row-level and column-level security?», https://clickhouse.com/docs/resources/support-center/knowledge-base/security/row-column-policy, consultado 2026-09-30.
[^ch-docs-query-log]: ClickHouse Docs, «System table: query_log», https://clickhouse.com/docs/reference/system-tables/query_log#description, consultado 2026-09-30.
[^ch-docs-compliance]: ClickHouse Docs, «Security and compliance reports» (§ SOC 2 Type II, ISO 27001, HIPAA, PCI), https://clickhouse.com/docs/products/cloud/reference/security/compliance-overview#soc-2-type-ii-since-2022, consultado 2026-09-30.
[^ch-blog-soc2]: ClickHouse, «ClickHouse Cloud is now SOC 2 Type II Compliant», https://clickhouse.com/blog/clickhouse-cloud-is-now-soc-2-type-ii-compliant, consultado 2026-09-29.
[^ch-legal-dpa]: ClickHouse Inc., «Customer Data Processing Addendum», https://clickhouse.com/legal/agreements/data-processing-addendum, consultado 2026-09-29.
[^ch-docs-byoc-architecture]: ClickHouse Docs, «BYOC — Architecture», https://clickhouse.com/docs/products/bring-your-own-cloud/overview/architecture#architecture, consultado 2026-09-30.
[^ch-blog-byoc-aws]: ClickHouse, «Building ClickHouse BYOC (Bring Your Own Cloud) on AWS», https://clickhouse.com/blog/building-clickhouse-byoc-on-aws, consultado 2026-09-29.
[^ch-operator-github]: Altinity (GitHub), «Altinity Kubernetes Operator for ClickHouse», https://github.com/altinity/clickhouse-operator, consultado 2026-09-29.
[^ch-blog-2025-roundup]: ClickHouse, «What's new in ClickHouse — 2025 roundup», https://clickhouse.com/blog/clickhouse-2025-roundup, consultado 2026-09-29.
[^osi-apache2]: Open Source Initiative, «Apache License, Version 2.0», https://opensource.org/license/apache-2.0, consultado 2026-09-30.
[^ch-docs-warehouses]: ClickHouse Docs, «Warehouses» (compute-compute separation), https://clickhouse.com/docs/products/cloud/features/infrastructure/warehouses#what-is-compute-compute-separation, consultado 2026-09-30.
[^ch-docs-autoscaling]: ClickHouse Docs, «Automatic scaling» (§ How scaling works in ClickHouse Cloud), https://clickhouse.com/docs/products/cloud/features/autoscaling/overview#how-scaling-works-in-clickhouse-cloud, consultado 2026-09-30.
[^ch-docs-horizontal-autoscaling]: ClickHouse Docs, «Horizontal autoscaling» (estado Private Preview), https://clickhouse.com/docs/products/cloud/features/autoscaling/horizontal-autoscaling, consultado 2026-09-30.
[^ch-docs-idling]: ClickHouse Docs, «Idling» (§ Automatic idling), https://clickhouse.com/docs/products/cloud/features/autoscaling/idling#automatic-idling, consultado 2026-09-30.
[^ch-docs-datalake-support-matrix]: ClickHouse Docs, «Open table format support matrix» (§ Format support; § Catalog support), https://clickhouse.com/docs/guides/use-cases/data-warehousing/support-matrix#format-support, consultado 2026-09-30.
[^ch-docs-managed-postgres]: ClickHouse Docs, «ClickHouse Managed Postgres», https://clickhouse.com/docs/products/managed-postgres/overview, consultado 2026-09-30.
[^ch-docs-mysql-interface]: ClickHouse Docs, «MySQL Interface» (§ Enabling the MySQL interface on ClickHouse Cloud), https://clickhouse.com/docs/concepts/features/interfaces/mysql#enabling-the-mysql-interface-on-clickhouse-cloud, consultado 2026-09-30.
[^ch-docs-postgres-interface]: ClickHouse Docs, «PostgreSQL Interface», https://clickhouse.com/docs/concepts/features/interfaces/postgresql, consultado 2026-09-30.
[^ch-docs-integrations]: ClickHouse Docs, «Integrations» (catálogo por nivel de soporte Core/Partner/Community), https://clickhouse.com/docs/integrations/home, consultado 2026-09-30.
[^ch-docs-network-transfer]: ClickHouse Docs, «Network data transfer billing», https://clickhouse.com/docs/products/cloud/reference/billing/network-data-transfer, consultado 2026-09-30.
[^ch-docs-access-rights]: ClickHouse Docs, «Access control and account management» (§ Role management; § Row policy management), https://clickhouse.com/docs/concepts/features/security/access-rights#role-management, consultado 2026-09-30.
[^ch-docs-row-policy]: ClickHouse Docs, «CREATE ROW POLICY», https://clickhouse.com/docs/reference/statements/create/row-policy#using-clause, consultado 2026-09-30.
[^ch-operator-official-github]: ClickHouse Inc. (GitHub), «ClickHouse/clickhouse-operator — Official Kubernetes Operator for ClickHouse», https://github.com/ClickHouse/clickhouse-operator, consultado 2026-09-30.
[^ch-blog-k8s-operator]: ClickHouse, «Introducing the Official ClickHouse Kubernetes Operator», https://clickhouse.com/blog/clickhouse-kubernetes-operator, consultado 2026-09-30.
[^ch-docs-k8s-operator]: ClickHouse Docs, «ClickHouse Operator» (§ Features), https://clickhouse.com/docs/products/kubernetes-operator/overview#features, consultado 2026-09-30.