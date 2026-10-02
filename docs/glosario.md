# Glosario

Términos que aparecen en la metodología, las rúbricas, el estado del arte y la aplicación. Cuando un término tiene una definición propia en este proyecto, se indica dónde se aplica.

## Metodología y aplicación

| Término | Significado |
|---|---|
| **Bloque A / Bloque B** | Los dos dominios del estudio: A, plataformas analíticas de datos (prefijo `DP`); B, MarTech (prefijo `MK`). En la app se llaman *área* o *dominio*: Datos y Martech. |
| **Candidato** | Producto o proyecto evaluado. Tiene una ficha en `docs/candidatos/` y otra de costes en `docs/costes/precios/`. |
| **Categoría** | Familia de candidatos comparables (p. ej. `cloud-dwh`, `cdp-packaged`). Las categorías se definen en cada rúbrica. |
| **Dimensión** | Agrupación de criterios afines (p. ej. «Gobierno y seguridad»). Tiene nota propia (0-100) y un peso. Ver `01-metodologia.md` §3 y §9. |
| **Criterio** | Unidad mínima evaluable, con id estable (`DP-GOB-01`, `MK-PRI-02`). Puede ser *puntuable*, *booleano* o *informativo*. |
| **Puntuable** | Criterio con nota de 0 a 5 y una escala que describe cada nivel. |
| **Booleano** | Criterio Sí/No. Cuenta como 5 (Sí) o 0 (No) en la fórmula y puede marcarse como obligatorio. |
| **Informativo** | Dato de ficha que no puntúa (p. ej. licencia exacta). Sirve para mostrar y filtrar. |
| **Peso** | Importancia relativa de un criterio (0-3) o de una dimensión. Solo cuenta la proporción con el resto. |
| **Nota** | Valor de un criterio (0-5). La *puntuación* es el resultado final de un candidato (0-100). |
| **Puntuación (0-100)** | Resultado de aplicar la fórmula en dos niveles: nota por dimensión y media ponderada de las dimensiones. Ver `01-metodologia.md` §9. |
| **N/D** | Sin dato: no hay fuente pública suficiente para puntuar. Nunca se rellena «a ojo». Se trata con la opción elegida: excluir el criterio, contarlo como 0 o usar la media. |
| **N/A** | No aplica: el criterio no tiene sentido para ese candidato (p. ej. regiones en un proyecto solo autoalojado). Sale siempre del cálculo. |
| **Confianza** | Calidad de la fuente de una nota: alta (oficial), media (independiente o fundación) o baja (inferida o prensa). No cambia la nota. |
| **Requisito eliminatorio (*must-have*)** | Condición que, si no se cumple, excluye al candidato: un criterio marcado como obligatorio o un despliegue obligatorio. El candidato queda sin nota y se muestra como «Excluido». |
| **Perfil** | Conjunto de valores predefinido que se aplica de una vez. En el Catálogo, rellena los filtros. En el resumen ejecutivo, es un perfil de necesidad con pesos propios. |
| **Escenario S/M/L** | Tamaño de uso (pequeño, mediano, grande) con parámetros comunes a todos los candidatos del área, para estimar su coste mensual. |
| **Coste normalizado** | Nota de coste `min(5, 5 × coste_mínimo_del_grupo / coste_candidato)`: depende del grupo comparado y del escenario. |
| **TCO** | *Total Cost of Ownership*: coste total de propiedad. En candidatos open source incluye infraestructura y operación, no solo licencia. |
| **Modelo de precios** | Descripción calculable del precio de un candidato (parámetros y fórmulas). Solo algunos candidatos lo tienen; el resto usa el total de su ficha o un importe fijado a mano. |
| **Heatmap** | Gráfico que colorea una matriz según un valor (aquí, candidatos × dimensiones). Todavía no está en la app. |
| **Radar** | Gráfico con un eje por dimensión, para comparar candidatos a la vez. Está en el Comparador. |

## Datos: arquitectura y formatos

