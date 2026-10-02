# Metodología de costes — Bloque A

> Complementa [`../01-metodologia.md`](../01-metodologia.md). Aquí se documenta cómo se recoge el modelo de precios de cada candidato, cómo se calcula el TCO de las opciones OSS y cómo se convierte el resultado en la nota del criterio `DP-COS-01`.

## 1. Qué se documenta por candidato

Para cada candidato, en `costes/precios/<candidato>.md`, se recoge (sección 5.1 del encargo):

- **Unidad de facturación** exacta (créditos, DBU, bytes escaneados, horas de nodo/RPU, CU, vCPU-hora, etc.).
- **Qué incluye y qué no**: almacenamiento, egress/transferencia de red, soporte, ediciones o *tiers*.
- **Mínimos y compromisos** (mensualidad mínima, compromiso anual, etc.).
- **Precio de lista** en una región UE de referencia, con moneda, fecha de consulta y enlace directo a la página oficial de precios. Cuando el candidato no publique tarifa específica por región UE, se usa la tarifa de referencia disponible más próxima (normalmente la de EE.UU., por ser la que suelen publicar como ejemplo) y se indica expresamente esa limitación.
- Para OSS con edición gestionada: se documentan **ambos** (autogestionado y gestionado), porque no son sustitutos directos (ver §3).

## 2. Escenarios de referencia

Los escenarios S/M/L y sus supuestos están en [`escenarios.md`](escenarios.md). Son **supuestos de trabajo del consultor**, no datos de un cliente real: no llevan fuente porque no son una afirmación factual sobre un tercero, sino un punto de partida explícito y editable (la propia sección 5.2 del encargo los define así). La aplicación debe permitir cambiar cada parámetro del escenario.

## 3. TCO para candidatos OSS

Un candidato open source autogestionado no es gratuito. Su coste total se calcula como:

```
TCO_mensual = Infraestructura + Operación + Soporte_comercial_opcional
```

- **Infraestructura:** coste de cómputo, almacenamiento y red en la nube de referencia (se usa el mismo proveedor y región que en el resto de la comparativa, salvo justificación), dimensionado según los parámetros del escenario (TB almacenados, TB escaneados/día, concurrencia pico). Se documenta el tipo de instancia/VM asumido y su precio de lista.
- **Operación:** FTE estimados para operar el clúster (parcheo, *backups*, alta disponibilidad, monitorización, incidencias), multiplicados por un coste/hora explícito. Este coste/hora es un **supuesto del consultor**, documentado como tal (p. ej. "se asume una tarifa de 60 €/hora para un perfil SRE senior en la UE"), no una fuente factual.
- **Soporte comercial opcional:** si existe un plan de soporte de pago del fabricante o de un tercero (p. ej. Altinity para ClickHouse) para la variante autogestionada, se documenta como línea aparte, opcional.

Cuando existe versión gestionada del mismo OSS (p. ej. ClickHouse OSS autogestionado frente a ClickHouse Cloud), se calculan y muestran ambos costes en paralelo, para que la comparación "hazlo tú mismo vs. paga por gestión" sea explícita.

## 4. Resultado por candidato y escenario

Para cada candidato y cada escenario (S/M/L) se publica:

- coste mensual estimado y coste anual estimado (mensual × 12, salvo que existan descuentos por compromiso anual documentados, en cuyo caso se indican ambos);
- un **rango** (mínimo-máximo) cuando haya incertidumbre relevante (p. ej. porque el precio depende de un factor no fijado en el escenario, como el nivel de compresión real de los datos);
- si el precio no es público y no existe una referencia pública citable (ni siquiera vía marketplace de un hiperescalador), el coste se marca `N/D` con la justificación de por qué no se pudo estimar.

## 5. Conversión de coste a nota

