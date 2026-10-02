---
id: amazon-ses
nombre: Amazon SES
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
  MK-EML-01: { nota: 2, confianza: media, fuentes: [ses-subscription] }
  MK-EML-02: { nota: 5, confianza: alta, fuentes: [ses-auth, ses-vdm] }
  MK-EML-03: { nota: 5, confianza: alta, fuentes: [ses-dedicated-ip] }
  MK-EML-04: { valor: "Sí", confianza: alta, fuentes: [ses-subscription] }
  MK-ARQ-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-03: { nota: 4, confianza: media, fuentes: [ses-subscription] }
  MK-PRI-01: { nota: 3, confianza: media, fuentes: [ses-subscription] }
  MK-PRI-02: { nota: 2, confianza: baja, fuentes: [ses-subscription] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [aws-gdpr] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [ses-endpoints] }
  MK-PRI-05: { valor: "SOC 1/2/3; ISO 27001 (AWS)", confianza: media, fuentes: [aws-soc, aws-iso] }
  MK-IA-01: { nota: 0, confianza: media, fuentes: [ses-pricing] }
  MK-IA-02: { nota: 0, confianza: media, fuentes: [ses-pricing] }
  MK-IA-03: { nota: 0, confianza: media, fuentes: [ses-pricing] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [ses-endpoints] }
  MK-DEP-02: { nota: 3, confianza: media, fuentes: [ses-pricing] }
  MK-DEP-03: { valor: "No", confianza: alta, fuentes: [ses-endpoints] }
  MK-ECO-01: { nota: 5, confianza: media, fuentes: [ses-endpoints] }
  MK-ECO-02: { nota: 4, confianza: media, fuentes: [ses-endpoints] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [ses-pricing] }
  MK-LIC-02: { nota: 2, confianza: media, fuentes: [ses-auth] }
  MK-COS-02: { nota: 5, confianza: alta, fuentes: [ses-pricing] }
---

# Amazon SES

## Resumen

Amazon Simple Email Service (SES) es el servicio de envío de email de AWS: API y SMTP, autenticación (SPF, DKIM, DMARC, BIMI), IP dedicadas estándar o gestionadas, gestión de suscripciones con baja de un clic y Virtual Deliverability Manager[^ses-auth][^ses-dedicated-ip][^ses-vdm]. Es una capa de transporte sin editor de campañas ni segmentación.

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
Envío de plantillas con marcadores y de contenido propio; no incluye editor visual (la composición es del cliente). Aporta plantillas y el marcador de enlace de baja `{{amazonSESUnsubscribeUrl}}`.[^ses-subscription]

### MK-EML-02 · Autenticación y herramientas de deliverability · 5/5
SPF, DKIM (Easy DKIM y BYODKIM), DMARC con alineación, MAIL FROM personalizado y BIMI; Virtual Deliverability Manager ofrece paneles de entregabilidad, asesor, tasas de colocación en bandeja, pruebas de colocación y monitorización de listas de bloqueo (capa «Global deliverability»).[^ses-auth][^ses-vdm]

### MK-EML-03 · IP dedicada y gestión de reputación · 5/5
IP dedicadas estándar (calentamiento manual) y gestionadas (calentamiento adaptativo por proveedor de buzón y escalado automático), con *pools* para aislar la reputación por tipo de correo.[^ses-dedicated-ip]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
La gestión de suscripciones añade `List-Unsubscribe` y `List-Unsubscribe-Post` y soporta la baja de un clic exigida a remitentes masivos.[^ses-subscription]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · N/A
Servicio de transporte de email: esta función no forma parte de su alcance (se combina con otra herramienta).

### MK-ARQ-03 · APIs y exportabilidad · 4/5
API v2 y SMTP, notificaciones de configuración de eventos en bruto (rebotes, quejas, entregas) y datos en el cliente.[^ses-subscription]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 3/5
Listas de contactos y temas con preferencias `OPT_IN`/`OPT_OUT` gestionadas por SES y página de preferencias; sin CMP.[^ses-subscription]

