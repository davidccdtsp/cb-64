# 01. Metodología

## 1. Objetivo

Este documento fija las reglas de diseño de la rúbrica de evaluación: qué es una dimensión, qué es un criterio, cómo se puntúa, cómo se pondera, cómo se trata la falta de información y cómo se convierte todo ello en una puntuación 0-100 por candidato. No contiene las notas de ningún candidato concreto (eso vive en `candidatos/`) ni el catálogo de criterios en detalle (eso vive en `rubricas/`).

## 2. Principios de diseño

1. **Nada sin fuente.** Ninguna nota puntuable se asigna "a ojo". Si no hay una fuente pública verificable, el criterio se marca `N/D` (ver §7). Las reglas completas de fuentes están en la sección 6 del encargo (`extra/tarea.md`) y se resumen en §10.
2. **Comparabilidad ante todo.** Los criterios deben poder aplicarse igual a un candidato cloud propietario, a uno open source autogestionado y a uno híbrido. Cuando un criterio no aplica a un candidato (p. ej. "esfuerzo operativo self-managed" para un SaaS puro sin opción self-hosted), se marca como no aplicable y se excluye del denominador de la fórmula, no como `N/D`.
3. **Cada nota debe ser reproducible.** Dos evaluadores distintos, con la misma fuente delante, deben poder llegar a la misma nota. Por eso cada criterio puntuable define qué distingue cada nivel de la escala, no solo los extremos.
4. **La rúbrica es un punto de partida, no un techo.** Los pesos por defecto reflejan un perfil "generalista" razonable, pero se espera que la aplicación permita cambiarlos por perfil de necesidad. Añadir, quitar o redefinir un criterio no debe requerir tocar código, solo el `.md` correspondiente en `rubricas/`.
5. **Separación entre hecho y opinión.** Las fichas de candidato documentan hechos verificables. Cuando el consultor añade una valoración propia no derivada directamente de una fuente (p. ej. una lectura de tendencia), se marca explícitamente como tal y se mantiene separada del resto del texto.

## 3. Estructura: Dimensión → Criterio

Una **dimensión** agrupa criterios afines (p. ej. "Gobierno y seguridad"). No se puntúa directamente: su nota es la agregación ponderada de sus criterios, calculada por la misma fórmula que la puntuación global pero restringida a esa dimensión (ver §9), y sirve para el desglose por dimensión y el radar comparativo de la aplicación.

Un **criterio** es la unidad mínima evaluable. Cada criterio, tal y como exige la sección 4.1 del encargo, define como mínimo:

| Campo | Descripción |
|---|---|
| `id` | Identificador estable, formato `DP-<DIM>-<NN>` (p. ej. `DP-GOB-01`). Bloque A = prefijo `DP` (Datos-Plataformas). No se reutiliza ni se renumera un id retirado; se marca como `deprecated`. |
| `descripcion` | Qué mide el criterio, en una frase. |
| `pregunta` | La pregunta concreta que un evaluador debe responder para puntuarlo. |
| `tipo` | `puntuable`, `booleano` o `informativo` (ver §4). |
| `escala` | Para `puntuable`: descriptores 0-5. Para `booleano`: qué significa "Sí". Para `informativo`: el formato del dato (texto libre, lista, enlace). |
| `peso_defecto` | Entero 1-3 (1 = menor, 2 = medio, 3 = mayor). Ver §6. |
| `elimina_si` | Solo en booleanos marcados como posible requisito obligatorio: valor que, si no se cumple, excluye al candidato cuando el usuario activa ese requisito en la aplicación. |

El catálogo completo de dimensiones y criterios del Bloque A está en [`rubricas/datos.md`](rubricas/datos.md).

## 4. Tipos de criterio

- **Puntuable (0-5):** entra directamente en la fórmula de puntuación (§9).
- **Booleano (Sí/No):** se traduce internamente a 5 (Sí) o 0 (No) para el cálculo de la nota de dimensión, salvo que el usuario lo active como requisito eliminatorio (`must-have`) en la aplicación, en cuyo caso un "No" excluye al candidato del ranking en lugar de penalizar su nota. En la aplicación, además de marcar criterios como obligatorios, se puede exigir un despliegue (p. ej. `self-hosted`): el candidato debe ofrecer al menos uno de los elegidos. Un candidato excluido no tiene puntuación y se muestra como «Excluido» con los motivos.
- **Informativo:** no puntúa. Es un dato de ficha (licencia exacta, regiones disponibles, modelo de despliegue) que se muestra en el catálogo y se usa para filtrar, no para calcular la puntuación.

## 5. Escala 0-5: definición general

Todos los criterios `puntuable` comparten la misma semántica de fondo, que luego se particulariza por criterio en `rubricas/datos.md`:

