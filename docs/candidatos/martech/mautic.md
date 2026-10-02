---
id: mautic
nombre: Mautic
dominio: martech
categoria: ma-oss
tipo: hibrido
licencia: GPL-3.0
despliegue: [self-hosted, saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 2, confianza: media, fuentes: [mt-product] }
  MK-REC-02: { nota: 4, confianza: media, fuentes: [mt-product] }
  MK-ID-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { nota: 3, confianza: baja, fuentes: [mt-product] }
  MK-SEG-02: { nota: 2, confianza: media, fuentes: [mt-product] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 3, confianza: alta, fuentes: [mt-product] }
  MK-ACT-03: { nota: 1, confianza: media, fuentes: [mt-product] }
  MK-ORQ-01: { nota: 3, confianza: alta, fuentes: [mt-campaign-builder] }
  MK-ORQ-02: { nota: 2, confianza: alta, fuentes: [mt-product] }
  MK-EML-01: { nota: 3, confianza: media, fuentes: [mt-overview] }
  MK-EML-02: { nota: 2, confianza: media, fuentes: [mt-kb-sendgrid, mt-forum-ses-dmarc] }
  MK-EML-03: { nota: 1, confianza: media, fuentes: [mt-kb-sendgrid] }
  MK-EML-04: { valor: "Sí", confianza: media, fuentes: [mt-issue-8058] }
  MK-ARQ-01: { nota: 1, confianza: media, fuentes: [mt-gh] }
  MK-ARQ-02: { nota: 1, confianza: baja, fuentes: [mt-product] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [mt-product, mt-gh] }
  MK-PRI-01: { nota: 2, confianza: media, fuentes: [mt-product] }
  MK-PRI-02: { nota: 3, confianza: media, fuentes: [mt-product] }
  MK-PRI-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [mt-hosting] }
  MK-PRI-05: { valor: "Ninguna declarada por el proyecto", confianza: media, fuentes: [mt-gh] }
  MK-IA-01: { nota: 2, confianza: media, fuentes: [mt-product] }
  MK-IA-02: { nota: 1, confianza: alta, fuentes: [mt-ai-manifesto] }
  MK-IA-03: { nota: 0, confianza: media, fuentes: [mt-ai-manifesto] }
  MK-DEP-01: { valor: "self-hosted; saas (proveedores y Acquia)", confianza: alta, fuentes: [mt-hosting] }
  MK-DEP-02: { nota: 3, confianza: media, fuentes: [mt-hosting] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [mt-gh] }
  MK-ECO-01: { nota: 5, confianza: alta, fuentes: [mt-gh, mt-release7] }
  MK-ECO-02: { nota: 3, confianza: media, fuentes: [mt-product] }
  MK-LIC-01: { valor: "Sí", confianza: alta, fuentes: [mt-gh, osi-gpl3] }
  MK-LIC-02: { nota: 5, confianza: media, fuentes: [mt-gh, mt-hosting] }
  MK-COS-02: { nota: 4, confianza: media, fuentes: [mt-hosting] }
---

# Mautic

## Resumen

Mautic es una plataforma de marketing automation de código abierto (GPL-3.0) con constructor de campañas, segmentación dinámica, formularios, páginas de aterrizaje, seguimiento web y canales de email, SMS y notificaciones push[^mt-gh][^mt-product]. Es el mayor proyecto open source de su categoría (más de 10 mil estrellas y más de 290 contribuidores)[^mt-gh]. La versión 7.0 (enero de 2026) es una versión estable de cuatro años de soporte[^mt-release7]. Se autoaloja o se contrata a través de proveedores de alojamiento gestionado[^mt-hosting]; Acquia, propietaria original, comercializa una edición SaaS.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 2/5
Seguimiento web que vincula visitas anónimas con el historial del contacto, formularios y API REST; no se han localizado SDKs móviles oficiales.[^mt-product]

### MK-REC-02 · Recogida server-side y first-party · 4/5
Al autoalojarse, el seguimiento se sirve desde el dominio del cliente y los datos no transitan por terceros; no se ofrece un colector server-side dedicado.[^mt-product]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · N/D
No se ha revisado la documentación técnica de fusión de contactos.

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta.

### MK-ID-03 · Perfil unificado y latencia · N/D
No se ha revisado.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Segmentos dinámicos en los que los contactos entran y salen según reglas; se recalculan por tareas programadas y no se documenta el tiempo real.[^mt-product]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Constructor de segmentos basado en filtros; sin modo SQL sobre warehouse.[^mt-product]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
El sitio cita conectores nativos con Salesforce, HubSpot, Zoho, Microsoft Dynamics y más de 20 herramientas, sin un recuento oficial de destinos.

### MK-ACT-02 · Canales de mensajería nativos · 3/5
Email, SMS, notificaciones de aplicación y notificaciones push del navegador de serie, con más canales mediante plugins.[^mt-product]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 1/5
Importación de contactos por CSV y API REST; no lee de warehouses.[^mt-product]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Constructor de campañas de arrastrar y soltar con disparadores por tiempo y comportamiento; no se han verificado límites de frecuencia ni versionado.[^mt-campaign-builder]

### MK-ORQ-02 · Experimentación · 2/5
Pruebas A/B de variantes de email; sin grupos de control ni medición de incrementalidad documentados.[^mt-product]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 3/5
Email con plantillas, contenido dinámico y personalización por contacto; incluye editor visual, HTML y componentes.[^mt-overview]

### MK-EML-02 · Autenticación y herramientas de deliverability · 2/5
Mautic delega la entrega en un transporte (SMTP, Symfony Mailer, SendGrid, SES); la autenticación SPF/DKIM/DMARC se configura en el proveedor, y hay incidencias reportadas de alineación DMARC con SES. No incluye monitorización de reputación.[^mt-kb-sendgrid][^mt-forum-ses-dmarc]

