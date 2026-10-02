---
id: apache-druid
nombre: Apache Druid
dominio: datos
categoria: olap-tiempo-real
tipo: oss
licencia: Apache-2.0
despliegue: [self-hosted, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [druid-docs-architecture, druid-pdf-paper] }
  DP-ARQ-02: { nota: 0, confianza: media, fuentes: [druid-docs-iceberg, druid-docs-delta] }
  DP-ARQ-03: { valor: "Sí", confianza: media, fuentes: [druid-docs-iceberg] }
  DP-CAR-01: { nota: 2, confianza: media, fuentes: [druid-docs-sql, druid-docs-joins] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [druid-docs-kafka, druid-pdf-paper] }
  DP-CAR-03: { nota: 0, confianza: media, fuentes: [druid-docs-sql] }
  DP-CAR-04: { nota: 0, confianza: media, fuentes: [druid-docs-architecture] }
  DP-REN-01: { nota: 1, confianza: media, fuentes: [druid-docs-architecture, druid-docs-kubernetes-ops] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No", confianza: media, fuentes: [druid-docs-architecture] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [druid-docs-sql] }
  DP-INT-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-INT-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-GOB-01: { nota: 1, confianza: media, fuentes: [druid-docs-security, druid-docs-ranger] }
  DP-GOB-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-GOB-03: { valor: "No aplica directamente — sin oferta gestionada oficial del proyecto", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "No aplica directamente en self-hosted", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted (binarios, Docker, Kubernetes); extensión oficial de descubrimiento en Kubernetes; operador en el repositorio de la ASF (`apache/druid-operator`) y operador previo de datainfrahq", confianza: media, fuentes: [druid-docs-kubernetes, druid-operator-apache] }
  DP-DEP-02: { nota: 3, confianza: media, fuentes: [druid-operator-apache, druid-docs-kubernetes-ops] }
  DP-DEP-03: { valor: "Sí", confianza: media, fuentes: [druid-operator-apache] }
  DP-ECO-01: { nota: 4, confianza: alta, fuentes: [druid-web] }
  DP-ECO-02: { nota: 3, confianza: media, fuentes: [druid-docs-iceberg, druid-docs-ranger, druid-docs-kafka] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [druid-license-page] }
  DP-LIC-02: { nota: 5, confianza: alta, fuentes: [druid-license-page] }
  DP-COS-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [druid-docs-sql] }
  DP-IA-02: { nota: 0, confianza: media, fuentes: [druid-docs-sql] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Apache Druid

## Resumen

Apache Druid (Metamarkets, 2011; paper SIGMOD 2014) es un almacén analítico de series temporales/OLAP en tiempo real, con arquitectura de segmentos inmutables y roles de nodo separados (histórico, ingesta en tiempo real, *broker*) — ver `estado-del-arte/datos/estado-del-arte.md`, sección "OLAP en tiempo real". Proyecto de la Apache Software Foundation.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Los servicios de Druid (coordinador, *overlord*, *broker*, *historical*, *middle manager*) se configuran y escalan de forma independiente; los *historical* descargan segmentos del *deep storage* (almacenamiento compartido) y responden consultas sobre ellos[^druid-docs-architecture][^druid-pdf-paper]. Sin evidencia pública de escalado «en segundos» para lograr el nivel 5.

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 0/5
Druid usa su propio formato de segmento. Las extensiones **contrib** `druid-iceberg-extensions` y de Delta Lake permiten *ingerir* datos de tablas Iceberg/Delta en segmentos de Druid, pero no consultarlas en su sitio ni escribir en ellas[^druid-docs-iceberg][^druid-docs-delta].

### DP-ARQ-03 · Catálogo externo compatible · Sí
La extensión Iceberg se conecta a catálogos Hive Metastore, REST, Glue y local[^druid-docs-iceberg]; uso limitado a la ingesta y en extensión *contrib*, por eso la confianza es media.

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 2/5
Druid SQL traduce a consultas nativas, con subconsultas, funciones de ventana y *joins* (INNER/LEFT) con restricciones documentadas[^druid-docs-sql][^druid-docs-joins]; los *joins* más costosos se reservan al motor multietapa de ingesta por lotes. No se documenta un optimizador basado en costes.

### DP-CAR-02 · Streaming / tiempo real · 3/5
Ingesta nativa desde Kafka y Kinesis mediante *supervisors*, con semántica *exactly-once* y eventos consultables en cuanto se ingieren[^druid-docs-kafka][^druid-pdf-paper]. Nivel 3 (ingesta nativa con latencia de segundos o menos).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 0/5
No se ha localizado soporte de tipo vectorial, índice ANN ni funciones LLM en la documentación de Druid SQL[^druid-docs-sql].

### DP-CAR-04 · OLTP / Lakebase · 0/5
Druid es un almacén analítico sin motor transaccional[^druid-docs-architecture].

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 1/5
Escalado horizontal por adición de servicios *historical*/*broker*, con separación opcional de servicios en servidores distintos para evitar contención[^druid-docs-architecture]; no se documenta autoescalado automático nativo y el despliegue en Kubernetes se delega en operadores[^druid-docs-kubernetes-ops].

### DP-REN-02 · N/D
Sin benchmark independiente localizado en esta revisión.

### DP-REN-03 · Escala a cero · No
Los servicios (*historical*, *broker*, *coordinator*, *overlord*) son procesos persistentes y la documentación de arquitectura no describe suspensión/reanudación automática[^druid-docs-architecture].

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
Druid SQL es una capa SQL completa que se traduce a consultas nativas, con subconsultas, funciones de ventana, *joins* con restricciones y limitaciones documentadas (p. ej. `OFFSET` costoso, `UNION ALL` de nivel superior restringido)[^druid-docs-sql].

### DP-INT-02 · Conectores y ecosistema · N/D
Sin fuente verificada de adaptador dbt ni de herramientas de BI certificadas.

### DP-INT-03 · Facilidad de salida de datos · N/D
No se documenta un mecanismo estándar de exportación a formatos abiertos. 

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 1/5
La extensión «Basic Security» implementa autenticación (HTTP Basic o LDAP) y un autorizador por roles con permisos de lectura/escritura sobre recursos como *datasources*[^druid-docs-security]; la extensión *contrib* de Apache Ranger ofrece autorización centralizada[^druid-docs-ranger]. La documentación vigente no describe políticas de fila/columna ni enmascaramiento.

### DP-GOB-02 · N/D o no aplica
Sin fuente verificada de auditoría/linaje no aplica al no existir oferta gestionada oficial.

### DP-GOB-03 · N/D o no aplica
Sin fuente verificada de auditoría/linaje no aplica al no existir oferta gestionada oficial.

### DP-GOB-04 · N/D o no aplica
Sin fuente verificada de auditoría/linaje no aplica al no existir oferta gestionada oficial.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (Docker, Kubernetes), con extensión de descubrimiento en Kubernetes que permite prescindir de ZooKeeper[^druid-docs-kubernetes-ops][^druid-docs-kubernetes] y un operador de Kubernetes alojado en el repositorio de la ASF `apache/druid-operator`[^druid-operator-apache]. La documentación oficial aún enlaza al operador previo de datainfrahq[^druid-operator-github].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 3/5
Existe un operador en el repositorio de la ASF (`apache/druid-operator`, Apache-2.0, actividad reciente en julio de 2026)[^druid-operator-apache].

### DP-DEP-03 · Operador Kubernetes oficial o soportado · Sí
El repositorio `apache/druid-operator` lleva cabecera de licencia de la ASF y no es un *fork*[^druid-operator-apache]; el operador de datainfrahq, el más usado hasta ahora, no pertenece a la ASF[^druid-operator-github].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 4/5
Proyecto Top-Level de la Apache Software Foundation, con gobernanza neutral[^druid-web]; 14.058 estrellas, 3.800 *forks* y 771 contribuidores (incluidos anónimos) en GitHub, con actividad el día de esta consulta[^github-druid-api]. Nivel 4: fundación neutral con métricas públicas; no se sube al 5 porque Druid compite en su categoría con otros motores de similar comunidad y no se ha documentado como referencia única.

### DP-ECO-02 · Integraciones con el ecosistema de datos · 3/5
Ingesta desde Kafka/Kinesis[^druid-docs-kafka], extensiones *contrib* de Iceberg/Delta[^druid-docs-iceberg] y de Ranger[^druid-docs-ranger]. Nivel 3 con confianza media (orquestación y observabilidad no verificadas).

### DP-ECO-03 · Disponibilidad de perfiles en el mercado
N/D.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Apache License 2.0[^druid-license-page].

### DP-LIC-02 · Estabilidad de la licencia · 5/5
Apache-2.0 como proyecto de la ASF, sin cambios documentados.

## Coste

### DP-COS-02 · N/D
Sin oferta gestionada oficial del proyecto evaluada en esta ficha.

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
No figuran en la documentación de Druid SQL[^druid-docs-sql]. 

### DP-IA-02 · Búsqueda vectorial nativa · 0/5
Sin soporte localizado[^druid-docs-sql]. 

### DP-IA-03 · Roadmap público de IA
N/D.

[^druid-pdf-paper]: F. Yang et al., «Druid: A Real-time Analytical Data Store», SIGMOD 2014, http://static.druid.io/docs/druid.pdf, consultado 2026-09-29.
[^druid-docs-kubernetes]: Apache Druid Docs, «Kubernetes (extensión de descubrimiento)», https://druid.apache.org/docs/latest/development/extensions-core/kubernetes/, consultado 2026-09-30.
[^druid-operator-github]: datainfrahq (GitHub), «druid-operator» (operador previo, enlazado por la documentación de Druid), https://github.com/datainfrahq/druid-operator, consultado 2026-09-30.
[^druid-web]: Apache Druid, web oficial, https://druid.apache.org/, consultado 2026-09-29.
[^druid-license-page]: Apache Druid, «License», https://druid.apache.org/licensing/, consultado 2026-09-29.
[^druid-docs-security]: Apache Druid Docs, «Basic Security» (§ Authorizer), https://druid.apache.org/docs/latest/development/extensions-core/druid-basic-security/, consultado 2026-09-30.
[^druid-docs-architecture]: Apache Druid Docs, «Design / Architecture» (§ Druid services; § Deep storage), https://druid.apache.org/docs/latest/design/architecture/, consultado 2026-09-30.
[^druid-docs-iceberg]: Apache Druid Docs, «Iceberg extension» (contrib; § Iceberg ingest extension), https://druid.apache.org/docs/latest/development/extensions-contrib/iceberg/#iceberg-ingest-extension, consultado 2026-09-30.
[^druid-docs-delta]: Apache Druid Docs, «Delta Lake extension» (contrib), https://druid.apache.org/docs/latest/development/extensions-contrib/delta-lake, consultado 2026-09-30.
[^druid-docs-sql]: Apache Druid Docs, «Druid SQL overview» (§ Syntax), https://druid.apache.org/docs/latest/querying/sql/#syntax, consultado 2026-09-30.
[^druid-docs-joins]: Apache Druid Docs, «Joins», https://druid.apache.org/docs/latest/querying/joins/, consultado 2026-09-30.
[^druid-docs-kafka]: Apache Druid Docs, «Apache Kafka ingestion», https://druid.apache.org/docs/latest/ingestion/kafka-ingestion/, consultado 2026-09-30.
[^druid-docs-ranger]: Apache Druid Docs, «Apache Ranger Security» (extensión contrib), https://druid.apache.org/docs/latest/development/extensions-contrib/druid-ranger-security, consultado 2026-09-30.
[^druid-docs-kubernetes-ops]: Apache Druid Docs, «Kubernetes» (operaciones), https://druid.apache.org/docs/latest/operations/kubernetes/, consultado 2026-09-30.
[^druid-operator-apache]: Apache Druid (GitHub), «apache/druid-operator» (Apache-2.0), https://github.com/apache/druid-operator, consultado 2026-09-30.
[^github-druid-api]: GitHub API, «apache/druid» (estrellas, forks, contribuidores), https://api.github.com/repos/apache/druid, consultado 2026-09-30.
