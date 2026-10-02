# Estudio comparativo de plataformas analíticas 

Estudio comparativo de plataformas analíticas de datos y MarTech: documentación, rúbricas de evaluación, fichas de candidatos y costes en `docs/`, y una aplicación web que calcula y compara puntuaciones a partir de ellos en `app/awsome-app/`.

## Índice

- **Este README**
  - [Estructura](#estructura)
  - [Versiones](#versiones)
  - [Arranque rápido](#arranque-rápido)
  - [Resumen de resultados exportable](#resumen-de-resultados-exportable)
  - [Documentación técnica](#documentación-técnica)
- **[Scripts](scripts/README.md)** (validación y generación de datos)
  - [Requisitos](scripts/README.md#requisitos)
  - [Contenido](scripts/README.md#contenido)
  - [Arrancar, compilar y regenerar](scripts/README.md#arrancar-compilar-y-regenerar)
  - [Validación de los .md](scripts/README.md#validación-de-los-md)
    - [Por qué parsear primero y validar después](scripts/README.md#por-qué-parsear-primero-y-validar-después)
  - [Generación de JSON para la app](scripts/README.md#generación-de-json-para-la-app)
    - [Rúbricas](scripts/README.md#rúbricas)
    - [Candidatos](scripts/README.md#candidatos)
    - [Escenarios de coste](scripts/README.md#escenarios-de-coste)
    - [Costes](scripts/README.md#costes)
    - [Contrato de los generadores](scripts/README.md#contrato-de-los-generadores)
  - [Cómo añadir un candidato](scripts/README.md#cómo-añadir-un-candidato)
    - [Ejemplo de candidato básico](scripts/README.md#ejemplo-de-candidato-básico)
  - [Cómo añadir o cambiar un criterio](scripts/README.md#cómo-añadir-o-cambiar-un-criterio)
    - [Ejemplo de criterio básico](scripts/README.md#ejemplo-de-criterio-básico)
- **[Front](app/awsome-app/README.md)** (aplicación Angular)
  - [Por qué Angular](app/awsome-app/README.md#por-qué-angular)
  - [Versiones](app/awsome-app/README.md#versiones)
  - [Desarrollo de la app](app/awsome-app/README.md#desarrollo-de-la-app)
  - [Datos que lee la app](app/awsome-app/README.md#datos-que-lee-la-app)
  - [Configuración de la app](app/awsome-app/README.md#configuración-de-la-app)
    - [`config.json`](app/awsome-app/README.md#configjson)
  - [Abrir la app sin Angular CLI](app/awsome-app/README.md#abrir-la-app-sin-angular-cli)
  - [Páginas de la aplicación](app/awsome-app/README.md#páginas-de-la-aplicación)
  - [Exportar e importar la configuración](app/awsome-app/README.md#exportar-e-importar-la-configuración)
    - [Estado en la URL](app/awsome-app/README.md#estado-en-la-url)
  - [Resumen de resultados](app/awsome-app/README.md#resumen-de-resultados)
  - [Mapa de calor del Catálogo](app/awsome-app/README.md#mapa-de-calor-del-catálogo)

## Estructura

| Ruta | Contenido |
|---|---|
| [`docs/`](docs/) | Fuente de verdad en Markdown: metodología (`01-metodologia.md`), rúbricas, estado del arte, fichas de candidatos, costes y fuentes. |
| [`scripts/`](scripts/README.md) | Validación de las fichas y generación de los JSON que lee la app. |
| [`app/awsome-app/`](app/awsome-app/README.md) | Aplicación Angular. |
| [`docs/pendientes-requisitos.md`](docs/pendientes-requisitos.md) | Estado de los requisitos del encargo. |

## Versiones

| Herramienta | Versión | Notas |
|---|---|---|
| Node.js | 24.21.0 (`.nvmrc`); mínimo 22.22 | Para compilar y arrancar la app. |
| npm | 11.19 | Viene con Node 24. |
| Angular | 22.2 | `@angular/*` 22.2; Angular Material y CDK 22.2. |
| TypeScript | 6.0 | |
| Python | 3.10 o superior (probado con 3.10.12) | Para los scripts de `scripts/`. |
| PyYAML | 5.4.1 (probado) | `pip install pyyaml`. |

## Arranque rápido

**Con los scripts.** Son ejecutables `.sh` (shell POSIX) y **solo funcionan en sistemas Unix/Linux**; en otros sistemas usa el arranque con Docker de más abajo.

```bash
scripts/arrancar.sh                 # valida, genera los JSON y arranca la web en http://localhost:4200
scripts/arrancar.sh --sin-links     # sin comprobar los enlaces de docs/fuentes.md (~2 min menos)
scripts/arrancar.sh --sin-validacion # sin validar: solo regenera los JSON y arranca
scripts/arrancar.sh --estricto      # los avisos (p. ej. enlaces no comprobables) también detienen el arranque

scripts/compilar.sh                 # lo mismo (mismas opciones) pero compila para producción en app/awsome-app/dist/
```

Necesitan Python 3 con PyYAML y Node >= 22.22 (versiones concretas más arriba).

**Alternativa con Docker.**

```bash
docker compose -f docker-compose.local.yml up --build   # web en http://localhost:8080
```

La imagen (`Dockerfile.local`) valida los `.md` sin comprobar enlaces, genera los JSON, compila la app y la sirve con nginx, con todas las rutas redirigidas a `index.html` como haría un servidor real. Cada cambio en `docs/`, `scripts/` o `app/` exige volver a ejecutar el comando con `--build`. Sirve también para probar la compilación de producción sin tocar el entorno local.

## Resumen de resultados exportable

La aplicación incluye una página **Resumen ejecutivo** que genera, a partir de las puntuaciones que calcula en ese momento, un documento Markdown con los mejores candidatos de cada **perfil de necesidad** (coste mínimo, soberanía, gobierno…) y el líder de cada categoría. El usuario define los perfiles y los parámetros (escenario de coste, nº de candidatos, perfiles por área) y lo exporta con «Exportar Markdown» (`resumen.md`) o lo copia al portapapeles. Es la forma de obtener tablas como las de [`docs/00-resumen-ejecutivo.md`](docs/00-resumen-ejecutivo.md) siempre al día con los datos. Detalles en el [README del front](app/awsome-app/README.md#resumen-de-resultados).

## Documentación técnica

- **[Scripts](scripts/README.md):** validación de los `.md`, generación de los JSON (rúbricas, candidatos, escenarios y costes), opciones de `arrancar.sh` y `compilar.sh` y cómo añadir un candidato o un criterio.
- **[Front](app/awsome-app/README.md):** por qué Angular, desarrollo y compilación, configuración (`config.json`), exportar e importar la configuración (con los perfiles del Resumen ejecutivo solo en JSON), mapa de calor del Catálogo y cómo abrir la app sin Angular CLI.
