# Revisión de código del front (Angular)

Revisión de `app/awsome-app` (Angular 22, ~3.500 líneas sin contar tests) hecha el 2026-10-02 sobre la rama `scripts-robustos`. **No se ha modificado ningún fichero del código**: este documento solo recoge hallazgos y cambios propuestos, ordenados por prioridad.

## 1. Resumen

El código está en buen estado: componentes standalone con señales, rutas con carga diferida, gráficos con `@defer`, un evaluador de fórmulas sin `eval`, HTML de los `.md` pasado por el sanitizador de Angular y `npm audit` sin vulnerabilidades. Compila sin errores con `strict`, `strictTemplates`, `noUnusedLocals` y `noUnusedParameters` activados (comprobado con una configuración temporal ya eliminada), y los 39 tests pasan.

Los puntos débiles están en tres zonas: **accesibilidad por teclado** (filas de tabla clicables), **robustez de la importación de configuración** (el CSV podía alterar `Object.prototype` (corregido)) y **arquitectura del estado** (datos mutables fuera de señales, estado de página que se pierde al navegar).

| Prioridad | Nº | Criterio |
|---|---|---|
| Alta | 2 | Fallo real, comprobado, o barrera de uso; arreglo barato |
| Media | 9 | Deuda técnica o carencia funcional con impacto visible a medio plazo |
| Baja | 19 | Limpieza, consistencia y pulido |

Esfuerzo estimado: **S** (< 1 h), **M** (media jornada), **L** (más de una jornada).

---

## 2. Prioridad alta

### A1. Las filas de Catálogo y Listado solo se pueden abrir con el ratón

