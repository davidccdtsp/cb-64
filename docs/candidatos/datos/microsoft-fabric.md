---
id: microsoft-fabric
nombre: Microsoft Fabric
dominio: datos
categoria: cloud-dwh-lakehouse
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: alta, fuentes: [fab-docs-dw-overview, fab-docs-onelake-overview] }
  DP-ARQ-02: { nota: 4, confianza: media, fuentes: [fab-docs-iceberg, fab-docs-onelake-overview] }
  DP-ARQ-03: { valor: "Sí", confianza: media, fuentes: [fab-docs-mirroring-databricks, fab-docs-onelake-shortcuts, fab-docs-iceberg] }
  DP-CAR-01: { nota: 4, confianza: alta, fuentes: [fab-docs-dw-overview, fab-docs-tsql-surface] }
  DP-CAR-02: { nota: 3, confianza: media, fuentes: [fab-docs-eventhouse, fab-docs-eventstream] }
  DP-CAR-03: { nota: 2, confianza: media, fuentes: [fab-blog-diskann-preview, fab-docs-ai-functions] }
  DP-CAR-04: { nota: 4, confianza: alta, fuentes: [fab-docs-sqldb-overview] }
  DP-REN-01: { nota: 3, confianza: media, fuentes: [fab-docs-dw-overview, fab-docs-eventhouse] }
  DP-REN-02: { valor: "N/D — no se ha localizado un benchmark independiente que incluya explícitamente a Microsoft Fabric en esta revisión", confianza: n/a, fuentes: [] }
  DP-REN-03: { valor: "No", confianza: media, fuentes: [fab-docs-pause-resume, fab-docs-eventhouse] }
  DP-INT-01: { nota: 3, confianza: media, fuentes: [fab-docs-tsql-surface] }
  DP-INT-02: { nota: 2, confianza: media, fuentes: [fab-github-dbt-fabric] }
  DP-INT-03: { nota: 4, confianza: media, fuentes: [fab-docs-onelake-overview, fab-docs-iceberg] }
  DP-GOB-01: { nota: 4, confianza: alta, fuentes: [fab-docs-rls, fab-docs-ddm, fab-docs-onelake-security] }
  DP-GOB-02: { nota: 3, confianza: media, fuentes: [fab-docs-lineage, fab-docs-purview-govern] }
  DP-GOB-03: { valor: "ISO/IEC 27001/27017/27018/27701, HIPAA (BAA), SOC 1/2 Tipo II, SOC 3", confianza: alta, fuentes: [fab-blog-compliance] }
  DP-GOB-04: { valor: "N/D — regiones UE disponibles en Azure, pero sin compromiso contractual explícito verificado para Fabric", confianza: media, fuentes: [fab-docs-eudb, fab-trust-eudb] }
  DP-DEP-01: { valor: "SaaS únicamente, sobre Azure; sin self-hosted ni BYOC", confianza: alta, fuentes: [fab-docs-onelake-consumption] }
  DP-DEP-02: { valor: "N/D — no aplica, no existe modo self-managed", confianza: n/a, fuentes: [] }
  DP-DEP-03: { valor: "No aplica — SaaS sin modo self-hosted", confianza: n/a, fuentes: [fab-docs-onelake-consumption] }
  DP-ECO-01: { nota: 3, confianza: media, fuentes: [fab-docs-onelake-consumption] }
  DP-ECO-02: { nota: 2, confianza: media, fuentes: [fab-docs-mirroring-databricks, fab-docs-iceberg] }
  DP-ECO-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [fab-docs-onelake-consumption] }
  DP-LIC-02: { valor: "No aplica — producto propietario desde su origen", confianza: n/a, fuentes: [] }
  DP-COS-02: { nota: 3, confianza: alta, fuentes: [fab-docs-onelake-consumption] }
  DP-IA-01: { valor: "No", confianza: media, fuentes: [fab-docs-ai-functions] }
  DP-IA-02: { nota: 2, confianza: media, fuentes: [fab-blog-diskann-preview, fab-docs-sqldb-overview] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
---

# Microsoft Fabric

## Resumen

Microsoft Fabric es la plataforma de datos y BI unificada de Microsoft sobre Azure, construida alrededor de **OneLake**, un data lake único por organización que almacena las tablas en formato Delta Parquet o Iceberg y las expone a todos los motores de Fabric (Data Warehouse, Lakehouse, Power BI, Real-Time Intelligence) sin duplicar los datos[^fab-docs-onelake-overview].

## Arquitectura

### DP-ARQ-01 · Separación almacenamiento/cómputo · 4/5
OneLake separa el almacenamiento de las capacidades F-SKU (cómputo)[^fab-docs-onelake-overview], y la documentación de Fabric Data Warehouse indica «almacenamiento y cómputo separados» y escalado «casi instantáneo»[^fab-docs-dw-overview]. Varios motores de Fabric (warehouse, lakehouse, Power BI, Real-Time Intelligence) leen las mismas copias de los datos en OneLake.

### DP-ARQ-02 · Lectura/escritura nativa de formatos de tabla abiertos · 4/5
OneLake trabaja con tablas Delta Lake y Apache Iceberg mediante *virtualización de metadatos*: se pueden escribir tablas Iceberg o crear *shortcuts* a ellas y OneLake genera metadatos Delta virtuales (y a la inversa)[^fab-docs-iceberg][^fab-docs-onelake-overview].

### DP-ARQ-03 · Catálogo externo compatible · Sí
Fabric espeja la estructura de **Unity Catalog** de Azure Databricks para leer sus datos sin copiarlos[^fab-docs-mirroring-databricks], y los *shortcuts* de OneLake reconocen automáticamente como tablas las carpetas en formato Delta (o Iceberg) de almacenamientos externos[^fab-docs-onelake-shortcuts][^fab-docs-iceberg]. La integración es con Unity Catalog y mediante *shortcuts*; no se ha verificado un endpoint de catálogo Iceberg REST estándar expuesto por Fabric.

## Cargas de trabajo

### DP-CAR-01 · BI / SQL ad hoc · 4/5
Fabric Data Warehouse con «gestión autónoma de carga de trabajo» y motor de consulta distribuido, y SQL analytics endpoint sobre OneLake[^fab-docs-dw-overview]; superficie T-SQL documentada[^fab-docs-tsql-surface].

### DP-CAR-02 · Streaming / tiempo real · 3/5
Real-Time Intelligence + Eventstream ofrecen ingesta sin código desde múltiples orígenes[^fab-docs-eventstream], y los *eventhouses* están pensados para «consultar miles de millones de eventos en segundos»[^fab-docs-eventhouse]. No se documenta latencia p99.

### DP-CAR-03 · ML/IA y búsqueda vectorial · 2/5
Nota agregada de DP-IA-01 (sin función LLM nativa en SQL localizada) y DP-IA-02 (tipo `VECTOR` con índice DiskANN cuyo estado oficial es *Public Preview*)[^fab-blog-diskann-preview]. 

### DP-CAR-04 · OLTP / Lakebase · 4/5
«SQL database in Fabric» es un motor OLTP del propio fabricante cuyos datos se **replican automáticamente a OneLake** casi en tiempo real (convertidos a Parquet/Delta), sin ETL explícito[^fab-docs-sqldb-overview].

## Rendimiento y escalabilidad

### DP-REN-01 · Concurrencia y autoescalado · 3/5
La capacidad se dimensiona por F-SKU (CU) con una escalera de duplicación fija; el Data Warehouse declara gestión autónoma de la carga y escalado casi instantáneo[^fab-docs-dw-overview] y los *eventhouses* tienen autoescalado con capacidad mínima programable[^fab-docs-eventhouse]. No se ha verificado autoescalado horizontal de la propia capacidad ni aislamiento entre grupos de usuarios más allá de separar capacidades.

### DP-REN-02 · Benchmarks publicados
Sin fuente localizada que incluya explícitamente a Fabric en un benchmark independiente. 

### DP-REN-03 · Escala a cero · No
La capacidad F-SKU se pausa y reanuda manualmente (portal, API o programación)[^fab-docs-pause-resume], y sigue facturándose mientras está activa; solo los *eventhouses* se suspenden por inactividad, con una latencia de reactivación de unos segundos.

## Interoperabilidad y lock-in

### DP-INT-01 · Dialecto SQL / estándar · 3/5
Usa T-SQL con una superficie documentada y **con limitaciones** respecto a SQL Server[^fab-docs-tsql-surface]: dialecto amplio con extensiones propias de Microsoft. No se ha verificado compatibilidad de protocolo con otro motor.

### DP-INT-02 · Conectores y ecosistema · 2/5
Adaptador `dbt-fabric` publicado y mantenido por Microsoft, con colaboración activa de dbt Labs (dbt Cloud soporta Fabric)[^fab-github-dbt-fabric]. Drivers + adaptador dbt oficial, sin verificación en fuentes de herramientas de BI certificadas ni orquestador oficial (Airflow).

### DP-INT-03 · Facilidad de salida de datos · 4/5
Las tablas en OneLake están en formato Delta/Iceberg abierto, accesibles por herramientas externas mediante APIs compatibles con ADLS[^fab-docs-onelake-overview][^fab-docs-iceberg]. Almacenamiento es de Microsoft (OneLake), no el object store del cliente, por lo que cambiar de motor sigue implicando salir de OneLake.

## Gobierno y seguridad

### DP-GOB-01 · RBAC/ABAC y políticas de fila/columna · 4/5
Seguridad a nivel de objeto (`GRANT`/`DENY`), fila (RLS)[^fab-docs-rls], enmascaramiento dinámico de datos[^fab-docs-ddm] y seguridad de plano de datos de OneLake definida sobre carpetas, tablas, filas y columnas[^fab-docs-onelake-security].

### DP-GOB-02 · Linaje y auditoría · 3/5
La vista de linaje de Fabric muestra las relaciones entre **elementos** de un espacio de trabajo y orígenes de datos externos un paso aguas arriba[^fab-docs-lineage]; el gobierno se integra con Microsoft Purview[^fab-docs-purview-govern]. No se ha verificado linaje a nivel de columna ni el detalle de auditoría de accesos.

### DP-GOB-03 · Certificaciones de seguridad
ISO/IEC 27001, 27017, 27018 y 27701; HIPAA (BAA); SOC 1 Tipo II, SOC 2 Tipo II y SOC 3[^fab-blog-compliance].

### DP-GOB-04 · Residencia de datos en la UE · N/D
El EU Data Boundary establece que los servicios regionales de Azure desplegados en una región UE/EFTA almacenan y procesan los datos del cliente en ella[^fab-docs-eudb].No se ha podido verificar compromiso contractual de la condición citada.

## Despliegue y operación

### DP-DEP-01 · Modelos de despliegue disponibles
SaaS únicamente, sobre Azure; sin self-hosted ni BYOC[^fab-docs-onelake-consumption].

### DP-DEP-02 / DP-DEP-03
No aplican al no existir modo self-managed ni despliegue en Kubernetes gestionado por el cliente[^fab-docs-onelake-consumption]. DP-DEP-03 se marca «No aplica» (no «No») para no penalizar con un 0, coherente con la metodología §2.

## Ecosistema y madurez

### DP-ECO-01 · Comunidad y gobernanza · 3/5
Producto SaaS propietario de una única empresa (Microsoft), sin comunidad de contribuidores externa ni gobernanza de fundación neutral[^fab-docs-onelake-consumption].

### DP-ECO-02 · Integraciones con el ecosistema de datos · 2/5
Espejado de Unity Catalog[^fab-docs-mirroring-databricks] e interoperabilidad Iceberg/Delta[^fab-docs-iceberg]. Se excluye el adaptador dbt para evitar el doble conteo con DP-INT-02.

### DP-ECO-03 · Disponibilidad de perfiles en el mercado · N/D
Sin fuente pública localizada en esta revisión.

## Licencia y modelo de negocio

### DP-LIC-01 · Licencia aprobada por OSI · No
Producto SaaS propietario, sin código fuente publicado[^fab-docs-onelake-consumption].

### DP-LIC-02 · Estabilidad de la licencia
No aplica.

## Coste

### DP-COS-02 · Transparencia del modelo de precios · 3/5
La estructura de F-SKU y el coste de OneLake están documentados públicamente[^fab-docs-onelake-consumption], con página de precios de Azure y calculadora de precios oficial enlazada desde ella[^fab-pricing-page]. El modelo de consumo de CU por operación es complejo de estimar.

## IA y roadmap

### DP-IA-01 · Funciones LLM nativas en SQL · No
**No** (confianza media): no se ha localizado una función SQL de invocación de un LLM (resumir, clasificar, generar) en Fabric. Copilot y su texto a SQL son asistentes de interfaz, no funciones SQL; las *AI Functions* de Fabric operan sobre DataFrames de pandas/PySpark[^fab-docs-ai-functions]. La versión anterior daba «Sí» apoyándose en Copilot y en una función de embeddings de SQL Server 2025 cuya disponibilidad en Fabric reconocía no haber verificado, lo que no cumple la definición del criterio.

### DP-IA-02 · Búsqueda vectorial nativa · 2/5
«SQL database in Fabric» admite el tipo de dato vectorial[^fab-docs-sqldb-overview]; el índice vectorial DiskANN figura como *Public Preview* en Azure SQL y en SQL database in Fabric según el blog oficial del equipo[^fab-blog-diskann-preview] (algunas fuentes de terceros lo dan por GA; no confirmado en fuente oficial).

### DP-IA-03 · Roadmap público de IA · N/D
Sin fuente de un roadmap dedicado localizada en esta revisión.

[^fab-docs-onelake-consumption]: Microsoft Learn, «OneLake capacity consumption example», https://learn.microsoft.com/en-us/fabric/onelake/onelake-capacity-consumption, consultado 2026-09-29.
[^fab-docs-onelake-overview]: Microsoft Learn, «OneLake, the unified data lake» (§ One copy of data), https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview#one-copy-of-data, consultado 2026-09-30.
[^fab-docs-eventstream]: Microsoft Learn, «Microsoft Fabric Eventstreams Overview», https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/overview, consultado 2026-09-30.
[^fab-docs-rls]: Microsoft Learn, «Row-Level Security in Fabric Data Warehouse», https://learn.microsoft.com/en-us/fabric/data-warehouse/row-level-security, consultado 2026-09-30.
[^fab-docs-purview-govern]: Microsoft Learn, «Govern your Fabric data with the OneLake catalog», https://learn.microsoft.com/en-us/fabric/governance/onelake-catalog-govern, consultado 2026-09-30.
[^fab-trust-eudb]: Microsoft Trust Center, «Microsoft EU Data Boundary Overview», https://www.microsoft.com/en-ie/trust-center/privacy/european-data-boundary-eudb, consultado 2026-09-29.
[^fab-github-dbt-fabric]: Microsoft (GitHub), «dbt-fabric», https://github.com/microsoft/dbt-fabric, consultado 2026-09-29.
[^fab-blog-compliance]: Microsoft Fabric Blog, «Updated Microsoft Fabric compliance offerings», https://blog.fabric.microsoft.com/en-us/blog/microsoft-fabric-is-now-hipaa-compliant/, consultado 2026-09-29.
[^fab-docs-dw-overview]: Microsoft Learn, «What is Fabric Data Warehouse?», https://learn.microsoft.com/en-us/fabric/data-warehouse/data-warehousing, consultado 2026-09-30.
[^fab-docs-iceberg]: Microsoft Learn, «Use Iceberg tables with OneLake» (§ Virtualize Delta Lake tables as Iceberg), https://learn.microsoft.com/en-us/fabric/onelake/onelake-iceberg-tables#virtualize-delta-lake-tables-as-iceberg, consultado 2026-09-30.
[^fab-docs-onelake-shortcuts]: Microsoft Learn, «OneLake shortcuts» (§ What are shortcuts), https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts#what-are-shortcuts, consultado 2026-09-30.
[^fab-docs-mirroring-databricks]: Microsoft Learn, «Mirroring Azure Databricks Unity Catalog», https://learn.microsoft.com/en-us/fabric/mirroring/azure-databricks, consultado 2026-09-30.
[^fab-docs-tsql-surface]: Microsoft Learn, «T-SQL surface area in Fabric Data Warehouse» (§ Limitations), https://learn.microsoft.com/en-us/fabric/data-warehouse/tsql-surface-area#limitations, consultado 2026-09-30.
[^fab-docs-eventhouse]: Microsoft Learn, «Eventhouse overview», https://learn.microsoft.com/en-us/fabric/real-time-intelligence/eventhouse, consultado 2026-09-30.
[^fab-docs-sqldb-overview]: Microsoft Learn, «SQL database in Microsoft Fabric» (§ Why use SQL database in Fabric), https://learn.microsoft.com/en-us/fabric/database/sql/overview#why-use-sql-database-in-fabric, consultado 2026-09-30.
[^fab-docs-pause-resume]: Microsoft Learn, «Pause and resume your Fabric capacity», https://learn.microsoft.com/en-us/fabric/enterprise/pause-resume, consultado 2026-09-30.
[^fab-docs-ddm]: Microsoft Learn, «Dynamic data masking in Fabric Data Warehouse», https://learn.microsoft.com/en-us/fabric/data-warehouse/dynamic-data-masking, consultado 2026-09-30.
[^fab-docs-onelake-security]: Microsoft Learn, «OneLake security» (plano de datos), https://learn.microsoft.com/en-us/fabric/onelake/security/get-started-security, consultado 2026-09-30.
[^fab-docs-lineage]: Microsoft Learn, «Lineage in Fabric» (§ What do you see in lineage view), https://learn.microsoft.com/en-us/fabric/governance/lineage#what-do-you-see-in-lineage-view, consultado 2026-09-30.
[^fab-docs-ai-functions]: Microsoft Learn, «AI Functions in Microsoft Fabric», https://learn.microsoft.com/en-us/fabric/data-science/ai-functions/overview, consultado 2026-09-30.
[^fab-docs-eudb]: Microsoft Learn, «What is the EU Data Boundary?» (§ Customer data), https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn#customer-data, consultado 2026-09-30.
[^fab-blog-diskann-preview]: Microsoft Azure SQL Dev Corner, «Public preview of vector indexing in Azure SQL DB, Azure SQL MI, and SQL database in Microsoft Fabric», https://devblogs.microsoft.com/azure-sql/public-preview-of-vector-indexing-in-azure-sql-db-azure-sql-mi-and-sql-database-in-microsoft-fabric/, consultado 2026-09-30.
[^fab-pricing-page]: Microsoft Azure, «Microsoft Fabric pricing», https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/, consultado 2026-09-30.