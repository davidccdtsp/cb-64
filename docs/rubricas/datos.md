# Rúbrica — Bloque A: plataformas de datos

Esta es una rúbrica de ejemplo: 10 dimensiones y 29 criterios, pensada para ilustrar el nivel de detalle esperado, no como lista cerrada. Se puede ampliar con más criterios (p. ej. desglosar "Gobierno y seguridad" en más granularidad) sin tocar código, solo editando este fichero.

## Categorías de candidatos

Cada ficha de candidato (`candidatos/datos/<id>.md`) declara un campo `categoria` en su frontmatter, usado para agrupar y filtrar el catálogo de candidatos (ver sección 7.2 del encargo, "Catálogo de candidatos... Filtros por tipo"). Es un vocabulario controlado: al añadir un candidato nuevo se reutiliza una categoría existente si encaja, o se añade una fila nueva a esta tabla en lugar de inventar un valor libre solo en la ficha.

<!-- CATEGORIAS -->

| Categoría (`categoria`) | Descripción | Candidatos en esta base |
|---|---|---|
| `cloud-dwh` | Data warehouse cloud propietario, SaaS, con almacenamiento y cómputo separados de fábrica. | Snowflake, Google BigQuery, Amazon Redshift, Firebolt, NimbusQuery *(ficticio)* |
| `cloud-dwh-embebido` | Oferta cloud construida sobre un motor embebido (ver `motor-embebido`), con ejecución híbrida cliente/nube. | MotherDuck |
| `cloud-dwh-lakehouse` | Plataforma cloud que combina data warehouse y lakehouse sobre un lago de datos unificado propio. | Microsoft Fabric |
| `real-time-dwh-lakehouse` | Pataforma DWH orientada a real time con posibilidad de conexión con fuentes de datos externas | Apache Doris |
| `lakehouse` | Plataforma lakehouse propietaria construida sobre motores y formatos de tabla abiertos. | Databricks |
| `motor-lakehouse-federado` | Motor de consulta orientado explícitamente a acelerar y federar el lakehouse abierto (Iceberg/catálogos externos), sin exigir almacenamiento propio. | Dremio |
| `federacion-consultas` | Motor de consulta puro sin almacenamiento propio, pensado para unir datos de sistemas heterogéneos en una sola consulta. | Trino |
| `motor-olap` | Motor MPP OLAP de propósito relativamente general (BI, analítica ad hoc), con buen soporte de *joins*. | ClickHouse, StarRocks |
| `olap-tiempo-real` | Motor OLAP especializado en servir consultas de baja latencia sobre datos que llegan en streaming, típicamente de cara al usuario final. | Apache Druid, Apache Pinot |
| `motor-embebido` | Motor analítico *in-process*, sin arquitectura cliente-servidor. | DuckDB |
| `motor-batch-etl` | Motor de procesamiento distribuido de propósito general (batch y streaming), usado habitualmente como capa de ETL/ELT. | Apache Spark SQL |
| `motor-hibrido-extensible` | Motor OLTP relacional al que un ecosistema de extensiones añade capacidades analíticas. | PostgreSQL con extensiones analíticas |

<!-- /CATEGORIAS -->

Esta tabla es la fuente de verdad de la taxonomía: el campo `categoria` de cada ficha debe coincidir exactamente con uno de estos valores. `categoria` no es excluyente con el campo `tipo` del frontmatter (`cloud` / `oss` / `hibrido`): `categoria` clasifica *qué hace* el candidato, `tipo` clasifica *su modelo de licencia y distribución*.

## Tipos de candidato

Cada ficha declara además un campo `tipo` en el frontmatter, que reproduce la taxonomía de la sección 3.1.A.2 del encargo (cloud/propietario, open source, híbridos con oferta gestionada) y se usa para el filtro "por tipo (cloud / OSS / híbrido)" del catálogo (sección 7.2 del encargo).

