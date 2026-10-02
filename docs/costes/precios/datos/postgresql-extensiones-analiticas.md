---
candidato: postgresql-extensiones-analiticas
fecha_revision: 2026-10-02
region_referencia: "No aplica de forma única — depende del proveedor gestionado elegido (RDS, Cloud SQL, Aurora, Crunchy Bridge, Neon, Timescale Cloud...)"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura: cómputo, almacenamiento y red (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 100, max: 160 }, M: { min: 900, max: 1300 }, L: { min: 6500, max: 9500 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.1, M: 0.3, L: 0.75 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "fte * tarifa_hora * horas_base" }
---

# Costes — PostgreSQL con extensiones analíticas

## 1. Modelo de precios

Sin coste de licencia (núcleo PostgreSQL y la mayoría de extensiones citadas son de código abierto). El coste real depende por completo de si se despliega self-hosted (TCO de infraestructura + operación) o gestionado (RDS/Aurora, Cloud SQL/AlloyDB, Azure Database for PostgreSQL, Crunchy Bridge, Neon, Timescale Cloud...), cada uno con su propio modelo de precios, no evaluados individualmente en esta ficha por tratarse de una categoría con decenas de proveedores.

## 2. TCO estimado por escenario (self-hosted)

Una instancia PostgreSQL con extensiones analíticas suele requerir menos nodos que un clúster MPP distribuido para el mismo volumen (arquitectura vertical más que horizontal por defecto, salvo Citus), lo que se refleja en un supuesto de infraestructura algo menor:

| Escenario | Infraestructura (estimado/mes) | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 100 – 160 € | ≈ 104 € | **≈ 204 – 264 €** |
| M | 900 – 1.300 € | ≈ 1.248 € | **≈ 2.150 – 2.550 €** |
| L | 6.500 – 9.500 € | ≈ 6.240 € | **≈ 12.740 – 15.740 €** |

Para el escenario L, esta estimación asume que se ha adoptado una extensión de distribución horizontal (p. ej. Citus) o un motor columnar delegado (p. ej. `pg_mooncake`/`pg_duckdb`); sin esa extensión, PostgreSQL vertical puro probablemente no sea adecuado para ese volumen, lo cual es en sí mismo un hallazgo relevante de esta ficha, no solo una cifra.

## 3. Advertencias obligatorias

- Sin coste de licencia; TCO estimado, no auditado.
- No se ha calculado el coste de ninguna oferta gestionada concreta (RDS, Aurora, Neon, Crunchy Bridge...); para una decisión real, cada una debería evaluarse como una variante de precio propia.
- El escenario L asume una extensión de escalado horizontal no especificada; el coste real depende de cuál se elija.
