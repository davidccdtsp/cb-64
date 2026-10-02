---
candidato: starrocks
fecha_revision: 2026-10-02
region_referencia: "No aplica al self-hosted; no se ha verificado en esta revisión una tarifa pública desglosada de CelerData (oferta gestionada)"
moneda: EUR
modelo:
  moneda: EUR
  parametros:
    - { id: infraestructura, nombre: "Infraestructura: cómputo, almacenamiento y red (estimación del consultor)", unidad: "EUR/mes", valor: { S: { min: 180, max: 260 }, M: { min: 1400, max: 1900 }, L: { min: 9000, max: 13000 } } }
    - { id: fte, nombre: "Dedicación de operación (estimación del consultor)", unidad: "FTE", valor: { S: 0.1, M: 0.3, L: 0.75 } }
    - { id: tarifa_hora, nombre: "Tarifa de un perfil SRE/DBA senior (supuesto del consultor)", unidad: "EUR/h", valor: 65 }
    - { id: horas_base, nombre: "Horas base de operación al mes (las de la tabla de la ficha)", unidad: "h/mes", valor: { S: 16, M: 64, L: 128 } }
  variantes:
    - nombre: "OSS autogestionado (TCO)"
      componentes:
        - { nombre: Infraestructura, formula: "infraestructura" }
        - { nombre: Operación, formula: "fte * tarifa_hora * horas_base" }
---

# Costes — StarRocks

## 1. Modelo de precios

StarRocks self-hosted es software libre (Apache-2.0), sin coste de licencia. CelerData ofrece una versión gestionada (CelerData Cloud) cuyo modelo de precios no se ha verificado con una tarifa pública desglosada en esta revisión; se marca `N/D` para esa modalidad.

## 2. TCO estimado por escenario (self-hosted)

Mismos supuestos que en la ficha de coste de Apache Doris (ver [`apache-doris.md`](apache-doris.md)), por analogía arquitectónica (MPP self-hosted de tamaño de clúster comparable):

| Escenario | Infraestructura (estimado/mes) | Operación (estimado/mes) | TCO mensual estimado |
|---|---|---|---|
| S | 180 – 260 € | ≈ 104 € | **≈ 284 – 364 €** |
| M | 1.400 – 1.900 € | ≈ 1.248 € | **≈ 2.650 – 3.150 €** |
| L | 9.000 – 13.000 € | ≈ 6.240 € | **≈ 15.240 – 19.240 €** |

## 3. Advertencias obligatorias

- Cifras por analogía arquitectónica con Doris, no recalculadas de forma independiente para StarRocks; deben revisarse en una entrega completa.
- Coste de la oferta gestionada de CelerData marcado `N/D` por falta de tarifa pública localizada en esta revisión.