### MK-PRI-02 · Supresión y derechos de los interesados · 2/5
Supresión por lista/tema; el borrado de datos personales es responsabilidad del cliente.[^ses-subscription]

### MK-PRI-03 · DPA y subencargados publicados · Sí
El DPA de AWS forma parte de los términos de servicio y AWS publica su lista de subencargados.[^aws-gdpr]

### MK-PRI-04 · Datos en la UE · Sí
SES está disponible en las regiones de Fráncfort, Irlanda, Londres, Milán, París, Estocolmo y Zúrich; el cliente elige dónde se almacenan sus datos.[^ses-endpoints]

### MK-PRI-05 · Certificaciones · SOC 1/2/3; ISO 27001 (AWS)
AWS declara que SES está dentro del alcance de ISO 27001 y publica informes SOC a través de AWS Artifact; el alcance exacto de SES en SOC no se ha verificado.[^aws-soc][^aws-iso]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 0/5
Sin IA predictiva en el servicio de transporte.[^ses-pricing]

### MK-IA-02 · IA generativa de contenido · 0/5
Sin generación de contenido.[^ses-pricing]

### MK-IA-03 · Agentes y MCP · 0/5
Sin agentes propios.[^ses-pricing]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
Servicio gestionado en las regiones de AWS.[^ses-endpoints]

### MK-DEP-02 · Esfuerzo de implantación y operación · 3/5
Autoservicio con crédito gratuito de hasta 200 USD durante 6 meses; requiere salir del *sandbox*, configurar autenticación y desarrollar la integración.[^ses-pricing]

### MK-DEP-03 · Autoalojable · No
Servicio gestionado de AWS.[^ses-endpoints]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 5/5
Servicio de AWS presente en 20 o más regiones; base de uso muy amplia.[^ses-endpoints]

### MK-ECO-02 · Integraciones y marketplace · 4/5
Integrado con CloudWatch, SNS y el resto de AWS y utilizado como transporte por Mautic, listmonk, Keila y otras herramientas.[^ses-endpoints]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Servicio propietario.[^ses-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario, pero con SMTP estándar y BYODKIM, lo que facilita el cambio de proveedor.[^ses-auth]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Precio de lista completo: 0,10 USD por 1.000 emails a la carta; planes Essentials (0,16 USD/1.000 hasta 10 M), Pro y Enterprise; IP dedicada estándar 24,95 USD/mes por IP; IP gestionadas 15 USD/mes más uso; Virtual Deliverability Manager por volumen.[^ses-pricing]


[^ses-subscription]: AWS Docs, «Using subscription management (SES)», https://docs.aws.amazon.com/ses/latest/dg/sending-email-subscription-management.html, consultado 2026-09-30.
[^ses-auth]: AWS Docs, «Amazon SES — Email authentication», https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication.html, consultado 2026-09-30.
[^ses-vdm]: AWS Docs, «Virtual Deliverability Manager for Amazon SES», https://docs.aws.amazon.com/ses/latest/dg/vdm.html, consultado 2026-09-30.
[^ses-dedicated-ip]: AWS Docs, «Dedicated IP addresses for Amazon SES», https://docs.aws.amazon.com/ses/latest/dg/dedicated-ip.html, consultado 2026-09-30.
[^aws-gdpr]: AWS, «GDPR Center», https://aws.amazon.com/compliance/gdpr-center/, consultado 2026-09-30.
[^ses-endpoints]: AWS Docs, «Amazon SES endpoints and quotas», https://docs.aws.amazon.com/general/latest/gr/ses.html, consultado 2026-09-30.
[^aws-soc]: AWS, «SOC Compliance», https://aws.amazon.com/compliance/soc-faqs/, consultado 2026-09-30.
[^aws-iso]: AWS, «ISO/IEC 27001:2022 Compliance», https://aws.amazon.com/compliance/iso-27001-faqs/, consultado 2026-09-30.
[^ses-pricing]: AWS, «Amazon SES Pricing», https://aws.amazon.com/ses/pricing/, consultado 2026-09-30.
