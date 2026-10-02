---
id: sendgrid
nombre: Twilio SendGrid
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
  MK-EML-01: { nota: 3, confianza: baja, fuentes: [sgd-pricing] }
  MK-EML-02: { nota: 4, confianza: media, fuentes: [sgd-domain-auth, sgd-dmarc, sgd-bimi] }
  MK-EML-03: { nota: 3, confianza: baja, fuentes: [sgd-pricing] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-03: { nota: 3, confianza: baja, fuentes: [sgd-pricing] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [sgd-residency, sgd-eu-locations] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [sgd-pricing] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [sgd-trial] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [sgd-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 4, confianza: baja, fuentes: [sgd-pricing] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [sgd-pricing] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [sgd-pricing] }
  MK-COS-02: { nota: 3, confianza: media, fuentes: [sgd-pricing, sgd-trial] }
---

# Twilio SendGrid

## Resumen

Twilio SendGrid es un servicio de envío de email transaccional y de marketing (Email API, SMTP y Marketing Campaigns), integrado con Twilio Segment para el email de Engage[^sgd-pricing]. Ofrece autenticación de dominio con creación automática de SPF/DKIM/DMARC, BIMI y, desde hace poco, residencia de datos de email en la UE[^sgd-dmarc][^sgd-residency].

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

### MK-EML-01 · Editor y plantillas · 3/5
Además de la API, ofrece Marketing Campaigns con editor y plantillas (producto con precios propios); el detalle del editor no se ha revisado.[^sgd-pricing]

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
Autenticación de dominio, seguridad automatizada que mantiene los registros SPF, DKIM y DMARC, y guía para BIMI (requiere DMARC en cuarentena o rechazo). No se ha verificado inbox placement propio.[^sgd-domain-auth][^sgd-dmarc][^sgd-bimi]

### MK-EML-03 · IP dedicada y gestión de reputación · 3/5
Las IP dedicadas son una herramienta adicional del plan de Email API; no se ha revisado el calentamiento automático.[^sgd-pricing]

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha localizado en las páginas revisadas la documentación de `List-Unsubscribe-Post`.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API y eventos por webhook; sin revisión detallada.[^sgd-pricing]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha revisado.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha verificado en fuente primaria el DPA y la lista de subencargados de SendGrid.

### MK-PRI-04 · Datos en la UE · Sí
Email Data Residency almacena y procesa en centros de datos de la UE los datos personales de destinatarios, el contenido y los eventos; las subcuentas de la UE requieren IP dedicadas en la UE.[^sgd-residency][^sgd-eu-locations]

### MK-PRI-05 · Certificaciones · N/D
No se han revisado las certificaciones de SendGrid.


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se ha revisado.

### MK-IA-02 · IA generativa de contenido · N/D
No se ha revisado.

### MK-IA-03 · Agentes y MCP · N/D
No se ha revisado.


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
Servicio gestionado.[^sgd-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Prueba gratuita de 60 días con 100 correos diarios y planes escalonados por volumen.[^sgd-trial]

### MK-DEP-03 · Autoalojable · No
Servicio gestionado de Twilio.[^sgd-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · 4/5
Integrado con Twilio Segment y usado como transporte por Mautic y otras herramientas.[^sgd-pricing]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Servicio propietario.[^sgd-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API y SMTP estándar.[^sgd-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 3/5
Tramos por volumen (de menos de 3.000 a más de 5 millones de emails) con IP dedicadas como complemento de pago; la página oficial no mostró los importes en la extracción automática, por lo que se requiere revisión manual.[^sgd-pricing][^sgd-trial]


[^sgd-pricing]: Twilio, «Twilio SendGrid Email API pricing», https://www.twilio.com/en-us/products/email-api/pricing, consultado 2026-09-30.
[^sgd-domain-auth]: Twilio Docs, «Configure domain authentication», https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication, consultado 2026-09-30.
[^sgd-dmarc]: Twilio Docs, «Enforce authentication with a DMARC policy», https://www.twilio.com/docs/sendgrid/ui/sending-email/dmarc, consultado 2026-09-30.
[^sgd-bimi]: Twilio, «Getting Started with BIMI and SendGrid», https://www.twilio.com/en-us/blog/insights/getting-started-bimi-sendgrid, consultado 2026-09-30.
[^sgd-residency]: Twilio Docs, «Data Residency Email (EU)», https://www.twilio.com/docs/sendgrid/data-residency, consultado 2026-09-30.
[^sgd-eu-locations]: Twilio Docs, «EU Data Processing Locations», https://www.twilio.com/docs/sendgrid/data-residency/locations-eu, consultado 2026-09-30.
[^sgd-trial]: SendGrid Support, «Overview of 60-Day Free Trial Plans», https://support.sendgrid.com/hc/en-us/articles/35270136965403-Twilio-SendGrid-Trial-Account-Plan, consultado 2026-09-30.