| Tipo (`tipo`) | Descripción | Candidatos en esta base |
|---|---|---|
| `cloud` | Propietario, SaaS, sin código fuente publicado del motor. | Snowflake, Databricks, Google BigQuery, Amazon Redshift, Microsoft Fabric, Firebolt, MotherDuck, NimbusQuery *(ficticio)* |
| `oss` | Código abierto, evaluado en esta ficha sin una oferta gestionada del propio proyecto (pueden existir ofertas de terceros no cubiertas aquí). | Apache Doris, Apache Druid, Apache Spark SQL, DuckDB, PostgreSQL con extensiones analíticas |
| `hibrido` | Código abierto con una oferta gestionada de referencia documentada en la misma ficha (ClickHouse Cloud/BYOC, Starburst, CelerData, StarTree, Dremio Cloud). | ClickHouse, Trino, StarRocks, Apache Pinot, Dremio |

`tipo` es informativo (no puntúa) y sirve de filtro rápido; el detalle real de licencia va en `DP-LIC-01`/`DP-LIC-02` y el de modelo de despliegue en `DP-DEP-01`, que son los criterios puntuables de la rúbrica.

## Resumen de dimensiones

<!--  DIMENSIONES  -->

| Dimensión | Nombre | Nº criterios | Peso agregado por defecto |
|---|---|---|---|
| DP-ARQ | Arquitectura | 3 | 8 |
| DP-CAR | Cargas de trabajo | 4 | 8 |
| DP-REN | Rendimiento y escalabilidad | 3 | 6 |
| DP-INT | Interoperabilidad y lock-in | 3 | 6 |
| DP-GOB | Gobierno y seguridad | 4 | 7 |
| DP-DEP | Despliegue y operación | 3 | 4 |
| DP-ECO | Ecosistema y madurez | 3 | 5 |
| DP-LIC | Licencia y modelo de negocio | 2 | 4 |
| DP-COS | Coste | 1 | 4 |
| DP-IA | IA y roadmap | 3 | 5 |

<!--  /DIMENSIONES  -->

---

<!-- VALOR -->

## DP-ARQ · Arquitectura

### DP-ARQ-01 — Separación almacenamiento/cómputo
- **Pregunta:** ¿Puede el candidato escalar el cómputo de forma independiente del almacenamiento, sin redistribuir los datos?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Cómputo y almacenamiento acoplados, sin alternativa. | Separación posible pero manual y con downtime al redimensionar. | Separación disponible solo en la oferta gestionada, no en self-hosted. | Separación nativa, redimensionar cómputo no requiere mover datos. | Además, permite múltiples clústeres de cómputo leyendo el mismo almacenamiento en paralelo (multi-cluster). | Referencia del mercado: separación nativa + multi-cluster + escalado en segundos documentado con evidencia pública. |

### DP-ARQ-02 — Lectura/escritura nativa de formatos de tabla abiertos
- **Pregunta:** ¿Puede leer y/o escribir Iceberg, Delta Lake, Hudi o Paimon directamente, sin ETL intermedio?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Ningún formato abierto soportado. | Lectura de un formato, experimental o con limitaciones graves (sin *time travel*, sin *schema evolution*). | Lectura estable de al menos un formato; sin escritura. | Lectura estable de al menos dos formatos y escritura de al menos uno. | Lectura y escritura estables de dos o más formatos, con *time travel* y *schema evolution*. | Lectura y escritura de tres o más formatos, con soporte de catálogos REST externos y sin penalización de rendimiento relevante frente al formato nativo del motor. |

### DP-ARQ-03 — Catálogo externo compatible
- **Pregunta:** ¿Puede registrar y descubrir tablas a través de un catálogo externo estándar (Iceberg REST Catalog, Hive Metastore, AWS Glue, Unity Catalog)?
- **Tipo:** booleano · **Peso:** 2 (Sí = soporta al menos un catálogo externo estándar en producción, no solo en *roadmap*)
- **Obligatorio:** No

---

## DP-CAR · Cargas de trabajo

