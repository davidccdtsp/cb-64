---
id: apache-unomi
nombre: Apache Unomi
dominio: martech
categoria: cdp-oss
tipo: oss
licencia: Apache-2.0
despliegue: [self-hosted, docker, kubernetes]
fecha_revision: 2026-09-30
puntuaciones:
  MK-REC-01: { nota: 2, confianza: alta, fuentes: [uo-manual] }
  MK-REC-02: { nota: 4, confianza: media, fuentes: [uo-manual] }
  MK-ID-01: { nota: 3, confianza: alta, fuentes: [uo-manual-merge] }
  MK-ID-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-ID-03: { nota: 3, confianza: media, fuentes: [uo-home, uo-manual] }
  MK-SEG-01: { nota: 4, confianza: media, fuentes: [uo-manual-segment] }
  MK-SEG-02: { nota: 1, confianza: media, fuentes: [uo-manual-segment] }
  MK-ACT-01: { nota: 1, confianza: baja, fuentes: [uo-manual] }
  MK-ACT-02: { nota: 0, confianza: media, fuentes: [uo-home] }
  MK-ACT-03: { nota: 1, confianza: media, fuentes: [uo-manual] }
  MK-ORQ-01: { nota: 1, confianza: media, fuentes: [uo-manual] }
  MK-ORQ-02: { nota: 0, confianza: media, fuentes: [uo-manual] }
  MK-EML-01: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-02: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-EML-04: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-ARQ-01: { nota: 1, confianza: media, fuentes: [uo-manual-arch] }
  MK-ARQ-02: { nota: 1, confianza: baja, fuentes: [uo-manual] }
  MK-ARQ-03: { nota: 3, confianza: alta, fuentes: [uo-manual] }
  MK-PRI-01: { nota: 2, confianza: alta, fuentes: [uo-manual-consent] }
  MK-PRI-02: { nota: 2, confianza: alta, fuentes: [uo-manual] }
  MK-PRI-03: { valor: "N/A", confianza: n/a, fuentes: [] }
  MK-PRI-04: { valor: "Sí", confianza: alta, fuentes: [uo-manual-docker] }
  MK-PRI-05: { valor: "Ninguna declarada (proyecto de la Apache Software Foundation)", confianza: media, fuentes: [uo-home] }
  MK-IA-01: { nota: 2, confianza: alta, fuentes: [uo-manual-segment] }
  MK-IA-02: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-IA-03: { valor: "N/D", confianza: n/a, fuentes: [] }
  MK-DEP-01: { valor: "self-hosted; docker; kubernetes", confianza: alta, fuentes: [uo-manual-docker] }
  MK-DEP-02: { nota: 2, confianza: media, fuentes: [uo-manual-arch] }
  MK-DEP-03: { valor: "Sí", confianza: alta, fuentes: [uo-manual-docker] }
  MK-ECO-01: { nota: 3, confianza: media, fuentes: [uo-home] }
  MK-ECO-02: { nota: 2, confianza: media, fuentes: [uo-manual] }
  MK-LIC-01: { valor: "Sí", confianza: alta, fuentes: [uo-home, osi-apache2] }
  MK-LIC-02: { nota: 5, confianza: alta, fuentes: [uo-home] }
  MK-COS-02: { nota: 5, confianza: media, fuentes: [uo-home] }
---

# Apache Unomi

## Resumen

Apache Unomi es un servidor Java de código abierto, proyecto de la Apache Software Foundation, para gestionar perfiles de clientes, eventos, segmentos y personalización con privacidad integrada (consentimiento, anonimización)[^uo-home]. Se apoya en Elasticsearch/OpenSearch y Karaf, y es la implementación de referencia del estándar OASIS Context Server CDP[^uo-home][^uo-manual-arch]. Es un motor de perfiles sin interfaz de marketing propia: la orquestación, el envío y las interfaces deben aportarlos otras herramientas.

## MK-REC · Recogida de datos

