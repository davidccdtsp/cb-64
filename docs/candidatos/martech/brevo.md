---
id: brevo
nombre: Brevo
dominio: martech
categoria: ma-cloud
tipo: cloud
licencia: Propietaria
despliegue: [saas]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 2, confianza: baja, fuentes: [bv-automation] }
  MK-REC-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-01: { nota: 1, confianza: baja, fuentes: [bv-automation] }
  MK-ID-02: { nota: 0, confianza: baja, fuentes: [bv-automation] }
  MK-ID-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-SEG-01: { nota: 3, confianza: baja, fuentes: [bv-automation] }
  MK-SEG-02: { nota: 2, confianza: baja, fuentes: [bv-pred-seg] }
  MK-ACT-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ACT-02: { nota: 4, confianza: media, fuentes: [bv-automation] }
  MK-ACT-03: { nota: 1, confianza: baja, fuentes: [bv-automation] }
  MK-ORQ-01: { nota: 3, confianza: media, fuentes: [bv-automation] }
  MK-ORQ-02: { nota: 3, confianza: alta, fuentes: [bv-ab-automation] }
  MK-EML-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-EML-02: { nota: 4, confianza: alta, fuentes: [bv-auth, bv-bimi] }
  MK-EML-03: { nota: 3, confianza: alta, fuentes: [bv-dedicated-ip] }
  MK-EML-04: { valor: "Sí", confianza: alta, fuentes: [bv-gmail-yahoo] }
  MK-ARQ-01: { nota: 1, confianza: baja, fuentes: [bv-automation] }
  MK-ARQ-02: { nota: 1, confianza: baja, fuentes: [bv-automation] }
  MK-ARQ-03: { nota: 2, confianza: baja, fuentes: [bv-automation] }
  MK-PRI-01: { nota: 2, confianza: baja, fuentes: [bv-gdpr] }
  MK-PRI-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-PRI-03: { valor: "Sí", confianza: alta, fuentes: [bv-dpa] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [bv-storage] }
  MK-PRI-05: { valor: "ISO 27001:2022", confianza: alta, fuentes: [bv-security, bv-iso] }
  MK-IA-01: { nota: 3, confianza: baja, fuentes: [bv-pred-seg] }
  MK-IA-02: { nota: 3, confianza: media, fuentes: [bv-aura] }
  MK-IA-03: { nota: 3, confianza: alta, fuentes: [bv-aura] }
  MK-DEP-01: { valor: "saas", confianza: alta, fuentes: [bv-pricing] }
  MK-DEP-02: { nota: 5, confianza: alta, fuentes: [bv-pricing] }
  MK-DEP-03: { valor: "No", confianza: media, fuentes: [bv-pricing] }
  MK-ECO-01: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ECO-02: { nota: 3, confianza: baja, fuentes: [bv-automation] }
  MK-LIC-01: { valor: "No", confianza: media, fuentes: [bv-pricing] }
  MK-LIC-02: { nota: 2, confianza: baja, fuentes: [bv-automation] }
  MK-COS-02: { nota: 3, confianza: media, fuentes: [bv-pricing] }
---

# Brevo

## Resumen

Brevo (antes Sendinblue) es una plataforma francesa de email, SMS, WhatsApp, chat y CRM con automatizaciones, pruebas A/B, asistente de IA (Aura) y API de email transaccional[^bv-automation][^bv-aura]. Aloja los datos en la UE y publica su DPA[^bv-storage][^bv-dpa]. Ofrece plan gratuito y planes Starter, Business y Enterprise[^bv-pricing].

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 2/5
Integraciones de e-commerce y API/SMTP; sin SDKs de captura de eventos documentados en las fuentes revisadas.[^bv-automation]

### MK-REC-02 · Recogida server-side y first-party · N/D
No se ha revisado.


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 1/5
Identifica contactos por email; sin resolución de identidad documentada.[^bv-automation]

### MK-ID-02 · Resolución probabilística / difusa · 0/5
No se documenta.[^bv-automation]

### MK-ID-03 · Perfil unificado y latencia · N/D
No se ha revisado.


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 3/5
Segmentación automática basada en información en tiempo real, según el fabricante.[^bv-automation]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 2/5
Constructor no-code de segmentos; sin SQL sobre warehouse.[^bv-pred-seg]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · N/D
No se ha extraído un recuento oficial.

### MK-ACT-02 · Canales de mensajería nativos · 4/5
Email, SMS, WhatsApp, notificaciones push y chat en un único panel.[^bv-automation]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 1/5
Importación de contactos y API; sin conector de warehouse localizado.[^bv-automation]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 3/5
Automatizaciones desde correos de bienvenida hasta flujos complejos multicanal con pasos de espera y ramas.[^bv-automation]

### MK-ORQ-02 · Experimentación · 3/5
Paso de división A/B dentro de flujos de automatización que reparte a los participantes entre dos rutas y compara resultados.[^bv-ab-automation]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/D
No se ha extraído la documentación del editor.

### MK-EML-02 · Autenticación y herramientas de deliverability · 4/5
Detecta el proveedor de dominio y añade los registros DNS necesarios (código Brevo, DKIM, DMARC) y admite BIMI; sin pruebas de colocación en bandeja documentadas.[^bv-auth][^bv-bimi]

### MK-EML-03 · IP dedicada y gestión de reputación · 3/5
IP dedicada opcional de pago, con configuración de SPF para usuarios de IP dedicada; el calentamiento automatizado no se ha verificado.[^bv-dedicated-ip]

