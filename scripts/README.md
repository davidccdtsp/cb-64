# scripts — validación y generación de datos

Scripts en Python que validan los `.md` de [`docs/`](../docs/) (la fuente de verdad) y generan los JSON estáticos que lee la aplicación de [`app/awsome-app/`](../app/awsome-app/README.md). La visión general del proyecto está en el [README de la raíz](../README.md). Todos los comandos se ejecutan **desde la raíz del repositorio**.

## Requisitos

| Herramienta | Versión | Notas |
|---|---|---|
| Python | 3.10 o superior (probado con 3.10.12) | Todos los scripts son Python 3. |
| PyYAML | 5.4.1 (probado) | `pip install pyyaml`. |
| Node.js | 24.21.0 (`app/awsome-app/.nvmrc`); mínimo 22.22 | Solo para `arrancar.sh` y `compilar.sh`, que arrancan y compilan la app. |

## Contenido

| Fichero | Para qué sirve |
|---|---|
| `arrancar.sh` | Valida, genera los JSON y arranca la web. |
| `compilar.sh` | Valida, genera los JSON y compila la web para producción (mismas opciones que `arrancar.sh`). |
| `generar_todo.sh` | Valida (sin enlaces), ejecuta los cuatro generadores y copia el estado del arte. |
| `validar_candidatos.py` | Valida `docs/fuentes.md`, las fichas de candidatos y su ficha de costes; llama a `validar_estructura.py`. |
| `validar_estructura.py` | Estructura de rúbricas, escenarios, candidatos y costes, y coherencia entre ficheros. |
| `generar_json.py` | Rúbricas → `rubrica.json`. |
| `generar_candidatos.py` | Candidatos → `candidatos.json`. |
| `generar_escenarios.py` | Escenarios de coste → `escenarios.json`. |
| `generar_costes.py` | Fichas de costes → `costes_datos.json` y `costes_martech.json`. |
| `md.py`, `formula.py` | Código común: lectura de Markdown, tablas, números en español, front matter y gramática de las fórmulas. |
| `tests/` | Pruebas de lo anterior (`test_md.py`, `test_costes.py`, `test_escenarios.py`, `test_validar.py`). |

Todas las pruebas de una vez: `python3 -m unittest discover -s scripts/tests -p "test_*.py"`; cada una también se puede ejecutar sola (`python3 scripts/tests/test_md.py`).

## Arrancar, compilar y regenerar