### MK-EML-03 · IP dedicada y gestión de reputación · 1/5
La IP de envío es la del transporte elegido; Mautic no gestiona IP dedicadas ni calentamiento.[^mt-kb-sendgrid]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
El soporte de `List-Unsubscribe-Post` (RFC 8058) figura como implementado (incidencia cerrada con el hito 5.0.0); conviene verificarlo en la versión desplegada.[^mt-issue-8058]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 1/5
Almacena los contactos en su propia base de datos; la relación con el warehouse se limita a exportaciones.[^mt-gh]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 1/5
No se documentan conectores a warehouses; solo API y exportación.[^mt-product]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API REST abierta, datos en la base del propio cliente y exportación a CSV.[^mt-product][^mt-gh]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Gestión de consentimiento por contacto y política de retención configurable; sin integración documentada con CMPs.[^mt-product]

### MK-PRI-02 · Supresión y derechos de los interesados · 3/5
Gestiona solicitudes de borrado de datos, informes de datos y retención con borrado automático.[^mt-product]

### MK-PRI-03 · DPA y subencargados publicados · N/A
Software autoalojado: no hay tercero encargado del tratamiento (los proveedores de alojamiento gestionado tienen sus propios DPA).

### MK-PRI-04 · Datos en la UE · Sí
Se autoaloja o se contrata con proveedores de alojamiento de ubicación flexible, incluidos europeos.[^mt-hosting]

### MK-PRI-05 · Certificaciones · Ninguna declarada por el proyecto
Proyecto comunitario; certificaciones dependen del proveedor de alojamiento.[^mt-gh]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 2/5
Puntuación de leads por puntos (heurística); sin modelos predictivos.[^mt-product]

### MK-IA-02 · IA generativa de contenido · 1/5
El proyecto adopta una postura agnóstica y «no aloja ni mantiene servicios de IA»; existen plugins de terceros con LLM.[^mt-ai-manifesto]

### MK-IA-03 · Agentes y MCP · 0/5
Sin agentes ni MCP en el proyecto; el grupo de trabajo de IA explora integraciones.[^mt-ai-manifesto]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · self-hosted; saas (proveedores y Acquia)
Autoalojado o gestionado por proveedores de la comunidad.[^mt-hosting]

### MK-DEP-02 · Esfuerzo de implantación y operación · 3/5
Instalación con Composer o paquetes; prueba gratuita de 14 días en hosting gestionado; requiere operar PHP y base de datos.[^mt-hosting]

### MK-DEP-03 · Autoalojable · Sí
Autoalojable.[^mt-gh]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 5/5
Más de 10,6 mil estrellas, 3,5 mil forks, más de 290 contribuidores y versión estable 7.0 con 4 años de soporte; se describe como el mayor proyecto open source de marketing automation.[^mt-gh][^mt-release7]

### MK-ECO-02 · Integraciones y marketplace · 3/5
Conectores nativos con Salesforce, HubSpot, Zoho y Dynamics, más de 20 herramientas y un ecosistema de plugins.[^mt-product]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · Sí
GPL-3.0, licencia aprobada por la OSI.[^mt-gh][^osi-gpl3]

### MK-LIC-02 · Apertura y riesgo de licencia · 5/5
Open source sin funciones restringidas, con gobernanza comunitaria; hay ofertas comerciales de terceros y de Acquia.[^mt-gh][^mt-hosting]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 4/5
Sin coste de licencia; los precios de alojamiento gestionado los fija cada proveedor.[^mt-hosting]


[^mt-product]: Mautic, «Product», https://mautic.org/product/, consultado 2026-09-30.
[^mt-campaign-builder]: Mautic Docs, «Using the Campaign Builder», https://docs.mautic.org/en/5.2/campaigns/campaign_builder.html, consultado 2026-09-30.
[^mt-overview]: Mautic Docs, «Mautic overview (7.1)», https://docs.mautic.org/en/7.1/overview/overview.html, consultado 2026-09-30.
[^mt-kb-sendgrid]: Mautic Knowledgebase, «How to Use the SendGrid API in Mautic 5 with Symfony Mailer», https://kb.mautic.org/article/how-to-use-the-sendgrid-api-in-mautic-5-with-symfony-mailer.html, consultado 2026-09-30.
[^mt-forum-ses-dmarc]: Mautic Forums, «Sending via SMTP to Amazon SES: missing DKIM signature for FROM domain», https://forum.mautic.org/t/sending-via-smtp-to-amazon-ses-missing-dkim-signature-for-from-domain-thus-causing-domain-dkim-misalignment-failed-dmarc/31082, consultado 2026-09-30.
[^mt-issue-8058]: Mautic (GitHub), «Add support for RFC 8058 (One-Click unsubscribe), issue #12880», https://github.com/mautic/mautic/issues/12880, consultado 2026-09-30.
[^mt-gh]: Mautic (GitHub), «mautic/mautic», https://github.com/mautic/mautic, consultado 2026-09-30.
[^mt-hosting]: Mautic, «Mautic Hosting», https://mautic.org/start-using-mautic/mautic-hosting/, consultado 2026-09-30.
[^mt-ai-manifesto]: Mautic, «Mautic’s AI Manifesto», https://mautic.org/mautics-ai-manifesto/, consultado 2026-09-30.
[^mt-release7]: Mautic, «Mautic 7: Columba Edition is released», https://mautic.org/blog/mautic-7-columba-edition-is-released/, consultado 2026-09-30.
[^osi-gpl3]: Open Source Initiative, «GNU General Public License version 3», https://opensource.org/license/gpl-3-0, consultado 2026-09-30.