### DP-CAR-01 — BI / SQL ad hoc
- **Pregunta:** ¿Qué nivel de soporte SQL y de rendimiento interactivo ofrece para consultas ad hoc de analistas?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin interfaz SQL. | SQL muy limitado (subconjunto reducido, sin *joins* complejos). | SQL estándar pero sin optimizador basado en costes documentado. | SQL completo con optimizador CBO, adecuado para BI estándar. | SQL completo + ejecución vectorizada/columnar documentada para baja latencia interactiva. | Referencia del mercado en consultas ad hoc de baja latencia, con adopción a gran escala documentada. |

### DP-CAR-02 — Streaming / tiempo real
- **Pregunta:** ¿Puede ingerir y servir consultas sobre datos que llegan de forma continua, con latencia de segundos o minutos?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin ingesta en streaming; solo carga batch. | Ingesta cuasi-continua vía micro-batch externo (p. ej. cada hora), no nativa. | Conector nativo a una cola (Kafka u otra) pero con latencia de minutos. | Ingesta nativa en streaming con latencia de segundos, documentada. | Ingesta en streaming + indexación consultable casi al instante (SLA de latencia p99 publicado). | Referencia del mercado en analítica de streaming a gran escala, con SLA p99 por debajo de 100 ms documentado en producción. |

### DP-CAR-03 — ML/IA y búsqueda vectorial
- **Pregunta:** ¿Qué soporte nativo ofrece para vectores/embeddings y para ejecutar o invocar modelos de IA sobre los datos?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:** criterio agregado que combina la madurez de DP-IA-02 (búsqueda vectorial) y DP-IA-01 (funciones LLM en SQL) en una única valoración de conjunto de la carga de trabajo ML/IA, no la media aritmética de ambos: el nivel lo marca la combinación de los dos, no cada uno por separado.

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin ningún soporte: ni tipo de dato vectorial ni funciones LLM en SQL. | Solo uno de los dos, y en su nivel mínimo: tipo de dato vector limitado a búsqueda exacta (fuerza bruta), o función LLM únicamente en *preview*/*beta* cerrada. | Uno de los dos en un estado intermedio (índice de búsqueda aproximada — ANN — experimental, o función LLM documentada pero no en disponibilidad general), sin el otro. | Uno de los dos resuelto con solidez (índice ANN estable en GA, o función LLM en GA), y el otro ausente o solo experimental. | Ambos en disponibilidad general y documentados oficialmente: índice ANN estable **y** funciones LLM en SQL en producción. | Referencia del mercado: ambos en GA a escala de producción con evidencia pública de adopción (índice ANN a escala de miles de millones de vectores, funciones LLM ampliamente documentadas), con integración conjunta entre ambos (p. ej. un flujo RAG completo invocable desde SQL). |

### DP-CAR-04 — OLTP / Lakebase
- **Pregunta:** ¿Ofrece (nativamente o mediante un componente integrado del mismo fabricante) un motor transaccional de baja latencia sobre la misma capa de almacenamiento?
- **Tipo:** puntuable · **Peso:** 1
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No es un caso de uso soportado ni recomendado. | Solo vía integración de terceros no oficial. | Soporta *upserts*/actualizaciones puntuales pero sin garantías transaccionales OLTP. | Ofrece un motor OLTP separado del fabricante, pero requiere ETL explícito hacia el analítico. | Motor OLTP integrado que sincroniza hacia el lakehouse sin ETL explícito (p. ej. Lakebase). | Motor OLTP y motor analítico comparten la misma capa de almacenamiento sin proceso de sincronización aparte. |

---

## DP-REN · Rendimiento y escalabilidad

### DP-REN-01 — Concurrencia y autoescalado
- **Pregunta:** ¿Cómo gestiona picos de concurrencia de usuarios/consultas sin degradar la latencia?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin mecanismo de gestión de concurrencia; contención documentada en cargas moderadas. | Gestión manual (colas, *resource groups*) que requiere ajuste continuo. | Autoescalado vertical de un único clúster. | Autoescalado horizontal (más nodos/réplicas) automático. | Autoescalado horizontal + aislamiento de carga entre grupos de usuarios (multi-cluster o *resource isolation*) sin redistribuir datos. | Referencia del mercado: autoescalado horizontal + aislamiento + evidencia pública de concurrencia sostenida a gran escala (benchmark independiente o caso de producción documentado). |