Los comandos de `scripts/` se ejecutan desde la raíz del repositorio. Los `.sh` (`arrancar.sh`, `compilar.sh`, `generar_todo.sh`) son scripts de shell POSIX y **solo funcionan en sistemas Unix/Linux**; los `.py` funcionan en cualquier sistema con Python. Como alternativa sin instalar nada, el [README de la raíz](../README.md#arranque-rápido) describe el arranque con Docker Compose.

```bash
scripts/arrancar.sh                   # valida (con enlaces), genera los JSON y arranca la web en http://localhost:4200
scripts/arrancar.sh --sin-links       # valida todo salvo los enlaces de docs/fuentes.md (~2 min menos)
scripts/arrancar.sh --sin-validacion  # no valida: solo regenera los JSON y arranca (para regeneraciones repetidas)
scripts/arrancar.sh --estricto        # los avisos también detienen el arranque (se combina con --sin-links)
scripts/arrancar.sh -- --port 4300    # lo que va tras -- se pasa a `ng serve`
```

`scripts/compilar.sh` hace lo mismo (valida, genera los JSON) pero en lugar de arrancar la web genera la compilación de producción en `app/awsome-app/dist/awsome-app/browser/`. Tiene las mismas opciones; lo que va tras `--` se pasa a `ng build`:

```bash
scripts/compilar.sh                   # valida (con enlaces), genera los JSON y compila
scripts/compilar.sh --sin-links       # sin comprobar los enlaces de docs/fuentes.md
scripts/compilar.sh --sin-validacion  # no valida: solo regenera los JSON y compila
scripts/compilar.sh --estricto        # los avisos también detienen la compilación
scripts/compilar.sh -- --configuration development   # lo que va tras -- se pasa a `ng build`
```

Hay dos modos de validación. En el **modo no estricto** (por defecto) los avisos —enlaces que no se pueden comprobar por bloqueos anti-bot o timeouts, y datos opcionales que faltan o son raros— se muestran por pantalla y no detienen nada; solo los errores paran el arranque. En el **modo estricto** (`--estricto`) los avisos también paran. Sirve para dar por buena una revisión completa o en integración continua; los enlaces que funcionan en el navegador pero no se pueden comprobar con un script (muy habitual con 403 y timeouts) obligan a revisarlos a mano o a usar el modo no estricto.

Se detiene en el primer error de validación o de generación. `arrancar.sh` y `compilar.sh` necesitan además Node >= 22.22 para arrancar la app (`app/awsome-app/.nvmrc` fija 24.21.0 para `nvm use`).

## Validación de los .md

`scripts/validar_candidatos.py` valida `docs/fuentes.md`, el front matter de las fichas de `docs/candidatos/` (incluida la existencia de su ficha de costes) y la estructura de rúbricas, escenarios, candidatos y costes. El cuerpo markdown de las fichas se ignora salvo donde un generador lo lee (§ «Generación de JSON»).

```bash
python3 scripts/validar_candidatos.py                          # todo docs/candidatos
python3 scripts/validar_candidatos.py docs/candidatos/datos    # un directorio
python3 scripts/validar_candidatos.py ficha.md --json out.json # además vuelca los válidos a JSON
python3 scripts/validar_candidatos.py --sin-red                # omite la comprobación de enlaces (rápido, sin conexión)
python3 scripts/validar_candidatos.py --sin-estructura         # omite el paso 3
python3 scripts/validar_candidatos.py --estricto               # los avisos también hacen fallar (código 1)
```

Cada hallazgo es un **ERROR** (siempre falla, código de salida 1) o un **AVISO** (se muestra y solo falla con `--estricto`). El resumen final dice cuántos hay de cada y en qué modo se ejecutó.

Pasos, en este orden (todos se ejecutan siempre, para informar de todo en una sola pasada):

1. **`docs/fuentes.md`**: 
- ids duplicados (error) y enlaces (HEAD y, si falla, GET; el fragmento `#...` se ignora). 
- Son errores los 404/410/5xx y los fallos DNS. 
- Los 401/403/429, timeouts y fallos TLS son **avisos** («enlace no comprobable»): suelen ser bloqueo anti-bot y el enlace funciona en el navegador, así que hay que revisarlos a mano. 
- Para no provocar 429, las peticiones van en paralelo entre servidores pero en serie (con 1 s de pausa) dentro de cada uno, y un 429 se reintenta respetando `Retry-After`. Tarda ~2 min.

2. **Candidatos** (`docs/candidatos/<tipo>/*.md`), con estas reglas:

- `id`, `nombre`, `dominio`, `categoria`, `tipo`, `licencia` y `fecha_revision` no vacíos.
- `despliegue` con al menos un elemento.
- `puntuaciones` es un mapa `id -> puntuación` (no una lista).
- En `puntuaciones`, si `nota` no está vacía, `fuentes` debe tener al menos un elemento.
- Todas las `fuentes` de cada puntuación deben existir como id en `docs/fuentes.md`.
- **Costes:** cada candidato `docs/candidatos/<tipo>/<id>.md` debe tener su ficha `docs/costes/precios/<tipo>/<id>.md` (mismo `<tipo>` e `<id>`), y el front matter de esa ficha debe declarar `candidato: <id>`.

3. **Estructura y coherencia** (`scripts/validar_estructura.py`): ejecuta los mismos análisis que los generadores, sin escribir nada, y recoge sus errores y avisos; después cruza ficheros:
   - **Rúbricas:** comentarios `<!-- BLOQUE -->` bien abiertos y cerrados (un cierre mal escrito deja el bloque sin leer), ids de criterio con formato `XX-YYY-NN` y sin duplicar, `Peso` entero, `Obligatorio` Sí/No, escala con los valores numéricos, un `### ID` fuera de un bloque `VALOR`, y que el nº de criterios declarado de cada dimensión coincida con los leídos.
   - **Candidatos:** `id` igual al nombre del fichero, `dominio` igual a su carpeta, `fecha_revision` en formato `AAAA-MM-DD`, categoría existente en la rúbrica, puntuaciones solo de criterios de la rúbrica (y todos presentes), y `nota` dentro de la escala.
   - **Escenarios:** ids únicos y utilizables en fórmulas; celdas que parecen un número pero no están en formato español (`2M`, `0.05`).
   - **Costes:** `candidato` igual al nombre del fichero, sin fichas duplicadas ni huérfanas, columna `Escenario` y totales reconocibles, y sintaxis de las fórmulas del modelo con la misma gramática que la app. Una ficha que no tiene total mensual a propósito lo declara con `sin_total: motivo` en el front matter.

Salida: una línea por hallazgo, `ERROR|AVISO fichero:línea: mensaje`, que incluye el campo y el valor encontrado, por ejemplo:

```
ERROR docs/candidatos/datos/apache-druid.md:23: puntuación 'DP-INT-03' tiene nota='N/D' pero 'fuentes' está vacío
ERROR docs/candidatos/datos/x.md:1: sin ficha de costes: falta docs/costes/precios/datos/x.md
AVISO docs/fuentes.md:33: fuente 'osi-apache2' enlace no comprobable: HTTP 403 (posible bloqueo, revisar a mano) -> https://opensource.org/license/apache-2.0
AVISO rúbricas: datos.md:77: DP-ARQ-01 duplicado, ignorado
```

`python3 scripts/tests/test_validar.py` comprueba, sobre una copia de `docs/`, que cada defecto típico (bloque sin cerrar, id duplicado, peso `2,5`, fecha imposible, fórmula con coma decimal…) se detecta.

### Por qué parsear primero y validar después

Las fichas se convertirán a JSON para la SPA. El script parsea el YAML a estructuras Python y valida sobre ellas, de modo que la validación y el JSON salen del mismo parseo (`--json`) y no pueden divergir. Validar sobre el texto en bruto obligaría a un segundo parser. Con `--json` solo se escriben los candidatos válidos.

## Generación de JSON para la app

`generar_todo.sh` también copia `docs/estado-del-arte/` a `app/awsome-app/public/docs/`: la página Estado del arte renderiza esos `.md` directamente, sin parsearlos.

Cuatro scripts generan los recursos estáticos de `app/awsome-app/public/`: rúbricas (`generar_json.py`), candidatos (`generar_candidatos.py`), escenarios de coste (`generar_escenarios.py`) y costes (`generar_costes.py`). Conviene ejecutar antes `validar_candidatos.py`.

### Rúbricas

```bash
python3 scripts/generar_json.py
```

Genera `app/awsome-app/public/rubrica.json` (recurso estático de la app Angular) a partir de `docs/rubricas/datos.md` y `docs/rubricas/martech.md`. Solo se parsean los bloques delimitados por `<!-- NOMBRE -->` ... `<!-- /NOMBRE -->`; el resto del markdown se ignora. Si falta un bloque, el script avisa por stderr y deja esa sección vacía en el JSON (no falla).

Bloques soportados:
- `CATEGORIAS`: tabla de categorías, de la que se extraen `id` y `descripcion`.
- `DIMENSIONES`: tabla de 4 columnas `id | nombre | nº criterios | peso`, de la que se extraen `id`, `nombre`, `criterios` y `peso` (enteros).
- `VALOR`: un bloque puede abarcar varias dimensiones y criterios (como en `datos.md`) o ser de un solo criterio. Dentro del bloque:
  - `### ID — NOMBRE`: `ID` es texto sin espacios; `NOMBRE` empieza en la primera letra tras el ID (se descartan espacios, guiones y símbolos).
  - `## DIMENSION`: fija la dimensión de los criterios siguientes (primer token, sin espacios; se ignora lo que va a su derecha). Si el bloque empieza sin `##`, rige el último `## ` anterior al bloque. El valor se inserta en la dimensión con ese `id` en `DIMENSIONES`.
  - `**Pregunta:**` es todo el texto hasta `**Tipo:**`.
  - `**Tipo:**` debe empezar por `puntuable`, `booleano` o `informativo` (lo que sigue se ignora).
  - `**Peso:**` (opcional): se guarda como entero en `peso`; si falta o no es un entero queda `null`.
  - `**Tipo:** puntuable (calculado ...)`: el criterio no lleva tabla de escala y se guarda con `"calculado": true`. Los criterios de coste (`DP-COS-01` y `MK-COS-01`) ya no están en los `.md`: los define la propia app (`COST_CRITERION` en `data.service.ts`, peso 3 por defecto) y su nota la calcula a partir de las fichas de `costes/precios/`; los candidatos no los puntúan.
  - `**Obligatorio:**` (opcional): `Sí`/`No` en cualquier variante de mayúsculas o acentos; se guarda como booleano en `obligatorio` (`null` si falta o es otro valor).
  - `**Escala:**` solo se lee en los `puntuable`: solo se usa la tabla, obligatoria (el texto que la acompañe se ignora; cabecera = valores, primera fila = descripciones; el nº de columnas puede variar).
  - Un bloque sin `###`, sin `## DIMENSION` previo, con un `Tipo` no válido, con una dimensión inexistente o un `puntuable` sin tabla de escala **no se inserta** y se avisa por stderr con `fichero:línea`.

Estructura:

```json
{ "datos": {
    "categorias": [{ "id", "descripcion" }],
    "dimensiones": [{ "id", "nombre", "criterios", "peso",
      "valores": [{ "id", "nombre", "pregunta", "tipo", "peso", "obligatorio",
                    "escala": { "niveles": [{ "valor", "descripcion" }] } }] }] },
  "martech": { ... } }
```

`escala` solo existe en los `puntuable`.

### Candidatos

```bash
python3 scripts/generar_candidatos.py
```

Genera `app/awsome-app/public/candidatos.json` a partir de `docs/candidatos/<tipo>/*.md`: `{ "datos": [...], "martech": [...] }`. Solo se lee el front matter (el primer bloque entre `---` con contenido; el resto del fichero se ignora) y se copian todos sus campos. `puntuaciones` pasa de mapa a lista homogénea:

```json
{ "id": "DP-ARQ-03", "nota": null, "valor": false, "texto": null, "confianza": "media",
  "fuentes": [{ "id": "pinot-docs-deep-store", "url": "https://..." }] }
```

- `nota`: número (`null` si falta o no es numérica; en ese caso avisa por stderr).
- `valor`: booleano si el valor es sí/no en cualquier variante de mayúsculas o acentos (`Sí`, `si`, `NO`...).
- `texto`: el valor cuando es otro texto (p. ej. `N/D` o una descripción larga).
- `confianza`: texto (`alta`, `media`, `baja`, `n/a`).
- `fuentes`: cada id se traduce a su `url` buscándolo en `docs/fuentes.md`; si no existe, `url` es `null` y se avisa por stderr.

### Escenarios de coste

```bash
python3 scripts/generar_escenarios.py
```

Genera `app/awsome-app/public/escenarios.json` a partir de la tabla `Id | Parámetro | S | M | L` de `docs/costes/escenarios.md` (datos) y `docs/costes/escenarios-martech.md` (martech). Por parámetro: `{ id, nombre, unidad, valores: {S, M, L}, textos: {S, M, L} }`. `valores` solo tiene los escenarios cuya celda es numérica (`1 TB` → 1, `2 millones` → 2000000, `10 %` → 10); `textos` conserva la celda original y `unidad` es lo que sigue al número. Los ids son los que pueden usar las fórmulas de los modelos de precios. `python3 scripts/tests/test_escenarios.py` comprueba el parseo.

### Costes

```bash
python3 scripts/generar_costes.py
```

Genera `app/awsome-app/public/costes_datos.json` y `costes_martech.json` a partir de `docs/costes/precios/<tipo>/*.md`. Por candidato:

```json
{ "candidato": "keila", "fecha_revision": "2026-09-30", "region_referencia": "...", "moneda": "EUR",
  "tablas": [{ "titulo": "2.1 Oferta comercial (EUR)", "filas": [{ "Escenario": "S", "Coste mensual": "64,00 €", "Coste anual": "768 €" }] }] }
```

- `totales`: coste mensual total por escenario (`S`, `M`, `L`) como `{ min, max, moneda, origen, texto }`. Se toma la columna `TCO mensual` o `Coste mensual` (o la de Dremio Cloud) de la primera tabla que tenga cifra en ese escenario; `origen` es el título de esa tabla y `texto` la celda original. `min` y `max` son `null` cuando la celda no es una cifra (`N/D`, texto libre, `≈ 182 USD + almacenamiento`...). La moneda sale de la celda, o del título de la tabla (`(EUR)`), o del front matter. `python3 scripts/tests/test_costes.py` comprueba este parseo.
- Los cuatro primeros campos salen del front matter; si falta alguno queda como cadena vacía y se avisa por stderr.
- `enlaces`: las notas al pie del final de la ficha (`[^id]: Autor, «Título», https://..., consultado AAAA-MM-DD.`) como `{ id, titulo, url, consultado }`. La tarjeta de coste de la app las muestra al final como «Fuentes de costes». Las notas sin URL se ignoran.
- `tablas` recoge las tablas de la sección `## 2.` (puede haber varias, p. ej. 2.1 y 2.2; `titulo` es el `###` que la precede, o vacío). Las columnas varían según el candidato; las celdas se guardan como texto tal cual, sin `**`.
- Un candidato sin tabla (p. ej. Firebolt) queda con `"tablas": []` y un aviso.
- `modelo` (solo en las fichas que lo declaran en el front matter): el modelo de precios calculable, copiado tal cual tras validarlo (moneda, ids y fuentes de los parámetros, identificadores de las fórmulas). Si tiene errores se avisa por stderr y la ficha sale sin él. Formato y alcance en [`docs/costes/metodologia.md`](../docs/costes/metodologia.md#8-calculadora-de-la-aplicación-alcance-y-decisión).

Para generar todos los JSON de una vez: `scripts/generar_todo.sh` (valida sin enlaces, ejecuta `generar_json.py`, `generar_candidatos.py`, `generar_escenarios.py` y `generar_costes.py` en ese orden, copia el estado del arte y se detiene si algo falla). Acepta `--estricto` y `--sin-validacion`.

### Contrato de los generadores

Los .md no tienen una estructura que un editor pueda imponer, así que los generadores son tolerantes y el validador es quien avisa:

- **Aviso:** un dato opcional falta o es raro (peso no entero, `Obligatorio` mal escrito, `despliegue` que no es una lista…). El JSON se genera igual, con un valor por defecto o sin ese elemento, y el aviso sale por stderr.
- **Error:** un dato estructural imposible (front matter ilegible, fecha inválida, id duplicado, `puntuaciones` mal formadas). Esa ficha se omite, el script sale con código 1 y **no escribe el JSON**, así que se conserva el anterior, que siempre es válido.
- Todos aceptan `--estricto` (los avisos también fallan) y `--salida DIR` (escribir en otro directorio, útil para pruebas).
- Los JSON siempre tienen las dos áreas (`datos` y `martech`), arrays en lugar de `null` y fechas `AAAA-MM-DD`. La app, además, carga cada JSON por separado: si uno falta o está degradado, muestra el resto y avisa de cuál.
- El código común (lectura sin BOM ni CRLF, tablas con `\|`, números en formato español, sí/no, front matter estricto) está en `scripts/md.py`, y la gramática de las fórmulas en `scripts/formula.py`; `scripts/tests/test_md.py` los prueba.

## Cómo añadir un candidato

1. Crea la ficha `docs/candidatos/<datos|martech>/<id>.md` copiando una existente. El front matter lleva `id`, `nombre`, `dominio`, `categoria`, `tipo`, `licencia`, `despliegue`, `fecha_revision` y `puntuaciones`: una entrada por criterio de la rúbrica, con `nota` (0-5) o `valor` (`Sí`/`No`/texto como `N/D`), `confianza` y la lista de `fuentes` (ids de `docs/fuentes.md`).
2. Si usas fuentes nuevas, añádelas a `docs/fuentes.md` con id, título, tipo, URL y fecha de consulta.
3. Crea su ficha de costes `docs/costes/precios/<datos|martech>/<id>.md` (con `candidato: <id>` en el front matter y la tabla de la sección 2). Si el coste debe calcularse con fórmulas, añade un `modelo` (ver «Añadir un modelo de precios» más abajo y `docs/costes/metodologia.md` §8).
4. Ejecuta `scripts/arrancar.sh` (o `scripts/generar_todo.sh`, que ya valida). No hay que tocar el código de la app.

### Ejemplo de candidato básico

Ficha `docs/candidatos/datos/ejemplo-db.md`. Solo se lee el front matter (lo que va entre los `---`); debajo se puede escribir libremente la justificación de cada puntuación. La rúbrica de datos tiene 29 criterios y **la ficha debe puntuarlos todos** (el validador avisa de los que falten).

```markdown
---
id: ejemplo-db
nombre: Ejemplo DB
dominio: datos
categoria: cloud-dwh
tipo: cloud
licencia: propietaria
despliegue: [saas]
fecha_revision: 2026-10-02
puntuaciones:
  DP-ARQ-01: { nota: 4, confianza: media, fuentes: [ej-docs-arquitectura] }
  DP-ARQ-03: { valor: "Sí", confianza: alta, fuentes: [ej-docs-arquitectura] }
  DP-LIC-01: { valor: "No", confianza: alta, fuentes: [ej-licencia] }
  DP-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  # ... una línea por cada criterio restante de docs/rubricas/datos.md
---

## Arquitectura

### DP-ARQ-01 · 4/5
Separa cómputo y almacenamiento y permite varios clústeres de cómputo sobre los mismos datos.
```

- `nota` es un número de 0 a 5 que debe existir en la escala del criterio y **exige al menos una fuente**.
- `valor` sirve para los criterios booleanos (`Sí`/`No`) y para el texto libre (`N/D`, «No aplica…»).
- `confianza` es `alta`, `media`, `baja` o `n/a`; `fuentes` son ids de `docs/fuentes.md` (con `[]` si no hay ninguna).
- `categoria` debe ser una de las de la rúbrica y `despliegue` una lista con al menos un elemento.

Sus fuentes en `docs/fuentes.md` (una fila por fuente, con el id que usan las fichas y los modelos):

```markdown
| `ej-docs-arquitectura` | Arquitectura | Ejemplo DB (oficial) | https://ejemplo.com/docs/arquitectura | 2026-10-02 | Alta |
| `ej-precios` | Pricing | Ejemplo DB (oficial) | https://ejemplo.com/pricing | 2026-10-02 | Alta |
```

#### Ficha de costes del ejemplo

Su ficha de costes `docs/costes/precios/datos/ejemplo-db.md`, con la tabla de la sección 2 (la columna `Coste mensual` de la primera tabla es el total mensual de cada escenario) y las fuentes como notas al pie:

```markdown
---
candidato: ejemplo-db
fecha_revision: 2026-10-02
region_referencia: "Lista global sin desglose por región"
moneda: USD
---

# Costes — Ejemplo DB

## 1. Modelo de precios

- **Unidad de facturación:** TB almacenados al mes[^ej-precios].
- **Precio de lista:** 100 USD por TB.[^ej-precios]

## 2. Coste estimado por escenario

### 2.1 Oferta comercial (USD)

| Escenario | Coste mensual | Coste anual |
|---|---|---|
| S | 100 USD | 1.200 USD |
| M | 2.000 USD | 24.000 USD |
| L | 20.000 USD | 240.000 USD |

[^ej-precios]: Ejemplo, «Pricing», https://ejemplo.com/pricing, consultado 2026-10-02.
```

#### Añadir un modelo de precios

Una ficha de costes puede llevar, además de la [tabla de la sección 2](#ficha-de-costes-del-ejemplo), un **modelo de precios**: la descripción de cómo se obtiene el coste mensual a partir de unos precios y de los parámetros de cada escenario. Es opcional. Sin él, el coste de cada escenario es el que se escribe a mano en la tabla. En caso de existir dicho modelo, los precios se calcularán en base a éste.

Un modelo se escribe bajo la clave `modelo:` y tiene tres partes:

- **`moneda`:** `EUR` o `USD`; es la moneda de todos los importes y fórmulas del modelo.
- **`parametros`:** los datos propios del candidato, cada uno con `id`, `nombre`, `unidad` y `valor`. El `valor` puede ser un número (`100`), un rango (`{ min: 30, max: 60 }`) o un valor distinto por escenario (`{ S: 4, M: 12, L: 40 }`, donde cada uno puede ser a su vez un número o un rango). `fuente` es el id de `docs/fuentes.md` de donde sale el dato; sin `fuente`, se entiende que es un supuesto de quien escribe la ficha.
- **`variantes`:** una o varias formas de contratar el producto (p. ej. dos planes). Cada variante tiene `componentes`, y cada componente una `formula` que da su coste mensual. El coste de una variante es la suma de sus componentes; con varias variantes, el coste final es el rango que va del menor al mayor de ellas.

Las **fórmulas** admiten `+ - * /`, paréntesis, números, variables y las funciones `max`, `min` y `ceil`; no admiten nada más. Las variables que pueden usar son los `id` de los `parametros` del propio modelo y los `Id` de las tablas de escenarios: [`docs/costes/escenarios.md`](../docs/costes/escenarios.md) para datos (`tb_almacenados`, `horas_activas_dia`…) y [`docs/costes/escenarios-martech.md`](../docs/costes/escenarios-martech.md) para martech (`perfiles`, `emails_mes`…). En cada escenario (S, M o L) una variable de escenario toma el valor de su columna.

**La tabla de la sección 2 y el modelo deben decir lo mismo:** la tabla es el resultado del modelo en cada escenario, escrito a mano para quien lea el `.md`. Si en un parámetro hay un rango, el coste es un rango (el mínimo se calcula con todos los mínimos y el máximo con todos los máximos), y así debe figurar en la tabla. Se tolera una diferencia de hasta el 1 % por redondeos; cuando no coinciden, hay que corregir el que esté equivocado.

**Ejemplo 1: precio por unidad.** La ficha de `ejemplo-db` cobra 100 USD por TB almacenado al mes. El modelo multiplica los TB del escenario por ese precio:

```yaml
modelo:
  moneda: USD
  parametros:
    - { id: precio_tb, nombre: "Precio por TB almacenado", unidad: "USD/TB-mes", valor: 100, fuente: ej-precios }
  variantes:
    - nombre: "Precio de lista"
      componentes:
        - { nombre: "Almacenamiento", formula: "tb_almacenados * precio_tb" }
```

`valor` es un número y `fuente` el id de `docs/fuentes.md` de donde sale; sin `fuente`, el parámetro se muestra como supuesto del consultor. Aquí intervienen dos tipos de datos:

- **Lo que define el escenario**, en [`docs/costes/escenarios.md`](../docs/costes/escenarios.md), común a todos los candidatos del área. La fórmula usa `tb_almacenados` (su `Id` en la tabla de escenarios):

  | Id | Parámetro | S | M | L |
  |---|---|---|---|---|
  | `tb_almacenados` | TB almacenados (histórico) | 1 TB | 20 TB | 200 TB |

- **Lo que define el modelo**, propio del candidato: `precio_tb` = 100 USD/TB-mes, igual en los tres escenarios.

Con esos valores, la fórmula da el coste de cada escenario:

| Escenario | `tb_almacenados` | `precio_tb` | Cálculo (`tb_almacenados * precio_tb`) | Coste mensual |
|---|---|---|---|---|
| S | 1 | 100 | 1 × 100 | 100 USD |
| M | 20 | 100 | 20 × 100 | 2.000 USD |
| L | 200 | 100 | 200 × 100 | 20.000 USD |

La última columna es la que debe figurar en la tabla de la sección 2 de la ficha (la del ejemplo de más arriba). Si cambia el valor de un escenario (p. ej. M pasa a 30 TB) o el precio, el coste sale distinto sin tocar la fórmula.

**Ejemplo 2: TCO de un candidato de código abierto.** No tiene precio de lista: el coste es infraestructura más horas de operación. La infraestructura es un rango por escenario (`{ min, max }`), las horas varían por escenario (`{ S, M, L }`) y la tarifa es un único valor:

```yaml
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 30, max: 60 }, M: { min: 150, max: 350 }, L: { min: 800, max: 1800 } } }
    - { id: horas_operacion, nombre: "Horas de operación al mes (estimación del consultor)", unidad: "h/mes", valor: { S: 4, M: 12, L: 40 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
  variantes:
    - nombre: "OSS autoalojado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "horas_operacion * tarifa_hora" }
```

Aquí el modelo no usa ninguna variable de `escenarios.md`: los valores que cambian con el tamaño del escenario son parámetros del propio modelo, cada uno con su valor para S, M y L:

| Parámetro del modelo | S | M | L |
|---|---|---|---|
| `infraestructura` (EUR/mes) | 30 – 60 | 150 – 350 | 800 – 1.800 |
| `horas_operacion` (h/mes) | 4 | 12 | 40 |
| `tarifa_hora` (EUR/h) | 65 | 65 | 65 |

Los dos componentes se calculan por separado y se suman. Como la infraestructura es un rango, el coste también lo es: el mínimo usa todos los mínimos y el máximo, todos los máximos.

| Escenario | Infraestructura | Operación (`horas_operacion * tarifa_hora`) | Coste mensual (suma) |
|---|---|---|---|
| S | 30 – 60 € | 4 × 65 = 260 € | 290 – 320 € |
| M | 150 – 350 € | 12 × 65 = 780 € | 930 – 1.130 € |
| L | 800 – 1.800 € | 40 × 65 = 2.600 € | 3.400 – 4.400 € |

La última columna es lo que debe decir la tabla de la sección 2 de la ficha (`≈ 290 – 320 €`, `≈ 930 – 1.130 €` y `≈ 3.400 – 4.400 €`). Con varias `variantes` (p. ej. dos planes de un mismo producto) el coste es el rango que abarcan todas.

Al ejecutar `scripts/generar_todo.sh`, `generar_costes.py` valida el modelo (formato de los parámetros, ids y fuentes, sintaxis de las fórmulas y variables desconocidas); si tiene errores, avisa y la ficha se genera sin modelo, con solo la tabla. El generador no comprueba que el resultado coincida con la tabla: eso se verifica a mano al escribirlo. El formato completo, con tramos de precios y más ejemplos, está en [`docs/costes/metodologia.md`](../docs/costes/metodologia.md#8-calculadora-de-la-aplicación-alcance-y-decisión) (§8.3 a §8.5).

Con esto, el validador y `generar_costes.py` aceptan el candidato y sus costes sin errores (se comprobó con una copia que completa los criterios que aquí se omiten). Para que el coste salga de unas fórmulas en lugar de la tabla, añade un `modelo` al front matter de la ficha de costes (ver más abajo).

## Cómo añadir o cambiar un criterio

1. Edita el bloque `<!-- VALOR -->` de `docs/rubricas/datos.md` o `docs/rubricas/martech.md`: un `### ID — Nombre` con `Pregunta`, `Tipo` (`puntuable`, `booleano` o `informativo`), `Peso`, `Obligatorio` y, para los puntuables, la tabla de escala 0-5. Sigue el formato de la sección «Generación de JSON → Rúbricas».
2. Actualiza la tabla `DIMENSIONES` (nº de criterios y peso) si cambia el número de criterios o su importancia.
3. Añade la entrada del criterio en `puntuaciones` de cada ficha de candidato.
4. Regenera con `scripts/generar_todo.sh`. La app lee la rúbrica del JSON, así que el criterio aparece solo en la ficha, los pesos y la puntuación.

### Ejemplo de criterio básico

Un criterio nuevo de la dimensión `DP-GOB` (gobierno y seguridad), dentro del bloque `VALOR` de `docs/rubricas/datos.md`, después del último criterio de esa dimensión y antes del `---` que la separa de la siguiente (el criterio pertenece a la dimensión del último `## DP-XXX` que lo precede):

```markdown
### DP-GOB-05 — Cifrado con claves propias
- **Pregunta:** ¿Permite al cliente cifrar los datos en reposo con claves que gestiona él (BYOK/CMK)?
- **Tipo:** puntuable · **Peso:** 2
- **Obligatorio:** No
- **Escala:**

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Sin cifrado en reposo. | Cifrado gestionado por el fabricante, sin opción del cliente. | Claves del cliente solo en la oferta de pago superior. | Claves del cliente (BYOK) en todas las ofertas. | BYOK con rotación automática y auditoría de uso. | Lo anterior + claves en un HSM externo del cliente (HYOK). |
```

Después, sube en uno el nº de criterios de `DP-GOB` en la tabla `DIMENSIONES` (de 4 a 5) y añade a cada candidato de datos su puntuación:

```yaml
  DP-GOB-05: { nota: 3, confianza: media, fuentes: [ej-docs-seguridad] }
```

Si no se puede puntuar a un candidato todavía, `{ valor: "N/D", confianza: n/a, fuentes: [] }` cuenta como criterio presente sin nota (el tratamiento de los criterios sin puntuación se elige en la app). El validador avisa de los candidatos que aún no puntúan el criterio y comprueba que cada `nota` esté en su escala y que no se puntúe ningún criterio que no exista en la rúbrica.
