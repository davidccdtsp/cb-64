---
id: keila
nombre: Keila
dominio: martech
categoria: ma-oss
tipo: hibrido
licencia: AGPL-3.0
despliegue: [self-hosted, docker, saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 1, confianza: media, fuentes: [kl-gh] }
  MK-REC-02: { nota: 3, confianza: baja, fuentes: [kl-gh] }
  MK-ID-01: { nota: 1, confianza: baja, fuentes: [kl-gh] }
  MK-ID-02: { nota: 0, confianza: baja, fuentes: [kl-gh] }
  MK-ID-03: { nota: 1, confianza: baja, fuentes: [kl-gh] }
  MK-SEG-01: { nota: 2, confianza: baja, fuentes: [kl-gh] }
  MK-SEG-02: { nota: 2, confianza: baja, fuentes: [kl-gh] }
  MK-ACT-01: { nota: 1, confianza: baja, fuentes: [kl-gh] }
  MK-ACT-02: { nota: 1, confianza: media, fuentes: [kl-gh] }
  MK-ACT-03: { nota: 1, confianza: baja, fuentes: [kl-gh] }
  MK-ORQ-01: { nota: 0, confianza: media, fuentes: [kl-gh] }
  MK-ORQ-02: { nota: 0, confianza: baja, fuentes: [kl-gh] }
  MK-EML-01: { nota: 3, confianza: media, fuentes: [kl-gh] }
  MK-EML-02: { nota: 2, confianza: baja, fuentes: [kl-gh] }
  MK-EML-03: { nota: 1, confianza: baja, fuentes: [kl-pricing] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 1, confianza: baja, fuentes: [kl-gh] }
  MK-ARQ-02: { nota: 1, confianza: baja, fuentes: [kl-gh] }
  MK-ARQ-03: { nota: 2, confianza: baja, fuentes: [kl-gh] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [kl-pricing] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { nota: 0, confianza: baja, fuentes: [kl-gh] }
  MK-IA-02: { nota: 0, confianza: baja, fuentes: [kl-gh] }
  MK-IA-03: { nota: 0, confianza: baja, fuentes: [kl-gh] }
  MK-DEP-01: { valor: "self-hosted; docker; saas", confianza: alta, fuentes: [kl-gh] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [kl-gh] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [kl-gh] }
  MK-ECO-01: { nota: 2, confianza: media, fuentes: [kl-gh] }
  MK-ECO-02: { nota: 2, confianza: media, fuentes: [kl-gh] }
  MK-LIC-01: { valor: "Sí", confianza: alta, fuentes: [kl-gh, osi-agpl3] }
  MK-LIC-02: { nota: 4, confianza: media, fuentes: [kl-gh, kl-pricing] }
  MK-COS-02: { nota: 5, confianza: alta, fuentes: [kl-pricing] }
---

# Keila

## Resumen

Keila es una alternativa open source (AGPL-3.0) a Mailchimp y Sendinblue para enviar campañas de newsletter y crear formularios de suscripción, con editor WYSIWYG y soporte de varios proveedores de envío[^kl-gh]. Ofrece Keila Cloud, con alojamiento en la UE[^kl-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 1/5
Formularios de suscripción y API; sin SDKs ni seguimiento de eventos.[^kl-gh]

### MK-REC-02 · Recogida server-side y first-party · 3/5
Autoalojable; sin captura de eventos.[^kl-gh]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 1/5
Identifica contactos por email.[^kl-gh]

### MK-ID-02 · Resolución probabilística / difusa · 0/5
No.[^kl-gh]

### MK-ID-03 · Perfil unificado y latencia · 1/5
Contactos con datos básicos; sin perfil unificado.[^kl-gh]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 2/5
Segmentos básicos por filtros de contactos.[^kl-gh]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Filtros; sin SQL.[^kl-gh]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 1/5
Solo proveedores de envío (SES, SendGrid, Mailgun, Postmark, SMTP).[^kl-gh]

### MK-ACT-02 · Canales de mensajería nativos · 1/5
Solo email.[^kl-gh]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 1/5
Importación CSV.[^kl-gh]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 0/5
Sin journeys ni automatizaciones en la descripción del proyecto.[^kl-gh]

### MK-ORQ-02 · Experimentación · 0/5
Sin pruebas A/B en la descripción del proyecto.[^kl-gh]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 3/5
Editor WYSIWYG de campañas.[^kl-gh]

### MK-EML-02 · Autenticación y herramientas de deliverability · 2/5
Delegado en el proveedor de envío configurado (SES, SendGrid, Mailgun, Postmark o SMTP).[^kl-gh]

### MK-EML-03 · IP dedicada y gestión de reputación · 1/5
Se puede usar los servidores de Keila Cloud o el proveedor propio; sin gestión de IP dedicadas documentada.[^kl-pricing]

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha revisado el soporte de `List-Unsubscribe-Post`.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 1/5
Base de datos propia.[^kl-gh]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 1/5
Sin conectores a warehouses.[^kl-gh]

### MK-ARQ-03 · APIs y exportabilidad · 2/5
API y exportación básica.[^kl-gh]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha revisado.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha revisado el DPA de Keila Cloud.

### MK-PRI-04 · Datos en la UE · Sí
Keila Cloud se aloja íntegramente en la UE y la versión autoalojada permite elegir la infraestructura.[^kl-pricing]

### MK-PRI-05 · Certificaciones · N/D
No se han localizado certificaciones.


## MK-IA · IA

### MK-IA-01 · IA predictiva · 0/5
Sin IA.[^kl-gh]

### MK-IA-02 · IA generativa de contenido · 0/5
Sin IA.[^kl-gh]

### MK-IA-03 · Agentes y MCP · 0/5
Sin IA.[^kl-gh]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · self-hosted; docker; saas
Imagen Docker `pentacent/keila`, Docker Compose y Keila Cloud.[^kl-gh]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Imagen Docker y configuración Docker Compose.[^kl-gh]

### MK-DEP-03 · Autoalojable · Sí
Autoalojable con Docker.[^kl-gh]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 2/5
Unas 2,2 mil estrellas; proyecto pequeño.[^kl-gh]

### MK-ECO-02 · Integraciones y marketplace · 2/5
Cinco proveedores de envío.[^kl-gh]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · Sí
AGPL-3.0, aprobada por la OSI.[^kl-gh][^osi-agpl3]

### MK-LIC-02 · Apertura y riesgo de licencia · 4/5
Open source con oferta gestionada de pago; soporte de pago para autoalojamiento.[^kl-gh][^kl-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Seis planes de Keila Cloud de 8 a 256 EUR/mes (de 2.000 a 250.000 emails), contactos ilimitados; sin plan gratuito. Autoalojamiento sin coste de licencia.[^kl-pricing]


[^kl-gh]: Keila (GitHub), «pentacent/keila», https://github.com/pentacent/keila, consultado 2026-09-30.
[^kl-pricing]: Keila, «Pricing», https://www.keila.io/pricing, consultado 2026-09-30.
[^osi-agpl3]: Open Source Initiative, «GNU Affero General Public License version 3», https://opensource.org/license/agpl-v3, consultado 2026-09-30.
