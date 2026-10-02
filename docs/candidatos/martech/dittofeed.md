---
id: dittofeed
nombre: Dittofeed
dominio: martech
categoria: ma-oss
tipo: hibrido
licencia: MIT
despliegue: [self-hosted, docker, saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 2, confianza: media, fuentes: [df-gh, df-docs] }
  MK-REC-02: { nota: 3, confianza: media, fuentes: [df-gh] }
  MK-ID-01: { nota: 1, confianza: media, fuentes: [df-gh] }
  MK-ID-02: { nota: 0, confianza: media, fuentes: [df-gh] }
  MK-ID-03: { nota: 2, confianza: baja, fuentes: [df-gh] }
  MK-SEG-01: { nota: 3, confianza: media, fuentes: [df-gh] }
  MK-SEG-02: { nota: 2, confianza: media, fuentes: [df-gh] }
  MK-ACT-01: { nota: 2, confianza: baja, fuentes: [df-gh] }
  MK-ACT-02: { nota: 4, confianza: alta, fuentes: [df-gh] }
  MK-ACT-03: { nota: 3, confianza: media, fuentes: [df-gh] }
  MK-ORQ-01: { nota: 3, confianza: alta, fuentes: [df-docs] }
  MK-ORQ-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-01: { nota: 3, confianza: media, fuentes: [df-gh] }
  MK-EML-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 2, confianza: baja, fuentes: [df-gh] }
  MK-ARQ-02: { nota: 2, confianza: baja, fuentes: [df-gh] }
  MK-ARQ-03: { nota: 3, confianza: media, fuentes: [df-docs] }
  MK-PRI-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [df-pricing] }
  MK-PRI-05: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-02: { nota: 1, confianza: baja, fuentes: [df-gh] }
  MK-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-DEP-01: { valor: "self-hosted; docker; saas", confianza: alta, fuentes: [df-gh] }
  MK-DEP-02: { nota: 4, confianza: media, fuentes: [df-docs] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [df-pricing] }
  MK-ECO-01: { nota: 2, confianza: alta, fuentes: [df-gh] }
  MK-ECO-02: { nota: 2, confianza: baja, fuentes: [df-gh] }
  MK-LIC-01: { valor: "Sí", confianza: alta, fuentes: [df-gh, osi-mit] }
  MK-LIC-02: { nota: 4, confianza: media, fuentes: [df-gh, df-pricing] }
  MK-COS-02: { nota: 4, confianza: alta, fuentes: [df-pricing] }
---

# Dittofeed

## Resumen

Dittofeed es una plataforma de engagement omnicanal de código abierto (MIT) con journeys, difusiones (*broadcasts*), segmentos y editor de plantillas (HTML/MJML y low-code), pensada como alternativa a Customer.io o Segment Engage[^df-gh][^df-docs]. Ofrece autoalojamiento gratuito y una versión en la nube[^df-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 2/5
Ingesta por API nativa y compatibilidad con eventos de Segment; sin SDKs propios documentados.[^df-gh][^df-docs]

### MK-REC-02 · Recogida server-side y first-party · 3/5
Autoalojable en la infraestructura propia; sin colector first-party específico.[^df-gh]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 1/5
La hoja de ruta de 2025 sitúa la resolución de identidad en el segundo trimestre; hoy identifica usuarios por ID.[^df-gh]

### MK-ID-02 · Resolución probabilística / difusa · 0/5
No.[^df-gh]

### MK-ID-03 · Perfil unificado y latencia · 2/5
Perfiles de usuario alimentados por eventos; sin latencia documentada.[^df-gh]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Segmentos con múltiples operadores calculados a partir de eventos y atributos; no se documenta el tiempo real.[^df-gh]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Constructor de segmentos; sin SQL sobre warehouse.[^df-gh]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 2/5
Integración con Segment y reverse ETL, y API nativa; sin catálogo de destinos.[^df-gh]

### MK-ACT-02 · Canales de mensajería nativos · 4/5
Email, SMS, notificaciones push móviles, WhatsApp y Slack.[^df-gh]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 3/5
Admite reverse ETL como fuente de datos.[^df-gh]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Journeys activados por eventos con ramas; difusiones puntuales.[^df-docs]

### MK-ORQ-02 · Experimentación · N/D
No se ha localizado documentación de experimentación.


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · 3/5
Editor con HTML/MJML y modo low-code.[^df-gh]

### MK-EML-02 · Autenticación y herramientas de deliverability · N/D
No se ha revisado; el envío se realiza mediante proveedores de email configurables.

### MK-EML-03 · IP dedicada y gestión de reputación · N/D
No se ha revisado.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/D
No se ha revisado.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 2/5
Almacena datos propios en su base; admite reverse ETL como origen.[^df-gh]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 2/5
Reverse ETL y Segment como fuentes; sin conectores documentados a warehouses.[^df-gh]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API de referencia y datos en el almacén del cliente si se autoaloja.[^df-docs]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · N/D
No se ha revisado.

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · N/D
No se ha localizado un DPA para la versión en la nube.

### MK-PRI-04 · Datos en la UE · Sí
Autoalojamiento gratuito y despliegue en VPC propio; para la versión en la nube no se detalla la región.[^df-pricing]

### MK-PRI-05 · Certificaciones · N/D
No se han localizado certificaciones.


## MK-IA · IA

### MK-IA-01 · IA predictiva · N/D
No se documenta.

### MK-IA-02 · IA generativa de contenido · 1/5
La hoja de ruta prevé integración con LLM en el tercer trimestre de 2025; no confirmado como disponible.[^df-gh]

### MK-IA-03 · Agentes y MCP · N/D
No se documenta.


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · self-hosted; docker; saas
Docker Compose, despliegue en Render, VPC propio y nube gestionada.[^df-gh]

### MK-DEP-02 · Esfuerzo de implantación y operación · 4/5
Guía de inicio de 10 minutos, Docker Compose y prueba gratuita en la nube de 14 días.[^df-docs]

### MK-DEP-03 · Autoalojable · Sí
Autoalojamiento gratuito sin límites de uso.[^df-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 2/5
Unas 3 mil estrellas, 400 forks; comunidad en Discord; proyecto joven.[^df-gh]

### MK-ECO-02 · Integraciones y marketplace · 2/5
Integraciones con Segment, reverse ETL y proveedores de mensajería.[^df-gh]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · Sí
Licencia MIT, aprobada por la OSI (las funciones enterprise —autenticación multi-tenant, white-label— se ofrecen bajo plan comercial).[^df-gh][^osi-mit]

### MK-LIC-02 · Apertura y riesgo de licencia · 4/5
Open source con edición enterprise autoalojada y en la nube con funciones adicionales (multi-tenant, white-label, componentes embebidos).[^df-gh][^df-pricing]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 4/5
Cloud Pro 75 USD/mes (10.000 usuarios únicos; 0,004 USD por usuario adicional entre 10 mil y 100 mil), Enterprise a medida y autoalojamiento gratuito.[^df-pricing]


[^df-gh]: Dittofeed (GitHub), «dittofeed/dittofeed», https://github.com/dittofeed/dittofeed, consultado 2026-09-30.
[^df-docs]: Dittofeed Docs, «Introduction», https://docs.dittofeed.com/introduction, consultado 2026-09-30.
[^df-pricing]: Dittofeed, «Pricing», https://www.dittofeed.com/pricing, consultado 2026-09-30.
[^osi-mit]: Open Source Initiative, «The MIT License», https://opensource.org/license/mit, consultado 2026-09-30.
