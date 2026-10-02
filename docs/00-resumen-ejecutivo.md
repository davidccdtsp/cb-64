# Resumen ejecutivo

Fecha de los resultados: 2026-10-01. Cubre los 17 candidatos de datos (Bloque A) y los 28 de MarTech (Bloque B) de este repositorio. No hay un ganador único: el mejor candidato depende de qué necesita cada organización, así que las conclusiones se dan por **perfil de necesidad**. Metodología en [`01-metodologia.md`](01-metodologia.md); términos en [`glosario.md`](glosario.md).

## Cómo leer los resultados

- Cada candidato recibe una **puntuación de 0 a 100** a partir de notas 0-5 por criterio, agrupadas en dimensiones. Todas las notas tienen fuente y nivel de confianza; los criterios sin fuente pública quedan como `N/D` y se **excluyen** del cálculo por defecto.
- Las cifras de este resumen salen de la propia aplicación con el **escenario de coste M** y sus pesos por defecto, salvo los pesos de dimensión de cada perfil, que se indican abajo. Cualquiera puede reproducirlas en el Catálogo.
- **Diferencias pequeñas no son concluyentes.** Con 5 puntos o menos de distancia, el orden depende de los pesos y de cómo se traten los `N/D`; conviene tratarlos como un empate técnico.
- La nota de coste y la media de los `N/D` dependen del **grupo comparado**: la puntuación de un candidato cambia según se compare con todo el área o solo con su categoría. Por eso hay dos tablas (por perfil sobre toda el área; por categoría).
- 19 de los 45 candidatos no tienen cifra de coste: el criterio de coste queda sin nota para ellos y eso favorece su puntuación frente a quienes sí la tienen.
- Cuatro candidatos de MarTech (HubSpot, Klaviyo, Mailchimp y Salesforce Marketing Cloud) tienen cifra de coste, pero con rangos amplios en los escenarios M y L (ver [`costes/metodologia.md`](costes/metodologia.md#87-ampliación-hubspot-klaviyo-mailchimp-y-salesforce-marketing-cloud)); la nota de coste usa el punto medio, y eso les resta puntuación frente a candidatos con una cifra cerrada o sin cifra.
- En MarTech se mezclan categorías con funciones muy distintas (CDP, automatización, transporte de email). Los rankings de toda el área sirven de orientación; la comparación fiable es **dentro de la categoría**.

## Perfiles de necesidad

Cada perfil sube el peso de las dimensiones que le importan (el resto, por defecto). Pesos por defecto de dimensión: ver las tablas `DIMENSIONES` de [`rubricas/datos.md`](rubricas/datos.md) y [`rubricas/martech.md`](rubricas/martech.md).

### Datos (plataformas analíticas)

| Perfil | Qué prioriza | Mejores candidatos (puntuación) |
|---|---|---|
| **Generalista** | Pesos por defecto. | Databricks 74,1; Google BigQuery 70,1; Trino 69,8; Apache Doris 68,9. |
| **Coste mínimo** | Coste (`DP-COS`) con peso 20. | Google BigQuery 75,9; Databricks 75,5; Firebolt 63,7; Dremio 63,4. |
| **Soberanía / on-prem** | Despliegue obligatorio `self-hosted`, `kubernetes` o `docker`; Licencia, Gobierno y Despliegue con peso 12. | Apache Doris 73,4; Apache Spark SQL 67,3; Trino 66,9; StarRocks 66,6. |
| **Gobierno enterprise** | Gobierno y seguridad (`DP-GOB`) con peso 20; Ecosistema con peso 10. | Databricks 74,9; Trino 72,2; Snowflake 71,0; Apache Doris 70,2. |
| **Tiempo real** | Cargas de trabajo (`DP-CAR`) con peso 16; Rendimiento (`DP-REN`) con peso 14. | Databricks 76,4; Google BigQuery 72,5; Snowflake 70,7; Amazon Redshift 67,1. |
| **Interoperabilidad / sin lock-in** | Interoperabilidad (`DP-INT`) con peso 16; Arquitectura (`DP-ARQ`) con peso 14. | Databricks 74,0; Trino 72,4; Apache Doris 70,2; Google BigQuery 69,3. |

Lectura:
- **Databricks** aparece arriba en casi todos los perfiles, pero con margen corto sobre el segundo: en coste mínimo queda prácticamente empatado con BigQuery.
- **BigQuery** es la opción mejor situada cuando el coste pesa más.
- Si se exige **autoalojamiento**, el grupo cambia por completo: lideran los proyectos open source (Doris, Spark SQL, Trino, StarRocks).
- **Trino** es consistente en perfiles de gobierno e interoperabilidad, y es la referencia del grupo de federación de consultas.

### MarTech

| Perfil | Qué prioriza | Mejores candidatos (puntuación) |
|---|---|---|
| **Generalista** | Pesos por defecto. | Braze 73,4; Adobe Journey Optimizer 70,0; Twilio SendGrid 68,8; Twilio Segment 67,9. |
| **Coste mínimo** | Coste (`MK-COS`) con peso 20. | Amazon SES 73,9; Customer.io 69,2; Twilio SendGrid 66,5; Twilio Segment 66,3. |
| **Soberanía / autoalojado** | Despliegue obligatorio `self-hosted`, `kubernetes` o `docker`; Privacidad con peso 16; Licencia y Despliegue con peso 10. | Dittofeed 65,3; Jitsu 64,4; RudderStack 59,9; Mautic 58,9. |
| **Privacidad y cumplimiento** | Privacidad (`MK-PRI`) con peso 22. | Braze 76,6; Adobe Journey Optimizer 74,5; Twilio SendGrid 74,5; Twilio Segment 69,5. |
| **Email y entregabilidad** | Email (`MK-EML`) con peso 20. | Braze 76,1; Adobe Journey Optimizer 71,6; Amazon SES 69,4; Twilio SendGrid 68,8. |
| **Composable / warehouse-native** | Arquitectura e integración con datos (`MK-ARQ`) con peso 20; Identidad (`MK-ID`) con peso 10. | Braze 73,7; Adobe Journey Optimizer 71,8; Twilio Segment 68,4; Amazon SES 68,4. |

Lectura:
- **Braze** lidera la mayoría de perfiles de toda el área, pero su categoría es la de automatización en la nube (`ma-cloud`); conviene compararlo con sus pares y no con las CDP.
- En el perfil **composable**, las CDP composable (Hightouch, Census) no aparecen arriba en toda el área; sí lideran su categoría (ver más abajo). Conviene comparar dentro de la categoría.
- Para **autoalojado** hay opciones open source de distintas funciones (Dittofeed y Mautic para automatización; Jitsu y RudderStack para recogida de datos), no sustitutas entre sí.
- Para **coste mínimo** destaca el transporte de email (Amazon SES), con las cifras de coste del escenario M; 19 de los 45 candidatos no tienen cifra de coste.

## Líder por categoría

Puntuación comparando solo dentro de la categoría, con pesos por defecto y escenario M. Entre paréntesis, número de candidatos de la categoría. Con un solo candidato no hay comparación.

| Área | Categoría | Primeros candidatos |
|---|---|---|
| Datos | `cloud-dwh` (4) | Google BigQuery 70,1; Snowflake 67,5; Amazon Redshift 63,7; Firebolt 59,1 |
| Datos | `motor-olap` (2) | StarRocks 67,4; ClickHouse 62,4 |
| Datos | `olap-tiempo-real` (2) | Apache Druid 47,6; Apache Pinot 38,0 |
| Datos | Categorías con un candidato | Apache Doris (`real-time-dwh-lakehouse`) 74,6; Databricks (`lakehouse`) 74,1; Trino (`federacion-consultas`) 73,8; Apache Spark SQL (`motor-batch-etl`) 72,2; Dremio (`motor-lakehouse-federado`) 64,4; PostgreSQL con extensiones (`motor-hibrido-extensible`) 58,9; Microsoft Fabric (`cloud-dwh-lakehouse`) 56,1; MotherDuck (`cloud-dwh-embebido`) 53,3; DuckDB (`motor-embebido`) 51,9 |
| MarTech | `cdp-packaged` (7) | Twilio Segment 67,9; Tealium 63,9; mParticle 63,3; Treasure Data 61,8 |
| MarTech | `cdp-composable` (2) | Hightouch 62,5; Census 56,7 |
| MarTech | `cdp-oss` (4) | RudderStack 62,0; Jitsu 61,5; Snowplow 51,8; Apache Unomi 48,8 |
| MarTech | `ma-cloud` (8) | Braze 73,4; Adobe Journey Optimizer 70,0; Klaviyo 68,4; Customer.io 66,7 |
| MarTech | `ma-oss` (4) | Dittofeed 62,1; Mautic 53,8; Keila 46,6; listmonk 46,1 |
| MarTech | `email-transporte` (3) | Twilio SendGrid 68,8; Amazon SES 65,6; Postmark 45,7 |

## Conclusiones generales

1. **No hay un candidato dominante.** Cambiar el perfil cambia el primer puesto, y entre los primeros las diferencias suelen ser de pocos puntos.
2. **La elección entre cloud propietario y open source la decide el requisito de despliegue y de coste**, más que la nota global: al exigir autoalojamiento, la lista de candidatos cambia.
3. **La falta de información pesa:** hay 80 `N/D` de 510 notas en datos y 221 de 1.008 en MarTech, y 19 candidatos sin coste. La clasificación de un candidato con muchos `N/D` es menos fiable, aunque su puntuación sea alta.
4. **Los resultados son un punto de partida, no una recomendación cerrada.** Con la aplicación se pueden ajustar los pesos, activar requisitos eliminatorios y cambiar el escenario de coste para ver cómo cambia el orden.
5. **Pendiente de revisión:** las notas con confianza baja y la revisión por muestreo de las fuentes (ver [`pendientes-requisitos.md`](pendientes-requisitos.md)).
