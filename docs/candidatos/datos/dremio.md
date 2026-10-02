---
id: dremio
nombre: Dremio (edición OSS y Dremio Cloud)
dominio: datos
categoria: motor-lakehouse-federado
tipo: hibrido
licencia: Apache-2.0
despliegue: [self-hosted, saas, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [dremio-docs-engines, dremio-docs-concepts] }
  DP-ARQ-02: { nota: 3, confianza: media, fuentes: [dremio-docs-data-formats, dremio-docs-sql-commands] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [dremio-docs-connect] }
  DP-CAR-01: { nota: 4, confianza: media, fuentes: [dremio-docs-architecture] }
  DP-CAR-02: { nota: 1, confianza: media, fuentes: [dremio-docs-autoingest] }
  DP-CAR-03: { nota: 2, confianza: media, fuentes: [dremio-docs-model-providers] }
  DP-CAR-04: { nota: 0, confianza: media, fuentes: [dremio-docs-concepts] }
  DP-REN-01: { nota: 4, confianza: alta, fuentes: [dremio-docs-engines] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "Sí", confianza: alta, fuentes: [dremio-docs-engines, dremio-docs-usage] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [dremio-docs-sql-commands, dremio-docs-information-schema] }
  DP-INT-02: { nota: 3, confianza: media, fuentes: [dremio-docs-dbt, dremio-docs-client-apps] }
  DP-INT-03: { nota: 4, confianza: media, fuentes: [dremio-docs-concepts, dremio-docs-usage] }
  DP-GOB-01: { nota: 3, confianza: media, fuentes: [dremio-docs-row-column, dremio-docs-privileges] }
  DP-GOB-02: { nota: 3, confianza: media, fuentes: [dremio-docs-lineage, dremio-docs-monitor] }
  DP-GOB-03: { valor: "SOC 2 Tipo II, ISO 27001:2022 (Dremio Cloud); alineación con GDPR y CCPA", confianza: alta, fuentes: [dremio-docs-compliance] }
  DP-GOB-04: { valor: "No aplica directamente en self-hosted; no verificado para Dremio Cloud en esta revisión", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Dremio Cloud (SaaS en AWS, 30 días de prueba); Dremio Enterprise (autogestionado, Kubernetes con Helm); Community Edition en Docker (solo pruebas y evaluación)", confianza: alta, fuentes: [dremio-pricing, dremio-docs-k8s, dremio-docs-ce] }
  DP-DEP-02: { nota: 2, confianza: media, fuentes: [dremio-docs-k8s] }
  DP-DEP-03: { valor: "No", confianza: media, fuentes: [dremio-docs-k8s] }
  DP-ECO-01: { nota: 1, confianza: media, fuentes: [dremio-oss-github-api, dremio-dockerhub] }
  DP-ECO-02: { nota: 3, confianza: media, fuentes: [dremio-docs-connect, dremio-docs-open-catalog] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [dremio-github-license] }
  DP-LIC-02: { nota: 4, confianza: media, fuentes: [dremio-github-license] }
  DP-COS-02: { nota: 3, confianza: alta, fuentes: [dremio-pricing, dremio-docs-usage] }
  DP-IA-01: { valor: "Sí", confianza: media, fuentes: [dremio-docs-model-providers, dremio-docs-sql-functions] }
  DP-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Dremio (edición OSS y Dremio Cloud)

## Resumen

Dremio es un motor de consulta orientado al lakehouse abierto: se presenta como «el único lakehouse construido nativamente sobre Apache Iceberg, Polaris y Arrow»[^dremio-open-source-page]. La documentación actual distingue **Dremio Cloud** (SaaS), **Dremio Enterprise** (autogestionado) y una **Community Edition** en Docker «indicada para pruebas y evaluación, no recomendada para producción»[^dremio-docs-ce]. **Actualización importante:** el repositorio de código abierto `dremio/dremio-oss` (Apache-2.0) no recibe publicaciones desde septiembre de 2025 (última versión 26.0.5, 15-sep-2025) y cuenta con 7 contribuidores[^dremio-oss-github-api]; los niveles gratuitos permanentes «Sonar» y «Arctic» que citaba la versión anterior ya no figuran en la documentación ni en la página de precios.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Motores de cómputo (*engines*) con réplicas independientes, separados del almacenamiento; un proyecto puede usar almacenamiento gestionado por Dremio o el bucket propio del cliente[^dremio-docs-concepts], y varios *engines* pueden consultar el mismo catálogo[^dremio-docs-engines].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
Lectura y escritura de tablas Apache Iceberg (`INSERT`, `UPDATE`, `DELETE`, `MERGE`, `OPTIMIZE`, `ROLLBACK`)[^dremio-docs-sql-commands]; Delta Lake y Parquet figuran entre los formatos soportados[^dremio-docs-data-formats], con Delta solo en lectura según lo verificado.

### DP-ARQ-03 · Catálogo externo compatible · Sí
Cada proyecto incluye un *Open Catalog* nativo basado en Apache Polaris con API REST de Iceberg, y se pueden conectar AWS Glue, catálogos Iceberg REST, Microsoft OneLake y Snowflake Open Catalog[^dremio-docs-connect].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Motor de ejecución columnar sobre Apache Arrow con aceleración mediante *Reflections* (autónomas o manuales)[^dremio-docs-architecture]. No se han localizado métricas de adopción.

### DP-CAR-02 · Streaming / tiempo real · 1/5
La ingesta documentada es por lotes: `COPY INTO` y *autoingest pipes* que cargan ficheros de almacenamiento de objetos en tablas Iceberg conforme llegan (micro-lotes dirigidos por eventos)[^dremio-docs-autoingest]; no se ha localizado conector nativo a colas (Kafka).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 2/5
Funciones de IA en SQL con proveedores de modelos externos configurables (Anthropic, OpenAI, Amazon Bedrock…)[^dremio-docs-model-providers]; no se ha verificado la disponibilidad general (GA) ni se ha localizado índice vectorial. Función LLM documentada pero no en disponibilidad general.

### DP-CAR-04 · OLTP / Lakebase · 0/5
Motor de consulta sobre el lakehouse, sin motor transaccional[^dremio-docs-concepts]. 

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
El autoescalado en base a configuración que inicia y detiene réplicas de un *engine* automáticamente según la carga y los *engines* son entidades de cómputo aisladas entre sí[^dremio-docs-engines].

### DP-REN-02 · Benchmarks publicados
Sin benchmark independiente localizado.

### DP-REN-03 · Escala a cero · Sí
Un *engine* con réplicas mínimas 0 permanece inactivo hasta la primera consulta y «los *engines* se inician y se detienen automáticamente según la carga»; los DCU solo se consumen mientras los *engines* están en ejecución[^dremio-docs-engines][^dremio-docs-usage].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
SQL con DDL/DML completos y vistas `INFORMATION_SCHEMA` estándar ANSI[^dremio-docs-sql-commands][^dremio-docs-information-schema], no se ha verificado compatibilidad de protocolo con otro motor. 

### DP-INT-02 · Conectores y ecosistema · 3/5
Conector `dbt-dremio`[^dremio-docs-dbt], Arrow Flight/Flight SQL, JDBC/ODBC y aplicaciones cliente de BI documentadas[^dremio-docs-client-apps]. Sin proveedor Airflow verificado.

### DP-INT-03 · Facilidad de salida de datos · 4/5
Las tablas Iceberg del *Open Catalog* residen en formato abierto; el almacenamiento puede ser el bucket propio del cliente o el gestionado por Dremio, que se factura aparte[^dremio-docs-concepts][^dremio-docs-usage]. Con bucket propio se alcanzaría el nivel 5, no así con la versión gestionada.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 3/5
Roles con jerarquía y privilegios sobre catálogos, esquemas, tablas y vistas[^dremio-docs-privileges], más políticas de acceso a filas y enmascaramiento de columnas mediante UDF, que permiten decisiones por usuario o rol[^dremio-docs-row-column]. No se ha podido verificar el control de acceso basado en atributos dinámicos (ABAC).

### DP-GOB-02 · Linaje y auditoría · 3/5
Grafo de linaje de conjuntos de datos (origen, padres e hijos)[^dremio-docs-lineage] y tabla de sistema de auditoría de eventos sobre recursos (`sys.project.history.events`)[^dremio-docs-monitor]. 

### DP-GOB-03 · Certificaciones de seguridad
Dremio Cloud: SOC 2 Tipo II e ISO 27001:2022; cumplimiento GDPR y CCPA[^dremio-docs-compliance].

### DP-GOB-04 · Residencia de datos en la UE
N/D: el índice de documentación menciona «compromisos de residencia de datos» en la página de cumplimiento, pero el texto verificado no los detalla.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Dremio Cloud (SaaS en AWS, con prueba gratuita de 30 días y 400 $ en créditos)[^dremio-pricing]; Dremio Enterprise autogestionado en Kubernetes con Helm[^dremio-docs-k8s]; y Community Edition en Docker solo para pruebas[^dremio-docs-ce].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 2/5
Dremio Enterprise se despliega en Kubernetes con un *Helm chart* oficial del fabricante y gestión de *engines* ejecutores[^dremio-docs-k8s]; no se ha localizado un operador. 

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No
No se ha localizado un operador de Kubernetes de Dremio; solo *Helm charts*[^dremio-docs-k8s].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 1/5
Empresa única; contribuye a proyectos de fundación neutral (Iceberg, Polaris, Arrow)[^dremio-open-source-page]. Sin embargo, el proyecto `dremio-oss` evaluado como núcleo abierto muestra su última versión (26.0.5) el 15-sep-2025, su imagen Docker de la Community Edition se actualizó por última vez el 10-sep-2025 y tiene 7 contribuidores públicos[^dremio-oss-github-api][^dremio-dockerhub].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 3/5
Catálogos externos (Glue, REST, OneLake, Snowflake Open Catalog)[^dremio-docs-connect] y Open Catalog basado en Polaris[^dremio-docs-open-catalog].

### DP-ECO-03 · N/D

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
El repositorio `dremio/dremio-oss` se distribuye bajo Apache License 2.0[^dremio-github-license]. **Matiz:** ese repositorio no ha tenido publicaciones desde septiembre de 2025, y la documentación actual presenta Dremio Cloud y Dremio Enterprise como productos principales.

### DP-LIC-02 · Estabilidad de la licencia · 4/5
Apache-2.0 en el repositorio `dremio-oss`[^dremio-github-license]; no se ha verificado un historial de cambios de licencia ni compromiso público de no cambiarla. 

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 3/5
Dremio Cloud publica una tarifa de 0,20 $ por DCU (unidad de cómputo: tamaño del *engine* × tiempo en ejecución), prueba gratuita de 30 días con 400 $ y sin sobrecoste de almacenamiento. Precios para Dremio Enterprise no disponibles, se require contacto con ventas [^dremio-pricing][^dremio-docs-usage].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
La referencia SQL incluye una categoría de funciones de IA que usan proveedores de modelos externos configurables (Anthropic, OpenAI, Amazon Bedrock, Azure OpenAI)[^dremio-docs-model-providers][^dremio-docs-sql-functions]. C

### DP-IA-02 · Búsqueda vectorial nativa · N/D
Sin soporte localizado; la «búsqueda semántica» documentada es de descubrimiento de catálogo.

### DP-IA-03 · Roadmap público de IA
N/D.

[^dremio-open-source-page]: Dremio Inc., «Open Source — Accelerate Data Analytics», https://www.dremio.com/open-source/, consultado 2026-09-30.
[^dremio-github-license]: Dremio (GitHub), «LICENSE (dremio/dremio-oss)», https://github.com/dremio/dremio-oss/blob/master/LICENSE, consultado 2026-09-29.
[^dremio-docs-engines]: Dremio Docs, «Engines» (§ Autoscaling), https://docs.dremio.com/dremio-cloud/admin/engines/#autoscaling, consultado 2026-09-30.
[^dremio-docs-concepts]: Dremio Docs, «Concepts» (proyectos, almacenamiento, catálogo), https://docs.dremio.com/dremio-cloud/about/concepts/, consultado 2026-09-30.
[^dremio-docs-data-formats]: Dremio Docs, «Data formats» (Iceberg, Delta Lake, Parquet), https://docs.dremio.com/dremio-cloud/developer/data-formats/, consultado 2026-09-30.
[^dremio-docs-sql-commands]: Dremio Docs, «SQL commands», https://docs.dremio.com/dremio-cloud/sql/commands/, consultado 2026-09-30.
[^dremio-docs-connect]: Dremio Docs, «Connect data sources» (catálogos Iceberg), https://docs.dremio.com/dremio-cloud/bring-data/connect/, consultado 2026-09-30.
[^dremio-docs-architecture]: Dremio Docs, «Architecture» (Enterprise), https://docs.dremio.com/current/what-is-dremio/architecture/, consultado 2026-09-30.
[^dremio-docs-autoingest]: Dremio Docs, «Auto-ingestion», https://docs.dremio.com/current/load-data/autoingestion/, consultado 2026-09-30.
[^dremio-docs-model-providers]: Dremio Docs, «Configure model providers», https://docs.dremio.com/dremio-cloud/admin/model-providers/, consultado 2026-09-30.
[^dremio-docs-sql-functions]: Dremio Docs, «SQL functions», https://docs.dremio.com/dremio-cloud/sql/sql-functions/, consultado 2026-09-30.
[^dremio-docs-usage]: Dremio Docs, «Subscription & usage» (DCU), https://docs.dremio.com/dremio-cloud/admin/subscription/usage/, consultado 2026-09-30.
[^dremio-docs-information-schema]: Dremio Docs, «Information schema», https://docs.dremio.com/dremio-cloud/sql/information-schema/, consultado 2026-09-30.
[^dremio-docs-dbt]: Dremio Docs, «dbt», https://docs.dremio.com/dremio-cloud/developer/dbt/, consultado 2026-09-30.
[^dremio-docs-client-apps]: Dremio Docs, «Client applications», https://docs.dremio.com/dremio-cloud/explore-analyze/client-apps/, consultado 2026-09-30.
[^dremio-docs-row-column]: Dremio Docs, «Row-access and column-masking policies» (§ Column masking policies), https://docs.dremio.com/dremio-cloud/manage-govern/row-column-policies/#column-masking-policies, consultado 2026-09-30.
[^dremio-docs-privileges]: Dremio Docs, «Privileges» (§ Key concepts), https://docs.dremio.com/dremio-cloud/security/privileges/#key-concepts, consultado 2026-09-30.
[^dremio-docs-lineage]: Dremio Docs, «Lineage», https://docs.dremio.com/dremio-cloud/manage-govern/lineage/, consultado 2026-09-30.
[^dremio-docs-monitor]: Dremio Docs, «Monitoring» (auditoría de eventos), https://docs.dremio.com/dremio-cloud/admin/monitor/, consultado 2026-09-30.
[^dremio-docs-compliance]: Dremio Docs, «Compliance» (§ SOC 2 Type II; § ISO 27001), https://docs.dremio.com/dremio-cloud/security/compliance/#soc-2-type-ii-report/, consultado 2026-09-30.
[^dremio-docs-k8s]: Dremio Docs, «Deploy Dremio on Kubernetes» (Enterprise), https://docs.dremio.com/current/deploy-dremio/deploy-on-kubernetes/, consultado 2026-09-30.
[^dremio-docs-ce]: Dremio Docs, «Community Edition on Docker», https://docs.dremio.com/current/get-started/docker/, consultado 2026-09-30.
[^dremio-docs-open-catalog]: Dremio Docs, «Open Catalog» (Apache Polaris), https://docs.dremio.com/current/data-sources/open-catalog/, consultado 2026-09-30.
[^dremio-pricing]: Dremio Inc., «Pricing», https://www.dremio.com/pricing/, consultado 2026-09-30.
[^dremio-oss-github-api]: GitHub API, «dremio/dremio-oss» (último push 26-sep-2025; 7 contribuidores; última release 26.0.5), https://api.github.com/repos/dremio/dremio-oss, consultado 2026-09-30.
[^dremio-dockerhub]: Docker Hub, «dremio/dremio-oss» (Community Edition; última actualización 10-sep-2025), https://hub.docker.com/r/dremio/dremio-oss, consultado 2026-09-30.