| Nivel | Significado general |
|---|---|
| **0** | No soportado, o sin evidencia pública de soporte. |
| **1** | Soporte mínimo: existe pero con limitaciones graves, solo vía terceros no oficiales, o en fase experimental/beta sin garantías. |
| **2** | Soporte parcial: cubre el caso básico pero con restricciones relevantes documentadas (rendimiento, escala, funcionalidad incompleta). |
| **3** | Soporte estándar: comparable a lo que ofrece la mayoría de motores de su categoría, sin diferenciación destacable ni carencias graves. |
| **4** | Soporte avanzado: capacidad diferencial documentada frente al resto de la categoría (rendimiento, integración más profunda, menor fricción operativa). |
| **5** | Referencia del mercado: es el sistema con el que se compara el resto en ese criterio, con evidencia pública de adopción a gran escala o de resultados superiores verificables (benchmark independiente, caso de uso documentado a escala). |

Esta tabla es la base de partida; cada criterio de `rubricas/datos.md` la reescribe con el detalle concreto que distingue, por ejemplo, un 3 de un 4 en "RBAC/ABAC" o en "concurrencia y autoescalado". Ningún criterio puntuable se publica sin esa particularización.

## 6. Pesos y normalización

Cada criterio tiene un `peso_defecto` en la escala 1-3 (documentado junto al criterio). Los pesos por defecto son un punto de partida editable: la aplicación permite ajustarlos por dimensión y por criterio mediante sliders, y normaliza automáticamente para que la puntuación siga en el rango 0-100 sea cual sea la combinación de pesos elegida (ver fórmula, §9). Un peso 0 equivale a excluir el criterio del cálculo sin borrarlo de la rúbrica.

Los perfiles predefinidos (p. ej. "Coste mínimo", "Soberanía / on-prem", "Gobierno enterprise") son, técnicamente, conjuntos de pesos distintos sobre la misma rúbrica, más un conjunto de requisitos eliminatorios activados. Se definen como datos, no como código, para que se puedan editar igual que cualquier otro criterio.

## 7. Tratamiento de los N/D

Un criterio puntuable se marca `N/D` cuando no existe fuente pública suficiente para asignar una nota con confianza razonable — nunca se rellena "a ojo". La aplicación debe permitir tres tratamientos configurables por el usuario, aplicados de forma global sobre todos los `N/D` del ranking:

1. **Contar como 0** (opción más conservadora: penaliza la falta de transparencia del propio candidato).
2. **Usar la media** de las notas conocidas para ese criterio entre el resto de candidatos comparados.
3. **Excluir el criterio** del cálculo para ese candidato (se recalcula su denominador sin ese criterio; ver §9).

El tratamiento por defecto recomendado, y el que se usa en los ejemplos de este repositorio salvo que se indique lo contrario, es **excluir el criterio**: penalizar con un 0 automático castiga por igual a "no lo soporta" y a "no hay información pública", que son situaciones distintas.

## 8. Nivel de confianza

Cada nota (o `N/D` justificado) lleva asociado un nivel de confianza sobre la fuente que la respalda:

- **Alta:** documentación oficial, página de precios oficial, repositorio oficial, changelog oficial o paper.
- **Media:** benchmark o informe independiente, blog de ingeniería reconocido (del propio fabricante o de un tercero con reputación técnica), fundación (Apache, Linux Foundation).
- **Baja:** inferido, indirecto, o basado en analistas/prensa especializada sin confirmación en fuente primaria.

El nivel de confianza no altera la nota, pero se muestra en la ficha y en la aplicación junto a cada criterio, para que quien compare candidatos pueda ponderar cuánto peso dar a una nota "alta" frente a una "baja".

## 9. Fórmula de puntuación

Fórmula de referencia (idéntica a la especificada en el encargo, sección 7.2), aplicada sobre los criterios aplicables a un candidato tras los filtros eliminatorios:

```
Puntuación = 100 × Σ(peso_c × nota_c) / (5 × Σ peso_c)
```

- `nota_c` es la nota 0-5 de cada criterio aplicable (booleanos traducidos a 0/5; ver §4).
- `peso_c` es el peso vigente de ese criterio (por defecto o ajustado por el usuario).
- El sumatorio del denominador solo incluye los criterios que aplican al candidato y que no han sido excluidos por el tratamiento de `N/D` elegido (§7).
- La misma fórmula, restringida a los criterios de una dimensión, da la nota de esa dimensión (0-100) para el desglose y el radar.

### Ponderación por dimensión

La aplicación calcula la puntuación en dos niveles, de modo que el peso de cada dimensión (`peso` de la tabla `DIMENSIONES` de la rúbrica; editable en la app) interviene en el resultado:

