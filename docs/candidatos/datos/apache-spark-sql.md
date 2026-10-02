---
id: apache-spark-sql
nombre: Apache Spark SQL
dominio: datos
categoria: motor-batch-etl
tipo: oss
licencia: Apache-2.0
despliegue: [self-hosted, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: media, fuentes: [spark-docs-job-scheduling, spark-docs-k8s] }
  DP-ARQ-02: { nota: 4, confianza: alta, fuentes: [iceberg-docs-spark-writes, iceberg-docs-spark-queries, delta-docs-batch] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [iceberg-docs-spark-config] }
  DP-CAR-01: { nota: 3, confianza: media, fuentes: [spark-sql-guide] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [spark-docs-structured-streaming] }
  DP-CAR-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-CAR-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-REN-01: { nota: 4, confianza: media, fuentes: [spark-docs-job-scheduling] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente que aísle Spark SQL puro (frente a Databricks/Photon) en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No aplica directamente — depende del orquestador de despliegue (Kubernetes/YARN)", confianza: n/a, fuentes: [] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [spark-docs-ansi, spark-docs-thrift] }
  DP-INT-02: { nota: 3, confianza: media, fuentes: [spark-github-dbt, airflow-provider-spark, spark-docs-thrift] }
  DP-INT-03: { nota: 5, confianza: alta, fuentes: [spark-sql-guide] }
  DP-GOB-01: { nota: 0, confianza: media, fuentes: [spark-docs-security] }
  DP-GOB-02: { nota: 1, confianza: media, fuentes: [spark-docs-security] }
  DP-GOB-03: { valor: "No aplica directamente — depende de dónde y cómo se despliegue", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica directamente en self-hosted", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted (standalone, YARN, Kubernetes nativo y operador oficial); disponible también como motor gestionado en otros servicios (p. ej. Databricks, AWS EMR, Google Dataproc)", confianza: media, fuentes: [spark-docs-k8s, spark-k8s-operator-official] }
  DP-DEP-02: { nota: 3, confianza: alta, fuentes: [spark-k8s-operator-official] }
  DP-DEP-03: { valor: "Sí", confianza: alta, fuentes: [spark-k8s-operator-official] }
  DP-ECO-01: { nota: 5, confianza: alta, fuentes: [github-spark-contributors, spark-web] }
  DP-ECO-02: { nota: 5, confianza: alta, fuentes: [spark-github-dbt] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [spark-github-license, osi-apache2] }
  DP-LIC-02: { nota: 5, confianza: media, fuentes: [spark-github-license] }
  DP-COS-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Apache Spark SQL

## Resumen

Apache Spark SQL es el módulo de consulta estructurada de Apache Spark, el motor de procesamiento distribuido de propósito general (batch y streaming) más extendido del ecosistema de datos. Es un proyecto de la Apache Software Foundation, licenciado Apache-2.0. En esta base documental se evalúa como motor de consulta/ETL self-hosted; Databricks (ficha separada) es la principal oferta gestionada construida sobre él, con Photon como motor de ejecución adicional.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Spark no impone almacenamiento propio: lee y escribe de sistemas externos (HDFS, S3, ADLS…), de modo que el cómputo se redimensiona sin mover datos y varias aplicaciones o clústeres Spark independientes pueden leer el mismo almacenamiento[^spark-docs-job-scheduling][^spark-docs-k8s]. 

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 4/5
Lectura y escritura de Apache Iceberg (incluidos `MERGE INTO`, sobrescritura dinámica y *time travel* con SQL)[^iceberg-docs-spark-writes][^iceberg-docs-spark-queries] y de Delta Lake mediante el paquete Delta (*time travel*, validación de esquema)[^delta-docs-batch]. 

### DP-ARQ-03 · Catálogo externo compatible · Sí
Spark se conecta a catálogos Iceberg de tipo Hive Metastore, Hadoop, REST, Glue, JDBC y Nessie mediante su configuración de catálogos[^iceberg-docs-spark-config]. (La fuente anterior, un blog de Databricks, no documentaba Spark de código abierto.)

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 3/5
Catalyst optimizer y ejecución en DataFrames; adecuado para BI batch, aunque su latencia interactiva suele ser mayor que la de un motor MPP nativo sin capas adicionales como Photon[^spark-sql-guide].

### DP-CAR-02 · Streaming / tiempo real · 3/5
Structured Streaming ofrece ingesta nativa en streaming unificada con batch (ver `estado-del-arte/datos/estado-del-arte.md`, sección «Unificación batch/streaming»)[^spark-docs-structured-streaming].

### DP-CAR-03 / DP-CAR-04 · N/D
Sin fuente verificada en esta revisión sobre búsqueda vectorial nativa u LLM en SQL; Spark dispone de MLlib (no evaluada aquí). Spark no es, por diseño, un motor transaccional.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
Asignación dinámica de recursos: Spark ajusta automáticamente el número de ejecutores según la carga[^spark-docs-job-scheduling], con aislamiento entre aplicaciones independientes que comparten datos. 

### DP-REN-02 / DP-REN-03 · N/D o no aplica

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
Dialecto Spark SQL con **modo ANSI activado por defecto** (`spark.sql.ansi.enabled=true`) en la documentación vigente[^spark-docs-ansi], y servidor Thrift JDBC/ODBC correspondiente a HiveServer2[^spark-docs-thrift]. 

### DP-INT-02 · Conectores y ecosistema · 3/5
`dbt-spark` está mantenido por dbt Labs[^spark-github-dbt]; además existe un proveedor oficial de Apache Airflow para Spark[^airflow-provider-spark] y un servidor JDBC/ODBC para herramientas de BI[^spark-docs-thrift].

### DP-INT-03 · Facilidad de salida de datos · 5/5
Al no poseer almacenamiento propio, los datos siempre residen en el sistema de origen en formato abierto[^spark-sql-guide].

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 0/5
Spark incluye autenticación y ACL sobre la interfaz web, el *history server* y la modificación de trabajos[^spark-docs-security], pero no control de acceso granular a datos (tabla/columna/fila); esa gobernanza se delega en el catálogo o en sistemas externos como Apache Ranger, no evaluados aquí.

### DP-GOB-02 · Linaje y auditoría · 1/5
Registros de eventos de aplicación consultables con el *history server*, sin linaje de datos[^spark-docs-security]. Nivel 1 («logs técnicos»).

### DP-GOB-03 / DP-GOB-04
No aplican: proyecto OSS sin oferta gestionada propia.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (modo *standalone*, YARN, Kubernetes nativo[^spark-docs-k8s] y operador oficial[^spark-k8s-operator-official]); también disponible como motor gestionado en servicios de terceros (Databricks, AWS EMR, Google Dataproc), no verificados aquí.

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
Soporte nativo de Kubernetes[^spark-docs-k8s] más el **Spark Kubernetes Operator**, subproyecto oficial de Apache Spark con *Helm chart* propio, que gestiona el ciclo de vida de las aplicaciones Spark (recurso `SparkApplication`)[^spark-k8s-operator-official]. Nivel 3 (operador oficial del proyecto). Se baja de 4 a 3: el nivel 4 exige automatización de *backups*/HA documentada, y la documentación del operador no la describe; la fecha «mayo de 2025» de la versión anterior no se ha podido reverificar.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
El Spark Kubernetes Operator es un subproyecto oficial de Apache Spark, con Helm chart propio publicado por el proyecto[^spark-k8s-operator-official].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 5/5
Proyecto de la ASF con 44.089 estrellas, 29.400 *forks* y 3.613 contribuidores (incluidos anónimos) según la API pública de GitHub, con actividad el mismo día de esta consulta[^github-spark-contributors][^spark-web]. 

### DP-ECO-02 · Integraciones con el ecosistema de datos · 5/5
Integración con dbt[^spark-github-dbt], Airflow[^airflow-provider-spark], catálogos Iceberg (REST, Hive, Glue, Nessie)[^iceberg-docs-spark-config] y Delta Lake[^delta-docs-batch]. 

### DP-ECO-03 · N/D

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Apache License 2.0, según el fichero `LICENSE` del repositorio[^spark-github-license], aprobada por la OSI[^osi-apache2].

### DP-LIC-02 · Estabilidad de la licencia · 5/5
Apache-2.0 bajo la ASF desde 2013 sin cambios documentados[^spark-github-license]: más de 5 años de estabilidad y gobernanza de fundación neutral (compromiso institucional de la ASF).

## Coste

### DP-COS-02 · N/D
No aplica un modelo de precios propio del proyecto (el coste depende de la infraestructura o de la oferta gestionada elegida, p. ej. Databricks o EMR, ya evaluadas como candidatos separados).

## IA y roadmap

### DP-IA-01 a DP-IA-03 · N/D

[^spark-sql-guide]: Apache Spark Docs, «Spark SQL Programming Guide», https://spark.apache.org/docs/latest/sql-programming-guide.html, consultado 2026-09-30.
[^spark-github-dbt]: dbt Labs (GitHub), «dbt-spark», https://github.com/dbt-labs/dbt-spark, consultado 2026-09-29.
[^spark-k8s-operator-official]: Apache Spark, «Apache Spark K8s Operator» (subproyecto de Spark), https://apache.github.io/spark-kubernetes-operator/, consultado 2026-09-30.
[^spark-docs-job-scheduling]: Apache Spark Docs, «Job Scheduling» (§ Dynamic Resource Allocation), https://spark.apache.org/docs/latest/job-scheduling.html#dynamic-resource-allocation, consultado 2026-09-30.
[^spark-docs-k8s]: Apache Spark Docs, «Running Spark on Kubernetes» (§ Cluster mode), https://spark.apache.org/docs/latest/running-on-kubernetes.html#cluster-mode, consultado 2026-09-30.
[^iceberg-docs-spark-writes]: Apache Iceberg Docs, «Spark Writes» (§ MERGE INTO), https://iceberg.apache.org/docs/latest/spark-writes/#merge-into, consultado 2026-09-30.
[^iceberg-docs-spark-queries]: Apache Iceberg Docs, «Spark Queries» (§ Time travel queries with SQL), https://iceberg.apache.org/docs/latest/spark-queries/#time-travel-queries-with-sql, consultado 2026-09-30.
[^iceberg-docs-spark-config]: Apache Iceberg Docs, «Spark Configuration» (§ Catalogs), https://iceberg.apache.org/docs/latest/spark-configuration/#catalogs, consultado 2026-09-30.
[^delta-docs-batch]: Delta Lake Docs, «Table batch reads and writes» (§ Query an older snapshot / time travel), https://docs.delta.io/delta-batch/#query-an-older-snapshot-of-a-table-time-travel, consultado 2026-09-30.
[^spark-docs-structured-streaming]: Apache Spark Docs, «Structured Streaming Programming Guide», https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html, consultado 2026-09-30.
[^spark-docs-ansi]: Apache Spark Docs, «ANSI Compliance», https://spark.apache.org/docs/latest/sql-ref-ansi-compliance.html, consultado 2026-09-30.
[^spark-docs-thrift]: Apache Spark Docs, «Distributed SQL Engine» (§ Running the Thrift JDBC/ODBC server), https://spark.apache.org/docs/latest/sql-distributed-sql-engine.html#running-the-thrift-jdbcodbc-server, consultado 2026-09-30.
[^airflow-provider-spark]: Apache Airflow, «apache-airflow-providers-apache-spark», https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html, consultado 2026-09-30.
[^spark-docs-security]: Apache Spark Docs, «Security» (§ Authentication and authorization; § Spark History Server ACLs), https://spark.apache.org/docs/latest/security.html#authentication-and-authorization, consultado 2026-09-30.
[^spark-web]: Apache Spark, web oficial, https://spark.apache.org/, consultado 2026-09-30.
[^github-spark-contributors]: GitHub API, «apache/spark» (estrellas, forks y contribuidores), https://api.github.com/repos/apache/spark, consultado 2026-09-30.
[^spark-github-license]: Apache Spark (GitHub), «LICENSE», https://github.com/apache/spark/blob/master/LICENSE, consultado 2026-09-30.
[^osi-apache2]: Open Source Initiative, «Apache License, Version 2.0», https://opensource.org/license/apache-2.0, consultado 2026-09-30.