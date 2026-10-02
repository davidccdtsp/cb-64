# AwsomeApp — README técnico del front

Aplicación web (SPA Angular) para comparar plataformas analíticas de datos y MarTech. No tiene backend: lee JSON estáticos que generan los scripts de [`scripts/`](../../scripts/README.md) a partir de los `.md` de [`docs/`](../../docs/), que son la fuente de verdad. Este README explica la aplicación: por qué Angular, cómo desarrollarla y configurarla y qué hace cada función. La visión general está en el [README de la raíz](../../README.md) y la generación de datos, en el [README de `scripts/`](../../scripts/README.md).

## Por qué Angular

El encargo deja libre el framework y pide justificarlo. Se eligió **Angular** por cuatro razones:

- **Robusto:** es un framework completo (componentes, formularios reactivos, enrutado, cliente HTTP, inyección de dependencias y herramientas de compilación y test incluidas), así que la app no depende de reunir y mantener librerías sueltas para esas piezas.
- **Estable:** tiene un calendario de versiones y de soporte previsible y una política de compatibilidad y de migraciones guiadas (`ng update`), que reduce el riesgo de que la app quede obsoleta.
- **Bien mantenido:** lo desarrolla Google con un equipo dedicado y una comunidad grande, y sus librerías oficiales (Angular Material, CDK) se actualizan a la par.
- **Experiencia del equipo:** el equipo de desarrollo ya lo conoce, lo que acorta el desarrollo y facilita el mantenimiento posterior.

Se usan sus características actuales (componentes standalone, señales y formularios reactivos tipados). En ejecución no hay servicios de terceros: los gráficos (Chart.js), el lector de Markdown (`marked`) y las tipografías (Roboto y Material Symbols, paquetes `@fontsource`) van empaquetados en la propia compilación.

## Versiones

| Herramienta | Versión | Notas |
|---|---|---|
| Node.js | 24.21.0 (`.nvmrc`); mínimo 22.22 | Para compilar y arrancar la app. |
| npm | 11.19 | Viene con Node 24. |
| Angular | 22.2 | `@angular/*` 22.2; Angular Material y CDK 22.2. |
| TypeScript | 6.0 | |

Los scripts que generan los datos necesitan Python y PyYAML: ver [`scripts/README.md`](../../scripts/README.md).

## Desarrollo de la app

```bash
cd app/awsome-app
npm install
npx ng serve            # http://localhost:4200
npx ng build            # compilación de producción en dist/
npx ng test --watch=false
```

Tests con Vitest (`ng test`). Angular 22 con componentes standalone, señales y Angular Material; los gráficos usan Chart.js y el estado del arte se renderiza con `marked`.

El modelo de precios de cada ficha de costes se prueba en `src/app/services/cost-models.spec.ts`: para los candidatos de su lista `modeled`, el coste que calcula el modelo debe coincidir con los totales de la tabla de la ficha (±1 %). Al añadir un modelo a una ficha (ver el [README de `scripts/`](../../scripts/README.md)), añade su id a esa lista.

## Datos que lee la app

La app no tiene backend: carga al arrancar JSON estáticos de `public/` (`rubrica.json`, `candidatos.json`, `escenarios.json`, `costes_datos.json`, `costes_martech.json`, `config.json`) y los `.md` de `public/docs/estado-del-arte/`. Todos salvo `config.json` los generan los scripts a partir de `docs/`: cómo regenerarlos, validar los `.md` y añadir candidatos o criterios está en el [README de `scripts/`](../../scripts/README.md). Para arrancar todo de una vez, `scripts/arrancar.sh` (ver el [README de la raíz](../../README.md)).

## Configuración de la app

### `config.json`

`app/awsome-app/public/config.json` se lee al arrancar (antes de pintar la página) y se copia tal cual a la compilación, junto a `index.html`. Se puede cambiar en un despliegue sin recompilar:

```json
{
  "title": "Awsome App",
  "catalogMaxRows": 100
}
```

