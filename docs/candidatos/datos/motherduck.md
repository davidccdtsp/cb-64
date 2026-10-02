---
id: motherduck
nombre: MotherDuck
dominio: datos
categoria: cloud-dwh-embebido
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [md-docs-architecture, md-docs-scaling-patterns] }
  DP-ARQ-02: { nota: 3, confianza: alta, fuentes: [md-docs-iceberg, md-docs-delta, md-docs-ducklake] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [md-docs-iceberg] }
  DP-CAR-01: { nota: 4, confianza: alta, fuentes: [md-docs-architecture] }
  DP-CAR-02: { nota: 1, confianza: media, fuentes: [md-docs-ingestion] }
  DP-CAR-03: { nota: 3, confianza: media, fuentes: [md-docs-ai-functions, md-docs-architecture] }
  DP-CAR-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-REN-01: { nota: 3, confianza: alta, fuentes: [md-docs-read-scaling, md-docs-scaling-patterns] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente que incluya a MotherDuck en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "Sí", confianza: media, fuentes: [md-docs-architecture, md-docs-read-scaling] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [md-docs-architecture, md-docs-postgres-endpoint] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [md-github-dbt-duckdb, md-docs-airflow] }
  DP-INT-03: { nota: 3, confianza: media, fuentes: [md-docs-architecture, md-docs-ducklake] }
  DP-GOB-01: { nota: 1, confianza: alta, fuentes: [md-docs-rbac, md-docs-security] }
  DP-GOB-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-GOB-03: { valor: "SOC 2 Tipo II, GDPR", confianza: media, fuentes: [md-blog-business-analytics, md-docs-security] }
  DP-GOB-04: { valor: "N/D — regiones UE disponibles en AWS, pero sin compromiso contractual explícito verificado en DPA", confianza: media, fuentes: [md-docs-regions, md-blog-eu-region] }
  DP-DEP-01: { valor: "SaaS solo en AWS (6 regiones: us-east-1, us-west-2, eu-central-1, eu-west-1 y Asia-Pacífico), con ejecución híbrida cliente local + nube; sin self-hosted del servicio MotherDuck en sí", confianza: alta, fuentes: [md-docs-regions, md-docs-architecture] }
  DP-DEP-02: { valor: "N/D — no aplica, no existe modo self-managed del servicio", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica — SaaS sin modo self-hosted", confianza: n/a, fuentes: [md-docs-architecture] }
  DP-ECO-01: { nota: 2, confianza: media, fuentes: [md-docs-architecture] }
  DP-ECO-02: { nota: 2, confianza: media, fuentes: [md-docs-airflow] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [md-pricing-page] }
  DP-LIC-02: { valor: "No aplica — el servicio MotherDuck es propietario desde su origen (aunque se apoya en DuckDB, licencia MIT, gestionado por la DuckDB Foundation)", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 3, confianza: alta, fuentes: [md-pricing-page] }
  DP-IA-01: { valor: "Sí", confianza: media, fuentes: [md-docs-ai-functions] }
  DP-IA-02: { nota: 1, confianza: media, fuentes: [md-docs-ai-functions, md-docs-architecture] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# MotherDuck

## Resumen

MotherDuck es la oferta cloud propietaria construida sobre DuckDB, con un modelo de **ejecución híbrida**: el optimizador decide en cada consulta si ejecutarla localmente (en el DuckDB embebido del cliente) o en la nube[^md-docs-architecture].

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
Arquitectura con capa de servicio, instancias de cómputo serverless («Ducklings»), catálogo y almacenamiento optimizado, separados entre sí[^md-docs-architecture]; cada usuario o servicio dispone de un *Duckling* dedicado y se pueden añadir réplicas de lectura[^md-docs-scaling-patterns].

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 3/5
MotherDuck lee **y escribe** tablas Iceberg a través de catálogos REST (S3 Tables, Polaris, AWS Glue, Cloudflare R2, Unity Catalog)[^md-docs-iceberg]; Delta Lake solo se **lee** («crear o actualizar datos en formato Delta aún no está soportado»)[^md-docs-delta]; y ofrece DuckLake gestionado, un formato de tabla abierto propio, en *Preview*[^md-docs-ducklake].

### DP-ARQ-03 · Catálogo externo compatible · Sí
Un catálogo REST de Iceberg puede adjuntarse como base de datos persistente de MotherDuck (S3 Tables, Polaris, Glue, R2, Unity Catalog, con lectura y escritura)[^md-docs-iceberg]. .

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Hereda el motor de ejecución vectorizado de DuckDB, adaptado a un servicio cloud, con ejecución híbrida cliente/nube[^md-docs-architecture]. Nivel 4 (SQL completo + ejecución vectorizada).

### DP-CAR-02 · Streaming / tiempo real · 1/5
Sin conector de streaming nativo; la ingesta continua se resuelve materializando tópicos Kafka como tablas Iceberg o mediante socios como Estuary[^md-docs-ingestion]. Es ingesta cuasi-continua mediante micro-batch externo, no nativa: nivel 1 de la rúbrica. Se baja de 3 a 1 (la propia justificación anterior, «sin conector nativo», no era coherente con un 3).

### DP-CAR-03 · ML/IA y búsqueda vectorial · 3/5
Nota agregada de DP-IA-01 (función `PROMPT` que invoca LLM de OpenAI desde SQL)[^md-docs-ai-functions] y DP-IA-02 (solo búsqueda exacta; la extensión VSS/HNSW de DuckDB es experimental y no está soportada en el servicio cloud)[^md-docs-architecture]. Nivel 3 (LLM resuelto, vectorial mínimo). Antes 2/5, cuando se daba IA-01 por `N/D`.

### DP-CAR-04 · OLTP / Lakebase · N/D
Sin fuente localizada en esta revisión.

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 3/5
Cada usuario o servicio tiene un *Duckling* dedicado (aislamiento de carga) y el escalado horizontal se hace con un *pool* de réplicas de lectura: tamaño por defecto 4, ampliable hasta 16 (límite blando), con réplicas inactivas hasta que se conecta un cliente y asignación *round-robin* si se supera el *pool*[^md-docs-read-scaling][^md-docs-scaling-patterns]. Limitaciones: réplicas solo de lectura y con consistencia eventual (minutos de retraso).

### DP-REN-02 · Benchmarks publicados
Sin benchmark independiente localizado.

### DP-REN-03 · Escala a cero · Sí
El modelo es *serverless*: «no necesitas configurar ni arrancar instancias» y los *Ducklings* tienen un arranque en frío inferior a 100 ms[^md-docs-architecture]; las réplicas de lectura permanecen inactivas hasta que hay una conexión[^md-docs-read-scaling]. No se ha localizado una descripción explícita de «auto-suspend» con coste cero, de ahí la confianza media.

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
El usuario interactúa con una versión especializada de DuckDB y su dialecto SQL[^md-docs-architecture]. Existe un *endpoint* compatible con el protocolo de PostgreSQL, pero está en **Preview**[^md-docs-postgres-endpoint], por lo que no se cuenta como compatibilidad de protocolo consolidada.

### DP-INT-02 · Conectores y ecosistema · 2/5
`dbt-duckdb` soporta conexión directa a MotherDuck mediante cadena `md:`, incluyendo DuckLake gestionada[^md-github-dbt-duckdb], y la documentación incluye integración con Airflow[^md-docs-airflow].

### DP-INT-03 · Facilidad de salida de datos · 3/5
Los datos pueden exportarse a formatos estándar desde el cliente DuckDB; las tablas Iceberg de catálogos externos y DuckLake (preview) ya residen en formatos abiertos[^md-docs-architecture][^md-docs-ducklake]. Para el almacenamiento gestionado por defecto la salida requiere exportar.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 1/5
RBAC con roles predefinidos (Admin, Builder, Explorer) y roles personalizados, con *grants* de lectura sobre *Shares*[^md-docs-rbac]; un *Share* puede limitarse a tablas y vistas concretas mediante un patrón de inclusión, lo que da seguridad **a nivel de tabla** sobre los datos compartidos[^md-docs-security]. No se documentan políticas de fila/columna ni enmascaramiento.

### DP-GOB-02 · Linaje y auditoría · N/D
Sin fuente verificada en esta revisión.

### DP-GOB-03 · Certificaciones de seguridad
SOC 2 Tipo II y alineación con GDPR según el anuncio del fabricante[^md-blog-business-analytics]; la página de seguridad documenta cifrado AES-256 en reposo y TLS en tránsito[^md-docs-security].

### DP-GOB-04 · Residencia de datos en la UE · N/D
Regiones UE en AWS: Fráncfort (`eu-central-1`) y Dublín (`eu-west-1`); cada organización queda ligada a una única región elegida al crearla y que no puede cambiarse[^md-docs-regions][^md-blog-eu-region]. Sin embargo, la rúbrica exige un compromiso contractual documentado explícito en el DPA; al no haberse verificado la cláusula contractual formal, se evalúa como N/D.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS exclusivamente en AWS (seis regiones) con ejecución híbrida cliente-nube[^md-docs-regions][^md-docs-architecture]. El servicio en sí no es autogestionable (a diferencia de DuckDB, que sí lo es como motor embebido).

### DP-DEP-02 · N/D
No aplica al no existir modo self-managed del servicio MotherDuck.

### DP-DEP-03 · Operador Kubernetes oficial o soportado · No aplica
MotherDuck es un servicio SaaS sin modo self-hosted que un operador de Kubernetes pudiera desplegar[^md-docs-architecture].

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 2/5
MotherDuck es un servicio SaaS de una única empresa, sin gobernanza de fundación ni métricas públicas de clientes localizadas; la comunidad OSS activa pertenece al motor DuckDB (candidato aparte), no al servicio.

### DP-ECO-02 · Integraciones con el ecosistema de datos · 2/5
Integración con el orquestador Airflow[^md-docs-airflow]. Se excluye el adaptador dbt para evitar el doble conteo con DP-INT-02.

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
Sin fuente pública localizada en esta revisión.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
El servicio MotherDuck es un producto SaaS propietario, sin código fuente publicado[^md-pricing-page]; DuckDB (el motor que lo sustenta) es un candidato aparte, licenciado MIT.

### DP-LIC-02
No aplica al servicio en sí.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 3/5
Página de precios pública con planes (Lite desde 0 $, Business a 250 $/organización/mes) y precios de almacenamiento[^md-pricing-page].

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · Sí
La función `PROMPT` envía texto a un LLM desde SQL (modelos OpenAI: serie gpt-5, gpt-4o, gpt-4.1…) con facturación por «AI Units»; `PROMPT_JEV` clasifica texto con probabilidades calibradas, y `EMBEDDING` genera embeddings[^md-docs-ai-functions]. Confianza media: no se ha verificado si figuran como GA o *preview*, y los datos se envían a un proveedor externo. .

### DP-IA-02 · Búsqueda vectorial nativa · 1/5
La extensión VSS de DuckDB (índice HNSW) es experimental y no está soportada en el lado servidor de MotherDuck[^md-docs-architecture]; el servicio ofrece `EMBEDDING` y funciones de similitud exactas[^md-docs-ai-functions].

### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap dedicado localizada en esta revisión.

[^md-docs-architecture]: MotherDuck Docs, «Architecture and capabilities», https://motherduck.com/docs/concepts/architecture-and-capabilities/, consultado 2026-09-30.
[^md-docs-ingestion]: MotherDuck Docs, «Ingestion», https://motherduck.com/docs/integrations/ingestion/, consultado 2026-09-29.
[^md-pricing-page]: MotherDuck Inc., «MotherDuck Pricing», https://motherduck.com/product/pricing/, consultado 2026-09-30.
[^md-github-dbt-duckdb]: DuckDB Labs (GitHub), «dbt-duckdb», https://github.com/duckdb/dbt-duckdb, consultado 2026-09-29.
[^md-blog-business-analytics]: MotherDuck Blog, «MotherDuck for Business Analytics: SOC 2 Type II, GDPR, and New Plan Offerings», https://motherduck.com/blog/introducing-motherduck-for-business-analytics/, consultado 2026-09-29.
[^md-blog-eu-region]: MotherDuck Blog, «MotherDuck is Landing in Europe! Announcing our EU Region», https://motherduck.com/blog/motherduck-in-europe/, consultado 2026-09-29.
[^md-docs-scaling-patterns]: MotherDuck Docs, «Workload scaling patterns» (§ How MotherDuck scales per workload), https://motherduck.com/docs/concepts/scaling-patterns/, consultado 2026-09-30.
[^md-docs-read-scaling]: MotherDuck Docs, «Read Scaling» (§ Configuring a read scaling duckling pool), https://motherduck.com/docs/key-tasks/authenticating-and-connecting-to-motherduck/read-scaling/, consultado 2026-09-30.
[^md-docs-iceberg]: MotherDuck Docs, «Apache Iceberg» (§ Persisted Iceberg catalogs), https://motherduck.com/docs/integrations/file-formats/apache-iceberg/, consultado 2026-09-30.
[^md-docs-delta]: MotherDuck Docs, «Delta Lake», https://motherduck.com/docs/integrations/file-formats/delta-lake/, consultado 2026-09-30.
[^md-docs-ducklake]: MotherDuck Docs, «DuckLake» (estado Preview), https://motherduck.com/docs/concepts/ducklake/, consultado 2026-09-30.
[^md-docs-ai-functions]: MotherDuck Docs, «AI functions reference» (PROMPT, EMBEDDING), https://motherduck.com/docs/sql-reference/motherduck-sql-reference/ai-functions/, consultado 2026-09-30.
[^md-docs-postgres-endpoint]: MotherDuck Docs, «Postgres endpoint» (estado Preview), https://motherduck.com/docs/getting-started/interfaces/postgres-endpoint/, consultado 2026-09-30.
[^md-docs-airflow]: MotherDuck Docs, «Airflow», https://motherduck.com/docs/integrations/orchestration/airflow/, consultado 2026-09-30.
[^md-docs-rbac]: MotherDuck Docs, «Role-based access control (RBAC)» (§ How roles work), https://motherduck.com/docs/concepts/roles-and-access-control/, consultado 2026-09-30.
[^md-docs-security]: MotherDuck Docs, «Security and compliance» (§ Data encryption), https://motherduck.com/docs/concepts/security/, consultado 2026-09-30.
[^md-docs-regions]: MotherDuck Docs, «Cloud regions» (§ Available regions), https://motherduck.com/docs/about-motherduck/cloud-regions/, consultado 2026-09-30.