### DP-REN-02 — Benchmarks publicados
- **Pregunta:** ¿Existen resultados de TPC-H, TPC-DS, ClickBench u otro benchmark reconocido para este candidato?
- **Tipo:** informativo (se listan los benchmarks encontrados, quién los publica —fabricante o tercero— y el enlace; no se ejecutan benchmarks propios, según regla del encargo)
- **Obligatorio:** No

### DP-REN-03 — Escala a cero
- **Pregunta:** ¿Puede el cómputo reducirse a coste cero cuando no hay consultas activas, sin intervención manual?
- **Tipo:** booleano · **Peso:** 2 (Sí = suspensión/reanudación automática documentada, sin acción manual del usuario)
- **Obligatorio:** No

---

## DP-INT · Interoperabilidad y lock-in

### DP-INT-01 — Dialecto SQL / estándar
- **Pregunta:** ¿Qué grado de adherencia al estándar SQL tiene, frente a extensiones propietarias imprescindibles para uso normal?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Dialecto propio incompatible con SQL estándar en lo básico. | SQL estándar en lo básico, pero funciones habituales (ventanas, CTE) requieren sintaxis propietaria documentada. | SQL estándar amplio, con algunas extensiones propietarias opcionales. | SQL estándar (ANSI) amplio, extensiones propietarias no imprescindibles para casos de uso comunes. | SQL estándar amplio + compatibilidad de protocolo con otro motor extendido (p. ej. protocolo MySQL/Postgres) documentada. | Referencia del mercado: alta adherencia SQL + interoperabilidad de protocolo documentada + baja fricción migratoria reportada por terceros. |

### DP-INT-02 — Conectores y ecosistema (BI, dbt, drivers)
- **Pregunta:** ¿Qué soporte oficial o mantenido activamente existe para herramientas estándar del ecosistema (dbt, Airflow, JDBC/ODBC, herramientas de BI)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin conectores documentados. | Drivers básicos (JDBC/ODBC) sin más. | Drivers + un adaptador dbt de terceros. | Adaptador dbt oficial/mantenido + drivers + al menos una herramienta BI mayor certificada. | Lo anterior + Airflow/orquestador oficial + varias BI certificadas. | Ecosistema de referencia, con integración oficial documentada en la mayoría de herramientas estándar del mercado. |

### DP-INT-03 — Facilidad de salida de datos
- **Pregunta:** ¿Puede el usuario extraer la totalidad de sus datos en un formato abierto, sin coste de egress prohibitivo ni herramientas propietarias obligatorias?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Solo exportación manual fila a fila o formato propietario cerrado. | — | Exportación a CSV/Parquet pero con coste de egress no documentado o elevado. | Exportación estándar a Parquet/formato abierto documentada, coste de egress publicado. | Además, los datos ya residen en un formato de tabla abierto de forma nativa (no hace falta "exportar"). | Los datos residen en formato abierto en el object store del propio cliente (no del proveedor), de modo que cambiar de motor no implica mover datos. |

---

## DP-GOB · Gobierno y seguridad

### DP-GOB-01 — RBAC/ABAC y políticas de fila/columna
- **Pregunta:** ¿Qué granularidad de control de acceso ofrece (roles, atributos, fila, columna)?
- **Tipo:** puntuable · **Peso:** 3
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin control de acceso granular (todo o nada por usuario). | Permisos a nivel de tabla únicamente. | RBAC a nivel de tabla y columna. | RBAC a nivel de tabla, columna y fila (*row policies*), documentado oficialmente. | RBAC + ABAC (atributos dinámicos) + enmascaramiento dinámico de columnas. | Referencia del mercado: RBAC/ABAC + enmascaramiento + gestión centralizada vía catálogo externo, con evidencia de uso en entornos regulados. |

### DP-GOB-02 — Linaje y auditoría
- **Pregunta:** ¿Registra y expone de forma consultable el linaje de los datos y un log de auditoría de accesos?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin logs de auditoría. | Logs técnicos sin interfaz de consulta. | Auditoría de accesos consultable, sin linaje. | Auditoría + linaje básico a nivel de tabla. | Auditoría + linaje a nivel de columna. | Auditoría + linaje de columna integrado con el catálogo externo, consultable vía API documentada. |