### MK-EML-04 · Baja de un clic (RFC 8058) · Sí
Brevo indica que ofrece baja de un clic mediante la cabecera `List-Unsubscribe` (RFC 8058) y enlace visible en el cuerpo.[^bv-gmail-yahoo]


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 1/5
Base de contactos propia.[^bv-automation]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 1/5
Sin conector de warehouse localizado.[^bv-automation]

### MK-ARQ-03 · APIs y exportabilidad · 2/5
API y SMTP; exportaciones básicas.[^bv-automation]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Página de cumplimiento del RGPD; no se ha revisado el marco de consentimiento.[^bv-gdpr]

### MK-PRI-02 · Supresión y derechos de los interesados · N/D
No se ha revisado.

### MK-PRI-03 · DPA y subencargados publicados · Sí
El DPA forma parte de los términos de servicio, con lista de subencargados y aviso de cambios con 10 días hábiles de antelación.[^bv-dpa]

### MK-PRI-04 · Datos en la UE · Sí
Los servidores están en la UE: OVH en Francia y Alemania, con copias en Google Cloud (Bélgica).[^bv-storage]

### MK-PRI-05 · Certificaciones · ISO 27001:2022
El fabricante declara la certificación ISO 27001 y afirma no tener otras que no se indiquen expresamente.[^bv-security][^bv-iso]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 3/5
Segmentación predictiva y optimización de hora de envío según el fabricante; fuente de blog.[^bv-pred-seg]

### MK-IA-02 · IA generativa de contenido · 3/5
Aura, asistente de IA que genera automatizaciones y configura pasos, esperas, entradas y divisiones A/B; también funciones de contenido.[^bv-aura]

### MK-IA-03 · Agentes y MCP · 3/5
Aura genera y configura el flujo de trabajo a partir de una descripción; no se ha localizado servidor MCP.[^bv-aura]


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · saas
SaaS.[^bv-pricing]

### MK-DEP-02 · Esfuerzo de implantación y operación · 5/5
Plan gratuito y autoservicio.[^bv-pricing]

### MK-DEP-03 · Autoalojable · No
Solo SaaS.[^bv-pricing]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · N/D
No se ha verificado en fuente independiente.

### MK-ECO-02 · Integraciones y marketplace · 3/5
Integraciones con e-commerce y CRM; catálogo no cuantificado.[^bv-automation]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · No
Producto propietario.[^bv-pricing]

### MK-LIC-02 · Apertura y riesgo de licencia · 2/5
Propietario con API.[^bv-automation]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 3/5
Cuatro planes (Free, Starter, Business, Enterprise) con precio en EUR o USD según volumen de emails; los importes no se extrajeron automáticamente de la página.[^bv-pricing]


[^bv-automation]: Brevo, «Automate Your Marketing with Brevo», https://www.brevo.com/features/automation/, consultado 2026-09-30.
[^bv-pred-seg]: Brevo, «Predictive Segmentation with AI», https://www.brevo.com/blog/predictive-segmentation-ai/, consultado 2026-09-30.
[^bv-ab-automation]: Brevo Help, «A/B test an Automation workflow», https://help.brevo.com/hc/en-us/articles/360003140799-Classic-editor-A-B-test-an-Automation-workflow-to-optimize-its-performance, consultado 2026-09-30.
[^bv-auth]: Brevo Help, «Authenticate your domain with Brevo (Brevo code, DKIM, DMARC)», https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC, consultado 2026-09-30.
[^bv-bimi]: Brevo Help, «Implement BIMI to display your logo next to your emails», https://help.brevo.com/hc/en-us/articles/27769318543506-Implement-BIMI-to-display-your-logo-next-to-your-emails, consultado 2026-09-30.
[^bv-dedicated-ip]: Brevo Help, «Set up your dedicated IP in Brevo», https://help.brevo.com/hc/en-us/articles/115000240344-Set-up-your-dedicated-IP-in-Brevo, consultado 2026-09-30.
[^bv-gmail-yahoo]: Brevo Help, «Comply with Gmail, Yahoo, and Microsoft's requirements for email senders», https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-Yahoo-and-Microsoft-s-requirements-for-email-senders, consultado 2026-09-30.
[^bv-gdpr]: Brevo Help, «How does Brevo comply with the GDPR?», https://help.brevo.com/hc/en-us/articles/360001258744-How-does-Brevo-comply-with-the-GDPR, consultado 2026-09-30.
[^bv-dpa]: Brevo Help, «Where can I find the Data Processing Agreement (DPA)?», https://help.brevo.com/hc/en-us/articles/15403782599570-Where-can-I-find-the-Data-Processing-Agreement-DPA, consultado 2026-09-30.
[^bv-storage]: Brevo Help, «Data storage location», https://help.brevo.com/hc/en-us/articles/360001005510-Data-storage-location, consultado 2026-09-30.
[^bv-security]: Brevo, «Data Security and Privacy», https://www.brevo.com/features/data-security/, consultado 2026-09-30.
[^bv-iso]: Brevo, «ISO 27001 certificate», https://www.brevo.com/wp-content/uploads/2022/11/SENDINBLUE-ISO27001-Certificate.pdf, consultado 2026-09-30.
[^bv-aura]: Brevo Help, «Create an automation with Aura, Brevo’s AI-powered assistant», https://help.brevo.com/hc/en-us/articles/34804478408850-Create-an-automation-with-Aura-Brevo-s-AI-powered-assistant, consultado 2026-09-30.
[^bv-pricing]: Brevo, «Pricing», https://www.brevo.com/pricing/, consultado 2026-09-30.
