---
id: duckdb
nombre: DuckDB
dominio: datos
categoria: motor-embebido
tipo: oss
licencia: MIT
despliegue: [embebido]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { valor: "No aplica — motor embebido en el propio proceso, sin arquitectura cliente-servidor ni separación almacenamiento/cómputo en red", confianza: n/a, fuentes: [duckdb-sigmod-paper] }
  DP-ARQ-02: { nota: 4, confianza: media, fuentes: [duckdb-docs-iceberg-rest, duckdb-blog-delta-writes, duckdb-docs-delta] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [duckdb-docs-iceberg-rest] }
  DP-CAR-01: { nota: 4, confianza: media, fuentes: [duckdb-sigmod-paper, duckdb-org-100] }
  DP-CAR-02: { nota: 0, confianza: alta, fuentes: [duckdb-sigmod-paper] }
  DP-CAR-03: { nota: 2, confianza: alta, fuentes: [duckdb-docs-vss] }
  DP-CAR-04: { nota: 0, confianza: alta, fuentes: [duckdb-sigmod-paper] }
  DP-REN-01: { nota: 0, confianza: alta, fuentes: [duckdb-docs-concurrency, duckdb-blog-quack] }
  DP-REN-02: { valor: "ClickBench incluye a DuckDB entre los más de 40 sistemas comparados (publicado por ClickHouse, ver ficha de ClickHouse)", confianza: media, fuentes: [clickbench] }
  DP-REN-03: { valor: "No aplica — motor embebido de un solo proceso, sin concepto de cómputo persistente que suspender", confianza: n/a, fuentes: [duckdb-sigmod-paper] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [duckdb-docs-sql-intro] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [md-github-dbt-duckdb, duckdb-docs-clients] }
  DP-INT-03: { nota: 5, confianza: alta, fuentes: [duckdb-docs-export] }
  DP-GOB-01: { valor: "No aplica — motor embebido de un solo proceso/usuario, sin gestión de usuarios remota", confianza: n/a, fuentes: [] }
  DP-GOB-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-GOB-03: { valor: "No aplica — sin oferta SaaS propia del proyecto (ver MotherDuck como candidato gestionado aparte)", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica — se ejecuta dentro del proceso y la máquina del propio cliente", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Embebido (librería en el proceso host: CLI, Python, R, Node, WASM, etc.); sin servidor ni contenedor propio que desplegar. Protocolo cliente-servidor Quack en beta (mayo de 2026)", confianza: alta, fuentes: [duckdb-docs-clients, duckdb-blog-quack] }
  DP-DEP-02: { valor: "No aplica — no hay clúster que operar", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica", confianza: n/a, fuentes: [] }
  DP-ECO-01: { nota: 3, confianza: alta, fuentes: [duckdb-foundation, duckdb-org-100] }
  DP-ECO-02: { nota: 3, confianza: media, fuentes: [duckdb-docs-iceberg-rest, duckdb-blog-delta-writes, md-github-dbt-duckdb] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [duckdb-github-license, osi-mit] }
  DP-LIC-02: { nota: 5, confianza: alta, fuentes: [duckdb-foundation] }
  DP-COS-02: { valor: "No aplica — sin coste de licencia ni de servicio", confianza: n/a, fuentes: [] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [duckdb-docs-core-extensions] }
  DP-IA-02: { nota: 2, confianza: alta, fuentes: [duckdb-docs-vss] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# DuckDB

## Resumen

DuckDB (2019, MIT) es un motor analítico *embebido/in-process*: se ejecuta como una librería enlazada dentro del proceso de la aplicación (CLI, Python, R, Node, WASM), sin servidor ni proceso externo (ver `estado-del-arte/datos/estado-del-arte.md`, sección "Motores embebidos"). Muchos criterios de la rúbrica —pensados para motores cliente-servidor multiusuario— **no aplican** directamente a este candidato; se marcan como tal en lugar de puntuarse a la baja, siguiendo el principio 2 de [`../../01-metodologia.md`](../../01-metodologia.md#2-principios-de-diseño).

## Arquitectura

### DP-ARQ-01 · No aplica
Sin arquitectura cliente-servidor: el propio proceso host es el «cómputo» y el fichero/local disk (o el object store consultado directamente) es el «almacenamiento», tal como describe el paper de diseño de DuckDB[^duckdb-sigmod-paper]. Desde mayo de 2026 existe el protocolo cliente-servidor **Quack**, en beta[^duckdb-blog-quack]; no cambia la valoración actual.

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 4/5
Iceberg: lectura con *time travel* y, al adjuntar un catálogo REST, `INSERT`, `UPDATE` y `DELETE` (solo *merge-on-read* con *positional deletes*; sin escrituras en tablas v3)[^duckdb-docs-iceberg-rest][^duckdb-docs-iceberg]. Delta: desde mayo de 2026 la extensión ha perdido la etiqueta *experimental* y ofrece `INSERT` atómico y *time travel* (aún sin `UPDATE`/`MERGE`/`DELETE`)[^duckdb-blog-delta-writes]. Además, DuckLake v1.0 (abril de 2026) es formato propio para producción[^duckdb-docs-concurrency].

### DP-ARQ-03 · Catálogo externo compatible · Sí
Catálogos REST de Iceberg, incluidos Amazon S3 Tables, AWS Glue (SageMaker Lakehouse), Unity Catalog, Cloudflare R2, Polaris y Lakekeeper[^duckdb-docs-iceberg-rest]; además soporte de Unity Catalog para Delta[^duckdb-blog-delta-writes].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Motor columnar vectorizado de tipo *push-based*, con SQL amplio[^duckdb-sigmod-paper]. Nivel 4 (SQL completo + ejecución vectorizada documentada). Las fuentes citadas solo describen un «crecimiento asombroso» sin cifras[^duckdb-org-100], y el ranking de ClickBench es del competidor.

### DP-CAR-02 · Streaming / tiempo real · 0/5
Diseñado explícitamente como motor de consulta embebido bajo demanda, no como sistema de servicio continuo con ingesta de flujos[^duckdb-sigmod-paper].

### DP-CAR-03 · ML/IA y búsqueda vectorial · 2/5
Nota agregada: DP-IA-01 ausente (sin función LLM en el núcleo) y DP-IA-02 con índice ANN HNSW **experimental** (extensión `vss`)[^duckdb-docs-vss].

### DP-CAR-04 · OLTP / Lakebase · 0/5
DuckDB se define y diseña explícitamente como base de datos *analítica* embebida, no como motor transaccional multiusuario[^duckdb-sigmod-paper].

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 0/5
En modo lectura-escritura solo un proceso puede escribir (varios hilos con MVCC y control optimista dentro de ese proceso); varios procesos solo pueden leer en modo solo lectura[^duckdb-docs-concurrency]. No hay autoescalado ni aislamiento entre usuarios. El protocolo Quack (beta) permitirá varios escritores concurrentes cuando madure[^duckdb-blog-quack].ç

### DP-REN-02 · Benchmarks publicados
Incluido en ClickBench, benchmark propio de ClickHouse (ver ficha de ClickHouse para la nota de conflicto de interés)[^clickbench].

### DP-REN-03 · No aplica
Consecuencia directa de su naturaleza embebida y de un solo proceso[^duckdb-sigmod-paper].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
SQL amplio con extensiones propias documentadas en la referencia oficial[^duckdb-docs-sql-intro]. No se ha localizado compatibilidad de protocolo con otro motor (p. ej. PostgreSQL).

### DP-INT-02 · Conectores y ecosistema · 2/5
`dbt-duckdb` (repositorio de la organización `duckdb`), con soporte directo de MotherDuck y DuckLake[^md-github-dbt-duckdb], y clientes oficiales para múltiples lenguajes[^duckdb-docs-clients]. Carecer de orquestador oficial y de herramientas de BI certificadas verificadas.

### DP-INT-03 · Facilidad de salida de datos · 5/5
Exportación nativa a Parquet/CSV documentada; los datos consultados residen en ficheros estándar o en las fuentes externas consultadas, no en un formato propietario cerrado[^duckdb-docs-export].

## Gobierno y seguridad

### DP-GOB-01 a DP-GOB-04 · No aplica
Sin usuarios remotos, sin oferta SaaS propia del proyecto y sin residencia de datos que gestionar: el motor vive dentro del proceso y la máquina del cliente.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Librería embebida disponible para múltiples lenguajes y entornos (CLI, Python, R, Java, Node.js, WASM, etc.), documentados en la referencia oficial de APIs de cliente[^duckdb-docs-clients]; no requiere desplegar un servidor.

### DP-DEP-02 / DP-DEP-03 · No aplica

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
La **DuckDB Foundation** (consejo de tres investigadores, incluidos los dos creadores) declara que DuckDB, DuckLake y Quack «son y seguirán siendo» MIT y se financia con cuotas de miembros (AWS, MotherDuck y Posit en el nivel Gold)[^duckdb-foundation], lo cual limita la neutralidad de dicha fundación. DuckDB Labs, la empresa que emplea a los desarrolladores principales, no ha recibido inversión externa[^duckdb-org-100].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 3/5
Adaptador dbt[^md-github-dbt-duckdb], escritura/lectura en catálogos REST de Iceberg y Unity Catalog[^duckdb-docs-iceberg-rest][^duckdb-blog-delta-writes] y adopción como motor embebido por terceros (ver `estado-del-arte/datos/estado-del-arte.md`).

### DP-ECO-03 · N/D

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Licencia MIT, según el fichero `LICENSE` del repositorio[^duckdb-github-license], aprobada por la OSI[^osi-mit]. (Sustituye la fuente anterior, Wikipedia, de jerarquía baja.)

### DP-LIC-02 · Estabilidad de la licencia · 5/5
La DuckDB Foundation declara públicamente que DuckDB seguirá distribuyéndose bajo la licencia MIT[^duckdb-foundation]: compromiso explícito de una fundación sobre más de 5 años de licencia estable[^duckdb-org-100].

## Coste

### DP-COS-02 · No aplica
Sin coste de licencia ni de servicio: el único coste es el de la máquina donde se ejecuta el proceso host.

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
No figura ninguna función de invocación de LLM entre las extensiones núcleo de DuckDB[^duckdb-docs-core-extensions]; existen extensiones comunitarias no evaluadas aquí. Confianza media (demostrar una ausencia es más débil).

### DP-IA-02 · Búsqueda vectorial nativa · 2/5
La extensión `vss` añade índices HNSW sobre el tipo `ARRAY` de tamaño fijo, pero está marcada como **experimental**; la persistencia de los índices exige activar una opción experimental porque la recuperación por WAL no está implementada[^duckdb-docs-vss]. Nivel 2 (ANN experimental). Antes 1/5 citando la documentación de otro producto (MotherDuck).

### DP-IA-03 · N/D

[^duckdb-docs-iceberg]: DuckDB Docs, «Iceberg Extension» (LTS), https://duckdb.org/docs/lts/core_extensions/iceberg/overview#limitations, consultado 2026-09-30.
[^duckdb-docs-delta]: DuckDB Docs, «Delta Extension» (LTS), https://duckdb.org/docs/lts/core_extensions/delta#features, consultado 2026-09-30.
[^duckdb-docs-iceberg-rest]: DuckDB Docs, «Iceberg REST Catalogs» (§ Supported operations; § Specific catalog examples), https://duckdb.org/docs/lts/core_extensions/iceberg/iceberg_rest_catalogs#supported-operations, consultado 2026-09-30.
[^clickbench]: ClickHouse Inc., «ClickBench — a Benchmark For Analytical DBMS», https://benchmark.clickhouse.com/, consultado 2026-09-29.
[^md-github-dbt-duckdb]: DuckDB Labs (GitHub), «dbt-duckdb», https://github.com/duckdb/dbt-duckdb, consultado 2026-09-29.
[^duckdb-foundation]: DuckDB Foundation, web oficial, https://duckdb.foundation/, consultado 2026-09-29.
[^duckdb-org-100]: DuckDB Blog, «Announcing DuckDB 1.0.0», https://duckdb.org/2024/06/03/announcing-duckdb-100, consultado 2026-09-30.
[^duckdb-sigmod-paper]: M. Raasveldt, H. Mühleisen, «DuckDB: an Embeddable Analytical Database», SIGMOD 2019, https://ir.cwi.nl/pub/28800/28800.pdf, consultado 2026-09-29.
[^duckdb-docs-sql-intro]: DuckDB Docs, «SQL Introduction», https://duckdb.org/docs/sql/introduction, consultado 2026-09-29.
[^duckdb-docs-export]: DuckDB Docs, «Export to Parquet/CSV», https://duckdb.org/docs/guides/file_formats/parquet_export, consultado 2026-09-29.
[^duckdb-docs-clients]: DuckDB Docs, «Client APIs Overview», https://duckdb.org/docs/api/overview, consultado 2026-09-29.
[^duckdb-blog-delta-writes]: DuckDB Blog, «Delta Grows Up: Writes, Unity Catalog and Time Travel» (7-may-2026), https://duckdb.org/2026/05/07/delta-uc-updates#building-up-the-delta-lake-writes, consultado 2026-09-30.
[^duckdb-docs-vss]: DuckDB Docs, «Vector Similarity Search Extension» (§ Persistence), https://duckdb.org/docs/lts/core_extensions/vss#persistence, consultado 2026-09-30.
[^duckdb-docs-concurrency]: DuckDB Docs, «Concurrency» (§ Handling concurrency), https://duckdb.org/docs/current/connect/concurrency#handling-concurrency, consultado 2026-09-30.
[^duckdb-blog-quack]: DuckDB Blog, «Quack: The DuckDB Client-Server Protocol» (12-may-2026), https://duckdb.org/2026/05/12/quack-remote-protocol, consultado 2026-09-30.
[^duckdb-github-license]: DuckDB (GitHub), «LICENSE», https://github.com/duckdb/duckdb/blob/main/LICENSE, consultado 2026-09-30.
[^osi-mit]: Open Source Initiative, «The MIT License», https://opensource.org/license/mit, consultado 2026-09-30.
[^duckdb-docs-core-extensions]: DuckDB Docs, «Core Extensions» (LTS), https://duckdb.org/docs/lts/core_extensions/overview, consultado 2026-09-30.