| Clave | Por defecto | Efecto |
|---|---|---|
| `title` | `"Awsome App"` | Título de la aplicación: cabecera, menú, pie y pestaña del navegador. Debe ser un texto no vacío. |
| `catalogMaxRows` | `100` | Máximo de candidatos que muestra la página Catálogo (los de mejor nota; los candidatos sin puntuación nunca se muestran). Debe ser un entero mayor que 0. |

Si el fichero no existe, no es JSON válido, o una clave falta o no cumple lo indicado, esa clave usa su valor por defecto y la aplicación arranca igual. Un cambio en el fichero se aplica al recargar la página.

## Abrir la app sin Angular CLI

La compilación (`npx ng build`) deja en `app/awsome-app/dist/awsome-app/browser/` ficheros estáticos que sirve cualquier servidor web, por ejemplo:

```bash
python3 -m http.server 8080 -d app/awsome-app/dist/awsome-app/browser   # http://localhost:8080
```

No funciona abriendo `index.html` con `file://`, y cambiar `HttpClient` por `fetch` no lo arreglaría: los navegadores bloquean tanto `fetch` como XHR a `file://` (origen opaco, sin CORS), y además el propio `index.html` carga el código como módulos ES, que tampoco se cargan desde `file://`. Se necesita un servidor estático. Con `python3 -m http.server`, recargar la página en una ruta distinta de `/` da 404 (la app es una SPA con rutas sin `#`); en un servidor real hay que reenviar todas las rutas a `index.html`.

## Páginas de la aplicación