### DP-GOB-03 — Certificaciones de seguridad
- **Pregunta:** ¿Qué certificaciones de seguridad/cumplimiento tiene la oferta gestionada (si existe)?
- **Tipo:** informativo (se listan las certificaciones vigentes con fuente y fecha; p. ej. ISO 27001, SOC 2 Tipo II, HIPAA, PCI, ENS)
- **Obligatorio:** No

### DP-GOB-04 — Residencia de datos en la UE
- **Pregunta:** ¿Ofrece el proveedor una región en la UE donde garantiza contractualmente que los datos (incluidos metadatos) no salen de esa región salvo obligación legal?
- **Tipo:** booleano · **Peso:** 2 (Sí = compromiso contractual documentado de residencia en región UE, no solo disponibilidad técnica de la región)
- **Obligatorio:** No

---

## DP-DEP · Despliegue y operación

### DP-DEP-01 — Modelos de despliegue disponibles
- **Pregunta:** ¿Qué modelos de despliegue ofrece (SaaS, BYOC, self-managed, on-prem, Kubernetes)?
- **Tipo:** informativo (lista de modelos disponibles, con fuente)
- **Obligatorio:** No

### DP-DEP-02 — Esfuerzo operativo en self-managed
- **Pregunta:** Si se despliega en modo self-managed, ¿qué esfuerzo de operación (parcheo, escalado, *backups*, alta disponibilidad) recae en el equipo del cliente?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| No aplica / no existe modo self-managed. | Self-managed posible pero sin herramientas oficiales de automatización (todo manual). | Existen scripts/Helm charts de la comunidad, no oficiales. | Operador oficial (p. ej. Kubernetes operator) mantenido por el fabricante o una fundación. | Operador oficial + automatización de *backups*/HA documentada. | Operador oficial + automatización completa + documentación de referencia de operación en producción a gran escala. |

### DP-DEP-03 — Operador Kubernetes oficial o soportado
- **Pregunta:** ¿Existe un operador de Kubernetes mantenido oficialmente por el fabricante o por una fundación reconocida (no un fork de la comunidad sin mantenimiento activo)?
- **Tipo:** booleano · **Peso:** 2
- **Obligatorio:** No

---

## DP-ECO · Ecosistema y madurez

### DP-ECO-01 — Comunidad y gobernanza
- **Pregunta:** ¿Qué madurez tiene la comunidad y la gobernanza del proyecto (para OSS) o la base de clientes documentada (para propietario)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Proyecto sin actividad pública verificable en los últimos 12 meses. | Actividad baja, gobernanza de un único actor sin transparencia. | Actividad regular, gobernanza de una única empresa. | Actividad alta (releases regulares, cientos de contribuidores) bajo gobernanza de una empresa con historial estable. | Proyecto bajo fundación neutral (Apache, Linux Foundation) con gobernanza documentada. | Referencia de su categoría: fundación neutral + comunidad de contribuidores amplia y activa, documentado con métricas públicas (releases, PRs, contribuidores únicos). |

### DP-ECO-02 — Integraciones con el ecosistema de datos
- **Pregunta:** ¿Qué nivel de integración documentada existe con el resto de la pila (orquestadores, catálogos, observabilidad)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:** Igual patrón que DP-INT-02, aplicado a integraciones de plataforma (catálogos externos, orquestadores, observabilidad) en lugar de herramientas de consumo (BI/dbt), para evitar doble conteo.

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Ninguna integración documentada. | Conectores/integraciones básicas de plataforma. | Integraciones de plataforma de terceros / comunidad. | Integración oficial/mantenida con al menos una herramienta clave de plataforma. | Múltiples integraciones oficiales con herramientas de plataforma (orquestadores, catálogos, observabilidad). | Integración oficial y documentada con la mayoría de piezas estándar de la pila de datos moderna. |