### MK-REC-01 · SDKs y fuentes de datos · 2/5
Ofrece un tracker web (paquete NPM `apache-unomi-tracker`), un endpoint de recolección de eventos por lotes y definición de tipos de evento con esquemas JSON; no se documentan SDKs móviles ni de servidor.[^uo-manual]

### MK-REC-02 · Recogida server-side y first-party · 4/5
Al ser autoalojado, el servidor de recolección reside en la infraestructura del cliente y usa cookies de sesión propias; no se documentan SDKs server-side oficiales.[^uo-manual]


## MK-ID · Identidad y perfil unificado

### MK-ID-01 · Resolución de identidad determinista · 3/5
Admite alias de perfil para varios identificadores y fusión automática de perfiles con estrategias configurables (el perfil maestro prevalece en conflictos).[^uo-manual-merge]

### MK-ID-02 · Resolución probabilística / difusa · N/D
No se documenta coincidencia probabilística.

### MK-ID-03 · Perfil unificado y latencia · 3/5
Mantiene un perfil consolidado con datos anónimos y conocidos y lo sirve mediante el endpoint `context.json`; no se documentan latencias.[^uo-home][^uo-manual]


## MK-SEG · Segmentación y audiencias

### MK-SEG-01 · Segmentación en tiempo real · 4/5
Segmentación y puntuación en tiempo real con condiciones de comportamiento y condiciones de eventos pasados sobre ventanas temporales.[^uo-manual-segment]

### MK-SEG-02 · Modos de construcción (no-code y SQL) · 1/5
Los segmentos y reglas se definen mediante la API REST (JSON); el proyecto no incluye constructor visual.[^uo-manual-segment]


## MK-ACT · Activación y canales

### MK-ACT-01 · Catálogo de destinos · 1/5
La extensibilidad se hace con reglas y plugins (acciones); no se documenta un catálogo de destinos.[^uo-manual]

### MK-ACT-02 · Canales de mensajería nativos · 0/5
No incluye envío de mensajes.[^uo-home]

### MK-ACT-03 · Activación desde el warehouse (reverse ETL) · 1/5
Ofrece importación/exportación de perfiles por API; no lee de warehouses.[^uo-manual]


## MK-ORQ · Orquestación y experimentación

### MK-ORQ-01 · Journeys · 1/5
Dispone de un motor de reglas que reacciona a eventos (condiciones y acciones), no de un orquestador de journeys.[^uo-manual]

### MK-ORQ-02 · Experimentación · 0/5
No se documenta experimentación.[^uo-manual]


## MK-EML · Email

### MK-EML-01 · Editor y plantillas · N/A
No envía email.

### MK-EML-02 · Autenticación y herramientas de deliverability · N/A
No envía email.

### MK-EML-03 · IP dedicada y gestión de reputación · N/A
No envía email.

### MK-EML-04 · Baja de un clic (RFC 8058) · N/A
No envía email.


## MK-ARQ · Arquitectura e integración con datos

### MK-ARQ-01 · Modelo de datos: copia propia frente a warehouse-native · 1/5
El almacenamiento primario es Elasticsearch/OpenSearch propio; no opera sobre el warehouse.[^uo-manual-arch]

### MK-ARQ-02 · Integración con plataformas de datos (Bloque A) · 1/5
No hay conectores a plataformas de datos documentados, solo API de importación/exportación.[^uo-manual]

### MK-ARQ-03 · APIs y exportabilidad · 3/5
API REST completa de perfiles, eventos y segmentos, API GraphQL e importación/exportación; los datos residen en el almacén del propio cliente.[^uo-manual]


## MK-PRI · Privacidad y cumplimiento

### MK-PRI-01 · Gestión del consentimiento · 2/5
Define tipos de consentimiento y gestiona el estado de consentimiento por perfil; no documenta integración con CMPs ni propagación a destinos.[^uo-manual-consent]

### MK-PRI-02 · Supresión y derechos de los interesados · 2/5
Ofrece endpoints de anonimización y borrado de perfiles y una API de purga de retención de eventos.[^uo-manual]

