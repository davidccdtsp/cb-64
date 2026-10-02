# Estado del arte

## Evolución

### 1. 1970 - 1980
Durante los compases iniciales el procesamiento de datos se componía mayoritariamente de escrituras en base de datos referentes a transacciones comerciales (retirada de dinero, creación de un pedido...). Es en esta época cuando se adopta modelo relacional y transforma en un estándar dominante. Con el tiempo y conforme las bases de datos se van voliviendo más extensas, las transcciones comienzan a implicar un elenco de ámbitos mayor, lo que hace que el concepot transacción quede desfasado y pase a definirse como un conjunto de escrituras y lecturas que conforman una operación atómica.

El crecimiento en el uso de estas tecnologías y el mayor tipo de datos almacenado no implicó un cambio considerable en su modo de uso. Báscimente se mantenía el mismo paradigma para transacciones OLTP (Online Transaction Processing), conformado por búsquedas de un pequeño número de entradas, actualizaciones, borrados y creación de nuevas líneas. 

Sin embargo con el tiempo las bases de datos comenzaron a ser empleadas para usos analíticos, los cuales tienen una naturaleza propia que las hace requerir unos patrones de acceso diferentes. Por norma una consulta de tipo analítoco tiende a escanear un numero grande de entradas y a calcular sobre ellas valores estadísticos agregados (count, sum, average). Este tipo de transacciones son conocidas como OLAP (Online Analytical Processing).

### 2. Data warehouse clásico MPP on-prem (mediados de los 90 – ~2010)

Inicialmente la misma base de datos daba soporte a OTLP y OLAP. Al mismo tiempo SQL demostró ser altamente flexible al dar soporte a ambos tipos de consultas [1]. Con el tiempo las empresas comienzan a acumular grandes cantidades de datos, los cuales son valiosos en la toma de decisiones. El crecimiento en escala y uso hace incipiente la aparación de problemas:

- Las consultas analíticas suelen requerir un mayor consumo de recursos, lo que puede impactar en el tiempo de respuesta percibido por los clientes.
- En sistemas distribuidos los datos pueden estar desperdigados en varias bases de datos, que pueden ser de diferente índole.
- Los sistemas OLTP pueden residir en redes diferentes de las empleadas por lo sistemas OLAP.
- La estructura de los datos empleada (esquemas en DB) a nivel de negocio no siempre es la mas adecuada para el paradigma analítico [1, 4].

Esto lleva a las compañías a segregar los sistemas analíticos de los de procesamiento. Nacen las primeras *Data Warehosue*, sitemas con una base de datos específicamente diseñada para tareas de tipo analítico. Los datos son extraídos, transformados y cargados (ETL) de forma periódica desde una o varias bases de datos OLTP. Se emplean esquemas propios como pueden ser los esquemas de tipo estrella [5].

### 3. Big Data y almacenamiento por columnas (2003–2012)

A principios de los 2000 el volumen de datos generado por las grandes compañías de internet desborda la capacidad de los *Data Warehouse* clásicos. Google publica el Google File System y el modelo de programación MapReduce (2003-2004), pensados para procesar por lotes enormes volúmenes de datos sobre almacenamiento distribuido y hardware barato. En 2005 aparece Hadoop/HDFS como versión de código abierto de estas ideas, lo que permite a cualquier organización desplegar infraestructura de procesamiento masivo sin depender de un único fabricante [3, 5].

En paralelo, dentro del propio mundo de las bases de datos relacionales, surge una segunda corriente: el almacenamiento orientado a columnas (C-Store) y la ejecución vectorizada (MonetDB/X100), ambos de 2005. Frente al almacenamiento por filas tradicional, guardar los datos columna presenta una serie de implicaciones ventajosas como pueden ser un mayor rendimiento a nivel de consultas, permite comprimir mejor además de, leer solo las columnas implicadas en la consulta y aprovechando las instrucciones vectoriales del procesador, lo que resulta especialmente ventajoso para cargas OLAP [3, 7, 8, 9, 10].

También en este periodo nace el movimiento NoSQL, con Bigtable (2006) como referencia de modelo *column-family*, y numerosos sistemas de documentos y clave-valor que a finales de la década priorizan APIs de bajo nivel y consistencia débil (BASE) frente a las garantías ACID clásicas, a cambio de escalar horizontalmente con mayor facilidad [3, 11].

Sin embargo, un estudio comparativo de 2009 muestra que los data warehouse paralelos siguen superando a Hadoop en cargas OLAP, lo que evidencia que MapReduce no fue diseñado para este tipo de consultas. Para acercar Hadoop al mundo SQL aparece Hive (2010), que traduce consultas SQL a trabajos MapReduce. Es también hacia 2010 cuando, según Armbrust, se consolida lo que denominan la **segunda generación** de plataformas analíticas: el *data lake*, un almacenamiento barato y de propósito general donde se vuelcan los datos en bruto con *schema-on-read*, delegando la calidad y el gobierno de los datos a fases posteriores [1]. A comienzos de los 2010 se estandarizan además formatos de fichero columnares abiertos como Parquet y ORC, que permiten a distintos motores leer y escribir los mismos datos, y surge NewSQL, una familia de sistemas que busca escalar horizontalmente sin renunciar a SQL ni a ACID [3].

### 4. Nube y separación almacenamiento/cómputo (2012–2019)

Las primeras ofertas de bases de datos en la nube se limitaban a trasladar los sistemas on-premise a máquinas virtuales con disco local. Sin embargo, el ancho de banda de red creció mucho más rápido que el de disco, lo que hizo viable separar el almacenamiento del cómputo y obligó a replantear la arquitectura de los sistemas de gestión de bases de datos [3]. En esta década todos los fabricantes de data warehouse migran de forma generalizada del almacenamiento por filas al columnar (Redshift, BigQuery, Snowflake), y en 2014 Google abandona internamente MapReduce, lo que anticipa el declive de Hadoop como motor de procesamiento [3].

A partir de 2015 los *object stores* en la nube (S3, ADLS, GCS) sustituyen a HDFS como capa de almacenamiento por su durabilidad, georreplicación y bajo coste [1]. Snowflake (2016) es la referencia del **cloud DWH con almacenamiento y cómputo separados**: los datos residen en el object store y el cómputo se añade o retira de forma elástica por consulta sin redistribuir datos, dando origen al modelo *serverless* [3]. Esta separación resuelve el problema de tener que dimensionar y pagar por el pico de carga, pero mantiene formatos propietarios que generan dependencia del fabricante (*lock-in*) y siguen sin ser eficientes para cargas de machine learning y ciencia de datos [1].

Durante casi una década, data lake y cloud DWH conviven en la llamada **arquitectura de dos niveles**: una parte de los datos del lake se vuelve a cargar, vía ETL, en un warehouse para dar servicio a BI. Este modelo introduce problemas de fiabilidad (mantener ambos sistemas coherentes), datos obsoletos, soporte limitado para analítica avanzada y duplicación de costes de almacenamiento [1]. Como respuesta, en 2016 nace Delta Lake (Databricks) y, en paralelo, Iceberg (Netflix) y Hudi (Uber): una capa transaccional de metadatos que se sitúa sobre el data lake para aportarle garantías propias de un SGBD [1]. Cierra el periodo la aparición de DuckDB (2019), un motor analítico embebido que se ejecuta en el propio proceso de la aplicación [3].

### 5. Lakehouse (2020–2023)

En 2020 Delta Lake se publica como una capa de almacenamiento de tablas con garantías ACID sobre object stores, consolidando la idea de dotar al data lake de las propiedades transaccionales de un SGBD. En 2021 Armbrust formaliza el concepto de **lakehouse**: un sistema de gestión de datos que combina formatos abiertos de acceso directo, soporte nativo para ML y ciencia de datos, y un rendimiento comparable al de un data warehouse [1]. Esta arquitectura se apoya en tres ideas técnicas: una capa transaccional de metadatos sobre el object store que define qué ficheros componen cada versión de una tabla; optimizaciones independientes del formato, como el uso de caché, datos auxiliares (estadísticas min-max, índices) y la reorganización física de los datos (p. ej. Z-order); y APIs declarativas de DataFrames que permiten que también las cargas de ML se beneficien del optimizador de consultas [1]. El gobierno de los datos (control de acceso, auditoría) se implementa igualmente en esa capa de metadatos, y ese mismo año se propone el HTAP como una capa adicional ("bolt-on") sobre el lakehouse [1]. En 2022 aparecen motores de ejecución vectorizados nativos para lakehouse, como Photon [3].