### DP-ECO-03 — Disponibilidad de perfiles en el mercado
- **Pregunta:** ¿Existe evidencia pública (ofertas de empleo, encuestas de adopción, encuestas Stack Overflow/similares) de disponibilidad de profesionales con experiencia en este candidato?
- **Tipo:** informativo (referencia a la fuente usada; no se infiere sin dato público)
- **Obligatorio:** No

---

## DP-LIC · Licencia y modelo de negocio

### DP-LIC-01 — Licencia aprobada por OSI
- **Pregunta:** ¿El núcleo del producto se distribuye bajo una licencia aprobada por la Open Source Initiative (no *source-available* ni *open core* con núcleo cerrado)?
- **Tipo:** booleano · **Peso:** 2 · **Uso como eliminatorio:** sí, es el ejemplo de requisito "licencia OSI" citado en el encargo (sección 7.2.3).
- **Obligatorio:** No

### DP-LIC-02 — Estabilidad de la licencia
- **Pregunta:** ¿Ha cambiado la licencia del proyecto en los últimos 3 años hacia una más restrictiva (de OSI a *source-available*, o cambios de términos de un *open core*)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Cambió a una licencia más restrictiva en el último año. | Cambió en los últimos 1-3 años. | Sin cambios en 3 años pero con historial de cambios previos. | Licencia estable, sin cambios documentados, pero el producto es relativamente joven (< 5 años) para tener un historial largo que evaluar. | Licencia estable durante más de 5 años. | Licencia estable durante más de 5 años + compromiso público del fabricante o la fundación de no cambiarla (p. ej. donación a una fundación neutral). |

---

## DP-COS · Coste

> El criterio de coste (`DP-COS-01`, nota calculada, peso 3) no se define aquí: lo aporta la propia aplicación, que lo calcula a partir de las fichas de [`costes/precios/`](../costes/precios/) (ver [`../costes/metodologia.md`](../costes/metodologia.md#conversión-de-coste-a-nota)).

### DP-COS-02 — Transparencia del modelo de precios
- **Pregunta:** ¿Publica el fabricante una página de precios completa, o requiere "contactar con ventas" para conocer el coste?
- **Tipo:** puntuable · **Peso:** 1
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Ningún precio público, ni siquiera de referencia (ni marketplace). | Solo referencia indirecta (p. ej. listado de marketplace de un hiperescalador) sin página de precios propia. | Página de precios parcial (algunos tiers "contactar con ventas"). | Página de precios completa para todos los tiers principales, con fórmula de cálculo explicada. | Lo anterior + calculadora de coste oficial interactiva. | Lo anterior + histórico de precios públicamente auditable (p. ej. changelog de precios). |

---

## DP-IA · IA y roadmap

### DP-IA-01 — Funciones LLM nativas en SQL
- **Pregunta:** ¿Puede invocarse un modelo de lenguaje (resumir, clasificar, traducir, generar texto) directamente desde una sentencia SQL, sin exportar los datos a un servicio externo?
- **Tipo:** booleano · **Peso:** 2 (Sí = función SQL documentada y en disponibilidad general, no solo en *preview*/*beta* cerrada)
- **Obligatorio:** No

### DP-IA-02 — Búsqueda vectorial nativa
- **Pregunta:** ¿Ofrece un tipo de dato o índice vectorial nativo, consultable con SQL, sin desplegar una base de datos vectorial aparte?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin soporte vectorial. | Tipo de dato vector pero solo búsqueda exacta (fuerza bruta), sin índice. | Índice aproximado (ANN) experimental. | Índice ANN estable en disponibilidad general. | Índice ANN estable + integración documentada con flujos de *embeddings*/RAG. | Referencia del mercado: índice ANN a escala de miles de millones de vectores con coste/rendimiento publicado. |

### DP-IA-03 — Roadmap público de IA
- **Pregunta:** ¿Publica el fabricante un roadmap público (no solo comunicados de prensa puntuales) de sus capacidades de IA?
- **Tipo:** informativo (enlace al roadmap o a la fuente usada para reconstruirlo; si no existe roadmap público, se indica `N/D`)
- **Obligatorio:** No

<!-- /VALOR -->