El criterio `DP-COS-01` no está en la rúbrica (`.md`): lo define la propia app (`COST_CRITERION` en `data.service.ts`; ver la nota de [`../rubricas/datos.md`](../rubricas/datos.md#dp-cos--coste)) y no se puntúa a mano: se deriva del resultado de la calculadora de coste, siempre **dentro del mismo escenario y con el mismo conjunto de candidatos comparados** (la nota de coste es relativa al grupo, no un valor absoluto).

```
nota_DP-COS-01 = min(5, 5 × coste_mínimo_del_grupo / coste_candidato)
```

- `coste_mínimo_del_grupo` es el coste mensual estimado más bajo entre los candidatos incluidos en la comparación activa, en el escenario seleccionado.
- `coste_candidato` es el coste mensual estimado del candidato evaluado en ese mismo escenario.
- El candidato más barato del grupo obtiene siempre nota 5; el resto obtiene una nota proporcionalmente menor cuanto más caro sea respecto al más barato.
- Si `coste_candidato` es `N/D`, el criterio se trata según la configuración global de N/D (§7 de la metodología general): por defecto, se excluye del denominador de la fórmula de puntuación para ese candidato.
- Cuando el coste se documentó como rango, se usa el punto medio del rango para este cálculo, y el rango completo se muestra igualmente en la ficha de coste para contexto.

Este método es explícitamente relativo (no hay una escala absoluta de "5 = barato"), documentado así porque comparar cifras absolutas en abstracto no tiene sentido sin un grupo de referencia: un coste de 5.000 €/mes es alto para un escenario S y bajo para un escenario L.

## 6. Advertencias obligatorias

Se reproducen en cada ficha de coste, tal y como exige la sección 5.5 del encargo:

- Los precios son **precios de lista**, sin descuentos comerciales negociados, salvo que se indique lo contrario de forma explícita.
- Todas las cifras de TCO para OSS son **estimaciones** basadas en los supuestos documentados en cada ficha, no cifras auditadas.
- Cuando el precio público es "contactar con ventas", se indica así explícitamente y se busca una referencia pública citable (p. ej. el listado del candidato en el marketplace de AWS, Azure o GCP). Si no existe ninguna referencia pública, el coste se marca `N/D`.

## 7. Bloque B (MarTech)

Los principios de las secciones 1 a 6 se aplican al Bloque B con estas particularidades. Los escenarios están en [`escenarios-martech.md`](escenarios-martech.md) y las fichas en `precios/martech/<candidato>.md`.

1. **Unidad de facturación heterogénea.** Se documenta la unidad de cada candidato (MTU, perfil, evento, email, «fila activa mensual», usuario/asiento, crédito) y qué parámetro del escenario se le aplica.
2. **Alcance del coste.** Es el coste de licencia o servicio del propio candidato. No incluye el warehouse (Bloque A), el proveedor de transporte de email ni los servicios de implantación, salvo que se indique. Las cuotas únicas (p. ej. incorporación) se listan aparte y no entran en el coste mensual.
3. **Precios por contactos no publicados.** Si la tarifa depende de un tramo de contactos que la página oficial no muestra, el coste del escenario se marca `N/D` y se indica el precio de entrada («desde») como referencia, sin extrapolar.
4. **OSS autoalojado (TCO).** Igual que en el §3 del Bloque A: `TCO = infraestructura + operación + soporte opcional`. La infraestructura se da como **rango estimado por el consultor** (tipo de máquina y número de nodos declarados) y la operación como horas/mes × 65 €/hora (supuesto del consultor). Ninguna de las dos cifras es una fuente factual.
5. **Moneda.** Cada ficha conserva la moneda de la página oficial. Para el resumen ([`resumen-martech.md`](resumen-martech.md)) se convierte todo a USD con el supuesto editable **1 EUR = 1,10 USD** (supuesto del consultor, no cotización).
6. **Nota de coste `MK-COS-01`.** Misma fórmula que el §5, `min(5, 5 × coste_mínimo_del_grupo / coste_candidato)`. Como CDP, plataformas de email y transporte no son sustitutos directos, se recomienda que la aplicación calcule el grupo mínimo **dentro de la categoría** (`categoria` de la ficha) o dentro del subconjunto que el usuario compare. El resumen muestra la nota calculada por categoría a modo de ejemplo.
7. **Rango.** Cuando hay varios planes posibles o descuentos por volumen no publicados, se da rango (mínimo–máximo); el punto medio alimenta la nota. Un candidato sin cifra pública citable recibe `N/D`.

## 8. Calculadora de la aplicación: alcance y decisión

### 8.1 Cómo obtiene la app el coste de un candidato

Para cada candidato y escenario (S/M/L), en este orden de prioridad:

1. **Coste total fijado a mano por el usuario.** Para cualquier candidato, sobre todo los que no tienen modelo: el usuario busca el precio por su cuenta (web del fabricante, calculadora oficial) y lo escribe en la ficha. Es un único importe mensual en EUR, sin cálculo, y entra igual que los demás en la nota de coste (§5) y en las comparativas. Vive solo mientras la página está abierta.
2. **Modelo de precios de la ficha** (§8.3): la app calcula el coste con los parámetros del escenario y los precios unitarios de la ficha, y el usuario puede cambiar cualquiera de ellos. Solo lo tienen unos pocos candidatos (§8.2).
3. **Total de la tabla de la ficha** (`## 2.`): lo extrae `generar_costes.py` (campo `totales` del JSON) como `{min, max, moneda}`, o `N/D` si la celda no es una cifra. Cubre los 26 candidatos con alguna cifra (13 de datos y 13 de martech).

La app **muestra siempre los costes en euros**. Internamente compara en USD (las fichas en EUR se pasan a USD con un tipo de cambio editable, por defecto 1 EUR = 1,10 USD, supuesto del consultor) y el pipe `eur` convierte a euros al pintar cualquier importe. La calculadora de una ficha enseña sus precios unitarios en la moneda de la fuente y los resultados en euros.

### 8.2 Por qué solo unos pocos candidatos tienen modelo

Se evaluaron las 45 fichas de `precios/` antes de decidirlo. Unificar los criterios de todas en un modelo ejecutable no es razonable:

- **Las fichas guardan resultados, no reglas.** El consumo de cada escenario (≈ 200 DBU, 60 créditos, 43.200 RPU-hora…) es una estimación del consultor escrita en una celda; los precios unitarios están en prosa. No hay una fórmula que convierta los parámetros de `escenarios.md` en ese consumo.
- **Las unidades de facturación no son unificables.** Créditos, DBU, CU, slot-hora, RPU-hora, TiB escaneados, MTU, perfiles, eventos, emails, «filas activas mensuales», asientos; más extras como almacenamiento, egress, IP dedicadas o créditos de IA. Las tablas de datos tienen 11 conjuntos de columnas distintos.
- **Muchas no tienen nada que calcular.** 13 de 45 fichas siguen sin modelo (§8.10): 12 de martech (precios bajo «contactar con ventas» o tablas de tramos que no se pueden extraer de la web) y DuckDB (sin coste directo). Databricks, Dremio y Firebolt, que no tenían cifras utilizables, se completaron en §8.8 y §8.10. Modelar un precio que no es público obligaría a inventarlo.
- **Parte de las cifras son estimaciones por analogía.** Apache Doris reutiliza las de ClickHouse. Un modelo exacto sobre una cifra aproximada da una falsa sensación de precisión.
- **Cada modelo es caro y arriesgado de hacer bien.** Hay que releer la página de precios, derivar el consumo y verificar el resultado contra la tabla. Al modelar los cuatro candidatos de abajo aparecieron dos incoherencias en las propias fichas (§8.6).

La decisión es modelar **cuatro candidatos que cubren las cuatro familias de precios**, para demostrar que el mecanismo funciona y para servir de plantilla, y dejar el resto con el total de la tabla más el coste manual:

| Candidato | Familia de precios | Qué ejercita |
|---|---|---|
| BigQuery | Volumen escaneado + almacenamiento | Precio unitario, franquicia gratuita (`max(0, …)`), parámetros de escenario |
| Snowflake | Créditos de cómputo + almacenamiento | Consumo estimado por el consultor como parámetro editable por escenario |
| ClickHouse (OSS) | TCO = infraestructura + operación | Rangos de infraestructura, FTE × tarifa × horas, moneda EUR |
| Amazon SES | Tarifa por volumen de emails | Precios por tramos y varias variantes (À la carte y Essentials) |

Posteriormente se añadieron cuatro candidatos de martech con precios por tramos de contactos (§8.7), seis más con precios públicos (§8.8), siete con precios públicos o TCO autoalojado (§8.9) y once más (§8.10), hasta 32 en total. Ampliar a más candidatos es mecánico (§8.5), pero solo compensa cuando el precio es público y el consumo se deriva de los parámetros del escenario. Para el resto, la ficha seguirá aportando su tabla y el usuario podrá fijar el coste a mano.

### 8.3 Formato del modelo

El modelo va en el front matter de la ficha de costes (`docs/costes/precios/<tipo>/<candidato>.md`), bajo la clave `modelo`. `generar_costes.py` lo valida y lo copia al JSON; si tiene errores, avisa por stderr y la ficha sale sin modelo.

```yaml
modelo:
  moneda: USD                      # EUR o USD
  parametros:                      # precios y supuestos propios del candidato; todos editables en la app
    - { id: precio_tib, nombre: "Precio por TiB escaneado", unidad: "USD/TiB", valor: 6.25, fuente: bq-pricing-page }
    - { id: creditos_mes, nombre: "Créditos al mes", valor: { S: 60, M: 900, L: 7500 } }   # sin fuente: supuesto del consultor
  variantes:                       # una o varias; con varias, el coste es el rango que abarcan
    - nombre: On-demand
      componentes:
        - { nombre: Consultas, formula: "max(0, tb_escaneados_dia * 30 - 1) * precio_tib" }
```

- **`valor`:** un número, un rango `{min, max}` o un valor por escenario `{S, M, L}` (cada uno número o rango). `fuente` es un id de `docs/fuentes.md`; sin fuente, el parámetro es un supuesto del consultor.
- **`formula`:** el coste mensual del componente, en la moneda del modelo. Admite `+ - * /`, paréntesis, números, variables y las funciones `max(...)`, `min(...)` y `ceil(x)`. Las variables son los ids de `parametros` y los parámetros numéricos de los escenarios (`escenarios.md` y `escenarios-martech.md`, columna `Id`). Una fórmula no puede usar nada más: no se ejecuta código.
- **Total:** suma de los componentes de cada variante. El rango se calcula evaluando con los mínimos y con los máximos de los parámetros. Con varias variantes, el total abarca desde el mínimo de las variantes hasta el máximo.

### 8.4 Escenarios con identificadores estables

Las tablas de `escenarios.md` y `escenarios-martech.md` tienen una columna `Id` (`tb_almacenados`, `emails_mes`…) que las fórmulas usan como variable. `generar_escenarios.py` las convierte en `escenarios.json`; las celdas no numéricas (descripción, canales, Sí/No) no se pueden usar en fórmulas. Añadir un parámetro es añadir una fila con su `Id`. Renombrar un `Id` obliga a actualizar las fórmulas que lo usan, y el generador avisa de los identificadores desconocidos.

### 8.5 Cómo añadir un modelo a otra ficha

1. Añadir el bloque `modelo` al front matter de la ficha, con `fuente` en cada precio publicado.
2. Ejecutar `scripts/generar_todo.sh` y revisar que no haya avisos de `modelo` en stderr.
3. Añadir el id del candidato a la lista `modeled` de `app/awsome-app/src/app/services/cost-models.spec.ts`: la prueba exige que el modelo reproduzca los totales de la tabla de la ficha con una tolerancia del 1 %.
4. Si el modelo y la tabla no coinciden, corregir el que esté equivocado antes de dar el modelo por bueno.

### 8.6 Limitaciones e incoherencias detectadas

- **BigQuery, escenario S:** la ficha decía «≈ 9 USD (tras 1 TiB gratuito)», pero con 1,5 TiB al mes y 1 TiB gratuito salen 3,1 USD (≈ 9 es lo que saldría sin franquicia). Se corrigió la tabla a ≈ 3 USD y el total a ≈ 23 USD. M y L ya aplicaban la franquicia.
- **ClickHouse, operación:** la tabla calcula la operación como `FTE × 65 €/h × horas_base`, con horas base de 16, 64 y 128 h/mes. No equivale a `FTE × horas del FTE al mes × tarifa`: con 160 h/mes, 0,3 FTE serían 3.120 €, no 1.248 €. El modelo reproduce el cálculo de la ficha tal cual, para que coincida con su tabla, y el consultor debería revisar qué se pretendía.
- **Rangos:** suponen que el coste no baja al subir un parámetro. Es cierto para estos modelos, pero un modelo con restas de parámetros podría invertirlo.
- **Moneda y unidades:** BigQuery trata TB y TiB como equivalentes, igual que la tabla de la ficha.
- **Persistencia:** los supuestos editados y los costes manuales viven solo en memoria y se pierden al recargar la página.

### 8.7 Ampliación: HubSpot, Klaviyo, Mailchimp y Salesforce Marketing Cloud

Se modelaron cuatro candidatos de martech muy conocidos que facturan por tramos de contactos o perfiles. Para refinar los datos se releyeron sus páginas oficiales de precios (2026-10-02).

- **Qué publica cada fabricante:** HubSpot, la cuota base de Professional, los contactos y asientos incluidos y el precio del asiento adicional, pero no la tabla de tramos de contactos. Klaviyo, solo el plan gratuito; el resto sale de un estimador interactivo. Mailchimp, solo el precio del tramo de entrada (500 contactos). Salesforce Marketing Cloud, las tres ediciones con sus topes de contactos y emails (los datos de la ficha ya eran oficiales).
- **De dónde salen los tramos:** para HubSpot, Klaviyo y Mailchimp, de artículos de terceros fechados en 2023-2026, registrados en `fuentes.md` con confianza **baja** (`hs-impactplus-pricing`, `kv-etester-pricing`, `kv-usecarly-pricing`, `mc-groupmail-pricing`, `mc-evs-pricing`). Solo se usan los valores en los que al menos dos fuentes coinciden o que cubren el tramo que necesita el escenario. En Mailchimp las dos tablas discrepan a partir de 100.000 contactos (650 frente a 800 USD en Standard), por lo que el modelo se limita a 50.000.
- **Cómo se calcula:** interpolación lineal entre los tramos publicados (los precios reales son escalonados, así que el modelo da el valor exacto solo en los puntos de la tabla). Por encima del último tramo con precio conocido el modelo da un **rango**: el mínimo es el precio del último tramo, y el máximo, el que saldría extrapolando su precio marginal sin descuento por volumen (parámetro `factor_extra`, de 0 a 1). Para HubSpot, el tope de la tarifa por tramos (100.000 contactos) es un supuesto del consultor.
- **Consecuencia:** M y L tienen rangos amplios (p. ej. HubSpot en L va de 8.365 a 253.455 USD). La nota de coste usa el punto medio, así que esos escenarios penalizan a estos candidatos frente a los que tienen una cifra cerrada. Hay que leerlos como una cota, no como una estimación.
- **Mailchimp pasa de EUR a USD**, porque los únicos importes por tramo disponibles están en USD. En la ficha se conservan los precios oficiales en EUR del tramo de entrada.
- **Twilio SendGrid no se modeló**, aunque estaba entre los candidatos previstos: la página oficial solo da los precios de entrada (Essentials desde 19,95 USD; Pro desde 89,95 USD) y no se pudo comprobar en ninguna fuente la tabla de los tramos intermedios. Modelarlo habría obligado a inventar esos importes.

### 8.8 Ampliación: Databricks, Redshift, MotherDuck, Microsoft Fabric, Postmark y Customer.io (2026-10-02)

Se revisaron las páginas de precios de ocho candidatos sin modelo (cuatro de datos y cuatro de martech) y se modelaron seis. Los modelos reproducen los totales de la tabla de su ficha (±1 %, `cost-models.spec.ts`).

| Candidato | Resultado | Notas |
|---|---|---|
| Redshift | Modelo (Serverless: RPU-hora + almacenamiento) | Precios oficiales confirmados; las RPU-hora por escenario son una estimación del consultor. |
| Postmark | Modelo (Basic, Pro y Platform) | Precios oficiales confirmados. |
| MotherDuck | Modelo (Business + cómputo + almacenamiento) | La página oficial cambió: ya no existen Pro (25 USD) ni Team (49 USD), el almacenamiento pasó de 0,08 a 0,04 USD/GB y Giga de 36 a 24 USD/hora; se actualizó la tabla (S 866, M 2.202 y L 11.706 USD). Con más de 10 usuarios (M y L) haría falta Enterprise, sin precio público. |
| Microsoft Fabric | Modelo (CU × horas activas × precio + OneLake) | La tabla de importes de Azure aparece vacía al leerla de forma automática: la tarifa de 0,18 USD/CU-hora es de un tercero (confianza baja). Se corrigió una incoherencia de la ficha: M y L se calculaban con la capacidad activa 24 h y S con ≈ 12 h, en lugar de las 16 h, 24 h y 8 h del escenario. |
| Databricks | Modelo (rango EE. UU. 0,70 – UE 0,91 USD/DBU + almacenamiento) | La página oficial no expone las tarifas sin JavaScript: confianza baja. El almacenamiento, que antes era `N/D`, es ahora un supuesto del consultor (23 USD/TB-mes) para poder cerrar el total. |
| Customer.io | Modelo (Essentials: cuota + perfiles y emails adicionales) | La página oficial solo publica los sobrecostes (0,009 USD por perfil, 0,12 USD por 1.000 emails); la cuota de 100 USD es de un tercero. M y L son cotas superiores de lista. |
| Brevo | Solo se actualiza la ficha | La página oficial publica el precio de entrada (Starter 7 EUR, Standard 15 EUR, Professional 499 USD) pero no los tramos de volumen, que carga por JavaScript. |
| SendGrid | Solo se actualiza la ficha (S y M con rango, L `N/D`) | Los tramos de Pro proceden de un tercero; faltan los de Essentials por encima de 100.000 emails y el precio por encima de 2,5 M. |

Los candidatos modelados pasan de 8 a 14. Las páginas de precios de Databricks, Brevo, SendGrid y Microsoft Fabric dependen de JavaScript: conviene revisarlas a mano en un navegador antes de usar las cifras en una cotización.

### 8.9 Ampliación: el resto de candidatos de martech con cifras (2026-10-02)

Se revisaron los candidatos de martech que tenían cifras en la ficha pero no modelo. Las páginas de precios de Dittofeed, Jitsu, Keila y RudderStack se releyeron y no habían cambiado.

| Candidato | Qué se modela | Notas |
|---|---|---|
| Dittofeed | Cloud Pro: cuota base + usuarios únicos adicionales por tramos (10.000 / 100.000 / 500.000) | Usa `perfiles` como usuarios únicos. |
| Jitsu | Business: cuota base + millones de eventos activos adicionales | Usa `eventos_mes`; M y L son precios de lista máximos (Enterprise no publicado). |
| Keila | Keila Cloud: interpolación entre los seis planes publicados (hasta 250.000 emails) y, por encima, un rango con `factor_extra` | Las celdas M y L, que eran `N/D`, pasan a un rango (256 – 1.749 € y 256 – 42.709 €), amplio y solo orientativo. |
| Apache Unomi, listmonk, Mautic | TCO autoalojado: infraestructura (rango) + horas de operación × 65 €/h | No tienen licencia; todas las cifras son supuestos del consultor, como en ClickHouse. |
| RudderStack | TCO autoalojado (igual que arriba) | La oferta Growth publica solo el precio de entrada (265 USD con 1 M de eventos), no el de cada tramo, y no se modela. |

Dittofeed, Jitsu y Keila tienen además un TCO autoalojado en la sección 2.2 de su ficha. El modelo recoge solo la oferta comercial (la tabla de la que ya se extraía el total), de modo que el comportamiento de la app no cambia y la prueba `cost-models.spec.ts` sigue comparando el modelo con la tabla. El TCO de esas tres fichas sigue siendo informativo. SendGrid, Brevo y los candidatos sin cifras siguen sin modelo (§8.8).

### 8.10 Ampliación: el resto de candidatos (2026-10-02)

Se revisaron los candidatos que aún no tenían modelo, sin volver a mirar los ya modelados. Quedan 13 sin modelo.

**Modelados (11):**

| Candidato | Qué se modela | Notas |
|---|---|---|
| Apache Doris, StarRocks | TCO autoalojado: infraestructura (rango) + `FTE × tarifa × horas base`, igual que ClickHouse | Cifras reutilizadas por analogía con ClickHouse; también heredan la salvedad de §8.6 sobre la operación. |
| Apache Druid, Apache Pinot | TCO autoalojado con 0,15, 0,375 y 0,9375 FTE | Pinot reutiliza las cifras de Druid. |
| PostgreSQL con extensiones analíticas | TCO autoalojado | Solo la variante autoalojada; los gestionados (RDS, Aurora, Neon…) no se modelan. |
| Apache Spark SQL, Trino | TCO autoalojado de solo cómputo | Sin almacenamiento propio (se contabiliza en el sistema de origen). |
| Dremio | Pago por uso: DCU activos × horas activas × 0,20 USD + almacenamiento | La página oficial ya no menciona el nivel gratuito permanente: S pasa de 0 USD a ≈ 215 USD, y M y L, de `N/D` a cifra. Los DCU por escenario (4, 16 y 64) y el almacenamiento (23 USD/TB-mes, como en Databricks) son supuestos del consultor. |
| Firebolt | Nodos S × horas activas × 0,92 USD + almacenamiento a 0,0264 USD/GB | Antes `N/D` (se había marcado `sin_total`). El precio del nodo S es el de un ejemplo de la calculadora oficial, no una tarifa por tipo de motor: confianza media. Los nodos por escenario (1, 4 y 16) son un supuesto. |
| Twilio Segment | Connections, plan Team: cuota base de 120 USD + MTU adicionales por tramos (12, 11 y 10 USD por 1.000) | Precios oficiales. M y L son cotas superiores: con esos volúmenes se vende el plan Business, a medida. |
| Salesforce Data Cloud | Profiles (240 USD por 1.000 perfiles al año) y Enterprise Profiles (420 USD) | Precios oficiales; el rango va de una variante a otra. El modelo por Flex Credits (500 USD por 100.000 créditos) no se modela porque el escenario no fija las operaciones. |

**Sin modelo (13):**

| Candidato | Motivo |
|---|---|
| DuckDB | Sin coste directo: la ficha lo documenta explícitamente (`sin_total`). |
| Adobe Real-Time CDP, Adobe Journey Optimizer, Bloomreach, mParticle, Treasure Data | Precio por cotización. Treasure Data tiene una referencia en AWS Marketplace (90.000 USD al año) sin definir las unidades incluidas. |
| Braze | Cuatro ediciones (Go, Select, Pro, Enterprise) según MAU y créditos de acción, sin cifras. |
| Tealium | Solo el precio de entrada de Data Cloud Activation (1.000 USD al mes, facturación anual); el resto, a medida. |
| Snowplow | Sin importes públicos. |
| Census | Solo dos ejemplos de precio con curvas de coste distintas. |
| Hightouch | Sin importes públicos para autoservicio. |
| Brevo, SendGrid | Los tramos de volumen no se pueden leer (§8.8). |

Para añadir modelo a un candidato de esta lista hará falta una cotización o una fuente que publique los importes por tramo.
