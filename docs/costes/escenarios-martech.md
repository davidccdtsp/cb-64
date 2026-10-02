# Escenarios de referencia — Bloque B (MarTech)

> Los valores de esta página son **supuestos de trabajo del consultor**, no datos de un cliente real ni cifras de una fuente externa (ver [`metodologia.md`](metodologia.md#2-escenarios-de-referencia)). Son un punto de partida editable: la aplicación debe permitir modificar cada parámetro y recalcular el coste.

Los escenarios S/M/L del Bloque B usan las magnitudes que piden los sistemas de precios de MarTech (sección 5.2 del encargo): perfiles, MTU, eventos, emails, usuarios y canales.

| Id | Parámetro | S — Pequeño | M — Mediano | L — Grande |
|---|---|---|---|---|
| `descripcion` | Descripción orientativa | Comercio o SaaS pequeño, un equipo de marketing | Comercio/SaaS mediano, varios equipos y canales | Gran empresa multi-marca |
| `perfiles` | Perfiles identificados (contactos de marketing) | 10.000 | 250.000 | 5.000.000 |
| `mtu` | MTU (usuarios únicos mensuales, incluidos anónimos) | 30.000 | 600.000 | 12.000.000 |
| `eventos_mes` | Eventos de comportamiento al mes | 2 millones | 50 millones | 1.000 millones |
| `emails_mes` | Emails enviados al mes | 50.000 | 2 millones | 50 millones |
| `sms_mes` | SMS al mes (informativo) | 0 | 20.000 | 500.000 |
| `usuarios` | Usuarios de la herramienta | 3 | 15 | 60 |
| `canales` | Canales | Email | Email, SMS, push | Email, SMS, push, WhatsApp, in-app |
| `journeys` | Journeys activos | 5 | 30 | 150 |
| `warehouse_disponible` | Warehouse/lakehouse del Bloque A disponible | No | Sí | Sí |
| `horas_fte_mes` | Horas de operación por FTE y mes (OSS autoalojado) | 160 | 160 | 160 |

## Notas de uso

- **Perfiles frente a MTU:** cada candidato factura por una unidad distinta (perfil, MTU, evento, email, usuario, «fila activa»). La ficha de coste indica qué parámetro del escenario usa.
- **Equivalencia usada:** cuando un precio se define por «usuarios únicos», «contactos» o «perfiles activos», se aplica el número de perfiles del escenario; cuando se define por «eventos activos», se aplican todos los eventos del escenario.
- **Warehouse:** el coste del warehouse/lakehouse (Bloque A) **no** se incluye en el coste de las herramientas composable o warehouse-native; se suma aparte al comparar un *stack* completo.
- **Transporte de email:** el coste de un servicio de transporte (SES, SendGrid, Postmark) se suma aparte al de un software autoalojado que necesite proveedor de envío (Mautic, listmonk, Keila, Dittofeed).
- Un escenario adicional (p. ej. «XL») se añade con una columna nueva; no requiere cambios de código en la SPA.