En 2023 Jain. publica una comparativa de los tres formatos abiertos de tabla (Delta, Hudi e Iceberg): todos implementan MVCC con control de concurrencia optimista, pero solo ofrecen transacciones a nivel de tabla, nunca entre tablas. Delta y Hudi organizan sus metadatos de forma tabular y permiten planificación distribuida, mientras que Iceberg los organiza de forma jerárquica (manifiestos) y planifica en un solo nodo. Para las actualizaciones, los tres soportan dos estrategias: *Copy-on-Write*, que reescribe ficheros y favorece la lectura, y *Merge-on-Read*, que difiere la reconciliación y favorece la escritura [2]. Ese mismo trabajo introduce LHBench, un banco de pruebas abierto para comparar sistemas lakehouse, y muestra que, con el mismo motor de ejecución, el formato elegido puede suponer diferencias de rendimiento de 1,7x de media y hasta 10x en consultas concretas, atribuibles a decisiones de implementación como el tamaño de fichero o la estrategia de metadatos [2]. Cierran el periodo dos hitos que muestran la penetración de la IA en el ecosistema analítico: las bases de datos relacionales incorporan índices vectoriales en menos de un año tras la aparición de ChatGPT, y el estándar SQL:2023 añade soporte para grafos de propiedades (SQL/PGQ) y arrays multidimensionales (SQL/MDA) [3].

## Formatos de tabla abiertos

Capas de abstracción basada en metadatos que se sitúa sobre los archivos de de datos en el almacenamiento de objetos. Permiten aplicar caraterísticas y propiedades tradicionalmente asociadas a transacciones SQL que permiten un comportamiento como si de una base de datos tradicional se tratase.

- Propiedades ACID.
- Evolución del esquema.
- Time Travel y RollBack.
- Modificación fina (Update, Merge, Delete).
- Interoperabilidad entre motores.

