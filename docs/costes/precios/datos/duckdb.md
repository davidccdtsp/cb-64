---
candidato: duckdb
fecha_revision: 2026-09-29
region_referencia: "No aplica — motor embebido, sin infraestructura de servidor propia"
sin_total: "Motor embebido sin coste directo: la tabla da 0 € de licencia y no tiene una columna de total mensual"
moneda: EUR
---

# Costes — DuckDB

## 1. Modelo de precios

DuckDB no tiene coste de licencia (MIT) ni de servicio: es una librería que se ejecuta dentro del proceso host del cliente. El único coste asociado es el de la máquina (portátil, VM, contenedor de un *job* batch) donde se ejecuta ese proceso, que normalmente ya existe por otro motivo (un *notebook*, un *job* de ETL, una aplicación).

## 2. Coste estimado por escenario

**No aplica una tabla de coste S/M/L en el mismo sentido que los demás candidatos.** DuckDB no es, por diseño, un sustituto directo de un clúster de cómputo persistente: está pensado para cargas que caben en una sola máquina. Para escenarios que superan claramente la capacidad de una máquina (los escenarios M y L de [`../escenarios.md`](../escenarios.md), con 20-200 TB), DuckDB como motor único no es la comparación adecuada; el coste relevante sería el de la(s) máquina(s) donde se ejecuten los procesos que lo usan, ya contabilizado en el TCO de la infraestructura de quien lo invoca (p. ej. un *job* de Airflow, un *notebook*).

| Escenario | Coste directo de DuckDB | Nota |
|---|---|---|
| S | 0 € (licencia) | Cabe cómodamente en una máquina de coste marginal frente al resto de la infraestructura del escenario. |
| M | 0 € (licencia) | Uso probable como motor de consultas puntuales sobre una porción de los datos, no como warehouse central. |
| L | 0 € (licencia) | Fuera de su caso de uso principal como motor único; normalmente se usaría junto a, no en lugar de, un motor distribuido. |

## 3. Advertencias obligatorias

- Sin coste de licencia en ningún escenario.
- No se penaliza a DuckDB con un coste `N/D` por no encajar en los escenarios M/L: se documenta explícitamente por qué la comparación de coste no es directamente aplicable, en lugar de forzar una cifra.
