---
id: redshift
nombre: Amazon Redshift
dominio: datos
categoria: cloud-dwh
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [rs-docs-datashare, rs-pricing-serverless] }
  DP-ARQ-02: { nota: 2, confianza: alta, fuentes: [rs-docs-iceberg, rs-blog-iceberg-write] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [rs-docs-iceberg] }
  DP-CAR-01: { nota: 4, confianza: alta, fuentes: [rs-docs-architecture, fivetran-benchmark] }
  DP-CAR-02: { nota: 3, confianza: alta, fuentes: [rs-docs-streaming] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [rs-docs-bedrock-ml] }
  DP-CAR-04: { nota: 4, confianza: media, fuentes: [rs-docs-zero-etl] }
  DP-REN-01: { nota: 4, confianza: alta, fuentes: [rs-docs-concurrency-scaling, rs-docs-datashare] }
  DP-REN-02: { valor: "Fivetran Cloud Data Warehouse Benchmark (2025); GigaOm TPC-DS 2019 (patrocinado por Microsoft)", confianza: media, fuentes: [fivetran-benchmark, gigaom-2019-benchmark] }
  DP-REN-03: { valor: "Sí", confianza: alta, fuentes: [rs-pricing-serverless] }
  DP-INT-01: { nota: 4, confianza: media, fuentes: [rs-docs-postgres-differences] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [rs-github-dbt-redshift, rs-docs-postgres-differences] }
  DP-INT-03: { nota: 3, confianza: media, fuentes: [rs-docs-iceberg] }
  DP-GOB-01: { nota: 3, confianza: alta, fuentes: [rs-docs-rls, rs-docs-ddm, rs-whatsnew-ddm-ga] }
  DP-GOB-02: { nota: 2, confianza: media, fuentes: [rs-docs-audit] }
  DP-GOB-03: { valor: "SOC 1/2/3, ISO 27001/27017/27018, PCI-DSS, HIPAA/HITECH, FedRAMP (heredadas del programa de cumplimiento de AWS)", confianza: media, fuentes: [rs-docs-compliance] }
  DP-GOB-04: { valor: "Sí", confianza: media, fuentes: [aws-data-privacy-faq] }
  DP-DEP-01: { valor: "SaaS, exclusivo de AWS (Serverless y provisionado RA3); sin self-hosted", confianza: alta, fuentes: [rs-pricing-serverless] }
  DP-DEP-02: { valor: "N/D — no aplica, no existe modo self-managed", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica — SaaS sin modo self-hosted", confianza: n/a, fuentes: [rs-pricing-serverless] }
  DP-ECO-01: { nota: 3, confianza: media, fuentes: [rs-pricing-serverless] }
  DP-ECO-02: { nota: 2, confianza: media, fuentes: [rs-docs-iceberg, rs-docs-zero-etl, rs-github-dbt-redshift] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [rs-pricing-serverless] }
  DP-LIC-02: { valor: "No aplica — producto propietario desde su origen", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 4, confianza: alta, fuentes: [rs-pricing-serverless] }
  DP-IA-01: { valor: "Sí", confianza: alta, fuentes: [rs-docs-bedrock-ml] }
  DP-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Amazon Redshift

## Resumen

Amazon Redshift es el data warehouse gestionado de AWS, disponible en modo Serverless (facturación por RPU) o provisionado (nodos RA3 con almacenamiento gestionado separado)[^rs-pricing-serverless]. Es SaaS exclusivo de AWS, sin modo self-hosted.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Los nodos RA3 separan almacenamiento gestionado de cómputo, y Redshift Serverless factura el cómputo por RPU[^rs-pricing-serverless]. Además, *data sharing* permite que varios clústeres aprovisionados y *workgroups* serverless lean (y escriban) datos vivos compartidos sin copiarlos[^rs-docs-datashare].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 2/5
Redshift lee y **escribe** directamente tablas Iceberg en S3/S3 Tables con semántica ACID, sin pasos de ETL intermedios[^rs-docs-iceberg][^rs-blog-iceberg-write]. Nivel 2. Solo se acredita lectura y escritura de un único formato (Iceberg). No se ha podido confirmar un segundo formato (Delta/Hudi).

### DP-ARQ-03 · Catálogo externo compatible · Sí
Los clústeres y *namespaces* de Redshift pueden registrarse en AWS Glue Data Catalog y exponerse vía el API REST de Iceberg a cualquier motor compatible[^rs-docs-iceberg].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Motor MPP columnar documentado[^rs-docs-architecture]; incluido en el *Cloud Data Warehouse Benchmark* de Fivetran (2025)[^fivetran-benchmark].

### DP-CAR-02 · Streaming / tiempo real · 3/5
Ingesta en streaming nativa desde Kinesis Data Streams o Amazon MSK directamente a vistas materializadas, sin etapa intermedia en S3; la documentación habla de ingesta «de baja latencia» y «casi en tiempo real» y de cientos de MB/s por refresco, sin cifra de latencia ni SLA p99[^rs-docs-streaming].

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Redshift ML permite invocar modelos de Amazon Bedrock desde SQL mediante `CREATE EXTERNAL MODEL` y una función de inferencia[^rs-docs-bedrock-ml] (LLM resuelto, sin etiqueta de *preview* en la documentación); no se ha localizado un tipo/índice vectorial nativo (la búsqueda de similitud se describe como procedimientos y funciones).

### DP-CAR-04 · OLTP / Lakebase · 4/5
AWS ofrece Aurora (OLTP) con **integraciones zero-ETL hacia Redshift**: replicación gestionada casi en tiempo real sin construir ni mantener *pipelines* ETL[^rs-docs-zero-etl]. OLTP del mismo fabricante que sincroniza con el analítico sin ETL explícito. **Matiz:** Aurora es un servicio separado y la sincronización es replicación, no almacenamiento compartido.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
*Concurrency Scaling* añade capacidad de clúster automáticamente para consultas de lectura y escrituras habituales (ETL) cuando hay cola, y cobra solo el tiempo activo[^rs-docs-concurrency-scaling]; *data sharing* aporta aislamiento de carga entre grupos de usuarios sin redistribuir datos[^rs-docs-datashare].

### DP-REN-02 · Benchmarks publicados
Fivetran (2025)[^fivetran-benchmark] y GigaOm TPC-DS (2019, patrocinado por Microsoft, que reportó a Redshift superando a BigQuery en esa comparativa concreta)[^gigaom-2019-benchmark].

### DP-REN-03 · Escala a cero · Sí
Redshift Serverless se inicia, se detiene y escala automáticamente según la demanda, sin cargos durante los periodos de inactividad (capacidad base configurable entre 4 y 1.024 RPU; el mínimo de 4 RPU es la capacidad base cuando hay actividad, no un coste en reposo)[^rs-pricing-serverless].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 4/5
Redshift está basado en PostgreSQL y mantiene compatibilidad documentada con los controladores JDBC y ODBC de PostgreSQL[^rs-docs-postgres-differences]. La documentación advierte de «diferencias muy importantes» (características no soportadas, otras implementadas de forma distinta).

### DP-INT-02 · Conectores y ecosistema · 2/5
`dbt-redshift` está mantenido por dbt Labs[^rs-github-dbt-redshift], y hay drivers JDBC/ODBC compatibles con PostgreSQL[^rs-docs-postgres-differences].

### DP-INT-03 · Facilidad de salida de datos · 3/5
Cuando los datos se gestionan como tablas Iceberg en S3, residen en formato abierto en el bucket del cliente[^rs-docs-iceberg]; para tablas nativas RA3 no se ha verificado el detalle de coste de exportación en esta revisión.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 3/5
RBAC con control de acceso a nivel de columna vía `GRANT`/`REVOKE`, seguridad a nivel de fila (RLS)[^rs-docs-rls] y enmascaramiento dinámico de datos (DDM)[^rs-docs-ddm], este último GA desde abril de 2023[^rs-whatsnew-ddm-ga].

### DP-GOB-02 · Linaje y auditoría · 2/5
Redshift ofrece registros de auditoría de base de datos (conexiones, usuarios, actividad de usuario) exportables a S3 o CloudWatch y consultables[^rs-docs-audit]. No se ha localizado documentación de linaje de datos nativo de Redshift.

### DP-GOB-03 · Certificaciones de seguridad
Heredadas del programa de cumplimiento general de AWS: SOC 1/2/3, ISO 27001/27017/27018, PCI-DSS, HIPAA/HITECH, FedRAMP[^rs-docs-compliance].

### DP-GOB-04 · Residencia de datos en la UE · Sí
AWS ofrece Redshift en varias regiones de la UE, y el compromiso general de AWS es no mover ni replicar el contenido fuera de las regiones elegidas por el cliente sin su acuerdo, salvo lo necesario para prestar los servicios o cumplir la ley[^aws-data-privacy-faq]. Es un compromiso general de AWS, no específico de Redshift, y la fuente es una FAQ, no el contrato (DPA); de ahí la confianza media. La fuente anterior (página de validación de cumplimiento) no trataba la residencia.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS exclusivo de AWS (Serverless o provisionado RA3); sin self-hosted ni BYOC[^rs-pricing-serverless].

### DP-DEP-02 / DP-DEP-03
No aplican al no existir modo self-managed ni despliegue en Kubernetes gestionado por el cliente[^rs-pricing-serverless]. DP-DEP-03 se marca «No aplica» (no «No») para no penalizar con un 0, coherente con la metodología §2.

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
Producto propietario de una única empresa (AWS), sin gobernanza de fundación neutral. No se ha localizado una cifra pública de clientes de Redshift.

### DP-ECO-02 · Integraciones con el ecosistema de datos · 2/5
Catálogo AWS Glue (con catálogos Redshift accesibles vía API REST de Iceberg)[^rs-docs-iceberg], integraciones zero-ETL con Aurora[^rs-docs-zero-etl] y adaptador dbt[^rs-github-dbt-redshift]. Nivel 2 con confianza media. La asignación de una nota superior carece de respaldo documental al no haberse verificado integraciones oficiales con orquestadores ni plataformas de observabilidad.

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
Sin fuente pública localizada en esta revisión.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
Producto propietario, sin código fuente publicado[^rs-pricing-serverless].

### DP-LIC-02 · Estabilidad de la licencia
No aplica.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 4/5
Página de precios pública de Redshift Serverless (RPU) con enlace a la AWS Pricing Calculator oficial para estimaciones a medida[^rs-pricing-serverless].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
`CREATE EXTERNAL MODEL` apunta a modelos de Amazon Bedrock invocables con SQL estándar, sin aprovisionar ni entrenar nada[^rs-docs-bedrock-ml].

### DP-IA-02 · Búsqueda vectorial nativa · N/D
Sin fuente verificada en esta sesión de un índice de búsqueda vectorial nativo en Redshift.

### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap dedicado localizada en esta revisión.

[^rs-pricing-serverless]: AWS, «Amazon Redshift Serverless pricing», https://aws.amazon.com/redshift/pricing/, consultado 2026-09-29.
[^rs-docs-iceberg]: AWS Docs, «Apache Iceberg compatibility for Amazon Redshift», https://docs.aws.amazon.com/redshift/latest/dg/iceberg-integration_overview.html, consultado 2026-09-30.
[^rs-blog-iceberg-write]: AWS Big Data Blog, «Getting started with Apache Iceberg write support in Amazon Redshift — Part 1», https://aws.amazon.com/blogs/big-data/getting-started-with-apache-iceberg-write-support-in-amazon-redshift-part-1/, consultado 2026-09-29.
[^fivetran-benchmark]: Fivetran, «Cloud Data Warehouse Benchmark», https://www.fivetran.com/blog/warehouse-benchmark, consultado 2026-09-29.
[^rs-docs-streaming]: AWS Docs, «Streaming ingestion to a materialized view» (§ Data flow), https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-streaming-ingestion.html#materialized-view-streaming-ingestion-data-flow, consultado 2026-09-30.
[^rs-docs-bedrock-ml]: AWS Docs, «Amazon Redshift ML integration with Amazon Bedrock», https://docs.aws.amazon.com/redshift/latest/dg/machine-learning-br.html, consultado 2026-09-29.
[^gigaom-2019-benchmark]: GigaOm, «Data Warehouse in the Cloud Benchmark» (patrocinado por Microsoft), https://gigaom.com/report/data-warehouse-cloud-benchmark/, consultado 2026-09-29.
[^rs-github-dbt-redshift]: dbt Labs (GitHub), «dbt-redshift», https://github.com/dbt-labs/dbt-adapters, consultado 2026-09-29.
[^rs-whatsnew-ddm-ga]: AWS, «Amazon Redshift announces general availability of Dynamic Data Masking», https://aws.amazon.com/about-aws/whats-new/2023/04/amazon-redshift-availability-dynamic-data-masking/, consultado 2026-09-30.
[^rs-docs-compliance]: AWS Docs, «Compliance validation for Amazon Redshift», https://docs.aws.amazon.com/redshift/latest/mgmt/security-compliance.html, consultado 2026-09-29.
[^rs-docs-datashare]: AWS Docs, «Data sharing in Amazon Redshift» (§ Use cases), https://docs.aws.amazon.com/redshift/latest/dg/datashare-overview.html#use_cases, consultado 2026-09-30.
[^rs-docs-concurrency-scaling]: AWS Docs, «Concurrency scaling» (§ Capabilities; § Limitations), https://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html#concurrency-scaling-capabilities, consultado 2026-09-30.
[^rs-docs-architecture]: AWS Docs, «Amazon Redshift system architecture», https://docs.aws.amazon.com/redshift/latest/dg/c_redshift_system_overview.html, consultado 2026-09-30.
[^rs-docs-zero-etl]: AWS Docs, «Zero-ETL integrations», https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.html, consultado 2026-09-30.
[^rs-docs-postgres-differences]: AWS Docs, «Amazon Redshift and PostgreSQL», https://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html, consultado 2026-09-30.
[^rs-docs-rls]: AWS Docs, «Row-level security», https://docs.aws.amazon.com/redshift/latest/dg/t_rls.html, consultado 2026-09-30.
[^rs-docs-ddm]: AWS Docs, «Dynamic data masking», https://docs.aws.amazon.com/redshift/latest/dg/t_ddm.html, consultado 2026-09-30.
[^rs-docs-audit]: AWS Docs, «Database audit logging» (§ Audit logs), https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing.html#db-auditing-logs, consultado 2026-09-30.
[^aws-data-privacy-faq]: AWS, «Data Privacy FAQ», https://aws.amazon.com/compliance/data-privacy-faq/, consultado 2026-09-30.