### Apache Iceberg
* Web oficial: [https://iceberg.apache.org](https://iceberg.apache.org)
* Especificación: [https://iceberg.apache.org/spec/](https://iceberg.apache.org/spec/)
* Adopción: Es el sistema de almacenamiento utilizado por Netflix para su pila de análisis.   
* Transacciones y aislamiento: Implementa el control de concurrencia multiversión mediante bloqueos a nivel de tabla (usando ZooKeeper, Hive MetaStore o DynamoDB). Proporciona aislamiento de instantáneas (Snapshot Isolation) meidante una política de concurrencia optimista y, opcionalmente, serializabilidad.   
* Gestión de metadatos: Almacena los metadatos en un formato jerárquico mediante archivos de manifiesto, donde el nivel superior funciona como un índice. La planificación de consultas se realiza en un solo nodo utilizando este índice, lo cual es rápido para consultas pequeñas pero puede escalar peor en escaneos completos de tablas grandes.   
* Estrategia de actualización: Soporta estrategias Copy-On-Write (CoW) y Merge-On-Read (MoR). Para MoR, utiliza archivos auxiliares tipo "tombstone" que marcan los registros eliminados o actualizados directamente en los archivos de datos [2, 12].   

### Delta Lake

* Web oficial: [https://delta.io](https://delta.io)
* Especificación del protocolo: PROTOCOL.md en [https://github.com/delta-io/delta](https://github.com/delta-io/delta])
* Adopción: Es utilizado de forma masiva por clientes de Databricks, gestionando más del 70% de los bytes que estos escriben.
* Transacciones y aislamiento: Utiliza control de concurrencia multiversión y se apoya en el servicio de almacenamiento subyacente (mediante operaciones put-if-absent) o en DynamoDB para garantizar la atomicidad. Por defecto, ofrece serializabilidad y puede configurarse para dar serializabilidad estricta en operaciones de solo lectura.
* Gestión de metadatos: Organiza los metadatos en un formato tabular combinando un registro de transacciones con puntos de control en formatos Parquet y JSON. Planifica las consultas de forma distribuida (por ejemplo, con un trabajo de Spark), lo que escala muy bien para tablas grandes.
* Rendimiento y actualizaciones: En las pruebas del documento, demostró el mejor rendimiento en consultas de lectura completas, siendo en promedio 1.4 veces más rápido que Hudi y 1.7 veces más rápido que Iceberg. En su versión analizada (2.2.0) solo emplea la estrategia Copy-On-Write (CoW) [2, 13]

### Apache Hudi

* Web oficial: [https://hudi.apache.org](https://hudi.apache.org)
* Adopción: Es el formato en el que Uber ejecuta su pila de análisis.
* Transacciones y aislamiento: Al igual que Iceberg, coordina las transacciones utilizando bloqueos a nivel de tabla y ofrece aislamiento de instantáneas (Snapshot Isolation) por defecto.
* Gestión de metadatos: Utiliza un formato tabular para guardar sus metadatos dentro de una tabla especial y distribuye la planificación de las consultas.
* Estrategia de actualización: Soporta tanto Copy-On-Write (CoW) como Merge-On-Read (MoR). Su implementación MoR guarda las inserciones y actualizaciones a nivel de fila en archivos Avro, reconciliándolos con los archivos Parquet al momento de la consulta.
* Rendimiento: Sobresale en consultas muy pequeñas porque almacena en caché los planes de consulta. Sin embargo, su tiempo de carga masiva de datos es casi 10 veces más lento que el de Delta e Iceberg debido a que, por defecto, deduplica y ordena los datos ingeridos por claves. Además, al crear archivos más pequeños en disco, reduce la eficiencia de la compresión y aumenta el tiempo de lectura en escaneos amplios [2, 14]. 

### Apache Paimon

* Web oficial: [https://paimon.apache.org](https://paimon.apache.org)
* Repositorio: [https://github.com/apache/paimon](https://github.com/apache/paimon)
* Orientado al streaming en tiempo real, ofreciendo baja latencia en ingestión y procesamiento. 
Se define como un formato de lake para construir arquitecturas lakehouse en tiempo real con Flink y Spark, tanto en streaming como en batch, y combina el formato de lake con una estructura LSM. 
* Adopción: Nació como Flink Table Store en 2022 y se graduó como Top-Level Project de Apache en abril de 2024. Está diseñado específicamente para la arquitectura streaming-lakehouse, la ingesta continua de datos mediante Change Data Capture (CDC) y el procesamiento eficiente de tablas orientadas a clave primaria.
* Transacciones y aislamiento: Utiliza una arquitectura de almacenamiento inspirada en árboles LSM (Log-Structured Merge-tree), distribuyendo los datos en buckets mediante la clave primaria e imprimiéndolos en ejecuciones ordenadas de archivos SST (Sorted String Table). Proporciona transacciones ACID basadas en instantáneas (snapshots) y permite alternar entre formatos orientados a filas o columnas según el nivel de la estructura LSM.
* Gestión de metadatos: Su estructura de metadatos está optimizada para flujos de escritura continuos con un costo fijo de planificación (overhead) muy reducido. Permite realizar commits continuos e infrecuentes de instantáneas (por ejemplo, checkpoints cada 15 minutos) manteniendo la consistencia sin necesidad de bases de datos intermedias. 
* Estrategia de actualización y rendimiento: Funciona nativamente bajo el modelo Merge-On-Read (MoR), donde los upserts y eliminaciones se escriben como deltas incrementales sin releer el estado previo, delegando la reorganización a compactaciones asíncronas en segundo plano. En escenarios de ingesta streaming CDC (como flujos Flink + Kafka) procesa volúmenes masivos (hasta 1,500 millones de eventos diarios a ~278,000 eventos/seg) duplicando la velocidad de los pipelines Spark micro-batch tradicionales. En lecturas es más rápido que el modo MoR de Iceberg, aunque en actualizaciones masivas por lotes (batch UPDATE) muestra un costo marginal superior debido al shuffle y bucketing previo de los datos [15, 16, 17].

### Lance
* Web oficial: [https://lance.org](https://lance.org)
* Formato de tabla abierto enfocada a cubrir las necesidades de la IA multimodal.
* Adopción: Creado por los desarrolladores de LanceDB, es un formato de tabla y archivo columnar diseñado específicamente para cargas de trabajo de inteligencia artificial, aprendizaje automático, búsqueda vectorial y recuperación aumentada por generación (RAG) sobre almacenamiento local NVMe y la nube (S3).
* Transacciones y aislamiento: Implementa control de concurrencia multiversión (MVCC) con archivos de datos inmutables y fragmentos de solo lectura. Las actualizaciones y escrituras operan bajo un modelo de anexado continuo (append-only), lo que garantiza actualizaciones directas sin corrupción y capacidad de "viaje en el tiempo" (time travel) mediante manifiestos de versión.
* Gestión de metadatos: Resuelve el problema del sobrecosto de memoria RAM que sufren formatos tradicionales como Parquet cuando manejan columnas masivas (como vectores de incrustación / embeddings). Al no depender de índices de offset pesados integrados en el archivo, reduce o elimina la caché de búsqueda (search cache), evitando requerir decenas de gigabytes de memoria RAM para la planificación de consultas
* Estrategia de codificación y rendimiento: 
  * Codificación Adaptativa: Alterna entre Full Zip (para datos >128 B como vectores o imágenes, resolviendo accesos aleatorios en 1-2 IOPS) y Mini-block (bloques de 4-8 KiB alineados al disco para escalares).   
  * Struct Packing: Junta múltiples columnas o estructuras en un solo bloque físico para recuperar registros enteros en solo 1 IOP.   
  * Rendimiento NVMe: Maximiza discos de alta velocidad, superando a Parquet y Arrow en lecturas aleatorias (point lookups) manteniendo o mejorando la velocidad de escaneo masivo (full scans). [18]


### Interoperabilidad entre formatos: UniForm y XTable

La coexistencia de Iceberg, Delta y Hudi obliga a elegir un formato por tabla, y eso condiciona qué motores pueden leerla. Hay dos enfoques que evitan la elección: traducir solo los metadatos, de modo que una única copia de los ficheros Parquet sirva a varios formatos.

* **Delta Lake UniForm (Universal Format):** lo implementa Databricks dentro de Delta Lake. Al escribir una tabla Delta, genera de forma asíncrona los metadatos de Iceberg junto a los de Delta, sin reescribir los ficheros de datos, de manera que los clientes Iceberg la leen como una tabla Iceberg [67]. Limitaciones: el soporte de Iceberg es de solo lectura, exige que la tabla esté registrada en Unity Catalog y tenga activado el *column mapping*, y no admite vectores de borrado en esas tablas [67].
* **Apache XTable (antes OneTable):** proyecto en incubación de la Apache Software Foundation que traduce los metadatos entre Hudi, Delta e Iceberg en cualquier dirección, sin copiar los datos [68]. El usuario designa un formato principal para las escrituras, y XTable genera los metadatos de los demás. Al ser una traducción posterior a la escritura, las marcas de tiempo de los *commits* pueden no coincidir exactamente entre formatos [68]. Su código está en [69].

La diferencia práctica: UniForm está integrado en un motor y un catálogo concretos (Databricks y Unity Catalog), mientras que XTable es independiente del proveedor y se ejecuta como utilidad externa. En ambos casos el formato sigue siendo único en cuanto a escritura, y los demás son vistas de solo lectura de sus metadatos. Esto no sustituye al catálogo como pieza de interoperabilidad (ver "Catálogos y gobierno").

## Catálogos y gobierno
Capa de abstracción que se sitúa por encima del formato de tabla y actúa como un registro central que indica al motor de consulta qué tablas existen y dónde encontrar sus metadatos actualizados. En su función mínima, el catálogo mapea un nombre lógico (p. ej. `ventas.pedidos`) al puntero del fichero de metadatos vigente de la tabla. Además, es el punto donde se hace el commit atómico: cuando un motor escribe una nueva versión de la tabla, el catálogo cambia ese puntero de forma transaccional. También organiza las tablas en espacios de nombres (*namespaces*) y coordina las escrituras concurrentes.

Conviene distinguir las dos capas que a menudo se confunden:

- **Formato de tabla** (Iceberg, Delta, Hudi, Paimon…): describe una tabla concreta, es decir, qué ficheros la forman, su esquema, sus *snapshots* y sus estadísticas.
- **Catálogo**: se sitúa un nivel por encima, gestiona el conjunto de tablas y, cada vez más, concentra las funciones de **gobierno**: control de acceso, auditoría, linaje, descubrimiento de datos y entrega de credenciales temporales de acceso al almacenamiento (*credential vending*).

Este tipo de catálogo es un **catálogo técnico** o *metastore*. No debe confundirse con los **catálogos de datos de negocio** (Collibra, DataHub, Atlan), orientados a glosarios, descubrimiento y documentación para usuarios, aunque algunos productos como Unity Catalog o Gravitino intentan cubrir ambas funciones.

A nivel de gobierno, tanto Armbrust et al. [1] como Jain et al. [2] señalan la capa de metadatos como la más adecuada para gestionar la gobernanza. Armbrust et al. proponen que la capa de metadatos compruebe si un cliente tiene permiso para leer una tabla antes de entregarle las credenciales para leer sus ficheros en el object store, y que registre todos los accesos para auditoría [1]. Esta idea es precisamente el mecanismo de *credential vending* que implementan hoy los catálogos. Por su parte, Jain et al. muestran que Hudi e Iceberg ya dependían de servicios externos, como Hive Metastore, DynamoDB o ZooKeeper, para coordinar sus transacciones mediante bloqueos a nivel de tabla, en algunos casos con garantías débiles [2]. Es decir, el catálogo formaba parte del mecanismo transaccional antes de convertirse en la pieza central de gobierno. Delta Lake es la excepción, ya que puede garantizar la atomicidad apoyándose únicamente en operaciones atómicas del propio object store (*put-if-absent*) [2, 13].

### Por qué el catálogo se ha convertido en la pieza en disputa

**El control se desplaza del formato al catálogo.** A medida que los principales motores han pasado a leer y escribir los mismos formatos abiertos, el formato de tabla ha dejado de ser un mecanismo de dependencia del fabricante (*lock-in*). El control se ha desplazado a quien gestiona los metadatos: quien controla el catálogo decide qué motores pueden escribir en las tablas, con qué permisos y con qué trazabilidad [25, 26].

**Existe un estándar de interfaz, por lo que se compite por la implementación.** La especificación **Iceberg REST Catalog** define una API HTTP independiente del fabricante para crear, listar, cargar, actualizar y eliminar tablas y *namespaces*, e incluye la entrega de credenciales temporales [19, 28]. Cualquier motor compatible puede operar con cualquier catálogo que implemente la especificación, y la han adoptado Snowflake, Databricks (Unity Catalog), AWS Glue, Nessie y otros. Con una interfaz común, el valor diferencial pasa a estar en quién aloja el catálogo y qué capacidades de gobierno añade sobre él.

**Junio de 2024 hace visible el conflicto.** En pocos días se sucedieron varios movimientos [25, 26, 27]:

- **3 de junio de 2024**: Snowflake anuncia Polaris Catalog, una implementación abierta del catálogo REST de Iceberg, con el compromiso de liberarla en 90 días. Esa misma tarde, durante el Snowflake Summit, Databricks anuncia la compra de Tabular, la empresa fundada por los creadores de Apache Iceberg, que desarrollaba precisamente un catálogo para Iceberg.
- **12-13 de junio de 2024**: Databricks libera Unity Catalog bajo licencia Apache 2.0 durante su Data + AI Summit. Hasta entonces era un producto propietario [20].
- **20 de junio de 2024**: Databricks dona Unity Catalog a la LF AI & Data Foundation.
- **30 de julio y 21 de agosto de 2024**: Snowflake publica el código de Polaris antes del plazo previsto y lo dona a la Apache Software Foundation [21].

Los analistas interpretaron estos movimientos como competencia directa por el control de los metadatos. Forrester calificó Polaris como una respuesta competitiva a Unity Catalog, y la prensa especializada acuñó la expresión "guerra de catálogos" (*catalog wars*) [25, 26].

**El catálogo concentra el gobierno, y el gobierno es lo que compran las empresas.** Unity Catalog se presenta como la solución unificada de Databricks para gobernar datos y activos de IA, con permisos de grano fino, auditoría y linaje sobre tablas, ficheros, *features* y modelos [20, 29]. El catálogo se convierte así en el plano de control de toda la plataforma de datos.

**La respuesta neutral: federación y "catálogo de catálogos".** Frente a los catálogos ligados a una plataforma, han surgido proyectos comunitarios bajo la Apache Software Foundation que proponen federar los catálogos existentes en lugar de sustituirlos. Apache Polaris puede gestionar sus propias tablas y, a la vez, sincronizar catálogos externos como AWS Glue, Hive Metastore u otros endpoints REST de Iceberg [28]. Apache Gravitino lleva la idea más lejos con el concepto de *metadata lake*: centralizar los metadatos en lugar de los datos, federando bajo un mismo espacio de nombres catálogos de tablas, registros de esquemas de Kafka y registros de modelos de ML [24, 30].

**La siguiente frontera: IA y agentes.** Los catálogos están ampliando su alcance para gobernar modelos de ML y servir metadatos a agentes de IA. Unity Catalog incluye modelos y funciones entre los activos gobernados [20], y Gravitino se unió a la Agentic AI Foundation a principios de 2026 con el objetivo de ofrecer metadatos aprovechables por agentes [30].

### Principales catálogos

#### Unity Catalog
* Web oficial: [https://www.unitycatalog.io](https://www.unitycatalog.io)
* Repositorio: [https://github.com/unitycatalog/unitycatalog](https://github.com/unitycatalog/unitycatalog)
* Origen: nació en Databricks como producto propietario (disponible desde 2022). Se liberó bajo licencia Apache 2.0 en junio de 2024 y se donó a la LF AI & Data Foundation [20, 27].
* Características: gobierno unificado de datos y activos de IA (tablas, ficheros, volúmenes, funciones y modelos), con control de acceso de grano fino, auditoría y linaje. Soporta Delta Lake e Iceberg, y expone interfaces compatibles con Hive Metastore e Iceberg REST [20, 29].
* Matiz: la versión open source no ofrece todas las funcionalidades del Unity Catalog gestionado dentro de Databricks [25].

#### Apache Polaris
* Web oficial: [https://polaris.apache.org](https://polaris.apache.org)
* Origen: co-creado por Snowflake y Dremio. Se anunció en junio de 2024, se liberó en julio y se donó a la Apache Software Foundation en agosto de 2024. Se graduó como Top-Level Project tras unos 18 meses de incubación [21, 28].
* Características: implementación de referencia de la especificación Iceberg REST Catalog, con control de acceso basado en roles (RBAC), *credential vending* y federación de catálogos externos (Hive Metastore, AWS Glue, otros endpoints REST). Snowflake ofrece una versión gestionada comercial bajo el nombre Snowflake Open Catalog [21, 28, 29].

#### AWS Glue Data Catalog
* Documentación oficial: [https://docs.aws.amazon.com/glue/](https://docs.aws.amazon.com/glue/)
* Servicio gestionado de AWS, compatible con la API de Hive Metastore y con un endpoint REST de Iceberg.
* Es el catálogo nativo de los servicios analíticos de AWS (Athena, EMR, Redshift) y la base de las S3 Tables. Como contrapartida, está ligado al ecosistema de un único proveedor de nube [22].

#### Project Nessie
* Web oficial: [https://projectnessie.org](https://projectnessie.org)
* Origen: impulsado por Dremio.
* Características: aplica un modelo de control de versiones tipo Git al catálogo, con ramas, etiquetas y commits. Un único commit puede abarcar varias tablas, lo que permite realizar cambios coordinados entre tablas y aislar entornos de desarrollo y prueba sobre los mismos datos. Implementa también la API REST de Iceberg [23, 29].

#### Apache Gravitino
* Web oficial: [https://gravitino.apache.org](https://gravitino.apache.org)
* Repositorio: [https://github.com/apache/gravitino](https://github.com/apache/gravitino)
* Origen: creado por Datastrato. Se graduó como Top-Level Project de Apache en 2025 y publicó su primera versión estable mayor (1.1.0) en diciembre de 2025 [24, 30].
* Características: se define como un *metadata lake* federado y geodistribuido. Unifica el acceso a metadatos de fuentes heterogéneas (tablas en formatos abiertos, bases de datos relacionales, flujos de eventos, ficheros y modelos de ML) en distintas regiones y nubes, y aplica sobre ellos gobierno y control de acceso comunes. Motores como Spark, Trino o Flink acceden a través de sus conectores o de su servicio Iceberg REST [24, 30].

#### Hive Metastore
* Web oficial: [https://hive.apache.org](https://hive.apache.org)
* Antecedente histórico del ecosistema Hadoop y catálogo de referencia durante la etapa del data lake. Sigue siendo compatible con la mayoría de motores.
* Transacciones: Iceberg y Hudi lo han utilizado para coordinar sus commits mediante bloqueos. Jain et al. advierten de que las implementaciones basadas en Hive Metastore no ofrecen garantías transaccionales robustas [2].

#### Otros
* **Lakekeeper**: implementación open source en Rust de la especificación Iceberg REST Catalog [29].
* **Google BigLake Metastore** y **Snowflake Horizon**: catálogos gestionados integrados en las plataformas de Google Cloud y Snowflake, respectivamente.
* **DuckLake**: formato que integra el catálogo dentro de una base de datos SQL transaccional (PostgreSQL, MySQL, SQLite o DuckDB), en lugar de mantener metadatos y catálogo por separado [31].

### Síntesis

| Catálogo | Origen | Modelo | Formatos principales | Rasgo diferencial |
|---|---|---|---|---|
| Hive Metastore | Ecosistema Hadoop | Open source (Apache) | Hive, Iceberg, Hudi | Antecedente histórico, garantías débiles |
| AWS Glue | AWS | Servicio gestionado | Iceberg, Hive | Integración nativa con AWS |
| Unity Catalog | Databricks | Open source (LF AI & Data) + versión gestionada | Delta, Iceberg | Gobierno unificado de datos e IA |
| Apache Polaris | Snowflake + Dremio | Open source (Apache) | Iceberg | Implementación de referencia de Iceberg REST |
| Project Nessie | Dremio | Open source | Iceberg | Versionado tipo Git, commits multi-tabla |
| Apache Gravitino | Datastrato | Open source (Apache) | Iceberg, Hudi, Delta, Paimon y otros | Federación de metadatos heterogéneos |

## Lakebase y convergencia OLTP/OLAP

La segregación de sistemas OLTP y OLAP que había nacido para solucionar los problemas intrínsecos a la diferente naturaleza de los sistemas fue, sin embargo, a costa de asumir ciertas concesiones:
* El uso de dos sistemas implica un proceso ETL desde el sistema transaccional al analítico, lo cual obliga a asumir un grado de latencia y consistencia eventual que puede no ser aceptable según el caso.
* Mayor complejidad arquitectónica.
* Modificaciones en el esquema original pueden implicar cambios en el proceso ETL.

Es así como comienza a surgir la tendencia de integración nativa de motores transaccionales (habitualmente Postgresql serverless) en *LakeHouse*. Eliminando el proceso ETL pero mateniendo las ventajas de la segregación dentro de un mismo ecosistema.

### Databricks + Neon (compra de Neon)

El 14 de mayo de 2025 Databricks anuncia la adquisición de Neon, compañía creadora de una base de datos PostgreSQL serverless de código abierto, por unos 1.000 millones de dólares [32, 33]. Neon había popularizado la separación de almacenamiento y cómputo aplicada a Postgres, mediante un motor de almacenamiento propio basado en log en lugar de páginas tradicionales, y funcionalidades como el *branching* de bases de datos sin copiar los datos (copy-on-write a nivel de almacenamiento). En junio de 2025 Databricks lanza **Lakebase**, un motor Postgres totalmente gestionado y serverless que se integra de forma nativa en el lakehouse: comparte la capa de almacenamiento en el object store, sincroniza las tablas OLTP hacia el lakehouse sin necesidad de un proceso ETL explícito, y hereda de Neon el *branching* de bases de datos para entornos de desarrollo y prueba [34, 35]. El objetivo declarado es dar soporte transaccional de baja latencia tanto a aplicaciones operacionales como a agentes de IA que necesitan leer y escribir datos dentro del mismo ecosistema donde ya residen los datos analíticos [32, 34].

### Snowflake + Crunchy Data (compra de Crunchy Data)

Pocas semanas después, el 2 de junio de 2025, durante el Snowflake Summit, Snowflake anuncia la adquisición de Crunchy Data, proveedor de Postgres empresarial con fuerte presencia en entornos regulados (FedRAMP), por unos 250 millones de dólares [36, 37]. De esta operación nace **Snowflake Postgres**, una base de datos Postgres gestionada e integrada en el ecosistema de Snowflake. Crunchy Data había desarrollado previamente **pg_lake**, una extensión que añade a Postgres un tipo de tabla Iceberg en la que el propio Postgres actúa como catálogo, permitiendo crear y consultar tablas Iceberg con semántica transaccional completa desde Postgres y leer directamente ficheros del data lake [38, 39]. Snowflake libera pg_lake como proyecto de código abierto en noviembre de 2025, siguiendo el mismo patrón de apertura de la capa de metadatos ya visto en la "guerra de catálogos". 

Ambos movimientos, Databricks-Neon y Snowflake-Crunchy Data, separados por apenas tres semanas, siguen el mismo patrón estratégico: los dos grandes proveedores de lakehouse/cloud DWH incorporan un motor Postgres serverless como pieza transaccional nativa de su plataforma, en lugar de depender de que el cliente mantenga un proceso ETL desde un OLTP externo.

### Relación con HTAP (Hybrid Transactional/Analytical Processing)
La convergencia en el Lakehouse es la evolución moderna de HTAP.

El término HTAP fue acuñado por Gartner en 2014 para describir arquitecturas que rompen la separación entre procesamiento transaccional y analítico, permitiendo tomar decisiones sobre datos en tiempo de negocio real sin mover los datos a un sistema aparte [40]. Las primeras implementaciones de HTAP (p. ej. SAP HANA, MemSQL/SingleStore, TiDB) resolvieron esto dentro de un único motor, combinando un almacén de filas para las transacciones y una réplica en columnas para las consultas analíticas, sincronizadas internamente [41, 42].

El enfoque de Lakebase y Snowflake Postgres difiere de estas implementaciones clásicas de HTAP en dónde se sitúa la frontera: en lugar de un motor monolítico que mantiene internamente dos representaciones de los datos, se trata de un motor OLTP (Postgres) desacoplado que comparte la capa de almacenamiento en formato abierto (Iceberg/Delta) con el motor analítico del lakehouse, materializando las tablas transaccionales hacia ese formato de forma asíncrona o casi en tiempo real. Es, en la terminología de Armbrust et al., la concreción del HTAP como capa adicional ("bolt-on") sobre el lakehouse que ya se anticipaba en 2021 [1]: no desaparece la segregación arquitectónica entre OLTP y OLAP, sino que se automatiza y estrecha la sincronización entre ambos dentro de una misma plataforma y un mismo catálogo de metadatos, reduciendo la latencia y la complejidad operativa del ETL sin llegar a fusionar los dos motores de ejecución en uno solo.

## Motores

El motor de consulta es el componente encargad de interpretar las consultas recibidas, traducirlas y ejecutar las acciones pertinentes. Entre sus funciones destacan:

* Traducción y optimización de consultas: parseo/validación y optimización basada en costes.
* Procesamient y ejecución: procesamiento de datos y uso de técnicas para optimizar el uso del hardware.
* Gestión de memoria y recursos: asignación de momoria e hilos más gestión de exceso de cuotas.
* Interfaz con la capa de almacenamiento: decodificación de formatos y orquestración distribuída.

### Ejecución vectorizada

El modelo clásico de ejecución de consultas (*Volcano*/*iterator model*) procesa una fila a la vez: cada operador implementa una función `next()` que se invoca por cada tupla, lo que introduce una llamada a función y una carga de trabajo de interpretación por cada fila procesada. Con hardware moderno este sobrecoste domina el tiempo total de ejecución en consultas analíticas que escanean millones de filas, ya que apenas queda margen para aprovechar la caché de la CPU, la predicción de saltos o las instrucciones vectoriales (SIMD) [3].

MonetDB/X100 (2005) propone la ejecución vectorizada como alternativa: cada operador ya no procesa una fila, sino un vector o *batch* de varios miles de valores de una misma columna en cada invocación, amortizando el coste de interpretación entre todo el vector y permitiendo que el compilador y la CPU exploten SIMD y la localidad de caché [50]. Este modelo, combinado con el almacenamiento columnar, es el que adoptan prácticamente todos los motores analíticos modernos: ClickHouse, por ejemplo, no procesa filas sino bloques de 65.536 valores por columna en cada operador (filtro, agregación, *join*) [43]. Es la misma idea de fondo que sustenta Photon en Databricks (ver periodo 5) y el propio DuckDB, descrito a continuación. La alternativa que explora la otra rama de esta familia de técnicas es la compilación de la consulta a código máquina específico (p. ej. HyPer), que elimina por completo la interpretación pero es más costosa de implementar y menos flexible ante consultas ad-hoc [3].

### Motores embebidos / in-process (DuckDB)

DuckDB (2019), desarrollado en el CWI por Raasveldt y Mühleisen, traslada al mundo analítico la propuesta que hizo popular a SQLite en el mundo transaccional: una base de datos que se ejecuta *dentro* del proceso de la aplicación (como una librería enlazada), sin servidor, sin proceso externo que administrar y sin necesidad de mover los datos por red [49]. A diferencia de SQLite, DuckDB está diseñado desde cero para cargas OLAP: almacenamiento columnar organizado en bloques (*DataBlocks*) comprimidos con codificaciones ligeras, y un motor de ejecución vectorizado de tipo *push-based* [49]. Puede consultar directamente ficheros Parquet, CSV o Arrow sin necesidad de un proceso de carga previo, lo que lo convierte en un sustituto habitual de pandas/Spark para análisis exploratorio en una sola máquina, y cada vez más en el motor SQL embebido de herramientas de terceros (notebooks, herramientas de BI ligeras, motores de consulta ad-hoc sobre tablas Iceberg/Delta) en lugar de levantar un clúster para consultas que caben en la memoria de un portátil.

### OLAP en tiempo real (ClickHouse, Druid, Pinot, StarRocks, Doris)

Un segundo grupo de motores no compite por ejecutar informes de BI sobre datos históricos, sino por servir consultas analíticas de baja latencia (a menudo con objetivos de p99 por debajo de 100 ms, o incluso 10 ms) directamente sobre datos que llegan de forma continua, típicamente desde colas como Kafka, para alimentar paneles orientados al usuario final o a agentes, no solo a analistas [46]. Esto obliga a fusionar en el mismo sistema capacidades que el data warehouse clásico separaba: ingesta en *streaming*, indexación casi inmediata de lo ingerido y una capa de servicio de baja latencia, normalmente a costa de un soporte más limitado para *joins* complejos que un motor de propósito general.

- **ClickHouse**: originado en Yandex (2009) y liberado como código abierto en 2016. Su motor de almacenamiento por defecto, la familia **MergeTree**, se inspira en los árboles LSM: los datos se escriben en partes ordenadas e inmutables que un proceso en segundo plano fusiona periódicamente, con un índice disperso (una entrada cada 8.192 filas por defecto) que cabe en memoria incluso para tablas con billones de filas [43]. Es un motor MPP *shared-nothing* de propósito relativamente general, con soporte SQL amplio y buen rendimiento en *joins* comparado con el resto de motores de este grupo.
- **Apache Druid**: nace en Metamarkets (2011) y se describe formalmente en 2014 como un sistema híbrido entre data warehouse, base de datos de series temporales y motor de búsqueda [44]. Su unidad de almacenamiento es el *segmento*: un bloque columnar inmutable e indexado (con índices de bitmap) que cubre un intervalo de tiempo. La arquitectura separa explícitamente los roles: nodos de ingesta en tiempo real que bufferan e indexan eventos entrantes, nodos históricos que sirven los segmentos ya persistidos, y *brokers* que enrutan y fusionan los resultados de la consulta entre ambos [44].
- **Apache Pinot**: desarrollado en LinkedIn para servir analítica en tiempo real con SLA de latencia estrictos de cara al usuario, consume directamente de colas de *streaming* (Kafka, Kinesis) e indexa los eventos casi al instante, con una arquitectura de segmentos similar a la de Druid pero con índices *pluggables* (invertidos, ordenados, *star-tree*) seleccionables por columna. En producción en LinkedIn alcanza latencias p99 de en torno a 10 ms sobre cientos de millones de usuarios [45, 46].
- **StarRocks y Apache Doris**: Doris nace en Baidu (como Palo) y se dona a la Apache Software Foundation en 2018, graduándose como Top-Level Project en 2022. StarRocks surge en 2020 como un *fork* comercial de Doris 0.13 (bajo el nombre inicial DorisDB), que reescribe la mayor parte del motor, incluyendo un motor de ejecución vectorizado propio y un optimizador basado en costes; CelerData dona el proyecto a la Linux Foundation en febrero de 2023 [47, 48]. A diferencia de Druid y Pinot, ambos son motores MPP de propósito más general en el estilo de un data warehouse clásico (con soporte completo de *joins* y un optimizador SQL), a los que se añade ingesta en *streaming* (*routine load* desde Kafka) y consulta federada directa sobre tablas Iceberg, Hudi o Hive mediante catálogos externos [47].

Los cinco motores convergen cada vez más con el lakehouse por la vía del almacenamiento: todos incorporan conectores para leer directamente tablas Iceberg o Delta en el object store (motores de tabla externos en ClickHouse y StarRocks/Doris, almacenamiento profundo en S3 para los segmentos de Druid y Pinot), difuminando la frontera entre "almacén analítico en tiempo real" y "motor de consulta sobre el lakehouse".

### Federación de consultas (Trino)

Trino resuelve un problema distinto: consultar con SQL datos que ya residen en sistemas heterogéneos sin copiarlos primero a un almacén central. Nace en Facebook (2012, bajo el nombre Presto) para ejecutar consultas interactivas sobre su almacén Hadoop de 300 PB, evitando la latencia de traducir SQL a trabajos MapReduce como hacía Hive, y se libera como código abierto en 2013 [51]. En 2019 varios de sus creadores originales bifurcan el proyecto como PrestoSQL, renombrado Trino en diciembre de 2020 tras una disputa sobre la marca; el linaje original de Facebook continúa como Presto (PrestoDB) bajo la Presto Foundation [51].

Arquitectónicamente es un motor MPP que ejecuta en memoria, con un nodo coordinador que analiza, planifica y programa la consulta, y una flota de *workers* que ejecutan las distintas etapas del plan e intercambian datos entre sí [52]. Trino no almacena datos propios: su arquitectura de **conectores** expone como si fueran tablas SQL fuentes tan heterogéneas como tablas Iceberg/Delta/Hudi en el object store, bases de datos relacionales, Kafka, MongoDB o Elasticsearch, y permite mezclarlas en una misma consulta —incluyendo *joins* entre sistemas— sin moverlas primero a un almacén único [52]. Al apoyarse en las mismas especificaciones abiertas de formato de tabla y catálogo descritas anteriormente (p. ej. el Iceberg REST Catalog), Trino se vuelve intercambiable con Spark, Databricks SQL o el motor nativo de Snowflake como capa de cómputo sobre el mismo almacenamiento: la realización práctica de la promesa de "varios motores, una sola copia de los datos" del lakehouse [1].

## Tendencias

Sobre la base arquitectónica descrita hasta ahora (formatos abiertos, catálogos cada vez más federados y motores intercambiables) conviven hoy varias tendencias que no compiten entre sí, sino que se apilan: reducir la fricción operativa de administrar la plataforma (*serverless*), reducir la fricción de mover datos entre sistemas (*zero-ETL*, unificación batch/streaming), acercar la IA al propio dato en lugar de extraerlo a un sistema aparte, y, en paralelo, una presión regulatoria y geopolítica que empuja a repensar dónde reside físicamente ese dato (soberanía y nube europea).

### Serverless

El modelo *serverless*, que nace con la separación de almacenamiento y cómputo de Snowflake (ver periodo 4) [3], se ha extendido más allá del data warehouse: los propios motores transaccionales que alimentan el lakehouse son ahora serverless, como Neon/Lakebase o Snowflake Postgres (ver "Lakebase y convergencia OLTP/OLAP"), y los grandes proveedores (BigQuery, Databricks SQL Serverless, Redshift Serverless) facturan cada vez más por consulta o por segundo de cómputo en lugar de por clúster reservado. El efecto de fondo es el mismo en todos los casos: el usuario deja de dimensionar infraestructura y paga únicamente por el trabajo realizado, a costa de una menor previsibilidad de costes si la carga no está bien acotada.

### Zero-ETL

*Zero-ETL* designa el conjunto de integraciones que replican datos de un sistema operacional a un sistema analítico sin que el usuario tenga que construir ni mantener un *pipeline* de extracción, transformación y carga explícito: el proveedor gestiona internamente una captura de datos modificados (CDC) que mantiene ambos lados sincronizados con minutos de latencia. AWS lo popularizó en 2022 con la integración Aurora-Redshift y la ha extendido en 2024-2025 a orígenes SaaS como Salesforce, SAP, ServiceNow o Zendesk a través de AWS Glue [63]. Conviene distinguirlo de la convergencia OLTP/OLAP de Lakebase y Snowflake Postgres descrita anteriormente: el zero-ETL de AWS sigue moviendo una copia de los datos a un almacén distinto (sigue habiendo un ETL, solo que gestionado y casi instantáneo), mientras que Lakebase elimina directamente la copia al compartir la misma capa de almacenamiento entre el motor OLTP y el lakehouse [63].

### Unificación batch/streaming

Durante años, servir un mismo dato con baja latencia y también en informes históricos exigía mantener dos *pipelines* redundantes (la llamada arquitectura Lambda: una capa batch y una capa de *streaming* en paralelo). El modelo Dataflow de Google (2015) sentó las bases teóricas para tratar el procesamiento por lotes como un caso particular del procesamiento en *streaming* (un flujo acotado frente a uno no acotado), idea que hoy implementan motores como Apache Flink o Apache Beam y que comparten los formatos de tabla orientados a *streaming* como Paimon (ver "Formatos de tabla abiertos"). Dos casos recientes de empresas con datos a gran escala ilustran esta convergencia en producción:

- **Uber** re-arquitecturó en 2025 su ingesta de datos bajo la iniciativa *IngestionNext*, sustituyendo trabajos batch por ingesta continua sobre Apache Flink hacia su *data lake*, resolviendo problemas propios del *streaming* como la generación de ficheros pequeños, el desequilibrio entre particiones y la sincronización de *checkpoints*, y reduciendo la frescura de los datos de horas a minutos [54]. Sobre la misma base de Flink, Uber sirve cientos de paneles de analítica en tiempo real con latencias de sub-segundo apoyándose en Apache Pinot como capa de servicio [46, 55].
- **Meta** describe en su paper de 2023 "Shared Foundations" cómo unifica sobre un mismo *lakehouse* (mismo formato de tabla y mismo catálogo) las cargas batch, servidas históricamente por Presto y Spark, y las cargas de *streaming*, servidas por su plataforma de próxima generación **XStream**, evitando mantener dos copias del dato y dos sistemas de gobierno separados para el mismo caso de uso [56].

### IA dentro del warehouse

La incorporación de capacidades de IA generativa directamente en el motor analítico, en lugar de exportar los datos a un servicio externo, es probablemente la tendencia que más está redefiniendo el rol del data warehouse en 2025-2026:

- **Búsqueda vectorial**: los principales motores ofrecen ya un índice vectorial nativo junto a las tablas relacionales, evitando desplegar una base de datos vectorial aparte. Databricks reconstruyó en 2025 su Mosaic AI Vector Search para escalar a miles de millones de vectores con hasta 7 veces menor coste que su arquitectura anterior [61], y Snowflake ofrece Cortex Search sobre el mismo almacenamiento que las tablas estructuradas. Formatos como Lance (ver "Formatos de tabla abiertos") existen precisamente para que estos embeddings convivan de forma eficiente con el resto de columnas de la tabla [18].
- **Funciones LLM en SQL**: los proveedores exponen modelos de terceros (OpenAI, Anthropic, Meta, Mistral, DeepSeek...) como funciones SQL invocables sobre columnas de texto. Las funciones de IA de Snowflake Cortex, con disponibilidad general en noviembre de 2025, permiten resumir, traducir, clasificar o extraer entidades de una columna de texto con una sentencia `SELECT` [59]; Databricks (`ai_query`) y BigQuery (`ML.GENERATE_TEXT`) ofrecen el mismo patrón. El dato no estructurado deja de requerir un proceso ETL hacia un sistema de ML aparte: se consulta con SQL como cualquier otra columna.
- **Text-to-SQL**: convertir una pregunta en lenguaje natural en una consulta SQL correcta es el caso de uso de IA más maduro dentro del warehouse. Uber describe en su blog de ingeniería **QueryGPT**, que combina un LLM con una base de datos vectorial y ejemplos de SQL previos organizados en "espacios de trabajo" por dominio de negocio (RAG) para generar la consulta; según Uber, reduce el tiempo medio por consulta un 70% y ahorra unas 140.000 horas de analista al mes [53]. Snowflake sigue un enfoque distinto con **Cortex Analyst**, que se apoya en un modelo semántico explícito que traduce términos de negocio al esquema real de las tablas antes de generar el SQL, y reporta que un proceso agéntico de mejora continua de ese modelo semántico eleva la precisión de las consultas generadas en torno a un 20% frente a usar el LLM sin él [57, 58].
- **Agentes**: la tendencia más reciente no es responder una única pregunta, sino desplegar agentes con herramientas que consultan el warehouse de forma iterativa (Databricks Genie/Agent Bricks, Snowflake Cortex Agents, que combinan Cortex Analyst sobre datos estructurados, Cortex Search sobre no estructurados y herramientas propias) [60]. La pieza que empieza a estandarizar cómo esos agentes descubren y usan esas herramientas es el **Model Context Protocol (MCP)**, publicado por Anthropic en noviembre de 2024 y donado en diciembre de 2025 a la Agentic AI Foundation (Linux Foundation) junto con OpenAI y Block [62]. Databricks ya expone de forma nativa Genie, Vector Search y Unity Catalog como servidores MCP, de modo que cualquier agente compatible con el protocolo, no solo el chat propio del proveedor, puede descubrir las tablas y métricas gobernadas por el catálogo y consultarlas [60]. Es la misma capa de catálogo descrita en la sección anterior la que pasa a actuar como fuente de metadatos que el agente consulta antes de ejecutar una consulta.

### Soberanía del dato y nube europea

Más del 60% de los datos corporativos europeos residen hoy en AWS, Azure o Google Cloud, y los proveedores europeos apenas retienen en torno a un 15% del mercado de nube en Europa [64]. Esta concentración, sumada a la exposición legal de los datos alojados por proveedores estadounidenses a normativas como la CLOUD Act incluso cuando el centro de datos está en territorio europeo, ha impulsado dos respuestas paralelas:

- **Estándares de interoperabilidad**: el proyecto europeo **Gaia-X** (2020) no es en sí mismo una nube, sino un conjunto de estándares abiertos de interoperabilidad, gestión de identidad y soberanía del dato pensados para que proveedores distintos puedan interconectarse sin depender de uno solo [66].
- **Ofertas de "nube soberana"**: los propios hiperescaladores han respondido con regiones aisladas legal y operativamente en la UE, como la AWS European Sovereign Cloud (primera región en Alemania, operada por una entidad legal separada con personal y gobernanza exclusivamente europeos) [64] o el "EU Data Boundary" de Microsoft. En paralelo, en Francia han surgido ofertas de "cloud de confiance" que combinan la certificación de seguridad nacional (SecNumCloud, otorgada por la ANSSI) con la tecnología de un hiperescalador estadounidense operada por un socio local: **Bleu** (Orange y Capgemini sobre tecnología Microsoft Azure/365) y **S3NS** (Thales sobre Google Cloud), ambas todavía en proceso de calificación SecNumCloud 3.2 a finales de 2025 [65]. Frente a estas soluciones híbridas, proveedores puramente europeos como OVHcloud o Scaleway se posicionan como alternativa sin dependencia societaria de una matriz estadounidense.

Esta discusión conecta directamente con la capa de catálogo descrita anteriormente: al separar almacenamiento y cómputo con formatos abiertos, la pregunta de soberanía deja de depender del motor de consulta elegido y pasa a resolverse en la capa de almacenamiento y credenciales (dónde reside físicamente el object store, quién custodia las claves de cifrado, qué catálogo entrega las credenciales de acceso), reforzando el papel del catálogo como pieza central de gobierno también en este eje [ver "Catálogos y gobierno"].

## Referencias

- **[1]** M. Armbrust, A. Ghodsi, R. Xin, M. Zaharia. *Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics*. CIDR 2021.
- **[2]** P. Jain, P. Kraft, C. Power, T. Das, I. Stoica, M. Zaharia. *Analyzing and Comparing Lakehouse Storage Systems*. CIDR 2023.
- **[3]** M. Stonebraker, A. Pavlo. *What Goes Around Comes Around... And Around...*. SIGMOD Record 53(2), 2024.
- **[4]** Raplh Kimball and Margy Ross. *The Data Warehouse Tookit: The Definitive Guide to Dimensional Modeling, 3rd edition, John WEiley & Sons, 2013. ISBN: 9791118530801* 
- **[5]** Jeffrey Dean and Sanjay Ghemawat. *MapReduce: Simplified Data Processing on Large Clusters* 2004.  
- **[6]** Surajit Chaudhuri and Umeshwar Dayal. *"An Overview of Data Warehousing and OLAP Technology.'* ACM SIGMOD Record, volume 26, issue 1, pages 65-74, March 1997. doi: 10.1145/248603.248616
- **[7]** Joe Kearney. *"Understanding Record Shredding: Storing Nested Data in Col-umns."* joekearney.co.uk, December 2016. Archived at [perma.cc/ZD5N-AX5D](https://perma.cc/ZD5N-AX5D).
- **[8]** Michael Stonebraker, Daniel I. Abadi, Adam Batkin, Xuedong Chen, Mitch Cherniack, Miguel Ferreira, Edmond Lau, Amerson Lin, Sam Madden, Elizabeth O'Neil, Pat O'Neil, Alex Rasin, Nga Tran, and Stan Zdonik. *"C-Store: A Column-Oriented DBMS."* At 31st International Conference on Very Large Data Bases (VLDB)
- **[9]** Per-Ake Larson, Cipri Clinciu, Campbell Fraser, Eric N. Hanson, Mostafa Mokh-tar, Michal Nowakiewicz, Vassilis Papadimos, Susan L. Price, Srikumar Rangarajan, Remus Rusanu, and Mayukh Saubhasik. *"Enhancements to SQL Server Column Stores."* At ACM International Conference on Management of Data (SIGMOD), June 2013. doi:10.1145/2463676.2463708
- **[10]** Daniel J. Abadi, Peter Boncz, Stavros Harizopoulos, Stratos Idreos, and Samuel Madden. *"The Design and Implementation of Modern Column-Oriented Database Systems."* Foundations and Trends in Databases, volume 5, issue 3, pages 197-280, December 2013. doi:10.1561/1900000024
- **[11]** Fay Chang, Jeffrey Dean, Sanjay Ghemawat, Wilson C. Hsieh, Deborah A. Wallach
Mike Burrows, Tushar Chandra, Andrew Fikes, Robert E. Gruber. *"Bigtable: A Distributed Storage System for Structured Data"* Archived at [Google inc](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf)  
- **[12]** [Incremental Processing using Netflix Maestro and Apache Iceberg](https://netflixtechblog.com/incremental-processing-using-netflix-maestro-and-apache-iceberg-b8ba072ddeeb) Netflix TechBlog
- **[13]** Armbrust, M., Das, T., Sun, L., Yavuz, B., Zhu, S., Murthy, M., Torres, J., van Hovell, H., Ionescu, A., Łuszczak, A., Switakowski, M., Szafranski, M., Li, X., Ueshin, T., Mokthar, M., Boncz, P., Ghodsi, A., Paranjpye, S., Senster, P., … Zaharia, M. (2020), Delta Lake: High-Performance ACID Table Storage over Cloud Object Stores, PVLDB 13(12), 2020. Es el paper académico más sólido de los cuatro originales. [https://ir.cwi.nl/pub/32924](https://ir.cwi.nl/pub/32924)
- **[14]** *Apache Hudi™ at Uber: Engineering for Trillion-Record-Scale Data Lake Operations* [https://www.uber.com/gb/en/blog/apache-hudi-at-uber/](https://www.uber.com/gb/en/blog/apache-hudi-at-uber/)
- **[15]** Kirill Ielev y Vadim Surping *Batch Updates and CDC at Scale: A Comparative Study of Iceberg and Paimon* 38th Conference of Fruct Association [https://www.fruct.org/files/publications/volume-38/acm38/Iev.pdf](https://www.fruct.org/files/publications/volume-38/acm38/Iev.pdf)
- **[16]** *Apache Iceberg vs Apache Paimon: Practical Benchmarks for Real-World Lakehouse Workloads* [https://www.alphyn.ai/blog/iceberg-vs-paimon](https://www.alphyn.ai/blog/iceberg-vs-paimon)
- **[17]** *Apache Paimon vs. Apache Iceberg: 2026 Evaluation Guide on These Two Popular Open Table Formats* [https://atlan.com/know/iceberg/apache-paimon-vs-iceberg/](https://atlan.com/know/iceberg/apache-paimon-vs-iceberg/)
- **[18]** Pace, She y Xu, *"Lance: Efficient Random Access in Columnar Storage through Adaptive Structural Encodings"*, arXiv:2504.15247 (2025) [https://arxiv.org/pdf/2504.15247](https://arxiv.org/pdf/2504.15247).
- **[19]** Apache Iceberg. *Iceberg REST Catalog Open API Specification*. [https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml](https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml)
- **[20]** Unity Catalog, web oficial [https://www.unitycatalog.io](https://www.unitycatalog.io); y *Databricks open-sources Unity Catalog, challenging Snowflake on interoperability for data workloads*, VentureBeat, 12 de junio de 2024. [https://venturebeat.com/data-infrastructure/databricks-open-sources-unity-catalog-challenging-snowflake-on-interoperability-for-data-workloads](https://venturebeat.com/data-infrastructure/databricks-open-sources-unity-catalog-challenging-snowflake-on-interoperability-for-data-workloads)
- **[21]** Apache Polaris, web oficial [https://polaris.apache.org](https://polaris.apache.org); y T. Akidau et al. *Polaris Catalog Is Now Open Source*, Snowflake Blog, 2024. [https://www.snowflake.com/en/blog/polaris-catalog-open-source/](https://www.snowflake.com/en/blog/polaris-catalog-open-source/)
- **[22]** AWS. *AWS Glue Data Catalog*, documentación oficial. [https://docs.aws.amazon.com/glue/](https://docs.aws.amazon.com/glue/)
- **[23]** Project Nessie, web oficial. [https://projectnessie.org](https://projectnessie.org)
- **[24]** Apache Gravitino, web oficial [https://gravitino.apache.org](https://gravitino.apache.org) y repositorio [https://github.com/apache/gravitino](https://github.com/apache/gravitino)
- **[25]** C. Riccomini. *Begun, The Catalog Wars Have*, Materialized View, 20 de junio de 2024. [https://materializedview.io/p/begun-the-catalog-wars-have](https://materializedview.io/p/begun-the-catalog-wars-have)
- **[26]** *Snowflake, Databricks, Tabular, Iceberg, what does it all mean?*, Starburst Blog, junio de 2024. [https://www.starburst.io/blog/snowflake-databricks-tabular-iceberg/](https://www.starburst.io/blog/snowflake-databricks-tabular-iceberg/)
- **[27]** *Unity Catalog vs Apache Polaris*, Medium, 2024 (cronología de los anuncios de junio-agosto de 2024). [https://medium.com/@kywe665/unity-catalog-vs-apache-polaris-522b69a4d7df](https://medium.com/@kywe665/unity-catalog-vs-apache-polaris-522b69a4d7df)
- **[28]** *Apache Polaris: The Catalog Standard for Iceberg Lakehouses and Agentic Analytics*, Dremio Blog, 2026. [https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai/](https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai/)
- **[29]** *Iceberg Catalogs 2025: A Deep Dive into Emerging Catalogs and Modern Metadata Management*, e6data Blog, 2025. [https://e6data.com/blog/iceberg-catalogs-2025-emerging-catalogs-modern-metadata-management](https://e6data.com/blog/iceberg-catalogs-2025-emerging-catalogs-modern-metadata-management)
- **[30]** *Meet Gravitino, a geo-distributed, federated metadata lake*, The New Stack, 2026. [https://thenewstack.io/meet-gravitino-a-geo-distributed-federated-metadata-lake/](https://thenewstack.io/meet-gravitino-a-geo-distributed-federated-metadata-lake/)
- **[31]** DuckLake. *DuckLake Specification*, documentación oficial. [https://ducklake.select/docs/stable/](https://ducklake.select/docs/stable/)
- **[32]** *Databricks and Neon*, Databricks Blog, 14 de mayo de 2025. [https://www.databricks.com/blog/databricks-neon](https://www.databricks.com/blog/databricks-neon)
- **[33]** *Databricks is buying database startup Neon for about $1 billion*, CNBC, 14 de mayo de 2025. [https://www.cnbc.com/2025/05/14/databricks-is-buying-database-startup-neon-for-about-1-billion.html](https://www.cnbc.com/2025/05/14/databricks-is-buying-database-startup-neon-for-about-1-billion.html)
- **[34]** *A New Era of Databases: Lakebase*, Databricks Blog, junio de 2025. [https://www.databricks.com/blog/what-is-a-lakebase](https://www.databricks.com/blog/what-is-a-lakebase)
- **[35]** *Following Neon acquisition, Databricks launches serverless Lakebase database*, SiliconANGLE, 11 de junio de 2025. [https://siliconangle.com/2025/06/11/following-neon-acquisition-databricks-launches-serverless-lakebase-database/](https://siliconangle.com/2025/06/11/following-neon-acquisition-databricks-launches-serverless-lakebase-database/)
- **[36]** *Snowflake to buy database startup Crunchy Data for about $250 million*, CNBC, 2 de junio de 2025. [https://www.cnbc.com/2025/06/02/snowflake-to-buy-crunchy-data-250-million.html](https://www.cnbc.com/2025/06/02/snowflake-to-buy-crunchy-data-250-million.html)
- **[37]** *Delivering the Most Enterprise-Ready Postgres, Built for Snowflake*, Snowflake Blog, 2025. [https://www.snowflake.com/en/blog/snowflake-postgres-enterprise-ai-database/](https://www.snowflake.com/en/blog/snowflake-postgres-enterprise-ai-database/)
- **[38]** *Introducing pg_lake: Integrate Your Data Lakehouse with Postgres*, Snowflake Engineering Blog, noviembre de 2025. [https://www.snowflake.com/en/blog/engineering/pg-lake-postgres-lakehouse-integration/](https://www.snowflake.com/en/blog/engineering/pg-lake-postgres-lakehouse-integration/)
- **[39]** Snowflake-Labs. *pg_lake: Postgres with Iceberg and data lake access*, repositorio. [https://github.com/Snowflake-Labs/pg_lake](https://github.com/Snowflake-Labs/pg_lake)
- **[40]** Gartner. *Hybrid Transaction/Analytical Processing Will Foster Opportunities for Dramatic Business Innovation*, 2014. Citado en *Hybrid transactional/analytical processing*, Wikipedia. [https://en.wikipedia.org/wiki/Hybrid_transactional/analytical_processing](https://en.wikipedia.org/wiki/Hybrid_transactional/analytical_processing)
- **[41]** F. Özcan, Y. Tian, P. Tözün. *Hybrid Transactional/Analytical Processing: A Survey*. ACM SIGMOD, 2017. [https://pages.cs.wisc.edu/~yxy/cs839-s20/papers/htap-survey.pdf](https://pages.cs.wisc.edu/~yxy/cs839-s20/papers/htap-survey.pdf)
- **[42]** Adam Prout, Szu-Po Wang, Joseph Victor, Zhou Sun, Yongzhu Li, Jack Chen, Evan Bergeron, Eric Hanson, Robert Walzer, Rodrigo Gomes, and Nikita Shamgunov.
*"Cloud-Native Transactions and Analytics in SingleStore."* At International Conference on Management of Data (SIGMOD), June 2022. doi: 10.1145/3514221.3526055
- **[43]** R. Schulze, T. Schreiber, I. Yatsishin, R. Dahimene, A. Milovidov. *ClickHouse – Lightning Fast Analytics for Everyone*. PVLDB 17(12), 2024. [https://www.vldb.org/pvldb/vol17/p3731-schulze.pdf](https://www.vldb.org/pvldb/vol17/p3731-schulze.pdf)
- **[44]** F. Yang, E. Tschetter, X. Léauté, N. Ray, G. Merlino, D. Ganguli. *Druid: A Real-time Analytical Data Store*. SIGMOD 2014. [http://static.druid.io/docs/druid.pdf](http://static.druid.io/docs/druid.pdf)
- **[45]** Apache Pinot, web oficial. [https://pinot.apache.org](https://pinot.apache.org)
- **[46]** *Real-time Analytics at Massive Scale with Pinot*, LinkedIn Engineering Blog. [https://engineering.linkedin.com/analytics/real-time-analytics-massive-scale-pinot](https://engineering.linkedin.com/analytics/real-time-analytics-massive-scale-pinot)
- **[47]** *Detailed Comparison Between StarRocks and Apache Doris*, StarRocks Engineering Blog. [https://medium.com/starrocks-engineering/detailed-comparison-between-starrocks-and-apache-doris-81ddd34be527](https://medium.com/starrocks-engineering/detailed-comparison-between-starrocks-and-apache-doris-81ddd34be527)
- **[48]** *CelerData Contributes StarRocks Project to the Linux Foundation*, HPCwire BigDATAwire, 14 de febrero de 2023. [https://www.hpcwire.com/bigdatawire/2023/02/14/celerdata-contributes-starrocks-to-the-linux-foundation/](https://www.hpcwire.com/bigdatawire/2023/02/14/celerdata-contributes-starrocks-to-the-linux-foundation/)
- **[49]** M. Raasveldt, H. Mühleisen. *DuckDB: an Embeddable Analytical Database*. SIGMOD 2019. [https://ir.cwi.nl/pub/28800/28800.pdf](https://ir.cwi.nl/pub/28800/28800.pdf)
- **[50]** P. Boncz, M. Zukowski, N. Nes. *MonetDB/X100: Hyper-Pipelining Query Execution*. CIDR 2005.
- **[51]** *Trino (SQL query engine)*, Wikipedia. [https://en.wikipedia.org/wiki/Trino_(SQL_query_engine)](https://en.wikipedia.org/wiki/Trino_(SQL_query_engine))
- **[52]** Trino, web oficial. [https://trino.io](https://trino.io)
- **[53]** *QueryGPT – Natural Language to SQL Using Generative AI*, Uber Engineering Blog. [https://www.uber.com/en-CA/blog/query-gpt/](https://www.uber.com/en-CA/blog/query-gpt/)
- **[54]** *From Batch to Streaming: Accelerating Data Freshness in Uber's Data Lake*, Uber Engineering Blog, 2025. [https://www.uber.com/en-CA/blog/from-batch-to-streaming-accelerating-data-freshness-in-ubers-data-lake/](https://www.uber.com/en-CA/blog/from-batch-to-streaming-accelerating-data-freshness-in-ubers-data-lake/)
- **[55]** Y. Fu et al. *Real-time Data Infrastructure at Uber*. arXiv:2104.00087, 2021. [https://arxiv.org/pdf/2104.00087](https://arxiv.org/pdf/2104.00087)
- **[56]** N. Chattopadhyay et al. *Shared Foundations: Modernizing Meta's Data Lakehouse*. CIDR 2023. [https://www.cidrdb.org/cidr2023/papers/p77-chattopadhyay.pdf](https://www.cidrdb.org/cidr2023/papers/p77-chattopadhyay.pdf)
- **[57]** *Snowflake Cortex Analyst: Evaluating Text-to-SQL Accuracy for Real-World BI*, Snowflake Engineering Blog. [https://www.snowflake.com/en/blog/engineering/cortex-analyst-text-to-sql-accuracy-bi/](https://www.snowflake.com/en/blog/engineering/cortex-analyst-text-to-sql-accuracy-bi/)
- **[58]** *Agentic Semantic Model Improvement: Elevating Text-to-SQL Performance*, Snowflake Engineering Blog. [https://www.snowflake.com/en/blog/engineering/agentic-semantic-model-text-to-sql/](https://www.snowflake.com/en/blog/engineering/agentic-semantic-model-text-to-sql/)
- **[59]** Snowflake Cortex AI Functions, documentación oficial. [https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql)
- **[60]** *AI/BI Genie is now Generally Available*, Databricks Blog. [https://www.databricks.com/blog/aibi-genie-now-generally-available](https://www.databricks.com/blog/aibi-genie-now-generally-available)
- **[61]** Databricks Mosaic AI Vector Search, web oficial. [https://www.databricks.com/product/machine-learning/vector-search](https://www.databricks.com/product/machine-learning/vector-search)
- **[62]** *Introducing the Model Context Protocol*, Anthropic, noviembre de 2024. [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
- **[63]** *Zero-ETL: How AWS is tackling data integration challenges*, AWS Big Data Blog. [https://aws.amazon.com/blogs/big-data/zero-etl-how-aws-is-tackling-data-integration-challenges/](https://aws.amazon.com/blogs/big-data/zero-etl-how-aws-is-tackling-data-integration-challenges/)
- **[64]** *European Digital Sovereignty*, AWS, documentación oficial. [https://aws.amazon.com/compliance/europe-digital-sovereignty/](https://aws.amazon.com/compliance/europe-digital-sovereignty/)
- **[65]** *Capgemini and Orange are pleased to announce the launch of commercial activities of Bleu, their future "cloud de confiance" platform*, Capgemini, 2025. [https://www.capgemini.com/news/press-releases/capgemini-and-orange-are-pleased-to-announce-the-launch-of-commercial-activities-of-bleu-their-future-cloud-de-confiance-platform/](https://www.capgemini.com/news/press-releases/capgemini-and-orange-are-pleased-to-announce-the-launch-of-commercial-activities-of-bleu-their-future-cloud-de-confiance-platform/)
- **[66]** Gaia-X, web oficial. [https://gaia-x.eu](https://gaia-x.eu)
- **[67]** Databricks. *Read Delta tables with Iceberg clients (Delta Lake Universal Format, UniForm)*, documentación oficial. [https://docs.databricks.com/aws/en/delta/uniform](https://docs.databricks.com/aws/en/delta/uniform) y [https://docs.databricks.com/aws/en/delta/iceberg-reads](https://docs.databricks.com/aws/en/delta/iceberg-reads)
- **[68]** Apache XTable (incubating), web oficial. [https://xtable.apache.org](https://xtable.apache.org)
- **[69]** Apache XTable, repositorio. [https://github.com/apache/incubator-xtable](https://github.com/apache/incubator-xtable)
