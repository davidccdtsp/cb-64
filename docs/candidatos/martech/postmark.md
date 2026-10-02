---
id: postmark
nombre: Postmark
dominio: martech
categoria: email-transporte
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-REC-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ID-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ID-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ID-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-SEG-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-SEG-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ACT-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ACT-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ACT-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ORQ-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ORQ-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-01: { nota: 2, confianza: baja, fuentes: [pm-pricing] }
  MK-EML-02: { nota: 4, confianza: media, fuentes: [pm-dmarc-digests, pm-gmail-yahoo] }
  MK-EML-03: { nota: 3, confianza: media, fuentes: [pm-pricing] }
  MK-EML-04: { valor: "Sí", confianza: alta, fuentes: [pm-unsub] }
  MK-ARQ-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-03: { nota: 3, confianza: baja, fuentes: [pm-pricing] }
  MK-PRI-01: { nota: 2, confianza: baja, fuentes: [pm-unsub] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [pm-dpa, pm-eu-privacy] }
  MK-PRI-04: { valor: "No", confianza: media, fuentes: [pm-eu-privacy, pm-gdpr-faq] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { nota: 0, confianza: baja, fuentes: [pm-pricing] }
  MK-IA-02: { nota: 0, confianza: baja, fuentes: [pm-pricing] }
  MK-IA-03: { nota: 0, confianza: baja, fuentes: [pm-pricing] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [pm-pricing] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [pm-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [pm-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 3, confianza: baja, fuentes: [pm-pricing] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [pm-pricing] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [pm-pricing] }
  MK-COS-02: { nota: 5, confianza: alta, fuentes: [pm-pricing] }
---

# Postmark

## Resumen

Postmark (ActiveCampaign) es un servicio de email transaccional y de difusión con flujos de mensajes separados (*message streams*), enfocado en entregabilidad y velocidad[^pm-pricing][^pm-broadcast]. Añade automáticamente la baja de un clic a los envíos de difusión y ofrece resúmenes DMARC[^pm-unsub][^pm-dmarc-digests].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-REC-02 · Recogida server-side y first-party · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ID-02 · Resolución probabilística / difusa · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ID-03 · Perfil unificado y latencia · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-SEG-02 · Modos de construcción (no-code y SQL) · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ACT-02 · Canales de mensajería nativos · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ORQ-02 · Experimentación · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 2/5
Plantillas y API; no incluye editor de campañas de marketing propio en la versión revisada.[^pm-pricing]

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
Aplica DKIM, SPF y DMARC a los mensajes, y ofrece DMARC Digests (resúmenes semanales de informes DMARC, complemento de pago desde 14 USD/mes por dominio).[^pm-dmarc-digests][^pm-gmail-yahoo]

### MK-EML-03 · IP dedicada y gestión de reputación · 3/5
IP dedicadas como complemento desde 50 USD/mes, con un mínimo de 300.000 emails al mes y solo para planes Pro o superiores; el calentamiento no se ha revisado.[^pm-pricing]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
Postmark añade automáticamente el enlace de baja y las cabeceras `List-Unsubscribe` y `List-Unsubscribe-Post` conformes con RFC 8058 en los flujos de difusión.[^pm-unsub]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API REST y SMTP; retención de datos configurable de 7 a 365 días.[^pm-pricing]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Supresión automática de destinatarios que se dan de baja.[^pm-unsub]

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · Sí
Ofrece un DPA con cláusulas contractuales tipo a todos los clientes y una lista de subencargados en su página de protección de datos de la UE.[^pm-dpa][^pm-eu-privacy]

### MK-PRI-04 · Datos en la UE · No
Los servidores principales están en EE. UU. (Chicago y AWS) y Postmark indica que no prevé añadir servidores en la UE; se apoya en las cláusulas contractuales tipo.[^pm-eu-privacy][^pm-gdpr-faq]

### MK-PRI-05 · Certificaciones · N/D
No se han revisado las certificaciones.


## MK-IA · IA

### MK-IA-01 · IA predictiva · 0/5
Sin IA predictiva.[^pm-pricing]

### MK-IA-02 · IA generativa de contenido · 0/5
Sin generación de contenido.[^pm-pricing]

### MK-IA-03 · Agentes y MCP · 0/5
Sin agentes propios.[^pm-pricing]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
Servicio gestionado.[^pm-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Plan gratuito de 100 correos al mes para pruebas y planes desde 15 USD/mes; integración por API o SMTP.[^pm-pricing]

### MK-DEP-03 · Autoalojable · No
Servicio gestionado.[^pm-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · 3/5
Integraciones por API/SMTP y soporte como transporte en herramientas como Keila.[^pm-pricing]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Servicio propietario.[^pm-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API y SMTP estándar.[^pm-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Precios completos: Free 0 USD (100 emails), Basic 15 USD/mes (10.000 emails; 1,80 USD por 1.000 adicionales), Pro 16,50 USD/mes, Platform 18 USD/mes; IP dedicadas desde 50 USD/mes.[^pm-pricing]


[^pm-pricing]: Postmark, «Pricing», https://postmarkapp.com/pricing, consultado 2026-09-30.
[^pm-dmarc-digests]: Postmark Support, «Getting Started with DMARC Digests», https://postmarkapp.com/support/article/getting-started-with-dmarc-digests, consultado 2026-09-30.
[^pm-gmail-yahoo]: Postmark, «Your 2024 guide to Google and Yahoo’s new requirements for email senders», https://postmarkapp.com/blog/2024-gmail-yahoo-email-requirements, consultado 2026-09-30.
[^pm-unsub]: Postmark Support, «How to include a List-Unsubscribe header», https://postmarkapp.com/support/article/1299-how-to-include-a-list-unsubscribe-header, consultado 2026-09-30.
[^pm-dpa]: Postmark, «Data Processing Addendum», https://postmarkapp.com/dpa, consultado 2026-09-30.
[^pm-eu-privacy]: Postmark, «EU Data Protection», https://postmarkapp.com/eu-privacy, consultado 2026-09-30.
[^pm-gdpr-faq]: Postmark Support, «GDPR FAQ», https://postmarkapp.com/support/article/1218-gdpr-faq, consultado 2026-09-30.
[^pm-broadcast]: Postmark, «Best practices for bulk broadcast sending», https://postmarkapp.com/guides/best-practices-for-broadcast-sending, consultado 2026-09-30.