Cinco páginas, todas con carga diferida (`app.routes.ts`); `/` redirige al Catálogo. En todas, el engranaje de la cabecera abre la [importación y exportación de la configuración](#exportar-e-importar-la-configuración), y la configuración y los filtros viajan en la [URL](#estado-en-la-url).

| Página | Ruta | Qué permite |
|---|---|---|
| **Catálogo** | `/catalogo` | Tabla de candidatos de un área (Datos o MarTech) con su puntuación total, la nota por dimensión (opcional) y el coste mensual del escenario elegido. Filtra por categoría, tipo, licencia y despliegue, con perfiles de filtros que se guardan con nombre. Incluye el [mapa de calor](#mapa-de-calor-del-catálogo) (puntuación × coste), la edición de pesos de criterios y dimensiones, los requisitos eliminatorios y la ficha de cada candidato con radar, notas con su significado y calculadora de coste. |
| **Listado** | `/listado` | Ranking simple de los candidatos de un área o categoría, ordenable y paginado (25 o 50), con filtros y pesos plegables. Es la vista más rápida para ver quién lidera con la configuración actual. |
| **Comparador** | `/comparador` | Compara hasta 4 candidatos de una misma categoría criterio a criterio, con gráficos (radar y barras) y el criterio de comparación a elegir. Permite ajustar los pesos y restablecerlos. |
| **Resumen ejecutivo** | `/resumen` | Genera un documento Markdown con los mejores candidatos por perfil de necesidad (que define el usuario) y el líder de cada categoría; se descarga o se copia. Ver [Resumen de resultados](#resumen-de-resultados). |
| **Estado del arte** | `/estado-del-arte` | Muestra, en pestañas por área, el documento de estado del arte (`docs/`) como contexto del estudio. Solo lectura. |

La configuración (pesos, obligatorios, escenario de coste, tratamiento de criterios sin puntuación) es **común** a todas las páginas: lo que se cambia en una se refleja en las demás.

## Exportar e importar la configuración

El engranaje de la cabecera de cada página (Catálogo, Comparador y Listado) abre el modal «Importar / exportar configuración», con **Exportar JSON**, **Exportar CSV** e **Importar**. Solo se exportan los valores que el usuario puede cambiar y que valen en más de una página: peso y obligatoriedad de cada criterio, peso de cada dimensión, tratamiento de los criterios sin puntuación, despliegue obligatorio y escenario de coste, más los perfiles del catálogo y, solo en el JSON, los perfiles y parámetros del Resumen ejecutivo. Los filtros de una sola página, la selección del comparador y los importes de coste fijados a mano no se incluyen.

- **JSON:** `{ version, settings, attributes, dimensions, profiles, summary? }`. `summary` (opcional) lleva los perfiles del Resumen ejecutivo por área (nombre, texto, pesos de dimensión y despliegues) y sus parámetros (`topN`, `includeCategories`). Solo existe en el JSON.
- **CSV:** cabecera `tipo,id,campo,valor` y una fila por valor (`attribute,DP-ARQ-01,weight,3`; las listas van separadas por `|`).
- **Importar:** el formato se elige por la extensión. Antes de aplicar nada se comprueba que todos los ids de criterios y dimensiones existan; si no (por ejemplo, un fichero exportado con una versión anterior de la rúbrica) aparece un aviso con el error y no se cambia nada.

### Estado en la URL

La URL lleva el estado de la aplicación, pero **solo lo que el usuario ha modificado** respecto a los valores por defecto: sin cambios, la URL no tiene parámetros. Se puede copiar para compartir una vista (con los mismos pesos, escenario y filtros) y al recargar la página no se pierde. Cada cambio sustituye la URL en lugar de añadir una entrada al historial, así que el botón Atrás no recorre los ajustes.

**Configuración** (en todas las páginas; los enlaces del menú la conservan):

| Parámetro | Contenido | Ejemplo |
|---|---|---|
| `w` | Pesos de criterios cambiados | `w=DP-ARQ-01.1,MK-REC-01.2` |
| `ob` | Criterios que pasan a ser obligatorios | `ob=DP-LIC-01` |
| `on` | Criterios obligatorios de la rúbrica que dejan de serlo | `on=DP-ARQ-02` |
| `dw` | Pesos de dimensión cambiados | `dw=DP-COS.20` |
| `sp` | Tratamiento de los criterios sin puntuación (`zero` o `mean`; el valor por defecto es excluirlos) | `sp=mean` |
| `dep` | Despliegues obligatorios | `dep=self-hosted,docker` |
| `esc` | Escenario de coste (`S` o `L`; el `M` es el de partida) | `esc=L` |

**Filtros de cada página:**

| Página | Parámetros |
|---|---|
| Catálogo | `area`, `cat`, `tipo`, `lic`, `desp`, `perfil`, `dim=1` (mostrar dimensiones), `oh=1` (ocultar el mapa de calor) |
| Listado | `area`, `cat` |
| Comparador | `area`, `cat`, `cand` (ids de los candidatos comparados), `crit` (criterio de comparación) |

**Si algún valor no aplica** (un criterio, categoría, despliegue o escenario que no existe, un formato roto o una configuración de otra versión de la rúbrica), **no se aplica nada**: la página se carga sin filtros ni cambios y la URL se limpia. No se aplican parámetros a medias.

**Qué no va en la URL:** los costes fijados a mano y los supuestos editados en las calculadoras, los perfiles del Catálogo y del Resumen ejecutivo y la ordenación y paginación del Listado. Para conservarlos o compartirlos se usa la exportación e importación en JSON o CSV (los perfiles del Catálogo van en ella y los del Resumen ejecutivo solo en el JSON; los costes editados, no).

#### Por qué no todo el estado y por qué sí la configuración

El estado de la aplicación es **amplio y no es estable**: incluye texto libre (nombres y descripciones de perfiles), listas que crecen (perfiles, candidatos comparados), datos que no existen en la rúbrica (costes escritos a mano) y ids que cambian cuando se edita la rúbrica, de modo que una URL antigua puede dejar de ser válida. Meterlo todo en la URL obligaría a versionarla y a mantener la sincronización de cada pieza. La configuración de pesos, en cambio, sí es pequeña y estable, como muestran estas cifras (rúbrica actual: 57 criterios con peso y 23 dimensiones, medido en el **peor caso**, con todos los valores cambiados):

| Forma | Tamaño |
|---|---|
| JSON compacto, con ids explícitos | 2.823 caracteres |
| El mismo JSON, comprimido (deflate + base64url) | 671 |
| Texto `id.valor` (el formato de la URL) | 938 |
| Texto `id.valor`, comprimido | 383 |
| Un cambio habitual (5 criterios) | 59 |
| 12 perfiles del resumen en JSON | 1.429; comprimidos, 171 |

Una URL de menos de unos 2.000 caracteres es segura en cualquier navegador, servidor, chat o correo. Como solo se escribe lo modificado, un uso normal queda en decenas de caracteres y el peor caso (todo cambiado) en unos 940 sin comprimir, así que **no hace falta compresión** y la URL sigue siendo legible. Por eso la versión anterior de esta decisión («la configuración sería excesiva para una URL») no se sostenía para los pesos; lo que sí justifica dejar fuera el resto del estado es que es amplio y no estable.

Se llevó a la URL, y no a `localStorage`, porque además de sobrevivir a la recarga permite compartir una vista con un enlace.

## Resumen de resultados

La página **Resumen ejecutivo** genera y exporta en Markdown (`resumen.md`) un documento con las tablas de resultados: los mejores candidatos de cada **perfil de necesidad** y el líder de cada categoría, con la misma puntuación que muestra la aplicación (`services/summary.service.ts`). El usuario registra los parámetros:

- **Perfiles de necesidad** por área (Datos y Martech): nombre, texto de «qué prioriza» (si se deja vacío se genera a partir de los pesos), despliegue obligatorio (al menos uno de los elegidos) y peso de cada dimensión (vacío: el de la configuración). No hay perfiles predefinidos: se parte de cero y el usuario los añade, edita y elimina. Así nada queda fijado a ids de dimensión concretos que puedan cambiar al editar las rúbricas; las dimensiones que se ofrecen en cada perfil salen siempre de los JSON generados. Sin perfiles, el documento solo incluye el líder por categoría.
- **Del documento:** escenario de coste, cuántos candidatos se muestran por perfil y categoría, y si se incluye el líder por categoría.

Cada perfil se calcula sin tocar la configuración global (`ScoringService.ranking` acepta `RankingOptions`: escenario, pesos de dimensión y despliegues propios). Los pesos y la obligatoriedad de los criterios, el tratamiento de los criterios sin puntuación y los pesos de dimensión que un perfil no cambie son los de la configuración actual. El documento se descarga o se copia al portapapeles. Los perfiles viven en memoria, como el resto de cambios del usuario: se pierden al recargar salvo que se exporten: van en el **JSON** de «Exportar configuración» (campo `summary`) y no en el CSV; el modal lo avisa. Al importar un fichero sin `summary` (CSV o JSON antiguo) los perfiles actuales no se tocan, y los pesos que apunten a dimensiones que ya no existen en las rúbricas se descartan con un aviso.

## Mapa de calor del Catálogo

Cada fila se colorea entera (el interruptor «Ocultar mapa de calor», desactivado por defecto y junto a «Mostrar las dimensiones», quita los colores y la leyenda) según una coordenada de una matriz de **nota × coste**: el quintil de su nota y el quintil de su coste mensual entre **todos los candidatos del dominio**, no entre las filas visibles. Los filtros no cambian los colores; sí los cambian los pesos, el escenario y los requisitos eliminatorios, porque alteran las notas y los costes (`services/heatmap.service.ts`). El tono sale de la media de las dos franjas (del verde, peor, al rojo, mejor; nota alta y coste bajo es lo mejor), así que la diagonal comparte color. La leyenda bajo la tabla es la matriz de 5×5 con los percentiles de cada eje. Las filas sin coste no se colorean. Para invertir el sentido basta cambiar `matrixColor`.