| Término | Significado |
|---|---|
| **Data warehouse (DWH)** | Almacén de datos estructurados optimizado para analítica con SQL. |
| **Data lake** | Almacenamiento barato de ficheros de cualquier formato, normalmente en un almacén de objetos. |
| **Lakehouse** | Arquitectura que añade a un data lake garantías propias de un warehouse (transacciones, esquemas, SQL) mediante un formato de tabla abierto. |
| **MPP** | *Massively Parallel Processing*: procesamiento de consultas repartido entre muchos nodos. |
| **Separación almacenamiento/cómputo** | Escalar el cómputo y el almacenamiento por separado. Es la base de los warehouses cloud modernos. |
| **Formato de tabla abierto** | Capa de metadatos sobre ficheros (normalmente Parquet) que da transacciones, evolución de esquema y *time travel*. Ejemplos: Apache Iceberg, Delta Lake, Apache Hudi, Apache Paimon. |
| **Parquet** | Formato de fichero columnar abierto, usado como base de los formatos de tabla. |
| **ACID** | Propiedades de una transacción: atomicidad, consistencia, aislamiento y durabilidad. |
| **Time travel** | Consultar una tabla tal como estaba en un momento anterior. |
| **Copy-On-Write (CoW) / Merge-On-Read (MoR)** | Estrategias de actualización: reescribir los ficheros afectados al escribir (CoW) o guardar los cambios aparte y combinarlos al leer (MoR). |
| **UniForm** | Función de Delta Lake que genera metadatos de Iceberg junto a los de Delta para que clientes Iceberg lean la misma tabla, sin copiar datos. |
| **Apache XTable** | Proyecto que traduce los metadatos entre Hudi, Delta e Iceberg sin copiar datos. Antes se llamaba OneTable. |
| **Catálogo** | Servicio que registra las tablas, su ubicación y sus permisos (Unity Catalog, Apache Polaris, AWS Glue, Nessie, Gravitino, Hive Metastore). |
| **REST Catalog (Iceberg)** | Especificación de API que permite a distintos motores hablar con un catálogo de Iceberg de forma estándar. |
| **Federación de consultas** | Consultar varias fuentes de datos distintas con una sola consulta SQL, sin moverlas antes. |
| **OLTP / OLAP** | Procesamiento transaccional (muchas escrituras pequeñas) y analítico (consultas grandes sobre muchos datos). |
| **HTAP** | *Hybrid Transactional/Analytical Processing*: un mismo sistema para ambos tipos de carga. |
| **Lakebase** | Base de datos transaccional (tipo Postgres) integrada con el lakehouse, sin copia de datos. |
| **Serverless** | Modelo en el que el proveedor gestiona la infraestructura y se factura por uso. |
| **Zero-ETL** | Integraciones que replican datos de un sistema operacional a uno analítico sin que el usuario construya el *pipeline*. |
| **CDC** | *Change Data Capture*: captura de los cambios de una base de datos para propagarlos. |
| **Ejecución vectorizada** | Procesar los datos por bloques de valores en vez de fila a fila, para aprovechar la CPU. |
| **Motor embebido (in-process)** | Motor de consultas que se ejecuta dentro de la aplicación, sin servidor aparte (p. ej. DuckDB). |
| **OLAP en tiempo real** | Motores para consultas analíticas de baja latencia sobre datos recién ingeridos (ClickHouse, Druid, Pinot, StarRocks, Doris). |
| **RBAC / ABAC** | Control de acceso por roles (RBAC) o por atributos (ABAC). |
| **BYOC** | *Bring Your Own Cloud*: el servicio gestionado se ejecuta en la cuenta cloud del cliente. |
| **Self-hosted** | Desplegado y operado por el propio cliente en su infraestructura. |
| **RAG** | *Retrieval-Augmented Generation*: respuestas de un modelo de lenguaje apoyadas en datos recuperados de una base de conocimiento. |
| **Búsqueda vectorial** | Búsqueda por similitud sobre *embeddings*, base de las aplicaciones de IA con datos propios. |
| **MCP** | *Model Context Protocol*: protocolo para conectar modelos de lenguaje con fuentes de datos y herramientas. |
| **Soberanía del dato** | Control sobre dónde se almacenan los datos y quién puede acceder a ellos, con la jurisdicción aplicable. |

## MarTech

| Término | Significado |
|---|---|
| **CDP** | *Customer Data Platform*: plataforma que unifica los datos de clientes de distintas fuentes en un perfil único y los activa en otros sistemas. |
| **CDP empaquetada** | CDP completa de un proveedor, con almacenamiento propio. |
| **CDP composable** | Se construye sobre el data warehouse del cliente, que es la fuente de verdad (*warehouse-native*). |
| **Reverse ETL** | Mover datos del warehouse a herramientas operativas (CRM, email, publicidad). |
| **Resolución de identidad** | Decidir qué registros pertenecen a la misma persona. Puede ser determinista (identificadores exactos) o probabilística. |
| **Perfil unificado** | Vista única de un cliente con todos sus datos y eventos. |
| **Activación** | Enviar audiencias o eventos a los canales donde se actúa sobre el cliente (email, push, anuncios). |
| **MTU** | *Monthly Tracked Users*: usuarios únicos al mes, una unidad habitual de facturación en CDP. |
| **Marketing automation** | Herramientas para orquestar campañas y recorridos del cliente de forma automática. |
| **Email de transporte (transaccional)** | Servicios de envío de email por API (SES, SendGrid, Postmark) centrados en la entrega, no en las campañas. |
| **Deliverability** | Capacidad de que un email llegue a la bandeja de entrada. |
| **SPF / DKIM / DMARC / BIMI** | Mecanismos de autenticación del email y de verificación de marca que influyen en su entregabilidad. |
| **Consentimiento / privacidad** | Gestión de los permisos del usuario sobre sus datos, según RGPD y normativas equivalentes. |
| **Open core** | Modelo en el que el núcleo es de código abierto y funciones avanzadas son de pago. |