### MK-PRI-03 · DPA y subencargados publicados · N/A
Software autoalojado: no hay tercero encargado del tratamiento.

### MK-PRI-04 · Datos en la UE · Sí
Se despliega en la infraestructura del cliente (Docker, Karaf), que decide la región.[^uo-manual-docker]

### MK-PRI-05 · Certificaciones · Ninguna declarada (proyecto de la Apache Software Foundation)
El proyecto no publica certificaciones; la seguridad recae en el despliegue del cliente.[^uo-home]


## MK-IA · IA

### MK-IA-01 · IA predictiva · 2/5
Ofrece planes de puntuación (*scoring plans*) para cuantificar el valor del cliente, sin modelos predictivos.[^uo-manual-segment]

### MK-IA-02 · IA generativa de contenido · N/D
No se documenta.

### MK-IA-03 · Agentes y MCP · N/D
No se documenta.


## MK-DEP · Despliegue y operación

### MK-DEP-01 · Modelos de despliegue · self-hosted; docker; kubernetes
Imágenes Docker oficiales, instalación manual sobre Karaf y compatibilidad con Kubernetes; requiere Java 17 y Elasticsearch 9 u OpenSearch 3.[^uo-manual-docker]

### MK-DEP-02 · Esfuerzo de implantación y operación · 2/5
Requiere operar un clúster Elasticsearch/OpenSearch y un runtime Karaf; el arranque rápido con Docker facilita la prueba, pero no la operación.[^uo-manual-arch]

### MK-DEP-03 · Autoalojable · Sí
Solo se ofrece autoalojado.[^uo-manual-docker]


## MK-ECO · Ecosistema y madurez

### MK-ECO-01 · Comunidad y madurez · 3/5
Proyecto de la ASF con versiones 3.x recientes; actividad moderada.[^uo-home]

### MK-ECO-02 · Integraciones y marketplace · 2/5
Arquitectura de plugins OSGi y API GraphQL; no se documentan marketplace ni integraciones prefabricadas.[^uo-manual]


## MK-LIC · Licencia

### MK-LIC-01 · Licencia aprobada por la OSI · Sí
Apache License 2.0, aprobada por la OSI.[^uo-home][^osi-apache2]

### MK-LIC-02 · Apertura y riesgo de licencia · 5/5
Open source bajo la ASF, sin funciones restringidas y con gobernanza abierta.[^uo-home]


## MK-COS · Coste

### MK-COS-02 · Transparencia de precios · 5/5
Sin coste de licencia (Apache-2.0); el coste es de infraestructura y operación.[^uo-home]


[^uo-manual]: Apache Unomi, «Apache Unomi 3.x — Documentation», https://unomi.apache.org/manual/latest/, consultado 2026-09-30.
[^uo-manual-merge]: Apache Unomi, «Documentation — Automatic profile merging», https://unomi.apache.org/manual/latest/#_automatic_profile_merging, consultado 2026-09-30.
[^uo-home]: Apache Unomi, «Apache Unomi — Open Source Customer Data Platform», https://unomi.apache.org/, consultado 2026-09-30.
[^uo-manual-segment]: Apache Unomi, «Documentation — Segments», https://unomi.apache.org/manual/latest/#_segment, consultado 2026-09-30.
[^uo-manual-arch]: Apache Unomi, «Documentation — Architecture overview», https://unomi.apache.org/manual/latest/#_architecture_overview, consultado 2026-09-30.
[^uo-manual-consent]: Apache Unomi, «Documentation — Consent management», https://unomi.apache.org/manual/latest/#_consent_management, consultado 2026-09-30.
[^uo-manual-docker]: Apache Unomi, «Documentation — Five minutes quickstart», https://unomi.apache.org/manual/latest/#_five_minutes_quickstart, consultado 2026-09-30.
[^osi-apache2]: Open Source Initiative, «Apache License, Version 2.0», https://opensource.org/license/apache-2-0, consultado 2026-09-30.
