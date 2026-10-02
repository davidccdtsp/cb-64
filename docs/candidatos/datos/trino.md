---
id: trino
nombre: Trino
dominio: datos
categoria: federacion-consultas
tipo: hibrido
licencia: Apache-2.0
despliegue: [self-hosted, saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: media, fuentes: [trino-docs-iceberg, trino-docs-k8s] }
  DP-ARQ-02: { nota: 4, confianza: media, fuentes: [trino-docs-iceberg, trino-docs-delta, trino-docs-hudi] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [trino-docs-iceberg] }
  DP-CAR-01: { nota: 5, confianza: media, fuentes: [trino-users, github-trino-api] }
  DP-CAR-02: { nota: 2, confianza: media, fuentes: [trino-docs-kafka] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [trino-docs-ai] }
  DP-CAR-04: { nota: 0, confianza: media, fuentes: [trino-docs-iceberg] }
  DP-REN-01: { nota: 4, confianza: media, fuentes: [trino-charts-readme, trino-docs-resource-groups] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No", confianza: media, fuentes: [trino-charts-readme] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [trino-docs-sql] }
  DP-INT-02: { nota: 4, confianza: alta, fuentes: [trino-github-dbt] }
  DP-INT-03: { nota: 5, confianza: media, fuentes: [trino-docs-iceberg] }
  DP-GOB-01: { nota: 4, confianza: alta, fuentes: [trino-opa-access-control, trino-file-access-control] }
  DP-GOB-02: { nota: 3, confianza: media, fuentes: [trino-docs-openlineage, trino-docs-event-listener] }
  DP-GOB-03: { valor: "N/D — depende de la distribución (Starburst publica certificaciones propias no evaluadas aquí)", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica directamente en self-hosted", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted (Apache-2.0; contenedores y Helm chart oficial en Kubernetes); ofertas gestionadas de Starburst (Galaxy SaaS, Enterprise)", confianza: alta, fuentes: [trino-docs-k8s, starburst-pricing] }
  DP-DEP-02: { nota: 2, confianza: media, fuentes: [trino-docs-k8s, trino-charts-readme] }
  DP-DEP-03: { valor: "No", confianza: media, fuentes: [trino-docs-k8s] }
  DP-ECO-01: { nota: 5, confianza: alta, fuentes: [trino-foundation, github-trino-api] }
  DP-ECO-02: { nota: 5, confianza: media, fuentes: [trino-docs-iceberg, trino-docs-openlineage, trino-github-dbt] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [trino-legal] }
  DP-LIC-02: { nota: 4, confianza: media, fuentes: [trino-legal, github-trino-api] }
  DP-COS-02: { nota: 3, confianza: media, fuentes: [starburst-pricing] }
  DP-IA-01: { valor: "Sí", confianza: media, fuentes: [trino-docs-ai] }
  DP-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Trino

## Resumen

Trino (originalmente Presto, creado en Facebook en 2012, bifurcado como PrestoSQL en 2019 y renombrado Trino en 2020) es un motor de consulta SQL federado: no almacena datos propios, sino que expone como tablas SQL fuentes heterogéneas (Iceberg/Delta/Hudi en el object store, bases relacionales, Kafka, Elasticsearch...) mediante una arquitectura de conectores, permitiendo *joins* entre sistemas en una misma consulta (ver `estado-del-arte/datos/estado-del-arte.md`).

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Trino no tiene almacenamiento propio: el cómputo (coordinador y *workers*) se redimensiona sin mover datos y varios clústeres Trino independientes pueden consultar el mismo almacenamiento o catálogo[^trino-docs-iceberg][^trino-docs-k8s].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 4/5
Conector Iceberg con *time travel*, evolución de esquema, catálogos Hive, Glue, JDBC, REST y Nessie (formato v3 en estado experimental)[^trino-docs-iceberg]; conector Delta Lake con *time travel*, escritura y metastores Hive/Glue[^trino-docs-delta]; conector Hudi (solo lectura)[^trino-docs-hudi].

### DP-ARQ-03 · Catálogo externo compatible · Sí
El conector Iceberg soporta catálogos de tipo Hive Metastore, AWS Glue, JDBC, REST y Nessie[^trino-docs-iceberg].

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 5/5
Motor MPP de consultas SQL interactivas con conectores a decenas de fuentes; la página oficial de usuarios documenta su adopción por numerosas organizaciones[^trino-users], y el proyecto acumula 13.292 estrellas y 1.213 contribuidores en GitHub[^github-trino-api].

### DP-CAR-02 · Streaming / tiempo real · 2/5
El conector Kafka permite consultar *topics* en el momento de la consulta[^trino-docs-kafka], pero Trino no ingiere ni indexa flujos de forma continua. 

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Funciones de IA en SQL (`ai_classify`, `ai_gen`, `ai_extract`, `ai_translate`…) con proveedores Anthropic, OpenAI y Ollama[^trino-docs-ai]; no se ha localizado tipo ni índice vectorial. Nivel 3 (LLM resuelto, vectorial ausente), confianza media porque no se ha verificado el estado GA.

### DP-CAR-04 · OLTP / Lakebase · 0/5
Motor de consulta federado sin motor transaccional propio (puede consultar bases OLTP externas, pero no las ofrece)[^trino-docs-iceberg]. Nivel 0; confianza media.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 4/5
El *Helm chart* oficial incluye autoescalado de *workers* con HPA o KEDA (desactivado por defecto; con KEDA, `minReplicaCount` admite 0)[^trino-charts-readme], y los *resource groups* permiten colas y límites de concurrencia por grupo de usuarios[^trino-docs-resource-groups]; varios clústeres pueden aislar cargas sobre los mismos datos.

### DP-REN-02 · N/D

### DP-REN-03 · Escala a cero · No
El coordinador es un proceso persistente; con KEDA los *workers* pueden escalar a cero[^trino-charts-readme], pero el clúster en conjunto no se suspende ni se reanuda solo.
## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
SQL amplio con objetivo de interoperabilidad entre motores[^trino-docs-sql]; no se ha verificado compatibilidad de protocolo con otro motor (Trino usa su propio protocolo cliente). 

### DP-INT-02 · Conectores y ecosistema · 4/5
`dbt-trino`, mantenido por Starburst Data, soporta tanto Trino OSS como Starburst Galaxy/Enterprise[^trino-github-dbt].

### DP-INT-03 · Facilidad de salida de datos · 5/5
Trino no posee los datos: residen en el sistema de origen (p. ej. tablas Iceberg/Delta en el object store del cliente)[^trino-docs-iceberg], de modo que cambiar de motor no implica moverlos.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
Control de acceso basado en ficheros (reglas por catálogo, esquema, tabla y columna, con expresión de filtro de filas y máscaras de columna)[^trino-file-access-control] o mediante Open Policy Agent, con *row filtering* y *column masking* y decisiones basadas en atributos de la petición[^trino-opa-access-control]. 

### DP-GOB-02 · Linaje y auditoría · 3/5
Los *event listeners* (HTTP, OpenLineage y otros) emiten eventos de consulta[^trino-docs-event-listener], y el *listener* de OpenLineage exporta metadatos de conjuntos de datos y consultas a un sistema de linaje externo[^trino-docs-openlineage].

### DP-GOB-03 / DP-GOB-04
Dependen de la distribución elegida (self-hosted vs. Starburst); la página de precios de Starburst no lista certificaciones[^starburst-pricing]. N/D.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (Apache-2.0; contenedores y Kubernetes con Helm)[^trino-docs-k8s] u ofertas gestionadas de Starburst (Galaxy SaaS, Enterprise)[^starburst-pricing].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 2/5
El proyecto mantiene un *Helm chart* oficial en `trinodb/charts` (Apache-2.0, con actividad en septiembre de 2026) con autoescalado de *workers* opcional[^trino-docs-k8s][^trino-charts-readme]; no se ha localizado un operador.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No
No se ha localizado un operador de Kubernetes mantenido por la fundación; la documentación oficial ofrece un *Helm chart*[^trino-docs-k8s].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 5/5
Gobernado por la Trino Software Foundation, organización neutral[^trino-foundation], con 1.213 contribuidores (incluidos anónimos), 13.292 estrellas y 3.798 *forks* en GitHub y actividad diaria[^github-trino-api].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 5/5
Adaptador `dbt-trino` mantenido por Starburst[^trino-github-dbt], decenas de conectores, catálogos Iceberg externos[^trino-docs-iceberg] y *listener* OpenLineage[^trino-docs-openlineage]. 

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Apache License 2.0[^trino-legal].

### DP-LIC-02 · Estabilidad de la licencia · 4/5
Apache-2.0 desde el fork de PrestoSQL en 2019 (más de 5 años), sin cambios documentados[^trino-legal][^github-trino-api]. No se ha encontrado un compromiso público de no cambiarla por parte del fabricante o de una fundación, y no se ha localizado uno explícito de la Trino Software Foundation.

## Coste

### DP-COS-02 · 3/5
Starburst Galaxy publica precios por crédito (Pro 0,50 $, Enterprise 0,75 $, Mission-Critical 1,00 $; plan Free y prueba de 30 días con 500 $)[^starburst-pricing]. 

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
Trino documenta funciones `ai_*` (análisis de sentimiento, clasificación, extracción, corrección, generación, enmascarado y traducción) con proveedores Anthropic, OpenAI y Ollama configurables[^trino-docs-ai].

### DP-IA-02 · Búsqueda vectorial nativa · N/D
Sin soporte localizado.

### DP-IA-03 · Roadmap público de IA
N/D.

[^trino-legal]: Trino Docs, «Legal notices», https://trino.io/docs/current/appendix/legal-notices.html, consultado 2026-09-30.
[^trino-opa-access-control]: Trino Docs, «Open Policy Agent access control» (§ Row filtering; § Column masking), https://trino.io/docs/current/security/opa-access-control.html#row-filtering, consultado 2026-09-30.
[^trino-file-access-control]: Trino Docs, «File-based access control» (§ Table rules), https://trino.io/docs/current/security/file-system-access-control.html, consultado 2026-09-30.
[^trino-github-dbt]: Starburst Data (GitHub), «dbt-trino», https://github.com/starburstdata/dbt-trino, consultado 2026-09-29.
[^trino-docs-iceberg]: Trino Docs, «Iceberg connector» (§ Schema evolution; catálogos), https://trino.io/docs/current/connector/iceberg.html, consultado 2026-09-30.
[^trino-docs-delta]: Trino Docs, «Delta Lake connector», https://trino.io/docs/current/connector/delta-lake.html, consultado 2026-09-30.
[^trino-docs-hudi]: Trino Docs, «Hudi connector», https://trino.io/docs/current/connector/hudi.html, consultado 2026-09-30.
[^trino-docs-kafka]: Trino Docs, «Kafka connector», https://trino.io/docs/current/connector/kafka.html, consultado 2026-09-30.
[^trino-docs-ai]: Trino Docs, «AI functions» (§ Configuration; § Functions), https://trino.io/docs/current/functions/ai.html#functions, consultado 2026-09-30.
[^trino-docs-k8s]: Trino Docs, «Trino on Kubernetes with Helm» (§ Running Trino using Helm), https://trino.io/docs/current/installation/kubernetes.html#running-trino-using-helm, consultado 2026-09-30.
[^trino-charts-readme]: Trino (GitHub), «trinodb/charts — README» (server.autoscaling, server.keda), https://github.com/trinodb/charts/blob/main/charts/trino/README.md, consultado 2026-09-30.
[^trino-docs-resource-groups]: Trino Docs, «Resource groups», https://trino.io/docs/current/admin/resource-groups.html, consultado 2026-09-30.
[^trino-docs-sql]: Trino Docs, «SQL language», https://trino.io/docs/current/language.html, consultado 2026-09-30.
[^trino-docs-openlineage]: Trino Docs, «OpenLineage event listener» (§ Available Trino facets), https://trino.io/docs/current/admin/event-listeners-openlineage.html#available-trino-facets, consultado 2026-09-30.
[^trino-docs-event-listener]: Trino Docs, «HTTP event listener», https://trino.io/docs/current/admin/event-listeners-http.html, consultado 2026-09-30.
[^trino-users]: Trino, «Users», https://trino.io/users.html, consultado 2026-09-30.
[^trino-foundation]: Trino Software Foundation, https://trino.io/foundation.html, consultado 2026-09-30.
[^github-trino-api]: GitHub API, «trinodb/trino» (estrellas, forks, contribuidores, licencia), https://api.github.com/repos/trinodb/trino, consultado 2026-09-30.
[^starburst-pricing]: Starburst Data, «Starburst Galaxy pricing», https://www.starburst.io/pricing/, consultado 2026-09-30.