- **Dónde:** [catalogo.html:145](../app/awsome-app/src/app/pages/catalogo/catalogo.html#L145), [listado.html:79](../app/awsome-app/src/app/pages/listado/listado.html#L79) (`<tr mat-row ... (click)="selected.set(row)">`).
- **Problema:** la fila no tiene `tabindex`, `role` ni manejador de teclado. Quien navega con teclado o lector de pantalla no puede abrir la ficha de ningún candidato, que es la acción principal de las dos páginas.
- **Cambio propuesto:** convertir el nombre del candidato en un enlace o botón (`<button class="link" (click)=...>`) dentro de la celda, y dejar el clic de fila como atajo opcional con `$event.target.closest('button, a')` para no duplicar. Alternativa mínima: `tabindex="0"`, `role="button"` y `(keydown.enter)`/`(keydown.space)` en la fila.
- **Esfuerzo:** S.

### A2. La importación de CSV puede contaminar `Object.prototype` — ✅ resuelto

- **Dónde:** `parseCsv` en [config-transfer.service.ts](../app/awsome-app/src/app/services/config-transfer.service.ts) (`s.attributes[id] ??= { ... }`, y las asignaciones análogas con `s.dimensions[id]`).
- **Problema (reverificado el 2026-10-02):** con una fila `attribute,__proto__,weight,7`, `s.attributes['__proto__']` ya existe (es `Object.prototype`), así que `??=` no crea el objeto y `a.weight = 7` escribe en el prototipo global: tras importar, `({}).weight === 7` en toda la página. `validate` corre después del análisis y no veía el id (no es una clave propia), así que `apply` no lo rechazaba. El riesgo de explotación es bajo (el fichero lo elige el propio usuario), pero un CSV malformado dejaba la aplicación en un estado raro hasta recargar.
- **Corrección:** `parseCsv` crea `attributes` y `dimensions` con `Object.create(null)`, de modo que `__proto__` o `constructor` son claves normales y `validate` los rechaza como identificadores desconocidos, sin aplicar nada. La importación de JSON no se veía afectada (`Object.fromEntries` define claves propias).
- **Test:** «un CSV con __proto__ no contamina Object.prototype y se rechaza como id desconocido» en `config-transfer.service.spec.ts` (falla sin la corrección).
- **Esfuerzo:** S.

---

## 3. Prioridad media

### M1. Activar en `tsconfig` los modos estrictos que el código ya cumple — ✅ resuelto

- **Dónde:** [tsconfig.json](../app/awsome-app/tsconfig.json) no tiene `strict`, y `angularCompilerOptions` no tiene `strictTemplates`.
- **Problema:** hoy el código pasa con todos ellos activados, pero nada impide que un cambio futuro los incumpla. Sin `strictTemplates`, las plantillas se comprueban con tipos laxos (p. ej. `let s` es `any` en las tablas de la ficha).
- **Cambio propuesto:** añadir `"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true` y `"strictTemplates": true`. Coste de código: cero.
- **Esfuerzo:** S.

### M2. Estado de la página y de la ficha fuera de la URL

- **Dónde:** `selected` en [catalogo.ts](../app/awsome-app/src/app/pages/catalogo/catalogo.ts) y [listado.ts](../app/awsome-app/src/app/pages/listado/listado.ts); área, categoría, filtros y candidatos comparados en los tres componentes de página.
- **Problema:** la ficha de un candidato no tiene URL, así que el botón Atrás del navegador sale de la página en vez de volver al listado, no se puede enlazar a una ficha y al cambiar de página se pierden los filtros y la comparación. (Se decidió no llevar *toda* la configuración a la URL; esto es solo el estado de navegación.)
- **Cambio propuesto:** una ruta hija `catalogo/:id` para la ficha, y un servicio pequeño (o parámetros de consulta) que conserve área, categoría y candidatos comparados entre páginas.
- **Esfuerzo:** M.

### M3. `DataService` guarda el estado en campos mutables y usa `version` como parche — ✅ resuelto

- **Dónde:** [data.service.ts](../app/awsome-app/src/app/services/data.service.ts) (`data`, `allCandidates`, `attributesById`... son campos planos) y [`version`](../app/awsome-app/src/app/services/data.service.ts) (señal que se incrementa a mano en `updateDimensions`/`updateAttributes`).
- **Problema:** las lecturas (`candidates()`, `attributes()`, `dimensions()`) no son reactivas por sí mismas; quien quiera reaccionar debe acordarse de leer `version()` primero (como hace `ScoringService.ranking`). [`ScoringService.score()`](../app/awsome-app/src/app/services/scoring.service.ts#L127) no lo hace. Además la carga se lanza en el constructor (`this.load().subscribe()`, línea 91) y la señal `loaded` es el único aviso de que los datos ya están.
- **Cambio propuesto:** guardar dimensiones, atributos y candidatos en señales (o un único `signal` de estado) y exponer `computed`; eliminar `version`. Cargar con `rxResource` o con el inicializador de la aplicación, como ya se hace con `config.json`.
- **Esfuerzo:** M.

### M4. Catálogo y Listado duplican casi toda su lógica — ✅ resuelto (tabla común y helpers de área; queda abierta la decisión de si Listado sigue haciendo falta)

- **Dónde:** [catalogo.ts](../app/awsome-app/src/app/pages/catalogo/catalogo.ts) y [listado.ts](../app/awsome-app/src/app/pages/listado/listado.ts): mismas columnas, `selected`, `crumbs`, selección de área y categoría, tabla con las mismas celdas. La conversión `area === 'datos' ? Domain.data : Domain.martech` se repite en al menos seis sitios (`catalogo`, `listado`, `comparador`, `candidate-card`, `cost-calculator`, `ScoringService.area()`, `CostService.areaOf()`).
- **Cambio propuesto:** extraer un componente `app-candidate-table` (columnas y celdas) y un par de funciones `areaOf(domain)` / `domainOf(area)` en un único sitio (por ejemplo `model/domain-model.ts`). Decidir también si Listado sigue haciendo falta, ya que el Catálogo cubre su función.
- **Esfuerzo:** M.

### M5. La configuración exportada no incluye los costes editados y el tipo de cambio no se puede editar

- **Dónde:** [config-transfer.service.ts](../app/awsome-app/src/app/services/config-transfer.service.ts) (`ConfigSnapshot`), [cost.service.ts](../app/awsome-app/src/app/services/cost.service.ts) (`manual`, `overrides`, `usdPerEur`).
- **Problema:** el JSON/CSV exportado no recoge los costes fijados a mano, los supuestos de escenario y de modelo editados ni el tipo de cambio; se pierden al recargar y no se pueden compartir. Además `setUsdPerEur` existe pero ninguna plantilla lo usa: `docs/costes/metodologia.md` §8.1 describe el tipo de cambio como «editable» y la interfaz no lo permite.
- **Cambio propuesto:** ampliar `ConfigSnapshot` (versión 2, manteniendo la lectura de la 1) con `costs: { manual, overrides, usdPerEur }`, y añadir un campo de tipo de cambio en la cabecera del selector de escenario o en el modal de configuración. O, si no se quiere, corregir la documentación.
- **Esfuerzo:** M.

### M6. Un fallo de carga deja la aplicación vacía con solo un aviso temporal

- **Dónde:** [data.service.ts:94-161](../app/awsome-app/src/app/services/data.service.ts#L94), [layout.html:20-26](../app/awsome-app/src/app/layout/layout.html#L20).
- **Problema:** si falla `candidatos.json` o `rubrica.json`, `loaded` pasa a `true` igualmente y las páginas muestran tablas vacías; el único aviso es un `snackBar` de 8 segundos que el usuario puede perderse.
- **Cambio propuesto:** una señal `loadError` en `DataService` y, en el `Layout`, un bloque de error persistente con botón «Reintentar» en lugar del `router-outlet` cuando falten los datos esenciales.
- **Esfuerzo:** S.

### M7. Sin tests de las páginas y de los diálogos

- **Dónde:** `src/app/**/*.spec.ts`: hay tests de los servicios y de `comparador`, `layout` y `comparison-charts`, pero ninguno de `catalogo`, `listado`, `candidate-card`, `cost-calculator`, `cost-total-editor`, `import-config-modal`, `estado-del-arte` ni los diálogos.
- **Problema:** los filtros del catálogo, los perfiles, la importación/exportación y las calculadoras de coste solo se prueban a mano. El test de `comparador` usa `as any` y simulacros completos de servicios, lo que oculta cambios de contrato.
- **Cambio propuesto:** tests de componente con `TestBed` y datos reales mínimos para `catalogo` (filtros, perfiles, restablecer), `import-config-modal` (con un fichero válido, uno inválido y el CSV de A2) y `cost-total-editor` (conversión EUR↔USD). Un par de pruebas de accesibilidad con `axe` en las páginas principales.
- **Esfuerzo:** M.

### M8. Los campos de coste se desincronizan si el valor escrito no es válido — ✅ resuelto

- **Dónde:** [cost-calculator.html](../app/awsome-app/src/app/pages/common/cost-calculator/cost-calculator.html), [cost-total-editor.html](../app/awsome-app/src/app/pages/common/cost-total-editor/cost-total-editor.html) (`[value]="..." (change)="..."`).
- **Problema:** el valor es un enlace de una sola dirección. Si el usuario escribe un número negativo o texto, el servicio lo ignora, pero el campo conserva lo escrito y muestra un valor que no es el que se está usando. Lo mismo pasa tras «restablecer» si el valor mostrado coincide con el anterior.
- **Cambio propuesto:** usar `FormControl` por parámetro (como en el formulario de pesos) con validadores `min(0)` y mensaje de error, o devolver el valor aplicado al campo después del `change`.
- **Corrección (vigente, reverificada en el navegador):** nuevo componente `app-cost-input` con un `FormControl` y `Validators.min(0)`; los tres editores de coste (supuestos del escenario, precios del candidato y totales a mano) lo usan. Un valor no válido muestra «Debe ser un número mayor o igual que 0» y no se aplica; tras confirmar, el campo vuelve a mostrar el valor en uso (también si coincide con el anterior o tras restablecer). Se bloquean las teclas `-`, `+`, `e` y `E`. **No se limitó a enteros:** 39 de los 142 parámetros de los modelos (p. ej. `fte` 0,3 o `precio_tib` 6,25) y un supuesto de escenario (0,05 TB/día) llevan decimales, y los totales se escriben en euros con céntimos.
- **Esfuerzo:** S-M.

### M9. El formulario de pesos del comparador puede recrearse mientras se edita — ✅ resuelto

- **Dónde:** [comparador.ts:81](../app/awsome-app/src/app/pages/comparador/comparador.ts#L81) (`weightsForm = computed(() => this.scoring.weightsForm(...))`) y [scoring.service.ts:291](../app/awsome-app/src/app/services/scoring.service.ts#L291) (`this._missingScore()` leído dentro de `weightsForm`).
- **Problema:** `weightsForm()` lee la señal `_missingScore` dentro del `computed`. Cuando el usuario cambia «Criterio sin puntuación», `applyForm` actualiza esa señal, el `computed` se invalida y se construye un `FormGroup` nuevo mientras el usuario sigue interactuando con el anterior (se pierde el foco y el estado `dirty`). No lo he reproducido en el navegador; sale del análisis del código.
- **Cambio propuesto:** leer el valor inicial con `untracked(() => this._missingScore())` dentro de `weightsForm`, de modo que el `computed` solo dependa de `formsEpoch` y del dominio.
- **Corrección:** `weightsForm` lee `formsEpoch` y construye todo el formulario dentro de `untracked`. Era algo peor de lo descrito: tras M3 los atributos son reactivos, así que cada cambio de peso o de obligatoriedad también recreaba el formulario. Test `scoring.weights-form.spec.ts` (falla sin la corrección).
- **Esfuerzo:** S.

---

## 4. Prioridad baja

### Accesibilidad

| Nº | Dónde | Problema | Cambio |
|---|---|---|---|
| B1 | [breadcrumbs.ts:12](../app/awsome-app/src/app/pages/common/breadcrumbs/breadcrumbs.ts#L12) | `<a href="#">` con `preventDefault`: es un botón disfrazado de enlace | Usar `<button type="button">` con estilo de enlace |
| B2 | [layout.html:22](../app/awsome-app/src/app/layout/layout.html#L22) | `<mat-spinner />` sin texto accesible | `aria-label="Cargando datos"` y `role="status"` en el contenedor |
| B3 | [weights-form.html](../app/awsome-app/src/app/pages/common/weights-form/weights-form.html) | El `mat-slider` no está asociado al nombre del criterio | `aria-label` en el `input matSliderThumb` con el nombre del criterio |
| B4 | [layout.html](../app/awsome-app/src/app/layout/layout.html) / [layout.scss](../app/awsome-app/src/app/layout/layout.scss) | El menú móvil no mueve el foco al abrirse ni lo devuelve; el contenido no se marca `inert` | Gestionar el foco y poner `inert` en `main` con el menú abierto |
| B5 | [layout.ts](../app/awsome-app/src/app/layout/layout.ts) | Todas las páginas comparten el título de pestaña | Poner `title` en cada ruta de `app.routes.ts` |

### Código y consistencia

| Nº | Dónde | Problema | Cambio |
|---|---|---|---|
| B6 | [candidatos-model.ts:11](../app/awsome-app/src/app/model/candidatos-model.ts#L11) | `lastRevisionDater` (errata) en el modelo y en tres ficheros | Renombrar a `lastRevisionDate` |
| B7 | [config-transfer.service.ts](../app/awsome-app/src/app/services/config-transfer.service.ts) | Seis `any` en la lectura de JSON y CSV | Tipar con una interfaz de entrada (`unknown` + comprobaciones) |
| B8 | [scoring.service.ts:127](../app/awsome-app/src/app/services/scoring.service.ts#L127) | `score(candidateId)` no la usa ninguna página ni componente | Eliminarla o usarla |
| B9 | [scoring.service.ts:96](../app/awsome-app/src/app/services/scoring.service.ts#L96) | Un comentario JSDoc sobre `missingScore` está colgado encima de `_requiredDeployments` | Moverlo a `_missingScore` |
| B10 | [candidatos-model.ts](../app/awsome-app/src/app/model/candidatos-model.ts) | `Candidate.weight` no se usa en ningún sitio | Eliminar el campo |
| B11 | [scoring.service.ts:49](../app/awsome-app/src/app/services/scoring.service.ts#L49) | `licenseFamily` usa expresiones sin delimitar (`bsl`, `mpl`, `gpl`): una licencia con «simple» o «bsl» dentro de otra palabra se clasificaría mal | Delimitar con `\b` y probar con las licencias reales del catálogo |
| B12 | [deployment-select.ts](../app/awsome-app/src/app/pages/common/deployment-select/deployment-select.ts) | Las opciones salen de los candidatos de las dos áreas, incluso en una página que muestra una sola | Filtrar por el área activa |
| B13 | [index.html:5](../app/awsome-app/src/index.html#L5), [app-config.service.ts:5](../app/awsome-app/src/app/services/app-config.service.ts#L5) | «AwsomeApp» y «Awsome App» (¿«Awesome»?) y año fijo en el pie (`© 2026`) | Unificar el nombre y generar el año |

### Interfaz y herramientas

| Nº | Dónde | Problema | Cambio |
|---|---|---|---|
| B14 | [layout.scss:6](../app/awsome-app/src/app/layout/layout.scss#L6) | `font-family: system-ui` en `:host` anula la Roboto del tema Material para todo el contenido | Quitarlo y heredar de `body` |
| B15 | [layout.scss](../app/awsome-app/src/app/layout/layout.scss) | Colores en hexadecimal (`#1f2937`, `#e5e7eb`...) en lugar de las variables `--mat-sys-*`; `color-scheme: light` fijo | Pasar a variables del tema; valorar modo oscuro |
| B16 | [import-config-modal.ts:27](../app/awsome-app/src/app/pages/common/config-menu/import-config-modal/import-config-modal.ts#L27) | `URL.revokeObjectURL` inmediatamente después de `click()`: algunos navegadores cancelan la descarga | Revocar con `setTimeout` |
| B17 | `package.json` | Hay `prettier` pero no `lint`/`format`, y no hay ESLint | Añadir `ng lint` (`angular-eslint`) y un script `format` |
| B18 | [angular.json](../app/awsome-app/angular.json) | El presupuesto inicial se avisa a 540 kB y el bundle inicial pesa ~521 kB | Revisar qué entra en el inicial antes de añadir librerías (Angular Material domina) |
| B19 | `.top`, `.actions`, `.filters` | Estilos repetidos en los `.scss` de cada página | Moverlos a `styles.scss` o a una clase compartida |

### Rendimiento (solo a vigilar)

El coste de un candidato (`CostService.monthly`) se recalcula, con análisis de la fórmula incluido, cada vez que se llama: en el ranking (varias veces por candidato, por el mínimo del grupo, la nota de coste y el chequeo de obligatorios) y en cada celda de coste de las tablas. Con 45 candidatos no se nota; si el catálogo crece o se añaden más escenarios conviene memoizar `monthly`/`calculate` en un `computed` por candidato y escenario, y cachear los *tokens* de cada fórmula en `expression.ts`.

---

## 5. Orden de trabajo sugerido

1. **A1, A2, M1, M9** (cada uno de unos minutos a 1 h): accesibilidad de las filas, fortificar la importación, activar los modos estrictos y quitar la recreación del formulario.
2. **M6, M8** (S): error de carga visible y campos de coste coherentes.
3. **M3, M4, M2** (M): señales en `DataService`, componente de tabla común y rutas con estado. Conviene hacerlas en este orden, porque la segunda simplifica la tercera.
4. **M5, M7** (M): ampliar la configuración exportada y cubrir con tests lo anterior.
5. **Baja:** agrupar B1-B5 como una pasada de accesibilidad, B6-B13 como limpieza, y el resto cuando se toque cada zona.

## 6. Qué se ha comprobado y qué no

- **Comprobado:** compilación estricta (`ngc` con `strict`, `strictTemplates`, `noUnusedLocals`, `noUnusedParameters`), `npm audit` de producción, la contaminación del prototipo de A2 con una simulación mínima del fragmento de código, y la lectura completa de servicios, páginas, plantillas, estilos de layout y configuración.
- **No comprobado:** comportamiento en navegador (M8, M9, B4 y B16 salen de la lectura del código), rendimiento medido, lectores de pantalla reales, ni los `.scss` de componentes salvo el layout.
- **Fuera del alcance:** los scripts de Python que generan los JSON, los `.md` de `docs/` y el contenido de los datos.