```
nota_d     = 100 × Σ(peso_c × nota_c) / (5 × Σ peso_c)      sobre los criterios aplicables c de la dimensión d
Puntuación = Σ(W_d × nota_d) / Σ W_d                         sobre las dimensiones d con nota
```

- `W_d` es el peso de la dimensión `d`. Solo importa la proporción entre dimensiones: se normaliza solo.
- Una dimensión sin ningún criterio aplicable (todos `N/D`, `N/A`, sin peso o informativos) no tiene nota y queda fuera del numerador y del denominador. Lo mismo ocurre con una dimensión de peso 0.
- Dentro de una dimensión, los pesos de los criterios solo valen en relación con los de sus hermanos. Lo que aporta la dimensión al total lo fija `W_d`, no la suma de los pesos de sus criterios.
- Con una sola dimensión, o con pesos de dimensión proporcionales a la suma de los pesos de sus criterios y sin criterios excluidos, equivale a la fórmula plana de arriba.
- Los filtros eliminatorios (§4) y el tratamiento de los `N/D` (§7) se aplican igual que antes, a nivel de criterio.
- El criterio de coste (`DP-COS-01`) no se puntúa manualmente: su nota se calcula a partir del resultado de la calculadora de coste, según el método documentado en [`costes/metodologia.md`](costes/metodologia.md#conversión-de-coste-a-nota).

## 10. Reglas de fuentes (resumen)

Se aplican íntegramente las reglas de la sección 6 del encargo. En resumen:

- Toda afirmación factual lleva una referencia enlazada con fecha de consulta.
- Jerarquía de fuentes: (1) documentación/precios/repositorios/papers oficiales; (2) benchmarks e informes independientes, blogs de ingeniería reconocidos, fundaciones; (3) analistas y prensa especializada. Se evita marketing sin datos, foros anónimos y contenido no verificado.
- Los enlaces apuntan a la sección concreta, no a la home.
- Las fuentes reutilizables viven en [`fuentes.md`](fuentes.md) con un id estable; cada ficha de candidato las referencia por ese id en sus notas al pie.
- Los benchmarks solo se citan si ya están publicados por un tercero; no se ejecutan benchmarks propios en este proyecto.

## 11. Ciclo de vida de una nota

Cada ficha de candidato lleva un campo `fecha_revision`. Cuando se actualiza una nota (porque el producto cambió, la fuente quedó desactualizada o se encontró una fuente mejor), se actualiza esa fecha y, si aplica, el nivel de confianza. No se conserva histórico de notas anteriores en este repositorio base; si en el futuro se necesita trazabilidad de cambios de nota en el tiempo, se resolverá vía historial de Git sobre el propio `.md`, no con un campo adicional en el frontmatter.

## 12. Alcance actual de este repositorio

El repositorio cubre los dos bloques del encargo y la aplicación que los explota:

- **Estado del arte:** [`estado-del-arte/datos/`](estado-del-arte/datos/estado-del-arte.md) (evolución, formatos de tabla abiertos e interoperabilidad entre ellos, catálogos, Lakebase/HTAP, motores y tendencias) y [`estado-del-arte/martech/`](estado-del-arte/martech/estado-del-arte.md). Cada uno es un único documento, no una carpeta con un fichero por tema.
- **Aplicación:** SPA Angular en [`../app/awsome-app/`](../app/awsome-app/README.md), con Catálogo, Comparador (radar y gráfico coste/puntuación), Listado, ficha de candidato, edición de pesos por criterio y por dimensión, tratamiento de `N/D`, requisitos eliminatorios y estado del arte. Calcula la puntuación en dos niveles (§9) a partir de los JSON que generan los scripts de `scripts/`.

### 12.1 Alcance del Bloque A (Datos)

- **Rúbricas:** [`rubricas/datos.md`](rubricas/datos.md) [`rubricas/martech.md`](rubricas/martech.md).
- **Candidatos:** [`candidatos/`](candidatos/), con confianza y fuentes. [`fuentes.md`](fuentes.md).
- **Costes:** [`costes/`](costes/) y una ficha de precios por candidato.


### 12.2 Alcance del Bloque B (MarTech)

- Rúbrica: [`rubricas/martech.md`](rubricas/martech.md).
- Fichas: [`candidatos/martech/`](candidatos/martech/).
- Costes: escenarios en [`costes/escenarios-martech.md`](costes/escenarios-martech.md) y resumen con la nota `MK-COS-01` por categoría en [`costes/resumen-martech.md`](costes/resumen-martech.md).
- Pendiente: Obtención de presupuestos para las plataformas cloud sin precio público (fuera de alcance).
