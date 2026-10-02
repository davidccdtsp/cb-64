---
id: apache-pinot
nombre: Apache Pinot
dominio: datos
categoria: olap-tiempo-real
tipo: hibrido
licencia: Apache-2.0
despliegue: [self-hosted, kubernetes, saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 0, confianza: media, fuentes: [pinot-docs-deep-store, pinot-docs-tenant] }
  DP-ARQ-02: { nota: 0, confianza: media, fuentes: [pinot-docs-deep-store] }
  DP-ARQ-03: { valor: "No", confianza: media, fuentes: [pinot-docs-deep-store] }
  DP-CAR-01: { nota: 2, confianza: media, fuentes: [pinot-docs-mse] }
  DP-CAR-02: { nota: 3, confianza: alta, fuentes: [pinot-docs-stream-ingestion] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [pinot-docs-vector-index] }
  DP-CAR-04: { nota: 0, confianza: media, fuentes: [pinot-web-official] }
  DP-REN-01: { nota: 1, confianza: media, fuentes: [pinot-docs-tenant, pinot-docs-query-quotas] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No", confianza: media, fuentes: [pinot-docs-deep-store] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [pinot-docs-mse] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [pinot-docs-bi-tools, pinot-docs-jdbc] }
  DP-INT-03: { nota: 0, confianza: media, fuentes: [pinot-docs-deep-store] }
  DP-GOB-01: { nota: 1, confianza: media, fuentes: [pinot-docs-access-control] }
  DP-GOB-02: { nota: 1, confianza: media, fuentes: [pinot-docs-audit] }
  DP-GOB-03: { valor: "N/D — StarTree (oferta gestionada) no evaluada; su página de precios no lista certificaciones", confianza: n/a, fuentes: [] }
  DP-GOB-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-DEP-01: { valor: "Self-hosted (binarios, Docker, Kubernetes con Helm); oferta gestionada de StarTree (SaaS y BYOC/BYOK)", confianza: alta, fuentes: [pinot-docs-kubernetes, startree-pricing, startree-cloud] }
  DP-DEP-02: { nota: 2, confianza: media, fuentes: [pinot-docs-kubernetes] }
  DP-DEP-03: { valor: "No", confianza: media, fuentes: [pinot-docs-kubernetes] }
  DP-ECO-01: { nota: 4, confianza: alta, fuentes: [pinot-web-official] }
  DP-ECO-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "Sí", confianza: alta, fuentes: [pinot-github-license] }
  DP-LIC-02: { nota: 5, confianza: alta, fuentes: [pinot-github-license] }
  DP-COS-02: { nota: 3, confianza: media, fuentes: [startree-pricing] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [pinot-docs-mse] }
  DP-IA-02: { nota: 3, confianza: media, fuentes: [pinot-docs-vector-index] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Apache Pinot

## Resumen

Apache Pinot nació en LinkedIn para servir analítica en tiempo real con SLA de latencia estrictos de cara al usuario, con arquitectura de segmentos similar a Druid pero índices *pluggables* por columna (ver `estado-del-arte/datos/estado-del-arte.md`). Donado a la Apache Software Foundation en 2019, hoy Top-Level Project. **StarTree** es su oferta gestionada de referencia, el mismo patrón que ClickHouse Cloud/Starburst/CelerData.

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 0/5
Los servidores de Pinot sirven los segmentos desde su copia local; el *deep store* es el almacén permanente de segmentos y se usa para copia de seguridad y restauración (los servidores nuevos descargan una copia de él)[^pinot-docs-deep-store]. Los roles (controlador, *broker*, servidor, *minion*) son separables y se aíslan con *tenants*[^pinot-docs-tenant], pero el cómputo de consulta sigue acoplado a los discos locales de los servidores.

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 0/5
No se ha localizado, en la documentación vigente, soporte de lectura ni escritura de tablas Iceberg, Delta Lake, Hudi ni Paimon; Pinot usa su propio formato de segmento[^pinot-docs-deep-store].

### DP-ARQ-03 · Catálogo externo compatible · No
Sin soporte localizado de catálogos externos Iceberg REST, Glue, Hive o Unity.

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 2/5
El motor multietapa (*multi-stage engine*) añade *joins* y funciones de ventana sobre el motor de una sola etapa, optimizado para consultas predecibles de baja latencia[^pinot-docs-mse].

### DP-CAR-02 · Streaming / tiempo real · 3/5
Ingesta nativa desde Kafka, Kinesis y Pulsar; la documentación afirma que permite «consultar los datos segundos después de su publicación»[^pinot-docs-stream-ingestion]. Nivel 3 (ingesta nativa con latencia de segundos).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Índices vectoriales HNSW, IVF_FLAT, IVF_PQ e IVF_ON_DISK para búsqueda ANN, sin etiqueta de experimental en la documentación[^pinot-docs-vector-index]; no se ha localizado función LLM en SQL.

### DP-CAR-04 · OLTP / Lakebase · 0/5
Pinot es un almacén analítico de baja latencia sin motor transaccional[^pinot-web-official].

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 1/5
Aislamiento de carga mediante *tenants* de *broker* y de servidor[^pinot-docs-tenant] y cuotas de consulta configurables[^pinot-docs-query-quotas]; no se documenta autoescalado automático del clúster.

### DP-REN-02 · N/D

### DP-REN-03 · Escala a cero · No
Nodos persistentes (controlador, servidor, *broker*, *minion*) que sirven segmentos desde disco local[^pinot-docs-deep-store]; la documentación no describe suspensión/reanudación automática.

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
SQL con dos motores (una etapa y multietapa), el segundo con *joins* y funciones de ventana[^pinot-docs-mse].

### DP-INT-02 · Conectores y ecosistema · 2/5
Controladores JDBC, Java, Python y Go[^pinot-docs-jdbc], documentación de integración con Superset, Tableau y Metabase[^pinot-docs-bi-tools] y conectores de Spark y Flink; no se ha localizado adaptador dbt. N

### DP-INT-03 · Facilidad de salida de datos · 0/5
Los datos están en el formato de segmento propio de Pinot y el *deep store* (almacenamiento del cliente) guarda esas copias de segmentos[^pinot-docs-deep-store]; no se documenta exportación estándar a formatos abiertos.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 1/5
Pinot ofrece control de acceso con principales y permisos por tabla (p. ej. `READ`), autenticación básica y TLS, y **seguridad a nivel de fila (RLS)** desde la versión 1.4.0, donde el *broker* reescribe las consultas añadiendo predicados según el principal autenticado[^pinot-docs-access-control]; aunque soporta seguridad a nivel de fila, no se ha verificado seguridad a nivel de columna, impidiendo alcanzar los niveles 2 o 3.

### DP-GOB-02 · Linaje y auditoría · 1/5
Registro de auditoría de las peticiones REST al controlador y al *broker* (desde la v1.5.0, desactivado por defecto), escrito en un fichero JSON (`pinot-audit.log`), no en una tabla consultable[^pinot-docs-audit]. Nivel 1 («logs técnicos sin interfaz de consulta»). 

### DP-GOB-03 / DP-GOB-04
N/D (oferta gestionada de StarTree no evaluada).

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
Self-hosted (binarios, Docker y Kubernetes con Helm[^pinot-docs-kubernetes]) o StarTree como oferta gestionada (SaaS público o BYOC)[^startree-pricing][^startree-cloud].

### DP-DEP-02 · Esfuerzo operativo en self-managed · 2/5
El proyecto mantiene un *Helm chart* oficial (Helm 3) para desplegar un clúster de producción en Kubernetes[^pinot-docs-kubernetes]; no se ha localizado un operador de Kubernetes.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No
No se ha localizado un operador mantenido por la ASF; la documentación oficial ofrece solo *Helm charts*[^pinot-docs-kubernetes]. Confianza media. 

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 4/5
Top-Level Project de la Apache Software Foundation desde 2021[^pinot-web-official]; 6.146 estrellas, 1.520 *forks* y 491 contribuidores (incluidos anónimos) en GitHub, con actividad el día de esta consulta[^github-pinot-api].

### DP-ECO-02 · Integraciones con el ecosistema de datos · N/D
Sin fuente suficiente (conectores de Spark/Flink y Trino documentados[^pinot-docs-bi-tools], sin catálogos ni orquestadores).

### DP-ECO-03 · Disponibilidad de perfiles en el mercado
N/D.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · Sí
Apache License 2.0[^pinot-github-license].

### DP-LIC-02 · Estabilidad de la licencia · 5/5
Apache-2.0 desde su liberación en 2015, sin cambios documentados.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 3/5
StarTree publica tarifas: SaaS público a 0,21 $/h por vCPU de producción y BYOC a 0,11 $/h, «todo incluido» y con descuentos por volumen bajo contacto[^startree-pricing]. Nivel 3 (precios públicos de los tiers principales con fórmula explicada); sin calculadora oficial localizada. 

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
No se ha localizado ninguna función de invocación de LLM en la documentación SQL[^pinot-docs-mse]. Confianza media (ausencia). 

### DP-IA-02 · Búsqueda vectorial nativa · 3/5
Índices HNSW e IVF (FLAT, PQ, ON_DISK) documentados, con búsqueda ANN, por radio y con filtros[^pinot-docs-vector-index]. La página no declara estado experimental, aunque tampoco lo confirma como GA; nivel 3 con confianza media. 

### DP-IA-03 · Roadmap público de IA
N/D.

[^pinot-linkedin-blog]: LinkedIn Engineering Blog, «Real-time Analytics at Massive Scale with Pinot» (2015; contexto histórico, no respalda métricas actuales), https://engineering.linkedin.com/analytics/real-time-analytics-massive-scale-pinot, consultado 2026-09-29.
[^pinot-web-official]: Apache Pinot, web oficial, https://pinot.apache.org/, consultado 2026-09-29.
[^startree-rbac]: StarTree Inc., «Introducing Security Manager: Role-Based Access Control (RBAC) in StarTree», https://startree.ai/resources/introducing-security-manager-rbac-in-startree/, consultado 2026-09-29.
[^startree-cloud]: StarTree Inc., «StarTree Cloud», https://startree.ai/products/startree-cloud/, consultado 2026-09-29.
[^pinot-github-license]: Apache Software Foundation (GitHub), «LICENSE (apache/pinot)», https://github.com/apache/pinot/blob/master/LICENSE, consultado 2026-09-29.
[^pinot-docs-deep-store]: Apache Pinot Docs, «Deep Store» (§ How do segments get into the deep store?), https://docs.pinot.apache.org/architecture-and-concepts/components/table/segment/deep-store#how-do-segments-get-into-the-deep-store, consultado 2026-09-30.
[^pinot-docs-tenant]: Apache Pinot Docs, «Tenant» (§ Tenant configuration), https://docs.pinot.apache.org/architecture-and-concepts/components/cluster/tenant#tenant-configuration, consultado 2026-09-30.
[^pinot-docs-mse]: Apache Pinot Docs, «Multi-Stage Query», https://docs.pinot.apache.org/build-with-pinot/querying-and-sql/multi-stage-query, consultado 2026-09-30.
[^pinot-docs-stream-ingestion]: Apache Pinot Docs, «Stream ingestion», https://docs.pinot.apache.org/build-with-pinot/ingestion/stream-ingestion/stream-ingestion, consultado 2026-09-30.
[^pinot-docs-vector-index]: Apache Pinot Docs, «Vector index» (§ Overview), https://docs.pinot.apache.org/build-with-pinot/indexing/vector-index#overview, consultado 2026-09-30.
[^pinot-docs-query-quotas]: Apache Pinot Docs, «Query Quotas», https://docs.pinot.apache.org/build-with-pinot/querying-and-sql/query-execution-controls/query-quotas, consultado 2026-09-30.
[^pinot-docs-bi-tools]: Apache Pinot Docs, «BI tools» (Superset, Tableau, Metabase), https://docs.pinot.apache.org/build-with-pinot/connectors-clients-apis/bi-tools, consultado 2026-09-30.
[^pinot-docs-jdbc]: Apache Pinot Docs, «JDBC client», https://docs.pinot.apache.org/build-with-pinot/connectors-clients-apis/client-libraries/jdbc, consultado 2026-09-30.
[^pinot-docs-access-control]: Apache Pinot Docs, «Access control» (§ Row-Level Security, desde 1.4.0), https://docs.pinot.apache.org/operate-pinot/security/access-control#row-level-security-rls, consultado 2026-09-30.
[^pinot-docs-audit]: Apache Pinot Docs, «Audit logging» (desde 1.5.0; § How it works), https://docs.pinot.apache.org/operate-pinot/security/audit-logging#how-it-works, consultado 2026-09-30.
[^pinot-docs-kubernetes]: Apache Pinot Docs, «Kubernetes» (Helm), https://docs.pinot.apache.org/start-here/install/kubernetes, consultado 2026-09-30.
[^startree-pricing]: StarTree Inc., «Pricing», https://startree.ai/pricing, consultado 2026-09-30.
[^github-pinot-api]: GitHub API, «apache/pinot» (estrellas, forks, contribuidores), https://api.github.com/repos/apache/pinot, consultado 2026-09-30.