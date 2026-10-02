---
id: postgresql-extensiones-analiticas
nombre: PostgreSQL con extensiones analíticas
dominio: datos
categoria: motor-hibrido-extensible
tipo: oss
licencia: "PostgreSQL License (núcleo); varía por extensión — ver detalle"
despliegue: [self-hosted, saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 0, confianza: media, fuentes: [pg-extensions-tigerdata, pglake-github] }
  DP-ARQ-02: { nota: 2, confianza: media, fuentes: [pglake-github] }
  DP-ARQ-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-CAR-01: { nota: 3, confianza: media, fuentes: [pg-docs-planner, pgduckdb-github] }
  DP-CAR-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [pgvector-github] }
  DP-CAR-04: { nota: 5, confianza: alta, fuentes: [pg-web-official] }
  DP-REN-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente que compare PostgreSQL+extensiones analíticas con los motores OLAP de esta base", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No aplica directamente en self-hosted", confianza: n/a, fuentes: [] }
  DP-INT-01: { nota: 4, confianza: media, fuentes: [pg-docs-conformance, pg-docs-protocol] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [dbt-postgres-github, airflow-provider-postgres] }
  DP-INT-03: { nota: 3, confianza: alta, fuentes: [pg-docs-pgdump] }
  DP-GOB-01: { nota: 3, confianza: alta, fuentes: [pg-docs-rls, pg-docs-grant] }
  DP-GOB-02: { nota: 1, confianza: media, fuentes: [pgaudit-github] }
  DP-GOB-03: { valor: "No aplica directamente — depende del proveedor gestionado elegido (RDS, Cloud SQL, Aurora, Crunchy Bridge, etc.), no evaluado aquí", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica directamente en self-hosted", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted; numerosas ofertas gestionadas de terceros (AWS RDS/Aurora, Google Cloud SQL/AlloyDB, Azure Database for PostgreSQL, Crunchy Bridge, Neon, Timescale Cloud, etc.), no evaluadas individualmente en esta ficha", confianza: alta, fuentes: [pg-web-official] }
  DP-DEP-02: { nota: 3, confianza: media, fuentes: [cloudnativepg-official, cncf-cloudnativepg] }
  DP-DEP-03: { valor: "Sí", confianza: alta, fuentes: [cloudnativepg-official, cncf-cloudnativepg] }
  DP-ECO-01: { nota: 5, confianza: media, fuentes: [pg-contributors, pg-versioning] }
  DP-ECO-02: { nota: 2, confianza: media, fuentes: [airflow-provider-postgres, cloudnativepg-official] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [pg-license-official] }
  DP-LIC-02: { nota: 4, confianza: alta, fuentes: [pg-license-official] }
  DP-COS-02: { valor: "No aplica directamente — sin coste de licencia; el coste depende del proveedor gestionado elegido", confianza: n/a, fuentes: [] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [pg-web-official] }
  DP-IA-02: { nota: 4, confianza: alta, fuentes: [pgvector-github] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# PostgreSQL con extensiones analíticas

## Resumen

Este candidato no es un único producto, sino **PostgreSQL** (motor relacional OLTP de referencia, licencia PostgreSQL) combinado con el ecosistema de extensiones que lo dotan de capacidades analíticas: almacenamiento columnar, distribución horizontal, series temporales o motores vectorizados embebidos[^pg-web-official]. **La licencia varía por extensión** y debe verificarse caso a caso antes de adoptar una combinación concreta; esta ficha evalúa el núcleo de PostgreSQL y describe el panorama de extensiones sin evaluarlas todas individualmente con el mismo detalle que un candidato de producto único.

Extensiones citadas en fuentes de referencia consultadas en esta revisión[^pg-extensions-tigerdata]: **TimescaleDB** (series temporales, hipertablas, compresión columnar nativa), **Citus** (distribución horizontal y almacenamiento columnar), **pgvector**/**pgvectorscale** (búsqueda por similitud), **pg_duckdb**/**pg_mooncake** (delegan ejecución analítica al motor vectorizado de DuckDB sobre tablas Postgres), **PostGIS** (geoespacial), **pg_cron** (planificación). Se advierte explícitamente que **pg_analytics** de ParadeDB, una extensión de esta misma familia, fue descontinuada en marzo de 2025[^pg-extensions-tigerdata] — un ejemplo directo de la consolidación/inestabilidad de este ecosistema que cualquier evaluación real debe vigilar.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 0/5
PostgreSQL nativo tiene arquitectura acoplada clásica (cada instancia escribe en su propio almacenamiento). Extensiones como `pg_duckdb`/`pg_mooncake` o `pg_lake` delegan ejecución a DuckDB o leen/escriben ficheros y tablas Iceberg en object storage[^pg-extensions-tigerdata][^pglake-github], pero el almacenamiento de las tablas *heap* sigue acoplado.

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 2/5
La extensión `pg_lake` (Snowflake, Apache-2.0) permite crear y modificar tablas **Iceberg** desde PostgreSQL con garantías transaccionales, consultarlas desde otros motores, y leer/importar/exportar ficheros Parquet, CSV y JSON en object storage, apoyándose en DuckDB[^pglake-github].

### DP-ARQ-03 · N/D

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 3/5
SQL completo con planificador basado en costes documentado[^pg-docs-planner], adecuado para BI estándar. El motor de fila nativo no está optimizado para escaneos analíticos masivos, y las extensiones columnar/vectorizadas (`pg_duckdb`, Citus, TimescaleDB) lo mitigan[^pgduckdb-github]. 

### DP-CAR-02 · N/D

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Nota agregada: DP-IA-02 (`pgvector`: búsqueda exacta y aproximada con HNSW/IVFFlat, más de 23.000 estrellas en GitHub)[^pgvector-github] resuelto con solidez;

### DP-CAR-04 · OLTP / Lakebase · 5/5
Motor OLTP maduro: la base sobre la que se construyen Neon/Lakebase y Snowflake Postgres/Crunchy Data (ver `estado-del-arte/datos/estado-del-arte.md`)[^pg-web-official].
## Rendimiento y escalabilidad

### DP-REN-01 a DP-REN-03 · N/D o no aplica
Depende completamente de qué extensiones y qué proveedor gestionado se elijan; no se ha evaluado un caso concreto en esta ficha.

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 4/5
El apéndice de conformidad SQL del propio proyecto documenta qué características del estándar soporta[^pg-docs-conformance], y el protocolo cliente-servidor está documentado públicamente[^pg-docs-protocol].

### DP-INT-02 · Conectores y ecosistema · 2/5
Adaptador `dbt-postgres` mantenido por dbt Labs[^dbt-postgres-github], proveedor oficial de Apache Airflow[^airflow-provider-postgres] y drivers estándar (libpq, JDBC, ODBC).

### DP-INT-03 · Facilidad de salida de datos · 3/5
`pg_dump` permite exportar la totalidad de una base de datos en SQL plano o formatos binarios portables[^pg-docs-pgdump], y los datos residen en el almacenamiento del propio cliente (self-hosted); el coste de egress depende del proveedor gestionado elegido.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 3/5
PostgreSQL nativo incluye *Row Level Security* (RLS), con políticas definidas vía `CREATE POLICY`[^pg-docs-rls], y control de acceso a nivel de columna vía `GRANT`[^pg-docs-grant].

### DP-GOB-02 · Linaje y auditoría · 1/5
La extensión `pgaudit` (mantenida por la comunidad) registra auditoría detallada de sesiones y objetos en el registro del servidor[^pgaudit-github]; no hay linaje nativo ni interfaz de consulta de los registros.

### DP-GOB-03 / DP-GOB-04
No aplican al núcleo self-hosted; dependen del proveedor gestionado elegido.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted, o cualquiera de las numerosas ofertas gestionadas (AWS RDS/Aurora, Google Cloud SQL/AlloyDB, Azure Database for PostgreSQL, Crunchy Bridge, Neon, Timescale Cloud...), no evaluadas individualmente aquí[^pg-web-official].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
CloudNativePG (proyecto CNCF en nivel *Sandbox* desde enero de 2025[^cncf-cloudnativepg]) automatiza el ciclo de vida de un clúster PostgreSQL con alta disponibilidad y escalado de réplicas[^cloudnativepg-official].

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
**CloudNativePG**, creado por EnterpriseDB, fue aceptado en el CNCF en enero de 2025 en el nivel *Sandbox*[^cncf-cloudnativepg].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 5/5
Desarrollado por el **PostgreSQL Global Development Group** (comunidad independiente de un único fabricante), con perfiles públicos de contribuidores[^pg-contributors] y una política de versiones con lanzamientos mayores anuales y soporte de cada rama documentado[^pg-versioning]; más de 25 años de historia[^pg-web-official].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 2/5
Proveedor de Airflow[^airflow-provider-postgres] y operador Kubernetes CloudNativePG[^cloudnativepg-official]. Se excluye el adaptador dbt para evitar el doble conteo con DP-INT-02.

### DP-ECO-03 · N/D

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
La licencia PostgreSQL es una licencia permisiva de tipo BSD/MIT, publicada oficialmente por el PostgreSQL Global Development Group[^pg-license-official]. **Importante:** las extensiones analíticas no comparten necesariamente esta licencia (p. ej. algunas ofertas empresariales de Citus/TimescaleDB combinan componentes bajo licencias distintas); se recomienda verificar cada extensión individualmente antes de adoptarla.

### DP-LIC-02 · Estabilidad de la licencia · 4/5
La página oficial presenta la licencia PostgreSQL (permisiva, tipo BSD/MIT) con *copyright* «1996-2026, The PostgreSQL Global Development Group»[^pg-license-official]: más de 25 años sin cambios.

## Coste

### DP-COS-02 · No aplica directamente
Sin coste de licencia del núcleo; el coste depende íntegramente del proveedor gestionado o la infraestructura self-hosted elegida.

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
El núcleo de PostgreSQL no incluye funciones SQL que invoquen un LLM[^pg-web-official]; existen extensiones de terceros no evaluadas aquí. Confianza media (ausencia).

### DP-IA-02 · Búsqueda vectorial nativa · 4/5
`pgvector` ofrece búsqueda exacta y aproximada de vecinos más cercanos con índices HNSW e IVFFlat, dentro de PostgreSQL y sin base de datos vectorial aparte[^pgvector-github]; `pgvectorscale` amplía con un índice de disco, según el blog de Tiger Data[^pg-extensions-tigerdata].

### DP-IA-03 · N/D

[^pg-extensions-tigerdata]: Tiger Data (Timescale) Blog, «Best PostgreSQL Extensions for Analytics Workloads», https://www.tigerdata.com/learn/postgresql-extensions-for-analytics, consultado 2026-09-29.
[^pg-web-official]: PostgreSQL Global Development Group, web oficial, https://www.postgresql.org/, consultado 2026-09-29.
[^pg-docs-pgdump]: PostgreSQL Docs, «pg_dump», https://www.postgresql.org/docs/current/app-pgdump.html, consultado 2026-09-29.
[^pg-docs-rls]: PostgreSQL Docs, «Row Security Policies», https://www.postgresql.org/docs/current/ddl-rowsecurity.html, consultado 2026-09-29.
[^pg-docs-grant]: PostgreSQL Docs, «GRANT», https://www.postgresql.org/docs/current/sql-grant.html, consultado 2026-09-29.
[^cloudnativepg-official]: CloudNativePG, web oficial, https://cloudnative-pg.io/, consultado 2026-09-30.
[^pg-license-official]: PostgreSQL Global Development Group, «The PostgreSQL Licence», https://www.postgresql.org/about/licence/, consultado 2026-09-30.
[^pglake-github]: Snowflake-Labs (GitHub), «pg_lake: Postgres for Iceberg and Data lakes» (Apache-2.0), https://github.com/Snowflake-Labs/pg_lake, consultado 2026-09-30.
[^pgduckdb-github]: DuckDB (GitHub), «pg_duckdb», https://github.com/duckdb/pg_duckdb, consultado 2026-09-30.
[^pg-docs-planner]: PostgreSQL Docs, «Planner/Optimizer», https://www.postgresql.org/docs/current/planner-optimizer.html, consultado 2026-09-30.
[^pgvector-github]: pgvector (GitHub), «pgvector: open-source vector similarity search for Postgres», https://github.com/pgvector/pgvector, consultado 2026-09-30.
[^pg-docs-conformance]: PostgreSQL Docs, «SQL Conformance» (§ Supported features), https://www.postgresql.org/docs/current/features.html, consultado 2026-09-30.
[^pg-docs-protocol]: PostgreSQL Docs, «Frontend/Backend Protocol», https://www.postgresql.org/docs/current/protocol.html, consultado 2026-09-30.
[^dbt-postgres-github]: dbt Labs (GitHub), «dbt-postgres», https://github.com/dbt-labs/dbt-adapters/tree/main/dbt-postgres, consultado 2026-09-30.
[^airflow-provider-postgres]: Apache Airflow, «apache-airflow-providers-postgres», https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/index.html, consultado 2026-09-30.
[^pgaudit-github]: pgaudit (GitHub), «PostgreSQL Audit Extension», https://github.com/pgaudit/pgaudit, consultado 2026-09-30.
[^cncf-cloudnativepg]: CNCF, «CloudNativePG» (aceptado el 21-ene-2025, nivel Sandbox), https://www.cncf.io/projects/cloudnativepg/, consultado 2026-09-30.
[^pg-contributors]: PostgreSQL, «Contributor Profiles», https://www.postgresql.org/community/contributors/, consultado 2026-09-30.
[^pg-versioning]: PostgreSQL, «Versioning Policy», https://www.postgresql.org/support/versioning/, consultado 2026-09-30.