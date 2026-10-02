# Escenarios de referencia — Bloque A

Se definen tres escenarios — **S** (pequeño), **M** (mediano) y **L** (grande) — con los supuestos que pide la sección 5.2 del encargo: TB almacenados, crecimiento mensual, TB escaneados al día, consultas al día, concurrencia pico, horas activas al día y porcentaje de streaming.

## Tabla de supuestos

| Id | Parámetro | S — Pequeño | M — Mediano | L — Grande |
|---|---|---|---|---|
| `descripcion` | Descripción orientativa | Equipo de datos único, un producto, BI interno | Varios equipos de producto, plataforma de datos compartida | Compañía con múltiples dominios de datos, uso intensivo |
| `tb_almacenados` | TB almacenados (histórico) | 1 TB | 20 TB | 200 TB |
| `crecimiento_mensual_pct` | Crecimiento mensual del almacenamiento | 10 % | 15 % | 20 % |
| `tb_escaneados_dia` | TB escaneados al día (consultas) | 0,05 TB (50 GB) | 1 TB | 10 TB |
| `consultas_dia` | Consultas al día | 5.000 | 50.000 | 500.000 |
| `concurrencia_pico` | Concurrencia pico (consultas simultáneas) | 10 | 50 | 300 |
| `horas_activas_dia` | Horas activas de cómputo al día | 8 h | 16 h | 24 h |
| `pct_streaming` | % de datos ingeridos por streaming (vs. batch) | 0 % | 10 % | 30 % |
| `usuarios` | Nº de usuarios/analistas de la plataforma | 5 | 40 | 250 |
| `retencion_backups_dias` | Retención de backups asumida | 7 días | 14 días | 30 días |

## Notas de uso

- **Horas activas de cómputo** modela el uso de un motor con capacidad de "escala a cero" (criterio `DP-REN-03`): en el escenario S se asume que el cómputo solo está activo 8 h/día (jornada laboral), mientras que en L se asume actividad continua 24/7. Para candidatos sin escala a cero, este parámetro no reduce el coste de cómputo (se documenta así en la ficha de precios correspondiente).
- **% de streaming** afecta al cálculo de coste solo en candidatos que facturan la ingesta en streaming de forma distinta a la ingesta batch (p. ej. unidades de *streaming units* separadas). Para el resto, se documenta como informativo.
- **Concurrencia pico** se usa para dimensionar el número de réplicas/nodos de cómputo necesarios en los candidatos cuyo modelo de precios depende del tamaño del clúster, no solo del volumen de datos.
- Estos escenarios están pensados para el Bloque A (plataformas de datos). El Bloque B (MarTech) definirá sus propios escenarios (perfiles, MTU, eventos/mes, emails/mes) cuando se aborde ese bloque; no se incluyen aquí.
- Un consultor que quiera añadir un escenario adicional (p. ej. "XL") solo necesita añadir una columna a esta tabla; no requiere cambios de código en la SPA, según el requisito de la sección 7.1 del encargo.
